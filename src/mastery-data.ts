export type TrackSource = { label: string; url: string; note: string; lang: "ES" | "ES/EN" | "EN→ES" };
export type TrackUnit = { name: string; focus: string; evidence: string; sources: TrackSource[] };
export type MasteryTrack = {
  code: string;
  icon: string;
  title: string;
  family: string;
  duration: string;
  prerequisites: string;
  goal: string;
  units: TrackUnit[];
  gate: string;
};

export const masteryTracks: MasteryTrack[] = [
  {
    code: "T01", icon: "⌘", title: "Ingeniería de software, web, móvil y plataformas", family: "Software",
    duration: "800–1.100 h", prerequisites: "S0–S10", goal: "Pasar de programador a ingeniero capaz de diseñar, construir, probar, operar y evolucionar productos en web, móvil, escritorio y plataformas internas.",
    units: [
      { name: "Arquitectura y diseño de software", focus: "Requisitos, modelado, modularidad, DDD conceptual, patrones, arquitectura hexagonal/clean, APIs, integración, ADR y deuda técnica.", evidence: "Diseñar y defender una arquitectura para un sistema multiusuario con ADR, amenazas, pruebas y plan de evolución.", sources: [
        { label: "FAMAF · Ingeniería de Software I/II", url: "https://github.com/FAMAF-resources/3ro_2C-Ingenieria_del_Software_I-FAMAF", note: "Guías, teoría y evaluaciones; completar luego IS II.", lang: "ES" },
        { label: "UBA · Ingeniería de Software", url: "https://gitlab.com/valn/uba", note: "Carpeta Ingeniería de Software: clases, trabajos y material.", lang: "ES" }
      ]},
      { name: "Full stack de producción", focus: "React, Node, TypeScript, REST/GraphQL, autenticación, pruebas, bases de datos, contenedores y CI/CD.", evidence: "Producto full stack desplegable localmente con pruebas E2E, observabilidad y pipeline CI.", sources: [
        { label: "Full Stack Open · Español", url: "https://fullstackopen.com/es/", note: "Recorrer todas las partes vigentes y proyectos.", lang: "ES" },
        { label: "freeCodeCamp · currículo", url: "https://www.freecodecamp.org/learn/", note: "Usar laboratorios interactivos como práctica suplementaria.", lang: "ES/EN" }
      ]},
      { name: "Móvil, escritorio y PWA", focus: "Arquitecturas cliente, offline-first, sincronización, accesibilidad, permisos, seguridad, packaging, actualizaciones y distribución.", evidence: "Una misma solución con cliente web/PWA y cliente móvil o escritorio, compartiendo contrato y pruebas.", sources: [
        { label: "Microsoft Learn · desarrollo", url: "https://learn.microsoft.com/es-es/training/browse/?roles=developer", note: "Elegir rutas gratuitas de aplicaciones y .NET según plataforma.", lang: "ES" },
        { label: "roadmap.sh · Android/iOS", url: "https://roadmap.sh/", note: "Solo auditoría de cobertura; no copiar su contenido.", lang: "EN→ES" }
      ]},
      { name: "Rendimiento, concurrencia y sistemas", focus: "Profiling, memoria, concurrencia, colas, backpressure, cachés, latencia, runtime, diagnóstico y performance engineering.", evidence: "Benchmark reproducible, flame graph o perfil equivalente y mejora medida sobre un servicio real.", sources: [
        { label: "OpenFING · catálogo de computación", url: "https://open.fing.edu.uy/courses/", note: "Cruzar Programación, SO, arquitectura y sistemas distribuidos.", lang: "ES" }
      ]},
      { name: "Calidad, mantenimiento y legado", focus: "QA, testing automático, migraciones, refactor, compatibilidad, observabilidad de errores, modernización y documentación técnica.", evidence: "Modernizar una aplicación heredada pequeña sin romper comportamiento, con caracterización, migración y rollback.", sources: [
        { label: "UOC · Ingeniería Informática", url: "https://github.com/HenestrosaDev/uoc-ingenieria-informatica", note: "PEC, prácticas y exámenes de asignaturas disponibles.", lang: "ES" }
      ]}
    ],
    gate: "Dos productos completos, una migración de legado y una defensa de arquitectura con pruebas, métricas, seguridad y operación."
  },
  {
    code: "T02", icon: "🛡", title: "Ciberseguridad, privacidad, DFIR y seguridad ofensiva ética", family: "Seguridad",
    duration: "900–1.300 h", prerequisites: "S0–S10 + redes/SO", goal: "Cubrir defensa, respuesta, seguridad de aplicaciones, nube, criptografía, forense y pruebas ofensivas exclusivamente en laboratorios autorizados.",
    units: [
      { name: "Fundamentos, blue team y SOC", focus: "CIA, riesgo, hardening, logging, SIEM, detección, threat intelligence, respuesta y gestión de incidentes.", evidence: "Mini-SOC local con logs, reglas, alertas, investigación y playbook de respuesta.", sources: [
        { label: "Cisco Networking Academy · Ciberseguridad", url: "https://www.netacad.com/catalogs/learn/cybersecurity", note: "Elegir cursos gratuitos/autodirigidos disponibles.", lang: "ES" },
        { label: "Microsoft Learn · Seguridad", url: "https://learn.microsoft.com/es-es/training/browse/?roles=security-engineer", note: "Rutas de identidad, seguridad, cumplimiento y nube.", lang: "ES" }
      ]},
      { name: "AppSec, web, API y supply chain", focus: "Threat modeling, OWASP, SAST/DAST, dependencias, secretos, SBOM conceptual, CI segura y revisión de código.", evidence: "Auditar una app deliberadamente vulnerable en local y corregir hallazgos con pruebas de regresión.", sources: [
        { label: "OWASP · recursos", url: "https://owasp.org/www-project-top-ten/", note: "Usar versiones traducidas cuando existan; practicar solo en sistemas propios o laboratorios.", lang: "ES/EN" }
      ]},
      { name: "Pentesting ético y adversary simulation", focus: "Reconocimiento autorizado, enumeración, validación de vulnerabilidades, reporte, remediación y purple team sin atacar terceros.", evidence: "Informe profesional de un laboratorio local/CTF con evidencia, severidad, causa y remediación.", sources: [
        { label: "Cisco · Ethical Hacker", url: "https://www.netacad.com/courses/ethical-hacker", note: "Usar modalidad gratuita cuando esté disponible; todo en entorno autorizado.", lang: "ES/EN" }
      ]},
      { name: "DFIR, malware y reversing seguro", focus: "Adquisición de evidencia, memoria/disco/red, timelines, análisis estático/dinámico de muestras inocuas y reversing de binarios de práctica.", evidence: "Caso forense sintético con cadena de custodia, timeline y conclusión reproducible.", sources: [
        { label: "OpenFING · Seguridad", url: "https://open.fing.edu.uy/courses/", note: "Buscar Seguridad Informática/Redes y material relacionado.", lang: "ES" }
      ]},
      { name: "Criptografía, identidad, privacidad y PQC", focus: "Primitivas, protocolos, PKI, IAM/PAM, Zero Trust, privacidad, PETs, gestión de claves y migración poscuántica conceptual.", evidence: "Diseño criptográfico de un servicio: amenazas, claves, rotación, autenticación, autorización y plan de agilidad criptográfica.", sources: [
        { label: "UTN · Criptografía/Ciberseguridad", url: "https://gitlab.com/briancol07/utn", note: "Carpetas Cryptografia y Ciberseguridad; usar como apuntes/práctica.", lang: "ES" }
      ]}
    ],
    gate: "Defender, detectar, investigar y corregir un entorno propio; toda práctica ofensiva queda limitada a laboratorios, CTF y autorización explícita."
  },
  {
    code: "T03", icon: "▥", title: "Datos, bases de datos, BI e ingeniería de datos", family: "Datos",
    duration: "850–1.200 h", prerequisites: "S0–S12", goal: "Dominar el ciclo completo: modelado, almacenamiento, pipelines, streaming, gobierno, analítica, BI y plataformas de datos.",
    units: [
      { name: "Internos de bases de datos", focus: "Álgebra relacional, transacciones, índices, planes, almacenamiento, concurrencia, recuperación y rendimiento.", evidence: "Benchmark de índices/planes y diagnóstico de una carga transaccional con informe.", sources: [
        { label: "FAMAF · Bases de Datos", url: "https://github.com/FAMAF-resources/3ro_2C-Bases_de_Datos-FAMAF", note: "Guías y evaluaciones.", lang: "ES" },
        { label: "UBA · Almacenamiento y Recuperación", url: "https://gitlab.com/valn/uba", note: "Carpeta homónima, teoría y material.", lang: "ES" }
      ]},
      { name: "Data engineering end-to-end", focus: "SQL, Python, modelado dimensional, calidad, ETL/ELT, orquestación, batch/streaming, Data Lake/Warehouse/Lakehouse y pruebas.", evidence: "Pipeline local end-to-end con ingestión, calidad, transformación, orquestación, catálogo mínimo y dashboard.", sources: [
        { label: "Caro Acosta · Ingeniería de Datos", url: "https://github.com/caroacostatovany/ingenieria-de-datos", note: "Ruta en español con ejercicios y proyectos; priorizar módulos marcados completos.", lang: "ES" }
      ]},
      { name: "Streaming, sistemas distribuidos y confiabilidad", focus: "Kafka conceptual/práctico, particiones, exactly/at-least-once, event time, ventanas, idempotencia, backfill y observabilidad.", evidence: "Pipeline de eventos local tolerante a reinicios con pruebas de duplicados y recuperación.", sources: [
        { label: "Microsoft Learn · ingeniería de datos", url: "https://learn.microsoft.com/es-es/training/browse/?roles=data-engineer", note: "Usar módulos gratuitos; sustituir servicios pagos por prácticas locales cuando sea posible.", lang: "ES" }
      ]},
      { name: "BI, analytics y decisión", focus: "Estadística aplicada, métricas, modelado semántico, DAX/Power BI conceptual, dashboards, storytelling y experimentación.", evidence: "Modelo estrella + dashboard con métricas auditables y documento de decisiones.", sources: [
        { label: "Microsoft Learn · Power BI", url: "https://learn.microsoft.com/es-es/training/powerplatform/power-bi", note: "Rutas oficiales gratuitas; practicar con herramientas disponibles sin comprar certificaciones.", lang: "ES" }
      ]},
      { name: "Gobierno, calidad, metadatos y privacidad", focus: "Lineage, catálogo, MDM, contratos de datos, calidad, retención, acceso, privacidad y DataOps.", evidence: "Diseño de gobierno para un dominio de datos con ownership, SLO de calidad, lineage y política de acceso.", sources: [
        { label: "Microsoft Learn · gobierno de datos", url: "https://learn.microsoft.com/es-es/training/browse/?terms=gobierno%20de%20datos", note: "Seleccionar módulos gratuitos y traducidos.", lang: "ES" }
      ]}
    ],
    gate: "Una plataforma de datos local reproducible con calidad, observabilidad, documentación, gobierno y una capa analítica defendida ante revisión."
  },
  {
    code: "T04", icon: "☁", title: "Cloud, DevOps, SRE, plataforma e infraestructura de Internet", family: "Infraestructura",
    duration: "800–1.150 h", prerequisites: "S0–S10", goal: "Operar sistemas confiables desde Linux y redes hasta contenedores, IaC, observabilidad, SRE, DNS/CDN/BGP conceptual y plataformas internas.",
    units: [
      { name: "Linux, virtualización, contenedores y Kubernetes", focus: "Namespaces/cgroups conceptuales, imágenes, redes, storage, scheduling, configuración, secretos y operación.", evidence: "Cluster local con app multi-servicio, ingress, storage, health checks, upgrades y rollback.", sources: [
        { label: "Cisco · Linux", url: "https://www.netacad.com/catalogs/learn/linux", note: "Elegir cursos gratuitos disponibles.", lang: "ES" },
        { label: "Microsoft Learn · contenedores", url: "https://learn.microsoft.com/es-es/training/browse/?terms=contenedores%20kubernetes", note: "Módulos gratuitos, practicar localmente.", lang: "ES" }
      ]},
      { name: "Infraestructura como código y CI/CD", focus: "GitOps conceptual, pipelines, artefactos, IaC, configuración, políticas, supply chain, entornos y promoción.", evidence: "Provisionamiento local/reproducible y pipeline con validaciones, despliegue y rollback.", sources: [
        { label: "Microsoft Learn · DevOps", url: "https://learn.microsoft.com/es-es/training/browse/?roles=devops-engineer", note: "Rutas gratuitas oficiales.", lang: "ES" }
      ]},
      { name: "SRE y observabilidad", focus: "SLI/SLO, error budget, métricas, logs, trazas, alertas, capacidad, incidentes, postmortems, chaos y DR.", evidence: "Game day con degradación, detección, recuperación, postmortem y acciones verificadas.", sources: [
        { label: "PabloRioseco · ITSM/observabilidad", url: "https://github.com/PabloRioseco/plan-estudio-ingenieria-software", note: "Fases de SLA/SLO/SLI, observabilidad e incidentes.", lang: "ES" }
      ]},
      { name: "Internet infrastructure", focus: "DNS, routing, BGP conceptual, CDN, peering, TLS, proxies, balanceadores, almacenamiento y resiliencia geográfica.", evidence: "Diseño de servicio global simulado con DNS, caché, failover, capacidad y modelo de amenazas.", sources: [
        { label: "OpenFING · Redes de Datos 2", url: "https://open.fing.edu.uy/courses/redes2/", note: "IPv6, routing, BGP, MPLS, QoS, SDN/NFV.", lang: "ES" }
      ]},
      { name: "Platform engineering y developer experience", focus: "Golden paths, catálogos de servicio, templates, self-service, políticas, seguridad y métricas de flujo.", evidence: "Portal/plataforma interna mínima que cree un servicio estandarizado con pipeline y observabilidad.", sources: [
        { label: "roadmap.sh · DevOps/Platform", url: "https://roadmap.sh/", note: "Usar como checklist de huecos, no como material principal.", lang: "EN→ES" }
      ]}
    ],
    gate: "Plataforma local reproducible con SLO, observabilidad, despliegue automatizado, rollback, DR probado y documentación operativa."
  },
  {
    code: "T05", icon: "◎", title: "Sistemas de información, ITSM, gobierno, auditoría y gestión tecnológica", family: "Sistemas/Negocio",
    duration: "650–900 h", prerequisites: "S0–S10", goal: "Cubrir la vertiente de Ingeniería de Sistemas/Sistemas de Información: procesos, arquitectura empresarial, servicios, auditoría, riesgo, producto, proyectos y transformación digital.",
    units: [
      { name: "Sistemas de información y procesos", focus: "Organización, procesos, requerimientos, BPM conceptual, datos maestros, integración y sistemas empresariales.", evidence: "Modelar un proceso real y diseñar su sistema de información con actores, datos, controles y métricas.", sources: [
        { label: "UOC · Ingeniería Informática", url: "https://github.com/HenestrosaDev/uoc-ingenieria-informatica", note: "Usar asignaturas de gestión, empresa, sistemas e ingeniería disponibles.", lang: "ES" }
      ]},
      { name: "ITSM y operación de servicios", focus: "Incidentes, problemas, cambios, configuración/CMDB, activos, catálogo, SLA/SLO/SLI y mejora continua.", evidence: "Implementar mesa de servicio demostrable con métricas, auditoría y postmortem.", sources: [
        { label: "PabloRioseco · plan SDM/ITSM", url: "https://github.com/PabloRioseco/plan-estudio-ingenieria-software", note: "Ruta práctica; las certificaciones comerciales no son obligatorias.", lang: "ES" }
      ]},
      { name: "Gobierno, riesgo, auditoría y cumplimiento", focus: "Controles, evidencia, segregación, riesgo tecnológico, GRC, continuidad, privacidad y auditoría de sistemas.", evidence: "Programa de auditoría con matriz riesgo-control-evidencia y plan de remediación.", sources: [
        { label: "UNED · guías de Ingeniería Informática", url: "https://www.uned.es/universidad/inicio/estudios/grados/grado-en-ingenieria-informatica.html", note: "Usar guías públicas para validar contenidos y bibliografía.", lang: "ES" }
      ]},
      { name: "Producto, proyectos y liderazgo técnico", focus: "Roadmaps, priorización, Agile, estimación, KPIs, finanzas básicas, contratos, comunicación y liderazgo.", evidence: "Dirigir un proyecto de 8–12 semanas con decisiones, riesgos, métricas, retrospectiva y demo.", sources: [
        { label: "Microsoft Learn · rutas profesionales", url: "https://learn.microsoft.com/es-es/training/career-paths/", note: "Complementar con módulos de administración y negocio.", lang: "ES" }
      ]},
      { name: "Arquitectura empresarial, ERP/CRM y automatización", focus: "Portafolio de aplicaciones, integración, ERP/CRM conceptual, low-code, RPA, datos y estrategia digital.", evidence: "Blueprint empresarial con capacidades, aplicaciones, integraciones, datos, riesgos y plan de transformación.", sources: [
        { label: "Microsoft Learn · Power Platform", url: "https://learn.microsoft.com/es-es/training/powerplatform/", note: "Usar módulos gratuitos; no comprar licencias para aprobar la ruta.", lang: "ES" }
      ]}
    ],
    gate: "Caso empresarial integral: proceso, arquitectura, ITSM, riesgos, controles, métricas, proyecto y defensa ante un comité simulado."
  },
  {
    code: "T06", icon: "✦", title: "IA, ML, modelos fundacionales, agentes y sistemas de IA", family: "IA",
    duration: "1.100–1.600 h", prerequisites: "S0–S14", goal: "Ir desde estadística/ML hasta deep learning, NLP, visión, LLM, RAG, agentes, evaluación, seguridad, MLOps e investigación aplicada.",
    units: [
      { name: "ML clásico y estadístico", focus: "Regresión, clasificación, árboles, ensembles, kernels, clustering, validación, causalidad conceptual, calibración y métricas.", evidence: "Estudio comparativo reproducible con baselines, CV, errores, incertidumbre y análisis de sesgo.", sources: [
        { label: "FIUBA CEIA · Introducción/ML", url: "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial", note: "intro_ia, probabilidad/estadística, análisis de datos y aprendizaje máquina.", lang: "ES" }
      ]},
      { name: "Deep learning, visión y NLP", focus: "Optimización, CNN, transformers, embeddings, sequence models, visión, NLP, multimodalidad y evaluación.", evidence: "Entrenar dos modelos pequeños y reproducibles: uno visual y otro de lenguaje, con ablations.", sources: [
        { label: "FIUBA CEIA · DL/NLP/Visión", url: "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial", note: "aprendizaje_profundo, procesamiento_lenguaje_natural y visión_computadora.", lang: "ES" }
      ]},
      { name: "LLM, RAG y agentes", focus: "Tokenización, atención, prompting, embeddings, retrieval, vector search, tool use, memoria, orquestación, agentes y evaluación.", evidence: "RAG local con citas + agente restringido con evaluación de tareas, costos/latencia y fallos conocidos.", sources: [
        { label: "Roadmap IA en español", url: "https://github.com/AndresF-GaleanoT/roadmap-ingeniero-ia-spanish", note: "Úsalo como catálogo español; filtra solo recursos gratuitos.", lang: "ES" }
      ]},
      { name: "MLOps e infraestructura de IA", focus: "Datos/versionado, experimentos, serving, inference, monitoring, drift, evaluación continua, GPU conceptual y optimización.", evidence: "Servicio local versionado con pruebas, monitoreo, rollback y evaluación continua.", sources: [
        { label: "Microsoft Learn · IA", url: "https://learn.microsoft.com/es-es/training/browse/?roles=ai-engineer", note: "Rutas oficiales gratuitas de IA y ML.", lang: "ES" }
      ]},
      { name: "Safety, security, gobernanza y frontera", focus: "Threats a modelos, prompt injection, privacidad, robustez, evals, interpretabilidad, alignment conceptual, políticas y auditoría.", evidence: "Red-team controlado de tu propio sistema de IA y tarjeta de modelo/sistema con mitigaciones y límites.", sources: [
        { label: "FIUBA CEIA · organización", url: "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial", note: "Revisar repositorios y ramas vigentes cada año.", lang: "ES" }
      ]}
    ],
    gate: "Sistema de IA completo y reproducible con baseline, evaluación, serving, monitoreo, seguridad, gobernanza y una réplica de investigación."
  },
  {
    code: "T07", icon: "⚙", title: "Robótica, IoT, control, automatización y sistemas ciberfísicos", family: "Robótica/IoT",
    duration: "900–1.300 h", prerequisites: "S0–S17", goal: "Integrar electrónica, control, firmware, comunicaciones, percepción, planificación y operación segura de sistemas físicos.",
    units: [
      { name: "Microcontroladores y firmware", focus: "C/C++, periféricos, interrupciones, buses, RTOS, drivers, energía, watchdog y actualización.", evidence: "Firmware simulado o en placa de bajo voltaje con telemetría, watchdog, pruebas y recuperación.", sources: [
        { label: "FAMAF · Microcontroladores", url: "https://github.com/FAMAF-resources/Optativa-Microcontroladores-FAMAF", note: "Material de la optativa.", lang: "ES" },
        { label: "OpenFING · Sistemas Embebidos", url: "https://open.fing.edu.uy/courses/sisem/", note: "Clases de tiempo real y embebidos.", lang: "ES" }
      ]},
      { name: "Control, señales y estimación", focus: "Sistemas dinámicos, muestreo, filtros, estabilidad, control realimentado y estimación de estado conceptual.", evidence: "Control simulado con ruido, saturación, retardo y análisis de estabilidad.", sources: [
        { label: "OpenFING · Sistemas y Control", url: "https://open.fing.edu.uy/courses/syc-2026/", note: "Teórico vigente.", lang: "ES" }
      ]},
      { name: "IoT, edge y digital twins", focus: "Sensores, MQTT/conceptos de mensajería, edge, flotas, OTA, seguridad, gemelo digital y observabilidad.", evidence: "Gemelo digital local de un dispositivo con fallos de conectividad y actualización segura.", sources: [
        { label: "OpenFING · Taller Sistemas Ciberfísicos", url: "https://open.fing.edu.uy/courses/tsc-f/", note: "Presentaciones y proyectos.", lang: "ES" },
        { label: "Cisco · IoT", url: "https://www.netacad.com/catalogs/learn/internet-of-things", note: "Elegir opciones gratuitas disponibles.", lang: "ES/EN" }
      ]},
      { name: "Robótica móvil, percepción y SLAM", focus: "Cinemática, sensores, percepción, localización, mapas, planificación, navegación y seguridad.", evidence: "Robot simulado que localice, planifique y se detenga en estado seguro ante fallos.", sources: [
        { label: "FIUBA · Visión por Computadora", url: "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/vision_computadora_I", note: "Percepción visual como base.", lang: "ES" }
      ]},
      { name: "Industrial, drones y autonomía", focus: "PLC/SCADA conceptual, industria 4.0/5.0, drones, vehículos, integración OT/IT, safety y cybersecurity.", evidence: "Arquitectura de celda/fábrica o dron simulado con separación safety/security y análisis de riesgos.", sources: [
        { label: "OpenFING · catálogo", url: "https://open.fing.edu.uy/courses/", note: "Cruzar control, ciberfísicos, robótica, redes y electrónica.", lang: "ES" }
      ]}
    ],
    gate: "Sistema físico simulado o de bajo voltaje con control, comunicaciones, telemetría, manejo de fallos, seguridad y evidencia reproducible."
  },
  {
    code: "T08", icon: "▦", title: "Hardware, arquitectura, FPGA/ASIC conceptual y HPC", family: "Hardware/HPC",
    duration: "900–1.300 h", prerequisites: "S0–S17", goal: "Comprender la pila desde lógica digital y microarquitectura hasta memoria, paralelismo, GPU, aceleradores y diseño/verificación de hardware.",
    units: [
      { name: "Lógica digital, RTL y verificación", focus: "Booleano, FSM, timing, HDL, testbenches, síntesis conceptual, CDC y verificación.", evidence: "CPU/periférico pequeño en simulador HDL con cobertura de pruebas documentada.", sources: [
        { label: "OpenFING · Diseño Lógico", url: "https://open.fing.edu.uy/courses/dl-2026/", note: "Teórico y práctico.", lang: "ES" }
      ]},
      { name: "Microarquitectura y sistemas de memoria", focus: "ISA, pipeline, hazards, cachés, MMU, coherencia, NUMA, storage y trade-offs energía/rendimiento.", evidence: "Simulador o estudio de microarquitectura con CPI, misses y sensibilidad a parámetros.", sources: [
        { label: "OpenFING · Arquitectura de Computadoras", url: "https://open.fing.edu.uy/courses/arqcomp/", note: "Teoría y laboratorios disponibles.", lang: "ES" },
        { label: "UBA · Arquitectura/Organización", url: "https://gitlab.com/valn/uba", note: "Carpetas de arquitectura y sistemas digitales.", lang: "ES" }
      ]},
      { name: "FPGA, SoC y ASIC conceptual", focus: "IP, buses, SoC, FPGA flow, verificación, PPA, ASIC/VLSI como teoría y herramientas abiertas cuando sea posible.", evidence: "Implementación FPGA simulada y reporte de recursos/timing; sin comprar hardware.", sources: [
        { label: "OpenFING · catálogo electrónica/computación", url: "https://open.fing.edu.uy/courses/", note: "Cruzar diseño lógico, arquitectura y electrónica.", lang: "ES" }
      ]},
      { name: "HPC y programación paralela", focus: "OpenMP, MPI, SIMD, GPU, CUDA conceptual, memory locality, profiling, escalabilidad y roofline conceptual.", evidence: "Paralelizar una carga científica y medir speedup, eficiencia, escalabilidad y cuello de botella.", sources: [
        { label: "OpenFING · HPC", url: "https://open.fing.edu.uy/courses/hpc/", note: "Computación de alta performance.", lang: "ES" },
        { label: "FAMAF · Computación Paralela", url: "https://github.com/FAMAF-resources/Optativa-Computacion_Paralela-FAMAF", note: "Material de optativa.", lang: "ES" }
      ]},
      { name: "Aceleradores de IA y arquitectura futura", focus: "GPU/NPU/TPU conceptual, dataflow, interconnect, memoria HBM conceptual, cuantización, sparsity y co-diseño HW/SW.", evidence: "Estudio comparativo de dos arquitecturas de acelerador con modelo de rendimiento y energía.", sources: [
        { label: "CS2023 · arquitectura y sistemas", url: "https://csed.acm.org/", note: "Validador internacional; traducir los apartados necesarios.", lang: "EN→ES" }
      ]}
    ],
    gate: "Diseño digital verificado + análisis de microarquitectura + cómputo paralelo medido + defensa de trade-offs de hardware/software."
  },
  {
    code: "T09", icon: "⌁", title: "Redes, telecomunicaciones, inalámbrico, 6G y espacio", family: "Redes/Telecom",
    duration: "850–1.250 h", prerequisites: "S0–S17", goal: "Cubrir desde LAN/WAN y protocolos Internet hasta radio, óptica, móvil, SDN/NFV, satélites y redes futuras.",
    units: [
      { name: "Routing, switching y automatización", focus: "Ethernet, VLAN, STP, IPv4/6, OSPF, BGP, QoS, VPN, automatización, observabilidad y troubleshooting.", evidence: "Red multi-sitio simulada con fallos, métricas y documentación de cambios.", sources: [
        { label: "Cisco Networking Academy", url: "https://www.netacad.com/catalogs/learn/networking", note: "Seleccionar rutas gratuitas/autodirigidas disponibles.", lang: "ES" },
        { label: "OpenFING · Redes de Datos", url: "https://open.fing.edu.uy/courses/", note: "Completar Redes 1/2 según disponibilidad.", lang: "ES" }
      ]},
      { name: "SDN, NFV, cloud networking e Internet", focus: "Control/data plane, overlays, VXLAN conceptual, service chaining, routing de Internet, DNS/CDN y seguridad.", evidence: "Diseño de red cloud/híbrida simulada con políticas, segmentación, redundancia y observabilidad.", sources: [
        { label: "OpenFING · Redes 2", url: "https://open.fing.edu.uy/courses/redes2/", note: "BGP, MPLS, QoS, SR, SDN/NFV.", lang: "ES" }
      ]},
      { name: "Señales, radio y antenas", focus: "Modulación conceptual, ruido, enlace, propagación, antenas, espectro, capacidad y codificación.", evidence: "Presupuesto de enlace + simulación de canal con BER o métrica equivalente.", sources: [
        { label: "OpenFING · Antenas y Propagación", url: "https://open.fing.edu.uy/courses/ayp/", note: "Clases disponibles.", lang: "ES" },
        { label: "OpenFING · Teoría de la Información", url: "https://open.fing.edu.uy/courses/iti/", note: "Fundamentos de información/codificación.", lang: "ES" }
      ]},
      { name: "Móvil, RAN y telecom de operador", focus: "2G–5G/5G-A conceptual, EPC/5GC, IMS, VoIP, RAN, QoE, OSS/BSS y virtualización.", evidence: "Arquitectura de operador simplificada con flujos, interfaces, métricas y fallos.", sources: [
        { label: "OpenFING · Tecnologías de Redes y Telecom", url: "https://open.fing.edu.uy/courses/trst/", note: "Clases de telecomunicaciones y redes.", lang: "ES" }
      ]},
      { name: "6G, NTN, satélites y redes espaciales", focus: "NTN, ISAC, THz/RIS conceptuales, satellite mesh, DTN e Internet interplanetaria como frontera investigadora.", evidence: "Survey técnico con taxonomía, métricas, limitaciones físicas y propuesta de experimento simulado.", sources: [
        { label: "OpenFING · catálogo reciente", url: "https://open.fing.edu.uy/courses/", note: "Usar para fundamentos; la frontera exigirá papers en inglés traducidos.", lang: "ES/EN" }
      ]}
    ],
    gate: "Red simulada operable + cálculo de enlace + arquitectura de operador + revisión crítica de una tecnología futura basada en literatura."
  },
  {
    code: "T10", icon: "◉", title: "HCI, UX, gráficos, videojuegos, XR y multimedia", family: "Interacción/Gráficos",
    duration: "750–1.050 h", prerequisites: "S0–S18", goal: "Diseñar interfaces accesibles y sistemas gráficos interactivos, desde UX y visualización hasta juegos, 3D, XR y multimedia.",
    units: [
      { name: "HCI, UX, accesibilidad y evaluación", focus: "Investigación de usuarios, interacción, información, prototipado, usabilidad, accesibilidad, ética y métricas.", evidence: "Estudio con usuarios o evaluación experta reproducible y rediseño justificado.", sources: [
        { label: "UNED · Usabilidad y Accesibilidad", url: "https://www.uned.es/universidad/facultades/departamentos/lenguajes-y-sistemas-informaticos/docencia.html", note: "Usar guía pública y bibliografía como validador.", lang: "ES" }
      ]},
      { name: "Gráficos y render", focus: "Transformaciones, cámara, raster, ray tracing conceptual, iluminación, materiales, shaders, color y rendimiento.", evidence: "Mini-renderer/demo con profiling y explicación matemática del pipeline.", sources: [
        { label: "OpenFING · Computación Gráfica Avanzada", url: "https://open.fing.edu.uy/courses/cga/", note: "Material disponible.", lang: "ES" }
      ]},
      { name: "Motores y videojuegos", focus: "Game loop, escenas, física, UI, audio, AI de juegos, networking, herramientas, pruebas y optimización.", evidence: "Juego 2D y prototipo 3D con build reproducible y telemetría local.", sources: [
        { label: "Godot · documentación en español", url: "https://docs.godotengine.org/es/stable/", note: "Primeros pasos, 2D, 3D, networking y profiling.", lang: "ES" }
      ]},
      { name: "3D, animación y pipeline de assets", focus: "Modelado, UV, materiales, rig, animación, cámara, render, LOD, optimización y exportación.", evidence: "Paquete de assets originales optimizados con pipeline documentado.", sources: [
        { label: "Blender · manual en español", url: "https://docs.blender.org/manual/es/latest/", note: "Recorrer modelado, materiales, rig/animación y render.", lang: "ES" }
      ]},
      { name: "XR, spatial computing y multimedia", focus: "OpenXR, interacción espacial, latencia, comodidad, accesibilidad, audio, captura y narrativa.", evidence: "Demo XR simulada o desktop 3D con evaluación de interacción y rendimiento.", sources: [
        { label: "Godot · XR", url: "https://docs.godotengine.org/es/stable/tutorials/xr/index.html", note: "OpenXR e interacción.", lang: "ES" }
      ]}
    ],
    gate: "Producto interactivo accesible con investigación de usuario, assets propios, rendimiento medido y documentación de diseño."
  },
  {
    code: "T11", icon: "🔬", title: "Computación científica e interdisciplinaria", family: "Ciencia aplicada",
    duration: "1.000–1.600 h por recorrido amplio", prerequisites: "S0–S19", goal: "Aplicar computación rigurosa a biología/salud, química/física, neurociencia, geoespacial/clima, economía/social, derecho, agricultura y otros dominios sin fingir dominio científico sin estudiar sus fundamentos.",
    units: [
      { name: "Bioinformática, genómica y salud", focus: "Secuencias, alineamiento, filogenética, pipelines, estadística, datos clínicos conceptuales, reproducibilidad y ética.", evidence: "Pipeline con datos públicos, procedencia, ambiente, parámetros y advertencias de interpretación.", sources: [
        { label: "UNAM · bioinformática", url: "https://www.ccg.unam.mx/~vinuesa/cursos.html", note: "Cursos y tutoriales en español.", lang: "ES" }
      ]},
      { name: "Física, química y materiales computacionales", focus: "Métodos numéricos, ODE/PDE, optimización, simulación, incertidumbre, unidades, molecular/materials informatics conceptual.", evidence: "Reproducir un modelo físico/químico y validar contra una solución o benchmark conocido.", sources: [
        { label: "OpenFING · matemáticas/modelado", url: "https://open.fing.edu.uy/courses/", note: "Cruzar métodos numéricos, ecuaciones, señales y modelado.", lang: "ES" }
      ]},
      { name: "Neurociencia, BCI y señales biomédicas", focus: "Señales, neurodatos, filtrado, features, ML, interfaces cerebro-computadora y neuroprivacidad conceptual.", evidence: "Análisis reproducible de dataset público de señales con protocolo de privacidad y límites.", sources: [
        { label: "OpenFING · Señales y Sistemas", url: "https://open.fing.edu.uy/courses/seys/", note: "Base matemática/señales; completar dominio con literatura especializada.", lang: "ES/EN" }
      ]},
      { name: "Geoespacial, clima y observación de la Tierra", focus: "GIS, raster/vector, proyecciones, remote sensing, spatial statistics, geospatial AI y datos climáticos.", evidence: "Proyecto geoespacial con fuentes abiertas, metadatos, mapa reproducible y análisis de incertidumbre.", sources: [
        { label: "FAMAF · imágenes satelitales con Python", url: "https://github.com/FAMAF-resources/Optativa-Procesamiento_de_Imagenes_Satelitales_Meteorologicas_con_Python-FAMAF", note: "Optativa aplicada.", lang: "ES" }
      ]},
      { name: "Economía, sociedad, derecho y sostenibilidad", focus: "Econometría/computational social science conceptual, legal informatics, ética, privacidad, green computing y evaluación de impacto.", evidence: "Estudio reproducible con hipótesis, sesgos, límites causales, ética y documentación pública.", sources: [
        { label: "UTN · economía/legislación", url: "https://gitlab.com/briancol07/utn", note: "Carpetas Economía y Legislación como apoyo; complementar con fuentes de cada dominio.", lang: "ES" }
      ]}
    ],
    gate: "Al menos dos dominios científicos con proyectos reproducibles y revisión de un especialista/fuente disciplinar; no confundir habilidad computacional con credencial clínica, legal o científica."
  },
  {
    code: "T12", icon: "∞", title: "Legado, métodos formales, cuántica y frontera futura", family: "Frontera/Investigación",
    duration: "1.000–1.800 h + aprendizaje continuo", prerequisites: "S0–S19", goal: "Conservar conocimiento histórico útil y entrar responsablemente en investigación: mainframe/legacy, PL/formal methods, quantum, neuromorphic/photonic/biological computing, green computing y futuras arquitecturas.",
    units: [
      { name: "Legado y evolución histórica", focus: "Mainframes, batch, COBOL/Fortran conceptual/práctico, Unix, C, compatibilidad, archivos, protocolos históricos y modernización.", evidence: "Ejecutar y modernizar un programa legado pequeño preservando tests y formato de datos.", sources: [
        { label: "OpenFING · Introducción a Computación", url: "https://open.fing.edu.uy/courses/introcomp-2026/", note: "Historia y contexto como punto de entrada.", lang: "ES" }
      ]},
      { name: "Lenguajes, compiladores y métodos formales", focus: "Semántica, tipos, parsing, IR, optimización, verificación, proof assistants conceptuales y model checking.", evidence: "Compilador/intérprete pequeño + especificación de propiedades de un componente.", sources: [
        { label: "FAMAF · Lenguajes y Compiladores", url: "https://github.com/FAMAF-resources/5to_1C-Lenguajes_y_Compiladores-FAMAF", note: "Material y ejercicios.", lang: "ES" },
        { label: "UBA · Lenguajes Formales/Computabilidad", url: "https://gitlab.com/valn/uba", note: "Teoría, guías y apuntes.", lang: "ES" }
      ]},
      { name: "Computación cuántica y seguridad poscuántica", focus: "Qubits, circuitos, algoritmos introductorios, error/noise conceptual, QKD/PQC y migración criptográfica.", evidence: "Circuitos simulados + análisis de algoritmo + plan de migración PQC para un sistema clásico.", sources: [
        { label: "FAMAF · Procesamiento Cuántico", url: "https://github.com/FAMAF-resources/Optativa-Procesamiento_Cuantico_de_la_Informacion-FAMAF", note: "Material de optativa.", lang: "ES" },
        { label: "Microsoft Learn · Azure Quantum", url: "https://learn.microsoft.com/es-es/azure/quantum/", note: "Documentación y aprendizaje; usar simulación gratuita/local cuando sea posible.", lang: "ES" }
      ]},
      { name: "Neuromorphic, photonic, in-memory y bio-computing", focus: "Modelos no von Neumann, SNN, event-based, fotónica, memristores, in-memory y DNA computing como literatura de frontera.", evidence: "Survey reproducible: taxonomía, madurez, métricas, benchmarks, limitaciones y experimento simulado pequeño.", sources: [
        { label: "CS2023 · referencia curricular", url: "https://csed.acm.org/", note: "Valida fundamentos; frontera se completa con papers actuales traducidos.", lang: "EN→ES" }
      ]},
      { name: "Método científico, reproducción y contribución", focus: "Búsqueda, revisión, hipótesis, preregistro conceptual, experimentos, ablations, estadística, amenazas a validez, escritura y open science.", evidence: "Reproducir dos trabajos y enviar una contribución útil a un proyecto abierto o un informe técnico revisable.", sources: [
        { label: "OpenFING · estudiar e investigar Computación", url: "https://open.fing.edu.uy/courses/introcomp-2026/", note: "Charlas de investigación y tendencias.", lang: "ES" }
      ]}
    ],
    gate: "Dos reproducciones independientes, una contribución pública y una defensa de qué es resultado establecido, qué es hipótesis y qué sigue siendo especulación."
  }
];

export type CareerFamily = { id: string; title: string; examples: string; core: string; tracks: string; note: string };

export const careerFamilies: CareerFamily[] = [
  { id: "cs", title: "Ciencias de la Computación y Computación", examples: "Computer Science, Ciencias Computacionales, Computación, teoría, algoritmos, PL, sistemas", core: "S0–S6 + S19", tracks: "T08, T12", note: "Profundidad matemática, algorítmica y de investigación." },
  { id: "is", title: "Ingeniería de Sistemas / Sistemas de Información / Informática Empresarial", examples: "Ing. Sistemas, Information Systems, MIS, Business Informatics, IT Management", core: "S0–S10", tracks: "T04, T05", note: "Integra tecnología, procesos, servicios, gobierno y negocio." },
  { id: "se", title: "Ingeniería y Desarrollo de Software", examples: "Software Engineer, Developer, web, full stack, móvil, platform, architect, QA", core: "S0–S10", tracks: "T01, T04", note: "Construcción y evolución de software en producción." },
  { id: "data", title: "Datos, BI, Analítica y Bases de Datos", examples: "Data Analyst, BI, DBA, Data Engineer, Analytics Engineer, Data Scientist", core: "S0–S13", tracks: "T03, T06", note: "De SQL e inferencia a plataformas de datos y ciencia de datos." },
  { id: "ai", title: "Inteligencia Artificial y Machine Learning", examples: "AI/ML/LLM/NLP/CV/MLOps/Agent Engineer, AI Research", core: "S0–S15", tracks: "T06, T12", note: "Matemática, modelos, sistemas de IA, evaluación y seguridad." },
  { id: "cyber", title: "Ciberseguridad y Privacidad", examples: "SOC, blue/red/purple team, pentest ético, DFIR, AppSec, IAM, crypto, GRC", core: "S0–S10 + S15", tracks: "T02, T04", note: "La práctica ofensiva se limita a entornos autorizados." },
  { id: "net", title: "Redes y Telecomunicaciones", examples: "Network/Telecom/RF/RAN/5G/6G/SDN/Satellite/Internet Engineer", core: "S0–S6 + S17", tracks: "T09, T04", note: "Protocolos, operación, radio, operador y redes futuras." },
  { id: "hw", title: "Hardware, Computadores y Embebidos", examples: "Computer Engineering, firmware, FPGA, RTL, SoC, embedded, HPC, GPU", core: "S0–S6 + S16–S17", tracks: "T08, T07", note: "Del circuito y lógica al acelerador y sistemas físicos." },
  { id: "robotics", title: "Robótica, IoT, Mecatrónica y Automatización", examples: "Robotics, IoT, CPS, PLC/SCADA, drones, autonomy, Industry 4.0/5.0", core: "S0–S17", tracks: "T07, T09", note: "Control, percepción, comunicaciones, tiempo real y seguridad." },
  { id: "cloud", title: "Cloud, DevOps, SRE e Infraestructura", examples: "Cloud, DevOps, SRE, Platform, Sysadmin, Datacenter, Internet Infrastructure", core: "S0–S10", tracks: "T04, T09", note: "Automatización, observabilidad, confiabilidad e infraestructura." },
  { id: "graphics", title: "HCI, Gráficos, Juegos, XR y Multimedia", examples: "UX/UI, HCI, graphics, rendering, game dev, VR/AR/XR, spatial computing", core: "S0–S10 + S18", tracks: "T10", note: "Interacción humana, accesibilidad y sistemas visuales." },
  { id: "science", title: "Computación Científica e Interdisciplinaria", examples: "Bioinformatics, health, neuro, chemistry, physics, GIS, climate, finance, legal/agri informatics", core: "S0–S19", tracks: "T11", note: "Cada dominio exige estudiar además su ciencia base." },
  { id: "research", title: "Investigación y Tecnologías Futuras", examples: "Quantum, formal methods, neuromorphic, photonic, green computing, future architectures, AGI safety", core: "S0–S19", tracks: "T12, T06, T08", note: "Separar siempre tecnología demostrada, investigación activa y especulación." },
  { id: "legacy", title: "Historia y Sistemas Legados", examples: "Mainframe, COBOL, Fortran, Unix, batch, operadores históricos, modernización", core: "S0–S6", tracks: "T12, T01", note: "Conservar contexto histórico y capacidad de migrar sistemas existentes." }
];
