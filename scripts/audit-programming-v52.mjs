import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), "utf8")
const ok = (message) => console.log(`OK  ${message}`)
const fail = (message) => { console.error(`FAIL ${message}`); process.exitCode = 1 }
const assert = (condition, message) => condition ? ok(message) : fail(message)

const hubBridge = read("src/v41/ProgrammingHubV41.tsx")
const hub = read("src/v52/ProgrammingAcademyHubV52.tsx")
const classroom = read("src/v52/ProgrammingClassroomV52.tsx")
const studio = read("src/v52/CampusCodeStudioV52.tsx")
const curriculum = read("src/v51/programming-curriculum-v51.ts")
const sources = read("src/v51/programming-sources-v51.ts")
const css = read("src/v52/programming-v52.css")

console.log("\nCampus Maestro · Auditoría Programación V52.5\n")

assert(hubBridge.includes("../v52/ProgrammingAcademyHubV52"), "Programación delega en la experiencia V52")

const publicUi = `${hub}\n${classroom}`
const forbiddenMeta = [
  /No hay juegos/i,
  /\bXP\b/,
  /misiones decorativas/i,
  /gamificaci[oó]n/i,
  /versi[oó]n(?:es)? anterior(?:es)?/i,
  /parche(?:s)? anterior(?:es)?/i,
  /elaborad[oa].{0,40}(?:IA|inteligencia artificial)/i,
  /generad[oa].{0,40}(?:IA|inteligencia artificial)/i,
]
assert(!forbiddenMeta.some((pattern) => pattern.test(publicUi)), "la interfaz pública evita textos meta sobre versiones, gamificación o autoría técnica")
assert(!classroom.includes("ProgrammingQuest") && !classroom.includes("Blockly") && !classroom.includes("ProgrammingGameArena"), "el aula visible mantiene una experiencia docente unificada")
assert(studio.includes('from "monaco-editor"'), "Monaco Editor está integrado como editor principal")
assert(
  !studio.includes("monaco.languages.typescript") &&
  studio.includes("monaco.typescript.javascriptDefaults") &&
  studio.includes("monaco.typescript.ScriptTarget.ESNext") &&
  !studio.includes("ScriptTarget.ES2022"),
  "Monaco 0.55 usa namespace actual y ScriptTarget.ESNext compatible"
)
assert(studio.includes('from "@xterm/xterm"') && studio.includes('from "@xterm/addon-fit"'), "xterm.js está integrado como terminal interactiva")
assert(studio.includes('case "run"') && studio.includes('case "test"') && studio.includes('case "open"') && studio.includes('case "cat"'), "la terminal dispone de comandos funcionales de laboratorio")
assert(studio.includes("runJavaScript") && studio.includes("loadPyodideRuntime"), "JavaScript y Python pueden ejecutarse desde el entorno")
assert(studio.includes("monaco.editor.getModelMarkers") && studio.includes("v52-problems-panel"), "el entorno muestra diagnósticos y problemas del editor/runtime")
assert(studio.includes('matchMedia("(pointer: coarse)")') && studio.includes("v52-mobile-editor"), "existe editor funcional de respaldo para pantallas táctiles")
assert(classroom.includes("studioRef.current?.focusLine") && classroom.includes("studioRef.current?.runTests"), "la explicación está conectada directamente con Code Studio")
assert(css.includes("v52-hero-workstation") && css.includes("v52-studio-workbench") && css.includes("v52-statusbar"), "la composición visual incluye workstation, workbench y status bar")
assert(hub.includes("ProceduralBackdrop") && css.includes("--v52-campus-paper") && css.includes("--v52-campus-lime"), "la sección hereda la identidad visual y el fondo dinámico de Campus Maestro")

const levelsMatch = curriculum.match(/export const programmingLevelsV51: ProgrammingLevelV51\[\] = (\[[\s\S]*?\])\n\nexport const getProgrammingLevelV51/)
let parsedLevels = []
try { parsedLevels = levelsMatch ? JSON.parse(levelsMatch[1]) : [] } catch { parsedLevels = [] }
const levelCodes = parsedLevels.map((level) => level.code)
const expectedLevels = Array.from({ length: 48 }, (_, index) => `L${String(index).padStart(2, "0")}`)
assert(levelCodes.length === 48 && new Set(levelCodes).size === 48 && expectedLevels.every((code) => levelCodes.includes(code)), `L00–L47 presentes (${levelCodes.length} niveles detectados)`)

const conceptPositions = parsedLevels.flatMap((level) => (level.topics ?? []).map((topic) => `${level.code}:${topic.id}`))
assert(conceptPositions.length === 192 && new Set(conceptPositions).size === 192, `currículo mantiene 192 conceptos posicionados sin duplicados dentro de su nivel (${conceptPositions.length})`)
assert(curriculum.toLocaleLowerCase("es").includes("cero absoluto") || curriculum.toLocaleLowerCase("es").includes("antes de programar"), "el recorrido conserva entrada desde cero absoluto")
assert(curriculum.toLocaleLowerCase("es").includes("compil") && curriculum.toLocaleLowerCase("es").includes("sistemas"), "el recorrido conserva sistemas y compiladores")

const requiredSourceIds = ["cs2023", "swebok", "openfing", "ossu-cs", "fing-plan-2025"]
assert(requiredSourceIds.every((id) => sources.includes(`id: "${id}"`)), "las fuentes base académicas permanecen registradas")
assert(sources.includes("libros-programacion-gratis") && sources.includes("free-programming-books"), "las bibliotecas abiertas permanecen registradas")

if (process.exitCode) {
  console.error("\nLa auditoría de Programación V52.5 encontró diferencias. No publiques esta versión.\n")
} else {
  console.log("\nOK  V52.5 integra enseñanza, editor real, terminal y diagnóstico en una sola experiencia.\n")
}
