import { lazy, Suspense, useEffect, useMemo, useState, type CSSProperties } from "react";
import { rootSources, stages, type Stage, type Subject } from "./roadmap-data";
import { careerFamilies, masteryTracks, type MasteryTrack } from "./mastery-data";
import { auditSummary } from "./audit-meta";
import { contentArchitectureRules } from "./academic-content";
import Icon, { type IconName } from "./Icon";

const AuditSection = lazy(() => import("./AuditSection"));

const phaseMeta = [
  { id: "inicio", label: "Inicio", range: [0, 0], color: "#ffb000" },
  { id: "tronco", label: "Tronco universitario", range: [1, 6], color: "#4f7cff" },
  { id: "profesional", label: "Ingeniería aplicada", range: [7, 10], color: "#9a66ff" },
  { id: "datos", label: "Datos e IA", range: [11, 15], color: "#11b6d7" },
  { id: "frontera", label: "Hardware y frontera", range: [16, 19], color: "#ff496d" },
];

const classroomTabs = [
  ["resumen", "Resumen"], ["teoria", "Teoría"], ["clases", "Clases"], ["pdf", "PDF"],
  ["lab", "Laboratorio"], ["ejercicios", "Ejercicios"], ["examen", "Examen"], ["proyecto", "Proyecto"], ["notas", "Notas"],
] as const;

type ClassroomTab = typeof classroomTabs[number][0];
type Classroom = { stage: Stage; subject: Subject; index: number };

function phaseFor(index: number) {
  return phaseMeta.find((phase) => index >= phase.range[0] && index <= phase.range[1]) ?? phaseMeta[0];
}
function normalized(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
function subjectKey(stage: Stage, index: number) { return `${stage.code}-m${index}`; }
function trackUnitKey(track: MasteryTrack, index: number) { return `${track.code}-u${index}`; }

export default function App() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [libraryQuery, setLibraryQuery] = useState("");
  const [trackQuery, setTrackQuery] = useState("");
  const [phase, setPhase] = useState("todas");
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [tab, setTab] = useState<ClassroomTab>("resumen");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState<"light"|"dark">(() => {
    try { return localStorage.getItem("campus-maestro-theme") === "dark" ? "dark" : "light"; } catch { return "light"; }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("roadmap-maestro-progreso-v3") ?? localStorage.getItem("roadmap-maestro-progreso-v2");
      const savedNotes = localStorage.getItem("roadmap-maestro-notas-v3");
      if (saved) setCompleted(new Set(JSON.parse(saved)));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch { /* funciona sin persistencia */ }
  }, []);

  useEffect(() => { try { localStorage.setItem("roadmap-maestro-progreso-v3", JSON.stringify([...completed])); } catch {} }, [completed]);
  useEffect(() => { try { localStorage.setItem("roadmap-maestro-notas-v3", JSON.stringify(notes)); } catch {} }, [notes]);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(h > 0 ? Math.min(100, Math.round(window.scrollY / h * 100)) : 0);
      document.documentElement.style.setProperty("--page-scroll", String(window.scrollY));
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = classroom ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [classroom]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("campus-maestro-theme", theme); } catch {}
  }, [theme]);
  useEffect(() => {
    const selector = ".reveal-section, .story-steps article, .stage-card";
    const seen = new WeakSet<Element>();

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(selector).forEach(node => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .01, rootMargin: "0px 0px -24px 0px" });

    const observeNewNodes = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
        if (!seen.has(node)) {
          seen.add(node);
          observer.observe(node);
        }
      });
    };

    observeNewNodes();
    const mutationObserver = new MutationObserver(observeNewNodes);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  const coreUnits = stages.reduce((n, s) => n + s.subjects.length, 0);
  const trackUnits = masteryTracks.reduce((n, t) => n + t.units.length, 0);
  const totalTasks = coreUnits + stages.length + trackUnits + masteryTracks.length;
  const doneCount = [...completed].filter(k => /^S\d+-m\d+$|^S\d+-gate$|^T\d+-u\d+$|^T\d+-gate$/.test(k)).length;
  const percent = totalTasks ? Math.round(doneCount / totalTasks * 100) : 0;

  const allSubjects = useMemo(() => stages.flatMap(stage => stage.subjects.map((subject, index) => ({ stage, subject, index }))), []);
  const filteredSubjects = useMemo(() => {
    const q = normalized(query.trim());
    if (!q) return allSubjects;
    return allSubjects.filter(item => normalized(`${item.stage.code} ${item.stage.title} ${item.subject.name} ${item.subject.study} ${item.subject.evidence}`).includes(q));
  }, [query, allSubjects]);
  const libraryItems = useMemo(() => allSubjects.flatMap(item => item.subject.sources.map(source => ({ ...source, ...item }))), [allSubjects]);
  const filteredLibrary = useMemo(() => {
    const q = normalized(libraryQuery.trim());
    if (!q) return libraryItems;
    return libraryItems.filter(item => normalized(`${item.label} ${item.where} ${item.subject.name} ${item.stage.code}`).includes(q));
  }, [libraryItems, libraryQuery]);
  const filteredTracks = useMemo(() => {
    const q = normalized(trackQuery.trim());
    if (!q) return masteryTracks;
    return masteryTracks.filter(track => normalized(`${track.code} ${track.title} ${track.family} ${track.goal} ${track.units.map(u => `${u.name} ${u.focus}`).join(" ")}`).includes(q));
  }, [trackQuery]);
  const currentStage = stages.find(stage => !stage.subjects.every((_, i) => completed.has(subjectKey(stage, i)))) ?? stages[stages.length - 1];

  function toggle(key: string) {
    setCompleted(current => { const next = new Set(current); next.has(key) ? next.delete(key) : next.add(key); return next; });
  }
  function openClassroom(stage: Stage, subject: Subject, index: number) { setClassroom({ stage, subject, index }); setTab("resumen"); }
  function jump(id: string) {
    setMobileMenu(false);
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.add("is-visible");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return <main>
    <div className="scroll-progress"><i style={{ width: `${scrollPercent}%` }} /></div>
    <header className="topbar">
      <button className="brand" onClick={() => jump("inicio")}><span className="brand-mark">CM</span><span><b>Campus Maestro</b><small>Computación · v3.2.1</small></span></button>
      <nav className={mobileMenu ? "open" : ""}>
        <button onClick={() => jump("campus")}>Campus</button><button onClick={() => jump("ruta")}>Plan</button><button onClick={() => jump("biblioteca")}>Biblioteca</button><button onClick={() => jump("maestrias")}>Maestrías</button><button onClick={() => jump("cobertura")}>Cobertura</button><button onClick={() => jump("auditoria")}>Auditoría</button>
      </nav>
      <button className="theme-btn" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}><Icon name={theme === "light" ? "moon" : "sun"}/></button>
      <button className="menu-btn" onClick={() => setMobileMenu(v => !v)} aria-label="Abrir menú"><Icon name="menu"/></button>
      <button className="progress-pill" onClick={() => jump("campus")}><span>{percent}%</span><i style={{ "--p": `${percent}%` } as CSSProperties} /></button>
    </header>

    <section id="inicio" className="hero cinematic reveal-section">
      <div className="aurora a1"/><div className="aurora a2"/><div className="grid-noise"/>
      <div className="hero-copy reveal">
        <span className="eyebrow">OPEN SOURCE · ESPAÑOL PRIMERO · COSTO OBLIGATORIO S/0</span>
        <h1>Una universidad digital<br/><em>para dominar computación.</em></h1>
        <p>Del primer concepto a investigación avanzada. Un solo campus para estudiar el tronco universitario, abrir aulas, guardar notas, practicar, rendir evaluaciones y recorrer doce rutas de maestría.</p>
        <div className="hero-actions"><button className="primary" onClick={() => jump("campus")}>Entrar al campus <span>→</span></button><button className="ghost" onClick={() => jump("ruta")}>Explorar el plan</button></div>
        <div className="hero-badges"><span>20 etapas</span><span>{coreUnits} materias</span><span>12 maestrías</span><span>{rootSources.length} ecosistemas auditados</span></div>
      </div>
      <div className="knowledge-orbit" aria-hidden="true">
        <div className="core-orb"><span>∞</span><b>COMPUTACIÓN</b></div>
        {["Algoritmos","Software","Datos","IA","Redes","Seguridad","Hardware","Robótica"].map((x,i)=><span key={x} className={`orbit-node n${i+1}`}>{x}</span>)}
      </div>
    </section>

    <section id="campus" className="campus-section page-section reveal-section">
      <div className="section-head"><span>01 · TU CAMPUS</span><h2>Continúa exactamente<br/><em>donde te quedaste.</em></h2></div>
      <div className="dashboard-grid">
        <article className="dashboard-main glass-card">
          <div className="dashboard-kicker">PROGRESO ACADÉMICO</div><div className="big-percent">{percent}<small>%</small></div>
          <div className="big-progress"><i style={{ width: `${percent}%` }}/></div><p>{doneCount} de {totalTasks} comprobaciones de dominio completadas.</p>
        </article>
        <article className="continue-card glass-card"><span>CONTINUAR</span><h3>{currentStage.code} · {currentStage.title}</h3><p>{currentStage.outcome}</p><button onClick={() => jump("ruta")}>Abrir etapa →</button></article>
        <article className="metric-card glass-card"><span>MATERIAS</span><strong>{coreUnits}</strong><small>tronco integrado</small></article>
        <article className="metric-card glass-card"><span>TRACKS</span><strong>12</strong><small>rutas de maestría</small></article><article className="metric-card glass-card audit-metric"><span>BASE MUNDIAL</span><strong>{auditSummary.modules}</strong><small>módulos trazados</small></article><article className="metric-card glass-card audit-metric"><span>CARGA AUDITADA</span><strong>{auditSummary.hours.toLocaleString("es-PE")}</strong><small>horas catalogadas</small></article>
      </div>
      <div className="campus-tools">
        {[
          ["search","Buscador global","Encuentra cualquier tema del tronco."],
          ["layers","Aulas","Teoría, clase, PDF, laboratorio, examen y proyecto."],
          ["note","Notas local-first","Tus apuntes permanecen en este dispositivo y la arquitectura queda lista para sincronización futura."],
          ["shield","Auditoría mundial",`${auditSummary.modules} módulos y ${auditSummary.sources} fuentes trazadas.`],
          ["cloud","Sincronización","Capa multidispositivo pendiente: no se presenta como terminada hasta implementarla y probarla."]
        ].map(([icon,title,text])=><article key={title}><span><Icon name={icon as IconName}/></span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>

    <section className="story-section reveal-section">
      <div className="story-sticky"><span>ARQUITECTURA DE APRENDIZAJE</span><h2>Primero fundamentos.<br/>Después ingeniería.<br/><em>Luego frontera.</em></h2></div>
      <div className="story-steps">
        {phaseMeta.map((item,i)=><article key={item.id} style={{"--accent":item.color} as CSSProperties}><span>0{i+1}</span><h3>{item.label}</h3><p>{i===0?"Método, herramientas y nivelación.":i===1?"Matemática, algoritmos, arquitectura, SO, redes, teoría y software.":i===2?"Producto, web, cloud, DevOps, sistemas de información y operación.":i===3?"Analítica, ingeniería de datos, ML, deep learning y sistemas de IA.":"Embebidos, telecom, HPC, gráficos, computación científica y frontera."}</p></article>)}
      </div>
    </section>

    <section className="architecture-section page-section reveal-section" id="arquitectura-academica">
      <div className="section-head"><span>02 · MOTOR ACADÉMICO</span><h2>Contenido con estados.<br/><em>Nada se finge terminado.</em></h2><p>La v3.2 fija el esquema con el que se llenará cada aula: facultad → ruta → etapa → materia → unidad → lección → activo educativo → evaluación → evidencia.</p></div>
      <div className="architecture-flow">{["Facultad","Ruta","Etapa","Materia","Unidad","Lección","Evidencia"].map((item,index)=><div key={item}><span>{String(index+1).padStart(2,"0")}</span><b>{item}</b>{index<6&&<i>→</i>}</div>)}</div>
      <div className="architecture-rules">{contentArchitectureRules.map((rule,index)=><article key={rule}><Icon name={index%2===0?"check":"shield"}/><span>{rule}</span></article>)}</div>
      <div className="status-legend"><span className="status verified">VERIFICADO</span><span className="status partial">PARCIAL</span><span className="status pending">PENDIENTE</span><span className="status frontier">FRONTERA</span><p>Estos estados se usarán para teoría, clases, documentos, laboratorios, ejercicios, exámenes y proyectos.</p></div>
    </section>

    <section id="ruta" className="page-section roadmap-section reveal-section">
      <div className="section-head"><span>03 · PLAN INTEGRADO</span><h2>{stages.length} etapas.<br/><em>Un solo camino navegable.</em></h2><p>Haz clic en “Entrar al aula” para estudiar una materia dentro del campus.</p></div>
      <div className="toolbar"><label className="search"><span>⌕</span><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar algoritmos, redes, IA, física…"/></label><div className="phase-chips"><button className={phase==="todas"?"active":""} onClick={()=>setPhase("todas")}>Todas</button>{phaseMeta.map(p=><button className={phase===p.id?"active":""} onClick={()=>setPhase(p.id)} key={p.id}>{p.label}</button>)}</div></div>
      <div className="stage-list">
        {stages.filter(s=>phase==="todas"||phaseFor(s.index).id===phase).map(stage=>{
          const meta=phaseFor(stage.index); const stageSubjects=filteredSubjects.filter(x=>x.stage.code===stage.code); if(query&&stageSubjects.length===0)return null;
          const done=stage.subjects.filter((_,i)=>completed.has(subjectKey(stage,i))).length;
          return <article className="stage-card" key={stage.code} style={{"--accent":meta.color} as CSSProperties}>
            <div className="stage-side"><span>{stage.code}</span><small>{stage.year}</small><i style={{height:`${stage.subjects.length?done/stage.subjects.length*100:0}%`}}/></div>
            <div className="stage-content"><div className="stage-heading"><div><small>{meta.label}</small><h3>{stage.title}</h3><p>{stage.duration} · {done}/{stage.subjects.length} materias dominadas</p></div><span className="stage-outcome">{stage.outcome}</span></div>
              <div className="subject-grid">{stageSubjects.map(({subject,index})=>{const key=subjectKey(stage,index),isDone=completed.has(key); return <article className={`subject-card ${isDone?"done":""}`} key={key}><div className="subject-num">{String(index+1).padStart(2,"0")}</div><h4>{subject.name}</h4><p>{subject.study}</p><div className="subject-actions"><button className="classroom-btn" onClick={()=>openClassroom(stage,subject,index)}>Entrar al aula <span>→</span></button><label><input type="checkbox" checked={isDone} onChange={()=>toggle(key)}/>{isDone?"Dominada":"Marcar"}</label></div></article>})}</div>
              <div className="stage-footer"><div><b>Proyecto de etapa</b><p>{stage.capstone}</p></div><label><input type="checkbox" checked={completed.has(`${stage.code}-gate`)} onChange={()=>toggle(`${stage.code}-gate`)}/><span><b>Puerta de aprobación</b><small>{stage.gate}</small></span></label></div>
            </div>
          </article>
        })}
      </div>
    </section>

    <section id="biblioteca" className="library-section page-section dark-section reveal-section">
      <div className="section-head light"><span>04 · BIBLIOTECA</span><h2>Todo el material,<br/><em>desde un solo lugar.</em></h2><p>La v3 centraliza los recursos. La siguiente fase sustituirá progresivamente enlaces por contenido propio o legalmente redistribuible dentro del aula.</p></div>
      <label className="search dark-search"><span>⌕</span><input value={libraryQuery} onChange={e=>setLibraryQuery(e.target.value)} placeholder="Buscar libro, clase, fuente, materia…"/></label>
      <div className="library-grid">{filteredLibrary.slice(0,24).map((item,i)=><article key={`${item.url}-${i}`}><span className="file-icon">{item.label.toLowerCase().includes("youtube")||item.where.toLowerCase().includes("clase")?"▶":"▤"}</span><small>{item.stage.code} · {item.subject.name}</small><h3>{item.label}</h3><p>{item.where}</p><div><button onClick={()=>openClassroom(item.stage,item.subject,item.index)}>Ver en aula</button><a href={item.url} target="_blank" rel="noreferrer">Fuente ↗</a></div></article>)}</div>
      {filteredLibrary.length>24&&<p className="library-more">Mostrando 24 de {filteredLibrary.length} recursos. Usa el buscador para encontrar el resto.</p>}
    </section>

    <section id="maestrias" className="page-section mastery-section reveal-section">
      <div className="section-head"><span>05 · RUTAS DE MAESTRÍA</span><h2>Profundiza hasta<br/><em>nivel especialista.</em></h2></div>
      <label className="search"><span>⌕</span><input value={trackQuery} onChange={e=>setTrackQuery(e.target.value)} placeholder="Buscar cloud, DFIR, robótica, quantum…"/></label>
      <div className="track-grid">{filteredTracks.map(track=>{const done=track.units.filter((_,i)=>completed.has(trackUnitKey(track,i))).length;return <article className="track-card" key={track.code}><div className="track-icon">{track.icon}</div><small>{track.code} · {track.family}</small><h3>{track.title}</h3><p>{track.goal}</p><div className="track-meter"><i style={{width:`${done/track.units.length*100}%`}}/></div><div className="track-units">{track.units.map((unit,i)=><label key={unit.name}><input type="checkbox" checked={completed.has(trackUnitKey(track,i))} onChange={()=>toggle(trackUnitKey(track,i))}/><span><b>{unit.name}</b><small>{unit.focus}</small></span></label>)}</div><div className="track-gate"><b>Examen final</b><p>{track.gate}</p><label><input type="checkbox" checked={completed.has(`${track.code}-gate`)} onChange={()=>toggle(`${track.code}-gate`)}/> Track dominado</label></div></article>})}</div>
    </section>

    <section id="cobertura" className="page-section coverage-section reveal-section">
      <div className="section-head"><span>06 · COBERTURA PROFESIONAL</span><h2>Cientos de títulos,<br/><em>14 familias reales.</em></h2></div>
      <div className="family-grid">{careerFamilies.map(f=><article key={f.id}><span>{f.id}</span><h3>{f.title}</h3><p>{f.examples}</p><div><b>Tronco</b><code>{f.core}</code></div><div><b>Tracks</b><code>{f.tracks}</code></div></article>)}</div>
    </section>

    <Suspense fallback={<section id="auditoria" className="audit-section page-section audit-loading"><div className="audit-loader"><Icon name="spark"/><span>Cargando auditoría mundial bajo demanda…</span></div></section>}>
      <AuditSection/>
    </Suspense>

    <section className="sources-section dark-section page-section">
      <div className="section-head light"><span>08 · FUENTES DEL ROADMAP</span><h2>{rootSources.length} ecosistemas<br/><em>para verificar rigor.</em></h2></div>
      <div className="sources-grid">{rootSources.map(s=><a href={s.url} target="_blank" rel="noreferrer" key={s.n}><span>{String(s.n).padStart(2,"0")}</span><small>{s.kind}</small><h3>{s.name}</h3><p>{s.use}</p><b>Abrir ↗</b></a>)}</div>
    </section>

    <footer><div><span className="brand-mark">CM</span><div><b>Campus Maestro de Computación v3.2</b><small>Universidad digital autodidacta open-source · 2026</small></div></div><p>El campus prioriza acceso gratuito, español y evidencia práctica. Materiales externos conservan sus licencias; el contenido interno crecerá solo con material propio, abierto o redistribuible.</p></footer>

    {classroom && <div className="classroom-overlay" role="dialog" aria-modal="true">
      <div className="classroom-shell">
        <header className="classroom-header"><div><small>{classroom.stage.code} · {classroom.stage.title}</small><h2>{classroom.subject.name}</h2><span className="classroom-status"><i/> CONTENIDO EN CONSTRUCCIÓN AUDITADA</span></div><button onClick={()=>setClassroom(null)} aria-label="Cerrar aula"><Icon name="close"/></button></header>
        <nav className="classroom-tabs">{classroomTabs.map(([id,label])=><button key={id} className={tab===id?"active":""} onClick={()=>setTab(id)}>{label}</button>)}</nav>
        <div className="classroom-body">
          {tab==="resumen"&&<div className="classroom-grid"><article><span>OBJETIVO</span><h3>Qué vas a dominar</h3><p>{classroom.subject.study}</p></article><article><span>EVIDENCIA</span><h3>Qué debes producir</h3><p>{classroom.subject.evidence}</p></article><article className="wide"><span>RUTA DEL AULA</span><div className="learning-path">{["Teoría","Clase","PDF","Laboratorio","Ejercicios","Examen","Proyecto"].map((x,i)=><div key={x}><b>{i+1}</b><span>{x}</span></div>)}</div></article></div>}
          {tab==="teoria"&&<article className="reader"><span>TEORÍA INTERNA · EN CONSTRUCCIÓN AUDITADA</span><h3>{classroom.subject.name}</h3><p>{classroom.subject.study}</p><p>Esta aula forma parte del motor v3.2. El contenido completo se incorporará únicamente cuando tenga trazabilidad académica y licencia compatible: capítulos propios, fórmulas, ejemplos, diagramas, código, práctica y evaluación. Mientras falte una pieza, el aula no se declarará completa.</p><div className="reader-callout"><b>Resultado esperado</b><p>{classroom.stage.outcome}</p></div></article>}
          {tab==="clases"&&<div className="media-panel"><div className="video-placeholder"><span>▶</span><b>Reproductor de clases</b><small>Preparado para vídeo embebido y subtítulos</small></div><h3>Clases y fuentes disponibles</h3>{classroom.subject.sources.map(s=><a href={s.url} target="_blank" rel="noreferrer" key={s.url}><span>▶</span><div><b>{s.label}</b><small>{s.where}</small></div></a>)}</div>}
          {tab==="pdf"&&<div className="media-panel"><div className="pdf-placeholder"><span>PDF</span><b>Visor documental integrado</b><small>La estructura está lista para PDF.js en la fase de contenido.</small></div>{classroom.subject.sources.map(s=><a href={s.url} target="_blank" rel="noreferrer" key={s.url}><span>▤</span><div><b>{s.label}</b><small>{s.where}</small></div></a>)}</div>}
          {tab==="lab"&&<article className="reader"><span>LABORATORIO</span><h3>Práctica reproducible</h3><p>{classroom.subject.evidence}</p><ol><li>Prepara un entorno aislado y documenta versiones.</li><li>Realiza la práctica sin copiar una solución final.</li><li>Captura resultados, errores y decisiones.</li><li>Repite desde cero hasta obtener el mismo resultado.</li></ol></article>}
          {tab==="ejercicios"&&<article className="reader"><span>EJERCICIOS</span><h3>Banco de práctica</h3><p>Banco todavía pendiente de poblar. La v3.2 no inventa ejercicios para aparentar cobertura: cada problema se añadirá con objetivo, dificultad, competencia, criterio de corrección y relación con la evidencia obligatoria.</p></article>}
          {tab==="examen"&&<article className="reader exam"><span>MODO EXAMEN</span><h3>Puerta de dominio</h3><p>{classroom.stage.gate}</p><div className="exam-rule"><b>Criterio</b><p>No marques la materia como dominada por haber visto contenido. Debes explicar, resolver y defender el trabajo sin tutorial paso a paso.</p></div></article>}
          {tab==="proyecto"&&<article className="reader"><span>PROYECTO</span><h3>Proyecto de etapa</h3><p>{classroom.stage.capstone}</p><div className="reader-callout"><b>Entregables mínimos</b><p>Repositorio, README técnico, pruebas, evidencia reproducible, decisiones de diseño y breve defensa oral.</p></div></article>}
          {tab==="notas"&&<div className="notes-panel"><h3>Mis notas</h3><p>Se guardan localmente en este navegador. La sincronización multidispositivo aún no se presenta como terminada.</p><textarea value={notes[subjectKey(classroom.stage,classroom.index)]??""} onChange={e=>setNotes(n=>({...n,[subjectKey(classroom.stage,classroom.index)]:e.target.value}))} placeholder="Escribe tus apuntes, dudas, fórmulas, comandos, errores y aprendizajes…"/></div>}
        </div>
        <footer className="classroom-footer"><label><input type="checkbox" checked={completed.has(subjectKey(classroom.stage,classroom.index))} onChange={()=>toggle(subjectKey(classroom.stage,classroom.index))}/> {completed.has(subjectKey(classroom.stage,classroom.index))?"Materia dominada ✓":"Marcar como dominada"}</label><span>Local-first · sincronización pendiente de implementación</span></footer>
      </div>
    </div>}
  </main>;
}
