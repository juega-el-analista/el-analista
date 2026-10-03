import React from "react";
import { fmt } from "../../motor/aritmetica.js";
import { edad } from "../../motor/edad-y-metas.js";

/* La decisión de vida: retirarte o seguir un año más. */
export function Retiro({ ctx }) {
  const {
    bienesVal, cobertura, gastosAnuales, patrimonio, rentaProps, retirarse, retiroAnual, s,
    seguirCinco,
  } = ctx;
  return (
    <div className="ea-memo">
      <div className="ea-memoHead ea-dis clave"><span>Decisión de vida</span><span>{edad(s.turno, s.edadIni)} años</span></div>
      <h2 className="ea-memoTit ea-dis">¿Te retiras?</h2>
      <p className="ea-memoTxt">
        Llegaste a los {edad(s.turno, s.edadIni)}. Puedes cerrar aquí y vivir de lo que construiste, o seguir cinco años
        más y ver hasta dónde llega. Los números son estos.
      </p>
      <div className="ea-res" style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Patrimonio total USD {fmt(patrimonio)}, de los cuales USD {fmt(bienesVal)} están en bienes.</div>
        <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Retirando 4% al año dispondrías de USD {fmt(retiroAnual)}.</div>
        {rentaProps > 0 && <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Tus propiedades rentan USD {fmt(rentaProps)} al año.</div>}
        <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Tu forma de vivir cuesta USD {fmt(gastosAnuales)} al año.</div>
        <div className="ea-dis" style={{ marginTop: 11, fontSize: 17, color: cobertura >= 1 ? "#3D8A49" : "var(--rojo)" }}>
          {cobertura >= 1 ? "Te alcanza y sobra" : cobertura >= 0.7 ? "Te queda corto por poco" : "No te alcanza"} · cubres el {Math.round(cobertura * 100)}%
        </div>
      </div>
      <div className="ea-fila2">
        <button className="ea-btn" style={{ marginTop: 14 }} onClick={retirarse}>Retirarme ahora</button>
        <button className="ea-btn" style={{ marginTop: 14, background: "var(--cobre)" }} onClick={seguirCinco}>Seguir cinco años más</button>
      </div>
    </div>
  );
}
