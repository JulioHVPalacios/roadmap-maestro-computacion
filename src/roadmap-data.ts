export type SourceLink = { label: string; url: string; where: string };
export type Subject = { name: string; sources: SourceLink[]; study: string; evidence: string };
export type Stage = { code: string; title: string; duration: string; prerequisites: string; outcome: string; subjects: Subject[]; gate: string; capstone: string; index: number; year: string };
export type RootSource = { n: number; name: string; url: string; kind: string; use: string };

export const stages: Stage[] = [
  {
    "code": "S0",
    "title": "Nivelación, herramientas y método universitario",
    "duration": "12 semanas · 240–300 horas",
    "prerequisites": "Ninguno. Se parte de cero.",
    "outcome": "Usar el computador con criterio técnico, trabajar en Linux y Git, recuperar la matemática escolar y programar soluciones pequeñas reproducibles.",
    "subjects": [
      {
        "name": "Panorama de la computación, historia y ética",
        "sources": [
          {
            "label": "OpenFING · Introducción a la Computación 2026",
            "url": "https://open.fing.edu.uy/courses/introcomp-2026/",
            "where": "Clases 1–14"
          }
        ],
        "study": "Historia de la computación; programación y verificación; lenguajes; desarrollo de software; datos, IA y ética; ADN, ciberseguridad, robótica, redes e investigación.",
        "evidence": "Mapa de 20 familias profesionales y ensayo de 1.500 palabras que distinga disciplina, profesión, puesto y herramienta."
      },
      {
        "name": "Hardware, sistemas y redes desde cero",
        "sources": [
          {
            "label": "Cisco · Conceptos básicos de hardware",
            "url": "https://www.netacad.com/es/courses/computer-hardware-basics?courseLang=es-XL",
            "where": "Completar todos los módulos y comprobaciones"
          },
          {
            "label": "OpenFING · Computación 1",
            "url": "https://open.fing.edu.uy/courses/comp1-2024/",
            "where": "Clases 1–3 y 12–20"
          }
        ],
        "study": "Componentes, almacenamiento, memoria, CPU, representación binaria y punto flotante; diferencias entre sistema operativo, aplicación, proceso, red y lenguaje.",
        "evidence": "Inventario técnico de tu equipo, diagrama de bloques y procedimiento probado de copia y restauración."
      },
      {
        "name": "Linux, terminal, Git y entorno reproducible",
        "sources": [
          {
            "label": "Cisco · Fundamentos de Linux",
            "url": "https://www.netacad.com/es/courses/fundamentos-de-linux?courseLang=es-XL",
            "where": "Ruta completa"
          },
          {
            "label": "PabloRioseco · Fase 1",
            "url": "https://github.com/PabloRioseco/plan-estudio-ingenieria-software",
            "where": "README → Fase 1 → Linux, terminal, virtualización y contenedores"
          }
        ],
        "study": "Sistema de archivos, usuarios, permisos, procesos, tuberías, redirección, scripts shell básicos, SSH conceptual, Git: repositorio, commit, rama, fusión, conflicto, etiqueta y .gitignore.",
        "evidence": "Repositorio portafolio con instalación documentada, script de diagnóstico, historial limpio y una recuperación desde cero en otra máquina virtual."
      },
      {
        "name": "Nivelación matemática y razonamiento",
        "sources": [
          {
            "label": "FAMAF · Ingreso",
            "url": "https://github.com/FAMAF-resources/0-Ingreso-FAMAF",
            "where": "README, apuntes, guías y exámenes"
          }
        ],
        "study": "Aritmética, álgebra elemental, ecuaciones, funciones, geometría analítica, notación, lógica proposicional informal y lectura de demostraciones.",
        "evidence": "Resolver al menos 80 % de dos exámenes de ingreso sin consultar apuntes y explicar oralmente cinco soluciones."
      },
      {
        "name": "Programación y planillas introductorias",
        "sources": [
          {
            "label": "OpenFING · Informática 2025",
            "url": "https://open.fing.edu.uy/courses/inflrm-2025/",
            "where": "Funciones de planilla, asignación, selección, iteración, scripts"
          },
          {
            "label": "OpenFING · Computación 1",
            "url": "https://open.fing.edu.uy/courses/comp1-2024/",
            "where": "Clases 4–11 y 17–25"
          }
        ],
        "study": "Variables, tipos, expresiones, condicionales, ciclos, funciones, vectores, matrices, recursión, depuración y automatización de una planilla.",
        "evidence": "Programa de consola de 300–500 líneas y planilla de inventario o gastos con validaciones, fórmulas y gráfico; ambos con casos de prueba."
      }
    ],
    "gate": "Examen escrito de nivelación ≥70 %, 40 ejercicios de programación aprobados y reinstalación reproducible del entorno sin ayuda paso a paso.",
    "capstone": "Portafolio de inicio: bitácora, entorno instalado, 40 ejercicios, inventario del equipo y recuperación completa en una máquina virtual.",
    "index": 0,
    "year": "Ingreso"
  },
  {
    "code": "S1",
    "title": "Matemática discreta, cálculo, álgebra y programación I",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S0 aprobado.",
    "outcome": "Razonar con precisión, demostrar resultados elementales y programar algoritmos estructurados con memoria y tipos explícitos.",
    "subjects": [
      {
        "name": "Cálculo diferencial e integral I",
        "sources": [
          {
            "label": "OpenFING · Cálculo 1",
            "url": "https://open.fing.edu.uy/courses/c1/",
            "where": "Clases 1–39"
          },
          {
            "label": "FAMAF · Análisis Matemático I",
            "url": "https://github.com/FAMAF-resources/1ro_1C-Analisis_Matematico_I-FAMAF",
            "where": "Guías y parciales"
          }
        ],
        "study": "Números reales y complejos, sucesiones, series, límites, continuidad, derivadas, Taylor, integral, técnicas y aplicaciones.",
        "evidence": "Cuaderno de 180 problemas; dos parciales cerrados de 120 minutos y una exploración numérica programada."
      },
      {
        "name": "Geometría y álgebra lineal I",
        "sources": [
          {
            "label": "OpenFING · Geometría y Álgebra Lineal 1",
            "url": "https://open.fing.edu.uy/courses/gal119/",
            "where": "Elegir Teórico 2022 y completar el práctico"
          },
          {
            "label": "FAMAF · Álgebra",
            "url": "https://github.com/FAMAF-resources/1ro_2C-Algebra-FAMAF",
            "where": "Guías y evaluaciones"
          }
        ],
        "study": "Sistemas lineales, matrices, determinantes, geometría vectorial, espacios vectoriales, base, dimensión, núcleo, imagen y transformaciones lineales.",
        "evidence": "Biblioteca que resuelva sistemas, documente estabilidad elemental y contraste resultados con cálculo manual."
      },
      {
        "name": "Matemática discreta I",
        "sources": [
          {
            "label": "OpenFING · Matemática Discreta 1",
            "url": "https://open.fing.edu.uy/courses/md1-2022/",
            "where": "Teórico 2022, clases 1–24"
          },
          {
            "label": "FAMAF · Matemática Discreta I",
            "url": "https://github.com/FAMAF-resources/1ro_1C-Matematica_Discreta_I-FAMAF",
            "where": "Guías, notas y parciales"
          }
        ],
        "study": "Inducción, combinatoria, recurrencias, relaciones, órdenes, equivalencias, grafos, árboles, recorridos, planaridad y pruebas.",
        "evidence": "Portafolio de 100 demostraciones/problemas; implementación de recorridos de grafos con invariantes explicados."
      },
      {
        "name": "Programación I",
        "sources": [
          {
            "label": "OpenFING · Programación 1",
            "url": "https://open.fing.edu.uy/courses/p1/",
            "where": "Clases 1–21"
          },
          {
            "label": "FAMAF · Introducción a los Algoritmos",
            "url": "https://github.com/FAMAF-resources/1ro_1C-Introduccion_a_los_Algoritmos-FAMAF",
            "where": "Prácticos y exámenes"
          }
        ],
        "study": "Diseño estructurado, control, arreglos, registros, subprogramas, alcance, memoria dinámica, punteros, listas, búsqueda y ordenación.",
        "evidence": "50 problemas, pruebas unitarias propias y una aplicación de consola que importe, valide, ordene y consulte libros o productos."
      }
    ],
    "gate": "Dos parciales matemáticos ≥70 %, examen de programación sin Internet y defensa oral de invariantes, complejidad y manejo de errores.",
    "capstone": "Aplicación de consola para administrar una biblioteca personal: altas, búsqueda, ordenación, archivos, pruebas y manual.",
    "index": 1,
    "year": "Año 1"
  },
  {
    "code": "S2",
    "title": "Cálculo multivariable, álgebra II, estructuras de datos y física",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S1 aprobado.",
    "outcome": "Dominar abstracción y estructuras de datos, y modelar problemas continuos y físicos con herramientas matemáticas.",
    "subjects": [
      {
        "name": "Cálculo multivariable y ecuaciones diferenciales",
        "sources": [
          {
            "label": "OpenFING · Cálculo 2",
            "url": "https://open.fing.edu.uy/courses/c2/",
            "where": "Clases 1–34"
          },
          {
            "label": "OpenFING · Ecuaciones Diferenciales",
            "url": "https://open.fing.edu.uy/courses/ied-2025/",
            "where": "Clases 1–25"
          }
        ],
        "study": "Topología elemental en Rn, derivadas parciales, gradiente, Hessiana, optimización, Lagrange, integrales múltiples, EDO, estabilidad, Laplace, Fourier y EDP introductorias.",
        "evidence": "Modelo numérico documentado de un sistema dinámico y dos exámenes cerrados."
      },
      {
        "name": "Álgebra lineal II",
        "sources": [
          {
            "label": "OpenFING · Geometría y Álgebra Lineal 2",
            "url": "https://open.fing.edu.uy/courses/gal2-2025/",
            "where": "Teórico 2025, clases 1–27"
          }
        ],
        "study": "Valores y vectores propios, diagonalización, Jordan, producto interno, ortogonalidad, Gram–Schmidt, mínimos cuadrados, adjunta y teorema espectral.",
        "evidence": "Notebook que implemente descomposiciones básicas y explique su uso futuro en datos, gráficos e IA."
      },
      {
        "name": "Programación II y tipos abstractos",
        "sources": [
          {
            "label": "OpenFING · Programación 2",
            "url": "https://open.fing.edu.uy/courses/p2-2023/",
            "where": "Teórico, práctico y laboratorio 2023/2025"
          },
          {
            "label": "FAMAF · Algoritmos y Estructuras de Datos I",
            "url": "https://github.com/FAMAF-resources/1ro_1C-Algoritmos_y_estructura_de_datos_I-FAMAF",
            "where": "Guías y parciales"
          }
        ],
        "study": "Abstracción, modularización, recursión, listas, árboles, TAD, pila, cola, conjunto, hash, árboles balanceados, tablas, heap y diseño de interfaces.",
        "evidence": "Biblioteca genérica de estructuras con pruebas de propiedad, medición de rendimiento y documentación de contratos."
      },
      {
        "name": "Física I",
        "sources": [
          {
            "label": "OpenFING · Física 1",
            "url": "https://open.fing.edu.uy/courses/f1-2022/",
            "where": "Teórico 2022, clases 1–28"
          },
          {
            "label": "FAMAF · Física",
            "url": "https://github.com/FAMAF-resources/4to_2C-Fisica-FAMAF",
            "where": "Problemas seleccionados"
          }
        ],
        "study": "Medición, vectores, cinemática, dinámica, trabajo, energía, momento, rotación, equilibrio y oscilaciones.",
        "evidence": "Informe experimental usando sensores disponibles o datos simulados, con incertidumbre, gráficos y modelo."
      }
    ],
    "gate": "Proyecto de estructuras sin fugas ni fallos de pruebas; 120 problemas matemático-físicos; examen oral sobre abstracción y modelos.",
    "capstone": "Biblioteca de estructuras de datos y simulador físico sencillo, ambos medidos, documentados y probados.",
    "index": 2,
    "year": "Año 1"
  },
  {
    "code": "S3",
    "title": "Probabilidad, métodos numéricos, algoritmos y organización del computador",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S2 aprobado.",
    "outcome": "Analizar eficiencia y error, razonar bajo incertidumbre y comprender la ruta completa desde bits hasta programas.",
    "subjects": [
      {
        "name": "Probabilidad y estadística",
        "sources": [
          {
            "label": "OpenFING · Probabilidad y Estadística",
            "url": "https://open.fing.edu.uy/courses/pye-2022/",
            "where": "Teórico 2022, clases 1–25"
          },
          {
            "label": "FAMAF · Probabilidad y Estadística",
            "url": "https://github.com/FAMAF-resources/2do_2C-Probabilidad_y_Estadistica-FAMAF",
            "where": "Guías y exámenes"
          }
        ],
        "study": "Axiomas, condicional, independencia, variables aleatorias, distribuciones, esperanza, varianza, covarianza, LLN, TCL, estimación, intervalos, pruebas y bondad de ajuste.",
        "evidence": "Análisis reproducible de un conjunto de datos público con hipótesis explícitas, intervalos, pruebas y advertencias sobre causalidad."
      },
      {
        "name": "Métodos numéricos",
        "sources": [
          {
            "label": "OpenFING · Métodos Numéricos",
            "url": "https://open.fing.edu.uy/courses/metn-2023/",
            "where": "Teórico 2023 y material 2025"
          },
          {
            "label": "FAMAF · Análisis Numérico I",
            "url": "https://github.com/FAMAF-resources/2do_1C-Analisis_Numerico_I-FAMAF",
            "where": "Guías y parciales"
          }
        ],
        "study": "Error y punto flotante, LU, normas, condición, métodos iterativos, interpolación, raíces, sistemas no lineales, mínimos cuadrados y QR.",
        "evidence": "Paquete numérico pequeño con comparación de error, tiempo, convergencia y casos patológicos."
      },
      {
        "name": "Diseño y análisis de algoritmos",
        "sources": [
          {
            "label": "OpenFING · Programación 3",
            "url": "https://open.fing.edu.uy/courses/prog3-2020/",
            "where": "Clases y resoluciones 2020/2021"
          },
          {
            "label": "FAMAF · Algoritmos y Estructuras II",
            "url": "https://github.com/FAMAF-resources/2do_2C-Algoritmos_y_estructura_de_datos_II-FAMAF",
            "where": "Guías y parciales"
          }
        ],
        "study": "Análisis asintótico, BFS/DFS, DAG, voraces, divide y vencerás, aleatorización, flujo/emparejamiento, complejidad, NP-completitud y aproximación.",
        "evidence": "Repositorio con 25 algoritmos, pruebas, demostraciones breves y benchmark empírico frente al análisis teórico."
      },
      {
        "name": "Organización, arquitectura y diseño lógico",
        "sources": [
          {
            "label": "OpenFING · Diseño Lógico 2026",
            "url": "https://open.fing.edu.uy/courses/dl-2026/",
            "where": "Teórico y práctico"
          },
          {
            "label": "OpenFING · Arquitectura de Computadoras",
            "url": "https://open.fing.edu.uy/courses/arqcomp/",
            "where": "Teórico 2022"
          },
          {
            "label": "FAMAF · Organización del Computador",
            "url": "https://github.com/FAMAF-resources/2do_1C-Organizacion_del_Computador-FAMAF",
            "where": "Apuntes, prácticos y exámenes"
          }
        ],
        "study": "Álgebra booleana, circuitos combinacionales/secuenciales, ISA, ensamblador, ruta de datos, memoria, caché, E/S, interrupciones y rendimiento.",
        "evidence": "Simulador o circuito digital pequeño y programa ensamblador medido; informe sobre jerarquía de memoria."
      },
      {
        "name": "Física II",
        "sources": [
          {
            "label": "OpenFING · Física 2",
            "url": "https://open.fing.edu.uy/courses/f2-2023/",
            "where": "Teórico 2023 y material 2025"
          }
        ],
        "study": "Fluidos, ondas, sonido, temperatura, teoría cinética, termodinámica y entropía.",
        "evidence": "Simulación de una onda o sistema térmico con validación dimensional y análisis de error."
      }
    ],
    "gate": "Exámenes de probabilidad y algoritmos ≥70 %; demostrar cinco algoritmos; programa ensamblador y circuito/simulador funcionando.",
    "capstone": "Laboratorio de algoritmos: 25 implementaciones, benchmarks, análisis estadístico y un simulador de colas.",
    "index": 3,
    "year": "Año 2"
  },
  {
    "code": "S4",
    "title": "Lógica, criptografía, sistemas operativos, bases de datos e ingeniería de software",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S3 aprobado.",
    "outcome": "Construir software persistente y verificable comprendiendo concurrencia, memoria, almacenamiento, lógica y ciclo de vida.",
    "subjects": [
      {
        "name": "Lógica computacional",
        "sources": [
          {
            "label": "OpenFING · Lógica",
            "url": "https://open.fing.edu.uy/courses/logica19/",
            "where": "Teórico 2019"
          },
          {
            "label": "FAMAF · Introducción a la Lógica y Computación",
            "url": "https://github.com/FAMAF-resources/2do_2C-Introduccion_a_la_Logica_y_la_computacion-FAMAF",
            "where": "Guías y evaluaciones"
          }
        ],
        "study": "Sintaxis, semántica, validez, satisfacibilidad, deducción, lógica proposicional y de primer orden; especificación de propiedades.",
        "evidence": "Formalizar 30 requisitos de un sistema académico pequeño y verificar manualmente la consistencia de un subconjunto."
      },
      {
        "name": "Discreta II y criptografía clásica/moderna",
        "sources": [
          {
            "label": "OpenFING · Matemática Discreta 2",
            "url": "https://open.fing.edu.uy/courses/md2/",
            "where": "Teórico 2021, clases 1–28"
          },
          {
            "label": "FAMAF · Matemática Discreta II",
            "url": "https://github.com/FAMAF-resources/3ro_1C-Matematica_Discreta_II-FAMAF",
            "where": "Guías y parciales"
          }
        ],
        "study": "Divisibilidad, Euclides, Bézout, congruencias, CRT, grupos, Euler, Diffie–Hellman y RSA; límites de los ejemplos didácticos.",
        "evidence": "Implementación educativa de aritmética modular y protocolo; documento que prohíba usar criptografía propia en producción."
      },
      {
        "name": "Sistemas operativos",
        "sources": [
          {
            "label": "OpenFING · Sistemas Operativos",
            "url": "https://open.fing.edu.uy/courses/so/",
            "where": "Teórico 2014"
          },
          {
            "label": "FAMAF · Sistemas Operativos",
            "url": "https://github.com/FAMAF-resources/2do_2C-Sistemas_Operativos-FAMAF",
            "where": "Prácticos y exámenes"
          }
        ],
        "study": "Procesos, hilos, planificación, sincronización, interbloqueos, memoria virtual, archivos, E/S, protección, virtualización y llamadas al sistema.",
        "evidence": "Shell mínima o laboratorio de procesos/hilos con mediciones, fallos inducidos y análisis de carrera/interbloqueo."
      },
      {
        "name": "Bases de datos relacionales",
        "sources": [
          {
            "label": "OpenFING · Fundamentos de Bases de Datos",
            "url": "https://open.fing.edu.uy/courses/fbd-2024/",
            "where": "Teórico 2024"
          },
          {
            "label": "FAMAF · Bases de Datos",
            "url": "https://github.com/FAMAF-resources/3ro_2C-Bases_de_Datos-FAMAF",
            "where": "Guías, exámenes y proyectos"
          }
        ],
        "study": "Modelo ER, relacional, álgebra, SQL, restricciones, normalización, transacciones, concurrencia, índices, planes, seguridad, respaldo y recuperación.",
        "evidence": "Esquema PostgreSQL de una biblioteca o tienda normalizado, migraciones, datos de prueba, 40 consultas, índices justificados y recuperación probada."
      },
      {
        "name": "Introducción a ingeniería de software",
        "sources": [
          {
            "label": "OpenFING · Introducción a Ingeniería de Software",
            "url": "https://open.fing.edu.uy/courses/iis19/",
            "where": "Clases 2–75"
          },
          {
            "label": "FAMAF · Ingeniería de Software I",
            "url": "https://github.com/FAMAF-resources/3ro_2C-Ingenieria_del_Software_I-FAMAF",
            "where": "Materiales y evaluaciones"
          }
        ],
        "study": "Ética, procesos, agilidad, requisitos, modelado, arquitectura, construcción, pruebas, evolución, configuración, liberación, proyectos y riesgo.",
        "evidence": "Especificación SRS ligera, modelo de dominio, trazabilidad requisito-prueba y plan de riesgos de un sistema elegido por ti."
      }
    ],
    "gate": "Base de datos con recuperación verificada; laboratorio concurrente sin carreras; examen de lógica y defensa de requisitos/pruebas.",
    "capstone": "Sistema académico pequeño con PostgreSQL: requisitos, modelo relacional, migraciones, roles, auditoría y respaldo/restauración.",
    "index": 4,
    "year": "Año 2"
  },
  {
    "code": "S5",
    "title": "Paradigmas, redes, computabilidad, orientación a objetos y SQL avanzado",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S4 aprobado.",
    "outcome": "Cambiar de paradigma con criterio, diseñar protocolos y APIs, y reconocer problemas computables, intratables o distribuidos.",
    "subjects": [
      {
        "name": "Paradigmas de programación",
        "sources": [
          {
            "label": "FAMAF · Paradigmas de la Programación",
            "url": "https://github.com/FAMAF-resources/3ro_1C-Paradigmas_de_la_Programacion-FAMAF",
            "where": "Apuntes, prácticos y parciales"
          },
          {
            "label": "OpenFING · Programación Lógica",
            "url": "https://open.fing.edu.uy/courses/p-logica/",
            "where": "Teórico y laboratorio 2024"
          }
        ],
        "study": "Imperativo, orientado a objetos, funcional y lógico; evaluación, alcance, cierres, tipos, inmutabilidad, efectos, recursión y concurrencia conceptual.",
        "evidence": "Resolver el mismo problema en tres paradigmas y comparar claridad, seguridad, pruebas y rendimiento."
      },
      {
        "name": "Redes de computadores",
        "sources": [
          {
            "label": "OpenFING · Redes de Computadoras",
            "url": "https://open.fing.edu.uy/courses/redes-2021/",
            "where": "Teórico-práctico 2021"
          },
          {
            "label": "FAMAF · Redes y Sistemas Distribuidos",
            "url": "https://github.com/FAMAF-resources/3ro_1C-Redes_y_Sistemas_Distribuidos-FAMAF",
            "where": "Guías y proyectos"
          }
        ],
        "study": "Capas, Ethernet/Wi-Fi, IP, subnetting, ARP, ICMP, routing, TCP/UDP, DNS, HTTP/TLS, sockets, medición, fallos y seguridad.",
        "evidence": "Laboratorio VirtualBox con dos redes, captura de tráfico, DNS/HTTP local, reglas de firewall y diagnóstico documentado."
      },
      {
        "name": "Lenguajes formales y computabilidad",
        "sources": [
          {
            "label": "OpenFING · Teoría de Lenguajes",
            "url": "https://open.fing.edu.uy/courses/teoleng/",
            "where": "Teórico 2024"
          },
          {
            "label": "FAMAF · Lenguajes Formales y Computabilidad",
            "url": "https://github.com/FAMAF-resources/4to_1C-LenguajesFormales_y_Computabilidad-FAMAF",
            "where": "Guías y evaluaciones"
          }
        ],
        "study": "Autómatas, expresiones regulares, gramáticas, lenguajes libres de contexto, máquinas de Turing, decidibilidad, reducciones y límites de cómputo.",
        "evidence": "Analizador léxico/sintáctico pequeño y ensayo con tres demostraciones de indecidibilidad o reducción."
      },
      {
        "name": "Análisis, diseño OO y patrones",
        "sources": [
          {
            "label": "OpenFING · Programación 4",
            "url": "https://open.fing.edu.uy/courses/p4/",
            "where": "Práctico 2025 y teórico"
          },
          {
            "label": "FAMAF · Ingeniería de Software II",
            "url": "https://github.com/FAMAF-resources/5to_1C-Ingenieria_del_Software_II-FAMAF",
            "where": "Material disponible"
          }
        ],
        "study": "UML útil, dominio, contratos, capas, colaboración, GRASP, patrones, colecciones, dependencias y refactorización; evitar diagramas sin decisión.",
        "evidence": "Backend modular de catálogo con ADR, diagrama C4/UML mínimo, patrones justificados y pruebas de contrato."
      },
      {
        "name": "SQL, modelado y rendimiento",
        "sources": [
          {
            "label": "Caro · SQL básico/intermedio/avanzado",
            "url": "https://github.com/caroacostatovany/ingenieria-de-datos/tree/main/02_sql",
            "where": "sql-basico → intermedio → avanzado → modelado-relacional → ejercicios"
          },
          {
            "label": "Full Stack Open · Parte 13",
            "url": "https://fullstackopen.com/es/part13/",
            "where": "Sequelize, joins, migraciones y relaciones"
          }
        ],
        "study": "Consultas complejas, CTE, ventanas, joins, normalización/desnormalización, índices, transacciones, seguridad, migraciones y análisis de planes.",
        "evidence": "Banco de 80 consultas sobre una base pública o propia y reporte de optimización con EXPLAIN antes/después."
      }
    ],
    "gate": "Defensa de red y captura; examen de computabilidad; sistema OO sin dependencias cíclicas y SQL con planes medidos.",
    "capstone": "Servicio de catálogo con API, orientación a objetos, consultas SQL avanzadas, sockets de laboratorio y decisiones arquitectónicas.",
    "index": 5,
    "year": "Año 3"
  },
  {
    "code": "S6",
    "title": "Arquitectura, compiladores, sistemas distribuidos, calidad y seguridad",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S5 aprobado.",
    "outcome": "Diseñar software seguro y mantenible desde la arquitectura de máquina hasta servicios distribuidos y lenguajes.",
    "subjects": [
      {
        "name": "Arquitectura de computadores avanzada",
        "sources": [
          {
            "label": "FAMAF · Arquitectura de Computadoras",
            "url": "https://github.com/FAMAF-resources/3ro_2C-Arquitectura_de_Computadoras-FAMAF",
            "where": "Apuntes, prácticos y parciales"
          },
          {
            "label": "OpenFING · Arquitectura de Computadoras",
            "url": "https://open.fing.edu.uy/courses/arqcomp/",
            "where": "Teórico 2022"
          }
        ],
        "study": "Pipelines, hazards, predicción, cachés, coherencia, memoria, multicore, E/S, aceleradores, métricas y compromisos energía-rendimiento.",
        "evidence": "Benchmark con perfiles de CPU/memoria y propuesta de optimización respaldada por medición."
      },
      {
        "name": "Compiladores y lenguajes",
        "sources": [
          {
            "label": "FAMAF · Lenguajes y Compiladores",
            "url": "https://github.com/FAMAF-resources/5to_1C-Lenguajes_y_Compiladores-FAMAF",
            "where": "Materiales y prácticos"
          },
          {
            "label": "OpenFING · Teoría de Lenguajes",
            "url": "https://open.fing.edu.uy/courses/teoleng/",
            "where": "Repaso de análisis formal"
          }
        ],
        "study": "Lexer, parser, AST, tipos, semántica, representación intermedia, interpretación, generación de código, optimización y runtime.",
        "evidence": "Compilador o intérprete de un lenguaje pequeño con especificación, mensajes de error y suite de conformidad."
      },
      {
        "name": "Algoritmos y sistemas distribuidos",
        "sources": [
          {
            "label": "OpenFING · Algoritmos Distribuidos en Redes",
            "url": "https://open.fing.edu.uy/courses/adadr/",
            "where": "Teórico 2024, árboles, anillos, ranking y routing"
          },
          {
            "label": "FAMAF · Redes y Sistemas Distribuidos",
            "url": "https://github.com/FAMAF-resources/3ro_1C-Redes_y_Sistemas_Distribuidos-FAMAF",
            "where": "Sección distribuida"
          }
        ],
        "study": "Modelos y fallos, tiempo y orden, elección, consenso conceptual, replicación, particiones, idempotencia, entrega, consistencia y observabilidad.",
        "evidence": "Servicio distribuido de laboratorio con reintentos, idempotencia, caída inducida, métricas y postmortem."
      },
      {
        "name": "Calidad, pruebas y evolución",
        "sources": [
          {
            "label": "OpenFING · Fundamentos de Ingeniería de Software",
            "url": "https://open.fing.edu.uy/courses/fiso/",
            "where": "Teórico 2021"
          },
          {
            "label": "OpenFING · Introducción a Ingeniería de Software",
            "url": "https://open.fing.edu.uy/courses/iis19/",
            "where": "Clases 38–64"
          }
        ],
        "study": "Unidad, integración, sistema, propiedad, carga, seguridad, mutación conceptual, revisión, refactorización, configuración, versiones, cambios y liberaciones.",
        "evidence": "Pirámide de pruebas de una aplicación propia, cobertura útil, prueba de carga, changelog, versionado y procedimiento de rollback."
      },
      {
        "name": "Seguridad informática",
        "sources": [
          {
            "label": "OpenFING · Fundamentos de Seguridad Informática",
            "url": "https://open.fing.edu.uy/courses/fsi/",
            "where": "Teórico 2020"
          },
          {
            "label": "Cisco · Introducción a la Ciberseguridad",
            "url": "https://www.netacad.com/es/courses/introduction-to-cybersecurity",
            "where": "Ruta completa"
          }
        ],
        "study": "Amenazas, activos, riesgo, autenticación, autorización, criptografía aplicada, seguridad de red/web, hardening, registros, respuesta, privacidad y cadena de suministro.",
        "evidence": "Modelo de amenazas de una aplicación propia, matriz de riesgos, controles, pruebas negativas, registro seguro y simulacro de incidente."
      }
    ],
    "gate": "Intérprete funcional; experimento distribuido con fallos; revisión de seguridad sin hallazgos críticos y defensa arquitectónica.",
    "capstone": "Plataforma modular segura: compilador pequeño, servicio distribuido, pruebas automatizadas, modelo de amenazas y pruebas de carga.",
    "index": 6,
    "year": "Año 3"
  },
  {
    "code": "S7",
    "title": "Desarrollo web full stack I y experiencia de usuario",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S6 aprobado; JavaScript básico adquirido mediante ejercicios previos.",
    "outcome": "Entregar una aplicación web accesible, probada y segura con frontend moderno, API y autenticación.",
    "subjects": [
      {
        "name": "Fundamentos web y React",
        "sources": [
          {
            "label": "Full Stack Open · Partes 0–2",
            "url": "https://fullstackopen.com/es/part0/",
            "where": "Continuar Part 1 y Part 2 desde la navegación"
          }
        ],
        "study": "HTTP, navegador, DOM conceptual, componentes, estado, eventos, hooks, formularios, colecciones, módulos, consumo de API, estilos y depuración.",
        "evidence": "Frontend de una aplicación de hábitos o biblioteca con navegación, formularios validados, estados de carga/error y pruebas de componentes."
      },
      {
        "name": "Backend Node/Express y persistencia",
        "sources": [
          {
            "label": "Full Stack Open · Parte 3",
            "url": "https://fullstackopen.com/es/part3/",
            "where": "Node, Express, despliegue, MongoDB, validación y ESLint"
          },
          {
            "label": "Full Stack Open · Parte 4",
            "url": "https://fullstackopen.com/es/part4/",
            "where": "Estructura, pruebas, autenticación por token"
          }
        ],
        "study": "REST, middleware, configuración, persistencia, validación, errores, logging, autenticación, autorización, pruebas de API y despliegue reproducible.",
        "evidence": "API web del proyecto elegido con OpenAPI/contratos, autenticación segura, RBAC, errores homogéneos y pruebas de integración."
      },
      {
        "name": "Pruebas de interfaz y diseño mantenible",
        "sources": [
          {
            "label": "Full Stack Open · Parte 5",
            "url": "https://fullstackopen.com/es/part5/",
            "where": "Login, props.children, formularios y pruebas"
          }
        ],
        "study": "Pruebas unitarias, integración y end-to-end; separación de responsabilidades, estado del cliente, mocking responsable y accesibilidad básica.",
        "evidence": "Flujo E2E: crear registro, editarlo, cambiar estado, cerrar sesión y verificar autorización y auditoría."
      },
      {
        "name": "Requisitos, UX y accesibilidad",
        "sources": [
          {
            "label": "OpenFING · Introducción a Ingeniería de Software",
            "url": "https://open.fing.edu.uy/courses/iis19/",
            "where": "Requisitos, prototipado, casos de uso y validación"
          },
          {
            "label": "Microsoft Learn · Accesibilidad",
            "url": "https://learn.microsoft.com/es-es/training/browse/?terms=accesibilidad%20web",
            "where": "Filtrar recursos gratuitos en español"
          }
        ],
        "study": "Investigación ligera con usuarios, flujos, arquitectura de información, accesibilidad por teclado, contraste, etiquetas, mensajes, rendimiento percibido y privacidad.",
        "evidence": "Prueba con cinco tareas, informe de hallazgos y correcciones; auditoría accesible sin bloqueos graves."
      }
    ],
    "gate": "Aplicación desplegable, pruebas E2E críticas, revisión de accesibilidad y defensa de decisiones de API/UX.",
    "capstone": "Aplicación web completa de hábitos o biblioteca: React, API, autenticación, accesibilidad, pruebas y despliegue reproducible.",
    "index": 7,
    "year": "Año 4"
  },
  {
    "code": "S8",
    "title": "Full stack II, TypeScript, GraphQL, móvil y bases relacionales",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S7 aprobado.",
    "outcome": "Escalar el frontend, tipar extremos, construir clientes web/móvil y elegir conscientemente REST, GraphQL, SQL o NoSQL.",
    "subjects": [
      {
        "name": "Gestión de estado, routing y arquitectura frontend",
        "sources": [
          {
            "label": "Full Stack Open · Partes 6–7",
            "url": "https://fullstackopen.com/es/part6/",
            "where": "Continuar Part 7 desde navegación"
          }
        ],
        "study": "Redux/estado, React Query, reducers, routing, hooks personalizados, estilos, webpack/Vite conceptual y organización de frontend.",
        "evidence": "Refactor de una aplicación propia con estado servidor/cliente separado, rutas protegidas y presupuesto de rendimiento."
      },
      {
        "name": "GraphQL",
        "sources": [
          {
            "label": "Full Stack Open · Parte 8",
            "url": "https://fullstackopen.com/es/part8/",
            "where": "Servidor, cliente, base de datos, login, caché y suscripciones"
          }
        ],
        "study": "Esquema, resolvers, consultas, mutaciones, caché, N+1, autorización, suscripciones y criterios REST frente a GraphQL.",
        "evidence": "Prototipo GraphQL de lectura y eventos; ADR que decida mantenerlo o descartarlo con evidencia."
      },
      {
        "name": "TypeScript end-to-end",
        "sources": [
          {
            "label": "Full Stack Open · Parte 9",
            "url": "https://fullstackopen.com/es/part9/",
            "where": "Introducción, Express tipado, React tipado y Patientor"
          }
        ],
        "study": "Tipos estructurales, unions, narrowing, generics, validación runtime, configuración, tipado de API y React.",
        "evidence": "Migración incremental de un módulo propio a TypeScript estricto con cero any injustificados."
      },
      {
        "name": "Aplicación móvil y SQL aplicado",
        "sources": [
          {
            "label": "Full Stack Open · Parte 10",
            "url": "https://fullstackopen.com/es/part10/",
            "where": "React Native"
          },
          {
            "label": "Full Stack Open · Parte 13",
            "url": "https://fullstackopen.com/es/part13/",
            "where": "PostgreSQL, joins, migraciones y relaciones"
          }
        ],
        "study": "Navegación móvil, componentes nativos, consumo de API, almacenamiento seguro conceptual, SQL relacional, ORM, migraciones y transacciones.",
        "evidence": "Cliente móvil de soporte con modo de conectividad limitada y backend PostgreSQL probado."
      }
    ],
    "gate": "Tipado estricto, cliente móvil funcional, migración de datos reversible y ADR de protocolo/persistencia.",
    "capstone": "Aplicación web tipada y móvil: TypeScript, GraphQL, PostgreSQL, estado, tiempo real controlado y pruebas de extremo a extremo.",
    "index": 8,
    "year": "Año 4"
  },
  {
    "code": "S9",
    "title": "DevOps, nube, contenedores, redes prácticas y confiabilidad",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S8 aprobado.",
    "outcome": "Operar software de forma repetible, observable, segura y recuperable sin depender de una nube pagada.",
    "subjects": [
      {
        "name": "CI/CD y automatización",
        "sources": [
          {
            "label": "Full Stack Open · Parte 11",
            "url": "https://fullstackopen.com/es/part11/",
            "where": "CI/CD, GitHub Actions, despliegue y mantener verde; traducción parcial"
          },
          {
            "label": "GitHub Docs · Actions en español",
            "url": "https://docs.github.com/es/actions",
            "where": "Conceptos y tutoriales oficiales"
          }
        ],
        "study": "Integración continua, calidad, artefactos, secretos, entornos, despliegue, rollback, ramas cortas, revisión y cadena de suministro.",
        "evidence": "Pipeline que analiza, prueba, construye, escanea y genera artefacto; despliegue local y rollback ensayado."
      },
      {
        "name": "Contenedores y orquestación básica",
        "sources": [
          {
            "label": "Full Stack Open · Parte 12",
            "url": "https://fullstackopen.com/es/part12/",
            "where": "Contenedores, entornos y orquestación"
          },
          {
            "label": "PabloRioseco · Fase 1",
            "url": "https://github.com/PabloRioseco/plan-estudio-ingenieria-software",
            "where": "Virtualización y contenedores"
          }
        ],
        "study": "Imágenes, capas, volúmenes, redes, Compose, configuración, salud, mínimos privilegios y orquestación conceptual.",
        "evidence": "Aplicación full stack reproducible en contenedores, con datos persistentes, health checks y límites de recursos."
      },
      {
        "name": "Nube sin gasto y arquitectura",
        "sources": [
          {
            "label": "Microsoft Learn · Catálogo",
            "url": "https://learn.microsoft.com/es-es/training/browse/",
            "where": "Buscar: fundamentos de Azure, arquitectura, nube, contenedores; usar sandbox cuando esté disponible"
          }
        ],
        "study": "IaaS/PaaS/SaaS, regiones, identidad, red, almacenamiento, cómputo, disponibilidad, elasticidad, costo, gobierno y responsabilidad compartida.",
        "evidence": "Diseño cloud-agnostic y despliegue local equivalente; ningún recurso que genere cobro sin aprobación explícita."
      },
      {
        "name": "Técnico de redes",
        "sources": [
          {
            "label": "Cisco · Trayectoria Técnico en Redes",
            "url": "https://www.netacad.com/es/career-paths/network-technician?courseLang=es-XL",
            "where": "Completar la trayectoria gratuita disponible"
          },
          {
            "label": "Cisco · Fundamentos de Redes",
            "url": "https://www.netacad.com/es/courses/networking-essentials",
            "where": "Curso completo"
          }
        ],
        "study": "Cableado y dispositivos, direccionamiento, switching/routing básico, servicios, troubleshooting, documentación y seguridad operativa.",
        "evidence": "Topología VirtualBox con cliente, servidor, router/firewall y monitor; runbook de 20 fallos."
      },
      {
        "name": "Observabilidad y confiabilidad",
        "sources": [
          {
            "label": "PabloRioseco · Fase 3",
            "url": "https://github.com/PabloRioseco/plan-estudio-ingenieria-software",
            "where": "README → Fase 3 → SLA/SLO/SLI y observabilidad"
          }
        ],
        "study": "Logs, métricas, trazas, golden signals, SLI/SLO, error budget, alertas accionables, capacidad, incidentes, postmortem y continuidad.",
        "evidence": "Tablero operativo, cuatro SLI, SLO razonados, alertas probadas y postmortem sin culpables."
      }
    ],
    "gate": "Restauración cronometrada, fallo inducido recuperado, pipeline verde, red diagnosticada y revisión de secretos/configuración.",
    "capstone": "Operación de una aplicación de laboratorio: contenedores, CI/CD, observabilidad, alertas, respaldo, restauración y postmortem.",
    "index": 9,
    "year": "Año 5"
  },
  {
    "code": "S10",
    "title": "Sistemas de información, ITSM, gestión y proyecto de grado",
    "duration": "24 semanas · 650 horas",
    "prerequisites": "S9 aprobado.",
    "outcome": "Cerrar una carrera troncal equivalente a cinco años mediante un producto defendible, gobernado y usado por personas reales.",
    "subjects": [
      {
        "name": "ITSM, gobierno y entrega de servicios",
        "sources": [
          {
            "label": "PabloRioseco · Plan SDM/ITSM",
            "url": "https://github.com/PabloRioseco/plan-estudio-ingenieria-software",
            "where": "Fases 2–4 y portafolio final"
          },
          {
            "label": "OpenFING · Administración General para Ingenieros",
            "url": "https://open.fing.edu.uy/courses/agpi/",
            "where": "Teórico 2025"
          }
        ],
        "study": "SDLC y roles, ITIL 4 conceptual, incidentes, problemas, cambios, configuración/CMDB, activos, SLA, catálogo, riesgo, controles, auditoría, KPIs y QBR.",
        "evidence": "Modelo operativo de un servicio TI ficticio: RACI, catálogo, SLA, flujos, conocimiento, configuración, activos, auditoría, KPI y revisión trimestral simulada."
      },
      {
        "name": "Gestión de producto, negocio y proyectos",
        "sources": [
          {
            "label": "OpenFING · El Negocio del Software",
            "url": "https://open.fing.edu.uy/courses/negsoftare-2021/",
            "where": "Estrategia, valor, mercado, finanzas y plan"
          },
          {
            "label": "OpenFING · Introducción a Ingeniería de Software",
            "url": "https://open.fing.edu.uy/courses/iis19/",
            "where": "Clases 65–75"
          }
        ],
        "study": "Problema, propuesta de valor, usuarios, mercado, costos, propiedad intelectual, alcance, EDT, estimaciones, cronograma, riesgos, equipo y agilidad.",
        "evidence": "Caso de negocio sin cifras inventadas, roadmap, presupuesto S/0, registro de riesgos y métricas de valor."
      },
      {
        "name": "Ética, privacidad, accesibilidad y sostenibilidad",
        "sources": [
          {
            "label": "OpenFING · Introducción a la Computación",
            "url": "https://open.fing.edu.uy/courses/introcomp-2026/",
            "where": "Ética de datos y ciberseguridad"
          },
          {
            "label": "Microsoft Learn · IA responsable",
            "url": "https://learn.microsoft.com/es-es/training/browse/?terms=IA%20responsable",
            "where": "Filtrar módulos gratuitos"
          }
        ],
        "study": "Daño, sesgo, privacidad por diseño, minimización de datos, consentimiento, accesibilidad, energía, deuda técnica y límites de automatización.",
        "evidence": "Evaluación de impacto, registro de decisiones éticas, aviso de privacidad y plan de reducción de datos."
      },
      {
        "name": "Proyecto de grado y defensa",
        "sources": [
          {
            "label": "OpenFING · Proyecto de Grado 2026",
            "url": "https://open.fing.edu.uy/courses/progra-2026/",
            "where": "Orientaciones"
          },
          {
            "label": "Plan FING 2025",
            "url": "https://eva.fing.edu.uy/pluginfile.php/79029/mod_resource/content/4/PlanEstudios_IngComp-2025.pdf",
            "where": "Usar como control de amplitud y carga"
          }
        ],
        "study": "Pregunta/problema, antecedentes, requisitos, diseño, implementación, evaluación, amenazas a validez, documentación, presentación y mantenimiento.",
        "evidence": "Memoria de 60–100 páginas, repositorio etiquetado, demostración reproducible, vídeo corto y defensa oral de 45 minutos ante revisores."
      }
    ],
    "gate": "Producto sin fallos críticos, al menos 80 % de requisitos trazados y probados, restauración demostrada, revisión externa y defensa aprobada con 70 % o más.",
    "capstone": "Proyecto de grado libre elegido por ti: problema real, investigación, requisitos, arquitectura, implementación, evaluación externa y defensa pública.",
    "index": 10,
    "year": "Año 5"
  },
  {
    "code": "S11",
    "title": "Analítica, Excel, Power BI y ciencia de datos aplicada",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S10 aprobado; estadística y SQL firmes.",
    "outcome": "Transformar datos en decisiones reproducibles, con modelos semánticos, visualización y automatización responsable.",
    "subjects": [
      {
        "name": "Python y análisis de datos",
        "sources": [
          {
            "label": "Caro · Python para datos",
            "url": "https://github.com/caroacostatovany/ingenieria-de-datos/tree/main/03_python",
            "where": "fundamentos → pandas → ejemplos"
          },
          {
            "label": "FIUBA · Análisis de Datos",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA_Analisis_de_datos",
            "where": "README, clases y notebooks"
          }
        ],
        "study": "Python, entornos, NumPy/Pandas, limpieza, transformación, exploración, visualización, reproducibilidad y comunicación.",
        "evidence": "Notebook auditable de tiempos de atención, calidad, sesgos y causas; convertirlo luego en paquete/script."
      },
      {
        "name": "Modelado dimensional y grandes volúmenes",
        "sources": [
          {
            "label": "OpenFING · Grandes Volúmenes de Datos",
            "url": "https://open.fing.edu.uy/courses/granvoldat/",
            "where": "Clases 1–13"
          },
          {
            "label": "OpenFING · Visualización de Datos",
            "url": "https://open.fing.edu.uy/courses/vd/",
            "where": "Clases 1–9"
          }
        ],
        "study": "Hechos, dimensiones, granularidad, aditividad, modelo lógico, NoSQL introductorio, exploración, percepción, interacción y honestidad visual.",
        "evidence": "Data mart de soporte con diccionario, granularidad, calidad y tablero que evite gráficos engañosos."
      },
      {
        "name": "Power Query, DAX y Power BI",
        "sources": [
          {
            "label": "Microsoft Learn · Power BI",
            "url": "https://learn.microsoft.com/es-es/training/powerplatform/power-bi",
            "where": "Introducción → modelado → visuales"
          },
          {
            "label": "Referencia Power Query M",
            "url": "https://learn.microsoft.com/es-es/powerquery-m/",
            "where": "Lenguaje y funciones"
          },
          {
            "label": "Referencia DAX",
            "url": "https://learn.microsoft.com/es-es/dax/",
            "where": "Sintaxis, funciones, consultas y conceptos"
          }
        ],
        "study": "Obtención, limpieza, modelo estrella, relaciones, contexto de filtro/fila, medidas, inteligencia temporal, seguridad, rendimiento, visuales y narrativa.",
        "evidence": "Modelo Power BI sobre datos públicos con 25 medidas, RLS conceptual, página ejecutiva, operativa y de calidad; archivo y documentación."
      },
      {
        "name": "Excel profesional y automatización",
        "sources": [
          {
            "label": "Microsoft Learn · VBA para Excel",
            "url": "https://learn.microsoft.com/es-es/office/vba/api/overview/excel",
            "where": "Conceptos y modelo de objetos"
          },
          {
            "label": "Microsoft Learn · Scripts de Office",
            "url": "https://learn.microsoft.com/es-es/office/dev/scripts/overview/excel",
            "where": "Tutoriales, fundamentos, ejemplos y API"
          },
          {
            "label": "OpenFING · Informática",
            "url": "https://open.fing.edu.uy/courses/inflrm-2025/",
            "where": "Funciones avanzadas y scripts"
          }
        ],
        "study": "Fórmulas, tablas, nombres, validación, dinámicas, Power Query, modelo, macros, objetos, eventos, errores, seguridad y automatización moderna.",
        "evidence": "Libro de control con datos separados de presentación, pruebas de fórmulas y automatización. Advertencia: Excel Desktop/VBA no es gratis salvo que ya tengas licencia; la documentación sí."
      }
    ],
    "gate": "Análisis reproducible, modelo estrella sin ambigüedad, 25 medidas verificadas, tablero probado con usuarios y revisión de privacidad.",
    "capstone": "Proyecto analítico público: datos limpios, modelo estrella, 25 medidas, tablero Power BI y reproducción abierta con Python/CSV.",
    "index": 11,
    "year": "Especialización avanzada"
  },
  {
    "code": "S12",
    "title": "Ingeniería de datos, calidad, orquestación y geodatos",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S11 aprobado.",
    "outcome": "Construir una plataforma de datos confiable desde fuentes hasta consumo, con trazabilidad, calidad y operación.",
    "subjects": [
      {
        "name": "Fundamentos de ingeniería de datos",
        "sources": [
          {
            "label": "Caro · Introducción",
            "url": "https://github.com/caroacostatovany/ingenieria-de-datos/tree/main/00_introduccion",
            "where": "qué es, roadmap y roles"
          },
          {
            "label": "Caro · Fundamentos",
            "url": "https://github.com/caroacostatovany/ingenieria-de-datos/tree/main/01_fundamentos",
            "where": "tipos, pipelines, batch/streaming, Git, entornos, Docker, SQL, nube"
          }
        ],
        "study": "Roles, ciclo de datos, batch y streaming, formatos, contratos, partición, Git, configuración, contenedores, SQL y arquitectura local/nube.",
        "evidence": "Arquitectura de datos abiertos con contratos, zonas, particiones, retención y estimación de costo S/0."
      },
      {
        "name": "Modelado y calidad",
        "sources": [
          {
            "label": "Caro · Modelado y calidad",
            "url": "https://github.com/caroacostatovany/ingenieria-de-datos/tree/main/04_modelado_y_calidad",
            "where": "modelado → calidad → ejemplos"
          }
        ],
        "study": "Relacional, dimensional, lake/lakehouse conceptual, metadatos, reglas, pruebas, perfilado, deduplicación, linaje, observabilidad y gobierno.",
        "evidence": "Suite de 40 pruebas de datos, catálogo/diccionario, linaje y tablero de calidad con responsables."
      },
      {
        "name": "Pipelines y orquestación",
        "sources": [
          {
            "label": "Caro · Pipelines",
            "url": "https://github.com/caroacostatovany/ingenieria-de-datos/tree/main/05_pipelines",
            "where": "pipelines básicos → orquestadores → nube → soluciones"
          },
          {
            "label": "Caro · Proyectos",
            "url": "https://github.com/caroacostatovany/ingenieria-de-datos/tree/main/07_proyectos",
            "where": "principiante → intermedio → avanzado"
          }
        ],
        "study": "ETL/ELT, idempotencia, incrementalidad, backfill, reintentos, DAG, scheduling, estado, observabilidad, despliegue y recuperación.",
        "evidence": "Pipeline local orquestado de datos públicos; backfill, reejecución, fallo inducido y reconstrucción completa."
      },
      {
        "name": "NoSQL, búsqueda y datos a escala",
        "sources": [
          {
            "label": "OpenFING · Bases No Relacionales",
            "url": "https://open.fing.edu.uy/courses/bdnr/",
            "where": "MongoDB, grafos, key-value, Hadoop e in-memory"
          },
          {
            "label": "OpenFING · Recuperación de Información",
            "url": "https://open.fing.edu.uy/courses/webir/",
            "where": "Índices, relevancia, PageRank"
          }
        ],
        "study": "Modelos documento, grafo y clave-valor; CAP conceptual; índices invertidos, compresión, ranking, relevancia y evaluación.",
        "evidence": "Índice de documentos técnicos con búsqueda tolerante y benchmark; ADR SQL/NoSQL/search basado en patrones reales."
      },
      {
        "name": "Datos geoespaciales",
        "sources": [
          {
            "label": "OpenFING · SIG Empresariales 2026",
            "url": "https://open.fing.edu.uy/courses/tsig-2026/",
            "where": "Clases 1–8"
          }
        ],
        "study": "Datos espaciales, bases geográficas, servicios web geoespaciales, visualizadores, privacidad de ubicación y proyecto.",
        "evidence": "Extensión opcional de activos por ubicación con datos sintéticos y controles de privacidad."
      }
    ],
    "gate": "Reconstrucción completa desde fuentes, pruebas de calidad, backfill idempotente, linaje y operación documentada.",
    "capstone": "Plataforma local de datos abiertos: ingesta, calidad, catálogo, orquestación, búsqueda, backfill y reconstrucción completa.",
    "index": 12,
    "year": "Especialización avanzada"
  },
  {
    "code": "S13",
    "title": "Inteligencia artificial y aprendizaje automático",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S12 aprobado; cálculo, álgebra, probabilidad y Python dominados.",
    "outcome": "Formular, entrenar y evaluar modelos clásicos sin confundir correlación, validación y valor real.",
    "subjects": [
      {
        "name": "Fundamentos matemáticos y estadísticos para IA",
        "sources": [
          {
            "label": "FIUBA · Análisis Matemático",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/analisis_matematico",
            "where": "Clases y ejercicios"
          },
          {
            "label": "FIUBA · Probabilidad y Estadística",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA_ProbayEstadistica",
            "where": "Clases y notebooks"
          }
        ],
        "study": "Derivadas, gradientes, álgebra aplicada, probabilidad, estimación, validación y conexión con optimización de modelos.",
        "evidence": "Cuaderno de derivaciones y reproducciones numéricas; explicar cada supuesto antes de usar una biblioteca."
      },
      {
        "name": "IA clásica",
        "sources": [
          {
            "label": "FIUBA · Introducción a IA",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/intro_ia",
            "where": "Clases 1–7"
          }
        ],
        "study": "Agentes, búsqueda, optimización local/continua, aprendizaje supervisado, regresión, clasificación, Naive Bayes y aprendizaje por refuerzo introductorio.",
        "evidence": "Agente o solucionador de búsqueda y comparación de tres clasificadores con protocolo de evaluación."
      },
      {
        "name": "Machine learning clásico",
        "sources": [
          {
            "label": "FIUBA · Aprendizaje de Máquina I",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/aprMaqI_CEIA",
            "where": "Clases 1–7"
          },
          {
            "label": "OpenFING · Fundamentos de Aprendizaje Automático",
            "url": "https://open.fing.edu.uy/courses/fuaa/",
            "where": "Teórico 2021"
          }
        ],
        "study": "KNN, SVM, árboles, ensembles, boosting, bosques, clustering, GMM, calibración, selección, métricas, fuga, sesgo-varianza y explicabilidad.",
        "evidence": "Benchmark con baseline, separación temporal si corresponde, validación anidada, calibración, intervalos y model card."
      },
      {
        "name": "Taller aplicado",
        "sources": [
          {
            "label": "OpenFING · Taller de Aprendizaje Automático",
            "url": "https://open.fing.edu.uy/courses/taa/",
            "where": "Proyecto, modelos clásicos, ensambles, no supervisado y redes"
          }
        ],
        "study": "Ciclo de proyecto, limpieza, features, selección de hiperparámetros, entrenamiento, evaluación y comunicación responsable.",
        "evidence": "Modelo de predicción o priorización de incidentes con baseline no-ML y decisión explícita de desplegar o no."
      }
    ],
    "gate": "Reproducibilidad desde datos crudos, baseline superado de forma válida, ausencia de fuga, model card y defensa estadística.",
    "capstone": "Producto de ML responsable sobre datos públicos: baseline, validación, explicación, evaluación por subgrupos y model card.",
    "index": 13,
    "year": "Especialización avanzada"
  },
  {
    "code": "S14",
    "title": "Deep learning, NLP, visión y modelos generativos",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S13 aprobado.",
    "outcome": "Comprender y construir redes profundas, sistemas de lenguaje/visión y prototipos generativos evaluados con rigor.",
    "subjects": [
      {
        "name": "Aprendizaje profundo",
        "sources": [
          {
            "label": "FIUBA · Aprendizaje Profundo 2026",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/aprendizaje_profundo/tree/ap_2026",
            "where": "Clases 1–8"
          },
          {
            "label": "OpenFING · Taller de Aprendizaje Automático",
            "url": "https://open.fing.edu.uy/courses/taa/",
            "where": "Bloque de redes profundas"
          }
        ],
        "study": "Feedforward, activaciones, pérdidas, optimización, PyTorch, regularización, embeddings, CNN, RNN, atención, encoder-decoder, autoencoders, transfer y GAN.",
        "evidence": "Implementar red simple desde principios y otra en PyTorch; curvas, ablaciones, semillas, costo y errores."
      },
      {
        "name": "Procesamiento de lenguaje natural",
        "sources": [
          {
            "label": "FIUBA · PLN 2026",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/procesamiento_lenguaje_natural/tree/jul_2026",
            "where": "Clases 1–8"
          },
          {
            "label": "OpenFING · Redes Neuronales para Lenguaje",
            "url": "https://open.fing.edu.uy/courses/rn-2024/",
            "where": "Clases 1–17"
          }
        ],
        "study": "Vectorización, recuperación, embeddings, RNN/LSTM, seq2seq, atención, Transformers, BERT/GPT, ajuste, evaluación, multimodalidad, APIs y despliegue.",
        "evidence": "Clasificador y buscador semántico de documentos públicos con conjunto de prueba, errores categorizados y evaluación humana."
      },
      {
        "name": "Visión por computadora",
        "sources": [
          {
            "label": "FIUBA · Visión por Computadora I",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/vision_computadora_I",
            "where": "Revisar la rama vigente y prácticas clásicas"
          },
          {
            "label": "FIUBA · Visión por Computadora II 2026",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/vision_computadora_II/tree/VpC2_2026",
            "where": "Clases 1–8"
          }
        ],
        "study": "Imagen clásica, EDA y aumentación, CNN, transfer, detección, YOLO, segmentación, métricas, autoencoders, GAN, superresolución, profundidad, captioning y multimodalidad.",
        "evidence": "Proyecto de detección/segmentación con dataset documentado, métricas, latencia, privacidad y análisis de fallos."
      },
      {
        "name": "LLM, RAG, agentes y multimodalidad",
        "sources": [
          {
            "label": "FIUBA · LLM e IA Generativa",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA-LLMIAG",
            "where": "Programa 1–8"
          },
          {
            "label": "FIUBA · Visual Transformers",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA-ViT",
            "where": "Programa 1–8"
          }
        ],
        "study": "Tokenización, decoder, evaluación, modelos locales, prompts, RAG, vector DB, agentes, fine-tuning, razonamiento, MoE, ViT, CLIP, SAM, OCR y modelos multimodales.",
        "evidence": "Asistente sobre documentos públicos con citas, recuperación evaluada, conjunto adversarial, límites, trazas, costos y modo sin modelo."
      }
    ],
    "gate": "Ablaciones, evaluación contra baseline, documentación de datos/modelo, pruebas adversariales y defensa de riesgos/latencia/costo.",
    "capstone": "Laboratorio multimodal: un proyecto de NLP, uno de visión y un asistente RAG con citas, evaluación adversarial y modo sin modelo.",
    "index": 14,
    "year": "Especialización avanzada"
  },
  {
    "code": "S15",
    "title": "MLOps, seguridad avanzada, nube y resiliencia",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S14 aprobado.",
    "outcome": "Operar datos y modelos con seguridad, observabilidad, evaluación continua, recuperación y gobierno.",
    "subjects": [
      {
        "name": "MLOps",
        "sources": [
          {
            "label": "FIUBA · Operaciones de Aprendizaje Automático I",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/aprendizaje_maquina_II",
            "where": "Clases 1–7"
          }
        ],
        "study": "Ciclo de ML, buenas prácticas, Docker, infraestructura, MLflow, Airflow, batch, API/microservicio, estrategias de despliegue y producción.",
        "evidence": "Pipeline de entrenamiento versionado, registro de modelo, servicio batch/online local, pruebas y rollback."
      },
      {
        "name": "Seguridad de redes y soporte",
        "sources": [
          {
            "label": "Cisco · Soporte y Seguridad de Red",
            "url": "https://www.netacad.com/es/courses/network-support-security",
            "where": "Curso completo"
          },
          {
            "label": "OpenFING · Redes de Datos 1",
            "url": "https://open.fing.edu.uy/courses/rd1-2025/",
            "where": "Capas, seguridad y gestión"
          }
        ],
        "study": "Hardening, segmentación, identidad, firewall, VPN conceptual, diagnóstico, gestión, vulnerabilidades, parches, registros y respuesta.",
        "evidence": "Laboratorio blue-team local con segmentación, escaneo autorizado, reglas, alertas y recuperación."
      },
      {
        "name": "Seguridad y gobierno de IA",
        "sources": [
          {
            "label": "Microsoft Learn · Seguridad e IA responsable",
            "url": "https://learn.microsoft.com/es-es/training/browse/?terms=seguridad%20IA%20responsable",
            "where": "Elegir rutas gratuitas y en español"
          },
          {
            "label": "FIUBA · LLM e IA Generativa",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA-LLMIAG",
            "where": "Evaluación, RAG y agentes"
          }
        ],
        "study": "Prompt injection, envenenamiento, fuga, extracción, evaluación, acceso mínimo, aprobación humana, contenido, privacidad, procedencia y respuesta a incidentes de IA.",
        "evidence": "Threat model específico de IA, pruebas de inyección/exfiltración y controles de autorización por herramienta."
      },
      {
        "name": "Confiabilidad, continuidad y finanzas de nube",
        "sources": [
          {
            "label": "PabloRioseco · Fases 3–4",
            "url": "https://github.com/PabloRioseco/plan-estudio-ingenieria-software",
            "where": "Observabilidad, KPIs, incidentes y gestión"
          },
          {
            "label": "Microsoft Learn · Arquitectura y FinOps",
            "url": "https://learn.microsoft.com/es-es/training/browse/?terms=arquitectura%20nube%20costos",
            "where": "Recursos gratuitos"
          }
        ],
        "study": "SLO, capacidad, caos controlado, RTO/RPO, backups, DR, continuidad, costo total, límites, cuotas y sostenibilidad.",
        "evidence": "Game day de caída, corrupción y degradación de modelo; informe, restauración y acciones correctivas."
      }
    ],
    "gate": "Despliegue reversible, modelo monitorizado, incidente de IA contenido, recuperación RTO/RPO demostrada y cero secretos expuestos.",
    "capstone": "Sistema de IA operable en local: pipeline versionado, registro, servicio, evaluación continua, seguridad, SLO y recuperación.",
    "index": 15,
    "year": "Especialización avanzada"
  },
  {
    "code": "S16",
    "title": "Hardware digital, electrónica y sistemas embebidos",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S15 aprobado; física, arquitectura y C básicos.",
    "outcome": "Conectar software con circuitos, microcontroladores, tiempo real y restricciones de energía/seguridad.",
    "subjects": [
      {
        "name": "Circuitos y electrónica",
        "sources": [
          {
            "label": "OpenFING · Teoría de Circuitos",
            "url": "https://open.fing.edu.uy/courses/tdc2020/",
            "where": "Unidades 1–10"
          },
          {
            "label": "OpenFING · Electrónica Fundamental",
            "url": "https://open.fing.edu.uy/courses/ef/",
            "where": "MOS y prácticos"
          },
          {
            "label": "OpenFING · Electrónica 1",
            "url": "https://open.fing.edu.uy/courses/e1/",
            "where": "Clases disponibles"
          }
        ],
        "study": "Circuitos, Thévenin/Norton, op-amps, régimen sinusoidal, Bode, Laplace, filtros, líneas, MOS, medición y seguridad eléctrica.",
        "evidence": "Simulación SPICE o equivalente libre, mediciones de bajo voltaje y reporte de incertidumbre; no trabajar con red eléctrica."
      },
      {
        "name": "Diseño digital y microarquitectura",
        "sources": [
          {
            "label": "OpenFING · Diseño Lógico",
            "url": "https://open.fing.edu.uy/courses/dl-2026/",
            "where": "Teórico 2026 y práctico"
          },
          {
            "label": "OpenFING · Arquitectura de Computadoras",
            "url": "https://open.fing.edu.uy/courses/arqcomp/",
            "where": "Teórico 2022"
          }
        ],
        "study": "Lógica, FSM, temporización, datapath/control, ISA, memoria, buses, interrupciones y verificación.",
        "evidence": "CPU o periférico pequeño en simulador HDL con banco de pruebas y especificación."
      },
      {
        "name": "Sistemas embebidos y tiempo real",
        "sources": [
          {
            "label": "OpenFING · Sistemas Embebidos para Tiempo Real",
            "url": "https://open.fing.edu.uy/courses/sisem/",
            "where": "Clases 1–17"
          }
        ],
        "study": "C, toolchain, microcontroladores, interrupciones, concurrencia, periféricos, bajo consumo, Doxygen, pruebas, RTOS y criterios de diseño.",
        "evidence": "Firmware simulado o sobre placa disponible; telemetría, watchdog, pruebas y actualización recuperable."
      },
      {
        "name": "Señales y control",
        "sources": [
          {
            "label": "OpenFING · Señales y Sistemas",
            "url": "https://open.fing.edu.uy/courses/seys/",
            "where": "Laplace, SLIT y muestreo"
          },
          {
            "label": "OpenFING · Sistemas y Control 2026",
            "url": "https://open.fing.edu.uy/courses/syc-2026/",
            "where": "Teórico vigente"
          }
        ],
        "study": "Señales continuas/discretas, respuesta, muestreo, aliasing, estabilidad, realimentación, control y conexión sensor-actuador.",
        "evidence": "Control simulado de un sistema físico con ruido, límites, latencia y análisis de estabilidad."
      }
    ],
    "gate": "Diseño digital verificado, firmware con fallos controlados, análisis de señal/control y revisión de seguridad física.",
    "capstone": "Sistema embebido simulado o en placa disponible: firmware, sensores, telemetría, watchdog, pruebas y actualización recuperable.",
    "index": 16,
    "year": "Especialización avanzada"
  },
  {
    "code": "S17",
    "title": "Telecomunicaciones, IoT, sistemas ciberfísicos y alto rendimiento",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S16 aprobado.",
    "outcome": "Diseñar comunicaciones y cómputo distribuido/parallel para sistemas conectados, físicos y de gran escala.",
    "subjects": [
      {
        "name": "Redes avanzadas y telecomunicaciones IP",
        "sources": [
          {
            "label": "OpenFING · Redes de Datos 2",
            "url": "https://open.fing.edu.uy/courses/redes2/",
            "where": "IPv6, OSPF, BGP, MPLS, QoS, SR, SDN y NFV"
          },
          {
            "label": "OpenFING · Tecnologías de Redes y Telecom",
            "url": "https://open.fing.edu.uy/courses/trst/",
            "where": "Clases 1–26"
          }
        ],
        "study": "IPv6, routing interno/externo, MPLS, VPN, QoS, segment routing, SDN/NFV, multimedia, señalización, acceso, móvil, tráfico y QoE.",
        "evidence": "Diseño de operador/laboratorio simulado con direccionamiento, routing, QoS, observabilidad y análisis de fallos."
      },
      {
        "name": "Radio, antenas e información",
        "sources": [
          {
            "label": "OpenFING · Antenas y Propagación",
            "url": "https://open.fing.edu.uy/courses/ayp/",
            "where": "Clases disponibles"
          },
          {
            "label": "OpenFING · Teoría de la Información",
            "url": "https://open.fing.edu.uy/courses/iti/",
            "where": "Teórico 2020"
          },
          {
            "label": "OpenFING · Corrección de Errores",
            "url": "https://open.fing.edu.uy/courses/cce/",
            "where": "Material disponible"
          }
        ],
        "study": "Propagación, enlace, ruido, capacidad, entropía, codificación y corrección; comprender fundamentos que sobreviven de 2G a 6G.",
        "evidence": "Presupuesto de enlace y simulación de canal/código con curvas de error y supuestos."
      },
      {
        "name": "IoT y sistemas ciberfísicos",
        "sources": [
          {
            "label": "OpenFING · Taller de Iniciación Ciberfísica",
            "url": "https://open.fing.edu.uy/courses/tiscf/",
            "where": "Plataforma IoT"
          },
          {
            "label": "OpenFING · Taller de Sistemas Ciberfísicos",
            "url": "https://open.fing.edu.uy/courses/tsc-f/",
            "where": "Presentaciones y proyectos"
          }
        ],
        "study": "Sensores, actuadores, edge, mensajería, tiempo, gemelo digital, seguridad, actualizaciones, flota, fallos y seguridad funcional conceptual.",
        "evidence": "Sistema IoT local simulado con dispositivo, broker, procesamiento, tablero, desconexión y actualización segura."
      },
      {
        "name": "HPC, paralelismo y aceleradores",
        "sources": [
          {
            "label": "OpenFING · Computación de Alta Performance",
            "url": "https://open.fing.edu.uy/courses/hpc/",
            "where": "Clases 1–6"
          },
          {
            "label": "OpenFING · Paralelización Híbrida",
            "url": "https://open.fing.edu.uy/courses/paar/",
            "where": "OpenMP, CUDA, OpenACC y MPI"
          },
          {
            "label": "OpenFING · Procesadores Multicore Masivos",
            "url": "https://open.fing.edu.uy/courses/pmm/",
            "where": "Clases disponibles"
          }
        ],
        "study": "Arquitecturas paralelas, threads, OpenMP, MPI, GPU/CUDA conceptual, localidad, profiling, escalabilidad, eficiencia y reproducibilidad.",
        "evidence": "Paralelizar un cálculo científico, medir speedup/eficiencia y explicar límites con Amdahl/Gustafson."
      },
      {
        "name": "Robótica integrada",
        "sources": [
          {
            "label": "OpenFING · Sistemas y Control",
            "url": "https://open.fing.edu.uy/courses/syc-2026/",
            "where": "Control"
          },
          {
            "label": "FIUBA · Visión por Computadora II",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/vision_computadora_II/tree/VpC2_2026",
            "where": "Percepción"
          }
        ],
        "study": "Integrar percepción, estimación básica, planificación conceptual, control, tiempo real, comunicaciones y seguridad. La robótica experta requerirá además un laboratorio físico y material ROS, que no está completo en español dentro del conjunto mínimo.",
        "evidence": "Robot móvil simulado que perciba, planifique una ruta sencilla, controle movimiento y entre en estado seguro ante fallos."
      }
    ],
    "gate": "Red avanzada simulada, enlace/canal calculado, IoT tolerante a desconexión, speedup medido y robot simulado seguro.",
    "capstone": "Gemelo digital de infraestructura: red avanzada, enlace simulado, IoT tolerante a fallos, cómputo paralelo y robot simulado.",
    "index": 17,
    "year": "Especialización avanzada"
  },
  {
    "code": "S18",
    "title": "Computación gráfica, videojuegos, 3D, XR y multimedia",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S17 aprobado; álgebra, física, programación y GPU firmes.",
    "outcome": "Crear experiencias gráficas interactivas con un pipeline 2D/3D/XR, rendimiento medido y activos propios.",
    "subjects": [
      {
        "name": "Fundamentos y render avanzado",
        "sources": [
          {
            "label": "OpenFING · Computación Gráfica Avanzada",
            "url": "https://open.fing.edu.uy/courses/cga/",
            "where": "Photon mapping, OptiX/Embree y pipeline"
          }
        ],
        "study": "Transformaciones, cámara, rasterización y trazado conceptual, iluminación, materiales, aceleración, color, percepción y rendimiento.",
        "evidence": "Mini-renderer o demo gráfica con perfil de GPU/CPU y explicación del pipeline."
      },
      {
        "name": "Godot 2D, 3D y arquitectura de juegos",
        "sources": [
          {
            "label": "Godot · Documentación estable en español",
            "url": "https://docs.godotengine.org/es/stable/",
            "where": "Primeros pasos, manual y tutoriales"
          },
          {
            "label": "Godot · Primer juego 2D",
            "url": "https://docs.godotengine.org/es/stable/getting_started/first_2d_game/index.html",
            "where": "Tutorial completo"
          },
          {
            "label": "Godot · Primer juego 3D",
            "url": "https://docs.godotengine.org/es/stable/getting_started/first_3d_game/index.html",
            "where": "Tutorial completo"
          }
        ],
        "study": "Escenas/nodos, señales, física, entrada, UI, audio, animación, guardado, arquitectura, depuración, profiling, exportación y pruebas.",
        "evidence": "Juego 2D pequeño y prototipo 3D con código limpio, telemetría local, accesibilidad y build reproducible."
      },
      {
        "name": "Modelado, animación y producción 3D",
        "sources": [
          {
            "label": "Blender · Manual en español",
            "url": "https://docs.blender.org/manual/es/latest/",
            "where": "Interfaz → modelado → UV/materiales → rig/animación → render/exportación"
          }
        ],
        "study": "Topología, UV, materiales, iluminación, rigging, animación, cámara, render, optimización y exportación a motor.",
        "evidence": "Paquete de activos propios optimizados con licencias, LOD y guía de importación."
      },
      {
        "name": "XR y multimedia",
        "sources": [
          {
            "label": "Godot · XR",
            "url": "https://docs.godotengine.org/es/stable/tutorials/xr/index.html",
            "where": "Arquitectura, OpenXR, interacción y rendimiento"
          },
          {
            "label": "OpenFING · Producción Audiovisual y Multimedia",
            "url": "https://open.fing.edu.uy/courses/ipam/",
            "where": "Cámara, sonido, lenguaje y narrativa"
          }
        ],
        "study": "OpenXR, interacción espacial, comodidad, latencia, accesibilidad, audio, cámara, narrativa y captura; usar simulador si no hay visor.",
        "evidence": "Demo XR simulada o desktop 3D y pieza audiovisual que explique una arquitectura técnica."
      }
    ],
    "gate": "Demo estable con perfil, activos propios, build reproducible, evaluación de usabilidad y ausencia de contenido sin licencia.",
    "capstone": "Experiencia gráfica propia: juego 2D, prototipo 3D/XR simulado, activos Blender originales, perfil de rendimiento y evaluación de usabilidad.",
    "index": 18,
    "year": "Especialización avanzada"
  },
  {
    "code": "S19",
    "title": "Bioinformática, computación científica, cuántica y frontera investigadora",
    "duration": "24 semanas · 600 horas",
    "prerequisites": "S18 aprobado; elegir problemas con datos y límites éticos claros.",
    "outcome": "Transferir la base a ciencia y tecnologías emergentes, reproducir investigación y producir una contribución original modesta.",
    "subjects": [
      {
        "name": "Bioinformática y filogenética",
        "sources": [
          {
            "label": "UNAM · Cursos de bioinformática",
            "url": "https://www.ccg.unam.mx/~vinuesa/cursos.html",
            "where": "Elegir introducción, alineamiento, filogenética y análisis reproducible"
          },
          {
            "label": "UNAM · Tutoriales en español",
            "url": "https://www.ccg.unam.mx/~vinuesa/Tutoriales_y_cursos_bioinfo_filogen%C3%A9tica_espa%C3%B1ol_PV.html",
            "where": "Tutoriales y cursos"
          }
        ],
        "study": "Secuencias, formatos, alineamiento, búsqueda, filogenética, datos biológicos, pipelines y reproducibilidad; estudiar biología básica necesaria para no interpretar mal.",
        "evidence": "Pipeline reproducible sobre datos públicos con ambiente, procedencia, parámetros y advertencias biológicas."
      },
      {
        "name": "Computación científica informada por física",
        "sources": [
          {
            "label": "FIUBA · PINN 2026",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA-PINN/tree/3b2026",
            "where": "Módulos y prácticas de la rama 2026"
          },
          {
            "label": "OpenFING · Modelado Cuantitativo",
            "url": "https://open.fing.edu.uy/courses/mcpp/",
            "where": "Modelos lineales, enteros y mixtos"
          }
        ],
        "study": "Modelos, EDO/EDP, optimización, simulación, PINN, validación física, unidades, incertidumbre y límites de aproximación.",
        "evidence": "Reproducir un problema físico con método numérico clásico y PINN; comparar error, costo y validez."
      },
      {
        "name": "Computación cuántica",
        "sources": [
          {
            "label": "Microsoft Learn · Azure Quantum",
            "url": "https://learn.microsoft.com/es-es/azure/quantum/overview-azure-quantum",
            "where": "Conceptos, Q#, algoritmos y simulación cuando estén disponibles"
          }
        ],
        "study": "Qubits, puertas, medición, circuitos, entrelazamiento, algoritmos introductorios, simulación, ruido, complejidad y criptografía poscuántica conceptual.",
        "evidence": "Simulación local de circuitos, explicación matemática y análisis honesto de qué ventaja no se ha demostrado."
      },
      {
        "name": "Métodos formales y verificación",
        "sources": [
          {
            "label": "OpenFING · Construcción Formal en Teoría de Tipos",
            "url": "https://open.fing.edu.uy/courses/cfptt/",
            "where": "Teórico 2023"
          },
          {
            "label": "FAMAF · Lógica",
            "url": "https://github.com/FAMAF-resources/4to_2C-Logica-FAMAF",
            "where": "Material y ejercicios"
          }
        ],
        "study": "Tipos, pruebas como programas, especificaciones, invariantes, asistentes de prueba conceptuales y límites de verificación.",
        "evidence": "Especificar y demostrar propiedades de un componente pequeño o producir una verificación formal parcial con supuestos explícitos."
      },
      {
        "name": "Investigación, contribución abierta y futuro",
        "sources": [
          {
            "label": "CS2023 · Referencia internacional",
            "url": "https://csed.acm.org/",
            "where": "Usar solo para auditoría de áreas; está en inglés"
          },
          {
            "label": "OpenFING · Catálogo",
            "url": "https://open.fing.edu.uy/courses/",
            "where": "Revisar cursos recientes"
          },
          {
            "label": "FIUBA · Organización IA",
            "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial",
            "where": "Revisar ramas/repositorios vigentes"
          }
        ],
        "study": "Búsqueda bibliográfica, preguntas, hipótesis, reproducción, ablation, amenazas a validez, revisión, datos/código abiertos, ética, escritura, charla y mantenimiento. A partir de aquí el inglés técnico es inevitable para frontera mundial.",
        "evidence": "Reproducir dos trabajos, contribuir una mejora aceptada a un proyecto abierto y presentar un artículo técnico original con código/datos reproducibles."
      }
    ],
    "gate": "Reproducciones independientes, revisión externa, artefacto reproducible, contribución pública y defensa de límites/ética.",
    "capstone": "Trabajo de investigación reproducible: réplica de dos resultados, contribución abierta y artículo técnico original con código y datos.",
    "index": 19,
    "year": "Especialización avanzada"
  }
];

export const rootSources: RootSource[] = [
  { n: 1, name: "Plan FING Ingeniería en Computación 2025", url: "https://eva.fing.edu.uy/pluginfile.php/79029/mod_resource/content/4/PlanEstudios_IngComp-2025.pdf", kind: "Validador", use: "Valida amplitud, profundidad, créditos y secuencia de una ingeniería universitaria completa." },
  { n: 2, name: "CS2023 ACM/IEEE-CS/AAAI", url: "https://csed.acm.org/", kind: "Validador", use: "Valida el núcleo internacional de Computer Science y sus áreas de conocimiento." },
  { n: 3, name: "OpenFING", url: "https://open.fing.edu.uy/courses/", kind: "Tronco", use: "Principal columna docente en español: matemática, programación, teoría, sistemas, redes, hardware, electrónica y electivas." },
  { n: 4, name: "FAMAF Resources", url: "https://github.com/FAMAF-resources/Welcome", kind: "Tronco", use: "Secuencia 1.º–5.º año con apuntes, guías, ejercicios y exámenes de Ciencias de la Computación." },
  { n: 5, name: "UBA · valn/uba", url: "https://gitlab.com/valn/uba", kind: "Profundidad", use: "Apuntes, clases, prácticas, soluciones y parciales de materias duras de Ciencias de la Computación." },
  { n: 6, name: "UTN FRBA · briancol07/utn", url: "https://gitlab.com/briancol07/utn", kind: "Sistemas", use: "Ingeniería en Sistemas: algoritmos, matemática, arquitectura, SO, diseño, seguridad, criptografía, economía y legislación." },
  { n: 7, name: "UNLP · Licenciatura en Informática", url: "https://gitlab.com/menduinajuan/Licenciatura_en_Informatica_UNLP", kind: "Profundidad", use: "Contenido teórico-práctico de materias de la Licenciatura en Informática de la UNLP." },
  { n: 8, name: "UOC · Ingeniería Informática", url: "https://github.com/HenestrosaDev/uoc-ingenieria-informatica", kind: "Práctica universitaria", use: "PEC, ejercicios, prácticas y exámenes reales disponibles de un grado de Ingeniería Informática." },
  { n: 9, name: "Full Stack Open · Español", url: "https://fullstackopen.com/es/", kind: "Laboratorio", use: "Web moderna de producción: React, Node, TypeScript, GraphQL, pruebas, CI/CD, contenedores y datos." },
  { n: 10, name: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/", kind: "Laboratorio", use: "Miles de ejercicios interactivos y proyectos gratuitos para programación, web, Python, SQL y ML." },
  { n: 11, name: "FIUBA CEIA", url: "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial", kind: "IA", use: "Material universitario de IA, estadística, análisis, ML, deep learning, NLP y visión, con repositorios activos." },
  { n: 12, name: "Caro Acosta · Ingeniería de Datos", url: "https://github.com/caroacostatovany/ingenieria-de-datos", kind: "Datos", use: "Ruta en español con SQL, Python, modelado, calidad, pipelines, orquestación y proyectos." },
  { n: 13, name: "Cisco Networking Academy", url: "https://www.netacad.com/", kind: "Redes/Seguridad", use: "Hardware, Linux, redes, soporte, IoT y ciberseguridad. En esta ruta solo se exigen opciones gratuitas." },
  { n: 14, name: "Microsoft Learn · Español", url: "https://learn.microsoft.com/es-es/training/browse/", kind: "Cloud/Empresa", use: "Rutas gratuitas de nube, DevOps, datos, IA, seguridad, Power Platform y administración." },
  { n: 15, name: "PabloRioseco · Software/SDM/ITSM", url: "https://github.com/PabloRioseco/plan-estudio-ingenieria-software", kind: "ITSM", use: "Apoyo para Linux, redes, cloud, servicios, observabilidad, SLA/SLO/SLI, agilidad y gestión." },
  { n: 16, name: "Godot · documentación ES", url: "https://docs.godotengine.org/es/stable/", kind: "Gráficos/Juegos", use: "Motor libre para 2D, 3D, scripting, físicas, rendimiento, networking y XR." },
  { n: 17, name: "Blender · manual ES", url: "https://docs.blender.org/manual/es/latest/", kind: "3D/Multimedia", use: "Modelado, materiales, rigging, animación, render, VFX y pipeline de assets." },
  { n: 18, name: "UNAM · Bioinformática", url: "https://www.ccg.unam.mx/~vinuesa/cursos.html", kind: "Ciencia", use: "Bioinformática y filogenética en español con enfoque reproducible." },
  { n: 19, name: "UNED Abierta / guías públicas", url: "https://unedabierta.uned.es/", kind: "Validador/Apoyo", use: "Recursos abiertos y guías universitarias en español para contrastar Ingeniería Informática e IA." },
  { n: 20, name: "roadmap.sh", url: "https://roadmap.sh/", kind: "Auditor de cobertura", use: "Checklist contemporáneo de roles y herramientas. Se enlaza para detectar huecos, no se replica su contenido." },
  { n: 21, name: "OSSU Computer Science / Math / Data Science", url: "https://github.com/ossu", kind: "Auditor externo", use: "Contraste de profundidad con currículos autodidactas internacionales; usar traducción cuando el recurso solo exista en inglés." },
  { n: 22, name: "Roadmap de IA en español", url: "https://github.com/AndresF-GaleanoT/roadmap-ingeniero-ia-spanish", kind: "Catálogo IA", use: "Catálogo español de recursos de IA; filtrar estrictamente los que sean gratuitos." },
  { n: 23, name: "Data Science Research Perú · Open Source RoadMap", url: "https://github.com/DataScienceResearchPeru/OpenSource-RoadMap-DataScience", kind: "Datos/Ciencia de datos", use: "Ruta autodidacta en ciencia de datos usada como fuente secundaria y control de cobertura; contrastar actualidad de cada recurso." },
  { n: 24, name: "NatayaDev · Data Engineering Roadmap", url: "https://github.com/natayadev/dataengineering-roadmap", kind: "Datos", use: "Catálogo en español de ingeniería de datos, retos y recursos; usar como complemento, no como currículo universitario único." },
  { n: 25, name: "The Odin Project", url: "https://www.theodinproject.com/paths", kind: "Laboratorio software", use: "Práctica extensa basada en proyectos para fundamentos web y full stack; usar cuando aporte evidencia práctica." },
  { n: 26, name: "MedinaLeonel · DevPath", url: "https://github.com/MedinaLeonel/DevPath", kind: "Desarrollo", use: "Roadmap práctico de desarrollo usado como auditor secundario para herramientas y secuencia profesional." },
  { n: 27, name: "ETSIIT · Ingeniería Informática", url: "https://gitlab.com/juanka1995/ingenieria_informatica_etsiit", kind: "Universidad/Apoyo", use: "Material académico aportado para contrastar asignaturas y prácticas de Ingeniería Informática." },
  { n: 28, name: "Jhamil17 · Plan curricular CSS", url: "https://github.com/Jhamil17/plan-curricular-css", kind: "Auditor secundario", use: "Repositorio aportado por la comunidad. Antes de convertir cualquier recurso en obligatorio debe pasar la auditoría de vigencia, gratuidad y profundidad." }
];
