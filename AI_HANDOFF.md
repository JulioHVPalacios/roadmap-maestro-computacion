# AI_HANDOFF.md — Antigravity, Codex y Cline

## Roles

### Antigravity
Implementador principal: analizar, planificar, editar, ejecutar terminal y validar.

### Codex
Revisor independiente: leer diff, buscar regresiones, proponer pruebas y revisar arquitectura. Si implementa, usar rama/worktree separado cuando corresponda.

### Cline
Respaldo multimodelo para tareas acotadas y proveedor alternativo, con permisos controlados.

## Regla principal

Nunca dos agentes modificando el mismo working tree al mismo tiempo.

Flujo: agente A implementa → pruebas → agente B revisa diff → correcciones → aprobación → commit/push si se autoriza.

## Prompt de arranque recomendado

Lee `AGENTS.md`, `PROJECT_STATE.md`, `PROTECTED_FILES.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md` y `TESTING.md`.

No modifiques nada todavía.

Ejecuta solo inspecciones de lectura:
- `git status --short`
- `git branch --show-current`
- `git rev-parse HEAD`
- inspecciona `package.json`
- identifica arquitectura y rutas principales
- identifica archivos protegidos
- identifica validaciones

Después devuelve:
1. estado Git;
2. arquitectura comprendida;
3. archivos que no tocarás;
4. riesgos;
5. plan para la tarea solicitada.

Espera autorización antes de cambios importantes.

## Traspaso entre agentes

Entregar rama, SHA base, objetivo, archivos tocados, `git diff --stat`, decisiones, validaciones, errores pendientes y próximos pasos.

No usar el chat como fuente de verdad si contradice el repositorio.

## Privacidad enterprise

No compartir secretos ni dumps reales; anonimizar; revisar términos; usar entorno aprobado/local cuando el código sea confidencial.
