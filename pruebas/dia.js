/* ============================================================
   LA CARRERA DEL DÍA
   La del día tiene que salir igual para todos los que la juegan esa
   fecha, sin tocar el Math.random de la página: el juego vive dentro de
   SurEconomics y un Math.random secuestrado rompería el resto del sitio.

   Se corre con:  npm run dia
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
const tmp = path.join(__dirname, "probeDia.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { azar, sembrarAzar, soltarAzar, hashTexto, ElAnalista, eleccionDelDia, objetivosDelDia,"
  + " OBJETIVOS_DIA, fechaHoy, msHastaManana, sanear, EDADES, NACIONES, CARRERAS, CLAVE, CLAVE_DIA, hechosDelDia, nuevosLogrosDia };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

const tiradas = (n) => { const r = []; for (let i = 0; i < n; i++) r.push(J.azar()); return r; };

(async () => {
  const original = Math.random;

  /* ---- el azar sembrado ---- */
  J.sembrarAzar("2026-10-07:0");
  const a = tiradas(20);
  J.sembrarAzar("2026-10-07:0");
  const b = tiradas(20);
  ok(a.join() === b.join(), "misma semilla, misma secuencia");
  ok(a.every((x) => x >= 0 && x < 1), "las tiradas caen en [0, 1)");
  J.sembrarAzar("2026-10-08:0");
  const c = tiradas(20);
  ok(a.join() !== c.join(), "otra semilla, otra secuencia");
  ok(Math.random === original, "sembrar no toca el Math.random global");
  J.soltarAzar();
  Math.random = () => 0.123;
  ok(J.azar() === 0.123, "sin semilla, el azar vuelve a ser Math.random (las pruebas lo secuestran)");
  Math.random = original;
  ok(J.hashTexto("abc") === J.hashTexto("abc") && J.hashTexto("abc") !== J.hashTexto("abd"), "el hash es estable y distingue");

  /* ---- la elección del día ---- */
  const e1 = J.eleccionDelDia("2026-10-07");
  ok(JSON.stringify(e1) === JSON.stringify(J.eleccionDelDia("2026-10-07")), "la misma fecha da la misma carrera");
  ok(J.EDADES.some((x) => x.e === e1.edad) && J.NACIONES.some((x) => x.id === e1.pais) && J.CARRERAS.some((x) => x.id === e1.estudio),
    "la del día usa edad, país y carrera que existen");
  let distintas = 0;
  for (let d = 1; d <= 30; d++) {
    const f = "2026-11-" + String(d).padStart(2, "0");
    if (JSON.stringify(J.eleccionDelDia(f)) !== JSON.stringify(e1)) distintas++;
  }
  ok(distintas >= 25, "cambia casi todos los días (" + distintas + " de 30)");
  const ob = J.objetivosDelDia("2026-10-07");
  ok(ob.length === 3 && new Set(ob).size === 3 && ob.every((id) => J.OBJETIVOS_DIA.some((o) => o.id === id)),
    "tres objetivos distintos y válidos");
  ok(J.OBJETIVOS_DIA.length >= 8, "hay al menos ocho objetivos posibles");
  ok(/^\d{4}-\d{2}-\d{2}$/.test(J.fechaHoy()), "la fecha de hoy va como AAAA-MM-DD");
  const ms = J.msHastaManana();
  ok(ms > 0 && ms <= 86400000, "la cuenta regresiva cae dentro del día");
  const sa = J.sanear({ dia: "2026-10-07", objDia: ob, ganados: 4 });
  ok(sa.dia === "2026-10-07" && JSON.stringify(sa.objDia) === JSON.stringify(ob) && sa.ganados === 4, "la del día sobrevive al guardado");
  const sb = J.sanear({ dia: "<script>", objDia: ["inventado"], ganados: -3 });
  ok(sb.dia === null && sb.objDia.length === 0 && sb.ganados === 0, "y un guardado manipulado se limpia");

  /* ---- lo que se cumple por el camino se premia y queda ---- */
  const base = { dia: "2026-10-08", objDia: ["pat300", "sindeuda", "vp"], objLogrados: [], rango: 2, deuda: 5000 };
  ok(J.nuevosLogrosDia(base, { pat: 389912, gasto: 30000 }).join() === "pat300",
    "llegar a USD 300.000 a mitad de carrera cuenta en ese mismo cierre");
  ok(J.nuevosLogrosDia({ ...base, deuda: 0 }, { pat: 0, gasto: 1 }).indexOf("sindeuda") < 0,
    "«Termina sin deber nada» no se da por cumplido a mitad de carrera");
  const despues = { ...base, objLogrados: ["pat300"] };
  ok(J.hechosDelDia(despues, { pat: 120000, gasto: 30000 })[0] === true, "y aunque después baje el patrimonio, queda cumplido");
  ok(J.nuevosLogrosDia(despues, { pat: 400000, gasto: 1 }).length === 0, "y no se premia dos veces");
  ok(J.OBJETIVOS_DIA.find((o) => o.id === "pat300").t === "Junta USD 300.000", "el texto dice «Junta», no «Termina»");
  const sg = J.sanear({ dia: "2026-10-08", objDia: ["pat300", "vp", "gana5"], objLogrados: ["pat300", "inventado"] });
  ok(JSON.stringify(sg.objLogrados) === JSON.stringify(["pat300"]), "lo logrado sobrevive al guardado y lo inventado se limpia");

  /* ---- dos jugadores, la misma mañana ---- */
  const jugarLaDelDia = async (rnd) => {
    const mem = new Map();
    mem.set("el-analista-aviso-leido", "1");
    global.window = { localStorage: { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) } };
    Math.random = rnd;
    let r;
    await act(async () => { r = TR.create(React.createElement(J.ElAnalista)); });
    for (let i = 0; i < 6; i++) await act(async () => { await Promise.resolve(); });
    const boton = r.root.findAll((n) => n.type === "button" && /Jugar la del día/.test(JSON.stringify(n.props.children || "")))[0];
    if (!boton) return null;
    await act(async () => { boton.props.onClick(); });
    for (let i = 0; i < 6; i++) await act(async () => { await Promise.resolve(); });
    const crudo = mem.get(J.CLAVE);
    await act(async () => { r.unmount(); });
    Math.random = original;
    try { return JSON.parse(crudo).s; } catch (e) { return null; }
  };
  let x = 1;
  const otroAzar = () => { x = (x * 48271) % 2147483647; return x / 2147483647; };
  const a1 = await jugarLaDelDia(() => 0.11);
  const a2 = await jugarLaDelDia(otroAzar);
  ok(!!a1 && !!a2, "el botón «Jugar la del día» arranca una partida guardada");
  if (a1 && a2) {
    const hoy = J.eleccionDelDia(J.fechaHoy());
    ok(a1.pais === hoy.pais && a1.estudio === hoy.estudio && a1.edadIni === hoy.edad, "arranca con la carrera de hoy");
    ok(a1.dia === J.fechaHoy() && a1.objDia.length === 3, "y queda marcada como la del día, con sus objetivos");
    ok(a1.semilla === a2.semilla, "la semilla de la pretemporada es la misma para los dos");
    ok(JSON.stringify(a1.cola) === JSON.stringify(a2.cola) && a1.cola.length >= 2,
      "con azares distintos, el primer año trae las mismas escenas (" + a1.cola.join(", ") + ")");
  }
  ok(Math.random === original, "y el Math.random de la página queda como estaba");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
