import { useMemo, useState } from "react"
import { ExternalLink, Search } from "lucide-react"
import { excelCatalog } from "./excel-catalog"
import { learningFamilies } from "./learning-paths"
import { getResource } from "./study-resources"

const PAGE_SIZE = 12
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")
const number = new Intl.NumberFormat("es-PE")

export default function ExcelCatalog() {
  const [query, setQuery] = useState("")
  const [prefix, setPrefix] = useState("")
  const [priority, setPriority] = useState("")
  const [page, setPage] = useState(0)
  const [weeklyHours, setWeeklyHours] = useState(20)
  const filtered = useMemo(() => excelCatalog.courses.filter((course) => (!prefix || course.id.startsWith(`${prefix}-`)) && (!priority || String(course.priority) === priority) && normalize(`${course.id} ${course.title} ${course.route} ${course.phase}`).includes(normalize(query))), [query, prefix, priority])
  const totalHours = filtered.reduce((sum, course) => sum + course.hours, 0)
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pages - 1)
  const visible = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE)
  const selectedFamily = learningFamilies.find((family) => family.prefix === prefix)

  return <div className="study-excel-catalog">
    <h3>Tu plan completo, consultable por materia</h3>
    <p>Se incorporaron las {excelCatalog.courses.length} materias y las 17 familias del Excel aportado. Es un inventario de temas y estimaciones; no significa que existan aquí 533 cursos desarrollados ni que cada materia tenga formación completa gratuita en español.</p>
    <p>Se conservan los títulos, prioridades, prerrequisitos y evidencias originales. La guía de estudio añade un orden recomendado y fuentes por familia; esas correspondencias son orientativas, no equivalencias materia por materia. Las referencias del Excel incluyen estándares y planes que no son cursos.</p>
    <div className="study-filters"><label><Search size={17} /><span className="study-sr-only">Buscar materia del Excel</span><input aria-label="Buscar materia del Excel" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0) }} placeholder="Materia o código: IA, laptops, MAT-001…" /></label><label><span className="study-sr-only">Familia del Excel</span><select aria-label="Familia del Excel" value={prefix} onChange={(event) => { setPrefix(event.target.value); setPage(0) }}><option value="">Todas las familias</option>{learningFamilies.map((family) => <option key={family.prefix} value={family.prefix}>{family.name}</option>)}</select></label><label><span className="study-sr-only">Prioridad original</span><select aria-label="Prioridad original" value={priority} onChange={(event) => { setPriority(event.target.value); setPage(0) }}><option value="">Todas las prioridades</option>{[1, 2, 3].map((value) => <option key={value} value={value}>Prioridad {value} del Excel</option>)}</select></label></div>
    <div className="study-catalog-summary" role="status"><strong>{filtered.length} materias</strong><span>{number.format(totalHours)} h estimadas en el Excel</span><label>Con <input aria-label="Horas semanales para estimar el plan" type="number" min="1" max="80" value={weeklyHours} onChange={(event) => { const value = Number(event.target.value); if (Number.isFinite(value)) setWeeklyHours(Math.max(1, Math.min(80, value))) }} /> h/semana: <b>{(totalHours / (weeklyHours * 48)).toLocaleString("es-PE", { maximumFractionDigits: 1 })} años</b></label></div>
    <p className="study-caption">Cálculo ilustrativo: horas de las materias filtradas ÷ (horas semanales × 48 semanas/año). No descuenta solapamientos ni experiencia previa; no es una duración de carrera ni una promesa de dominio. El inventario completo suma 49.828 h.</p>
    {selectedFamily && <div className="study-note"><b>{selectedFamily.name} · Entrada sugerida: {selectedFamily.entry}.</b><p>{selectedFamily.study}</p><div className="study-resource-links">{selectedFamily.resources.map((id) => { const item = getResource(id); return <a key={id} href={item.url} target="_blank" rel="noreferrer">{item.name}<ExternalLink size={13} /></a> })}</div></div>}
    {prefix === "REP" && <p className="study-note">Corrección de orden: estudia seguridad ESD, baterías y protección de datos antes de reparar, aunque REP-017 aparezca después en el inventario original. Para impresoras, iPhone, iPad, MacBook y accesorios consulta también «Reparación y electrónica»: el Excel no los desglosa todos por marca/modelo.</p>}
    <div className="study-catalog-list">{visible.map((course) => {
      const family = learningFamilies.find((item) => course.id.startsWith(`${item.prefix}-`))
      const sourceIds = course.sourceIds.split(/\s*;\s*/)
      const originalSources = excelCatalog.sources.filter((source) => sourceIds.includes(source.id))
      return <details key={course.id}><summary><span>{course.id}</span><div><strong>{course.title}</strong><small>{course.route} · prioridad {course.priority} · {course.hours} h estimadas</small></div></summary><div className="study-catalog-body"><p><b>Fase original: </b>{course.phase} · nivel {course.level}</p><p><b>Prerrequisitos del Excel: </b>{course.prerequisites || "No indicados"}</p><p><b>Evidencia original: </b>{course.evidence}</p>{family && <><p><b>Dónde conectarla con la ruta: </b>{family.entry}</p><p className="study-caption">Selección inicial por familia; comprueba el temario antes de usarla para esta materia concreta.</p><div className="study-resource-links">{family.resources.map((id) => { const item = getResource(id); return <a key={id} href={item.url} target="_blank" rel="noreferrer">{item.name}<ExternalLink size={13} /></a> })}</div></>}<details className="study-original-sources"><summary>Referencias originales del Excel ({course.sourceIds})</summary><ul>{originalSources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.id} · {source.title}</a> · {source.author} · {source.kind}</li>)}</ul><p>Transcripción del Excel; estas referencias no se convierten automáticamente en cursos ni se presentan como verificadas individualmente en esta revisión.</p></details></div></details>
    })}</div>
    {!filtered.length && <p role="status">No hay coincidencias. Prueba otro término o elimina un filtro.</p>}
    <nav className="study-pagination" aria-label="Páginas del catálogo"><button disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>Anterior</button><span>Página {safePage + 1} de {pages}</span><button disabled={safePage >= pages - 1} onClick={() => setPage(safePage + 1)}>Siguiente</button></nav>
    <details className="study-provenance"><summary>Procedencia y límites del inventario</summary><p>Fuente: {excelCatalog.source}. Solo se publican datos curriculares; el archivo original, sus estados personales y sus fechas no se modifican ni se publican.</p><p>Las afirmaciones del Excel sobre 150 instituciones son antecedentes de ese documento: esta revisión no reproduce ni certifica aquella auditoría. Las horas y prioridades son las del archivo, no créditos académicos reconocidos.</p><p>Huella SHA-256 del archivo consultado: <code>{excelCatalog.sha256}</code></p></details>
  </div>
}
