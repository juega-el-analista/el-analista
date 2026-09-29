import React from "react";
import { fmtCorto } from "../../componentes/CaminoDelAnio.jsx";
import { Cifra } from "../../componentes/Cifra.jsx";
import { Icono } from "../../componentes/Iconos.jsx";
import { PanelCartera } from "../../componentes/PanelCartera.jsx";
import { Anillo } from "../../componentes/Stats.jsx";
import { nivelDe } from "../../datos/catedra.js";
import { ETIQ, RANGOS } from "../../datos/mercado.js";
import { TarjetaJuego } from "../../minijuegos/TarjetaJuego.jsx";
import { clamp, entero, fmt, numero } from "../../motor/aritmetica.js";
import { abierto } from "../../motor/cola-del-anio.js";
import { edad } from "../../motor/edad-y-metas.js";
import { RANGO } from "../../motor/reglas.js";
import { Cierre } from "./Cierre.jsx";
import { Evento } from "./Evento.jsx";
import { Resultado } from "./Resultado.jsx";
import { Retiro } from "./Retiro.jsx";
import { PanelCompras } from "./paneles/PanelCompras.jsx";
import { PanelFicha } from "./paneles/PanelFicha.jsx";
import { PanelFondo } from "./paneles/PanelFondo.jsx";
import { PanelVida } from "./paneles/PanelVida.jsx";

/* El año en curso: la cabecera con tus números, las pestañas y la escena que toca. */
export function Partida({ ctx }) {
  const {
    TABS, ano, aplicarCartera, apuntarJuego, apuntarTema, aviso, avisoGuia, ayudaDe, carteraPend,
    cerrarAviso, cierre, cola, estudio, ev, fase, finJuego, hitosAno, late, nacion, op,
    patrimonio, perfilN, ramaN, res, s, salarioAnual, setCarteraPend, setTab, tab,
  } = ctx;
  return (
    <div className="ea-wrap">
      <div className="ea-placa">
        <div>
          <div className="ea-nombre ea-dis">{s.nombre ? s.nombre : RANGO(s.rango).n}</div>
          {/* Antes solo se veía la formación y la bandera. Dónde trabajas
              era invisible, y es lo primero que define tu año. */}
          {/* Era una linea de texto con puntos: «Analista · Mercantil
              Praga · Venezuela». Ahora cada cosa lleva su icono, asi
              que se distingue de un vistazo donde trabajas de donde
              vives sin tener que leerlo. */}
          <div className="ea-sub ea-dis ea-quien">
            {s.nombre && <span><Icono k="escalera" tam={12} />{RANGO(s.rango).n}</span>}
            <span><Icono k="edificio" tam={12} />{s.patron || estudio.n}</span>
            <span><Icono k="pin" tam={12} />{nacion.n}</span>
            {ramaN && <span className="ea-quienRama">{ramaN}</span>}
          </div>
        </div>
        <div className="ea-reloj">
          {/* Sin «año X de Y»: saber cuándo se acaba la partida le quita
              peso a cada decisión, porque el jugador empieza a contar
              turnos en vez de vivir el año que tiene delante. */}
          <div className="ea-dis">{ano} · {edad(s.turno, s.edadIni)} años</div>
          {/* La cifra sin rotulo no se entendia: ponia «USD 6.375» y ya.
              Ahora dice que es, y el reparto entre lo que tienes a mano
              y lo que esta invertido se ve en una barra en vez de
              leerse en una linea de texto apretada. */}
          <div className="ea-patK ea-dis">Tu patrimonio</div>
          <div className={"ea-plata ea-mono" + (patrimonio < 0 ? " neg" : "") + (late ? " late" : "")}>
            USD <Cifra v={patrimonio} />
          </div>
          {abierto(s, "cartera") && (() => {
            const liq = Math.max(0, s.cash) + Math.max(0, s.cartera);
            const pEf = liq > 0 ? (Math.max(0, s.cash) / liq) * 100 : 100;
            return (
              <div className="ea-reparto">
                <div className="ea-repartoBar" aria-hidden="true">
                  <span className="ea-repEf" style={{ width: pEf.toFixed(1) + "%" }} />
                  <span className="ea-repCa" style={{ width: (100 - pEf).toFixed(1) + "%" }} />
                </div>
                <div className="ea-repartoL ea-mono">
                  <span><i className="ea-punto2 ef" />a mano {fmtCorto(s.cash)}</span>
                  <span><i className="ea-punto2 ca" />invertido {fmtCorto(s.cartera)}</span>
                </div>
              </div>
            );
          })()}
          {/* El sueldo es el número que el jugador usa para decidir; energía y
              reputación solo salen cuando están en zona de aviso, que es el
              único momento en que cambian una decisión. */}
          {/* La energia era un numero del 0 al 100 escondido en una
              linea de texto, y solo cuando ya ibas mal. Ahora es un
              rayo que se llena hasta donde llegas, siempre a la
              vista: se lee sin leer. Igual la reputacion. */}
          <div className="ea-mono ea-signos">
            <span title={"Sueldo " + fmt(salarioAnual(s)) + " al año"}>
              <Icono k="moneda" tam={13} />{fmtCorto(salarioAnual(s))} al año
            </span>
            {s.deuda > 0 && (
              <span className="mal" title={"Debes " + fmt(s.deuda)}>
                <Icono k="aviso" tam={13} />debes {fmtCorto(s.deuda)}
              </span>
            )}
          </div>
        </div>

        {/* ---- la fila de stats, a lo ancho de la placa ----
            Primero hacia donde va tu carrera, como una barra de
            experiencia: cuanto te falta para el siguiente cargo. Y
            debajo los cinco atributos, cada uno con su anillo. */}
        <div className="ea-stats">
          {(() => {
            const r = entero(s.rango, 0, 0, RANGOS.length - 1);
            const techo = RANGO(r).umbral;
            const suelo = r > 0 ? RANGO(r - 1).umbral : 0;
            const tope = techo === Infinity;
            const p = tope ? 1 : clamp((numero(s.carrera, 0) - suelo) / Math.max(1, techo - suelo), 0, 1);
            return (
              <div className="ea-xp" title={tope ? "Cargo máximo" : "Hacia " + RANGO(r + 1).n}>
                <div className="ea-xpTop ea-dis">
                  <span><Icono k="escalera" tam={12} />{RANGO(r).n}</span>
                  <span className="ea-xpSig">{tope ? "cargo máximo" : "→ " + RANGO(r + 1).n}</span>
                </div>
                <div className="ea-xpBar"><div className="ea-xpFill" style={{ width: (p * 100).toFixed(1) + "%" }} /></div>
              </div>
            );
          })()}
          <div className="ea-anillos">
            {["ene", "cri", "mod", "red", "rep"].map((k) => <Anillo key={k} k={k} v={s[k]} />)}
          </div>
        </div>
      </div>
      {fase !== "cierre" && (fase === "evento" || fase === "minijuego" || fase === "resultado") && (
        <div className="ea-cinta">
          <span className="ea-cintaK ea-dis">{ano}</span>
          {/* El año como puntos: se ve de un vistazo cuánto queda sin
              tener que leer «quedan tres situaciones este año». */}
          {(() => {
            const quedan = cola.length + (fase === "evento" || fase === "minijuego" ? 1 : 0);
            const total = Math.max(quedan, hitosAno.current.length + quedan);
            const puntos = [];
            for (let i = 0; i < Math.min(total, 8); i++) {
              puntos.push(<span key={i} className={"ea-punto" + (i < total - quedan ? " ido" : "")} />);
            }
            return <span className="ea-puntos" aria-label={"Quedan " + quedan + " situaciones este año"}>{puntos}</span>;
          })()}
          {abierto(s, "cartera") && <span>cartera {perfilN.toLowerCase()}</span>}
          {aviso && <span className="ea-avisoFlash" style={{ marginLeft: "auto", flexShrink: 0 }}>{aviso}</span>}
        </div>
      )}

      {/* La barra vive fuera del tablero y por defecto está cerrada:
          lo primero que se ve es la decisión, no la contabilidad. */}
      <div className="ea-tabs">
        {TABS.map((par) => (
          <button key={par[0]} className={"ea-tab" + (tab === par[0] ? " on" : "")}
            aria-expanded={tab === par[0] ? "true" : "false"} disabled={carteraPend && tab !== par[0]}
            onClick={() => { if (carteraPend) return; setTab(tab === par[0] ? null : par[0]); }}>{par[1]}</button>
        ))}
      </div>

      {avisoGuia && (
        <div className="ea-guia">
          <div className="ea-guiaK ea-dis">Guía</div>
          <div className="ea-guiaT ea-dis">{avisoGuia.t}</div>
          <div className="ea-guiaX">{avisoGuia.x}</div>
          <button className="ea-guiaB ea-dis" onClick={() => cerrarAviso(avisoGuia.id)}>Entendido</button>
        </div>
      )}

      <div className="ea-grid solo">
        {tab && (
        <div className="ea-modalFondo" onClick={() => { if (!carteraPend) setTab(null); }}>
          <div className="ea-modal ea-panelAb" onClick={(e) => e.stopPropagation()}>
            <div className="ea-modalCab">
              <span className="ea-modalT ea-dis">{(TABS.find((p) => p[0] === tab) || ["", ""])[1]}</span>
              <button className="ea-modalX ea-dis" disabled={carteraPend} aria-label="Cerrar la sección"
                onClick={() => { if (!carteraPend) setTab(null); }}>✕</button>
            </div>
            <div className="ea-modalCuerpo">
            <button className="ea-cerrar ea-dis" disabled={carteraPend} onClick={() => { if (!carteraPend) setTab(null); }}>
              {carteraPend ? "Aplica o descarta el cambio para volver" : "Cerrar y volver a la decisión"}
            </button>
            {tab === "ficha" && <PanelFicha ctx={ctx} />}

            {/* Tu dinero y tu fondo son la misma actividad —invertir—
                y eran dos pestañas. El fondo llega en rango 4, asi
                que hasta entonces esto es solo la cartera. */}
            {tab === "portafolio" && (
              <PanelCartera st={s} onAplicar={aplicarCartera} onPendiente={setCarteraPend} />
            )}

            {/* ---- COMPRAR: las tres listas en un solo sitio ----
                 Inmuebles, mejoras y caprichos eran tres pestañas y
                 son la misma accion: sacar dinero y cambiarlo por
                 algo. Aqui se eligen por lo que hacen, no por en que
                 menu vivian. */}
            {tab === "comprar" && <PanelCompras ctx={ctx} />}

            {/* El fondo vive dentro de Cartera: tu dinero y el dinero
                que administras son la misma actividad, y eran dos
                pestañas. Llega en rango 4, asi que hasta entonces
                Cartera es solo la cartera. */}
            {tab === "portafolio" && abierto(s, "fondo") && <PanelFondo ctx={ctx} />}

            {tab === "expediente" && <PanelVida ctx={ctx} />}
            </div>
          </div>
        </div>
        )}

        <div>
          {/* ---- las decisiones que pesan, en el centro ----
              Antes habia una tarjeta de dos segundos que anunciaba la
              escena y despues la decision volvia a salir en el mismo
              memorando de siempre: la decision EN SI seguia viendose
              como una opcion cualquiera. Ahora una oferta de trabajo,
              casarse o una legendaria se juegan enteras a pantalla
              completa. Mismo memorando, mismas opciones y mismos
              candados —un solo camino de pintado—, solo que dentro de
              un marco que se lleva la pantalla. */}
          {fase === "evento" && ev && <Evento ctx={ctx} />}

          {/* Sin memorando alrededor: la tarjeta se lleva la pantalla
              entera ella sola, en sus tres pasos. */}
          {fase === "minijuego" && op && (
            <TarjetaJuego tipo={op.juego || op.j} ayuda={ayudaDe(op)} nivel={nivelDe(s.turno, s.estudia)}
              statN={ETIQ[op.stat] || "Criterio"} onFin={finJuego} modo={s.modo}
              temas={s.temas} onTema={apuntarTema}
              visto={(Array.isArray(s.jugados) ? s.jugados : []).indexOf(op.juego || op.j) >= 0}
              onVisto={apuntarJuego} />
          )}

          {fase === "resultado" && res && <Resultado ctx={ctx} />}

          {fase === "cierre" && cierre && <Cierre ctx={ctx} />}

          {fase === "retiro" && <Retiro ctx={ctx} />}
        </div>
      </div>
    </div>
  );
}
