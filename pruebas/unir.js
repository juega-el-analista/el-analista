/* Une los módulos de src/ en un solo archivo, en el orden en que se
   necesitan, para el empaquetado de un solo HTML y para las pruebas.

   El juego se escribe en módulos (src/datos, src/motor, src/minijuegos,
   src/componentes, src/vistas...), pero se publica como un único HTML
   autónomo que sabe reconstruirse a sí mismo. Las pruebas, además, miran
   el código compilado entero: montan el juego y leen sus piezas internas.
   Así que antes de empaquetar o de probar, los módulos se vuelven a juntar
   en un solo ámbito, como si fueran el archivo único de antes.

   Cómo: se recorre el árbol de imports desde src/ElAnalista.jsx y cada
   módulo entra después de los que importa. Se quitan los import y la
   palabra export de cada declaración; lo demás pasa tal cual. Como ningún
   módulo depende de otro que lo importe a él (no hay ciclos), ese orden
   garantiza que todo está definido antes de usarse al cargar.

   Uso: const { rutaUnida } = require("./unir.js"); rutaUnida() escribe
   pruebas/unido.jsx y devuelve su ruta. Desde la terminal: node pruebas/unir.js */
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const SRC = path.join(RAIZ, "src");
const ENTRADA = path.join(SRC, "ElAnalista.jsx");
const SALIDA = path.join(__dirname, "unido.jsx");

/* Los únicos imports que quedan son los de fuera: React y React Router,
   cada uno en una sola línea con todo lo que usa el juego. Empaquetar y
   el banco de pruebas los reescriben a sus globales o a require. */
const FUERA = ["react", "react-router-dom"];

const IMPORT = /^import\s[\s\S]*?\sfrom\s+"([^"]+)";[ \t]*\n/gm;

function unir() {
  const orden = [];
  const visto = new Set();
  const enCurso = new Set();
  const visitar = (ruta) => {
    if (visto.has(ruta)) return;
    if (enCurso.has(ruta)) throw new Error("import circular en " + path.relative(RAIZ, ruta));
    enCurso.add(ruta);
    const txt = fs.readFileSync(ruta, "utf8");
    for (const m of txt.matchAll(IMPORT)) {
      if (!m[1].startsWith(".")) continue;
      visitar(path.resolve(path.dirname(ruta), m[1]));
    }
    enCurso.delete(ruta);
    visto.add(ruta);
    orden.push(ruta);
  };
  visitar(ENTRADA);

  /* En el archivo unido todos los módulos comparten un ámbito: dos
     declaraciones con el mismo nombre en módulos distintos chocarían. */
  const dueño = new Map();
  for (const ruta of orden) {
    const txt = fs.readFileSync(ruta, "utf8");
    for (const m of txt.matchAll(/^(?:export )?(?:const|let|function|class) ([A-Za-z_$][\w$]*)/gm)) {
      const antes = dueño.get(m[1]);
      if (antes && antes !== ruta) {
        throw new Error("«" + m[1] + "» está declarado en " + path.relative(RAIZ, antes)
          + " y en " + path.relative(RAIZ, ruta) + ": en el archivo unido chocarían");
      }
      dueño.set(m[1], ruta);
    }
  }

  const deFuera = { react: new Set(), "react-router-dom": new Set() };
  const partes = orden.map((ruta) => {
    let txt = fs.readFileSync(ruta, "utf8");
    txt = txt.replace(IMPORT, (todo, de) => {
      if (de.startsWith(".")) return "";
      if (FUERA.indexOf(de) < 0) throw new Error("import que no sé unir en " + path.relative(RAIZ, ruta) + ": " + de);
      const llaves = todo.match(/\{([^}]*)\}/);
      if (llaves) llaves[1].split(",").map((x) => x.trim()).filter(Boolean).forEach((x) => deFuera[de].add(x));
      return "";
    });
    txt = txt.replace(/^export (const|let|function|class) /gm, "$1 ");
    if (/^export (?!default function ElAnalista)/m.test(txt)) {
      throw new Error("export que no sé unir en " + path.relative(RAIZ, ruta));
    }
    return "/* ---- " + path.relative(RAIZ, ruta).split(path.sep).join("/") + " ---- */\n" + txt.replace(/^\n+/, "");
  });
  const cabecera = 'import React, { ' + [...deFuera.react].sort().join(", ") + ' } from "react";\n'
    + (deFuera["react-router-dom"].size
      ? 'import { ' + [...deFuera["react-router-dom"]].sort().join(", ") + ' } from "react-router-dom";\n' : "");
  return cabecera + "\n" + partes.join("\n");
}

/* Varias pruebas corren a la vez en procesos distintos y todas piden el
   archivo unido: se escribe solo si cambió, y a un temporal que luego se
   renombra, para que nadie lea uno a medio escribir. */
function rutaUnida() {
  const txt = unir();
  let igual = false;
  try { igual = fs.readFileSync(SALIDA, "utf8") === txt; } catch (e) {}
  if (!igual) {
    const tmp = SALIDA + "." + process.pid + ".tmp";
    fs.writeFileSync(tmp, txt);
    fs.renameSync(tmp, SALIDA);
  }
  return SALIDA;
}

module.exports = { unir, rutaUnida, SALIDA };

if (require.main === module) {
  rutaUnida();
  console.log("unido en " + path.relative(RAIZ, SALIDA));
}
