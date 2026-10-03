import React, { useState, useEffect, useRef } from "react";
import { ACTIVOS, EFECTIVO_MU } from "../datos/mercado.js";
import { numero, clamp, fmt } from "../motor/aritmetica.js";
import { PERFILES } from "../datos/carreras.js";
import {
  statsPesos,
  invertidoDe,
  ajustarPesos,
  rotacion,
  concentracion,
  COSTO_CAMBIO,
} from "../motor/cartera.js";

export function PanelCartera({ st, onAplicar, onPendiente }) {
  const actual = st.pesos || PERFILES[0].w;
  const objAct = st.objetivo == null ? 0.7 : st.objetivo;
  const [w, setW] = useState(() => ({ ...actual }));
  const [obj, setObj] = useState(objAct);
  /* el reparto activo por activo, plegado salvo que lo pidas */
  const [avanzado, setAvanzado] = useState(false);
  /* y las cinco medidas de riesgo que no se miran para decidir */
  const [detalle, setDetalle] = useState(false);
  /* si la cartera cambia por otra via (un evento, retomar partida), los
     controles se ponen al dia solos en vez de quedar mostrando lo viejo */
  const huella = JSON.stringify(actual) + "|" + objAct;
  const huellaAnt = useRef(huella);
  useEffect(() => {
    if (huellaAnt.current === huella) return;
    huellaAnt.current = huella;
    setW({ ...actual });
    setObj(objAct);
  }, [huella]);

  const liq = st.cash + st.cartera;
  const ef = Math.max(0, 1 - invertidoDe(w));
  const mezcla = { ...w, efectivo: ef };
  const est = statsPesos(mezcla);
  const conAct = { ...actual, efectivo: Math.max(0, 1 - invertidoDe(actual)) };
  const rot = rotacion(conAct, mezcla);
  const movObj = Math.abs(liq * obj - st.cartera);
  const costo = st.cartera * rot * COSTO_CAMBIO + movObj * COSTO_CAMBIO * 0.5;
  const cambio = rot > 0.005 || Math.abs(obj - objAct) > 0.005;
  const conc = concentracion(w);
  const beta = ACTIVOS.reduce((a, x) => a + (w[x.k] || 0) * x.b, 0);
  let sdSuma = 0;
  ACTIVOS.forEach((a) => { sdSuma += (w[a.k] || 0) * a.sd; });
  const ahorra = sdSuma > 0 ? 1 - est.sd / sdSuma : 0;
  const sharpe = est.sd > 0 ? (est.mu - EFECTIVO_MU) / est.sd : 0;
  const preset = PERFILES.find((x) => rotacion(x.w, mezcla) < 0.02);

  /* Lo que se ve AHORA MISMO, que no es lo mismo que el objetivo: el
     reparto se aplica al cerrar el año y después los gastos salen del
     efectivo, así que durante el año la parte invertida queda por encima
     de la que pediste. Esa diferencia confundía y ahora se explica. */
  const invReal = liq > 0 ? clamp(st.cartera / liq, 0, 1) : 0;
  const desvia = Math.abs(invReal - objAct) > 0.03;

  /* El motor necesita saber que hay cambios a medias para no dejar
     avanzar el año y perderlos por el camino. */
  const avisar = useRef(onPendiente);
  avisar.current = onPendiente;
  useEffect(() => {
    if (avisar.current) avisar.current(cambio);
  }, [cambio]);
  useEffect(() => () => { if (avisar.current) avisar.current(false); }, []);

  return (
    <div>
      <div className="ea-rot ea-dis">Cómo está repartido ahora mismo</div>
      <div className="ea-mix">
        <div className="ea-mixSeg cart" style={{ width: (invReal * 100).toFixed(1) + "%" }}>
          {invReal >= 0.16 ? "cartera " + Math.round(invReal * 100) + "%" : ""}
        </div>
        <div className="ea-mixSeg efe" style={{ width: ((1 - invReal) * 100).toFixed(1) + "%" }}>
          {1 - invReal >= 0.16 ? "efectivo " + Math.round((1 - invReal) * 100) + "%" : ""}
        </div>
      </div>
      <div className="ea-fila"><span style={{ fontSize: 12.5 }}>En la cartera</span><span className="ea-mono">USD {fmt(st.cartera)}</span></div>
      <div className="ea-fila"><span style={{ fontSize: 12.5 }}>En efectivo</span><span className="ea-mono">USD {fmt(st.cash)}</span></div>
      {desvia && (
        <div className="ea-itemD">
          Va {invReal > objAct ? "por encima" : "por debajo"} de tu objetivo. Es normal: los gastos del año
          salen del efectivo. Al cerrar el año se acomoda solo.
        </div>
      )}

      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Tu objetivo: cuánto de tu dinero trabaja</div>
      <div className="ea-mix">
        <div className="ea-mixSeg cart" style={{ width: (obj * 100).toFixed(1) + "%" }}>
          {obj >= 0.16 ? "cartera " + Math.round(obj * 100) + "%" : ""}
        </div>
        <div className="ea-mixSeg efe" style={{ width: ((1 - obj) * 100).toFixed(1) + "%" }}>
          {1 - obj >= 0.16 ? "efectivo " + Math.round((1 - obj) * 100) + "%" : ""}
        </div>
      </div>
      <input className="ea-slider" type="range" min="0" max="100" step="5"
        value={Math.round(obj * 100)} aria-label="Reparto entre cartera y efectivo"
        onChange={(e) => setObj(clamp(numero(e.target.value, 70) / 100, 0, 1))} />
      <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Iría a la cartera</span><span className="ea-mono">USD {fmt(liq * obj)}</span></div>
      <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Quedaría en efectivo</span><span className="ea-mono">USD {fmt(liq * (1 - obj))}</span></div>
      <div className="ea-itemD">
        Tener algo en efectivo no es cobardía: es lo que evita vender la cartera en el peor momento.
      </div>

      {/* Elegir un perfil es la decision de verdad; repartir siete activos
          a mano es un lujo para quien ya sabe. Antes los siete sliders
          estaban siempre desplegados y eran lo primero que veia alguien
          que nunca ha invertido: la pantalla mas intimidante del juego,
          puesta delante justo del que menos sabe. */}
      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Cómo quieres invertirlo</div>
      <div className="ea-perfiles">
        {PERFILES.map((pf) => {
          const est2 = statsPesos({ ...pf.w, efectivo: Math.max(0, 1 - invertidoDe(pf.w)) });
          const on = preset && preset.id === pf.id;
          return (
            <button key={pf.id} className={"ea-perfil" + (on ? " on" : "")} onClick={() => setW({ ...pf.w })}>
              <div className="ea-perfilT ea-dis">{pf.n}{on ? " ✓" : ""}</div>
              <div className="ea-perfilD">{pf.d}</div>
              <div className="ea-perfilN ea-mono">
                esperado {(est2.mu * 100).toFixed(1)}% · un año malo {((est2.mu - 2 * est2.sd) * 100).toFixed(0)}%
              </div>
            </button>
          );
        })}
      </div>
      {!preset && (
        <div className="ea-itemD" style={{ marginTop: 8 }}>Combinación tuya. No se parece a ninguno de los cinco.</div>
      )}

      <button className="ea-atras ea-dis" style={{ marginTop: 14, marginBottom: 0 }}
        onClick={() => setAvanzado((v) => !v)}>
        {avanzado ? "↑ Ocultar el reparto activo por activo" : "↓ Repartir activo por activo"}
      </button>

      {avanzado && (
        <div className="ea-panelAb">
          {ACTIVOS.map((a) => {
            const x = Math.round((w[a.k] || 0) * 100);
            return (
              <div className="ea-wrow" key={a.k}>
                <div className="ea-wtop">
                  <span className="ea-wname">{a.n}</span>
                  <span className="ea-wnum ea-mono">{x}%</span>
                </div>
                <input className="ea-slider" type="range" min="0" max="100" step="5" value={x}
                  aria-label={a.n} onChange={(e) => setW(ajustarPesos(w, a.k, clamp(numero(e.target.value, 0) / 100, 0, 1)))} />
                <div className="ea-wsub">
                  esperado {(a.mu * 100).toFixed(1)} · volatilidad {(a.sd * 100).toFixed(0)} · {a.d}
                </div>
              </div>
            );
          })}
          <div className="ea-fila" style={{ marginTop: 6 }}>
            <span className="ea-dis" style={{ fontSize: 12 }}>Efectivo dentro de la cartera</span>
            <span className="ea-mono">{Math.round(ef * 100)}%</span>
          </div>
        </div>
      )}

      {/* Las dos cifras que se usan para decidir, arriba. Las otras cinco
          —beta, sharpe, ahorro por diversificar— son buenas y no las mira
          nadie antes de mover un slider: se pliegan. */}
      <div className="ea-caja">
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Esperas ganar</span><span className="ea-mono">{(est.mu * 100).toFixed(1)}% al año</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Un año malo de verdad</span><span className="ea-mono" style={{ color: "var(--rojo)" }}>{((est.mu - 2 * est.sd) * 100).toFixed(0)}%</span></div>
      </div>
      <button className="ea-atras ea-dis" style={{ marginTop: 10, marginBottom: 0 }}
        onClick={() => setDetalle((v) => !v)}>
        {detalle ? "↑ Cerrar" : "↓ El detalle del riesgo"}
      </button>
      {detalle && (
        <div className="ea-caja ea-panelAb" style={{ marginTop: 8 }}>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Volatilidad</span><span className="ea-mono">{(est.sd * 100).toFixed(1)} puntos</span></div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Año normal, entre</span><span className="ea-mono">{((est.mu - est.sd) * 100).toFixed(0)} y {((est.mu + est.sd) * 100).toFixed(0)}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Retorno por unidad de riesgo</span><span className="ea-mono">{sharpe.toFixed(2)}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Sensibilidad al mercado</span><span className="ea-mono">beta {beta.toFixed(2)}</span></div>
          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ahorro por diversificar</span><span className="ea-mono">{(ahorra * 100).toFixed(0)}%</span></div>
          {ahorra > 0.14 && (
            <div className="ea-ok2">
              Por separado darían {(sdSuma * 100).toFixed(0)} puntos de volatilidad; juntos, {(est.sd * 100).toFixed(0)}.
              Esa diferencia es lo único gratis que hay en finanzas.
            </div>
          )}
        </div>
      )}

      {/* Los avisos se quedan: son los que enseñan, y solo salen cuando
          de verdad hay algo que avisar. */}
      {conc.max >= 0.5 && (
        <div className="ea-avis">
          {Math.round(conc.max * 100)}% en {conc.activo.n.toLowerCase()}. Si eso cae la mitad, pierdes
          {" "}{Math.round(conc.max * 50)}%.
        </div>
      )}
      {(w.cripto || 0) >= 0.25 && (
        <div className="ea-avis">Con esta cripto, un año malo se lleva un tercio de todo.</div>
      )}
      {beta >= 0.95 && (
        <div className="ea-avis">Beta cerca de uno: varias líneas, un solo mercado. Eso no es diversificar.</div>
      )}
      {ef >= 0.4 && (
        <div className="ea-avis">Media cartera en efectivo, rindiendo {(EFECTIVO_MU * 100).toFixed(1)}%.</div>
      )}

      {cambio ? (
        <div>
          <div className="ea-pend" style={{ marginTop: 14 }}>
            <div className="ea-pendK ea-dis">SIN APLICAR</div>
            Has movido la cartera pero todavía no has confirmado. Nada se mueve, y el año no avanza,
            hasta que decidas.
          </div>
          <div className="ea-itemD" style={{ marginTop: 0 }}>
            Rotarías {Math.round(rot * 100)}% de la cartera{movObj > 1 ? " y moverías USD " + fmt(movObj) + " entre efectivo e inversión" : ""}.
            Comisión estimada USD {fmt(costo)}.
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="ea-aplicar ea-dis" onClick={() => onAplicar(w, obj)}>Aplicar el cambio</button>
            <button className="ea-descartar ea-dis" onClick={() => { setW({ ...actual }); setObj(objAct); }}>Dejarlo como está</button>
          </div>
        </div>
      ) : (
        <div className="ea-tengo ea-dis" style={{ marginTop: 12 }}>Así está invertido tu dinero ahora</div>
      )}
      <div style={{ fontSize: 11.5, color: "var(--gris)", marginTop: 12 }}>
        Cada movimiento cuesta 0,5% de lo que rotas. Perseguir al activo que rindió el año pasado es la
        forma más cara de perder dinero.
      </div>
    </div>
  );
}
