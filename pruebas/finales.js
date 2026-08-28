const path = require("path");
/* ¿Cuántas vidas llegan al final y cómo terminan? */
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
let src = fs.readFileSync(path.join(__dirname, "compilado.js"), "utf8");
src = src.replace("module.exports = ElAnalista;", "module.exports = { ElAnalista };");
fs.writeFileSync(path.join(__dirname, "probeFin.js"), src);
const { ElAnalista } = require(path.join(__dirname, "probeFin.js"));

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

(async () => {
  const N = Number(process.argv[2] || 20);
  const res = [];
  for (let i = 0; i < N; i++) { res.push(await unaVida(1000003 * (i + 1))); process.stdout.write("."); }
  console.log("\n");
  const llegan = res.filter((x) => x.ano >= 30).length;
  const media = (res.reduce((a, x) => a + x.ano, 0) / res.length).toFixed(1);
  console.log("  vidas jugadas: " + res.length);
  console.log("  años cerrados de media: " + media + " de 30");
  console.log("  llegan a los 30 años: " + llegan + " de " + res.length + "  (" + Math.round(llegan / res.length * 100) + "%)");
  console.log("");
  const porFin = {};
  res.forEach((x) => { porFin[x.fin] = (porFin[x.fin] || 0) + 1; });
  console.log("  cómo terminan:");
  Object.keys(porFin).sort((a, b) => porFin[b] - porFin[a]).forEach((k) => console.log("    " + String(porFin[k]).padStart(2) + "x  " + k));
  console.log("");
  const cargos = {};
  res.forEach((x) => { cargos[x.cargo] = (cargos[x.cargo] || 0) + 1; });
  console.log("  cargo alcanzado:");
  Object.keys(cargos).sort((a, b) => cargos[b] - cargos[a]).forEach((k) => console.log("    " + String(cargos[k]).padStart(2) + "x  " + k));
  console.log("");
  console.log("  duración por vida: " + res.map((x) => x.ano).join(", "));
  console.log("");
  console.log("  dónde se quedaron colgadas:");
  res.filter((x) => x.pantalla).slice(0, 4).forEach((x) => {
    console.log("    pantalla: " + String(x.pantalla).slice(0, 150));
    console.log("    botones:  " + JSON.stringify(x.botones));
  });
})();
