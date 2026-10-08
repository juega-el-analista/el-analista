/* ============================================================
   ARMAR LA ESTRUCTURA, CON DOS METAS A LA VISTA
   La versión anterior no se podía ganar en ningún caso: esta prueba
   existe para que no vuelva a pasar. Comprueba que en toda empresa
   posible hay una franja de préstamo que cumple las dos metas, que la
   franja se mueve, y que el juego cierra con el resultado que enseña.

   Se corre con:  npm run estructura
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
const tmp = path.join(__dirname, "probeEst.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { JuegoEstructura, casoEstructura, resultadoEstructura, contextoEstructura, EST_TOPE, JUEGOS };"));
const { JuegoEstructura, casoEstructura, resultadoEstructura, contextoEstructura, EST_TOPE, JUEGOS } = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };

  /* ---- toda empresa posible se puede ganar ---- */
  const franjas = new Set();
  let ganables = 0, N = 0;
  for (const ayuda of [0, 40, 72, 100]) {
    for (let i = 0; i < 50; i++) {
      Math.random = () => i / 50;
      const c = casoEstructura(ayuda);
      N++;
      const buenas = [];
      for (let d = 0; d <= EST_TOPE; d += 5) if (resultadoEstructura(c, d).nivel === "exito") buenas.push(d);
      if (buenas.length >= 2) ganables++;
      franjas.add(buenas[0]);
    }
  }
  ok(ganables === N, "en las " + N + " empresas probadas hay al menos dos puntos de la barra que ganan (" + ganables + ")");
  ok(franjas.size >= 4, "la franja buena cambia de sitio entre partidas (" + [...franjas].sort((a, b) => a - b).join(", ") + ")");

  /* ---- las metas cambian de partida en partida, y siempre se pueden ganar ---- */
  const metasBien = new Set(), metasMal = new Set();
  let siempre = true;
  for (let i = 0; i < 200; i++) {
    let k = i;
    Math.random = () => { k = (k * 9301 + 49297) % 233280; return k / 233280; };
    const c = casoEstructura(i % 100);
    metasBien.add(c.metaBien); metasMal.add(c.metaMal);
    let gana = 0;
    for (let d = 0; d <= EST_TOPE; d += 5) if (resultadoEstructura(c, d).nivel === "exito") gana++;
    if (gana < 2 || c.sube <= 0 || c.baja <= 0 || c.baja >= 1) siempre = false;
  }
  ok(metasBien.size >= 4 && metasMal.size >= 4, "las metas varían (bien: " + [...metasBien].sort().join(", ") + " · mal: " + [...metasMal].sort().join(", ") + ")");
  ok(siempre, "con cualquier par de metas sigue habiendo una franja que gana");

  /* ---- el monto va con la situación ---- */
  const firma = contextoEstructura({ firmaPropia: true }, { estudio: "eco", rango: 3, cash: 40000, cartera: 0 });
  ok(firma.propio && firma.precio > 1000 && firma.precio < 1e6, "montar tu firma usa lo que cuesta montarla (USD " + firma.precio + "), no 100 millones");
  ok(/firma|bufete|boutique|consultora|estudio|gestora|despacho/i.test(firma.que), "y dice que montas lo tuyo («" + firma.que + "»)");
  Math.random = () => 0.5;
  const jr = contextoEstructura({ j: "estructura" }, { rango: 2 });
  const sr = contextoEstructura({ j: "estructura" }, { rango: 5 });
  ok(!jr.propio && /cliente/i.test(jr.que), "en la escena del cliente, compra tu cliente («" + jr.que + "»)");
  ok(sr.precio > jr.precio * 3, "un director maneja operaciones más grandes que un analista (" + jr.precio + " → " + sr.precio + ")");
  ok(jr.precio < 100e6, "y un analista senior no maneja 100 millones (" + jr.precio + ")");

  /* ---- las dos metas tiran en sentidos contrarios ---- */
  Math.random = () => 0.5;
  const c = casoEstructura(72);
  const sin = resultadoEstructura(c, 0), tope = resultadoEstructura(c, EST_TOPE);
  ok(sin.okMal && !sin.okBien, "sin préstamo aguantas si va mal, pero no ganas lo suficiente si va bien");
  ok(tope.okBien && !tope.okMal, "con el préstamo al tope ganas mucho si va bien, pero te quedas sin nada si va mal");
  ok(tope.bien > sin.bien && tope.mal < sin.mal, "más préstamo, más ganancia y más pérdida");

  /* ---- sin jerga ---- */
  const reglas = [JUEGOS.estructura.i].concat(JUEGOS.estructura.pasos, JUEGOS.estructura.gana).join(" ");
  ok(!/EBITDA|mezzanine|senior|covenant|cobertura/i.test(reglas), "las reglas no usan jerga");

  /* ---- el componente ---- */
  let fin = null, r;
  const ctx = { precio: 26000, que: "Montas tu consultora", propio: true };
  Math.random = () => 0.5;
  const esperado = casoEstructura(72);
  await act(async () => { r = TR.create(React.createElement(JuegoEstructura, { ayuda: 72, ctx, onFin: (n) => { fin = n; } })); });
  const pantalla = () => txt(r.toJSON());
  ok(!/EBITDA|covenant|cobertura/i.test(pantalla()), "la pantalla no usa jerga");
  const mb = esperado.metaBien.toFixed(1).replace(".", ","), mm = Math.round(esperado.metaMal * 100);
  ok(pantalla().indexOf("Meta: " + mb + "x o más") >= 0 && pantalla().indexOf("Meta: conservar " + mm + "% o más") >= 0,
    "las dos metas del caso se ven (" + mb + "x y " + mm + "%)");
  ok(/Montas tu consultora/.test(pantalla()) && /USD 26\.000/.test(pantalla()) && !/100 millones/.test(pantalla()),
    "la pantalla cuenta la situación real con su monto");
  const barra = r.root.findByType("input");
  const boton = (re) => r.root.findAll((n) => n.type === "button" && re.test(txt(n)))[0];
  /* buscar un punto ganador moviendo la barra, como haría el jugador */
  let gano = false;
  for (let d = 0; d <= EST_TOPE && !gano; d += 5) {
    await act(async () => { barra.props.onChange({ target: { value: String(d) } }); });
    gano = (pantalla().match(/✓/g) || []).length === 2;
  }
  ok(gano, "moviendo la barra se llega a las dos metas en verde");
  await act(async () => { boton(/^Cerrar el trato/).props.onClick(); });
  ok(barra.props.disabled === true, "al cerrar, la barra se bloquea");
  await act(async () => { boton(/^Continuar/).props.onClick(); });
  ok(fin === "exito", "las dos metas cierran en éxito (cerró en «" + fin + "»)");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
