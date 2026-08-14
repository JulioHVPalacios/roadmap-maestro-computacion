import type {
  ResourceCategory,
  ResourceItem,
  ResourceLanguage,
  ResourceType,
} from "./resources-data"

type LiveSource = {
  id: string
  label: string
  url: string
  language: ResourceLanguage
  kind: "books" | "courses" | "casts"
  priority: number
}

const RAW = "https://raw.githubusercontent.com/EbookFoundation/free-programming-books/main"

export const LIVE_RESOURCE_SOURCES: LiveSource[] = [
  {
    id: "fpb-books-es",
    label: "Free Programming Books · Español",
    url: `${RAW}/books/free-programming-books-es.md`,
    language: "ES",
    kind: "books",
    priority: 1,
  },
  {
    id: "fpb-courses-es",
    label: "Free Courses · Español",
    url: `${RAW}/courses/free-courses-es.md`,
    language: "ES",
    kind: "courses",
    priority: 2,
  },
  {
    id: "fpb-casts-es",
    label: "Free Podcasts & Screencasts · Español",
    url: `${RAW}/casts/free-podcasts-screencasts-es.md`,
    language: "ES",
    kind: "casts",
    priority: 3,
  },
  {
    id: "librodev-es",
    label: "librosgratis.dev · midudev",
    url: "https://raw.githubusercontent.com/midudev/libros-programacion-gratis/main/README.md",
    language: "ES",
    kind: "books",
    priority: 4,
  },
  {
    id: "fpb-subjects-en",
    label: "Free Programming Books · Subjects",
    url: `${RAW}/books/free-programming-books-subjects.md`,
    language: "EN",
    kind: "books",
    priority: 20,
  },
  {
    id: "fpb-langs-en",
    label: "Free Programming Books · Languages",
    url: `${RAW}/books/free-programming-books-langs.md`,
    language: "EN",
    kind: "books",
    priority: 21,
  },
  {
    id: "fpb-courses-en",
    label: "Free Courses · English",
    url: `${RAW}/courses/free-courses-en.md`,
    language: "EN",
    kind: "courses",
    priority: 22,
  },
]

const ES_SOURCE_IDS = new Set(["fpb-books-es", "fpb-courses-es", "fpb-casts-es", "librodev-es"])

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/\s+/g, " ")
    .trim()
}

function slugify(value: string) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function cleanMarkdown(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
}

export function canonicalResourceUrl(input: string) {
  try {
    const url = new URL(input)
    url.hash = ""
    const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "source", "fbclid", "gclid"]
    trackingKeys.forEach((key) => url.searchParams.delete(key))
    url.hostname = url.hostname.replace(/^www\./, "").toLocaleLowerCase()
    const pathname = url.pathname.replace(/\/+$/, "") || "/"
    return `${url.hostname}${pathname}${url.search}`.toLocaleLowerCase()
  } catch {
    return normalize(input).replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")
  }
}

export function resourceFingerprint(resource: Pick<ResourceItem, "title" | "provider" | "url" | "downloadUrl">) {
  const primaryUrl = canonicalResourceUrl(resource.downloadUrl ?? resource.url)
  return `${primaryUrl}|${slugify(resource.title)}|${slugify(resource.provider)}`
}

function inferCategory(section: string, title: string, url: string): ResourceCategory {
  const haystack = normalize(`${section} ${title} ${url}`)
  if (/quantum|cuantic|blockchain|web3|criptomoned|distributed ledger/.test(haystack)) return "Cuántica y frontera"
  if (/cyber|seguridad|security|hacking|pentest|forense|cryptograph|criptograf/.test(haystack)) return "Ciberseguridad"
  if (/machine learning|deep learning|inteligencia artificial|artificial intelligence|data science|ciencia de datos|pandas|numpy|estadistic|statistics|nlp|vision/.test(haystack)) return "Datos e IA"
  if (/docker|kubernetes|devops|linux|unix|sistema operativo|operating system|cloud|bash|shell|sysadmin/.test(haystack)) return "Cloud, DevOps y sistemas"
  if (/redes|network|networking|tcp|ip|telecom|cisco|routing|switching/.test(haystack)) return "Redes y telecom"
  if (/robot|iot|arduino|hardware|electron|embedded|embebid|raspberry|fpga/.test(haystack)) return "Hardware, IoT y robótica"
  if (/matematic|math|calculo|calculus|algebra|probabil|investig|research|paper|academ/.test(haystack)) return "Matemáticas e investigación"
  if (/arquitectura|architecture|gestion|management|agile|scrum|xp|itil|togaf|project/.test(haystack)) return "Gestión y arquitectura"
  if (/html|css|javascript|typescript|react|angular|vue|node|django|flask|web|android|kotlin|mobile|movil/.test(haystack)) return "Web y móvil"
  if (/software|testing|test|patron|pattern|ddd|clean code|refactor|uml|ingenieria de software/.test(haystack)) return "Programación y software"
  if (/program|python|java|c\+\+|c#|rust|golang|\bgo\b|php|ruby|haskell|erlang|lisp|scala|perl|assembly|ensamblador|sql/.test(haystack)) return "Programación"
  if (/algorit|estructura de datos|data structure|computer science|computacion|informatic|fundament|logica|logic|automata|complejidad/.test(haystack)) return "Fundamentos"
  return "Bibliotecas y currículos"
}

function inferType(line: string, url: string, source: LiveSource): ResourceType {
  const haystack = normalize(`${line} ${url}`)
  if (/\.pdf($|[?#])/.test(url.toLocaleLowerCase()) || /\bpdf\b/.test(haystack)) return "Libro / PDF"
  if (/youtube\.com|youtu\.be|vimeo\.com/.test(url)) return "Video"
  if (/github\.com|gitlab\.com|codeberg\.org/.test(url)) return "Repositorio"
  if (source.kind === "courses") return "Curso"
  if (source.kind === "casts") return "Video"
  if (/docs\.|documentation|documentacion|manual/.test(haystack)) return "Documentación"
  return "Libro / PDF"
}

function extractProvider(line: string, source: LiveSource) {
  const afterLink = line.replace(/^\s*[-*+]\s*/, "").replace(/^.*?\]\([^)]*\)/, "")
  const raw = afterLink
    .replace(/^\s*[-—–:]\s*/, "")
    .replace(/\s*\((PDF|HTML|EPUB|GitHub|YouTube|Video|Curso|MOOC)[^)]*\).*$/i, "")
    .replace(/\s*\[\([^\]]+\)\].*$/, "")
    .trim()
  if (raw && raw.length <= 160 && !/^https?:/i.test(raw)) return cleanMarkdown(raw)
  if (source.id === "librodev-es") return "librosgratis.dev / midudev"
  return source.label
}

function parseMarkdownSource(markdown: string, source: LiveSource): ResourceItem[] {
  const resources: ResourceItem[] = []
  let section = source.kind === "courses" ? "Cursos" : source.kind === "casts" ? "Podcasts y screencasts" : "Biblioteca"

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim()
    const heading = line.match(/^#{2,5}\s+(.+)$/)
    if (heading) {
      section = cleanMarkdown(heading[1].replace(/<a[^>]*>.*?<\/a>/gi, "")) || section
      continue
    }

    if (!/^[-*+]\s+/.test(line)) continue
    const linkMatch = line.match(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/)
    if (!linkMatch) continue

    const title = cleanMarkdown(linkMatch[1])
    const url = linkMatch[2].replace(/&amp;/g, "&")
    if (!title || url.includes("#") && /^https?:\/\/[^/]+\/?#/.test(url)) continue
    if (/^(Index|Índice|Table of Contents)$/i.test(title)) continue

    const provider = extractProvider(line, source)
    const type = inferType(line, url, source)
    const category = inferCategory(section, title, url)
    const directPdf = /\.pdf($|[?#])/i.test(url)

    resources.push({
      id: `live-${source.id}-${slugify(title)}-${slugify(provider).slice(0, 32)}`,
      title,
      provider,
      description: `${source.label}: recurso real enlazado desde una colección pública y curada. Tema: ${section}.`,
      category,
      type,
      language: source.language,
      level: "Todos",
      license: "Acceso y licencia según la fuente original; catálogo enlazado desde una colección pública curada.",
      url,
      downloadUrl: directPdf ? url : undefined,
      tags: Array.from(new Set([section, source.label, source.language === "ES" ? "español" : "english", type])).slice(0, 6),
      verified: source.id.startsWith("fpb-") || source.id === "librodev-es",
      featured: source.language === "ES" && directPdf,
    })
  }

  return resources
}

async function fetchText(url: string, timeoutMs = 12000) {
  const controller = new AbortController()
  const timer = globalThis.setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.text()
  } finally {
    globalThis.clearTimeout(timer)
  }
}

async function loadSource(source: LiveSource) {
  try {
    const text = await fetchText(source.url)
    return parseMarkdownSource(text, source)
  } catch (error) {
    console.warn(`[Campus Maestro] No se pudo actualizar ${source.label}`, error)
    return []
  }
}

export function dedupeResources(input: ResourceItem[]) {
  const seenUrls = new Set<string>()
  const seenTitleProvider = new Set<string>()
  const output: ResourceItem[] = []

  for (const resource of input) {
    const urlKey = canonicalResourceUrl(resource.downloadUrl ?? resource.url)
    const titleProviderKey = `${slugify(resource.title)}|${slugify(resource.provider)}`
    if (seenUrls.has(urlKey) || seenTitleProvider.has(titleProviderKey)) continue
    seenUrls.add(urlKey)
    seenTitleProvider.add(titleProviderKey)
    output.push(resource)
  }
  return output
}

export async function loadLiveResources(base: ResourceItem[], target = 1000) {
  const sortedSources = [...LIVE_RESOURCE_SOURCES].sort((a, b) => a.priority - b.priority)
  let merged = dedupeResources(base)

  const spanishSources = sortedSources.filter((source) => ES_SOURCE_IDS.has(source.id))
  const spanishResults = await Promise.all(spanishSources.map(loadSource))
  merged = dedupeResources([...merged, ...spanishResults.flat()])

  if (merged.length < target) {
    for (const source of sortedSources.filter((item) => !ES_SOURCE_IDS.has(item.id))) {
      const additions = await loadSource(source)
      merged = dedupeResources([...merged, ...additions])
      if (merged.length >= target) break
    }
  }

  const languagePriority: Record<ResourceLanguage, number> = { ES: 0, "ES/EN": 1, EN: 2 }
  merged.sort((a, b) =>
    languagePriority[a.language] - languagePriority[b.language] ||
    Number(Boolean(b.downloadUrl)) - Number(Boolean(a.downloadUrl)) ||
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    a.title.localeCompare(b.title, "es")
  )

  return merged.slice(0, Math.max(target, base.length))
}
