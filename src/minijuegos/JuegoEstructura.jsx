import React, { useState } from "react";
import { numero, entero, indiceAzar, elegirAzar } from "../motor/aritmetica.js";
import { Pista } from "../componentes/Iconos.jsx";

/* ---- Armar la estructura ----
   Rehecho otra vez (28-sep-2026). La versión anterior no se podía ganar:
   pedía multiplicar el capital por 2,4 si iba bien, y en todas las empresas
   posibles la cobertura de intereses rompía antes de llegar ahí. Además
   hablaba de EBITDA, cobertura y covenant, y la meta no se veía.

   Ahora: una empresa de 100 millones, una barra (cuánto te presta el
   banco) y dos metas que tiran en sentidos contrarios, con su ✓ en vivo.
     · si le va bien, multiplicar tu dinero por 2 o más  → pide deuda
     · si le va mal, conservar al menos el 30%           → pide poca deuda
   Entre las dos hay una franja buena que se mueve de partida en partida:
   se sortea primero la franja y de ella salen cuánto sube y cuánto baja la
   empresa, así que siempre existe y nunca está en el mismo sitio. Con
   mejor atributo la franja es más ancha. */
const EST_PRECIO = 100;
const EST_META_BIEN = 2;      /* multiplicar tu dinero por esto si va bien */
const EST_META_MAL = 0.3;     /* conservar al menos esta parte si va mal */
const EST_AMORTIZA = 10;      /* lo que la empresa devuelve de deuda si va bien */
const EST_TOPE = 80;          /* ningún banco presta más del 80% */
const casoEstructura = (ayuda) => {
  const lo = 30 + 5 * indiceAzar(5);                       /* de 30 a 50 */
  const ancho = numero(ayuda, 0) >= 60 ? 15 : 10;
  const hi = Math.min(EST_TOPE - 10, lo + ancho);
  /* bien: (100·(1+sube) − (d − 10)) / (100 − d) = 2    justo en d = lo */
  const sube = (EST_PRECIO * EST_META_BIEN - EST_META_BIEN * lo + lo - EST_AMORTIZA) / EST_PRECIO - 1;
  /* mal:  (100·(1−baja) − d) / (100 − d) = 0,3          justo en d = hi */
  const baja = 1 - (EST_META_MAL * (EST_PRECIO - hi) + hi) / EST_PRECIO;
  return { lo, hi, sube, baja,
    nombre: elegirAzar(["Envases del Sur", "Clínica Aurora", "Transportes Bolívar", "Alimentos Real", "Química Andina"]) || "la compañía" };
};
const resultadoEstructura = (c, deuda) => {
  const tuyo = EST_PRECIO - deuda;
  const bien = tuyo > 0 ? (EST_PRECIO * (1 + c.sube) - Math.max(0, deuda - EST_AMORTIZA)) / tuyo : 0;
  const mal = tuyo > 0 ? Math.max(0, EST_PRECIO * (1 - c.baja) - deuda) / tuyo : 0;
  const okBien = bien >= EST_META_BIEN - 1e-9, okMal = mal >= EST_META_MAL - 1e-9;
  return { tuyo, bien, mal, okBien, okMal, nivel: okBien && okMal ? "exito" : okBien || okMal ? "parcial" : "fallo" };
};

export function JuegoEstructura({ ayuda, onFin }) {
  const [caso] = useState(() => casoEstructura(ayuda));
  const [deuda, setDeuda] = useState(0);
  const [cerrado, setCerrado] = useState(null);
  const r = resultadoEstructura(caso, deuda);
  const x = (v) => v.toFixed(1).replace(".", ",") + "x";

  const cierre = {
    exito: "Punto justo. Con esa deuda tu dinero rinde de verdad si sale bien, y si sale mal te queda con qué volver a empezar.",
    parcial: r.okBien
      ? "Si sale bien ganas mucho, pero pediste tanto que un mal año se lleva casi todo lo que pusiste."
      : "Estás a salvo si sale mal, pero pusiste tanto de tu bolsillo que si sale bien tu dinero apenas rinde.",
    fallo: "No cumples ninguna de las dos metas: ni ganas lo suficiente si sale bien, ni aguantas si sale mal.",
  };

  return (
    <div className="ea-jw">
      <Pista>
        Compras <strong>{caso.nombre}</strong> por <strong>{EST_PRECIO} millones</strong>. Tú pones una parte y
        el banco te presta el resto. Pedir prestado hace que ganes más si sale bien… y que pierdas más si sale mal.
      </Pista>

      {/* la situación, siempre a la vista: la Pista de arriba se pliega */}
      <div className="ea-estCaso">
        Compras <strong>{caso.nombre}</strong> por <strong>{EST_PRECIO} millones</strong>. ¿Cuánto le pides al banco?
      </div>

      <div className="ea-est">
        <div className="ea-estL">
          <span>El banco te presta</span>
          <span className="ea-mono">{deuda} millones</span>
        </div>
        <input className="ea-slider" type="range" min="0" max={EST_TOPE} step="5" value={deuda} disabled={!!cerrado}
          onChange={(e) => setDeuda(entero(e.target.value, 0, 0, EST_TOPE))} aria-label="Cuánto te presta el banco" />
      </div>

      {/* quién pone qué */}
      <div className="ea-mix" style={{ marginTop: 6 }}>
        <div className="ea-mixSeg efe" style={{ width: r.tuyo + "%" }}>{r.tuyo >= 18 ? "tú " + r.tuyo : ""}</div>
        <div className="ea-mixSeg cart" style={{ width: deuda + "%" }}>{deuda >= 18 ? "banco " + deuda : ""}</div>
      </div>

      <div className="ea-escen">
        <div className={"ea-escenC " + (r.okBien ? "bien" : "mal")}>
          <div className="ea-lecK">Si le va bien · vale {Math.round(caso.sube * 100)}% más</div>
          <div className="ea-escenV ea-mono">{x(r.bien)}</div>
          <div className="ea-escenX">tu dinero se multiplica por {x(r.bien)}</div>
          <div className="ea-estMeta">{r.okBien ? "✓" : "✗"} Meta: {x(EST_META_BIEN)} o más</div>
        </div>
        <div className={"ea-escenC " + (r.okMal ? "bien" : "mal")}>
          <div className="ea-lecK">Si le va mal · vale {Math.round(caso.baja * 100)}% menos</div>
          <div className="ea-escenV ea-mono">{Math.round(r.mal * 100)}%</div>
          <div className="ea-escenX">{r.mal <= 0.005 ? "lo pierdes todo: el banco cobra primero" : "de tu dinero te queda el " + Math.round(r.mal * 100) + "%"}</div>
          <div className="ea-estMeta">{r.okMal ? "✓" : "✗"} Meta: conservar {Math.round(EST_META_MAL * 100)}% o más</div>
        </div>
      </div>

      {!cerrado ? (
        <button className="ea-btn" onClick={() => setCerrado(r.nivel)}>Cerrar el trato así</button>
      ) : (
        <div>
          <div className={"ea-alerta " + (cerrado === "exito" ? "bien" : cerrado === "fallo" ? "mal" : "")}>{cierre[cerrado]}</div>
          <button className="ea-btn" onClick={() => onFin(cerrado)}>Continuar</button>
        </div>
      )}
    </div>
  );
}
