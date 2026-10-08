/* ============================================================
   EL CONTRATO, COMO UN MERCADO DE PASES
   Al vencer el contrato salían tres renovaciones casi iguales y no se veía
   ningún sueldo. Ahora, como en El Ídolo (Alessandro, 8-oct-2026):
   renovar donde estás, tres ofertas de firmas distintas con su carácter,
   negociar con tu firma, y en cada una el sueldo nuevo.

   Se corre con:  npm run contrato
   ============================================================ */
const path = require("path");
const fs = require("fs");
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeContrato.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { escenaContrato, escenaDeId, sueldoCon, PATRONES, ESCENA_CONTRATO };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

const st = { estudio: "con", pais: "ar", rango: 2, sueldoMult: 1.1, turno: 4, semilla: 99, patron: "Vargas & Prieto Auditores" };
const e = J.escenaContrato(st);
ok(e.id === J.ESCENA_CONTRATO.id, "es la escena del contrato (" + e.id + ")");
const renovar = e.o.filter((o) => o.contrato && !o.patronNuevo && !o.j);
const ofertas = e.o.filter((o) => o.patronNuevo);
const negociar = e.o.filter((o) => o.j === "anclaje");
ok(renovar.length === 1 && renovar[0].t.indexOf(st.patron) >= 0, "una opción renueva donde estás («" + (renovar[0] || {}).t + "»)");
ok(ofertas.length === 3, "tres ofertas de otras firmas");
ok(new Set(ofertas.map((o) => o.patronNuevo)).size === 3 && ofertas.every((o) => o.patronNuevo !== st.patron),
  "las tres firmas son distintas entre sí y de la tuya (" + ofertas.map((o) => o.patronNuevo).join(", ") + ")");
ok(new Set(ofertas.map((o) => o.etq)).size === 3, "y cada una tiene su carácter (" + ofertas.map((o) => o.etq).join(", ") + ")");
ok(new Set(ofertas.map((o) => o.contrato.mult)).size === 3, "y paga distinto");
ok(negociar.length === 1 && negociar[0].t.indexOf(st.patron) >= 0, "y queda negociar con tu firma («" + (negociar[0] || {}).t + "»)");
ok(e.o.every((o) => o.sueldo > 0), "todas muestran el sueldo nuevo");
ok(ofertas.every((o) => o.sueldo === Math.round(J.sueldoCon(st, o.contrato.mult))), "y el sueldo es el que vas a cobrar");
ok(J.sueldoCon(st, 1) > 0 && J.sueldoCon({ ...st, rango: 4 }, 1) > J.sueldoCon(st, 1), "el sueldo sube con el cargo");
ok(JSON.stringify(J.escenaContrato(st)) === JSON.stringify(e), "mismo año y semilla, mismas ofertas (una recarga no las cambia)");
ok(JSON.stringify(J.escenaDeId(J.ESCENA_CONTRATO.id, st)) === JSON.stringify(e), "y se rearma desde su id");
ok(JSON.stringify(J.escenaContrato({ ...st, turno: 7 })) !== JSON.stringify(e), "otro año, otras ofertas");
ok(Object.keys(J.PATRONES).every((k) => J.PATRONES[k].length >= 6), "cada carrera tiene al menos seis firmas");

try { fs.unlinkSync(tmp); } catch (e2) {}
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
