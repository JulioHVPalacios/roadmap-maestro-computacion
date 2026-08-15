import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, Flag, Route } from "lucide-react"
import { roadMilestones } from "./learning-data"

function RoadPreview() {
  return (
    <section className="v41-road-preview" aria-labelledby="v41-road-title">
      <div className="v41-road-head">
        <div>
          <span>MAPA VISUAL DEL CAMPUS</span>
          <h2 id="v41-road-title">Una carretera.<br />Todo el camino.</h2>
        </div>
        <p>Una vista rápida de cómo se conecta el proyecto. La ruta académica completa vive en <b>Ruta Maestra</b>, separada de la portada para que el campus respire.</p>
      </div>

      <div className="v41-road-canvas">
        <svg className="v41-road-svg" viewBox="0 0 1200 720" role="img" aria-label="Carretera visual desde orientación hasta frontera tecnológica">
          <path className="v41-road-shadow" d="M95 93 C370 42 510 45 688 145 C840 230 1050 210 1050 350 C1050 490 870 490 690 442 C500 390 350 420 260 526 C200 598 320 655 516 620 C720 584 855 550 1085 642" />
          <path className="v41-road-main" d="M95 93 C370 42 510 45 688 145 C840 230 1050 210 1050 350 C1050 490 870 490 690 442 C500 390 350 420 260 526 C200 598 320 655 516 620 C720 584 855 550 1085 642" />
          <path className="v41-road-dash" d="M95 93 C370 42 510 45 688 145 C840 230 1050 210 1050 350 C1050 490 870 490 690 442 C500 390 350 420 260 526 C200 598 320 655 516 620 C720 584 855 550 1085 642" />
        </svg>

        <div className="v41-road-marker" aria-hidden="true"><span>CM</span></div>

        <div className="v41-road-nodes">
          {roadMilestones.map((item, index) => (
            <article key={item.code} className={`v41-road-node tone-${item.tone} node-${index + 1}`}>
              <small>{item.code}</small>
              <div><b>{item.title}</b><span>{item.meta}</span></div>
            </article>
          ))}
        </div>

        <div className="v41-road-start"><Route /><span>INICIO</span></div>
        <div className="v41-road-finish"><Flag /><span>FRONTERA</span></div>
      </div>

      <div className="v41-road-actions">
        <a href="#ruta">Abrir Ruta Maestra <ArrowRight /></a>
        <span>Mapa original de Campus Maestro · responsive · interactivo</span>
      </div>
    </section>
  )
}

export default function RoadPreviewPortal() {
  const [host, setHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let cancelled = false
    let attempts = 0
    const locate = () => {
      if (cancelled) return
      const universes = document.querySelector<HTMLElement>(".v41-route-inicio .v15-universes")
      if (universes?.parentElement) {
        const mount = document.createElement("div")
        mount.className = "v41-road-portal-host"
        universes.insertAdjacentElement("afterend", mount)
        setHost(mount)
        return
      }
      attempts += 1
      if (attempts < 20) window.setTimeout(locate, 50)
    }
    locate()
    return () => {
      cancelled = true
      setHost((current) => {
        current?.remove()
        return null
      })
    }
  }, [])

  return host ? createPortal(<RoadPreview />, host) : null
}
