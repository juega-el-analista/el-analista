import { entero } from "./aritmetica.js";
import { E, D, DECISION_RAMA } from "../datos/escenas-carrera.js";
import { VIDA } from "../datos/escenas-vida.js";
import { LEGENDARIAS } from "../datos/legendarias.js";
import { escenaFirma } from "./firma-propia.js";
import { ESCENA_CONTRATO } from "../datos/contratos.js";
import { APERTURAS } from "../datos/aperturas.js";
import { DUENO } from "../datos/escenas-dueno.js";

/* ============================================================
   REHIDRATAR LA COLA DEL ANIO
   Una recarga a mitad de partida tiene que devolver al jugador a la
   misma decision, no al principio del anio. Para eso se guarda la cola
   de escenas del anio por **id**, no por objeto: las escenas llevan
   funciones dentro (cuando, requiere) y eso no se serializa.

   Guardar tras cada decision, sin mas, seria peor que el problema: al
   retomar tendrias los efectos ya aplicados y un anio nuevo entero por
   jugar, asi que se podria farmear el mismo anio dos veces. Por eso el
   snapshot se toma **al presentar cada escena**, antes de aplicar nada.
   ============================================================ */
const ESCENAS_FIJAS = [].concat(
  E, D, VIDA, LEGENDARIAS, DUENO,
  [DECISION_RAMA, ESCENA_CONTRATO],
  APERTURAS.map((a) => a.escena)
).filter((e) => e && e.id != null);

const IDS_FIRMA = [9720, 9721];

/* Devuelve la escena de ese id, o null. Las de firma propia se generan
   al vuelo desde el titulo del jugador, asi que se reconstruyen. */
const escenaDeId = (id, st) => {
  if (IDS_FIRMA.indexOf(id) >= 0) {
    try { return escenaFirma(st, id); } catch (e) { return null; }
  }
  const e = ESCENAS_FIJAS.find((x) => x.id === id);
  return e || null;
};

/* La cola guardada, convertida en escenas jugables. Cualquier id que ya
   no exista se descarta en silencio: el juego sigue con lo que quede. */
export const colaDeIds = (ids, st) =>
  (Array.isArray(ids) ? ids : [])
    .map((id) => escenaDeId(id, st))
    .filter((e) => e && e.t && Array.isArray(e.o) && e.o.length);

export const IDS_ESCENA_VALIDOS = ESCENAS_FIJAS.map((e) => e.id).concat(IDS_FIRMA);



/* si a un sistema ya le toca, por rango alcanzado o por año cumplido */
export const tocaAbrir = (st, a) =>
  entero(st && st.rango, 0, 0, 99) >= a.rango || entero(st && st.turno, 0, 0, 99) >= a.ano;

/* la única consulta que hace el resto del juego */
export const abierto = (st, id) =>
  !!(st && Array.isArray(st.abiertos) && st.abiertos.indexOf(id) >= 0);
