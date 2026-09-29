import React from "react";
import { Cifra } from "../../componentes/Cifra.jsx";
import { ETIQ } from "../../datos/mercado.js";

/* Lo que salió de la decisión que acabas de tomar. */
export function Resultado({ ctx }) {
  const { ano, carteraPend, cola, ev, res, selloCls, selloTxt, siguienteEscena } = ctx;
  return (
    <div className="ea-memo">
      <div className="ea-memoHead ea-dis"><span>Resolución</span><span>{ano}</span></div>
      <div className={"ea-sello ea-dis" + selloCls[res.nivel]}>{selloTxt[res.nivel]}</div>
      <h2 className="ea-memoTit ea-dis">{(ev && ev.t) || "Resolución"}</h2>
      <p className="ea-memoTxt">{res.msg}</p>
      {/* El dinero deja de ser un chip entre seis. Es lo que el
          jugador vino a ver, asi que sale solo, grande y
          contando; los atributos quedan detras, en pequeño. */}
      {(() => {
        const plata = res.cambios.find((c) => c.k === "cash" && c.v);
        if (!plata) return null;
        const sube = plata.v > 0;
        return (
          <div className={"ea-golpe " + (sube ? "sube" : "baja")}>
            <span className="ea-golpeS">{sube ? "+" : "−"}</span>
            <span className="ea-golpeV ea-mono"><Cifra v={Math.abs(plata.v)} desde={0} ms={800} /></span>
            <span className="ea-golpeU ea-dis">USD</span>
          </div>
        );
      })()}
      {res.cambios.filter((c) => (c.nota || c.v) && c.k !== "cash").length > 0 && (
        <div className="ea-cambios">
          {res.cambios.filter((c) => (c.nota || c.v) && c.k !== "cash").map((c, i) => (
            <span className={"ea-chip ea-mono " + (c.nota ? "pos" : c.v > 0 ? "pos" : "neg")} key={i}
              style={{ animationDelay: (260 + i * 90) + "ms" }}>
              {c.nota ? c.nota : (ETIQ[c.k] + " " + (c.v > 0 ? "+" : "") + c.v)}
            </span>
          ))}
        </div>
      )}
      <button className="ea-btn" disabled={carteraPend} onClick={siguienteEscena}>
        {cola.length > 0 ? "Lo siguiente que pasó" : "Cerrar el año"}
      </button>
    </div>
  );
}
