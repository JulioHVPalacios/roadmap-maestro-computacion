import { useMemo, useState } from "react"
import { ArrowRight, BookOpen, ExternalLink, GraduationCap, Search, ShieldCheck, Sparkles, Target } from "lucide-react"
import { careerCatalogV43 } from "./career-catalog-v43"
import { computingErasV43, evidenceGatesV43, facultiesV43, grandChallengesV43, sourcePillarsV43, standardsV43 } from "./curriculum-v43"
import KnowledgeGraphV43 from "./KnowledgeGraphV43"
import ReviewEngineV43 from "./ReviewEngineV43"

type Tab = "atlas" | "grafo" | "tiempo" | "evidencia" | "fuentes" | "repaso"

function normalize(value: string) {
  return value.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function classifyRole(role: string) {
  const text = normalize(role)
  const ranked = facultiesV43.map((faculty) => ({
    faculty,
    score: faculty.keywords.reduce((sum, keyword) => sum + (text.includes(normalize(keyword)) ? Math.max(2, normalize(keyword).length / 4) : 0), 0),
  })).sort((a, b) => b.score - a.score)
  return ranked[0]?.score > 0 ? ranked[0].faculty : facultiesV43.find((faculty) => faculty.id === "enterprise") ?? facultiesV43[0]
}

export default function OmniversityLayerV43({ completedStageCodes, currentStageIndex }: { completedStageCodes: string[]; currentStageIndex: number }) {
  const [tab, setTab] = useState<Tab>("atlas")
  const [query, setQuery] = useState("")
  const [selectedCareer, setSelectedCareer] = useState("")
  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return []
    return careerCatalogV43.filter((role) => normalize(role).includes(q)).slice(0, 12)
  }, [query])
  const mapped = selectedCareer ? classifyRole(selectedCareer) : null
  const stageProgress = Math.round((completedStageCodes.length / Math.max(1, 20)) * 100)

  return (
    <section className="v43-omni-layer" aria-labelledby="v43-omni-title">
      <div className="v43-omni-intro">
        <div><span>CAPA OMNIVERSITY · AUDITORÍA MUNDIAL</span><h2 id="v43-omni-title">No es una lista de cursos.<br /><em>Es un sistema de dominio.</em></h2></div>
        <p>El tronco S0–S19 se contrasta con estándares, planes universitarios, cuerpos de conocimiento, práctica profesional y frontera de investigación. Los miles de nombres de profesiones se normalizan en dominios durables para evitar convertir la ruta en un catálogo de puestos.</p>
      </div>

      <div className="v43-omni-metrics">
        <article><small>MACRODOMINIOS</small><strong>{facultiesV43.length}</strong><span>Facultades de competencia</span></article>
        <article><small>ÍNDICE DE PERFILES</small><strong>{careerCatalogV43.length.toLocaleString("es-PE")}</strong><span>Nombres y roles buscables</span></article>
        <article><small>MARCOS DE AUDITORÍA</small><strong>{standardsV43.length}</strong><span>Estándares/BoK/planes base</span></article>
        <article><small>PROGRESO TRONCAL</small><strong>{stageProgress}%</strong><span>{completedStageCodes.length} etapas dominadas</span></article>
      </div>

      <div className="v43-standards-strip">
        {[...standardsV43, ...standardsV43].map((standard, index) => (
          <a key={`${standard.code}-${index}`} href={standard.url} target="_blank" rel="noreferrer"><span>{standard.code}</span><strong>{standard.name}</strong><small>{standard.role}</small><ExternalLink /></a>
        ))}
      </div>

      <nav className="v43-omni-tabs" aria-label="Capas avanzadas de Ruta Maestra">
        <button className={tab === "atlas" ? "is-active" : ""} onClick={() => setTab("atlas")}><GraduationCap /> Atlas 18 dominios</button>
        <button className={tab === "grafo" ? "is-active" : ""} onClick={() => setTab("grafo")}><Sparkles /> Grafo de conocimiento</button>
        <button className={tab === "tiempo" ? "is-active" : ""} onClick={() => setTab("tiempo")}><BookOpen /> Pasado → frontera</button>
        <button className={tab === "evidencia" ? "is-active" : ""} onClick={() => setTab("evidencia")}><Target /> Evidencia + desafíos</button>
        <button className={tab === "repaso" ? "is-active" : ""} onClick={() => setTab("repaso")}><BookOpen /> Repaso FSRS</button>
        <button className={tab === "fuentes" ? "is-active" : ""} onClick={() => setTab("fuentes")}><ShieldCheck /> Fuentes auditadas</button>
      </nav>

      {tab === "atlas" && <div className="v43-tab-panel">
        <div className="v43-career-search">
          <div className="v43-career-search-copy"><span>BUSCADOR DE PERFILES</span><h3>Escribe cualquier profesión del inventario.</h3><p>El buscador localiza el nombre y lo vincula con el macrodominio académico dominante. La clasificación es una ayuda de navegación: los perfiles interdisciplinarios pueden atravesar varias facultades.</p></div>
          <div className="v43-career-search-box"><div><Search /><input value={query} onChange={(event: any) => { setQuery(event.target.value); setSelectedCareer("") }} placeholder="Ej.: GPU Architect, Data Engineer, CISO, Quantum…" /></div>{results.length > 0 && <div className="v43-career-results">{results.map((role) => <button key={role} onClick={() => { setSelectedCareer(role); setQuery(role) }}><span>{role}</span><ArrowRight /></button>)}</div>}{mapped && <article className={`v43-career-map tone-${mapped.tone}`}><small>{mapped.code} · DOMINIO PRINCIPAL</small><strong>{mapped.title}</strong><p>{mapped.description}</p><span>{mapped.stageRange}</span></article>}</div>
        </div>
        <div className="v43-faculty-grid">{facultiesV43.map((faculty) => <article key={faculty.code} className={`tone-${faculty.tone}`}><div><span>{faculty.code}</span><small>{faculty.stageRange}</small></div><h3>{faculty.title}</h3><b>{faculty.subtitle}</b><p>{faculty.description}</p><div>{faculty.topics.map((topic) => <em key={topic}>{topic}</em>)}</div></article>)}</div>
      </div>}

      {tab === "grafo" && <div className="v43-tab-panel v43-graph-panel"><div className="v43-panel-head"><div><span>ELK + REACT FLOW</span><h3>Grafo computado de dependencias y cobertura.</h3></div><p>La carretera principal conserva el recorrido humano y visual. Esta vista secundaria usa layout automático para inspeccionar conexiones entre S0–S19 y los macrodominios sin tener que ordenar manualmente decenas de nodos.</p></div><KnowledgeGraphV43 /></div>}

      {tab === "tiempo" && <div className="v43-tab-panel">
        <div className="v43-panel-head"><div><span>CONTINUIDAD HISTÓRICA + FRONTERA</span><h3>Aprender el presente sin olvidar de dónde vino.</h3></div><p>El mapa conecta raíces históricas, sistemas que todavía sostienen infraestructura real y áreas emergentes. La última etapa no presenta especulación como certeza: exige investigación y evidencia.</p></div>
        <div className="v43-era-road">{computingErasV43.map((era, index) => <article key={era.code}><div className="v43-era-marker"><span>{era.code}</span><i /></div><div className="v43-era-card"><small>{era.period}</small><h4>{era.title}</h4><p>{era.text}</p><div>{era.focus.map((item) => <em key={item}>{item}</em>)}</div></div>{index < computingErasV43.length - 1 && <b aria-hidden="true" />}</article>)}</div>
      </div>}

      {tab === "evidencia" && <div className="v43-tab-panel">
        <div className="v43-panel-head"><div><span>MASTERy GATES</span><h3>Avanzar exige producir evidencia.</h3></div><p>Ver una clase o leer un PDF no basta. Cada tramo serio debe terminar en resultados observables: problemas, sistemas, auditorías, defensa y trabajo de investigación.</p></div>
        <div className="v43-gates-grid">{evidenceGatesV43.map((gate) => <article key={gate.code}><span>{gate.code}</span><h4>{gate.title}</h4><p>{gate.text}</p></article>)}</div>
        <div className="v43-challenge-head"><span>GRAND CHALLENGES</span><h3>Diez pruebas integradoras que fuerzan conocimiento real.</h3></div>
        <div className="v43-challenges">{grandChallengesV43.map((challenge) => <article key={challenge.code}><small>{challenge.code}</small><h4>{challenge.title}</h4><p>{challenge.text}</p><div>{challenge.faculties.map((code) => <span key={code}>{code}</span>)}</div></article>)}</div>
      </div>}

      {tab === "repaso" && <div className="v43-tab-panel"><ReviewEngineV43 currentStageIndex={currentStageIndex} /></div>}

      {tab === "fuentes" && <div className="v43-tab-panel">
        <div className="v43-panel-head"><div><span>JERARQUÍA DE FUENTES</span><h3>La ruta distingue autoridad de utilidad.</h3></div><p>A = estándar/plan oficial; B = universidad y material académico; C = currículo/laboratorio global; D = repositorio comunitario útil. Un recurso D nunca reemplaza a un estándar A: lo complementa con práctica.</p></div>
        {(["A", "B", "C", "D"] as const).map((tier) => <section className="v43-source-tier" key={tier}><header><span>NIVEL {tier}</span><strong>{tier === "A" ? "Normativo / oficial" : tier === "B" ? "Universidad / academia" : tier === "C" ? "Currículos y práctica global" : "Complementos comunitarios auditados"}</strong></header><div>{sourcePillarsV43.filter((source) => source.tier === tier).map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer"><small>{source.kind} · {source.language}</small><strong>{source.name}</strong><p>{source.role}</p><span>Abrir fuente <ExternalLink /></span></a>)}</div></section>)}
      </div>}
    </section>
  )
}
