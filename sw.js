const CACHE='wl-toolkit-pre-xiaomi-v25-1';
const CORE=['./','./index.html','./manifest.webmanifest','./registerSW.js','./icon.svg','./pwa-192x192.png','./pwa-512x512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{})}return res}).catch(()=>caches.match(req).then(res=>res|| (req.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
