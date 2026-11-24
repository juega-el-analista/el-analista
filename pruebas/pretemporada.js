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
  "module.exports = { escenaPretemporada, escenaDeId, IDS_ESCENA_VALIDOS, APERTURAS, PERKS, sanear, ID_PRE, esVacacion, VACACIONES_COMPRA };"));
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
  ok(e.o.every((o) => efecto(o).length === (o.rareza === "iconica" ? 2 : 1)), "cada carta mueve un atributo (la icónica, dos)");
  ok(e.o.every((o) => [4, 16, 30].indexOf(o.d[efecto(o)[0]]) >= 0), "cada carta suma 4, 16 o 30");
  ok(e.o.every((o) => typeof o.d.msg === "string" && o.d.msg.length > 0), "cada carta dice lo que dio");
  /* como El Ídolo (11-nov-2026): común +4, rara +16, dorada +30, y la
     icónica +30 más un segundo atributo */
  let rarezaBien = true, unaEstrella = true;
  for (let s = 0; s < 300; s++) {
    const os = J.escenaPretemporada({ turno: s % 9, semilla: s }).o;
    os.forEach((o) => {
      const vs = efecto(o).map((k) => o.d[k]).sort((a, b) => b - a);
      const v = vs[0];
      if (o.rareza === "iconica") { if (v !== 30 || vs.length !== 2) rarezaBien = false; return; }
      if ((v === 30) !== (o.rareza === "dorada") || (v === 16) !== (o.rareza === "rara") || (v === 4) !== !o.rareza) rarezaBien = false;
      if (/RARA|DORADA|IC[OÓ]NICA/.test(o.t)) rarezaBien = false;
    });
    if (os.filter((o) => o.rareza === "dorada" || o.rareza === "iconica").length > 1) unaEstrella = false;
  }
  ok(rarezaBien, "la rareza va aparte (rara +16, dorada +30, icónica +30 y otro) y no ensucia el texto");
  ok(unaEstrella, "solo la carta estrella puede ser dorada o icónica: nunca dos por etapa");
  ok(JSON.stringify(J.escenaPretemporada(st)) === JSON.stringify(e), "mismo año y semilla, mismas cartas");
  ok(JSON.stringify(J.escenaPretemporada({ turno: 4, semilla: 77 })) !== JSON.stringify(e), "otro año, otras cartas");
  ok(JSON.stringify(J.escenaDeId(9790, st)) === JSON.stringify(e), "una recarga la rearma desde su id");
  ok(J.IDS_ESCENA_VALIDOS.indexOf(9790) >= 0, "la cola guardada acepta la 9790");

  /* por etapa: dorada ~6% e icónica ~1,5% (solo desde la segunda etapa);
     por carta, raras ~22% (la estrella 25% y las otras dos 20%) */
  let doradas = 0, raras = 0, iconicas = 0, iconPrimera = 0, etapas = 0, etapasIc = 0, total = 0;
  for (let s = 0; s < 1500; s++) for (let t = 0; t < 10; t += 2) {
    etapas++; if (t >= 2) etapasIc++;
    J.escenaPretemporada({ turno: t, semilla: s }).o.forEach((o) => {
      total++;
      if (o.rareza === "dorada") doradas++;
      if (o.rareza === "rara") raras++;
      if (o.rareza === "iconica") { iconicas++; if (t < 2) iconPrimera++; }
    });
  }
  const pct = doradas / etapas;
  ok(pct > 0.04 && pct < 0.08, "una dorada en ~6% de las etapas (" + (pct * 100).toFixed(1) + "%)");
  const pi = iconicas / etapasIc;
  ok(pi > 0.007 && pi < 0.025, "una icónica en ~1,5% de las etapas (" + (pi * 100).toFixed(2) + "%)");
  ok(iconPrimera === 0, "la primera etapa nunca trae icónica");
  const pr = raras / total;
  ok(pr > 0.18 && pr < 0.25, "las raras rondan el 22% de las cartas (" + (pr * 100).toFixed(1) + "%)");

  ok(J.APERTURAS[0].id === "mejoras" && J.APERTURAS[0].rango === 1 && J.APERTURAS[0].ano === 0,
    "Mejoras es la primera apertura y llega el primer año");
  ["excel", "diario", "after", "zapas"].forEach((id) => {
    const p = J.PERKS.find((x) => x.id === id);
    ok(!!p && p.c <= 800, "existe la mejora barata «" + id + "»" + (p ? " (USD " + p.c + ")" : ""));
  });
  ok(J.sanear({ semilla: 12345 }).semilla === 12345, "la semilla sobrevive al guardado");

  /* las vacaciones de verdad recargan la energía al 100% */
  ok(["Tomarte unas vacaciones de verdad", "Tomarte las vacaciones que debes", "Tomarlas, y sin teléfono", "Vacaciones de verdad, sin correo"]
    .every((t) => J.esVacacion({ t })), "las opciones de vacaciones se reconocen");
  ok(!J.esVacacion({ t: "Una semana, con el teléfono encendido" }), "una semana con el teléfono encendido no son vacaciones");
  ok(J.VACACIONES_COMPRA.indexOf("viaje") >= 0, "el viaje por Europa también cuenta");
  let cartaVac = null;
  for (let s = 0; s < 400 && !cartaVac; s++) {
    cartaVac = J.escenaPretemporada({ turno: s % 9, semilla: s }).o.find((o) => o.t === "Vacaciones de verdad, sin correo") || null;
  }
  ok(cartaVac && /energía al 100%/.test(cartaVac.d.msg), "la carta de vacaciones dice que vuelves al 100%");
})();

try { fs.unlinkSync(tmp); } catch (e) {}
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
