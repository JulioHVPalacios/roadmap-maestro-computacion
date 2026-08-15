import { useMemo, useState } from "react"
import { CheckCircle2, Lightbulb, Play, RotateCcw, ShieldAlert, Target } from "lucide-react"

type Point = { x: number; y: number }

type ArenaState = {
  hero: Point
  collected: string[]
  crashed: boolean
  reachedGoal: boolean
}

const width = 7
const height = 5
const start = { x: 0, y: 4 }
const goal = { x: 6, y: 0 }
const gems: Point[] = [{ x: 2, y: 4 }, { x: 4, y: 2 }, { x: 5, y: 0 }]
const walls: Point[] = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 3 }, { x: 5, y: 3 }]

const defaultCode = `hero.moveRight(2)
hero.moveUp(2)
hero.moveRight(2)
hero.moveUp(2)
hero.moveRight(2)`

const pointKey = (point: Point) => `${point.x}-${point.y}`
const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y

function parseCommands(source: string) {
  const result: Array<{ direction: "up" | "down" | "left" | "right"; steps: number }> = []
  const lines = source.split(/\r?\n/)
  for (const line of lines) {
    const clean = line.trim()
    if (!clean || clean.startsWith("#") || clean.startsWith("//")) continue
    const match = clean.match(/hero\.move(Up|Down|Left|Right)\((\d+)?\)/i)
    if (!match) continue
    result.push({
      direction: match[1].toLowerCase() as "up" | "down" | "left" | "right",
      steps: Math.max(1, Number(match[2] || 1)),
    })
  }
  return result
}

export default function ProgrammingGameArenaV46() {
  const [code, setCode] = useState(defaultCode)
  const [state, setState] = useState<ArenaState>({ hero: start, collected: [], crashed: false, reachedGoal: false })
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState("Escribe movimientos, ejecuta y observa qué ocurre.")

  const objectives = useMemo(() => [
    { label: "Recoge al menos 2 gemas", ok: state.collected.length >= 2 },
    { label: "Evita los bloques de riesgo", ok: !state.crashed },
    { label: "Llega al nodo final", ok: state.reachedGoal },
  ], [state])

  const reset = () => {
    setState({ hero: start, collected: [], crashed: false, reachedGoal: false })
    setMessage("Arena reiniciada.")
  }

  const run = async () => {
    const commands = parseCommands(code)
    if (!commands.length) {
      setMessage("No encontré movimientos válidos. Usa hero.moveRight(2), hero.moveUp(1), etc.")
      return
    }
    setRunning(true)
    let hero = { ...start }
    const collected = new Set<string>()
    let crashed = false
    setState({ hero, collected: [], crashed: false, reachedGoal: false })

    for (const command of commands) {
      for (let step = 0; step < command.steps; step += 1) {
        const next = { ...hero }
        if (command.direction === "up") next.y -= 1
        if (command.direction === "down") next.y += 1
        if (command.direction === "left") next.x -= 1
        if (command.direction === "right") next.x += 1
        if (next.x < 0 || next.x >= width || next.y < 0 || next.y >= height) {
          crashed = true
          setMessage("El agente salió del mapa. Revisa los límites.")
          break
        }
        if (walls.some((wall) => samePoint(wall, next))) {
          crashed = true
          setMessage("El agente chocó con un bloque de riesgo. Ajusta la ruta.")
          break
        }
        hero = next
        const gem = gems.find((item) => samePoint(item, hero))
        if (gem) collected.add(pointKey(gem))
        setState({ hero: { ...hero }, collected: Array.from(collected), crashed, reachedGoal: samePoint(hero, goal) })
        await new Promise((resolve) => window.setTimeout(resolve, 230))
      }
      if (crashed) break
    }

    const reachedGoal = samePoint(hero, goal)
    setState({ hero, collected: Array.from(collected), crashed, reachedGoal })
    if (!crashed && reachedGoal && collected.size >= 2) setMessage("Misión superada. Ruta válida y objetivos cumplidos.")
    else if (!crashed && reachedGoal) setMessage("Llegaste al final, pero aún faltan gemas.")
    else if (!crashed) setMessage("El programa terminó antes de llegar al nodo final.")
    setRunning(false)
  }

  return (
    <section className="v46-arena-shell">
      <div className="v46-arena-head">
        <div><span>ARENA DE LÓGICA</span><h3>Programa el recorrido.</h3><p>Un ejercicio original para practicar secuencias, estado, depuración y planificación sin convertir toda la formación en un videojuego.</p></div>
        <div className="v46-arena-status"><Target /><b>{objectives.filter((item) => item.ok).length}/3 objetivos</b></div>
      </div>
      <div className="v46-arena-grid">
        <div className="v46-game-panel">
          <div className="v46-objective-list">
            {objectives.map((item) => <div key={item.label} className={item.ok ? "ok" : ""}>{item.ok ? <CheckCircle2 /> : <ShieldAlert />}<span>{item.label}</span></div>)}
          </div>
          <div className="v46-game-board" role="img" aria-label="Arena de programación con agente, gemas, obstáculos y meta">
            {Array.from({ length: height }).map((_, y) => Array.from({ length: width }).map((__, x) => {
              const cell = { x, y }
              const isWall = walls.some((wall) => samePoint(wall, cell))
              const gem = gems.find((item) => samePoint(item, cell))
              const isGoal = samePoint(goal, cell)
              const isHero = samePoint(state.hero, cell)
              const collected = gem ? state.collected.includes(pointKey(gem)) : false
              return <div key={`${x}-${y}`} className={`v46-board-cell ${isWall ? "wall" : ""} ${isGoal ? "goal" : ""}`}>
                {isWall && <span className="v46-wall">×</span>}
                {gem && !collected && <span className="v46-gem">◆</span>}
                {isGoal && <span className="v46-goal">◎</span>}
                {isHero && <span className={`v46-hero ${state.crashed ? "crashed" : ""}`}>CM</span>}
              </div>
            }))}
          </div>
          <p className="v46-game-message">{message}</p>
        </div>
        <div className="v46-code-panel">
          <div className="v46-code-panel-top"><span>Comandos del agente</span><small>JavaScript/Python-style API</small></div>
          <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} aria-label="Código del desafío de movimiento" />
          <div className="v46-command-help"><Lightbulb /><code>hero.moveRight(2)</code><code>hero.moveUp(1)</code><code>hero.moveLeft(1)</code><code>hero.moveDown(1)</code></div>
          <div className="v46-arena-actions"><button type="button" onClick={run} disabled={running}><Play />{running ? "Ejecutando…" : "Ejecutar"}</button><button type="button" onClick={reset}><RotateCcw />Reiniciar</button></div>
        </div>
      </div>
    </section>
  )
}
