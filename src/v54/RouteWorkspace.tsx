import { lazy, Suspense, useRef, useState, type ReactNode } from "react"
import { ArrowDownToLine, ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, CircleHelp, Compass, FileCheck2, FlaskConical, GraduationCap, Layers3, Library, Map, Network, RefreshCw, RotateCcw, Search, ShieldCheck, Wrench } from "lucide-react"
import { rootSources, stages } from "../roadmap-data"
import { masteryTracks } from "../mastery-data"
import StudyGuide, { type StudyGuideView } from "../v53/StudyGuide"
import { getResource } from "../v53/study-resources"
import RouteIllustration from "./RouteIllustration"
import { isRouteSection, planBlocks, routeSections, type RouteSection } from "./route-sections"

const ReviewEngineV43 = lazy(() => import("../v43/ReviewEngineV43"))
const AcademicExplorer = lazy(() => import("./AcademicExplorer"))
const CoverageGuide = lazy(() => import("./CoverageGuide"))
const DeviceRepairGuide = lazy(() => import("./CoverageGuide").then((module) => ({ default: module.DeviceRepairGuide })))
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")
const icons = { recorrido: Compass, plan: BookOpen, especialidades: Layers3, reparacion: Wrench, repaso: RefreshCw, fuentes: Library, campos: GraduationCap, catalogo: Search, evidencias: FileCheck2, mapa: Map, academia: Network, investigacion: FlaskConical }

type Progress = {
  completedStages: string[]
  completedTracks: string[]
  completedSubjects: Record<string, number[]>
  completedTrackUnits: Record<string, number[]>
  completedEvidence: Record<string, string[]>
}
type Props = {
  progress: Progress
  currentIndex: number
  onOpenStage: (index: number) => void
  onOpenTrack: (index: number) => void
  onToggleStage: (code: string) => void
  onToggleTrack: (code: string) => void
  onReset: () => void
  onViewChange: () => void
  map: ReactNode
}

function initialView(): RouteSection {
  const value = new URLSearchParams(window.location.search).get("vista")
  if (isRouteSection(value)) return value
  const path = window.location.pathname.replace(/\/+$/, "")
  if (path === "/atlas") return "academia"
  if (path === "/maestrias") return "especialidades"
  if (path === "/roadmap") return "plan"
  return "recorrido"
}

function Loading() { return <p className="rw-loading" role="status">Preparando este espacio de estudio…</p> }

function StudyPlan({ progress, currentIndex, onOpenStage, onToggleStage, initialBlock }: Pick<Props, "progress" | "currentIndex" | "onOpenStage" | "onToggleStage"> & { initialBlock?: number }) {
  const [query, setQuery] = useState("")
  const [blockIndex, setBlockIndex] = useState(() => initialBlock ?? Math.max(0, planBlocks.findIndex((block) => currentIndex >= block.start && currentIndex <= block.end)))
  const q = normalize(query.trim())
  const block = planBlocks[blockIndex]
  const filtered = stages.map((stage, index) => ({ stage, index })).filter(({ stage, index }) => q ? normalize(`${stage.code} ${stage.title} ${stage.subjects.map((item) => item.name).join(" ")}`).includes(q) : index >= block.start && index <= block.end)
  return <div className="rw-plan">
    <label className="rw-search"><Search size={19} /><input aria-label="Buscar en el plan de estudios" placeholder="Busca una etapa, materia o tema…" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>Buscar</kbd></label>
    {!q && <nav className="rw-plan-blocks" aria-label="Tramos del plan">{planBlocks.map((item, index) => <button key={item.title} aria-pressed={blockIndex === index} onClick={() => setBlockIndex(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.start === item.end ? `S${item.start}` : `S${item.start}–S${item.end}`}</small></button>)}</nav>}
    <div className="rw-list-heading"><div><span className="rw-eyebrow">{q ? "RESULTADOS" : `TRAMO ${blockIndex + 1}`}</span><h2>{q ? `Coincidencias con «${query}»` : block.title}</h2><p>{q ? `${filtered.length} etapas. Abre una para ver sus materias.` : block.detail}</p></div><span className="rw-quiet-tag">{filtered.length} {filtered.length === 1 ? "etapa" : "etapas"}</span></div>
    <div className="rw-stage-accordions">{filtered.map(({ stage, index }) => {
      const done = new Set(progress.completedSubjects[stage.code] ?? []).size
      const complete = progress.completedStages.includes(stage.code)
      return <details key={stage.code} open={q ? undefined : index === currentIndex}>
        <summary><span className={`rw-stage-code ${complete ? "is-complete" : ""}`}>{complete ? <Check size={18} /> : stage.code}</span><div><h3>{stage.title}</h3><p>{done}/{stage.subjects.length} materias registradas{index === currentIndex ? " · Tu etapa actual" : ""}</p></div><ChevronDown size={18} /></summary>
        <div className="rw-stage-content"><p className="rw-prerequisite"><ShieldCheck size={17} /><span><b>Antes de empezar</b>{stage.prerequisites}</span></p><p>{stage.outcome}</p><ul className="rw-subject-list">{stage.subjects.map((subject, subjectIndex) => <li key={subject.name}><span className={progress.completedSubjects[stage.code]?.includes(subjectIndex) ? "rw-subject-done" : ""}>{progress.completedSubjects[stage.code]?.includes(subjectIndex) ? <Check size={13} /> : String(subjectIndex + 1).padStart(2, "0")}</span><span>{subject.name}</span></li>)}</ul><details className="rw-proof-details"><summary>Proyecto y criterios para demostrar dominio</summary><p><b>Proyecto:</b> {stage.capstone}</p><p><b>Prueba de dominio:</b> {stage.gate}</p><small>{stage.duration} · estimación orientativa</small></details><div className="rw-actions"><button className="rw-button rw-button--dark" onClick={() => onOpenStage(index)}>Entrar al aula de {stage.code}<ArrowRight size={17} /></button><button className="rw-button rw-button--quiet" onClick={() => onToggleStage(stage.code)}>{complete ? "Revisar dominio marcado" : "Comprobar dominio"}<FileCheck2 size={16} /></button></div></div>
      </details>
    })}</div>
    {!filtered.length && <div className="rw-empty"><Search /><h3>No encontramos ese tema en el tronco.</h3><p>Prueba con otra palabra. El catálogo completo incluye además las 533 materias del inventario.</p></div>}
    <p className="rw-footnote">Puedes consultar cualquier etapa. Para registrar su dominio se mantienen los prerrequisitos, las materias y las pruebas de evidencia.</p>
  </div>
}

function Specializations({ progress, onOpenTrack, onToggleTrack }: Pick<Props, "progress" | "onOpenTrack" | "onToggleTrack">) {
  const [showFamilies, setShowFamilies] = useState(false)
  const [query, setQuery] = useState("")
  return <>
    <div className="rw-notice"><GraduationCap size={22} /><p>Primero construye la base común. Después elige una o dos ramas para profundizar. Son especializaciones autodidactas, no títulos de posgrado.</p></div>
    <label className="rw-search"><Search size={19} /><input aria-label="Buscar especialización" placeholder="Busca software, seguridad, datos, hardware…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
    <div className="rw-track-list">{masteryTracks.map((track, index) => ({ track, index })).filter(({ track }) => normalize(`${track.code} ${track.title} ${track.family} ${track.units.map((item) => item.name).join(" ")}`).includes(normalize(query))).map(({ track, index }) => <article key={track.code}><div className="rw-track-index">{track.code}<span>{String(index + 1).padStart(2, "0")}</span></div><div><span className="rw-eyebrow">{track.family}</span><h2>{track.title}</h2><p>{track.goal}</p><details><summary>Prerrequisitos y unidades</summary><p>{track.prerequisites}</p><ol>{track.units.map((unit) => <li key={unit.name}>{unit.name}</li>)}</ol><small>{track.duration} · estimación orientativa</small></details><div className="rw-actions"><button className="rw-button" onClick={() => onOpenTrack(index)}>Abrir especialización<ArrowRight size={16} /></button><button className="rw-text-button" onClick={() => onToggleTrack(track.code)}>{progress.completedTracks.includes(track.code) ? "Dominio registrado" : "Comprobar dominio"}</button></div></div></article>)}</div>
    <details className="rw-deeper" open={showFamilies} onToggle={(event) => setShowFamilies(event.currentTarget.open)}><summary><span><b>¿Cómo se conectan las 17 familias del Excel?</b><small>Consulta las conexiones con etapas, especialidades y fuentes.</small></span><ChevronDown size={19} /></summary>{showFamilies && <StudyGuide page="areas" onOpenStage={() => undefined} />}</details>
  </>
}

function EvidenceOverview({ progress, onOpenStage, onOpenTrack, onReset }: Pick<Props, "progress" | "onOpenStage" | "onOpenTrack" | "onReset">) {
  const started = stages.map((stage, index) => ({ stage, index, subjects: progress.completedSubjects[stage.code] ?? [], evidence: progress.completedEvidence[stage.code] ?? [] })).filter((item) => item.subjects.length || item.evidence.length || progress.completedStages.includes(item.stage.code))
  const startedTracks = masteryTracks.map((track, index) => ({ track, index, units: progress.completedTrackUnits[track.code] ?? [], evidence: progress.completedEvidence[track.code] ?? [] })).filter((item) => item.units.length || item.evidence.length || progress.completedTracks.includes(item.track.code))
  const backup = () => {
    const blob = new Blob([JSON.stringify({ format: "campus-maestro-route-progress", exportedAt: new Date().toISOString(), progress }, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "campus-maestro-progreso.json"; anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <>
    <div className="rw-notice"><FileCheck2 size={23} /><p>Este registro recoge las marcas que tú has guardado en las aulas. Conserva los archivos de tus proyectos en tu propio portafolio y busca revisión externa para contrastar el dominio.</p></div>
    {!started.length && !startedTracks.length ? <div className="rw-empty"><FileCheck2 size={34} /><h2>Tu primera evidencia empieza en el aula.</h2><p>Resuelve un ejercicio, guarda el resultado y registra la materia. Aquí aparecerá tu avance.</p><button className="rw-button rw-button--dark" onClick={() => onOpenStage(0)}>Empezar en S0<ArrowRight size={16} /></button></div> : <div className="rw-evidence-list">{started.map(({ stage, index, subjects, evidence }) => <article key={stage.code}><span className="rw-stage-code">{stage.code}</span><div><h3>{stage.title}</h3><p>{subjects.length}/{stage.subjects.length} materias · {evidence.length}/5 pruebas registradas{progress.completedStages.includes(stage.code) ? " · Dominio marcado" : ""}</p></div><button className="rw-button" onClick={() => onOpenStage(index)}>Revisar<ArrowRight size={16} /></button></article>)}{startedTracks.map(({ track, index, units, evidence }) => <article key={track.code}><span className="rw-stage-code">{track.code}</span><div><h3>{track.title}</h3><p>{units.length}/{track.units.length} unidades · {evidence.length}/3 pruebas registradas{progress.completedTracks.includes(track.code) ? " · Dominio marcado" : ""}</p></div><button className="rw-button" onClick={() => onOpenTrack(index)}>Revisar<ArrowRight size={16} /></button></article>)}</div>}
    <div className="rw-backup"><div><h3>Tu progreso se guarda en este navegador.</h3><p>Descarga una copia para conservar el registro. No contiene los archivos de tus proyectos ni los repasos.</p></div><button className="rw-button" onClick={backup}><ArrowDownToLine size={17} />Descargar registro</button></div><details className="rw-settings"><summary>Administrar el progreso</summary><p>El reinicio elimina las marcas de Ruta Maestra en este navegador. Primero descarga una copia si quieres conservarlas.</p><button className="rw-button" onClick={onReset}><RotateCcw size={16} />Reiniciar progreso de la ruta</button></details>
  </>
}

export default function RouteWorkspace(props: Props) {
  const [view, setView] = useState<RouteSection>(initialView)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [guideView, setGuideView] = useState<StudyGuideView>("inicio")
  const [showHelp, setShowHelp] = useState(false)
  const [planBlock, setPlanBlock] = useState<number | undefined>()
  const current = stages[props.currentIndex]
  const currentSubjects = new Set(props.progress.completedSubjects[current.code] ?? [])
  const nextSubject = current.subjects.find((_, index) => !currentSubjects.has(index))
  const complete = props.progress.completedStages.length === stages.length
  const description = routeSections.find((item) => item.id === view)!
  const navigate = (next: RouteSection) => {
    if (next === view) return
    props.onViewChange()
    setView(next); setShowHelp(false)
    const url = new URL(window.location.href)
    if (next === "recorrido") url.searchParams.delete("vista"); else url.searchParams.set("vista", next)
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash)
    window.requestAnimationFrame(() => { window.scrollTo({ top: 0, behavior: "instant" }); headingRef.current?.focus({ preventScroll: true }) })
  }
  const renderGuide = (page: StudyGuideView) => <StudyGuide key={page} page={page} currentIndex={props.currentIndex} onOpenStage={props.onOpenStage} onNavigate={setGuideView} />
  return <div className="rw-layout">
    <aside className="rw-sidebar" aria-label="Navegación de Ruta Maestra"><div className="rw-sidebar-brand"><span>CM</span><div>Tu espacio<small>de aprendizaje</small></div></div><nav aria-label="Secciones de Ruta Maestra">{["Estudiar", "Consultar", "Explorar"].map((group) => <div className="rw-nav-group" key={group}><span>{group}</span>{routeSections.filter((item) => item.group === group).map((item) => { const Icon = icons[item.id]; return <button key={item.id} aria-current={view === item.id ? "page" : undefined} onClick={() => navigate(item.id)}><Icon size={17} /><span>{item.label}</span>{view === item.id && <i />}</button> })}</div>)}</nav><div className="rw-sidebar-bottom"><ShieldCheck size={15} /><span>Tu ritmo. Tu evidencia.</span></div></aside>
    <div className="rw-mobile-nav"><label htmlFor="rw-section-select">Ruta Maestra</label><div><select id="rw-section-select" value={view} onChange={(event) => { if (isRouteSection(event.target.value)) navigate(event.target.value) }}>{["Estudiar", "Consultar", "Explorar"].map((group) => <optgroup key={group} label={group}>{routeSections.filter((item) => item.group === group).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</optgroup>)}</select><ChevronDown size={17} /></div></div>
    <main className={`rw-main rw-view-${view}`} id="ruta-contenido">
      <header className="rw-page-header"><div className="rw-breadcrumb"><span>RUTA MAESTRA</span><i /><span>{description.group}</span></div>{view === "recorrido" ? <><h1 ref={headingRef} tabIndex={-1}>El conocimiento,<br /><em>con un camino claro.</em></h1><p>Comprende, practica y demuestra.<br className="rw-mobile-break" /> Una materia a la vez.</p></> : <><h1 ref={headingRef} tabIndex={-1}>{description.title}</h1><p>{description.subtitle}</p></>}<button className="rw-page-help" aria-expanded={showHelp} onClick={() => setShowHelp(!showHelp)}><CircleHelp size={17} />Cómo usar este espacio</button>{showHelp && <div className="rw-help"><p><b>Estudiar</b> reúne tu siguiente paso, las aulas y el repaso. <b>Consultar</b> reúne fuentes, catálogo y registros. <b>Explorar</b> abre los mapas y conexiones del plan.</p><p>Los contenidos siguen disponibles en sus vistas. Tu avance se conserva en este navegador; las marcas son un registro personal, no una certificación.</p></div>}</header>

      {view === "recorrido" && <>
        <section className="rw-next-step" aria-labelledby="rw-next-title"><div className="rw-next-copy"><span className="rw-eyebrow">{complete ? "TRONCO REGISTRADO" : props.progress.completedStages.length || currentSubjects.size ? "CONTINÚA DONDE LO DEJASTE" : "TU PRIMER PASO"}</span><div className="rw-next-meta"><span>{current.code}</span><small>{currentSubjects.size}/{current.subjects.length} materias registradas</small></div><h2 id="rw-next-title">{complete ? "Sigue construyendo conocimiento." : current.title}</h2><p>{complete ? "Profundiza en una especialidad, revisa tus evidencias o explora una pregunta de investigación." : nextSubject ? `Siguiente materia: ${nextSubject.name}` : "Ya registraste las materias. Revisa ahora el proyecto y las pruebas de dominio de esta etapa."}</p><div className="rw-actions"><button className="rw-button rw-button--dark" onClick={() => props.onOpenStage(props.currentIndex)}>Abrir mi aula<ArrowRight size={18} /></button><button className="rw-text-button" onClick={() => navigate("plan")}>Ver el plan<ChevronRight size={16} /></button></div></div><div className="rw-next-art"><RouteIllustration /><button onClick={() => navigate("mapa")}>Explorar la carretera 3D<ArrowRight size={16} /></button></div></section>
        <div className="rw-progress-line"><span><b>{props.progress.completedStages.length}</b> de {stages.length} etapas con dominio registrado</span><div role="progressbar" aria-label="Etapas con dominio registrado" aria-valuemin={0} aria-valuemax={stages.length} aria-valuenow={props.progress.completedStages.length}><i style={{ width: `${props.progress.completedStages.length / stages.length * 100}%` }} /></div><button onClick={() => navigate("evidencias")}>Revisar evidencias<ArrowRight size={14} /></button></div>
        <section className="rw-path-preview"><div><span className="rw-eyebrow">EL RECORRIDO</span><h2>Construye la base.<br /> <em>Después, profundiza.</em></h2></div><div className="rw-path-steps">{planBlocks.map((block, index) => <button key={block.title} onClick={() => { setPlanBlock(index); navigate("plan") }} aria-label={`Explorar el plan: ${block.title}`}><span className={props.currentIndex >= block.start && props.currentIndex <= block.end ? "is-current" : ""}>{String(index + 1).padStart(2, "0")}</span><b>{block.title}</b><small>{block.start === block.end ? `S${block.start}` : `S${block.start}–S${block.end}`}</small></button>)}</div></section>
        <section className="rw-home-links" aria-label="Accesos de estudio"><button onClick={() => navigate("repaso")}><RefreshCw size={23} /><span><b>Vuelve a lo aprendido.</b><small>Repaso espaciado de tus materias</small></span><ArrowRight size={18} /></button><button onClick={() => navigate("fuentes")}><Library size={23} /><span><b>Encuentra la fuente adecuada.</b><small>Idioma, acceso y función de cada recurso</small></span><ArrowRight size={18} /></button></section>
        <details className="rw-deeper" open={guideView !== "inicio" ? true : undefined}><summary><span><b>¿Estudias desde cero?</b><small>Consulta la primera semana, el método y una propuesta de horario.</small></span><ChevronDown size={18} /></summary>{renderGuide(guideView)}</details>
        <p className="rw-home-scope">20 etapas · 89 materias troncales · 12 especializaciones<br /><span>Elige una tarea, comprende el tema y conserva la evidencia.</span><button className="rw-text-button" onClick={() => navigate("campos")}>Ver los campos de estudio y su alcance<ArrowRight size={16} /></button></p>
      </>}
      {view === "plan" && <StudyPlan {...props} initialBlock={planBlock} />}
      {view === "especialidades" && <Specializations {...props} />}
      {view === "campos" && <Suspense fallback={<Loading />}><CoverageGuide onOpenStage={props.onOpenStage} onRepair={() => navigate("reparacion")} onCatalog={() => navigate("catalogo")} /></Suspense>}
      {view === "reparacion" && <><Suspense fallback={<Loading />}><DeviceRepairGuide /></Suspense><details className="rw-deeper"><summary>Ver la secuencia general: de seguridad a ingeniería de hardware</summary>{renderGuide("reparacion")}</details></>}
      {view === "fuentes" && <>{renderGuide("fuentes")}<details className="rw-deeper"><summary><span><b>Referencias originales del tronco</b><small>Cursos, planes y recopilaciones conservados para consulta.</small></span><ChevronDown size={18} /></summary><OriginalSources /></details></>}
      {view === "catalogo" && renderGuide("catalogo")}
      {view === "investigacion" && renderGuide("investigacion")}
      {view === "repaso" && <div className="rw-tool-surface"><Suspense fallback={<Loading />}><ReviewEngineV43 currentStageIndex={props.currentIndex} /></Suspense></div>}
      {view === "evidencias" && <EvidenceOverview {...props} />}
      {view === "mapa" && <Suspense fallback={<Loading />}>{props.map}</Suspense>}
      {view === "academia" && <div className="rw-academic"><Suspense fallback={<Loading />}><AcademicExplorer completedStageCodes={props.progress.completedStages} currentStageIndex={props.currentIndex} /></Suspense></div>}
      <footer className="rw-footer"><div><b>CM</b><span>Campus Maestro<small>Aprendizaje abierto y verificable</small></span></div><p>Español primero.<br />Tu progreso se guarda en este navegador.</p><button onClick={() => navigate("fuentes")}>Fuentes y condiciones<ArrowRight size={14} /></button></footer>
    </main>
  </div>
}

function OriginalSources() {
  const sources = ["openfing", "uc3m", "famaf", "pablo", "ossu", "cs2023", "ce2016"]
  return <div className="rw-original-sources">{sources.map((id) => { const item = getResource(id); return <a key={id} href={item.url} target="_blank" rel="noreferrer"><span>{item.name}</span><small>{item.limit}</small><ArrowRight size={16} /></a> })}<details className="rw-proof-details"><summary>Ver las {rootSources.length} referencias originales de la ruta</summary>{rootSources.map((source) => <a key={source.n} href={source.url} target="_blank" rel="noreferrer"><span>{source.name}</span><small>{source.kind} · {source.use}</small><ArrowRight size={16} /></a>)}</details><p>El canon ampliado también está disponible en Atlas y cobertura → Fuentes base y canon ampliado.</p></div>
}
