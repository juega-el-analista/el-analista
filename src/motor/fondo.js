import { TOPE_PLATA, numero, clamp } from "./aritmetica.js";


export const UMBRAL_FONDO = 5000000;
/* una decisión de un VP mueve mucho más dinero que la de un analista */
export const ESCALA = [1, 1.5, 2.2, 3.2, 4.5, 6.5, 9];
/* saca dinero primero del efectivo y después de la cartera */
export const cobrar = (st, monto) => {
  let cash = st.cash - monto, cartera = st.cartera;
  if (cash < 0) { cartera += cash; cash = 0; }
  return { cash, cartera };
};
/* Lo que el fondo puede tener desplegado: el capital comprometido más
   las ganancias que se quedaron dentro. Es lo que convierte al fondo en
   algo vivo en vez de una bolsa que se gasta una vez. */
export const capacidadFondo = (f) => clamp(numero(f && f.tam, 0) + numero(f && f.reciclado, 0), 0, TOPE_PLATA);

/* Cada generación de fondo es dos veces y media la anterior. No hay
   techo: si devuelves capital, puedes seguir levantando más grande, que
   es exactamente cómo crece una gestora de verdad. */
export const SALTO_FONDO = 2.5;
export const puedeSiguienteFondo = (st) => {
  const f = st.fondo;
  if (!f) return false;
  if (numero(f.generacion, 1) >= 6) return false;          /* seis generaciones es una carrera entera */
  if (numero(f.realizado, 0) < numero(f.tam, 0) * 0.2) return false;  /* hace falta historial */
  return st.red >= 55 && st.rango >= 4;
};
export const ROMANOS = ["", "I", "II", "III", "IV", "V", "VI", "VII"];
