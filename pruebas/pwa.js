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
   En iPhone no existe ese aviso: allí se instala desde Compartir. */
const registro = `<script>
(function () {
  try {
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
      if (yaDicho() || instalada() || document.getElementById("ea-instalar")) return;
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

/* ---- inyectar en la cabecera viva ---- */
const iHead = doc.indexOf("</head>");
const iIsla = doc.indexOf('id="plantilla"');
ok(iHead > 0, "el documento tiene cabecera");
ok(iIsla < 0 || iHead < iIsla, "la primera cabecera es la viva, antes de la isla de plantilla");
const sitioDoc = doc.slice(0, iHead) + cabecera + "\n" + registro + "\n" + doc.slice(iHead);
ok(sitioDoc.split('rel="manifest"').length - 1 === 1, "el manifiesto se enlaza una sola vez");
ok(sitioDoc.slice(iHead + cabecera.length + registro.length + 2) === doc.slice(iHead), "todo lo que va después de la cabecera, islas incluidas, queda idéntico");
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
