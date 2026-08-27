const path = require("path");
/* Una partida entera, jugada con criterio y registrada pantalla por
   pantalla, para poder leerla después como la leería un jugador. */
const fs = require("fs");
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
const micro = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

let src = fs.readFileSync(path.join(__dirname, "compilado.js"), "utf8");
src = src.replace("module.exports = ElAnalista;", "module.exports = { ElAnalista };");
fs.writeFileSync(path.join(__dirname, "probeP.js"), src);
const { ElAnalista } = require(path.join(__dirname, "probeP.js"));

const mapa = new Map();
global.window = { localStorage: {
  getItem: (k) => (mapa.has(k) ? mapa.get(k) : null),
  setItem: (k, v) => { mapa.set(k, String(v)); }, removeItem: (k) => { mapa.delete(k); },
} };

/* texto del arbol, saltando el <style> */
/* Sirve para las dos formas del arbol: los nodos de toJSON() traen
   los hijos en .children y los elementos de React en .props.children.
   Mi version anterior solo miraba .children, asi que cualquier boton con
   hijos anidados salia vacio y el driver creia que no existia. */
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
const norm = (s) => s.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

/* texto solo del panel derecho (el memorando), que es donde pasa todo */
function memo(r) {
  try {
    const nodos = r.root.findAll((x) => x.props && String(x.props.className || "").split(" ").includes("ea-memo"));
    if (!nodos.length) return "";
    return norm(txtDe(nodos[nodos.length - 1].toJSON ? nodos[nodos.length - 1].toJSON() : null) || "");
  } catch (e) { return ""; }
}

const registro = [];
const log = (x) => registro.push(x);

(async () => {
  let semilla = Number(process.argv[2] || 20260817);
  Math.random = () => { semilla ^= semilla << 13; semilla >>>= 0; semilla ^= semilla >> 17; semilla ^= semilla << 5; semilla >>>= 0; return (semilla % 100000) / 100000; };

  let r = null;
  await act(async () => { r = TR.create(React.createElement(ElAnalista)); await micro(); });

  const bs = () => { try { return r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) { return []; } };
  const rot = (b) => norm(txtDe(b.props.children)).replace(/\n/g, " ").trim();
  const clsDe = (b) => String(b.props.className || "");
  const pulsa = async (b) => { if (!b) { console.log("NO HAY BOTON. Disponibles: " + JSON.stringify(bs().map(rot).slice(0,12))); throw new Error("boton ausente"); } await act(async () => { b.props.onClick({ target: { value: "50" }, preventDefault() {}, stopPropagation() {} }); await micro(); }); };
  const porRotulo = (re) => bs().find((b) => re.test(rot(b)));
  const todo = () => norm(txtDe(r.toJSON()));

  /* ---- configuración: analista, 20 años ---- */
  await act(async () => { reloj(400); await micro(); });
  log("=== AVISO ===\n" + todo().slice(0, 400) + "\n");
  log("botones en la primera pantalla: " + JSON.stringify(bs().map(rot)));
  const bAviso = porRotulo(/acepto y quiero jugar/i);
  if (bAviso) await pulsa(bAviso);
  await pulsa(porRotulo(/^Empezar$/));
  await pulsa(porRotulo(/^Analista/));
  await pulsa(porRotulo(/^Empezar a los 20/));
  /* país: el segundo de la lista, para no coger siempre el primero */
  const paises = bs().filter((b) => /^Elegir$/.test(rot(b)));
  log("=== PAÍS === opciones visibles: " + paises.length);
  await pulsa(paises[1] || paises[0]);
  const carreras = bs().filter((b) => /^Graduarte de esto$/.test(rot(b)));
  log("=== CARRERA === opciones visibles: " + carreras.length);
  await pulsa(carreras[0]);

  /* ---- la vida ---- */
  let anoActual = 0, escenas = 0, pasos = 0;
  const yaVisto = new Set();

  while (pasos++ < 1400) {
    await act(async () => { reloj(2500); await micro(); });
    const t = todo();
    if (/Algo se rompió/.test(t)) { log("\n*** LA FRONTERA DE ERROR SE ACTIVÓ ***\n" + t.slice(0, 400)); break; }

    /* fin de la partida */
    if (/Vivir otra vida/.test(t)) { log("\n=== BALANCE FINAL ===\n" + t.slice(t.indexOf("años ·")) ); break; }

    /* decisión de retiro */
    const retiro = porRotulo(/^Seguir cinco años más$/);
    if (retiro) {
      log("\n=== A LOS 50: ¿TE RETIRAS? ===\n" + memo(r));
      /* seguir cinco años más una vez, después retirarse */
      const seguir = anoActual < 33;
      await pulsa(seguir ? retiro : porRotulo(/^Retirarme ahora$/));
      continue;
    }

    /* cierre de año */
    if (/Así terminó/.test(t)) {
      anoActual++;
      const m = memo(r);
      if (anoActual <= 3 || anoActual % 6 === 0) log("\n=== CIERRE DE AÑO " + anoActual + " ===\n" + m + "\n");
      const seguirB = porRotulo(/^(Empezar 20|Sentarte a hacer cuentas|Ver el balance final)/);
      if (seguirB) { await pulsa(seguirB); continue; }
    }

    /* memorando con opciones */
    const ops = bs().filter((b) => clsDe(b).startsWith("ea-op"));
    if (ops.length) {
      escenas++;
      const m = memo(r);
      const titulo = (m.split("\n").find((l) => l.trim() && !/^\d/.test(l)) || "").slice(0, 70);
      /* criterio: preferir formarse y las que no arruinan; evitar las de puro gasto */
      let idx = 0;
      const rots = ops.map(rot);
      const prefiere = (re) => rots.findIndex((x) => re.test(x));
      const cand = [/estudiar|Sentarte a estudiar|certificaci|explicarlo|Repasarlo/i, /contrato|papeles|auditad|registro|Preguntar/i, /No,|Dejarlo|no puedes/i];
      for (const re of cand) { const k = prefiere(re); if (k >= 0) { idx = k; break; } }
      if (escenas <= 12 || escenas % 10 === 0) {
        log("\n--- ESCENA " + escenas + " (año ~" + (anoActual + 1) + ") ---\n" + m.slice(0, 700)
          + "\n  >> ELIJO: " + rots[idx]);
      }
      await pulsa(ops[idx]);
      continue;
    }

    /* botones de avance genéricos */
    const av = porRotulo(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el número|Cerrar posición|Aguantar|Comprar|Vender|Empezar 20)/);
    if (av) { await pulsa(av); continue; }

    /* zonas clicables de los minijuegos */
    let zona = null;
    try { zona = r.root.findAll((z) => z.props && z.props.role === "button" && typeof z.props.onClick === "function")[0]; } catch (e) {}
    if (zona) { await act(async () => { zona.props.onClick({}); await micro(); }); continue; }

    const otro = bs().find((b) => /^ea-(check|celdaC|ordenI|deal|btn|mini)/.test(clsDe(b)));
    if (otro) { await pulsa(otro); continue; }

    await act(async () => { reloj(5000); await micro(); });
    if (pasos > 1200) break;
  }

  log("\n\n=== RESUMEN DE LA CORRIDA ===");
  log("años jugados: " + anoActual + "   escenas resueltas: " + escenas + "   pasos: " + pasos);
  fs.writeFileSync(path.join(__dirname, "partida-log.txt"), registro.join("\n"));
  console.log("escrito partida-log.txt  (" + registro.join("\n").length + " caracteres)");
  console.log("años jugados: " + anoActual + "  escenas: " + escenas);
})();
