export type ProgrammingLevel = {
  code: string
  title: string
  phase: string
  summary: string
  languages: string[]
  skills: string[]
  project: string
  evidence: string
}

export type EnglishLevel = {
  code: string
  title: string
  cefr: string
  summary: string
  skills: string[]
  mission: string
  techFocus: string[]
}

export const programmingLevels: ProgrammingLevel[] = [
  {
    code: "P0",
    title: "Lógica y pensamiento computacional",
    phase: "Base absoluta",
    summary: "Problemas, descomposición, patrones, pseudocódigo, diagramas, booleanos, tablas de verdad y trazado manual.",
    languages: ["Pseudocódigo", "JavaScript"],
    skills: ["Descomponer problemas", "Variables y estados", "Condiciones", "Bucles", "Funciones", "Depuración manual"],
    project: "Simulador de decisiones paso a paso con trazas visibles.",
    evidence: "Resolver retos nuevos sin copiar y explicar por qué termina cada algoritmo.",
  },
  {
    code: "P1",
    title: "Fundamentos de programación",
    phase: "Construcción",
    summary: "Tipos, operadores, control de flujo, funciones, colecciones, entrada/salida, errores, estilo y pruebas básicas.",
    languages: ["JavaScript", "Python"],
    skills: ["Tipos", "Funciones", "Arrays/listas", "Objetos/diccionarios", "Errores", "Pruebas"],
    project: "Gestor de tareas con validación, persistencia local y pruebas.",
    evidence: "Implementar la misma lógica en dos lenguajes y justificar diferencias.",
  },
  {
    code: "P2",
    title: "Web desde los fundamentos",
    phase: "Frontend esencial",
    summary: "HTML semántico, CSS moderno, accesibilidad, DOM, eventos, formularios, fetch, módulos y responsive.",
    languages: ["HTML", "CSS", "JavaScript"],
    skills: ["Semántica", "Flex/Grid", "DOM", "Eventos", "Fetch", "Accesibilidad", "Responsive"],
    project: "Aplicación web responsive sin framework con estados, filtros y almacenamiento.",
    evidence: "Lighthouse, navegación por teclado, diseño móvil y código organizado en módulos.",
  },
  {
    code: "P3",
    title: "Python profesional",
    phase: "Automatización y datos",
    summary: "Python idiomático, módulos, entornos, archivos, excepciones, typing, testing, CLI y automatización.",
    languages: ["Python", "Bash"],
    skills: ["Pythonic code", "Archivos", "CLI", "Typing", "pytest", "Automatización"],
    project: "Herramienta CLI que procesa datos reales, genera reportes y valida entradas.",
    evidence: "Paquete organizado, tests, README, errores controlados y ejecución reproducible.",
  },
  {
    code: "P4",
    title: "Algoritmos y estructuras de datos",
    phase: "Núcleo CS",
    summary: "Complejidad, listas, pilas, colas, hash, árboles, heaps, grafos, búsqueda, ordenación, greedy y programación dinámica.",
    languages: ["Python", "C++", "Java"],
    skills: ["Big-O", "Estructuras", "Recursión", "Grafos", "DP", "Análisis"],
    project: "Motor de rutas y prioridades con benchmarks y visualización de complejidad.",
    evidence: "Resolver problemas inéditos y comparar tiempo/memoria de alternativas.",
  },
  {
    code: "P5",
    title: "Paradigmas y diseño de software",
    phase: "Modelado",
    summary: "POO, funcional, composición, inmutabilidad, patrones, principios SOLID, refactorización y diseño orientado a dominio.",
    languages: ["Java", "C#", "TypeScript", "Python"],
    skills: ["POO", "Funcional", "SOLID", "Patrones", "Refactor", "Modelado"],
    project: "Sistema modular con dominio, casos de uso y adaptadores intercambiables.",
    evidence: "Diagrama, pruebas, decisiones de diseño y refactor documentado.",
  },
  {
    code: "P6",
    title: "Git, Linux y oficio del desarrollador",
    phase: "Flujo profesional",
    summary: "Shell, procesos, permisos, Git, ramas, PR, debugging, logs, formatos, linters, documentación y trabajo colaborativo.",
    languages: ["Bash", "Git", "Markdown"],
    skills: ["CLI", "Git", "PR", "Debug", "Logs", "Documentación"],
    project: "Repositorio colaborativo con issues, ramas, CI, changelog y release.",
    evidence: "Historial limpio, revisión reproducible y documentación útil para otro desarrollador.",
  },
  {
    code: "P7",
    title: "Datos, SQL y persistencia",
    phase: "Backend base",
    summary: "Modelado relacional, SQL, índices, transacciones, NoSQL, ORMs, migraciones, caché y consistencia.",
    languages: ["SQL", "Python", "TypeScript"],
    skills: ["Modelado", "SQL", "Índices", "Transacciones", "Migraciones", "Caché"],
    project: "Backend con esquema relacional, consultas optimizadas y auditoría de cambios.",
    evidence: "Modelo normalizado, plan de consultas y pruebas de integridad.",
  },
  {
    code: "P8",
    title: "Frontend moderno",
    phase: "Producto web",
    summary: "TypeScript, React, estado, rutas, formularios, componentes, testing, performance, accesibilidad y diseño de sistemas.",
    languages: ["TypeScript", "React", "CSS"],
    skills: ["React", "Estado", "Testing", "A11y", "Performance", "Design systems"],
    project: "Aplicación SPA accesible, offline-friendly y con pruebas de componentes.",
    evidence: "Bundle medido, pruebas, accesibilidad y responsive real.",
  },
  {
    code: "P9",
    title: "Backend, APIs y seguridad",
    phase: "Servicios",
    summary: "HTTP, REST, GraphQL, auth, sesiones, OAuth, validación, rate limiting, colas, eventos y observabilidad.",
    languages: ["Node.js", "Python", "Go"],
    skills: ["HTTP", "REST", "Auth", "Validación", "Colas", "Observabilidad"],
    project: "API segura con usuarios, permisos, auditoría, límites y documentación OpenAPI.",
    evidence: "Pruebas de integración, amenazas básicas y métricas de servicio.",
  },
  {
    code: "P10",
    title: "Sistemas y bajo nivel",
    phase: "Cómo funciona de verdad",
    summary: "Memoria, punteros, representación, compilación, procesos, hilos, sincronización, sockets, rendimiento y seguridad de memoria.",
    languages: ["C", "C++", "Rust"],
    skills: ["Memoria", "Punteros", "Concurrencia", "Sockets", "Profiling", "Seguridad"],
    project: "Servidor concurrente pequeño y herramienta de profiling comparando implementaciones.",
    evidence: "Explicar memoria, carreras, coste y perfiles medidos.",
  },
  {
    code: "P11",
    title: "Ecosistemas empresariales",
    phase: "Escala organizacional",
    summary: "Java/Kotlin, C#/.NET, capas, DI, pruebas, persistencia, mensajería, contratos y evolución de sistemas grandes.",
    languages: ["Java", "Kotlin", "C#"],
    skills: ["DI", "Capas", "Mensajería", "Contratos", "Testing", "Mantenibilidad"],
    project: "Servicio empresarial modular con eventos, persistencia y pruebas contractuales.",
    evidence: "Arquitectura, calidad, versionado y documentación de integración.",
  },
  {
    code: "P12",
    title: "Móvil y multiplataforma",
    phase: "Clientes",
    summary: "Android, iOS, Flutter/React Native, ciclo de vida, estado, navegación, almacenamiento, red, sensores y publicación.",
    languages: ["Kotlin", "Swift", "Dart", "TypeScript"],
    skills: ["Android", "iOS", "Flutter", "Estado", "Offline", "APIs"],
    project: "Cliente móvil offline-first conectado a una API propia.",
    evidence: "Flujos completos, manejo de red, persistencia y pruebas en varios tamaños.",
  },
  {
    code: "P13",
    title: "Cloud, DevOps, SRE y AppSec",
    phase: "Producción",
    summary: "Contenedores, CI/CD, IaC, Kubernetes, observabilidad, SLO, resiliencia, secretos, supply chain y seguridad de aplicaciones.",
    languages: ["Docker", "YAML", "Terraform", "Bash"],
    skills: ["CI/CD", "Containers", "IaC", "SRE", "Observabilidad", "AppSec"],
    project: "Despliegue reproducible con pipeline, métricas, alertas y recuperación.",
    evidence: "SLO, runbook, pruebas de fallo y trazabilidad de cambios.",
  },
  {
    code: "P14",
    title: "Arquitectura, compiladores y frontera",
    phase: "Dominio experto",
    summary: "Distribuidos, compiladores, runtimes, consistencia, performance, open source, diseño de APIs y lectura de sistemas reales.",
    languages: ["Rust", "Go", "C++", "TypeScript", "Python"],
    skills: ["Distribuidos", "Compiladores", "Runtimes", "Arquitectura", "Performance", "OSS"],
    project: "Capstone: producto completo con arquitectura defendible, observabilidad, pruebas y contribución open-source.",
    evidence: "Defensa técnica, benchmark, threat model, ADRs y contribución revisada por terceros.",
  },
]

export const englishLevels: EnglishLevel[] = [
  {
    code: "E0",
    title: "Pre-A1 · Cero absoluto",
    cefr: "Pre-A1",
    summary: "Sonidos, alfabeto, números, comandos mínimos, saludos y palabras esenciales del entorno digital.",
    skills: ["Reconocer letras", "Deletrear", "Entender comandos cortos", "Presentarse"],
    mission: "Presentarte como estudiante de informática y reconocer 30 comandos básicos.",
    techFocus: ["open", "save", "run", "file", "folder", "click", "error", "help"],
  },
  {
    code: "E1",
    title: "A1 · Supervivencia técnica",
    cefr: "A1",
    summary: "Frases simples, presente, preguntas básicas, instrucciones y vocabulario cotidiano de PC y programación.",
    skills: ["Leer interfaces", "Dar instrucciones", "Hablar de rutina", "Escribir mensajes simples"],
    mission: "Explicar en frases sencillas qué haces en tu computadora y seguir una guía corta.",
    techFocus: ["keyboard", "screen", "code", "bug", "user", "password", "network", "program"],
  },
  {
    code: "E2",
    title: "A2 · Inglés del desarrollador inicial",
    cefr: "A2",
    summary: "Pasado/futuro básico, comparaciones, tickets, commits, documentación corta y conversaciones previsibles.",
    skills: ["Leer README", "Escribir commit", "Describir un bug", "Pedir aclaración"],
    mission: "Reportar un bug completo y explicar los pasos para reproducirlo.",
    techFocus: ["issue", "commit", "branch", "deploy", "request", "response", "database", "server"],
  },
  {
    code: "E3",
    title: "B1 · Trabajo técnico independiente",
    cefr: "B1",
    summary: "Explicar decisiones, participar en reuniones, leer tutoriales y documentación, escribir issues y PR con claridad.",
    skills: ["Stand-up", "Pull request", "Documentación", "Troubleshooting", "Opiniones justificadas"],
    mission: "Presentar un cambio técnico y responder preguntas del equipo durante 3–5 minutos.",
    techFocus: ["trade-off", "requirement", "implementation", "test case", "failure", "release", "dependency"],
  },
  {
    code: "E4",
    title: "B2 · Profesional de software",
    cefr: "B2",
    summary: "Reuniones técnicas, arquitectura, negociación, incidentes, documentación extensa y conversación fluida con equipos globales.",
    skills: ["Design review", "Incidentes", "Debate", "Presentaciones", "Escritura profesional"],
    mission: "Defender una arquitectura, reconocer riesgos y proponer alternativas en inglés.",
    techFocus: ["scalability", "reliability", "latency", "throughput", "rollback", "observability", "security"],
  },
  {
    code: "E5",
    title: "C1 · Ingeniería avanzada",
    cefr: "C1",
    summary: "Matices, documentación compleja, papers, negociación, liderazgo, feedback y explicación de conceptos abstractos.",
    skills: ["Papers", "RFC", "Mentoría", "Negociación", "Argumentación"],
    mission: "Escribir y presentar un RFC técnico con objeciones y decisiones justificadas.",
    techFocus: ["consistency", "fault tolerance", "threat model", "benchmark", "invariant", "deprecation"],
  },
  {
    code: "E6",
    title: "C2 · Dominio profesional completo",
    cefr: "C2",
    summary: "Comprensión prácticamente total, precisión estilística, persuasión, investigación, conferencias y liderazgo internacional.",
    skills: ["Conferencia", "Investigación", "Liderazgo", "Escritura de alto nivel", "Improvisación"],
    mission: "Dar una charla técnica extensa, responder preguntas difíciles y resumir un paper con precisión.",
    techFocus: ["state of the art", "methodology", "reproducibility", "assumption", "constraint", "implication"],
  },
  {
    code: "E7",
    title: "English for Computing · Especialización",
    cefr: "B2–C2",
    summary: "Capa transversal para software, sistemas, datos, IA, ciberseguridad, cloud, investigación y entrevistas.",
    skills: ["Entrevistas", "Pair programming", "Code review", "Incident command", "Papers", "Conferencias"],
    mission: "Trabajar una semana simulada íntegramente en inglés: issue → código → review → incidente → demo.",
    techFocus: ["architecture decision", "root cause", "postmortem", "code review", "model evaluation", "research gap"],
  },
]

export const roadMilestones = [
  { code: "00", title: "Orientación", tone: "lime", meta: "Cómo estudiar" },
  { code: "01", title: "Fundamentos", tone: "blue", meta: "Matemática · lógica" },
  { code: "02", title: "Programación", tone: "pink", meta: "Software · algoritmos" },
  { code: "03", title: "Sistemas", tone: "cyan", meta: "SO · redes · hardware" },
  { code: "04", title: "Datos", tone: "sand", meta: "SQL · BI · ingeniería" },
  { code: "05", title: "Seguridad", tone: "orange", meta: "Defensa · AppSec" },
  { code: "06", title: "IA", tone: "violet", meta: "ML · agentes · MLOps" },
  { code: "07", title: "Arquitectura", tone: "green", meta: "Cloud · distribuidos" },
  { code: "08", title: "Frontera", tone: "lime", meta: "Investigación · futuro" },
]
