# Campus Maestro V45 — Ruta Maestra Cinemática

## Objetivo

V45 cambia la presentación de `#ruta` sin sustituir el contenido académico. La carretera S0–S19 sigue siendo la columna vertebral, pero ahora existe una **Ruta inmersiva** en 3D y una **Vista académica** en 2D. El alumno puede alternar entre ambas cuando quiera.

La regla principal de esta versión es sencilla: **la estética no puede ocultar ni recortar el aprendizaje**. Por eso las aulas, materias, fuentes, evidencias, especializaciones, 18 áreas de dominio, repaso FSRS, universo profesional y auditorías continúan usando los datos de V44.

## Qué cambia visualmente

- Carretera 3D con profundidad, iluminación, señalización, estaciones, guardarraíles, vegetación, farolas y vehículos en movimiento.
- Cámara que viaja suavemente a la etapa seleccionada.
- Recorrido automático opcional, con pausa inmediata.
- Tarjetas legibles sólo cerca de la cámara; las estaciones lejanas se reducen al código para evitar saturación.
- Barra S0–S19 siempre visible para saltar a cualquier etapa.
- Calidad gráfica adaptativa: alta, equilibrada o ligera según el rendimiento.
- En móvil no se fuerza WebGL pesado: aparece una carretera vertical táctil, clara y ligera.
- Vista académica conservada para inspeccionar dependencias y especializaciones con precisión.

## Arquitectura utilizada

### Ruta inmersiva

- **Three.js** — escena 3D, materiales, luces, niebla, carretera y objetos.
- **React Three Fiber** — integración de Three.js con el estado React del Campus.
- **Drei** — HTML sobre 3D, PerformanceMonitor, AdaptiveDpr, Sky y ContactShadows.
- **GSAP** — mantiene el lenguaje de movimiento y transiciones del Campus.

### Mapa académico y relaciones

- **React Flow** — vista de nodos, etapas y especializaciones.
- **ELK.js** — grafo secundario de dependencias.
- **Sigma.js + Graphology** — universo profesional de 2.221 perfiles.

### Aprendizaje y laboratorios

- **FSRS** — repaso espaciado.
- **JupyterLite/Pyodide** — reservado para laboratorios Python/ciencia en navegador.
- **Sandpack** — reservado para laboratorios web/JavaScript.

Se evaluaron además Reagraph, PixiJS, Theatre.js, react-postprocessing, MSAGL.js y cosmos.gl. No se cargan todos en la pantalla principal porque duplicar motores aumenta JavaScript, memoria, complejidad y riesgo de incompatibilidades sin añadir claridad. Se mantienen como opciones para vistas o laboratorios donde tengan una ventaja concreta.

## Integridad académica

La instalación V45 no sustituye los siguientes archivos de conocimiento de V44:

- `src/roadmap-data.ts`
- `src/mastery-data.ts`
- `src/v43/career-catalog-v43.ts`
- `src/v43/curriculum-v43.ts`
- `src/v44/curriculum-v44.ts`

El auditor `scripts/audit-master-route-v45.mjs` comprueba sus hashes y además verifica:

- 20 etapas: S0–S19.
- al menos 89 materias troncales.
- 12 especializaciones.
- 2.221 perfiles profesionales, sin duplicados normalizados.
- 18 áreas de dominio.
- 8 pruebas de dominio.
- 10 proyectos integradores.
- aulas y paneles de detalle presentes.
- Ruta inmersiva y Mapa académico presentes.

## Uso

En `#ruta` aparecen dos controles principales:

- **Ruta inmersiva**: experiencia visual principal.
- **Mapa académico**: diagrama preciso de dependencias.

En la Ruta inmersiva:

- un clic selecciona y enfoca una etapa;
- el panel lateral conserva los detalles y el botón para entrar al aula;
- doble clic sobre una estación abre el aula directamente;
- `Anterior` y `Siguiente` avanzan sin necesidad de mover la cámara manualmente;
- `Recorrer` inicia el viaje automático;
- la barra inferior permite saltar a S0–S19.

## Criterio de redacción

V45 sustituye rótulos internos como “Omniversity extrema” o frases promocionales por términos descriptivos: “Ruta Maestra”, “auditoría académica”, “áreas de dominio”, “pruebas de dominio”, “proyectos integradores” y “frontera tecnológica”. La interfaz debe explicar qué hace cada sección sin presentarse como una promesa de superioridad personal.

## Validación antes de publicar

Ejecutar siempre:

```bash
node scripts/audit-master-route-v45.mjs
npm run build
```

El instalador V45 hace ambas comprobaciones y restaura los archivos anteriores si alguna falla.
