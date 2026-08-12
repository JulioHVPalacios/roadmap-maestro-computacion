import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Circle,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FlaskConical,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Menu,
  MessageSquare,
  Network,
  Newspaper,
  Search,
  ShieldCheck,
  TerminalSquare,
  Users,
  Waypoints,
  X,
} from "lucide-react"
import SolarKnowledgeHero from "./components/SolarKnowledgeHero"
import { rootSources, stages, type Stage, type Subject } from "./roadmap-data"
import { careerFamilies, masteryTracks, type MasteryTrack } from "./mastery-data"
import { inferProfessionProfile, professionTitles } from "./profession-atlas"

const totalSubjects = stages.reduce((sum, stage) => sum + stage.subjects.length, 0)
const totalTrackUnits = masteryTracks.reduce((sum, track) => sum + track.units.length, 0)
const PROFESSIONS_TOTAL = 2247
const PROFESSIONS_UNIQUE = professionTitles.length

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

const facultyTiles = [
  { code: "01", title: "Ciencias de la Computación", kicker: "FUNDAMENTOS", text: "Matemática, algoritmos, teoría, lenguajes, arquitectura y sistemas.", image: asset("/planets/earth.jpg"), icon: GraduationCap },
  { code: "02", title: "Ingeniería de Software", kicker: "CONSTRUCCIÓN", text: "Arquitectura, web, móvil, APIs, testing, DevOps y plataformas.", image: asset("/planets/mars.jpg"), icon: Code2 },
  { code: "03", title: "Datos & BI", kicker: "INFORMACIÓN", text: "Bases de datos, análisis, visualización, ingeniería y gobierno del dato.", image: asset("/planets/jupiter.jpg"), icon: Database },
  { code: "04", title: "Inteligencia Artificial", kicker: "INTELIGENCIA", text: "ML, deep learning, modelos fundacionales, agentes, MLOps y evaluación.", image: asset("/planets/saturn.jpg"), icon: BrainCircuit },
  { code: "05", title: "Ciberseguridad", kicker: "CONFIANZA", text: "Seguridad ofensiva y defensiva, AppSec, criptografía, DFIR y gobierno.", image: asset("/planets/neptune.jpg"), icon: ShieldCheck },
  { code: "06", title: "Redes & Telecom", kicker: "COMUNICACIONES", text: "Protocolos, routing, wireless, cloud networking, automatización y telecom.", image: asset("/planets/uranus.jpg"), icon: Network },
  { code: "07", title: "Hardware & Sistemas", kicker: "BAJO NIVEL", text: "Arquitectura, SO, firmware, embebidos, FPGA/ASIC conceptual y HPC.", image: asset("/planets/mercury.jpg"), icon: Cpu },
  { code: "08", title: "Frontera Científica", kicker: "INVESTIGACIÓN", text: "Cuántica, bioinformática, gráficos, robótica, XR, ciencia y tecnologías emergentes.", image: asset("/planets/venus.jpg"), icon: FlaskConical },
]

const method = [
  ["01", "Comprender", "Teoría, matemática y fundamentos antes de memorizar herramientas."],
  ["02", "Construir", "Laboratorios reproducibles y sistemas completos que obligan a aplicar."],
  ["03", "Demostrar", "Exámenes, proyectos, evidencias, defensa y criterios explícitos de dominio."],
  ["04", "Actualizar", "Auditoría periódica de fuentes, estándares, herramientas y frontera científica."],
]

const ecosystem = [
  { icon: Newspaper, title: "Noticias & observatorio", text: "Tecnología, computación, IA, seguridad, ciencia y cambios de la industria.", status: "Fase futura" },
  { icon: GitBranch, title: "Proyectos & portafolio", text: "Sistemas, ERP, herramientas, investigación, open source y entregables públicos.", status: "Fase futura" },
  { icon: Gamepad2, title: "Videojuegos & experiencias", text: "Proyectos de juegos, gráficos, motores, XR y experimentación interactiva.", status: "Fase futura" },
  { icon: Users, title: "Comunidad & foro", text: "Debates técnicos, grupos de estudio, revisiones, retos y colaboración entre estudiantes.", status: "Fase futura" },
  { icon: TerminalSquare, title: "Laboratorio personal", text: "Bitácora técnica, publicaciones, benchmarks, demos, notas y experimentos reproducibles.", status: "Fase futura" },
  { icon: MessageSquare, title: "Perfil profesional", text: "Tu trayectoria, especialidades, proyectos, investigación, servicios y presencia pública.", status: "Fase futura" },
]

type SearchEntry = { kind: string; label: string; meta: string; action: () => void }

function readProgress() {
  try {
    const raw = localStorage.getItem("campus-maestro-v14-progress")
    return new Set<string>(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set<string>()
  }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<MasteryTrack>(masteryTracks[0])
  const [professionQuery, setProfessionQuery] = useState("")
  const [selectedProfession, setSelectedProfession] = useState<string>(professionTitles[0])
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [completed, setCompleted] = useState<Set<string>>(readProgress)

  useEffect(() => {
    localStorage.setItem("campus-maestro-v14-progress", JSON.stringify(Array.from(completed)))
  }, [completed])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === "Escape") {
        setSearchOpen(false)
        setSelectedStage(null)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const progress = Math.round((completed.size / totalSubjects) * 100)

  const professionMatches = useMemo(() => {
    const q = professionQuery.trim().toLocaleLowerCase("es")
    if (!q) return professionTitles.slice(0, 12)
    return professionTitles.filter((title) => title.toLocaleLowerCase("es").includes(q)).slice(0, 18)
  }, [professionQuery])

  const professionProfile = useMemo(() => inferProfessionProfile(selectedProfession), [selectedProfession])

  const globalResults = useMemo<SearchEntry[]>(() => {
    const q = searchQuery.trim().toLocaleLowerCase("es")
    if (!q) return []
    const entries: SearchEntry[] = []
    for (const stage of stages) {
      if (`${stage.code} ${stage.title} ${stage.outcome}`.toLocaleLowerCase("es").includes(q)) {
        entries.push({ kind: "Etapa", label: `${stage.code} · ${stage.title}`, meta: stage.duration, action: () => { setSelectedStage(stage); setSearchOpen(false) } })
      }
      for (const subject of stage.subjects) {
        if (`${subject.name} ${subject.study}`.toLocaleLowerCase("es").includes(q)) {
          entries.push({ kind: "Materia", label: subject.name, meta: `${stage.code} · ${stage.title}`, action: () => { setSelectedStage(stage); setSearchOpen(false) } })
        }
      }
    }
    for (const track of masteryTracks) {
      if (`${track.code} ${track.title} ${track.family} ${track.goal}`.toLocaleLowerCase("es").includes(q)) {
        entries.push({ kind: "Maestría", label: track.title, meta: `${track.code} · ${track.duration}`, action: () => { setSelectedTrack(track); setSearchOpen(false); document.querySelector("#maestrias")?.scrollIntoView({ behavior: "smooth" }) } })
      }
    }
    for (const source of rootSources) {
      if (`${source.name} ${source.kind} ${source.use}`.toLocaleLowerCase("es").includes(q)) {
        entries.push({ kind: "Fuente", label: source.name, meta: source.kind, action: () => window.open(source.url, "_blank", "noopener,noreferrer") })
      }
    }
    for (const title of professionTitles) {
      if (title.toLocaleLowerCase("es").includes(q)) {
        entries.push({ kind: "Profesión", label: title, meta: inferProfessionProfile(title).family, action: () => { setSelectedProfession(title); setProfessionQuery(title); setSearchOpen(false); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }) } })
        if (entries.length > 24) break
      }
    }
    return entries.slice(0, 24)
  }, [searchQuery])

  const toggleSubject = (stage: Stage, subject: Subject) => {
    const id = `${stage.code}::${subject.name}`
    setCompleted((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="site-shell v14-shell">
      <header className="site-header v14-header">
        <div className="top-signal">
          <span>Campus Maestro / Computación</span>
          <span className="hide-mobile">Open source · Español primero · costo obligatorio S/0</span>
          <span>V14</span>
        </div>
        <div className="main-nav">
          <a href="#inicio" className="brand-lockup" aria-label="Campus Maestro inicio">
            <span className="brand-mark">CM</span>
            <span><strong>Campus Maestro</strong><small>Computación integral</small></span>
          </a>
          <nav>
            <a href="#campus">Campus</a>
            <a href="#plan">Plan</a>
            <a href="#maestrias">Maestrías</a>
            <a href="#atlas">Atlas</a>
            <a href="#biblioteca">Biblioteca</a>
          </nav>
          <div className="nav-actions">
            <button type="button" onClick={() => setSearchOpen(true)}><Search size={17} /> Buscar <kbd>Ctrl K</kbd></button>
            <a href="#plan">Entrar al campus <ArrowRight size={17} /></a>
          </div>
          <button type="button" className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-nav">
            <a href="#campus" onClick={() => setMenuOpen(false)}>Campus</a>
            <a href="#plan" onClick={() => setMenuOpen(false)}>Plan</a>
            <a href="#maestrias" onClick={() => setMenuOpen(false)}>Maestrías</a>
            <a href="#atlas" onClick={() => setMenuOpen(false)}>Atlas profesional</a>
            <a href="#biblioteca" onClick={() => setMenuOpen(false)}>Biblioteca</a>
          </div>
        )}
        <div className="progress-rail" aria-label={`Progreso ${progress}%`}><i style={{ width: `${progress}%` }} /></div>
      </header>

      <main id="inicio">
        <SolarKnowledgeHero />

        <section className="proof-strip" aria-label="Dimensiones del Campus Maestro">
          <div><b>{stages.length}</b><span>etapas troncales</span></div>
          <div><b>{totalSubjects}</b><span>materias integradas</span></div>
          <div><b>{masteryTracks.length}</b><span>rutas de maestría</span></div>
          <div><b>{totalTrackUnits}</b><span>unidades avanzadas</span></div>
          <div><b>{rootSources.length}</b><span>ecosistemas base</span></div>
          <div><b>{PROFESSIONS_TOTAL.toLocaleString("es-PE")}</b><span>denominaciones auditadas</span></div>
        </section>

        <section id="campus" className="method-section campus-intro">
          <div className="section-wrap method-layout">
            <div className="method-sticky">
              <p className="eyebrow-dark">01 / Arquitectura académica</p>
              <h2 className="mega-heading">No mires cursos.<br />Construye<br /><span>dominio.</span></h2>
              <p className="body-copy">El campus conecta fundamentos, práctica, investigación y especialización. La unidad de avance no es el video visto: es la competencia demostrada.</p>
              <div className="mini-audit"><CheckCircle2 size={18} /><span>Progreso guardado localmente en tu navegador.</span></div>
            </div>
            <div className="method-list">
              {method.map(([number, title, text], index) => (
                <motion.article key={number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .45, delay: index * .04 }} className="method-item">
                  <span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight size={19} />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="signal-band v14-signal">
          <div className="signal-band-copy">
            <span>UNA BASE · MUCHAS PROFESIONES</span>
            <strong>Aprender la disciplina antes que perseguir títulos de puesto.</strong>
          </div>
          <div className="signal-mini-grid">
            <div className="signal-card"><GraduationCap size={19} /><div><b>Tronco universitario</b><small>matemática · algoritmos · sistemas · teoría</small></div></div>
            <div className="signal-card"><FlaskConical size={19} /><div><b>Laboratorios</b><small>práctica reproducible · evidencia</small></div></div>
            <div className="signal-card"><Waypoints size={19} /><div><b>Especialización</b><small>12 rutas avanzadas combinables</small></div></div>
            <div className="signal-card"><BookOpen size={19} /><div><b>Fuentes abiertas</b><small>español primero · enlaces directos</small></div></div>
          </div>
        </section>

        <section className="faculties-section v14-faculties">
          <div className="section-wrap">
            <div className="faculties-head">
              <div><p className="eyebrow-blue">02 / Facultades conectadas</p><h2 className="mega-heading">Un núcleo.<br /><span>Ocho universos.</span></h2></div>
              <p className="body-copy">Las áreas no viven separadas. Software necesita sistemas; IA necesita datos y matemática; seguridad atraviesa hardware, redes, aplicaciones y cloud.</p>
            </div>
            <div className="editorial-grid editorial-grid-v14">
              {facultyTiles.map((faculty, index) => {
                const Icon = faculty.icon
                return (
                  <motion.a href="#plan" key={faculty.code} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: .5, delay: (index % 4) * .035 }} className={`editorial-card v14-faculty-card card-pos-${index + 1}`}>
                    <img src={faculty.image} alt={`Textura astronómica para ${faculty.title}`} />
                    <div className="editorial-overlay" />
                    <div className="editorial-content">
                      <div className="card-top"><span>{faculty.code}</span><Icon size={20} /></div>
                      <div><small>{faculty.kicker}</small><h3>{faculty.title}</h3><p>{faculty.text}</p><span className="card-link">Explorar plan <ArrowRight size={16} /></span></div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </section>

        <section id="atlas" className="atlas-section">
          <div className="atlas-lines" aria-hidden="true">{Array.from({ length: 11 }).map((_, i) => <i key={i} style={{ "--i": i } as CSSProperties} />)}</div>
          <div className="section-wrap atlas-layout">
            <div className="atlas-copy">
              <p className="eyebrow-green">03 / Atlas profesional</p>
              <h2>Busca cualquier profesión.<br />Encuentra la base real.</h2>
              <p>Tu lista reúne {PROFESSIONS_TOTAL.toLocaleString("es-PE")} denominaciones y {PROFESSIONS_UNIQUE.toLocaleString("es-PE")} nombres únicos después de eliminar duplicados exactos. El atlas no convierte cada título en una carrera distinta: lo conecta con el tronco y las rutas que necesita.</p>
              <label className="atlas-search"><Search size={19} /><input value={professionQuery} onChange={(event) => setProfessionQuery(event.target.value)} placeholder="Ej.: AI Engineer, Ingeniero de Sistemas, DevOps..." /></label>
              <div className="atlas-results" role="listbox">
                {professionMatches.map((title) => <button type="button" key={title} className={title === selectedProfession ? "active" : ""} onClick={() => setSelectedProfession(title)}><span>{title}</span><ArrowRight size={15} /></button>)}
              </div>
            </div>
            <motion.aside key={selectedProfession} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="profession-terminal">
              <div className="profession-terminal-top"><span>career://resolve</span><span>MAPEO ORIENTATIVO</span></div>
              <div className="profession-terminal-body">
                <span className="terminal-kicker">PROFESIÓN SELECCIONADA</span>
                <h3>{selectedProfession}</h3>
                <div className="profession-facts">
                  <div><small>Familia</small><b>{professionProfile.family}</b></div>
                  <div><small>Ruta</small><b>{professionProfile.route}</b></div>
                  <div><small>Trayecto</small><b>{professionProfile.stages}</b></div>
                  <div><small>Maestría</small><b>{professionProfile.track}</b></div>
                </div>
                <p>{professionProfile.focus}</p>
                <a href="#plan">Abrir el plan de formación <ArrowRight size={17} /></a>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="plan" className="plan-section v14-plan">
          <div className="section-wrap">
            <div className="plan-head">
              <div><p className="eyebrow-blue">04 / Roadmap maestro</p><h2 className="mega-heading">20 etapas.<br />Sin atajos falsos.</h2></div>
              <div className="plan-progress-card"><span>Tu progreso</span><b>{progress}%</b><div><i style={{ width: `${progress}%` }} /></div><small>{completed.size} / {totalSubjects} materias marcadas</small></div>
            </div>
            <div className="stage-table stage-table-v14">
              {stages.map((stage) => {
                const completedInStage = stage.subjects.filter((subject) => completed.has(`${stage.code}::${subject.name}`)).length
                return (
                  <button type="button" key={stage.code} className="stage-line stage-button" onClick={() => setSelectedStage(stage)}>
                    <span>{stage.code}</span>
                    <strong>{stage.title}</strong>
                    <p>{stage.year} · {stage.duration}</p>
                    <div className="stage-completion"><i style={{ width: `${Math.round((completedInStage / stage.subjects.length) * 100)}%` }} /><small>{completedInStage}/{stage.subjects.length}</small></div>
                    <ArrowRight size={19} />
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section id="maestrias" className="mastery-section">
          <div className="section-wrap mastery-shell">
            <div className="mastery-head">
              <div><p className="eyebrow-light">05 / Rutas de maestría</p><h2>Después del tronco,<br />profundiza de verdad.</h2></div>
              <p>Las rutas se combinan. Un profesional senior de IA puede necesitar T06 + T02 + T04 + T03; un arquitecto de sistemas puede cruzar T01 + T04 + T05.</p>
            </div>
            <div className="mastery-workbench">
              <div className="mastery-tabs">
                {masteryTracks.map((track) => <button type="button" key={track.code} className={track.code === selectedTrack.code ? "active" : ""} onClick={() => setSelectedTrack(track)}><span>{track.code}</span><b>{track.title}</b></button>)}
              </div>
              <motion.div key={selectedTrack.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mastery-detail">
                <div className="mastery-detail-top"><span>{selectedTrack.code} / {selectedTrack.family}</span><span>{selectedTrack.duration}</span></div>
                <h3>{selectedTrack.title}</h3>
                <p className="mastery-goal">{selectedTrack.goal}</p>
                <div className="mastery-units">
                  {selectedTrack.units.map((unit, index) => <article key={unit.name}><span>{String(index + 1).padStart(2, "0")}</span><div><h4>{unit.name}</h4><p>{unit.focus}</p><small>EVIDENCIA</small><b>{unit.evidence}</b><div className="unit-links">{unit.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ExternalLink size={13} /></a>)}</div></div></article>)}
                </div>
                <div className="mastery-gate"><span>GATE DE DOMINIO</span><p>{selectedTrack.gate}</p></div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="biblioteca" className="sources-section">
          <div className="section-wrap">
            <div className="sources-head">
              <div><p className="eyebrow-blue">06 / Biblioteca auditada</p><h2 className="mega-heading">Fuentes reales.<br /><span>Enlaces directos.</span></h2></div>
              <p className="body-copy">El plan usa estos ecosistemas como columna vertebral, profundidad, laboratorios o auditoría de cobertura. Los recursos comerciales no son obligatorios para aprobar.</p>
            </div>
            <div className="source-grid">
              {rootSources.map((source) => <a key={source.n} href={source.url} target="_blank" rel="noreferrer" className="source-card"><span>{String(source.n).padStart(2, "0")}</span><small>{source.kind}</small><h3>{source.name}</h3><p>{source.use}</p><div>Visitar fuente <ExternalLink size={15} /></div></a>)}
            </div>
          </div>
        </section>

        <section className="career-map-section">
          <div className="section-wrap career-map-grid">
            <div><p className="eyebrow-light">07 / Cobertura profesional</p><h2>De carrera a trabajo.<br />Sin perder la ciencia.</h2><p>Las familias profesionales sirven para traducir el currículo a puestos reales sin deformar la estructura académica.</p></div>
            <div className="career-family-list">{careerFamilies.map((family) => <article key={family.id}><span>{family.id}</span><div><h3>{family.title}</h3><p>{family.examples}</p><small>CORE {family.core} · TRACKS {family.tracks}</small></div></article>)}</div>
          </div>
        </section>

        <section id="ecosistema" className="ecosystem-section">
          <div className="section-wrap">
            <div className="ecosystem-head"><div><p className="eyebrow-dark">08 / La plataforma que viene</p><h2 className="mega-heading">No termina en<br /><span>la universidad.</span></h2></div><p className="body-copy">La arquitectura queda preparada para crecer hacia una plataforma tecnológica pública y, con el tiempo, también hacia tu presencia profesional.</p></div>
            <div className="ecosystem-grid">{ecosystem.map(({ icon: Icon, title, text, status }) => <article key={title}><div><Icon size={21} /><span>{status}</span></div><h3>{title}</h3><p>{text}</p><button type="button" disabled>Próximamente</button></article>)}</div>
          </div>
        </section>

        <section className="final-cta v14-final">
          <div className="final-cta-inner">
            <p>TRONCO · ESPECIALIZACIÓN · EVIDENCIA · FRONTERA</p>
            <h2>Empieza desde cero.<br />Construye una carrera de por vida.</h2>
            <a href="#plan">Comenzar el recorrido <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>

      <footer className="footer-v13 v14-footer">
        <div><strong>Campus Maestro</strong><p>Plataforma abierta en español para estudiar computación con fundamentos, práctica, evidencia, especialización y actualización continua.</p></div>
        <div className="footer-links"><a href="#campus">Campus</a><a href="#plan">Plan</a><a href="#maestrias">Maestrías</a><a href="#atlas">Atlas</a><a href="#biblioteca">Biblioteca</a></div>
        <div className="footer-bottom"><span>Open source · Español primero · S/0 obligatorio</span><span>V14 · Definitivo</span></div>
      </footer>

      <AnimatePresence>
        {selectedStage && (
          <motion.div className="stage-drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelectedStage(null)}>
            <motion.aside className="stage-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }} onMouseDown={(event) => event.stopPropagation()}>
              <button type="button" className="drawer-close" onClick={() => setSelectedStage(null)}><X size={20} /></button>
              <div className="drawer-kicker">{selectedStage.code} / {selectedStage.year}</div>
              <h2>{selectedStage.title}</h2>
              <div className="drawer-meta"><span>{selectedStage.duration}</span><span>{selectedStage.subjects.length} materias</span></div>
              <p className="drawer-outcome">{selectedStage.outcome}</p>
              <div className="drawer-prereq"><small>PRERREQUISITOS</small><p>{selectedStage.prerequisites}</p></div>
              <div className="drawer-subjects">
                {selectedStage.subjects.map((subject) => {
                  const id = `${selectedStage.code}::${subject.name}`
                  const done = completed.has(id)
                  return (
                    <article key={subject.name} className={done ? "done" : ""}>
                      <div className="subject-head"><button type="button" onClick={() => toggleSubject(selectedStage, subject)} aria-label={done ? "Marcar pendiente" : "Marcar completada"}>{done ? <CheckCircle2 size={21} /> : <Circle size={21} />}</button><div><h3>{subject.name}</h3><small>{done ? "EVIDENCIA REGISTRADA" : "PENDIENTE"}</small></div></div>
                      <div className="subject-block"><small>QUÉ ESTUDIAR</small><p>{subject.study}</p></div>
                      <div className="subject-block evidence"><small>EVIDENCIA</small><p>{subject.evidence}</p></div>
                      <div className="subject-sources">{subject.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><b>{source.label}</b><span>{source.where}</span><ExternalLink size={14} /></a>)}</div>
                    </article>
                  )
                })}
              </div>
              <div className="drawer-gate"><small>GATE DE ETAPA</small><p>{selectedStage.gate}</p><small>CAPSTONE</small><p>{selectedStage.capstone}</p></div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div className="command-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSearchOpen(false)}>
            <motion.div className="command-panel" initial={{ opacity: 0, y: -12, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .985 }} onMouseDown={(event) => event.stopPropagation()}>
              <div className="command-input"><Search size={20} /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Buscar materias, etapas, maestrías, profesiones o fuentes..." /><button type="button" onClick={() => setSearchOpen(false)}><X size={18} /></button></div>
              <div className="command-results">
                {!searchQuery && <div className="command-empty"><b>Busca en todo Campus Maestro.</b><span>Ejemplos: algoritmos, ciberseguridad, DevOps, IA, FAMAF, Software Engineer.</span></div>}
                {searchQuery && globalResults.length === 0 && <div className="command-empty"><b>Sin resultados.</b><span>Prueba con otra palabra.</span></div>}
                {globalResults.map((result, index) => <button type="button" key={`${result.kind}-${result.label}-${index}`} onClick={result.action}><span>{result.kind}</span><div><b>{result.label}</b><small>{result.meta}</small></div><ArrowRight size={16} /></button>)}
              </div>
              <div className="command-footer"><span>ESC cerrar</span><span>{totalSubjects} materias · {PROFESSIONS_UNIQUE.toLocaleString("es-PE")} profesiones únicas</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
