import React, { useState } from "react";
import { clamp, elegirAzar } from "../motor/aritmetica.js";
import { pulsable } from "../motor/requisitos.js";

const LINEAS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

export function JuegoTresRaya({ ayuda, onFin }) {
  const [b, setB] = useState(Array(9).fill(null));
  const [bloqueo, setBloqueo] = useState(false);
  const [estado, setEstado] = useState(null);
  const [linea, setLinea] = useState([]);
  const torpeza = clamp(ayuda / 150, 0.08, 0.6);

  const ganador = (bd, p) => LINEAS.find((l) => l.every((i) => bd[i] === p));
  const libres = (bd) => bd.reduce((a, v, i) => (v === null ? a.concat(i) : a), []);

  const jugadaIA = (bd) => {
    const l = libres(bd);
    if (Math.random() < torpeza) return elegirAzar(l);
    for (const i of l) { const t = bd.slice(); t[i] = "O"; if (ganador(t, "O")) return i; }
    for (const i of l) { const t = bd.slice(); t[i] = "X"; if (ganador(t, "X")) return i; }
    if (bd[4] === null) return 4;
    const esq = [0, 2, 6, 8].filter((i) => bd[i] === null);
    if (esq.length) return elegirAzar(esq);
    return l[0];
  };

  const terminar = (n, l) => { setEstado(n); setLinea(l || []); setBloqueo(true); setTimeout(() => onFin(n), 1050); };

  const tocar = (i) => {
    if (bloqueo || b[i] || estado) return;
    const nb = b.slice(); nb[i] = "X"; setB(nb);
    const g = ganador(nb, "X");
    if (g) { terminar("exito", g); return; }
    if (libres(nb).length === 0) { terminar("parcial"); return; }
    setBloqueo(true);
    setTimeout(() => {
      const j = jugadaIA(nb);
      const nb2 = nb.slice(); nb2[j] = "O"; setB(nb2);
      const g2 = ganador(nb2, "O");
      if (g2) { terminar("fallo", g2); return; }
      if (libres(nb2).length === 0) { terminar("parcial"); return; }
      setBloqueo(false);
    }, 400);
  };

  const txt = { exito: "Cerraste en tus términos", parcial: "Empate, partieron la diferencia", fallo: "Te sacaron las concesiones" };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Tú juegas con X</span><span>Lectura de la contraparte {Math.round(100 - torpeza * 100)}</span></div>
      <div className="ea-celdas">
        {b.map((v, i) => (
          <div key={i} className={"ea-celda" + (linea.indexOf(i) >= 0 ? " gana" : "")}
            {...pulsable(() => tocar(i), "Casilla " + (i + 1) + (v ? ", ocupada por " + v : ", libre"), !!v)}>{v}</div>
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 12, fontSize: 14, color: "#6B6B6B" }}>{estado ? txt[estado] : ""}</div>
    </div>
  );
}
