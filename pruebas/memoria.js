/* ============================================================
   EL JUEGO DE MEMORIA
   Monta solo JuegoMemoria, con el reloj bajo control, y comprueba lo que
   se pidio para el: tres rondas de 3, 4 y 6 casillas, cada una con un
   recorrido nuevo (Alessandro, 8-oct-2026), y que completarlas cierre en exito.

   Se corre con:  npm run memoria
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
async function avanza(ms, paso) {
  const d = paso || 20;
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

/* compilar el juego y sacar el componente, que no se exporta */
const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
let src = fs.readFileSync(comp, "utf8").replace(
  "module.exports = ElAnalista;",
  "module.exports = { ElAnalista, JuegoMemoria, RONDAS_MEM };");
const tmp = path.join(__dirname, "probeMem.js");
fs.writeFileSync(tmp, src);
const { JuegoMemoria, RONDAS_MEM } = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };
  let fin = null, r;
  await act(async () => {
    r = TR.create(React.createElement(JuegoMemoria, { ayuda: 20, onFin: (n) => { fin = n; } }));
  });
  const celdas = () => r.root.findAll((n) => n.type === "button" && /ea-celdaC/.test(n.props.className || ""));
  const lit = () => celdas().findIndex((c) => (c.props.style || {}).transform === "scale(0.94)");
  const info = () => {
    const s = r.root.findAll((n) => n.props && /ea-jinfo/.test(n.props.className || ""))[0];
    const t = (j) => (j == null ? "" : typeof j === "string" ? j : Array.isArray(j) ? j.map(t).join(" ")
      : j.props && j.props.children != null ? t(j.props.children) : "");
    return t(s);
  };

  /* saltar la espera de cortesia */
  const saltar = r.root.findAll((n) => n.type === "button" && /Ya lo mir/.test(JSON.stringify(n.props.children || "")))[0];
  if (saltar) await act(async () => { saltar.props.onClick(); });

  const vistas = [];
  for (let ronda = 0; ronda < RONDAS_MEM.length; ronda++) {
    /* mirar: apuntar cada casilla que se enciende hasta que toque repetir */
    const vista = []; let prev = -1;
    for (let t = 0; t < 12000 && !/Rep[ií]tela/.test(info()); t += 20) {
      const e = lit();
      if (e >= 0 && e !== prev) vista.push(e);
      prev = e;
      await avanza(20);
    }
    vistas.push(vista.slice());
    /* repetirla, tocando cada casilla en orden. Los 200 ms tras cada toque
       dejan apagarse su destello (dura 160) antes del siguiente. */
    for (const i of vista) {
      await act(async () => { celdas()[i].props.onClick(); });
      await avanza(200);
    }
    /* Sin espera ciega aqui. La primera version esperaba 1,4 s sin mirar
       para «dejar pasar el respiro», y en ese hueco se encendia la primera
       casilla de la ronda siguiente: la prueba veia 5 0 6 en vez de
       8 5 0 6, tocaba mal y el juego —con razon— cerraba en fallo. El
       bucle de mirar de arriba ya espera el respiro mientras mira. */
  }
  await avanza(1200);

  console.log("\n  secuencia enseñada por ronda:");
  vistas.forEach((v, k) => console.log("    ronda " + (k + 1) + ":  " + v.join(" ")));
  console.log("");
  ok(vistas.length === 3, "hay tres rondas");
  ok(vistas.map((v) => v.length).join(",") === RONDAS_MEM.join(","),
    "se encienden " + RONDAS_MEM.join(", ") + " casillas (salieron " + vistas.map((v) => v.length).join(", ") + ")");
  /* desde el 8-oct-2026 cada ronda es un recorrido nuevo (antes repetía la anterior, como el Simón) */
  ok(vistas.every((v, k) => k === 0 || v[0] !== vistas[k - 1][0]),
    "cada ronda es un recorrido nuevo: ninguna arranca como la anterior");
  ok(vistas.every((v, k) => k === 0 || !vistas[k - 1].every((x, j) => v[j] === x)),
    "ninguna ronda es la anterior alargada");
  ok(vistas.every((v) => v.every((x, j) => j === 0 || x !== v[j - 1])),
    "nunca la misma casilla dos veces seguidas");
  ok(fin === "exito", "completar las tres rondas cierra en exito (cerro en «" + fin + "»)");
  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
