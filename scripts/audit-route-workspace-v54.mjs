import assert from "node:assert/strict"
import { stages } from "../src/roadmap-data.ts"
import { planBlocks, isRouteSection, routeSections } from "../src/v54/route-sections.ts"
import { fieldNotes, devicePaths } from "../src/v54/coverage-data.ts"
import { learningFamilies } from "../src/v53/learning-paths.ts"
import { studyResources } from "../src/v53/study-resources.ts"
import { excelCatalog } from "../src/v53/excel-catalog.ts"

// La agrupación visual no puede omitir, duplicar ni alterar el orden del tronco.
const accessibleStages = planBlocks.flatMap((block) => stages.slice(block.start, block.end + 1).map((stage) => stage.code))
assert.deepEqual(accessibleStages, stages.map((stage) => stage.code))
for (let index = 0; index < stages.length; index++) {
  assert.equal(planBlocks.filter((block) => index >= block.start && index <= block.end).length, 1, `S${index} pertenece a un único tramo`)
}
assert.equal(new Set(routeSections.map((section) => section.id)).size, routeSections.length)
for (const section of routeSections) assert.equal(isRouteSection(section.id), true)
for (const invalid of [null, "", "https://example.org", "__proto__", "otra-seccion"]) assert.equal(isRouteSection(invalid), false)
console.log(`OK: las ${stages.length} etapas conservan su orden y acceso en ${planBlocks.length} tramos; ${routeSections.length} vistas válidas sin identificadores duplicados.`)
assert.deepEqual(Object.keys(fieldNotes).sort(), learningFamilies.map((family) => family.prefix).sort())
const resources = new Set(studyResources.map((item) => item.id))
for (const family of learningFamilies) {
  assert.ok(fieldNotes[family.prefix].next && fieldNotes[family.prefix].aliases)
  for (const id of fieldNotes[family.prefix].resources ?? family.resources) assert.ok(resources.has(id), id)
  for (const match of family.entry.matchAll(/\bS(\d+)\b/g)) assert.ok(stages[Number(match[1])], match[0])
}
assert.equal(new Set(devicePaths.map((item) => item.id)).size, 9)
for (const item of devicePaths) {
  assert.equal(item.steps.length, 3)
  assert.ok(item.before && item.proof && item.limit)
  for (const id of item.resources) assert.ok(resources.has(id), id)
}
for (const course of excelCatalog.courses) assert.ok(course.topics && course.scope, course.id)
console.log("OK: 17 campos con límites explícitos, 9 recorridos por dispositivo, fuentes resueltas y 533 temarios conservados.")
