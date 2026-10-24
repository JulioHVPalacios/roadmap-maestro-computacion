import { useState } from "react"
import { ArrowDownToLine, ArrowRight, BookOpen, Check, ClipboardCheck, FlaskConical, Library } from "lucide-react"
import { coursePlans, courseSources } from "./course-materials"
import { normalizeCourseChecks } from "./evidence-store"
import "./course-study.css"

const tabs = [
  { id: "preparar", label: "Preparar", icon: BookOpen },
  { id: "practicar", label: "Practicar", icon: FlaskConical },
  { id: "evaluar", label: "Contrastar", icon: ClipboardCheck },
  { id: "fuentes", label: "Materiales", icon: Library },
] as const
type Tab = typeof tabs[number]["id"]
const language = { es: "Español", mixto: "Idioma mixto o traducción parcial", en: "Inglés" }

function readEvidence(id: string): number[] {
  try {
    const record: unknown = JSON.parse(localStorage.getItem(`campus-course-evidence-v55:${id}`) ?? "[]")
    return normalizeCourseChecks(record)
  } catch { return [] }
}

export default function CourseStudyPanel({ courseId, title }: { courseId: string; title: string }) {
  const [tab, setTab] = useState<Tab>("preparar")
  const [checked, setChecked] = useState<number[]>(() => readEvidence(courseId))
  const [storageNotice, setStorageNotice] = useState("")
  const plan = coursePlans.find((item) => item.id === courseId)
  if (!plan) return <p className="cs-pending">Esta materia conserva su inventario y referencias; la guía específica está pendiente de desarrollo.</p>
  const toggle = (index: number) => {
    const next = checked.includes(index) ? checked.filter((item) => item !== index) : [...checked, index]
    setChecked(next)
    try { localStorage.setItem(`campus-course-evidence-v55:${courseId}`, JSON.stringify(next)); setStorageNotice("") }
    catch { setStorageNotice("No se pudo guardar en este navegador. Descarga el guion y conserva tu registro.") }
  }
  const download = () => {
    const text = `# ${courseId} · ${title}\n\n## Enfoque\n${plan.focus.map((item) => `- ${item}`).join("\n")}\n\n## Práctica\n${plan.practice}\n\n## Criterios para contrastar\n${plan.checks.map((item, index) => `- [${checked.includes(index) ? "x" : " "}] ${item}`).join("\n")}\n\n## Pregunta de comprensión\n${plan.question}\n\n## Materiales\n${plan.sourceIds.map((id) => { const source = courseSources.find((item) => item.id === id)!; return `- ${source.label}: ${source.url} (${language[source.language]})` }).join("\n")}\n\n## Alcance\n${plan.scopeNote}\n\nLas marcas son un registro personal; no constituyen evaluación externa ni dominio de una etapa.\n`
    const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }))
    const link = document.createElement("a"); link.href = url; link.download = `${courseId}-guion-de-practica.md`; link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <section className="cs-panel" aria-label={`Guía de estudio de ${courseId}`}>
    <header className="cs-header"><div><span>ESTUDIAR ESTA MATERIA</span><h4>Del temario a la práctica.</h4></div><button type="button" onClick={download} aria-label={`Descargar guion de ${courseId}`}><ArrowDownToLine size={16} />Guion</button></header>
    <nav className="cs-tabs" aria-label={`Actividades de ${courseId}`}>{tabs.map((item) => { const Icon = item.icon; return <button type="button" key={item.id} aria-pressed={tab === item.id} onClick={() => setTab(item.id)}><Icon size={16} />{item.label}</button> })}</nav>
    <div className="cs-content">
      {tab === "preparar" && <><h5>Trabaja estos conceptos</h5><ol>{plan.focus.map((item) => <li key={item}>{item}</li>)}</ol><p>Consulta «Materiales» y revisa la función y el alcance de cada recurso: algunos enseñan conceptos y otros apoyan la práctica, el registro o el contraste. Explica los conceptos con tus palabras antes de practicar y completa los prerrequisitos si hace falta.</p><button type="button" className="cs-next" onClick={() => setTab("practicar")}>Pasar a la práctica<ArrowRight size={16} /></button></>}
      {tab === "practicar" && <><h5>Actividad original</h5><p className="cs-assignment">{plan.practice}</p><div className="cs-delivery"><b>Conserva la evidencia</b><p>Entrega el procedimiento, los archivos o cálculos, los resultados y los fallos encontrados. Indica versiones y supuestos; distingue una simulación de una prueba ejecutada sobre un sistema real.</p></div><button type="button" className="cs-next" onClick={() => setTab("evaluar")}>Contrastar el resultado<ArrowRight size={16} /></button></>}
      {tab === "evaluar" && <><h5>Pregunta de comprensión</h5><p>{plan.question}</p><details className="cs-answer"><summary>Consultar una respuesta orientativa</summary><p>{plan.answer}</p><small>Intenta responder antes de desplegarla. Una respuesta correcta a esta pregunta no evalúa toda la materia.</small></details><h5>Revisa tu entrega</h5><div className="cs-checks">{plan.checks.map((item, index) => <label key={item}><input type="checkbox" checked={checked.includes(index)} onChange={() => toggle(index)} /><span>{checked.includes(index) && <Check size={14} />}{item}</span></label>)}</div><p className="cs-caption">{checked.length}/3 comprobaciones personales. Estas marcas se guardan aparte del progreso de etapas; no conceden dominio ni representan revisión externa.</p>{storageNotice && <p role="status">{storageNotice}</p>}</>}
      {tab === "fuentes" && <><h5>Materiales para esta materia</h5><div className="cs-sources">{plan.sourceIds.map((id) => { const source = courseSources.find((item) => item.id === id)!; return <article key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowRight size={16} /></a><span>{language[source.language]} · {source.kind}</span><p>{source.access}</p><details><summary>Qué se comprobó y qué límites tiene</summary><p>{source.verificationNote}</p></details></article> })}</div><p className="cs-caption">Lectura de fuentes durante la revisión de octubre de 2026; condiciones, enlaces, traducciones y versiones pueden cambiar. Las fuentes se enlazan sin copiar sus cursos o soluciones.</p></>}
    </div><footer className="cs-scope"><b>Alcance de esta guía</b><p>{plan.scopeNote}</p><p>Guía, práctica y autoevaluación en español; no se presenta como un curso íntegro impartido y evaluado por la institución enlazada.</p></footer>
  </section>
}
