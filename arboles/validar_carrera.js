/* Valida un lote de escenas propias de una carrera.
   Uso: node arboles/validar_carrera.js <numero de lote>
   Lee arboles/carrera_<id>.js, donde <id> sale de la tabla de abajo. */
const path = require("path");
const fs = require("fs");
const LOTE_CARRERA = { 8: "eco", 9: "con", 10: "ing", 11: "der", 12: "adm", 13: "sis" };
const N = Number(process.argv[2]);
const id = LOTE_CARRERA[N];
if (!id) { console.log("uso: node validar_carrera.js <8..13>"); process.exit(2); }
const archivo = path.join(__dirname, "carrera_" + id + ".js");
let L;
try { delete require.cache[require.resolve(archivo)]; L = require(archivo); }
catch (e) { console.log("FALLO: no se pudo cargar " + archivo + ": " + e.message); process.exit(1); }
const compartidas = JSON.parse(fs.readFileSync(path.join(__dirname, "escenas_compartidas.json"), "utf8"));

const errores = [];
const mal = (m) => errores.push(m);
const MIN = 10000 + N * 1000, MAX = MIN + 999;
const CLAVES_D = ["mod", "cri", "red", "rep", "ene", "car", "cash", "msg", "deja", "luego"];
const ATRIB = ["mod", "cri", "red", "rep", "ene", "car"];
const pref = "l" + N + "_";

if (L.carrera !== id) mal("carrera tiene que ser «" + id + "»");
const huellas = L.huellas || {}, propias = L.propias || [], escenas = L.escenas || [], opciones = L.opciones || [], finales = L.finales || [];
Object.keys(huellas).forEach((k) => {
  if (!k.startsWith(pref) || !/^l\d+_[a-z0-9_]+$/.test(k)) mal("huella «" + k + "»: prefijo " + pref + " y snake_case");
  if (typeof huellas[k] !== "string" || huellas[k].length > 60) mal("huella «" + k + "»: frase de 60 caracteres como mucho");
});

const ids = new Map();
[].concat(propias, escenas).forEach((e) => {
  if (!e || typeof e.id !== "number") { mal("una escena sin id numérico"); return; }
  if (e.id < MIN || e.id > MAX) mal("escena " + e.id + ": tu rango es " + MIN + "-" + MAX);
  if (ids.has(e.id)) mal("id repetido: " + e.id);
  ids.set(e.id, e);
});

const textoMalo = (t, donde, max) => {
  if (typeof t !== "string" || !t.trim()) { mal(donde + ": falta el texto"); return; }
  if (t.length > max) mal(donde + ": " + t.length + " caracteres, máximo " + max);
  if (/—|–/.test(t)) mal(donde + ": sin rayas largas");
  if (/\d[\d.,]*\s*(mil|USD|\$|dólares|k\b)|\$\s*\d|\b\d{1,3}\.\d{3}\b|\b\d{4,}\b/.test(t) && !/\b(19|20)\d{2}\b/.test(t)) mal(donde + ": sin cantidades de dinero en el texto");
};
const usadas = new Set();
const revisarLuego = (luego, donde, nivel) => {
  if (luego == null) return;
  if (!Array.isArray(luego) || !luego.length) { mal(donde + ": luego tiene que ser una lista"); return; }
  luego.forEach((l) => {
    if (![1, 2, 3].includes(l && l.en)) mal(donde + ": luego.en 1, 2 o 3");
    if (!Array.isArray(l.azar) || l.azar.length < 2 || l.azar.length > 4) { mal(donde + ": azar con 2 a 4 escenarios"); return; }
    const suma = l.azar.reduce((a, x) => a + (x && x.p || 0), 0);
    if (suma !== 100) mal(donde + ": las probabilidades suman " + suma);
    if (l.s != null && ATRIB.indexOf(l.s) < 0) mal(donde + ": s tiene que ser un atributo");
    l.azar.forEach((x) => {
      const h = ids.get(x.id);
      if (!h || propias.indexOf(h) >= 0) mal(donde + ": el escenario " + x.id + " no es una de tus escenas de consecuencia");
      else { usadas.add(x.id); h.__nivel = Math.max(h.__nivel || 0, nivel + 1); }
      if (nivel >= 3) mal(donde + ": las de tercer nivel no llevan luego");
    });
  });
};
const revisarD = (d, donde, nivel) => {
  if (!d || typeof d !== "object") { mal(donde + ": falta d"); return; }
  Object.keys(d).forEach((k) => { if (CLAVES_D.indexOf(k) < 0) mal(donde + ": clave no permitida en d: " + k); });
  ATRIB.forEach((k) => { if (d[k] != null && (typeof d[k] !== "number" || Math.abs(d[k]) > 15)) mal(donde + ": " + k + " entre -15 y 15"); });
  if (d.cash != null && (typeof d.cash !== "number" || d.cash < -12000 || d.cash > 40000)) mal(donde + ": cash entre -12000 y 40000");
  textoMalo(d.msg, donde + " msg", 130);
  if (d.deja != null && !huellas[d.deja]) mal(donde + ": deja «" + d.deja + "» no está en tus huellas");
  revisarLuego(d.luego, donde, nivel);
};

if (propias.length < 6 || propias.length > 8) mal("propias: entre 6 y 8 (hay " + propias.length + ")");
const tramos = { bajo: false, medio: false, alto: false };
propias.forEach((e) => {
  const donde = "propia " + e.id;
  if (!Number.isInteger(e.min) || !Number.isInteger(e.max) || e.min < 0 || e.max > 6 || e.min > e.max) mal(donde + ": min y max de cargo entre 0 y 6");
  if (e.min <= 2) tramos.bajo = true;
  if (e.min <= 4 && e.max >= 2) tramos.medio = true;
  if (e.max >= 5) tramos.alto = true;
  textoMalo(e.t, donde + " t", 48); textoMalo(e.x, donde + " x", 160);
  Object.keys(e).forEach((k) => { if (["id", "min", "max", "t", "x", "o", "empleado"].indexOf(k) < 0) mal(donde + ": clave no permitida " + k); });
  if (!Array.isArray(e.o) || e.o.length < 2 || e.o.length > 3) { mal(donde + ": 2 o 3 opciones"); return; }
  e.o.forEach((o, i) => {
    textoMalo(o.t, donde + " opción " + i + " t", 60);
    revisarD(o.d, donde + " opción " + i, 1);
    if (!o.d || !o.d.luego) mal(donde + " opción " + i + ": toda opción de una raíz propia lleva luego");
  });
});
if (!tramos.bajo || !tramos.medio || !tramos.alto) mal("reparte las propias por toda la carrera: alguna temprana (min ≤ 2), alguna media y alguna alta (max ≥ 5)");

escenas.forEach((e) => {
  const donde = "escena " + e.id;
  textoMalo(e.por, donde + " por", 55); textoMalo(e.t, donde + " t", 48); textoMalo(e.x, donde + " x", 160);
  Object.keys(e).forEach((k) => { if (["id", "por", "t", "x", "o", "empleado", "__nivel"].indexOf(k) < 0) mal(donde + ": clave no permitida " + k); });
  if (!Array.isArray(e.o) || e.o.length < 2 || e.o.length > 3) { mal(donde + ": 2 o 3 opciones"); return; }
  e.o.forEach((o, i) => { textoMalo(o.t, donde + " opción " + i + " t", 60); revisarD(o.d, donde + " opción " + i, e.__nivel || 2); });
});
escenas.forEach((e) => { if ((e.__nivel || 0) >= 3) (e.o || []).forEach((o, i) => { if (o.d && o.d.luego) mal("escena " + e.id + " opción " + i + ": tercer nivel sin luego"); }); });
escenas.forEach((e) => { if (!usadas.has(e.id)) mal("escena " + e.id + ": nadie la llama"); });

if (opciones.length !== 4) mal("opciones «solo tú»: exactamente 4 (hay " + opciones.length + ")");
const enEscenas = new Set();
opciones.forEach((o, i) => {
  const donde = "opción solo tú " + i;
  const c = compartidas.find((x) => x.id === o.escena);
  if (!c) mal(donde + ": la escena " + o.escena + " no está en escenas_compartidas.json");
  else if (c.opciones.some((t) => /\[solo /.test(t))) mal(donde + ": la escena " + o.escena + " ya tiene una opción «solo»");
  if (enEscenas.has(o.escena)) mal(donde + ": dos opciones en la misma escena");
  enEscenas.add(o.escena);
  Object.keys(o).forEach((k) => { if (["escena", "t", "d"].indexOf(k) < 0) mal(donde + ": clave no permitida " + k); });
  textoMalo(o.t, donde + " t", 60);
  revisarD(o.d, donde, 1);
  if (o.d && o.d.luego) mal(donde + ": las opciones «solo tú» no llevan luego");
});

if (finales.length < 1 || finales.length > 2) mal("finales: 1 o 2");
finales.forEach((f, i) => {
  if (!f || !String(f.id || "").startsWith(pref)) mal("final " + i + ": id con prefijo " + pref);
  if (!Array.isArray(f.huellas) || !f.huellas.length || !f.huellas.every((h) => huellas[h])) mal("final " + i + ": huellas tuyas");
  textoMalo(f.t, "final " + i + " t", 45); textoMalo(f.x, "final " + i + " x", 180);
});

console.log("lote " + N + " (" + id + "): " + propias.length + " propias, " + escenas.length + " consecuencias, " + opciones.length + " opciones solo tú, " + Object.keys(huellas).length + " huellas, " + finales.length + " finales");
if (errores.length) { errores.slice(0, 60).forEach((e) => console.log("  FALLO: " + e)); console.log("\n" + errores.length + " fallo(s)"); process.exit(1); }
console.log("todo en verde");
