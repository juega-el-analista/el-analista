/* ============================================================
   FALLAR DUELE
   Un minijuego fallido devolvía el 30% de lo bueno y te felicitaba con el
   mismo texto que el éxito. Sin costo no hay tensión: ahora un fallo no
   suma, cuesta algo de reputación y lo dice.

   Se corre con:  npm run fallo
   ============================================================ */
const path = require("path");
const fs = require("fs");
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeFallo.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { escalar, msgFallo };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

const d = { cri: 4, cash: 1000, ene: -3, msg: "Bien hecho" };
const f = J.escalar(d, "fallo");
ok(!f.cri && !f.cash, "lo bueno de la opción no llega si fallas");
ok(f.ene === -5, "lo malo pega más fuerte (−3 → " + f.ene + ")");
ok(f.rep === -2, "y cuesta dos de reputación (" + f.rep + ")");
ok(!("cri" in f) && !("cash" in f), "no quedan «+0» que enseñar");

const e = J.escalar(d, "exito");
ok(e.cri === 6 && e.cash === 1600 && e.ene === -3 && e.rep === undefined, "el éxito sigue igual (×1,6 lo bueno)");
const p = J.escalar(d, "parcial");
ok(p.cri === 4 && p.cash === 1000 && p.ene === -3 && p.rep === undefined, "el parcial sigue igual");
ok(J.escalar({ rep: 3 }, "fallo").rep === -2, "si la opción daba reputación, al fallar solo queda el costo");

const m = J.msgFallo({ t: "Revisar los ajustes uno por uno" });
ok(/^No salió/.test(m) && m.indexOf("Revisar los ajustes uno por uno") >= 0, "el texto dice que no salió y nombra la jugada");
ok(/^No salió/.test(J.msgFallo(null)), "sin opción también hay texto");

try { fs.unlinkSync(tmp); } catch (e2) {}
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
