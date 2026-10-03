import { RANGOS, ACTIVOS } from "../datos/mercado.js";
import { JUEGOS } from "../datos/modos.js";
import { TOPE_PLATA, numero, esNumero, entero, texto, clamp } from "./aritmetica.js";
import { PERKS, CAPRICHOS } from "../datos/estilo-de-vida.js";
import { TEMAS } from "../datos/catedra.js";
import { PROPIEDADES, RAMAS } from "../datos/bienes-y-ramas.js";
import { NACIONES } from "../datos/paises.js";
import { CARRERAS } from "../datos/carreras.js";
import { BASE, PAREJAS, GENEROS, RITMOS, GASTOS } from "./estado-inicial.js";
import { saneaNombre, EDADES, META_MIN, META_MAX } from "./edad-y-metas.js";
import { PREMIOS } from "../datos/premios.js";
import { TOPE_MULT } from "../datos/contratos.js";
import { APERTURAS, IDS_APERTURA } from "../datos/aperturas.js";
import { IDS_ESCENA_VALIDOS, tocaAbrir } from "./cola-del-anio.js";
import { GUIA } from "./reglas.js";

/* ============================================================
   BLINDAJE . CAPA DOS: EL SANEADOR
   Toda partida que entra al estado, venga de un guardado, de una
   pestana vieja o de alguien jugando con la consola del navegador,
   pasa por sanear(). Lo que sale de aqui siempre cumple:
     . los numeros son finitos y estan dentro de rango
     . los identificadores existen de verdad en las tablas del juego
     . las listas estan acotadas, asi que el guardado no crece sin fin
     . no hay campos de mas ni de menos
   Si sanear() recibe basura devuelve una partida jugable, no un error.
   ============================================================ */
const IDS_PERK = PERKS.map((x) => x.id);
const IDS_BIEN = CAPRICHOS.concat(PROPIEDADES).map((x) => x.id);
const IDS_RAMA = RAMAS.map((x) => x.id);
const IDS_PAIS = NACIONES.map((x) => x.id);
const IDS_ESTUDIO = CARRERAS.map((x) => x.id);
const CLAVES_ACTIVO = ACTIVOS.map((a) => a.k);

const TOPE_TITULARES = 60;
const TOPE_VISTOS = 400;
const TOPE_HISTO = 60;
export const TOPE_CURVA = 384;   /* 32 años de meses: el recorrido de la cartera */
const TOPE_POSICIONES = 40;
const TOPE_OFERTA = 6;

export const unicos = (arr) => arr.filter((x, i) => arr.indexOf(x) === i);
const listaDe = (v, filtro, max) => (Array.isArray(v) ? v.filter(filtro) : []).slice(-max);

/* los pesos siempre suman uno, con el efectivo como residuo */
const saneaPesos = (w) => {
  const fuente = w && typeof w === "object" ? w : {};
  const out = {};
  let suma = 0;
  CLAVES_ACTIVO.forEach((k) => { const x = clamp(numero(fuente[k], 0), 0, 1); out[k] = x; suma += x; });
  if (suma > 1) { CLAVES_ACTIVO.forEach((k) => { out[k] = out[k] / suma; }); suma = 1; }
  out.efectivo = Math.max(0, 1 - suma);
  return out;
};

const saneaFondo = (f) => {
  if (!f || typeof f !== "object") return null;
  const tam = clamp(numero(f.tam, 0), 0, TOPE_PLATA);
  if (tam <= 0) return null;
  const pct = clamp(numero(f.pct, 0.02), 0, 0.5);
  const posiciones = (Array.isArray(f.posiciones) ? f.posiciones : [])
    .slice(0, TOPE_POSICIONES)
    .map((p) => (p && typeof p === "object" ? {
      n: texto(p.n, "Posicion", 60),
      s: texto(p.s, "", 60),
      ticket: clamp(numero(p.ticket, 0), 0, TOPE_PLATA),
      riesgo: entero(p.riesgo, 2, 1, 3),
      base: clamp(numero(p.base, 1.5), 0, 20),
      salida: entero(p.salida, 0, 0, 200),
    } : null))
    .filter((p) => p && p.ticket > 0);
  const oferta = (Array.isArray(f.oferta) ? f.oferta : [])
    .slice(0, TOPE_OFERTA)
    .map((o) => (o && typeof o === "object" ? {
      n: texto(o.n, "Oportunidad", 60),
      s: texto(o.s, "", 60),
      riesgo: entero(o.riesgo, 2, 1, 3),
      base: clamp(numero(o.base, 1.5), 0, 20),
      ticket: clamp(numero(o.ticket, 0), 0, TOPE_PLATA),
      tomado: o.tomado === true,
      d: texto(o.d, "", 120),
      crec: clamp(numero(o.crec, 0), -50, 200),
      mar: clamp(numero(o.mar, 0), -50, 100),
      conc: clamp(numero(o.conc, 0), 0, 100),
      deuda: clamp(numero(o.deuda, 0), 0, 20),
      foso: entero(o.foso, 1, 1, 3),
    } : null))
    .filter((o) => o && o.ticket > 0);
  const reciclado = clamp(numero(f.reciclado, 0), 0, TOPE_PLATA);
  return {
    tam, pct, reciclado,
    generacion: entero(f.generacion, 1, 1, 8),
    gp: clamp(numero(f.gp, 0), 0, tam),
    invertido: clamp(numero(f.invertido, 0), 0, tam + reciclado),
    realizado: clamp(numero(f.realizado, 0), -TOPE_PLATA, TOPE_PLATA),
    posiciones, oferta,
  };
};

export const sanear = (bruto) => {
  const r = bruto && typeof bruto === "object" ? bruto : {};
  const st = {};
  st.turno = entero(r.turno, 0, 0, 60);
  st.rango = entero(r.rango, 0, 0, RANGOS.length - 1);
  st.carrera = clamp(numero(r.carrera, 0), 0, 100000);
  ["mod", "cri", "red", "rep", "ene"].forEach((k) => { st[k] = clamp(numero(r[k], BASE[k]), 0, 100); });
  st.cash = clamp(numero(r.cash, 0), -TOPE_PLATA, TOPE_PLATA);
  st.cartera = clamp(numero(r.cartera, 0), 0, TOPE_PLATA);
  st.pais = IDS_PAIS.indexOf(r.pais) >= 0 ? r.pais : null;
  st.estudio = IDS_ESTUDIO.indexOf(r.estudio) >= 0 ? r.estudio : null;
  st.rama = IDS_RAMA.indexOf(r.rama) >= 0 ? r.rama : null;
  st.pesos = saneaPesos(r.pesos);
  st.objetivo = clamp(numero(r.objetivo, 0.7), 0, 1);
  st.perfil = texto(r.perfil, "medida", 24);
  st.perks = unicos(listaDe(r.perks, (x) => IDS_PERK.indexOf(x) >= 0, 40));
  st.bienes = unicos(listaDe(r.bienes, (x) => IDS_BIEN.indexOf(x) >= 0, 40));
  st.valores = {};
  st.bienes.forEach((id) => {
    const v = r.valores && typeof r.valores === "object" ? r.valores[id] : 0;
    st.valores[id] = clamp(numero(v, 0), 0, TOPE_PLATA);
  });
  st.histo = listaDe(r.histo, esNumero, TOPE_HISTO).map((x) => numero(x, 0));
  st.curva = listaDe(r.curva, esNumero, TOPE_CURVA)
    .map((x) => clamp(numero(x, 0), 0, TOPE_PLATA));
  st.lecs = unicos(listaDe(r.lecs, (x) => typeof x === "string" && x.length < 40, 20));
  st.titulares = listaDe(r.titulares, (x) => x && typeof x === "object", TOPE_TITULARES)
    .map((x) => ({ q: texto(x.q, "", 12), t: texto(x.t, "", 140) }))
    .filter((x) => x.t);
  st.vistos = unicos(listaDe(r.vistos, (x) => typeof x === "number" || typeof x === "string", TOPE_VISTOS));
  st.rotado = clamp(numero(r.rotado, 0), 0, 1e6);
  st.comisiones = clamp(numero(r.comisiones, 0), 0, TOPE_PLATA);
  st.gastoAnt = clamp(numero(r.gastoAnt, 0), 0, TOPE_PLATA);
  st.techo = clamp(numero(r.techo, 0), 0, TOPE_PLATA);
  st.burnouts = entero(r.burnouts, 0, 0, 20);
  st.despidos = entero(r.despidos, 0, 0, 9);
  st.deuda = clamp(numero(r.deuda, 0), 0, TOPE_PLATA);
  st.quiebras = entero(r.quiebras, 0, 0, 9);
  st.embargos = entero(r.embargos, 0, 0, 99);
  st.vetoCredito = entero(r.vetoCredito, 0, 0, 9);
  st.seguir = entero(r.seguir, 0, 0, 20);
  /* sin meta guardada son los treinta de siempre, para no cambiarle la
     partida por debajo a quien la empezo antes de que esto existiera */
  st.meta = entero(r.meta, 30, META_MIN, META_MAX);
  st.fondo = saneaFondo(r.fondo);
  st.shock = clamp(numero(r.shock, 0), -2, 2);
  st.pareja = PAREJAS.indexOf(r.pareja) >= 0 ? r.pareja : "solo";
  st.hijos = entero(r.hijos, 0, 0, 8);
  st.modo = "aprendiz";   /* un solo modo: los guardados en «normal» pasan a este */
  st.nombre = saneaNombre(r.nombre);
  st.genero = GENEROS.some((g) => g.id === r.genero) ? r.genero : null;
  st.ritmo = RITMOS.some((x) => x.id === r.ritmo) ? r.ritmo : "normal";
  st.nivelGasto = GASTOS.some((x) => x.id === r.nivelGasto) ? r.nivelGasto : "normal";
  st.guia = r.guia === true;
  st.guiaVistas = unicos(listaDe(r.guiaVistas, (x) => GUIA.some((g) => g.id === x), 20));
  /* Una partida guardada antes de la apertura escalonada no trae la
     lista: se reconstruye de su rango y su turno, para no quitarle nada
     de lo que ya tenía en pantalla. */
  st.temas = unicos(listaDe(r.temas, (x) => TEMAS.some((t) => t.id === x), 60));
  st.jugados = unicos(listaDe(r.jugados, (x) => !!JUEGOS[x], 30));
  st.animar = r.animar === true ? true : r.animar === false ? false : null;
  /* El patrón puede ser una firma de la tabla o una firma tuya, así que
     se acota por longitud en vez de por lista cerrada. */
  st.patron = texto(r.patron, "", 48);
  st.propia = r.propia === true;
  st.premios = unicos(listaDe(r.premios, (x) => PREMIOS.some((p) => p.id === x), 20));
  st.cola = listaDe(r.cola, (x) => IDS_ESCENA_VALIDOS.indexOf(x) >= 0, 14).map((x) => entero(x, 0, 0, 99999));
  st.sueldoMult = clamp(numero(r.sueldoMult, 1), 0.6, TOPE_MULT);
  st.contrato = (r.contrato && typeof r.contrato === "object")
    ? { anos: entero(r.contrato.anos, 3, 1, 10), desde: entero(r.contrato.desde, 0, 0, 60) }
    : null;
  st.abiertos = Array.isArray(r.abiertos)
    ? unicos(listaDe(r.abiertos, (x) => IDS_APERTURA.indexOf(x) >= 0, 20))
    : APERTURAS.filter((a) => tocaAbrir(st, a)).map((a) => a.id);
  st.edadIni = EDADES.some((x) => x.e === entero(r.edadIni, 20, 20, 50)) ? entero(r.edadIni, 20, 20, 50) : 20;
  st.estudia = clamp(numero(r.estudia, 0), 0, 500);
  st.hitoLibre = r.hitoLibre === true;
  st.hitoRenta = r.hitoRenta === true;
  st.hitoCartera = r.hitoCartera === true;
  return st;
};

/* una partida solo se ofrece para retomar si de verdad se puede jugar */
export const partidaJugable = (st) => !!(st && st.pais && st.estudio);
