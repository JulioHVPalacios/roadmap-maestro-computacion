import fs from "node:fs/promises"

const feeds = [
  { source: "Xataka", url: "https://feeds.weblogssl.com/xataka2" },
  { source: "Genbeta", url: "https://feeds.weblogssl.com/genbeta" },
  { source: "RedesZone", url: "https://www.redeszone.net/feed/" },
  { source: "MuyComputer", url: "https://www.muycomputer.com/feed/" },
  { source: "ADSLZone", url: "https://www.adslzone.net/feed/" },
  { source: "SoftZone", url: "https://www.softzone.es/feed/" },
  { source: "Hipertextual", url: "https://hipertextual.com/feed" },
]

const keywords = [
  "inteligencia artificial", " ia ", "ciberseguridad", "seguridad", "software", "hardware",
  "informática", "computación", "sistemas", "programación", "desarrollo", "linux", "windows",
  "base de datos", "datos", "cloud", "nube", "redes", "router", "wifi", "wi-fi", "telecom",
  "5g", "6g", "semiconductor", "chip", "gpu", "cpu", "open source", "código abierto",
  "algoritmo", "robótica", "robot", "cuánt", "servidor", "centro de datos", "devops",
]

const USER_AGENT = "CampusMaestroNewsBot/1.1 (+https://github.com/JulioHVPalacios/roadmap-maestro-computacion)"

function stripCdata(value = "") {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "")
}

function decodeEntities(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(Number.parseInt(n, 16)))
}

function cleanHtml(value = "") {
  return decodeEntities(stripCdata(value))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"))
  return m ? stripCdata(m[1]).trim() : ""
}

function attr(block, pattern) {
  const m = block.match(pattern)
  return m ? decodeEntities(m[1]) : ""
}

function getTagAttribute(tagText = "", name = "") {
  return attr(tagText, new RegExp(`\\s${name}\\s*=\\s*["']([^"']+)["']`, "i"))
}

function normalizeImageUrl(candidate = "", baseUrl = "") {
  const raw = decodeEntities(candidate).trim().replace(/^['"]|['"]$/g, "")
  if (!raw || /^data:/i.test(raw) || /^javascript:/i.test(raw)) return ""
  try {
    return new URL(raw, baseUrl || undefined).href
  } catch {
    return /^https?:\/\//i.test(raw) ? raw : ""
  }
}

function bestFromSrcset(srcset = "", baseUrl = "") {
  const candidates = srcset
    .split(",")
    .map((part) => part.trim().split(/\s+/)[0])
    .filter(Boolean)
  return normalizeImageUrl(candidates.at(-1) || "", baseUrl)
}

function imageFromHtml(html = "", baseUrl = "") {
  const patterns = [
    /<img[^>]+data-src=["']([^"']+)["']/i,
    /<img[^>]+data-lazy-src=["']([^"']+)["']/i,
    /<img[^>]+data-original=["']([^"']+)["']/i,
    /<img[^>]+src=["']([^"']+)["']/i,
  ]
  for (const pattern of patterns) {
    const candidate = attr(html, pattern)
    const url = normalizeImageUrl(candidate, baseUrl)
    if (url) return url
  }

  const srcset = attr(html, /<img[^>]+(?:data-)?srcset=["']([^"']+)["']/i)
  return bestFromSrcset(srcset, baseUrl)
}

function imageFromRssBlock(block = "", html = "", baseUrl = "") {
  for (const tagName of ["media:content", "media:thumbnail", "enclosure"]) {
    const matches = block.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || []
    for (const tagText of matches) {
      if (tagName === "enclosure") {
        const type = getTagAttribute(tagText, "type")
        if (type && !/^image\//i.test(type)) continue
      }
      const candidate = getTagAttribute(tagText, "url") || getTagAttribute(tagText, "href")
      const url = normalizeImageUrl(candidate, baseUrl)
      if (url) return url
    }
  }
  return imageFromHtml(html, baseUrl)
}

function metaContent(html = "", keys = []) {
  const tags = html.match(/<meta\b[^>]*>/gi) || []
  for (const tagText of tags) {
    const key = (getTagAttribute(tagText, "property") || getTagAttribute(tagText, "name") || getTagAttribute(tagText, "itemprop")).toLowerCase()
    if (!keys.includes(key)) continue
    const content = getTagAttribute(tagText, "content")
    if (content) return content
  }
  return ""
}

function articleImageFromHtml(html = "", baseUrl = "") {
  const meta = metaContent(html, [
    "og:image:secure_url",
    "og:image",
    "twitter:image:src",
    "twitter:image",
    "image",
    "thumbnailurl",
  ])
  const metaUrl = normalizeImageUrl(meta, baseUrl)
  if (metaUrl) return metaUrl

  const linkTags = html.match(/<link\b[^>]*>/gi) || []
  for (const tagText of linkTags) {
    const rel = getTagAttribute(tagText, "rel").toLowerCase()
    if (!rel.split(/\s+/).includes("image_src")) continue
    const url = normalizeImageUrl(getTagAttribute(tagText, "href"), baseUrl)
    if (url) return url
  }

  return imageFromHtml(html, baseUrl)
}

function categoryFor(text) {
  const t = text.toLowerCase()
  if (t.includes("ciber") || t.includes("seguridad") || t.includes("malware") || t.includes("ransom")) return "Ciberseguridad"
  if (t.includes("inteligencia artificial") || /\bia\b/.test(t) || t.includes("modelo") || t.includes("agente")) return "IA"
  if (t.includes("red") || t.includes("router") || t.includes("wifi") || t.includes("5g") || t.includes("6g")) return "Redes"
  if (t.includes("gpu") || t.includes("cpu") || t.includes("chip") || t.includes("hardware") || t.includes("semiconductor")) return "Hardware"
  if (t.includes("datos") || t.includes("base de datos") || t.includes("data")) return "Datos"
  if (t.includes("software") || t.includes("program") || t.includes("linux") || t.includes("windows") || t.includes("desarrollo")) return "Software"
  return "Tecnología"
}

function relevant(text) {
  const t = ` ${text.toLowerCase()} `
  return keywords.some((k) => t.includes(k))
}

async function readFeed(feed) {
  const response = await fetch(feed.url, {
    headers: { "user-agent": USER_AGENT, accept: "application/rss+xml, application/xml, text/xml, */*" },
    redirect: "follow",
    signal: AbortSignal.timeout(12000),
  })
  if (!response.ok) throw new Error(`${feed.source}: HTTP ${response.status}`)
  const xml = await response.text()
  const items = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((m) => m[0])

  return items.flatMap((block) => {
    const title = cleanHtml(tag(block, "title"))
    const url = decodeEntities(tag(block, "link"))
    const descriptionRaw = tag(block, "description")
    const contentRaw = tag(block, "content:encoded")
    const richHtml = `${descriptionRaw}\n${contentRaw}`
    const excerpt = cleanHtml(descriptionRaw || contentRaw).slice(0, 220)
    const pub = cleanHtml(tag(block, "pubDate") || tag(block, "dc:date"))
    const image = imageFromRssBlock(block, richHtml, url)

    if (!title || !url || !relevant(`${title} ${excerpt}`)) return []

    const date = new Date(pub)
    return [{
      title,
      source: feed.source,
      url,
      category: categoryFor(`${title} ${excerpt}`),
      published: Number.isNaN(date.getTime())
        ? "Reciente"
        : new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(date),
      publishedAt: Number.isNaN(date.getTime()) ? 0 : date.getTime(),
      excerpt: excerpt || "Abrir la noticia en la fuente original.",
      image,
    }]
  })
}

async function fetchArticleImage(item) {
  if (item.image || !/^https?:\/\//i.test(item.url)) return item
  try {
    const response = await fetch(item.url, {
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml",
        "accept-language": "es-ES,es;q=0.9,en;q=0.5",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) return item
    const contentType = response.headers.get("content-type") || ""
    if (contentType && !contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) return item
    const html = await response.text()
    return { ...item, image: articleImageFromHtml(html, response.url || item.url) }
  } catch {
    return item
  }
}

async function enrichMissingImages(items, concurrency = 5) {
  const result = [...items]
  let cursor = 0
  async function worker() {
    while (true) {
      const index = cursor++
      if (index >= result.length) return
      if (!result[index].image) result[index] = await fetchArticleImage(result[index])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, result.length) }, worker))
  return result
}

const settled = await Promise.allSettled(feeds.map(readFeed))
for (const result of settled) {
  if (result.status === "rejected") console.warn(`Feed omitido: ${result.reason?.message || result.reason}`)
}
const all = settled.flatMap((result) => result.status === "fulfilled" ? result.value : [])
const seenUrls = new Set()
const seenTitles = new Set()

function normalizeUrl(url = "") {
  return url.trim().replace(/[?#].*$/, "").replace(/\/+$/, "").toLowerCase()
}

function normalizeTitle(title = "") {
  return title.trim().replace(/\s+/g, " ").toLowerCase()
}

const uniqueNews = all
  .sort((a, b) => b.publishedAt - a.publishedAt)
  .filter((item) => {
    const urlKey = normalizeUrl(item.url)
    const titleKey = normalizeTitle(item.title)
    if ((urlKey && seenUrls.has(urlKey)) || (titleKey && seenTitles.has(titleKey))) return false
    if (urlKey) seenUrls.add(urlKey)
    if (titleKey) seenTitles.add(titleKey)
    return true
  })
  // Cuatro carruseles x diez noticias = 40 plazas. Guardamos margen extra
  // para que cada card pueda elegir por categoría sin reutilizar noticias.
  .slice(0, 80)

if (!uniqueNews.length) {
  console.warn("No se pudo generar noticias nuevas; se conserva el news.json existente.")
  process.exit(0)
}

const before = uniqueNews.filter((item) => item.image).length
const enriched = await enrichMissingImages(uniqueNews)
const after = enriched.filter((item) => item.image).length
const news = enriched.map(({ publishedAt, ...item }) => item)

await fs.mkdir("public", { recursive: true })
await fs.writeFile("public/news.json", JSON.stringify(news, null, 2) + "\n", "utf8")
console.log(`news.json actualizado con ${news.length} noticias.`)
console.log(`Imágenes disponibles: ${after}/${news.length} (${Math.max(0, after - before)} recuperadas desde la página original).`)
