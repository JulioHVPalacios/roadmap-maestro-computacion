import { useEffect } from "react";

type Quality = "ultra" | "high" | "medium" | "lite";

function autoQuality(): Quality {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 4;
  const mobile = matchMedia("(max-width: 820px)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return "lite";
  if (mobile && (cores <= 4 || memory <= 4)) return "lite";
  if (cores >= 12 && memory >= 8 && !mobile) return "ultra";
  if (cores >= 8 && memory >= 6) return "high";
  return "medium";
}

export default function PerformanceRuntime() {
  useEffect(() => {
    let stored = "";
    try { stored = localStorage.getItem("campus-maestro-quality") || ""; } catch {}
    const quality = (["ultra", "high", "medium", "lite"] as const).includes(stored as Quality)
      ? stored as Quality
      : autoQuality();
    document.documentElement.dataset.quality = quality;

    let scrollRaf = 0;
    const updateScroll = () => {
      scrollRaf = 0;
      const root = document.documentElement;
      const max = Math.max(1, root.scrollHeight - innerHeight);
      root.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, scrollY / max))));
      root.style.setProperty("--page-scroll", String(scrollY));
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(updateScroll);
    };
    updateScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });

    let pointerRaf = 0;
    let px = 0, py = 0;
    const writePointer = () => {
      pointerRaf = 0;
      document.documentElement.style.setProperty("--pointer-x", px.toFixed(3));
      document.documentElement.style.setProperty("--pointer-y", py.toFixed(3));
    };
    const onPointer = (event: PointerEvent) => {
      px = (event.clientX / innerWidth - .5) * 2;
      py = (event.clientY / innerHeight - .5) * 2;
      if (!pointerRaf) pointerRaf = requestAnimationFrame(writePointer);
    };
    addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("pointermove", onPointer);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (pointerRaf) cancelAnimationFrame(pointerRaf);
    };
  }, []);
  return null;
}
