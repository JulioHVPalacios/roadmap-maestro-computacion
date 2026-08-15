import { useEffect, useRef, useState } from "react"
import { ArrowRight, BookOpen, Code2, GraduationCap, Headphones, Menu, Search, X } from "lucide-react"
import type { V41Route } from "./AppV41"

const nav: Array<{ route: V41Route; label: string }> = [
  { route: "inicio", label: "Inicio" },
  { route: "ruta", label: "Ruta Maestra" },
  { route: "programacion", label: "Programación" },
  { route: "ingles", label: "Inglés IT" },
  { route: "recursos", label: "Recursos" },
  { route: "certificaciones", label: "Certificaciones" },
  { route: "noticias", label: "Noticias" },
  { route: "perfil", label: "Perfil" },
  { route: "soporte", label: "Soporte" },
]

export default function V41Header({ route }: { route: V41Route }) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => setOpen(false), [route])

  useEffect(() => {
    const onScroll = () => headerRef.current?.classList.toggle("is-scrolled", window.scrollY > 18)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goSearch = () => {
    if (route === "recursos") {
      document.querySelector<HTMLInputElement>(".v27-resource-search input")?.focus()
      return
    }
    if (route === "certificaciones") {
      document.querySelector<HTMLInputElement>(".cert-v1-search input")?.focus()
      return
    }
    window.location.hash = "#ruta"
    window.setTimeout(() => document.querySelector<HTMLButtonElement>(".v15-prompt-box")?.click(), 90)
  }

  return (
    <header ref={headerRef} className="v41-header">
      <div className="v41-header-inner">
        <a className="v41-brand" href="#inicio" aria-label="Campus Maestro, Inicio">
          <span>CM</span>
          <b>Campus Maestro</b>
        </a>

        <nav className="v41-desktop-nav" aria-label="Navegación principal">
          {nav.map((item) => (
            <a key={item.route} className={route === item.route ? "active" : ""} href={`#${item.route}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="v41-header-actions">
          <button type="button" className="v41-search-button" onClick={goSearch}>
            <Search size={16} />
            <span>Buscar</span>
          </button>
          <a className="v41-enter-button" href="#ruta">
            Entrar al campus <ArrowRight size={16} />
          </a>
        </div>

        <button type="button" className="v41-menu-button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="v41-mobile-menu">
          <div className="v41-mobile-featured">
            <a href="#ruta"><GraduationCap /> Ruta Maestra</a>
            <a href="#programacion"><Code2 /> Programación</a>
            <a href="#ingles"><Headphones /> Inglés IT</a>
            <a href="#recursos"><BookOpen /> Recursos</a>
          </div>
          <div className="v41-mobile-links">
            {nav.filter((item) => !["ruta", "programacion", "ingles", "recursos"].includes(item.route)).map((item) => (
              <a key={item.route} href={`#${item.route}`}>{item.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
