/* Junta los lotes y los escribe dentro del juego, entre las marcas @@LOTES@@ y @@FIN-LOTES@@.
   Para cambiar un árbol: edita arboles/loteN.js, pasa «node arboles/validar_lote.js N» y luego
   «node arboles/integrar.js 1 2 3 4 5 6 7» y «npm run build».
   Uso: node integrar.js 1 2 3 ...   (los lotes a incluir) */
const fs = require("fs");
const path = require("path");
const dir = __dirname;
const JUEGO = path.join(__dirname, "..", "src", "el-analista.jsx");
const lotes = process.argv.slice(2).map(Number).filter(Boolean);
const todo = { huellas: {}, escenas: [], raices: {}, finales: [] };
lotes.forEach((n) => {
  const f = path.join(dir, "lote" + n + ".js");
  delete require.cache[require.resolve(f)];
  const L = require(f);
  Object.keys(L.huellas || {}).forEach((k) => {
    if (todo.huellas[k]) throw new Error("huella repetida entre lotes: " + k);
    todo.huellas[k] = L.huellas[k];
  });
  (L.escenas || []).forEach((e) => {
    if (todo.escenas.some((x) => x.id === e.id)) throw new Error("id repetido entre lotes: " + e.id);
    const limpio = { id: e.id, por: e.por, t: e.t, x: e.x, o: e.o };
    if (e.empleado) limpio.empleado = true;
    todo.escenas.push(limpio);
  });
  Object.keys(L.raices || {}).forEach((k) => {
    if (todo.raices[k]) throw new Error("raíz en dos lotes: " + k);
    todo.raices[k] = L.raices[k];
  });
  (L.finales || []).forEach((f) => todo.finales.push({ id: f.id, huellas: f.huellas, t: f.t, x: f.x }));
  console.log("lote " + n + ": " + (L.escenas || []).length + " escenas, " + Object.keys(L.raices || {}).length + " raíces");
});

/* ---------- las escenas propias de cada carrera (arboles/carrera_<id>.js) ----------
   Entran todas las que existan. Sus raíces van a «propias», marcadas con la
   carrera; sus opciones «solo tú», a «opciones». */
todo.propias = [];
todo.opciones = [];
["eco", "con", "ing", "der", "adm", "sis"].forEach((est) => {
  const f = path.join(dir, "carrera_" + est + ".js");
  if (!fs.existsSync(f)) return;
  delete require.cache[require.resolve(f)];
  const C = require(f);
  Object.keys(C.huellas || {}).forEach((k) => {
    if (todo.huellas[k]) throw new Error("huella repetida: " + k);
    todo.huellas[k] = C.huellas[k];
  });
  (C.propias || []).forEach((e) => {
    const r = { id: e.id, est, min: e.min, max: e.max, t: e.t, x: e.x, o: e.o };
    if (e.empleado) r.empleado = true;
    todo.propias.push(r);
  });
  (C.escenas || []).forEach((e) => {
    if (todo.escenas.some((x) => x.id === e.id)) throw new Error("id repetido: " + e.id);
    const limpio = { id: e.id, por: e.por, t: e.t, x: e.x, o: e.o, est };
    if (e.empleado) limpio.empleado = true;
    todo.escenas.push(limpio);
  });
  (C.opciones || []).forEach((o) => todo.opciones.push({ escena: o.escena, est, t: o.t, d: o.d }));
  (C.finales || []).forEach((x) => todo.finales.push({ id: x.id, huellas: x.huellas, t: x.t, x: x.x }));
  console.log("carrera " + est + ": " + (C.propias || []).length + " propias, " + (C.escenas || []).length + " consecuencias, " + (C.opciones || []).length + " opciones solo tú");
});
/* ---------- parches de la revisión de las carreras ---------- */
(() => {
  const propia = (id) => todo.propias.find((e) => e.id === id);
  /* habla de recursos humanos: da por hecho que tienes jefe */
  if (propia(22200)) propia(22200).empleado = true;
  /* tu mayor cliente te pide otro número: solo tiene sentido con tu consultora montada */
  if (propia(18600)) propia(18600).soloPropia = true;
})();

/* ---------- parches de la revisión ---------- */
const escena = (id) => todo.escenas.find((e) => e.id === id);
/* las que dan por hecho que tienes pareja: solo llegan si la tienes */
[12001, 12002, 12202, 12210, 12253, 12300, 12304, 12352, 12500, 12501, 12502, 13053, 13056, 13101].forEach((id) => {
  const e = escena(id); if (e) e.pareja = ["noviazgo", "casado"];
});
/* adjetivos con género referidos al jugador */
const retocar = (id, de, a) => {
  const e = escena(id); if (!e) return;
  const j = JSON.stringify(e);
  if (j.indexOf(de) < 0) throw new Error("parche sin efecto en " + id + ": " + de);
  Object.assign(e, JSON.parse(j.split(de).join(a)));
};
retocar(13202, "Estás cansado y en forma", "Vas con sueño y en forma");
retocar(15062, "Del viaje corto volviste descansado y con ideas.", "El viaje corto te devolvió el descanso y las ideas.");
/* aceptar Miami más tarde también te muda */
(() => { const e = escena(17054); const o = e && e.o.find((x) => x.d && x.d.deja === "l7_emigraste"); if (!o) throw new Error("no está la opción de Miami"); o.mudar = "us"; o.req = { noPais: "us" }; })();
/* futuros que dan por hecho que el minijuego salió bien */
[["105", "0"], ["105", "1"], ["108", "0"], ["111", "0"], ["111", "1"], ["114", "0"]].forEach(([r, i]) => {
  const x = todo.raices[r] && todo.raices[r][i];
  if (!x || !x.luego) throw new Error("no está la raíz " + r + "." + i);
  x.luego.forEach((l) => { l.siSale = true; });
});

let s = fs.readFileSync(JUEGO, "utf8");
const a = s.indexOf("/* @@LOTES@@ */"), b = s.indexOf("/* @@FIN-LOTES@@ */");
if (a < 0 || b < 0) throw new Error("no encuentro las marcas en el juego");
const bloque = "/* @@LOTES@@ */\n/* Generado por arboles/integrar.js desde los lotes " + lotes.join(", ") + " de arboles/. No editar a mano: se reescribe entero; los árboles se cambian en arboles/loteN.js. */\nconst LOTES = "
  + JSON.stringify(todo, null, 1) + ";\n";
s = s.slice(0, a) + bloque + s.slice(b);
fs.writeFileSync(JUEGO, s);
console.log("total: " + todo.escenas.length + " escenas, " + todo.propias.length + " propias de carrera, " + todo.opciones.length + " opciones solo tú, " + Object.keys(todo.raices).length + " raíces, "
  + Object.keys(todo.huellas).length + " huellas, " + todo.finales.length + " finales");
