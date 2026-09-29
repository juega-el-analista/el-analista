import React, { useState, useEffect } from "react";
import { numero, entero, texto, fmt } from "../motor/aritmetica.js";

/* ============================================================
   PANEL DE CARTERA
   Una barra decide cuánto de tu dinero está invertido y cuánto en
   efectivo. Abajo, cada clase de activo se mueve por separado; los
   perfiles quedan como punto de partida de un toque. Nada se aplica
   hasta que confirmas, y se te dice lo que cuesta el cambio.
   ============================================================ */

/* ============================================================
   EL REGISTRO COMPARTIDO
   Las carreras que otros cerraron. Viven en el propio documento, en la
   isla que el puente lee, y se anotan publicando una version nueva de la
   pagina. No hay servidor ni cuentas: por eso el registro es
   autodeclarado y la pagina lo dice.

   No es una pestania del juego a proposito: el anio 1 arranca con dos
   secciones y eso costo trabajo. El registro sale donde de verdad se
   mira, en la portada y al terminar.
   ============================================================ */
const registroActual = () => {
  try {
    return (typeof window !== "undefined" && Array.isArray(window.__REGISTRO))
      ? window.__REGISTRO : [];
  } catch (e) { return []; }
};

export function PanelRegistro({ tope, tuya, titulo }) {
  const lista = registroActual()
    .slice()
    .sort((a, b) => numero(b && b.p, 0) - numero(a && a.p, 0))
    .slice(0, entero(tope, 10, 1, 200));

  return (
    <div>
      <div className="ea-rot ea-dis">{titulo || "Carreras cerradas"}</div>
      {lista.length === 0 ? (
        <div className="ea-regVacio">
          Todavía no hay ninguna carrera anotada. La primera puede ser tuya.
        </div>
      ) : (
        <div>
          <div className="ea-regCab ea-dis">
            <span>#</span><span>QUIÉN</span><span>PATRIMONIO</span><span>◆</span>
          </div>
          {lista.map((x, i) => {
            const esMia = tuya != null && x === tuya;
            return (
              <div className={"ea-regFila" + (i < 3 ? " podio" : "") + (esMia ? " tuya" : "")} key={i}>
                <span className="ea-regP">{i + 1}</span>
                <span className="ea-regN">
                  {texto(x && x.n, 24) || "Anónimo"}
                  <span className="ea-regC">
                    {texto(x && x.c, 24) || "—"} · se retiró a los {entero(x && x.e, 50, 20, 99)}
                    {texto(x && x.v, 60) ? " · " + texto(x.v, 60) : ""}
                  </span>
                </span>
                <span className="ea-regV">USD {fmt(numero(x && x.p, 0))}</span>
                <span className="ea-regM">{entero(x && x.m, 0, 0, 12) > 0 ? "◆" + entero(x.m, 0, 0, 12) : "—"}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* El boton que anota tu carrera. Los seis datos salen del estado, no de
   un formulario: el jugador no tiene que copiar nada a mano. */
export function BotonAnotar({ entrada }) {
  const [puede, setPuede] = useState(null);      /* null = comprobando */
  const [estado, setEstado] = useState("listo"); /* listo · enviando · hecho · error */
  const [motivo, setMotivo] = useState("");
  const [nombre, setNombre] = useState(texto(entrada && entrada.n, 24));

  useEffect(() => {
    let vivo = true;
    let p;
    try {
      p = (typeof window !== "undefined" && typeof window.__puedeAnotar === "function")
        ? window.__puedeAnotar() : Promise.resolve(false);
    } catch (e) { p = Promise.resolve(false); }
    p.then((v) => { if (vivo) setPuede(!!v); }).catch(() => { if (vivo) setPuede(false); });
    return () => { vivo = false; };
  }, []);

  if (puede === null) return null;

  if (!puede) {
    return (
      <div className="ea-itemD" style={{ marginTop: 16 }}>
        El registro compartido no está disponible en esta vista, así que tu carrera no se puede
        anotar desde aquí. Queda igual en tu expediente.
      </div>
    );
  }

  if (estado === "hecho") {
    return (
      <div className="ea-ok2" style={{ marginTop: 16 }}>
        Anotada. La página se recarga para todo el mundo con tu carrera dentro.
      </div>
    );
  }

  const anotar = () => {
    const n = texto(nombre, 24);
    if (!n) { setEstado("error"); setMotivo("Escribe un nombre para figurar en el registro."); return; }
    setEstado("enviando"); setMotivo("");
    let p;
    try { p = window.__anotarCarrera({ ...entrada, n }); }
    catch (e) { p = Promise.resolve("fallo"); }
    p.then((err) => {
      if (!err) { setEstado("hecho"); return; }
      setEstado("error");
      setMotivo(
        err === "conflicto" ? "Alguien anotó justo antes que tú. Recarga la página y vuelve a intentarlo."
        : err === "sin-permiso" ? "Esta vista no tiene permiso para anotar en el registro."
        : "No se pudo anotar. Recarga la página e inténtalo otra vez."
      );
    }).catch(() => { setEstado("error"); setMotivo("No se pudo anotar. Recarga la página e inténtalo otra vez."); });
  };

  return (
    <div className="ea-panel" style={{ marginTop: 24 }}>
      <div className="ea-rot ea-dis">Anotar tu carrera</div>
      <div className="ea-itemD" style={{ marginBottom: 4 }}>
        Queda en el registro que ve todo el mundo, con tu cargo, tu patrimonio y cómo terminaste.
        Nadie verifica nada: se anota por confianza.
      </div>
      <div className="ea-campoK ea-dis" style={{ marginTop: 12 }}>Con qué nombre figuras</div>
      <input className="ea-regNombre" maxLength={24} value={nombre} autoComplete="off"
        placeholder="Como quieras que te vean" aria-label="Nombre para el registro"
        onChange={(e) => setNombre(e.target.value)} />
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 14 }}>
        <button className="ea-aplicar ea-dis" disabled={estado === "enviando"} onClick={anotar}>
          {estado === "enviando" ? "Anotando…" : "Anotar en el registro"}
        </button>
        {motivo && <span style={{ fontSize: 13, color: "var(--rojo)", flex: 1, minWidth: 200 }}>{motivo}</span>}
      </div>
    </div>
  );
}
