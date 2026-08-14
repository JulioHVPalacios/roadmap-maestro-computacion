import { resources } from "../src/resources-data.ts"

const targets = resources.map((resource) => ({
  id: resource.id,
  title: resource.title,
  provider: resource.provider,
  url: resource.downloadUrl ?? resource.url,
}))

const timeoutMs = 12000
const concurrency = 10
const report = []

async function check(target) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    let response = await fetch(target.url, { method: "HEAD", redirect: "follow", signal: controller.signal })
    if (!response.ok || response.status === 405) response = await fetch(target.url, { method: "GET", redirect: "follow", signal: controller.signal })
    return { ...target, ok: response.ok, status: response.status, finalUrl: response.url }
  } catch (error) {
    return { ...target, ok: false, status: 0, error: error instanceof Error ? error.message : String(error) }
  } finally {
    clearTimeout(timer)
  }
}

async function run() {
  const queue = [...targets]
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const target = queue.shift()
      if (!target) return
      const result = await check(target)
      report.push(result)
      console.log(`${result.ok ? "OK" : "FAIL"} ${result.status} ${result.title}`)
    }
  })
  await Promise.all(workers)
  report.sort((a, b) => Number(b.ok) - Number(a.ok) || a.title.localeCompare(b.title, "es"))
  const json = JSON.stringify(report, null, 2)
  await Bun.write?.("./resources-link-report.json", json) ?? await import("node:fs/promises").then(fs => fs.writeFile("./resources-link-report.json", json, "utf8"))
  const failed = report.filter(item => !item.ok)
  console.log(`\nTotal: ${report.length}`)
  console.log(`Correctos: ${report.length - failed.length}`)
  console.log(`Fallidos: ${failed.length}`)
  console.log("Reporte: resources-link-report.json")
}

run()
