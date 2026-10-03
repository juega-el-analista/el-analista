import React from "react";
import { useNavigate } from "react-router-dom";
import { TEMAS, NIVEL_N } from "../../datos/catedra.js";
import { useHead } from "../../hooks/useHead.js";

/* ============================================================
   LA CÁTEDRA, PARA CONSULTAR
   El temario entero, nivel por nivel, con la explicación y el ejemplo
   de cada tema. Los exámenes no están aquí: se ganan jugando, cuando la
   carrera llega a ese nivel.
   ============================================================ */
export function Catedra() {
  useHead({
    titulo: "La Cátedra · El Analista",
    descripcion: "El temario de finanzas de El Analista en cinco niveles, de los fundamentos a la mesa de socios.",
  });
  const navegar = useNavigate();
  const niveles = [1, 2, 3, 4, 5].map((nv) => ({ nv, temas: TEMAS.filter((t) => t.nv === nv) }))
    .filter((g) => g.temas.length);
  return (
    <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
      <button className="ea-atras ea-dis" onClick={() => navegar("..")}>Volver al juego</button>
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Para consultar</div>
      <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>La Cátedra</h2>
      <p className="ea-lede">
        {TEMAS.length} temas en cinco niveles. En la partida se abren a medida que tu carrera avanza, y cada uno trae su examen.
      </p>
      {niveles.map((g) => (
        <div key={g.nv} style={{ marginBottom: 28 }}>
          <div className="ea-rot ea-dis">Nivel {g.nv} · {NIVEL_N[g.nv]}</div>
          {g.temas.map((t) => (
            <div className="ea-panel" key={t.id} id={t.id} style={{ marginBottom: 10 }}>
              <div className="ea-glosT ea-dis">{t.n}</div>
              <div className="ea-glosX">{t.x}</div>
              {t.ej && <div className="ea-glosX" style={{ fontStyle: "italic", marginTop: 8 }}>{t.ej}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
