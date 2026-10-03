import React, { useState, useEffect, useRef, useMemo } from "react";
import { RANGOS, ACTIVOS, EFECTIVO_MU, impactoActivo, ETIQ } from "../datos/mercado.js";
import {
  TOPE_PLATA,
  numero,
  entero,
  texto,
  clamp,
  gauss,
  fmt,
  elegirAzar,
} from "../motor/aritmetica.js";
import { PERKS, nivelDeVida, CAPRICHOS, NOTICIAS } from "../datos/estilo-de-vida.js";

import { PROPIEDADES } from "../datos/bienes-y-ramas.js";
import { EMPRESAS, baseDeal } from "../datos/fondo.js";
import { NACIONES } from "../datos/paises.js";
import { CARRERAS, PERFILES } from "../datos/carreras.js";
import {
  statsPesos,
  invertidoDe,
  rotacion,
  concentracion,
  COSTO_CAMBIO,
} from "../motor/cartera.js";
import { E, D, DECISION_RAMA, CADENA } from "../datos/escenas-carrera.js";
import { VIDA } from "../datos/escenas-vida.js";
import { escogerLeccion, HITOS } from "../datos/lecciones.js";
import {
  yaAceptoAviso,
  anotarAviso,
  leerMovimiento,
  anotarMovimiento,
  VERSION,
  guardarPartida,
  leerPartida,
  olvidarPartida,
} from "../motor/guardado.js";
import { BASE, COSTO_HIJO, PAREJAS, GENEROS, RITMO, NIVEL_GASTO } from "../motor/estado-inicial.js";
import {
  saneaNombre,
  PAREJA_TXT,
  MODO,
  EDAD_DE,
  TOPE_ABSOLUTO,
  DURACION,
  topeDe,
  edad,
  esClave,
  tiene,
  escalar,
} from "../motor/edad-y-metas.js";
import { premiosNuevos } from "../datos/premios.js";
import { LEGENDARIAS } from "../datos/legendarias.js";
import { FIRMA_DE, nombreRama, escenaFirma } from "../motor/firma-propia.js";
import {
  PATRONES,
  PATRONES_TODOS,
  otroPatron,
  TOPE_MULT,
  ESCENA_CONTRATO,
} from "../datos/contratos.js";
import { APERTURAS, SORPRESAS_BUENAS, SORPRESAS_MALAS } from "../datos/aperturas.js";
import { colaDeIds, tocaAbrir, abierto } from "../motor/cola-del-anio.js";
import { TOPE_CURVA, unicos, sanear, partidaJugable } from "../motor/saneador.js";
import { RANGO, GUIA, puedeComprar, ICONO_ATRIB } from "../motor/reglas.js";
import { faltaDe } from "../motor/requisitos.js";

import { ponerMovimiento, sinMovimiento } from "../hooks/movimiento.js";

import { DRAMA_IDS, Icono } from "../componentes/Iconos.jsx";

import { caminoAnual } from "../componentes/CaminoDelAnio.jsx";

import {
  ESCALA,
  cobrar,
  capacidadFondo,
  SALTO_FONDO,
  puedeSiguienteFondo,
  ROMANOS,
} from "../motor/fondo.js";
import {
  tasaPrestamo,
  topeCredito,
  CUOTA_DEUDA,
  EMBARGO_VECES,
  QUIEBRA_VECES,
  DESCUENTO_EMBARGO,
} from "../motor/deuda.js";
import { esDeEmpleado, DUENO } from "../datos/escenas-dueno.js";

/* ============================================================
   LA PARTIDA
   Todo el estado del juego y lo que lo mueve: la vida que se está
   jugando, la fase en la que está, la cola del año y cada acción que
   el jugador puede tomar. Es el mismo cuerpo que tenía el Motor, sin
   la parte que dibuja: esa ahora vive en src/vistas.

   Devuelve un solo objeto, ctx, con lo que las vistas necesitan. Las
   vistas no guardan estado de la partida: lo leen de aquí y llaman a
   estas funciones para cambiarlo, así que la fuente de verdad es una.
   ============================================================ */
export function usePartida() {
  /* Nada entra al estado sin pasar por sanear(). Aunque un evento o un
     minijuego devuelva un disparate, lo que queda guardado es jugable. */
  const [s, setSbruto] = useState(BASE);
  const setS = (upd) => setSbruto((prev) => {
    try {
      const bruto = typeof upd === "function" ? upd(prev) : upd;
      return sanear(bruto);
    } catch (e) {
      try { console.error("[El Analista] estado", e); } catch (_) {}
      return prev;
    }
  });

  /* La puerta. React agrupa los setState del mismo tick, asi que mirar
     "fase" para saber si una accion ya se ejecuto no sirve: dos clics
     seguidos ven el mismo valor viejo y la accion corre dos veces. La
     referencia se actualiza de inmediato, y con eso no hay doble cobro
     de resultados, doble cierre de ano ni doble ascenso. */
  const [fase, setFaseBruto] = useState(() => (yaAceptoAviso() ? "portada" : "aviso"));
  const puerta = useRef(yaAceptoAviso() ? "portada" : "aviso");
  const irA = (f) => { puerta.current = f; setFaseBruto(f); };
  const enFase = (f) => puerta.current === f;
  const cerrando = useRef(false);
  /* Las decisiones que se van tomando dentro del año, para poder
     situarlas en el gráfico. Vive en una referencia y no en el estado
     porque solo hace falta entre el arranque y el cierre del mismo año:
     no tiene sentido guardarlo en la partida. */
  const hitosAno = useRef([]);
  const [tab, setTab] = useState(null);
  /* que grupo de Comprar se esta mirando */
  const [grupo, setGrupo] = useState("caprichos");
  const [cola, setCola] = useState([]);
  /* Mientras la cartera tenga cambios a medias no se deja avanzar: antes
     se podía mover los pesos, seguir jugando y perder el cambio sin que
     nada lo dijera. */
  const [carteraPend, setCarteraPend] = useState(false);
  /* que sistema se acaba de abrir, para explicarlo antes de que el
     jugador tenga que adivinar para que sirve la seccion nueva */
  const [nuevoSistema, setNuevoSistema] = useState(null);
  /* la catedra avisa de que tema acaba de dar, y desde ese momento ese
     tema puede aparecer en un examen */
  const apuntarTema = (id) => setS((st) => {
    const ya = Array.isArray(st.temas) ? st.temas : [];
    if (!id || ya.indexOf(id) >= 0) return st;
    return { ...st, temas: ya.concat(id).slice(-60) };
  });
  /* queda anotado que ya leiste las reglas de este minijuego */
  const apuntarJuego = (k) => setS((st) => {
    const ya = Array.isArray(st.jugados) ? st.jugados : [];
    if (!k || ya.indexOf(k) >= 0) return st;
    return { ...st, jugados: ya.concat(k).slice(-30) };
  });
  const [ev, setEv] = useState(null);
  const [op, setOp] = useState(null);
  const [res, setRes] = useState(null);
  const [cierre, setCierre] = useState(null);
  const [fin, setFin] = useState(null);
  const [guardado, setGuardado] = useState(null);
  const [aviso, setAviso] = useState("");
  /* el aviso legal entero, plegado por defecto */
  const [avisoLargo, setAvisoLargo] = useState(false);
  /* la pantalla del rodillo, que tapa el informe hasta que el jugador
     ha visto cuanto tiene ahora */
  const [anuncio, setAnuncio] = useState(false);
  /* la segunda mitad de la leccion del año, la de las cifras propias */
  const [verLeccion, setVerLeccion] = useState(false);
  /* el movimiento: del navegador, no de la partida */
  const [animar, setAnimarBruto] = useState(leerMovimiento);
  const setAnimar = (v) => { anotarMovimiento(v); setAnimarBruto(v); };
  /* Las cuatro decisiones de partida viven aquí y NO tocan el estado del
     juego hasta que la partida arranca de verdad. Por eso se puede volver
     atrás sin deshacer nada, y por eso pulsar dos veces un país ya no
     duplica sus bonos: no hay nada acumulado que duplicar. */
  /* El modo arranca en Aprendiz a proposito: es el que explica cada
     termino antes de usarlo, y quien ya sabe de esto lo cambia en un
     clic. Al reves —empezar en Analista— el que no sabe no se entera de
     que existia la ayuda hasta que ya se perdio. */
  const SETUP0 = { nombre: "", genero: null, modo: "aprendiz", edad: 20, pais: null, estudio: null, guia: null,
    pareja: "solo", hijos: 0, duracion: "decada" };
  const [elec, setElec] = useState(SETUP0);
  const aceptarAviso = () => { anotarAviso(); irA("portada"); };

  const elige = (campo, valor, siguiente) => {
    setElec((x) => ({ ...x, [campo]: valor }));
    irA(siguiente);
  };

  /* al abrir, mira si hay una partida a medio camino */
  useEffect(() => {
    let vivo = true;
    leerPartida()
      .then((d) => {
        if (!vivo || !d) return;
        const st = sanear(d.s);
        if (!partidaJugable(st)) return;
        setGuardado({ v: VERSION, ts: numero(d.ts, 0), s: st });
        /* Y se entra directo donde estaba. Antes la recarga te dejaba en la
           portada teniendo que pulsar «Retomar», que es exactamente lo que
           convierte una recarga ajena en una interrupción. El aviso legal
           sigue mandando: si no se ha aceptado, no se entra a nada. */
        if (yaAceptoAviso() && colaDeIds(st.cola, st).length) {
          entrarEnPartida(st, "Vuelves donde estabas");
        }
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  /* Ahora se guarda en cada escena, no una vez al año, así que el aviso
     de «Partida guardada» pasa a ser opcional: si saltara siempre estaría
     parpadeando en la cinta todo el rato. */
  const persistir = (st, callado) => {
    let limpio;
    try { limpio = sanear(st); } catch (e) { return; }
    guardarPartida(limpio)
      .then((ok) => {
        if (!callado) setAviso(ok ? "Partida guardada" : "");
        if (ok) setGuardado({ v: VERSION, ts: Date.now(), s: limpio });
      })
      .catch(() => { if (!callado) setAviso(""); });
  };
  const tirarPartida = () => {
    try { const p = olvidarPartida(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
    setGuardado(null); setAviso("");
  };

  /* Escape cierra la seccion abierta. El guardarraíl de window es por el
     arnes de pruebas, que monta un window falso sin addEventListener. */
  useEffect(() => {
    if (!tab) return;
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
    const alPulsar = (e) => { if (e.key === "Escape" && !carteraPend) setTab(null); };
    window.addEventListener("keydown", alPulsar);
    return () => {
      try { window.removeEventListener("keydown", alPulsar); } catch (err) { /* nada */ }
    };
  }, [tab, carteraPend]);

  const tope = topeDe(s);
  const nacion = NACIONES.find((x) => x.id === s.pais) || NACIONES[0];
  const estudio = CARRERAS.find((x) => x.id === s.estudio) || CARRERAS[0];
  const pesosAct = s.pesos || PERFILES[0].w;
  const mezclaAct = { ...pesosAct, efectivo: Math.max(0, 1 - invertidoDe(pesosAct)) };
  const presetAct = PERFILES.find((x) => rotacion(x.w, mezclaAct) < 0.02);
  const perfilN = presetAct ? presetAct.n : "a tu medida";

  const bienDe = (id) => CAPRICHOS.concat(PROPIEDADES).find((x) => x.id === id);
  const valorBienes = (st) => st.bienes.reduce((a, id) => {
    const c = bienDe(id);
    return a + (c && c.tipo !== "consumo" ? (st.valores[id] || 0) : 0);
  }, 0);
  const vidaTotal = (st) => st.bienes.reduce((a, id) => a + ((bienDe(id) || {}).vida || 0), 0);
  const paisDe = (st) => NACIONES.find((x) => x.id === st.pais) || NACIONES[0];
  const salarioAnual = (st) =>
    RANGO(st.rango).salario * 12 * paisDe(st).sal * clamp(numero(st.sueldoMult, 1), 0.6, TOPE_MULT);
  const impuestoDe = (st) => paisDe(st).tax;
  const netoAnual = (st) => salarioAnual(st) * (1 - impuestoDe(st));
  const gastoAnual = (st) => {
    const na = paisDe(st);
    let g = netoAnual(st) * (0.55 + st.rango * 0.02) + 3500 * na.gas;
    /* cada dependiente cuesta, y una pareja abarata el gasto por cabeza
       sin llegar a costar cero: dos no viven por el precio de uno */
    g += st.hijos * COSTO_HIJO * na.gas;
    if (st.pareja === "casado") g *= 1.28;
    else if (st.pareja === "noviazgo") g *= 1.08;
    else if (st.pareja === "divorciado") g *= 1.12;   /* pensión y dos casas */
    g *= NIVEL_GASTO(st.nivelGasto).f;   /* cómo decidiste vivir */
    if (tiene(st, "fiscal")) g *= 0.85;
    st.bienes.forEach((id) => { g += ((bienDe(id) || {}).up || 0) * 2; });
    return g;
  };

  const visible = (o, st) => {
    if (!o.req) return true;
    if (o.req.est && o.req.est !== st.estudio) return false;
    if (o.req.pais && o.req.pais.indexOf(st.pais) < 0) return false;
    if (o.req.noPais && o.req.noPais === st.pais) return false;
    return true;
  };

  const sacar = (fuente, st, usados) => {
    /* con firma propia no salen las de empleado, y sin ella no salen las de dueño */
    const cabe = (e) => st.rango >= e.min && st.rango <= e.max && usados.indexOf(e.id) < 0
      && !(st.propia && esDeEmpleado(e)) && !(e.dueno && !st.propia);
    let pool = fuente.filter((e) => cabe(e) && st.vistos.indexOf(e.id) < 0);
    if (pool.length === 0) pool = fuente.filter(cabe);
    return pool.length ? elegirAzar(pool) : null;
  };

  /* escenas de vida disponibles: filtran por edad y por estado familiar,
     y las marcadas "una" no se repiten nunca en la misma partida */
  const vidaDisponible = (st) => {
    const e = edad(st.turno, st.edadIni);
    return VIDA.filter((v) => {
      if (e < v.eMin || e > v.eMax) return false;
      if (v.una && st.vistos.indexOf(v.id) >= 0) return false;
      if (v.cuando) { try { if (!v.cuando(st)) return false; } catch (err) { return false; } }
      return true;
    });
  };

  const generarAno = (st) => {
    const lista = [];
    const usados = [];
    /* Lo primero del año: si algo se abre, se abre como escena y es el
       acontecimiento del año. Nunca más de una, para que llegar a un
       sistema nuevo no se sienta como que se destapó un menú. */
    const nueva = APERTURAS.filter((a) => !abierto(st, a.id) && tocaAbrir(st, a))[0];
    if (nueva) { lista.push(nueva.escena); usados.push(nueva.escena.id); }
    /* Y si el contrato llegó a su fin, eso manda sobre cualquier otra
       cosa del año: es la escena que decide tu sueldo. Se empuja a mano
       para que pueda repetirse toda la partida. */
    const con = st.contrato;
    if (con && st.turno >= numero(con.desde, 0) + numero(con.anos, 3)) {
      lista.push(ESCENA_CONTRATO);
      usados.push(ESCENA_CONTRATO.id);
    }
    /* Una sola tirada al año, y solo pasados los primeros años: una
       legendaria en el año uno no significaría nada porque todavía no hay
       carrera que partir en dos. */
    if (st.turno >= 4 && Math.random() < 0.11) {
      const posibles = LEGENDARIAS.filter((e) =>
        st.rango >= e.min && st.rango <= e.max && !(st.propia && esDeEmpleado(e))
        && st.vistos.indexOf(e.id) < 0 && usados.indexOf(e.id) < 0);
      const leg = elegirAzar(posibles);
      if (leg) { lista.push(leg); usados.push(leg.id); }
    }

    /* Montar lo tuyo se ofrece al llegar a Asociado y otra vez más
       arriba: decir «no ahora» no puede ser decir «no nunca». */
    if (!st.propia) {
      const ofertas = [[3, 9720], [5, 9721]];
      for (let k = 0; k < ofertas.length; k++) {
        const rangoMin = ofertas[k][0], idEsc = ofertas[k][1];
        if (st.rango >= rangoMin && st.vistos.indexOf(idEsc) < 0 && usados.indexOf(idEsc) < 0) {
          lista.push(escenaFirma(st, idEsc));
          usados.push(idEsc);
          break;
        }
      }
    }
    /* Cuántas escenas se empujaron a mano (apertura, contrato, legendaria,
       firma propia). Se cuenta AQUÍ, antes de la vida, la bifurcación y la
       decisión clave: esas tres siempre entraron dentro del presupuesto
       normal del año, así que contarlas también duplicaba la duración del
       año. Solo lo empujado a mano tiene que sumar. */
    const forzadas = lista.length;

    /* la vida no espera a que te asciendan: casi todos los años pasa algo */
    const vidas = vidaDisponible(st).filter((v) => usados.indexOf(v.id) < 0 && st.vistos.indexOf(v.id) < 0);
    /* Subida de 0,62 a 0,78: con 0,62 y las escenas de pareja limitadas,
       una vida entera podía pasar sin una sola decisión personal después
       de los veinte. */
    if (vidas.length && Math.random() < 0.78) {
      /* Las escenas con condición de estado (tienes pareja, tienes hijos)
         solo existen mientras dure ese estado, así que si están sobre la
         mesa tienen prioridad. Si no, la cadena noviazgo-matrimonio-hijos
         casi nunca llegaría a completarse antes de que se acabe la vida. */
      const encadenadas = vidas.filter((v) => typeof v.cuando === "function");
      const pozo = encadenadas.length && Math.random() < 0.7 ? encadenadas : vidas;
      /* dentro del pozo mandan las de mayor prioridad: primero te
         preguntan si te casas y solo después aparece la ruptura */
      const maxPri = Math.max.apply(null, pozo.map((v) => numero(v.pri, 2)));
      const top = pozo.filter((v) => numero(v.pri, 2) === maxPri);
      const v = elegirAzar(top);
      if (v) { lista.push(v); usados.push(v.id); }
    }
    if (!st.rama && st.rango >= 3) { lista.push(DECISION_RAMA); usados.push(999); }
    if (esClave(st.turno)) {
      const k = sacar(D, st, usados);
      if (k) { lista.push(k); usados.push(k.id); }
    }
    /* La escena de apertura se SUMA al anio, no ocupa el sitio de un
       evento: si no, el anio en que se abre algo pierde variedad y se
       dejan de ver minijuegos que solo cuelgan de escenas aleatorias. */
    /* Todo lo que se empujó a mano hasta aquí (apertura, contrato, firma
       propia, legendaria) se SUMA al año en vez de ocupar el sitio de un
       evento normal. Ya me costó una vez: descontar la apertura hacía que
       se dejara de ver el minijuego de trading. */
    const objetivo = Math.min(forzadas + 2 + (Math.random() < 0.45 ? 1 : 0), 5);
    while (lista.length < objetivo) {
      const e = sacar(st.propia ? E.concat(DUENO) : E, st, usados);
      if (!e) break;
      lista.push(e); usados.push(e.id);
    }
    return lista;
  };

  /* una escena solo sirve si tiene opciones jugables */
  const escenaValida = (e) => !!(e && e.t && Array.isArray(e.o) && e.o.length);

  /* Las que se juegan a pantalla completa. Primero lo probe con todas las
     «clave» y salian siete por partida, casi una por año: si todo es
     dramatico, nada lo es. Las veinte decisiones clave del juego salen
     cada dos años y muchas son rutina de oficina. Esto es mas estrecho:
     las legendarias, las bifurcaciones y los momentos que parten una
     vida en dos, que se nombran uno por uno. */
  const pesada = (e) => !!(e && (e.legendaria || e.rama || DRAMA_IDS.indexOf(e.id) >= 0));
  /* presenta una escena, con anuncio si toca */
  const ponerEscena = (e) => {
    setEv(e);
    setOp(null);
    irA("evento");
  };

  const arrancarAno = (st) => {
    hitosAno.current = [];
    let lista = [];
    try { lista = generarAno(st) || []; } catch (e) { lista = []; }
    lista = lista.filter(escenaValida);
    if (lista.length === 0) {
      const enRango = E.filter((e) => escenaValida(e) && st.rango >= e.min && st.rango <= e.max);
      const uno = elegirAzar(enRango.length ? enRango : E.filter(escenaValida));
      if (uno) lista = [uno];
    }
    if (lista.length === 0) {
      /* caso imposible en la practica, pero si pasara el ano se cierra
         igual en vez de dejar la pantalla en blanco */
      setCola([]); setOp(null); setEv(null);
      setRes({ msg: "Un ano sin sobresaltos en la oficina.", nivel: "parcial", cambios: [] });
      irA("resultado");
      return;
    }
    setCola(lista.slice(1));
    ponerEscena(lista[0]);
    /* El snapshot va aquí, con la escena todavía sin resolver: así una
       recarga devuelve a esta misma decisión y no hay nada que duplicar. */
    guardarEscena(st, lista);
  };

  /* Guarda el estado tal como está ahora más la cola pendiente, por id.
     La cola no se mete en el estado de React: solo viaja al guardado. */
  const guardarEscena = (st, pendientes) => {
    var ids = (Array.isArray(pendientes) ? pendientes : [])
      .map(function (e) { return e && e.id != null ? e.id : null; })
      .filter(function (x) { return x != null; });
    persistir({ ...st, cola: ids }, true);
  };

  /* Construye la partida entera de una vez, a partir de las cuatro
     elecciones. Un único lugar donde se suman bonos, así que no hay
     forma de aplicarlos dos veces ni de que se pierdan por el camino. */
  const arrancarPartida = (sel) => {
    const na = NACIONES.find((x) => x.id === sel.pais) || NACIONES[0];
    const ca = CARRERAS.find((x) => x.id === sel.estudio) || CARRERAS[0];
    const ed = EDAD_DE(sel.edad);

    let st = {
      ...BASE, pesos: { ...PERFILES[0].w }, perks: [], bienes: [], valores: {},
      titulares: [], vistos: [], histo: [], lecs: [],
    };
    st.modo = MODO(sel.modo).id;
    st.nombre = saneaNombre(sel.nombre);
    st.genero = GENEROS.some((g) => g.id === sel.genero) ? sel.genero : null;
    st.guia = sel.guia === true;
    st.guiaVistas = [];

    /* cuánto va a durar esto antes de que se le pregunte si se retira */
    st.meta = DURACION("decada").meta;   /* siempre diez años; luego, seguir si quieres */

    /* la edad: años de trayectoria, ahorro y desgaste */
    st.edadIni = ed.e;
    st.carrera = numero(st.carrera, 0) + numero(ed.car, 0);
    Object.keys(ed.mods || {}).forEach((k) => { st[k] = clamp(numero(st[k], 0) + ed.mods[k], 0, 100); });

    /* La familia con la que llegas, solo si empiezas pasados los 30.
       No hace falta bloquear escenas a mano: las de vida ya se filtran
       por st.pareja y st.hijos, así que declararse casado apaga sola la
       escena que te pregunta si quieres pareja. */
    if (ed.e >= 30) {
      st.pareja = PAREJAS.indexOf(sel.pareja) >= 0 ? sel.pareja : "solo";
      st.hijos = entero(sel.hijos, 0, 0, 4);
    }

    /* el país: efectivo de partida, más lo que la edad traía ahorrado */
    st.pais = na.id;
    st.cash = numero(na.cash, 0) + numero(ed.cash, 0);
    Object.keys(na.mods || {}).forEach((k) => { st[k] = clamp(numero(st[k], 0) + na.mods[k], 0, 100); });

    /* la formación */
    st.estudio = ca.id;
    Object.keys(ca.mods || {}).forEach((k) => { st[k] = clamp(numero(st[k], 0) + ca.mods[k], 0, 100); });

    /* el cargo se pone al día con la trayectoria que traes */
    while (st.rango < RANGOS.length - 1 && st.carrera >= RANGOS[st.rango].umbral) st.rango += 1;

    /* Y con el cargo se abren los sistemas que ese cargo ya justifica.
       Sin esto, empezar a los 40 como Asociado te obligaba a "descubrir"
       durante cinco años que existen las carteras, cuando el umbral de la
       cartera es rango 1 y tú ya entras en rango 3. Lo que queda por
       encima de tu rango sí llega como escena, que es lo que se buscaba. */
    st.abiertos = APERTURAS.filter((a) => st.rango >= a.rango).map((a) => a.id);

    /* La firma por la que entraste, según lo que estudiaste, y el primer
       contrato: corto, para que la primera renegociación llegue pronto y
       el jugador entienda el mecanismo mientras aún importa poco. */
    st.patron = elegirAzar(PATRONES[ca.id] || PATRONES_TODOS) || "";
    st.contrato = { anos: ed.e <= 20 ? 3 : 2, desde: 0 };
    st.sueldoMult = 1;

    st.titulares = [{
      q: "2026",
      t: ed.e <= 20
        ? "Te gradúas de " + ca.n + " en " + na.ban
        : "Entras al sector a los " + ed.e + ", con tu título de " + ca.n + " en " + na.ban,
    }];
    st.histo = [st.cash];   /* punto de partida, para que el primer cierre ya tenga curva */

    st = sanear(st);
    setS(st);
    arrancarAno(st);
  };

  const empezar = () => {
    tirarPartida();
    setS({ ...BASE, pesos: { ...PERFILES[0].w }, perks: [], bienes: [], valores: {}, titulares: [], vistos: [], histo: [], lecs: [] });
    setElec(SETUP0);
    setFin(null); setRes(null); setCierre(null); setTab(null); irA("identidad");
  };

  /* el rastro de lo ya elegido, para que se vea qué hay detrás del Atrás */
  const rastro = () => {
    const partes = ["Empiezas a los " + EDAD_DE(elec.edad).e];
    const na = NACIONES.find((x) => x.id === elec.pais);
    if (na) partes.push(na.n);
    return partes.join(" · ");
  };

  const Atras = ({ a, texto: rot }) => (
    <button className="ea-atras ea-dis" onClick={() => { if (enFase(fase)) irA(a); }}>
      &larr; {rot}
    </button>
  );

  /* retomar donde quedó: se reanuda al comienzo del año siguiente */
  const retomar = () => {
    if (!guardado) return;
    entrarEnPartida(sanear(guardado.s), "Partida retomada");
  };

  /* Entra en una partida guardada. Si trae cola, se rehidrata y el jugador
     vuelve a la decisión exacta en la que estaba; si no la trae (guardado
     viejo, o guardado al cerrar el año), se arranca el año como antes. */
  const entrarEnPartida = (st, aviso) => {
    if (!partidaJugable(st)) { tirarPartida(); return; }
    setS(st);
    setFin(null); setRes(null); setCierre(null); setTab(null);
    if (aviso) setAviso(aviso);
    const pendientes = colaDeIds(st.cola, st);
    if (pendientes.length) {
      setCola(pendientes.slice(1));
      ponerEscena(pendientes[0]);
      return;
    }
    arrancarAno(st);
  };

  /* aplica pesos nuevos y reparto nuevo, cobrando lo que cuesta moverse */
  const aplicarCartera = (nuevos, obj) => setS((st) => {
    const act = { ...(st.pesos || PERFILES[0].w) };
    act.efectivo = Math.max(0, 1 - invertidoDe(act));
    const dst = { ...nuevos, efectivo: Math.max(0, 1 - invertidoDe(nuevos)) };
    const rot = rotacion(act, dst);
    const o = clamp(obj, 0, 1);
    const liq = st.cash + st.cartera;
    let cartera = st.cartera, cash = st.cash, mov = 0;
    if (liq > 0) { cartera = liq * o; cash = liq - cartera; mov = Math.abs(cartera - st.cartera); }
    const costo = cartera * rot * COSTO_CAMBIO + mov * COSTO_CAMBIO * 0.5;
    const igual = PERFILES.find((x) => rotacion(x.w, dst) < 0.02);
    return {
      ...st, pesos: dst, objetivo: o, perfil: igual ? igual.id : "medida",
      cartera: Math.max(0, cartera - costo), cash,
      comisiones: (st.comisiones || 0) + costo, rotado: (st.rotado || 0) + rot,
    };
  });

  /* pedir prestado: entra en efectivo y sube la deuda */
  const ponerRitmo = (id) => setS((st) => ({ ...st, ritmo: RITMO(id).id }));
  const ponerGasto = (id) => setS((st) => ({ ...st, nivelGasto: NIVEL_GASTO(id).id }));

  const pedirPrestamo = (monto) => setS((st) => {
    const neto = netoAnual(st);
    const tope = topeCredito(st, neto, valorBienes(st));
    const m = clamp(numero(monto, 0), 0, tope);
    if (m < 100) return st;
    return {
      ...st, cash: st.cash + m, deuda: clamp(numero(st.deuda, 0) + m, 0, TOPE_PLATA),
      titulares: st.titulares.concat({ q: String(2026 + st.turno), t: "Pides prestados USD " + fmt(m) }),
    };
  });

  /* pagar por adelantado: lo mejor que puedes hacer con dinero ocioso
     cuando la tasa de tu deuda supera lo que rinde tu cartera */
  const pagarDeuda = (monto) => setS((st) => {
    const m = clamp(numero(monto, 0), 0, Math.min(numero(st.deuda, 0), Math.max(0, st.cash)));
    if (m < 50) return st;
    return { ...st, cash: st.cash - m, deuda: clamp(numero(st.deuda, 0) - m, 0, TOPE_PLATA) };
  });

  const comprarPerk = (p) => setS((st) => {
    if (st.cash + st.cartera < p.c || tiene(st, p.id)) return st;
    const r = cobrar(st, p.c);
    const n = { ...st, cash: r.cash, cartera: r.cartera, perks: st.perks.concat(p.id) };
    if (p.id === "mba") n.cri = clamp(n.cri + 8, 0, 100);
    n.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Compras " + p.n.toLowerCase() });
    return n;
  });

  const comprarBien = (c) => {
    /* Los mismos guardarraíles que el reductor, pero aquí fuera, para
       poder decidir la sorpresa y avisar de ella sin meter efectos en el
       reductor. El reductor los vuelve a comprobar de todas formas. */
    if (s.cash + s.cartera < c.c || s.bienes.indexOf(c.id) >= 0) return;
    if (!puedeComprar(c, s)) return;
    const dado = Math.random();
    const sor = dado < 0.22 ? elegirAzar(SORPRESAS_BUENAS)
      : dado < 0.44 ? elegirAzar(SORPRESAS_MALAS) : null;
    aplicarCompra(c, sor);
    if (sor) setAviso(sor.msg);
  };

  const aplicarCompra = (c, sor) => setS((st) => {
    if (st.cash + st.cartera < c.c || st.bienes.indexOf(c.id) >= 0) return st;
    if (!puedeComprar(c, st)) return st;
    const r = cobrar(st, c.c);
    const n = { ...st, cash: r.cash, cartera: r.cartera, bienes: st.bienes.concat(c.id), valores: { ...st.valores, [c.id]: c.c } };
    if (c.ene) n.ene = clamp(n.ene + c.ene, 0, 100);
    if (c.red) n.red = clamp(n.red + c.red, 0, 100);
    if (c.rep) n.rep = clamp(n.rep + c.rep, 0, 100);
    /* Si pagas la boda estando de novios, te casas: no tendria sentido
       pagarla y seguir figurando como pareja sin mas. */
    if (c.id === "boda" && st.pareja === "noviazgo") n.pareja = "casado";

    if (sor) {
      if (sor.pct) n.valores = { ...n.valores, [c.id]: clamp(numero(n.valores[c.id], 0) * (1 + sor.pct), 0, TOPE_PLATA) };
      if (sor.cash) {
        const monto = c.c * sor.cash;
        if (monto >= 0) n.cash = clamp(n.cash + monto, -TOPE_PLATA, TOPE_PLATA);
        else { const r2 = cobrar(n, -monto); n.cash = r2.cash; n.cartera = r2.cartera; }
      }
      ["red", "rep", "ene", "cri", "mod"].forEach((k) => {
        if (sor[k]) n[k] = clamp(numero(n[k], 0) + sor[k], 0, 100);
      });
      n.titulares = n.titulares.concat({ q: String(2026 + st.turno), t: sor.msg });
    }
    n.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Compras " + c.n.toLowerCase() });
    return n;
  });

  const levantarFondo = (t) => setS((st) => {
    const pct = st.rama === "pe" ? 0.01 : 0.02;
    const gp = t.m * pct;
    if (st.cash + st.cartera < gp || st.fondo) return st;
    const r = cobrar(st, gp);
    return {
      ...st, cash: r.cash, cartera: r.cartera,
      fondo: { tam: t.m, gp, pct, invertido: 0, posiciones: [], realizado: 0, oferta: [], reciclado: 0, generacion: 1 },
      titulares: st.titulares.concat({ q: String(2026 + st.turno), t: "Levantas tu propio fondo de " + t.n }),
    };
  });

  /* levantar la siguiente generación: más grande, con el historial que
     ya tienes y sin límite superior */
  const levantarSiguiente = () => setS((st) => {
    if (!puedeSiguienteFondo(st)) return st;
    const f = st.fondo;
    const nuevoTam = clamp(numero(f.tam, 0) * SALTO_FONDO, 0, TOPE_PLATA);
    const gp = nuevoTam * f.pct;
    if (st.cash + st.cartera < gp) return st;
    const r = cobrar(st, gp);
    const gen = entero(numero(f.generacion, 1) + 1, 2, 2, 8);
    return {
      ...st, cash: r.cash, cartera: r.cartera,
      fondo: {
        ...f, tam: nuevoTam, gp, invertido: numero(f.invertido, 0),
        reciclado: numero(f.reciclado, 0), generacion: gen,
      },
      titulares: st.titulares.concat({
        q: String(2026 + st.turno),
        t: "Levantas tu fondo " + (ROMANOS[gen] || gen) + " de " + fmt(nuevoTam),
      }),
    };
  });

  const invertirEn = (idx, mult) => setS((st) => {
    const f = st.fondo;
    if (!f || !Array.isArray(f.oferta) || !f.oferta.length) return st;
    const i = entero(idx, -1, 0, f.oferta.length - 1);
    const m = clamp(numero(mult, 1), 0.1, 1);
    const deal = f.oferta[i];
    if (!deal || deal.tomado) return st;
    const cap = capacidadFondo(f);
    const ticket = Math.round(clamp(numero(deal.ticket, 0) * m, 0, cap));
    if (ticket <= 0 || f.invertido + ticket > cap) return st;
    const oferta = f.oferta.slice();
    oferta[i] = { ...deal, tomado: true };
    const pos = f.posiciones.concat({
      n: deal.n, s: deal.s, ticket, riesgo: deal.riesgo, base: deal.base,
      salida: st.turno + 3 + Math.floor(Math.random() * 3),
    });
    return { ...st, fondo: { ...f, invertido: f.invertido + ticket, posiciones: pos, oferta } };
  });

  /* ---------- resolución de una escena ---------- */
  const resolverEscena = (dBruto, nivelBruto, o) => {
    const d = dBruto && typeof dBruto === "object" ? dBruto : {};
    const nivel = nivelBruto === "exito" || nivelBruto === "parcial" || nivelBruto === "fallo" ? nivelBruto : "parcial";
    let st = { ...s, valores: { ...s.valores } };
    const cambios = [];
    if (o && o.ramaId) st.rama = o.ramaId;
    if (o && o.firmaPropia && !st.propia) {
      const f = FIRMA_DE(st);
      /* Si el minijuego sale mal montas la firma igual, pero arrancas
         tocado: renunciar ya es irreversible cuando entregas la carta. */
      const bien = nivel === "exito" ? 1 : nivel === "parcial" ? 0.6 : 0.25;
      const r2 = cobrar(st, f.costo);
      st.cash = r2.cash; st.cartera = r2.cartera;
      st.propia = true;
      st.patron = f.n;
      st.rama = st.rama || "boutique";
      st.contrato = null;                 /* ya no hay quien te renueve nada */
      st.sueldoMult = clamp(numero(st.sueldoMult, 1) * (1 + (f.mult - 1) * bien), 0.6, TOPE_MULT);
      Object.keys(f.mods).forEach((k) => {
        st[k] = clamp(numero(st[k], 0) + f.mods[k] * bien, 0, 100);
      });
      st.titulares = st.titulares.concat({
        q: String(2026 + st.turno),
        t: "Montas " + f.n.toLowerCase(),
      });
    }
    if (o && o.contrato) {
      st.contrato = { anos: entero(o.contrato.anos, 3, 1, 10), desde: st.turno };
      /* Si la opción pasaba por negociar, el aumento depende de cómo te
         fue negociando: firmar bien y firmar mal no pueden pagar igual.
         Las opciones sin minijuego dan lo que prometen. */
      const negociada = !!(o.j || o.juego);
      const parte = !negociada ? 1 : nivel === "exito" ? 1 : nivel === "parcial" ? 0.55 : 0;
      const mult = 1 + (numero(o.contrato.mult, 1) - 1) * parte;
      st.sueldoMult = clamp(numero(st.sueldoMult, 1) * mult, 0.6, TOPE_MULT);
      /* Y si la negociación se cayó del todo, tampoco te mudas de firma:
         te quedas donde estabas, con el plazo nuevo y sin subida. */
      if (o.cambiaPatron && parte > 0) {
        const antes = st.patron;
        st.patron = otroPatron(st);
        st.titulares = st.titulares.concat({
          q: String(2026 + st.turno),
          t: "Te vas de " + (antes || "tu firma") + " a " + st.patron,
        });
      }
    }
    if (o && o.abre) {
      st.abiertos = unicos((Array.isArray(st.abiertos) ? st.abiertos : []).concat(o.abre));
      setNuevoSistema(o.abre);
    }
    if (o && o.mudar) st.pais = o.mudar;

    /* --- la vida --- */
    if (d.pareja && PAREJAS.indexOf(d.pareja) >= 0) st.pareja = d.pareja;
    if (d.hijos) st.hijos = entero(st.hijos + d.hijos, 0, 0, 8);
    if (d.estudia) st.estudia = clamp(st.estudia + numero(d.estudia, 0), 0, 500);
    /* un divorcio no resta una cifra fija: se lleva un porcentaje de todo */
    if (d.patPct) {
      const corte = clamp(numero(d.patPct, 0), 0, 0.6);
      const antes = st.cash + st.cartera;
      const quita = antes * corte;
      const r2 = cobrar(st, quita);
      st.cash = r2.cash; st.cartera = r2.cartera;
      cambios.push({ k: "cash", v: -Math.round(quita) });
    }

    ["mod", "cri", "red", "rep", "ene", "car"].forEach((k) => {
      if (!d[k]) return;
      let v = d[k];
      if (k === "rep" && v < 0 && tiene(st, "abogado")) v = Math.round(v * 0.6);
      if (k === "car") st.carrera += v;
      else st[k] = clamp(st[k] + v, 0, 100);
      cambios.push({ k, v });
    });
    if (d.cash) {
      let monto = Math.round(d.cash * ESCALA[st.rango]);
      /* el criterio no evita el golpe, lo amortigua: hasta un tercio
         menos de pérdida cuando de verdad sabes lo que haces */
      if (monto < 0 && st.cri > 55) {
        const amortigua = clamp((st.cri - 55) / 130, 0, 0.34);
        const ahorrado = Math.round(-monto * amortigua);
        if (ahorrado > 0) {
          monto += ahorrado;
          cambios.push({ k: "cri", v: 0, nota: "tu criterio te ahorró " + fmt(ahorrado) });
        }
      }
      if (monto >= 0) st.cash += monto;
      else { const r = cobrar(st, -monto); st.cash = r.cash; st.cartera = r.cartera; }
      cambios.push({ k: "cash", v: monto });
    }
    if (d.mercado) st.shock = (st.shock || 0) + d.mercado;
    if (d.msg) st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: d.msg.split(".")[0] });
    if (ev && ev.id != null) st.vistos = st.vistos.concat(ev.id);

    if (o && o.sigue && nivel === "exito" && CADENA[o.sigue]) {
      const extra = [].concat(CADENA[o.sigue]).filter(escenaValida);
      if (extra.length) setCola((c) => c.concat(extra).slice(0, 12));
    }

    setS(st);
    /* queda anotado qué decidiste, con qué resultado y qué costó */
    const enCaja = (cambios.find((c) => c.k === "cash") || {}).v || 0;
    hitosAno.current = hitosAno.current.concat({
      t: texto((ev && ev.t) || (o && o.t) || "Una decisión", "Una decisión", 60),
      nivel, cash: numero(enCaja, 0),
    }).slice(-6);

    setRes({ msg: texto(d.msg, "El asunto quedo cerrado.", 600), nivel, cambios });
    irA("resultado");
  };

  /* ---------- cierre del año ---------- */
  /* El cierre es la rutina mas larga del juego y la que mas cuentas hace.
     Si algo revienta ahi dentro, no se pierden treinta anos de partida:
     se pasa de ano con un informe minimo y se sigue jugando. */
  const cerrarAno = () => {
    if (cerrando.current) return;
    cerrando.current = true;
    try {
      cierreDelAno();
    } catch (e) {
      try { console.error("[El Analista] cierre de ano", e); } catch (_) {}
      const st = sanear({ ...s, turno: s.turno + 1, ene: clamp(s.ene - 8, 0, 100) });
      setS(st);
      setCierre({
        ano: 2026 + s.turno, notis: [], ascenso: null, cartera: null,
        notas: ["Este ano no se pudo levantar el informe completo. La partida sigue intacta."],
        ing: [], egr: [], ingreso: 0, egreso: 0, neto: 0, ahorro: 0,
        patAntes: 0, patrimonio: st.cash + st.cartera, bienesV: 0,
        histo: st.histo, leccion: null, hitos: [], deuda: false,
        cobertura: 0, gastos: 0, indep: 0,
      });
      irA("cierre");
    } finally {
      cerrando.current = false;
    }
  };

  const cierreDelAno = () => {
    let st = { ...s, valores: { ...s.valores } };
    const ing = [], egr = [], notas = [];
    const na = NACIONES.find((x) => x.id === st.pais) || NACIONES[0];
    const patAntes = st.cash + st.cartera + valorBienes(st) - numero(st.deuda, 0);
    const gastoAnt = st.gastoAnt || 0;

    if (tiene(st, "research")) st.mod = clamp(st.mod + 2, 0, 100);
    if (tiene(st, "club")) st.red = clamp(st.red + 2, 0, 100);
    if (tiene(st, "prensa")) st.rep = clamp(st.rep + 2, 0, 100);
    if (tiene(st, "gym")) st.ene = clamp(st.ene + 6, 0, 100);
    if (tiene(st, "asistente")) { st.carrera += 2; st.ene = clamp(st.ene + 4, 0, 100); }
    if (tiene(st, "mba")) st.carrera += 2;
    if (st.rama === "mya") st.carrera += 2;
    if (st.rama === "mercados") st.mod = clamp(st.mod + 2, 0, 100);
    if (st.rama === "patrimonio") st.red = clamp(st.red + 2, 0, 100);
    if (st.rama === "boutique") st.rep = clamp(st.rep + 2, 0, 100);

    /* ---- lo que entra ---- */
    const salario = salarioAnual(st);
    const multB = clamp(0.5 + st.rep / 90 + st.carrera / 400, 0.3, 3);
    const bono = RANGO(st.rango).salario * multB * na.sal;
    ing.push({ n: "Sueldo", v: salario });
    ing.push({ n: "Bono por desempeño", v: bono });

    if (st.rama === "boutique") {
      const v = salario * (Math.random() * 0.8 - 0.2);
      if (v >= 0) ing.push({ n: "Variable de la boutique", v });
      else egr.push({ n: "Año flojo de la boutique", v: -v });
    }
    if (st.rama === "mercados") ing.push({ n: "Participación en colocaciones", v: salario * 0.14 });

    let renta = 0;
    st.bienes.forEach((id) => { renta += ((bienDe(id) || {}).renta || 0) * 2; });
    if (renta) ing.push({ n: "Renta de propiedades", v: renta });

    if (st.fondo) {
      const f = { ...st.fondo, posiciones: st.fondo.posiciones.slice() };
      ing.push({ n: "Comisión de administración del fondo", v: f.tam * 0.02 });
      const quedan = [];
      let realizado = 0;
      let devuelto = 0;
      f.posiciones.forEach((pp) => {
        if (st.turno < pp.salida) { quedan.push(pp); return; }
        const disp = 0.28 + pp.riesgo * 0.22;
        let m = Math.max(0, pp.base + disp * gauss() + (st.rama === "pe" ? 0.15 : 0));
        const proceeds = pp.ticket * m;
        const carry = Math.max(0, proceeds - pp.ticket * 1.4) * 0.2;
        const proRata = (proceeds - pp.ticket) * f.pct;
        realizado += carry + proRata;
        f.realizado += proceeds - pp.ticket;
        /* El capital vuelve al fondo. Sin esto, "invertido" solo subía y
           el fondo quedaba muerto en cuanto se desplegaba todo: nunca
           volvía a haber una sola oportunidad sobre la mesa. */
        devuelto += pp.ticket;
        /* Parte de la ganancia se queda dentro para volver a invertirse:
           es lo que hace que el fondo crezca solo. Está en el 35 por
           ciento y con tope de dos veces el capital comprometido porque
           al 50 y sin tope el fondo multiplicaba por quince en diez
           rotaciones y dejaba sin sentido al resto de la partida. */
        f.reciclado = clamp(
          numero(f.reciclado, 0) + Math.max(0, proceeds - pp.ticket) * 0.35,
          0, numero(f.tam, 0) * 2
        );
        notas.push(`Sale ${pp.n} a ${m.toFixed(2)}x. Tu parte, USD ${fmt(carry + proRata)}. Vuelven al fondo USD ${fmt(pp.ticket)} para reinvertir.`);
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: `Salida de ${pp.n} a ${m.toFixed(2)}x` });
      });
      if (realizado) ing.push({ n: "Carry e inversión propia del fondo", v: realizado });
      f.posiciones = quedan;
      f.invertido = clamp(numero(f.invertido, 0) - devuelto, 0, TOPE_PLATA);
      const libre = capacidadFondo(f) - f.invertido;
      /* cuantas más ganas, más deal flow te llega: tres o cuatro nombres
         en vez de dos, para que haya de dónde elegir */
      const cuantasOfertas = f.realizado > f.tam * 0.25 ? 4 : 3;
      f.oferta = libre > capacidadFondo(f) * 0.04
        ? EMPRESAS.slice().sort(() => Math.random() - 0.5).slice(0, cuantasOfertas).map((e) => ({
            n: e.n, s: e.s, riesgo: e.riesgo, base: baseDeal(e), tomado: false,
            crec: e.crec, mar: e.mar, conc: e.conc, deuda: e.deuda, foso: e.foso, d: e.d,
            ticket: Math.max(100000, Math.round(Math.min(libre * 0.45, capacidadFondo(f) * (0.07 + numero(Math.random(), 0.5) * 0.08)) / 100000) * 100000),
          }))
        : [];
      st.fondo = f;
    }

    /* ---- lo que sale ---- */
    const ingreso = ing.reduce((a, x) => a + x.v, 0);
    const gravable = salario + bono;
    const impuesto = gravable * na.tax;
    const gastos = gastoAnual(st);
    egr.push({ n: `Impuesto sobre la renta, ${Math.round(na.tax * 100)}%`, v: impuesto });
    egr.push({ n: "Costo de vida", v: gastos });
    const egreso = egr.reduce((a, x) => a + x.v, 0);
    const neto = ingreso - egreso;
    st.cash += neto;
    const ahorro = ingreso > 0 ? clamp(neto / ingreso, -2, 1) : 0;

    /* ---- noticias del año, sesgadas por el país ---- */
    let notis = [];
    const conSesgo = NOTICIAS.filter((x) => x.k === na.sesgo);
    notis.push(Math.random() < 0.4 && conSesgo.length ? elegirAzar(conSesgo) : elegirAzar(NOTICIAS));
    if (Math.random() < 0.45) {
      const seg = elegirAzar(NOTICIAS);
      if (seg && notis[0] && seg.t !== notis[0].t) notis.push(seg);
    }
    notis = notis.filter((x) => x && x.i);

    /* ---- lo que debes ---- */
    const netoDeAno = salario + bono;
    /* normalizar antes de operar: sanear() ya lo garantiza en la partida,
       pero este bloque hace aritmética con la deuda y no debe fiarse */
    st.deuda = clamp(numero(st.deuda, 0), 0, TOPE_PLATA);
    st.vetoCredito = Math.max(0, entero(st.vetoCredito, 0, 0, 9) - 1);
    if (numero(st.deuda, 0) > 0) {
      const tasa = tasaPrestamo(st);
      const interes = st.deuda * tasa;
      st.deuda = clamp(st.deuda + interes, 0, TOPE_PLATA);
      const cuota = Math.min(st.deuda, st.deuda * CUOTA_DEUDA + interes * 0);
      egr.push({ n: "Intereses y cuota de la deuda, " + Math.round(tasa * 100) + "%", v: interes + cuota });
      const r2 = cobrar(st, cuota);
      st.cash = r2.cash; st.cartera = r2.cartera;
      st.deuda = clamp(st.deuda - cuota, 0, TOPE_PLATA);
    }

    /* si el año cierra en rojo, eso no desaparece: se convierte en deuda
       cara, que es exactamente lo que pasa cuando te vas al descubierto */
    if (st.cash < 0) {
      const hueco = -st.cash;
      st.cash = 0;
      st.deuda = clamp(st.deuda + hueco * 1.08, 0, TOPE_PLATA);
      notas.push("Cerraste el año en rojo por USD " + fmt(hueco) + ". El banco lo cubre y te lo cobra: pasa a tu deuda con recargo.");
    }

    /* ---- embargo: el banco se cobra con lo que haya ---- */
    if (st.deuda > Math.max(1, netoDeAno) * EMBARGO_VECES && st.bienes.length > 0) {
      const porValor = st.bienes.slice().sort((a, b) => numero(st.valores[b], 0) - numero(st.valores[a], 0));
      let recaudado = 0;
      const perdidos = [];
      for (let i = 0; i < porValor.length; i++) {
        if (st.deuda <= Math.max(1, netoDeAno) * 2) break;
        const id = porValor[i];
        const c = bienDe(id);
        const valor = numero(st.valores[id], 0);
        if (!c || valor <= 0) continue;
        const saca = valor * DESCUENTO_EMBARGO;
        recaudado += saca;
        st.deuda = clamp(st.deuda - saca, 0, TOPE_PLATA);
        perdidos.push(c.n);
        st.bienes = st.bienes.filter((x) => x !== id);
        delete st.valores[id];
      }
      if (perdidos.length) {
        st.embargos = entero(st.embargos + perdidos.length, 1, 0, 99);
        st.rep = clamp(st.rep - 5, 0, 100);
        notas.push("Embargo. Se llevan " + perdidos.join(", ") + " y lo rematan por USD " + fmt(recaudado)
          + ", bastante menos de lo que valía. Así se paga el dinero que no se tiene.");
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Te embargan " + perdidos[0].toLowerCase() });
      }
    }

    /* ---- quiebra: cuando ya no hay de dónde ---- */
    if (st.deuda > Math.max(1, netoDeAno) * QUIEBRA_VECES && st.cartera + st.cash < st.deuda * 0.25) {
      const borrada = st.deuda;
      st.deuda = 0;
      st.cartera = 0;
      st.bienes.forEach((id) => { delete st.valores[id]; });
      st.bienes = [];
      st.quiebras = entero(st.quiebras + 1, 1, 0, 9);
      st.vetoCredito = 5;
      st.rep = clamp(st.rep - 20, 0, 100);
      st.ene = clamp(st.ene - 10, 0, 100);
      notas.push("Te declaras en quiebra. Se borran USD " + fmt(borrada) + " de deuda y con ellos todo lo que tenías: "
        + "cartera, bienes y buena parte de tu nombre. Nadie te presta un dólar en cinco años. No es el final, es volver a empezar.");
      st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Te declaras en quiebra" });
    }

    /* ---- reparto entre cartera y efectivo, según TU objetivo ---- */
    const obj = clamp(st.objetivo == null ? 0.7 : st.objetivo, 0, 1);
    const liquido = st.cash + st.cartera;
    let aporte = 0, deuda = false;
    if (liquido > 0) {
      const meta = liquido * obj;
      aporte = meta - st.cartera;
      st.cartera = meta;
      st.cash = liquido - meta;
    } else {
      aporte = -st.cartera;
      st.cartera = 0;
      st.cash = liquido;
      deuda = true;
    }

    /* ---- el año en los mercados ---- */
    const w = st.pesos || PERFILES[0].w;
    const vol = tiene(st, "broker") ? 0.75 : 1;
    const zm = gauss();                      /* el factor común: lo que le pasa a todo el mercado */
    const wEf = Math.max(0, 1 - invertidoDe(w));
    let ret = wEf * EFECTIVO_MU;
    let beta = 0;
    const detalle = [];
    ACTIVOS.forEach((a) => {
      const x = w[a.k] || 0;
      if (!x) return;
      let imp = impactoActivo(a.k, notis);
      if (imp < 0 && tiene(st, "colchon")) imp *= 0.5;
      const idio = Math.sqrt(Math.max(0.12, 1 - a.b * a.b));
      const rA = a.mu + a.sd * vol * (a.b * zm + idio * gauss()) + imp;
      ret += x * rA;
      beta += x * a.b;
      detalle.push({ n: a.n, w: x, r: rA });
    });
    if (wEf > 0.005) detalle.push({ n: "Efectivo dentro de la cartera", w: wEf, r: EFECTIVO_MU });
    detalle.sort((a, b) => b.w - a.w);
    if (tiene(st, "terminal")) ret += 0.01;
    if (st.rama === "patrimonio") ret += 0.02;
    if (st.shock) { ret += st.shock; st.shock = 0; }

    const carteraAntes = st.cartera;
    st.cartera = Math.max(0, st.cartera * (1 + ret));
    const est = statsPesos({ ...w, efectivo: wEf });
    let sdSuma = 0;
    ACTIVOS.forEach((a) => { sdSuma += (w[a.k] || 0) * a.sd; });
    /* el recorrido mes a mes, con la volatilidad de esta cartera concreta */
    const camino = caminoAnual(carteraAntes, st.cartera, est.sd, 12);
    /* las decisiones se reparten a lo largo del año en el orden en que se
       tomaron: con tres escenas caen en marzo, junio y septiembre */
    const cuantos = hitosAno.current.length;
    const hitosDecision = hitosAno.current.map((x, i) => ({
      ...x, mes: Math.max(1, Math.min(12, Math.round(((i + 1) * 12) / (cuantos + 1)))),
    }));
    st.curva = (Array.isArray(st.curva) ? st.curva : []).concat(camino.slice(1)).slice(-TOPE_CURVA);
    const cartera = { antes: carteraAntes, despues: st.cartera, ret, detalle, aporte, obj, mu: est.mu, sd: est.sd, beta, camino, hitos: hitosDecision };

    /* ---- bienes ---- */
    st.bienes.forEach((id) => {
      const c = bienDe(id);
      if (!c) return;
      const v = st.valores[id] || 0;
      st.valores[id] = c.tipo === "consumo" ? v * (1 - (c.dep || 0) * 2) : v * (1 + (c.ap || 0) * 2);
    });

    /* lo que eligieron el ritmo y el tren de vida */
    const rt = RITMO(st.ritmo), gv = NIVEL_GASTO(st.nivelGasto);
    st.carrera += rt.car;
    st.rep = clamp(st.rep + rt.rep + gv.rep, 0, 100);
    if (rt.car || gv.f !== 1) {
      notas.push("Este año fuiste a ritmo " + rt.n.toLowerCase() + " y viviste de forma " + gv.n.toLowerCase()
        + ": " + (rt.car ? "+" + rt.car + " de carrera" : "sin empujar la carrera")
        + " y un gasto " + (gv.f > 1 ? Math.round((gv.f - 1) * 100) + "% por encima"
          : gv.f < 1 ? Math.round((1 - gv.f) * 100) + "% por debajo" : "en su nivel") + " de lo normal.");
    }

    let desgaste = (tiene(st, "coach") ? 5 : 8) + (st.rama === "boutique" ? 3 : 0);
    desgaste += -(rt.ene) - gv.ene;   /* el ritmo cansa, vivir bien descansa */
    if (st.pareja === "casado" || st.pareja === "noviazgo") desgaste -= 3;   /* alguien con quien contar */
    desgaste += Math.min(6, entero(st.hijos, 0, 0, 8) * 2);                  /* y alguien a quien cuidar */
    st.ene = clamp(st.ene - desgaste, 0, 100);
    /* Por debajo de la mitad el cuerpo se impone: duermes, cancelas, bajas
       el ritmo. No te devuelve a ochenta, pero rompe la caída libre que
       hacía imposible pasar del año diez. */
    if (st.ene < 50) {
      st.ene = clamp(st.ene + 6, 0, 100);
      if (st.ene < 35) notas.push("Estás funcionando a media máquina. El cuerpo te está cobrando las horas.");
    }
    let terminar = null;
    if (st.ene <= 0) {
      st.burnouts += 1;
      st.ene = 55; st.rep = clamp(st.rep - 8, 0, 100); st.cash -= 3000;
      notas.push("Te quiebras. Meses fuera y un regreso más lento de lo que admites.");
      if (st.burnouts >= 4) terminar = "burnout";
    }
    if (st.rep <= 6) {
      st.despidos = entero(numero(st.despidos, 0) + 1, 1, 0, 9);
      if (st.rango === 0) {
        /* siendo pasante no hay de dónde bajar: te quedas sin el puesto
           y vuelves a empezar en otra casa, con la carrera tocada.
           Nunca termina la partida: quedarse sin trabajo no es morirse. */
        st.rep = 26; st.carrera = Math.max(0, st.carrera - 6);
        st.cash -= 2000;
        notas.push("Te dejan ir. Encuentras sitio en otra casa, pero llegas de cero y con la reputación por reconstruir.");
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Te dejan ir y empiezas en otra casa" });
      } else {
        st.rango = Math.max(0, st.rango - 1);
        st.rep = 28;
        st.carrera = Math.max(0, RANGO(st.rango).umbral - 4);
        notas.push("Te bajan de cargo. No es el final, y en esta industria esas cosas se recuerdan un par de años.");
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Bajas a " + RANGO(st.rango).n });
      }
    }
    /* el aviso que antes no existía */
    if (!terminar && st.rep < 20 && st.rep > 6) {
      notas.push("Tu reputación está en " + Math.round(st.rep) + " de cien. Por debajo de seis te dejan ir: conviene aceptar algún encargo incómodo antes de que sea tarde.");
    }

    let ascenso = null;
    if (st.rango < RANGOS.length - 1 && st.carrera >= RANGO(st.rango).umbral && st.rep >= 25) {
      st.rango += 1;
      ascenso = RANGO(st.rango).n;
      st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Ascenso a " + ascenso });
    }

    /* ---- foto del año ---- */
    const bienesV = valorBienes(st);
    const patrimonio = st.cash + st.cartera + bienesV - numero(st.deuda, 0);
    const consumo = st.bienes.reduce((a, id) => {
      const c = bienDe(id);
      return a + (c && c.tipo === "consumo" ? c.c : 0);
    }, 0);
    const mantiene = st.bienes.reduce((a, id) => a + ((bienDe(id) || {}).up || 0) * 2, 0);
    const cobertura = gastos > 0 ? (patrimonio * 0.04 + renta) / gastos : 0;

    const hitos = [];
    HITOS.forEach((h) => { if (patrimonio >= h.v && (st.techo || 0) < h.v) hitos.push(h.t); });
    if (patrimonio > (st.techo || 0)) st.techo = patrimonio;
    if (cobertura >= 1 && (st.hitoLibre !== true)) { hitos.push("Cubres tu costo de vida"); st.hitoLibre = true; }
    if (renta > 0 && !st.hitoRenta) { hitos.push("Primera renta pasiva"); st.hitoRenta = true; }
    if (st.cartera > salario && !st.hitoCartera) { hitos.push("Tu cartera supera tu sueldo anual"); st.hitoCartera = true; }
    if (ascenso) hitos.push("Ascenso a " + ascenso);

    const ctx = {
      turno: st.turno, edad: edad(st.turno, st.edadIni), ahorro, ret, deltaC: cartera.despues - cartera.antes,
      muC: est.mu, sdC: est.sd, sdCsuma: sdSuma, betaC: beta, patrimonio, patAntes,
      gastos, gastoAnt, ingreso, impuesto, salario, cash: st.cash, cartera: st.cartera,
      objetivo: obj, pesos: w, conc: concentracion(w), rentaProps: renta, consumo,
      cobertura, comisiones: st.comisiones || 0, fondo: st.fondo, pais: st.pais, tax: na.tax,
      ene: st.ene, bienesV, rotado: st.rotado || 0, mantenimiento: mantiene,
    };
    const leccion = escogerLeccion(ctx, st.lecs || []);
    if (leccion) st.lecs = (st.lecs || []).concat(leccion.id).slice(-20);

    /* Los reconocimientos se conceden solos: si ya te toca, te toca. */
    premiosNuevos(st).forEach((p) => {
      st.premios = (Array.isArray(st.premios) ? st.premios : []).concat(p.id);
      st.rep = clamp(numero(st.rep, 0) + (p.mundial ? 14 : 7), 0, 100);
      st.red = clamp(numero(st.red, 0) + (p.mundial ? 10 : 5), 0, 100);
      notas.push((p.mundial ? "Reconocimiento mundial: " : "Reconocimiento nacional: ") + p.n + ". " + p.x);
      st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Recibes el " + p.n });
    });

    st.histo = (st.histo || []).concat(patrimonio);
    st.gastoAnt = gastos;

    const ano = 2026 + st.turno;
    st.turno += 1;
    st = sanear(st);
    setS(st);
    setCierre({
      ano, notis, ascenso, cartera, notas, ing, egr, ingreso, egreso, neto, ahorro,
      patAntes, patrimonio, bienesV, histo: st.histo, leccion, hitos, deuda,
      /* "hitos" ya lo usan los hitos de patrimonio; las decisiones del
         año van por su propia clave para que no se pisen */
      hitosDec: cartera.hitos,
      cobertura, gastos, indep: gastos > 0 ? clamp(patrimonio / (gastos * 25), 0, 1.4) : 0,
    });
    if (terminar) setFin(terminar);
    setAnuncio(true);       /* primero el rodillo, y despues el informe */
    setVerLeccion(false);   /* la leccion del año nuevo vuelve a su titular */
    irA("cierre");
  };

  const ayudaDe = (o) => {
    const tipo = o.juego || o.j;
    let a = s[o.stat] || 30;
    const ca = CARRERAS.find((x) => x.id === s.estudio);
    if (ca && ca.juegos.indexOf(tipo) >= 0) a += 18;
    if (tiene(s, "terminal") && ["ojo", "reaccion", "calculo", "semaforo", "trading"].indexOf(tipo) >= 0) a += 15;
    if (tiene(s, "club") && tipo === "anclaje") a += 15;
    if (s.rama === "pe" && ["estructura", "banderas"].indexOf(tipo) >= 0) a += 15;
    if (s.rama === "mercados" && ["trading", "calculo"].indexOf(tipo) >= 0) a += 15;
    a += MODO(s.modo).ayuda;   /* el modo aprendiz perdona más */
    return clamp(a, 0, 100);
  };

  const elegir = (o) => {
    if (!enFase("evento") || !o) return;
    /* El boton ya sale apagado, pero el guardarrail va tambien aqui: un
       disabled solo detiene al raton. Con la salvedad de siempre, que si
       no queda ninguna disponible se puede tomar cualquiera. */
    try {
      const ops = opcionesDe(ev);
      const faltas = ops.map((x) => faltaDe(x, s));
      const todasFuera = faltas.length > 0 && faltas.every(Boolean);
      if (!todasFuera && faltaDe(o, s)) return;
    } catch (e) { /* ante la duda, se deja decidir */ }
    setOp(o);
    if (o.juego || o.j) { irA("minijuego"); return; }
    if (o.chk) {
      const p = clamp((s[o.chk.s] - o.chk.dif) / 55 + 0.5, 0.12, 0.9);
      const ok = Math.random() < p;
      resolverEscena(ok ? o.chk.ok : o.chk.no, ok ? "exito" : "fallo", o);
    } else resolverEscena(o.d, "exito", o);
  };

  const finJuego = (nivel) => {
    if (!enFase("minijuego") || !op) return;
    const base = op.res ? op.res[nivel] : escalar(op.d || {}, nivel);
    resolverEscena(base || {}, nivel, op);
  };

  const siguienteEscena = () => {
    if (!enFase("resultado")) return;
    const resto = (Array.isArray(cola) ? cola : []).filter(escenaValida);
    if (resto.length > 0) {
      setCola(resto.slice(1)); ponerEscena(resto[0]);
      guardarEscena(s, resto);
    } else cerrarAno();
  };

  const siguienteAno = () => {
    if (!enFase("cierre")) return;
    if (fin) { tirarPartida(); irA("fin"); return; }
    if (s.turno >= tope) {
      /* Antes el juego te jubilaba por decreto a la segunda prórroga.
         Ahora solo se acaba solo cuando ya no queda tabla que estirar. */
      if (topeDe(s) >= TOPE_ABSOLUTO) { tirarPartida(); setFin("completo"); irA("fin"); return; }
      persistir(s); irA("retiro"); return;
    }
    persistir(s);
    arrancarAno(s);
  };

  const retirarse = () => { tirarPartida(); setFin("retiro"); irA("fin"); };
  const seguirCinco = () => {
    const st = { ...s, seguir: entero(s.seguir + 1, 1, 0, 20) };
    setS(st); persistir(st); arrancarAno(st);
  };

  /* el inventario final, partido en lo que conserva valor y lo que no */
  const conservanValor = s.bienes
    .map((id) => ({ c: bienDe(id), pagado: 0, hoy: numero(s.valores[id], 0) }))
    .filter((x) => x.c && x.c.tipo !== "consumo")
    .map((x) => ({ ...x, pagado: numero(x.c.c, 0) }));
  const totalPagado = conservanValor.reduce((a, x) => a + x.pagado, 0);
  const totalHoy = conservanValor.reduce((a, x) => a + x.hoy, 0);
  const soloConsumo = s.bienes.map(bienDe).filter((c) => c && c.tipo === "consumo");
  const gastadoEnConsumo = soloConsumo.reduce((a, c) => a + numero(c.c, 0), 0);
  const consumoN = soloConsumo.length;

  const bienesVal = valorBienes(s);
  const valorFondo = s.fondo ? s.fondo.posiciones.reduce((a, p) => a + p.ticket * s.fondo.pct, 0) : 0;
  const patrimonio = s.cash + s.cartera + bienesVal + valorFondo - numero(s.deuda, 0);
  const gastosAnuales = gastoAnual(s);
  const retiroAnual = patrimonio * 0.04;
  const rentaProps = s.bienes.reduce((a, id) => a + ((bienDe(id) || {}).renta || 0), 0) * 2;
  const cobertura = gastosAnuales > 0 ? (retiroAnual + rentaProps * 0.5) / gastosAnuales : 0;

  /* lo que hace falta para contar cómo vives, no solo cuánto tienes */
  const indiceVida = vidaTotal(s);
  const nivelVida = nivelDeVida(indiceVida);
  const mantenimientoAnual = s.bienes.reduce((a, id) => a + ((bienDe(id) || {}).up || 0) * 2, 0);
  const costoHijos = s.hijos * COSTO_HIJO * nacion.gas;
  const netoDelAno = netoAnual(s);
  const pesoTren = netoDelAno > 0 ? gastosAnuales / netoDelAno : 1;

  /* Una partida corta no se puede juzgar con la vara de una carrera
     entera. En diez anios la cobertura no llega a uno ni jugando
     perfecto, asi que con la escalera larga TODA partida corta caia en
     el veredicto mas duro —y encima le decia al jugador que habia
     trabajado tres decadas. Por debajo de veinte anios se mide lo unico
     que de verdad se puede medir en ese plazo: cuantos anios de sueldo
     neto llevas guardados. */
  const veredicto = useMemo(() => {
    if (fin === "despido") return { t: "Salida por la puerta de atrás", x: "Tu reputación se agotó antes que tu talento. En esta industria el capital más escaso no es el financiero." };
    if (fin === "burnout") return { t: "El cuerpo cobró la cuenta", x: "Llegaste lejos y a un costo que no aparece en ningún estado financiero." };
    if (s.fondo && cobertura >= 1.5) return { t: "Del otro lado de la mesa", x: "Terminaste administrando capital propio y ajeno, con un patrimonio que cubre tu vida sin depender de nadie. Muy pocos cruzan esa línea." };
    if (cobertura >= 1.5 && s.rango >= 5) return { t: "Te retiraste arriba y con el número resuelto", x: "Cargo alto, patrimonio que cubre tus gastos con holgura y una red que te sobrevive." };
    if (cobertura >= 1) return { t: "Libertad financiera", x: "Tu patrimonio cubre tu forma de vivir sin que tengas que volver a la oficina. Ya no trabajas porque necesites." };

    const anos = entero(s.turno, 0, 0, 60);
    if (anos < 20) {
      const neto = netoAnual(s);
      const veces = neto > 0 ? patrimonio / neto : 0;
      const cuantos = anos + (anos === 1 ? " año" : " años");
      if (patrimonio < 0) return { t: "Cerraste debiendo", x: "Después de " + cuantos + " sales con el patrimonio en negativo. Pasa, y se sale: lo que no se puede es no mirarlo. La deuda cara se paga antes que cualquier inversión." };
      if (veces >= 5) return { t: "Arrancaste muy por delante", x: "En " + cuantos + " guardaste " + veces.toFixed(1) + " años de tu sueldo neto. A este ritmo el interés compuesto hace el resto del trabajo: mira abajo lo que traían los años que no jugaste." };
      if (veces >= 2.5) return { t: "Vas bien encaminado", x: "Llevas " + veces.toFixed(1) + " años de sueldo guardados en " + cuantos + ". Es una base de verdad, y la parte difícil —empezar— ya está hecha." };
      if (veces >= 1) return { t: "Empezaste, que es lo que casi nadie hace", x: "Un año entero de sueldo guardado en " + cuantos + ". No suena a mucho y es exactamente donde se separa el que acumula del que no." };
      return { t: "Todo se fue en vivir", x: "Después de " + cuantos + " no queda casi nada guardado. No es raro: el gasto persigue al sueldo solo, y la única forma de romperlo es apartar el ahorro el día que cobras, no a fin de mes." };
    }

    if (cobertura >= 0.6) return { t: "Casi, pero todavía no", x: "Tienes un patrimonio serio y aun así te falta para cubrir tu tren de vida. O trabajas unos años más, o el tren de vida se ajusta." };
    if (s.rango >= 5) return { t: "Llegaste alto y gastaste igual de alto", x: "El cargo lo conseguiste. El patrimonio para sostenerlo sin sueldo, no. Es un final más común de lo que parece." };
    return { t: "El sueldo era el plan", x: "Trabajaste " + anos + " años y sigues dependiendo del próximo pago. La carrera no fue mala, la acumulación sí." };
  }, [fin, cobertura, s.rango, s.fondo, s.turno, patrimonio]);

  /* Si los requisitos dejaran una escena sin ninguna opcion visible, el
     jugador quedaria encerrado. Antes que eso, se le muestran todas. */
  /* el primer aviso pendiente cuyo momento haya llegado */
  const avisoGuia = (() => {
    if (!s.guia) return null;
    const ctx = { fase, tab, vistas: Array.isArray(s.guiaVistas) ? s.guiaVistas : [] };
    for (let i = 0; i < GUIA.length; i++) {
      const g = GUIA[i];
      if (ctx.vistas.indexOf(g.id) >= 0) continue;
      let toca = false;
      try { toca = !!g.cuando(ctx); } catch (e) { toca = false; }
      if (toca) return g;
    }
    return null;
  })();

  const cerrarAviso = (id) => setS((st) => ({
    ...st, guiaVistas: (Array.isArray(st.guiaVistas) ? st.guiaVistas : []).concat(id),
  }));

  const opcionesDe = (e) => {
    const todas = e && Array.isArray(e.o) ? e.o.filter((o) => o && o.t) : [];
    const vis = todas.filter((o) => { try { return visible(o, s); } catch (err) { return false; } });
    return vis.length ? vis : todas;
  };

  /* El icono va junto al nombre del atributo: es el unico sitio donde se
     ven los dos juntos, y con eso se aprende que el rayo es energia sin
     que nadie tenga que explicarlo. */
  const Stat = ({ k, v, ene }) => (
    <div className="ea-stat">
      <div className="ea-statTop">
        <span className="ea-dis ea-statN"><Icono k={ICONO_ATRIB[k]} tam={13} />{ETIQ[k]}</span>
        <span className="ea-mono">{Math.round(v)}</span>
      </div>
      <div className="ea-bar"><div className={"ea-fill" + (ene ? " ene" : "") + (v < 25 ? " baja" : "")} style={{ width: v + "%" }} /></div>
    </div>
  );

  const selloTxt = { exito: "Ejecutado", parcial: "A medias", fallo: "Fallido" };
  const selloCls = { exito: "", parcial: " med", fallo: " mal" };
  /* La barra solo muestra lo que ya está abierto: en el primer año son
     dos secciones, no siete. El tercer elemento de cada par es la llave. */
  /* ============================================================
     CUATRO SECCIONES, NO SIETE
     Ficha, Cartera, Terminos, Inmuebles, Mejoras, Fondo y Vida era un
     menu de contabilidad. Y eran siete porque cada sistema que se añadia
     traia su pestaña, no porque hicieran falta siete sitios.

     Ahora: Ficha (quien eres y tus numeros, con el diccionario dentro),
     Cartera (tu dinero y, cuando llegue, tu fondo: las dos cosas son
     invertir), Comprar (inmuebles, mejoras y caprichos: las tres son
     gastar) y Vida (como vives, tu gente y tu expediente).
     ============================================================ */
  const hayCompras = abierto(s, "inmuebles") || abierto(s, "mejoras") || abierto(s, "vida");
  /* los tres grupos de Comprar, con lo que cada uno hace en una linea */
  const GRUPOS_COMPRA = [
    { id: "caprichos", n: "Para ti", ico: "copa", lista: CAPRICHOS, abierto: abierto(s, "vida"),
      d: "Sube tu tren de vida. Unos conservan valor y otros no; casi todos cobran mantenimiento." },
    { id: "inmuebles", n: "Rentan", ico: "edificio", lista: PROPIEDADES, abierto: abierto(s, "inmuebles"),
      d: "Existen para pagarte algo cada año. La renta y el mantenimiento salen en el cierre." },
    { id: "mejoras", n: "Te mejoran", ico: "grafico", lista: PERKS, abierto: abierto(s, "mejoras"),
      d: "Se compran una vez y trabajan para ti todos los años que queden." },
  ];
  const GRUPO_ACT = GRUPOS_COMPRA.filter((g) => g.abierto).find((g) => g.id === grupo)
    || GRUPOS_COMPRA.filter((g) => g.abierto)[0]
    || GRUPOS_COMPRA[0];
  const TABS = [
    ["ficha", "Ficha", true],
    ["portafolio", "Cartera", abierto(s, "cartera")],
    /* «Compras» y no «Comprar»: la seccion es un sustantivo y el boton
       de dentro es el verbo. Con los dos llamados igual habia dos
       «Comprar» en pantalla haciendo cosas distintas —y finales.js se
       colgaba abriendo y cerrando el menu para siempre, que fue como
       salio a la luz. */
    ["comprar", "Compras", hayCompras],
    ["expediente", "Vida", abierto(s, "vida")],
  ].filter((p) => p[2]);
  const PAREJA_N = { solo: "sin pareja", noviazgo: "en pareja", casado: "casado", divorciado: "divorciado", viudo: "viudo" };
  const parejaTxt = PAREJA_TXT(s);
  const ramaN = s.rama ? nombreRama(s, s.rama) : null;
  const ano = 2026 + s.turno;

  /* el interruptor global, al dia en cada render */
  ponerMovimiento(animar);
  const quietoAhora = sinMovimiento();

  /* El latido de la cifra de arriba cuando el patrimonio se mueve. Se
     apaga solo, porque una animacion que se queda puesta deja de ser un
     aviso y pasa a ser ruido. */
  const [late, setLate] = useState(false);
  const patAnt = useRef(patrimonio);
  useEffect(() => {
    if (Math.round(patAnt.current) === Math.round(patrimonio)) return;
    patAnt.current = patrimonio;
    if (quietoAhora || typeof setTimeout !== "function") return;
    setLate(true);
    const t = setTimeout(() => setLate(false), 560);
    return () => { try { clearTimeout(t); } catch (e) {} };
  }, [patrimonio, quietoAhora]);

  /* La cascara del documento trae su propio freno con !important dentro
     de una media query, y ese gana siempre: hay que retirarlo desde
     fuera marcando #raiz. Sin esto, encender el movimiento en la Ficha
     no servia de nada y el rodillo seguia sin girar. */
  useEffect(() => {
    if (typeof document === "undefined" || !document.getElementById) return;
    var r = document.getElementById("raiz");
    if (!r || !r.classList) return;
    if (quietoAhora) r.classList.remove("ea-mov");
    else r.classList.add("ea-mov");
  }, [quietoAhora]);

  return {
    Atras, GRUPOS_COMPRA, GRUPO_ACT, Stat, TABS, aceptarAviso, animar, ano, anuncio,
    aplicarCartera, apuntarJuego, apuntarTema, arrancarPartida, aviso, avisoGuia, avisoLargo,
    ayudaDe, bienesVal, carteraPend, cerrarAviso, cierre, cobertura, cola, comprarBien,
    comprarPerk, conservanValor, consumoN, costoHijos, elec, elegir, elige, empezar, enFase,
    estudio, ev, fase, fin, finJuego, gastadoEnConsumo, gastosAnuales, grupo, guardado,
    hitosAno, impuestoDe, indiceVida, invertirEn, irA, late, levantarFondo, levantarSiguiente,
    mantenimientoAnual, mezclaAct, nacion, netoAnual, netoDelAno, nivelVida, nuevoSistema, op,
    opcionesDe, pagarDeuda, parejaTxt, patrimonio, pedirPrestamo, perfilN, persistir, pesada,
    pesoTren, ponerGasto, ponerRitmo, quietoAhora, ramaN, rastro, rentaProps, res,
    resolverEscena, retirarse, retiroAnual, retomar, s, salarioAnual, seguirCinco, selloCls,
    selloTxt, setAnimar, setAnuncio, setAvisoLargo, setCarteraPend, setElec, setGrupo,
    setNuevoSistema, setTab, setVerLeccion, siguienteAno, siguienteEscena, tab, tope, totalHoy,
    totalPagado, verLeccion, veredicto, vidaTotal,
  };
}
