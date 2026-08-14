HOTFIX V21.1

Corrige el instalador cuando App.tsx conserva <SolarKnowledgeHero /> despues de retirar su import, lo que producia TS2304: Cannot find name 'SolarKnowledgeHero'.
El hotfix elimina el JSX antiguo de forma robusta, conserva .v15-hero-solar para el portal 3D y luego compila antes de dejar cambios activos.

CAMPUS MAESTRO V21 — OMNIVERSE
================================

V21 elimina NEXUS V20 del runtime y lo sustituye por una experiencia 3D útil integrada al Campus.

INCLUYE
- Hero 3D interactivo: Núcleo de Computación + 8 universos conectados.
- Mapa Omniverse a pantalla completa con S0–S19, T01–T12, universos y secciones.
- Buscador dentro del mapa 3D.
- Clic en nodos: navega a la sección correspondiente y abre etapa/maestría cuando aplica.
- Arrastre y zoom 3D.
- Compass fijo discreto que indica la sección actual y abre OMNI.
- Ctrl+J abre/cierra el mapa total.
- Transiciones internas tipo warp al navegar por anclas.
- Calidad Auto/Eco/Ultra guardada en localStorage.
- Adaptación móvil: menos partículas, etiquetas 3D simplificadas y panel inferior.
- Error Boundary: un fallo en Omniverse no derriba Campus Maestro.
- Sin dependencias nuevas: reutiliza Three.js + React Three Fiber + Drei ya presentes.

NEXUS V20
- src/nexus-v1 eliminado del source V21.
- README_NEXUS_V20 eliminado.
- El instalador crea backup antes de retirar NEXUS en el proyecto local.

PRUEBA
1. npm.cmd run build
2. npm.cmd run dev -- --port 5182
3. Ctrl+F5
4. Prueba PC y móvil.
5. En el hero: arrastra el universo y toca los nodos.
6. Pulsa OMNI o Ctrl+J para abrir el mapa total.

No hacer push antes de revisar visualmente.
