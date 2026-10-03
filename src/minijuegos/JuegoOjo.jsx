import React, { useState, useEffect } from "react";
import { clamp } from "../motor/aritmetica.js";
import { pulsable } from "../motor/requisitos.js";

export function JuegoOjo({ ayuda, onFin }) {
  const segs = clamp(3.5 + ayuda / 28, 3.5, 7.5);
  const armar = () => {
    const a = Math.floor(1000 + Math.random() * 8000);
    const s = a.toString();
    const arr = s.split("");
    const i = Math.floor(Math.random() * 3);
    const tmp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = tmp;
    let b = arr.join("");
    if (b === s) b = (a + 9).toString();
    const fila = Array.from({ length: 12 }, () => s);
    const pos = Math.floor(Math.random() * 12);
    fila[pos] = b;
    return { fila, pos };
  };
  const [ronda, setRonda] = useState(0);
  const [tab, setTab] = useState(armar);
  const [hits, setHits] = useState(0);
  const [t, setT] = useState(segs);
  const [aviso, setAviso] = useState(null);

  const resolver = (ok) => {
    if (aviso) return;
    const h = hits + (ok ? 1 : 0);
    setHits(h);
    setAviso(ok ? "Correcto" : "Se te pasó");
    setTimeout(() => {
      if (ronda >= 2) onFin(h >= 3 ? "exito" : h === 2 ? "parcial" : "fallo");
      else { setRonda(ronda + 1); setTab(armar()); setT(segs); setAviso(null); }
    }, 750);
  };

  useEffect(() => {
    if (aviso) return;
    const id = setInterval(() => setT((x) => Math.max(0, +(x - 0.1).toFixed(1))), 100);
    return () => clearInterval(id);
  }, [aviso, ronda]);

  useEffect(() => { if (t === 0) resolver(false); }, [t]);

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Cifra {ronda + 1} de 3</span><span>{t.toFixed(1)} s · aciertos {hits}</span></div>
      <div className="ea-nums">
        {tab.fila.map((n, i) => (
          <div className="ea-num ea-mono" key={i} {...pulsable(() => resolver(i === tab.pos), "Cifra " + n)}>{n}</div>
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 10, fontSize: 13.5, color: "#6B6B6B" }}>{aviso}</div>
    </div>
  );
}
