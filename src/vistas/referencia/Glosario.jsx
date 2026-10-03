import React from "react";
import { useNavigate } from "react-router-dom";
import { GLOSARIO } from "../../datos/glosario.js";
import { useHead } from "../../hooks/useHead.js";

/* ============================================================
   EL GLOSARIO, PARA CONSULTAR
   Los mismos términos que el juego explica mientras juegas, todos
   juntos y en orden. No toca la partida: se puede abrir en cualquier
   momento, y enlazar desde fuera, sin perder nada de lo que está a
   medias.
   ============================================================ */
export function Glosario() {
  useHead({
    titulo: "Glosario · El Analista",
    descripcion: "Los términos de finanzas que usa El Analista, explicados en lenguaje llano.",
  });
  const navegar = useNavigate();
  const terminos = Object.keys(GLOSARIO)
    .map((k) => ({ k, ...GLOSARIO[k] }))
    .sort((a, b) => a.n.localeCompare(b.n, "es"));
  return (
    <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
      <button className="ea-atras ea-dis" onClick={() => navegar("..")}>Volver al juego</button>
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Para consultar</div>
      <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>Glosario</h2>
      <p className="ea-lede">
        {terminos.length} términos, explicados como se los explicarías a alguien que nunca ha pisado un banco.
      </p>
      {terminos.map((t) => (
        <div className="ea-glos" key={t.k} id={t.k}>
          <div className="ea-glosT ea-dis">{t.n}</div>
          <div className="ea-glosX">{t.x}</div>
        </div>
      ))}
    </div>
  );
}
