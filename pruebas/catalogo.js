/* ============================================================
   LA SALA DE JUEGOS
   Genera catalogo.html: una página aparte con los veinte minijuegos,
   uno por ficha, para probarlos de uno en uno sin tener que esperar a
   que una partida te los ponga delante. Monta los componentes de verdad
   —la misma TarjetaJuego y el mismo MiniJuego que usa la partida—, así
   que lo que se prueba aquí es exactamente lo que juega la gente.

   No es parte del juego publicado: el workflow solo copia index.html.

   Se corre con:  npm run catalogo            (genera catalogo.html)
                  npm run catalogo -- servir  (y lo sirve en :5174)
   ============================================================ */
const path = require("path");
const fs = require("fs");
const RAIZ = path.join(__dirname, "..");
const SALIDA = path.join(RAIZ, "catalogo.html");

/* compilar el juego con el mismo banco que usan las pruebas */
const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(RAIZ, "src", "el-analista.jsx"));
const compilado = fs.readFileSync(path.join(__dirname, "compilado.js"), "utf8");

/* Los datos del catálogo se calculan aquí, en node, a partir de las
   tablas del propio juego: cuántas escenas lanzan cada minijuego y qué
   carreras lo tienen como fuerte. Así no se desactualiza a mano. */
const tmp = path.join(__dirname, "probeCat.js");
fs.writeFileSync(tmp, compilado.replace("module.exports = ElAnalista;",
  "module.exports = { JUEGOS, E, D, VIDA, LEGENDARIAS, CARRERAS };"));
const T = require(tmp);
try { fs.unlinkSync(tmp); } catch (e) {}
const escenas = [].concat(T.E, T.D, T.VIDA, T.LEGENDARIAS);
const datos = Object.keys(T.JUEGOS).map((k) => ({
  k,
  escenas: escenas.filter((e) => (e.o || []).some((o) => o.j === k || o.juego === k)).length,
  carreras: T.CARRERAS.filter((c) => (c.juegos || []).indexOf(k) >= 0).map((c) => c.n),
}));

/* El compilado es CommonJS para node. En el navegador se envuelve en
   una función para que sus nombres de arriba (JuegoPares, CSS…) no
   choquen con los de la sala, y React sale de los UMD. */
const motor = compilado
  .replace('const React = require("react");', "const React = window.React;")
  .replace("module.exports = ElAnalista;",
    "window.__EA = { TarjetaJuego, JUEGOS, NIVEL_N, CSS: CSS + CSS2 + CSS3 + CSS4 + CSS5 };");
const leer = (p) => fs.readFileSync(path.join(RAIZ, "node_modules", p), "utf8");
const sinCierre = (s) => s.replace(/<\/script/gi, "<\\/script");

const SALA = `
(function () {
  const h = React.createElement;
  const { useState, useEffect } = React;
  const { TarjetaJuego, JUEGOS, NIVEL_N, CSS } = window.__EA;
  const DATOS = ${JSON.stringify(datos)};
  const CLAVE = "el-analista-sala";
  /* lo probado se recuerda en este navegador, y si no se puede, da igual */
  const leerHechos = () => { try { return JSON.parse(localStorage.getItem(CLAVE) || "{}") || {}; } catch (e) { return {}; } };
  const guardarHechos = (x) => { try { localStorage.setItem(CLAVE, JSON.stringify(x)); } catch (e) {} };
  const RES = { exito: "Éxito", parcial: "Parcial", fallo: "Fallo" };

  function Sala() {
    /* Valores fijos, sin controles: aquí se viene a probar el juego, no a
       calibrarlo. Un personaje a media carrera (50 de atributo más los 22
       de ventaja que da el juego) y el temario en su primer nivel. */
    const modo = "aprendiz";
    const nivel = 1;
    const [jugando, setJugando] = useState(null);
    const [ronda, setRonda] = useState(0);
    const [res, setRes] = useState(null);
    const [hechos, setHechos] = useState(leerHechos);
    const ayuda = 72;

    useEffect(() => { try { window.scrollTo(0, 0); } catch (e) {} }, [jugando, res]);

    const jugar = (k) => { setRes(null); setJugando(k); setRonda((r) => r + 1); };
    const terminar = (nv) => {
      const x = Object.assign({}, hechos, { [jugando]: nv });
      setHechos(x); guardarHechos(x); setRes(nv);
    };
    const volver = () => { setJugando(null); setRes(null); };
    const siguiente = () => {
      const i = DATOS.findIndex((d) => d.k === jugando);
      const falta = DATOS.slice(i + 1).concat(DATOS.slice(0, i + 1)).find((d) => !hechos[d.k]);
      jugar((falta || DATOS[(i + 1) % DATOS.length]).k);
    };
    const probados = DATOS.filter((d) => hechos[d.k]).length;

    if (jugando && !res) {
      return h("div", { className: "ea-root" },
        h("style", null, CSS + SALA_CSS),
        h("button", { className: "sala-salir ea-dis", onClick: volver }, "← Catálogo"),
        h("div", { className: "ea-wrap" },
          h(TarjetaJuego, { key: ronda, tipo: jugando, ayuda, nivel, statN: "Ventaja", modo,
            temas: [], onTema: () => {}, visto: false, onVisto: () => {}, onFin: terminar })));
    }

    if (jugando && res) {
      const j = JUEGOS[jugando];
      return h("div", { className: "ea-root" }, h("style", null, CSS + SALA_CSS),
        h("div", { className: "ea-wrap sala-fin" },
          h("div", { className: "sala-k ea-dis" }, j.n),
          h("div", { className: "sala-res ea-dis " + res }, RES[res] || res),
          h("p", { className: "sala-ens" }, j.ensena),
          h("div", { className: "sala-botones" },
            h("button", { className: "ea-btn", onClick: () => jugar(jugando) }, "Otra vez"),
            h("button", { className: "ea-btn", onClick: siguiente }, "Siguiente sin probar"),
            h("button", { className: "ea-mini", style: { marginTop: 0 }, onClick: volver }, "Volver al catálogo"))));
    }

    return h("div", { className: "ea-root" }, h("style", null, CSS + SALA_CSS),
      h("div", { className: "ea-wrap" },
        h("div", { className: "sala-k ea-dis", style: { color: "var(--cobre)" } }, "El Analista · sala de juegos"),
        h("h1", { className: "sala-tit ea-dis" }, DATOS.length + " minijuegos"),
        h("p", { className: "sala-intro" }, "Todos los minijuegos del juego, sueltos, para probarlos de uno en uno. Son los mismos componentes que salen en una partida: el anuncio, las reglas y el juego. Lo que marques como probado se queda en este navegador."),
        h("div", { className: "sala-prog" },
          h("div", { className: "sala-progBar" }, h("div", { style: { width: (probados / DATOS.length * 100) + "%" } })),
          h("span", { className: "ea-mono" }, probados + " de " + DATOS.length + " probados"),
          probados > 0 && h("button", { className: "ea-atras ea-dis", style: { margin: 0 },
            onClick: () => { setHechos({}); guardarHechos({}); } }, "Empezar de cero")),
        h("div", { className: "sala-grid" }, DATOS.map((d, i) => {
          const j = JUEGOS[d.k], r = hechos[d.k];
          return h("button", { key: d.k, className: "sala-ficha" + (r ? " hecha" : ""), onClick: () => jugar(d.k) },
            h("div", { className: "sala-fichaTop ea-dis" },
              h("span", null, String(i + 1).padStart(2, "0") + " · " + j.tema),
              h("span", null, j.dur)),
            h("div", { className: "sala-fichaN ea-dis" }, j.n),
            h("div", { className: "sala-fichaI" }, j.i),
            h("div", { className: "sala-fichaPie" },
              h("span", { className: "ea-mono" + (d.escenas <= 1 ? " raro" : "") },
                "sale en " + d.escenas + (d.escenas === 1 ? " escena" : " escenas")),
              d.carreras.length > 0 && h("span", null, "fuerte en " + d.carreras.join(", ")),
              r && h("span", { className: "sala-marca " + r }, "✓ " + (RES[r] || r))));
        }))));
  }

  const SALA_CSS = \`
    .sala-k{font-size:11px;letter-spacing:.14em;color:var(--gris)}
    .sala-tit{font-size:40px;line-height:1;margin:6px 0 10px;color:var(--tinta)}
    .sala-intro{max-width:640px;margin:0 0 16px}
    .sala-prog{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px;font-size:13px}
    .sala-progBar{flex:1 1 200px;height:8px;background:var(--hueso);border-radius:4px;overflow:hidden}
    .sala-progBar>div{height:100%;background:var(--verde);transition:width .3s}
    .sala-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
    .sala-ficha{text-align:left;border:1px solid rgba(61,61,61,.25);background:#fff;padding:12px 14px;cursor:pointer;
      font:inherit;color:inherit;display:flex;flex-direction:column;gap:6px;transition:border-color .15s,transform .15s}
    .sala-ficha:hover{border-color:var(--cobre);transform:translateY(-1px)}
    .sala-ficha.hecha{background:#F0F4F1;border-left:4px solid var(--verde)}
    .sala-fichaTop{display:flex;justify-content:space-between;font-size:10.5px;letter-spacing:.12em;color:var(--gris)}
    .sala-fichaN{font-size:19px;color:var(--tinta);line-height:1.1}
    .sala-fichaI{font-size:13px;line-height:1.4}
    .sala-fichaPie{display:flex;flex-wrap:wrap;gap:6px;font-size:11.5px;color:var(--gris);margin-top:auto}
    .sala-fichaPie span{border:1px solid rgba(61,61,61,.18);padding:1px 6px}
    .sala-fichaPie .raro{color:var(--cobre);border-color:var(--cobre)}
    .sala-marca.exito{color:#2F7A3D;border-color:#2F7A3D}
    .sala-marca.parcial{color:#9A7A10;border-color:#9A7A10}
    .sala-marca.fallo{color:var(--rojo);border-color:var(--rojo)}
    .sala-salir{position:fixed;top:10px;left:10px;z-index:99999;background:var(--tinta);color:var(--papel);
      border:none;padding:8px 12px;font-size:12px;letter-spacing:.12em;cursor:pointer}
    .sala-fin{max-width:560px;padding-top:40px}
    .sala-res{font-size:48px;margin:6px 0 10px}
    .sala-res.exito{color:#2F7A3D}.sala-res.parcial{color:#9A7A10}.sala-res.fallo{color:var(--rojo)}
    .sala-ens{margin:0 0 18px}
    .sala-botones{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
    @media (max-width:520px){.sala-tit{font-size:30px}}
  \`;

  ReactDOM.createRoot(document.getElementById("sala")).render(h(Sala));
})();
`;

const html = '<!doctype html><html lang="es"><head><meta charset="utf-8">'
  + '<meta name="viewport" content="width=device-width,initial-scale=1">'
  + "<title>El Analista · sala de juegos</title>"
  + '<style>html,body{margin:0;background:#F7F7F5}</style></head><body><div id="sala"></div>'
  + "<script>" + sinCierre(leer("react/umd/react.production.min.js")) + "</script>"
  + "<script>" + sinCierre(leer("react-dom/umd/react-dom.production.min.js")) + "</script>"
  + "<script>(function(){" + sinCierre(motor) + "})();</script>"
  + "<script>" + sinCierre(SALA) + "</script>"
  + "</body></html>";
fs.writeFileSync(SALIDA, html);
console.log("escrito " + SALIDA + "  (" + Math.round(html.length / 1024) + " KB, " + datos.length + " minijuegos)");

if (process.argv.indexOf("servir") >= 0) {
  require("http").createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(fs.readFileSync(SALIDA));
  }).listen(5174, () => console.log("Sala de juegos en http://localhost:5174"));
}
