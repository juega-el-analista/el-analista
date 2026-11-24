/* ============================================================
   EL RITMO DE UNA PARTIDA
   «Que el juego se sienta dinámico pero que no se sienta pesado»
   (Alessandro, 9-nov-2026). Juega vidas enteras eligiendo al azar y
   cuenta, por etapa, todo lo que le cuesta al jugador: decisiones,
   minijuegos (cuáles, y si se repiten), negociaciones, preguntas y
   pantallas. Con eso estima los minutos.

   Tiempos supuestos: decisión 12 s; minijuego, su duración más 12 s de
   reglas la primera vez; cualquier otra pantalla, 4 s.

   Se corre con:  npm run ritmo        (node pruebas/ritmo.js [vidas])
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
const RUTA_JUEGO = process.argv[3] || path.join(__dirname, "..", "src", "el-analista.jsx");
const ElAnalista = cargar(RUTA_JUEGO);

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

/* el catálogo de minijuegos, para reconocerlos por su nombre */
const fuente = fs.readFileSync(RUTA_JUEGO, "utf8");
const ini = fuente.indexOf("const JUEGOS = {");
const trozo = fuente.slice(ini, fuente.indexOf("\n};", ini));
const JUEGOS = [];
trozo.replace(/\n  (\w+): \{\s*n: "([^"]+)"[^\n]*?dur: "([^"]+)"/g, (_, k, n, d) => {
  const s = /(\d+) s/.exec(d); const rondas = /(\d+) rondas/.exec(d);
  JUEGOS.push({ k, n, seg: s ? Number(s[1]) : rondas ? Number(rondas[1]) * 12 : 30 });
});
const PREGUNTAS = ["quiz", "catedra", "calculo"];

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
  await pulsa(porRot(/^Jugar ya$/));
  await pulsa(porRot(/^(Femenino|Masculino|Prefiero no decirlo)$/));
  await pulsa(porRot(/^Continuar$/));
  await pulsa(porRot(/^Empezar a los 20/));
  const p = bs().filter((b) => /^Elegir$/.test(rot(b)));
  await pulsa(p[semilla % Math.max(1, p.length)] || p[0]);
  const c = bs().filter((b) => /^(Graduarte de esto|Empezar con esto)$/.test(rot(b)));
  await pulsa(c[semilla % Math.max(1, c.length)] || c[0]);
  await pulsa(porRot(/^(Sé lo que hago|Guíame por el camino)/));

  const etapas = [];
  const nueva = () => ({ dec: 0, juegos: [], pantallas: 0, seg: 0 });
  let et = nueva(), ultT = "", ultimoAno = null, enJuego = false, fin = "colgada";
  const jugados = new Set();
  const cines = []; let ultCine = null; let camino = null;
  for (let pasos = 0; pasos < 2500; pasos++) {
    await act(async () => { reloj(2500); await micro(); });
    const t = norm(txtDe(r.toJSON()));
    if (/Algo se rompió/.test(t)) { fin = "error"; break; }
    if (/Vivir otra vida/.test(t)) { fin = "fin"; break; }
    if (t !== ultT) { et.pantallas++; et.seg += 4; ultT = t; }
    const mA = t.match(/(?:Así terminó|Cierre de|De \d{4} a|\d{4} y) (\d{4})/);
    if (mA && mA[1] !== ultimoAno) { ultimoAno = mA[1]; etapas.push(et); et = nueva(); }
    /* el minijuego se reconoce por su tarjeta montada y su tipo */
    let tj = [];
    try { tj = r.root.findAll((x) => x.type && x.type.name === "TarjetaJuego"); } catch (e) { tj = []; }
    if (tj.length && !enJuego) {
      const k = tj[0].props.tipo;
      const j = JUEGOS.find((x) => x.k === k);
      et.juegos.push(k);
      if (process.env.RITMO_DEBUG) console.log("  [etapa " + etapas.length + "] " + k + (tj[0].props.visto ? " (otra vez)" : "") + " · " + t.slice(0, 160));
      /* reglas: 12 s la primera vez; las siguientes se entra a jugar */
      et.seg += (j ? j.seg : 30) + (tj[0].props.visto ? 2 : 12) - 4;
      jugados.add(k);
    }
    enJuego = tj.length > 0;
    /* las cinemáticas: el golpe de dinero y los momentos de la vida */
    try {
      const mv = r.root.findAll((x) => x.type && x.type.name === "MomentoVida")[0];
      const gd = r.root.findAll((x) => x.type && x.type.name === "GolpeDinero")[0];
      const clave = mv ? "m:" + mv.props.m.tipo + ":" + mv.props.m.t : gd ? "g:" + (gd.props.golpe.sube ? "sube" : "baja") + ":" + gd.props.golpe.monto : null;
      if (clave && clave !== ultCine) { cines.push(clave.split(":").slice(0, 2).join(":")); if (process.env.RITMO_TRAZA) console.log("  [cine] " + clave); }
      ultCine = clave;
    } catch (e) {}
    /* tu empresa del camino, tal como la ve la píldora */
    try { const pc = r.root.findAll((x) => x.type && x.type.name === "PildoraCamino")[0]; if (pc && pc.props.st && pc.props.st.empresa) camino = pc.props.st.empresa; } catch (e) {}
    if (await pulsa(porRot(/^Retirarme ahora$/))) continue;
    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) {
      /* las respuestas del examen y de las cuentas también son ea-op:
         dentro de un minijuego no cuentan como decisiones */
      if (!enJuego) { et.dec++; et.seg += 8; }
      if (!enJuego && process.env.RITMO_TITULOS) {
        try { const h = r.root.findAll((x) => x.type === "h2" && /ea-memoTit/.test(x.props.className || ""))[0]; if (h) console.log("  [escena] " + norm(txtDe(h.props.children))); } catch (e) {}
      }
      /* RITMO_PREFIERE: una expresión para elegir esas opciones cuando
         salgan (para comprobar, por ejemplo, que la boda se ve) */
      const pref = process.env.RITMO_PREFIERE ? ops.find((b) => new RegExp(process.env.RITMO_PREFIERE).test(rot(b))) : null;
      if (pref && process.env.RITMO_TRAZA) console.log("  [elige] " + rot(pref).slice(0, 60) + " · en: " + t.slice(t.indexOf("REPUTACIÓN") + 10, t.indexOf("REPUTACIÓN") + 120));
      await pulsa(pref || ops[Math.floor(Math.random() * ops.length) % ops.length]);
      continue;
    }
    if (await pulsa(porRot(/^(Entendido|Después|Ver la sección|Cerrar y volver|Aplica o descarta|✕)$/))) continue;
    if (await pulsa(porRot(/^(Ver el año|Seguir)$/))) continue;
    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el número|Cerrar posición|Aguantar|Comprar|Empezar 20|Poner el capital|Sentarte a hacer|Ver el balance)/))) {
      continue;
    }
    let z = null;
    try {
      const zs = r.root.findAll((x) => x.props && x.props.role === "button" && typeof x.props.onClick === "function");
      z = zs.length ? zs[Math.floor(Math.random() * zs.length) % zs.length] : null;
    } catch (e) {}
    if (z) { await act(async () => { z.props.onClick({}); await micro(); }); continue; }
    const libres = bs().filter((b) => /^ea-check/.test(cls(b)) && !/^X\b/.test(rot(b)));
    if (libres.length) { await pulsa(libres[0]); continue; }
    const o = bs().find((b) => /^ea-(check|celdaC|ordenI|btn|mini)/.test(cls(b)));
    if (o) { await pulsa(o); continue; }
    await act(async () => { reloj(5000); await micro(); });
  }
  if (et.dec || et.juegos.length) etapas.push(et);
  return { fin, cines, camino, etapas: etapas.filter((e) => e.dec || e.juegos.length) };
}

(async () => {
  const N = Number(process.argv[2] || 6);
  const vidas = [];
  for (let i = 0; i < N; i++) { vidas.push(await unaVida(1000003 * (i + 1))); process.stdout.write("."); }
  console.log("\n");
  const f = (v) => (Math.round(v * 10) / 10).toFixed(1);
  const media = (fn) => vidas.reduce((a, v) => a + fn(v), 0) / N;
  const todas = vidas.reduce((a, v) => a.concat(v.etapas), []);
  const nJ = (e) => e.juegos.length;
  console.log("  vidas: " + N + " · terminan: " + vidas.filter((v) => v.fin === "fin").length + " · etapas por vida: " + f(media((v) => v.etapas.length)));
  console.log("  minutos por vida (estimados): " + f(media((v) => v.etapas.reduce((a, e) => a + e.seg, 0)) / 60));
  console.log("  por etapa: " + f(todas.reduce((a, e) => a + e.dec, 0) / todas.length) + " decisiones · "
    + f(todas.reduce((a, e) => a + nJ(e), 0) / todas.length) + " minijuegos · "
    + f(todas.reduce((a, e) => a + e.pantallas, 0) / todas.length) + " pantallas · "
    + f(todas.reduce((a, e) => a + e.seg, 0) / todas.length / 60) + " min");
  const dist = {};
  todas.forEach((e) => { dist[nJ(e)] = (dist[nJ(e)] || 0) + 1; });
  console.log("  etapas según minijuegos: " + Object.keys(dist).sort().map((k) => k + " → " + Math.round(dist[k] * 100 / todas.length) + "%").join(" · "));
  console.log("  etapa más larga: " + f(Math.max.apply(null, todas.map((e) => e.seg)) / 60) + " min · etapas de más de 3 min: "
    + Math.round(todas.filter((e) => e.seg > 180).length * 100 / todas.length) + "%");
  const cuenta = {};
  todas.forEach((e) => e.juegos.forEach((k) => { cuenta[k] = (cuenta[k] || 0) + 1; }));
  const totalJ = Object.values(cuenta).reduce((a, b) => a + b, 0);
  console.log("  minijuegos por vida: " + f(totalJ / N) + " · distintos por vida: "
    + f(media((v) => new Set(v.etapas.reduce((a, e) => a.concat(e.juegos), [])).size)) + " de " + JUEGOS.length);
  console.log("  preguntas (examen, clase, cuentas) por vida: " + f(PREGUNTAS.reduce((a, k) => a + (cuenta[k] || 0), 0) / N)
    + " · negociaciones por vida: " + f((cuenta.anclaje || 0) / N));
  const rep = todas.filter((e) => new Set(e.juegos).size < e.juegos.length).length;
  let seguidas = 0;
  vidas.forEach((v) => { const l = v.etapas.reduce((a, e) => a.concat(e.juegos), []); for (let i = 1; i < l.length; i++) if (l[i] === l[i - 1]) seguidas++; });
  console.log("  etapas con un minijuego repetido: " + Math.round(rep * 100 / todas.length) + "% · el mismo dos veces seguidas: " + f(seguidas / N) + " por vida");
  console.log("  los que más salen (por vida): " + Object.keys(cuenta).sort((a, b) => cuenta[b] - cuenta[a]).slice(0, 8).map((k) => k + " " + f(cuenta[k] / N)).join(" · "));
  const cc = {};
  vidas.forEach((v) => (v.cines || []).forEach((k) => { cc[k] = (cc[k] || 0) + 1; }));
  console.log("  cinemáticas por vida: " + (Object.keys(cc).length ? Object.keys(cc).sort().map((k) => k.replace(/^[gm]:/, "") + " " + f(cc[k] / N)).join(" · ") : "ninguna"));
  if (process.env.RITMO_DEBUG) vidas.forEach((v) => console.log("  [camino] " + typeof v.camino + " " + String(JSON.stringify(v.camino)).slice(0, 300)));
  vidas.forEach((v, i) => { const c = v.camino; console.log("  empresa vida " + (i + 1) + ": " + (c ? c.n + " (" + c.id + ") · noticias " + (c.hist || []).length + " · decisiones " + (c.decs || []).length + " · tu parte " + Math.round(c.parte * 1000) / 10 + "% de USD " + Math.round(c.valor / 1e6) + " M" : "sin camino")); });
  const nunca = JUEGOS.filter((j) => !cuenta[j.k]).map((j) => j.k);
  if (nunca.length) console.log("  nunca salieron: " + nunca.join(", "));
  if (vidas.some((v) => v.fin !== "fin")) { console.log("  NO TERMINAN: " + vidas.filter((v) => v.fin !== "fin").length); process.exitCode = 1; }
})();
