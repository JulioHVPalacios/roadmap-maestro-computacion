export type VerificationState = "verificado" | "parcial" | "pendiente" | "frontera";
export type ContentKind = "teoria" | "clase" | "documento" | "laboratorio" | "ejercicios" | "examen" | "proyecto" | "bibliografia";

export type SourceTrace = {
  sourceId: string;
  supports: string;
  exactLocation?: string;
  licenseStatus: "verificar" | "enlace" | "redistribuible" | "propio";
  checkedAt?: string;
};

export type LessonAsset = {
  id: string;
  kind: ContentKind;
  title: string;
  state: VerificationState;
  sourceTrace: SourceTrace[];
};

export type Lesson = {
  id: string;
  title: string;
  outcomes: string[];
  prerequisites: string[];
  state: VerificationState;
  assets: LessonAsset[];
};

export type AcademicUnit = {
  id: string;
  title: string;
  state: VerificationState;
  lessons: Lesson[];
};

export type SubjectContent = {
  subjectKey: string;
  state: VerificationState;
  coverageStatus: "sin-auditar" | "auditada" | "contenido-parcial" | "contenido-completo";
  units: AcademicUnit[];
};

export const contentArchitectureRules = [
  "Nada se marca como completo solo por tener un nombre o un enlace.",
  "Toda unidad debe declarar resultados de aprendizaje, prerrequisitos y evidencia.",
  "Cada recurso debe guardar procedencia, ubicación exacta y estado de licencia.",
  "La teoría interna debe distinguir contenido propio de material externo.",
  "Laboratorio, ejercicios, examen y proyecto deben mapear a competencias verificables.",
  "El contenido de frontera debe indicar vigencia, horizonte y fecha de revisión.",
] as const;
