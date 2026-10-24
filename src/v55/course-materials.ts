import { foundationCollection } from "./foundation-plans"
import { researchedCollection } from "./researched-plans"
import type { CourseSource } from "./types"

export const coursePlans = [...foundationCollection.plans, ...researchedCollection.plans]

// Mantener alias de referencias iguales permite conservar sus notas de alcance.
export const courseSources: CourseSource[] = [...foundationCollection.sources, ...researchedCollection.sources]
export const uniqueCourseSourceCount = new Set(courseSources.map((source) => source.url)).size
