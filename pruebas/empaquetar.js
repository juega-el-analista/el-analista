/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Empaqueta el juego en un HTML autónomo: React incluido, cero red. */
const fs = require("fs");
const babel = require("@babel/core");

const JSX = RUTA_FUENTE;
const SALIDA = process.argv[2] || RUTA_BUILD;

/* 1 · JSX -> JS clásico, sin módulos */
const src = fs.readFileSync(JSX, "utf8");
let js = babel.transformSync(src, {
  filename: "juego.jsx",
  presets: [[require.resolve("@babel/preset-react"), { runtime: "classic" }]],
  sourceType: "module",
  /* Sin compact:false, Babel compacta solo en cuanto el archivo pasa de
     medio mega y deja de haber saltos de línea donde yo los esperaba;
     las sustituciones de abajo dejaban de encontrar su anclaje. */
  configFile: false, babelrc: false, compact: false,
}).code;

/* el import de React pasa a leer los globales del UMD.
   Sin anclar a principio de línea: Babel puede emitir helpers antes. */
const antesImport = js;
js = js.replace(
  /import\s+React\s*,\s*\{([^}]*)\}\s*from\s*["']react["'];?/,
  'var React = window.React; var {$1} = React;'
);
if (js === antesImport) throw new Error("no se pudo reescribir el import de React");

/* el export default pasa a ser una variable global */
const antesExport = js;
js = js.replace(/export\s+default\s+function\s+ElAnalista/, "function ElAnalista");
if (js === antesExport) throw new Error("no se pudo reescribir el export default");

/* 2 · React y ReactDOM desde node_modules, no desde ninguna CDN */
const react = fs.readFileSync(path.join(RAIZ, "node_modules/react/umd/react.production.min.js"), "utf8");
const reactDom = fs.readFileSync(path.join(RAIZ, "node_modules/react-dom/umd/react-dom.production.min.js"), "utf8");

/* 3 · el documento. Sin <html>, <head> ni <body>: el visor los pone. */
const html = `<title>El Analista</title>
<style>
  html, body { margin: 0; padding: 0; background: #0C191D; }
  #raiz { min-height: 100vh; }
  /* mientras carga, algo que no sea una pantalla en blanco */
  #cargando { color: #7B8D8F; font-family: system-ui, sans-serif; padding: 40px 24px; font-size: 14px; letter-spacing: .06em; }
  #tronado { color: #CFC9BA; background: #13252A; border: 1px solid #20393E; margin: 24px;
             padding: 20px; font-family: ui-monospace, Menlo, monospace; font-size: 13px;
             white-space: pre-wrap; word-break: break-word; display: none; }

  /* el juego se puede jugar con el teclado: que se vea dónde estás.
     El diseño propio ya lo hace en las opciones del memorando; esto lo
     extiende al resto de los botones y controles. */
  #raiz button:focus-visible,
  #raiz input:focus-visible,
  #raiz [role="button"]:focus-visible {
    outline: 2px solid #C0763A;
    outline-offset: 2px;
  }

  /* quien haya pedido menos movimiento en su sistema no debería recibir
     los sellos que rebotan ni los memorandos que entran deslizándose */
  @media (prefers-reduced-motion: reduce) {
    #raiz *, #raiz *::before, #raiz *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 1ms !important;
    }
  }
</style>

<div id="raiz"><div id="cargando">Cargando El Analista&hellip;</div></div>
<div id="tronado"></div>

<script>${react}</script>
<script>${reactDom}</script>
<script>
(function () {
  var caja = document.getElementById("tronado");
  function tronar(e) {
    try {
      caja.style.display = "block";
      caja.textContent = "El juego no pudo arrancar.\\n\\n" + (e && e.stack ? e.stack : String(e));
    } catch (_) {}
  }
  window.addEventListener("error", function (ev) { tronar(ev.error || ev.message); });
  try {
${js}
    var raiz = document.getElementById("raiz");
    raiz.innerHTML = "";
    ReactDOM.createRoot(raiz).render(React.createElement(ElAnalista));
  } catch (e) { tronar(e); }
})();
</script>
`;

fs.writeFileSync(SALIDA, html);
const kb = Math.round(fs.statSync(SALIDA).size / 1024);
console.log("escrito " + SALIDA + "  (" + kb + " KB)");
if (/https?:\/\/(?!fonts\.googleapis|fonts\.gstatic)/.test(html.replace(/reactjs\.org|react\.dev/g, ""))) {
  console.log("AVISO: quedan referencias a hosts externos");
} else {
  console.log("sin dependencias de red salvo Google Fonts");
}
