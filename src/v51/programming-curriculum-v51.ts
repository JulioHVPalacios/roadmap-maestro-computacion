import { sourceByIdV51 } from "./programming-sources-v51"

export type LessonLanguageV51 = "python" | "javascript" | "web" | "text"

export type ConceptSeedV51 = {
  id: string
  title: string
  what: string
  why: string
  use: string
  model: string
  language: LessonLanguageV51
  code: string
  expected: string
  experiment: string
}

export type ProgrammingLevelV51 = {
  code: string
  title: string
  phase: string
  goal: string
  topics: ConceptSeedV51[]
  project: string
  gate: string
  sources: string[]
}

export type ProgrammingPhaseV51 = { id: string; title: string; range: string; description: string }

export const programmingPhasesV51: ProgrammingPhaseV51[] = [
  {
    "id": "p0",
    "title": "Cero absoluto",
    "range": "L00–L03",
    "description": "Computadora, programa, entorno, algoritmos y depuración sin asumir conocimientos previos."
  },
  {
    "id": "p1",
    "title": "Programación fundamental",
    "range": "L04–L09",
    "description": "Python como vehículo para datos, control, funciones, colecciones, archivos y errores."
  },
  {
    "id": "p2",
    "title": "Algoritmos y estructuras",
    "range": "L10–L17",
    "description": "Corrección, complejidad, estructuras, grafos y estrategias algorítmicas."
  },
  {
    "id": "p3",
    "title": "Paradigmas y lenguajes",
    "range": "L18–L22",
    "description": "Objetos, funcional, lógica, tipos y concurrencia."
  },
  {
    "id": "p4",
    "title": "Sistemas para programadores",
    "range": "L23–L27",
    "description": "C, memoria, arquitectura, SO, redes y distribuidos."
  },
  {
    "id": "p5",
    "title": "Ingeniería de software",
    "range": "L28–L33",
    "description": "Git, requisitos, diseño, testing, refactoring y arquitectura."
  },
  {
    "id": "p6",
    "title": "Plataformas, web y datos",
    "range": "L34–L38",
    "description": "Web, TypeScript, backend, bases de datos, CI/CD, cloud y observabilidad."
  },
  {
    "id": "p7",
    "title": "Fundamentos avanzados",
    "range": "L39–L43",
    "description": "Teoría, compiladores, runtimes, performance y paralelismo/GPU."
  },
  {
    "id": "p8",
    "title": "Profesional y frontera",
    "range": "L44–L47",
    "description": "Ecosistemas, móvil/embedded, data engineering, IA engineering y capstone."
  }
]

export const programmingLevelsV51: ProgrammingLevelV51[] = [
  {
    "code": "L00",
    "title": "Antes del código: computadora, programa y problema",
    "phase": "FASE 0 · CERO ABSOLUTO",
    "goal": "Entender qué estás haciendo antes de aprender sintaxis.",
    "topics": [
      {
        "id": "computer",
        "title": "Qué hace una computadora",
        "what": "Una computadora recibe información, representa datos, ejecuta instrucciones y produce cambios o resultados.",
        "why": "Si no distingues datos de instrucciones, la programación se vuelve memorización sin modelo mental.",
        "use": "Úsalo para razonar qué puede y qué no puede resolver un programa.",
        "model": "Imagina una máquina extremadamente rápida y obediente: no adivina; ejecuta instrucciones precisas.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "program",
        "title": "Qué es un programa",
        "what": "Un programa es una descripción ejecutable de un procedimiento escrita en un lenguaje que una plataforma puede interpretar o compilar.",
        "why": "Permite convertir una solución pensada por una persona en pasos repetibles por una máquina.",
        "use": "Cuando una tarea necesita automatización, transformación de datos, control o interacción.",
        "model": "Problema → algoritmo → código fuente → ejecución → resultado.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "source",
        "title": "Código fuente, archivo y extensión",
        "what": "El código fuente es texto; normalmente se guarda en archivos cuya extensión ayuda a las herramientas a reconocer el lenguaje.",
        "why": "Separar texto, archivo y programa evita confundir “escribir código” con “tener algo ejecutándose”.",
        "use": "Cada vez que creas, abres, guardas o compartes código.",
        "model": "Un archivo .py o .js es un recipiente de texto; el runtime es quien lo ejecuta.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "io",
        "title": "Entrada, proceso y salida",
        "what": "Entrada es lo que recibe el programa; proceso es lo que hace; salida es lo que entrega o modifica.",
        "why": "Es el esquema mínimo para describir casi cualquier programa.",
        "use": "Antes de programar cualquier problema.",
        "model": "Entrada → transformación → salida. Si no puedes escribir estas tres partes, aún no entiendes el problema.",
        "language": "python",
        "code": "nombre = \"Ada\"\nprint(\"Hola\", nombre)",
        "expected": "Hola Ada",
        "experiment": "Cambia el nombre y predice exactamente qué texto aparecerá."
      }
    ],
    "project": "Ficha de un problema cotidiano descrita como entrada → proceso → salida.",
    "gate": "Puedes explicar sin jerga qué es un programa, un archivo, código fuente y una ejecución.",
    "sources": [
      "fing-plan-2025",
      "cs2023",
      "ossu-cs",
      "mit-60001",
      "py4e"
    ]
  },
  {
    "code": "L01",
    "title": "Entorno: editor, terminal, carpeta y ejecución",
    "phase": "FASE 0 · CERO ABSOLUTO",
    "goal": "Saber dónde escribir, guardar y ejecutar sin depender de instrucciones mágicas.",
    "topics": [
      {
        "id": "editor",
        "title": "Editor de código",
        "what": "Un editor de código es una herramienta para crear y modificar archivos de texto fuente con ayudas para programar.",
        "why": "Te permite trabajar de forma controlada con archivos reales.",
        "use": "Cuando escribes, navegas, refactorizas o inspeccionas código.",
        "model": "VS Code es como una mesa de trabajo: el archivo es el documento y el editor es la herramienta.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "filesystem",
        "title": "Carpetas, rutas y archivos",
        "what": "Una ruta identifica dónde está un archivo dentro del sistema de archivos.",
        "why": "Muchos errores de principiante ocurren por ejecutar un comando en la carpeta equivocada.",
        "use": "Al abrir proyectos, importar archivos, usar terminal, Git o herramientas.",
        "model": "La carpeta actual es tu “ubicación”; una ruta es la dirección para llegar a otro archivo.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "terminal",
        "title": "Terminal y línea de comandos",
        "what": "La terminal es una interfaz textual desde la que escribes comandos que el sistema operativo ejecuta.",
        "why": "Herramientas profesionales como Git, compiladores, gestores de paquetes y servidores se controlan desde terminal.",
        "use": "Cuando necesitas ejecutar programas, automatizar o controlar herramientas con precisión.",
        "model": "Prompt → comando → argumentos → proceso → salida/código de estado.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "run",
        "title": "Ejecutar un archivo",
        "what": "Ejecutar significa pedir a un intérprete, runtime o sistema operativo que procese las instrucciones del programa.",
        "why": "Guardar un archivo no lo ejecuta; distinguir ambas acciones evita confusión.",
        "use": "Cada vez que pruebas un programa.",
        "model": "Escribes → guardas → ejecutas → observas salida → corriges.",
        "language": "python",
        "code": "print(\"Mi primer programa\")",
        "expected": "Mi primer programa",
        "experiment": "Cambia solo el texto entre comillas; no cambies paréntesis ni print."
      }
    ],
    "project": "Crear una carpeta, un archivo main.py, ejecutarlo y documentar cada paso con palabras propias.",
    "gate": "Puedes explicar qué botón/comando usar, dónde mirar la salida y qué hacer si la terminal está en otra carpeta.",
    "sources": [
      "missing-semester",
      "mdn",
      "pro-git",
      "mit-60001"
    ]
  },
  {
    "code": "L02",
    "title": "Algoritmos, pseudocódigo y trazas",
    "phase": "FASE 0 · CERO ABSOLUTO",
    "goal": "Resolver primero la lógica y después elegir sintaxis.",
    "topics": [
      {
        "id": "algorithm",
        "title": "Algoritmo",
        "what": "Un algoritmo es una secuencia finita y precisa de pasos para transformar entradas en una salida.",
        "why": "El código correcto nace de una solución lógica clara.",
        "use": "Antes de implementar problemas no triviales.",
        "model": "Receta precisa con inicio, pasos, decisiones, repeticiones y fin.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "pseudocode",
        "title": "Pseudocódigo",
        "what": "El pseudocódigo describe lógica con lenguaje estructurado sin depender de la sintaxis exacta de Python, JavaScript u otro lenguaje.",
        "why": "Permite concentrarte en la solución antes de luchar con símbolos.",
        "use": "Para diseñar, comunicar o revisar algoritmos.",
        "model": "Es el puente entre una explicación humana y el código.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "flow",
        "title": "Flujo de control",
        "what": "El flujo de control describe qué instrucción se ejecuta después y bajo qué condición.",
        "why": "Todo programa necesita un orden de ejecución, decisiones o repeticiones.",
        "use": "Al leer o diseñar secuencias, if, bucles y funciones.",
        "model": "Un camino con bifurcaciones y retornos, no un conjunto de líneas aisladas.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "trace",
        "title": "Traza manual",
        "what": "Una traza es una simulación paso a paso donde anotas valores y decisiones después de cada instrucción.",
        "why": "Obliga a razonar y permite encontrar el primer punto donde tu expectativa diverge del programa.",
        "use": "Para aprender, depurar bucles, recursión y algoritmos.",
        "model": "Tabla: paso | instrucción | estado antes | estado después.",
        "language": "python",
        "code": "x = 2\nx = x + 3\nx = x * 2\nprint(x)",
        "expected": "10",
        "experiment": "Traza x después de cada línea antes de ejecutar."
      }
    ],
    "project": "Diseñar en pseudocódigo y trazar un algoritmo que calcule el total de una compra.",
    "gate": "Puedes convertir un problema en pasos y predecir cada cambio de estado.",
    "sources": [
      "htdp",
      "famaf-lcc",
      "midudev-books",
      "free-books"
    ]
  },
  {
    "code": "L03",
    "title": "Errores, mensajes y depuración desde el primer día",
    "phase": "FASE 0 · CERO ABSOLUTO",
    "goal": "Aprender que un error es información, no una señal para borrar todo.",
    "topics": [
      {
        "id": "syntax-error",
        "title": "Error de sintaxis",
        "what": "Ocurre cuando el código no respeta la gramática del lenguaje y el parser no puede interpretarlo.",
        "why": "Aprender a leerlo evita corregir al azar.",
        "use": "Cuando el programa ni siquiera puede comenzar a ejecutarse.",
        "model": "El lenguaje intenta “leer” la frase y encuentra una estructura imposible.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "runtime-error",
        "title": "Error de ejecución",
        "what": "Ocurre después de que el programa comenzó pero una operación falla durante la ejecución.",
        "why": "Distinguirlo del error de sintaxis reduce el espacio de búsqueda.",
        "use": "División por cero, archivo inexistente, índice inválido, conversión fallida, etc.",
        "model": "La frase era válida, pero al ejecutar una acción concreta aparece un problema.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "logic-error",
        "title": "Error lógico",
        "what": "El programa se ejecuta sin fallar, pero produce un resultado incorrecto.",
        "why": "Es el tipo que requiere comparar comportamiento esperado y real.",
        "use": "Cuando la salida no cumple el requisito aunque no haya excepción.",
        "model": "No hay alarma automática: necesitas ejemplos, tests y trazas.",
        "language": "text",
        "code": "",
        "expected": "",
        "experiment": "Cambia un elemento del ejemplo y explica antes de ejecutar qué efecto esperas."
      },
      {
        "id": "debug-cycle",
        "title": "Ciclo de depuración",
        "what": "Depurar es reproducir, observar, aislar, formular hipótesis, corregir una causa y verificar con una prueba.",
        "why": "Evita cambios aleatorios y crea una habilidad profesional transferible.",
        "use": "Siempre que el comportamiento difiera de lo esperado.",
        "model": "Caso mínimo → primera divergencia → hipótesis → corrección → test de regresión.",
        "language": "python",
        "code": "precio = 10\ncantidad = 3\nprint(precio * cantidad)",
        "expected": "30",
        "experiment": "Rompe deliberadamente una variable, lee el error y vuelve a corregir una sola causa."
      }
    ],
    "project": "Crear tres errores deliberados y escribir cómo los diagnosticastes sin adivinar.",
    "gate": "Puedes clasificar un error y seguir un procedimiento reproducible para localizarlo.",
    "sources": [
      "mit-6005",
      "think-python",
      "google-eng-practices",
      "missing-semester"
    ]
  },
  {
    "code": "L04",
    "title": "Valores, tipos, variables y expresiones",
    "phase": "FASE 1 · PROGRAMACIÓN FUNDAMENTAL",
    "goal": "Representar datos y transformarlos con precisión.",
    "topics": [
      {
        "id": "values",
        "title": "Valores y tipos",
        "what": "Un valor es una pieza concreta de información; su tipo define qué operaciones tienen sentido y cómo se representa.",
        "why": "Los programas manipulan datos, y los tipos ayudan a interpretar esos datos.",
        "use": "Siempre que modelas números, texto, booleanos u otros objetos.",
        "model": "Dato + tipo = significado operativo.",
        "language": "python",
        "code": "edad = 20\nnombre = \"Ada\"\nactivo = True\nprint(type(edad), type(nombre), type(activo))",
        "expected": "<class 'int'> <class 'str'> <class 'bool'>",
        "experiment": "Cambia edad por 20.5 y observa el tipo."
      },
      {
        "id": "assignment",
        "title": "Asignación y variables",
        "what": "La asignación asocia un nombre con un valor evaluado en ese momento.",
        "why": "Permite recordar y reutilizar información.",
        "use": "Para entradas, resultados intermedios, configuración y estado.",
        "model": "Derecha se evalúa primero; luego el nombre de la izquierda referencia el resultado.",
        "language": "python",
        "code": "precio = 12\ncantidad = 4\ntotal = precio * cantidad\nprint(total)",
        "expected": "48",
        "experiment": "Cambia cantidad a 5 y predice total."
      },
      {
        "id": "expressions",
        "title": "Expresiones y operadores",
        "what": "Una expresión combina valores, nombres y operadores para producir otro valor.",
        "why": "Es la unidad básica del cálculo.",
        "use": "Aritmética, comparaciones, lógica, concatenación y transformaciones.",
        "model": "Los operadores forman un árbol de evaluación sujeto a precedencia.",
        "language": "python",
        "code": "resultado = (10 + 2) * 3\nprint(resultado)",
        "expected": "36",
        "experiment": "Quita los paréntesis y explica por qué cambia o no el resultado."
      },
      {
        "id": "conversion",
        "title": "Conversión de tipos",
        "what": "Convertir transforma explícitamente un valor de una representación a otra cuando la operación lo permite.",
        "why": "Las entradas suelen llegar como texto aunque conceptualmente representen números.",
        "use": "Al leer input, archivos, APIs o datos externos.",
        "model": "\"42\" y 42 se parecen al verlos, pero son tipos distintos.",
        "language": "python",
        "code": "texto = \"42\"\nnumero = int(texto)\nprint(numero + 8)",
        "expected": "50",
        "experiment": "Prueba int(\"4.2\") y explica el mensaje de error."
      }
    ],
    "project": "Calculadora de compra con validación básica de tipos.",
    "gate": "Puedes predecir tipos, evaluar expresiones y explicar la diferencia entre = y una comparación.",
    "sources": [
      "py4e",
      "think-python",
      "python-docs",
      "mit-60001"
    ]
  },
  {
    "code": "L05",
    "title": "Entrada, salida, strings y formato",
    "phase": "FASE 1 · PROGRAMACIÓN FUNDAMENTAL",
    "goal": "Construir programas que reciban información y comuniquen resultados.",
    "topics": [
      {
        "id": "input",
        "title": "Entrada del usuario",
        "what": "La entrada introduce datos externos en el programa; en consola, input devuelve texto.",
        "why": "Un programa útil suele depender de datos que no conocías al escribirlo.",
        "use": "Formularios, CLI, archivos, sensores, red y usuario.",
        "model": "El límite del programa recibe datos que luego debes validar.",
        "language": "python",
        "code": "nombre = input(\"Nombre: \")\nprint(\"Hola\", nombre)",
        "expected": "depende de la entrada",
        "experiment": "Escribe un nombre vacío y piensa qué debería hacer un programa robusto."
      },
      {
        "id": "strings",
        "title": "Strings",
        "what": "Un string es una secuencia de caracteres utilizada para representar texto.",
        "why": "Texto aparece en interfaces, archivos, protocolos, datos y mensajes.",
        "use": "Nombres, descripciones, URLs, JSON, logs y más.",
        "model": "Secuencia indexada de caracteres con operaciones de búsqueda y transformación.",
        "language": "python",
        "code": "texto = \"programar\"\nprint(texto[0], len(texto), texto.upper())",
        "expected": "p 9 PROGRAMAR",
        "experiment": "Cambia la palabra y predice índice 0 y longitud."
      },
      {
        "id": "format",
        "title": "Formato de salida",
        "what": "Formatear construye texto legible a partir de valores usando reglas explícitas.",
        "why": "Separar datos de presentación mejora claridad.",
        "use": "Mensajes, reportes, logs y UI textual.",
        "model": "Plantilla + valores → mensaje final.",
        "language": "python",
        "code": "nombre = \"Ada\"\npuntos = 95\nprint(f\"{nombre}: {puntos} puntos\")",
        "expected": "Ada: 95 puntos",
        "experiment": "Agrega una variable nivel y muéstrala en la misma línea."
      },
      {
        "id": "validation",
        "title": "Validación de entrada",
        "what": "Validar comprueba si un dato cumple las reglas antes de utilizarlo.",
        "why": "Los datos externos pueden ser vacíos, inválidos o maliciosos.",
        "use": "En toda frontera de entrada.",
        "model": "No confíes en el dato: comprobar → convertir → usar.",
        "language": "python",
        "code": "texto = \"25\"\nif texto.isdigit():\n    edad = int(texto)\n    print(edad)",
        "expected": "25",
        "experiment": "Prueba texto = \"veinticinco\" y explica por qué no entra al bloque."
      }
    ],
    "project": "CLI que pide nombre y edad, valida y genera un resumen claro.",
    "gate": "Puedes diseñar entradas, validarlas y producir mensajes legibles.",
    "sources": [
      "py4e",
      "think-python",
      "python-docs"
    ]
  },
  {
    "code": "L06",
    "title": "Condiciones y lógica booleana",
    "phase": "FASE 1 · PROGRAMACIÓN FUNDAMENTAL",
    "goal": "Tomar decisiones correctas y comprensibles.",
    "topics": [
      {
        "id": "comparison",
        "title": "Comparaciones",
        "what": "Una comparación evalúa una relación y produce True o False.",
        "why": "Las decisiones necesitan condiciones verificables.",
        "use": "Igualdad, orden, pertenencia y reglas.",
        "model": "Pregunta cerrada → booleano.",
        "language": "python",
        "code": "edad = 20\nprint(edad >= 18)",
        "expected": "True",
        "experiment": "Prueba 17, 18 y 19; identifica el borde exacto."
      },
      {
        "id": "if",
        "title": "if / elif / else",
        "what": "Una estructura condicional elige qué bloque ejecutar según condiciones evaluadas en orden.",
        "why": "Permite comportamientos diferentes para casos diferentes.",
        "use": "Reglas, clasificación, permisos y validación.",
        "model": "Se evalúa de arriba abajo; ejecuta la primera rama aplicable.",
        "language": "python",
        "code": "nota = 15\nif nota >= 18:\n    print(\"Excelente\")\nelif nota >= 11:\n    print(\"Aprobado\")\nelse:\n    print(\"Revisar\")",
        "expected": "Aprobado",
        "experiment": "Prueba 10, 11, 17 y 18 para entender fronteras."
      },
      {
        "id": "boolean-ops",
        "title": "and, or, not",
        "what": "Operadores booleanos combinan o invierten condiciones.",
        "why": "Reglas reales suelen depender de más de una condición.",
        "use": "Permisos, filtros, validaciones compuestas.",
        "model": "and exige todo; or exige al menos uno; not invierte.",
        "language": "python",
        "code": "edad = 20\ntiene_id = True\nprint(edad >= 18 and tiene_id)",
        "expected": "True",
        "experiment": "Haz tiene_id=False y explica el resultado."
      },
      {
        "id": "truth-table",
        "title": "Tablas de verdad y cortocircuito",
        "what": "Una tabla de verdad enumera resultados posibles; el cortocircuito puede evitar evaluar la segunda parte si el resultado ya está decidido.",
        "why": "Evita condiciones ambiguas y explica comportamientos sutiles.",
        "use": "Lógica compleja y condiciones con llamadas costosas o inseguras.",
        "model": "Evalúa posibilidades explícitamente en vez de confiar en intuición.",
        "language": "python",
        "code": "x = 0\nprint(x != 0 and 10 / x > 1)",
        "expected": "False",
        "experiment": "Explica por qué no ocurre división por cero."
      }
    ],
    "project": "Motor pequeño de reglas con casos normales y límites.",
    "gate": "Puedes construir y simplificar condiciones, justificar cada rama y probar fronteras.",
    "sources": [
      "py4e",
      "think-python",
      "htdp",
      "famaf-lcc"
    ]
  },
  {
    "code": "L07",
    "title": "Bucles e iteración",
    "phase": "FASE 1 · PROGRAMACIÓN FUNDAMENTAL",
    "goal": "Repetir trabajo sin duplicar código y saber por qué termina.",
    "topics": [
      {
        "id": "for",
        "title": "Bucle for",
        "what": "for recorre elementos de un iterable uno por uno.",
        "why": "Automatiza una misma operación sobre una colección.",
        "use": "Cuando conoces la colección o rango a recorrer.",
        "model": "Cada vuelta asigna el siguiente elemento y ejecuta el cuerpo.",
        "language": "python",
        "code": "for numero in [2, 4, 6]:\n    print(numero * 2)",
        "expected": "4\n8\n12",
        "experiment": "Agrega 8 a la lista y predice una línea nueva."
      },
      {
        "id": "while",
        "title": "Bucle while",
        "what": "while repite mientras una condición sea verdadera.",
        "why": "Sirve cuando la cantidad de repeticiones depende de un estado que cambia.",
        "use": "Reintentos, lectura hasta señal, simulaciones.",
        "model": "Condición → cuerpo → actualización → condición de nuevo.",
        "language": "python",
        "code": "n = 3\nwhile n > 0:\n    print(n)\n    n -= 1",
        "expected": "3\n2\n1",
        "experiment": "Quita n -= 1 mentalmente y explica el bucle infinito."
      },
      {
        "id": "accumulator",
        "title": "Contadores y acumuladores",
        "what": "Un acumulador conserva un resultado parcial que se actualiza en cada iteración.",
        "why": "Muchos algoritmos reducen una secuencia a un total, máximo, promedio o estado.",
        "use": "Suma, conteo, agregación, estadísticas.",
        "model": "Estado parcial + elemento actual → nuevo estado parcial.",
        "language": "python",
        "code": "total = 0\nfor n in [3, 5, 7]:\n    total += n\nprint(total)",
        "expected": "15",
        "experiment": "Traza total después de cada vuelta."
      },
      {
        "id": "loop-control",
        "title": "break, continue e invariantes",
        "what": "break termina un bucle; continue salta a la siguiente vuelta; una invariante describe una propiedad que debe mantenerse.",
        "why": "Permite controlar bucles y razonar sobre su corrección.",
        "use": "Búsquedas, filtros y pruebas de correctitud.",
        "model": "No solo preguntes “funciona”; pregunta qué es verdadero antes y después de cada iteración.",
        "language": "python",
        "code": "for n in range(1, 10):\n    if n == 5:\n        break\n    print(n)",
        "expected": "1\n2\n3\n4",
        "experiment": "Cambia break por continue y predice la diferencia."
      }
    ],
    "project": "Analizador de una lista que calcule conteo, suma, promedio y máximo sin funciones auxiliares.",
    "gate": "Puedes justificar que el bucle termina, trazar su estado y explicar su invariante.",
    "sources": [
      "py4e",
      "think-python",
      "famaf-lcc",
      "mit-60001"
    ]
  },
  {
    "code": "L08",
    "title": "Funciones, parámetros, retorno y alcance",
    "phase": "FASE 1 · PROGRAMACIÓN FUNDAMENTAL",
    "goal": "Dividir problemas en unidades con contratos claros.",
    "topics": [
      {
        "id": "function",
        "title": "Función",
        "what": "Una función encapsula un procedimiento con un nombre para poder invocarlo cuando se necesita.",
        "why": "Reduce repetición y crea unidades razonables de diseño, prueba y comprensión.",
        "use": "Cuando una operación tiene un propósito coherente y reutilizable.",
        "model": "Entrada → cuerpo → resultado/efecto.",
        "language": "python",
        "code": "def doble(n):\n    return n * 2\n\nprint(doble(6))",
        "expected": "12",
        "experiment": "Invoca doble con 0 y -3."
      },
      {
        "id": "params",
        "title": "Parámetros y argumentos",
        "what": "Los parámetros son nombres locales definidos por la función; los argumentos son los valores suministrados al llamarla.",
        "why": "Permiten generalizar una operación.",
        "use": "Siempre que una función dependa de datos externos.",
        "model": "La llamada enlaza argumentos concretos con parámetros temporales.",
        "language": "python",
        "code": "def saludar(nombre, prefijo):\n    return f\"{prefijo} {nombre}\"\n\nprint(saludar(\"Ada\", \"Hola\"))",
        "expected": "Hola Ada",
        "experiment": "Intercambia los argumentos y explica por qué cambia el significado."
      },
      {
        "id": "return",
        "title": "return y efectos",
        "what": "return entrega un valor al llamador; imprimir es un efecto visible y no equivale a retornar.",
        "why": "Confundir print con return dificulta composición y pruebas.",
        "use": "Al diseñar funciones reutilizables.",
        "model": "return pasa datos; print muestra datos.",
        "language": "python",
        "code": "def suma(a, b):\n    return a + b\n\nresultado = suma(2, 3)\nprint(resultado)",
        "expected": "5",
        "experiment": "Quita return y observa qué valor recibe resultado."
      },
      {
        "id": "scope",
        "title": "Alcance y variables locales",
        "what": "El alcance determina dónde un nombre es visible y qué binding representa.",
        "why": "Evita dependencias ocultas y colisiones de nombres.",
        "use": "Funciones, módulos, closures y objetos.",
        "model": "Cada función tiene su propio espacio de nombres local.",
        "language": "python",
        "code": "x = 10\ndef ejemplo():\n    x = 3\n    return x\nprint(ejemplo(), x)",
        "expected": "3 10",
        "experiment": "Renombra la variable local y comprueba que la global no cambia."
      }
    ],
    "project": "Biblioteca de funciones pequeñas con docstrings y tests de ejemplo.",
    "gate": "Puedes diseñar funciones que tengan una responsabilidad, parámetros claros y retorno comprobable.",
    "sources": [
      "think-python",
      "htdp",
      "mit-6005",
      "python-docs"
    ]
  },
  {
    "code": "L09",
    "title": "Colecciones, strings, archivos y excepciones",
    "phase": "FASE 1 · PROGRAMACIÓN FUNDAMENTAL",
    "goal": "Manipular conjuntos de datos y manejar fallos previsibles.",
    "topics": [
      {
        "id": "collections",
        "title": "Listas, tuplas, conjuntos y diccionarios",
        "what": "Colecciones organizan múltiples valores con diferentes garantías de orden, mutabilidad, unicidad y acceso.",
        "why": "Elegir la estructura correcta simplifica el algoritmo.",
        "use": "Datos agrupados, búsquedas por clave, conjuntos únicos, secuencias.",
        "model": "La estructura es una decisión de diseño, no solo una sintaxis.",
        "language": "python",
        "code": "persona = {\"nombre\": \"Ada\", \"edad\": 36}\nprint(persona[\"nombre\"])",
        "expected": "Ada",
        "experiment": "Agrega una clave lenguaje y luego léela."
      },
      {
        "id": "comprehensions",
        "title": "Comprensiones",
        "what": "Una comprensión construye una colección aplicando una transformación y opcionalmente un filtro.",
        "why": "Expresa transformaciones sencillas de forma declarativa.",
        "use": "Map/filter simples donde la legibilidad mejora.",
        "model": "Recorre → filtra → transforma → construye.",
        "language": "python",
        "code": "cuadrados = [n*n for n in range(6) if n % 2 == 0]\nprint(cuadrados)",
        "expected": "[0, 4, 16]",
        "experiment": "Quita el filtro y predice la nueva lista."
      },
      {
        "id": "files",
        "title": "Archivos y contexto",
        "what": "Leer o escribir archivos conecta el programa con datos persistentes del sistema.",
        "why": "Los programas reales necesitan conservar o importar información.",
        "use": "Configuración, logs, datos, reportes.",
        "model": "Abrir recurso → usar → cerrar incluso si ocurre un error.",
        "language": "python",
        "code": "texto = \"uno\\ndos\\n\"\nlineas = texto.splitlines()\nprint(len(lineas))",
        "expected": "2",
        "experiment": "Explica por qué splitlines produce dos elementos."
      },
      {
        "id": "exceptions",
        "title": "Excepciones",
        "what": "Una excepción interrumpe el flujo normal para representar un fallo que puede propagarse o manejarse.",
        "why": "Permite separar el camino normal de ciertos errores recuperables.",
        "use": "Fronteras de I/O, conversiones y operaciones que pueden fallar.",
        "model": "Intenta → falla → stack se desenrolla hasta un handler compatible.",
        "language": "python",
        "code": "try:\n    numero = int(\"x\")\nexcept ValueError as error:\n    print(type(error).__name__)",
        "expected": "ValueError",
        "experiment": "Cambia \"x\" por \"10\" y explica por qué no entra al except."
      }
    ],
    "project": "Procesador de archivo simulado que valide filas y reporte errores sin detener todo el programa.",
    "gate": "Puedes elegir colecciones, separar I/O de lógica y manejar excepciones específicas.",
    "sources": [
      "python-docs",
      "py4e",
      "think-python",
      "mit-6005"
    ]
  },
  {
    "code": "L10",
    "title": "Corrección, contratos, tests y diseño sistemático",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Dejar de confiar en ejemplos aislados y empezar a demostrar comportamiento.",
    "topics": [
      {
        "id": "contract",
        "title": "Precondiciones y postcondiciones",
        "what": "Una precondición describe qué debe cumplirse antes; una postcondición describe qué garantiza la operación al terminar.",
        "why": "Hace explícito el contrato entre quien llama y quien implementa.",
        "use": "Funciones, APIs, algoritmos y módulos.",
        "model": "Contrato = condiciones de entrada + garantía de salida.",
        "language": "python",
        "code": "def porcentaje(parte, total):\n    assert total > 0\n    return parte / total * 100\nprint(porcentaje(2, 4))",
        "expected": "50.0",
        "experiment": "Prueba total=0 y relaciona el fallo con la precondición."
      },
      {
        "id": "tests",
        "title": "Casos normales, borde e inválidos",
        "what": "Un buen conjunto de pruebas cubre comportamiento representativo, fronteras y entradas que violan supuestos.",
        "why": "Un único ejemplo puede esconder fallos.",
        "use": "Toda lógica que importa.",
        "model": "Ejemplo normal + borde mínimo/máximo + caso inválido + regresión.",
        "language": "python",
        "code": "def es_par(n): return n % 2 == 0\nassert es_par(0)\nassert es_par(2)\nassert not es_par(3)\nprint(\"ok\")",
        "expected": "ok",
        "experiment": "Agrega pruebas para negativos."
      },
      {
        "id": "invariant",
        "title": "Invariantes",
        "what": "Una invariante es una propiedad que se mantiene en puntos definidos de un algoritmo.",
        "why": "Permite razonar formalmente sobre bucles y estructuras.",
        "use": "Algoritmos iterativos, estructuras de datos, estados.",
        "model": "Si la propiedad es verdadera antes y cada paso la preserva, sigue siendo verdadera.",
        "language": "text",
        "code": "Antes de cada vuelta: total == suma de los elementos ya procesados.",
        "expected": "",
        "experiment": "Formula una invariante para contar elementos positivos."
      },
      {
        "id": "design-recipe",
        "title": "Receta de diseño",
        "what": "Un proceso sistemático parte de datos, firma/contrato, ejemplos, plantilla, implementación y pruebas.",
        "why": "Reduce ensayo y error y hace reproducible el diseño.",
        "use": "Problemas nuevos o cuando no sabes cómo empezar.",
        "model": "Datos → ejemplos → contrato → estructura → código → tests → refactor.",
        "language": "text",
        "code": "Problema: calcular descuento según tipo de cliente.",
        "expected": "",
        "experiment": "Escribe ejemplos concretos antes de escribir pseudocódigo."
      }
    ],
    "project": "Especificar y probar una pequeña biblioteca de cálculo con contratos explícitos.",
    "gate": "Puedes justificar por qué tus tests aportan evidencia y qué no demuestran.",
    "sources": [
      "htdp",
      "mit-6005",
      "famaf-lcc",
      "google-eng-practices"
    ]
  },
  {
    "code": "L11",
    "title": "Complejidad y coste",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Estimar cómo crece tiempo y memoria antes de optimizar.",
    "topics": [
      {
        "id": "cost-model",
        "title": "Modelo de coste",
        "what": "Un modelo de coste decide qué operaciones contar para analizar un algoritmo independientemente de una máquina concreta.",
        "why": "Sin modelo no existe análisis de complejidad significativo.",
        "use": "Comparación de algoritmos y estructuras.",
        "model": "Tamaño de entrada n → número aproximado de operaciones.",
        "language": "text",
        "code": "Búsqueda lineal: en el peor caso inspecciona n elementos.",
        "expected": "",
        "experiment": "Cuenta cuántas comparaciones hace para n=5."
      },
      {
        "id": "big-o",
        "title": "Notación O grande",
        "what": "O grande expresa una cota asintótica del crecimiento ignorando constantes y términos menores.",
        "why": "Permite razonar sobre escalabilidad.",
        "use": "Cuando n puede crecer y comparas enfoques.",
        "model": "No mide segundos; describe cómo crece el trabajo.",
        "language": "python",
        "code": "for n in [10, 100, 1000]:\n    print(n, n, n*n)",
        "expected": "10 10 100\n100 100 10000\n1000 1000 1000000",
        "experiment": "Compara crecimiento n y n²."
      },
      {
        "id": "time-space",
        "title": "Tiempo y espacio",
        "what": "Un algoritmo puede intercambiar memoria por tiempo o viceversa.",
        "why": "Optimizar solo una dimensión puede empeorar la otra.",
        "use": "Caches, índices, DP, estructuras precomputadas.",
        "model": "Presupuesto doble: operaciones + memoria adicional.",
        "language": "text",
        "code": "Guardar resultados ya calculados usa memoria para evitar repetir trabajo.",
        "expected": "",
        "experiment": "Da un ejemplo donde una tabla acelera consultas."
      },
      {
        "id": "benchmark",
        "title": "Benchmark responsable",
        "what": "Un benchmark mide implementación real bajo condiciones controladas; no sustituye el análisis asintótico.",
        "why": "La plataforma, datos, calentamiento y ruido pueden distorsionar conclusiones.",
        "use": "Cuando comparas implementaciones reales.",
        "model": "Hipótesis → medir → repetir → reportar ambiente → interpretar.",
        "language": "python",
        "code": "import time\ninicio = time.perf_counter()\nsum(range(100000))\nprint(time.perf_counter() - inicio)",
        "expected": "un número >= 0",
        "experiment": "Ejecuta varias veces y explica la variación."
      }
    ],
    "project": "Informe que compare dos soluciones con análisis y medición separadas.",
    "gate": "Puedes distinguir O(n), tiempo real, caso peor/promedio y coste de memoria.",
    "sources": [
      "mit-6006",
      "ods",
      "famaf-lcc",
      "mit-performance"
    ]
  },
  {
    "code": "L12",
    "title": "Arrays/listas, pilas y colas",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Elegir estructuras secuenciales según sus operaciones.",
    "topics": [
      {
        "id": "array",
        "title": "Array / lista dinámica",
        "what": "Un array almacena elementos en posiciones indexadas; una lista dinámica administra capacidad para crecer.",
        "why": "El acceso por índice y la localidad de memoria son muy eficientes.",
        "use": "Secuencias donde importan posiciones y recorrido.",
        "model": "Casillas contiguas numeradas; crecer puede requerir reservar y copiar.",
        "language": "python",
        "code": "datos = [10,20,30]\nprint(datos[1])\ndatos.append(40)\nprint(datos)",
        "expected": "20\n[10, 20, 30, 40]",
        "experiment": "Inserta al inicio y piensa en el coste de desplazar."
      },
      {
        "id": "linked",
        "title": "Lista enlazada",
        "what": "Una lista enlazada representa cada elemento como un nodo que referencia al siguiente y, a veces, al anterior.",
        "why": "Permite ciertas inserciones/eliminaciones sin mover un bloque contiguo.",
        "use": "Cuando tienes referencias a nodos y el patrón de operaciones lo justifica.",
        "model": "Cadena de nodos conectados por enlaces.",
        "language": "text",
        "code": "A → B → C → ∅",
        "expected": "",
        "experiment": "Describe qué referencias cambian al insertar X entre A y B."
      },
      {
        "id": "stack",
        "title": "Pila",
        "what": "Una pila sigue LIFO: el último elemento agregado es el primero en salir.",
        "why": "Modela anidamiento y retroceso natural.",
        "use": "Call stack, undo, parsing, DFS.",
        "model": "Pila de platos: push arriba, pop arriba.",
        "language": "python",
        "code": "pila=[]\npila.append(\"A\")\npila.append(\"B\")\nprint(pila.pop())",
        "expected": "B",
        "experiment": "Predice la pila restante."
      },
      {
        "id": "queue",
        "title": "Cola",
        "what": "Una cola sigue FIFO: el primero en entrar es el primero en salir.",
        "why": "Modela procesamiento justo por orden de llegada.",
        "use": "Tareas, BFS, buffers, mensajes.",
        "model": "Fila de personas: entra por atrás, sale por delante.",
        "language": "python",
        "code": "from collections import deque\nq=deque([\"A\",\"B\"])\nq.append(\"C\")\nprint(q.popleft())",
        "expected": "A",
        "experiment": "Predice el contenido restante."
      }
    ],
    "project": "Implementar y probar stack y queue con operaciones y casos vacíos.",
    "gate": "Puedes justificar una estructura por sus operaciones y costes.",
    "sources": [
      "ods",
      "mit-6006",
      "famaf-lcc",
      "midudev-books"
    ]
  },
  {
    "code": "L13",
    "title": "Hash maps, sets y hashing",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Comprender acceso por clave, colisiones e igualdad.",
    "topics": [
      {
        "id": "hash-map",
        "title": "Tabla hash",
        "what": "Una tabla hash transforma una clave con una función hash para ubicarla en una estructura de buckets.",
        "why": "Ofrece búsquedas promedio muy rápidas cuando está bien dimensionada.",
        "use": "Diccionarios, índices en memoria, conteos, caches.",
        "model": "Clave → hash → bucket → comparar claves.",
        "language": "python",
        "code": "conteo={}\nfor palabra in [\"a\",\"b\",\"a\"]:\n    conteo[palabra]=conteo.get(palabra,0)+1\nprint(conteo)",
        "expected": "{'a': 2, 'b': 1}",
        "experiment": "Agrega otra b y predice."
      },
      {
        "id": "hash-fn",
        "title": "Función hash",
        "what": "Una función hash produce un entero derivado de una clave con propiedades necesarias para la tabla.",
        "why": "Distribución deficiente genera demasiadas colisiones.",
        "use": "Cuando implementas/analizas estructuras por hashing.",
        "model": "No es cifrado: sirve para distribución/identificación según contexto.",
        "language": "text",
        "code": "hash(clave) → entero → índice",
        "expected": "",
        "experiment": "Explica por qué dos claves pueden compartir bucket."
      },
      {
        "id": "collision",
        "title": "Colisiones y factor de carga",
        "what": "Una colisión ocurre cuando claves diferentes llegan a la misma ubicación lógica; la estructura necesita resolverla.",
        "why": "Las colisiones afectan rendimiento pero son normales.",
        "use": "Diseño/diagnóstico de hash tables.",
        "model": "Buckets con encadenamiento o probing; capacidad y carga importan.",
        "language": "text",
        "code": "bucket 3: [(\"ana\", 1), (\"luis\", 2)]",
        "expected": "",
        "experiment": "Describe cómo buscarías luis."
      },
      {
        "id": "set",
        "title": "Set",
        "what": "Un set representa elementos únicos y optimiza pertenencia, unión, intersección y diferencia.",
        "why": "Evita duplicados y simplifica problemas de pertenencia.",
        "use": "Deduplicación, permisos, etiquetas, grafos.",
        "model": "Conjunto matemático implementado normalmente con hashing o árbol.",
        "language": "python",
        "code": "a={1,2,3}\nb={3,4}\nprint(a & b, a | b)",
        "expected": "{3} {1, 2, 3, 4}",
        "experiment": "Predice a-b."
      }
    ],
    "project": "Contador de frecuencias y detector de duplicados con análisis de complejidad.",
    "gate": "Puedes explicar hashing, colisiones, igualdad y elegir dict/set con intención.",
    "sources": [
      "ods",
      "mit-6006",
      "famaf-lcc"
    ]
  },
  {
    "code": "L14",
    "title": "Recursión, búsqueda y ordenamiento",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Entender auto-referencia y algoritmos clásicos como modelos de diseño.",
    "topics": [
      {
        "id": "recursion",
        "title": "Recursión",
        "what": "Una función recursiva resuelve un problema usando una instancia más pequeña del mismo problema y necesita un caso base.",
        "why": "Expresa naturalmente estructuras y definiciones recursivas.",
        "use": "Árboles, divide y vencerás, backtracking.",
        "model": "Caso base detiene; caso recursivo reduce el problema.",
        "language": "python",
        "code": "def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n-1)\nprint(factorial(5))",
        "expected": "120",
        "experiment": "Traza las llamadas y retornos."
      },
      {
        "id": "linear-search",
        "title": "Búsqueda lineal",
        "what": "Inspecciona elementos uno por uno hasta encontrar el objetivo o terminar.",
        "why": "Funciona sin requerir ordenamiento y establece una línea base O(n).",
        "use": "Colecciones pequeñas o no ordenadas.",
        "model": "Mirar casilla 0, 1, 2... hasta éxito o fin.",
        "language": "python",
        "code": "datos=[7,3,9]\nobjetivo=9\nprint(next((i for i,x in enumerate(datos) if x==objetivo), -1))",
        "expected": "2",
        "experiment": "Busca un valor ausente."
      },
      {
        "id": "binary-search",
        "title": "Búsqueda binaria",
        "what": "Descarta la mitad del espacio de búsqueda en cada paso usando una colección ordenada.",
        "why": "Reduce búsquedas a crecimiento logarítmico.",
        "use": "Datos ordenados con acceso al elemento medio.",
        "model": "Compara con medio → conserva solo la mitad posible.",
        "language": "python",
        "code": "datos=[2,4,6,8,10]\n# objetivo 8: medio 6 -> mitad derecha -> 8",
        "expected": "",
        "experiment": "Realiza manualmente la búsqueda de 10 y cuenta comparaciones."
      },
      {
        "id": "sorting",
        "title": "Ordenamiento",
        "what": "Ordenar reacomoda elementos según un criterio; distintos algoritmos ofrecen diferentes costes y propiedades.",
        "why": "El orden puede habilitar búsquedas, agrupación y procesamiento eficiente.",
        "use": "Cuando consultas posteriores se benefician del orden.",
        "model": "Comparar/intercambiar o dividir/combinar según algoritmo.",
        "language": "python",
        "code": "datos=[5,1,4,2]\nprint(sorted(datos))",
        "expected": "[1, 2, 4, 5]",
        "experiment": "Explica por qué sorted no demuestra qué algoritmo hay detrás."
      }
    ],
    "project": "Implementar búsqueda binaria y un ordenamiento, con trazas y tests.",
    "gate": "Puedes explicar caso base, stack de llamadas, precondición de búsqueda binaria y estabilidad/coste de sort.",
    "sources": [
      "mit-6006",
      "ods",
      "famaf-lcc"
    ]
  },
  {
    "code": "L15",
    "title": "Árboles, BST, heaps y tries",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Trabajar con estructuras jerárquicas y prioridades.",
    "topics": [
      {
        "id": "tree",
        "title": "Árbol",
        "what": "Un árbol organiza nodos en una jerarquía acíclica con relaciones padre-hijo.",
        "why": "Modela estructura jerárquica y habilita algoritmos recursivos.",
        "use": "DOM, filesystem, AST, índices.",
        "model": "Raíz → ramas → hojas; cada subárbol es otro árbol.",
        "language": "text",
        "code": "A\n├─ B\n└─ C",
        "expected": "",
        "experiment": "Identifica raíz, hojas y subárboles."
      },
      {
        "id": "bst",
        "title": "Árbol binario de búsqueda",
        "what": "Un BST mantiene una relación de orden: claves menores a un lado y mayores al otro según su invariante.",
        "why": "Permite búsqueda/inserción ordenada si la altura permanece controlada.",
        "use": "Conjuntos/mapas ordenados y enseñanza de árboles balanceados.",
        "model": "Cada comparación elige una rama.",
        "language": "text",
        "code": "    8\n   / \\n  3  10",
        "expected": "",
        "experiment": "Indica dónde insertarías 6."
      },
      {
        "id": "heap",
        "title": "Heap",
        "what": "Un heap mantiene una propiedad de prioridad entre padre e hijos y suele almacenarse en array.",
        "why": "Permite obtener/eliminar la prioridad extrema eficientemente.",
        "use": "Priority queues, scheduling, Dijkstra, heapsort.",
        "model": "Árbol casi completo + propiedad heap; no está totalmente ordenado.",
        "language": "python",
        "code": "import heapq\nh=[5,2,8]\nheapq.heapify(h)\nprint(heapq.heappop(h))",
        "expected": "2",
        "experiment": "Agrega 1 y predice el siguiente pop."
      },
      {
        "id": "trie",
        "title": "Trie",
        "what": "Un trie comparte prefijos entre claves, recorriendo símbolos en niveles.",
        "why": "Hace eficientes búsquedas por prefijo.",
        "use": "Autocompletado, diccionarios, routing por prefijos.",
        "model": "Cada arista representa una parte de la clave.",
        "language": "text",
        "code": "c → a → s → a\n      └→ r → o",
        "expected": "",
        "experiment": "Explica el prefijo compartido."
      }
    ],
    "project": "Visualizador textual de árbol con inserción y recorrido.",
    "gate": "Puedes explicar invariantes y cuándo heap/BST/trie resuelven problemas distintos.",
    "sources": [
      "ods",
      "mit-6006",
      "famaf-lcc"
    ]
  },
  {
    "code": "L16",
    "title": "Grafos y algoritmos de caminos",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Modelar relaciones generales y recorrer redes.",
    "topics": [
      {
        "id": "graph",
        "title": "Grafo",
        "what": "Un grafo es un conjunto de vértices conectados por aristas, dirigidas o no y con o sin peso.",
        "why": "Modela relaciones que no caben en una simple jerarquía.",
        "use": "Redes, rutas, dependencias, recomendaciones, estados.",
        "model": "Vértices = entidades; aristas = relaciones.",
        "language": "text",
        "code": "A -- B\n|    |\nC -- D",
        "expected": "",
        "experiment": "Lista vecinos de B."
      },
      {
        "id": "bfs",
        "title": "BFS",
        "what": "Breadth-First Search explora por capas usando una cola.",
        "why": "En grafos no ponderados encuentra caminos con mínimo número de aristas.",
        "use": "Distancias por niveles, conectividad, shortest path no ponderado.",
        "model": "Frontera FIFO: primero todos los vecinos cercanos.",
        "language": "text",
        "code": "cola=[inicio]; visitar por capas",
        "expected": "",
        "experiment": "Explica por qué una cola preserva capas."
      },
      {
        "id": "dfs",
        "title": "DFS",
        "what": "Depth-First Search profundiza por un camino antes de retroceder, usando recursión o pila.",
        "why": "Sirve para componentes, ciclos, orden topológico y exploración estructural.",
        "use": "Recorridos donde importa explorar profundamente.",
        "model": "Pila de decisiones y backtracking.",
        "language": "text",
        "code": "push inicio → explora vecino no visitado → retrocede",
        "expected": "",
        "experiment": "Compara el orden de visita con BFS."
      },
      {
        "id": "shortest",
        "title": "Dijkstra y pesos",
        "what": "Dijkstra mantiene la mejor distancia conocida y expande el vértice pendiente con menor distancia para pesos no negativos.",
        "why": "Resuelve caminos mínimos ponderados bajo una condición precisa.",
        "use": "Rutas con costes no negativos.",
        "model": "Relajación de aristas + priority queue.",
        "language": "text",
        "code": "dist[inicio]=0; relajar vecinos por prioridad",
        "expected": "",
        "experiment": "Explica por qué un peso negativo rompe el supuesto."
      }
    ],
    "project": "Motor de rutas pequeñas con BFS, DFS y Dijkstra sobre el mismo grafo.",
    "gate": "Puedes elegir recorrido según el problema y justificar condiciones de corrección.",
    "sources": [
      "mit-6006",
      "ods",
      "famaf-lcc"
    ]
  },
  {
    "code": "L17",
    "title": "Diseño algorítmico: greedy, divide y vencerás, backtracking y DP",
    "phase": "FASE 2 · ALGORITMOS Y ESTRUCTURAS",
    "goal": "Reconocer estrategias para problemas nuevos.",
    "topics": [
      {
        "id": "greedy",
        "title": "Greedy",
        "what": "Una estrategia voraz toma en cada paso una decisión local que no revisa después.",
        "why": "Puede producir algoritmos simples y óptimos cuando existe una propiedad que lo justifica.",
        "use": "Problemas con prueba de elección voraz/intercambio.",
        "model": "Elige lo mejor ahora, pero exige demostrar que no bloquea el óptimo global.",
        "language": "text",
        "code": "ordenar candidatos → elegir siguiente compatible",
        "expected": "",
        "experiment": "Da un contraejemplo donde “lo mayor primero” falle."
      },
      {
        "id": "divide",
        "title": "Divide y vencerás",
        "what": "Divide un problema en subproblemas, los resuelve y combina sus resultados.",
        "why": "Puede reducir complejidad y aprovechar estructura recursiva.",
        "use": "Merge sort, binary search, geometría, FFT.",
        "model": "Dividir → resolver → combinar.",
        "language": "text",
        "code": "T(n)=aT(n/b)+trabajo de combinación",
        "expected": "",
        "experiment": "Identifica las tres fases de merge sort."
      },
      {
        "id": "backtracking",
        "title": "Backtracking",
        "what": "Construye soluciones parciales y retrocede cuando una elección ya no puede llevar a una solución válida.",
        "why": "Evita enumerar ciegamente todo el espacio cuando puedes podar.",
        "use": "Sudoku, N-queens, combinaciones con restricciones.",
        "model": "Elegir → comprobar → profundizar o deshacer.",
        "language": "text",
        "code": "estado parcial → candidato → válido? → recursión / undo",
        "expected": "",
        "experiment": "Explica qué información necesita undo."
      },
      {
        "id": "dp",
        "title": "Programación dinámica",
        "what": "DP reutiliza soluciones de subproblemas que se repiten, mediante memoización o tabla.",
        "why": "Evita recomputación exponencial cuando hay subestructura óptima y solapamiento.",
        "use": "Secuencias, caminos, optimización combinatoria.",
        "model": "Estado bien definido + recurrencia + base + orden de cálculo.",
        "language": "python",
        "code": "memo={0:0,1:1}\ndef fib(n):\n    if n not in memo: memo[n]=fib(n-1)+fib(n-2)\n    return memo[n]\nprint(fib(10))",
        "expected": "55",
        "experiment": "Cuenta cuántos estados distintos se almacenan hasta 10."
      }
    ],
    "project": "Resolver un problema por dos estrategias y justificar cuál aplica.",
    "gate": "Puedes reconocer patrón, escribir estado/recurrencia o condición de optimalidad y analizar coste.",
    "sources": [
      "mit-6006",
      "famaf-lcc",
      "cs2023"
    ]
  },
  {
    "code": "L18",
    "title": "Objetos, clases y encapsulación",
    "phase": "FASE 3 · PARADIGMAS Y LENGUAJES",
    "goal": "Modelar estado y comportamiento sin convertir todo en clases.",
    "topics": [
      {
        "id": "object",
        "title": "Objeto",
        "what": "Un objeto combina identidad, estado y comportamiento según el lenguaje y diseño.",
        "why": "Puede agrupar datos relacionados con operaciones que preservan invariantes.",
        "use": "Cuando una entidad tiene estado/coherencia que conviene encapsular.",
        "model": "Caja con interfaz pública e implementación interna.",
        "language": "python",
        "code": "class Contador:\n    def __init__(self): self.valor=0\n    def subir(self): self.valor += 1\nc=Contador(); c.subir(); print(c.valor)",
        "expected": "1",
        "experiment": "Agrega método bajar y decide una regla para no bajar de cero."
      },
      {
        "id": "encapsulation",
        "title": "Encapsulación",
        "what": "Encapsular restringe cómo se accede/modifica un estado para proteger invariantes y reducir acoplamiento.",
        "why": "Menos dependencias internas hacen el software más modificable.",
        "use": "Módulos, clases, APIs, componentes.",
        "model": "Oculta decisiones cambiantes detrás de una interfaz estable.",
        "language": "text",
        "code": "interfaz pública → implementación privada",
        "expected": "",
        "experiment": "Da un ejemplo de estado que no debería cambiarse libremente."
      },
      {
        "id": "composition",
        "title": "Composición",
        "what": "Composición construye comportamiento usando objetos/componentes colaboradores en lugar de heredar todo.",
        "why": "Reduce jerarquías rígidas y favorece piezas intercambiables.",
        "use": "Cuando una entidad “tiene” capacidades/colaboradores.",
        "model": "Objeto A contiene/usa B; delega una responsabilidad.",
        "language": "text",
        "code": "Pedido usa CalculadorDeImpuestos",
        "expected": "",
        "experiment": "Explica por qué “usa” no significa “es un”."
      },
      {
        "id": "polymorphism",
        "title": "Polimorfismo",
        "what": "Polimorfismo permite tratar valores diferentes a través de una interfaz común.",
        "why": "Reduce condicionales dependientes del tipo concreto.",
        "use": "Estrategias, drivers, adapters, colecciones heterogéneas.",
        "model": "Mismo mensaje/contrato, implementaciones distintas.",
        "language": "python",
        "code": "class A:\n    def hablar(self): return \"A\"\nclass B:\n    def hablar(self): return \"B\"\nfor x in [A(),B()]: print(x.hablar())",
        "expected": "A\nB",
        "experiment": "Agrega C sin modificar el bucle."
      }
    ],
    "project": "Diseñar un pequeño dominio con composición, invariantes y tests.",
    "gate": "Puedes justificar objeto vs función, encapsulación y composición sin abusar de herencia.",
    "sources": [
      "mit-6005",
      "ossu-cs",
      "famaf-lcc"
    ]
  },
  {
    "code": "L19",
    "title": "Programación funcional",
    "phase": "FASE 3 · PARADIGMAS Y LENGUAJES",
    "goal": "Pensar en transformación de valores, composición e inmutabilidad.",
    "topics": [
      {
        "id": "pure",
        "title": "Funciones puras",
        "what": "Una función pura produce el mismo resultado para los mismos argumentos y no modifica estado externo observable.",
        "why": "Facilita razonamiento, testing y paralelización.",
        "use": "Cálculos y transformaciones donde puedes separar efectos.",
        "model": "Entrada → salida sin historial oculto.",
        "language": "python",
        "code": "def area(base, altura): return base * altura / 2\nprint(area(4,3))",
        "expected": "6.0",
        "experiment": "Llama varias veces y explica por qué no depende del entorno."
      },
      {
        "id": "immutable",
        "title": "Inmutabilidad",
        "what": "Un valor inmutable no cambia después de crearse; una transformación produce otro valor.",
        "why": "Reduce interacciones temporales difíciles de rastrear.",
        "use": "Datos compartidos, concurrencia, pipelines funcionales.",
        "model": "Estado viejo → función → estado nuevo.",
        "language": "text",
        "code": "nuevo = actualizar(viejo)",
        "expected": "",
        "experiment": "Explica cómo evita una modificación sorpresa."
      },
      {
        "id": "higher-order",
        "title": "Funciones de orden superior",
        "what": "Pueden recibir funciones como argumentos o devolver funciones.",
        "why": "Permiten abstraer patrones de control y transformación.",
        "use": "map/filter/reduce, callbacks, composición.",
        "model": "Trata comportamiento como dato.",
        "language": "python",
        "code": "datos=[1,2,3]\nprint(list(map(lambda x:x*2, datos)))",
        "expected": "[2, 4, 6]",
        "experiment": "Reescribe con comprensión y compara legibilidad."
      },
      {
        "id": "closures",
        "title": "Closures",
        "what": "Un closure es una función que conserva acceso al entorno léxico donde fue creada.",
        "why": "Permite encapsular configuración/estado sin objetos explícitos.",
        "use": "Callbacks, fábricas de funciones, programación funcional.",
        "model": "Función + entorno capturado.",
        "language": "python",
        "code": "def multiplicador(k):\n    return lambda x: x*k\ndoble=multiplicador(2)\nprint(doble(5))",
        "expected": "10",
        "experiment": "Crea triple y explica qué valor queda capturado."
      }
    ],
    "project": "Pipeline de transformación de datos con funciones puras y tests.",
    "gate": "Puedes identificar efectos, componer funciones y explicar cierre léxico.",
    "sources": [
      "ossu-cs",
      "famaf-lcc",
      "sicp"
    ]
  },
  {
    "code": "L20",
    "title": "Programación lógica y declarativa",
    "phase": "FASE 3 · PARADIGMAS Y LENGUAJES",
    "goal": "Separar la descripción de relaciones del control imperativo.",
    "topics": [
      {
        "id": "declarative",
        "title": "Declarativo vs imperativo",
        "what": "Imperativo describe cómo ejecutar pasos; declarativo expresa qué relación/resultado quieres bajo un modelo de ejecución.",
        "why": "Amplía la forma de pensar soluciones.",
        "use": "SQL, lógica, reglas, consultas, configuración.",
        "model": "Describe propiedades y deja parte de la estrategia al motor.",
        "language": "text",
        "code": "SELECT nombre FROM personas WHERE edad >= 18;",
        "expected": "",
        "experiment": "Identifica qué se expresa y qué estrategia no se especifica."
      },
      {
        "id": "facts-rules",
        "title": "Hechos y reglas",
        "what": "En programación lógica, hechos describen relaciones conocidas y reglas derivan relaciones nuevas.",
        "why": "Permite expresar conocimiento y consultas.",
        "use": "Motores de reglas, Prolog, razonamiento simbólico.",
        "model": "Base de hechos + reglas + consulta → búsqueda de demostración.",
        "language": "text",
        "code": "padre(ana, luis).\nabuelo(X,Z) :- padre(X,Y), padre(Y,Z).",
        "expected": "",
        "experiment": "Explica variables X,Y,Z."
      },
      {
        "id": "unification",
        "title": "Unificación",
        "what": "Unificación intenta hacer compatibles términos encontrando sustituciones para variables.",
        "why": "Es mecanismo central de lenguajes lógicos.",
        "use": "Prolog, inferencia, pattern matching avanzado.",
        "model": "Patrones + sustituciones consistentes.",
        "language": "text",
        "code": "f(X,2) con f(1,Y) ⇒ X=1, Y=2",
        "expected": "",
        "experiment": "Prueba un caso que no pueda unificarse."
      },
      {
        "id": "backtracking-logic",
        "title": "Búsqueda y backtracking lógico",
        "what": "El motor explora alternativas de reglas/hechos y retrocede cuando una rama falla.",
        "why": "Explica orden, rendimiento y resultados múltiples en Prolog.",
        "use": "Consultas con varias soluciones.",
        "model": "Objetivo → candidato → subobjetivos → éxito o retroceso.",
        "language": "text",
        "code": "consulta ancestro(X, maria)",
        "expected": "",
        "experiment": "Dibuja un árbol de búsqueda pequeño."
      }
    ],
    "project": "Modelar relaciones familiares o dependencias con hechos, reglas y consultas.",
    "gate": "Puedes explicar declarativo, unificación y backtracking sin confundirlos con if/for.",
    "sources": [
      "famaf-lcc",
      "free-books",
      "ossu-cs"
    ]
  },
  {
    "code": "L21",
    "title": "Tipos, genéricos y diseño de APIs",
    "phase": "FASE 3 · PARADIGMAS Y LENGUAJES",
    "goal": "Usar el sistema de tipos como herramienta de diseño.",
    "topics": [
      {
        "id": "static-dynamic",
        "title": "Tipado estático y dinámico",
        "what": "Un sistema estático comprueba ciertas propiedades antes de ejecutar; uno dinámico determina más propiedades durante ejecución.",
        "why": "Afecta feedback, expresividad, tooling y clases de errores detectables.",
        "use": "Al elegir lenguaje o diseñar interfaces.",
        "model": "Momento de comprobación ≠ fuerte/débil; son ejes distintos.",
        "language": "text",
        "code": "Python: dinámico; TypeScript: análisis estático sobre JS; Rust: estático.",
        "expected": "",
        "experiment": "Enumera qué error puede detectarse antes en un sistema estático."
      },
      {
        "id": "types-contracts",
        "title": "Tipos como contratos",
        "what": "Un tipo puede restringir estados representables y documentar qué acepta/devuelve una operación.",
        "why": "Hace ciertas categorías de error más difíciles de expresar.",
        "use": "APIs, dominios y código grande.",
        "model": "Diseña el tipo para que estados inválidos no encajen.",
        "language": "text",
        "code": "Result<Valor, Error> expresa éxito o fallo explícito.",
        "expected": "",
        "experiment": "Transforma un booleano ambiguo en un enum de estados."
      },
      {
        "id": "generics",
        "title": "Genéricos",
        "what": "Un genérico expresa un algoritmo/estructura sobre una familia de tipos manteniendo información de tipo.",
        "why": "Evita duplicación sin perder garantías.",
        "use": "Colecciones, algoritmos, librerías.",
        "model": "Parámetro de tipo en lugar de un valor concreto.",
        "language": "text",
        "code": "Stack<T> contiene elementos T.",
        "expected": "",
        "experiment": "Explica por qué Stack<int> y Stack<string> comparten estructura."
      },
      {
        "id": "interface",
        "title": "Interfaces, traits y protocolos",
        "what": "Definen capacidades que un tipo debe ofrecer sin imponer necesariamente su implementación.",
        "why": "Permiten polimorfismo y desacoplamiento.",
        "use": "APIs extensibles, testing, adapters.",
        "model": "Contrato de comportamiento implementado por tipos distintos.",
        "language": "text",
        "code": "trait Dibujar { fn dibujar(&self); }",
        "expected": "",
        "experiment": "Diseña una interfaz mínima para almacenamiento."
      }
    ],
    "project": "Diseñar tipos de un dominio y una API que evite estados inválidos comunes.",
    "gate": "Puedes justificar decisiones de tipo, genéricos e interfaces por sus garantías.",
    "sources": [
      "mit-6005",
      "rust-book",
      "comprehensive-rust",
      "ossu-cs"
    ]
  },
  {
    "code": "L22",
    "title": "Concurrencia, asincronía y estado compartido",
    "phase": "FASE 3 · PARADIGMAS Y LENGUAJES",
    "goal": "Entender tareas simultáneas sin introducir carreras.",
    "topics": [
      {
        "id": "concurrency",
        "title": "Concurrencia vs paralelismo",
        "what": "Concurrencia trata múltiples tareas que progresan solapadamente; paralelismo ejecuta trabajo físicamente al mismo tiempo.",
        "why": "Distinguir conceptos evita diseñar con supuestos incorrectos.",
        "use": "Servidores, UI, I/O, cómputo paralelo.",
        "model": "Concurrencia = estructura; paralelismo = ejecución simultánea posible.",
        "language": "text",
        "code": "dos tareas intercaladas pueden ser concurrentes en un solo núcleo.",
        "expected": "",
        "experiment": "Da un ejemplo I/O-bound y uno CPU-bound."
      },
      {
        "id": "async",
        "title": "Async/await",
        "what": "Asincronía permite suspender una tarea mientras espera y reanudarla sin bloquear necesariamente el hilo.",
        "why": "Aumenta utilización cuando hay muchas esperas de I/O.",
        "use": "HTTP, archivos, DB, timers.",
        "model": "Tarea encuentra await → cede control → evento listo → continúa.",
        "language": "javascript",
        "code": "async function demo(){\n  const valor = await Promise.resolve(5);\n  console.log(valor);\n}\ndemo();",
        "expected": "5",
        "experiment": "Agrega un segundo await y predice el orden."
      },
      {
        "id": "race",
        "title": "Race condition",
        "what": "Una carrera aparece cuando el resultado depende de un interleaving no controlado de accesos concurrentes.",
        "why": "Puede producir fallos raros y no reproducibles.",
        "use": "Estado mutable compartido.",
        "model": "Lee-modifica-escribe no atómico puede intercalarse.",
        "language": "text",
        "code": "dos hilos hacen contador = contador + 1 al mismo tiempo.",
        "expected": "",
        "experiment": "Construye un interleaving donde se pierde una actualización."
      },
      {
        "id": "sync",
        "title": "Locks, atomics y message passing",
        "what": "Son estrategias para coordinar concurrencia: exclusión, operaciones atómicas o comunicación sin compartir directamente.",
        "why": "Protegen invariantes bajo interleavings.",
        "use": "Secciones críticas, contadores, pipelines y actores.",
        "model": "Elegir el mecanismo más simple que preserve la propiedad necesaria.",
        "language": "text",
        "code": "lock → sección crítica → unlock",
        "expected": "",
        "experiment": "Explica riesgo de deadlock con dos locks."
      }
    ],
    "project": "Simular interleavings y diseñar una solución segura a un contador compartido.",
    "gate": "Puedes explicar race, deadlock, async e invariantes concurrentes.",
    "sources": [
      "mit-6005",
      "ostep",
      "rust-book",
      "famaf-lcc"
    ]
  },
  {
    "code": "L23",
    "title": "C, compilación, linking y modelo de memoria",
    "phase": "FASE 4 · SISTEMAS PARA PROGRAMADORES",
    "goal": "Bajar de nivel para entender lo que abstraen lenguajes de alto nivel.",
    "topics": [
      {
        "id": "compile",
        "title": "Preprocesar, compilar, ensamblar y enlazar",
        "what": "Un toolchain transforma código fuente en objetos y ejecutable a través de varias etapas.",
        "why": "Explica errores de compilación/linking y dependencias binarias.",
        "use": "C/C++ y sistemas compilados.",
        "model": "Fuente → traducción → objeto → linker → ejecutable.",
        "language": "text",
        "code": "gcc main.c -o app",
        "expected": "",
        "experiment": "Distingue error de compilador y símbolo no resuelto del linker."
      },
      {
        "id": "memory-layout",
        "title": "Stack, heap, globals y código",
        "what": "Un proceso organiza memoria virtual en regiones con propósitos y ciclos de vida distintos.",
        "why": "Ayuda a entender lifetime, recursión, malloc y bugs de memoria.",
        "use": "Programación de sistemas y performance.",
        "model": "Direcciones virtuales organizadas; stack automático, heap dinámico.",
        "language": "text",
        "code": "función local → stack; malloc → heap",
        "expected": "",
        "experiment": "Clasifica tres variables hipotéticas."
      },
      {
        "id": "pointer",
        "title": "Punteros",
        "what": "Un puntero almacena una dirección que referencia memoria de cierto tipo según el lenguaje.",
        "why": "Permite estructuras dinámicas, buffers y acceso de bajo nivel.",
        "use": "C, interoperabilidad, sistemas y drivers.",
        "model": "Valor dirección → dereference → objeto almacenado allí.",
        "language": "text",
        "code": "int x=7; int *p=&x; printf(\"%d\", *p);",
        "expected": "",
        "experiment": "Explica &, p y *p por separado."
      },
      {
        "id": "undefined",
        "title": "Undefined behavior y seguridad",
        "what": "En C/C++ ciertas operaciones fuera de las reglas dejan el comportamiento sin garantías.",
        "why": "Muchos fallos de seguridad y optimización sorprendente nacen aquí.",
        "use": "Punteros inválidos, overflow firmado, lifetime, aliasing.",
        "model": "El compilador puede asumir que UB nunca ocurre.",
        "language": "text",
        "code": "acceder fuera de un array es inválido.",
        "expected": "",
        "experiment": "Explica por qué “parece funcionar” no es prueba."
      }
    ],
    "project": "Programa C pequeño con compilación separada y análisis de memoria.",
    "gate": "Puedes explicar cada etapa del toolchain y rastrear lifetime/direcciones conceptualmente.",
    "sources": [
      "openfing",
      "nand2tetris",
      "mit-performance",
      "cs2023"
    ]
  },
  {
    "code": "L24",
    "title": "Arquitectura, ensamblador, caché y localidad",
    "phase": "FASE 4 · SISTEMAS PARA PROGRAMADORES",
    "goal": "Relacionar código con instrucciones, memoria y rendimiento real.",
    "topics": [
      {
        "id": "isa",
        "title": "ISA e instrucciones",
        "what": "Una ISA define operaciones, registros y reglas visibles al software de máquina.",
        "why": "Es la interfaz entre hardware y software de bajo nivel.",
        "use": "Compiladores, performance, sistemas.",
        "model": "Código alto nivel → instrucciones que manipulan registros/memoria.",
        "language": "text",
        "code": "LOAD R1,[addr]; ADD R1,R2",
        "expected": "",
        "experiment": "Relaciona una suma de C con operaciones abstractas."
      },
      {
        "id": "registers",
        "title": "Registros y stack de llamadas",
        "what": "Registros son almacenamiento muy cercano a la CPU; convenciones de llamada coordinan parámetros, retorno y preservación.",
        "why": "Explica llamadas, debugging y assembly.",
        "use": "Sistemas, profiling, reverse engineering.",
        "model": "Call prepara contexto; función usa stack/registros; return restaura.",
        "language": "text",
        "code": "call f → frame → ret",
        "expected": "",
        "experiment": "Dibuja un stack con main→f→g."
      },
      {
        "id": "cache",
        "title": "Jerarquía de memoria",
        "what": "Registros, caches, RAM y almacenamiento ofrecen diferentes latencias/capacidades.",
        "why": "El patrón de acceso puede dominar performance.",
        "use": "Arrays grandes, loops, sistemas de alto rendimiento.",
        "model": "Datos cercanos y reutilizados tienden a beneficiarse de cache.",
        "language": "text",
        "code": "recorrer array secuencialmente suele tener buena localidad espacial.",
        "expected": "",
        "experiment": "Compara recorrer filas vs columnas en matriz row-major."
      },
      {
        "id": "locality",
        "title": "Localidad y layout de datos",
        "what": "Localidad temporal reutiliza pronto; espacial accede a direcciones cercanas.",
        "why": "Diseño de datos puede acelerar sin cambiar Big-O.",
        "use": "Performance, ECS, bases, gráficos.",
        "model": "Mismo algoritmo + layout distinto = comportamiento de cache distinto.",
        "language": "text",
        "code": "array of structs vs struct of arrays",
        "expected": "",
        "experiment": "Da un caso donde SoA ayuda a procesar un campo."
      }
    ],
    "project": "Analizar un bucle y explicar accesos a memoria/cache antes de optimizar.",
    "gate": "Puedes conectar abstracciones de código con CPU/memoria y medir hipótesis.",
    "sources": [
      "nand2tetris",
      "openfing",
      "mit-performance",
      "cs2023"
    ]
  },
  {
    "code": "L25",
    "title": "Procesos, threads, memoria virtual y archivos",
    "phase": "FASE 4 · SISTEMAS PARA PROGRAMADORES",
    "goal": "Entender servicios que el sistema operativo presta a tu programa.",
    "topics": [
      {
        "id": "process",
        "title": "Proceso",
        "what": "Un proceso es una instancia de programa en ejecución con espacio de direcciones y recursos administrados por el SO.",
        "why": "Distingue archivo ejecutable de ejecución viva.",
        "use": "Servidores, CLI, aislamiento, debugging.",
        "model": "Programa en disco + estado de ejecución + recursos.",
        "language": "text",
        "code": "PID, memoria virtual, archivos abiertos, threads",
        "expected": "",
        "experiment": "Explica por qué ejecutar dos veces crea procesos distintos."
      },
      {
        "id": "thread",
        "title": "Thread",
        "what": "Un thread es una secuencia de ejecución dentro de un proceso que comparte gran parte de sus recursos con otros threads.",
        "why": "Permite concurrencia dentro de un proceso.",
        "use": "I/O, UI, procesamiento paralelo según diseño.",
        "model": "Comparten heap; cada thread tiene stack/contexto propio.",
        "language": "text",
        "code": "proceso → thread A + thread B",
        "expected": "",
        "experiment": "Identifica qué estado compartido necesita sincronización."
      },
      {
        "id": "virtual-memory",
        "title": "Memoria virtual",
        "what": "El SO y hardware traducen direcciones virtuales del proceso a memoria física/otras ubicaciones según políticas.",
        "why": "Proporciona aislamiento, protección y abstracción de memoria.",
        "use": "Todo proceso moderno.",
        "model": "Mapa virtual por proceso → traducción → páginas físicas.",
        "language": "text",
        "code": "dirección virtual != dirección física",
        "expected": "",
        "experiment": "Explica page fault a alto nivel."
      },
      {
        "id": "filesystem",
        "title": "Filesystem y file descriptors",
        "what": "Un filesystem organiza datos persistentes; procesos acceden mediante handles/descriptores y llamadas del SO.",
        "why": "Explica I/O, permisos y recursos.",
        "use": "Archivos, pipes, sockets en Unix-like.",
        "model": "Nombre/path se resuelve a objeto; descriptor referencia recurso abierto.",
        "language": "text",
        "code": "open → read/write → close",
        "expected": "",
        "experiment": "Explica por qué olvidar close puede agotar recursos."
      }
    ],
    "project": "Mapa de un proceso con memoria, threads y recursos abiertos.",
    "gate": "Puedes explicar qué abstrae el SO y cómo una llamada de programa llega a recursos.",
    "sources": [
      "ostep",
      "openfing",
      "famaf-lcc",
      "cs2023"
    ]
  },
  {
    "code": "L26",
    "title": "Redes para programadores",
    "phase": "FASE 4 · SISTEMAS PARA PROGRAMADORES",
    "goal": "Entender qué ocurre cuando dos programas se comunican.",
    "topics": [
      {
        "id": "layers",
        "title": "Capas y protocolos",
        "what": "Una pila de red separa responsabilidades: aplicación, transporte, red y enlace de forma simplificada.",
        "why": "Ayuda a localizar fallos y diseñar protocolos.",
        "use": "Cualquier software distribuido.",
        "model": "Cada capa añade reglas/metadatos y usa la capa inferior.",
        "language": "text",
        "code": "HTTP → TCP → IP → enlace",
        "expected": "",
        "experiment": "Ubica DNS y TLS conceptualmente."
      },
      {
        "id": "socket",
        "title": "Sockets",
        "what": "Un socket es una interfaz del SO para comunicación mediante protocolos de red.",
        "why": "Conecta procesos locales/remotos con endpoints.",
        "use": "Clientes, servidores, P2P.",
        "model": "endpoint = dirección + puerto + protocolo según caso.",
        "language": "text",
        "code": "socket → bind/listen/accept o connect → send/recv",
        "expected": "",
        "experiment": "Distingue flujo servidor y cliente."
      },
      {
        "id": "tcp-udp",
        "title": "TCP y UDP",
        "what": "TCP ofrece stream fiable/ordenado; UDP envía datagramas sin esas garantías incorporadas.",
        "why": "Elegir transporte cambia semántica y responsabilidad de la aplicación.",
        "use": "TCP para fiabilidad general; UDP cuando latencia/modelo datagrama lo justifican.",
        "model": "TCP gestiona conexión/retransmisión/orden; UDP es más mínimo.",
        "language": "text",
        "code": "mensaje de aplicación puede fragmentarse en TCP; no confíes en recv == mensaje.",
        "expected": "",
        "experiment": "Explica por qué debes enmarcar mensajes."
      },
      {
        "id": "http",
        "title": "HTTP y request/response",
        "what": "HTTP define mensajes de petición/respuesta, métodos, headers, status y semántica sobre una conexión/versión de transporte.",
        "why": "Es base de APIs y web.",
        "use": "Servicios, navegadores, integraciones.",
        "model": "Cliente construye request → servidor procesa → response.",
        "language": "javascript",
        "code": "const response = {status:200, body:{ok:true}};\nconsole.log(response.status);",
        "expected": "200",
        "experiment": "Cambia status a 404 y separa transporte de semántica HTTP."
      }
    ],
    "project": "Diseñar un protocolo request/response pequeño con formato y errores explícitos.",
    "gate": "Puedes seguir un dato desde aplicación a transporte y explicar fallos por capa.",
    "sources": [
      "openfing",
      "netacad",
      "famaf-lcc",
      "cs2023"
    ]
  },
  {
    "code": "L27",
    "title": "Sistemas distribuidos: tiempo, fallos, consistencia y replicación",
    "phase": "FASE 4 · SISTEMAS PARA PROGRAMADORES",
    "goal": "Aceptar que la red puede fallar parcialmente y diseñar con esa realidad.",
    "topics": [
      {
        "id": "partial-failure",
        "title": "Fallo parcial",
        "what": "En un sistema distribuido algunos nodos/enlaces pueden fallar mientras otros siguen funcionando.",
        "why": "No existe un único estado “todo funciona/todo cae”.",
        "use": "Servicios remotos, microservicios, clusters.",
        "model": "Cada llamada remota puede tardar, duplicarse, fallar o tener resultado incierto.",
        "language": "text",
        "code": "timeout no implica necesariamente que el servidor no ejecutó.",
        "expected": "",
        "experiment": "Explica por qué reintentar una compra puede duplicarla."
      },
      {
        "id": "idempotency",
        "title": "Idempotencia",
        "what": "Una operación idempotente puede repetirse sin producir efectos adicionales después del primero bajo su definición.",
        "why": "Hace reintentos más seguros.",
        "use": "APIs, jobs, mensajes, infraestructura.",
        "model": "Misma intención repetida → estado final equivalente.",
        "language": "text",
        "code": "PUT recurso/123 con estado completo puede diseñarse idempotente.",
        "expected": "",
        "experiment": "Diseña una clave de idempotencia para pago."
      },
      {
        "id": "replication",
        "title": "Replicación",
        "what": "Replicar mantiene copias de datos/servicio en múltiples nodos.",
        "why": "Mejora disponibilidad/lecturas pero introduce coordinación y consistencia.",
        "use": "Bases distribuidas, caches, servicios.",
        "model": "Escritura debe propagarse; copias pueden divergir temporalmente.",
        "language": "text",
        "code": "líder → réplica A / réplica B",
        "expected": "",
        "experiment": "Explica lectura stale."
      },
      {
        "id": "consistency",
        "title": "Consistencia y consenso",
        "what": "Modelos de consistencia especifican qué orden/visibilidad pueden observar clientes; consenso coordina una decisión común bajo ciertos fallos.",
        "why": "Permite elegir garantías y costes explícitos.",
        "use": "Datos replicados y coordinación crítica.",
        "model": "Más garantías suelen requerir más coordinación/latencia.",
        "language": "text",
        "code": "linearizable no significa “rápido”; eventual no significa “sin reglas”.",
        "expected": "",
        "experiment": "Compara dos requisitos de una app bancaria y red social."
      }
    ],
    "project": "Diseñar una API con retries, idempotencia y política de consistencia documentada.",
    "gate": "Puedes razonar sobre timeout, duplicados, replicas y garantías sin asumir red perfecta.",
    "sources": [
      "openfing",
      "famaf-lcc",
      "cs2023",
      "swebok"
    ]
  },
  {
    "code": "L28",
    "title": "Git, branches, commits y colaboración",
    "phase": "FASE 5 · INGENIERÍA DE SOFTWARE",
    "goal": "Usar control de versiones como modelo de trabajo, no como copia de seguridad manual.",
    "topics": [
      {
        "id": "commit",
        "title": "Commit",
        "what": "Un commit registra un snapshot lógico de cambios con metadatos y referencia a historia.",
        "why": "Crea puntos revisables y recuperables de evolución.",
        "use": "Todo desarrollo versionado.",
        "model": "Working tree → staging → commit → historia.",
        "language": "text",
        "code": "git add archivo\ngit commit -m \"mensaje\"",
        "expected": "",
        "experiment": "Explica qué cambia entre add y commit."
      },
      {
        "id": "branch",
        "title": "Branch",
        "what": "Una rama es una referencia móvil a una línea de commits.",
        "why": "Permite trabajo paralelo sin copiar carpetas.",
        "use": "Features, fixes, experimentos, releases.",
        "model": "Nombre de rama apunta a commit; nuevos commits mueven esa referencia.",
        "language": "text",
        "code": "main ← A—B\n          \\ feature—C",
        "expected": "",
        "experiment": "Dibuja qué ocurre tras merge."
      },
      {
        "id": "merge-rebase",
        "title": "Merge y rebase",
        "what": "Merge crea una unión de historias; rebase reaplica commits sobre otra base y reescribe sus identificadores.",
        "why": "Elegir conscientemente evita historia confusa o reescritura peligrosa.",
        "use": "Sincronización de ramas.",
        "model": "Merge preserva topología; rebase linealiza al recrear commits.",
        "language": "text",
        "code": "git merge feature / git rebase main",
        "expected": "",
        "experiment": "Explica por qué no rebasar historia pública sin coordinación."
      },
      {
        "id": "review",
        "title": "Pull request y code review",
        "what": "Un PR propone cambios para revisión antes de integrar; la revisión evalúa diseño, corrección, claridad, tests y riesgos.",
        "why": "La calidad es responsabilidad compartida.",
        "use": "Equipos, open source, cambios importantes.",
        "model": "Cambio pequeño → pruebas → revisión → feedback → integración.",
        "language": "text",
        "code": "PR: objetivo + motivo + verificación + diff",
        "expected": "",
        "experiment": "Escribe una descripción de PR verificable."
      }
    ],
    "project": "Repositorio con commits pequeños, rama, PR simulado y revisión propia.",
    "gate": "Puedes explicar staging, historia, merge/rebase y preparar cambios revisables.",
    "sources": [
      "pro-git",
      "missing-semester",
      "google-eng-practices",
      "microsoft-learn"
    ]
  },
  {
    "code": "L29",
    "title": "Requisitos, casos de uso y especificaciones",
    "phase": "FASE 5 · INGENIERÍA DE SOFTWARE",
    "goal": "Construir lo correcto antes de construirlo bien.",
    "topics": [
      {
        "id": "requirement",
        "title": "Requisito",
        "what": "Un requisito expresa una necesidad o restricción verificable del sistema y sus interesados.",
        "why": "Código perfecto para un requisito equivocado sigue siendo un fracaso.",
        "use": "Antes y durante desarrollo.",
        "model": "Necesidad → criterio observable → evidencia de aceptación.",
        "language": "text",
        "code": "El usuario puede recuperar su cuenta mediante un canal verificado.",
        "expected": "",
        "experiment": "Convierte “que sea rápido” en un requisito medible."
      },
      {
        "id": "functional-nonfunctional",
        "title": "Funcional vs atributos de calidad",
        "what": "Funcional describe comportamiento; atributos de calidad cubren rendimiento, seguridad, disponibilidad, mantenibilidad y más.",
        "why": "Evita que calidad quede como deseo implícito.",
        "use": "Diseño y arquitectura.",
        "model": "Qué hace + qué tan bien/seguro/confiable debe hacerlo.",
        "language": "text",
        "code": "p95 de respuesta < 300 ms bajo carga X.",
        "expected": "",
        "experiment": "Define una métrica para disponibilidad."
      },
      {
        "id": "use-case",
        "title": "Caso de uso / historia",
        "what": "Describe interacción orientada a objetivo, actores, precondiciones, flujo y alternativas.",
        "why": "Descubre errores y excepciones antes de codificar.",
        "use": "Features con interacción.",
        "model": "Actor → intención → flujo principal + alternos.",
        "language": "text",
        "code": "Comprar: carrito válido → pagar → confirmar; alterno: pago rechazado.",
        "expected": "",
        "experiment": "Agrega un flujo de timeout."
      },
      {
        "id": "spec",
        "title": "Especificación de módulo/API",
        "what": "Una especificación define interfaz y comportamiento observable sin obligar a conocer implementación.",
        "why": "Permite trabajar en paralelo y cambiar internals.",
        "use": "Funciones, servicios, librerías.",
        "model": "Contrato público estable, implementación privada.",
        "language": "text",
        "code": "POST /orders: entradas, errores, idempotencia, respuesta.",
        "expected": "",
        "experiment": "Escribe tres errores explícitos de contrato."
      }
    ],
    "project": "Especificación verificable de una feature antes de implementar.",
    "gate": "Puedes convertir deseos vagos en criterios y contratos testeables.",
    "sources": [
      "swebok",
      "mit-6005",
      "fing-plan-2025",
      "software-plan-es"
    ]
  },
  {
    "code": "L30",
    "title": "Diseño modular, acoplamiento y abstracción",
    "phase": "FASE 5 · INGENIERÍA DE SOFTWARE",
    "goal": "Controlar complejidad con límites y responsabilidades.",
    "topics": [
      {
        "id": "module",
        "title": "Módulo",
        "what": "Un módulo agrupa elementos con una responsabilidad y una interfaz definida.",
        "why": "Reduce la cantidad de detalles que debes entender simultáneamente.",
        "use": "Sistemas más grandes que un script.",
        "model": "Interior complejo detrás de un límite pequeño.",
        "language": "text",
        "code": "auth/ expone login(), verify(); oculta almacenamiento de tokens.",
        "expected": "",
        "experiment": "Decide qué no debería ser público."
      },
      {
        "id": "coupling",
        "title": "Acoplamiento",
        "what": "Acoplamiento mide cuánto depende una parte de detalles de otra.",
        "why": "Alto acoplamiento amplifica cambios y dificulta pruebas.",
        "use": "Revisión de diseño.",
        "model": "Dependencias necesarias y explícitas son mejores que conexiones ocultas.",
        "language": "text",
        "code": "servicio depende de interfaz Repository, no de SQL concreto.",
        "expected": "",
        "experiment": "Identifica una dependencia invertible."
      },
      {
        "id": "cohesion",
        "title": "Cohesión",
        "what": "Cohesión describe cuánto pertenecen juntas las responsabilidades de un módulo.",
        "why": "Alta cohesión suele producir unidades más claras y estables.",
        "use": "Diseño de clases/módulos/servicios.",
        "model": "Una razón coherente para cambiar.",
        "language": "text",
        "code": "Módulo Reporte no debería también autenticar usuarios.",
        "expected": "",
        "experiment": "Divide un módulo “Utils” hipotético."
      },
      {
        "id": "abstraction",
        "title": "Abstracción profunda",
        "what": "Una abstracción útil ofrece una interfaz relativamente simple que oculta complejidad significativa sin ocultar hechos que el cliente necesita.",
        "why": "Reduce carga cognitiva y dependencia de detalles.",
        "use": "APIs, librerías, arquitectura.",
        "model": "Buena abstracción = menos conocimiento necesario para usar correctamente.",
        "language": "text",
        "code": "openFile(path) oculta llamadas internas del filesystem.",
        "expected": "",
        "experiment": "Explica una abstracción que filtre demasiados detalles y falle."
      }
    ],
    "project": "Refactor de diseño en módulos con diagrama de dependencias.",
    "gate": "Puedes justificar límites por cohesión, acoplamiento e información ocultada.",
    "sources": [
      "mit-6005",
      "swebok",
      "google-eng-practices"
    ]
  },
  {
    "code": "L31",
    "title": "Testing profesional",
    "phase": "FASE 5 · INGENIERÍA DE SOFTWARE",
    "goal": "Crear evidencia automática a diferentes niveles sin perseguir cobertura vacía.",
    "topics": [
      {
        "id": "unit",
        "title": "Test unitario",
        "what": "Prueba una unidad pequeña bajo condiciones controladas.",
        "why": "Da feedback rápido y localiza regresiones.",
        "use": "Lógica determinista y componentes aislables.",
        "model": "Arrange → Act → Assert.",
        "language": "python",
        "code": "def suma(a,b): return a+b\nassert suma(2,3)==5\nprint(\"ok\")",
        "expected": "ok",
        "experiment": "Agrega caso con negativos."
      },
      {
        "id": "integration",
        "title": "Test de integración",
        "what": "Comprueba que varias partes reales colaboren correctamente.",
        "why": "Mocks no detectan incompatibilidades reales entre componentes.",
        "use": "DB, filesystem, servicios internos.",
        "model": "Menos aislamiento, más realismo y coste.",
        "language": "text",
        "code": "API + DB de prueba + migraciones",
        "expected": "",
        "experiment": "Define qué limpiarías entre tests."
      },
      {
        "id": "property",
        "title": "Property-based / invariantes",
        "what": "Genera muchos datos y verifica propiedades generales en vez de enumerar solo ejemplos.",
        "why": "Encuentra casos inesperados y obliga a formular invariantes.",
        "use": "Serialización, algoritmos, transformaciones.",
        "model": "Propiedad + generador → muchos ejemplos.",
        "language": "text",
        "code": "decode(encode(x)) == x para valores válidos.",
        "expected": "",
        "experiment": "Propón una propiedad para ordenar listas."
      },
      {
        "id": "test-double",
        "title": "Mocks, fakes y stubs",
        "what": "Dobles de prueba sustituyen colaboradores con distintos grados de comportamiento/control.",
        "why": "Aíslan dependencias lentas o difíciles, pero pueden crear tests irreales si se abusa.",
        "use": "APIs externas, clocks, random, storage.",
        "model": "Falso colaborador debe servir al objetivo del test, no replicar todo el mundo.",
        "language": "text",
        "code": "FakeClock controla el tiempo.",
        "expected": "",
        "experiment": "Explica cuándo preferir una DB real de prueba."
      }
    ],
    "project": "Suite de tests con unitarios, integración y una propiedad.",
    "gate": "Puedes explicar qué riesgo cubre cada test y evitar tests acoplados a implementación.",
    "sources": [
      "mit-6005",
      "swebok",
      "think-python"
    ]
  },
  {
    "code": "L32",
    "title": "Refactoring, deuda y legibilidad",
    "phase": "FASE 5 · INGENIERÍA DE SOFTWARE",
    "goal": "Cambiar estructura interna sin cambiar comportamiento observable.",
    "topics": [
      {
        "id": "refactor",
        "title": "Refactoring",
        "what": "Refactorizar mejora estructura manteniendo comportamiento externo bajo pruebas.",
        "why": "Facilita cambios futuros y reduce complejidad accidental.",
        "use": "Cuando tests dan red de seguridad y una estructura dificulta evolución.",
        "model": "Pequeño cambio estructural → test → siguiente cambio.",
        "language": "text",
        "code": "extraer función, renombrar, mover responsabilidad.",
        "expected": "",
        "experiment": "Define qué test protege un refactor."
      },
      {
        "id": "smells",
        "title": "Code smells",
        "what": "Un smell es una señal contextual de posible problema de diseño, no una ley automática.",
        "why": "Ayuda a enfocar revisión en complejidad y cambio.",
        "use": "Funciones largas, duplicación, dependencias, datos dispersos.",
        "model": "Señal → pregunta de diseño → evidencia de mantenimiento.",
        "language": "text",
        "code": "if repetido por tipo puede sugerir polimorfismo, pero no siempre.",
        "expected": "",
        "experiment": "Da un smell y una excepción razonable."
      },
      {
        "id": "naming",
        "title": "Nombres y lectura",
        "what": "Nombres comunican intención, dominio y unidades sin obligar a reconstruir significado mentalmente.",
        "why": "El código se lee más veces de las que se escribe.",
        "use": "Variables, funciones, módulos, tests.",
        "model": "Nombre preciso elimina comentarios explicativos triviales.",
        "language": "text",
        "code": "timeoutMs comunica más que t.",
        "expected": "",
        "experiment": "Renombra x,y,z en un cálculo de factura."
      },
      {
        "id": "debt",
        "title": "Deuda técnica",
        "what": "Deuda técnica es una metáfora para decisiones que aceleran hoy a cambio de coste/riesgo futuro; debe ser contextual y gestionada.",
        "why": "No todo atajo es igual ni toda deuda debe eliminarse inmediatamente.",
        "use": "Planificación y evolución.",
        "model": "Decisión + interés esperado + estrategia de pago/aceptación.",
        "language": "text",
        "code": "TODO con contexto, impacto y condición para resolver.",
        "expected": "",
        "experiment": "Escribe una deuda técnica explícita y medible."
      }
    ],
    "project": "Refactor documentado antes/después con tests invariantes.",
    "gate": "Puedes mejorar estructura mediante pasos seguros y justificar por qué una modificación reduce coste cognitivo.",
    "sources": [
      "swebok",
      "google-eng-practices",
      "software-plan-es"
    ]
  },
  {
    "code": "L33",
    "title": "Arquitectura, patrones y decisiones",
    "phase": "FASE 5 · INGENIERÍA DE SOFTWARE",
    "goal": "Tomar decisiones de alto nivel por trade-offs, no por modas.",
    "topics": [
      {
        "id": "architecture",
        "title": "Arquitectura de software",
        "what": "Arquitectura reúne decisiones estructurales significativas: componentes, relaciones, límites, despliegue y atributos de calidad.",
        "why": "Decisiones difíciles de cambiar condicionan evolución y operación.",
        "use": "Sistemas donde calidad y coordinación importan.",
        "model": "Requisitos de calidad → restricciones → opciones → trade-offs.",
        "language": "text",
        "code": "monolito modular puede ser mejor que microservicios para cierto contexto.",
        "expected": "",
        "experiment": "Enumera 3 fuerzas que influirían en decisión."
      },
      {
        "id": "pattern",
        "title": "Patrón",
        "what": "Un patrón nombra una solución recurrente contextual con consecuencias; no es código para copiar automáticamente.",
        "why": "Crea vocabulario de diseño y alternativas conocidas.",
        "use": "Cuando el problema y fuerzas coinciden.",
        "model": "Contexto + problema + solución + consecuencias.",
        "language": "text",
        "code": "Strategy intercambia algoritmo tras una interfaz.",
        "expected": "",
        "experiment": "Da un caso donde un simple if es mejor."
      },
      {
        "id": "adr",
        "title": "ADR",
        "what": "Architecture Decision Record registra contexto, decisión, alternativas y consecuencias.",
        "why": "Preserva el porqué cuando el equipo y sistema cambian.",
        "use": "Decisiones relevantes y costosas de revertir.",
        "model": "Contexto → opciones → decisión → consecuencias → estado.",
        "language": "text",
        "code": "# ADR: elegir PostgreSQL\nContexto...\nDecisión...",
        "expected": "",
        "experiment": "Escribe una consecuencia negativa explícita."
      },
      {
        "id": "tradeoff",
        "title": "Trade-offs",
        "what": "Un trade-off significa mejorar una propiedad a cambio de coste en otra; no existe arquitectura universalmente mejor.",
        "why": "Evita “best practices” sin contexto.",
        "use": "Performance, consistencia, costo, complejidad, seguridad.",
        "model": "Optimizar objetivo bajo restricciones, no maximizar todo.",
        "language": "text",
        "code": "cache: menos latencia, más invalidación/consistencia.",
        "expected": "",
        "experiment": "Describe un trade-off real de tu proyecto."
      }
    ],
    "project": "ADR comparando dos arquitecturas para un mismo requisito.",
    "gate": "Puedes defender una decisión con contexto, alternativas, evidencia y consecuencias.",
    "sources": [
      "swebok",
      "fing-plan-2025",
      "google-eng-practices"
    ]
  },
  {
    "code": "L34",
    "title": "Web desde el navegador: HTML, CSS, JS, DOM y eventos",
    "phase": "FASE 6 · PLATAFORMAS, WEB Y DATOS",
    "goal": "Entender la plataforma web antes de frameworks.",
    "topics": [
      {
        "id": "html",
        "title": "HTML y semántica",
        "what": "HTML describe estructura y significado del contenido mediante elementos.",
        "why": "Semántica mejora accesibilidad, interoperabilidad y mantenimiento.",
        "use": "Documentos y aplicaciones web.",
        "model": "Árbol de elementos que el navegador parsea en DOM.",
        "language": "web",
        "code": "<!doctype html><html><body><button id=\"b\">Hola</button></body></html>",
        "expected": "Botón visible",
        "experiment": "Cambia button por h1 y explica semántica distinta."
      },
      {
        "id": "css",
        "title": "CSS y cascade",
        "what": "CSS aplica reglas de presentación seleccionando elementos y resolviendo cascade, especificidad, herencia y layout.",
        "why": "Separa presentación de estructura.",
        "use": "Interfaces web.",
        "model": "Reglas candidatas → cascade → valores computados → layout/paint.",
        "language": "web",
        "code": "<style>button{font-size:24px}</style><button>Hola</button>",
        "expected": "Botón con texto grande",
        "experiment": "Agrega padding y observa qué caja cambia."
      },
      {
        "id": "dom",
        "title": "DOM",
        "what": "El DOM es la representación de nodos que scripts pueden consultar y modificar.",
        "why": "Conecta JavaScript con documento vivo.",
        "use": "Interactividad del lado cliente.",
        "model": "HTML parseado → árbol DOM → API JS.",
        "language": "web",
        "code": "<p id=\"x\">Antes</p><script>document.querySelector(\"#x\").textContent=\"Después\"</script>",
        "expected": "Después",
        "experiment": "Cambia el selector por uno inexistente y razona el fallo."
      },
      {
        "id": "events",
        "title": "Eventos",
        "what": "Un evento notifica que ocurrió una interacción o cambio; listeners reaccionan cuando el evento se despacha.",
        "why": "Permite UI reactiva sin bucles manuales de polling.",
        "use": "Clicks, teclado, formularios, red.",
        "model": "Evento → propagación → listener → cambio de estado/DOM.",
        "language": "web",
        "code": "<button onclick=\"this.textContent='Listo'\">Pulsa</button>",
        "expected": "Al pulsar: Listo",
        "experiment": "Explica por qué el código corre después del click."
      }
    ],
    "project": "Página accesible pequeña sin framework con evento y estado.",
    "gate": "Puedes seguir HTML→DOM→evento→JS→render y depurar con DevTools.",
    "sources": [
      "mdn",
      "eloquent-js",
      "odin",
      "freecodecamp"
    ]
  },
  {
    "code": "L35",
    "title": "JavaScript moderno, asincronía y TypeScript",
    "phase": "FASE 6 · PLATAFORMAS, WEB Y DATOS",
    "goal": "Dominar el lenguaje de la web y agregar contratos estáticos cuando escale.",
    "topics": [
      {
        "id": "js-model",
        "title": "Modelo de ejecución JS",
        "what": "JavaScript en navegador suele ejecutar código en un hilo principal con event loop que coordina tareas y callbacks.",
        "why": "Explica orden, UI bloqueada y asincronía.",
        "use": "Código web y Node.",
        "model": "Call stack + queues + event loop.",
        "language": "javascript",
        "code": "console.log(\"A\");\nPromise.resolve().then(()=>console.log(\"B\"));\nconsole.log(\"C\");",
        "expected": "A\nC\nB",
        "experiment": "Predice orden antes de ejecutar."
      },
      {
        "id": "modules",
        "title": "ES modules",
        "what": "Módulos dividen código en archivos con imports/exports explícitos.",
        "why": "Crean límites y dependencias visibles.",
        "use": "Aplicaciones JS/TS.",
        "model": "export publica; import declara dependencia.",
        "language": "text",
        "code": "export function suma... / import { suma } from \"./math.js\"",
        "expected": "",
        "experiment": "Dibuja grafo de tres módulos."
      },
      {
        "id": "typescript",
        "title": "TypeScript",
        "what": "TypeScript analiza un superset de JavaScript con tipos estáticos y emite JavaScript.",
        "why": "Detecta incompatibilidades antes de ejecutar y mejora tooling.",
        "use": "Bases JS medianas/grandes, APIs compartidas.",
        "model": "TS source → type checker → JS output.",
        "language": "text",
        "code": "type User={id:number,name:string};",
        "expected": "",
        "experiment": "Crea un valor que viole el tipo y predice el diagnóstico."
      },
      {
        "id": "async-web",
        "title": "fetch, Promises y errores async",
        "what": "Una Promise representa un resultado futuro; fetch inicia una operación HTTP y requiere manejar status, parsing y fallos.",
        "why": "La red es asíncrona e incierta.",
        "use": "APIs del navegador/Node.",
        "model": "iniciar → await → comprobar respuesta → parsear → manejar error.",
        "language": "javascript",
        "code": "async function f(){ const r=await Promise.resolve({ok:true}); console.log(r.ok) }\nf();",
        "expected": "true",
        "experiment": "Agrega try/catch y lanza un Error."
      }
    ],
    "project": "Cliente web que consume una API simulada con estados loading/success/error.",
    "gate": "Puedes explicar event loop, módulos, Promise y el valor real de TypeScript.",
    "sources": [
      "eloquent-js",
      "mdn",
      "fullstackopen",
      "microsoft-learn"
    ]
  },
  {
    "code": "L36",
    "title": "Backend, APIs, autenticación y seguridad de fronteras",
    "phase": "FASE 6 · PLATAFORMAS, WEB Y DATOS",
    "goal": "Diseñar servicios con contratos, validación y errores explícitos.",
    "topics": [
      {
        "id": "server",
        "title": "Servidor HTTP",
        "what": "Un servidor recibe solicitudes, aplica routing/middleware/lógica y produce respuestas.",
        "why": "Expone capacidades a clientes remotos.",
        "use": "APIs y web backend.",
        "model": "request → parse/validate → auth → lógica → storage → response.",
        "language": "text",
        "code": "POST /users → 201 / 400 / 409",
        "expected": "",
        "experiment": "Define tres errores y status coherentes."
      },
      {
        "id": "rest",
        "title": "Recursos y semántica HTTP",
        "what": "Diseñar una API HTTP exige modelar recursos, métodos, status, headers, idempotencia y representación.",
        "why": "Contratos consistentes reducen ambigüedad cliente/servidor.",
        "use": "APIs HTTP.",
        "model": "URL identifica recurso; método expresa intención; status comunica resultado.",
        "language": "text",
        "code": "GET /orders/123 → 200 o 404",
        "expected": "",
        "experiment": "Decide entre PUT y PATCH para un cambio."
      },
      {
        "id": "authn-authz",
        "title": "Autenticación vs autorización",
        "what": "Autenticar verifica identidad; autorizar decide si esa identidad puede realizar una acción.",
        "why": "Confundirlas produce fallos de seguridad.",
        "use": "Cualquier sistema con usuarios/permisos.",
        "model": "Quién eres ≠ qué puedes hacer.",
        "language": "text",
        "code": "token válido + policy de acceso al recurso",
        "expected": "",
        "experiment": "Da caso autenticado pero no autorizado."
      },
      {
        "id": "input-boundary",
        "title": "Validación, sanitización y límites",
        "what": "Datos externos deben validarse contra esquema/reglas; escaping/encoding depende del contexto de salida.",
        "why": "Previene fallos, corrupción e inyecciones.",
        "use": "APIs, formularios, archivos, mensajes.",
        "model": "Frontera no confiable → parse → validate → normalize → usar.",
        "language": "text",
        "code": "JSON schema / validación explícita",
        "expected": "",
        "experiment": "Explica por qué “sanitizar todo” sin contexto es insuficiente."
      }
    ],
    "project": "Especificación de API con auth, validación, idempotencia y matriz de errores.",
    "gate": "Puedes diseñar contratos HTTP y separar identidad, permisos y datos no confiables.",
    "sources": [
      "fullstackopen",
      "mdn",
      "swebok",
      "cs2023"
    ]
  },
  {
    "code": "L37",
    "title": "Bases de datos, SQL, transacciones e índices",
    "phase": "FASE 6 · PLATAFORMAS, WEB Y DATOS",
    "goal": "Persistir datos con invariantes, consultas y rendimiento consciente.",
    "topics": [
      {
        "id": "relational",
        "title": "Modelo relacional",
        "what": "Organiza datos en relaciones con atributos, claves y restricciones; consultas operan sobre conjuntos.",
        "why": "Separa modelo lógico de almacenamiento físico y ofrece reglas fuertes.",
        "use": "Datos estructurados con relaciones y transacciones.",
        "model": "Tablas + claves + constraints → estado válido.",
        "language": "text",
        "code": "users(id PK, email UNIQUE)",
        "expected": "",
        "experiment": "Explica qué invariant protege UNIQUE."
      },
      {
        "id": "sql",
        "title": "SQL",
        "what": "SQL expresa consultas y modificaciones sobre relaciones de forma declarativa.",
        "why": "Permite filtrar, unir, agregar y transformar datos cerca del motor.",
        "use": "Bases relacionales.",
        "model": "FROM/JOIN construye filas → WHERE filtra → GROUP/aggregate → SELECT proyecta de forma conceptual.",
        "language": "text",
        "code": "SELECT dept, COUNT(*) FROM users GROUP BY dept;",
        "expected": "",
        "experiment": "Predice columnas del resultado."
      },
      {
        "id": "transaction",
        "title": "Transacciones",
        "what": "Una transacción agrupa operaciones bajo garantías definidas de atomicidad/aislamiento/durabilidad según sistema/configuración.",
        "why": "Mantiene invariantes cuando operaciones relacionadas deben comportarse como una unidad.",
        "use": "Pagos, inventario, contabilidad, cambios múltiples.",
        "model": "begin → leer/escribir → commit o rollback.",
        "language": "text",
        "code": "decrementar stock + crear pedido en una transacción.",
        "expected": "",
        "experiment": "Explica fallo entre ambas operaciones sin transacción."
      },
      {
        "id": "index",
        "title": "Índices y query plans",
        "what": "Un índice mantiene una estructura auxiliar para acelerar patrones de consulta a cambio de espacio y coste de escritura.",
        "why": "Consultas correctas pueden ser demasiado lentas a escala.",
        "use": "WHERE/JOIN/ORDER frecuentes y selectivos.",
        "model": "Consulta → planner elige scan/index/join strategy.",
        "language": "text",
        "code": "índice en users(email)",
        "expected": "",
        "experiment": "Explica por qué indexar toda columna no es gratis."
      }
    ],
    "project": "Modelo SQL de un dominio con constraints, transacción e índice justificado.",
    "gate": "Puedes explicar integridad, transacciones, planes e intercambio lectura/escritura.",
    "sources": [
      "fing-plan-2025",
      "openfing",
      "fullstackopen",
      "free-books"
    ]
  },
  {
    "code": "L38",
    "title": "Contenedores, CI/CD, cloud y observabilidad",
    "phase": "FASE 6 · PLATAFORMAS, WEB Y DATOS",
    "goal": "Llevar software desde código hasta operación verificable.",
    "topics": [
      {
        "id": "container",
        "title": "Contenedor",
        "what": "Un contenedor ejecuta procesos con aislamiento y filesystem/configuración empaquetados sobre el kernel host según plataforma.",
        "why": "Hace despliegues más reproducibles, pero no es una VM completa por definición.",
        "use": "Servicios, CI, entornos reproducibles.",
        "model": "Imagen inmutable + configuración/runtime → contenedor/proceso.",
        "language": "text",
        "code": "Dockerfile → image → container",
        "expected": "",
        "experiment": "Distingue imagen y contenedor."
      },
      {
        "id": "ci",
        "title": "Integración continua",
        "what": "CI ejecuta automáticamente build, tests y checks al integrar cambios.",
        "why": "Reduce tiempo entre introducir y detectar defectos.",
        "use": "Equipos y repositorios activos.",
        "model": "push/PR → pipeline reproducible → evidencia.",
        "language": "text",
        "code": "checkout → install → lint → test → build",
        "expected": "",
        "experiment": "Ordena checks para fallar pronto."
      },
      {
        "id": "deployment",
        "title": "Entrega y despliegue",
        "what": "Entrega prepara un artefacto desplegable; despliegue lo pone en un entorno mediante estrategia y rollback.",
        "why": "Separa “compila” de “funciona en producción”.",
        "use": "Servicios y aplicaciones.",
        "model": "artefacto versionado → deploy → health → observación → rollback si falla.",
        "language": "text",
        "code": "blue/green, canary, rolling",
        "expected": "",
        "experiment": "Elige una estrategia para alto riesgo."
      },
      {
        "id": "observability",
        "title": "Logs, métricas y traces",
        "what": "Observabilidad usa señales para inferir estado interno de sistemas a partir de comportamiento externo.",
        "why": "Sin evidencia, operar se vuelve adivinanza.",
        "use": "Producción y sistemas distribuidos.",
        "model": "evento → log; serie → métrica; recorrido → trace.",
        "language": "text",
        "code": "request_id correlaciona logs y spans",
        "expected": "",
        "experiment": "Diseña tres señales para una API lenta."
      }
    ],
    "project": "Pipeline conceptual CI/CD con health checks y plan de observabilidad.",
    "gate": "Puedes explicar imagen, pipeline, despliegue y señales operativas.",
    "sources": [
      "fullstackopen",
      "microsoft-learn",
      "swebok",
      "missing-semester"
    ]
  },
  {
    "code": "L39",
    "title": "Autómatas, lenguajes formales y computabilidad",
    "phase": "FASE 7 · FUNDAMENTOS AVANZADOS",
    "goal": "Comprender qué significa reconocer un lenguaje y límites de computación.",
    "topics": [
      {
        "id": "formal-language",
        "title": "Lenguaje formal y gramática",
        "what": "Un lenguaje formal es un conjunto de cadenas sobre un alfabeto; una gramática describe cómo generar estructuras válidas.",
        "why": "Fundamenta parsers, compiladores, protocolos y teoría.",
        "use": "Sintaxis de lenguajes y formatos.",
        "model": "Alfabeto → tokens/cadenas → reglas → lenguaje.",
        "language": "text",
        "code": "Expr → Expr + Term | Term",
        "expected": "",
        "experiment": "Deriva una expresión simple."
      },
      {
        "id": "automata",
        "title": "Autómatas finitos",
        "what": "Un autómata finito cambia entre un número finito de estados al consumir símbolos.",
        "why": "Modela reconocimiento de patrones regulares.",
        "use": "Lexers, protocolos simples, validadores.",
        "model": "estado actual + símbolo → siguiente estado.",
        "language": "text",
        "code": "estado INICIO --dígito--> NUMERO",
        "expected": "",
        "experiment": "Dibuja transición para punto decimal."
      },
      {
        "id": "turing",
        "title": "Máquina de Turing / computabilidad",
        "what": "Modelos universales formalizan qué funciones son computables bajo supuestos clásicos.",
        "why": "Permite razonar sobre límites, no solo rendimiento.",
        "use": "Teoría de computación, lenguajes.",
        "model": "Control finito + cinta idealizada + reglas.",
        "language": "text",
        "code": "problemas pueden ser indecidibles, no solo “muy lentos”.",
        "expected": "",
        "experiment": "Distingue indecidible de intratable."
      },
      {
        "id": "complexity-classes",
        "title": "Complejidad computacional",
        "what": "Clasifica problemas por recursos requeridos y relaciones entre clases bajo modelos formales.",
        "why": "Explica por qué algunos problemas no tienen algoritmos conocidos eficientes.",
        "use": "Algoritmos avanzados y teoría.",
        "model": "Tamaño n → recursos; problema vs algoritmo específico.",
        "language": "text",
        "code": "P, NP como conceptos, no etiquetas de código.",
        "expected": "",
        "experiment": "Explica diferencia entre verificar y encontrar a alto nivel."
      }
    ],
    "project": "Mapa conceptual que conecte regex→autómata→gramática→parser→límites.",
    "gate": "Puedes distinguir sintaxis formal, computabilidad y complejidad.",
    "sources": [
      "fing-plan-2025",
      "famaf-lcc",
      "cs2023",
      "free-books"
    ]
  },
  {
    "code": "L40",
    "title": "Lexer, parser, AST y semántica",
    "phase": "FASE 7 · FUNDAMENTOS AVANZADOS",
    "goal": "Construir el frente de un lenguaje o procesador.",
    "topics": [
      {
        "id": "lexer",
        "title": "Lexer / scanner",
        "what": "Convierte una secuencia de caracteres en tokens significativos según reglas léxicas.",
        "why": "Simplifica parsing separando espacios/comentarios/palabras/números.",
        "use": "Compiladores, intérpretes, DSLs.",
        "model": "caracteres → tokens con tipo/lexema/posición.",
        "language": "text",
        "code": "\"x + 12\" → IDENT(x), PLUS, NUMBER(12)",
        "expected": "",
        "experiment": "Define token para paréntesis."
      },
      {
        "id": "parser",
        "title": "Parser",
        "what": "Consume tokens y construye una estructura según gramática, detectando errores sintácticos.",
        "why": "Transforma secuencia plana en jerarquía.",
        "use": "Lenguajes, formatos, protocolos.",
        "model": "tokens + gramática → árbol/AST.",
        "language": "text",
        "code": "1 + 2 * 3 → Add(1, Mul(2,3))",
        "expected": "",
        "experiment": "Explica precedencia en el árbol."
      },
      {
        "id": "ast",
        "title": "AST",
        "what": "Abstract Syntax Tree representa estructura semánticamente relevante omitiendo detalles sintácticos innecesarios.",
        "why": "Sirve para análisis, transformación e interpretación/compilación.",
        "use": "Compiladores, linters, formatters.",
        "model": "Nodo por construcción del lenguaje.",
        "language": "text",
        "code": "Binary(+, Literal(1), Literal(2))",
        "expected": "",
        "experiment": "Diseña nodo para if."
      },
      {
        "id": "semantic",
        "title": "Análisis semántico",
        "what": "Comprueba propiedades que la gramática por sí sola no garantiza: nombres, tipos, scopes, etc.",
        "why": "Un programa puede ser sintácticamente válido pero semánticamente inválido.",
        "use": "Compiladores e IDEs.",
        "model": "AST + tablas de símbolos/tipos → diagnósticos/AST anotado.",
        "language": "text",
        "code": "x + true puede parsear pero fallar en type check.",
        "expected": "",
        "experiment": "Da otro error semántico."
      }
    ],
    "project": "Mini parser de expresiones o diseño completo de tokens/AST con tests.",
    "gate": "Puedes seguir caracteres hasta AST y separar errores léxicos, sintácticos y semánticos.",
    "sources": [
      "crafting",
      "fing-plan-2025",
      "famaf-lcc",
      "nand2tetris"
    ]
  },
  {
    "code": "L41",
    "title": "Intérpretes, bytecode, VM y garbage collection",
    "phase": "FASE 7 · FUNDAMENTOS AVANZADOS",
    "goal": "Entender cómo un lenguaje ejecuta programas.",
    "topics": [
      {
        "id": "interpreter",
        "title": "Intérprete de AST",
        "what": "Un intérprete puede recorrer AST y evaluar cada nodo según reglas semánticas.",
        "why": "Es la implementación más directa de un lenguaje pequeño.",
        "use": "DSLs, enseñanza, prototipos.",
        "model": "eval(node) despacha por tipo de nodo y combina resultados.",
        "language": "text",
        "code": "eval(Add(a,b)) = eval(a)+eval(b)",
        "expected": "",
        "experiment": "Define eval para literal."
      },
      {
        "id": "bytecode",
        "title": "Bytecode",
        "what": "Bytecode es una representación de instrucciones para una máquina virtual, más baja que AST y más portable que máquina nativa.",
        "why": "Reduce trabajo de interpretación y desacopla frontend de VM.",
        "use": "Python/JVM/VMs y lenguajes propios.",
        "model": "AST → instrucciones compactas → VM.",
        "language": "text",
        "code": "CONST 1; CONST 2; ADD; RETURN",
        "expected": "",
        "experiment": "Traza la pila de operandos."
      },
      {
        "id": "vm",
        "title": "Máquina virtual",
        "what": "Una VM implementa un modelo de ejecución: instrucciones, stack/registros, frames, objetos y control.",
        "why": "Hace explícito el runtime del lenguaje.",
        "use": "Lenguajes, emulación, sandboxing.",
        "model": "fetch/decode/execute sobre instrucciones virtuales.",
        "language": "text",
        "code": "ip apunta a siguiente instrucción; stack guarda operandos.",
        "expected": "",
        "experiment": "Explica call frame."
      },
      {
        "id": "gc",
        "title": "Garbage collection",
        "what": "GC recupera memoria de objetos que ya no son alcanzables según el modelo del runtime.",
        "why": "Automatiza liberación pero introduce algoritmos y trade-offs.",
        "use": "Lenguajes con memoria gestionada.",
        "model": "raíces → marcar alcanzables → recuperar resto (modelo mark-sweep).",
        "language": "text",
        "code": "objeto sin camino desde roots es candidato.",
        "expected": "",
        "experiment": "Dibuja grafo con objeto inalcanzable."
      }
    ],
    "project": "Diseño de una VM de pila con 6 instrucciones y trazas.",
    "gate": "Puedes explicar AST interpreter vs bytecode VM y cómo GC decide alcanzabilidad.",
    "sources": [
      "crafting",
      "nand2tetris",
      "cs2023"
    ]
  },
  {
    "code": "L42",
    "title": "Optimización, profiling y rendimiento",
    "phase": "FASE 7 · FUNDAMENTOS AVANZADOS",
    "goal": "Optimizar con mediciones y modelos, no intuición.",
    "topics": [
      {
        "id": "profiling",
        "title": "Profiling",
        "what": "Un profiler mide dónde consume tiempo/memoria el programa bajo una carga.",
        "why": "Optimizar partes irrelevantes desperdicia tiempo.",
        "use": "Cuando rendimiento es un requisito y hay workload representativo.",
        "model": "Medir distribución del coste → hotspot → hipótesis.",
        "language": "text",
        "code": "perfil muestra 70% en parsear(), 5% en render().",
        "expected": "",
        "experiment": "Decide dónde investigar primero."
      },
      {
        "id": "benchmark-design",
        "title": "Diseño de benchmark",
        "what": "Un benchmark útil controla datos, calentamiento, repeticiones, ambiente y métrica.",
        "why": "Evita conclusiones por ruido o workload artificial.",
        "use": "Comparación de versiones/algoritmos.",
        "model": "Pregunta específica → experimento reproducible → distribución, no un solo número.",
        "language": "text",
        "code": "p50/p95 + throughput + memoria según objetivo.",
        "expected": "",
        "experiment": "Define un benchmark para endpoint."
      },
      {
        "id": "optimization",
        "title": "Optimización algorítmica y de constante",
        "what": "Primero mejora complejidad cuando domina; luego reduce asignaciones, copias, misses o overhead donde la medición lo justifica.",
        "why": "Diferentes capas de coste requieren soluciones distintas.",
        "use": "Hotspots confirmados.",
        "model": "Perfil + modelo de hardware + cambio + medir de nuevo.",
        "language": "text",
        "code": "O(n²)→O(n log n) suele superar microoptimización.",
        "expected": "",
        "experiment": "Da un caso donde Big-O igual pero cache cambia mucho."
      },
      {
        "id": "perf-correctness",
        "title": "Performance como requisito verificable",
        "what": "Rendimiento debe especificarse con carga, percentil, hardware/entorno y presupuesto.",
        "why": "“Que sea rápido” no es testeable.",
        "use": "SLOs y sistemas críticos.",
        "model": "métrica + escenario + umbral + método de medición.",
        "language": "text",
        "code": "p95 < 200ms a 300 req/s con dataset X.",
        "expected": "",
        "experiment": "Escribe un requisito de memoria."
      }
    ],
    "project": "Informe de performance con baseline, perfil, cambio y comparación.",
    "gate": "Puedes localizar hotspots y demostrar mejora sin romper corrección.",
    "sources": [
      "mit-performance",
      "cs2023",
      "swebok"
    ]
  },
  {
    "code": "L43",
    "title": "Paralelismo, SIMD y GPU",
    "phase": "FASE 7 · FUNDAMENTOS AVANZADOS",
    "goal": "Comprender cuándo el hardware paralelo cambia el diseño.",
    "topics": [
      {
        "id": "parallel",
        "title": "Descomposición paralela",
        "what": "Divide trabajo en tareas que pueden ejecutarse simultáneamente con dependencias controladas.",
        "why": "Acelera problemas con suficiente trabajo independiente.",
        "use": "Cómputo científico, procesamiento, servidores.",
        "model": "trabajo total + camino crítico + overhead de coordinación.",
        "language": "text",
        "code": "dividir array en bloques → procesar → reducir resultados.",
        "expected": "",
        "experiment": "Identifica sección secuencial inevitable."
      },
      {
        "id": "simd",
        "title": "SIMD/vectorización",
        "what": "SIMD aplica una instrucción a múltiples datos en paralelo dentro de unidades vectoriales.",
        "why": "Aprovecha hardware para bucles numéricos regulares.",
        "use": "Imágenes, matrices, codecs, ciencia.",
        "model": "mismo operador sobre lanes de datos.",
        "language": "text",
        "code": "[a,b,c,d]+[e,f,g,h] en operación vectorial.",
        "expected": "",
        "experiment": "Explica por qué branches irregulares dificultan."
      },
      {
        "id": "gpu",
        "title": "Modelo GPU",
        "what": "GPU ejecuta enormes cantidades de trabajo paralelo con jerarquías de ejecución/memoria específicas.",
        "why": "Es potente para workloads masivamente paralelos, no para todo.",
        "use": "Gráficos, ML, simulación, cómputo.",
        "model": "CPU prepara/coordina; GPU ejecuta kernels/shaders sobre muchos elementos.",
        "language": "text",
        "code": "kernel por elemento + buffers de entrada/salida.",
        "expected": "",
        "experiment": "Identifica coste de transferir datos."
      },
      {
        "id": "shader",
        "title": "Shaders y pipeline",
        "what": "Shaders son programas ejecutados en etapas del pipeline gráfico para procesar vértices, fragmentos y otras unidades según API.",
        "why": "Conecta programación con renderizado GPU.",
        "use": "Gráficos, visualización y GPGPU relacionado.",
        "model": "datos de geometría → vertex processing → rasterización → fragment processing.",
        "language": "text",
        "code": "fragment shader produce color por fragmento.",
        "expected": "",
        "experiment": "Explica uniform vs dato por vértice a alto nivel."
      }
    ],
    "project": "Diseño de un algoritmo paralelo con análisis de dependencias y overhead.",
    "gate": "Puedes decidir si un workload es paralelizable y explicar CPU/SIMD/GPU como modelos distintos.",
    "sources": [
      "mit-performance",
      "openfing",
      "cs2023"
    ]
  },
  {
    "code": "L44",
    "title": "Rust, C++, Go, JVM y .NET como ecosistemas",
    "phase": "FASE 8 · PROFESIONAL Y FRONTERA",
    "goal": "Aprender a transferir fundamentos entre lenguajes sin coleccionar sintaxis.",
    "topics": [
      {
        "id": "rust-model",
        "title": "Rust: ownership y borrowing",
        "what": "Rust usa ownership/borrowing/lifetimes para verificar muchas reglas de memoria y aliasing en compilación.",
        "why": "Permite seguridad de memoria sin GC general en el modelo habitual.",
        "use": "Sistemas, herramientas, servicios donde Rust encaja.",
        "model": "Cada valor tiene owner; referencias deben respetar reglas de validez/aliasing.",
        "language": "text",
        "code": "let s = String::from(\"hola\"); let r=&s;",
        "expected": "",
        "experiment": "Explica por qué r no posee el String."
      },
      {
        "id": "cpp-model",
        "title": "C++: RAII, templates y control",
        "what": "C++ combina abstracciones de alto nivel con control de recursos y múltiples paradigmas; RAII liga lifetime de recurso al objeto.",
        "why": "Es clave en sistemas, motores, HPC y bases existentes.",
        "use": "Cuando ecosistema/requisitos justifican complejidad y control.",
        "model": "constructor adquiere, destructor libera; templates parametrizan en compile-time.",
        "language": "text",
        "code": "std::vector<int> gestiona memoria automáticamente mediante RAII.",
        "expected": "",
        "experiment": "Distingue RAII de GC."
      },
      {
        "id": "go-model",
        "title": "Go: goroutines, interfaces y simplicidad",
        "what": "Go ofrece compilación, GC, goroutines/channels e interfaces estructurales con una filosofía de lenguaje pequeña.",
        "why": "Es común en servicios e infraestructura.",
        "use": "Backend, cloud, tooling, concurrencia I/O.",
        "model": "goroutine = tarea ligera gestionada por runtime; channel coordina valores.",
        "language": "text",
        "code": "go worker(); ch <- valor",
        "expected": "",
        "experiment": "Explica canal sin asumir memoria compartida cero."
      },
      {
        "id": "managed",
        "title": "JVM/.NET: runtimes gestionados",
        "what": "JVM y .NET proporcionan runtimes con bytecode/IL, JIT, GC, bibliotecas y tooling para múltiples lenguajes.",
        "why": "Explica ecosistemas Java/Kotlin y C#/F# más allá de sintaxis.",
        "use": "Enterprise, backend, multiplataforma.",
        "model": "source → bytecode/IL → runtime/JIT → máquina.",
        "language": "text",
        "code": "Java/Kotlin→JVM; C#/F#→.NET IL/runtime.",
        "expected": "",
        "experiment": "Compara AOT/JIT conceptualmente."
      }
    ],
    "project": "Mismo problema diseñado en dos ecosistemas comparando tipos, memoria, errores y tooling.",
    "gate": "Puedes transferir conceptos y elegir ecosistema por trade-offs, no moda.",
    "sources": [
      "rust-book",
      "comprehensive-rust",
      "microsoft-learn",
      "cs2023"
    ]
  },
  {
    "code": "L45",
    "title": "Móvil, escritorio, embedded e IoT",
    "phase": "FASE 8 · PROFESIONAL Y FRONTERA",
    "goal": "Adaptar programación a restricciones de plataforma.",
    "topics": [
      {
        "id": "mobile",
        "title": "Modelo de app móvil",
        "what": "Apps móviles viven bajo lifecycle, permisos, recursos, UI/eventos y políticas del SO.",
        "why": "No es simplemente “web en pantalla pequeña”.",
        "use": "Android/iOS.",
        "model": "SO crea/suspende/reanuda componentes; estado debe sobrevivir cambios.",
        "language": "text",
        "code": "foreground/background + permisos + storage.",
        "expected": "",
        "experiment": "Diseña qué estado persistir al suspender."
      },
      {
        "id": "desktop",
        "title": "Aplicación de escritorio",
        "what": "Desktop puede usar toolkits nativos/multiplataforma, filesystem y procesos con permisos del usuario.",
        "why": "Tiene trade-offs de distribución, actualización y seguridad distintos a web.",
        "use": "Herramientas, IDEs, apps productivas.",
        "model": "event loop UI + procesos/threads + integración OS.",
        "language": "text",
        "code": "UI thread no debe bloquearse con I/O largo.",
        "expected": "",
        "experiment": "Explica cómo mover tarea a background."
      },
      {
        "id": "embedded",
        "title": "Embedded",
        "what": "Software embebido opera con recursos, tiempo y hardware específicos, a veces sin SO general.",
        "why": "Hace visibles restricciones de memoria, energía y tiempo real.",
        "use": "Microcontroladores, dispositivos, IoT.",
        "model": "registros/periféricos + interrupciones + loop/control.",
        "language": "text",
        "code": "leer sensor → filtrar → actuar → dormir.",
        "expected": "",
        "experiment": "Identifica recurso limitado."
      },
      {
        "id": "realtime",
        "title": "Tiempo real",
        "what": "Un sistema de tiempo real se preocupa por cumplir deadlines, no solo por ser rápido en promedio.",
        "why": "Una respuesta tardía puede ser incorrecta.",
        "use": "Control, audio, robótica, industrial.",
        "model": "worst-case/latency budget > throughput promedio.",
        "language": "text",
        "code": "tarea debe completar antes de 10 ms.",
        "expected": "",
        "experiment": "Distingue hard y soft real-time a alto nivel."
      }
    ],
    "project": "Diseño de una misma feature para web, móvil y embedded con restricciones.",
    "gate": "Puedes adaptar arquitectura a lifecycle, recursos y deadlines.",
    "sources": [
      "netacad",
      "roadmap",
      "cs2023"
    ]
  },
  {
    "code": "L46",
    "title": "Ingeniería de datos y pipelines",
    "phase": "FASE 8 · PROFESIONAL Y FRONTERA",
    "goal": "Programar sistemas que mueven, transforman y gobiernan datos.",
    "topics": [
      {
        "id": "pipeline",
        "title": "Pipeline de datos",
        "what": "Un pipeline ingiere, valida, transforma y entrega datos entre sistemas con contratos y observabilidad.",
        "why": "Automatiza flujos repetibles y confiables.",
        "use": "ETL/ELT, analytics, ML.",
        "model": "source → ingest → validate → transform → sink.",
        "language": "text",
        "code": "evento → cola → procesamiento → warehouse.",
        "expected": "",
        "experiment": "Define contrato de una etapa."
      },
      {
        "id": "batch-stream",
        "title": "Batch vs streaming",
        "what": "Batch procesa conjuntos acotados; streaming trata eventos continuos con tiempo/estado y semánticas de entrega.",
        "why": "El modelo afecta latencia, coste y complejidad.",
        "use": "Datos periódicos vs eventos casi en tiempo real.",
        "model": "batch tiene frontera; stream requiere ventanas/checkpoints/offsets.",
        "language": "text",
        "code": "daily job vs eventos por segundo.",
        "expected": "",
        "experiment": "Elige para facturación diaria y fraude."
      },
      {
        "id": "quality",
        "title": "Calidad y lineage",
        "what": "Calidad aplica reglas sobre completitud, validez, unicidad y consistencia; lineage registra origen/transformaciones.",
        "why": "Datos incorrectos propagados generan decisiones incorrectas.",
        "use": "Pipelines y gobernanza.",
        "model": "contratos + checks + metadatos + trazabilidad.",
        "language": "text",
        "code": "campo id NOT NULL y único; origen tabla A columna x.",
        "expected": "",
        "experiment": "Diseña 3 checks para dataset."
      },
      {
        "id": "orchestration",
        "title": "Orquestación y reintentos",
        "what": "Un orquestador coordina dependencias, scheduling, estado y recuperación de tareas.",
        "why": "Pipelines distribuidos fallan y deben reanudarse de forma segura.",
        "use": "Workflows de datos/ML/ops.",
        "model": "DAG + estado de tarea + retry/idempotencia.",
        "language": "text",
        "code": "extract → transform → load, con retry seguro.",
        "expected": "",
        "experiment": "Explica por qué tarea debe ser idempotente."
      }
    ],
    "project": "Diseñar pipeline con esquema, calidad, retries, observabilidad y backfill.",
    "gate": "Puedes razonar batch/stream, contratos y fallos operativos.",
    "sources": [
      "data-roadmap-peru",
      "data-eng-roadmap",
      "data-eng-es",
      "ossu-data"
    ]
  },
  {
    "code": "L47",
    "title": "IA Engineering, programación asistida y capstone profesional",
    "phase": "FASE 8 · PROFESIONAL Y FRONTERA",
    "goal": "Usar IA como herramienta sin abandonar especificaciones, pruebas, seguridad ni comprensión.",
    "topics": [
      {
        "id": "ai-assisted",
        "title": "Programación asistida por IA",
        "what": "Un modelo puede proponer código, explicaciones o tests, pero la responsabilidad de especificar, revisar, ejecutar y verificar permanece en el proceso de ingeniería.",
        "why": "Aumenta velocidad solo si existe control de calidad y contexto suficiente.",
        "use": "Borradores, exploración, refactor, tests, documentación bajo revisión.",
        "model": "requisito claro → propuesta → diff → tests/análisis → revisión humana → integración.",
        "language": "text",
        "code": "Nunca aceptar código solo porque “parece correcto”.",
        "expected": "",
        "experiment": "Escribe checklist de validación para una función generada."
      },
      {
        "id": "llm-system",
        "title": "Sistemas con modelos fundacionales",
        "what": "Una aplicación con LLM agrega componentes probabilísticos: prompts/contexto, modelo, herramientas, retrieval, evaluación, guardrails y observabilidad.",
        "why": "Programar con modelos requiere medir calidad y controlar fallos distintos al software determinista.",
        "use": "Asistentes, agentes, búsqueda, generación.",
        "model": "entrada → contexto/herramientas → modelo → validación → acción/salida.",
        "language": "text",
        "code": "eval dataset + métricas + revisión de fallos.",
        "expected": "",
        "experiment": "Define una evaluación offline pequeña."
      },
      {
        "id": "supply-chain",
        "title": "Cadena de suministro de software",
        "what": "Dependencias, paquetes, acciones CI y artefactos amplían la superficie de confianza.",
        "why": "Una aplicación segura también depende de cómo obtiene y construye componentes.",
        "use": "npm/pip/cargo, CI/CD, contenedores.",
        "model": "source + dependencies + build → artifact con provenance.",
        "language": "text",
        "code": "lockfile, pinning, scanning, signatures según riesgo.",
        "expected": "",
        "experiment": "Enumera 3 dependencias de confianza de un build."
      },
      {
        "id": "capstone",
        "title": "Capstone y defensa técnica",
        "what": "Un capstone integra requisitos, diseño, implementación, tests, seguridad, performance, despliegue, observabilidad y documentación en un sistema defendible.",
        "why": "El dominio real se demuestra construyendo y explicando decisiones bajo restricciones.",
        "use": "Cierre de formación y portafolio profesional.",
        "model": "problema real → especificación → iteraciones → evidencia → defensa.",
        "language": "text",
        "code": "README + ADRs + tests + benchmarks + threat model + demo.",
        "expected": "",
        "experiment": "Define un capstone que te obligue a usar al menos 6 áreas."
      }
    ],
    "project": "Capstone completo: producto funcional, repositorio limpio, tests, CI, arquitectura, seguridad, métricas, documentación y defensa técnica.",
    "gate": "Puedes construir, medir, revisar y explicar un sistema sin depender de copiar un tutorial o salida de IA.",
    "sources": [
      "swebok",
      "cs2023",
      "google-eng-practices",
      "roadmap",
      "ia-roadmap-es"
    ]
  }
]

export const getProgrammingLevelV51 = (code: string) => programmingLevelsV51.find((level) => level.code === code) ?? programmingLevelsV51[0]

export const getLevelSourcesV51 = (code: string) => getProgrammingLevelV51(code).sources.map(sourceByIdV51).filter((source): source is NonNullable<typeof source> => Boolean(source))

export const programmingConceptCountV51 = programmingLevelsV51.reduce((total, level) => total + level.topics.length, 0)
