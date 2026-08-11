import { useEffect, useRef, useState, type CSSProperties } from "react";
import { mediaAssets } from "./media-assets";
import Icon from "./Icon";

const SLIDE_MS = 7000;

export default function MediaShowcase() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .22 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const id = window.setInterval(() => setIndex(value => (value + 1) % mediaAssets.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [playing, visible]);

  const active = mediaAssets[index];
  const go = (direction: number) => setIndex(value => (value + direction + mediaAssets.length) % mediaAssets.length);

  return <section ref={rootRef} className="media-showcase" aria-label="Galería visual real del campus">
    <div className="media-stage">
      {mediaAssets.map((asset, assetIndex) => <figure key={asset.id} className={assetIndex === index ? "active" : ""}>
        <img src={asset.image} alt={asset.title} loading={assetIndex === 0 ? "eager" : "lazy"}/>
        <div className="media-vignette" />
      </figure>)}
      <div className="media-copy" key={active.id} style={{"--media-accent":active.accent} as CSSProperties}>
        <span>{active.kicker}</span>
        <h2>{active.title}</h2>
        <p>{active.description}</p>
        <div className="media-actions">
          <button type="button" onClick={() => go(-1)} aria-label="Anterior">←</button>
          <button type="button" onClick={() => setPlaying(value => !value)}><Icon name={playing ? "pause" : "play"}/>{playing ? "Pausar" : "Reproducir"}</button>
          <button type="button" onClick={() => go(1)} aria-label="Siguiente">→</button>
        </div>
      </div>
      <div className="media-rail">
        {mediaAssets.map((asset, assetIndex) => <button type="button" key={asset.id} className={assetIndex === index ? "active" : ""} onClick={() => setIndex(assetIndex)}>
          <span>{String(assetIndex + 1).padStart(2,"0")}</span><b>{asset.kicker.split(" · ")[0]}</b>
        </button>)}
      </div>
      <a className="media-credit" href={active.sourcePage} target="_blank" rel="noreferrer">Foto real · {active.credit} · {active.license} ↗</a>
    </div>
  </section>;
}
