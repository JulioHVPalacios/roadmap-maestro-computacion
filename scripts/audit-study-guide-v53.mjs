import assert from "node:assert/strict"
import { excelCatalog } from "../src/v53/excel-catalog.ts"
import { learningFamilies, repairPath } from "../src/v53/learning-paths.ts"
import { studyResources, sourceCaveat } from "../src/v53/study-resources.ts"
import { revokeStageCompletion, revokeTrackCompletion } from "../src/v53/route-progress.ts"

const expected = { PRE: 18, MAT: 28, CST: 33, SYS: 19, SWE: 40, DAI: 51, NET: 43, CYB: 60, EIO: 30, ROB: 30, REP: 20, ISM: 24, GXR: 25, MED: 39, BIO: 27, QUA: 14, CAP: 32 }
assert.equal(excelCatalog.courses.length, 533)
assert.equal(new Set(excelCatalog.courses.map((course) => course.id)).size, 533)
assert.equal(excelCatalog.courses.reduce((sum, course) => sum + course.hours, 0), 49828)
assert.equal(learningFamilies.length, 17)
assert.equal(excelCatalog.sources.length, 76)
const originalSourceIds = new Set(excelCatalog.sources.map((source) => source.id))
const courseIds = new Set(excelCatalog.courses.map((course) => course.id))
const resourceIds = new Set(studyResources.map((resource) => resource.id))
assert.equal(resourceIds.size, studyResources.length)
for (const family of learningFamilies) {
  assert.equal(excelCatalog.courses.filter((course) => course.id.startsWith(`${family.prefix}-`)).length, expected[family.prefix], family.prefix)
  for (const id of family.resources) assert.ok(resourceIds.has(id), `recurso ${id}`)
}
for (const course of excelCatalog.courses) {
  assert.ok(Number.isFinite(course.hours) && course.hours > 0, course.id)
  assert.ok([1, 2, 3].includes(course.priority), `prioridad ${course.id}`)
  for (const id of course.sourceIds.split(/\s*;\s*/)) assert.ok(originalSourceIds.has(id), `fuente ${id}: ${course.id}`)
  for (const id of course.prerequisites.match(/[A-Z]{3}-\d{3}/g) ?? []) assert.ok(courseIds.has(id), `prerrequisito ${id}: ${course.id}`)
  assert.equal("progress" in course || "start" in course || "end" in course, false)
}
for (const resource of studyResources) {
  assert.equal(new URL(resource.url).protocol, "https:")
  if (resource.evidence) assert.equal(new URL(resource.evidence).protocol, "https:")
  assert.ok(resource.language && resource.access && resource.limit)
}
for (const step of repairPath) for (const id of step.resources) assert.ok(resourceIds.has(id))
assert.ok(sourceCaveat("https://fullstackopen.com/es/"))
console.log("OK: 533 materias, 17 familias, 49.828 h, 76 referencias, recursos resueltos y datos curriculares sin progreso personal.")

const stages = [{ code: "S0" }, { code: "S1" }, { code: "S2" }, { code: "S3" }]
const tracks = [{ code: "T01", prerequisites: "S0" }, { code: "T02", prerequisites: "S1 y S3" }, { code: "T03", prerequisites: "S2" }]
const original = { completedStages: ["S0", "S1", "S2", "S3"], completedTracks: ["T01", "T02", "T03"], completedSubjects: { S2: [0, 1] }, completedEvidence: { S2: ["exam"] } }
const revoked = revokeStageCompletion(original, "S2", stages, tracks)
assert.deepEqual(revoked.completedStages, ["S0", "S1"])
assert.deepEqual(revoked.completedTracks, ["T01"])
assert.deepEqual(revoked.completedSubjects, original.completedSubjects)
assert.deepEqual(revoked.completedEvidence, original.completedEvidence)
assert.deepEqual(original.completedStages, ["S0", "S1", "S2", "S3"], "sin mutar entrada")
assert.deepEqual(revokeStageCompletion(original, "S0", stages, tracks).completedStages, [])
assert.deepEqual(revokeStageCompletion(original, "S0", stages, tracks).completedTracks, [])
assert.equal(revokeStageCompletion(original, "S99", stages, tracks), original)
assert.deepEqual(revokeTrackCompletion(original, "T02").completedTracks, ["T01", "T03"])
assert.deepEqual(revokeTrackCompletion(original, "T02").completedStages, original.completedStages)
console.log("OK: retirar evidencia invalida el dominio dependiente y conserva el resto del trabajo.")
