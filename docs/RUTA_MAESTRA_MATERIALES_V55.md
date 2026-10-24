# Guías y prácticas por materia

Fecha de revisión: 23 de octubre de 2026. Rama: `contenido/ruta-maestra-aulas-desarrolladas`.

## Resultado implementado

El catálogo conserva las 533 materias originales y añade una guía específica para cada una. Cada guía contiene al menos tres focos de estudio, una actividad original, tres criterios para revisar la entrega, una pregunta de comprensión con respuesta orientativa, referencias seleccionadas y una nota de alcance. Son 533 prácticas y 533 preguntas diferenciadas, no una plantilla que repite el nombre de la materia.

La interfaz separa Preparar, Practicar, Contrastar y Materiales. Permite descargar un guion en Markdown, consultar referencias y filtrar por idioma de las fuentes. Los criterios personales persisten en claves nuevas de almacenamiento; no alteran el formato, las reglas de dominio ni el progreso de etapas y especialidades. Las marcas no se presentan como corrección automática ni como evaluación externa.

Se añaden enlaces directos, por ejemplo `/ruta?vista=catalogo&materia=PRE-011`. Los datos originales y las referencias del Excel siguen disponibles en desplegables separados.

| Familia | Materias con guía |
| --- | ---: |
| Preparación | 18 |
| Matemática y ciencias | 28 |
| Programación y teoría | 33 |
| Sistemas y arquitectura | 19 |
| Ingeniería de software | 40 |
| Datos e IA | 51 |
| Redes y cloud | 43 |
| Ciberseguridad | 60 |
| Electrónica e IoT | 30 |
| Robótica | 30 |
| Soporte y reparación | 20 |
| Sistemas de información | 24 |
| Gráficos, juegos y XR | 25 |
| Multimedia | 39 |
| Bioinformática y salud digital | 27 |
| Cuántica | 14 |
| Investigación y proyectos | 32 |

## Fuentes e idioma

Se incorporan 141 fichas de referencia para 140 URLs distintas. Una misma URL de concurrencia tiene dos identificadores de origen y conserva sus notas de comprobación. Se incluyen cursos con lecciones/prácticos, libros, tutoriales de proveedores, documentación, manuales de modelos y marcos. Sus funciones no se consideran intercambiables.

255 guías incluyen alguna fuente etiquetada íntegramente en español y 148 tienen todos los recursos seleccionados bajo esa etiqueta. Las otras pueden incluir materiales mixtos —por ejemplo, texto principal español con bibliografía inglesa— o ingleses. Estos conteos describen etiquetas de los recursos, no cobertura completa de la materia en ese idioma. Las guías y prácticas redactadas para el Campus están en español.

Las fuentes están enlazadas; no se copian cursos, libros, ilustraciones ni soluciones de proveedores. Las actividades y respuestas del Campus son originales. La gratuidad del material no implica software propietario, servicios, instrumental, hardware, cómputo o evaluación institucional gratuitos.

## Correcciones realizadas durante la revisión

- FIUBA `aprendizaje_maquina_II` trata actualmente operaciones de aprendizaje automático: se asigna a MLOps y no se convierte en MLII teórico por el nombre de su URL.
- Python oficial presupone programación previa. Se incorpora la referencia específica a Python de CS50 y se conserva la advertencia de prerrequisitos; una semana de CS50 tampoco se presenta como curso desde cero.
- Se distinguen portal español y texto traducido: KiCad, Helm, ROS, IBM Quantum y otros recursos llevan la etiqueta de idioma y la limitación observada.
- Se añaden recursos específicos de arquitectura de microservicios y colas de RabbitMQ. La práctica prueba duplicados y redelivery; un acknowledgement no se confunde con efectos de negocio exactamente una vez.
- El ejemplo de control proporcional fija una planta de primer orden. Se calculan constantes de tiempo y error estacionario; no se le atribuye el sobreimpulso de otro modelo.
- La pregunta de tolerancia a fallos cuánticos expresa la tasa física por debajo del umbral bajo las condiciones del modelo.
- La práctica inicial de soldadura utiliza imágenes/simulación o equipo de entrenamiento declarado seguro por instructor: desconectar una placa no garantiza ausencia de energía almacenada.
- CAP-031 incluye Bayes con prior/verosimilitudes/posterior, además de Brier. El ejemplo calcula P(E)=0,18 y posterior 0,5.
- Las claves de criterios se deduplican al leerlas, evitando que `[0,0,1]` produzca falsamente `3/3`.
- Microsoft Learning Pathways se describe como respaldado por la comunidad desde diciembre de 2025, según su aviso oficial.

## Qué no se da por terminado

Este desarrollo cierra la ausencia de guías y prácticas específicas en las 533 fichas. **No demuestra que existan 533 cursos completos, exhaustivos, íntegramente gratuitos en español y evaluados externamente. Tampoco cierra todas las brechas de formación profesional.**

Persisten necesidades concretas declaradas por materia: mayor profundidad de tensores y demostraciones; materiales específicos de GIS/Tableau, GNN y aprendizaje federado; sistemas críticos, OT/ICS, ingeniería inversa y peritaje; ITIL, contabilidad, liderazgo y arquitectura empresarial; técnicas avanzadas de cine, tipografía y XR; biología de sistemas, formación clínica y hardware cuántico; electrónica de potencia, baterías, microsoldadura y reparación por modelo con práctica supervisada.

Un manual o un ejercicio pequeño no cubre todas las averías o modelos. No se realizaron reparaciones físicas, validación clínica, operación industrial, investigación publicada ni evaluación de los proyectos del estudiante. Esas evidencias no se inventan ni se sustituyen por casillas. No se promete equivalencia con títulos, universidad, maestría o doctorado.

## Validación

- Conjunto de IDs exactamente igual al catálogo original: 533, sin duplicados ni referencias internas huérfanas.
- Actividades y preguntas diferenciadas; tres criterios y nota de alcance en cada ficha.
- Esquema y etiquetas de idioma válidos, URLs HTTPS sin credenciales.
- Prueba de normalización y deduplicación de criterios personales.
- Revisión semántica de fuentes y revisión cruzada enfocada en materias críticas; no se considera una evaluación docente exhaustiva de todos los cursos enlazados.
- TypeScript, lint, build y auditorías V45/V53/V54/V55; se conserva el aviso del proyecto sobre paquetes grandes.
- Revisión de interfaz en escritorio y móvil: preparación, actividad, respuesta desplegable, materiales, guardado al recargar, retirada de marca, descarga real del guion y filtro de idioma. Sin desbordamiento horizontal en la prueba móvil.

La auditoría V55 comprueba integridad y comportamiento. No certifica por sí misma la calidad pedagógica integral ni el dominio de una persona.
