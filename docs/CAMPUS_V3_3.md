# Campus Maestro v3.3 — motor cinematográfico

Esta versión conserva la base auditada v3.2.1 y añade la primera capa cinematográfica real del campus sin introducir dependencias externas obligatorias.

## Cambios

- Mapa vivo del conocimiento con una escena sticky controlada por scroll.
- Cinco capítulos visuales: fundamentos, sistemas, ingeniería, datos/IA y frontera.
- Nodos académicos animados que reaccionan al avance del usuario.
- Jerarquía académica formal en `src/campus-schema.ts`: Facultad → Ruta → Etapa → Materia → Unidad → Lección → Activo → Evaluación → Evidencia.
- Se mantiene la auditoría mundial lazy-loaded, las 20 etapas, 89 materias, 12 rutas de maestría y los 533 módulos trazados.
- No se declara contenido académico completo donde todavía no existe. La v3.3 mejora la experiencia y fija el esquema que usará el llenado real de S0 en adelante.

## Decisión técnica

El movimiento de esta fase se implementa con React, CSS y `requestAnimationFrame`, evitando añadir una dependencia obligatoria solo para efectos visuales. Esto mantiene el sitio ligero y compatible con GitHub Pages. Librerías especializadas o 3D podrán incorporarse después únicamente donde aporten comprensión real.
