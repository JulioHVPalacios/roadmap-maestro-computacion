export type CertificationCategory =
  | "Programación y web"
  | "Datos e IA"
  | "Ciberseguridad"
  | "Cloud y DevOps"
  | "Redes y TI"
  | "Productividad digital"
  | "Marketing y negocio"
  | "Fundamentos y empleabilidad"

export type CertificationLanguage = "ES" | "ES/EN" | "EN"
export type CertificationKind = "Certificación" | "Credencial" | "Insignia" | "Curso con certificado" | "Curso gratuito" | "Ruta formativa"

export type CertificationItem = {
  id: string
  title: string
  provider: string
  description: string
  category: CertificationCategory
  language: CertificationLanguage
  kind: CertificationKind
  url: string
  catalogUrl?: string
  tags: string[]
  courseFree: boolean
  credentialFree: boolean
  credentialLabel: string
  featured?: boolean
  level?: "Inicial" | "Intermedio" | "Avanzado" | "Todos"
  duration?: string
  expiresAt?: string
  availabilityNote?: string
  sourceType?: "seed" | "discovered" | "community-verified"
  verifiedAt?: string
  status?: "active" | "limited" | "inactive" | "unknown"
}

export type CertificationCatalogSource = {
  id: string
  provider: string
  url: string
  domains: string[]
  category: CertificationCategory
  language: CertificationLanguage
  kind: CertificationKind
  courseFree: boolean
  credentialFree: boolean
  credentialLabel: string
  include: string[]
  exclude?: string[]
  maxItems: number
  pathHints?: string[]
}

export const certificationSeed: CertificationItem[] = [
  {
    id: "ibm-digital-credentials",
    title: "IBM SkillsBuild · Credenciales digitales",
    provider: "IBM SkillsBuild",
    description: "Catálogo oficial de credenciales digitales de IBM SkillsBuild. Prioriza IA, datos, ciberseguridad, TI, nube y habilidades profesionales.",
    category: "Datos e IA", language: "ES", kind: "Credencial",
    url: "https://skillsbuild.org/es/digital-credentials",
    tags: ["IBM", "Credly", "IA", "datos", "ciberseguridad"], courseFree: true, credentialFree: true,
    credentialLabel: "Credenciales gratuitas", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "ibm-emerging-tech",
    title: "Descubre las tecnologías emergentes",
    provider: "IBM SkillsBuild",
    description: "Credencial sobre datos, IA, cloud, ciberseguridad y computación cuántica, disponible en español.",
    category: "Fundamentos y empleabilidad", language: "ES", kind: "Credencial",
    url: "https://skillsbuild.org/es/digital-credentials",
    tags: ["IBM", "IA", "cloud", "ciberseguridad", "cuántica"], courseFree: true, credentialFree: true,
    credentialLabel: "Credencial digital gratuita", featured: true, duration: "7+ h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "ibm-data-fundamentals",
    title: "Conceptos básicos sobre datos",
    provider: "IBM SkillsBuild",
    description: "Fundamentos de análisis y ciencia de datos, metodologías, herramientas y ecosistema profesional.",
    category: "Datos e IA", language: "ES", kind: "Credencial",
    url: "https://skillsbuild.org/es/students/digital-credentials",
    tags: ["datos", "data science", "IBM", "Watson Studio"], courseFree: true, credentialFree: true,
    credentialLabel: "Credencial digital gratuita", duration: "7 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "ibm-data-literacy",
    title: "Alfabetización en datos",
    provider: "IBM SkillsBuild",
    description: "Credencial en español sobre lectura, calidad, ética y uso responsable de datos para la toma de decisiones.",
    category: "Datos e IA", language: "ES", kind: "Credencial",
    url: "https://skillsbuild.org/es/students/digital-credentials",
    tags: ["datos", "alfabetización", "ética", "IBM"], courseFree: true, credentialFree: true,
    credentialLabel: "Credencial digital gratuita", duration: "3 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "ibm-cyber-fundamentals",
    title: "Fundamentos de la ciberseguridad",
    provider: "IBM SkillsBuild",
    description: "Credencial IBM para adquirir fundamentos de ciberseguridad con disponibilidad en español.",
    category: "Ciberseguridad", language: "ES", kind: "Credencial",
    url: "https://skillsbuild.org/es/digital-credentials",
    tags: ["ciberseguridad", "IBM", "seguridad"], courseFree: true, credentialFree: true,
    credentialLabel: "Credencial digital gratuita", featured: true, level: "Inicial", sourceType: "seed",
  },
  {
    id: "ibm-agile-explorer",
    title: "Agile Explorer",
    provider: "IBM SkillsBuild",
    description: "Valores, principios y prácticas ágiles aplicables a trabajo, estudios y proyectos.",
    category: "Fundamentos y empleabilidad", language: "ES", kind: "Credencial",
    url: "https://skillsbuild.org/es/adult-learners/digital-credentials",
    tags: ["Agile", "IBM", "gestión", "proyectos"], courseFree: true, credentialFree: true,
    credentialLabel: "Credencial digital gratuita", duration: "7 h", level: "Inicial", sourceType: "seed",
  },

  {
    id: "hp-ai-beginners",
    title: "IA para principiantes",
    provider: "HP LIFE",
    description: "Conceptos de IA, aprendizaje automático, IA generativa, LLM, datos, ética y tendencias emergentes.",
    category: "Datos e IA", language: "ES", kind: "Curso con certificado",
    url: "https://www.life-global.org/es/course/402-ia-para-principiantes",
    tags: ["IA", "LLM", "machine learning", "HP LIFE"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", featured: true, duration: "~1 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hp-ai-business",
    title: "IA para profesionales de negocios",
    provider: "HP LIFE",
    description: "Uso práctico de IA para productividad, toma de decisiones y crecimiento profesional.",
    category: "Datos e IA", language: "ES", kind: "Curso con certificado",
    url: "https://www.life-global.org/es/course/431-ia-para-profesionales-de-negocios",
    tags: ["IA", "productividad", "negocios", "HP LIFE"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", duration: "~1 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hp-cybersecurity",
    title: "Introducción al Conocimiento de la Ciberseguridad",
    provider: "HP LIFE",
    description: "Amenazas comunes, defensa básica y protección de información y datos digitales.",
    category: "Ciberseguridad", language: "ES", kind: "Curso con certificado",
    url: "https://www.life-global.org/es/course/375-introducci%C3%B3n-al-conocimiento-de-la-ciberseguridad",
    tags: ["ciberseguridad", "seguridad", "HP LIFE"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", featured: true, duration: "~1 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hp-data-science",
    title: "Ciencia y Análisis de Datos",
    provider: "HP LIFE",
    description: "Prácticas, metodologías y herramientas para ciencia de datos y análisis aplicado a organizaciones.",
    category: "Datos e IA", language: "ES", kind: "Curso con certificado",
    url: "https://www.life-global.org/es/course/355-ciencia-y-an%C3%A1lisis-de-datos",
    tags: ["datos", "data science", "analytics", "HP LIFE"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", duration: "~1 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hp-digital-business",
    title: "Introducción a Destrezas Empresariales Digitales",
    provider: "HP LIFE",
    description: "Economía digital, colaboración, productividad, agilidad y transformación empresarial.",
    category: "Productividad digital", language: "ES", kind: "Curso con certificado",
    url: "https://www.life-global.org/es/course/348-introducci%C3%B3n-a-destrezas-empresariales-digitales",
    tags: ["transformación digital", "productividad", "HP LIFE"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", duration: "~1 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hp-it-business",
    title: "Tecnología de la Información para el Éxito en los Negocios",
    provider: "HP LIFE",
    description: "Selección e implementación de soluciones tecnológicas para objetivos empresariales.",
    category: "Redes y TI", language: "ES", kind: "Curso con certificado",
    url: "https://www.life-global.org/es/course/159-tecnolog%C3%ADa-de-la-informaci%C3%B3n-para-el-%C3%A9xito-en-los-negocios",
    tags: ["TI", "tecnología", "negocio", "HP LIFE"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", duration: "~1 h", level: "Inicial", sourceType: "seed",
  },

  {
    id: "santander-python-2026",
    title: "Introducción a la programación con Python",
    provider: "Santander Open Academy",
    description: "Programación Python desde fundamentos, funciones, errores, módulos y práctica con ejemplos reales.",
    category: "Programación y web", language: "ES", kind: "Curso con certificado",
    url: "https://www.santanderopenacademy.com/es/courses/introduction_to_python_programming.html/index.html",
    catalogUrl: "https://www.santanderopenacademy.com/es/sites/courses/tech.html",
    tags: ["Python", "programación", "Santander"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", featured: true, duration: "8 h", expiresAt: "2026-12-31", level: "Inicial", sourceType: "seed",
  },
  {
    id: "santander-marketing-automation-2026",
    title: "Fundamentos de Marketing Automation",
    provider: "Santander Open Academy · ISDI",
    description: "Email marketing, segmentación, diseño de campañas, automatización y seguimiento.",
    category: "Marketing y negocio", language: "ES", kind: "Curso con certificado",
    url: "https://www.santanderopenacademy.com/es/courses/marketing-automation.html/index.html",
    catalogUrl: "https://www.santanderopenacademy.com/es/sites/courses.html",
    tags: ["marketing", "automation", "email", "Santander"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", duration: "7 h", expiresAt: "2026-12-31", level: "Inicial", sourceType: "seed",
  },
  {
    id: "santander-tech-catalog",
    title: "Data, IA y Tecnología · catálogo vivo",
    provider: "Santander Open Academy",
    description: "Catálogo oficial de formación gratuita con certificado en Python, data, IA y tecnología. Sirve como fuente automática de novedades.",
    category: "Datos e IA", language: "ES", kind: "Ruta formativa",
    url: "https://www.santanderopenacademy.com/es/sites/courses/tech.html",
    tags: ["IA", "Python", "data", "tecnología"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificados gratuitos", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "santander-tools-catalog",
    title: "Herramientas digitales e IA · catálogo vivo",
    provider: "Santander Open Academy",
    description: "Cursos gratuitos con certificado sobre ChatGPT, Copilot, Excel, Power BI y productividad digital.",
    category: "Productividad digital", language: "ES", kind: "Ruta formativa",
    url: "https://www.santanderopenacademy.com/es/sites/courses/tools.html",
    tags: ["ChatGPT", "Copilot", "Excel", "Power BI"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificados gratuitos", level: "Todos", sourceType: "seed",
  },

  {
    id: "hubspot-digital-marketing",
    title: "Certificación de Marketing Digital",
    provider: "HubSpot Academy",
    description: "Certificación oficial gratuita sobre estrategia digital, contenido, SEO, redes sociales y medición.",
    category: "Marketing y negocio", language: "ES", kind: "Certificación",
    url: "https://academy.hubspot.com/es/courses/digital-marketing",
    tags: ["marketing digital", "SEO", "HubSpot"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", featured: true, duration: "6 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hubspot-social-media",
    title: "Certificación de Marketing en Redes Sociales",
    provider: "HubSpot Academy",
    description: "Estrategia, contenido, alcance, medición y optimización de redes sociales.",
    category: "Marketing y negocio", language: "ES", kind: "Certificación",
    url: "https://academy.hubspot.com/es/courses/social-media",
    tags: ["social media", "marketing", "HubSpot"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", duration: "6 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hubspot-content-marketing",
    title: "Certificación de Marketing de Contenidos",
    provider: "HubSpot Academy",
    description: "Planificación, creación, distribución y medición de contenidos con certificación gratuita.",
    category: "Marketing y negocio", language: "ES", kind: "Certificación",
    url: "https://academy.hubspot.com/es/courses/content-marketing",
    tags: ["content marketing", "HubSpot", "contenido"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", duration: "9 h", level: "Inicial", sourceType: "seed",
  },
  {
    id: "hubspot-certifications-live",
    title: "HubSpot Academy · certificaciones gratuitas actuales",
    provider: "HubSpot Academy",
    description: "Catálogo vivo de certificaciones completamente gratuitas y online. Incluye novedades como AEO además de marketing, ventas y service.",
    category: "Marketing y negocio", language: "ES", kind: "Ruta formativa",
    url: "https://academy.hubspot.com/es/certification-overview",
    tags: ["certificaciones", "HubSpot", "AEO", "marketing"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificaciones gratuitas", featured: true, level: "Todos", sourceType: "seed",
  },

  {
    id: "google-ads-certifications",
    title: "Certificaciones de Google Ads",
    provider: "Google Skillshop",
    description: "Capacitación gratuita y certificaciones de Google Ads en búsqueda, display y otras especialidades publicitarias.",
    category: "Marketing y negocio", language: "ES", kind: "Certificación",
    url: "https://skillshop.withgoogle.com/intl/es-419_ALL/googleads/",
    tags: ["Google Ads", "Skillshop", "marketing"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "google-developer-badges",
    title: "Google Developer Program · distintivos",
    provider: "Google for Developers",
    description: "Distintivos por completar actividades de aprendizaje, codelabs, cuestionarios y rutas sobre Android, Firebase, Google AI y más.",
    category: "Programación y web", language: "ES", kind: "Insignia",
    url: "https://developers.google.com/profile/badges?hl=es-419",
    tags: ["Google", "Android", "Firebase", "AI", "badges"], courseFree: true, credentialFree: false,
    credentialLabel: "Distintivos digitales", level: "Todos", sourceType: "seed",
  },

  {
    id: "microsoft-ai-agent-applied-skill",
    title: "Microsoft Applied Skills · Create an AI agent",
    provider: "Microsoft Learn",
    description: "Credencial práctica para crear y configurar agentes con Microsoft Foundry mediante evaluación interactiva de laboratorio.",
    category: "Datos e IA", language: "EN", kind: "Credencial",
    url: "https://learn.microsoft.com/en-us/credentials/applied-skills/create-an-ai-agent/",
    tags: ["Microsoft", "AI agents", "Foundry", "Applied Skills"], courseFree: true, credentialFree: true,
    credentialLabel: "Evaluación de credencial gratuita", featured: true, level: "Inicial", sourceType: "seed",
  },
  {
    id: "microsoft-agents-foundry-applied-skill",
    title: "Microsoft Applied Skills · Get started developing agents in Foundry",
    provider: "Microsoft Learn",
    description: "Credencial práctica de Microsoft sobre despliegue de modelos, creación y prueba de agentes.",
    category: "Datos e IA", language: "EN", kind: "Credencial",
    url: "https://learn.microsoft.com/en-us/credentials/applied-skills/get-started-developing-agents-in-microsoft-foundry/",
    tags: ["Microsoft", "Foundry", "agents", "AI"], courseFree: true, credentialFree: true,
    credentialLabel: "Evaluación de credencial gratuita", level: "Inicial", sourceType: "seed",
  },
  {
    id: "microsoft-powerapps-applied-skill",
    title: "Microsoft Applied Skills · Crear y administrar canvas apps con Power Apps",
    provider: "Microsoft Learn",
    description: "Credencial basada en laboratorio con evaluación disponible en español.",
    category: "Productividad digital", language: "ES", kind: "Credencial",
    url: "https://learn.microsoft.com/en-us/credentials/applied-skills/create-manage-canvas-apps-power-apps/",
    tags: ["Microsoft", "Power Apps", "low-code", "Applied Skills"], courseFree: true, credentialFree: true,
    credentialLabel: "Applied Skills · evaluación práctica gratuita", level: "Intermedio", sourceType: "seed",
  },
  {
    id: "microsoft-learn-free",
    title: "Microsoft Learn · formación técnica gratuita",
    provider: "Microsoft Learn",
    description: "Miles de módulos y rutas gratuitas en Azure, IA, Power Platform, seguridad, Microsoft 365 y desarrollo.",
    category: "Cloud y DevOps", language: "ES", kind: "Ruta formativa",
    url: "https://learn.microsoft.com/es-es/training/",
    tags: ["Microsoft", "Azure", "Power Platform", "IA"], courseFree: true, credentialFree: false,
    credentialLabel: "Formación gratuita · certificaciones profesionales pueden costar", featured: true, level: "Todos", sourceType: "seed",
  },

  {
    id: "cisco-netacad",
    title: "Cisco Networking Academy · cursos gratuitos",
    provider: "Cisco Networking Academy",
    description: "Cursos gratuitos en redes, ciberseguridad, IA y ciencia de datos, programación, TI y habilidades profesionales.",
    category: "Redes y TI", language: "ES", kind: "Ruta formativa",
    url: "https://www.netacad.com/es/",
    tags: ["Cisco", "redes", "ciberseguridad", "Python"], courseFree: true, credentialFree: false,
    credentialLabel: "Cursos gratis · certificaciones Cisco profesionales son aparte", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "cisco-intro-cyber",
    title: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    description: "Curso gratuito para introducirse a ciberseguridad y a una ruta profesional inicial.",
    category: "Ciberseguridad", language: "ES/EN", kind: "Curso gratuito",
    url: "https://www.netacad.com/es/",
    tags: ["Cisco", "ciberseguridad", "beginner"], courseFree: true, credentialFree: false,
    credentialLabel: "Curso gratuito", duration: "6 h", level: "Inicial", sourceType: "seed",
  },

  {
    id: "aws-skill-builder-free",
    title: "AWS Skill Builder · formación gratuita",
    provider: "Amazon Web Services",
    description: "Más de mil recursos gratuitos de aprendizaje sobre cloud e IA y cientos de cursos digitales a tu propio ritmo.",
    category: "Cloud y DevOps", language: "ES", kind: "Ruta formativa",
    url: "https://aws.amazon.com/es/training/digital/",
    tags: ["AWS", "cloud", "IA", "Skill Builder"], courseFree: true, credentialFree: false,
    credentialLabel: "Formación gratuita · certificaciones AWS profesionales son aparte", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "aws-training-badges",
    title: "AWS Training Badges",
    provider: "Amazon Web Services",
    description: "Insignias de formación AWS gratuitas para rutas seleccionadas y evaluaciones asociadas.",
    category: "Cloud y DevOps", language: "EN", kind: "Insignia",
    url: "https://aws.amazon.com/training/badges/",
    tags: ["AWS", "badges", "cloud", "Credly"], courseFree: true, credentialFree: true,
    credentialLabel: "Insignia gratuita", featured: true, level: "Todos", sourceType: "seed",
  },

  {
    id: "mtpe-capacita-t",
    title: "CAPACÍTA-T · cursos certificados del MTPE Perú",
    provider: "Ministerio de Trabajo y Promoción del Empleo · Perú",
    description: "Más de 200 cursos y 40 rutas formativas gratuitas con certificación, incluyendo ciberseguridad, Excel y competencias digitales.",
    category: "Fundamentos y empleabilidad", language: "ES", kind: "Ruta formativa",
    url: "https://capacitacionlaboral.trabajo.gob.pe/",
    tags: ["Perú", "MTPE", "certificado", "empleabilidad"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita con QR", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "empleos-peru-certifica",
    title: "Empleos Perú · capacitación y certificación",
    provider: "Ministerio de Trabajo y Promoción del Empleo · Perú",
    description: "Portal peruano para capacitarse y certificarse gratuitamente con cursos de entidades públicas y empresas privadas.",
    category: "Fundamentos y empleabilidad", language: "ES", kind: "Ruta formativa",
    url: "https://www.gob.pe/23794-obtener-capacitacion-y-certificacion-en-empleos-peru",
    tags: ["Perú", "empleo", "certificación", "MTPE"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", level: "Todos", sourceType: "seed",
  },
  {
    id: "carlos-slim-capacitate",
    title: "Capacítate para el Empleo",
    provider: "Fundación Carlos Slim",
    description: "Cursos y diplomados gratuitos online con certificado al concluir la capacitación, incluyendo programación y competencias digitales.",
    category: "Fundamentos y empleabilidad", language: "ES", kind: "Ruta formativa",
    url: "https://capacitateparaelempleo.org/",
    tags: ["Carlos Slim", "programación", "empleo", "certificado"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", featured: true, level: "Todos", sourceType: "seed",
  },

  {
    id: "openlearn-digital-skills",
    title: "Digital skills: succeeding in a digital world",
    provider: "The Open University · OpenLearn",
    description: "Curso gratuito con Statement of Participation y badge digital gratuito al cumplir los requisitos.",
    category: "Productividad digital", language: "EN", kind: "Insignia",
    url: "https://www.open.edu/openlearn/mod/oucontent/view.php?id=105151",
    tags: ["OpenLearn", "digital skills", "badge"], courseFree: true, credentialFree: true,
    credentialLabel: "Badge + declaración de participación gratis", level: "Inicial", sourceType: "seed",
  },
  {
    id: "openlearn-catalog",
    title: "OpenLearn · cursos gratuitos y declaraciones de participación",
    provider: "The Open University",
    description: "Casi mil cursos gratuitos. Todos permiten obtener Statement of Participation y algunos incluyen badge digital gratuito.",
    category: "Fundamentos y empleabilidad", language: "EN", kind: "Ruta formativa",
    url: "https://www.open.edu/openlearn/",
    tags: ["Open University", "OpenLearn", "badges"], courseFree: true, credentialFree: true,
    credentialLabel: "Declaración de participación gratuita", level: "Todos", sourceType: "seed",
  },

  {
    id: "mongodb-university-free",
    title: "MongoDB University · cursos y Skill Badges gratuitos",
    provider: "MongoDB University",
    description: "Catálogo oficial con formación gratuita sobre MongoDB, Atlas, datos, desarrollo y búsqueda vectorial; incluye Skill Badges gratuitos y contenido disponible en español.",
    category: "Datos e IA", language: "ES/EN", kind: "Insignia",
    url: "https://learn.mongodb.com/catalog?labels=%5B%22Free%2FPaid%22%5D&values=%5B%22Free%22%5D",
    tags: ["MongoDB", "Atlas", "datos", "skill badges"], courseFree: true, credentialFree: true,
    credentialLabel: "Skill Badges gratuitos", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "saylor-free-certificates",
    title: "Saylor University · cursos con certificado gratuito",
    provider: "Saylor University",
    description: "Catálogo de cursos gratuitos con certificados de finalización verificables sin costo al aprobar el examen final del curso.",
    category: "Fundamentos y empleabilidad", language: "EN", kind: "Curso con certificado",
    url: "https://www.saylor.org/certificates/",
    tags: ["Saylor", "certificate", "computer science", "business"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado verificable gratuito", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "fortinet-free-training",
    title: "Fortinet Training Institute · formación de ciberseguridad gratuita",
    provider: "Fortinet Training Institute",
    description: "Lecciones self-paced abiertas gratuitamente en la biblioteca oficial de Fortinet; los laboratorios bajo demanda y certificaciones profesionales se tratan por separado.",
    category: "Ciberseguridad", language: "ES/EN", kind: "Ruta formativa",
    url: "https://training.fortinet.com/",
    tags: ["Fortinet", "cybersecurity", "network security", "NSE"], courseFree: true, credentialFree: false,
    credentialLabel: "Formación gratuita · certificación profesional aparte", level: "Todos", sourceType: "seed",
  },
  {
    id: "sap-learning-free",
    title: "SAP Learning · cursos self-paced gratuitos",
    provider: "SAP Learning",
    description: "Cursos y Learning Journeys oficiales gratuitos para habilidades SAP, cloud y tecnología; la certificación profesional puede requerir una vía separada.",
    category: "Cloud y DevOps", language: "ES/EN", kind: "Ruta formativa",
    url: "https://learning.sap.com/",
    tags: ["SAP", "cloud", "enterprise", "learning journeys"], courseFree: true, credentialFree: false,
    credentialLabel: "Cursos gratuitos · certificación profesional aparte", level: "Todos", sourceType: "seed",
  },

  {
    id: "freecodecamp-spanish",
    title: "freeCodeCamp · certificaciones verificadas gratuitas",
    provider: "freeCodeCamp",
    description: "Currículo gratuito de programación con certificaciones verificadas. La plataforma en español se mantiene operativa.",
    category: "Programación y web", language: "ES", kind: "Certificación",
    url: "https://www.freecodecamp.org/espanol/learn/",
    tags: ["freeCodeCamp", "web", "JavaScript", "Python", "databases"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificaciones verificadas gratuitas", featured: true, level: "Todos", sourceType: "seed",
  },

  {
    id: "microsoft-applied-skills",
    title: "Microsoft Applied Skills · credenciales prácticas",
    provider: "Microsoft Learn",
    description: "Credenciales verificadas por Microsoft mediante evaluaciones prácticas basadas en laboratorio. Campus Maestro prioriza las opciones con evaluación disponible en español y mantiene las certificaciones profesionales de examen separadas.",
    category: "Cloud y DevOps", language: "ES/EN", kind: "Credencial",
    url: "https://learn.microsoft.com/es-es/credentials/applied-skills/",
    tags: ["Microsoft", "Applied Skills", "Azure", "IA", "Power Platform"], courseFree: true, credentialFree: true,
    credentialLabel: "Applied Skills · evaluación práctica gratuita", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "google-skillshop-live",
    title: "Google Skillshop · capacitación y certificaciones oficiales",
    provider: "Google Skillshop",
    description: "Formación oficial de Google en español con rutas y certificaciones de producto. Incluye Google Ads y otras herramientas de marketing y medición.",
    category: "Marketing y negocio", language: "ES", kind: "Certificación",
    url: "https://skillshop.withgoogle.com/intl/es-419_ALL/?hl=es",
    tags: ["Google", "Skillshop", "Google Ads", "Analytics", "marketing"], courseFree: true, credentialFree: true,
    credentialLabel: "Capacitación gratuita + certificaciones de producto", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "platzi-free-certificates",
    title: "Platzi · cursos gratis con certificado",
    provider: "Platzi",
    description: "Selección oficial vigente de cursos 100% gratuitos con certificado incluido, sin tarjeta ni suscripción. El actualizador conserva únicamente la selección que Platzi siga marcando como gratuita.",
    category: "Programación y web", language: "ES", kind: "Curso con certificado",
    url: "https://platzi.com/blog/cursos-gratis/",
    tags: ["Platzi", "programación", "IA", "certificado", "gratis"], courseFree: true, credentialFree: true,
    credentialLabel: "Cursos gratuitos con certificado", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "neo4j-graphacademy-certifications",
    title: "Neo4j GraphAcademy · certificaciones gratuitas",
    provider: "Neo4j GraphAcademy",
    description: "Certificaciones oficiales gratuitas y verificables para Neo4j, Graph Data Science y GenAI, acompañadas de formación self-paced gratuita.",
    category: "Datos e IA", language: "EN", kind: "Certificación",
    url: "https://graphacademy.neo4j.com/certifications",
    tags: ["Neo4j", "Graph Data Science", "GenAI", "Cypher"], courseFree: true, credentialFree: true,
    credentialLabel: "Examen y certificación gratuitos", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "hackerrank-skillup-certify",
    title: "HackerRank SkillUp · certificaciones y badges técnicos",
    provider: "HackerRank",
    description: "Certificaciones gratuitas y cronometradas para demostrar habilidades técnicas, junto con rutas de práctica y badges para desarrolladores.",
    category: "Programación y web", language: "EN", kind: "Certificación",
    url: "https://www.hackerrank.com/skills-verification",
    tags: ["HackerRank", "Python", "JavaScript", "SQL", "React"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificaciones técnicas gratuitas", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "kaggle-learn-certificates",
    title: "Kaggle Learn · microcursos con certificado gratuito",
    provider: "Kaggle",
    description: "Microcursos prácticos de Python, SQL, machine learning, deep learning, pandas, visualización e IA. Kaggle indica que sus cursos Learn no tienen costo y permiten obtener certificado.",
    category: "Datos e IA", language: "EN", kind: "Curso con certificado",
    url: "https://www.kaggle.com/learn",
    tags: ["Kaggle", "Python", "SQL", "machine learning", "certificate"], courseFree: true, credentialFree: true,
    credentialLabel: "Certificado de finalización gratuito", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "github-skills-free",
    title: "GitHub Skills · cursos interactivos gratuitos",
    provider: "GitHub",
    description: "Cursos interactivos gratuitos integrados en GitHub con feedback automatizado. Las certificaciones profesionales de GitHub se muestran aparte cuando exista una vía gratuita válida, como beneficios estudiantiles vigentes.",
    category: "Cloud y DevOps", language: "ES/EN", kind: "Ruta formativa",
    url: "https://skills.github.com/",
    tags: ["GitHub", "Git", "Actions", "Pages", "open source"], courseFree: true, credentialFree: false,
    credentialLabel: "Cursos gratis · certificación profesional aparte", level: "Todos", sourceType: "seed",
  },
  {
    id: "gitlab-university-free",
    title: "GitLab University · formación DevSecOps gratuita",
    provider: "GitLab University",
    description: "Cursos y rutas self-paced gratuitos sobre Git, CI/CD, seguridad y DevSecOps. Las certificaciones profesionales de GitLab tienen examen de pago y se etiquetan por separado.",
    category: "Cloud y DevOps", language: "EN", kind: "Ruta formativa",
    url: "https://university.gitlab.com/",
    tags: ["GitLab", "Git", "CI/CD", "DevSecOps"], courseFree: true, credentialFree: false,
    credentialLabel: "Cursos self-paced gratis · certificación profesional aparte", level: "Todos", sourceType: "seed",
  },
  {
    id: "the-odin-project",
    title: "The Odin Project · currículo full-stack gratuito",
    provider: "The Odin Project",
    description: "Currículo open-source completamente gratuito de desarrollo web. No emite certificado de finalización; se conserva como curso/ruta por la calidad del aprendizaje y proyectos.",
    category: "Programación y web", language: "EN", kind: "Ruta formativa",
    url: "https://www.theodinproject.com/",
    tags: ["The Odin Project", "full-stack", "JavaScript", "Ruby"], courseFree: true, credentialFree: false,
    credentialLabel: "100% gratis · sin certificado", level: "Todos", sourceType: "seed",
  },
  {
    id: "mouredev-free-courses",
    title: "MoureDev · cursos gratuitos de programación",
    provider: "MoureDev",
    description: "Cursos abiertos en español de Python, JavaScript, Java, Git/GitHub, SQL y práctica. El examen y certificado público pertenecen a MoureDev Pro, por lo que no se marcan como gratuitos.",
    category: "Programación y web", language: "ES", kind: "Ruta formativa",
    url: "https://github.com/mouredev",
    tags: ["MoureDev", "Python", "JavaScript", "Java", "SQL"], courseFree: true, credentialFree: false,
    credentialLabel: "Cursos gratis · certificado Pro aparte", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "midudev-free-courses",
    title: "midudev · cursos y proyectos gratuitos",
    provider: "midudev",
    description: "Cursos y repositorios gratuitos en español sobre React, JavaScript, desarrollo web, IA y proyectos prácticos. Se publica como formación gratuita, no como certificación oficial.",
    category: "Programación y web", language: "ES", kind: "Ruta formativa",
    url: "https://github.com/midudev",
    tags: ["midudev", "React", "JavaScript", "web", "IA"], courseFree: true, credentialFree: false,
    credentialLabel: "Cursos y proyectos gratuitos · sin certificado oficial", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "fazt-free-courses",
    title: "Fazt · cursos gratuitos de programación y desarrollo web",
    provider: "Fazt",
    description: "Catálogo en español con más de mil videos y numerosos cursos/tutoriales gratuitos sobre frontend, backend, bases de datos, programación e IA.",
    category: "Programación y web", language: "ES", kind: "Ruta formativa",
    url: "https://fazt.dev/",
    tags: ["Fazt", "programación", "web", "Node.js", "React"], courseFree: true, credentialFree: false,
    credentialLabel: "Contenido gratuito · cursos premium separados", featured: true, level: "Todos", sourceType: "seed",
  },
  {
    id: "holamundo-open-content",
    title: "HolaMundo · contenido abierto de programación",
    provider: "HolaMundo · Nicolás Schürmann",
    description: "Contenido público en español sobre programación, IA, Linux y carrera profesional. La Academia HolaMundo y sus certificados digitales requieren pago, por eso Campus Maestro no los etiqueta como gratuitos.",
    category: "Programación y web", language: "ES", kind: "Ruta formativa",
    url: "https://www.youtube.com/@HolaMundoDev",
    tags: ["HolaMundo", "programación", "IA", "Linux", "YouTube"], courseFree: true, credentialFree: false,
    credentialLabel: "Contenido abierto gratis · academia/certificado de pago", level: "Todos", sourceType: "seed",
  },
  {
    id: "meta-blueprint-free-learning",
    title: "Meta Blueprint · cursos y preparación gratuitos",
    provider: "Meta Blueprint",
    description: "Cursos autoguiados y materiales gratuitos para habilidades de Meta, publicidad y marketing digital. Los exámenes de certificación profesional se gestionan por separado y no se marcan como gratuitos.",
    category: "Marketing y negocio", language: "ES/EN", kind: "Ruta formativa",
    url: "https://www.facebook.com/business/learn",
    tags: ["Meta", "Blueprint", "Facebook", "Instagram", "marketing"], courseFree: true, credentialFree: false,
    credentialLabel: "Formación gratis · examen de certificación aparte", level: "Todos", sourceType: "seed",
  },
]

export const certificationCatalogSources: CertificationCatalogSource[] = [
  {
    id: "hp-life", provider: "HP LIFE", url: "https://www.life-global.org/es/courses", domains: ["life-global.org"],
    category: "Productividad digital", language: "ES", kind: "Curso con certificado", courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", include: ["ia", "datos", "ciber", "digital", "tecnolog", "marketing", "ventas", "negocio", "finanzas", "comunicación"], exclude: ["ayuda", "login", "privacy"], maxItems: 32, pathHints: ["/es/course/"],
  },
  {
    id: "santander", provider: "Santander Open Academy", url: "https://www.santanderopenacademy.com/es/sites/courses.html", domains: ["santanderopenacademy.com"],
    category: "Fundamentos y empleabilidad", language: "ES", kind: "Curso con certificado", courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", include: ["python", "ia", "inteligencia", "data", "datos", "cloud", "ciber", "excel", "power bi", "copilot", "chatgpt", "program", "digital", "tecnolog", "marketing"], exclude: ["finalizado", "bases legales", "faq"], maxItems: 40, pathHints: ["/es/courses/"],
  },
  {
    id: "hubspot", provider: "HubSpot Academy", url: "https://academy.hubspot.com/es/certification-overview", domains: ["academy.hubspot.com"],
    category: "Marketing y negocio", language: "ES", kind: "Certificación", courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", include: ["certific", "marketing", "inbound", "seo", "aeo", "ventas", "contenido", "social", "report"], exclude: ["support", "login"], maxItems: 30, pathHints: ["/es/courses/"],
  },
  {
    id: "mtpe", provider: "CAPACÍTA-T · MTPE Perú", url: "https://capacitacionlaboral.trabajo.gob.pe/cursos/", domains: ["capacitacionlaboral.trabajo.gob.pe"],
    category: "Fundamentos y empleabilidad", language: "ES", kind: "Curso con certificado", courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", include: ["ciber", "excel", "word", "digital", "program", "datos", "ia", "tecnolog", "cloud", "redes", "marketing"], exclude: ["login", "preguntas"], maxItems: 35,
  },
  {
    id: "ibm", provider: "IBM SkillsBuild", url: "https://skillsbuild.org/es/digital-credentials", domains: ["skillsbuild.org"],
    category: "Datos e IA", language: "ES", kind: "Credencial", courseFree: true, credentialFree: true,
    credentialLabel: "Credencial digital gratuita", include: ["ia", "inteligencia", "datos", "ciber", "cloud", "ti", "agile", "web", "tecnolog", "digital"], exclude: ["privacy", "login"], maxItems: 30,
  },
  {
    id: "cisco", provider: "Cisco Networking Academy", url: "https://www.netacad.com/es/", domains: ["netacad.com"],
    category: "Redes y TI", language: "ES", kind: "Curso gratuito", courseFree: true, credentialFree: false,
    credentialLabel: "Curso gratuito", include: ["cyber", "ciber", "network", "redes", "python", "javascript", "linux", "computer", "ia", "data", "iot", "packet tracer"], exclude: ["certification exam", "login"], maxItems: 30,
  },
  {
    id: "openlearn", provider: "The Open University · OpenLearn", url: "https://www.open.edu/openlearn/science-maths-technology/free-courses", domains: ["open.edu"],
    category: "Fundamentos y empleabilidad", language: "EN", kind: "Curso con certificado", courseFree: true, credentialFree: true,
    credentialLabel: "Statement of Participation gratuito", include: ["comput", "digital", "data", "cyber", "network", "program", "software", "technology", "internet"], exclude: ["contact", "privacy"], maxItems: 25,
  },
  {
    id: "mongodb", provider: "MongoDB University", url: "https://learn.mongodb.com/catalog?labels=%5B%22Free%2FPaid%22%5D&values=%5B%22Free%22%5D", domains: ["learn.mongodb.com"],
    category: "Datos e IA", language: "ES/EN", kind: "Curso gratuito", courseFree: true, credentialFree: false,
    credentialLabel: "Curso gratuito · Skill Badges en rutas seleccionadas", include: ["mongodb", "atlas", "data", "datos", "vector", "ai", "ia", "developer", "python", "security"], exclude: ["instructor-led", "cart"], maxItems: 30,
  },
  {
    id: "saylor", provider: "Saylor University", url: "https://learn.saylor.org/course/index.php?categoryid=9", domains: ["learn.saylor.org", "saylor.org"],
    category: "Programación y web", language: "EN", kind: "Curso con certificado", courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", include: ["computer", "program", "software", "network", "information", "data", "web"], exclude: ["login", "support"], maxItems: 25,
  },
  {
    id: "fortinet", provider: "Fortinet Training Institute", url: "https://training.fortinet.com/", domains: ["training.fortinet.com"],
    category: "Ciberseguridad", language: "ES/EN", kind: "Curso gratuito", courseFree: true, credentialFree: false,
    credentialLabel: "Self-paced gratuito", include: ["security", "seguridad", "network", "fortigate", "cloud", "cyber", "nse"], exclude: ["purchase", "schedule"], maxItems: 25,
  },
  {
    id: "sap", provider: "SAP Learning", url: "https://learning.sap.com/", domains: ["learning.sap.com"],
    category: "Cloud y DevOps", language: "ES/EN", kind: "Curso gratuito", courseFree: true, credentialFree: false,
    credentialLabel: "Curso self-paced gratuito", include: ["sap", "cloud", "data", "developer", "integration", "ai", "business", "technology"], exclude: ["subscription", "premium"], maxItems: 25,
  },
  {
    id: "freecodecamp", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/espanol/learn/", domains: ["freecodecamp.org"],
    category: "Programación y web", language: "ES", kind: "Certificación", courseFree: true, credentialFree: true,
    credentialLabel: "Certificación verificable gratuita", include: ["certification", "certificacion", "responsive", "javascript", "python", "database", "backend", "front end", "full stack"], exclude: ["forum", "news", "donate"], maxItems: 24, pathHints: ["/learn/", "/espanol/learn/"],
  },
  {
    id: "microsoft-applied", provider: "Microsoft Learn", url: "https://learn.microsoft.com/es-es/credentials/applied-skills/", domains: ["learn.microsoft.com"],
    category: "Cloud y DevOps", language: "ES/EN", kind: "Credencial", courseFree: true, credentialFree: true,
    credentialLabel: "Microsoft Applied Skills", include: ["applied skills", "azure", "copilot", "power", "security", "data", "ai", "ia", "agent"], exclude: ["support", "certifications/"], maxItems: 42, pathHints: ["/credentials/applied-skills/"],
  },
  {
    id: "google-skillshop", provider: "Google Skillshop", url: "https://skillshop.withgoogle.com/intl/es-419_ALL/?hl=es", domains: ["skillshop.withgoogle.com"],
    category: "Marketing y negocio", language: "ES", kind: "Certificación", courseFree: true, credentialFree: true,
    credentialLabel: "Capacitación gratuita + certificación de producto", include: ["google ads", "certific", "analytics", "marketing", "display", "shopping", "video", "measurement"], exclude: ["privacy", "terms"], maxItems: 24,
  },
  {
    id: "platzi-free", provider: "Platzi", url: "https://platzi.com/blog/cursos-gratis/", domains: ["platzi.com"],
    category: "Programación y web", language: "ES", kind: "Curso con certificado", courseFree: true, credentialFree: true,
    credentialLabel: "Curso gratuito con certificado", include: ["curso", "programacion", "programación", "inteligencia artificial", "ia", "ingles", "inglés", "lovable", "copilot", "interledger", "marca personal"], exclude: ["precios", "suscripcion", "suscripción"], maxItems: 18, pathHints: ["/cursos/"],
  },
  {
    id: "neo4j", provider: "Neo4j GraphAcademy", url: "https://graphacademy.neo4j.com/certifications", domains: ["graphacademy.neo4j.com"],
    category: "Datos e IA", language: "EN", kind: "Certificación", courseFree: true, credentialFree: true,
    credentialLabel: "Certificación gratuita", include: ["certification", "neo4j", "graph data science", "generative ai", "genai"], exclude: ["events"], maxItems: 12, pathHints: ["/certifications/"],
  },
  {
    id: "kaggle", provider: "Kaggle Learn", url: "https://www.kaggle.com/learn", domains: ["kaggle.com"],
    category: "Datos e IA", language: "EN", kind: "Curso con certificado", courseFree: true, credentialFree: true,
    credentialLabel: "Certificado gratuito", include: ["python", "sql", "machine learning", "deep learning", "pandas", "data", "visualization", "ai", "ethics"], exclude: ["competitions", "datasets"], maxItems: 28, pathHints: ["/learn/"],
  },
  {
    id: "gitlab-university", provider: "GitLab University", url: "https://university.gitlab.com/", domains: ["university.gitlab.com"],
    category: "Cloud y DevOps", language: "EN", kind: "Curso gratuito", courseFree: true, credentialFree: false,
    credentialLabel: "Curso self-paced gratuito · examen profesional aparte", include: ["git", "gitlab", "ci/cd", "cicd", "devsecops", "security", "agile", "duo"], exclude: ["checkout", "cart", "purchase"], maxItems: 30,
  },
  {
    id: "fazt", provider: "Fazt", url: "https://fazt.dev/", domains: ["fazt.dev"],
    category: "Programación y web", language: "ES", kind: "Curso gratuito", courseFree: true, credentialFree: false,
    credentialLabel: "Curso/video gratuito", include: ["curso", "javascript", "react", "node", "python", "typescript", "nestjs", "ia", "ai", "database"], exclude: ["premium", "mentoria", "mentoría"], maxItems: 28,
  },
]
