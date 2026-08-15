import { useMemo, useState } from "react"
import { BookOpen, CheckCircle2, Target } from "lucide-react"
import { createEmptyCard, fsrs, Rating, type Grade } from "ts-fsrs"
import { stages } from "../roadmap-data"

type StoredCard = Record<string, unknown> & { due?: string; last_review?: string | null; reps?: number; lapses?: number }
type Store = Record<string, StoredCard>

const REVIEW_KEY = "campus-maestro-v43-fsrs-review"
const scheduler = fsrs({ request_retention: 0.92, maximum_interval: 3650, enable_fuzz: true, enable_short_term: true })

function loadStore(): Store {
  try {
    const raw = localStorage.getItem(REVIEW_KEY)
    return raw ? JSON.parse(raw) as Store : {}
  } catch {
    return {}
  }
}

function reviveCard(raw?: StoredCard) {
  if (!raw) return createEmptyCard()
  return {
    ...raw,
    due: raw.due ? new Date(raw.due) : new Date(),
    last_review: raw.last_review ? new Date(raw.last_review) : undefined,
  } as any
}

function serializeCard(card: any): StoredCard {
  return {
    ...card,
    due: card.due instanceof Date ? card.due.toISOString() : String(card.due),
    last_review: card.last_review instanceof Date ? card.last_review.toISOString() : card.last_review ?? null,
  }
}

function topicId(stageCode: string, index: number) { return `${stageCode}:${index}` }

export default function ReviewEngineV43({ currentStageIndex }: { currentStageIndex: number }) {
  const [store, setStore] = useState<Store>(() => loadStore())
  const topics = useMemo(() => stages.flatMap((stage) => stage.subjects.map((subject, index) => ({
    id: topicId(stage.code, index), stageCode: stage.code, stageTitle: stage.title, subject: subject.name, evidence: subject.evidence,
  }))), [])
  const [selectedId, setSelectedId] = useState(() => topics.find((topic) => topic.stageCode === stages[currentStageIndex]?.code)?.id ?? topics[0]?.id ?? "")
  const selected = topics.find((topic) => topic.id === selectedId) ?? topics[0]
  const now = Date.now()
  const dueTopics = topics.filter((topic) => {
    const due = store[topic.id]?.due
    return !due || new Date(due).getTime() <= now
  })
  const nearby = topics.filter((topic) => topic.stageCode === stages[currentStageIndex]?.code).slice(0, 6)

  const rate = (rating: Grade) => {
    if (!selected) return
    const result = scheduler.next(reviveCard(store[selected.id]), new Date(), rating)
    const next = { ...store, [selected.id]: serializeCard((result as any).card) }
    setStore(next)
    localStorage.setItem(REVIEW_KEY, JSON.stringify(next))
  }

  const card = selected ? store[selected.id] : undefined
  const dueLabel = card?.due ? new Date(card.due).toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" }) : "Ahora"

  return (
    <div className="v43-review-engine">
      <div className="v43-review-summary">
        <div><span>FSRS · REPASO ADAPTATIVO</span><h3>No marques “aprendido”.<br /><em>Demuestra que lo recuerdas.</em></h3></div>
        <div className="v43-review-count"><strong>{dueTopics.length}</strong><small>temas pendientes o nuevos</small></div>
      </div>
      <div className="v43-review-grid">
        <aside>
          <small>ETAPA ACTUAL · {stages[currentStageIndex]?.code}</small>
          {nearby.map((topic) => <button key={topic.id} className={selected?.id === topic.id ? "is-active" : ""} onClick={() => setSelectedId(topic.id)}><BookOpen /><span><b>{topic.subject}</b><em>{topic.stageCode}</em></span></button>)}
        </aside>
        <article className="v43-review-card">
          <div className="v43-review-meta"><span>{selected?.stageCode}</span><small>Próximo repaso: {dueLabel}</small></div>
          <h4>{selected?.subject}</h4>
          <p>Sin mirar apuntes: explica el tema, deriva sus ideas principales, da un ejemplo y conecta el concepto con un sistema real.</p>
          <div className="v43-review-evidence"><Target /><span><b>Evidencia que deberías poder producir</b>{selected?.evidence}</span></div>
          <div className="v43-review-rating">
            <button onClick={() => rate(Rating.Again)}><span>Otra vez</span><small>No pude recuperarlo</small></button>
            <button onClick={() => rate(Rating.Hard)}><span>Difícil</span><small>Recordé con esfuerzo</small></button>
            <button onClick={() => rate(Rating.Good)}><span>Bien</span><small>Respuesta correcta</small></button>
            <button onClick={() => rate(Rating.Easy)}><CheckCircle2 /><span>Fácil</span><small>Dominio fluido</small></button>
          </div>
        </article>
      </div>
      <p className="v43-review-note">El motor programa el siguiente repaso; la calificación es autoevaluada. La validación fuerte sigue siendo examen, laboratorio, proyecto, auditoría y defensa.</p>
    </div>
  )
}
