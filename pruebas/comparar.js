/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Corre toda la bateria contra los dos archivos y compara. */
const { execFileSync } = require("child_process");

const ESCENARIOS = [
  "normal-1", "normal-2", "normal-3", "normal-4", "normal-5", "normal-6",
  "doble-1", "doble-2", "doble-3", "doble-4",
  "guardado-no-json", "guardado-vacio", "guardado-sin-firma", "guardado-rango-999",
  "guardado-seguir-99", "guardado-cash-nulo", "guardado-bienes-falsos",
  "guardado-pesos-absurdos", "guardado-listas-gigantes", "guardado-fondo-corrupto",
  "guardado-pais-inventado", "guardado-version-futura", "guardado-rango-negativo",
  "storage-lanza", "storage-colgado", "random-cero", "random-uno",
];

const ARCHIVOS = [
  ["ORIGINAL ", RUTA_ORIGINAL],
  ["BLINDADO ", RUTA_FUENTE],
];

function correr(archivo, esc) {
  try {
    const out = execFileSync(process.execPath, [path.join(__dirname, "uno.js"), archivo, esc, "120"],
      { cwd: __dirname, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 120000 });
    const linea = out.trim().split("\n").filter((l) => l.indexOf("OK ") === 0 || l.indexOf("FALLO ") === 0).pop() || out.trim();
    return { ok: linea.indexOf("OK ") === 0, linea };
  } catch (e) {
    const out = (e.stdout || "").toString().trim();
    const linea = out.split("\n").filter((l) => l.indexOf("FALLO ") === 0).pop();
    return { ok: false, linea: linea || ("FALLO " + esc + " :: proceso murio (" + (e.signal || e.status) + ")") };
  }
}

const res = {};
ARCHIVOS.forEach(([et, ar]) => { res[et] = {}; });

const anchoEsc = Math.max.apply(null, ESCENARIOS.map((e) => e.length));
console.log("escenario".padEnd(anchoEsc) + "   ORIGINAL   BLINDADO");
console.log("-".repeat(anchoEsc + 22));
let malOrig = [], malBlin = [];
ESCENARIOS.forEach((esc) => {
  const a = correr(ARCHIVOS[0][1], esc);
  const b = correr(ARCHIVOS[1][1], esc);
  if (!a.ok) malOrig.push(a.linea);
  if (!b.ok) malBlin.push(b.linea);
  console.log(esc.padEnd(anchoEsc) + "   " + (a.ok ? "  ok    " : " FALLA  ") + "   " + (b.ok ? "  ok" : " FALLA"));
});

console.log("");
console.log("ORIGINAL: " + (ESCENARIOS.length - malOrig.length) + "/" + ESCENARIOS.length + " escenarios superados");
malOrig.forEach((l) => console.log("   x " + l));
console.log("BLINDADO: " + (ESCENARIOS.length - malBlin.length) + "/" + ESCENARIOS.length + " escenarios superados");
malBlin.forEach((l) => console.log("   x " + l));
