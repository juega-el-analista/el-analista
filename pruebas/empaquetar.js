/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Empaqueta el juego en un HTML autónomo: React incluido, cero red.
 *
 * El documento sabe reconstruirse a sí mismo, porque el registro de
 * carreras vive dentro y la página tiene que poder publicar versiones
 * nuevas de sí misma cuando alguien termina una partida.
 *
 * El truco que evita duplicar los 800 KB del motor: un bloque de script
 * que se está ejecutando permite leer su propio código con .textContent.
 * Así la isla de plantilla guarda solo la cáscara (unos pocos KB) y al
 * publicar se vuelven a inyectar los motores leyéndolos de la página.
 *
 * Las tres trampas del quine, que ya costaron una vez (ver salon/README.md):
 *   1 · ninguna secuencia de cierre de script literal en el JavaScript de
 *       la cáscara, ni dentro de un comentario: el parser corta el bloque
 *       igual y la página deja de arrancar. Se comprueba abajo.
 *   2 · las marcas se arman por trozos en el JS de la página, o habría dos
 *       copias de cada una y el generador no sabría cuál es la de verdad.
 *   3 · las sustituciones con función de reemplazo, no con cadena: un "$&"
 *       en el contenido se interpretaría como referencia.
 */
const fs = require("fs");
const babel = require("@babel/core");

const JSX = RUTA_FUENTE;
const SALIDA = process.argv[2] || RUTA_BUILD;
const MARCA_FIN = "[[FIN-" + "SCRIPT]]";
const CIERRE = "<" + "/script";

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

/* 3 · la cáscara, con sus cinco marcas.
   Documento completo a propósito: el visor envuelve lo que se guarda en su
   propio esqueleto, así que la semilla y cada republicación tienen que
   tener la misma forma o el quine se desalinea entre generaciones. */
const CASCARA = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>El Analista</title>
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
</head>
<body>

<div id="raiz"><div id="cargando">Cargando El Analista&hellip;</div></div>
<div id="tronado"></div>

<script type="application/json" id="registro">%%REGISTRO%%</script>
<script type="text/plain" id="plantilla">%%PLANTILLA%%</script>

<script id="puente">
/* ============================================================
   EL PUENTE
   Vive en la cáscara, no en el motor: así el motor sigue siendo React
   puro y toda la lógica de reconstruir el documento queda en un sitio
   pequeño y fácil de leer.

   Le ofrece tres cosas al juego:
     window.__REGISTRO           el registro de carreras, ya leído
     window.__puedeAnotar()      si esta vista puede publicar
     window.__anotarCarrera(x)   añade una carrera y publica
   ============================================================ */
(function () {
  "use strict";

  /* El informe de errores va aquí, en el primer bloque que corre, para
     que llegue a tiempo de cazar un fallo del propio motor. */
  window.__tronar = function (e) {
    try {
      var caja = document.getElementById("tronado");
      caja.style.display = "block";
      caja.textContent = "El juego no pudo arrancar.\\n\\n" + (e && e.stack ? e.stack : String(e));
    } catch (_) {}
  };
  window.addEventListener("error", function (ev) { window.__tronar(ev.error || ev.message); });

  /* Marcas por trozos: si aparecieran literales, el generador vería dos
     copias de cada una y no sabría cuál es la de verdad. */
  var CIE = "<" + "/script";
  var M_FIN = "[[FIN-" + "SCRIPT]]";
  var M_REG = "%%" + "REGISTRO" + "%%";
  var M_PLANT = "%%" + "PLANTILLA" + "%%";
  var M_REACT = "%%" + "REACT" + "%%";
  var M_DOM = "%%" + "REACTDOM" + "%%";
  var M_JUEGO = "%%" + "JUEGO" + "%%";
  var TOPE = 200;

  function textoDe(id) {
    var el = document.getElementById(id);
    return el ? (el.textContent || "") : "";
  }
  function proteger(s) { return s.split(CIE).join(M_FIN); }
  function leerPlantilla() { return textoDe("plantilla").split(M_FIN).join(CIE); }

  function leerRegistro() {
    try {
      var v = JSON.parse(textoDe("registro"));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }

  window.__REGISTRO = leerRegistro();

  /* La capacidad se resuelve una vez y se recuerda. null significa que
     esta vista no puede publicar: ni servida, ni concedida, ni cargada,
     indistinguibles a propósito, así que se tratan igual. */
  var pedido = null;
  function capacidad() {
    if (pedido) return pedido;
    var c = window.claude;
    if (!c || typeof c.use !== "function") {
      pedido = Promise.resolve(null);
    } else {
      pedido = c.use("artifact").then(function (api) {
        return api && typeof api.publish === "function" ? api : null;
      }).catch(function () { return null; });
    }
    return pedido;
  }

  window.__puedeAnotar = function () {
    return capacidad().then(function (api) { return !!api; });
  };

  /* Añade una carrera al registro y publica el documento nuevo. Resuelve
     con null si fue bien, o con un motivo si no. No lanza: el juego no
     tiene por qué saber de códigos de error. */
  window.__anotarCarrera = function (entrada) {
    return capacidad().then(function (api) {
      if (!api) return "sin-permiso";

      var lista = window.__REGISTRO.concat([entrada])
        .sort(function (a, b) { return ((b && b.p) || 0) - ((a && a.p) || 0); })
        .slice(0, TOPE);

      var plantilla = leerPlantilla();
      if (!plantilla || plantilla.indexOf(M_PLANT) < 0) return "sin-plantilla";

      /* EL ORDEN IMPORTA. Rellenar la plantilla inserta la cáscara entera,
         que lleva todas las marcas sin rellenar dentro; a partir de ahí
         cualquier replace siguiente golpearía la copia de la isla en vez
         de la parte viva del documento, y los motores se quedarían sin
         inyectar. Los motores van primero y la plantilla al final. */
      var doc = plantilla
        .replace(M_REG, function () { return JSON.stringify(lista); })
        .replace(M_REACT, function () { return textoDe("motor-react"); })
        .replace(M_DOM, function () { return textoDe("motor-dom"); })
        .replace(M_JUEGO, function () { return textoDe("motor-juego"); })
        .replace(M_PLANT, function () { return proteger(plantilla); });

      return api.publish(doc).then(function () { return null; }, function (err) {
        var codigo = err && (err.code || err.name) ? String(err.code || err.name) : "";
        if (codigo === "conflict") return "conflicto";
        if (codigo === "not_granted" || codigo === "not_writer") return "sin-permiso";
        return "fallo";
      });
    });
  };
})();
</script>

<script id="motor-react">%%REACT%%</script>
<script id="motor-dom">%%REACTDOM%%</script>
<!-- El motor del juego va SOLO en su bloque, sin envoltorio ninguno.
     Si la marca estuviera dentro de un envoltorio, al republicar se
     reinyectaría el bloque entero dentro de ese mismo envoltorio y
     quedaría anidado dos veces: ElAnalista viviría en el ámbito interno
     y el montaje de fuera tronaría. El arranque va aparte, debajo. -->
<script id="motor-juego">%%JUEGO%%</script>
<script id="arranque">
(function () {
  try {
    var raiz = document.getElementById("raiz");
    raiz.innerHTML = "";
    ReactDOM.createRoot(raiz).render(React.createElement(ElAnalista));
  } catch (e) { window.__tronar(e); }
})();
</script>
</body>
</html>
`;

/* 4 · comprobaciones antes de emitir nada */
const MARCAS = ["%%REGISTRO%%", "%%PLANTILLA%%", "%%REACT%%", "%%REACTDOM%%", "%%JUEGO%%"];
const fallos = [];

MARCAS.forEach((m) => {
  const n = CASCARA.split(m).length - 1;
  if (n !== 1) fallos.push("la marca " + m + " aparece " + n + " veces en la cáscara (debe aparecer 1)");
});
if (CASCARA.indexOf(MARCA_FIN) >= 0) {
  fallos.push("la cáscara contiene " + MARCA_FIN + ", que se usa como marca interna");
}
/* La trampa que ya costó una vez: una secuencia de cierre de script en el
   JS de la cáscara, aunque sea dentro de un comentario, corta el bloque.
   Aquí solo pueden aparecer los cierres de etiqueta de verdad. */
const cierresEtiqueta = CASCARA.split(CIERRE + ">").length - 1;
const cierresTotales = CASCARA.split(CIERRE).length - 1;
if (cierresTotales !== cierresEtiqueta) {
  fallos.push("hay " + (cierresTotales - cierresEtiqueta) + " cierre(s) de script sueltos en la cáscara");
}
[["react", react], ["react-dom", reactDom], ["el juego", js]].forEach((par) => {
  if (par[1].indexOf(CIERRE) >= 0) fallos.push(par[0] + " contiene un cierre de script, que rompería su bloque");
});

if (fallos.length) {
  fallos.forEach((f) => console.log("FALLA  " + f));
  process.exit(1);
}

/* 5 · el documento semilla */
const proteger = (s) => s.split(CIERRE).join(MARCA_FIN);

/* Mismo orden que en el puente, y por el mismo motivo: la plantilla al
   final, porque al insertarla mete una copia de todas las marcas. */
const html = CASCARA
  .replace("%%REGISTRO%%", () => "[]")
  .replace("%%REACT%%", () => react)
  .replace("%%REACTDOM%%", () => reactDom)
  .replace("%%JUEGO%%", () => js)
  .replace("%%PLANTILLA%%", () => proteger(CASCARA));

/* ni una marca sin rellenar fuera de la isla de plantilla */
const islaIni = html.indexOf('<script type="text/plain" id="plantilla">');
const islaFin = html.indexOf(CIERRE + ">", islaIni);
const fuera = html.slice(0, islaIni) + html.slice(islaFin);
MARCAS.forEach((m) => {
  if (fuera.indexOf(m) >= 0) {
    console.log("FALLA  la marca " + m + " quedó sin rellenar en la parte viva del documento");
    process.exit(1);
  }
});

fs.writeFileSync(SALIDA, html);
const kb = Math.round(fs.statSync(SALIDA).size / 1024);
const islaKb = Math.round(proteger(CASCARA).length / 1024);
console.log("escrito " + SALIDA + "  (" + kb + " KB)");
console.log("isla de plantilla " + islaKb + " KB · el motor va en una sola copia");
if (/https?:\/\/(?!fonts\.googleapis|fonts\.gstatic)/.test(html.replace(/reactjs\.org|react\.dev/g, ""))) {
  console.log("AVISO: quedan referencias a hosts externos");
} else {
  console.log("sin dependencias de red salvo Google Fonts");
}
