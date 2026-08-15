import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Play,
  RotateCcw,
  SearchCheck,
  Sparkles,
  Target,
  Terminal,
  X,
} from "lucide-react"
import BlocklyPrimerV47 from "../v47/BlocklyPrimerV47"
import ProgrammingQuestV47 from "../v47/ProgrammingQuestV47"
import AlgorithmLabV46 from "../v46/AlgorithmLabV46"
import AdvancedProgrammingLabsV49 from "../v49/AdvancedProgrammingLabsV49"
import { getGuidedLevelV50, getSourceV50 } from "./programming-curriculum-v50"
import "./programming-v50.css"

type StepId = "start" | "meaning" | "purpose" | "mechanics" | "code" | "guided" | "practice" | "mastery"

type PyodideLike = {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (options: { batched: (text: string) => void }) => void
  setStderr: (options: { batched: (text: string) => void }) => void
}

type PyodideWindow = Window & {
  loadPyodide?: (options?: { indexURL?: string }) => Promise<PyodideLike>
}

const steps: { id: StepId; label: string; question: string }[] = [
  { id: "start", label: "Empieza aquí", question: "¿Dónde estoy y qué voy a aprender?" },
  { id: "meaning", label: "Qué es", question: "¿Qué significa exactamente?" },
  { id: "purpose", label: "Para qué", question: "¿Para qué sirve, por qué existe y cuándo se usa?" },
  { id: "mechanics", label: "Cómo funciona", question: "¿Qué ocurre paso a paso por dentro?" },
  { id: "code", label: "Código explicado", question: "¿Qué significa cada línea y símbolo importante?" },
  { id: "guided", label: "Hazlo conmigo", question: "¿Qué escribo, dónde y en qué orden?" },
  { id: "practice", label: "Practica y depura", question: "¿Puedo hacerlo y corregirlo sin adivinar?" },
  { id: "mastery", label: "Demuestra dominio", question: "¿Cómo sé si de verdad lo aprendí?" },
]

function runJavaScript(code: string): Promise<string> {
  return new Promise((resolve) => {
    const workerSource = `
      const logs = [];
      const format = value => {
        try { return typeof value === 'string' ? value : JSON.stringify(value, null, 2); }
        catch { return String(value); }
      };
      console.log = (...args) => logs.push(args.map(format).join(' '));
      console.error = (...args) => logs.push('[error] ' + args.map(format).join(' '));
      self.onmessage = event => {
        try {
          const result = (0, eval)(event.data);
          if (result !== undefined) logs.push('→ ' + format(result));
          self.postMessage({ text: logs.join('\\n') || 'Código ejecutado sin salida.' });
        } catch (error) {
          self.postMessage({ text: String(error && error.stack ? error.stack : error) });
        }
      };
    `
    const blob = new Blob([workerSource], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    const timer = window.setTimeout(() => {
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve("Tiempo límite excedido. Revisa si creaste un bucle que nunca termina.")
    }, 3500)
    worker.onmessage = (event: MessageEvent<{ text: string }>) => {
      window.clearTimeout(timer)
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve(event.data.text)
    }
    worker.postMessage(code)
  })
}

async function loadPyodideRuntime(): Promise<PyodideLike> {
  const win = window as PyodideWindow
  if (!win.loadPyodide) {
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>("script[data-campus-pyodide-v50]")
      if (existing) {
        if (win.loadPyodide) resolve()
        else {
          existing.addEventListener("load", () => resolve(), { once: true })
          existing.addEventListener("error", () => reject(new Error("No se pudo cargar Python en el navegador.")), { once: true })
        }
        return
      }
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.js"
      script.async = true
      script.dataset.campusPyodideV50 = "true"
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("No se pudo cargar Python. Comprueba tu conexión a Internet."))
      document.head.appendChild(script)
    })
  }
  if (!win.loadPyodide) throw new Error("Python/Pyodide no está disponible en este navegador.")
  return win.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/" })
}

const levelNumber = (code: string) => Number(code.replace("L", "")) || 0

export default function GuidedProgrammingClassroomV50({
  levelCode,
  onClose,
  isMastered,
  onToggleMastery,
}: {
  levelCode: string
  onClose: () => void
  isMastered: boolean
  onToggleMastery: () => void
}) {
  const level = useMemo(() => getGuidedLevelV50(levelCode), [levelCode])
  const [conceptIndex, setConceptIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const concept = level.concepts[Math.min(conceptIndex, level.concepts.length - 1)]
  const currentStep = steps[stepIndex]
  const [code, setCode] = useState(concept.example)
  const [output, setOutput] = useState("Todavía no ejecutes. Primero intenta predecir qué ocurrirá.")
  const [running, setRunning] = useState(false)
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set())
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(() => {
    try { return new Set<string>(JSON.parse(localStorage.getItem(`campus-v50-${levelCode}-concepts`) ?? "[]")) } catch { return new Set<string>() }
  })
  const pyodideRef = useRef<PyodideLike | null>(null)

  useEffect(() => {
    localStorage.setItem(`campus-v50-${levelCode}-concepts`, JSON.stringify(Array.from(completedConcepts)))
  }, [completedConcepts, levelCode])

  const selectConcept = (index: number, targetStep = 0) => {
    const safeIndex = Math.max(0, Math.min(level.concepts.length - 1, index))
    const nextConcept = level.concepts[safeIndex]
    setConceptIndex(safeIndex)
    setStepIndex(targetStep)
    setCode(nextConcept.example)
    setOutput("Todavía no ejecutes. Primero intenta predecir qué ocurrirá.")
    setRevealed(new Set())
  }

  const progress = Math.round(((completedConcepts.size + (stepIndex + 1) / steps.length) / Math.max(1, level.concepts.length)) * 100)
  const sourceCards = level.sources.map(getSourceV50).filter((item): item is NonNullable<typeof item> => Boolean(item))

  const exactAction = (() => {
    switch (currentStep.id) {
      case "start": return "Lee primero el objetivo del nivel y luego selecciona el primer concepto de la izquierda. No escribas código todavía."
      case "meaning": return `Lee la explicación de “${concept.title}” y después intenta explicarla con una frase propia sin mirar.`
      case "purpose": return "Compara los apartados “cuándo usar” y “cuándo no usar”. Busca una situación real de tu vida o de una app donde encaje."
      case "mechanics": return "Recorre los seis pasos en orden. Antes de avanzar, predice qué estado cambia en cada paso."
      case "code": return "Lee el código de arriba abajo. Relaciona cada línea con su explicación. Después cambia un único valor y predice la nueva salida."
      case "guided": return "Sigue la lista numerada sin saltos. Escribe/modifica solo lo que indica el paso actual y ejecuta al final."
      case "practice": return "Haz el ejercicio sin copiar. Si falla, no borres todo: encuentra la primera diferencia entre lo esperado y lo real."
      case "mastery": return "Responde las preguntas sin mirar, realiza el ejercicio solo y marca el concepto como dominado únicamente si puedes explicar el porqué."
    }
  })()

  const execute = async () => {
    if (concept.exampleLanguage === "text") {
      setOutput("Este concepto usa pseudocódigo/texto. La comprobación se realiza explicando la traza y resolviendo el ejercicio, no ejecutando este bloque.")
      return
    }
    setRunning(true)
    setOutput("Ejecutando…")
    try {
      if (concept.exampleLanguage === "javascript") {
        setOutput(await runJavaScript(code))
      } else {
        const pyodide = pyodideRef.current ?? await loadPyodideRuntime()
        pyodideRef.current = pyodide
        const lines: string[] = []
        pyodide.setStdout({ batched: (text) => lines.push(text) })
        pyodide.setStderr({ batched: (text) => lines.push(`[error] ${text}`) })
        const result = await pyodide.runPythonAsync(code)
        if (result !== undefined && result !== null) lines.push(String(result))
        setOutput(lines.join("\n") || "Python ejecutado sin salida visible.")
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : String(error))
    } finally {
      setRunning(false)
    }
  }

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((value) => value + 1)
      return
    }
    setCompletedConcepts((current) => new Set(current).add(concept.id))
    if (conceptIndex < level.concepts.length - 1) {
      selectConcept(conceptIndex + 1, 0)
      return
    }
  }

  const previous = () => {
    if (stepIndex > 0) {
      setStepIndex((value) => value - 1)
      return
    }
    if (conceptIndex > 0) {
      selectConcept(conceptIndex - 1, steps.length - 1)
    }
  }

  const practiceLab = (() => {
    const n = levelNumber(level.code)
    if (n <= 1) return <BlocklyPrimerV47 />
    if (n <= 3) return <ProgrammingQuestV47 />
    if (n <= 6) return <AlgorithmLabV46 />
    if (n >= 18) return <AdvancedProgrammingLabsV49 />
    return null
  })()

  return (
    <div className="v50-classroom" role="dialog" aria-modal="true" aria-label={`Profesor guiado ${level.code}`}>
      <header className="v50-topbar">
        <div className="v50-title">
          <button type="button" onClick={onClose} aria-label="Cerrar aula"><X /></button>
          <div><small>{level.code} · {level.phase}</small><h2>{level.title}</h2></div>
        </div>
        <div className="v50-progress-block"><span>{Math.min(100, progress)}% del nivel trabajado</span><div><i style={{ width: `${Math.min(100, progress)}%` }} /></div></div>
        <div className="v50-top-status"><span>{completedConcepts.size}/{level.concepts.length} conceptos</span><b>{isMastered ? "Nivel dominado" : "En aprendizaje"}</b></div>
      </header>

      <div className="v50-body">
        <aside className="v50-concepts">
          <div className="v50-orientation-mini"><GraduationCap /><small>OBJETIVO DEL NIVEL</small><p>{level.orientation}</p></div>
          <div className="v50-concept-list">
            {level.concepts.map((item, index) => (
              <button type="button" key={item.id} className={`${conceptIndex === index ? "active" : ""} ${completedConcepts.has(item.id) ? "done" : ""}`} onClick={() => selectConcept(index, 0)}>
                <span>{completedConcepts.has(item.id) ? <Check /> : String(index + 1).padStart(2, "0")}</span>
                <div><b>{item.title}</b><small>{completedConcepts.has(item.id) ? "Dominado" : "Aprender"}</small></div>
                <ChevronRight />
              </button>
            ))}
          </div>
          <div className="v50-prereq"><small>ANTES DE ESTE NIVEL</small>{level.prerequisites.map((item) => <span key={item}>{item}</span>)}</div>
        </aside>

        <main className="v50-main">
          <section className="v50-now"><Target /><div><small>¿QUÉ HAGO AHORA?</small><b>{exactAction}</b></div></section>

          <nav className="v50-stepper" aria-label="Pasos de la lección">
            {steps.map((item, index) => <button type="button" key={item.id} className={stepIndex === index ? "active" : ""} onClick={() => setStepIndex(index)}><span>{index + 1}</span><b>{item.label}</b></button>)}
          </nav>

          <section className="v50-teacher-stage">
            <header className="v50-stage-head"><div><small>CONCEPTO {conceptIndex + 1}/{level.concepts.length} · PASO {stepIndex + 1}/{steps.length}</small><h3>{concept.title}</h3><p>{currentStep.question}</p></div><Lightbulb /></header>

            {currentStep.id === "start" && <div className="v50-start-grid">
              <article><small>QUÉ VAS A CONSEGUIR</small><ul>{level.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><small>MAPA DEL CONCEPTO ACTUAL</small><p>{concept.what}</p><div className="v50-mental"><Sparkles /><b>Modelo mental</b><span>{concept.mentalModel}</span></div></article>
              <article className="v50-source-preview"><small>BASE ACADÉMICA</small><p>Este nivel se contrasta con {sourceCards.length} fuentes base. Al final puedes abrir las lecturas/cursos originales.</p>{sourceCards.slice(0,3).map((source) => <span key={source.id}>{source.title}</span>)}</article>
            </div>}

            {currentStep.id === "meaning" && <div className="v50-explain-grid">
              <article className="v50-big-answer"><small>¿QUÉ ES?</small><p>{concept.what}</p></article>
              <article><small>EN PALABRAS SIMPLES</small><p>{concept.mentalModel}</p></article>
              <article className="v50-vocabulary"><small>VOCABULARIO: NO SIGAS SI ESTO NO ESTÁ CLARO</small>{concept.terms.length ? concept.terms.map((term) => <div key={term.term}><b>{term.term}</b><span>{term.meaning}</span></div>) : <div><b>{concept.title}</b><span>{concept.what}</span></div>}</article>
              <article className="v50-teachback"><CircleHelp /><div><b>Enséñamelo tú</b><p>Sin mirar arriba, completa en voz alta: “{concept.title} es… y lo usaría cuando…”. Si no puedes terminar la frase, vuelve a leer antes de continuar.</p></div></article>
            </div>}

            {currentStep.id === "purpose" && <div className="v50-purpose-grid">
              <article><small>¿PARA QUÉ SIRVE?</small><p>{concept.why}</p></article>
              <article><small>¿POR QUÉ SE USA?</small><p>Porque resuelve un problema concreto de diseño o ejecución: {concept.why}</p></article>
              <article className="positive"><small>¿CUÁNDO SÍ?</small><p>{concept.when}</p></article>
              <article className="negative"><small>¿CUÁNDO NO?</small><p>{concept.whenNot}</p></article>
              <article className="v50-decision"><SearchCheck /><div><b>Regla de decisión</b><p>Antes de usarlo, pregunta: “¿qué problema concreto estoy resolviendo y qué coste añade?”. Si no puedes responder, todavía no elijas la herramienta.</p></div></article>
            </div>}

            {currentStep.id === "mechanics" && <div className="v50-mechanics">
              <div className="v50-flow">{concept.how.map((item, index) => <article key={item}><span>{index + 1}</span><p>{item.replace(/^\d+\.\s*/, "")}</p></article>)}</div>
              <aside><small>ANTES DE EJECUTAR</small><h4>Predice el estado</h4><p>No leas código como texto corrido. Pregunta después de cada paso: ¿qué valores existen ahora?, ¿qué cambió?, ¿qué decisión toca después?</p></aside>
            </div>}

            {currentStep.id === "code" && <div className="v50-code-teacher">
              <div className="v50-code-box"><div><span>{concept.exampleLanguage.toUpperCase()}</span><button type="button" onClick={() => { setCode(concept.example); setOutput("Ejemplo restaurado. Predice antes de ejecutar.") }}><RotateCcw />Restaurar</button></div><pre><code>{concept.example}</code></pre></div>
              <div className="v50-breakdown"><small>EXPLICACIÓN PASO A PASO</small>{concept.breakdown.map((item, index) => <article key={`${index}-${item}`}><span>{index + 1}</span><p>{item}</p></article>)}</div>
              <div className="v50-code-rule"><Lightbulb /><p><strong>No memorices esta forma.</strong> Pregunta qué dato entra, qué operación ocurre, qué estado cambia y qué resultado sale. Después intenta escribir otra versión sin mirar.</p></div>
            </div>}

            {currentStep.id === "guided" && <div className="v50-guided-layout">
              <article className="v50-guided-steps"><small>HAZLO CONMIGO</small><h4>Sigue exactamente este orden</h4>{concept.guidedTask.map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}</p></div>)}</article>
              <article className="v50-editor"><header><div><Terminal /><b>Tu mesa de trabajo</b><small>{concept.exampleLanguage === "text" ? "Pseudocódigo / razonamiento" : concept.exampleLanguage}</small></div><button type="button" onClick={execute} disabled={running || concept.exampleLanguage === "text"}><Play />{running ? "Ejecutando…" : "Ejecutar"}</button></header><textarea value={code} onChange={(event: { target: { value: string } }) => setCode(event.target.value)} spellCheck={false} /><pre className="v50-output">{output}</pre></article>
            </div>}

            {currentStep.id === "practice" && <div className="v50-practice-stage">
              <article className="v50-solo"><small>AHORA TÚ, SIN COPIAR</small><h4>Ejercicio individual</h4><p>{concept.soloTask}</p><div><b>Si te bloqueas:</b><ol>{concept.debug.map((item) => <li key={item}>{item}</li>)}</ol></div></article>
              <article className="v50-mistakes"><small>ERRORES FRECUENTES</small>{concept.mistakes.map((item) => <div key={item}><span>!</span><p>{item}</p></div>)}</article>
              {practiceLab && <div className="v50-context-lab"><header><small>LABORATORIO CONTEXTUAL DEL NIVEL</small><p>Este laboratorio aparece aquí porque corresponde a lo que estás aprendiendo; ya no es un “juego aparte”.</p></header>{practiceLab}</div>}
            </div>}

            {currentStep.id === "mastery" && <div className="v50-mastery-stage">
              <article className="v50-check-questions"><small>COMPRUEBA SIN MIRAR</small>{concept.check.map((item, index) => <div key={item.q}><button type="button" onClick={() => setRevealed((current) => { const next = new Set(current); if (next.has(index)) next.delete(index); else next.add(index); return next })}><span>{index + 1}</span><b>{item.q}</b><ChevronRight /></button>{revealed.has(index) && <p>{item.a}</p>}</div>)}</article>
              <article className="v50-mastery-rule"><CheckCircle2 /><div><small>CRITERIO DE DOMINIO</small><p>{concept.mastery}</p><button type="button" onClick={() => setCompletedConcepts((current) => { const next = new Set(current); if (next.has(concept.id)) next.delete(concept.id); else next.add(concept.id); return next })}>{completedConcepts.has(concept.id) ? "Marcar pendiente" : "Sí, puedo demostrarlo"}</button></div></article>
              <article className="v50-project"><small>PROYECTO DEL NIVEL</small><h4>{level.project}</h4><p><strong>Gate:</strong> {level.gate}</p><button type="button" onClick={onToggleMastery}>{isMastered ? "Quitar dominio del nivel" : "Confirmar dominio del nivel"}</button></article>
              <article className="v50-library"><small>BIBLIOTECA BASE · LEE/VE CUANDO QUIERAS PROFUNDIZAR</small><p>Campus Maestro no copia libros o cursos protegidos. Usa estas fuentes para contrastar, ampliar y resolver ejercicios originales.</p><div>{sourceCards.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span>{source.type}</span><b>{source.title}</b><small>{source.author}</small><p>{source.note}</p><em>{source.license}</em><ExternalLink /></a>)}</div></article>
            </div>}
          </section>
        </main>
      </div>

      <footer className="v50-footer">
        <button type="button" onClick={previous} disabled={conceptIndex === 0 && stepIndex === 0}><ArrowLeft />Anterior</button>
        <div><small>{concept.title}</small><b>{currentStep.label}</b><span>{currentStep.question}</span></div>
        <button type="button" onClick={next}>{stepIndex === steps.length - 1 && conceptIndex === level.concepts.length - 1 ? "Finalizar concepto" : "Siguiente"}<ArrowRight /></button>
      </footer>
    </div>
  )
}
