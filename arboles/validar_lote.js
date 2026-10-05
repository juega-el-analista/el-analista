/* Valida un lote de árboles de El Analista.
   Uso: node validar_lote.js <numero de lote>
   Lee loteN.js (el que escribes) y loteN_escenas.json (las raíces que te tocan). */
const path = require("path");
const fs = require("fs");
const N = Number(process.argv[2]);
if (!N) { console.log("uso: node validar_lote.js <numero>"); process.exit(2); }
const dir = __dirname;
const raicesDadas = JSON.parse(fs.readFileSync(path.join(dir, "lote" + N + "_escenas.json"), "utf8"));
let L;
try { delete require.cache[require.resolve(path.join(dir, "lote" + N + ".js"))]; L = require(path.join(dir, "lote" + N + ".js")); }
catch (e) { console.log("FALLO: no se pudo cargar lote" + N + ".js: " + e.message); process.exit(1); }

const errores = [], avisos = [];
const mal = (m) => errores.push(m);
const ojo = (m) => avisos.push(m);
const MIN = 10000 + N * 1000, MAX = MIN + 999;
const CLAVES_D = ["mod", "cri", "red", "rep", "ene", "car", "cash", "msg", "deja", "luego"];
const ATRIB = ["mod", "cri", "red", "rep", "ene", "car"];

if (!L || typeof L !== "object") { console.log("FALLO: el módulo no exporta un objeto"); process.exit(1); }
const huellas = L.huellas || {}, escenas = L.escenas || [], raices = L.raices || {}, finales = L.finales || [];
if (!Array.isArray(escenas)) mal("escenas tiene que ser una lista");
if (!Array.isArray(finales)) mal("finales tiene que ser una lista");

Object.keys(huellas).forEach((k) => {
  if (!/^l\d+_[a-z0-9_]+$/.test(k)) mal("huella «" + k + "»: tiene que empezar por l" + N + "_ y ser snake_case");
  else if (!k.startsWith("l" + N + "_")) mal("huella «" + k + "»: el prefijo de tu lote es l" + N + "_");
  if (typeof huellas[k] !== "string" || huellas[k].length > 60) mal("huella «" + k + "»: frase de 60 caracteres como mucho");
});

const ids = new Map();
escenas.forEach((e) => {
  if (!e || typeof e.id !== "number") { mal("una escena sin id numérico"); return; }
  if (e.id < MIN || e.id > MAX) mal("escena " + e.id + ": tu rango de ids es " + MIN + "-" + MAX);
  if (ids.has(e.id)) mal("id repetido: " + e.id);
  ids.set(e.id, e);
});

const textoMalo = (t, donde, max) => {
  if (typeof t !== "string" || !t.trim()) { mal(donde + ": falta el texto"); return; }
  if (t.length > max) mal(donde + ": " + t.length + " caracteres, máximo " + max);
  if (/—|–/.test(t)) mal(donde + ": sin rayas largas (— –); usa punto, coma o dos puntos");
  if (/\d[\d.,]*\s*(mil|USD|\$|dólares|k\b)|\$\s*\d|\b\d{1,3}\.\d{3}\b|\b\d{4,}\b/.test(t) && !/\b(19|20)\d{2}\b/.test(t)) mal(donde + ": no pongas cantidades de dinero en el texto (el dinero se escala con el cargo): «" + t.slice(0, 60) + "»");
};
const revisarD = (d, donde, nivel) => {
  if (!d || typeof d !== "object") { mal(donde + ": falta d"); return; }
  Object.keys(d).forEach((k) => { if (CLAVES_D.indexOf(k) < 0) mal(donde + ": clave no permitida en d: " + k); });
  ATRIB.forEach((k) => { if (d[k] != null && (typeof d[k] !== "number" || Math.abs(d[k]) > 15)) mal(donde + ": " + k + " tiene que ser un número entre -15 y 15"); });
  if (d.cash != null && (typeof d.cash !== "number" || d.cash < -12000 || d.cash > 40000)) mal(donde + ": cash entre -12000 y 40000");
  textoMalo(d.msg, donde + " msg", 130);
  if (d.deja != null && !huellas[d.deja]) mal(donde + ": deja «" + d.deja + "» no está en tus huellas");
  revisarLuego(d.luego, donde, nivel);
};
const usadas = new Set();
const revisarLuego = (luego, donde, nivel) => {
  if (luego == null) return;
  if (!Array.isArray(luego) || !luego.length) { mal(donde + ": luego tiene que ser una lista"); return; }
  luego.forEach((l) => {
    if (!l || typeof l !== "object") { mal(donde + ": entrada de luego vacía"); return; }
    if (![1, 2, 3].includes(l.en)) mal(donde + ": luego.en tiene que ser 1, 2 o 3");
    if (!Array.isArray(l.azar) || l.azar.length < 2 || l.azar.length > 4) { mal(donde + ": luego.azar tiene que tener entre 2 y 4 escenarios"); return; }
    const suma = l.azar.reduce((a, x) => a + (x && x.p || 0), 0);
    if (suma !== 100) mal(donde + ": las probabilidades suman " + suma + ", tienen que sumar 100");
    /* s inclina las probabilidades con un atributo de 0 a 100. car no
       vale: en la partida se guarda como «carrera», que no va de 0 a 100,
       y st.car no existe, así que la inclinación salía siempre en cero. */
    if (l.s != null && ["mod", "cri", "red", "rep", "ene"].indexOf(l.s) < 0) mal(donde + ": s tiene que ser un atributo (mod, cri, red, rep, ene)");
    l.azar.forEach((x) => {
      if (!ids.has(x.id)) mal(donde + ": el escenario " + x.id + " no existe en tus escenas");
      else usadas.add(x.id);
      if (x.bueno != null && typeof x.bueno !== "boolean") mal(donde + ": bueno tiene que ser true o false");
      if (nivel >= 3) mal(donde + ": demasiada profundidad; las escenas de tercer nivel no llevan luego");
      const hijo = ids.get(x.id);
      if (hijo) hijo.__nivel = Math.max(hijo.__nivel || 0, nivel + 1);
    });
  });
};

/* raíces: todas las que te tocan, y todas sus opciones */
raicesDadas.forEach((r) => {
  const entrada = raices[r.id];
  if (!entrada) { mal("raíz " + r.id + " («" + r.titulo + "»): no tiene entrada en raices"); return; }
  r.opciones.forEach((op) => {
    const x = entrada[op.indice];
    const donde = "raíz " + r.id + " opción " + op.indice;
    if (!x) { mal(donde + ": falta (cada opción de la raíz necesita su sorteo)"); return; }
    const esChk = /chequeo/.test(op.forma);
    const ramas = esChk && (x.ok || x.no) ? [["ok", x.ok], ["no", x.no]] : [["", x]];
    ramas.forEach(([k, y]) => {
      if (!y) { mal(donde + (k ? "." + k : "") + ": falta"); return; }
      Object.keys(y).forEach((c) => { if (["deja", "luego", "ok", "no"].indexOf(c) < 0) mal(donde + ": clave no permitida " + c); });
      if (y.deja != null && !huellas[y.deja]) mal(donde + ": deja «" + y.deja + "» no está en tus huellas");
      if (!y.luego) mal(donde + (k ? "." + k : "") + ": falta luego");
      revisarLuego(y.luego, donde + (k ? "." + k : ""), 1);
    });
  });
});
Object.keys(raices).forEach((k) => { if (!raicesDadas.some((r) => String(r.id) === String(k))) mal("raices tiene " + k + ", que no es de tu lote"); });

/* escenas */
escenas.forEach((e) => {
  const donde = "escena " + e.id;
  textoMalo(e.por, donde + " por", 55);
  textoMalo(e.t, donde + " t", 48);
  textoMalo(e.x, donde + " x", 160);
  if (e.empleado != null && typeof e.empleado !== "boolean") mal(donde + ": empleado tiene que ser true o false");
  Object.keys(e).forEach((k) => { if (["id", "por", "t", "x", "o", "empleado", "__nivel"].indexOf(k) < 0) mal(donde + ": clave no permitida " + k); });
  if (!Array.isArray(e.o) || e.o.length < 2 || e.o.length > 3) { mal(donde + ": entre 2 y 3 opciones"); return; }
  e.o.forEach((o, i) => {
    Object.keys(o).forEach((k) => { if (["t", "d"].indexOf(k) < 0) mal(donde + " opción " + i + ": clave no permitida " + k); });
    textoMalo(o.t, donde + " opción " + i + " t", 60);
    revisarD(o.d, donde + " opción " + i, e.__nivel || 2);
  });
});
/* revisar profundidad otra vez ahora que se conocen los niveles */
escenas.forEach((e) => { if ((e.__nivel || 0) >= 3) (e.o || []).forEach((o, i) => { if (o.d && o.d.luego) mal("escena " + e.id + " opción " + i + ": es de tercer nivel y no puede llevar luego"); }); });
escenas.forEach((e) => { if (!usadas.has(e.id)) mal("escena " + e.id + ": nadie la llama (sobra o falta enlazarla)"); });

finales.forEach((f, i) => {
  const donde = "final " + i;
  if (!f || !/^l\d+_[a-z0-9_]+$/.test(f.id || "")) mal(donde + ": id con prefijo l" + N + "_");
  if (!Array.isArray(f.huellas) || !f.huellas.length) mal(donde + ": huellas tiene que ser una lista no vacía");
  else f.huellas.forEach((h) => { if (!huellas[h]) mal(donde + ": huella «" + h + "» no está en tus huellas"); });
  textoMalo(f.t, donde + " t", 45);
  textoMalo(f.x, donde + " x", 180);
});

const porRaiz = raicesDadas.length ? (escenas.length / raicesDadas.length).toFixed(1) : 0;
console.log("lote " + N + ": " + raicesDadas.length + " raíces, " + escenas.length + " escenas (" + porRaiz + " por raíz), "
  + Object.keys(huellas).length + " huellas, " + finales.length + " finales");
avisos.forEach((a) => console.log("  aviso: " + a));
if (errores.length) { errores.slice(0, 60).forEach((e) => console.log("  FALLO: " + e)); console.log("\n" + errores.length + " fallo(s)"); process.exit(1); }
console.log("todo en verde");
