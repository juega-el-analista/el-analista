import React, { useState } from "react";
import { numero, texto, clamp, elegirAzar } from "../motor/aritmetica.js";
import { NIVEL_N, largoExamen, armarExamen } from "../datos/catedra.js";
import { contextoDe } from "../motor/requisitos.js";

/* una pregunta solo es utilizable si tiene enunciado, al menos dos
   opciones y un índice de respuesta correcta que apunte a una de ellas */
const preguntaValida = (p) => !!(p && typeof p.q === "string" && p.q &&
  Array.isArray(p.o) && p.o.length >= 2 &&
  Number.isInteger(p.c) && p.c >= 0 && p.c < p.o.length &&
  typeof p.o[p.c] === "string");

const PREGUNTA_RESERVA = {
  q: "Tu cartera cae 30% en un año malo. ¿Qué es lo más sensato?",
  o: ["Mantener el plan y seguir aportando si tu horizonte es largo", "Vender todo y esperar la señal de entrada", "Cambiar a lo que más subió el año pasado", "Duplicar la apuesta con dinero prestado"],
  c: 0,
  e: "Vender en la caída convierte una pérdida temporal en permanente. La caída solo es definitiva para quien vende.",
  nv: 1,
};

export function JuegoQuiz({ ayuda, nivel, onFin, modo, temas }) {
  const nv = clamp(numero(nivel, 1), 1, 5);
  const total = largoExamen(nv);
  const [preg] = useState(() => {
    let crudas = [];
    try { crudas = armarExamen(nv, total, temas) || []; } catch (e) { crudas = []; }
    crudas = crudas.filter(preguntaValida);
    while (crudas.length === 0) crudas = [PREGUNTA_RESERVA];
    return crudas.map((p) => {
      const correcta = p.o[p.c];
      let ops = p.o.slice();
      if (ayuda >= 55 && ops.length > 2) {
        const malas = ops.filter((x) => x !== correcta);
        const fuera = elegirAzar(malas);
        if (fuera != null) ops = ops.filter((x) => x !== fuera);
      }
      ops = ops.sort(() => Math.random() - 0.5);
      return { q: p.q, e: texto(p.e, "", 400), ops, correcta, nv: p.nv, tema: p.tema };
    });
  });
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [ok, setOk] = useState(0);
  const [ayudas, setAyudas] = useState(0);
  const [verContexto, setVerContexto] = useState(false);
  const p = preg[Math.min(i, preg.length - 1)] || PREGUNTA_RESERVA;
  const ctx = contextoDe(p);

  const responder = (t) => {
    if (sel !== null) return;
    setSel(t);
    setOk(ok + (t === p.correcta ? 1 : 0));
  };

  const cuantas = preg.length;
  const seguir = () => {
    if (i >= cuantas - 1) {
      /* Con todas bien y sin pedir ayuda, éxito. Pedir explicación no
         se castiga con un fallo, pero sí impide el pleno: aprendiste,
         no acertaste. */
      const pleno = ok === cuantas && ayudas === 0;
      onFin(pleno ? "exito" : ok / cuantas >= 0.6 ? "parcial" : "fallo");
    } else { setI(i + 1); setSel(null); setVerContexto(false); }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Pregunta {i + 1} de {cuantas} · {(NIVEL_N[nv] || "").toLowerCase()}</span>
        <span>{"Aciertos " + ok + (ayudas > 0 ? " · " + ayudas + (ayudas === 1 ? " explicación" : " explicaciones") : "")}</span>
      </div>
      {/* El recordatorio era un bloque de cuatro lineas delante de CADA
          pregunta en modo aprendiz. Ahora es una linea con el termino, y
          se abre quien lo necesite: la ayuda sigue estando, pero deja de
          leerse cuatro veces por examen sin que nadie la pidiera. */}
      {ctx && (
        <button className="ea-recuerda ea-dis"
          onClick={() => { if (!verContexto) setAyudas(ayudas + 1); setVerContexto(!verContexto); }}>
          {verContexto ? "↑" : "↓"} Recordatorio · {ctx.t}
        </button>
      )}
      {ctx && verContexto && (
        <div className="ea-glos ea-panelAb">
          <div className="ea-glosX">{ctx.x}</div>
          {ctx.ej && <div className="ea-glosX" style={{ marginTop: 6, fontStyle: "italic" }}>{ctx.ej}</div>}
        </div>
      )}
      <p className="ea-qtxt">{p.q}</p>
      <div className="ea-ops" style={{ marginTop: 0 }}>
        {p.ops.map((t, k) => {
          let cls = "ea-op";
          if (sel !== null && t === p.correcta) cls += " ok";
          else if (sel === t) cls += " no";
          return (
            <button className={cls} key={k} disabled={sel !== null} onClick={() => responder(t)}>
              <span className="ea-opN ea-mono">{String.fromCharCode(65 + k)}</span>{t}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div>
          <div className="ea-expl">{p.e}</div>
          <button className="ea-btn" onClick={seguir}>{i >= cuantas - 1 ? "Terminar" : "Continuar"}</button>
        </div>
      )}
    </div>
  );
}
