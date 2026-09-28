/* ============================================================
   ¿CADA CUÁNTO SE VE UNA OPCIÓN BLOQUEADA?
   Una puerta cerrada que no se ve nunca no existe. Esta prueba juega
   partidas enteras y cuenta cuántas escenas traían al menos una opción
   apagada por falta de energía, criterio, modelaje o red, y con qué
   atributos estaba el jugador cuando pasó.

   Se corre con:  node pruebas/puertas.js [partidas]
   ============================================================ */
const path = require("path");
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

let pend = [], sig = 1;
global.setTimeout = (fn, ms) => { const id = sig++; pend.push({ id, fn, en: ms || 0, rep: 0 }); return id; };
global.setInterval = (fn, ms) => { const id = sig++; pend.push({ id, fn, en: ms || 1, rep: ms || 1 }); return id; };
global.clearTimeout = (id) => { pend = pend.filter((p) => p.id !== id); };
global.clearInterval = global.clearTimeout;
function reloj(ms) {
  let r = ms;
  while (r > 0 && pend.length) {
    const paso = Math.min(r, Math.min.apply(null, pend.map((p) => p.en)));
    pend.forEach((p) => { p.en -= paso; });
    r -= paso || r;
    pend.filter((p) => p.en <= 0).forEach((p) => {
      if (p.rep) p.en = p.rep; else pend = pend.filter((q) => q.id !== p.id);
      p.fn();
    });
  }
}
const micro = async () => { for (let i = 0; i < 6; i++) await Promise.resolve(); };

const { cargar } = require(path.join(__dirname, "banco.js"));
const ElAnalista = cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));

function txtDe(j) {
  if (j == null || j === false || j === true) return "";
  if (typeof j === "string") return j;
  if (typeof j === "number") return String(j);
  if (Array.isArray(j)) return j.map(txtDe).join(" ");
  if (j.type === "style") return "";
  /* Dos formas distintas: los nodos de r.toJSON() llevan .children, y los
     elementos de React que salen de findAllByType los llevan en
     .props.children. Sin la segunda, esto leia vacio cualquier etiqueta
     anidada —que es justo lo que queremos leer aqui. */
  if (j.props && j.props.children != null) return txtDe(j.props.children);
  if (j.children != null) return txtDe(j.children);
  return "";
}
const norm = (t) => String(t).replace(/\s+/g, " ").trim();

async function unaVida(semilla, cuenta) {
  let x = semilla;
  const real = Math.random;
  Math.random = () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648; };
  const mapa = new Map();
  global.window = { localStorage: {
    getItem: (k) => (mapa.has(k) ? mapa.get(k) : null),
    setItem: (k, v) => mapa.set(k, String(v)),
    removeItem: (k) => mapa.delete(k),
  } };
  let r = null;
  try {
    await act(async () => { r = TR.create(React.createElement(ElAnalista)); await micro(); });
    const bs = () => { try { return r.root.findAllByType("button").filter((b) => b.props.onClick); } catch (e) { return []; } };
    const libres = () => bs().filter((b) => !b.props.disabled);
    const rot = (b) => norm(txtDe(b.props.children));
    const cls = (b) => String(b.props.className || "");
    const pulsa = async (b) => { if (!b) return false; await act(async () => { b.props.onClick({ target: { value: "50" }, preventDefault() {}, stopPropagation() {} }); await micro(); }); return true; };
    const porRot = (re) => libres().find((b) => re.test(rot(b)));

    await act(async () => { reloj(400); await micro(); });
    await pulsa(porRot(/acepto y quiero jugar/i));
    await pulsa(porRot(/^Jugar ya$/));
    /* «Jugar ya» abre la configuración: se pasa con lo que venga por defecto */
    await pulsa(porRot(/^Seguir sin nombre$/));
    await pulsa(porRot(/^Empezar a los 20/));
    await pulsa(libres().filter((b) => /^Elegir$/.test(rot(b)))[1] || libres().filter((b) => /^Elegir$/.test(rot(b)))[0]);
    await pulsa(libres().filter((b) => /^(Graduarte de esto|Empezar con esto)$/.test(rot(b)))[0]);
    await pulsa(porRot(/^(Guíame por el camino|Sé lo que hago)/));

    for (let i = 0; i < 1400; i++) {
      await act(async () => { reloj(2500); await micro(); });
      const t = norm(txtDe(r.toJSON()));
      if (/Vivir otra vida|Algo se rompió/.test(t)) break;

      /* lo que nos interesa: opciones apagadas por falta de algo */
      const apagadas = bs().filter((b) => /sinfuerza/.test(cls(b)));
      if (apagadas.length) {
        cuenta.escenas += 1;
        cuenta.opciones += apagadas.length;
        apagadas.forEach((b) => {
          const m = norm(txtDe(b.props.children)).match(/(Energía|Criterio|Modelaje|Red|Reputación)\s+(\d+)\s+de\s+(\d+)/i);
          if (m) {
            const k = m[1].toLowerCase();
            cuenta.porAtributo[k] = (cuenta.porAtributo[k] || 0) + 1;
            cuenta.ejemplos.push("te faltaba " + m[1].toLowerCase() + ": tenías " + m[2] + " y pedía " + m[3]);
          }
        });
      }
      const mA = t.match(/Así terminó (\d{4})/);
      if (mA && mA[1] !== cuenta._ult) { cuenta._ult = mA[1]; cuenta.anos += 1; }

      if (await pulsa(porRot(/^Ver el año$/))) continue;
      if (await pulsa(porRot(/^(Lo siguiente que pas|Cerrar el año|Entendido, empezar|Empezar$|Continuar|Siguiente|Terminar|Ya lo tengo|Después|Entendido|Empezar 20|Sentarte a hacer|Ver el balance|Retirarme ahora)/))) continue;
      const ops = libres().filter((b) => /(^| )ea-op( |$)/.test(cls(b)));
      if (ops.length) { await pulsa(ops[Math.floor(Math.random() * ops.length) % ops.length]); continue; }
      const tab = libres().find((b) => /^ea-(check|celdaC|ordenI|mini|btn)/.test(cls(b)));
      if (tab) { await pulsa(tab); continue; }
      await act(async () => { reloj(5000); await micro(); });
    }
  } finally {
    Math.random = real;
    try { await act(async () => { r && r.unmount(); }); } catch (e) {}
  }
}

(async () => {
  const N = Number(process.argv[2] || 12);
  const cuenta = { escenas: 0, opciones: 0, anos: 0, porAtributo: {}, ejemplos: [], _ult: null };
  for (let i = 0; i < N; i++) { cuenta._ult = null; await unaVida(1000003 * (i + 1), cuenta); process.stdout.write("."); }
  console.log("\n");
  console.log("  " + N + " partidas · " + cuenta.anos + " años jugados en total");
  console.log("");
  console.log("  escenas con alguna opción bloqueada: " + cuenta.escenas);
  console.log("  opciones bloqueadas en total:        " + cuenta.opciones);
  console.log("  una cada " + (cuenta.anos ? (cuenta.anos / Math.max(1, cuenta.escenas)).toFixed(1) : "?") + " años de juego");
  console.log("");
  console.log("  por atributo:");
  const ks = Object.keys(cuenta.porAtributo);
  if (!ks.length) console.log("    ninguna");
  ks.sort((a, b) => cuenta.porAtributo[b] - cuenta.porAtributo[a])
    .forEach((k) => console.log("    " + String(cuenta.porAtributo[k]).padStart(3) + "x  " + k));
  console.log("");
  console.log("  ejemplos:");
  cuenta.ejemplos.slice(0, 8).forEach((e) => console.log("    · " + e));
})();
