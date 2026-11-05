/* ============================================================
   PISTAS DE UNA LÍNEA
   La primera vez que aparece algo (las fichas de efecto, el riesgo, una
   consecuencia...) sale una frase «Primera vez» encima de las opciones,
   y no vuelve a salir nunca: ni en esa partida ni en la siguiente.

   Juega el primer año de una partida, y luego otro primer año con el
   mismo navegador, y cuenta las pistas de cada uno.

   Se corre con:  npm run pistas
   ============================================================ */
const path = require("path");
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
const ElAnalista = cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

/* el mismo navegador para las dos partidas */
const mem = new Map();
global.window = { localStorage: { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) } };

async function primerAno(semilla) {
  mem.delete("el-analista-partida");
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
  await pulsa(/^Empezar a los 20/);
  await pulsa(/^Elegir$/);
  await pulsa(/^Graduarte de esto$/);
  const pistas = [];
  for (let paso = 0; paso < 80; paso++) {
    if (await pulsa(/^(Entendido|Después|Cerrar y volver a la decisión)$/)) continue;
    if (await pulsa(/^Cerrar el año$/)) break;
    if (await pulsa(/^Lo siguiente/)) continue;
    r.root.findAll((n) => n.props && n.props.className === "ea-pistaUna").forEach((n) => {
      const t = txt(n).replace(/^Primera vez/, "").trim();
      if (pistas.indexOf(t) < 0) pistas.push(t);
    });
    const memo = r.root.findAll((n) => n.props && /(^| )ea-memo( |$)/.test(n.props.className || ""))[0];
    const ops = memo ? memo.findAll((n) => n.type === "button" && n.props.onClick && !n.props.disabled) : [];
    const sinJuego = ops.filter((b) => !/te ayuda/.test(txt(b)));
    if (sinJuego.length) { await act(async () => { sinJuego[0].props.onClick(); }); continue; }
    break;
  }
  r.unmount();
  return pistas;
}

(async () => {
  const a = await primerAno(7);
  console.log("  primera partida: " + a.length + " pistas");
  a.forEach((t) => console.log("     · " + t));
  ok(a.length >= 2, "en el primer año salen pistas");
  const b = await primerAno(23);
  console.log("  segunda partida, mismo navegador: " + b.length + " pistas");
  b.forEach((t) => console.log("     · " + t));
  ok(b.every((t) => a.indexOf(t) < 0), "ninguna se repite");
  /* con el almacén roto el juego sigue y las pistas simplemente vuelven */
  global.window = { localStorage: { getItem: () => { throw new Error("x"); }, setItem: () => { throw new Error("x"); }, removeItem: () => {} } };
  let roto = true;
  try { await primerAno(99); } catch (e) { roto = false; }
  ok(roto, "sin localStorage no se rompe nada");
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
