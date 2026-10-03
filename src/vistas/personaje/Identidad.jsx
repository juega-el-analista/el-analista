import React from "react";
import { TOPE_NOMBRE, saneaNombre } from "../../motor/edad-y-metas.js";
import { GENEROS } from "../../motor/estado-inicial.js";

/* Paso uno del personaje: cómo te llamas. */
export function Identidad({ ctx }) {
  const { Atras, elec, enFase, irA, setElec } = ctx;
  return (
    <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
      <Atras a="portada" texto="Volver a la portada" />
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso uno de cuatro</div>
      <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Quién eres?</h2>
      <p className="ea-lede" style={{ marginBottom: 20 }}>
        Solo para que el juego te hable a ti. No cambia ningún número.
      </p>

      <label className="ea-campoK ea-dis" htmlFor="ea-nombre">Tu nombre</label>
      <input id="ea-nombre" className="ea-campo ea-dis" type="text" maxLength={TOPE_NOMBRE}
        value={elec.nombre} placeholder="Como quieras que te llamen"
        onChange={(e) => setElec((x) => ({ ...x, nombre: saneaNombre(e.target.value) }))} />

      <div className="ea-campoK ea-dis" style={{ marginTop: 22 }}>Género</div>
      <div className="ea-generos">
        {GENEROS.map((g) => (
          <button key={g.id} className={"ea-mini" + (elec.genero === g.id ? " on" : "")} style={{ marginTop: 0 }}
            onClick={() => setElec((x) => ({ ...x, genero: g.id }))}>{g.n}</button>
        ))}
      </div>

      <div className="ea-regla" style={{ marginTop: 26 }} />
      <button className="ea-btnO" style={{ marginTop: 0 }}
        onClick={() => { if (enFase("identidad")) irA("edad"); }}>
        {elec.nombre.trim() ? "Seguir como " + elec.nombre.trim() : "Seguir sin nombre"}
      </button>
    </div>
  );
}
