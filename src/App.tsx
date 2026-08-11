import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { rootSources, stages, type Stage } from "./roadmap-data";
import { careerFamilies, masteryTracks, type MasteryTrack } from "./mastery-data";

const phaseMeta = [
  { id: "inicio", label: "Inicio", range: [0, 0], color: "#f59e0b", icon: "◉" },
  { id: "tronco", label: "Tronco universitario", range: [1, 6], color: "#2563eb", icon: "◆" },
  { id: "profesional", label: "Ingeniería aplicada", range: [7, 10], color: "#7c3aed", icon: "⬢" },
  { id: "datos", label: "Datos e IA", range: [11, 15], color: "#0891b2", icon: "✦" },
  { id: "frontera", label: "Hardware y frontera", range: [16, 19], color: "#e11d48", icon: "▲" },
];

const stageIcons = [
  "🧭", "∑", "λ", "⚙", "▣", "⌘", "⛓", "◫", "↯", "☁",
  "◎", "▥", "⇄", "◈", "✦", "⌁", "▦", "⌁", "◉", "∞",
];

function phaseFor(index: number) {
  return phaseMeta.find((phase) => index >= phase.range[0] && index <= phase.range[1]) ?? phaseMeta[0];
}

function normalized(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function stageMatches(stage: Stage, query: string) {
  if (!query) return true;
  const haystack = [stage.code, stage.title, stage.outcome, ...stage.subjects.flatMap((subject) => [subject.name, subject.study, subject.evidence])].join(" ");
  return normalized(haystack).includes(normalized(query));
}

function trackMatches(track: MasteryTrack, query: string) {
  if (!query) return true;
  const haystack = [track.code, track.title, track.family, track.goal, ...track.units.flatMap((unit) => [unit.name, unit.focus, unit.evidence])].join(" ");
  return normalized(haystack).includes(normalized(query));
}

function subjectKey(stage: Stage, subjectIndex: number) { return `${stage.code}-m${subjectIndex}`; }
function trackUnitKey(track: MasteryTrack, unitIndex: number) { return `${track.code}-u${unitIndex}`; }

export default function App() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [openStages, setOpenStages] = useState<Set<string>>(new Set(["S0"]));
  const [openTracks, setOpenTracks] = useState<Set<string>>(new Set(["T01"]));
  const [query, setQuery] = useState("");
  const [trackQuery, setTrackQuery] = useState("");
  const [phase, setPhase] = useState("todas");
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    try {
      const savedV2 = window.localStorage.getItem("roadmap-maestro-progreso-v2");
      const savedV1 = window.localStorage.getItem("roadmap-maestro-progreso-v1");
      const saved = savedV2 ?? savedV1;
      if (saved) setCompleted(new Set(JSON.parse(saved)));
    } catch { /* Funciona aunque el navegador bloquee localStorage. */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem("roadmap-maestro-progreso-v2", JSON.stringify([...completed])); }
    catch { /* Progreso de sesión si no hay almacenamiento persistente. */ }
  }, [completed]);

  const filteredStages = useMemo(() => stages.filter((stage) => {
    const currentPhase = phaseFor(stage.index);
    return (phase === "todas" || currentPhase.id === phase) && stageMatches(stage, query);
  }), [phase, query]);

  const filteredTracks = useMemo(() => masteryTracks.filter((track) => trackMatches(track, trackQuery)), [trackQuery]);

  const coreUnits = stages.reduce((sum, stage) => sum + stage.subjects.length, 0);
  const trackUnits = masteryTracks.reduce((sum, track) => sum + track.units.length, 0);
  const allTasks = coreUnits + stages.length + trackUnits + masteryTracks.length;
  const doneCount = [...completed].filter((key) => /^S\d+-m\d+$|^S\d+-gate$|^T\d+-u\d+$|^T\d+-gate$/.test(key)).length;
  const percent = Math.min(100, Math.round((doneCount / allTasks) * 100));

  function toggleTask(key: string) {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  function toggleSetValue(value: string, setter: typeof setOpenStages) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value); else next.add(value);
      return next;
    });
  }

  function scrollToRoadmap() { document.getElementById("ruta")?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">RM</span>
          <span><b>Roadmap Maestro</b><small>Computación · v2.0 · 2026</small></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#metodo">Método</a><a href="#ruta">Tronco</a><a href="#especialidades">Maestría</a><a href="#cobertura">Cobertura</a><a href="#fuentes">Fuentes</a>
        </nav>
        <button className="print-btn" onClick={() => window.print()}>Guardar / imprimir PDF</button>
        <button className="progress-pill" onClick={scrollToRoadmap} aria-label={`Progreso total ${percent} por ciento`}>
          <span>{percent}%</span><i style={{ "--progress": `${percent}%` } as CSSProperties} />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><i /> DESDE CERO · ESPAÑOL PRIMERO · COSTO OBLIGATORIO S/0</span>
            <h1>Una base universitaria.<br /><em>Doce rutas de maestría.</em></h1>
            <p>Un programa abierto para estudiar computación con orden: primero el tronco que comparten las grandes carreras; después las especialidades que cubren software, sistemas, datos, IA, seguridad, redes, hardware, robótica, infraestructura, gráficos, ciencia aplicada y frontera.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={scrollToRoadmap}>Comenzar por S0 <span>→</span></button>
              <a className="secondary-btn" href="#especialidades">Ver rutas de maestría</a>
            </div>
            <div className="hero-notes"><span>✓ Teoría + práctica + evaluación</span><span>✓ Proyectos reproducibles</span><span>✓ Progreso local y editable</span></div>
          </div>

          <div className="route-poster" aria-label="Resumen visual de la ruta">
            <div className="poster-label">ARQUITECTURA DE APRENDIZAJE</div><div className="poster-road" />
            {phaseMeta.map((item, index) => (
              <div className={`poster-stop stop-${index + 1}`} key={item.id} style={{ "--phase": item.color } as CSSProperties}>
                <span>{item.icon}</span><div><b>{String(index + 1).padStart(2, "0")}</b><small>{item.label}</small></div>
              </div>
            ))}
            <div className="poster-finish"><span>∞</span><b>12 tracks<br />+ investigación</b></div>
          </div>
        </div>

        <div className="stats-strip">
          <div><strong>{stages.length}</strong><span>etapas del tronco</span></div>
          <div><strong>{coreUnits}</strong><span>materias/bloques base</span></div>
          <div><strong>{masteryTracks.length}</strong><span>rutas de maestría</span></div>
          <div><strong>{rootSources.length}</strong><span>ecosistemas auditados</span></div>
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="section-heading"><span className="section-number">01</span><div><p>MÉTODO DE ESTUDIO</p><h2>No colecciones cursos: <em>demuestra dominio.</em></h2></div></div>
        <div className="method-grid">
          {[
            ["1", "Estudia", "Abre la fuente exacta, completa la teoría indicada y toma apuntes propios. Usa una segunda fuente solo si un concepto sigue oscuro."],
            ["2", "Resuelve", "Haz problemas, código y laboratorios sin tutorial paso a paso. La práctica debe poder repetirse desde cero."],
            ["3", "Evalúate", "Rinde la puerta de aprobación sin ayuda. Si no alcanzas 70–80 %, corrige el hueco y vuelve a intentarlo."],
            ["4", "Construye", "Cierra cada etapa con un proyecto independiente, pruebas, documentación, mediciones y defensa oral."],
          ].map(([n, title, text]) => <article className="method-card" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <button className="intro-toggle" onClick={() => setShowIntro(!showIntro)} aria-expanded={showIntro}>{showIntro ? "Ocultar" : "Mostrar"} reglas de uso <span>{showIntro ? "−" : "+"}</span></button>
        {showIntro && <div className="rules-panel">
          <div><b>Orden</b><p>El tronco S0→S19 es secuencial. Las rutas T01→T12 se abren cuando hayas cumplido sus prerrequisitos.</p></div>
          <div><b>Costo cero</b><p>Certificados, hardware, nube y software comercial nunca son requisitos de aprobación. Usa simuladores, local, open source y modalidad gratuita.</p></div>
          <div><b>Español primero</b><p>La columna vertebral prioriza español. En frontera, un recurso en inglés se marca EN→ES y debe estudiarse con traducción, sin reemplazar el aprendizaje técnico.</p></div>
        </div>}
      </section>

      <section className="roadmap-section" id="ruta">
        <div className="section-heading"><span className="section-number">02</span><div><p>TRONCO UNIVERSITARIO INTEGRADO</p><h2>De cero a frontera, <em>en orden.</em></h2></div></div>
        <p className="section-lead">Estas 20 etapas son la base común. No pretenden convertir cada título profesional en una asignatura distinta: concentran los conocimientos que se repiten entre Computer Science, Ingeniería Informática, Sistemas, Software, Datos, IA, Redes y Computación.</p>

        <div className="roadmap-toolbar">
          <label className="search-box"><span>⌕</span><input value={query} onChange={(event: { target: { value: string } }) => setQuery(event.target.value)} placeholder="Buscar: algoritmos, redes, IA, física…" /></label>
          <div className="phase-filters" role="group" aria-label="Filtrar por fase"><button className={phase === "todas" ? "active" : ""} onClick={() => setPhase("todas")}>Todas</button>{phaseMeta.map((item) => <button className={phase === item.id ? "active" : ""} onClick={() => setPhase(item.id)} key={item.id}>{item.label}</button>)}</div>
        </div>

        <div className="progress-overview"><div><span>PROGRESO GLOBAL</span><b>{doneCount} de {allTasks} comprobaciones</b></div><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><strong>{percent}%</strong></div>

        <div className="timeline">
          {filteredStages.map((stage) => {
            const meta = phaseFor(stage.index);
            const stageKeys = stage.subjects.map((_, index) => subjectKey(stage, index));
            const gateKey = `${stage.code}-gate`;
            const stageDone = [...stageKeys, gateKey].filter((key) => completed.has(key)).length;
            const stageTotal = stageKeys.length + 1;
            const isOpen = openStages.has(stage.code) || Boolean(query);
            return (
              <article className={`stage ${isOpen ? "open" : ""}`} key={stage.code} style={{ "--accent": meta.color } as CSSProperties}>
                <div className="timeline-dot"><span>{stageIcons[stage.index]}</span></div>
                <button className="stage-header" onClick={() => toggleSetValue(stage.code, setOpenStages)} aria-expanded={isOpen}>
                  <div className="stage-code"><span>{stage.code}</span><small>{stage.year}</small></div>
                  <div className="stage-title"><span>{meta.label}</span><h3>{stage.title}</h3><p>{stage.duration} · {stageDone}/{stageTotal} aprobaciones</p></div>
                  <div className="stage-meter"><i style={{ width: `${Math.round((stageDone / stageTotal) * 100)}%` }} /></div><span className="expand-icon">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="stage-body">
                  <div className="stage-context"><div><span>PRERREQUISITOS</span><p>{stage.prerequisites}</p></div><div><span>RESULTADO</span><p>{stage.outcome}</p></div></div>
                  <div className="subjects">{stage.subjects.map((subject, subjectIndex) => {
                    const key = subjectKey(stage, subjectIndex); const done = completed.has(key);
                    return <article className={`subject ${done ? "done" : ""}`} key={key}>
                      <div className="subject-top"><span className="subject-number">{String(subjectIndex + 1).padStart(2, "0")}</span><h4>{subject.name}</h4><label className="check-label"><input type="checkbox" checked={done} onChange={() => toggleTask(key)} /><span>{done ? "Completada" : "Marcar"}</span></label></div>
                      <div className="subject-columns"><div className="learn-block"><b>QUÉ ESTUDIAR</b><p>{subject.study}</p></div><div className="practice-block"><b>PRÁCTICA OBLIGATORIA</b><p>{subject.evidence}</p></div></div>
                      <div className="source-links">{subject.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={`${source.url}-${source.where}`}><span>↗</span><div><b>{source.label}</b><small>Ir a: {source.where}</small></div></a>)}</div>
                    </article>;
                  })}</div>
                  <div className="stage-finish"><div className="capstone-box"><span>PROYECTO DE ETAPA</span><p>{stage.capstone}</p></div><label className={`gate-box ${completed.has(gateKey) ? "done" : ""}`}><input type="checkbox" checked={completed.has(gateKey)} onChange={() => toggleTask(gateKey)} /><div><span>PUERTA DE APROBACIÓN</span><p>{stage.gate}</p><b>{completed.has(gateKey) ? "APROBADA ✓" : "NO AVANCES HASTA CUMPLIRLA"}</b></div></label></div>
                </div>
              </article>
            );
          })}
          {filteredStages.length === 0 && <p className="empty-state">No encontré esa materia en esta fase. Prueba otra palabra o selecciona “Todas”.</p>}
        </div>
      </section>

      <section className="mastery-section" id="especialidades">
        <div className="section-heading"><span className="section-number">03</span><div><p>RUTAS DE MAESTRÍA</p><h2>La amplitud que una sola carrera <em>no puede contener.</em></h2></div></div>
        <p className="section-lead">Si tu objetivo es cubrir todas las familias profesionales, estas 12 rutas pasan a ser obligatorias después del tronco. Si buscas una carrera concreta, usa solo las rutas asociadas en la matriz de cobertura.</p>
        <label className="search-box mastery-search"><span>⌕</span><input value={trackQuery} onChange={(event: { target: { value: string } }) => setTrackQuery(event.target.value)} placeholder="Buscar especialidad: cloud, DFIR, robótica, quantum…" /></label>
        <div className="track-grid">
          {filteredTracks.map((track) => {
            const unitKeys = track.units.map((_, i) => trackUnitKey(track, i)); const gateKey = `${track.code}-gate`;
            const done = [...unitKeys, gateKey].filter((key) => completed.has(key)).length; const total = unitKeys.length + 1;
            const isOpen = openTracks.has(track.code) || Boolean(trackQuery);
            return <article className={`track-card ${isOpen ? "open" : ""}`} key={track.code}>
              <button className="track-head" onClick={() => toggleSetValue(track.code, setOpenTracks)} aria-expanded={isOpen}>
                <span className="track-icon">{track.icon}</span><div><small>{track.code} · {track.family}</small><h3>{track.title}</h3><p>{track.duration} · {done}/{total} aprobaciones</p></div><b>{isOpen ? "−" : "+"}</b>
              </button>
              <div className="track-body"><div className="track-meta"><div><span>PRERREQUISITOS</span><p>{track.prerequisites}</p></div><div><span>META</span><p>{track.goal}</p></div></div>
                <div className="track-units">{track.units.map((unit, i) => {
                  const key = trackUnitKey(track, i); const checked = completed.has(key);
                  return <article className={`track-unit ${checked ? "done" : ""}`} key={key}>
                    <header><span>{String(i + 1).padStart(2, "0")}</span><h4>{unit.name}</h4><label><input type="checkbox" checked={checked} onChange={() => toggleTask(key)} />{checked ? "Dominada" : "Marcar"}</label></header>
                    <div className="track-unit-grid"><div><b>DOMINIO</b><p>{unit.focus}</p></div><div><b>EVIDENCIA</b><p>{unit.evidence}</p></div></div>
                    <div className="track-sources">{unit.sources.map((source) => <a key={`${source.url}-${source.label}`} href={source.url} target="_blank" rel="noreferrer"><span>{source.lang}</span><div><b>{source.label}</b><small>{source.note}</small></div></a>)}</div>
                  </article>;
                })}</div>
                <label className={`track-gate ${completed.has(gateKey) ? "done" : ""}`}><input type="checkbox" checked={completed.has(gateKey)} onChange={() => toggleTask(gateKey)} /><div><span>EXAMEN / PUERTA DEL TRACK</span><p>{track.gate}</p></div></label>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="coverage-section" id="cobertura">
        <div className="section-heading"><span className="section-number">04</span><div><p>MAPA DE CARRERAS Y ROLES</p><h2>Miles de nombres, <em>14 familias de conocimiento.</em></h2></div></div>
        <p className="section-lead">Un nombre laboral no equivale siempre a una carrera independiente. Esta matriz agrupa títulos, especialidades y roles por conocimiento compartido para evitar estudiar lo mismo decenas de veces.</p>
        <div className="coverage-table-wrap"><table className="coverage-table"><thead><tr><th>Familia</th><th>Ejemplos incluidos</th><th>Tronco</th><th>Tracks</th><th>Criterio</th></tr></thead><tbody>{careerFamilies.map((family) => <tr key={family.id}><td><b>{family.title}</b></td><td>{family.examples}</td><td><code>{family.core}</code></td><td><code>{family.tracks}</code></td><td>{family.note}</td></tr>)}</tbody></table></div>
        <div className="coverage-note"><b>Importante</b><p>Roles como “black-hat hacker”, operador de ransomware o actividades no autorizadas aparecen en taxonomías históricas/laborales, pero no constituyen objetivos formativos de esta ruta. La ciberseguridad se estudia con ética, legalidad, laboratorios propios y autorización explícita.</p></div>
      </section>

      <section className="sources-section" id="fuentes">
        <div className="section-heading light"><span className="section-number">05</span><div><p>DIRECTORIO AUDITADO</p><h2>{rootSources.length} ecosistemas, <em>cada uno con una función.</em></h2></div></div>
        <p className="sources-intro">No todas las fuentes tienen el mismo peso: unas validan la malla, otras enseñan el tronco, otras aportan exámenes/laboratorios y otras sirven solo para detectar huecos. El roadmap evita depender de una sola plataforma.</p>
        <div className="source-grid">{rootSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" className="source-card" key={source.n}><span>{String(source.n).padStart(2, "0")}</span><div><small>{source.kind}</small><h3>{source.name}</h3><p>{source.use}</p><b>Abrir fuente ↗</b></div></a>)}</div>
        <div className="minimum-box"><div><span>VALIDACIÓN</span><b>FING + CS2023</b><p>Dicen qué áreas no deberían faltar.</p></div><div><span>TRONCO MÍNIMO</span><b>OpenFING + FAMAF + UBA/UTN</b><p>Teoría, problemas, prácticas y exámenes universitarios.</p></div><div className="recommended"><span>COBERTURA TOTAL</span><b>Tronco + 12 tracks</b><p>Solo esta arquitectura intenta cubrir todas las familias sin duplicar carreras enteras.</p></div></div>
      </section>

      <footer><div><span className="brand-mark">RM</span><p><b>Roadmap Maestro de Computación v2.0</b><br />Proyecto abierto y editable · edición 2026</p></div><p>Gratis significa que completar la ruta no obliga a pagar. Certificaciones, hardware, cuentas cloud o software comercial son opcionales. Para investigación de frontera, aprender lectura técnica en inglés seguirá siendo una competencia necesaria.</p></footer>
    </main>
  );
}
