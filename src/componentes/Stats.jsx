import React, { useState, useEffect, useRef } from "react";
import { ETIQ } from "../datos/mercado.js";
import { numero, clamp } from "../motor/aritmetica.js";
import { ICONO_ATRIB } from "../motor/reglas.js";
import { sinMovimiento } from "../hooks/movimiento.js";
import { Icono } from "./Iconos.jsx";

/* ============================================================
   LAS STATS, COMO STATS
   Arriba solo se veian energia y reputacion, y en una linea de numeros
   pequeños. Criterio, modelaje y red —que son los que abren y cierran
   puertas— no salian en ningun sitio salvo dentro de la Ficha.

   Ahora son cinco anillos, uno por atributo y cada uno con su color,
   que se llenan hasta donde llegas. Y cuando uno se mueve, suelta su
   +3 o su −8 flotando: el juego te dice que ganaste algo en el momento
   en que lo ganas, no tres pantallas despues.
   ============================================================ */
const TONO_ATRIB = {
  ene: "#7FD08C",   /* verde: lo que te queda en el cuerpo */
  cri: "#7FB8E6",   /* azul: lo que ves que otros no */
  mod: "#C9A6F0",   /* lila: lo que sabes montar */
  red: "#F2B441",   /* oro: a quien conoces */
  rep: "#F08A6C",   /* coral: lo que dicen de ti */
};
const ANILLO_R = 15;
const ANILLO_C = 2 * Math.PI * ANILLO_R;

export function Anillo({ k, v }) {
  const val = clamp(numero(v, 0), 0, 100);
  const [delta, setDelta] = useState(null);
  const ant = useRef(val);
  const vez = useRef(0);
  useEffect(() => {
    const d = Math.round(val - ant.current);
    ant.current = val;
    if (!d || sinMovimiento() || typeof setTimeout !== "function") return;
    vez.current += 1;
    setDelta({ d, n: vez.current });
    const t = setTimeout(() => setDelta(null), 1250);
    return () => { try { clearTimeout(t); } catch (e) {} };
  }, [val]);

  /* por debajo de 25 el anillo se pone rojo, sea el que sea: es el aviso */
  const bajo = val < 25;
  const tono = bajo ? "#E0897B" : TONO_ATRIB[k];
  return (
    <div className={"ea-anillo" + (bajo ? " bajo" : "")} title={(ETIQ[k] || k) + " " + Math.round(val) + " de 100"}>
      <div className="ea-anilloDisco">
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false">
          <circle cx="20" cy="20" r={ANILLO_R} className="ea-anilloFondo" />
          <circle cx="20" cy="20" r={ANILLO_R} className="ea-anilloArco" stroke={tono}
            strokeDasharray={ANILLO_C.toFixed(2)}
            strokeDashoffset={(ANILLO_C * (1 - val / 100)).toFixed(2)}
            transform="rotate(-90 20 20)" />
        </svg>
        <span className="ea-anilloIco" style={{ color: tono }}><Icono k={ICONO_ATRIB[k]} tam={14} /></span>
        {delta && (
          <span key={delta.n} className={"ea-anilloD ea-mono " + (delta.d > 0 ? "sube" : "baja")}>
            {delta.d > 0 ? "+" : "−"}{Math.abs(delta.d)}
          </span>
        )}
      </div>
      <span className="ea-anilloN ea-mono" style={{ color: tono }}>{Math.round(val)}</span>
      <span className="ea-anilloK ea-dis">{ETIQ[k]}</span>
    </div>
  );
}

/* ---- el marco de las decisiones que pesan ----
   Sin drama devuelve la escena tal cual, en su sitio de siempre. Con
   drama la saca a pantalla completa: fondo oscuro con un halo del color
   de su clase, el sello grande en el centro y la escena debajo. La
   escena de dentro es exactamente la misma: no hay un segundo camino
   de pintado que se pueda desincronizar del primero. */
export function Marco({ drama, tono, ico, clase, ano, children }) {
  if (!drama) return children;
  return (
    <div className="ea-escenaPlena" style={{ "--tono": tono }}>
      <div className="ea-escenaPlenaCaja">
        <div className="ea-dramaTop">
          <div className="ea-dramaIco"><Icono k={ico || "sello"} tam={44} /></div>
          <div className="ea-dramaK ea-dis">{clase} · {ano}</div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Plegable({ titulo, resumen, abierto, tono, children }) {
  const [ab, setAb] = useState(!!abierto);
  return (
    <div className={"ea-pleg" + (ab ? " on" : "")}>
      <button className="ea-plegB" onClick={() => setAb(!ab)} aria-expanded={ab ? "true" : "false"}>
        <span className="ea-plegF ea-mono" aria-hidden="true">{ab ? "–" : "+"}</span>
        <span className="ea-plegT ea-dis">{titulo}</span>
        {resumen != null && (
          <span className="ea-plegR ea-mono" style={tono ? { color: tono } : undefined}>{resumen}</span>
        )}
      </button>
      {ab && <div className="ea-plegC">{children}</div>}
    </div>
  );
}
