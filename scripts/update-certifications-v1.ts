import { chromium, type Browser, type Page } from "playwright"
import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import {
  certificationCatalogSources,
  certificationSeed,
  type CertificationCatalogSource,
  type CertificationCategory,
  type CertificationItem,
  type CertificationKind,
  type CertificationLanguage,
} from "../src/certifications-data"

const root = process.cwd()
const outputDir = join(root, "public", "certifications-v1")
const outputPath = join(outputDir, "certifications.json")
const auditPath = join(outputDir, "audit.json")
const now = new Date()
const verifiedAt = now.toISOString()
const VALIDATION_CONCURRENCY = 5
const COMMUNITY_LIMIT = 140

const communityDiscoverySources = [
  {
    id: "panx-awesome-certificates",
    url: "https://raw.githubusercontent.com/PanXProject/awesome-certificates/main/README.md",
    note: "GitHub · Awesome Certificates",
  },
  {
    id: "arslanym-free-certifications",
    url: "https://raw.githubusercontent.com/ArslanYM/Free-Certifications/main/README.md",
    note: "GitHub · Free-Certifications",
  },
  {
    id: "munchy-free-dev-certifications",
    url: "https://raw.githubusercontent.com/munchy-bytes/FreeDevCertifications/main/README.md",
    note: "GitHub · FreeDevCertifications",
  },
] as const

const trustedCommunityDomains = [
  "freecodecamp.org",
  "life-global.org",
  "skillsbuild.org",
  "academy.hubspot.com",
  "skillshop.withgoogle.com",
  "learn.microsoft.com",
  "graphacademy.neo4j.com",
  "kaggle.com",
  "hackerrank.com",
  "support.hackerrank.com",
  "netacad.com",
  "santanderopenacademy.com",
  "capacitacionlaboral.trabajo.gob.pe",
  "gob.pe",
  "capacitateparaelempleo.org",
  "open.edu",
  "learn.mongodb.com",
  "saylor.org",
  "learn.saylor.org",
  "training.fortinet.com",
  "learning.sap.com",
  "platzi.com",
  "university.gitlab.com",
  "skills.github.com",
  "education.github.com",
  "aws.amazon.com",
  "explore.skillbuilder.aws",
  "cloudskillsboost.google",
  "academy.postman.com",
  "learning.postman.com",
  "testautomationu.applitools.com",
  "cognitiveclass.ai",
  "academy.tigera.io",
  "university.atlassian.com",
  "academy.gatling.io",
  "knime.com",
  "learn.knime.com",
  "codefresh.io",
  "odyssey.apollographql.com",
  "academy.nirmata.io",
  "stepik.org",
  "sololearn.com",
] as const

const inactivePatterns = [
  /\bfinalizad[oa]s?\b/i,
  /\barchivad[oa]s?\b/i,
  /\barchived\b/i,
  /\bdeprecated\b/i,
  /\bno longer available\b/i,
  /\bcourse unavailable\b/i,
  /\bprogram unavailable\b/i,
  /\benrollment closed\b/i,
  /\binscripciones cerradas\b/i,
  /\bconvocatoria cerrada\b/i,
  /\bya no est[aá] disponible\b/i,
  /\bcontenido no disponible\b/i,
  /\bpage not found\b/i,
  /\bp[aá]gina no encontrada\b/i,
]

const positivePatterns = [
  /\bgratis\b/i,
  /\bgratuit[oa]\b/i,
  /\bfree\b/i,
  /\bcertific/i,
  /\bcredential/i,
  /\bbadge\b/i,
  /\binsignia\b/i,
  /\bcurso\b/i,
  /\bcourse\b/i,
  /\btraining\b/i,
]

const navigationTitlePatterns = [
  /^(?:contact|contact us|contacto|support|soporte|help|ayuda|faq|privacy|privacidad|terms|terminos|términos|conditions|condiciones)(?:\b|$)/i,
  /^(?:sign in|sign-in|signin|log in|log-in|login|register|registro|registrarse)(?:\b|$)/i,
  /^(?:social|discord|explore|explore now|browse all|view recordings|my learning|all learning|find your perfect fit|become a pro)(?:\b|$)/i,
  /^(?:live sessions?|hands-on practice|partners?|students?|estudiantes?|docentes?)(?:\b|$)/i,
]

const navigationUrlPatterns = [
  /\/(?:login|log-in|signin|sign-in|register|contact|support|help|privacy|terms)(?:[/?#]|$)/i,
  /\/(?:feedback|survey|esurvey|csat)(?:[/?#]|$)/i,
  /\/(?:discord|social)(?:[/?#]|$)/i,
]

const learningEvidencePatterns = [
  /\bcurso(?:s)?\b/i,
  /\bcourse(?:s)?\b/i,
  /\btraining\b/i,
  /\blearning\b/i,
  /\bcertific/i,
  /\bcredential/i,
  /\bbadge\b/i,
  /\binsignia\b/i,
  /\bskill(?:s)?\b/i,
  /\bmodule(?:s)?\b/i,
  /\blab(?:s)?\b/i,
  /\btutorial(?:es|s)?\b/i,
]

const freeEvidencePatterns = [
  /\b100\s*%\s*free\b/i,
  /\b100\s*%\s*gratuit/i,
  /\bcompletely free\b/i,
  /\bcompletamente gratis\b/i,
  /\bno cost\b/i,
  /\bat no cost\b/i,
  /\bfree to take\b/i,
  /\bfree to retake\b/i,
  /\bfree certificate\b/i,
  /\bcertificado gratuito\b/i,
  /\bcertificaci[oó]n gratuita\b/i,
  /\bcurso(?:s)? gratuito/i,
  /\bgratis\b/i,
  /\bgratuit[oa]\b/i,
  /\bfree\b/i,
]

const credentialEvidencePatterns = [
  /\bcertification\b/i,
  /\bcertificate\b/i,
  /\bcertificaci[oó]n\b/i,
  /\bcertificado\b/i,
  /\bcredential\b/i,
  /\bcredencial\b/i,
  /\bbadge\b/i,
  /\binsignia\b/i,
]

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function slugify(value: string) {
  return normalize(value).replace(/\s+/g, "-").replace(/^-|-$/g, "").slice(0, 110)
}

function matchesIncludeTerm(haystack: string, rawTerm: string) {
  const term = normalize(rawTerm)
  if (!term) return false
  if (term.length <= 3 && !term.includes(" ")) {
    return new RegExp(`(?:^|\\s)${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|\\s)`, "i").test(haystack)
  }
  return haystack.includes(term)
}

function looksLikeNavigation(title: string, url: string) {
  const cleanTitle = title.replace(/\s+/g, " ").trim()
  if (navigationTitlePatterns.some((rx) => rx.test(cleanTitle))) return true
  return navigationUrlPatterns.some((rx) => rx.test(url))
}

function hasLearningEvidence(title: string, text: string) {
  const sample = `${title}\n${text.slice(0, 80_000)}`
  return learningEvidencePatterns.some((rx) => rx.test(sample))
}

function canonicalUrl(value: string) {
  try {
    const url = new URL(value)
    url.hash = ""
    ;[...url.searchParams.keys()].forEach((key) => {
      if (/^(utm_|ref$|source$|campaign$|mc_|trk$|fbclid$|gclid$)/i.test(key)) url.searchParams.delete(key)
    })
    return url.toString().replace(/\/$/, "")
  } catch {
    return value.trim().replace(/[?#].*$/, "").replace(/\/$/, "")
  }
}

function isExpired(item: CertificationItem) {
  if (!item.expiresAt) return false
  const expiry = new Date(`${item.expiresAt}T23:59:59Z`)
  return Number.isFinite(expiry.getTime()) && expiry.getTime() < now.getTime()
}

function inferCategory(title: string, fallback: CertificationCategory): CertificationCategory {
  const h = normalize(title)
  if (/python|javascript|typescript|java|program|developer|web|html|css|react|angular|node|php|android|flutter|coding|full stack|frontend|backend/.test(h)) return "Programación y web"
  if (/data|datos|ai|ia|inteligencia artificial|machine learning|analytics|analitica|power bi|big data|generative|copilot|neo4j|graph/.test(h)) return "Datos e IA"
  if (/cyber|ciber|security|seguridad|threat|amenaza|ethical hack|fortinet/.test(h)) return "Ciberseguridad"
  if (/cloud|aws|azure|devops|docker|kubernetes|terraform|sre|gitlab|github actions/.test(h)) return "Cloud y DevOps"
  if (/network|redes|linux|it support|soporte ti|hardware|packet tracer|iot/.test(h)) return "Redes y TI"
  if (/excel|word|office|digital skills|productividad|powerpoint|herramientas digitales|power automate|power apps/.test(h)) return "Productividad digital"
  if (/marketing|ventas|sales|seo|inbound|contenido|content|social media|negocio|business|crm|automation|google ads|meta blueprint/.test(h)) return "Marketing y negocio"
  return fallback
}

function inferLanguage(text: string, url: string): CertificationLanguage {
  const h = `${normalize(text)} ${url.toLowerCase()}`
  if (/\/es(?:-|\/)|\/espanol|es-419|es_es|es-es|español|espanol| certificado | certificacion | curso gratuito | cursos gratis /.test(` ${h} `)) return "ES"
  return "EN"
}

function inferKind(text: string): CertificationKind {
  const h = normalize(text)
  if (/badge|insignia/.test(h)) return "Insignia"
  if (/credential|credencial|applied skills/.test(h)) return "Credencial"
  if (/certification|certificacion|certified/.test(h)) return "Certificación"
  if (/certificate|certificado/.test(h)) return "Curso con certificado"
  return "Curso gratuito"
}

function providerForUrl(value: string) {
  try {
    const host = new URL(value).hostname.replace(/^www\./, "").toLowerCase()
    const known: Array<[RegExp, string]> = [
      [/freecodecamp/, "freeCodeCamp"], [/life-global/, "HP LIFE"], [/skillsbuild/, "IBM SkillsBuild"],
      [/hubspot/, "HubSpot Academy"], [/withgoogle/, "Google Skillshop"], [/learn\.microsoft/, "Microsoft Learn"],
      [/neo4j/, "Neo4j GraphAcademy"], [/kaggle/, "Kaggle"], [/hackerrank/, "HackerRank"],
      [/netacad/, "Cisco Networking Academy"], [/santanderopenacademy/, "Santander Open Academy"],
      [/platzi/, "Platzi"], [/gitlab/, "GitLab University"], [/github/, "GitHub"], [/mongodb/, "MongoDB University"],
      [/fortinet/, "Fortinet Training Institute"], [/saylor/, "Saylor University"], [/open\.edu/, "The Open University"],
      [/sap/, "SAP Learning"], [/postman/, "Postman Academy"], [/applitools/, "Test Automation University"],
      [/cognitiveclass/, "Cognitive Class"], [/tigera/, "Tigera Academy"], [/atlassian/, "Atlassian University"],
      [/knime/, "KNIME"], [/codefresh/, "Codefresh"], [/apollo/, "Apollo Odyssey"], [/aws/, "AWS"],
      [/cloudskillsboost/, "Google Cloud Skills Boost"], [/capacitateparaelempleo/, "Fundación Carlos Slim"],
    ]
    return known.find(([rx]) => rx.test(host))?.[1] ?? host
  } catch {
    return "Fuente oficial"
  }
}

function trustedCommunityUrl(value: string) {
  try {
    const hostname = new URL(value).hostname.toLowerCase()
    return trustedCommunityDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

function allowedDomain(url: string, source: CertificationCatalogSource) {
  try {
    const hostname = new URL(url).hostname.toLocaleLowerCase()
    return source.domains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

function usefulAnchor(title: string, href: string, source: CertificationCatalogSource) {
  if (!title || title.length < 4 || title.length > 180) return false
  if (!allowedDomain(href, source)) return false
  const h = normalize(`${title} ${href}`)
  if (source.exclude?.some((term) => h.includes(normalize(term)))) return false
  if (source.pathHints?.length) {
    try {
      const pathname = new URL(href).pathname
      if (!source.pathHints.some((hint) => pathname.includes(hint))) return false
    } catch {
      return false
    }
  }
  if (looksLikeNavigation(title, href)) return false
  return source.include.some((term) => matchesIncludeTerm(h, term)) || positivePatterns.some((rx) => rx.test(title))
}

async function pageText(page: Page) {
  try {
    return (await page.locator("body").innerText({ timeout: 5000 })).slice(0, 220_000)
  } catch {
    return ""
  }
}

async function inspectUrl(browser: Browser, url: string) {
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 }, locale: "es-ES" })
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25_000 })
    await page.waitForTimeout(700)
    const status = response?.status() ?? 0
    const finalUrl = page.url()
    const title = (await page.title().catch(() => "")).trim()
    const text = await pageText(page)
    const definitelyInactive = status === 404 || status === 410 || inactivePatterns.some((rx) => rx.test(text.slice(0, 70_000)))
    return { status, finalUrl, title, text, definitelyInactive, ok: status > 0 && status < 500 }
  } catch (error) {
    return { status: 0, finalUrl: url, title: "", text: "", definitelyInactive: false, ok: false, error: error instanceof Error ? error.message : String(error) }
  } finally {
    await page.close().catch(() => undefined)
  }
}

async function discoverFromSource(browser: Browser, source: CertificationCatalogSource) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: source.language === "EN" ? "en-US" : "es-ES" })
  try {
    const response = await page.goto(source.url, { waitUntil: "domcontentloaded", timeout: 30_000 })
    await page.waitForTimeout(1900)
    if ((response?.status() ?? 0) >= 500) return []

    const anchors = await page.locator("a[href]").evaluateAll((nodes) => nodes.map((node) => {
      const anchor = node as HTMLAnchorElement
      return { title: (anchor.innerText || anchor.textContent || "").replace(/\s+/g, " ").trim(), href: anchor.href }
    }))

    const seen = new Set<string>()
    const output: CertificationItem[] = []
    for (const anchor of anchors) {
      if (!usefulAnchor(anchor.title, anchor.href, source)) continue
      const url = canonicalUrl(anchor.href)
      if (seen.has(url)) continue
      seen.add(url)
      output.push({
        id: `live-${source.id}-${slugify(anchor.title)}`,
        title: anchor.title,
        provider: source.provider,
        description: `Opción detectada automáticamente en el catálogo oficial de ${source.provider}. Campus Maestro comprueba el enlace antes de publicarlo.`,
        category: inferCategory(anchor.title, source.category),
        language: source.language,
        kind: source.kind,
        url,
        catalogUrl: source.url,
        tags: Array.from(new Set([source.provider, ...source.include.filter((term) => normalize(anchor.title).includes(normalize(term))).slice(0, 4)])),
        courseFree: source.courseFree,
        credentialFree: source.credentialFree,
        credentialLabel: source.credentialLabel,
        level: "Todos",
        sourceType: "discovered",
        verifiedAt,
        status: "unknown",
      })
      if (output.length >= source.maxItems) break
    }
    return output
  } catch {
    return []
  } finally {
    await page.close().catch(() => undefined)
  }
}

async function fetchText(url: string, timeoutMs = 20_000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "user-agent": "CampusMaestro/1.0 certification-discovery" },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.text()
  } finally {
    clearTimeout(timer)
  }
}

function extractLinksFromCommunityMarkdown(markdown: string) {
  const results: Array<{ title: string; url: string }> = []
  const add = (title: string, url: string) => {
    const cleanTitle = title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    const cleanUrl = url.replace(/&amp;/g, "&").trim()
    if (!/^https?:\/\//i.test(cleanUrl) || cleanTitle.length < 3) return
    results.push({ title: cleanTitle.slice(0, 180), url: canonicalUrl(cleanUrl) })
  }

  for (const match of markdown.matchAll(/\[([^\]]{3,220})\]\((https?:\/\/[^\s)]+)\)/g)) add(match[1], match[2])
  for (const match of markdown.matchAll(/<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) add(match[2], match[1])

  const seen = new Set<string>()
  return results.filter((item) => {
    if (!trustedCommunityUrl(item.url) || seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })
}

async function communityCandidates() {
  const rows: Array<{ source: string; title: string; url: string }> = []
  for (const source of communityDiscoverySources) {
    try {
      const markdown = await fetchText(source.url)
      for (const link of extractLinksFromCommunityMarkdown(markdown)) rows.push({ source: source.note, ...link })
    } catch (error) {
      console.warn(`WARN ${source.id}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  const seen = new Set<string>()
  return rows.filter((row) => {
    const key = canonicalUrl(row.url)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(0, COMMUNITY_LIMIT)
}

function hasFreeCredentialEvidence(title: string, text: string) {
  const sample = `${title}\n${text.slice(0, 100_000)}`
  return freeEvidencePatterns.some((rx) => rx.test(sample)) && credentialEvidencePatterns.some((rx) => rx.test(sample))
}

function descriptionFromOfficialPage(provider: string, title: string, text: string) {
  const clean = text.replace(/\s+/g, " ").trim()
  const snippet = clean.slice(0, 230)
  return snippet.length >= 70
    ? `${provider}: ${snippet}${clean.length > snippet.length ? "…" : ""}`
    : `Credencial o curso gratuito detectado en una fuente comunitaria y revalidado en la página oficial de ${provider}.`
}

async function verifyCommunityCandidate(browser: Browser, candidate: { source: string; title: string; url: string }) {
  const checked = await inspectUrl(browser, candidate.url)
  if (!checked.ok || checked.definitelyInactive) return { item: null, audit: { ...candidate, status: "rejected", reason: checked.definitelyInactive ? "inactive" : "unreachable", httpStatus: checked.status } }
  const officialTitle = checked.title || candidate.title
  if (!hasFreeCredentialEvidence(`${candidate.title} ${officialTitle}`, checked.text)) {
    return { item: null, audit: { ...candidate, status: "rejected", reason: "no-free-credential-evidence", httpStatus: checked.status, finalUrl: checked.finalUrl } }
  }
  const provider = providerForUrl(checked.finalUrl)
  const combined = `${candidate.title} ${officialTitle} ${checked.text.slice(0, 10_000)}`
  const language = inferLanguage(combined, checked.finalUrl)
  const kind = inferKind(combined)
  const title = candidate.title.length >= 5 ? candidate.title : officialTitle
  const item: CertificationItem = {
    id: `community-${slugify(provider)}-${slugify(title)}`,
    title,
    provider,
    description: descriptionFromOfficialPage(provider, title, checked.text),
    category: inferCategory(combined, "Fundamentos y empleabilidad"),
    language,
    kind,
    url: canonicalUrl(checked.finalUrl),
    tags: Array.from(new Set([provider, "verificado", "gratis", kind])).slice(0, 4),
    courseFree: true,
    credentialFree: true,
    credentialLabel: kind === "Insignia" ? "Insignia gratuita verificada" : "Credencial/certificado gratuito verificado",
    level: "Todos",
    sourceType: "community-verified",
    verifiedAt,
    status: "active",
  }
  return { item, audit: { ...candidate, status: "accepted", provider, kind, language, httpStatus: checked.status, finalUrl: checked.finalUrl } }
}

async function mapConcurrent<T, R>(input: T[], concurrency: number, fn: (value: T, index: number) => Promise<R>) {
  const results = new Array<R>(input.length)
  let cursor = 0
  const worker = async () => {
    while (true) {
      const index = cursor++
      if (index >= input.length) return
      results[index] = await fn(input[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, Math.max(input.length, 1)) }, worker))
  return results
}

function dedupe(input: CertificationItem[]) {
  const urls = new Set<string>()
  const titleProvider = new Set<string>()
  const output: CertificationItem[] = []
  for (const item of input) {
    const urlKey = canonicalUrl(item.url)
    const titleKey = `${slugify(item.title)}|${slugify(item.provider)}`
    if (urls.has(urlKey) || titleProvider.has(titleKey)) continue
    urls.add(urlKey)
    titleProvider.add(titleKey)
    output.push(item)
  }
  return output
}

async function verifyDiscovered(browser: Browser, items: CertificationItem[]) {
  const rows = await mapConcurrent(items, VALIDATION_CONCURRENCY, async (item) => {
    const checked = await inspectUrl(browser, item.url)
    if (!checked.ok || checked.definitelyInactive) {
      return { item: null, audit: { id: item.id, sourceType: item.sourceType, url: item.url, status: checked.definitelyInactive ? "inactive" : "unreachable", httpStatus: checked.status } }
    }

    const finalUrl = canonicalUrl(checked.finalUrl || item.url)
    const titleForChecks = `${item.title} ${checked.title}`.trim()
    if (looksLikeNavigation(titleForChecks, finalUrl)) {
      return { item: null, audit: { id: item.id, sourceType: item.sourceType, url: item.url, finalUrl, status: "rejected", reason: "navigation-or-account-page", httpStatus: checked.status } }
    }
    if (!hasLearningEvidence(titleForChecks, checked.text)) {
      return { item: null, audit: { id: item.id, sourceType: item.sourceType, url: item.url, finalUrl, status: "rejected", reason: "no-learning-evidence", httpStatus: checked.status } }
    }

    const next: CertificationItem = { ...item, url: finalUrl, status: "active", verifiedAt }
    return { item: next, audit: { id: item.id, sourceType: item.sourceType, url: item.url, finalUrl: next.url, status: "active", httpStatus: checked.status } }
  })
  return {
    items: rows.flatMap((row) => row.item ? [row.item] : []),
    audit: rows.map((row) => row.audit),
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true })
  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined })
  const audit: Array<Record<string, unknown>> = []
  try {
    const activeSeed: CertificationItem[] = []
    for (const seed of certificationSeed) {
      if (isExpired(seed)) {
        audit.push({ id: seed.id, url: seed.url, status: "expired", reason: seed.expiresAt })
        continue
      }
      const checked = await inspectUrl(browser, seed.url)
      const itemStatus: CertificationItem["status"] = checked.definitelyInactive ? "inactive" : checked.ok ? "active" : "unknown"
      audit.push({ id: seed.id, sourceType: "seed", url: seed.url, httpStatus: checked.status, finalUrl: checked.finalUrl, status: itemStatus, error: checked.error })
      if (checked.definitelyInactive) continue
      activeSeed.push({ ...seed, url: checked.finalUrl || seed.url, verifiedAt, status: itemStatus })
    }

    const officialLists = await Promise.all(certificationCatalogSources.map((source) => discoverFromSource(browser, source)))
    const officialRaw = dedupe(officialLists.flat())
    const officialVerified = await verifyDiscovered(browser, officialRaw)
    audit.push(...officialVerified.audit)

    const communityRaw = await communityCandidates()
    const communityRows = await mapConcurrent(communityRaw, VALIDATION_CONCURRENCY, (candidate) => verifyCommunityCandidate(browser, candidate))
    const communityVerified = communityRows.flatMap((row) => row.item ? [row.item] : [])
    audit.push(...communityRows.map((row) => ({ sourceType: "community", ...row.audit })))

    const candidates = dedupe([...activeSeed, ...officialVerified.items, ...communityVerified])
    const languagePriority: Record<CertificationItem["language"], number> = { ES: 0, "ES/EN": 1, EN: 2 }
    const sourcePriority: Record<NonNullable<CertificationItem["sourceType"]>, number> = { seed: 0, discovered: 1, "community-verified": 2 }
    const output = candidates
      .filter((item) => item.status !== "inactive")
      .sort((a, b) => languagePriority[a.language] - languagePriority[b.language]
        || Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        || Number(b.credentialFree) - Number(a.credentialFree)
        || Number(b.courseFree) - Number(a.courseFree)
        || sourcePriority[a.sourceType ?? "seed"] - sourcePriority[b.sourceType ?? "seed"]
        || a.provider.localeCompare(b.provider, "es")
        || a.title.localeCompare(b.title, "es"))

    await writeFile(outputPath, JSON.stringify({
      generatedAt: verifiedAt,
      total: output.length,
      spanishFirst: true,
      discoveryEngines: {
        officialCatalogs: certificationCatalogSources.length,
        communitySources: communityDiscoverySources.map((source) => source.note),
        rule: "Los agregadores comunitarios solo descubren candidatos; el recurso se publica únicamente después de revalidar la página oficial y detectar evidencia de gratuidad + credencial.",
      },
      items: output,
    }, null, 2), "utf8")

    await writeFile(auditPath, JSON.stringify({
      generatedAt: verifiedAt,
      seed: certificationSeed.length,
      officialDiscoveredRaw: officialRaw.length,
      officialValidated: officialVerified.items.length,
      communityCandidates: communityRaw.length,
      communityValidated: communityVerified.length,
      published: output.length,
      audit,
    }, null, 2), "utf8")

    console.log(`Certificaciones V38: ${output.length} publicadas.`)
    console.log(`Base activa: ${activeSeed.length}. Descubiertas oficiales validadas: ${officialVerified.items.length}. Comunidad revalidada: ${communityVerified.length}.`)
    console.log(`JSON: ${outputPath}`)
    console.log(`Auditoría: ${auditPath}`)
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
