import { useEffect, useMemo, useRef, useState } from "react"
import Graph from "graphology"
import Sigma from "sigma"
import { Search, RotateCcw, Network, MousePointer2 } from "lucide-react"
import { careerCatalogV43 } from "../v43/career-catalog-v43"
import { facultiesV43 } from "../v43/curriculum-v43"

function normalize(value:string){return value.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"")}

function scoreRole(role:string){
  const text=normalize(role)
  return facultiesV43.map(f=>({faculty:f,score:f.keywords.reduce((sum,k)=>sum+(text.includes(normalize(k))?Math.max(2,normalize(k).length/4):0),0)})).sort((a,b)=>b.score-a.score)
}
function classify(role:string){const ranked=scoreRole(role);return ranked[0]?.score>0?ranked.slice(0,3).filter(x=>x.score>0):[{faculty:facultiesV43.find(f=>f.id==="enterprise")??facultiesV43[0],score:1}]}
function hash(text:string){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
const COLORS=["#bbf22f","#6fc6f4","#ff85c8","#56d5c2","#e7bb70","#ff9b5f","#a996ef","#52b57c","#ff6d6d","#78a5ff","#d99c63","#2fbcaa","#ef7ec2","#8bd66a","#d6b15b","#a58bed","#5cae91","#f08080"]

export default function KnowledgeUniverseV44(){
  const ref=useRef<HTMLDivElement|null>(null)
  const rendererRef=useRef<Sigma|null>(null)
  const graphRef=useRef<Graph|null>(null)
  const [query,setQuery]=useState("")
  const [selected,setSelected]=useState("")
  const [mobile,setMobile]=useState(false)
  const results=useMemo(()=>{const q=normalize(query.trim());return q?careerCatalogV43.filter(r=>normalize(r).includes(q)).slice(0,10):[]},[query])
  const mapped=useMemo(()=>selected?classify(selected):[],[selected])

  useEffect(()=>{
    const mq=window.matchMedia("(max-width: 820px)")
    const sync=()=>setMobile(mq.matches)
    sync();mq.addEventListener?.("change",sync);return()=>mq.removeEventListener?.("change",sync)
  },[])

  useEffect(()=>{
    if(mobile||!ref.current)return
    const graph=new Graph({multi:false,type:"undirected"})
    const cols=6
    facultiesV43.forEach((f,i)=>{
      const col=i%cols,row=Math.floor(i/cols),x=col*36,y=row*38
      graph.addNode(`faculty:${f.id}`,{x,y,size:13,label:`${f.code} · ${f.title}`,color:COLORS[i%COLORS.length],kind:"faculty",facultyId:f.id})
    })
    const counters=new Map<string,number>()
    careerCatalogV43.forEach((role,index)=>{
      const top=classify(role)[0].faculty
      const fi=facultiesV43.findIndex(f=>f.id===top.id)
      const col=fi%cols,row=Math.floor(fi/cols),cx=col*36,cy=row*38
      const n=counters.get(top.id)??0;counters.set(top.id,n+1)
      const seed=hash(role), angle=(n*2.3999632297)+(seed%100)/100, radius=5+Math.sqrt(n)*1.15
      const id=`role:${index}`
      graph.addNode(id,{x:cx+Math.cos(angle)*radius,y:cy+Math.sin(angle)*radius,size:2.2,label:role,color:COLORS[fi%COLORS.length],kind:"role",facultyId:top.id})
      graph.addEdge(id,`faculty:${top.id}`,{size:.25,color:"#b5b7b0"})
    })
    const renderer=new Sigma(graph,ref.current,{renderEdgeLabels:false,labelDensity:.07,labelGridCellSize:140,labelRenderedSizeThreshold:9,defaultEdgeColor:"#b5b7b0",zIndex:true})
    renderer.on("clickNode",({node})=>{const a=graph.getNodeAttributes(node) as any;if(a.kind==="role")setSelected(String(a.label)); else if(a.kind==="faculty")setSelected(String(a.label))})
    graphRef.current=graph;rendererRef.current=renderer
    return()=>{renderer.kill();rendererRef.current=null;graphRef.current=null}
  },[mobile])

  function reset(){setQuery("");setSelected("");const camera=rendererRef.current?.getCamera() as any;camera?.animatedReset?.({duration:450})}

  return <div className="v44-universe">
    <header className="v44-universe-head"><div><span>SIGMA.JS + GRAPHOLOGY · WEBGL</span><h3>Universo de {careerCatalogV43.length.toLocaleString("es-PE")} perfiles.</h3><p>Los nombres profesionales no se convierten en carreras duplicadas: orbitan alrededor de 18 facultades de conocimiento. Haz clic, busca, acerca y descubre la ruta académica dominante.</p></div><div className="v44-universe-actions"><button onClick={reset}><RotateCcw/>Reiniciar</button></div></header>
    <div className="v44-universe-search"><Search/><input value={query} onChange={(e:any)=>{setQuery(e.target.value);setSelected("")}} placeholder="Busca cualquier perfil: Kernel Engineer, CISO, GIS, Quantum…"/>{results.length>0&&<div>{results.map(r=><button key={r} onClick={()=>{setSelected(r);setQuery(r)}}>{r}</button>)}</div>}</div>
    {mobile ? <div className="v44-universe-mobile"><div className="v44-mobile-note"><Network/><b>Vista móvil optimizada</b><span>Para conservar swipe vertical y rendimiento, el universo WebGL se sustituye por facultades navegables. El buscador sigue cubriendo los {careerCatalogV43.length.toLocaleString("es-PE")} perfiles.</span></div><div className="v44-mobile-faculties">{facultiesV43.map((f,i)=><article key={f.id} style={{"--tone":COLORS[i%COLORS.length]} as any}><small>{f.code}</small><strong>{f.title}</strong><span>{f.stageRange}</span></article>)}</div></div> : <div className="v44-universe-canvas" ref={ref}/>} 
    <footer className="v44-universe-footer"><span><MousePointer2/>WebGL interactivo: pan · zoom · click</span><span>{facultiesV43.length} hubs · {careerCatalogV43.length} perfiles · {careerCatalogV43.length} enlaces principales</span></footer>
    {selected&&<aside className="v44-universe-selected"><small>PERFIL / HUB SELECCIONADO</small><h4>{selected}</h4>{mapped.length>0&&<><p>Ruta académica recomendada por coincidencia semántica:</p><div>{mapped.map(x=><span key={x.faculty.id}><b>{x.faculty.code}</b>{x.faculty.title}</span>)}</div></>}</aside>}
  </div>
}
