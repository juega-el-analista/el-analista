import { ACTIVOS, EFECTIVO_MU } from "../datos/mercado.js";
import { clamp } from "./aritmetica.js";

/* Media y desviación de una combinación cualquiera de pesos.
   La varianza se parte en dos: la parte de mercado, que se suma entre activos
   porque caen juntos, y la propia de cada uno, que sí se diluye al repartir. */
export const statsPesos = (w) => {
  let mu = (w.efectivo || 0) * EFECTIVO_MU, sis = 0, prop = 0;
  ACTIVOS.forEach((a) => {
    const x = w[a.k] || 0;
    if (!x) return;
    mu += x * a.mu;
    sis += x * a.sd * a.b;
    prop += x * x * a.sd * a.sd * Math.max(0.12, 1 - a.b * a.b);
  });
  return { mu, sd: Math.sqrt(sis * sis + prop) };
};

/* el efectivo es el residuo: lo que no asignaste a ningún activo */
export const invertidoDe = (w) => ACTIVOS.reduce((a, x) => a + (w[x.k] || 0), 0);

/* mover un activo comprime proporcionalmente a los demás si te pasas de cien */
export const ajustarPesos = (w, k, val) => {
  const out = {};
  ACTIVOS.forEach((a) => { out[a.k] = w[a.k] || 0; });
  out[k] = clamp(val, 0, 1);
  let resto = 0;
  ACTIVOS.forEach((a) => { if (a.k !== k) resto += out[a.k]; });
  const libre = 1 - out[k];
  if (resto > libre + 1e-9 && resto > 0) {
    const f = libre / resto;
    ACTIVOS.forEach((a) => { if (a.k !== k) out[a.k] = out[a.k] * f; });
    resto = libre;
  }
  out.efectivo = Math.max(0, 1 - out[k] - resto);
  return out;
};

/* cuánto de la cartera tendrías que vender y volver a comprar */
export const rotacion = (a, b) => {
  let r = 0;
  ACTIVOS.forEach((x) => { r += Math.abs((b[x.k] || 0) - (a[x.k] || 0)); });
  r += Math.abs((b.efectivo || 0) - (a.efectivo || 0));
  return r / 2;
};

/* el que más pesa, para avisar de concentración */
export const concentracion = (w) => {
  let max = 0, kk = null;
  ACTIVOS.forEach((a) => { if ((w[a.k] || 0) > max) { max = w[a.k] || 0; kk = a; } });
  return { max, activo: kk };
};

export const COSTO_CAMBIO = 0.005;
