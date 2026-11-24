/* ============================================================
   EL LEGADO, LA GLORIA Y TU ARRANQUE (como El Ídolo, 11-nov-2026)
   - El legado (la idolatría): quedarse suma, irse resta (más si te vas
     pronto), sin reconocimiento no pasa de 80, por encima de 85 cuesta.
   - La gloria: una cifra final en la que la plata en sí no suma.
   - La clase decide si un minijuego se juega o se resuelve a olfato.
   - El arquetipo: tres del dado, siempre los mismos para una semilla.

   Se corre con:  npm run legado
   ============================================================ */
const path = require("path");
const fs = require("fs");
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeLegado.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { legadoDelAno, nivelLegado, siguienteNivelLegado, techoLegado, gloriaDe, juegoAlOlfato, probsOlfato,"
  + " escenaClase, escenaArquetipo, escenaDeId, IDS_ESCENA_VALIDOS, ID_CLASE, ID_ARQ, sanear, juntarCierres, esClave,"
  + " SUSTOS, OPORTUNIDADES, ESCENAS_FIJAS, ID_CAMINO, PREMIOS };"));
const J = require(tmp);

let fallos = 0;
const dif = (a, b) => Math.round((a - b) * 10) / 10;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

/* ---- el legado ---- */
(() => {
  const base = { legado: 10, legadoMax: 10, patron: "Firma A", legPatron: "Firma A", legAnos: 2, rep: 40, premios: [], rango: 1 };
  const r1 = J.legadoDelAno(base, {});
  ok(r1.st.legado > 10 && r1.st.legado < 11.5, "un año más en la misma firma suma algo (" + r1.st.legado + ")");
  ok(r1.st.legAnos === 3, "y cuenta los años en la firma");

  const pronto = J.legadoDelAno({ ...base, legado: 20, patron: "Firma B" }, {});
  ok(pronto.st.legado === 8, "irte de tu primera firma antes de 4 años cuesta 12 (" + pronto.st.legado + ")");
  ok(pronto.st.legPatron === "Firma B" && pronto.st.legAnos === 1, "y el contador vuelve a empezar en la firma nueva");
  const tarde = J.legadoDelAno({ ...base, legado: 30, patron: "Firma B", legAnos: 6 }, {});
  ok(tarde.st.legado === 22, "irte después cuesta 8 (" + tarde.st.legado + ")");

  const asc = J.legadoDelAno(base, { ascenso: "Asociado" });
  ok(dif(asc.st.legado, r1.st.legado) === 6, "un ascenso suma 6");
  const pr = J.PREMIOS.find((p) => !p.mundial), pm = J.PREMIOS.find((p) => p.mundial);
  ok(dif(J.legadoDelAno(base, { premios: [pr.id] }).st.legado, r1.st.legado) === 8, "un reconocimiento nacional suma 8");
  ok(dif(J.legadoDelAno(base, { premios: [pm.id] }).st.legado, r1.st.legado) === 14, "uno mundial suma 14");
  ok(J.legadoDelAno(base, { despido: true }).st.legado < 10, "un despido resta");

  const techo = J.legadoDelAno({ ...base, legado: 79 }, { ascenso: "x" });
  ok(techo.st.legado === 80 && techo.legado.techo, "sin reconocimiento no pasa de 80");
  const conPremio = J.legadoDelAno({ ...base, legado: 79, premios: [pr.id] }, { ascenso: "x" });
  ok(conPremio.st.legado > 80, "con un reconocimiento sí (" + conPremio.st.legado + ")");
  const cuesta = J.legadoDelAno({ ...base, legado: 85, premios: [pr.id] }, { ascenso: "x" });
  ok(cuesta.st.legado < 86.2, "por encima de 85 cada punto cuesta (" + cuesta.st.legado + ")");

  ok(J.nivelLegado(0).n === "Uno más" && J.nivelLegado(25).n === "Conocido" && J.nivelLegado(50).n === "Referente"
    && J.nivelLegado(75).n === "Eminencia" && J.nivelLegado(95).n === "Leyenda", "cinco niveles: Uno más, Conocido, Referente, Eminencia, Leyenda");
  ok(J.siguienteNivelLegado(31).n === "Referente" && J.siguienteNivelLegado(96) === null, "el que sigue se calcula bien");
  const sube = J.legadoDelAno({ ...base, legado: 24.5 }, {});
  ok(sube.legado.subeNivel === "Conocido", "cruzar 25 avisa que subiste de nivel");
  ok(J.legadoDelAno({ ...base, propia: true, patron: "Mi firma" }, {}).st.legado > 10, "montar tu firma suma, no cuenta como irte");

  const s = J.sanear({ legado: 150, legadoMax: -3, clase: "hacker", arq: "nada", legAnos: "x" });
  ok(s.legado === 100 && s.legadoMax === 100 && s.clase === null && s.arq === null && s.legAnos === 0, "sanear acota el legado y descarta clase y arquetipo inventados");
  const s2 = J.sanear({ legado: 42.37, legadoMax: 50, clase: "mixto", arq: "cerebrito", legPatron: "Firma A" });
  ok(s2.legado === 42.4 && s2.legadoMax === 50 && s2.clase === "mixto" && s2.arq === "cerebrito" && s2.legPatron === "Firma A", "y conserva lo válido");

  const j = J.juntarCierres([{ legado: { antes: 10, despues: 12, piezas: [{ n: "a", v: 1 }], nivel: "Uno más" } },
    { legado: { antes: 12, despues: 26, piezas: [{ n: "a", v: 1 }, { n: "b", v: 6 }], nivel: "Conocido", subeNivel: "Conocido" } }]);
  ok(j.legado && j.legado.antes === 10 && j.legado.despues === 26 && j.legado.subeNivel === "Conocido", "el resumen de la etapa junta el legado de sus años");
})();

/* ---- la gloria ---- */
(() => {
  const g0 = J.gloriaDe({ legadoMax: 50, rango: 3, premios: [], edadIni: 20 }, 0);
  ok(g0.total === 50 * 2000 + 3 * 8000, "la gloria suma legado y cargo (" + g0.total + ")");
  const rico = J.gloriaDe({ legadoMax: 50, rango: 3, premios: [], edadIni: 20, cash: 9e9 }, 0);
  ok(rico.total === g0.total, "la plata en sí no suma");
  ok(J.gloriaDe({ legadoMax: 50, rango: 3, premios: [], edadIni: 20 }, 1).total === g0.total + 30000, "quedar libre (cobertura 1) suma 30.000");
  ok(J.gloriaDe({ legadoMax: 96, rango: 0, premios: [], edadIni: 20 }, 0).total === 96 * 2000 + 50000, "llegar a Leyenda trae su estatua");
  ok(J.gloriaDe({ legadoMax: 50, rango: 3, premios: [], edadIni: 50 }, 0).total > g0.total, "empezar a los 50 lleva multiplicador");
  ok(Number.isInteger(J.gloriaDe({ legadoMax: 33.3, rango: 2, premios: ["x"], edadIni: 30, ganados: 7 }, 0.77).total), "siempre es un entero");
})();

/* ---- la clase y el arquetipo ---- */
(() => {
  const c = J.escenaClase();
  ok(c.id === 9791 && c.o.length === 3 && c.cuna, "la clase es la 9791, con tres opciones");
  const o = { j: "precision", stat: "cri", d: { cri: 3 } };
  ok(J.juegoAlOlfato({ clase: "intuitivo" }, o, 0.9) === true, "el intuitivo resuelve a olfato");
  ok(J.juegoAlOlfato({ clase: "tecnico" }, o, 0.1) === false, "el técnico juega siempre");
  ok(J.juegoAlOlfato({ clase: "mixto" }, o, 0.3) === true && J.juegoAlOlfato({ clase: "mixto" }, o, 0.7) === false, "el mixto, la mitad de las veces");
  ok(J.juegoAlOlfato({}, o, 0) === false, "un guardado sin clase juega como antes");
  ok(["catedra", "quiz", "anclaje"].every((k) => !J.juegoAlOlfato({ clase: "intuitivo" }, { j: k }, 0)), "la clase, el examen y la negociación nunca van a olfato");
  ok(!J.juegoAlOlfato({ clase: "intuitivo" }, { j: "precision", contrato: { anos: 2 } }, 0), "un contrato tampoco");
  const p1 = J.probsOlfato(40), p2 = J.probsOlfato(100);
  ok(Math.abs(p1.reduce((a, x) => a + x, 0) - 1) < 1e-9 && p2[0] > p1[0], "más ayuda, más chance de que salga redondo");
  ok(J.probsOlfato(60, 0.12)[0] > J.probsOlfato(60)[0], "el amuleto de la suerte inclina el olfato");

  const a = J.escenaArquetipo({ semilla: 77 });
  ok(a.id === 9792 && a.o.length === 3 && new Set(a.o.map((x) => x.arqId)).size === 3, "el arquetipo trae tres distintos");
  ok(JSON.stringify(J.escenaArquetipo({ semilla: 77 })) === JSON.stringify(a), "misma semilla, mismos tres (la del día es igual para todos)");
  ok(JSON.stringify(J.escenaDeId(9792, { semilla: 77 })) === JSON.stringify(a), "una recarga lo rearma desde su id");
  ok(J.IDS_ESCENA_VALIDOS.indexOf(9791) >= 0 && J.IDS_ESCENA_VALIDOS.indexOf(9792) >= 0, "la cola guardada acepta la 9791 y la 9792");
  let ic = 0;
  for (let s = 0; s < 4000; s++) if (J.escenaArquetipo({ semilla: s }).o.some((x) => x.rareza === "iconica")) ic++;
  ok(ic > 15 && ic < 75, "el icónico sale ~1% de las veces (" + (ic / 40).toFixed(2) + "%)");
})();

/* ---- los bugs de paso ---- */
(() => {
  const fijas = J.ESCENAS_FIJAS.map((e) => e.id);
  ok(J.SUSTOS.every((e) => fijas.indexOf(e.id) < 0), "ningún susto comparte id con otra escena fija (eran las oportunidades 9850-9852)");
  ok([0, 2, 4, 6].map(J.esClave).join() === "false,true,false,true", "las decisiones clave salen una etapa sí y otra no");
  const q = J.sanear({ cola: [J.SUSTOS[0].id, J.ID_CAMINO, 12345678] }).cola;
  ok(q.indexOf(J.SUSTOS[0].id) >= 0 && q.indexOf(J.ID_CAMINO) >= 0, "una cola guardada conserva el susto y la decisión de tu empresa");
})();

try { fs.unlinkSync(tmp); } catch (e) {}
console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
