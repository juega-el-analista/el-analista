/* ============================================================
   COMPARTIR LA CARRERA
   El final no se podía enseñar a nadie. Ahora hay un botón que usa el
   menú de compartir del teléfono, o copia el texto, o como último recurso
   lo deja a la vista para copiarlo a mano.

   Se corre con:  npm run compartir
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
const tmp = path.join(__dirname, "probeCompartir.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { apodoDe, textoCompartir, BotonCompartir };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

const st = { rango: 4, turno: 10, edadIni: 20, ene: 40, cri: 81, mod: 50, red: 30, rep: 60, genero: "f", propia: false };

(async () => {
  ok(J.apodoDe(st) === "Ojo para la crisis", "el apodo sale del atributo más alto (" + J.apodoDe(st) + ")");
  ok(/^Dueña de su firma · /.test(J.apodoDe({ ...st, propia: true })), "con firma propia y género femenino, «Dueña de su firma»");
  ok(/^Dueño de su firma · /.test(J.apodoDe({ ...st, propia: true, genero: "m" })), "con género masculino, «Dueño de su firma»");
  ok(/^Con firma propia · /.test(J.apodoDe({ ...st, propia: true, genero: null })), "sin género, «Con firma propia»");

  const t = J.textoCompartir(st, 1234567, null);
  ok(/Vicepresidente/.test(t) && /30/.test(t) && /USD/.test(t), "el texto trae cargo, edad y patrimonio");
  ok(t.indexOf("Ojo para la crisis") >= 0, "y el apodo");
  ok(t.indexOf("sureconomics.com/el-analista") >= 0, "y el link para jugar");
  ok(!/[✅❌]/.test(t), "sin la del día, no hay casillas");
  const td = J.textoCompartir({ ...st, dia: "2026-10-07" }, 5000, [true, false, true]);
  ok(td.indexOf("✅❌✅") >= 0 && td.indexOf("2026-10-07") >= 0, "con la del día, la fila de casillas y la fecha");

  /* el botón, con cada navegador posible. En Node 24 navigator ya existe y no se reasigna con =. */
  const ponerNavegador = (v) => Object.defineProperty(globalThis, "navigator", { value: v, configurable: true, writable: true });
  const montar = async () => {
    let r;
    await act(async () => { r = TR.create(React.createElement(J.BotonCompartir, { texto: "hola" })); });
    const b = () => r.root.findAll((n) => n.type === "button")[0];
    await act(async () => { await b().props.onClick(); });
    for (let i = 0; i < 4; i++) await act(async () => { await Promise.resolve(); });
    return r;
  };
  let compartido = null;
  ponerNavegador({ share: (d) => { compartido = d; return Promise.resolve(); } });
  await montar();
  ok(compartido && compartido.text === "hola", "con menú de compartir, lo usa");

  let copiado = null;
  ponerNavegador({ clipboard: { writeText: (x) => { copiado = x; return Promise.resolve(); } } });
  const r2 = await montar();
  ok(copiado === "hola" && /Copiado/.test(txt(r2.toJSON())), "sin menú, copia el texto y lo dice");

  ponerNavegador({});
  const r3 = await montar();
  ok(r3.root.findAll((n) => n.type === "textarea").length === 1, "sin nada, deja el texto a la vista para copiarlo");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
