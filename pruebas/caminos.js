/* ============================================================
   ¿SE PARECEN TODAS LAS PARTIDAS?
   El juego era un rombo: cada decision abria caminos que volvian a
   juntarse en la escena siguiente, porque esa escena se sorteaba solo
   por el cargo. Esta prueba juega partidas enteras eligiendo al azar y
   mide tres cosas:

     parecido   cuanto se solapan las escenas de dos partidas cualquiera
                (Jaccard: 1 es que viste exactamente lo mismo, 0 nada
                en comun). Cuanto mas bajo, mas distinto es cada camino.
     ecos       cuantas escenas de cada partida llegaron POR algo que
                decidiste antes —las que dicen «Viene de:»—.
     arbol      que consecuencias no salieron nunca, para saber que
                rama del arbol se ha quedado sin probar.

   Se corre con:  node pruebas/caminos.js [partidas] [ruta del juego]
   Para comparar con main:
     git show origin/main:src/el-analista.jsx > pruebas/main.jsx
     node pruebas/caminos.js 16 pruebas/main.jsx
   ============================================================ */
const path = require("path");
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

let pend = [], sig = 1;
global.setTimeout = (fn, ms) => { const id = sig++; pend.push({ id, fn, en: ms || 0, rep: 0 }); return id; };
global.setInterval = (fn, ms) => { const id = sig++; pend.push({ id, fn, en: ms || 1, rep: ms || 1 }); return id; };
global.clearTimeout = (id) => { pend = pend.filter((p) => p.id !== id); };
global.clearInterval = global.clearTimeout;
function reloj(ms) {
  let r = ms, g = 0;
  while (r > 0 && g++ < 4000) {
    if (!pend.length) break;
    const min = Math.min.apply(null, pend.map((p) => p.en));
    const paso = Math.max(0, Math.min(min, r));
    pend.forEach((p) => { p.en -= paso; });
    r -= paso || r;
    pend.filter((p) => p.en <= 0).forEach((p) => {
      if (p.rep) p.en = p.rep; else pend = pend.filter((q) => q.id !== p.id);
      p.fn();
    });
  }
}
const micro = async () => { for (let i = 0; i < 6; i++) await Promise.resolve(); };

const { cargar } = require(path.join(__dirname, "banco.js"));
const RUTA = process.argv[3] || path.join(__dirname, "..", "src", "el-analista.jsx");
const ElAnalista = cargar(RUTA);

function txtDe(j) {
  if (j == null || j === false || j === true) return "";
  if (typeof j === "string") return j;
  if (typeof j === "number") return String(j);
  if (Array.isArray(j)) return j.map(txtDe).join(" ");
  if (j.type === "style") return "";
  if (j.children != null) return txtDe(j.children);
  if (j.props && j.props.children != null) return txtDe(j.props.children);
  return "";
}
const norm = (s) => String(s).replace(/\s+/g, " ").trim();
function porClase(json, clase) {
  const out = [];
  (function rec(x) {
    if (!x || typeof x !== "object") return;
    const c = x.props && x.props.className;
    if (typeof c === "string" && c.split(" ").includes(clase)) out.push(norm(txtDe(x)));
    (x.children || []).forEach(rec);
  })(json);
  return out;
}

async function unaVida(semilla) {
  let s0 = semilla >>> 0 || 1;
  Math.random = () => { s0 ^= s0 << 13; s0 >>>= 0; s0 ^= s0 >> 17; s0 ^= s0 << 5; s0 >>>= 0; return (s0 % 100000) / 100000; };
  const mapa = new Map();
  global.window = { localStorage: { getItem: (k) => (mapa.has(k) ? mapa.get(k) : null), setItem: (k, v) => mapa.set(k, String(v)), removeItem: (k) => mapa.delete(k) } };
  let r = null;
  await act(async () => { r = TR.create(React.createElement(ElAnalista)); await micro(); });
  const bs = () => { try { return r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) { return []; } };
  const rot = (b) => norm(txtDe(b.props.children));
  const cls = (b) => String(b.props.className || "");
  const pulsa = async (b) => { if (!b) return false; await act(async () => { b.props.onClick({ target: { value: "50" }, preventDefault() {}, stopPropagation() {} }); await micro(); }); return true; };
  const porRot = (re) => bs().find((b) => re.test(rot(b)));

  await act(async () => { reloj(400); await micro(); });
  await pulsa(porRot(/acepto y quiero jugar/i));
  await pulsa(porRot(/^Jugar ya$/));
  await pulsa(porRot(/^(Femenino|Masculino|Prefiero no decirlo)$/));
  await pulsa(porRot(/^Elegir yo/));
  await pulsa(porRot(/^Empezar a los 20/));
  const p = bs().filter((b) => /^Elegir$/.test(rot(b)));
  await pulsa(p[semilla % Math.max(1, p.length)] || p[0]);
  const c = bs().filter((b) => /^(Graduarte de esto|Empezar con esto)$/.test(rot(b)));
  await pulsa(c[(semilla >> 3) % Math.max(1, c.length)] || c[0]);
  await pulsa(porRot(/^Sé lo que hago/));

  const vida = { escenas: [], ecos: [], rama: null, anos: 0 };
  let ultimoAno = null, pasos = 0;
  while (pasos++ < 1600) {
    await act(async () => { reloj(2500); await micro(); });
    const j = r.toJSON();
    const t = norm(txtDe(j));
    if (/Algo se rompió|Vivir otra vida/.test(t)) break;
    const mA = t.match(/Así terminó (\d{4})/);
    if (mA && mA[1] !== ultimoAno) { ultimoAno = mA[1]; vida.anos++; }
    if (await pulsa(porRot(/^Retirarme ahora$/))) continue;
    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) {
      /* una escena con opciones: se apunta que salió y, si traía el
         «Viene de:», que fue una consecuencia */
      const tit = porClase(j, "ea-memoTit")[0];
      if (tit && vida.escenas[vida.escenas.length - 1] !== tit) {
        vida.escenas.push(tit);
        if (porClase(j, "ea-porQue").length) vida.ecos.push(tit);
      }
      const elegida = ops[Math.floor(Math.random() * ops.length) % ops.length];
      if (tit === "Hacia dónde va tu carrera") vida.rama = rot(elegida).replace(/^[A-D]\s+/, "").slice(0, 34);
      await pulsa(elegida);
      continue;
    }
    if (await pulsa(porRot(/^(Entendido|Después|Ver la sección|Cerrar y volver|Aplica o descarta|✕)$/))) continue;
    if (await pulsa(porRot(/^Ver el año$/))) continue;
    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Empezar$|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el número|Cerrar posición|Aguantar|Comprar|Empezar 20|Poner el capital|Sentarte a hacer|Ver el balance)/))) continue;
    /* Una casilla al azar, no siempre la primera: en el Cuatro en raya,
       cuando la primera columna se llena, tocarla ya no hace nada, y en
       las parejas se volteaba la misma ficha una y otra vez. La partida
       se quedaba ahí para siempre, y no por culpa del juego. */
    let z = null;
    try {
      const zs = r.root.findAll((x) => x.props && x.props.role === "button" && typeof x.props.onClick === "function");
      z = zs.length ? zs[Math.floor(Math.random() * zs.length) % zs.length] : null;
    } catch (e) {}
    if (z) { await act(async () => { z.props.onClick({}); await micro(); }); continue; }
    const libres = bs().filter((b) => /^ea-check/.test(cls(b)) && !/^X\b/.test(rot(b)));
    if (libres.length) { await pulsa(libres[0]); continue; }
    const o = bs().find((b) => /^ea-(check|celdaC|ordenI|btn|mini)/.test(cls(b)));
    if (o) { await pulsa(o); continue; }
    await act(async () => { reloj(5000); await micro(); });
  }
  try { await act(async () => { r.unmount(); }); } catch (e) {}
  return vida;
}

const jaccard = (a, b) => {
  const A = new Set(a), B = new Set(b);
  let comun = 0;
  A.forEach((x) => { if (B.has(x)) comun++; });
  const union = A.size + B.size - comun;
  return union ? comun / union : 1;
};

(async () => {
  const N = Number(process.argv[2] || 16);
  const vidas = [];
  for (let i = 0; i < N; i++) { vidas.push(await unaVida(1000003 * (i + 1))); process.stdout.write("."); }
  console.log("\n");

  let suma = 0, pares = 0;
  for (let i = 0; i < vidas.length; i++) {
    for (let k = i + 1; k < vidas.length; k++) { suma += jaccard(vidas[i].escenas, vidas[k].escenas); pares++; }
  }
  const parecido = pares ? suma / pares : 1;
  const escenas = vidas.reduce((a, v) => a + v.escenas.length, 0);
  const ecos = vidas.reduce((a, v) => a + v.ecos.length, 0);
  const distintas = new Set([].concat(...vidas.map((v) => v.escenas))).size;

  console.log("  " + N + " partidas · " + (vidas.reduce((a, v) => a + v.anos, 0) / N).toFixed(1) + " años de media");
  console.log("");
  console.log("  parecido medio entre dos partidas: " + parecido.toFixed(3) + "   (1 = idénticas, 0 = nada en común)");
  console.log("  escenas distintas vistas en total: " + distintas);
  console.log("  consecuencias por partida:         " + (ecos / N).toFixed(1)
    + "   (" + Math.round((escenas ? ecos / escenas : 0) * 100) + "% de las escenas vinieron de algo que decidiste)");
  console.log("");
  const ramas = {};
  vidas.forEach((v) => { if (v.rama) ramas[v.rama] = (ramas[v.rama] || 0) + 1; });
  console.log("  caminos elegidos:");
  Object.keys(ramas).sort((a, b) => ramas[b] - ramas[a]).forEach((k) => console.log("    " + String(ramas[k]).padStart(2) + "x  " + k));
  if (!Object.keys(ramas).length) console.log("    ninguno");
  console.log("");

  /* las ramas del arbol que no llegaron a salir, si el juego las tiene */
  let consec = [];
  try {
    const fs = require("fs");
    const src = fs.readFileSync(path.join(__dirname, "compilado.js"), "utf8");
    if (/CONSECUENCIAS/.test(src)) {
      const tmp = path.join(__dirname, "probeCaminos.js");
      fs.writeFileSync(tmp, src.replace("module.exports = ElAnalista;", "module.exports = { CONSECUENCIAS };"));
      consec = require(tmp).CONSECUENCIAS || [];
      fs.unlinkSync(tmp);
    }
  } catch (e) { consec = []; }
  if (consec.length) {
    const vistas = new Set([].concat(...vidas.map((v) => v.ecos)));
    const faltan = consec.filter((e) => !vistas.has(e.t));
    console.log("  consecuencias que salieron: " + (consec.length - faltan.length) + " de " + consec.length);
    faltan.forEach((e) => console.log("    · nunca: " + e.t));
  } else {
    console.log("  (esta versión del juego no tiene consecuencias)");
  }
})();
