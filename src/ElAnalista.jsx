/* ============================================================
   EL ANALISTA  ·  v5
   De los 20 a los 50, un año por turno.
   Dieciocho minijuegos, un temario de finanzas en cinco niveles que
   sube contigo, una cartera que reparte activo por activo y un
   informe de cierre que te explica qué acabas de aprender.
   ============================================================ */

import React from "react";
import { HashRouter, MemoryRouter, useInRouterContext } from "react-router-dom";
import { Motor } from "./Motor.jsx";
import { Blindaje } from "./componentes/Blindaje.jsx";

/* ============================================================
   EL COMPONENTE QUE SE MONTA
   Es lo único que necesita saber quien aloje el juego.

   Dentro de una web con React Router (por ejemplo en SurEconomics, en
   una ruta "juego/*"), usa el enrutador de esa web y sus rutas quedan
   debajo de la de ella: /juego/partida, /juego/glosario...

   Solo, sin enrutador alrededor, trae el suyo. En un navegador de
   verdad usa el de almohadilla (#/partida), que funciona igual abierto
   con doble clic, en GitHub Pages, en la app del teléfono o en un
   artifact, porque no necesita que el servidor conozca las rutas.
   Donde no hay navegador, como en las pruebas, usa uno en memoria.
   ============================================================ */
const hayNavegador = () => {
  try {
    return typeof window !== "undefined" && !!window.location && !!window.history
      && typeof window.addEventListener === "function";
  } catch (e) { return false; }
};

export default function ElAnalista() {
  const juego = (
    <Blindaje>
      <Motor />
    </Blindaje>
  );
  if (useInRouterContext()) return juego;
  const Enrutador = hayNavegador() ? HashRouter : MemoryRouter;
  return <Enrutador>{juego}</Enrutador>;
}
