import { useMemo, useState } from "react"
import { ExternalLink, Search } from "lucide-react"
import { excelCatalog } from "./excel-catalog"
import { learningFamilies } from "./learning-paths"
import { getResource } from "./study-resources"
import CourseStudyPanel from "../v55/CourseStudyPanel"
import { coursePlans, courseSources, uniqueCourseSourceCount } from "../v55/course-materials"

const PAGE_SIZE = 12
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")
const number = new Intl.NumberFormat("es-PE")
const plansById = new Map(coursePlans.map((plan) => [plan.id, plan]))
const sourcesById = new Map(courseSources.map((source) => [source.id, source]))

export default function ExcelCatalog() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get("materia") ?? "")
  const [prefix, setPrefix] = useState("")
  const [priority, setPriority] = useState("")
  const [resourceLanguage, setResourceLanguage] = useState("")
  const [page, setPage] = useState(0)
  const [weeklyHours, setWeeklyHours] = useState(20)
  const filtered = useMemo(() => excelCatalog.courses.filter((course) => {
    const plan = plansById.get(course.id)
    const sources = plan?.sourceIds.map((id) => sourcesById.get(id)) ?? []
    const languageMatches = !resourceLanguage || (resourceLanguage === "es" ? sources.some((source) => source?.language === "es") : sources.length > 0 && sources.every((source) => source?.language === "es"))
    return (!prefix || course.id.startsWith(`${prefix}-`)) && (!priority || String(course.priority) === priority) && languageMatches && normalize(`${course.id} ${course.title} ${course.route} ${course.phase} ${course.topics} ${plan?.focus.join(" ") ?? ""}`).includes(normalize(query))
  }), [query, prefix, priority, resourceLanguage])
  const totalHours = filtered.reduce((sum, course) => sum + course.hours, 0)
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pages - 1)
  const visible = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE)
  const selectedFamily = learningFamilies.find((family) => family.prefix === prefix)

  return <div className="study-excel-catalog">
    <h3>Elige una materia. Trabaja con evidencia.</h3>
    <p>Las {excelCatalog.courses.length} materias del Excel conservan sus datos originales. Las guías específicas añaden temas de estudio, una práctica original, criterios de revisión, una pregunta con respuesta orientativa y materiales seleccionados.</p>
    <p>Una guía y sus fuentes no equivalen a un curso completo impartido por la institución enlazada. Revisa el alcance de la materia y el idioma: algunos recursos son parciales o están en inglés; instrumentos, licencias y servicios pueden tener coste.</p>
    <div className="study-material-count"><b>{coursePlans.length} de {excelCatalog.courses.length} materias con guía y práctica específica.</b> {uniqueCourseSourceCount} recursos distintos seleccionados por tema. Las comprobaciones personales se guardan aparte del dominio de las etapas.</div>
    <div className="study-filters">
      <label><Search size={17} /><span className="study-sr-only">Buscar materia del Excel</span><input aria-label="Buscar materia del Excel" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0) }} placeholder="Materia, concepto o código: IA, laptops, MAT-001…" /></label>
      <label><span className="study-sr-only">Familia del Excel</span><select aria-label="Familia del Excel" value={prefix} onChange={(event) => { setPrefix(event.target.value); setPage(0) }}><option value="">Todas las familias</option>{learningFamilies.map((family) => <option key={family.prefix} value={family.prefix}>{family.name}</option>)}</select></label>
      <label><span className="study-sr-only">Prioridad original</span><select aria-label="Prioridad original" value={priority} onChange={(event) => { setPriority(event.target.value); setPage(0) }}><option value="">Todas las prioridades</option>{[1, 2, 3].map((value) => <option key={value} value={value}>Prioridad {value} del Excel</option>)}</select></label>
      <label><span className="study-sr-only">Idioma de los recursos</span><select aria-label="Idioma de los recursos" value={resourceLanguage} onChange={(event) => { setResourceLanguage(event.target.value); setPage(0) }}><option value="">Todos los idiomas de recursos</option><option value="es">Con algún recurso en español</option><option value="solo-es">Solo recursos etiquetados en español</option></select></label>
    </div>
    <div className="study-catalog-summary" role="status"><strong>{filtered.length} materias</strong><span>{number.format(totalHours)} h estimadas en el Excel</span><label>Con <input aria-label="Horas semanales para estimar el plan" type="number" min="1" max="80" value={weeklyHours} onChange={(event) => { const value = Number(event.target.value); if (Number.isFinite(value)) setWeeklyHours(Math.max(1, Math.min(80, value))) }} /> h/semana: <b>{(totalHours / (weeklyHours * 48)).toLocaleString("es-PE", { maximumFractionDigits: 1 })} años</b></label></div>
    <p className="study-caption">Cálculo ilustrativo: horas filtradas ÷ (horas semanales × 48 semanas/año). No descuenta solapamientos ni experiencia previa; no es una duración recomendada ni promesa de dominio. El inventario suma 49.828 h. El filtro de idioma describe las fuentes seleccionadas, no certifica cobertura íntegra en español.</p>
    {selectedFamily && <div className="study-note"><b>{selectedFamily.name} · Conexión orientativa: {selectedFamily.entry}.</b><p>{selectedFamily.study}</p></div>}
    {prefix === "REP" && <p className="study-note">Estudia seguridad ESD, baterías y protección de datos antes de reparar, aunque REP-017 aparezca después en el inventario. Las prácticas de placa y alimentación no reemplazan entrenamiento supervisado.</p>}
    <div className="study-catalog-list">{visible.map((course) => {
      const family = learningFamilies.find((item) => course.id.startsWith(`${item.prefix}-`))
      const sourceIds = course.sourceIds.split(/\s*;\s*/)
      const originalSources = excelCatalog.sources.filter((source) => sourceIds.includes(source.id))
      return <details key={course.id} open={query === course.id ? true : undefined}>
        <summary><span>{course.id}</span><div><strong>{course.title}</strong><small>{course.route} · prioridad {course.priority} · {course.hours} h estimadas</small></div></summary>
        <div className="study-catalog-body">
          <p><b>Antes de empezar: </b>{course.prerequisites || "El Excel no indica prerrequisitos"}. Consulta también los requisitos de las aulas relacionadas y la preparación práctica necesaria.</p>
          <CourseStudyPanel courseId={course.id} title={course.title} />
          <details className="study-original-sources"><summary>Consultar los datos originales del Excel</summary><p><b>Fase: </b>{course.phase} · nivel {course.level}</p><p><b>Temario original: </b>{course.topics}</p><p><b>Alcance declarado: </b>{course.scope}. Es una etiqueta del inventario, no una evaluación de dominio.</p><p><b>Evidencia original: </b>{course.evidence}</p><ul>{originalSources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.id} · {source.title}</a> · {source.author} · {source.kind}</li>)}</ul><p>Transcripción de las referencias {course.sourceIds}; no todas son cursos ni fueron verificadas individualmente como formación completa de esta materia.</p></details>
          {family && <details className="study-original-sources"><summary>Conexión con el tronco y recursos generales de la familia</summary><p>{family.entry}</p><p>Son orientaciones generales. Para esta materia empieza por la selección específica de «Materiales».</p><div className="study-resource-links">{family.resources.map((id) => { const item = getResource(id); return <a key={id} href={item.url} target="_blank" rel="noreferrer">{item.name}<ExternalLink size={13} /></a> })}</div></details>}
          <p className="study-caption"><a href={`/ruta?vista=catalogo&materia=${course.id}`}>Enlace directo a {course.id}</a></p>
        </div>
      </details>
    })}</div>
    {!filtered.length && <p role="status">No hay coincidencias. Prueba otro término o elimina un filtro.</p>}
    <nav className="study-pagination" aria-label="Páginas del catálogo"><button disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>Anterior</button><span>Página {safePage + 1} de {pages}</span><button disabled={safePage >= pages - 1} onClick={() => setPage(safePage + 1)}>Siguiente</button></nav>
    <details className="study-provenance"><summary>Procedencia y límites del inventario</summary><p>Fuente: {excelCatalog.source}. Solo se publican datos curriculares; el archivo original, sus estados personales y sus fechas no se modifican ni se publican.</p><p>Las afirmaciones del Excel sobre 150 instituciones no constituyen acreditación de esta ruta. Las horas y prioridades son las del archivo, no créditos académicos reconocidos.</p><p>Huella SHA-256 del archivo consultado: <code>{excelCatalog.sha256}</code></p></details>
  </div>
}
