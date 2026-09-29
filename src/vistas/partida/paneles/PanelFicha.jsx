import React from "react";
import { fmtCorto } from "../../../componentes/CaminoDelAnio.jsx";
import { Plegable } from "../../../componentes/Stats.jsx";
import { nivelDe } from "../../../datos/catedra.js";
import { nivelDeVida } from "../../../datos/estilo-de-vida.js";
import { GLOSARIO } from "../../../datos/glosario.js";
import { sistemaPideQuieto } from "../../../hooks/movimiento.js";
import { fmt, numero } from "../../../motor/aritmetica.js";
import { statsPesos } from "../../../motor/cartera.js";
import { abierto } from "../../../motor/cola-del-anio.js";
import { tasaPrestamo, topeCredito } from "../../../motor/deuda.js";
import { edad, metaDeEdad } from "../../../motor/edad-y-metas.js";
import { GASTOS, NIVEL_GASTO, RITMO, RITMOS } from "../../../motor/estado-inicial.js";
import { RANGO } from "../../../motor/reglas.js";

/* Pestaña Ficha: tus números, el banco y los ajustes. */
export function PanelFicha({ ctx }) {
  const {
    Stat, animar, bienesVal, cobertura, estudio, gastosAnuales, impuestoDe, irA, mezclaAct,
    nacion, netoAnual, pagarDeuda, parejaTxt, patrimonio, pedirPrestamo, persistir, ponerGasto,
    ponerRitmo, ramaN, s, salarioAnual, setAnimar, setTab, vidaTotal,
  } = ctx;
  return (
    <div>
      <div className="ea-titular" style={{ marginBottom: 4 }}>
        <div className="ea-titularK ea-dis">Patrimonio</div>
        <div className="ea-titularV ea-mono" style={{ fontSize: 27 }}>USD {fmt(patrimonio)}</div>
        <div className="ea-titularL">
          <span className="ea-mono">cubre {Math.round(cobertura * 100)}% de tus gastos</span>
          {s.deuda > 0 && <span className="ea-mono" style={{ color: "#C4756A" }}>debes {fmt(s.deuda)}</span>}
        </div>
      </div>
      <div className="ea-plegs">
      <Plegable titulo="Tus atributos" resumen={"criterio " + Math.round(s.cri)}>
      <Stat k="mod" v={s.mod} /><Stat k="cri" v={s.cri} /><Stat k="red" v={s.red} /><Stat k="rep" v={s.rep} /><Stat k="ene" v={s.ene} ene />
      </Plegable>
      <Plegable titulo="Quién eres" resumen={RANGO(s.rango).n}>
      <div className="ea-fila" style={{ marginTop: 0 }}>
        <span className="ea-dis" style={{ fontSize: 12 }}>Carrera</span>
        <span className="ea-mono">{s.carrera} / {RANGO(s.rango).umbral === Infinity ? "máx" : RANGO(s.rango).umbral}</span>
      </div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Trabajas en</span><span className="ea-mono">{s.patron || "—"}</span></div>
      <div className="ea-fila">
        <span className="ea-dis" style={{ fontSize: 12 }}>Contrato</span>
        <span className="ea-mono">
          {s.propia
            ? "es tuya, no hay contrato"
            : s.contrato
            ? (() => {
                const quedan = numero(s.contrato.desde, 0) + numero(s.contrato.anos, 3) - s.turno;
                return numero(s.contrato.anos, 3) + " años · " + (quedan <= 0 ? "vencido" : "quedan " + quedan);
              })()
            : "sin contrato"}
        </span>
      </div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Origen</span><span className="ea-mono">{nacion.n}</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Formación</span><span className="ea-mono">{estudio.n}</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Rama</span><span className="ea-mono">{ramaN || "sin definir"}</span></div>
      <div className="ea-fila">
        <span className="ea-dis" style={{ fontSize: 12 }}>Vida personal</span>
        <span className="ea-mono">{parejaTxt}{s.hijos > 0 ? " · " + s.hijos + (s.hijos === 1 ? " hijo" : " hijos") : ""}</span>
      </div>
      <div className="ea-fila">
        <span className="ea-dis" style={{ fontSize: 12 }}>Tren de vida</span>
        <span className="ea-mono">{nivelDeVida(vidaTotal(s)).n.toLowerCase()}</span>
      </div>
      <div className="ea-fila">
        <span className="ea-dis" style={{ fontSize: 12 }}>Formación acumulada</span>
        <span className="ea-mono">{Math.round(s.estudia)} · temario nivel {nivelDe(s.turno, s.estudia)}</span>
      </div>
      </Plegable>
      <Plegable titulo="Tus números" resumen={"sueldo " + fmtCorto(salarioAnual(s))} abierto>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Sueldo bruto</span><span className="ea-mono">USD {fmt(salarioAnual(s))}</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Impuesto</span><span className="ea-mono">{Math.round(impuestoDe(s) * 100)}%</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Gasto anual</span><span className="ea-mono">USD {fmt(gastosAnuales)}</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Efectivo</span><span className="ea-mono">USD {fmt(s.cash)}</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cartera invertida</span><span className="ea-mono">USD {fmt(s.cartera)}</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Bienes</span><span className="ea-mono">USD {fmt(bienesVal)}</span></div>
      {s.deuda > 0 && (
        <div className="ea-fila">
          <span className="ea-dis" style={{ fontSize: 12 }}>Deuda</span>
          <span className="ea-mono" style={{ color: "var(--rojo)" }}>USD {fmt(s.deuda)} · {Math.round(tasaPrestamo(s) * 100)}%</span>
        </div>
      )}
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Patrimonio</span><span className="ea-mono">USD {fmt(patrimonio)}</span></div>
      <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cubre tus gastos</span><span className="ea-mono">{Math.round(cobertura * 100)}%</span></div>

      </Plegable>

      {/* las dos decisiones que antes no existían */}
      <Plegable titulo="Cómo vas a vivir este año"
        resumen={RITMO(s.ritmo).n.toLowerCase() + " · " + NIVEL_GASTO(s.nivelGasto).n.toLowerCase()}>
      <div className="ea-itemD" style={{ marginBottom: 9 }}>
        Las dos palancas que más pesan a lo largo de una carrera entera, y las únicas que decides tú
        todos los años. Cambian al cerrar el año.
      </div>
      <div className="ea-campoK ea-dis">Ritmo de trabajo</div>
      <div className="ea-generos">
        {RITMOS.map((x) => (
          <button key={x.id} className={"ea-mini" + (s.ritmo === x.id ? " on" : "")}
            style={{ marginTop: 0 }} onClick={() => ponerRitmo(x.id)}>{x.n}</button>
        ))}
      </div>
      <div className="ea-itemD" style={{ marginTop: 6 }}>{RITMO(s.ritmo).d}</div>
      <div className="ea-etqs">
        <span className={"ea-etq" + (RITMO(s.ritmo).car > 0 ? " act" : "")}>carrera {RITMO(s.ritmo).car >= 0 ? "+" : ""}{RITMO(s.ritmo).car} al año</span>
        <span className="ea-etq cost">energía {RITMO(s.ritmo).ene} al año</span>
      </div>

      <div className="ea-campoK ea-dis" style={{ marginTop: 16 }}>Tren de vida</div>
      <div className="ea-generos">
        {GASTOS.map((x) => (
          <button key={x.id} className={"ea-mini" + (s.nivelGasto === x.id ? " on" : "")}
            style={{ marginTop: 0 }} onClick={() => ponerGasto(x.id)}>{x.n}</button>
        ))}
      </div>
      <div className="ea-itemD" style={{ marginTop: 6 }}>{NIVEL_GASTO(s.nivelGasto).d}</div>
      <div className="ea-etqs">
        <span className={"ea-etq" + (NIVEL_GASTO(s.nivelGasto).f < 1 ? " act" : NIVEL_GASTO(s.nivelGasto).f > 1 ? " cost" : "")}>
          gasto {NIVEL_GASTO(s.nivelGasto).f === 1 ? "normal" : (NIVEL_GASTO(s.nivelGasto).f > 1 ? "+" : "−") + Math.abs(Math.round((NIVEL_GASTO(s.nivelGasto).f - 1) * 100)) + "%"}
        </span>
        <span className="ea-etq">o sea USD {fmt(gastosAnuales)} al año</span>
      </div>

      {/* la vara de medir que no existía */}
      </Plegable>
      {(() => {
        const eHoy = edad(s.turno, s.edadIni);
        const meta = metaDeEdad(eHoy);
        const sueldo = salarioAnual(s);
        const objetivo = sueldo * meta.x;
        const tengo = s.cartera + Math.max(0, s.cash);
        const razon = objetivo > 0 ? tengo / objetivo : 0;
        return (
          <Plegable titulo="Cómo vas para tu edad"
            resumen={objetivo > 0 ? Math.round(razon * 100) + "% de la referencia" : "—"}
            tono={razon >= 1 ? "#4FA05C" : razon >= 0.5 ? "#B9532A" : "#B23B27"}>
            <div className="ea-itemD" style={{ marginBottom: 7 }}>
              La referencia habitual dice que a los {meta.e} conviene tener {meta.x} {meta.x === 1 ? "vez" : "veces"} tu
              sueldo anual invertido. No es una ley: es una vara para saber si vas o no vas.
            </div>
            <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Referencia a los {meta.e}</span><span className="ea-mono">USD {fmt(objetivo)}</span></div>
            <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Tienes invertido y líquido</span><span className="ea-mono">USD {fmt(tengo)}</span></div>
            <div className="ea-medidor">
              <div className="ea-medidorF" style={{ width: (Math.min(1, Math.max(0, razon)) * 100).toFixed(1) + "%" }} />
            </div>
            <div className="ea-itemD" style={{ marginTop: 6, color: razon >= 1 ? "var(--verde)" : razon >= 0.5 ? "var(--cobre)" : "var(--rojo)" }}>
              {meta.aun
                ? "Todavía no te toca esta vara: la primera referencia es a los treinta. Lo que hagas ahora es lo que la hará fácil."
                : razon >= 1 ? "Vas por delante de la referencia. Sigue y no subas el tren de vida por costumbre."
                : razon >= 0.5 ? "Vas por detrás, y a tiempo. Cada punto de tasa de ahorro cierra esa distancia más rápido que cualquier acierto en el mercado."
                : "Vas bastante por detrás. Lo que mueve esto no es el retorno: es cuánto de lo que entra no se gasta."}
            </div>
          </Plegable>
        );
      })()}

      {/* Con el retomar automático el jugador ya no pasa por la
          portada, así que hace falta una puerta de vuelta. No
          borra nada: la partida queda guardada. */}
      {/* El movimiento, encendible a mano. Windows con los
          efectos de animacion apagados le dice a Chrome que
          quiere menos movimiento, y eso apagaba el rodillo
          del cierre y las cifras que cuentan sin que hubiera
          forma de encenderlos. */}
      <Plegable titulo="Movimiento"
        resumen={animar === true ? "encendido" : animar === false ? "apagado" : (sistemaPideQuieto() ? "lo apaga tu sistema" : "sigue a tu sistema")}>
        <div className="ea-itemD" style={{ marginBottom: 8 }}>
          Las cifras que cuentan y el rodillo del cierre de año. Por defecto el juego hace lo
          que pida tu sistema{sistemaPideQuieto() ? ", y el tuyo los está apagando" : ""}.
          Se queda puesto para todas tus partidas.
        </div>
        <div className="ea-generos">
          {[[null, "Como mi sistema"], [true, "Encendido"], [false, "Apagado"]].map((par) => (
            <button key={String(par[0])} style={{ marginTop: 0 }}
              className={"ea-mini" + (animar === par[0] ? " on" : "")}
              onClick={() => setAnimar(par[0])}>{par[1]}</button>
          ))}
        </div>
      </Plegable>

      {/* El diccionario era una pestaña fija. Es una
          consulta, no una accion: vive aqui dentro y se
          abre cuando hace falta. */}
      <Plegable titulo="El diccionario" resumen={Object.keys(GLOSARIO).length + " palabras"}>
        <div className="ea-itemD" style={{ marginBottom: 10 }}>
          Todas las palabras que usa el juego, sin jerga.
        </div>
        {Object.keys(GLOSARIO).map((k) => (
          <div className="ea-item" key={k}>
            <div className="ea-itemN">{GLOSARIO[k].n}</div>
            <div className="ea-itemD">{GLOSARIO[k].x}</div>
          </div>
        ))}
      </Plegable>

      <button className="ea-cerrar ea-dis" style={{ marginBottom: 14, marginTop: 14 }}
        onClick={() => { persistir(s, true); setTab(null); irA("portada"); }}>
        Guardar y volver a la portada
      </button>

      {(abierto(s, "banco") || s.deuda > 0) && (
      <Plegable titulo="El banco"
        resumen={s.deuda > 0 ? "debes " + fmtCorto(s.deuda) : "sin deuda"}
        tono={s.deuda > 0 ? "#B23B27" : "#4FA05C"}>
      {s.quiebras > 0 && (
        <div className="ea-itemD" style={{ marginBottom: 8, color: "var(--rojo)" }}>
          Has quebrado {s.quiebras === 1 ? "una vez" : s.quiebras + " veces"}. Eso encarece cada dólar que pidas
          {s.vetoCredito > 0 ? " y todavía no te prestan: faltan " + s.vetoCredito + (s.vetoCredito === 1 ? " año" : " años") + "." : "."}
        </div>
      )}
      {s.deuda > 0 ? (
        <div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Debes</span><span className="ea-mono" style={{ color: "var(--rojo)" }}>USD {fmt(s.deuda)}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Te cuesta al año</span><span className="ea-mono">USD {fmt(s.deuda * tasaPrestamo(s))} · {Math.round(tasaPrestamo(s) * 100)}%</span></div>
          <div className="ea-itemD" style={{ marginTop: 6 }}>
            Tu cartera espera rendir {Math.round(statsPesos(mezclaAct).mu * 100)}%. Mientras la deuda cueste más que eso,
            pagarla es la mejor inversión disponible, y sin riesgo.
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 8 }}>
            <button className="ea-mini" disabled={s.cash < 50} onClick={() => pagarDeuda(Math.min(s.deuda, s.cash * 0.5))}>Pagar la mitad de tu efectivo</button>
            <button className="ea-mini" disabled={s.cash < 50} onClick={() => pagarDeuda(Math.min(s.deuda, s.cash))}>Pagar todo lo que puedas</button>
          </div>
        </div>
      ) : (
        <div className="ea-itemD">No debes nada. Es una posición más valiosa de lo que parece.</div>
      )}
      {(() => {
        const tope = topeCredito(s, netoAnual(s), bienesVal);
        if (tope < 100) {
          return <div className="ea-itemD" style={{ marginTop: 10 }}>Ahora mismo no te prestarían más.</div>;
        }
        return (
          <div style={{ marginTop: 12 }}>
            <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Te prestarían hasta</span><span className="ea-mono">USD {fmt(tope)}</span></div>
            <div className="ea-itemD" style={{ marginTop: 4 }}>
              Al {Math.round(tasaPrestamo(s) * 100)}% anual. Pedir prestado no es un error por sí solo: lo es pedirlo
              para algo que no rinde más que la tasa.
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 8 }}>
              <button className="ea-mini" onClick={() => pedirPrestamo(tope * 0.25)}>Pedir {fmt(tope * 0.25)}</button>
              <button className="ea-mini" onClick={() => pedirPrestamo(tope * 0.5)}>Pedir {fmt(tope * 0.5)}</button>
              <button className="ea-mini" onClick={() => pedirPrestamo(tope)}>Pedir el máximo</button>
            </div>
          </div>
        );
      })()}
      </Plegable>
      )}
      </div>
    </div>
  );
}
