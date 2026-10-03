/* ============================================================
   LAS RUTAS DEL JUEGO
   Una por sección, no por pantalla:

     /                 inicio: el aviso y la portada
     /nueva-partida    el personaje, en cinco pasos
     /partida          el año en curso, con su escena y su cierre
     /fin              el balance de la vida
     /glosario         los términos, para consultar
     /catedra          el temario, para consultar

   Las cuatro primeras siguen a la partida y no al revés: la pantalla la
   decide la fase del juego, y la dirección solo la refleja. Si alguien
   escribe /fin a mano, o vuelve atrás con el navegador, ve la pantalla
   que le toca y la dirección se corrige sola. Así el botón Atrás no
   puede deshacer una decisión ni hacer que un año se juegue dos veces.

   Las rutas son relativas: el juego funciona igual en la raíz de su
   propio sitio que montado dentro de otra web, por ejemplo en
   /juego/* dentro del enrutador de SurEconomics.
   ============================================================ */
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Pantallas } from "./vistas/Pantallas.jsx";
import { Glosario } from "./vistas/referencia/Glosario.jsx";
import { Catedra } from "./vistas/referencia/Catedra.jsx";

export function Rutas({ ctx }) {
  return (
    <Routes>
      <Route path="glosario" element={<Glosario />} />
      <Route path="catedra" element={<Catedra />} />
      <Route path="*" element={<Pantallas ctx={ctx} />} />
    </Routes>
  );
}
