import fs from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const upstream = [
  "https://raw.githubusercontent.com/EbookFoundation/free-programming-books/main/books/free-programming-books-es.md",
  "https://raw.githubusercontent.com/EbookFoundation/free-programming-books/main/courses/free-courses-es.md",
  "https://raw.githubusercontent.com/EbookFoundation/free-programming-books/main/casts/free-podcasts-screencasts-es.md",
  "https://raw.githubusercontent.com/midudev/libros-programacion-gratis/main/README.md",
]

const timeoutMs = 12000
const concurrency = 12

function extractUrls(text) {
  const urls = new Set()
  for (const match of text.matchAll(/https?:\/\/[^\s"'<>)}\]]+/g)) {
    const url = match[0].replace(/[.,;:]+$/, "")
    if (!url.includes("localhost")) urls.add(url)
  }
  return [...urls]
}

async function fetchText(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.text()
  } finally {
    clearTimeout(timer)
  }
}

async function checkUrl(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  const started = Date.now()
  try {
    let response
    try {
      response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "CampusMaestroResourceAudit/32" },
      })
    } catch {
      response = null
    }

    if (!response || response.status === 405 || response.status >= 500) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "CampusMaestroResourceAudit/32",
          range: "bytes=0-1024",
        },
      })
    }

    const status = response.status
    const ok = status >= 200 && status < 400
    const blocked = status === 401 || status === 403 || status === 429
    return {
      url,
      ok,
      blocked,
      status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type"),
      ms: Date.now() - started,
    }
  } catch (error) {
    return {
      url,
      ok: false,
      blocked: false,
      status: 0,
      error: error instanceof Error ? error.message : String(error),
      ms: Date.now() - started,
    }
  } finally {
    clearTimeout(timer)
  }
}

async function collectUrls() {
  const urls = new Set()

  for (const relative of ["src/resources-data.ts", "src/resources-expanded-es.ts"]) {
    try {
      const text = await fs.readFile(path.join(root, relative), "utf8")
      extractUrls(text).forEach((url) => urls.add(url))
    } catch {}
  }

  for (const source of upstream) {
    try {
      const text = await fetchText(source)
      extractUrls(text).forEach((url) => urls.add(url))
    } catch (error) {
      console.warn(`No se pudo leer fuente: ${source}`, error instanceof Error ? error.message : error)
    }
  }

  return [...urls]
}

async function main() {
  const urls = await collectUrls()
  console.log(`Auditando ${urls.length} URLs únicas...`)

  const queue = [...urls]
  const report = []
  let done = 0

  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const url = queue.shift()
      if (!url) return
      const result = await checkUrl(url)
      report.push(result)
      done += 1
      const label = result.ok ? "OK" : result.blocked ? "BLOCK" : "FAIL"
      console.log(`[${done}/${urls.length}] ${label} ${result.status} ${url}`)
    }
  })

  await Promise.all(workers)
  report.sort((a, b) => Number(b.ok) - Number(a.ok) || Number(a.blocked) - Number(b.blocked) || a.url.localeCompare(b.url))

  await fs.mkdir(path.join(root, "docs"), { recursive: true })
  await fs.writeFile(path.join(root, "docs/resource-link-audit-v32.json"), JSON.stringify({ generatedAt: new Date().toISOString(), total: report.length, report }, null, 2))

  const summary = {
    total: report.length,
    ok: report.filter((item) => item.ok).length,
    blocked: report.filter((item) => item.blocked).length,
    failed: report.filter((item) => !item.ok && !item.blocked).length,
  }
  console.log("\nResumen:", summary)
  console.log("Reporte: docs/resource-link-audit-v32.json")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
