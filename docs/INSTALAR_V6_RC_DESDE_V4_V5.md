# Instalar v6.0 RC sobre v4/v5 sin perder Git

1. Detén Vite (`Ctrl+C`, luego `S` si PowerShell pregunta).
2. Confirma que sigues en `campus-v3-desarrollo`.
3. Descomprime `Campus_Maestro_v6.0.0_RC_PATCH_UNIFICADO.zip`.
4. Copia **todo el contenido** del ZIP en la raíz actual del proyecto y acepta reemplazar archivos.
5. No borres `.git`, `.github`, `node_modules` ni `dist` manualmente.
6. Ejecuta `npm.cmd ci` porque el paquete/lock cambian de versión y conviene reconstruir dependencias de forma limpia.
7. Ejecuta `npm.cmd run build`.
8. Ejecuta `npm.cmd run qa:static` (o `npm.cmd run qa` si quieres repetir build + QA).
9. Ejecuta `npm.cmd run dev` y prueba la plataforma.
10. Solo después de aprobar: `git add .`, commit y push de la rama de desarrollo.

La v6 RC no hace merge automático a `main` ni publica GitHub Pages.
