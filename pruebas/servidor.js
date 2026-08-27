/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Servidor estático mínimo para probar el juego en el navegador. */
const http = require("http");
const fs = require("fs");

const ARCHIVO = RUTA_BUILD;
const PUERTO = 5173;

http.createServer((req, res) => {
  if (req.url === "/favicon.ico") { res.writeHead(204); return res.end(); }
  fs.readFile(ARCHIVO, (err, buf) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("no se pudo leer el HTML: " + err.message);
    }
    /* el visor de artifacts envuelve el fragmento; aquí lo hacemos a mano */
    const cuerpo = '<!doctype html><html lang="es"><head><meta charset="utf-8">'
      + '<meta name="viewport" content="width=device-width,initial-scale=1">'
      + '</head><body>' + buf.toString("utf8") + '</body></html>';
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(cuerpo);
  });
}).listen(PUERTO, () => console.log("El Analista en http://localhost:" + PUERTO));
