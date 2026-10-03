/* ============================================================
   BLINDAJE · CAPA UNO: ARITMÉTICA QUE NO SE ROMPE
   Todo número que entra al juego pasa por aquí. Un NaN, un Infinity
   o un string donde debía ir un número no llegan nunca a la pantalla
   ni al estado guardado: se convierten en un valor razonable y el
   juego sigue. Es la diferencia entre "USD NaN" y una partida sana.
   ============================================================ */
export const TOPE_PLATA = 1e12;

/* convierte cualquier cosa en un número finito, o devuelve el de respaldo */
export const numero = (v, def = 0) => {
  const x = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(x) ? x : (Number.isFinite(def) ? def : 0);
};

/* ¿es esto un número utilizable? Ojo: numero(v, NaN) NO sirve para
   preguntarlo, porque cuando el valor por defecto no es finito devuelve
   cero, y cero sí es finito. Este predicado es el que hay que usar. */
export const esNumero = (v) => {
  const x = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(x);
};

/* entero acotado: ni fracciones, ni índices fuera de rango */
export const entero = (v, def, min, max) => {
  const x = Math.round(numero(v, def));
  if (!Number.isFinite(x)) return def;
  return Math.max(min, Math.min(max, x));
};

/* texto acotado: corta cadenas kilométricas y descarta lo que no sea texto */
export const texto = (v, def = "", max = 160) => (typeof v === "string" ? v.slice(0, max) : def);

/* clamp que nunca propaga NaN: si le entra basura, devuelve el punto neutro del rango */
export const clamp = (v, a, b) => {
  const x = numero(v, NaN);
  if (!Number.isFinite(x)) return Math.max(a, Math.min(b, 0));
  return Math.max(a, Math.min(b, x));
};

/* normal estándar acotada a cinco desviaciones.
   Los bucles tienen tope: si alguien sustituye Math.random por una
   función que siempre devuelve cero, esto no se cuelga. */
export const gauss = () => {
  let u = 0, v = 0, vueltas = 0;
  while (u === 0 && vueltas++ < 12) u = numero(Math.random(), 0.5);
  while (v === 0 && vueltas++ < 24) v = numero(Math.random(), 0.5);
  if (u <= 0) u = 1e-9;
  const g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Number.isFinite(g) ? Math.max(-5, Math.min(5, g)) : 0;
};

/* formateo de plata a prueba de todo: sin NaN, sin infinitos, sin excepciones */
export const fmt = (n) => {
  let x = numero(n, 0);
  if (x > TOPE_PLATA) x = TOPE_PLATA;
  if (x < -TOPE_PLATA) x = -TOPE_PLATA;
  try { return new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 }).format(Math.round(x)); }
  catch (e) { return String(Math.round(x)); }
};

/* índice al azar siempre dentro del arreglo, pase lo que pase con Math.random */
export const indiceAzar = (largo) => {
  const i = Math.floor(numero(Math.random(), 0) * largo);
  return Number.isFinite(i) ? Math.min(largo - 1, Math.max(0, i)) : 0;
};
export const elegirAzar = (arr) => (Array.isArray(arr) && arr.length ? arr[indiceAzar(arr.length)] : null);
