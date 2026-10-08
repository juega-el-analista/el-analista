/* ============================================================
   LA NEGOCIACIÓN
   La barra de 0 a 100 era adivinar un número escondido: sin rival y sin
   riesgo. Ahora hay alguien al otro lado con un carácter que no ves
   (apurado, duro u orgulloso), tres rondas, cuatro cartas y una
   paciencia que se acaba. Leerlo bien gana; leerlo mal hace que se
   levante. Sigue llamándose «anclaje» para que ninguna escena cambie.

   Se corre con:  npm run negociacion
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
const tmp = path.join(__dirname, "probeNeg.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { JuegoAnclaje, TIPOS_NEG, FRASES_NEG, casoNegociacion, jugadaNegociacion, nivelNegociacion, fraseRival, JUEGOS };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

const jugar = (tipo, cartas, ruido) => {
  let c = { ...J.casoNegociacion(50), tipo };
  cartas.forEach((k) => { c = J.jugadaNegociacion(c, k, ruido); });
  return c;
};
const BUENA = {
  apurado: ["competencia", "pedir", "plantarse"],
  duro: ["plantarse", "plantarse", "pedir"],
  orgulloso: ["ceder", "pedir", "competencia"],
};

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };

  ok(J.TIPOS_NEG.join() === "apurado,duro,orgulloso", "tres caracteres posibles");
  /* leer bien gana, incluso con el ruido en contra */
  J.TIPOS_NEG.forEach((t) => {
    [-1, 0, 1].forEach((r) => {
      const c = jugar(t, BUENA[t], r);
      ok(c.fin === "acuerdo" && J.nivelNegociacion(c) === "exito",
        "contra " + t + ", la jugada buena cierra con éxito (ruido " + r + ", precio " + c.precio + ")");
    });
  });
  /* leer mal se paga */
  const mal = jugar("orgulloso", BUENA.duro, 0);
  ok(mal.fin === "levanta" && J.nivelNegociacion(mal) === "fallo", "tratar como duro a un orgulloso hace que se levante");
  const dos = jugar("apurado", ["competencia", "competencia"], 0);
  ok(dos.jugadas.length === 1, "la oferta de la competencia se muestra una sola vez");

  /* siempre termina */
  let bien = 0;
  for (let i = 0; i < 300; i++) {
    const cartas = ["pedir", "ceder", "competencia", "plantarse"];
    let c = J.casoNegociacion(i % 100, () => ((i * 0.618) % 1));
    let n = 0;
    while (!c.fin && n < 10) { c = J.jugadaNegociacion(c, cartas[(i + n) % 4], 0); n++; }
    if (c.fin && c.jugadas.length <= 3 && ["exito", "parcial", "fallo"].indexOf(J.nivelNegociacion(c)) >= 0) bien++;
  }
  ok(bien === 300, "300 negociaciones al azar terminan en tres jugadas o menos con un resultado válido (" + bien + ")");

  /* la ayuda aclara las pistas */
  const acierto = (ayuda) => {
    let n = 0;
    for (let i = 0; i < 500; i++) {
      const c = { ...J.casoNegociacion(ayuda), tipo: "duro" };
      if (J.FRASES_NEG.duro.indexOf(J.fraseRival(c, Math.random)) >= 0) n++;
    }
    return n / 500;
  };
  const alto = acierto(100), bajo = acierto(0);
  ok(alto > 0.85, "con mucha ayuda la pista es clara (" + (alto * 100).toFixed(0) + "%)");
  ok(bajo < 0.6, "con poca ayuda la pista confunde más (" + (bajo * 100).toFixed(0) + "%)");

  /* el componente, de punta a punta */
  const original = Math.random;
  Math.random = () => 0;   /* apurado, ruido −1 */
  let fin = null, r;
  await act(async () => { r = TR.create(React.createElement(J.JuegoAnclaje, { ayuda: 60, onFin: (n) => { fin = n; } })); });
  const boton = (re) => r.root.findAll((n) => n.type === "button" && re.test(txt(n)))[0];
  const pulsa = async (re) => { const b = boton(re); if (!b) return false; await act(async () => { b.props.onClick(); }); return true; };
  ok(/Ronda 1 de 3/.test(txt(r.toJSON())) && /Paciencia/.test(txt(r.toJSON())), "se ve la ronda y la paciencia");
  await pulsa(/competencia/i);
  ok(boton(/competencia/i) && boton(/competencia/i).props.disabled === true, "la competencia se apaga después de usarla");
  await pulsa(/^Pedir más/);
  await pulsa(/^Plantarte/);
  ok(/La otra parte estaba APURADA/.test(txt(r.toJSON())), "al final se revela con quién negociabas");
  await pulsa(/^Continuar/);
  ok(fin === "exito", "y el resultado llega al juego («" + fin + "»)");
  Math.random = original;

  ok(J.JUEGOS.anclaje.n === "La negociación", "la ficha de reglas cambió de nombre");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
