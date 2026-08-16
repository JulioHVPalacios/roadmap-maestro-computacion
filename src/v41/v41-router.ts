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

export const allowedRoutes = new Set<V41Route>([
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

export function routeFromLocation(): V41Route {
  if (typeof window === "undefined") return "inicio"

  // 1. Compatibilidad retroactiva con URLs antiguas con hash (/#ingles, /#ruta, etc.)
  const hashRaw = window.location.hash.replace(/^#\/?/, "").trim().toLowerCase()
  if (hashRaw) {
    let target = hashRaw
    if (target === "campus" || target === "roadmap" || target === "maestrias" || target === "atlas") target = "ruta"
    const finalRoute: V41Route = allowedRoutes.has(target as V41Route) ? (target as V41Route) : "inicio"
    // Limpia la URL en el historial eliminando el '#' sin recargar la página
    const cleanUrl = finalRoute === "inicio" ? "/" : `/${finalRoute}`
    window.history.replaceState(null, "", cleanUrl)
    return finalRoute
  }

  // 2. Ruta limpia desde pathname (/ingles, /programacion, /ruta, etc.)
  const pathRaw = window.location.pathname.replace(/^\/+|\/+$/g, "").trim().toLowerCase()
  if (!pathRaw || pathRaw === "inicio") return "inicio"
  if (pathRaw === "campus" || pathRaw === "roadmap" || pathRaw === "maestrias" || pathRaw === "atlas") return "ruta"
  return allowedRoutes.has(pathRaw as V41Route) ? (pathRaw as V41Route) : "inicio"
}

export function navigateTo(target: V41Route | string) {
  if (typeof window === "undefined") return
  const clean = target.replace(/^#|\//g, "").trim().toLowerCase()
  let route: V41Route = "inicio"
  if (clean === "campus" || clean === "roadmap" || clean === "maestrias" || clean === "atlas") route = "ruta"
  else if (allowedRoutes.has(clean as V41Route)) route = clean as V41Route

  const targetUrl = route === "inicio" ? "/" : `/${route}`
  if (window.location.pathname !== targetUrl) {
    window.history.pushState(null, "", targetUrl)
  }
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }))
}
