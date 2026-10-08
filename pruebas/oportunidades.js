/* ============================================================
   LAS OPORTUNIDADES DE MERCADO
   El reparto activo por activo salió de la cartera (Alessandro, 8-oct):
   ahora llega muy de vez en cuando como una oportunidad con nombre, un
   rumor o una noticia, y decides cuánto de tu cartera meter. Sale bien o
   mal según su probabilidad y el resultado vuelve a tu cartera.

   Se corre con:  npm run oportunidades
   ============================================================ */
const path = require("path");
const fs = require("fs");
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeOport.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { OPORTUNIDADES, aplicarApuesta, escenaDeId, IDS_ESCENA_VALIDOS, OPORT_MAX, OPORT_PROB };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

ok(J.OPORTUNIDADES.length >= 6, "hay al menos seis oportunidades distintas (" + J.OPORTUNIDADES.length + ")");
J.OPORTUNIDADES.forEach((e) => {
  const apuestas = e.o.filter((o) => o.apuesta);
  const quieto = e.o.filter((o) => !o.apuesta);
  ok(apuestas.length === 2 && quieto.length === 1, "«" + e.t + "»: dos formas de meterse y una de no tocar nada");
  ok(apuestas.every((o) => /de tu cartera en/.test(o.t)), "  y dice cuánto y dónde (" + apuestas.map((o) => o.t).join(" / ") + ")");
  ok(apuestas.every((o) => o.apuesta.p > 0 && o.apuesta.p < 1 && o.apuesta.sube > 0 && o.apuesta.baja > 0 && o.apuesta.baja < 1),
    "  con probabilidad, subida y caída razonables");
  ok(J.IDS_ESCENA_VALIDOS.indexOf(e.id) >= 0 && J.escenaDeId(e.id, {}) === e, "  y se puede guardar y retomar");
});
ok(J.OPORT_MAX <= 2 && J.OPORT_PROB <= 0.1, "salen muy poco: como mucho " + J.OPORT_MAX + " por carrera, " + (J.OPORT_PROB * 100) + "% por año");

const ap = { pct: 0.1, p: 0.5, sube: 0.3, baja: 0.12, lo: "oro" };
const bien = J.aplicarApuesta(50000, ap, true);
ok(bien.delta === 1500 && bien.cartera === 51500, "si sale bien, lo que metiste gana y vuelve a la cartera (+" + bien.delta + ")");
ok(/oro/.test(bien.msg) && /1\.500|1500/.test(bien.msg), "  y el texto dice qué pasó y cuánto");
const mal = J.aplicarApuesta(50000, ap, false);
ok(mal.delta === -600 && mal.cartera === 49400, "si sale mal, pierdes solo lo que metiste por la caída (" + mal.delta + ")");
const cero = J.aplicarApuesta(0, ap, true);
ok(cero.delta === 0 && cero.cartera === 0, "sin cartera no hay nada que ganar ni perder");

try { fs.unlinkSync(tmp); } catch (e) {}
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
