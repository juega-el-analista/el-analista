/* ============================================================
   ¿CÓMO LE VA A CADA PAÍS?
   Juega varias vidas con cada país y mide la economía: cuánto
   patrimonio hay a los diez años, cuántos años se cierran perdiendo
   dinero y cuántos acaban debiendo. Sirve para calibrar la tabla
   NACIONES (sueldo, costo de vida e impuesto) sin romper el juego.

   Se corre con:  npm run paises               (la tabla del juego)
                  node pruebas/paises.js 6 variante.json
     variante.json = { "ve": { "sal": 0.44, "gas": 0.59, "tax": 0.12 }, ... }
     juega la misma prueba con esos números en vez de los del juego.
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

const PAISES = ["ve", "co", "ar", "mx", "es", "us"];
const N = Number(process.argv[2] || 6);
const RUTA_VAR = process.argv.slice(3).find((a) => /\.json$/i.test(a));
const MUESTRA = process.argv.indexOf("muestra") >= 0;

/* el juego, con la tabla del juego o con la variante */
let fuente = fs.readFileSync(path.join(__dirname, "..", "src", "el-analista.jsx"), "utf8");
if (RUTA_VAR) {
  const v = JSON.parse(fs.readFileSync(RUTA_VAR, "utf8"));
  for (const id of Object.keys(v)) {
    const ini = fuente.indexOf('{ id: "' + id + '", n: ');
    if (ini < 0) throw new Error("país " + id + " no está en NACIONES");
    const fin = fuente.indexOf("sesgo:", ini);
    let tramo = fuente.slice(ini, fin);
    for (const k of ["sal", "gas", "tax"]) {
      if (v[id][k] == null) continue;
      const re = new RegExp("\\b" + k + ": [0-9.]+");
      if (!re.test(tramo)) throw new Error(id + "." + k + " no encontrado");
      tramo = tramo.replace(re, k + ": " + v[id][k]);
    }
    fuente = fuente.slice(0, ini) + tramo + fuente.slice(fin);
  }
}
const tmpJsx = path.join(__dirname, "probePaises.jsx");
fs.writeFileSync(tmpJsx, fuente);
const { cargar } = require(path.join(__dirname, "banco.js"));
const ElAnalista = cargar(tmpJsx);
try { fs.unlinkSync(tmpJsx); } catch (e) {}

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
const aNum = (s) => Number(String(s).replace(/[.\s]/g, "").replace("−", "-").replace(",", "."));

async function unaVida(semilla, iPais) {
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
  await pulsa(porRot(/^Jugar ya$/));
  await pulsa(porRot(/^Elegir yo/));
  await pulsa(porRot(/^Empezar a los 20/));
  const p = bs().filter((b) => /^Elegir$/.test(rot(b)));
  await pulsa(p[iPais]);
  const c = bs().filter((b) => /^(Graduarte de esto|Empezar con esto)$/.test(rot(b)));
  await pulsa(c[semilla % Math.max(1, c.length)] || c[0]);

  const anos = [];   /* { patrimonio, delta, ahorro } por año cerrado */
  let ultimoAno = null, pasos = 0, deuda = 0, colgada = true;
  while (pasos++ < 1600) {
    await act(async () => { reloj(2500); await micro(); });
    const t = norm(txtDe(r.toJSON()));
    if (/Algo se rompió/.test(t)) { colgada = false; break; }
    if (/Vivir otra vida/.test(t)) { colgada = false; break; }
    const mA = t.match(/Así terminó (\d{4})/);
    if (mA && mA[1] !== ultimoAno) {
      ultimoAno = mA[1];
      const i = t.indexOf("Así terminó");
      const trozo = t.slice(i, i + 400);
      if (MUESTRA && anos.length === 0) console.log("\nMUESTRA: " + trozo);
      const mP = trozo.match(/USD (−?-?[\d.]+)/);
      const mD = trozo.match(/([+−-]) ?([\d.]+) en el año/);
      const mS = trozo.match(/ahorraste (−?-?\d+) ?%/);
      anos.push({ patrimonio: mP ? aNum(mP[1]) : null,
        delta: mD ? (mD[1] === "+" ? 1 : -1) * aNum(mD[2]) : null, ahorro: mS ? aNum(mS[1]) : null });
    }
    const mDeuda = t.match(/debes ([\d.,]+) ?k?/);
    deuda = mDeuda ? 1 : deuda;
    if (anos.length >= 10) { colgada = false; break; }
    if (await pulsa(porRot(/^Retirarme ahora$/))) continue;
    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) { await pulsa(ops[Math.floor(Math.random() * ops.length) % ops.length]); continue; }
    if (await pulsa(porRot(/^(Entendido|Después|Ver la sección|Cerrar y volver|Aplica o descarta|✕)$/))) continue;
    if (await pulsa(porRot(/^Ver el año$/))) continue;
    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el número|Cerrar posición|Aguantar|Comprar|Empezar 20|Poner el capital|Sentarte a hacer|Ver el balance|Abrir la posición|Otro intento|Cerrar en|Subir a)/))) continue;
    let z = null;
    try { z = r.root.findAll((x) => x.props && x.props.role === "button" && typeof x.props.onClick === "function")[0]; } catch (e) {}
    if (z) { await act(async () => { z.props.onClick({}); await micro(); }); continue; }
    const libres = bs().filter((b) => /^ea-check/.test(cls(b)) && !/^X\b/.test(rot(b)));
    if (libres.length) { await pulsa(libres[0]); continue; }
    const o = bs().find((b) => /^ea-(check|celdaC|ordenI|btn|mini)/.test(cls(b)));
    if (o) { await pulsa(o); continue; }
    await act(async () => { reloj(5000); await micro(); });
  }
  return { anos, deuda, colgada };
}

const mediana = (a) => { const b = a.filter((x) => x != null && isFinite(x)).sort((x, y) => x - y); return b.length ? b[Math.floor(b.length / 2)] : null; };
const fmt = (n) => (n == null ? "—" : Math.round(n).toLocaleString("es-ES"));

(async () => {
  console.log("  " + (RUTA_VAR ? "variante: " + path.basename(RUTA_VAR) : "tabla del juego") + " · " + N + " vidas por país\n");
  console.log("  país  años   patrimonio   patrim.   años en    ahorro   acaban");
  console.log("        (med)  año 3 (med)  año 10    rojo (%)   (med %)  debiendo");
  for (let k = 0; k < PAISES.length; k++) {
    const vidas = [];
    for (let i = 0; i < N; i++) { vidas.push(await unaVida(7919 * (i + 1) + k * 104729, k)); process.stdout.write(""); }
    const todos = [].concat(...vidas.map((v) => v.anos));
    const rojos = todos.filter((a) => a.delta != null && a.delta < 0).length;
    const conDelta = todos.filter((a) => a.delta != null).length;
    const p3 = mediana(vidas.map((v) => (v.anos[2] || {}).patrimonio));
    const p10 = mediana(vidas.map((v) => (v.anos[9] || v.anos[v.anos.length - 1] || {}).patrimonio));
    const ah = mediana(todos.map((a) => a.ahorro));
    const debiendo = vidas.filter((v) => v.deuda).length;
    console.log("  " + PAISES[k].padEnd(5) + String(mediana(vidas.map((v) => v.anos.length))).padStart(4)
      + fmt(p3).padStart(13) + fmt(p10).padStart(11)
      + (conDelta ? Math.round(rojos / conDelta * 100) + "%" : "—").padStart(10)
      + (ah == null ? "—" : ah + "%").padStart(10)
      + (debiendo + "/" + N).padStart(9));
  }
})();
