import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Lightbulb, MessageCircle, X } from "lucide-react"
import type { V41Route } from "./AppV41"

const routeTips: Record<V41Route, string[]> = {
  inicio: [
    "Soy Pingo. La portada ahora resume el proyecto; el estudio completo vive en Ruta Maestra.",
    "Los ocho mundos muestran cómo se conectan las ramas de computación. Debajo tienes el mapa-carretera del Campus.",
    "No necesitas estudiar todo a la vez: elige una ruta y demuestra cada etapa con evidencia.",
  ],
  ruta: [
    "Empieza por el tronco común y abre cada etapa. No marques una materia como dominada solo por haber visto contenido.",
    "Tu evidencia importa: problemas resueltos, laboratorios, proyectos, pruebas y defensa técnica.",
    "Si una profesión te interesa, usa el Atlas para conectarla con etapas y especializaciones.",
  ],
  programacion: [
    "Empieza en P0 si todavía no dominas lógica. La velocidad importa menos que poder explicar y construir sin copiar.",
    "En el laboratorio puedes ejecutar JavaScript, HTML/CSS/JS y Python dentro del Campus.",
    "Cada nivel pide proyecto. Antes de avanzar: requisitos, pruebas, implementación, refactor y explicación.",
  ],
  ingles: [
    "En Inglés IT practica las cuatro habilidades: escuchar, hablar, leer y escribir; no solo vocabulario.",
    "Usa el micrófono cuando tu navegador lo permita. La coincidencia es una ayuda de práctica, no una certificación oficial.",
    "Aprende frases que usarías de verdad: bugs, pull requests, incidentes, arquitectura, papers y reuniones.",
  ],
  recursos: ["Usa Recursos como biblioteca de apoyo. La ruta de estudio decide cuándo necesitas cada fuente."],
  certificaciones: ["Las certificaciones complementan la evidencia; primero construye habilidad real y después demuestra lo aprendido."],
  noticias: ["El radar te mantiene actualizado, pero separa novedades de fundamentos. No persigas cada moda."],
  perfil: ["Este perfil es la identidad profesional vinculada al Campus Maestro y a sus proyectos públicos."],
  soporte: ["Si algo falla, describe qué hiciste, qué esperabas, qué ocurrió y en qué dispositivo. Eso vuelve el error reproducible."],
}

export default function PingoVoxelTutor({ route }: { route: V41Route }) {
  const [open, setOpen] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)
  const [contextTip, setContextTip] = useState("")
  const tips = useMemo(() => routeTips[route], [route])
  const text = contextTip || tips[tipIndex % tips.length]

  useEffect(() => {
    setTipIndex(0)
    setContextTip("")
  }, [route])

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const host = target?.closest<HTMLElement>("[data-pingo-tip]")
      if (!host) return
      const tip = host.dataset.pingoTip?.trim()
      if (tip) setContextTip(tip)
    }
    const onLeave = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest?.("[data-pingo-tip]")) window.setTimeout(() => setContextTip(""), 450)
    }
    document.addEventListener("pointerover", onPointer, { passive: true })
    document.addEventListener("pointerout", onLeave, { passive: true })
    return () => {
      document.removeEventListener("pointerover", onPointer)
      document.removeEventListener("pointerout", onLeave)
    }
  }, [])

  useEffect(() => {
    if (open || contextTip) return
    const timer = window.setInterval(() => setTipIndex((value) => (value + 1) % tips.length), 9000)
    return () => window.clearInterval(timer)
  }, [contextTip, open, tips.length])

  return (
    <aside className={`v41-pingo ${open ? "open" : ""}`} aria-label="Pingo, tutor del Campus">
      <svg className="v41-goo-filter" width="0" height="0" aria-hidden="true"><filter id="v41-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter></svg>
      {open && (
        <div className="v41-pingo-panel">
          <div className="v41-pingo-panel-head"><div><span>PINGO</span><small>Tutor del Campus</small></div><button onClick={() => setOpen(false)} aria-label="Cerrar tutor"><X /></button></div>
          <p>{text}</p>
          <div className="v41-pingo-orb" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <div className="v41-pingo-actions"><button onClick={() => { setContextTip(""); setTipIndex((value) => (value + 1) % tips.length) }}><Lightbulb />Otro consejo</button><a href="/soporte"><MessageCircle />Soporte</a></div>
        </div>
      )}

      <button className="v41-pingo-character" onClick={() => setOpen((value) => !value)} aria-label={open ? "Ocultar Pingo" : "Hablar con Pingo"}>
        <div className="v41-pingo-shadow" />
        <div className="v41-pingo-body">
          <span className="v41-pingo-ear left" /><span className="v41-pingo-ear right" />
          <span className="v41-pingo-head"><i className="eye left" /><i className="eye right" /><i className="beak" /></span>
          <span className="v41-pingo-belly" />
          <span className="v41-pingo-wing left" /><span className="v41-pingo-wing right" />
          <span className="v41-pingo-foot left" /><span className="v41-pingo-foot right" />
        </div>
        <span className="v41-pingo-badge">P</span>
        {open && <ChevronDown className="v41-pingo-chevron" />}
      </button>
    </aside>
  )
}
