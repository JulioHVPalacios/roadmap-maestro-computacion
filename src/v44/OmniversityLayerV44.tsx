import { useState } from "react"
import { BookOpenCheck, Cpu, GraduationCap, Network, Orbit, ShieldCheck } from "lucide-react"
import OmniversityLayerV43 from "../v43/OmniversityLayerV43"
import KnowledgeUniverseV44 from "./KnowledgeUniverseV44"
import CoverageMatrixV44 from "./CoverageMatrixV44"
import FacultyBlueprintsV44 from "./FacultyBlueprintsV44"
import { CanonV44, EnginesV44, FrontierV44 } from "./ExtremePanelsV44"
import { careerCatalogV43 } from "../v43/career-catalog-v43"
import { facultiesV43 } from "../v43/curriculum-v43"
import { standardsV44 } from "./curriculum-v44"

type ExtremeTab="universo"|"cobertura"|"facultades"|"canon"|"motores"|"frontera"

export default function OmniversityLayerV44(props:{completedStageCodes:string[];currentStageIndex:number}){
 const [tab,setTab]=useState<ExtremeTab>("universo")
 return <>
  <OmniversityLayerV43 {...props}/>
  <section className="v44-extreme-layer" aria-labelledby="v44-title">
    <div className="v44-extreme-hero"><div><span>V44 · OMNIVERSITY DEFINITIVA · CAPA EXTREMA</span><h2 id="v44-title">De carretera a <em>universo de conocimiento.</em></h2><p>El tronco S0–S19 sigue siendo la ruta humana. Esta capa agrega la auditoría multi-disciplina, los {careerCatalogV43.length.toLocaleString("es-PE")} perfiles, 18 facultades de dominio, motores WebGL y contratos de profundidad sin sustituir el diseño del Campus.</p></div><div className="v44-extreme-numbers"><article><b>{careerCatalogV43.length.toLocaleString("es-PE")}</b><span>perfiles</span></article><article><b>{facultiesV43.length}</b><span>facultades</span></article><article><b>{standardsV44.length}</b><span>marcos</span></article><article><b>8×</b><span>evidencia</span></article></div></div>
    <nav className="v44-tabs" aria-label="Omniversity extrema"><button className={tab==="universo"?"is-active":""} onClick={()=>setTab("universo")}><Orbit/>Universo 2.221</button><button className={tab==="cobertura"?"is-active":""} onClick={()=>setTab("cobertura")}><ShieldCheck/>Matriz mundial</button><button className={tab==="facultades"?"is-active":""} onClick={()=>setTab("facultades")}><GraduationCap/>18 facultades</button><button className={tab==="canon"?"is-active":""} onClick={()=>setTab("canon")}><BookOpenCheck/>Canon mínimo</button><button className={tab==="motores"?"is-active":""} onClick={()=>setTab("motores")}><Cpu/>Motores</button><button className={tab==="frontera"?"is-active":""} onClick={()=>setTab("frontera")}><Network/>Frontera</button></nav>
    <div className="v44-tab-panel">{tab==="universo"&&<KnowledgeUniverseV44/>}{tab==="cobertura"&&<CoverageMatrixV44/>}{tab==="facultades"&&<FacultyBlueprintsV44/>}{tab==="canon"&&<CanonV44/>}{tab==="motores"&&<EnginesV44/>}{tab==="frontera"&&<FrontierV44/>}</div>
  </section>
 </>
}
