import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  Award,
  BookOpen,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Flag,
  Gamepad2,
  GraduationCap,
  Layers3,
  LibraryBig,
  Play,
  Rocket,
  RotateCcw,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  X,
} from "lucide-react"
import { programmingLevels } from "./learning-data"
import ProceduralBackdrop from "./ProceduralBackdrop"
import AlgorithmLabV46 from "../v46/AlgorithmLabV46"
import { academyLevels, languageCatalog, missionTemplates, practiceResources } from "../v46/programming-v46-data"
import "../v46/programming-v46.css"
import LevelProfessorV47 from "../v47/LevelProfessorV47"
import BlocklyPrimerV47 from "../v47/BlocklyPrimerV47"
import ProgrammingQuestV47 from "../v47/ProgrammingQuestV47"
import "../v47/programming-v47.css"
import AdvancedProgrammingLabsV49 from "../v49/AdvancedProgrammingLabsV49"
import "../v49/programming-v49.css"
import GuidedProgrammingClassroomV50 from "../v50/GuidedProgrammingClassroomV50"

type PyodideLike = {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (options: { batched: (text: string) => void }) => void
  setStderr: (options: { batched: (text: string) => void }) => void
}

type PyodideWindow = Window & {
  loadPyodide?: (options?: { indexURL?: string }) => Promise<PyodideLike>
}

type StudioTab = "entender" | "bloques" | "laboratorio" | "quest" | "proyecto" | "avanzado"

type LogoItem = {
  name: string
  family: string
  logo: string
}

const projectSteps = [
  "Reformula el problema con tus propias palabras y define entradas/salidas.",
  "Escribe ejemplos y casos de prueba antes de terminar la solución.",
  "Implementa una versión mínima correcta y medible.",
  "Refactoriza nombres, estructura, manejo de errores y rendimiento.",
  "Documenta y defiende decisiones: README, pruebas y explicación técnica.",
]

const studioTabs: { id: StudioTab; label: string; icon: typeof LibraryBig; title: string; helper: string }[] = [
  { id: "entender", label: "Profesor", icon: LibraryBig, title: "Entiende el concepto antes de tocar el editor", helper: "Aquí el profesor te explica qué es el tema, por qué existe, cómo pensarlo y qué debes dominar." },
  { id: "bloques", label: "Lógica visual", icon: Boxes, title: "Empieza con bloques si todavía estás en cero", helper: "Primero construyes la idea visualmente; luego ves cómo esa misma idea se convierte en código real." },
  { id: "laboratorio", label: "Lección + código", icon: Code2, title: "Lee, programa y comprueba en el mismo lugar", helper: "La explicación, el editor, el resultado y las comprobaciones viven juntos para que no te pierdas." },
  { id: "quest", label: "Quest guiada", icon: Gamepad2, title: "Practica con guía dentro de una sola experiencia", helper: "La parte visual no es un juego separado: es una práctica guiada donde el profesor te indica qué escribir y por qué." },
  { id: "proyecto", label: "Proyecto", icon: Rocket, title: "Convierte el tema en evidencia y dominio", helper: "No basta con leer o jugar: aquí construyes algo, verificas lo aprendido y lo defiendes." },
  { id: "avanzado", label: "Laboratorio avanzado", icon: Sparkles, title: "Conecta programación con GPU y mundos 3D", helper: "Cuando domines el núcleo, explora shaders, transformaciones, cámaras, materiales y renderizado sin separar la práctica del curso." },
]

const logoByName: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
  Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
  Swift: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
  Kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
  Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  R: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
  Julia: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/julia/julia-original.svg",
  Scala: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg",
  Haskell: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/haskell/haskell-original.svg",
  Elixir: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elixir/elixir-original.svg",
  Erlang: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/erlang/erlang-original.svg",
  Clojure: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clojure/clojure-original.svg",
  "F#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fsharp/fsharp-original.svg",
  OCaml: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ocaml/ocaml-original.svg",
  Lua: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg",
  Perl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg",
  Bash: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  PowerShell: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg",
  Zig: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zig/zig-original.svg",
  Nim: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nim/nim-original.svg",
  Crystal: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/crystal/crystal-original.svg",
  Groovy: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg",
  Solidity: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg",
  Fortran: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fortran/fortran-original.svg",
  COBOL: "https://cdn.simpleicons.org/cobol",
  Ada: "https://cdn.simpleicons.org/ada",
  Pascal: "https://cdn.simpleicons.org/delphi",
  "Delphi/Object Pascal": "https://cdn.simpleicons.org/delphi",
  "Objective-C": "https://cdn.simpleicons.org/apple",
  "Visual Basic": "https://cdn.simpleicons.org/dotnet",
  MATLAB: "https://cdn.simpleicons.org/mathworks",
  "GNU Octave": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/octave/octave-original.svg",
  SAS: "https://cdn.simpleicons.org/sas",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "PL/SQL": "https://cdn.simpleicons.org/oracle",
  "T-SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
  GraphQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  Sass: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
  WebAssembly: "https://cdn.simpleicons.org/webassembly",
  Racket: "https://cdn.simpleicons.org/racket",
  Scheme: "https://cdn.simpleicons.org/scheme",
  "Common Lisp": "https://cdn.simpleicons.org/commonlisp",
  Prolog: "https://cdn.simpleicons.org/prolog",
  Scratch: "https://cdn.simpleicons.org/scratch",
  Blockly: "https://cdn.simpleicons.org/blockly",
  Arduino: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
  VHDL: "https://cdn.simpleicons.org/vhdl",
  Verilog: "https://cdn.simpleicons.org/verilog",
  SystemVerilog: "https://cdn.simpleicons.org/verilog",
  GDScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg",
  "Shader / GLSL": "https://cdn.simpleicons.org/opengl",
  CUDA: "https://cdn.simpleicons.org/nvidia",
  OpenCL: "https://cdn.simpleicons.org/khronosgroup",
  Apex: "https://cdn.simpleicons.org/salesforce",
  ABAP: "https://cdn.simpleicons.org/sap",
  Cairo: "https://cdn.simpleicons.org/starknet",
  Move: "https://cdn.simpleicons.org/sui",
  "Q#": "https://cdn.simpleicons.org/microsoftazure",
  "Wolfram Language": "https://cdn.simpleicons.org/wolfram",
  LabVIEW: "https://cdn.simpleicons.org/labview",
}


const verifiedLogoLanguages = new Set<string>([
  "Python", "JavaScript", "TypeScript", "Java", "C", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Dart", "R", "Julia",
  "Scala", "Haskell", "Elixir", "Erlang", "Clojure", "F#", "OCaml", "Lua", "Perl", "Bash", "PowerShell", "Zig", "Nim", "Crystal",
  "Groovy", "Solidity", "Fortran", "GNU Octave", "T-SQL", "GraphQL", "HTML", "CSS", "Sass", "Arduino", "GDScript"
])

function runJavaScript(code: string): Promise<string> {
  return new Promise((resolve) => {
    const workerSource = `
      const logs = [];
      const format = (value) => {
        try { return typeof value === 'string' ? value : JSON.stringify(value, null, 2); }
        catch { return String(value); }
      };
      console.log = (...args) => logs.push(args.map(format).join(' '));
      console.error = (...args) => logs.push('[error] ' + args.map(format).join(' '));
      self.onmessage = (event) => {
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
      resolve("Tiempo límite excedido. Revisa bucles infinitos o una operación muy costosa.")
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
      const existing = document.querySelector<HTMLScriptElement>("script[data-campus-pyodide]")
      if (existing) {
        if (win.loadPyodide) resolve()
        else {
          existing.addEventListener("load", () => resolve(), { once: true })
          existing.addEventListener("error", () => reject(new Error("No se pudo cargar Pyodide.")), { once: true })
        }
        return
      }
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.js"
      script.async = true
      script.dataset.campusPyodide = "true"
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("No se pudo cargar Pyodide. Comprueba tu conexión."))
      document.head.appendChild(script)
    })
  }
  if (!win.loadPyodide) throw new Error("Pyodide no está disponible en este navegador.")
  return win.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/" })
}

function LanguageLogoCard({ item }: { item: LogoItem }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <article className="v48-language-card">
      <span className="v48-logo-wrap">
        <img src={item.logo} alt={`Logo oficial o de referencia de ${item.name}`} loading="lazy" onError={() => setFailed(true)} />
      </span>
      <div>
        <b>{item.name}</b>
        <small>{item.family}</small>
      </div>
    </article>
  )
}

export default function ProgrammingHubV41() {
  const [activeLevel, setActiveLevel] = useState(0)
  const [activeMission, setActiveMission] = useState(0)
  const [studioTab, setStudioTab] = useState<StudioTab>("entender")
  const [studioOpen, setStudioOpen] = useState(false)
  const [code, setCode] = useState(missionTemplates[0].starter)
  const [output, setOutput] = useState("Pulsa Ejecutar cuando estés listo.")
  const [webDoc, setWebDoc] = useState(missionTemplates[0].language === "web" ? missionTemplates[0].starter : "")
  const [running, setRunning] = useState(false)
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(() => {
    try { return new Set<string>(JSON.parse(localStorage.getItem("campus-program-levels-v46") ?? "[]")) } catch { return new Set<string>() }
  })
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(() => {
    try { return new Set<string>(JSON.parse(localStorage.getItem("campus-program-missions-v46") ?? "[]")) } catch { return new Set<string>() }
  })
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => {
    try { return new Set<number>(JSON.parse(localStorage.getItem("campus-v41-program-project") ?? "[]")) } catch { return new Set<number>() }
  })
  const pyodideRef = useRef<PyodideLike | null>(null)

  const level = academyLevels[activeLevel]
  const mission = missionTemplates[activeMission]
  const legacyLevel = programmingLevels[Math.min(activeLevel, programmingLevels.length - 1)]
  const progress = Math.round((completedLevels.size / academyLevels.length) * 100)
  const xp = completedMissions.size * 80 + completedLevels.size * 250 + completedSteps.size * 25

  const displayLanguageCatalog = useMemo(
    () => languageCatalog
      .filter((item) => verifiedLogoLanguages.has(item.name) && Boolean(logoByName[item.name]))
      .map((item) => ({ name: item.name, family: item.family, logo: logoByName[item.name] })),
    []
  )

  const activeStudio = studioTabs.find((item) => item.id === studioTab) ?? studioTabs[0]

  useEffect(() => localStorage.setItem("campus-program-levels-v46", JSON.stringify(Array.from(completedLevels))), [completedLevels])
  useEffect(() => localStorage.setItem("campus-program-missions-v46", JSON.stringify(Array.from(completedMissions))), [completedMissions])
  useEffect(() => localStorage.setItem("campus-v41-program-project", JSON.stringify(Array.from(completedSteps))), [completedSteps])
  useEffect(() => {
    if (!studioOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [studioOpen])

  const localChecks = useMemo(() => {
    const source = code.toLowerCase()
    return [
      { label: "Hay código para evaluar", ok: code.trim().length > 6 },
      { label: "Incluye una salida o interacción", ok: /print\(|console\.|document\.|return/.test(source) },
      { label: "No contiene marcadores pendientes", ok: !/todo|completa aquí|pass\s*$/.test(source) },
      { label: "La misión tiene una salida objetivo", ok: Boolean(mission.expected) },
    ]
  }, [code, mission.expected])

  const selectMission = (index: number) => {
    const nextMission = missionTemplates[index]
    setActiveMission(index)
    setCode(nextMission.starter)
    setOutput(`Misión cargada: ${nextMission.title}.`)
    if (nextMission.language === "web") setWebDoc(nextMission.starter)
    setStudioTab("laboratorio")
    setStudioOpen(true)
  }

  const selectLevel = (index: number) => {
    setActiveLevel(index)
    setStudioTab("entender")
    setStudioOpen(true)
  }

  const run = async () => {
    setRunning(true)
    setOutput("Ejecutando…")
    try {
      let result = ""
      if (mission.language === "javascript") {
        result = await runJavaScript(code)
      } else if (mission.language === "web") {
        setWebDoc(code)
        result = "Vista previa web actualizada. Interactúa con ella para comprobar el comportamiento."
      } else {
        const pyodide = pyodideRef.current ?? await loadPyodideRuntime()
        pyodideRef.current = pyodide
        const lines: string[] = []
        pyodide.setStdout({ batched: (text) => lines.push(text) })
        pyodide.setStderr({ batched: (text) => lines.push(`[error] ${text}`) })
        const response = await pyodide.runPythonAsync(code)
        if (response !== undefined && response !== null) lines.push(String(response))
        result = lines.join("\n") || "Python ejecutado sin salida."
      }
      setOutput(result)
      if (mission.language === "web" || result.toLowerCase().includes(mission.expected.toLowerCase())) {
        setCompletedMissions((current) => new Set(current).add(mission.id))
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : String(error))
    } finally {
      setRunning(false)
    }
  }

  const navigation = [
    { id: "program-route", label: "Recorrido", icon: Layers3 },
    { id: "program-masterclass", label: "Estudio unificado", icon: Sparkles },
    { id: "program-resources", label: "Recursos", icon: BookOpen },
  ]
  const studioIndex = Math.max(0, studioTabs.findIndex((item) => item.id === studioTab))
  const goStudioStep = (offset: number) => {
    const next = Math.max(0, Math.min(studioTabs.length - 1, studioIndex + offset))
    setStudioTab(studioTabs[next].id)
  }

  return (
    <main className="v41-learning-page v41-program-page v46-program-page">
      <section className="v41-learning-hero v46-program-hero">
        <ProceduralBackdrop variant="blue" />
        <div className="v41-learning-hero-copy">
          <span>PROGRAMACIÓN · CERO ABSOLUTO → INGENIERÍA AVANZADA</span>
          <h1>Aprende programando.<br /><em>Sin saltarte los fundamentos.</em></h1>
          <p>Un recorrido ordenado que combina lógica, misiones breves, laboratorio ejecutable, visualización, práctica guiada y proyectos. Empieza sin asumir conocimientos previos y termina en sistemas, cloud, seguridad, compiladores, arquitectura y rendimiento.</p>
          <div className="v41-hero-pills"><b>20 niveles</b><b>profesor integrado</b><b>Python en navegador</b><b>JavaScript aislado</b><b>proyectos por evidencia</b></div>
        </div>
        <div className="v41-code-float" aria-hidden="true"><Terminal /><code>understand → code → test → debug → build → explain</code></div>
      </section>

      <section className="v46-language-zone v48-language-zone" aria-label="Lenguajes y tecnologías">
        <div className="v46-language-head"><span>LENGUAJES · PARADIGMAS · ECOSISTEMAS</span><b>{displayLanguageCatalog.length} lenguajes con logos reales en la cinta</b><p>Ahora la cinta va mucho más lenta, usa logos verificados a color y elimina los casos donde antes aparecían iniciales sueltas. Pasa el mouse encima para pausarla; en móvil puedes arrastrarla con el dedo.</p></div>
        <div className="v46-language-marquee">
          <div className="v46-language-track v48-language-track">
            {[...displayLanguageCatalog, ...displayLanguageCatalog].map((item, index) => (
              <LanguageLogoCard item={item} key={`${item.name}-${index}`} />
            ))}
          </div>
        </div>
      </section>

      <section id="program-route" className="v41-section v46-academy-section">
        <div className="v46-academy-shell">
          <aside className="v46-academy-nav">
            <div className="v46-academy-brand"><span>CM</span><div><b>Programming Academy</b><small>Ruta de dominio</small></div></div>
            <nav>{navigation.map((item) => { const Icon = item.icon; return <button type="button" key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}><Icon /><span>{item.label}</span><ChevronRight /></button> })}</nav>
          </aside>

          <div className="v46-learning-path">
            <header><div><span>RECORRIDO PRINCIPAL</span><h2>Una secuencia, no una colección de cursos.</h2></div><div className="v46-path-meta"><b>{completedLevels.size}/{academyLevels.length}</b><small>niveles verificados</small></div></header>
            <div className="v46-path-progress"><i style={{ width: `${progress}%` }} /></div>
            <div className="v46-path-list">
              {academyLevels.map((item, index) => {
                const done = completedLevels.has(item.code)
                return <button type="button" key={item.code} className={`v46-path-node ${activeLevel === index ? "active" : ""} ${done ? "done" : ""}`} onClick={() => selectLevel(index)}>
                  <span className="v46-node-medallion">{done ? "✓" : item.code.replace("L", "")}</span>
                  <div><small>{item.code} · {item.phase}</small><h3>{item.title}</h3><p>{item.summary}</p><footer><span>{item.languages.slice(0, 3).join(" · ")}</span><b>{done ? "Dominado" : "Abrir"}</b></footer></div>
                </button>
              })}
            </div>
          </div>

          <aside className="v46-academy-stats">
            <div className="v46-stat-card primary"><GraduationCap /><span>Nivel actual</span><h3>{level.code}</h3><p>{level.title}</p></div>
            <div className="v46-stat-card"><Trophy /><span>XP local</span><h3>{xp}</h3><p>Se guarda solo en este dispositivo.</p></div>
            <div className="v46-stat-card"><Flag /><span>Misión activa</span><h4>{mission.title}</h4><button type="button" onClick={() => selectMission(activeMission)}>Continuar</button></div>
            <div className="v46-daily-card"><b>Objetivos de hoy</b><div><span>Completar una misión</span><i className={completedMissions.size > 0 ? "done" : ""} /></div><div><span>Ejecutar código</span><i className={output !== "Pulsa Ejecutar cuando estés listo." ? "done" : ""} /></div><div><span>Trabajar un proyecto</span><i className={completedSteps.size > 0 ? "done" : ""} /></div></div>
          </aside>
        </div>
      </section>

      <section id="program-level-detail" className="v41-section v46-level-detail">
        <div className="v46-level-main"><span>{level.code} · {level.phase}</span><h2>{level.title}</h2><p>{level.summary}</p><div className="v46-topic-cloud">{level.topics.map((topic) => <b key={topic}>{topic}</b>)}</div><div className="v46-level-actions"><button type="button" onClick={() => setCompletedLevels((current) => { const next = new Set(current); if (next.has(level.code)) next.delete(level.code); else next.add(level.code); return next })}>{completedLevels.has(level.code) ? "Marcar pendiente" : "Marcar nivel dominado"}</button><button type="button" onClick={() => setActiveLevel((current) => Math.min(academyLevels.length - 1, current + 1))}>Siguiente nivel <ArrowRight /></button></div></div>
        <article className="v46-level-project"><small>PROYECTO + GATE</small><h3>{level.project}</h3><p><strong>Gate:</strong> {level.gate}</p><div>{level.languages.map((language) => <span key={language}>{language}</span>)}</div></article>
      </section>

      <section id="program-masterclass" className="v41-section v49-launch-section">
        <div className="v49-launch-card">
          <div><span>ESTUDIO UNIFICADO</span><h2>Un nivel, una sola aula.</h2><p>Abre el nivel activo en una experiencia a pantalla completa. El profesor, la lógica visual, el editor, la práctica guiada, el proyecto y los laboratorios avanzados aparecen en orden, sin mezclarte módulos distintos en una sola página larga.</p></div>
          <button type="button" onClick={() => { setStudioTab("entender"); setStudioOpen(true) }}><Sparkles />Entrar a {level.code} · {level.title}<ArrowRight /></button>
        </div>
      </section>

      {studioOpen && <GuidedProgrammingClassroomV50 key={level.code} levelCode={level.code} onClose={() => setStudioOpen(false)} isMastered={completedLevels.has(level.code)} onToggleMastery={() => setCompletedLevels((current) => { const next = new Set(current); if (next.has(level.code)) next.delete(level.code); else next.add(level.code); return next })} />}

      {studioOpen && window.location.hash === "#__legacy-program-studio" && (
        <div className="v49-course-overlay" role="dialog" aria-modal="true" aria-label={`Aula de programación ${level.code}`}>
          <div className="v49-course-shell">
            <header className="v49-course-header">
              <div className="v49-course-title"><button type="button" onClick={() => setStudioOpen(false)} aria-label="Cerrar aula"><X /></button><div><small>{level.code} · {level.phase}</small><h2>{level.title}</h2></div></div>
              <div className="v49-course-progress"><span>Paso {studioIndex + 1} de {studioTabs.length}</span><div><i style={{ width: `${((studioIndex + 1) / studioTabs.length) * 100}%` }} /></div></div>
              <div className="v49-course-xp"><b>{xp} XP</b><small>{completedMissions.size} misiones superadas</small></div>
            </header>

            <div className="v49-course-layout">
              <aside className="v49-course-sidebar">
                <div className="v49-course-level-summary"><small>OBJETIVO DEL NIVEL</small><p>{level.summary}</p><div>{level.languages.map((language) => <span key={language}>{language}</span>)}</div></div>
                <nav>
                  {studioTabs.map((item, index) => {
                    const Icon = item.icon
                    return <button type="button" key={item.id} className={studioTab === item.id ? "active" : ""} onClick={() => setStudioTab(item.id)}><span>{String(index + 1).padStart(2,"0")}</span><Icon /><div><b>{item.label}</b><small>{item.title}</small></div></button>
                  })}
                </nav>
                <div className="v49-course-help"><Target /><p><strong>Ahora:</strong> {activeStudio.helper}</p></div>
              </aside>

              <main className="v49-course-content">
                {studioTab === "entender" && <section className="v49-course-stage"><header><small>PASO 01 · PROFESOR</small><h3>Primero entiendes. Después programas.</h3><p>No memorices una línea que todavía no puedes explicar. El profesor desarma el concepto, su propósito, su modelo mental, el vocabulario y los errores comunes.</p></header><LevelProfessorV47 levelCode={level.code} /></section>}

                {studioTab === "bloques" && <section className="v49-course-stage"><header><small>PASO 02 · LÓGICA VISUAL</small><h3>Construye la idea antes de pelear con la sintaxis.</h3><p>En los niveles iniciales usa bloques para observar secuencia, estado, condición, bucle y función. Después compara el resultado con código textual.</p></header><BlocklyPrimerV47 /></section>}

                {studioTab === "laboratorio" && <section className="v49-course-stage"><header><small>PASO 03 · LECCIÓN + CÓDIGO</small><h3>Una misión concreta, explicación, editor y resultado.</h3><p>Elige una misión asociada al recorrido. Lee el objetivo, predice, programa, ejecuta, compara y corrige la primera causa del fallo.</p></header>
                  <div className="v46-mission-grid v48-mission-grid">{missionTemplates.map((item, index) => <button type="button" key={item.id} className={`${activeMission === index ? "active" : ""} ${completedMissions.has(item.id) ? "done" : ""}`} onClick={() => { setActiveMission(index); setCode(item.starter); setOutput(`Misión cargada: ${item.title}.`); if (item.language === "web") setWebDoc(item.starter) }}><span>{completedMissions.has(item.id) ? "✓" : String(index + 1).padStart(2,"0")}</span><small>{item.level} · {item.language}</small><h3>{item.title}</h3><p>{item.objective}</p></button>)}</div>
                  <div className="v46-workspace">
                    <article className="v46-lesson-pane"><div className="v46-lesson-top"><small>{mission.level} · {mission.language.toUpperCase()}</small><span>{completedMissions.has(mission.id) ? "Superada" : "En progreso"}</span></div><h3>{mission.title}</h3><p>{mission.objective}</p><div className="v46-task-box"><h4>Qué hacer</h4><ol>{mission.instructions.map((item) => <li key={item}>{item}</li>)}</ol></div><div className="v46-expected"><small>RESULTADO ESPERADO</small><code>{mission.expected}</code></div><div className="v48-teacher-mini"><Sparkles /><div><b>Método del profesor</b><p>1) Lee el objetivo. 2) Predice. 3) Localiza dónde debes modificar. 4) Ejecuta. 5) Compara salida real y esperada. 6) Corrige una causa cada vez. 7) Explica por qué funcionó.</p></div></div><div className="v46-lesson-actions"><button type="button" onClick={() => setCode(mission.starter)}><RotateCcw />Restaurar</button><button type="button" onClick={() => setCompletedMissions((current) => new Set(current).add(mission.id))}><Award />Marcar superada</button></div></article>
                    <div className="v46-editor-pane"><div className="v46-editor-top"><div><span>{mission.language === "web" ? "HTML / CSS / JS" : mission.language === "python" ? "Python" : "JavaScript"}</span><small>Editor de la lección</small></div><button type="button" onClick={run} disabled={running}><Play />{running ? "Ejecutando…" : "Ejecutar"}</button></div><textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} aria-label="Editor de código de la misión" /> <div className="v46-output-tabs"><b>Salida</b><span>Comprobaciones</span></div>{mission.language === "web" ? <iframe title="Vista previa de la misión web" sandbox="allow-scripts" srcDoc={webDoc} /> : <pre>{output}</pre>}<div className="v46-local-checks">{localChecks.map((check) => <span key={check.label} className={check.ok ? "ok" : ""}><CheckCircle2 />{check.label}</span>)}</div></div>
                  </div>
                </section>}

                {studioTab === "quest" && <section className="v49-course-stage"><header><small>PASO 04 · PRÁCTICA GUIADA</small><h3>La simulación sirve para comprender, no para distraer.</h3><p>El profesor te dice qué escribir, qué significa cada instrucción, dónde mirar y cómo depurar. La práctica usa JavaScript real para secuencias, variables, condiciones, bucles y funciones.</p></header><ProgrammingQuestV47 /></section>}

                {studioTab === "proyecto" && <section className="v49-course-stage"><header><small>PASO 05 · PROYECTO + GATE</small><h3>Demuestra dominio construyendo algo que puedas defender.</h3><p>Un nivel no queda dominado por terminar tarjetas. Debes construir el proyecto, verificarlo y poder explicar sus decisiones sin depender del tutorial.</p></header><div className="v49-project-brief"><div><small>PROYECTO</small><h4>{level.project}</h4></div><div><small>GATE DE DOMINIO</small><p>{level.gate}</p></div></div><div className="v41-project-steps">{projectSteps.map((step, index) => { const done = completedSteps.has(index); return <button type="button" key={step} className={done ? "done" : ""} onClick={() => setCompletedSteps((current) => { const next = new Set(current); if (next.has(index)) next.delete(index); else next.add(index); return next })}><span>{done ? "✓" : String(index + 1).padStart(2,"0")}</span><p>{step}</p></button> })}</div><AlgorithmLabV46 /><div className="v49-master-gate"><button type="button" onClick={() => setCompletedLevels((current) => { const next = new Set(current); if (next.has(level.code)) next.delete(level.code); else next.add(level.code); return next })}>{completedLevels.has(level.code) ? "Marcar nivel pendiente" : `Confirmar dominio de ${level.code}`}</button><p>Marca dominio únicamente cuando hayas superado el gate y puedas explicar el proyecto.</p></div></section>}

                {studioTab === "avanzado" && <section className="v49-course-stage"><header><small>PASO 06 · LABORATORIO AVANZADO</small><h3>Del código a la GPU y a los mundos 3D.</h3><p>Esta capa conecta programación general con gráficos: GLSL, pipeline GPU, escenas, transformaciones, cámara, iluminación y materiales. Es complementaria al núcleo, no un sustituto de algoritmos, sistemas o software.</p></header><AdvancedProgrammingLabsV49 /></section>}
              </main>
            </div>

            <footer className="v49-course-footer"><button type="button" disabled={studioIndex === 0} onClick={() => goStudioStep(-1)}><ChevronLeft />Anterior</button><div><b>{activeStudio.label}</b><small>{activeStudio.helper}</small></div><button type="button" disabled={studioIndex === studioTabs.length - 1} onClick={() => goStudioStep(1)}>Siguiente<ChevronRight /></button></footer>
          </div>
        </div>
      )}

      <section className="v41-section v46-legacy-depth">
        <div className="v41-section-head"><div><span>MAPA COMPLEMENTARIO</span><h2>P0–P14 sigue disponible.</h2></div><p>Conservo la ruta anterior como referencia adicional. No se elimina contenido: la nueva academia se añade por encima y esta capa sigue sirviendo como mapa compacto.</p></div>
        <div className="v41-auto-rail"><div className="v41-auto-track">{[...programmingLevels, ...programmingLevels].map((item, index) => <button key={`${item.code}-${index}`} className={`v41-level-card tone-${["lime","blue","pink","cyan","sand","violet","green","orange"][index % 8]}`} onClick={() => setActiveLevel(Math.min(academyLevels.length - 1, index % academyLevels.length))}><small>{item.code} · {item.phase}</small><h3>{item.title}</h3><p>{item.summary}</p><footer><span>{item.languages.slice(0,3).join(" · ")}</span><ArrowRight /></footer></button>)}</div></div>
        <div className="v46-legacy-proof"><b>Referencia actual:</b><span>{legacyLevel.code}</span><p>{legacyLevel.title}</p></div>
      </section>

      <section id="program-resources" className="v41-section v46-resource-section">
        <div className="v41-section-head"><div><span>ECOSISTEMA DE PRÁCTICA</span><h2>Recursos complementarios potentes.</h2></div><p>Uso recursos externos solo como refuerzo. La experiencia principal de aprendizaje ya quedó integrada arriba en un único flujo de estudio guiado.</p></div>
        <div className="v46-resource-grid">{practiceResources.map((item) => <article key={item.name}><div><small>{item.kind}</small><span>{item.scope}</span></div><h3>{item.name}</h3><p>{item.note}</p><a href={item.url} target="_blank" rel="noreferrer">Abrir <ExternalLink /></a></article>)}</div>
        <div className="v46-resource-note"><Gamepad2 /><p><strong>Coddy y CodeCombat:</strong> se toma la idea pedagógica de recorrido + práctica inmediata + feedback, no se clona su interfaz. Los niveles de CodeCombat, por ejemplo, no son open source; por eso Campus Maestro usa misiones y arena propias.</p></div>
      </section>
    </main>
  )
}
