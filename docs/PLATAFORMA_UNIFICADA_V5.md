# Campus Maestro v5.0 — Plataforma unificada

## Objetivo
Consolidar en una sola versión la capa de experiencia que antes estaba repartida en fases: diseño cinematográfico, medios manipulables, simulaciones, visor documental, PWA/local-first, responsive y preparación de sincronización.

## Implementado
- CinematicMap autoplay + control manual.
- Galería documental real.
- Vídeo real: play/pause, scrub, volumen, velocidad, loop, PiP, fullscreen, zoom/pan y archivo local. La demo utiliza el MP4 público `latest48_SDO_2D.mp4` de NASA SDO/GSFC.
- Simulación SVG: red, CPU/memoria, pipeline de datos e IA; autoplay, velocidad y nodos arrastrables.
- Visor PDF: archivo local o URL directa, usando el visor PDF real disponible en el navegador.
- PWA: service worker con shell offline y estrategias de caché.
- Persistencia: IndexedDB para snapshot, exportación/importación JSON y Broadcast/localStorage existentes.
- Cloud: contrato GET/PUT configurable por `VITE_SYNC_ENDPOINT` + token opcional. No existe nube ficticia si estas variables no están configuradas.
- Responsive: navegación móvil fija, reorganización de estudio/medios y controles táctiles.

## Lo que no se falsea
La infraestructura puede estar lista de una sola vez; 49.828 horas de enseñanza no pueden declararse revisadas sin crear y auditar cada contenido. S0–S19/T01–T12 continúan bajo estados de cobertura y la base mundial de 533 módulos permanece como control de pérdidas.

## Responsive objetivo
320–374 px, 375–479 px, 480–767 px, 768–1023 px, 1024–1439 px y >=1440 px. Los controles de vídeo y simulación son táctiles; la navegación móvil se activa bajo 820 px.
