import { numero } from "../motor/aritmetica.js";

/* ---------- escala de la carrera ---------- */
export const RANGOS = [
  { n: "Pasante", salario: 800, umbral: 8 },
  { n: "Analista", salario: 1700, umbral: 22 },
  { n: "Analista Senior", salario: 3100, umbral: 42 },
  { n: "Asociado", salario: 5800, umbral: 70 },
  { n: "Vicepresidente", salario: 11000, umbral: 108 },
  { n: "Director", salario: 20000, umbral: 155 },
  { n: "Socio", salario: 42000, umbral: Infinity },
];

/* Retorno esperado, volatilidad y beta al factor de mercado.
   La beta es lo que hace que la diversificación funcione como en la vida real:
   dos activos con beta alta caen juntos aunque en el papel parezcan distintos. */
/* Retornos de largo plazo en dólares, separados como en la realidad
   (28-sep-2026): antes las acciones rendían 5,2%, menos que la deuda
   corporativa, y cualquier mezcla daba casi lo mismo. Ahora el orden es
   el de siempre: efectivo < deuda de empresas < bonos LatAm < oro... y
   las acciones como motor, con más riesgo por encima. */
export const ACTIVOS = [
  { k: "bonos", n: "Bonos soberanos LatAm", mu: 0.05, sd: 0.09, b: 0.25,
    d: "Cupón fijo de gobiernos de la región. Paga más que la deuda de empresas sólidas porque le pega el riesgo país." },
  { k: "corp", n: "Deuda corporativa grado inversión", mu: 0.043, sd: 0.065, b: 0.35,
    d: "Deuda de empresas sólidas de todo el mundo. Rinde poco y se mueve poco: es el lastre que estabiliza." },
  { k: "acciones", n: "Renta variable global", mu: 0.075, sd: 0.16, b: 1,
    d: "El motor de largo plazo. También el que te hace pasar años en rojo." },
  { k: "reits", n: "Inmobiliario listado", mu: 0.065, sd: 0.18, b: 0.85,
    d: "Renta de inmuebles con liquidez de bolsa. Sensible a las tasas." },
  { k: "oro", n: "Oro y materias primas", mu: 0.035, sd: 0.15, b: -0.2,
    d: "No produce nada. Su gracia es subir cuando el resto se cae." },
  { k: "distressed", n: "Deuda distressed", mu: 0.09, sd: 0.24, b: 0.7,
    d: "Comprar barato lo que nadie quiere. O el papel recupera, o no vale nada." },
  { k: "cripto", n: "Cripto", mu: 0.11, sd: 0.46, b: 1.15,
    d: "Retorno alto en el promedio y caídas del 70% en el camino." },
];

/* el efectivo rinde poco y encima la inflación se lo come */
export const EFECTIVO_MU = 0.021;

/* las noticias solo traen impacto para cuatro clases; para las demás se deriva
   de su sensibilidad económica, que es como se hace cuando no hay serie propia */
const DERIVA = {
  corp: { bonos: 0.6, acciones: 0.3 },
  reits: { acciones: 0.6, bonos: 0.4 },
  oro: { acciones: -0.45 },
};
export const impactoActivo = (k, notis) => {
  let x = 0;
  (Array.isArray(notis) ? notis : []).forEach((n) => {
    if (!n || !n.i) return;
    if (n.i[k] != null) { x += numero(n.i[k], 0); return; }
    const m = DERIVA[k];
    if (m) Object.keys(m).forEach((src) => { x += (n.i[src] || 0) * m[src]; });
  });
  return x;
};

export const ETIQ = { mod: "Modelaje", cri: "Criterio", red: "Red", rep: "Reputación", ene: "Energía", car: "Carrera", cash: "Efectivo" };
