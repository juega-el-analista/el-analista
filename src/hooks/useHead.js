/* ============================================================
   EL HEAD DE CADA VISTA
   Título de la pestaña y descripción para buscadores y para cuando se
   comparte el enlace. Al salir de la vista se deja todo como estaba:
   montado dentro de otra web, el juego no puede quedarse con el título
   de la página que lo aloja.
   ============================================================ */
import { useEffect } from "react";

export function useHead({ titulo, descripcion }) {
  useEffect(() => {
    if (typeof document === "undefined" || !document.head || !document.createElement) return;
    const tituloAntes = document.title;
    let meta = document.head.querySelector('meta[name="description"]');
    const creada = !meta;
    if (creada) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const descripcionAntes = meta.getAttribute("content");
    if (titulo) document.title = titulo;
    if (descripcion) meta.setAttribute("content", descripcion);
    return () => {
      document.title = tituloAntes;
      if (creada) meta.remove();
      else if (descripcionAntes === null) meta.removeAttribute("content");
      else meta.setAttribute("content", descripcionAntes);
    };
  }, [titulo, descripcion]);
}
