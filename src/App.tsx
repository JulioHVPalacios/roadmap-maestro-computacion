import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Globe2,
  GraduationCap,
  Menu,
  MessageCircle,
  Network,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  X,
} from "lucide-react"
import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react"
import SolarKnowledgeHero from "./components/SolarKnowledgeHero"
import RadiantPromptInput from "./components/RadiantPromptInput"
import { rootSources, stages, type Stage, type Subject } from "./roadmap-data"
import { masteryTracks, type MasteryTrack } from "./mastery-data"
import { inferProfessionProfile, professionTitles } from "./profession-atlas"
import { initPremiumMotion } from "./premium-motion"
import "./v15.css"

const ResourcesHub = lazy(() => import("./resources-v27/ResourcesHub"))
const CertificationsHub = lazy(() => import("./certifications-v1/CertificationsHub"))

const totalSubjects = stages.reduce((sum, stage) => sum + stage.subjects.length, 0)
const totalTrackUnits = masteryTracks.reduce((sum, track) => sum + track.units.length, 0)
const PROFESSIONS_TOTAL = professionTitles.length

const universes = [
  { code: "01", title: "Ciencias de la Computación", text: "Matemática, algoritmos, teoría, lenguajes, arquitectura y sistemas.", icon: GraduationCap, tone: "lime", image: "https://images.unsplash.com/photo-1743834147172-37c12011b321?auto=format&fit=crop&w=1400&q=84", alt: "Clase universitaria de computación con estudiantes y docente" },
  { code: "02", title: "Software & Plataformas", text: "Web, móvil, APIs, arquitectura, QA, DevOps y sistemas empresariales.", icon: Code2, tone: "pink", image: "https://images.unsplash.com/photo-1778146476147-5f8d4bd03c79?auto=format&fit=crop&w=1400&q=84", alt: "Estación de trabajo de desarrollo de software con código" },
  { code: "03", title: "Datos & BI", text: "Bases de datos, análisis, ciencia, ingeniería, gobierno y decisión.", icon: Database, tone: "blue", image: "https://images.unsplash.com/photo-1770681381576-f1fdceb2ea01?auto=format&fit=crop&w=1400&q=84", alt: "Portátil mostrando paneles y visualizaciones de datos" },
  { code: "04", title: "IA & Sistemas Inteligentes", text: "ML, deep learning, modelos fundacionales, agentes, MLOps y evaluación.", icon: BrainCircuit, tone: "violet", image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&w=1400&q=84", alt: "Brazo robótico en laboratorio tecnológico" },
  { code: "05", title: "Ciberseguridad", text: "Defensa, AppSec, DFIR, criptografía y ofensiva exclusivamente ética y autorizada.", icon: ShieldCheck, tone: "orange", image: "https://images.unsplash.com/photo-1775519520461-6b6e068d9250?auto=format&fit=crop&w=1400&q=84", alt: "Infraestructura de servidores y cableado de un centro de datos" },
  { code: "06", title: "Redes & Telecom", text: "Internet, routing, wireless, 5G/6G, cloud networking y automatización.", icon: Network, tone: "cyan", image: "https://images.unsplash.com/photo-1774803202421-764eda5deb50?auto=format&fit=crop&w=1400&q=84", alt: "Torre real de telecomunicaciones con múltiples antenas" },
  { code: "07", title: "Hardware & Bajo Nivel", text: "Arquitectura, SO, firmware, embebidos, FPGA/ASIC, GPU y HPC.", icon: Cpu, tone: "sand", image: "https://images.unsplash.com/photo-1610812387871-806d3db9f5aa?auto=format&fit=crop&w=1400&q=84", alt: "Placa de hardware Raspberry Pi y componentes electrónicos" },
  { code: "08", title: "Frontera Computacional", text: "Cuántica, robótica, bioinformática, XR, gráficos y tecnologías emergentes.", icon: Sparkles, tone: "green", image: "https://images.unsplash.com/photo-1766297247924-6638d54e7c89?auto=format&fit=crop&w=1400&q=84", alt: "Investigadoras trabajando con computadoras en un laboratorio científico" },
]

const standards = [
  { name: "CS2023", body: "17 áreas de conocimiento para Ciencias de la Computación.", url: "https://csed.acm.org/" },
  { name: "CC2020", body: "Mapa global de disciplinas de Computing y competencias.", url: "https://www.acm.org/education/curricula-recommendations" },
  { name: "CSEC2017", body: "Marco interdisciplinario para ciberseguridad.", url: "https://cybered.hosting.acm.org/wp/" },
  { name: "DS2021", body: "Competencias de computación para Data Science.", url: "https://dstf.acm.org/" },
  { name: "OpenFING", body: "Clases universitarias abiertas en español de Udelar.", url: "https://open.fing.edu.uy/courses/" },
  { name: "FAMAF + UNLP", body: "Contraste universitario rioplatense de teoría y práctica.", url: "https://famaf.unc.edu.ar/academica/grado/licenciatura-en-ciencias-de-la-computaci%C3%B3n/" },
]

const method = [
  {
    code: "01",
    title: "Comprender",
    text: "Teoría, matemática, historia y fundamentos antes de perseguir herramientas.",
    focus: "Entender por qué funciona, no memorizar recetas.",
    actions: [
      "Estudia teoría, conceptos, matemática y contexto histórico.",
      "Relaciona cada idea con sistemas reales y con conocimientos previos.",
      "Explica el tema con tus propias palabras antes de avanzar.",
    ],
    evidence: "Apuntes propios, mapa conceptual, problemas explicados y una prueba breve de comprensión.",
  },
  {
    code: "02",
    title: "Practicar",
    text: "Problemas, laboratorios reproducibles y trabajo técnico real.",
    focus: "Convertir conocimiento en habilidad repetible.",
    actions: [
      "Resuelve ejercicios de dificultad creciente sin copiar soluciones.",
      "Reproduce laboratorios y documenta errores, decisiones y resultados.",
      "Practica hasta poder repetir el procedimiento sin guía paso a paso.",
    ],
    evidence: "Ejercicios resueltos, laboratorio reproducible, comandos/código y bitácora técnica.",
  },
  {
    code: "03",
    title: "Construir",
    text: "Productos, sistemas, investigaciones y proyectos integradores.",
    focus: "Usar varias competencias para crear algo que funcione.",
    actions: [
      "Diseña un proyecto con requisitos, arquitectura y criterios de calidad.",
      "Integra herramientas y conocimientos de varias materias.",
      "Publica una versión funcional y documenta las decisiones técnicas.",
    ],
    evidence: "Proyecto funcional, repositorio, documentación, pruebas y decisiones de diseño justificadas.",
  },
  {
    code: "04",
    title: "Demostrar",
    text: "Exámenes, evidencia, defensa y criterios explícitos de dominio.",
    focus: "Probar dominio sin depender de una guía.",
    actions: [
      "Rinde una evaluación o resuelve un reto nuevo bajo restricciones.",
      "Defiende tus decisiones y explica alternativas y límites.",
      "Revisa la evidencia con una rúbrica antes de marcar dominio.",
    ],
    evidence: "Examen, reto independiente, defensa técnica, rúbrica y evidencia verificable.",
  },
  {
    code: "05",
    title: "Actualizar",
    text: "Auditoría continua de estándares, investigación y frontera tecnológica.",
    focus: "Mantener vigente lo aprendido sin perseguir cada moda.",
    actions: [
      "Revisa estándares, documentación oficial, papers y cambios relevantes.",
      "Compara lo nuevo con los fundamentos que ya dominas.",
      "Actualiza proyectos y apuntes solo cuando el cambio sea material.",
    ],
    evidence: "Registro de actualización, fuentes oficiales, cambios aplicados y notas sobre impacto.",
  },
]

const fallbackNews = [
  {
    title: "Noticias tecnológicas en español, actualizadas automáticamente",
    source: "Campus Maestro",
    url: "/noticias",
    category: "Actualización",
    published: "Cada 12 horas",
    excerpt: "Al publicarse en GitHub Pages, esta sección se renueva automáticamente cada 12 horas (inicio del día y medio día) con fuentes tecnológicas seleccionadas.",
    image: "",
  },
]

type RadarItem = {
  title: string
  source: string
  url: string
  category: string
  published?: string
  excerpt?: string
  image?: string
}
type SearchEntry = { kind: string; label: string; meta: string; action: () => void }

function readProgress() {
  try {
    const raw = localStorage.getItem("campus-maestro-v15-progress")
    return new Set<string>(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set<string>()
  }
}


/* V15.7 TYPEWRITER COMPONENT START */
function TypewriterWord({
  word,
  typeMs = 105,
  deleteMs = 62,
  holdMs = 1750,
}: {
  word: string
  typeMs?: number
  deleteMs?: number
  holdMs?: number
}) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  const [text, setText] = useState(reduceMotion ? word : "")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setText(word)
      return
    }

    let delay = deleting ? deleteMs : typeMs

    if (!deleting && text === word) delay = holdMs
    if (deleting && text === "") delay = 460

    const timer = window.setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
        return
      }
      if (deleting && text === "") {
        setDeleting(false)
        return
      }

      setText((current) =>
        deleting
          ? word.slice(0, Math.max(0, current.length - 1))
          : word.slice(0, Math.min(word.length, current.length + 1)),
      )
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleteMs, deleting, holdMs, reduceMotion, text, typeMs, word])

  return (
    <span className="v15-typeword" aria-label={word}>
      <span aria-hidden="true">{text}</span>
      {!reduceMotion && <i aria-hidden="true" />}
    </span>
  )
}
/* V15.7 TYPEWRITER COMPONENT END */

function NewsCarouselCard({
  title,
  items,
  tone,
  featured = false,
}: {
  title: string
  items: RadarItem[]
  tone: string
  featured?: boolean
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef = useRef<HTMLElement | null>(null)
  const safeItems = items.length ? items : fallbackNews
  const current = safeItems[index % safeItems.length]

  useEffect(() => {
    const card = cardRef.current
    if (!card || typeof IntersectionObserver === "undefined") { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { rootMargin: "180px 0px", threshold: 0.01 })
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || document.hidden || safeItems.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % safeItems.length)
    }, 6200)
    return () => window.clearInterval(timer)
  }, [paused, safeItems.length, visible])

  useEffect(() => {
    setIndex(0)
  }, [safeItems.length, title])

  const move = (direction: number) => {
    setIndex((value) => {
      const next = (value + direction) % safeItems.length
      return next < 0 ? next + safeItems.length : next
    })
  }

  return (
    <article
      ref={cardRef}
      className={`v15-news-carousel ${featured ? "featured" : ""} tone-${tone}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="v15-news-carousel-head">
        <div><span>{title}</span><small>{safeItems.length} noticias</small></div>
        <div className="v15-news-carousel-arrows">
          <button type="button" onClick={() => move(-1)} aria-label="Noticia anterior">‹</button>
          <button type="button" onClick={() => move(1)} aria-label="Noticia siguiente">›</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.a
          key={`${current.url}-${index}`}
          href={current.url}
          target={current.url.startsWith("http") ? "_blank" : undefined}
          rel={current.url.startsWith("http") ? "noreferrer" : undefined}
          className="v15-news-slide"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: .32 }}
        >
          <div className={`v15-news-media ${current.image ? "has-image" : "no-image"}`}>
            {current.image && (
              <img
                className="v15-news-slide-image"
                src={current.image}
                alt={`Portada de ${current.title}`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(event) => {
                  const media = event.currentTarget.closest(".v15-news-media")
                  media?.classList.add("image-error")
                }}
              />
            )}
            <div className="v15-news-media-fallback" aria-hidden="true">
              <Newspaper size={30} strokeWidth={1.7} />
              <div>
                <span>{current.source}</span>
                <small>{current.category} · imagen no disponible</small>
              </div>
            </div>
          </div>
          <div className="v15-news-slide-meta">
            <span>{current.category}</span>
            <small>{current.source}</small>
          </div>
          <h3>{current.title}</h3>
          {current.excerpt && <p>{current.excerpt}</p>}
          <footer>
            <small>{current.published || "Reciente"}</small>
            <ArrowUpRight />
          </footer>
        </motion.a>
      </AnimatePresence>

      <div className="v15-news-dots" aria-label="Selector de noticias">
        {safeItems.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            className={dotIndex === index % safeItems.length ? "active" : ""}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Ir a noticia ${dotIndex + 1}`}
          />
        ))}
      </div>
    </article>
  )
}

function LazyProfileVideo() {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || typeof IntersectionObserver === "undefined") { setActive(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setActive(true); observer.disconnect() }
    }, { rootMargin: "1600px 0px", threshold: 0.01 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!video || !active) return
    video.muted = true
    video.defaultMuted = true
    video.playbackRate = 1
    void video.play().catch(() => undefined)
  }, [active])

  return (
    <video ref={ref} className="v15-profile-video" autoPlay={active} muted loop playsInline preload={active ? "auto" : "none"} aria-hidden="true">
      {active && <source src={`${import.meta.env.BASE_URL}media/profile-tech.mp4`} type="video/mp4" />}
    </video>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<MasteryTrack>(masteryTracks[0])
  const [professionQuery, setProfessionQuery] = useState("")
  const [selectedProfession, setSelectedProfession] = useState<string>(professionTitles[0] ?? "Ingeniería Informática")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [completed, setCompleted] = useState<Set<string>>(readProgress)
  const [radar, setRadar] = useState<RadarItem[]>(fallbackNews)
  const [activeMethod, setActiveMethod] = useState(0)
  const isPathResources = () => typeof window !== "undefined" && (window.location.pathname.replace(/^\/+|\/+$/g, "") === "recursos" || window.location.hash === "#recursos")
  const isPathCertifications = () => typeof window !== "undefined" && (window.location.pathname.replace(/^\/+|\/+$/g, "") === "certificaciones" || window.location.hash === "#certificaciones")

  const [resourceView, setResourceView] = useState(isPathResources)
  const [certificationView, setCertificationView] = useState(isPathCertifications)

  useEffect(() => initPremiumMotion(), [])

  useEffect(() => {
    const syncRoute = () => {
      const isResources = typeof window !== "undefined" && (window.location.pathname.replace(/^\/+|\/+$/g, "") === "recursos" || window.location.hash === "#recursos")
      const isCertifications = typeof window !== "undefined" && (window.location.pathname.replace(/^\/+|\/+$/g, "") === "certificaciones" || window.location.hash === "#certificaciones")
      setResourceView(isResources)
      setCertificationView(isCertifications)
      setMenuOpen(false)
      if (isResources || isCertifications) {
        window.scrollTo({ top: 0, behavior: "auto" })
      } else {
        const targetId = window.location.hash.slice(1) || window.location.pathname.replace(/^\/+|\/+$/g, "")
        if (targetId && targetId !== "inicio") {
          requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "auto" })))
        }
      }
    }
    syncRoute()
    window.addEventListener("popstate", syncRoute)
    window.addEventListener("hashchange", syncRoute)
    return () => {
      window.removeEventListener("popstate", syncRoute)
      window.removeEventListener("hashchange", syncRoute)
    }
  }, [])

  const newsLanes = useMemo(() => {
    // Primero limpiamos duplicados del feed completo. No basta con deduplicar
    // dentro de cada card: una misma noticia podía volver a entrar en otra.
    const normalizeUrl = (url = "") => url.trim().replace(/[?#].*$/, "").replace(/\/+$/, "").toLocaleLowerCase("es")
    const normalizeTitle = (title = "") => title.trim().replace(/\s+/g, " ").toLocaleLowerCase("es")
    const sourceUrls = new Set<string>()
    const sourceTitles = new Set<string>()
    const pool = radar.filter((item) => {
      const urlKey = normalizeUrl(item.url)
      const titleKey = normalizeTitle(item.title)
      if ((urlKey && sourceUrls.has(urlKey)) || (titleKey && sourceTitles.has(titleKey))) return false
      if (urlKey) sourceUrls.add(urlKey)
      if (titleKey) sourceTitles.add(titleKey)
      return true
    })

    // Estos sets son compartidos por TODAS las cards. En cuanto una noticia
    // se asigna a un carrusel, queda bloqueada para los demás.
    const usedUrls = new Set<string>()
    const usedTitles = new Set<string>()
    const isUsed = (item: RadarItem) => {
      const urlKey = normalizeUrl(item.url)
      const titleKey = normalizeTitle(item.title)
      return (urlKey && usedUrls.has(urlKey)) || (titleKey && usedTitles.has(titleKey))
    }
    const markUsed = (item: RadarItem) => {
      const urlKey = normalizeUrl(item.url)
      const titleKey = normalizeTitle(item.title)
      if (urlKey) usedUrls.add(urlKey)
      if (titleKey) usedTitles.add(titleKey)
    }

    const choose = (categories: string[], offset: number, limit: number) => {
      if (!pool.length || limit <= 0) return []
      const rotated = [...pool.slice(offset % pool.length), ...pool.slice(0, offset % pool.length)]
      const preferred = rotated.filter((item) => categories.includes(item.category) && !isUsed(item))
      const remainder = rotated.filter((item) => !categories.includes(item.category) && !isUsed(item))
      const selected = [...preferred, ...remainder].slice(0, limit)
      selected.forEach(markUsed)
      return selected
    }

    const lanes = [
      { title: "IA & Software", tone: "lime", categories: ["IA", "Software", "Computación"], offset: 0 },
      { title: "Ciberseguridad & Redes", tone: "blue", categories: ["Ciberseguridad", "Redes"], offset: 10 },
      { title: "Hardware & Sistemas", tone: "pink", categories: ["Hardware", "Tecnología"], offset: 20 },
      { title: "Datos & Frontera", tone: "sand", categories: ["Datos", "Computación", "Tecnología"], offset: 30 },
    ]
    const totalSlots = Math.min(pool.length, lanes.length * 10)
    const baseSize = Math.floor(totalSlots / lanes.length)
    const extra = totalSlots % lanes.length

    return lanes.map((lane, laneIndex) => ({
      title: lane.title,
      tone: lane.tone,
      items: choose(lane.categories, lane.offset, baseSize + (laneIndex < extra ? 1 : 0)),
    }))
  }, [radar])

  useEffect(() => {
    localStorage.setItem("campus-maestro-v15-progress", JSON.stringify(Array.from(completed)))
  }, [completed])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        if (resourceView) {
          document.querySelector<HTMLInputElement>(".v27-resource-search input")?.focus()
        } else if (certificationView) {
          document.querySelector<HTMLInputElement>(".cert-v1-search input")?.focus()
        } else {
          setSearchOpen(true)
        }
      }
      if (event.key === "Escape") {
        setSearchOpen(false)
        setSelectedStage(null)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [certificationView, resourceView])

  useEffect(() => {
    let cancelled = false

    const loadNews = () => {
      const newsUrl = `${import.meta.env.BASE_URL}news.json?ts=${Date.now()}`
      fetch(newsUrl, { cache: "no-store" })
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((data: RadarItem[]) => {
          if (!cancelled && Array.isArray(data) && data.length) setRadar(data.slice(0, 80))
        })
        .catch(() => undefined)
    }

    loadNews()
    // Si el usuario deja el Campus abierto, no necesita F5: comprobamos el
    // JSON publicado periódicamente y también al volver a la pestaña.
    const timer = window.setInterval(loadNews, 15 * 60 * 1000)
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") loadNews()
    }
    document.addEventListener("visibilitychange", refreshWhenVisible)

    return () => {
      cancelled = true
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", refreshWhenVisible)
    }
  }, [])

  const progress = totalSubjects ? Math.round((completed.size / totalSubjects) * 100) : 0

  const professionMatches = useMemo(() => {
    const q = professionQuery.trim().toLocaleLowerCase("es")
    if (!q) return professionTitles.slice(0, 10)
    return professionTitles.filter((title) => title.toLocaleLowerCase("es").includes(q)).slice(0, 16)
  }, [professionQuery])

  const professionProfile = useMemo(() => inferProfessionProfile(selectedProfession), [selectedProfession])

  const globalResults = useMemo<SearchEntry[]>(() => {
    const q = searchQuery.trim().toLocaleLowerCase("es")
    if (!q) return []
    const entries: SearchEntry[] = []
    for (const stage of stages) {
      if (`${stage.code} ${stage.title} ${stage.outcome}`.toLocaleLowerCase("es").includes(q)) {
        entries.push({ kind: "Etapa", label: `${stage.code} · ${stage.title}`, meta: stage.duration, action: () => { setSelectedStage(stage); setSearchOpen(false) } })
      }
      for (const subject of stage.subjects) {
        if (`${subject.name} ${subject.study}`.toLocaleLowerCase("es").includes(q)) {
          entries.push({ kind: "Materia", label: subject.name, meta: `${stage.code} · ${stage.title}`, action: () => { setSelectedStage(stage); setSearchOpen(false) } })
        }
      }
    }
    for (const track of masteryTracks) {
      if (`${track.code} ${track.title} ${track.family} ${track.goal}`.toLocaleLowerCase("es").includes(q)) {
        entries.push({ kind: "Maestría", label: track.title, meta: `${track.code} · ${track.duration}`, action: () => { setSelectedTrack(track); setSearchOpen(false); document.querySelector("#maestrias")?.scrollIntoView({ behavior: "smooth" }) } })
      }
    }
    for (const title of professionTitles) {
      if (title.toLocaleLowerCase("es").includes(q)) {
        entries.push({ kind: "Profesión", label: title, meta: inferProfessionProfile(title).family, action: () => { setSelectedProfession(title); setProfessionQuery(title); setSearchOpen(false); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }) } })
        if (entries.length >= 24) break
      }
    }
    return entries.slice(0, 24)
  }, [searchQuery])

  const toggleSubject = (stage: Stage, subject: Subject) => {
    const id = `${stage.code}::${subject.name}`
    setCompleted((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="v15-site" id="inicio">
      <header className="v15-nav-shell">
        <div className="v15-nav">
          <a className="v15-brand" href="/"><span>CM</span><b>Campus Maestro</b></a>
          <nav>
            <a href="/campus">Campus</a><a href="/roadmap">Roadmap</a><a href="/maestrias">Maestrías</a><a href="/atlas">Atlas</a><a href="/recursos">Recursos</a><a href="/certificaciones">Certificaciones</a><a href="/noticias">Noticias</a><a href="/perfil">Perfil</a>
          </nav>
          <div className="v15-nav-actions">
            <button onClick={() => resourceView ? document.querySelector<HTMLInputElement>(".v27-resource-search input")?.focus() : certificationView ? document.querySelector<HTMLInputElement>(".cert-v1-search input")?.focus() : setSearchOpen(true)}><Search size={17} /> Buscar <kbd>Ctrl K</kbd></button>
            <a className="v15-black-button" href={(resourceView || certificationView) ? "/" : "/roadmap"}>{(resourceView || certificationView) ? "Volver al campus" : "Entrar al campus"} <ArrowRight size={17} /></a>
          </div>
          <button className="v15-menu" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="v15-mobile-menu"><a href="/campus" onClick={() => setMenuOpen(false)}>Campus</a><a href="/roadmap" onClick={() => setMenuOpen(false)}>Roadmap</a><a href="/maestrias" onClick={() => setMenuOpen(false)}>Maestrías</a><a href="/atlas" onClick={() => setMenuOpen(false)}>Atlas</a><a href="/recursos" onClick={() => setMenuOpen(false)}>Recursos</a><a href="/certificaciones" onClick={() => setMenuOpen(false)}>Certificaciones</a><a href="/noticias" onClick={() => setMenuOpen(false)}>Noticias</a><a href="/perfil" onClick={() => setMenuOpen(false)}>Perfil</a></div>}
        <div className="v15-progress" aria-label={`Progreso ${progress}%`}><i style={{ width: `${progress}%` }} /></div>
      </header>

      {resourceView ? <Suspense fallback={<div className="v15-page-loader">Cargando recursos…</div>}><ResourcesHub /></Suspense> : certificationView ? <Suspense fallback={<div className="v15-page-loader">Cargando certificaciones…</div>}><CertificationsHub /></Suspense> : (
      <main>
        <section className="v15-hero">
          <div className="v15-sky" />
          <div className="v15-hill v15-hill-a" /><div className="v15-hill v15-hill-b" />
          <div className="v15-hero-grid">
            <div className="v15-hero-copy">
              <p className="v15-kicker">UNIVERSIDAD ABIERTA · COMPUTACIÓN INTEGRAL · S/0</p>
              <h1>Construye <TypewriterWord word="conocimiento" /><br /><em>para dominar computación.</em></h1>
              <p>Una arquitectura autodidacta en español que conecta fundamentos universitarios, práctica profesional, investigación y especialización en una sola ruta.</p>
              <div className="v15-hero-actions"><a href="/roadmap" className="v15-white-button">Ver el roadmap <ArrowRight size={17} /></a><a href="/campus" className="v15-lime-button">Explorar campus</a></div>
              <div className="v15-hero-badges"><span><GraduationCap />Fundamentos</span><span><Code2 />Software</span><span><BrainCircuit />IA</span><span><ShieldCheck />Seguridad</span></div>
            </div>
            <div className="v15-hero-solar">
              <div className="v15-hero-solar-head"><span>MAPA VIVO / 3D · V15</span><b>Computación conectada</b></div>
              <SolarKnowledgeHero />
            </div>
          </div>
          <div className="v15-proof-card">
            <p>BASE ACADÉMICA V15</p>
            <div className="v15-proof-grid"><div><b>{stages.length}</b><span>etapas</span></div><div><b>{totalSubjects}</b><span>materias</span></div><div><b>{masteryTracks.length}</b><span>maestrías</span></div><div><b>{totalTrackUnits}</b><span>unidades</span></div><div><b>{rootSources.length}</b><span>ecosistemas</span></div><div><b>{PROFESSIONS_TOTAL.toLocaleString("es-PE")}</b><span>profesiones</span></div></div>
            <div className="v15-proof-logos">{standards.map((item) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer">{item.name}</a>)}</div>
          </div>
        </section>

        <section className="v15-section v15-intro" id="campus">
          <div className="v15-center-head"><span>EL MÉTODO MAESTRO</span><h2>No acumules cursos.<br />Construye dominio.</h2><p>Comprende → Practica → Construye → Demuestra → Actualiza. La unidad de avance no es un video visto: es una competencia demostrada con evidencia.</p></div>
          <div className="v15-method-grid">
            {method.map((item, index) => (
              <motion.button
                key={item.code}
                type="button"
                className={`v15-method-card ${activeMethod === index ? "active" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .04 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveMethod(index)}
                aria-pressed={activeMethod === index}
              >
                <span>{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <strong>Ver método <ArrowRight size={15} /></strong>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              key={method[activeMethod].code}
              className="v15-method-detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: .28 }}
            >
              <div className="v15-method-detail-head">
                <div><span>FASE {method[activeMethod].code}</span><h3>{method[activeMethod].title}</h3></div>
                <p>{method[activeMethod].focus}</p>
              </div>
              <div className="v15-method-detail-grid">
                <div>
                  <small>QUÉ HACES</small>
                  <ul>{method[activeMethod].actions.map((action) => <li key={action}><CheckCircle2 size={16} />{action}</li>)}</ul>
                </div>
                <div className="v15-method-evidence">
                  <small>EVIDENCIA DE DOMINIO</small>
                  <p>{method[activeMethod].evidence}</p>
                  <div><b>Regla del Campus</b><span>No marques una materia como dominada solo por haber visto contenido. Produce evidencia, supera el gate y conserva el resultado.</span></div>
                  <a href="/roadmap">Aplicar este método al roadmap <ArrowRight size={16} /></a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </section>

        <section className="v15-prompt-section">
          <div className="v15-center-head compact">
            <span>EXPLORADOR MAESTRO</span>
            <h2>¿Qué quieres dominar hoy?</h2>
            <p>Escribe una materia, etapa, carrera o habla por micrófono para explorar todo el Campus.</p>
          </div>
          <div className="v15-prompt-container">
            <RadiantPromptInput
              placeholder="Ej.: sistemas operativos, inteligencia artificial, algoritmos, ciberseguridad..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              onSubmit={(val) => {
                if (val.trim()) {
                  setSearchOpen(true)
                }
              }}
              onMicResult={(transcription) => {
                setSearchQuery(transcription)
                setSearchOpen(true)
              }}
              onAttachClick={() => {
                setSearchOpen(true)
              }}
            />
          </div>
        </section>

        <section className="v15-section v15-universes">
          <div className="v15-section-head"><div><span>08 UNIVERSOS CONECTADOS</span><h2>Una base.<br />Muchos mundos.</h2></div><p>Las disciplinas se cruzan. El roadmap evita estudiar cada carrera como una isla y utiliza un tronco común antes de abrir especializaciones.</p></div>
          <div className="v15-universe-grid">{universes.map((item) => { const Icon = item.icon; return <article key={item.code} className={`v15-universe-card tone-${item.tone}`}><div className="v15-universe-copy"><small>{item.code}</small><Icon /><h3>{item.title}</h3><p>{item.text}</p></div><img src={item.image} alt={item.alt} loading="lazy" decoding="async" fetchPriority="low" /></article> })}</div>
        </section>

        <section className="v15-section" id="roadmap">
          <div className="v15-section-head"><div><span>ROADMAP DEFINITIVO</span><h2>De cero a frontera.</h2></div><p>{totalSubjects} materias integradas en orden, con fuentes, práctica, evidencia, gate y proyecto. Haz clic en una etapa para abrir su aula.</p></div>
          <div className="v15-stage-grid">{stages.map((stage, index) => <button key={stage.code} className="v15-stage-card" onClick={() => setSelectedStage(stage)}><div className="v15-stage-top"><b>{stage.code}</b><span>{stage.year}</span></div><h3>{stage.title}</h3><p>{stage.outcome}</p><div className="v15-stage-foot"><span>{stage.subjects.length} materias</span><span>{stage.duration}</span><ArrowRight /></div><i style={{ width: `${Math.min(100, (index + 1) * 5)}%` }} /></button>)}</div>
        </section>



        <section className="v15-section v15-masteries" id="maestrias">
          <div className="v15-section-head"><div><span>RUTAS DE MAESTRÍA</span><h2>Profundiza sin perder la base.</h2></div><p>Después del tronco, combina especializaciones avanzadas según la profesión o investigación que persigas.</p></div>
          <div className="v15-track-tabs">{masteryTracks.map((track) => <button key={track.code} className={selectedTrack.code === track.code ? "active" : ""} onClick={() => setSelectedTrack(track)}><span>{track.code}</span>{track.title}</button>)}</div>
          <div className="v15-track-detail"><div><span>{selectedTrack.family} · {selectedTrack.duration}</span><h3>{selectedTrack.title}</h3><p>{selectedTrack.goal}</p><div className="v15-gate"><CheckCircle2 />{selectedTrack.gate}</div></div><div className="v15-track-units">{selectedTrack.units.map((unit, index) => <article key={unit.name}><b>{String(index + 1).padStart(2,"0")}</b><div><h4>{unit.name}</h4><p>{unit.focus}</p><small>Evidencia: {unit.evidence}</small><div>{unit.sources.slice(0,2).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ExternalLink size={13} /></a>)}</div></div></article>)}</div></div>
        </section>

        <section className="v15-section v15-standards">
          <div className="v15-center-head compact"><span>AUDITORÍA MUNDIAL</span><h2>No depende de una sola universidad.</h2><p>El currículo se contrasta contra estándares profesionales y mallas universitarias abiertas.</p></div>
          <div className="v15-standard-grid">{standards.map((item) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer"><b>{item.name}</b><p>{item.body}</p><ArrowUpRight /></a>)}</div>
          <div className="v15-source-cloud">{rootSources.slice(0, 14).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><BookOpen size={15} /><span>{source.name}</span></a>)}</div>
        </section>

        <section className="v15-section v15-atlas" id="atlas">
          <div className="v15-section-head"><div><span>ATLAS PROFESIONAL</span><h2>{PROFESSIONS_TOTAL.toLocaleString("es-PE")} denominaciones.<br />Una arquitectura.</h2></div><p>Busca carreras, profesiones, puestos históricos, actuales y emergentes; el Atlas las conecta con familias y rutas de estudio.</p></div>
          <div className="v15-atlas-grid"><div className="v15-atlas-search"><label><Search /><input value={professionQuery} onChange={(event) => setProfessionQuery(event.target.value)} placeholder="Buscar profesión o carrera..." /></label><div>{professionMatches.map((title) => <button key={title} className={selectedProfession === title ? "active" : ""} onClick={() => setSelectedProfession(title)}>{title}<Chevron /></button>)}</div></div><div className="v15-profile-map"><span>PERFIL INFERIDO</span><h3>{selectedProfession}</h3><dl><div><dt>Familia</dt><dd>{professionProfile.family}</dd></div><div><dt>Ruta</dt><dd>{professionProfile.route}</dd></div><div><dt>Maestría</dt><dd>{professionProfile.track}</dd></div><div><dt>Etapas</dt><dd>{professionProfile.stages}</dd></div></dl><p>{professionProfile.focus}</p></div></div>
        </section>

        <section className="v15-news-section" id="noticias">
          <div className="v15-section v15-news-inner">
            <div className="v15-section-head">
              <div>
                <span>NOTICIAS · ACTUALIZACIÓN CADA 12 HORAS</span>
                <h2>Computación e informática,<br />al día y en español.</h2>
              </div>
              <p>Noticias recientes sobre software, sistemas, inteligencia artificial, ciberseguridad, datos, redes, hardware, programación y tecnologías emergentes. Cada tarjeta abre la fuente original.</p>
            </div>

            <div className="v15-news-status">
              <span>Fuentes seleccionadas</span>
              <b>Xataka · Genbeta · RedesZone · MuyComputer · ADSLZone · SoftZone · Hipertextual</b>
              <small>Actualización automática cada 12 horas (inicio del día y medio día) mediante GitHub Actions · la página abierta se sincroniza sola.</small>
            </div>

            <div className="v15-news-carousel-grid">
              {newsLanes.map((lane, index) => (
                <NewsCarouselCard
                  key={lane.title}
                  title={lane.title}
                  items={lane.items}
                  tone={lane.tone}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="v15-section v15-ecosystem">
          <div className="v15-center-head compact"><span>MÁS QUE UNA UNIVERSIDAD</span><h2>Tu ecosistema profesional.</h2><p>La arquitectura queda preparada para crecer sin convertir la portada en una colección desordenada.</p></div>
          <div className="v15-ecosystem-grid"><article><IconBrandGithub /><h3>Proyectos & open source</h3><p>ERP, sistemas, herramientas, aplicaciones, videojuegos e investigación.</p></article><article><Newspaper /><h3>Noticias & publicaciones</h3><p>Radar tecnológico, artículos propios y bitácora técnica.</p></article><article><Users /><h3>Comunidad & foro</h3><p>Grupos de estudio, debates, revisiones y colaboración.</p></article><article><TerminalSquare /><h3>Laboratorio</h3><p>Demos, benchmarks, experimentos reproducibles y documentación.</p></article></div>
        </section>

        <section className="v15-profile-section" id="perfil">
          <div className="v15-profile-landscape">
            <LazyProfileVideo />
            <div className="v15-profile-video-overlay" aria-hidden="true" />

            <div className="v15-profile-copy">
              <span>PERFIL PROFESIONAL</span>
              <h2>Julio Humberto<br />Vera Palacios</h2>
              <p>Licenciado en Administración de Empresas · Tec. Informática Empresarial</p>
              <div className="v15-socials">
                <a href="https://instagram.com/humbertopalaciosv" target="_blank" rel="noreferrer"><IconBrandInstagram />@humbertopalaciosv</a>
                <a href="https://www.facebook.com/JulioHVPalacios/" target="_blank" rel="noreferrer"><IconBrandFacebook />Facebook</a>
                <a href="https://wa.me/51900375447" target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a>
                <a href="https://github.com/JulioHVPalacios" target="_blank" rel="noreferrer"><IconBrandGithub />GitHub</a>
              </div>
            </div>

            <div className="v15-profile-card">
              <Globe2 />
              <b>Campus Maestro</b>
              <p>Universidad abierta + plataforma profesional pública + portafolio vivo.</p>
              <a href="/roadmap">Explorar el campus <ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>
      )}

      <footer className="v15-footer"><div><a className="v15-brand" href="/"><span>CM</span><b>Campus Maestro</b></a><p>Computación integral · español primero · costo obligatorio S/0</p><p className="v27-music-credit">Track: Spirit of Fire · Music by <a href="https://www.fiftysounds.com" target="_blank" rel="noreferrer">FiftySounds</a></p></div><div><a href="/roadmap">Roadmap</a><a href="/maestrias">Maestrías</a><a href="/atlas">Atlas</a><a href="/recursos">Recursos</a><a href="/certificaciones">Certificaciones</a><a href="/noticias">Noticias</a><a href="/perfil">Perfil</a></div><small>V15 · aprendizaje abierto, verificable y actualizable.</small></footer>

      <AnimatePresence>
        {selectedStage && <motion.div className="v15-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStage(null)}><motion.div className="v15-stage-modal" initial={{ opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} onClick={(event) => event.stopPropagation()}><button className="v15-modal-close" onClick={() => setSelectedStage(null)}><X /></button><div className="v15-modal-head"><span>{selectedStage.code} · {selectedStage.year}</span><h2>{selectedStage.title}</h2><p>{selectedStage.outcome}</p><div><b>{selectedStage.duration}</b><b>Prerequisito: {selectedStage.prerequisites}</b></div></div><div className="v15-subject-list">{selectedStage.subjects.map((subject, index) => { const id = `${selectedStage.code}::${subject.name}`; const done = completed.has(id); return <article key={subject.name}><button className={done ? "v15-check done" : "v15-check"} onClick={() => toggleSubject(selectedStage, subject)}>{done ? <CheckCircle2 /> : <span>{String(index + 1).padStart(2,"0")}</span>}</button><div><h3>{subject.name}</h3><p>{subject.study}</p><small><b>Evidencia:</b> {subject.evidence}</small><div className="v15-subject-method" aria-label="Método Maestro aplicado a esta materia">{method.map((phase) => <span key={phase.code}><b>{phase.code}</b>{phase.title}</span>)}</div><div className="v15-subject-sources">{subject.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}<span>{source.where}</span><ExternalLink size={14} /></a>)}</div></div></article> })}</div><div className="v15-modal-gate"><span>GATE</span><p>{selectedStage.gate}</p><span>PROYECTO</span><p>{selectedStage.capstone}</p></div></motion.div></motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="v15-search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              className="v15-search-panel"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="v15-search-radiant-header">
                <RadiantPromptInput
                  autoFocus
                  placeholder="Buscar en todo Campus Maestro..."
                  value={searchQuery}
                  onChange={(val) => setSearchQuery(val)}
                  onSubmit={() => {
                    if (globalResults.length > 0) {
                      globalResults[0].action()
                    }
                  }}
                  onMicResult={(transcription) => {
                    setSearchQuery(transcription)
                  }}
                />
                <button
                  type="button"
                  className="v15-search-close-button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Cerrar buscador"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="v15-search-results">
                {searchQuery && globalResults.length === 0 && (
                  <p>Sin coincidencias para &ldquo;{searchQuery}&rdquo;.</p>
                )}
                {globalResults.map((result, index) => (
                  <button key={`${result.kind}-${result.label}-${index}`} onClick={result.action}>
                    <span>{result.kind}</span>
                    <div>
                      <b>{result.label}</b>
                      <small>{result.meta}</small>
                    </div>
                    <ArrowRight />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Chevron() { return <ArrowRight size={15} /> }


