import React from "react";
import { PanelRegistro } from "../../componentes/Registro.jsx";
import { fmt } from "../../motor/aritmetica.js";
import { edad, topeDe } from "../../motor/edad-y-metas.js";
import { RANGO } from "../../motor/reglas.js";

/* La portada: empezar una vida nueva o retomar la que quedó guardada. */
export function Portada({ ctx }) {
  const { empezar, enFase, guardado, irA, retomar } = ctx;
  return (
    <div className="ea-wrap ea-portada">
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Simulador de carrera e inversión</div>
      <h1 className="ea-h1 ea-dis">El Analista</h1>
      {/* La curva que sube, dibujandose. Es de lo que va el juego, y
          la portada era texto sobre blanco. Se dibuja con
          stroke-dashoffset, asi que no hay imagen que cargar. */}
      <svg className="ea-portadaArte" viewBox="0 0 320 96" aria-hidden="true" focusable="false">
        <line className="ea-paBase" x1="6" y1="88" x2="314" y2="88" />
        {[68, 140, 212, 284].map((x, i) => (
          <line key={i} className="ea-paTick" x1={x} y1="88" x2={x} y2="82" />
        ))}
        <path className="ea-paCurva"
          d="M10 82 C 52 80, 68 66, 96 62 S 130 72, 152 54 S 188 30, 214 34 S 252 20, 276 12 L 300 8" />
        <circle className="ea-paPunto" cx="300" cy="8" r="5.5" />
      </svg>
      <p className="ea-lede">
        Un año por turno. Decides, el mercado se mueve, y al final ves en qué quedó todo.
      </p>
      <button className="ea-atras ea-dis" style={{ marginBottom: 0, marginTop: 4 }}
        onClick={() => { if (enFase("portada")) irA("aviso"); }}>Volver a leer el aviso</button>
      <div className="ea-regla" />
      <div className="ea-cifras ea-cifrasPortada" style={{ marginBottom: 26 }}>
        <div><div className="ea-cifraK">La carrera</div><div className="ea-cifraV ea-dis">De pasante a socio</div>
          <div className="ea-cifraD">Ascensos, contratos y la opción de montar tu propia firma.</div></div>
        <div><div className="ea-cifraK">El punto de partida</div><div className="ea-cifraV ea-dis">Nunca es tarde para invertir</div>
          <div className="ea-cifraD">Empieza a los 20, 30, 40 o 50: más joven, más tiempo; más tarde, más capital y experiencia.</div></div>
        <div><div className="ea-cifraK">El objetivo</div><div className="ea-cifraV ea-dis">Independencia financiera</div>
          <div className="ea-cifraD">Que tu patrimonio cubra tu vida sin depender del sueldo.</div></div>
        <div><div className="ea-cifraK">Los imprevistos</div><div className="ea-cifraV ea-dis">Crisis, familia y fraudes</div>
          <div className="ea-cifraD">Mercados que caen, decisiones de pareja e hijos, y ofertas demasiado buenas.</div></div>
      </div>
      {guardado ? (
        <div>
          <div className="ea-guarda">
            <div className="ea-lecK" style={{ color: "var(--gris)" }}>Tienes una vida a medio camino</div>
            <div className="ea-dis" style={{ fontSize: 19, color: "var(--tintaPapel)", marginTop: 5 }}>
              {2026 + guardado.s.turno} · {edad(guardado.s.turno, guardado.s.edadIni)} años · {RANGO(guardado.s.rango).n}
            </div>
            <div className="ea-mono" style={{ fontSize: 13, color: "var(--gris)", marginTop: 3 }}>
              patrimonio USD {fmt(guardado.s.cash + guardado.s.cartera)} · año {guardado.s.turno + 1} de {topeDe(guardado.s)}
            </div>
          </div>
          <div className="ea-fila2" style={{ marginTop: 14 }}>
            <button className="ea-btnO" style={{ marginTop: 0 }} onClick={retomar}>Retomar</button>
            <button className="ea-btn" style={{ marginTop: 0, background: "transparent", border: "1px solid var(--borde)", color: "var(--tintaPapel)" }}
              onClick={empezar}>Empezar otra vida</button>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--gris)", marginTop: 8 }}>
            Empezar otra vida borra la partida guardada.
          </div>
        </div>
      ) : (
        <div>
          {/* Una sola entrada: «Jugar ya» abre la configuración (nombre,
              edad, duración, país, carrera). Hubo un atajo que lo elegía
              todo al azar; se quitó el 28-sep-2026 a pedido de Alessandro. */}
          <button className="ea-jugarYa ea-dis" onClick={empezar}>Jugar ya</button>
        </div>
      )}

      {/* Los números a batir, antes de empezar. Es el gancho: se ve
          hasta dónde llegó otra gente con las mismas reglas. */}
      <div className="ea-panel" style={{ marginTop: 30, textAlign: "left" }}>
        <PanelRegistro tope={8} titulo="Hasta dónde han llegado otros" />
        <div style={{ fontSize: 11.5, color: "var(--gris)", marginTop: 12 }}>
          Se anota al terminar una carrera. Nadie verifica nada: es un registro por confianza.
        </div>
      </div>
    </div>
  );
}
