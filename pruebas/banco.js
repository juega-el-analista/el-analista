/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "index.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* ============================================================
   Banco de pruebas de El Analista.
   Monta el juego de verdad en jsdom, juega partidas completas
   pulsando botones al azar, y ataca los puntos que un ingeniero
   usaria para tumbarlo: guardado manipulado, doble clic, Math.random
   secuestrado, localStorage roto.
   ============================================================ */
const fs = require("fs");
const babel = require("@babel/core");

const ARCHIVO = process.argv[2] || RUTA_FUENTE;

/* --- transpilar el JSX a CommonJS y cargarlo --- */
function cargar(archivo) {
  const src = fs.readFileSync(archivo, "utf8");
  const out = babel.transformSync(src, {
    filename: "juego.jsx",
    presets: [
      [require.resolve("@babel/preset-react"), { runtime: "classic" }],
    ],
    plugins: [],
    sourceType: "module",
    configFile: false,
    babelrc: false,
    /* pasado el medio mega Babel compacta solo y desaparecen los saltos
       de línea en los que se apoyaban las sustituciones de abajo */
    compact: false,
  }).code;
  /* module -> CJS a mano, sin depender de preset-env.
     Sin anclar a principio de línea: Babel emite helpers antes del import. */
  const antes = out;
  const cjs = out
    .replace(/import\s+React\s*,\s*\{([^}]*)\}\s*from\s*["']react["'];?/,
      'const React = require("react"); const {$1} = React;')
    .replace(/export\s+default\s+function\s+ElAnalista/, "function ElAnalista")
    + "\nmodule.exports = ElAnalista;\n";
  if (cjs.indexOf("import React") >= 0 || cjs.indexOf("export default") >= 0) {
    throw new Error("no se pudo convertir a CommonJS: quedan restos de ESM");
  }
  const ruta = path.join(__dirname, "compilado.js");
  fs.writeFileSync(ruta, cjs);
  delete require.cache[ruta];
  return require(ruta);
}

/* --- jsdom minimo hecho a mano seria fragil: usamos react-dom/server
       para el render inicial y react-test-renderer para interactuar --- */
const React = require("react");

module.exports = { cargar, React };

if (require.main === module) {
  const Juego = cargar(ARCHIVO);
  console.log("modulo cargado, tipo:", typeof Juego);
}
