# Programación · Escuela y Code Studio

Esta revisión integra la sección de Programación con el lenguaje visual general de Campus Maestro y convierte el laboratorio en una herramienta de trabajo real dentro de cada lección.

## Experiencia

- Portada y plan de estudio alineados con la identidad clara de Campus Maestro: papel cálido, tinta oscura, acentos verde/lima/cian y superficies físicas.
- El aula conserva una zona docente clara y un entorno técnico oscuro, de forma que la explicación y la herramienta se distinguen sin parecer dos productos diferentes.
- La interfaz pública evita comentarios internos sobre versiones, decisiones de diseño o tecnologías descartadas.

## Campus Code Studio

El editor principal usa Monaco Editor y la terminal usa xterm.js. El estudio incluye:

- explorador de archivos;
- pestañas y modelos por archivo;
- resaltado de sintaxis;
- autocompletado y diagnósticos disponibles por Monaco;
- minimapa, línea/columna y panel Problemas;
- terminal interactiva con `help`, `ls`, `pwd`, `open`, `cat`, `run`, `test`, `clear` y `reset`;
- ejecución de JavaScript en Web Worker;
- ejecución de Python mediante Pyodide;
- vista previa HTML/CSS/JS en iframe sandbox;
- persistencia local del código de cada concepto;
- predicción previa a la ejecución;
- pruebas contra la referencia cuando existe una salida verificable;
- integración con el profesor: una explicación puede abrir el archivo, enfocar una línea, ejecutar o probar el ejercicio.

En pantallas táctiles pequeñas se utiliza un editor compacto funcional porque el editor de escritorio completo no está pensado como experiencia móvil principal.

## Protección del currículo

La instalación no modifica los archivos académicos protegidos de Ruta Maestra. Las auditorías V45 y V45.3 se incluyen en su variante multiplataforma para que CRLF/LF no genere falsos positivos entre Windows y Linux.


## Compatibilidad xterm
V52.1 fija `@xterm/xterm@6.0.0` con `@xterm/addon-fit@0.11.0`, correspondientes a la misma generación mayor del proyecto xterm.js.
