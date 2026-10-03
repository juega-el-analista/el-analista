import React, { useState, useEffect, useRef } from "react";
import { numero, clamp, gauss } from "../motor/aritmetica.js";
import { Pista } from "../componentes/Iconos.jsx";

/* ---- La sesión ----
   Reescrito para que se entienda qué estás mirando. Antes decía "Dentro"
   y "Fuera" sin explicar de qué, y comparaba contra un rival invisible.
   Ahora: un cartel grande dice si tienes la acción o estás en efectivo,
   hay leyenda bajo el gráfico, y el rival contra el que compites está
   nombrado desde el primer segundo. */
export function JuegoTrading({ ayuda, onFin }) {
  const TICKS = 24;
  const RITMO = 780;
  const [serie] = useState(() => {
    const vol = clamp(0.055 - ayuda * 0.00012, 0.03, 0.055);
    const tendencia = (numero(Math.random(), 0.5) - 0.42) * 0.012;
    const arr = [100];
    for (let i = 1; i < TICKS; i++) {
      arr.push(Math.max(20, arr[i - 1] * (1 + tendencia + vol * gauss())));
    }
    return arr;
  });
  const [i, setI] = useState(0);
  const [dentro, setDentro] = useState(false);
  const [equity, setEquity] = useState(100);
  const [hist, setHist] = useState([100]);
  const [fin, setFin] = useState(false);
  const [ops, setOps] = useState(0);
  const dentroRef = useRef(false);
  useEffect(() => { dentroRef.current = dentro; }, [dentro]);

  useEffect(() => {
    if (fin) return;
    const id = setTimeout(() => {
      if (i >= TICKS - 1) { setFin(true); return; }
      const r = serie[i + 1] / serie[i] - 1;
      const nuevo = dentroRef.current ? equity * (1 + r) : equity;
      setEquity(nuevo);
      setHist((h) => h.concat(nuevo));
      setI(i + 1);
    }, RITMO);
    return () => clearTimeout(id);
  }, [i, fin, serie, equity]);

  const precio = serie[Math.min(i, TICKS - 1)];
  const bench = (precio / serie[0]) * 100;
  const mio = (equity / 100 - 1) * 100;
  const suyo = (bench / 100 - 1) * 100;
  const dif = mio - suyo;

  const path = (datos, alto, max, min) => datos.map((v, k) => {
    const x = (k / (TICKS - 1)) * 100;
    const y = alto - ((v - min) / (max - min || 1)) * alto;
    return (k === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2);
  }).join(" ");

  const vistos = serie.slice(0, i + 1);
  const todos = vistos.concat(hist);
  const max = Math.max.apply(null, todos), min = Math.min.apply(null, todos);

  return (
    <div className="ea-jw">
      <Pista>
        Una acción va a moverse durante {TICKS} momentos. Con <strong>Comprar</strong> la tienes y su subida o bajada
        te toca entera; con <strong>Vender</strong> te sales a efectivo y dejas de moverte. Compites contra alguien
        que compró al principio y no volvió a tocar nada. Ganas si terminas por encima de él.
      </Pista>

      <div className={"ea-estado " + (dentro ? "dentro" : "fuera")}>
        {dentro ? "TIENES LA ACCIÓN" : "ESTÁS EN EFECTIVO"}
      </div>

      <div className="ea-jinfo ea-dis" style={{ marginTop: 10 }}>
        <span>Momento {i + 1} de {TICKS}</span>
        <span>Precio {precio.toFixed(1)} · operaciones {ops}</span>
      </div>

      <svg className="ea-graf" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path className="ea-grafL" d={path(vistos, 60, max, min)} vectorEffect="non-scaling-stroke" />
        <path className="ea-grafD" d={path(hist, 60, max, min)} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="ea-leyenda">
        <span><i className="ea-lineaL" /> precio de la acción</span>
        <span><i className="ea-lineaD" /> tu cuenta</span>
      </div>

      <div className="ea-marcador">
        <div>
          <div className="ea-lecK">Tu cuenta</div>
          <div className="ea-mono ea-marcaV" style={{ color: mio >= 0 ? "#3D8A49" : "var(--rojo)" }}>
            {mio >= 0 ? "+" : ""}{mio.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="ea-lecK">El que compró y no tocó nada</div>
          <div className="ea-mono ea-marcaV" style={{ color: suyo >= 0 ? "#3D8A49" : "var(--rojo)" }}>
            {suyo >= 0 ? "+" : ""}{suyo.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="ea-lecK">Le llevas</div>
          <div className="ea-mono ea-marcaV" style={{ color: dif >= 0 ? "#3D8A49" : "var(--rojo)" }}>
            {dif >= 0 ? "+" : ""}{dif.toFixed(1)}
          </div>
        </div>
      </div>

      {!fin ? (
        <div className="ea-fila2">
          <button className="ea-btn" style={{ marginTop: 0, flex: 1 }}
            onClick={() => { setDentro(true); setOps(ops + 1); }} disabled={dentro}>Comprar</button>
          <button className="ea-btn" style={{ marginTop: 0, flex: 1, background: "var(--rojo)" }}
            onClick={() => { setDentro(false); setOps(ops + 1); }} disabled={!dentro}>Vender</button>
        </div>
      ) : (
        <div>
          <div className={"ea-alerta " + (dif >= 4 ? "bien" : dif >= -0.5 ? "" : "mal")}>
            Cerró la sesión. Terminaste {dif >= 0 ? "por encima" : "por debajo"} del que compró al principio
            y se fue a dormir, por {Math.abs(dif).toFixed(1)} puntos, después de {ops} {ops === 1 ? "operación" : "operaciones"}.
            {dif < 0 ? " Es el resultado más común: entrar y salir suele costar más de lo que salva." : " Que salga bien una vez no significa que se pueda repetir treinta años seguidos."}
          </div>
          <button className="ea-btn" onClick={() => onFin(dif >= 4 ? "exito" : dif >= -0.5 ? "parcial" : "fallo")}>Continuar</button>
        </div>
      )}
    </div>
  );
}
