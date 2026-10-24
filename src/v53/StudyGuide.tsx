import { lazy, Suspense, useMemo, useState } from "react"
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, FlaskConical, ListOrdered, Search, Wrench } from "lucide-react"
import { stages } from "../roadmap-data"
import { getResource, resourceReviewDate, studyResources, type StudyResource } from "./study-resources"
import { learningFamilies, repairPath } from "./learning-paths"
import "./study-guide.css"

const ExcelCatalog = lazy(() => import("./ExcelCatalog"))
const tabs = [
  ["inicio", "Empieza aquí"], ["orden", "Orden de estudio"], ["fuentes", "Fuentes comparadas"],
  ["areas", "Especialidades"], ["reparacion", "Reparación y electrónica"], ["catalogo", "Plan de 533 materias"], ["investigacion", "Investigación"],
] as const
export type StudyGuideView = typeof tabs[number][0]
type Tab = StudyGuideView
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")

export function ResourceLinks({ ids }: { ids: string[] }) {
  return <div className="study-resource-links">{ids.map((id) => {
    const item = getResource(id)
    return <a key={id} href={item.url} target="_blank" rel="noreferrer">{item.name}<ExternalLink size={13} /></a>
  })}</div>
}

function ResourceCard({ item }: { item: StudyResource }) {
  return <article className="study-source-card">
    <div className="study-source-top"><span>{item.category}</span><a href={item.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${item.name}`}><ExternalLink size={18} /></a></div>
    <h4><a href={item.url} target="_blank" rel="noreferrer">{item.name}</a></h4>
    <dl><dt>Idioma</dt><dd>{item.language}</dd><dt>Acceso</dt><dd>{item.access}</dd></dl>
    <details className="study-source-more"><summary>Para qué sirve y qué límites tiene</summary><p>{item.use}</p><p className="study-source-limit"><b>Límite: </b>{item.limit}</p>
    <div className="study-source-verdict">{item.verdict}</div>
    {item.evidence && <a className="study-evidence-link" href={item.evidence} target="_blank" rel="noreferrer">Comprobar condiciones en la fuente<ExternalLink size={13} /></a>}</details>
  </article>
}

function SourceComparison() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Todas")
  const [sourcePage, setSourcePage] = useState(0)
  const pageSize = 8
  const filtered = useMemo(() => {
    const first = ["openfing", "uc3m", "khan", "fcc", "git", "cs50", "fso", "cisco", "slim", "ifixit"]
    return studyResources.filter((item) => (category === "Todas" || item.category === category) && normalize(`${item.name} ${item.use} ${item.language}`).includes(normalize(query))).sort((a, b) => (first.includes(a.id) ? first.indexOf(a.id) : first.length) - (first.includes(b.id) ? first.indexOf(b.id) : first.length))
  }, [query, category])
  return <>
    <h3>Qué aporta cada fuente y cuándo usarla</h3>
    <p>En esta comparación no encontramos una sola plataforma gratis en español que cubra mejor toda la combinación de computación, ingeniería y reparación. Recomendamos conservar OpenFING y completar sus huecos. Esta es una selección razonada, no un censo de todo Internet.</p>
    <div className="study-filters"><label><Search size={17} /><span className="study-sr-only">Buscar fuente</span><input aria-label="Buscar fuente" value={query} onChange={(event) => { setQuery(event.target.value); setSourcePage(0) }} placeholder="Buscar: IA, español, reparación…" /></label><label><span className="study-sr-only">Tipo de fuente</span><select aria-label="Tipo de fuente" value={category} onChange={(event) => { setCategory(event.target.value); setSourcePage(0) }}>{["Todas", "Base", "Universidad", "Práctica", "Reparación", "Contraste"].map((value) => <option key={value}>{value}</option>)}</select></label></div>
    <p className="study-result-count" role="status">{filtered.length} de {studyResources.length} fuentes · revisión: {resourceReviewDate}</p>
    <div className="study-source-grid">{filtered.slice(sourcePage * pageSize, (sourcePage + 1) * pageSize).map((item) => <ResourceCard key={item.id} item={item} />)}</div>
    {filtered.length > pageSize && <nav className="study-pagination" aria-label="Páginas de fuentes"><button disabled={sourcePage === 0} onClick={() => setSourcePage(sourcePage - 1)}>Anterior</button><span>Página {sourcePage + 1} de {Math.ceil(filtered.length / pageSize)}</span><button disabled={(sourcePage + 1) * pageSize >= filtered.length} onClick={() => setSourcePage(sourcePage + 1)}>Siguiente</button></nav>}
    {!filtered.length && <p>No hay coincidencias. Prueba otro tema o selecciona «Todas».</p>}
  </>
}

const stageSources: Record<string, string[]> = {
  S0: ["khan", "git", "cisco", "openfing"], S1: ["openfing", "khan"], S2: ["openfing", "uc3m"], S3: ["openfing", "uc3m"],
  S4: ["openfing", "uc3m"], S5: ["openfing", "cisco"], S6: ["openfing", "uc3m"], S7: ["fcc", "fso"], S8: ["fcc", "fso", "learn"],
  S9: ["cisco", "learn"], S10: ["uc3m", "pablo"], S11: ["learn", "uc3m"], S12: ["learn", "openfing"],
  S13: ["openfing", "uc3m", "googleml"], S14: ["openfing", "googleml"], S15: ["learn", "cisco"],
  S16: ["unican", "fpga", "openfing"], S17: ["openfing", "cisco", "fpga"], S18: ["openfing", "uned"], S19: ["cs2023", "famaf", "openfing"],
}

export default function StudyGuide({ onOpenStage, currentIndex = 0, page, onNavigate }: { onOpenStage: (index: number) => void; currentIndex?: number; page?: StudyGuideView; onNavigate?: (view: StudyGuideView) => void }) {
  const [localTab, setLocalTab] = useState<Tab>("inicio")
  const tab = page ?? localTab
  const setTab = (view: Tab) => { if (onNavigate) onNavigate(view); else setLocalTab(view) }
  const [weeklyHours, setWeeklyHours] = useState(20)
  const current = stages[currentIndex] ?? stages[0]
  return <section className={`study-guide ${page ? "study-guide--embedded" : ""}`} id="guia-de-estudio" aria-label={page ? "Contenido de estudio" : undefined} aria-labelledby={!page ? "study-guide-title" : undefined}>
    {!page && <><header className="study-guide-header"><div><span className="study-eyebrow">GUÍA DE ESTUDIO · ESPAÑOL PRIMERO</span><h2 id="study-guide-title">Todo conectado.<br /><em>Un paso a la vez.</em></h2><p>Una base común, práctica real y especialidades con prerrequisitos. Aquí puedes decidir qué estudiar, con qué recursos y qué demostrar antes de avanzar.</p></div><div className="study-guide-aside"><BookOpen size={26} /><strong>Empieza por una materia.</strong><span>No necesitas matricularte en decenas de plataformas. Usa una fuente principal y una alternativa solo cuando la necesites.</span><button onClick={() => onOpenStage(currentIndex)}>Abrir mi aula: {current.code}<ArrowRight size={16} /></button></div></header>
    <nav className="study-guide-tabs" aria-label="Guía de estudio">{tabs.map(([id, label]) => <button key={id} type="button" aria-current={tab === id ? "true" : undefined} onClick={() => setTab(id)}>{label}</button>)}</nav></>}
    <div className="study-guide-panel" key={tab}>
      {tab === "inicio" && <>
        <div className="study-panel-heading"><CheckCircle2 /><div><h3>La combinación con la que puedes comenzar</h3><p>Elige por función. Estos pilares cubren el arranque; el dominio profesional exige después las prácticas y fuentes específicas de tu especialidad.</p></div></div>
        <div className="study-pillars">
          <article><span>01 / COMPRENDER</span><h4>OpenFING + OCW UC3M</h4><p>Clases universitarias y ejercicios para el tronco. Khan Academy solo si necesitas nivelar matemática.</p><ResourceLinks ids={["openfing", "uc3m", "khan"]} /></article>
          <article><span>02 / CONSTRUIR</span><h4>Una ruta de programación + Git</h4><p>OpenFING como base; freeCodeCamp para práctica. CS50 es una alternativa, no otro curso entero obligatorio. Full Stack Open llega después y tiene español parcial.</p><ResourceLinks ids={["fcc", "git", "cs50"]} /></article>
          <article><span>03 / CONECTAR</span><h4>Cisco + documentación oficial</h4><p>Redes y sistemas con laboratorios. Datos e IA: añade UC3M, OpenFING y Google ML cuando domines sus prerrequisitos.</p><ResourceLinks ids={["cisco", "learn", "googleml"]} /></article>
          <article><span>04 / DIAGNOSTICAR</span><h4>Slim + manuales + iFixit</h4><p>Reparación constituye una rama propia. Seguridad primero; luego PC, laptops, impresoras, móviles, Apple y finalmente placa.</p><ResourceLinks ids={["slim", "ifixit", "apple"]} /></article>
        </div>
        <div className="study-two-columns"><article><h4>Tu primera semana</h4><ol><li>Abre S0 y revisa la prueba de entrada.</li><li>Organiza archivos, copia de seguridad y un cuaderno de trabajo.</li><li>Estudia una lección y resuelve ejercicios sin copiar.</li><li>Guarda un programa o diagnóstico, sus pruebas y lo que debes repasar.</li><li>Elige la siguiente tarea a partir del error que encontraste.</li></ol><button className="study-primary" onClick={() => onOpenStage(0)}>Abrir S0 desde cero<ArrowRight size={16} /></button></article><article><h4>Una semana sostenible</h4><label className="study-hours">Horas por semana <input type="number" min="1" max="80" value={weeklyHours} onChange={(event) => { const value = Number(event.target.value); if (Number.isFinite(value)) setWeeklyHours(Math.min(80, Math.max(1, value))) }} /></label><p>Propuesta editable: {Math.round(weeklyHours * 0.3)} h de teoría, {Math.round(weeklyHours * 0.4)} h de problemas/laboratorio y {weeklyHours - Math.round(weeklyHours * 0.3) - Math.round(weeklyHours * 0.4)} h de proyecto, repaso y explicación.</p><p>Un tema difícil puede requerir más tiempo. Los años y horas de la carretera son estimaciones de planificación, no plazos garantizados.</p><button onClick={() => setTab("orden")}>Ver el orden completo<ArrowRight size={16} /></button></article></div>
        <p className="study-note"><b>Qué significa gratis:</b> puedes consultar el material seleccionado sin comprar certificados. Internet, equipo, repuestos, herramientas y algunos laboratorios físicos tienen costo. En cloud e IA usa alternativas locales y datos pequeños para evitar servicios de pago.</p>
      </>}

      {tab === "orden" && <>
        <div className="study-panel-heading"><ListOrdered /><div><h3>Del fundamento a la especialidad</h3><p>S0–S10 construyen la base; S11–S18 amplían especialidades. S19 introduce investigación. El progreso de la carretera sigue su orden actual; las ramas indican qué puedes empezar a practicar en paralelo sin declarar completadas etapas futuras.</p></div></div>
        <div className="study-order-overview"><p><b>Primero:</b> nivelación → programación y matemática → algoritmos y arquitectura → sistemas, redes y bases de datos → ingeniería y proyecto.</p><p><b>Después:</b> profundiza en una o dos ramas. Datos/IA requiere estadística y álgebra lineal; electrónica requiere electricidad y circuitos; reparación segura puede comenzar desde S0. Inglés técnico y escritura se practican durante todo el recorrido.</p></div>
        <div className="study-stage-list">{stages.map((stage, index) => <details key={stage.code} className={index === currentIndex ? "study-current-stage" : ""}><summary><span>{stage.code}</span><div><strong>{stage.title}</strong><small>{stage.duration}{index === currentIndex ? " · Tu siguiente etapa" : ""}</small></div><BookOpen size={18} /></summary><div className="study-stage-body"><p><b>Antes: </b>{stage.prerequisites}</p><p>{stage.outcome}</p><p><b>Demuestra: </b>{stage.gate}</p><p><b>Construye: </b>{stage.capstone}</p><ResourceLinks ids={stageSources[stage.code] ?? ["openfing"]} /><button className="study-primary" onClick={() => onOpenStage(index)}>Ver materias y ejercicios de {stage.code}<ArrowRight size={15} /></button></div></details>)}</div>
        <p className="study-note">Los cursos avanzados se repiten solo si faltan competencias. Que puedas explorar una etapa no significa que hayas aprobado sus prerrequisitos.</p>
      </>}

      {tab === "fuentes" && <SourceComparison />}

      {tab === "areas" && <>
        <h3>17 familias para conectar el plan completo</h3><p>Informática, computación, ingeniería de software, sistemas de información e ingeniería de computadores se solapan, pero tienen objetivos distintos. Estos cruces orientan el estudio; un nombre profesional o un título del Excel no demuestra dominio.</p>
        <p>Las correspondencias con S0–S19/T01–T12 son orientativas por familia. No equivalen a convalidar cada una de las 533 materias ni garantizan que todos sus temas tengan curso gratuito completo en español. Multimedia, bioinformática y cuántica quedan como exploraciones elegidas según tus objetivos.</p>
        <div className="study-family-grid">{learningFamilies.map((family) => <article key={family.prefix}><span className="study-family-label">{family.prefix} · {family.depth}</span><h4>{family.name}</h4><b>{family.entry}</b><p>{family.study}</p><p><strong>Evidencia: </strong>{family.proof}</p><ResourceLinks ids={family.resources} /></article>)}</div>
      </>}

      {tab === "reparacion" && <>
        <div className="study-panel-heading"><Wrench /><div><h3>De soporte técnico a ingeniería de hardware</h3><p>Reparar, diseñar hardware y desarrollar sistemas embebidos son competencias relacionadas con recorridos distintos. Aprende las bases comunes y después profundiza con práctica real.</p></div></div>
        <div className="study-note"><b>Seguridad antes que secuencia del Excel.</b> ESD, protección de datos, baterías y riesgo eléctrico se estudian antes de intervenir un equipo. Fuentes y condensadores pueden conservar energía después de desconectarse: un tiempo de espera fijo no garantiza seguridad. <a href="https://es.ifixit.com/Info/Device_Safety" target="_blank" rel="noreferrer">Guía de seguridad de iFixit</a>.</div>
        <div className="study-repair-list">{repairPath.map((step, index) => <article key={step.title}><span className="study-step-number">{String(index + 1).padStart(2, "0")}</span><div><small>{step.before}</small><h4>{step.title}</h4><details open={index === 0}><summary>Ver contenidos, evidencia y fuentes</summary><p>{step.content}</p><p><b>Evidencia: </b>{step.proof}</p><ResourceLinks ids={step.resources} /></details></div></article>)}</div>
        <div className="study-engineering"><h4>La rama de ingeniería sigue por aquí</h4><p>Circuitos → electrónica analógica → lógica combinacional y secuencial → arquitectura/ensamblador → HDL y FPGA → C y microcontroladores → buses UART/I²C/SPI → RTOS → PCB → verificación y proyecto integrado. Usa simulación donde sea posible; el diseño físico requiere instrumentos y componentes.</p><ResourceLinks ids={["unican", "openfing", "fpga", "ce2016"]} /><button onClick={() => onOpenStage(16)}>Explorar S16: electrónica y embebidos<ArrowRight size={16} /></button></div>
      </>}

      {tab === "catalogo" && <Suspense fallback={<p role="status">Cargando el plan de materias…</p>}><ExcelCatalog /></Suspense>}

      {tab === "investigacion" && <>
        <div className="study-panel-heading"><FlaskConical /><div><h3>Profundidad que puedas demostrar</h3><p>El objetivo es construir conocimiento sólido y aportar resultados propios. Nadie puede garantizar ser «el profesional con más conocimientos del mundo» ni dominar simultáneamente todas las especialidades.</p></div></div>
        <div className="study-two-columns"><article><h4>Qué puede darte esta ruta</h4><p>Acceso a contenidos universitarios, práctica deliberada, proyectos, comparación con estándares y un portafolio defendible. Puedes alcanzar mucha profundidad en un área con tiempo, revisión externa y experiencia.</p><p>Las rutas T01–T12 son especializaciones autodidactas. La palabra «maestría» en etiquetas históricas del Campus significa dominio de una materia; no un máster universitario acreditado.</p></article><article><h4>Universidad, máster y doctorado</h4><p>Estudiar materiales de esos niveles no otorga esos títulos ni demuestra equivalencia académica. Una universidad también aporta evaluación externa, tutoría, comunidad, laboratorios y oportunidades de investigación.</p><p>Un doctorado requiere contribución original y evaluación formal según la institución. Comparar resultados concretos es más útil que afirmar que una ruta es universalmente mejor que una universidad.</p><a href="https://oge.mit.edu/gpp/advanced-degrees/doctoral-degree/" target="_blank" rel="noreferrer">Ejemplo: requisitos doctorales del MIT<ExternalLink size={13} /></a></article></div>
        <ol className="study-research-steps"><li><b>Delimita una pregunta.</b> Revisa literatura y explica qué se sabe y qué falta.</li><li><b>Reproduce un resultado.</b> Publica instrucciones, datos permitidos, código, versiones y resultados.</li><li><b>Compara con una línea base.</b> Define métricas, controles, incertidumbre y fallos antes de sacar conclusiones.</li><li><b>Haz una contribución.</b> Un método, sistema, demostración, conjunto de datos o análisis con novedad justificada.</li><li><b>Busca crítica competente.</b> Revisión externa, defensa, correcciones y colaboración con especialistas.</li></ol>
        <ResourceLinks ids={["cs2023", "ce2016", "famaf", "openfing"]} /><button className="study-primary" onClick={() => onOpenStage(19)}>Explorar S19 y su proyecto de investigación<ArrowRight size={16} /></button>
        <p className="study-note">CS2023 y CE2016 sirven para contrastar competencias. Citarlos no acredita esta web ni certifica que una persona haya alcanzado todas sus competencias.</p>
      </>}
    </div>
    <footer className="study-guide-footer">Fuentes y condiciones revisadas el {resourceReviewDate}. El acceso, las traducciones y las ediciones pueden cambiar. Cada ficha enlaza su fuente para que puedas comprobarlos.</footer>
  </section>
}
