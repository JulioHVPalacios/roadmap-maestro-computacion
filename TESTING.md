# TESTING.md — Validación

## Mínimo obligatorio

```powershell
git status --short
git branch --show-current
npx.cmd tsc -b --pretty false
npm.cmd run build
```

## Programación V52.5

```powershell
node scripts/audit-programming-v52.mjs

npx.cmd eslint --max-warnings=0 `
  src/v41/ProgrammingHubV41.tsx `
  src/v51/programming-curriculum-v51.ts `
  src/v51/programming-sources-v51.ts `
  src/v52/ProgrammingAcademyHubV52.tsx `
  src/v52/ProgrammingClassroomV52.tsx `
  src/v52/CampusCodeStudioV52.tsx `
  src/v52/monaco-env.ts
```

## Ruta

```powershell
node scripts/audit-master-route-v45.mjs
node scripts/audit-route-premium-v453.mjs
```

## Prueba manual Programación

Revisar L00, L04, L23, L40, L47 y comprobar navegación, aula, Monaco, diagnósticos, terminal, `help/ls/pwd/open/cat/run/test/clear/reset`, JavaScript, Python/Pyodide, HTML preview, responsive y consola del navegador.

## Antes de commit

Alcance correcto, auditorías OK, TypeScript OK, lint relevante OK, build OK, revisión visual OK y diff sin cambios inesperados.

## ESLint global

No ampliar el alcance para corregir indiscriminadamente incidencias históricas en módulos no relacionados.
