import { useEffect, useMemo, useRef, useState } from "react"
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type ReactFlowInstance,
  getBezierPath,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CirclePlay,
  Expand,
  Flag,
  GraduationCap,
  LockKeyhole,
  Map,
  Pause,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  X,
  ZoomIn,
} from "lucide-react"
import { stages, type Stage } from "../roadmap-data"
import { masteryTracks, type MasteryTrack } from "../mastery-data"
import "./route-v42.css"

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

type Selected = { kind: "stage"; index: number } | { kind: "track"; index: number } | null

type RouteProgress = {
  completedStages: string[]
  completedTracks: string[]
  completedSubjects: Record<string, number[]>
}

const STORAGE_KEY = "campus-maestro-v42-route-progress"
const NODE_W = 272
const NODE_H = 134
const TRACK_W = 250

const palette = ["lime", "blue", "pink", "cyan", "sand", "orange", "violet", "green"]

function loadProgress(): RouteProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { completedStages: [], completedTracks: [], completedSubjects: {} }
    const parsed = JSON.parse(raw) as Partial<RouteProgress>
    return {
      completedStages: Array.isArray(parsed.completedStages) ? parsed.completedStages : [],
      completedTracks: Array.isArray(parsed.completedTracks) ? parsed.completedTracks : [],
      completedSubjects: parsed.completedSubjects && typeof parsed.completedSubjects === "object" ? parsed.completedSubjects : {},
    }
  } catch {
    return { completedStages: [], completedTracks: [], completedSubjects: {} }
  }
}

function saveProgress(progress: RouteProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

function stagePosition(index: number) {
  const perRow = 4
  const row = Math.floor(index / perRow)
  const columnInRow = index % perRow
  const reverse = row % 2 === 1
  const col = reverse ? perRow - 1 - columnInRow : columnInRow
  return { x: 90 + col * 390, y: 160 + row * 330, row, col }
}

function maxPrerequisiteStage(track: MasteryTrack) {
  const matches = [...track.prerequisites.matchAll(/S(\d+)/gi)].map((match) => Number(match[1]))
  return matches.length ? Math.max(...matches) : 0
}

function trackPosition(index: number) {
  const col = index % 2
  const row = Math.floor(index / 2)
  return { x: 1780 + col * 330, y: 130 + row * 245 }
}

function edgeHandles(source: { x: number; y: number; row?: number }, target: { x: number; y: number; row?: number }) {
  const sameRow = source.row !== undefined && target.row !== undefined && source.row === target.row
  if (sameRow) {
    return source.x < target.x
      ? { sourceHandle: "right-out", targetHandle: "left-in" }
      : { sourceHandle: "left-out", targetHandle: "right-in" }
  }
  if (Math.abs(target.y - source.y) > 170) return { sourceHandle: "bottom-out", targetHandle: "top-in" }
  return source.x < target.x
    ? { sourceHandle: "right-out", targetHandle: "left-in" }
    : { sourceHandle: "left-out", targetHandle: "right-in" }
}

function progressPercent(stage: Stage, progress: RouteProgress) {
  const done = progress.completedSubjects[stage.code] ?? []
  if (!stage.subjects.length) return 0
  return Math.round((done.length / stage.subjects.length) * 100)
}

function StageNode(props: any) {
  const { data } = props
  return (
    <div className={`v42-stage-node tone-${data.tone} status-${data.status} ${data.selected ? "is-selected" : ""}`}>
      <Handle type="target" position={Position.Left} id="left-in" className="v42-handle" />
      <Handle type="target" position={Position.Top} id="top-in" className="v42-handle" />
      <Handle type="target" position={Position.Right} id="right-in" className="v42-handle" />
      <Handle type="target" position={Position.Bottom} id="bottom-in" className="v42-handle" />
      <Handle type="source" position={Position.Left} id="left-out" className="v42-handle" />
      <Handle type="source" position={Position.Top} id="top-out" className="v42-handle" />
      <Handle type="source" position={Position.Right} id="right-out" className="v42-handle" />
      <Handle type="source" position={Position.Bottom} id="bottom-out" className="v42-handle" />

      <div className="v42-node-topline">
        <span className="v42-node-code">{data.code}</span>
        <span className="v42-node-year">{data.year}</span>
        <span className="v42-node-status" aria-label={data.statusLabel}>
          {data.status === "complete" ? <Check /> : data.status === "locked" ? <LockKeyhole /> : <Target />}
        </span>
      </div>
      <strong>{data.title}</strong>
      <div className="v42-node-meta"><span>{data.duration}</span><span>{data.subjectCount} materias</span></div>
      <div className="v42-node-progress"><i style={{ width: `${data.progress}%` }} /><b>{data.progress}%</b></div>
    </div>
  )
}

function TrackNode(props: any) {
  const { data } = props
  return (
    <div className={`v42-track-node tone-${data.tone} ${data.locked ? "is-locked" : ""} ${data.selected ? "is-selected" : ""}`}>
      <Handle type="target" position={Position.Left} id="left-in" className="v42-handle" />
      <Handle type="target" position={Position.Right} id="right-in" className="v42-handle" />
      <Handle type="source" position={Position.Left} id="left-out" className="v42-handle" />
      <Handle type="source" position={Position.Right} id="right-out" className="v42-handle" />
      <small>{data.code} · {data.family}</small>
      <strong>{data.title}</strong>
      <span>{data.duration}</span>
      <b>{data.locked ? `Requiere S${data.required}` : data.complete ? "Dominada" : "Disponible"}</b>
    </div>
  )
}

function FrontierNode() {
  return (
    <div className="v42-frontier-node">
      <Handle type="target" position={Position.Left} id="left-in" className="v42-handle" />
      <Sparkles />
      <small>∞ / FRONTERA</small>
      <strong>Investigación, innovación y futuro</strong>
      <span>La ruta deja de ser lineal: aquí comienza la contribución original.</span>
    </div>
  )
}

function RoadEdge(props: any) {
  const [path] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    curvature: props.data?.kind === "branch" ? 0.38 : 0.52,
  })
  const isBranch = props.data?.kind === "branch"
  if (isBranch) {
    return (
      <g className={`v42-branch-edge tone-${props.data?.tone ?? "green"}`}>
        <path d={path} className="v42-branch-shadow" />
        <path d={path} className="v42-branch-main" />
        <path d={path} className="v42-branch-pulse" />
      </g>
    )
  }
  return (
    <g className={`v42-road-edge ${props.data?.complete ? "is-complete" : ""} ${props.data?.active ? "is-active" : ""}`}>
      <path d={path} className="v42-road-shadow" />
      <path d={path} className="v42-road-asphalt" />
      <path d={path} className="v42-road-light" />
      <path d={path} className="v42-road-center" />
    </g>
  )
}

const nodeTypes = { stage: StageNode, track: TrackNode, frontier: FrontierNode }
const edgeTypes = { road: RoadEdge }

function DetailPanel({ selected, progress, onClose, onOpenAula, onToggleStage, onToggleTrack }: {
  selected: Selected
  progress: RouteProgress
  onClose: () => void
  onOpenAula: () => void
  onToggleStage: (code: string) => void
  onToggleTrack: (code: string) => void
}) {
  if (!selected) return null
  if (selected.kind === "stage") {
    const stage = stages[selected.index]
    const done = progress.completedStages.includes(stage.code)
    return (
      <aside className="v42-detail-panel">
        <button className="v42-detail-close" onClick={onClose} aria-label="Cerrar"><X /></button>
        <div className="v42-detail-code">{stage.code} · {stage.year}</div>
        <h3>{stage.title}</h3>
        <p>{stage.outcome}</p>
        <div className="v42-detail-grid"><span><b>{stage.duration}</b><small>Duración</small></span><span><b>{stage.subjects.length}</b><small>Materias</small></span><span><b>{progressPercent(stage, progress)}%</b><small>Materias marcadas</small></span></div>
        <div className="v42-detail-prereq"><LockKeyhole /> <span><b>Prerrequisitos</b>{stage.prerequisites}</span></div>
        <div className="v42-detail-actions">
          <button onClick={onOpenAula}><BookOpen /> Entrar al aula</button>
          <button className={done ? "is-done" : ""} onClick={() => onToggleStage(stage.code)}>{done ? <Check /> : <Target />}{done ? "Dominio marcado" : "Marcar dominio"}</button>
        </div>
      </aside>
    )
  }
  const track = masteryTracks[selected.index]
  const done = progress.completedTracks.includes(track.code)
  return (
    <aside className="v42-detail-panel v42-detail-track">
      <button className="v42-detail-close" onClick={onClose} aria-label="Cerrar"><X /></button>
      <div className="v42-detail-code">{track.code} · {track.family}</div>
      <h3>{track.title}</h3>
      <p>{track.goal}</p>
      <div className="v42-detail-grid"><span><b>{track.duration}</b><small>Duración</small></span><span><b>{track.units.length}</b><small>Unidades</small></span><span><b>{maxPrerequisiteStage(track)}</b><small>Etapa base</small></span></div>
      <div className="v42-detail-prereq"><LockKeyhole /> <span><b>Prerrequisitos</b>{track.prerequisites}</span></div>
      <div className="v42-detail-actions"><button onClick={onOpenAula}><BookOpen /> Abrir especialización</button><button className={done ? "is-done" : ""} onClick={() => onToggleTrack(track.code)}>{done ? <Check /> : <Target />}{done ? "Dominada" : "Marcar dominio"}</button></div>
    </aside>
  )
}

function AulaModal({ selected, progress, onClose, onSubjectToggle }: {
  selected: Selected
  progress: RouteProgress
  onClose: () => void
  onSubjectToggle: (stageCode: string, subjectIndex: number) => void
}) {
  if (!selected) return null
  if (selected.kind === "track") {
    const track = masteryTracks[selected.index]
    return (
      <div className="v42-aula-backdrop" role="dialog" aria-modal="true">
        <div className="v42-aula-modal">
          <button className="v42-aula-close" onClick={onClose}><X /></button>
          <div className="v42-aula-kicker">ESPECIALIZACIÓN · {track.code}</div>
          <h2>{track.title}</h2>
          <p className="v42-aula-lead">{track.goal}</p>
          <div className="v42-aula-gate"><Target /><div><b>Gate de dominio</b><span>{track.gate}</span></div></div>
          <div className="v42-aula-subjects">
            {track.units.map((unit, index) => (
              <article key={`${track.code}-${unit.name}`}>
                <span>{String(index + 1).padStart(2, "0")}</span><div><h3>{unit.name}</h3><p>{unit.focus}</p><b>Evidencia</b><p>{unit.evidence}</p><div className="v42-aula-sources">{unit.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowRight /></a>)}</div></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  const stage = stages[selected.index]
  const done = new Set(progress.completedSubjects[stage.code] ?? [])
  return (
    <div className="v42-aula-backdrop" role="dialog" aria-modal="true">
      <div className="v42-aula-modal">
        <button className="v42-aula-close" onClick={onClose}><X /></button>
        <div className="v42-aula-kicker">AULA · {stage.code} · {stage.year}</div>
        <h2>{stage.title}</h2>
        <p className="v42-aula-lead">{stage.outcome}</p>
        <div className="v42-aula-progress"><div><i style={{ width: `${progressPercent(stage, progress)}%` }} /></div><b>{progressPercent(stage, progress)}%</b><span>{done.size}/{stage.subjects.length} materias</span></div>
        <div className="v42-aula-subjects">
          {stage.subjects.map((subject, index) => {
            const checked = done.has(index)
            return (
              <article key={`${stage.code}-${subject.name}`} className={checked ? "is-complete" : ""}>
                <button className="v42-subject-check" onClick={() => onSubjectToggle(stage.code, index)} aria-label={checked ? "Desmarcar materia" : "Marcar materia"}>{checked ? <Check /> : String(index + 1).padStart(2, "0")}</button>
                <div><h3>{subject.name}</h3><p>{subject.study}</p><b>Evidencia</b><p>{subject.evidence}</p><div className="v42-aula-sources">{subject.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowRight /></a>)}</div></div>
              </article>
            )
          })}
        </div>
        <div className="v42-aula-gate"><Target /><div><b>Gate final de {stage.code}</b><span>{stage.gate}</span></div></div>
        <div className="v42-aula-capstone"><GraduationCap /><div><b>Proyecto integrador</b><span>{stage.capstone}</span></div></div>
      </div>
    </div>
  )
}

function MobileRoute({ progress, selected, setSelected, onOpenAula }: {
  progress: RouteProgress
  selected: Selected
  setSelected: (value: Selected) => void
  onOpenAula: () => void
}) {
  return (
    <div className="v42-mobile-route">
      <div className="v42-mobile-road" aria-hidden="true"><i /></div>
      {stages.map((stage, index) => {
        const complete = progress.completedStages.includes(stage.code)
        const currentIndex = stages.findIndex((item) => !progress.completedStages.includes(item.code))
        const locked = currentIndex >= 0 && index > currentIndex
        return (
          <button key={stage.code} className={`v42-mobile-stop tone-${palette[index % palette.length]} ${complete ? "is-complete" : ""} ${locked ? "is-locked" : ""}`} onClick={() => setSelected({ kind: "stage", index })}>
            <span>{stage.code}</span><div><small>{stage.year} · {stage.duration}</small><strong>{stage.title}</strong><em>{progressPercent(stage, progress)}% de materias</em></div>{complete ? <Check /> : locked ? <LockKeyhole /> : <ChevronRight />}
          </button>
        )
      })}
      <div className="v42-mobile-frontier"><Flag /><div><small>FRONTERA</small><strong>Especializaciones y conocimiento abierto</strong></div></div>
      <div className="v42-mobile-track-grid">
        {masteryTracks.map((track, index) => (
          <button key={track.code} className={`tone-${palette[index % palette.length]}`} onClick={() => setSelected({ kind: "track", index })}><small>{track.code} · {track.family}</small><strong>{track.title}</strong><span>{track.duration}</span></button>
        ))}
      </div>
      {selected && <button className="v42-mobile-aula-button" onClick={onOpenAula}><BookOpen /> Abrir aula de la parada seleccionada</button>}
    </div>
  )
}

export default function MasterRouteV42() {
  const [progress, setProgress] = useState<RouteProgress>(() => loadProgress())
  const [selected, setSelected] = useState<Selected>(null)
  const [aulaOpen, setAulaOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [showTracks, setShowTracks] = useState(true)
  const [touring, setTouring] = useState(false)
  const tourCursor = useRef(0)
  const [flow, setFlow] = useState<ReactFlowInstance | null>(null)
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 820px)").matches)
  const heroRover = useRef<HTMLDivElement | null>(null)
  const heroPath = useRef<SVGPathElement | null>(null)
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)")
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener?.("change", sync)
    return () => mq.removeEventListener?.("change", sync)
  }, [])

  useEffect(() => saveProgress(progress), [progress])

  useEffect(() => {
    if (!heroRover.current || !heroPath.current) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.to(heroRover.current, {
        duration: 10,
        repeat: -1,
        ease: "none",
        motionPath: { path: heroPath.current!, align: heroPath.current!, alignOrigin: [0.5, 0.5], autoRotate: true },
      })
      gsap.from(".v42-route-stat", { opacity: 0, y: 18, duration: 0.55, stagger: 0.08, ease: "power2.out" })
      gsap.from(".v42-route-map-shell", { opacity: 0, y: 35, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".v42-route-map-shell", start: "top 88%" } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const completedStages = useMemo(() => new Set(progress.completedStages), [progress.completedStages])
  const currentIndex = useMemo(() => {
    const first = stages.findIndex((stage) => !completedStages.has(stage.code))
    return first < 0 ? stages.length - 1 : first
  }, [completedStages])
  const stagePercent = Math.round((completedStages.size / Math.max(stages.length, 1)) * 100)

  const nodes = useMemo<Node[]>(() => {
    const main: Node[] = stages.map((stage, index) => {
      const pos = stagePosition(index)
      const complete = completedStages.has(stage.code)
      const locked = index > currentIndex
      const status = complete ? "complete" : locked ? "locked" : index === currentIndex ? "current" : "open"
      return {
        id: `stage-${stage.code}`,
        type: "stage",
        position: { x: pos.x, y: pos.y },
        draggable: false,
        selectable: true,
        style: { width: NODE_W, height: NODE_H },
        data: {
          code: stage.code,
          year: stage.year,
          title: stage.title,
          duration: stage.duration,
          subjectCount: stage.subjects.length,
          tone: palette[index % palette.length],
          status,
          statusLabel: complete ? "Completada" : locked ? "Bloqueada" : index === currentIndex ? "Siguiente etapa" : "Disponible",
          progress: progressPercent(stage, progress),
          selected: selected?.kind === "stage" && selected.index === index,
        },
      }
    })

    if (!showTracks) return [...main, {
      id: "frontier",
      type: "frontier",
      position: { x: 1530, y: stagePosition(stages.length - 1).y - 10 },
      draggable: false,
      selectable: false,
      style: { width: 290, height: 150 },
      data: {},
    }]

    const tracks: Node[] = masteryTracks.map((track, index) => {
      const required = maxPrerequisiteStage(track)
      const pos = trackPosition(index)
      const locked = !completedStages.has(`S${required}`) && required > 0
      return {
        id: `track-${track.code}`,
        type: "track",
        position: pos,
        draggable: false,
        selectable: true,
        style: { width: TRACK_W, minHeight: 126 },
        data: {
          code: track.code,
          family: track.family,
          title: track.title,
          duration: track.duration,
          tone: palette[index % palette.length],
          locked,
          required,
          complete: progress.completedTracks.includes(track.code),
          selected: selected?.kind === "track" && selected.index === index,
        },
      }
    })

    return [...main, ...tracks, {
      id: "frontier",
      type: "frontier",
      position: { x: 2470, y: 720 },
      draggable: false,
      selectable: false,
      style: { width: 300, height: 164 },
      data: {},
    }]
  }, [completedStages, currentIndex, progress, selected, showTracks])

  const edges = useMemo<Edge[]>(() => {
    const roadEdges: Edge[] = []
    for (let index = 0; index < stages.length - 1; index += 1) {
      const a = stagePosition(index)
      const b = stagePosition(index + 1)
      const handles = edgeHandles(a, b)
      roadEdges.push({
        id: `road-${index}`,
        source: `stage-${stages[index].code}`,
        target: `stage-${stages[index + 1].code}`,
        type: "road",
        sourceHandle: handles.sourceHandle,
        targetHandle: handles.targetHandle,
        selectable: false,
        data: {
          kind: "road",
          complete: completedStages.has(stages[index].code) && completedStages.has(stages[index + 1].code),
          active: index === Math.max(0, currentIndex - 1),
        },
      })
    }

    const last = stagePosition(stages.length - 1)
    const frontierPos = showTracks ? { x: 2470, y: 720 } : { x: 1530, y: last.y - 10 }
    const finalHandles = edgeHandles(last, frontierPos)
    roadEdges.push({ id: "road-frontier", source: `stage-${stages[stages.length - 1].code}`, target: "frontier", type: "road", sourceHandle: finalHandles.sourceHandle, targetHandle: finalHandles.targetHandle, selectable: false, data: { kind: "road", complete: completedStages.size === stages.length } })

    if (!showTracks) return roadEdges

    const branchEdges: Edge[] = masteryTracks.flatMap((track, index) => {
      const anchorIndex = Math.min(maxPrerequisiteStage(track), stages.length - 1)
      const source = stagePosition(anchorIndex)
      const target = trackPosition(index)
      const handles = edgeHandles(source, target)
      const toFrontier = edgeHandles(target, frontierPos)
      return [
        { id: `branch-in-${track.code}`, source: `stage-${stages[anchorIndex].code}`, target: `track-${track.code}`, type: "road", sourceHandle: handles.sourceHandle, targetHandle: handles.targetHandle, selectable: false, data: { kind: "branch", tone: palette[index % palette.length] } },
        { id: `branch-out-${track.code}`, source: `track-${track.code}`, target: "frontier", type: "road", sourceHandle: toFrontier.sourceHandle, targetHandle: toFrontier.targetHandle, selectable: false, data: { kind: "branch", tone: palette[index % palette.length] } },
      ]
    })
    return [...roadEdges, ...branchEdges]
  }, [completedStages, currentIndex, showTracks])

  const focusNode = (id: string) => {
    if (!flow) return
    const node = flow.getNode(id)
    if (!node) return
    flow.setCenter(node.position.x + (node.measured?.width ?? NODE_W) / 2, node.position.y + (node.measured?.height ?? NODE_H) / 2, { zoom: 1.05, duration: 700 })
  }

  useEffect(() => {
    if (!touring || !flow || isMobile) return
    const timer = window.setInterval(() => {
      tourCursor.current = (tourCursor.current + 1) % stages.length
      focusNode(`stage-${stages[tourCursor.current].code}`)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [flow, isMobile, touring])

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es")
    if (!normalized) return []
    return stages.map((stage, index) => ({ stage, index })).filter(({ stage }) => `${stage.code} ${stage.title} ${stage.year} ${stage.subjects.map((subject) => subject.name).join(" ")}`.toLocaleLowerCase("es").includes(normalized)).slice(0, 7)
  }, [query])

  const toggleStage = (code: string) => {
    setProgress((current) => {
      const set = new Set(current.completedStages)
      if (set.has(code)) set.delete(code)
      else set.add(code)
      return { ...current, completedStages: [...set] }
    })
  }

  const toggleTrack = (code: string) => {
    setProgress((current) => {
      const set = new Set(current.completedTracks)
      if (set.has(code)) set.delete(code)
      else set.add(code)
      return { ...current, completedTracks: [...set] }
    })
  }

  const toggleSubject = (stageCode: string, subjectIndex: number) => {
    setProgress((current) => {
      const set = new Set(current.completedSubjects[stageCode] ?? [])
      if (set.has(subjectIndex)) set.delete(subjectIndex)
      else set.add(subjectIndex)
      return { ...current, completedSubjects: { ...current.completedSubjects, [stageCode]: [...set].sort((a, b) => a - b) } }
    })
  }

  const resetProgress = () => {
    if (!window.confirm("¿Reiniciar solo el progreso visual de Ruta Maestra V42? No modifica tus Recursos, Certificaciones ni otros datos del Campus.")) return
    const fresh: RouteProgress = { completedStages: [], completedTracks: [], completedSubjects: {} }
    setProgress(fresh)
    saveProgress(fresh)
    setSelected(null)
  }

  const openFullscreen = () => {
    const element = document.querySelector<HTMLElement>(".v42-route-map-shell")
    if (!element) return
    element.requestFullscreen?.().catch(() => undefined)
  }

  return (
    <section ref={rootRef} className="v42-master-route" aria-labelledby="v42-route-title">
      <header className="v42-route-hero">
        <div className="v42-route-hero-copy">
          <span>RUTA MAESTRA 2.0 · MAPA ACADÉMICO INTERACTIVO</span>
          <h1 id="v42-route-title">Veinte etapas.<br /><em>Una ruta que se siente viva.</em></h1>
          <p>Del punto cero a la frontera: S0 → S19, con especializaciones, aulas por parada, progreso, desbloqueos y un mapa navegable que conserva el lenguaje visual de Campus Maestro.</p>
          <div className="v42-route-hero-actions"><button onClick={() => focusNode(`stage-${stages[currentIndex].code}`)}><Target /> Continuar en {stages[currentIndex].code}</button><button onClick={() => document.querySelector(".v42-route-map-shell")?.scrollIntoView({ behavior: "smooth" })}><Map /> Explorar mapa</button></div>
        </div>
        <div className="v42-route-hero-art" aria-hidden="true">
          <svg viewBox="0 0 600 340"><path ref={heroPath} id="v42-hero-path" d="M35 245 C120 95 210 275 300 120 C380 0 455 95 565 48" /></svg>
          <div ref={heroRover} className="v42-hero-rover">CM</div>
          <div className="v42-hero-landmark one"><span>S0</span></div><div className="v42-hero-landmark two"><span>S10</span></div><div className="v42-hero-landmark three"><span>S19</span></div>
        </div>
      </header>

      <div className="v42-route-stats">
        <article className="v42-route-stat"><small>PROGRESO TRONCAL</small><strong>{stagePercent}%</strong><div><i style={{ width: `${stagePercent}%` }} /></div></article>
        <article className="v42-route-stat"><small>ETAPAS DOMINADAS</small><strong>{completedStages.size}<span>/ {stages.length}</span></strong><p>Siguiente: {stages[currentIndex].code}</p></article>
        <article className="v42-route-stat"><small>ESPECIALIZACIONES</small><strong>{progress.completedTracks.length}<span>/ {masteryTracks.length}</span></strong><p>Ramas profesionales</p></article>
        <article className="v42-route-stat"><small>AULA ACTUAL</small><strong>{stages[currentIndex].code}</strong><p>{stages[currentIndex].title}</p></article>
      </div>

      <section className="v42-route-map-shell">
        <div className="v42-route-toolbar">
          <div className="v42-search-wrap"><Search /><input value={query} onChange={(event: any) => setQuery(event.target.value)} placeholder="Buscar etapa, materia o tema…" />{query && <button onClick={() => setQuery("")}><X /></button>}{searchResults.length > 0 && <div className="v42-search-results">{searchResults.map(({ stage, index }) => <button key={stage.code} onClick={() => { setQuery(""); setSelected({ kind: "stage", index }); focusNode(`stage-${stage.code}`) }}><span>{stage.code}</span><div><b>{stage.title}</b><small>{stage.year} · {stage.subjects.length} materias</small></div><ChevronRight /></button>)}</div>}</div>
          <div className="v42-toolbar-actions"><button className={touring ? "is-active" : ""} onClick={() => setTouring((value) => !value)}>{touring ? <Pause /> : <CirclePlay />}{touring ? "Pausar tour" : "Tour automático"}</button><button className={showTracks ? "is-active" : ""} onClick={() => setShowTracks((value) => !value)}><Sparkles /> Especializaciones</button><button onClick={() => flow?.fitView({ padding: 0.15, duration: 650 })}><ZoomIn /> Ver todo</button><button onClick={openFullscreen}><Expand /> Pantalla completa</button><button onClick={resetProgress}><RotateCcw /> Reiniciar</button></div>
        </div>

        {isMobile ? (
          <MobileRoute progress={progress} selected={selected} setSelected={setSelected} onOpenAula={() => selected && setAulaOpen(true)} />
        ) : (
          <div className="v42-flow-wrap" data-lenis-prevent>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onInit={setFlow}
              onNodeClick={(_: any, node: any) => {
                if (node.id.startsWith("stage-")) {
                  const code = node.id.replace("stage-", "")
                  const index = stages.findIndex((stage) => stage.code === code)
                  if (index >= 0) setSelected({ kind: "stage", index })
                } else if (node.id.startsWith("track-")) {
                  const code = node.id.replace("track-", "")
                  const index = masteryTracks.findIndex((track) => track.code === code)
                  if (index >= 0) setSelected({ kind: "track", index })
                }
              }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable
              panOnScroll
              zoomOnPinch
              zoomOnDoubleClick={false}
              minZoom={0.28}
              maxZoom={1.65}
              fitView
              fitViewOptions={{ padding: 0.13, maxZoom: 0.72 }}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#d9ddd8" gap={34} size={1} />
              <Controls position="bottom-left" showInteractive={false} />
              <MiniMap position="bottom-right" pannable zoomable nodeStrokeWidth={2} nodeColor={(node: any) => node.id === "frontier" ? "#d8ff4f" : node.id.startsWith("track-") ? "#d8e9ff" : "#c8f6df"} maskColor="rgba(247,246,239,.72)" />
            </ReactFlow>
          </div>
        )}

        <DetailPanel selected={selected} progress={progress} onClose={() => setSelected(null)} onOpenAula={() => selected && setAulaOpen(true)} onToggleStage={toggleStage} onToggleTrack={toggleTrack} />
      </section>

      <div className="v42-stage-strip" aria-label="Acceso rápido a las etapas">
        {stages.map((stage, index) => <button key={stage.code} className={`${completedStages.has(stage.code) ? "is-complete" : ""} ${index === currentIndex ? "is-current" : ""}`} onClick={() => { setSelected({ kind: "stage", index }); focusNode(`stage-${stage.code}`) }}><span>{stage.code}</span><small>{stage.year}</small></button>)}
      </div>

      <section className="v42-track-showcase">
        <div className="v42-track-head"><div><span>RAMAS PROFESIONALES</span><h2>La carretera se abre.<br /><em>Elige profundidad.</em></h2></div><p>Las especializaciones nacen desde el tronco común según sus prerrequisitos. Puedes explorarlas en el mapa o recorrer esta banda automática sin perder el patrón de cards móviles del Campus.</p></div>
        <div className="v42-track-rail"><div className="v42-track-strip">{[...masteryTracks, ...masteryTracks].map((track, index) => { const realIndex = index % masteryTracks.length; return <button key={`${track.code}-${index}`} className={`tone-${palette[realIndex % palette.length]}`} onClick={() => { setSelected({ kind: "track", index: realIndex }); if (!isMobile) focusNode(`track-${track.code}`) }}><small>{track.code} · {track.family}</small><strong>{track.title}</strong><span>{track.duration}</span><i>Explorar <ArrowRight /></i></button> })}</div></div>
      </section>

      <section className="v42-frontier-section"><div><span>FRONTERA</span><h2>Terminar S19 no es el final.</h2><p>Es el punto donde el mapa deja de decirte exactamente qué hacer: investigación, estándares, papers, sistemas originales, contribuciones open source y tecnologías emergentes pasan a formar parte del recorrido permanente.</p></div><Flag /></section>

      {aulaOpen && <AulaModal selected={selected} progress={progress} onClose={() => setAulaOpen(false)} onSubjectToggle={toggleSubject} />}
    </section>
  )
}
