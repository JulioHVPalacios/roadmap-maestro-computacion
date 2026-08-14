/**
 * Campus Maestro V15.12
 * Carruseles continuos sin pausa en los extremos.
 *
 * Conserva:
 * - auto-slide
 * - pausa al hover
 * - reanudación tras click/drag
 * - arrastre real con mouse
 * - swipe manual en móvil
 *
 * Cambia:
 * - elimina la espera al llegar al extremo
 * - rebota inmediatamente hacia el lado contrario
 */
export function initPremiumMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
  const cleanups: Array<() => void> = []

  document.querySelectorAll<HTMLElement>(".v15-proof-card").forEach((el) => {
    el.classList.remove("v15-reveal-ready", "v15-is-visible")
    el.style.removeProperty("--v15-reveal-delay")
  })

  if (reduced.matches) return () => {}

  // ---- Reveal editorial seguro ----
  const revealSelector = [
    ".v15-section-head",
    ".v15-center-head",
    ".v15-method-card",
    ".v15-news-carousel",
    ".v15-track-detail",
    ".v15-profile-copy",
    ".v15-profile-card",
  ].join(",")

  const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
  revealTargets.forEach((el, index) => {
    el.classList.add("v15-reveal-ready")
    el.style.setProperty("--v15-reveal-delay", `${Math.min(index % 5, 4) * 55}ms`)
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        ;(entry.target as HTMLElement).classList.add("v15-is-visible")
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: "0px 0px -7% 0px", threshold: 0.06 },
  )

  revealTargets.forEach((el) => observer.observe(el))
  cleanups.push(() => observer.disconnect())

  // Distingue foco de teclado de foco producido por mouse.
  let keyboardMode = false
  const onGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Tab" || event.key.startsWith("Arrow")) keyboardMode = true
  }
  const onGlobalPointerDown = () => {
    keyboardMode = false
  }

  window.addEventListener("keydown", onGlobalKeyDown)
  window.addEventListener("pointerdown", onGlobalPointerDown, true)

  cleanups.push(() => {
    window.removeEventListener("keydown", onGlobalKeyDown)
    window.removeEventListener("pointerdown", onGlobalPointerDown, true)
  })

  const setupGlide = (
    el: HTMLElement,
    {
      speed,
      name,
      clickResumeMs = 700,
    }: { speed: number; name: string; clickResumeMs?: number },
  ) => {
    let raf = 0
    let last = performance.now()
    let direction = 1

    let dragging = false
    let pointerId: number | null = null
    let startX = 0
    let startScrollLeft = 0
    let moved = false
    let suppressNextClick = false
    let manualPauseUntil = 0

    const pauseReasons = new Set<string>()

    el.dataset.v15AutoGlide = name

    const hasOverflow = () => el.scrollWidth > el.clientWidth + 6
    const canMove = () =>
      window.innerWidth >= 900 &&
      !document.hidden &&
      hasOverflow()

    const isPaused = () =>
      dragging ||
      pauseReasons.size > 0 ||
      performance.now() < manualPauseUntil

    const setPausedFlag = () => {
      if (isPaused()) el.dataset.v15Paused = "true"
      else delete el.dataset.v15Paused
    }

    const pause = (reason: string) => {
      pauseReasons.add(reason)
      setPausedFlag()
    }

    const resume = (reason: string, delay = 0) => {
      if (delay) {
        window.setTimeout(() => {
          pauseReasons.delete(reason)
          setPausedFlag()
        }, delay)
      } else {
        pauseReasons.delete(reason)
        setPausedFlag()
      }
    }

    // Pausa únicamente al estar encima de una card.
    const childCleanups: Array<() => void> = []

    Array.from(el.children).forEach((node, index) => {
      const card = node as HTMLElement
      const hoverReason = `hover-${index}`

      const onEnter = () => {
        if (!dragging) pause(hoverReason)
      }
      const onLeave = () => resume(hoverReason, 100)

      card.addEventListener("pointerenter", onEnter)
      card.addEventListener("pointerleave", onLeave)
      card.setAttribute("draggable", "false")

      childCleanups.push(() => {
        card.removeEventListener("pointerenter", onEnter)
        card.removeEventListener("pointerleave", onLeave)
      })
    })

    /*
     * Movimiento continuo tipo "ping-pong":
     * al tocar un extremo refleja el pequeño exceso del frame hacia el
     * otro sentido. Así no existe pausa ni sensación de bloqueo.
     */
    const tick = (now: number) => {
      const dt = Math.min(42, now - last)
      last = now

      if (canMove() && !isPaused()) {
        const max = Math.max(0, el.scrollWidth - el.clientWidth)

        if (max > 0) {
          let next = el.scrollLeft + direction * speed * (dt / 1000)

          if (next >= max) {
            const excess = next - max
            direction = -1
            next = Math.max(0, max - excess)
          } else if (next <= 0) {
            const excess = -next
            direction = 1
            next = Math.min(max, excess)
          }

          el.scrollLeft = next
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const onNativeDragStart = (event: DragEvent) => {
      event.preventDefault()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (window.innerWidth < 900 || event.button !== 0) return

      dragging = true
      pointerId = event.pointerId
      startX = event.clientX
      startScrollLeft = el.scrollLeft
      moved = false
      pause("drag")

      el.classList.add("v15-is-dragging")
      document.documentElement.classList.add("v15-carousel-dragging")

      try {
        el.setPointerCapture(event.pointerId)
      } catch {}
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || pointerId !== event.pointerId) return

      const dx = event.clientX - startX
      if (Math.abs(dx) > 4) moved = true

      if (moved) {
        event.preventDefault()
        el.scrollLeft = startScrollLeft - dx
      }
    }

    const finishDrag = (event?: PointerEvent) => {
      if (!dragging) return

      if (event && pointerId === event.pointerId) {
        try {
          el.releasePointerCapture(event.pointerId)
        } catch {}
      }

      dragging = false
      pointerId = null
      el.classList.remove("v15-is-dragging")
      document.documentElement.classList.remove("v15-carousel-dragging")
      resume("drag")

      if (moved) {
        suppressNextClick = true
        manualPauseUntil = performance.now() + 550
      }

      setPausedFlag()
    }

    const onClickCapture = (event: MouseEvent) => {
      if (suppressNextClick) {
        suppressNextClick = false
        event.preventDefault()
        event.stopPropagation()
        manualPauseUntil = performance.now() + 450
        setPausedFlag()
        return
      }

      manualPauseUntil = performance.now() + clickResumeMs
      setPausedFlag()
    }

    const onFocusIn = () => {
      if (keyboardMode) pause("keyboard-focus")
    }
    const onFocusOut = () => resume("keyboard-focus", 120)

    const onWheel = () => {
      manualPauseUntil = performance.now() + 800
      setPausedFlag()
    }

    const onRowLeave = () => {
      Array.from(pauseReasons)
        .filter((reason) => reason.startsWith("hover-"))
        .forEach((reason) => pauseReasons.delete(reason))
      setPausedFlag()
    }

    const resizeObserver = new ResizeObserver(() => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth)
      if (el.scrollLeft > max) el.scrollLeft = max
    })
    resizeObserver.observe(el)

    el.addEventListener("dragstart", onNativeDragStart)
    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove, { passive: false })
    el.addEventListener("pointerup", finishDrag)
    el.addEventListener("pointercancel", finishDrag)
    el.addEventListener("click", onClickCapture, true)
    el.addEventListener("focusin", onFocusIn)
    el.addEventListener("focusout", onFocusOut)
    el.addEventListener("wheel", onWheel, { passive: true })
    el.addEventListener("pointerleave", onRowLeave)

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      childCleanups.forEach((cleanup) => cleanup())

      delete el.dataset.v15AutoGlide
      delete el.dataset.v15Paused

      el.classList.remove("v15-is-dragging")
      document.documentElement.classList.remove("v15-carousel-dragging")

      el.removeEventListener("dragstart", onNativeDragStart)
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerup", finishDrag)
      el.removeEventListener("pointercancel", finishDrag)
      el.removeEventListener("click", onClickCapture, true)
      el.removeEventListener("focusin", onFocusIn)
      el.removeEventListener("focusout", onFocusOut)
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("pointerleave", onRowLeave)
    }
  }

  const standardRow = document.querySelector<HTMLElement>(
    ".v15-standards .v15-standard-grid, .v15-standard-grid",
  )
  const ecosystemRow = document.querySelector<HTMLElement>(
    ".v15-ecosystem .v15-ecosystem-grid",
  )

  if (standardRow) {
    cleanups.push(
      setupGlide(standardRow, {
        speed: 70,
        name: "auditoria",
        clickResumeMs: 650,
      }),
    )
  }

  if (ecosystemRow) {
    cleanups.push(
      setupGlide(ecosystemRow, {
        speed: 66,
        name: "ecosistema",
        clickResumeMs: 650,
      }),
    )
  }

  return () => cleanups.forEach((cleanup) => cleanup())
}