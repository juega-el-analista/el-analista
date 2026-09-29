/* ============================================================
   EL INTERRUPTOR DEL MOVIMIENTO
   null = lo que diga el sistema · true = encendido · false = apagado.
   Vive fuera de React porque lo consultan componentes sueltos (la cifra
   que cuenta, el rodillo) que no tienen el estado de la partida a mano.
   El Motor lo pone al dia en cada render desde st.animar, con
   ponerMovimiento: un módulo no puede reasignar una variable de otro.
   ============================================================ */
let MOVIMIENTO = null;
export const ponerMovimiento = (v) => { MOVIMIENTO = v; };
export const sistemaPideQuieto = () => {
  try {
    return typeof window !== "undefined" && typeof window.matchMedia === "function"
      && !!window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { return false; }
};
export const sinMovimiento = () => {
  if (MOVIMIENTO === true) return false;
  if (MOVIMIENTO === false) return true;
  return sistemaPideQuieto();
};
