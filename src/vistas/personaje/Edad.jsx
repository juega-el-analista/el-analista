import React from "react";
import { ETIQ } from "../../datos/mercado.js";
import { fmt } from "../../motor/aritmetica.js";
import { DURACION, EDADES } from "../../motor/edad-y-metas.js";

/* Paso dos del personaje: a qué edad empiezas. */
export function Edad({ ctx }) {
  const { Atras, elec, elige, enFase } = ctx;
  return (
    <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
      <Atras a="identidad" texto="Cambiar tu nombre" />
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso dos de cuatro</div>
      <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿A qué edad empiezas?</h2>
      <p className="ea-lede" style={{ marginBottom: 18 }}>
        Nadie está fuera de tiempo. Más tarde es menos años y más criterio, red y dinero.
      </p>

      {/* Sin elegir cuánto jugar: siempre es una década y al llegar se
          ofrece seguir de cinco en cinco. Hubo un selector «Una década /
          La carrera entera»; se quitó el 28-sep-2026. */}

      {EDADES.map((e) => (
        <button className={"ea-opcion" + (elec.edad === e.e ? " on" : "")} key={e.e}
          onClick={() => { if (enFase("edad")) elige("edad", e.e, e.e >= 30 ? "familia" : "pais"); }}>
          <div className="ea-opcionN">Empezar a los {e.e}</div>
          <div className="ea-opcionD">{e.d}</div>
          <div className="ea-opcionM">
            Te preguntan si te retiras a los {e.e + DURACION(elec.duracion).meta}, y ahí decides si sigues
            {e.cash > 0 ? " · empiezas con USD " + fmt(e.cash) + " ahorrados" : " · empiezas sin nada ahorrado"}
            {Object.keys(e.mods || {}).length ? " · " + Object.keys(e.mods).map((k) => ETIQ[k] + " " + (e.mods[k] > 0 ? "+" : "") + e.mods[k]).join(" · ") : ""}
          </div>
        </button>
      ))}
    </div>
  );
}
