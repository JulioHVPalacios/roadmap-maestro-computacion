import { lazy, Suspense, useState } from "react"
import AcademicCoverageV45, { type AcademicTab } from "../v45/AcademicCoverageV45"
import CoverageMatrixV44 from "../v44/CoverageMatrixV44"
import FacultyBlueprintsV44 from "../v44/FacultyBlueprintsV44"
import { CanonV44, FrontierV44 } from "../v44/ExtremePanelsV44"
import TechnologyStackV45 from "../v45/TechnologyStackV45"

const KnowledgeUniverseV44 = lazy(() => import("../v44/KnowledgeUniverseV44"))
const academicOptions: { id: AcademicTab; title: string }[] = [
  { id: "atlas", title: "Áreas y buscador de profesiones" },
  { id: "grafo", title: "Dependencias del conocimiento" },
  { id: "tiempo", title: "Historia de la computación" },
  { id: "evidencia", title: "Pruebas y proyectos integradores" },
  { id: "fuentes", title: "Referencias académicas originales" },
  { id: "repaso", title: "Repaso de materias" },
]

export default function AcademicExplorer(props: { completedStageCodes: string[]; currentStageIndex: number }) {
  const [tab, setTab] = useState("atlas")
  const academicTab = academicOptions.find((item) => item.id === tab)
  return <section className="v45-knowledge-layer" aria-label="Herramientas de exploración académica">
    <div className="rw-explorer-choice"><label htmlFor="rw-academic-tool">Elige qué quieres explorar<select aria-label="Elige qué quieres explorar" id="rw-academic-tool" value={tab} onChange={(event) => setTab(event.target.value)}><optgroup label="Conocimiento y profesión">{academicOptions.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}<option value="profesiones">Universo de 2.221 perfiles</option></optgroup><optgroup label="Contraste y profundidad"><option value="cobertura">Matriz de cobertura y marcos</option><option value="areas">Práctica de las 18 áreas de dominio</option><option value="canon">Fuentes base y canon ampliado</option><option value="tecnologia">Tecnologías del Campus</option><option value="frontera">Frontera y madurez tecnológica</option></optgroup></select></label></div>
    {academicTab && <AcademicCoverageV45 key={tab} {...props} activeTab={academicTab.id} hideNavigation />}
    {tab === "profesiones" && <Suspense fallback={<p role="status">Preparando el universo de profesiones…</p>}><KnowledgeUniverseV44 /></Suspense>}
    {tab === "cobertura" && <CoverageMatrixV44 />}
    {tab === "areas" && <FacultyBlueprintsV44 />}
    {tab === "canon" && <CanonV44 />}
    {tab === "tecnologia" && <TechnologyStackV45 />}
    {tab === "frontera" && <FrontierV44 />}
  </section>
}
