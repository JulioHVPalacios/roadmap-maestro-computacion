export type CourseSource = {
  id: string
  label: string
  url: string
  language: "es" | "mixto" | "en"
  access: string
  kind: string
  verificationNote: string
}

export type CoursePlan = {
  id: string
  focus: string[]
  practice: string
  checks: string[]
  question: string
  answer: string
  sourceIds: string[]
  scopeNote: string
}

// Un plan, una práctica y una respuesta orientativa no equivalen a un curso completo.
export type CourseCollection = { sources: CourseSource[]; plans: CoursePlan[] }
