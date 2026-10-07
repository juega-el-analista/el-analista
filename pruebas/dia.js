/* ============================================================
   LA CARRERA DEL DÍA
   La del día tiene que salir igual para todos los que la juegan esa
   fecha, sin tocar el Math.random de la página: el juego vive dentro de
   SurEconomics y un Math.random secuestrado rompería el resto del sitio.

   Se corre con:  npm run dia
   ============================================================ */
const path = require("path");
const fs = require("fs");
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeDia.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { azar, sembrarAzar, soltarAzar, hashTexto };"));
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

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
