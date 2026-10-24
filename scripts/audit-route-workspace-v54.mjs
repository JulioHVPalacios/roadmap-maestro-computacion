import assert from "node:assert/strict"
import { stages } from "../src/roadmap-data.ts"
import { planBlocks, isRouteSection, routeSections } from "../src/v54/route-sections.ts"

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
