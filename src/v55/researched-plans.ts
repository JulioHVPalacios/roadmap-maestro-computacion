// Guías originales del Campus y referencias externas; no se copian cursos ni soluciones.
import type { CourseCollection } from "./types"

export const researchedCollection: CourseCollection = {
  "sources": [
    {
      "id": "sci-calc1",
      "label": "OpenStax · Cálculo volumen 1",
      "url": "https://openstax.org/books/c%C3%A1lculo-volumen-1/pages/1-introduccion",
      "language": "es",
      "kind": "Libro con ejercicios",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Se inspeccionó el capítulo inicial y una clave de respuestas. Funciones, límites y cálculo diferencial. Enlazar al original; no copiar al Campus: condiciones actuales de reutilización y uso en ofertas de IA requieren revisión."
    },
    {
      "id": "sci-calc2",
      "label": "OpenStax · Cálculo volumen 2",
      "url": "https://openstax.org/books/c%C3%A1lculo-volumen-2/pages/1-introduccion",
      "language": "es",
      "kind": "Libro con ejercicios",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Se verificaron secciones de integral definida, teorema fundamental y sustitución; existe clave de respuestas seleccionadas. Solo enlazar al original."
    },
    {
      "id": "sci-calc3",
      "label": "OpenStax · Cálculo volumen 3",
      "url": "https://openstax.org/books/c%C3%A1lculo-volumen-3/pages/1-introduccion",
      "language": "es",
      "kind": "Libro con ejercicios",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Se verificó introducción a curvas paramétricas y coordenadas polares; el libro continúa con cálculo multivariable. Solo enlazar al original."
    },
    {
      "id": "sci-stats",
      "label": "OpenStax · Introducción a la estadística",
      "url": "https://openstax.org/books/introducci%C3%B3n-estad%C3%ADstica/pages/1-introduccion",
      "language": "es",
      "kind": "Libro con ejercicios",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Se inspeccionaron muestreo/datos y página de soluciones. No cubre por sí solo estadística multivariante avanzada. Solo enlazar al original."
    },
    {
      "id": "sci-discreta",
      "label": "FIng/CETP · Matemática Discreta y Lógica 1, materiales",
      "url": "https://www.fing.edu.uy/tecnoinf/maldonado/cursos/mdl1/material.htm",
      "language": "es",
      "kind": "Apuntes, prácticos y exámenes",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Contiene teoría de conjuntos, relaciones, inducción, lógica, prácticos y exámenes con soluciones seleccionadas. Ediciones 2007–2017: los fundamentos son útiles; revisar correspondencia con la asignatura actual."
    },
    {
      "id": "sci-fing",
      "label": "OpenFING · Cursos",
      "url": "https://open.fing.edu.uy/courses/",
      "language": "es",
      "kind": "Clases universitarias grabadas",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Catálogo inspeccionado con cálculo, álgebra, física, métodos numéricos, algoritmos, lógica y otras áreas. Seleccionar el curso indicado por la materia; el catálogo no prueba cobertura completa de cada tema ni acceso a todos sus prácticos."
    },
    {
      "id": "sci-python",
      "label": "Python · Tutorial oficial",
      "url": "https://docs.python.org/es/3/tutorial/",
      "language": "mixto",
      "kind": "Tutorial y referencia",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Portal español con fragmentos actuales en inglés. Declara que presupone conceptos previos de programación: usar después de una introducción, no como único primer curso desde cero."
    },
    {
      "id": "sci-fiuba-math",
      "label": "FIUBA · Análisis Matemático para IA",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/analisis_matematico",
      "language": "mixto",
      "kind": "Clases, guías, notebooks y trabajo final",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "README y directorios clases/guias/tp_final verificados mediante la API pública. Material principal español; bibliografía, herramientas y parte del código pueden estar en inglés. No implica matrícula gratuita en el posgrado."
    },
    {
      "id": "sci-fiuba-prob",
      "label": "FIUBA · Probabilidad y Estadística",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA_ProbayEstadistica",
      "language": "mixto",
      "kind": "Clases y notebooks",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Se verificaron clases, curso de nivelación y notebook introductorio de Python aplicado a probabilidad. Se requiere comprobar edición y consignas; no se verificó solucionario integral."
    },
    {
      "id": "sci-fiuba-ai",
      "label": "FIUBA · Introducción a IA",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/intro_ia",
      "language": "mixto",
      "kind": "Clases, ejercicios y notebooks",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "README verificado: organización por teoría/ejercicios/notebooks y temas de búsqueda, regresión, clasificación y refuerzo. No garantiza todo el audio o bibliografía en español."
    },
    {
      "id": "sci-fiuba-ml",
      "label": "FIUBA · Aprendizaje de Máquina I",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/aprendizaje_maquina_I",
      "language": "mixto",
      "kind": "Clases, ejemplos y trabajo práctico",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Se verificaron ocho carpetas de clase y PrimerTp; el README tiene poca descripción. Usar como apoyo práctico de ML inicial, no atribuir automáticamente contenidos avanzados no inspeccionados."
    },
    {
      "id": "sci-fiuba-dl",
      "label": "FIUBA · Deep Learning",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/aprendizaje_profundo",
      "language": "mixto",
      "kind": "Presentaciones, ejercicios y notebooks",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "README actual Deep Learning 2025–2026; clases1–8 y Ejercicios.md; requiere Python, bibliotecas y PyTorch. Experimentos pequeños pueden hacerse localmente; entrenamiento grande puede requerir GPU de pago."
    },
    {
      "id": "sci-fiuba-cv",
      "label": "FIUBA · Visión por Computadora I",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/vision_computadora_I",
      "language": "mixto",
      "kind": "Código, diapositivas y trabajos prácticos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "README verificado con filtros, características, homografía, segmentación, seguimiento, estéreo y calibración. No sustituye toda la visión profunda o investigación3D."
    },
    {
      "id": "sci-fiuba-nlp",
      "label": "FIUBA · Procesamiento del Lenguaje Natural",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/procesamiento_lenguaje_natural",
      "language": "mixto",
      "kind": "Clases y desafíos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "README incluye vectorización, preprocesamiento, recuperación, embeddings y redes recurrentes. El árbol actual expone Clase1 y Desafíos; comprobar disponibilidad del material de cada clase antes de planificarlo."
    },
    {
      "id": "sci-fiuba-ops",
      "label": "FIUBA · Operaciones de Aprendizaje Automático I",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/aprendizaje_maquina_II",
      "language": "mixto",
      "kind": "Clases, hands-on y criterios de aprobación",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Corrección semántica: pese al nombre de URL aprendizaje_maquina_II, el README actual se titula Operaciones de Aprendizaje Automático I y trata MLOps/MLflow/software escalable. No usar como prueba de cobertura de MLII teórico."
    },
    {
      "id": "sci-fiuba-llm",
      "label": "FIUBA · Modelos de lenguaje e IA generativa",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/CEIA-LLMIAG",
      "language": "mixto",
      "kind": "Clases y prácticas",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "README verificado: Transformers, decoder, evaluación, costes, MoE, modelos locales, RAG, agentes y fine-tuning. APIs externas y hardware pueden costar; escoger alternativas locales pequeñas."
    },
    {
      "id": "sci-fiuba-llmops",
      "label": "FIUBA · MLOps III / LLMOps",
      "url": "https://github.com/FIUBA-Posgrado-Inteligencia-Artificial/MLOps3",
      "language": "mixto",
      "kind": "Código, diapositivas y tareas",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "README contiene ocho clases con código/slides y Tareas: entornos, fine-tuning, alineación y destilación. La escala de las prácticas determina el coste de cómputo."
    },
    {
      "id": "sci-scipy",
      "label": "SciPy · Guía oficial de usuario",
      "url": "https://docs.scipy.org/doc/scipy/tutorial/",
      "language": "en",
      "kind": "Documentación con ejemplos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Se inspeccionaron secciones de integración, álgebra lineal, optimización, FFT, señales, estadística y grafos. Es referencia técnica con ejemplos, no curso de demostraciones matemáticas."
    },
    {
      "id": "sci-biopython",
      "label": "Biopython · Tutorial & Cookbook",
      "url": "https://biopython.org/docs/latest/Tutorial/index.html",
      "language": "en",
      "kind": "Tutorial con ejemplos de código",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Índice verificado: secuencias, alineamientos, BLAST, Entrez, Swiss-Prot, PDB, filogenia y motivos. No enseña toda la biología ni valida conclusiones clínicas."
    },
    {
      "id": "sci-galaxy",
      "label": "Galaxy Training · Basics for genomics",
      "url": "https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-101/tutorial.html",
      "language": "en",
      "kind": "Tutorial práctico con datos, workflows y respuestas",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Tutorial inspeccionado con datasets, workflow, historial de respuesta y pasos reproducibles. Requiere cuenta para guardar trabajo en instancia pública; capacidad y colas no son ilimitadas. Resultados dependen de versión de herramientas y datos."
    },
    {
      "id": "sci-ebi",
      "label": "EMBL-EBI · A journey through bioinformatics",
      "url": "https://www.ebi.ac.uk/training/online/courses/a-journey-through-bioinformatics/",
      "language": "en",
      "kind": "Tutorial introductorio con actividades",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Curso de una hora revisado en2025; desafíos con bases de datos y enlaces a presentación con pistas/respuestas. No es una carrera de bioinformática ni curso completo de genómica."
    },
    {
      "id": "sci-quantum-basic",
      "label": "IBM · Basics of quantum information",
      "url": "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information",
      "language": "en",
      "kind": "Curso de fundamentos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "URL oficial redirige a edición /en/. Trata sistemas simples/compuestos, circuitos y entrelazamiento; recomienda álgebra lineal y complejos. Cuenta/examen de insignia se gestionan aparte; no se garantiza hardware gratuito."
    },
    {
      "id": "sci-quantum-algo",
      "label": "IBM · Fundamentals of quantum algorithms",
      "url": "https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms",
      "language": "en",
      "kind": "Curso teórico",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página de overview verificada desde enlace oficial de la serie. Profundiza en algoritmos; no demuestra ventaja práctica universal ni reemplaza prerrequisitos de complejidad."
    },
    {
      "id": "sci-quantum-general",
      "label": "IBM · General formulation of quantum information",
      "url": "https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information",
      "language": "en",
      "kind": "Curso teórico",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Tercer curso de la serie oficial, overview verificado. Apoya estados y operaciones generales; no es formación de laboratorio de hardware cuántico."
    },
    {
      "id": "sci-quantum-qec",
      "label": "IBM · Foundations of quantum error correction",
      "url": "https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction",
      "language": "en",
      "kind": "Curso teórico",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Cuarto curso oficial; overview verificado. Sirve para corrección de errores y preparación de tolerancia a fallos, no ingeniería experimental completa."
    },
    {
      "id": "sci-fhir",
      "label": "HL7 · FHIR Overview y especificación R5",
      "url": "https://hl7.org/fhir/overview.html",
      "language": "en",
      "kind": "Especificación y ejemplos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página R5 verificada: recursos, perfiles, tipos, conformidad, privacidad y módulos clínicos. Referencia de interoperabilidad; no formación clínica. Usar solo datos sintéticos en ejercicios."
    },
    {
      "id": "sci-nist-pqc",
      "label": "NIST · Criptografía poscuántica",
      "url": "https://csrc.nist.gov/projects/post-quantum-cryptography",
      "language": "en",
      "kind": "Estándares y documentación",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página actual verificada: ML-KEM, ML-DSA y SLH-DSA, además de migración. No confundir criptografía poscuántica clásica con distribución cuántica de claves; consultar estándares vigentes antes de implementaciones reales."
    },
    {
      "id": "sci-csharp",
      "label": "Microsoft · Documentación de C#",
      "url": "https://learn.microsoft.com/es-es/dotnet/csharp/tour-of-csharp/",
      "language": "es",
      "kind": "Tutoriales y referencia",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página oficial inspeccionada con rutas de introducción y fundamentos de tipos, objetos, excepciones, LINQ y asincronía. Material gratuito; no garantiza examen ni servicios cloud gratuitos."
    },
    {
      "id": "sci-cpp",
      "label": "Microsoft · C++ moderno",
      "url": "https://learn.microsoft.com/es-es/cpp/cpp/welcome-back-to-cpp-modern-cpp?view=msvc-170",
      "language": "es",
      "kind": "Artículo y documentación",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Resultado oficial consultado confirma orientación a C++ moderno y selección de estándar. Es referencia de lenguaje, no curso completo de C++ ni entrenamiento para todos los compiladores."
    },
    {
      "id": "sci-go",
      "label": "Go · Tutorial inicial",
      "url": "https://go.dev/doc/tutorial/getting-started",
      "language": "en",
      "kind": "Tutorial oficial",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página inspeccionada: instalación, módulo, primer programa y paquetes; supone experiencia básica de programación. Complementar con tutoriales y biblioteca estándar enlazados; no cubre por sí sola sistemas distribuidos."
    },
    {
      "id": "sci-rust",
      "label": "Rust · The Rust Programming Language",
      "url": "https://doc.rust-lang.org/book/",
      "language": "en",
      "kind": "Libro oficial",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página oficial verificada, edición2024 y enlace a traducciones comunitarias. Ejemplos y proyectos; no garantiza todas las traducciones al día. Herramientas locales gratuitas."
    },
    {
      "id": "sci-java",
      "label": "Java · Tutoriales oficiales actuales",
      "url": "https://dev.java/learn/",
      "language": "en",
      "kind": "Tutoriales oficiales",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Portal oficial encontrado como destino recomendado por los tutoriales Oracle. El tutorial Oracle anterior está escrito para JDK8 y advierte de características obsoletas: usar dev.java para material vigente."
    },
    {
      "id": "sci-cs50",
      "label": "Harvard · CS50x, semana C",
      "url": "https://cs50.harvard.edu/x/weeks/1/",
      "language": "mixto",
      "kind": "Clase, notas y ejercicios",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página oficial verificada con opción Spanish; ejercicios, documentación y entorno pueden estar en inglés. Es introducción a C, no curso exhaustivo de programación de sistemas."
    },
    {
      "id": "sci-prolog",
      "label": "SWI-Prolog · Get Started",
      "url": "https://www.swi-prolog.org/GetStarted.md",
      "language": "en",
      "kind": "Tutorial y documentación",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página oficial verificada con instalación y referencia a SWISH en línea. El material no sustituye curso completo de lógica y semántica."
    },
    {
      "id": "sci-cs103",
      "label": "Stanford · CS103 Mathematical Foundations of Computing",
      "url": "https://web.stanford.edu/class/cs103/",
      "language": "en",
      "kind": "Curso con materiales",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página oficial actual verificada: lógica, pruebas, estructuras discretas, computabilidad y complejidad. Revisar materiales publicados por edición; no implica acceso a tutoría o evaluación institucional."
    },
    {
      "id": "sci-lean",
      "label": "Lean · Theorem Proving in Lean4",
      "url": "https://lean-lang.org/theorem_proving_in_lean4/",
      "language": "en",
      "kind": "Libro y ejemplos ejecutables",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Índice inspeccionado: proposiciones, cuantificadores, tácticas, inducción y axiomas. Requiere lógica previa; comprobar versión de Lean."
    },
    {
      "id": "sci-tla",
      "label": "Leslie Lamport · TLA+ Video Course",
      "url": "https://lamport.azurewebsites.net/video/videos.html",
      "language": "en",
      "kind": "Curso del creador de TLA+",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página inspeccionada: vídeos y guiones; presupone programación y matemática elemental. Edición2021, comprobar herramientas vigentes."
    },
    {
      "id": "sci-llvm",
      "label": "LLVM · My First Language Frontend",
      "url": "https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/index.html",
      "language": "en",
      "kind": "Tutorial con código",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Índice inspeccionado: lexer, parser, AST, IR, JIT, optimización y código objeto. No incluye por sí solo toda la teoría de compiladores; requiere C++ y revisar API de la versión."
    },
    {
      "id": "sci-cuda",
      "label": "NVIDIA · CUDA Programming Guide",
      "url": "https://docs.nvidia.com/cuda/cuda-programming-guide/index.html",
      "language": "en",
      "kind": "Documentación con ejemplos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Índice oficial inspeccionado: modelo, kernels, memoria y asincronía. Material gratuito; ejecutar CUDA exige GPU compatible o servicio cuyo acceso puede costar."
    },
    {
      "id": "sci-octave",
      "label": "GNU Octave · Manual",
      "url": "https://docs.octave.org/latest/",
      "language": "en",
      "kind": "Manual con ejemplos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Índice oficial inspeccionado: matrices, sistemas lineales, EDO, gráficos y referencia. Octave es alternativa local libre; no garantiza compatibilidad total con MATLAB o sus toolboxes."
    },
    {
      "id": "sci-ehu-concurrent",
      "label": "UPV/EHU · Programación concurrente en Linux",
      "url": "https://ocw.ehu.eus/course/view.php?id=399",
      "language": "es",
      "kind": "Curso con código y autoevaluación",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Curso2016 verificado en la investigación compartida: código, plantillas, tests y soluciones. Revisar compatibilidad de API y prácticas con sistemas actuales."
    },
    {
      "id": "sci-postgres",
      "label": "PostgreSQL · Tutorial oficial",
      "url": "https://www.postgresql.org/docs/current/tutorial.html",
      "language": "en",
      "kind": "Tutorial práctico y manual",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página inspeccionada: conceptos relacionales y SQL, con continuidad a lenguaje, administración y desarrollo. Se puede practicar localmente; el propio tutorial declara no ser exhaustivo."
    },
    {
      "id": "sci-mongo",
      "label": "MongoDB · Tutoriales del manual",
      "url": "https://www.mongodb.com/docs/manual/tutorial/",
      "language": "en",
      "kind": "Tutoriales y referencia",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Índice verificado: instalación Community, réplicas, administración y otras operaciones. No exigir Atlas o suscripciones para una práctica local; condiciones de software y servicios deben comprobarse por separado."
    },
    {
      "id": "sci-spark",
      "label": "Apache Spark · Guías",
      "url": "https://spark.apache.org/docs/latest/",
      "language": "en",
      "kind": "Guías y ejemplos ejecutables",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Índice inspeccionado: DataFrames/SQL, streaming estructurado, MLlib, GraphX y despliegue. Práctica local pequeña posible; clúster a escala no está incluido."
    },
    {
      "id": "sci-airflow",
      "label": "Apache Airflow · Tutoriales",
      "url": "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html",
      "language": "en",
      "kind": "Tutoriales con workflows",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página inspeccionada con Airflow101, TaskFlow y pipeline de datos. La guía presupone instalación; no implica servicio administrado gratuito."
    },
    {
      "id": "sci-sklearn",
      "label": "scikit-learn · Errores comunes y prácticas recomendadas",
      "url": "https://scikit-learn.org/stable/common_pitfalls.html",
      "language": "en",
      "kind": "Guía con ejemplos y manual",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página inspeccionada con referencias a modelos, validación y preprocesamiento. Es apoyo específico para evitar fuga y errores de evaluación, no curso completo de teoría de ML."
    },
    {
      "id": "sci-powerbi",
      "label": "Microsoft Learn · PowerBI",
      "url": "https://learn.microsoft.com/es-es/training/powerplatform/power-bi",
      "language": "es",
      "kind": "Rutas de aprendizaje y documentación",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Portal oficial inspeccionado con conexión, limpieza, modelado y visualización. El material es gratuito; compartir contenido, servicios o capacidades pueden requerir licencias y se revisan aparte."
    },
    {
      "id": "sci-causal",
      "label": "PyWhy/DoWhy · Ejemplo de efecto causal",
      "url": "https://www.pywhy.org/dowhy/main/example_notebooks/dowhy_simple_example.html",
      "language": "en",
      "kind": "Notebook con ejemplo y pruebas de refutación",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página inspeccionada: modelar, identificar, estimar y refutar con datos de ejemplo. El software no demuestra por sí solo que los supuestos causales se cumplan."
    },
    {
      "id": "sci-googleml",
      "label": "Google · Curso intensivo de aprendizaje automático",
      "url": "https://developers.google.com/machine-learning/crash-course?hl=es-419",
      "language": "mixto",
      "kind": "Curso con ejercicios",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Revisión compartida confirmó módulos de regresión, clasificación, datos, redes, embeddings y sistemas de producción. Textos españoles; comprobar idioma de audio/herramientas y requisitos de Python/matemática."
    },
    {
      "id": "sci-hf",
      "label": "Hugging Face · Curso PLN/Transformers",
      "url": "https://huggingface.co/learn/llm-course/es/chapter1/1",
      "language": "mixto",
      "kind": "Curso y ejemplos",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Revisión compartida confirmó curso gratuito, Python competente y deep learning previo. La edición española consultada no muestra todos los capítulos actuales; cómputo y APIs pueden costar."
    },
    {
      "id": "sci-biology",
      "label": "OpenStax · Biology2e",
      "url": "https://openstax.org/books/biology-2e/pages/1-introduction",
      "language": "en",
      "kind": "Libro con ejercicios",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Página oficial y estructura del libro verificadas; inglés. Enlazar al original, no incorporar textos, ejercicios o figuras al Campus sin revisar condiciones actuales de reutilización/IA."
    },
    {
      "id": "sci-epidemiology",
      "label": "CDC · Principles of Epidemiology, archivo",
      "url": "https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/index.html",
      "language": "en",
      "kind": "Libro de autoestudio con ejercicios y respuestas",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Archivo oficial inspeccionado: seis lecciones, ejercicios, autoevaluación y respuestas; texto2006 actualizado2011. No tiene educación continua vigente ni debe usarse como guía sanitaria actual."
    },
    {
      "id": "sci-dicom",
      "label": "DICOM/NEMA · Introduction and Overview",
      "url": "https://dicom.nema.org/medical/dicom/current/output/html/part01.html",
      "language": "en",
      "kind": "Especificación técnica",
      "access": "Lectura y materiales públicos; no incluye tutoría, acreditación ni recursos de cómputo ilimitados",
      "verificationNote": "Edición oficial2026d inspeccionada: modelo, conformidad, objetos, transferencia y referencia a seguridad. Lectura pública no equivale a competencia clínica ni certificación de un dispositivo."
    },
    {
      "id": "hw-circuitos",
      "label": "OpenFING · Teoría de Circuitos",
      "url": "https://open.fing.edu.uy/courses/teocirc/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases universitarias",
      "verificationNote": "Índice leído: mallas/nudos, Thévenin/Norton, fasores, Bode, Laplace y líneas; edición 2018. Vídeos no incluyen tutoría."
    },
    {
      "id": "hw-analogica",
      "label": "UNICAN · Electrónica, control e instrumentación: materiales",
      "url": "https://ocw.unican.es/course/section.php?id=1735",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Apuntes y prácticas",
      "verificationNote": "Página invitado leída: instrumental, diodos, MOS, amplificadores, control e instrumentación. No incluye laboratorio físico."
    },
    {
      "id": "hw-fpga",
      "label": "Obijuan · Electrónica digital con FPGA",
      "url": "https://github.com/Obijuan/digital-electronics-with-open-FPGAs-tutorial/wiki",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial original con ejercicios",
      "verificationNote": "Wiki inspeccionada: puertas, buses, combinacionales, biestables, temporizadores y serie. Material gratuito; placa y periféricos pueden costar. Verificar herramientas históricas."
    },
    {
      "id": "hw-kicad",
      "label": "KiCad · Getting Started 9.0",
      "url": "https://docs.kicad.org/9.0/es/getting_started_in_kicad/getting_started_in_kicad.html",
      "language": "mixto",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial oficial",
      "verificationNote": "Se leyó el tutorial: esquemático, ERC, PCB, DRC y fabricación. Aunque la URL es /es/, gran parte del contenido consultado aparece en inglés."
    },
    {
      "id": "hw-embebidos",
      "label": "OpenFING · Sistemas embebidos para tiempo real",
      "url": "https://open.fing.edu.uy/courses/sisem/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases universitarias",
      "verificationNote": "Índice leído: 17 clases de C, microcontroladores, interrupciones, periféricos, consumo, pruebas y RTOS; edición 2021."
    },
    {
      "id": "hw-control",
      "label": "OpenFING · Sistemas y Control",
      "url": "https://open.fing.edu.uy/courses/syc/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases universitarias",
      "verificationNote": "Se comprobó serie teórica y existencia de edición 2026. Requiere matemática y señales; no incluye supervisión de laboratorio."
    },
    {
      "id": "hw-arquitectura",
      "label": "FING · Arquitectura: teoría, prácticos y evaluaciones",
      "url": "https://www.fing.edu.uy/tecnoinf/mvd/cursos/arqcomp/material.htm",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Material universitario",
      "verificationNote": "Página leída: numeración, representación, Boole, CPU, E/S, interrupciones, memoria, prácticos y exámenes 2013–2015. Material histórico; no entrenamiento de hardware actual completo."
    },
    {
      "id": "hw-micro",
      "label": "OpenFING · Introducción a los Microprocesadores 2025",
      "url": "https://open.fing.edu.uy/courses/imp-2025/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases universitarias",
      "verificationNote": "Curso localizado en fuente oficial con clases de microprocesadores, paralelismo, caché y memoria virtual; contrastar arquitectura concreta."
    },
    {
      "id": "hw-hardware",
      "label": "Cisco · Computer Hardware Basics",
      "url": "https://www.netacad.com/courses/computer-hardware-basics?courseLang=es-XL",
      "language": "es",
      "access": "Curso gratuito con cuenta; equipo físico no incluido",
      "kind": "Curso introductorio",
      "verificationNote": "Ficha actual y anuncio oficial Cisco contrastados: español y prácticas virtuales; PC, laptops y móviles. Requiere cuenta. No microsoldadura avanzada."
    },
    {
      "id": "hw-redes",
      "label": "Cisco · Networking Basics",
      "url": "https://www.netacad.com/courses/networking-basics?courseLang=es-XL",
      "language": "es",
      "access": "Contenido introductorio gratuito; cuenta y modalidad según ficha",
      "kind": "Curso introductorio",
      "verificationNote": "Oferta en español comprobada. Cubre dispositivos, medios, protocolos y configuración básica. Distinguir autoformación de modalidad con instructor."
    },
    {
      "id": "hw-redes2",
      "label": "OpenFING · Redes de Datos 2",
      "url": "https://open.fing.edu.uy/courses/redes2/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases universitarias",
      "verificationNote": "23 clases comprobadas: IPv6, OSPF, BGP, MPLS, QoS, segment routing, SDN/NFV. Teórico 2023; faltan prácticas integradas en esta página."
    },
    {
      "id": "hw-telecom",
      "label": "OpenFING · Tecnologías de Redes y Servicios de Telecomunicaciones",
      "url": "https://open.fing.edu.uy/courses/trst/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases universitarias",
      "verificationNote": "Índice leído: codificación, paquetización multimedia, señalización, acceso, conmutación, transmisión, móvil, tráfico y QoE. Edición 2021."
    },
    {
      "id": "hw-antenas",
      "label": "OpenFING · Antenas y Propagación",
      "url": "https://open.fing.edu.uy/courses/ayp/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases universitarias",
      "verificationNote": "Se comprobó colección de 21 clases teóricas 2019. El índice no detalla toda la correspondencia por tema; apoyo parcial para radio/satélite."
    },
    {
      "id": "hw-hpc",
      "label": "OpenFING · Computación de Alta Performance",
      "url": "https://open.fing.edu.uy/courses/hpc/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Clases introductorias",
      "verificationNote": "6 clases verificadas: arquitecturas, técnicas paralelas, rendimiento, C y multithreading. Edición 2013, no cobertura actual completa de aceleradores."
    },
    {
      "id": "hw-debian",
      "label": "El manual del administrador de Debian",
      "url": "https://www.debian.org/doc/manuals/debian-handbook/index.es.html",
      "language": "mixto",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Libro técnico abierto",
      "verificationNote": "Índice leído: instalación, paquetes, servicios, red, permisos, impresión, virtualización y administración. Traducción española incompleta en secciones; contrastar versión usada."
    },
    {
      "id": "hw-concurrencia",
      "label": "UPV/EHU · Programación concurrente en Linux",
      "url": "https://ocw.ehu.eus/course/view.php?id=399",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Curso OCW con prácticas",
      "verificationNote": "Página leída: descarga de actividades, código, autoevaluación y soluciones. Edición 2016; compatibilidad actual debe comprobarse."
    },
    {
      "id": "hw-docker",
      "label": "Docker · Build and share a containerized application",
      "url": "https://docs.docker.com/get-started/tutorials/run-an-app/",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial oficial",
      "verificationNote": "Tutorial leído: ejecutar contenedor, aplicación de varios servicios, imagen y distribución. No cubre toda la seguridad/operación. Revisar licencia de Docker Desktop según uso."
    },
    {
      "id": "hw-kubernetes",
      "label": "Kubernetes · Fundamentos",
      "url": "https://kubernetes.io/es/docs/tutorials/kubernetes-basics/",
      "language": "mixto",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial oficial",
      "verificationNote": "Página española de fundamentos comprobada; navegación y páginas avanzadas tienen partes en inglés. Usar clúster local para ejercicios sin contratar nube."
    },
    {
      "id": "hw-powershell",
      "label": "Microsoft · PowerShell 101",
      "url": "https://learn.microsoft.com/es-es/powershell/scripting/learn/ps101/00-introduction",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Libro práctico",
      "verificationNote": "Contenido legible pese a aviso genérico de autorización: libro, capítulos y laboratorio Windows 5.1; comparar diferencias con PowerShell 7."
    },
    {
      "id": "hw-ad",
      "label": "Microsoft · Implementar y administrar AD DS",
      "url": "https://learn.microsoft.com/es-es/training/paths/deploy-manage-active-directory-domain-services/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Ruta formativa",
      "verificationNote": "Ficha leída: ocho módulos con unidades y evaluación sobre controladores, identidad, GPO, replicación y entorno híbrido. Licencias y Azure pueden costar."
    },
    {
      "id": "hw-ansible",
      "label": "Ansible · Getting started",
      "url": "https://docs.ansible.com/projects/ansible/latest/getting_started/index.html",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial oficial",
      "verificationNote": "Página comprobada: nodo de control, inventario, nodos administrados, playbook y conceptos. Software/material gratuito; solo administrar laboratorio propio."
    },
    {
      "id": "hw-terraform",
      "label": "HashiCorp · Terraform con Docker local",
      "url": "https://developer.hashicorp.com/terraform/tutorials/docker-get-started",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Serie de tutoriales",
      "verificationNote": "Siete tutoriales comprobados: crear, cambiar, estado y ciclo de vida de infraestructura local. No obliga a contratar proveedor cloud."
    },
    {
      "id": "hw-sre",
      "label": "Google · Site Reliability Engineering",
      "url": "https://sre.google/sre-book/table-of-contents/",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Libro abierto",
      "verificationNote": "Libro e índice comprobados: SLO, monitorización, incidentes, cargas, consenso y datos. No equivale a experiencia de operación ni curso íntegro en español."
    },
    {
      "id": "hw-aws",
      "label": "AWS · Well-Architected Framework",
      "url": "https://docs.aws.amazon.com/es_es/wellarchitected/latest/framework/welcome.html",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Guía de arquitectura",
      "verificationNote": "Contenido leído: decisiones y compromisos de seguridad, fiabilidad, rendimiento, costes y sostenibilidad. Marco con preguntas, no laboratorio incluido."
    },
    {
      "id": "hw-gcp",
      "label": "Google Cloud · Well-Architected Framework",
      "url": "https://docs.cloud.google.com/architecture/framework?hl=es",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Guía de arquitectura",
      "verificationNote": "Página leída: principios y pilares de operación, seguridad, fiabilidad, costes y rendimiento. No implica que la plataforma o sus laboratorios sean gratuitos."
    },
    {
      "id": "hw-robotics",
      "label": "Northwestern · Modern Robotics",
      "url": "https://modernrobotics.northwestern.edu/nu-gm-book-resource/",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Vídeos y material del libro",
      "verificationNote": "Vídeos comprobados sobre configuración, movimiento rígido y capítulos del libro. Libro/software en web original del autor; no confundir Coursera o libro impreso con acceso gratis a todo."
    },
    {
      "id": "hw-ros2",
      "label": "ROS 2 · Tutoriales Jazzy: fuente oficial",
      "url": "https://github.com/ros2/ros2_documentation/tree/jazzy/source/Tutorials",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Documentación y ejemplos oficiales",
      "verificationNote": "El lector web de docs.ros.org fue bloqueado por Anubis. Se verificaron con GitHub API oficial las carpetas Beginner-CLI-Tools, Client-Libraries, Intermediate, Advanced y Demos. No se afirma ejecución del tutorial."
    },
    {
      "id": "hw-freecad",
      "label": "FreeCAD · Documentación oficial traducida",
      "url": "https://github.com/FreeCAD/FreeCAD-documentation/blob/main/wiki/translations/es/Main_Page.md",
      "language": "mixto",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Manual y documentación",
      "verificationNote": "Repositorio oficial y página española leídos. Manual y centros de usuario; traducción y ejemplos dependen de página. No formación completa en resistencia/manufactura."
    },
    {
      "id": "hw-iphone",
      "label": "Apple · Manual de reparación del iPhone 16",
      "url": "https://support.apple.com/es-es/120652",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Manual oficial de modelo",
      "verificationNote": "Índice comprobado: seguridad, diagnóstico, piezas, herramientas y procedimientos. Específico iPhone16; no extrapolar a iPad/Mac ni reparación universal de placa."
    },
    {
      "id": "hw-apple-config",
      "label": "Apple · Asistente de reparación en iPhone/iPad",
      "url": "https://support.apple.com/es-es/120579",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Documento técnico oficial",
      "verificationNote": "Página leída: configuración posterior y compatibilidad por modelo. Requiere comprobar condiciones actuales y autorización del propietario; no eludir bloqueos."
    },
    {
      "id": "hw-samsung",
      "label": "Samsung · Self-Repair",
      "url": "https://www.samsung.com/es/support/self-repair/",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Manuales y vídeos por modelo",
      "verificationNote": "Página leída: diagnóstico, pantalla, carga, GalaxyBook y Tab S9+; buscar guía por código de modelo. Material no significa piezas, tienda o programa disponible en Perú."
    },
    {
      "id": "hw-dell",
      "label": "Dell Latitude 5400 · Manuales",
      "url": "https://www.dell.com/support/product-details/es-es/product/latitude-14-5400-laptop/resources/manuals",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Manual de servicio de modelo",
      "verificationNote": "Ficha comprobada: manual de servicio español, configuración y especificaciones. Usar como caso de estudio; no procedimiento para cualquier laptop."
    },
    {
      "id": "hw-hp",
      "label": "HP LaserJet Pro 3103fdw · Guías de modelo",
      "url": "https://support.hp.com/es-es/product/setup-user-guides/hp-laserjet-pro-mfp-3101-3108fdn-fdw-printer-series/model/35801058",
      "language": "mixto",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Soporte y manuales de modelo",
      "verificationNote": "Ficha leída: informes, impresión, red, escaneo, papel y diagnóstico; algunos artículos en inglés. No manual completo de reparación de placa/fusor."
    },
    {
      "id": "hw-seguridad",
      "label": "iFixit · Seguridad del dispositivo",
      "url": "https://es.ifixit.com/Info/Device_Safety",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Guía de seguridad",
      "verificationNote": "Página leída: baterías, soldadura, condensadores y riesgos según dispositivo. La guía es inicio, no habilitación para trabajo energizado o fuentes."
    },
    {
      "id": "hw-soldadura",
      "label": "iFixit · Cómo soldar y desoldar conexiones",
      "url": "https://documents.cdn.ifixit.com/pdf/ifixit/guide_750_es.pdf",
      "language": "es",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Guía práctica original traducida",
      "verificationNote": "PDF español localizado del autor Arthur Shi. Enseña conexiones, no diagnóstico universal de placas, BGA o reparación profesional completa."
    },
    {
      "id": "hw-helm",
      "label": "Helm · Quickstart",
      "url": "https://helm.sh/docs/intro/quickstart/",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial oficial",
      "verificationNote": "Se inspeccionaron páginas inglesa y /es/: el cuerpo de la supuesta traducción española sigue en inglés. Ejemplo de chart, revisión y ciclo de vida en Kubernetes; no curso completo de operadores/GitOps."
    },
    {
      "id": "hw-istio",
      "label": "Istio · Getting started",
      "url": "https://istio.io/latest/docs/setup/getting-started/",
      "language": "en",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial oficial",
      "verificationNote": "Guía comprobada con aplicación de ejemplo y enlaces de instalación/tráfico/seguridad; también expone modalidad ambient. Requiere recursos de clúster local y versiones compatibles."
    },
    {
      "id": "hw-otel",
      "label": "OpenTelemetry · Python por ejemplo",
      "url": "https://opentelemetry.io/es/docs/languages/python/getting-started/",
      "language": "mixto",
      "access": "Lectura gratuita; equipo y servicios de práctica no incluidos",
      "kind": "Tutorial oficial",
      "verificationNote": "Página española inspeccionada: instrumentación y ejemplos; traducción/navegación mixtas y detalles ingleses. No es un curso completo de observabilidad operativa."
    },
    {
      "id": "pro-ehu",
      "label": "UPV/EHU: Ingeniería del Software II",
      "url": "https://ocw.ehu.eus/course/view.php?id=483",
      "language": "es",
      "access": "Material abierto, sin tutoría ni título",
      "kind": "Curso OCW con prácticas",
      "verificationNote": "Página inspeccionada: verificación, mantenimiento, SOLID, patrones, ejercicios y laboratorios. Edición 2018; JSF/Hibernate requieren contraste actual."
    },
    {
      "id": "pro-mdn",
      "label": "MDN: Aprende desarrollo web",
      "url": "https://developer.mozilla.org/es/docs/Learn_web_development",
      "language": "mixto",
      "access": "Lectura y ejemplos gratuitos",
      "kind": "Tutoriales y ejemplos",
      "verificationNote": "Página inspeccionada: HTML, CSS, JS, formularios, accesibilidad, rendimiento y servidor. Traducción española parcial y enlaces nuevos en inglés; nivel inicial/intermedio, no ingeniería entera."
    },
    {
      "id": "pro-playwright",
      "label": "Playwright: Writing tests",
      "url": "https://playwright.dev/docs/writing-tests",
      "language": "en",
      "access": "Documentación y biblioteca gratuitas",
      "kind": "Tutorial con código ejecutable",
      "verificationNote": "Inspeccionados primer test, acciones, aserciones, aislamiento, fixtures y guía CI. Requiere JavaScript/TypeScript; no curso completo de calidad."
    },
    {
      "id": "pro-android",
      "label": "Android Basics with Compose",
      "url": "https://developer.android.com/courses/android-basics-compose/course?hl=es-419",
      "language": "mixto",
      "access": "Curso y herramientas gratuitos; equipo compatible necesario",
      "kind": "Curso con codelabs y cuestionarios",
      "verificationNote": "Índice español inspeccionado: Kotlin, Compose, prácticas, codelabs y cuestionarios. Vídeo/idioma según lección; emulador permite empezar sin teléfono."
    },
    {
      "id": "pro-dotnet",
      "label": "Microsoft: API web ASP.NET Core",
      "url": "https://learn.microsoft.com/es-es/aspnet/core/tutorials/first-web-api",
      "language": "mixto",
      "access": "Tutorial y .NET gratuitos; servicios externos pueden costar",
      "kind": "Tutorial de programación",
      "verificationNote": "Resultado oficial indexado confirma controlador/API mínima y persistencia. Seleccionar versión soportada del SDK; no asumir que todos los enlaces ni ejemplos están traducidos."
    },
    {
      "id": "pro-github",
      "label": "GitHub Actions: conceptos y flujo de ejemplo",
      "url": "https://docs.github.com/es/actions/get-started/understand-github-actions",
      "language": "es",
      "access": "Documentación gratuita; ejecución sujeta a cuotas del plan",
      "kind": "Documentación y tutorial",
      "verificationNote": "Página inspeccionada con tutorial de workflow, CI, artefactos y permisos. Para evitar costes puede practicarse localmente y usar repositorio público dentro de límites."
    },
    {
      "id": "pro-asvs",
      "label": "OWASP ASVS",
      "url": "https://asvs.owasp.org/",
      "language": "en",
      "access": "Estándar abierto gratuito",
      "kind": "Requisitos verificables de seguridad",
      "verificationNote": "Página inspeccionada: ASVS5.0.0, requisitos para diseño, desarrollo y pruebas. Marco de controles, no curso; comprobar traducción y versión por descarga."
    },
    {
      "id": "pro-webgoat",
      "label": "OWASP WebGoat",
      "url": "https://owasp.org/projects/webgoat?tab=lessons",
      "language": "en",
      "access": "Aplicación educativa gratuita para laboratorio propio",
      "kind": "Lecciones y laboratorio vulnerable",
      "verificationNote": "Página inspeccionada: lecciones de vulnerabilidades de aplicaciones y referencias a soluciones. Solo entorno aislado y autorizado; no garantiza traducción española."
    },
    {
      "id": "pro-portswigger",
      "label": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "language": "en",
      "access": "Material y laboratorios interactivos gratuitos; certificado profesional separado",
      "kind": "Lecciones, laboratorios y soluciones",
      "verificationNote": "Inspeccionadas rutas, temas, laboratorios gratuitos y seguimiento. Debe mantenerse práctica dentro de los laboratorios; no cubre toda la seguridad empresarial."
    },
    {
      "id": "pro-csf",
      "label": "NIST Cybersecurity Framework",
      "url": "https://www.nist.gov/cyberframework",
      "language": "mixto",
      "access": "Guías y documentos gratuitos",
      "kind": "Marco y guías de aplicación",
      "verificationNote": "Página inspeccionada con CSF2.0, quick-start, perfiles y traducciones. No curso práctico ni sustituto de ISO; verificar idioma de cada documento."
    },
    {
      "id": "pro-forensics",
      "label": "NIST SP800-86: Forensics in Incident Response",
      "url": "https://csrc.nist.gov/pubs/sp/800/86/final",
      "language": "en",
      "access": "Documento gratuito",
      "kind": "Guía técnica",
      "verificationNote": "Página inspeccionada: archivos, SO, red y aplicaciones; edición2006, no procedimiento exhaustivo ni asesoramiento legal. Completar herramientas actuales y normas locales."
    },
    {
      "id": "pro-wazuh",
      "label": "Wazuh: casos de uso",
      "url": "https://documentation.wazuh.com/current/getting-started/use-cases/index.html",
      "language": "en",
      "access": "Documentación y plataforma local abiertas; máquinas necesarias",
      "kind": "Guías de laboratorio",
      "verificationNote": "Página inspeccionada: integridad, logs, vulnerabilidades, hunting, respuesta, contenedores y cloud. No equivale a cubrir todas las técnicas SOC o malware."
    },
    {
      "id": "pro-crypto",
      "label": "Cryptopals",
      "url": "https://cryptopals.com/",
      "language": "en",
      "access": "Retos gratuitos",
      "kind": "Ejercicios de criptografía",
      "verificationNote": "Página inspeccionada: ocho conjuntos progresivos, exige programación; no implementar criptografía propia en producción. Algunos ejemplos reflejan debilidades históricas."
    },
    {
      "id": "pro-odoo",
      "label": "Odoo Server framework101",
      "url": "https://www.odoo.com/documentation/18.0/developer/tutorials/server_framework_101.html",
      "language": "en",
      "access": "Documentación gratuita; usar Community local cuando proceda",
      "kind": "Tutorial de desarrollo ERP",
      "verificationNote": "Resultado oficial indexado describe construir módulo inmobiliario. Lectura directa agotó tiempo; no se verificó ejecutar cada ejercicio ni disponibilidad de todos los módulos gratis."
    },
    {
      "id": "pro-camunda",
      "label": "Camunda BPMN in Action",
      "url": "https://page.camunda.com/bpmn-in-action",
      "language": "en",
      "access": "Serie educativa accesible; Modeler local; servicios tienen condiciones propias",
      "kind": "Tutoriales de modelado",
      "verificationNote": "Fuente oficial indexada describe modelar procesos y escalamiento con Desktop Modeler/Token Simulator. No implica uso productivo gratuito del motor o cloud."
    },
    {
      "id": "pro-godot",
      "label": "Godot: tu primer juego2D",
      "url": "https://docs.godotengine.org/es/4.x/getting_started/first_2d_game/index.html",
      "language": "mixto",
      "access": "Documentación, código y motor gratuitos",
      "kind": "Proyecto guiado con código final",
      "verificationNote": "Página española inspeccionada: escenas, movimiento, enemigos, puntuación, assets y proyecto final. Fijar versión estable compatible; no toda la documentación avanzada está traducida."
    },
    {
      "id": "pro-blender",
      "label": "Blender: modelado",
      "url": "https://docs.blender.org/manual/es/latest/modeling/index.html",
      "language": "mixto",
      "access": "Manual y software gratuitos",
      "kind": "Manual técnico",
      "verificationNote": "Resultado oficial indexado enumera mallas, curvas, UV, modificadores y geometría. Traducción parcial; latest puede documentar versión de desarrollo. No curso audiovisual completo."
    },
    {
      "id": "pro-davinci",
      "label": "Blackmagic: capacitación DaVinci Resolve",
      "url": "https://www.blackmagicdesign.com/es/products/davinciresolve/training",
      "language": "mixto",
      "access": "Tutoriales/proyectos accesibles; versión gratuita de Resolve; Studio y hardware pueden costar",
      "kind": "Tutoriales y archivos de práctica",
      "verificationNote": "Página inspeccionada: edición, color, audio, Fusion y proyectos. Varias unidades indican explícitamente inglés; comprobar licencia y funciones requeridas por ejercicio."
    },
    {
      "id": "pro-gimp",
      "label": "GIMP3: manual en español",
      "url": "https://docs.gimp.org/3.0/es/",
      "language": "mixto",
      "access": "Manual y programa gratuitos",
      "kind": "Manual con tareas y procedimientos",
      "verificationNote": "Inspeccionadas tareas de tamaño, recorte, capas, máscaras, color y exportación. El índice mezcla entradas traducidas e inglesas. Alternativa conceptual, no formación específica en Photoshop/Affinity."
    },
    {
      "id": "pro-inkscape",
      "label": "Inkscape: tutorial básico",
      "url": "https://inkscape.org/doc/tutorials/basic/tutorial-basic.es.html",
      "language": "es",
      "access": "Tutorial y programa gratuitos",
      "kind": "Tutorial interactivo editable",
      "verificationNote": "Resultado oficial indexado confirma documento editable con ejercicios sobre formas, selección y transformaciones. Lectura directa de portal devolvió403; puede abrirse desde Ayuda del programa."
    },
    {
      "id": "pro-kdenlive",
      "label": "Kdenlive: inicio rápido",
      "url": "https://docs.kdenlive.org/es/getting_started/quickstart.html",
      "language": "es",
      "access": "Manual, medios de ejemplo y programa gratuitos",
      "kind": "Tutorial de montaje",
      "verificationNote": "Página inspeccionada: proyecto, archivos de práctica, medios, pistas, montaje y procesamiento. No sustituye teoría del cine ni todos los capítulos avanzados."
    },
    {
      "id": "pro-unreal",
      "label": "Epic: Unreal para nuevos usuarios",
      "url": "https://dev.epicgames.com/documentation/es-es/unreal-engine/unreal-engine-for-new-users",
      "language": "es",
      "access": "Documentación gratuita; requisitos/licencia del motor por uso",
      "kind": "Proyecto guiado",
      "verificationNote": "Página inspeccionada: juego de aventuras, rutas de programación, diseño/artes y empaquetado. Hardware y explotación comercial tienen condiciones; no curso completo de XR/virtual production."
    },
    {
      "id": "pro-unity",
      "label": "Unity Learn",
      "url": "https://learn.unity.com/",
      "language": "en",
      "access": "Experiencias formativas gratuitas; cuenta y licencia del editor según condiciones",
      "kind": "Rutas con tutoriales y proyectos",
      "verificationNote": "Página inspeccionada: proyecto inicial3D, tutoriales paso a paso, física y juego2D. No asumir toda la oferta en español ni licencia comercial universalmente gratuita."
    },
    {
      "id": "pro-wai",
      "label": "W3C WAI: tutoriales accesibles",
      "url": "https://www.w3.org/WAI/tutorials/",
      "language": "en",
      "access": "Lectura y ejemplos gratuitos",
      "kind": "Tutoriales con ejemplos de código",
      "verificationNote": "Página inspeccionada: estructura, imágenes, tablas, formularios y carruseles. Inglés, con pocas traducciones listadas; complementar MDN español y criterios WCAG vigentes."
    },
    {
      "id": "pro-swift",
      "label": "Apple: SwiftUI tutorials",
      "url": "https://developer.apple.com/tutorials/swiftui",
      "language": "en",
      "access": "Tutoriales/código gratuitos; Mac compatible para Xcode; publicación puede requerir pago",
      "kind": "Tutoriales con proyectos de ejemplo",
      "verificationNote": "Fuente oficial y repositorio apple-sample-code indexados confirman proyectos, vistas, estado, navegación y animación. La página requiereJS; no se ejecutaron tutoriales."
    },
    {
      "id": "pro-cine",
      "label": "Enrique Martínez-Salanova: aprender cine, alojado en UHU",
      "url": "https://www.uhu.es/cine.educacion/cineyeducacion/aprendercine.htm",
      "language": "es",
      "access": "Unidades y sugerencias didácticas de consulta gratuita",
      "kind": "Material didáctico original",
      "verificationNote": "Resultado del sitio universitario inspeccionado: lenguaje, encuadre, montaje, historia, análisis, documental y guion. Lectura directa agotó tiempo; material histórico, no una carrera actual completa ni atribución institucional del currículo."
    },
    {
      "id": "pro-obs",
      "label": "OBS: Quick Start Guide",
      "url": "https://obsproject.com/kb/quick-start-guide",
      "language": "en",
      "access": "Guía y software abiertos gratuitos; equipo y red necesarios",
      "kind": "Tutorial de grabación y emisión",
      "verificationNote": "Página inspeccionada: configuración, escenas/fuentes, audio y grabación de prueba. No curso completo de realización ni garantía de calidad de conexión."
    },
    {
      "id": "pro-cc",
      "label": "Creative Commons: licencias",
      "url": "https://creativecommons.org/cc-licenses/",
      "language": "en",
      "access": "Referencia pública gratuita",
      "kind": "Guía de licencias",
      "verificationNote": "Página inspeccionada: tipos de licencias, atribución, adaptaciones, uso comercial y compartir igual. No asesoramiento jurídico ni cobertura de todos los derechos de imagen, marcas o contratos."
    },
    {
      "id": "pro-opengl",
      "label": "LearnOpenGL: Hello Triangle",
      "url": "https://learnopengl.com/Getting-started/Hello-Triangle",
      "language": "en",
      "access": "Tutoriales y código públicos gratuitos; equipo compatible",
      "kind": "Tutorial de gráficos con código",
      "verificationNote": "Fuente original inspeccionada: ventana, pipeline, vértices y shaders. Requiere C++ y preparación del entorno; no toda la gráfica avanzada ni contenidos en español."
    },
    {
      "id": "pro-pbrt",
      "label": "Physically Based Rendering",
      "url": "https://pbrt.org/",
      "language": "en",
      "access": "Libro en línea y código públicos gratuitos; edición impresa comercial",
      "kind": "Libro técnico y renderizador de referencia",
      "verificationNote": "Fuente original inspeccionada: enlace a cuarta edición en línea, código y escenas. Base avanzada de render físico, necesita cálculo, probabilidad y programación; no curso íntegro español."
    },
    {
      "id": "sci-cs50-python",
      "label": "Harvard CS50 · Python, semana 6",
      "url": "https://cs50.harvard.edu/x/weeks/6/",
      "language": "mixto",
      "access": "Clase, notas y práctica abiertas; evaluación institucional y certificados tienen condiciones propias",
      "kind": "Curso universitario",
      "verificationNote": "La página enumera funciones, argumentos, tipos, condicionales, bucles y módulos, con vídeo y transcripción en español. La semana presupone las anteriores de CS50; no es por sí sola una introducción completa desde cero."
    },
    {
      "id": "pro-microservices",
      "label": "Microsoft · Arquitectura de microservicios .NET",
      "url": "https://learn.microsoft.com/es-es/dotnet/architecture/microservices/",
      "language": "es",
      "access": "Libro web consultable; entorno de práctica local con sus requisitos",
      "kind": "Libro del proveedor",
      "verificationNote": "La edición observada es v7.0/.NET7, histórica: sirve para límites, comunicación, consistencia y arquitectura; contrastar versiones actuales antes de ejecutar sus ejemplos. PDF enlazado en inglés."
    },
    {
      "id": "pro-rabbitmq",
      "label": "RabbitMQ · Work Queues con Python",
      "url": "https://www.rabbitmq.com/tutorials/tutorial-two-python",
      "language": "en",
      "access": "Tutorial gratuito y práctica local; instalar dependencias oficiales en un entorno propio",
      "kind": "Tutorial oficial",
      "verificationNote": "Explica workers, acknowledgements, reencolado, durabilidad y reparto. No garantiza efectos exactamente una vez: la aplicación necesita idempotencia/deduplicación y pruebas de fallo."
    }
  ],
  "plans": [
    {
      "id": "MAT-001",
      "focus": [
        "Funciones",
        "polinomios",
        "ecuaciones y desigualdades",
        "exponentes y logaritmos"
      ],
      "practice": "Modela el coste de dos planes de almacenamiento y determina en qué intervalo conviene cada uno, mostrando los cruces algebraicos y gráficos.",
      "checks": [
        "Define dominio y unidades",
        "Comprueba los puntos de cruce sustituyendo",
        "Prueba un valor a cada lado de cada cruce"
      ],
      "question": "¿Por qué una solución algebraica puede no ser admisible?",
      "answer": "Porque puede quedar fuera del dominio o violar restricciones del problema original; debe comprobarse en el modelo inicial.",
      "sourceIds": [
        "sci-calc1"
      ],
      "scopeNote": "Nivelación de funciones y álgebra; ampliar factorización y manipulación simbólica antes del cálculo."
    },
    {
      "id": "MAT-002",
      "focus": [
        "Trigonometría",
        "vectores en el plano",
        "rectas y cónicas",
        "coordenadas polares"
      ],
      "practice": "Calcula y dibuja la posición de un sensor a partir de distancia y ángulo; contrasta coordenadas cartesianas y polares.",
      "checks": [
        "Declara grados o radianes",
        "Recupera radio y ángulo con cuadrante correcto",
        "Contrasta dos casos geométricos conocidos"
      ],
      "question": "¿Por qué atan(y/x) puede dar un ángulo incorrecto?",
      "answer": "No conserva por sí sola el cuadrante y falla cuando x es cero; se necesitan signos y una función de dos argumentos.",
      "sourceIds": [
        "sci-calc1",
        "sci-calc3"
      ],
      "scopeNote": "Bases geométricas; el diseño tridimensional exige geometría espacial adicional."
    },
    {
      "id": "MAT-003",
      "focus": [
        "Límites",
        "continuidad",
        "derivadas",
        "regla de la cadena",
        "optimización univariable"
      ],
      "practice": "Estudia una función de coste con un mínimo interior y compara derivada analítica con diferencias finitas para tres pasos.",
      "checks": [
        "Indica el dominio",
        "Clasifica puntos críticos y extremos",
        "Analiza error al reducir el paso"
      ],
      "question": "¿Derivada cero implica mínimo?",
      "answer": "No: puede haber máximo o punto estacionario sin extremo; se requieren condiciones adicionales y comparación con fronteras.",
      "sourceIds": [
        "sci-calc1"
      ],
      "scopeNote": "Cubre cálculo diferencial básico; se necesitan ejercicios de demostración y funciones no suaves."
    },
    {
      "id": "MAT-004",
      "focus": [
        "Integral definida",
        "teorema fundamental",
        "sustitución",
        "integración por partes",
        "error de cuadratura"
      ],
      "practice": "Estima energía consumida a partir de una potencia variable conocida e integra también numéricamente.",
      "checks": [
        "Conserva unidades",
        "Comprueba una integral analítica",
        "Estudia convergencia al refinar la partición"
      ],
      "question": "¿Una integral definida es siempre área geométrica positiva?",
      "answer": "No: representa acumulación con signo; el área geométrica se obtiene integrando el valor absoluto cuando corresponde.",
      "sourceIds": [
        "sci-calc2",
        "sci-scipy"
      ],
      "scopeNote": "La práctica no sustituye el estudio de convergencia de integrales impropias."
    },
    {
      "id": "MAT-005",
      "focus": [
        "Derivadas parciales",
        "gradiente",
        "jacobiano",
        "hessiano",
        "integrales múltiples"
      ],
      "practice": "Analiza una función de pérdida de dos parámetros, dibuja sus contornos y contrasta gradiente analítico y numérico.",
      "checks": [
        "Especifica variables independientes",
        "Verifica cada componente del gradiente",
        "Interpreta hessiano y restricciones"
      ],
      "question": "¿Qué distingue gradiente de derivada direccional?",
      "answer": "El gradiente es un vector de derivadas parciales; su producto con una dirección unitaria produce la derivada direccional.",
      "sourceIds": [
        "sci-calc3",
        "sci-fiuba-math"
      ],
      "scopeNote": "Ampliar teoremas integrales y regularidad de funciones multivariables."
    },
    {
      "id": "MAT-006",
      "focus": [
        "Espacios vectoriales",
        "sistemas lineales",
        "rango",
        "proyecciones",
        "autovalores"
      ],
      "practice": "Resuelve un ajuste lineal sobredeterminado por mínimos cuadrados y compara solución directa y pseudoinversa.",
      "checks": [
        "Comprueba dimensiones",
        "Mide el residuo",
        "Explica rango y unicidad"
      ],
      "question": "¿Una matriz con más filas que columnas garantiza solución exacta?",
      "answer": "No: el vector objetivo puede estar fuera del espacio columna; mínimos cuadrados minimiza el residuo, no lo elimina necesariamente.",
      "sourceIds": [
        "sci-fiuba-math",
        "sci-scipy"
      ],
      "scopeNote": "Incluye álgebra aplicada; completar pruebas sobre bases, dimensión y transformaciones."
    },
    {
      "id": "MAT-007",
      "focus": [
        "Descomposición espectral",
        "SVD",
        "formas bilineales",
        "tensores",
        "contracción de índices"
      ],
      "practice": "Aproxima una matriz por rango reducido usando SVD y explica dimensiones de una contracción tensorial pequeña.",
      "checks": [
        "Ordena valores singulares",
        "Cuantifica error por rango",
        "Comprueba dimensiones y significado de índices"
      ],
      "question": "¿Un tensor es solamente una matriz de muchas dimensiones?",
      "answer": "Una representación multidimensional no basta: el concepto matemático incluye estructura y reglas de transformación; distinguir objeto y coordenadas.",
      "sourceIds": [
        "sci-fiuba-math",
        "sci-scipy"
      ],
      "scopeNote": "SVD está apoyada; la teoría tensorial avanzada requiere material específico adicional."
    },
    {
      "id": "MAT-008",
      "focus": [
        "Conjuntos",
        "relaciones",
        "inducción",
        "conteo",
        "lógica proposicional"
      ],
      "practice": "Demuestra por inducción una identidad de sumas y comprueba una relación finita para reflexividad, simetría y transitividad.",
      "checks": [
        "Separa base e hipótesis",
        "Justifica el paso inductivo",
        "Da contraejemplo cuando falla una propiedad"
      ],
      "question": "¿Comprobar muchos casos demuestra una identidad universal?",
      "answer": "No: la prueba debe cubrir todos los casos del dominio mediante un argumento válido.",
      "sourceIds": [
        "sci-discreta"
      ],
      "scopeNote": "El material contiene prácticos y soluciones seleccionadas; no todos los ejercicios tienen desarrollo completo."
    },
    {
      "id": "MAT-009",
      "focus": [
        "Divisibilidad",
        "congruencias",
        "recurrencias",
        "grafos",
        "estructuras discretas"
      ],
      "practice": "Implementa Euclides extendido y resuelve una congruencia lineal, indicando cuándo existe solución.",
      "checks": [
        "Verifica la identidad de Bézout",
        "Comprueba condición de divisibilidad",
        "Sustituye soluciones módulo n"
      ],
      "question": "¿Siempre existe inverso modular?",
      "answer": "Solo cuando el número y el módulo son coprimos; el inverso se entiende módulo n.",
      "sourceIds": [
        "sci-discreta",
        "sci-fing"
      ],
      "scopeNote": "Los contenidos de discreta2 deben contrastarse con el curso específico del catálogo; el primer material es apoyo parcial."
    },
    {
      "id": "MAT-010",
      "focus": [
        "Cuantificadores",
        "implicación",
        "contraposición",
        "contradicción",
        "deducción natural"
      ],
      "practice": "Formaliza cinco afirmaciones sobre programas y escribe una demostración directa y otra por contraposición.",
      "checks": [
        "Fija universo",
        "Conserva orden de cuantificadores",
        "Señala cada regla de inferencia"
      ],
      "question": "¿La recíproca de una implicación es equivalente?",
      "answer": "No: P implica Q no autoriza Q implica P; la contraposición sí es equivalente en lógica clásica.",
      "sourceIds": [
        "sci-discreta"
      ],
      "scopeNote": "Ampliar lógica de predicados y metateoría para métodos formales."
    },
    {
      "id": "MAT-011",
      "focus": [
        "Probabilidad condicional",
        "Bayes",
        "variables aleatorias",
        "esperanza",
        "distribuciones"
      ],
      "practice": "Simula un test con prevalencia conocida y compara frecuencia empírica con probabilidad posterior calculada.",
      "checks": [
        "Distingue sensibilidad y valor predictivo",
        "Fija semilla",
        "Reporta incertidumbre Monte Carlo"
      ],
      "question": "¿Alta sensibilidad implica alto valor predictivo positivo?",
      "answer": "No: el valor predictivo depende además de especificidad y prevalencia; aquí se usan datos sintéticos, sin decisión clínica.",
      "sourceIds": [
        "sci-stats",
        "sci-fiuba-prob"
      ],
      "scopeNote": "Problema matemático ilustrativo, no interpretación de un test médico real."
    },
    {
      "id": "MAT-012",
      "focus": [
        "Muestreo",
        "estimación",
        "intervalos",
        "contrastes",
        "tamaño de efecto"
      ],
      "practice": "Compara dos grupos sintéticos con estimación de diferencia e intervalo, justificando supuestos.",
      "checks": [
        "Muestra datos y muestreo",
        "Reporta efecto e intervalo",
        "Distingue evidencia de ausencia de efecto"
      ],
      "question": "¿p mayor que un umbral prueba igualdad?",
      "answer": "No: no rechazar una hipótesis no demuestra equivalencia; esta requiere un diseño y margen de equivalencia definidos.",
      "sourceIds": [
        "sci-stats",
        "sci-fiuba-prob"
      ],
      "scopeNote": "Ampliar diseños y supuestos antes de usar inferencia en problemas reales."
    },
    {
      "id": "MAT-013",
      "focus": [
        "Covarianza",
        "correlación",
        "PCA",
        "regresión multivariante",
        "regularización"
      ],
      "practice": "Aplica PCA a datos sintéticos correlacionados y compara proyecciones con y sin estandarización.",
      "checks": [
        "Ajusta solo con entrenamiento",
        "Explica varianza retenida",
        "Contrasta sensibilidad a escalas"
      ],
      "question": "¿La primera componente identifica la causa principal?",
      "answer": "No: maximiza varianza bajo el modelo, no causalidad ni relevancia del objetivo.",
      "sourceIds": [
        "sci-fiuba-math",
        "sci-fiuba-prob",
        "sci-scipy"
      ],
      "scopeNote": "PCA no cubre toda la inferencia multivariante; ampliar contrastes y modelos específicos."
    },
    {
      "id": "MAT-014",
      "focus": [
        "EDO",
        "condiciones iniciales",
        "estabilidad",
        "métodos de paso",
        "error global"
      ],
      "practice": "Resuelve una EDO lineal con solución conocida usando Euler y un integrador adaptativo.",
      "checks": [
        "Comprueba condición inicial",
        "Compara error a tiempos comunes",
        "Analiza sensibilidad al paso"
      ],
      "question": "¿Una solución numérica estable es necesariamente exacta?",
      "answer": "No: estabilidad controla propagación de perturbaciones; consistencia y convergencia también importan.",
      "sourceIds": [
        "sci-calc2",
        "sci-scipy"
      ],
      "scopeNote": "Ampliar sistemas no lineales y problemas de contorno."
    },
    {
      "id": "MAT-015",
      "focus": [
        "Error de redondeo",
        "condicionamiento",
        "interpolación",
        "raíces",
        "cuadratura"
      ],
      "practice": "Compara bisección y Newton en una función con raíz conocida y registra evaluaciones, residuo y error.",
      "checks": [
        "Documenta condiciones de inicio",
        "Distingue residuo de error",
        "Incluye un caso de fallo"
      ],
      "question": "¿Residuo pequeño garantiza error pequeño?",
      "answer": "No si el problema está mal condicionado; la relación depende de sensibilidad local y estructura.",
      "sourceIds": [
        "sci-scipy",
        "sci-fing"
      ],
      "scopeNote": "La documentación apoya implementación; la teoría y pruebas de convergencia deben estudiarse aparte."
    },
    {
      "id": "MAT-016",
      "focus": [
        "Convexidad",
        "restricciones",
        "gradiente",
        "condiciones KKT",
        "dualidad"
      ],
      "practice": "Formula y resuelve una optimización cuadrática pequeña con restricciones y comprueba candidatos factibles.",
      "checks": [
        "Declara función y restricciones",
        "Verifica factibilidad",
        "Contrasta solución con una búsqueda independiente"
      ],
      "question": "¿Un mínimo local siempre es global?",
      "answer": "No en general; ciertas hipótesis convexas permiten esa conclusión.",
      "sourceIds": [
        "sci-fiuba-math",
        "sci-scipy"
      ],
      "scopeNote": "Ampliar demostraciones de dualidad y algoritmos para problemas no convexos."
    },
    {
      "id": "MAT-017",
      "focus": [
        "Programación lineal",
        "flujo en redes",
        "variables enteras",
        "relajación",
        "sensibilidad"
      ],
      "practice": "Planifica producción sintética con recursos limitados y compara solución continua e integral.",
      "checks": [
        "Expresa unidades por restricción",
        "Comprueba factibilidad",
        "Explica brecha de relajación"
      ],
      "question": "¿Redondear una solución continua conserva factibilidad?",
      "answer": "No necesariamente; puede violar restricciones o ser muy subóptimo.",
      "sourceIds": [
        "sci-scipy",
        "sci-fing"
      ],
      "scopeNote": "Apoyo parcial; contrastar métodos de investigación de operaciones y demostraciones específicas."
    },
    {
      "id": "MAT-018",
      "focus": [
        "Caminos",
        "conectividad",
        "árboles",
        "flujos",
        "complejidad de grafos"
      ],
      "practice": "Resuelve rutas de coste mínimo en un grafo inventado y contrasta búsqueda exhaustiva con un algoritmo apropiado.",
      "checks": [
        "Declara dirección y pesos",
        "Incluye caso desconectado",
        "Verifica condiciones del algoritmo"
      ],
      "question": "¿Dijkstra admite pesos negativos sin cambios?",
      "answer": "No; su argumento de corrección presupone pesos no negativos.",
      "sourceIds": [
        "sci-discreta",
        "sci-scipy"
      ],
      "scopeNote": "Ampliar teoría estructural de grafos y pruebas de algoritmos."
    },
    {
      "id": "MAT-019",
      "focus": [
        "Entropía",
        "información mutua",
        "codificación",
        "canal",
        "compresión"
      ],
      "practice": "Calcula entropía empírica de una fuente sintética y compara longitud de un código prefijo con su cota.",
      "checks": [
        "Normaliza probabilidades",
        "Indica base del logaritmo",
        "Distingue entropía de tamaño de archivo"
      ],
      "question": "¿Datos de alta entropía son necesariamente útiles?",
      "answer": "No: entropía mide incertidumbre bajo un modelo, no significado ni utilidad para una tarea.",
      "sourceIds": [
        "sci-fing",
        "sci-fiuba-prob"
      ],
      "scopeNote": "Seleccionar curso de teoría de información del catálogo; faltan aquí todos los teoremas y ejercicios de canal."
    },
    {
      "id": "MAT-020",
      "focus": [
        "Cadenas de Markov",
        "estacionariedad",
        "transiciones",
        "procesos de Poisson",
        "autocorrelación"
      ],
      "practice": "Simula una cadena de Markov finita y compara ocupación empírica con distribución estacionaria calculada.",
      "checks": [
        "Verifica filas estocásticas",
        "Analiza irreducibilidad",
        "Separa transitorio y régimen"
      ],
      "question": "¿Toda cadena tiene una distribución límite única desde cualquier inicio?",
      "answer": "No: periodicidad y clases comunicantes pueden impedirlo; se deben comprobar hipótesis.",
      "sourceIds": [
        "sci-fiuba-prob",
        "sci-scipy"
      ],
      "scopeNote": "Introducción aplicada; ampliar procesos continuos, martingalas y teoría de medida si el objetivo lo requiere."
    },
    {
      "id": "MAT-021",
      "focus": [
        "Cinemática",
        "leyes de Newton",
        "energía",
        "momento",
        "unidades"
      ],
      "practice": "Simula un movimiento con fuerza conocida y verifica conservación de energía en el caso ideal.",
      "checks": [
        "Expresa sistema y fuerzas",
        "Comprueba unidades",
        "Mide error numérico de conservación"
      ],
      "question": "¿Aceleración nula implica ausencia de fuerzas?",
      "answer": "Implica fuerza neta nula en un marco inercial, no ausencia de fuerzas individuales.",
      "sourceIds": [
        "sci-fing",
        "sci-scipy"
      ],
      "scopeNote": "Seleccionar Física1 del catálogo y completar problemas; no sustituye laboratorio experimental."
    },
    {
      "id": "MAT-022",
      "focus": [
        "Campo eléctrico",
        "potencial",
        "circuitos",
        "magnetismo",
        "inducción"
      ],
      "practice": "Resuelve un circuito resistivo de baja tensión en simulación y verifica leyes de Kirchhoff.",
      "checks": [
        "Fija signos y referencia",
        "Comprueba balances",
        "Compara resultado analítico y simulación"
      ],
      "question": "¿Potencial y campo eléctrico son lo mismo?",
      "answer": "No: el campo se relaciona con variación espacial del potencial; distinguir vector y escalar.",
      "sourceIds": [
        "sci-fing"
      ],
      "scopeNote": "La actividad es matemática/simulada; no intervenir redes eléctricas o fuentes reales sin formación."
    },
    {
      "id": "MAT-023",
      "focus": [
        "Ondas",
        "interferencia",
        "óptica",
        "temperatura",
        "termodinámica"
      ],
      "practice": "Modela superposición de dos ondas y calcula un balance energético de un proceso térmico ideal simple.",
      "checks": [
        "Declara supuestos",
        "Conserva unidades",
        "Distingue amplitud de intensidad"
      ],
      "question": "¿Interferencia destructiva destruye la energía total?",
      "answer": "No: la distribución espacial de energía cambia; debe analizarse el sistema y su balance.",
      "sourceIds": [
        "sci-fing",
        "sci-scipy"
      ],
      "scopeNote": "Apoyo por cursos de física; requiere prácticas y teoría experimental adicionales."
    },
    {
      "id": "MAT-024",
      "focus": [
        "Enlaces",
        "estructura cristalina",
        "propiedades",
        "semiconductores",
        "degradación"
      ],
      "practice": "Compara tres materiales para una carcasa de sensor usando datos públicos y criterios de temperatura, rigidez y reciclabilidad.",
      "checks": [
        "Cita origen de propiedades",
        "No mezcla condiciones de medida",
        "Justifica compensaciones"
      ],
      "question": "¿El material con mayor resistencia es siempre el mejor?",
      "answer": "No: la elección depende de restricciones, ambiente, proceso, coste y propiedades múltiples.",
      "sourceIds": [
        "sci-fing"
      ],
      "scopeNote": "El catálogo aporta química/materiales como apoyo; se necesita un curso específico y fichas de materiales para cerrar esta materia."
    },
    {
      "id": "MAT-025",
      "focus": [
        "Sistemas LTI",
        "convolución",
        "respuesta impulsional",
        "frecuencia",
        "muestreo"
      ],
      "practice": "Filtra una señal sintética con un sistema LTI y compara convolución directa con la respuesta calculada.",
      "checks": [
        "Comprueba linealidad",
        "Distingue continuo y discreto",
        "Reporta efecto de condiciones iniciales"
      ],
      "question": "¿Toda operación sobre señales es LTI?",
      "answer": "No: linealidad e invariancia temporal deben comprobarse; saturación y adaptación suelen violarlas.",
      "sourceIds": [
        "sci-scipy",
        "sci-fing"
      ],
      "scopeNote": "Complementar con curso de Señales y Sistemas y sus prácticos."
    },
    {
      "id": "MAT-026",
      "focus": [
        "Series de Fourier",
        "transformada",
        "DFT",
        "ventanas",
        "aliasing"
      ],
      "practice": "Estima frecuencias de una suma de senoidales muestreada con dos tasas y dos ventanas.",
      "checks": [
        "Indica frecuencia de muestreo",
        "Interpreta resolución",
        "Muestra aliasing controlado"
      ],
      "question": "¿Cero padding aumenta la resolución física de una señal medida?",
      "answer": "No: interpola la representación espectral; no aporta más duración ni información observada.",
      "sourceIds": [
        "sci-scipy",
        "sci-fing"
      ],
      "scopeNote": "Ampliar teoría de convergencia y transformadas continuas."
    },
    {
      "id": "MAT-027",
      "focus": [
        "Flujos de caja",
        "valor temporal",
        "coste de oportunidad",
        "riesgo",
        "sensibilidad"
      ],
      "practice": "Compara dos proyectos tecnológicos ficticios mediante flujos descontados y análisis de sensibilidad.",
      "checks": [
        "Declara tasa y horizonte",
        "Distingue nominal y real",
        "Expone supuestos e incertidumbre"
      ],
      "question": "¿Un VAN mayor asegura que un proyecto saldrá mejor?",
      "answer": "No: depende de proyecciones y tasa; no elimina riesgo ni restricciones no monetarias.",
      "sourceIds": [
        "sci-fing"
      ],
      "scopeNote": "Ejercicio académico con cifras ficticias; el catálogo no cubre por sí solo toda la economía de ingeniería."
    },
    {
      "id": "MAT-028",
      "focus": [
        "Energía",
        "huella de ciclo de vida",
        "utilización",
        "efecto rebote",
        "medición"
      ],
      "practice": "Compara dos estrategias de ejecución de una tarea local registrando energía estimada y tiempo bajo condiciones controladas.",
      "checks": [
        "Fija frontera del sistema",
        "No confunde potencia y energía",
        "Expone limitaciones de la estimación"
      ],
      "question": "¿Menor consumo por operación garantiza menor impacto total?",
      "answer": "No: el volumen de uso, fabricación y efectos de sustitución o rebote también importan.",
      "sourceIds": [
        "sci-fing"
      ],
      "scopeNote": "Requiere materiales específicos de sostenibilidad y ciclo de vida; no se atribuye cobertura completa al catálogo."
    },
    {
      "id": "CST-001",
      "focus": [
        "Descomposición",
        "abstracción",
        "algoritmos",
        "trazas",
        "casos límite"
      ],
      "practice": "Escribe pseudocódigo para clasificar pedidos ficticios, simúlalo a mano y busca un contraejemplo a tu primera solución.",
      "checks": [
        "Define entradas y salidas",
        "Incluye entrada vacía",
        "Explica por qué termina"
      ],
      "question": "¿Una lista de pasos siempre es un algoritmo útil?",
      "answer": "Debe ser precisa para su ejecutor, producir el resultado especificado y terminar en el dominio previsto; la lista por sí sola no lo garantiza.",
      "sourceIds": [
        "sci-cs50"
      ],
      "scopeNote": "Guía de pensamiento computacional; programar requiere después sintaxis, práctica y retroalimentación."
    },
    {
      "id": "CST-002",
      "focus": [
        "Tipos",
        "control de flujo",
        "funciones",
        "colecciones",
        "errores"
      ],
      "practice": "Construye un lector de gastos ficticios que agrupe por categoría y rechace entradas malformadas.",
      "checks": [
        "Separa lectura y cálculo",
        "Incluye pruebas de frontera",
        "No oculta errores de datos"
      ],
      "question": "¿Por qué separar cálculo de entrada/salida?",
      "answer": "Facilita probar reglas con datos controlados y reutilizarlas sin depender del dispositivo o formato de entrada.",
      "sourceIds": [
        "sci-python",
        "sci-cs50-python"
      ],
      "scopeNote": "El tutorial Python supone programación previa; usar primero la introducción y ejercicios desde cero."
    },
    {
      "id": "CST-003",
      "focus": [
        "Tipos C",
        "memoria",
        "arrays",
        "punteros",
        "compilación"
      ],
      "practice": "Implementa un vector dinámico de enteros en C con crecimiento y liberación, usando datos pequeños y pruebas.",
      "checks": [
        "Comprueba límites y fallos de reserva",
        "Libera una vez cada recurso",
        "Ejecuta un detector de errores de memoria disponible"
      ],
      "question": "¿Un puntero conserva información sobre la longitud del array?",
      "answer": "En C un puntero no codifica por sí solo esa longitud; debe administrarse mediante un contrato separado.",
      "sourceIds": [
        "sci-cs50"
      ],
      "scopeNote": "CS50 apoya introducción a C; ampliar memoria, comportamiento indefinido y biblioteca estándar."
    },
    {
      "id": "CST-004",
      "focus": [
        "Encapsulación",
        "interfaces",
        "composición",
        "polimorfismo",
        "contratos"
      ],
      "practice": "Modela una biblioteca de préstamos con objetos y sustituye una dependencia por un doble de prueba.",
      "checks": [
        "Explicita invariantes",
        "Prefiere composición justificada",
        "Prueba el contrato de la interfaz"
      ],
      "question": "¿Herencia implica que una subclase es sustituible sin condiciones?",
      "answer": "No: debe respetar contratos y comportamiento esperado, no solo compartir sintaxis.",
      "sourceIds": [
        "sci-python",
        "sci-csharp",
        "sci-java"
      ],
      "scopeNote": "Comparar al menos dos implementaciones; una jerarquía de clases no demuestra diseño correcto."
    },
    {
      "id": "CST-005",
      "focus": [
        "Listas",
        "pilas",
        "colas",
        "hashing",
        "árboles"
      ],
      "practice": "Implementa una tabla hash pequeña y compara colisiones y búsquedas con una lista ordenada.",
      "checks": [
        "Prueba claves repetidas",
        "Mide operaciones además de tiempo",
        "Explica cargas y peor caso"
      ],
      "question": "¿Una tabla hash garantiza búsqueda constante en toda ejecución?",
      "answer": "No: depende de distribución, carga y resolución de colisiones; distinguir coste esperado de peor caso.",
      "sourceIds": [
        "sci-cs50",
        "sci-cs103"
      ],
      "scopeNote": "Ampliar árboles balanceados y pruebas de complejidad con material específico."
    },
    {
      "id": "CST-006",
      "focus": [
        "Búsqueda",
        "ordenamiento",
        "invariantes",
        "recursión",
        "complejidad"
      ],
      "practice": "Implementa búsqueda binaria y ordenamiento por mezcla; contrasta con un oráculo sencillo en entradas aleatorias.",
      "checks": [
        "Declara precondiciones",
        "Prueba duplicados y vacío",
        "Justifica el coste asintótico"
      ],
      "question": "¿Búsqueda binaria funciona sobre cualquier colección?",
      "answer": "Requiere un orden compatible y acceso apropiado; sin esos supuestos su corrección o coste cambia.",
      "sourceIds": [
        "sci-cs50",
        "sci-cs103"
      ],
      "scopeNote": "Los ejercicios son propios; completar demostraciones y más familias de algoritmos."
    },
    {
      "id": "CST-007",
      "focus": [
        "Programación dinámica",
        "greedy",
        "backtracking",
        "grafos",
        "optimalidad"
      ],
      "practice": "Resuelve selección de tareas con una estrategia voraz y construye un problema parecido donde falle.",
      "checks": [
        "Identifica la propiedad voraz",
        "Comprueba óptimo por enumeración pequeña",
        "Explica el contraejemplo"
      ],
      "question": "¿Una estrategia que funciona en ejemplos prueba optimalidad?",
      "answer": "No; se necesita un argumento que cubra todas las instancias bajo las hipótesis del problema.",
      "sourceIds": [
        "sci-cs103",
        "sci-fing"
      ],
      "scopeNote": "Recurso general de fundamentos; seleccionar curso de algoritmos y sus prácticos para profundidad completa."
    },
    {
      "id": "CST-008",
      "focus": [
        "Recurrencias",
        "análisis amortizado",
        "cotas",
        "complejidad espacial",
        "modelos de coste"
      ],
      "practice": "Analiza una estructura con duplicación de capacidad y contrasta coste por operación con coste agregado.",
      "checks": [
        "Distingue caso peor y amortizado",
        "Expone modelo de coste",
        "Separa memoria de tiempo"
      ],
      "question": "¿Coste amortizado constante significa que toda operación es constante?",
      "answer": "No: algunas pueden ser costosas, pero el total de una secuencia está acotado proporcionalmente a su longitud.",
      "sourceIds": [
        "sci-cs103",
        "sci-fing"
      ],
      "scopeNote": "Ampliar técnicas de prueba y algoritmos avanzados; no se verifica cobertura total con un catálogo."
    },
    {
      "id": "CST-009",
      "focus": [
        "Funciones puras",
        "inmutabilidad",
        "orden superior",
        "recursión",
        "efectos"
      ],
      "practice": "Reescribe una transformación de registros como composición de funciones puras y aísla los efectos.",
      "checks": [
        "No modifica entradas",
        "Prueba composición",
        "Documenta dónde ocurre la entrada/salida"
      ],
      "question": "¿Una función determinista es necesariamente pura?",
      "answer": "No si produce efectos externos; pureza exige además ausencia de efectos observables relevantes.",
      "sourceIds": [
        "sci-python"
      ],
      "scopeNote": "Apoyo conceptual e implementación multiparadigma; falta curso específico de lenguaje funcional tipado."
    },
    {
      "id": "CST-010",
      "focus": [
        "Hechos",
        "reglas",
        "unificación",
        "búsqueda lógica",
        "negación"
      ],
      "practice": "Define un pequeño sistema de parentescos ficticios y consulta relaciones recursivas evitando ciclos.",
      "checks": [
        "Explica variables libres",
        "Prueba consultas verdaderas y falsas",
        "Documenta límites de negación por fallo"
      ],
      "question": "¿No poder demostrar una afirmación implica que es falsa en lógica clásica?",
      "answer": "No; la negación por fallo es una decisión operacional bajo supuestos, no una equivalencia general.",
      "sourceIds": [
        "sci-prolog",
        "sci-discreta"
      ],
      "scopeNote": "Material oficial en inglés; ampliar semántica y resolución para cerrar el curso."
    },
    {
      "id": "CST-011",
      "focus": [
        "Procesos",
        "hilos",
        "sincronización",
        "carreras",
        "interbloqueo"
      ],
      "practice": "Construye un contador concurrente con versión defectuosa y otra sincronizada, y documenta una intercalación que explica el fallo.",
      "checks": [
        "Reproduce o razona la carrera",
        "Expone sección crítica",
        "Prueba terminación y resultados"
      ],
      "question": "¿No observar una carrera en muchas ejecuciones demuestra que no existe?",
      "answer": "No: puede depender de una planificación no observada; se necesita análisis de intercalaciones y contratos.",
      "sourceIds": [
        "sci-ehu-concurrent",
        "sci-tla"
      ],
      "scopeNote": "Curso de2016: revisar compatibilidad y no depender solo de pruebas probabilísticas."
    },
    {
      "id": "CST-012",
      "focus": [
        "Paralelismo de datos",
        "particionado",
        "reducción",
        "speedup",
        "comunicación"
      ],
      "practice": "Paraleliza una reducción grande y compara ejecución secuencial con varias particiones.",
      "checks": [
        "Verifica equivalencia numérica",
        "Separa preparación y cómputo",
        "Reporta sobrecoste de coordinación"
      ],
      "question": "¿Doblar trabajadores siempre reduce a la mitad el tiempo?",
      "answer": "No: fracciones secuenciales, comunicación, memoria y coordinación limitan la ganancia.",
      "sourceIds": [
        "sci-cuda",
        "sci-scipy"
      ],
      "scopeNote": "La referencia GPU es una plataforma concreta; completar CPU multicore y programación distribuida."
    },
    {
      "id": "CST-013",
      "focus": [
        "Kernels",
        "SIMT",
        "jerarquía de memoria",
        "coalescencia",
        "transferencias"
      ],
      "practice": "Implementa suma vectorial y una reducción pequeña en GPU compatible; si no hay acceso, analiza kernels y estima costes sin afirmar mediciones.",
      "checks": [
        "Valida resultados frente a CPU",
        "Incluye transferencias en el tiempo",
        "Declara hardware y versión"
      ],
      "question": "¿Más hilos siempre significa mayor rendimiento?",
      "answer": "No: recursos, ocupación, accesos a memoria y divergencia pueden limitar o empeorar el rendimiento.",
      "sourceIds": [
        "sci-cuda"
      ],
      "scopeNote": "Requiere hardware compatible; análisis sin ejecución no se registra como laboratorio ejecutado."
    },
    {
      "id": "CST-014",
      "focus": [
        "Pipelines",
        "códigos de salida",
        "quoting",
        "archivos",
        "automatización repetible"
      ],
      "practice": "Automatiza el inventario de un directorio de pruebas y haz que el script falle explícitamente ante un archivo ilegible.",
      "checks": [
        "Prueba nombres con espacios",
        "Conserva códigos de error",
        "Limita escritura al directorio de prueba"
      ],
      "question": "¿Un pipeline exitoso garantiza que todos sus comandos tuvieron éxito?",
      "answer": "Depende del intérprete y su configuración; deben revisarse códigos y propagación de fallos.",
      "sourceIds": [
        "sci-python"
      ],
      "scopeNote": "Apoyo para automatización general; faltan aquí referencias específicas de Bash y PowerShell, a incorporar antes de dar por cerrada la materia."
    },
    {
      "id": "CST-015",
      "focus": [
        "Representación binaria",
        "registros",
        "pila",
        "convención de llamadas",
        "ensamblador"
      ],
      "practice": "Inspecciona ensamblador producido por una función C simple y relaciona instrucciones con una llamada y acceso a memoria.",
      "checks": [
        "Declara arquitectura y compilador",
        "No presupone correspondencia uno a uno",
        "Explica el marco de pila observado"
      ],
      "question": "¿El mismo programa C produce el mismo ensamblador en todo equipo?",
      "answer": "No: arquitectura, ABI, compilador y optimización cambian el código generado.",
      "sourceIds": [
        "sci-llvm",
        "sci-cs50"
      ],
      "scopeNote": "Ampliar ISA/ABI oficial de la arquitectura elegida; no se verificó un curso completo de ensamblador."
    },
    {
      "id": "CST-016",
      "focus": [
        "RAII",
        "ownership",
        "contenedores",
        "plantillas",
        "semántica de movimiento"
      ],
      "practice": "Implementa un recurso con RAII y compara copia, movimiento y liberación en pruebas pequeñas.",
      "checks": [
        "Evita fugas y doble liberación",
        "Explica vida útil",
        "No usa punteros crudos sin contrato"
      ],
      "question": "¿std::move mueve un objeto por sí solo?",
      "answer": "Produce una conversión que permite seleccionar operaciones de movimiento; el efecto depende de la operación llamada.",
      "sourceIds": [
        "sci-cpp"
      ],
      "scopeNote": "Referencia de C++ moderno; completar biblioteca, concurrencia y modelo de memoria."
    },
    {
      "id": "CST-017",
      "focus": [
        "Tipos Java",
        "colecciones",
        "excepciones",
        "JVM",
        "concurrencia"
      ],
      "practice": "Construye una aplicación CLI que procese registros y compare dos colecciones para una tarea definida.",
      "checks": [
        "Usa generics coherentes",
        "Prueba errores",
        "Registra versión JDK"
      ],
      "question": "¿Los tutoriales de JDK8 describen todas las prácticas actuales?",
      "answer": "No: algunas tecnologías han cambiado o desaparecido; usar documentación correspondiente al JDK elegido.",
      "sourceIds": [
        "sci-java"
      ],
      "scopeNote": "Material oficial actual en inglés; no implica cubrir todo el ecosistema JVM."
    },
    {
      "id": "CST-018",
      "focus": [
        "Tipos C#",
        "LINQ",
        "async/await",
        "excepciones",
        ".NET"
      ],
      "practice": "Crea una herramienta que lea archivos de muestra de forma asíncrona y agregue estadísticas.",
      "checks": [
        "Gestiona cancelación",
        "Distingue I/O y CPU",
        "Prueba errores y recursos liberados"
      ],
      "question": "¿async implica crear un hilo nuevo por llamada?",
      "answer": "No; expresa asincronía y la ejecución depende de las operaciones y del entorno.",
      "sourceIds": [
        "sci-csharp"
      ],
      "scopeNote": "Documentación en español y ejemplos; ampliar runtime, pruebas y publicación local."
    },
    {
      "id": "CST-019",
      "focus": [
        "Módulos Go",
        "interfaces",
        "goroutines",
        "canales",
        "contexto"
      ],
      "practice": "Implementa un servicio local con trabajadores acotados, cancelación y manejo de errores.",
      "checks": [
        "Limita concurrencia",
        "No deja goroutines bloqueadas",
        "Prueba cancelación"
      ],
      "question": "¿Un canal elimina automáticamente las carreras?",
      "answer": "No: siguen siendo posibles si se comparte memoria sin contratos adecuados.",
      "sourceIds": [
        "sci-go"
      ],
      "scopeNote": "El tutorial inicial no cubre toda la ingeniería de servicios; completar biblioteca y concurrencia oficial."
    },
    {
      "id": "CST-020",
      "focus": [
        "Ownership",
        "préstamos",
        "vidas útiles",
        "Result",
        "rasgos"
      ],
      "practice": "Construye un parser de registros en Rust que devuelva errores tipados y no use unsafe.",
      "checks": [
        "Compila con préstamos válidos",
        "Cubre entradas malformadas",
        "Explica quién posee cada dato"
      ],
      "question": "¿Rust evita todo error lógico?",
      "answer": "No: sus garantías de seguridad de memoria no prueban la especificación funcional ni eliminan todos los bloqueos o fallos de diseño.",
      "sourceIds": [
        "sci-rust"
      ],
      "scopeNote": "Libro oficial en inglés; traducciones comunitarias requieren comprobar versión."
    },
    {
      "id": "CST-021",
      "focus": [
        "Arrays",
        "vectorización",
        "precisión",
        "SciPy",
        "reproducibilidad"
      ],
      "practice": "Implementa un cálculo numérico con bucles y con arrays, comparando resultado, error y tiempo.",
      "checks": [
        "Controla dtype",
        "Separa tolerancia y igualdad exacta",
        "Versiona el entorno"
      ],
      "question": "¿Vectorizar mejora siempre cualquier cálculo?",
      "answer": "No; depende de memoria, tamaño, operaciones y bibliotecas, y puede cambiar el orden de redondeo.",
      "sourceIds": [
        "sci-python",
        "sci-scipy",
        "sci-cs50-python"
      ],
      "scopeNote": "Ampliar NumPy y métodos científicos específicos; no confundir rendimiento con validez del modelo."
    },
    {
      "id": "CST-022",
      "focus": [
        "Matrices Octave",
        "indexación",
        "funciones",
        "solución lineal",
        "gráficos"
      ],
      "practice": "Resuelve un sistema lineal y un ajuste polinómico en Octave, contrastando con Python.",
      "checks": [
        "Usa solución numérica sin invertir innecesariamente",
        "Mide residuo",
        "Documenta incompatibilidades observadas"
      ],
      "question": "¿Octave ejecuta sin cambios cualquier toolbox de MATLAB?",
      "answer": "No; la compatibilidad es parcial y depende de funciones, paquetes y versiones.",
      "sourceIds": [
        "sci-octave",
        "sci-scipy"
      ],
      "scopeNote": "Ruta local gratuita mediante Octave; MATLAB y ciertas toolboxes requieren licencias aparte."
    },
    {
      "id": "CST-023",
      "focus": [
        "Expresiones regulares",
        "autómatas finitos",
        "gramáticas",
        "pushdown",
        "lenguajes"
      ],
      "practice": "Diseña un autómata para un formato de identificadores y una gramática para expresiones anidadas.",
      "checks": [
        "Explica alfabeto",
        "Prueba aceptación y rechazo",
        "Distingue regular de libre de contexto"
      ],
      "question": "¿Una expresión regular clásica reconoce anidamiento arbitrario de paréntesis?",
      "answer": "No; esa estructura requiere memoria no acotada que un autómata finito no tiene.",
      "sourceIds": [
        "sci-cs103",
        "sci-llvm"
      ],
      "scopeNote": "Usar teoría formal, no atribuir capacidades de extensiones prácticas a expresiones regulares clásicas."
    },
    {
      "id": "CST-024",
      "focus": [
        "Máquinas de Turing",
        "decidibilidad",
        "reducciones",
        "enumerabilidad",
        "diagonalización"
      ],
      "practice": "Escribe una reducción razonada entre dos problemas de decisión sencillos y delimita una afirmación de indecidibilidad.",
      "checks": [
        "Define instancia y respuesta",
        "Explica transformación efectiva",
        "No confunde no saber algoritmo con imposibilidad probada"
      ],
      "question": "¿Un problema sin algoritmo conocido es necesariamente indecidible?",
      "answer": "No: ausencia de conocimiento no es prueba de imposibilidad; se necesita un argumento matemático.",
      "sourceIds": [
        "sci-cs103"
      ],
      "scopeNote": "Introducción a computabilidad; completar ejercicios y revisión de pruebas."
    },
    {
      "id": "CST-025",
      "focus": [
        "P",
        "NP",
        "reducciones polinomiales",
        "NP-completitud",
        "verificación"
      ],
      "practice": "Explica un certificado para un problema combinatorio y comprueba pequeños casos por búsqueda exhaustiva.",
      "checks": [
        "Distingue decidir y verificar",
        "Da cota polinomial del verificador",
        "No presenta P frente a NP como resuelto"
      ],
      "question": "¿NP significa problemas que no son polinomiales?",
      "answer": "No; describe verificabilidad nondeterminista/polinomial de certificados bajo la formulación habitual, y P está contenido en NP.",
      "sourceIds": [
        "sci-cs103"
      ],
      "scopeNote": "Curso de fundamentos; ampliar jerarquías y complejidad avanzada según objetivo."
    },
    {
      "id": "CST-026",
      "focus": [
        "Evaluación",
        "alcance",
        "tipos",
        "semántica operacional",
        "efectos"
      ],
      "practice": "Define reglas de evaluación para un lenguaje de expresiones con variables y compara alcance léxico y dinámico.",
      "checks": [
        "Especifica entornos",
        "Resuelve ejemplos ambiguos",
        "Separa sintaxis de significado"
      ],
      "question": "¿Dos programas con igual salida en un ejemplo son semánticamente equivalentes?",
      "answer": "No: equivalencia exige considerar observaciones y entradas bajo una semántica definida.",
      "sourceIds": [
        "sci-llvm",
        "sci-lean"
      ],
      "scopeNote": "LLVM apoya implementación y Lean razonamiento; falta curso íntegro de semántica de lenguajes."
    },
    {
      "id": "CST-027",
      "focus": [
        "Lexer",
        "parser",
        "AST",
        "tipado",
        "intérprete"
      ],
      "practice": "Diseña un lenguaje pequeño con funciones y un intérprete; documenta gramática, errores y decisiones.",
      "checks": [
        "Prueba precedencia",
        "Reporta errores de ubicación",
        "Separa análisis y ejecución"
      ],
      "question": "¿Aceptar sintaxis implica que el programa tiene sentido semántico?",
      "answer": "No: pueden fallar nombres, tipos o condiciones de ejecución después del análisis sintáctico.",
      "sourceIds": [
        "sci-llvm"
      ],
      "scopeNote": "Tutorial de un frontend pequeño, no cobertura de todos los paradigmas de lenguaje."
    },
    {
      "id": "CST-028",
      "focus": [
        "Análisis léxico",
        "parsing",
        "IR",
        "tabla de símbolos",
        "generación de código"
      ],
      "practice": "Compila un subconjunto de expresiones a una IR y contrasta ejecución con un intérprete de referencia.",
      "checks": [
        "Conserva significado",
        "Prueba casos límite",
        "Explica la representación intermedia"
      ],
      "question": "¿El compilador tiene que generar directamente código máquina?",
      "answer": "No: puede traducir a otra representación o lenguaje; lo esencial es la traducción con semántica definida.",
      "sourceIds": [
        "sci-llvm"
      ],
      "scopeNote": "Completar teoría de parsing y traducción, además del tutorial práctico."
    },
    {
      "id": "CST-029",
      "focus": [
        "Análisis de flujo",
        "SSA",
        "propagación",
        "eliminación de código",
        "coste"
      ],
      "practice": "Implementa una optimización local de constantes en una IR mínima y compara resultados antes/después.",
      "checks": [
        "Define precondiciones",
        "Prueba preservación semántica en casos límite",
        "No confunde tamaño con tiempo de ejecución"
      ],
      "question": "¿Toda transformación que acorta código mejora el rendimiento?",
      "answer": "No: coste de ejecución, arquitectura y optimizaciones posteriores pueden producir efectos distintos.",
      "sourceIds": [
        "sci-llvm"
      ],
      "scopeNote": "Ampliar análisis de datos y pruebas de corrección; el tutorial no cubre optimización industrial completa."
    },
    {
      "id": "CST-030",
      "focus": [
        "Especificación",
        "invariantes",
        "precondiciones",
        "postcondiciones",
        "prueba asistida"
      ],
      "practice": "Formaliza una función sobre listas y demuestra una propiedad pequeña mediante inducción en Lean.",
      "checks": [
        "Explicita hipótesis",
        "No deja huecos admitidos en la prueba entregada",
        "Relaciona teorema con implementación"
      ],
      "question": "¿Una prueba formal garantiza que la especificación representa la necesidad real?",
      "answer": "No: valida una afirmación formal bajo sus hipótesis; la adecuación de la especificación necesita otra revisión.",
      "sourceIds": [
        "sci-lean",
        "sci-tla"
      ],
      "scopeNote": "Material técnico en inglés; se requiere práctica guiada y revisión de especificación."
    },
    {
      "id": "CST-031",
      "focus": [
        "Sistemas de transición",
        "seguridad",
        "vivacidad",
        "exploración de estados",
        "contraejemplos"
      ],
      "practice": "Modela exclusión mutua pequeña y usa un model checker para buscar violaciones, incluyendo una versión defectuosa.",
      "checks": [
        "Distingue invariante y progreso",
        "Explica límite del modelo",
        "Interpreta la traza de contraejemplo"
      ],
      "question": "¿No encontrar errores en un modelo finito prueba cualquier implementación real?",
      "answer": "No: la conclusión depende de abstracción, límites de estados y correspondencia con el sistema real.",
      "sourceIds": [
        "sci-tla"
      ],
      "scopeNote": "Completar herramientas y métodos simbólicos; model checking no equivale a probar cualquier programa."
    },
    {
      "id": "CST-032",
      "focus": [
        "Algoritmos aleatorizados",
        "esperanza",
        "probabilidad de fallo",
        "aproximación",
        "cotas"
      ],
      "practice": "Compara un algoritmo aproximado con óptimos exhaustivos en instancias pequeñas y registra distribución de errores.",
      "checks": [
        "Fija y varía semillas",
        "Separa garantía teórica y resultados empíricos",
        "Explica la razón de aproximación"
      ],
      "question": "¿Una buena media experimental demuestra una cota de aproximación?",
      "answer": "No: la garantía necesita una demostración para todas las instancias incluidas en el modelo.",
      "sourceIds": [
        "sci-cs103",
        "sci-scipy"
      ],
      "scopeNote": "Las fuentes enlazadas apoyan fundamentos y experimentación; falta curso específico de algoritmos aleatorizados avanzados."
    },
    {
      "id": "CST-033",
      "focus": [
        "Aritmética modular",
        "grupos",
        "primos",
        "inversos",
        "seguridad matemática"
      ],
      "practice": "Construye un ejemplo didáctico de intercambio modular con números pequeños y explica por qué no es seguro para uso real.",
      "checks": [
        "Comprueba operaciones",
        "Distingue corrección de seguridad",
        "No reutiliza parámetros didácticos en producción"
      ],
      "question": "¿Un esquema que funciona matemáticamente ya es criptográficamente seguro?",
      "answer": "No: la seguridad depende de supuestos, tamaños, aleatoriedad, implementación y modelo de adversario.",
      "sourceIds": [
        "sci-discreta",
        "sci-nist-pqc"
      ],
      "scopeNote": "Ejercicio matemático; los estándares poscuánticos son contraste, no curso completo de criptografía clásica."
    },
    {
      "id": "DAI-001",
      "focus": [
        "Relaciones",
        "SELECT",
        "filtros",
        "agregación",
        "joins"
      ],
      "practice": "Crea una base de pedidos ficticios y responde cinco preguntas de negocio mediante SQL.",
      "checks": [
        "Explicita claves",
        "Prueba filas sin coincidencia",
        "Contrasta agregaciones con un cálculo manual"
      ],
      "question": "¿Un join conserva siempre el número de filas de la tabla izquierda?",
      "answer": "No: multiplicidades y tipo de unión pueden duplicar o eliminar filas; hay que conocer cardinalidades y claves.",
      "sourceIds": [
        "sci-postgres"
      ],
      "scopeNote": "Introducción SQL con base local; ampliar transacciones y diseño en materias posteriores."
    },
    {
      "id": "DAI-002",
      "focus": [
        "Modelo entidad-relación",
        "claves",
        "dependencias",
        "normalización",
        "restricciones"
      ],
      "practice": "Diseña un esquema de biblioteca y demuestra cómo evita dos anomalías de actualización.",
      "checks": [
        "Declara dependencias",
        "Incluye integridad referencial",
        "Justifica desnormalización si existe"
      ],
      "question": "¿Normalizar garantiza que todas las consultas serán rápidas?",
      "answer": "No: persigue reducir anomalías bajo dependencias; rendimiento requiere además diseño físico y cargas reales.",
      "sourceIds": [
        "sci-postgres"
      ],
      "scopeNote": "El manual apoya implementación; completar teoría de dependencias y normalización."
    },
    {
      "id": "DAI-003",
      "focus": [
        "Plan de ejecución",
        "índices",
        "ventanas",
        "CTE",
        "coste"
      ],
      "practice": "Optimiza una consulta sobre datos sintéticos y compara planes antes/después de un índice.",
      "checks": [
        "Conserva resultado",
        "Registra plan y tamaño",
        "No atribuye mejoras a caché sin control"
      ],
      "question": "¿Un índice acelera siempre una consulta?",
      "answer": "No: selectividad, coste de acceso, tamaño y mantenimiento pueden volverlo inútil o perjudicial.",
      "sourceIds": [
        "sci-postgres"
      ],
      "scopeNote": "Usar la sección SQL y EXPLAIN del manual; el tutorial inicial no basta por sí solo."
    },
    {
      "id": "DAI-004",
      "focus": [
        "Roles",
        "respaldo",
        "restauración",
        "mantenimiento",
        "monitorización"
      ],
      "practice": "Configura una base local de práctica con rol limitado, respaldo y restauración en una instancia separada.",
      "checks": [
        "Prueba acceso mínimo",
        "Restaura y compara datos",
        "Documenta objetivos de recuperación"
      ],
      "question": "¿Tener un archivo de backup demuestra recuperabilidad?",
      "answer": "No: la recuperación debe probarse con el procedimiento, claves, versiones y dependencias necesarios.",
      "sourceIds": [
        "sci-postgres"
      ],
      "scopeNote": "Laboratorio aislado; no ejecutar procedimientos en bases productivas sin autorización."
    },
    {
      "id": "DAI-005",
      "focus": [
        "Documentos",
        "modelado embebido",
        "índices",
        "consultas",
        "consistencia"
      ],
      "practice": "Representa un catálogo ficticio en documentos y compara incrustación con referencias para dos patrones de consulta.",
      "checks": [
        "Justifica límites de documento",
        "Prueba actualizaciones",
        "Mide duplicación y consultas"
      ],
      "question": "¿NoSQL significa ausencia de esquema?",
      "answer": "No: el esquema existe en datos y aplicación aunque su imposición sea distinta o flexible.",
      "sourceIds": [
        "sci-mongo"
      ],
      "scopeNote": "Una base documental no cubre todas las familias NoSQL."
    },
    {
      "id": "DAI-006",
      "focus": [
        "Replicación",
        "particionado",
        "fallos",
        "consistencia",
        "transacciones distribuidas"
      ],
      "practice": "Modela tres réplicas de un contador y describe qué observa cada cliente durante una partición simulada.",
      "checks": [
        "Define modelo de fallos",
        "Distingue disponibilidad y consistencia",
        "Explica reconciliación"
      ],
      "question": "¿Más réplicas garantiza consistencia fuerte?",
      "answer": "No: la garantía depende del protocolo, quórums, sincronía y semántica de lectura/escritura.",
      "sourceIds": [
        "sci-mongo",
        "sci-postgres"
      ],
      "scopeNote": "Los manuales aportan mecanismos concretos; ampliar teoría distribuida y no extrapolar garantías entre motores."
    },
    {
      "id": "DAI-007",
      "focus": [
        "Hechos",
        "dimensiones",
        "granularidad",
        "SCD",
        "medidas"
      ],
      "practice": "Construye un esquema estrella de ventas ficticias con una dimensión de historial.",
      "checks": [
        "Fija grano de la tabla de hechos",
        "Evita doble conteo",
        "Distingue medidas aditivas y semi-aditivas"
      ],
      "question": "¿Se puede sumar cualquier indicador entre periodos?",
      "answer": "No: ratios, saldos y medidas semiaditivas requieren agregación adecuada.",
      "sourceIds": [
        "sci-powerbi",
        "sci-postgres"
      ],
      "scopeNote": "Completar modelado dimensional más allá de la herramienta de visualización."
    },
    {
      "id": "DAI-008",
      "focus": [
        "Extracción",
        "transformación",
        "carga",
        "idempotencia",
        "contratos de datos"
      ],
      "practice": "Implementa un pipeline local CSV a SQL que soporte reejecución sin duplicar registros.",
      "checks": [
        "Valida esquema",
        "Registra rechazos",
        "Prueba una segunda ejecución"
      ],
      "question": "¿Reintentar una carga es siempre seguro?",
      "answer": "Solo si se ha diseñado idempotencia o un mecanismo equivalente de deduplicación y recuperación.",
      "sourceIds": [
        "sci-airflow",
        "sci-postgres"
      ],
      "scopeNote": "La plataforma de orquestación no sustituye reglas de transformación y calidad."
    },
    {
      "id": "DAI-009",
      "focus": [
        "Completitud",
        "validez",
        "frescura",
        "linaje",
        "alertas"
      ],
      "practice": "Define pruebas para un conjunto sintético con nulos, duplicados y retrasos inyectados.",
      "checks": [
        "Distingue regla de síntoma",
        "Detecta fallos inyectados",
        "Evita alertas sin acción definida"
      ],
      "question": "¿Un dato que cumple el tipo declarado es correcto?",
      "answer": "No necesariamente: puede ser semánticamente incorrecto, desactualizado o incoherente con otras fuentes.",
      "sourceIds": [
        "sci-airflow",
        "sci-postgres"
      ],
      "scopeNote": "Añadir herramientas específicas de observabilidad según el proyecto; no basta un dashboard."
    },
    {
      "id": "DAI-010",
      "focus": [
        "Catálogo",
        "propiedad del dato",
        "linaje",
        "clasificación",
        "retención"
      ],
      "practice": "Documenta un flujo de datos ficticios de extremo a extremo con responsable, propósito y reglas de acceso.",
      "checks": [
        "Identifica origen y transformaciones",
        "Separa metadatos y secretos",
        "Justifica minimización"
      ],
      "question": "¿Un catálogo de tablas equivale a gobierno de datos?",
      "answer": "No: gobierno incluye decisiones, responsabilidades, calidad y controles durante el ciclo de vida.",
      "sourceIds": [
        "sci-postgres",
        "sci-fhir"
      ],
      "scopeNote": "Apoyo técnico parcial; faltan marcos de gobierno y requisitos jurisdiccionales del caso real."
    },
    {
      "id": "DAI-011",
      "focus": [
        "Ingesta",
        "formatos",
        "particiones",
        "orquestación",
        "pruebas"
      ],
      "practice": "Construye un pipeline de datos de sensores simulados con zonas de entrada, validación y consumo.",
      "checks": [
        "Preserva datos originales",
        "Versiona transformaciones",
        "Prueba entradas tardías y corruptas"
      ],
      "question": "¿Separar carpetas crea por sí solo una arquitectura fiable?",
      "answer": "No: deben existir contratos, responsabilidades, controles y recuperación entre etapas.",
      "sourceIds": [
        "sci-airflow",
        "sci-spark"
      ],
      "scopeNote": "Práctica local de ingeniería de datos; no equivale a operación de gran escala."
    },
    {
      "id": "DAI-012",
      "focus": [
        "Cambios de esquema",
        "CDC",
        "backfill",
        "contrapresión",
        "recuperación"
      ],
      "practice": "Diseña la evolución de un pipeline cuando cambia una columna y llegan eventos retrasados.",
      "checks": [
        "Prueba compatibilidad",
        "No reescribe sin trazabilidad",
        "Documenta recuperación"
      ],
      "question": "¿Un backfill debe producir siempre los mismos resultados que la carga original?",
      "answer": "Solo bajo las mismas reglas y fuentes versionadas; cambios de datos o lógica deben quedar explícitos.",
      "sourceIds": [
        "sci-airflow",
        "sci-spark"
      ],
      "scopeNote": "Ampliar CDC y sistemas distribuidos específicos antes de aplicar a producción."
    },
    {
      "id": "DAI-013",
      "focus": [
        "DataFrames",
        "particionado",
        "shuffle",
        "joins distribuidos",
        "planes"
      ],
      "practice": "Ejecuta una agregación y un join en Spark local, variando particiones y observando el plan.",
      "checks": [
        "Comprueba resultados",
        "Explica al menos un shuffle",
        "No vende modo local como prueba de escala"
      ],
      "question": "¿Tener muchas particiones garantiza paralelismo eficiente?",
      "answer": "No: tamaño, distribución, recursos y coste de planificación condicionan el rendimiento.",
      "sourceIds": [
        "sci-spark"
      ],
      "scopeNote": "La práctica local ilustra mecanismos; las garantías a escala requieren un clúster y medición real."
    },
    {
      "id": "DAI-014",
      "focus": [
        "Tiempo de evento",
        "ventanas",
        "watermarks",
        "estado",
        "semántica de entrega"
      ],
      "practice": "Procesa una secuencia sintética con eventos fuera de orden y compara dos políticas de ventana.",
      "checks": [
        "Declara tiempo usado",
        "Prueba duplicados",
        "Explica eventos descartados o actualizados"
      ],
      "question": "¿Exactly-once significa que no hay ningún reintento?",
      "answer": "No: suele ser una garantía sobre efectos observables bajo condiciones específicas, no ausencia física de reejecución.",
      "sourceIds": [
        "sci-spark"
      ],
      "scopeNote": "Comprobar garantías concretas del motor, fuente y destino; no se extrapolan entre sistemas."
    },
    {
      "id": "DAI-015",
      "focus": [
        "Lagos de datos",
        "tablas transaccionales",
        "metadatos",
        "evolución",
        "versionado"
      ],
      "practice": "Diseña un pequeño repositorio analítico con archivos columnares y compara snapshot completo con actualización incremental.",
      "checks": [
        "Documenta esquema",
        "Distingue formato y motor",
        "Prueba lectura consistente del snapshot"
      ],
      "question": "¿Usar Parquet crea automáticamente un lakehouse?",
      "answer": "No: hacen falta mecanismos de tabla, transacción, catálogo y gestión adicionales.",
      "sourceIds": [
        "sci-spark",
        "sci-postgres"
      ],
      "scopeNote": "Las fuentes apoyan conceptos y ejecución; falta referencia específica del formato de tabla lakehouse elegido."
    },
    {
      "id": "DAI-016",
      "focus": [
        "Indexación",
        "ranking",
        "precisión",
        "recall",
        "recuperación semántica"
      ],
      "practice": "Construye un buscador sobre veinte documentos propios y evalúalo con consultas y juicios de relevancia separados.",
      "checks": [
        "Define corpus",
        "Mide una métrica de ranking",
        "Compara con búsqueda léxica sencilla"
      ],
      "question": "¿Un resultado semánticamente parecido es necesariamente relevante?",
      "answer": "No: relevancia depende de la necesidad de información y debe evaluarse con criterios definidos.",
      "sourceIds": [
        "sci-fiuba-nlp",
        "sci-hf"
      ],
      "scopeNote": "Ampliar índices y sistemas de búsqueda; no confundir demo con evaluación de recuperación."
    },
    {
      "id": "DAI-017",
      "focus": [
        "Grafos",
        "entidades",
        "relaciones",
        "ontologías",
        "consultas de caminos"
      ],
      "practice": "Modela relaciones entre proyectos ficticios y personas, y compara consulta tabular y de grafo.",
      "checks": [
        "Distingue entidad de etiqueta",
        "Explicita semántica de relaciones",
        "Prueba duplicados de identidad"
      ],
      "question": "¿Todo grafo de datos es un grafo de conocimiento?",
      "answer": "No necesariamente: la semántica, identidad y relaciones modeladas determinan qué conocimiento representa.",
      "sourceIds": [
        "sci-spark",
        "sci-ebi"
      ],
      "scopeNote": "GraphX y recursos biológicos son apoyo parcial; falta curso de RDF/OWL y motor de grafos específico."
    },
    {
      "id": "DAI-018",
      "focus": [
        "Power Query",
        "tipos",
        "limpieza",
        "joins",
        "actualización"
      ],
      "practice": "Limpia tres archivos de ventas ficticias, registra transformaciones y repite el proceso con un cuarto archivo.",
      "checks": [
        "No altera originales",
        "Comprueba tipos y claves",
        "Detecta un cambio de esquema"
      ],
      "question": "¿Una transformación que funciona en la muestra funciona en todos los archivos futuros?",
      "answer": "No: los supuestos de estructura y valores deben probarse y vigilarse.",
      "sourceIds": [
        "sci-powerbi"
      ],
      "scopeNote": "Contenido PowerQuery transferible; disponibilidad de Excel y conectores depende de licencia/plataforma."
    },
    {
      "id": "DAI-019",
      "focus": [
        "Modelo tabular",
        "relaciones",
        "contexto de filtro",
        "DAX",
        "medidas"
      ],
      "practice": "Crea medidas de total, participación y variación temporal en un modelo pequeño.",
      "checks": [
        "Comprueba denominadores",
        "Explica contexto de filtro",
        "Contrasta resultados a mano"
      ],
      "question": "¿Una columna calculada y una medida se evalúan del mismo modo?",
      "answer": "No: difieren en momento/contexto de evaluación y en cómo responden a filtros.",
      "sourceIds": [
        "sci-powerbi"
      ],
      "scopeNote": "Ampliar DAX y modelado tabular con módulos concretos del portal oficial."
    },
    {
      "id": "DAI-020",
      "focus": [
        "Modelado PowerBI",
        "transformación",
        "visualización",
        "seguridad",
        "rendimiento"
      ],
      "practice": "Construye un informe de datos sintéticos con modelo estrella y dos roles conceptuales de acceso.",
      "checks": [
        "Evita relaciones ambiguas",
        "Verifica agregaciones",
        "Documenta qué funciones requieren licencia"
      ],
      "question": "¿Un informe privado en desarrollo puede publicarse libremente con datos reales?",
      "answer": "No: publicación, licencias y privacidad se evalúan por separado; usar datos sintéticos para practicar.",
      "sourceIds": [
        "sci-powerbi"
      ],
      "scopeNote": "El aprendizaje es gratuito; compartir contenido o capacidades puede tener coste."
    },
    {
      "id": "DAI-021",
      "focus": [
        "Dimensiones y medidas",
        "filtros",
        "interacción",
        "dashboards",
        "accesibilidad"
      ],
      "practice": "Diseña un tablero equivalente en Tableau si tienes acceso permitido y en una alternativa local, documentando diferencias.",
      "checks": [
        "No sube datos privados a servicios públicos",
        "Explica agregación",
        "Prueba navegación y lectura accesible"
      ],
      "question": "¿Cambiar de herramienta conserva automáticamente el significado de una medida?",
      "answer": "No: reglas de agregación, cálculo y filtro deben comprobarse en cada implementación.",
      "sourceIds": [
        "sci-powerbi"
      ],
      "scopeNote": "Apoyo conceptual de BI; no se verificó aquí un curso ni licencia gratuita integral de Tableau."
    },
    {
      "id": "DAI-022",
      "focus": [
        "Encodings",
        "escalas",
        "incertidumbre",
        "anotaciones",
        "narrativa"
      ],
      "practice": "Representa el mismo conjunto sintético con tres gráficos y argumenta cuál responde mejor una pregunta concreta.",
      "checks": [
        "No distorsiona ejes",
        "Incluye incertidumbre pertinente",
        "Distingue dato y comentario"
      ],
      "question": "¿Una visualización atractiva es necesariamente informativa?",
      "answer": "No: la elección debe responder al propósito, magnitudes, audiencia y limitaciones del dato.",
      "sourceIds": [
        "sci-powerbi",
        "sci-stats"
      ],
      "scopeNote": "Ampliar teoría de visualización y evaluación de usuarios."
    },
    {
      "id": "DAI-023",
      "focus": [
        "Problema de negocio",
        "decisiones",
        "segmentación",
        "valor",
        "restricciones"
      ],
      "practice": "Analiza un proceso ficticio de atención y propone una decisión sustentada con datos y supuestos.",
      "checks": [
        "Vincula métrica y decisión",
        "Compara con una línea base",
        "Expone costes de error"
      ],
      "question": "¿Maximizar una métrica siempre maximiza el valor del negocio?",
      "answer": "No: una métrica es una aproximación y puede omitir costes, restricciones o efectos secundarios.",
      "sourceIds": [
        "sci-powerbi",
        "sci-causal"
      ],
      "scopeNote": "Caso académico; ampliar dominio y validar decisiones con responsables reales."
    },
    {
      "id": "DAI-024",
      "focus": [
        "KPIs",
        "denominadores",
        "guardrails",
        "experimentos",
        "medición"
      ],
      "practice": "Diseña una ficha de indicador para un servicio sintético y prueba cómo cambia con dos definiciones de población.",
      "checks": [
        "Explicita numerador y denominador",
        "Fija periodo y población",
        "Incluye métrica de daño o restricción"
      ],
      "question": "¿Dos equipos con el mismo KPI pueden estar midiendo cosas distintas?",
      "answer": "Sí: diferencias en población, ventana, exclusiones o instrumentación cambian el significado.",
      "sourceIds": [
        "sci-stats",
        "sci-causal"
      ],
      "scopeNote": "No confundir una definición de KPI con prueba de causalidad."
    },
    {
      "id": "DAI-025",
      "focus": [
        "Tendencia",
        "estacionalidad",
        "autocorrelación",
        "validación temporal",
        "pronóstico"
      ],
      "practice": "Evalúa un pronóstico de demanda sintética frente a un predictor ingenuo usando división temporal.",
      "checks": [
        "No mezcla futuro en entrenamiento",
        "Reporta error por horizonte",
        "Incluye baseline estacional cuando corresponda"
      ],
      "question": "¿Dividir aleatoriamente una serie es siempre una validación válida?",
      "answer": "No: puede filtrar información temporal y cambiar la tarea real de predecir el futuro.",
      "sourceIds": [
        "sci-scipy",
        "sci-fiuba-prob"
      ],
      "scopeNote": "Apoyo estadístico; ampliar modelos y teoría de series con un curso específico."
    },
    {
      "id": "DAI-026",
      "focus": [
        "DAG causal",
        "confusión",
        "aleatorización",
        "identificación",
        "efecto"
      ],
      "practice": "Simula datos con un confusor y compara regresión ingenua con una estimación basada en el DAG declarado.",
      "checks": [
        "Declara supuestos",
        "Identifica ajuste",
        "Realiza prueba de refutación"
      ],
      "question": "¿Que el software estime un efecto demuestra causalidad?",
      "answer": "No: la interpretación depende de diseño y supuestos que el algoritmo no puede verificar completamente.",
      "sourceIds": [
        "sci-causal",
        "sci-stats"
      ],
      "scopeNote": "No aplicar conclusiones de datos sintéticos a decisiones médicas o de política real sin revisión competente."
    },
    {
      "id": "DAI-027",
      "focus": [
        "Sistemas de coordenadas",
        "geometría",
        "joins espaciales",
        "distancias",
        "sesgo espacial"
      ],
      "practice": "Analiza puntos ficticios de sensores y compara distancias en coordenadas geográficas y una proyección apropiada.",
      "checks": [
        "Declara CRS",
        "No confunde grados y metros",
        "Comprueba un caso conocido"
      ],
      "question": "¿La distancia euclídea en latitud/longitud está expresada en metros?",
      "answer": "No: esas coordenadas angulares requieren tratamiento geodésico o proyección adecuada.",
      "sourceIds": [
        "sci-scipy"
      ],
      "scopeNote": "Apoyo computacional parcial; falta material geoespacial específico verificado para cerrar GIS."
    },
    {
      "id": "DAI-028",
      "focus": [
        "Búsqueda",
        "representación",
        "heurísticas",
        "razonamiento",
        "aprendizaje"
      ],
      "practice": "Resuelve un pequeño problema de rutas mediante búsqueda informada y compara con búsqueda uniforme.",
      "checks": [
        "Declara costes",
        "Verifica optimalidad en casos pequeños",
        "Explica efecto de la heurística"
      ],
      "question": "¿Toda heurística produce una solución óptima con A*?",
      "answer": "No: las garantías dependen de admisibilidad, consistencia y detalles del algoritmo y manejo de estados.",
      "sourceIds": [
        "sci-fiuba-ai"
      ],
      "scopeNote": "Fuente concreta de introducción; ampliar lógica y representación del conocimiento."
    },
    {
      "id": "DAI-029",
      "focus": [
        "Particiones de datos",
        "regresión",
        "clasificación",
        "validación",
        "métricas"
      ],
      "practice": "Entrena dos modelos sencillos en datos sintéticos y compara con un predictor constante usando un pipeline sin fuga.",
      "checks": [
        "Ajusta transformaciones solo en entrenamiento",
        "Fija métrica según tarea",
        "Reserva evaluación final"
      ],
      "question": "¿Una precisión alta puede corresponder a un modelo inútil?",
      "answer": "Sí: clases desbalanceadas y costes asimétricos exigen comparar contra baselines y métricas apropiadas.",
      "sourceIds": [
        "sci-googleml",
        "sci-fiuba-ml",
        "sci-sklearn"
      ],
      "scopeNote": "Cubre inicio de ML; requiere probabilidad y programación previas."
    },
    {
      "id": "DAI-030",
      "focus": [
        "Ensembles",
        "regularización",
        "calibración",
        "selección",
        "aprendizaje no supervisado"
      ],
      "practice": "Compara dos ensembles con calibración separada y análisis de errores por subgrupo sintético.",
      "checks": [
        "Evita elegir con el test",
        "Evalúa calibración",
        "No oculta dispersión entre particiones"
      ],
      "question": "¿La mayor exactitud implica mejores probabilidades?",
      "answer": "No: discriminación y calibración son propiedades distintas.",
      "sourceIds": [
        "sci-sklearn",
        "sci-fiuba-ml"
      ],
      "scopeNote": "No usar el repo FIUBA aprendizaje_maquina_II como curso teórico de MLII: actualmente trata MLOps."
    },
    {
      "id": "DAI-031",
      "focus": [
        "Backpropagation",
        "activaciones",
        "optimización",
        "regularización",
        "generalización"
      ],
      "practice": "Entrena una red pequeña y contrasta un gradiente por diferencias finitas en un ejemplo diminuto.",
      "checks": [
        "Comprueba dimensiones",
        "Registra curvas train/validación",
        "Reproduce con entorno versionado"
      ],
      "question": "¿Bajar la pérdida de entrenamiento demuestra generalización?",
      "answer": "No: debe evaluarse en datos no utilizados para ajuste ni selección.",
      "sourceIds": [
        "sci-fiuba-dl",
        "sci-googleml"
      ],
      "scopeNote": "Experimentos pequeños locales; redes grandes pueden necesitar GPU y presupuesto."
    },
    {
      "id": "DAI-032",
      "focus": [
        "Imagen",
        "convolución",
        "características",
        "segmentación",
        "calibración"
      ],
      "practice": "Compara un método clásico de segmentación y un modelo pequeño en imágenes propias o sintéticas.",
      "checks": [
        "Separa imágenes relacionadas entre particiones",
        "Define métrica por tarea",
        "Analiza fallos visibles"
      ],
      "question": "¿Partir píxeles de la misma imagen entre train y test evita fuga?",
      "answer": "No: correlación espacial y origen compartido pueden contaminar la evaluación.",
      "sourceIds": [
        "sci-fiuba-cv",
        "sci-fiuba-dl"
      ],
      "scopeNote": "Visión clásica y base de DL; completar datos, anotación y evaluación por dominio."
    },
    {
      "id": "DAI-033",
      "focus": [
        "Tokenización",
        "vectorización",
        "embeddings",
        "secuencias",
        "Transformers"
      ],
      "practice": "Clasifica textos sintéticos comparando bolsa de palabras con un modelo pequeño y revisa errores de tokenización.",
      "checks": [
        "Separa documentos duplicados",
        "Incluye baseline léxico",
        "Documenta idioma y licencia de datos"
      ],
      "question": "¿Un embedding representa significado de manera universal y sin sesgo?",
      "answer": "No: depende de datos, objetivo, idioma y contexto de entrenamiento.",
      "sourceIds": [
        "sci-fiuba-nlp",
        "sci-hf"
      ],
      "scopeNote": "Traducción parcial y bibliotecas variables; no supone cobertura de todos los idiomas."
    },
    {
      "id": "DAI-034",
      "focus": [
        "MDP",
        "política",
        "valor",
        "Bellman",
        "exploración"
      ],
      "practice": "Implementa un agente tabular en una cuadrícula ficticia y compara con una política aleatoria.",
      "checks": [
        "Define estados y recompensas",
        "Evalúa sin exploración de entrenamiento",
        "Reporta variación entre semillas"
      ],
      "question": "¿Maximizar recompensa garantiza el comportamiento deseado?",
      "answer": "Solo si la recompensa y el entorno representan adecuadamente el objetivo; pueden existir comportamientos no previstos.",
      "sourceIds": [
        "sci-fiuba-ai"
      ],
      "scopeNote": "Introducción tabular; ampliar teoría de convergencia y deepRL con fuentes específicas."
    },
    {
      "id": "DAI-035",
      "focus": [
        "Filtrado colaborativo",
        "contenido",
        "ranking",
        "feedback implícito",
        "sesgo de exposición"
      ],
      "practice": "Diseña un recomendador de libros ficticios y evalúa ranking en una partición temporal pequeña.",
      "checks": [
        "No usa interacciones futuras",
        "Compara popularidad",
        "Analiza usuarios sin historial"
      ],
      "question": "¿Una interacción no observada es una preferencia negativa?",
      "answer": "No necesariamente: el usuario puede no haber visto el elemento.",
      "sourceIds": [
        "sci-sklearn",
        "sci-fiuba-nlp"
      ],
      "scopeNote": "Apoyo de modelos y recuperación; falta curso específico de sistemas de recomendación a escala."
    },
    {
      "id": "DAI-036",
      "focus": [
        "Exploración",
        "asociaciones",
        "clustering",
        "anomalías",
        "validación"
      ],
      "practice": "Agrupa registros sintéticos con dos algoritmos y analiza estabilidad al cambiar escala y ruido.",
      "checks": [
        "Explica criterio de similitud",
        "No etiqueta clusters sin evidencia",
        "Prueba sensibilidad a parámetros"
      ],
      "question": "¿Un agrupamiento descubierto prueba clases naturales?",
      "answer": "No: depende de representación, distancia y algoritmo; necesita validación externa y del dominio.",
      "sourceIds": [
        "sci-sklearn",
        "sci-fiuba-ml"
      ],
      "scopeNote": "La minería descriptiva no establece causalidad ni utilidad operativa por sí sola."
    },
    {
      "id": "DAI-037",
      "focus": [
        "Modelos generativos",
        "muestreo",
        "condicionamiento",
        "evaluación",
        "riesgos"
      ],
      "practice": "Compara salidas de un generador local pequeño con una tarea verificable y registra errores y coste.",
      "checks": [
        "Usa entradas sin datos privados",
        "Define criterios antes de evaluar",
        "Conserva modelo y configuración"
      ],
      "question": "¿Una salida plausible garantiza que el contenido sea correcto?",
      "answer": "No: plausibilidad estadística y veracidad son propiedades distintas; requieren verificación según tarea.",
      "sourceIds": [
        "sci-fiuba-llm",
        "sci-hf"
      ],
      "scopeNote": "No garantiza cómputo gratuito para modelos grandes ni cobertura de todas las modalidades."
    },
    {
      "id": "DAI-038",
      "focus": [
        "Decoder",
        "atención",
        "tokens",
        "contexto",
        "inferencia"
      ],
      "practice": "Inspecciona tokenización y generación de un modelo pequeño, variando longitud de contexto y muestreo.",
      "checks": [
        "Registra versión y parámetros",
        "Mide latencia local",
        "No compara costes sin igualar condiciones"
      ],
      "question": "¿Más ventana de contexto garantiza uso correcto de todo el contenido?",
      "answer": "No: capacidad nominal, atención efectiva y calidad de recuperación deben evaluarse.",
      "sourceIds": [
        "sci-fiuba-llm",
        "sci-hf"
      ],
      "scopeNote": "Material mixto; APIs comerciales son opcionales y pueden costar."
    },
    {
      "id": "DAI-039",
      "focus": [
        "Instrucciones",
        "ejemplos",
        "contexto",
        "salidas estructuradas",
        "evaluación"
      ],
      "practice": "Diseña cinco casos de prueba y compara dos instrucciones para extraer datos de textos ficticios.",
      "checks": [
        "Incluye casos adversos benignos",
        "Valida esquema",
        "No elige solo ejemplos favorables"
      ],
      "question": "¿Un prompt que funciona en una muestra demuestra fiabilidad general?",
      "answer": "No: se requiere evaluación representativa, límites y tratamiento de errores.",
      "sourceIds": [
        "sci-fiuba-llm"
      ],
      "scopeNote": "La ingeniería de contexto no sustituye fundamentos de programación, datos o seguridad."
    },
    {
      "id": "DAI-040",
      "focus": [
        "Agentes",
        "herramientas",
        "estado",
        "planificación",
        "coordinación"
      ],
      "practice": "Construye un agente de juguete con herramientas locales de solo lectura y tareas delimitadas.",
      "checks": [
        "Acota permisos",
        "Registra decisiones observables",
        "Prueba fallos y bucles"
      ],
      "question": "¿Añadir varios agentes mejora automáticamente un sistema?",
      "answer": "No: coordinación, costes y propagación de errores pueden empeorar el resultado; comparar con un sistema simple.",
      "sourceIds": [
        "sci-fiuba-llm"
      ],
      "scopeNote": "Introducción a implementación; falta teoría completa de sistemas multiagente."
    },
    {
      "id": "DAI-041",
      "focus": [
        "Versionado",
        "pipelines",
        "registro de modelos",
        "monitorización",
        "despliegue"
      ],
      "practice": "Empaqueta un modelo pequeño con validación de entrada y una prueba de retroceso a una versión anterior.",
      "checks": [
        "Versiona datos y código",
        "Prueba compatibilidad",
        "Distingue drift de fallo de servicio"
      ],
      "question": "¿Monitorizar latencia cubre la salud del modelo?",
      "answer": "No: también importan calidad de datos, errores, cambio de distribución y resultados de la tarea.",
      "sourceIds": [
        "sci-fiuba-ops",
        "sci-airflow"
      ],
      "scopeNote": "Práctica local; operación real requiere observabilidad y objetivos definidos con usuarios."
    },
    {
      "id": "DAI-042",
      "focus": [
        "Evaluación de LLM",
        "datasets",
        "trazas",
        "coste",
        "alineación"
      ],
      "practice": "Crea una batería de evaluación para un asistente local con respuestas verificables y comparación por versiones.",
      "checks": [
        "Congela conjunto de prueba",
        "Separa juez y respuesta de referencia",
        "Mide coste y errores por categoría"
      ],
      "question": "¿Un juez automático elimina la necesidad de revisión humana?",
      "answer": "No: puede introducir sesgos y errores propios; debe calibrarse y contrastarse con criterios independientes.",
      "sourceIds": [
        "sci-fiuba-llmops",
        "sci-fiuba-llm"
      ],
      "scopeNote": "No afirmar ausencia de alucinaciones ni fiabilidad universal por una puntuación agregada."
    },
    {
      "id": "DAI-043",
      "focus": [
        "Interpretabilidad",
        "explicación local",
        "importancia",
        "contrafactuales",
        "fidelidad"
      ],
      "practice": "Compara importancia por permutación con coeficientes de un modelo sencillo y analiza una variable correlacionada.",
      "checks": [
        "Evita datos de entrenamiento para conclusiones finales",
        "Explica dependencia del modelo",
        "Distingue explicación y causalidad"
      ],
      "question": "¿Una variable importante en un modelo es una causa del resultado?",
      "answer": "No: la importancia describe uso predictivo bajo un procedimiento; no identifica causalidad por sí sola.",
      "sourceIds": [
        "sci-sklearn",
        "sci-causal"
      ],
      "scopeNote": "Ampliar métodos de explicación específicos y validación con usuarios del dominio."
    },
    {
      "id": "DAI-044",
      "focus": [
        "Robustez",
        "shift",
        "privacidad",
        "adversarios",
        "amenazas"
      ],
      "practice": "Evalúa un clasificador sintético bajo ruido y cambio de distribución controlados, con un modelo de amenaza explícito.",
      "checks": [
        "Define perturbaciones permitidas",
        "Mantiene test limpio separado",
        "No publica datos sensibles"
      ],
      "question": "¿Robustez a un tipo de ruido implica seguridad frente a ataques?",
      "answer": "No: las garantías están ligadas al modelo de perturbación y adversario evaluado.",
      "sourceIds": [
        "sci-sklearn",
        "sci-fiuba-llmops"
      ],
      "scopeNote": "Apoyo parcial; faltan técnicas formales de privacidad diferencial y seguridad adversaria avanzada."
    },
    {
      "id": "DAI-045",
      "focus": [
        "Sesgo",
        "equidad",
        "gobernanza",
        "trazabilidad",
        "rendición de cuentas"
      ],
      "practice": "Redacta una ficha de modelo para un caso ficticio con análisis de errores por grupos y límites de uso.",
      "checks": [
        "Justifica métricas",
        "Expone conflictos entre criterios",
        "Define quién revisa incidentes"
      ],
      "question": "¿Igualar una métrica de equidad resuelve todos los problemas éticos?",
      "answer": "No: métricas pueden entrar en conflicto y no sustituyen contexto, participación y revisión de consecuencias.",
      "sourceIds": [
        "sci-googleml",
        "sci-fiuba-llm"
      ],
      "scopeNote": "El ejercicio no certifica cumplimiento legal o adecuación ética de un sistema real."
    },
    {
      "id": "DAI-046",
      "focus": [
        "Cuantización",
        "memoria",
        "latencia",
        "energía",
        "restricciones edge"
      ],
      "practice": "Compara un modelo pequeño original y cuantizado sobre el mismo conjunto, con mediciones en un dispositivo disponible.",
      "checks": [
        "Mide memoria real",
        "Compara error y latencia",
        "Declara entorno y límites"
      ],
      "question": "¿Un archivo de modelo más pequeño siempre infiere más rápido?",
      "answer": "No: depende de kernels, hardware, formato y sobrecostes de conversión.",
      "sourceIds": [
        "sci-fiuba-dl",
        "sci-fiuba-llmops"
      ],
      "scopeNote": "Si no se ejecuta en hardware edge, registrar la práctica como análisis o simulación, no validación física."
    },
    {
      "id": "DAI-047",
      "focus": [
        "Datos distribuidos",
        "agregación",
        "heterogeneidad",
        "privacidad",
        "comunicación"
      ],
      "practice": "Simula tres clientes con distribuciones distintas y compara entrenamiento centralizado y promediado federado.",
      "checks": [
        "Separa datos por cliente",
        "Reporta rendimiento local y global",
        "No atribuye privacidad automática"
      ],
      "question": "¿Que los datos no salgan del dispositivo garantiza privacidad?",
      "answer": "No: actualizaciones y metadatos pueden filtrar información; se requieren amenazas y mecanismos adicionales.",
      "sourceIds": [
        "sci-fiuba-dl",
        "sci-sklearn"
      ],
      "scopeNote": "Apoyo de ML general; falta curso específico de aprendizaje federado y sus garantías."
    },
    {
      "id": "DAI-048",
      "focus": [
        "Modelos gráficos",
        "posterior",
        "inferencia",
        "MCMC",
        "diagnóstico"
      ],
      "practice": "Resuelve un modelo bayesiano pequeño por cálculo exacto y aproximación, comparando resultados.",
      "checks": [
        "Explicita prior",
        "Comprueba normalización",
        "Diagnostica sensibilidad e incertidumbre"
      ],
      "question": "¿Un intervalo creíble es idéntico a un intervalo de confianza?",
      "answer": "No: difieren en interpretación y construcción; hay que declarar el marco inferencial.",
      "sourceIds": [
        "sci-fiuba-prob",
        "sci-scipy"
      ],
      "scopeNote": "Ampliar programación probabilística y diagnóstico avanzado de inferencia."
    },
    {
      "id": "DAI-049",
      "focus": [
        "Grafos",
        "message passing",
        "equivarianza",
        "embeddings",
        "particiones"
      ],
      "practice": "Diseña un ejemplo pequeño de propagación de mensajes sobre un grafo y prueba invariancia a renombrado de nodos.",
      "checks": [
        "Define atributos",
        "No filtra aristas objetivo",
        "Comprueba permutación"
      ],
      "question": "¿Una GNN puede distinguir cualquier par de grafos no isomorfos?",
      "answer": "No: su poder expresivo depende de arquitectura y esquema de agregación.",
      "sourceIds": [
        "sci-fiuba-dl",
        "sci-spark"
      ],
      "scopeNote": "Las fuentes apoyan DL y grafos; falta material específico de aprendizaje geométrico avanzado."
    },
    {
      "id": "DAI-050",
      "focus": [
        "SGD",
        "condicionamiento",
        "regularización",
        "restricciones",
        "hiperparámetros"
      ],
      "practice": "Compara descenso de gradiente con dos escalados de variables en una función cuadrática conocida.",
      "checks": [
        "Verifica gradiente",
        "Cuenta evaluaciones",
        "Distingue entrenamiento y selección"
      ],
      "question": "¿El optimizador con menor pérdida final en un ensayo es siempre mejor?",
      "answer": "No: inicialización, coste, sensibilidad y generalización requieren comparación reproducible.",
      "sourceIds": [
        "sci-fiuba-math",
        "sci-scipy",
        "sci-fiuba-dl"
      ],
      "scopeNote": "Ampliar teoría estocástica y garantías de convergencia."
    },
    {
      "id": "DAI-051",
      "focus": [
        "Pregunta investigable",
        "baseline",
        "ablation",
        "incertidumbre",
        "reproducibilidad"
      ],
      "practice": "Reproduce un resultado público pequeño y cambia una sola hipótesis, documentando resultados negativos y positivos.",
      "checks": [
        "Fija protocolo antes de evaluar",
        "Conserva código y datos permitidos",
        "No atribuye novedad sin revisión de literatura"
      ],
      "question": "¿Superar un baseline una vez prueba una contribución científica?",
      "answer": "No: hacen falta comparación justa, incertidumbre, controles, revisión de antecedentes y crítica competente.",
      "sourceIds": [
        "sci-fiuba-dl",
        "sci-fiuba-llmops"
      ],
      "scopeNote": "Guía de investigación; no equivale a tesis revisada ni curso doctoral completo."
    },
    {
      "id": "BIO-001",
      "focus": [
        "Célula",
        "membrana",
        "ADN y ARN",
        "expresión génica",
        "variación"
      ],
      "practice": "Construye un mapa conceptual original que conecte un gen, su transcripción, traducción y producto con una observación medible.",
      "checks": [
        "Distingue moléculas y procesos",
        "Explicita excepciones simplificadas",
        "Cita fuentes sin copiar diagramas"
      ],
      "question": "¿La secuencia de un gen determina por sí sola todo el fenotipo?",
      "answer": "No: regulación, ambiente, interacciones y otros niveles biológicos contribuyen al resultado.",
      "sourceIds": [
        "sci-biology"
      ],
      "scopeNote": "Fundamentos biológicos; no sustituye prácticas de laboratorio o formación biomédica."
    },
    {
      "id": "BIO-002",
      "focus": [
        "Herencia",
        "genotipo",
        "recombinación",
        "variantes",
        "poblaciones"
      ],
      "practice": "Simula herencia de dos loci en un modelo mendeliano simple y compara frecuencias esperadas y simuladas.",
      "checks": [
        "Declara supuestos",
        "Distingue probabilidad y frecuencia",
        "No extrapola el modelo a diagnóstico humano"
      ],
      "question": "¿Un patrón mendeliano simple describe toda la variación genética?",
      "answer": "No: poligenia, penetrancia, ambiente y otras estructuras pueden modificar el patrón.",
      "sourceIds": [
        "sci-biology",
        "sci-biopython"
      ],
      "scopeNote": "El modelo es didáctico; ampliar genética molecular y de poblaciones."
    },
    {
      "id": "BIO-003",
      "focus": [
        "Proteínas",
        "enzimas",
        "metabolismo",
        "energía",
        "estructura molecular"
      ],
      "practice": "Relaciona una reacción enzimática ideal con una curva de velocidad y analiza cambios de parámetros ficticios.",
      "checks": [
        "Declara unidades",
        "Distingue concentración y flujo",
        "Expone límites del modelo"
      ],
      "question": "¿Una enzima cambia el equilibrio termodinámico de una reacción?",
      "answer": "No: modifica la velocidad de aproximación, no la diferencia de energía libre de equilibrio.",
      "sourceIds": [
        "sci-biology",
        "sci-scipy"
      ],
      "scopeNote": "Ampliar bioquímica y cinética; ejercicio matemático sin inferencias sobre tratamientos."
    },
    {
      "id": "BIO-004",
      "focus": [
        "Diseño de estudio",
        "muestreo",
        "riesgo",
        "intervalos",
        "confusión"
      ],
      "practice": "Analiza una tabla sintética de exposición y evento, calculando medidas e incertidumbre sin interpretación clínica.",
      "checks": [
        "Usa denominadores correctos",
        "Distingue riesgo y odds",
        "Expone sesgos del diseño"
      ],
      "question": "¿Una asociación estadística demuestra un mecanismo biológico?",
      "answer": "No: puede surgir de confusión, selección, azar u otras estructuras; se necesita evidencia adicional.",
      "sourceIds": [
        "sci-epidemiology",
        "sci-stats"
      ],
      "scopeNote": "Bases de bioestadística; archivo histórico para fundamentos, no orientación sanitaria vigente."
    },
    {
      "id": "BIO-005",
      "focus": [
        "FASTA",
        "calidad de secuencias",
        "alineamiento",
        "búsqueda",
        "anotación"
      ],
      "practice": "Lee secuencias pequeñas permitidas, calcula composición y ejecuta un alineamiento reproducible.",
      "checks": [
        "Registra acceso y versión",
        "Conserva formato y orientación",
        "Distingue identidad de similitud"
      ],
      "question": "¿Una coincidencia de secuencias prueba misma función?",
      "answer": "No: longitud, contexto, significación y evidencia funcional importan.",
      "sourceIds": [
        "sci-biopython",
        "sci-ebi"
      ],
      "scopeNote": "Introducción computacional; requiere biología previa para interpretar resultados."
    },
    {
      "id": "BIO-006",
      "focus": [
        "Pipelines",
        "anotación",
        "genómica",
        "comparación",
        "reproducibilidad"
      ],
      "practice": "Construye un workflow pequeño que limpie, analice y documente un conjunto público no sensible de secuencias.",
      "checks": [
        "Versiona herramientas",
        "Registra parámetros",
        "Permite repetir desde entradas"
      ],
      "question": "¿Un workflow reproducible produce necesariamente una conclusión correcta?",
      "answer": "No: puede reproducir errores de diseño, anotación o interpretación.",
      "sourceIds": [
        "sci-biopython",
        "sci-galaxy"
      ],
      "scopeNote": "Ampliar estadística y métodos específicos; no se valida toda la bioinformática avanzada."
    },
    {
      "id": "BIO-007",
      "focus": [
        "Lecturas",
        "calidad",
        "alineamiento",
        "ensamblado",
        "variantes"
      ],
      "practice": "Compara dos estrategias de filtrado sobre datos de demostración de secuenciación y registra el efecto en métricas técnicas.",
      "checks": [
        "Mantiene datos originales",
        "No confunde cobertura y exactitud",
        "Evita conclusiones clínicas"
      ],
      "question": "¿Más cobertura elimina todos los sesgos de secuenciación?",
      "answer": "No: sesgos de preparación, alineamiento y plataforma pueden persistir.",
      "sourceIds": [
        "sci-galaxy",
        "sci-biopython"
      ],
      "scopeNote": "Material de análisis genómico; falta formación de laboratorio y validación clínica."
    },
    {
      "id": "BIO-008",
      "focus": [
        "Proteínas",
        "espectrometría",
        "identificación",
        "cuantificación",
        "metabolitos"
      ],
      "practice": "Diseña un análisis reproducible de una tabla sintética de abundancias con normalización y control de múltiples comparaciones.",
      "checks": [
        "Separa identificación y cuantificación",
        "Documenta valores ausentes",
        "Controla multiplicidad"
      ],
      "question": "¿Una abundancia relativa mayor demuestra mayor cantidad absoluta?",
      "answer": "No: normalización, composicionalidad y calibración pueden cambiar la interpretación.",
      "sourceIds": [
        "sci-biology",
        "sci-ebi",
        "sci-stats"
      ],
      "scopeNote": "Fuentes de bases y recursos; falta tutorial específico verificado de proteómica/metabolómica experimental."
    },
    {
      "id": "BIO-009",
      "focus": [
        "Alineamiento dinámico",
        "distancias",
        "motivos",
        "complejidad",
        "heurísticas"
      ],
      "practice": "Implementa alineamiento global de dos secuencias pequeñas y contrasta con una biblioteca.",
      "checks": [
        "Declara penalizaciones",
        "Comprueba casos conocidos",
        "Distingue óptimo del modelo y verdad biológica"
      ],
      "question": "¿El alineamiento con mejor puntuación es necesariamente biológicamente correcto?",
      "answer": "No: depende del modelo de puntuación y de supuestos de evolución o función.",
      "sourceIds": [
        "sci-biopython"
      ],
      "scopeNote": "Apoya implementación; ampliar algoritmos y modelos evolutivos."
    },
    {
      "id": "BIO-010",
      "focus": [
        "Redes biológicas",
        "retroalimentación",
        "interacciones",
        "dinámica",
        "emergencia"
      ],
      "practice": "Modela una red reguladora de juguete y analiza estados estables bajo dos parámetros.",
      "checks": [
        "Distingue hipótesis y evidencia",
        "Prueba sensibilidad",
        "No atribuye causalidad a una arista sin sustento"
      ],
      "question": "¿Una red con muchas conexiones explica automáticamente un mecanismo?",
      "answer": "No: requiere semántica, dirección, dinámica y validación experimental.",
      "sourceIds": [
        "sci-biology",
        "sci-scipy",
        "sci-ebi"
      ],
      "scopeNote": "Modelo didáctico; falta curso específico de biología de sistemas."
    },
    {
      "id": "BIO-011",
      "focus": [
        "Modelos mecanicistas",
        "EDO",
        "parámetros",
        "identificabilidad",
        "incertidumbre"
      ],
      "practice": "Ajusta un modelo biológico ficticio simple a datos simulados y comprueba si distintos parámetros explican lo mismo.",
      "checks": [
        "Documenta unidades",
        "Evalúa identificabilidad",
        "Distingue error de ajuste y validez"
      ],
      "question": "¿Un buen ajuste garantiza que el mecanismo propuesto sea verdadero?",
      "answer": "No: modelos distintos pueden explicar observaciones similares; hacen falta pruebas independientes.",
      "sourceIds": [
        "sci-scipy",
        "sci-biology"
      ],
      "scopeNote": "No extrapolar simulaciones a predicciones biológicas o clínicas reales."
    },
    {
      "id": "BIO-012",
      "focus": [
        "Características biológicas",
        "particiones por individuo",
        "validación",
        "sesgo",
        "generalización"
      ],
      "practice": "Entrena un clasificador sobre datos biológicos sintéticos con grupos y compara una partición incorrecta con otra por grupo.",
      "checks": [
        "Evita fuga entre muestras relacionadas",
        "Compara baseline",
        "Reporta incertidumbre"
      ],
      "question": "¿Separar filas basta cuando varias provienen del mismo individuo?",
      "answer": "No: información compartida puede contaminar evaluación; la unidad de partición debe corresponder a la pregunta.",
      "sourceIds": [
        "sci-sklearn",
        "sci-biopython"
      ],
      "scopeNote": "El ejercicio no valida un biomarcador ni un producto clínico."
    },
    {
      "id": "BIO-013",
      "focus": [
        "Accesiones",
        "versiones",
        "ontologías",
        "anotación",
        "proveniencia"
      ],
      "practice": "Recupera un registro público de una base biológica y documenta cómo cambian sus identificadores y referencias entre versiones disponibles.",
      "checks": [
        "Guarda fecha y acceso",
        "Distingue anotación de evidencia primaria",
        "Respeta licencia"
      ],
      "question": "¿Un identificador estable implica que el contenido no cambia?",
      "answer": "No: pueden cambiar secuencias, anotaciones o evidencia conservando identificadores o introduciendo versiones.",
      "sourceIds": [
        "sci-ebi",
        "sci-biopython"
      ],
      "scopeNote": "Completar cada base concreta y su política de acceso; no garantiza interpretación funcional."
    },
    {
      "id": "BIO-014",
      "focus": [
        "Workflows",
        "entornos",
        "datos FAIR",
        "metadatos",
        "repetibilidad"
      ],
      "practice": "Reproduce un tutorial de Galaxy y luego escribe un workflow propio con datos de ejemplo permitidos.",
      "checks": [
        "Conserva historial",
        "Fija versiones",
        "Documenta diferencias con referencia"
      ],
      "question": "¿FAIR significa que todos los datos deben ser públicos?",
      "answer": "No: accesibilidad puede tener condiciones legítimas; metadatos y procedimientos deben describirlas.",
      "sourceIds": [
        "sci-galaxy",
        "sci-ebi"
      ],
      "scopeNote": "No cargar datos personales de salud en instancias públicas de práctica."
    },
    {
      "id": "BIO-015",
      "focus": [
        "Sistemas de salud",
        "flujos de información",
        "roles",
        "interoperabilidad",
        "seguridad"
      ],
      "practice": "Dibuja el flujo de una cita clínica ficticia entre agenda, registro y facturación, sin datos reales.",
      "checks": [
        "Identifica actores",
        "Separa proceso asistencial y administrativo",
        "Explica control de acceso"
      ],
      "question": "¿Informatizar un formulario equivale a mejorar el proceso?",
      "answer": "No: puede digitalizar errores; hay que analizar necesidades, flujo y resultados.",
      "sourceIds": [
        "sci-fhir"
      ],
      "scopeNote": "Apoyo técnico de interoperabilidad; falta formación integral de informática de salud y contexto institucional."
    },
    {
      "id": "BIO-016",
      "focus": [
        "Incidencia",
        "prevalencia",
        "sesgo",
        "vigilancia",
        "diseño epidemiológico"
      ],
      "practice": "Calcula incidencia y prevalencia sobre una cohorte totalmente sintética y explica sus denominadores.",
      "checks": [
        "Distingue personas y persona-tiempo",
        "Declara periodo",
        "Evita inferencias causales no justificadas"
      ],
      "question": "¿Prevalencia e incidencia miden lo mismo?",
      "answer": "No: prevalencia describe casos existentes en una población/periodo; incidencia considera aparición de casos nuevos bajo una definición temporal.",
      "sourceIds": [
        "sci-epidemiology"
      ],
      "scopeNote": "Usar para fundamentos; el archivo no sustituye recomendaciones de salud pública actuales."
    },
    {
      "id": "BIO-017",
      "focus": [
        "Sistemas clínicos",
        "integración",
        "usabilidad",
        "trazabilidad",
        "disponibilidad"
      ],
      "practice": "Especifica un sistema ficticio de seguimiento de solicitudes, con riesgos de confusión de identidad y caídas de servicio.",
      "checks": [
        "Usa datos inventados",
        "Define trazabilidad",
        "Incluye fallos y recuperación"
      ],
      "question": "¿Alta disponibilidad asegura seguridad clínica?",
      "answer": "No: un sistema disponible puede mostrar información incorrecta o inducir errores de uso.",
      "sourceIds": [
        "sci-fhir"
      ],
      "scopeNote": "No es validación de software clínico real; se necesita revisión de profesionales e instituciones."
    },
    {
      "id": "BIO-018",
      "focus": [
        "Historia electrónica",
        "eventos",
        "proveniencia",
        "consentimiento",
        "correcciones"
      ],
      "practice": "Modela la modificación de un dato ficticio como evento auditable sin borrar su historia.",
      "checks": [
        "Distingue identidad y episodio",
        "Registra autor y motivo",
        "Controla acceso por rol"
      ],
      "question": "¿Corregir un registro debe borrar la entrada original sin rastro?",
      "answer": "No: debe conservarse trazabilidad de la corrección según requisitos aplicables.",
      "sourceIds": [
        "sci-fhir"
      ],
      "scopeNote": "Ejercicio de arquitectura; los requisitos legales y clínicos dependen de jurisdicción y organización."
    },
    {
      "id": "BIO-019",
      "focus": [
        "FHIR",
        "HL7",
        "DICOM",
        "perfiles",
        "conformidad"
      ],
      "practice": "Transforma un recurso FHIR sintético y relaciona una referencia de imagen con metadatos DICOM ficticios.",
      "checks": [
        "Declara versión",
        "Valida estructura y semántica básica",
        "No usa imágenes ni datos de pacientes"
      ],
      "question": "¿Ser JSON válido implica conformidad FHIR?",
      "answer": "No: hacen falta tipos, cardinalidades, terminologías, perfiles y reglas de negocio pertinentes.",
      "sourceIds": [
        "sci-fhir",
        "sci-dicom"
      ],
      "scopeNote": "FHIR y DICOM son especificaciones diferentes; el overview no cubre todas las implementaciones HL7."
    },
    {
      "id": "BIO-020",
      "focus": [
        "Terminologías",
        "ontologías",
        "codificación",
        "bindings",
        "mapeo"
      ],
      "practice": "Diseña un pequeño vocabulario de ejemplo y documenta un mapeo entre códigos ficticios de dos sistemas.",
      "checks": [
        "Explicita equivalencia parcial",
        "Conserva versión",
        "No trata etiquetas iguales como conceptos idénticos"
      ],
      "question": "¿Traducir una etiqueta garantiza equivalencia semántica?",
      "answer": "No: alcance y definición pueden variar; se necesita revisar conceptos y contexto.",
      "sourceIds": [
        "sci-fhir",
        "sci-ebi"
      ],
      "scopeNote": "Las terminologías reales pueden tener licencias o restricciones; no se garantiza acceso gratuito universal."
    },
    {
      "id": "BIO-021",
      "focus": [
        "Indicadores",
        "calidad de datos",
        "denominadores",
        "equidad",
        "tableros"
      ],
      "practice": "Construye un tablero administrativo de atención ficticia y muestra cómo cambia al variar reglas de exclusión.",
      "checks": [
        "Define población",
        "No identifica individuos",
        "Documenta incertidumbre y faltantes"
      ],
      "question": "¿Un promedio institucional permite describir todos los grupos?",
      "answer": "No: puede ocultar heterogeneidad y cambios de composición; conviene desagregar con controles de privacidad.",
      "sourceIds": [
        "sci-powerbi",
        "sci-epidemiology"
      ],
      "scopeNote": "Analítica de datos sintéticos; no constituye evaluación real de calidad asistencial."
    },
    {
      "id": "BIO-022",
      "focus": [
        "Apoyo a decisiones",
        "reglas",
        "alertas",
        "validación",
        "supervisión"
      ],
      "practice": "Diseña un prototipo no clínico de recordatorio administrativo y evalúa falsos avisos sin recomendar diagnósticos o tratamientos.",
      "checks": [
        "Define uso excluido",
        "Mide carga de alertas",
        "Incluye revisión humana"
      ],
      "question": "¿Un sistema de apoyo puede decidir por sí solo su uso clínico adecuado?",
      "answer": "No: uso previsto, validación, riesgos y supervisión requieren evaluación competente.",
      "sourceIds": [
        "sci-fhir"
      ],
      "scopeNote": "No se desarrolla ni valida un dispositivo o recomendador médico real."
    },
    {
      "id": "BIO-023",
      "focus": [
        "Atención remota",
        "identidad",
        "comunicación",
        "accesibilidad",
        "continuidad"
      ],
      "practice": "Prototipa el flujo de una sesión remota ficticia con consentimiento simulado y recuperación de interrupciones.",
      "checks": [
        "Evita datos reales",
        "Considera accesibilidad",
        "Documenta fallos de red"
      ],
      "question": "¿Una videollamada convierte una aplicación en una plataforma sanitaria completa?",
      "answer": "No: faltan procesos, seguridad, integración, criterios de uso y evaluación institucional.",
      "sourceIds": [
        "sci-fhir"
      ],
      "scopeNote": "Apoyo de arquitectura parcial; no se verificó un curso completo gratuito de telemedicina."
    },
    {
      "id": "BIO-024",
      "focus": [
        "Sensores",
        "calidad de medición",
        "conectividad",
        "seguridad",
        "trazabilidad"
      ],
      "practice": "Simula un dispositivo que emite mediciones inventadas y detecta valores ausentes o unidades incoherentes.",
      "checks": [
        "Declara que es simulación",
        "Valida unidades",
        "Separa fallo técnico y interpretación clínica"
      ],
      "question": "¿Recibir un número de un sensor demuestra que la medición es válida?",
      "answer": "No: calibración, contexto, calidad de señal y trazabilidad deben evaluarse.",
      "sourceIds": [
        "sci-fhir",
        "sci-dicom"
      ],
      "scopeNote": "No intervenir equipos médicos reales ni atribuir certificación al prototipo."
    },
    {
      "id": "BIO-025",
      "focus": [
        "Privacidad",
        "minimización",
        "consentimiento",
        "acceso",
        "amenazas"
      ],
      "practice": "Elabora un modelo de amenazas de un sistema ficticio y evalúa si se pueden vincular registros sintéticos seudonimizados.",
      "checks": [
        "Distingue anonimización y seudonimización",
        "Limita datos",
        "Define controles y riesgos residuales"
      ],
      "question": "¿Quitar el nombre elimina el riesgo de reidentificación?",
      "answer": "No: combinaciones de atributos y fuentes auxiliares pueden permitir vinculación.",
      "sourceIds": [
        "sci-fhir"
      ],
      "scopeNote": "Marco técnico, no dictamen de cumplimiento legal o garantía de anonimato."
    },
    {
      "id": "BIO-026",
      "focus": [
        "Validación externa",
        "calibración",
        "shift",
        "sesgo",
        "seguridad"
      ],
      "practice": "Evalúa un modelo de juguete sobre dos poblaciones sintéticas y documenta por qué no es apto para uso clínico.",
      "checks": [
        "Separa entrenamiento y evaluación",
        "Reporta rendimiento por grupo",
        "No presenta el prototipo como herramienta médica"
      ],
      "question": "¿Un AUC alto basta para desplegar un modelo clínico?",
      "answer": "No: se requieren calibración, utilidad, seguridad, validación contextual y revisión competente, entre otros requisitos.",
      "sourceIds": [
        "sci-sklearn",
        "sci-fiuba-dl",
        "sci-fhir"
      ],
      "scopeNote": "No se genera asesoramiento diagnóstico ni terapéutico; falta formación y validación clínica regulada."
    },
    {
      "id": "BIO-027",
      "focus": [
        "Transformación digital",
        "gobernanza",
        "interoperabilidad",
        "cambio",
        "medición de resultados"
      ],
      "practice": "Diseña un plan de implantación ficticio con responsables, riesgos y criterios de evaluación del proceso.",
      "checks": [
        "Distingue adopción de utilidad",
        "Incluye costes y capacidades",
        "Prevé reversión y continuidad"
      ],
      "question": "¿Instalar una plataforma demuestra transformación digital exitosa?",
      "answer": "No: deben verificarse cambios útiles del proceso, capacidades, resultados y efectos no deseados.",
      "sourceIds": [
        "sci-fhir"
      ],
      "scopeNote": "Referencia técnica parcial; ampliar gestión sanitaria, economía y marcos de salud digital vigentes."
    },
    {
      "id": "QUA-001",
      "focus": [
        "Complejos",
        "espacios de Hilbert",
        "estados",
        "medición",
        "unitarias"
      ],
      "practice": "Calcula probabilidades de medición de un qubit y contrasta rotaciones unitarias en un simulador local sencillo.",
      "checks": [
        "Normaliza el estado",
        "Comprueba conservación de norma",
        "Distingue amplitud y probabilidad"
      ],
      "question": "¿Una amplitud negativa es una probabilidad negativa?",
      "answer": "No: la probabilidad se obtiene del módulo al cuadrado; signos y fases afectan interferencia.",
      "sourceIds": [
        "sci-quantum-basic",
        "sci-fiuba-math"
      ],
      "scopeNote": "Fundamentos matemáticos aplicados; no reemplaza un curso completo de mecánica cuántica."
    },
    {
      "id": "QUA-002",
      "focus": [
        "Estados compuestos",
        "entrelazamiento",
        "matrices densidad",
        "canales",
        "entropía"
      ],
      "practice": "Compara un estado producto y uno entrelazado mediante probabilidades conjuntas y estados reducidos calculados.",
      "checks": [
        "Comprueba trazas",
        "Explica correlaciones",
        "No confunde mezcla clásica y superposición"
      ],
      "question": "¿Todo estado con correlaciones está entrelazado?",
      "answer": "No: existen correlaciones clásicas en estados separables; debe analizarse la estructura del estado.",
      "sourceIds": [
        "sci-quantum-basic",
        "sci-quantum-general"
      ],
      "scopeNote": "Curso oficial en inglés; ampliar demostraciones y medidas de información."
    },
    {
      "id": "QUA-003",
      "focus": [
        "Puertas",
        "circuitos",
        "medición",
        "orden de qubits",
        "simulación"
      ],
      "practice": "Implementa y simula un circuito de Bell y verifica resultados exactos y por muestreo.",
      "checks": [
        "Declara convención de orden",
        "Fija shots y semilla",
        "Explica incertidumbre de muestreo"
      ],
      "question": "¿Un simulador demuestra comportamiento idéntico a hardware real?",
      "answer": "No: el hardware añade ruido, conectividad y restricciones que pueden no estar modelados.",
      "sourceIds": [
        "sci-quantum-basic"
      ],
      "scopeNote": "Práctica local sin hardware cuántico; no garantiza acceso gratuito a dispositivos remotos."
    },
    {
      "id": "QUA-004",
      "focus": [
        "Oráculos",
        "interferencia",
        "consultas",
        "amplificación",
        "algoritmos básicos"
      ],
      "practice": "Implementa un ejemplo pequeño de algoritmo de búsqueda y compara consultas al oráculo con enumeración clásica.",
      "checks": [
        "Incluye coste del oráculo",
        "Define éxito",
        "Evita extrapolar desde tamaños diminutos"
      ],
      "question": "¿Menos consultas al oráculo implica siempre menor tiempo real?",
      "answer": "No: construcción del oráculo, compilación, ejecución y lectura también tienen coste.",
      "sourceIds": [
        "sci-quantum-algo"
      ],
      "scopeNote": "Introducción a algoritmos; no prueba ventaja práctica universal."
    },
    {
      "id": "QUA-005",
      "focus": [
        "Estimación de fase",
        "Fourier cuántica",
        "periodicidad",
        "aritmética",
        "coste"
      ],
      "practice": "Analiza un circuito pequeño de estimación de fase y comprueba su distribución en simulación.",
      "checks": [
        "Verifica estados propios",
        "Declara precisión",
        "Cuenta recursos y supuestos"
      ],
      "question": "¿Un algoritmo asintóticamente mejor es siempre útil con el hardware actual?",
      "answer": "No: constantes, errores y recursos físicos pueden impedir utilidad práctica.",
      "sourceIds": [
        "sci-quantum-algo",
        "sci-quantum-qec"
      ],
      "scopeNote": "Ampliar teoría y recursos para algoritmos avanzados; no se ejecuta factorización útil a escala."
    },
    {
      "id": "QUA-006",
      "focus": [
        "BQP",
        "clases de complejidad",
        "reducciones",
        "oráculos",
        "límites"
      ],
      "practice": "Compara formulaciones de dos problemas y explica qué afirma una separación conocida o hipotética, sin presentar conjeturas como teoremas.",
      "checks": [
        "Define clase y modelo",
        "Distingue evidencia y demostración",
        "Incluye coste de entrada/salida"
      ],
      "question": "¿Computación cuántica resuelve todos los problemas NP-completos eficientemente?",
      "answer": "No existe tal resultado general; las ventajas demostradas dependen de problemas y modelos concretos.",
      "sourceIds": [
        "sci-quantum-algo",
        "sci-cs103"
      ],
      "scopeNote": "Las fuentes apoyan fundamentos; falta curso especializado completo de complejidad cuántica."
    },
    {
      "id": "QUA-007",
      "focus": [
        "No clonación",
        "teleportación",
        "comunicación",
        "QKD",
        "amenazas"
      ],
      "practice": "Simula un protocolo didáctico de distribución de claves y compara errores con y sin perturbación artificial.",
      "checks": [
        "Declara canal y adversario",
        "No confunde simulación y prueba de seguridad",
        "Distingue QKD de cifrado poscuántico"
      ],
      "question": "¿Teleportación cuántica transmite información utilizable instantáneamente?",
      "answer": "No: el protocolo requiere comunicación clásica y no permite comunicación superlumínica.",
      "sourceIds": [
        "sci-quantum-basic",
        "sci-quantum-general"
      ],
      "scopeNote": "No implementar seguridad real con el prototipo; ampliar demostraciones de seguridad y sistemas físicos."
    },
    {
      "id": "QUA-008",
      "focus": [
        "Errores de Pauli",
        "síndromes",
        "códigos",
        "medición",
        "corrección"
      ],
      "practice": "Simula un código de repetición didáctico y explica qué tipo de error corrige y cuál no.",
      "checks": [
        "No mide directamente información lógica",
        "Distingue detección y corrección",
        "Prueba patrones fuera del alcance"
      ],
      "question": "¿Repetir un qubit como un bit clásico resuelve todos los errores cuánticos?",
      "answer": "No: fases y restricciones de no clonación exigen codificaciones y procedimientos específicos.",
      "sourceIds": [
        "sci-quantum-qec"
      ],
      "scopeNote": "Introducción a corrección de errores; completar códigos estabilizadores y análisis formal."
    },
    {
      "id": "QUA-009",
      "focus": [
        "Qubits físicos",
        "control",
        "calibración",
        "lectura",
        "decoherencia"
      ],
      "practice": "Compara dos tecnologías de qubits a partir de fichas técnicas públicas y construye un presupuesto conceptual de errores.",
      "checks": [
        "No compara métricas de condiciones distintas",
        "Distingue fidelidad y coherencia",
        "Declara falta de validación experimental"
      ],
      "question": "¿Una fidelidad aislada describe toda la capacidad del dispositivo?",
      "answer": "No: conectividad, errores correlacionados, control y estabilidad también importan.",
      "sourceIds": [
        "sci-quantum-qec",
        "sci-quantum-general"
      ],
      "scopeNote": "Fuentes teóricas parciales; falta formación experimental específica de hardware y control."
    },
    {
      "id": "QUA-010",
      "focus": [
        "Qubits lógicos",
        "umbral",
        "overhead",
        "puertas lógicas",
        "recursos"
      ],
      "practice": "Estima recursos de un circuito hipotético bajo dos tasas de error y expone sensibilidad a supuestos.",
      "checks": [
        "Separa qubits físicos y lógicos",
        "Declara modelo de ruido",
        "No trata una estimación como diseño construido"
      ],
      "question": "¿Situar la tasa de error físico por debajo del umbral elimina el coste de corregir errores?",
      "answer": "No. Bajo las condiciones del teorema y un código, modelo de ruido y conjunto de operaciones determinados, permite reducir el error lógico aumentando recursos; continúan los costes de codificación, medición, control y decodificación.",
      "sourceIds": [
        "sci-quantum-qec"
      ],
      "scopeNote": "Preparación teórica; no equivale a diseñar un computador tolerante a fallos real."
    },
    {
      "id": "QUA-011",
      "focus": [
        "Algoritmos variacionales",
        "ansatz",
        "estimación",
        "optimización",
        "comparación clásica"
      ],
      "practice": "Resuelve un problema de juguete con un circuito variacional y una alternativa clásica bajo un presupuesto comparable.",
      "checks": [
        "Cuenta evaluaciones",
        "Reporta variación",
        "Incluye coste de medición"
      ],
      "question": "¿Una solución variacional buena demuestra ventaja cuántica?",
      "answer": "No: hace falta comparación justa, escala relevante y análisis completo de recursos.",
      "sourceIds": [
        "sci-quantum-algo",
        "sci-scipy"
      ],
      "scopeNote": "Las fuentes apoyan componentes; falta curso específico de simulación cuántica y optimización variacional."
    },
    {
      "id": "QUA-012",
      "focus": [
        "Kernels cuánticos",
        "modelos variacionales",
        "codificación",
        "generalización",
        "costes"
      ],
      "practice": "Diseña una comparación pequeña entre un clasificador clásico y un circuito simulado con los mismos datos y particiones.",
      "checks": [
        "Evita fuga",
        "Incluye coste de codificar datos",
        "No extrapola simulación a ventaja física"
      ],
      "question": "¿Más parámetros cuánticos garantizan mejor aprendizaje?",
      "answer": "No: capacidad, optimización, ruido y generalización requieren análisis y evaluación.",
      "sourceIds": [
        "sci-quantum-algo",
        "sci-sklearn"
      ],
      "scopeNote": "Apoyo de fundamentos; falta material específico verificado de ML cuántico completo."
    },
    {
      "id": "QUA-013",
      "focus": [
        "Amenaza cuántica",
        "KEM",
        "firmas",
        "migración",
        "criptoagilidad"
      ],
      "practice": "Inventaría algoritmos de una aplicación ficticia y prepara un plan de migración basado en estándares publicados, sin inventar criptografía.",
      "checks": [
        "Distingue KEM y firma",
        "Registra versión de estándar",
        "No usa ejemplos didácticos en producción"
      ],
      "question": "¿Criptografía poscuántica necesita un computador cuántico para ejecutarse?",
      "answer": "No: normalmente son algoritmos clásicos diseñados para resistir adversarios con capacidades cuánticas bajo supuestos analizados.",
      "sourceIds": [
        "sci-nist-pqc"
      ],
      "scopeNote": "Referencia oficial de estándares; implementación real requiere bibliotecas revisadas, pruebas e interoperabilidad."
    },
    {
      "id": "QUA-014",
      "focus": [
        "Compilación",
        "transpilación",
        "pruebas",
        "ruido",
        "reproducibilidad"
      ],
      "practice": "Organiza un proyecto de circuitos pequeños con pruebas de estados ideales y comparación bajo un modelo de ruido explícito.",
      "checks": [
        "Versiona dependencias",
        "Prueba convenciones de qubits",
        "Separa fallo de programa y error físico"
      ],
      "question": "¿Que un circuito compile implica que conserva todas las expectativas del usuario?",
      "answer": "No: deben comprobarse semántica, precisión, recursos, backend y condiciones de ejecución.",
      "sourceIds": [
        "sci-quantum-basic",
        "sci-llvm"
      ],
      "scopeNote": "Apoyo transversal; falta documentación específica del SDK elegido y una ruta completa de ingeniería cuántica."
    },
    {
      "id": "REP-001",
      "focus": [
        "síntoma e impacto",
        "clasificación de incidentes",
        "hipótesis y pruebas"
      ],
      "practice": "Con tres incidencias ficticias de una oficina, crea tickets con síntoma, prioridad justificada, preguntas iniciales y criterio de cierre.",
      "checks": [
        "Distingue síntoma de causa",
        "Prioriza por impacto y urgencia",
        "Define comprobación de resolución"
      ],
      "question": "¿Por qué reiniciar no demuestra la causa de una avería?",
      "answer": "Puede restablecer el servicio sin explicar el fallo; hay que contrastar hipótesis y conservar registros.",
      "sourceIds": [
        "hw-hardware",
        "hw-sre"
      ],
      "scopeNote": "Formación inicial de soporte; falta práctica supervisada con clientes y procedimientos organizativos."
    },
    {
      "id": "REP-002",
      "focus": [
        "CPU y memoria",
        "almacenamiento",
        "interfaces y compatibilidad"
      ],
      "practice": "Dibuja el recorrido de datos entre teclado, CPU, RAM y SSD; compara dos configuraciones ficticias y detecta tres incompatibilidades.",
      "checks": [
        "Identifica función de cada componente",
        "Justifica interfaz y compatibilidad",
        "Distingue RAM de almacenamiento"
      ],
      "question": "¿Aumentar RAM siempre acelera un equipo?",
      "answer": "Solo ayuda si la memoria es un cuello de botella; también limitan CPU, disco, software y temperatura.",
      "sourceIds": [
        "hw-hardware",
        "hw-arquitectura"
      ],
      "scopeNote": "Bases de componentes; completar manuales exactos y diagnóstico de fallas."
    },
    {
      "id": "REP-003",
      "focus": [
        "compatibilidad de plataforma",
        "secuencia de montaje documental",
        "validación posterior"
      ],
      "practice": "Elabora un plan de ensamblaje sobre papel para una PC de oficina y una lista de comprobación, sin abrir una fuente ni intervenir equipos energizados.",
      "checks": [
        "Comprueba socket y memoria",
        "Justifica potencia y conectores sin abrir módulos",
        "Define pruebas de arranque y estabilidad"
      ],
      "question": "¿Un conector físicamente similar garantiza compatibilidad?",
      "answer": "No: deben coincidir especificación eléctrica, protocolo, revisión y uso previsto.",
      "sourceIds": [
        "hw-hardware",
        "hw-seguridad"
      ],
      "scopeNote": "Plan seguro de montaje; el trabajo físico requiere manual y formación apropiados."
    },
    {
      "id": "REP-004",
      "focus": [
        "arranque y particiones",
        "instalación reproducible",
        "restauración"
      ],
      "practice": "En una máquina virtual desechable, instala un sistema, registra su configuración y demuestra restauración de un archivo de prueba desde un respaldo.",
      "checks": [
        "Separa disco virtual de discos reales",
        "Documenta particiones y versiones",
        "Restaura y verifica integridad"
      ],
      "question": "¿Una copia existente demuestra que puedes recuperar datos?",
      "answer": "No: una restauración de prueba permite comprobar legibilidad, integridad y procedimiento.",
      "sourceIds": [
        "hw-debian",
        "hw-hardware"
      ],
      "scopeNote": "Práctica en VM; no autoriza sobrescribir discos del usuario."
    },
    {
      "id": "REP-005",
      "focus": [
        "carga de recursos",
        "latencia y saturación",
        "comparación controlada"
      ],
      "practice": "Registra CPU, RAM y E/S de una aplicación de prueba en tres condiciones; propone una causa y compruébala cambiando una sola variable.",
      "checks": [
        "Conserva línea base",
        "Controla una variable",
        "Compara métricas antes/después"
      ],
      "question": "¿Una CPU alta prueba infección?",
      "answer": "No: puede corresponder a trabajo legítimo; se necesita contexto y evidencia adicional.",
      "sourceIds": [
        "hw-debian",
        "hw-sre"
      ],
      "scopeNote": "Diagnóstico de rendimiento; malware y recuperación requieren recorridos específicos."
    },
    {
      "id": "REP-006",
      "focus": [
        "magnitudes y unidades",
        "incertidumbre",
        "medición simulada"
      ],
      "practice": "En un simulador, predice y mide tensiones de un divisor de baja tensión; compara lectura esperada, tolerancias y error relativo.",
      "checks": [
        "Usa unidades coherentes",
        "Distingue medir tensión y corriente",
        "Calcula error sin medir red eléctrica"
      ],
      "question": "¿La resistencia se mide sobre un circuito energizado?",
      "answer": "No debe plantearse como práctica; usa un circuito desenergizado adecuado y el procedimiento del instrumento.",
      "sourceIds": [
        "hw-analogica",
        "hw-circuitos",
        "hw-seguridad"
      ],
      "scopeNote": "Actividad inicial simulada; no mediciones de red, baterías dañadas ni fuentes abiertas."
    },
    {
      "id": "REP-007",
      "focus": [
        "polvo y temperatura",
        "inventario",
        "mantenimiento trazable"
      ],
      "practice": "Crea un calendario de mantenimiento basado en riesgo para tres equipos ficticios y un registro con estado inicial, acción admitida por manual y verificación final.",
      "checks": [
        "Justifica periodicidad",
        "Separa limpieza externa de intervención interna",
        "Define pruebas de temperatura y funcionamiento"
      ],
      "question": "¿Mantenimiento preventivo significa cambiar piezas por calendario?",
      "answer": "No necesariamente; se decide por condición, riesgo, recomendaciones y evidencia, no por reemplazo indiscriminado.",
      "sourceIds": [
        "hw-hardware",
        "hw-dell",
        "hw-seguridad"
      ],
      "scopeNote": "No prescribe procedimientos internos universales ni apertura de fuentes."
    },
    {
      "id": "REP-008",
      "focus": [
        "documentación del modelo",
        "diagnóstico modular",
        "batería y puertos"
      ],
      "practice": "Usa el Latitude 5400 como caso documental: identifica manual, componentes reemplazables y pruebas para distinguir fallo de pantalla, sistema y alimentación modular.",
      "checks": [
        "Identifica modelo exacto",
        "Formula pruebas no invasivas",
        "Registra límites y derivación"
      ],
      "question": "¿Puede aplicarse el desmontaje de otra laptop similar?",
      "answer": "No: cambian tornillos, conectores, batería, piezas y orden de servicio.",
      "sourceIds": [
        "hw-dell",
        "hw-hardware",
        "hw-seguridad"
      ],
      "scopeNote": "Caso de un modelo; no curso completo de reparación de placas de laptop."
    },
    {
      "id": "REP-009",
      "focus": [
        "POST y arranque",
        "aislamiento de componentes",
        "prueba funcional"
      ],
      "practice": "Con un escenario de PC que no arranca, construye un árbol diagnóstico que distinga pantalla, memoria, almacenamiento y sistema sin intervenciones energizadas.",
      "checks": [
        "Cada rama tiene observación",
        "Evita sustituir piezas sin hipótesis",
        "Incluye verificación final"
      ],
      "question": "¿Que los ventiladores giren prueba un arranque correcto?",
      "answer": "No: solo muestra parte de la alimentación; faltan POST, vídeo, memoria, almacenamiento y sistema.",
      "sourceIds": [
        "hw-hardware",
        "hw-seguridad"
      ],
      "scopeNote": "Diagnóstico documental y modular; no reparación de fuente ni placa energizada."
    },
    {
      "id": "REP-010",
      "focus": [
        "código de modelo",
        "funciones del móvil",
        "diagnóstico autorizado"
      ],
      "practice": "Compara el índice del manual iPhone16 con Self-Repair Samsung; prepara una ficha de pruebas de pantalla, audio, carga y cámaras sin ejecutar una reparación.",
      "checks": [
        "Identifica alcance por modelo",
        "Protege datos y autorización",
        "No extrapola procedimientos"
      ],
      "question": "¿Un reinicio de fábrica es una primera prueba neutral?",
      "answer": "No: puede destruir datos; primero se protege información y se justifica cualquier acción irreversible.",
      "sourceIds": [
        "hw-iphone",
        "hw-samsung",
        "hw-seguridad"
      ],
      "scopeNote": "Manual por dispositivo; costes de herramientas y piezas y compatibilidad regional no incluidos."
    },
    {
      "id": "REP-011",
      "focus": [
        "tabletas y wearables",
        "compatibilidad",
        "validación posterior"
      ],
      "practice": "Diseña dos listas de pruebas separadas para una tableta y un wearable, incluyendo carga, pantalla, conexión y funciones propias del equipo.",
      "checks": [
        "Distingue funciones de cada categoría",
        "Comprueba manual aplicable",
        "Expone funciones no comprobadas"
      ],
      "question": "¿Un procedimiento de smartphone sirve automáticamente para una tableta?",
      "answer": "No: estructura, batería, pantalla y configuración pueden diferir incluso dentro de una misma marca.",
      "sourceIds": [
        "hw-samsung",
        "hw-apple-config",
        "hw-seguridad"
      ],
      "scopeNote": "Apoyo parcial: no manual de cada wearable ni formación universal por marca."
    },
    {
      "id": "REP-012",
      "focus": [
        "uniones y defectos",
        "inspección",
        "límites de intervención"
      ],
      "practice": "Sobre imágenes de placas de práctica, clasifica uniones y posibles defectos, elige qué evidencia faltaría y redacta un plan de formación supervisada sin intervenir baterías ni equipos conectados.",
      "checks": [
        "Distingue observación de diagnóstico",
        "Reconoce riesgo térmico y humos",
        "Define cuándo no intervenir"
      ],
      "question": "¿Una unión de aspecto irregular demuestra que es la causa?",
      "answer": "No: hace falta contexto, medición y pruebas; la apariencia aislada no establece causalidad.",
      "sourceIds": [
        "hw-soldadura",
        "hw-seguridad",
        "hw-analogica"
      ],
      "scopeNote": "La guía de soldadura no cubre BGA, todas las averías ni habilita reparación profesional."
    },
    {
      "id": "REP-013",
      "focus": [
        "bloques de alimentación",
        "secuencia funcional",
        "hipótesis de placa"
      ],
      "practice": "En un esquema didáctico de baja tensión simulado, dibuja bloques y predice qué señales esperarías en tres fallos ficticios; documenta por qué no basta un componente caliente.",
      "checks": [
        "Localiza bloques sin inferir causa única",
        "Relaciona predicción y prueba",
        "Declara límites del esquema"
      ],
      "question": "¿Un componente caliente es necesariamente el defectuoso?",
      "answer": "Puede calentarse por una carga o fallo situado en otra parte; se necesita diagnóstico de sistema.",
      "sourceIds": [
        "hw-analogica",
        "hw-circuitos",
        "hw-seguridad"
      ],
      "scopeNote": "Simulación introductoria; el diagnóstico real requiere esquemas, instrumental y supervisión."
    },
    {
      "id": "REP-014",
      "focus": [
        "integridad de datos",
        "imagen de trabajo",
        "restauración"
      ],
      "practice": "Genera una carpeta de prueba con archivos y hashes, copia a un medio virtual y comprueba recuperación; explica cómo conservarías el original en un caso real.",
      "checks": [
        "Trabaja solo con datos sintéticos",
        "Verifica hashes antes/después",
        "Distingue respaldo de recuperación forense"
      ],
      "question": "¿Se debe experimentar sobre la única copia dañada?",
      "answer": "No: se preserva el original y se trabaja sobre copias adecuadas; daños físicos se derivan a especialistas.",
      "sourceIds": [
        "hw-debian",
        "hw-seguridad"
      ],
      "scopeNote": "Recuperación lógica de práctica; no apertura de discos ni recuperación de hardware dañado."
    },
    {
      "id": "REP-015",
      "focus": [
        "identificación de firmware",
        "compatibilidad",
        "plan de reversión"
      ],
      "practice": "Analiza una actualización ficticia de firmware y crea una lista de condiciones para aceptar o rechazarla: modelo, versión, origen, energía, respaldo y recuperación documentada.",
      "checks": [
        "Verifica origen y revisión",
        "Identifica riesgo de incompatibilidad",
        "Define plan de recuperación sin flashear un equipo real"
      ],
      "question": "¿La versión más nueva siempre es apropiada?",
      "answer": "No: debe ser válida para el modelo y responder a una necesidad y procedimiento documentados.",
      "sourceIds": [
        "hw-dell",
        "hw-hardware",
        "hw-seguridad"
      ],
      "scopeNote": "Análisis documental; no flasheo de equipos ajenos ni evasión de bloqueos."
    },
    {
      "id": "REP-016",
      "focus": [
        "trazabilidad de repuestos",
        "compatibilidad",
        "control de calidad"
      ],
      "practice": "Crea un registro de tres repuestos ficticios con referencia, procedencia, compatibilidad, pruebas y criterio de aceptación; separa garantía comercial de prueba técnica.",
      "checks": [
        "No identifica compatibilidad solo por apariencia",
        "Registra lote o referencia",
        "Define prueba y resultado esperado"
      ],
      "question": "¿Una pieza que encaja físicamente es una reparación válida?",
      "answer": "No: deben verificarse especificación, funciones, seguridad y resultado documentado.",
      "sourceIds": [
        "hw-dell",
        "hw-iphone",
        "hw-hardware"
      ],
      "scopeNote": "Gestión técnica de ejemplo; condiciones de garantía deben consultarse en cada proveedor y país."
    },
    {
      "id": "REP-017",
      "focus": [
        "ESD",
        "baterías y energía almacenada",
        "residuos"
      ],
      "practice": "Clasifica diez situaciones de riesgo simuladas y prepara criterios de detener, aislar y derivar; redacta una ruta de residuos basada en un gestor local autorizado por verificar.",
      "checks": [
        "Diferencia ESD y choque eléctrico",
        "Reconoce batería dañada como derivación",
        "No asume descarga por tiempo fijo"
      ],
      "question": "¿Esperar un número de minutos garantiza que no hay energía peligrosa?",
      "answer": "No: depende del sistema y no sustituye un procedimiento seguro ni una comprobación competente.",
      "sourceIds": [
        "hw-seguridad",
        "hw-hardware"
      ],
      "scopeNote": "Debe estudiarse antes de cualquier reparación; gestión local de residuos requiere verificación específica."
    },
    {
      "id": "REP-018",
      "focus": [
        "consentimiento",
        "datos mínimos",
        "informe de servicio"
      ],
      "practice": "Redacta una orden de servicio ficticia con autorización, síntoma, estado inicial, pruebas, presupuesto separado y resultado; elimina identificadores personales del ejemplo.",
      "checks": [
        "Limita acceso a datos",
        "Separa observación de promesa",
        "Permite reproducir la verificación"
      ],
      "question": "¿Por qué documentar una falla que no pudiste resolver?",
      "answer": "Para conservar evidencia, explicar límites y permitir una derivación informada sin inventar éxito.",
      "sourceIds": [
        "hw-hardware",
        "hw-sre"
      ],
      "scopeNote": "Práctica comunicativa; contratos y obligaciones locales necesitan revisión competente."
    },
    {
      "id": "REP-019",
      "focus": [
        "acceso remoto autorizado",
        "inventario",
        "revocación"
      ],
      "practice": "Diseña una sesión de soporte remoto en una VM propia: alcance, consentimiento, acciones permitidas, registro, salida y retirada del acceso temporal.",
      "checks": [
        "Usa entorno propio",
        "Aplica mínimo privilegio",
        "Incluye cierre y revocación"
      ],
      "question": "¿Una herramienta remota instalada implica autorización permanente?",
      "answer": "No: el acceso debe responder a una autorización y alcance definidos, con cierre verificable.",
      "sourceIds": [
        "hw-debian",
        "hw-ad",
        "hw-seguridad"
      ],
      "scopeNote": "No administrar dispositivos de terceros ni exponer accesos persistentes en esta práctica."
    },
    {
      "id": "REP-020",
      "focus": [
        "diagnóstico multimarca",
        "trazabilidad",
        "verificación de reparación"
      ],
      "practice": "Integra tres casos documentales: PC con fallo de arranque, móvil con falla de función e impresora con cola detenida; entrega hipótesis, fuentes exactas, pruebas y derivación cuando corresponda.",
      "checks": [
        "Cada caso identifica modelo y límites",
        "Cada corrección se valida",
        "No confunde guía con experiencia profesional"
      ],
      "question": "¿Qué diferencia un informe completo de una lista de piezas cambiadas?",
      "answer": "Explica síntoma, hipótesis, pruebas, decisión, resultado y límites con evidencia trazable.",
      "sourceIds": [
        "hw-hardware",
        "hw-iphone",
        "hw-hp",
        "hw-seguridad"
      ],
      "scopeNote": "Capstone inicial de diagnóstico; placa, modelos no documentados y práctica física requieren supervisión."
    },
    {
      "id": "EIO-001",
      "focus": [
        "tensión y corriente",
        "potencia",
        "riesgo y límites"
      ],
      "practice": "Clasifica diagramas de laboratorios simulados y diseña una práctica de circuito de baja tensión con límites del instrumento y criterios de detenerla.",
      "checks": [
        "Identifica fuentes de energía",
        "Relaciona potencia y calentamiento",
        "Excluye red eléctrica y baterías dañadas"
      ],
      "question": "¿Una tensión baja elimina todos los riesgos?",
      "answer": "No: también importan corriente disponible, temperatura, energía almacenada y química de baterías.",
      "sourceIds": [
        "hw-seguridad",
        "hw-analogica"
      ],
      "scopeNote": "Introducción con simulación; no habilitación para instalaciones ni equipos de potencia."
    },
    {
      "id": "EIO-002",
      "focus": [
        "leyes de Kirchhoff",
        "divisores",
        "equivalente de Thévenin"
      ],
      "practice": "Resuelve un circuito resistivo de dos mallas de valores elegidos y contrasta corrientes con simulación; incluye carga y equivalente de Thévenin.",
      "checks": [
        "Cumple KCL y KVL",
        "Conserva unidades",
        "Explica efecto de carga"
      ],
      "question": "¿Por qué cambia un divisor al conectar una carga?",
      "answer": "La carga modifica la resistencia equivalente y por tanto corrientes y tensiones.",
      "sourceIds": [
        "hw-circuitos"
      ],
      "scopeNote": "Circuitos lineales básicos; completar problemas independientes de la asignatura."
    },
    {
      "id": "EIO-003",
      "focus": [
        "fasores",
        "transitorios RC/RL",
        "función de transferencia"
      ],
      "practice": "Modela un filtro RC simulado, compara respuesta a escalón y barrido de frecuencia y predice cómo cambia al duplicar R.",
      "checks": [
        "Relaciona constante de tiempo y corte",
        "Comprueba límites de frecuencia",
        "Distingue transitorio y régimen"
      ],
      "question": "¿El régimen sinusoidal describe todo el arranque?",
      "answer": "No: el transitorio depende del estado inicial y de los polos del sistema.",
      "sourceIds": [
        "hw-circuitos"
      ],
      "scopeNote": "Fundamentos lineales; redes no lineales y diseño avanzado requieren ampliación."
    },
    {
      "id": "EIO-004",
      "focus": [
        "diodos",
        "polarización de transistor",
        "amplificadores"
      ],
      "practice": "Simula una etapa de baja tensión y compara dos puntos de polarización; registra región de operación, ganancia y distorsión.",
      "checks": [
        "Justifica punto de operación",
        "Distingue señal pequeña y saturación",
        "Confronta teoría y simulación"
      ],
      "question": "¿Una ganancia alta garantiza señal útil?",
      "answer": "No si recorta, amplifica ruido o sale de la región prevista.",
      "sourceIds": [
        "hw-analogica",
        "hw-circuitos"
      ],
      "scopeNote": "Actividad analógica inicial; no reparación de fuentes o potencia."
    },
    {
      "id": "EIO-005",
      "focus": [
        "realimentación",
        "respuesta en frecuencia",
        "ruido y estabilidad"
      ],
      "practice": "Compara dos amplificadores simulados con distinta realimentación y mide ganancia, banda y comportamiento ante escalón.",
      "checks": [
        "Identifica compromiso ganancia-banda",
        "Comprueba margen de saturación",
        "Discute estabilidad sin limitarse a ganancia DC"
      ],
      "question": "¿La realimentación negativa siempre mejora cualquier circuito?",
      "answer": "Su efecto depende de fase, retardos y diseño; puede introducir inestabilidad si se aplica sin análisis.",
      "sourceIds": [
        "hw-analogica",
        "hw-circuitos"
      ],
      "scopeNote": "Requiere análisis avanzado adicional de estabilidad, ruido y diseño físico."
    },
    {
      "id": "EIO-006",
      "focus": [
        "álgebra de Boole",
        "combinacionales",
        "secuenciales"
      ],
      "practice": "Diseña en simulación un controlador de semáforo lógico con estados y reset; genera tabla de verdad y banco de pruebas.",
      "checks": [
        "Salidas concuerdan con tabla",
        "Reset lleva a estado definido",
        "Detecta una transición inválida"
      ],
      "question": "¿Qué distingue un circuito secuencial de uno combinacional?",
      "answer": "El secuencial depende de estado almacenado además de las entradas presentes.",
      "sourceIds": [
        "hw-fpga",
        "hw-arquitectura"
      ],
      "scopeNote": "Fundamentos digitales; temporización física y verificación avanzada quedan para profundización."
    },
    {
      "id": "EIO-007",
      "focus": [
        "unión PN",
        "MOSFET",
        "modelos y regiones"
      ],
      "practice": "Compara curvas simuladas de diodo y MOSFET para varias condiciones y explica dónde falla un modelo ideal.",
      "checks": [
        "Distingue modelo y dispositivo real",
        "Reconoce regiones de operación",
        "Interpreta curvas con unidades"
      ],
      "question": "¿El modelo ideal es una propiedad exacta del componente?",
      "answer": "No: es una aproximación válida en un dominio y con supuestos determinados.",
      "sourceIds": [
        "hw-analogica"
      ],
      "scopeNote": "Introducción a dispositivos; fabricación, caracterización real y física profunda no quedan cubiertas."
    },
    {
      "id": "EIO-008",
      "focus": [
        "conmutación",
        "eficiencia",
        "pérdidas y control"
      ],
      "practice": "Analiza solo por simulación un convertidor didáctico de baja tensión con carga variable; estima potencia de entrada/salida y pérdidas sin construir un equipo de potencia.",
      "checks": [
        "Calcula eficiencia coherente",
        "Identifica fuentes de pérdidas",
        "Declara límites de seguridad y modelo"
      ],
      "question": "¿El interruptor ideal representa las pérdidas reales?",
      "answer": "No: conducción, conmutación, parásitos y temperatura alteran el comportamiento.",
      "sourceIds": [
        "hw-circuitos",
        "hw-analogica",
        "hw-seguridad"
      ],
      "scopeNote": "Los recursos apoyan fundamentos, no una formación completa de electrónica de potencia; falta curso especializado y laboratorio supervisado."
    },
    {
      "id": "EIO-009",
      "focus": [
        "calibración",
        "resolución",
        "incertidumbre"
      ],
      "practice": "Construye un presupuesto de incertidumbre para una lectura simulada con resolución y tolerancia conocidas; decide cuántas cifras reportar.",
      "checks": [
        "Distingue exactitud y resolución",
        "Propaga unidades e incertidumbre",
        "Justifica redondeo"
      ],
      "question": "¿Más decimales implican mayor exactitud?",
      "answer": "No: la precisión mostrada no elimina los errores ni las limitaciones del instrumento.",
      "sourceIds": [
        "hw-analogica"
      ],
      "scopeNote": "Metrología inicial; trazabilidad y calibración real requieren patrones y procedimientos."
    },
    {
      "id": "EIO-010",
      "focus": [
        "muestreo",
        "aliasing",
        "filtrado digital"
      ],
      "practice": "Genera dos senoidales sintéticas, muestrea a tasas distintas y demuestra un caso de aliasing; compara un filtro FIR sencillo con la señal original.",
      "checks": [
        "Declara frecuencia de muestreo",
        "Identifica frecuencia alias",
        "Evalúa retardo y atenuación"
      ],
      "question": "¿Un filtro digital elimina aliasing ya introducido?",
      "answer": "No recupera por sí solo información perdida; el antialiasing se plantea antes del muestreo.",
      "sourceIds": [
        "hw-circuitos",
        "hw-control"
      ],
      "scopeNote": "Los recursos aquí apoyan base de señales/control; completar un curso de DSP para diseño avanzado."
    },
    {
      "id": "EIO-011",
      "focus": [
        "esquemático",
        "reglas eléctricas",
        "diseño físico"
      ],
      "practice": "Crea una PCB didáctica de baja tensión en KiCad; entrega esquemático, comprobación ERC/DRC, lista de materiales y salidas de fabricación sin mandarla a producir.",
      "checks": [
        "Relaciona netlist y PCB",
        "Revisa errores y excepciones",
        "Documenta conectores y polaridades"
      ],
      "question": "¿Pasar DRC demuestra que el circuito funciona?",
      "answer": "No: verifica ciertas reglas geométricas, no el comportamiento funcional ni todos los requisitos físicos.",
      "sourceIds": [
        "hw-kicad",
        "hw-circuitos"
      ],
      "scopeNote": "Tutorial parcialmente inglés; diseño de alta velocidad, EMC y certificación requieren formación adicional."
    },
    {
      "id": "EIO-012",
      "focus": [
        "humectación",
        "defectos de unión",
        "inspección y retrabajo"
      ],
      "practice": "Analiza imágenes de uniones de soldadura y clasifica defectos posibles sin intervenir el equipo. Si se realiza una práctica física, limitarla a una placa de entrenamiento declarada segura por un instructor, sin conexión, baterías ni energía almacenada; documentar inspección y límites.",
      "checks": [
        "Reconoce puentes y uniones dudosas",
        "Separa inspección de causalidad",
        "Define protección y derivación"
      ],
      "question": "¿Soldar correctamente prueba que diagnosticabas bien?",
      "answer": "No: la destreza de unión y la localización de la causa son competencias distintas.",
      "sourceIds": [
        "hw-soldadura",
        "hw-seguridad"
      ],
      "scopeNote": "Inicio por imágenes o simulación. Una placa de descarte o desconectada no es automáticamente segura. La práctica física requiere instructor, extracción y protección; no se indican maniobras de descarga a principiantes ni se trabajan baterías o condensadores cargados."
    },
    {
      "id": "EIO-013",
      "focus": [
        "proceso de fabricación",
        "restricciones de diseño",
        "rendimiento de fabricación"
      ],
      "practice": "Dibuja el flujo conceptual de una puerta CMOS desde descripción hasta verificación y fabricación; clasifica qué se simula y qué necesita proceso industrial.",
      "checks": [
        "Distingue diseño y fabricación",
        "Explica variabilidad y rendimiento",
        "Reconoce límites del modelo lógico"
      ],
      "question": "¿Un HDL sintetizable demuestra un chip fabricable?",
      "answer": "No: faltan implementación física, reglas del proceso, verificación y manufactura.",
      "sourceIds": [
        "hw-fpga",
        "hw-analogica"
      ],
      "scopeNote": "Apoyo parcial de lógica/dispositivos; falta curso específico de microelectrónica y fabricación."
    },
    {
      "id": "EIO-014",
      "focus": [
        "acoplamiento",
        "retorno de corriente",
        "emisiones e inmunidad"
      ],
      "practice": "Revisa un diseño ficticio de PCB y señala tres rutas de acoplamiento con una propuesta de simulación o medición supervisada para cada una.",
      "checks": [
        "Distingue conducido y radiado",
        "Relaciona ruta de retorno con señal",
        "No confunde sugerencia con cumplimiento"
      ],
      "question": "¿Una placa que funciona en la mesa cumple EMC?",
      "answer": "No: funcionamiento y compatibilidad electromagnética son requisitos diferentes y necesitan pruebas apropiadas.",
      "sourceIds": [
        "hw-kicad",
        "hw-circuitos"
      ],
      "scopeNote": "Fundamentos orientativos; no sustituye estándares ni ensayo EMC de laboratorio."
    },
    {
      "id": "EIO-015",
      "focus": [
        "regulación",
        "almacenamiento de energía",
        "protección y límites"
      ],
      "practice": "Compara en simulación dos reguladores de baja tensión y prepara una ficha de riesgos de baterías sin abrirlas, cargarlas experimentalmente ni construir una fuente conectada a red.",
      "checks": [
        "Estima disipación",
        "Distingue energía y potencia",
        "Identifica condiciones de derivación"
      ],
      "question": "¿Un circuito sin conectar a la red está necesariamente sin energía?",
      "answer": "No: condensadores y baterías pueden conservar energía.",
      "sourceIds": [
        "hw-circuitos",
        "hw-seguridad"
      ],
      "scopeNote": "Simulación y análisis; falta curso especializado y supervisión para fuentes/baterías reales."
    },
    {
      "id": "EIO-016",
      "focus": [
        "GPIO",
        "interrupciones",
        "temporizadores"
      ],
      "practice": "Modela un microcontrolador que lee un pulsador simulado y genera un evento periódico; compara sondeo e interrupción con una traza de tiempos.",
      "checks": [
        "Define estados y entradas",
        "Mide latencia simulada",
        "Evita pérdida o duplicación de evento"
      ],
      "question": "¿Una interrupción es siempre mejor que sondeo?",
      "answer": "No: depende de tasas, latencia, consumo y complejidad del diseño.",
      "sourceIds": [
        "hw-embebidos",
        "hw-micro"
      ],
      "scopeNote": "No incluye todas las familias de MCU; consultar datasheet de la plataforma concreta."
    },
    {
      "id": "EIO-017",
      "focus": [
        "memoria y registros",
        "C y compilación",
        "pruebas de firmware"
      ],
      "practice": "Escribe un controlador simulado de sensor con interfaz separada del hardware y pruebas para lectura válida, error y tiempo agotado.",
      "checks": [
        "Evita acceso fuera de límites",
        "Separa lógica y periferia",
        "Prueba estados de error"
      ],
      "question": "¿Una prueba de escritorio valida todas las propiedades del firmware?",
      "answer": "No: el hardware real puede introducir temporización, concurrencia y restricciones eléctricas distintas.",
      "sourceIds": [
        "hw-embebidos"
      ],
      "scopeNote": "C/arquitectura y pruebas iniciales; completar herramientas y normas del dominio concreto."
    },
    {
      "id": "EIO-018",
      "focus": [
        "HDL y síntesis",
        "máquina de estados",
        "testbench"
      ],
      "practice": "Describe un contador con enable y reset, crea secuencias de prueba y compara comportamiento esperado con simulación antes de considerar una placa.",
      "checks": [
        "Prueba límites y reset",
        "Distingue simulación y síntesis",
        "Explica ciclo y almacenamiento"
      ],
      "question": "¿El HDL se ejecuta como un programa secuencial convencional?",
      "answer": "No necesariamente: describe estructuras y comportamiento concurrente del hardware.",
      "sourceIds": [
        "hw-fpga"
      ],
      "scopeNote": "El tutorial inicia FPGA; ASIC, timing closure y verificación formal requieren profundidad adicional."
    },
    {
      "id": "EIO-019",
      "focus": [
        "arquitecturas de firmware",
        "concurrencia",
        "recuperación de fallos"
      ],
      "practice": "Diseña un sistema simulado de adquisición con cola limitada, watchdog conceptual y política de recuperación; somételo a sobrecarga de eventos.",
      "checks": [
        "Modela límites de cola",
        "Explica prioridades y bloqueo",
        "Verifica recuperación sin perder trazabilidad"
      ],
      "question": "¿Un watchdog corrige la causa de un bloqueo?",
      "answer": "Puede recuperar servicio, pero no sustituye diagnóstico y corrección de la causa.",
      "sourceIds": [
        "hw-embebidos"
      ],
      "scopeNote": "Arquitectura inicial; sistemas críticos necesitan procesos y evaluación específicos."
    },
    {
      "id": "EIO-020",
      "focus": [
        "imagen reproducible",
        "dependencias",
        "actualización embebida"
      ],
      "practice": "Prepara una especificación de imagen Linux mínima en VM o contenedor y un inventario de componentes, licencias y estrategia A/B conceptual; no flashees un dispositivo real.",
      "checks": [
        "Fija versiones",
        "Distingue host y target",
        "Explica recuperación tras actualización fallida"
      ],
      "question": "¿Una distribución Linux de escritorio equivale a una imagen embebida reproducible?",
      "answer": "No: cambian construcción, dependencias, arranque, recursos y actualización.",
      "sourceIds": [
        "hw-debian",
        "hw-embebidos"
      ],
      "scopeNote": "Base de Linux/embebidos; no se verificó aquí un curso completo de Yocto, pendiente documentación oficial específica."
    },
    {
      "id": "EIO-021",
      "focus": [
        "rango y sensibilidad",
        "calibración",
        "actuación segura"
      ],
      "practice": "Simula un sensor con ruido y sesgo; ajusta calibración de dos puntos y diseña una salida limitada para un actuador ficticio.",
      "checks": [
        "Distingue rango y resolución",
        "Mide error antes/después",
        "Modela límites y estado seguro"
      ],
      "question": "¿Calibrar elimina todo error del sensor?",
      "answer": "No: quedan no linealidad, ruido, deriva y condiciones no modeladas.",
      "sourceIds": [
        "hw-analogica",
        "hw-embebidos"
      ],
      "scopeNote": "Práctica simulada; actuadores físicos requieren análisis mecánico y eléctrico."
    },
    {
      "id": "EIO-022",
      "focus": [
        "UART",
        "I2C y SPI",
        "errores y temporización"
      ],
      "practice": "Construye trazas ficticias de tres buses y explica selección de dispositivo, temporización y tratamiento de un intercambio incompleto.",
      "checks": [
        "Distingue sincronía y topología",
        "Identifica datos y control",
        "Incluye manejo de error"
      ],
      "question": "¿Que un conector encaje garantiza que el bus sea compatible?",
      "answer": "No: niveles eléctricos, protocolo, modo y temporización deben coincidir.",
      "sourceIds": [
        "hw-embebidos",
        "hw-fpga"
      ],
      "scopeNote": "Introducción por trazas; verificar especificación y datasheet del dispositivo exacto."
    },
    {
      "id": "EIO-023",
      "focus": [
        "dispositivo y gateway",
        "mensajería",
        "gestión de identidad"
      ],
      "practice": "Diseña una red IoT simulada con tres sensores, un gateway y un consumidor local; documenta identidad, datos, desconexión y actualización.",
      "checks": [
        "Distingue capas y responsabilidades",
        "Define comportamiento offline",
        "Evita credenciales compartidas en el diseño"
      ],
      "question": "¿Conectar un sensor a Internet completa una arquitectura IoT?",
      "answer": "No: faltan gestión, seguridad, datos, operación y ciclo de vida.",
      "sourceIds": [
        "hw-embebidos",
        "hw-redes",
        "hw-aws"
      ],
      "scopeNote": "Arquitectura de estudio; no certificación ni despliegue físico completo."
    },
    {
      "id": "EIO-024",
      "focus": [
        "alcance y consumo",
        "tasa útil",
        "restricciones del medio"
      ],
      "practice": "Compara dos enlaces ficticios de largo alcance para mensajes pequeños mediante presupuesto de datos, latencia y energía; declara supuestos regulatorios por verificar.",
      "checks": [
        "Calcula mensajes y bytes diarios",
        "Distingue tasa bruta y útil",
        "Expone límites de espectro y cobertura"
      ],
      "question": "¿Mayor alcance implica mayor capacidad de datos?",
      "answer": "No: alcance, ancho de banda, energía y fiabilidad suelen imponer compromisos.",
      "sourceIds": [
        "hw-telecom",
        "hw-antenas"
      ],
      "scopeNote": "Fundamentos de enlace; LPWAN concreto requiere especificación, normativa y curso especializado."
    },
    {
      "id": "EIO-025",
      "focus": [
        "ingesta",
        "gestión de dispositivos",
        "coste y retención"
      ],
      "practice": "Dibuja una solución IoT con ingesta local y una variante cloud en papel; estima mensajes, almacenamiento y dependencias sin crear servicios de pago.",
      "checks": [
        "Separa ingesta y control",
        "Identifica costes potenciales",
        "Documenta autenticación y retención"
      ],
      "question": "¿Un nivel gratuito garantiza coste cero a cualquier escala?",
      "answer": "No: cuotas, servicios asociados, región y uso cambian el coste.",
      "sourceIds": [
        "hw-aws",
        "hw-gcp",
        "hw-embebidos"
      ],
      "scopeNote": "Arquitectura comparada; las plataformas cloud no son gratuitas por el hecho de tener documentación abierta."
    },
    {
      "id": "EIO-026",
      "focus": [
        "cuantización",
        "latencia",
        "memoria y energía"
      ],
      "practice": "Compara un modelo pequeño con su versión reducida usando datos sintéticos; registra tamaño, tiempo y error para una decisión de ejecución en borde.",
      "checks": [
        "Mide más que exactitud",
        "Contrasta la misma partición",
        "Declara hardware y limitaciones"
      ],
      "question": "¿Reducir tamaño de modelo siempre conserva calidad?",
      "answer": "No: cuantización y compresión pueden alterar resultados, robustez y latencia de manera distinta.",
      "sourceIds": [
        "hw-embebidos",
        "hw-hpc"
      ],
      "scopeNote": "Apoyo parcial sobre recursos; falta curso técnico completo de TinyML y evaluación en dispositivo."
    },
    {
      "id": "EIO-027",
      "focus": [
        "amenazas",
        "identidad",
        "actualización y datos"
      ],
      "practice": "Modela amenazas de un sensor ficticio que envía temperatura; define autenticación, minimización de datos y reacción a una actualización inválida.",
      "checks": [
        "Incluye activos y atacantes",
        "Separa seguridad y privacidad",
        "Prevé revocación y recuperación"
      ],
      "question": "¿Cifrar el canal basta para proteger un dispositivo IoT?",
      "answer": "No: también importan identidad, actualizaciones, firmware, permisos y operación.",
      "sourceIds": [
        "hw-aws",
        "hw-gcp",
        "hw-embebidos"
      ],
      "scopeNote": "Diseño inicial; falta validación de implementación y pruebas de hardware autorizadas."
    },
    {
      "id": "EIO-028",
      "focus": [
        "consumo",
        "ergonomía",
        "privacidad y sensores"
      ],
      "practice": "Diseña en papel un wearable de actividad con presupuesto de energía, datos mínimos y criterios de comodidad; simula lecturas en vez de medir una persona.",
      "checks": [
        "Calcula autonomía bajo supuestos",
        "No infiere salud de datos ficticios",
        "Justifica datos y almacenamiento"
      ],
      "question": "¿Un wearable con sensores constituye un dispositivo médico validado?",
      "answer": "No: ese uso exige evidencia y procesos adicionales del dominio.",
      "sourceIds": [
        "hw-embebidos",
        "hw-seguridad"
      ],
      "scopeNote": "Prototipo conceptual; no guía médica ni validación de producto físico."
    },
    {
      "id": "EIO-029",
      "focus": [
        "disponibilidad",
        "segmentación",
        "telemetría industrial"
      ],
      "practice": "Simula una línea productiva con sensores ficticios y documenta qué ocurre si falla red, reloj o gateway; separa supervisión y control de seguridad.",
      "checks": [
        "Define estados degradados",
        "Modela límites de latencia",
        "No depende de Internet para función segura"
      ],
      "question": "¿IoT industrial y control de seguridad son intercambiables?",
      "answer": "No: sus requisitos y procesos de validación pueden ser distintos.",
      "sourceIds": [
        "hw-embebidos",
        "hw-redes2",
        "hw-sre"
      ],
      "scopeNote": "Análisis simulado; no intervención en PLC o maquinaria industrial real."
    },
    {
      "id": "EIO-030",
      "focus": [
        "modelo y estado",
        "sincronización",
        "validación"
      ],
      "practice": "Crea un gemelo digital simple de un depósito simulado y compara nivel predicho con observaciones sintéticas con ruido y retraso.",
      "checks": [
        "Define modelo y supuestos",
        "Mide divergencia",
        "Distingue simulador de gemelo conectado"
      ],
      "question": "¿Un modelo 3D por sí solo es un gemelo digital validado?",
      "answer": "No: se necesitan correspondencia con el sistema, datos, actualización y criterios de validez.",
      "sourceIds": [
        "hw-control",
        "hw-embebidos"
      ],
      "scopeNote": "Introducción; integración industrial y validación requieren modelos y datos del sistema real."
    },
    {
      "id": "SYS-001",
      "focus": [
        "puertas lógicas",
        "codificación",
        "estado"
      ],
      "practice": "Diseña y simula un sumador pequeño y un registro; entrega tablas y una secuencia que muestre la diferencia entre combinacional y secuencial.",
      "checks": [
        "Verifica todos los casos pequeños",
        "Controla reset",
        "Distingue valor de bit y tiempo"
      ],
      "question": "¿La misma entrada produce siempre la misma salida en un circuito con memoria?",
      "answer": "No: también depende del estado previo.",
      "sourceIds": [
        "hw-arquitectura",
        "hw-fpga"
      ],
      "scopeNote": "Base digital; no diseño completo de CPU."
    },
    {
      "id": "SYS-002",
      "focus": [
        "ciclo de instrucción",
        "registros",
        "jerarquía de memoria"
      ],
      "practice": "Traza un programa de cuatro instrucciones en una máquina didáctica, mostrando cambios en PC, registros y memoria.",
      "checks": [
        "Distingue dirección y dato",
        "Actualiza PC correctamente",
        "Explica cada transferencia"
      ],
      "question": "¿La instrucción y el dato son conceptos idénticos?",
      "answer": "Pueden codificarse como bits, pero tienen funciones diferentes según su interpretación en la arquitectura.",
      "sourceIds": [
        "hw-arquitectura",
        "hw-micro"
      ],
      "scopeNote": "Organización didáctica; ampliar arquitectura y concurrencia."
    },
    {
      "id": "SYS-003",
      "focus": [
        "ISA y microarquitectura",
        "caché",
        "paralelismo"
      ],
      "practice": "Compara dos microarquitecturas ficticias con la misma ISA mediante CPI, frecuencia y fallos de caché sobre una carga definida.",
      "checks": [
        "Calcula tiempo total",
        "No compara solo GHz",
        "Declara carga y supuestos"
      ],
      "question": "¿Misma ISA implica mismo rendimiento?",
      "answer": "No: implementación, memoria, frecuencia y carga determinan el rendimiento observado.",
      "sourceIds": [
        "hw-arquitectura",
        "hw-micro"
      ],
      "scopeNote": "Conceptos y evaluación; no especificación de todas las arquitecturas actuales."
    },
    {
      "id": "SYS-004",
      "focus": [
        "procesos e hilos",
        "planificación",
        "memoria virtual"
      ],
      "practice": "En una VM propia, observa procesos y simula dos planificadores con una tabla de llegadas y ráfagas; compara espera y respuesta.",
      "checks": [
        "Usa la misma carga",
        "Distingue proceso e hilo",
        "Calcula métricas de planificación"
      ],
      "question": "¿Concurrencia implica ejecutar físicamente todo a la vez?",
      "answer": "No: puede alternarse ejecución; paralelismo requiere ejecución simultánea.",
      "sourceIds": [
        "hw-debian",
        "hw-concurrencia"
      ],
      "scopeNote": "Práctica inicial; completar curso de sistemas operativos y ejercicios de memoria/E/S."
    },
    {
      "id": "SYS-005",
      "focus": [
        "sincronización",
        "interbloqueo",
        "recursos compartidos"
      ],
      "practice": "Escribe una simulación productor-consumidor con una cola acotada, introduce una condición de carrera y documenta una corrección y su coste.",
      "checks": [
        "Reproduce el error",
        "Prueba límites de cola",
        "Justifica ausencia de bloqueo en el modelo"
      ],
      "question": "¿Añadir un mutex prueba que no existen errores concurrentes?",
      "answer": "No: pueden persistir interbloqueo, orden incorrecto o accesos no protegidos.",
      "sourceIds": [
        "hw-concurrencia",
        "hw-debian"
      ],
      "scopeNote": "No cubre todas las pruebas de concurrencia de un kernel real."
    },
    {
      "id": "SYS-006",
      "focus": [
        "sistemas de archivos",
        "consistencia",
        "almacenamiento"
      ],
      "practice": "En un disco virtual desechable, compara tamaño lógico y uso físico de archivos y diseña una prueba de restauración; no alteres discos personales.",
      "checks": [
        "Distingue archivo y bloque",
        "Registra integridad",
        "Explica efecto de caché y sincronización"
      ],
      "question": "¿Guardar un archivo significa que todos sus bytes ya llegaron al medio persistente?",
      "answer": "Depende de cachés y garantías de sincronización; debe estudiarse el modelo de persistencia.",
      "sourceIds": [
        "hw-debian"
      ],
      "scopeNote": "Práctica virtual; RAID y recuperación física avanzada requieren materiales adicionales."
    },
    {
      "id": "SYS-007",
      "focus": [
        "hipervisor",
        "aislamiento",
        "recursos virtuales"
      ],
      "practice": "Diseña dos VMs de laboratorio con redes aisladas y presupuesto de memoria; documenta qué restaura una instantánea y qué no.",
      "checks": [
        "No confunde VM con respaldo",
        "Aísla redes de práctica",
        "Calcula recursos totales"
      ],
      "question": "¿Una instantánea sustituye un respaldo independiente?",
      "answer": "No: puede compartir riesgos con el almacenamiento original y no garantizar recuperación externa.",
      "sourceIds": [
        "hw-debian"
      ],
      "scopeNote": "Administración introductoria; verificar hipervisor y versión concretos."
    },
    {
      "id": "SYS-008",
      "focus": [
        "imagen y contenedor",
        "capas",
        "volúmenes y red"
      ],
      "practice": "Empaqueta una aplicación de prueba local y un archivo de datos; documenta qué persiste al recrear el contenedor y qué está en la imagen.",
      "checks": [
        "Distingue estado y código",
        "Reproduce construcción",
        "Prueba persistencia con datos sintéticos"
      ],
      "question": "¿Un contenedor es una máquina virtual completa?",
      "answer": "No necesariamente: normalmente comparte kernel y tiene aislamiento a otro nivel.",
      "sourceIds": [
        "hw-docker"
      ],
      "scopeNote": "Tutorial en inglés; revisar licencia de Desktop y riesgos antes de uso empresarial."
    },
    {
      "id": "SYS-009",
      "focus": [
        "fallos parciales",
        "mensajería",
        "consistencia"
      ],
      "practice": "Simula dos servicios que intercambian mensajes con pérdida y duplicación; diseña identificadores de operación y registra resultados.",
      "checks": [
        "Incluye duplicados",
        "Distingue fallo parcial y total",
        "Justifica idempotencia"
      ],
      "question": "¿Un timeout demuestra que una operación no se ejecutó?",
      "answer": "No: la respuesta puede perderse después de ejecutar la operación.",
      "sourceIds": [
        "hw-sre",
        "hw-redes2"
      ],
      "scopeNote": "Introducción al razonamiento distribuido; falta curso teórico completo y pruebas amplias."
    },
    {
      "id": "SYS-010",
      "focus": [
        "replicación",
        "consenso",
        "particiones"
      ],
      "practice": "Modela tres réplicas con una partición de red y compara decisiones de disponibilidad y consistencia para una agenda ficticia.",
      "checks": [
        "Define modelo de fallo",
        "No promete consenso sin supuestos",
        "Explica pérdida de disponibilidad"
      ],
      "question": "¿Replicar elimina automáticamente todos los fallos?",
      "answer": "No: puede propagar errores y necesita protocolos, recuperación y límites claros.",
      "sourceIds": [
        "hw-sre"
      ],
      "scopeNote": "Apoyo conceptual y operativo; profundizar en algoritmos formales y demostraciones."
    },
    {
      "id": "SYS-011",
      "focus": [
        "plazos",
        "planificación",
        "latencia máxima"
      ],
      "practice": "Simula tareas periódicas con tiempos de ejecución y plazos; calcula utilización y construye una traza que muestre un plazo incumplido.",
      "checks": [
        "Distingue promedio y peor caso",
        "Modela interrupciones",
        "Justifica supuestos de planificabilidad"
      ],
      "question": "¿Un promedio de respuesta bajo garantiza tiempo real?",
      "answer": "No: los plazos requieren límites y análisis de casos pertinentes, no solo promedio.",
      "sourceIds": [
        "hw-embebidos"
      ],
      "scopeNote": "Simulación educativa; sistemas críticos necesitan análisis y validación específicos."
    },
    {
      "id": "SYS-012",
      "focus": [
        "arranque",
        "periféricos",
        "firmware"
      ],
      "practice": "Diseña un sistema embebido simulado de monitorización con estados de arranque, operación, error y recuperación; separa lógica del sensor.",
      "checks": [
        "Define interfaces",
        "Prueba fallo de lectura",
        "Documenta arranque y recuperación"
      ],
      "question": "¿Embebido significa simplemente pequeño?",
      "answer": "No: integra cómputo con un propósito y restricciones de un sistema concreto.",
      "sourceIds": [
        "hw-embebidos"
      ],
      "scopeNote": "Base con curso de 2021; plataforma y datasheets adicionales son necesarios."
    },
    {
      "id": "SYS-013",
      "focus": [
        "descomposición paralela",
        "comunicación",
        "escalabilidad"
      ],
      "practice": "Paraleliza una suma sobre datos sintéticos o simúlala; mide speedup para varias particiones e identifica coste de coordinación.",
      "checks": [
        "Compara misma precisión y datos",
        "Incluye versión secuencial",
        "Calcula eficiencia"
      ],
      "question": "¿Duplicar núcleos duplica siempre la velocidad?",
      "answer": "No: parte secuencial, comunicación, memoria y tamaño del problema limitan la mejora.",
      "sourceIds": [
        "hw-hpc"
      ],
      "scopeNote": "Material introductorio de 2013; HPC actual y aceleradores requieren ampliación."
    },
    {
      "id": "SYS-014",
      "focus": [
        "perfilado",
        "línea base",
        "cuellos de botella"
      ],
      "practice": "Perfila dos versiones de una operación local con varias repeticiones; informa dispersión y efecto de una mejora aislada.",
      "checks": [
        "No usa una sola medición",
        "Conserva condiciones",
        "Relaciona perfil y cambio"
      ],
      "question": "¿Optimizar la función más larga siempre mejora la experiencia?",
      "answer": "Depende de frecuencia de uso, ruta crítica y carga real.",
      "sourceIds": [
        "hw-hpc",
        "hw-sre"
      ],
      "scopeNote": "Actividad de rendimiento; completar análisis de hardware y cargas representativas."
    },
    {
      "id": "SYS-015",
      "focus": [
        "redundancia",
        "detección",
        "recuperación"
      ],
      "practice": "Simula un servicio con dos instancias y almacenamiento; inyecta un fallo definido y mide recuperación y pérdida de datos.",
      "checks": [
        "Declara RTO y RPO",
        "Prueba el almacenamiento además del proceso",
        "Describe fallos correlacionados"
      ],
      "question": "¿Dos copias en el mismo punto de fallo garantizan tolerancia?",
      "answer": "No: el fallo compartido puede afectar ambas.",
      "sourceIds": [
        "hw-sre"
      ],
      "scopeNote": "Simulación de disponibilidad; no prueba resiliencia de infraestructura real."
    },
    {
      "id": "SYS-016",
      "focus": [
        "potencia y refrigeración",
        "red de centro de datos",
        "capacidad"
      ],
      "practice": "Diseña en papel un centro de datos pequeño con dominios de fallo y presupuesto de capacidad; calcula efecto de perder un rack.",
      "checks": [
        "Distingue capacidad útil y nominal",
        "Modela dependencias comunes",
        "Explicita carga y reserva"
      ],
      "question": "¿Capacidad suficiente en operación normal prueba continuidad?",
      "answer": "No: debe evaluarse operación degradada y recuperación.",
      "sourceIds": [
        "hw-sre",
        "hw-aws"
      ],
      "scopeNote": "Análisis conceptual; ingeniería física y cumplimiento requieren especialistas y datos reales."
    },
    {
      "id": "SYS-017",
      "focus": [
        "borde y nube",
        "latencia",
        "conectividad intermitente"
      ],
      "practice": "Compara procesamiento local y remoto para un sensor ficticio con tres escenarios de red; registra latencia, datos enviados y comportamiento offline.",
      "checks": [
        "Define sensibilidad de datos",
        "Modela desconexión",
        "Justifica partición de funciones"
      ],
      "question": "¿Mover cómputo al borde siempre reduce coste total?",
      "answer": "No: agrega operación y recursos distribuidos; depende de carga y requisitos.",
      "sourceIds": [
        "hw-embebidos",
        "hw-aws"
      ],
      "scopeNote": "Diseño simulado; implementación de edge/fog y operación completa quedan por profundizar."
    },
    {
      "id": "SYS-018",
      "focus": [
        "ciclo de vida móvil",
        "recursos",
        "sincronización"
      ],
      "practice": "Diseña una aplicación móvil ficticia offline-first con cola de cambios; prueba conceptualmente cierre, reconexión y conflictos.",
      "checks": [
        "No asume red continua",
        "Modela reintentos",
        "Define resolución de conflictos"
      ],
      "question": "¿Reintentar toda escritura evita inconsistencias?",
      "answer": "Solo si se consideran duplicados, orden e idempotencia; de lo contrario puede empeorarlas.",
      "sourceIds": [
        "hw-sre",
        "hw-embebidos"
      ],
      "scopeNote": "Fuentes apoyan sistemas y restricciones; falta documentación específica de Android/iOS para desarrollo móvil completo."
    },
    {
      "id": "SYS-019",
      "focus": [
        "requisitos no funcionales",
        "partición",
        "operación"
      ],
      "practice": "Diseña un servicio de reservas a gran escala con carga estimada, almacenamiento, caché, límites y recuperación; contrasta dos alternativas y sus compromisos.",
      "checks": [
        "Cuantifica carga y SLO",
        "No usa escalabilidad como etiqueta vacía",
        "Incluye límites y fallos"
      ],
      "question": "¿Una arquitectura popular es adecuada para cualquier sistema?",
      "answer": "No: se elige según requisitos, restricciones, equipo y evidencia.",
      "sourceIds": [
        "hw-sre",
        "hw-aws",
        "hw-gcp"
      ],
      "scopeNote": "Diseño y revisión; la experiencia a escala y pruebas de producción no pueden darse por completadas con un diagrama."
    },
    {
      "id": "ROB-001",
      "focus": [
        "equilibrio estático",
        "esfuerzo y deformación",
        "condiciones de apoyo"
      ],
      "practice": "Resuelve un mecanismo planar ideal en equilibrio y compara dos apoyos; entrega diagrama de cuerpo libre y una simulación estática sin construir cargas físicas.",
      "checks": [
        "Conserva fuerzas y momentos",
        "Explica unidades y supuestos",
        "Distingue resultado ideal y resistencia real"
      ],
      "question": "¿Equilibrio estático prueba que una pieza no fallará?",
      "answer": "No: faltan esfuerzos, material, geometría, fatiga y condiciones de servicio.",
      "sourceIds": [
        "hw-robotics",
        "hw-freecad"
      ],
      "scopeNote": "El libro apoya mecánica de robots; falta un curso completo de resistencia de materiales."
    },
    {
      "id": "ROB-002",
      "focus": [
        "cinemática de mecanismos",
        "masa e inercia",
        "dinámica"
      ],
      "practice": "Simula un péndulo ideal con y sin amortiguamiento; compara trayectoria y energía e identifica condiciones en que el modelo deja de ser válido.",
      "checks": [
        "Define coordenadas y estado inicial",
        "Comprueba balance de energía",
        "Distingue cinemática y dinámica"
      ],
      "question": "¿Una trayectoria geométricamente posible es dinámicamente realizable?",
      "answer": "No: puede exigir fuerzas o velocidades fuera de los límites del sistema.",
      "sourceIds": [
        "hw-robotics",
        "hw-control"
      ],
      "scopeNote": "Actividad mecánica ideal; mecanismos reales necesitan identificación y validación física supervisada."
    },
    {
      "id": "ROB-003",
      "focus": [
        "modelado paramétrico",
        "restricciones",
        "ensamble"
      ],
      "practice": "Modela en CAD una base y dos eslabones ficticios; documenta cotas, grados de libertad y cambios paramétricos sin fabricar piezas.",
      "checks": [
        "Croquis tiene restricciones justificadas",
        "Evita interferencias del modelo",
        "Produce plano dimensional coherente"
      ],
      "question": "¿Una vista 3D atractiva demuestra que el ensamble funciona?",
      "answer": "No: deben comprobarse dimensiones, interferencias, tolerancias y requisitos.",
      "sourceIds": [
        "hw-freecad",
        "hw-robotics"
      ],
      "scopeNote": "Manual traducido parcialmente; no sustituye diseño mecánico profesional ni análisis de materiales."
    },
    {
      "id": "ROB-004",
      "focus": [
        "orientación de fabricación",
        "tolerancias",
        "verificación dimensional"
      ],
      "practice": "Diseña una pieza didáctica para impresión 3D en CAD y prepara un plan de comparación entre cota nominal y medida; usa datos sintéticos si no hay impresora.",
      "checks": [
        "Declara tolerancia",
        "Justifica orientación y soportes",
        "Distingue precisión del proceso y del modelo"
      ],
      "question": "¿La resolución de capa determina por sí sola la exactitud final?",
      "answer": "No: influyen material, máquina, orientación, temperatura y calibración.",
      "sourceIds": [
        "hw-freecad"
      ],
      "scopeNote": "Apoyo en diseño digital; la manufactura y operación segura requieren formación del equipo concreto."
    },
    {
      "id": "ROB-005",
      "focus": [
        "función de transferencia",
        "respuesta temporal",
        "realimentación"
      ],
      "practice": "Simula G(s)=1/(τs+1), τ>0, con realimentación negativa unitaria y controlador proporcional K≥0. Para τ=1 compara K=1 y K=4 ante un escalón unitario: calcula constante de tiempo, error estacionario y esfuerzo. Declara que no has incluido retardo, saturación ni dinámica adicional.",
      "checks": [
        "Obtiene función cerrada K/(τs+1+K)",
        "Para K=1 y K=4 calcula constantes 0,5 y 0,2 y errores 0,5 y 0,2",
        "No atribuye sobreimpulso o inestabilidad al modelo de primer orden definido"
      ],
      "question": "En ese modelo de primer orden, ¿qué cambia al aumentar K sin añadir retardo ni otra dinámica?",
      "answer": "Para K≥0 el polo es −(1+K)/τ y la constante de tiempo τ/(1+K): la respuesta se acelera. El error al escalón es 1/(1+K) y disminuye, con mayor exigencia de control. Este modelo no genera sobreimpulso; retardo, otras dinámicas o saturación requieren otro análisis.",
      "sourceIds": [
        "hw-control",
        "hw-analogica"
      ],
      "scopeNote": "Análisis y simulación de un modelo definido, no validación de hardware real. La conclusión no se extrapola a toda planta ni a lazos con retardo o dinámica adicional."
    },
    {
      "id": "ROB-006",
      "focus": [
        "estabilidad",
        "márgenes",
        "PID y saturación"
      ],
      "practice": "Simula un controlador PID con una perturbación y una saturación del actuador; compara dos ajustes y documenta límites de validez.",
      "checks": [
        "Comprueba respuesta a perturbación",
        "Incluye saturación",
        "Distingue ajuste empírico de garantía formal"
      ],
      "question": "¿Un ajuste que funciona en una prueba garantiza estabilidad en todo régimen?",
      "answer": "No: depende del modelo, incertidumbre, límites y condiciones de operación.",
      "sourceIds": [
        "hw-control"
      ],
      "scopeNote": "No certifica control de una máquina real ni estabilidad robusta de sistemas complejos."
    },
    {
      "id": "ROB-007",
      "focus": [
        "modelo mecatrónico",
        "acoplamiento eléctrico-mecánico",
        "identificación"
      ],
      "practice": "Construye una simulación sencilla de motor y carga, modifica inercia y rozamiento y explica su impacto sobre la respuesta.",
      "checks": [
        "Relaciona unidades de dominios",
        "Declara parámetros",
        "Compara predicción con datos sintéticos reservados"
      ],
      "question": "¿Un modelo más complejo es siempre mejor?",
      "answer": "No si sus parámetros no se identifican o no mejora predicciones relevantes.",
      "sourceIds": [
        "hw-control",
        "hw-robotics",
        "hw-embebidos"
      ],
      "scopeNote": "Modelo educativo; identificación física y validación requieren instrumentación y supervisión."
    },
    {
      "id": "ROB-008",
      "focus": [
        "presión y caudal",
        "actuadores",
        "energía almacenada"
      ],
      "practice": "Dibuja un circuito neumático conceptual y un modelo de actuador con presión limitada; estudia únicamente en simulación su respuesta y estado de reposo.",
      "checks": [
        "Distingue presión y fuerza",
        "Identifica energía residual",
        "Define estado de parada segura"
      ],
      "question": "¿Cortar electricidad elimina toda energía de un sistema neumático?",
      "answer": "No: puede permanecer presión o energía mecánica almacenada.",
      "sourceIds": [
        "hw-robotics",
        "hw-control",
        "hw-seguridad"
      ],
      "scopeNote": "Fuentes apoyan dinámica/control; falta curso específico de neumática/hidráulica y práctica supervisada."
    },
    {
      "id": "ROB-009",
      "focus": [
        "ciclo de escaneo",
        "entradas y salidas",
        "interbloqueos"
      ],
      "practice": "Implementa una máquina de estados simulada para una cinta ficticia con paro y sensor; crea una tabla de secuencias normales y erróneas sin conectar un PLC real.",
      "checks": [
        "Cada transición está definida",
        "Los errores llevan a estado previsto",
        "Distingue control normal y función de seguridad"
      ],
      "question": "¿Un programa lógico con botón de paro equivale a un sistema de seguridad validado?",
      "answer": "No: la seguridad requiere requisitos, arquitectura y evaluación específicos.",
      "sourceIds": [
        "hw-embebidos",
        "hw-control"
      ],
      "scopeNote": "Práctica de lógica/control; falta formación de PLC, lenguaje y plataforma concretos."
    },
    {
      "id": "ROB-010",
      "focus": [
        "supervisión",
        "alarmas",
        "registro de eventos"
      ],
      "practice": "Diseña una pantalla SCADA ficticia para tres variables y simula pérdida de comunicación; define prioridades de alarma y datos históricos necesarios.",
      "checks": [
        "Alarmas tienen acción y prioridad",
        "La pérdida de dato no se muestra como cero válido",
        "Separa supervisión de control seguro"
      ],
      "question": "¿Más alarmas implican mayor seguridad?",
      "answer": "No: exceso y mala priorización pueden ocultar las situaciones relevantes.",
      "sourceIds": [
        "hw-embebidos",
        "hw-sre"
      ],
      "scopeNote": "Diseño simulado; no intervención en redes industriales o infraestructura crítica."
    },
    {
      "id": "ROB-011",
      "focus": [
        "interfaces",
        "sincronización",
        "pruebas de integración"
      ],
      "practice": "Integra simulaciones de sensor, controlador y actuador mediante interfaces documentadas; introduce error de unidad, retraso y mensaje inválido.",
      "checks": [
        "Contratos incluyen unidades",
        "Prueba fallos de interfaz",
        "Registra estado y resultado por componente"
      ],
      "question": "¿Componentes correctos por separado garantizan sistema correcto?",
      "answer": "No: interacción, unidades, tiempo y supuestos pueden fallar al integrarlos.",
      "sourceIds": [
        "hw-embebidos",
        "hw-robotics",
        "hw-control"
      ],
      "scopeNote": "Proyecto de simulación; validación física y de seguridad permanece separada."
    },
    {
      "id": "ROB-012",
      "focus": [
        "mantenimiento basado en condición",
        "series temporales",
        "falsas alarmas"
      ],
      "practice": "Con vibraciones sintéticas de una máquina ficticia, compara umbral fijo y tendencia; calcula falsas alarmas y detecciones sobre datos reservados.",
      "checks": [
        "Evita usar el futuro en el análisis",
        "Separa entrenamiento y evaluación",
        "Explica coste de error"
      ],
      "question": "¿Detectar una anomalía identifica la pieza averiada?",
      "answer": "No: indica desviación del patrón; el diagnóstico necesita evidencia adicional.",
      "sourceIds": [
        "hw-sre",
        "hw-control"
      ],
      "scopeNote": "Análisis educativo; no diagnóstico ni mantenimiento prescriptivo de maquinaria real."
    },
    {
      "id": "ROB-013",
      "focus": [
        "configuración",
        "espacio de trabajo",
        "actuación y percepción"
      ],
      "practice": "Compara un manipulador y un robot móvil simulados: define configuración, sensores, actuadores y tareas que cada uno puede ejecutar.",
      "checks": [
        "Distingue configuración y pose",
        "Identifica restricciones",
        "Relaciona tarea con capacidades"
      ],
      "question": "¿Un robot necesita necesariamente forma humana?",
      "answer": "No: su diseño depende de la tarea, el entorno y los requisitos.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Fundamentos en inglés; no recorrido completo en español para toda robótica."
    },
    {
      "id": "ROB-014",
      "focus": [
        "transformaciones rígidas",
        "cinemática directa",
        "cinemática inversa"
      ],
      "practice": "Para un brazo planar de dos eslabones, calcula poses de varias configuraciones y encuentra una posición con múltiples soluciones; valida con un dibujo o simulación.",
      "checks": [
        "Declara marcos y unidades",
        "Comprueba cinemática directa",
        "Explica soluciones múltiples e imposibles"
      ],
      "question": "¿Toda posición tiene una única solución de cinemática inversa?",
      "answer": "No: puede tener varias, ninguna o familias de soluciones según el robot y restricciones.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Problema planar inicial; robots espaciales requieren mayor profundidad matemática."
    },
    {
      "id": "ROB-015",
      "focus": [
        "masa e inercia",
        "ecuaciones de movimiento",
        "par requerido"
      ],
      "practice": "Compara en simulación el mismo movimiento de un brazo con dos cargas; informa torque máximo y efecto de acelerar más rápido.",
      "checks": [
        "Mantiene trayectoria comparable",
        "Incluye gravedad donde corresponde",
        "Relaciona esfuerzo y aceleración"
      ],
      "question": "¿Una solución cinemática basta para seleccionar motores?",
      "answer": "No: también se necesitan cargas, inercia, aceleraciones, pérdidas y márgenes.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Dinámica ideal; dimensionamiento real y seguridad requieren datos y validación de ingeniería."
    },
    {
      "id": "ROB-016",
      "focus": [
        "ruido",
        "estimación",
        "fusión de sensores"
      ],
      "practice": "Simula dos sensores de posición con sesgos y varianzas distintas; combina estimaciones y compara error con cada sensor aislado.",
      "checks": [
        "Declara modelo de ruido",
        "Evalúa contra verdad sintética",
        "No combina medidas incompatibles"
      ],
      "question": "¿Promediar sensores mejora siempre la estimación?",
      "answer": "No si tienen sesgos compartidos, correlación o fallos que el método no modela.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Introducción; filtros y sistemas de percepción avanzados requieren cursos y datasets específicos."
    },
    {
      "id": "ROB-017",
      "focus": [
        "calibración",
        "geometría de imagen",
        "percepción"
      ],
      "practice": "Sobre imágenes sintéticas de una escena simple, identifica cómo cambian las medidas al variar cámara y profundidad; registra errores de localización.",
      "checks": [
        "Distingue píxel y unidad física",
        "Declara calibración",
        "Evalúa casos fuera de condición ideal"
      ],
      "question": "¿La distancia en píxeles es una distancia física constante?",
      "answer": "No: depende de proyección, profundidad y calibración.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Apoyo geométrico parcial; falta un curso completo de visión robótica y validación real."
    },
    {
      "id": "ROB-018",
      "focus": [
        "espacio de configuración",
        "colisiones",
        "planificación"
      ],
      "practice": "Implementa o simula búsqueda de camino en una cuadrícula con obstáculos; compara longitud, tiempo y margen de seguridad para dos mapas.",
      "checks": [
        "Comprueba colisiones del recorrido",
        "Distingue camino y trayectoria temporal",
        "Evalúa un caso sin solución"
      ],
      "question": "¿Un camino libre de colisiones para un punto sirve para cualquier robot?",
      "answer": "No: la geometría y restricciones del robot deben incluirse en el espacio de planificación.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Planificación inicial; dinámica y entornos inciertos necesitan ampliación."
    },
    {
      "id": "ROB-019",
      "focus": [
        "localización",
        "mapa",
        "acumulación de error"
      ],
      "practice": "Simula odometría de un móvil en un circuito cerrado y muestra deriva; compara una corrección con observaciones sintéticas y explica incertidumbre del mapa.",
      "checks": [
        "Cuantifica error de cierre",
        "Distingue estimación y verdad",
        "Explica acoplamiento pose-mapa"
      ],
      "question": "¿Cerrar visualmente un mapa demuestra localización precisa?",
      "answer": "No: se requiere una referencia y medidas de error e incertidumbre.",
      "sourceIds": [
        "hw-robotics",
        "hw-ros2"
      ],
      "scopeNote": "Introducción a localización/SLAM; algoritmos avanzados y sensores reales requieren materiales adicionales."
    },
    {
      "id": "ROB-020",
      "focus": [
        "agarre",
        "contacto",
        "restricciones de tarea"
      ],
      "practice": "En simulación conceptual, compara dos agarres de un objeto simple y define condiciones para deslizarse o mantener contacto; no uses un brazo físico.",
      "checks": [
        "Declara propiedades asumidas",
        "Identifica fuerzas y geometría",
        "Explica casos de fallo"
      ],
      "question": "¿Que una pinza alcance un objeto garantiza manipulación exitosa?",
      "answer": "No: también importan contacto, fuerzas, estabilidad y tarea posterior.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Modelo de manipulación inicial; no validación de agarre industrial ni seguridad colaborativa."
    },
    {
      "id": "ROB-021",
      "focus": [
        "modelo cinemático",
        "odometría",
        "seguimiento de trayectoria"
      ],
      "practice": "Simula un robot diferencial siguiendo una trayectoria y compara error lateral con dos controladores; incluye límites de velocidad y paso temporal.",
      "checks": [
        "Usa mismo recorrido",
        "Mide error y esfuerzo",
        "Explica saturación y discretización"
      ],
      "question": "¿Una consigna de rueda realizable garantiza que el móvil siga la trayectoria ideal?",
      "answer": "No: deslizamiento, perturbaciones y límites del modelo pueden desviarlo.",
      "sourceIds": [
        "hw-robotics",
        "hw-control"
      ],
      "scopeNote": "Simulación educativa; robot físico requiere calibración y análisis de seguridad."
    },
    {
      "id": "ROB-022",
      "focus": [
        "marcos de trabajo",
        "programación de tareas",
        "seguridad industrial"
      ],
      "practice": "Diseña una celda industrial ficticia sobre plano: zonas, tarea, entradas, salidas y criterios para detener el proceso; valida solo la lógica en simulación.",
      "checks": [
        "Distingue tarea y protección",
        "Identifica peligros y alcance",
        "No propone operación física sin cualificación"
      ],
      "question": "¿Una simulación libre de colisiones habilita operar una celda real?",
      "answer": "No: se requieren evaluación de riesgos, validación y procedimientos del sistema real.",
      "sourceIds": [
        "hw-robotics",
        "hw-control",
        "hw-seguridad"
      ],
      "scopeNote": "No sustituye normas ni formación acreditada en seguridad de robótica industrial."
    },
    {
      "id": "ROB-023",
      "focus": [
        "nodos y tópicos",
        "servicios y acciones",
        "QoS"
      ],
      "practice": "Crea en un entorno local de práctica dos nodos ROS2 que intercambian datos sintéticos; documenta interfaz y comportamiento al perder un publicador.",
      "checks": [
        "Describe grafo y tipos",
        "Selecciona QoS con justificación",
        "Registra caso normal y fallo"
      ],
      "question": "¿Un tópico equivale a una llamada que confirma ejecución?",
      "answer": "No: publicación/suscripción y solicitud/respuesta tienen semánticas distintas.",
      "sourceIds": [
        "hw-ros2"
      ],
      "scopeNote": "Referencia inglesa verificada por fuente oficial; no ejecución auditada del tutorial ni curso completo en español."
    },
    {
      "id": "ROB-024",
      "focus": [
        "estado y estimación",
        "control de vuelo",
        "restricciones de operación"
      ],
      "practice": "En simulador, analiza una misión ficticia con pérdida de posición y viento simulado; documenta decisiones de abortar y límites sin volar ni operar un vehículo real.",
      "checks": [
        "Incluye contingencias",
        "No confunde simulación con autorización",
        "Mide error y límites del modelo"
      ],
      "question": "¿Un autopiloto elimina la responsabilidad de evaluar riesgos?",
      "answer": "No: se necesitan límites de operación, validación y requisitos del entorno.",
      "sourceIds": [
        "hw-robotics",
        "hw-control",
        "hw-seguridad"
      ],
      "scopeNote": "No formación de piloto ni validación de conducción autónoma; regulación local por verificar."
    },
    {
      "id": "ROB-025",
      "focus": [
        "equilibrio",
        "contacto",
        "coordinación de articulaciones"
      ],
      "practice": "Compara en simulación dos posturas de un robot humanoide y analiza apoyo, centro de masa y demandas de torque bajo supuestos simplificados.",
      "checks": [
        "Define contacto y soporte",
        "Distingue equilibrio estático y dinámico",
        "Explica límites del modelo"
      ],
      "question": "¿Centro de masa dentro del apoyo garantiza estabilidad durante todo movimiento?",
      "answer": "No: la dinámica, contactos y perturbaciones pueden cambiar la condición.",
      "sourceIds": [
        "hw-robotics"
      ],
      "scopeNote": "Apoyo en mecánica general; falta un curso especializado completo de locomoción humanoide."
    },
    {
      "id": "ROB-026",
      "focus": [
        "tarea compartida",
        "señales de interacción",
        "usabilidad"
      ],
      "practice": "Diseña un estudio simulado de una interfaz humano-robot con tres tareas, errores esperables y criterios de consentimiento; usa personajes ficticios y no recojas datos personales.",
      "checks": [
        "Define tarea y métricas",
        "Incluye errores de comprensión",
        "Separa evaluación de interfaz y seguridad física"
      ],
      "question": "¿Una interfaz fácil de usar garantiza interacción segura?",
      "answer": "No: seguridad física, contexto y capacidades del usuario requieren evaluación adicional.",
      "sourceIds": [
        "hw-robotics",
        "hw-seguridad"
      ],
      "scopeNote": "La fuente aporta contexto mecánico, no cobertura completa de interacción humano-robot; falta curso específico."
    },
    {
      "id": "ROB-027",
      "focus": [
        "peligros",
        "medidas de reducción",
        "validación"
      ],
      "practice": "Sobre una celda colaborativa ficticia, registra peligros, condiciones de exposición y pruebas de aceptación propuestas, sin contacto humano con un robot real.",
      "checks": [
        "No asume seguridad por etiqueta colaborativo",
        "Identifica riesgos residuales",
        "Distingue mitigación y validación"
      ],
      "question": "¿Un robot vendido como colaborativo hace segura cualquier aplicación?",
      "answer": "No: depende de herramienta, objeto, tarea, velocidad, entorno y medidas verificadas.",
      "sourceIds": [
        "hw-robotics",
        "hw-seguridad"
      ],
      "scopeNote": "Solo análisis educativo; normas aplicables y validación requieren especialistas."
    },
    {
      "id": "ROB-028",
      "focus": [
        "aprendizaje y control",
        "simulación",
        "transferencia"
      ],
      "practice": "Entrena o analiza una política sencilla en un entorno simulado con recompensa explícita; compara con un controlador convencional y prueba perturbaciones no vistas.",
      "checks": [
        "Explica recompensa y objetivo",
        "Usa evaluación separada",
        "Incluye límite de seguridad del simulador"
      ],
      "question": "¿Una recompensa alta prueba comportamiento deseado fuera del entrenamiento?",
      "answer": "No: puede explotar la función de recompensa o fallar ante cambios de distribución.",
      "sourceIds": [
        "hw-robotics",
        "hw-control"
      ],
      "scopeNote": "Introducción conceptual; falta curso completo de aprendizaje para robótica y transferencia segura."
    },
    {
      "id": "ROB-029",
      "focus": [
        "coordinación",
        "comunicación",
        "fallos y asignación"
      ],
      "practice": "Simula tres robots puntuales que reparten tareas en una cuadrícula; compara reparto centralizado y distribuido al perder comunicación.",
      "checks": [
        "Evita colisiones en el modelo",
        "Define criterio de reparto",
        "Mide degradación ante fallo"
      ],
      "question": "¿Más robots siempre reducen el tiempo total?",
      "answer": "No: coordinación, congestión y comunicación pueden dominar el beneficio.",
      "sourceIds": [
        "hw-robotics",
        "hw-ros2"
      ],
      "scopeNote": "Ejercicio inicial; algoritmos multi-robot y garantías requieren profundización."
    },
    {
      "id": "ROB-030",
      "focus": [
        "materiales deformables",
        "actuación",
        "modelado"
      ],
      "practice": "Diseña un modelo conceptual de un actuador blando y compara una aproximación rígida y una deformable con datos sintéticos; enumera parámetros desconocidos.",
      "checks": [
        "Distingue deformación y articulación",
        "Reconoce histéresis e incertidumbre",
        "No fabrica actuadores con presión o calor"
      ],
      "question": "¿El modelo rígido convencional describe cualquier robot blando?",
      "answer": "No: grandes deformaciones, materiales y actuación pueden exigir otros modelos.",
      "sourceIds": [
        "hw-robotics",
        "hw-control"
      ],
      "scopeNote": "Fuentes apoyan fundamentos; falta formación específica de robótica blanda y materiales."
    },
    {
      "id": "NET-001",
      "focus": [
        "modelos de red",
        "tramas y paquetes",
        "dispositivos"
      ],
      "practice": "Dibuja una red local de cuatro equipos y describe cómo cambia la encapsulación al enviar un mensaje dentro de la LAN y a otra red.",
      "checks": [
        "Distingue switch y router",
        "Identifica direcciones por capa",
        "Describe límites de cada dispositivo"
      ],
      "question": "¿Internet y una LAN son el mismo tipo de red?",
      "answer": "No: una LAN es un ámbito local; Internet interconecta redes con otros requisitos y alcance.",
      "sourceIds": [
        "hw-redes"
      ],
      "scopeNote": "Curso introductorio; completar laboratorios y evaluación del proveedor."
    },
    {
      "id": "NET-002",
      "focus": [
        "IPv4 y CIDR",
        "IPv6",
        "subredes"
      ],
      "practice": "Divide una red IPv4 de documentación en cuatro subredes de tamaños definidos y propone un plan IPv6 ficticio; verifica solapamientos.",
      "checks": [
        "Calcula máscaras y rangos",
        "No usa direcciones públicas ajenas",
        "Distingue direccionamiento IPv4 e IPv6"
      ],
      "question": "¿La máscara identifica al equipo por sí sola?",
      "answer": "No: expresa el prefijo de red; se interpreta junto con la dirección.",
      "sourceIds": [
        "hw-redes",
        "hw-redes2"
      ],
      "scopeNote": "Ejercicio de direccionamiento; no configura redes reales."
    },
    {
      "id": "NET-003",
      "focus": [
        "conmutación",
        "VLAN",
        "dominios de difusión"
      ],
      "practice": "En simulación, separa tres grupos de equipos con VLAN y documenta qué comunicaciones necesitan enrutamiento; prueba una asignación de puerto errónea.",
      "checks": [
        "Distingue capa2 y capa3",
        "Verifica aislamiento previsto",
        "Identifica puerto y VLAN sin adivinar"
      ],
      "question": "¿Crear VLAN cifra el tráfico automáticamente?",
      "answer": "No: segmentación lógica y confidencialidad son propiedades diferentes.",
      "sourceIds": [
        "hw-redes",
        "hw-redes2"
      ],
      "scopeNote": "Diseño simulado; configuración y funciones dependen del fabricante."
    },
    {
      "id": "NET-004",
      "focus": [
        "tablas de ruta",
        "selección de prefijo",
        "OSPF y BGP"
      ],
      "practice": "Construye una topología de tres routers simulados y predice rutas para varios destinos; compara ruta estática y cambio de enlace.",
      "checks": [
        "Aplica prefijo más específico",
        "Explica convergencia",
        "No confunde plano de control y datos"
      ],
      "question": "¿La ruta con menos saltos es siempre la elegida?",
      "answer": "Depende del protocolo, políticas, métricas y prefijos anunciados.",
      "sourceIds": [
        "hw-redes",
        "hw-redes2"
      ],
      "scopeNote": "Práctica inicial; no configurar enrutamiento de una red pública."
    },
    {
      "id": "NET-005",
      "focus": [
        "DNS",
        "DHCP",
        "servicios de aplicación"
      ],
      "practice": "En una VM o simulador propio, diseña nombres y asignación de direcciones para una oficina ficticia y documenta pruebas de resolución y conectividad.",
      "checks": [
        "Distingue DNS de conectividad IP",
        "Define rango y reservas",
        "Incluye caída de un servicio"
      ],
      "question": "¿Un fallo DNS demuestra que no hay conexión física?",
      "answer": "No: puede existir conectividad IP mientras falla la resolución de nombres.",
      "sourceIds": [
        "hw-redes",
        "hw-debian"
      ],
      "scopeNote": "Laboratorio aislado; no cambiar DHCP/DNS de una red de terceros."
    },
    {
      "id": "NET-006",
      "focus": [
        "medio radio",
        "canales",
        "autenticación"
      ],
      "practice": "Diseña una WLAN ficticia con zonas y clientes distintos, comparando cobertura, interferencia y seguridad mediante supuestos explícitos.",
      "checks": [
        "Distingue señal y rendimiento",
        "No infiere alcance solo de potencia",
        "Incluye identidad y segmentación"
      ],
      "question": "¿Más potencia siempre mejora una red Wi-Fi?",
      "answer": "No: puede aumentar interferencia y no resolver asimetrías o congestión.",
      "sourceIds": [
        "hw-redes",
        "hw-antenas"
      ],
      "scopeNote": "Análisis de diseño; estudio de sitio real requiere mediciones y requisitos locales."
    },
    {
      "id": "NET-007",
      "focus": [
        "requisitos",
        "segmentación",
        "capacidad y redundancia"
      ],
      "practice": "Diseña en papel una red empresarial de tres sedes con matriz de flujos y dominios de fallo; justifica dos alternativas.",
      "checks": [
        "Cuantifica usuarios y tráfico",
        "Explica segmentación",
        "Incluye operación degradada"
      ],
      "question": "¿Una topología redundante garantiza disponibilidad?",
      "answer": "No si quedan fallos compartidos, configuración incorrecta o recuperación no probada.",
      "sourceIds": [
        "hw-redes2",
        "hw-sre"
      ],
      "scopeNote": "Diseño inicial; requiere validación y práctica con plataforma concreta."
    },
    {
      "id": "NET-008",
      "focus": [
        "túneles",
        "políticas de ruta",
        "dependencias WAN"
      ],
      "practice": "Compara dos conexiones entre sedes ficticias y modela un túnel en simulación; analiza caída de enlace, cifrado y recuperación.",
      "checks": [
        "Distingue túnel y cifrado",
        "Define autenticación",
        "Comprueba rutas de ida y retorno"
      ],
      "question": "¿Un túnel VPN hace confiable todo lo conectado?",
      "answer": "No: debe haber autenticación, autorización, segmentación y operación seguras.",
      "sourceIds": [
        "hw-redes2"
      ],
      "scopeNote": "Apoya VPN/MPLS; SD-WAN específico requiere materiales y laboratorio del producto."
    },
    {
      "id": "NET-009",
      "focus": [
        "síntoma",
        "medición por capas",
        "troubleshooting"
      ],
      "practice": "Analiza tres trazas ficticias de fallo: DNS, pérdida y saturación; propone pruebas que discriminen hipótesis y mide tiempo hasta diagnóstico.",
      "checks": [
        "Cada prueba tiene predicción",
        "Usa línea base",
        "No cambia varias variables sin registro"
      ],
      "question": "¿Un ping exitoso demuestra que una aplicación funciona?",
      "answer": "No: solo comprueba una parte del camino y del protocolo usado.",
      "sourceIds": [
        "hw-redes",
        "hw-sre"
      ],
      "scopeNote": "Práctica con datos sintéticos; pruebas intrusivas en redes requieren autorización."
    },
    {
      "id": "NET-010",
      "focus": [
        "API de red",
        "configuración declarativa",
        "validación"
      ],
      "practice": "Representa una configuración de tres dispositivos simulados en datos estructurados y crea un validador de direcciones duplicadas y cambios prohibidos.",
      "checks": [
        "Valida antes de aplicar",
        "Separa secreto y código",
        "Incluye prueba de reversión"
      ],
      "question": "¿Automatizar una configuración errónea la hace correcta?",
      "answer": "No: amplifica el error si no hay validación y control de cambios.",
      "sourceIds": [
        "hw-ansible",
        "hw-redes2"
      ],
      "scopeNote": "Introducción; API y modelos de cada fabricante requieren documentación específica."
    },
    {
      "id": "NET-011",
      "focus": [
        "plano de control",
        "plano de datos",
        "programabilidad"
      ],
      "practice": "Dibuja un sistema SDN ficticio y simula reglas de reenvío para tres flujos; analiza qué ocurre al perder el controlador.",
      "checks": [
        "Distingue control y reenvío",
        "Define política verificable",
        "Explica estado ante fallo"
      ],
      "question": "¿SDN significa que no existe hardware de red?",
      "answer": "No: separa o programa funciones de control, pero sigue necesitando un plano de datos.",
      "sourceIds": [
        "hw-redes2"
      ],
      "scopeNote": "Teoría introductoria; falta laboratorio de controlador y hardware virtual específico."
    },
    {
      "id": "NET-012",
      "focus": [
        "ancho de banda",
        "ruido",
        "codificación"
      ],
      "practice": "Compara dos canales simulados con distinta tasa de error y codificación; calcula tasa útil y explica el coste de redundancia.",
      "checks": [
        "No confunde tasa bruta y útil",
        "Declara modelo de ruido",
        "Relaciona fiabilidad y sobrecarga"
      ],
      "question": "¿Más bits por símbolo garantiza comunicación más fiable?",
      "answer": "No: la fiabilidad depende del canal, ruido, potencia y esquema utilizado.",
      "sourceIds": [
        "hw-telecom",
        "hw-circuitos"
      ],
      "scopeNote": "Fundamentos; completar teoría matemática de comunicaciones e información."
    },
    {
      "id": "NET-013",
      "focus": [
        "modulación digital",
        "sincronización",
        "error de símbolo"
      ],
      "practice": "Simula una constelación sencilla bajo ruido y compara decisiones correctas e incorrectas con diferentes separaciones.",
      "checks": [
        "Distingue símbolo y bit",
        "Mide error sobre muestras suficientes",
        "Declara supuestos del receptor"
      ],
      "question": "¿Un gráfico limpio de constelación demuestra rendimiento en todo canal?",
      "answer": "No: deben evaluarse ruido, sincronización, interferencia y condiciones del canal.",
      "sourceIds": [
        "hw-telecom"
      ],
      "scopeNote": "Actividad introductoria; curso completo de comunicaciones digitales pendiente de profundización."
    },
    {
      "id": "NET-014",
      "focus": [
        "propagación",
        "ganancia y pérdidas",
        "presupuesto de enlace"
      ],
      "practice": "Construye en papel un presupuesto de enlace radio ficticio con unidades coherentes y compara sensibilidad a distancia y pérdidas de cable.",
      "checks": [
        "Distingue dB y unidades lineales",
        "Declara hipótesis de propagación",
        "No transmite sin autorización"
      ],
      "question": "¿La ganancia de antena crea energía?",
      "answer": "No: describe concentración espacial de radiación respecto a una referencia.",
      "sourceIds": [
        "hw-antenas",
        "hw-telecom"
      ],
      "scopeNote": "Análisis teórico; medición RF, regulación y diseños concretos requieren formación adicional."
    },
    {
      "id": "NET-015",
      "focus": [
        "atenuación",
        "dispersión",
        "presupuesto óptico"
      ],
      "practice": "Compara dos enlaces ópticos ficticios sumando pérdidas de fibra, conectores y margen; explica diferencia entre potencia suficiente y capacidad temporal.",
      "checks": [
        "Usa unidades coherentes",
        "Incluye margen documentado",
        "Distingue atenuación y dispersión"
      ],
      "question": "¿Recibir potencia suficiente garantiza una tasa de error aceptable?",
      "answer": "No: también intervienen dispersión, ruido, receptor y otros factores.",
      "sourceIds": [
        "hw-telecom"
      ],
      "scopeNote": "Material general de transmisión; falta laboratorio y curso específico de fibra óptica. No manipular láseres."
    },
    {
      "id": "NET-016",
      "focus": [
        "acceso y núcleo móvil",
        "movilidad",
        "capacidad"
      ],
      "practice": "Dibuja el recorrido conceptual de datos de un móvil entre acceso y núcleo y compara movilidad y demanda en dos escenarios ficticios.",
      "checks": [
        "Separa acceso y núcleo",
        "Explica handover conceptualmente",
        "No equipara velocidad pico con capacidad por usuario"
      ],
      "question": "¿La etiqueta 5G garantiza la misma latencia en todo servicio?",
      "answer": "No: depende del despliegue, carga, recorrido y servicio.",
      "sourceIds": [
        "hw-telecom"
      ],
      "scopeNote": "El curso apoya redes móviles; detalles 4G/5G actuales requieren especificaciones y formación adicional."
    },
    {
      "id": "NET-017",
      "focus": [
        "voz sobre IP",
        "señalización",
        "jitter y pérdida"
      ],
      "practice": "Simula paquetes de una llamada ficticia con retardo variable y analiza un búfer de reproducción; compara calidad y latencia.",
      "checks": [
        "Distingue señalización y medios",
        "Mide variación de retardo",
        "Explica compromiso del búfer"
      ],
      "question": "¿Un enlace con gran ancho de banda garantiza buena llamada?",
      "answer": "No: pérdida, jitter, retardo y configuración también afectan la experiencia.",
      "sourceIds": [
        "hw-telecom"
      ],
      "scopeNote": "Práctica conceptual; plataforma VoIP concreta y operación requieren laboratorio adicional."
    },
    {
      "id": "NET-018",
      "focus": [
        "retardo de propagación",
        "presupuesto de enlace",
        "movilidad orbital"
      ],
      "practice": "Compara dos órbitas hipotéticas mediante distancias y retardos ideales; enumera pérdidas y restricciones que faltan antes de diseñar un servicio.",
      "checks": [
        "Convierte unidades correctamente",
        "Distingue retardo y caudal",
        "Declara supuestos de geometría"
      ],
      "question": "¿Menor retardo equivale a cobertura permanente desde un solo satélite?",
      "answer": "No: geometría, movimiento y horizonte condicionan visibilidad y continuidad.",
      "sourceIds": [
        "hw-antenas",
        "hw-telecom"
      ],
      "scopeNote": "Apoyo parcial de enlace/transmisión; no se verificó un curso completo de redes satelitales."
    },
    {
      "id": "NET-019",
      "focus": [
        "sistema autónomo",
        "política BGP",
        "operación"
      ],
      "practice": "Diseña una política de anuncio ficticia entre tres AS de laboratorio y analiza una ruta no deseada sin anunciar prefijos reales.",
      "checks": [
        "Usa identificadores de ejemplo",
        "Define filtros y políticas",
        "Explica convergencia y fallos"
      ],
      "question": "¿Aceptar toda ruta anunciada produce una red segura?",
      "answer": "No: la política y validación de anuncios son necesarias para evitar rutas indebidas.",
      "sourceIds": [
        "hw-redes2",
        "hw-sre"
      ],
      "scopeNote": "Estudio simulado; operar un ISP real requiere acuerdos, capacidad y procesos especializados."
    },
    {
      "id": "NET-020",
      "focus": [
        "usuarios y permisos",
        "paquetes",
        "servicios"
      ],
      "practice": "En una VM Linux propia, crea un servicio de prueba y un inventario de permisos y dependencias; comprueba arranque y registros.",
      "checks": [
        "Usa mínimo privilegio",
        "Fija procedimiento reproducible",
        "Distingue servicio de proceso temporal"
      ],
      "question": "¿Ejecutar todo como administrador simplifica de forma segura la administración?",
      "answer": "No: amplía el impacto de errores y compromisos.",
      "sourceIds": [
        "hw-debian"
      ],
      "scopeNote": "Base de administración; completar seguridad y servicio específicos."
    },
    {
      "id": "NET-021",
      "focus": [
        "almacenamiento",
        "automatización",
        "diagnóstico de servicios"
      ],
      "practice": "Simula una actualización y un fallo de servicio en una VM desechable; documenta validación, respaldo de configuración y reversión.",
      "checks": [
        "Controla versión y dependencias",
        "Verifica resultado funcional",
        "Incluye recuperación probada"
      ],
      "question": "¿Que termine el gestor de paquetes prueba que el servicio funciona?",
      "answer": "No: el estado de instalación no sustituye pruebas de funcionamiento y compatibilidad.",
      "sourceIds": [
        "hw-debian",
        "hw-ansible"
      ],
      "scopeNote": "Laboratorio aislado; administración avanzada de todos los servicios no queda cubierta por una sola guía."
    },
    {
      "id": "NET-022",
      "focus": [
        "roles de servidor",
        "identidad",
        "administración básica"
      ],
      "practice": "Diseña un laboratorio Windows Server aislado de ejemplo y documenta qué roles necesita una organización ficticia, su dependencias y pruebas iniciales.",
      "checks": [
        "Separa roles y servicios",
        "Identifica requisitos DNS",
        "No une equipos reales a un dominio de prueba"
      ],
      "question": "¿Instalar un rol basta para dar por operativo el servicio?",
      "answer": "No: hay que configurar, validar, asegurar y documentar dependencias.",
      "sourceIds": [
        "hw-ad",
        "hw-powershell"
      ],
      "scopeNote": "La ruta verificada se centra en AD DS; otros roles Windows requieren módulos concretos y licencias de laboratorio."
    },
    {
      "id": "NET-023",
      "focus": [
        "replicación",
        "directivas",
        "recuperación"
      ],
      "practice": "Planifica un dominio de laboratorio con dos controladores y simula el impacto de fallar uno; define pruebas de identidad y recuperación sin usar infraestructura productiva.",
      "checks": [
        "Distingue replicación y respaldo",
        "Explica función de GPO",
        "Define prueba de recuperación"
      ],
      "question": "¿Replicación protege contra cualquier borrado erróneo?",
      "answer": "No: el cambio erróneo también puede replicarse; se necesita recuperación adecuada.",
      "sourceIds": [
        "hw-ad",
        "hw-powershell"
      ],
      "scopeNote": "Cobertura centrada en identidad; administración avanzada completa requiere ampliar otros roles."
    },
    {
      "id": "NET-024",
      "focus": [
        "identidad local",
        "identidad cloud",
        "sincronización"
      ],
      "practice": "Dibuja una topología híbrida ficticia con autoridad de identidad, sincronización, acceso y revocación; analiza una cuenta comprometida en papel.",
      "checks": [
        "Define fuente de autoridad",
        "Separa autenticación y autorización",
        "Incluye revocación y auditoría"
      ],
      "question": "¿Sincronizar usuarios implica idénticas propiedades de seguridad en ambos entornos?",
      "answer": "No: los modelos, dependencias y controles de cada entorno pueden diferir.",
      "sourceIds": [
        "hw-ad"
      ],
      "scopeNote": "Ruta de AD DS con elementos híbridos; completar formación específica actual de Entra ID y licencias si se practica."
    },
    {
      "id": "NET-025",
      "focus": [
        "objetos y pipeline",
        "errores",
        "scripts idempotentes"
      ],
      "practice": "Escribe un script de inventario sobre una carpeta de datos ficticios que produzca un reporte y gestione un archivo ilegible sin modificarlo.",
      "checks": [
        "Usa objetos en vez de analizar texto innecesario",
        "Controla errores",
        "No incorpora credenciales al script"
      ],
      "question": "¿El pipeline de PowerShell transporta solo cadenas de texto?",
      "answer": "Normalmente puede transportar objetos con propiedades, lo que cambia cómo se filtra y transforma información.",
      "sourceIds": [
        "hw-powershell"
      ],
      "scopeNote": "Ejercicio local; administración remota y cambios de sistema necesitan alcance y validación adicionales."
    },
    {
      "id": "NET-026",
      "focus": [
        "inventario",
        "estado deseado",
        "idempotencia"
      ],
      "practice": "Crea un playbook para configurar una VM propia o contenedor de práctica; ejecuta dos veces y compara cambios y errores.",
      "checks": [
        "Inventario excluye equipos ajenos",
        "Segunda ejecución explica cambios",
        "No guarda secretos en texto público"
      ],
      "question": "¿Idempotencia significa que nunca habrá errores?",
      "answer": "No: significa que repetir la operación prevista no altera innecesariamente el estado logrado; aún puede fallar.",
      "sourceIds": [
        "hw-ansible"
      ],
      "scopeNote": "Tutorial en inglés; no administrar producción ni terceros desde esta práctica."
    },
    {
      "id": "NET-027",
      "focus": [
        "servicios cloud",
        "responsabilidad compartida",
        "elasticidad"
      ],
      "practice": "Compara una aplicación local y una variante cloud en papel, asignando responsabilidades, escalado, datos y costes potenciales.",
      "checks": [
        "No confunde servicio y servidor",
        "Identifica dependencias de proveedor",
        "Distingue coste variable y fijo"
      ],
      "question": "¿La nube transfiere toda responsabilidad de seguridad al proveedor?",
      "answer": "No: parte de las responsabilidades permanece en quien diseña y opera la carga.",
      "sourceIds": [
        "hw-aws",
        "hw-gcp"
      ],
      "scopeNote": "Fundamentos documentales; no requiere contratar servicios para completar la actividad."
    },
    {
      "id": "NET-028",
      "focus": [
        "pilares de arquitectura",
        "riesgo",
        "coste y fiabilidad"
      ],
      "practice": "Revisa una arquitectura AWS ficticia con una aplicación y una base de datos; identifica fallos comunes y dos alternativas con compromisos.",
      "checks": [
        "Relaciona requisitos y decisiones",
        "Señala dominio de fallo",
        "No promete coste cero sin cotización"
      ],
      "question": "¿Un marco de buenas prácticas certifica automáticamente una arquitectura?",
      "answer": "No: orienta preguntas y decisiones; la solución necesita revisión y pruebas contextualizadas.",
      "sourceIds": [
        "hw-aws"
      ],
      "scopeNote": "Guía de diseño; no laboratorio completo de todos los servicios AWS ni certificación."
    },
    {
      "id": "NET-029",
      "focus": [
        "identidad",
        "recursos Azure",
        "operación"
      ],
      "practice": "Diseña en papel una carga Azure ficticia con identidad híbrida y divide permisos, supervisión y recuperación; enumera recursos facturables antes de practicar.",
      "checks": [
        "Distingue identidad de recurso",
        "Asigna mínimo privilegio",
        "Identifica cuotas y costes"
      ],
      "question": "¿Una cuenta gratuita garantiza cualquier laboratorio sin cargos?",
      "answer": "No: dependen del producto, límites, región, duración y uso.",
      "sourceIds": [
        "hw-ad",
        "hw-aws"
      ],
      "scopeNote": "La fuente verificada apoya identidad híbrida y comparación; falta ruta de administración Azure específica materia por materia."
    },
    {
      "id": "NET-030",
      "focus": [
        "pilares cloud",
        "topología",
        "fiabilidad y costes"
      ],
      "practice": "Usa el marco de Google Cloud para revisar un servicio ficticio y proponer mejoras de operación, seguridad y rendimiento sin desplegar recursos.",
      "checks": [
        "Vincula mejora con requisito",
        "Documenta costes potenciales",
        "Incluye respaldo y recuperación"
      ],
      "question": "¿Usar servicios administrados elimina la necesidad de operar la aplicación?",
      "answer": "No: siguen siendo necesarios configuración, observación, control de acceso y recuperación.",
      "sourceIds": [
        "hw-gcp"
      ],
      "scopeNote": "Marco de arquitectura; falta práctica de administración de servicios concretos de GCP."
    },
    {
      "id": "NET-031",
      "focus": [
        "infraestructura declarativa",
        "estado",
        "plan y ciclo de vida"
      ],
      "practice": "Sigue conceptualmente el tutorial de Terraform con Docker local y prepara un cambio pequeño; inspecciona el plan y registra qué recursos pertenecen al ejercicio.",
      "checks": [
        "No toca infraestructura ajena",
        "Distingue configuración y estado",
        "Verifica creación y cambio previstos"
      ],
      "question": "¿Un archivo declarativo describe por sí solo el estado real actual?",
      "answer": "No: se compara con estado y proveedor; puede existir deriva.",
      "sourceIds": [
        "hw-terraform"
      ],
      "scopeNote": "Tutorial en inglés; cada proveedor cloud añade permisos, costes y reglas propias."
    },
    {
      "id": "NET-032",
      "focus": [
        "imagen",
        "Compose",
        "persistencia"
      ],
      "practice": "Empaqueta una aplicación local y una base de datos de prueba usando Compose; verifica reconstrucción, variables y almacenamiento sin publicar credenciales.",
      "checks": [
        "Separa datos de imagen",
        "Reproduce el entorno",
        "Documenta puertos y permisos"
      ],
      "question": "¿Un contenedor borrado implica que todos sus datos se borraron?",
      "answer": "Depende de volúmenes y almacenamiento externo; hay que conocer el diseño de persistencia.",
      "sourceIds": [
        "hw-docker"
      ],
      "scopeNote": "Material en inglés; seguridad y operación completa de contenedores requieren profundización."
    },
    {
      "id": "NET-033",
      "focus": [
        "pods y despliegues",
        "servicios",
        "reconciliación"
      ],
      "practice": "En un clúster local de aprendizaje, describe una aplicación de prueba y prueba qué ocurre cuando se recrea una instancia; registra estado deseado y observado.",
      "checks": [
        "Distingue pod y deployment",
        "No usa secretos reales",
        "Explica límites de persistencia"
      ],
      "question": "¿Kubernetes conoce si la lógica de negocio es correcta?",
      "answer": "No: solo puede observar las señales y condiciones que se definan y no valida semántica de negocio completa.",
      "sourceIds": [
        "hw-kubernetes"
      ],
      "scopeNote": "Fundamentos parcialmente traducidos; no experiencia de administración productiva completa."
    },
    {
      "id": "NET-034",
      "focus": [
        "charts",
        "reconciliación",
        "operadores y GitOps"
      ],
      "practice": "Construye un chart mínimo de una aplicación ficticia y compara manifiesto renderizado con valores; dibuja cómo un reconciliador detectaría deriva sin instalar operadores ajenos.",
      "checks": [
        "Revisa recursos antes de aplicar",
        "Fija versiones",
        "Distingue Helm y reconciliación continua"
      ],
      "question": "¿Helm equivale por sí solo a un sistema GitOps completo?",
      "answer": "No: empaqueta y gestiona releases; la reconciliación y gobernanza continua añaden otros componentes.",
      "sourceIds": [
        "hw-helm",
        "hw-kubernetes"
      ],
      "scopeNote": "Quickstart actualmente en inglés incluso bajo /es/; operadores y GitOps requieren tutoriales específicos adicionales."
    },
    {
      "id": "NET-035",
      "focus": [
        "identidad de servicio",
        "política de tráfico",
        "observabilidad"
      ],
      "practice": "Analiza el ejemplo local de Istio y diseña una política ficticia de tráfico entre dos servicios; compara observación con y sin malla en papel o laboratorio propio.",
      "checks": [
        "Distingue red de aplicación y malla",
        "Define alcance de política",
        "No supone que instalarla asegura todo"
      ],
      "question": "¿Una malla de servicios elimina errores de autorización de la aplicación?",
      "answer": "No: añade controles de comunicación, pero no reemplaza toda la lógica y política de la aplicación.",
      "sourceIds": [
        "hw-istio",
        "hw-kubernetes"
      ],
      "scopeNote": "Tutorial inglés y recursos de clúster requeridos; no diseño universal de mallas."
    },
    {
      "id": "NET-036",
      "focus": [
        "métricas",
        "logs y trazas",
        "correlación"
      ],
      "practice": "Instrumenta una aplicación local de prueba o su simulación con una operación exitosa y otra fallida; relaciona métricas agregadas y traza de una solicitud.",
      "checks": [
        "No registra datos personales",
        "Distingue señal y causa",
        "Conserva identificadores de correlación apropiados"
      ],
      "question": "¿Un tablero sin alertas demuestra que el servicio está sano?",
      "answer": "No: puede faltar instrumentación o medir señales inadecuadas.",
      "sourceIds": [
        "hw-otel",
        "hw-sre"
      ],
      "scopeNote": "Tutorial con traducción mixta; operación de plataforma de observabilidad requiere más profundidad."
    },
    {
      "id": "NET-037",
      "focus": [
        "SLI y SLO",
        "presupuesto de error",
        "reducción de trabajo repetitivo"
      ],
      "practice": "Define un SLO para una API ficticia y calcula consumo de presupuesto de error a partir de una tabla de solicitudes; propone una mejora de automatización medible.",
      "checks": [
        "Define población y ventana",
        "Calcula presupuesto coherente",
        "Relaciona decisión y riesgo"
      ],
      "question": "¿Disponibilidad del servidor equivale a disponibilidad percibida del servicio?",
      "answer": "No: un proceso vivo puede no servir correctamente las solicitudes de los usuarios.",
      "sourceIds": [
        "hw-sre"
      ],
      "scopeNote": "Libro en inglés; no equivale a experiencia real de guardia y operación."
    },
    {
      "id": "NET-038",
      "focus": [
        "balanceo",
        "salud",
        "fallos correlacionados"
      ],
      "practice": "Simula dos réplicas detrás de un balanceador y una dependencia compartida; prueba caída de réplica y de dependencia y mide recuperación.",
      "checks": [
        "Comprueba ambas clases de fallo",
        "Define señal de salud",
        "No confunde redundancia y recuperación"
      ],
      "question": "¿Duplicar servidores garantiza alta disponibilidad?",
      "answer": "No si comparten dependencias críticas o si el balanceo y la recuperación fallan.",
      "sourceIds": [
        "hw-sre",
        "hw-aws"
      ],
      "scopeNote": "Laboratorio educativo; disponibilidad real exige pruebas, operación y gestión de cambios."
    },
    {
      "id": "NET-039",
      "focus": [
        "RPO y RTO",
        "copias y restauración",
        "continuidad"
      ],
      "practice": "Con datos sintéticos, planifica copias y ejecuta una restauración en entorno separado; mide tiempo e identifica cuánto trabajo se perdería entre copias.",
      "checks": [
        "Restaura de verdad una muestra",
        "Valida integridad",
        "Distingue objetivos y resultados medidos"
      ],
      "question": "¿Tener varias copias en el mismo sistema protege de todo desastre?",
      "answer": "No: pueden compartir fallos de soporte, acceso, ubicación o corrupción.",
      "sourceIds": [
        "hw-debian",
        "hw-sre"
      ],
      "scopeNote": "No recupera ni elimina datos reales; continuidad organizativa requiere requisitos adicionales."
    },
    {
      "id": "NET-040",
      "focus": [
        "híbrida y multicloud",
        "portabilidad",
        "dependencias"
      ],
      "practice": "Compara dos diseños ficticios para una carga con datos locales y procesamiento remoto; documenta flujos, identidad, latencia y plan de salida.",
      "checks": [
        "No confunde portabilidad y disponibilidad",
        "Cuantifica transferencias",
        "Incluye operación y dependencia de proveedor"
      ],
      "question": "¿Usar dos nubes garantiza menor riesgo y coste?",
      "answer": "No: puede aumentar complejidad, transferencias y puntos de fallo si no se justifica.",
      "sourceIds": [
        "hw-aws",
        "hw-gcp"
      ],
      "scopeNote": "Diseño documental; no operación multicloud completa ni servicios gratuitos garantizados."
    },
    {
      "id": "NET-041",
      "focus": [
        "coste unitario",
        "asignación",
        "capacidad y demanda"
      ],
      "practice": "Con una tabla de precios ficticios y carga sintética, calcula coste por solicitud y compara reserva, elasticidad y apagado de recursos ociosos.",
      "checks": [
        "No presenta precios ficticios como vigentes",
        "Relaciona coste y nivel de servicio",
        "Identifica categorías omitidas"
      ],
      "question": "¿Reducir gasto mensual siempre mejora eficiencia?",
      "answer": "No si reduce más el resultado útil o incumple requisitos del servicio.",
      "sourceIds": [
        "hw-aws",
        "hw-gcp",
        "hw-sre"
      ],
      "scopeNote": "Principios de coste; no asesoría financiera ni cotización real, y falta profundización específica FinOps."
    },
    {
      "id": "NET-042",
      "focus": [
        "cargas desacopladas",
        "estado",
        "operación cloud-native"
      ],
      "practice": "Diseña una aplicación de prueba con componentes separados y estado persistente; explica límites, despliegue, observabilidad y recuperación sin elegir herramientas por moda.",
      "checks": [
        "Relaciona patrones y requisitos",
        "Incluye estado y fallos",
        "Compara una alternativa más simple"
      ],
      "question": "¿Usar contenedores convierte automáticamente una aplicación en resiliente?",
      "answer": "No: diseño de estado, comunicación y operación siguen siendo determinantes.",
      "sourceIds": [
        "hw-docker",
        "hw-kubernetes",
        "hw-sre"
      ],
      "scopeNote": "Proyecto de arquitectura; no certificación ni cobertura de todas las plataformas."
    },
    {
      "id": "NET-043",
      "focus": [
        "capacidad",
        "incidentes",
        "gobierno de cambios"
      ],
      "practice": "Prepara un ejercicio de mesa de plataforma ficticia con crecimiento de carga y caída parcial; entrega capacidad, SLO, respuesta, recuperación y postmortem sin culpas.",
      "checks": [
        "Cuantifica degradación",
        "Asigna responsabilidades",
        "Propone mejoras ligadas a evidencia"
      ],
      "question": "¿Resolver un incidente equivale a evitar su repetición?",
      "answer": "No: hacen falta análisis, acciones verificables y seguimiento de las causas y condiciones contribuyentes.",
      "sourceIds": [
        "hw-sre",
        "hw-aws",
        "hw-gcp"
      ],
      "scopeNote": "Capstone de simulación; la competencia productiva requiere experiencia y revisión externa."
    },
    {
      "id": "SWE-001",
      "focus": [
        "ciclo de vida",
        "calidad interna y externa",
        "trazabilidad"
      ],
      "practice": "Define y construye un gestor de préstamos con requisitos, pruebas y registro de decisiones.",
      "checks": [
        "Requisitos numerados",
        "Pruebas ligadas a requisitos",
        "Cambio documentado con impacto"
      ],
      "question": "¿Programar una función basta para ingeniería?",
      "answer": "No: también se justifican requisitos, calidad, mantenimiento y validación del producto.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-002",
      "focus": [
        "necesidades",
        "criterios de aceptación",
        "restricciones"
      ],
      "practice": "Entrevista a un usuario ficticio y especifica cinco requisitos verificables para préstamos.",
      "checks": [
        "Actores identificados",
        "Criterios observables",
        "Ambigüedades resueltas"
      ],
      "question": "¿Qué falla en «debe ser rápido»?",
      "answer": "No fija carga, operación ni umbral medible de aceptación.",
      "sourceIds": [
        "pro-ehu",
        "pro-asvs"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-003",
      "focus": [
        "casos de uso",
        "diagramas de secuencia",
        "modelo de dominio"
      ],
      "practice": "Modela reservar y devolver un libro y comprueba la coherencia entre tres diagramas.",
      "checks": [
        "Responsabilidades coherentes",
        "Flujos alternativos incluidos",
        "Implementación trazable"
      ],
      "question": "¿Una clase equivale siempre a una tabla?",
      "answer": "No: el modelo de dominio expresa comportamiento; la persistencia es otra decisión.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-004",
      "focus": [
        "composición",
        "acoplamiento",
        "patrones creacionales y de comportamiento"
      ],
      "practice": "Implementa dos políticas de préstamo intercambiables y compara el diseño antes/después.",
      "checks": [
        "Políticas probadas aisladas",
        "Cambios localizados",
        "Complejidad justificada"
      ],
      "question": "¿Cuándo perjudica un patrón?",
      "answer": "Cuando añade indirección sin resolver una variación o problema real.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-005",
      "focus": [
        "atributos de calidad",
        "límites de componentes",
        "decisiones arquitectónicas"
      ],
      "practice": "Diseña dos arquitecturas de una biblioteca y compara disponibilidad, coste y complejidad.",
      "checks": [
        "Escenarios de calidad",
        "Alternativas explícitas",
        "Decisión con consecuencias"
      ],
      "question": "¿Por qué un diagrama no basta?",
      "answer": "No demuestra que las decisiones satisfacen restricciones y escenarios de calidad.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-006",
      "focus": [
        "calidad de proceso",
        "calidad de producto",
        "métricas operativas"
      ],
      "practice": "Evalúa defectos, rendimiento y mantenibilidad de dos versiones del mismo servicio.",
      "checks": [
        "Métricas definidas",
        "Muestra reproducible",
        "Limitaciones explicadas"
      ],
      "question": "¿Más cobertura implica más calidad?",
      "answer": "No; cobertura mide ejecución, no suficiencia de las aserciones ni requisitos.",
      "sourceIds": [
        "pro-ehu",
        "pro-playwright"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-007",
      "focus": [
        "particiones de equivalencia",
        "valores límite",
        "pruebas unitarias"
      ],
      "practice": "Prueba una función de multas con cero, límite, valores inválidos y días extremos.",
      "checks": [
        "Casos normales y límite",
        "Oráculos explícitos",
        "Fallo introducido detectado"
      ],
      "question": "¿Qué es un oráculo de prueba?",
      "answer": "El criterio independiente que decide si el resultado observado es correcto.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-008",
      "focus": [
        "aislamiento",
        "fixtures",
        "pruebas de interfaz y API"
      ],
      "practice": "Automatiza alta, préstamo y devolución con datos reiniciables y un caso de error.",
      "checks": [
        "Pruebas independientes",
        "Esperas por estado",
        "Fallo reproducible con evidencia"
      ],
      "question": "¿Por qué fallan esperas fijas?",
      "answer": "Suponen tiempos que cambian; es preferible esperar condiciones observables con límites.",
      "sourceIds": [
        "pro-playwright"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-009",
      "focus": [
        "ramas",
        "revisiones",
        "versionado de artefactos"
      ],
      "practice": "Prepara un cambio mediante rama, revisión y etiqueta de versión reproducible.",
      "checks": [
        "Historial entendible",
        "Revisión del diff",
        "Artefacto vinculado al commit"
      ],
      "question": "¿Una etiqueta sustituye al artefacto?",
      "answer": "No; identifica una revisión, pero hace falta conservar o reconstruir el resultado.",
      "sourceIds": [
        "pro-github"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-010",
      "focus": [
        "flujo",
        "trabajo en curso",
        "retroalimentación"
      ],
      "practice": "Gestiona diez tareas simuladas y cambia una política de trabajo para comparar tiempos.",
      "checks": [
        "Trabajo definido",
        "Tiempos antes/después",
        "Mejora basada en datos"
      ],
      "question": "¿Velocidad de tareas mide valor?",
      "answer": "No directamente: también importan resultados de usuario, calidad y contexto.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-011",
      "focus": [
        "alcance",
        "estimación",
        "riesgos y dependencias"
      ],
      "practice": "Planifica un proyecto de cuatro semanas con un retraso simulado y replanificación.",
      "checks": [
        "Supuestos estimados",
        "Dependencias visibles",
        "Respuesta a riesgo justificada"
      ],
      "question": "¿Qué distingue una estimación de un compromiso?",
      "answer": "La estimación incluye incertidumbre; el compromiso requiere condiciones y capacidad acordadas.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-012",
      "focus": [
        "integración continua",
        "artefactos",
        "despliegue reversible"
      ],
      "practice": "Crea un flujo que pruebe, construya y conserve el artefacto de cada revisión.",
      "checks": [
        "Pruebas bloqueantes",
        "Artefacto identificable",
        "Reversión ensayada localmente"
      ],
      "question": "¿Construir equivale a desplegar?",
      "answer": "No; construir produce artefactos, desplegar cambia el entorno que los ejecuta.",
      "sourceIds": [
        "pro-github",
        "pro-playwright"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-013",
      "focus": [
        "indicadores de servicio",
        "presupuesto de errores",
        "recuperación"
      ],
      "practice": "Mide éxito y latencia de un servicio local e introduce una caída controlada.",
      "checks": [
        "Indicador con denominador",
        "Objetivo temporal",
        "Recuperación medida"
      ],
      "question": "¿Disponibilidad del proceso es disponibilidad del servicio?",
      "answer": "No siempre: el proceso puede estar activo y responder incorrectamente.",
      "sourceIds": [
        "pro-github",
        "pro-wazuh"
      ],
      "scopeNote": "Guía introductoria de confiabilidad; GitHub/Wazuh apoyan automatización y observación, no un curso completo de SRE. Completar diseño de SLI/SLO y práctica operativa revisada."
    },
    {
      "id": "SWE-014",
      "focus": [
        "deuda técnica",
        "refactorización",
        "pruebas de caracterización"
      ],
      "practice": "Cambia una regla de negocio de un programa heredado después de fijar su comportamiento.",
      "checks": [
        "Comportamiento anterior capturado",
        "Cambio acotado",
        "Regresiones descartadas"
      ],
      "question": "¿Refactorizar cambia la funcionalidad pública?",
      "answer": "Su intención es conservarla mientras mejora la estructura interna.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-015",
      "focus": [
        "requisitos de seguridad funcional",
        "modos de fallo",
        "verificación independiente"
      ],
      "practice": "Especifica un simulador de alarma con condiciones seguras y fallos de sensor, sin controlar equipos reales.",
      "checks": [
        "Peligros identificados",
        "Requisitos comprobables",
        "Revisión independiente propuesta"
      ],
      "question": "¿Una prueba satisfactoria demuestra ausencia de peligro?",
      "answer": "No; cubre condiciones concretas y necesita análisis de riesgos y supuestos.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "Ejercicio exclusivamente simulado. Falta formación sectorial, normas aplicables y evaluación competente de sistemas críticos; no habilita intervenir equipos reales."
    },
    {
      "id": "SWE-016",
      "focus": [
        "modelo de amenazas",
        "mínimo privilegio",
        "validación de entradas"
      ],
      "practice": "Diseña un servicio de notas con fronteras de confianza y controles verificables.",
      "checks": [
        "Activos y amenazas",
        "Controles trazables",
        "Pruebas de abuso locales"
      ],
      "question": "¿Validar en el cliente protege al servidor?",
      "answer": "No: el servidor debe hacer cumplir sus propias restricciones y autorización.",
      "sourceIds": [
        "pro-asvs",
        "pro-webgoat"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-017",
      "focus": [
        "semántica",
        "teclado y foco",
        "errores accesibles"
      ],
      "practice": "Construye un formulario utilizable por teclado y documenta pruebas con lector de pantalla.",
      "checks": [
        "Etiquetas asociadas",
        "Foco visible y ordenado",
        "Errores identificables"
      ],
      "question": "¿Un escáner automático certifica accesibilidad?",
      "answer": "No; detecta una parte de problemas y necesita pruebas manuales y de usuarios.",
      "sourceIds": [
        "pro-mdn",
        "pro-wai"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-018",
      "focus": [
        "entrevistas",
        "pruebas de usabilidad",
        "análisis de hallazgos"
      ],
      "practice": "Prueba un prototipo de reserva con tres participantes voluntarios y tareas no dirigidas.",
      "checks": [
        "Consentimiento y privacidad",
        "Observación separada de inferencia",
        "Cambios ligados a hallazgos"
      ],
      "question": "¿Preguntar si gusta un diseño prueba usabilidad?",
      "answer": "No; observar tareas permite detectar dificultades que una opinión no revela.",
      "sourceIds": [
        "pro-wai",
        "pro-mdn"
      ],
      "scopeNote": "Las fuentes apoyan interacción y accesibilidad; completar metodología específica de investigación UX y revisión de sesgos de muestreo."
    },
    {
      "id": "SWE-019",
      "focus": [
        "problema de usuario",
        "hipótesis de valor",
        "experimentos de producto"
      ],
      "practice": "Define una hipótesis y un prototipo mínimo de reserva antes de construir el sistema completo.",
      "checks": [
        "Problema delimitado",
        "Medida de resultado",
        "Criterio de abandono"
      ],
      "question": "¿Un producto mínimo puede omitir seguridad básica?",
      "answer": "No; reducir alcance no permite ignorar controles y daños previsibles.",
      "sourceIds": [
        "pro-mdn",
        "pro-asvs"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-020",
      "focus": [
        "responsabilidad",
        "privacidad",
        "impacto y accesibilidad"
      ],
      "practice": "Analiza un recomendador ficticio de becas y propone restricciones y mecanismo de reclamación.",
      "checks": [
        "Partes afectadas",
        "Daños y mitigaciones",
        "Límites de automatización"
      ],
      "question": "¿Cumplir el requisito escrito agota la responsabilidad?",
      "answer": "No; también deben considerarse impactos previsibles y límites del sistema.",
      "sourceIds": [
        "pro-wai",
        "pro-asvs"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-021",
      "focus": [
        "HTML semántico",
        "CSS adaptable",
        "formularios"
      ],
      "practice": "Crea una página de biblioteca sin depender de un framework y pruébala en móvil.",
      "checks": [
        "Jerarquía semántica",
        "Diseño sin desbordamiento",
        "Formulario con etiquetas"
      ],
      "question": "¿Por qué elegir button frente a div clicable?",
      "answer": "Aporta semántica y comportamiento de teclado nativos adecuados a una acción.",
      "sourceIds": [
        "pro-mdn",
        "pro-wai"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-022",
      "focus": [
        "tipos",
        "asincronía",
        "módulos y manejo de errores"
      ],
      "practice": "Implementa búsqueda con carga, error y cancelación y tipa respuestas desconocidas.",
      "checks": [
        "Datos externos validados",
        "Errores visibles",
        "Respuesta obsoleta descartada"
      ],
      "question": "¿TypeScript valida automáticamente una respuesta JSON?",
      "answer": "No: sus tipos no sustituyen validación de datos en tiempo de ejecución.",
      "sourceIds": [
        "pro-mdn"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-023",
      "focus": [
        "estado de interfaz",
        "componentes",
        "efectos y accesibilidad"
      ],
      "practice": "Construye un listado filtrable que conserve selección y gestione resultados vacíos.",
      "checks": [
        "Estado mínimo",
        "Efectos limpiados",
        "Pruebas de interacción"
      ],
      "question": "¿Debe guardarse todo valor calculable como estado?",
      "answer": "No; duplicarlo puede producir inconsistencias y sincronización innecesaria.",
      "sourceIds": [
        "pro-mdn",
        "pro-playwright"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-024",
      "focus": [
        "HTTP",
        "validación",
        "autorización por recurso"
      ],
      "practice": "Implementa una API local de préstamos con errores y pruebas de permisos.",
      "checks": [
        "Estados HTTP coherentes",
        "Validación del servidor",
        "Acceso cruzado denegado"
      ],
      "question": "¿Autenticación prueba autorización sobre un objeto?",
      "answer": "No; cada recurso y acción necesitan comprobar permisos.",
      "sourceIds": [
        "pro-dotnet",
        "pro-asvs"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-025",
      "focus": [
        "esquema GraphQL",
        "eventos",
        "compatibilidad de contratos"
      ],
      "practice": "Compara una consulta agregada y un evento de préstamo con reintento del consumidor.",
      "checks": [
        "Contrato versionado",
        "Consulta acotada",
        "Consumidor idempotente"
      ],
      "question": "¿Reintentar un evento garantiza no duplicar efectos?",
      "answer": "No; se necesita idempotencia o deduplicación con límites explícitos.",
      "sourceIds": [
        "pro-asvs",
        "pro-dotnet"
      ],
      "scopeNote": "Ejercicio de contratos; estas fuentes apoyan API y controles generales. Completar tutorial específico de GraphQL y broker elegido antes de producción."
    },
    {
      "id": "SWE-026",
      "focus": [
        "integración cliente-servidor",
        "persistencia",
        "manejo de sesiones"
      ],
      "practice": "Entrega una biblioteca funcional con interfaz, API, base de datos y restauración.",
      "checks": [
        "Recorrido completo probado",
        "Datos persisten",
        "Restauración reproducida"
      ],
      "question": "¿Qué debe probar una integración además de componentes aislados?",
      "answer": "Contratos, autenticación, errores y comportamiento conjunto ante fallos.",
      "sourceIds": [
        "pro-mdn",
        "pro-dotnet",
        "pro-playwright"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-027",
      "focus": [
        "Kotlin",
        "Compose",
        "estado y ciclo de vida"
      ],
      "practice": "Crea una app Android de préstamos que sobreviva a rotación y gestione conexión ausente.",
      "checks": [
        "Estado restaurado",
        "Errores de red visibles",
        "Pruebas en emulador"
      ],
      "question": "¿Una pantalla debe poseer permanentemente la conexión de red?",
      "answer": "No; el trabajo debe respetar ciclo de vida y separación de responsabilidades.",
      "sourceIds": [
        "pro-android"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-028",
      "focus": [
        "SwiftUI",
        "estado",
        "persistencia y navegación"
      ],
      "practice": "Desarrolla una lista de préstamos en simulador Apple con navegación y datos de prueba.",
      "checks": [
        "Estado consistente",
        "Navegación reversible",
        "Prueba sin red"
      ],
      "question": "¿Qué ocurre si varias vistas duplican el mismo estado?",
      "answer": "Pueden mostrar versiones divergentes; se necesita una fuente de verdad compartida.",
      "sourceIds": [
        "pro-swift"
      ],
      "scopeNote": "Tutoriales oficiales en inglés y equipo Mac compatible; no se verificó un curso completo gratuito en español ni se incluye publicación en App Store."
    },
    {
      "id": "SWE-029",
      "focus": [
        "código compartido",
        "interfaces nativas",
        "pruebas por plataforma"
      ],
      "practice": "Separa reglas de préstamo de la interfaz y prueba dos adaptadores simulados.",
      "checks": [
        "Reglas comunes aisladas",
        "Diferencias documentadas",
        "Casos por plataforma"
      ],
      "question": "¿Multiplataforma elimina las pruebas específicas?",
      "answer": "No; permisos, ciclo de vida, accesibilidad y dispositivos siguen variando.",
      "sourceIds": [
        "pro-android",
        "pro-swift"
      ],
      "scopeNote": "Comparación conceptual y práctica original; completar un curso del framework multiplataforma elegido. No se afirma que Android/SwiftUI enseñen ese framework."
    },
    {
      "id": "SWE-030",
      "focus": [
        "eventos de escritorio",
        "persistencia local",
        "instalación y actualización"
      ],
      "practice": "Crea un editor local de inventario y comprueba cierre inesperado y recuperación.",
      "checks": [
        "Archivos protegidos",
        "Interfaz responde",
        "Recuperación demostrada"
      ],
      "question": "¿Por qué evitar escritura bloqueante en la interfaz?",
      "answer": "Puede congelar la aplicación e impedir interacción y cancelación.",
      "sourceIds": [
        "pro-dotnet"
      ],
      "scopeNote": "La fuente cubre .NET/API como apoyo parcial; completar guía del entorno de escritorio elegido y empaquetado para el sistema operativo objetivo."
    },
    {
      "id": "SWE-031",
      "focus": [
        "límites de servicio",
        "consistencia",
        "fallos parciales"
      ],
      "practice": "Divide un monolito de prueba en catálogo y préstamos y compara sus costes.",
      "checks": [
        "Límites justificados",
        "Fallos parciales ensayados",
        "Consistencia especificada"
      ],
      "question": "¿Más servicios implican mejor escalabilidad?",
      "answer": "No necesariamente; aumentan costes de red, operación y coordinación.",
      "sourceIds": [
        "pro-microservices",
        "pro-github"
      ],
      "scopeNote": "Libro de arquitectura y práctica original; la edición .NET7 es histórica y debe contrastarse con versiones compatibles. El diseño requiere pruebas de fallos parciales, operación y revisión contextualizada."
    },
    {
      "id": "SWE-032",
      "focus": [
        "mensajería",
        "esquemas",
        "entrega e idempotencia"
      ],
      "practice": "En un laboratorio local procesa pedidos ficticios con identificador de operación. Inyecta mensajes duplicados, inválidos y fuera de orden; interrumpe un worker antes de confirmar y comprueba que el redelivery no duplica el efecto de negocio.",
      "checks": [
        "La aplicación deduplica por identificador y conserva resultados",
        "Se ensayan caída antes del ack y redelivery",
        "Los mensajes inválidos se aíslan y registran sin perder trazabilidad"
      ],
      "question": "¿Entrega al menos una vez equivale a efecto exactamente una vez?",
      "answer": "No; el consumidor necesita controlar efectos repetidos.",
      "sourceIds": [
        "pro-rabbitmq",
        "pro-asvs"
      ],
      "scopeNote": "Tutorial de mensajería en inglés y guía original. Un ack no garantiza efectos exactamente una vez; distinguir confirmación, persistencia y transacción de negocio. ASVS es contraste de requisitos, no curso de mensajería."
    },
    {
      "id": "SWE-033",
      "focus": [
        "transacciones",
        "persistencia ORM",
        "capas de aplicación"
      ],
      "practice": "Implementa reservas concurrentes en una aplicación Java y explica aislamiento elegido.",
      "checks": [
        "Invariantes preservadas",
        "Transacción probada",
        "Consulta medible"
      ],
      "question": "¿Un ORM elimina comprender SQL y transacciones?",
      "answer": "No; conserva los problemas de consistencia y rendimiento subyacentes.",
      "sourceIds": [
        "pro-ehu"
      ],
      "scopeNote": "EHU incluye JSF/Hibernate históricos. Actualizar biblioteca, seguridad y despliegue con documentación vigente del entorno Java antes de uso profesional."
    },
    {
      "id": "SWE-034",
      "focus": [
        "ASP.NET",
        "inyección de dependencias",
        "persistencia"
      ],
      "practice": "Construye una API .NET con validación, pruebas y configuración separada del código.",
      "checks": [
        "Dependencias sustituibles",
        "Secretos fuera del repositorio",
        "Pruebas de integración"
      ],
      "question": "¿Por qué inyectar una dependencia?",
      "answer": "Permite separar política de implementación y controlar colaboradores durante pruebas.",
      "sourceIds": [
        "pro-dotnet",
        "pro-playwright"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-035",
      "focus": [
        "eventos",
        "funciones efímeras",
        "coste y límites"
      ],
      "practice": "Simula una función que procese archivos con eventos repetidos y tiempos máximos.",
      "checks": [
        "Efecto idempotente",
        "Límite temporal",
        "Coste estimado por carga"
      ],
      "question": "¿Serverless elimina servidores y operación?",
      "answer": "Abstrae gestión de parte de infraestructura; quedan límites, seguridad y observación.",
      "sourceIds": [
        "pro-dotnet",
        "pro-github"
      ],
      "scopeNote": "Práctica local de arquitectura; falta laboratorio específico del proveedor. No exige contratar servicios cloud para estudiar conceptos."
    },
    {
      "id": "SWE-036",
      "focus": [
        "aislamiento entre clientes",
        "configuración",
        "autorización y facturación"
      ],
      "practice": "Diseña un SaaS ficticio y prueba que dos organizaciones no compartan datos.",
      "checks": [
        "Separación validada",
        "Permisos por tenant",
        "Migración ensayada"
      ],
      "question": "¿Añadir tenantId en la interfaz basta?",
      "answer": "No; debe imponerse aislamiento en todas las operaciones del servidor y almacenamiento.",
      "sourceIds": [
        "pro-asvs",
        "pro-dotnet"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-037",
      "focus": [
        "automatización visual",
        "conectores",
        "control de errores"
      ],
      "practice": "Especifica un flujo que archive formularios ficticios y compáralo con un script local.",
      "checks": [
        "Permisos mínimos",
        "Reintento acotado",
        "Resultado auditable"
      ],
      "question": "¿Una herramienta visual evita ingeniería de software?",
      "answer": "No; sigue necesitando requisitos, pruebas, seguridad y mantenimiento.",
      "sourceIds": [
        "pro-github"
      ],
      "scopeNote": "Actividad de diseño y contraste, no tutorial de Power Platform/RPA. Conectores, cuentas y licencias pueden costar; falta seleccionar curso específico gratuito."
    },
    {
      "id": "SWE-038",
      "focus": [
        "catálogo y carrito",
        "pedido",
        "seguridad de pagos"
      ],
      "practice": "Implementa una tienda local con pago simulado y estados de pedido.",
      "checks": [
        "Totales comprobados",
        "Compra idempotente",
        "Sin datos reales de pago"
      ],
      "question": "¿Por qué no confiar en el precio enviado por el navegador?",
      "answer": "El servidor debe recalcularlo desde su catálogo y reglas autorizadas.",
      "sourceIds": [
        "pro-mdn",
        "pro-asvs"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-039",
      "focus": [
        "caracterización",
        "estrategia incremental",
        "compatibilidad"
      ],
      "practice": "Sustituye un módulo heredado detrás de una interfaz y compara salidas antiguas/nuevas.",
      "checks": [
        "Contrato preservado",
        "Migración reversible",
        "Diferencias explicadas"
      ],
      "question": "¿Reescribir todo reduce necesariamente el riesgo?",
      "answer": "No; puede perder comportamiento implícito y aumentar el coste de validación.",
      "sourceIds": [
        "pro-ehu",
        "pro-github"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "SWE-040",
      "focus": [
        "experiencia del desarrollador",
        "plantillas",
        "autoservicio gobernado"
      ],
      "practice": "Crea una plantilla de servicio con pruebas, observación y documentación de uso.",
      "checks": [
        "Arranque reproducible",
        "Controles por defecto",
        "Retroalimentación de usuarios"
      ],
      "question": "¿Una plataforma interna debe ocultar todos sus límites?",
      "answer": "No; sus usuarios necesitan contratos, cuotas y rutas claras de diagnóstico.",
      "sourceIds": [
        "pro-github",
        "pro-asvs"
      ],
      "scopeNote": "Guía inicial y práctica original de ingeniería; los recursos apoyan partes del temario. Requiere proyecto mantenido, pruebas y revisión externa; no curso completo acreditado."
    },
    {
      "id": "CYB-001",
      "focus": [
        "activos",
        "amenazas",
        "riesgo y controles"
      ],
      "practice": "Modela los riesgos de una biblioteca ficticia y prioriza cinco controles.",
      "checks": [
        "Activos valorados",
        "Amenazas plausibles",
        "Riesgo residual explicado"
      ],
      "question": "¿Riesgo y vulnerabilidad son iguales?",
      "answer": "No: el riesgo combina posibles consecuencias y circunstancias; la vulnerabilidad es una debilidad.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-002",
      "focus": [
        "confidencialidad",
        "integridad",
        "gestión de claves"
      ],
      "practice": "Compara hash, cifrado y autenticación en un intercambio local de mensajes sintéticos.",
      "checks": [
        "Objetivos distinguidos",
        "Claves no incrustadas",
        "Alteración detectada"
      ],
      "question": "¿Un hash público autentica al emisor?",
      "answer": "No por sí solo; se necesita un mecanismo autenticado apropiado.",
      "sourceIds": [
        "pro-crypto"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-003",
      "focus": [
        "cifrado autenticado",
        "nonces",
        "protocolos y bibliotecas"
      ],
      "practice": "Prueba una biblioteca criptográfica con vectores conocidos y entradas alteradas.",
      "checks": [
        "Vectores reproducidos",
        "Errores manejados",
        "Supuestos documentados"
      ],
      "question": "¿Por qué preocupa repetir un nonce?",
      "answer": "Puede romper propiedades de seguridad del esquema según su diseño y uso.",
      "sourceIds": [
        "pro-crypto"
      ],
      "scopeNote": "Laboratorio de comprensión; no diseñar criptografía de producción. Completar protocolos, pruebas formales y bibliotecas actuales con revisión especializada."
    },
    {
      "id": "CYB-004",
      "focus": [
        "identidad",
        "autenticación",
        "autorización"
      ],
      "practice": "Diseña permisos por rol de una aplicación de prueba y verifica accesos cruzados.",
      "checks": [
        "Matriz de permisos",
        "Denegación comprobada",
        "Revocación ensayada"
      ],
      "question": "¿Autenticarse concede acceso a todos los recursos?",
      "answer": "No; la autorización debe comprobar cada operación sobre cada recurso.",
      "sourceIds": [
        "pro-asvs"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-005",
      "focus": [
        "segmentación",
        "filtrado",
        "observación de tráfico"
      ],
      "practice": "Define segmentos de una red virtual y valida únicamente las conexiones permitidas.",
      "checks": [
        "Reglas explícitas",
        "Casos permitidos/denegados",
        "Logs vinculados"
      ],
      "question": "¿Segmentar elimina la necesidad de autenticar servicios?",
      "answer": "No; limita movimientos y exposición, pero no sustituye identidad y controles de aplicación.",
      "sourceIds": [
        "pro-wazuh",
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-006",
      "focus": [
        "mínimo privilegio",
        "actualización",
        "endurecimiento"
      ],
      "practice": "Audita una máquina virtual propia y documenta correcciones reversibles de configuración.",
      "checks": [
        "Configuración inicial guardada",
        "Cambios justificados",
        "Servicio sigue funcionando"
      ],
      "question": "¿Desactivar servicios indiscriminadamente mejora siempre la seguridad?",
      "answer": "No; puede romper funciones o controles y debe basarse en necesidades y riesgo.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-007",
      "focus": [
        "superficie de ataque",
        "validación",
        "dependencias"
      ],
      "practice": "Revisa una aplicación local y relaciona sus entradas con controles ASVS.",
      "checks": [
        "Inventario de entradas",
        "Controles trazables",
        "Pruebas de regresión"
      ],
      "question": "¿Escapar una salida sustituye validar entradas?",
      "answer": "No; son controles con objetivos y contextos diferentes.",
      "sourceIds": [
        "pro-asvs",
        "pro-webgoat"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-008",
      "focus": [
        "sesiones",
        "autorización de API",
        "inyección y salida segura"
      ],
      "practice": "Resuelve lecciones autorizadas y corrige una API educativa con pruebas negativas.",
      "checks": [
        "Reproducción solo local",
        "Control corregido",
        "Prueba evita regresión"
      ],
      "question": "¿Ocultar un botón protege una API?",
      "answer": "No; la API debe comprobar permisos aunque la interfaz no exponga la acción.",
      "sourceIds": [
        "pro-portswigger",
        "pro-asvs"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-009",
      "focus": [
        "permisos móviles",
        "almacenamiento",
        "comunicación"
      ],
      "practice": "Analiza una app de prueba sin datos personales y elimina permisos innecesarios.",
      "checks": [
        "Permisos justificados",
        "Datos sensibles ausentes",
        "Transmisión revisada"
      ],
      "question": "¿El sandbox móvil protege todo dato automáticamente?",
      "answer": "No; la aplicación sigue decidiendo qué guarda, expone y transmite.",
      "sourceIds": [
        "pro-android",
        "pro-asvs"
      ],
      "scopeNote": "Las fuentes apoyan desarrollo móvil y controles generales; completar una guía móvil específica y pruebas del sistema operativo objetivo."
    },
    {
      "id": "CYB-010",
      "focus": [
        "responsabilidad compartida",
        "identidad cloud",
        "configuración"
      ],
      "practice": "Evalúa una configuración cloud ficticia y propone controles verificables sin desplegarla.",
      "checks": [
        "Responsables asignados",
        "Exposición identificada",
        "Pruebas propuestas"
      ],
      "question": "¿El proveedor asegura automáticamente la configuración del cliente?",
      "answer": "No; responsabilidades dependen del servicio y de la configuración elegida.",
      "sourceIds": [
        "pro-csf",
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-011",
      "focus": [
        "imágenes",
        "secretos",
        "identidad de carga"
      ],
      "practice": "Revisa un contenedor local de prueba y compara sus permisos antes/después.",
      "checks": [
        "Imagen identificable",
        "Sin secretos incorporados",
        "Privilegios reducidos"
      ],
      "question": "¿Un contenedor equivale a una máquina virtual aislada?",
      "answer": "No; su modelo de aislamiento y kernel compartido requieren análisis propio.",
      "sourceIds": [
        "pro-wazuh",
        "pro-asvs"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-012",
      "focus": [
        "actualizaciones IoT",
        "identidad del dispositivo",
        "datos del sensor"
      ],
      "practice": "Diseña controles para un sensor simulado y prueba autenticación y actualización fallida.",
      "checks": [
        "Identidad definida",
        "Actualización recuperable",
        "Datos mínimos"
      ],
      "question": "¿Una contraseña común para toda una flota es aceptable?",
      "answer": "Crea un punto compartido de compromiso y dificulta revocación individual.",
      "sourceIds": [
        "pro-asvs",
        "pro-csf"
      ],
      "scopeNote": "Caso simulado; completar documentación del microcontrolador, protocolo y hardware elegido. No se manipulan dispositivos de terceros."
    },
    {
      "id": "CYB-013",
      "focus": [
        "disponibilidad industrial",
        "zonas y conductos",
        "seguridad funcional"
      ],
      "practice": "Diseña un ejercicio de mesa para una planta ficticia sin acceder a equipos industriales.",
      "checks": [
        "Proceso físico modelado",
        "Dependencias críticas",
        "Cambios sometidos a aprobación"
      ],
      "question": "¿Un parche urgente debe instalarse sin evaluar el proceso físico?",
      "answer": "No; hay que analizar disponibilidad, seguridad funcional y procedimiento autorizado.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Solo ejercicio de mesa. NIST CSF aporta gestión; falta formación específica OT/ICS y estándares sectoriales, no autoriza probar en planta."
    },
    {
      "id": "CYB-014",
      "focus": [
        "verificación explícita",
        "mínimo privilegio",
        "contexto de acceso"
      ],
      "practice": "Propón decisiones de acceso para usuarios y servicios de un entorno ficticio.",
      "checks": [
        "Identidad por solicitud",
        "Privilegio limitado",
        "Revocación considerada"
      ],
      "question": "¿Zero Trust es comprar un producto concreto?",
      "answer": "No; es un enfoque de arquitectura y control de acceso, no una garantía comercial.",
      "sourceIds": [
        "pro-asvs",
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-015",
      "focus": [
        "inventario",
        "priorización",
        "verificación de correcciones"
      ],
      "practice": "Prioriza hallazgos sintéticos según exposición e impacto y comprueba una corrección local.",
      "checks": [
        "Activo identificado",
        "Prioridad razonada",
        "Reprueba documentada"
      ],
      "question": "¿La puntuación técnica basta para priorizar?",
      "answer": "No; deben considerarse exposición, impacto de negocio y controles existentes.",
      "sourceIds": [
        "pro-wazuh",
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-016",
      "focus": [
        "triaje",
        "procedimientos SOC",
        "escalamiento"
      ],
      "practice": "Clasifica veinte alertas sintéticas y redacta dos procedimientos de atención.",
      "checks": [
        "Evidencia de decisión",
        "Falsos positivos revisados",
        "Escalamiento claro"
      ],
      "question": "¿Toda alerta es un incidente confirmado?",
      "answer": "No; debe investigarse y clasificarse con evidencia y contexto.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-017",
      "focus": [
        "normalización",
        "correlación",
        "retención de eventos"
      ],
      "practice": "Construye una regla de correlación sobre logs de autenticación simulados.",
      "checks": [
        "Campos normalizados",
        "Prueba positiva y negativa",
        "Retención justificada"
      ],
      "question": "¿Más logs siempre producen mejor detección?",
      "answer": "No; calidad, contexto, cobertura y capacidad de análisis importan más que volumen aislado.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-018",
      "focus": [
        "fuentes de inteligencia",
        "confianza",
        "contexto temporal"
      ],
      "practice": "Evalúa tres informes públicos sin interactuar con infraestructura sospechosa.",
      "checks": [
        "Procedencia citada",
        "Confianza explícita",
        "Caducidad considerada"
      ],
      "question": "¿Un indicador observado prueba atribución?",
      "answer": "No; puede compartirse, reutilizarse o tener explicaciones alternativas.",
      "sourceIds": [
        "pro-csf",
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-019",
      "focus": [
        "hipótesis de hunting",
        "telemetría",
        "falsación"
      ],
      "practice": "Formula una hipótesis y búscala en un conjunto sintético de eventos.",
      "checks": [
        "Hipótesis comprobable",
        "Cobertura conocida",
        "Ausencia interpretada con cautela"
      ],
      "question": "¿No hallar eventos demuestra ausencia de actividad?",
      "answer": "No; también puede reflejar falta de sensores o retención insuficiente.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-020",
      "focus": [
        "preparación",
        "contención",
        "recuperación y aprendizaje"
      ],
      "practice": "Ejecuta una simulación de incidente sobre archivos ficticios y documenta decisiones.",
      "checks": [
        "Línea temporal",
        "Contención reversible",
        "Recuperación verificada"
      ],
      "question": "¿Eliminar evidencias inmediatamente facilita siempre la respuesta?",
      "answer": "No; puede impedir comprender alcance y preservar registros necesarios.",
      "sourceIds": [
        "pro-wazuh",
        "pro-forensics"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-021",
      "focus": [
        "análisis estático",
        "comportamiento",
        "aislamiento"
      ],
      "practice": "Analiza un programa inocuo propio que cree un archivo de prueba y registre su actividad.",
      "checks": [
        "Entorno aislado",
        "Comportamiento conocido",
        "Conclusiones sustentadas"
      ],
      "question": "¿Un nombre de archivo identifica malware?",
      "answer": "No; la clasificación necesita evidencias de comportamiento, contenido y contexto.",
      "sourceIds": [
        "pro-forensics",
        "pro-wazuh"
      ],
      "scopeNote": "No descargar ni ejecutar muestras reales. Esta práctica enseña observación básica; falta laboratorio avanzado supervisado de análisis de malware."
    },
    {
      "id": "CYB-022",
      "focus": [
        "formatos ejecutables",
        "desensamblado",
        "reconstrucción de lógica"
      ],
      "practice": "Compila un programa propio sencillo y relaciona funciones con su representación compilada.",
      "checks": [
        "Código fuente conservado",
        "Hipótesis contrastadas",
        "Limitaciones del análisis"
      ],
      "question": "¿El código descompilado reproduce exactamente el original?",
      "answer": "No; nombres, estructuras y decisiones de compilación pueden perderse o reconstruirse de forma aproximada.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "Recurso forense solo como contexto; falta material específico de arquitectura y herramientas de ingeniería inversa. Trabajar sobre programas propios o expresamente autorizados."
    },
    {
      "id": "CYB-023",
      "focus": [
        "controles de pipeline",
        "dependencias",
        "gestión de secretos"
      ],
      "practice": "Integra revisión de dependencias y pruebas de seguridad en un repositorio educativo.",
      "checks": [
        "Controles bloqueantes",
        "Resultados trazables",
        "Secretos fuera del código"
      ],
      "question": "¿Añadir un escáner basta para DevSecOps?",
      "answer": "No; se necesitan responsables, corrección de hallazgos y controles durante todo el ciclo.",
      "sourceIds": [
        "pro-github",
        "pro-asvs"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-024",
      "focus": [
        "minimización",
        "finalidad",
        "retención y acceso"
      ],
      "practice": "Diseña un registro ficticio de usuarios con datos mínimos y plazo de eliminación.",
      "checks": [
        "Campos justificados",
        "Acceso limitado",
        "Borrado comprobable"
      ],
      "question": "¿Anonimizar es simplemente quitar el nombre?",
      "answer": "No; combinaciones de atributos pueden permitir reidentificar personas.",
      "sourceIds": [
        "pro-csf",
        "pro-asvs"
      ],
      "scopeNote": "Ejercicio técnico con datos sintéticos; los requisitos jurídicos de privacidad deben contrastarse con fuentes oficiales de la jurisdicción y asesoría competente."
    },
    {
      "id": "CYB-025",
      "focus": [
        "gobierno",
        "responsabilidad",
        "políticas medibles"
      ],
      "practice": "Redacta una política breve y asígnale responsable, evidencia y revisión.",
      "checks": [
        "Responsable identificado",
        "Evidencia observable",
        "Excepciones controladas"
      ],
      "question": "¿Una política firmada demuestra cumplimiento operativo?",
      "answer": "No; deben observarse controles, registros y tratamiento de excepciones.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-026",
      "focus": [
        "escenarios de riesgo",
        "incertidumbre",
        "tratamiento"
      ],
      "practice": "Compara tres escenarios y documenta aceptar, reducir o transferir cada riesgo.",
      "checks": [
        "Supuestos separados",
        "Impactos razonados",
        "Riesgo residual"
      ],
      "question": "¿Precisión numérica implica certeza del riesgo?",
      "answer": "No; una cifra puede ocultar supuestos inciertos y datos insuficientes.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-027",
      "focus": [
        "marcos de control",
        "perfiles",
        "trazabilidad de evidencia"
      ],
      "practice": "Relaciona diez resultados CSF con controles y evidencias de una empresa ficticia.",
      "checks": [
        "Correspondencia justificada",
        "Evidencias suficientes",
        "Huecos identificados"
      ],
      "question": "¿Una tabla de correspondencias certifica ISO27001?",
      "answer": "No; no sustituye requisitos aplicables, implementación, auditoría ni proceso formal de certificación.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "CSF abierto no equivale al texto completo de normas ISO ni a formación de auditor acreditado; declarar versión y acceso de cada norma."
    },
    {
      "id": "CYB-028",
      "focus": [
        "continuidad",
        "dependencias",
        "recuperación"
      ],
      "practice": "Simula la pérdida de un servicio local y restaura una copia validada.",
      "checks": [
        "RTO/RPO definidos",
        "Copia restaurada",
        "Dependencias verificadas"
      ],
      "question": "¿Tener backup demuestra recuperabilidad?",
      "answer": "No; se necesita restaurarlo y comprobar integridad y funcionamiento dentro de objetivos.",
      "sourceIds": [
        "pro-csf",
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-029",
      "focus": [
        "proveedores",
        "dependencias",
        "riesgo de suministro"
      ],
      "practice": "Evalúa un proveedor ficticio y una dependencia de software con criterios de salida.",
      "checks": [
        "Dependencias inventariadas",
        "Riesgos priorizados",
        "Plan de sustitución"
      ],
      "question": "¿Delegar un servicio elimina responsabilidad sobre sus datos?",
      "answer": "No; deben gestionarse accesos, obligaciones, riesgos y continuidad con el proveedor.",
      "sourceIds": [
        "pro-csf",
        "pro-github"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-030",
      "focus": [
        "estrategia",
        "prioridades",
        "comunicación ejecutiva"
      ],
      "practice": "Presenta un plan anual ficticio con tres inversiones y resultados comprobables.",
      "checks": [
        "Riesgos vinculados",
        "Costes comparados",
        "Indicadores de resultado"
      ],
      "question": "¿Contar herramientas compradas mide eficacia?",
      "answer": "No; interesa cómo cambian riesgos y resultados operativos observables.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-031",
      "focus": [
        "autorización",
        "alcance",
        "reglas de participación"
      ],
      "practice": "Escribe un permiso y plan de laboratorio ficticio con límites, datos y parada.",
      "checks": [
        "Activos permitidos",
        "Exclusiones claras",
        "Contacto y parada"
      ],
      "question": "¿Un permiso general cubre cualquier técnica?",
      "answer": "No; deben acordarse activos, métodos, ventanas y condiciones de seguridad.",
      "sourceIds": [
        "pro-portswigger",
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-032",
      "focus": [
        "inventario de superficie",
        "servicios",
        "documentación de activos"
      ],
      "practice": "Enumera manualmente solo servicios de una máquina virtual propia y compara con su configuración.",
      "checks": [
        "Alcance local",
        "Hallazgos confirmados",
        "Sin objetivos externos"
      ],
      "question": "¿Un puerto abierto demuestra una vulnerabilidad?",
      "answer": "No; indica un servicio accesible que requiere identificación y análisis de configuración.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-033",
      "focus": [
        "plan de prueba",
        "validación de exposición",
        "reporte"
      ],
      "practice": "Evalúa una red virtual creada por ti mediante casos permitidos y denegados, sin explotación.",
      "checks": [
        "Autorización archivada",
        "Prueba reproducible",
        "Recomendación comprobable"
      ],
      "question": "¿Un hallazgo no reproducible debe informarse como confirmado?",
      "answer": "No; debe distinguirse sospecha, evidencia y limitación de validación.",
      "sourceIds": [
        "pro-csf",
        "pro-wazuh"
      ],
      "scopeNote": "Guía de evaluación controlada; los recursos no cubren un curso completo de pentesting de redes. No realizar reconocimiento o explotación de terceros."
    },
    {
      "id": "CYB-034",
      "focus": [
        "laboratorio web",
        "controles",
        "corrección verificable"
      ],
      "practice": "Completa una lección de Academy y explica la mitigación en una aplicación propia.",
      "checks": [
        "Entorno permitido",
        "Causa comprendida",
        "Mitigación con prueba"
      ],
      "question": "¿Resolver un reto demuestra seguridad de cualquier aplicación?",
      "answer": "No; cada sistema requiere alcance, contexto y evaluación de controles propios.",
      "sourceIds": [
        "pro-portswigger",
        "pro-webgoat"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-035",
      "focus": [
        "configuración inalámbrica",
        "autenticación",
        "segmentación de invitados"
      ],
      "practice": "Audita la configuración documentada de un punto de acceso propio sin interceptar tráfico ajeno.",
      "checks": [
        "Permiso del propietario",
        "Configuración registrada",
        "Mejora validada"
      ],
      "question": "¿Un SSID oculto sustituye autenticación robusta?",
      "answer": "No; ocultar el nombre no establece seguridad criptográfica ni control de acceso.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Caso de configuración defensiva; falta curso inalámbrico específico y práctica controlada. No captura de credenciales ni interferencia de redes ajenas."
    },
    {
      "id": "CYB-036",
      "focus": [
        "almacenamiento de credenciales",
        "MFA",
        "recuperación"
      ],
      "practice": "Prueba autenticación de una app educativa con contraseñas de ejemplo y recuperación segura.",
      "checks": [
        "Secretos no registrados",
        "Intentos limitados",
        "Recuperación revisada"
      ],
      "question": "¿Cifrar reversiblemente contraseñas es lo mismo que derivarlas con sal?",
      "answer": "No; la derivación apropiada evita necesitar recuperar la contraseña original.",
      "sourceIds": [
        "pro-asvs",
        "pro-crypto"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-037",
      "focus": [
        "permisos Linux",
        "servicios privilegiados",
        "configuración insegura"
      ],
      "practice": "Revisa permisos excesivos de archivos sintéticos en una VM y corrige su configuración.",
      "checks": [
        "Solo VM propia",
        "Permiso mínimo",
        "Prueba funcional posterior"
      ],
      "question": "¿Detectar un permiso excesivo obliga a explotarlo?",
      "answer": "No; puede validarse el riesgo mediante configuración y pruebas autorizadas no destructivas.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Práctica defensiva de permisos; no instrucciones de explotación ni persistencia. Completar administración Linux antes de técnicas avanzadas."
    },
    {
      "id": "CYB-038",
      "focus": [
        "permisos Windows",
        "identidades de servicio",
        "configuración local"
      ],
      "practice": "Audita privilegios de cuentas de prueba en una VM y comprueba revocaciones.",
      "checks": [
        "Cuenta identificada",
        "Cambio reversible",
        "Acceso indebido denegado"
      ],
      "question": "¿Ser usuario autenticado implica privilegio administrativo?",
      "answer": "No; autorización y pertenencias efectivas determinan operaciones permitidas.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Auditoría defensiva de configuración; fuente no equivale a un curso completo de escalada Windows. No modificar máquinas fuera del laboratorio."
    },
    {
      "id": "CYB-039",
      "focus": [
        "memoria segura",
        "validación de límites",
        "análisis de fallos"
      ],
      "practice": "Crea pruebas de límites para un programa propio y compara error detectado y corregido.",
      "checks": [
        "Entradas sintéticas",
        "Fallo explicado",
        "Corrección conserva funciones"
      ],
      "question": "¿Un fallo de memoria demuestra por sí solo explotabilidad?",
      "answer": "No; se necesitan condiciones y análisis adicionales, sin confundir bloqueo con ejecución controlada.",
      "sourceIds": [
        "pro-asvs"
      ],
      "scopeNote": "Se trabaja en prevención y diagnóstico de fallos propios; no se incluyen payloads ni cadenas de explotación operativa. Falta formación especializada supervisada."
    },
    {
      "id": "CYB-040",
      "focus": [
        "objetivos de ejercicio",
        "reglas de participación",
        "coordinación defensiva"
      ],
      "practice": "Diseña un ejercicio de mesa RedTeam para una empresa ficticia sin ejecutar intrusiones.",
      "checks": [
        "Objetivos vinculados",
        "Riesgos y parada",
        "Criterios defensivos"
      ],
      "question": "¿El éxito de RedTeam se mide solo por entrar?",
      "answer": "No; también por aprendizajes defensivos, evidencias y correcciones verificadas dentro del alcance.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-041",
      "focus": [
        "validación de detección",
        "colaboración",
        "mejora continua"
      ],
      "practice": "Inyecta eventos sintéticos acordados en un laboratorio y ajusta una detección.",
      "checks": [
        "Hipótesis previa",
        "Detección medida",
        "Falso positivo revisado"
      ],
      "question": "¿PurpleTeam es repetir ataques sin objetivo?",
      "answer": "No; exige colaboración y pruebas ligadas a controles y mejoras concretas.",
      "sourceIds": [
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-042",
      "focus": [
        "identidad de dominio",
        "delegación",
        "registro de accesos"
      ],
      "practice": "Modela un dominio ficticio y revisa permisos excesivos sin extraer credenciales.",
      "checks": [
        "Identidades inventariadas",
        "Delegaciones justificadas",
        "Revocación probada"
      ],
      "question": "¿Un grupo poco visible deja de ser relevante para el riesgo?",
      "answer": "No; importan permisos efectivos y rutas de acceso, no solo su nombre.",
      "sourceIds": [
        "pro-csf",
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio defensivo y de arquitectura; falta laboratorio específico de ActiveDirectory y fuente oficial de sus controles. No explotación, robo de credenciales ni movimiento lateral."
    },
    {
      "id": "CYB-043",
      "focus": [
        "alcance cloud",
        "políticas",
        "validación de permisos"
      ],
      "practice": "Revisa políticas de una cuenta ficticia y diseña pruebas no destructivas de autorización.",
      "checks": [
        "Recursos autorizados",
        "Exposición evaluada",
        "Permisos mínimos"
      ],
      "question": "¿Una política aparentemente restringida garantiza ausencia de acceso indirecto?",
      "answer": "No; deben analizarse relaciones, herencia y permisos efectivos.",
      "sourceIds": [
        "pro-csf",
        "pro-asvs"
      ],
      "scopeNote": "Práctica de diseño sin desplegar ni atacar cloud real. Requiere política del proveedor, autorización y laboratorio específico para evaluación práctica avanzada."
    },
    {
      "id": "CYB-044",
      "focus": [
        "modelo de atacante físico",
        "canales laterales",
        "contramedidas"
      ],
      "practice": "Compara tiempos agregados de dos funciones inocuas propias y discute qué se puede inferir.",
      "checks": [
        "Medición reproducible",
        "Ruido cuantificado",
        "Sin datos secretos reales"
      ],
      "question": "¿Diferencias de tiempo prueban automáticamente fuga útil?",
      "answer": "No; deben analizarse ruido, control del entorno y relación con información sensible.",
      "sourceIds": [
        "pro-crypto"
      ],
      "scopeNote": "Introducción experimental segura; falta hardware, instrumentación y formación especializada para evaluación física real. No extracción de secretos de dispositivos ajenos."
    },
    {
      "id": "CYB-045",
      "focus": [
        "reproducción",
        "divulgación coordinada",
        "mitigación"
      ],
      "practice": "Redacta un informe de un error creado por ti con reproducción mínima y solución.",
      "checks": [
        "Impacto delimitado",
        "Datos sensibles ausentes",
        "Corrección verificable"
      ],
      "question": "¿Publicar todos los detalles inmediatamente minimiza siempre daño?",
      "answer": "No; deben considerarse coordinación, usuarios afectados, mitigación y reglas aplicables.",
      "sourceIds": [
        "pro-asvs",
        "pro-github"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-046",
      "focus": [
        "evidencia digital",
        "integridad",
        "reproducibilidad"
      ],
      "practice": "Analiza una copia de datos sintéticos y separa observación de interpretación.",
      "checks": [
        "Original preservado",
        "Huella registrada",
        "Conclusiones trazables"
      ],
      "question": "¿Una huella demuestra quién creó un archivo?",
      "answer": "No; ayuda a comprobar identidad de contenido, no autoría o contexto por sí sola.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-047",
      "focus": [
        "adquisición",
        "metadatos",
        "cadena de custodia"
      ],
      "practice": "Copia un conjunto sintético, calcula su huella y registra cada transferencia del ejercicio.",
      "checks": [
        "Método documentado",
        "Huellas verificadas",
        "Transferencias registradas"
      ],
      "question": "¿Copiar equivale siempre a adquirir toda la evidencia disponible?",
      "answer": "No; pueden omitirse metadatos, áreas y datos volátiles según el método.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-048",
      "focus": [
        "sistemas de archivos",
        "líneas temporales",
        "artefactos"
      ],
      "practice": "Construye un pequeño conjunto de archivos sintéticos con cambios conocidos y reconstruye su secuencia.",
      "checks": [
        "Tiempos con zona",
        "Herramienta identificada",
        "Inferencias diferenciadas"
      ],
      "question": "¿Una fecha aislada prueba una acción concreta?",
      "answer": "No; su semántica y posibilidad de alteración requieren contexto y contraste.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-049",
      "focus": [
        "datos volátiles",
        "procesos",
        "limitaciones de captura"
      ],
      "practice": "Compara dos listados sintéticos de procesos y explica qué no permite concluir una instantánea.",
      "checks": [
        "Tiempo de captura",
        "Fuentes separadas",
        "Limitaciones declaradas"
      ],
      "question": "¿Una captura de memoria representa todo el historial del equipo?",
      "answer": "No; refleja un estado parcial condicionado por captura, herramientas y tiempo.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "Práctica inicial con datos sintéticos; requiere material específico y laboratorio de memoria para análisis avanzado, sin muestras reales desconocidas."
    },
    {
      "id": "CYB-050",
      "focus": [
        "capturas de red",
        "flujos",
        "tiempo y pérdida"
      ],
      "practice": "Analiza una captura creada por ti entre servicios de prueba y reconstruye conexiones.",
      "checks": [
        "Origen autorizado",
        "Reloj contextualizado",
        "Pérdidas consideradas"
      ],
      "question": "¿No observar un paquete demuestra que nunca existió?",
      "answer": "No; la captura depende del punto de observación, filtros y pérdidas.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-051",
      "focus": [
        "adquisición móvil",
        "bloqueo y cifrado",
        "permisos"
      ],
      "practice": "Diseña un plan de adquisición para datos ficticios de una app propia sin eludir bloqueos.",
      "checks": [
        "Consentimiento explícito",
        "Método no invasivo",
        "Datos mínimos"
      ],
      "question": "¿Una copia de seguridad móvil contiene necesariamente todo?",
      "answer": "No; su contenido depende de permisos, cifrado, plataforma y configuración.",
      "sourceIds": [
        "pro-forensics",
        "pro-android"
      ],
      "scopeNote": "No eludir activación, cifrado o controles de acceso. La formación forense móvil completa requiere procedimientos y herramientas específicos, marco legal y supervisión."
    },
    {
      "id": "CYB-052",
      "focus": [
        "evidencias cloud",
        "responsabilidad",
        "retención"
      ],
      "practice": "Reconstruye un incidente ficticio desde registros exportados con tiempos y procedencias.",
      "checks": [
        "Exportación documentada",
        "Identidades trazables",
        "Retención conocida"
      ],
      "question": "¿Todos los eventos cloud quedan disponibles indefinidamente?",
      "answer": "No; disponibilidad y retención dependen del servicio y su configuración.",
      "sourceIds": [
        "pro-forensics",
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-053",
      "focus": [
        "artefactos",
        "correlación",
        "certeza de conclusiones"
      ],
      "practice": "Relaciona logs sintéticos con archivos creados por un programa inocuo de laboratorio.",
      "checks": [
        "Fuentes correlacionadas",
        "Huellas conservadas",
        "Causalidad no sobreafirmada"
      ],
      "question": "¿Coincidencia temporal demuestra que un proceso causó un evento?",
      "answer": "No; puede orientar una hipótesis que requiere corroboración adicional.",
      "sourceIds": [
        "pro-forensics",
        "pro-wazuh"
      ],
      "scopeNote": "Ejercicio de correlación, no curso completo de malware. No descargar ni ejecutar muestras reales sin laboratorio competente."
    },
    {
      "id": "CYB-054",
      "focus": [
        "búsqueda de evidencias",
        "relevancia",
        "privilegio y privacidad"
      ],
      "practice": "Clasifica documentos ficticios según una solicitud simulada y registra exclusiones.",
      "checks": [
        "Alcance definido",
        "Decisiones reproducibles",
        "Privacidad preservada"
      ],
      "question": "¿Reunir todos los archivos es siempre lo adecuado?",
      "answer": "No; deben respetarse relevancia, alcance, minimización y reglas aplicables.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "Caso pedagógico; no asesoría procesal. Falta formación jurídica y procedimientos de la jurisdicción antes de participar en casos reales."
    },
    {
      "id": "CYB-055",
      "focus": [
        "trazabilidad",
        "admisibilidad",
        "explicación de límites"
      ],
      "practice": "Presenta oralmente un informe sintético y responde preguntas sobre métodos y errores.",
      "checks": [
        "Método comprensible",
        "Límites explícitos",
        "Registro íntegro"
      ],
      "question": "¿Tener una huella garantiza admisibilidad legal?",
      "answer": "No; la evaluación depende también del procedimiento, contexto y normas aplicables.",
      "sourceIds": [
        "pro-forensics"
      ],
      "scopeNote": "No se afirma contenido legal vigente para todos los países. Consultar fuentes oficiales y profesionales competentes; NIST800-86 no es guía legal."
    },
    {
      "id": "CYB-056",
      "focus": [
        "criterios de auditoría",
        "muestreo",
        "evidencia"
      ],
      "practice": "Audita cinco controles de una organización ficticia con muestra definida.",
      "checks": [
        "Criterio identificado",
        "Muestra justificada",
        "Evidencia suficiente"
      ],
      "question": "¿Ausencia de evidencia demuestra siempre que no existe un control?",
      "answer": "No; puede reflejar acceso o registro insuficiente y debe explicarse la limitación.",
      "sourceIds": [
        "pro-csf",
        "pro-asvs"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-057",
      "focus": [
        "planificación basada en riesgo",
        "hallazgos",
        "seguimiento"
      ],
      "practice": "Redacta hallazgos con condición, criterio, causa e impacto y comprueba una corrección.",
      "checks": [
        "Hallazgo trazable",
        "Riesgo razonado",
        "Seguimiento verificable"
      ],
      "question": "¿Una recomendación aceptada equivale a hallazgo cerrado?",
      "answer": "No; debe verificarse su implementación y eficacia según el criterio acordado.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-058",
      "focus": [
        "controles de aplicación",
        "permisos de datos",
        "trazabilidad transaccional"
      ],
      "practice": "Audita una app de préstamos con datos ficticios y pruebas de acceso por rol.",
      "checks": [
        "Permisos comprobados",
        "Cambios trazables",
        "Integridad de datos"
      ],
      "question": "¿Una consulta correcta prueba la seguridad de la base?",
      "answer": "No; también deben verificarse acceso, cambios, respaldo y exposición.",
      "sourceIds": [
        "pro-asvs",
        "pro-webgoat"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-059",
      "focus": [
        "configuración",
        "identidades",
        "registro e infraestructura"
      ],
      "practice": "Evalúa una infraestructura descrita en archivos de ejemplo y contrasta con controles.",
      "checks": [
        "Inventario coherente",
        "Exposición justificada",
        "Evidencia de controles"
      ],
      "question": "¿El diagrama aprobado prueba el estado desplegado?",
      "answer": "No; es necesario contrastar configuración efectiva y cambios reales.",
      "sourceIds": [
        "pro-wazuh",
        "pro-csf"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "CYB-060",
      "focus": [
        "automatización de controles",
        "calidad de datos",
        "excepciones"
      ],
      "practice": "Construye un reporte local sobre registros sintéticos y revisa manualmente una muestra.",
      "checks": [
        "Reglas versionadas",
        "Falsos positivos medidos",
        "Excepciones investigadas"
      ],
      "question": "¿Automatizar una comprobación errónea mejora la auditoría?",
      "answer": "No; solo reproduce el error más rápido y exige validar datos y reglas.",
      "sourceIds": [
        "pro-wazuh",
        "pro-github"
      ],
      "scopeNote": "Ejercicio solo en sistemas propios, datos sintéticos o laboratorio autorizado. Los recursos citados apoyan el enfoque; no sustituyen una formación completa de la técnica ni la normativa aplicable."
    },
    {
      "id": "ISM-001",
      "focus": [
        "personas y procesos",
        "datos",
        "tecnología y decisiones"
      ],
      "practice": "Describe el sistema de préstamos de una biblioteca incluyendo actividades manuales y digitales.",
      "checks": [
        "Actores identificados",
        "Datos y procesos unidos",
        "Resultados medibles"
      ],
      "question": "¿Un sistema de información es solo una aplicación?",
      "answer": "No; incluye personas, procedimientos, datos y tecnología coordinados para un propósito.",
      "sourceIds": [
        "pro-odoo",
        "pro-camunda"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-002",
      "focus": [
        "situación actual",
        "necesidades",
        "alternativas de solución"
      ],
      "practice": "Analiza retrasos de una mesa de ayuda ficticia y compara automatizar o cambiar el proceso.",
      "checks": [
        "Problema sustentado",
        "Alternativas comparadas",
        "Criterio de selección"
      ],
      "question": "¿Digitalizar un proceso defectuoso garantiza mejorarlo?",
      "answer": "No; puede acelerar errores si no se revisan necesidades, reglas y flujo.",
      "sourceIds": [
        "pro-camunda",
        "pro-odoo"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-003",
      "focus": [
        "eventos BPMN",
        "compuertas",
        "excepciones"
      ],
      "practice": "Modela alta y resolución de una incidencia, incluyendo rechazo y reapertura.",
      "checks": [
        "Inicio y fin claros",
        "Compuertas consistentes",
        "Excepción representada"
      ],
      "question": "¿Una compuerta paralela expresa elegir una única ruta?",
      "answer": "No; representa concurrencia o sincronización, no una decisión exclusiva.",
      "sourceIds": [
        "pro-camunda"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-004",
      "focus": [
        "interesados",
        "problema",
        "valor y criterios de aceptación"
      ],
      "practice": "Construye un mapa de interesados y valida cinco necesidades con un caso simulado.",
      "checks": [
        "Interesados diversos",
        "Necesidades no confundidas con herramientas",
        "Aceptación observable"
      ],
      "question": "¿Solicitar una herramienta identifica necesariamente la necesidad real?",
      "answer": "No; la herramienta es una posible solución y debe contrastarse el problema subyacente.",
      "sourceIds": [
        "pro-camunda",
        "pro-ehu"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-005",
      "focus": [
        "costes",
        "flujo de caja",
        "supuestos financieros"
      ],
      "practice": "Compara dos alternativas TI con costes iniciales y recurrentes ficticios y sensibilidad.",
      "checks": [
        "Unidades y periodos",
        "Costes completos",
        "Supuestos variables"
      ],
      "question": "¿La alternativa de menor precio inicial es siempre la más económica?",
      "answer": "No; importan operación, mantenimiento, riesgos, horizonte y valor temporal cuando corresponda.",
      "sourceIds": [
        "pro-odoo"
      ],
      "scopeNote": "El ERP aporta contexto de procesos; falta curso específico de contabilidad/finanzas y revisión de cálculos. No se ofrece recomendación financiera personal."
    },
    {
      "id": "ISM-006",
      "focus": [
        "roles organizacionales",
        "incentivos",
        "coordinación"
      ],
      "practice": "Rediseña responsabilidades de una mesa de ayuda ficticia y prueba tres casos de conflicto.",
      "checks": [
        "Responsables claros",
        "Escalamiento definido",
        "Incentivos revisados"
      ],
      "question": "¿Asignar una tarea a varias personas garantiza que alguien responda?",
      "answer": "No; deben existir responsabilidad y mecanismos explícitos de coordinación.",
      "sourceIds": [
        "pro-camunda",
        "pro-csf"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-007",
      "focus": [
        "embudo",
        "atribución",
        "medición responsable"
      ],
      "practice": "Define un embudo ficticio de inscripción y calcula conversiones sin identificar personas.",
      "checks": [
        "Denominadores coherentes",
        "Datos mínimos",
        "Sesgos de atribución"
      ],
      "question": "¿Una conversión observada demuestra causalidad de una campaña?",
      "answer": "No; puede estar influida por selección, estacionalidad y otros factores.",
      "sourceIds": [
        "pro-odoo"
      ],
      "scopeNote": "La fuente apoya datos de negocio; completar formación específica de marketing/experimentación. Usar datos sintéticos y criterios de privacidad."
    },
    {
      "id": "ISM-008",
      "focus": [
        "datos maestros",
        "procesos integrados",
        "permisos ERP"
      ],
      "practice": "Simula compra, inventario y venta en un entorno local con datos ficticios.",
      "checks": [
        "Maestros consistentes",
        "Movimiento trazable",
        "Permisos por función"
      ],
      "question": "¿Integrar módulos elimina problemas de calidad de datos?",
      "answer": "No; los errores pueden propagarse entre procesos si faltan validaciones y responsabilidades.",
      "sourceIds": [
        "pro-odoo"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-009",
      "focus": [
        "ciclo de relación",
        "calidad de contactos",
        "consentimiento"
      ],
      "practice": "Diseña un CRM ficticio con etapas de oportunidad y reglas para evitar duplicados.",
      "checks": [
        "Etapas definidas",
        "Duplicados detectados",
        "Acceso y retención"
      ],
      "question": "¿Más contactos almacenados implica mejor relación con clientes?",
      "answer": "No; importan calidad, finalidad, seguimiento útil y uso responsable de los datos.",
      "sourceIds": [
        "pro-odoo"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-010",
      "focus": [
        "demanda",
        "inventario",
        "trazabilidad logística"
      ],
      "practice": "Simula diez pedidos y dos retrasos de proveedor para comparar políticas de reposición.",
      "checks": [
        "Inventario reconciliado",
        "Supuestos de demanda",
        "Retrasos considerados"
      ],
      "question": "¿Reducir inventario siempre reduce el coste total?",
      "answer": "No; puede aumentar faltantes, urgencias y riesgo de interrupción.",
      "sourceIds": [
        "pro-odoo"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-011",
      "focus": [
        "capacidades",
        "procesos y aplicaciones",
        "arquitectura objetivo"
      ],
      "practice": "Relaciona capacidades de una organización ficticia con procesos, datos y aplicaciones.",
      "checks": [
        "Capacidad distinguida de herramienta",
        "Dependencias trazadas",
        "Transición gradual"
      ],
      "question": "¿Arquitectura empresarial equivale al diagrama de servidores?",
      "answer": "No; abarca relación entre estrategia, capacidades, información, aplicaciones y tecnología.",
      "sourceIds": [
        "pro-camunda",
        "pro-csf"
      ],
      "scopeNote": "Las fuentes apoyan procesos y riesgo; falta curso específico de arquitectura empresarial y marcos elegidos. No confundirla con arquitectura de software o ingeniería de sistemas interdisciplinaria."
    },
    {
      "id": "ISM-012",
      "focus": [
        "decisiones TI",
        "responsabilidad",
        "medición de resultados"
      ],
      "practice": "Define quién prioriza inversiones, acepta riesgos y evalúa resultados en un caso ficticio.",
      "checks": [
        "Derechos de decisión",
        "Responsables identificados",
        "Evidencias periódicas"
      ],
      "question": "¿Gobierno y gestión TI son idénticos?",
      "answer": "No; el gobierno dirige y evalúa, mientras la gestión ejecuta y controla operaciones bajo esa dirección.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-013",
      "focus": [
        "servicios",
        "valor",
        "prácticas de gestión"
      ],
      "practice": "Diseña un catálogo de tres servicios con usuarios, resultados y medidas de atención.",
      "checks": [
        "Servicio expresado como resultado",
        "Compromisos medibles",
        "Responsable asignado"
      ],
      "question": "¿Una lista de servidores constituye un catálogo de servicios útil?",
      "answer": "No por sí sola; debe describir resultados, usuarios, condiciones y responsabilidades.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Caso original de gestión de servicios; CSF no es material completo de ITIL ni concede certificación. Comprobar licencia y acceso de los recursos ITIL específicos."
    },
    {
      "id": "ISM-014",
      "focus": [
        "incidentes",
        "problemas",
        "prioridad y escalamiento"
      ],
      "practice": "Clasifica diez tickets ficticios y separa restauración de servicio de análisis de causa.",
      "checks": [
        "Prioridad justificada",
        "Comunicación clara",
        "Problema vinculado"
      ],
      "question": "¿Cerrar un incidente elimina necesariamente su causa?",
      "answer": "No; restaurar servicio y eliminar causa raíz son objetivos diferentes.",
      "sourceIds": [
        "pro-camunda",
        "pro-wazuh"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-015",
      "focus": [
        "activos",
        "relaciones",
        "calidad de CMDB"
      ],
      "practice": "Construye una CMDB pequeña de servicios y activos con cambios y conciliación.",
      "checks": [
        "Identificadores únicos",
        "Relaciones útiles",
        "Actualización verificable"
      ],
      "question": "¿Registrar todos los detalles posibles mejora una CMDB?",
      "answer": "No; datos irrelevantes y desactualizados pueden disminuir su fiabilidad operativa.",
      "sourceIds": [
        "pro-csf",
        "pro-wazuh"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-016",
      "focus": [
        "evaluación del cambio",
        "configuración base",
        "reversión"
      ],
      "practice": "Gestiona un cambio simulado de autenticación incluyendo impacto, autorización y rollback.",
      "checks": [
        "Estado base registrado",
        "Impacto analizado",
        "Reversión ensayada"
      ],
      "question": "¿Un cambio exitoso demuestra ausencia de riesgo?",
      "answer": "No; el resultado observado no elimina riesgos previos ni efectos tardíos.",
      "sourceIds": [
        "pro-github",
        "pro-csf"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-017",
      "focus": [
        "alineación estratégica",
        "portafolio",
        "prioridades"
      ],
      "practice": "Selecciona tres iniciativas TI para objetivos ficticios con restricciones presupuestarias.",
      "checks": [
        "Objetivos trazados",
        "Alternativas excluidas justificadas",
        "Resultados evaluables"
      ],
      "question": "¿Incorporar la tecnología más nueva garantiza alineación estratégica?",
      "answer": "No; debe resolver necesidades y ajustarse a capacidades, costes y riesgos.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-018",
      "focus": [
        "proceso",
        "personas y adopción",
        "medición de transformación"
      ],
      "practice": "Propón transformar una gestión manual y prueba un piloto con un usuario simulado.",
      "checks": [
        "Situación inicial medida",
        "Adopción contemplada",
        "Efecto validable"
      ],
      "question": "¿Comprar software completa una transformación digital?",
      "answer": "No; cambian procesos, responsabilidades, capacidades y formas de medir resultados.",
      "sourceIds": [
        "pro-camunda",
        "pro-odoo"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-019",
      "focus": [
        "requisitos de adquisición",
        "coste total",
        "salida del proveedor"
      ],
      "practice": "Compara dos propuestas ficticias incluyendo interoperabilidad y plan de salida.",
      "checks": [
        "Criterios previos",
        "Costes de ciclo de vida",
        "Exportación de datos"
      ],
      "question": "¿El proveedor más barato siempre minimiza el riesgo?",
      "answer": "No; deben considerarse continuidad, dependencia, cumplimiento y capacidades verificadas.",
      "sourceIds": [
        "pro-csf",
        "pro-odoo"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-020",
      "focus": [
        "conocimiento explícito",
        "comunidades",
        "recuperación y vigencia"
      ],
      "practice": "Crea una base de cinco procedimientos con dueño, fecha de revisión y prueba de búsqueda.",
      "checks": [
        "Procedencia y dueño",
        "Búsqueda útil",
        "Obsolescencia controlada"
      ],
      "question": "¿Guardar documentos equivale a gestionar conocimiento?",
      "answer": "No; deben poder encontrarse, comprenderse, actualizarse y aplicarse en contexto.",
      "sourceIds": [
        "pro-github"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-021",
      "focus": [
        "control interno",
        "segregación de funciones",
        "evidencia"
      ],
      "practice": "Diseña controles para compras ficticias y prueba aprobación y excepción.",
      "checks": [
        "Riesgo vinculado",
        "Funciones separadas",
        "Excepción trazable"
      ],
      "question": "¿Un control existe por estar escrito en una política?",
      "answer": "No; hace falta observar implementación y evidencia suficiente de operación.",
      "sourceIds": [
        "pro-csf"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-022",
      "focus": [
        "hipótesis de cliente",
        "modelo de ingresos",
        "experimento"
      ],
      "practice": "Diseña una propuesta tecnológica ficticia y valida la hipótesis más riesgosa mediante entrevistas simuladas.",
      "checks": [
        "Hipótesis explícita",
        "Costes estimados",
        "Criterio de continuar"
      ],
      "question": "¿Una idea técnicamente factible garantiza un negocio viable?",
      "answer": "No; requiere demanda, operación, recursos y economía coherentes.",
      "sourceIds": [
        "pro-odoo"
      ],
      "scopeNote": "Actividad original de emprendimiento; documentación ERP no constituye un curso completo de creación de empresas ni asesoría financiera."
    },
    {
      "id": "ISM-023",
      "focus": [
        "diseño de servicios",
        "recorrido del usuario",
        "prototipos"
      ],
      "practice": "Modela el recorrido de una solicitud y rediseña dos puntos de espera con un prototipo.",
      "checks": [
        "Experiencia visible",
        "Proceso de soporte",
        "Resultado medido"
      ],
      "question": "¿Mejorar una pantalla basta para mejorar el servicio completo?",
      "answer": "No; también influyen esperas, canales, personas y procesos de soporte.",
      "sourceIds": [
        "pro-camunda",
        "pro-wai"
      ],
      "scopeNote": "Caso simulado con datos ficticios. La guía desarrolla competencias de análisis; los recursos técnicos no equivalen a formación completa en gestión, contabilidad, derecho o certificaciones de servicio."
    },
    {
      "id": "ISM-024",
      "focus": [
        "delegación",
        "retroalimentación",
        "conflicto y aprendizaje"
      ],
      "practice": "Simula una reunión técnica con desacuerdo y redacta una decisión y seguimiento.",
      "checks": [
        "Escucha documentada",
        "Decisión razonada",
        "Responsables y revisión"
      ],
      "question": "¿Liderar implica decidir siempre sin consultar?",
      "answer": "No; debe coordinar contexto, responsabilidades y participación adecuada a la situación.",
      "sourceIds": [
        "pro-ehu",
        "pro-github"
      ],
      "scopeNote": "Caso original de coordinación técnica; completar formación de liderazgo y experiencia con personas reales, sin confundir herramientas colaborativas con competencia directiva."
    },
    {
      "id": "MED-001",
      "focus": [
        "jerarquía visual",
        "contraste",
        "alineación"
      ],
      "practice": "Diseña dos carteles del mismo evento cambiando jerarquía y compara su lectura.",
      "checks": [
        "Mensaje principal claro",
        "Contraste legible",
        "Decisiones justificadas"
      ],
      "question": "¿Más elementos visibles implican mejor información?",
      "answer": "No; la jerarquía ayuda a distinguir prioridades y reduce competencia visual.",
      "sourceIds": [
        "pro-inkscape",
        "pro-gimp"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-002",
      "focus": [
        "formas básicas",
        "proporción",
        "observación"
      ],
      "practice": "Boceta un objeto cotidiano con formas simples y corrige tres diferencias observadas.",
      "checks": [
        "Ejes y proporciones",
        "Variaciones comparadas",
        "Correcciones explicadas"
      ],
      "question": "¿Calcar demuestra por sí solo comprensión de volumen?",
      "answer": "No; la comprensión se contrasta construyendo y variando la forma sin copiarla literalmente.",
      "sourceIds": [
        "pro-inkscape"
      ],
      "scopeNote": "Práctica original de bocetaje; el tutorial vectorial apoya herramientas, no sustituye un curso de dibujo observacional ni crítica de un docente."
    },
    {
      "id": "MED-003",
      "focus": [
        "tono y luminosidad",
        "saturación",
        "contraste de color"
      ],
      "practice": "Crea una paleta y comprueba que su información siga entendible en escala de grises.",
      "checks": [
        "Roles de color",
        "Contraste comprobado",
        "Significado no solo cromático"
      ],
      "question": "¿Dos colores de tono distinto tienen siempre suficiente contraste?",
      "answer": "No; su luminosidad y contexto pueden hacerlos difíciles de distinguir.",
      "sourceIds": [
        "pro-gimp",
        "pro-wai"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-004",
      "focus": [
        "retícula",
        "márgenes",
        "ritmo y agrupación"
      ],
      "practice": "Compón una página informativa con retícula y prueba dos tamaños de pantalla o papel.",
      "checks": [
        "Alineación consistente",
        "Espaciado funcional",
        "Orden de lectura"
      ],
      "question": "¿Usar retícula obliga a hacer todas las páginas iguales?",
      "answer": "No; establece relaciones que permiten variar composición manteniendo coherencia.",
      "sourceIds": [
        "pro-inkscape",
        "pro-wai"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-005",
      "focus": [
        "familias tipográficas",
        "legibilidad",
        "jerarquía de texto"
      ],
      "practice": "Diseña títulos, subtítulos y cuerpo para una ficha y prueba lectura a tamaño real.",
      "checks": [
        "Jerarquía reconocible",
        "Cuerpo legible",
        "Fuente con licencia"
      ],
      "question": "¿Una fuente decorativa funciona igual en cuerpo y título?",
      "answer": "No; la función, tamaño y densidad condicionan su legibilidad.",
      "sourceIds": [
        "pro-inkscape",
        "pro-wai"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-006",
      "focus": [
        "espaciado",
        "interlineado",
        "composición avanzada"
      ],
      "practice": "Compara tres ajustes tipográficos en una columna larga y documenta su efecto.",
      "checks": [
        "Líneas sin colisiones",
        "Ritmo consistente",
        "Prueba a tamaño final"
      ],
      "question": "¿Justificar texto siempre mejora la lectura?",
      "answer": "No; puede introducir espacios irregulares y necesita ajuste según ancho y composición.",
      "sourceIds": [
        "pro-inkscape"
      ],
      "scopeNote": "Guía de práctica tipográfica; falta material específico de métricas, OpenType y composición editorial avanzada. No se atribuye esa profundidad al tutorial básico."
    },
    {
      "id": "MED-007",
      "focus": [
        "identidad",
        "consistencia",
        "aplicaciones de marca"
      ],
      "practice": "Crea una identidad ficticia con símbolo, tipografía y tres aplicaciones contrastadas.",
      "checks": [
        "Sistema coherente",
        "Versiones claras",
        "Usos incorrectos definidos"
      ],
      "question": "¿Un logotipo equivale a toda una identidad?",
      "answer": "No; la identidad incluye reglas, mensajes, aplicaciones y experiencia consistente.",
      "sourceIds": [
        "pro-inkscape",
        "pro-gimp"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-008",
      "focus": [
        "estructura editorial",
        "estilos",
        "secuencia de lectura"
      ],
      "practice": "Maqueta un folleto original de ocho páginas con estilos consistentes y navegación.",
      "checks": [
        "Páginas coherentes",
        "Jerarquía constante",
        "Exportación revisada"
      ],
      "question": "¿Cambiar manualmente cada título es un sistema de estilos?",
      "answer": "No; dificulta consistencia y mantenimiento cuando cambia la publicación.",
      "sourceIds": [
        "pro-inkscape"
      ],
      "scopeNote": "Práctica de estructura editorial; falta fuente específica de maquetación multipágina. Inkscape no se presenta como reemplazo íntegro de InDesign/Publisher."
    },
    {
      "id": "MED-009",
      "focus": [
        "datos y mensaje",
        "codificación visual",
        "escala y contexto"
      ],
      "practice": "Convierte una tabla sintética en infografía y contrasta posibles interpretaciones erróneas.",
      "checks": [
        "Escalas declaradas",
        "Datos trazables",
        "Mensaje no engañoso"
      ],
      "question": "¿Un gráfico atractivo demuestra que sus datos están bien representados?",
      "answer": "No; debe comprobarse escala, selección, denominadores y contexto.",
      "sourceIds": [
        "pro-inkscape",
        "pro-wai"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-010",
      "focus": [
        "audiencia",
        "propuesta",
        "composición persuasiva"
      ],
      "practice": "Diseña un anuncio ficticio y justifica mensaje, medio y llamada a la acción.",
      "checks": [
        "Audiencia definida",
        "Afirmaciones sustentadas",
        "Lectura comprobada"
      ],
      "question": "¿Persuadir permite exagerar datos sin evidencia?",
      "answer": "No; la claridad y responsabilidad exigen distinguir hechos, promesas y opinión.",
      "sourceIds": [
        "pro-inkscape",
        "pro-gimp"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-011",
      "focus": [
        "componentes",
        "estados",
        "accesibilidad de interfaz"
      ],
      "practice": "Diseña una pantalla de préstamo con estados vacío, carga, error y éxito.",
      "checks": [
        "Estados completos",
        "Controles distinguibles",
        "Foco y etiquetas"
      ],
      "question": "¿Diseñar solo el estado ideal cubre una interfaz?",
      "answer": "No; errores, espera, límites y recuperación forman parte del uso real.",
      "sourceIds": [
        "pro-mdn",
        "pro-wai"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-012",
      "focus": [
        "tokens",
        "componentes",
        "documentación de decisiones"
      ],
      "practice": "Construye un pequeño sistema visual y úsalo en dos pantallas distintas.",
      "checks": [
        "Tokens reutilizados",
        "Variantes documentadas",
        "Consistencia comprobada"
      ],
      "question": "¿Un catálogo de colores es un sistema de diseño completo?",
      "answer": "No; faltan componentes, reglas, estados, accesibilidad y criterios de uso.",
      "sourceIds": [
        "pro-mdn",
        "pro-wai"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-013",
      "focus": [
        "rutas vectoriales",
        "operaciones booleanas",
        "exportación"
      ],
      "practice": "Dibuja un icono escalable en Inkscape y expórtalo para pantalla e impresión.",
      "checks": [
        "Rutas editables",
        "Escala sin degradación",
        "Exportación comparada"
      ],
      "question": "¿Un SVG es siempre un dibujo puramente vectorial?",
      "answer": "No; puede contener imágenes raster y otros elementos que deben inspeccionarse.",
      "sourceIds": [
        "pro-inkscape"
      ],
      "scopeNote": "Alternativa gratuita para conceptos vectoriales; no curso de funciones específicas de Illustrator/Corel ni licencia de esos programas."
    },
    {
      "id": "MED-014",
      "focus": [
        "capas",
        "máscaras",
        "edición reversible"
      ],
      "practice": "Compón dos fotografías propias usando máscaras y conserva el archivo editable.",
      "checks": [
        "Capas nombradas",
        "Máscaras no destructivas",
        "Fuente y exportación"
      ],
      "question": "¿Borrar píxeles es equivalente a ocultarlos con máscara?",
      "answer": "No; la máscara permite revisar el recorte sin destruir los datos originales.",
      "sourceIds": [
        "pro-gimp"
      ],
      "scopeNote": "GIMP es una alternativa para técnicas raster; no se afirma equivalencia íntegra de herramientas con Photoshop o Affinity."
    },
    {
      "id": "MED-015",
      "focus": [
        "documentos largos",
        "estilos",
        "preparación de publicación"
      ],
      "practice": "Planifica una revista breve con páginas maestras y comprueba coherencia de estilos en un prototipo.",
      "checks": [
        "Estilos definidos",
        "Secuencia coherente",
        "Salida revisada"
      ],
      "question": "¿Un PDF correcto a simple vista garantiza que el documento sea editable y accesible?",
      "answer": "No; también importan estructura, fuentes, etiquetas y archivos fuente.",
      "sourceIds": [
        "pro-wai",
        "pro-inkscape"
      ],
      "scopeNote": "Ejercicio de planificación editorial; falta tutorial específico de InDesign/Publisher o una alternativa multipágina libre, además de comprobar licencias."
    },
    {
      "id": "MED-016",
      "focus": [
        "resolución",
        "perfiles de color",
        "sangrado y prueba"
      ],
      "practice": "Prepara una imagen para pantalla y otra para impresión con especificaciones explícitas.",
      "checks": [
        "Tamaño y resolución",
        "Perfil documentado",
        "Prueba de salida"
      ],
      "question": "¿Asignar un perfil y convertir a un perfil son lo mismo?",
      "answer": "No; una operación interpreta valores y la otra transforma la representación para otro espacio.",
      "sourceIds": [
        "pro-gimp",
        "pro-inkscape"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-017",
      "focus": [
        "fotogramas clave",
        "curvas",
        "ritmo visual"
      ],
      "practice": "Anima una cabecera con entrada, pausa y salida justificadas por la lectura.",
      "checks": [
        "Tiempo legible",
        "Trayectoria controlada",
        "Exportación reproducible"
      ],
      "question": "¿Más movimiento aumenta siempre la claridad?",
      "answer": "No; el movimiento debe orientar atención y respetar la lectura y el propósito.",
      "sourceIds": [
        "pro-davinci",
        "pro-blender"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-018",
      "focus": [
        "modelado",
        "materiales",
        "iluminación y cámara"
      ],
      "practice": "Construye una escena3D simple con dos materiales e ilumínala para comunicar su forma.",
      "checks": [
        "Geometría limpia",
        "Luz deliberada",
        "Render comparado"
      ],
      "question": "¿El material puede evaluarse independientemente de la iluminación?",
      "answer": "Solo de forma limitada; luz, entorno y visualización afectan su apariencia.",
      "sourceIds": [
        "pro-blender"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-019",
      "focus": [
        "exposición",
        "encuadre",
        "profundidad y movimiento"
      ],
      "practice": "Fotografía el mismo objeto con tres exposiciones o modos y compara detalle y movimiento.",
      "checks": [
        "Metadatos registrados",
        "Variación controlada",
        "Comparación visual"
      ],
      "question": "¿Una imagen más luminosa conserva necesariamente más detalle?",
      "answer": "No; puede perder información en altas luces o introducir ruido según captura y procesado.",
      "sourceIds": [
        "pro-gimp"
      ],
      "scopeNote": "Práctica original con cámara propia; GIMP apoya análisis posterior. Falta curso específico de captura, triángulo de exposición y óptica fotográfica."
    },
    {
      "id": "MED-020",
      "focus": [
        "dirección de luz",
        "suavidad",
        "relación sujeto-fondo"
      ],
      "practice": "Fotografía un objeto con luz de ventana desde tres direcciones sin modificar instalaciones eléctricas.",
      "checks": [
        "Dirección anotada",
        "Sombras comparadas",
        "Exposición consistente"
      ],
      "question": "¿Cambiar dirección de luz altera solo el brillo?",
      "answer": "No; también modifica sombras, textura percibida y lectura del volumen.",
      "sourceIds": [
        "pro-gimp"
      ],
      "scopeNote": "Práctica segura con luz disponible. Falta formación específica de iluminación, equipos y seguridad de estudio; no se enseña cableado ni manipulación eléctrica."
    },
    {
      "id": "MED-021",
      "focus": [
        "contexto",
        "selección",
        "ética documental"
      ],
      "practice": "Realiza una serie de cinco imágenes propias de un lugar permitido con pies verificables.",
      "checks": [
        "Contexto preservado",
        "Selección explicada",
        "Consentimientos necesarios"
      ],
      "question": "¿Un encuadre puede cambiar la interpretación de un hecho?",
      "answer": "Sí; selecciona información, por lo que contexto y transparencia son esenciales.",
      "sourceIds": [
        "pro-cine",
        "pro-cc"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-022",
      "focus": [
        "objetivo comercial",
        "textura y forma",
        "consistencia"
      ],
      "practice": "Crea una serie de producto ficticio con fondo y luz coherentes y compara tres tomas.",
      "checks": [
        "Producto representado fielmente",
        "Color controlado",
        "Serie consistente"
      ],
      "question": "¿Retoque comercial permite ocultar cualquier defecto relevante?",
      "answer": "No; deben respetarse finalidad, veracidad y requisitos del encargo.",
      "sourceIds": [
        "pro-gimp"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-023",
      "focus": [
        "balance de blancos",
        "rango tonal",
        "gestión de color"
      ],
      "practice": "Procesa un archivo propio conservando original y compara dos interpretaciones de color.",
      "checks": [
        "Original conservado",
        "Ajustes documentados",
        "Exportación con perfil"
      ],
      "question": "¿El revelado digital recupera cualquier información recortada en captura?",
      "answer": "No; no puede recrear con certeza información que no fue registrada.",
      "sourceIds": [
        "pro-gimp"
      ],
      "scopeNote": "GIMP apoya edición y color; un flujo RAW completo necesita revelador específico y formación adicional. No se verificó aquí un curso completo de revelado profesional."
    },
    {
      "id": "MED-024",
      "focus": [
        "historia del cine",
        "lenguaje audiovisual",
        "contexto de producción"
      ],
      "practice": "Analiza dos secuencias permitidas de épocas distintas y relaciona técnica y contexto.",
      "checks": [
        "Fuentes citadas",
        "Observación separada de juicio",
        "Comparación sustentada"
      ],
      "question": "¿Una técnica tiene el mismo significado en cualquier época?",
      "answer": "No; convenciones y contexto de producción y recepción influyen en su lectura.",
      "sourceIds": [
        "pro-cine"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-025",
      "focus": [
        "conflicto",
        "estructura",
        "guion literario y técnico"
      ],
      "practice": "Escribe una escena de un minuto y conviértela en lista de planos.",
      "checks": [
        "Acción filmable",
        "Continuidad comprensible",
        "Planos sirven al relato"
      ],
      "question": "¿Una idea general es ya un guion listo para rodar?",
      "answer": "No; necesita acciones, relaciones y decisiones suficientes para organizar la realización.",
      "sourceIds": [
        "pro-cine"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-026",
      "focus": [
        "puesta en escena",
        "dirección de interpretación",
        "continuidad"
      ],
      "practice": "Graba una conversación ficticia con dos enfoques de puesta en escena y compara su efecto.",
      "checks": [
        "Intención definida",
        "Continuidad controlada",
        "Comparación argumentada"
      ],
      "question": "¿Dirigir consiste solo en elegir encuadres?",
      "answer": "No; coordina actuación, espacio, tiempo y recursos en función del relato.",
      "sourceIds": [
        "pro-cine"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-027",
      "focus": [
        "desglose",
        "plan de rodaje",
        "riesgos y recursos"
      ],
      "practice": "Prepara un rodaje pequeño con horarios, permisos y alternativas por imprevisto.",
      "checks": [
        "Recursos identificados",
        "Cronograma viable",
        "Contingencias previstas"
      ],
      "question": "¿Un guion aprobado garantiza viabilidad de producción?",
      "answer": "No; hay que contrastar recursos, permisos, tiempos y condiciones de realización.",
      "sourceIds": [
        "pro-cine"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-028",
      "focus": [
        "óptica",
        "movimiento de cámara",
        "continuidad visual"
      ],
      "practice": "Rueda una acción cotidiana con tres planos y justifica focal, posición y movimiento.",
      "checks": [
        "Acción comprensible",
        "Continuidad espacial",
        "Parámetros registrados"
      ],
      "question": "¿Mover la cámara siempre añade información útil?",
      "answer": "No; debe responder a intención narrativa y facilitar la comprensión del espacio.",
      "sourceIds": [
        "pro-cine"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-029",
      "focus": [
        "esquema lumínico",
        "exposición",
        "continuidad de luz"
      ],
      "practice": "Planifica una escena con luz disponible y registra cómo mantener continuidad entre planos.",
      "checks": [
        "Mapa de luz",
        "Exposición consistente",
        "Alternativa segura"
      ],
      "question": "¿Igualar el brillo basta para igualar dos planos?",
      "answer": "No; dirección, contraste, color y sombras también deben considerarse.",
      "sourceIds": [
        "pro-cine",
        "pro-davinci"
      ],
      "scopeNote": "Introducción con luz disponible. Formación avanzada de iluminación y manejo de equipos requiere práctica y seguridad específica; no manipular instalaciones eléctricas."
    },
    {
      "id": "MED-030",
      "focus": [
        "captura de voz",
        "ruido",
        "mezcla y nivel"
      ],
      "practice": "Graba una narración propia y mezcla voz y ambiente sin saturación.",
      "checks": [
        "Voz inteligible",
        "Picos controlados",
        "Fuente y mezcla conservadas"
      ],
      "question": "¿Normalizar elimina ruido y mejora cualquier grabación?",
      "answer": "No; cambia el nivel global y puede elevar también el ruido existente.",
      "sourceIds": [
        "pro-davinci"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-031",
      "focus": [
        "selección de tomas",
        "montaje",
        "ritmo y exportación"
      ],
      "practice": "Edita un video de un minuto con medios propios y una versión alternativa de ritmo.",
      "checks": [
        "Historia comprensible",
        "Cortes justificados",
        "Exportación reproducible"
      ],
      "question": "¿Una transición llamativa mejora necesariamente un corte?",
      "answer": "No; puede distraer y debe justificarse por continuidad o intención expresiva.",
      "sourceIds": [
        "pro-kdenlive",
        "pro-davinci"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-032",
      "focus": [
        "corrección primaria",
        "igualación",
        "gradación creativa"
      ],
      "practice": "Iguala tres planos y crea una variante estética conservando una referencia neutra.",
      "checks": [
        "Balance coherente",
        "Detalle preservado",
        "Decisiones comparables"
      ],
      "question": "¿Corrección y gradación son idénticas?",
      "answer": "No; corregir busca consistencia técnica, mientras graduar también construye una intención estética.",
      "sourceIds": [
        "pro-davinci"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-033",
      "focus": [
        "composición por capas",
        "máscaras",
        "seguimiento"
      ],
      "practice": "Inserta un gráfico propio en una toma permitida y prueba oclusión y movimiento.",
      "checks": [
        "Perspectiva coherente",
        "Bordes revisados",
        "Seguimiento estable"
      ],
      "question": "¿Un recorte correcto en un fotograma garantiza toda la toma?",
      "answer": "No; hay que revisar movimiento, oclusiones y cambios de iluminación durante el plano.",
      "sourceIds": [
        "pro-davinci",
        "pro-blender"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-034",
      "focus": [
        "poses clave",
        "interpolación",
        "principios de movimiento"
      ],
      "practice": "Anima una pelota dibujada con anticipación, contacto y recuperación.",
      "checks": [
        "Poses legibles",
        "Tiempo consistente",
        "Ciclo sin saltos"
      ],
      "question": "¿Interpolar automáticamente produce siempre movimiento convincente?",
      "answer": "No; necesita control de poses, ritmo y relaciones físicas o expresivas.",
      "sourceIds": [
        "pro-blender"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-035",
      "focus": [
        "topología",
        "rigging",
        "animación y render"
      ],
      "practice": "Modela un personaje simple, crea controles básicos y entrega una acción corta.",
      "checks": [
        "Topología deformable",
        "Controles comprobados",
        "Animación reproducible"
      ],
      "question": "¿Más polígonos garantizan mejor deformación?",
      "answer": "No; la distribución y el diseño de la malla influyen más que el número aislado.",
      "sourceIds": [
        "pro-blender"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-036",
      "focus": [
        "investigación documental",
        "entrevista",
        "montaje responsable"
      ],
      "practice": "Realiza un microdocumental de un proceso permitido con fuentes y consentimientos.",
      "checks": [
        "Hechos contrastados",
        "Consentimiento registrado",
        "Edición contextualizada"
      ],
      "question": "¿Eliminar contexto de una respuesta puede alterar su sentido?",
      "answer": "Sí; el montaje debe revisarse para no atribuir afirmaciones que el testimonio no sostiene.",
      "sourceIds": [
        "pro-cine",
        "pro-cc"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-037",
      "focus": [
        "escenas y fuentes",
        "audio",
        "grabación y emisión"
      ],
      "practice": "Crea una realización local de dos fuentes y ensaya cambios de escena sin transmitir públicamente.",
      "checks": [
        "Fuentes identificadas",
        "Audio sincronizado",
        "Grabación de prueba revisada"
      ],
      "question": "¿Una previsualización fluida garantiza una emisión sin pérdidas?",
      "answer": "No; también influyen codificación, recursos, red y plataforma de destino.",
      "sourceIds": [
        "pro-obs"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-038",
      "focus": [
        "organización de medios",
        "metadatos",
        "preservación y recuperación"
      ],
      "practice": "Archiva un proyecto con manifiesto de archivos y restaura una copia en otra carpeta.",
      "checks": [
        "Medios completos",
        "Huellas o tamaños comprobados",
        "Proyecto abre restaurado"
      ],
      "question": "¿Guardar solo el video exportado preserva todo el proyecto?",
      "answer": "No; pueden perderse fuentes, decisiones de edición, licencias y capacidad de revisión.",
      "sourceIds": [
        "pro-kdenlive",
        "pro-obs"
      ],
      "scopeNote": "Práctica original con medios propios o licenciados. Los manuales apoyan herramientas y flujo; falta contraste docente de decisiones visuales y no sustituyen formación artística completa ni licencias de software comercial."
    },
    {
      "id": "MED-039",
      "focus": [
        "autoría",
        "licencias",
        "atribución y derechos relacionados"
      ],
      "practice": "Crea una hoja de créditos para cinco recursos con permisos diferentes y justifica su uso.",
      "checks": [
        "Autor y origen",
        "Licencia identificada",
        "Cambios declarados"
      ],
      "question": "¿Encontrar una imagen en Internet concede permiso de reutilización?",
      "answer": "No; hay que comprobar derechos, licencia y condiciones del uso previsto.",
      "sourceIds": [
        "pro-cc"
      ],
      "scopeNote": "Referencia general de licencias; no asesoría jurídica. Derechos de imagen, música, marcas y contratos requieren comprobación propia según jurisdicción y proyecto."
    },
    {
      "id": "GXR-001",
      "focus": [
        "transformaciones",
        "pipeline gráfico",
        "representación de geometría"
      ],
      "practice": "Dibuja un triángulo y transforma sus vértices con matrices que puedas explicar.",
      "checks": [
        "Coordenadas identificadas",
        "Transformación comprobada",
        "Código reproducible"
      ],
      "question": "¿La misma matriz representa igual una transformación en cualquier convención?",
      "answer": "No; importan orden, sistema de coordenadas y convención de multiplicación.",
      "sourceIds": [
        "pro-opengl"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-002",
      "focus": [
        "iluminación",
        "visibilidad",
        "muestreo"
      ],
      "practice": "Implementa una escena pequeña y compara iluminación simple con una referencia física.",
      "checks": [
        "Modelo declarado",
        "Errores comparados",
        "Parámetros reproducibles"
      ],
      "question": "¿Más muestras eliminan todos los errores de una imagen?",
      "answer": "No; reducen ciertos errores de muestreo, pero no errores del modelo o implementación.",
      "sourceIds": [
        "pro-pbrt",
        "pro-opengl"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-003",
      "focus": [
        "intersecciones",
        "estructuras espaciales",
        "casos degenerados"
      ],
      "practice": "Prueba intersecciones de rayos con triángulos normales y casos límite documentados.",
      "checks": [
        "Casos límite incluidos",
        "Precisión analizada",
        "Resultado contrastado"
      ],
      "question": "¿La aritmética flotante decide siempre geometría exacta?",
      "answer": "No; redondeo y casos degenerados pueden exigir tolerancias o técnicas robustas.",
      "sourceIds": [
        "pro-pbrt"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-004",
      "focus": [
        "presupuesto de frame",
        "visibilidad",
        "calidad y coste"
      ],
      "practice": "Mide tiempo por fotograma en una escena y compara dos niveles de detalle.",
      "checks": [
        "Escena fija",
        "Distribución de tiempos",
        "Calidad comparada"
      ],
      "question": "¿FPS promedio describe completamente la fluidez?",
      "answer": "No; oculta variaciones y fotogramas lentos que afectan experiencia.",
      "sourceIds": [
        "pro-opengl",
        "pro-unity"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-005",
      "focus": [
        "etapas de shader",
        "espacios de coordenadas",
        "materiales"
      ],
      "practice": "Escribe un shader simple y compara sus salidas con entradas controladas.",
      "checks": [
        "Espacios consistentes",
        "Parámetros comprobados",
        "Resultado explicado"
      ],
      "question": "¿Un normal transformado como posición conserva siempre su sentido?",
      "answer": "No; su transformación depende de la matriz y necesita tratarse apropiadamente.",
      "sourceIds": [
        "pro-opengl"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-006",
      "focus": [
        "interpolación",
        "jerarquías",
        "animación por clave"
      ],
      "practice": "Anima una jerarquía de objetos y compara interpolación lineal con una curva ajustada.",
      "checks": [
        "Pivotes correctos",
        "Tiempo estable",
        "Transiciones revisadas"
      ],
      "question": "¿Mover el objeto padre equivale a mover cada hijo en su espacio local?",
      "answer": "No; la jerarquía compone transformaciones y cambia cómo se interpreta el movimiento.",
      "sourceIds": [
        "pro-blender"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-007",
      "focus": [
        "integración temporal",
        "colisiones",
        "estabilidad"
      ],
      "practice": "Simula una pelota con dos pasos temporales y compara trayectoria y error acumulado.",
      "checks": [
        "Unidades coherentes",
        "Paso temporal declarado",
        "Error comparado"
      ],
      "question": "¿Reducir el paso temporal garantiza corregir un modelo físico equivocado?",
      "answer": "No; mejora aproximación numérica de ese modelo, no su validez física.",
      "sourceIds": [
        "pro-godot",
        "pro-unity"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-008",
      "focus": [
        "reglas",
        "retroalimentación",
        "equilibrio y prueba"
      ],
      "practice": "Diseña un juego de una mecánica y revisa tres sesiones de prueba voluntarias.",
      "checks": [
        "Reglas comprensibles",
        "Objetivo observable",
        "Cambios ligados a evidencia"
      ],
      "question": "¿Añadir mecánicas mejora necesariamente un juego?",
      "answer": "No; puede aumentar confusión sin aportar decisiones o experiencia significativa.",
      "sourceIds": [
        "pro-godot",
        "pro-unity"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-009",
      "focus": [
        "bucle de juego",
        "estado",
        "entrada y eventos"
      ],
      "practice": "Construye un juego2D con inicio, pausa, derrota y reinicio deterministas.",
      "checks": [
        "Estados completos",
        "Entrada consistente",
        "Reinicio limpio"
      ],
      "question": "¿La lógica debe depender siempre de los FPS?",
      "answer": "No; movimiento y simulación necesitan una referencia temporal adecuada.",
      "sourceIds": [
        "pro-godot"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-010",
      "focus": [
        "subsistemas",
        "recursos",
        "arquitectura de escena"
      ],
      "practice": "Diseña un motor educativo mínimo que separe entrada, actualización y presentación.",
      "checks": [
        "Interfaces claras",
        "Recursos liberados",
        "Escena reproducible"
      ],
      "question": "¿Un motor debe implementar todas las funciones de un motor comercial?",
      "answer": "No; su alcance debe justificarse por objetivos y restricciones del proyecto.",
      "sourceIds": [
        "pro-opengl",
        "pro-godot"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-011",
      "focus": [
        "editor Unity",
        "componentes",
        "scripting y física"
      ],
      "practice": "Completa un prototipo3D y modifica una regla para demostrar comprensión del proyecto.",
      "checks": [
        "Escena reproducible",
        "Cambio propio probado",
        "Dependencias registradas"
      ],
      "question": "¿Completar un tutorial copiando código demuestra dominio independiente?",
      "answer": "No; debe poder modificarse, explicarse y resolver fallos nuevos.",
      "sourceIds": [
        "pro-unity"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-012",
      "focus": [
        "Unreal Editor",
        "Blueprints",
        "empaquetado"
      ],
      "practice": "Crea un pequeño nivel con interacción y entrégalo empaquetado para un objetivo compatible.",
      "checks": [
        "Interacción funcional",
        "Proyecto empaquetado",
        "Requisitos documentados"
      ],
      "question": "¿Que funcione en el editor garantiza que funcione empaquetado?",
      "answer": "No; recursos, configuración y plataforma pueden cambiar el resultado.",
      "sourceIds": [
        "pro-unreal"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-013",
      "focus": [
        "escenas y nodos",
        "señales",
        "exportación"
      ],
      "practice": "Construye el primer juego2D y añade un tipo de enemigo con comportamiento propio.",
      "checks": [
        "Escena reutilizable",
        "Señales limpias",
        "Exportación probada"
      ],
      "question": "¿Una escena en Godot es solo una imagen visible?",
      "answer": "No; es una composición de nodos con comportamiento, datos y relaciones.",
      "sourceIds": [
        "pro-godot"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-014",
      "focus": [
        "máquinas de estados",
        "búsqueda de rutas",
        "decisión de agentes"
      ],
      "practice": "Añade un agente simulado con patrulla, seguimiento y retorno, usando pruebas de transición.",
      "checks": [
        "Estados definidos",
        "Rutas sin bloqueo",
        "Transiciones comprobadas"
      ],
      "question": "¿Un agente con aprendizaje automático es siempre mejor que reglas simples?",
      "answer": "No; deben compararse requisitos, coste, control y resultado del comportamiento.",
      "sourceIds": [
        "pro-godot"
      ],
      "scopeNote": "Godot introductorio apoya estructura del juego; completar materiales específicos de navegación, planificación y técnicas de IA según el agente elegido."
    },
    {
      "id": "GXR-015",
      "focus": [
        "sincronización",
        "autoridad",
        "latencia"
      ],
      "practice": "Simula dos clientes locales y prueba mensajes tardíos y duplicados sin servicio público.",
      "checks": [
        "Autoridad definida",
        "Duplicados controlados",
        "Latencia registrada"
      ],
      "question": "¿Confiar en el cliente simplifica sin coste la lógica multijugador?",
      "answer": "No; puede producir inconsistencias y permitir acciones no autorizadas.",
      "sourceIds": [
        "pro-asvs",
        "pro-godot"
      ],
      "scopeNote": "Práctica de diseño y simulación; falta tutorial específico de red del motor. No se afirma que el juego2D introductorio cubra multijugador completo."
    },
    {
      "id": "GXR-016",
      "focus": [
        "eventos de audio",
        "espacialización",
        "mezcla interactiva"
      ],
      "practice": "Relaciona sonidos propios con estados de un juego y compara posiciones y niveles.",
      "checks": [
        "Eventos sin repetición indebida",
        "Mezcla legible",
        "Licencias registradas"
      ],
      "question": "¿Reproducir todos los sonidos al volumen máximo mejora claridad?",
      "answer": "No; compiten entre sí y pueden ocultar información relevante.",
      "sourceIds": [
        "pro-godot",
        "pro-davinci"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-017",
      "focus": [
        "perfilado",
        "recursos",
        "compatibilidad de plataforma"
      ],
      "practice": "Mide carga y memoria del mismo prototipo y modifica un cuello de botella comprobado.",
      "checks": [
        "Medición antes/después",
        "Misma escena y equipo",
        "Regresiones revisadas"
      ],
      "question": "¿Optimizar código no medido mejora necesariamente el rendimiento relevante?",
      "answer": "No; puede no afectar al cuello de botella y perjudicar claridad o corrección.",
      "sourceIds": [
        "pro-unity",
        "pro-opengl"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-018",
      "focus": [
        "alcance de producción",
        "coste",
        "distribución y mantenimiento"
      ],
      "practice": "Planifica un juego pequeño con presupuesto ficticio, hitos y soporte posterior.",
      "checks": [
        "Costes completos",
        "Riesgos priorizados",
        "Criterio de cancelación"
      ],
      "question": "¿Terminar el ejecutable termina todo el trabajo de producción?",
      "answer": "No; pueden quedar distribución, accesibilidad, soporte, licencias y mantenimiento.",
      "sourceIds": [
        "pro-unity",
        "pro-cc"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-019",
      "focus": [
        "presencia",
        "interacción espacial",
        "restricciones perceptivas"
      ],
      "practice": "Diseña una experiencia XR en papel y prueba su flujo sin exigir un visor.",
      "checks": [
        "Interacción comprensible",
        "Límites de uso",
        "Alternativa no inmersiva"
      ],
      "question": "¿Trasladar una interfaz2D al espacio3D garantiza una buena experiencia?",
      "answer": "No; profundidad, alcance, entrada y percepción introducen problemas nuevos.",
      "sourceIds": [
        "pro-unreal",
        "pro-wai"
      ],
      "scopeNote": "Introducción de diseño; falta formación específica XR y pruebas con dispositivos y usuarios bajo condiciones adecuadas. No se hacen afirmaciones médicas sobre comodidad."
    },
    {
      "id": "GXR-020",
      "focus": [
        "escala espacial",
        "seguimiento",
        "interacción VR"
      ],
      "practice": "Construye una escena virtual de prueba y compara dos métodos de selección en simulación.",
      "checks": [
        "Escala coherente",
        "Acciones reversibles",
        "Métodos comparados"
      ],
      "question": "¿La posición gráfica del usuario es necesariamente su posición física exacta?",
      "answer": "No; depende de seguimiento, calibración y transformaciones aplicadas.",
      "sourceIds": [
        "pro-unreal"
      ],
      "scopeNote": "La guía general del motor no cubre toda la VR. Completar documentación del dispositivo, sistema XR y evaluación supervisada de interacción."
    },
    {
      "id": "GXR-021",
      "focus": [
        "registro espacial",
        "anclajes",
        "oclusiones"
      ],
      "practice": "Prototipa una superposición sobre una imagen de prueba y registra sus errores de alineación.",
      "checks": [
        "Referencia conocida",
        "Error medido",
        "Fallo de seguimiento visible"
      ],
      "question": "¿Detectar un marcador una vez garantiza registro permanente?",
      "answer": "No; seguimiento, iluminación y movimiento pueden deteriorar la alineación.",
      "sourceIds": [
        "pro-unity"
      ],
      "scopeNote": "Actividad introductoria y simulada; falta curso concreto de AR y plataforma elegida. No requiere capturar datos de terceros ni lugares privados."
    },
    {
      "id": "GXR-022",
      "focus": [
        "mapa espacial",
        "fusión de entradas",
        "persistencia de anclajes"
      ],
      "practice": "Modela una experiencia mixta con dos usuarios simulados y analiza marcos de coordenadas.",
      "checks": [
        "Marcos identificados",
        "Conflictos previstos",
        "Persistencia delimitada"
      ],
      "question": "¿Dos usuarios observan automáticamente el mismo origen espacial?",
      "answer": "No; se necesita alinear referencias y gestionar incertidumbre y permisos.",
      "sourceIds": [
        "pro-unreal",
        "pro-unity"
      ],
      "scopeNote": "Las fuentes del motor apoyan implementación general, no una formación completa en computación espacial ni calibración de hardware específico."
    },
    {
      "id": "GXR-023",
      "focus": [
        "afordancias espaciales",
        "retroalimentación",
        "accesibilidad XR"
      ],
      "practice": "Diseña selección, cancelación y recuperación con opciones para distintas capacidades de entrada.",
      "checks": [
        "Acciones distinguibles",
        "Cancelación disponible",
        "Alternativas de entrada"
      ],
      "question": "¿Una interacción intuitiva para un usuario lo será para todos?",
      "answer": "No; capacidades, experiencia y dispositivos varían y deben evaluarse con usuarios diversos.",
      "sourceIds": [
        "pro-wai",
        "pro-unreal"
      ],
      "scopeNote": "Prototipo educativo y medición reproducible. Documentación de motores apoya implementación; no cubre toda la teoría, hardware especializado o validación de la disciplina."
    },
    {
      "id": "GXR-024",
      "focus": [
        "señales hápticas",
        "sincronización",
        "límites del dispositivo"
      ],
      "practice": "Simula patrones de respuesta y justifica cuándo la señal aporta información frente a sonido o imagen.",
      "checks": [
        "Patrones distinguibles",
        "Tiempo documentado",
        "Alternativa no háptica"
      ],
      "question": "¿Mayor intensidad siempre transmite mejor información?",
      "answer": "No; importan discriminación, contexto y límites seguros del dispositivo.",
      "sourceIds": [
        "pro-unreal",
        "pro-wai"
      ],
      "scopeNote": "Práctica conceptual sin construir actuadores ni aplicarlos al cuerpo. Falta formación de interfaces hápticas, hardware y validación especializada."
    },
    {
      "id": "GXR-025",
      "focus": [
        "cámara virtual",
        "sincronización",
        "calibración de escenario"
      ],
      "practice": "Diseña un escenario virtual simulado y documenta requisitos para integrarlo con una cámara real.",
      "checks": [
        "Espacios coherentes",
        "Sincronización especificada",
        "Limitaciones identificadas"
      ],
      "question": "¿Mostrar un fondo3D en una pantalla basta para producción virtual profesional?",
      "answer": "No; hay que resolver seguimiento, sincronía, calibración, color y flujo de producción.",
      "sourceIds": [
        "pro-unreal",
        "pro-davinci"
      ],
      "scopeNote": "Solo previsualización y arquitectura. LED, tracking, genlock y seguridad de rodaje requieren equipos, fuentes específicas y personal competente; no curso completo gratuito de escenario LED."
    }
  ]
}
