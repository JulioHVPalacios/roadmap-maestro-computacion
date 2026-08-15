import { useState } from "react"
import { BookOpenCheck, Cpu, GraduationCap, Network, Orbit, ShieldCheck } from "lucide-react"
import AcademicCoverageV45 from "./AcademicCoverageV45"
import KnowledgeUniverseV44 from "../v44/KnowledgeUniverseV44"
import CoverageMatrixV44 from "../v44/CoverageMatrixV44"
import FacultyBlueprintsV44 from "../v44/FacultyBlueprintsV44"
import { CanonV44, FrontierV44 } from "../v44/ExtremePanelsV44"
import TechnologyStackV45 from "./TechnologyStackV45"
import { careerCatalogV43 } from "../v43/career-catalog-v43"
import { facultiesV43 } from "../v43/curriculum-v43"
import { standardsV44 } from "../v44/curriculum-v44"

type KnowledgeTab = "profesiones" | "cobertura" | "areas" | "fuentes" | "tecnologia" | "frontera"

export default function OmniversityLayerV45(props: { completedStageCodes: string[]; currentStageIndex: number }) {
  const [tab, setTab] = useState<KnowledgeTab>("profesiones")
  return <>
    <AcademicCoverageV45 {...props} />
    <section className="v44-extreme-layer v45-knowledge-layer" aria-labelledby="v45-knowledge-title">
      <div className="v44-extreme-hero v45-knowledge-hero">
        <div>
          <span>COBERTURA ACADÉMICA · RUTA MAESTRA</span>
          <h2 id="v45-knowledge-title">Del tronco común a <em>las áreas de dominio.</em></h2>
          <p>La secuencia S0–S19 organiza el avance. Esta sección permite comprobar qué áreas cubre el plan, explorar {careerCatalogV43.length.toLocaleString("es-PE")} perfiles profesionales, revisar fuentes de referencia y distinguir tecnologías consolidadas, emergentes y experimentales.</p>
        </div>
        <div className="v44-extreme-numbers">
          <article><b>{careerCatalogV43.length.toLocaleString("es-PE")}</b><span>perfiles</span></article>
          <article><b>{facultiesV43.length}</b><span>áreas de dominio</span></article>
          <article><b>{standardsV44.length}</b><span>marcos de referencia</span></article>
          <article><b>S0–S19</b><span>tronco común</span></article>
        </div>
      </div>

      <nav className="v44-tabs" aria-label="Exploración académica">
        <button className={tab === "profesiones" ? "is-active" : ""} onClick={() => setTab("profesiones")}><Orbit />Mapa profesional</button>
        <button className={tab === "cobertura" ? "is-active" : ""} onClick={() => setTab("cobertura")}><ShieldCheck />Matriz de cobertura</button>
        <button className={tab === "areas" ? "is-active" : ""} onClick={() => setTab("areas")}><GraduationCap />18 áreas de dominio</button>
        <button className={tab === "fuentes" ? "is-active" : ""} onClick={() => setTab("fuentes")}><BookOpenCheck />Fuentes base</button>
        <button className={tab === "tecnologia" ? "is-active" : ""} onClick={() => setTab("tecnologia")}><Cpu />Tecnologías del Campus</button>
        <button className={tab === "frontera" ? "is-active" : ""} onClick={() => setTab("frontera")}><Network />Frontera tecnológica</button>
      </nav>

      <div className="v44-tab-panel">
        {tab === "profesiones" && <KnowledgeUniverseV44 />}
        {tab === "cobertura" && <CoverageMatrixV44 />}
        {tab === "areas" && <FacultyBlueprintsV44 />}
        {tab === "fuentes" && <CanonV44 />}
        {tab === "tecnologia" && <TechnologyStackV45 />}
        {tab === "frontera" && <FrontierV44 />}
      </div>
    </section>
  </>
}
