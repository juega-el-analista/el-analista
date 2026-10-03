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
cargar(require("./unir.js").rutaUnida());
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeEst.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { JuegoEstructura, casoEstructura, resultadoEstructura, EST_TOPE, JUEGOS };"));
const { JuegoEstructura, casoEstructura, resultadoEstructura, EST_TOPE, JUEGOS } = require(tmp);

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
  await act(async () => { r = TR.create(React.createElement(JuegoEstructura, { ayuda: 72, onFin: (n) => { fin = n; } })); });
  const pantalla = () => txt(r.toJSON());
  ok(!/EBITDA|covenant|cobertura/i.test(pantalla()), "la pantalla no usa jerga");
  ok(/Meta: 2,0x o más/.test(pantalla()) && /Meta: conservar 30% o más/.test(pantalla()), "las dos metas se ven");
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
