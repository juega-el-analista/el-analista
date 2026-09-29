import { numero, clamp } from "../motor/aritmetica.js";

/* ---------- mejoras que se compran una sola vez ---------- */
export const PERKS = [
  { id: "research", n: "Suscripción a research institucional", c: 5000, d: "Sumas un punto de modelaje cada semestre." },
  { id: "gym", n: "Entrenador y nutricionista", c: 4500, d: "Recuperas tres puntos de energía cada semestre." },
  { id: "fiscal", n: "Asesor fiscal propio", c: 6500, d: "Tus gastos de vida bajan 15% para siempre." },
  { id: "coach", n: "Coach ejecutivo", c: 8000, d: "El desgaste semestral baja de nueve a cinco puntos." },
  { id: "asistente", n: "Asistente ejecutivo", c: 9000, d: "Un punto de carrera y dos de energía cada semestre." },
  { id: "prensa", n: "Columna fija en un medio del sector", c: 9500, d: "Un punto de reputación cada semestre." },
  { id: "terminal", n: "Terminal de mercado en casa", c: 12000, d: "Medio punto extra de retorno cada semestre y más tiempo en los juegos contra reloj." },
  { id: "abogado", n: "Abogado personal", c: 13000, d: "Los golpes a tu reputación se amortiguan 40%." },
  { id: "broker", n: "Bróker institucional con mejor ejecución", c: 15000, d: "La volatilidad de tu portafolio baja un cuarto." },
  { id: "club", n: "Membresía del club de negocios", c: 17000, d: "Un punto de red cada semestre y mejor lectura en las negociaciones." },
  { id: "colchon", n: "Colchón de emergencia bien estructurado", c: 20000, d: "Los golpes negativos de mercado te pegan a la mitad." },
  { id: "mba", n: "MBA ejecutivo de fin de semana", c: 45000, d: "Ocho puntos de criterio de entrada y un punto de carrera cada semestre." },
];

/* ---------- los escalones del tren de vida ----------
   El índice de vida era un número suelto en una esquina y no significaba
   nada para quien lo leía. Estos son sus tramos, con nombre y con la
   consecuencia dicha en voz alta: vivir mejor sube la meta de
   independencia, porque la meta son 25 veces tu gasto. */
export const NIVELES_VIDA = [
  { min: 0, n: "Austero", d: "Vives con lo justo y ahorras casi todo lo que puedes. Es el tren de vida que más rápido acumula." },
  { min: 1, n: "Sencillo", d: "Algún gusto, nada que te ate ni que pida mantenimiento serio." },
  { min: 4, n: "Cómodo", d: "Vives bien y el tren de vida ya empieza a notarse en la resta de fin de año." },
  { min: 9, n: "Holgado", d: "Difícil volver atrás sin que se sienta. Cada cosa pide su cuota anual." },
  { min: 15, n: "Alto", d: "Mantener lo que tienes es un gasto fijo considerable, pase lo que pase con tu sueldo." },
  { min: 23, n: "De otra liga", d: "Para que esto no te coma, el patrimonio tiene que ser enorme. Muy poca gente lo sostiene sin sueldo." },
];
export const TOPE_VIDA = 28;   /* dónde se llena el medidor; el máximo teórico es 49 */
export const nivelDeVida = (v) => {
  const x = clamp(numero(v, 0), 0, 999);
  let out = NIVELES_VIDA[0];
  NIVELES_VIDA.forEach((k) => { if (x >= k.min) out = k; });
  return out;
};

/* ---------- caprichos y compras de vida ---------- */
export const CAPRICHOS = [
  { id: "viaje", n: "Tres semanas por Europa", c: 7000, tipo: "consumo", up: 0, vida: 1, ene: 14, d: "No queda nada material. Vuelves como nuevo." },
  { id: "moto", n: "Moto de fin de semana", c: 9000, tipo: "consumo", dep: 0.03, up: 120, vida: 1, ene: 7, d: "Se deprecia y cuesta mantenerla. Igual la disfrutas." },
  { id: "reloj", n: "Reloj suizo de segunda mano", c: 11000, tipo: "activo", ap: 0.012, up: 0, vida: 1, red: 3, d: "El único capricho que suele valer más con los años." },
  { id: "palco", n: "Palco en el estadio", c: 22000, tipo: "consumo", up: 600, vida: 2, red: 6, d: "Se cierran más negocios ahí que en muchas salas de junta." },
  { id: "carro", n: "Carro deportivo", c: 38000, tipo: "consumo", dep: 0.04, up: 500, vida: 2, ene: 9, red: 3, d: "Pierde valor todos los semestres. Lo sabes y lo compras igual." },
  { id: "arte", n: "Obra de un artista latinoamericano", c: 35000, tipo: "activo", ap: 0.016, up: 100, vida: 2, rep: 4, d: "Cuelga en la sala y aprecia despacio." },
  { id: "boda", n: "La boda que querían", c: 42000, tipo: "consumo", up: 0, vida: 3, ene: 18,
    requiere: (st) => st.pareja === "noviazgo" || st.pareja === "casado",
    porQue: "Necesitas alguien con quien casarte",
    d: "Un día entero sin pensar en el trabajo. No tiene precio de reventa." },
  { id: "apto", n: "Apartamento propio", c: 110000, tipo: "activo", ap: 0.018, up: 900, vida: 3, ene: 8, d: "Dejas de pagar alquiler y empiezas a acumular un activo real." },
  { id: "finca", n: "Finca de café en producción", c: 85000, tipo: "activo", ap: 0.013, up: 0, renta: 2400, vida: 3, d: "Aprecia y además te deja una renta cada semestre." },
  { id: "playa", n: "Casa en la playa", c: 180000, tipo: "activo", ap: 0.011, up: 1600, vida: 4, ene: 12, d: "Cara de mantener y difícil de vender rápido. Los fines de semana valen la pena." },
  { id: "barco", n: "Barco", c: 150000, tipo: "consumo", dep: 0.035, up: 3200, vida: 3, ene: 10, red: 4, d: "El segundo mejor día de tu vida es el que lo compras." },
  { id: "hijos", n: "Fondo de educación para tus hijos", c: 60000, tipo: "activo", ap: 0.02, up: 0, vida: 5, rep: 3,
    requiere: (st) => st.hijos >= 1,
    porQue: "Necesitas tener al menos un hijo",
    d: "El único de esta lista que probablemente no vas a lamentar." },
];

/* ---------- noticias de mercado, una por semestre ---------- */
export const NOTICIAS = [
  { k: "Tasas", t: "La Reserva Federal sube setenta y cinco puntos básicos en una sola reunión", i: { bonos: -0.07, acciones: -0.06, distressed: -0.05, cripto: -0.11 } },
  { k: "Tasas", t: "La Reserva Federal recorta y da por terminado el ciclo restrictivo", i: { bonos: 0.06, acciones: 0.08, distressed: 0.07, cripto: 0.16 } },
  { k: "Tasas", t: "La inflación sorprende a la baja por tercer mes seguido", i: { bonos: 0.05, acciones: 0.05, cripto: 0.06 } },
  { k: "Tasas", t: "La inflación repunta y el mercado descuenta tasas altas por más tiempo", i: { bonos: -0.06, acciones: -0.05, cripto: -0.08 } },
  { k: "Comercio", t: "Washington anuncia aranceles del 25% a socios comerciales clave", i: { acciones: -0.08, bonos: 0.01, cripto: -0.05, distressed: -0.03 } },
  { k: "Comercio", t: "Se levantan los aranceles tras una negociación de último minuto", i: { acciones: 0.07, distressed: 0.03 } },
  { k: "Comercio", t: "Entra en vigor un acuerdo comercial regional en América Latina", i: { acciones: 0.05, bonos: 0.04, distressed: 0.05 } },
  { k: "Geopolítica", t: "Escalada militar en una ruta marítima clave del petróleo", i: { acciones: -0.07, bonos: -0.03, distressed: -0.05, cripto: 0.04 } },
  { k: "Geopolítica", t: "Alto el fuego y desescalada tras meses de tensión", i: { acciones: 0.06, bonos: 0.04, distressed: 0.06 } },
  { k: "Geopolítica", t: "Un conflicto fronterizo interrumpe corredores de exportación de granos", i: { acciones: -0.04, bonos: -0.02 } },
  { k: "Petróleo", t: "La OPEP recorta producción y el barril salta por encima de noventa dólares", i: { acciones: 0.03, distressed: 0.07, bonos: -0.02 } },
  { k: "Petróleo", t: "El barril se desploma bajo los cincuenta dólares por exceso de oferta", i: { acciones: -0.03, distressed: -0.1, bonos: -0.05 } },
  { k: "Petróleo", t: "Una refinería grande sale de operación y los márgenes se disparan", i: { acciones: 0.04, distressed: 0.04 } },
  { k: "Cripto", t: "Aprueban un vehículo al contado y entra dinero institucional a bitcoin", i: { cripto: 0.42, acciones: 0.02 } },
  { k: "Cripto", t: "Una casa de cambio grande colapsa y arrastra a todo el mercado cripto", i: { cripto: -0.45, acciones: -0.02 } },
  { k: "Cripto", t: "El halving reduce a la mitad la emisión de bitcoin", i: { cripto: 0.22 } },
  { k: "Cripto", t: "Una economía grande prohíbe la minería de criptomonedas", i: { cripto: -0.26 } },
  { k: "Cripto", t: "Sale un marco regulatorio claro y favorable para activos digitales", i: { cripto: 0.24, acciones: 0.02 } },
  { k: "Emergentes", t: "Un soberano de la región entra en default selectivo", i: { bonos: -0.11, distressed: -0.14 } },
  { k: "Emergentes", t: "Cierra una reestructuración soberana con quita del 30%", i: { distressed: 0.26, bonos: 0.05 } },
  { k: "Emergentes", t: "El Fondo Monetario aprueba un programa para un país de la región", i: { bonos: 0.08, distressed: 0.12 } },
  { k: "Emergentes", t: "Elecciones en la región dan un giro promercado", i: { acciones: 0.09, bonos: 0.07, distressed: 0.08 } },
  { k: "Emergentes", t: "Un país vecino impone controles de capital de un día para otro", i: { bonos: -0.06, distressed: -0.08 } },
  { k: "Emergentes", t: "Un fondo soberano anuncia entrada masiva en mercados emergentes", i: { bonos: 0.07, distressed: 0.11, acciones: 0.03 } },
  { k: "Mercados", t: "Récord de utilidades en tecnología y el índice toca máximos históricos", i: { acciones: 0.11, cripto: 0.06 } },
  { k: "Mercados", t: "Corrección del 20% en tecnología por múltiplos insostenibles", i: { acciones: -0.15, cripto: -0.14 } },
  { k: "Mercados", t: "Quiebra un banco regional y el sistema tiembla durante una semana", i: { acciones: -0.09, bonos: 0.03, cripto: -0.09, distressed: -0.06 } },
  { k: "Mercados", t: "Cierre de gobierno en Estados Unidos por falta de acuerdo presupuestario", i: { acciones: -0.04, bonos: -0.02 } },
  { k: "Mercados", t: "El oro toca máximos por compras sostenidas de bancos centrales", i: { bonos: 0.02, cripto: 0.05 } },
  { k: "Mercados", t: "Semestre tranquilo, sin sobresaltos en ningún frente", i: {} },
  { k: "Mercados", t: "Huelga portuaria prolongada tranca las cadenas de suministro", i: { acciones: -0.05 } },
  { k: "Mercados", t: "Una ola de fusiones reactiva la actividad en toda la región", i: { acciones: 0.06, distressed: 0.05 } },
];
