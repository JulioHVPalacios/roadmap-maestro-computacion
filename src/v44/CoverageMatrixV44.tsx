import { Check, ExternalLink, ShieldCheck } from "lucide-react"
import { facultiesV43 } from "../v43/curriculum-v43"
import { standardsV44 } from "./curriculum-v44"

export default function CoverageMatrixV44(){
  return <div className="v44-coverage">
    <div className="v44-section-head"><div><span>MATRIZ DE REFERENCIA MUNDIAL</span><h3>Una sola malla no basta.</h3></div><p>La Ruta Maestra se audita contra varias disciplinas formales. Esta matriz es una referencia de cobertura, no una acreditación ni equivalencia oficial.</p></div>
    <div className="v44-coverage-scroll"><table><thead><tr><th>Marco</th>{facultiesV43.map(f=><th key={f.id} title={f.title}>{f.code}</th>)}</tr></thead><tbody>{standardsV44.map(s=><tr key={s.code}><td><a href={s.url} target="_blank" rel="noreferrer"><b>{s.code}</b><span>{s.discipline}</span><small>{s.authority} · {s.year}</small><ExternalLink/></a></td>{facultiesV43.map(f=><td key={f.id} className={s.coverage.includes(f.id)?"is-covered":""}>{s.coverage.includes(f.id)?<Check/>:<i/>}</td>)}</tr>)}</tbody></table></div>
    <div className="v44-coverage-legend"><ShieldCheck/><span><b>Regla:</b> ningún marco aislado define toda la Omniversidad; se combinan estándares de disciplina, planes universitarios, cuerpos de conocimiento, práctica y evidencia.</span></div>
  </div>
}
