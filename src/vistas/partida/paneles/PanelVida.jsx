import React from "react";
import { TEMAS } from "../../../datos/catedra.js";
import { NIVELES_VIDA, TOPE_VIDA } from "../../../datos/estilo-de-vida.js";
import { PREMIO_DE } from "../../../datos/premios.js";
import { fmt, numero } from "../../../motor/aritmetica.js";
import { RANGO } from "../../../motor/reglas.js";

/* Pestaña Vida: familia, bienes y el expediente. */
export function PanelVida({ ctx }) {
  const {
    costoHijos, gastosAnuales, indiceVida, mantenimientoAnual, netoDelAno, nivelVida, parejaTxt,
    pesoTren, s, setGrupo, setTab,
  } = ctx;
  return (
    <div>
      {/* ---- cómo vives: el índice, pero legible ---- */}
      <div className="ea-rot ea-dis">Cómo vives</div>
      <div className="ea-vidaCab">
        <div>
          <div className="ea-vidaN ea-dis">{nivelVida.n}</div>
          <div className="ea-vidaD">{nivelVida.d}</div>
        </div>
        {/* el índice a solas no dice nada: va con su tope y su nombre */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div className="ea-vidaCifra ea-mono">
            {indiceVida}<span style={{ fontSize: 15, color: "var(--gris)" }}> de {TOPE_VIDA}</span>
          </div>
          <div className="ea-dis" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--gris)", marginTop: 5 }}>
            ÍNDICE DE TREN DE VIDA
          </div>
        </div>
      </div>

      {/* el medidor, con las marcas de cada escalón para que se vea
          cuánto falta para el siguiente y cuánto llevas */}
      <div className="ea-medidor">
        <div className="ea-medidorF" style={{ width: (Math.min(1, indiceVida / TOPE_VIDA) * 100).toFixed(1) + "%" }} />
        {NIVELES_VIDA.slice(1).map((x) => (
          <div key={x.min} className="ea-medidorT" style={{ left: (Math.min(1, x.min / TOPE_VIDA) * 100).toFixed(1) + "%" }} />
        ))}
      </div>
      <div className="ea-medidorE">
        {NIVELES_VIDA.map((x) => (
          <span key={x.min} className={x.n === nivelVida.n ? "on" : ""}>{x.n}</span>
        ))}
      </div>

      {/* ---- lo que cuesta vivir así ---- */}
      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Lo que cuesta</div>
      <div className="ea-fila">
        <span style={{ fontSize: 12.5 }}>Tu tren de vida al año</span>
        <span className="ea-mono">USD {fmt(gastosAnuales)}</span>
      </div>
      <div className="ea-fila">
        <span style={{ fontSize: 12.5 }}>Mantenimiento de lo que tienes</span>
        <span className="ea-mono">USD {fmt(mantenimientoAnual)}</span>
      </div>
      {s.hijos > 0 && (
        <div className="ea-fila">
          <span style={{ fontSize: 12.5 }}>{s.hijos === 1 ? "Tu hijo" : "Tus " + s.hijos + " hijos"}</span>
          <span className="ea-mono">USD {fmt(costoHijos)}</span>
        </div>
      )}
      <div className="ea-fila">
        <span style={{ fontSize: 12.5 }}>Te queda después de impuestos</span>
        <span className="ea-mono">USD {fmt(netoDelAno)}</span>
      </div>
      <div className="ea-fila">
        <span className="ea-dis" style={{ fontSize: 12 }}>Se lleva</span>
        <span className="ea-mono" style={{ color: pesoTren > 0.95 ? "var(--rojo)" : pesoTren > 0.75 ? "var(--cobre)" : "var(--verde)" }}>
          {Math.round(pesoTren * 100)}% de lo que entra
        </span>
      </div>
      <div className="ea-itemD" style={{ marginTop: 8 }}>
        {pesoTren > 0.95
          ? "Gastas más de lo que ganas. Cada año que sigas así se financia vendiendo cartera, y esa es la forma más silenciosa de no llegar nunca."
          : pesoTren > 0.75
            ? "Te queda algo, pero poco. Subir un escalón más de tren de vida aquí significa dejar de acumular."
            : "Tienes margen real para ahorrar. Es exactamente el momento en que la mayoría lo gasta."}
      </div>
      <div className="ea-itemD" style={{ marginTop: 6 }}>
        Cada punto de índice sube tu meta de independencia: necesitas 25 veces tu gasto anual,
        o sea USD {fmt(gastosAnuales * 25)}. Vivir mejor es legítimo; solo conviene saber lo que mueve la meta.
      </div>

      {/* ---- tu gente ---- */}
      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Tu gente</div>
      <div className="ea-fila">
        <span style={{ fontSize: 12.5 }}>Pareja</span>
        <span className="ea-mono">{parejaTxt}</span>
      </div>
      <div className="ea-fila">
        <span style={{ fontSize: 12.5 }}>Hijos</span>
        <span className="ea-mono">{s.hijos}</span>
      </div>
      <div className="ea-itemD" style={{ marginTop: 6 }}>
        Esto no se compra en ninguna lista: sale de lo que decides cuando la vida te lo pregunta.
        Y sí cambia los números, para bien y para mal.
      </div>

      {/* Los caprichos se mudaron a Comprar, con los
          inmuebles y las mejoras: las tres eran la misma
          accion en tres pestañas distintas. Aqui queda el
          atajo, que es donde uno mira su tren de vida y
          piensa en subirlo. */}
      <button className="ea-comprar ea-dis" style={{ marginTop: 18 }}
        onClick={() => { setGrupo("caprichos"); setTab("comprar"); }}>
        Comprar algo para ti
      </button>

      {/* ---- el legado: premios ---- */}
      {(Array.isArray(s.premios) ? s.premios : []).length > 0 && (
        <div>
          <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Tu nombre</div>
          {s.premios.map((id) => {
            const p = PREMIO_DE(id);
            if (!p) return null;
            return (
              <div className="ea-item" key={id}>
                <div className="ea-itemTop">
                  <span className="ea-itemN">{p.n}</span>
                  <span className="ea-etq act" style={{ flexShrink: 0 }}>{p.mundial ? "mundial" : "nacional"}</span>
                </div>
                <div className="ea-itemD">{p.x}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---- lo que aprendiste ---- */}
      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>De qué aprendiste</div>
      {(Array.isArray(s.temas) ? s.temas : []).length === 0 ? (
        <div className="ea-itemD">Todavía no has dado ninguna clase. Aparecen cuando te toca una cátedra.</div>
      ) : (
        <div>
          <div className="ea-itemD" style={{ marginBottom: 8 }}>
            {s.temas.length} {s.temas.length === 1 ? "tema dado" : "temas dados"}. De estos, y solo de
            estos, te puede examinar el juego.
          </div>
          <div className="ea-etqs">
            {s.temas.map((id) => {
              const t = TEMAS.find((x) => x.id === id);
              return t ? <span className="ea-etq" key={id}>{t.n}</span> : null;
            })}
          </div>
        </div>
      )}

      {/* ---- el mejor año, el peor, y las caídas ---- */}
      {(() => {
        const h = Array.isArray(s.histo) ? s.histo : [];
        let mejor = null, peor = null;
        for (let i = 1; i < h.length; i++) {
          const dif = numero(h[i], 0) - numero(h[i - 1], 0);
          if (!mejor || dif > mejor.dif) mejor = { dif, ano: 2026 + i - 1 };
          if (!peor || dif < peor.dif) peor = { dif, ano: 2026 + i - 1 };
        }
        const caidas = [];
        if (s.burnouts > 0) caidas.push(s.burnouts + (s.burnouts === 1 ? " parón por agotamiento" : " parones por agotamiento"));
        if (s.despidos > 0) caidas.push(s.despidos + (s.despidos === 1 ? " despido" : " despidos"));
        if (s.quiebras > 0) caidas.push(s.quiebras + (s.quiebras === 1 ? " quiebra" : " quiebras"));
        if (s.embargos > 0) caidas.push(s.embargos + (s.embargos === 1 ? " embargo" : " embargos"));
        if (!mejor && !caidas.length) return null;
        return (
          <div>
            <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Los años que se recuerdan</div>
            <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cargo alcanzado</span><span className="ea-mono">{RANGO(s.rango).n}</span></div>
            {mejor && mejor.dif > 0 && (
              <div className="ea-fila">
                <span className="ea-dis" style={{ fontSize: 12 }}>Tu mejor año</span>
                <span className="ea-mono" style={{ color: "#4FA05C" }}>{mejor.ano} · +USD {fmt(mejor.dif)}</span>
              </div>
            )}
            {peor && peor.dif < 0 && (
              <div className="ea-fila">
                <span className="ea-dis" style={{ fontSize: 12 }}>El año que dolió</span>
                <span className="ea-mono" style={{ color: "var(--rojo)" }}>{peor.ano} · −USD {fmt(Math.abs(peor.dif))}</span>
              </div>
            )}
            <div className="ea-fila">
              <span className="ea-dis" style={{ fontSize: 12 }}>Caídas</span>
              <span className="ea-mono">{caidas.length ? caidas.join(" · ") : "ninguna"}</span>
            </div>
          </div>
        );
      })()}

      {/* ---- el expediente ---- */}
      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Lo que quedó en tu expediente</div>
      {s.titulares.length === 0 && <div className="ea-itemD">Todavía no ha pasado nada digno de archivo.</div>}
      {s.titulares.slice(-18).reverse().map((t, i) => (
        <div className="ea-tit" key={i}><span className="ea-titQ ea-mono">{t.q}</span><span>{t.t}</span></div>
      ))}
    </div>
  );
}
