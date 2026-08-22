const APP_VERSION="v11";
const CACHE_NAME=`plan-wallpaper-${APP_VERSION}`;
const APP_SHELL=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

function versionedUrl(url){
  const freshUrl=new URL(url,self.location);
  freshUrl.searchParams.set("__pwv",APP_VERSION);
  return freshUrl.href;
}

async function cacheAppShell(){
  const cache=await caches.open(CACHE_NAME);
  await Promise.all(APP_SHELL.map(async url=>{
    const request=new Request(versionedUrl(url),{cache:"no-store"});
    const response=await fetch(request);
    if(!response.ok) throw new Error(`Failed to cache ${url}`);
    await cache.put(new URL(url,self.location).href,response);
  }));
}

self.addEventListener("install",event=>{
  event.waitUntil(cacheAppShell().then(()=>self.skipWaiting()));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET") return;

  if(req.mode==="navigate"){
    event.respondWith(
      fetch(versionedUrl(req.url),{cache:"no-store",credentials:"same-origin",redirect:"follow"}).then(res=>{
        const copy=res.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(new URL("./index.html",self.location).href,copy));
        return res;
      }).catch(()=>caches.match(new URL("./index.html",self.location).href))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached) return cached;
      return fetch(req).then(res=>{
        if(res && (res.ok || res.type==="opaque")){
          const copy=res.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));
        }
        return res;
      });
    })
  );
});
