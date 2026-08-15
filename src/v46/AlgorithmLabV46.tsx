import { useMemo, useState } from "react"
import { Play, RotateCcw, TimerReset } from "lucide-react"

const initial = [72, 34, 91, 48, 22, 63, 85, 41]

export default function AlgorithmLabV46() {
  const [values, setValues] = useState(initial)
  const [active, setActive] = useState<[number, number] | null>(null)
  const [swaps, setSwaps] = useState(0)
  const [running, setRunning] = useState(false)

  const sorted = useMemo(() => values.every((value, index) => index === 0 || values[index - 1] <= value), [values])

  const reset = () => {
    setValues(initial)
    setActive(null)
    setSwaps(0)
    setRunning(false)
  }

  const run = async () => {
    if (running) return
    setRunning(true)
    const items = [...values]
    let count = 0
    for (let end = items.length - 1; end > 0; end -= 1) {
      let changed = false
      for (let i = 0; i < end; i += 1) {
        setActive([i, i + 1])
        await new Promise((resolve) => window.setTimeout(resolve, 220))
        if (items[i] > items[i + 1]) {
          ;[items[i], items[i + 1]] = [items[i + 1], items[i]]
          count += 1
          changed = true
          setValues([...items])
          setSwaps(count)
          await new Promise((resolve) => window.setTimeout(resolve, 180))
        }
      }
      if (!changed) break
    }
    setActive(null)
    setRunning(false)
  }

  return (
    <section className="v46-algorithm-lab">
      <div className="v46-algo-copy">
        <span>VISUALIZADOR DE ALGORITMOS</span>
        <h3>Observa antes de memorizar.</h3>
        <p>Este laboratorio muestra cada comparación y cada intercambio. La meta es que puedas conectar el código con el comportamiento real y luego analizar su coste.</p>
        <div className="v46-algo-stats"><b>{swaps} intercambios</b><b>{sorted ? "ordenado" : "en proceso"}</b><b>O(n²) · Bubble Sort</b></div>
        <div className="v46-algo-actions"><button type="button" onClick={run} disabled={running}><Play />{running ? "Visualizando…" : "Ejecutar"}</button><button type="button" onClick={reset}><RotateCcw />Reiniciar</button></div>
      </div>
      <div className="v46-bars" aria-label="Visualización de ordenamiento de valores">
        {values.map((value, index) => <div key={`${value}-${index}`} className={`v46-bar ${active?.includes(index) ? "active" : ""}`} style={{ height: `${value}%` }}><span>{value}</span></div>)}
      </div>
      <div className="v46-algo-note"><TimerReset /><p>Después de verlo, reescribe el algoritmo sin mirar y compáralo con <strong>insertion sort</strong>, <strong>merge sort</strong> y <strong>quicksort</strong>.</p></div>
    </section>
  )
}
