# PROTECTED_FILES.md — Protección

## Protección académica máxima

No modificar sin autorización explícita:
- `src/roadmap-data.ts`
- `src/mastery-data.ts`
- `src/v43/career-catalog-v43.ts`
- `src/v43/curriculum-v43.ts`
- `src/v44/curriculum-v44.ts`

Blobs esperados:
- roadmap-data → `c66209af8843d1623daa866057ac68a0471b4b54`
- mastery-data → `ebc41387f675491d9cff7ec477280f020beb18a1`
- career-catalog-v43 → `2a8e8e756e7afbcce412e4cd2fe87f21c0942190`
- curriculum-v43 → `e38fa84b5e381c0416ae0dc7235b0159b2236c8b`
- curriculum-v44 → `fd6290e6afd0d25e56ba8e044ec2683a89b48a5b`

Si falla una auditoría: investigar diff y plataforma; nunca alterar conocimiento protegido para hacer pasar la prueba.

## Ruta Maestra protegida salvo tarea específica
- `src/v45/MasterRouteV45.tsx`
- `src/v45/CinematicRoadV45.tsx`
- `src/v45/AcademicCoverageV45.tsx`
- estilos/auxiliares V45 relacionados.

## Git prohibido sin permiso
- `git reset --hard`
- `git clean -fd`
- force push
- rebase destructivo
- merge a `main`
- borrado de ramas remotas

## Generados/catálogos vivos
No modificar como efecto secundario:
- `public/certification-covers-v1/`
- `public/certifications-v1/`
- catálogos/cubiertas de recursos

## Dependencias
Nunca `npm audit fix --force`.
