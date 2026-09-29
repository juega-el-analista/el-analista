import React, { useState } from "react";
import { clamp, elegirAzar } from "../motor/aritmetica.js";
import { pulsable } from "../motor/requisitos.js";

/* ---- Cuatro en línea contra la contraparte ---- */
const COLS = 7, FILAS = 6;
export function JuegoCuatro({ ayuda, onFin }) {
  const [tab, setTab] = useState(() => Array(COLS * FILAS).fill(null));
  const [bloqueo, setBloqueo] = useState(false);
  const [estado, setEstado] = useState(null);
  const [linea, setLinea] = useState([]);
  const torpeza = clamp(ayuda / 170, 0.05, 0.5);

  const idx = (c, f) => f * COLS + c;
  const alturaCol = (bd, c) => { let f = 0; while (f < FILAS && bd[idx(c, f)]) f++; return f; };
  const libres = (bd) => { const l = []; for (let c = 0; c < COLS; c++) if (alturaCol(bd, c) < FILAS) l.push(c); return l; };

  const ganadorEn = (bd, p) => {
    const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (let c = 0; c < COLS; c++) for (let f = 0; f < FILAS; f++) {
      for (const d of dirs) {
        const cel = [];
        for (let k = 0; k < 4; k++) {
          const cc = c + d[0] * k, ff = f + d[1] * k;
          if (cc < 0 || cc >= COLS || ff < 0 || ff >= FILAS) { cel.length = 0; break; }
          if (bd[idx(cc, ff)] !== p) { cel.length = 0; break; }
          cel.push(idx(cc, ff));
        }
        if (cel.length === 4) return cel;
      }
    }
    return null;
  };

  const soltar = (bd, c, p) => {
    const f = alturaCol(bd, c);
    if (f >= FILAS) return null;
    const n = bd.slice(); n[idx(c, f)] = p; return n;
  };

  const jugadaIA = (bd) => {
    const l = libres(bd);
    for (const c of l) { const n = soltar(bd, c, "O"); if (n && ganadorEn(n, "O")) return c; }
    for (const c of l) { const n = soltar(bd, c, "X"); if (n && ganadorEn(n, "X")) return c; }
    if (Math.random() < torpeza) return elegirAzar(l);
    const seguras = l.filter((c) => {
      const n = soltar(bd, c, "O");
      const m = soltar(n, c, "X");
      return !(m && ganadorEn(m, "X"));
    });
    const cand = seguras.length ? seguras : l;
    return cand.reduce((mej, c) => (Math.abs(c - 3) < Math.abs(mej - 3) ? c : mej), cand[0]);
  };

  const terminar = (n, l) => { setEstado(n); setLinea(l || []); setBloqueo(true); setTimeout(() => onFin(n), 1150); };

  const jugar = (c) => {
    if (bloqueo || estado) return;
    const n = soltar(tab, c, "X");
    if (!n) return;
    setTab(n);
    const g = ganadorEn(n, "X");
    if (g) { terminar("exito", g); return; }
    if (libres(n).length === 0) { terminar("parcial"); return; }
    setBloqueo(true);
    setTimeout(() => {
      const c2 = jugadaIA(n);
      const n2 = soltar(n, c2, "O");
      setTab(n2);
      const g2 = ganadorEn(n2, "O");
      if (g2) { terminar("fallo", g2); return; }
      if (libres(n2).length === 0) { terminar("parcial"); return; }
      setBloqueo(false);
    }, 430);
  };

  const txt = { exito: "Cierras en tus términos", parcial: "Tablero lleno, partieron la diferencia", fallo: "Te ganaron la posición" };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Tus fichas en cobre</span><span>Lectura de la contraparte {Math.round(100 - torpeza * 100)}</span></div>
      <div className="ea-pista4">
        {Array.from({ length: COLS }, (_, c) => (
          <div className="ea-col4" key={c} {...pulsable(() => jugar(c), "Soltar ficha en la columna " + (c + 1))}>
            {Array.from({ length: FILAS }, (_, f) => {
              const v = tab[idx(c, f)];
              return <div key={f} className={"ea-hueco" + (v === "X" ? " mia" : v === "O" ? " suya" : "") + (linea.indexOf(idx(c, f)) >= 0 ? " gana" : "")} />;
            })}
          </div>
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 11, fontSize: 14, color: "#6B6B6B" }}>{estado ? txt[estado] : "Toca una columna para soltar tu ficha."}</div>
    </div>
  );
}
