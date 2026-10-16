const C="cohag-v1",CDN="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(async c=>{await c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"]);try{await c.add(new Request(CDN,{mode:"cors"}))}catch(_){}}).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.hostname.endsWith("supabase.co"))return;   /* données et photos : jamais en cache */
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(C).then(k=>k.put("./index.html",c));return x}).catch(()=>caches.match("./index.html")));return}
 if(u.origin===location.origin||r.url===CDN)e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(C).then(k=>k.put(r,c))}return x})))});
