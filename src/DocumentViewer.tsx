import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

type Props={sources?:Array<{label:string;url:string;where:string}>};
type PdfModule = {
  GlobalWorkerOptions:{workerSrc:string};
  getDocument:(src:{data:ArrayBuffer})=>{promise:Promise<any>};
};

const PDFJS="https://cdn.jsdelivr.net/npm/pdfjs-dist@6.1.200/build/pdf.mjs";
const PDFJS_WORKER="https://cdn.jsdelivr.net/npm/pdfjs-dist@6.1.200/build/pdf.worker.mjs";

export default function DocumentViewer({sources=[]}:Props){
  const canvasRef=useRef<HTMLCanvasElement|null>(null);
  const renderTask=useRef<any>(null);
  const local=useRef<string|null>(null);
  const [draft,setDraft]=useState("");
  const [fallbackUrl,setFallbackUrl]=useState("");
  const [pdf,setPdf]=useState<any>(null);
  const [page,setPage]=useState(1);
  const [pages,setPages]=useState(0);
  const [zoom,setZoom]=useState(1.15);
  const [status,setStatus]=useState("Selecciona un PDF local o una URL directa.");
  const [loading,setLoading]=useState(false);

  useEffect(()=>()=>{if(local.current)URL.revokeObjectURL(local.current);try{renderTask.current?.cancel?.()}catch{}},[]);

  async function loadBytes(bytes:ArrayBuffer,fallback=""){
    setLoading(true);setStatus("Cargando PDF.js…");setFallbackUrl(fallback);
    try{
      const mod=await import(/* @vite-ignore */ PDFJS) as PdfModule;
      mod.GlobalWorkerOptions.workerSrc=PDFJS_WORKER;
      const document=await mod.getDocument({data:bytes}).promise;
      setPdf(document);setPages(document.numPages);setPage(1);setStatus(`${document.numPages} páginas · PDF.js`);
    }catch(error){
      setPdf(null);setPages(0);setStatus(`PDF.js no pudo cargar el documento${fallback?"; usando visor del navegador como respaldo":""}.`);
      console.warn("PDF.js fallback",error);
    }finally{setLoading(false)}
  }

  async function loadFile(file?:File){
    if(!file)return;
    if(local.current)URL.revokeObjectURL(local.current);
    local.current=URL.createObjectURL(file);
    await loadBytes(await file.arrayBuffer(),local.current);
  }

  async function loadRemote(){
    const url=draft.trim();if(!url)return;setLoading(true);setStatus("Descargando documento…");setFallbackUrl(url);
    try{const res=await fetch(url);if(!res.ok)throw new Error(`HTTP ${res.status}`);await loadBytes(await res.arrayBuffer(),url)}
    catch(error){setPdf(null);setPages(0);setStatus("La fuente no permite lectura CORS; se abre con el visor del navegador.");setLoading(false);console.warn(error)}
  }

  useEffect(()=>{
    if(!pdf||!canvasRef.current)return;
    let cancelled=false;
    (async()=>{
      try{
        const p=await pdf.getPage(page);if(cancelled)return;
        const viewport=p.getViewport({scale:zoom});
        const canvas=canvasRef.current!;const ctx=canvas.getContext("2d");if(!ctx)return;
        const dpr=Math.min(devicePixelRatio||1,1.6);
        canvas.width=Math.floor(viewport.width*dpr);canvas.height=Math.floor(viewport.height*dpr);
        canvas.style.width=`${viewport.width}px`;canvas.style.height=`${viewport.height}px`;
        ctx.setTransform(dpr,0,0,dpr,0,0);
        try{renderTask.current?.cancel?.()}catch{}
        renderTask.current=p.render({canvasContext:ctx,viewport});
        await renderTask.current.promise;
      }catch(error:any){if(error?.name!=="RenderingCancelledException")console.warn(error)}
    })();
    return()=>{cancelled=true;try{renderTask.current?.cancel?.()}catch{}};
  },[pdf,page,zoom]);

  return <div className="document-studio">
    <div className="studio-head"><div><span>PDF.JS · VISOR DOCUMENTAL</span><h3>Documentos dentro del aula</h3><p>Renderizado con PDF.js cuando la fuente puede leerse; si una URL bloquea CORS, el campus conserva un visor de respaldo sin fingir que el documento fue incorporado.</p></div>{fallbackUrl&&<a href={fallbackUrl} target="_blank" rel="noreferrer">Abrir original ↗</a>}</div>
    <div className="document-toolbar"><label><Icon name="upload"/> PDF local<input type="file" accept="application/pdf" onChange={e=>loadFile(e.target.files?.[0])}/></label><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Pega URL directa a un PDF…"/><button onClick={loadRemote} disabled={!draft.trim()||loading}>{loading?"Cargando…":"Abrir"}</button></div>
    <div className="pdf-native-controls"><button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={!pdf||page<=1}>←</button><span>{pdf?`Página ${page} / ${pages}`:status}</span><button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={!pdf||page>=pages}>→</button><button onClick={()=>setZoom(z=>Math.max(.55,+(z-.15).toFixed(2)))} disabled={!pdf}>−</button><b>{Math.round(zoom*100)}%</b><button onClick={()=>setZoom(z=>Math.min(2.4,+(z+.15).toFixed(2)))} disabled={!pdf}>+</button></div>
    <div className="pdf-frame">{pdf?<div className="pdf-canvas-wrap"><canvas ref={canvasRef}/></div>:fallbackUrl?<object data={fallbackUrl} type="application/pdf"><p>Tu navegador no pudo incrustar este PDF. <a href={fallbackUrl}>Ábrelo aquí.</a></p></object>:<div className="empty-view"><Icon name="file"/><b>Visor listo</b><span>{status}</span></div>}</div>
    {sources.length>0&&<div className="studio-sources"><b>Documentos y fuentes verificadas</b>{sources.slice(0,10).map(item=><a key={item.url} href={item.url} target="_blank" rel="noreferrer"><Icon name="link"/><span>{item.label}<small>{item.where}</small></span></a>)}</div>}
  </div>;
}
