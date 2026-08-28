/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");

/* Comprueba que el documento construido sabe reconstruirse a sí mismo.
 *
 * Reproduce exactamente lo que hace window.__anotarCarrera en el puente:
 * saca la plantilla de su isla, le mete el registro y los tres motores
 * leídos del propio documento, y vuelve a meter la plantilla al final.
 *
 * Lo que se verifica:
 *   · el documento de segunda generación es completo y del mismo tamaño
 *   · lleva el registro nuevo dentro
 *   · lleva los tres motores, sin marcas sin rellenar
 *   · su plantilla es idéntica a la de la primera: el quine es estable y
 *     aguanta generaciones indefinidas
 *
 * Uso:  node pruebas/quine.js
 */
const fs = require("fs");

const MARCA_FIN = "[[FIN-" + "SCRIPT]]";
const CIERRE = "<" + "/script";
const M = {
  reg: "%%" + "REGISTRO" + "%%",
  plant: "%%" + "PLANTILLA" + "%%",
  react: "%%" + "REACT" + "%%",
  dom: "%%" + "REACTDOM" + "%%",
  juego: "%%" + "JUEGO" + "%%",
};

const problemas = [];
const bien = [];
const decir = (ok, texto) => (ok ? bien : problemas).push(texto);

const doc = fs.readFileSync(RUTA_BUILD, "utf8");

/* Dónde acaba la isla de plantilla. Todo lo que se busque por texto tiene
   que buscarse DESPUÉS de aquí: la isla lleva dentro una copia literal de
   la cáscara, con sus mismos ids, y una búsqueda ingenua encuentra esa
   copia inerte en vez del bloque de verdad. La página no tiene este
   problema porque usa getElementById, que solo ve el DOM. */
const finDeIsla = (html) => {
  const pos = html.indexOf('<script type="text/plain" id="plantilla">');
  if (pos < 0) return 0;
  const fin = html.indexOf(CIERRE + ">", pos);
  return fin < 0 ? 0 : fin + (CIERRE + ">").length;
};

/* saca el contenido de un bloque de script por su id, como .textContent */
const contenidoDe = (html, id) => {
  const desde = id === "plantilla" ? 0 : finDeIsla(html);
  const marca = 'id="' + id + '"';
  const pos = html.indexOf(marca, desde);
  if (pos < 0) return null;
  const ini = html.indexOf(">", pos) + 1;
  const fin = html.indexOf(CIERRE + ">", ini);
  if (ini <= 0 || fin < 0) return null;
  return html.slice(ini, fin);
};

const plantillaDe = (html) => {
  const bruto = contenidoDe(html, "plantilla");
  return bruto == null ? null : bruto.split(MARCA_FIN).join(CIERRE);
};
const proteger = (s) => s.split(CIERRE).join(MARCA_FIN);

/* ---------- primera generación ---------- */
const p1 = plantillaDe(doc);
decir(!!p1, p1 ? "la isla de plantilla se lee y se desprotege" : "no se pudo leer la isla de plantilla");
if (!p1) { salir(); }

Object.keys(M).forEach((k) => {
  decir(p1.indexOf(M[k]) >= 0, "la plantilla conserva la marca " + M[k]);
});

const react = contenidoDe(doc, "motor-react");
const dom = contenidoDe(doc, "motor-dom");
const juego = contenidoDe(doc, "motor-juego");
decir(!!react && react.length > 5000, "el motor de React se lee del documento");
decir(!!dom && dom.length > 5000, "el motor de ReactDOM se lee del documento");
decir(!!juego && juego.length > 100000, "el motor del juego se lee del documento");
if (!react || !dom || !juego) { salir(); }

/* ---------- segunda generación, como la haría la página ---------- */
const registro = [{ n: "Prueba", c: "Socio", e: 50, p: 1070863, m: 2, v: "El sueldo era el plan" }];
const g2 = p1
  .replace(M.reg, () => JSON.stringify(registro))
  .replace(M.react, () => react)
  .replace(M.dom, () => dom)
  .replace(M.juego, () => juego)
  .replace(M.plant, () => proteger(p1));

decir(/^<!doctype html>/i.test(g2.trim()), "la segunda generación abre con doctype");
decir(g2.indexOf("El sueldo era el plan") >= 0, "el registro nuevo va dentro");

/* ninguna marca sin rellenar en la parte viva */
const islaIni = g2.indexOf('<script type="text/plain" id="plantilla">');
const islaFin = g2.indexOf(CIERRE + ">", islaIni);
const fuera = g2.slice(0, islaIni) + g2.slice(islaFin);
Object.keys(M).forEach((k) => {
  decir(fuera.indexOf(M[k]) < 0, "sin la marca " + M[k] + " suelta en la parte viva");
});

/* los motores, una sola vez cada uno y completos */
decir(contenidoDe(g2, "motor-react") === react, "el motor de React sobrevive intacto");
decir(contenidoDe(g2, "motor-dom") === dom, "el motor de ReactDOM sobrevive intacto");
decir(contenidoDe(g2, "motor-juego") === juego, "el motor del juego sobrevive intacto");

/* tamaño: el sobrecoste tiene que ser la isla, no una copia del motor */
const crece = g2.length - doc.length;
decir(Math.abs(crece) < 20000,
  "el tamaño se mantiene (" + (crece >= 0 ? "+" : "") + Math.round(crece / 1024) + " KB)");

/* ---------- estabilidad: la tercera tiene que salir igual ---------- */
const p2 = plantillaDe(g2);
decir(p2 === p1, "la plantilla es idéntica tras publicar: el quine es estable");

function salir() {
  bien.forEach((t) => console.log("  ok    " + t));
  problemas.forEach((t) => console.log("  FALLA " + t));
  console.log("");
  if (problemas.length) {
    console.log(problemas.length + " problema(s) en el quine del documento");
    process.exit(1);
  }
  console.log(bien.length + " comprobaciones en verde: el documento sabe reconstruirse");
  process.exit(0);
}

salir();
