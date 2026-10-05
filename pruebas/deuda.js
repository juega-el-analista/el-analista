/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "index.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Prueba del sistema de deuda: intereses, embargo y quiebra.
   Extrae el bloque real del cierre y lo corre aislado. */
const fs = require("fs");
const RUTA = RUTA_FUENTE;
const src = fs.readFileSync(RUTA, "utf8");

const ini = src.indexOf("    /* ---- lo que debes ---- */");
if (ini < 0) throw new Error("no se encontro el bloque de deuda");
const fin = src.indexOf("    /* ---- reparto entre cartera y efectivo", ini);
if (fin < 0) throw new Error("no se encontro el final del bloque");
const bloque = src.slice(ini, fin);
console.log("  bloque extraido: " + bloque.split("\n").length + " lineas\n");

/* --- stubs --- */
const TOPE_PLATA = 1e12;
const numero = (v, d = 0) => { const x = typeof v === "number" ? v : parseFloat(v); return Number.isFinite(x) ? x : (Number.isFinite(d) ? d : 0); };
const clamp = (v, a, b) => { const x = numero(v, NaN); return Number.isFinite(x) ? Math.max(a, Math.min(b, x)) : Math.max(a, Math.min(b, 0)); };
const entero = (v, d, mi, ma) => Math.max(mi, Math.min(ma, Math.round(numero(v, d))));
const fmt = (n) => new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 }).format(Math.round(numero(n, 0)));
const NACIONES = [{ id: "co", gas: 0.85 }];
const CUOTA_DEUDA = 0.25, EMBARGO_VECES = 3, QUIEBRA_VECES = 5, DESCUENTO_EMBARGO = 0.62;
const tasaPrestamo = (st) => {
  const na = NACIONES[0];
  let r = 0.11 + (numero(na.gas, 1) - 1) * 0.06;
  r += clamp((45 - numero(st.rep, 40)) / 100, 0, 0.18);
  r -= clamp(entero(st.rango, 0, 0, 6) * 0.008, 0, 0.05);
  r += entero(st.quiebras, 0, 0, 9) * 0.06;
  return clamp(r, 0.06, 0.45);
};
/* copia de la del juego: lo que no alcanza sale en falta */
const cobrar = (st, monto) => {
  let cash = st.cash - monto, cartera = st.cartera, falta = 0;
  if (cash < 0) { cartera += cash; cash = 0; }
  if (cartera < 0) { falta = -cartera; cartera = 0; }
  return { cash, cartera, falta };
};
/* el costo de vida del año: fija el colchon que no se usa para adelantar deuda */
const GASTOS = 20000;
const BIENES = { apto: { n: "Apartamento propio" }, carro: { n: "Carro deportivo" }, reloj: { n: "Reloj suizo" } };
const bienDe = (id) => BIENES[id] || null;

const correr = new Function(
  "st", "egr", "notas", "salario", "bono", "gastos", "TOPE_PLATA", "numero", "clamp", "entero", "fmt",
  "tasaPrestamo", "cobrar", "bienDe", "CUOTA_DEUDA", "EMBARGO_VECES", "QUIEBRA_VECES", "DESCUENTO_EMBARGO",
  bloque + "\n return st;"
);

const correrCon = (st, salario, bono) => {
  const egr = [], notas = [];
  const out = correr(st, egr, notas, salario, bono, GASTOS, TOPE_PLATA, numero, clamp, entero, fmt,
    tasaPrestamo, cobrar, bienDe, CUOTA_DEUDA, EMBARGO_VECES, QUIEBRA_VECES, DESCUENTO_EMBARGO);
  return { st: out, egr, notas };
};

const base = (over) => Object.assign({
  cash: 5000, cartera: 20000, deuda: 0, rep: 45, rango: 2, pais: "co",
  quiebras: 0, embargos: 0, vetoCredito: 0, bienes: [], valores: {}, titulares: [], turno: 10,
}, over);

const ok = (e, c) => console.log((c ? "  ok    " : "  FALLA ") + e);
const NETO = 40000;

console.log("  CASO 1 · deuda normal, se paga cuota e intereses");
let r1 = correrCon(base({ deuda: 30000 }), NETO, 0);
console.log("    deuda 30.000 -> " + fmt(r1.st.deuda) + "   efectivo " + fmt(r1.st.cash));
console.log("    egreso: " + (r1.egr[0] ? r1.egr[0].n + " = " + fmt(r1.egr[0].v) : "ninguno"));
ok("la deuda baja al pagar cuota", r1.st.deuda < 30000 && r1.st.deuda > 0);
ok("aparece como egreso del año", r1.egr.length === 1);

console.log("\n  CASO 2 · el año cierra en rojo, el hueco pasa a deuda");
let r2 = correrCon(base({ cash: -8000, cartera: 0, deuda: 0 }), NETO, 0);
console.log("    efectivo -8.000 -> " + fmt(r2.st.cash) + "   deuda " + fmt(r2.st.deuda));
ok("el efectivo no queda negativo", r2.st.cash === 0);
ok("el hueco se convierte en deuda con recargo", r2.st.deuda > 8000);
console.log("    " + (r2.notas[0] || "").slice(0, 110));

console.log("\n  CASO 3 · embargo: la deuda pasa de tres años de ingreso");
let r3 = correrCon(base({
  deuda: 150000, cash: 1000, cartera: 2000,
  bienes: ["apto", "carro", "reloj"],
  valores: { apto: 110000, carro: 30000, reloj: 11000 },
}), NETO, 0);
console.log("    deuda 150.000 -> " + fmt(r3.st.deuda));
console.log("    bienes: 3 -> " + r3.st.bienes.length + "  (" + r3.st.bienes.join(", ") + ")");
r3.notas.forEach((x) => console.log("    · " + x.slice(0, 130)));
ok("se embargan bienes", r3.st.bienes.length < 3);
ok("la deuda baja con el remate", r3.st.deuda < 150000);
ok("queda registrado el embargo", r3.st.embargos > 0);

console.log("\n  CASO 4 · quiebra: ni embargando alcanza");
let r4 = correrCon(base({ deuda: 400000, cash: 500, cartera: 1000, bienes: [], valores: {} }), NETO, 0);
console.log("    deuda 400.000 -> " + fmt(r4.st.deuda));
r4.notas.forEach((x) => console.log("    · " + x.slice(0, 150)));
ok("la deuda se borra", r4.st.deuda === 0);
ok("se lleva la cartera", r4.st.cartera === 0);
ok("queda una quiebra en el historial", r4.st.quiebras === 1);
ok("no le prestan durante cinco años", r4.st.vetoCredito === 5);
ok("la reputación se hunde", r4.st.rep < 45);

console.log("\n  CASO 5 · sin deuda no pasa nada");
let r5 = correrCon(base({ deuda: 0 }), NETO, 0);
ok("no hay egresos ni notas", r5.egr.length === 0 && r5.notas.length === 0);
ok("el dinero no se mueve", r5.st.cash === 5000 && r5.st.cartera === 20000);

/* El CASO 2 cierra en rojo pero sin deuda. Con deuda, el rojo se mezclaba
   con la cuota: el interés salía negativo en el informe y el rojo se
   perdía sin pasar a deuda. */
console.log("\n  CASO 7 · debes y además cierras en rojo");
const st7 = base({ cash: -8000, cartera: 0, deuda: 10000 });
const int7Debido = 10000 * tasaPrestamo(st7);
let r7 = correrCon(st7, NETO, 0);
const int7 = r7.egr[0] ? r7.egr[0].v : NaN;
console.log("    deuda 10.000, efectivo -8.000 -> deuda " + fmt(r7.st.deuda) + "   interés apuntado " + fmt(int7));
ok("el interés apuntado no es negativo", int7 === 0);
ok("el efectivo no queda negativo", r7.st.cash === 0);
ok("el rojo pasa a deuda con recargo, y el interés impagado también", Math.abs(r7.st.deuda - (10000 + int7Debido + 8000 * 1.08)) < 1);
ok("sale la nota del año en rojo", r7.notas.some((x) => x.indexOf("en rojo") >= 0));

console.log("\n  CASO 8 · el rojo lo tapa la cartera y lo que sobra paga parte de la cuota");
const st8 = base({ cash: -2000, cartera: 5000, deuda: 10000 });
const int8 = 10000 * tasaPrestamo(st8);
let r8 = correrCon(st8, NETO, 0);
console.log("    deuda 10.000 -> " + fmt(r8.st.deuda) + "   efectivo " + fmt(r8.st.cash) + "   cartera " + fmt(r8.st.cartera));
ok("se paga el interés entero", r8.egr[0] && Math.abs(r8.egr[0].v - int8) < 1);
ok("lo que queda de los 3.000 va a capital", Math.abs(r8.st.deuda - (10000 - (3000 - int8))) < 1);
ok("sin rojo pendiente", r8.st.cash === 0 && r8.st.cartera === 0 && !r8.notas.some((x) => x.indexOf("en rojo") >= 0));

console.log("\n  CASO 6 · casos límite");
[["deuda NaN", { deuda: NaN }], ["deuda negativa", { deuda: -5000 }], ["todo en cero", { cash: 0, cartera: 0, deuda: 0 }],
 ["bien sin valor", { deuda: 200000, bienes: ["apto"], valores: {} }]].forEach(([nom, over]) => {
  try {
    const r = correrCon(base(over), NETO, 0);
    const fin = [r.st.cash, r.st.cartera, r.st.deuda].every((x) => Number.isFinite(x) && x >= -TOPE_PLATA);
    console.log("    " + nom.padEnd(16) + (fin ? "ok, valores finitos" : "VALORES ROTOS") + "  (deuda " + fmt(r.st.deuda) + ")");
  } catch (e) { console.log("    " + nom.padEnd(16) + "LANZO: " + e.message); }
});
