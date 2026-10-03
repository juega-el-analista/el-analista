import React from "react";
import { Rodillo } from "../../componentes/Rodillo.jsx";
import { fmt } from "../../motor/aritmetica.js";

/* El anuncio del año: el rodillo con cuánto tienes ahora, antes del informe. */
export function Anuncio({ ctx }) {
  const { cierre, setAnuncio } = ctx;
  const sube = cierre.patrimonio >= cierre.patAntes;
  const dif = Math.abs(cierre.patrimonio - cierre.patAntes);
  return (
    <div className="ea-anuncio" onClick={() => setAnuncio(false)}>
      {/* Ojo al tocar esta linea: «Asi terminó» es lo que cuenta
          finales.js para saber cuantos años se jugaron, y esta en
          la cabecera del informe. Repetirla aqui hacia que cada
          año se contara dos veces. */}
      <div className="ea-anuncioK ea-dis">Cierre de {cierre.ano}</div>
      <div className="ea-anuncioN ea-mono">
        <span className="ea-anuncioU ea-dis">USD</span>
        <Rodillo v={cierre.patrimonio} />
      </div>
      <div className={"ea-anuncioD ea-mono " + (sube ? "sube" : "baja")}
        style={{ animationDelay: "1.5s" }}>
        {sube ? "+" : "−"}{fmt(dif)} en el año
      </div>
      {cierre.ascenso && (
        <div className="ea-anuncioL ea-dis" style={{ animationDelay: "1.8s", color: "var(--cobre)", fontSize: 16 }}>
          Ascenso a {cierre.ascenso}
        </div>
      )}
      {cierre.hitos.length > 0 && (
        <div className="ea-anuncioL" style={{ animationDelay: "2s" }}>{cierre.hitos.join(" · ")}</div>
      )}
      <div className="ea-anuncioB" style={{ animationDelay: "2.2s" }}>
        <button className="ea-jugarYa ea-dis" style={{ fontSize: 15, padding: "13px 30px" }}
          onClick={(e) => { e.stopPropagation(); setAnuncio(false); }}>
          Ver el año
        </button>
      </div>
    </div>
  );
}
