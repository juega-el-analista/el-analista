import React, { useState, useEffect, useRef } from "react";
import { entero, clamp } from "../motor/aritmetica.js";
import { CARRILES } from "../datos/minijuegos.js";

/* ---- El carril del capital ---- */
export function JuegoCarril({ ayuda, onFin }) {
  const TOTAL = 26;
  const [carril, setCarril] = useState(1);
  const [objs, setObjs] = useState([]);
  const [t, setT] = useState(0);
  const [pts, setPts] = useState(0);
  const [golpes, setGolpes] = useState(0);
  const [fin, setFin] = useState(false);
  const carrilRef = useRef(1);
  useEffect(() => { carrilRef.current = carril; }, [carril]);

  const vel = 22;
  const probMalo = clamp(0.5 - ayuda / 320, 0.28, 0.5);

  useEffect(() => {
    if (fin) return;
    const id = setTimeout(() => {
      setObjs((prev) => {
        let lista = prev.map((o) => ({ ...o, y: o.y + vel }));
        if (t < TOTAL && t % 2 === 0) {
          const c = Math.floor(Math.random() * 3);
          lista = lista.concat({ k: t, c, y: -30, malo: Math.random() < probMalo, tocado: false });
        }
        lista.forEach((o) => {
          if (!o.tocado && o.y >= 170 && o.y <= 205 && o.c === carrilRef.current) {
            o.tocado = true;
            if (o.malo) setGolpes((g) => g + 1);
            else setPts((p) => p + 1);
          }
        });
        return lista.filter((o) => o.y < 240);
      });
      if (t >= TOTAL + 8) { setFin(true); return; }
      setT(t + 1);
    }, 190);
    return () => clearTimeout(id);
  }, [t, fin, probMalo]);

  const cerrar = () => {
    const neto = pts - golpes * 2;
    onFin(neto >= 6 ? "exito" : neto >= 2 ? "parcial" : "fallo");
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Retornos {pts}</span><span>Golpes {golpes}</span></div>
      <div className="ea-pistaC">
        <div className="ea-lineaC" style={{ left: "33.3%" }} />
        <div className="ea-lineaC" style={{ left: "66.6%" }} />
        {objs.map((o) => (
          <div key={o.k} className={"ea-obj " + (o.malo ? "malo" : "bueno")}
            style={{ left: o.c * 33.3 + 3.6 + "%", top: o.y + "px", opacity: o.tocado ? 0.25 : 1 }}>
            {o.malo ? CARRILES[o.c].malo : CARRILES[o.c].bueno}
          </div>
        ))}
        <div className="ea-cap" style={{ left: carril * 33.3 + 3.6 + "%" }}>Tu capital</div>
      </div>
      {/* Una barra en vez de tres botones: mover el capital con el dedo o
          con las flechas es mucho mas rapido que apuntar a un boton
          mientras las cosas siguen cayendo. */}
      <input className="ea-slider ea-carrilS" type="range" min="0" max="2" step="1" value={carril}
        disabled={fin} aria-label="Carril de tu capital"
        onChange={(e) => setCarril(entero(e.target.value, 1, 0, 2))} />
      <div className="ea-carrilN">
        {CARRILES.map((c, i) => (
          <span key={i} className={"ea-carrilE ea-dis" + (carril === i ? " on" : "")}>{c.n}</span>
        ))}
      </div>
      {fin && (
        <div>
          <div className={"ea-alerta " + (pts - golpes * 2 >= 6 ? "bien" : pts - golpes * 2 >= 2 ? "" : "mal")}>
            Cerraste con {pts} retornos y {golpes} golpes. Rotar entre activos captura oportunidades y también te expone
            justo cuando el carril equivocado se pone feo.
          </div>
          <button className="ea-btn" onClick={cerrar}>Continuar</button>
        </div>
      )}
    </div>
  );
}
