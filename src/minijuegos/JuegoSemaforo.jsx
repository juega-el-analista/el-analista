import React, { useState, useEffect } from "react";
import { clamp } from "../motor/aritmetica.js";
import { SENALES } from "../datos/preguntas.js";

export function JuegoSemaforo({ ayuda, nivel, onFin }) {
  const segs = clamp(2.4 + ayuda / 90 - ((nivel || 1) - 1) * 0.18, 1.5, 3.5);
  const [serie] = useState(() => SENALES.slice().sort(() => Math.random() - 0.5).slice(0, 6));
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(0);
  const [marca, setMarca] = useState(null);
  const [t, setT] = useState(segs);

  const responder = (a) => {
    if (marca !== null) return;
    const acierto = a === serie[i].a;
    setMarca(acierto ? "bien" : "mal");
    const n = ok + (acierto ? 1 : 0);
    setOk(n);
  };

  const seguir = () => {
    if (i >= 5) onFin(ok >= 5 ? "exito" : ok >= 4 ? "parcial" : "fallo");
    else { setI(i + 1); setMarca(null); setT(segs); }
  };

  useEffect(() => {
    if (marca !== null) return;
    const id = setInterval(() => setT((x) => Math.max(0, +(x - 0.1).toFixed(1))), 100);
    return () => clearInterval(id);
  }, [marca, i]);

  useEffect(() => { if (t === 0 && marca === null) responder("nada"); }, [t]);

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Señal {i + 1} de 6</span><span>{t.toFixed(1)} s · aciertos {ok}</span></div>
      <div className={"ea-luz" + (marca === "bien" ? " lista" : marca === "mal" ? " roja" : "")}>{serie[i].t}</div>
      <div className="ea-fila2">
        <button className="ea-btn" style={{ marginTop: 0, flex: 1 }} onClick={() => responder("comprar")} disabled={marca !== null}>Comprar</button>
        <button className="ea-btn" style={{ marginTop: 0, flex: 1, background: "var(--rojo)" }} onClick={() => responder("vender")} disabled={marca !== null}>Vender</button>
      </div>
      {marca !== null && (
        <div>
          <div className="ea-expl">{marca === "bien" ? "Bien leído. " : "Era para " + serie[i].a + ". "}En la mesa se decide con esta información y en este tiempo.</div>
          <button className="ea-btn" onClick={seguir}>{i >= 5 ? "Terminar" : "Continuar"}</button>
        </div>
      )}
    </div>
  );
}
