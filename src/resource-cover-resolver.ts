import type { ResourceCategory, ResourceItem } from "./resources-data"

type ResolvedCover = {
  src: string
  kind: "explicit" | "book" | "google-book" | "video" | "direct" | "generated"
  attribution?: string
}

const memoryCache = new Map<string, ResolvedCover | null>()
const inflight = new Map<string, Promise<ResolvedCover | null>>()
const CACHE_PREFIX = "cm-v36-cover:"
const MAX_ACTIVE = 5
let active = 0
const queue: Array<() => void> = []


type LocalCoverManifestEntry = {
  src: string
  source?: string
  sourceUrl?: string
  generatedAt?: string
}

type LocalCoverManifest = Record<string, LocalCoverManifestEntry>

let localManifestPromise: Promise<LocalCoverManifest> | null = null

function loadLocalCoverManifest() {
  if (!localManifestPromise) {
    localManifestPromise = fetch(`${import.meta.env.BASE_URL}resource-covers-v36/manifest.json`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : {}))
      .then((value) => (value && typeof value === "object" ? value as LocalCoverManifest : {}))
      .catch(() => ({}))
  }
  return localManifestPromise
}

type Palette = {
  background: [string, string]
  orb: string
  accent: string
  secondary: string
  line: string
  icon: string
}

const palettes: Record<ResourceCategory, Palette> = {
  "Bibliotecas y currículos": { background: ["#0b1820", "#102b36"], orb: "#80ffd6", accent: "#7ec8ff", secondary: "#e6f4ef", line: "rgba(255,255,255,.10)", icon: "#f4fbf8" },
  Programación: { background: ["#081533", "#0a2348"], orb: "#9cff6a", accent: "#61d7ff", secondary: "#dff7ff", line: "rgba(255,255,255,.10)", icon: "#f6fffd" },
  Fundamentos: { background: ["#211126", "#3a2047"], orb: "#c3a1ff", accent: "#77c8ff", secondary: "#f7f1ff", line: "rgba(255,255,255,.10)", icon: "#fffaff" },
  "Programación y software": { background: ["#0d1822", "#113240"], orb: "#94f5a0", accent: "#65cbff", secondary: "#e7fff5", line: "rgba(255,255,255,.10)", icon: "#f6fffd" },
  "Web y móvil": { background: ["#0d2220", "#11403b"], orb: "#7cf3d7", accent: "#9fe8ff", secondary: "#effffc", line: "rgba(255,255,255,.10)", icon: "#f6fffd" },
  "Datos e IA": { background: ["#15122d", "#271d57"], orb: "#bf93ff", accent: "#7fffd8", secondary: "#f4efff", line: "rgba(255,255,255,.10)", icon: "#ffffff" },
  Ciberseguridad: { background: ["#1d130d", "#40241a"], orb: "#ffb37a", accent: "#ffe28e", secondary: "#fff6ec", line: "rgba(255,255,255,.10)", icon: "#fffdf8" },
  "Redes y telecom": { background: ["#0a1d25", "#12384c"], orb: "#7ce7ff", accent: "#7fb8ff", secondary: "#ebfbff", line: "rgba(255,255,255,.10)", icon: "#f6fffe" },
  "Cloud, DevOps y sistemas": { background: ["#0e1f18", "#1b4337"], orb: "#a5ff9d", accent: "#88e0ff", secondary: "#effff4", line: "rgba(255,255,255,.10)", icon: "#f8fffb" },
  "Hardware, IoT y robótica": { background: ["#24170e", "#4b2c18"], orb: "#ffc96c", accent: "#ffd9ab", secondary: "#fff7ed", line: "rgba(255,255,255,.10)", icon: "#fffcf7" },
  "Matemáticas e investigación": { background: ["#0f1632", "#1d3066"], orb: "#74a7ff", accent: "#90dbff", secondary: "#eef4ff", line: "rgba(255,255,255,.10)", icon: "#f8fbff" },
  "Cuántica y frontera": { background: ["#231131", "#3f1d59"], orb: "#e792ff", accent: "#8dcbff", secondary: "#fbf0ff", line: "rgba(255,255,255,.10)", icon: "#fff7ff" },
  "Gestión y arquitectura": { background: ["#182112", "#354322"], orb: "#d8ff70", accent: "#d9ffd0", secondary: "#f8ffef", line: "rgba(255,255,255,.10)", icon: "#fcfff7" },
}

const stopwords = new Set([
  "de", "del", "la", "las", "el", "los", "and", "for", "with", "para", "con", "por", "en", "un", "una", "the", "to", "y", "a", "o", "of", "ebook", "book", "books", "libro", "libros", "pdf", "curso", "cursos", "guide", "guia", "manual", "notes", "apuntes",
])

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function keyFor(resource: ResourceItem) {
  return normalize(`${resource.id}|${resource.title}|${resource.provider}|${resource.url}`).slice(0, 220)
}

function hashString(value: string) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash >>> 0)
}

function readStorage(key: string) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return undefined
    return JSON.parse(raw) as ResolvedCover | null
  } catch {
    return undefined
  }
}

function writeStorage(key: string, value: ResolvedCover | null) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value))
  } catch {
    // El catálogo sigue funcionando aunque el navegador bloquee almacenamiento.
  }
}

function schedule<T>(task: () => Promise<T>) {
  return new Promise<T>((resolve, reject) => {
    const run = () => {
      active += 1
      task().then(resolve, reject).finally(() => {
        active -= 1
        queue.shift()?.()
      })
    }
    if (active < MAX_ACTIVE) run()
    else queue.push(run)
  })
}

async function fetchJson(url: string, timeoutMs = 8500) {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json() as unknown
  } finally {
    window.clearTimeout(timer)
  }
}

function directImage(resource: ResourceItem) {
  const candidates = [resource.coverImage, resource.url, resource.downloadUrl]
  return candidates.find((value) => value && /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(value))
}

function youtubeThumbnail(url: string) {
  const match = url.match(/[?&]v=([^&#]+)/i) ?? url.match(/youtu\.be\/([^?&#/]+)/i)
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null
}

function normalizedTokens(value: string) {
  return normalize(value)
    .split(" ")
    .filter((word) => word.length > 2 && !stopwords.has(word))
}

function tokenSimilarity(a: string, b: string) {
  const setA = new Set(normalizedTokens(a))
  const setB = new Set(normalizedTokens(b))
  if (!setA.size || !setB.size) return 0
  let common = 0
  setA.forEach((token) => {
    if (setB.has(token)) common += 1
  })
  return common / Math.max(setA.size, setB.size)
}

function containsStrongHint(text: string, patterns: RegExp[]) {
  return patterns.some((rx) => rx.test(text))
}

function isCollectionResource(resource: ResourceItem) {
  const haystack = normalize([resource.title, resource.provider, resource.description, ...resource.tags].join(" "))
  if (resource.category === "Bibliotecas y currículos") return true
  return containsStrongHint(haystack, [
    /biblioteca/, /library/, /curricul/, /roadmap/, /coleccion/, /collection/, /indice/, /index/, /catalog/, /awesome/, /resources?/, /recursos?/, /librosgratis/, /librodev/, /midudev/, /free programming books/, /free ebook foundation/, /developer y/, /developery/, /ossu/, /microsoft learn/, /fullstack open/,
  ])
}

function isBookResource(resource: ResourceItem) {
  if (isCollectionResource(resource)) return false
  if (resource.type === "Libro / PDF") return true
  const haystack = normalize([resource.title, resource.description, ...resource.tags].join(" "))
  return /( libro | pdf | textbook | ebook | edicion | edition )/.test(` ${haystack} `)
}

function cleanBookTitle(resource: ResourceItem) {
  return resource.title
    .replace(/^[^·|]+[·|]\s*/, "")
    .replace(/\s*[—-]\s*(pdf|ebook|book)$/i, "")
    .trim()
}

function candidateAuthor(resource: ResourceItem) {
  const provider = resource.provider.split(/[·|]/)[0].trim()
  if (!provider) return ""
  const normalizedProvider = normalize(provider)
  if (containsStrongHint(normalizedProvider, [/github/, /gitlab/, /foundation/, /librodev/, /midudev/, /microsoft/, /google/, /mozilla/, /react/, /flutter/, /swift/, /kaggle/, /university/, /universidad/, /facultad/, /course/, /learn/, /ebook/])) {
    return ""
  }
  return provider
}

async function resolveOpenLibrary(resource: ResourceItem): Promise<ResolvedCover | null> {
  if (!isBookResource(resource)) return null
  const title = cleanBookTitle(resource)
  const author = candidateAuthor(resource)
  const query = new URLSearchParams({
    title,
    limit: "8",
    fields: "title,author_name,cover_i",
    lang: resource.language === "ES" ? "es" : "en",
  })
  if (author) query.set("author", author)
  const data = await fetchJson(`https://openlibrary.org/search.json?${query.toString()}`) as { docs?: Array<{ cover_i?: number; title?: string; author_name?: string[] }> }
  const ranked = (data.docs ?? [])
    .filter((doc) => doc.cover_i && doc.title)
    .map((doc) => {
      const titleScore = tokenSimilarity(title, doc.title ?? "")
      const authorScore = author ? tokenSimilarity(author, (doc.author_name ?? []).join(" ")) : 0.3
      const score = titleScore * 0.82 + authorScore * 0.18
      return { doc, score, titleScore }
    })
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  if (!best || best.titleScore < 0.5 || !best.doc.cover_i) return null
  return {
    src: `https://covers.openlibrary.org/b/id/${best.doc.cover_i}-L.jpg?default=false`,
    kind: "book",
    attribution: "Portada verificada: Open Library",
  }
}

async function resolveGoogleBooks(resource: ResourceItem): Promise<ResolvedCover | null> {
  if (!isBookResource(resource)) return null
  const title = cleanBookTitle(resource)
  const author = candidateAuthor(resource)
  const q = [title ? `intitle:${title}` : "", author ? `inauthor:${author}` : ""].filter(Boolean).join(" ") || title
  const params = new URLSearchParams({
    q,
    printType: "books",
    projection: "lite",
    maxResults: "8",
    orderBy: "relevance",
  })
  const data = await fetchJson(`https://www.googleapis.com/books/v1/volumes?${params.toString()}`) as {
    items?: Array<{
      volumeInfo?: {
        title?: string
        authors?: string[]
        imageLinks?: { thumbnail?: string; smallThumbnail?: string }
      }
    }>
  }
  const ranked = (data.items ?? [])
    .map((item) => {
      const info = item.volumeInfo ?? {}
      const image = info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail
      const titleScore = tokenSimilarity(title, info.title ?? "")
      const authorScore = author ? tokenSimilarity(author, (info.authors ?? []).join(" ")) : 0.3
      const score = titleScore * 0.82 + authorScore * 0.18
      return { image, score, titleScore }
    })
    .filter((item) => Boolean(item.image))
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  if (!best?.image || best.titleScore < 0.5) return null
  return {
    src: best.image.replace(/^http:/, "https:"),
    kind: "google-book",
    attribution: "Portada verificada: Google Books",
  }
}

type Motif =
  | "library"
  | "database"
  | "algorithms"
  | "git"
  | "ai"
  | "security"
  | "network"
  | "cloud"
  | "hardware"
  | "php"
  | "web"
  | "architecture"
  | "frontier"
  | "python"
  | "mobile"
  | "data"
  | "linux"
  | "math"
  | "software"
  | "docs"

function pickMotif(resource: ResourceItem): Motif {
  const haystack = normalize([resource.title, resource.description, resource.provider, ...resource.tags].join(" "))
  if (containsStrongHint(haystack, [/biblioteca/, /library/, /book/, /ebook/, /curricul/, /apuntes/, /guia/, /notas/, /catalog/, /repositorio/, /recursos?/])) return "library"
  if (/python|django|flask|pandas|numpy/.test(haystack)) return "python"
  if (/php|laravel|symfony/.test(haystack)) return "php"
  if (/base de datos|database|sql|postgres|mysql|mongodb|oracle|schema/.test(haystack)) return "database"
  if (/algorit|pseudocodigo|seudocodigo|logica|razonamiento|ordinograma|diagrama de flujo|haskell|estructura de datos/.test(haystack)) return "algorithms"
  if (/git|versionado|github/.test(haystack)) return "git"
  if (/ia|machine learning|deep learning|neural|nlp|vision|inteligencia artificial/.test(haystack)) return "ai"
  if (/data science|ciencia de datos|estadistica|statistics|analytics|visualization/.test(haystack)) return "data"
  if (/seguridad|crypto|criptografia|pentest|hacking|forense/.test(haystack)) return "security"
  if (/redes|network|ccna|tcp|router|telecom/.test(haystack)) return "network"
  if (/linux|bash|shell|ubuntu|debian|unix/.test(haystack)) return "linux"
  if (/docker|kubernetes|cloud|devops|azure|aws|gcp|powershell|sre/.test(haystack)) return "cloud"
  if (/hardware|robot|iot|arduino|electronica|microcontrolador/.test(haystack)) return "hardware"
  if (/android|ios|swift|kotlin|react native|flutter|mobile|movil/.test(haystack)) return "mobile"
  if (/html|css|frontend|backend|react|vue|angular|typescript|javascript|css3|fullstack/.test(haystack)) return "web"
  if (/documentacion|documentation|manual|standard|estandar|docs/.test(haystack)) return "docs"
  if (/software|testing|uml|refactoring|solid|clean code|diseno de software/.test(haystack)) return "software"
  if (/gestion|arquitectura|togaf|scrum|itil|producto|proyecto|enterprise/.test(haystack)) return "architecture"
  if (/cuantica|quantum|frontera|bioinformatica|xr|blockchain/.test(haystack)) return "frontier"
  if (/matemat|math|calculo|algebra|probabil|investig|research/.test(haystack)) return "math"

  switch (resource.category) {
    case "Bibliotecas y currículos": return "library"
    case "Programación": return "web"
    case "Fundamentos": return "algorithms"
    case "Programación y software": return "software"
    case "Web y móvil": return "web"
    case "Datos e IA": return "ai"
    case "Ciberseguridad": return "security"
    case "Redes y telecom": return "network"
    case "Cloud, DevOps y sistemas": return "cloud"
    case "Hardware, IoT y robótica": return "hardware"
    case "Matemáticas e investigación": return "math"
    case "Cuántica y frontera": return "frontier"
    case "Gestión y arquitectura": return "architecture"
    default: return "library"
  }
}

function createSvgDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function renderCodePanel(x: number, y: number, w: number, h: number, palette: Palette, seed: number) {
  const glowX = x + w * (0.24 + ((seed % 9) / 40))
  const glowY = y + h * (0.28 + ((seed % 7) / 40))
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.20)"/>
      <circle cx="${x + 30}" cy="${y + 28}" r="7" fill="rgba(255,255,255,.25)"/>
      <circle cx="${x + 54}" cy="${y + 28}" r="7" fill="rgba(255,255,255,.16)"/>
      <circle cx="${x + 78}" cy="${y + 28}" r="7" fill="rgba(255,255,255,.10)"/>
      <rect x="${x + 24}" y="${y + 64}" width="${w - 48}" height="18" rx="9" fill="rgba(255,255,255,.10)"/>
      <rect x="${x + 24}" y="${y + 100}" width="${w * 0.42}" height="14" rx="7" fill="${palette.orb}" opacity=".85"/>
      <rect x="${x + 24}" y="${y + 132}" width="${w * 0.58}" height="14" rx="7" fill="${palette.secondary}" opacity=".42"/>
      <rect x="${x + 24}" y="${y + 164}" width="${w * 0.30}" height="14" rx="7" fill="${palette.accent}" opacity=".82"/>
      <rect x="${x + 24}" y="${y + 196}" width="${w * 0.52}" height="14" rx="7" fill="rgba(255,255,255,.20)"/>
      <rect x="${x + 24}" y="${y + 228}" width="${w * 0.4}" height="14" rx="7" fill="${palette.secondary}" opacity=".36"/>
      <circle cx="${glowX}" cy="${glowY}" r="56" fill="${palette.accent}" opacity=".14"/>
    </g>`
}

function sceneSvg(motif: Motif, palette: Palette, seed: number) {
  const s = palette.secondary
  const i = palette.icon
  const variant = seed % 3
  const panel = renderCodePanel(286, 162, 468, 288, palette, seed)

  switch (motif) {
    case "library":
      return `
        <g>
          <rect x="240" y="176" width="560" height="238" rx="30" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.20)"/>
          <rect x="264" y="204" width="512" height="18" rx="9" fill="rgba(255,255,255,.10)"/>
          <path d="M292 378V232" stroke="${i}" stroke-width="18" stroke-linecap="round"/>
          <path d="M356 378V220" stroke="${s}" stroke-width="20" stroke-linecap="round"/>
          <path d="M420 378V244" stroke="${i}" stroke-width="22" stroke-linecap="round"/>
          <path d="M486 378V214" stroke="${s}" stroke-width="18" stroke-linecap="round"/>
          <path d="M548 378V236" stroke="${i}" stroke-width="24" stroke-linecap="round"/>
          <path d="M622 378V224" stroke="${s}" stroke-width="18" stroke-linecap="round"/>
          <path d="M690 378V248" stroke="${i}" stroke-width="20" stroke-linecap="round"/>
          <path d="M754 378V230" stroke="${s}" stroke-width="22" stroke-linecap="round"/>
          <rect x="278" y="388" width="492" height="12" rx="6" fill="rgba(255,255,255,.14)"/>
        </g>`
    case "database":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="520" cy="232" rx="124" ry="44" stroke="${s}" stroke-width="16"/>
          <path d="M396 232v170c0 24 56 44 124 44s124-20 124-44V232" stroke="${i}" stroke-width="16"/>
          <path d="M396 314c0 24 56 44 124 44s124-20 124-44" stroke="${i}" stroke-width="14"/>
          <path d="M396 356c0 24 56 44 124 44s124-20 124-44" stroke="${s}" stroke-width="14" opacity=".86"/>
          <circle cx="324" cy="298" r="26" stroke="${i}" stroke-width="12"/>
          <circle cx="720" cy="278" r="26" stroke="${i}" stroke-width="12"/>
          <path d="M350 298h46M670 278h24" stroke="${s}" stroke-width="12"/>
        </g>`
    case "algorithms":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="430" y="176" width="180" height="56" rx="18" stroke="${i}" stroke-width="14"/>
          <path d="M520 232v42" stroke="${s}" stroke-width="12"/>
          <path d="M456 306l64-52 64 52-64 52-64-52z" stroke="${i}" stroke-width="14"/>
          <path d="M456 306H370v74h110" stroke="${s}" stroke-width="12"/>
          <path d="M584 306h90v74H560" stroke="${s}" stroke-width="12"/>
          <rect x="320" y="376" width="190" height="58" rx="18" stroke="${i}" stroke-width="12"/>
          <rect x="536" y="376" width="190" height="58" rx="18" stroke="${i}" stroke-width="12"/>
          <circle cx="520" cy="306" r="10" fill="${palette.orb}" stroke="none"/>
        </g>`
    case "git":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="336" cy="314" r="24" stroke="${i}" stroke-width="12"/>
          <circle cx="470" cy="230" r="24" stroke="${i}" stroke-width="12"/>
          <circle cx="550" cy="316" r="24" stroke="${i}" stroke-width="12"/>
          <circle cx="694" cy="244" r="24" stroke="${i}" stroke-width="12"/>
          <circle cx="718" cy="392" r="24" stroke="${i}" stroke-width="12"/>
          <path d="M360 302l88-54M494 242l36 54M574 304l96-46M574 326l120 54M336 338v74" stroke="${s}" stroke-width="12"/>
        </g>`
    case "ai":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M438 248c0-46 36-82 82-82 28 0 52 14 66 34 9-5 20-8 32-8 35 0 64 29 64 64 0 16-6 31-16 42 8 10 12 22 12 35 0 36-29 65-65 65H470c-49 0-88-39-88-88 0-24 9-45 24-61 20 0 32-1 32-1z" stroke="${i}" stroke-width="14"/>
          <circle cx="472" cy="276" r="10" fill="${palette.orb}" stroke="none"/>
          <circle cx="560" cy="236" r="10" fill="${palette.accent}" stroke="none"/>
          <circle cx="628" cy="290" r="10" fill="${palette.orb}" stroke="none"/>
          <circle cx="532" cy="344" r="10" fill="${palette.accent}" stroke="none"/>
          <path d="M472 276l88-40 68 54-96 54-60-68z" stroke="${s}" stroke-width="10"/>
        </g>`
    case "security":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M520 174l146 56v92c0 104-89 162-146 188-57-26-146-84-146-188v-92l146-56z" stroke="${i}" stroke-width="14"/>
          <rect x="472" y="262" width="96" height="76" rx="18" stroke="${s}" stroke-width="12"/>
          <path d="M492 262v-18c0-18 12-34 28-41 18-8 38-5 53 8 11 10 17 24 17 39v12" stroke="${s}" stroke-width="12"/>
          <circle cx="520" cy="302" r="8" fill="${palette.orb}" stroke="none"/>
        </g>`
    case "network":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="320" cy="290" r="28" stroke="${i}" stroke-width="12"/>
          <circle cx="520" cy="184" r="28" stroke="${i}" stroke-width="12"/>
          <circle cx="718" cy="290" r="28" stroke="${i}" stroke-width="12"/>
          <circle cx="420" cy="410" r="28" stroke="${i}" stroke-width="12"/>
          <circle cx="622" cy="410" r="28" stroke="${i}" stroke-width="12"/>
          <path d="M346 280l148-82M546 194l148 82M340 306l54 86M700 306l-54 86M448 410h146M520 212v136" stroke="${s}" stroke-width="12"/>
        </g>`
    case "linux":
      return `${panel}<g fill="none" stroke="${s}" stroke-width="12" stroke-linecap="round"><path d="M402 250l-34 34 34 34"/><path d="M640 250l34 34-34 34"/><path d="M544 232l-26 104"/></g>`
    case "cloud":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M406 350h244a70 70 0 0 0 8-140 102 102 0 0 0-194-24A60 60 0 0 0 406 350z" stroke="${i}" stroke-width="14"/>
          <path d="M460 364v58M520 334v88M580 364v58" stroke="${s}" stroke-width="12"/>
          <rect x="436" y="420" width="168" height="38" rx="16" stroke="${s}" stroke-width="10"/>
        </g>`
    case "hardware":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="420" y="196" width="200" height="200" rx="26" stroke="${i}" stroke-width="14"/>
          <rect x="474" y="250" width="92" height="92" rx="16" stroke="${s}" stroke-width="12"/>
          <path d="M420 240h-36M420 294h-36M420 348h-36M620 240h36M620 294h36M620 348h36M474 196v-36M520 196v-36M566 196v-36M474 396v36M520 396v36M566 396v36" stroke="${i}" stroke-width="12"/>
        </g>`
    case "php":
      return `${panel}<g fill="none" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="648" cy="388" rx="86" ry="28" stroke="${s}" stroke-width="10" opacity=".76"/><path d="M568 388v42c0 15 36 28 80 28s80-13 80-28v-42" stroke="${i}" stroke-width="10" opacity=".82"/></g>`
    case "mobile":
      return `
        <g>
          <rect x="444" y="154" width="152" height="308" rx="30" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.24)"/>
          <rect x="458" y="182" width="124" height="228" rx="18" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.16)"/>
          <rect x="484" y="432" width="72" height="10" rx="5" fill="${s}" opacity=".52"/>
          <rect x="478" y="218" width="84" height="10" rx="5" fill="${palette.orb}" opacity=".88"/>
          <rect x="478" y="248" width="60" height="10" rx="5" fill="${palette.accent}" opacity=".82"/>
          <rect x="478" y="298" width="84" height="52" rx="14" fill="rgba(255,255,255,.10)"/>
        </g>`
    case "data":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M340 410V236" stroke="rgba(255,255,255,.18)" stroke-width="10"/>
          <path d="M340 410H716" stroke="rgba(255,255,255,.18)" stroke-width="10"/>
          <path d="M380 380l86-92 78 52 76-126 74 48" stroke="${i}" stroke-width="14"/>
          <circle cx="380" cy="380" r="12" fill="${palette.orb}" stroke="none"/>
          <circle cx="466" cy="288" r="12" fill="${palette.accent}" stroke="none"/>
          <circle cx="544" cy="340" r="12" fill="${palette.orb}" stroke="none"/>
          <circle cx="620" cy="214" r="12" fill="${palette.accent}" stroke="none"/>
          <circle cx="694" cy="262" r="12" fill="${palette.orb}" stroke="none"/>
        </g>`
    case "math":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M342 398H716" stroke="rgba(255,255,255,.18)" stroke-width="10"/>
          <path d="M402 434V218" stroke="rgba(255,255,255,.18)" stroke-width="10"/>
          <path d="M372 364c52 0 40-132 124-132s60 156 148 156c44 0 70-38 78-76" stroke="${i}" stroke-width="14"/>
          <circle cx="462" cy="246" r="10" fill="${palette.accent}" stroke="none"/>
          <circle cx="642" cy="386" r="10" fill="${palette.orb}" stroke="none"/>
        </g>`
    case "software":
      return `${panel}<g fill="none" stroke="${s}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M390 378h74l24 24h86l22-24h74" opacity=".78"/></g>`
    case "docs":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M434 190h140l78 78v174a26 26 0 0 1-26 26H434a26 26 0 0 1-26-26V216a26 26 0 0 1 26-26z" stroke="${i}" stroke-width="14"/>
          <path d="M574 190v78h78" stroke="${s}" stroke-width="12"/>
          <rect x="452" y="300" width="160" height="12" rx="6" fill="${palette.orb}" opacity=".88"/>
          <rect x="452" y="334" width="134" height="12" rx="6" fill="rgba(255,255,255,.24)"/>
          <rect x="452" y="368" width="146" height="12" rx="6" fill="${palette.accent}" opacity=".70"/>
        </g>`
    case "architecture":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="358" y="252" width="128" height="96" rx="22" stroke="${i}" stroke-width="12"/>
          <rect x="538" y="174" width="150" height="96" rx="22" stroke="${i}" stroke-width="12"/>
          <rect x="538" y="330" width="150" height="96" rx="22" stroke="${i}" stroke-width="12"/>
          <path d="M486 300h52M612 270v58M486 300l52-78M486 300l52 78" stroke="${s}" stroke-width="12"/>
        </g>`
    case "frontier":
      return `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="520" cy="308" r="34" stroke="${s}" stroke-width="12"/>
          <ellipse cx="520" cy="308" rx="154" ry="56" stroke="${i}" stroke-width="12"/>
          <ellipse cx="520" cy="308" rx="56" ry="154" transform="rotate(30 520 308)" stroke="${i}" stroke-width="10"/>
          <ellipse cx="520" cy="308" rx="56" ry="154" transform="rotate(-30 520 308)" stroke="${i}" stroke-width="10"/>
          <circle cx="664" cy="308" r="12" fill="${palette.orb}" stroke="none"/>
          <circle cx="424" cy="220" r="12" fill="${palette.accent}" stroke="none"/>
        </g>`
    case "python":
      return `${panel}<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M612 244h84c22 0 40 18 40 40v24h-98c-18 0-32 14-32 32v34h102c22 0 40-18 40-40v-74c0-24-20-44-44-44h-88" stroke="${s}" stroke-width="10"/><circle cx="662" cy="270" r="6" fill="${palette.orb}" stroke="none"/><circle cx="690" cy="350" r="6" fill="${palette.accent}" stroke="none"/></g>`
    case "web":
    default:
      if (variant === 0) return `${panel}<g fill="none" stroke="${s}" stroke-width="12" stroke-linecap="round"><path d="M400 252l-34 34 34 34"/><path d="M640 252l34 34-34 34"/><path d="M544 236l-24 102"/></g>`
      if (variant === 1) return `${panel}<g fill="none" stroke="${s}" stroke-width="10" stroke-linecap="round"><rect x="612" y="230" width="96" height="88" rx="16" opacity=".7"/><path d="M630 254h58M630 278h42M630 302h54"/></g>`
      return `${panel}<g fill="none" stroke="${s}" stroke-width="10" stroke-linecap="round"><circle cx="664" cy="282" r="34" opacity=".7"/><path d="M630 282h68M664 248c20 14 20 54 0 68M664 248c-20 14-20 54 0 68"/></g>`
  }
}

export function createGeneratedResourceCover(resource: ResourceItem): ResolvedCover {
  const palette = palettes[resource.category] ?? palettes["Bibliotecas y currículos"]
  const motif = pickMotif(resource)
  const seed = hashString(keyFor(resource))
  const orbShiftX = 40 + (seed % 160)
  const orbShiftY = 36 + ((seed >> 3) % 120)
  const orbShiftX2 = 60 + ((seed >> 5) % 180)
  const orbShiftY2 = 60 + ((seed >> 7) % 120)
  const scene = sceneSvg(motif, palette, seed)
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1040 620" fill="none">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${palette.background[0]}"/>
        <stop offset="100%" stop-color="${palette.background[1]}"/>
      </linearGradient>
      <radialGradient id="orbA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${760 + orbShiftX} ${84 + orbShiftY}) rotate(90) scale(220 220)">
        <stop offset="0%" stop-color="${palette.orb}" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="${palette.orb}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="orbB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${186 + orbShiftX2} ${470 - orbShiftY2}) rotate(90) scale(170 180)">
        <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.64"/>
        <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,.20)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,.06)"/>
      </linearGradient>
    </defs>
    <rect width="1040" height="620" fill="url(#bg)"/>
    <rect width="1040" height="620" fill="url(#orbA)"/>
    <rect width="1040" height="620" fill="url(#orbB)"/>
    <g opacity="0.18">
      <path d="M0 74H1040" stroke="${palette.line}"/>
      <path d="M0 148H1040" stroke="${palette.line}"/>
      <path d="M0 222H1040" stroke="${palette.line}"/>
      <path d="M0 296H1040" stroke="${palette.line}"/>
      <path d="M0 370H1040" stroke="${palette.line}"/>
      <path d="M0 444H1040" stroke="${palette.line}"/>
      <path d="M0 518H1040" stroke="${palette.line}"/>
      <path d="M74 0V620" stroke="${palette.line}"/>
      <path d="M148 0V620" stroke="${palette.line}"/>
      <path d="M222 0V620" stroke="${palette.line}"/>
      <path d="M296 0V620" stroke="${palette.line}"/>
      <path d="M370 0V620" stroke="${palette.line}"/>
      <path d="M444 0V620" stroke="${palette.line}"/>
      <path d="M518 0V620" stroke="${palette.line}"/>
      <path d="M592 0V620" stroke="${palette.line}"/>
      <path d="M666 0V620" stroke="${palette.line}"/>
      <path d="M740 0V620" stroke="${palette.line}"/>
      <path d="M814 0V620" stroke="${palette.line}"/>
      <path d="M888 0V620" stroke="${palette.line}"/>
      <path d="M962 0V620" stroke="${palette.line}"/>
    </g>
    <g opacity="0.06" fill="${palette.secondary}">
      <circle cx="154" cy="86" r="8"/>
      <circle cx="185" cy="86" r="8"/>
      <circle cx="216" cy="86" r="8"/>
    </g>
    ${scene}
    <rect x="0" y="0" width="1040" height="620" fill="url(#glass)" opacity="0.10"/>
  </svg>`

  return {
    src: createSvgDataUri(svg),
    kind: "generated",
    attribution: "Ilustración temática generada automáticamente",
  }
}

function isLikelyNoiseImage(url: string) {
  const input = url.toLowerCase()
  return [
    "opengraph.githubassets.com",
    "github.githubassets.com",
    "private-user-images.githubusercontent.com",
    "avatars.githubusercontent.com",
    "/social-preview",
    "/badge",
    "/badges/",
    "/avatar",
  ].some((token) => input.includes(token))
}

async function resolveCoverInternal(resource: ResourceItem): Promise<ResolvedCover | null> {
  const localManifest = await loadLocalCoverManifest()
  const localCover = localManifest[resource.id]
  if (localCover?.src) {
    return {
      src: localCover.src,
      kind: "explicit",
      attribution: localCover.source ? `Imagen verificada: ${localCover.source}` : "Imagen verificada localmente",
    }
  }

  if (resource.coverImage && !isLikelyNoiseImage(resource.coverImage)) return { src: resource.coverImage, kind: "explicit" }

  const direct = directImage(resource)
  if (direct && !isLikelyNoiseImage(direct)) return { src: direct, kind: "direct" }

  const youtube = youtubeThumbnail(resource.url) ?? (resource.embedUrl ? youtubeThumbnail(resource.embedUrl) : null)
  if (youtube) return { src: youtube, kind: "video", attribution: "Miniatura verificada: YouTube" }

  try {
    const book = await resolveOpenLibrary(resource)
    if (book) return book
  } catch {
    // Si Open Library falla, seguimos con Google Books o la ilustración temática.
  }

  try {
    const googleBook = await resolveGoogleBooks(resource)
    if (googleBook) return googleBook
  } catch {
    // Google Books es complementario.
  }

  return createGeneratedResourceCover(resource)
}

export async function resolveResourceCover(resource: ResourceItem) {
  const key = keyFor(resource)
  if (memoryCache.has(key)) return memoryCache.get(key) ?? null
  const stored = readStorage(key)
  if (stored !== undefined) {
    memoryCache.set(key, stored)
    return stored
  }
  const existing = inflight.get(key)
  if (existing) return existing

  const promise = schedule(() => resolveCoverInternal(resource))
    .then((result) => {
      memoryCache.set(key, result)
      writeStorage(key, result)
      return result
    })
    .finally(() => inflight.delete(key))
  inflight.set(key, promise)
  return promise
}

export type { ResolvedCover }
