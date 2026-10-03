import React, { useState, useEffect, useRef } from "react";
import { clamp } from "../motor/aritmetica.js";


export function JuegoPrecision({ ayuda, onFin }) {
  const ancho = clamp(11 + ayuda * 0.15, 11, 28);
  const [ronda, setRonda] = useState(0);
  const [pos, setPos] = useState(0);
  const [zona, setZona] = useState(() => 22 + Math.random() * 56);
  const [hits, setHits] = useState(0);
  const [pausa, setPausa] = useState(false);
  const [aviso, setAviso] = useState(null);
  const dir = useRef(1);
  const anchoR = ancho * Math.pow(0.78, ronda);
  const vel = 1 + ronda * 0.5;

  useEffect(() => {
    if (pausa) return;
    const id = setInterval(() => {
      setPos((p) => {
        let n = p + dir.current * vel;
        if (n >= 100) { n = 100; dir.current = -1; }
        if (n <= 0) { n = 0; dir.current = 1; }
        return n;
      });
    }, 16);
    return () => clearInterval(id);
  }, [pausa, vel]);

  const fijar = () => {
    setPausa(true);
    const dentro = Math.abs(pos - zona) <= anchoR / 2;
    const h = hits + (dentro ? 1 : 0);
    setHits(h);
    setAviso(dentro ? "Dentro del rango" : "Fuera por " + Math.abs(pos - zona).toFixed(1) + " puntos");
    setTimeout(() => {
      if (ronda >= 2) onFin(h >= 3 ? "exito" : h === 2 ? "parcial" : "fallo");
      else {
        setRonda(ronda + 1); setZona(22 + Math.random() * 56);
        setPos(0); dir.current = 1; setAviso(null); setPausa(false);
      }
    }, 900);
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Intento {ronda + 1} de 3</span><span>Aciertos {hits}</span></div>
      <div className="ea-pbar">
        <div className="ea-pzona" style={{ left: (zona - anchoR / 2) + "%", width: anchoR + "%" }} />
        <div className="ea-pcursor" style={{ left: pos + "%" }} />
      </div>
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#6B6B6B" }}>{aviso}</div>
      <button className="ea-btn" onClick={fijar} disabled={pausa}>Fijar</button>
    </div>
  );
}
