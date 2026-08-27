/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

const p = require("@babel/parser");
const fs = require("fs");
const f = process.argv[2] || RUTA_FUENTE;
try {
  p.parse(fs.readFileSync(f, "utf8"), { sourceType: "module", plugins: ["jsx"] });
  console.log("OK sintaxis: " + f);
} catch (e) {
  console.log("FALLO: " + e.message);
  process.exit(1);
}
