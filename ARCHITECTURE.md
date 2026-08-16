# ARCHITECTURE.md — Arquitectura técnica resumida

## Propósito

Campus Maestro es una plataforma autodidacta abierta, gratuita y español-primero para computación, software, sistemas, datos, IA, redes, ciberseguridad, cloud, hardware, IoT/robótica, gráficos/juegos/XR y áreas científicas.

Arquitectura académica:
- tronco S0–S19;
- rutas T01–T12;
- fuentes de referencia;
- auditorías de cobertura/conservación.

## Stack

SPA con React + TypeScript + Vite.

Tecnologías relevantes:
- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- Three.js / React Three Fiber / Drei
- React Flow
- GSAP / Motion / Lenis
- Monaco Editor 0.55.1
- xterm.js 6.0.0 + addon-fit 0.11.0
- pdfjs
- Playwright
- Sharp / canvas para assets

Scripts importantes:
- `npm.cmd run dev`
- `npm.cmd run build`
- `npm.cmd run lint`
- `npm.cmd run preview`
- `npm.cmd run certifications:update`
- `npm.cmd run certifications:covers`
- `npm.cmd run certifications:refresh`

## Capas

### Académica protegida
`src/roadmap-data.ts`
`src/mastery-data.ts`
`src/v43/career-catalog-v43.ts`
`src/v43/curriculum-v43.ts`
`src/v44/curriculum-v44.ts`

### Ruta visual
Componentes V45 implementan Ruta Maestra inmersiva/premium.

### Enrutamiento
`src/v41/v41-router.ts`: Gestión de rutas limpias (`/inicio`, `/ruta`, `/programacion`, `/ingles`, `/recursos`, `/certificaciones`, `/noticias`, `/perfil`, `/soporte`) vía History API, popstate listeners, y retrocompatibilidad con `#`.
`public/404.html` + `index.html`: Fallback SPA para GitHub Pages.

### Programación Studio
Entrada: `src/v41/ProgrammingHubV41.tsx`
Currículo/fuentes: `src/v51/programming-curriculum-v51.ts`
Experiencia: `src/v52/ProgrammingAcademyHubV52.tsx`, `src/v52/ProgrammingClassroomV52.tsx`, `src/v52/CampusCodeStudioV52.tsx`

### Inglés IT Academy
Entrada: `src/v41/EnglishHubV41.tsx`
Currículo/fuentes: `src/v51/english-curriculum-v51.ts`
Experiencia: `src/v52/EnglishAcademyHubV52.tsx`, `src/v52/EnglishClassroomV52.tsx`, `src/v52/EnglishWritingStudioV52.tsx`

### Recursos/certificaciones
Catálogos vivos, generadores y datos bajo `public/`. No regenerarlos como efecto secundario de una tarea no relacionada.

## Principio arquitectónico

No reescribir módulos estables para resolver problemas locales. Preferir integración incremental, componentes aislados, pruebas/auditorías, cambios reversibles, compatibilidad Windows/Linux y preservación del currículo.
