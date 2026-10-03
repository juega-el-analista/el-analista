import React from "react";
import { CSS } from "./estilos/base.js";
import { CSS5 } from "./estilos/minijuegos.js";
import { CSS2 } from "./estilos/graficos.js";
import { CSS3 } from "./estilos/tableros.js";
import { CSS4 } from "./estilos/cartera.js";
import { usePartida } from "./hooks/usePartida.jsx";
import { Rutas } from "./rutas.jsx";

/* ============================================================
   EL MOTOR
   Junta las dos mitades del juego: la partida (src/hooks/usePartida.jsx),
   que tiene el estado y las reglas, y las rutas (src/rutas.jsx), que
   deciden qué vista la muestra. El estilo va aquí, una sola vez, para
   que valga en todas las vistas.
   ============================================================ */
export function Motor() {
  const ctx = usePartida();
  return (
    <div className={"ea-root" + (ctx.quietoAhora ? " ea-quieto" : "")}>
      <style>{CSS}{CSS2}{CSS3}{CSS4}{CSS5}</style>
      <Rutas ctx={ctx} />
    </div>
  );
}
