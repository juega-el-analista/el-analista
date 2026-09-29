/* Arranque del juego cuando corre solo, en desarrollo con Vite.

   El HTML que se publica (index.html en la raíz) no pasa por aquí: lo arma
   pruebas/empaquetar.js uniendo los módulos en un solo archivo. Esto es para
   trabajar: npm run dev abre el juego con recarga en vivo al guardar. */
import React from "react";
import { createRoot } from "react-dom/client";
import ElAnalista from "./ElAnalista.jsx";

createRoot(document.getElementById("raiz")).render(<ElAnalista />);
