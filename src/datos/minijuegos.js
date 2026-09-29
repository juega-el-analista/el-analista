import { JUEGOS } from "./modos.js";

/* ============================================================
   BASE DE DATOS DE MINIJUEGOS
   Cada modo declara su nombre, su instrucción, el tema financiero
   que ejercita y cuánto dura. El motor lee de aquí.
   ============================================================ */

const MINIJUEGOS = Object.keys(JUEGOS).map((k) => ({ id: k, ...JUEGOS[k] }));

/* ---------- fichas de la pizarra ---------- */
export const PIZARRAS = [
  { t: "Conceptos de valoración", p: [
    ["WACC", "Costo promedio del capital"],
    ["TIR", "Tasa que deja el VAN en cero"],
    ["Beta", "Sensibilidad al índice"],
    ["Valor terminal", "La mayor parte del DCF"],
    ["Deuda neta", "Puente de equity a firm value"],
    ["Prima de riesgo país", "Se suma al costo del equity"],
  ] },
  { t: "Vocabulario de fondos", p: [
    ["Carry", "20% de la ganancia"],
    ["Hurdle", "Retorno preferente del ocho"],
    ["Dry powder", "Capital sin desplegar"],
    ["TVPI", "Valor total sobre lo aportado"],
    ["DPI", "Lo que ya se devolvió"],
    ["Curva J", "Pérdidas al inicio del fondo"],
  ] },
  { t: "Renta fija y crédito", p: [
    ["Duración", "Sensibilidad a la tasa"],
    ["Cupón", "Interés periódico del bono"],
    ["Covenant", "Condición que hay que cumplir"],
    ["Subordinada", "Cobra después de la senior"],
    ["Convertible", "Deuda con opción a acciones"],
    ["Cross default", "Un impago dispara los demás"],
  ] },
  { t: "Contabilidad que importa", p: [
    ["EBITDA", "Antes de intereses y depreciación"],
    ["Capital de trabajo", "Inventario más cobrar menos pagar"],
    ["Flujo libre", "Lo que sobra después de invertir"],
    ["Devengo", "Se reconoce sin haber cobrado"],
    ["Impuesto diferido", "Diferencia contable y fiscal"],
    ["Provisión", "Gasto reconocido sin pagar aún"],
  ] },
];

/* ---------- carriles del capital ---------- */
export const CARRILES = [
  { n: "Bonos", bueno: "Cupón", malo: "Alza de tasas" },
  { n: "Acciones", bueno: "Dividendo", malo: "Profit warning" },
  { n: "Cripto", bueno: "Rally", malo: "Liquidación" },
];
