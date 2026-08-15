import { useEffect, useMemo, useRef, useState } from "react"
import { CheckCircle2, Headphones, Mic, RotateCcw, Send, Speaker, Volume2 } from "lucide-react"
import { englishLevels } from "./learning-data"
import ProceduralBackdrop from "./ProceduralBackdrop"

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

const phrases = [
  "Open the file and run the program.",
  "I found a bug in the login form.",
  "Please review this pull request before deployment.",
  "The service failed because the database connection timed out.",
  "We should compare scalability, reliability, cost, and operational complexity.",
  "The experiment is reproducible only if we document the assumptions and evaluation method.",
  "I can explain the trade-offs, limitations, and implications of this architecture.",
  "The incident review identified the root cause, contributing factors, and preventive actions.",
]

const vocabulary = [
  ["run", "ejecutar"], ["file", "archivo"], ["bug", "error/fallo"], ["branch", "rama"], ["deploy", "desplegar"],
  ["request", "solicitud"], ["response", "respuesta"], ["database", "base de datos"], ["latency", "latencia"], ["throughput", "rendimiento/caudal"],
  ["rollback", "reversión"], ["reliability", "fiabilidad"], ["trade-off", "compensación"], ["root cause", "causa raíz"], ["constraint", "restricción"],
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").replace(/\s+/g, " ").trim()
}

function similarity(a: string, b: string) {
  const left = new Set(normalize(a).split(" ").filter(Boolean))
  const right = new Set(normalize(b).split(" ").filter(Boolean))
  if (!left.size || !right.size) return 0
  let common = 0
  left.forEach((word) => { if (right.has(word)) common += 1 })
  return Math.round((common / Math.max(left.size, right.size)) * 100)
}

export default function EnglishHubV41() {
  const [activeLevel, setActiveLevel] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState("")
  const [speechScore, setSpeechScore] = useState<number | null>(null)
  const [writing, setWriting] = useState("")
  const [submittedWriting, setSubmittedWriting] = useState(false)
  const recognitionRef = useRef<RecognitionLike | null>(null)
  const level = englishLevels[activeLevel]
  const targetPhrase = phrases[Math.min(activeLevel, phrases.length - 1)]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCardIndex((index) => (index + 1) % vocabulary.length)
      setShowMeaning(false)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [])

  const writingScore = useMemo(() => {
    const words = writing.trim().split(/\s+/).filter(Boolean)
    const lower = normalize(writing)
    const technical = ["bug", "issue", "code", "test", "server", "database", "deploy", "architecture", "system"].filter((word) => lower.includes(word)).length
    const sentences = (writing.match(/[.!?]/g) ?? []).length
    return Math.min(100, words.length * 3 + technical * 8 + sentences * 4)
  }, [writing])

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = activeLevel <= 1 ? 0.72 : activeLevel <= 3 ? 0.86 : 0.96
    window.speechSynthesis.speak(utterance)
  }

  const startRecognition = () => {
    const win = window as SpeechWindow
    const Ctor = win.SpeechRecognition ?? win.webkitSpeechRecognition
    if (!Ctor) {
      setHeard("Tu navegador no ofrece reconocimiento de voz. Puedes practicar escucha y escribir lo que dijiste en el campo de escritura.")
      return
    }
    recognitionRef.current?.stop()
    const recognition = new Ctor()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? ""
      setHeard(transcript)
      setSpeechScore(similarity(transcript, targetPhrase))
    }
    recognition.onerror = () => setHeard("No se pudo reconocer la voz. Inténtalo otra vez o revisa el permiso del micrófono.")
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    setListening(true)
    setHeard("")
    setSpeechScore(null)
    recognition.start()
  }

  return (
    <main className="v41-learning-page v41-english-page">
      <section className="v41-learning-hero">
        <ProceduralBackdrop variant="pink" />
        <div className="v41-learning-hero-copy">
          <span>ENGLISH FOR COMPUTING · PRE-A1 → C2</span>
          <h1>Entiende. Habla.<br /><em>Trabaja en inglés.</em></h1>
          <p>Inglés construido alrededor de situaciones reales de informática: interfaces, documentación, bugs, pull requests, reuniones, arquitectura, incidentes, papers y conferencias.</p>
          <div className="v41-hero-pills"><b>Pre-A1 a C2</b><b>Listening</b><b>Speaking</b><b>Reading</b><b>Writing</b></div>
        </div>
        <div className="v41-code-float" aria-hidden="true"><Headphones /><code>listen → speak → read → write</code></div>
      </section>

      <section className="v41-section">
        <div className="v41-section-head"><div><span>RUTA CEFR + COMPUTACIÓN</span><h2>Del cero absoluto<br />al trabajo internacional.</h2></div><p>La progresión usa niveles CEFR como referencia de aprendizaje; no pretende sustituir una certificación oficial.</p></div>
        <div className="v41-auto-rail">
          <div className="v41-auto-track english">
            {[...englishLevels, ...englishLevels].map((item, index) => (
              <button key={`${item.code}-${index}`} className={`v41-level-card tone-${["blue","lime","pink","cyan","violet","sand","green","orange"][index % 8]} ${activeLevel === index % englishLevels.length ? "active" : ""}`} onClick={() => setActiveLevel(index % englishLevels.length)}>
                <small>{item.code} · {item.cefr}</small><h3>{item.title}</h3><p>{item.summary}</p><footer><span>{item.skills.slice(0, 2).join(" · ")}</span><span>→</span></footer>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="v41-section v41-level-detail" data-pingo-tip={`Inglés ${level.cefr}: ${level.mission}`}>
        <div className="v41-level-copy"><span>{level.code} · {level.cefr}</span><h2>{level.title}</h2><p>{level.summary}</p><div className="v41-skill-cloud">{level.skills.map((skill) => <b key={skill}>{skill}</b>)}</div></div>
        <article className="v41-project-brief"><small>MISIÓN DEL NIVEL</small><h3>{level.mission}</h3><p><strong>Vocabulario técnico:</strong></p><div>{level.techFocus.map((item) => <span key={item}>{item}</span>)}</div></article>
      </section>

      <section className="v41-lab-section v41-language-lab">
        <div className="v41-section-head on-dark"><div><span>LANGUAGE LAB</span><h2>Escucha y habla<br />dentro del Campus.</h2></div><p>La pronunciación usa síntesis de voz del navegador; cuando Chrome permite reconocimiento de voz, compara tu frase con el objetivo y te da una referencia de coincidencia.</p></div>
        <div className="v41-language-grid">
          <article className="v41-speaking-card">
            <small>LISTENING + SPEAKING</small>
            <h3>{targetPhrase}</h3>
            <div className="v41-speaking-actions"><button onClick={() => speak(targetPhrase)}><Volume2 />Escuchar</button><button onClick={startRecognition} className={listening ? "listening" : ""}><Mic />{listening ? "Escuchando…" : "Pronunciar"}</button></div>
            {heard && <div className="v41-transcript"><span>El navegador entendió:</span><p>{heard}</p>{speechScore !== null && <b>{speechScore}% coincidencia de palabras</b>}</div>}
          </article>

          <article className="v41-flashcard" onClick={() => setShowMeaning((value) => !value)}>
            <small>VOCABULARIO · AUTO-SLIDE</small>
            <div><Speaker /><h3>{vocabulary[cardIndex][0]}</h3><p>{showMeaning ? vocabulary[cardIndex][1] : "Toca para revelar"}</p></div>
            <footer><button onClick={(event) => { event.stopPropagation(); setCardIndex((index) => (index - 1 + vocabulary.length) % vocabulary.length); setShowMeaning(false) }}>‹</button><div>{vocabulary.slice(0, 8).map((_, index) => <i key={index} className={index === cardIndex % 8 ? "active" : ""} />)}</div><button onClick={(event) => { event.stopPropagation(); setCardIndex((index) => (index + 1) % vocabulary.length); setShowMeaning(false) }}>›</button></footer>
          </article>
        </div>
      </section>

      <section className="v41-section v41-writing-lab">
        <div className="v41-section-head"><div><span>WRITING COACH</span><h2>Escribe como profesional.</h2></div><p>La comprobación local no reemplaza a un profesor, pero te obliga a producir texto, usar vocabulario técnico y revisar estructura antes de avanzar.</p></div>
        <div className="v41-writing-grid">
          <div><label htmlFor="v41-writing">Reto: describe un problema técnico, cómo lo diagnosticarías y qué comprobarías antes de desplegar una solución.</label><textarea id="v41-writing" value={writing} onChange={(event) => { setWriting(event.target.value); setSubmittedWriting(false) }} placeholder="I noticed that the service..." /><div className="v41-writing-actions"><button onClick={() => setSubmittedWriting(true)}><Send />Evaluar borrador</button><button onClick={() => { setWriting(""); setSubmittedWriting(false) }}><RotateCcw />Limpiar</button></div></div>
          <article className="v41-writing-score"><small>CHECKLIST DEL BORRADOR</small><h3>{submittedWriting ? `${writingScore}/100` : "—"}</h3>{[
            ["Escribe al menos 25 palabras", writing.trim().split(/\s+/).filter(Boolean).length >= 25],
            ["Incluye vocabulario técnico", /bug|issue|code|test|server|database|deploy|architecture|system/i.test(writing)],
            ["Usa frases completas", (writing.match(/[.!?]/g) ?? []).length >= 2],
            ["Explica diagnóstico o evidencia", /check|test|log|measure|verify|because|cause/i.test(writing)],
          ].map(([label, ok]) => <div key={String(label)} className={ok ? "ok" : ""}><CheckCircle2 />{label}</div>)}</article>
        </div>
      </section>
    </main>
  )
}
