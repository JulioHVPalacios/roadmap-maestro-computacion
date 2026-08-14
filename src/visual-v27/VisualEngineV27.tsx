import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { Howl, Howler } from "howler"
import "../visual-v24/visual-v24.css"
import "../visual-v25/visual-v25.css"
import "./visual-v27.css"


const revealSelector = [
  ".v15-center-head",
  ".v15-section-head",
  ".v15-universe-card",
  ".v15-stage-card",
  ".v15-standard-grid a",
  ".v15-ecosystem-grid article",
  ".v15-news-carousel",
  ".v15-profile-card",
].join(",")

const sectionSelectors = [
  ["inicio", "inicio"], ["campus", "metodo"], ["roadmap", "roadmap"], ["maestrias", "maestrias"],
  ["atlas", "atlas"], ["recursos", "recursos"], ["noticias", "radar"], ["perfil", "perfil"],
] as const

const CAMPUS_MUSIC_VOLUME = 0.15023

function useCampusAudioV27() {
  useEffect(() => {
    Howler.autoUnlock = true
    Howler.autoSuspend = false
    const base = import.meta.env.BASE_URL
    let destroyed = false
    let sound: Howl | null = null
    let playId: number | undefined

    const ensureSound = () => {
      if (sound) return sound
      sound = new Howl({
        src: [`${base}audio/spirit-of-fire.mp3`],
        html5: true,
        loop: true,
        preload: "metadata",
        autoplay: false,
        volume: CAMPUS_MUSIC_VOLUME,
        onplay: () => {
          if (playId !== undefined) sound?.fade(0, CAMPUS_MUSIC_VOLUME, 1500, playId)
        },
      })
      return sound
    }

    const start = () => {
      if (destroyed) return
      const active = ensureSound()
      if (active.playing()) return
      try {
        active.volume(0)
        playId = active.play()
      } catch {
        // El navegador puede exigir una primera interacción. Los listeners de abajo reintentan sin UI.
      }
    }

    const unlock = () => {
      const active = ensureSound()
      if (!active.playing()) start()
      // Si ya está reproduciendo, no reiniciamos fades al hacer clic, arrastrar scrollbars o interactuar.
    }

    // Intento inmediato. Si Chrome lo bloquea, se desbloquea invisiblemente con la primera interacción válida.
    start()
    const opts: AddEventListenerOptions = { passive: true, capture: true }
    window.addEventListener("pointerdown", unlock, opts)
    window.addEventListener("touchstart", unlock, opts)
    window.addEventListener("keydown", unlock, true)

    return () => {
      destroyed = true
      window.removeEventListener("pointerdown", unlock, true)
      window.removeEventListener("touchstart", unlock, true)
      window.removeEventListener("keydown", unlock, true)
      sound?.unload()
      sound = null
    }
  }, [])
}

function useHighRefreshScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobileViewport = window.matchMedia("(max-width: 900px)")

    const tick = (time: number) => lenis?.raf(time * 1000)

    const stopLenis = () => {
      if (!lenis) return
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenis = null
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped")
    }

    const startLenis = () => {
      if (lenis) return
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.145,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        anchors: true,
        allowNestedScroll: true,
        prevent: (node) => Boolean(node.closest?.("[data-lenis-prevent]")),
      })
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const syncScrollEngine = () => {
      const desktopFinePointer =
        !reducedMotion.matches &&
        !mobileViewport.matches &&
        window.innerWidth > 900 &&
        finePointer.matches

      if (desktopFinePointer) startLenis()
      else stopLenis()
    }

    syncScrollEngine()

    const onChange = () => syncScrollEngine()
    finePointer.addEventListener?.("change", onChange)
    reducedMotion.addEventListener?.("change", onChange)
    mobileViewport.addEventListener?.("change", onChange)
    window.addEventListener("resize", onChange, { passive: true })
    window.addEventListener("orientationchange", onChange, { passive: true })

    return () => {
      finePointer.removeEventListener?.("change", onChange)
      reducedMotion.removeEventListener?.("change", onChange)
      mobileViewport.removeEventListener?.("change", onChange)
      window.removeEventListener("resize", onChange)
      window.removeEventListener("orientationchange", onChange)
      stopLenis()
    }
  }, [])
}

function useCompositorReveals() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
    if (reduce || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("v27-visible"))
      return
    }

    targets.forEach((el) => el.classList.add("v27-reveal"))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        ;(entry.target as HTMLElement).classList.add("v27-visible")
        observer.unobserve(entry.target)
      })
    }, { rootMargin: "0px 0px 120px 0px", threshold: 0.035 })

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useSectionTone() {
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionSelectors.forEach(([id, label]) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) document.documentElement.dataset.v27Section = label
      }, { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 })
      observer.observe(el)
      observers.push(observer)
    })
    return () => {
      observers.forEach((observer) => observer.disconnect())
      delete document.documentElement.dataset.v27Section
    }
  }, [])
}

export default function VisualEngineV27() {
  useCampusAudioV27()
  useHighRefreshScroll()
  useCompositorReveals()
  useSectionTone()

  useEffect(() => {
    document.documentElement.classList.add("v27-enabled")
    const supportsTimeline = CSS.supports?.("animation-timeline: scroll()") ?? false
    const bar = document.querySelector<HTMLElement>(".v27-scroll-progress")
    let raf = 0
    const updateFallback = () => {
      if (supportsTimeline || !bar) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        bar.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / max))})`
      })
    }
    if (!supportsTimeline) {
      updateFallback()
      window.addEventListener("scroll", updateFallback, { passive: true })
      window.addEventListener("resize", updateFallback, { passive: true })
    }
    return () => {
      document.documentElement.classList.remove("v27-enabled")
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", updateFallback)
      window.removeEventListener("resize", updateFallback)
    }
  }, [])

  return (
    <>
      <div className="v27-scroll-progress" aria-hidden="true" />
      <div className="v27-atmosphere" aria-hidden="true" />
    </>
  )
}

