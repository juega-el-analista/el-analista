import React, { useState } from "react";
import { elegirAzar } from "../motor/aritmetica.js";
import { ORDENES } from "../datos/preguntas.js";
import { Pista } from "../componentes/Iconos.jsx";

/* ---- Poner en orden ----
   Reescrito: antes un solo error terminaba el juego. Ahora tienes tres
   intentos, el error se marca en rojo un momento y puedes seguir desde
   donde ibas. Además se dice explícitamente qué criterio se está
   ordenando y se numeran los que ya colocaste. */

const VIDAS_ORDEN = 3;

export function JuegoOrden({ ayuda, onFin }) {
  const [set] = useState(() => elegirAzar(ORDENES) || ORDENES[0]);
  const [lista] = useState(() => set.l.slice().sort(() => Math.random() - 0.5));
  const [paso, setPaso] = useState(() => (ayuda >= 60 ? 1 : 0));
  const [err, setErr] = useState(null);
  const [vidas, setVidas] = useState(VIDAS_ORDEN);
  const [fin, setFin] = useState(false);
  const [aviso, setAviso] = useState(null);

  const total = set.l.length;

  const tocar = (item) => {
    if (fin || err) return;
    if (item === set.l[paso]) {
      const p = paso + 1;
      setPaso(p);
      setAviso(null);
      if (p >= total) {
        setFin(true);
        setAviso("Secuencia correcta");
        setTimeout(() => onFin(vidas === VIDAS_ORDEN ? "exito" : vidas === VIDAS_ORDEN - 1 ? "parcial" : "parcial"), 700);
      }
      return;
    }
    const quedan = vidas - 1;
    setErr(item);
    setVidas(quedan);
    if (quedan <= 0) {
      setFin(true);
      setAviso("Se acabaron los intentos");
      setTimeout(() => onFin(paso >= Math.ceil(total / 2) ? "parcial" : "fallo"), 800);
      return;
    }
    setAviso("Ese no va aquí. Te quedan " + quedan + (quedan === 1 ? " intento." : " intentos."));
    setTimeout(() => setErr(null), 700);
  };

  const puesto = (item) => set.l.indexOf(item) < paso;

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Colocados {paso} de {total}</span>
        <span>Intentos {vidas} de {VIDAS_ORDEN}</span>
      </div>
      <Pista>
        Toca los elementos en el orden que pide el enunciado, del primero al último.
        Equivocarte cuesta un intento, no la partida.
      </Pista>
      <p className="ea-qtxt">{set.t}</p>
      <div className="ea-ordenL">
        {lista.map((item, k) => (
          <button key={k} disabled={puesto(item) || fin}
            className={"ea-ordenI" + (puesto(item) ? " hecho" : "") + (err === item ? " err" : "")}
            onClick={() => tocar(item)}>
            <span>{item}</span>
            <span className="ea-ordenN ea-mono">{puesto(item) ? set.l.indexOf(item) + 1 : ""}</span>
          </button>
        ))}
      </div>
      <div className="ea-vidas">
        {Array.from({ length: VIDAS_ORDEN }, (_, k) => (
          <span key={k} className={"ea-vida" + (k < vidas ? " viva" : "")} />
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#6B6B6B" }}>{aviso}</div>
    </div>
  );
}
