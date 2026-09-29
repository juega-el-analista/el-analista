import React from "react";
import { BotonAnotar, PanelRegistro } from "../../componentes/Registro.jsx";
import { nivelDeVida } from "../../datos/estilo-de-vida.js";
import { PREMIO_DE } from "../../datos/premios.js";
import { entero, fmt, numero, texto } from "../../motor/aritmetica.js";
import { statsPesos } from "../../motor/cartera.js";
import { edad } from "../../motor/edad-y-metas.js";
import { ROMANOS } from "../../motor/fondo.js";
import { RANGO } from "../../motor/reglas.js";

/* El final de la vida: el balance, lo que se disfrutó y el expediente. */
export function Fin({ ctx }) {
  const {
    conservanValor, consumoN, empezar, estudio, gastadoEnConsumo, gastosAnuales, mezclaAct,
    nacion, netoAnual, patrimonio, ramaN, retiroAnual, s, totalHoy, totalPagado, veredicto,
    vidaTotal,
  } = ctx;
  return (
    <div className="ea-wrap ea-portada">
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>
        {s.nombre ? s.nombre + " · " : ""}{edad(s.turno, s.edadIni)} años · {nacion.n} · {estudio.n}
      </div>
      <h2 className="ea-final ea-dis">{veredicto.t}</h2>
      <p className="ea-lede">{veredicto.x}</p>
      <div className="ea-regla" />
      <div className="ea-cifras">
        <div><div className="ea-cifraK">Cargo final</div><div className="ea-cifraV ea-dis">{RANGO(s.rango).n}</div></div>
        <div><div className="ea-cifraK">Rama</div><div className="ea-cifraV ea-dis">{ramaN || "sin definir"}</div></div>
        <div><div className="ea-cifraK">Patrimonio</div><div className="ea-cifraV ea-mono">USD {fmt(patrimonio)}</div></div>
        {s.deuda > 0 && <div><div className="ea-cifraK">Deuda pendiente</div><div className="ea-cifraV ea-mono">USD {fmt(s.deuda)}</div></div>}
        {s.quiebras > 0 && <div><div className="ea-cifraK">Quiebras</div><div className="ea-cifraV ea-mono">{s.quiebras}</div></div>}
        <div><div className="ea-cifraK">Renta anual al 4%</div><div className="ea-cifraV ea-mono">USD {fmt(retiroAnual)}</div></div>
        <div><div className="ea-cifraK">Gasto anual</div><div className="ea-cifraV ea-mono">USD {fmt(gastosAnuales)}</div></div>
        <div><div className="ea-cifraK">Tren de vida</div><div className="ea-cifraV ea-dis">{nivelDeVida(vidaTotal(s)).n}</div></div>
        {(Array.isArray(s.premios) ? s.premios : []).length > 0 && (
          <div>
            <div className="ea-cifraK">Reconocimientos</div>
            <div className="ea-cifraV ea-dis">{s.premios.length}{s.premios.some((id) => (PREMIO_DE(id) || {}).mundial) ? " · con uno mundial" : ""}</div>
          </div>
        )}
        <div>
          <div className="ea-cifraK">Cuánto cuesta sostenerlo</div>
          <div className="ea-cifraV ea-mono">USD {fmt(gastosAnuales)} al año</div>
        </div>
      </div>

      {/* Los seis datos salen del estado: nada que copiar a mano. */}
      <BotonAnotar entrada={{
        n: s.nombre,
        c: RANGO(s.rango).n,
        e: edad(s.turno, s.edadIni),
        p: Math.round(patrimonio),
        m: (Array.isArray(s.premios) ? s.premios : []).length,
        v: texto(veredicto && veredicto.t, 60),
      }} />

      <div className="ea-panel" style={{ marginTop: 16, textAlign: "left" }}>
        <PanelRegistro tope={20} titulo="El registro, por patrimonio" />
      </div>
      {s.fondo && (
        <div className="ea-panel" style={{ marginTop: 24 }}>
          <div className="ea-rot ea-dis">Tu gestora</div>
          <div className="ea-fila"><span style={{ fontSize: 13 }}>Generación alcanzada</span><span className="ea-mono">Fondo {ROMANOS[entero(s.fondo.generacion, 1, 1, 8)] || "I"}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 13 }}>Capital comprometido</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 13 }}>Ganancias reinvertidas</span><span className="ea-mono">USD {fmt(s.fondo.reciclado || 0)}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 13 }}>Ganancia realizada</span><span className="ea-mono" style={{ color: (s.fondo.realizado || 0) >= 0 ? "var(--verde)" : "var(--rojo)" }}>USD {fmt(s.fondo.realizado)}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 13 }}>Múltiplo sobre lo comprometido</span><span className="ea-mono">{s.fondo.tam > 0 ? (1 + (s.fondo.realizado || 0) / s.fondo.tam).toFixed(2) + "x" : "—"}</span></div>
        </div>
      )}
      {/* Lo que venía después. Retirarse a los 50 dejaba invisible lo que
          faltaba: quince años de interés compuesto y de sueldo. */}
      {(() => {
        const miEdad = edad(s.turno, s.edadIni);
        if (miEdad >= 65) return null;
        const faltan = 65 - miEdad;
        const mu = statsPesos(mezclaAct).mu;
        const sinTocar = patrimonio * Math.pow(1 + mu, faltan);
        const deSueldo = netoAnual(s) * faltan;
        return (
          <div className="ea-panel" style={{ marginTop: 24 }}>
            <div className="ea-rot ea-dis">Lo que venía después</div>
            <div className="ea-itemD" style={{ marginBottom: 10 }}>
              Te retiraste a los {miEdad}. Hasta la edad en la que se retira la mayoría te
              quedaban {faltan} {faltan === 1 ? "año" : "años"}, y esto es lo que traían.
            </div>
            <div className="ea-fila"><span style={{ fontSize: 13 }}>Tu patrimonio a los 65, sin tocarlo</span><span className="ea-mono">USD {fmt(sinTocar)}</span></div>
            <div className="ea-fila"><span style={{ fontSize: 13 }}>Solo por dejarlo quieto</span><span className="ea-mono">+USD {fmt(sinTocar - patrimonio)}</span></div>
            <div className="ea-fila"><span style={{ fontSize: 13 }}>Sueldo neto que dejaste sobre la mesa</span><span className="ea-mono">USD {fmt(deSueldo)}</span></div>
            <div className="ea-fila"><span style={{ fontSize: 13 }}>Retirando 4% al año</span><span className="ea-mono">USD {fmt(retiroAnual)} · gastas {fmt(gastosAnuales)}</span></div>
            <div className="ea-itemD" style={{ marginTop: 9 }}>
              {mu > 0
                ? "Calculado al " + (mu * 100).toFixed(1) + "% que esperaba tu cartera el día que la dejaste, y sin descontar lo que habrías gastado. No es una promesa: es el orden de magnitud de lo que hace el tiempo cuando ya no tienes que hacer nada."
                : "Tu cartera no esperaba rendir nada, así que el tiempo tampoco iba a trabajar a tu favor."}
            </div>
          </div>
        );
      })()}

      {/* El fondo se cerraba sin contar sus posiciones abiertas, así que
          su rendimiento real quedaba invisible. Aquí se valoran al
          múltiplo base de cada una, sin azar. */}
      {s.fondo && s.fondo.posiciones && s.fondo.posiciones.length > 0 && (() => {
        const abiertas = s.fondo.posiciones;
        const capital = abiertas.reduce((a, p) => a + numero(p.ticket, 0), 0);
        const valor = abiertas.reduce((a, p) => a + numero(p.ticket, 0) * numero(p.base, 1.5), 0);
        const tuParte = abiertas.reduce((a, p) => {
          const proc = numero(p.ticket, 0) * numero(p.base, 1.5);
          const carry = Math.max(0, proc - numero(p.ticket, 0) * 1.4) * 0.2;
          return a + carry + (proc - numero(p.ticket, 0)) * numero(s.fondo.pct, 0.02);
        }, 0);
        return (
          <div className="ea-panel" style={{ marginTop: 16 }}>
            <div className="ea-rot ea-dis">Lo que tu fondo tenía todavía en el suelo</div>
            <div className="ea-itemD" style={{ marginBottom: 10 }}>
              {abiertas.length === 1 ? "Quedaba una posición sin salir" : "Quedaban " + abiertas.length + " posiciones sin salir"}
              {" "}cuando cerraste. Valoradas a su múltiplo esperado, esto es lo que traían.
            </div>
            {abiertas.map((p, i) => (
              <div className="ea-fila" key={i}>
                <span style={{ fontSize: 13 }}>{p.n}</span>
                <span className="ea-mono">{numero(p.base, 1.5).toFixed(2)}x · USD {fmt(numero(p.ticket, 0) * numero(p.base, 1.5))}</span>
              </div>
            ))}
            <div className="ea-fila" style={{ marginTop: 8 }}><span style={{ fontSize: 13 }}>Capital metido</span><span className="ea-mono">USD {fmt(capital)}</span></div>
            <div className="ea-fila"><span style={{ fontSize: 13 }}>Valor esperado</span><span className="ea-mono">USD {fmt(valor)}</span></div>
            <div className="ea-fila"><span style={{ fontSize: 13 }}>Lo que te habría tocado a ti</span><span className="ea-mono" style={{ color: "#4FA05C" }}>USD {fmt(tuParte)}</span></div>
            <div className="ea-itemD" style={{ marginTop: 9 }}>
              Un fondo se juzga cuando ha salido de todo, y tú cerraste antes. Esta es la parte
              que no llegaste a ver: sumando lo realizado, tu gestora iba camino de un múltiplo
              de {(numero(s.fondo.tam, 0) > 0 ? (1 + (numero(s.fondo.realizado, 0) + (valor - capital)) / numero(s.fondo.tam, 1)) : 1).toFixed(2)}x
              {" "}sobre el capital comprometido.
            </div>
          </div>
        );
      })()}

      {conservanValor.length > 0 && (
        <div className="ea-panel" style={{ marginTop: 16 }}>
          <div className="ea-rot ea-dis">Lo que conservó valor</div>
          <div className="ea-invCab ea-dis">
            <span>Bien</span><span>Pagaste</span><span>Vale hoy</span><span>Resultado</span>
          </div>
          {conservanValor.map(({ c, pagado, hoy }) => {
            const dif = hoy - pagado;
            const pct = pagado > 0 ? (hoy / pagado - 1) * 100 : 0;
            return (
              <div className="ea-invF" key={c.id}>
                <span className="ea-invN">{c.n}</span>
                <span className="ea-mono">{fmt(pagado)}</span>
                <span className="ea-mono">{fmt(hoy)}</span>
                <span className="ea-mono" style={{ color: dif >= 0 ? "#4FA05C" : "var(--rojo)" }}>
                  {dif >= 0 ? "+" : "−"}{fmt(Math.abs(dif))}
                  <span className="ea-invP">{dif >= 0 ? "+" : ""}{pct.toFixed(0)}%</span>
                </span>
              </div>
            );
          })}
          <div className="ea-invT">
            <span className="ea-dis">Total</span>
            <span className="ea-mono">{fmt(totalPagado)}</span>
            <span className="ea-mono">{fmt(totalHoy)}</span>
            <span className="ea-mono" style={{ color: totalHoy >= totalPagado ? "#4FA05C" : "var(--rojo)" }}>
              {totalHoy >= totalPagado ? "+" : "−"}{fmt(Math.abs(totalHoy - totalPagado))}
            </span>
          </div>
        </div>
      )}
      {gastadoEnConsumo > 0 && (
        <div className="ea-panel" style={{ marginTop: 16 }}>
          <div className="ea-rot ea-dis">Lo que se disfrutó y no volvió</div>
          <div className="ea-mono" style={{ fontSize: 23, color: "var(--tintaPapel)" }}>USD {fmt(gastadoEnConsumo)}</div>
          <div className="ea-itemD" style={{ marginTop: 6 }}>
            {consumoN} {consumoN === 1 ? "compra" : "compras"} sin valor de reventa: viajes, carros, fiestas.
            No es dinero mal gastado por definición; es dinero que se cambió por vida en vez de por patrimonio.
            Puesto a trabajar al 7% durante los años que te quedaban, habría llegado a
            unos USD {fmt(gastadoEnConsumo * 1.9)}.
          </div>
        </div>
      )}
      <div className="ea-panel" style={{ marginTop: 16 }}>
        <div className="ea-rot ea-dis">Lo que quedó en tu expediente</div>
        {s.titulares.slice(-14).reverse().map((t, i) => (
          <div className="ea-tit" key={i}><span className="ea-titQ ea-mono">{t.q}</span><span>{t.t}</span></div>
        ))}
      </div>
      <button className="ea-btnO" style={{ marginTop: 24 }} onClick={empezar}>Vivir otra vida</button>
    </div>
  );
}
