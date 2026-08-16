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

// Los cinco archivos académicos se validan por blob Git del archivo de trabajo.
// `git hash-object --path` aplica la normalización de Git (incluido CRLF/LF),
// por lo que la comprobación es estable en Windows y Linux sin dejar de detectar
// cambios reales de contenido.
const protectedGitBlobs = {
  "src/roadmap-data.ts": "c66209af8843d1623daa866057ac68a0471b4b54",
  "src/mastery-data.ts": "ebc41387f675491d9cff7ec477280f020beb18a1",
  "src/v43/career-catalog-v43.ts": "2a8e8e756e7afbcce412e4cd2fe87f21c0942190",
  "src/v43/curriculum-v43.ts": "e38fa84b5e381c0416ae0dc7235b0159b2236c8b",
  "src/v44/curriculum-v44.ts": "fd6290e6afd0d25e56ba8e044ec2683a89b48a5b",
}

console.log("\nCampus Maestro · Auditoría Ruta Maestra V45\n")

for (const [file, expected] of Object.entries(protectedGitBlobs)) {
  const full = path.join(root, file)
  assert(fs.existsSync(full), `${file} existe`)
  if (fs.existsSync(full)) {
    assert(gitWorkingBlob(file) === expected, `${file} conserva exactamente el contenido académico de V44`)
  }
}

const app = read("src/v41/AppV41.tsx")
const master = read("src/v45/MasterRouteV45.tsx")
const cinematic = read("src/v45/CinematicRoadV45.tsx")
const knowledge = read("src/v45/AcademicCoverageV45.tsx")
const career = read("src/v43/career-catalog-v43.ts")
const roadmap = read("src/roadmap-data.ts")
const mastery = read("src/mastery-data.ts")
const curriculum = read("src/v43/curriculum-v43.ts")

assert(app.includes("MasterRouteV45") && app.includes("../v45/MasterRouteV45"), "#ruta está conectada a MasterRouteV45")
assert(master.includes("CinematicRoadV45") && master.includes("ReactFlow"), "V45 conserva vista inmersiva y mapa académico")
assert(master.includes("AulaModal") && master.includes("DetailPanel"), "aulas y panel de detalle siguen presentes")
assert(cinematic.includes("@react-three/fiber") && cinematic.includes("@react-three/drei") && cinematic.includes("three"), "Three.js + React Three Fiber + Drei están integrados")
assert(cinematic.includes("PerformanceMonitor") && cinematic.includes("AdaptiveDpr"), "la calidad gráfica se adapta al dispositivo")
assert(knowledge.includes("KnowledgeGraphV43") && knowledge.includes("ReviewEngineV43"), "dependencias y repaso FSRS siguen accesibles")

const stageCodes = [...roadmap.matchAll(/"code": "(S\d+)"/g)].map((m) => m[1])
const expectedStages = Array.from({ length: 20 }, (_, i) => `S${i}`)
assert(stageCodes.length === 20 && expectedStages.every((code) => stageCodes.includes(code)), "S0–S19 completos (20 etapas)")
const subjectCount = (roadmap.match(/\n\s+"name": /g) ?? []).length
assert(subjectCount >= 89, `materias troncales conservadas (${subjectCount})`)
const trackCodes = [...mastery.matchAll(/\bcode:\s*"(T\d+)"/g)].map((m) => m[1])
assert(trackCodes.length >= 12, `especializaciones conservadas (${trackCodes.length})`)

const arrayBody = career.split("export const careerCatalogV43 = [", 2)[1]?.split("\n]", 1)[0] ?? ""
const roles = [...arrayBody.matchAll(/^\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)].map((m) => JSON.parse(`"${m[1]}"`))
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim()
const normalizedRoles = roles.map(normalize)
assert(roles.length === 2221, `índice profesional completo (${roles.length} perfiles)`)
assert(new Set(normalizedRoles).size === normalizedRoles.length, "índice profesional sin duplicados normalizados")

const facultySection = curriculum.split("export const facultiesV43", 2)[1]?.split("export const computingErasV43", 1)[0] ?? ""
const facultyCount = (facultySection.match(/\{ id: "/g) ?? []).length
assert(facultyCount === 18, `18 áreas de dominio presentes (${facultyCount})`)
const gateSection = curriculum.split("export const evidenceGatesV43", 2)[1]?.split("export const grandChallengesV43", 1)[0] ?? ""
const gateCount = (gateSection.match(/\{ code: "G\d+"/g) ?? []).length
assert(gateCount >= 8, `pruebas de dominio conservadas (${gateCount})`)
const challengeSection = curriculum.split("export const grandChallengesV43", 2)[1] ?? ""
const challengeCount = (challengeSection.match(/\{ code: "X\d+"/g) ?? []).length
assert(challengeCount >= 10, `proyectos integradores conservados (${challengeCount})`)

if (process.exitCode) {
  console.error("\nLa auditoría encontró diferencias. No publiques V45 hasta revisarlas.\n")
} else {
  console.log("\nOK  V45 conserva el contenido académico de V44 y añade la nueva Ruta Maestra visual.\n")
}
