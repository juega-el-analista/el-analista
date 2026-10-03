import { PERFILES } from "../datos/carreras.js";

/* ---------- estado inicial y utilidades de resolución ---------- */
export const BASE = {
  turno: 0, rango: 0, carrera: 0,
  mod: 26, cri: 24, red: 14, rep: 38, ene: 84,
  cash: 2000, cartera: 0,
  perfil: "conservador",
  pesos: { ...PERFILES[0].w },   /* cómo está repartida la cartera */
  objetivo: 0.7,                 /* qué parte de tu dinero líquido quieres invertida */
  histo: [], lecs: [], rotado: 0, comisiones: 0, gastoAnt: 0, techo: 0,
  pais: null, estudio: null,
  perks: [], bienes: [], valores: {},
  titulares: [], vistos: [], burnouts: 0, despidos: 0, seguir: 0, rama: null, fondo: null,
  /* la vida fuera de la oficina */
  pareja: "solo", hijos: 0,
  /* el recorrido mensual acumulado de la cartera */
  curva: [],
  /* configuración de la partida */
  modo: "aprendiz", edadIni: 20, estudia: 0,
  /* cuántos años piensas jugar antes de que te pregunten si te retiras */
  meta: 30,
  nombre: "", genero: null,
  guia: false, guiaVistas: [],
  /* qué sistemas del juego ya se abrieron */
  abiertos: [],
  /* temas del temario que ya se dieron en clase, para no examinar de
     algo que el juego nunca explicó */
  temas: [],
  /* minijuegos cuyas reglas ya se leyeron: la segunda vez no se vuelven
     a explicar enteras */
  jugados: [],
  /* movimiento: null sigue al sistema, true encendido, false apagado */
  animar: null,
  /* dónde trabajas, con qué contrato y qué hace ese contrato con tu sueldo */
  patron: "", contrato: null, sueldoMult: 1,
  /* si te independizaste y la firma es tuya */
  propia: false,
  /* reconocimientos ganados: el legado, que no se mide en dinero */
  premios: [],
  /* la cola de escenas del año en curso, por id: lo que permite retomar
     en la misma decisión en vez de al principio del año */
  cola: [],
  ritmo: "normal", nivelGasto: "normal",
  /* lo que debes y su historia */
  deuda: 0, quiebras: 0, embargos: 0, vetoCredito: 0,
};

/* cuánto cuesta al año cada persona que depende de ti, antes de país */
export const COSTO_HIJO = 4200;
export const PAREJAS = ["solo", "noviazgo", "casado", "divorciado", "viudo"];

/* ---------- quién eres ----------
   El nombre es solo tuyo: se guarda en tu navegador y no sale de ahí.
   El género sirve para que el juego concuerde al hablarte, nada más:
   no cambia sueldos, ni oportunidades, ni resultados. */
export const GENEROS = [
  { id: "f", n: "Femenino" },
  { id: "m", n: "Masculino" },
  { id: "x", n: "Prefiero no decirlo" },
];
/* Cuánto te dejas en la oficina. Sube la carrera y baja la energía,
   que es el intercambio de verdad y el que nadie hace consciente. */
export const RITMOS = [
  { id: "tranquilo", n: "Tranquilo", car: 0, ene: -4, rep: -1,
    d: "Sales a tu hora. La carrera avanza sola y despacio; llegas entero a los cincuenta." },
  { id: "normal", n: "Normal", car: 2, ene: -8, rep: 0,
    d: "Lo que se espera de ti y poco más. El punto medio." },
  { id: "tope", n: "A tope", car: 6, ene: -14, rep: 2,
    d: "Sales de últimos. Asciendes antes y pagas la diferencia en salud y en vida." },
];
export const RITMO = (id) => RITMOS.find((x) => x.id === id) || RITMOS[1];

/* Cómo vives. Multiplica el gasto del año: es la palanca que más
   pesa en el patrimonio final y la que menos gente toca a propósito. */
export const GASTOS = [
  { id: "apretado", n: "Apretado", f: 0.78, ene: -3, rep: -1,
    d: "Compartes piso, cocinas en casa, dices no a bastantes cosas. Ahorras como en ningún otro momento." },
  { id: "normal", n: "Normal", f: 1, ene: 0, rep: 0,
    d: "Vives como vive la gente de tu cargo. Ni austero ni llamativo." },
  { id: "holgado", n: "Holgado", f: 1.28, ene: 4, rep: 2,
    d: "Buen barrio, buenos restaurantes, viajes sin mirar el precio. Se nota en tu ánimo y en la resta." },
];
export const NIVEL_GASTO = (id) => GASTOS.find((x) => x.id === id) || GASTOS[1];
