import { chromium, type Browser, type Page } from "playwright"
import sharp from "sharp"
import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import type { CertificationItem } from "../src/certifications-data"

const root = process.cwd()
const dataPath = join(root, "public", "certifications-v1", "certifications.json")
const outputDir = join(root, "public", "certification-covers-v1")
const manifestPath = join(outputDir, "manifest.json")
const auditPath = join(outputDir, "audit.json")
const concurrency = 3

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100)
}

async function fetchBuffer(url: string, timeoutMs = 15_000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { signal: controller.signal, redirect: "follow", headers: { "user-agent": "CampusMaestro/1.0 certification-cover-builder" } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const contentType = response.headers.get("content-type") ?? ""
    if (!contentType.startsWith("image/")) throw new Error(`No es imagen: ${contentType}`)
    return Buffer.from(await response.arrayBuffer())
  } finally {
    clearTimeout(timer)
  }
}

async function normalizeCover(buffer: Buffer, outPath: string) {
  const foreground = await sharp(buffer, { failOn: "none" })
    .rotate()
    .resize(960, 540, { fit: "contain", background: { r: 14, g: 22, b: 18, alpha: 0 } })
    .webp({ quality: 88 })
    .toBuffer()

  const background = await sharp(buffer, { failOn: "none" })
    .rotate()
    .resize(960, 540, { fit: "cover" })
    .blur(22)
    .modulate({ brightness: 0.72, saturation: 0.92 })
    .webp({ quality: 75 })
    .toBuffer()

  await sharp(background)
    .composite([{ input: foreground, gravity: "centre" }])
    .webp({ quality: 88 })
    .toFile(outPath)
}

async function bestMetaImage(page: Page) {
  return page.evaluate(() => {
    const selectors = [
      'meta[property="og:image:secure_url"]',
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:image:src"]',
      'link[rel="image_src"]',
    ]
    for (const selector of selectors) {
      const node = document.querySelector(selector)
      const value = node?.getAttribute("content") || node?.getAttribute("href")
      if (value) {
        try { return new URL(value, document.baseURI).href } catch { /* ignore */ }
      }
    }
    const image = [...document.querySelectorAll("main img, article img, header img")]
      .map((node) => node as HTMLImageElement)
      .find((img) => img.naturalWidth >= 500 && img.naturalHeight >= 220 && !/logo|icon|avatar|badge/i.test(`${img.alt} ${img.src}`))
    return image?.currentSrc || image?.src || ""
  }).catch(() => "")
}

async function dismissCommonOverlays(page: Page) {
  const labels = [/aceptar/i, /acepto/i, /accept all/i, /allow all/i, /continuar/i, /entendido/i]
  for (const label of labels) {
    const locator = page.getByRole("button", { name: label }).first()
    if (await locator.isVisible().catch(() => false)) {
      await locator.click({ timeout: 1000 }).catch(() => undefined)
      await page.waitForTimeout(250)
      break
    }
  }
}

async function captureTarget(page: Page, url: string) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 })
  await page.waitForTimeout(1200)
  await dismissCommonOverlays(page)
  const status = response?.status() ?? 0
  if (status === 404 || status === 410 || status >= 500) throw new Error(`HTTP ${status}`)

  const metaImage = await bestMetaImage(page)
  if (metaImage) {
    try {
      const buffer = await fetchBuffer(metaImage)
      return { buffer, source: "Imagen oficial / Open Graph", sourceUrl: metaImage, status }
    } catch {
      // Si la imagen remota bloquea hotlink, usamos una captura de la página oficial.
    }
  }

  const main = page.locator("main, [role=main], article").first()
  const screenshot = await (await main.isVisible().catch(() => false)
    ? main.screenshot({ type: "png", timeout: 10_000 }).catch(() => page.screenshot({ type: "png", fullPage: false }))
    : page.screenshot({ type: "png", fullPage: false }))
  return { buffer: Buffer.from(screenshot), source: "Captura de la fuente oficial", sourceUrl: page.url(), status }
}

async function captureCertification(browser: Browser, item: CertificationItem) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: item.language === "EN" ? "en-US" : "es-ES", deviceScaleFactor: 1 })
  try {
    const candidates = [item.url, item.catalogUrl]
    try {
      candidates.push(new URL(item.url).origin)
    } catch {
      // URL inválida: el actualizador la filtrará en la próxima auditoría.
    }
    const unique = [...new Set(candidates.filter(Boolean) as string[])]
    let lastError: unknown
    for (const target of unique) {
      try {
        return await captureTarget(page, target)
      } catch (error) {
        lastError = error
      }
    }
    throw lastError ?? new Error("No fue posible capturar ninguna fuente oficial")
  } finally {
    await page.close().catch(() => undefined)
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true })
  const raw = JSON.parse(await readFile(dataPath, "utf8")) as { items: CertificationItem[] }
  const items = raw.items ?? []
  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined })
  const queue = [...items]
  const manifest: Record<string, { src: string; source: string; sourceUrl: string; generatedAt: string; sha256: string }> = {}
  const audit: Array<Record<string, unknown>> = []

  const worker = async (workerId: number) => {
    while (queue.length) {
      const item = queue.shift()
      if (!item) return
      const filename = `${slugify(item.id)}.webp`
      const outPath = join(outputDir, filename)
      try {
        const result = await captureCertification(browser, item)
        await normalizeCover(result.buffer, outPath)
        const finalBuffer = await readFile(outPath)
        manifest[item.id] = {
          src: `/certification-covers-v1/${filename}`,
          source: result.source,
          sourceUrl: result.sourceUrl,
          generatedAt: new Date().toISOString(),
          sha256: createHash("sha256").update(finalBuffer).digest("hex"),
        }
        audit.push({ id: item.id, title: item.title, ok: true, source: result.source, status: result.status })
        console.log(`OK ${item.id} · ${result.source}`)
      } catch (error) {
        audit.push({ id: item.id, title: item.title, ok: false, message: error instanceof Error ? error.message : String(error) })
        console.log(`WARN ${item.id} · sin cover: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
    console.log(`worker ${workerId} terminado`)
  }

  try {
    await Promise.all(Array.from({ length: concurrency }, (_, index) => worker(index + 1)))
  } finally {
    await browser.close()
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8")
  await writeFile(auditPath, JSON.stringify({ generatedAt: new Date().toISOString(), total: items.length, ok: audit.filter((row) => row.ok).length, failed: audit.filter((row) => !row.ok).length, rows: audit }, null, 2), "utf8")
  console.log(`Covers certificaciones: ${Object.keys(manifest).length}/${items.length}`)
  console.log(`Manifest: ${manifestPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
