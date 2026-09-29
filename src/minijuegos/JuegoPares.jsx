import React, { useState, useEffect, useRef } from "react";
import { numero, clamp, elegirAzar } from "../motor/aritmetica.js";
import { PIZARRAS } from "../datos/minijuegos.js";
import { pulsable } from "../motor/requisitos.js";
import { COLORES_MEM } from "./JuegoMemoria.jsx";

/* ---- La pizarra del comité: pares de concepto y significado ---- */
/* Cada par lleva su color, el mismo en el concepto y en su definición:
   al destapar una ficha el color se queda en la memoria mucho mejor que
   un texto de dos palabras, y sirve de ancla para saber dónde estaba su
   pareja. Sin el rojo, que en todo el juego significa fallo, y sin el
   turquesa, que al lado del azul se confunde a simple vista. */
const COLORES_PARES = [0, 1, 3, 4, 5, 7].map((i) => COLORES_MEM[i].c);

/* Segundos con la pizarra destapada antes de empezar. Más con mejor
   atributo, para que «te ayuda» siga significando algo aquí. */
const vistaParesDe = (ayuda) => clamp(Math.round(5 + numero(ayuda, 0) / 25), 5, 9);

export function JuegoPares({ ayuda, onFin }) {
  const [pz] = useState(() => elegirAzar(PIZARRAS));
  const [fichas] = useState(() => {
    /* los colores también se barajan: que el WACC no sea siempre cobre */
    const cols = COLORES_PARES.slice().sort(() => Math.random() - 0.5);
    const arr = [];
    pz.p.forEach((par, i) => {
      const col = cols[i % cols.length];
      arr.push({ id: i + "a", par: i, t: par[0], col });
      arr.push({ id: i + "b", par: i, t: par[1], col });
    });
    return arr.sort(() => Math.random() - 0.5);
  });
  const maxErr = clamp(4 + Math.floor(ayuda / 22), 4, 8);
  const [abiertas, setAbiertas] = useState([]);
  const [hechas, setHechas] = useState([]);
  const [err, setErr] = useState(0);
  const [fin, setFin] = useState(false);
  const [cuenta, setCuenta] = useState(() => vistaParesDe(ayuda));
  const mirando = cuenta > 0;
  const bloqueo = useRef(false);

  /* la pizarra destapada, y la cuenta atrás hasta taparla */
  useEffect(() => {
    if (cuenta <= 0) return;
    const t = setTimeout(() => setCuenta((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cuenta]);

  const cerrar = (nivel) => { setFin(true); setTimeout(() => onFin(nivel), 900); };

  const tocar = (f) => {
    if (mirando || fin || bloqueo.current) return;
    if (hechas.indexOf(f.par) >= 0) return;
    if (abiertas.some((x) => x.id === f.id)) return;
    const nuevas = abiertas.concat(f);
    setAbiertas(nuevas);
    if (nuevas.length < 2) return;
    bloqueo.current = true;
    if (nuevas[0].par === nuevas[1].par) {
      setTimeout(() => {
        const h = hechas.concat(nuevas[0].par);
        setHechas(h); setAbiertas([]); bloqueo.current = false;
        if (h.length === pz.p.length) cerrar(err === 0 ? "exito" : err <= 2 ? "exito" : "parcial");
      }, 420);
    } else {
      setTimeout(() => {
        const e = err + 1;
        setErr(e); setAbiertas([]); bloqueo.current = false;
        if (e >= maxErr) cerrar(hechas.length >= pz.p.length - 2 ? "parcial" : "fallo");
      }, 750);
    }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>{mirando ? "Mira la pizarra" : pz.t}</span>
        <span>{mirando
          ? "se tapa en " + cuenta + (cuenta === 1 ? " segundo" : " segundos")
          : "Fallos " + err + " de " + maxErr}</span>
      </div>
      <div className="ea-tab4">
        {fichas.map((f) => {
          const hecha = hechas.indexOf(f.par) >= 0;
          const abierta = abiertas.some((x) => x.id === f.id);
          const vista = mirando || hecha || abierta;
          return (
            <div key={f.id} {...pulsable(() => tocar(f), vista ? f.t : "Ficha tapada", hecha || mirando)}
              className={"ea-fichaP" + (mirando ? " vista" : hecha ? " hecha" : abierta ? " abierta" : " tapada")
                + (vista ? " pintada" : "")}
              style={vista ? { background: f.col + "33", borderColor: f.col } : undefined}>
              {vista ? f.t : ""}
            </div>
          );
        })}
      </div>
      {mirando && (
        <button className="ea-mini" style={{ marginTop: 10 }} onClick={() => setCuenta(0)}>
          Ya lo miré, empezar
        </button>
      )}
      <div style={{ minHeight: 20, marginTop: 9, fontSize: 13, color: "#6B6B6B" }}>
        {fin ? (hechas.length === pz.p.length ? "Pizarra completa" : "Se acabaron los intentos")
          : mirando ? "Cada par tiene su color: el concepto y su definición se pintan igual." : ""}
      </div>
    </div>
  );
}
