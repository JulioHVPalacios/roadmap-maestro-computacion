import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";

type Mode="red"|"cpu"|"datos"|"ia";
const modes:{id:Mode;title:string;desc:string;labels:string[]}[]=[
  {id:"red",title:"Paquete en una red",desc:"Observa cómo una solicitud atraviesa cliente, switch, router, servicio y base de datos.",labels:["Cliente","Switch","Router","API","DB","Cache"]},
  {id:"cpu",title:"Memoria y CPU",desc:"Sigue instrucciones y datos entre CPU, caché, RAM, almacenamiento y kernel.",labels:["CPU","L1/L2","RAM","Kernel","SSD","I/O"]},
  {id:"datos",title:"Pipeline de datos",desc:"Ingesta, cola, transformación, almacenamiento, consulta y visualización.",labels:["Fuente","Queue","ETL","Lake","SQL","BI"]},
  {id:"ia",title:"Flujo de IA",desc:"Datos, embeddings, modelo, herramientas, evaluación y respuesta.",labels:["Datos","Embed","Modelo","Tools","Eval","Salida"]},
];
const base=[[15,50],[32,24],[50,50],[68,24],[84,50],[50,80]];

export default function EducationalViz({compact=false}:{compact?:boolean}){
  const [mode,setMode]=useState<Mode>("red");const [playing,setPlaying]=useState(true);const [t,setT]=useState(0);const [speed,setSpeed]=useState(1);const raf=useRef<number|null>(null);const last=useRef(0);
  const [dragged,setDragged]=useState<Record<number,{x:number;y:number}>>({});const drag=useRef<{i:number}|null>(null);
  useEffect(()=>{if(!playing)return;const loop=(now:number)=>{if(!last.current)last.current=now;const dt=Math.min(50,now-last.current);last.current=now;setT(v=>(v+dt*.00012*speed)%1);raf.current=requestAnimationFrame(loop)};raf.current=requestAnimationFrame(loop);return()=>{if(raf.current)cancelAnimationFrame(raf.current);last.current=0}},[playing,speed]);
  const active=modes.find(m=>m.id===mode)!;const points=useMemo(()=>base.map(([x,y],i)=>dragged[i]??{x,y}),[dragged]);
  const packet=t*(points.length-1);const a=Math.floor(packet);const b=Math.min(points.length-1,a+1);const k=packet-a;const px=points[a].x+(points[b].x-points[a].x)*k;const py=points[a].y+(points[b].y-points[a].y)*k;
  const onMove=(e:React.PointerEvent<SVGSVGElement>)=>{if(!drag.current)return;const r=e.currentTarget.getBoundingClientRect();setDragged(d=>({...d,[drag.current!.i]:{x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100}}))};
  return <div className={`edu-viz ${compact?"compact":""}`}>
    {!compact&&<div className="studio-head"><div><span>SIMULACIÓN EDUCATIVA</span><h3>{active.title}</h3><p>{active.desc} Los nodos son manipulables y la animación puede pausarse o acelerarse.</p></div></div>}
    <div className="viz-tabs">{modes.map(m=><button key={m.id} className={mode===m.id?"active":""} onClick={()=>{setMode(m.id);setT(0);setDragged({})}}>{m.title}</button>)}</div>
    <div className="viz-canvas"><svg viewBox="0 0 100 100" preserveAspectRatio="none" onPointerMove={onMove} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null}>
      <defs><linearGradient id="flow" x1="0" x2="1"><stop stopColor="#4f7cff"/><stop offset=".5" stopColor="#b06cff"/><stop offset="1" stopColor="#24d5e8"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {points.slice(0,-1).map((p,i)=><line key={i} x1={p.x} y1={p.y} x2={points[i+1].x} y2={points[i+1].y} className="viz-link"/>)}
      {points.map((p,i)=><g key={i} transform={`translate(${p.x} ${p.y})`} className="viz-node" onPointerDown={e=>{drag.current={i};(e.currentTarget as SVGGElement).setPointerCapture(e.pointerId)}}><circle r="5"/><text y=".6">{active.labels[i]}</text></g>)}
      <circle cx={px} cy={py} r="2.1" className="viz-packet" filter="url(#glow)"/>
    </svg><div className="viz-grid"/></div>
    <div className="viz-controls"><button onClick={()=>setPlaying(v=>!v)}><Icon name={playing?"pause":"play"}/>{playing?"Pausar":"Reproducir"}</button><label>Velocidad <input type="range" min=".4" max="3" step=".2" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/><b>{speed.toFixed(1)}×</b></label><button onClick={()=>{setDragged({});setT(0)}}><Icon name="rotate"/>Restablecer</button></div>
  </div>;
}
