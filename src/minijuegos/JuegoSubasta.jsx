import React, { useState } from "react";
import { numero, gauss, indiceAzar } from "../motor/aritmetica.js";

/* ---- La subasta y la maldición del ganador ----
   Rehecha (28-sep-2026). La anterior tenía un tope escondido de ocho
   rondas: a la octava subida se acababa sola y lo contaba como si te
   hubieras retirado. Empezando en 40 y subiendo 8-13 por ronda, eso te
   echaba hacia los 110 aunque tu estimación fuera 145. Además el éxito
   pedía pagar menos del 82% del valor, que casi nunca pasaba, y los
   rivales se retiraban por sorteo en vez de por un límite propio.

   Ahora es una subasta de verdad, sin tope de rondas:
     · cada rival tiene su precio máximo (del 70% al 120% del valor) y se
       retira en cuanto la oferta lo pasa. Termina sola, porque los
       límites son finitos.
     · si te retiras, la subasta sigue sin ti: gana el rival con el límite
       más alto y paga lo que marca el segundo. Tu retirada se juzga por lo
       que pagó él: si pagó de más, hiciste bien.
   Medido con 30.000 subastas (atributo 72): pujar hasta tu estimación da
   éxito ~54% y fallo ~17%; retirarse muy pronto o pujar de más, bastante
   peor. Es la maldición del ganador sin necesidad de explicarla. */
const SUB_RIVALES = ["Fondo regional", "Comprador estratégico", "Family office"];
const pasoSubasta = (valor) => Math.max(4, Math.round(valor * 0.06)) + indiceAzar(4);
const casoSubasta = (ayuda) => {
  const valor = 60 + numero(Math.random(), 0.5) * 80;
  const ruido = Math.max(3, 20 - numero(ayuda, 0) / 6);
  return {
    valor,
    estimacion: Math.max(10, Math.round(valor + ruido * gauss())),
    limites: SUB_RIVALES.map(() => valor * (0.7 + numero(Math.random(), 0.5) * 0.5)),
    inicio: Math.round(valor * 0.5),
  };
};
/* si te retiras en p: gana el de límite más alto, al precio del segundo */
const cierreRetiro = (caso, p) => {
  const vivos = caso.limites.map((m, i) => ({ m, i })).filter((x) => x.m >= p).sort((x, y) => y.m - x.m);
  if (!vivos.length) return { quien: null, final: p };
  const final = Math.round(Math.max(p, vivos.length > 1 ? vivos[1].m : p));
  return { quien: SUB_RIVALES[vivos[0].i], final };
};
const nivelSubasta = (caso, fin) => {
  if (fin.gano) { const r = fin.precio / caso.valor; return r <= 1 ? "exito" : r <= 1.1 ? "parcial" : "fallo"; }
  if (fin.final > caso.valor) return "exito";
  return fin.precio >= caso.valor * 0.9 ? "parcial" : "fallo";
};

export function JuegoSubasta({ ayuda, onFin }) {
  const [caso] = useState(() => casoSubasta(ayuda));
  const [precio, setPrecio] = useState(caso.inicio);
  const [siguiente, setSiguiente] = useState(() => caso.inicio + pasoSubasta(caso.valor));
  const [fuera, setFuera] = useState([null, null, null]);   /* precio al que se retiró cada rival */
  const [ronda, setRonda] = useState(1);
  const [fin, setFin] = useState(null);

  const subir = () => {
    if (fin) return;
    const nuevo = siguiente;
    const f = fuera.map((x, i) => (x == null && caso.limites[i] < nuevo ? nuevo : x));
    setPrecio(nuevo); setFuera(f); setRonda(ronda + 1);
    setSiguiente(nuevo + pasoSubasta(caso.valor));
    if (f.every((x) => x != null)) setFin({ gano: true, precio: nuevo });
  };
  const retirarse = () => {
    if (fin) return;
    const c = cierreRetiro(caso, precio);
    setFin({ gano: false, precio, final: c.final, quien: c.quien });
  };

  const nivel = fin ? nivelSubasta(caso, fin) : null;
  const V = Math.round(caso.valor);
  const texto = !fin ? null
    : fin.gano
      ? nivel === "exito" ? "Te la llevaste por " + fin.precio + " y valía " + V + ". Pagaste lo que vale o menos: ese es el trabajo."
        : nivel === "parcial" ? "Te la llevaste por " + fin.precio + " y valía " + V + ". Casi lo que vale: sin margen, pero sin daño."
        : "Te la llevaste por " + fin.precio + " y valía " + V + ". Ganaste la subasta y perdiste plata: eso es la maldición del ganador."
      : nivel === "exito" ? "Te retiraste en " + fin.precio + ". " + (fin.quien || "Un rival") + " se la llevó por " + fin.final + " y valía " + V + ": pagó de más. Retirarse a tiempo también es ganar."
        : nivel === "parcial" ? "Te retiraste en " + fin.precio + ". " + (fin.quien || "Un rival") + " se la llevó por " + fin.final + " y valía " + V + ". Se llevó una buena compra, pero te retiraste cerca del valor."
        : "Te retiraste en " + fin.precio + ". " + (fin.quien || "Un rival") + " se la llevó por " + fin.final + " y valía " + V + ". Dejaste ir una empresa barata: la prudencia también cuesta cuando sobra.";

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Tu estimación: {caso.estimacion} millones</span><span>Ronda {ronda}</span></div>
      <div className="ea-precio ea-mono">{precio}</div>
      <div style={{ fontSize: 12.5, color: "var(--gris)", marginBottom: 10 }}>
        Oferta sobre la mesa, en millones. Tu estimación puede fallar por arriba o por abajo.
      </div>
      {SUB_RIVALES.map((r, i) => (
        <div className={"ea-postor" + (fuera[i] == null ? "" : " fuera")} key={i}>
          <span>{r}</span><span className="ea-mono">{fuera[i] == null ? "sigue" : "se retiró en " + fuera[i]}</span>
        </div>
      ))}
      {!fin ? (
        <div className="ea-fila2">
          <button className="ea-btn" style={{ marginTop: 0, flex: 1 }} onClick={subir}>Subir a {siguiente}</button>
          <button className="ea-btn" style={{ marginTop: 0, flex: 1, background: "var(--rojo)" }} onClick={retirarse}>Retirarme</button>
        </div>
      ) : (
        <div>
          <div className={"ea-alerta " + (nivel === "exito" ? "bien" : nivel === "fallo" ? "mal" : "")}>{texto}</div>
          <button className="ea-btn" onClick={() => onFin(nivel)}>Continuar</button>
        </div>
      )}
    </div>
  );
}
