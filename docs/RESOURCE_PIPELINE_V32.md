# Campus Maestro V32 — Pipeline de recursos

## Objetivo

La biblioteca deja de fabricar combinaciones artificiales para alcanzar una cifra. El catálogo base se compone de recursos reales ya curados y se amplía en el navegador desde colecciones públicas mantenidas.

## Fuentes vivas priorizadas

1. EbookFoundation / Free Programming Books — libros en español.
2. EbookFoundation / Free Courses — cursos en español.
3. EbookFoundation / Podcasts & Screencasts — español.
4. midudev / librosgratis.dev — libros y guías de programación en español.
5. Solo si faltan recursos para llegar al objetivo, se completan resultados con colecciones en inglés de EbookFoundation.

## Imágenes

Orden de resolución:

1. `coverImage` explícita si la ficha ya trae una portada confiable.
2. Imagen directa si la URL ya es una imagen.
3. Miniatura oficial de YouTube para videos.
4. Open Library Search + Covers para libros cuando existe portada bibliográfica.
5. Openverse para una imagen temática de licencia abierta relacionada con título/tags.
6. Si todo falla, la tarjeta muestra un placeholder neutro y NO usa un preview genérico de GitHub ni una portada con texto fabricado.

Las resoluciones se cachean en `localStorage` y las peticiones se limitan en concurrencia para no saturar APIs públicas.

## Deduplicación

Se descartan duplicados por URL canónica o por combinación normalizada `título + autor/proveedor`.

## Búsqueda

La búsqueda indexa título, autor/proveedor, descripción, categoría, tipo, idioma, URL y tags, junto con equivalentes frecuentes en español/inglés.

## Auditoría de enlaces

- GitHub Action semanal con `lycheeverse/lychee-action`.
- Auditoría manual profunda con `node scripts/audit-resource-links-v32.mjs`.
- Estados `401`, `403` y `429` se clasifican como bloqueados/restringidos y no automáticamente como enlace muerto, porque muchos sitios bloquean comprobadores automáticos.
