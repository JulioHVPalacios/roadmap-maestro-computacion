import assert from "node:assert/strict"
import { coursePlans, courseSources, uniqueCourseSourceCount } from "../src/v55/course-materials.ts"
import { excelCatalog } from "../src/v53/excel-catalog.ts"
import { normalizeCourseChecks } from "../src/v55/evidence-store.ts"

const ids = new Set(excelCatalog.courses.map((course) => course.id))
assert.equal(coursePlans.length, 533)
assert.equal(new Set(coursePlans.map((plan) => plan.id)).size, 533, "No duplicar u omitir materias")
assert.deepEqual([...coursePlans.map((plan) => plan.id)].sort(), [...ids].sort())
const sourceIds = new Set(courseSources.map((source) => source.id))
assert.equal(sourceIds.size, courseSources.length, "Identificadores de fuente únicos")
for (const source of courseSources) {
  const url = new URL(source.url)
  assert.equal(url.protocol, "https:", source.id)
  assert.equal(url.username || url.password, "", source.id)
  assert.ok(["es", "en", "mixto"].includes(source.language), source.id)
  assert.ok(source.label && source.access && source.kind && source.verificationNote, source.id)
}
for (const plan of coursePlans) {
  assert.ok(ids.has(plan.id), plan.id)
  assert.ok(plan.focus.length >= 3 && plan.focus.every((text) => text.trim().length > 0), plan.id)
  assert.equal(plan.checks.length, 3, plan.id)
  assert.ok(plan.checks.every((text) => text.trim().length > 8), plan.id)
  assert.ok(plan.practice.length > 35 && plan.question.length > 12 && plan.answer.length > 15 && plan.scopeNote.length > 15, plan.id)
  assert.ok(plan.sourceIds.length > 0, plan.id)
  for (const id of plan.sourceIds) assert.ok(sourceIds.has(id), `${plan.id}: ${id}`)
  assert.equal("completed" in plan || "progress" in plan || "approved" in plan, false, "El material no contiene progreso personal ni aprobación ficticia")
}
assert.equal(new Set(coursePlans.map((plan) => plan.practice.trim().toLocaleLowerCase("es"))).size, 533, "Prácticas diferenciadas, no el mismo enunciado repetido")
assert.equal(new Set(coursePlans.map((plan) => plan.question.trim().toLocaleLowerCase("es"))).size, 533, "Preguntas diferenciadas")
assert.deepEqual(normalizeCourseChecks([0, 0, 1, 1, 2, 9, -1, "0", null, false, {}, 0.5]), [0, 1, 2])
for (const invalid of [null, {}, "[0,1]", 3, false]) assert.deepEqual(normalizeCourseChecks(invalid), [])
assert.deepEqual(normalizeCourseChecks([1, 1]), [1], "Un criterio repetido no infla el contador")
console.log(`OK: ${coursePlans.length} guías, prácticas y preguntas diferenciadas; ${uniqueCourseSourceCount} URLs de recursos; referencias e idiomas válidos; marcas personales deduplicadas.`)
console.log("Esta auditoría comprueba integridad y estructura. No certifica cobertura docente completa, dominio personal ni calidad integral de todas las fuentes externas.")
