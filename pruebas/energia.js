const path = require("path");
/* ¿En qué banda de energía se vive de verdad, y se quiebra alguien alguna vez?
 *
 * Esta prueba existe por un bug que sobrevivió meses sin que nadie lo viera:
 * el suelo plano de energía la clavaba en 6 exactos para todo el mundo desde
 * el año 12, y como se aplicaba antes de comprobar el agotamiento, el sistema
 * de burnout entero era inalcanzable. Leyendo el código no se ve. Midiendo,
 * salta a la primera. Ver PLAN-ENERGIA.md.
 *
 * Se instrumenta el compilado en vez de tocar el motor, para que el juego que
 * se publica no lleve ganchos de prueba dentro. */
const fs = require("fs");
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
  let r = ms, g = 0;
  while (r > 0 && g++ < 4000) {
    if (!pend.length) break;
    const min = Math.min.apply(null, pend.map((p) => p.en));
    const paso = Math.max(0, Math.min(min, r));
    pend.forEach((p) => { p.en -= paso; });
    r -= paso || r;
    pend.filter((p) => p.en <= 0).forEach((p) => {
      if (p.rep) p.en = p.rep; else pend = pend.filter((q) => q.id !== p.id);
      p.fn();
    });
  }
}
const micro = async () => { for (let i = 0; i < 6; i++) await Promise.resolve(); };
/* Recompilar desde la fuente antes de medir. finales.js y alcance.js leen
   pruebas/compilado.js tal como esté, y ese archivo lo reescribe cualquier
   otra prueba que corra antes: medir sobre un compilado ajeno es medir otra
   versión del juego sin enterarse. */
require(path.join(__dirname, "banco.js")).cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
let src = fs.readFileSync(path.join(__dirname, "compilado.js"), "utf8");
src = src.replace("module.exports = ElAnalista;", "module.exports = { ElAnalista };");

/* Los dos puntos del cierre de año donde la energía queda fijada. Si alguno
   deja de encontrarse es porque se tocó el bucle de energía: esta prueba se
   cae a propósito para que quien lo tocó venga a mirarla. */
const GANCHOS = [
  ["st.ene = clamp(eneCruda + Math.round((100 - eneCruda) * RECUPERA), 0, 100);",
   " if (global.__ENE) global.__ENE.push(Math.round(st.ene));"],
  ["st.ene = 45;",
   " if (global.__Q) global.__Q.push(1); if (global.__ENE) global.__ENE.push(45);"],
];
GANCHOS.forEach(([marca, gancho]) => {
  if (src.split(marca).length !== 2) {
    /* con console.log a propósito: console.error está anulado más arriba
       para callar los avisos de React, y este mensaje no se puede perder */
    console.log("");
    console.log("  El gancho de medición ya no encaja:");
    console.log("    " + marca);
    console.log("  Se tocó el bucle de energía. Actualiza pruebas/energia.js y vuelve a medir.");
    console.log("");
    process.exit(1);
  }
  src = src.replace(marca, marca + gancho);
});
fs.writeFileSync(path.join(__dirname, "probeEne.js"), src);
const { ElAnalista } = require(path.join(__dirname, "probeEne.js"));

function txtDe(j) {
  if (j == null || j === false || j === true) return "";
  if (typeof j === "string") return j;
  if (typeof j === "number") return String(j);
  if (Array.isArray(j)) return j.map(txtDe).join(" ");
  if (j.type === "style") return "";
  if (j.children != null) return txtDe(j.children);
  if (j.props && j.props.children != null) return txtDe(j.props.children);
  return "";
}
const norm = (s) => s.replace(/\s+/g, " ").trim();

async function unaVida(semilla) {
  let s0 = semilla >>> 0 || 1;
  Math.random = () => { s0 ^= s0 << 13; s0 >>>= 0; s0 ^= s0 >> 17; s0 ^= s0 << 5; s0 >>>= 0; return (s0 % 100000) / 100000; };
  const mapa = new Map();
  global.window = { localStorage: { getItem: (k) => (mapa.has(k) ? mapa.get(k) : null), setItem: (k, v) => mapa.set(k, String(v)), removeItem: (k) => mapa.delete(k) } };
  let r = null;
  await act(async () => { r = TR.create(React.createElement(ElAnalista)); await micro(); });
  const bs = () => { try { return r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) { return []; } };
  const rot = (b) => norm(txtDe(b.props.children));
  const cls = (b) => String(b.props.className || "");
  const pulsa = async (b) => { if (!b) return false; await act(async () => { b.props.onClick({ target: { value: "50" }, preventDefault() {}, stopPropagation() {} }); await micro(); }); return true; };
  const porRot = (re) => bs().find((b) => re.test(rot(b)));

  await act(async () => { reloj(400); await micro(); });
  await pulsa(porRot(/acepto y quiero jugar/i));
  await pulsa(porRot(/^Empezar$/));
  /* La pantalla de identidad: genero y nombre. Esta prueba era anterior
     a ella y se quedaba clavada justo aqui, con las 20 partidas en
     duracion 0 y sin llegar nunca a una pantalla final. */
  await pulsa(porRot(/^(Femenino|Masculino|Prefiero no decirlo)$/));
  await pulsa(porRot(/^Seguir sin nombre$/));
  await pulsa(porRot(/^Analista/));
  await pulsa(porRot(/^Empezar a los 20/));
  const p = bs().filter((b) => /^Elegir$/.test(rot(b)));
  await pulsa(p[semilla % Math.max(1, p.length)] || p[0]);
  const c = bs().filter((b) => /^(Graduarte de esto|Empezar con esto)$/.test(rot(b)));
  await pulsa(c[semilla % Math.max(1, c.length)] || c[0]);
  /* y el ultimo paso: guia si o no */
  await pulsa(porRot(/^(Sé lo que hago|Guíame por el camino)$/));

  let ano = 0, pasos = 0, cargo = "Pasante", burnouts = 0, ultimaEne = null;
  while (pasos++ < 1600) {
    await act(async () => { reloj(2500); await micro(); });
    const j = r.toJSON();
    const t = norm(txtDe(j));
    if (/Algo se rompió/.test(t)) return { ano, fin: "error", cargo, burnouts, ene: ultimaEne };
    if (/Vivir otra vida/.test(t)) {
      const ver = (t.match(/años · .+? · .+? (.+?) (Cargo final|Tu reputación|Llegaste|Terminaste|Con |Trabajaste|El cargo|Tu patrimonio)/) || [])[1] || "";
      const cf = (t.match(/Cargo final (.+?) Rama/) || [])[1] || cargo;
      return { ano, fin: norm(ver).slice(0, 46) || "fin", cargo: cf, burnouts, ene: ultimaEne };
    }
    const mEne = t.match(/ENERGÍA (\d+)|Energía (\d+)/);
    if (mEne) ultimaEne = Number(mEne[1] || mEne[2]);
    const mC = t.match(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ ]+?) [A-ZÁÉÍÓÚÑ]/);
    if (mC) cargo = mC[1];
    if (/Te quiebras/.test(t)) burnouts++;
    if (/Así terminó/.test(t)) ano++;
    if (await pulsa(porRot(/^Retirarme ahora$/))) continue;
    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) { await pulsa(ops[Math.floor(Math.random() * ops.length) % ops.length]); continue; }
    /* Los emergentes (guia, ficha de seccion nueva, panel de seccion)
       hay que poder cerrarlos, o la prueba se queda dentro de uno y la
       partida no avanza nunca. Van primero, justo por eso. */
    if (await pulsa(porRot(/^(Entendido|Después|Ver la sección|Cerrar y volver|Aplica o descarta|✕)$/))) continue;
    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el número|Cerrar posición|Aguantar|Comprar|Empezar 20|Poner el capital|Sentarte a hacer|Ver el balance)/))) continue;
    let z = null;
    try { z = r.root.findAll((x) => x.props && x.props.role === "button" && typeof x.props.onClick === "function")[0]; } catch (e) {}
    if (z) { await act(async () => { z.props.onClick({}); await micro(); }); continue; }
    /* En Banderas Rojas hay que marcar tres casillas distintas. Coger
       siempre la primera la marcaba y desmarcaba en bucle: hay que
       elegir una que aún no lleve la X. */
    const libres = bs().filter((b) => /^ea-check/.test(cls(b)) && !/^X\b/.test(rot(b)));
    if (libres.length) { await pulsa(libres[0]); continue; }
    const o = bs().find((b) => /^ea-(check|celdaC|ordenI|btn|mini)/.test(cls(b)));
    if (o) { await pulsa(o); continue; }
    await act(async () => { reloj(5000); await micro(); });
  }
  /* diagnostico: que habia en pantalla cuando se quedo sin salida */
  const j = r.toJSON();
  const tt = norm(txtDe(j));
  const bot = bs().map(rot).slice(0, 8);
  return { ano, fin: "se quedó colgada", cargo, burnouts, ene: ultimaEne,
    pantalla: tt.slice(tt.indexOf("CUBRE TUS GASTOS") >= 0 ? tt.indexOf("CUBRE TUS GASTOS") + 20 : 0, 200), botones: bot };
}

/* Los umbrales no son gustos: salen de lo que se midió al rebalancear.
   Ver la tabla en PLAN-ENERGIA.md. */
const MIN_RANGO = 20;    /* p90 - p10: por debajo de esto la energía es una constante disfrazada */
const BANDA = [40, 70];  /* dónde debe caer la mediana, o el gradiente está descentrado */
const PISO = 15;         /* nadie debería cerrar un año por debajo: para eso está la quiebra */

(async () => {
  const N = Number(process.argv[2] || 20);
  global.__ENE = []; global.__Q = [];
  const vidas = [];
  for (let i = 0; i < N; i++) { vidas.push(await unaVida(1000003 * (i + 1))); process.stdout.write("."); }
  console.log("");

  const E = global.__ENE.slice().sort((a, b) => a - b);
  if (!E.length) { console.log("  no se cerró ningún año: la prueba no midió nada"); process.exit(1); }
  const pc = (p) => E[Math.min(E.length - 1, Math.floor(E.length * p))];
  const media = E.reduce((a, c) => a + c, 0) / E.length;
  const banda = [0, 0, 0, 0, 0];
  E.forEach((v) => banda[Math.min(4, Math.floor(v / 20))]++);
  const pct = (n) => Math.round((n / E.length) * 100) + "%";

  console.log("  " + N + " vidas · " + E.length + " cierres de año medidos");
  console.log("");
  console.log("  min " + E[0] + " · p10 " + pc(0.1) + " · mediana " + pc(0.5)
    + " · p90 " + pc(0.9) + " · max " + E[E.length - 1] + " · media " + media.toFixed(1));
  console.log("");
  console.log("  en el suelo   0-19   " + String(banda[0]).padStart(4) + "  " + pct(banda[0]));
  console.log("  cansado      20-39   " + String(banda[1]).padStart(4) + "  " + pct(banda[1]));
  console.log("  normal       40-59   " + String(banda[2]).padStart(4) + "  " + pct(banda[2]));
  console.log("  descansado   60-79   " + String(banda[3]).padStart(4) + "  " + pct(banda[3]));
  console.log("  entero       80-100  " + String(banda[4]).padStart(4) + "  " + pct(banda[4]));
  console.log("");
  console.log("  quiebras: " + global.__Q.length + " en " + N + " vidas");
  console.log("");

  const fallos = [];
  const rango = pc(0.9) - pc(0.1);
  if (rango < MIN_RANGO) fallos.push("la energía apenas se mueve: p90-p10 = " + rango + ", mínimo " + MIN_RANGO
    + ". Si no varía, ningún jugador puede notar qué la afecta.");
  if (pc(0.5) < BANDA[0] || pc(0.5) > BANDA[1]) fallos.push("la mediana está en " + pc(0.5)
    + ", fuera de " + BANDA[0] + "-" + BANDA[1] + ": el gradiente quedó descentrado y penaliza o premia a todo el mundo.");
  if (E[0] < PISO) fallos.push("hay cierres de año con energía " + E[0]
    + ": por debajo de " + PISO + " debería haberse disparado la quiebra.");
  if (!global.__Q.length) fallos.push("nadie se quebró en " + N + " vidas: el burnout volvió a ser inalcanzable.");

  if (fallos.length) { fallos.forEach((f) => console.log("  x  " + f)); console.log(""); process.exit(1); }
  console.log("  la energía se mueve, está centrada y el burnout es alcanzable");
})();
