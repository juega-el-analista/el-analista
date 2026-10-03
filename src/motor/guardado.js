/* ============================================================
   GUARDAR LA PARTIDA
   Treinta años son demasiado recorrido para perderlo al recargar.
   Se intenta el almacén del entorno; si no existe, el del navegador;
   si tampoco, la partida simplemente no se guarda y el juego sigue
   funcionando igual. Se graba al cerrar cada año y se borra al final.
   ============================================================ */
const CLAVE = "el-analista-partida";
const CLAVE_AVISO = "el-analista-aviso-leido";

/* El aviso se muestra la primera vez que alguien abre el juego en su
   navegador. Se lee de forma sincrónica y sin promesas, para que no
   haya un parpadeo del aviso a quien ya lo aceptó. Si no hay
   almacenamiento disponible, se muestra siempre: es el lado seguro. */
export const yaAceptoAviso = () => {
  try {
    return typeof window !== "undefined" && !!window.localStorage
      && window.localStorage.getItem(CLAVE_AVISO) === "1";
  } catch (e) { return false; }
};
export const anotarAviso = () => {
  try { if (typeof window !== "undefined" && window.localStorage) window.localStorage.setItem(CLAVE_AVISO, "1"); }
  catch (e) { /* si no se puede guardar, el aviso volverá a salir. No es grave. */ }
};

/* El movimiento es un ajuste de pantalla, no parte de la partida. Vivia
   dentro del estado guardado y eso significaba que se perdia al empezar
   otra vida: encendias las animaciones, arrancabas una partida nueva y
   volvian a apagarse sin que nada lo dijera. Ahora vive en el navegador,
   como la aceptacion del aviso, y sobrevive a todas las vidas. */
const CLAVE_MOV = "el-analista-movimiento";
export const leerMovimiento = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const v = window.localStorage.getItem(CLAVE_MOV);
    return v === "1" ? true : v === "0" ? false : null;
  } catch (e) { return null; }
};
export const anotarMovimiento = (v) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    if (v === null) window.localStorage.removeItem(CLAVE_MOV);
    else window.localStorage.setItem(CLAVE_MOV, v ? "1" : "0");
  } catch (e) { /* sin almacen, el ajuste dura lo que dure la pestaña */ }
};
export const VERSION = 5;

const SAL = "el-analista-v5-firma";
const TOPE_GUARDADO = 262144;   /* 256 KB: por encima de eso algo anda mal */
const ESPERA_MAX = 3000;        /* si el almacen del entorno no responde, se sigue sin el */

/* Huella de la partida. No es criptografia y no pretende serlo: el codigo
   viaja con el juego, asi que quien lo lea puede recalcularla. Lo que si
   hace es que un JSON editado a mano o a medio escribir se detecte y se
   descarte, en vez de entrar al estado y romper la pantalla. */
const firma = (txt) => {
  let a = 0x811c9dc5, b = 0x9e3779b9;
  const s = SAL + txt;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    a = ((a ^ c) >>> 0) * 16777619 >>> 0;
    b = (b + c * (i % 61 + 7)) >>> 0;
    b = ((b << 7) | (b >>> 25)) >>> 0;
  }
  return (a >>> 0).toString(36) + (b >>> 0).toString(36);
};

const conAlmacen = () => {
  try { return typeof window !== "undefined" && !!window.storage && typeof window.storage.get === "function"; }
  catch (e) { return false; }
};
const conLocal = () => {
  try { return typeof window !== "undefined" && !!window.localStorage; } catch (e) { return false; }
};

/* ninguna promesa ajena puede dejar el juego esperando para siempre */
const conPlazo = (promesa, ms) => Promise.race([
  Promise.resolve(promesa),
  new Promise((ok) => setTimeout(() => ok(null), ms)),
]);

export const guardarPartida = async (estado) => {
  let txt;
  try {
    const cuerpo = JSON.stringify(estado);
    txt = JSON.stringify({ v: VERSION, ts: Date.now(), f: firma(cuerpo), s: estado });
  } catch (e) { return false; }
  if (txt.length > TOPE_GUARDADO) return false;
  if (conAlmacen()) {
    try {
      const r = await conPlazo(window.storage.set(CLAVE, txt), ESPERA_MAX);
      if (r !== null) return true;
    } catch (e) { /* sigue al de abajo */ }
  }
  if (conLocal()) {
    try { window.localStorage.setItem(CLAVE, txt); return true; } catch (e) { return false; }
  }
  return false;
};

/* devuelve el sobre crudo solo si el JSON es valido, la version coincide
   y la firma cuadra. Cualquier otra cosa se trata como "no hay partida". */
const abrirSobre = (txt) => {
  if (typeof txt !== "string" || !txt || txt.length > TOPE_GUARDADO) return null;
  let d;
  try { d = JSON.parse(txt); } catch (e) { return null; }
  if (!d || typeof d !== "object" || d.v !== VERSION || !d.s || typeof d.s !== "object") return null;
  try { if (firma(JSON.stringify(d.s)) !== d.f) return null; } catch (e) { return null; }
  return d;
};

export const leerPartida = async () => {
  if (conAlmacen()) {
    try {
      const r = await conPlazo(window.storage.get(CLAVE), ESPERA_MAX);
      const d = r && r.value ? abrirSobre(r.value) : null;
      if (d) return d;
    } catch (e) { /* la clave puede no existir: no es un error */ }
  }
  if (conLocal()) {
    try {
      const d = abrirSobre(window.localStorage.getItem(CLAVE));
      if (d) return d;
    } catch (e) { return null; }
  }
  return null;
};

export const olvidarPartida = async () => {
  if (conAlmacen()) { try { await conPlazo(window.storage.delete(CLAVE), ESPERA_MAX); } catch (e) {} }
  if (conLocal()) { try { window.localStorage.removeItem(CLAVE); } catch (e) {} }
};
