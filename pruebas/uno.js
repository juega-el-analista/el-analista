/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Ejecuta UN escenario contra UN archivo, en su propio proceso.
   Uso: node uno.js <archivo.jsx> <escenario> [vueltas]
   Imprime una sola linea: OK <escenario>  |  FALLO <escenario> :: motivo */
const { cargar } = require(path.join(__dirname, "banco.js"));
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;

const ARCHIVO = process.argv[2] || RUTA_FUENTE;
const ESCENARIO = process.argv[3];
const VUELTAS = parseInt(process.argv[4] || "120", 10);

const fallos = [];
const salir = () => {
  if (fallos.length) {
    console.log("FALLO " + ESCENARIO + " :: " + fallos.slice(0, 3).join(" | "));
    process.exit(1);
  }
  console.log("OK " + ESCENARIO);
  process.exit(0);
};
process.on("uncaughtException", (e) => { console.log("FALLO " + ESCENARIO + " :: LANZO " + e.message); process.exit(1); });
process.on("unhandledRejection", (e) => { console.log("FALLO " + ESCENARIO + " :: RECHAZO " + (e && e.message)); process.exit(1); });
/* silenciamos el ruido de React sobre error boundaries para leer la salida */
console.error = () => {};
console.warn = () => {};

/* ---------- reloj falso ---------- */
let pendientes = [], sig = 1;
global.setTimeout = (fn, ms) => { const id = sig++; pendientes.push({ id, fn, en: ms || 0, rep: 0 }); return id; };
global.setInterval = (fn, ms) => { const id = sig++; pendientes.push({ id, fn, en: ms || 1, rep: ms || 1 }); return id; };
global.clearTimeout = (id) => { pendientes = pendientes.filter((p) => p.id !== id); };
global.clearInterval = global.clearTimeout;
function avanzar(ms) {
  let restante = ms, guardia = 0;
  while (restante > 0 && guardia++ < 5000) {
    if (!pendientes.length) break;
    const min = Math.min.apply(null, pendientes.map((p) => p.en));
    const paso = Math.max(0, Math.min(min, restante));
    pendientes.forEach((p) => { p.en -= paso; });
    restante -= paso || restante;
    pendientes.filter((p) => p.en <= 0).forEach((p) => {
      if (p.rep) p.en = p.rep; else pendientes = pendientes.filter((q) => q.id !== p.id);
      p.fn();
    });
  }
}
const microtareas = async (n) => { for (let i = 0; i < (n || 8); i++) await Promise.resolve(); };

function ventana(contenido) {
  const m = new Map();
  if (contenido != null) m.set("el-analista-partida", contenido);
  global.window = { localStorage: {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); },
  } };
}

function texto(j) {
  if (j == null) return "";
  if (typeof j === "string") return j;
  if (typeof j === "number") return String(j);
  if (Array.isArray(j)) return j.map(texto).join(" ");
  return texto(j.children);
}
const PROHIBIDO = ["NaN", "Infinity", "undefined", "[object Object]"];
const ROTO = "Algo se rompió";

const GUIA = ["Entendido, acepto", "Retomar", "Aprendiz", "Analista", "Empezar a los", "Elegir", "Graduarte de esto", "Empezar con esto", "Entendido, empezar", "Empezar",
  "Lo siguiente", "Cerrar el año", "Sentarte a hacer cuentas", "Seguir cinco años",
  "Retirarme ahora", "Ver el balance final", "Fijar", "Poner el número", "Cerrar posición"];

async function jugar(Juego, semilla, dobleClic) {
  let x = (semilla >>> 0) || 1;
  const rnd = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return (x % 100000) / 100000; };
  const real = Math.random;
  if (ESCENARIO !== "random-cero") Math.random = rnd;
  let r = null, cierres = 0;
  try {
    await act(async () => { r = TR.create(React.createElement(Juego)); await microtareas(); });
    for (let i = 0; i < VUELTAS; i++) {
      await act(async () => { avanzar(2000); await microtareas(); });
      const s = texto(r.toJSON());
      PROHIBIDO.forEach((p) => { if (s.indexOf(p) >= 0) fallos.push('v' + i + ' muestra "' + p + '"'); });
      if (s.indexOf(ROTO) >= 0) fallos.push("v" + i + " cayo en la frontera de error");
      if (fallos.length) break;
      if (s.indexOf("Así terminó") >= 0) cierres++;
      let bs = [];
      try { bs = r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) {}
      if (!bs.length) { await act(async () => { avanzar(4000); await microtareas(); }); continue; }
      let b = null;
      for (const g of GUIA) { const c = bs.filter((q) => texto(q.props.children).trim().indexOf(g) === 0); if (c.length) { b = c[Math.floor(rnd() * c.length) % c.length]; break; } }
      if (!b) b = bs[Math.floor(rnd() * bs.length) % bs.length];
      const ev = { target: { value: "50" }, preventDefault() {}, stopPropagation() {} };
      await act(async () => { b.props.onClick(ev); if (dobleClic) b.props.onClick(ev); await microtareas(); });
    }
  } finally { Math.random = real; try { await act(async () => { r && r.unmount(); }); } catch (e) {} }
  return cierres;
}

const B = { pais: "ve", estudio: "eco" };
const VENENOS = {
  "guardado-no-json": "{{{",
  "guardado-vacio": "{}",
  "guardado-sin-firma": JSON.stringify({ v: 5, ts: 1, s: Object.assign({}, B, { rango: 3 }) }),
  "guardado-rango-999": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { rango: 999 }) }),
  "guardado-seguir-99": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { seguir: 99 }) }),
  "guardado-cash-nulo": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { cash: null, cartera: "mucho", turno: 1e9 }) }),
  "guardado-bienes-falsos": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { bienes: ["yate-fantasma"], perks: ["hackeo"] }) }),
  "guardado-pesos-absurdos": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { pesos: { cripto: 99, acciones: -5 }, objetivo: 8 }) }),
  "guardado-listas-gigantes": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { titulares: new Array(3000).fill({ q: "x", t: "y" }), vistos: new Array(3000).fill(1) }) }),
  "guardado-fondo-corrupto": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { fondo: { tam: "grande", posiciones: "no soy arreglo", oferta: [{ n: null, ticket: "x" }] } }) }),
  "guardado-pais-inventado": JSON.stringify({ v: 5, ts: 1, f: "x", s: { pais: "atlantida", estudio: "hechiceria" } }),
  "guardado-version-futura": JSON.stringify({ v: 99, ts: 1, f: "x", s: B }),
  "guardado-rango-negativo": JSON.stringify({ v: 5, ts: 1, f: "x", s: Object.assign({}, B, { rango: -4, turno: -20 }) }),
};

(async () => {
  const Juego = cargar(ARCHIVO);
  if (VENENOS[ESCENARIO] !== undefined) { ventana(VENENOS[ESCENARIO]); await jugar(Juego, 424242, false); return salir(); }
  if (ESCENARIO.indexOf("normal-") === 0) { ventana(null); await jugar(Juego, parseInt(ESCENARIO.slice(7), 10) * 7919, false); return salir(); }
  if (ESCENARIO.indexOf("doble-") === 0) { ventana(null); await jugar(Juego, parseInt(ESCENARIO.slice(6), 10) * 104729, true); return salir(); }
  if (ESCENARIO === "storage-lanza") {
    global.window = { localStorage: { getItem() { throw new Error("bloqueado"); }, setItem() { throw new Error("cuota"); }, removeItem() { throw new Error("no"); } } };
    await jugar(Juego, 31337, false); return salir();
  }
  if (ESCENARIO === "storage-colgado") {
    global.window = { storage: { get: () => new Promise(() => {}), set: () => new Promise(() => {}), delete: () => new Promise(() => {}) } };
    await jugar(Juego, 271828, false); return salir();
  }
  if (ESCENARIO === "random-cero") { ventana(null); Math.random = () => 0; await jugar(Juego, 1, false); return salir(); }
  if (ESCENARIO === "random-uno") { ventana(null); Math.random = () => 0.9999999; await jugar(Juego, 1, false); return salir(); }
  console.log("FALLO " + ESCENARIO + " :: escenario desconocido");
  process.exit(1);
})();
