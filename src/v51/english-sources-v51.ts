export type EnglishSourceCategoryV51 =
  | "university"
  | "standard"
  | "book"
  | "industry"
  | "academic"
  | "opensource"

export type EnglishSourceV51 = {
  id: string
  title: string
  authorOrOrg: string
  yearOrEdition: string
  category: EnglishSourceCategoryV51
  summary: string
  url: string
  focus: string[]
}

export const englishSourcesV51: EnglishSourceV51[] = [
  {
    id: "mit-eecs-writing",
    title: "Technical Communication for Electrical Engineering and Computer Science",
    authorOrOrg: "MIT Department of Electrical Engineering & Computer Science",
    yearOrEdition: "MIT OpenCourseWare 6.UAT / 6.033",
    category: "university",
    summary: "Programa oficial del MIT para la comunicación oral y escrita de ingenieros en computación: diseño de presentaciones técnicas, defensa de sistemas complejos y redacción de informes de ingeniería.",
    url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/",
    focus: ["System design defense", "Technical presentations", "Engineering trade-offs", "Peer critique"],
  },
  {
    id: "cmu-cs-communication",
    title: "Communication for Computer Scientists & Software Engineers",
    authorOrOrg: "Carnegie Mellon University (CMU) School of Computer Science",
    yearOrEdition: "Course 15-221 / LTI",
    category: "university",
    summary: "Metodología de CMU para estructurar argumentos técnicos, resumir papers científicos, participar en debates de arquitectura y comunicar incertidumbre técnica con precisión.",
    url: "https://www.cs.cmu.edu/",
    focus: ["Research summaries", "Scientific debates", "Algorithmic explanations", "Formal clarity"],
  },
  {
    id: "oxford-english-it",
    title: "Oxford English for Information Technology",
    authorOrOrg: "Eric H. Glendinning & John McEwan (Oxford University Press)",
    yearOrEdition: "2nd Edition",
    category: "book",
    summary: "Texto canónico universitario de ESP (English for Specific Purposes) que cubre desde arquitectura de computadores y sistemas operativos hasta redes, inteligencia artificial y multimedia.",
    url: "https://elt.oup.com/catalogue/items/global/business_esp/oxford_english_for_information_technology_second_edition/",
    focus: ["Hardware terminology", "Operating systems", "Networking fundamentals", "Grammar in technical context"],
  },
  {
    id: "cambridge-ict",
    title: "Professional English in Use: ICT",
    authorOrOrg: "Santiago Remacha Esteras & Elena Marco Fabre (Cambridge University Press)",
    yearOrEdition: "Cambridge English Language Assessment",
    category: "book",
    summary: "Guía de referencia y práctica para profesionales de informática: vocabulario de desarrollo de software, seguridad de la información, bases de datos y gestión de proyectos.",
    url: "https://www.cambridge.org/elt",
    focus: ["Software development life cycle", "Database terminology", "Security idioms", "Workplace English"],
  },
  {
    id: "google-tech-writing",
    title: "Google Technical Writing Courses (Technical Writing One & Two)",
    authorOrOrg: "Google for Developers",
    yearOrEdition: "Google Engineering Guidelines",
    category: "industry",
    summary: "Estándar de la industria para ingenieros de software: voz activa vs pasiva, listas paralelas, eliminación de jerga ambigua, diseño de tablas, redacción de mensajes de error y documentación de APIs.",
    url: "https://developers.google.com/tech-writing",
    focus: ["Active voice", "Conciseness", "Self-explanatory code docs", "Error messages", "RFC clarity"],
  },
  {
    id: "rfc-2119",
    title: "RFC 2119: Key words for use in RFCs to Indicate Requirement Levels",
    authorOrOrg: "Internet Engineering Task Force (IETF) - S. Bradner",
    yearOrEdition: "IETF Best Current Practice BCP 14",
    category: "standard",
    summary: "Definición canónica de verbos modales de precisión técnica obligatoria (MUST, MUST NOT, REQUIRED, SHALL, SHOULD, RECOMMENDED, MAY, OPTIONAL) usada en protocolos y especificaciones internacionales.",
    url: "https://www.ietf.org/rfc/rfc2119.txt",
    focus: ["Normative keywords", "Requirement specifications", "API contracts", "Protocol compliance"],
  },
  {
    id: "google-sre-postmortem",
    title: "Site Reliability Engineering: Postmortem Culture & Incident Management",
    authorOrOrg: "Betsy Beyer, Chris Jones, Jennifer Petoff, Niall Richard Murphy (Google O'Reilly)",
    yearOrEdition: "O'Reilly Media",
    category: "industry",
    summary: "Estructura estándar para la comunicación durante caídas críticas (War Rooms, On-Call triage) y redacción de Post-Mortems sin culpa (Timeline, Root Cause Analysis, Mitigating Factors, Preventative Action Items).",
    url: "https://sre.google/sre-book/postmortem-culture/",
    focus: ["Blameless RCA", "Incident timelines", "On-call war rooms", "SLA/SLO communication"],
  },
  {
    id: "adr-architecture-records",
    title: "Documenting Architecture Decisions (ADRs)",
    authorOrOrg: "Michael Nygard & Martin Fowler (ThoughtWorks)",
    yearOrEdition: "Industry Architectural Standard",
    category: "standard",
    summary: "Plantilla universal para comunicar decisiones técnicas complejas: Context, Decision, Consequences, Alternatives Considered y Status.",
    url: "https://martinfowler.com/articles/scaling-architecture-conversationally.html",
    focus: ["ADR templates", "Architectural trade-offs", "Technical rationale", "System evolution"],
  },
  {
    id: "acm-ieee-style",
    title: "IEEE Computer Society & ACM Author Style Guides",
    authorOrOrg: "ACM / IEEE Computer Society",
    yearOrEdition: "Current Publishing Standards",
    category: "academic",
    summary: "Normas internacionales para redactar abstracts, introducciones, formalizaciones matemáticas, secciones de evaluación empírica y conclusiones en papers de computación.",
    url: "https://www.acm.org/publications/authors/reference-formatting",
    focus: ["Academic abstracts", "Hypothesis formulation", "Empirical evaluation", "LaTeX mathematical precision"],
  },
  {
    id: "awesome-english-developers",
    title: "Awesome English for Developers & Open Source Communities",
    authorOrOrg: "Global Open Source Contributors",
    yearOrEdition: "Community Curated Repository",
    category: "opensource",
    summary: "Compilación de mejores prácticas para comunicación en GitHub/GitLab: redacción de Pull Requests, etiqueta en Code Reviews, apertura de Issues detallados y guías de contribución internacional.",
    url: "https://github.com/ksushbush/awesome-english-for-developers",
    focus: ["PR descriptions", "Code review etiquette", "Issue templates", "Async global communication"],
  },
]

export const englishSourceByIdV51 = new Map(englishSourcesV51.map((s) => [s.id, s]))
