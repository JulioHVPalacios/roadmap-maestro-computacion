# Campus Maestro v3.2 — Experiencia y arquitectura académica

La v3.2 no declara terminadas las aulas. Su objetivo es estabilizar el motor con el que se llenará el campus de forma verificable.

## Cambios principales

- Auditoría mundial cargada bajo demanda para separar la aplicación principal del catálogo de 533 módulos.
- Trazabilidad humana: los IDs de fuente se resuelven a entidad, documento, cobertura y URL cuando la ficha existe.
- Motor de estados para contenido: verificado, parcial, pendiente y frontera.
- Esquema académico formal: facultad → ruta → etapa → materia → unidad → lección → activo → evaluación → evidencia.
- Modo claro/oscuro y animaciones de aparición con respeto a `prefers-reduced-motion`.
- Iconos SVG internos sin dependencia externa obligatoria.
- PWA base con manifest y service worker. El shell puede quedar disponible tras una primera visita, pero esto no equivale todavía a descargar toda la biblioteca para uso offline.
- Sincronización multidispositivo sigue pendiente. El progreso actual continúa siendo local-first.

## Regla de contenido

Una materia no se considerará completa hasta que su teoría, práctica, evaluación, fuentes y evidencia estén trazadas. El material externo solo se incorpora si su licencia o permiso lo permite; en caso contrario se conserva el enlace canónico.
