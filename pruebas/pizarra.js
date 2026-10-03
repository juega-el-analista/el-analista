/* ============================================================
   LA PIZARRA DEL COMITÉ, CON COLORES Y VISTA PREVIA
   Monta solo JuegoPares, con el reloj bajo control, y comprueba lo que
   se pidio para el: antes de empezar se ve la pizarra destapada unos
   segundos, cada par comparte su color al destaparse, y la pizarra se
   sigue pudiendo completar.

   Se corre con:  npm run pizarra
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
async function avanza(ms, paso) {
  const d = paso || 50;
  for (let t = 0; t < ms; t += d) {
    await act(async () => {
      pend.forEach((p) => { p.en -= d; });
      pend.filter((p) => p.en <= 0).forEach((p) => {
        if (p.rep) p.en = p.rep; else pend = pend.filter((q) => q.id !== p.id);
        p.fn();
      });
      for (let i = 0; i < 4; i++) await Promise.resolve();
    });
  }
}

/* compilar el juego y sacar el componente, que no se exporta */
const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(require("./unir.js").rutaUnida());
const comp = path.join(__dirname, "compilado.js");
let src = fs.readFileSync(comp, "utf8").replace(
  "module.exports = ElAnalista;",
  "module.exports = { ElAnalista, JuegoPares, vistaParesDe, COLORES_MEM };");
const tmp = path.join(__dirname, "probePiz.js");
fs.writeFileSync(tmp, src);
const { JuegoPares, vistaParesDe, COLORES_MEM } = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

const txt = (j) => (j == null ? "" : typeof j === "string" ? j : Array.isArray(j) ? j.map(txt).join(" ")
  : j.props && j.props.children != null ? txt(j.props.children) : "");

async function montar(ayuda) {
  let fin = null, r;
  await act(async () => {
    r = TR.create(React.createElement(JuegoPares, { ayuda, onFin: (n) => { fin = n; } }));
  });
  const fichas = () => r.root.findAll((n) => n.type === "div" && /ea-fichaP/.test(n.props.className || ""));
  const saltar = () => r.root.findAll((n) => n.type === "button" && /Ya lo mir/.test(txt(n)))[0];
  return { r, fichas, saltar, fin: () => fin };
}

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };
  const ROJO = COLORES_MEM.find((c) => c.n === "Rojo").c;

  /* ---- la vista previa ---- */
  const a = await montar(20);
  const f0 = a.fichas();
  ok(f0.length === 12, "la pizarra trae 12 fichas (trae " + f0.length + ")");
  ok(f0.every((f) => /\bvista\b/.test(f.props.className) && txt(f).length > 0),
    "al empezar se ven todas destapadas, con su texto");
  ok(!!a.saltar(), "hay un botón para empezar antes de que acabe la cuenta");

  /* los colores: mismo color dentro del par, distinto entre pares, nunca rojo */
  const porColor = {};
  f0.forEach((f) => { const c = (f.props.style || {}).borderColor; (porColor[c] = porColor[c] || []).push(f0.indexOf(f)); });
  const grupos = Object.values(porColor);
  ok(f0.every((f) => f.props.style && f.props.style.borderColor), "cada ficha lleva su color");
  ok(grupos.length === 6 && grupos.every((g) => g.length === 2),
    "seis colores, uno por par, cada uno en exactamente dos fichas");
  ok(Object.keys(porColor).indexOf(ROJO) < 0, "ningún par es rojo, que en el juego significa fallo");

  /* tocar durante la vista previa no hace nada */
  await act(async () => { const h = f0[0].props.onClick; if (h) h(); });
  ok(a.fichas().every((f) => /\bvista\b/.test(f.props.className)), "tocar mientras miras no destapa ni cuenta");

  /* la cuenta se acaba sola y la pizarra se tapa */
  const seg = vistaParesDe(20);
  await avanza(seg * 1000 + 200);
  ok(a.fichas().every((f) => /\btapada\b/.test(f.props.className) && txt(f) === ""),
    "a los " + seg + " segundos se tapa entera");
  ok(!a.saltar(), "el botón de empezar desaparece al taparse");

  /* ---- se sigue pudiendo completar, y los pares abiertos llevan su color ---- */
  const pares = grupos;
  const porKey = (k) => a.fichas()[k];
  let colorAbierta = true;
  for (const [k1, k2] of pares) {
    await act(async () => { porKey(k1).props.onClick(); });
    await act(async () => { porKey(k2).props.onClick(); });
    const s1 = porKey(k1).props.style || {}, s2 = porKey(k2).props.style || {};
    if (!s1.borderColor || s1.borderColor !== s2.borderColor) colorAbierta = false;
    await avanza(500);
  }
  await avanza(1200);
  ok(colorAbierta, "al destaparse, las dos fichas del par se pintan del mismo color");
  ok(a.fin() === "exito", "completar la pizarra sin fallos cierra en éxito (cerró en «" + a.fin() + "»)");

  /* ---- el botón salta la espera, y más atributo da más tiempo ---- */
  const b = await montar(90);
  await act(async () => { b.saltar().props.onClick(); });
  ok(b.fichas().every((f) => /\btapada\b/.test(f.props.className)), "«Ya lo miré, empezar» tapa la pizarra en el acto");
  ok(vistaParesDe(0) === 5 && vistaParesDe(100) === 9 && vistaParesDe(90) > vistaParesDe(20),
    "la vista dura de 5 a 9 segundos y crece con el atributo (" + vistaParesDe(0) + " a " + vistaParesDe(100) + ")");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
