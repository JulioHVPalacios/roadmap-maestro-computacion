import { useEffect } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Howl, Howler } from "howler"
import "../visual-v24/visual-v24.css"
import "./visual-v25.css"

gsap.registerPlugin(ScrollTrigger)

const interactiveSelector = [
  ".v15-method-card", ".v15-universe-card", ".v15-stage-card", ".v15-track-tabs button",
  ".v15-standard-grid a", ".v15-ecosystem-grid article", ".v15-news-slide", ".v15-profile-card",
  ".v15-white-button", ".v15-lime-button", ".v15-black-button",
].join(",")

const sectionSelectors = [
  ["inicio", "inicio"], ["campus", "metodo"], ["roadmap", "roadmap"], ["maestrias", "maestrias"],
  ["atlas", "atlas"], ["noticias", "radar"], ["perfil", "perfil"],
] as const

function useCampusAudio() {
  useEffect(() => {
    Howler.autoUnlock = true
    Howler.autoSuspend = false
    const base = import.meta.env.BASE_URL
    let sound: Howl | null = null
    let destroyed = false

    const start = () => {
      if (destroyed) return
      if (!sound) {
        sound = new Howl({
          src: [`${base}audio/campus-ambient-v25.webm`, `${base}audio/campus-ambient-v25.mp3`],
          autoplay: true,
          loop: true,
          volume: 0.34,
          html5: true,
          preload: true,
          onplayerror: () => sound?.once("unlock", () => sound?.play()),
        })
      }
      if (!sound.playing()) sound.play()
    }

    start()
    const unlock = () => start()
    const onVisibility = () => {
      if (document.hidden) sound?.fade(0.34, 0.08, 280)
      else { sound?.fade(0.08, 0.34, 420); start() }
    }
    window.addEventListener("pointerdown", unlock, { passive: true })
    window.addEventListener("touchend", unlock, { passive: true })
    window.addEventListener("keydown", unlock)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      destroyed = true
      window.removeEventListener("pointerdown", unlock)
      window.removeEventListener("touchend", unlock)
      window.removeEventListener("keydown", unlock)
      document.removeEventListener("visibilitychange", onVisibility)
      sound?.unload()
    }
  }, [])
}

function useSmoothExperience() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduce || coarse) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.92, smoothWheel: true })
    lenis.on("scroll", ScrollTrigger.update)
    return () => lenis.destroy()
  }, [])
}

function useEditorialMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const mm = gsap.matchMedia()
    mm.add("(min-width: 821px)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".v15-center-head, .v15-section-head").forEach((el) => {
          gsap.fromTo(el, { y: 28, opacity: 0.72 }, { y: 0, opacity: 1, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } })
        })
        gsap.utils.toArray<HTMLElement>(".v15-universe-card, .v15-stage-card, .v15-standard-grid a, .v15-ecosystem-grid article").forEach((el, i) => {
          gsap.fromTo(el, { y: 18, opacity: 0.86 }, { y: 0, opacity: 1, duration: 0.58, delay: (i % 4) * 0.035, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 94%", once: true } })
        })
        gsap.utils.toArray<HTMLImageElement>(".v15-universe-card > img, .v15-news-slide-image").forEach((img) => {
          gsap.fromTo(img, { yPercent: -2 }, { yPercent: 2, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 0.6 } })
        })
      })
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])
}

export default function VisualEngineV25() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.2 })
  useCampusAudio()
  useSmoothExperience()
  useEditorialMotion()

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionSelectors.forEach(([id, label]) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) document.documentElement.dataset.v25Section = label
      }, { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 })
      observer.observe(el)
      observers.push(observer)
    })
    let raf = 0
    const pointer = (event: PointerEvent) => {
      if (window.innerWidth < 821) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--v25-page-x", `${event.clientX}px`)
        document.documentElement.style.setProperty("--v25-page-y", `${event.clientY}px`)
      })
    }
    window.addEventListener("pointermove", pointer, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", pointer)
      observers.forEach(observer => observer.disconnect())
      delete document.documentElement.dataset.v25Section
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.add("v25-enabled")
    const targets = Array.from(document.querySelectorAll<HTMLElement>(interactiveSelector))
    const cleanups: Array<() => void> = []
    targets.forEach((element) => {
      element.classList.add("v25-surface")
      let raf = 0
      const move = (event: PointerEvent) => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const r = element.getBoundingClientRect()
          element.style.setProperty("--v25-x", `${((event.clientX-r.left)/Math.max(1,r.width))*100}%`)
          element.style.setProperty("--v25-y", `${((event.clientY-r.top)/Math.max(1,r.height))*100}%`)
        })
      }
      element.addEventListener("pointermove", move, { passive: true })
      cleanups.push(() => { cancelAnimationFrame(raf); element.removeEventListener("pointermove", move) })
    })
    return () => { document.documentElement.classList.remove("v25-enabled"); cleanups.forEach(fn => fn()) }
  }, [])

  return <><motion.div className="v24-scroll-progress" style={{ scaleX: progress }} aria-hidden="true"/><div className="v25-atmosphere" aria-hidden="true"><i/><i/><i/></div></>
}
