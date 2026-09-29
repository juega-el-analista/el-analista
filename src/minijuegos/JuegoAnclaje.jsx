import React, { useState } from "react";
import { entero, clamp } from "../motor/aritmetica.js";

export function JuegoAnclaje({ ayuda, onFin }) {
  const ancho = clamp(8 + ayuda * 0.1, 8, 20);
  const [centro] = useState(() => 18 + Math.random() * 64);
  const [v, setV] = useState(50);
  const [n, setN] = useState(0);
  const [hist, setHist] = useState([]);
  const [cerrado, setCerrado] = useState(false);

  const ofrecer = () => {
    const dif = v - centro;
    const dentro = Math.abs(dif) <= ancho / 2;
    const intento = n + 1;
    let msg;
    if (dentro) msg = "Acuerdo cerrado";
    else if (Math.abs(dif) > 24) msg = dif > 0 ? "Muy por encima de lo que pagan" : "Muy por debajo, dejas valor en la mesa";
    else msg = dif > 0 ? "Un poco alto, están cerca" : "Un poco bajo, están cerca";
    setHist([...hist, { v, msg, dentro }]);
    setN(intento);
    if (dentro) { setCerrado(true); setTimeout(() => onFin(intento <= 2 ? "exito" : "parcial"), 750); }
    else if (intento >= 4) { setCerrado(true); setTimeout(() => onFin("fallo"), 750); }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Oferta {Math.min(n + 1, 4)} de 4</span><span>Te quedan {Math.max(0, 4 - n)}</span></div>
      <p className="ea-memoTxt" style={{ marginTop: 0 }}>
        Tu número es <strong>lo agresiva que es tu oferta</strong>, de 0 a 100. La otra parte acepta dentro
        de una franja estrecha que no ves. Cada vez que pones un número te dicen si te quedaste corto, si te
        pasaste o si estás cerca, y con eso vas cerrando el cerco.
      </p>
      <div className="ea-anclaN">{v}</div>
      <input className="ea-slider" type="range" min="0" max="100" value={v} disabled={cerrado}
        onChange={(e) => setV(entero(e.target.value, 50, 0, 100))} aria-label="Lo agresiva que es tu oferta" />
      <div className="ea-anclaE ea-dis">
        <span>0 · lo regalas</span>
        <span>100 · te levantan de la mesa</span>
      </div>
      <div style={{ marginTop: 10 }}>
        {hist.map((h, i) => (
          <div key={i} style={{ fontSize: 13.5, color: h.dentro ? "#3D8A49" : "#6B6B6B" }}>
            <span className="ea-mono">{h.v}</span> · {h.msg}
          </div>
        ))}
      </div>
      <button className="ea-btn" onClick={ofrecer} disabled={cerrado}>Poner el número sobre la mesa</button>
    </div>
  );
}
