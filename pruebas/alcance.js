const path = require("path");
/* ¿Cuánto del contenido escrito ve de verdad un jugador ahora? */
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
src = src.replace("module.exports = ElAnalista;", "module.exports = { ElAnalista, E, D, VIDA };");
fs.writeFileSync(path.join(__dirname, "probeA.js"), src);
const M = require(path.join(__dirname, "probeA.js"));

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
function porClase(json, clase) {
  const out = [];
  (function rec(x) {
    if (!x || typeof x !== "object") return;
    const c = x.props && x.props.className;
    if (typeof c === "string" && c.split(" ").includes(clase)) out.push(norm(txtDe(x)));
    (x.children || []).forEach(rec);
  })(json);
  return out;
}

const TITULOS_E = new Set(M.E.concat(M.D).map((e) => norm(String(e.t || ""))));
const TITULOS_V = new Set(M.VIDA.map((e) => norm(String(e.t || ""))));

async function unaVida(semilla, vistos, hitos) {
  let s0 = semilla >>> 0 || 1;
  Math.random = () => { s0 ^= s0 << 13; s0 >>>= 0; s0 ^= s0 >> 17; s0 ^= s0 << 5; s0 >>>= 0; return (s0 % 100000) / 100000; };
  const mapa = new Map();
  global.window = { localStorage: { getItem: (k) => (mapa.has(k) ? mapa.get(k) : null), setItem: (k, v) => mapa.set(k, String(v)), removeItem: (k) => mapa.delete(k) } };
  let r = null;
  await act(async () => { r = TR.create(React.createElement(M.ElAnalista)); await micro(); });
  const bs = () => { try { return r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) { return []; } };
  const rot = (b) => norm(txtDe(b.props.children));
  const cls = (b) => String(b.props.className || "");
  const pulsa = async (b) => { if (!b) return false; await act(async () => { b.props.onClick({ target: { value: "50" }, preventDefault() {}, stopPropagation() {} }); await micro(); }); return true; };
  const porRot = (re) => bs().find((b) => re.test(rot(b)));

  await act(async () => { reloj(400); await micro(); });
  await pulsa(porRot(/acepto y quiero/i));
  await pulsa(porRot(/^Empezar$/));
  await pulsa(porRot(/^Seguir sin nombre|^Seguir como/));
  await pulsa(porRot(/^Analista/));
  await pulsa(porRot(/^Empezar a los 20/));
  const p = bs().filter((b) => /^Elegir$/.test(rot(b)));
  await pulsa(p[semilla % Math.max(1, p.length)] || p[0]);
  const c = bs().filter((b) => /^(Graduarte de esto|Empezar con esto)$/.test(rot(b)));
  await pulsa(c[semilla % Math.max(1, c.length)] || c[0]);
  await pulsa(porRot(/^Sé lo que hago/));

  let ano = 0, pasos = 0;
  while (pasos++ < 1600) {
    await act(async () => { reloj(2500); await micro(); });
    const j = r.toJSON();
    const t = norm(txtDe(j));
    if (/Algo se rompió/.test(t) || /Vivir otra vida/.test(t)) break;
    const tit = porClase(j, "ea-memoTit")[0];
    if (tit) {
      if (TITULOS_E.has(tit)) vistos.add(tit);
      if (TITULOS_V.has(tit)) hitos.add(tit);
    }
    if (/Así terminó/.test(t)) ano++;
    if (await pulsa(porRot(/^Retirarme ahora$/))) continue;
    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) { await pulsa(ops[Math.floor(Math.random() * ops.length) % ops.length]); continue; }
    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el|Cerrar posición|Aguantar|Comprar|Empezar 20|Sentarte a hacer|Ver el balance)/))) continue;
    const libres = bs().filter((b) => /^ea-check/.test(cls(b)) && !/^X\b/.test(rot(b)));
    if (libres.length) { await pulsa(libres[0]); continue; }
    let z = null;
    try { z = r.root.findAll((x) => x.props && x.props.role === "button" && typeof x.props.onClick === "function")[0]; } catch (e) {}
    if (z) { await act(async () => { z.props.onClick({}); await micro(); }); continue; }
    const o = bs().find((b) => /^ea-(celdaC|ordenI|btn|mini)/.test(cls(b)));
    if (o) { await pulsa(o); continue; }
    await act(async () => { reloj(5000); await micro(); });
  }
  return ano;
}

(async () => {
  const N = Number(process.argv[2] || 10);
  const vistos = new Set(), hitos = new Set();
  let anos = 0;
  for (let i = 0; i < N; i++) { anos += await unaVida(1000003 * (i + 1), vistos, hitos); process.stdout.write("."); }
  console.log("\n");
  console.log("  " + N + " vidas, " + (anos / N).toFixed(1) + " años de media");
  console.log("");
  console.log("  ESCENAS DE CARRERA vistas al menos una vez: " + vistos.size + " de " + TITULOS_E.size
    + "   (" + Math.round(vistos.size / TITULOS_E.size * 100) + "%)");
  console.log("  ESCENAS DE VIDA vistas al menos una vez:    " + hitos.size + " de " + TITULOS_V.size
    + "   (" + Math.round(hitos.size / TITULOS_V.size * 100) + "%)");
  console.log("");
  const faltanV = Array.from(TITULOS_V).filter((x) => !hitos.has(x));
  if (faltanV.length) { console.log("  escenas de vida que nunca salieron:"); faltanV.forEach((x) => console.log("    · " + x)); }
})();
