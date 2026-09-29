import React, { useState, useEffect } from "react";
import { numero, fmt } from "../motor/aritmetica.js";
import { sinMovimiento } from "../hooks/movimiento.js";

/* ============================================================
   EL RODILLO
   La cifra del cierre contaba, pero contaba en una esquina y con letra
   de informe. El momento en que se sabe como fue el anio merece la
   pantalla entera: cada digito es un tambor que gira y se para, de
   izquierda a derecha, como el marcador de una maquina.

   Cada rueda lleva los diez digitos repetidos tres veces y aterriza en
   la tercera vuelta, asi que gira de verdad en vez de deslizarse al
   sitio. Los separadores de miles no giran: se quedan fijos, que es lo
   que hace que se lea el numero mientras se mueve.
   ============================================================ */
const RUEDA = [];
for (let v = 0; v < 3; v++) for (let d = 0; d <= 9; d++) RUEDA.push(d);

export function Rodillo({ v }) {
  const txt = fmt(numero(v, 0));
  const [rodando, setRodando] = useState(true);
  const quieto = sinMovimiento();

  useEffect(() => {
    if (quieto) { setRodando(false); return; }
    setRodando(true);
    if (typeof setTimeout !== "function") { setRodando(false); return; }
    /* un respiro antes de soltar los frenos: sin esto el navegador pinta
       ya el estado final y no hay transicion que ver */
    const t = setTimeout(() => setRodando(false), 60);
    return () => { try { clearTimeout(t); } catch (e) {} };
  }, [txt, quieto]);

  if (quieto) return <span className="ea-rodillos ea-mono">{txt}</span>;

  const cifras = txt.split("");
  /* la rueda n tarda mas que la n-1, asi que el numero cuaja de
     izquierda a derecha y la ultima en pararse es la de las unidades */
  let idx = -1;
  return (
    <span className="ea-rodillos ea-mono" aria-label={"USD " + txt}>
      {cifras.map((c, i) => {
        if (!/[0-9]/.test(c)) return <span className="ea-rodSep" key={i}>{c}</span>;
        idx += 1;
        const destino = 20 + Number(c);   /* tercera vuelta */
        const dur = 900 + idx * 260;
        return (
          <span className="ea-rodillo" key={i} aria-hidden="true">
            <span className="ea-rodCol"
              style={{
                transform: "translateY(" + (rodando ? 0 : -destino * 100 / RUEDA.length) + "%)",
                transitionDuration: (rodando ? 0 : dur) + "ms",
                transitionTimingFunction: "cubic-bezier(.16,.84,.26,1)",
              }}>
              {RUEDA.map((d, k) => <span className="ea-rodD" key={k}>{d}</span>)}
            </span>
          </span>
        );
      })}
    </span>
  );
}
