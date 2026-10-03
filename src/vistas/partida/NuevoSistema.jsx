import React from "react";
import { APERTURAS } from "../../datos/aperturas.js";

/* El aviso de una sección nueva que se acaba de abrir, con su guía. */
export function NuevoSistema({ ctx }) {
  const { nuevoSistema, setNuevoSistema, setTab } = ctx;
  const ap = APERTURAS.find((a) => a.id === nuevoSistema);
  const g = ap && ap.guia;
  if (!g) return null;
  /* A donde lleva el boton «Ver la seccion». Con las pestañas
     fusionadas ya no hay una por sistema: inmuebles y mejoras caen
     en Comprar, el fondo en Cartera, y el banco en Ficha. */
  const DESTINO = { cartera: "portafolio", fondo: "portafolio", vida: "expediente",
    inmuebles: "comprar", mejoras: "comprar", banco: "ficha" };
  const destino = DESTINO[nuevoSistema] || null;
  return (
    <div className="ea-modalFondo" onClick={() => setNuevoSistema(null)}>
      <div className="ea-modal ea-panelAb" onClick={(e) => e.stopPropagation()}>
        <div className="ea-modalCab">
          <span className="ea-modalT ea-dis">SECCIÓN NUEVA</span>
          <button className="ea-modalX ea-dis" aria-label="Cerrar" onClick={() => setNuevoSistema(null)}>✕</button>
        </div>
        <div className="ea-modalCuerpo">
          <div className="ea-nuevoK ea-dis">ACABAS DE ABRIR</div>
          <div className="ea-nuevoT ea-dis">{g.t}</div>
          <div className="ea-nuevoX">{g.x}</div>
          <ul className="ea-nuevoP">
            {g.puntos.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
            {destino && (
              <button className="ea-aplicar ea-dis" onClick={() => { setTab(destino); setNuevoSistema(null); }}>
                Ver la sección
              </button>
            )}
            <button className="ea-descartar ea-dis" onClick={() => setNuevoSistema(null)}>Después</button>
          </div>
        </div>
      </div>
    </div>
  );
}
