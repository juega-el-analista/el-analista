import { numero, entero, clamp } from "./aritmetica.js";
import { NACIONES } from "../datos/paises.js";

/* ============================================================
   DEBER DINERO
   Hasta ahora el efectivo podía quedarse en negativo y no pasaba nada:
   ni intereses, ni banco, ni consecuencias. Que es justo lo contrario
   de lo que enseña una vida real, donde quedarse sin dinero no te
   elimina, te mete en una relación cara y larga con un acreedor.

   Ahora: puedes pedir prestado, la deuda cobra intereses todos los
   años, si te pasas te embargan los bienes, y si aun así no cuadra
   puedes declararte en quiebra. Ninguna de las tres te saca del juego.
   ============================================================ */

/* Lo que te cobran depende de dónde vives, de tu reputación, de tu
   cargo y de si ya has quebrado antes. Que es más o menos como
   funciona de verdad. */
export const tasaPrestamo = (st) => {
  const na = NACIONES.find((x) => x.id === st.pais) || NACIONES[0];
  let r = 0.11 + (numero(na.gas, 1) - 1) * 0.06;
  r += clamp((45 - numero(st.rep, 40)) / 100, 0, 0.18);   /* mala fama, dinero caro */
  r -= clamp(entero(st.rango, 0, 0, 6) * 0.008, 0, 0.05); /* cargo alto, algo mejor */
  r += entero(st.quiebras, 0, 0, 9) * 0.06;               /* haber quebrado se paga años */
  return clamp(r, 0.06, 0.45);
};

/* Cuánto más te prestarían: dos años de tu neto más la mitad de lo que
   tienes en bienes, menos lo que ya debes. Tras una quiebra, nada
   durante unos años. */
export const topeCredito = (st, neto, bienes) => {
  if (entero(st.vetoCredito, 0, 0, 9) > 0) return 0;
  const tope = numero(neto, 0) * 2 + numero(bienes, 0) * 0.5;
  return Math.max(0, tope - numero(st.deuda, 0));
};

/* la parte de la deuda que hay que amortizar cada año */
export const CUOTA_DEUDA = 0.18;
/* por encima de esto el banco deja de esperar y se cobra con lo que haya */
export const EMBARGO_VECES = 3;
/* y por encima de esto ya no hay embargo que alcance */
export const QUIEBRA_VECES = 5;
/* lo que se saca por un bien embargado: nadie remata a precio de mercado */
export const DESCUENTO_EMBARGO = 0.62;

export const TAMANOS = [
  { m: 25000000, n: "25 millones", red: 45, rango: 4 },
  { m: 60000000, n: "60 millones", red: 60, rango: 5 },
  { m: 150000000, n: "150 millones", red: 75, rango: 6 },
];
