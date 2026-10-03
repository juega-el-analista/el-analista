import React, { useState, useRef } from "react";
import { numero, clamp } from "../motor/aritmetica.js";

/* ============================================================
   ICONOS
   Dibujados aqui, no traidos de fuera: el juego tiene que abrirse sin
   red. Trazo del mismo grosor en todos, para que la fila de arriba se
   lea como una sola cosa y no como cinco simbolos sueltos.
   ============================================================ */
const TRAZOS = {
  rayo:      "M13.5 2 L5 13.5 h5.2 l-1.2 8.5 L18 10.5 h-5.3 z",
  edificio:  "M3 21.5V7.2l6.5-3.7 6.5 3.7v14.3 M9.6 21.5v-4.6h3.6v4.6 M6.2 10.4h1.9 M6.2 14h1.9 M14.6 10.4h1.9 M14.6 14h1.9",
  pin:       "M12 22s6.6-6.3 6.6-10.6a6.6 6.6 0 1 0-13.2 0C5.4 15.7 12 22 12 22z M12 13.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4z",
  escalera:  "M3 21h5.4v-5.4H3zM9.3 21h5.4V10.2H9.3zM15.6 21H21V4.6h-5.4z",
  ojo:       "M1.6 12S5.5 4.9 12 4.9 22.4 12 22.4 12 18.5 19.1 12 19.1 1.6 12 1.6 12z M12 15.1a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2z",
  tabla:     "M3.2 3.6h17.6v16.8H3.2z M3.2 9.2h17.6 M3.2 14.8h17.6 M9.6 3.6v16.8",
  nodos:     "M6 8.2a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8z M18 8.2a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8z M12 21.6a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8z M7.6 7.4l3 9 M16.4 7.4l-3 9 M8.9 5.3h6.2",
  estrella:  "M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z",
  moneda:    "M12 21.4a9.4 9.4 0 1 0 0-18.8 9.4 9.4 0 0 0 0 18.8z M12 6.8v10.4 M14.9 9.3c0-1.3-1.3-2-2.9-2s-2.9.7-2.9 2 1.3 1.9 2.9 2.2 2.9.9 2.9 2.2-1.3 2-2.9 2-2.9-.7-2.9-2",
  aviso:     "M12 2.4 1.6 20.6h20.8z M12 9.2v5.2 M12 17.4h.02",

  /* ---- lo que se compra ----
     Veinte trazos para treinta y dos cosas: varias comparten simbolo a
     proposito, porque lo que tiene que decir el icono es de que FAMILIA
     es la compra, no cual exactamente. El nombre ya esta al lado. */
  pesa:      "M2.6 9.4v5.2 M6 7.2v9.6 M18 7.2v9.6 M21.4 9.4v5.2 M6 12h12",
  plato:     "M12 20.6a8.6 8.6 0 1 0 0-17.2 8.6 8.6 0 0 0 0 17.2z M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4z",
  libro:     "M4 3.6h11a3 3 0 0 1 3 3v13.8a2.4 2.4 0 0 0-2.4-2.4H4z M4 3.6v14.4 M20 6.6v13.8",
  reloj:     "M12 21.4a9.4 9.4 0 1 0 0-18.8 9.4 9.4 0 0 0 0 18.8z M12 6.8V12l3.4 2",
  maleta:    "M3 8.4h18v11.2H3z M8.4 8.4V5.6a1.6 1.6 0 0 1 1.6-1.6h4a1.6 1.6 0 0 1 1.6 1.6v2.8 M3 13.4h18",
  coche:     "M4 16.6h16 M5.4 16.6l1.4-5.4a2 2 0 0 1 1.9-1.5h6.6a2 2 0 0 1 1.9 1.5l1.4 5.4 M4 16.6v2.4h2.6v-2.4 M17.4 16.6V19H20v-2.4 M7.6 13.4h8.8",
  barco:     "M3 17.4h18l-2.4 3.2H5.4z M5.6 17.4V9.6h12.8v7.8 M12 9.6V4.2 M8.8 9.6h6.4",
  casa:      "M3.4 10.6 12 3.6l8.6 7v9.8H3.4z M9.6 20.4v-6h4.8v6",
  terreno:   "M2.6 18.6 9 15.4l6 3.2 6.4-3.2v-6L15 12.6l-6-3.2-6.4 3.2z M9 9.4v6 M15 12.6v6",
  palmera:   "M12 21V11 M12 11c-3.4-2.6-7-1.6-8.4.6 2.4-1 4.8-.6 6.4 1 M12 11c3.4-2.6 7-1.6 8.4.6-2.4-1-4.8-.6-6.4 1 M12 11c0-3.6 2.2-6 5-6.4-1.6 1.8-2.2 3.8-2 6.4 M12 11c0-3.6-2.2-6-5-6.4 1.6 1.8 2.2 3.8 2 6.4",
  anillo:    "M12 21.4a6.6 6.6 0 1 0 0-13.2 6.6 6.6 0 0 0 0 13.2z M8.6 8.8 6.4 3.4h11.2l-2.2 5.4 M12 3.4v5",
  bebe:      "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M9.4 11.6h.02 M14.6 11.6h.02 M9.6 15.4c1.4 1.2 3.4 1.2 4.8 0 M8 4.6c1.2-1.4 6.8-1.4 8 0",
  cuadro:    "M3.6 4.4h16.8v13.2H3.6z M3.6 13.8l4.6-4.2 4.2 3.8 3-2.6 5 4.4 M12 20.8v.8",
  copa:      "M7.4 3.6h9.2v4.2a4.6 4.6 0 0 1-9.2 0z M12 12.4v5.4 M8.4 20.4h7.2 M7.4 5.2H4.6v1.6a3 3 0 0 0 2.8 2.8 M16.6 5.2h2.8v1.6a3 3 0 0 1-2.8 2.8",
  cafe:      "M4.4 7.6h12v6.6a5 5 0 0 1-10 0z M16.4 9.2h1.8a2.6 2.6 0 0 1 0 5.2h-1.8 M3.6 20.4h13.6 M8 4.6v-2 M12.8 4.6v-2",
  balanza:   "M12 3.4v17.2 M7 20.6h10 M4 8.2h16 M4 8.2 1.6 14h4.8z M20 8.2 17.6 14h4.8z M12 3.4 8 8.2h8z",
  persona:   "M12 12a4.2 4.2 0 1 0 0-8.4A4.2 4.2 0 0 0 12 12z M4.4 20.6c0-4.2 3.4-7 7.6-7s7.6 2.8 7.6 7",
  pluma:     "M20.4 3.6 9.6 14.4l-1.2 4.6 4.6-1.2L23.8 7 20.4 3.6z M8.4 19 3.6 20.4l1.4-4.8 M14.6 8.6l4 4",
  escudo:    "M12 21.6s7.6-3.4 7.6-9.6V5.4L12 2.6 4.4 5.4V12c0 6.2 7.6 9.6 7.6 9.6z M8.8 12l2.2 2.2 4.4-4.4",
  grafico:   "M3.4 20.4h17.2 M6.6 20.4v-6.6 M11 20.4V7.6 M15.4 20.4v-9.4 M19.8 20.4V4.4",
  micro:     "M12 14.4a3.4 3.4 0 0 0 3.4-3.4V6a3.4 3.4 0 1 0-6.8 0v5a3.4 3.4 0 0 0 3.4 3.4z M6 10.6v.6a6 6 0 0 0 12 0v-.6 M12 17.4v3.2 M9 20.6h6",

  /* ---- que clase de cosa te esta pasando ----
     Un simbolo por tipo de escena. Antes todas se veian igual: el mismo
     memorando gris para un dia de oficina, para que se case tu hermano y
     para la decision que parte la carrera en dos. */
  documento: "M14 2.6H6.4a2 2 0 0 0-2 2v14.8a2 2 0 0 0 2 2h11.2a2 2 0 0 0 2-2V8.2z M14 2.6v5.6h5.6 M8.4 13h7.2 M8.4 17h4.8",
  corona:    "M2.8 7.6 6.6 13l5.4-7.6L17.4 13l3.8-5.4v10.2a1.6 1.6 0 0 1-1.6 1.6H4.4a1.6 1.6 0 0 1-1.6-1.6z M2.8 7.6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z M21.2 7.6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z M12 5.4a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z",
  bifurca:   "M12 21.4v-6.6 M12 14.8 5.6 8.4V3.2 M12 14.8l6.4-6.4V3.2 M5.6 3.2H3.2 M5.6 3.2h2.4 M18.4 3.2H16 M18.4 3.2h2.4",
  corazon:   "M12 20.8 4.4 13.2a4.8 4.8 0 0 1 0-6.8 4.8 4.8 0 0 1 6.8 0l.8.8.8-.8a4.8 4.8 0 0 1 6.8 0 4.8 4.8 0 0 1 0 6.8z",
  sello:     "M12 2.6a4 4 0 0 0-4 4c0 1.6 1.2 2.6 1.2 4.2H6.4a2.4 2.4 0 0 0-2.4 2.4v1.4h16v-1.4a2.4 2.4 0 0 0-2.4-2.4h-2.8c0-1.6 1.2-2.6 1.2-4.2a4 4 0 0 0-4-4z M4.4 18.2h15.2v3.2H4.4z",
  candado:   "M5.4 10.6h13.2a1.6 1.6 0 0 1 1.6 1.6v7.2a1.6 1.6 0 0 1-1.6 1.6H5.4a1.6 1.6 0 0 1-1.6-1.6v-7.2a1.6 1.6 0 0 1 1.6-1.6z M7.8 10.6V7a4.2 4.2 0 0 1 8.4 0v3.6",
};

/* Los momentos que se juegan a pantalla completa, ademas de las
   legendarias y las bifurcaciones, que entran solas. */
export const DRAMA_IDS = [
  /* te ofrecen otro trabajo, otro pais u otra silla */
  7,      /* te llama un headhunter */
  15,     /* una silla en el board */
  33,     /* dos ofertas sobre la mesa */
  55,     /* una visa de trabajo */
  119,    /* la silla del socio se decide en la mesa */
  120,    /* dirigir la oficina de otro pais */
  9720, 9721,   /* renunciar y montar lo tuyo */
  /* la vida que se parte en dos */
  9001,   /* alguien que te importa */
  9010,   /* la conversacion: casarse */
  9011,   /* se rompio */
  9012,   /* un hijo */
  9021,   /* tu padre ya no puede solo */
  9022,   /* se murio */
];

/* El simbolo, el rotulo y el color de cada clase de escena. */
export const CLASE_ESCENA = (ev) => {
  if (!ev) return { k: "documento", n: "Memorando interno", c: "var(--gris)" };
  if (ev.legendaria) return { k: "corona", n: "Decisión legendaria", c: "var(--cobre)" };
  if (ev.rama) return { k: "bifurca", n: "Bifurcación", c: "var(--cobre)" };
  /* las de vida traen ventana de edad; las de oficina, de rango */
  if (ev.eMin != null || ev.eMax != null) return { k: "corazon", n: "Tu vida", c: "#B9532A" };
  if (ev.clave) return { k: "sello", n: "Decisión clave", c: "var(--tintaPapel)" };
  return { k: "documento", n: "Memorando interno", c: "var(--gris)" };
};

/* Que simbolo lleva cada cosa que se compra. Varias comparten el mismo:
   el icono dice de que familia es la compra, y el nombre dice cual. */
export const ICONO_BIEN = {
  /* mejoras */
  research: "libro", gym: "pesa", fiscal: "balanza", coach: "persona",
  asistente: "persona", prensa: "pluma", terminal: "grafico", abogado: "balanza",
  broker: "grafico", club: "copa", colchon: "escudo", mba: "libro",
  /* caprichos */
  viaje: "maleta", moto: "coche", reloj: "reloj", palco: "copa",
  carro: "coche", arte: "cuadro", boda: "anillo", apto: "casa",
  finca: "cafe", playa: "palmera", barco: "barco", hijos: "bebe",
  /* inmuebles */
  local: "edificio", ofi: "edificio", galpon: "edificio", edificio: "edificio",
  terreno: "terreno", hotel: "casa", centro: "edificio", isla: "palmera",
};

/* un icono de trazo, para lo que solo necesita identificarse */
export function Icono({ k, tam, tono }) {
  const d = TRAZOS[k];
  if (!d) return null;
  const n = numero(tam, 14);
  return (
    <svg className="ea-ico" width={n} height={n} viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke={tono || "currentColor"} strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ---- y el que se llena ----
   Un numero del 0 al 100 no dice nada de un vistazo. Un rayo que se
   llena hasta donde llega tu energia, si. El vaso vacio queda detras en
   tenue, y lo lleno se recorta con un rectangulo que sube. */
let SELLO_ID = 0;
function IconoLleno({ k, pct, tam, tono }) {
  const d = TRAZOS[k];
  const idRef = useRef(null);
  if (idRef.current === null) { SELLO_ID += 1; idRef.current = "eaLl" + SELLO_ID; }
  if (!d) return null;
  const n = numero(tam, 16);
  const p = clamp(numero(pct, 0) / 100, 0, 1);
  const alto = 24 * p;
  return (
    <svg className="ea-ico" width={n} height={n} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={idRef.current}>
          <rect x="0" y={24 - alto} width="24" height={alto} />
        </clipPath>
      </defs>
      <path d={d} fill="currentColor" opacity=".24" />
      <path d={d} fill={tono || "currentColor"} clipPath={"url(#" + idRef.current + ")"} />
    </svg>
  );
}

/* ---- las reglas dentro del minijuego ----
   Se quedaban puestas mientras juegas, ocupando un tercio de la pantalla
   con lo mismo que acababas de leer en la ficha de antes. Ahora se
   pliegan: quien las necesite las abre, y no estorban al que ya sabe. */
export function Pista({ children }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div>
      <button className="ea-recuerda ea-dis" onClick={() => setAbierta(!abierta)}>
        {abierta ? "↑ Ocultar las reglas" : "↓ Las reglas"}
      </button>
      {abierta && <div className="ea-pista ea-panelAb">{children}</div>}
    </div>
  );
}
