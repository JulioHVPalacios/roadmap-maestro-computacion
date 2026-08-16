import React, { useEffect, useRef, useState } from "react"
import { ArrowUp, Mic, MicOff, Plus, Sparkles, X } from "lucide-react"
import "./radiant-prompt-input.css"

export interface RadiantPromptInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onMicResult?: (transcription: string) => void
  onAttachClick?: () => void
  className?: string
  disabled?: boolean
  autoFocus?: boolean
  suggestions?: string[]
}

// Interfaz para SpeechRecognition de navegadores modernos
interface IWindowSpeech extends Window {
  SpeechRecognition?: any
  webkitSpeechRecognition?: any
}

export function RadiantPromptInput({
  placeholder = "Ej.: sistemas operativos, inteligencia artificial, algoritmos...",
  value: propValue,
  onChange: propOnChange,
  onSubmit,
  onMicResult,
  onAttachClick,
  className = "",
  disabled = false,
  autoFocus = false,
  suggestions = [
    "Sistemas Operativos",
    "Inteligencia Artificial",
    "Estructuras de Datos",
    "Ciberseguridad",
    "Redes & Protocolos",
    "Compiladores",
  ],
}: RadiantPromptInputProps) {
  const [internalValue, setInternalValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isControlled = propValue !== undefined
  const value = isControlled ? propValue : internalValue

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as unknown as IWindowSpeech
      const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition
      if (SpeechRec) {
        setSpeechSupported(true)
        try {
          const rec = new SpeechRec()
          rec.continuous = false
          rec.interimResults = false
          rec.lang = "es-ES"

          rec.onresult = (event: any) => {
            const transcript = event.results?.[0]?.[0]?.transcript?.trim()
            if (transcript) {
              if (!isControlled) setInternalValue(transcript)
              propOnChange?.(transcript)
              onMicResult?.(transcript)
            }
            setIsListening(false)
          }

          rec.onerror = () => {
            setIsListening(false)
          }

          rec.onend = () => {
            setIsListening(false)
          }

          recognitionRef.current = rec
        } catch {
          setSpeechSupported(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch {
          // ignore
        }
      }
    }
  }, [isControlled, onMicResult, propOnChange])

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    propOnChange?.(e.target.value)
  }

  const handleSubmit = () => {
    if (value && !disabled) {
      onSubmit?.(value)
      setShowSuggestions(false)
      if (!isControlled) setInternalValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const toggleMic = () => {
    if (!speechSupported || !recognitionRef.current || disabled) return

    if (isListening) {
      try {
        recognitionRef.current.stop()
      } catch {
        // ignore
      }
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch {
        setIsListening(false)
      }
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    if (!isControlled) setInternalValue(suggestion)
    propOnChange?.(suggestion)
    setShowSuggestions(false)
    onSubmit?.(suggestion)
  }

  const handleClear = () => {
    if (!isControlled) setInternalValue("")
    propOnChange?.("")
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={`radiant-prompt-root ${className}`}>
      <div className="radiant-input-wrapper">
        {/* Borde animado por gradiente cónico */}
        <div className="radiant-input-border" />

        {/* Contenido interior de la barra de consulta */}
        <div className="radiant-input-inner">
          {/* Botón de acciones rápidas (+) */}
          <button
            type="button"
            onClick={() => {
              if (onAttachClick) {
                onAttachClick()
              } else {
                setShowSuggestions((prev) => !prev)
              }
            }}
            className={`radiant-btn-action ${showSuggestions ? "active" : ""}`}
            title="Temas sugeridos y filtros rápidos"
            aria-label="Temas y filtros"
            aria-expanded={showSuggestions}
          >
            <Plus size={19} strokeWidth={2.2} />
          </button>

          {/* Icono de destello o búsqueda */}
          <div className="radiant-sparkle-icon" aria-hidden="true">
            <Sparkles size={16} strokeWidth={2} />
          </div>

          {/* Campo de entrada de texto */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (!value && suggestions.length > 0) {
                // opcionalmente mostrar sugerencias
              }
            }}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            className="radiant-text-input"
            aria-label="Buscar en Campus Maestro"
          />

          {/* Botón de limpiar si hay texto */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="radiant-btn-clear"
              title="Borrar texto"
              aria-label="Borrar texto"
            >
              <X size={15} strokeWidth={2.4} />
            </button>
          )}

          {/* Acciones de la derecha: Micrófono y Enviar */}
          <div className="radiant-right-actions">
            {speechSupported && (
              <button
                type="button"
                onClick={toggleMic}
                disabled={disabled}
                className={`radiant-btn-mic ${isListening ? "listening" : ""}`}
                title={isListening ? "Escuchando... Haz clic para detener" : "Buscar por voz (micrófono)"}
                aria-label={isListening ? "Detener grabación de voz" : "Activar búsqueda por voz"}
              >
                {isListening ? (
                  <>
                    <span className="radiant-mic-pulse" aria-hidden="true" />
                    <MicOff size={18} strokeWidth={2.2} />
                  </>
                ) : (
                  <Mic size={18} strokeWidth={2} />
                )}
              </button>
            )}

            {/* Botón de Enviar / Buscar */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!value || disabled}
              className={`radiant-btn-submit ${value ? "ready" : "idle"}`}
              title="Buscar en Campus Maestro"
              aria-label="Enviar consulta"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Menú flotante de temas sugeridos */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="radiant-suggestions-dropdown" role="listbox">
          <div className="radiant-suggestions-header">
            <span>TEMAS SUGERIDOS</span>
            <small>Haz clic para explorar</small>
          </div>
          <div className="radiant-suggestions-grid">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                className="radiant-suggestion-item"
                onClick={() => handleSelectSuggestion(item)}
              >
                <Sparkles size={13} strokeWidth={1.8} />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RadiantPromptInput
