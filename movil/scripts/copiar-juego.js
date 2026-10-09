/*
  Copia el juego dentro de la app.

  La app no tiene un juego propio: muestra el mismo index.html que se publica
  en Pages. Este script lo lee de la carpeta de arriba y lo deja en
  juego/juego.js como una cadena, que es la forma más simple de llevarlo
  empaquetado y sin red, tanto en Expo Go como en el build de EAS.

  Corre solo antes de `npm start` y en EAS después de instalar dependencias
  (el gancho eas-build-post-install), así que la app siempre lleva el juego
  que hay en el repo en ese momento. juego/ no se versiona.
*/
const fs = require("fs");
const path = require("path");

const origen = path.join(__dirname, "..", "..", "index.html");
const destino = path.join(__dirname, "..", "juego", "juego.js");

if (!fs.existsSync(origen)) {
  console.error("No encuentro " + origen + ". Corre `npm run build` en la raíz del repo primero.");
  process.exit(1);
}

const html = fs.readFileSync(origen, "utf8");
if (html.indexOf('id="raiz"') < 0) {
  console.error("index.html no parece el juego: no tiene #raiz.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(destino), { recursive: true });
fs.writeFileSync(destino,
  "// Generado por scripts/copiar-juego.js desde ../index.html. No editar a mano.\n" +
  "export default " + JSON.stringify(html) + ";\n");

console.log("Juego copiado a la app: " + Math.round(html.length / 1024) + " KB.");
