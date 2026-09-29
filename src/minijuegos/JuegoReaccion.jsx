import React, { useState, useEffect, useRef } from "react";

/* ---- rápidos ---- */

export function JuegoReaccion({ ayuda, onFin }) {
  const [estado, setEstado] = useState("espera");
  const [ronda, setRonda] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [msg, setMsg] = useState("Prepárate");
  const t0 = useRef(0);
  const timer = useRef(null);
  const bueno = 380 + ayuda * 2.4;
  const regular = 720 + ayuda * 2.4;

  useEffect(() => {
    setEstado("espera"); setMsg("Prepárate");
    timer.current = setTimeout(() => {
      setEstado("lista"); setMsg("Ahora"); t0.current = Date.now();
    }, 800 + Math.random() * 1900);
    return () => clearTimeout(timer.current);
  }, [ronda]);

  const avanzar = (p, texto) => {
    const total = puntos + p;
    setPuntos(total); setEstado("hecho"); setMsg(texto);
    clearTimeout(timer.current);
    setTimeout(() => {
      if (ronda >= 2) onFin(total >= 5 ? "exito" : total >= 3 ? "parcial" : "fallo");
      else setRonda(ronda + 1);
    }, 850);
  };

  const click = () => {
    if (estado === "espera") { avanzar(0, "Te adelantaste, orden al precio equivocado"); return; }
    if (estado !== "lista") return;
    const ms = Date.now() - t0.current;
    if (ms <= bueno) avanzar(2, ms + " ms, ejecución perfecta");
    else if (ms <= regular) avanzar(1, ms + " ms, pasable");
    else avanzar(0, ms + " ms, se movió el precio");
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Orden {ronda + 1} de 3</span><span>Puntos {puntos} de 6</span></div>
      <div aria-label="Ejecutar la orden"
        className={"ea-luz" + (estado === "lista" ? " lista" : estado === "hecho" ? " roja" : "")}
        onClick={click} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") click(); }}>
        {msg}
      </div>
      <div style={{ fontSize: 12.5, color: "var(--gris)", marginTop: 9 }}>Toca el panel apenas se ponga verde.</div>
    </div>
  );
}
