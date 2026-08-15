import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), "utf8")
const hash = (file) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex")
const ok = (message) => console.log(`OK  ${message}`)
const fail = (message) => { console.error(`FAIL ${message}`); process.exitCode = 1 }
const assert = (condition, message) => condition ? ok(message) : fail(message)

const protectedFiles = {
  "src/roadmap-data.ts": "ca90aaf503376b5571b9761f724ed5577d1904812ceb6209dd749b0f214345d9",
  "src/mastery-data.ts": "243cb32726be1eb26a866e543366a5359b8ed7a6ae3aba1f5a80661c8d96ddec",
  "src/v43/career-catalog-v43.ts": "418648a75bc9fa2094d3d2d41b5db5b12c1e62c150204c741ee378ab3ed21ad6",
  "src/v43/curriculum-v43.ts": "01ad647d906df58b496e917bd03d079edf88025e37e9c6b4f8530bf533851f40",
  "src/v44/curriculum-v44.ts": "3120e03e9787074728eafd20053b1bc000a437be24a504b060d7becfacb4664f",
}

console.log("\nCampus Maestro · Auditoría V45.3 Ruta Premium Definitiva\n")
for (const [file, expected] of Object.entries(protectedFiles)) {
  assert(fs.existsSync(path.join(root, file)), `${file} existe`)
  if (fs.existsSync(path.join(root, file))) assert(hash(file) === expected, `${file} conserva exactamente el conocimiento académico protegido`)
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
