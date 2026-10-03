import { RANGOS, ETIQ } from "../datos/mercado.js";
import { JUEGOS } from "../datos/modos.js";
import { numero, entero } from "./aritmetica.js";

/* consultas a las tablas que nunca devuelven undefined */
export const RANGO = (i) => RANGOS[entero(i, 0, 0, RANGOS.length - 1)] || RANGOS[0];
export const JUEGO = (k) => JUEGOS[k] || JUEGOS.suerte;

export const GUIA = [
  { id: "decidir", cuando: (c) => c.fase === "evento",
    t: "Esto es una decisión",
    x: "Ninguna opción es la obviamente correcta: cada una te cuesta algo. Elige y sigue; el año avanza contigo." },
  { id: "secciones", cuando: (c) => c.fase === "evento" && c.vistas.indexOf("decidir") >= 0,
    t: "Arriba están tus secciones",
    x: "Por ahora solo tu Ficha. El juego irá abriendo las demás según avance tu carrera. No hay reloj: se abren y se cierran cuando quieras." },
  { id: "comprar", cuando: (c) => c.tab === "comprar",
    t: "Aquí se gasta",
    x: "Cosas para ti, inmuebles que te rentan cada año y mejoras que trabajan solas. Las tres salen del mismo bolsillo." },
  { id: "cartera", cuando: (c) => c.tab === "portafolio",
    t: "Aquí decides qué hace tu dinero",
    x: "La barra de arriba dice cuánto está invertido y cuánto en efectivo. Debajo repartes entre tipos de activo. Nada se aplica hasta que confirmas." },
  { id: "ficha", cuando: (c) => c.tab === "ficha",
    t: "Tus números y el banco",
    x: "Aquí ves sueldo, gastos y patrimonio. Al final de la sección puedes pedir un préstamo o pagar deuda." },
  { id: "juego", cuando: (c) => c.fase === "minijuego",
    t: "Un modo de juego",
    x: "Primero te explican las reglas y qué cuenta como éxito. Cuando entiendas, empiezas: el resultado afecta a tu carrera." },
  { id: "cierre", cuando: (c) => c.fase === "cierre",
    t: "El informe del año",
    x: "Lo que entró, lo que salió y cómo se movió tu cartera. Al final hay una lección sacada de tus propios números: es la parte que enseña." },
  { id: "vida", cuando: (c) => c.tab === "expediente",
    t: "Cómo vives",
    x: "Tu tren de vida sube con lo que compras y sube también la meta: necesitas 25 veces tu gasto anual para no depender del sueldo." },
];

/* Algunos bienes solo tienen sentido en cierta vida: una boda sin pareja
   o un fondo de educación sin hijos era comprable, y era la incoherencia
   que mas chirriaba. El requisito se consulta siempre por aqui, para que
   un requiere() mal escrito no tumbe la pantalla entera. */
export const puedeComprar = (c, st) => {
  if (!c || typeof c.requiere !== "function") return true;
  try { return !!c.requiere(st); } catch (e) { return true; }
};

/* Qué atributos mueve una opción, para poder decirlo ANTES de elegir en
   vez de después. A propósito sin cifras: saber que algo cuesta energía
   es información útil; saber que cuesta exactamente 18 convierte la
   decisión en aritmética y le quita la apuesta. */
const CLAVES_ATRIB = ["mod", "cri", "red", "rep", "car", "ene", "cash"];
/* que simbolo lleva cada atributo, para poder decirlo sin palabras */
export const ICONO_ATRIB = { mod: "tabla", cri: "ojo", red: "nodos", rep: "estrella",
  car: "escalera", ene: "rayo", cash: "moneda" };

/* Cuanto pesa un cambio, medido en signos y no en cifras.
   MEJORAS punto 17 tenia razon: el numero exacto convierte la decision
   en aritmetica y le quita la apuesta. Pero «cuesta energia» tampoco
   distingue perder tres de perder dieciocho, y esa diferencia si
   importa al decidir. Tres tramos: uno, dos o tres signos. Sabes si es
   poco, bastante o mucho, y no te pones a sumar.
   El efectivo lleva su propia escala porque se mueve en miles. */
export const fuerzaDe = (k, v) => {
  const x = Math.abs(numero(v, 0));
  if (k === "cash") return x >= 20000 ? 3 : x >= 5000 ? 2 : 1;
  return x >= 9 ? 3 : x >= 4 ? 2 : 1;
};

/* Lo que mueve una opcion: la clave y cuanto, para pintarlo en signos */
export const efectosDe = (o) => {
  if (!o || typeof o !== "object") return [];
  const d = o.d
    || (o.res && (o.res.exito || o.res.parcial || o.res.fallo))
    || (o.chk && o.chk.ok)
    || null;
  if (!d || typeof d !== "object") return [];
  const out = [];
  CLAVES_ATRIB.forEach((k) => {
    const v = numero(d[k], 0);
    if (v) out.push({ k, v });
  });
  return out;
};
const efectoDe = (o) => {
  if (!o || typeof o !== "object") return null;
  const d = o.d
    || (o.res && (o.res.exito || o.res.parcial || o.res.fallo))
    || (o.chk && o.chk.ok)
    || null;
  if (!d || typeof d !== "object") return null;
  const sube = [], cuesta = [];
  CLAVES_ATRIB.forEach((k) => {
    const v = numero(d[k], 0);
    if (v > 0) sube.push((ETIQ[k] || k).toLowerCase());
    else if (v < 0) cuesta.push((ETIQ[k] || k).toLowerCase());
  });
  if (!sube.length && !cuesta.length) return null;
  return { sube, cuesta };
};
