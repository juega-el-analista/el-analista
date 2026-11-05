/* ============================================================
   OFERTAS DE TRABAJO Y CULTURA EN NÚMEROS
   - Toda opción que te cambia de firma (mudaFirma) dice antes adónde vas
     y cuánto pagan; la firma tiene que ser siempre la misma para la misma
     partida, año y escena, y nunca la tuya.
   - El headhunter promete 40% más: su opción tiene que pagar 1,4.
   - La cuenta de la cultura (sumarCultura) suma en la firma donde estás
     y empieza de cero al cambiarte.

   Se corre con:  npm run ofertas
   ============================================================ */
const path = require("path");
const fs = require("fs");
const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const ruta = path.join(__dirname, "compilado.js");
fs.writeFileSync(ruta, fs.readFileSync(ruta, "utf8") + "\nmodule.exports.__o = { destinoDe, pagaDe, sumarCultura, sueldoCon, culturaDeFirma, PATRONES, todas: [].concat(E, D, E2, E3, CONSECUENCIAS) };\n");
delete require.cache[ruta];
const { destinoDe, pagaDe, sumarCultura, sueldoCon, culturaDeFirma, PATRONES, todas } = require(ruta).__o;

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };

const estudio = Object.keys(PATRONES)[0];
const st = { semilla: 12345, turno: 3, estudio, patron: PATRONES[estudio][0], rango: 2, pais: "co", sueldoMult: 1 };

const muda = todas.filter((e) => e && Array.isArray(e.o)).flatMap((e) => e.o.filter((o) => o && o.mudaFirma).map((o) => ({ e, o })));
ok(muda.length >= 5, muda.length + " opciones te cambian de firma");
ok(muda.every(({ o }) => typeof o.paga === "number"), "todas dicen cuánto pagan");
const hh = muda.find(({ e }) => e.id === 7);
ok(hh && pagaDe(hh.o) === 1.4, "el headhunter del 40% paga 1,4");

const d1 = destinoDe(st, 7), d2 = destinoDe(st, 7);
ok(d1 === d2, "la misma escena da la misma firma (" + d1 + ")");
ok(d1 !== st.patron, "y nunca es la tuya");
ok(!!culturaDeFirma(d1), "y tiene cultura (" + culturaDeFirma(d1) + ")");
const otras = new Set([7, 8, 9, 10, 11, 12].map((id) => destinoDe(st, id)));
ok(otras.size >= 2, "escenas distintas pueden llevar a firmas distintas (" + otras.size + ")");

const hoy = sueldoCon(st, 1), luego = sueldoCon(st, 1.4);
ok(Math.round(luego / hoy * 100) === 140, "lo que se enseña es un 40% más: " + Math.round(hoy) + " → " + Math.round(luego));

/* la cuenta de la cultura: solo con una firma que tenga cultura */
const conCultura = Object.keys(PATRONES).flatMap((k) => PATRONES[k]).find((n) => culturaDeFirma(n));
const c = { patron: conCultura, estudio };
sumarCultura(c, "ene", -5); sumarCultura(c, "car", 2); sumarCultura(c, "anos", 1);
ok(c.culturaTot && c.culturaTot.f === conCultura && c.culturaTot.ene === -5 && c.culturaTot.car === 2 && c.culturaTot.anos === 1, "la cuenta suma en tu firma");
c.patron = Object.keys(PATRONES).flatMap((k) => PATRONES[k]).find((n) => n !== conCultura && culturaDeFirma(n));
sumarCultura(c, "anos", 1);
ok(c.culturaTot.f === c.patron && c.culturaTot.anos === 1 && c.culturaTot.ene === 0, "y al cambiarte empieza de cero");
sumarCultura(c, "nada", 3);
ok(c.culturaTot.nada === undefined, "un campo que no existe no se cuela");

console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
process.exit(fallos ? 1 : 0);
