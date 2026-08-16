# AGENTS.md — Campus Maestro

Este archivo define las reglas operativas para cualquier agente de IA que trabaje en este repositorio.

## Orden obligatorio al iniciar una sesión

Antes de modificar cualquier archivo:

1. Leer `AGENTS.md`.
2. Leer `PROJECT_STATE.md`.
3. Leer `PROTECTED_FILES.md`.
4. Leer `ARCHITECTURE.md`.
5. Leer `DESIGN_SYSTEM.md` si la tarea afecta UI/UX.
6. Leer `TESTING.md`.
7. Ejecutar `git status --short`, `git branch --show-current` y `git rev-parse HEAD`.
8. Explicar qué se va a modificar y por qué.
9. No realizar cambios importantes, destructivos, despliegues, merges ni pushes sin autorización explícita.

## Estado base documentado

- Rama segura: `campus-v52-5-programacion-studio-real`
- Checkpoint: `62a4325bed95f2a95d7cb823ca0472ce52418187`
- V52.5 Programación Studio integrada y validada.
- La rama incluye la actualización reciente de certificaciones incorporada desde `origin/main`.

Si Git ya no está en ese estado, no asumir que algo está roto: leer `PROJECT_STATE.md`, inspeccionar historial y determinar qué cambió.

## Reglas críticas

- Nunca usar `git reset --hard`, `git clean -fd`, borrados masivos, force-push o rebase destructivo sin autorización.
- Nunca ejecutar `npm audit fix --force`.
- Nunca hacer `git push`, merge a `main` o despliegue sin autorización explícita.
- Nunca borrar backups del proyecto.
- Nunca alterar archivos académicos protegidos para hacer pasar una auditoría.
- Nunca ocultar errores con `@ts-ignore`, `@ts-nocheck`, `eslint-disable` o equivalentes.
- Nunca modificar secretos, `.env`, credenciales o datos reales sin permiso.
- Nunca dejar dos agentes modificando simultáneamente el mismo working tree.
- Para ERP empresariales, no enviar código o datos sensibles a servicios externos sin autorización y revisión de privacidad.

## Protocolo de cambios

1. Verificar working tree y rama.
2. Trabajar en una rama dedicada cuando corresponda.
3. Hacer cambios pequeños, reversibles y explicables.
4. Ejecutar validaciones del área tocada.
5. Ejecutar TypeScript y build.
6. Revisar `git diff --stat` y `git diff`.
7. Confirmar que no aparecieron archivos fuera del alcance.
8. No hacer commit/push hasta aprobación visual/funcional cuando aplique.

## Programación V52.5

Archivos principales:
- `src/v41/ProgrammingHubV41.tsx`
- `src/v51/programming-curriculum-v51.ts`
- `src/v51/programming-sources-v51.ts`
- `src/v52/ProgrammingAcademyHubV52.tsx`
- `src/v52/ProgrammingClassroomV52.tsx`
- `src/v52/CampusCodeStudioV52.tsx`
- `src/v52/monaco-env.ts`
- `src/v52/programming-v52.css`
- `scripts/audit-programming-v52.mjs`

Principios:
- enseñanza desde cero absoluto hasta avanzado;
- sin XP, quests, misiones decorativas ni Blockly;
- editor/terminal solo por utilidad pedagógica real;
- Monaco Editor como editor principal;
- xterm.js es interfaz de terminal educativa, no Bash/PowerShell real si no existe backend/PTY;
- JavaScript en Web Worker;
- Python mediante Pyodide;
- interfaz profesional integrada con Campus Maestro;
- no mostrar textos sobre IA, parches, versiones internas o decisiones meta.

## Regla de una sola IA editora

- Antigravity: implementador principal.
- Codex: revisor independiente.
- Cline: respaldo/orquestador alternativo.

No permitir que los tres modifiquen a la vez. El segundo agente revisa un diff estable o trabaja en otra rama/worktree.

## Definition of Done

Un cambio termina cuando: alcance correcto, TypeScript OK, lint relevante OK, build OK, auditorías relevantes OK, archivos protegidos intactos, diff sin cambios inesperados y revisión visual/funcional cuando aplique.
