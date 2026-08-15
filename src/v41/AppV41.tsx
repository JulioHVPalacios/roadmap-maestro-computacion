import { useEffect, useMemo, useState } from "react"
import LegacyCampus from "../App"
import EnglishHubV41 from "./EnglishHubV41"
import PingoVoxelTutor from "./PingoVoxelTutor"
import ProgrammingHubV41 from "./ProgrammingHubV41"
import RoadPreviewPortal from "./RoadPreview"
import SupportHubV41 from "./SupportHubV41"
import V41Header from "./V41Header"
import MasterRouteV45 from "../v45/MasterRouteV45"
import "./v41.css"

export type V41Route =
  | "inicio"
  | "ruta"
  | "programacion"
  | "ingles"
  | "recursos"
  | "certificaciones"
  | "noticias"
  | "perfil"
  | "soporte"

const allowed = new Set<V41Route>([
  "inicio",
  "ruta",
  "programacion",
  "ingles",
  "recursos",
  "certificaciones",
  "noticias",
  "perfil",
  "soporte",
])

function routeFromHash(): V41Route {
  const raw = window.location.hash.replace(/^#/, "").trim().toLowerCase()
  if (raw === "campus" || raw === "roadmap" || raw === "maestrias" || raw === "atlas") return "ruta"
  return allowed.has(raw as V41Route) ? (raw as V41Route) : "inicio"
}

export default function AppV41() {
  const [route, setRoute] = useState<V41Route>(() => routeFromHash())

  useEffect(() => {
    const sync = () => {
      const next = routeFromHash()
      setRoute(next)
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }))
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const legacy = useMemo(
    () => route === "inicio" || route === "ruta" || route === "recursos" || route === "certificaciones" || route === "noticias" || route === "perfil",
    [route],
  )

  return (
    <div className={`v41-shell v41-route-${route}`}>
      <V41Header route={route} />

      {route === "ruta" && <MasterRouteV45 />}

      {legacy && (
        <div className="v41-legacy-host">
          <LegacyCampus />
          {route === "inicio" && <RoadPreviewPortal />}
        </div>
      )}

      {route === "programacion" && <ProgrammingHubV41 />}
      {route === "ingles" && <EnglishHubV41 />}
      {route === "soporte" && <SupportHubV41 />}

      <PingoVoxelTutor route={route} />
    </div>
  )
}
