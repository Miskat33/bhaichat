var C="bhai-v6";
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return Promise.all(["./","index.html","manifest.json","icon-192.png","icon-512.png"].map(function(u){return c.add(u).catch(function(){})}))}))});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var h=new URL(r.url).hostname;
  if(h!==location.hostname&&h!=="www.gstatic.com"&&h!=="cdn.jsdelivr.net")return;
  e.respondWith(fetch(r.mode==="navigate"?r.url:r,{cache:"no-cache"}).then(function(res){
    if(res.ok||res.type==="opaque"){var c=res.clone();caches.open(C).then(function(ch){ch.put(r,c)})}
    return res;
  }).catch(function(){
    return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match("index.html")||caches.match("./")});
  }));
});
self.addEventListener("notificationclick",function(e){e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){for(var i=0;i<l.length;i++){if("focus" in l[i])return l[i].focus()}return clients.openWindow("./")}))});
