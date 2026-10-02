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
console.log("total: " + todo.escenas.length + " escenas, " + Object.keys(todo.raices).length + " raíces, "
  + Object.keys(todo.huellas).length + " huellas, " + todo.finales.length + " finales");
