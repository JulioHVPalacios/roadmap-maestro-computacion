import { useMemo, useState } from "react"
import { AlertTriangle, BookOpen, Brain, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle, Lightbulb, Target } from "lucide-react"
import { professorGuides } from "./programming-v47-teacher-data"

export default function LevelProfessorV47({ levelCode }: { levelCode: string }) {
  const guide = useMemo(() => professorGuides.find((item) => item.level === levelCode) ?? professorGuides[0], [levelCode])
  const [step, setStep] = useState(0)

  const active = guide.steps[Math.min(step, guide.steps.length - 1)]

  return (
    <section className="v47-professor-card" aria-label={`Profesor interactivo para ${guide.level}`}>
      <div className="v47-professor-sidebar">
        <div className="v47-professor-avatar"><Brain /><span>PROFESOR</span></div>
        <small>{guide.level}</small>
        <h3>{guide.title}</h3>
        <p>{guide.what}</p>
        <div className="v47-professor-why"><Lightbulb /><div><b>¿Por qué importa?</b><p>{guide.why}</p></div></div>
        <div className="v47-mental-model"><Brain /><div><b>Modelo mental</b><p>{guide.mentalModel}</p></div></div>
      </div>

      <div className="v47-professor-main">
        <div className="v47-professor-progress">
          {guide.steps.map((item, index) => <button type="button" key={item.title} className={step === index ? "active" : step > index ? "done" : ""} onClick={() => setStep(index)}><span>{step > index ? "✓" : index + 1}</span><small>{item.title.replace(/^\d+\.\s*/, "")}</small></button>)}
        </div>

        <article className="v47-professor-lesson">
          <div className="v47-professor-label"><BookOpen /><span>PASO {step + 1} DE {guide.steps.length}</span></div>
          <h4>{active.title}</h4>
          <p>{active.detail}</p>
          {active.example && <div className="v47-professor-example"><small>EJEMPLO</small><code>{active.example}</code></div>}
          <div className="v47-professor-nav"><button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}><ChevronLeft />Anterior</button><button type="button" disabled={step >= guide.steps.length - 1} onClick={() => setStep((current) => Math.min(guide.steps.length - 1, current + 1))}>Siguiente<ChevronRight /></button></div>
        </article>

        <div className="v47-professor-bottom">
          <article><div><HelpCircle /><b>Vocabulario esencial</b></div>{guide.vocabulary.map((item) => <p key={item.term}><strong>{item.term}:</strong> {item.meaning}</p>)}</article>
          <article><div><Target /><b>Práctica</b></div><p>{guide.practice}</p><div className="v47-gate"><CheckCircle2 /><span><strong>Gate:</strong> {guide.checkpoint}</span></div></article>
          <article><div><AlertTriangle /><b>Errores frecuentes</b></div><ul>{guide.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
      </div>
    </section>
  )
}
