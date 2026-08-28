/* Genera salon.html a partir de plantilla.html.
 *
 * La página tiene que poder publicar versiones de sí misma, así que lleva
 * su propio código fuente dentro, en una isla <script type="text/plain">.
 * Eso es un quine y hay que armarlo con cuidado:
 *
 *   - La plantilla contiene DOS marcas: __DATOS__ y __PLANTILLA__.
 *   - El documento publicado rellena __DATOS__ con el registro actual y
 *     __PLANTILLA__ con la plantilla entera, sin rellenar, para que la
 *     siguiente versión pueda hacer lo mismo. Estable indefinidamente.
 *   - Dentro de la isla hay que neutralizar cada "</script" o cerraría el
 *     bloque que la contiene. Se sustituye por una marca y la página lo
 *     revierte al leerla.
 *   - Las sustituciones van con función de reemplazo, no con cadena: si no,
 *     un "$&" o un "$1" en el contenido se interpretaría como referencia.
 *
 * Uso:  node salon/generar.js
 */
const fs = require("fs");
const path = require("path");

const AQUI = __dirname;
const RUTA_PLANTILLA = path.join(AQUI, "plantilla.html");
const RUTA_SALIDA = path.join(AQUI, "salon.html");
const MARCA_FIN = "[[FIN-SCRIPT]]";

const plantilla = fs.readFileSync(RUTA_PLANTILLA, "utf8");

/* comprobaciones antes de emitir nada */
const fallos = [];
["__DATOS__", "__PLANTILLA__"].forEach((m) => {
  const n = plantilla.split(m).length - 1;
  if (n !== 1) fallos.push("la marca " + m + " aparece " + n + " veces (debe aparecer 1)");
});
if (plantilla.indexOf(MARCA_FIN) >= 0) {
  fallos.push("la plantilla ya contiene " + MARCA_FIN + ", que se usa como marca interna");
}
if (fallos.length) {
  fallos.forEach((f) => console.log("FALLA  " + f));
  process.exit(1);
}

const proteger = (s) => s.split("</script").join(MARCA_FIN);

const salida = plantilla
  .replace("__DATOS__", () => "[]")
  .replace("__PLANTILLA__", () => proteger(plantilla));

/* la salida no puede llevar marcas sin rellenar fuera de la isla */
const islaDesde = salida.indexOf('<script type="text/plain" id="plantilla">');
const fueraDeIsla = salida.slice(0, islaDesde);
if (fueraDeIsla.indexOf("__DATOS__") >= 0 || fueraDeIsla.indexOf("__PLANTILLA__") >= 0) {
  console.log("FALLA  quedan marcas sin rellenar en la parte viva del documento");
  process.exit(1);
}

fs.writeFileSync(RUTA_SALIDA, salida, "utf8");
console.log("escrito " + RUTA_SALIDA + "  (" + Math.round(salida.length / 1024) + " KB)");
console.log("la isla de plantilla ocupa " + Math.round(proteger(plantilla).length / 1024) + " KB");
