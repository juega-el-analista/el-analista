import React, { useState, useEffect, useRef } from "react";
import { numero, esNumero, clamp, fmt } from "../motor/aritmetica.js";
import { sinMovimiento } from "../hooks/movimiento.js";

/* ============================================================
   UNA CIFRA QUE CUENTA EN VEZ DE SALTAR
   El patrimonio es EL numero del juego y cambiaba de golpe: de 12.000 a
   19.400 sin que nada dijera que habias ganado. Verlo subir convierte un
   dato en una recompensa, que es de lo que vive un juego.

   Tres guardarraíles, porque esto corre tambien dentro del arnes de
   pruebas, que monta un window falso: sin requestAnimationFrame se pone
   el valor final y ya, y quien haya pedido menos movimiento en su
   sistema no ve ninguna animacion.
   ============================================================ */
export function Cifra({ v, ms, desde: arranque }) {
  const fin = numero(v, 0);
  /* Donde no hay valor anterior que recordar —porque el componente se
     monta de cero, como en el cierre de anio— hay que decirle de donde
     viene, o se pinta ya en su destino y no cuenta nada. Justo lo que me
     paso: la cifra del cierre no animaba y parecia que si. */
  const inicial = esNumero(arranque) ? numero(arranque, 0) : fin;
  const [x, setX] = useState(inicial);
  const desde = useRef(inicial);
  useEffect(() => {
    const ini = numero(desde.current, 0);
    if (ini === fin) return;
    if (sinMovimiento() || typeof requestAnimationFrame !== "function" || typeof cancelAnimationFrame !== "function") {
      desde.current = fin; setX(fin); return;
    }
    const dura = numero(ms, 650);
    const t0 = Date.now();
    let id = 0, vivo = true;
    const paso = () => {
      if (!vivo) return;
      const p = clamp((Date.now() - t0) / dura, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);   /* frena al llegar */
      setX(ini + (fin - ini) * e);
      if (p < 1) id = requestAnimationFrame(paso);
      else desde.current = fin;
    };
    id = requestAnimationFrame(paso);
    return () => { vivo = false; desde.current = fin; try { cancelAnimationFrame(id); } catch (e) {} };
  }, [fin]);
  return fmt(x);
}
