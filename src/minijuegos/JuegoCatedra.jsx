import React, { useState, useEffect, useRef } from "react";
import { numero, clamp, elegirAzar } from "../motor/aritmetica.js";
import { TEMAS } from "../datos/catedra.js";
import { Pista } from "../componentes/Iconos.jsx";

/* ---- juegos interactivos nuevos ---- */

/* ---- La clase de las siete ----
   El minijuego que faltaba: te explica un tema, con ejemplo numérico, y
   acto seguido te pregunta por él. Nada de examinar sobre cosas que el
   juego nunca se molestó en enseñar. El tema sale del nivel que te toca,
   y si ya viste todos los de tu nivel, sube o baja uno. */
export function JuegoCatedra({ ayuda, nivel, onFin, onTema }) {
  const nv = clamp(numero(nivel, 1), 1, 5);
  const [tema] = useState(() => {
    const enNivel = TEMAS.filter((x) => x.nv === nv);
    const cerca = TEMAS.filter((x) => Math.abs(x.nv - nv) <= 1);
    return elegirAzar(enNivel.length ? enNivel : cerca.length ? cerca : TEMAS) || TEMAS[0];
  });
  const [preg] = useState(() => {
    const buenas = (tema.q || []).filter((p) => p && p.q && Array.isArray(p.ops) && p.ops.indexOf(p.correcta) >= 0);
    const cuantas = ayuda >= 60 ? 2 : Math.min(3, buenas.length);
    return buenas.slice().sort(() => Math.random() - 0.5).slice(0, Math.max(1, cuantas))
      .map((p) => ({ ...p, ops: p.ops.slice().sort(() => Math.random() - 0.5) }));
  });
  const [fase, setFase] = useState("clase");
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [ok, setOk] = useState(0);

  /* Desde que se da la clase, este tema ya puede salir en un examen. */
  const avisaTema = useRef(onTema);
  avisaTema.current = onTema;
  useEffect(() => {
    if (avisaTema.current && tema && tema.id) avisaTema.current(tema.id);
  }, []);

  if (fase === "clase") {
    return (
      <div className="ea-jw">
        <div className="ea-jinfo ea-dis">
          <span>Clase · nivel {nv}</span>
          <span>{preg.length} {preg.length === 1 ? "pregunta" : "preguntas"} después</span>
        </div>
        <h3 className="ea-claseT ea-dis">{tema.n}</h3>
        <p className="ea-memoTxt">{tema.x}</p>
        <div className="ea-ej">
          <div className="ea-lecK">Con números</div>
          <div className="ea-ejX">{tema.ej}</div>
        </div>
        <Pista>
          Léelo con calma. Cuando pases de aquí ya no vuelves a ver la explicación.
        </Pista>
        <button className="ea-btn" onClick={() => setFase("quiz")}>Ya lo tengo, pregúntame</button>
      </div>
    );
  }

  const p = preg[Math.min(i, preg.length - 1)];
  const responder = (txt) => {
    if (sel !== null) return;
    setSel(txt);
    if (txt === p.correcta) setOk(ok + 1);
  };
  const seguir = () => {
    if (i >= preg.length - 1) {
      const r = ok / preg.length;
      onFin(r >= 0.999 ? "exito" : r >= 0.5 ? "parcial" : "fallo");
    } else { setI(i + 1); setSel(null); }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>{tema.n}</span>
        <span>Pregunta {i + 1} de {preg.length} · aciertos {ok}</span>
      </div>
      <p className="ea-qtxt">{p.q}</p>
      <div className="ea-ops" style={{ marginTop: 0 }}>
        {p.ops.map((txt, k) => {
          let cls = "ea-op";
          if (sel !== null && txt === p.correcta) cls += " ok";
          else if (sel === txt) cls += " no";
          return (
            <button className={cls} key={k} disabled={sel !== null} onClick={() => responder(txt)}>
              <span className="ea-opN ea-mono">{String.fromCharCode(65 + (k % 26))}</span>{txt}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div>
          <div className="ea-expl">{p.e}</div>
          <button className="ea-btn" onClick={seguir}>{i >= preg.length - 1 ? "Terminar la clase" : "Siguiente"}</button>
        </div>
      )}
    </div>
  );
}
