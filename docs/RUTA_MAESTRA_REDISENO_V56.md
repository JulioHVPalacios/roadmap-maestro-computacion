# Ruta Maestra: rediseño basado en la referencia visual

24 de octubre de 2026. Complementa las guías de la propuesta #17.

## Resultado

Se aplica la dirección visual de la imagen solicitada: fondo marfil, verde profundo, acentos lima discretos, tipografía Geist/Plus Jakarta Sans, ilustración vectorial decorativa y mayor jerarquía y espacio. La imagen se traduce en componentes accesibles, no en una captura incrustada como interfaz.

La portada presenta un punto de partida, cifras del inventario, próxima sesión y campos destacados. La sesión usa la primera materia no registrada de la etapa actual, sus temas, evidencia, fuentes y criterio de etapa originales. Si están registradas todas las materias de esa etapa, orienta a revisar su proyecto y pruebas; no inventa una nueva materia. El estado completo del tronco orienta a especialidades. No se inventan porcentajes ni logros.

Los cuatro controles de sesión permiten preparar, practicar, contrastar y consultar materiales; el aula completa conserva sus controles. Las cifras de portada se contrastan con los datos en la auditoría V55. El catálogo completo y sus materiales siguen cargándose bajo demanda.

Los 17 campos se exploran mediante búsqueda, filtros y apertura progresiva. Se muestran seis inicialmente para reducir saturación; el resto sigue accesible con «Mostrar los 17 campos», por filtros y por el selector completo. Las tarjetas de la portada abren la familia elegida. Los seis tramos reales del plan se conservan, aunque la imagen conceptual los simplificaba en cuatro.

Las doce vistas permanecen accesibles desde el lateral y desde el selector móvil. Se modernizan también superficies, encabezados y pestañas del catálogo. Se corrige la concordancia «1 materia».

## Conservación y límites

No cambian los archivos académicos protegidos, la estructura de progreso, las reglas de dominio, las guías, sus idiomas o las condiciones de los materiales. Este cambio visual no convierte las guías en cursos exhaustivos ni cierra las brechas educativas documentadas en RUTA_MAESTRA_MATERIALES_V55.md.

No se cambian Inicio, Programación, Inglés, Recursos, Certificaciones ni el encabezado global del Campus. No se añaden dependencias. El arte de escaleras se construye en SVG para mantener nitidez y evitar descargar la imagen completa de referencia.

## Comprobaciones

- Auditorías V45, V45.3, V53, V54 y V55: conservación de 533 materias, 17 campos, 9 recorridos de reparación, 20 etapas, 89 materias troncales y 12 especializaciones.
- TypeScript, lint del área y build de producción.
- Escritorio, tableta de 768 px y móvil de 390 px; sin desbordamiento horizontal en las vistas examinadas.
- Cuatro pasos de sesión, enlaces de materiales, apertura del aula y selección del tramo del plan.
- Cambio real de próxima materia al marcar una materia; persistencia al recargar y retirada posterior de la marca de prueba, restaurando el estado previo.
- Directorio de 17 campos, filtro Hardware con 3 resultados, búsqueda sin coincidencias y selección de reparación desde la portada.
- Catálogo móvil con la guía PRE-011 y sus pestañas conservadas.

El build conserva el aviso histórico por paquetes grandes. La validación visual no implica haber ejecutado todas las prácticas ni comprobado todo el contenido externo. Publicación sujeta a la autorización explícita exigida por DEPLOYMENT.md.
