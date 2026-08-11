# Guía para publicar el roadmap en GitHub

## Opción recomendada: Git y Visual Studio Code

### 1. Crear el repositorio

En GitHub selecciona **New repository** y usa:

- Nombre: `roadmap-maestro-computacion`
- Visibilidad: **Public**
- No agregues README, `.gitignore` ni licencia desde GitHub, porque ya están incluidos.

### 2. Abrir el proyecto

Descomprime la carpeta, abre Visual Studio Code y selecciona **Archivo → Abrir carpeta**.

### 3. Probarlo localmente

Abre **Terminal → Nueva terminal** y ejecuta:

```bash
npm install
npm run dev
```

### 4. Subir el código

El usuario de GitHub detectado durante esta auditoría es `JulioHVPalacios`. Ejecuta:

```bash
git init
git add .
git commit -m "Publicar Roadmap Maestro de Computación"
git branch -M main
git remote add origin https://github.com/JulioHVPalacios/roadmap-maestro-computacion.git
git push -u origin main
```

GitHub puede pedirte iniciar sesión. No compartas contraseñas ni códigos en chats o capturas.

### 5. Activar GitHub Pages

1. Entra al repositorio.
2. Abre **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. Abre **Actions** y espera que finalice `Publicar en GitHub Pages`.
5. La URL tendrá una forma parecida a `https://JulioHVPalacios.github.io/roadmap-maestro-computacion/`.

## Actualizarlo después

Después de editar y probar:

```bash
git add .
git commit -m "Describir claramente la mejora"
git push
```

GitHub Pages publicará automáticamente la nueva versión.

## Alternativa gráfica: GitHub Desktop

También puedes usar GitHub Desktop:

1. **File → Add local repository**.
2. Selecciona la carpeta.
3. Confirma los cambios con un mensaje.
4. Elige **Publish repository** y marca la visibilidad pública.
5. Activa Pages con GitHub Actions desde la web.
