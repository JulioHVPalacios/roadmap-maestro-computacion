import type { VerificationState, LessonAsset } from "./academic-content";

export type AcademicEvidence = {
  id: string;
  title: string;
  required: boolean;
  state: VerificationState;
  rubric?: string[];
};

export type AcademicLesson = {
  id: string;
  title: string;
  outcomes: string[];
  prerequisites: string[];
  estimatedHours?: number;
  state: VerificationState;
  assets: LessonAsset[];
  evidence: AcademicEvidence[];
};

export type AcademicUnitNode = {
  id: string;
  title: string;
  state: VerificationState;
  lessons: AcademicLesson[];
};

export type AcademicSubjectNode = {
  id: string;
  title: string;
  state: VerificationState;
  prerequisites: string[];
  units: AcademicUnitNode[];
  finalEvidence: AcademicEvidence[];
};

export type AcademicStageNode = {
  id: string;
  title: string;
  subjects: AcademicSubjectNode[];
};

export type AcademicRouteNode = {
  id: string;
  title: string;
  stages: AcademicStageNode[];
};

export type AcademicFacultyNode = {
  id: string;
  title: string;
  routes: AcademicRouteNode[];
};

export const definitiveAcademicHierarchy = [
  "Facultad",
  "Ruta",
  "Etapa",
  "Materia",
  "Unidad",
  "Lección",
  "Activo educativo",
  "Evaluación",
  "Evidencia",
] as const;
