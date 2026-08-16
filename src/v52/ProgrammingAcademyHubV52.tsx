import { useMemo, useState, type ChangeEvent } from "react"
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCode2,
  FileText,
  GraduationCap,
  LibraryBig,
  Play,
  Search,
  ShieldCheck,
  Terminal,
  TestTube2,
} from "lucide-react"
import ProgrammingClassroomV52 from "./ProgrammingClassroomV52"
import ProceduralBackdrop from "../v41/ProceduralBackdrop"
import { programmingConceptCountV51, programmingLevelsV51, programmingPhasesV51 } from "../v51/programming-curriculum-v51"
import { commercialReferencesV51, programmingSourcesV51, type SourceAuthorityV51 } from "../v51/programming-sources-v51"
import "./programming-v52.css"

type LogoItem = { name: string; family: string; logo: string }

const verifiedLogos: LogoItem[] = [
  ["Python", "Fundamentos · datos", "python/python-original.svg"],
  ["JavaScript", "Web · runtime", "javascript/javascript-original.svg"],
  ["TypeScript", "Tipos · web", "typescript/typescript-original.svg"],
  ["C", "Sistemas · memoria", "c/c-original.svg"],
  ["C++", "Sistemas · performance", "cplusplus/cplusplus-original.svg"],
  ["C#", ".NET · enterprise", "csharp/csharp-original.svg"],
  ["Java", "JVM · enterprise", "java/java-original.svg"],
  ["Go", "Cloud · backend", "go/go-original-wordmark.svg"],
  ["Rust", "Sistemas · seguridad", "rust/rust-original.svg"],
  ["Kotlin", "JVM · móvil", "kotlin/kotlin-original.svg"],
  ["Swift", "Apple · móvil", "swift/swift-original.svg"],
  ["PHP", "Backend · web", "php/php-original.svg"],
  ["Ruby", "Backend · diseño", "ruby/ruby-original.svg"],
  ["Dart", "Móvil · multiplataforma", "dart/dart-original.svg"],
  ["R", "Datos · estadística", "r/r-original.svg"],
  ["Julia", "Ciencia · numérico", "julia/julia-original.svg"],
  ["Scala", "JVM · funcional", "scala/scala-original.svg"],
  ["Haskell", "Funcional · tipos", "haskell/haskell-original.svg"],
  ["Elixir", "BEAM · concurrencia", "elixir/elixir-original.svg"],
  ["Erlang", "BEAM · distribuidos", "erlang/erlang-original.svg"],
  ["Clojure", "Lisp · JVM", "clojure/clojure-original.svg"],
  ["F#", ".NET · funcional", "fsharp/fsharp-original.svg"],
  ["OCaml", "Funcional · tipos", "ocaml/ocaml-original.svg"],
  ["Lua", "Embedding · scripting", "lua/lua-original.svg"],
  ["Bash", "Shell · automatización", "bash/bash-original.svg"],
  ["PowerShell", "Windows · automatización", "powershell/powershell-original.svg"],
  ["Zig", "Sistemas · control", "zig/zig-original.svg"],
  ["Nim", "Compilado · sistemas", "nim/nim-original.svg"],
  ["Fortran", "HPC · científico", "fortran/fortran-original.svg"],
  ["HTML", "Web · estructura", "html5/html5-original.svg"],
  ["CSS", "Web · presentación", "css3/css3-original.svg"],
  ["GraphQL", "APIs · datos", "graphql/graphql-plain.svg"],
  ["PostgreSQL", "SQL · datos", "postgresql/postgresql-original.svg"],
  ["Arduino", "Embedded · IoT", "arduino/arduino-original.svg"],
].map(([name, family, path]) => ({ name, family, logo: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}` }))

function LogoCard({ item }: { item: LogoItem }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return <article className="v52-logo-card"><span><img src={item.logo} alt={`Logo de ${item.name}`} loading="lazy" onError={() => setFailed(true)} /></span><div><b>{item.name}</b><small>{item.family}</small></div></article>
}

const phaseIndexForLevel = (code: string) => {
  const n = Number(code.replace("L", ""))
  if (n <= 3) return 0
  if (n <= 9) return 1
  if (n <= 17) return 2
  if (n <= 22) return 3
  if (n <= 27) return 4
  if (n <= 33) return 5
  if (n <= 38) return 6
  if (n <= 43) return 7
  return 8
}

const authorityLabels: Record<SourceAuthorityV51, string> = {
  "marco oficial": "Marco oficial",
  universidad: "Universidad",
  "libro abierto": "Libro abierto",
  "documentación oficial": "Documentación oficial",
  "currículo abierto": "Currículo abierto",
  "repositorio académico": "Repositorio académico",
  biblioteca: "Biblioteca legal",
  "referencia comercial": "Referencia",
}

const teachingFlow = [
  ["01", "Comprender", "Definición, vocabulario, propósito y modelo mental."],
  ["02", "Leer", "Código explicado línea por línea y relación con el modelo."],
  ["03", "Predecir", "Escribes qué esperas antes de ejecutar."],
  ["04", "Ejecutar", "Code Studio muestra salida, preview y problemas."],
  ["05", "Depurar", "Localizas la primera divergencia y corriges una causa."],
  ["06", "Probar", "Casos normales, límites y regresiones."],
  ["07", "Construir", "Proyecto y evidencia de dominio."],
] as const

export default function ProgrammingAcademyHubV52() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState("L00")
  const [classroomOpen, setClassroomOpen] = useState(false)
  const [levelSearch, setLevelSearch] = useState("")
  const [sourceSearch, setSourceSearch] = useState("")
  const [sourceAuthority, setSourceAuthority] = useState<SourceAuthorityV51 | "todas">("todas")

  const phaseLevels = useMemo(() => programmingLevelsV51.filter((level) => phaseIndexForLevel(level.code) === phaseIndex), [phaseIndex])
  const visibleLevels = useMemo(() => {
    const q = levelSearch.trim().toLocaleLowerCase("es")
    if (!q) return phaseLevels
    return phaseLevels.filter((level) => `${level.code} ${level.title} ${level.goal} ${level.topics.map((topic) => topic.title).join(" ")}`.toLocaleLowerCase("es").includes(q))
  }, [levelSearch, phaseLevels])

  const activeLevel = programmingLevelsV51.find((level) => level.code === selectedLevel) ?? programmingLevelsV51[0]
  const filteredSources = useMemo(() => {
    const q = sourceSearch.trim().toLocaleLowerCase("es")
    return programmingSourcesV51.filter((source) => {
      if (sourceAuthority !== "todas" && source.authority !== sourceAuthority) return false
      if (!q) return true
      return `${source.title} ${source.author} ${source.note} ${source.tags.join(" ")}`.toLocaleLowerCase("es").includes(q)
    })
  }, [sourceAuthority, sourceSearch])

  const openLevel = (code: string) => {
    setSelectedLevel(code)
    setClassroomOpen(true)
  }

  return <main className="v52-programming-hub">
    <section className="v52-hero">
      <ProceduralBackdrop variant="blue" />
      <div className="v52-hero-grid" />
      <div className="v52-hero-glow one" />
      <div className="v52-hero-glow two" />
      <div className="v52-hero-copy">
        <span className="v52-kicker"><GraduationCap /> ESCUELA DE PROGRAMACIÓN</span>
        <h1>Del primer archivo a construir <em>software que puedas explicar.</em></h1>
        <p>Una ruta continua para aprender fundamentos, algoritmos, lenguajes, sistemas e ingeniería mediante explicación rigurosa, práctica guiada, depuración, pruebas y proyectos.</p>
        <div className="v52-hero-actions">
          <button type="button" onClick={() => openLevel("L00")}><BookOpen />Comenzar por L00<ArrowRight /></button>
          <button type="button" className="secondary" onClick={() => document.querySelector("#v52-plan")?.scrollIntoView({ behavior: "smooth" })}><LibraryBig />Explorar el plan</button>
        </div>
        <div className="v52-hero-proof">
          <span><b>{programmingLevelsV51.length}</b><small>niveles progresivos</small></span>
          <span><b>{programmingConceptCountV51}</b><small>conceptos troncales</small></span>
          <span><b>{programmingSourcesV51.length}</b><small>fuentes clasificadas</small></span>
          <span><b>1</b><small>entorno de práctica integrado</small></span>
        </div>
      </div>

      <aside className="v52-hero-workstation" aria-label="Vista del entorno de práctica">
        <div className="v52-preview-titlebar"><span className="v52-preview-mark">CM</span><b>Campus Code Studio</b><small>fundamentos / variables</small></div>
        <div className="v52-preview-workbench">
          <div className="v52-preview-files"><small>EXPLORADOR</small><span className="active"><FileCode2 />main.py</span><span><FileText />README.md</span><span><TestTube2 />tests.txt</span></div>
          <div className="v52-preview-editor">
            <header><span>main.py</span><button type="button" onClick={() => openLevel("L04")}><Play />Abrir laboratorio</button></header>
            <pre><i>1</i><code><b>precio</b> = 25</code>{"\n"}<i>2</i><code><b>cantidad</b> = 3</code>{"\n"}<i>3</i><code><b>total</b> = precio * cantidad</code>{"\n"}<i>4</i><code>print(total)</code></pre>
            <div className="v52-preview-terminal"><Terminal /><span>$ run main.py</span><b>75</b></div>
          </div>
        </div>
        <div className="v52-preview-status"><span>campus-lab</span><span>Python</span><span>Ln 4, Col 13</span></div>
      </aside>
    </section>

    <section className="v52-logo-rail" aria-label="Lenguajes y ecosistemas estudiados">
      <div className="v52-logo-track">{[...verifiedLogos, ...verifiedLogos].map((item, index) => <LogoCard key={`${item.name}-${index}`} item={item} />)}</div>
    </section>

    <section className="v52-method">
      <header><span>FORMA DE TRABAJO</span><h2>Entender primero. Ejecutar con intención. Corregir con evidencia.</h2><p>La misma secuencia se repite en cada concepto para que siempre sepas qué hacer y qué comprobar antes de avanzar.</p></header>
      <div className="v52-method-flow">{teachingFlow.map(([number, title, description]) => <article key={number}><span>{number}</span><div><b>{title}</b><p>{description}</p></div><ChevronRight /></article>)}</div>
    </section>

    <section id="v52-plan" className="v52-plan">
      <header className="v52-section-title"><div><span>PLAN DE ESTUDIO</span><h2>De L00 a L47 siguiendo dependencias.</h2></div><p>Primero pensamiento y fundamentos; después estructuras, paradigmas, sistemas, ingeniería, plataforma y temas avanzados.</p></header>
      <div className="v52-phase-tabs">{programmingPhasesV51.map((phase, index) => <button type="button" key={phase.id} className={phaseIndex === index ? "active" : ""} onClick={() => { setPhaseIndex(index); setLevelSearch("") }}><span>{String(index + 1).padStart(2,"0")}</span><b>{phase.title}</b><small>{phase.range}</small></button>)}</div>
      <div className="v52-plan-toolbar"><div><Search /><input value={levelSearch} onChange={(event: ChangeEvent<HTMLInputElement>) => setLevelSearch(event.target.value)} placeholder={`Buscar dentro de ${programmingPhasesV51[phaseIndex].title}…`} /></div><p>{programmingPhasesV51[phaseIndex].description}</p></div>
      <div className="v52-level-grid">
        {visibleLevels.map((level) => <article key={level.code} className={selectedLevel === level.code ? "selected" : ""} onMouseEnter={() => setSelectedLevel(level.code)}>
          <header><span>{level.code}</span><small>{level.phase}</small></header>
          <h3>{level.title}</h3><p>{level.goal}</p>
          <div className="v52-topic-list">{level.topics.map((topic) => <span key={topic.id}>{topic.title}</span>)}</div>
          <footer><small>{level.topics.length} conceptos · proyecto · gate</small><button type="button" onClick={() => openLevel(level.code)}>Entrar al aula <ArrowRight /></button></footer>
        </article>)}
      </div>
    </section>

    <section className="v52-active-brief">
      <div><span>NIVEL ACTIVO · {activeLevel.code}</span><h2>{activeLevel.title}</h2><p>{activeLevel.goal}</p></div>
      <article><small>PROYECTO</small><b>{activeLevel.project}</b></article>
      <article><small>CRITERIO DE DOMINIO</small><b>{activeLevel.gate}</b></article>
      <button type="button" onClick={() => setClassroomOpen(true)}><Terminal />Abrir aula y Code Studio</button>
    </section>

    <section className="v52-library">
      <header className="v52-section-title"><div><span>BIBLIOTECA ACADÉMICA</span><h2>Fuentes para estudiar, contrastar y profundizar.</h2></div><p>Currículos, universidades, libros abiertos, documentación y repositorios se presentan con su origen y condiciones de uso.</p></header>
      <div className="v52-library-notice"><ShieldCheck /><div><b>Uso responsable de las fuentes</b><p>Campus enlaza y referencia materiales externos según sus condiciones. Cuando una obra no permite redistribución, la explicación interna se redacta de forma original.</p></div></div>
      <div className="v52-library-toolbar">
        <div><Search /><input value={sourceSearch} onChange={(event: ChangeEvent<HTMLInputElement>) => setSourceSearch(event.target.value)} placeholder="Buscar Python, algoritmos, sistemas, testing…" /></div>
        <select value={sourceAuthority} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSourceAuthority(event.target.value as SourceAuthorityV51 | "todas")}>
          <option value="todas">Todas las fuentes</option>
          {Object.entries(authorityLabels).map(([value,label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      <div className="v52-source-grid">
        {filteredSources.map((source) => <article key={source.id}>
          <div className="v52-source-meta"><span>{authorityLabels[source.authority]}</span><small>{source.language}</small></div>
          <h3>{source.title}</h3><b>{source.author}</b><p>{source.note}</p>
          <div className="v52-source-tags">{source.tags.slice(0,4).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <footer><small>{source.access} · Uso: {source.use}</small><a href={source.url} target="_blank" rel="noreferrer">Abrir fuente <ExternalLink /></a></footer>
        </article>)}
      </div>
    </section>

    <section className="v52-commercial">
      <header><BookMarked /><div><span>BIBLIOGRAFÍA DE REFERENCIA</span><h2>Obras importantes para profundizar por sus vías oficiales.</h2><p>Estas referencias ayudan a controlar cobertura y nivel. Las ediciones protegidas no se redistribuyen dentro del Campus.</p></div></header>
      <div>{commercialReferencesV51.map((title) => <span key={title}><FileText />{title}</span>)}</div>
    </section>

    <section className="v52-final-principles">
      <article><CheckCircle2 /><div><b>Conceptos sin saltos</b><p>El vocabulario y los prerrequisitos se introducen antes de necesitarlos.</p></div></article>
      <article><CheckCircle2 /><div><b>Predicción antes de ejecución</b><p>La salida se compara con una idea previa, no se usa como sustituto del razonamiento.</p></div></article>
      <article><CheckCircle2 /><div><b>Depuración sistemática</b><p>Los errores se aíslan mediante observación, hipótesis, cambio mínimo y regresión.</p></div></article>
      <article><CheckCircle2 /><div><b>Transferencia</b><p>El concepto debe poder reconocerse fuera del lenguaje donde se aprendió.</p></div></article>
    </section>

    {classroomOpen && <ProgrammingClassroomV52 key={activeLevel.code} levelCode={activeLevel.code} onClose={() => setClassroomOpen(false)} />}
  </main>
}
