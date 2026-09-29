/* ============================================================
   EL ANALISTA  ·  v5
   De los 20 a los 50, un año por turno.
   Dieciocho minijuegos, un temario de finanzas en cinco niveles que
   sube contigo, una cartera que reparte activo por activo y un
   informe de cierre que te explica qué acabas de aprender.
   ============================================================ */

import React from "react";
import { Motor } from "./vistas/Motor.jsx";
import { Blindaje } from "./componentes/Blindaje.jsx";

export default function ElAnalista() {
  return (
    <Blindaje>
      <Motor />
    </Blindaje>
  );
}
