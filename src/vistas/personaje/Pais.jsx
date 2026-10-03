import React from "react";
import { NACIONES } from "../../datos/paises.js";
import { fmt } from "../../motor/aritmetica.js";
import { EDAD_DE } from "../../motor/edad-y-metas.js";

/* Paso cuatro del personaje: dónde vives. */
export function Pais({ ctx }) {
  const { Atras, elec, elige, enFase, rastro } = ctx;
  return (
    <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
      <Atras a={EDAD_DE(elec.edad).e >= 30 ? "familia" : "edad"}
        texto={EDAD_DE(elec.edad).e >= 30 ? "Cambiar tu situación" : "Cambiar la edad"} />
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso tres de cuatro</div>
      <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿De dónde vienes?</h2>
      <div className="ea-rastro ea-mono">{rastro()}</div>
      <p className="ea-lede" style={{ marginBottom: 18 }}>
        Define tu sueldo, tu costo de vida y con qué instintos empiezas.
      </p>
      {NACIONES.map((p) => (
        <div className="ea-panel" key={p.id} style={{ marginBottom: 10 }}>
          <div className="ea-itemTop">
            <span className="ea-nombre ea-dis" style={{ fontSize: 19, color: "var(--tinta)" }}>{p.n}</span>
            <span className="ea-mono" style={{ fontSize: 12.5, color: "var(--gris)" }}>{p.ban}</span>
          </div>
          <div style={{ fontSize: 13.5, color: "var(--gris)", margin: "8px 0" }}>{p.d}</div>
          <div style={{ fontSize: 12, color: "var(--cobre)" }}>
            Sueldos {Math.round(p.sal * 100)} · costo de vida {Math.round(p.gas * 100)} · impuesto {Math.round(p.tax * 100)}% · empiezas con USD {fmt(p.cash)}
          </div>
          <div style={{ fontSize: 12, color: "var(--gris)", marginTop: 3 }}>{p.nota}</div>
          <button className="ea-mini" onClick={() => { if (enFase("pais")) elige("pais", p.id, "estudio"); }}>
            {elec.pais === p.id ? "Elegido" : "Elegir"}
          </button>
        </div>
      ))}
    </div>
  );
}
