import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), "utf8")
const gitWorkingBlob = (file) => execFileSync(
  "git",
  ["-c", "core.autocrlf=true", "hash-object", `--path=${file}`, file],
  { cwd: root, encoding: "utf8" },
).trim()
const ok = (message) => console.log(`OK  ${message}`)
const fail = (message) => { console.error(`FAIL ${message}`); process.exitCode = 1 }
const assert = (condition, message) => condition ? ok(message) : fail(message)

// Los cinco archivos académicos protegidos se validan como blobs Git del archivo
// de trabajo. `git hash-object --path` aplica la normalización configurada por
// Git (incluido CRLF/LF), por lo que la auditoría es estable en Windows/Linux
// y sigue detectando cualquier cambio real de contenido.
const protectedGitBlobs = {
  "src/roadmap-data.ts": "c66209af8843d1623daa866057ac68a0471b4b54",
  "src/mastery-data.ts": "ebc41387f675491d9cff7ec477280f020beb18a1",
  "src/v43/career-catalog-v43.ts": "2a8e8e756e7afbcce412e4cd2fe87f21c0942190",
  "src/v43/curriculum-v43.ts": "e38fa84b5e381c0416ae0dc7235b0159b2236c8b",
  "src/v44/curriculum-v44.ts": "fd6290e6afd0d25e56ba8e044ec2683a89b48a5b",
}

console.log("\nCampus Maestro · Auditoría V45.3 Ruta Premium Definitiva\n")
for (const [file, expected] of Object.entries(protectedGitBlobs)) {
  const full = path.join(root, file)
  assert(fs.existsSync(full), `${file} existe`)
  if (fs.existsSync(full)) {
    assert(
      gitWorkingBlob(file) === expected,
      `${file} conserva exactamente el conocimiento académico protegido`,
    )
  }
}

const cinematic = read("src/v45/CinematicRoadV45.tsx")
const css = read("src/v45/route-v45.css")
const app = read("src/v41/AppV41.tsx")
const master = read("src/v45/MasterRouteV45.tsx")
const roadmap = read("src/roadmap-data.ts")
const mastery = read("src/mastery-data.ts")
const career = read("src/v43/career-catalog-v43.ts")

assert(app.includes("MasterRouteV45"), "#ruta sigue conectada a MasterRouteV45")
assert(master.includes("CinematicRoadV45") && master.includes("ReactFlow"), "ruta inmersiva y mapa académico siguen coexistiendo")
assert(cinematic.includes("ContinuousRoad") && cinematic.includes("buildRibbonGeometry"), "carretera continua curvada premium presente")
assert(cinematic.includes("ACESFilmicToneMapping") && cinematic.includes("PCFSoftShadowMap"), "tone mapping cinematográfico y sombras suaves activos")
assert(cinematic.includes('type TimeOfDay = "day" | "sunset" | "night"'), "ambientes Día / Atardecer / Noche presentes")
assert(cinematic.includes("ModernBuilding") && cinematic.includes("RoadsideDetails"), "distritos, vegetación e iluminación urbana presentes")
assert(cinematic.includes("MovingShuttle") && cinematic.includes("GuardRails"), "tráfico dinámico y guardarraíles presentes")
assert(cinematic.includes("PerformanceMonitor") && cinematic.includes("AdaptiveDpr"), "calidad adaptativa conservada")
assert(cinematic.includes("CameraMode") && cinematic.includes("Vista aérea"), "cámara cinematográfica y aérea disponibles")
assert(css.includes("V45.3 · Ruta Premium Definitiva"), "acabado visual premium cargado")

const stageCodes = [...roadmap.matchAll(/"code": "(S\d+)"/g)].map((m) => m[1])
assert(stageCodes.length === 20, `S0–S19 completos (${stageCodes.length})`)
const subjectCount = (roadmap.match(/\n\s+"name": /g) ?? []).length
assert(subjectCount >= 89, `materias troncales conservadas (${subjectCount})`)
const trackCodes = [...mastery.matchAll(/\bcode:\s*"(T\d+)"/g)].map((m) => m[1])
assert(trackCodes.length >= 12, `especializaciones conservadas (${trackCodes.length})`)
const arrayBody = career.split("export const careerCatalogV43 = [", 2)[1]?.split("\n]", 1)[0] ?? ""
const roles = [...arrayBody.matchAll(/^\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)].map((m) => JSON.parse(`"${m[1]}"`))
assert(roles.length === 2221, `índice profesional completo (${roles.length})`)

if (process.exitCode) {
  console.error("\nLa auditoría premium encontró diferencias. No publiques esta versión.\n")
} else {
  console.log("\nOK  V45.3 Premium conserva el conocimiento y eleva solamente la experiencia inmersiva.\n")
}
