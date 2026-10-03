import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useHead } from "../hooks/useHead.js";
import { SECCIONES, seccionDeFase } from "../secciones.js";
import { Aviso } from "./inicio/Aviso.jsx";
import { Portada } from "./inicio/Portada.jsx";
import { Identidad } from "./personaje/Identidad.jsx";
import { Edad } from "./personaje/Edad.jsx";
import { Familia } from "./personaje/Familia.jsx";
import { Pais } from "./personaje/Pais.jsx";
import { Estudio } from "./personaje/Estudio.jsx";
import { Partida } from "./partida/Partida.jsx";
import { Anuncio } from "./partida/Anuncio.jsx";
import { NuevoSistema } from "./partida/NuevoSistema.jsx";
import { Fin } from "./fin/Fin.jsx";

/* ============================================================
   LAS PANTALLAS DE LA PARTIDA
   Cuál se ve lo decide la fase del juego, igual que siempre. La ruta
   va detrás: cada vez que la fase cambia de sección, la dirección se
   pone al día, reemplazando la entrada del historial en vez de sumar
   otra. Por eso el botón Atrás sale del juego en lugar de volver a una
   pantalla que ya quedó atrás en la partida.
   ============================================================ */
export function Pantallas({ ctx }) {
  const { fase, cierre, anuncio, nuevoSistema } = ctx;
  const seccion = SECCIONES[seccionDeFase(fase)];
  useHead({ titulo: seccion.titulo, descripcion: seccion.descripcion });

  /* La base es lo que hay antes de esta ruta: "/" cuando el juego es la
     página entera, "/juego/" cuando va montado dentro de otra web. Se
     calcula quitando de la dirección lo que atrapó el comodín. */
  const lugar = useLocation();
  const navegar = useNavigate();
  const resto = useParams()["*"] || "";
  const base = lugar.pathname.slice(0, lugar.pathname.length - resto.length);
  const destino = (base.endsWith("/") ? base : base + "/") + seccion.ruta;
  useEffect(() => {
    if (lugar.pathname !== destino) navegar(destino, { replace: true });
  }, [destino, lugar.pathname]);

  return (
    <>
      {fase === "aviso" && <Aviso ctx={ctx} />}

      {fase === "portada" && <Portada ctx={ctx} />}

      {fase === "identidad" && <Identidad ctx={ctx} />}

      {fase === "edad" && <Edad ctx={ctx} />}

      {fase === "familia" && <Familia ctx={ctx} />}

      {fase === "pais" && <Pais ctx={ctx} />}

      {fase === "estudio" && <Estudio ctx={ctx} />}

      {(fase === "evento" || fase === "minijuego" || fase === "resultado" || fase === "cierre" || fase === "retiro") && <Partida ctx={ctx} />}

      {/* ============================================================
          EL ANUNCIO DEL AÑO
          Tapa el informe hasta que el jugador ha visto cuanto tiene. Es
          el unico momento del juego que no pide leer nada: un numero
          grande girando y cuanto se movio. El informe espera debajo.
          ============================================================ */}
      {fase === "cierre" && cierre && anuncio && <Anuncio ctx={ctx} />}

      {nuevoSistema && <NuevoSistema ctx={ctx} />}

      {fase === "fin" && <Fin ctx={ctx} />}
    </>
  );
}
