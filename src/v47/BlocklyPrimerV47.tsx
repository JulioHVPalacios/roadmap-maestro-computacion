import { useEffect, useRef, useState } from "react"
import { Blocks, Code2, Lightbulb } from "lucide-react"

type BlocklyWorkspace = {
  dispose: () => void
  addChangeListener: (listener: () => void) => void
}

type BlocklyGlobal = {
  inject: (element: HTMLElement, options: Record<string, unknown>) => BlocklyWorkspace
}

type JavascriptGeneratorGlobal = {
  javascriptGenerator: {
    workspaceToCode: (workspace: BlocklyWorkspace) => string
  }
}

type BlocklyWindow = Window & {
  Blockly?: BlocklyGlobal
  javascript?: JavascriptGeneratorGlobal
}

const SCRIPT_URLS = [
  "https://unpkg.com/blockly@13.2.1/blockly_compressed.js",
  "https://unpkg.com/blockly@13.2.1/blocks_compressed.js",
  "https://unpkg.com/blockly@13.2.1/javascript_compressed.js",
  "https://unpkg.com/blockly@13.2.1/msg/es.js",
]

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-v47-blockly="${src}"]`)
    if (existing) {
      if (existing.dataset.loaded === "true") resolve()
      else {
        existing.addEventListener("load", () => resolve(), { once: true })
        existing.addEventListener("error", () => reject(new Error(`No se pudo cargar ${src}`)), { once: true })
      }
      return
    }
    const script = document.createElement("script")
    script.src = src
    script.async = false
    script.dataset.v47Blockly = src
    script.onload = () => { script.dataset.loaded = "true"; resolve() }
    script.onerror = () => reject(new Error(`No se pudo cargar ${src}`))
    document.head.appendChild(script)
  })
}

export default function BlocklyPrimerV47() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState("Preparando editor visual…")
  const [generated, setGenerated] = useState("// Arrastra bloques para generar JavaScript aquí.")

  useEffect(() => {
    let disposed = false
    let workspace: BlocklyWorkspace | null = null

    const start = async () => {
      try {
        for (const src of SCRIPT_URLS) await loadScript(src)
        if (disposed || !mountRef.current) return
        const win = window as BlocklyWindow
        if (!win.Blockly || !win.javascript?.javascriptGenerator) throw new Error("Blockly no terminó de inicializarse.")

        const toolbox = {
          kind: "categoryToolbox",
          contents: [
            { kind: "category", name: "Lógica", colour: "#5C81A6", contents: [
              { kind: "block", type: "controls_if" },
              { kind: "block", type: "logic_compare" },
              { kind: "block", type: "logic_boolean" },
            ] },
            { kind: "category", name: "Bucles", colour: "#5CA65C", contents: [
              { kind: "block", type: "controls_repeat_ext" },
              { kind: "block", type: "controls_whileUntil" },
            ] },
            { kind: "category", name: "Matemática", colour: "#5C68A6", contents: [
              { kind: "block", type: "math_number" },
              { kind: "block", type: "math_arithmetic" },
            ] },
            { kind: "category", name: "Texto", colour: "#5CA68D", contents: [
              { kind: "block", type: "text" },
              { kind: "block", type: "text_print" },
            ] },
            { kind: "category", name: "Variables", colour: "#A65C81", custom: "VARIABLE" },
            { kind: "category", name: "Funciones", colour: "#995BA5", custom: "PROCEDURE" },
          ],
        }

        workspace = win.Blockly.inject(mountRef.current, {
          toolbox,
          trashcan: true,
          zoom: { controls: true, wheel: true, startScale: 0.88, maxScale: 1.4, minScale: 0.5, scaleSpeed: 1.1 },
          grid: { spacing: 20, length: 3, colour: "#d7dde4", snap: true },
          move: { scrollbars: true, drag: true, wheel: true },
        })
        const update = () => {
          if (!workspace || !win.javascript?.javascriptGenerator) return
          setGenerated(win.javascript.javascriptGenerator.workspaceToCode(workspace) || "// Añade bloques al lienzo.")
        }
        workspace.addChangeListener(update)
        update()
        setStatus("Editor visual listo")
      } catch (error) {
        setStatus(error instanceof Error ? error.message : String(error))
      }
    }

    void start()
    return () => { disposed = true; workspace?.dispose() }
  }, [])

  return (
    <section className="v47-blockly-shell">
      <div className="v47-blockly-copy">
        <span>ANTES DE LA SINTAXIS</span>
        <h3>Construye la lógica con bloques.</h3>
        <p>Para quien parte de cero absoluto: arrastra decisiones, bucles, variables y funciones. A la derecha ves cómo esa estructura se transforma en JavaScript escrito.</p>
        <div className="v47-blockly-guide"><Lightbulb /><div><b>Orden recomendado</b><ol><li>Arrastra un bloque de texto y uno de imprimir.</li><li>Prueba un bloque repetir.</li><li>Crea una variable.</li><li>Después compara el código generado.</li></ol></div></div>
        <div className="v47-blockly-status"><Blocks /><span>{status}</span></div>
      </div>
      <div className="v47-blockly-workspace"><div ref={mountRef} className="v47-blockly-mount" /></div>
      <div className="v47-blockly-code"><div><Code2 /><b>Equivalente en JavaScript</b></div><pre>{generated}</pre></div>
    </section>
  )
}
