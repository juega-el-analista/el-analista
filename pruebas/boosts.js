/* ============================================================
   LOS BOOSTS
   Potenciadores baratos con fecha de vencimiento, como los consumibles
   de El Ídolo (Alessandro, 8-oct-2026): un año o dos de ventaja en ciertos
   minijuegos, energía o reputación, y la suerte de tu lado. Y cada cosa
   que se compra lleva su emoji.

   Se corre con:  npm run boosts
   ============================================================ */
const path = require("path");
const fs = require("fs");
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeBoosts.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { BOOSTS, boostActivo, quedaBoost, ayudaBoosts, probsAzar, sanear, EMOJI_COMPRA, CAPRICHOS, PROPIEDADES, PERKS, JUEGOS };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

ok(J.BOOSTS.length >= 6, "hay al menos seis boosts (" + J.BOOSTS.map((b) => b.e + " " + b.n).join(", ") + ")");
ok(J.BOOSTS.every((b) => b.e && b.n && b.c > 0 && b.c <= 2000 && (b.anos === 1 || b.anos === 2) && b.d),
  "cada uno tiene emoji, nombre, precio accesible, dura uno o dos años y dice qué hace");
ok(J.BOOSTS.every((b) => (b.juegos || []).every((k) => !!J.JUEGOS[k])), "los minijuegos que nombran existen");

const neg = J.BOOSTS.find((b) => (b.juegos || []).indexOf("anclaje") >= 0);
const st = { turno: 5, boosts: [{ id: neg.id, hasta: 7 }] };
ok(J.boostActivo(st, neg.id) && J.quedaBoost(st, neg.id) === 2, "comprado para dos años, está activo y le quedan 2");
ok(J.ayudaBoosts(st, "anclaje") > 0 && J.ayudaBoosts(st, "trading") === 0, "ayuda en sus minijuegos y en los demás no");
ok(!J.boostActivo({ ...st, turno: 7 }, neg.id) && J.ayudaBoosts({ ...st, turno: 7 }, "anclaje") === 0, "cuando vence, deja de ayudar");

const cab = J.BOOSTS.find((b) => b.id === "cabala");
const o = { azar: { esc: [{ p: 0.5, nivel: "exito" }, { p: 0.5, nivel: "fallo" }] } };
const sin = J.probsAzar(o, { turno: 1, boosts: [] })[0];
const con = J.probsAzar(o, { turno: 1, boosts: [{ id: cab.id, hasta: 2 }] })[0];
ok(con > sin, "la cábala inclina las tiradas a favor (" + (sin * 100).toFixed(0) + "% → " + (con * 100).toFixed(0) + "%)");

const g = J.sanear({ turno: 3, boosts: [{ id: neg.id, hasta: 5 }, { id: "inventado", hasta: 9 }, "basura"] });
ok(g.boosts.length === 1 && g.boosts[0].id === neg.id && g.boosts[0].hasta === 5, "los boosts sobreviven al guardado y lo inventado se limpia");
ok(Array.isArray(J.sanear({}).boosts) && J.sanear({}).boosts.length === 0, "un guardado viejo arranca sin boosts");

const todos = [].concat(J.CAPRICHOS, J.PROPIEDADES, J.PERKS);
const sinEmoji = todos.filter((c) => !J.EMOJI_COMPRA[c.id]).map((c) => c.id);
ok(sinEmoji.length === 0, "cada cosa que se compra tiene su emoji" + (sinEmoji.length ? " (faltan: " + sinEmoji.join(", ") + ")" : ""));

try { fs.unlinkSync(tmp); } catch (e) {}
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
