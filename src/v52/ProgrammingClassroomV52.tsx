import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FileCode2,
  GraduationCap,
  Info,
  Lightbulb,
  Play,
  RotateCcw,
  SearchCheck,
  TestTube2,
  X,
} from "lucide-react"
import { getLevelSourcesV51, getProgrammingLevelV51, type ConceptSeedV51 } from "../v51/programming-curriculum-v51"
import CampusCodeStudioV52, { type CampusCodeStudioHandleV52, type StudioExecutionV52 } from "./CampusCodeStudioV52"
import "./programming-v52.css"

type StepId =
  | "orientation"
  | "meaning"
  | "purpose"
  | "mechanics"
  | "anatomy"
  | "guided"
  | "practice"
  | "debug"
  | "test"
  | "project"
  | "mastery"

const lessonSteps: { id: StepId; label: string; question: string }[] = [
  { id: "orientation", label: "Ubícate", question: "¿Dónde estoy, qué necesito antes y qué debo conseguir?" },
  { id: "meaning", label: "Comprende", question: "¿Qué significa exactamente este concepto?" },
  { id: "purpose", label: "Relaciona", question: "¿Qué problema resuelve, por qué existe y cuándo se utiliza?" },
  { id: "mechanics", label: "Desarma", question: "¿Qué sucede paso a paso dentro del modelo?" },
  { id: "anatomy", label: "Lee código", question: "¿Qué significa cada línea y cada parte importante?" },
  { id: "guided", label: "Hazlo", question: "¿Qué archivo abro, qué escribo y qué observo?" },
  { id: "practice", label: "Practica", question: "¿Puedo modificar, variar y resolver sin copiar?" },
  { id: "debug", label: "Depura", question: "¿Cómo encuentro la primera causa de un fallo?" },
  { id: "test", label: "Comprueba", question: "¿Puedo explicarlo y probarlo sin mirar la respuesta?" },
  { id: "project", label: "Construye", question: "¿Cómo se utiliza dentro de un proyecto real?" },
  { id: "mastery", label: "Demuestra", question: "¿Qué evidencia necesito antes de avanzar?" },
]

const universalGlossary = [
  ["dato", "Información que un programa puede leer, representar, transformar, guardar o comunicar."],
  ["valor", "Un dato concreto, por ejemplo 5, true o \"Ada\"."],
  ["estado", "Los valores relevantes que existen en un instante de la ejecución."],
  ["instrucción", "Una operación expresada de forma que el lenguaje o runtime pueda procesarla."],
  ["entrada", "Información que llega desde usuario, archivo, red, sensor u otra fuente."],
  ["salida", "Resultado observable: texto, valor, archivo, respuesta, pantalla o efecto."],
  ["runtime", "Entorno que participa en la ejecución y ofrece servicios al código."],
  ["contrato", "Reglas observables sobre entradas, resultados, errores y garantías."],
] as const

const extensionFor = (concept: ConceptSeedV51) => {
  if (concept.language === "python") return "main.py"
  if (concept.language === "javascript") return "main.js"
  if (concept.language === "web") return "index.html"
  return "notas.txt"
}

function sourceSnippet(concept: ConceptSeedV51) {
  if (concept.code.trim()) return concept.code
  return [
    `CONCEPTO: ${concept.title}`,
    "",
    "1. Describe la entrada.",
    "2. Escribe el estado inicial.",
    "3. Aplica la regla paso a paso.",
    "4. Anota el estado después de cada paso.",
    "5. Compara el resultado con lo esperado.",
  ].join("\n")
}

const lineExplanation = (line: string, index: number, concept: ConceptSeedV51) => {
  const clean = line.trim()
  if (!clean) return `Línea ${index + 1}: separa visualmente bloques para facilitar la lectura; por sí sola no ejecuta una operación.`
  if (clean.startsWith("#") || clean.startsWith("//")) return `Línea ${index + 1}: comentario. Explica intención y normalmente no cambia el resultado del programa.`
  if (/\b(if|elif|else|while|for)\b/.test(clean)) return `Línea ${index + 1}: controla el flujo. Decide qué bloque se ejecuta o cuántas veces se repite.`
  if (/\b(def|function|class)\b/.test(clean)) return `Línea ${index + 1}: define una unidad reutilizable. Preparar una definición no significa necesariamente ejecutarla todavía.`
  if (/\breturn\b/.test(clean)) return `Línea ${index + 1}: devuelve un resultado al código que hizo la llamada y termina esa ejecución de la función.`
  if (/\bprint\b|console\.log/.test(clean)) return `Línea ${index + 1}: produce una salida visible para observar estado o resultado.`
  if (/=/.test(clean) && !/[=!<>]=/.test(clean)) return `Línea ${index + 1}: crea o actualiza un nombre/estado. Evalúa primero la parte derecha y luego observa qué valor queda asociado al nombre.`
  return `Línea ${index + 1}: participa en “${concept.title}”. Pregunta qué datos consume, qué operación realiza y qué estado o salida produce.`
}

export default function ProgrammingClassroomV52({ levelCode, onClose }: { levelCode: string; onClose: () => void }) {
  const level = useMemo(() => getProgrammingLevelV51(levelCode), [levelCode])
  const sources = useMemo(() => getLevelSourcesV51(levelCode), [levelCode])
  const [conceptIndex, setConceptIndex] = useState(0)
  const concept = level.topics[Math.min(conceptIndex, level.topics.length - 1)]
  const [stepIndex, setStepIndex] = useState(0)
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set())
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try { return new Set<string>(JSON.parse(localStorage.getItem(`campus-v52-${levelCode}`) ?? "[]")) } catch { return new Set<string>() }
  })
  const [lastExecution, setLastExecution] = useState<StudioExecutionV52 | null>(null)
  const studioRef = useRef<CampusCodeStudioHandleV52 | null>(null)
  const currentStep = lessonSteps[stepIndex]

  useEffect(() => {
    localStorage.setItem(`campus-v52-${levelCode}`, JSON.stringify(Array.from(completed)))
  }, [completed, levelCode])

  const selectConcept = (index: number, targetStep = 0) => {
    const safeIndex = Math.max(0, Math.min(level.topics.length - 1, index))
    setConceptIndex(safeIndex)
    setStepIndex(targetStep)
    setRevealed(new Set())
    setLastExecution(null)
  }

  const fileName = extensionFor(concept)
  const anatomyLines = sourceSnippet(concept).split("\n")
  const progress = Math.round(((completed.size + (stepIndex + 1) / lessonSteps.length) / level.topics.length) * 100)

  const exactAction = (() => {
    switch (currentStep.id) {
      case "orientation": return "Lee el objetivo del nivel y del concepto. Todavía no escribas código: primero ubica qué problema vas a aprender a resolver."
      case "meaning": return `Explica “${concept.title}” con una frase propia. Si aparece una palabra técnica que no puedes definir, consulta el glosario antes de seguir.`
      case "purpose": return "Piensa en un caso real donde esta idea evite repetición, error, ambigüedad, lentitud o complejidad. Después compara tu ejemplo con la explicación."
      case "mechanics": return "Sigue entrada → representación → regla → cambio → salida. Di en voz alta qué cambia en cada paso y qué permanece igual."
      case "anatomy": return "Lee una línea cada vez. Pulsa una explicación para llevar el cursor del Code Studio a esa línea y relacionar teoría con código real."
      case "guided": return `Abre ${fileName} en Code Studio, restaura el ejemplo, escribe tu predicción y ejecuta. Después modifica únicamente lo que indica el experimento.`
      case "practice": return `Realiza primero la variación controlada: ${concept.experiment}. Luego crea un segundo ejemplo distinto.`
      case "debug": return "Provoca o reproduce un fallo pequeño. Abre PROBLEMAS, identifica la primera causa observable y modifica una sola cosa antes de volver a ejecutar."
      case "test": return "Responde las preguntas sin revelar la respuesta. Después pulsa Probar en Code Studio y explica cualquier diferencia entre lo esperado y lo obtenido."
      case "project": return `Conecta el concepto con el proyecto del nivel: ${level.project}. Define primero contrato, casos y versión mínima.`
      case "mastery": return `Comprueba el gate completo: ${level.gate}. Registra dominio solo cuando puedas construir, probar, depurar y explicar sin seguir el ejemplo paso a paso.`
    }
  })()

  const questions = [
    { q: `¿Qué es ${concept.title}?`, a: concept.what },
    { q: "¿Qué problema resuelve o por qué existe?", a: concept.why },
    { q: "¿Cuándo tiene sentido usarlo?", a: concept.use },
    { q: "¿Qué modelo mental mínimo conviene conservar?", a: concept.model },
  ]

  const goNext = () => {
    if (stepIndex < lessonSteps.length - 1) {
      setStepIndex((value) => value + 1)
      return
    }
    setCompleted((current) => new Set(current).add(concept.id))
    if (conceptIndex < level.topics.length - 1) selectConcept(conceptIndex + 1, 0)
  }

  const goPrevious = () => {
    if (stepIndex > 0) {
      setStepIndex((value) => value - 1)
      return
    }
    if (conceptIndex > 0) selectConcept(conceptIndex - 1, lessonSteps.length - 1)
  }

  return (
    <div className="v52-classroom" role="dialog" aria-modal="true" aria-label={`Aula de programación ${level.code}`}>
      <header className="v52-classroom-top">
        <div className="v52-classroom-title">
          <button type="button" onClick={onClose} aria-label="Cerrar aula"><X /></button>
          <div><small>{level.code} · {level.phase}</small><h2>{level.title}</h2></div>
        </div>
        <div className="v52-classroom-progress"><span>{Math.min(100, progress)}% del nivel recorrido</span><div><i style={{ width: `${Math.min(100, progress)}%` }} /></div></div>
        <div className="v52-classroom-status"><b>{completed.size}/{level.topics.length}</b><span>conceptos con evidencia</span></div>
      </header>

      <div className="v52-classroom-grid">
        <aside className="v52-syllabus">
          <section className="v52-level-goal"><GraduationCap /><small>OBJETIVO DEL NIVEL</small><p>{level.goal}</p></section>
          <div className="v52-syllabus-title"><span>RECORRIDO DEL NIVEL</span><small>Avanza en orden mientras estés aprendiendo.</small></div>
          <nav>
            {level.topics.map((item, index) => (
              <button type="button" key={item.id} className={`${index === conceptIndex ? "active" : ""} ${completed.has(item.id) ? "done" : ""}`} onClick={() => selectConcept(index)}>
                <span>{completed.has(item.id) ? <Check /> : String(index + 1).padStart(2, "0")}</span>
                <div><b>{item.title}</b><small>{completed.has(item.id) ? "Evidencia registrada" : "En recorrido"}</small></div>
                <ChevronRight />
              </button>
            ))}
          </nav>
          <section className="v52-source-mini">
            <small>FUENTES DEL NIVEL</small>
            {sources.slice(0, 5).map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span>{source.author}</span><b>{source.title}</b><ExternalLink /></a>)}
          </section>
        </aside>

        <main className="v52-lesson">
          <section className="v52-do-now"><Info /><div><small>AHORA</small><b>{exactAction}</b></div></section>

          <nav className="v52-stepper" aria-label="Secuencia de la lección">
            {lessonSteps.map((step, index) => (
              <button type="button" key={step.id} className={index === stepIndex ? "active" : ""} onClick={() => setStepIndex(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span><b>{step.label}</b>
              </button>
            ))}
          </nav>

          <section className="v52-teacher-card">
            <header><div><small>CONCEPTO {conceptIndex + 1}/{level.topics.length} · PASO {stepIndex + 1}/{lessonSteps.length}</small><h3>{concept.title}</h3><p>{currentStep.question}</p></div><BookOpen /></header>

            {currentStep.id === "orientation" && <div className="v52-content-grid three">
              <article><small>QUÉ APRENDERÁS</small><p>{concept.what}</p></article>
              <article><small>POR QUÉ ESTÁ EN ESTE PUNTO</small><p>{concept.why}</p></article>
              <article><small>ANTES DE CONTINUAR</small><p>Debes reconocer el problema que estudia este concepto y poder describir un ejemplo real, aunque todavía no sepas programarlo.</p></article>
              <article className="wide"><small>PROYECTO DEL NIVEL</small><p><strong>{level.project}</strong></p><p>La evidencia final se comprueba con: {level.gate}</p></article>
            </div>}

            {currentStep.id === "meaning" && <div className="v52-content-grid">
              <article className="wide"><small>DEFINICIÓN</small><p className="lead">{concept.what}</p></article>
              <article><small>MODELO MENTAL</small><p>{concept.model}</p></article>
              <article><small>COMPRUEBA TU EXPLICACIÓN</small><p>Intenta explicarlo sin mirar. Si usas otra palabra técnica, asegúrate de saber definirla también.</p></article>
              <article className="wide v52-glossary"><small>TÉRMINOS NECESARIOS</small><div>{universalGlossary.map(([term, definition]) => <span key={term}><b>{term}</b><em>{definition}</em></span>)}</div></article>
            </div>}

            {currentStep.id === "purpose" && <div className="v52-content-grid three">
              <article><small>PARA QUÉ SIRVE</small><p>{concept.why}</p></article>
              <article><small>CUÁNDO SE USA</small><p>{concept.use}</p></article>
              <article><small>CUÁNDO EVITARLO</small><p>No lo introduzcas por costumbre. Comprueba primero que el problema necesita la propiedad que aporta.</p></article>
              <article className="wide"><small>TRANSFERENCIA</small><p>Busca un sistema, aplicación o situación cotidiana donde aparezca la misma necesidad aunque se resuelva con otra sintaxis o tecnología.</p></article>
            </div>}

            {currentStep.id === "mechanics" && <div className="v52-mechanics">
              <article className="v52-model"><small>MODELO QUE DEBES PODER DIBUJAR</small><h4>{concept.model}</h4></article>
              <ol>
                <li><b>1 · Entrada</b><span>Identifica qué información existe antes de aplicar el concepto.</span></li>
                <li><b>2 · Representación</b><span>Determina cómo se expresa: valor, estructura, estado, token, nodo, request u otra forma.</span></li>
                <li><b>3 · Regla</b><span>Explica qué operación, relación o condición se aplica.</span></li>
                <li><b>4 · Cambio</b><span>Señala exactamente qué estado cambia y qué permanece igual.</span></li>
                <li><b>5 · Salida</b><span>Describe el resultado observable o el nuevo estado.</span></li>
                <li><b>6 · Invariante</b><span>Comprueba qué propiedad debe seguir siendo verdadera para considerar correcto el proceso.</span></li>
              </ol>
            </div>}

            {currentStep.id === "anatomy" && <div className="v52-anatomy">
              <div className="v52-code-readonly"><div><FileCode2 /><b>{fileName}</b><span>ejemplo de referencia</span></div><pre>{sourceSnippet(concept)}</pre></div>
              <div className="v52-line-notes">{anatomyLines.map((line, index) => <button type="button" key={`${index}-${line}`} onClick={() => studioRef.current?.focusLine(index + 1)}><span>{index + 1}</span><p>{lineExplanation(line, index, concept)}</p><ChevronRight /></button>)}</div>
            </div>}

            {currentStep.id === "guided" && <div className="v52-guided">
              <ol>
                <li><b>Abre el archivo de trabajo</b><span>En Code Studio selecciona <code>{fileName}</code>. El código se escribe en el editor central, no en la salida.</span></li>
                <li><b>Restaura la referencia</b><span>Usa Restaurar para volver al punto inicial cuando necesites repetir el procedimiento.</span></li>
                <li><b>Lee sin ejecutar</b><span>Recorre el ejemplo y predice qué valor, estado o salida aparecerá.</span></li>
                <li><b>Escribe tu predicción</b><span>Registra qué crees que ocurrirá y una razón concreta.</span></li>
                <li><b>Ejecuta</b><span>Usa Ejecutar. Para JavaScript/Python verás salida en terminal; en web verás Preview.</span></li>
                <li><b>Compara</b><span>Busca la primera diferencia entre tu predicción y el resultado real.</span></li>
                <li><b>Modifica una sola cosa</b><span>{concept.experiment}</span></li>
                <li><b>Vuelve a probar</b><span>Ejecuta nuevamente y explica qué cambio produjo qué efecto.</span></li>
              </ol>
              <div className="v52-guided-actions"><button type="button" onClick={() => studioRef.current?.openMain()}><FileCode2 />Abrir {fileName}</button><button type="button" onClick={() => studioRef.current?.reset()}><RotateCcw />Restaurar</button><button type="button" className="primary" onClick={() => void studioRef.current?.run()}><Play />Ejecutar en Studio</button></div>
            </div>}

            {currentStep.id === "practice" && <div className="v52-practice-panel">
              <article><small>EJERCICIO 1 · MODIFICACIÓN CONTROLADA</small><h4>{concept.experiment}</h4><p>Cambia únicamente lo necesario. Actualiza la predicción antes de ejecutar.</p></article>
              <article><small>EJERCICIO 2 · VARIACIÓN</small><h4>Crea un segundo ejemplo con datos y nombres diferentes.</h4><p>Conserva el principio; no copies la solución línea por línea.</p></article>
              <article><small>EJERCICIO 3 · CASO LÍMITE</small><h4>Prueba vacío, cero, mínimo, máximo, ausencia o duplicado cuando tenga sentido.</h4><p>Escribe primero qué debería ocurrir según el contrato.</p></article>
              <article><small>EJERCICIO 4 · EXPLICACIÓN</small><h4>Describe el mecanismo sin mostrar código.</h4><p>Si no puedes explicar el flujo, vuelve a Desarma antes de continuar.</p></article>
            </div>}

            {currentStep.id === "debug" && <div className="v52-debug-panel">
              <article><AlertTriangle /><div><small>PROCEDIMIENTO DE DEPURACIÓN</small><h4>Busca evidencia antes de modificar.</h4></div></article>
              <ol>
                <li><b>Reproduce.</b> Encuentra la entrada más pequeña que haga aparecer el problema.</li>
                <li><b>Lee.</b> Observa tipo de error, archivo, línea y mensaje antes de editar.</li>
                <li><b>Predice.</b> Escribe qué estado esperabas justo antes del fallo.</li>
                <li><b>Observa.</b> Inspecciona qué estado obtuvo realmente el programa.</li>
                <li><b>Localiza.</b> Encuentra el primer punto donde esperado y real dejan de coincidir.</li>
                <li><b>Formula una hipótesis.</b> Propón una causa concreta que explique esa diferencia.</li>
                <li><b>Cambia una cosa.</b> Corrige únicamente esa causa y vuelve a ejecutar.</li>
                <li><b>Conserva una regresión.</b> Mantén una prueba que falle antes y pase después.</li>
              </ol>
              <div className="v52-debug-actions"><button type="button" onClick={() => studioRef.current?.openMain()}><FileCode2 />Ir al editor</button><button type="button" onClick={() => void studioRef.current?.runTests()}><TestTube2 />Ejecutar comprobación</button></div>
            </div>}

            {currentStep.id === "test" && <div className="v52-question-list">
              {questions.map((item, index) => <article key={item.q}><div><CircleHelp /><b>{item.q}</b></div>{revealed.has(index) ? <p>{item.a}</p> : <button type="button" onClick={() => setRevealed((current) => new Set(current).add(index))}>Mostrar respuesta después de intentarlo</button>}</article>)}
              <button type="button" className="v52-run-check" onClick={() => void studioRef.current?.runTests()}><TestTube2 />Probar el archivo actual en Code Studio</button>
            </div>}

            {currentStep.id === "project" && <div className="v52-project-panel">
              <article><small>PROYECTO DEL NIVEL</small><h4>{level.project}</h4><p>Define entrada y salida, contrato, casos normales y límite. Construye primero una versión mínima correcta; después prueba y refactoriza.</p></article>
              <article><small>PAPEL DE {concept.title.toUpperCase()}</small><h4>{concept.title}</h4><p>{concept.why}</p></article>
              <ol><li>Especifica el comportamiento observable.</li><li>Diseña casos normales y límite.</li><li>Implementa una versión mínima.</li><li>Ejecuta pruebas y depura.</li><li>Documenta una decisión técnica.</li><li>Explica qué cambiaría si cambiara la escala o requisito.</li></ol>
            </div>}

            {currentStep.id === "mastery" && <div className="v52-mastery-panel">
              <article><SearchCheck /><div><small>GATE DEL NIVEL</small><h4>{level.gate}</h4></div></article>
              <div className="v52-mastery-checks">
                <span><CheckCircle2 />Defino {concept.title} sin leer.</span>
                <span><CheckCircle2 />Explico por qué existe y cuándo evitarlo.</span>
                <span><CheckCircle2 />Puedo predecir el ejemplo antes de ejecutarlo.</span>
                <span><CheckCircle2 />Creo un ejemplo distinto desde cero.</span>
                <span><CheckCircle2 />Diagnostico un fallo sin reiniciar todo el trabajo.</span>
                <span><CheckCircle2 />Relaciono la idea con otro lenguaje o sistema.</span>
              </div>
              {lastExecution && <div className={`v52-last-run ${lastExecution.hasError ? "error" : lastExecution.expectedMatches ? "ok" : ""}`}><Lightbulb /><p><b>Última ejecución:</b> {lastExecution.hasError ? "contiene un error que debes explicar" : lastExecution.expectedMatches ? "coincide con la referencia" : "requiere comparación manual con el contrato"}.</p></div>}
              <button type="button" className={completed.has(concept.id) ? "done" : ""} onClick={() => setCompleted((current) => { const next = new Set(current); if (next.has(concept.id)) next.delete(concept.id); else next.add(concept.id); return next })}>{completed.has(concept.id) ? <><Check /> Evidencia registrada</> : "Registrar evidencia de este concepto"}</button>
              <p>El registro es local. La evidencia real es poder resolver, comprobar y explicar sin depender del ejemplo.</p>
            </div>}
          </section>

          <footer className="v52-lesson-footer">
            <button type="button" onClick={goPrevious} disabled={conceptIndex === 0 && stepIndex === 0}><ArrowLeft />Anterior</button>
            <div><b>{currentStep.label}</b><span>{currentStep.question}</span></div>
            <button type="button" onClick={goNext}>{stepIndex === lessonSteps.length - 1 && conceptIndex < level.topics.length - 1 ? "Siguiente concepto" : "Siguiente"}<ArrowRight /></button>
          </footer>
        </main>

        <aside className="v52-workspace">
          <CampusCodeStudioV52 ref={studioRef} key={`${levelCode}-${concept.id}`} levelCode={levelCode} concept={concept} onExecution={setLastExecution} />
        </aside>
      </div>
    </div>
  )
}
