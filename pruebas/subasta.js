/* ============================================================
   LA SUBASTA, SIN TOPE ESCONDIDO
   La versión anterior se acababa sola a la octava subida y lo contaba
   como una retirada: con el precio empezando en 40 te echaba hacia los
   110 aunque tu estimación fuera 145. Esta prueba existe para que no
   vuelva a pasar, y comprueba de paso que la subasta termina siempre y
   que el resultado se juzga como se explica en las reglas.

   Se corre con:  npm run subasta
   ============================================================ */
const path = require("path");
const fs = require("fs");
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeSub.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { JuegoSubasta, casoSubasta, cierreRetiro, nivelSubasta };"));
const { JuegoSubasta, casoSubasta, cierreRetiro, nivelSubasta } = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

async function montar() {
  let fin = null, r;
  await act(async () => { r = TR.create(React.createElement(JuegoSubasta, { ayuda: 72, onFin: (n) => { fin = n; } })); });
  const boton = (re) => r.root.findAll((n) => n.type === "button" && re.test(txt(n)))[0];
  const precio = () => Number(txt(r.root.findAll((n) => n.props && /ea-precio/.test(n.props.className || ""))[0]));
  const pulsa = async (re) => { const b = boton(re); if (!b) return false; await act(async () => { b.props.onClick(); }); return true; };
  return { r, boton, precio, pulsa, pantalla: () => txt(r.toJSON()), fin: () => fin };
}

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };

  /* ---- el caso que se reportó: estimación alta, rivales con límites altos ---- */
  let cola = [];
  const azar = () => (cola.length ? cola.shift() : 0.99);
  Math.random = azar;
  const a = await montar();
  /* con Math.random casi 1 el valor sale ~140 y los tres rivales aguantan hasta ~168 */
  let rondas = 0;
  while (a.boton(/^Subir a/) && a.precio() < 150 && rondas < 60) { await a.pulsa(/^Subir a/); rondas++; }
  ok(a.precio() >= 150, "se puede seguir pujando más allá de 111: llegó a " + a.precio() + " en " + rondas + " rondas");
  ok(!!a.boton(/^Subir a/) && !!a.boton(/^Retirarme/), "a esas alturas la subasta sigue abierta, sin tope de rondas");
  /* seguir hasta que se retiren todos: tiene que terminar sola */
  while (a.boton(/^Subir a/) && rondas < 200) { await a.pulsa(/^Subir a/); rondas++; }
  ok(!a.boton(/^Subir a/), "la subasta termina sola cuando pasas el límite de todos (" + rondas + " rondas)");
  ok(/Te la llevaste por/.test(a.pantalla()), "si se retiran todos, la empresa es tuya");
  await a.pulsa(/^Continuar/);
  ok(a.fin() === "fallo", "pagar muy por encima del valor es la maldición del ganador (cerró en «" + a.fin() + "»)");

  /* ---- retirarse ---- */
  Math.random = () => 0.5;
  const b = await montar();
  await b.pulsa(/^Retirarme/);
  ok(/Te retiraste en/.test(b.pantalla()) && /se la llevó por/.test(b.pantalla()), "al retirarte te dice quién se la llevó y por cuánto");
  await b.pulsa(/^Continuar/);
  ok(["exito", "parcial", "fallo"].indexOf(b.fin()) >= 0, "retirarse cierra con un resultado válido (" + b.fin() + ")");

  /* ---- la regla de puntuación ---- */
  const caso = { valor: 100, limites: [120, 95, 80] };
  ok(nivelSubasta(caso, { gano: true, precio: 100 }) === "exito", "ganar pagando lo que vale es éxito");
  ok(nivelSubasta(caso, { gano: true, precio: 108 }) === "parcial", "ganar pagando un poco más es a medias");
  ok(nivelSubasta(caso, { gano: true, precio: 125 }) === "fallo", "ganar pagando mucho más es fallo");
  const r1 = cierreRetiro(caso, 90);
  ok(r1.quien === "Fondo regional" && r1.final === 95, "si te retiras en 90, gana el de límite más alto al precio del segundo (95)");
  const casoCaro = { valor: 100, limites: [130, 115, 80] };
  ok(nivelSubasta(casoCaro, Object.assign({ gano: false, precio: 90 }, cierreRetiro(casoCaro, 90))) === "exito",
    "retirarte cuando el ganador acaba pagando de más es éxito");
  ok(nivelSubasta(caso, Object.assign({ gano: false, precio: 60 }, cierreRetiro(caso, 60))) === "fallo",
    "retirarte muy pronto y dejarla ir barata es fallo");

  /* ---- siempre termina, con cualquier azar ---- */
  let terminan = 0;
  for (let i = 0; i < 300; i++) {
    Math.random = () => (i * 0.61803) % 1;
    const c = casoSubasta(72);
    let p = c.inicio, n = 0;
    while (c.limites.some((m) => m >= p) && n < 500) { p += Math.max(4, Math.round(c.valor * 0.06)); n++; }
    if (n < 500) terminan++;
  }
  ok(terminan === 300, "las 300 subastas de prueba terminan solas");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
