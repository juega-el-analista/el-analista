/* ============================================================
   LA PRETEMPORADA Y LAS MEJORAS DEL PRIMER AÑO
   Cada año empieza eligiendo una de tres cartas: progreso que se ve desde
   el primer clic. Las cartas salen de la semilla de la partida y del año,
   así que una recarga a mitad de año rearma la misma escena desde su id.
   Y Mejoras se abre el primer año, con mejoras que un pasante puede pagar.

   Se corre con:  npm run pretemporada
   ============================================================ */
const path = require("path");
const fs = require("fs");
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probePre.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { escenaPretemporada, escenaDeId, IDS_ESCENA_VALIDOS, APERTURAS, PERKS, sanear, ID_PRE };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const ATR = ["ene", "cri", "mod", "red", "rep"];
const efecto = (o) => ATR.filter((k) => o.d && o.d[k]);

(() => {
  const st = { turno: 3, semilla: 77 };
  const e = J.escenaPretemporada(st);
  ok(e && e.id === J.ID_PRE && e.id === 9790, "la escena es la 9790");
  ok(Array.isArray(e.o) && e.o.length === 3, "trae tres cartas");
  ok(e.o.every((o) => efecto(o).length === 1), "cada carta mueve exactamente un atributo");
  ok(e.o.every((o) => [2, 3, 4].indexOf(o.d[efecto(o)[0]]) >= 0), "cada carta suma 2, 3 o 4");
  ok(e.o.every((o) => typeof o.d.msg === "string" && o.d.msg.length > 0), "cada carta dice lo que dio");
  ok(JSON.stringify(J.escenaPretemporada(st)) === JSON.stringify(e), "mismo año y semilla, mismas cartas");
  ok(JSON.stringify(J.escenaPretemporada({ turno: 4, semilla: 77 })) !== JSON.stringify(e), "otro año, otras cartas");
  ok(JSON.stringify(J.escenaDeId(9790, st)) === JSON.stringify(e), "una recarga la rearma desde su id");
  ok(J.IDS_ESCENA_VALIDOS.indexOf(9790) >= 0, "la cola guardada acepta la 9790");

  let doradas = 0, total = 0;
  for (let s = 0; s < 400; s++) for (let t = 0; t < 5; t++) {
    J.escenaPretemporada({ turno: t, semilla: s }).o.forEach((o) => { total++; if (o.d[efecto(o)[0]] === 4) doradas++; });
  }
  const pct = doradas / total;
  ok(pct > 0.03 && pct < 0.07, "las doradas rondan el 5% (" + (pct * 100).toFixed(1) + "%)");

  ok(J.APERTURAS[0].id === "mejoras" && J.APERTURAS[0].rango === 1 && J.APERTURAS[0].ano === 0,
    "Mejoras es la primera apertura y llega el primer año");
  ["excel", "diario", "after", "zapas"].forEach((id) => {
    const p = J.PERKS.find((x) => x.id === id);
    ok(!!p && p.c <= 800, "existe la mejora barata «" + id + "»" + (p ? " (USD " + p.c + ")" : ""));
  });
  ok(J.sanear({ semilla: 12345 }).semilla === 12345, "la semilla sobrevive al guardado");
})();

try { fs.unlinkSync(tmp); } catch (e) {}
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
