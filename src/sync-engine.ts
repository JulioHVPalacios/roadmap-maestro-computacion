export type CampusSnapshot={version:number;createdAt:string;progress:string[];notes:Record<string,string>;theme:string};
const DB="campus-maestro";const STORE="snapshots";const KEY="latest";
function openDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE)};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
export function collectSnapshot():CampusSnapshot{let progress:string[]=[];let notes:Record<string,string>={};try{progress=JSON.parse(localStorage.getItem("roadmap-maestro-progreso-v3")||"[]");notes=JSON.parse(localStorage.getItem("roadmap-maestro-notas-v3")||"{}") }catch{}return{version:6,createdAt:new Date().toISOString(),progress,notes,theme:localStorage.getItem("campus-maestro-theme")||"light"}}
export async function saveLocalSnapshot(snapshot=collectSnapshot()){const db=await openDb();await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).put(snapshot,KEY);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close();return snapshot}
export async function loadLocalSnapshot():Promise<CampusSnapshot|null>{const db=await openDb();const value=await new Promise<CampusSnapshot|null>((resolve,reject)=>{const tx=db.transaction(STORE,"readonly");const req=tx.objectStore(STORE).get(KEY);req.onsuccess=()=>resolve(req.result??null);req.onerror=()=>reject(req.error)});db.close();return value}
export function applySnapshot(snapshot:CampusSnapshot){localStorage.setItem("roadmap-maestro-progreso-v3",JSON.stringify(snapshot.progress));localStorage.setItem("roadmap-maestro-notas-v3",JSON.stringify(snapshot.notes));localStorage.setItem("campus-maestro-theme",snapshot.theme);window.dispatchEvent(new CustomEvent("campus-snapshot-applied"));}
export async function pushCloud(snapshot:CampusSnapshot){const endpoint=import.meta.env.VITE_SYNC_ENDPOINT as string|undefined;if(!endpoint)throw new Error("VITE_SYNC_ENDPOINT no configurado");const token=import.meta.env.VITE_SYNC_TOKEN as string|undefined;const res=await fetch(endpoint,{method:"PUT",headers:{"content-type":"application/json",...(token?{authorization:`Bearer ${token}`}:{})},body:JSON.stringify(snapshot)});if(!res.ok)throw new Error(`Sync HTTP ${res.status}`);return true}
export async function pullCloud(){const endpoint=import.meta.env.VITE_SYNC_ENDPOINT as string|undefined;if(!endpoint)throw new Error("VITE_SYNC_ENDPOINT no configurado");const token=import.meta.env.VITE_SYNC_TOKEN as string|undefined;const res=await fetch(endpoint,{headers:{...(token?{authorization:`Bearer ${token}`}:{})}});if(!res.ok)throw new Error(`Sync HTTP ${res.status}`);return await res.json() as CampusSnapshot}
export async function smartCloudSync(){
  const local=await loadLocalSnapshot()??await saveLocalSnapshot();
  try{
    const remote=await pullCloud();
    const lt=Date.parse(local.createdAt)||0,rt=Date.parse(remote.createdAt)||0;
    if(rt>lt){applySnapshot(remote);await saveLocalSnapshot(remote);return {direction:"down" as const,snapshot:remote};}
    await pushCloud(local);return {direction:"up" as const,snapshot:local};
  }catch(error){
    await pushCloud(local);return {direction:"up" as const,snapshot:local,error};
  }
}
