/* ============================================================
   LA CARTERA EN DOS TOQUES
   La cartera enseñaba unas cuarenta cifras, nueve sliders y palabras como
   beta y Sharpe, y no dejaba avanzar el año con cambios a medias. Ahora
   arriba hay dos decisiones que se aplican al tocarlas; lo técnico vive
   en «Modo experto», plegado.

   Se corre con:  npm run cartera
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
const tmp = path.join(__dirname, "probeCartera.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { PanelCartera, PERFILES, PERFILES_SIMPLES };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };
  const pesos = { ...J.PERFILES[0].w };
  const st = { cash: 10000, cartera: 20000, pesos, objetivo: 0.7 };
  const aplicados = [], pendientes = [];
  let r;
  await act(async () => {
    r = TR.create(React.createElement(J.PanelCartera, {
      st, onAplicar: (w, o) => aplicados.push({ w, o }), onPendiente: (v) => pendientes.push(v),
    }));
  });
  const botones = (re) => r.root.findAll((n) => n.type === "button" && re.test(txt(n)));
  const pantalla = () => txt(r.toJSON());
  const sliders = () => r.root.findAll((n) => n.type === "input" && n.props.type === "range");

  ok(J.PERFILES_SIMPLES.length === 3 && J.PERFILES_SIMPLES.every((p) => J.PERFILES.some((q) => q.id === p.id)),
    "tres perfiles simples, apoyados en los de siempre");
  ok([0, 25, 50, 75, 100].every((p) => botones(new RegExp("^" + p + "%$")).length === 1), "cinco botones de cuánto invertir");
  ok(J.PERFILES_SIMPLES.every((p) => botones(new RegExp(p.n)).length === 1), "los tres perfiles están a la vista");
  ok(!/beta|Retorno por unidad de riesgo|Sharpe/i.test(pantalla()), "sin jerga en la vista simple");
  ok(sliders().length === 0, "sin sliders en la vista simple");

  await act(async () => { botones(/^50%$/)[0].props.onClick(); });
  ok(aplicados.length === 1 && aplicados[0].o === 0.5 && JSON.stringify(aplicados[0].w) === JSON.stringify(pesos),
    "tocar 50% aplica al momento, con los pesos de siempre");

  const eq = J.PERFILES_SIMPLES.find((p) => p.id === "balanceado");
  await act(async () => { botones(new RegExp(eq.n))[0].props.onClick(); });
  const bal = J.PERFILES.find((p) => p.id === "balanceado").w;
  ok(aplicados.length === 2 && JSON.stringify(aplicados[1].w) === JSON.stringify(bal) && aplicados[1].o === 0.7,
    "tocar Equilibrado aplica sus pesos y respeta cuánto inviertes");
  ok(pendientes.every((v) => v === false), "la vista simple nunca deja cambios a medias");

  await act(async () => { botones(/Modo experto/)[0].props.onClick(); });
  ok(sliders().length >= 1, "el modo experto trae los controles finos");
  ok(/Cómo quieres invertirlo/.test(pantalla()), "y los cinco perfiles de siempre");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
