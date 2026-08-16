import { useState, useMemo } from "react"
import {
  BookOpen,
  Volume2,
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  Globe,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Database,
  Network,
  Cloud,
  Code2,
  Terminal,
  BrainCircuit,
} from "lucide-react"
import ProceduralBackdrop from "../v41/ProceduralBackdrop"
import {
  englishPhasesV51,
  allEnglishLevelsV51,
  computingLexiconV51,
} from "../v51/english-curriculum-v51"
import { englishSourcesV51 } from "../v51/english-sources-v51"
import EnglishClassroomV52 from "./EnglishClassroomV52"
import "./english-v52.css"

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

const domainIcons: Record<string, React.ReactNode> = {
  swe: <Code2 size={14} />,
  systems: <Terminal size={14} />,
  networks: <Network size={14} />,
  databases: <Database size={14} />,
  security: <ShieldCheck size={14} />,
  cloud: <Cloud size={14} />,
  ai: <BrainCircuit size={14} />,
  hardware: <Cpu size={14} />,
}

export default function EnglishAcademyHubV52() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [activePhaseFilter, setActivePhaseFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [lexiconCategory, setLexiconCategory] = useState<string>("all")
  const [lexiconSearch, setLexiconSearch] = useState<string>("")
  const [viewTab, setViewTab] = useState<"curriculum" | "lexicon" | "sources">("curriculum")
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null)

  const filteredLevels = useMemo(() => {
    return allEnglishLevelsV51.filter((level) => {
      const matchesPhase = activePhaseFilter === "all" || level.phase === activePhaseFilter
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        level.code.toLowerCase().includes(query) ||
        level.title.toLowerCase().includes(query) ||
        level.goal.toLowerCase().includes(query) ||
        level.cefr.toLowerCase().includes(query)
      return matchesPhase && matchesSearch
    })
  }, [activePhaseFilter, searchQuery])

  const filteredLexicon = useMemo(() => {
    return computingLexiconV51.filter((item) => {
      const matchesCat = lexiconCategory === "all" || item.category === lexiconCategory
      const query = lexiconSearch.toLowerCase().trim()
      const matchesQuery =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.exampleSentence.toLowerCase().includes(query)
      return matchesCat && matchesQuery
    })
  }, [lexiconCategory, lexiconSearch])

  const speak = (text: string, keyId?: string) => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.85

    setCurrentlySpeaking(keyId || text)
    utterance.onend = () => {
      setCurrentlySpeaking(null)
    }
    utterance.onerror = () => {
      setCurrentlySpeaking(null)
    }
    window.speechSynthesis.speak(utterance)
  }

  // If a level is active, show the Classroom
  if (selectedLevel) {
    return (
      <EnglishClassroomV52
        initialLevelCode={selectedLevel}
        onBackToHub={() => setSelectedLevel(null)}
      />
    )
  }

  return (
    <main className="v52-english-hub v52-fade-in">
      {/* Hero Section */}
      <section className="v52-hub-hero">
        <ProceduralBackdrop variant="pink" />
        <div className="v52-hero-content">
          <div className="v52-hero-tag">
            <Globe size={14} />
            <span>ENGLISH FOR COMPUTING & SOFTWARE ENGINEERING · PRE-A1 → C2</span>
          </div>

          <h1>
            Entiende. Habla.
            <br />
            <em>Lidera en inglés.</em>
          </h1>

          <p className="v52-hero-description">
            Inglés técnico y académico estructurado para <strong>Ingeniería Informática, Sistemas, Redes, Software, Datos e IA</strong>.
            Aprende desde la pronunciación exacta de símbolos y comandos en la terminal hasta la defensa de RFCs, análisis de caídas en War Rooms y redacción de papers de investigación.
          </p>

          <div className="v52-hero-stats">
            <div className="v52-stat-pill">
              <b>48 Niveles</b>
              <span>E00 – E47</span>
            </div>
            <div className="v52-stat-pill">
              <b>8 Fases CEFR</b>
              <span>Pre-A1 a C2</span>
            </div>
            <div className="v52-stat-pill">
              <b>Speech Lab</b>
              <span>Fonética IPA US</span>
            </div>
            <div className="v52-stat-pill">
              <b>RFC Studio</b>
              <span>Google Tech Writing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main View Switcher */}
      <section className="v52-hub-nav-section">
        <div className="v52-view-switcher">
          <button
            className={`v52-switch-btn ${viewTab === "curriculum" ? "active" : ""}`}
            onClick={() => setViewTab("curriculum")}
          >
            <BookOpen size={18} />
            <span>Currículo de 48 Niveles</span>
          </button>
          <button
            className={`v52-switch-btn ${viewTab === "lexicon" ? "active" : ""}`}
            onClick={() => setViewTab("lexicon")}
          >
            <Layers size={18} />
            <span>Diccionario Técnico (120+ Términos)</span>
          </button>
          <button
            className={`v52-switch-btn ${viewTab === "sources" ? "active" : ""}`}
            onClick={() => setViewTab("sources")}
          >
            <Sparkles size={18} />
            <span>Estándares & Fuentes Universitarias</span>
          </button>
        </div>
      </section>

      {/* TAB 1: CURRÍCULO DE 48 NIVELES */}
      {viewTab === "curriculum" && (
        <section className="v52-curriculum-section v52-fade-in">
          {/* Phase Filter Rail */}
          <div className="v52-phase-rail-container">
            <div className="v52-rail-header">
              <span>PROGRESIÓN CEFR (PRE-A1 → C2)</span>
              <p>Filtra por fase académica para avanzar desde cero absoluto hasta el dominio internacional.</p>
            </div>
            <div className="v52-phase-chips">
              <button
                className={`v52-phase-chip ${activePhaseFilter === "all" ? "active" : ""}`}
                onClick={() => setActivePhaseFilter("all")}
              >
                <small>TODAS</small>
                <b>48 Niveles</b>
                <span>Recorrido total</span>
              </button>
              {englishPhasesV51.map((phase) => (
                <button
                  key={phase.id}
                  data-phase={phase.id}
                  className={`v52-phase-chip ${activePhaseFilter === phase.id ? "active" : ""}`}
                  onClick={() => setActivePhaseFilter(phase.id)}
                  title={phase.description}
                >
                  <small>{phase.cefr}</small>
                  <b>{phase.range}</b>
                  <span>{phase.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="v52-search-filter-bar">
            <div className="v52-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar por código (ej. 'E00', 'E28'), tema o nivel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="v52-rate-pill"
                  onClick={() => setSearchQuery("")}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  Limpiar
                </button>
              )}
            </div>
            <span className="v52-results-count">
              Mostrando <b>{filteredLevels.length}</b> de 48 niveles
            </span>
          </div>

          {/* Grid of 48 Levels */}
          <div className="v52-levels-grid">
            {filteredLevels.map((level, idx) => (
              <article
                key={level.code}
                data-phase={level.phase}
                className="v52-level-card v52-stagger-item"
                style={{ "--stagger-i": Math.min(idx, 15) } as React.CSSProperties}
                onClick={() => setSelectedLevel(level.code)}
              >
                <div className="v52-card-top">
                  <span className="v52-card-code">{level.code}</span>
                  <span className="v52-card-cefr">{level.cefr}</span>
                </div>

                <h3>{level.title}</h3>
                <p className="v52-card-goal">{level.goal}</p>

                <div className="v52-card-phonetics">
                  <div className="v52-phonetics-header">
                    <small>Pronunciación:</small>
                    <span className="v52-sounds-like">{level.phonetics.soundsLike}</span>
                  </div>
                  <code className="v52-ipa-sub">IPA: {level.phonetics.ipa}</code>
                </div>

                <div className="v52-card-chips">
                  {level.phonetics.trickyWords.slice(0, 3).map((item, wIdx) => (
                    <button
                      key={wIdx}
                      className="v52-card-chip"
                      onClick={(e) => {
                        e.stopPropagation()
                        speak(item.word, `card-${level.code}-${wIdx}`)
                      }}
                      title={`${item.soundsLike ? `Suena: ${item.soundsLike} · ` : ""}${item.ipa} - ${item.tip} (Clic para escuchar)`}
                    >
                      <Volume2 size={11} className="v52-chip-speaker" />
                      <span>{item.word}</span>
                    </button>
                  ))}
                </div>

                <footer className="v52-card-footer">
                  <span className="v52-card-action">
                    <span>Entrar al Aula</span>
                    <ArrowRight size={14} className="v52-action-arrow" />
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: DICCIONARIO TÉCNICO (COMPUTING LEXICON) */}
      {viewTab === "lexicon" && (
        <section className="v52-lexicon-section v52-fade-in">
          <div className="v52-lexicon-head">
            <div>
              <h2>Diccionario Técnico & Fonético de Computación</h2>
              <p>
                Glosario especializado de ingeniería con pronunciación IPA nativa, advertencias fonéticas para hispanohablantes y ejemplos de código.
              </p>
            </div>

            <div className="v52-lexicon-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar término (ej. 'Polymorphism', 'Throughput', 'Deadlock')..."
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="v52-lexicon-categories">
            {[
              { id: "all", label: "Todos los Dominios", icon: <Globe size={14} /> },
              { id: "swe", label: "Software & OOP", icon: <Code2 size={14} /> },
              { id: "systems", label: "Sistemas & OS", icon: <Terminal size={14} /> },
              { id: "networks", label: "Redes & Protocolos", icon: <Network size={14} /> },
              { id: "databases", label: "Bases de Datos", icon: <Database size={14} /> },
              { id: "security", label: "Seguridad & Cripto", icon: <ShieldCheck size={14} /> },
              { id: "cloud", label: "Cloud & DevOps", icon: <Cloud size={14} /> },
              { id: "ai", label: "IA & ML", icon: <BrainCircuit size={14} /> },
            ].map((cat) => (
              <button
                key={cat.id}
                data-domain={cat.id}
                className={`v52-cat-btn ${lexiconCategory === cat.id ? "active" : ""}`}
                onClick={() => setLexiconCategory(cat.id)}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Lexicon Grid */}
          <div className="v52-lexicon-grid">
            {filteredLexicon.map((term, lIdx) => (
              <article
                key={term.id}
                data-domain={term.category}
                className="v52-lex-card v52-stagger-item"
                style={{ "--stagger-i": Math.min(lIdx, 15) } as React.CSSProperties}
              >
                <div className="v52-lex-top">
                  <div>
                    <div className="v52-lex-category-tag">
                      {domainIcons[term.category] || <Globe size={12} />}
                      <span>{term.category.toUpperCase()}</span>
                    </div>
                    <h3>{term.term}</h3>
                    <span className="v52-lex-sounds-like">Suena como: <b>"{term.soundsLike}"</b></span>
                    <code className="v52-lex-ipa">IPA: {term.ipa}</code>
                  </div>
                  <button
                    className="v52-speak-circle"
                    onClick={() => speak(term.term.replace(/[^a-zA-Z0-9\s]/g, ""), `lex-${term.id}`)}
                    title="Escuchar pronunciación nativa"
                  >
                    <Volume2 size={16} />
                    <AudioWave isPlaying={currentlySpeaking === `lex-${term.id}`} />
                  </button>
                </div>

                <p className="v52-lex-def">{term.definition}</p>

                <div className="v52-lex-example">
                  <span>Ejemplo en contexto de ingeniería:</span>
                  <code>"{term.exampleSentence}"</code>
                </div>

                {term.mistakeWarning && (
                  <div className="v52-lex-warning">
                    <small>⚠️ {term.mistakeWarning}</small>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: ESTÁNDARES & FUENTES ACADÉMICAS */}
      {viewTab === "sources" && (
        <section className="v52-sources-section v52-fade-in">
          <div className="v52-sources-head">
            <h2>Fuentes Académicas & Estándares Internacionales</h2>
            <p>
              El currículo de Inglés IT V52 está fundamentado en programas de comunicación técnica de las mejores universidades del mundo y especificaciones de la industria.
            </p>
          </div>

          <div className="v52-sources-grid">
            {englishSourcesV51.map((src, sIdx) => (
              <article
                key={src.id}
                data-category={src.category}
                className="v52-source-card v52-stagger-item"
                style={{ "--stagger-i": sIdx } as React.CSSProperties}
              >
                <div className="v52-src-top">
                  <span className="v52-src-type">{src.category.toUpperCase()}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v52-src-link"
                    title="Ver fuente oficial"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <h3>{src.title}</h3>
                <h4 className="v52-src-author">{src.authorOrOrg} ({src.yearOrEdition})</h4>
                <p>{src.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
