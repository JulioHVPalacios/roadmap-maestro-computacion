import type { FacultyV43, SourceV43 } from "../v43/curriculum-v43"
import { facultiesV43, sourcePillarsV43 } from "../v43/curriculum-v43"

export type MaturityV44 = "Consolidado" | "Emergente" | "Experimental" | "Especulativo"
export type StandardV44 = {
  code: string
  title: string
  discipline: string
  year: string
  authority: string
  url: string
  coverage: string[]
  note: string
}

export type FacultyBlueprintV44 = {
  facultyId: string
  theory: string[]
  practice: string[]
  systems: string[]
  research: string[]
  capstone: string
  proof: string
}

export type FrontierV44 = {
  title: string
  maturity: MaturityV44
  domains: string[]
  rule: string
}

export type EngineV44 = {
  name: string
  role: string
  status: "Integrado" | "Base actual" | "Preparado para laboratorio" | "Evaluado"
  license: string
  why: string
  url: string
}

export const standardsV44: StandardV44[] = [
  { code:"CC2020", title:"Computing Curricula 2020", discipline:"Computing global", year:"2020", authority:"ACM / IEEE-CS / AIS", url:"https://www.acm.org/education/curricula-recommendations", coverage:["theory","software","systems","hardware","networks","security","data","enterprise"], note:"Marco transversal para distinguir disciplinas de computing." },
  { code:"CS2023", title:"Computer Science Curricula 2023", discipline:"Computer Science", year:"2023/2024", authority:"ACM / IEEE-CS / AAAI", url:"https://csed.acm.org/", coverage:["theory","software","systems","hardware","networks","data","science","ai","security","human"], note:"Núcleo principal de ciencias de la computación; dispone de versión en español." },
  { code:"CE2016", title:"Computer Engineering Curricula 2016", discipline:"Computer Engineering", year:"2016", authority:"ACM / IEEE-CS", url:"https://www.acm.org/education/curricula-recommendations", coverage:["theory","hardware","systems","robotics","networks","robotics"], note:"Arquitectura, hardware/software, diseño digital y sistemas embebidos." },
  { code:"SE2014", title:"Software Engineering 2014", discipline:"Software Engineering", year:"2014", authority:"ACM / IEEE-CS", url:"https://www.acm.org/education/curricula-recommendations", coverage:["software","systems","enterprise","human","security"], note:"Guía universitaria de grado para ingeniería de software." },
  { code:"SWEBOK4", title:"SWEBOK Guide V4", discipline:"Software Engineering", year:"2024/2025", authority:"IEEE Computer Society", url:"https://www.computer.org/education/bodies-of-knowledge/software-engineering", coverage:["software","systems","enterprise","security"], note:"Body of Knowledge profesional para auditar profundidad de ingeniería de software." },
  { code:"IT2017", title:"Information Technology Curricula 2017", discipline:"Information Technology", year:"2017", authority:"ACM / IEEE-CS", url:"https://www.acm.org/education/curricula-recommendations", coverage:["systems","networks","cloud","security","enterprise","software"], note:"Infraestructura, integración, administración, redes y servicios TI." },
  { code:"IS2020", title:"Information Systems 2020", discipline:"Information Systems", year:"2020", authority:"ACM / AIS", url:"https://www.acm.org/education/curricula-recommendations", coverage:["enterprise","data","software","human","security"], note:"Competencias para sistemas de información, organización, datos y transformación digital." },
  { code:"CSEC2017", title:"Cybersecurity Curricula 2017", discipline:"Cybersecurity", year:"2017", authority:"ACM / IEEE-CS / AIS / IFIP", url:"https://www.acm.org/education/curricula-recommendations", coverage:["security","systems","networks","software","hardware","enterprise"], note:"Marco curricular interdisciplinario de ciberseguridad." },
  { code:"NICE2.2", title:"NICE Framework Components 2.2.0", discipline:"Cybersecurity workforce", year:"2026", authority:"NIST", url:"https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions", coverage:["security","networks","cloud","enterprise","software","ai"], note:"Roles, competencias y Task/Knowledge/Skill; existe traducción al español del framework base." },
  { code:"CCDS2021", title:"Computing Competencies for Undergraduate Data Science", discipline:"Data Science", year:"2021", authority:"ACM", url:"https://www.acm.org/education/curricula-recommendations", coverage:["data","science","ai","theory"], note:"Competencias universitarias de ciencia de datos." },
  { code:"SEBoK", title:"Systems Engineering Body of Knowledge", discipline:"Systems Engineering", year:"living", authority:"INCOSE / IEEE Systems Council / Stevens", url:"https://sebokwiki.org/wiki/Guide_to_the_Systems_Engineering_Body_of_Knowledge_(SEBoK)", coverage:["systems","enterprise","hardware","robotics","cloud","security"], note:"Ciclo de vida, sistemas complejos, arquitectura e integración multidisciplinaria." },
  { code:"FING25", title:"Ingeniería en Computación · Plan 2025", discipline:"Ingeniería en Computación", year:"2025", authority:"Universidad de la República", url:"https://www.iie.fing.edu.uy/index.php/en/carrera/grado/ingenier%C3%ADa-en-computaci%C3%B3n", coverage:["theory","software","systems","hardware","networks","data","ai","enterprise"], note:"Referencia universitaria generalista en español." },
]

const B = (facultyId:string, theory:string[], practice:string[], systems:string[], research:string[], capstone:string, proof:string): FacultyBlueprintV44 => ({facultyId,theory,practice,systems,research,capstone,proof})

export const facultyBlueprintsV44: FacultyBlueprintV44[] = [
  B("theory", ["Matemática discreta y demostración","Cálculo, álgebra lineal y optimización","Probabilidad, estadística e inferencia","Autómatas, lenguajes formales y computabilidad","Complejidad, algoritmos y métodos formales"], ["Resolver problemas sin plantillas","Demostrar correctitud y cotas","Implementar estructuras y algoritmos desde cero","Usar theorem provers/model checking en ejercicios seleccionados"], ["Biblioteca de algoritmos instrumentada","Solvers y optimizadores","Mini lenguaje formal + intérprete"], ["Leer papers teóricos","Reproducir un resultado o benchmark"], "Defender un algoritmo/sistema con prueba, complejidad, experimentos y límites.", "No basta ejecutar: debe explicar por qué funciona y cuándo deja de hacerlo."),
  B("software", ["Paradigmas y lenguajes","Diseño, arquitectura y requisitos","Testing, calidad y verificación","Web, móvil, APIs y plataformas","Compiladores, runtimes y evolución"], ["Construir sin framework y con framework","TDD/property testing","Profiling, observabilidad y seguridad","Mantenimiento de código ajeno"], ["Producto full-stack","SDK/API versionada","Compiler/runtime mínimo","Aplicación móvil/PWA"], ["Arquitecturas modernas","Empirical software engineering"], "Producto mantenible operado en producción simulada, con SLO, seguridad, migración y documentación.", "Código + tests + ADR + métricas + revisión + defensa."),
  B("systems", ["SO, procesos y memoria","Concurrencia y sincronización","File/storage systems","Virtualización y contenedores","Distribuidos, consenso y tolerancia a fallos"], ["Syscalls y tracing","Schedulers/caches","Experimentos de concurrencia","Fallos inyectados y recuperación"], ["Kernel/OS educativo","KV distribuido","Filesystem o storage engine"], ["Papers clásicos y modernos de sistemas","Reproducción de resultados"], "Sistema distribuido operable bajo fallos deliberados.", "Debe sobrevivir pruebas de carga, particiones y análisis postmortem."),
  B("hardware", ["Lógica digital","Arquitectura ISA/microarquitectura","Memoria, buses e I/O","FPGA/ASIC/SoC","Firmware y co-diseño HW/SW"], ["HDL y simulación","Benchmark de caché/pipeline","Microcontroladores","FPGA cuando haya hardware disponible"], ["CPU educativa","SoC simulado","Firmware/boot mínimo"], ["Aceleradores y arquitectura","EDA, chiplets y memoria"], "Diseñar y validar un computador/SoC educativo con toolchain y firmware.", "Especificación + simulación + pruebas + trade-offs PPA/seguridad."),
  B("networks", ["Señales y comunicaciones básicas","Ethernet/IP/TCP/QUIC","Routing/BGP/DNS","Wireless/RF/5G/6G","SDN/NFV/CDN/satélite"], ["Packet capture","Configurar routing","Simulación de topologías","Medición de latencia/pérdida"], ["Red campus multi-segmento","Servicio DNS/CDN experimental","SDN lab"], ["Protocolos emergentes","NTN, 6G e Internet interplanetaria"], "Diseñar, automatizar, asegurar y observar una red compleja.", "Topología + configuración + pruebas + incidentes + capacidad."),
  B("cloud", ["Linux y automatización","Containers/Kubernetes","IaC y CI/CD","Observabilidad/SRE","Resiliencia, DR, FinOps y plataforma"], ["Deploy reproducible","Chaos testing","SLO/error budgets","Incident response"], ["Internal Developer Platform","Plataforma multi-servicio","DR automatizado"], ["Cloud-native systems","Autonomous operations"], "Operar una plataforma con SLO y recuperación probada.", "Infra as code + runbooks + métricas + postmortem."),
  B("data", ["Modelado relacional y transacciones","NoSQL y distribuidas","ETL/ELT y streaming","Warehouse/lakehouse","Gobierno, calidad, metadata y lineage"], ["SQL avanzado","Diseño de esquemas","Pipelines batch/stream","Data contracts"], ["Lakehouse pequeño","Pipeline CDC/streaming","Semantic/BI layer"], ["Data systems papers","Consistency and streaming"], "Plataforma de datos con calidad, lineage, seguridad y consumo analítico.", "Datos trazables + pruebas + SLA + costos + documentación."),
  B("science", ["Estadística e inferencia","Diseño experimental","Métodos numéricos","Simulación","Paralelismo, GPU y HPC"], ["Notebooks reproducibles","Experimentos controlados","Vectorización/paralelismo","Profiling científico"], ["Pipeline científico reproducible","Simulador","Benchmark CPU/GPU"], ["Reproducibility","Scientific computing/HPC"], "Replicar un resultado cuantitativo y justificar incertidumbre.", "Código + datos + seeds + análisis + limitaciones."),
  B("ai", ["ML clásico","Deep learning","NLP/visión/voz","Foundation models/LLM/agentes","MLOps, evaluación, seguridad y gobernanza"], ["Baselines primero","Training/evaluation","RAG/agentes con tests","Red teaming/evals"], ["Sistema ML end-to-end","RAG con evaluación","Agente con sandbox y observabilidad"], ["Replicar papers","Interpretabilidad, safety y robustness"], "Sistema de IA evaluado contra baseline, fallos y riesgos.", "Dataset card + model/system card + evals + costos + safety."),
  B("security", ["Fundamentos de seguridad","Criptografía aplicada","AppSec/cloud/network security","DFIR/reversing","IAM/privacy/GRC"], ["Labs sólo éticos y autorizados","Threat modeling","Hardening","Forensics/recovery"], ["SOC lab","Secure SDLC","PKI/IAM","DFIR case"], ["PQC","AI security","Hardware/OT security"], "Defender y auditar un sistema completo en entorno controlado.", "Threat model + detecciones + evidencias + remediación + informe."),
  B("human", ["HCI y factores humanos","UX research y diseño de interacción","Accesibilidad","Gráficos/visualización/juegos","XR y spatial computing"], ["Usability testing","A11y audit","Prototipado","Rendering/performance perceptual"], ["Design system accesible","Visual analytics","XR/game prototype"], ["Human-AI interaction","Spatial interfaces"], "Producto usable, accesible y medido con usuarios/heurísticas.", "Evidencia de investigación + accesibilidad + performance + iteración."),
  B("robotics", ["MCU/RTOS e IoT","Sensores, buses y embedded Linux","Control, cinemática y dinámica","Percepción/SLAM/sensor fusion","Planning, autonomía y multi-robot"], ["Firmware y timing","Simulación robótica","Control loops","Protocol debugging","Safety cases"], ["Nodo IoT seguro","Robot simulado autónomo","Edge/TinyML device","Fleet planner"], ["Embodied AI","Cyber-physical systems","Robot foundation models"], "Sistema ciberfísico autónomo medido, seguro y reproducible.", "Timing + telemetría + safety + fallos + explicación de decisiones."),
  B("enterprise", ["Sistemas de información","Arquitectura empresarial","ITSM/gobierno/auditoría","Producto/proyectos","Economía y transformación digital"], ["Modelar procesos","Service management","Risk/control mapping","Portfolio decisions"], ["ERP/CRM integration blueprint","ITSM service","Enterprise architecture"], ["Socio-technical systems","Digital transformation"], "Transformación socio-técnica defendida con valor, riesgo y operación.", "Business case + architecture + controls + metrics."),
  B("biohealth", ["Bioinformática y biología computacional","Genómica/proteómica","Informática médica y clínica","Neuroinformática/BCI","Privacidad, validación y software científico"], ["Pipelines bioinformáticos","Análisis de datos clínicos anonimizados","Procesamiento de señales neurales","Reproducibilidad"], ["Pipeline ómico","Sistema de health data","BCI/neuro simulation"], ["Open science biomédica","Medical AI validation"], "Proyecto bio/health reproducible con trazabilidad y límites clínicos explícitos.", "Código + datos permitidos + validación + incertidumbre + ética."),
  B("earth", ["GIS y geoinformática","Remote sensing","Climate/environmental data science","Agritech y precision agriculture","Computational sustainability"], ["Raster/vector workflows","Earth observation","Spatial statistics","IoT agrícola"], ["Geo data platform","Climate analysis","Precision-agriculture prototype"], ["Earth observation AI","Climate informatics"], "Sistema geoespacial/ambiental reproducible con datos abiertos.", "Proyección + provenance + incertidumbre + reproducibilidad."),
  B("finance", ["FinTech y sistemas financieros","Computational finance","Blockchain/DLT","Criptografía aplicada a pagos","Risk/market data systems"], ["Backtesting sin look-ahead","Payment flows","Smart-contract labs controlados","Low-latency profiling"], ["Trading simulator","Payment platform","DLT prototype"], ["Market microstructure","Cryptoeconomic systems"], "Sistema financiero simulado auditado por riesgo, seguridad y reproducibilidad.", "No confundir backtest con rentabilidad futura; declarar supuestos y riesgos."),
  B("mission", ["Safety-critical systems","Avionics/space/automotive/industrial computing","C4ISR y secure communications","Digital twins y mission software","Reliability and assurance"], ["Fault injection","Safety analysis","Simulation/HIL cuando sea posible","Secure update"], ["Mission simulator","Industrial/vehicle digital twin","Ground/space network model"], ["Space systems","Autonomous mission assurance"], "Sistema crítico simulado con safety case, cybersecurity y recuperación.", "Hazards + requirements + verification + traceability + fail-safe."),
  B("frontier", ["Quantum information y quantum-classical","Neuromorphic/in-memory","Photonic/optical y post-CMOS","6G/space/interplanetary networking","AGI/safety como investigación crítica"], ["Simular antes de afirmar","Literature mapping","Benchmarks","Technology readiness assessment"], ["Frontier observatory","Quantum/PQC study","Prototype reproducible"], ["Papers recientes","Standards/watchlists","Research replication"], "Dossier de frontera actualizado con evidencia y nivel de madurez.", "Separar consolidado, emergente, experimental y especulativo; comparar con baselines."),
]

export const frontierV44: FrontierV44[] = [
  { title:"Cloud-native, agentes, foundation models y edge AI", maturity:"Consolidado", domains:["ai","cloud","software","robotics"], rule:"Aprender con documentación, benchmarks, operación y seguridad reales." },
  { title:"6G, AI-RAN, semantic communications y NTN", maturity:"Emergente", domains:["networks","frontier"], rule:"Usar estándares, papers y prototipos; diferenciar investigación de despliegue comercial." },
  { title:"Neuromórfica, in-memory, fotónica y nuevos aceleradores", maturity:"Experimental", domains:["hardware","frontier","ai"], rule:"Exigir simulación/benchmark y límites físicos; no presentar promesas como capacidades actuales." },
  { title:"Quantum networking, error correction y quantum-classical architectures", maturity:"Experimental", domains:["quantum","networks","frontier"], rule:"Comparar siempre con baseline clásico y declarar supuestos de hardware/ruido." },
  { title:"AGI, superinteligencia, conciencia artificial y civilización-scale systems", maturity:"Especulativo", domains:["frontier","ai","leadership"], rule:"Sólo como investigación crítica: papers, escenarios, seguridad, filosofía/ética y evidencia; nunca como hecho establecido." },
]

export const enginesV44: EngineV44[] = [
  { name:"React Flow", role:"Carretera académica dirigida, nodos, zoom y navegación", status:"Base actual", license:"MIT", why:"Control fino del roadmap pedagógico S0–S19 y ramas.", url:"https://reactflow.dev/" },
  { name:"ELK.js", role:"Layout automático del grafo de dependencias", status:"Base actual", license:"EPL-2.0", why:"Ordena grafos dirigidos sin perder la carretera artística principal.", url:"https://github.com/kieler/elkjs" },
  { name:"Sigma.js", role:"Universo WebGL de miles de profesiones y relaciones", status:"Integrado", license:"MIT", why:"Está diseñado para visualizar miles de nodos/edges de forma interactiva.", url:"https://www.sigmajs.org/" },
  { name:"Graphology", role:"Modelo y algoritmos del universo de conocimiento", status:"Integrado", license:"MIT", why:"Estructura robusta para el grafo que renderiza Sigma.", url:"https://graphology.github.io/" },
  { name:"GSAP", role:"Movimiento de carretera, rover, foco y transiciones", status:"Base actual", license:"Proyecto actual", why:"Mantiene el lenguaje cinético aprobado del Campus.", url:"https://gsap.com/" },
  { name:"FSRS", role:"Repaso espaciado adaptativo", status:"Base actual", license:"MIT", why:"Programa repasos sin confundir memoria con dominio.", url:"https://github.com/open-spaced-repetition/ts-fsrs" },
  { name:"JupyterLite + Pyodide", role:"Notebooks/Python científicos dentro del navegador", status:"Preparado para laboratorio", license:"BSD/MPL", why:"Puede ejecutarse en hosting estático y almacenar trabajo en el navegador.", url:"https://jupyterlite.readthedocs.io/" },
  { name:"Sandpack", role:"Sandbox web/JS interactivo", status:"Preparado para laboratorio", license:"Apache-2.0", why:"Complemento para prácticas web sin servidor propio.", url:"https://sandpack.codesandbox.io/" },
  { name:"MSAGL.js", role:"Semantic zoom y browsing de grafos enormes", status:"Evaluado", license:"MIT", why:"Reservado para una futura vista de investigación a gran escala; Sigma es más simple y suficiente para 2.221 roles.", url:"https://microsoft.github.io/msagljs/" },
  { name:"cosmos.gl", role:"Force graphs GPU de escala masiva", status:"Evaluado", license:"MIT", why:"Excelente para cientos de miles de nodos; innecesario para el tamaño actual y menos orientado a currículo etiquetado.", url:"https://github.com/cosmosgl/graph" },
]

export const minimumCanonV44: SourceV43[] = [
  ...sourcePillarsV43.filter(s => [
    "OpenFING","FAMAF Resources","UNLP · archivo teórico-práctico","UBA · archivo de CC","UTN FRBA · Ingeniería en Sistemas","FIUBA Posgrado IA",
    "OSSU Computer Science","OSSU Math","OSSU Data Science","Full Stack Open","The Odin Project","freeCodeCamp","Microsoft Learn","Cisco Networking Academy"
  ].includes(s.name)),
  { name:"ACM Curricula Recommendations", kind:"Colección normativa", language:"EN→ES", role:"CE2016, CS2023, CSEC2017, CCDS2021, IS2020, IT2017, SE2014 y CC2020", url:"https://www.acm.org/education/curricula-recommendations", tier:"A" },
  { name:"CS2023", kind:"Currículo oficial", language:"ES/EN", role:"Núcleo moderno de Computer Science con versión en español", url:"https://csed.acm.org/", tier:"A" },
]

export const allSourcesV44: SourceV43[] = [
  ...sourcePillarsV43,
  { name:"ACM Curricula Recommendations", kind:"Colección normativa", language:"EN→ES", role:"CE/CS/CSEC/DS/IS/IT/SE/CC2020", url:"https://www.acm.org/education/curricula-recommendations", tier:"A" },
  { name:"JupyterLite", kind:"Laboratorio browser", language:"EN→ES", role:"Notebooks y kernels en hosting estático", url:"https://jupyterlite.readthedocs.io/", tier:"C" },
  { name:"Pyodide", kind:"Runtime browser", language:"EN→ES", role:"CPython/WASM para práctica científica sin backend", url:"https://pyodide.org/", tier:"C" },
  { name:"Sandpack", kind:"Sandbox de código", language:"EN→ES", role:"Laboratorios de web/JavaScript embebibles", url:"https://sandpack.codesandbox.io/", tier:"C" },
]

export const lawsV44 = [
  "No avanzar por tiempo sentado: avanzar por evidencia.",
  "Toda materia debe terminar en explicación, problema, construcción o experimento verificable.",
  "Toda especialización exige prerrequisitos del tronco común.",
  "Las fuentes oficiales definen cobertura; repositorios comunitarios aportan práctica, nunca sustituyen el estándar.",
  "El español es la interfaz principal; una fuente crítica en inglés se acompaña con guía de navegación/traducción, no se elimina por idioma.",
  "La frontera se etiqueta por madurez y se reaudita; no se enseña hype como conocimiento consolidado.",
  "La seguridad ofensiva se practica sólo en laboratorios propios/autorizados y con finalidad defensiva/educativa.",
  "El dominio requiere recordar, aplicar, operar, auditar, defender, investigar y contribuir.",
]

export function facultyByIdV44(id:string): FacultyV43 | undefined { return facultiesV43.find(f => f.id === id) }
