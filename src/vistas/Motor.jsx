import React, { useState, useEffect, useRef, useMemo } from "react";
import { CSS } from "../estilos/base.js";
import { CSS5 } from "../estilos/minijuegos.js";
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
import { CSS2 } from "../estilos/graficos.js";
import { CSS3 } from "../estilos/tableros.js";
import { CSS4 } from "../estilos/cartera.js";
import {
  PERKS,
  NIVELES_VIDA,
  TOPE_VIDA,
  nivelDeVida,
  CAPRICHOS,
  NOTICIAS,
} from "../datos/estilo-de-vida.js";
import { GLOSARIO } from "../datos/glosario.js";
import { TEMAS, nivelDe } from "../datos/catedra.js";
import { PROPIEDADES } from "../datos/bienes-y-ramas.js";
import { EMPRESAS, baseDeal, senalesDeal } from "../datos/fondo.js";
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
import {
  BASE,
  COSTO_HIJO,
  PAREJAS,
  GENEROS,
  RITMOS,
  RITMO,
  GASTOS,
  NIVEL_GASTO,
} from "../motor/estado-inicial.js";
import {
  metaDeEdad,
  TOPE_NOMBRE,
  saneaNombre,
  PAREJA_TXT,
  MODO,
  EDADES,
  EDAD_DE,
  TOPE_ABSOLUTO,
  DURACION,
  topeDe,
  edad,
  esClave,
  tiene,
  escalar,
} from "../motor/edad-y-metas.js";
import { PREMIO_DE, premiosNuevos } from "../datos/premios.js";
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
import {
  RANGO,
  JUEGO,
  GUIA,
  puedeComprar,
  ICONO_ATRIB,
  fuerzaDe,
  efectosDe,
} from "../motor/reglas.js";
import { faltaDe } from "../motor/requisitos.js";
import { TarjetaJuego } from "../minijuegos/TarjetaJuego.jsx";
import { ponerMovimiento, sistemaPideQuieto, sinMovimiento } from "../hooks/movimiento.js";
import { Cifra } from "../componentes/Cifra.jsx";
import { Rodillo } from "../componentes/Rodillo.jsx";
import { DRAMA_IDS, CLASE_ESCENA, ICONO_BIEN, Icono } from "../componentes/Iconos.jsx";
import { Anillo, Marco, Plegable } from "../componentes/Stats.jsx";
import { fmtCorto, caminoAnual, Curva, Chispa, Flujo } from "../componentes/CaminoDelAnio.jsx";
import { PanelRegistro, BotonAnotar } from "../componentes/Registro.jsx";
import { PanelCartera } from "../componentes/PanelCartera.jsx";
import {
  UMBRAL_FONDO,
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
  TAMANOS,
} from "../motor/deuda.js";

export function Motor() {
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
    let pool = fuente.filter((e) => st.rango >= e.min && st.rango <= e.max && usados.indexOf(e.id) < 0 && st.vistos.indexOf(e.id) < 0);
    if (pool.length === 0) pool = fuente.filter((e) => st.rango >= e.min && st.rango <= e.max && usados.indexOf(e.id) < 0);
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
        st.rango >= e.min && st.rango <= e.max
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
      const e = sacar(E, st, usados);
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

  return (
    <div className={"ea-root" + (quietoAhora ? " ea-quieto" : "")}>
      <style>{CSS}{CSS2}{CSS3}{CSS4}{CSS5}</style>

      {fase === "aviso" && (
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Antes de entrar</div>
          <h1 className="ea-h1 ea-dis" style={{ fontSize: "clamp(34px,8vw,58px)" }}>Esto es un juego</h1>

          {/* Tres frases, no cinco bloques. El aviso segui­a siendo un muro
              de mil palabras delante de la puerta, y un muro no se lee: se
              salta. Lo que la ley y el jugador necesitan saber cabe en tres
              lineas —es ficcion, no es asesoria, y hay vida adulta dentro—
              y el texto completo sigue entero, a un clic. */}
          <div className="ea-aviso">
            <div className="ea-avisoB"><p>Todo está <strong>inventado</strong>. No hay dinero de verdad en juego.</p></div>
            <div className="ea-avisoB"><p><strong>Esto no es asesoría financiera.</strong></p></div>
            <div className="ea-avisoB"><p><strong>Hay vida adulta dentro</strong>: parejas, hijos, divorcios, enfermedad, muerte y estafas.</p></div>
          </div>

          <button className="ea-atras ea-dis" style={{ marginTop: 14, marginBottom: 0 }}
            onClick={() => setAvisoLargo((v) => !v)}>
            {avisoLargo ? "↑ Cerrar el aviso completo" : "↓ Leer el aviso completo"}
          </button>

          {avisoLargo && (
            <div className="ea-aviso ea-panelAb" style={{ marginTop: 6 }}>
              <div className="ea-avisoB">
                <div className="ea-avisoK ea-dis">Nada de aquí es real</div>
                <p>
                  Las empresas, los fondos, las noticias y los números están inventados. No existe ninguna
                  de las oportunidades que vas a ver, no hay dinero de verdad en juego y nada de lo que
                  decidas aquí tiene la menor consecuencia fuera de esta pantalla. Puedes arruinarte
                  tranquilo: es el mejor sitio para hacerlo.
                </p>
              </div>

              <div className="ea-avisoB">
                <div className="ea-avisoK ea-dis">Es para aprender, no para hacerte caso</div>
                <p>
                  El juego enseña cómo funcionan el interés compuesto, la diversificación, el riesgo, la deuda
                  y el coste de vivir por encima de tus posibilidades. Eso son conceptos, y los conceptos sí
                  se trasladan a la vida. Las cifras concretas, no: <strong>esto no es asesoría financiera</strong>.
                  Ninguna decisión de tu dinero real debería basarse en lo que pase en una partida.
                </p>
              </div>

              <div className="ea-avisoB">
                <div className="ea-avisoK ea-dis">Los números están simplificados a propósito</div>
                <p>
                  Los rendimientos se simulan con modelos deliberadamente sencillos para que se entiendan.
                  El mercado real es más desordenado, los impuestos cambian según el país y el año, y el
                  rendimiento pasado no predice el futuro ni aquí ni allá. Si un resultado del juego te
                  parece demasiado bueno, probablemente lo sea.
                </p>
              </div>

              <div className="ea-avisoB">
                <div className="ea-avisoK ea-dis">Hay vida adulta dentro</div>
                <p>
                  Además de la carrera, la partida incluye escenas de la vida que afectan al dinero:
                  parejas y rupturas, hijos, divorcios, enfermedad, la muerte de alguien cercano y
                  estafas. Nada está contado de forma explícita ni gráfica, pero conviene que lo sepas
                  antes de empezar.
                </p>
              </div>

              <div className="ea-avisoB">
                <div className="ea-avisoK ea-dis">Tu partida no sale de tu navegador</div>
                <p>
                  Lo que juegas se guarda en tu propio dispositivo para que puedas retomarlo. No se envía
                  a ningún sitio, no se pide ningún dato tuyo y no hay cuenta que crear.
                </p>
              </div>
            </div>
          )}

          <div className="ea-regla" />
          <button className="ea-btnO" onClick={aceptarAviso}>Entendido, acepto y quiero jugar</button>
          <div style={{ fontSize: 11.5, color: "var(--gris)", marginTop: 10 }}>
            Al entrar aceptas que esto es un ejercicio de ficción con fines educativos y que no
            sustituye el consejo de un profesional.
          </div>
        </div>
      )}

      {fase === "portada" && (
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Simulador de carrera e inversión</div>
          <h1 className="ea-h1 ea-dis">El Analista</h1>
          {/* La curva que sube, dibujandose. Es de lo que va el juego, y
              la portada era texto sobre blanco. Se dibuja con
              stroke-dashoffset, asi que no hay imagen que cargar. */}
          <svg className="ea-portadaArte" viewBox="0 0 320 96" aria-hidden="true" focusable="false">
            <line className="ea-paBase" x1="6" y1="88" x2="314" y2="88" />
            {[68, 140, 212, 284].map((x, i) => (
              <line key={i} className="ea-paTick" x1={x} y1="88" x2={x} y2="82" />
            ))}
            <path className="ea-paCurva"
              d="M10 82 C 52 80, 68 66, 96 62 S 130 72, 152 54 S 188 30, 214 34 S 252 20, 276 12 L 300 8" />
            <circle className="ea-paPunto" cx="300" cy="8" r="5.5" />
          </svg>
          <p className="ea-lede">
            Un año por turno. Decides, el mercado se mueve, y al final ves en qué quedó todo.
          </p>
          <button className="ea-atras ea-dis" style={{ marginBottom: 0, marginTop: 4 }}
            onClick={() => { if (enFase("portada")) irA("aviso"); }}>Volver a leer el aviso</button>
          <div className="ea-regla" />
          <div className="ea-cifras ea-cifrasPortada" style={{ marginBottom: 26 }}>
            <div><div className="ea-cifraK">La carrera</div><div className="ea-cifraV ea-dis">De pasante a socio</div>
              <div className="ea-cifraD">Ascensos, contratos y la opción de montar tu propia firma.</div></div>
            <div><div className="ea-cifraK">El punto de partida</div><div className="ea-cifraV ea-dis">Nunca es tarde para invertir</div>
              <div className="ea-cifraD">Empieza a los 20, 30, 40 o 50: más joven, más tiempo; más tarde, más capital y experiencia.</div></div>
            <div><div className="ea-cifraK">El objetivo</div><div className="ea-cifraV ea-dis">Independencia financiera</div>
              <div className="ea-cifraD">Que tu patrimonio cubra tu vida sin depender del sueldo.</div></div>
            <div><div className="ea-cifraK">Los imprevistos</div><div className="ea-cifraV ea-dis">Crisis, familia y fraudes</div>
              <div className="ea-cifraD">Mercados que caen, decisiones de pareja e hijos, y ofertas demasiado buenas.</div></div>
          </div>
          {guardado ? (
            <div>
              <div className="ea-guarda">
                <div className="ea-lecK" style={{ color: "var(--gris)" }}>Tienes una vida a medio camino</div>
                <div className="ea-dis" style={{ fontSize: 19, color: "var(--tintaPapel)", marginTop: 5 }}>
                  {2026 + guardado.s.turno} · {edad(guardado.s.turno, guardado.s.edadIni)} años · {RANGO(guardado.s.rango).n}
                </div>
                <div className="ea-mono" style={{ fontSize: 13, color: "var(--gris)", marginTop: 3 }}>
                  patrimonio USD {fmt(guardado.s.cash + guardado.s.cartera)} · año {guardado.s.turno + 1} de {topeDe(guardado.s)}
                </div>
              </div>
              <div className="ea-fila2" style={{ marginTop: 14 }}>
                <button className="ea-btnO" style={{ marginTop: 0 }} onClick={retomar}>Retomar</button>
                <button className="ea-btn" style={{ marginTop: 0, background: "transparent", border: "1px solid var(--borde)", color: "var(--tintaPapel)" }}
                  onClick={empezar}>Empezar otra vida</button>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--gris)", marginTop: 8 }}>
                Empezar otra vida borra la partida guardada.
              </div>
            </div>
          ) : (
            <div>
              {/* Una sola entrada: «Jugar ya» abre la configuración (nombre,
                  edad, duración, país, carrera). Hubo un atajo que lo elegía
                  todo al azar; se quitó el 28-sep-2026 a pedido de Alessandro. */}
              <button className="ea-jugarYa ea-dis" onClick={empezar}>Jugar ya</button>
            </div>
          )}

          {/* Los números a batir, antes de empezar. Es el gancho: se ve
              hasta dónde llegó otra gente con las mismas reglas. */}
          <div className="ea-panel" style={{ marginTop: 30, textAlign: "left" }}>
            <PanelRegistro tope={8} titulo="Hasta dónde han llegado otros" />
            <div style={{ fontSize: 11.5, color: "var(--gris)", marginTop: 12 }}>
              Se anota al terminar una carrera. Nadie verifica nada: es un registro por confianza.
            </div>
          </div>
        </div>
      )}

      {fase === "identidad" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="portada" texto="Volver a la portada" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso uno de cuatro</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Quién eres?</h2>
          <p className="ea-lede" style={{ marginBottom: 20 }}>
            Solo para que el juego te hable a ti. No cambia ningún número.
          </p>

          <label className="ea-campoK ea-dis" htmlFor="ea-nombre">Tu nombre</label>
          <input id="ea-nombre" className="ea-campo ea-dis" type="text" maxLength={TOPE_NOMBRE}
            value={elec.nombre} placeholder="Como quieras que te llamen"
            onChange={(e) => setElec((x) => ({ ...x, nombre: saneaNombre(e.target.value) }))} />

          <div className="ea-campoK ea-dis" style={{ marginTop: 22 }}>Género</div>
          <div className="ea-generos">
            {GENEROS.map((g) => (
              <button key={g.id} className={"ea-mini" + (elec.genero === g.id ? " on" : "")} style={{ marginTop: 0 }}
                onClick={() => setElec((x) => ({ ...x, genero: g.id }))}>{g.n}</button>
            ))}
          </div>

          <div className="ea-regla" style={{ marginTop: 26 }} />
          <button className="ea-btnO" style={{ marginTop: 0 }}
            onClick={() => { if (enFase("identidad")) irA("edad"); }}>
            {elec.nombre.trim() ? "Seguir como " + elec.nombre.trim() : "Seguir sin nombre"}
          </button>
        </div>
      )}

      {fase === "edad" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="identidad" texto="Cambiar tu nombre" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso dos de cuatro</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿A qué edad empiezas?</h2>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            Nadie está fuera de tiempo. Más tarde es menos años y más criterio, red y dinero.
          </p>

          {/* Sin elegir cuánto jugar: siempre es una década y al llegar se
              ofrece seguir de cinco en cinco. Hubo un selector «Una década /
              La carrera entera»; se quitó el 28-sep-2026. */}

          {EDADES.map((e) => (
            <button className={"ea-opcion" + (elec.edad === e.e ? " on" : "")} key={e.e}
              onClick={() => { if (enFase("edad")) elige("edad", e.e, e.e >= 30 ? "familia" : "pais"); }}>
              <div className="ea-opcionN">Empezar a los {e.e}</div>
              <div className="ea-opcionD">{e.d}</div>
              <div className="ea-opcionM">
                Te preguntan si te retiras a los {e.e + DURACION(elec.duracion).meta}, y ahí decides si sigues
                {e.cash > 0 ? " · empiezas con USD " + fmt(e.cash) + " ahorrados" : " · empiezas sin nada ahorrado"}
                {Object.keys(e.mods || {}).length ? " · " + Object.keys(e.mods).map((k) => ETIQ[k] + " " + (e.mods[k] > 0 ? "+" : "") + e.mods[k]).join(" · ") : ""}
              </div>
            </button>
          ))}
        </div>
      )}

      {fase === "familia" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="edad" texto="Cambiar la edad" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso dos de cuatro</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Cómo llegas a los {EDAD_DE(elec.edad).e}?</h2>
          <div className="ea-rastro ea-mono">Empiezas a los {EDAD_DE(elec.edad).e}</div>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            Cambia lo que te cuesta vivir desde el primer año.
          </p>

          <div className="ea-campoK ea-dis">Con quién llegas</div>
          <div className="ea-generos">
            {[["solo", "Sin pareja"], ["noviazgo", "En pareja"], ["casado", "Casado"], ["divorciado", "Divorciado"]].map((par) => (
              <button key={par[0]} className={"ea-mini" + (elec.pareja === par[0] ? " on" : "")}
                onClick={() => setElec((x) => ({ ...x, pareja: par[0] }))}>{par[1]}</button>
            ))}
          </div>

          <div className="ea-campoK ea-dis" style={{ marginTop: 18 }}>Cuántos hijos</div>
          <div className="ea-generos">
            {[0, 1, 2, 3, 4].map((h) => (
              <button key={h} className={"ea-mini" + (elec.hijos === h ? " on" : "")}
                onClick={() => setElec((x) => ({ ...x, hijos: h }))}>{h === 0 ? "Ninguno" : h}</button>
            ))}
          </div>
          <div className="ea-itemD" style={{ marginTop: 9 }}>
            {elec.hijos > 0
              ? "Cada hijo cuesta del orden de USD " + fmt(COSTO_HIJO) + " al año antes de ajustar por país, y pesa en tu tren de vida desde el primer cierre."
              : "Sin hijos el gasto arranca más bajo. Nada impide que lleguen jugando."}
          </div>

          <button className="ea-btn" style={{ marginTop: 22 }}
            onClick={() => { if (enFase("familia")) irA("pais"); }}>Seguir</button>
        </div>
      )}

      {fase === "pais" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a={EDAD_DE(elec.edad).e >= 30 ? "familia" : "edad"}
            texto={EDAD_DE(elec.edad).e >= 30 ? "Cambiar tu situación" : "Cambiar la edad"} />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso tres de cuatro</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿De dónde vienes?</h2>
          <div className="ea-rastro ea-mono">{rastro()}</div>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            Define tu sueldo, tu costo de vida y con qué instintos empiezas.
          </p>
          {NACIONES.map((p) => (
            <div className="ea-panel" key={p.id} style={{ marginBottom: 10 }}>
              <div className="ea-itemTop">
                <span className="ea-nombre ea-dis" style={{ fontSize: 19, color: "var(--tinta)" }}>{p.n}</span>
                <span className="ea-mono" style={{ fontSize: 12.5, color: "var(--gris)" }}>{p.ban}</span>
              </div>
              <div style={{ fontSize: 13.5, color: "var(--gris)", margin: "8px 0" }}>{p.d}</div>
              <div style={{ fontSize: 12, color: "var(--cobre)" }}>
                Sueldos {Math.round(p.sal * 100)} · costo de vida {Math.round(p.gas * 100)} · impuesto {Math.round(p.tax * 100)}% · empiezas con USD {fmt(p.cash)}
              </div>
              <div style={{ fontSize: 12, color: "var(--gris)", marginTop: 3 }}>{p.nota}</div>
              <button className="ea-mini" onClick={() => { if (enFase("pais")) elige("pais", p.id, "estudio"); }}>
                {elec.pais === p.id ? "Elegido" : "Elegir"}
              </button>
            </div>
          ))}
        </div>
      )}

      {fase === "estudio" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="pais" texto="Cambiar el origen" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso cuatro de cuatro</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>
            {EDAD_DE(elec.edad).e <= 20 ? "¿Qué estás por terminar?" : "¿Qué estudiaste?"}
          </h2>
          <div className="ea-rastro ea-mono">{rastro()}</div>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            Te da atributos y opciones que solo tú vas a poder tomar. Al elegir, empieza la partida.
          </p>
          {CARRERAS.map((c) => (
            <div className="ea-panel" key={c.id} style={{ marginBottom: 10 }}>
              <div className="ea-nombre ea-dis" style={{ fontSize: 19, color: "var(--tinta)" }}>{c.n}</div>
              <div style={{ fontSize: 13.5, color: "var(--gris)", margin: "7px 0" }}>{c.d}</div>
              <div style={{ fontSize: 12, color: "var(--cobre)" }}>
                {Object.keys(c.mods).map((k) => ETIQ[k] + " +" + c.mods[k]).join(" · ")} · mejor en {c.juegos.map((j) => JUEGO(j).n.toLowerCase()).join(" y ")}
              </div>
              <button className="ea-mini" onClick={() => {
                if (!enFase("estudio")) return;
                /* Al elegir la carrera empieza la partida, con los avisos de
                   guía siempre puestos. Había una pantalla más («¿Te vas
                   guiando o vas solo?») y se quitó el 28-sep-2026: los
                   avisos son cortos y salen una sola vez, no hace falta
                   preguntar por ellos. */
                setElec((x) => ({ ...x, estudio: c.id }));
                arrancarPartida({ ...elec, estudio: c.id, guia: true });
              }}>{EDAD_DE(elec.edad).e <= 20 ? "Graduarte de esto" : "Empezar con esto"}</button>
            </div>
          ))}
        </div>
      )}

      {(fase === "evento" || fase === "minijuego" || fase === "resultado" || fase === "cierre" || fase === "retiro") && (
        <div className="ea-wrap">
          <div className="ea-placa">
            <div>
              <div className="ea-nombre ea-dis">{s.nombre ? s.nombre : RANGO(s.rango).n}</div>
              {/* Antes solo se veía la formación y la bandera. Dónde trabajas
                  era invisible, y es lo primero que define tu año. */}
              {/* Era una linea de texto con puntos: «Analista · Mercantil
                  Praga · Venezuela». Ahora cada cosa lleva su icono, asi
                  que se distingue de un vistazo donde trabajas de donde
                  vives sin tener que leerlo. */}
              <div className="ea-sub ea-dis ea-quien">
                {s.nombre && <span><Icono k="escalera" tam={12} />{RANGO(s.rango).n}</span>}
                <span><Icono k="edificio" tam={12} />{s.patron || estudio.n}</span>
                <span><Icono k="pin" tam={12} />{nacion.n}</span>
                {ramaN && <span className="ea-quienRama">{ramaN}</span>}
              </div>
            </div>
            <div className="ea-reloj">
              {/* Sin «año X de Y»: saber cuándo se acaba la partida le quita
                  peso a cada decisión, porque el jugador empieza a contar
                  turnos en vez de vivir el año que tiene delante. */}
              <div className="ea-dis">{ano} · {edad(s.turno, s.edadIni)} años</div>
              {/* La cifra sin rotulo no se entendia: ponia «USD 6.375» y ya.
                  Ahora dice que es, y el reparto entre lo que tienes a mano
                  y lo que esta invertido se ve en una barra en vez de
                  leerse en una linea de texto apretada. */}
              <div className="ea-patK ea-dis">Tu patrimonio</div>
              <div className={"ea-plata ea-mono" + (patrimonio < 0 ? " neg" : "") + (late ? " late" : "")}>
                USD <Cifra v={patrimonio} />
              </div>
              {abierto(s, "cartera") && (() => {
                const liq = Math.max(0, s.cash) + Math.max(0, s.cartera);
                const pEf = liq > 0 ? (Math.max(0, s.cash) / liq) * 100 : 100;
                return (
                  <div className="ea-reparto">
                    <div className="ea-repartoBar" aria-hidden="true">
                      <span className="ea-repEf" style={{ width: pEf.toFixed(1) + "%" }} />
                      <span className="ea-repCa" style={{ width: (100 - pEf).toFixed(1) + "%" }} />
                    </div>
                    <div className="ea-repartoL ea-mono">
                      <span><i className="ea-punto2 ef" />a mano {fmtCorto(s.cash)}</span>
                      <span><i className="ea-punto2 ca" />invertido {fmtCorto(s.cartera)}</span>
                    </div>
                  </div>
                );
              })()}
              {/* El sueldo es el número que el jugador usa para decidir; energía y
                  reputación solo salen cuando están en zona de aviso, que es el
                  único momento en que cambian una decisión. */}
              {/* La energia era un numero del 0 al 100 escondido en una
                  linea de texto, y solo cuando ya ibas mal. Ahora es un
                  rayo que se llena hasta donde llegas, siempre a la
                  vista: se lee sin leer. Igual la reputacion. */}
              <div className="ea-mono ea-signos">
                <span title={"Sueldo " + fmt(salarioAnual(s)) + " al año"}>
                  <Icono k="moneda" tam={13} />{fmtCorto(salarioAnual(s))} al año
                </span>
                {s.deuda > 0 && (
                  <span className="mal" title={"Debes " + fmt(s.deuda)}>
                    <Icono k="aviso" tam={13} />debes {fmtCorto(s.deuda)}
                  </span>
                )}
              </div>
            </div>

            {/* ---- la fila de stats, a lo ancho de la placa ----
                Primero hacia donde va tu carrera, como una barra de
                experiencia: cuanto te falta para el siguiente cargo. Y
                debajo los cinco atributos, cada uno con su anillo. */}
            <div className="ea-stats">
              {(() => {
                const r = entero(s.rango, 0, 0, RANGOS.length - 1);
                const techo = RANGO(r).umbral;
                const suelo = r > 0 ? RANGO(r - 1).umbral : 0;
                const tope = techo === Infinity;
                const p = tope ? 1 : clamp((numero(s.carrera, 0) - suelo) / Math.max(1, techo - suelo), 0, 1);
                return (
                  <div className="ea-xp" title={tope ? "Cargo máximo" : "Hacia " + RANGO(r + 1).n}>
                    <div className="ea-xpTop ea-dis">
                      <span><Icono k="escalera" tam={12} />{RANGO(r).n}</span>
                      <span className="ea-xpSig">{tope ? "cargo máximo" : "→ " + RANGO(r + 1).n}</span>
                    </div>
                    <div className="ea-xpBar"><div className="ea-xpFill" style={{ width: (p * 100).toFixed(1) + "%" }} /></div>
                  </div>
                );
              })()}
              <div className="ea-anillos">
                {["ene", "cri", "mod", "red", "rep"].map((k) => <Anillo key={k} k={k} v={s[k]} />)}
              </div>
            </div>
          </div>
          {fase !== "cierre" && (fase === "evento" || fase === "minijuego" || fase === "resultado") && (
            <div className="ea-cinta">
              <span className="ea-cintaK ea-dis">{ano}</span>
              {/* El año como puntos: se ve de un vistazo cuánto queda sin
                  tener que leer «quedan tres situaciones este año». */}
              {(() => {
                const quedan = cola.length + (fase === "evento" || fase === "minijuego" ? 1 : 0);
                const total = Math.max(quedan, hitosAno.current.length + quedan);
                const puntos = [];
                for (let i = 0; i < Math.min(total, 8); i++) {
                  puntos.push(<span key={i} className={"ea-punto" + (i < total - quedan ? " ido" : "")} />);
                }
                return <span className="ea-puntos" aria-label={"Quedan " + quedan + " situaciones este año"}>{puntos}</span>;
              })()}
              {abierto(s, "cartera") && <span>cartera {perfilN.toLowerCase()}</span>}
              {aviso && <span className="ea-avisoFlash" style={{ marginLeft: "auto", flexShrink: 0 }}>{aviso}</span>}
            </div>
          )}

          {/* La barra vive fuera del tablero y por defecto está cerrada:
              lo primero que se ve es la decisión, no la contabilidad. */}
          <div className="ea-tabs">
            {TABS.map((par) => (
              <button key={par[0]} className={"ea-tab" + (tab === par[0] ? " on" : "")}
                aria-expanded={tab === par[0] ? "true" : "false"} disabled={carteraPend && tab !== par[0]}
                onClick={() => { if (carteraPend) return; setTab(tab === par[0] ? null : par[0]); }}>{par[1]}</button>
            ))}
          </div>

          {avisoGuia && (
            <div className="ea-guia">
              <div className="ea-guiaK ea-dis">Guía</div>
              <div className="ea-guiaT ea-dis">{avisoGuia.t}</div>
              <div className="ea-guiaX">{avisoGuia.x}</div>
              <button className="ea-guiaB ea-dis" onClick={() => cerrarAviso(avisoGuia.id)}>Entendido</button>
            </div>
          )}

          <div className="ea-grid solo">
            {tab && (
            <div className="ea-modalFondo" onClick={() => { if (!carteraPend) setTab(null); }}>
              <div className="ea-modal ea-panelAb" onClick={(e) => e.stopPropagation()}>
                <div className="ea-modalCab">
                  <span className="ea-modalT ea-dis">{(TABS.find((p) => p[0] === tab) || ["", ""])[1]}</span>
                  <button className="ea-modalX ea-dis" disabled={carteraPend} aria-label="Cerrar la sección"
                    onClick={() => { if (!carteraPend) setTab(null); }}>✕</button>
                </div>
                <div className="ea-modalCuerpo">
                <button className="ea-cerrar ea-dis" disabled={carteraPend} onClick={() => { if (!carteraPend) setTab(null); }}>
                  {carteraPend ? "Aplica o descarta el cambio para volver" : "Cerrar y volver a la decisión"}
                </button>
                {tab === "ficha" && (
                  <div>
                    <div className="ea-titular" style={{ marginBottom: 4 }}>
                      <div className="ea-titularK ea-dis">Patrimonio</div>
                      <div className="ea-titularV ea-mono" style={{ fontSize: 27 }}>USD {fmt(patrimonio)}</div>
                      <div className="ea-titularL">
                        <span className="ea-mono">cubre {Math.round(cobertura * 100)}% de tus gastos</span>
                        {s.deuda > 0 && <span className="ea-mono" style={{ color: "#C4756A" }}>debes {fmt(s.deuda)}</span>}
                      </div>
                    </div>
                    <div className="ea-plegs">
                    <Plegable titulo="Tus atributos" resumen={"criterio " + Math.round(s.cri)}>
                    <Stat k="mod" v={s.mod} /><Stat k="cri" v={s.cri} /><Stat k="red" v={s.red} /><Stat k="rep" v={s.rep} /><Stat k="ene" v={s.ene} ene />
                    </Plegable>
                    <Plegable titulo="Quién eres" resumen={RANGO(s.rango).n}>
                    <div className="ea-fila" style={{ marginTop: 0 }}>
                      <span className="ea-dis" style={{ fontSize: 12 }}>Carrera</span>
                      <span className="ea-mono">{s.carrera} / {RANGO(s.rango).umbral === Infinity ? "máx" : RANGO(s.rango).umbral}</span>
                    </div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Trabajas en</span><span className="ea-mono">{s.patron || "—"}</span></div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Contrato</span>
                      <span className="ea-mono">
                        {s.propia
                          ? "es tuya, no hay contrato"
                          : s.contrato
                          ? (() => {
                              const quedan = numero(s.contrato.desde, 0) + numero(s.contrato.anos, 3) - s.turno;
                              return numero(s.contrato.anos, 3) + " años · " + (quedan <= 0 ? "vencido" : "quedan " + quedan);
                            })()
                          : "sin contrato"}
                      </span>
                    </div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Origen</span><span className="ea-mono">{nacion.n}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Formación</span><span className="ea-mono">{estudio.n}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Rama</span><span className="ea-mono">{ramaN || "sin definir"}</span></div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Vida personal</span>
                      <span className="ea-mono">{parejaTxt}{s.hijos > 0 ? " · " + s.hijos + (s.hijos === 1 ? " hijo" : " hijos") : ""}</span>
                    </div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Tren de vida</span>
                      <span className="ea-mono">{nivelDeVida(vidaTotal(s)).n.toLowerCase()}</span>
                    </div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Formación acumulada</span>
                      <span className="ea-mono">{Math.round(s.estudia)} · temario nivel {nivelDe(s.turno, s.estudia)}</span>
                    </div>
                    </Plegable>
                    <Plegable titulo="Tus números" resumen={"sueldo " + fmtCorto(salarioAnual(s))} abierto>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Sueldo bruto</span><span className="ea-mono">USD {fmt(salarioAnual(s))}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Impuesto</span><span className="ea-mono">{Math.round(impuestoDe(s) * 100)}%</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Gasto anual</span><span className="ea-mono">USD {fmt(gastosAnuales)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Efectivo</span><span className="ea-mono">USD {fmt(s.cash)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cartera invertida</span><span className="ea-mono">USD {fmt(s.cartera)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Bienes</span><span className="ea-mono">USD {fmt(bienesVal)}</span></div>
                    {s.deuda > 0 && (
                      <div className="ea-fila">
                        <span className="ea-dis" style={{ fontSize: 12 }}>Deuda</span>
                        <span className="ea-mono" style={{ color: "var(--rojo)" }}>USD {fmt(s.deuda)} · {Math.round(tasaPrestamo(s) * 100)}%</span>
                      </div>
                    )}
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Patrimonio</span><span className="ea-mono">USD {fmt(patrimonio)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cubre tus gastos</span><span className="ea-mono">{Math.round(cobertura * 100)}%</span></div>

                    </Plegable>

                    {/* las dos decisiones que antes no existían */}
                    <Plegable titulo="Cómo vas a vivir este año"
                      resumen={RITMO(s.ritmo).n.toLowerCase() + " · " + NIVEL_GASTO(s.nivelGasto).n.toLowerCase()}>
                    <div className="ea-itemD" style={{ marginBottom: 9 }}>
                      Las dos palancas que más pesan a lo largo de una carrera entera, y las únicas que decides tú
                      todos los años. Cambian al cerrar el año.
                    </div>
                    <div className="ea-campoK ea-dis">Ritmo de trabajo</div>
                    <div className="ea-generos">
                      {RITMOS.map((x) => (
                        <button key={x.id} className={"ea-mini" + (s.ritmo === x.id ? " on" : "")}
                          style={{ marginTop: 0 }} onClick={() => ponerRitmo(x.id)}>{x.n}</button>
                      ))}
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>{RITMO(s.ritmo).d}</div>
                    <div className="ea-etqs">
                      <span className={"ea-etq" + (RITMO(s.ritmo).car > 0 ? " act" : "")}>carrera {RITMO(s.ritmo).car >= 0 ? "+" : ""}{RITMO(s.ritmo).car} al año</span>
                      <span className="ea-etq cost">energía {RITMO(s.ritmo).ene} al año</span>
                    </div>

                    <div className="ea-campoK ea-dis" style={{ marginTop: 16 }}>Tren de vida</div>
                    <div className="ea-generos">
                      {GASTOS.map((x) => (
                        <button key={x.id} className={"ea-mini" + (s.nivelGasto === x.id ? " on" : "")}
                          style={{ marginTop: 0 }} onClick={() => ponerGasto(x.id)}>{x.n}</button>
                      ))}
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>{NIVEL_GASTO(s.nivelGasto).d}</div>
                    <div className="ea-etqs">
                      <span className={"ea-etq" + (NIVEL_GASTO(s.nivelGasto).f < 1 ? " act" : NIVEL_GASTO(s.nivelGasto).f > 1 ? " cost" : "")}>
                        gasto {NIVEL_GASTO(s.nivelGasto).f === 1 ? "normal" : (NIVEL_GASTO(s.nivelGasto).f > 1 ? "+" : "−") + Math.abs(Math.round((NIVEL_GASTO(s.nivelGasto).f - 1) * 100)) + "%"}
                      </span>
                      <span className="ea-etq">o sea USD {fmt(gastosAnuales)} al año</span>
                    </div>

                    {/* la vara de medir que no existía */}
                    </Plegable>
                    {(() => {
                      const eHoy = edad(s.turno, s.edadIni);
                      const meta = metaDeEdad(eHoy);
                      const sueldo = salarioAnual(s);
                      const objetivo = sueldo * meta.x;
                      const tengo = s.cartera + Math.max(0, s.cash);
                      const razon = objetivo > 0 ? tengo / objetivo : 0;
                      return (
                        <Plegable titulo="Cómo vas para tu edad"
                          resumen={objetivo > 0 ? Math.round(razon * 100) + "% de la referencia" : "—"}
                          tono={razon >= 1 ? "#4FA05C" : razon >= 0.5 ? "#B9532A" : "#B23B27"}>
                          <div className="ea-itemD" style={{ marginBottom: 7 }}>
                            La referencia habitual dice que a los {meta.e} conviene tener {meta.x} {meta.x === 1 ? "vez" : "veces"} tu
                            sueldo anual invertido. No es una ley: es una vara para saber si vas o no vas.
                          </div>
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Referencia a los {meta.e}</span><span className="ea-mono">USD {fmt(objetivo)}</span></div>
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Tienes invertido y líquido</span><span className="ea-mono">USD {fmt(tengo)}</span></div>
                          <div className="ea-medidor">
                            <div className="ea-medidorF" style={{ width: (Math.min(1, Math.max(0, razon)) * 100).toFixed(1) + "%" }} />
                          </div>
                          <div className="ea-itemD" style={{ marginTop: 6, color: razon >= 1 ? "var(--verde)" : razon >= 0.5 ? "var(--cobre)" : "var(--rojo)" }}>
                            {meta.aun
                              ? "Todavía no te toca esta vara: la primera referencia es a los treinta. Lo que hagas ahora es lo que la hará fácil."
                              : razon >= 1 ? "Vas por delante de la referencia. Sigue y no subas el tren de vida por costumbre."
                              : razon >= 0.5 ? "Vas por detrás, y a tiempo. Cada punto de tasa de ahorro cierra esa distancia más rápido que cualquier acierto en el mercado."
                              : "Vas bastante por detrás. Lo que mueve esto no es el retorno: es cuánto de lo que entra no se gasta."}
                          </div>
                        </Plegable>
                      );
                    })()}

                    {/* Con el retomar automático el jugador ya no pasa por la
                        portada, así que hace falta una puerta de vuelta. No
                        borra nada: la partida queda guardada. */}
                    {/* El movimiento, encendible a mano. Windows con los
                        efectos de animacion apagados le dice a Chrome que
                        quiere menos movimiento, y eso apagaba el rodillo
                        del cierre y las cifras que cuentan sin que hubiera
                        forma de encenderlos. */}
                    <Plegable titulo="Movimiento"
                      resumen={animar === true ? "encendido" : animar === false ? "apagado" : (sistemaPideQuieto() ? "lo apaga tu sistema" : "sigue a tu sistema")}>
                      <div className="ea-itemD" style={{ marginBottom: 8 }}>
                        Las cifras que cuentan y el rodillo del cierre de año. Por defecto el juego hace lo
                        que pida tu sistema{sistemaPideQuieto() ? ", y el tuyo los está apagando" : ""}.
                        Se queda puesto para todas tus partidas.
                      </div>
                      <div className="ea-generos">
                        {[[null, "Como mi sistema"], [true, "Encendido"], [false, "Apagado"]].map((par) => (
                          <button key={String(par[0])} style={{ marginTop: 0 }}
                            className={"ea-mini" + (animar === par[0] ? " on" : "")}
                            onClick={() => setAnimar(par[0])}>{par[1]}</button>
                        ))}
                      </div>
                    </Plegable>

                    {/* El diccionario era una pestaña fija. Es una
                        consulta, no una accion: vive aqui dentro y se
                        abre cuando hace falta. */}
                    <Plegable titulo="El diccionario" resumen={Object.keys(GLOSARIO).length + " palabras"}>
                      <div className="ea-itemD" style={{ marginBottom: 10 }}>
                        Todas las palabras que usa el juego, sin jerga.
                      </div>
                      {Object.keys(GLOSARIO).map((k) => (
                        <div className="ea-item" key={k}>
                          <div className="ea-itemN">{GLOSARIO[k].n}</div>
                          <div className="ea-itemD">{GLOSARIO[k].x}</div>
                        </div>
                      ))}
                    </Plegable>

                    <button className="ea-cerrar ea-dis" style={{ marginBottom: 14, marginTop: 14 }}
                      onClick={() => { persistir(s, true); setTab(null); irA("portada"); }}>
                      Guardar y volver a la portada
                    </button>

                    {(abierto(s, "banco") || s.deuda > 0) && (
                    <Plegable titulo="El banco"
                      resumen={s.deuda > 0 ? "debes " + fmtCorto(s.deuda) : "sin deuda"}
                      tono={s.deuda > 0 ? "#B23B27" : "#4FA05C"}>
                    {s.quiebras > 0 && (
                      <div className="ea-itemD" style={{ marginBottom: 8, color: "var(--rojo)" }}>
                        Has quebrado {s.quiebras === 1 ? "una vez" : s.quiebras + " veces"}. Eso encarece cada dólar que pidas
                        {s.vetoCredito > 0 ? " y todavía no te prestan: faltan " + s.vetoCredito + (s.vetoCredito === 1 ? " año" : " años") + "." : "."}
                      </div>
                    )}
                    {s.deuda > 0 ? (
                      <div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Debes</span><span className="ea-mono" style={{ color: "var(--rojo)" }}>USD {fmt(s.deuda)}</span></div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Te cuesta al año</span><span className="ea-mono">USD {fmt(s.deuda * tasaPrestamo(s))} · {Math.round(tasaPrestamo(s) * 100)}%</span></div>
                        <div className="ea-itemD" style={{ marginTop: 6 }}>
                          Tu cartera espera rendir {Math.round(statsPesos(mezclaAct).mu * 100)}%. Mientras la deuda cueste más que eso,
                          pagarla es la mejor inversión disponible, y sin riesgo.
                        </div>
                        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 8 }}>
                          <button className="ea-mini" disabled={s.cash < 50} onClick={() => pagarDeuda(Math.min(s.deuda, s.cash * 0.5))}>Pagar la mitad de tu efectivo</button>
                          <button className="ea-mini" disabled={s.cash < 50} onClick={() => pagarDeuda(Math.min(s.deuda, s.cash))}>Pagar todo lo que puedas</button>
                        </div>
                      </div>
                    ) : (
                      <div className="ea-itemD">No debes nada. Es una posición más valiosa de lo que parece.</div>
                    )}
                    {(() => {
                      const tope = topeCredito(s, netoAnual(s), bienesVal);
                      if (tope < 100) {
                        return <div className="ea-itemD" style={{ marginTop: 10 }}>Ahora mismo no te prestarían más.</div>;
                      }
                      return (
                        <div style={{ marginTop: 12 }}>
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Te prestarían hasta</span><span className="ea-mono">USD {fmt(tope)}</span></div>
                          <div className="ea-itemD" style={{ marginTop: 4 }}>
                            Al {Math.round(tasaPrestamo(s) * 100)}% anual. Pedir prestado no es un error por sí solo: lo es pedirlo
                            para algo que no rinde más que la tasa.
                          </div>
                          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 8 }}>
                            <button className="ea-mini" onClick={() => pedirPrestamo(tope * 0.25)}>Pedir {fmt(tope * 0.25)}</button>
                            <button className="ea-mini" onClick={() => pedirPrestamo(tope * 0.5)}>Pedir {fmt(tope * 0.5)}</button>
                            <button className="ea-mini" onClick={() => pedirPrestamo(tope)}>Pedir el máximo</button>
                          </div>
                        </div>
                      );
                    })()}
                    </Plegable>
                    )}
                    </div>
                  </div>
                )}

                {/* Tu dinero y tu fondo son la misma actividad —invertir—
                    y eran dos pestañas. El fondo llega en rango 4, asi
                    que hasta entonces esto es solo la cartera. */}
                {tab === "portafolio" && (
                  <PanelCartera st={s} onAplicar={aplicarCartera} onPendiente={setCarteraPend} />
                )}

                {/* ---- COMPRAR: las tres listas en un solo sitio ----
                     Inmuebles, mejoras y caprichos eran tres pestañas y
                     son la misma accion: sacar dinero y cambiarlo por
                     algo. Aqui se eligen por lo que hacen, no por en que
                     menu vivian. */}
                {tab === "comprar" && (
                  <div>
                    <div className="ea-grupos">
                      {GRUPOS_COMPRA.filter((g) => g.abierto).map((g) => (
                        <button key={g.id} className={"ea-grupo" + (grupo === g.id ? " on" : "")}
                          onClick={() => setGrupo(g.id)}>
                          <Icono k={g.ico} tam={15} />{g.n}
                        </button>
                      ))}
                    </div>
                    <div className="ea-itemD" style={{ margin: "4px 0 12px" }}>{GRUPO_ACT.d}</div>

                    {GRUPO_ACT.lista.map((c) => {
                      const esPerk = GRUPO_ACT.id === "mejoras";
                      const ya = esPerk ? tiene(s, c.id) : s.bienes.indexOf(c.id) >= 0;
                      const caro = s.cash + s.cartera < c.c;
                      const puede = esPerk ? true : puedeComprar(c, s);
                      return (
                        <div className={"ea-item" + (ya ? " tuyo" : "")} key={c.id}>
                          <div className="ea-itemTop">
                            <span className="ea-itemN ea-itemConIco">
                              <Icono k={ICONO_BIEN[c.id] || "moneda"} tam={19} />{c.n}
                            </span>
                            <span className="ea-mono" style={{ fontSize: 12.5, flexShrink: 0 }}>{fmt(c.c)}</span>
                          </div>
                          {!esPerk && (
                            <div className="ea-etqs">
                              {c.renta ? <span className="ea-etq act">renta {fmt(c.renta * 2)} al año</span> : null}
                              {c.ap ? <span className="ea-etq act">aprecia {(c.ap * 200).toFixed(1)}%</span> : null}
                              {c.dep ? <span className="ea-etq con">pierde {(c.dep * 200).toFixed(1)}% al año</span> : null}
                              {c.up ? <span className="ea-etq cost">mantener {fmt(c.up * 2)} al año</span> : null}
                              {c.vida ? <span className="ea-etq vida">+{c.vida} de tren de vida</span> : null}
                            </div>
                          )}
                          <div className="ea-itemD">{c.d}</div>
                          {ya
                            ? <span className="ea-tengo ea-dis">
                                {esPerk ? "Ya la tienes" : c.tipo === "consumo" ? "Ya lo tienes" : "Vale hoy USD " + fmt(s.valores[c.id] || 0)}
                              </span>
                            : !puede
                            ? <span className="ea-dis" style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--gris)" }}>{c.porQue || "Todavía no te toca"}</span>
                            : <button className={caro ? "ea-mini" : "ea-comprar ea-dis"} disabled={caro}
                                onClick={() => (esPerk ? comprarPerk(c) : comprarBien(c))}>
                                {caro ? "No te alcanza" : "Comprar"}
                              </button>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* El fondo vive dentro de Cartera: tu dinero y el dinero
                    que administras son la misma actividad, y eran dos
                    pestañas. Llega en rango 4, asi que hasta entonces
                    Cartera es solo la cartera. */}
                {tab === "portafolio" && abierto(s, "fondo") && (
                  <div style={{ marginTop: 24, borderTop: "1px solid var(--borde)", paddingTop: 18 }}>
                    <div className="ea-rot ea-dis">Tu fondo</div>
                    {!s.fondo && (
                      <div>
                        <div className="ea-itemD" style={{ marginBottom: 12 }}>
                          Para levantar tu propio fondo necesitas un patrimonio de USD {fmt(UMBRAL_FONDO)}, red y cargo.
                          Comprometes 2% del tamaño como capital propio, 1% si tu rama es private
                          equity. Cobras 2% anual de administración y veinte de las ganancias.
                        </div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Tu patrimonio</span><span className="ea-mono">USD {fmt(patrimonio)}</span></div>
                        {patrimonio >= UMBRAL_FONDO ? TAMANOS.map((t) => {
                          const pct = s.rama === "pe" ? 0.01 : 0.02;
                          const listo = s.red >= t.red && s.rango >= t.rango && s.cash + s.cartera >= t.m * pct;
                          return (
                            <div className="ea-item" key={t.n}>
                              <div className="ea-itemTop">
                                <span className="ea-itemN">Fondo de {t.n}</span>
                                <span className="ea-mono" style={{ fontSize: 12.5 }}>{fmt(t.m * pct)}</span>
                              </div>
                              <div className="ea-itemD">Pide red {t.red} y cargo de {RANGO(t.rango).n} hacia arriba.</div>
                              <button className="ea-mini" disabled={!listo} onClick={() => levantarFondo(t)}>
                                {listo ? "Levantar el fondo" : "Todavía no calificas"}
                              </button>
                            </div>
                          );
                        }) : (
                          <div className="ea-itemD" style={{ marginTop: 10 }}>Te faltan USD {fmt(Math.max(0, UMBRAL_FONDO - patrimonio))} de patrimonio.</div>
                        )}
                      </div>
                    )}
                    {s.fondo && (
                      <div>
                        <div className="ea-vidaCab">
                          <div>
                            <div className="ea-vidaN ea-dis">Fondo {ROMANOS[entero(s.fondo.generacion, 1, 1, 8)] || "I"}</div>
                            <div className="ea-vidaD">
                              Cobras 2% anual de administración y veinte de las ganancias
                              por encima del mínimo.
                            </div>
                          </div>
                          <div className="ea-vidaCifra ea-mono" style={{ fontSize: 21 }}>{fmtCorto(capacidadFondo(s.fondo))}</div>
                        </div>

                        <div className="ea-fila" style={{ marginTop: 10 }}><span style={{ fontSize: 12.5 }}>Capital comprometido</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
                        {s.fondo.reciclado > 0 && (
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ganancias reinvertidas</span><span className="ea-mono" style={{ color: "var(--verde)" }}>+ USD {fmt(s.fondo.reciclado)}</span></div>
                        )}
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Desplegado ahora</span><span className="ea-mono">USD {fmt(s.fondo.invertido)}</span></div>
                        <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Para invertir</span><span className="ea-mono" style={{ color: "var(--cobre)" }}>USD {fmt(Math.max(0, capacidadFondo(s.fondo) - s.fondo.invertido))}</span></div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ganancia realizada del fondo</span><span className="ea-mono">USD {fmt(s.fondo.realizado)}</span></div>
                        <div className="ea-itemD" style={{ marginTop: 7 }}>
                          Cuando una empresa se vende, su capital vuelve al fondo y la mitad de la ganancia
                          se queda dentro para volver a invertirse. Por eso el fondo no se agota: circula.
                        </div>

                        {puedeSiguienteFondo(s) && (
                          <div className="ea-caja" style={{ marginTop: 14 }}>
                            <div className="ea-lecK" style={{ color: "var(--cobre)" }}>Puedes levantar el siguiente fondo</div>
                            <div className="ea-itemD" style={{ marginTop: 4 }}>
                              Con el historial que ya tienes, los inversionistas te confían dos veces y media más:
                              USD {fmt(s.fondo.tam * SALTO_FONDO)}. Comprometes USD {fmt(s.fondo.tam * SALTO_FONDO * s.fondo.pct)} de tu propio bolsillo.
                            </div>
                            <button className="ea-mini" disabled={s.cash + s.cartera < s.fondo.tam * SALTO_FONDO * s.fondo.pct}
                              onClick={levantarSiguiente}>
                              {s.cash + s.cartera < s.fondo.tam * SALTO_FONDO * s.fondo.pct
                                ? "Te falta capital propio"
                                : "Levantar el Fondo " + (ROMANOS[entero(s.fondo.generacion, 1, 1, 8) + 1] || "siguiente")}
                            </button>
                          </div>
                        )}

                        <div className="ea-rot ea-dis" style={{ marginTop: 18 }}>En cartera</div>
                        {s.fondo.posiciones.length === 0 && <div className="ea-itemD">Todavía no has invertido en nada.</div>}
                        {s.fondo.posiciones.map((p, k) => (
                          <div className="ea-fondoC" key={k}>
                            <div className="ea-fondoT"><span className="ea-fondoN">{p.n}</span><span className="ea-mono" style={{ fontSize: 12 }}>{fmt(p.ticket)}</span></div>
                            <div className="ea-itemD">{p.s} · salida estimada en {Math.max(0, p.salida - s.turno)} años</div>
                          </div>
                        ))}

                        <div className="ea-rot ea-dis" style={{ marginTop: 18 }}>Sobre la mesa</div>
                        <div className="ea-itemD" style={{ marginBottom: 8 }}>
                          Los cinco indicadores están a la vista. En verde lo que juega a favor, en rojo lo que
                          debería frenarte. El múltiplo esperado sale de ellos, no al revés.
                        </div>
                        {(!s.fondo.oferta || s.fondo.oferta.length === 0) && <div className="ea-itemD">No hay oportunidades este año.</div>}
                        {(s.fondo.oferta || []).map((o, k) => (
                          <div className="ea-fondoC" key={k}>
                            <div className="ea-fondoT">
                              <span className="ea-fondoN">{o.n}</span>
                              <span className="ea-badge">{o.riesgo === 1 ? "Riesgo bajo" : o.riesgo === 2 ? "Riesgo medio" : "Riesgo alto"}</span>
                            </div>
                            {o.crec != null && (
                              <div className="ea-dealS">
                                {senalesDeal(o).map((x) => (
                                  <span key={x.k} className={"ea-sen" + (x.bien ? " bien" : x.mal ? " mal" : "")}>
                                    <span className="ea-senK">{x.k}</span>
                                    <span className="ea-senV ea-mono">{x.v}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                            {o.d ? <div className="ea-itemD">{o.d}</div> : null}
                            <div className="ea-itemD">{o.s} · ticket USD {fmt(o.ticket)} · múltiplo esperado {numero(o.base, 1.5).toFixed(2)}x</div>
                            {o.tomado ? <span className="ea-tengo ea-dis">Invertido</span> : (
                              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                                <button className="ea-mini" onClick={() => invertirEn(k, 1)}>Ticket completo</button>
                                <button className="ea-mini" onClick={() => invertirEn(k, 0.5)}>Medio ticket</button>
                                <button className="ea-mini" onClick={() => invertirEn(k, 0.25)}>Un cuarto</button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {tab === "expediente" && (
                  <div>
                    {/* ---- cómo vives: el índice, pero legible ---- */}
                    <div className="ea-rot ea-dis">Cómo vives</div>
                    <div className="ea-vidaCab">
                      <div>
                        <div className="ea-vidaN ea-dis">{nivelVida.n}</div>
                        <div className="ea-vidaD">{nivelVida.d}</div>
                      </div>
                      {/* el índice a solas no dice nada: va con su tope y su nombre */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div className="ea-vidaCifra ea-mono">
                          {indiceVida}<span style={{ fontSize: 15, color: "var(--gris)" }}> de {TOPE_VIDA}</span>
                        </div>
                        <div className="ea-dis" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--gris)", marginTop: 5 }}>
                          ÍNDICE DE TREN DE VIDA
                        </div>
                      </div>
                    </div>

                    {/* el medidor, con las marcas de cada escalón para que se vea
                        cuánto falta para el siguiente y cuánto llevas */}
                    <div className="ea-medidor">
                      <div className="ea-medidorF" style={{ width: (Math.min(1, indiceVida / TOPE_VIDA) * 100).toFixed(1) + "%" }} />
                      {NIVELES_VIDA.slice(1).map((x) => (
                        <div key={x.min} className="ea-medidorT" style={{ left: (Math.min(1, x.min / TOPE_VIDA) * 100).toFixed(1) + "%" }} />
                      ))}
                    </div>
                    <div className="ea-medidorE">
                      {NIVELES_VIDA.map((x) => (
                        <span key={x.min} className={x.n === nivelVida.n ? "on" : ""}>{x.n}</span>
                      ))}
                    </div>

                    {/* ---- lo que cuesta vivir así ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Lo que cuesta</div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Tu tren de vida al año</span>
                      <span className="ea-mono">USD {fmt(gastosAnuales)}</span>
                    </div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Mantenimiento de lo que tienes</span>
                      <span className="ea-mono">USD {fmt(mantenimientoAnual)}</span>
                    </div>
                    {s.hijos > 0 && (
                      <div className="ea-fila">
                        <span style={{ fontSize: 12.5 }}>{s.hijos === 1 ? "Tu hijo" : "Tus " + s.hijos + " hijos"}</span>
                        <span className="ea-mono">USD {fmt(costoHijos)}</span>
                      </div>
                    )}
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Te queda después de impuestos</span>
                      <span className="ea-mono">USD {fmt(netoDelAno)}</span>
                    </div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Se lleva</span>
                      <span className="ea-mono" style={{ color: pesoTren > 0.95 ? "var(--rojo)" : pesoTren > 0.75 ? "var(--cobre)" : "var(--verde)" }}>
                        {Math.round(pesoTren * 100)}% de lo que entra
                      </span>
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 8 }}>
                      {pesoTren > 0.95
                        ? "Gastas más de lo que ganas. Cada año que sigas así se financia vendiendo cartera, y esa es la forma más silenciosa de no llegar nunca."
                        : pesoTren > 0.75
                          ? "Te queda algo, pero poco. Subir un escalón más de tren de vida aquí significa dejar de acumular."
                          : "Tienes margen real para ahorrar. Es exactamente el momento en que la mayoría lo gasta."}
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>
                      Cada punto de índice sube tu meta de independencia: necesitas 25 veces tu gasto anual,
                      o sea USD {fmt(gastosAnuales * 25)}. Vivir mejor es legítimo; solo conviene saber lo que mueve la meta.
                    </div>

                    {/* ---- tu gente ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Tu gente</div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Pareja</span>
                      <span className="ea-mono">{parejaTxt}</span>
                    </div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Hijos</span>
                      <span className="ea-mono">{s.hijos}</span>
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>
                      Esto no se compra en ninguna lista: sale de lo que decides cuando la vida te lo pregunta.
                      Y sí cambia los números, para bien y para mal.
                    </div>

                    {/* Los caprichos se mudaron a Comprar, con los
                        inmuebles y las mejoras: las tres eran la misma
                        accion en tres pestañas distintas. Aqui queda el
                        atajo, que es donde uno mira su tren de vida y
                        piensa en subirlo. */}
                    <button className="ea-comprar ea-dis" style={{ marginTop: 18 }}
                      onClick={() => { setGrupo("caprichos"); setTab("comprar"); }}>
                      Comprar algo para ti
                    </button>

                    {/* ---- el legado: premios ---- */}
                    {(Array.isArray(s.premios) ? s.premios : []).length > 0 && (
                      <div>
                        <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Tu nombre</div>
                        {s.premios.map((id) => {
                          const p = PREMIO_DE(id);
                          if (!p) return null;
                          return (
                            <div className="ea-item" key={id}>
                              <div className="ea-itemTop">
                                <span className="ea-itemN">{p.n}</span>
                                <span className="ea-etq act" style={{ flexShrink: 0 }}>{p.mundial ? "mundial" : "nacional"}</span>
                              </div>
                              <div className="ea-itemD">{p.x}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* ---- lo que aprendiste ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>De qué aprendiste</div>
                    {(Array.isArray(s.temas) ? s.temas : []).length === 0 ? (
                      <div className="ea-itemD">Todavía no has dado ninguna clase. Aparecen cuando te toca una cátedra.</div>
                    ) : (
                      <div>
                        <div className="ea-itemD" style={{ marginBottom: 8 }}>
                          {s.temas.length} {s.temas.length === 1 ? "tema dado" : "temas dados"}. De estos, y solo de
                          estos, te puede examinar el juego.
                        </div>
                        <div className="ea-etqs">
                          {s.temas.map((id) => {
                            const t = TEMAS.find((x) => x.id === id);
                            return t ? <span className="ea-etq" key={id}>{t.n}</span> : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* ---- el mejor año, el peor, y las caídas ---- */}
                    {(() => {
                      const h = Array.isArray(s.histo) ? s.histo : [];
                      let mejor = null, peor = null;
                      for (let i = 1; i < h.length; i++) {
                        const dif = numero(h[i], 0) - numero(h[i - 1], 0);
                        if (!mejor || dif > mejor.dif) mejor = { dif, ano: 2026 + i - 1 };
                        if (!peor || dif < peor.dif) peor = { dif, ano: 2026 + i - 1 };
                      }
                      const caidas = [];
                      if (s.burnouts > 0) caidas.push(s.burnouts + (s.burnouts === 1 ? " parón por agotamiento" : " parones por agotamiento"));
                      if (s.despidos > 0) caidas.push(s.despidos + (s.despidos === 1 ? " despido" : " despidos"));
                      if (s.quiebras > 0) caidas.push(s.quiebras + (s.quiebras === 1 ? " quiebra" : " quiebras"));
                      if (s.embargos > 0) caidas.push(s.embargos + (s.embargos === 1 ? " embargo" : " embargos"));
                      if (!mejor && !caidas.length) return null;
                      return (
                        <div>
                          <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Los años que se recuerdan</div>
                          <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cargo alcanzado</span><span className="ea-mono">{RANGO(s.rango).n}</span></div>
                          {mejor && mejor.dif > 0 && (
                            <div className="ea-fila">
                              <span className="ea-dis" style={{ fontSize: 12 }}>Tu mejor año</span>
                              <span className="ea-mono" style={{ color: "#4FA05C" }}>{mejor.ano} · +USD {fmt(mejor.dif)}</span>
                            </div>
                          )}
                          {peor && peor.dif < 0 && (
                            <div className="ea-fila">
                              <span className="ea-dis" style={{ fontSize: 12 }}>El año que dolió</span>
                              <span className="ea-mono" style={{ color: "var(--rojo)" }}>{peor.ano} · −USD {fmt(Math.abs(peor.dif))}</span>
                            </div>
                          )}
                          <div className="ea-fila">
                            <span className="ea-dis" style={{ fontSize: 12 }}>Caídas</span>
                            <span className="ea-mono">{caidas.length ? caidas.join(" · ") : "ninguna"}</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ---- el expediente ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Lo que quedó en tu expediente</div>
                    {s.titulares.length === 0 && <div className="ea-itemD">Todavía no ha pasado nada digno de archivo.</div>}
                    {s.titulares.slice(-18).reverse().map((t, i) => (
                      <div className="ea-tit" key={i}><span className="ea-titQ ea-mono">{t.q}</span><span>{t.t}</span></div>
                    ))}
                  </div>
                )}
                </div>
              </div>
            </div>
            )}

            <div>
              {/* ---- las decisiones que pesan, en el centro ----
                  Antes habia una tarjeta de dos segundos que anunciaba la
                  escena y despues la decision volvia a salir en el mismo
                  memorando de siempre: la decision EN SI seguia viendose
                  como una opcion cualquiera. Ahora una oferta de trabajo,
                  casarse o una legendaria se juegan enteras a pantalla
                  completa. Mismo memorando, mismas opciones y mismos
                  candados —un solo camino de pintado—, solo que dentro de
                  un marco que se lleva la pantalla. */}
              {fase === "evento" && ev && (() => {
                const cl = CLASE_ESCENA(ev);
                return (
                <Marco drama={pesada(ev)} tono={cl.c} ico={cl.k} clase={cl.n} ano={ano}>
                <div className={"ea-memo ea-memo-" + cl.k + (pesada(ev) ? " ea-memoDrama" : "")} key={ev.id}>
                  <div className={"ea-memoHead ea-dis" + (ev.legendaria ? " clave legend" : ev.clave ? " clave" : "")}>
                    <span>{cl.n}</span><span>{ano}</span>
                  </div>
                  {/* El sello de la clase de escena: entra girando y se
                      asienta. Es lo que hace que un dia de oficina y la
                      decision que parte tu carrera no se vean igual. */}
                  <div className="ea-selloClase" style={{ color: cl.c }}>
                    <Icono k={cl.k} tam={30} />
                  </div>
                  <h2 className="ea-memoTit ea-dis">{ev.t}</h2>
                  <p className="ea-memoTxt">{ev.x}</p>
                  <div className="ea-ops">
                    {/* Una sola linea de letra chica por opcion. Antes cada
                        opcion podia arrastrar cuatro: el minijuego con su tema,
                        la ayuda, la rama y el efecto. Debajo de una frase de
                        una linea, eso es mas metadato que decision. */}
                    {(() => {
                      const ops = opcionesDe(ev);
                      let faltas = ops.map((o) => { try { return faltaDe(o, s); } catch (e) { return null; } });
                      /* El guardarrail. Si TODAS quedaran bloqueadas el
                         jugador se queda encerrado en la escena, asi que
                         en ese caso se abren todas: quedarse sin energia
                         encarece la vida, no la termina. */
                      if (faltas.length && faltas.every(Boolean)) faltas = faltas.map(() => null);
                      return ops.map((o, i) => {
                        const tipo = o.juego || o.j;
                        const efs = efectosDe(o);
                        const falta = faltas[i];
                        const bits = [];
                        if (tipo) bits.push(JUEGO(tipo).n + " · te ayuda " + (ETIQ[o.stat] || "Criterio") + " " + Math.round(ayudaDe(o)));
                        return (
                          <button className={"ea-op" + (falta ? " sinfuerza" : "")} key={i}
                            style={{ "--i": i }}
                            disabled={carteraPend || !!falta}
                            title={falta ? "Te falta " + (ETIQ[falta.k] || falta.k).toLowerCase() : undefined}
                            onClick={() => elegir(o)}>
                            <span className="ea-opN ea-mono">{String.fromCharCode(65 + (i % 26))}</span>{o.t}
                            {o.req && !falta && <span className="ea-opSolo ea-dis">solo tú</span>}
                            {/* Con el nombre del atributo, no solo el icono:
                                esto es un «por qué no puedo hacer esto» y
                                ahí no se adivina. */}
                            {falta && (
                              <span className="ea-opCandado ea-dis">
                                <Icono k="candado" tam={12} />
                                {(ETIQ[falta.k] || falta.k)} {falta.tengo} de {falta.hace}
                              </span>
                            )}
                            {/* Lo que gana y lo que cuesta, en simbolos:
                                un rayo con su cifra se lee de un vistazo
                                y «cuesta energía» hay que leerlo. */}
                            {efs.length > 0 && (
                              <span className="ea-efs">
                                {efs.map((e, n) => {
                                  const fuerza = fuerzaDe(e.k, e.v);
                                  const signo = (e.v > 0 ? "+" : "−").repeat(fuerza);
                                  return (
                                    <span key={n} className={"ea-ef " + (e.v > 0 ? "pos" : "neg")}
                                      title={(ETIQ[e.k] || e.k) + ", " + (e.v > 0 ? "sube" : "baja")
                                        + " " + (fuerza === 3 ? "mucho" : fuerza === 2 ? "bastante" : "un poco")}>
                                      <span className="ea-efS ea-mono" aria-hidden="true">{signo}</span>
                                      <Icono k={ICONO_ATRIB[e.k]} tam={13} />
                                    </span>
                                  );
                                })}
                              </span>
                            )}
                            {bits.length > 0 && <span className="ea-opTag">{bits.join(" · ")}</span>}
                          </button>
                        );
                      });
                    })()}
                    {opcionesDe(ev).length === 0 && (
                      <button className="ea-op" onClick={() => resolverEscena({ msg: "El asunto se resolvió sin que te tocara decidir." }, "parcial", null)}>
                        <span className="ea-opN ea-mono">A</span>Dejar que siga su curso
                      </button>
                    )}
                  </div>
                </div>
                </Marco>
                );
              })()}

              {/* Sin memorando alrededor: la tarjeta se lleva la pantalla
                  entera ella sola, en sus tres pasos. */}
              {fase === "minijuego" && op && (
                <TarjetaJuego tipo={op.juego || op.j} ayuda={ayudaDe(op)} nivel={nivelDe(s.turno, s.estudia)}
                  statN={ETIQ[op.stat] || "Criterio"} onFin={finJuego} modo={s.modo}
                  temas={s.temas} onTema={apuntarTema}
                  visto={(Array.isArray(s.jugados) ? s.jugados : []).indexOf(op.juego || op.j) >= 0}
                  onVisto={apuntarJuego} />
              )}

              {fase === "resultado" && res && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis"><span>Resolución</span><span>{ano}</span></div>
                  <div className={"ea-sello ea-dis" + selloCls[res.nivel]}>{selloTxt[res.nivel]}</div>
                  <h2 className="ea-memoTit ea-dis">{(ev && ev.t) || "Resolución"}</h2>
                  <p className="ea-memoTxt">{res.msg}</p>
                  {/* El dinero deja de ser un chip entre seis. Es lo que el
                      jugador vino a ver, asi que sale solo, grande y
                      contando; los atributos quedan detras, en pequeño. */}
                  {(() => {
                    const plata = res.cambios.find((c) => c.k === "cash" && c.v);
                    if (!plata) return null;
                    const sube = plata.v > 0;
                    return (
                      <div className={"ea-golpe " + (sube ? "sube" : "baja")}>
                        <span className="ea-golpeS">{sube ? "+" : "−"}</span>
                        <span className="ea-golpeV ea-mono"><Cifra v={Math.abs(plata.v)} desde={0} ms={800} /></span>
                        <span className="ea-golpeU ea-dis">USD</span>
                      </div>
                    );
                  })()}
                  {res.cambios.filter((c) => (c.nota || c.v) && c.k !== "cash").length > 0 && (
                    <div className="ea-cambios">
                      {res.cambios.filter((c) => (c.nota || c.v) && c.k !== "cash").map((c, i) => (
                        <span className={"ea-chip ea-mono " + (c.nota ? "pos" : c.v > 0 ? "pos" : "neg")} key={i}
                          style={{ animationDelay: (260 + i * 90) + "ms" }}>
                          {c.nota ? c.nota : (ETIQ[c.k] + " " + (c.v > 0 ? "+" : "") + c.v)}
                        </span>
                      ))}
                    </div>
                  )}
                  <button className="ea-btn" disabled={carteraPend} onClick={siguienteEscena}>
                    {cola.length > 0 ? "Lo siguiente que pasó" : "Cerrar el año"}
                  </button>
                </div>
              )}

              {fase === "cierre" && cierre && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis clave"><span>Cierre del año</span><span>{cierre.ano}</span></div>
                  <h2 className="ea-memoTit ea-dis">Así terminó {cierre.ano}</h2>

                  {/* El numero grande ya se vio a pantalla completa en el
                      rodillo, asi que aqui la cabecera es una linea: como
                      quedaste, cuanto se movio, cuanto ahorraste y cuanto
                      cubres. El resto vive en tres cajones, no en seis. */}
                  <div className="ea-titular">
                    <div className="ea-titularK ea-dis">Tu patrimonio</div>
                    <div className="ea-titularV ea-mono" style={{ fontSize: 26 }}>USD {fmt(cierre.patrimonio)}</div>
                    <div className="ea-titularL">
                      <span className="ea-mono" style={{ color: cierre.patrimonio >= cierre.patAntes ? "#2E7A3D" : "#8A2E1E" }}>
                        {cierre.patrimonio >= cierre.patAntes ? "+" : "−"}{fmt(Math.abs(cierre.patrimonio - cierre.patAntes))} en el año
                      </span>
                      <span className="ea-mono" style={{ color: cierre.ahorro >= 0 ? "#2E7A3D" : "#8A2E1E" }}>
                        ahorraste {Math.round(cierre.ahorro * 100)}%
                      </span>
                      <span className="ea-mono">cubres {Math.round(cierre.cobertura * 100)}% de tu vida</span>
                    </div>
                    {cierre.ascenso && <div className="ea-titularA ea-dis">Ascenso a {cierre.ascenso}</div>}
                    {/* la barra de independencia deja de ser un cajon propio:
                        era un numero y una barra, y ya estan aqui */}
                    <div className="ea-ind" style={{ marginTop: 10 }}>
                      <div className="ea-indF" style={{ width: Math.min(100, cierre.indep * 100) + "%" }} />
                      <div className="ea-indM" style={{ left: "71.4%" }} />
                    </div>
                  </div>

                  {/* La leccion era un parrafo de siete lineas, y es lo
                      primero que se ve al cerrar el año. Ahora se lee el
                      titular y la primera frase; el resto, que es donde
                      van tus cifras concretas, espera a que lo pidas. */}
                  {cierre.leccion && (() => {
                    const x = texto(cierre.leccion.x, "", 1200);
                    const corte = x.search(/\.\s/);
                    const primera = corte > 0 ? x.slice(0, corte + 1) : x;
                    const resto = corte > 0 ? x.slice(corte + 2) : "";
                    return (
                      <div className="ea-lec" style={{ marginTop: 14 }}>
                        <div className="ea-lecK">Lo que enseña este año</div>
                        <div className="ea-lecT">{cierre.leccion.t}</div>
                        <div className="ea-lecX">{primera}</div>
                        {resto && !verLeccion && (
                          <button className="ea-atras ea-dis" style={{ marginTop: 6, marginBottom: 0 }}
                            onClick={() => setVerLeccion(true)}>↓ Con tus números</button>
                        )}
                        {resto && verLeccion && <div className="ea-lecX ea-panelAb" style={{ marginTop: 6 }}>{resto}</div>}
                      </div>
                    );
                  })()}

                  {cierre.hitos.length > 0 && (
                    <div className="ea-hitos">
                      {cierre.hitos.map((h, i) => (
                        <span className="ea-hito" key={i} style={{ animationDelay: (i * 100) + "ms" }}>{h}</span>
                      ))}
                    </div>
                  )}

                  {/* Lo que paso sale a la vista: es lo unico del informe que
                      cuenta algo en vez de dar un dato, y estaba plegado. */}
                  {cierre.notas.length > 0 && (
                    <div style={{ marginTop: 14 }}>
                      {cierre.notas.map((n, i) => (
                        <div key={i} className="ea-td" style={{ fontSize: 13.5, marginBottom: 6 }}>{n}</div>
                      ))}
                    </div>
                  )}

                  <div className="ea-plegs">

                  {/* CAJON 1 · el dinero del año, con el reparto del
                      patrimonio dentro: antes eran dos cajones que decian
                      medio lo mismo. */}
                  <Plegable titulo="El año en plata" resumen={(cierre.neto >= 0 ? "+" : "−") + fmt(Math.abs(cierre.neto))}
                    tono={cierre.neto >= 0 ? "#2E7A3D" : "#8A2E1E"}>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                      <Flujo titulo={"Entró USD " + fmt(cierre.ingreso)} lista={cierre.ing} tope={cierre.ingreso} />
                      <Flujo titulo={"Salió USD " + fmt(cierre.egreso)} lista={cierre.egr} tope={cierre.ingreso} neg />
                    </div>
                    <div className="ea-flin" style={{ marginTop: 12, fontSize: 13.5, color: "#3D3D3D" }}>
                      <span className="ea-dis">Te quedaste con</span>
                      <span className="ea-mono" style={{ textAlign: "right", color: cierre.neto >= 0 ? "#3D8A49" : "var(--rojo)" }}>{fmt(cierre.neto)}</span>
                    </div>
                    <div className="ea-flbar" style={{ height: 12 }}>
                      <div className={"ea-flfill" + (cierre.ahorro < 0 ? " neg" : "")}
                        style={{ width: Math.min(100, Math.abs(cierre.ahorro) * 100) + "%" }} />
                    </div>
                    {cierre.deuda && (
                      <div className="ea-alerta mal">
                        Cerraste el año en rojo por USD {fmt(-s.cash)}: gastas más de lo que entra y la diferencia se financia.
                      </div>
                    )}
                    <div className="ea-tabla" style={{ marginTop: 14 }}>
                      <span className="ea-td">Efectivo</span><span className="ea-tdn ea-mono">{fmt(s.cash)}</span>
                      <span className="ea-td">Cartera invertida</span><span className="ea-tdn ea-mono">{fmt(s.cartera)}</span>
                      <span className="ea-td">Bienes</span><span className="ea-tdn ea-mono">{fmt(cierre.bienesV)}</span>
                    </div>
                    <Chispa datos={cierre.histo} desde={2026} />
                  </Plegable>

                  {/* CAJON 2 · la cartera */}
                  {cierre.cartera && (
                    <Plegable titulo="Tu cartera, mes a mes"
                      resumen={(cierre.cartera.ret >= 0 ? "+" : "") + (cierre.cartera.ret * 100).toFixed(1) + "%"}
                      tono={cierre.cartera.ret >= 0 ? "#2E7A3D" : "#8A2E1E"}>
                      <div className="ea-mono" style={{ fontSize: 21, color: "#3D3D3D" }}>
                        {fmt(cierre.cartera.antes)} → {fmt(cierre.cartera.despues)}
                      </div>
                      <div className="ea-dis" style={{ fontSize: 15, color: cierre.cartera.ret >= 0 ? "#3D8A49" : "var(--rojo)" }}>
                        {cierre.cartera.ret >= 0 ? "+" : ""}{(cierre.cartera.ret * 100).toFixed(1)}% · {cierre.cartera.ret >= 0 ? "ganaste" : "perdiste"} USD {fmt(Math.abs(cierre.cartera.despues - cierre.cartera.antes))}
                      </div>
                      {cierre.cartera.camino && <Curva camino={cierre.cartera.camino} ret={cierre.cartera.ret} hitos={cierre.hitosDec} />}
                      <div className="ea-td" style={{ marginTop: 3 }}>
                        Esperabas {(cierre.cartera.mu * 100).toFixed(1)} con una desviación de {(cierre.cartera.sd * 100).toFixed(1)} puntos.
                        {cierre.cartera.aporte > 100 ? " Metiste USD " + fmt(cierre.cartera.aporte) + " de aporte nuevo." : cierre.cartera.aporte < -100 ? " Sacaste USD " + fmt(-cierre.cartera.aporte) + " de la cartera." : ""}
                      </div>
                      <div style={{ marginTop: 10 }}>
                        {cierre.cartera.detalle.map((d, i) => (
                          <div key={i} style={{ marginBottom: 4 }}>
                            <div className="ea-flin">
                              <span>{d.n} · {Math.round(d.w * 100)}%</span>
                              <span className="ea-mono" style={{ textAlign: "right", color: d.r >= 0 ? "#3D8A49" : "var(--rojo)" }}>
                                {d.r >= 0 ? "+" : ""}{(d.r * 100).toFixed(1)}
                              </span>
                            </div>
                            <div className="ea-flbar" style={{ height: 6 }}>
                              <div className={"ea-flfill" + (d.r < 0 ? " neg" : "")} style={{ width: Math.min(100, Math.abs(d.r) * 260) + "%" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Plegable>
                  )}

                  {/* CAJON 3 · lo que hizo el mercado */}
                  <Plegable titulo="Las noticias del año"
                    resumen={cierre.notis.length ? cierre.notis.length + (cierre.notis.length === 1 ? " noticia" : " noticias") : "sin novedades"}>
                    {cierre.notis.map((n, i) => (
                      <div className="ea-noti" key={i} style={{ marginTop: i === 0 ? 0 : 8 }}>
                        <div className="ea-notiK">{n.k}</div>
                        <div className="ea-notiT">{n.t}</div>
                      </div>
                    ))}
                    {cierre.notis.length === 0 && <div className="ea-td">Un año sin sobresaltos en los mercados.</div>}
                  </Plegable>

                  </div>

                  <button className="ea-btn" disabled={carteraPend} onClick={siguienteAno}>
                    {fin ? "Ver el balance final" : s.turno >= tope ? "Sentarte a hacer cuentas" : "Empezar " + (cierre.ano + 1)}
                  </button>
                  {/* Retirarse deja de ser algo que el juego te impone en un año
                      concreto: en cuanto tu patrimonio cubre lo que cuesta tu
                      vida, la puerta está abierta y la decisión es tuya. */}
                  {!fin && cobertura >= 1 && (
                    <div style={{ marginTop: 10 }}>
                      <button className="ea-descartar ea-dis" style={{ width: "100%", padding: "12px 18px" }}
                        disabled={carteraPend} onClick={retirarse}>
                        Retirarme ya · tu patrimonio cubre {Math.round(cobertura * 100)}% de tu vida
                      </button>
                      <div className="ea-td" style={{ fontSize: 11.5, marginTop: 6, textAlign: "center" }}>
                        Retirando 4% al año dispondrías de USD {fmt(retiroAnual)}
                        {s.hijos > 0 ? " para ti, tu pareja y " + s.hijos + (s.hijos === 1 ? " hijo" : " hijos") : ""}
                        {". Nadie te obliga a seguir jugando."}
                      </div>
                    </div>
                  )}
                  {!fin && <div className="ea-td" style={{ fontSize: 11.5, marginTop: 7, textAlign: "center" }}>
                    Al pasar de año la partida se guarda sola. Puedes cerrar y volver después.
                  </div>}
                </div>
              )}

              {fase === "retiro" && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis clave"><span>Decisión de vida</span><span>{edad(s.turno, s.edadIni)} años</span></div>
                  <h2 className="ea-memoTit ea-dis">¿Te retiras?</h2>
                  <p className="ea-memoTxt">
                    Llegaste a los {edad(s.turno, s.edadIni)}. Puedes cerrar aquí y vivir de lo que construiste, o seguir cinco años
                    más y ver hasta dónde llega. Los números son estos.
                  </p>
                  <div className="ea-res" style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Patrimonio total USD {fmt(patrimonio)}, de los cuales USD {fmt(bienesVal)} están en bienes.</div>
                    <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Retirando 4% al año dispondrías de USD {fmt(retiroAnual)}.</div>
                    {rentaProps > 0 && <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Tus propiedades rentan USD {fmt(rentaProps)} al año.</div>}
                    <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>Tu forma de vivir cuesta USD {fmt(gastosAnuales)} al año.</div>
                    <div className="ea-dis" style={{ marginTop: 11, fontSize: 17, color: cobertura >= 1 ? "#3D8A49" : "var(--rojo)" }}>
                      {cobertura >= 1 ? "Te alcanza y sobra" : cobertura >= 0.7 ? "Te queda corto por poco" : "No te alcanza"} · cubres el {Math.round(cobertura * 100)}%
                    </div>
                  </div>
                  <div className="ea-fila2">
                    <button className="ea-btn" style={{ marginTop: 14 }} onClick={retirarse}>Retirarme ahora</button>
                    <button className="ea-btn" style={{ marginTop: 14, background: "var(--cobre)" }} onClick={seguirCinco}>Seguir cinco años más</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          EL ANUNCIO DEL AÑO
          Tapa el informe hasta que el jugador ha visto cuanto tiene. Es
          el unico momento del juego que no pide leer nada: un numero
          grande girando y cuanto se movio. El informe espera debajo.
          ============================================================ */}
      {fase === "cierre" && cierre && anuncio && (() => {
        const sube = cierre.patrimonio >= cierre.patAntes;
        const dif = Math.abs(cierre.patrimonio - cierre.patAntes);
        return (
          <div className="ea-anuncio" onClick={() => setAnuncio(false)}>
            {/* Ojo al tocar esta linea: «Asi terminó» es lo que cuenta
                finales.js para saber cuantos años se jugaron, y esta en
                la cabecera del informe. Repetirla aqui hacia que cada
                año se contara dos veces. */}
            <div className="ea-anuncioK ea-dis">Cierre de {cierre.ano}</div>
            <div className="ea-anuncioN ea-mono">
              <span className="ea-anuncioU ea-dis">USD</span>
              <Rodillo v={cierre.patrimonio} />
            </div>
            <div className={"ea-anuncioD ea-mono " + (sube ? "sube" : "baja")}
              style={{ animationDelay: "1.5s" }}>
              {sube ? "+" : "−"}{fmt(dif)} en el año
            </div>
            {cierre.ascenso && (
              <div className="ea-anuncioL ea-dis" style={{ animationDelay: "1.8s", color: "var(--cobre)", fontSize: 16 }}>
                Ascenso a {cierre.ascenso}
              </div>
            )}
            {cierre.hitos.length > 0 && (
              <div className="ea-anuncioL" style={{ animationDelay: "2s" }}>{cierre.hitos.join(" · ")}</div>
            )}
            <div className="ea-anuncioB" style={{ animationDelay: "2.2s" }}>
              <button className="ea-jugarYa ea-dis" style={{ fontSize: 15, padding: "13px 30px" }}
                onClick={(e) => { e.stopPropagation(); setAnuncio(false); }}>
                Ver el año
              </button>
            </div>
          </div>
        );
      })()}

      {nuevoSistema && (() => {
        const ap = APERTURAS.find((a) => a.id === nuevoSistema);
        const g = ap && ap.guia;
        if (!g) return null;
        /* A donde lleva el boton «Ver la seccion». Con las pestañas
           fusionadas ya no hay una por sistema: inmuebles y mejoras caen
           en Comprar, el fondo en Cartera, y el banco en Ficha. */
        const DESTINO = { cartera: "portafolio", fondo: "portafolio", vida: "expediente",
          inmuebles: "comprar", mejoras: "comprar", banco: "ficha" };
        const destino = DESTINO[nuevoSistema] || null;
        return (
          <div className="ea-modalFondo" onClick={() => setNuevoSistema(null)}>
            <div className="ea-modal ea-panelAb" onClick={(e) => e.stopPropagation()}>
              <div className="ea-modalCab">
                <span className="ea-modalT ea-dis">SECCIÓN NUEVA</span>
                <button className="ea-modalX ea-dis" aria-label="Cerrar" onClick={() => setNuevoSistema(null)}>✕</button>
              </div>
              <div className="ea-modalCuerpo">
                <div className="ea-nuevoK ea-dis">ACABAS DE ABRIR</div>
                <div className="ea-nuevoT ea-dis">{g.t}</div>
                <div className="ea-nuevoX">{g.x}</div>
                <ul className="ea-nuevoP">
                  {g.puntos.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                  {destino && (
                    <button className="ea-aplicar ea-dis" onClick={() => { setTab(destino); setNuevoSistema(null); }}>
                      Ver la sección
                    </button>
                  )}
                  <button className="ea-descartar ea-dis" onClick={() => setNuevoSistema(null)}>Después</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {fase === "fin" && (
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>
            {s.nombre ? s.nombre + " · " : ""}{edad(s.turno, s.edadIni)} años · {nacion.n} · {estudio.n}
          </div>
          <h2 className="ea-final ea-dis">{veredicto.t}</h2>
          <p className="ea-lede">{veredicto.x}</p>
          <div className="ea-regla" />
          <div className="ea-cifras">
            <div><div className="ea-cifraK">Cargo final</div><div className="ea-cifraV ea-dis">{RANGO(s.rango).n}</div></div>
            <div><div className="ea-cifraK">Rama</div><div className="ea-cifraV ea-dis">{ramaN || "sin definir"}</div></div>
            <div><div className="ea-cifraK">Patrimonio</div><div className="ea-cifraV ea-mono">USD {fmt(patrimonio)}</div></div>
            {s.deuda > 0 && <div><div className="ea-cifraK">Deuda pendiente</div><div className="ea-cifraV ea-mono">USD {fmt(s.deuda)}</div></div>}
            {s.quiebras > 0 && <div><div className="ea-cifraK">Quiebras</div><div className="ea-cifraV ea-mono">{s.quiebras}</div></div>}
            <div><div className="ea-cifraK">Renta anual al 4%</div><div className="ea-cifraV ea-mono">USD {fmt(retiroAnual)}</div></div>
            <div><div className="ea-cifraK">Gasto anual</div><div className="ea-cifraV ea-mono">USD {fmt(gastosAnuales)}</div></div>
            <div><div className="ea-cifraK">Tren de vida</div><div className="ea-cifraV ea-dis">{nivelDeVida(vidaTotal(s)).n}</div></div>
            {(Array.isArray(s.premios) ? s.premios : []).length > 0 && (
              <div>
                <div className="ea-cifraK">Reconocimientos</div>
                <div className="ea-cifraV ea-dis">{s.premios.length}{s.premios.some((id) => (PREMIO_DE(id) || {}).mundial) ? " · con uno mundial" : ""}</div>
              </div>
            )}
            <div>
              <div className="ea-cifraK">Cuánto cuesta sostenerlo</div>
              <div className="ea-cifraV ea-mono">USD {fmt(gastosAnuales)} al año</div>
            </div>
          </div>

          {/* Los seis datos salen del estado: nada que copiar a mano. */}
          <BotonAnotar entrada={{
            n: s.nombre,
            c: RANGO(s.rango).n,
            e: edad(s.turno, s.edadIni),
            p: Math.round(patrimonio),
            m: (Array.isArray(s.premios) ? s.premios : []).length,
            v: texto(veredicto && veredicto.t, 60),
          }} />

          <div className="ea-panel" style={{ marginTop: 16, textAlign: "left" }}>
            <PanelRegistro tope={20} titulo="El registro, por patrimonio" />
          </div>
          {s.fondo && (
            <div className="ea-panel" style={{ marginTop: 24 }}>
              <div className="ea-rot ea-dis">Tu gestora</div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Generación alcanzada</span><span className="ea-mono">Fondo {ROMANOS[entero(s.fondo.generacion, 1, 1, 8)] || "I"}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Capital comprometido</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Ganancias reinvertidas</span><span className="ea-mono">USD {fmt(s.fondo.reciclado || 0)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Ganancia realizada</span><span className="ea-mono" style={{ color: (s.fondo.realizado || 0) >= 0 ? "var(--verde)" : "var(--rojo)" }}>USD {fmt(s.fondo.realizado)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Múltiplo sobre lo comprometido</span><span className="ea-mono">{s.fondo.tam > 0 ? (1 + (s.fondo.realizado || 0) / s.fondo.tam).toFixed(2) + "x" : "—"}</span></div>
            </div>
          )}
          {/* Lo que venía después. Retirarse a los 50 dejaba invisible lo que
              faltaba: quince años de interés compuesto y de sueldo. */}
          {(() => {
            const miEdad = edad(s.turno, s.edadIni);
            if (miEdad >= 65) return null;
            const faltan = 65 - miEdad;
            const mu = statsPesos(mezclaAct).mu;
            const sinTocar = patrimonio * Math.pow(1 + mu, faltan);
            const deSueldo = netoAnual(s) * faltan;
            return (
              <div className="ea-panel" style={{ marginTop: 24 }}>
                <div className="ea-rot ea-dis">Lo que venía después</div>
                <div className="ea-itemD" style={{ marginBottom: 10 }}>
                  Te retiraste a los {miEdad}. Hasta la edad en la que se retira la mayoría te
                  quedaban {faltan} {faltan === 1 ? "año" : "años"}, y esto es lo que traían.
                </div>
                <div className="ea-fila"><span style={{ fontSize: 13 }}>Tu patrimonio a los 65, sin tocarlo</span><span className="ea-mono">USD {fmt(sinTocar)}</span></div>
                <div className="ea-fila"><span style={{ fontSize: 13 }}>Solo por dejarlo quieto</span><span className="ea-mono">+USD {fmt(sinTocar - patrimonio)}</span></div>
                <div className="ea-fila"><span style={{ fontSize: 13 }}>Sueldo neto que dejaste sobre la mesa</span><span className="ea-mono">USD {fmt(deSueldo)}</span></div>
                <div className="ea-fila"><span style={{ fontSize: 13 }}>Retirando 4% al año</span><span className="ea-mono">USD {fmt(retiroAnual)} · gastas {fmt(gastosAnuales)}</span></div>
                <div className="ea-itemD" style={{ marginTop: 9 }}>
                  {mu > 0
                    ? "Calculado al " + (mu * 100).toFixed(1) + "% que esperaba tu cartera el día que la dejaste, y sin descontar lo que habrías gastado. No es una promesa: es el orden de magnitud de lo que hace el tiempo cuando ya no tienes que hacer nada."
                    : "Tu cartera no esperaba rendir nada, así que el tiempo tampoco iba a trabajar a tu favor."}
                </div>
              </div>
            );
          })()}

          {/* El fondo se cerraba sin contar sus posiciones abiertas, así que
              su rendimiento real quedaba invisible. Aquí se valoran al
              múltiplo base de cada una, sin azar. */}
          {s.fondo && s.fondo.posiciones && s.fondo.posiciones.length > 0 && (() => {
            const abiertas = s.fondo.posiciones;
            const capital = abiertas.reduce((a, p) => a + numero(p.ticket, 0), 0);
            const valor = abiertas.reduce((a, p) => a + numero(p.ticket, 0) * numero(p.base, 1.5), 0);
            const tuParte = abiertas.reduce((a, p) => {
              const proc = numero(p.ticket, 0) * numero(p.base, 1.5);
              const carry = Math.max(0, proc - numero(p.ticket, 0) * 1.4) * 0.2;
              return a + carry + (proc - numero(p.ticket, 0)) * numero(s.fondo.pct, 0.02);
            }, 0);
            return (
              <div className="ea-panel" style={{ marginTop: 16 }}>
                <div className="ea-rot ea-dis">Lo que tu fondo tenía todavía en el suelo</div>
                <div className="ea-itemD" style={{ marginBottom: 10 }}>
                  {abiertas.length === 1 ? "Quedaba una posición sin salir" : "Quedaban " + abiertas.length + " posiciones sin salir"}
                  {" "}cuando cerraste. Valoradas a su múltiplo esperado, esto es lo que traían.
                </div>
                {abiertas.map((p, i) => (
                  <div className="ea-fila" key={i}>
                    <span style={{ fontSize: 13 }}>{p.n}</span>
                    <span className="ea-mono">{numero(p.base, 1.5).toFixed(2)}x · USD {fmt(numero(p.ticket, 0) * numero(p.base, 1.5))}</span>
                  </div>
                ))}
                <div className="ea-fila" style={{ marginTop: 8 }}><span style={{ fontSize: 13 }}>Capital metido</span><span className="ea-mono">USD {fmt(capital)}</span></div>
                <div className="ea-fila"><span style={{ fontSize: 13 }}>Valor esperado</span><span className="ea-mono">USD {fmt(valor)}</span></div>
                <div className="ea-fila"><span style={{ fontSize: 13 }}>Lo que te habría tocado a ti</span><span className="ea-mono" style={{ color: "#4FA05C" }}>USD {fmt(tuParte)}</span></div>
                <div className="ea-itemD" style={{ marginTop: 9 }}>
                  Un fondo se juzga cuando ha salido de todo, y tú cerraste antes. Esta es la parte
                  que no llegaste a ver: sumando lo realizado, tu gestora iba camino de un múltiplo
                  de {(numero(s.fondo.tam, 0) > 0 ? (1 + (numero(s.fondo.realizado, 0) + (valor - capital)) / numero(s.fondo.tam, 1)) : 1).toFixed(2)}x
                  {" "}sobre el capital comprometido.
                </div>
              </div>
            );
          })()}

          {conservanValor.length > 0 && (
            <div className="ea-panel" style={{ marginTop: 16 }}>
              <div className="ea-rot ea-dis">Lo que conservó valor</div>
              <div className="ea-invCab ea-dis">
                <span>Bien</span><span>Pagaste</span><span>Vale hoy</span><span>Resultado</span>
              </div>
              {conservanValor.map(({ c, pagado, hoy }) => {
                const dif = hoy - pagado;
                const pct = pagado > 0 ? (hoy / pagado - 1) * 100 : 0;
                return (
                  <div className="ea-invF" key={c.id}>
                    <span className="ea-invN">{c.n}</span>
                    <span className="ea-mono">{fmt(pagado)}</span>
                    <span className="ea-mono">{fmt(hoy)}</span>
                    <span className="ea-mono" style={{ color: dif >= 0 ? "#4FA05C" : "var(--rojo)" }}>
                      {dif >= 0 ? "+" : "−"}{fmt(Math.abs(dif))}
                      <span className="ea-invP">{dif >= 0 ? "+" : ""}{pct.toFixed(0)}%</span>
                    </span>
                  </div>
                );
              })}
              <div className="ea-invT">
                <span className="ea-dis">Total</span>
                <span className="ea-mono">{fmt(totalPagado)}</span>
                <span className="ea-mono">{fmt(totalHoy)}</span>
                <span className="ea-mono" style={{ color: totalHoy >= totalPagado ? "#4FA05C" : "var(--rojo)" }}>
                  {totalHoy >= totalPagado ? "+" : "−"}{fmt(Math.abs(totalHoy - totalPagado))}
                </span>
              </div>
            </div>
          )}
          {gastadoEnConsumo > 0 && (
            <div className="ea-panel" style={{ marginTop: 16 }}>
              <div className="ea-rot ea-dis">Lo que se disfrutó y no volvió</div>
              <div className="ea-mono" style={{ fontSize: 23, color: "var(--tintaPapel)" }}>USD {fmt(gastadoEnConsumo)}</div>
              <div className="ea-itemD" style={{ marginTop: 6 }}>
                {consumoN} {consumoN === 1 ? "compra" : "compras"} sin valor de reventa: viajes, carros, fiestas.
                No es dinero mal gastado por definición; es dinero que se cambió por vida en vez de por patrimonio.
                Puesto a trabajar al 7% durante los años que te quedaban, habría llegado a
                unos USD {fmt(gastadoEnConsumo * 1.9)}.
              </div>
            </div>
          )}
          <div className="ea-panel" style={{ marginTop: 16 }}>
            <div className="ea-rot ea-dis">Lo que quedó en tu expediente</div>
            {s.titulares.slice(-14).reverse().map((t, i) => (
              <div className="ea-tit" key={i}><span className="ea-titQ ea-mono">{t.q}</span><span>{t.t}</span></div>
            ))}
          </div>
          <button className="ea-btnO" style={{ marginTop: 24 }} onClick={empezar}>Vivir otra vida</button>
        </div>
      )}
    </div>
  );
}
