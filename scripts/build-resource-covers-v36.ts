import { chromium, type Browser, type Page } from "playwright"
import sharp from "sharp"
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas"
import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { basename, join, sep } from "node:path"
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"
import { pathToFileURL } from "node:url"
import { resources, type ResourceItem } from "../src/resources-data"
import { loadLiveResources } from "../src/resources-live"
import { createGeneratedResourceCover } from "../src/resource-cover-resolver"

Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })

type ManifestEntry = {
  src: string
  source: string
  sourceUrl: string
  generatedAt: string
  sha256: string
  dhash: string
  status?: number
  notes?: string[]
}

type Manifest = Record<string, ManifestEntry>

type AuditRow = {
  id: string
  title: string
  provider: string
  url: string
  ok: boolean
  source?: string
  status?: number
  message?: string
}

const root = process.cwd()
const outputDir = join(root, "public", "resource-covers-v36")
const manifestPath = join(outputDir, "manifest.json")
const auditPath = join(outputDir, "audit.json")
const standardFontDataUrl = pathToFileURL(join(root, "node_modules", "pdfjs-dist", "standard_fonts") + sep).href

const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/, "").split("=")
  return [key, rest.join("=") || "true"]
}))
const limit = Math.max(1, Number(args.get("limit") ?? 1000))
const concurrency = Math.min(6, Math.max(1, Number(args.get("concurrency") ?? 3)))
const force = args.get("force") === "true"
const only = args.get("only")

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

const stopwords = new Set(["de", "del", "la", "las", "el", "los", "and", "for", "with", "para", "con", "por", "en", "un", "una", "the", "to", "y", "a", "o", "of", "ebook", "book", "books", "libro", "libros", "pdf", "curso", "cursos", "guide", "guia", "manual"])

function tokenSimilarity(a: string, b: string) {
  const tokens = (value: string) => new Set(normalize(value).split(" ").filter((word) => word.length > 2 && !stopwords.has(word)))
  const aa = tokens(a)
  const bb = tokens(b)
  if (!aa.size || !bb.size) return 0
  let common = 0
  aa.forEach((word) => { if (bb.has(word)) common += 1 })
  return common / Math.max(aa.size, bb.size)
}

function safeFileName(resource: ResourceItem) {
  const slug = normalize(resource.id || resource.title).replace(/\s+/g, "-").slice(0, 100)
  return `${slug || createHash("sha1").update(resource.title).digest("hex").slice(0, 16)}.webp`
}

function isCollection(resource: ResourceItem) {
  const h = normalize([resource.title, resource.provider, resource.description, ...resource.tags].join(" "))
  return resource.category === "Bibliotecas y currículos" || /biblioteca|library|curricul|roadmap|coleccion|collection|indice|catalog|awesome|resources|recursos|free programming books|free ebook foundation|librodev|midudev|microsoft learn|fullstack open|ossu/.test(h)
}

function isBook(resource: ResourceItem) {
  if (isCollection(resource)) return false
  return resource.type === "Libro / PDF" || /\b(libro|pdf|ebook|textbook|edicion|edition)\b/.test(normalize([resource.title, resource.description, ...resource.tags].join(" ")))
}

function cleanBookTitle(resource: ResourceItem) {
  return resource.title.replace(/^[^·|]+[·|]\s*/, "").replace(/\s*[—-]\s*(pdf|ebook|book)$/i, "").trim()
}

function candidateAuthor(resource: ResourceItem) {
  const provider = resource.provider.split(/[·|]/)[0].trim()
  if (!provider) return ""
  const p = normalize(provider)
  if (/github|gitlab|foundation|librodev|midudev|microsoft|google|mozilla|university|universidad|facultad|course|learn|ebook/.test(p)) return ""
  return provider
}

async function fetchBuffer(url: string, timeoutMs = 15000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "user-agent": "CampusMaestro/1.0 resource-cover-builder" },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { buffer: Buffer.from(await response.arrayBuffer()), response }
  } finally {
    clearTimeout(timer)
  }
}

async function exactBookCover(resource: ResourceItem) {
  if (!isBook(resource)) return null
  const title = cleanBookTitle(resource)
  const author = candidateAuthor(resource)

  try {
    const params = new URLSearchParams({ title, limit: "8", fields: "title,author_name,cover_i" })
    if (author) params.set("author", author)
    const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`)
    if (response.ok) {
      const data = await response.json() as { docs?: Array<{ title?: string; author_name?: string[]; cover_i?: number }> }
      const best = (data.docs ?? [])
        .filter((doc) => doc.cover_i && doc.title)
        .map((doc) => {
          const titleScore = tokenSimilarity(title, doc.title ?? "")
          const authorScore = author ? tokenSimilarity(author, (doc.author_name ?? []).join(" ")) : 0.3
          return { doc, titleScore, score: titleScore * 0.84 + authorScore * 0.16 }
        })
        .sort((a, b) => b.score - a.score)[0]
      if (best?.doc.cover_i && best.titleScore >= 0.56) {
        const url = `https://covers.openlibrary.org/b/id/${best.doc.cover_i}-L.jpg?default=false`
        const { buffer } = await fetchBuffer(url)
        return { buffer, source: "Open Library", sourceUrl: url }
      }
    }
  } catch { /* continue */ }

  try {
    const q = [title ? `intitle:${title}` : "", author ? `inauthor:${author}` : ""].filter(Boolean).join(" ") || title
    const params = new URLSearchParams({ q, printType: "books", maxResults: "8", orderBy: "relevance" })
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params.toString()}`)
    if (response.ok) {
      const data = await response.json() as { items?: Array<{ volumeInfo?: { title?: string; authors?: string[]; imageLinks?: { thumbnail?: string; smallThumbnail?: string } } }> }
      const best = (data.items ?? [])
        .map((item) => {
          const info = item.volumeInfo ?? {}
          const image = info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail
          const titleScore = tokenSimilarity(title, info.title ?? "")
          const authorScore = author ? tokenSimilarity(author, (info.authors ?? []).join(" ")) : 0.3
          return { image, titleScore, score: titleScore * 0.84 + authorScore * 0.16 }
        })
        .filter((item) => item.image)
        .sort((a, b) => b.score - a.score)[0]
      if (best?.image && best.titleScore >= 0.56) {
        const url = best.image.replace(/^http:/, "https:")
        const { buffer } = await fetchBuffer(url)
        return { buffer, source: "Google Books", sourceUrl: url }
      }
    }
  } catch { /* continue */ }

  return null
}

async function renderPdfFirstPage(url: string) {
  try {
    const { buffer } = await fetchBuffer(url, 22000)
    if (!buffer.subarray(0, 5).toString().startsWith("%PDF-")) return null
    const loadingTask = getDocument({ data: new Uint8Array(buffer), disableWorker: true, standardFontDataUrl } as never)
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1)
    const initial = page.getViewport({ scale: 1 })
    const scale = Math.min(2.2, Math.max(1.2, 1200 / Math.max(initial.width, 1)))
    const viewport = page.getViewport({ scale })
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
    const ctx = canvas.getContext("2d")
    await page.render({ canvasContext: ctx as never, viewport } as never).promise
    const png = canvas.toBuffer("image/png")
    page.cleanup()
    await pdf.destroy()
    return { buffer: png, source: "PDF · primera página", sourceUrl: url }
  } catch {
    return null
  }
}

async function pageScreenshot(page: Page, url: string) {
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 18000 })
    const status = response?.status() ?? 0
    if (status >= 400) throw new Error(`HTTP ${status}`)
    await page.addStyleTag({ content: `
      [class*="cookie" i], [id*="cookie" i], [class*="consent" i], [id*="consent" i],
      [class*="modal" i][style*="fixed"], [class*="overlay" i][style*="fixed"] { display:none!important; }
      html { scroll-behavior:auto!important; }
    ` }).catch(() => {})
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {})
    await sleep(1000)
    const title = await page.title().catch(() => "")
    if (/404|not found|error|forbidden|access denied/i.test(title)) throw new Error(`Página inválida: ${title}`)
    const buffer = await page.screenshot({ type: "jpeg", quality: 84, fullPage: false })
    return { buffer, source: "Captura de la fuente real", sourceUrl: page.url(), status }
  } catch (error) {
    throw error
  }
}

async function makeCardImage(input: Buffer) {
  const meta = await sharp(input, { failOn: "none" }).metadata()
  const width = meta.width ?? 1
  const height = meta.height ?? 1
  const bg = await sharp(input, { failOn: "none" })
    .resize(960, 540, { fit: "cover" })
    .blur(18)
    .modulate({ brightness: 0.72, saturation: 0.95 })
    .webp({ quality: 78 })
    .toBuffer()
  const foreground = await sharp(input, { failOn: "none" })
    .resize(900, 500, { fit: "contain", withoutEnlargement: false })
    .webp({ quality: 88 })
    .toBuffer()
  const fgMeta = await sharp(foreground).metadata()
  const fgWidth = fgMeta.width ?? 900
  const fgHeight = fgMeta.height ?? 500
  const left = Math.floor((960 - fgWidth) / 2)
  const top = Math.floor((540 - fgHeight) / 2)
  const result = await sharp(bg)
    .composite([{ input: foreground, left, top }])
    .webp({ quality: 86, effort: 4 })
    .toBuffer()
  return { buffer: result, originalRatio: width / Math.max(height, 1) }
}

async function dHash(buffer: Buffer) {
  const { data } = await sharp(buffer).resize(9, 8, { fit: "fill" }).greyscale().raw().toBuffer({ resolveWithObject: true })
  let bits = ""
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      bits += data[y * 9 + x] > data[y * 9 + x + 1] ? "1" : "0"
    }
  }
  return BigInt(`0b${bits}`).toString(16).padStart(16, "0")
}

function hammingHex(a: string, b: string) {
  let value = BigInt(`0x${a}`) ^ BigInt(`0x${b}`)
  let count = 0
  while (value) { count += Number(value & 1n); value >>= 1n }
  return count
}

async function generatedFallback(resource: ResourceItem) {
  const generated = createGeneratedResourceCover(resource)
  const prefix = "data:image/svg+xml;charset=UTF-8,"
  if (!generated.src.startsWith(prefix)) throw new Error("Fallback SVG inválido")
  const svg = decodeURIComponent(generated.src.slice(prefix.length))
  return { buffer: Buffer.from(svg, "utf8"), source: "Ilustración temática generada", sourceUrl: resource.url }
}

async function readManifest() {
  try { return JSON.parse(await readFile(manifestPath, "utf8")) as Manifest } catch { return {} }
}

async function processResource(resource: ResourceItem, page: Page, manifest: Manifest, hashes: Array<{ id: string; hash: string }>, audit: AuditRow[]) {
  const fileName = safeFileName(resource)
  const filePath = join(outputDir, fileName)
  const publicPath = `/resource-covers-v36/${fileName}`
  if (!force && manifest[resource.id] && existsSync(filePath)) {
    hashes.push({ id: resource.id, hash: manifest[resource.id].dhash })
    return
  }

  const notes: string[] = []
  let candidate: { buffer: Buffer; source: string; sourceUrl: string; status?: number } | null = null

  candidate = await exactBookCover(resource)
  if (!candidate) {
    const directUrl = [resource.coverImage, resource.downloadUrl, resource.url].find((url) => url && /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(url))
    if (directUrl) {
      try {
        const { buffer } = await fetchBuffer(directUrl)
        candidate = { buffer, source: "Imagen directa de la fuente", sourceUrl: directUrl }
      } catch { notes.push("imagen directa falló") }
    }
  }

  if (!candidate) {
    const yt = resource.url.match(/[?&]v=([^&#]+)/i)?.[1] ?? resource.url.match(/youtu\.be\/([^?&#/]+)/i)?.[1]
    if (yt) {
      const url = `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`
      try {
        const { buffer } = await fetchBuffer(url)
        candidate = { buffer, source: "Miniatura oficial de YouTube", sourceUrl: url }
      } catch { notes.push("miniatura YouTube falló") }
    }
  }

  const pdfUrl = [resource.downloadUrl, resource.url].find((url) => url && (/\.pdf([?#].*)?$/i.test(url) || resource.type === "Libro / PDF"))
  if (!candidate && pdfUrl) {
    candidate = await renderPdfFirstPage(pdfUrl)
    if (!candidate) notes.push("render PDF falló/no era PDF directo")
  }

  if (!candidate) {
    try {
      candidate = await pageScreenshot(page, resource.url)
    } catch (error) {
      notes.push(`captura web falló: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (!candidate) candidate = await generatedFallback(resource)

  let card = await makeCardImage(candidate.buffer)
  let hash = await dHash(card.buffer)
  const nearDuplicate = hashes.find((item) => hammingHex(item.hash, hash) <= 2)
  if (nearDuplicate && candidate.source !== "Ilustración temática generada") {
    notes.push(`imagen casi duplicada de ${nearDuplicate.id}; se reemplazó por fallback único`)
    candidate = await generatedFallback(resource)
    card = await makeCardImage(candidate.buffer)
    hash = await dHash(card.buffer)
  }

  await writeFile(filePath, card.buffer)
  const sha256 = createHash("sha256").update(card.buffer).digest("hex")
  manifest[resource.id] = {
    src: publicPath,
    source: candidate.source,
    sourceUrl: candidate.sourceUrl,
    generatedAt: new Date().toISOString(),
    sha256,
    dhash: hash,
    status: candidate.status,
    notes,
  }
  hashes.push({ id: resource.id, hash })
  audit.push({ id: resource.id, title: resource.title, provider: resource.provider, url: resource.url, ok: true, source: candidate.source, status: candidate.status })
  console.log(`OK ${resource.id} · ${candidate.source}`)
}

async function main() {
  await mkdir(outputDir, { recursive: true })
  const manifest = await readManifest()
  const audit: AuditRow[] = []
  const hashes: Array<{ id: string; hash: string }> = []

  let selected = await loadLiveResources(resources, limit)
  if (only) selected = selected.filter((item) => normalize(`${item.id} ${item.title}`).includes(normalize(only)))
  selected = selected.slice(0, limit)

  console.log(`Campus Maestro V36 · ${selected.length} recursos · concurrencia ${concurrency}`)
  const browser: Browser = await chromium.launch({ headless: true })
  const queue = [...selected]
  let processed = 0

  const workers = Array.from({ length: concurrency }, async (_, workerIndex) => {
    const context = await browser.newContext({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 })
    const page = await context.newPage()
    while (queue.length) {
      const resource = queue.shift()
      if (!resource) break
      try {
        await processResource(resource, page, manifest, hashes, audit)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`FAIL ${resource.id} · ${message}`)
        audit.push({ id: resource.id, title: resource.title, provider: resource.provider, url: resource.url, ok: false, message })
      }
      processed += 1
      if (processed % 10 === 0) {
        await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8")
        await writeFile(auditPath, JSON.stringify(audit, null, 2), "utf8")
        console.log(`--- ${processed}/${selected.length} ---`)
      }
    }
    await page.close().catch(() => {})
    await context.close().catch(() => {})
    console.log(`worker ${workerIndex + 1} terminado`)
  })

  await Promise.all(workers)
  await browser.close()
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8")
  await writeFile(auditPath, JSON.stringify(audit, null, 2), "utf8")
  const ok = audit.filter((item) => item.ok).length
  console.log(`\nListo. Generadas/verificadas: ${ok}. Fallos: ${audit.length - ok}.`)
  console.log(`Manifest: ${manifestPath}`)
  console.log(`Auditoría: ${auditPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
