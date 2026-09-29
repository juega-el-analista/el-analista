import { numero, clamp } from "../motor/aritmetica.js";

/* ============================================================
   EL DEAL FLOW DEL FONDO
   Antes cada empresa era un nombre, un sector y un múltiplo esperado
   sacado de la nada: no había forma de distinguir un buen negocio de
   uno malo salvo mirando el número que el juego ya te daba resuelto.

   Ahora cada oportunidad trae los cinco datos con los que se juzga de
   verdad una compra, y el múltiplo esperado se CALCULA a partir de
   ellos. Eso significa que aprender a leerlos sirve, porque el que
   crece con margen, sin depender de un solo cliente, sin deuda encima
   y con algo que lo proteja de la competencia es, efectivamente, el
   que devuelve más. Hay trampas a propósito: negocios que crecen mucho
   y esconden una concentración brutal.

   crec  crecimiento anual del EBITDA, en %
   mar   margen EBITDA, en %
   conc  parte de las ventas en el cliente más grande, en %
   deuda deuda sobre EBITDA, en veces
   foso  1 ninguna ventaja · 2 alguna · 3 difícil de atacar
   ============================================================ */
export const EMPRESAS = [
  /* --- buenos de verdad --- */
  { n: "Generadora eléctrica con contrato regulado", s: "Energía", riesgo: 1, crec: 6, mar: 34, conc: 20, deuda: 2.0, foso: 3,
    d: "Contrato a veinte años con el Estado. Aburrida y previsible como pocas." },
  { n: "Software de gestión para constructoras", s: "Tecnología", riesgo: 2, crec: 22, mar: 30, conc: 12, deuda: 0.8, foso: 3,
    d: "Suscripción anual, cambiarlo cuesta más que pagarlo. Nadie se va." },
  { n: "Cadena de farmacias", s: "Retail", riesgo: 1, crec: 9, mar: 12, conc: 6, deuda: 1.6, foso: 2,
    d: "Márgenes finos, demanda que no se cae ni en recesión." },
  { n: "Clínica ambulatoria con tres sedes", s: "Salud", riesgo: 1, crec: 13, mar: 24, conc: 15, deuda: 1.9, foso: 2,
    d: "Convenios con aseguradoras y una lista de espera de seis semanas." },
  { n: "Planta de tratamiento de agua municipal", s: "Infraestructura", riesgo: 1, crec: 5, mar: 38, conc: 30, deuda: 2.4, foso: 3,
    d: "Concesión de 25 años. Un solo cliente, pero es el municipio." },
  { n: "Fabricante de envases para farmacéutica", s: "Industrial", riesgo: 2, crec: 11, mar: 22, conc: 24, deuda: 1.7, foso: 3,
    d: "Homologado por sus clientes: cambiar de proveedor les exige revalidar todo." },

  /* --- decentes, sin brillo --- */
  { n: "Distribuidora de alimentos regional", s: "Consumo", riesgo: 1, crec: 8, mar: 9, conc: 18, deuda: 2.2, foso: 1,
    d: "Volumen alto y margen mínimo. Vive de la ejecución diaria." },
  { n: "Operador logístico de última milla", s: "Logística", riesgo: 2, crec: 18, mar: 11, conc: 34, deuda: 2.6, foso: 1,
    d: "Crece con el comercio electrónico y con quince competidores iguales." },
  { n: "Procesadora de arroz", s: "Agroindustria", riesgo: 2, crec: 7, mar: 14, conc: 22, deuda: 2.8, foso: 1,
    d: "Commodity puro: el precio lo pone el mercado, no ella." },
  { n: "Planta de empaques plásticos", s: "Industrial", riesgo: 2, crec: 6, mar: 16, conc: 28, deuda: 3.0, foso: 1,
    d: "Activo pesado, clientes que aprietan cada renovación." },
  { n: "Empresa de factoring especializada", s: "Financiero", riesgo: 2, crec: 16, mar: 26, conc: 20, deuda: 3.4, foso: 2,
    d: "Gana con el diferencial de tasa. Le va bien hasta que alguien no paga." },
  { n: "Colegio privado con dos campus", s: "Educación", riesgo: 1, crec: 7, mar: 21, conc: 4, deuda: 1.4, foso: 2,
    d: "Matrícula anual y una lista de espera. Crecer exige ladrillo." },
  { n: "Talleres de mantenimiento de flotas", s: "Servicios", riesgo: 2, crec: 10, mar: 17, conc: 40, deuda: 2.1, foso: 1,
    d: "Dos contratos grandes sostienen la mitad de la facturación." },

  /* --- trampas: brillan por un lado y fallan por otro --- */
  { n: "Fintech de pagos transfronterizos", s: "Fintech", riesgo: 3, crec: 45, mar: 8, conc: 52, deuda: 1.2, foso: 2,
    d: "Crece como la espuma y la mitad del volumen es de un solo corresponsal." },
  { n: "Franquicia de restaurantes en expansión", s: "Consumo", riesgo: 3, crec: 34, mar: 10, conc: 8, deuda: 4.2, foso: 1,
    d: "Abre un local al mes, todos financiados con deuda." },
  { n: "Minera de oro de mediana escala", s: "Minería", riesgo: 3, crec: 26, mar: 32, conc: 15, deuda: 3.8, foso: 1,
    d: "Números excelentes al precio del oro de hoy. Y el precio del oro no lo decides tú." },
  { n: "Comercializadora de electrónicos importados", s: "Retail", riesgo: 3, crec: 30, mar: 5, conc: 45, deuda: 3.6, foso: 1,
    d: "Margen de tres puntos, un proveedor exclusivo y tipo de cambio en contra." },
  { n: "Constructora con obra pública adjudicada", s: "Construcción", riesgo: 3, crec: 38, mar: 13, conc: 68, deuda: 3.2, foso: 1,
    d: "Cartera llena. Toda del mismo cliente, y ese cliente cambia cada elección." },
  { n: "Plataforma de reparto con crecimiento agresivo", s: "Tecnología", riesgo: 3, crec: 60, mar: -4, conc: 10, deuda: 2.0, foso: 1,
    d: "Duplica usuarios cada año y pierde dinero en cada pedido." },

  /* --- malos, y se ve --- */
  { n: "Textilera con maquinaria de los noventa", s: "Industrial", riesgo: 3, crec: 1, mar: 6, conc: 44, deuda: 4.6, foso: 1,
    d: "Necesita una inversión que nadie ha hecho en veinte años." },
  { n: "Cadena de videoclubes reconvertida", s: "Consumo", riesgo: 3, crec: -6, mar: 4, conc: 12, deuda: 3.9, foso: 1,
    d: "El negocio original murió y el nuevo todavía no existe." },
  { n: "Naviera de cabotaje con flota antigua", s: "Logística", riesgo: 3, crec: 2, mar: 9, conc: 56, deuda: 5.1, foso: 1,
    d: "Barcos viejos, un cliente dominante y covenants al filo." },
];

/* La calidad de un negocio, en un solo número entre cero y uno.
   Es la fórmula que el jugador debería acabar teniendo en la cabeza:
   crecer y tener margen suman, pero depender de un cliente y llevar
   deuda encima restan casi lo mismo, y tener algo que te proteja de la
   competencia pesa tanto como crecer. */
export const calidadDeal = (e) => {
  if (!e) return 0;
  const cr = clamp((numero(e.crec, 0) + 5) / 30, 0, 1);       /* de -5% a 25% */
  const mg = clamp((numero(e.mar, 0) + 5) / 40, 0, 1);        /* de -5% a 35% */
  const cc = clamp(1 - numero(e.conc, 0) / 70, 0, 1);         /* 70% en un cliente es ruina */
  const dd = clamp(1 - numero(e.deuda, 0) / 5.5, 0, 1);       /* 5,5x de deuda es el filo */
  const fo = clamp((numero(e.foso, 1) - 1) / 2, 0, 1);
  return clamp(0.2 * cr + 0.18 * mg + 0.21 * cc + 0.19 * dd + 0.22 * fo, 0, 1);
};

/* el múltiplo esperado sale de la calidad, no de un número inventado */
export const baseDeal = (e) => +(1.15 + calidadDeal(e) * 2.25).toFixed(2);

/* cómo se lee cada señal, para poder mostrarlo en la ficha del negocio */
export const senalesDeal = (e) => [
  { k: "Crecimiento", v: numero(e.crec, 0) + "%", bien: numero(e.crec, 0) >= 12, mal: numero(e.crec, 0) < 4 },
  { k: "Margen", v: numero(e.mar, 0) + "%", bien: numero(e.mar, 0) >= 20, mal: numero(e.mar, 0) < 8 },
  { k: "Mayor cliente", v: numero(e.conc, 0) + "%", bien: numero(e.conc, 0) <= 20, mal: numero(e.conc, 0) >= 40 },
  { k: "Deuda", v: numero(e.deuda, 0).toFixed(1) + "x", bien: numero(e.deuda, 0) <= 2.2, mal: numero(e.deuda, 0) >= 3.5 },
  { k: "Ventaja", v: numero(e.foso, 1) >= 3 ? "difícil de atacar" : numero(e.foso, 1) === 2 ? "alguna" : "ninguna",
    bien: numero(e.foso, 1) >= 3, mal: numero(e.foso, 1) <= 1 },
];
