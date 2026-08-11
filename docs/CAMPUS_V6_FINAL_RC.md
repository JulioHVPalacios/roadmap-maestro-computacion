# Campus Maestro v6.0 RC — plataforma consolidada

Esta versión congela la arquitectura visual/técnica para dejar de rehacer el campus por secciones y concentrar el trabajo posterior en el contenido académico verificado.

## Qué queda consolidado

- Una sola aplicación React + TypeScript con diseño responsive PC/tablet/móvil.
- Portada con escena en tiempo real manipulable (autoplay, rotación, zoom y control manual).
- Mapa cinematográfico automático manipulable sin depender del scroll para avanzar.
- Fotografías documentales reales registradas en `media-assets.ts` con procedencia/licencia.
- Vídeo real manipulable dentro de aula.
- PDF.js 6.1.200 cargado bajo demanda desde CDN con fallback al visor del navegador.
- Simulaciones educativas de red, CPU/memoria, datos e IA.
- Aula universal: Resumen, Teoría, Clases, PDF, Laboratorio, Ejercicios, Examen, Proyecto y Notas.
- PWA, service worker, IndexedDB y respaldo JSON.
- Adaptador de sincronización: si `VITE_SYNC_ENDPOINT` existe, compara snapshots y sincroniza automáticamente cada minuto; sin endpoint real no se simula una nube.
- Auditoría mundial bajo demanda con paginación progresiva del DOM: 533 módulos continúan accesibles sin renderizarlos todos simultáneamente.
- Control estructural de auditoría para IDs, horas, prerrequisitos, fuentes y totales.
- Calidad gráfica adaptativa `ultra/high/medium/lite` según dispositivo y `prefers-reduced-motion`.
- Scroll global desacoplado del estado React: la barra de progreso se actualiza por CSS custom property y `requestAnimationFrame`.
- `content-visibility: auto` en tarjetas/listas extensas para reducir layout/paint fuera del viewport.
- Sin `background-attachment: fixed` en las secciones largas.

## Rendimiento

Los componentes de tiempo real se pausan cuando salen del viewport. Las listas largas usan render progresivo y content visibility. El mapa cinematográfico actualiza posiciones de nodos directamente en el DOM dentro de su propio RAF, sin provocar un render completo de React en cada frame.

## Regla académica

La interfaz puede considerarse plataforma candidata a estable cuando pasa QA, pero el contenido no se declara completo por diseño. S0–S19/T01–T12 solo alcanzan estado completo cuando teoría, práctica, evaluación, evidencia y fuentes están verificadas. La auditoría de 533 módulos es el control de pérdidas para que ningún conocimiento único desaparezca al consolidar la ruta principal.

## Sincronización

La sincronización automática real necesita un servicio remoto. Contrato esperado:

- `GET VITE_SYNC_ENDPOINT` → devuelve `CampusSnapshot` JSON.
- `PUT VITE_SYNC_ENDPOINT` → guarda el `CampusSnapshot` enviado.
- `VITE_SYNC_TOKEN` opcional → `Authorization: Bearer <token>`.

El campus compara `createdAt`: descarga el snapshot remoto si es más nuevo; en caso contrario sube el local.

## Fuentes de runtime

- PDF.js estable usado por el visor: `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.1.200/`.
- El resto del núcleo no requiere dependencias visuales externas adicionales para funcionar; las escenas en tiempo real tienen fallback propio del navegador.

## Estado

**RC (Release Candidate)**: arquitectura congelada para pruebas. Antes de merge a `main`: ejecutar build, recorrer todas las secciones, probar móvil/tablet/desktop, aula, PDF, vídeo, simulaciones, PWA, offline, backup/sync y auditoría.
