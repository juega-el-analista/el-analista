import React from "react";
import { CARRERAS } from "../../datos/carreras.js";
import { ETIQ } from "../../datos/mercado.js";
import { EDAD_DE } from "../../motor/edad-y-metas.js";
import { JUEGO } from "../../motor/reglas.js";

/* Paso cinco del personaje: qué estudiaste. */
export function Estudio({ ctx }) {
  const { Atras, arrancarPartida, elec, enFase, rastro, setElec } = ctx;
  return (
    <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
      <Atras a="pais" texto="Cambiar el origen" />
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso cuatro de cuatro</div>
      <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>
        {EDAD_DE(elec.edad).e <= 20 ? "¿Qué estás por terminar?" : "¿Qué estudiaste?"}
      </h2>
      <div className="ea-rastro ea-mono">{rastro()}</div>
      <p className="ea-lede" style={{ marginBottom: 18 }}>
        Te da atributos y opciones que solo tú vas a poder tomar. Al elegir, empieza la partida.
      </p>
      {CARRERAS.map((c) => (
        <div className="ea-panel" key={c.id} style={{ marginBottom: 10 }}>
          <div className="ea-nombre ea-dis" style={{ fontSize: 19, color: "var(--tinta)" }}>{c.n}</div>
          <div style={{ fontSize: 13.5, color: "var(--gris)", margin: "7px 0" }}>{c.d}</div>
          <div style={{ fontSize: 12, color: "var(--cobre)" }}>
            {Object.keys(c.mods).map((k) => ETIQ[k] + " +" + c.mods[k]).join(" · ")} · mejor en {c.juegos.map((j) => JUEGO(j).n.toLowerCase()).join(" y ")}
          </div>
          <button className="ea-mini" onClick={() => {
            if (!enFase("estudio")) return;
            /* Al elegir la carrera empieza la partida, con los avisos de
               guía siempre puestos. Había una pantalla más («¿Te vas
               guiando o vas solo?») y se quitó el 28-sep-2026: los
               avisos son cortos y salen una sola vez, no hace falta
               preguntar por ellos. */
            setElec((x) => ({ ...x, estudio: c.id }));
            arrancarPartida({ ...elec, estudio: c.id, guia: true });
          }}>{EDAD_DE(elec.edad).e <= 20 ? "Graduarte de esto" : "Empezar con esto"}</button>
        </div>
      ))}
    </div>
  );
}
