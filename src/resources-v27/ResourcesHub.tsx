import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Atom,
  BookOpen,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  Image as ImageIcon,
  Library,
  LoaderCircle,
  Network,
  Play,
  Search,
  ShieldCheck,
  Sigma,
  Star,
  X,
  type LucideIcon,
} from "lucide-react"
import {
  resourceCategories,
  resourceTypes,
  resources,
  type ResourceCategory,
  type ResourceItem,
  type ResourceLanguage,
  type ResourceLevel,
  type ResourceType,
} from "../resources-data"
import { loadLiveResources } from "../resources-live"
import { createGeneratedResourceCover, resolveResourceCover } from "../resource-cover-resolver"
import "./resources-v27.css"

type CategoryMeta = { label: string; icon: LucideIcon; short: string }

type CoverResult = Awaited<ReturnType<typeof resolveResourceCover>>

const categoryMeta: Record<ResourceCategory, CategoryMeta> = {
  "Bibliotecas y currículos": { label: "Bibliotecas", icon: Library, short: "BIB" },
  Programación: { label: "Programación", icon: Code2, short: "CODE" },
  Fundamentos: { label: "Fundamentos", icon: GraduationCap, short: "CS" },
  "Programación y software": { label: "Software", icon: Code2, short: "DEV" },
  "Web y móvil": { label: "Web & móvil", icon: Boxes, short: "WEB" },
  "Datos e IA": { label: "Datos & IA", icon: BrainCircuit, short: "AI" },
  Ciberseguridad: { label: "Seguridad", icon: ShieldCheck, short: "SEC" },
  "Redes y telecom": { label: "Redes & telecom", icon: Network, short: "NET" },
  "Cloud, DevOps y sistemas": { label: "Cloud & sistemas", icon: CloudCog, short: "OPS" },
  "Hardware, IoT y robótica": { label: "Hardware & robótica", icon: Cpu, short: "HW" },
  "Matemáticas e investigación": { label: "Matemáticas & I+D", icon: Sigma, short: "R&D" },
  "Cuántica y frontera": { label: "Frontera", icon: Atom, short: "Q+" },
  "Gestión y arquitectura": { label: "Gestión & arquitectura", icon: BookOpen, short: "ARC" },
}

const languages: ResourceLanguage[] = ["ES", "ES/EN", "EN"]
const levels: ResourceLevel[] = ["Inicial", "Intermedio", "Avanzado", "Todos"]

const categoryAliases: Partial<Record<ResourceCategory, string[]>> = {
  "Bibliotecas y currículos": ["biblioteca", "curriculum", "currículo", "books", "bookshelf", "catálogo", "catalogo"],
  Fundamentos: ["fundamentos", "basics", "bases", "computer science", "cs", "algoritmos", "lógica", "logic"],
  Programación: ["programacion", "programación", "programming", "coding", "code", "lenguaje", "language"],
  "Programación y software": ["software", "engineering", "ingeniería de software", "patterns", "testing", "arquitectura de software"],
  "Web y móvil": ["web", "frontend", "backend", "mobile", "móvil", "movil", "react", "android"],
  "Datos e IA": ["data", "datos", "ia", "ai", "machine learning", "ml", "deep learning", "ciencia de datos"],
  Ciberseguridad: ["security", "seguridad", "cybersecurity", "pentesting", "hacking", "forense"],
  "Redes y telecom": ["networks", "redes", "networking", "telecom", "ccna", "tcp", "ip"],
  "Cloud, DevOps y sistemas": ["cloud", "devops", "linux", "sistemas", "docker", "kubernetes", "sysadmin"],
  "Hardware, IoT y robótica": ["hardware", "iot", "robótica", "robotica", "embebidos", "arduino"],
  "Matemáticas e investigación": ["matemáticas", "matematicas", "statistics", "estadística", "research", "investigación"],
  "Cuántica y frontera": ["quantum", "cuántica", "cuantica", "blockchain", "frontera"],
  "Gestión y arquitectura": ["management", "gestión", "gestion", "architecture", "arquitectura", "itil", "togaf", "scrum"],
}

const typeAliases: Partial<Record<ResourceType, string[]>> = {
  "Libro / PDF": ["book", "libro", "pdf", "ebook", "texto"],
  Apuntes: ["notes", "apuntes", "resumen"],
  Curso: ["course", "curso", "lessons", "clases"],
  Video: ["video", "youtube", "screencast", "podcast"],
  Documentación: ["docs", "documentation", "documentacion", "documentación", "manual"],
  Repositorio: ["github", "gitlab", "repo", "repository"],
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
}

function ResourceCover({ resource }: { resource: ResourceItem }) {
  const meta = categoryMeta[resource.category]
  const generatedFallback = useMemo(() => createGeneratedResourceCover(resource), [resource])
  const [cover, setCover] = useState<CoverResult | undefined>(undefined)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    setFailed(false)
    setCover(undefined)
    resolveResourceCover(resource).then((result) => {
      if (active) setCover(result ?? generatedFallback)
    }).catch(() => {
      if (active) setCover(generatedFallback)
    })
    return () => {
      active = false
    }
  }, [resource, generatedFallback])

  const activeCover = failed ? generatedFallback : cover

  return (
    <div className="v32-resource-cover">
      {activeCover?.src ? (
        <>
          <img
            className="v32-resource-cover-backdrop"
            src={activeCover.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <img
            className="v32-resource-cover-image"
            src={activeCover.src}
            alt={`Imagen de ${resource.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => {
              if (!failed && activeCover.kind !== "generated") setFailed(true)
            }}
          />
        </>
      ) : (
        <div className={`v32-resource-cover-placeholder ${cover === undefined ? "is-loading" : ""}`}>
          {cover === undefined ? <LoaderCircle className="v32-cover-loader" /> : <ImageIcon />}
        </div>
      )}
      <div className="v32-resource-cover-shade" />
      <div className="v32-resource-cover-top">
        <span>{meta.short}</span>
        {resource.featured && <Star size={16} fill="currentColor" />}
      </div>
      {activeCover?.attribution && <small className="v32-resource-cover-credit">{activeCover.attribution}</small>}
    </div>
  )
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return <span className="v27-meta-pill">{children}</span>
}

function PreviewModal({ resource, onClose }: { resource: ResourceItem; onClose: () => void }) {
  const isPdf = Boolean(resource.downloadUrl?.toLocaleLowerCase().includes(".pdf") || resource.type === "Libro / PDF")
  return (
    <motion.div
      className="v27-resource-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className="v27-resource-modal"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.99 }}
        transition={{ duration: 0.22, ease: [0.2, 0.75, 0.2, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="v27-resource-modal-close" type="button" onClick={onClose} aria-label="Cerrar vista previa"><X /></button>
        <div className="v27-resource-modal-info">
          <div className="v27-resource-modal-kicker"><span>{categoryMeta[resource.category].short}</span>{resource.category}</div>
          <h2>{resource.title}</h2>
          <p>{resource.description}</p>
          <div className="v27-resource-modal-meta">
            <MetaPill>{resource.type}</MetaPill>
            <MetaPill>{resource.language}</MetaPill>
            <MetaPill>{resource.level}</MetaPill>
            {resource.verified && <MetaPill><CheckCircle2 size={13} /> Fuente curada</MetaPill>}
          </div>
          <dl>
            <div><dt>Autor / fuente</dt><dd>{resource.provider}</dd></div>
            <div><dt>Acceso / licencia</dt><dd>{resource.license}</dd></div>
          </dl>
          <div className="v27-resource-modal-tags">{resource.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="v27-resource-modal-actions">
            <a href={resource.url} target="_blank" rel="noreferrer" className="primary">Abrir fuente <ExternalLink size={16} /></a>
            {resource.downloadUrl && <a href={resource.downloadUrl} target="_blank" rel="noreferrer">Descargar / abrir PDF <Download size={16} /></a>}
          </div>
          <small>Campus Maestro conserva el enlace original. La descarga solo se ofrece cuando el catálogo identifica una URL directa de archivo.</small>
        </div>
        <div className="v27-resource-preview">
          {resource.embedUrl ? (
            <iframe src={resource.embedUrl} title={`Vista previa de ${resource.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ) : resource.downloadUrl && isPdf ? (
            <iframe src={resource.downloadUrl} title={`PDF ${resource.title}`} />
          ) : (
            <div className="v27-resource-preview-empty">
              <ResourceCover resource={resource} />
              <div><FileText /><b>Vista desde la fuente</b><span>Cuando el sitio no permite incrustar el contenido, utiliza “Abrir fuente”.</span></div>
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  )
}

export default function ResourcesHub() {
  const [catalog, setCatalog] = useState<ResourceItem[]>(resources)
  const [syncing, setSyncing] = useState(true)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<ResourceCategory | "Todos">("Todos")
  const [type, setType] = useState<ResourceType | "Todos">("Todos")
  const [language, setLanguage] = useState<ResourceLanguage | "Todos">("Todos")
  const [level, setLevel] = useState<ResourceLevel | "Todos">("Todos")
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [visible, setVisible] = useState(24)
  const [selected, setSelected] = useState<ResourceItem | null>(null)
  const [mobileFilters, setMobileFilters] = useState(false)

  useEffect(() => {
    let active = true
    loadLiveResources(resources, 1000)
      .then((nextCatalog) => {
        if (active) setCatalog(nextCatalog)
      })
      .finally(() => {
        if (active) setSyncing(false)
      })
    return () => {
      active = false
    }
  }, [])

  const counts = useMemo(() => {
    const map = new Map<ResourceCategory, number>()
    resourceCategories.forEach((item) => map.set(item, catalog.filter((resource) => resource.category === item).length))
    return map
  }, [catalog])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    const languagePriority: Record<ResourceLanguage, number> = { ES: 0, "ES/EN": 1, EN: 2 }
    const typePriority: Partial<Record<ResourceType, number>> = {
      "Libro / PDF": 0,
      Apuntes: 1,
      Paper: 2,
      Estándar: 3,
      Roadmap: 4,
      Documentación: 5,
      Curso: 6,
      Video: 7,
      Práctica: 8,
      Repositorio: 9,
      Dataset: 10,
      Simulador: 11,
    }

    return catalog.filter((resource) => {
      if (category !== "Todos" && resource.category !== category) return false
      if (type !== "Todos" && resource.type !== type) return false
      if (language !== "Todos" && resource.language !== language) return false
      if (level !== "Todos" && resource.level !== level) return false
      if (featuredOnly && !resource.featured) return false
      if (!q) return true

      const haystack = normalize([
        resource.title,
        resource.provider,
        resource.description,
        resource.category,
        ...(categoryAliases[resource.category] ?? []),
        resource.type,
        ...(typeAliases[resource.type] ?? []),
        resource.language,
        resource.level,
        resource.url,
        resource.downloadUrl ?? "",
        resource.tags.join(" "),
      ].join(" "))

      const tokens = q.split(/\s+/).filter(Boolean)
      return tokens.every((token) => haystack.includes(token))
    }).sort((a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      languagePriority[a.language] - languagePriority[b.language] ||
      Number(Boolean(b.downloadUrl)) - Number(Boolean(a.downloadUrl)) ||
      (typePriority[a.type] ?? 99) - (typePriority[b.type] ?? 99) ||
      a.title.localeCompare(b.title, "es")
    )
  }, [catalog, category, featuredOnly, language, level, query, type])

  const resetFilters = () => {
    setQuery("")
    setCategory("Todos")
    setType("Todos")
    setLanguage("Todos")
    setLevel("Todos")
    setFeaturedOnly(false)
    setVisible(24)
  }

  const applyCategory = (next: ResourceCategory | "Todos") => {
    setCategory(next)
    setVisible(24)
  }

  const filters = (
    <>
      <div className="v27-resource-search">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => { setQuery(event.target.value); setVisible(24) }}
          placeholder="Nombre, autor, tema, libro, PDF, curso..."
        />
      </div>

      <div className="v27-filter-group">
        <span>Categorías</span>
        <button className={category === "Todos" ? "active" : ""} onClick={() => applyCategory("Todos")}>
          <Library size={17} /><b>Todos</b><em>{catalog.length}</em>
        </button>
        {resourceCategories.map((item) => {
          const meta = categoryMeta[item]
          const Icon = meta.icon
          return (
            <button key={item} className={category === item ? "active" : ""} onClick={() => applyCategory(item)}>
              <Icon size={17} /><b>{meta.label}</b><em>{counts.get(item)}</em>
            </button>
          )
        })}
      </div>

      <details className="v27-filter-details" open>
        <summary>Formato <ChevronDown size={15} /></summary>
        <div>{["Todos", ...resourceTypes].map((item) => <button key={item} className={type === item ? "active" : ""} onClick={() => { setType(item as ResourceType | "Todos"); setVisible(24) }}>{item}</button>)}</div>
      </details>
      <details className="v27-filter-details">
        <summary>Idioma <ChevronDown size={15} /></summary>
        <div>{["Todos", ...languages].map((item) => <button key={item} className={language === item ? "active" : ""} onClick={() => { setLanguage(item as ResourceLanguage | "Todos"); setVisible(24) }}>{item}</button>)}</div>
      </details>
      <details className="v27-filter-details">
        <summary>Nivel <ChevronDown size={15} /></summary>
        <div>{["Todos", ...levels].map((item) => <button key={item} className={level === item ? "active" : ""} onClick={() => { setLevel(item as ResourceLevel | "Todos"); setVisible(24) }}>{item}</button>)}</div>
      </details>
      <button className={`v27-featured-filter ${featuredOnly ? "active" : ""}`} onClick={() => { setFeaturedOnly((value) => !value); setVisible(24) }}><Star size={16} fill={featuredOnly ? "currentColor" : "none"} /> Solo destacados</button>
      <button className="v27-reset-filter" onClick={resetFilters}>Limpiar filtros</button>
    </>
  )

  return (
    <main className="v27-resources-page" id="recursos">
      <section className="v27-resources-hero">
        <div>
          <span>CM / BIBLIOTECA ABIERTA</span>
          <h1>Recursos para<br /><em>dominar computación.</em></h1>
          <p>Catálogo sincronizado desde colecciones reales: español primero, deduplicación estricta y búsqueda por título, autor, proveedor, categoría y palabras clave. Las imágenes priorizan portada real del libro, miniatura real del video o una fotografía/ilustración temática abierta cuando la fuente no aporta portada.</p>
        </div>
        <div className="v27-resources-hero-stats">
          <article><b>{catalog.length}</b><span>{syncing ? "actualizando fuentes…" : "recursos únicos"}</span></article>
          <article><b>{resourceCategories.length}</b><span>áreas maestras</span></article>
          <article><b>{catalog.filter((item) => item.downloadUrl).length}</b><span>descargas / PDF directos</span></article>
          <article><b>{catalog.filter((item) => item.language !== "EN").length}</b><span>recursos ES o ES/EN</span></article>
        </div>
      </section>

      <section className="v27-resources-layout">
        <aside className="v27-resources-sidebar" data-lenis-prevent data-lenis-prevent-wheel>{filters}</aside>

        <div className="v27-resources-main">
          <div className="v27-resources-toolbar">
            <div>
              <span>{syncing ? "Sincronizando colecciones curadas…" : "Catálogo sincronizado · español primero"}</span>
              <h2>Explora recursos reales y trazables</h2>
              <p>Mostrando <b>{filtered.length}</b> resultados. Puedes buscar “Carlos Pes”, “algoritmos”, “Python”, “machine learning”, “PDF”, “Docker”, “bases de datos” o combinaciones de varias palabras.</p>
            </div>
            <button className="v27-mobile-filter-button" onClick={() => setMobileFilters(true)}><Filter size={17} /> Filtros</button>
          </div>

          <div className="v27-active-filters" aria-label="Filtros activos">
            {category !== "Todos" && <button onClick={() => setCategory("Todos")}>{category}<X size={13} /></button>}
            {type !== "Todos" && <button onClick={() => setType("Todos")}>{type}<X size={13} /></button>}
            {language !== "Todos" && <button onClick={() => setLanguage("Todos")}>{language}<X size={13} /></button>}
            {level !== "Todos" && <button onClick={() => setLevel("Todos")}>{level}<X size={13} /></button>}
            {featuredOnly && <button onClick={() => setFeaturedOnly(false)}>Destacados<X size={13} /></button>}
          </div>

          {filtered.length === 0 ? (
            <div className="v27-resource-empty"><Search /><h3>No encontramos coincidencias.</h3><p>Prueba otra palabra o limpia los filtros.</p><button onClick={resetFilters}>Ver todos los recursos</button></div>
          ) : (
            <div className="v27-resource-grid">
              {filtered.slice(0, visible).map((resource) => (
                <motion.article
                  layout="position"
                  key={resource.id}
                  className="v27-resource-card v32-resource-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.26 }}
                >
                  <ResourceCover resource={resource} />
                  <div className="v27-resource-card-body">
                    <div className="v27-resource-card-source"><span>{resource.provider}</span>{resource.verified && <CheckCircle2 size={15} />}</div>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <div className="v27-resource-tags">{resource.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="v27-resource-card-actions">
                      <button type="button" onClick={() => setSelected(resource)}>{resource.embedUrl ? <Play size={16} /> : <FileText size={16} />} Vista previa</button>
                      {resource.downloadUrl ? (
                        <a href={resource.downloadUrl} target="_blank" rel="noreferrer" aria-label={`Descargar ${resource.title}`}><Download size={16} /></a>
                      ) : (
                        <a href={resource.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${resource.title}`}><ExternalLink size={16} /></a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {visible < filtered.length && <button className="v27-load-more" onClick={() => setVisible((value) => value + 24)}>Mostrar 24 recursos más <ChevronDown size={17} /></button>}

          <div className="v27-resource-legal">
            <ShieldCheck />
            <div><b>Catálogo trazable y con fuentes vivas</b><p>La V32 dejó de fabricar combinaciones artificiales para alcanzar una cifra. Ahora conserva recursos reales y sincroniza listas públicas mantenidas. Si una portada bibliográfica no existe, busca una imagen temática abierta; no utiliza el preview genérico de GitHub como portada del recurso.</p></div>
          </div>
        </div>
      </section>

      <AnimatePresence>{selected && <PreviewModal resource={selected} onClose={() => setSelected(null)} />}</AnimatePresence>

      <AnimatePresence>
        {mobileFilters && (
          <motion.div className="v27-mobile-filters-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFilters(false)}>
            <motion.aside data-lenis-prevent data-lenis-prevent-wheel initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }} onClick={(event) => event.stopPropagation()}>
              <div className="v27-mobile-filters-head"><b>Filtros</b><button onClick={() => setMobileFilters(false)}><X /></button></div>
              {filters}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
