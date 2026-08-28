/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "index.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Prueba dirigida: forzar la cadena noviazgo -> matrimonio -> hijo.
   El jugador elige SIEMPRE la primera opción de cada memorando, que es
   la que avanza la vida personal. Si con esto no aparece, hay un bug. */
const { cargar } = require(path.join(__dirname, "banco.js"));
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

let pendientes = [], sig = 1;
global.setTimeout = (fn, ms) => { const id = sig++; pendientes.push({ id, fn, en: ms || 0, rep: 0 }); return id; };
global.setInterval = (fn, ms) => { const id = sig++; pendientes.push({ id, fn, en: ms || 1, rep: ms || 1 }); return id; };
global.clearTimeout = (id) => { pendientes = pendientes.filter((p) => p.id !== id); };
global.clearInterval = global.clearTimeout;
function avanzar(ms) {
  let r = ms, g = 0;
  while (r > 0 && g++ < 5000) {
    if (!pendientes.length) break;
    const min = Math.min.apply(null, pendientes.map((p) => p.en));
    const paso = Math.max(0, Math.min(min, r));
    pendientes.forEach((p) => { p.en -= paso; });
    r -= paso || r;
    pendientes.filter((p) => p.en <= 0).forEach((p) => {
      if (p.rep) p.en = p.rep; else pendientes = pendientes.filter((q) => q.id !== p.id);
      p.fn();
    });
  }
}
const micro = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
global.window = { localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} } };
function texto(j) {
  if (j == null) return "";
  if (typeof j === "string") return j;
  if (typeof j === "number") return String(j);
  if (Array.isArray(j)) return j.map(texto).join(" ");
  return texto(j.children);
}

const HITOS = {
  "escena: alguien que te importa": "Alguien que te importa",
  "escena: la conversación": "La conversación",
  "escena: un hijo": "Un hijo",
  "estado: en pareja": "en pareja",
  "estado: casado": "casado",
  "estado: 1 hijo": "1 hijo",
};
const visto = {};
Object.keys(HITOS).forEach((k) => { visto[k] = 0; });

async function partida(Juego, semilla, vueltas) {
  let x = (semilla >>> 0) || 1;
  const rnd = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return (x % 100000) / 100000; };
  const real = Math.random; Math.random = rnd;
  let r = null;
  try {
    await act(async () => { r = TR.create(React.createElement(Juego)); await micro(); });
    for (let i = 0; i < vueltas; i++) {
      await act(async () => { avanzar(2200); await micro(); });
      const s = texto(r.toJSON());
      Object.keys(HITOS).forEach((k) => { if (s.indexOf(HITOS[k]) >= 0) visto[k]++; });
      let bs = [];
      try { bs = r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) {}
      if (!bs.length) { await act(async () => { avanzar(4000); await micro(); }); continue; }
      /* preferencia: opciones del memorando (clase ea-op) -> la primera */
      let b = bs.filter((q) => String(q.props.className || "").indexOf("ea-op") === 0)[0];
      if (!b) {
        const GUIA = ["Entendido, acepto", "Analista", "Empezar a los 20", "Elegir", "Graduarte de esto", "Empezar con esto", "Entendido, empezar",
          "Ya lo tengo", "Siguiente", "Terminar", "Continuar", "Empezar", "Lo siguiente", "Cerrar el año",
          "Cerrar el trato", "Fijar", "Poner el número", "Cerrar posición", "Sentarte a hacer cuentas",
          "Seguir cinco años", "Retirarme ahora", "Ver el balance final"];
        for (const g of GUIA) { const c = bs.filter((q) => texto(q.props.children).trim().indexOf(g) === 0); if (c.length) { b = c[0]; break; } }
      }
      if (!b) b = bs[Math.floor(rnd() * bs.length) % bs.length];
      const ev = { target: { value: "50" }, preventDefault() {}, stopPropagation() {} };
      await act(async () => { b.props.onClick(ev); await micro(); });
    }
  } finally { Math.random = real; try { await act(async () => { r && r.unmount(); }); } catch (e) {} }
}

(async () => {
  const Juego = cargar(RUTA_FUENTE);
  const N = parseInt(process.argv[2] || "25", 10);
  for (let s = 1; s <= N; s++) { await partida(Juego, s * 40503, 300); process.stdout.write("."); }
  console.log("\n");
  Object.keys(HITOS).forEach((k) => {
    console.log((visto[k] > 0 ? "  visto  " : "  NUNCA  ") + k.padEnd(32) + (visto[k] > 0 ? "x" + visto[k] : ""));
  });
})();
