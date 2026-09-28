/* El trabajador que hace que El Analista funcione sin conexión.

   El juego es un solo documento, así que basta con guardar ese documento
   y los iconos. La estrategia es «primero la red» para la página: con
   conexión siempre se juega la última versión publicada, y sin conexión
   se juega la última que se guardó. Los iconos y el manifiesto no
   cambian casi nunca y se sirven del caché.

   La versión del caché la escribe pruebas/pwa.js al construir el sitio:
   cambia con cada publicación y así los cachés viejos se borran solos. */
const VERSION = "%%VERSION%%";
const CACHE = "el-analista-" + VERSION;
const BASICOS = ["./", "./index.html", "./manifest.webmanifest",
  "./icono-192.png", "./icono-512.png", "./icono-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASICOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith("el-analista-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  /* lo de otros dominios (las fuentes de Google) va directo a la red:
     sin conexión el juego cae a las fuentes del sistema y se juega igual */
  if (url.origin !== self.location.origin) return;

  const esPagina = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
  if (esPagina) {
    e.respondWith(
      fetch(req)
        .then((r) => {
          if (r && r.ok) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put("./index.html", copia)); }
          return r;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }
  e.respondWith(caches.match(req).then((r) => r || fetch(req)));
});
