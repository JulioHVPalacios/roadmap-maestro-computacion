const VERSION="campus-maestro-v6";
const SHELL=["./","./site.webmanifest","./favicon.svg"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==VERSION).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener("message",event=>{if(event.data==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",event=>{
  const req=event.request;if(req.method!=="GET")return;const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(req.mode==="navigate"){
    event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(VERSION).then(c=>c.put("./",copy));return res}).catch(()=>caches.match("./")));return;
  }
  if(["script","style","font","image"].includes(req.destination)){
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy))}return res})));return;
  }
  event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy))}return res}).catch(()=>caches.match(req)));
});
