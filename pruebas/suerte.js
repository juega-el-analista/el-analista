/* ============================================================
   AGUANTAR LA POSICIÓN, COMO EL JUEGO DEL AVIÓN
   Monta solo JuegoSuerte, con el reloj y el azar bajo control, y
   comprueba lo que se pidió: el múltiplo sube solo, el jugador decide
   cuándo cerrar, se da vuelta en un punto al azar, hay tres intentos y
   cuenta el mejor.

   Se corre con:  npm run suerte
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
async function avanza(ms) {
  const d = 50;
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

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeSuerte.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { JuegoSuerte, vueltaSuerte, SUERTE_TOPE };"));
const { JuegoSuerte, vueltaSuerte, SUERTE_TOPE } = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.props && j.props.children != null ? txt(j.props.children) : "");
const numX = (s) => Number(String(s).replace("x", "").replace(",", "."));

/* cola de azares: cada intento consume uno para decidir dónde se da vuelta */
let azares = [];
Math.random = () => (azares.length ? azares.shift() : 0.5);

/* La cola se carga DESPUÉS de montar: React gasta un Math.random al crear
   el árbol (su clave interna) y se comería el primer azar de la cola. */
async function montar(ayuda, cola) {
  let fin = null, r;
  await act(async () => { r = TR.create(React.createElement(JuegoSuerte, { ayuda, onFin: (n) => { fin = n; } })); });
  azares = cola.slice();
  const boton = (re) => r.root.findAll((n) => n.type === "button" && re.test(txt(n)))[0];
  const mult = () => numX(txt(r.root.findAll((n) => n.props && /ea-mult/.test(n.props.className || ""))[0]));
  const hist = () => r.root.findAll((n) => n.props && /ea-suerteH\b/.test(n.props.className || "")).map((n) => n.props.className);
  const pulsa = async (re) => { const b = boton(re); if (!b) return false; await act(async () => { b.props.onClick(); }); return true; };
  /* sube hasta llegar a m (o hasta que se dé vuelta) */
  const hasta = async (m) => { for (let i = 0; i < 400 && boton(/^Cerrar en/) && mult() < m; i++) await avanza(100); };
  return { r, boton, mult, hist, pulsa, hasta, fin: () => fin };
}

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };

  /* ---- partida 1: cierra alto, se da vuelta, se da vuelta al abrir ---- */
  const a = await montar(72, [0.95, 0.3, 0]);
  ok(a.mult() === 1 && !!a.boton(/^Abrir la posición/), "empieza en 1,00x con el botón de abrir");
  await a.pulsa(/^Abrir la posición/);
  await avanza(2000);
  ok(a.mult() > 1.3, "el múltiplo sube solo (a los 2 s va en " + a.mult() + "x)");
  await a.hasta(3.2);
  const cerradoEn = a.mult();
  await a.pulsa(/^Cerrar en/);
  await avanza(1500);
  ok(a.mult() === cerradoEn, "al cerrar el número se queda quieto (" + cerradoEn + "x)");
  ok(a.hist()[0] && /\bok\b/.test(a.hist()[0]), "el intento cerrado queda anotado en verde");
  ok(!!a.boton(/Otro intento · quedan 2/), "quedan dos intentos");

  await a.pulsa(/Otro intento/);
  await a.hasta(99);   /* no cierra: aguanta hasta que se dé vuelta */
  ok(a.hist().length === 2 && /\bmal\b/.test(a.hist()[1]), "si no cierras a tiempo, se da vuelta y ese intento se pierde");

  await a.pulsa(/Otro intento/);
  ok(a.hist().length === 3 && /\bmal\b/.test(a.hist()[2]), "a veces se da vuelta nada más abrir");
  await avanza(1600);
  ok(a.fin() === "exito", "cuenta el mejor de los tres: " + cerradoEn + "x es éxito (cerró en «" + a.fin() + "»)");
  ok(!a.boton(/Otro intento|Abrir|Cerrar/), "después del tercero no hay más botones");

  /* ---- partida 2: lo mejor es 2,x → parcial ---- */
  const b = await montar(72, [0.95, 0.95, 0.95]);
  for (let i = 0; i < 3; i++) {
    await b.pulsa(i === 0 ? /^Abrir/ : /Otro intento/);
    await b.hasta(2.1);
    await b.pulsa(/^Cerrar en/);
  }
  await avanza(1600);
  ok(b.fin() === "parcial", "si lo mejor fue 2,1x es resultado a medias (cerró en «" + b.fin() + "»)");

  /* ---- partida 3: los tres se dan vuelta → fallo ---- */
  const c = await montar(72, [0, 0, 0]);
  await c.pulsa(/^Abrir/); await c.pulsa(/Otro intento/); await c.pulsa(/Otro intento/);
  await avanza(1600);
  ok(c.fin() === "fallo", "tres vueltas es fallo (cerró en «" + c.fin() + "»)");

  /* ---- el punto de vuelta ---- */
  azares = [];
  const muestra = []; for (let i = 0; i < 4000; i++) { Math.random = () => i / 4000; muestra.push(vueltaSuerte(72)); }
  ok(muestra.every((v) => v >= 1 && v <= SUERTE_TOPE), "nunca se da vuelta por debajo de 1x ni pasa del tope de " + SUERTE_TOPE + "x");
  const media = (ay) => { let s = 0; for (let i = 0; i < 4000; i++) { Math.random = () => i / 4000; s += vueltaSuerte(ay); } return s / 4000; };
  ok(media(90) > media(10), "con mejor atributo aguanta más en promedio (" + media(10).toFixed(2) + "x → " + media(90).toFixed(2) + "x)");
  Math.random = () => 0.999999999;
  ok(vueltaSuerte(72) === SUERTE_TOPE, "un azar extremo se queda en el tope, no en infinito");
  Math.random = () => NaN;
  ok(vueltaSuerte(72) >= 1 && vueltaSuerte(72) <= SUERTE_TOPE, "un Math.random roto no rompe el juego");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
