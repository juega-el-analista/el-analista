import React, { useState, useEffect } from "react";
import { numero, indiceAzar } from "../motor/aritmetica.js";
import { Pista } from "../componentes/Iconos.jsx";

/* ---- Peinar el legajo · memoria de trabajo ----
   Reescrito: cada casilla tiene su propio color y su propio nombre, así
   que la secuencia se recuerda como "cobre, verde, vino" y no como tres
   cuadrados grises indistinguibles. Y ahora hay tres vidas: fallar una
   vez ya no termina la partida, te repiten la secuencia y sigues. */

export const COLORES_MEM = [
  { c: "#B9532A", n: "Cobre" },
  { c: "#4FA05C", n: "Verde" },
  { c: "#B23B27", n: "Rojo" },
  { c: "#3E6B8C", n: "Azul" },
  { c: "#8C6BA8", n: "Morado" },
  { c: "#C9A227", n: "Mostaza" },
  { c: "#3F8C86", n: "Turquesa" },
  { c: "#A8556F", n: "Vino" },
  { c: "#7A6A55", n: "Arena" },
];

/* ============================================================
   PEINAR EL LEGAJO, COMO SIMON
   Antes era una sola secuencia de cuatro a siete casillas, disparada de
   golpe desde el primer momento: dificil antes de haber entendido nada.

   Ahora son tres rondas, y cada una repite la anterior ENTERA y añade al
   final. Tres casillas, despues esas mismas tres y una mas, despues esas
   cuatro y dos mas. Lo que ya memorizaste sirve en la ronda siguiente,
   que es lo que hace que se aprenda jugando en vez de fallando.
   ============================================================ */
const RONDAS_MEM = [3, 4, 6];

/* Con buen atributo se tiene una segunda oportunidad por ronda. La
   longitud de cada ronda ya no cambia con la ayuda, asi que es la forma
   de que «te ayuda Memoria 70» siga significando algo. */
const vidasMemDe = (ayuda) => (numero(ayuda, 0) >= 55 ? 2 : 1);

/* Segundos para mirar el tablero antes de que empiece a encenderse. Eran
   ocho cuando la primera secuencia ya era larga; con tres casillas de
   entrada bastan menos, y el boton de saltarla sigue ahi. */
const ESPERA_MEM = 4;

export function JuegoMemoria({ ayuda, onFin }) {
  /* La secuencia entera se decide al empezar y cada ronda enseña un trozo
     mas largo de la MISMA: por eso lo memorizado no se tira.
     Sin la misma casilla dos veces seguidas, que se lee como un parpadeo y
     no como dos pasos. El reemplazo es aritmetico y no un bucle de
     reintento: con un Math.random que devuelva siempre lo mismo —que es lo
     que prueba robustez— un «vuelve a tirar» no terminaria nunca. */
  const [seq] = useState(() => {
    const total = RONDAS_MEM[RONDAS_MEM.length - 1];
    const out = [];
    for (let i = 0; i < total; i++) {
      let c = indiceAzar(9);
      if (i > 0 && c === out[i - 1]) c = (c + 1 + indiceAzar(8)) % 9;
      out.push(c);
    }
    return out;
  });
  const VIDAS = vidasMemDe(ayuda);
  const [ronda, setRonda] = useState(0);
  const [idx, setIdx] = useState(0);
  const [on, setOn] = useState(null);
  const [modo, setModo] = useState("listo");
  const [cuenta, setCuenta] = useState(ESPERA_MEM);
  const [paso, setPaso] = useState(0);
  const [err, setErr] = useState(null);
  const [vidas, setVidas] = useState(VIDAS);
  const [aviso, setAviso] = useState(null);
  const largo = RONDAS_MEM[ronda];

  /* la espera de cortesia, solo al principio */
  useEffect(() => {
    if (modo !== "listo") return;
    if (cuenta <= 0) { setModo("ver"); return; }
    const t = setTimeout(() => setCuenta((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [modo, cuenta]);

  /* enseña la ronda, casilla por casilla */
  useEffect(() => {
    if (modo !== "ver") return;
    if (idx >= largo) {
      const t = setTimeout(() => { setModo("jugar"); setAviso(null); }, 420);
      return () => clearTimeout(t);
    }
    setOn(seq[idx]);
    const a = setTimeout(() => setOn(null), 460);
    const b = setTimeout(() => setIdx(idx + 1), 700);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [idx, modo, largo, seq]);

  /* entre ronda y ronda, un respiro y a enseñar la siguiente */
  useEffect(() => {
    if (modo !== "entre") return;
    const t = setTimeout(() => {
      setRonda((r) => r + 1); setPaso(0); setIdx(0); setOn(null); setErr(null);
      setVidas(VIDAS); setAviso(null); setModo("ver");
    }, 1000);
    return () => clearTimeout(t);
  }, [modo]);

  const tocar = (i) => {
    if (modo !== "jugar") return;
    if (i === seq[paso]) {
      const p = paso + 1;
      setPaso(p); setOn(i);
      setTimeout(() => setOn(null), 160);
      if (p >= largo) {
        if (ronda >= RONDAS_MEM.length - 1) {
          setModo("fin");
          setAviso("Las tres rondas");
          setTimeout(() => onFin("exito"), 600);
        } else {
          const extra = RONDAS_MEM[ronda + 1] - largo;
          setModo("entre");
          setAviso("Bien. Ahora " + (extra === 1 ? "una más" : extra + " más") + " al final.");
        }
      }
      return;
    }
    /* fallaste: si queda oportunidad se repite ESTA ronda, si no se acaba */
    const quedan = vidas - 1;
    setErr(i);
    setVidas(quedan);
    if (quedan <= 0) {
      setModo("fin");
      setAviso("Se acabó en la ronda " + (ronda + 1));
      /* dos rondas completas es un resultado a medias; menos, fallo */
      setTimeout(() => onFin(ronda >= 2 ? "parcial" : "fallo"), 750);
      return;
    }
    setModo("pausa");
    setAviso("Ahí no. Te repito esta ronda.");
    setTimeout(() => {
      setErr(null); setPaso(0); setIdx(0); setOn(null); setModo("ver");
    }, 950);
  };

  const rotuloModo = modo === "listo" ? "Mira el tablero"
    : modo === "ver" ? "Memoriza la secuencia"
    : modo === "jugar" ? "Repítela en el mismo orden"
    : modo === "entre" ? "Ronda superada"
    : modo === "pausa" ? "Atento" : "Listo";

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>{rotuloModo}</span>
        <span>
          {modo === "listo"
            ? "empieza en " + cuenta + (cuenta === 1 ? " segundo" : " segundos")
            : "ronda " + (ronda + 1) + " de " + RONDAS_MEM.length + " · " + paso + " de " + largo}
        </span>
      </div>

      {/* las tres rondas como puntos, y cuantas casillas trae cada una */}
      <div className="ea-memRondas">
        {RONDAS_MEM.map((n, r) => (
          <span key={r} className={"ea-memRonda" + (r < ronda ? " hecha" : r === ronda ? " ahora" : "")}>
            {n}
          </span>
        ))}
      </div>

      <Pista>
        Cada casilla tiene su color. Tres rondas: se encienden 3, luego 4 y luego 6.
        Cada ronda repite la anterior entera y añade al final, así que lo que ya
        memorizaste te sirve.
      </Pista>

      <div className="ea-celdas">
        {COLORES_MEM.map((col, i) => {
          const encendida = on === i;
          const fallada = err === i;
          return (
            <button key={i} type="button" className="ea-celdaC" onClick={() => tocar(i)}
              disabled={modo !== "jugar"} aria-label={col.n}
              style={{
                background: fallada ? "var(--rojo)" : (encendida || modo === "listo") ? col.c : col.c + "2E",
                borderColor: (encendida || fallada || modo === "listo") ? "#20120A" : col.c + "77",
                transform: encendida ? "scale(0.94)" : "none",
                boxShadow: encendida ? "0 0 18px " + col.c : "none",
              }}>
              {/* sin el nombre escrito: se memoriza el color, no la palabra */}
            </button>
          );
        })}
      </div>

      {modo === "listo" && (
        <button className="ea-mini" style={{ marginTop: 10 }}
          onClick={() => { setCuenta(0); setModo("ver"); }}>
          Ya lo miré, empezar
        </button>
      )}
      {VIDAS > 1 && (
        <div className="ea-vidas">
          {Array.from({ length: VIDAS }, (_, k) => (
            <span key={k} className={"ea-vida" + (k < vidas ? " viva" : "")} />
          ))}
        </div>
      )}
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#6B6B6B" }}>{aviso}</div>
    </div>
  );
}
