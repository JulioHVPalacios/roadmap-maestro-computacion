
## Campus v3.2

La v3.2 añade motor académico con estados de verificación, trazabilidad humana de fuentes, auditoría mundial cargada bajo demanda, modo claro/oscuro, animaciones accesibles y una base PWA. Esto no significa que todas las aulas estén completas: el contenido pendiente permanece marcado como tal hasta ser construido y verificado.

# Campus Maestro de Computación v3.0

**Universidad digital autodidacta, open-source, gratuita y español-primero para estudiar computación desde cero hasta especialización e investigación.**

> Objetivo: organizar en un solo sistema académico los conocimientos compartidos y especializados de Ciencias de la Computación, Ingeniería Informática, Ingeniería de Sistemas, Ingeniería de Software, Computación e Informática, TI, Datos, IA, Redes/Telecom, Ciberseguridad, Cloud/DevOps/SRE, Hardware, IoT/Robótica, HCI/Gráficos/Juegos/XR y Computación Científica.

## Qué cambia en v2.0

La versión 1 ya tenía un buen tronco de 20 etapas. La v2 evita intentar meter toda la profesión mundial dentro de una única secuencia lineal y adopta una arquitectura más rigurosa:

1. **Tronco S0–S19**: fundamentos que deben dominarse en orden.
2. **12 rutas T01–T12**: especialidades de maestría que profundizan áreas que una sola carrera universitaria no puede cubrir a la vez.
3. **14 familias profesionales**: agrupan cientos de títulos y roles por conocimiento real, para evitar duplicaciones.
4. **22 ecosistemas de fuentes**: cada fuente se etiqueta como validador, tronco, profundidad, laboratorio o especialidad.
5. **Política de costo obligatorio S/0**: certificados, hardware, nube y software comercial nunca son requisitos de aprobación.
6. **Español primero**: recursos en inglés solo se incorporan cuando cubren frontera sin equivalente suficiente; se marcan para traducción.

## Arquitectura

### Tronco común

- S0: Nivelación, herramientas y método universitario
- S1–S6: Matemática, algoritmos, arquitectura, SO, redes, bases de datos, teoría, compiladores y software
- S7–S10: ingeniería aplicada, web, cloud/DevOps, sistemas de información, ITSM y gestión
- S11–S15: analítica, datos, IA, GenAI y MLOps
- S16–S18: hardware, embebidos, telecom/IoT/HPC, gráficos/juegos/XR
- S19: bioinformática, científica, cuántica, formal methods e investigación

### Rutas de maestría

- T01 Software, web, móvil y plataformas
- T02 Ciberseguridad, privacidad, DFIR y seguridad ofensiva ética
- T03 Datos, bases de datos, BI e ingeniería de datos
- T04 Cloud, DevOps, SRE, plataforma e infraestructura de Internet
- T05 Sistemas de información, ITSM, gobierno, auditoría y gestión tecnológica
- T06 IA, ML, modelos fundacionales, agentes y sistemas de IA
- T07 Robótica, IoT, control, automatización y sistemas ciberfísicos
- T08 Hardware, arquitectura, FPGA/ASIC conceptual y HPC
- T09 Redes, telecomunicaciones, inalámbrico, 6G y espacio
- T10 HCI, UX, gráficos, videojuegos, XR y multimedia
- T11 Computación científica e interdisciplinaria
- T12 Legado, métodos formales, cuántica y frontera futura

## Método de aprobación

Cada materia/unidad exige cuatro cosas: **estudiar, resolver, producir evidencia y superar una puerta de aprobación**. No se marca una unidad por ver videos. El criterio es poder reconstruir, explicar, medir y defender el trabajo sin tutorial paso a paso.

## Fuentes principales

La ruta combina planes/currículos de referencia con material docente y repositorios reales. Entre ellos: Plan FING 2025, CS2023, OpenFING, FAMAF Resources, UBA/UTN/UNLP, UOC, Full Stack Open, freeCodeCamp, FIUBA CEIA, Cisco Networking Academy, Microsoft Learn, recursos de ingeniería de datos, Godot/Blender y bioinformática UNAM.

Consulta [`docs/AUDITORIA_FUENTES_2026.md`](docs/AUDITORIA_FUENTES_2026.md) para el criterio de selección y [`docs/MAPA_COBERTURA_PROFESIONAL.md`](docs/MAPA_COBERTURA_PROFESIONAL.md) para saber qué tronco/tracks corresponden a cada familia profesional.

## Ejecutar localmente

Requiere Node.js 22.13+.

```bash
npm install
npm run dev
```

Antes de publicar:

```bash
npm run build
```

## Editar contenido

- `src/roadmap-data.ts`: 20 etapas del tronco y directorio de fuentes.
- `src/mastery-data.ts`: 12 rutas de maestría y 14 familias profesionales.
- `src/App.tsx`: interfaz, filtros, progreso y matriz de cobertura.
- `src/styles.css`: diseño responsive e impresión.

El progreso se guarda localmente en el navegador. No hay servidor, cuenta ni base de datos obligatoria.

## Publicación gratuita

El repositorio conserva el workflow de GitHub Pages. Véase [`docs/GUIA_PUBLICACION_GITHUB.md`](docs/GUIA_PUBLICACION_GITHUB.md).

## Alcance académico

Este roadmap puede organizar una formación excepcionalmente amplia, pero **no puede garantizar ser “número uno del mundo” ni saber literalmente todo**: el campo cambia continuamente y muchas áreas profundas requieren años de investigación especializada. La meta verificable del proyecto es otra: maximizar cobertura, rigor, práctica, reproducibilidad y capacidad de aprender nuevas áreas sin depender de cursos pagos.

## Seguridad y ética

Ciberseguridad ofensiva se practica únicamente en sistemas propios, laboratorios, CTF o con autorización explícita. El proyecto no convierte actividades criminales (ransomware, robo de credenciales, acceso no autorizado, etc.) en objetivos formativos.

## Autor y licencia

Proyecto impulsado por **Julio Humberto Vera Palacios**. Código bajo licencia MIT. Los recursos enlazados mantienen sus licencias y condiciones originales.


## Campus v3.0

La v3 transforma el roadmap en un campus: dashboard, aulas por materia, biblioteca central, notas locales, laboratorios, evaluaciones y una experiencia visual dinámica. La incorporación de teoría, PDFs, clases y material multimedia será progresiva y respetará las licencias de cada fuente.

## Auditoría mundial v3.2

La v3.2 incorpora una base consultable de 533 módulos normalizados, 49.828 horas catalogadas, 17 rutas y 76 referencias del estudio mundial previo. Esta capa no obliga a cursar 533 asignaturas duplicadas: sirve para demostrar que la normalización S0–S19/T01–T12 no pierda conocimiento único. Véase `docs/AUDITORIA_CAMPUS_V3_1.md`.
