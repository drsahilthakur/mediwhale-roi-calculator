/* Mediwhale ROI Calculator service worker.
   Network-first for pages (always fresh online, cached offline);
   cache-first for static assets. Bump CACHE to force an update. */
const CACHE = "mediwhale-roi-v1";
const ASSETS = [
  "/", "/guide.html", "/manifest.webmanifest",
  "/favicon.ico", "/apple-touch-icon.png",
  "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png", "/og-image.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isHTML = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  if (isHTML) {
    // network-first so deploys always propagate when online
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("/")))
    );
    return;
  }
  // cache-first for icons/assets
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
    }))
  );
});
