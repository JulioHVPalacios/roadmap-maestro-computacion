# DEPLOYMENT.md — Git y publicación

## Principio

No desplegar ni fusionar a `main` automáticamente.

Rama documentada:
`campus-v52-5-programacion-studio-real`

## Antes de push

```powershell
git status
git diff --stat
git diff
npx.cmd tsc -b --pretty false
npm.cmd run build
```

Ejecutar además auditorías del área afectada.

## Merge a main

Solo con autorización explícita después de actualizar remotos, revisar divergencia/conflictos, auditorías, TypeScript, lint, build y revisión visual.

## GitHub Pages

Consultar `docs/GUIA_PUBLICACION_GITHUB.md`. No cambiar paths, workflow o Vite sin investigar el despliegue actual.

## Rollback

Preferir revert de commit, restauración de archivos concretos y ramas/checkpoints. Evitar reset hard y limpieza masiva.
