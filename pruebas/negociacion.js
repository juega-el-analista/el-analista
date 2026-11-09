/* ============================================================
   LA NEGOCIACIÓN, COMO UNA MESA DE FICHAJES
   La barra de 0 a 100 y las cuatro cartas no se entendían. Ahora hay
   una mesa con cifras, como en el modo carrera de FIFA (Alessandro,
   9-nov-2026): su oferta, lo que pides y, en el contrato, tu sueldo de
   hoy y los años. Propones; acepta, contraoferta o dice que no. Tres
   propuestas y una paciencia que se acaba.
   Sigue llamándose «anclaje» para que ninguna escena cambie.

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
  "module.exports = { JuegoAnclaje, TIPOS_NEG, FRASES_NEG, casoNegociacion, proponerNeg, aceptarNeg, irseNeg, nivelNegociacion, topeNeg, sueldoNeg, fraseRival, JUEGOS, NEG_RONDAS, NEG_ABRE };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");
/* un caso fijo: tipo y techo a mano */
const caso = (tipo, tope, conAnos) => ({ ...J.casoNegociacion(50, Math.random, conAnos), tipo, tope });

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };
  ok(J.TIPOS_NEG.join() === "apurado,duro,orgulloso", "tres caracteres posibles");

  /* pedir dentro de su techo: acepta en la primera */
  const a = J.proponerNeg(caso("duro", 15), 14);
  ok(a.fin === "acuerdo" && a.cierre === 14, "pedir +14% con techo +15%: acepta a la primera (" + a.cierre + ")");
  ok(J.nivelNegociacion(a) === "parcial", "y +14% es un trato justo");
  ok(J.nivelNegociacion(J.proponerNeg(caso("apurado", 24), 20)) === "exito", "cerrar en +20% es muy buen trato");

  /* pasarse un poco: contraoferta que se acerca y nunca pasa del techo */
  const b = J.proponerNeg(caso("apurado", 20), 24);
  ok(!b.fin && b.oferta > J.NEG_ABRE && b.oferta <= 20 && b.paciencia === 2,
    "pasarse un poco trae una contraoferta (+" + b.oferta + "%) y cuesta un punto de paciencia");
  const b2 = J.aceptarNeg(b);
  ok(b2.fin === "acuerdo" && b2.cierre === b.oferta, "y se puede aceptar su oferta");

  /* pasarse mucho: no, y más paciencia */
  const c1 = J.proponerNeg(caso("orgulloso", 16), 40);
  ok(c1.paciencia === 0 && c1.fin === "levanta", "pedir +40% a un orgulloso con techo +16% hace que se levante");
  const d1 = J.proponerNeg(caso("duro", 14), 40);
  ok(!d1.fin && d1.paciencia === 1, "a un duro le gasta dos puntos de paciencia");
  ok(J.nivelNegociacion(c1) === "fallo", "sin trato, es un fallo");

  /* tres propuestas y su última oferta */
  let e = caso("apurado", 22);
  e = J.proponerNeg(e, 25); e = J.proponerNeg(e, 25); e = J.proponerNeg(e, 25);
  ok(e.fin === "ultima", "tres contraofertas no te echan: llega su última oferta (" + e.fin + ")");
  let e2 = caso("apurado", 22);
  e2 = J.proponerNeg(e2, 24); e2 = J.proponerNeg(e2, 24);
  ok(e2.ronda === 3 && e2.paciencia === 1 && e2.oferta <= 22, "las contraofertas suben hacia su techo (+" + e2.oferta + "%)");
  const e3 = J.irseNeg(J.proponerNeg({ ...e2, paciencia: 3 }, 24));
  ok(e3.fin === "levanta", "a su última oferta se le puede decir que no");

  /* los años: más años, más estira */
  const f = caso("duro", 14, true);
  ok(J.topeNeg(f, 4) > J.topeNeg(f, 3) && J.topeNeg(f, 3) > J.topeNeg(f, 2), "con más años de contrato, más paga");
  ok(J.proponerNeg(f, 16, 4).fin === "acuerdo" && J.proponerNeg(f, 16, 3).fin !== "acuerdo", "+16% entra a cuatro años y no a tres");

  /* siempre termina */
  let bien = 0;
  for (let i = 0; i < 300; i++) {
    let c = J.casoNegociacion(i % 100, () => ((i * 0.618) % 1), i % 2 === 0);
    let n = 0;
    while ((!c.fin || c.fin === "ultima") && n < 10) {
      c = c.fin === "ultima" ? (i % 3 ? J.aceptarNeg(c) : J.irseNeg(c)) : J.proponerNeg(c, (i * 7) % 41, [2, 3, 4][i % 3]);
      n++;
    }
    if ((c.fin === "acuerdo" || c.fin === "levanta") && n <= 4 && ["exito", "parcial", "fallo"].indexOf(J.nivelNegociacion(c)) >= 0) bien++;
  }
  ok(bien === 300, "300 mesas al azar terminan en cuatro pasos o menos con un resultado válido (" + bien + ")");

  /* la lectura contiene su techo y se estrecha con la ayuda */
  let dentro = 0, anchoAlto = 0, anchoBajo = 0;
  for (let i = 0; i < 200; i++) {
    const hi = J.casoNegociacion(100), lo = J.casoNegociacion(0);
    if (hi.lectura[0] <= hi.tope && hi.tope <= hi.lectura[1] && lo.lectura[0] <= lo.tope && lo.tope <= lo.lectura[1]) dentro++;
    anchoAlto += hi.lectura[1] - hi.lectura[0]; anchoBajo += lo.lectura[1] - lo.lectura[0];
  }
  ok(dentro === 200, "tu lectura siempre contiene hasta dónde llega");
  ok(anchoAlto < anchoBajo, "y con más atributo es más precisa (" + (anchoAlto / 200).toFixed(1) + " contra " + (anchoBajo / 200).toFixed(1) + " puntos)");

  /* la ayuda aclara las pistas */
  const acierto = (ayuda) => {
    let n = 0;
    for (let i = 0; i < 500; i++) {
      const c = { ...J.casoNegociacion(ayuda), tipo: "duro" };
      if (J.FRASES_NEG.duro.indexOf(J.fraseRival(c, Math.random)) >= 0) n++;
    }
    return n / 500;
  };
  ok(acierto(100) > 0.85 && acierto(0) < 0.6, "con más ayuda la frase delata más su carácter");

  /* el componente en un contrato, de punta a punta */
  const original = Math.random;
  Math.random = () => 0;   /* apurado, techo bajo de su rango */
  const ctx = { actual: 40000, techo: 999999 };
  let fin = null, extra = null, r;
  await act(async () => { r = TR.create(React.createElement(J.JuegoAnclaje, { ayuda: 60, ctx, onFin: (n, x) => { fin = n; extra = x; } })); });
  const boton = (re) => r.root.findAll((n) => n.type === "button" && re.test(txt(n)))[0];
  const pulsa = async (re) => { const b = boton(re); if (!b) return false; await act(async () => { b.props.onClick(); }); return true; };
  const t0 = txt(r.toJSON());
  ok(/Hoy/.test(t0) && /USD 40\.000/.test(t0) && /Su oferta/.test(t0) && /Tú pides/.test(t0), "la mesa enseña tu sueldo de hoy, su oferta y lo que pides");
  ok(/Años de contrato/.test(t0) && /Tu lectura/.test(t0), "y los años, y tu lectura de hasta dónde llega");
  ok(/Propuesta 1 de 3/.test(t0) && /Paciencia/.test(t0), "se ve la propuesta y la paciencia");
  await pulsa(/^4 años/);
  for (let i = 0; i < 4; i++) await pulsa(/^−$/);   /* de +16% a +8% */
  await pulsa(/^Proponer$/);
  const t1 = txt(r.toJSON());
  ok(/Firmas por USD 43\.200/.test(t1) && /4 años/.test(t1), "pedir +8% a cuatro años se firma en dólares (USD 43.200)");
  await pulsa(/^Continuar/);
  ok(fin === "parcial" && extra && extra.acuerdo && extra.pct === 8 && extra.anos === 4,
    "y al juego le llega el aumento exacto y los años (" + fin + ", " + JSON.stringify(extra) + ")");

  /* fuera del contrato: la mesa habla en % sobre su oferta */
  await act(async () => { r = TR.create(React.createElement(J.JuegoAnclaje, { ayuda: 60, onFin: () => {} })); });
  const t2 = txt(r.toJSON());
  ok(/sobre su oferta/.test(t2) && !/USD/.test(t2) && !/Años de contrato/.test(t2), "en otras escenas, % sobre su oferta, sin sueldo ni años");
  Math.random = original;

  ok(J.JUEGOS.anclaje.n === "La negociación" && /propuestas/.test(J.JUEGOS.anclaje.dur), "la ficha de reglas habla de propuestas");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
