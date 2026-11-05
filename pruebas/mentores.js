/* ============================================================
   LOS MENTORES TIENEN QUE OPINAR DISTINTO
   Recorre todas las escenas del juego con dos opciones o más y mira qué
   elegiría cada mentor. Si dos mentores eligen lo mismo casi siempre,
   son el mismo personaje con otro nombre, y «Jugaste como…» no dice
   nada. Mide, por pareja, en cuántas decisiones coinciden.

   Se corre con:  npm run mentores
   Falla si alguna pareja coincide en más del 70% de las decisiones, o
   si la pareja paciente/arriesgado (Búfalo y Tusk) pasa del 40%. Antes
   de afinarlos (nov-2026) Tusk y Nakamotto coincidían en el 90% de las
   decisiones importantes. Por debajo de ~40% no se baja: en muchas
   escenas hay una opción mejor en todo y la elegiría cualquiera.
   ============================================================ */
const path = require("path");
const fs = require("fs");
const { cargar } = require(path.join(__dirname, "banco.js"));

/* banco.js deja el juego compilado en pruebas/compilado.js; se le añade
   una salida con lo que esta prueba necesita leer por dentro */
cargar(process.argv[2] || path.join(__dirname, "..", "src", "el-analista.jsx"));
const ruta = path.join(__dirname, "compilado.js");
const extra = "\nmodule.exports.__mentores = { MENTORES, mentorElige, decisionImportante, todas: [].concat(E, D, E2, E3 || [], CONSECUENCIAS, (LOTES.escenas || []), (LOTES.propias || []), VIDA) };\n";
fs.writeFileSync(ruta, fs.readFileSync(ruta, "utf8") + extra);
delete require.cache[ruta];
const { MENTORES, mentorElige, decisionImportante, todas } = require(ruta).__mentores;

/* el riesgo de verdad depende del estado de la partida; aquí basta con el
   que se ve escrito en la opción */
const riesgo = (o) => {
  if (!o || o.juego || o.j) return null;
  if (o.chk) { const d = Number(o.chk.dif) || 50; return d >= 65 ? { c: "alto" } : d >= 45 ? { c: "medio" } : { c: "bajo" }; }
  if (o.apuesta) { const p = Number(o.apuesta.p) || 0.5; return p < 0.4 ? { c: "alto" } : p < 0.65 ? { c: "medio" } : { c: "bajo" }; }
  if (o.azar) return { c: "medio" };
  return null;
};

const escenas = todas.filter((e) => e && Array.isArray(e.o) && e.o.filter((o) => o && o.t).length >= 2);
const importantes = escenas.filter((e) => { try { return decisionImportante(e); } catch (x) { return false; } });
const medir = (lista) => {
  const elige = MENTORES.map((m) => lista.map((e) => mentorElige(m, e.o.filter((o) => o && o.t), riesgo)));
  const pares = [];
  for (let a = 0; a < MENTORES.length; a++) for (let b = a + 1; b < MENTORES.length; b++) {
    let igual = 0;
    lista.forEach((_, i) => { if (elige[a][i] === elige[b][i]) igual++; });
    pares.push({ a: MENTORES[a].id, b: MENTORES[b].id, pct: Math.round(100 * igual / Math.max(1, lista.length)) });
  }
  return pares.sort((x, y) => y.pct - x.pct);
};

let fallos = 0;
[["todas las decisiones", escenas], ["las importantes (donde el mentor habla)", importantes]].forEach(([n, lista]) => {
  const pares = medir(lista);
  const media = Math.round(pares.reduce((s, p) => s + p.pct, 0) / pares.length);
  console.log("\n  " + n + ": " + lista.length + " escenas · coincidencia media entre mentores " + media + "%");
  pares.slice(0, 6).forEach((p) => console.log("    " + String(p.pct).padStart(3) + "%  " + p.a + " y " + p.b));
  console.log("    …");
  pares.slice(-3).forEach((p) => console.log("    " + String(p.pct).padStart(3) + "%  " + p.a + " y " + p.b));
  const peor = pares[0];
  if (peor.pct > 70) { console.log("  FALLO  " + peor.a + " y " + peor.b + " coinciden en el " + peor.pct + "%"); fallos++; }
  const bt = pares.find((p) => (p.a === "tusk" && p.b === "bufalo") || (p.a === "bufalo" && p.b === "tusk"));
  if (bt && bt.pct > 40) { console.log("  FALLO  Búfalo y Tusk coinciden en el " + bt.pct + "%"); fallos++; }
});
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
