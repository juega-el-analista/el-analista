import React, { useState } from "react";
import { elegirAzar } from "../motor/aritmetica.js";
import { BANDERAS } from "../datos/paises.js";

/* ---- Banderas rojas ----
   Reescrito. Los tres cambios que importan:
   · cada línea, la marques o no, explica al final por qué era o no era
     una bandera roja. Antes solo se pintaba de verde y el jugador se
     quedaba igual de ciego que al empezar.
   · el resultado distingue tres cosas distintas: las que cazaste, las
     que se te pasaron y las que marcaste de más. No es lo mismo fallar
     por no ver un problema que por ver problemas donde no los hay.
   · en modo aprendiz se dice antes de empezar qué tipo de cosa buscar,
     porque a quien nunca ha leído unos estados financieros no se le
     puede pedir que adivine el criterio. */
export function JuegoBanderas({ ayuda, onFin, modo }) {
  const CUANTAS = 3;
  const [caso] = useState(() => {
    const b = elegirAzar(BANDERAS) || BANDERAS[0];
    /* con criterio alto se descartan señuelos, y se dice cuántos */
    const quitar = ayuda >= 65 ? 2 : ayuda >= 45 ? 1 : 0;
    const malas = (b.mal || []).map((x, i) => ({ ...x, id: "m" + i, roja: true }));
    const buenas = (b.ok || []).map((x, i) => ({ ...x, id: "b" + i, roja: false }))
      .sort(() => Math.random() - 0.5).slice(0, Math.max(2, 5 - quitar));
    return {
      t: b.t, doc: b.doc, pista: b.pista, quitar,
      lista: malas.concat(buenas).sort(() => Math.random() - 0.5),
    };
  });
  const [sel, setSel] = useState([]);
  const [rev, setRev] = useState(false);

  const marcada = (it) => sel.indexOf(it.id) >= 0;
  const marcar = (it) => {
    if (rev) return;
    if (marcada(it)) setSel(sel.filter((y) => y !== it.id));
    else if (sel.length < CUANTAS) setSel(sel.concat(it.id));
  };

  const rojas = caso.lista.filter((x) => x.roja);
  const cazadas = rojas.filter(marcada);
  const perdidas = rojas.filter((x) => !marcada(x));
  const falsas = caso.lista.filter((x) => !x.roja && marcada(x));
  const aciertos = cazadas.length;

  const veredicto = aciertos === CUANTAS
    ? "Las tres. Levantaste exactamente lo que había que levantar y no te inventaste problemas donde no los había."
    : aciertos === CUANTAS - 1
      ? "Dos de tres. Suficiente para que el asunto escale, y la que se te pasó es de las que salen caras."
      : aciertos === 1
        ? "Solo una. Con este informe la operación sigue adelante creyendo que está limpia."
        : "Ninguna. Marcaste ruido operativo y dejaste pasar los tres problemas de verdad.";

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Marcadas {sel.length} de {CUANTAS}</span>
        <span>{caso.quitar > 0 ? "Tu criterio descartó " + caso.quitar + (caso.quitar === 1 ? " señuelo" : " señuelos") : "Sin descartes"}</span>
      </div>

      {caso.doc && (
        <div className="ea-docK ea-dis">Sobre la mesa · {caso.doc}</div>
      )}
      <p className="ea-qtxt" style={{ marginTop: 8 }}>{caso.t}</p>

      {modo === "aprendiz" && caso.pista && !rev && (
        <div className="ea-glos">
          <div className="ea-glosK">Qué estás buscando</div>
          <div className="ea-glosX">{caso.pista}</div>
        </div>
      )}

      <div className="ea-ops" style={{ marginTop: 12 }}>
        {caso.lista.map((it) => {
          let cls = "ea-check";
          if (rev) cls += it.roja ? " bien" : marcada(it) ? " mal" : "";
          else if (marcada(it)) cls += " sel";
          return (
            <button className={cls} key={it.id} disabled={rev} onClick={() => marcar(it)}>
              <span className="ea-checkB ea-mono">{marcada(it) ? "X" : "·"}</span>
              <span>
                {it.t}
                {rev && (
                  <span className="ea-checkX">
                    <span className={"ea-checkR ea-dis" + (it.roja ? " roja" : "")}>
                      {it.roja
                        ? (marcada(it) ? "Bandera roja · la viste" : "Bandera roja · se te pasó")
                        : (marcada(it) ? "No lo era · la marcaste de más" : "No lo era")}
                    </span>
                    {it.x}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {!rev ? (
        <button className="ea-btn" disabled={sel.length < CUANTAS} onClick={() => setRev(true)}>Entregar el informe</button>
      ) : (
        <div>
          <div className={"ea-alerta " + (aciertos === CUANTAS ? "bien" : aciertos === CUANTAS - 1 ? "" : "mal")}>
            {veredicto}
          </div>
          <div className="ea-tabla" style={{ marginTop: 10 }}>
            <span className="ea-td">Banderas que cazaste</span><span className="ea-tdn ea-mono">{cazadas.length} de {CUANTAS}</span>
            <span className="ea-td">Se te pasaron</span><span className="ea-tdn ea-mono">{perdidas.length}</span>
            <span className="ea-td">Marcaste de más</span><span className="ea-tdn ea-mono">{falsas.length}</span>
          </div>
          {falsas.length > 0 && (
            <div className="ea-expl">
              Marcar de más también cuesta: en una operación real, levantar tres alarmas falsas quema tu
              credibilidad para el día que la alarma sea verdadera.
            </div>
          )}
          <button className="ea-btn" onClick={() => onFin(aciertos === CUANTAS ? "exito" : aciertos === CUANTAS - 1 ? "parcial" : "fallo")}>Continuar</button>
        </div>
      )}
    </div>
  );
}
