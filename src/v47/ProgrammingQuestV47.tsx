import { useMemo, useState } from "react"
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, CircleHelp, Flag, Lightbulb, Play, RotateCcw, Sparkles, Target } from "lucide-react"
import { gameLessonsV47 } from "./programming-v47-teacher-data"

type Point = { x: number; y: number }
type Move = { direction: "up" | "down" | "left" | "right"; steps: number }
type QuestState = { hero: Point; collected: string[]; crashed: boolean; reachedGoal: boolean }

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y
const key = (p: Point) => `${p.x}-${p.y}`

function compileQuestCode(source: string): Promise<{ commands: Move[]; error?: string }> {
  return new Promise((resolve) => {
    const workerSource = `
      self.fetch = undefined;
      self.XMLHttpRequest = undefined;
      self.WebSocket = undefined;
      self.importScripts = undefined;
      self.onmessage = (event) => {
        const commands = [];
        const push = (direction, steps = 1) => {
          const n = Number(steps);
          if (!Number.isFinite(n) || n < 1 || n > 50) throw new Error('Los pasos deben estar entre 1 y 50.');
          commands.push({ direction, steps: Math.floor(n) });
          if (commands.length > 200) throw new Error('Demasiados movimientos. Revisa el bucle.');
        };
        const hero = {
          moveUp: (n = 1) => push('up', n),
          moveDown: (n = 1) => push('down', n),
          moveLeft: (n = 1) => push('left', n),
          moveRight: (n = 1) => push('right', n),
        };
        try {
          const fn = new Function('hero', '"use strict";\\n' + event.data);
          fn(hero);
          self.postMessage({ commands });
        } catch (error) {
          self.postMessage({ commands: [], error: error instanceof Error ? error.message : String(error) });
        }
      };
    `
    const blob = new Blob([workerSource], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    const timer = window.setTimeout(() => {
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve({ commands: [], error: "La ejecución tardó demasiado. Puede haber un bucle infinito." })
    }, 1800)
    worker.onmessage = (event: MessageEvent<{ commands: Move[]; error?: string }>) => {
      window.clearTimeout(timer)
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve(event.data)
    }
    worker.postMessage(source)
  })
}

export default function ProgrammingQuestV47() {
  const [lessonIndex, setLessonIndex] = useState(0)
  const [teacherStep, setTeacherStep] = useState(0)
  const lesson = gameLessonsV47[lessonIndex]
  const [code, setCode] = useState(lesson.code)
  const [state, setState] = useState<QuestState>({ hero: lesson.start, collected: [], crashed: false, reachedGoal: false })
  const [message, setMessage] = useState("Empieza por el paso 1 del profesor. No tienes que adivinar qué escribir.")
  const [hintIndex, setHintIndex] = useState(-1)
  const [running, setRunning] = useState(false)

  const objectives = useMemo(() => [
    { label: `Recoger ${lesson.needGems} gema${lesson.needGems === 1 ? "" : "s"}`, ok: state.collected.length >= lesson.needGems },
    { label: "No chocar con obstáculos", ok: !state.crashed },
    { label: "Llegar a la meta", ok: state.reachedGoal },
  ], [lesson.needGems, state])

  const resetForLesson = (index: number) => {
    const next = gameLessonsV47[index]
    setLessonIndex(index)
    setTeacherStep(0)
    setCode(next.code)
    setState({ hero: next.start, collected: [], crashed: false, reachedGoal: false })
    setMessage("Lee el primer paso del profesor y predice la ruta antes de ejecutar.")
    setHintIndex(-1)
  }

  const insertSnippet = (snippet?: string) => {
    if (!snippet) return
    setCode((current) => {
      const trimmed = current.trim()
      if (!trimmed || current === lesson.code) return snippet
      return `${current.replace(/\s+$/, "")}\n${snippet}`
    })
  }

  const run = async () => {
    setRunning(true)
    setMessage("Primero traduzco tu código a movimientos; después los ejecutamos uno por uno…")
    const compiled = await compileQuestCode(code)
    if (compiled.error) {
      setMessage(`Error de código: ${compiled.error}. Lee el paso del profesor y revisa paréntesis, llaves y nombres.`)
      setRunning(false)
      return
    }
    if (!compiled.commands.length) {
      setMessage("Tu programa no produjo movimientos. Necesitas llamar a métodos como hero.moveRight(1).")
      setRunning(false)
      return
    }

    let hero = { ...lesson.start }
    const collected = new Set<string>()
    let crashed = false
    setState({ hero, collected: [], crashed: false, reachedGoal: false })

    outer: for (const command of compiled.commands) {
      for (let i = 0; i < command.steps; i += 1) {
        const next = { ...hero }
        if (command.direction === "up") next.y -= 1
        if (command.direction === "down") next.y += 1
        if (command.direction === "left") next.x -= 1
        if (command.direction === "right") next.x += 1

        if (next.x < 0 || next.x >= lesson.width || next.y < 0 || next.y >= lesson.height) {
          crashed = true
          setMessage(`El agente salió del mapa. La instrucción ${command.direction} lo llevó fuera de los límites.`)
          break outer
        }
        if (lesson.walls.some((wall) => same(wall, next))) {
          crashed = true
          hero = next
          setState({ hero, collected: Array.from(collected), crashed: true, reachedGoal: false })
          setMessage("Choque detectado. No cambies todo: identifica qué instrucción llevó al obstáculo y corrige esa línea.")
          break outer
        }
        hero = next
        const gem = lesson.gems.find((item) => same(item, hero))
        if (gem) collected.add(key(gem))
        const reachedGoal = same(hero, lesson.goal)
        setState({ hero: { ...hero }, collected: Array.from(collected), crashed: false, reachedGoal })
        await new Promise((resolve) => window.setTimeout(resolve, 360))
      }
    }

    const reachedGoal = same(hero, lesson.goal)
    setState({ hero, collected: Array.from(collected), crashed, reachedGoal })
    if (!crashed && reachedGoal && collected.size >= lesson.needGems) {
      setMessage(`Misión superada. Ahora explica con tus palabras el concepto: ${lesson.concept}. Esa explicación es parte del aprendizaje.`)
    } else if (!crashed && reachedGoal) {
      setMessage(`Llegaste a la meta, pero recogiste ${collected.size}/${lesson.needGems} gemas. Revisa la ruta, no la sintaxis.`)
    } else if (!crashed) {
      setMessage("El programa terminó antes de la meta. Cuenta cuántas casillas faltan y decide qué instrucción debe cambiar.")
    }
    setRunning(false)
  }

  const activeTeacher = lesson.teacherSteps[Math.min(teacherStep, lesson.teacherSteps.length - 1)]

  return (
    <section className="v47-quest-shell">
      <header className="v47-quest-header">
        <div><span>PROGRAMMING QUEST · PROFESOR ACTIVADO</span><h3>Aprende el concepto antes de jugar.</h3><p>La misión no presupone que sabes programar: cada paso explica qué escribir, dónde, qué significa y por qué funciona.</p></div>
        <div className="v47-quest-level-switcher">
          {gameLessonsV47.map((item, index) => <button type="button" key={item.id} className={lessonIndex === index ? "active" : ""} onClick={() => resetForLesson(index)}>{index + 1}<small>{item.concept}</small></button>)}
        </div>
      </header>

      <div className="v47-quest-teacher">
        <div className="v47-teacher-badge"><Sparkles /><span>PROFESOR</span></div>
        <div className="v47-teacher-step-count">PASO {teacherStep + 1}/{lesson.teacherSteps.length}</div>
        <h4>{activeTeacher.title}</h4>
        <p>{activeTeacher.explanation}</p>
        <div className="v47-teacher-action"><Target /><span><b>Haz esto ahora:</b> {activeTeacher.action}</span></div>
        {activeTeacher.snippet && <button type="button" className="v47-insert-code" onClick={() => insertSnippet(activeTeacher.snippet)}><BookOpen />Insertar este código<code>{activeTeacher.snippet}</code></button>}
        <div className="v47-teacher-controls"><button type="button" disabled={teacherStep === 0} onClick={() => setTeacherStep((current) => Math.max(0, current - 1))}><ChevronLeft />Anterior</button><button type="button" disabled={teacherStep >= lesson.teacherSteps.length - 1} onClick={() => setTeacherStep((current) => Math.min(lesson.teacherSteps.length - 1, current + 1))}>Siguiente<ChevronRight /></button></div>
      </div>

      <div className="v47-quest-main">
        <div className="v47-quest-world">
          <div className="v47-quest-objectives">{objectives.map((item) => <span key={item.label} className={item.ok ? "ok" : ""}>{item.ok ? <CheckCircle2 /> : <Flag />}{item.label}</span>)}</div>
          <div className="v47-world-board" style={{ gridTemplateColumns: `repeat(${lesson.width}, 1fr)`, gridTemplateRows: `repeat(${lesson.height}, 1fr)` }}>
            {Array.from({ length: lesson.height }).map((_, y) => Array.from({ length: lesson.width }).map((__, x) => {
              const cell = { x, y }
              const wall = lesson.walls.some((item) => same(item, cell))
              const gem = lesson.gems.find((item) => same(item, cell))
              const collected = gem ? state.collected.includes(key(gem)) : false
              const goal = same(lesson.goal, cell)
              const hero = same(state.hero, cell)
              return <div key={`${x}-${y}`} className={`v47-world-cell ${wall ? "wall" : ""} ${goal ? "goal" : ""}`}>
                <small>{x},{y}</small>
                {wall && <span className="v47-rock">▦</span>}
                {gem && !collected && <span className="v47-crystal">◆</span>}
                {goal && <span className="v47-flag">⚑</span>}
                {hero && <span className={`v47-agent ${state.crashed ? "crashed" : ""}`}>CM</span>}
              </div>
            }))}
          </div>
          <div className="v47-world-message"><CircleHelp /><p>{message}</p></div>
        </div>

        <div className="v47-quest-editor">
          <div className="v47-editor-heading"><div><span>JavaScript real</span><small>{lesson.title}</small></div><button type="button" onClick={run} disabled={running}><Play />{running ? "Ejecutando…" : "Ejecutar"}</button></div>
          <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} aria-label="Editor de código del Programming Quest" />
          <div className="v47-code-anatomy"><b>Lo que estás aprendiendo</b><p><strong>{lesson.concept}:</strong> {lesson.summary}</p><p><strong>Por qué:</strong> {lesson.why}</p></div>
          <div className="v47-quest-help"><button type="button" onClick={() => setHintIndex((current) => Math.min(lesson.hints.length - 1, current + 1))}><Lightbulb />Dame una pista</button><button type="button" onClick={() => { setCode(lesson.code); setMessage("Código inicial restaurado. Vuelve al paso 1 y razona la ruta.") }}><RotateCcw />Restaurar</button></div>
          {hintIndex >= 0 && <div className="v47-hint-box"><Lightbulb /><p>{lesson.hints[hintIndex]}</p></div>}
        </div>
      </div>
    </section>
  )
}
