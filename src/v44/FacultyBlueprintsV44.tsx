import { BookOpen, FlaskConical, Microscope, Wrench } from "lucide-react"
import { facultiesV43 } from "../v43/curriculum-v43"
import { facultyBlueprintsV44 } from "./curriculum-v44"

export default function FacultyBlueprintsV44(){
  return <div className="v44-blueprints"><div className="v44-section-head"><div><span>18 FACULTADES · TEORÍA → PRÁCTICA → INVESTIGACIÓN</span><h3>Cada dominio tiene contrato de profundidad.</h3></div><p>No son 18 carreras aisladas. Comparten tronco y luego profundizan con artefactos, sistemas, investigación y defensa.</p></div><div className="v44-blueprint-grid">{facultyBlueprintsV44.map(bp=>{const f=facultiesV43.find(x=>x.id===bp.facultyId);if(!f)return null;return <article key={bp.facultyId}><header><small>{f.code}</small><h4>{f.title}</h4><span>{f.stageRange}</span></header><section><b><BookOpen/>Teoría</b><ul>{bp.theory.map(x=><li key={x}>{x}</li>)}</ul></section><section><b><Wrench/>Práctica</b><ul>{bp.practice.map(x=><li key={x}>{x}</li>)}</ul></section><section><b><FlaskConical/>Sistemas</b><ul>{bp.systems.map(x=><li key={x}>{x}</li>)}</ul></section><section><b><Microscope/>Investigación</b><ul>{bp.research.map(x=><li key={x}>{x}</li>)}</ul></section><footer><small>CAPSTONE</small><strong>{bp.capstone}</strong><p>{bp.proof}</p></footer></article>})}</div></div>
}
