/* ============================================================
   ¿CUÁNTO DURA UNA PARTIDA?
   La queja de octubre de 2026 fue «es muy largo». Esta prueba juega
   partidas enteras eligiendo al azar y cuenta lo que le cuesta al
   jugador llegar al final:

     decisiones   opciones elegidas en escenas (sin contar minijuegos)
     por año      decisiones del año más cargado de la partida
     pantallas    cada vez que cambia lo que se ve
     cierre       pantallas entre el último resultado del año y la
                  primera decisión del siguiente (rodillo, informe,
                  gala, pretemporada…)
     legendarias  cuántas escenas legendarias se vieron

   Se corre con:  node pruebas/duracion.js [partidas] [ruta del juego]
   Para comparar con main:
     git show origin/main:src/el-analista.jsx > pruebas/main.jsx
     node pruebas/duracion.js 12 pruebas/main.jsx
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
  const hay = (re) => { try { return r.root.findAll((x) => typeof x.props.className === "string" && re.test(x.props.className)).length > 0; } catch (e) { return false; } };

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

  const m = { ano: 0, decisiones: 0, maxAno: 0, pantallas: 0, cierre: 0, legendarias: 0, fin: "se quedó colgada" };
  let enAno = 0, ultT = "", ultimoAno = null, enCierre = false;
  for (let pasos = 0; pasos < 2000; pasos++) {
    await act(async () => { reloj(2500); await micro(); });
    const t = norm(txtDe(r.toJSON()));
    if (/Algo se rompió/.test(t)) { m.fin = "error"; break; }
    if (/Vivir otra vida/.test(t)) { m.fin = "fin"; break; }
    if (t !== ultT) { m.pantallas++; ultT = t; if (enCierre) m.cierre++; }
    const mA = t.match(/Así terminó (\d{4})|Cierre de (\d{4})/);
    const anoT = mA && (mA[1] || mA[2]);
    if (anoT && anoT !== ultimoAno) {
      ultimoAno = anoT; m.ano++; enCierre = true; m.cierre++;
      m.maxAno = Math.max(m.maxAno, enAno); enAno = 0;
    }
    if (await pulsa(porRot(/^Retirarme ahora$/))) continue;
    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) {
      enCierre = false;
      m.decisiones++; enAno++;
      if (hay(/\blegend\b/)) m.legendarias++;
      await pulsa(ops[Math.floor(Math.random() * ops.length) % ops.length]);
      continue;
    }
    if (await pulsa(porRot(/^(Entendido|Después|Ver la sección|Cerrar y volver|Aplica o descarta|✕)$/))) continue;
    if (await pulsa(porRot(/^Ver el año$/))) continue;
    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el número|Cerrar posición|Aguantar|Comprar|Empezar 20|Poner el capital|Sentarte a hacer|Ver el balance)/))) continue;
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
  m.maxAno = Math.max(m.maxAno, enAno);
  return m;
}

(async () => {
  const N = Number(process.argv[2] || 12);
  const res = [];
  for (let i = 0; i < N; i++) { res.push(await unaVida(1000003 * (i + 1))); process.stdout.write("."); }
  console.log("\n");
  const media = (k) => res.reduce((a, x) => a + x[k], 0) / res.length;
  const f = (v) => v.toFixed(1);
  const terminan = res.filter((x) => x.fin === "fin").length;
  console.log("  partidas: " + N + " · terminan: " + terminan + " · años de media: " + f(media("ano")));
  console.log("  decisiones por partida:  " + f(media("decisiones")) + "   (" + f(media("decisiones") / Math.max(1, media("ano"))) + " por año)");
  console.log("  año más cargado:         " + f(media("maxAno")) + " decisiones de media, " + Math.max.apply(null, res.map((x) => x.maxAno)) + " como mucho");
  console.log("  pantallas por partida:   " + f(media("pantallas")));
  console.log("  pantallas de cierre/año: " + f(media("cierre") / Math.max(1, media("ano"))));
  const conLeg = res.filter((x) => x.legendarias > 0).length;
  console.log("  legendarias por partida: " + f(media("legendarias")) + "   (partidas sin ninguna: " + (N - conLeg) + " de " + N + ")");
  const malas = res.filter((x) => x.fin !== "fin");
  if (malas.length) { console.log("  NO TERMINAN: " + malas.length); process.exitCode = 1; }
})();
