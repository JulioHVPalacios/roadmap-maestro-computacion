import { useEffect, useMemo, useState } from "react"
import LegacyCampus from "../App"
import EnglishHubV41 from "./EnglishHubV41"
import PingoVoxelTutor from "./PingoVoxelTutor"
import ProgrammingHubV41 from "./ProgrammingHubV41"
import RoadPreviewPortal from "./RoadPreview"
import SupportHubV41 from "./SupportHubV41"
import V41Header from "./V41Header"
import MasterRouteV45 from "../v45/MasterRouteV45"
import { type V41Route, navigateTo, routeFromLocation } from "./v41-router"
import "./v41.css"

export type { V41Route } from "./v41-router"

export default function AppV41() {
  const [route, setRoute] = useState<V41Route>(() => routeFromLocation())

  useEffect(() => {
    const sync = () => {
      const next = routeFromLocation()
      setRoute(next)
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }))
    }
    sync()
    window.addEventListener("popstate", sync)
    window.addEventListener("hashchange", sync)
    return () => {
      window.removeEventListener("popstate", sync)
      window.removeEventListener("hashchange", sync)
    }
  }, [])

  // Interceptor global para enlaces internos sin recarga de página
  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest("a")
    if (!anchor) return
    const href = anchor.getAttribute("href")
    if (!href) return

    // Solo interceptar enlaces internos que empiecen con / o #
    if (href.startsWith("/") && !href.startsWith("//")) {
      e.preventDefault()
      const cleanPath = href.replace(/^\/+/, "") || "inicio"
      navigateTo(cleanPath)
    } else if (href.startsWith("#")) {
      e.preventDefault()
      const cleanHash = href.replace(/^#\/?/, "") || "inicio"
      navigateTo(cleanHash)
    }
  }

  const legacy = useMemo(
    () => route === "inicio" || route === "ruta" || route === "recursos" || route === "certificaciones" || route === "noticias" || route === "perfil",
    [route],
  )

  return (
    <div className={`v41-shell v41-route-${route}`} onClick={handleLinkClick}>
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
