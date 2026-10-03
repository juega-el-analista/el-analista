import React from "react";
import { Chispa, Curva, Flujo } from "../../componentes/CaminoDelAnio.jsx";
import { Plegable } from "../../componentes/Stats.jsx";
import { fmt, texto } from "../../motor/aritmetica.js";

/* El informe de cierre del año: números, lección y lo que viene. */
export function Cierre({ ctx }) {
  const {
    carteraPend, cierre, cobertura, fin, retirarse, retiroAnual, s, setVerLeccion, siguienteAno,
    tope, verLeccion,
  } = ctx;
  return (
    <div className="ea-memo">
      <div className="ea-memoHead ea-dis clave"><span>Cierre del año</span><span>{cierre.ano}</span></div>
      <h2 className="ea-memoTit ea-dis">Así terminó {cierre.ano}</h2>

      {/* El numero grande ya se vio a pantalla completa en el
          rodillo, asi que aqui la cabecera es una linea: como
          quedaste, cuanto se movio, cuanto ahorraste y cuanto
          cubres. El resto vive en tres cajones, no en seis. */}
      <div className="ea-titular">
        <div className="ea-titularK ea-dis">Tu patrimonio</div>
        <div className="ea-titularV ea-mono" style={{ fontSize: 26 }}>USD {fmt(cierre.patrimonio)}</div>
        <div className="ea-titularL">
          <span className="ea-mono" style={{ color: cierre.patrimonio >= cierre.patAntes ? "#2E7A3D" : "#8A2E1E" }}>
            {cierre.patrimonio >= cierre.patAntes ? "+" : "−"}{fmt(Math.abs(cierre.patrimonio - cierre.patAntes))} en el año
          </span>
          <span className="ea-mono" style={{ color: cierre.ahorro >= 0 ? "#2E7A3D" : "#8A2E1E" }}>
            ahorraste {Math.round(cierre.ahorro * 100)}%
          </span>
          <span className="ea-mono">cubres {Math.round(cierre.cobertura * 100)}% de tu vida</span>
        </div>
        {cierre.ascenso && <div className="ea-titularA ea-dis">Ascenso a {cierre.ascenso}</div>}
        {/* la barra de independencia deja de ser un cajon propio:
            era un numero y una barra, y ya estan aqui */}
        <div className="ea-ind" style={{ marginTop: 10 }}>
          <div className="ea-indF" style={{ width: Math.min(100, cierre.indep * 100) + "%" }} />
          <div className="ea-indM" style={{ left: "71.4%" }} />
        </div>
      </div>

      {/* La leccion era un parrafo de siete lineas, y es lo
          primero que se ve al cerrar el año. Ahora se lee el
          titular y la primera frase; el resto, que es donde
          van tus cifras concretas, espera a que lo pidas. */}
      {cierre.leccion && (() => {
        const x = texto(cierre.leccion.x, "", 1200);
        const corte = x.search(/\.\s/);
        const primera = corte > 0 ? x.slice(0, corte + 1) : x;
        const resto = corte > 0 ? x.slice(corte + 2) : "";
        return (
          <div className="ea-lec" style={{ marginTop: 14 }}>
            <div className="ea-lecK">Lo que enseña este año</div>
            <div className="ea-lecT">{cierre.leccion.t}</div>
            <div className="ea-lecX">{primera}</div>
            {resto && !verLeccion && (
              <button className="ea-atras ea-dis" style={{ marginTop: 6, marginBottom: 0 }}
                onClick={() => setVerLeccion(true)}>↓ Con tus números</button>
            )}
            {resto && verLeccion && <div className="ea-lecX ea-panelAb" style={{ marginTop: 6 }}>{resto}</div>}
          </div>
        );
      })()}

      {cierre.hitos.length > 0 && (
        <div className="ea-hitos">
          {cierre.hitos.map((h, i) => (
            <span className="ea-hito" key={i} style={{ animationDelay: (i * 100) + "ms" }}>{h}</span>
          ))}
        </div>
      )}

      {/* Lo que paso sale a la vista: es lo unico del informe que
          cuenta algo en vez de dar un dato, y estaba plegado. */}
      {cierre.notas.length > 0 && (
        <div style={{ marginTop: 14 }}>
          {cierre.notas.map((n, i) => (
            <div key={i} className="ea-td" style={{ fontSize: 13.5, marginBottom: 6 }}>{n}</div>
          ))}
        </div>
      )}

      <div className="ea-plegs">

      {/* CAJON 1 · el dinero del año, con el reparto del
          patrimonio dentro: antes eran dos cajones que decian
          medio lo mismo. */}
      <Plegable titulo="El año en plata" resumen={(cierre.neto >= 0 ? "+" : "−") + fmt(Math.abs(cierre.neto))}
        tono={cierre.neto >= 0 ? "#2E7A3D" : "#8A2E1E"}>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <Flujo titulo={"Entró USD " + fmt(cierre.ingreso)} lista={cierre.ing} tope={cierre.ingreso} />
          <Flujo titulo={"Salió USD " + fmt(cierre.egreso)} lista={cierre.egr} tope={cierre.ingreso} neg />
        </div>
        <div className="ea-flin" style={{ marginTop: 12, fontSize: 13.5, color: "#3D3D3D" }}>
          <span className="ea-dis">Te quedaste con</span>
          <span className="ea-mono" style={{ textAlign: "right", color: cierre.neto >= 0 ? "#3D8A49" : "var(--rojo)" }}>{fmt(cierre.neto)}</span>
        </div>
        <div className="ea-flbar" style={{ height: 12 }}>
          <div className={"ea-flfill" + (cierre.ahorro < 0 ? " neg" : "")}
            style={{ width: Math.min(100, Math.abs(cierre.ahorro) * 100) + "%" }} />
        </div>
        {cierre.deuda && (
          <div className="ea-alerta mal">
            Cerraste el año en rojo por USD {fmt(-s.cash)}: gastas más de lo que entra y la diferencia se financia.
          </div>
        )}
        <div className="ea-tabla" style={{ marginTop: 14 }}>
          <span className="ea-td">Efectivo</span><span className="ea-tdn ea-mono">{fmt(s.cash)}</span>
          <span className="ea-td">Cartera invertida</span><span className="ea-tdn ea-mono">{fmt(s.cartera)}</span>
          <span className="ea-td">Bienes</span><span className="ea-tdn ea-mono">{fmt(cierre.bienesV)}</span>
        </div>
        <Chispa datos={cierre.histo} desde={2026} />
      </Plegable>

      {/* CAJON 2 · la cartera */}
      {cierre.cartera && (
        <Plegable titulo="Tu cartera, mes a mes"
          resumen={(cierre.cartera.ret >= 0 ? "+" : "") + (cierre.cartera.ret * 100).toFixed(1) + "%"}
          tono={cierre.cartera.ret >= 0 ? "#2E7A3D" : "#8A2E1E"}>
          <div className="ea-mono" style={{ fontSize: 21, color: "#3D3D3D" }}>
            {fmt(cierre.cartera.antes)} → {fmt(cierre.cartera.despues)}
          </div>
          <div className="ea-dis" style={{ fontSize: 15, color: cierre.cartera.ret >= 0 ? "#3D8A49" : "var(--rojo)" }}>
            {cierre.cartera.ret >= 0 ? "+" : ""}{(cierre.cartera.ret * 100).toFixed(1)}% · {cierre.cartera.ret >= 0 ? "ganaste" : "perdiste"} USD {fmt(Math.abs(cierre.cartera.despues - cierre.cartera.antes))}
          </div>
          {cierre.cartera.camino && <Curva camino={cierre.cartera.camino} ret={cierre.cartera.ret} hitos={cierre.hitosDec} />}
          <div className="ea-td" style={{ marginTop: 3 }}>
            Esperabas {(cierre.cartera.mu * 100).toFixed(1)} con una desviación de {(cierre.cartera.sd * 100).toFixed(1)} puntos.
            {cierre.cartera.aporte > 100 ? " Metiste USD " + fmt(cierre.cartera.aporte) + " de aporte nuevo." : cierre.cartera.aporte < -100 ? " Sacaste USD " + fmt(-cierre.cartera.aporte) + " de la cartera." : ""}
          </div>
          <div style={{ marginTop: 10 }}>
            {cierre.cartera.detalle.map((d, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <div className="ea-flin">
                  <span>{d.n} · {Math.round(d.w * 100)}%</span>
                  <span className="ea-mono" style={{ textAlign: "right", color: d.r >= 0 ? "#3D8A49" : "var(--rojo)" }}>
                    {d.r >= 0 ? "+" : ""}{(d.r * 100).toFixed(1)}
                  </span>
                </div>
                <div className="ea-flbar" style={{ height: 6 }}>
                  <div className={"ea-flfill" + (d.r < 0 ? " neg" : "")} style={{ width: Math.min(100, Math.abs(d.r) * 260) + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </Plegable>
      )}

      {/* CAJON 3 · lo que hizo el mercado */}
      <Plegable titulo="Las noticias del año"
        resumen={cierre.notis.length ? cierre.notis.length + (cierre.notis.length === 1 ? " noticia" : " noticias") : "sin novedades"}>
        {cierre.notis.map((n, i) => (
          <div className="ea-noti" key={i} style={{ marginTop: i === 0 ? 0 : 8 }}>
            <div className="ea-notiK">{n.k}</div>
            <div className="ea-notiT">{n.t}</div>
          </div>
        ))}
        {cierre.notis.length === 0 && <div className="ea-td">Un año sin sobresaltos en los mercados.</div>}
      </Plegable>

      </div>

      <button className="ea-btn" disabled={carteraPend} onClick={siguienteAno}>
        {fin ? "Ver el balance final" : s.turno >= tope ? "Sentarte a hacer cuentas" : "Empezar " + (cierre.ano + 1)}
      </button>
      {/* Retirarse deja de ser algo que el juego te impone en un año
          concreto: en cuanto tu patrimonio cubre lo que cuesta tu
          vida, la puerta está abierta y la decisión es tuya. */}
      {!fin && cobertura >= 1 && (
        <div style={{ marginTop: 10 }}>
          <button className="ea-descartar ea-dis" style={{ width: "100%", padding: "12px 18px" }}
            disabled={carteraPend} onClick={retirarse}>
            Retirarme ya · tu patrimonio cubre {Math.round(cobertura * 100)}% de tu vida
          </button>
          <div className="ea-td" style={{ fontSize: 11.5, marginTop: 6, textAlign: "center" }}>
            Retirando 4% al año dispondrías de USD {fmt(retiroAnual)}
            {s.hijos > 0 ? " para ti, tu pareja y " + s.hijos + (s.hijos === 1 ? " hijo" : " hijos") : ""}
            {". Nadie te obliga a seguir jugando."}
          </div>
        </div>
      )}
      {!fin && <div className="ea-td" style={{ fontSize: 11.5, marginTop: 7, textAlign: "center" }}>
        Al pasar de año la partida se guarda sola. Puedes cerrar y volver después.
      </div>}
    </div>
  );
}
