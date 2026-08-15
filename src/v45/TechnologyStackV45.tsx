import { Cpu, ExternalLink, FlaskConical, Layers3 } from "lucide-react"
import { enginesV44 } from "../v44/curriculum-v44"

type TechnologyItem = {
  name: string
  role: string
  status: string
  license: string
  why: string
  url: string
}

const visualStack: TechnologyItem[] = [
  {
    name: "Three.js",
    role: "Escena 3D de la carretera, estaciones, iluminación y cámara",
    status: "Integrado en Ruta",
    license: "MIT",
    why: "Permite conservar la carretera y darle profundidad espacial sin convertir el contenido académico en un videojuego separado.",
    url: "https://github.com/mrdoob/three.js",
  },
  {
    name: "React Three Fiber",
    role: "Integración declarativa de Three.js con React",
    status: "Integrado en Ruta",
    license: "MIT",
    why: "Mantiene la escena dentro de la arquitectura React existente y permite que selección, progreso y aulas compartan el mismo estado.",
    url: "https://github.com/pmndrs/react-three-fiber",
  },
  {
    name: "Drei",
    role: "Controles, HTML sobre 3D y adaptación de rendimiento",
    status: "Integrado en Ruta",
    license: "MIT",
    why: "Aporta abstracciones probadas como PerformanceMonitor y AdaptiveDpr para ajustar la experiencia según el dispositivo.",
    url: "https://github.com/pmndrs/drei",
  },
]

const merged = [
  ...visualStack,
  ...enginesV44.filter((engine) => !["React Flow", "ELK.js", "Sigma.js", "Graphology", "GSAP"].includes(engine.name)),
  ...enginesV44.filter((engine) => ["React Flow", "ELK.js", "Sigma.js", "Graphology", "GSAP"].includes(engine.name)).map((engine) => ({
    ...engine,
    status: engine.name === "Sigma.js" || engine.name === "Graphology" ? "Integrado" : "Base activa",
  })),
]

export default function TechnologyStackV45() {
  return (
    <div className="v44-engines v45-tech-stack">
      <div className="v44-section-head">
        <div><span>ARQUITECTURA TÉCNICA</span><h3>Una herramienta distinta para cada tarea.</h3></div>
        <p>La vista inmersiva, el mapa académico, el universo profesional, las animaciones y los laboratorios tienen necesidades diferentes. La Ruta usa cada motor donde aporta valor y evita cargar librerías redundantes solo por apariencia.</p>
      </div>
      <div className="v44-engine-grid">
        {merged.map((engine) => (
          <a key={engine.name} href={engine.url} target="_blank" rel="noreferrer">
            <div><Layers3 /><span>{engine.status}</span></div>
            <h4>{engine.name}</h4>
            <b>{engine.role}</b>
            <p>{engine.why}</p>
            <small>{engine.license} <ExternalLink /></small>
          </a>
        ))}
      </div>
      <div className="v44-lab-bridge">
        <FlaskConical />
        <div><small>LABORATORIOS</small><h4>La Ruta organiza el dominio; los laboratorios demuestran lo aprendido.</h4><p>JupyterLite/Pyodide y Sandpack permanecen como base prevista para prácticas en navegador. La integración se realiza por aula para no aumentar el peso de la carretera ni mezclar navegación con ejecución.</p></div>
        <button onClick={() => { window.location.hash = "programacion" }}><Cpu /> Abrir Programación</button>
      </div>
    </div>
  )
}
