import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";

type Props={title?:string;sources?:Array<{label:string;url:string;where:string}>};

const NASA_VIDEO="https://sdo.gsfc.nasa.gov/assets/img/latest/mpeg/latest48_SDO_2D.mp4";

function fmt(seconds:number){if(!Number.isFinite(seconds))return"0:00";const m=Math.floor(seconds/60),s=Math.floor(seconds%60);return`${m}:${String(s).padStart(2,"0")}`}

export default function InteractiveVideo({title="Reproductor interactivo",sources=[]}:Props){
  const videoRef=useRef<HTMLVideoElement|null>(null);
  const stageRef=useRef<HTMLDivElement|null>(null);
  const [src,setSrc]=useState(NASA_VIDEO);
  const [playing,setPlaying]=useState(false);
  const [duration,setDuration]=useState(0);
  const [time,setTime]=useState(0);
  const [volume,setVolume]=useState(.8);
  const [speed,setSpeed]=useState(1);
  const [loop,setLoop]=useState(false);
  const [zoom,setZoom]=useState(1);
  const [offset,setOffset]=useState({x:0,y:0});
  const drag=useRef<{x:number;y:number;ox:number;oy:number}|null>(null);
  const localUrl=useRef<string|null>(null);

  useEffect(()=>()=>{if(localUrl.current)URL.revokeObjectURL(localUrl.current)},[]);
  useEffect(()=>{const v=videoRef.current;if(v){v.volume=volume;v.playbackRate=speed;v.loop=loop}},[volume,speed,loop]);

  const sourceLinks=useMemo(()=>sources.slice(0,8),[sources]);
  const toggle=async()=>{const v=videoRef.current;if(!v)return;if(v.paused){await v.play().catch(()=>{});}else v.pause()};
  const resetView=()=>{setZoom(1);setOffset({x:0,y:0})};
  const onWheel=(e:React.WheelEvent)=>{e.preventDefault();setZoom(z=>Math.min(3,Math.max(1,+(z+(e.deltaY<0?.12:-.12)).toFixed(2))))};
  const onDown=(e:React.PointerEvent)=>{if(zoom<=1)return;drag.current={x:e.clientX,y:e.clientY,ox:offset.x,oy:offset.y};(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)};
  const onMove=(e:React.PointerEvent)=>{if(!drag.current)return;setOffset({x:drag.current.ox+(e.clientX-drag.current.x),y:drag.current.oy+(e.clientY-drag.current.y)})};
  const onUp=()=>{drag.current=null};
  const fullscreen=()=>stageRef.current?.requestFullscreen?.();
  const pip=async()=>{const v=videoRef.current as HTMLVideoElement & {requestPictureInPicture?:()=>Promise<PictureInPictureWindow>};if(v?.requestPictureInPicture)await v.requestPictureInPicture().catch(()=>{})};
  const chooseFile=(file?:File)=>{if(!file)return;if(localUrl.current)URL.revokeObjectURL(localUrl.current);localUrl.current=URL.createObjectURL(file);setSrc(localUrl.current);setTime(0)};

  return <div className="interactive-video">
    <div className="studio-head"><div><span>VÍDEO REAL · MANIPULABLE</span><h3>{title}</h3><p>Reproduce, busca, cambia velocidad, usa PiP/pantalla completa y arrastra/zoom sobre el encuadre. La demostración usa vídeo público de NASA/SDO; también puedes cargar un archivo local.</p></div><a href="https://sdo.gsfc.nasa.gov/assets/img/latest/mpeg/" target="_blank" rel="noreferrer">Fuente NASA ↗</a></div>
    <div ref={stageRef} className={`video-stage ${zoom>1?"is-zoomed":""}`} onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onDoubleClick={resetView}>
      <video ref={videoRef} src={src} playsInline preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onTimeUpdate={e=>setTime(e.currentTarget.currentTime)} onLoadedMetadata={e=>setDuration(e.currentTarget.duration)} style={{transform:`translate(${offset.x}px,${offset.y}px) scale(${zoom})`}}/>
      <div className="video-hud"><span>NASA SDO · DEMO</span><b>{zoom.toFixed(1)}×</b></div>
    </div>
    <div className="video-controls">
      <button onClick={toggle} aria-label={playing?"Pausar":"Reproducir"}><Icon name={playing?"pause":"play"}/></button>
      <span className="timecode">{fmt(time)}</span>
      <input className="seek" type="range" min="0" max={duration||1} step=".05" value={Math.min(time,duration||1)} onChange={e=>{const v=videoRef.current;if(v){v.currentTime=Number(e.target.value);setTime(v.currentTime)}}}/>
      <span className="timecode">{fmt(duration)}</span>
      <Icon name="volume"/><input className="vol" type="range" min="0" max="1" step=".05" value={volume} onChange={e=>setVolume(Number(e.target.value))}/>
      <select value={speed} onChange={e=>setSpeed(Number(e.target.value))} aria-label="Velocidad">{[.5,.75,1,1.25,1.5,2].map(v=><option key={v} value={v}>{v}×</option>)}</select>
      <button className={loop?"active":""} onClick={()=>setLoop(v=>!v)} title="Repetir"><Icon name="rotate"/></button>
      <button onClick={resetView} title="Restablecer zoom"><Icon name="zoom"/></button>
      <button onClick={pip} title="Imagen en imagen"><Icon name="monitor"/></button>
      <button onClick={fullscreen} title="Pantalla completa"><Icon name="maximize"/></button>
    </div>
    <div className="studio-file-row"><label><Icon name="upload"/> Cargar vídeo local<input type="file" accept="video/*" onChange={e=>chooseFile(e.target.files?.[0])}/></label><span>Rueda = zoom · arrastrar = pan · doble clic = reset</span></div>
    {sourceLinks.length>0&&<div className="studio-sources"><b>Fuentes de la materia</b>{sourceLinks.map(item=><a key={item.url} href={item.url} target="_blank" rel="noreferrer"><Icon name="link"/><span>{item.label}<small>{item.where}</small></span></a>)}</div>}
  </div>;
}
