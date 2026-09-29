import React from "react";
import { CLASE_ESCENA, Icono } from "../../componentes/Iconos.jsx";
import { Marco } from "../../componentes/Stats.jsx";
import { ETIQ } from "../../datos/mercado.js";
import { ICONO_ATRIB, JUEGO, efectosDe, fuerzaDe } from "../../motor/reglas.js";
import { faltaDe } from "../../motor/requisitos.js";

/* La escena del año: el memorando con sus opciones. */
export function Evento({ ctx }) {
  const { ano, ayudaDe, carteraPend, elegir, ev, opcionesDe, pesada, resolverEscena, s } = ctx;
  const cl = CLASE_ESCENA(ev);
  return (
  <Marco drama={pesada(ev)} tono={cl.c} ico={cl.k} clase={cl.n} ano={ano}>
  <div className={"ea-memo ea-memo-" + cl.k + (pesada(ev) ? " ea-memoDrama" : "")} key={ev.id}>
    <div className={"ea-memoHead ea-dis" + (ev.legendaria ? " clave legend" : ev.clave ? " clave" : "")}>
      <span>{cl.n}</span><span>{ano}</span>
    </div>
    {/* El sello de la clase de escena: entra girando y se
        asienta. Es lo que hace que un dia de oficina y la
        decision que parte tu carrera no se vean igual. */}
    <div className="ea-selloClase" style={{ color: cl.c }}>
      <Icono k={cl.k} tam={30} />
    </div>
    <h2 className="ea-memoTit ea-dis">{ev.t}</h2>
    <p className="ea-memoTxt">{ev.x}</p>
    <div className="ea-ops">
      {/* Una sola linea de letra chica por opcion. Antes cada
          opcion podia arrastrar cuatro: el minijuego con su tema,
          la ayuda, la rama y el efecto. Debajo de una frase de
          una linea, eso es mas metadato que decision. */}
      {(() => {
        const ops = opcionesDe(ev);
        let faltas = ops.map((o) => { try { return faltaDe(o, s); } catch (e) { return null; } });
        /* El guardarrail. Si TODAS quedaran bloqueadas el
           jugador se queda encerrado en la escena, asi que
           en ese caso se abren todas: quedarse sin energia
           encarece la vida, no la termina. */
        if (faltas.length && faltas.every(Boolean)) faltas = faltas.map(() => null);
        return ops.map((o, i) => {
          const tipo = o.juego || o.j;
          const efs = efectosDe(o);
          const falta = faltas[i];
          const bits = [];
          if (tipo) bits.push(JUEGO(tipo).n + " · te ayuda " + (ETIQ[o.stat] || "Criterio") + " " + Math.round(ayudaDe(o)));
          return (
            <button className={"ea-op" + (falta ? " sinfuerza" : "")} key={i}
              style={{ "--i": i }}
              disabled={carteraPend || !!falta}
              title={falta ? "Te falta " + (ETIQ[falta.k] || falta.k).toLowerCase() : undefined}
              onClick={() => elegir(o)}>
              <span className="ea-opN ea-mono">{String.fromCharCode(65 + (i % 26))}</span>{o.t}
              {o.req && !falta && <span className="ea-opSolo ea-dis">solo tú</span>}
              {/* Con el nombre del atributo, no solo el icono:
                  esto es un «por qué no puedo hacer esto» y
                  ahí no se adivina. */}
              {falta && (
                <span className="ea-opCandado ea-dis">
                  <Icono k="candado" tam={12} />
                  {(ETIQ[falta.k] || falta.k)} {falta.tengo} de {falta.hace}
                </span>
              )}
              {/* Lo que gana y lo que cuesta, en simbolos:
                  un rayo con su cifra se lee de un vistazo
                  y «cuesta energía» hay que leerlo. */}
              {efs.length > 0 && (
                <span className="ea-efs">
                  {efs.map((e, n) => {
                    const fuerza = fuerzaDe(e.k, e.v);
                    const signo = (e.v > 0 ? "+" : "−").repeat(fuerza);
                    return (
                      <span key={n} className={"ea-ef " + (e.v > 0 ? "pos" : "neg")}
                        title={(ETIQ[e.k] || e.k) + ", " + (e.v > 0 ? "sube" : "baja")
                          + " " + (fuerza === 3 ? "mucho" : fuerza === 2 ? "bastante" : "un poco")}>
                        <span className="ea-efS ea-mono" aria-hidden="true">{signo}</span>
                        <Icono k={ICONO_ATRIB[e.k]} tam={13} />
                      </span>
                    );
                  })}
                </span>
              )}
              {bits.length > 0 && <span className="ea-opTag">{bits.join(" · ")}</span>}
            </button>
          );
        });
      })()}
      {opcionesDe(ev).length === 0 && (
        <button className="ea-op" onClick={() => resolverEscena({ msg: "El asunto se resolvió sin que te tocara decidir." }, "parcial", null)}>
          <span className="ea-opN ea-mono">A</span>Dejar que siga su curso
        </button>
      )}
    </div>
  </div>
  </Marco>
  );
}
