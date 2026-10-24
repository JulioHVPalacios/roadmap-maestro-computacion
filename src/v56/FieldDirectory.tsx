import { useState } from "react"
import { ArrowRight, Atom, BookOpen, BriefcaseBusiness, CircuitBoard, Code2, Cpu, Database, FlaskConical, GraduationCap, HeartPulse, Laptop, Network, Palette, Search, Shield, Sparkles, Wrench } from "lucide-react"
import { learningFamilies } from "../v53/learning-paths"

const fieldIcons = { PRE: Laptop, MAT: Atom, CST: Code2, SYS: Cpu, SWE: Code2, DAI: Database, NET: Network, CYB: Shield, EIO: CircuitBoard, ROB: Cpu, REP: Wrench, ISM: BriefcaseBusiness, GXR: Sparkles, MED: Palette, BIO: HeartPulse, QUA: Atom, CAP: FlaskConical }
const groups = [
  { label: "Todos", prefixes: learningFamilies.map((family) => family.prefix) },
  { label: "Fundamentos", prefixes: ["PRE", "MAT", "CST", "SYS"] },
  { label: "Desarrollo y datos", prefixes: ["SWE", "DAI", "NET", "CYB", "ISM", "GXR", "MED"] },
  { label: "Hardware", prefixes: ["EIO", "ROB", "REP"] },
  { label: "Investigación", prefixes: ["BIO", "QUA", "CAP"] },
]
const featured = ["CST", "SWE", "DAI", "CYB", "EIO", "REP"]
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")

export default function FieldDirectory({ compact = false, onSelect, onViewAll }: { compact?: boolean; onSelect: (prefix: string) => void; onViewAll?: () => void }) {
  const [query, setQuery] = useState("")
  const [group, setGroup] = useState("Todos")
  const [expanded, setExpanded] = useState(false)
  const active = groups.find((item) => item.label === group)!
  const filtered = learningFamilies.filter((family) => active.prefixes.includes(family.prefix) && normalize(`${family.name} ${family.study}`).includes(normalize(query.trim())))
  const showFeatured = compact && !query.trim() && group === "Todos"
  const visible = showFeatured ? featured.map((prefix) => learningFamilies.find((family) => family.prefix === prefix)!) : expanded || query.trim() || group !== "Todos" ? filtered : filtered.slice(0, 6)
  return <section className="rm-fields" aria-label="Directorio de campos de estudio">
    <div className="rm-section-title"><div><span className="rw-eyebrow">AMPLÍA TU HORIZONTE</span><h2>Explora tus campos de estudio</h2></div>{onViewAll && <button className="rw-text-button" onClick={onViewAll}>Ver los 17 campos<ArrowRight size={16} /></button>}</div>
    <div className="rm-field-controls"><label className="rm-search"><Search size={18} /><input aria-label="Buscar campo de estudio" placeholder="¿Qué quieres aprender?" value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="rm-field-filters" aria-label="Filtrar campos">{groups.map((item) => <button key={item.label} aria-pressed={group === item.label} onClick={() => { setGroup(item.label); setExpanded(false) }}>{item.label}</button>)}</div></div>
    <div className="rm-field-grid">{visible.map((family) => { const Icon = fieldIcons[family.prefix as keyof typeof fieldIcons] ?? GraduationCap; return <button className="rm-field-card" key={family.prefix} onClick={() => onSelect(family.prefix)}><span className={`rm-field-icon rm-tone-${family.depth === "Base común" ? "blue" : family.depth === "Exploración" ? "gold" : "green"}`}><Icon size={23} /></span><span><small>{family.prefix} · {family.depth}</small><strong>{family.name}</strong><span>{family.study.split(";")[0].split(". ")[0].replace(/\.$/, "")}.</span></span><ArrowRight size={16} /></button> })}</div>
    {!visible.length && <p role="status" className="rm-empty">No hay campos con ese término. Prueba otra búsqueda o selecciona «Todos».</p>}
    {!compact && !expanded && !query.trim() && group === "Todos" && <button className="rm-show-all" onClick={() => setExpanded(true)}><BookOpen size={17} />Mostrar los 17 campos<ArrowRight size={16} /></button>}
    {!compact && expanded && !query.trim() && group === "Todos" && <button className="rm-show-all" onClick={() => setExpanded(false)}>Mostrar menos campos</button>}
  </section>
}
