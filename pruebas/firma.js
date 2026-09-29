/* ============================================================
   CUANDO LA FIRMA ES TUYA
   Con firma propia no pueden llegar ofertas de trabajo ni ascensos de
   empleado, y sí tienen que llegar las decisiones de dueño. Esta prueba
   revisa las tablas y después juega partidas de verdad que ya empiezan
   con la firma montada, mirando qué escenas salen.

   Se corre con:  npm run firma
   ============================================================ */
const path = require("path");
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

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const tmp = path.join(__dirname, "probeFirma.js");
fs.writeFileSync(tmp, fs.readFileSync(path.join(__dirname, "compilado.js"), "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { ElAnalista, E, D, LEGENDARIAS, DUENO, SOLO_EMPLEADO, ESCENAS_FIJAS, BASE, sanear, firma, VERSION, CLAVE };"));
const M = require(tmp);
try { fs.unlinkSync(tmp); } catch (e) {}

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txtDe = (j) => (j == null || j === false || j === true ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txtDe).join(" ") : j.type === "style" ? "" : j.children != null ? txtDe(j.children)
  : j.props && j.props.children != null ? txtDe(j.props.children) : "");
const norm = (s) => s.replace(/\s+/g, " ").trim();

/* ---- las tablas ---- */
const ids = M.ESCENAS_FIJAS.map((e) => e.id);
ok(ids.length === new Set(ids).size, "ningún número de escena repetido (" + ids.length + " escenas)");
ok(M.DUENO.every((e) => ids.indexOf(e.id) >= 0), "las " + M.DUENO.length + " escenas de dueño están registradas y se recuperan al retomar");
const todas = [].concat(M.E, M.D, M.LEGENDARIAS);
ok(M.SOLO_EMPLEADO.every((id) => todas.some((e) => e.id === id)), "las " + M.SOLO_EMPLEADO.length + " escenas de empleado existen");
const cuesta = (o) => !!o.j || Object.values(o.d || {}).some((v) => typeof v === "number" && v < 0);
ok(M.DUENO.every((e) => e.o.every(cuesta)), "ninguna opción de dueño es gratis: todas cuestan algo");

const TIT_EMPLEADO = new Set(todas.filter((e) => M.SOLO_EMPLEADO.indexOf(e.id) >= 0).map((e) => norm(e.t)));
const TIT_DUENO = new Set(M.DUENO.map((e) => norm(e.t)));

/* ---- partidas que empiezan con la firma ya montada ---- */
async function unaVida(semilla) {
  let s0 = semilla >>> 0 || 1;
  Math.random = () => { s0 ^= s0 << 13; s0 >>>= 0; s0 ^= s0 >> 17; s0 ^= s0 << 5; s0 >>>= 0; return (s0 % 100000) / 100000; };
  const st = M.sanear(Object.assign({}, M.BASE, {
    pais: "co", estudio: "ing", rango: 4, carrera: 115, turno: 8, meta: 30, edadIni: 20,
    red: 70, rep: 70, cri: 70, mod: 70, ene: 80, cash: 250000, cartera: 300000,
    propia: true, patron: "Tu propia constructora", rama: "boutique", contrato: null,
    abiertos: ["cartera", "vida", "banco", "inmuebles", "mejoras", "fondo"], vistos: [], cola: [],
  }));
  const cuerpo = JSON.stringify(st);
  const mapa = new Map([[M.CLAVE, JSON.stringify({ v: M.VERSION, ts: Date.now(), f: M.firma(cuerpo), s: st })],
    ["el-analista-aviso-leido", "1"]]);
  global.window = { localStorage: { getItem: (k) => (mapa.has(k) ? mapa.get(k) : null), setItem: (k, v) => mapa.set(k, String(v)), removeItem: (k) => mapa.delete(k) } };
  let r = null;
  await act(async () => { r = TR.create(React.createElement(M.ElAnalista)); await micro(); });
  const bs = () => { try { return r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) { return []; } };
  const rot = (b) => norm(txtDe(b.props.children));
  const cls = (b) => String(b.props.className || "");
  const pulsa = async (b) => { if (!b) return false; await act(async () => { b.props.onClick({ target: { value: "50" }, preventDefault() {}, stopPropagation() {} }); await micro(); }); return true; };
  const porRot = (re) => bs().find((b) => re.test(rot(b)));
  const vistas = [];
  let anos = 0, ultimo = null;
  for (let pasos = 0; pasos < 900 && anos < 8; pasos++) {
    await act(async () => { reloj(2500); await micro(); });
    const j = r.toJSON();
    const t = norm(txtDe(j));
    if (/Algo se rompió|Vivir otra vida/.test(t)) break;
    const tit = (() => { let out = null; (function rec(x) { if (out || !x || typeof x !== "object") return;
      const c = x.props && x.props.className; if (typeof c === "string" && c.split(" ").includes("ea-memoTit")) { out = norm(txtDe(x)); return; }
      (x.children || []).forEach(rec); })(j); return out; })();
    if (tit && tit !== vistas[vistas.length - 1]) vistas.push(tit);
    const mA = t.match(/Así terminó (\d{4})/);
    if (mA && mA[1] !== ultimo) { ultimo = mA[1]; anos++; }
    if (await pulsa(porRot(/^Retomar$/))) continue;
    if (await pulsa(porRot(/^Seguir cinco años más$/))) continue;
    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) { await pulsa(ops[Math.floor(Math.random() * ops.length) % ops.length]); continue; }
    if (await pulsa(porRot(/^(Entendido|Después|Ver la sección|Cerrar y volver|Aplica o descarta|✕)$/))) continue;
    if (await pulsa(porRot(/^Ver el año$/))) continue;
    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Ya lo tengo|Terminar|Siguiente|Empezar 20|Abrir la posición|Otro intento|Cerrar en|Subir a|Cerrar el trato|Fijar|Poner el número|Comprar)/))) continue;
    let z = null;
    try { z = r.root.findAll((x) => x.props && x.props.role === "button" && typeof x.props.onClick === "function")[0]; } catch (e) {}
    if (z) { await act(async () => { z.props.onClick({}); await micro(); }); continue; }
    const libres = bs().filter((b) => /^ea-check/.test(cls(b)) && !/^X\b/.test(rot(b)));
    if (libres.length) { await pulsa(libres[0]); continue; }
    const o = bs().find((b) => /^ea-(check|celdaC|ordenI|btn|mini)/.test(cls(b)));
    if (o) { await pulsa(o); continue; }
    await act(async () => { reloj(5000); await micro(); });
  }
  return { vistas, anos };
}

(async () => {
  const N = Number(process.argv[2] || 8);
  const vidas = [];
  for (let i = 0; i < N; i++) { vidas.push(await unaVida(15485863 * (i + 1))); process.stdout.write("."); }
  console.log("");
  const todasVistas = [].concat(...vidas.map((v) => v.vistas));
  const deEmpleado = todasVistas.filter((t) => TIT_EMPLEADO.has(t));
  const deDueno = todasVistas.filter((t) => TIT_DUENO.has(t));
  const anos = vidas.reduce((a, v) => a + v.anos, 0);
  ok(anos >= N * 4, "las partidas avanzan (" + anos + " años jugados en " + N + " vidas)");
  ok(deEmpleado.length === 0, "con firma propia no sale ninguna escena de empleado" + (deEmpleado.length ? " (salieron: " + [...new Set(deEmpleado)].join(", ") + ")" : ""));
  ok(deDueno.length > 0, "salen escenas de dueño: " + deDueno.length + " veces, " + new Set(deDueno).size + " distintas");
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
