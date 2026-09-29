import React from "react";
import { fmt } from "../../motor/aritmetica.js";
import { EDAD_DE } from "../../motor/edad-y-metas.js";
import { COSTO_HIJO } from "../../motor/estado-inicial.js";

/* Paso tres del personaje: con quién llegas y cuántos hijos. */
export function Familia({ ctx }) {
  const { Atras, elec, enFase, irA, setElec } = ctx;
  return (
    <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
      <Atras a="edad" texto="Cambiar la edad" />
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso dos de cuatro</div>
      <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Cómo llegas a los {EDAD_DE(elec.edad).e}?</h2>
      <div className="ea-rastro ea-mono">Empiezas a los {EDAD_DE(elec.edad).e}</div>
      <p className="ea-lede" style={{ marginBottom: 18 }}>
        Cambia lo que te cuesta vivir desde el primer año.
      </p>

      <div className="ea-campoK ea-dis">Con quién llegas</div>
      <div className="ea-generos">
        {[["solo", "Sin pareja"], ["noviazgo", "En pareja"], ["casado", "Casado"], ["divorciado", "Divorciado"]].map((par) => (
          <button key={par[0]} className={"ea-mini" + (elec.pareja === par[0] ? " on" : "")}
            onClick={() => setElec((x) => ({ ...x, pareja: par[0] }))}>{par[1]}</button>
        ))}
      </div>

      <div className="ea-campoK ea-dis" style={{ marginTop: 18 }}>Cuántos hijos</div>
      <div className="ea-generos">
        {[0, 1, 2, 3, 4].map((h) => (
          <button key={h} className={"ea-mini" + (elec.hijos === h ? " on" : "")}
            onClick={() => setElec((x) => ({ ...x, hijos: h }))}>{h === 0 ? "Ninguno" : h}</button>
        ))}
      </div>
      <div className="ea-itemD" style={{ marginTop: 9 }}>
        {elec.hijos > 0
          ? "Cada hijo cuesta del orden de USD " + fmt(COSTO_HIJO) + " al año antes de ajustar por país, y pesa en tu tren de vida desde el primer cierre."
          : "Sin hijos el gasto arranca más bajo. Nada impide que lleguen jugando."}
      </div>

      <button className="ea-btn" style={{ marginTop: 22 }}
        onClick={() => { if (enFase("familia")) irA("pais"); }}>Seguir</button>
    </div>
  );
}
