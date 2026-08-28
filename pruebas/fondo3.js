/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "index.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Extrae el bloque REAL del cierre del fondo desde el .jsx y lo ejecuta
   aislado, con stubs mínimos. Así se comprueba la aritmética de la
   circulación del capital sin depender de conducir la interfaz. */
const fs = require("fs");
const RUTA = RUTA_FUENTE;
const src = fs.readFileSync(RUTA, "utf8");

/* --- localizar el bloque "if (st.fondo) { ... }" del cierre --- */
const ini = src.indexOf("    if (st.fondo) {");
if (ini < 0) throw new Error("no se encontro el bloque del fondo");
let i = src.indexOf("{", ini), prof = 0, fin = -1;
for (let k = i; k < src.length; k++) {
  if (src[k] === "{") prof++;
  else if (src[k] === "}") { prof--; if (prof === 0) { fin = k + 1; break; } }
}
const bloque = src.slice(ini, fin);
console.log("  bloque extraido: " + bloque.split("\n").length + " lineas");

/* --- stubs --- */
const TOPE_PLATA = 1e12;
const numero = (v, d = 0) => { const x = typeof v === "number" ? v : parseFloat(v); return Number.isFinite(x) ? x : (Number.isFinite(d) ? d : 0); };
const clamp = (v, a, b) => { const x = numero(v, NaN); return Number.isFinite(x) ? Math.max(a, Math.min(b, x)) : Math.max(a, Math.min(b, 0)); };
const entero = (v, d, mi, ma) => Math.max(mi, Math.min(ma, Math.round(numero(v, d))));
const fmt = (n) => new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 }).format(Math.round(numero(n, 0)));
const capacidadFondo = (f) => clamp(numero(f && f.tam, 0) + numero(f && f.reciclado, 0), 0, TOPE_PLATA);
const EMPRESAS = [
  { n: "Buena SA", s: "Energía", riesgo: 1, crec: 8, mar: 30, conc: 15, deuda: 1.5, foso: 3, d: "x" },
  { n: "Media SA", s: "Consumo", riesgo: 2, crec: 10, mar: 14, conc: 25, deuda: 2.5, foso: 2, d: "x" },
  { n: "Mala SA", s: "Industrial", riesgo: 3, crec: 1, mar: 6, conc: 50, deuda: 4.5, foso: 1, d: "x" },
  { n: "Otra SA", s: "Salud", riesgo: 1, crec: 12, mar: 22, conc: 12, deuda: 1.8, foso: 2, d: "x" },
];
const calidadDeal = (e) => {
  const cr = clamp((numero(e.crec, 0) + 5) / 30, 0, 1), mg = clamp((numero(e.mar, 0) + 5) / 40, 0, 1);
  const cc = clamp(1 - numero(e.conc, 0) / 70, 0, 1), dd = clamp(1 - numero(e.deuda, 0) / 5.5, 0, 1);
  const fo = clamp((numero(e.foso, 1) - 1) / 2, 0, 1);
  return clamp(0.2 * cr + 0.18 * mg + 0.21 * cc + 0.19 * dd + 0.22 * fo, 0, 1);
};
const baseDeal = (e) => +(1.15 + calidadDeal(e) * 2.25).toFixed(2);

let semilla = 13579;
const rnd = () => { semilla ^= semilla << 13; semilla >>>= 0; semilla ^= semilla >> 17; semilla ^= semilla << 5; semilla >>>= 0; return (semilla % 100000) / 100000; };
const gauss = () => { const u = rnd() || 0.5, v = rnd() || 0.5; const g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); return Math.max(-5, Math.min(5, g)); };
Math.random = rnd;

/* la función que ejecuta el bloque tal cual está en el juego */
const correrCierre = new Function(
  "st", "ing", "notas", "TOPE_PLATA", "numero", "clamp", "entero", "fmt",
  "capacidadFondo", "EMPRESAS", "baseDeal", "gauss",
  bloque + "\n return st.fondo;"
);

/* --- el caso: tres posiciones vencidas de 20 M cada una --- */
const TICKET = 20e6;
const hacerEstado = (salida) => ({
  turno: 8, rama: "pe", titulares: [],
  fondo: {
    tam: 150e6, gp: 1.5e6, pct: 0.01, invertido: TICKET * 3, realizado: 0,
    reciclado: 0, generacion: 1, oferta: [],
    posiciones: [0, 1, 3].map((k) => ({
      n: EMPRESAS[k].n, s: EMPRESAS[k].s, ticket: TICKET,
      riesgo: EMPRESAS[k].riesgo, base: baseDeal(EMPRESAS[k]), salida,
    })),
  },
});

console.log("");
console.log("  CASO 1 · tres posiciones con salida ya vencida");
let st = hacerEstado(8), ing = [], notas = [];
console.log("    antes:  desplegado " + fmt(st.fondo.invertido) + "  reciclado " + fmt(st.fondo.reciclado)
  + "  capacidad " + fmt(capacidadFondo(st.fondo)) + "  posiciones " + st.fondo.posiciones.length);
let f = correrCierre(st, ing, notas, TOPE_PLATA, numero, clamp, entero, fmt, capacidadFondo, EMPRESAS, baseDeal, gauss);
console.log("    despues: desplegado " + fmt(f.invertido) + "  reciclado " + fmt(f.reciclado)
  + "  capacidad " + fmt(capacidadFondo(f)) + "  posiciones " + f.posiciones.length);
console.log("    ofertas nuevas sobre la mesa: " + f.oferta.length);
notas.forEach((x) => console.log("      · " + x));
ing.forEach((x) => console.log("      ingreso: " + x.n + " = " + fmt(x.v)));

const bien1 = f.invertido === 0;
const bien2 = f.reciclado > 0;
const bien3 = capacidadFondo(f) > 150e6;
const bien4 = f.oferta.length >= 3;
console.log("");
console.log("    " + (bien1 ? "ok    " : "FALLA ") + "el capital vuelve: desplegado quedo en " + fmt(f.invertido) + " (esperado 0)");
console.log("    " + (bien2 ? "ok    " : "FALLA ") + "la mitad de la ganancia se queda dentro: " + fmt(f.reciclado));
console.log("    " + (bien3 ? "ok    " : "FALLA ") + "la capacidad del fondo crecio de 150.000.000 a " + fmt(capacidadFondo(f)));
console.log("    " + (bien4 ? "ok    " : "FALLA ") + "vuelve a haber deal flow: " + f.oferta.length + " oportunidades");

console.log("");
console.log("  CASO 2 · posiciones que aun no vencen (salida en el futuro)");
let st2 = hacerEstado(20), ing2 = [], notas2 = [];
const f2 = correrCierre(st2, ing2, notas2, TOPE_PLATA, numero, clamp, entero, fmt, capacidadFondo, EMPRESAS, baseDeal, gauss);
console.log("    desplegado sigue en " + fmt(f2.invertido) + " y quedan " + f2.posiciones.length + " posiciones");
console.log("    " + (f2.invertido === TICKET * 3 && f2.posiciones.length === 3 ? "ok    " : "FALLA ") + "no se vende nada antes de tiempo");

console.log("");
console.log("  CASO 3 · diez cierres seguidos, para ver si el fondo se agota");
let st3 = hacerEstado(8);
let cap0 = capacidadFondo(st3.fondo);
for (let v = 0; v < 10; v++) {
  const ig = [], nt = [];
  /* tomar todo lo que hay sobre la mesa, como haria un jugador activo */
  st3.fondo.oferta.forEach((o) => {
    const libre = capacidadFondo(st3.fondo) - st3.fondo.invertido;
    const tk = Math.min(o.ticket, libre);
    if (tk <= 0) return;
    st3.fondo.invertido += tk;
    st3.fondo.posiciones.push({ n: o.n, s: o.s, ticket: tk, riesgo: o.riesgo, base: o.base, salida: st3.turno });
  });
  correrCierre(st3, ig, nt, TOPE_PLATA, numero, clamp, entero, fmt, capacidadFondo, EMPRESAS, baseDeal, gauss);
  st3.turno += 1;
}
console.log("    capacidad inicial " + fmt(cap0) + "  ->  final " + fmt(capacidadFondo(st3.fondo)));
console.log("    ganancia realizada acumulada: " + fmt(st3.fondo.realizado));
console.log("    oportunidades en la ultima ronda: " + st3.fondo.oferta.length);
console.log("    " + (st3.fondo.oferta.length > 0 ? "ok    " : "FALLA ") + "el fondo sigue vivo despues de diez anos de rotacion");
