import { useState, useRef, useEffect, useMemo } from "react"
import {
  Volume2,
  Mic,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Headphones,
  FileText,
  Zap,
  Sparkles,
  Layers,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  GraduationCap,
  AlertCircle,
  Lightbulb,
  Check,
} from "lucide-react"
import {
  type EnglishLevelV51,
  type EnglishExerciseV51,
  type PronunciationScoreResult,
  allEnglishLevelsV51,
  getEnglishLevelV51,
  evaluatePronunciation,
} from "../v51/english-curriculum-v51"
import EnglishWritingStudioV52 from "./EnglishWritingStudioV52"

type RecognitionResult = { transcript: string }
type RecognitionEvent = { results: ArrayLike<{ 0: RecognitionResult }> }
type RecognitionLike = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}
type RecognitionCtor = new () => RecognitionLike

type SpeechWindow = Window & {
  SpeechRecognition?: RecognitionCtor
  webkitSpeechRecognition?: RecognitionCtor
}

function AudioWave({ isPlaying }: { isPlaying: boolean }) {
  const heights = [0.35, 0.9, 0.55, 1.0, 0.7]
  return (
    <div className={`v52-audio-wave ${isPlaying ? "playing" : ""}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className="v52-wave-bar"
          style={
            {
              "--wave-i": i,
              "--wave-h": h,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

function SparkleBadge({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="v52-sparkle-cluster" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          className="v52-sparkle-star"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      ))}
    </div>
  )
}

// ============================================================================
// COMPONENTE: SENTENCE REORDER / BUILDER (Duolingo-Style sin dependencias)
// ============================================================================

interface WordToken {
  id: string
  text: string
}

function SentenceBuilderComponent({
  exercise,
  onComplete,
  speakText,
}: {
  exercise: EnglishExerciseV51
  onComplete: (isCorrect: boolean) => void
  speakText: (text: string) => void
}) {
  const initialPool = useMemo(() => {
    const rawTokens = (exercise.tokens || exercise.correctAnswer.split(" ")).concat(
      exercise.distractors || []
    )
    return rawTokens
      .map((text, idx) => ({ id: `token-${exercise.id}-${idx}-${text}`, text, idx }))
      .sort((a, b) => ((a.idx * 17 + a.text.length) % 7) - ((b.idx * 17 + b.text.length) % 7))
  }, [exercise])

  const [availableTokens, setAvailableTokens] = useState<WordToken[]>(initialPool)
  const [selectedTokens, setSelectedTokens] = useState<WordToken[]>([])
  const [evaluated, setEvaluated] = useState<boolean | null>(null)

  // Reset when exercise changes
  useEffect(() => {
    setAvailableTokens(initialPool)
    setSelectedTokens([])
    setEvaluated(null)
  }, [initialPool])

  const handleSelect = (token: WordToken) => {
    if (evaluated !== null) return
    setAvailableTokens((prev) => prev.filter((t) => t.id !== token.id))
    setSelectedTokens((prev) => [...prev, token])
  }

  const handleDeselect = (token: WordToken) => {
    if (evaluated !== null) return
    setSelectedTokens((prev) => prev.filter((t) => t.id !== token.id))
    setAvailableTokens((prev) => [...prev, token])
  }

  const handleVerify = () => {
    const constructed = selectedTokens.map((t) => t.text).join(" ").trim()
    const target = exercise.correctAnswer.trim()
    // Compare ignoring case and end punctuation differences
    const cleanConstructed = constructed.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "")
    const cleanTarget = target.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "")
    const isMatch = cleanConstructed === cleanTarget

    setEvaluated(isMatch)
    onComplete(isMatch)
    if (isMatch) {
      speakText(exercise.correctAnswer)
    }
  }

  const handleReset = () => {
    setAvailableTokens(initialPool)
    setSelectedTokens([])
    setEvaluated(null)
  }

  return (
    <div className="v52-builder-box">
      <div className="v52-builder-header">
        <span className="v52-panel-tag">CONSTRUCTOR SINTÁCTICO</span>
        <p className="v52-exercise-instruction">{exercise.instruction}</p>
        <h4 className="v52-builder-prompt">{exercise.prompt}</h4>
      </div>

      {/* Target Construction Tray */}
      <div
        className={`v52-target-tray ${
          evaluated === true ? "is-correct" : evaluated === false ? "is-incorrect" : ""
        }`}
      >
        {selectedTokens.length === 0 ? (
          <span className="v52-tray-placeholder">
            Haz clic en las palabras abajo para ensamblar la oración en orden...
          </span>
        ) : (
          <div className="v52-tray-tokens">
            {selectedTokens.map((token) => (
              <button
                key={token.id}
                className="v52-word-token in-tray"
                onClick={() => handleDeselect(token)}
                disabled={evaluated !== null}
                title="Haz clic para quitar"
              >
                {token.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Available Word Pool */}
      <div className="v52-token-pool">
        {availableTokens.map((token) => (
          <button
            key={token.id}
            className="v52-word-token in-pool"
            onClick={() => handleSelect(token)}
            disabled={evaluated !== null}
            title="Haz clic para agregar"
          >
            {token.text}
          </button>
        ))}
      </div>

      {/* Action & Feedback Footer */}
      <div className="v52-builder-footer">
        {evaluated === null ? (
          <button
            className="v52-action-btn primary"
            onClick={handleVerify}
            disabled={selectedTokens.length === 0}
          >
            <Check size={16} /> Comprobar Estructura
          </button>
        ) : (
          <div className={`v52-builder-feedback ${evaluated ? "correct" : "incorrect"}`}>
            <div className="v52-feedback-top">
              {evaluated ? (
                <>
                  <CheckCircle2 size={20} />
                  <b>¡Excelente! Sintaxis correcta y precisa.</b>
                </>
              ) : (
                <>
                  <XCircle size={20} />
                  <b>Estructura incorrecta. Respuesta esperada: "{exercise.correctAnswer}"</b>
                </>
              )}
            </div>
            <p className="v52-feedback-tip">{exercise.pedagogicalFeedback}</p>
            <div className="v52-builder-actions-row">
              <button
                className="v52-mini-speak"
                onClick={() => speakText(exercise.correctAnswer)}
              >
                <Volume2 size={15} /> Escuchar frase modelo
              </button>
              {!evaluated && (
                <button className="v52-retry-btn" onClick={handleReset}>
                  <RotateCcw size={14} /> Intentar de nuevo
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL: ENGLISH CLASSROOM V52
// ============================================================================

export default function EnglishClassroomV52({
  initialLevelCode = "E00",
  onBackToHub,
}: {
  initialLevelCode?: string
  onBackToHub: () => void
}) {
  const [activeCode, setActiveCode] = useState(initialLevelCode)
  const [activeTab, setActiveTab] = useState<"teacher" | "phonetics" | "grammar" | "exercises" | "roleplay" | "vocabulary" | "writing">("teacher")
  const [speechRate, setSpeechRate] = useState<number>(0.85)
  const [showTranslations, setShowTranslations] = useState(true)
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null)

  // Exercises interactive state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<string, { isCorrect: boolean; feedback: string }>>({})

  // Speech recognition & detailed phonetic scoring state
  const [isListening, setIsListening] = useState(false)
  const [spokenText, setSpokenText] = useState("")
  const [pronunciationResult, setPronunciationResult] = useState<PronunciationScoreResult | null>(null)
  const recognitionRef = useRef<RecognitionLike | null>(null)

  const currentLevel: EnglishLevelV51 = getEnglishLevelV51(activeCode) || allEnglishLevelsV51[0]
  const currentIndex = allEnglishLevelsV51.findIndex((l) => l.code === currentLevel.code)

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
      recognitionRef.current?.stop()
    }
  }, [activeCode])

  const changeLevel = (newCode: string) => {
    setActiveCode(newCode)
    setSelectedAnswers({})
    setExerciseFeedback({})
    setSpokenText("")
    setPronunciationResult(null)
    setIsListening(false)
    setCurrentlySpeaking(null)
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
  }

  const speak = (text: string, customRate?: number, keyId?: string) => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = customRate ?? speechRate
    
    setCurrentlySpeaking(keyId || text)
    utterance.onend = () => {
      setCurrentlySpeaking(null)
    }
    utterance.onerror = () => {
      setCurrentlySpeaking(null)
    }
    window.speechSynthesis.speak(utterance)
  }

  const handleSelectOption = (exercise: EnglishExerciseV51, optionIndex: number) => {
    const option = exercise.options?.[optionIndex]
    if (!option) return

    setSelectedAnswers((prev) => ({ ...prev, [exercise.id]: optionIndex }))
    setExerciseFeedback((prev) => ({
      ...prev,
      [exercise.id]: {
        isCorrect: option.isCorrect,
        feedback: option.explanation,
      },
    }))
  }

  const handleResetExercise = (exerciseId: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev }
      delete next[exerciseId]
      return next
    })
    setExerciseFeedback((prev) => {
      const next = { ...prev }
      delete next[exerciseId]
      return next
    })
  }

  const startVoiceRecognition = (targetText: string) => {
    const win = window as SpeechWindow
    const Recognition = win.SpeechRecognition || win.webkitSpeechRecognition

    if (!Recognition) {
      alert("El reconocimiento de voz Web Speech API no está habilitado en este navegador. Te recomendamos usar Google Chrome, Microsoft Edge o Safari.")
      return
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }

      const recognition = new Recognition()
      recognition.lang = "en-US"
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event: RecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript || ""
        setSpokenText(transcript)
        const evalResult = evaluatePronunciation(targetText, transcript)
        setPronunciationResult(evalResult)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      setIsListening(true)
      setSpokenText("")
      setPronunciationResult(null)
      recognition.start()
    } catch {
      setIsListening(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      changeLevel(allEnglishLevelsV51[currentIndex - 1].code)
    }
  }

  const handleNext = () => {
    if (currentIndex < allEnglishLevelsV51.length - 1) {
      changeLevel(allEnglishLevelsV51[currentIndex + 1].code)
    }
  }

  return (
    <div className="v52-classroom-root v52-fade-in" data-phase={currentLevel.phase}>
      {/* Top Header Navigation */}
      <header className="v52-classroom-header">
        <div className="v52-header-left">
          <button className="v52-back-btn" onClick={onBackToHub}>
            <ArrowLeft size={16} /> Volver a Escuela
          </button>
          <div className="v52-level-badge-container">
            <span className="v52-cefr-pill">{currentLevel.cefr}</span>
            <span className="v52-level-code">{currentLevel.code}</span>
          </div>
          <h2>{currentLevel.title}</h2>
        </div>

        <div className="v52-header-nav">
          <div className="v52-level-jump">
            <select
              value={currentLevel.code}
              onChange={(e) => changeLevel(e.target.value)}
              className="v52-select-level"
            >
              {allEnglishLevelsV51.map((lvl) => (
                <option key={lvl.code} value={lvl.code}>
                  {lvl.code} · {lvl.cefr} - {lvl.title}
                </option>
              ))}
            </select>
          </div>
          <button
            className="v52-nav-arrow"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            title="Nivel anterior"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            className="v52-nav-arrow"
            onClick={handleNext}
            disabled={currentIndex === allEnglishLevelsV51.length - 1}
            title="Siguiente nivel"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Classroom Main Layout */}
      <div className="v52-classroom-layout">
        {/* Navigation Sidebar */}
        <aside className="v52-classroom-sidebar">
          <div className="v52-sidebar-header">
            <span className="v52-sidebar-phase">{currentLevel.phase.toUpperCase()} · {currentLevel.cefr}</span>
            <h4>{currentLevel.title}</h4>
            <p className="v52-sidebar-goal">{currentLevel.goal}</p>
          </div>

          <div className="v52-speed-control">
            <label>Velocidad de Audio:</label>
            <div className="v52-speed-btns">
              {[0.75, 0.85, 1.0].map((rate) => (
                <button
                  key={rate}
                  className={`v52-speed-btn ${speechRate === rate ? "active" : ""}`}
                  onClick={() => setSpeechRate(rate)}
                >
                  {rate === 0.75 ? "0.75x (Lento)" : rate === 0.85 ? "0.85x (Clase)" : "1.0x (Nativo)"}
                </button>
              ))}
            </div>
          </div>

          <nav className="v52-mode-tabs">
            <button
              className={`v52-tab-btn ${activeTab === "teacher" ? "active" : ""}`}
              onClick={() => setActiveTab("teacher")}
            >
              <GraduationCap size={16} />
              <span>1. Guía del Docente</span>
            </button>
            <button
              className={`v52-tab-btn ${activeTab === "phonetics" ? "active" : ""}`}
              onClick={() => setActiveTab("phonetics")}
            >
              <Headphones size={16} />
              <span>2. Fonética & Speech Lab</span>
            </button>
            <button
              className={`v52-tab-btn ${activeTab === "grammar" ? "active" : ""}`}
              onClick={() => setActiveTab("grammar")}
            >
              <BookOpen size={16} />
              <span>3. Gramática de Software</span>
            </button>
            <button
              className={`v52-tab-btn ${activeTab === "exercises" ? "active" : ""}`}
              onClick={() => setActiveTab("exercises")}
            >
              <Zap size={16} />
              <span>4. Ejercicios & Práctica</span>
            </button>
            <button
              className={`v52-tab-btn ${activeTab === "roleplay" ? "active" : ""}`}
              onClick={() => setActiveTab("roleplay")}
            >
              <Layers size={16} />
              <span>5. Simulador & Diálogos</span>
            </button>
            <button
              className={`v52-tab-btn ${activeTab === "vocabulary" ? "active" : ""}`}
              onClick={() => setActiveTab("vocabulary")}
            >
              <FileText size={16} />
              <span>6. Vocabulario & Lexicón</span>
            </button>
            <button
              className={`v52-tab-btn ${activeTab === "writing" ? "active" : ""}`}
              onClick={() => setActiveTab("writing")}
            >
              <Sparkles size={16} />
              <span>7. Writing Studio & RFC</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="v52-classroom-content">
          {/* TAB 1: GUÍA DEL DOCENTE */}
          {activeTab === "teacher" && (
            <section className="v52-section-panel v52-fade-in">
              <div className="v52-panel-header">
                <div>
                  <span className="v52-panel-tag">METODOLOGÍA PEDAGÓGICA</span>
                  <h3>Guía Paso a Paso del Profesor Universitario</h3>
                </div>
              </div>

              <div className="v52-teacher-grid">
                <article className="v52-teacher-card core v52-stagger-item" style={{ "--stagger-i": 0 } as React.CSSProperties}>
                  <div className="v52-card-icon-title">
                    <GraduationCap size={20} />
                    <h4>¿Qué aprenderás en esta lección?</h4>
                  </div>
                  <p>{currentLevel.teacher.todayLearn}</p>
                </article>

                <article className="v52-teacher-card analogy v52-stagger-item" style={{ "--stagger-i": 1 } as React.CSSProperties}>
                  <div className="v52-card-icon-title">
                    <Lightbulb size={20} />
                    <h4>Analogía con el Español</h4>
                  </div>
                  <p>{currentLevel.teacher.spanishAnalogy}</p>
                </article>

                <article className="v52-teacher-card explanation v52-stagger-item" style={{ "--stagger-i": 2 } as React.CSSProperties}>
                  <div className="v52-card-icon-title">
                    <BookOpen size={20} />
                    <h4>Explicación Conceptual Rigurosa</h4>
                  </div>
                  <p>{currentLevel.teacher.coreExplanation}</p>
                </article>

                <article className="v52-teacher-card trap v52-stagger-item" style={{ "--stagger-i": 3 } as React.CSSProperties}>
                  <div className="v52-card-icon-title">
                    <AlertCircle size={20} />
                    <h4>Trampa Común de Hispanohablantes</h4>
                  </div>
                  <p>{currentLevel.teacher.spanishTrap}</p>
                </article>

                <article className="v52-teacher-card protip v52-stagger-item" style={{ "--stagger-i": 4 } as React.CSSProperties}>
                  <div className="v52-card-icon-title">
                    <Zap size={20} />
                    <h4>Consejo Pro de Ingeniería</h4>
                  </div>
                  <p>{currentLevel.teacher.proTip}</p>
                </article>
              </div>
            </section>
          )}

          {/* TAB 2: FONÉTICA & SPEECH LAB */}
          {activeTab === "phonetics" && (
            <section className="v52-section-panel v52-fade-in">
              <div className="v52-panel-header">
                <div>
                  <span className="v52-panel-tag">ARTICULACIÓN Y FONOLOGÍA</span>
                  <h3>Fonética Técnica y Laboratorio de Pronunciación</h3>
                </div>
              </div>

              {/* Guía Amigable y Aclaración IPA */}
              <div className="v52-phonetics-overview v52-stagger-item" style={{ "--stagger-i": 0 } as React.CSSProperties}>
                <div className="v52-sounds-like-banner">
                  <span className="v52-sounds-label">CÓMO SE PRONUNCIA (GUÍA AMIGABLE EN ESPAÑOL):</span>
                  <div className="v52-sounds-main-row">
                    <h2 className="v52-sounds-text">"{currentLevel.phonetics.soundsLike}"</h2>
                    <button
                      className="v52-hero-audio-btn"
                      onClick={() => speak(currentLevel.dialogue.turns[0]?.text || currentLevel.phonetics.trickyWords[0]?.word || currentLevel.goal, undefined, "hero-phonetics")}
                    >
                      <Volume2 size={18} />
                      <AudioWave isPlaying={currentlySpeaking === "hero-phonetics"} />
                      <span>Escuchar</span>
                    </button>
                  </div>
                </div>

                <div className="v52-ipa-reference-row">
                  <div className="v52-ipa-pill-box">
                    <span className="v52-ipa-badge-title">Notación Fonética Internacional (IPA):</span>
                    <code className="v52-ipa-main">{currentLevel.phonetics.ipa}</code>
                  </div>
                  <p className="v52-ipa-pedagogical-help">
                    💡 <em>¿Qué son esos caracteres extraños?</em> Son símbolos del <strong>Alfabeto Fonético Internacional (IPA)</strong> que usan los diccionarios mundiales para representar sonidos exactos. No necesitas memorizarlos: puedes guiarte directamente por la pronunciación amigable en español que colocamos arriba.
                  </p>
                </div>
                <p className="v52-phonetics-guide">{currentLevel.phonetics.guide}</p>
              </div>

              {/* Palabras Difíciles con Pronunciación en Español */}
              <div className="v52-tricky-words-section v52-stagger-item" style={{ "--stagger-i": 1 } as React.CSSProperties}>
                <h4>Palabras Clave de este Nivel con Pronunciación:</h4>
                <div className="v52-tricky-grid">
                  {currentLevel.phonetics.trickyWords.map((item, idx) => (
                    <div
                      key={idx}
                      className="v52-tricky-card"
                      onClick={() => speak(item.word, undefined, `tricky-${idx}`)}
                    >
                      <div className="v52-tricky-top">
                        <h5>{item.word}</h5>
                        <button className="v52-mini-speak-btn">
                          <Volume2 size={14} />
                          <AudioWave isPlaying={currentlySpeaking === `tricky-${idx}`} />
                        </button>
                      </div>
                      <div className="v52-tricky-sounds-like">
                        <span>Suena:</span>
                        <b>"{item.soundsLike || item.word.toLowerCase()}"</b>
                      </div>
                      <code className="v52-tricky-ipa">{item.ipa}</code>
                      <p className="v52-tricky-tip">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pares Mínimos */}
              {currentLevel.phonetics.minimalPairs && currentLevel.phonetics.minimalPairs.length > 0 && (
                <div className="v52-minimal-pairs-section v52-stagger-item" style={{ "--stagger-i": 2 } as React.CSSProperties}>
                  <h4>Pares Mínimos (Diferenciación de Sonidos Similares):</h4>
                  <div className="v52-pairs-grid">
                    {currentLevel.phonetics.minimalPairs.map((pair, pIdx) => (
                      <div key={pIdx} className="v52-pair-card">
                        <div className="v52-pair-item" onClick={() => speak(pair.wordA, undefined, `pair-a-${pIdx}`)}>
                          <Volume2 size={14} />
                          <AudioWave isPlaying={currentlySpeaking === `pair-a-${pIdx}`} />
                          <b>{pair.wordA}</b>
                          <code>{pair.ipaA}</code>
                        </div>
                        <span className="v52-vs-badge">VS</span>
                        <div className="v52-pair-item" onClick={() => speak(pair.wordB, undefined, `pair-b-${pIdx}`)}>
                          <Volume2 size={14} />
                          <AudioWave isPlaying={currentlySpeaking === `pair-b-${pIdx}`} />
                          <b>{pair.wordB}</b>
                          <code>{pair.ipaB}</code>
                        </div>
                        <p className="v52-pair-diff">{pair.difference}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pronunciation Laboratory & High-Precision Alignment */}
              <div className="v52-speech-lab-card v52-stagger-item" style={{ "--stagger-i": 3 } as React.CSSProperties}>
                <div className="v52-speech-lab-header">
                  <Mic size={20} />
                  <div>
                    <h4>Laboratorio de Pronunciación & Alineación Fonética</h4>
                    <p>
                      Escucha la pronunciación nativa de la frase objetivo y graba tu voz con el micrófono. El evaluador comparará palabra por palabra tu articulación.
                    </p>
                  </div>
                </div>

                <div className="v52-speech-target">
                  <div className="v52-target-phrase-box">
                    <span>Frase objetivo:</span>
                    <h3>"{currentLevel.dialogue.turns[0]?.text || currentLevel.phonetics.trickyWords[0]?.word || currentLevel.goal}"</h3>
                  </div>

                  <div className="v52-speech-actions">
                    <button
                      className="v52-action-btn primary"
                      onClick={() =>
                        speak(
                          currentLevel.dialogue.turns[0]?.text || currentLevel.phonetics.trickyWords[0]?.word || currentLevel.goal,
                          undefined,
                          "target-phrase"
                        )
                      }
                    >
                      <Volume2 size={16} />
                      <AudioWave isPlaying={currentlySpeaking === "target-phrase"} />
                      <span>Escuchar nativo</span>
                    </button>
                    <button
                      className={`v52-action-btn ${isListening ? "listening" : ""}`}
                      onClick={() =>
                        startVoiceRecognition(
                          currentLevel.dialogue.turns[0]?.text || currentLevel.phonetics.trickyWords[0]?.word || currentLevel.goal
                        )
                      }
                    >
                      <Mic size={16} />
                      {isListening ? "Escuchando tu voz..." : "Pronunciar con micrófono"}
                    </button>
                  </div>
                </div>

                {spokenText && (
                  <div className="v52-speech-feedback v52-fade-in">
                    <span className="v52-detected-title">El sistema detectó en tu voz:</span>
                    <p className="v52-detected-phrase">"{spokenText}"</p>

                    {pronunciationResult && (
                      <div className="v52-detailed-evaluation">
                        <div className={`v52-score-tag ${pronunciationResult.score >= 70 ? "good" : "retry"}`}>
                          <SparkleBadge active={pronunciationResult.score >= 70} />
                          <b>{pronunciationResult.score}% Precisión Fonética</b>
                          <span>{pronunciationResult.feedbackMessage}</span>
                        </div>

                        {/* Word by Word Alignment Badges */}
                        <div className="v52-word-alignment-box">
                          <span className="v52-alignment-title">Desglose de articulación palabra por palabra:</span>
                          <div className="v52-alignment-tokens">
                            {pronunciationResult.alignments.map((align, aIdx) => {
                              let statusClass = "match"
                              let label = "✅ Correcto"
                              if (align.status === "substitution") {
                                statusClass = "substitution"
                                label = `⚠️ Dijiste: "${align.spokenWord}"`
                              } else if (align.status === "deletion") {
                                statusClass = "deletion"
                                label = "❌ Omitida"
                              } else if (align.status === "insertion") {
                                statusClass = "insertion"
                                label = `➕ Extra: "${align.spokenWord}"`
                              }

                              return (
                                <div key={aIdx} className={`v52-align-token ${statusClass}`}>
                                  <span className="v52-token-word">{align.targetWord || align.spokenWord}</span>
                                  <span className="v52-token-status">{label}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TAB 3: GRAMÁTICA DE SOFTWARE */}
          {activeTab === "grammar" && (
            <section className="v52-section-panel v52-fade-in">
              <div className="v52-panel-header">
                <div>
                  <span className="v52-panel-tag">REGLA SINTÁCTICA</span>
                  <h3>{currentLevel.grammar.rule}</h3>
                </div>
              </div>

              <div className="v52-grammar-explanation v52-stagger-item" style={{ "--stagger-i": 0 } as React.CSSProperties}>
                <p>{currentLevel.grammar.explanation}</p>
                <div className="v52-formula-badge">
                  <span>Fórmula:</span>
                  <code>{currentLevel.grammar.formula}</code>
                </div>
              </div>

              <div className="v52-code-comparison-grid">
                <div className="v52-comparison-col incorrect v52-stagger-item" style={{ "--stagger-i": 1 } as React.CSSProperties}>
                  <div className="v52-col-header">
                    <span>❌ Error Frecuente / Ambigüedad</span>
                  </div>
                  <pre>
                    <code>{currentLevel.grammar.incorrect}</code>
                  </pre>
                  <p className="v52-col-explanation">{currentLevel.grammar.whyIncorrect}</p>
                </div>

                <div className="v52-comparison-col correct v52-stagger-item" style={{ "--stagger-i": 2 } as React.CSSProperties}>
                  <div className="v52-col-header">
                    <span>✅ Estándar Profesional Idiomático</span>
                    <button
                      className="v52-mini-speak"
                      onClick={() => speak(currentLevel.grammar.correct, undefined, "grammar-correct")}
                    >
                      <Volume2 size={14} />
                      <AudioWave isPlaying={currentlySpeaking === "grammar-correct"} />
                    </button>
                  </div>
                  <pre>
                    <code>{currentLevel.grammar.correct}</code>
                  </pre>
                  <p className="v52-col-explanation">
                    Precisa, estructurada y respeta la sintaxis estándar de la ingeniería.
                  </p>
                </div>
              </div>

              <div className="v52-project-summary-box v52-stagger-item" style={{ "--stagger-i": 3 } as React.CSSProperties}>
                <h4>Proyecto / Gate de este nivel:</h4>
                <p>{currentLevel.project}</p>
              </div>
            </section>
          )}

          {/* TAB 4: EJERCICIOS & PRÁCTICA (Con Sentence Builder & Multiple Choice) */}
          {activeTab === "exercises" && (
            <section className="v52-section-panel v52-fade-in">
              <div className="v52-panel-header">
                <div>
                  <span className="v52-panel-tag">EVALUACIÓN INTERACTIVA</span>
                  <h3>Ejercicios Prácticos con Corrección y Sentence Builder</h3>
                </div>
              </div>

              <div className="v52-exercises-list">
                {currentLevel.exercises.map((exercise, index) => {
                  const selected = selectedAnswers[exercise.id]
                  const feedback = exerciseFeedback[exercise.id]

                  // Si es tipo Sentence Builder / Reorder
                  if (exercise.type === "reorder") {
                    return (
                      <div
                        key={exercise.id}
                        className="v52-exercise-card v52-stagger-item"
                        style={{ "--stagger-i": index } as React.CSSProperties}
                      >
                        <SentenceBuilderComponent
                          exercise={exercise}
                          onComplete={() => {}}
                          speakText={(text) => speak(text)}
                        />
                      </div>
                    )
                  }

                  // Tipo Selección Múltiple o Fill Blank estándar
                  return (
                    <div
                      key={exercise.id}
                      className="v52-exercise-card v52-stagger-item"
                      style={{ "--stagger-i": index } as React.CSSProperties}
                    >
                      <div className="v52-exercise-header">
                        <span className="v52-exercise-number">Ejercicio {index + 1}</span>
                        <p className="v52-exercise-instruction">{exercise.instruction}</p>
                      </div>

                      <div className="v52-exercise-prompt">
                        <h4>{exercise.prompt}</h4>
                      </div>

                      {exercise.options && (
                        <div className="v52-options-grid">
                          {exercise.options.map((opt, optIdx) => {
                            const isChosen = selected === optIdx
                            let stateClass = ""
                            if (feedback && isChosen) {
                              stateClass = opt.isCorrect ? "correct-choice v52-answer-correct" : "incorrect-choice"
                            }

                            return (
                              <button
                                key={optIdx}
                                className={`v52-option-btn ${stateClass}`}
                                onClick={() => handleSelectOption(exercise, optIdx)}
                                disabled={feedback !== undefined}
                              >
                                <span className="v52-option-indicator">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt.text}</span>
                                {isChosen && opt.isCorrect && <SparkleBadge active={true} />}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {feedback && (
                        <div
                          className={`v52-feedback-box ${
                            feedback.isCorrect ? "is-correct" : "is-incorrect"
                          }`}
                        >
                          <div className="v52-feedback-top">
                            {feedback.isCorrect ? (
                              <CheckCircle2 size={18} />
                            ) : (
                              <XCircle size={18} />
                            )}
                            <b>{feedback.isCorrect ? "¡Respuesta Correcta!" : "Respuesta Incorrecta"}</b>
                          </div>
                          <p>{feedback.feedback}</p>
                          <div className="v52-feedback-reminder">
                            <HelpCircle size={14} />
                            <span>{exercise.pedagogicalFeedback}</span>
                          </div>
                          {!feedback.isCorrect && (
                            <button
                              className="v52-retry-btn"
                              onClick={() => handleResetExercise(exercise.id)}
                            >
                              <RotateCcw size={14} /> Intentar nuevamente
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* TAB 5: SIMULADOR DE ESCENARIOS */}
          {activeTab === "roleplay" && (
            <section className="v52-section-panel v52-fade-in">
              <div className="v52-panel-header">
                <div>
                  <span className="v52-panel-tag">ROLEPLAY & PULL REQUEST REVIEW</span>
                  <h3>{currentLevel.dialogue.title}</h3>
                  <p className="v52-dialogue-context">{currentLevel.dialogue.context}</p>
                </div>
                <button
                  className="v52-toggle-translation-btn"
                  onClick={() => setShowTranslations(!showTranslations)}
                >
                  {showTranslations ? "Ocultar traducción" : "Mostrar traducción"}
                </button>
              </div>

              <div className="v52-dialogue-flow">
                {currentLevel.dialogue.turns.map((turn, index) => (
                  <div
                    key={index}
                    className={`v52-dialogue-turn ${index % 2 === 0 ? "speaker-a" : "speaker-b"} v52-stagger-item`}
                    style={{ "--stagger-i": index } as React.CSSProperties}
                  >
                    <div className="v52-speaker-avatar">
                      {turn.speaker.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="v52-turn-bubble">
                      <div className="v52-turn-top">
                        <span className="v52-speaker-name">{turn.speaker}</span>
                        <div className="v52-turn-actions">
                          <button
                            className="v52-mini-audio-btn"
                            onClick={() => speak(turn.text, undefined, `turn-${index}`)}
                            title="Escuchar audio"
                          >
                            <Volume2 size={14} />
                            <AudioWave isPlaying={currentlySpeaking === `turn-${index}`} />
                          </button>
                          <button
                            className="v52-mini-mic-btn"
                            onClick={() => startVoiceRecognition(turn.text)}
                            title="Practicar diciendo esta frase"
                          >
                            <Mic size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="v52-turn-english">{turn.text}</p>
                      {showTranslations && (
                        <p className="v52-turn-spanish">{turn.translation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 6: VOCABULARIO & LEXICÓN */}
          {activeTab === "vocabulary" && (
            <section className="v52-section-panel v52-fade-in">
              <div className="v52-panel-header">
                <div>
                  <span className="v52-panel-tag">GLOSARIO DE DOMINIO</span>
                  <h3>Vocabulario Especializado del Nivel</h3>
                </div>
              </div>

              <div className="v52-vocab-cards-grid">
                {currentLevel.vocabulary.map((item, index) => (
                  <article
                    key={index}
                    className="v52-vocab-card v52-stagger-item"
                    style={{ "--stagger-i": index } as React.CSSProperties}
                  >
                    <div className="v52-vocab-top">
                      <div>
                        <h4>{item.term}</h4>
                        <code className="v52-vocab-ipa">{item.ipa}</code>
                      </div>
                      <button
                        className="v52-speak-circle"
                        onClick={() => speak(item.term, undefined, `vocab-${index}`)}
                      >
                        <Volume2 size={16} />
                        <AudioWave isPlaying={currentlySpeaking === `vocab-${index}`} />
                      </button>
                    </div>
                    <p className="v52-vocab-def">{item.definition}</p>
                    <div className="v52-vocab-context">
                      <span>Uso cotidiano:</span>
                      <code>"{item.dailyContext}"</code>
                    </div>
                    <div className="v52-vocab-context tech">
                      <span>Uso en informática:</span>
                      <code>"{item.techContext}"</code>
                    </div>
                    {item.mistakeWarning && (
                      <div className="v52-vocab-mistake">
                        <HelpCircle size={14} />
                        <span>{item.mistakeWarning}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* TAB 7: WRITING & RFC STUDIO */}
          {activeTab === "writing" && (
            <section className="v52-section-panel v52-fade-in">
              <div className="v52-panel-header">
                <div>
                  <span className="v52-panel-tag">RETO DE REDACCIÓN</span>
                  <h3>{currentLevel.writingTask.prompt}</h3>
                </div>
              </div>

              <div className="v52-writing-challenge-info">
                <div className="v52-info-pill">
                  <span>Palabras mínimas requeridas:</span>
                  <b>{currentLevel.writingTask.minWords} palabras</b>
                </div>
                <div className="v52-info-pill">
                  <span>Términos clave a incorporar:</span>
                  <div className="v52-keywords-row">
                    {currentLevel.writingTask.keywords.map((kw) => (
                      <span key={kw} className="v52-keyword-tag">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <EnglishWritingStudioV52
                initialContent={currentLevel.writingTask.template}
              />
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
