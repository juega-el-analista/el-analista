import { numero } from "./aritmetica.js";
import { GLOSARIO } from "../datos/glosario.js";
import { TEMAS } from "../datos/catedra.js";

/* ============================================================
   LO QUE UNA OPCION TE PIDE
   Hasta ahora podias amanecerte trabajando con la energia a 3, y el
   juego te dejaba: la energia bajaba a cero y ya. Eso quita el sentido
   de tener un atributo, porque nunca te cierra una puerta.

   El requisito sale de dos sitios. Uno declarado a mano (o.min), para
   las puertas que son de criterio, de red o de reputacion. Y otro
   automatico: si una opcion te va a costar 18 de energia, hace falta
   que tengas 18. Asi la regla es la misma en las 286 escenas sin haber
   anotado ninguna, y no hay forma de que se olvide en las que vengan.
   ============================================================ */
const CLAVES_REQ = ["ene", "cri", "mod", "red", "rep"];
export const faltaDe = (o, st) => {
  if (!o || typeof o !== "object" || !st) return null;
  const pide = {};
  if (o.min && typeof o.min === "object") {
    CLAVES_REQ.forEach((k) => {
      const v = numero(o.min[k], 0);
      if (v > 0) pide[k] = v;
    });
  }
  /* lo que va a costar, tomado del mejor caso declarado */
  const d = o.d
    || (o.res && (o.res.exito || o.res.parcial || o.res.fallo))
    || (o.chk && o.chk.ok)
    || null;
  if (d && typeof d === "object") {
    const cuesta = -numero(d.ene, 0);
    if (cuesta > 0) pide.ene = Math.max(numero(pide.ene, 0), cuesta);
  }
  /* se avisa del que mas lejos queda: un solo motivo, no una lista */
  let peor = null;
  Object.keys(pide).forEach((k) => {
    const tengo = numero(st[k], 0);
    const hace = pide[k];
    if (tengo < hace && (!peor || hace - tengo > peor.falta)) {
      peor = { k, hace: Math.round(hace), tengo: Math.round(tengo), falta: hace - tengo };
    }
  });
  return peor;
};

/* Términos del glosario que se pueden reconocer dentro del enunciado
   de una pregunta. Sirven de red: si la pregunta no está atada a un
   tema ni tiene pista escrita, al menos se explica la palabra clave. */
const GLOS_EN_TEXTO = [
  /* primero lo muy concreto, que si no se lo come una palabra general */
  [/flujo de caja libre|caja libre|utilidad contable/i, "fcl"],
  [/costo del capital|coste del capital|wacc|capital propio comparado/i, "wacc"],
  [/opci[óo]n de (compra|venta)|call|put|prima/i, "opcion"],
  [/forward de divisas|cobertura natural|cubrir(se)?|hedge/i, "cobertura"],
  [/convertir en efectivo|m[áa]s r[áa]pido es/i, "liquidez"],
  [/cobra 0,2|misma estrategia, uno cobra/i, "comision"],
  [/primera pregunta deber[íi]a ser|antes de invertir en algo/i, "invertir"],
  [/mutuamente excluyentes|se[ñn]ales opuestas/i, "tir"],
  [/valor terminal|\bdcf\b|descuento de flujos|tasa de descuento|valor presente|flujos futuros/i, "valorpresente"],
  [/duraci[óo]n modificada|puntos b[áa]sicos|\bduraci[óo]n\b/i, "duration"],
  [/curva de rendimientos|curva se invierte/i, "curva"],
  [/earn ?out/i, "earnout"],
  [/equity value|enterprise value|deuda neta sobre ebitda/i, "ebitda"],
  [/m[úu]ltiplo|precio sobre utilidad/i, "multiplo"],
  [/tasa interna|\btir\b|carry|hurdle/i, "tir"],
  [/distressed|treinta centavos/i, "distressed"],
  [/aumento de capital|derecho de preferencia|diluci[óo]n|dilu(ye|ir)/i, "dilucion"],
  [/inventarios|cuentas por cobrar|capital de trabajo/i, "capitalTrabajo"],
  [/costo de oportunidad|coste de oportunidad|parados en la cuenta/i, "costoOportunidad"],
  [/\bseguros?\b/i, "seguro"],
  [/misma cantidad todos los meses|aport(ar|es) peri[óo]dic|cada mes sin importar/i, "aportes"],
  [/rendido mucho|[úu]ltimos tres a[ñn]os|gestor|fondo activo/i, "indexado"],
  [/a cuotas|tarjeta de cr[ée]dito|40% anual|pagar (la|una) deuda/i, "deuda"],
  [/exportadora|moneda local se deval/i, "devaluacion"],
  [/tasa de ahorro|ahorrar de verdad|forma m[áa]s efectiva de ahorrar/i, "presupuesto"],
  [/\bactivo\b/i, "activo"],
  [/\binter[ée]s compuesto\b/i, "interesCompuesto"],
  [/\bregla del (setenta y dos|72)\b/i, "interesCompuesto"],
  [/\bregla del (cuatro|4)\s*%/i, "regla4"],
  [/\binflaci[óo]n\b/i, "inflacion"],
  [/\bdiversific/i, "diversificar"],
  [/\bvolatilidad\b/i, "volatilidad"],
  [/\bliquidez\b|\bl[íi]quido\b/i, "liquidez"],
  [/\bcomisi[óo]n(es)?\b/i, "comision"],
  [/\bfondo indexado\b|\b[íi]ndice\b/i, "fondoIndexado"],
  [/\bfondo de emergencia\b|\bcolch[óo]n\b/i, "fondoEmergencia"],
  [/\bapalanca/i, "apalancamiento"],
  [/\bebitda\b/i, "ebitda"],
  [/\bbeta\b/i, "beta"],
  [/\brebalance/i, "rebalanceo"],
  [/\bpatrimonio\b/i, "patrimonio"],
  [/\bencaje\b/i, "encaje"],
  [/\btasa de referencia\b|\bbanco central\b/i, "tasaRectora"],
  [/\bcarta de cr[ée]dito\b/i, "cartaCredito"],
  [/\bdevalua/i, "devaluacion"],
  [/\btasa efectiva\b|\bcoste total\b/i, "tasaEfectiva"],
  [/\bbonos?\b/i, "bono"],
  [/\bacci(ón|ones)\b/i, "accion"],
  [/\bcartera\b|\bportafolio\b/i, "cartera"],
  [/\briesgo\b/i, "riesgo"],
];

/* El contexto de una pregunta, por orden: el tema del que salió, la
   pista escrita a mano, o el término del glosario que aparezca en el
   enunciado. Si no hay ninguno, no se ofrece explicación. */
export const contextoDe = (p) => {
  if (!p) return null;
  const tm = p.tema ? TEMAS.find((x) => x.id === p.tema) : null;
  if (tm) return { t: tm.n, x: tm.x, ej: tm.ej };
  if (p.pista) return { t: "Lo que hace falta saber", x: p.pista };
  const txt = String(p.q || "");
  for (let i = 0; i < GLOS_EN_TEXTO.length; i++) {
    if (!GLOS_EN_TEXTO[i][0].test(txt)) continue;
    const clave = GLOS_EN_TEXTO[i][1];
    const g = GLOSARIO[clave];
    if (g) return { t: g.n, x: g.x };
    /* la clave también puede ser un tema entero */
    const tm2 = TEMAS.find((x) => x.id === clave);
    if (tm2) return { t: tm2.n, x: tm2.x, ej: tm2.ej };
  }
  return null;
};

/* Qué palabras hay que haber entendido antes de jugar cada modo.
   En modo aprendiz se muestran como fichas antes de empezar; en modo
   analista se dan por sabidas. */
export const GLOS_JUEGO = {
  catedra: ["interesCompuesto", "riesgo"],
  quiz: ["rendimiento", "riesgo", "tasaEfectiva"],
  trading: ["accion", "volatilidad", "rendimiento"],
  estructura: ["apalancamiento", "ebitda"],
  banderas: ["riesgo", "liquidez"],
  carril: ["accion", "bono", "liquidez"],
  pares: ["cartera", "diversificar"],
  subasta: ["riesgo", "apalancamiento"],
  calculo: ["rendimiento", "interesCompuesto"],
  semaforo: ["riesgo", "volatilidad"],
  orden: ["bono", "liquidez"],
  anclaje: ["riesgo"],
  suerte: ["volatilidad", "riesgo"],
  precision: ["volatilidad"],
  ojo: ["riesgo"],
  memoria: ["cartera"],
  reaccion: ["volatilidad"],
  tresraya: ["riesgo"],
  cuatro: ["riesgo"],
};
const TEMA_DE = (id) => TEMAS.find((x) => x.id === id) || null;

/* Cinco minijuegos usan divs como zona de clic porque su diseño no
   admite un <button> sin romperse el layout. Esto los vuelve operables
   con teclado sin tocar una línea de CSS: foco, Enter y espacio. */
export const pulsable = (fn, rotulo, apagado) => ({
  role: "button",
  tabIndex: apagado ? -1 : 0,
  "aria-label": rotulo || undefined,
  "aria-disabled": apagado ? "true" : undefined,
  onClick: apagado ? undefined : fn,
  onKeyDown: apagado ? undefined : (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); fn(); }
  },
});
