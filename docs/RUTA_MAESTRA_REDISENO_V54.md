# Ruta Maestra: rediseño del espacio de estudio

## Problema y cambio

La página acumulaba la guía, la carretera, los mapas, varios catálogos, especializaciones y secciones heredadas en un mismo desplazamiento. El rediseño convierte la ruta en un espacio con una vista por tarea. La portada muestra el aula actual, la siguiente materia pendiente y un resumen del recorrido. El resto se abre desde una navegación agrupada en Estudiar, Consultar y Explorar.

Se mantiene la tipografía real de la web (Geist y Plus Jakarta Sans), el contraste con Georgia en cursiva verde, el fondo papel y los acentos lima. La ilustración de la portada está construida en SVG; la carretera interactiva original permanece en su propia vista.

## Dónde queda cada función

| Vista | Contenido |
| --- | --- |
| Mi recorrido | Siguiente materia pendiente, aula actual, avance y guía de inicio desplegable |
| Plan de estudios | Las 20 etapas agrupadas en seis tramos; búsqueda en las 89 materias; prerrequisitos, proyectos y criterios de dominio |
| Especialidades | Las 12 rutas T01–T12 con sus unidades, prerrequisitos y aulas; conexiones con las 17 familias del Excel |
| Reparación y electrónica | Selector de nueve tipos de equipo/trabajo; los seis pasos generales y la rama de ingeniería se conservan desplegables |
| Repaso espaciado | Motor FSRS original con su almacenamiento y funcionamiento existentes |
| Fuentes de estudio | Las 35 fichas de fuentes y marcos con alcance declarado, ocho por página, filtros y detalles desplegables; referencias originales del tronco |
| Campos de estudio | Las 17 familias con etapas relacionadas, fuentes iniciales, práctica y límites explícitos de cobertura |
| Catálogo completo | Las 533 materias y 76 referencias del Excel, doce por página, filtros y cálculo de horas existentes |
| Mis evidencias | Lectura del progreso registrado en aulas y especializaciones; descarga de una copia del registro; reinicio con la confirmación existente |
| Carretera y mapa | Carretera 3D original, día/atardecer/noche, cámaras, recorrido, búsqueda por voz, mapa académico, etapas y especializaciones |
| Atlas y cobertura | Buscador profesional, 18 áreas, grafo de dependencias, historia, 8 pruebas y 10 proyectos, 12 marcos en la matriz, universo de 2.221 perfiles, canon, tecnologías y frontera |
| Investigación | Guía de reproducción, evaluación y contribución original; límites de equivalencia con títulos académicos |

Se conserva el perfil profesional orientativo (familia, recorrido, especialización y etapas) dentro del resultado del Atlas, además del área académica principal.

La navegación guarda la vista en el parámetro `vista` de la URL; una recarga directa permite volver a ella. Las direcciones antiguas directas `/roadmap`, `/maestrias` y `/atlas` se interpretan como plan, especialidades y exploración académica. Los demás módulos globales del Campus siguen fuera del alcance del rediseño.

## Conservación

No se modifican los cinco archivos académicos protegidos, el Excel original, las claves de progreso, ni el formato del almacenamiento. Tampoco se modifican el motor FSRS, la carretera 3D, los catálogos de certificaciones ni noticias.

La página de Ruta deja de montar el portal heredado que repetía el método, especializaciones, fuentes y Atlas al final de la sección. Su contenido de estudio sigue accesible mediante los módulos conservados y las vistas nuevas. El portal permanece disponible en las demás rutas que lo utilizan.

La descarga del registro incluye las marcas de materias, unidades y evidencias de Ruta; no sube datos, no incluye archivos de proyectos ni exporta los repasos. La vista de evidencias no presenta las marcas personales como una validación externa.

## Verificación

- TypeScript y ESLint de los archivos afectados.
- Auditorías históricas V45 y V45.3: cinco blobs protegidos, 20 etapas, 89 materias, 12 especializaciones y 2.221 perfiles intactos.
- Auditoría V53 del catálogo, sus referencias y revocación de dominio.
- Auditoría V54: cada etapa aparece en un solo tramo y se conserva el orden completo del currículo.
- Revisión de interfaz: portada, búsquedas, aulas, persistencia al recargar, especializaciones, fuentes, reparación, catálogo, repaso, Atlas, matriz, proyectos y mapa.
- Prueba de descarga real del registro; se revisa el JSON generado.
- Revisión responsive en teléfono, tablet y escritorio; búsqueda de desbordamientos.

La portada no monta ningún canvas. El repaso, el catálogo, la carretera y las herramientas de exploración se cargan cuando se abren. El build sigue advirtiendo sobre paquetes grandes en el proyecto; la separación reduce el principal respecto de la base, pero no constituye una optimización general de todos los módulos del Campus.

Para validar:

```text
npx tsc -b --pretty false
npx eslint --max-warnings=0 src/v54 src/v45/MasterRouteV45.tsx src/v45/AcademicCoverageV45.tsx src/v53/StudyGuide.tsx src/v53/ExcelCatalog.tsx src/v41/AppV41.tsx
node scripts/audit-master-route-v45.mjs
node scripts/audit-route-premium-v453.mjs
node --import tsx scripts/audit-study-guide-v53.mjs
node --import tsx scripts/audit-route-workspace-v54.mjs
npm run build
```

## Publicación y reversión

Se prepara en rama independiente y propuesta de cambios. La publicación sigue la autorización del propietario exigida por DEPLOYMENT.md. Puede revertirse el commit del rediseño sin cambiar el formato de los datos del estudiante.
