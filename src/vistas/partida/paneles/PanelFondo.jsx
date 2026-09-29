import React from "react";
import { fmtCorto } from "../../../componentes/CaminoDelAnio.jsx";
import { senalesDeal } from "../../../datos/fondo.js";
import { entero, fmt, numero } from "../../../motor/aritmetica.js";
import { TAMANOS } from "../../../motor/deuda.js";
import {
  ROMANOS,
  SALTO_FONDO,
  UMBRAL_FONDO,
  capacidadFondo,
  puedeSiguienteFondo,
} from "../../../motor/fondo.js";
import { RANGO } from "../../../motor/reglas.js";

/* Pestaña Cartera, cuando ya tienes gestora: el fondo y sus negocios. */
export function PanelFondo({ ctx }) {
  const { invertirEn, levantarFondo, levantarSiguiente, patrimonio, s } = ctx;
  return (
    <div style={{ marginTop: 24, borderTop: "1px solid var(--borde)", paddingTop: 18 }}>
      <div className="ea-rot ea-dis">Tu fondo</div>
      {!s.fondo && (
        <div>
          <div className="ea-itemD" style={{ marginBottom: 12 }}>
            Para levantar tu propio fondo necesitas un patrimonio de USD {fmt(UMBRAL_FONDO)}, red y cargo.
            Comprometes 2% del tamaño como capital propio, 1% si tu rama es private
            equity. Cobras 2% anual de administración y veinte de las ganancias.
          </div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Tu patrimonio</span><span className="ea-mono">USD {fmt(patrimonio)}</span></div>
          {patrimonio >= UMBRAL_FONDO ? TAMANOS.map((t) => {
            const pct = s.rama === "pe" ? 0.01 : 0.02;
            const listo = s.red >= t.red && s.rango >= t.rango && s.cash + s.cartera >= t.m * pct;
            return (
              <div className="ea-item" key={t.n}>
                <div className="ea-itemTop">
                  <span className="ea-itemN">Fondo de {t.n}</span>
                  <span className="ea-mono" style={{ fontSize: 12.5 }}>{fmt(t.m * pct)}</span>
                </div>
                <div className="ea-itemD">Pide red {t.red} y cargo de {RANGO(t.rango).n} hacia arriba.</div>
                <button className="ea-mini" disabled={!listo} onClick={() => levantarFondo(t)}>
                  {listo ? "Levantar el fondo" : "Todavía no calificas"}
                </button>
              </div>
            );
          }) : (
            <div className="ea-itemD" style={{ marginTop: 10 }}>Te faltan USD {fmt(Math.max(0, UMBRAL_FONDO - patrimonio))} de patrimonio.</div>
          )}
        </div>
      )}
      {s.fondo && (
        <div>
          <div className="ea-vidaCab">
            <div>
              <div className="ea-vidaN ea-dis">Fondo {ROMANOS[entero(s.fondo.generacion, 1, 1, 8)] || "I"}</div>
              <div className="ea-vidaD">
                Cobras 2% anual de administración y veinte de las ganancias
                por encima del mínimo.
              </div>
            </div>
            <div className="ea-vidaCifra ea-mono" style={{ fontSize: 21 }}>{fmtCorto(capacidadFondo(s.fondo))}</div>
          </div>

          <div className="ea-fila" style={{ marginTop: 10 }}><span style={{ fontSize: 12.5 }}>Capital comprometido</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
          {s.fondo.reciclado > 0 && (
            <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ganancias reinvertidas</span><span className="ea-mono" style={{ color: "var(--verde)" }}>+ USD {fmt(s.fondo.reciclado)}</span></div>
          )}
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Desplegado ahora</span><span className="ea-mono">USD {fmt(s.fondo.invertido)}</span></div>
          <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Para invertir</span><span className="ea-mono" style={{ color: "var(--cobre)" }}>USD {fmt(Math.max(0, capacidadFondo(s.fondo) - s.fondo.invertido))}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ganancia realizada del fondo</span><span className="ea-mono">USD {fmt(s.fondo.realizado)}</span></div>
          <div className="ea-itemD" style={{ marginTop: 7 }}>
            Cuando una empresa se vende, su capital vuelve al fondo y la mitad de la ganancia
            se queda dentro para volver a invertirse. Por eso el fondo no se agota: circula.
          </div>

          {puedeSiguienteFondo(s) && (
            <div className="ea-caja" style={{ marginTop: 14 }}>
              <div className="ea-lecK" style={{ color: "var(--cobre)" }}>Puedes levantar el siguiente fondo</div>
              <div className="ea-itemD" style={{ marginTop: 4 }}>
                Con el historial que ya tienes, los inversionistas te confían dos veces y media más:
                USD {fmt(s.fondo.tam * SALTO_FONDO)}. Comprometes USD {fmt(s.fondo.tam * SALTO_FONDO * s.fondo.pct)} de tu propio bolsillo.
              </div>
              <button className="ea-mini" disabled={s.cash + s.cartera < s.fondo.tam * SALTO_FONDO * s.fondo.pct}
                onClick={levantarSiguiente}>
                {s.cash + s.cartera < s.fondo.tam * SALTO_FONDO * s.fondo.pct
                  ? "Te falta capital propio"
                  : "Levantar el Fondo " + (ROMANOS[entero(s.fondo.generacion, 1, 1, 8) + 1] || "siguiente")}
              </button>
            </div>
          )}

          <div className="ea-rot ea-dis" style={{ marginTop: 18 }}>En cartera</div>
          {s.fondo.posiciones.length === 0 && <div className="ea-itemD">Todavía no has invertido en nada.</div>}
          {s.fondo.posiciones.map((p, k) => (
            <div className="ea-fondoC" key={k}>
              <div className="ea-fondoT"><span className="ea-fondoN">{p.n}</span><span className="ea-mono" style={{ fontSize: 12 }}>{fmt(p.ticket)}</span></div>
              <div className="ea-itemD">{p.s} · salida estimada en {Math.max(0, p.salida - s.turno)} años</div>
            </div>
          ))}

          <div className="ea-rot ea-dis" style={{ marginTop: 18 }}>Sobre la mesa</div>
          <div className="ea-itemD" style={{ marginBottom: 8 }}>
            Los cinco indicadores están a la vista. En verde lo que juega a favor, en rojo lo que
            debería frenarte. El múltiplo esperado sale de ellos, no al revés.
          </div>
          {(!s.fondo.oferta || s.fondo.oferta.length === 0) && <div className="ea-itemD">No hay oportunidades este año.</div>}
          {(s.fondo.oferta || []).map((o, k) => (
            <div className="ea-fondoC" key={k}>
              <div className="ea-fondoT">
                <span className="ea-fondoN">{o.n}</span>
                <span className="ea-badge">{o.riesgo === 1 ? "Riesgo bajo" : o.riesgo === 2 ? "Riesgo medio" : "Riesgo alto"}</span>
              </div>
              {o.crec != null && (
                <div className="ea-dealS">
                  {senalesDeal(o).map((x) => (
                    <span key={x.k} className={"ea-sen" + (x.bien ? " bien" : x.mal ? " mal" : "")}>
                      <span className="ea-senK">{x.k}</span>
                      <span className="ea-senV ea-mono">{x.v}</span>
                    </span>
                  ))}
                </div>
              )}
              {o.d ? <div className="ea-itemD">{o.d}</div> : null}
              <div className="ea-itemD">{o.s} · ticket USD {fmt(o.ticket)} · múltiplo esperado {numero(o.base, 1.5).toFixed(2)}x</div>
              {o.tomado ? <span className="ea-tengo ea-dis">Invertido</span> : (
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  <button className="ea-mini" onClick={() => invertirEn(k, 1)}>Ticket completo</button>
                  <button className="ea-mini" onClick={() => invertirEn(k, 0.5)}>Medio ticket</button>
                  <button className="ea-mini" onClick={() => invertirEn(k, 0.25)}>Un cuarto</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
