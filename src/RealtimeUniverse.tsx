import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const labels = [
  "Matemática","Algoritmos","Arquitectura","Sistemas","Redes","Software","Datos","IA",
  "Seguridad","Cloud","Robótica","HPC","Gráficos","IoT","Compiladores","Cuántica","Bioinformática","Investigación"
];

type Point = { label: string; theta: number; phi: number; ring: number };
const points: Point[] = labels.map((label, i) => ({
  label,
  theta: i / labels.length * Math.PI * 2,
  phi: ((i * 7) % labels.length) / labels.length * Math.PI - Math.PI / 2,
  ring: i % 3,
}));

export default function RealtimeUniverse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const visibleRef = useRef(true);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);
  const yaw = useRef(0.3);
  const pitch = useRef(-0.08);
  const zoom = useRef(1);
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);

  useEffect(() => { playingRef.current = playing; }, [playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const quality = document.documentElement.dataset.quality || "medium";
    const dprCap = quality === "ultra" ? 2 : quality === "high" ? 1.6 : quality === "medium" ? 1.25 : 1;
    let width = 1, height = 1, dpr = 1, last = performance.now();

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      dpr = Math.min(devicePixelRatio || 1, dprCap);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting; }, { threshold: .05 });
    io.observe(wrap);

    const project = (p: Point, time: number) => {
      const r = (118 + p.ring * 58) * zoom.current;
      let x = Math.cos(p.theta + time * .00012) * Math.cos(p.phi) * r;
      let z = Math.sin(p.theta + time * .00012) * Math.cos(p.phi) * r;
      let y = Math.sin(p.phi) * r * .78;
      const cy = Math.cos(yaw.current), sy = Math.sin(yaw.current);
      const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
      const cp = Math.cos(pitch.current), sp = Math.sin(pitch.current);
      const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      const perspective = 520 / (520 + z2);
      return { x: width / 2 + x1 * perspective, y: height / 2 + y1 * perspective, z: z2, s: perspective };
    };

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current) { last = now; return; }
      const dt = Math.min(32, now - last); last = now;
      if (playingRef.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) yaw.current += dt * .000035;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height / 2;
      const glow = ctx.createRadialGradient(cx, cy, 4, cx, cy, Math.min(width, height) * .48);
      glow.addColorStop(0, "rgba(72,110,255,.22)"); glow.addColorStop(.45, "rgba(85,65,210,.09)"); glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow; ctx.fillRect(0,0,width,height);

      ctx.strokeStyle = "rgba(115,145,220,.12)"; ctx.lineWidth = 1;
      for (let r = 1; r <= 4; r++) { ctx.beginPath(); ctx.ellipse(cx, cy, 75*r*zoom.current, 47*r*zoom.current, 0, 0, Math.PI*2); ctx.stroke(); }

      const projected = points.map(p => ({ p, ...project(p, now) })).sort((a,b)=>a.z-b.z);
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        const b = projected[(i + 5) % projected.length];
        if (Math.abs(a.z - b.z) < 220) {
          ctx.strokeStyle = `rgba(82,132,255,${.055 * Math.min(a.s,b.s)})`;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }

      for (const item of projected) {
        const radius = Math.max(2.5, 5.5 * item.s);
        ctx.fillStyle = item.z > 0 ? "rgba(91,139,255,.95)" : "rgba(102,125,188,.45)";
        ctx.beginPath(); ctx.arc(item.x,item.y,radius,0,Math.PI*2); ctx.fill();
        if (item.s > .72 && quality !== "lite") {
          ctx.font = `${Math.max(9, 10.5*item.s)}px Inter, system-ui, sans-serif`;
          ctx.fillStyle = item.z > 0 ? "rgba(240,246,255,.9)" : "rgba(180,195,225,.6)";
          ctx.fillText(item.p.label, item.x + 9, item.y + 4);
        }
      }

      ctx.fillStyle = "rgba(7,18,44,.94)"; ctx.strokeStyle = "rgba(98,143,255,.62)"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(cx,cy,52,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.textAlign = "center"; ctx.fillStyle = "#f6f8ff"; ctx.font = "700 30px system-ui"; ctx.fillText("∞",cx,cy+5);
      ctx.font = "800 8px ui-monospace,monospace"; ctx.fillStyle = "rgba(210,224,255,.8)"; ctx.fillText("COMPUTACIÓN",cx,cy+24); ctx.textAlign = "start";
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); io.disconnect(); };
  }, []);

  const reset = () => { yaw.current = .3; pitch.current = -.08; zoom.current = 1; };
  const onDown = (e: React.PointerEvent) => { drag.current = { x:e.clientX,y:e.clientY,yaw:yaw.current,pitch:pitch.current }; e.currentTarget.setPointerCapture(e.pointerId); };
  const onMove = (e: React.PointerEvent) => { if (!drag.current) return; yaw.current = drag.current.yaw + (e.clientX-drag.current.x)*.006; pitch.current = Math.max(-1,Math.min(1,drag.current.pitch + (e.clientY-drag.current.y)*.004)); };
  const onUp = () => { drag.current = null; };
  const onWheel = (e: React.WheelEvent) => { e.preventDefault(); zoom.current = Math.max(.72, Math.min(1.65, zoom.current + (e.deltaY < 0 ? .08 : -.08))); };

  return <div ref={wrapRef} className="realtime-universe" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onWheel={onWheel} onDoubleClick={reset}>
    <canvas ref={canvasRef}/>
    <div className="universe-ui"><span>ESCENA EN TIEMPO REAL</span><div><button onClick={(e)=>{e.stopPropagation();setPlaying(v=>!v)}}><Icon name={playing?"pause":"play"}/>{playing?"Pausar":"Reproducir"}</button><button onClick={(e)=>{e.stopPropagation();reset()}}><Icon name="rotate"/>Restablecer</button></div><small>Arrastra para rotar · rueda para zoom · doble clic para reset</small></div>
  </div>;
}
