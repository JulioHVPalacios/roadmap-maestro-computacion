# PROJECT_STATE.md — Estado actual de Campus Maestro

Fecha del checkpoint: 2026-08-16.

## Git

Repositorio: `JulioHVPalacios/roadmap-maestro-computacion`

Directorio local principal: `D:\Descargas\Campus_Maestro_V11_Studio`

Rama actual: `campus-v52-5-programacion-studio-real` (incorporada y lista para sincronización documental a `main`).

## Validaciones realizadas (100% PASS)

- Auditoría Inglés IT V52 (`node scripts/audit-english-v52.mjs`): PASS;
- Auditoría Programación V52.5 (`node scripts/audit-programming-v52.mjs`): OK;
- Auditoría Ruta Maestra V45 (`node scripts/audit-master-route-v45.mjs`): OK;
- Auditoría Ruta Premium V45.3 (`node scripts/audit-route-premium-v453.mjs`): OK;
- TypeScript (`npx.cmd tsc -b --pretty false`): OK (0 errores);
- ESLint (`npx.cmd eslint --max-warnings=0` en alcance tocado): OK (0 errores, 0 warnings);
- Build de producción (`npm.cmd run build`): OK.

## Módulos Integrados y Validados

1. **Clean URLs (Enrutamiento Limpio):**
   - Eliminación del `#` como router principal en favor de History API (`/inicio`, `/ruta`, `/programacion`, `/ingles`, `/recursos`, `/certificaciones`, `/noticias`, `/perfil`, `/soporte`).
   - Soporte SPA nativo para GitHub Pages con `public/404.html` y script de restauración en `index.html`.
   - Retrocompatibilidad transparente para URLs con `#`.

2. **Inglés IT Academy V52:**
   - 48 niveles técnicos (E00–E47) alineados con CEFR (A1 a C2).
   - Laboratorio fonético IPA Unicode, pronunciación guiada y pares mínimos.
   - *Speech Lab* con evaluación por micrófono mediante distancia de Levenshtein y alineación de tokens.
   - *Sentence Builder* con síntesis de voz y *Writing Studio*.

3. **Programación V52.5 (Code Studio Real):**
   - L00–L47 (48 niveles) y 192 posiciones conceptuales.
   - Monaco Editor 0.55.1 y xterm.js 6.0.
   - JavaScript en Web Worker y Python en Pyodide en el navegador.
   - Diagnósticos, preview en vivo y persistencia local.

4. **Ruta Maestra 3D Cinemática V45.3:**
   - Conservación íntegra de S0–S19, 89 materias troncales, 12 especializaciones T01–T12 y 2,221 perfiles profesionales.
   - Escena 3D con Three.js, React Three Fiber y Drei.

5. **Hubs de Recursos V36 y Certificaciones V1:**
   - Búsqueda interactiva, categorización y portadas dinámicas.

6. **Radar de Noticias Tecnológicas:**
   - Actualización cada 12 horas (inicio del día 00:00 y medio día 12:00) vía GitHub Actions en español con 10 noticias por card (40 en total).
