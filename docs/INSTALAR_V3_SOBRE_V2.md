# Instalar Campus Maestro v3.0 sobre la v2

1. Cierra `npm run dev` si está ejecutándose.
2. Copia el contenido de esta carpeta sobre tu carpeta local `Roadmap_Maestro_Computacion_v2.0.0`, aceptando reemplazar archivos.
3. No borres tu carpeta `.git` local. Esta entrega no contiene `.git`, por lo que tu historial y conexión con GitHub se mantienen.
4. Abre VS Code en la carpeta del proyecto.
5. Ejecuta:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run dev
```

6. Revisa la nueva interfaz en `http://localhost:5173/`.
7. Si todo está bien:

```powershell
git add .
git commit -m "Campus Maestro v3.0"
git push
```

GitHub Pages publicará la v3 automáticamente sobre la misma URL pública.
