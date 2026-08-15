import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"
import * as monaco from "monaco-editor"
import { Terminal as XTerm } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileCode2,
  FolderOpen,
  Play,
  RotateCcw,
  SearchCheck,
  Terminal,
  TestTube2,
} from "lucide-react"
import type { ConceptSeedV51 } from "../v51/programming-curriculum-v51"
import "./monaco-env"

export type StudioExecutionV52 = {
  output: string
  hasError: boolean
  expectedMatches: boolean
}

export type CampusCodeStudioHandleV52 = {
  run: () => Promise<void>
  runTests: () => Promise<void>
  reset: () => void
  openMain: () => void
  focusLine: (line: number) => void
}

type PyodideLike = {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (options: { batched: (text: string) => void }) => void
  setStderr: (options: { batched: (text: string) => void }) => void
}

type PyodideWindow = Window & {
  loadPyodide?: (options?: { indexURL?: string }) => Promise<PyodideLike>
}

type VirtualFile = {
  name: string
  language: string
  content: string
  readOnly?: boolean
}

type Props = {
  levelCode: string
  concept: ConceptSeedV51
  onExecution?: (result: StudioExecutionV52) => void
}

const MAIN_FILE_BY_LANGUAGE: Record<ConceptSeedV51["language"], string> = {
  python: "main.py",
  javascript: "main.js",
  web: "index.html",
  text: "notas.txt",
}

const MONACO_LANGUAGE_BY_CONCEPT: Record<ConceptSeedV51["language"], string> = {
  python: "python",
  javascript: "javascript",
  web: "html",
  text: "plaintext",
}

function initialSource(concept: ConceptSeedV51) {
  if (concept.code.trim()) return concept.code
  return [
    `CONCEPTO: ${concept.title}`,
    "",
    "1. Describe la entrada.",
    "2. Escribe el estado inicial.",
    "3. Aplica la regla paso a paso.",
    "4. Anota el estado después de cada paso.",
    "5. Compara el resultado con lo esperado.",
  ].join("\n")
}

function buildFiles(levelCode: string, concept: ConceptSeedV51): VirtualFile[] {
  const main = MAIN_FILE_BY_LANGUAGE[concept.language]
  const readme = [
    `# ${levelCode} · ${concept.title}`,
    "",
    concept.what,
    "",
    "## Objetivo",
    concept.why,
    "",
    "## Experimento sugerido",
    concept.experiment,
    "",
    "## Resultado esperado",
    concept.expected || "Explica la traza y justifica el resultado.",
  ].join("\n")
  const tests = [
    `PRUEBAS DEL CONCEPTO · ${concept.title}`,
    "",
    `1. Caso normal: ${concept.expected || "define un resultado observable"}`,
    "2. Caso alternativo: cambia una sola entrada y predice el efecto.",
    "3. Caso límite: prueba vacío, cero, mínimo, máximo o ausencia si corresponde.",
    "4. Regresión: conserva un caso que falle antes de corregir y pase después.",
  ].join("\n")
  return [
    { name: main, language: MONACO_LANGUAGE_BY_CONCEPT[concept.language], content: initialSource(concept) },
    { name: "README.md", language: "markdown", content: readme, readOnly: true },
    { name: "tests.txt", language: "plaintext", content: tests, readOnly: true },
  ]
}

function runJavaScript(code: string): Promise<string> {
  return new Promise((resolve) => {
    const workerSource = `
      const logs = [];
      const format = value => {
        try { return typeof value === 'string' ? value : JSON.stringify(value, null, 2); }
        catch { return String(value); }
      };
      console.log = (...args) => logs.push(args.map(format).join(' '));
      console.error = (...args) => logs.push('[error] ' + args.map(format).join(' '));
      self.onmessage = event => {
        try {
          const result = (0, eval)(event.data);
          if (result !== undefined) logs.push('→ ' + format(result));
          self.postMessage({ text: logs.join('\\n') || 'Programa finalizado correctamente, sin salida visible.' });
        } catch (error) {
          self.postMessage({ text: String(error && error.stack ? error.stack : error) });
        }
      };
    `
    const blob = new Blob([workerSource], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    const timer = window.setTimeout(() => {
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve("Tiempo límite excedido. Revisa si existe un bucle que no termina o una operación demasiado costosa.")
    }, 4500)
    worker.onmessage = (event: MessageEvent<{ text: string }>) => {
      window.clearTimeout(timer)
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve(event.data.text)
    }
    worker.postMessage(code)
  })
}

async function loadPyodideRuntime(): Promise<PyodideLike> {
  const win = window as PyodideWindow
  if (!win.loadPyodide) {
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>("script[data-campus-pyodide-v52]")
      if (existing) {
        if (win.loadPyodide) resolve()
        else {
          existing.addEventListener("load", () => resolve(), { once: true })
          existing.addEventListener("error", () => reject(new Error("No se pudo cargar Python en el laboratorio.")), { once: true })
        }
        return
      }
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.js"
      script.async = true
      script.dataset.campusPyodideV52 = "true"
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("No se pudo cargar Python. Comprueba la conexión a Internet."))
      document.head.appendChild(script)
    })
  }
  if (!win.loadPyodide) throw new Error("Python/Pyodide no está disponible en este navegador.")
  return win.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/" })
}

function detectError(text: string) {
  return /error|traceback|exception|syntaxerror|referenceerror|typeerror|tiempo límite/i.test(text)
}

function normalizeExpected(value: string) {
  return value.trim().toLocaleLowerCase("es")
}

const storageKey = (levelCode: string, conceptId: string, name: string) =>
  `campus-v52:${levelCode}:${conceptId}:${name}`

function hydrateFiles(levelCode: string, concept: ConceptSeedV51): VirtualFile[] {
  return buildFiles(levelCode, concept).map((file) => {
    if (file.readOnly || typeof window === "undefined") return file
    const saved = window.localStorage.getItem(storageKey(levelCode, concept.id, file.name))
    return saved === null ? file : { ...file, content: saved }
  })
}

const CampusCodeStudioV52 = forwardRef<CampusCodeStudioHandleV52, Props>(function CampusCodeStudioV52(
  { levelCode, concept, onExecution },
  ref,
) {
  const mainFile = MAIN_FILE_BY_LANGUAGE[concept.language]
  const initialFiles = useMemo(() => hydrateFiles(levelCode, concept), [levelCode, concept])
  const initialMain = initialFiles.find((file) => file.name === mainFile)?.content ?? initialSource(concept)
  const [files, setFiles] = useState<VirtualFile[]>(() => initialFiles)
  const filesRef = useRef(files)
  const [activeFile, setActiveFile] = useState(mainFile)
  const [panel, setPanel] = useState<"terminal" | "problems" | "preview">("terminal")
  const [prediction, setPrediction] = useState("")
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState("Laboratorio preparado. Formula una predicción antes de ejecutar.")
  const [runtimeProblem, setRuntimeProblem] = useState("")
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([])
  const [cursor, setCursor] = useState({ line: 1, column: 1 })
  const [mobileMode, setMobileMode] = useState(() =>
    typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 820),
  )
  const [mobileCode, setMobileCode] = useState(() => initialMain)
  const [webPreview, setWebPreview] = useState(() => concept.language === "web" ? initialMain : "")
  const editorHostRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const modelsRef = useRef<Map<string, monaco.editor.ITextModel>>(new Map())
  const terminalHostRef = useRef<HTMLDivElement | null>(null)
  const terminalRef = useRef<XTerm | null>(null)
  const inputRef = useRef("")
  const pyodideRef = useRef<PyodideLike | null>(null)
  const terminalCommandRef = useRef<(raw: string) => Promise<void>>(async () => undefined)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)")
    const update = () => setMobileMode(coarse.matches || window.innerWidth < 820)
    coarse.addEventListener("change", update)
    window.addEventListener("resize", update)
    return () => {
      coarse.removeEventListener("change", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const setFileContent = useCallback((name: string, content: string) => {
    setFiles((current) => current.map((file) => file.name === name ? { ...file, content } : file))
    const item = filesRef.current.find((file) => file.name === name)
    if (!item?.readOnly) localStorage.setItem(storageKey(levelCode, concept.id, name), content)
  }, [concept.id, levelCode])

  useEffect(() => {
    if (mobileMode || !editorHostRef.current) return

    monaco.typescript.javascriptDefaults.setDiagnosticsOptions({ noSemanticValidation: false, noSyntaxValidation: false })
    monaco.typescript.javascriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      checkJs: true,
      target: monaco.typescript.ScriptTarget.ESNext,
    })

    const createdModels: monaco.editor.ITextModel[] = []
    const modelMap = new Map<string, monaco.editor.ITextModel>()
    for (const file of filesRef.current) {
      const uri = monaco.Uri.parse(`file:///campus/${levelCode}/${concept.id}/${file.name}`)
      const existing = monaco.editor.getModel(uri)
      const model = existing ?? monaco.editor.createModel(file.content, file.language, uri)
      if (!existing) createdModels.push(model)
      model.setValue(file.content)
      modelMap.set(file.name, model)
    }
    modelsRef.current = modelMap

    const editor = monaco.editor.create(editorHostRef.current, {
      model: modelMap.get(mainFile),
      theme: "vs-dark",
      automaticLayout: true,
      fontFamily: "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
      fontLigatures: true,
      fontSize: 13,
      lineHeight: 21,
      minimap: { enabled: true, scale: 0.75, showSlider: "mouseover" },
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
      bracketPairColorization: { enabled: true },
      guides: { bracketPairs: true, indentation: true },
      renderWhitespace: "selection",
      padding: { top: 12, bottom: 18 },
      wordWrap: "off",
      tabSize: 2,
      insertSpaces: true,
      formatOnPaste: true,
      quickSuggestions: { other: true, comments: false, strings: true },
      suggestOnTriggerCharacters: true,
      overviewRulerBorder: false,
    })
    editorRef.current = editor

    const contentSubscription = editor.onDidChangeModelContent(() => {
      const model = editor.getModel()
      if (!model) return
      const name = [...modelMap.entries()].find(([, value]) => value === model)?.[0]
      if (!name) return
      const file = filesRef.current.find((item) => item.name === name)
      if (file?.readOnly) return
      setFileContent(name, model.getValue())
    })
    const cursorSubscription = editor.onDidChangeCursorPosition((event) => {
      setCursor({ line: event.position.lineNumber, column: event.position.column })
    })
    const markerSubscription = monaco.editor.onDidChangeMarkers(() => {
      const model = editor.getModel()
      if (!model) return
      setMarkers(monaco.editor.getModelMarkers({ resource: model.uri }))
    })

    return () => {
      contentSubscription.dispose()
      cursorSubscription.dispose()
      markerSubscription.dispose()
      editor.dispose()
      editorRef.current = null
      for (const model of createdModels) model.dispose()
      modelsRef.current.clear()
    }
  }, [concept.id, levelCode, mainFile, mobileMode, setFileContent])

  useEffect(() => {
    if (mobileMode) return
    const editor = editorRef.current
    const model = modelsRef.current.get(activeFile)
    if (!editor || !model) return
    editor.setModel(model)
    const file = filesRef.current.find((item) => item.name === activeFile)
    editor.updateOptions({ readOnly: Boolean(file?.readOnly) })
    editor.focus()
  }, [activeFile, mobileMode])

  const terminalPrompt = `\x1b[38;2;123;210;255mcampus\x1b[0m@lab:\x1b[38;2;231;255;113m~/${levelCode}\x1b[0m$ `

  const writeTerminal = useCallback((text: string) => {
    const terminal = terminalRef.current
    if (!terminal) return
    for (const line of text.split("\n")) terminal.writeln(line)
  }, [])

  const currentMainCode = useCallback(() => {
    if (mobileMode) return mobileCode
    return modelsRef.current.get(mainFile)?.getValue() ?? filesRef.current.find((file) => file.name === mainFile)?.content ?? initialSource(concept)
  }, [concept, mainFile, mobileCode, mobileMode])

  const executeMain = useCallback(async (emitTerminal = true): Promise<StudioExecutionV52> => {
    const code = currentMainCode()
    setRunning(true)
    setRuntimeProblem("")
    if (emitTerminal) {
      setPanel("terminal")
      terminalRef.current?.writeln(`\r\n\x1b[2m$ run ${mainFile}\x1b[0m`)
    }
    let text: string
    try {
      if (concept.language === "text") {
        text = "Este concepto se valida mediante traza manual. Describe cada cambio de estado y compáralo con el modelo de la lección."
      } else if (concept.language === "javascript") {
        text = await runJavaScript(code)
      } else if (concept.language === "web") {
        setWebPreview(code)
        setPanel("preview")
        text = "Vista previa actualizada. Comprueba estructura, comportamiento y consola del navegador si corresponde."
      } else {
        const pyodide = pyodideRef.current ?? await loadPyodideRuntime()
        pyodideRef.current = pyodide
        const lines: string[] = []
        pyodide.setStdout({ batched: (value) => lines.push(value) })
        pyodide.setStderr({ batched: (value) => lines.push(`[error] ${value}`) })
        const result = await pyodide.runPythonAsync(code)
        if (result !== undefined && result !== null) lines.push(String(result))
        text = lines.join("\n") || "Python finalizó correctamente, sin salida visible."
      }
    } catch (error) {
      text = error instanceof Error ? error.message : String(error)
    } finally {
      setRunning(false)
    }
    const hasError = detectError(text)
    const expected = normalizeExpected(concept.expected)
    const expectedMatches = Boolean(expected && text.toLocaleLowerCase("es").includes(expected))
    setOutput(text)
    if (hasError) {
      setRuntimeProblem(text.split("\n")[0] ?? text)
      setPanel("problems")
    }
    if (emitTerminal) writeTerminal(text)
    const result = { output: text, hasError, expectedMatches }
    onExecution?.(result)
    return result
  }, [concept, currentMainCode, mainFile, onExecution, writeTerminal])

  const runTests = useCallback(async (emitTerminal = true): Promise<string> => {
    if (emitTerminal) terminalRef.current?.writeln(`\r\n\x1b[2m$ test ${mainFile}\x1b[0m`)
    const result = await executeMain(false)
    const expected = normalizeExpected(concept.expected)
    let report: string
    if (result.hasError) report = `FAIL · la ejecución produjo un error.\n${result.output}`
    else if (!expected) report = "MANUAL · este concepto requiere justificar la traza o el comportamiento; no tiene una salida textual única."
    else if (result.expectedMatches) report = `PASS · la salida contiene el resultado esperado: ${concept.expected}`
    else report = `REVISAR · esperado: ${concept.expected}\nobtenido:\n${result.output}`
    setOutput(report)
    if (emitTerminal) writeTerminal(report)
    setPanel(result.hasError || (!result.expectedMatches && Boolean(expected)) ? "problems" : "terminal")
    return report
  }, [concept.expected, executeMain, mainFile, writeTerminal])

  const resetWorkspace = useCallback(() => {
    const resetFiles = buildFiles(levelCode, concept)
    for (const file of resetFiles) {
      if (!file.readOnly) localStorage.removeItem(storageKey(levelCode, concept.id, file.name))
      const model = modelsRef.current.get(file.name)
      if (model) model.setValue(file.content)
    }
    setFiles(resetFiles)
    setMobileCode(initialSource(concept))
    setActiveFile(mainFile)
    setPrediction("")
    setOutput("Ejemplo restaurado. Vuelve a formular una predicción antes de ejecutar.")
    setRuntimeProblem("")
    setMarkers([])
    setWebPreview(concept.language === "web" ? initialSource(concept) : "")
    terminalRef.current?.writeln("\r\n\x1b[38;2;231;255;113mWorkspace restaurado.\x1b[0m")
  }, [concept, levelCode, mainFile])

  const openFile = useCallback((name: string) => {
    if (!filesRef.current.some((file) => file.name === name)) return
    setActiveFile(name)
  }, [])

  const focusLine = useCallback((line: number) => {
    setActiveFile(mainFile)
    window.setTimeout(() => {
      const editor = editorRef.current
      if (!editor) return
      editor.revealLineInCenter(line)
      editor.setPosition({ lineNumber: line, column: 1 })
      editor.focus()
      const decoration = editor.createDecorationsCollection([
        { range: new monaco.Range(line, 1, line, 1), options: { isWholeLine: true, className: "v52-focus-line", glyphMarginClassName: "v52-focus-glyph" } },
      ])
      window.setTimeout(() => decoration.clear(), 1800)
    }, 80)
  }, [mainFile])

  useImperativeHandle(ref, () => ({
    run: () => executeMain(true).then(() => undefined),
    runTests: () => runTests(true).then(() => undefined),
    reset: resetWorkspace,
    openMain: () => openFile(mainFile),
    focusLine,
  }))

  const handleTerminalCommand = useCallback(async (raw: string) => {
    const command = raw.trim()
    if (!command) return
    const [verb, ...args] = command.split(/\s+/)
    const target = args.join(" ")
    switch (verb.toLowerCase()) {
      case "help":
        writeTerminal("Comandos: help · ls · pwd · open <archivo> · cat <archivo> · run · test · clear · reset")
        break
      case "ls":
        writeTerminal(filesRef.current.map((file) => file.name).join("    "))
        break
      case "pwd":
        writeTerminal(`/campus/${levelCode}/${concept.id}`)
        break
      case "open":
        if (!target || !filesRef.current.some((file) => file.name === target)) writeTerminal("Uso: open <archivo>. Ejecuta ls para ver los archivos.")
        else {
          openFile(target)
          writeTerminal(`Abierto: ${target}`)
        }
        break
      case "cat": {
        const file = filesRef.current.find((item) => item.name === target)
        writeTerminal(file ? file.content : "Archivo no encontrado. Ejecuta ls.")
        break
      }
      case "run":
        await executeMain(false).then((result) => writeTerminal(result.output))
        break
      case "test": {
        const report = await runTests(false)
        writeTerminal(report)
        break
      }
      case "clear":
        terminalRef.current?.clear()
        break
      case "reset":
        resetWorkspace()
        break
      default:
        writeTerminal(`Comando no reconocido: ${verb}. Ejecuta help.`)
    }
  }, [concept.id, executeMain, levelCode, openFile, resetWorkspace, runTests, writeTerminal])

  useEffect(() => {
    terminalCommandRef.current = handleTerminalCommand
  }, [handleTerminalCommand])

  useEffect(() => {
    if (!terminalHostRef.current) return
    const terminal = new XTerm({
      cursorBlink: true,
      cursorStyle: "bar",
      fontFamily: "'Cascadia Mono', 'JetBrains Mono', Consolas, monospace",
      fontSize: 12,
      lineHeight: 1.25,
      scrollback: 1200,
      convertEol: true,
      theme: {
        background: "#090d12",
        foreground: "#d8dee9",
        cursor: "#e7ff71",
        cursorAccent: "#090d12",
        selectionBackground: "#274b66aa",
        black: "#111820",
        red: "#ff6b7a",
        green: "#b9e66b",
        yellow: "#f4c96b",
        blue: "#7bd2ff",
        magenta: "#bca7ff",
        cyan: "#76e6dd",
        white: "#f3f6f9",
        brightBlack: "#5d6975",
        brightRed: "#ff8793",
        brightGreen: "#d4ff89",
        brightYellow: "#ffdc8a",
        brightBlue: "#9adfff",
        brightMagenta: "#d2c5ff",
        brightCyan: "#9cf1eb",
        brightWhite: "#ffffff",
      },
    })
    const fit = new FitAddon()
    terminal.loadAddon(fit)
    terminal.open(terminalHostRef.current)
    terminalRef.current = terminal
    fit.fit()
    terminal.writeln("\x1b[1;38;2;231;255;113mCampus Code Studio\x1b[0m  \x1b[2m· entorno de práctica\x1b[0m")
    terminal.writeln("Escribe \x1b[38;2;123;210;255mhelp\x1b[0m para ver los comandos del laboratorio.\r\n")
    terminal.write(terminalPrompt)

    const dataSubscription = terminal.onData((data) => {
      if (data === "\r") {
        const command = inputRef.current
        inputRef.current = ""
        terminal.write("\r\n")
        void terminalCommandRef.current(command).finally(() => terminal.write(terminalPrompt))
        return
      }
      if (data === "\u007f") {
        if (inputRef.current.length > 0) {
          inputRef.current = inputRef.current.slice(0, -1)
          terminal.write("\b \b")
        }
        return
      }
      if (data === "\u000c") {
        terminal.clear()
        terminal.write(terminalPrompt)
        return
      }
      if (data >= " " && data !== "\u007f") {
        inputRef.current += data
        terminal.write(data)
      }
    })
    const resizeObserver = new ResizeObserver(() => fit.fit())
    resizeObserver.observe(terminalHostRef.current)
    return () => {
      dataSubscription.dispose()
      resizeObserver.disconnect()
      terminal.dispose()
      terminalRef.current = null
    }
  }, [concept.id, levelCode, terminalPrompt])

  const allProblems = [
    ...markers.map((marker) => ({
      message: marker.message,
      line: marker.startLineNumber,
      severity: marker.severity >= monaco.MarkerSeverity.Error ? "error" : "warning",
    })),
    ...(runtimeProblem ? [{ message: runtimeProblem, line: 0, severity: "error" }] : []),
  ]

  const activeVirtualFile = files.find((file) => file.name === activeFile) ?? files[0]
  const expectedMatches = Boolean(normalizeExpected(concept.expected) && output.toLocaleLowerCase("es").includes(normalizeExpected(concept.expected)))
  const hasError = detectError(output)

  return (
    <section className="v52-studio" aria-label="Campus Code Studio">
      <header className="v52-studio-titlebar">
        <div className="v52-studio-brand"><span className="v52-studio-mark">CM</span><div><b>Campus Code Studio</b><small>{levelCode} / {concept.title}</small></div></div>
        <div className="v52-studio-actions">
          <button type="button" onClick={resetWorkspace}><RotateCcw />Restaurar</button>
          <button type="button" onClick={() => void runTests()} disabled={running}><TestTube2 />Probar</button>
          <button type="button" className="primary" onClick={() => void executeMain()} disabled={running || concept.language === "text"}><Play />{running ? "Ejecutando" : concept.language === "text" ? "Traza manual" : "Ejecutar"}</button>
        </div>
      </header>

      <div className="v52-studio-workbench">
        <aside className="v52-activitybar" aria-label="Herramientas del editor">
          <button type="button" className="active" title="Explorador"><FolderOpen /></button>
          <button type="button" onClick={() => setPanel("problems")} className={panel === "problems" ? "active" : ""} title="Problemas"><SearchCheck /><span>{allProblems.length || ""}</span></button>
          <button type="button" onClick={() => setPanel("terminal")} className={panel === "terminal" ? "active" : ""} title="Terminal"><Terminal /></button>
        </aside>

        <aside className="v52-file-explorer">
          <header><b>EXPLORADOR</b><small>WORKSPACE</small></header>
          <div className="v52-folder"><ChevronRight /><span>CAMPUS_LAB</span></div>
          <nav>
            {files.map((file) => (
              <button type="button" key={file.name} className={activeFile === file.name ? "active" : ""} onClick={() => openFile(file.name)}>
                <FileCode2 /><span>{file.name}</span>{file.readOnly && <small>lectura</small>}
              </button>
            ))}
          </nav>
          <section className="v52-lab-context"><small>OBJETIVO</small><p>{concept.what}</p><small>EXPERIMENTO</small><p>{concept.experiment}</p></section>
        </aside>

        <div className="v52-code-column">
          <div className="v52-tabs">
            {files.map((file) => <button type="button" key={file.name} className={activeFile === file.name ? "active" : ""} onClick={() => openFile(file.name)}><FileCode2 />{file.name}{file.readOnly && <span>●</span>}</button>)}
          </div>
          <div className="v52-breadcrumb"><span>campus</span><ChevronRight /><span>{levelCode}</span><ChevronRight /><b>{activeFile}</b></div>

          <div className="v52-editor-host-wrap">
            {mobileMode ? (
              <div className="v52-mobile-editor">
                <div className="v52-mobile-lines" aria-hidden="true">{mobileCode.split("\n").map((_, index) => <span key={index}>{index + 1}</span>)}</div>
                <textarea
                  value={activeFile === mainFile ? mobileCode : activeVirtualFile.content}
                  readOnly={activeFile !== mainFile || Boolean(activeVirtualFile.readOnly)}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    if (activeFile !== mainFile) return
                    setMobileCode(event.target.value)
                    setFileContent(mainFile, event.target.value)
                  }}
                  onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
                    if (event.ctrlKey && event.key === "Enter") {
                      event.preventDefault()
                      void executeMain()
                    }
                  }}
                  spellCheck={false}
                  aria-label={`Editor ${activeFile}`}
                />
              </div>
            ) : <div className="v52-monaco-host" ref={editorHostRef} />}
          </div>

          <section className="v52-prediction">
            <label htmlFor={`v52-prediction-${concept.id}`}>ANTES DE EJECUTAR · ESCRIBE TU PREDICCIÓN</label>
            <textarea id={`v52-prediction-${concept.id}`} value={prediction} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setPrediction(event.target.value)} placeholder="¿Qué ocurrirá? ¿Qué valor cambiará? ¿Qué salida esperas y por qué?" />
          </section>

          <div className="v52-panel-tabs">
            <button type="button" className={panel === "terminal" ? "active" : ""} onClick={() => setPanel("terminal")}><Terminal />TERMINAL</button>
            <button type="button" className={panel === "problems" ? "active" : ""} onClick={() => setPanel("problems")}><AlertTriangle />PROBLEMAS <span>{allProblems.length}</span></button>
            {concept.language === "web" && <button type="button" className={panel === "preview" ? "active" : ""} onClick={() => setPanel("preview")}><Play />PREVIEW</button>}
          </div>

          <div className="v52-bottom-panel">
            <div className={panel === "terminal" ? "v52-terminal-host active" : "v52-terminal-host"} ref={terminalHostRef} />
            {panel === "problems" && <div className="v52-problems-panel">
              {allProblems.length === 0 ? <div className="empty"><CheckCircle2 /><b>Sin problemas registrados</b><p>Ejecuta o edita el archivo para actualizar el diagnóstico.</p></div> : allProblems.map((problem, index) => <button type="button" key={`${problem.message}-${index}`} onClick={() => problem.line > 0 && focusLine(problem.line)}><AlertTriangle /><div><b>{problem.severity === "error" ? "Error" : "Aviso"}{problem.line > 0 ? ` · línea ${problem.line}` : ""}</b><p>{problem.message}</p></div></button>)}
            </div>}
            {panel === "preview" && concept.language === "web" && <iframe className="v52-web-preview" title="Vista previa del laboratorio web" sandbox="allow-scripts" srcDoc={webPreview} />}
          </div>

          <footer className="v52-statusbar">
            <span>campus-lab</span><span>{allProblems.length ? `${allProblems.length} problema(s)` : "0 problemas"}</span><span>{mobileMode ? "Editor compacto" : "Monaco Editor"}</span><span>{activeVirtualFile.language}</span><span>Ln {cursor.line}, Col {cursor.column}</span>
          </footer>
        </div>
      </div>

      <div className={`v52-studio-diagnostic ${hasError ? "error" : expectedMatches ? "ok" : ""}`}>
        {hasError ? <><AlertTriangle /><div><b>La ejecución encontró un problema.</b><p>Abre PROBLEMAS, localiza la primera causa observable y modifica una sola cosa.</p></div></> : expectedMatches ? <><CheckCircle2 /><div><b>El resultado coincide con la referencia.</b><p>Antes de continuar, explica por qué ocurrió y qué cambio produciría otra entrada.</p></div></> : <><TestTube2 /><div><b>Resultado de referencia</b><p>{concept.expected || "Este concepto se comprueba con una traza o explicación razonada."}</p></div></>}
      </div>
    </section>
  )
})

export default CampusCodeStudioV52
