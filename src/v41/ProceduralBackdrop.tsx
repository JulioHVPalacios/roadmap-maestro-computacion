import { useEffect, useRef } from "react"

export default function ProceduralBackdrop({ variant = "green" }: { variant?: "green" | "blue" | "pink" }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    const pointer = { x: 0.5, y: 0.45 }
    const palette = variant === "blue"
      ? ["rgba(115,215,255,.48)", "rgba(216,255,79,.32)", "rgba(255,255,255,.42)"]
      : variant === "pink"
        ? ["rgba(255,88,199,.34)", "rgba(115,215,255,.32)", "rgba(255,255,255,.42)"]
        : ["rgba(8,122,88,.48)", "rgba(216,255,79,.30)", "rgba(115,215,255,.28)"]

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)))
      pointer.y = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      const t = time * 0.00014
      const centers = [
        [0.18 + Math.sin(t) * 0.09, 0.28 + Math.cos(t * 0.7) * 0.08, 0.54],
        [0.75 + Math.cos(t * 0.8) * 0.10, 0.22 + Math.sin(t * 0.6) * 0.09, 0.48],
        [pointer.x, pointer.y, 0.42],
      ] as const

      centers.forEach((center, index) => {
        const x = center[0] * width
        const y = center[1] * height
        const radius = Math.max(width, height) * center[2]
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, palette[index])
        gradient.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })

      ctx.globalAlpha = 0.12
      for (let i = 0; i < 36; i += 1) {
        const x = ((i * 97 + time * 0.012) % (width + 80)) - 40
        const y = (i * 53) % Math.max(1, height)
        ctx.fillStyle = i % 3 === 0 ? "#10110f" : "#ffffff"
        ctx.fillRect(x, y, 1.2, 1.2)
      }
      ctx.globalAlpha = 1
      raf = window.requestAnimationFrame(draw)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    canvas.addEventListener("pointermove", onPointer, { passive: true })
    raf = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      canvas.removeEventListener("pointermove", onPointer)
    }
  }, [variant])

  return <canvas ref={ref} className="v41-procedural-canvas" aria-hidden="true" />
}
