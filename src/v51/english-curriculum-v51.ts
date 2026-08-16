export type EnglishPhoneticWordV51 = {
  word: string
  ipa: string
  soundsLike?: string
  tip: string
}

export type EnglishMinimalPairV51 = {
  wordA: string
  ipaA: string
  wordB: string
  ipaB: string
  difference: string
}

export type EnglishPhoneticsV51 = {
  ipa: string
  soundsLike: string
  guide: string
  trickyWords: EnglishPhoneticWordV51[]
  minimalPairs?: EnglishMinimalPairV51[]
  tip: string
}

export type EnglishGrammarV51 = {
  rule: string
  explanation: string
  formula: string
  dailyExample: string
  techExample: string
  correct: string
  incorrect: string
  whyIncorrect: string
}

export type EnglishExerciseOptionV51 = {
  text: string
  isCorrect: boolean
  explanation: string
}

export type EnglishExerciseV51 = {
  id: string
  type: "multiple-choice" | "fill-blank" | "reorder" | "error-fix" | "listening" | "cloze"
  instruction: string
  prompt: string
  audioTarget?: string
  tokens?: string[]
  distractors?: string[]
  clozeTemplate?: string
  clozeHints?: Record<string, string>
  options?: EnglishExerciseOptionV51[]
  correctAnswer: string
  pedagogicalFeedback: string
  ruleReminder: string
}

export type EnglishDialogueTurnV51 = {
  speaker: string
  text: string
  translation: string
}

export type EnglishDialogueV51 = {
  title: string
  context: string
  turns: EnglishDialogueTurnV51[]
}

export type EnglishVocabularyItemV51 = {
  term: string
  ipa: string
  soundsLike?: string
  definition: string
  dailyContext: string
  techContext: string
  mistakeWarning?: string
}

export type EnglishWritingTaskV51 = {
  prompt: string
  template: string
  keywords: string[]
  minWords: number
  guidelines: string[]
}

export type EnglishTeacherGuidanceV51 = {
  todayLearn: string
  priorKnowledge: string
  spanishAnalogy: string
  coreExplanation: string
  spanishTrap: string
  proTip: string
}

export type EnglishLevelV51 = {
  code: string
  title: string
  phase: string
  cefr: string
  goal: string
  teacher: EnglishTeacherGuidanceV51
  phonetics: EnglishPhoneticsV51
  grammar: EnglishGrammarV51
  exercises: EnglishExerciseV51[]
  dialogue: EnglishDialogueV51
  vocabulary: EnglishVocabularyItemV51[]
  writingTask: EnglishWritingTaskV51
  project: string
  sources: string[]
}

export type EnglishPhaseV51 = {
  id: string
  title: string
  range: string
  description: string
  cefr: string
}

export type EnglishLexiconTermV51 = {
  id: string
  term: string
  ipa: string
  soundsLike: string
  category: "swe" | "systems" | "networks" | "databases" | "security" | "cloud" | "ai" | "hardware" | "theory"
  definition: string
  exampleSentence: string
  mistakeWarning?: string
}

// ============================================================================
// ALGORITMOS OPEN-SOURCE DE EVALUACIÓN FONÉTICA Y ALINEACIÓN (TypeScript Puro)
// ============================================================================

export type WordAlignmentResult = {
  targetWord: string
  spokenWord?: string
  status: "match" | "substitution" | "deletion" | "insertion"
}

export type PronunciationScoreResult = {
  score: number // 0 a 100
  accuracyGrade: "native-like" | "clear" | "understandable" | "needs-work"
  alignments: WordAlignmentResult[]
  feedbackMessage: string
}

function cleanToken(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function calculateLevenshtein(a: string, b: string): number {
  const matrix: number[][] = []
  const lenA = a.length
  const lenB = b.length

  for (let i = 0; i <= lenA; i++) matrix[i] = [i]
  for (let j = 0; j <= lenB; j++) matrix[0][j] = j

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }
  return matrix[lenA][lenB]
}

export function evaluatePronunciation(
  targetText: string,
  spokenText: string
): PronunciationScoreResult {
  const targetTokens = cleanToken(targetText).split(" ").filter(Boolean)
  const spokenTokens = cleanToken(spokenText).split(" ").filter(Boolean)

  if (targetTokens.length === 0) {
    return {
      score: 0,
      accuracyGrade: "needs-work",
      alignments: [],
      feedbackMessage: "No hay frase objetivo seleccionada.",
    }
  }

  const alignments: WordAlignmentResult[] = []
  let matches = 0

  targetTokens.forEach((targetWord, idx) => {
    const spokenWord = spokenTokens[idx]

    if (!spokenWord) {
      alignments.push({ targetWord, status: "deletion" })
      return
    }

    if (targetWord === spokenWord) {
      matches++
      alignments.push({ targetWord, spokenWord, status: "match" })
    } else {
      const dist = calculateLevenshtein(targetWord, spokenWord)
      const maxLen = Math.max(targetWord.length, spokenWord.length)
      const similarity = 1 - dist / maxLen

      if (similarity >= 0.7) {
        matches += 0.85
        alignments.push({ targetWord, spokenWord, status: "match" })
      } else {
        alignments.push({ targetWord, spokenWord, status: "substitution" })
      }
    }
  })

  if (spokenTokens.length > targetTokens.length) {
    for (let i = targetTokens.length; i < spokenTokens.length; i++) {
      alignments.push({
        targetWord: "",
        spokenWord: spokenTokens[i],
        status: "insertion",
      })
    }
  }

  const rawScore = (matches / targetTokens.length) * 100
  const score = Math.max(0, Math.min(100, Math.round(rawScore)))

  let accuracyGrade: PronunciationScoreResult["accuracyGrade"] = "needs-work"
  let feedbackMessage = "Pronunciación poco clara. Escucha el audio modelo y modula más despacio."

  if (score >= 85) {
    accuracyGrade = "native-like"
    feedbackMessage = "¡Excelente articulación, ritmo y claridad técnica profesional!"
  } else if (score >= 70) {
    accuracyGrade = "clear"
    feedbackMessage = "Muy buena pronunciación, perfectamente inteligible en un entorno global de ingeniería."
  } else if (score >= 50) {
    accuracyGrade = "understandable"
    feedbackMessage = "Comprensible, pero cuida la apertura de vocales y las terminaciones de consonantes."
  }

  return {
    score,
    accuracyGrade,
    alignments,
    feedbackMessage,
  }
}

// ============================================================================
// FASES CEFR (PRE-A1 A C2)
// ============================================================================

export const englishPhasesV51: EnglishPhaseV51[] = [
  {
    id: "p0",
    title: "Cero Absoluto & Fundamentos Iniciales",
    range: "E00–E05",
    description: "Para quien jamás aprendió inglés: alfabeto, sonidos, pronombres, verbo TO BE, artículos, números, fechas y partes de la PC.",
    cefr: "Pre-A1",
  },
  {
    id: "p1",
    title: "Estructuras Básicas & Primeros Pasos Digitales",
    range: "E06–E11",
    description: "There is/are, have/has, posesivos, preposiciones, presente simple con Do/Does, imperativos de terminal y adverbios.",
    cefr: "A1",
  },
  {
    id: "p2",
    title: "Comunicación Cotidiana & Flujo del Desarrollador",
    range: "E12–E17",
    description: "Presente continuo, pasado simple (was/were y terminación -ed), verbos irregulares, bug reports, comparativos y futuro simple.",
    cefr: "A2",
  },
  {
    id: "p3",
    title: "Independencia Comunicativa & Troubleshooting",
    range: "E18–E25",
    description: "Present Perfect vs Pasado, modales (can, must, should), phrasal verbs, condicionales 0 y 1, conectores lógicos y APIs.",
    cefr: "B1",
  },
  {
    id: "p4",
    title: "Ingeniería de Software & Diseño de Sistemas",
    range: "E26–E33",
    description: "Condicionales 2 y 3, voz pasiva técnica, ADRs, System Design, War Rooms SRE, ciberseguridad, cloud y método STAR para entrevistas.",
    cefr: "B2",
  },
  {
    id: "p5",
    title: "Liderazgo Técnico, RFCs & Estándares",
    range: "E34–E40",
    description: "Redacción y defensa de RFCs, precisión léxica RFC 2119, benchmarking P99, desacuerdos constructivos, compiladores y MLOps.",
    cefr: "C1",
  },
  {
    id: "p6",
    title: "Dominio Académico, Papers & Conferencias",
    range: "E41–E45",
    description: "Lectura crítica de papers ACM/IEEE, redacción científica en LaTeX, ponencias magistrales (Keynotes) y sesiones Q&A complejas.",
    cefr: "C2",
  },
  {
    id: "p7",
    title: "Especialización & Capstone Internacional",
    range: "E46–E47",
    description: "Simulación inmersiva de 5 días en Silicon Valley y defensa técnica internacional de un proyecto open-source completo.",
    cefr: "B2–C2",
  },
]

// ============================================================================
// CURRÍCULO COMPLETO DE 48 NIVELES (E00–E47)
// ============================================================================

export const englishLevelsV51: EnglishLevelV51[] = [
  // --------------------------------------------------------------------------
  // E00: Cero Absoluto · Alfabeto, Sonidos Básicos y Deletreo
  // --------------------------------------------------------------------------
  {
    code: "E00",
    title: "Cero Absoluto: Alfabeto, Sonidos y Primeros Saludos",
    phase: "p0",
    cefr: "Pre-A1",
    goal: "Aprender el alfabeto inglés, deletrear nombres de variables y usar los saludos y despedidas más comunes.",
    teacher: {
      todayLearn: "Aprenderás cómo suena cada letra del abecedario en inglés, cómo deletrear tu nombre o un comando, y cómo saludar educadamente.",
      priorKnowledge: "Ninguno. Empezamos desde cero total. No necesitas saber nada de inglés.",
      spanishAnalogy: "En español las letras casi siempre suenan igual que su nombre (la 'A' suena 'a'). En inglés, el nombre de la letra y su sonido en una palabra pueden variar.",
      coreExplanation: "El alfabeto inglés tiene 26 letras. En informática es fundamental saber deletrear nombres de usuario, contraseñas, URLs y comandos letra por letra.",
      spanishTrap: "Cuidado con la 'E' (se dice /iː/ como 'i' larga) y la 'I' (se dice /aɪ/ como 'ai'). Los hispanohablantes solemos confundirlas.",
      proTip: "Asocia la 'E' con 'email' (/ˈiː.meɪl/) y la 'I' con 'iPhone' (/ˈaɪ.foʊn/).",
    },
    phonetics: {
      ipa: "/ˌeɪ ˈbiː ˈsiː/ · /ˈhɛl.oʊ/ · /ˈhaɪ/",
      soundsLike: "ei - bii - sii · je-lóu · jai",
      guide: "Pronuncia las vocales en inglés: A suena 'ei', E suena 'ii', I suena 'ai', O suena 'ou', U suena 'iu'. Los símbolos raros son del Alfabeto Fonético Internacional (IPA) que usan los diccionarios.",
      trickyWords: [
        { word: "A", ipa: "/eɪ/", soundsLike: "ei", tip: "Como en 'game' o 'play'" },
        { word: "E", ipa: "/iː/", soundsLike: "ii", tip: "Como una 'i' española larga" },
        { word: "I", ipa: "/aɪ/", soundsLike: "ai", tip: "Como en 'ice' o 'iPhone'" },
        { word: "W", ipa: "/ˈdʌb.əl.juː/", soundsLike: "dáb-l-iu", tip: "Se dice 'double-u' (doble u)" },
        { word: "Z", ipa: "/ziː/", soundsLike: "zii", tip: "En EE.UU. se dice 'zee', con zumbido de abeja" },
      ],
      minimalPairs: [
        { wordA: "B", ipaA: "/biː/", wordB: "V", ipaB: "/viː/", difference: "La B junta los labios (/biː/); la V apoya los dientes en el labio inferior (/viː/)." },
      ],
      tip: "Practica deletreando en voz alta tu lenguaje favorito: P-Y-T-H-O-N ('pii - wai - tii - eitch - ou - en').",
    },
    grammar: {
      rule: "Saludos formales e informales en inglés",
      explanation: "Usa 'Hello' para cualquier situación, 'Hi' para situaciones cotidianas, y 'Good morning / afternoon' para entornos formales.",
      formula: "Saludo + Nombre/Título (ej. Hello Alex, Good morning team)",
      dailyExample: "Hello, my name is Carlos.",
      techExample: "Hi team, ready for the daily meeting.",
      correct: "Hello! My name is Ana.",
      incorrect: "Hello! I name is Ana.",
      whyIncorrect: "'I' es el pronombre 'yo'. Para decir 'mi nombre' debes usar el posesivo 'my name'.",
    },
    exercises: [
      {
        id: "e00-ex1",
        type: "multiple-choice",
        instruction: "Selecciona cómo se pronuncia la letra 'E' en inglés:",
        prompt: "¿Cuál es el sonido de la letra 'E' en inglés?",
        options: [
          { text: "Suena como 'ii' (/iː/, como en 'email')", isCorrect: true, explanation: "¡Correcto! La letra E en inglés se pronuncia /iː/ ('ii', como en 'email')." },
          { text: "Suena como 'ei' (/eɪ/, como en 'game')", isCorrect: false, explanation: "Incorrecto. 'ei' (/eɪ/) es el sonido de la letra 'A'." },
          { text: "Suena como 'ai' (/aɪ/, como en 'iPhone')", isCorrect: false, explanation: "Incorrecto. 'ai' (/aɪ/) es el sonido de la letra 'I'." },
        ],
        correctAnswer: "Suena como 'ii' (/iː/, como en 'email')",
        pedagogicalFeedback: "Recuerda la regla mnemotécnica: E = 'ii' (Email), I = 'ai' (iPhone), A = 'ei' (Apple Pay).",
        ruleReminder: "En inglés: A='ei', E='ii', I='ai', O='ou', U='iu'.",
      },
      {
        id: "e00-ex2",
        type: "reorder",
        instruction: "Sentence Builder: Construye la frase de presentación correcta ordenando los bloques:",
        prompt: "Arma la oración: 'Hello my name is Alex'",
        tokens: ["Hello", "my", "name", "is", "Alex"],
        distractors: ["I", "are"],
        correctAnswer: "Hello my name is Alex",
        pedagogicalFeedback: "¡Excelente! Estructura: Saludo (Hello) + Posesivo (my) + Nombre (name) + Verbo (is) + Identidad (Alex).",
        ruleReminder: "My name is [Nombre].",
      },
      {
        id: "e00-ex3",
        type: "fill-blank",
        instruction: "Completa el saludo básico en inglés:",
        prompt: "___, my name is David. Nice to meet you.",
        options: [
          { text: "Hello", isCorrect: true, explanation: "¡Excelente! 'Hello' es el saludo universal estándar." },
          { text: "Good", isCorrect: false, explanation: "Incorrecto. 'Good' significa 'bueno'. Para saludar se dice 'Good morning' o 'Hello'." },
        ],
        correctAnswer: "Hello",
        pedagogicalFeedback: "Para presentarte usa 'Hello, my name is...' o 'Hi, I am...'.",
        ruleReminder: "Hello = Hola (estándar). Hi = Hola (informal).",
      },
    ],
    dialogue: {
      title: "Primer contacto en un canal de chat",
      context: "Dos estudiantes se saludan y deletrean su nombre de usuario.",
      turns: [
        { speaker: "Student A", text: "Hello! How do you spell your username?", translation: "¡Hola! ¿Cómo deletreas tu nombre de usuario?" },
        { speaker: "Student B", text: "Hi! It is A-L-E-X, dot, D-E-V.", translation: "¡Hola! Es A-L-E-X, punto, D-E-V." },
      ],
    },
    vocabulary: [
      { term: "Hello", ipa: "/hɛˈloʊ/", soundsLike: "je-lóu", definition: "Hola (saludo universal estándar).", dailyContext: "Hello, nice to meet you.", techContext: "Hello World is the traditional first program." },
      { term: "Name", ipa: "/neɪm/", soundsLike: "neim", definition: "Nombre.", dailyContext: "What is your name?", techContext: "Variable name must be clear." },
      { term: "Spell", ipa: "/spɛl/", soundsLike: "spel", definition: "Deletrear letra por letra.", dailyContext: "Can you spell your last name?", techContext: "Spell the command correctly." },
    ],
    writingTask: {
      prompt: "Escribe un saludo simple de 10-15 palabras presentándote con tu nombre.",
      template: "Hello! My name is Alex. I am a student. Nice to meet you.",
      keywords: ["Hello", "name", "student"],
      minWords: 10,
      guidelines: ["Usa mayúscula al iniciar la oración.", "Usa punto al final de cada frase."],
    },
    project: "Grabar tu voz deletreando tu nombre y tu lenguaje de programación favorito en inglés.",
    sources: ["oxford-english-it", "cambridge-ict"],
  },

  // --------------------------------------------------------------------------
  // E01: Pronombres Personales y Verbo TO BE (Afirmativo)
  // --------------------------------------------------------------------------
  {
    code: "E01",
    title: "Pronombres Personales y Verbo TO BE (Ser / Estar)",
    phase: "p0",
    cefr: "Pre-A1",
    goal: "Dominar los pronombres personales (I, you, he, she, it, we, they) y las formas afirmativas del verbo TO BE (am, is, are).",
    teacher: {
      todayLearn: "Aprenderás a decir quién eres, dónde estás y qué es cada objeto o programa usando el verbo más importante del inglés: TO BE.",
      priorKnowledge: "Solo necesitas el alfabeto y los saludos del nivel E00.",
      spanishAnalogy: "En español tenemos dos verbos separados ('ser' y 'estar'). En inglés, UN SOLO verbo hace ambas funciones: 'TO BE'. 'I am Carlos' = 'Soy Carlos'. 'I am online' = 'Estoy en línea'.",
      coreExplanation: "El verbo TO BE cambia según la persona:\n- I -> am (I am = yo soy/estoy)\n- You / We / They -> are (You are = tú eres/estás, We are = somos/estamos)\n- He / She / It -> is (He is = él es/está, It is = eso es/está para cosas/sistemas)",
      spanishTrap: "En español decimos 'Es un archivo' (omitiendo el sujeto). En inglés NUNCA puedes omitir el pronombre: debes decir 'It is a file'.",
      proTip: "Usa contracciones en el habla diaria: I'm, you're, he's, she's, it's, we're, they're.",
    },
    phonetics: {
      ipa: "/aɪ æm/ · /juː ɑːr/ · /ɪt ɪz/ · /ɪts/",
      soundsLike: "ai am · iu ar · it iz · its",
      guide: "Pronuncia 'It is' uniendo los sonidos como 'it-iz'. La contracción 'it's' suena 'its' con 's' suave.",
      trickyWords: [
        { word: "They", ipa: "/ðeɪ/", soundsLike: "dei (con lengua entre dientes)", tip: "La 'th' vibra contra los dientes, no suena como 'd' seca" },
        { word: "It's", ipa: "/ɪts/", soundsLike: "its", tip: "Vocal corta, no 'iits'" },
        { word: "We're", ipa: "/wɪər/", soundsLike: "wíir", tip: "Una sola sílaba rítmica" },
      ],
      tip: "'It' es el pronombre para cualquier objeto inanimado, computadora, archivo o servidor.",
    },
    grammar: {
      rule: "Estructura afirmativa con el verbo TO BE",
      explanation: "Sujeto + am/is/are + Complemento.",
      formula: "Subject (I/You/He/She/It/We/They) + BE (am/is/are) + Complement",
      dailyExample: "I am a student. She is my teacher.",
      techExample: "The server is online. It is ready.",
      correct: "It is a fast computer.",
      incorrect: "Is a fast computer.",
      whyIncorrect: "En inglés todas las oraciones deben llevar un sujeto explícito. Para objetos o computadoras usamos 'It'.",
    },
    exercises: [
      {
        id: "e01-ex1",
        type: "multiple-choice",
        instruction: "Selecciona la forma correcta del verbo TO BE para 'The server':",
        prompt: "The server ___ online.",
        options: [
          { text: "is", isCorrect: true, explanation: "¡Correcto! 'The server' es singular (equivale a 'It'), por lo que lleva 'is'." },
          { text: "am", isCorrect: false, explanation: "Incorrecto. 'am' solo se usa con el pronombre 'I' (I am)." },
          { text: "are", isCorrect: false, explanation: "Incorrecto. 'are' se usa con You, We y They." },
        ],
        correctAnswer: "is",
        pedagogicalFeedback: "Regla: I am, You/We/They are, He/She/It is. 'The server' = It is.",
        ruleReminder: "He/She/It + is.",
      },
      {
        id: "e01-ex2",
        type: "reorder",
        instruction: "Sentence Builder: Construye la frase afirmativa técnica:",
        prompt: "Arma la oración: 'The server is online and ready'",
        tokens: ["The", "server", "is", "online", "and", "ready"],
        distractors: ["are", "am"],
        correctAnswer: "The server is online and ready",
        pedagogicalFeedback: "¡Excelente! 'The server' (sujeto) + 'is' (verbo singular) + 'online and ready' (predicado).",
        ruleReminder: "Subject + is/are + Complement.",
      },
      {
        id: "e01-ex3",
        type: "fill-blank",
        instruction: "Completa con el pronombre correcto para referirte a ti mismo:",
        prompt: "___ am a junior developer.",
        options: [
          { text: "I", isCorrect: true, explanation: "¡Muy bien! 'I am' significa 'Yo soy' o 'Yo estoy'." },
          { text: "It", isCorrect: false, explanation: "Incorrecto. 'It' se usa para cosas o animales, no para uno mismo." },
        ],
        correctAnswer: "I",
        pedagogicalFeedback: "El pronombre 'I' (yo) siempre se escribe con mayúscula en inglés.",
        ruleReminder: "I = Yo (siempre mayúscula).",
      },
    ],
    dialogue: {
      title: "Identificación de estado en el laboratorio",
      context: "Dos programadores verifican su estado y el del equipo.",
      turns: [
        { speaker: "Dev A", text: "Are you ready? The system is online.", translation: "¿Estás listo? El sistema está en línea." },
        { speaker: "Dev B", text: "Yes, I am ready. We are connected.", translation: "Sí, estoy listo. Estamos conectados." },
      ],
    },
    vocabulary: [
      { term: "Ready", ipa: "/ˈrɛd.i/", soundsLike: "réd-i", definition: "Listo / preparado.", dailyContext: "I am ready for dinner.", techContext: "The service is ready to accept requests." },
      { term: "Online", ipa: "/ˌɑːnˈlaɪn/", soundsLike: "on-láin", definition: "En línea / conectado a la red.", dailyContext: "Are you online today?", techContext: "All database nodes are online." },
      { term: "Connected", ipa: "/kəˈnɛk.tɪd/", soundsLike: "co-néc-tid", definition: "Conectado.", dailyContext: "We are connected to friends.", techContext: "The client is connected via WebSocket." },
    ],
    writingTask: {
      prompt: "Escribe 3 oraciones afirmativas con el verbo TO BE describiendo tu rol, tu estado y el de tu computadora.",
      template: "1. I am a programmer.\n2. My computer is fast.\n3. We are in the lab.",
      keywords: ["am", "is", "are"],
      minWords: 15,
      guidelines: ["Usa una oración con 'am', una con 'is' y una con 'are'."],
    },
    project: "Escribir y pronunciar 5 oraciones de estado del sistema usando contracciones (I'm, it's, they're).",
    sources: ["oxford-english-it", "cambridge-ict"],
  },

  // --------------------------------------------------------------------------
  // E02: Verbo TO BE (Negación y Preguntas)
  // --------------------------------------------------------------------------
  {
    code: "E02",
    title: "Verbo TO BE: Negación, Preguntas y Respuestas Cortas",
    phase: "p0",
    cefr: "Pre-A1",
    goal: "Formular negaciones (is not / isn't, are not / aren't) y preguntas básicas invirtiendo el orden sujeto-verbo.",
    teacher: {
      todayLearn: "Aprenderás a decir que algo NO es o NO está ('is not', 'are not') y a hacer preguntas cambiando el orden de las palabras.",
      priorKnowledge: "Las formas afirmativas am/is/are del nivel E01.",
      spanishAnalogy: "En español para preguntar solo cambiamos el tono de voz ('¿El servidor está listo?'). En inglés INVERTIMOS el orden: el verbo pasa al principio ('Is the server ready?').",
      coreExplanation: "Negación:\n- Sujeto + BE + not (It is not ready / It isn't ready).\nPreguntas:\n- BE + Sujeto + Complemento? (Is it ready? -> Yes, it is. / No, it isn't.)",
      spanishTrap: "No digas 'The server no is ready'. En inglés la negación se hace con 'is NOT' o 'isn't'.",
      proTip: "Respuestas cortas: 'Yes, it is' o 'No, it isn't'. Nunca respondas solo 'Yes, is'.",
    },
    phonetics: {
      ipa: "/ˈɪz.ənt/ · /ˈɑːrnt/ · /ɪz ɪt ˈrɛd.i/",
      soundsLike: "íz-nt · arnt · iz-it réd-i",
      guide: "Pronuncia 'isn't' como 'íz-nt' en dos golpes suaves. 'Aren't' suena como 'arnt' en una sola sílaba.",
      trickyWords: [
        { word: "Isn't", ipa: "/ˈɪz.ənt/", soundsLike: "íz-nt", tip: "Contracción de 'is not'" },
        { word: "Aren't", ipa: "/ɑːrnt/", soundsLike: "arnt", tip: "Contracción de 'are not'" },
        { word: "Is it", ipa: "/ˈɪz.ɪt/", soundsLike: "íz-it", tip: "Une los sonidos al preguntar" },
      ],
      tip: "Al hacer preguntas, sube ligeramente la entonación al final de la frase.",
    },
    grammar: {
      rule: "Inversión para preguntas con el verbo TO BE",
      explanation: "Para formar preguntas, coloca am/is/are ANTES del sujeto.",
      formula: "BE (Am/Is/Are) + Subject + Complement?",
      dailyExample: "Is she at home? No, she isn't.",
      techExample: "Is the port open? Yes, it is.",
      correct: "Is the database active?",
      incorrect: "The database is active?",
      whyIncorrect: "En inglés formal las preguntas con el verbo TO BE requieren invertir el orden sujeto-verbo.",
    },
    exercises: [
      {
        id: "e02-ex1",
        type: "multiple-choice",
        instruction: "Selecciona la pregunta formulada correctamente en inglés:",
        prompt: "¿Cómo se pregunta si el archivo está listo?",
        options: [
          { text: "Is the file ready?", isCorrect: true, explanation: "¡Correcto! Se coloca 'Is' al principio para formular la pregunta." },
          { text: "The file is ready?", isCorrect: false, explanation: "Incorrecto en inglés estándar: falta invertir el verbo 'Is' al inicio." },
          { text: "Is ready the file?", isCorrect: false, explanation: "Incorrecto: el sujeto ('the file') va inmediatamente después de 'Is'." },
        ],
        correctAnswer: "Is the file ready?",
        pedagogicalFeedback: "Fórmula de pregunta: BE + Sujeto + Adjetivo? -> Is + the file + ready?",
        ruleReminder: "Is/Are + Sujeto + Complemento?",
      },
      {
        id: "e02-ex2",
        type: "reorder",
        instruction: "Sentence Builder: Construye la pregunta invirtiendo sujeto y verbo:",
        prompt: "Arma la pregunta: 'Is the database server online?'",
        tokens: ["Is", "the", "database", "server", "online?"],
        distractors: ["Are", "The"],
        correctAnswer: "Is the database server online?",
        pedagogicalFeedback: "¡Excelente! Al preguntar con TO BE colocamos 'Is' al inicio de la oración.",
        ruleReminder: "Is + Subject + Adjective?",
      },
      {
        id: "e02-ex3",
        type: "fill-blank",
        instruction: "Completa la negación en inglés:",
        prompt: "The server ___ running. It is stopped.",
        options: [
          { text: "is not", isCorrect: true, explanation: "¡Exacto! 'is not' o 'isn't' niega el estado singular." },
          { text: "no is", isCorrect: false, explanation: "Incorrecto. 'no is' es una traducción literal errónea del español." },
        ],
        correctAnswer: "is not",
        pedagogicalFeedback: "En inglés siempre se coloca 'not' DESPUÉS del verbo auxiliar/BE: 'is not'.",
        ruleReminder: "Sujeto + is/are + NOT.",
      },
    ],
    dialogue: {
      title: "Comprobación de errores en el servidor",
      context: "Un técnico pregunta si la conexión está caída.",
      turns: [
        { speaker: "Support", text: "Is the connection stable?", translation: "¿La conexión es estable?" },
        { speaker: "Admin", text: "No, it isn't. The router is offline.", translation: "No, no lo es. El router está fuera de línea." },
        { speaker: "Support", text: "Are the backup servers ready?", translation: "¿Los servidores de respaldo están listos?" },
        { speaker: "Admin", text: "Yes, they are.", translation: "Sí, lo están." },
      ],
    },
    vocabulary: [
      { term: "Offline", ipa: "/ˌɔːfˈlaɪn/", soundsLike: "off-láin", definition: "Desconectado / fuera de servicio.", dailyContext: "I am offline on weekends.", techContext: "The primary node is offline." },
      { term: "Stable", ipa: "/ˈsteɪ.bəl/", soundsLike: "stéi-bl", definition: "Estable / sin fallos.", dailyContext: "Her health is stable.", techContext: "Release v2.0 is now stable." },
      { term: "Backup", ipa: "/ˈbæk.ʌp/", soundsLike: "bák-ap", definition: "Copia de seguridad / respaldo.", dailyContext: "Do you have a backup plan?", techContext: "Always verify database backups." },
    ],
    writingTask: {
      prompt: "Escribe 2 preguntas y 2 respuestas cortas sobre el estado de un servidor o programa.",
      template: "Q1: Is the service running?\nA1: Yes, it is.\nQ2: Are the files corrupted?\nA2: No, they aren't.",
      keywords: ["Is", "Are", "isn't", "aren't"],
      minWords: 20,
      guidelines: ["Usa inversión en las preguntas y contracciones en las respuestas negativas."],
    },
    project: "Realizar un diálogo interactivo de diagnóstico preguntando por 4 componentes del sistema.",
    sources: ["oxford-english-it", "cambridge-ict"],
  },

  // --------------------------------------------------------------------------
  // E03: Artículos (A, An, The), Plurales y Demostrativos
  // --------------------------------------------------------------------------
  {
    code: "E03",
    title: "Artículos (A, An, The), Plurales y Demostrativos (This / That)",
    phase: "p0",
    cefr: "Pre-A1",
    goal: "Usar correctamente los artículos 'a', 'an' y 'the', formar plurales regulares e irregulares y señalar objetos con this/that/these/those.",
    teacher: {
      todayLearn: "Aprenderás cuándo usar 'a' vs 'an', la diferencia con 'the', cómo hacer plurales en inglés y cómo decir 'este', 'ese', 'estos' y 'esos'.",
      priorKnowledge: "Pronombres y verbo TO BE de los niveles E01 y E02.",
      spanishAnalogy: "'A' y 'An' equivalen a 'un / una'. 'The' equivale a 'el / la / los / las'. En inglés 'the' no tiene género ni número: sirve para todo.",
      coreExplanation: "Reglas clave:\n- 'A' se usa antes de sonido de consonante: a file, a computer, a user (/juː/).\n- 'An' se usa antes de sonido de vocal: an error, an array, an API (/eɪ/).\n- 'The' se usa para algo específico ya conocido: the main server.\n- 'This' (este/esta) y 'These' (estos/estas) para lo que está cerca.\n- 'That' (ese/aquel) y 'Those' (esos/aquellos) para lo que está lejos.",
      spanishTrap: "Cuidado con palabras como 'university' o 'user': empiezan con sonido consonántico 'yu-' (/j/), por lo que llevan 'a' ('a user'), no 'an'.",
      proTip: "La regla de 'a' vs 'an' depende del SONIDO inicial, no de la letra escrita.",
    },
    phonetics: {
      ipa: "/ə faɪl/ · /æn ˈɛr.ər/ · /ðɪs/ · /ðæt/ · /ðiːz/ · /ðoʊz/",
      soundsLike: "e fail · an ér-ror · dis · dat · diiz · dous",
      guide: "'This' suena corto con 's' suave ('dis'). 'These' suena más largo con 'z' sonora ('diiz').",
      trickyWords: [
        { word: "This", ipa: "/ðɪs/", soundsLike: "dis", tip: "Singular, cercano (este/esta)" },
        { word: "These", ipa: "/ðiːz/", soundsLike: "diiz", tip: "Plural, cercano (estos/estas)" },
        { word: "That", ipa: "/ðæt/", soundsLike: "dat", tip: "Singular, lejano (ese/aquel)" },
        { word: "Those", ipa: "/ðoʊz/", soundsLike: "dous", tip: "Plural, lejano (esos/aquellos)" },
      ],
      tip: "Une el artículo 'an' con la siguiente palabra: 'an error' suena 'an-ér-ror'.",
    },
    grammar: {
      rule: "Uso de artículos indefinidos (A / An) y definidos (The)",
      explanation: "Usa 'a' antes de sonido consonántico, 'an' antes de sonido vocálico, y 'the' para elementos específicos.",
      formula: "a/an + Singular Countable Noun | the + Specific Noun",
      dailyExample: "I have a book and an apple. The book is interesting.",
      techExample: "This is a bug, but that is an expected feature. The bug is fixed.",
      correct: "We need an API key and a password.",
      incorrect: "We need a API key and an password.",
      whyIncorrect: "'API' empieza con sonido vocálico 'ei' (lleva 'an'), mientras que 'password' empieza con sonido consonántico 'p' (lleva 'a').",
    },
    exercises: [
      {
        id: "e03-ex1",
        type: "multiple-choice",
        instruction: "Selecciona el artículo correcto para la palabra 'array':",
        prompt: "Create ___ empty array in memory.",
        options: [
          { text: "an", isCorrect: true, explanation: "¡Correcto! 'Array' comienza con sonido de vocal (/əˈreɪ/), por lo que requiere 'an'." },
          { text: "a", isCorrect: false, explanation: "Incorrecto. 'a' se usa únicamente antes de sonidos de consonante." },
        ],
        correctAnswer: "an",
        pedagogicalFeedback: "Sonido de vocal -> AN. Sonido de consonante -> A. Ejemplo: an array, a list.",
        ruleReminder: "an + vowel sound.",
      },
      {
        id: "e03-ex2",
        type: "reorder",
        instruction: "Sentence Builder: Construye la frase con demostrativos y artículos:",
        prompt: "Arma la oración: 'This is an error in the main file'",
        tokens: ["This", "is", "an", "error", "in", "the", "main", "file"],
        distractors: ["a", "These"],
        correctAnswer: "This is an error in the main file",
        pedagogicalFeedback: "¡Perfecto! 'This' (demostrativo singular) + 'is' + 'an error' (sonido vocal) + 'in the main file'.",
        ruleReminder: "an + vowel sound.",
      },
      {
        id: "e03-ex3",
        type: "fill-blank",
        instruction: "Completa con el demostrativo plural para objetos cercanos:",
        prompt: "___ files are ready to be uploaded.",
        options: [
          { text: "These", isCorrect: true, explanation: "¡Excelente! 'These' es el plural de 'This' (estos archivos)." },
          { text: "This", isCorrect: false, explanation: "Incorrecto. 'This' es singular (this file)." },
        ],
        correctAnswer: "These",
        pedagogicalFeedback: "This file (singular) -> These files (plural). That file (singular lejano) -> Those files (plural lejano).",
        ruleReminder: "These + Plural Nouns.",
      },
    ],
    dialogue: {
      title: "Revisión de elementos en el espacio de trabajo",
      context: "Un desarrollador muestra archivos locales y remotos a un compañero.",
      turns: [
        { speaker: "Senior", text: "Is this the configuration file?", translation: "¿Es este el archivo de configuración?" },
        { speaker: "Junior", text: "Yes, this is the local file, and those are the remote backups.", translation: "Sí, este es el archivo local, y aquellos son los respaldos remotos." },
      ],
    },
    vocabulary: [
      { term: "File", ipa: "/faɪl/", soundsLike: "fail", definition: "Archivo informático.", dailyContext: "Keep your tax files safe.", techContext: "Open the configuration file." },
      { term: "Folder", ipa: "/ˈfoʊl.dər/", soundsLike: "fóul-der", definition: "Carpeta / directorio.", dailyContext: "Put the photos in a folder.", techContext: "Create a new folder named src." },
      { term: "Feature", ipa: "/ˈfiː.tʃər/", soundsLike: "fíi-cher", definition: "Característica / funcionalidad de un software.", dailyContext: "The car has safety features.", techContext: "We are developing a dark mode feature." },
    ],
    writingTask: {
      prompt: "Escribe 3 oraciones usando 'this', 'that' y 'these' para describir archivos y carpetas.",
      template: "1. This is an important document.\n2. That is a remote server.\n3. These are the project folders.",
      keywords: ["This", "That", "These", "an", "the"],
      minWords: 20,
      guidelines: ["Usa correctamente 'a' o 'an' según el sonido inicial."],
    },
    project: "Identificar y clasificar 10 elementos de tu escritorio usando a/an, this/that/these/those en voz alta.",
    sources: ["oxford-english-it", "cambridge-ict"],
  },

  // --------------------------------------------------------------------------
  // E04: Números, Colores, Objetos Cotidianos y Hardware Básico
  // --------------------------------------------------------------------------
  {
    code: "E04",
    title: "Números (0-100), Colores y Componentes de Hardware",
    phase: "p0",
    cefr: "Pre-A1",
    goal: "Contar del 0 al 100, nombrar colores de cables/interfaces e identificar componentes físicos de una computadora.",
    teacher: {
      todayLearn: "Aprenderás los números en inglés, los colores para interfaces y cables de red, y los nombres de las partes físicas de tu computadora.",
      priorKnowledge: "Alfabeto, pronombres y artículos de los niveles E00 a E03.",
      spanishAnalogy: "Los números del 13 al 19 terminan en '-teen' (adolescentes / acento al final), mientras que las decenas del 20 al 90 terminan en '-ty' (acento al principio).",
      coreExplanation: "Números clave:\n- 1-12: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve.\n- 13-19 (-teen): thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen.\n- Decenas (-ty): twenty, thirty, forty (¡sin 'u'!), fifty, sixty, seventy, eighty, ninety, one hundred.\nHardware básico:\n- Screen (pantalla), Keyboard (teclado), Mouse (ratón), Cable (cable), Memory (memoria), Hard drive (disco duro).",
      spanishTrap: "Cuidado con 'fourteen' (14, acento en 'teen') y 'forty' (40, acento en 'for'). La confusión entre 14 y 40 o 15 y 50 es muy común.",
      proTip: "Recuerda que 'forty' (40) se escribe SIN la letra 'u', a diferencia de 'four' (4) y 'fourteen' (14).",
    },
    phonetics: {
      ipa: "/wʌn/ · /ˈtwɛn.ti/ · /ˈfɔːr.ti/ · /ˈkiː.bɔːrd/ · /ˈskriːn/",
      soundsLike: "wan · tuén-ti · fór-ti · kíi-bord · skriin",
      guide: "Pronuncia 'three' con la lengua entre los dientes ('zrii') para no decir 'tree' (árbol) ni 'free' (gratis).",
      trickyWords: [
        { word: "Three", ipa: "/θriː/", soundsLike: "zrii (lengua entre dientes)", tip: "Sonido /θ/, no una 't' simple" },
        { word: "Keyboard", ipa: "/ˈkiː.bɔːrd/", soundsLike: "kíi-bord", tip: "Acento en la primera sílaba" },
        { word: "Screen", ipa: "/skriːn/", soundsLike: "skriin", tip: "Vocal 'i' larga" },
        { word: "Forty", ipa: "/ˈfɔːr.ti/", soundsLike: "fór-ti", tip: "Sin 'u' en la escritura" },
      ],
      minimalPairs: [
        { wordA: "Three", ipaA: "/θriː/", wordB: "Tree", ipaB: "/triː/", difference: "'Three' tiene la lengua entre los dientes; 'Tree' apoya la lengua en el paladar." },
        { wordA: "Fourteen", ipaA: "/ˌfɔːrˈtiːn/", wordB: "Forty", ipaB: "/ˈfɔːr.ti/", difference: "'Fourteen' lleva el golpe de voz en '-teen'; 'Forty' en 'For-'." },
      ],
      tip: "Colores útiles: red (rojo), green (verde), blue (azul), yellow (amarillo), black (negro), white (blanco), gray (gris).",
    },
    grammar: {
      rule: "Adjetivos antes del sustantivo sin plural",
      explanation: "En inglés los adjetivos (incluyendo colores) van SIEMPRE ANTES del sustantivo y NUNCA se pluralizan.",
      formula: "Color/Adjective + Noun (ej. black screen, blue cables)",
      dailyExample: "I have two red apples.",
      techExample: "Connect the blue cable to the green port.",
      correct: "We need three fast servers and two black screens.",
      incorrect: "We need three servers fasts and two screens blacks.",
      whyIncorrect: "En inglés los adjetivos van antes del sustantivo y no cambian en plural.",
    },
    exercises: [
      {
        id: "e04-ex1",
        type: "multiple-choice",
        instruction: "Selecciona el orden correcto en inglés para 'un cable rojo':",
        prompt: "¿Cómo se dice 'un cable rojo'?",
        options: [
          { text: "a red cable", isCorrect: true, explanation: "¡Correcto! El adjetivo ('red') va siempre antes del sustantivo ('cable')." },
          { text: "a cable red", isCorrect: false, explanation: "Incorrecto: en inglés el adjetivo no puede ir después del sustantivo." },
        ],
        correctAnswer: "a red cable",
        pedagogicalFeedback: "Regla de oro: Adjetivo + Sustantivo -> a red cable, a green light.",
        ruleReminder: "Adjective + Noun.",
      },
      {
        id: "e04-ex2",
        type: "reorder",
        instruction: "Sentence Builder: Construye la instrucción técnica con colores y números:",
        prompt: "Arma la oración: 'Connect two blue cables to the router'",
        tokens: ["Connect", "two", "blue", "cables", "to", "the", "router"],
        distractors: ["cables blue", "at"],
        correctAnswer: "Connect two blue cables to the router",
        pedagogicalFeedback: "¡Excelente! Número ('two') + Adjetivo ('blue') + Sustantivo ('cables').",
        ruleReminder: "Quantity + Adjective + Noun.",
      },
      {
        id: "e04-ex3",
        type: "fill-blank",
        instruction: "Escribe el número 40 en inglés:",
        prompt: "The server rack has ___ units available.",
        options: [
          { text: "forty", isCorrect: true, explanation: "¡Excelente! 'Forty' se escribe sin 'u'." },
          { text: "fourty", isCorrect: false, explanation: "Incorrecto. 'fourty' es una falta de ortografía común; se escribe 'forty'." },
        ],
        correctAnswer: "forty",
        pedagogicalFeedback: "Recuerda: 4 = four, 14 = fourteen, pero 40 = forty (sin 'u').",
        ruleReminder: "40 = forty.",
      },
    ],
    dialogue: {
      title: "Conexión de periféricos en el puesto de trabajo",
      context: "Dos estudiantes configuran su hardware de desarrollo.",
      turns: [
        { speaker: "User A", text: "How many screens do you have?", translation: "¿Cuántas pantallas tienes?" },
        { speaker: "User B", text: "I have two screens: one black monitor and one white laptop.", translation: "Tengo dos pantallas: un monitor negro y una laptop blanca." },
      ],
    },
    vocabulary: [
      { term: "Keyboard", ipa: "/ˈkiː.bɔːrd/", soundsLike: "kíi-bord", definition: "Teclado.", dailyContext: "Clean your keyboard regularly.", techContext: "Use keyboard shortcuts to increase speed." },
      { term: "Screen", ipa: "/skriːn/", soundsLike: "skriin", definition: "Pantalla / monitor.", dailyContext: "Look at the big screen.", techContext: "The screen resolution is 1920x1080." },
      { term: "Cable", ipa: "/ˈkeɪ.bəl/", soundsLike: "kéi-bl", definition: "Cable físico.", dailyContext: "Connect the power cable.", techContext: "Use an Ethernet cable for a reliable connection." },
    ],
    writingTask: {
      prompt: "Describe tu equipo de cómputo en 3 oraciones indicando cantidades y colores de periféricos.",
      template: "I have one black laptop. I have two blue cables. My keyboard is gray.",
      keywords: ["one", "two", "black", "laptop", "keyboard"],
      minWords: 15,
      guidelines: ["Coloca el color antes del sustantivo en todas las frases."],
    },
    project: "Contar del 1 al 20 en voz alta y describir los colores de 5 elementos de tu entorno técnico.",
    sources: ["oxford-english-it", "cambridge-ict"],
  },

  // --------------------------------------------------------------------------
  // E05: Fechas, Días, Meses, la Hora y Rutinas Digitales
  // --------------------------------------------------------------------------
  {
    code: "E05",
    title: "Fechas, Días de la Semana, la Hora y Horarios",
    phase: "p0",
    cefr: "Pre-A1",
    goal: "Decir la hora, nombrar los días de la semana y meses, y coordinar reuniones o fechas de entrega.",
    teacher: {
      todayLearn: "Aprenderás a decir la hora ('It is 9:00 AM'), los 7 días de la semana, los 12 meses del año y cómo agendar fechas de entrega.",
      priorKnowledge: "Números del nivel E04 y verbo TO BE.",
      spanishAnalogy: "En español decimos 'el lunes'. En inglés usamos la preposición 'ON': 'on Monday'. Para las horas usamos 'AT': 'at 9:00 AM'.",
      coreExplanation: "Días de la semana (¡siempre con mayúscula!):\n- Monday, Tuesday, Wednesday (/ˈwɛnz.deɪ/), Thursday (/ˈθɜːrz.deɪ/), Friday, Saturday, Sunday.\nPreposiciones de tiempo básicas:\n- ON + Días: on Monday, on Friday.\n- AT + Horas: at 10:00 AM, at 3:30 PM.\n- IN + Meses/Años: in January, in 2026.",
      spanishTrap: "Wednesday tiene letras mudas: se pronuncia /ˈwɛnz.deɪ/ ('üénz-dei'), no 'üed-nes-dei'. Thursday empieza con /θ/ ('zúrs-dei'), no 'turs-dei'.",
      proTip: "AM = mañana (ante meridiem), PM = tarde/noche (post meridiem).",
    },
    phonetics: {
      ipa: "/ˈwɛnz.deɪ/ · /ˈθɜːrz.deɪ/ · /æt naɪn eɪ ˈɛm/",
      soundsLike: "uénz-dei · zúrz-dei · at nain ei-em",
      guide: "'Wednesday' tiene letras mudas y suena en dos golpes: 'uénz-dei'. 'Thursday' suena 'zúrz-dei' con la lengua entre los dientes.",
      trickyWords: [
        { word: "Wednesday", ipa: "/ˈwɛnz.deɪ/", soundsLike: "uénz-dei", tip: "La primera 'd' y la 'e' son mudas" },
        { word: "Thursday", ipa: "/ˈθɜːrz.deɪ/", soundsLike: "zúrz-dei", tip: "Empieza con sonido /θ/, no con 't' como Tuesday" },
        { word: "January", ipa: "/ˈdʒæn.ju.er.i/", soundsLike: "dzhán-iu-er-i", tip: "Empieza con sonido 'dzh'" },
      ],
      minimalPairs: [
        { wordA: "Tuesday", ipaA: "/ˈtuːz.deɪ/", wordB: "Thursday", ipaB: "/ˈθɜːrz.deɪ/", difference: "Tuesday empieza con /t/ ('túuz-dei'); Thursday empieza con /θ/ ('zúrz-dei')." },
      ],
      tip: "Los días y meses SIEMPRE se escriben con la primera letra en MAYÚSCULA en inglés.",
    },
    grammar: {
      rule: "Preposiciones de tiempo: AT para horas, ON para días, IN para meses",
      explanation: "Usa 'at' para horas exactas, 'on' para días de la semana y fechas completas, e 'in' para meses y años.",
      formula: "at [Time] | on [Day/Date] | in [Month/Year]",
      dailyExample: "The class is at 8:00 AM on Monday.",
      techExample: "The release is scheduled on Friday at 5:00 PM.",
      correct: "The meeting is on Tuesday at 10:00 AM.",
      incorrect: "The meeting is in Tuesday in 10:00 AM.",
      whyIncorrect: "Con días se usa 'on' (on Tuesday) y con horas se usa 'at' (at 10:00 AM).",
    },
    exercises: [
      {
        id: "e05-ex1",
        type: "multiple-choice",
        instruction: "Selecciona la preposición correcta para un día de la semana:",
        prompt: "The code deployment is ___ Monday morning.",
        options: [
          { text: "on", isCorrect: true, explanation: "¡Correcto! Con días de la semana siempre se utiliza la preposición 'on'." },
          { text: "in", isCorrect: false, explanation: "Incorrecto. 'in' se usa para meses o años (ej. in July, in 2026)." },
          { text: "at", isCorrect: false, explanation: "Incorrecto. 'at' se usa para horas específicas (ej. at 9:00 AM)." },
        ],
        correctAnswer: "on",
        pedagogicalFeedback: "Regla mnemotécnica: ON days, AT hours, IN months/years.",
        ruleReminder: "on + Day of the week.",
      },
      {
        id: "e05-ex2",
        type: "reorder",
        instruction: "Sentence Builder: Construye la frase de agendamiento con preposiciones de tiempo:",
        prompt: "Arma la oración: 'The sprint review is on Friday at three PM'",
        tokens: ["The", "sprint", "review", "is", "on", "Friday", "at", "three", "PM"],
        distractors: ["in", "on 3 PM"],
        correctAnswer: "The sprint review is on Friday at three PM",
        pedagogicalFeedback: "¡Excelente! 'on Friday' (día) + 'at three PM' (hora).",
        ruleReminder: "on [Day] + at [Time].",
      },
      {
        id: "e05-ex3",
        type: "fill-blank",
        instruction: "Completa con la preposición para la hora exacta:",
        prompt: "Our daily team sync is ___ 9:30 AM.",
        options: [
          { text: "at", isCorrect: true, explanation: "¡Muy bien! Las horas exactas van precedidas de 'at'." },
          { text: "on", isCorrect: false, explanation: "Incorrecto. 'on' es para días de la semana o fechas completas." },
        ],
        correctAnswer: "at",
        pedagogicalFeedback: "Para horas: at 9:00 AM, at noon, at midnight.",
        ruleReminder: "at + Exact Time.",
      },
    ],
    dialogue: {
      title: "Coordinación de una reunión de proyecto",
      context: "Dos compañeros coordinan su sesión de estudio en línea.",
      turns: [
        { speaker: "Peer 1", text: "When is the project meeting?", translation: "¿Cuándo es la reunión del proyecto?" },
        { speaker: "Peer 2", text: "It is on Wednesday at two o'clock PM.", translation: "Es el miércoles a las dos en punto de la tarde." },
      ],
    },
    vocabulary: [
      { term: "Meeting", ipa: "/ˈmiː.tɪŋ/", soundsLike: "míi-ting", definition: "Reunión / sesión de trabajo.", dailyContext: "We have a family meeting.", techContext: "Join the sprint planning meeting." },
      { term: "Deadline", ipa: "/ˈdɛd.laɪn/", soundsLike: "déd-lain", definition: "Fecha o plazo límite de entrega.", dailyContext: "The application deadline is tomorrow.", techContext: "The sprint deadline is this Friday." },
      { term: "Schedule", ipa: "/ˈskɛdʒ.uːl/", soundsLike: "ské-dzhul", definition: "Horario / programar una tarea.", dailyContext: "Check your weekly schedule.", techContext: "Schedule a database backup at midnight." },
    ],
    writingTask: {
      prompt: "Escribe una invitación corta a una reunión indicando día, hora y motivo.",
      template: "Hello team! The project meeting is on Thursday at 3:00 PM. We are reviewing the roadmap.",
      keywords: ["meeting", "on", "at", "Thursday"],
      minWords: 15,
      guidelines: ["Usa 'on' para el día y 'at' para la hora con mayúsculas apropiadas."],
    },
    project: "Grabar un mensaje de voz anunciando el horario de entrega de un trabajo práctico.",
    sources: ["oxford-english-it", "cambridge-ict"],
  },
]

// ============================================================================
// GENERACIÓN DE LOS NIVELES RESTANTES (E06 A E47)
// ============================================================================

const levelThemesMap: Record<number, {
  phase: string
  cefr: string
  title: string
  rule: string
  explanation: string
  formula: string
  correct: string
  incorrect: string
  whyIncorrect: string
  trickyWord: string
  ipa: string
  soundsLike: string
  vocabTerm: string
  vocabDef: string
  techContext: string
  builderTokens: string[]
  builderDistractors: string[]
}> = {
  6: {
    phase: "p1", cefr: "A1",
    title: "There is / There are, Have / Has y Posesivos",
    rule: "Existencia con 'There is/are' y posesión con 'Have/Has'",
    explanation: "Usa 'There is' para singular y 'There are' para plural. Usa 'have' con I/You/We/They y 'has' con He/She/It.",
    formula: "There is + Singular | There are + Plural | Subject + have/has + Object",
    correct: "There is a bug in the code, and we have two solutions.",
    incorrect: "There are a bug in the code, and we has two solutions.",
    whyIncorrect: "'A bug' es singular (requiere 'There is') y 'we' usa 'have', no 'has'.",
    trickyWord: "There are", ipa: "/ðer ɑːr/", soundsLike: "der ar",
    vocabTerm: "Resource", vocabDef: "Recurso del sistema (memoria, CPU, archivo).", techContext: "There are sufficient resources allocated.",
    builderTokens: ["There", "is", "a", "bug", "in", "the", "system"],
    builderDistractors: ["are", "has"]
  },
  7: {
    phase: "p1", cefr: "A1",
    title: "Preposiciones de Lugar en Interfaces y Sistemas",
    rule: "Uso de in, on, at, under, between en software",
    explanation: "'In' se usa para carpetas o memoria; 'on' para pantallas, botones o servidores; 'at' para rutas específicas o puertos.",
    formula: "in the folder | on the screen | at port 8080",
    correct: "The script runs on the server and saves logs in the directory.",
    incorrect: "The script runs in the server and saves logs at the directory.",
    whyIncorrect: "Los servicios corren 'on the server' y los archivos se guardan 'in the directory'.",
    trickyWord: "Between", ipa: "/bɪˈtwiːn/", soundsLike: "bi-twíin",
    vocabTerm: "Directory", vocabDef: "Directorio o carpeta de archivos.", techContext: "Store static assets in the public directory.",
    builderTokens: ["The", "database", "runs", "on", "the", "server"],
    builderDistractors: ["in", "at"]
  },
  8: {
    phase: "p1", cefr: "A1",
    title: "Presente Simple I: Rutinas y Estados del Sistema",
    rule: "Tercera persona singular (-s / -es) en código",
    explanation: "Añade -s o -es al verbo cuando el sujeto sea He, She, It o un elemento singular (the function, the server).",
    formula: "Subject (He/She/It) + Verb-s/es + Object",
    correct: "The function processes incoming data and returns a boolean.",
    incorrect: "The function process incoming data and return a boolean.",
    whyIncorrect: "'The function' equivale a 'It' y exige la terminación '-es'/'-s' en presente simple.",
    trickyWord: "Processes", ipa: "/ˈprɑː.sɛs.ɪz/", soundsLike: "pró-ses-iz",
    vocabTerm: "Return", vocabDef: "Devolver un valor desde una función.", techContext: "The method returns an integer value.",
    builderTokens: ["The", "function", "returns", "a", "boolean", "value"],
    builderDistractors: ["return", "process"]
  },
  9: {
    phase: "p1", cefr: "A1",
    title: "Presente Simple II: Do / Does, Negaciones y Preguntas",
    rule: "Auxiliares Do / Does para preguntas y negaciones",
    explanation: "Usa 'don't' con I/You/We/They y 'doesn't' con He/She/It. En preguntas, pon Do/Does al principio y el verbo en forma base.",
    formula: "Do/Does + Subject + Base Verb? | Subject + don't/doesn't + Base Verb",
    correct: "Does the system support authentication? It does not require root access.",
    incorrect: "Does the system supports authentication? It not require root access.",
    whyIncorrect: "Tras 'does' o 'doesn't' el verbo principal va siempre en su forma base (sin -s).",
    trickyWord: "Doesn't", ipa: "/ˈdʌz.ənt/", soundsLike: "dáz-nt",
    vocabTerm: "Support", vocabDef: "Soportar / ser compatible con una tecnología.", techContext: "The browser supports WebAssembly.",
    builderTokens: ["Does", "the", "client", "support", "HTTPS", "requests?"],
    builderDistractors: ["supports", "Do"]
  },
  10: {
    phase: "p1", cefr: "A1",
    title: "Imperativos, Comandos CLI y Pasos de Instalación",
    rule: "Modo imperativo para instrucciones técnicas",
    explanation: "Usa la forma base del verbo sin pronombre para dar órdenes afirmativas; usa 'Do not' / 'Don't' para negativas.",
    formula: "Base Verb + Object | Do not + Base Verb + Object",
    correct: "Clone the repository, install dependencies, and do not commit secrets.",
    incorrect: "You clone the repository and no commit secrets.",
    whyIncorrect: "El imperativo en inglés no lleva pronombre ('Clone') y se niega con 'Do not', nunca con 'no'.",
    trickyWord: "Clone", ipa: "/kloʊn/", soundsLike: "cloun",
    vocabTerm: "Install", vocabDef: "Instalar paquetes o dependencias.", techContext: "Run npm install to configure packages.",
    builderTokens: ["Clone", "the", "repo", "and", "install", "all", "dependencies"],
    builderDistractors: ["You clone", "no"]
  },
  11: {
    phase: "p1", cefr: "A1",
    title: "Adjetivos, Adverbios de Frecuencia y Textos Descriptivos",
    rule: "Posición de adverbios de frecuencia (always, usually, never)",
    explanation: "Los adverbios de frecuencia van ANTES del verbo principal, pero DESPUÉS del verbo TO BE.",
    formula: "Subject + Adverb + Main Verb | Subject + BE + Adverb",
    correct: "The server always logs errors. It is never unresponsive.",
    incorrect: "The server logs always errors. It never is unresponsive.",
    whyIncorrect: "El adverbio va antes de 'logs' y después de 'is'.",
    trickyWord: "Always", ipa: "/ˈɔːl.weɪz/", soundsLike: "ól-weis",
    vocabTerm: "Responsive", vocabDef: "Que responde con rapidez o se adapta a pantallas.", techContext: "The web UI is fast and responsive.",
    builderTokens: ["The", "worker", "always", "logs", "critical", "events"],
    builderDistractors: ["logs always", "is always"]
  },
  12: {
    phase: "p2", cefr: "A2",
    title: "Presente Continuo vs Presente Simple en Monitoreo",
    rule: "Presente continuo (BE + -ing) para acciones en ejecución",
    explanation: "Usa presente simple para verdades o rutinas ('The server runs 24/7'); usa presente continuo para lo que ocurre ahora ('The database is syncing').",
    formula: "Subject + am/is/are + Verb-ing",
    correct: "The background worker is currently processing the batch job.",
    incorrect: "The background worker is process the batch job now.",
    whyIncorrect: "El presente continuo exige 'is' + verbo con terminación '-ing' (processing).",
    trickyWord: "Processing", ipa: "/ˈprɑː.sɛs.ɪŋ/", soundsLike: "pró-ses-ing",
    vocabTerm: "Syncing", vocabDef: "Sincronizando datos entre nodos.", techContext: "The replica is syncing with the primary node.",
    builderTokens: ["The", "database", "node", "is", "currently", "syncing"],
    builderDistractors: ["syncs now", "is sync"]
  },
  13: {
    phase: "p2", cefr: "A2",
    title: "Pasado Simple I: Was / Were y Verbos Regulares (-ed)",
    rule: "Las 3 pronunciaciones de la terminación -ed (/t/, /d/, /ɪd/)",
    explanation: "Pronuncia /ɪd/ solo tras sonidos 't' o 'd' (started, updated). Tras consonantes sordas suena /t/ (fixed, stopped); tras sonoras suena /d/ (compiled, deployed).",
    formula: "Subject + Verb-ed + Object | Subject + was/were + Complement",
    correct: "The service crashed yesterday, but we fixed the memory leak.",
    incorrect: "The service was crashed yesterday, but we fix the memory leak.",
    whyIncorrect: "'Crashed' es pasado activo (no necesita 'was') y 'fixed' debe ir en pasado para concordar con yesterday.",
    trickyWord: "Fixed", ipa: "/fɪkst/", soundsLike: "fikst",
    vocabTerm: "Crash", vocabDef: "Caída abrupta de un programa o sistema.", techContext: "The application crashed due to an out-of-memory error.",
    builderTokens: ["We", "fixed", "the", "bug", "and", "deployed", "the", "patch"],
    builderDistractors: ["was fixed", "deploy"]
  },
  14: {
    phase: "p2", cefr: "A2",
    title: "Pasado Simple II: Verbos Irregulares de Software",
    rule: "Verbos irregulares comunes en ingeniería (built, broke, wrote, ran)",
    explanation: "Muchos verbos frecuentes no terminan en -ed: build -> built, write -> wrote, run -> ran, find -> found, send -> sent.",
    formula: "Subject + Irregular Past Verb + Object",
    correct: "She wrote the migration script and built the container image.",
    incorrect: "She writed the migration script and builded the container image.",
    whyIncorrect: "'Write' y 'build' son irregulares; sus formas en pasado son 'wrote' y 'built'.",
    trickyWord: "Built", ipa: "/bɪlt/", soundsLike: "bilt",
    vocabTerm: "Migration", vocabDef: "Transformación o movimiento de esquemas de BD.", techContext: "Execute the database migration before starting the app.",
    builderTokens: ["The", "team", "built", "the", "microservice", "yesterday"],
    builderDistractors: ["builded", "writed"]
  },
  15: {
    phase: "p2", cefr: "A2",
    title: "Preguntas en Pasado (Did you...?) y Redacción de Bug Reports",
    rule: "Auxiliar 'Did' para preguntas y negaciones en pasado",
    explanation: "Usa 'Did' al inicio de la pregunta y mantén el verbo principal en forma base (sin -ed).",
    formula: "Did + Subject + Base Verb? | Subject + didn't + Base Verb",
    correct: "Did you reproduce the bug in the staging environment?",
    incorrect: "Did you reproduced the bug in the staging environment?",
    whyIncorrect: "El auxiliar 'Did' ya indica pasado; el verbo principal debe permanecer en forma base ('reproduce').",
    trickyWord: "Reproduce", ipa: "/ˌriː.prəˈduːs/", soundsLike: "rii-pro-diús",
    vocabTerm: "Staging", vocabDef: "Entorno previo a producción para pruebas finales.", techContext: "Deploy the release candidate to staging first.",
    builderTokens: ["Did", "you", "reproduce", "the", "issue", "locally?"],
    builderDistractors: ["reproduced", "Do"]
  },
  16: {
    phase: "p2", cefr: "A2",
    title: "Comparativos y Superlativos Técnicos (faster, most scalable)",
    rule: "Comparar métricas y rendimiento con -er / more y -est / most",
    explanation: "Usa -er / -est para adjetivos de 1 sílaba (fast -> faster -> fastest). Usa 'more' / 'most' para 2 o más sílabas (scalable -> more scalable -> most scalable).",
    formula: "Adjective-er than | more Adjective than | the most Adjective",
    correct: "PostgreSQL is more scalable than SQLite for high concurrent writes.",
    incorrect: "PostgreSQL is more fast and scalable that SQLite.",
    whyIncorrect: "'Fast' es monosílabo (se dice 'faster') y en comparaciones se usa 'than', nunca 'that'.",
    trickyWord: "Scalable", ipa: "/ˈskeɪ.lə.bəl/", soundsLike: "skéi-la-bl",
    vocabTerm: "Benchmark", vocabDef: "Prueba estandarizada de rendimiento.", techContext: "The benchmark proved our cache is three times faster.",
    builderTokens: ["Redis", "is", "faster", "than", "disk", "storage"],
    builderDistractors: ["more fast", "that"]
  },
  17: {
    phase: "p2", cefr: "A2",
    title: "Futuro Simple (Will / Going to) y Daily Standups",
    rule: "Expresar planes futuros en reuniones ágiles de desarrollo",
    explanation: "Usa 'will' para decisiones espontáneas o predicciones; usa 'going to' para planes ya decididos del sprint.",
    formula: "Subject + will + Base Verb | Subject + am/is/are going to + Base Verb",
    correct: "Today I am going to implement the search endpoint, and I will push the PR by 5 PM.",
    incorrect: "Today I will to implement the search and I push PR by 5 PM.",
    whyIncorrect: "'Will' va seguido directamente del verbo base sin 'to'.",
    trickyWord: "Sprint", ipa: "/sprɪnt/", soundsLike: "sprint",
    vocabTerm: "Blocker", vocabDef: "Impedimento que frena el avance del trabajo.", techContext: "I have no blockers for today's tasks.",
    builderTokens: ["I", "am", "going", "to", "review", "the", "pull", "request"],
    builderDistractors: ["will to", "reviewing"]
  },
  18: {
    phase: "p3", cefr: "B1",
    title: "Present Perfect vs Pasado Simple en Changelogs y Releases",
    rule: "Present Perfect (have/has + participio) para acciones con impacto actual",
    explanation: "Usa pasado simple con fechas exactas ('deployed yesterday'); usa Present Perfect para novedades sin fecha específica ('We have resolved the vulnerability').",
    formula: "Subject + have/has + Past Participle",
    correct: "We have released version 2.4.0 with critical security patches.",
    incorrect: "We have release version 2.4.0 yesterday.",
    whyIncorrect: "El Present Perfect exige participio ('released') y no debe combinarse con adverbios de tiempo cerrado como 'yesterday'.",
    trickyWord: "Released", ipa: "/rɪˈliːst/", soundsLike: "ri-líist",
    vocabTerm: "Patch", vocabDef: "Corrección rápida de software o seguridad.", techContext: "Apply the hotfix patch immediately.",
    builderTokens: ["We", "have", "shipped", "the", "new", "auth", "feature"],
    builderDistractors: ["ship", "yesterday"]
  },
  19: {
    phase: "p3", cefr: "B1",
    title: "Verbos Modales de Habilidad y Permiso (Can, Could, May)",
    rule: "Modales para capacidades del sistema y solicitudes educadas",
    explanation: "Los modales no llevan -s en tercera persona y van seguidos de la forma base del verbo sin 'to'.",
    formula: "Modal (can/could/may) + Base Verb",
    correct: "Could you review my pull request? The new API can handle 10,000 requests per second.",
    incorrect: "Could you to review my pull request? The API cans handle it.",
    whyIncorrect: "Los modales nunca llevan 'to' después ni se les añade 's' en tercera persona.",
    trickyWord: "Could", ipa: "/kʊd/", soundsLike: "kud",
    vocabTerm: "Capability", vocabDef: "Capacidad o función admitida por el software.", techContext: "The system has real-time streaming capabilities.",
    builderTokens: ["Could", "you", "please", "review", "this", "code", "diff?"],
    builderDistractors: ["to review", "cans"]
  },
  20: {
    phase: "p3", cefr: "B1",
    title: "Verbos Modales de Obligación y Recomendación (Must, Should, Need to)",
    rule: "Gradación de necesidad: Must (obligación estricta) vs Should (recomendación)",
    explanation: "'Must' indica requisito ineludible de seguridad o arquitectura. 'Should' expresa buena práctica o sugerencia técnica.",
    formula: "Subject + must/should + Base Verb",
    correct: "You must encrypt passwords at rest, and you should use bcrypt with salt.",
    incorrect: "You must to encrypt passwords and should using bcrypt.",
    whyIncorrect: "'Must' y 'should' van con verbo base sin 'to' y sin '-ing'.",
    trickyWord: "Should", ipa: "/ʃʊd/", soundsLike: "shud",
    vocabTerm: "Encryption", vocabDef: "Cifrado criptográfico de información.", techContext: "Use AES-256 encryption for sensitive customer data.",
    builderTokens: ["You", "must", "sanitize", "all", "user", "inputs"],
    builderDistractors: ["must to", "sanitizing"]
  },
  21: {
    phase: "p3", cefr: "B1",
    title: "Phrasal Verbs Fundamentales en Computación y DevOps",
    rule: "Verbos compuestos con preposición (log in, roll back, spin up, break down)",
    explanation: "Muchos verbos técnicos combinan un verbo con partícula: 'roll back' (revertir), 'spin up' (levantar servidor), 'shut down' (apagar).",
    formula: "Verb + Particle (ej. roll + back)",
    correct: "If the deployment fails, the automated pipeline will roll back the release.",
    incorrect: "If the deployment fails, the pipeline will rollback the release.",
    whyIncorrect: "'Roll back' (separado) es el verbo; 'rollback' (junto) es el sustantivo.",
    trickyWord: "Roll back", ipa: "/ˌroʊlˈbæk/", soundsLike: "roul-bak",
    vocabTerm: "Pipeline", vocabDef: "Flujo automatizado de construcción y despliegue.", techContext: "The CI pipeline executes linter and test stages.",
    builderTokens: ["We", "need", "to", "spin", "up", "a", "new", "container"],
    builderDistractors: ["spinup", "spinning"]
  },
  22: {
    phase: "p3", cefr: "B1",
    title: "Condicionales Tipo 0 y 1 en Lógica y Aserciones de Código",
    rule: "Zero Conditional (hechos lógicos) y First Conditional (condiciones reales futuras)",
    explanation: "Tipo 0: If + presente, presente (If token expires, request fails). Tipo 1: If + presente, will + verbo (If we cache data, latency will decrease).",
    formula: "If + Present Simple, will + Base Verb",
    correct: "If the load balancer detects a timeout, it will reroute the request to node B.",
    incorrect: "If the load balancer will detect a timeout, it reroutes the request.",
    whyIncorrect: "La cláusula condicional con 'if' nunca lleva 'will' en el primer condicional.",
    trickyWord: "Timeout", ipa: "/ˈtaɪm.aʊt/", soundsLike: "táim-aut",
    vocabTerm: "Assertion", vocabDef: "Comprobación lógica obligatoria en pruebas unitarias.", techContext: "The test assertion verifies that the status code equals 200.",
    builderTokens: ["If", "the", "token", "expires", "the", "request", "will", "fail"],
    builderDistractors: ["will expire", "fails"]
  },
  23: {
    phase: "p3", cefr: "B1",
    title: "Conectores Lógicos y Argumentación de Trade-offs",
    rule: "Conectar ideas opuestas y consecuencias (however, although, therefore, whereas)",
    explanation: "'However' y 'Therefore' inician oración seguidos de coma. 'Although' y 'Whereas' unen dos cláusulas en una sola oración.",
    formula: "Clause A. However, Clause B. | Although Clause A, Clause B.",
    correct: "Microservices improve team autonomy; however, they increase operational complexity.",
    incorrect: "Microservices improve team autonomy, however they increase complexity.",
    whyIncorrect: "'However' como conector entre dos oraciones independientes requiere punto o punto y coma previo y coma posterior.",
    trickyWord: "However", ipa: "/haʊˈɛv.ər/", soundsLike: "jau-é-ver",
    vocabTerm: "Trade-off", vocabDef: "Compensación o balance entre ventajas y desventajas.", techContext: "We evaluated the trade-off between write latency and read consistency.",
    builderTokens: ["Caching", "reduces", "latency;", "however,", "it", "adds", "complexity"],
    builderDistractors: ["although", "therefore"]
  },
  24: {
    phase: "p3", cefr: "B1",
    title: "Troubleshooting en Equipo: Diagnóstico de Stack Traces y Logs",
    rule: "Estructurar hipótesis y pasos de diagnóstico en canales de soporte",
    explanation: "Usa estructuras de causa y efecto: 'The issue might be caused by...', 'We observed that...', 'Steps taken so far...'.",
    formula: "Subject + might be caused by + Noun Phrase",
    correct: "The memory leak might be caused by unclosed database connections in the worker pool.",
    incorrect: "The memory leak maybe is because database connections not closed.",
    whyIncorrect: "'Might be caused by' es la forma idiomática y precisa para hipótesis técnicas.",
    trickyWord: "Hypothesis", ipa: "/haɪˈpɑː.θə.sɪs/", soundsLike: "jai-pó-ze-sis",
    vocabTerm: "Stack trace", vocabDef: "Rastro de ejecución que muestra la secuencia de funciones hasta un error.", techContext: "Inspect the top frame of the stack trace.",
    builderTokens: ["The", "crash", "might", "be", "caused", "by", "null", "pointers"],
    builderDistractors: ["maybe is", "cause"]
  },
  25: {
    phase: "p3", cefr: "B1",
    title: "Documentación de APIs REST y Especificaciones OpenAPI",
    rule: "Redacción estandarizada de endpoints, parámetros y respuestas HTTP",
    explanation: "Usa verbos en tercera persona presente ('Returns a paginated list') y listas concisas para parámetros y errores.",
    formula: "Method + /path + Description + Parameters + Response",
    correct: "GET /api/v1/users returns a list of active users matching the query filter.",
    incorrect: "GET /api/v1/users is for get user list if match filter.",
    whyIncorrect: "La documentación técnica profesional utiliza descripciones formales y directas con verbos en presente.",
    trickyWord: "Endpoint", ipa: "/ˈɛnd.pɔɪnt/", soundsLike: "énd-point",
    vocabTerm: "Pagination", vocabDef: "División de grandes conjuntos de datos en páginas discretas.", techContext: "Implement cursor-based pagination for the infinite scroll feed.",
    builderTokens: ["The", "endpoint", "returns", "a", "paginated", "list", "of", "users"],
    builderDistractors: ["is for get", "returning"]
  },
  26: {
    phase: "p4", cefr: "B2",
    title: "Condicionales Tipo 2 y 3 en Hipótesis de Arquitectura",
    rule: "Segundo condicional (escenarios hipotéticos) y tercer condicional (análisis retrospectivo)",
    explanation: "Tipo 2: If + pasado, would + verbo ('If we used Redis, latency would drop'). Tipo 3: If + had + participio, would have + participio ('If we had added an index, the query would not have timed out').",
    formula: "If + Past Simple, would + Base Verb | If + Past Perfect, would have + Past Participle",
    correct: "If we had sharded the database earlier, we would have avoided yesterday's outage.",
    incorrect: "If we sharded the database earlier, we would avoid yesterday outage.",
    whyIncorrect: "Para referirse a eventos pasados que no ocurrieron se debe usar el tercer condicional (had sharded ... would have avoided).",
    trickyWord: "Outage", ipa: "/ˈaʊ.t̬ɪdʒ/", soundsLike: "áu-tidzh",
    vocabTerm: "Retrospective", vocabDef: "Revisión reflexiva tras completar un ciclo o incidente.", techContext: "Document preventative lessons during the sprint retrospective.",
    builderTokens: ["If", "we", "had", "added", "indexes,", "queries", "would", "run", "faster"],
    builderDistractors: ["would ran", "add"]
  },
  27: {
    phase: "p4", cefr: "B2",
    title: "Voz Pasiva Técnica en Informes de Seguridad y Auditoría",
    rule: "Uso riguroso de la voz pasiva para enfocar el objeto y la acción, no el autor",
    explanation: "En auditorías y seguridad se prioriza el hecho objetivo: 'The vulnerability was discovered', 'All passwords are salted'.",
    formula: "Subject + BE (is/was/has been) + Past Participle",
    correct: "The CVE was patched immediately after the exploit was demonstrated.",
    incorrect: "The CVE patched immediately after the exploit demonstrated.",
    whyIncorrect: "La voz pasiva requiere el verbo auxiliar 'was' antes del participio ('was patched').",
    trickyWord: "Demonstrated", ipa: "/ˈdɛm.ən.streɪ.tɪd/", soundsLike: "dém-on-strei-tid",
    vocabTerm: "Exploit", vocabDef: "Código o técnica que aprovecha una vulnerabilidad de software.", techContext: "A proof-of-concept exploit was published by security researchers.",
    builderTokens: ["The", "security", "vulnerability", "was", "patched", "yesterday"],
    builderDistractors: ["patched", "has patch"]
  },
  28: {
    phase: "p4", cefr: "B2",
    title: "Redacción de Architecture Decision Records (ADRs)",
    rule: "Estructura formal: Status, Context, Decision, Consequences",
    explanation: "Un ADR documenta el razonamiento técnico defendiendo por qué una alternativa fue elegida frente a otras.",
    formula: "Title -> Status -> Context -> Decision -> Consequences",
    correct: "We will adopt event sourcing for the billing domain to guarantee an auditable append-only ledger.",
    incorrect: "We decide to use event sourcing because it is cool and modern.",
    whyIncorrect: "Un ADR exige justificación basada en requisitos de dominio y consecuencias explícitas, no opiniones subjetivas.",
    trickyWord: "Architecture", ipa: "/ˈɑːr.kə.tɛk.tʃər/", soundsLike: "ár-ki-tek-cher",
    vocabTerm: "Append-only", vocabDef: "Estructura de datos donde solo se permite añadir registros, sin modificar ni borrar.", techContext: "Store immutable financial transactions in an append-only log.",
    builderTokens: ["We", "will", "adopt", "PostgreSQL", "partitioning", "for", "audit", "logs"],
    builderDistractors: ["decide using", "adopted"]
  },
  29: {
    phase: "p4", cefr: "B2",
    title: "System Design: Escalabilidad, Caching y Sharding",
    rule: "Vocabulario de sistemas distribuidos y teorema CAP",
    explanation: "Compara consistencia, disponibilidad y tolerancia a particiones con precisión léxica (strong vs eventual consistency).",
    formula: "Subject + prioritizes [Quality A] over [Quality B] to achieve [Goal]",
    correct: "Our distributed data store prioritizes availability over immediate consistency under network partitions.",
    incorrect: "Our data store prefers availability than consistency when network breaks.",
    whyIncorrect: "'Prioritizes X over Y' es la expresión idiomática estándar en diseño de sistemas distribuidos.",
    trickyWord: "Consistency", ipa: "/kənˈsɪs.tən.si/", soundsLike: "con-sís-ten-si",
    vocabTerm: "Sharding", vocabDef: "Particionado horizontal de bases de datos entre múltiples servidores.", techContext: "We shard the database by tenant ID to isolate client workloads.",
    builderTokens: ["The", "system", "prioritizes", "availability", "over", "immediate", "consistency"],
    builderDistractors: ["prefers than", "prioritize"]
  },
  30: {
    phase: "p4", cefr: "B2",
    title: "Incident War Rooms y Post-Mortems Sin Culpa (Google SRE)",
    rule: "Comunicación durante caídas críticas y análisis de causa raíz (5 Whys)",
    explanation: "Usa lenguaje objetivo centrado en fallos sistémicos: 'Timeline', 'Triggering event', 'Root cause', 'Mitigation', 'Action items'.",
    formula: "Timeline + Root Cause + Contributing Factors + Preventative Action Items",
    correct: "The incident commander initiated rollback at 14:35 UTC, restoring baseline throughput within eight minutes.",
    incorrect: "The commander made rollback at 14:35 restoring baseline fast.",
    whyIncorrect: "En SRE se usa terminología formal ('initiated rollback', 'restoring baseline throughput').",
    trickyWord: "Mitigation", ipa: "/ˌmɪt̬.əˈɡeɪ.ʃən/", soundsLike: "mit-i-géi-shon",
    vocabTerm: "Root cause", vocabDef: "Factor fundamental subyacente que originó el fallo del sistema.", techContext: "The root cause was an unindexed query on a high-cardinality column.",
    builderTokens: ["The", "engineer", "initiated", "a", "safe", "rollback", "procedure"],
    builderDistractors: ["made rollback", "initiating"]
  },
  31: {
    phase: "p4", cefr: "B2",
    title: "Ciberseguridad, AppSec y Modelado de Amenazas (STRIDE)",
    rule: "Categorización de amenazas: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege",
    explanation: "Describe vectores de ataque y mitigaciones criptográficas con vocabulario formal de AppSec.",
    formula: "Threat Vector + Vulnerability + Impact + Cryptographic Mitigation",
    correct: "To mitigate cross-site scripting (XSS), the framework automatically sanitizes all user input and enforces a strict CSP header.",
    incorrect: "For stop XSS attacks, the system cleans input and makes CSP.",
    whyIncorrect: "Usa 'To mitigate X' y 'enforces a strict CSP header' para precisión técnica profesional.",
    trickyWord: "Vulnerability", ipa: "/ˌvʌl.nər.əˈbɪl.ə.ti/", soundsLike: "val-ner-a-bíl-i-ti",
    vocabTerm: "Sanitize", vocabDef: "Limpiar y validar datos de entrada para neutralizar inyecciones de código.", techContext: "Sanitize HTML input before rendering in user profile views.",
    builderTokens: ["To", "mitigate", "threats,", "we", "enforce", "strict", "input", "validation"],
    builderDistractors: ["For stop", "enforcing"]
  },
  32: {
    phase: "p4", cefr: "B2",
    title: "Infraestructura Cloud, Kubernetes y Contenedores",
    rule: "Describir topologías de nube, balanceo de carga y orquestación",
    explanation: "Usa términos estándar: pods, deployments, ingress controllers, auto-scaling groups, stateless services.",
    formula: "Service Component + scales horizontally based on + Metric",
    correct: "The Kubernetes horizontal pod autoscaler scales out worker pods when CPU utilization exceeds seventy percent.",
    incorrect: "Kubernetes makes more pods when CPU is high.",
    whyIncorrect: "'Horizontal pod autoscaler scales out worker pods' es el lenguaje técnico exacto de cloud computing.",
    trickyWord: "Kubernetes", ipa: "/ˌkuː.bərˈnɛt.iːz/", soundsLike: "ku-ber-né-tiis",
    vocabTerm: "Autoscaler", vocabDef: "Mecanismo que ajusta automáticamente los recursos según la demanda de tráfico.", techContext: "Configure the cluster autoscaler to handle holiday traffic spikes.",
    builderTokens: ["The", "autoscaler", "spawns", "new", "pods", "under", "heavy", "load"],
    builderDistractors: ["makes pods", "spawn"]
  },
  33: {
    phase: "p4", cefr: "B2",
    title: "Entrevistas Técnicas y Conductuales con el Método STAR",
    rule: "Estructurar respuestas profesionales: Situation, Task, Action, Result",
    explanation: "Describe el contexto (Situation), tu responsabilidad (Task), las decisiones tomadas (Action) y el impacto medible (Result).",
    formula: "Situation -> Task -> Action -> Measurable Result",
    correct: "When our payment gateway experienced high latency (Situation), I was tasked with diagnosing the bottleneck (Task). I implemented Redis caching and connection pooling (Action), which reduced P99 response time by forty percent (Result).",
    incorrect: "I had a slow server and I fixed it with cache and it was faster.",
    whyIncorrect: "El método STAR exige cuantificar resultados y explicar claramente el proceso de ingeniería.",
    trickyWord: "Situation", ipa: "/ˌsɪtʃ.uˈeɪ.ʃən/", soundsLike: "sich-u-éi-shon",
    vocabTerm: "Bottleneck", vocabDef: "Punto de congestión que limita el rendimiento global de un sistema.", techContext: "Profiling revealed that the disk IO was the primary bottleneck.",
    builderTokens: ["I", "optimized", "the", "query,", "reducing", "P99", "latency", "by", "40%"],
    builderDistractors: ["fixed slow", "optimize"]
  },
  34: {
    phase: "p5", cefr: "C1",
    title: "Redacción y Defensa de RFCs con Precisión RFC 2119",
    rule: "Uso normativo de palabras clave IETF (MUST, SHOULD, MAY, SHALL NOT)",
    explanation: "RFC 2119 define 'MUST' como requisito absoluto de interoperabilidad; 'SHOULD' como recomendación fundada; 'MAY' como característica opcional.",
    formula: "RFC Keyword + Base Verb + Scope of Compliance",
    correct: "Implementations MUST reject tokens with invalid signatures, and SHOULD log the client IP for forensic auditing.",
    incorrect: "Implementations have to reject bad tokens and it is good if they log IPs.",
    whyIncorrect: "Las especificaciones técnicas formales exigen el uso de palabras normativas en mayúsculas (MUST / SHOULD).",
    trickyWord: "Normative", ipa: "/ˈnɔːr.mə.tɪv/", soundsLike: "nór-ma-tiv",
    vocabTerm: "Specification", vocabDef: "Documento formal y explícito que define requisitos técnicos.", techContext: "The RFC specification defines wire protocol byte alignments.",
    builderTokens: ["Implementations", "MUST", "reject", "tokens", "with", "invalid", "signatures"],
    builderDistractors: ["have to", "rejects"]
  },
  35: {
    phase: "p5", cefr: "C1",
    title: "Liderazgo Técnico, Mentoría y Desacuerdo Constructivo",
    rule: "Principios de comunicación ejecutiva y 'Disagree and commit'",
    explanation: "Expresa objeciones técnicas con diplomacia basada en datos: 'While I understand the rationale for X, the telemetry data indicates that Y presents lower operational risk'.",
    formula: "Acknowledge viewpoint + Present empirical evidence + Propose compromise / commit",
    correct: "While I acknowledge the simplicity of a monolithic approach, our decoupled team structure necessitates independent deployment pipelines.",
    incorrect: "I disagree because monoliths are old and we must use microservices.",
    whyIncorrect: "El liderazgo técnico senior argumenta mediante restricciones de equipo y datos objetivos, no dogmas.",
    trickyWord: "Rationale", ipa: "/ˌræʃ.əˈnæl/", soundsLike: "rash-o-nál",
    vocabTerm: "Decoupled", vocabDef: "Desacoplado / independiente de dependencias directas.", techContext: "Decoupled microservices communicate through asynchronous message queues.",
    builderTokens: ["While", "I", "understand", "your", "point,", "benchmarks", "favor", "caching"],
    builderDistractors: ["I disagree", "favors"]
  },
  36: {
    phase: "p5", cefr: "C1",
    title: "Benchmarking, Profiling y Análisis de Latencias P99/P99.9",
    rule: "Vocabulario de optimización de bajo nivel y distribución percentil",
    explanation: "Distingue entre latencia media (mean), mediana (P50) y cola larga (P99 / P99.9), flamegraphs y memory allocations.",
    formula: "Latency Metric + Percentile + Profiling Technique + Optimization Strategy",
    correct: "Flamegraph profiling indicated that JSON serialization accounted for thirty-five percent of CPU time at the ninety-ninth percentile.",
    incorrect: "The graph showed that JSON was slow when many users.",
    whyIncorrect: "'Flamegraph profiling indicated that JSON serialization accounted for 35% of CPU time at P99' es el estándar de observabilidad.",
    trickyWord: "Percentile", ipa: "/pərˈsɛn.taɪl/", soundsLike: "per-sén-tail",
    vocabTerm: "Flamegraph", vocabDef: "Visualización jerárquica de perfiles de CPU y consumo de tiempo de ejecución.", techContext: "Inspect the flamegraph to locate hot code paths.",
    builderTokens: ["Profiling", "revealed", "that", "serialization", "caused", "the", "P99", "spike"],
    builderDistractors: ["showed slow", "causing"]
  },
  37: {
    phase: "p5", cefr: "C1",
    title: "Compiladores, ASTs, Bytecode y Garbage Collection",
    rule: "Terminología de teoría de lenguajes y runtime internals",
    explanation: "Domina términos de análisis léxico, parsing sintáctico, árbol de sintaxis abstracta (AST), compilación JIT y algoritmos de GC (Mark-and-Sweep, Generational).",
    formula: "Lexing -> Parsing (AST) -> Bytecode Generation -> JIT Compilation / Runtime GC",
    correct: "The parser constructs an abstract syntax tree from lexical tokens before emitting intermediate representation bytecode.",
    incorrect: "The parser makes a tree from tokens and then writes code.",
    whyIncorrect: "Usa 'abstract syntax tree', 'lexical tokens' y 'intermediate representation' para rigor académico.",
    trickyWord: "Hierarchy", ipa: "/ˈhaɪ.ə.rɑːr.ki/", soundsLike: "jái-rar-ki",
    vocabTerm: "AST", vocabDef: "Árbol de sintaxis abstracta que representa la estructura jerárquica del código fuente.", techContext: "Linter rules traverse the AST to detect anti-patterns.",
    builderTokens: ["The", "lexer", "transforms", "raw", "source", "code", "into", "tokens"],
    builderDistractors: ["makes tokens", "transform"]
  },
  38: {
    phase: "p5", cefr: "C1",
    title: "Inteligencia Artificial, Deep Learning y Pipelines de MLOps",
    rule: "Vocabulario de modelos generativos, Transformers y optimización de tensores",
    explanation: "Describe mecanismos de atención, funciones de pérdida, descenso de gradiente, embeddings, cuantización y latencia de inferencia.",
    formula: "Architecture (Transformers/Attention) + Training Objective + Loss Function + Inference Optimization",
    correct: "The multi-head self-attention mechanism enables the model to weigh dependencies across long sequence context windows.",
    incorrect: "The attention makes the AI look at all words at once.",
    whyIncorrect: "En IA avanzada se utiliza 'multi-head self-attention', 'dependencies' y 'context windows'.",
    trickyWord: "Asynchronous", ipa: "/eɪˈsɪŋ.krə.nəs/", soundsLike: "ei-sín-cro-nas",
    vocabTerm: "Quantization", vocabDef: "Reducción de precisión numérica de pesos de un modelo para acelerar la inferencia.", techContext: "Post-training 8-bit quantization reduces memory bandwidth requirements.",
    builderTokens: ["Self-attention", "weighs", "semantic", "dependencies", "across", "context", "tokens"],
    builderDistractors: ["looks all", "weigh"]
  },
  39: {
    phase: "p5", cefr: "C1",
    title: "Protocolos IETF, Redes Avanzadas (QUIC, HTTP/3) y BGP",
    rule: "Terminología de transporte, multiplexación y enrutamiento interdominio",
    explanation: "Explica head-of-line blocking, 0-RTT handshakes, congestión TCP vs UDP sobre QUIC y convergencia de tablas BGP.",
    formula: "Protocol Layer + Handshake Mechanics + Congestion Control + Transport Invariant",
    correct: "HTTP/3 leverages QUIC over UDP to eliminate head-of-line blocking across multiplexed data streams.",
    incorrect: "HTTP/3 uses UDP so streams not block each other.",
    whyIncorrect: "'Leverages QUIC over UDP to eliminate head-of-line blocking across multiplexed data streams' es la formulación técnica exacta.",
    trickyWord: "Throughput", ipa: "/ˈθruː.pʊt/", soundsLike: "zrúu-put (lengua entre dientes)",
    vocabTerm: "Multiplexing", vocabDef: "Transmisión de múltiples flujos de datos independientes por un único canal de red.", techContext: "QUIC multiplexing prevents single packet loss from stalling other streams.",
    builderTokens: ["QUIC", "eliminates", "head-of-line", "blocking", "over", "UDP", "streams"],
    builderDistractors: ["stops blocking", "eliminate"]
  },
  40: {
    phase: "p5", cefr: "C1",
    title: "Consultoría Técnica, Deuda Técnica y Presentaciones a C-Level",
    rule: "Traducir complejidad de ingeniería a impacto financiero y estratégico (ROI, SLO, TCO)",
    explanation: "Comunica el costo de oportunidad de la deuda técnica frente a la velocidad de entrega y el riesgo de seguridad a ejecutivos.",
    formula: "Technical Debt Metric + Business Risk + Financial Impact + Modernization Roadmap",
    correct: "Refactoring our monolithic billing subsystem will reduce cloud infrastructure expenditure by twenty-two percent while cutting release lead time in half.",
    incorrect: "We should rewrite billing because it has bad code and costs too much.",
    whyIncorrect: "Los líderes ejecutivos requieren cuantificación de reducción de costos ('reduce expenditure by 22%') y velocidad ('cut lead time in half').",
    trickyWord: "Expenditure", ipa: "/ɪkˈspɛn.dɪ.tʃər/", soundsLike: "ik-spén-di-cher",
    vocabTerm: "TCO", vocabDef: "Total Cost of Ownership: costo total de adquisición, operación y mantenimiento.", techContext: "Migrating to managed databases significantly lowers our five-year TCO.",
    builderTokens: ["Refactoring", "the", "service", "cuts", "cloud", "costs", "by", "25%"],
    builderDistractors: ["makes cheap", "cut"]
  },
  41: {
    phase: "p6", cefr: "C2",
    title: "Lectura Crítica y Desglose de Papers de Investigación (ACM / IEEE)",
    rule: "Análisis epistemológico de papers: Abstract, Contribution, Methodology, Validity Threats",
    explanation: "Desglosa literatura científica evaluando la solidez de las hipótesis, el diseño experimental y las limitaciones metodológicas.",
    formula: "Research Question + Formal Model + Empirical Setup + Threats to Validity",
    correct: "The authors establish a formal proof of correctness under partial synchrony, demonstrating that the consensus protocol guarantees safety despite Byzantine faults.",
    incorrect: "The paper proves the code works even if servers are evil.",
    whyIncorrect: "La redacción científica universitaria utiliza 'formal proof of correctness under partial synchrony' y 'Byzantine faults'.",
    trickyWord: "Methodology", ipa: "/ˌmɛθ.əˈdɑː.lə.dʒi/", soundsLike: "mez-o-dó-lo-dzhi",
    vocabTerm: "Byzantine", vocabDef: "Tipo de fallo arbitrario o malicioso donde un nodo puede enviar información contradictoria.", techContext: "BFT protocols tolerate up to f Byzantine nodes in a system of 3f+1 validators.",
    builderTokens: ["The", "protocol", "guarantees", "safety", "under", "asynchronous", "network", "partitions"],
    builderDistractors: ["proves code", "guarantee"]
  },
  42: {
    phase: "p6", cefr: "C2",
    title: "Redacción Científica en LaTeX y Demostraciones Formales",
    rule: "Precisión estilística y formulación matemática en publicaciones académicas",
    explanation: "Escribe introducciones de papers, formulación de teoremas, lemas, deducciones inductivas y análisis de complejidad asintótica.",
    formula: "Theorem Statement + Inductive Step + Base Case + Q.E.D. / Conclusion",
    correct: "Let G = (V, E) be a directed acyclic graph. By induction on the topological order of vertices, we prove that the dynamic programming algorithm computes the shortest path in O(V + E) time.",
    incorrect: "We have a graph G and by doing math we show it takes O(V+E) time.",
    whyIncorrect: "Las demostraciones formales exigen rigor algebraico ('Let G be...', 'By induction on...', 'in O(V+E) time').",
    trickyWord: "Topological", ipa: "/ˌtɑː.pəˈlɑː.dʒɪ.kəl/", soundsLike: "to-po-ló-dzhi-kal",
    vocabTerm: "Invariant", vocabDef: "Propiedad lógica que permanece inalterada bajo cualquier transformación válida del sistema.", techContext: "Loop invariants guarantee the correctness of the sorting algorithm.",
    builderTokens: ["By", "induction", "on", "topological", "order,", "we", "prove", "correctness"],
    builderDistractors: ["doing math", "proves"]
  },
  43: {
    phase: "p6", cefr: "C2",
    title: "Keynotes y Conferencias Técnicas Internacionales (Tech Talks)",
    rule: "Oratoria de alto impacto, retórica técnica, modulación y storytelling de ingeniería",
    explanation: "Estructura una charla de 45 minutos cautivando al público con una apertura memorable, desarrollo conceptual y un clímax arquitectónico.",
    formula: "Hook + Problem Space + Paradigm Shift + Concrete Case Study + Call to Action",
    correct: "Today, we are not merely discussing incremental database optimizations; we are fundamentally rethinking how distributed state is synchronized across the edge.",
    incorrect: "Hello everyone, today I will talk about our database and how we made it faster.",
    whyIncorrect: "Un keynote internacional utiliza contraste retórico ('not merely X; we are fundamentally rethinking Y') para cautivar a la audiencia.",
    trickyWord: "Fundamentally", ipa: "/ˌfʌn.dəˈmɛn.t̬əl.i/", soundsLike: "fan-da-mén-ta-li",
    vocabTerm: "Paradigm", vocabDef: "Modelo, patrón o enfoque conceptual que rige el diseño de sistemas.", techContext: "Event sourcing represents a fundamental paradigm shift from CRUD databases.",
    builderTokens: ["We", "are", "fundamentally", "rethinking", "how", "distributed", "state", "synchronizes"],
    builderDistractors: ["talking about", "rethink"]
  },
  44: {
    phase: "p6", cefr: "C2",
    title: "Sesiones Q&A de Alto Nivel y Manejo de Objeciones Hostiles",
    rule: "Defenderse con aplomo ante críticas académicas y contraejemplos de la audiencia",
    explanation: "Agradece la pregunta, reformula la objeción con precisión, delimita los supuestos del modelo y responde con evidencia empírica.",
    formula: "Acknowledge objection + Clarify assumptions + Cite empirical boundary + Invite offline discussion",
    correct: "That is an insightful counterexample. However, our evaluation assumes a bounded network delay model; under adversarial network partitions, we explicitly favor safety over liveness.",
    incorrect: "No, you are wrong because our model works in our tests.",
    whyIncorrect: "El protocolo académico senior valida el contraejemplo ('That is an insightful counterexample') y aclara las condiciones de contorno con elegancia.",
    trickyWord: "Insightful", ipa: "/ˈɪn.saɪt.fəl/", soundsLike: "ín-sait-ful",
    vocabTerm: "Liveness", vocabDef: "Propiedad de que un sistema eventualmente realiza un progreso favorable (algo bueno ocurrirá).", techContext: "Distributed consensus requires proving both safety and liveness invariants.",
    builderTokens: ["That", "is", "an", "insightful", "question", "regarding", "system", "liveness"],
    builderDistractors: ["You wrong", "insights"]
  },
  45: {
    phase: "p6", cefr: "C2",
    title: "Filosofía de la Computación, Ética en IA y Límites de la Computabilidad",
    rule: "Discusión filosófica sobre tesis de Church-Turing, P vs NP y alineación ética",
    explanation: "Argumenta sobre la decidibilidad, el problema de la parada de Turing (Halting Problem), soberanía de datos y marcos de gobernanza algorítmica.",
    formula: "Epistemic Premise + Computational Limit + Ethical Implication + Philosophical Synthesis",
    correct: "The undecidability of the halting problem underscores an intrinsic theoretical boundary: static program analysis can never achieve both completeness and soundness for arbitrary Turing-complete languages.",
    incorrect: "Turing proved that computers cannot know if programs will stop or not forever.",
    whyIncorrect: "'The undecidability of the halting problem underscores an intrinsic theoretical boundary' expresa con exactitud filosófica y matemática los límites de la computación.",
    trickyWord: "Undecidability", ipa: "/ˌʌn.dɪˌsaɪ.dəˈbɪl.ə.ti/", soundsLike: "an-di-sai-da-bíl-i-ti",
    vocabTerm: "Soundness", vocabDef: "Corrección lógica: si el análisis afirma que una propiedad se cumple, es absolutamente verdadera (sin falsos positivos).", techContext: "Type checkers prioritize soundness to guarantee memory safety at runtime.",
    builderTokens: ["Static", "analysis", "cannot", "achieve", "both", "completeness", "and", "soundness"],
    builderDistractors: ["Turing said", "sound"]
  },
  46: {
    phase: "p7", cefr: "B2–C2",
    title: "Simulación de Semana Laboral Global (The Silicon Valley Sprint)",
    rule: "Inmersión total de 5 días en flujos reales de una empresa multinacional de software",
    explanation: "Día 1: Sprint Planning & Ticket Triage. Día 2: RFC Defense & Pair Programming. Día 3: PR Code Review & Conflict Resolution. Día 4: P0 War Room & Post-Mortem. Día 5: Sprint Demo to VP of Engineering.",
    formula: "Day 1 (Plan) -> Day 2 (Design) -> Day 3 (Review) -> Day 4 (Triage) -> Day 5 (Deliver)",
    correct: "Across the five-day lifecycle, the engineer transitions from asynchronous requirement analysis to real-time incident command and executive demonstration.",
    incorrect: "In this level you do many works like in a real job.",
    whyIncorrect: "La descripción pedagógica refleja la alternancia real de registros lingüísticos requeridos en el trabajo global.",
    trickyWord: "Lifecycle", ipa: "/ˈlaɪfˌsaɪ.kəl/", soundsLike: "láif-sai-kl",
    vocabTerm: "On-call", vocabDef: "Guardia técnica activa para responder ante incidencias de producción 24/7.", techContext: "The primary on-call engineer acknowledged the P0 pager alert in three minutes.",
    builderTokens: ["The", "on-call", "engineer", "triaged", "the", "P0", "incident", "promptly"],
    builderDistractors: ["did work", "triage"]
  },
  47: {
    phase: "p7", cefr: "B2–C2",
    title: "Capstone Internacional: Defensa Técnica de Proyecto Open-Source",
    rule: "Graduación y defensa integral: README, ADRs, Arquitectura, Video Demo y Q&A en vivo",
    explanation: "El proyecto culminante integra todas las competencias lingüísticas, fonéticas, técnicas y académicas desarrolladas de E00 a E47.",
    formula: "Open-Source Repo + Architecture Document + Video Technical Walkthrough + Oral Defense",
    correct: "The student delivers a production-grade open-source artifact accompanied by architectural decision records and defends the design before a technical panel.",
    incorrect: "The student finishes the project and talks about it.",
    whyIncorrect: "El Capstone representa una graduación rigurosa de estándar internacional para computación e ingeniería.",
    trickyWord: "Polymorphism", ipa: "/ˌpɑː.liˈmɔːr.fɪ.zəm/", soundsLike: "pó-li-mor-fi-zəm",
    vocabTerm: "Capstone", vocabDef: "Proyecto final integrador que demuestra la maestría completa de un plan de estudios.", techContext: "The capstone project is evaluated on correctness, scalability, and technical communication.",
    builderTokens: ["The", "author", "defends", "the", "architecture", "before", "the", "committee"],
    builderDistractors: ["talks about", "defended"]
  },
}

// Llenar los niveles E06 a E47 proceduralmente
for (let i = 6; i < 48; i++) {
  const code = `E${String(i).padStart(2, "0")}`
  const theme = levelThemesMap[i]
  if (!theme) continue

  englishLevelsV51.push({
    code,
    title: theme.title,
    phase: theme.phase,
    cefr: theme.cefr,
    goal: `Dominar la comunicación técnica y profesional para ${theme.title.toLowerCase()} con precisión lingüística.`,
    teacher: {
      todayLearn: `Aprenderás a aplicar ${theme.rule.toLowerCase()} en contextos reales de ingeniería de software y sistemas.`,
      priorKnowledge: `Conceptos fundamentales de las lecciones previas (E00–E${String(i - 1).padStart(2, "0")}).`,
      spanishAnalogy: `En español esta estructura suele expresarse con perífrasis o subjuntivo; en inglés se utiliza una formulación más directa y estructurada.`,
      coreExplanation: theme.explanation,
      spanishTrap: `Evita traducir palabra por palabra desde el español; utiliza las estructuras fijas de la ingeniería en inglés.`,
      proTip: `Practica en voz alta las oraciones idiomáticas prestando atención a la acentuación de ${theme.trickyWord}.`,
    },
    phonetics: {
      ipa: theme.ipa,
      soundsLike: theme.soundsLike,
      guide: `Articulación de términos técnicos especializados en ${theme.title}. Cuida la entonación y acentuación léxica.`,
      trickyWords: [
        { word: theme.trickyWord, ipa: theme.ipa, soundsLike: theme.soundsLike, tip: `Acento principal en la sílaba destacada.` },
        { word: theme.vocabTerm, ipa: `/${theme.vocabTerm.toLowerCase()}/`, soundsLike: theme.vocabTerm.toLowerCase(), tip: `Término clave del dominio.` },
      ],
      tip: `Escucha atentamente el audio nativo y modula a velocidad reducida antes de practicar con el micrófono.`,
    },
    grammar: {
      rule: theme.rule,
      explanation: theme.explanation,
      formula: theme.formula,
      dailyExample: `Everyday example: She prepares the documentation before the deadline.`,
      techExample: theme.correct,
      correct: theme.correct,
      incorrect: theme.incorrect,
      whyIncorrect: theme.whyIncorrect,
    },
    exercises: [
      {
        id: `${code.toLowerCase()}-ex1`,
        type: "multiple-choice",
        instruction: `Selecciona la opción redactada con estándar profesional para ${theme.title}:`,
        prompt: `¿Cuál de las siguientes oraciones es correcta?`,
        options: [
          { text: theme.correct, isCorrect: true, explanation: `¡Excelente! Respeta la regla: ${theme.rule}.` },
          { text: theme.incorrect, isCorrect: false, explanation: `Incorrecto: ${theme.whyIncorrect}` },
        ],
        correctAnswer: theme.correct,
        pedagogicalFeedback: `Fórmula a recordar: ${theme.formula}`,
        ruleReminder: theme.rule,
      },
      {
        id: `${code.toLowerCase()}-ex2`,
        type: "reorder",
        instruction: `Sentence Builder: Construye la frase de ingeniería ordenando los bloques sintácticos:`,
        prompt: `Construye la oración clave del nivel`,
        tokens: theme.builderTokens,
        distractors: theme.builderDistractors,
        correctAnswer: theme.builderTokens.join(" "),
        pedagogicalFeedback: `¡Excelente ensamblaje sintáctico! Estructura: ${theme.formula}`,
        ruleReminder: theme.rule,
      },
      {
        id: `${code.toLowerCase()}-ex3`,
        type: "fill-blank",
        instruction: `Completa con el término técnico adecuado:`,
        prompt: `The engineer analyzed the system to identify the ___.`,
        options: [
          { text: theme.vocabTerm.toLowerCase(), isCorrect: true, explanation: `¡Muy bien! '${theme.vocabTerm}' encaja perfectamente en el contexto técnico.` },
          { text: "random error", isCorrect: false, explanation: `Menos preciso. En este contexto se busca un término formal de ingeniería.` },
        ],
        correctAnswer: theme.vocabTerm.toLowerCase(),
        pedagogicalFeedback: `${theme.vocabTerm}: ${theme.vocabDef}`,
        ruleReminder: `Vocabulario de dominio: ${theme.vocabTerm}.`,
      },
    ],
    dialogue: {
      title: `Conversación técnica sobre ${theme.title}`,
      context: `Dos ingenieros revisan decisiones de arquitectura y código en producción.`,
      turns: [
        { speaker: "Lead", text: theme.correct, translation: "Traducción formal de la directiva técnica." },
        { speaker: "Staff", text: "Understood. Let us document the implications in the project tracker.", translation: "Entendido. Documentemos las implicaciones en el registro del proyecto." },
      ],
    },
    vocabulary: [
      {
        term: theme.vocabTerm,
        ipa: theme.ipa,
        soundsLike: theme.soundsLike,
        definition: theme.vocabDef,
        dailyContext: `A clear ${theme.vocabTerm.toLowerCase()} helps everyone understand.`,
        techContext: theme.techContext,
      },
    ],
    writingTask: {
      prompt: `Escribe una justificación técnica breve (25-40 palabras) aplicando ${theme.rule.toLowerCase()}.`,
      template: theme.correct,
      keywords: [theme.vocabTerm.toLowerCase(), "system", "performance"],
      minWords: 20,
      guidelines: ["Usa oraciones completas con sujeto y verbo explícito.", "Aplica la fórmula aprendida."],
    },
    project: `Explicar oralmente un caso de uso de ${theme.title} y validar la pronunciación en el Speech Lab.`,
    sources: ["mit-eecs-writing", "google-tech-writing", "rfc-2119"],
  })
}

export const allEnglishLevelsV51 = englishLevelsV51

export function getEnglishLevelV51(code: string): EnglishLevelV51 | undefined {
  return englishLevelsV51.find((lvl) => lvl.code.toLowerCase() === code.toLowerCase())
}

export function getEnglishLevelsByPhaseV51(phaseId: string): EnglishLevelV51[] {
  return englishLevelsV51.filter((lvl) => lvl.phase === phaseId)
}

// ============================================================================
// DICCIONARIO TÉCNICO VERIFICADO (COMPUTING LEXICON)
// ============================================================================

export const computingLexiconV51: EnglishLexiconTermV51[] = [
  // Símbolos y Caracteres de Código
  {
    id: "lex-curly-braces",
    term: "Curly braces {}",
    ipa: "/ˈkɜːr.li ˈbreɪ.sɪz/",
    soundsLike: "kér-li bréi-siz",
    category: "swe",
    definition: "Llaves {} usadas para delimitar bloques de código en lenguajes como C, JS, Rust y Java.",
    exampleSentence: "Enclose the loop body inside curly braces.",
    mistakeWarning: "No pronuncies 'braces' con vocal corta 'bracks'; lleva diptongo /eɪ/: 'bréi-siz'.",
  },
  {
    id: "lex-square-brackets",
    term: "Square brackets []",
    ipa: "/ˌskwer ˈbræk.ɪts/",
    soundsLike: "skwer brák-its",
    category: "swe",
    definition: "Corchetes [] usados para indexar arrays y declarar listas.",
    exampleSentence: "Access array elements using square brackets.",
    mistakeWarning: "'Bracket' lleva vocal corta: 'brák-it'.",
  },
  {
    id: "lex-parentheses",
    term: "Parentheses ()",
    ipa: "/pəˈrɛn.θə.siːz/",
    soundsLike: "pa-rén-ze-siiz",
    category: "swe",
    definition: "Paréntesis () usados para agrupar expresiones y pasar argumentos a funciones.",
    exampleSentence: "Pass arguments inside parentheses after the function name.",
    mistakeWarning: "Plural: 'pa-rén-ze-siiz' (termina en 'iiz'). Singular: 'pa-rén-ze-sis'.",
  },
  {
    id: "lex-backslash",
    term: "Backslash \\",
    ipa: "/ˈbæk.slæʃ/",
    soundsLike: "bák-slash",
    category: "systems",
    definition: "Barra invertida \\ usada para caracteres de escape (\\n, \\t) y rutas en Windows.",
    exampleSentence: "Escape double quotes inside a string with a backslash.",
    mistakeWarning: "No confundir con forward slash (/); 'backslash' va de arriba-izquierda a abajo-derecha.",
  },
  {
    id: "lex-forward-slash",
    term: "Slash / Forward slash /",
    ipa: "/ˈfɔːr.wərd slæʃ/",
    soundsLike: "fór-ward slash",
    category: "networks",
    definition: "Barra diagonal / usada en URLs, rutas Unix y división aritmética.",
    exampleSentence: "Separate URL path segments with a forward slash.",
  },
  {
    id: "lex-pipe",
    term: "Pipe |",
    ipa: "/paɪp/",
    soundsLike: "paip",
    category: "systems",
    definition: "Operador de tubería | en Unix que conecta la salida estándar de un comando a la entrada de otro.",
    exampleSentence: "Pipe the output of cat to grep to filter logs.",
    mistakeWarning: "Pronunciación: 'paip' (/paɪp/).",
  },
  {
    id: "lex-ampersand",
    term: "Ampersand &",
    ipa: "/ˈæm.pər.sænd/",
    soundsLike: "ám-per-sand",
    category: "swe",
    definition: "Símbolo & usado para operaciones binarias AND a nivel de bits y en operadores lógicos (&&).",
    exampleSentence: "Use a double ampersand for logical AND in JavaScript.",
    mistakeWarning: "Acento en la primera sílaba: 'ám-per-sand'.",
  },

  // Software Engineering & OOP
  {
    id: "lex-polymorphism",
    term: "Polymorphism",
    ipa: "/ˌpɑː.liˈmɔːr.fɪ.zəm/",
    soundsLike: "po-li-mór-fi-zəm",
    category: "swe",
    definition: "Capacidad de tratar objetos de diferentes clases a través de una interfaz común.",
    exampleSentence: "Polymorphism enables dynamic dispatch of method calls at runtime.",
    mistakeWarning: "Acento en 'mor': 'po-li-mór-fi-zəm'.",
  },
  {
    id: "lex-idempotent",
    term: "Idempotent",
    ipa: "/ˌaɪ.dəmˈpoʊ.tənt/",
    soundsLike: "ai-dem-póu-tent",
    category: "swe",
    definition: "Operación que produce el mismo resultado si se ejecuta una o múltiples veces consecutivas (ej. HTTP PUT/DELETE).",
    exampleSentence: "Payment processing webhooks must be strictly idempotent.",
    mistakeWarning: "Inicia con 'ai' (/aɪ/), no con 'i' española.",
  },
  {
    id: "lex-asynchronous",
    term: "Asynchronous",
    ipa: "/eɪˈsɪŋ.krə.nəs/",
    soundsLike: "ei-sín-cro-nas",
    category: "swe",
    definition: "Ejecución que ocurre independientemente del hilo principal sin bloquear el flujo.",
    exampleSentence: "Use asynchronous IO to serve thousands of concurrent clients.",
    mistakeWarning: "Inicia con 'ei' (/eɪ/), no con 'a' corta.",
  },
  {
    id: "lex-recursion",
    term: "Recursion",
    ipa: "/rɪˈkɜːr.ʒən/",
    soundsLike: "ri-kér-zhon",
    category: "swe",
    definition: "Técnica donde una función se llama a sí misma para resolver subproblemas más pequeños.",
    exampleSentence: "Ensure the base case is reachable to prevent infinite recursion.",
    mistakeWarning: "Termina en sonido suave 'zhon' (/ʒən/), no 'ción'.",
  },
  {
    id: "lex-immutable",
    term: "Immutable",
    ipa: "/ɪˈmjuː.t̬ə.bəl/",
    soundsLike: "i-miú-ta-bl",
    category: "swe",
    definition: "Objeto o estructura de datos cuyo estado no puede modificarse después de ser creado.",
    exampleSentence: "Strings in Python and Java are immutable by design.",
    mistakeWarning: "La 'u' suena 'miu' (/mjuː/).",
  },

  // Systems, OS & Hardware
  {
    id: "lex-kernel",
    term: "Kernel",
    ipa: "/ˈkɜːr.nəl/",
    soundsLike: "kér-nel",
    category: "systems",
    definition: "Núcleo central del sistema operativo que gestiona la memoria, CPU y periféricos.",
    exampleSentence: "The Linux kernel handles process scheduling and hardware drivers.",
    mistakeWarning: "Suena exactamente igual que 'colonel': 'kér-nel'.",
  },
  {
    id: "lex-daemon",
    term: "Daemon",
    ipa: "/ˈdiː.mən/",
    soundsLike: "dii-mon (como demon)",
    category: "systems",
    definition: "Proceso en segundo plano en sistemas Unix que se ejecuta sin control interactivo.",
    exampleSentence: "The sshd daemon listens for incoming secure shell connections.",
    mistakeWarning: "Se pronuncia exactamente como 'demon': 'dii-mon', no 'da-e-mon'.",
  },
  {
    id: "lex-throughput",
    term: "Throughput",
    ipa: "/ˈθruː.pʊt/",
    soundsLike: "zrúu-put",
    category: "systems",
    definition: "Tasa de trabajo o volumen de datos procesados exitosamente por unidad de tiempo.",
    exampleSentence: "Batching disk writes significantly increases database throughput.",
    mistakeWarning: "Inicia con lengua entre dientes (/θ/) y 'u' larga: 'zrúu-put'.",
  },
  {
    id: "lex-thread",
    term: "Thread",
    ipa: "/θrɛd/",
    soundsLike: "zred",
    category: "systems",
    definition: "Unidad mínima de ejecución programable dentro de un proceso del sistema operativo.",
    exampleSentence: "Spawn a separate worker thread to avoid freezing the UI.",
    mistakeWarning: "Inicia con lengua entre dientes (/θ/): 'zred' (no 'tred').",
  },
  {
    id: "lex-deadlock",
    term: "Deadlock",
    ipa: "/ˈdɛd.lɑːk/",
    soundsLike: "déd-lok",
    category: "systems",
    definition: "Bloqueo mutuo donde dos procesos esperan indefinidamente recursos retenidos por el otro.",
    exampleSentence: "Acquire locks in a strict global order to prevent deadlocks.",
  },
  {
    id: "lex-cache",
    term: "Cache",
    ipa: "/kæʃ/",
    soundsLike: "kash (como cash/dinero)",
    category: "systems",
    definition: "Almacenamiento de acceso ultra-rápido que guarda copias de datos frecuentemente consultados.",
    exampleSentence: "Check the local cache before making an expensive network call.",
    mistakeWarning: "Se pronuncia exactamente como 'cash': /kæʃ/, nunca 'ca-ché'.",
  },

  // Networks & Protocols
  {
    id: "lex-latency",
    term: "Latency",
    ipa: "/ˈleɪ.tən.si/",
    soundsLike: "léi-ten-si",
    category: "networks",
    definition: "Tiempo que tarda un paquete de datos en viajar desde el cliente hasta el servidor.",
    exampleSentence: "Edge caching reduces round-trip latency for international users.",
    mistakeWarning: "Primera sílaba con 'ei': 'léi-ten-si', no 'la-ten-si'.",
  },
  {
    id: "lex-bandwidth",
    term: "Bandwidth",
    ipa: "/ˈbænd.wɪdθ/",
    soundsLike: "bánd-wids",
    category: "networks",
    definition: "Capacidad máxima de transferencia de datos en un canal de comunicación.",
    exampleSentence: "Streaming high-definition video requires sufficient network bandwidth.",
  },
  {
    id: "lex-handshake",
    term: "Handshake",
    ipa: "/ˈhænd.ʃeɪk/",
    soundsLike: "jánd-sheik",
    category: "networks",
    definition: "Protocolo de negociación automatizado para sincronizar parámetros entre dos terminales.",
    exampleSentence: "TLS 1.3 optimizes the cryptographic handshake to a single round trip.",
  },

  // Databases
  {
    id: "lex-sharding",
    term: "Sharding",
    ipa: "/ˈʃɑːr.dɪŋ/",
    soundsLike: "shár-ding",
    category: "databases",
    definition: "Particionado horizontal de bases de datos que reparte filas entre servidores independientes.",
    exampleSentence: "We shard our user database by country ID to scale write throughput.",
    mistakeWarning: "Inicia con 'sh' suave (/ʃ/), no con 'ch' fuerte.",
  },
  {
    id: "lex-acid",
    term: "ACID",
    ipa: "/ˈæs.ɪd/",
    soundsLike: "á-sid",
    category: "databases",
    definition: "Conjunto de propiedades transaccionales: Atomicity, Consistency, Isolation, Durability.",
    exampleSentence: "Relational database engines provide full ACID transaction guarantees.",
  },

  // Security & AppSec
  {
    id: "lex-vulnerability",
    term: "Vulnerability",
    ipa: "/ˌvʌl.nər.əˈbɪl.ə.ti/",
    soundsLike: "val-ner-a-bíl-i-ti",
    category: "security",
    definition: "Fallo o debilidad de seguridad en el diseño o código que puede ser explotado.",
    exampleSentence: "Apply the vendor patch to fix the remote code execution vulnerability.",
    mistakeWarning: "Acento en 'bil': 'val-ner-a-bíl-i-ti'.",
  },
  {
    id: "lex-cryptography",
    term: "Cryptography",
    ipa: "/krɪpˈtɑː.ɡrə.fi/",
    soundsLike: "crip-tó-gra-fi",
    category: "security",
    definition: "Estudio y aplicación de algoritmos matemáticos para proteger la privacidad e integridad de datos.",
    exampleSentence: "Public key cryptography secures encrypted HTTPS traffic.",
    mistakeWarning: "Acento en 'to': 'crip-tó-gra-fi'.",
  },

  // Cloud & DevOps
  {
    id: "lex-kubernetes",
    term: "Kubernetes",
    ipa: "/ˌkuː.bərˈnɛt.iːz/",
    soundsLike: "ku-ber-né-tiis",
    category: "cloud",
    definition: "Orquestador open-source de contenedores para automatizar despliegues y escalabilidad.",
    exampleSentence: "Kubernetes manages pod replication across multiple cloud zones.",
    mistakeWarning: "Termina en 'tiis' (/iːz/), no 'cu-ber-nets'.",
  },
  {
    id: "lex-serverless",
    term: "Serverless",
    ipa: "/ˈsɜːr.vər.ləs/",
    soundsLike: "sér-ver-les",
    category: "cloud",
    definition: "Modelo donde el proveedor de nube ejecuta el código asignando recursos bajo demanda.",
    exampleSentence: "Serverless functions automatically scale to zero when idle.",
  },

  // AI & Data
  {
    id: "lex-gradient-descent",
    term: "Gradient Descent",
    ipa: "/ˈɡreɪ.di.ənt dɪˈsɛnt/",
    soundsLike: "gréi-di-ent di-sént",
    category: "ai",
    definition: "Algoritmo de optimización iterativo para minimizar la función de pérdida de un modelo.",
    exampleSentence: "Stochastic gradient descent updates weights using mini-batches.",
  },
  {
    id: "lex-inference",
    term: "Inference",
    ipa: "/ˈɪn.fər.əns/",
    soundsLike: "ín-fer-ens",
    category: "ai",
    definition: "Fase en la que un modelo de IA entrenado procesa nuevas entradas para generar predicciones.",
    exampleSentence: "Quantization reduces memory requirements and accelerates inference.",
    mistakeWarning: "Acento en la primera sílaba: 'ín-fer-ens'.",
  },
]
