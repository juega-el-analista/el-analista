/* ============================================================
   INICIO Y CIERRE DE AÑO
   Cada año empieza con «Inicio de año» y la última escena antes del
   informe lleva «Cierre de año» (Alessandro, 8-oct-2026). Esta prueba
   juega el primer año de varias partidas de verdad y mira el rótulo de
   cada escena. Elige siempre opciones sin minijuego: lo que se mira aquí
   son los rótulos, y los minijuegos con reloj no corren sin un reloj.

   Se corre con:  npm run cierre
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

async function primerAno(semilla, edad) {
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
  const cabecera = () => {
    const h = r.root.findAll((n) => n.props && /ea-memoHead/.test(n.props.className || ""))[0];
    return h ? txt(h) : null;
  };
  await pulsa(/^Jugar ya$/);
  await pulsa(/^Elegir yo/);
  await pulsa(new RegExp("^Empezar a los " + edad));
  await pulsa(/^Elegir$/);
  await pulsa(/^Graduarte de esto$/);

  const vistos = [];
  for (let paso = 0; paso < 80; paso++) {
    if (await pulsa(/^(Entendido|Después|Cerrar y volver a la decisión)$/)) continue;
    if (await pulsa(/^Cerrar el año$/)) { r.unmount(); return vistos; }
    if (await pulsa(/^Lo siguiente/)) continue;
    const cab = cabecera();
    const memo = r.root.findAll((n) => n.props && /(^| )ea-memo( |$)/.test(n.props.className || ""))[0];
    const ops = memo ? memo.findAll((n) => n.type === "button" && n.props.onClick && !n.props.disabled) : [];
    const sinJuego = ops.filter((b) => !/te ayuda/.test(txt(b)));
    if (cab && !/Resolución|Cierre del año/i.test(cab) && sinJuego.length) {
      vistos.push(cab.replace(/\d{4}$/, "").trim());
      await act(async () => { sinJuego[0].props.onClick(); });
      continue;
    }
    break;   /* solo quedaba un minijuego: esta partida no sirve para mirar rótulos */
  }
  r.unmount();
  return null;
}

(async () => {
  const anos = [];
  const pruebas = [[7, 20], [11, 30], [23, 20], [42, 40], [99, 20], [123, 30], [321, 50], [555, 20]];
  for (const [s, e] of pruebas) {
    const a = await primerAno(s, e);
    if (a) anos.push({ s, e, a });
  }
  ok(anos.length >= 4, "se jugaron " + anos.length + " primeros años completos");
  anos.forEach(({ s, e, a }) => {
    console.log("     (semilla " + s + ", " + e + " años) " + a.join("  →  "));
    ok(/^Inicio de año$/i.test(a[0]), "  empieza con «Inicio de año»");
    ok(/^Cierre de año/i.test(a[a.length - 1]), "  y la última escena lleva «Cierre de año»");
    ok(a.slice(0, -1).every((c) => !/Cierre de año/i.test(c)), "  y ninguna otra lo lleva");
  });

  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
