import { useEffect, useRef, useState } from "react";

const chapters = [
  { code:"01", title:"Fundamentos", text:"Matemática, lógica, programación, algoritmos y arquitectura construyen la base que no envejece con las herramientas." },
  { code:"02", title:"Sistemas", text:"Sistemas operativos, redes, bases de datos, compiladores y sistemas distribuidos conectan teoría con infraestructura real." },
  { code:"03", title:"Ingeniería", text:"Software, web, móvil, cloud, DevOps, SRE, producto, calidad y gestión convierten conocimiento en sistemas mantenibles." },
  { code:"04", title:"Datos e IA", text:"Analítica, ingeniería de datos, machine learning, deep learning, agentes y sistemas de IA amplían la capacidad de resolver problemas." },
  { code:"05", title:"Frontera", text:"Embebidos, robótica, telecom, HPC, gráficos, cuántica, bioinformática e investigación cierran el recorrido hacia la frontera." },
];
const nodes=["Matemática","Algoritmos","Sistemas","Redes","Software","Datos","IA","Seguridad","Hardware","Robótica","HPC","Frontera"];
const DURATION=22000;

export default function CinematicMap(){
  const root=useRef<HTMLElement|null>(null);const universe=useRef<HTMLDivElement|null>(null);const nodeRefs=useRef<(HTMLSpanElement|null)[]>([]);const track=useRef<HTMLElement|null>(null);const caption=useRef<HTMLSpanElement|null>(null);
  const elapsed=useRef(0);const last=useRef(0);const raf=useRef(0);const visible=useRef(true);const playingRef=useRef(true);const manualRot=useRef(0);const zoom=useRef(1);const drag=useRef<{x:number;rot:number}|null>(null);const lastChapter=useRef(-1);const [playing,setPlaying]=useState(true);const [chapterIndex,setChapterIndex]=useState(0);const reduced=useRef(false);
  useEffect(()=>{playingRef.current=playing},[playing]);
  useEffect(()=>{
    const media=matchMedia("(prefers-reduced-motion: reduce)");const set=()=>{reduced.current=media.matches};set();media.addEventListener?.("change",set);
    const node=root.current;if(!node)return;const io=new IntersectionObserver(([e])=>{visible.current=e.isIntersecting},{threshold:.04});io.observe(node);
    const tick=(now:number)=>{
      raf.current=requestAnimationFrame(tick);if(!visible.current){last.current=now;return}if(!last.current)last.current=now;const dt=Math.min(40,now-last.current);last.current=now;if(playingRef.current&&!reduced.current)elapsed.current=(elapsed.current+dt)%DURATION;
      const p=elapsed.current/DURATION;const ci=Math.min(chapters.length-1,Math.floor(p*chapters.length));if(ci!==lastChapter.current){lastChapter.current=ci;setChapterIndex(ci)}
      if(track.current)track.current.style.transform=`scaleX(${p})`;if(caption.current)caption.current.textContent=`${Math.round(p*100)}%`;
      const base=p*Math.PI*4.4+manualRot.current;
      nodeRefs.current.forEach((n,i)=>{if(!n)return;const angle=i/nodes.length*Math.PI*2+base;const ring=i%3;const radius=(150+ring*80+Math.sin(p*Math.PI*2+i)*16)*zoom.current;const x=Math.cos(angle)*radius;const y=Math.sin(angle)*radius*.72;const active=((i+ci*2)%nodes.length)<7;n.classList.toggle("active",active);n.style.transform=`translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${.92+(p*chapters.length-ci)*.03})`});
      if(universe.current)universe.current.style.setProperty("--cinema-zoom",String(zoom.current));
    };
    raf.current=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(raf.current);io.disconnect();media.removeEventListener?.("change",set)};
  },[]);
  const seek=(i:number)=>{elapsed.current=(i/chapters.length+.002)*DURATION;setChapterIndex(i);lastChapter.current=i};
  const chapter=chapters[chapterIndex];
  return <section ref={root} className="cinematic-map autoplay-cinema" aria-label="Película interactiva del mapa del conocimiento">
    <div className="cinematic-sticky"><div className="cinematic-grid"/><div className="cinematic-glow g1"/><div className="cinematic-glow g2"/>
      <div className="cinematic-copy" key={chapter.code}><span className="eyebrow">MAPA VIVO DEL CONOCIMIENTO · AUTOPLAY + CONTROL MANUAL</span><div className="chapter-code">{chapter.code}</div><h2>{chapter.title}<br/><em>en movimiento.</em></h2><p>{chapter.text}</p><div className="chapter-track"><i ref={track}/></div><div className="chapter-dots">{chapters.map((item,i)=><button type="button" onClick={()=>seek(i)} key={item.code} className={i===chapterIndex?"active":i<chapterIndex?"done":""}>{item.code}</button>)}</div><div className="cinematic-controls"><button type="button" onClick={()=>setPlaying(v=>!v)}>{playing?"Pausar":"Reproducir"}</button><span>22 s · ciclo automático · el mapa también se puede manipular</span></div></div>
      <div ref={universe} className="knowledge-universe" onPointerDown={e=>{drag.current={x:e.clientX,rot:manualRot.current};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(drag.current)manualRot.current=drag.current.rot+(e.clientX-drag.current.x)*.008}} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onWheel={e=>{e.preventDefault();zoom.current=Math.max(.78,Math.min(1.45,zoom.current+(e.deltaY<0?.06:-.06)))}} onDoubleClick={()=>{manualRot.current=0;zoom.current=1}}>
        <div className="universe-halo h1"/><div className="universe-halo h2"/><div className="universe-halo h3"/><div className="universe-core"><span>∞</span><b>COMPUTACIÓN</b><small>S0 → S19 · T01 → T12</small></div>{nodes.map((n,i)=><span ref={el=>{nodeRefs.current[i]=el}} key={n} className="universe-node">{n}</span>)}<small className="universe-hint">Arrastra · zoom con rueda · doble clic = reset</small>
      </div>
      <div className="cinematic-caption"><span ref={caption}>0%</span><small>AUTOPLAY</small></div>
    </div>
  </section>;
}
