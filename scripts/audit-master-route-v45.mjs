import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { execFileSync } from "node:child_process"

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), "utf8")
const hash = (file) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex")
const gitBlob = (file) => execFileSync("git", ["rev-parse", `HEAD:${file}`], { encoding: "utf8" }).trim()
const ok = (message) => console.log(`OK  ${message}`)
const fail = (message) => { console.error(`FAIL ${message}`); process.exitCode = 1 }
const assert = (condition, message) => condition ? ok(message) : fail(message)

// Estos dos archivos ya existian antes de V44.
// Se validan por blob Git exacto para evitar falsos fallos por CRLF/LF entre Windows y Linux.
const protectedGitBlobs = {
  "src/roadmap-data.ts": "c66209af8843d1623daa866057ac68a0471b4b54",
  "src/mastery-data.ts": "ebc41387f675491d9cff7ec477280f020beb18a1",
}

const protectedFiles = {
  "src/v43/career-catalog-v43.ts": "418648a75bc9fa2094d3d2d41b5db5b12c1e62c150204c741ee378ab3ed21ad6",
  "src/v43/curriculum-v43.ts": "01ad647d906df58b496e917bd03d079edf88025e37e9c6b4f8530bf533851f40",
  "src/v44/curriculum-v44.ts": "3120e03e9787074728eafd20053b1bc000a437be24a504b060d7becfacb4664f",
}

console.log("\nCampus Maestro Â· AuditorÃ­a Ruta Maestra V45\n")

for (const [file, expected] of Object.entries(protectedGitBlobs)) {
  assert(fs.existsSync(path.join(root, file)), `${file} existe`)
  if (fs.existsSync(path.join(root, file))) {
    assert(gitBlob(file) === expected, `${file} conserva exactamente el contenido acadÃ©mico de V44`)
  }
}

for (const [file, expected] of Object.entries(protectedFiles)) {
  assert(fs.existsSync(path.join(root, file)), `${file} existe`)
  if (fs.existsSync(path.join(root, file))) {
    assert(hash(file) === expected, `${file} conserva exactamente el contenido acadÃ©mico de V44`)
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

assert(app.includes("MasterRouteV45") && app.includes("../v45/MasterRouteV45"), "#ruta estÃ¡ conectada a MasterRouteV45")
assert(master.includes("CinematicRoadV45") && master.includes("ReactFlow"), "V45 conserva vista inmersiva y mapa acadÃ©mico")
assert(master.includes("AulaModal") && master.includes("DetailPanel"), "aulas y panel de detalle siguen presentes")
assert(cinematic.includes("@react-three/fiber") && cinematic.includes("@react-three/drei") && cinematic.includes("three"), "Three.js + React Three Fiber + Drei estÃ¡n integrados")
assert(cinematic.includes("PerformanceMonitor") && cinematic.includes("AdaptiveDpr"), "la calidad grÃ¡fica se adapta al dispositivo")
assert(knowledge.includes("KnowledgeGraphV43") && knowledge.includes("ReviewEngineV43"), "dependencias y repaso FSRS siguen accesibles")

const stageCodes = [...roadmap.matchAll(/"code": "(S\d+)"/g)].map((m) => m[1])
const expectedStages = Array.from({ length: 20 }, (_, i) => `S${i}`)
assert(stageCodes.length === 20 && expectedStages.every((code) => stageCodes.includes(code)), "S0â€“S19 completos (20 etapas)")
const subjectCount = (roadmap.match(/\n\s+"name": /g) ?? []).length
assert(subjectCount >= 89, `materias troncales conservadas (${subjectCount})`)
const trackCodes = [...mastery.matchAll(/\bcode:\s*"(T\d+)"/g)].map((m) => m[1])
assert(trackCodes.length >= 12, `especializaciones conservadas (${trackCodes.length})`)

const arrayBody = career.split("export const careerCatalogV43 = [", 2)[1]?.split("\n]", 1)[0] ?? ""
const roles = [...arrayBody.matchAll(/^\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)].map((m) => JSON.parse(`"${m[1]}"`))
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim()
const normalizedRoles = roles.map(normalize)
assert(roles.length === 2221, `Ã­ndice profesional completo (${roles.length} perfiles)`)
assert(new Set(normalizedRoles).size === normalizedRoles.length, "Ã­ndice profesional sin duplicados normalizados")

const facultySection = curriculum.split("export const facultiesV43", 2)[1]?.split("export const computingErasV43", 1)[0] ?? ""
const facultyCount = (facultySection.match(/\{ id: "/g) ?? []).length
assert(facultyCount === 18, `18 Ã¡reas de dominio presentes (${facultyCount})`)
const gateSection = curriculum.split("export const evidenceGatesV43", 2)[1]?.split("export const grandChallengesV43", 1)[0] ?? ""
const gateCount = (gateSection.match(/\{ code: "G\d+"/g) ?? []).length
assert(gateCount >= 8, `pruebas de dominio conservadas (${gateCount})`)
const challengeSection = curriculum.split("export const grandChallengesV43", 2)[1] ?? ""
const challengeCount = (challengeSection.match(/\{ code: "X\d+"/g) ?? []).length
assert(challengeCount >= 10, `proyectos integradores conservados (${challengeCount})`)

if (process.exitCode) {
  console.error("\nLa auditorÃ­a encontrÃ³ diferencias. No publiques V45 hasta revisarlas.\n")
} else {
  console.log("\nOK  V45 conserva el contenido acadÃ©mico de V44 y aÃ±ade la nueva Ruta Maestra visual.\n")
}