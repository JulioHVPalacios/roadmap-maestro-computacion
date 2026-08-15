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

### Programación
Entrada: `src/v41/ProgrammingHubV41.tsx`

Currículo/fuentes: `src/v51/`

Experiencia: `src/v52/`

### Recursos/certificaciones
Catálogos vivos, generadores y datos bajo `public/`. No regenerarlos como efecto secundario de una tarea no relacionada.

## Principio arquitectónico

No reescribir módulos estables para resolver problemas locales. Preferir integración incremental, componentes aislados, pruebas/auditorías, cambios reversibles, compatibilidad Windows/Linux y preservación del currículo.
