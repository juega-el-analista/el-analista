/* ============================================================
   LOS ARRANQUES DE CADA EDAD
   Quien empieza a los 30, 40 o 50 vive en sus dos primeros años
   escenas de su edad (arranque: 30/40/50), y nunca las de otra.
   Juega los dos primeros años con varias semillas por edad y mira los
   títulos de los memorandos.

   Se corre con:  npm run arranques
   ============================================================ */
const path = require("path");
const fs = require("fs");
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

const RUTA = path.join(__dirname, "..", "src", "el-analista.jsx");
const { cargar } = require(path.join(__dirname, "banco.js"));
const ElAnalista = cargar(RUTA);

/* los títulos de cada edad, leídos del propio juego */
const src = fs.readFileSync(RUTA, "utf8");
const TITULOS = { 30: [], 40: [], 50: [] };
(src.match(/\{ id: \d+, arranque: (30|40|50),[^\n]*t: "[^"]+"/g) || []).forEach((l) => {
  const m = l.match(/arranque: (\d+),.*t: "([^"]+)"/);
  if (m) TITULOS[m[1]].push(m[2]);
});

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

async function dosAnos(semilla, edad) {
  const mem = new Map();
  global.window = { localStorage: { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) } };
  let x = semilla;
  Math.random = () => { x = (x * 48271) % 2147483647; return x / 2147483647; };
  let r;
  await act(async () => { r = TR.create(React.createElement(ElAnalista)); });
  const botones = () => r.root.findAll((n) => n.type === "button" && n.props.onClick && !n.props.disabled);
  const pulsa = async (re) => {
    const b = botones().find((n) => re.test(txt(n).trim()));
    if (!b) return false;
    await act(async () => { b.props.onClick({ preventDefault() {}, stopPropagation() {}, target: { value: "50" } }); });
    return true;
  };
  await pulsa(/^Jugar ya$/);
  await pulsa(/^Continuar$/);
  await pulsa(new RegExp("^Empezar a los " + edad));
  /* a partir de los 30 se pregunta la familia: casado, para que el
     divorcio de los 40 pueda salir */
  await pulsa(/^Casado$/);
  /* la pantalla de familia puede tener más de un paso: se avanza hasta
     que aparece la partida */
  await pulsa(/^Ninguno$/);   /* hijos */
  for (let i = 0; i < 8; i++) {
    if (await pulsa(/^(Graduarte de esto|Empezar con esto)$/)) break;
    if (await pulsa(/^Elegir$/)) continue;
    if (await pulsa(/^(Seguir|Listo|Así es mi vida)/)) continue;
    if (await pulsa(/^Continuar$/)) continue;
    const b = botones().find((n) => /ea-elige|ea-op|ea-mini/.test(String(n.props.className || "")) && !/Cambiar/.test(txt(n)));
    if (b) await act(async () => { b.props.onClick({ preventDefault() {}, stopPropagation() {}, target: { value: "50" } }); });
  }
  const vistos = [];
  let cierres = 0;
  for (let paso = 0; paso < 160 && cierres < 2; paso++) {
    if (await pulsa(/^(Entendido|Después|Cerrar y volver a la decisión)$/)) continue;
    if (await pulsa(/^Cerrar el año$/)) { cierres++; continue; }
    if (await pulsa(/^(Lo siguiente|Ver el año|Siguiente año|Seguir|Empezar 20[0-9]{2})/)) continue;
    const h = r.root.findAll((n) => n.type === "h2" && /ea-memoTit/.test(n.props.className || ""))[0];
    if (h) { const t = txt(h).trim(); if (vistos.indexOf(t) < 0) vistos.push(t); }
    const memo = r.root.findAll((n) => n.props && /(^| )ea-memo( |$)/.test(n.props.className || ""))[0];
    const ops = memo ? memo.findAll((n) => n.type === "button" && n.props.onClick && !n.props.disabled) : [];
    const sinJuego = ops.filter((b) => !/te ayuda/.test(txt(b)));
    if (sinJuego.length) { await act(async () => { sinJuego[0].props.onClick(); }); continue; }
    const otro = botones().find((b) => /^ea-(btn|mini)/.test(String(b.props.className || "")));
    if (otro) { await act(async () => { otro.props.onClick({ preventDefault() {}, stopPropagation() {}, target: { value: "50" } }); }); continue; }
    break;
  }
  r.unmount();
  return vistos;
}

(async () => {
  [30, 40, 50].forEach((e) => console.log("  escenas de los " + e + ": " + TITULOS[e].join(" · ")));
  ok(TITULOS[30].length >= 2 && TITULOS[40].length >= 2 && TITULOS[50].length >= 2, "cada edad tiene al menos dos escenas propias");
  for (const edad of [20, 30, 40, 50]) {
    const propias = [], ajenas = [];
    for (const s of [7, 23, 99]) {
      const v = await dosAnos(s, edad);
      v.forEach((t) => {
        [30, 40, 50].forEach((e) => {
          if (TITULOS[e].indexOf(t) >= 0) (e === edad ? propias : ajenas).push(t);
        });
      });
    }
    if (edad === 20) ok(ajenas.length === 0, "a los 20 no sale ninguna" + (ajenas.length ? ": " + ajenas.join(", ") : ""));
    else {
      ok(propias.length >= 3, "a los " + edad + " salen las suyas (" + propias.length + " en 3 partidas: " + Array.from(new Set(propias)).join(", ") + ")");
      ok(ajenas.length === 0, "  y ninguna de otra edad" + (ajenas.length ? ": " + ajenas.join(", ") : ""));
    }
  }
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
