
var C = "bhai-v3";
self.addEventListener("install", function(e){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function(e){
  var r = e.request;
  if (r.method !== "GET") return;
  var h = new URL(r.url).hostname;
  if (h !== location.hostname && h !== "www.gstatic.com" && h !== "cdn.jsdelivr.net") return;
  e.respondWith(
    fetch(r).then(function(res){
      if (res.ok || res.type === "opaque") {
        var c = res.clone();
        caches.open(C).then(function(ch){ ch.put(r, c); });
      }
      return res;
    }).catch(function(){
      return caches.match(r, {ignoreSearch: true}).then(function(m){ return m || caches.match("/bhaichat/"); });
    })
  );
});
