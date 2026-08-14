import { useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Code2,
  ExternalLink,
  Filter,
  GraduationCap,
  Languages,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react"
import {
  certificationSeed,
  type CertificationCategory,
  type CertificationItem,
  type CertificationKind,
  type CertificationLanguage,
} from "../certifications-data"
import "./certifications-v1.css"

type CoverManifest = Record<string, { src: string; source?: string; sourceUrl?: string; generatedAt?: string }>

type CategoryMeta = { label: string; short: string; icon: LucideIcon }

const categories: CertificationCategory[] = [
  "Programación y web",
  "Datos e IA",
  "Ciberseguridad",
  "Cloud y DevOps",
  "Redes y TI",
  "Productividad digital",
  "Marketing y negocio",
  "Fundamentos y empleabilidad",
]

const categoryMeta: Record<CertificationCategory, CategoryMeta> = {
  "Programación y web": { label: "Programación & web", short: "DEV", icon: Code2 },
  "Datos e IA": { label: "Datos & IA", short: "AI", icon: BrainCircuit },
  Ciberseguridad: { label: "Ciberseguridad", short: "SEC", icon: ShieldCheck },
  "Cloud y DevOps": { label: "Cloud & DevOps", short: "CLD", icon: CloudCog },
  "Redes y TI": { label: "Redes & TI", short: "NET", icon: Network },
  "Productividad digital": { label: "Productividad", short: "PRO", icon: Sparkles },
  "Marketing y negocio": { label: "Marketing & negocio", short: "BIZ", icon: BriefcaseBusiness },
  "Fundamentos y empleabilidad": { label: "Fundamentos & empleo", short: "JOB", icon: GraduationCap },
}

const languages: CertificationLanguage[] = ["ES", "ES/EN", "EN"]
const kinds: CertificationKind[] = ["Certificación", "Credencial", "Insignia", "Curso con certificado", "Curso gratuito", "Ruta formativa"]

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")
}

function dedupe(items: CertificationItem[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = `${normalize(item.title)}|${normalize(item.provider)}|${item.url.replace(/[?#].*$/, "").replace(/\/$/, "")}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function CredentialPill({ item }: { item: CertificationItem }) {
  return (
    <span className={`cert-v1-credential ${item.credentialFree ? "is-free" : ""}`}>
      {item.credentialFree ? <BadgeCheck size={14} /> : <BookOpenCheck size={14} />}
      {item.credentialLabel}
    </span>
  )
}

export default function CertificationsHub() {
  const [items, setItems] = useState<CertificationItem[]>(certificationSeed)
  const [covers, setCovers] = useState<CoverManifest>({})
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CertificationCategory | "Todos">("Todos")
  const [language, setLanguage] = useState<CertificationLanguage | "Todos">("Todos")
  const [kind, setKind] = useState<CertificationKind | "Todos">("Todos")
  const [freeCredentialOnly, setFreeCredentialOnly] = useState(false)
  const [mobileFilters, setMobileFilters] = useState(false)
  const [visible, setVisible] = useState(24)

  useEffect(() => {
    let cancelled = false
    const base = import.meta.env.BASE_URL
    Promise.allSettled([
      fetch(`${base}certifications-v1/certifications.json?ts=${Date.now()}`, { cache: "no-store" }).then((response) => response.ok ? response.json() : Promise.reject()),
      fetch(`${base}certification-covers-v1/manifest.json?ts=${Date.now()}`, { cache: "no-store" }).then((response) => response.ok ? response.json() : Promise.reject()),
    ]).then(([catalogResult, coverResult]) => {
      if (cancelled) return
      if (catalogResult.status === "fulfilled" && catalogResult.value) {
        const payload = catalogResult.value as { items?: CertificationItem[] } | CertificationItem[]
        const catalogItems = Array.isArray(payload) ? payload : payload.items
        if (Array.isArray(catalogItems) && catalogItems.length) setItems(dedupe(catalogItems))
      }
      if (coverResult.status === "fulfilled" && coverResult.value && typeof coverResult.value === "object") {
        setCovers(coverResult.value as CoverManifest)
      }
    }).catch(() => undefined)
    return () => { cancelled = true }
  }, [])

  const counts = useMemo(() => {
    const result = new Map<CertificationCategory, number>()
    categories.forEach((name) => result.set(name, items.filter((item) => item.category === name).length))
    return result
  }, [items])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    const langPriority: Record<CertificationLanguage, number> = { ES: 0, "ES/EN": 1, EN: 2 }
    return items
      .filter((item) => item.status !== "inactive")
      .filter((item) => category === "Todos" || item.category === category)
      .filter((item) => language === "Todos" || item.language === language)
      .filter((item) => kind === "Todos" || item.kind === kind)
      .filter((item) => !freeCredentialOnly || item.credentialFree)
      .filter((item) => {
        if (!q) return true
        const haystack = normalize([item.title, item.provider, item.description, item.category, item.kind, item.language, item.credentialLabel, ...item.tags].join(" "))
        return haystack.includes(q)
      })
      .sort((a, b) =>
        Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
        Number(b.credentialFree) - Number(a.credentialFree) ||
        langPriority[a.language] - langPriority[b.language] ||
        a.title.localeCompare(b.title, "es")
      )
  }, [category, freeCredentialOnly, items, kind, language, query])

  const reset = () => {
    setQuery("")
    setCategory("Todos")
    setLanguage("Todos")
    setKind("Todos")
    setFreeCredentialOnly(false)
    setVisible(24)
  }

  const filters = (
    <>
      <div className="cert-v1-search">
        <Search size={18} />
        <input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(24) }} placeholder="Buscar certificación, curso, proveedor, IA, Python..." />
      </div>

      <div className="cert-v1-filter-group">
        <span>Categorías</span>
        <button className={category === "Todos" ? "active" : ""} onClick={() => { setCategory("Todos"); setVisible(24) }}><Award size={17} /><b>Todos</b><em>{items.filter((item) => item.status !== "inactive").length}</em></button>
        {categories.map((name) => {
          const meta = categoryMeta[name]
          const Icon = meta.icon
          return <button key={name} className={category === name ? "active" : ""} onClick={() => { setCategory(name); setVisible(24) }}><Icon size={17} /><b>{meta.label}</b><em>{counts.get(name) ?? 0}</em></button>
        })}
      </div>

      <details className="cert-v1-details" open>
        <summary>Tipo <ChevronDown size={15} /></summary>
        <div>{["Todos", ...kinds].map((name) => <button key={name} className={kind === name ? "active" : ""} onClick={() => { setKind(name as CertificationKind | "Todos"); setVisible(24) }}>{name}</button>)}</div>
      </details>

      <details className="cert-v1-details">
        <summary>Idioma <ChevronDown size={15} /></summary>
        <div>{["Todos", ...languages].map((name) => <button key={name} className={language === name ? "active" : ""} onClick={() => { setLanguage(name as CertificationLanguage | "Todos"); setVisible(24) }}>{name}</button>)}</div>
      </details>

      <button className={`cert-v1-free-only ${freeCredentialOnly ? "active" : ""}`} onClick={() => { setFreeCredentialOnly((value) => !value); setVisible(24) }}><BadgeCheck size={17} /> Solo credencial/certificado gratis</button>
      <button className="cert-v1-reset" onClick={reset}>Limpiar filtros</button>
    </>
  )

  const activeItems = items.filter((item) => item.status !== "inactive")
  const freeCredentials = activeItems.filter((item) => item.credentialFree).length
  const spanish = activeItems.filter((item) => item.language !== "EN").length
  const updatedAt = activeItems.map((item) => item.verifiedAt).filter(Boolean).sort().at(-1)

  return (
    <main className="cert-v1-page" id="certificaciones">
      <section className="cert-v1-hero">
        <div className="cert-v1-hero-copy">
          <span>CM / CREDENCIALES VIVAS</span>
          <h1>Certificaciones y cursos<br /><em>gratis, verificables y actuales.</em></h1>
          <p>Una selección que prioriza español, certificado o credencial gratuita y proveedores fiables. El catálogo se audita automáticamente: cuando una oferta deja de estar disponible se retira, los catálogos oficiales aportan novedades y los repositorios comunitarios solo sirven para descubrir candidatos que luego se revalidan contra la fuente oficial.</p>
          <div className="cert-v1-hero-badges"><span><BadgeCheck /> Gratis primero</span><span><Languages /> Español primero</span><span><CheckCircle2 /> Fuentes revalidadas</span></div>
        </div>
        <div className="cert-v1-stats">
          <article><b>{activeItems.length}</b><span>opciones activas</span></article>
          <article><b>{freeCredentials}</b><span>credenciales gratis</span></article>
          <article><b>{spanish}</b><span>en español / bilingüe</span></article>
          <article><b>{updatedAt ? new Date(updatedAt).toLocaleDateString("es-PE") : "AUTO"}</b><span>última auditoría</span></article>
        </div>
      </section>

      <section className="cert-v1-layout">
        <aside className="cert-v1-sidebar" data-lenis-prevent data-lenis-prevent-wheel>{filters}</aside>

        <div className="cert-v1-main">
          <div className="cert-v1-toolbar">
            <div>
              <span>CATÁLOGO PROFESIONAL · ACTUALIZACIÓN AUTOMÁTICA</span>
              <h2>Aprende y demuestra lo que sabes.</h2>
              <p>Mostrando <b>{filtered.length}</b> resultados. Diferenciamos claramente una certificación gratuita de un curso gratuito cuya certificación profesional pueda tener costo.</p>
            </div>
            <button className="cert-v1-mobile-filter" onClick={() => setMobileFilters(true)}><Filter size={17} /> Filtros</button>
          </div>

          <div className="cert-v1-active-filters">
            {category !== "Todos" && <button onClick={() => setCategory("Todos")}>{category}<X size={13} /></button>}
            {kind !== "Todos" && <button onClick={() => setKind("Todos")}>{kind}<X size={13} /></button>}
            {language !== "Todos" && <button onClick={() => setLanguage("Todos")}>{language}<X size={13} /></button>}
            {freeCredentialOnly && <button onClick={() => setFreeCredentialOnly(false)}>Credencial gratis<X size={13} /></button>}
          </div>

          <div className="cert-v1-grid">
            {filtered.slice(0, visible).map((item, index) => {
              const meta = categoryMeta[item.category]
              const Icon = meta.icon
              const cover = covers[item.id]?.src
              return (
                <motion.article key={item.id} className="cert-v1-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25, delay: Math.min(index, 12) * .012 }}>
                  <div className="cert-v1-cover">
                    {cover ? <img src={`${import.meta.env.BASE_URL}${cover.replace(/^\//, "")}`} alt={`Vista oficial de ${item.title}`} loading="lazy" /> : <div className="cert-v1-cover-fallback"><Icon size={64} /></div>}
                    <div className="cert-v1-cover-shade" />
                    <div className="cert-v1-cover-top"><span>{meta.short}</span>{item.featured && <Sparkles size={16} />}</div>
                    <div className="cert-v1-cover-bottom"><span>{item.kind}</span><span>{item.language}</span></div>
                  </div>

                  <div className="cert-v1-card-body">
                    <div className="cert-v1-provider"><span>{item.provider}</span>{item.status === "active" && <CheckCircle2 size={15} />}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <CredentialPill item={item} />
                    <div className="cert-v1-meta">
                      {item.duration && <span>{item.duration}</span>}
                      {item.level && <span>{item.level}</span>}
                      {item.expiresAt && <span>Disponible hasta {new Date(`${item.expiresAt}T12:00:00`).toLocaleDateString("es-PE")}</span>}
                    </div>
                    <div className="cert-v1-tags">{item.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}{item.sourceType === "community-verified" && <span>revalidado</span>}</div>
                    <a className="cert-v1-open" href={item.url} target="_blank" rel="noreferrer">Abrir fuente oficial <ExternalLink size={16} /></a>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {visible < filtered.length && <button className="cert-v1-load-more" onClick={() => setVisible((value) => value + 24)}>Mostrar 24 más <ChevronDown size={17} /></button>}

          <div className="cert-v1-note">
            <BadgeCheck />
            <div><b>No confundimos “curso gratis” con “certificación profesional gratis”.</b><p>Campus Maestro etiqueta cada opción según lo que la fuente oficial ofrece. Las certificaciones profesionales de proveedores como AWS, Cisco o Microsoft pueden tener examen de pago aunque su formación sea gratuita; cuando la credencial sí es gratuita, se indica explícitamente.</p></div>
          </div>
        </div>
      </section>

      {mobileFilters && <div className="cert-v1-mobile-backdrop" onClick={() => setMobileFilters(false)}><aside data-lenis-prevent data-lenis-prevent-wheel onClick={(event) => event.stopPropagation()}><div className="cert-v1-mobile-head"><b>Filtros</b><button onClick={() => setMobileFilters(false)}><X /></button></div>{filters}</aside></div>}
    </main>
  )
}
