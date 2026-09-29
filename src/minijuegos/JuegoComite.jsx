import React, { useState } from "react";
import { EMPRESAS, calidadDeal, baseDeal, senalesDeal } from "../datos/fondo.js";
import { Pista } from "../componentes/Iconos.jsx";

/* ---- El comité de inversión ----
   Tres negocios sobre la mesa y capital para uno. No hay pistas: están
   los cinco datos y hay que decidir. Es el modo que entrena lo único
   que de verdad hace falta para gestionar un fondo, que es distinguir
   un buen negocio de uno que solo lo parece. */
export function JuegoComite({ ayuda, onFin }) {
  const [mesa] = useState(() => {
    const pool = EMPRESAS.slice().sort(() => Math.random() - 0.5);
    /* con criterio alto la diferencia entre el mejor y el resto es más clara */
    const cuantos = 3;
    const elegidas = pool.slice(0, cuantos).map((e) => ({ ...e, q: calidadDeal(e) }));
    return elegidas.sort(() => Math.random() - 0.5);
  });
  const [sel, setSel] = useState(null);

  const orden = mesa.slice().sort((a, b) => b.q - a.q);
  const mejor = orden[0];
  const elegido = sel == null ? null : mesa[sel];
  const puesto = elegido ? orden.findIndex((x) => x.n === elegido.n) : -1;

  const nivel = puesto === 0 ? "exito" : puesto === 1 ? "parcial" : "fallo";
  const cierre = puesto === 0
    ? "Elegiste el mejor de los tres. Fíjate en qué te lo dijo: no era el que más crecía, era el que crecía con margen, sin depender de un cliente y sin deuda encima."
    : puesto === 1
      ? "Segundo mejor. Defendible en un comité, y aun así había uno claramente superior."
      : "Te quedaste con el peor de los tres. Casi siempre pasa por mirar el crecimiento y no mirar de quién depende la facturación.";

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Tres negocios · capital para uno</span>
        <span>{ayuda >= 60 ? "Tu criterio ya descarta lo obvio" : "Sin pistas"}</span>
      </div>
      <Pista>
        Estos son los cinco datos con los que se decide de verdad. Crecer y tener margen suman;
        depender de un solo cliente y arrastrar deuda restan casi lo mismo. Elige uno.
      </Pista>

      {mesa.map((e, i) => {
        const marcado = sel === i;
        const esMejor = sel != null && e.n === mejor.n;
        return (
          <div key={e.n} className={"ea-deal" + (marcado ? " sel" : "") + (sel != null && esMejor ? " gana" : "")}>
            <div className="ea-itemTop">
              <span className="ea-itemN">{e.n}</span>
              <span className="ea-mono" style={{ fontSize: 12, flexShrink: 0 }}>{e.s}</span>
            </div>
            <div className="ea-dealS">
              {senalesDeal(e).map((x) => (
                <span key={x.k} className={"ea-sen" + (x.bien ? " bien" : x.mal ? " mal" : "")}>
                  <span className="ea-senK">{x.k}</span>
                  <span className="ea-senV ea-mono">{x.v}</span>
                </span>
              ))}
            </div>
            <div className="ea-itemD">{e.d}</div>
            {sel == null
              ? <button className="ea-mini" onClick={() => setSel(i)}>Poner el capital aquí</button>
              : <div className="ea-dealR">
                  {esMejor ? "Era el mejor de los tres" : "Múltiplo esperado " + baseDeal(e).toFixed(2) + "x"}
                  {marcado && !esMejor ? " · lo elegiste" : ""}
                </div>}
          </div>
        );
      })}

      {sel != null && (
        <div>
          <div className={"ea-alerta " + (nivel === "exito" ? "bien" : nivel === "fallo" ? "mal" : "")}>{cierre}</div>
          <button className="ea-btn" onClick={() => onFin(nivel)}>Continuar</button>
        </div>
      )}
    </div>
  );
}
