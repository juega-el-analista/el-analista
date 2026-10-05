/* ============================================================
   EL SITIO, COMO APP INSTALABLE
   Arma la carpeta sitio/ que publica GitHub Pages: el juego más lo que
   hace falta para instalarlo (manifiesto, iconos y el trabajador que lo
   deja jugar sin conexión).

   Lo que se añade va SOLO a la copia de Pages. index.html sigue siendo
   el documento que sabe reconstruirse a sí mismo (el del artifact y el
   registro de carreras), y no se toca: en el artifact no hay dónde
   servir un manifiesto, y meterlo en la plantilla obligaría a revisar
   las tres trampas del quine por nada.

   Las etiquetas van en la cabecera VIVA, la primera. Dentro del
   documento hay una segunda copia de la cabecera guardada en la isla
   de plantilla; si se inyectara ahí, la próxima publicación del
   artifact la arrastraría. Se comprueba abajo.

   Se corre con:  npm run sitio             (arma sitio/ y lo verifica)
                  npm run sitio -- servir   (y lo sirve en :5175)
   ============================================================ */
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const RAIZ = path.join(__dirname, "..");
const PWA = path.join(RAIZ, "pwa");
const SITIO = path.join(RAIZ, "sitio");
const CIERRE = "<" + "/script>";

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

const doc = fs.readFileSync(path.join(RAIZ, "index.html"), "utf8");
const version = crypto.createHash("sha1").update(doc).digest("hex").slice(0, 10);

/* lo que va en la cabecera: instalar, icono y color de la barra */
const cabecera = [
  '<link rel="manifest" href="manifest.webmanifest">',
  '<meta name="theme-color" content="#0B3A1F">',
  '<link rel="icon" type="image/png" sizes="192x192" href="icono-192.png">',
  '<link rel="apple-touch-icon" href="apple-touch-icon.png">',
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-title" content="El Analista">',
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
].join("\n");

/* El registro del trabajador y un botón discreto de «Instalar». El botón
   solo aparece cuando el navegador dice que se puede instalar (Chrome,
   Edge, Android), se puede cerrar para siempre y desaparece al instalar.
   En iPhone no existe ese aviso: allí se instala desde Compartir.

   En Vercel no sale: Vercel define VERCEL=1 al construir, y ahí el sitio
   se juega en el navegador. El aviso del navegador se sigue callando
   (preventDefault), así que tampoco aparece la barra propia de Chrome;
   quien quiera instalarla aún puede, desde el menú del navegador.
   SIN_BOTON_INSTALAR=1 lo quita en cualquier otro sitio. */
const conBoton = process.env.VERCEL !== "1" && process.env.SIN_BOTON_INSTALAR !== "1";
const registro = `<script>
(function () {
  try {
    var BOTON = ${conBoton};
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
      });
    }
    var CLAVE = "el-analista-instalar-no";
    var aparcado = null;
    var yaDicho = function () { try { return localStorage.getItem(CLAVE) === "1"; } catch (e) { return false; } };
    var instalada = function () {
      try { return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; }
    };
    var quitar = function () { var b = document.getElementById("ea-instalar"); if (b) b.remove(); };
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      aparcado = e;
      if (!BOTON || yaDicho() || instalada() || document.getElementById("ea-instalar")) return;
      var caja = document.createElement("div");
      caja.id = "ea-instalar";
      caja.setAttribute("style", "position:fixed;right:14px;bottom:14px;z-index:9999;display:flex;align-items:center;"
        + "gap:2px;background:#0B3A1F;border:1px solid #1F6B3E;box-shadow:0 4px 14px rgba(0,0,0,.18);"
        + "font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:12px");
      var si = document.createElement("button");
      si.textContent = "Instalar la app";
      si.setAttribute("style", "background:transparent;border:none;color:#F7F7F5;padding:10px 12px;cursor:pointer;font:inherit;letter-spacing:inherit;text-transform:inherit");
      si.onclick = function () {
        if (!aparcado) return;
        aparcado.prompt();
        aparcado.userChoice.then(function () { aparcado = null; quitar(); });
      };
      var no = document.createElement("button");
      no.textContent = "×";
      no.setAttribute("aria-label", "No mostrar más");
      no.setAttribute("style", "background:transparent;border:none;color:#9FB8A8;padding:10px 12px 10px 4px;cursor:pointer;font-size:16px;line-height:1");
      no.onclick = function () { try { localStorage.setItem(CLAVE, "1"); } catch (e) {} quitar(); };
      caja.appendChild(si); caja.appendChild(no);
      document.body.appendChild(caja);
    });
    window.addEventListener("appinstalled", quitar);
  } catch (e) {}
})();
${CIERRE}`;

/* ---- la conexión con el backend ----
   VITE_API_URL sale del entorno: en Vercel, de las variables del
   proyecto; en local, de .env o .env.local (ver .env.example). El nombre
   es el de Vite por costumbre, pero aquí no hay Vite: lo lee este script.

   Igual que el manifiesto, va SOLO a la copia del sitio. El artifact no
   habla con ningún backend, y el quine no tiene por qué saber de él.

   El juego la usa desde window.__pedir(ruta, opciones): un fetch que ya
   sabe la URL base, manda y recibe JSON y rechaza con el código HTTP si
   la respuesta no es buena. Sin URL configurada, window.__API_URL es null
   y __pedir rechaza con "sin-api": el juego tiene que poder vivir sin él. */
const leerEnv = (archivo) => {
  const ruta = path.join(RAIZ, archivo);
  if (!fs.existsSync(ruta)) return {};
  const vars = {};
  fs.readFileSync(ruta, "utf8").split(/\r?\n/).forEach((linea) => {
    const m = linea.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m) vars[m[1]] = m[2].replace(/^(["'])(.*)\1$/, "$2");
  });
  return vars;
};
const envLocal = Object.assign({}, leerEnv(".env"), leerEnv(".env.local"));
const apiCruda = (process.env.VITE_API_URL !== undefined ? process.env.VITE_API_URL : envLocal.VITE_API_URL || "").trim();
let apiUrl = null;
if (apiCruda) {
  let u = null;
  try { u = new URL(apiCruda); } catch (e) {}
  ok(u && (u.protocol === "https:" || u.protocol === "http:"), "VITE_API_URL es una URL http(s): " + apiCruda);
  if (u) apiUrl = apiCruda.replace(/\/+$/, "");
}
/* JSON.stringify no escapa "<", y un cierre de script dentro de la URL
   cortaría el bloque */
const apiJson = JSON.stringify(apiUrl).replace(/</g, "\\u003c");
const conexion = `<script>
(function () {
  var BASE = ${apiJson};
  window.__API_URL = BASE;
  window.__pedir = function (ruta, opciones) {
    if (!BASE) return Promise.reject(new Error("sin-api"));
    var o = opciones || {};
    var cab = Object.assign({ "Accept": "application/json" }, o.headers || {});
    var cuerpo = o.body;
    if (cuerpo !== undefined && typeof cuerpo !== "string" && !(cuerpo instanceof FormData)) {
      cuerpo = JSON.stringify(cuerpo);
      if (!cab["Content-Type"]) cab["Content-Type"] = "application/json";
    }
    var url = /^https?:/.test(ruta) ? ruta : BASE + (ruta.charAt(0) === "/" ? "" : "/") + ruta;
    return fetch(url, Object.assign({}, o, { headers: cab, body: cuerpo })).then(function (r) {
      var tipo = r.headers.get("Content-Type") || "";
      var leer = tipo.indexOf("json") >= 0 ? r.json() : r.text();
      return leer.then(function (datos) {
        if (r.ok) return datos;
        var err = new Error("http-" + r.status);
        err.status = r.status; err.datos = datos;
        throw err;
      });
    });
  };
})();
${CIERRE}`;

/* ---- inyectar en la cabecera viva ---- */
const iHead = doc.indexOf("</head>");
const iIsla = doc.indexOf('id="plantilla"');
ok(iHead > 0, "el documento tiene cabecera");
ok(iIsla < 0 || iHead < iIsla, "la primera cabecera es la viva, antes de la isla de plantilla");
/* La barra final. El sitio puede vivir bajo una ruta de otro dominio
   (tudominio.com/juego/, servido con un rewrite desde ese proyecto). Todo
   lo de aquí se pide con rutas relativas, y sin la barra final esas rutas
   saltan a la raíz del otro dominio: el trabajador, el manifiesto y los
   iconos se piden donde no están. Va primero, antes de que se pida nada. */
const barra = `<script>
(function () {
  var p = location.pathname;
  if (p.charAt(p.length - 1) !== "/" && !/\\.[A-Za-z0-9]+$/.test(p)) location.replace(p + "/" + location.search + location.hash);
})();
${CIERRE}`;
const inyeccion = [barra, cabecera, conexion, registro].join("\n") + "\n";
const sitioDoc = doc.slice(0, iHead) + inyeccion + doc.slice(iHead);
ok(sitioDoc.split('rel="manifest"').length - 1 === 1, "el manifiesto se enlaza una sola vez");
ok(sitioDoc.indexOf(barra) < sitioDoc.indexOf('rel="manifest"'), "la barra final se arregla antes de pedir nada relativo");
ok(sitioDoc.slice(iHead + inyeccion.length) === doc.slice(iHead), "todo lo que va después de la cabecera, islas incluidas, queda idéntico");
ok(doc.indexOf("__API_URL") < 0, "index.html no sabe del backend (el del artifact y el quine)");
console.log("  " + (apiUrl ? "backend en " + apiUrl : "sin VITE_API_URL: el sitio sale sin backend"));
console.log("  " + (conBoton ? "con el botón de «Instalar la app»" : "sin el botón de «Instalar la app»"));
ok(sitioDoc.indexOf("var BOTON = " + conBoton + ";") > 0, "el botón de instalar sale solo donde toca");
ok(doc.indexOf('rel="manifest"') < 0, "index.html sigue sin tocar (el del artifact y el quine)");

/* ---- la carpeta ---- */
fs.rmSync(SITIO, { recursive: true, force: true });
fs.mkdirSync(SITIO);
fs.writeFileSync(path.join(SITIO, "index.html"), sitioDoc);
const archivos = ["manifest.webmanifest", "icono-192.png", "icono-512.png", "icono-maskable-512.png", "apple-touch-icon.png"];
archivos.forEach((a) => fs.copyFileSync(path.join(PWA, a), path.join(SITIO, a)));
const sw = fs.readFileSync(path.join(PWA, "sw.js"), "utf8");
ok(sw.indexOf("%%VERSION%%") >= 0, "el trabajador trae la marca de versión");
fs.writeFileSync(path.join(SITIO, "sw.js"), sw.replace("%%VERSION%%", version));

/* ---- que el manifiesto sea instalable ---- */
const man = JSON.parse(fs.readFileSync(path.join(SITIO, "manifest.webmanifest"), "utf8"));
ok(man.name && man.short_name && man.start_url && man.display === "standalone", "manifiesto con nombre, inicio y pantalla completa");
const tams = man.icons.map((i) => i.sizes);
ok(tams.indexOf("192x192") >= 0 && tams.indexOf("512x512") >= 0, "iconos de 192 y 512, los que piden Chrome y Android");
ok(man.icons.some((i) => i.purpose === "maskable"), "icono adaptable para Android");
man.icons.forEach((i) => ok(fs.existsSync(path.join(SITIO, i.src)), "existe " + i.src));
const precache = (sw.match(/BASICOS = \[([^\]]+)\]/) || [])[1] || "";
precache.split(",").map((x) => x.trim().replace(/^"\.\/|"$/g, "")).filter(Boolean)
  .forEach((a) => ok(a === "" || fs.existsSync(path.join(SITIO, a)), "el trabajador guarda " + (a || "./") + " y existe"));

console.log("\n  sitio/ listo · versión " + version + " · " + Math.round(sitioDoc.length / 1024) + " KB");
console.log("  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
if (fallos) process.exit(1);

if (process.argv.indexOf("servir") >= 0) {
  const TIPOS = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".webmanifest": "application/manifest+json", ".png": "image/png" };
  require("http").createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/" || p === "") p = "/index.html";
    const f = path.join(SITIO, path.normalize(p).replace(/^([/\\])+/, ""));
    if (!f.startsWith(SITIO) || !fs.existsSync(f)) { res.writeHead(404); return res.end("no"); }
    res.writeHead(200, { "Content-Type": TIPOS[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(fs.readFileSync(f));
  }).listen(5175, () => console.log("  El Analista, como app, en http://localhost:5175"));
}
