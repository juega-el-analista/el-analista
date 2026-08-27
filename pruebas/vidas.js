const path = require("path");
/* Tres vidas con criterios distintos, registradas de verdad.
   Uso: node vidas.js [semilla] */
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
fs.writeFileSync(path.join(__dirname, "probeV.js"), src);
const { ElAnalista } = require(path.join(__dirname, "probeV.js"));

/* --- extraccion de texto que funciona con las dos formas del arbol --- */
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
const norm = (s) => s.replace(/\s+/g, " ").trim();

/* busca en el arbol JSON el nodo con una clase dada y devuelve su texto */
function porClase(json, clase) {
  const salida = [];
  (function rec(x) {
    if (!x || typeof x !== "object") return;
    const c = x.props && x.props.className;
    if (typeof c === "string" && c.split(" ").includes(clase)) salida.push(norm(txtDe(x)));
    (x.children || []).forEach(rec);
  })(json);
  return salida;
}

/* --- los tres criterios --- */
const CRITERIOS = {
  prudente: {
    d: "siempre lo cauto: formarse, pedir papeles, no arriesgar",
    orden: [/estudiar|certificaci|explicarlo|Repasarlo|Sentarte/i, /contrato|papeles|auditad|registro|Preguntar|denuncia/i, /^.\s*No[,.]|Dejarlo|Dejar que|no puedes|Pasar/i],
  },
  ambicioso: {
    d: "siempre la carrera: aceptar, presentarse, pelear el puesto",
    orden: [/Aceptar|Presentar|Ir a por|Pelear|Adelantar|Asumir|Decidir tú|Levantar|Dar el paso|Quedarte/i, /juego|minijuego/i],
  },
  equilibrado: {
    d: "carrera cuando toca, prudencia con el dinero, y vida",
    orden: [/Aceptar|Presentar|Decidir tú|Adelantar/i, /estudiar|certificaci|explicarlo/i, /contrato|papeles|Preguntar/i],
  },
};

async function vivir(nombre, criterio, semilla, edadIni) {
  let s0 = semilla >>> 0 || 1;
  Math.random = () => { s0 ^= s0 << 13; s0 >>>= 0; s0 ^= s0 >> 17; s0 ^= s0 << 5; s0 >>>= 0; return (s0 % 100000) / 100000; };

  const mapa = new Map();
  global.window = { localStorage: {
    getItem: (k) => (mapa.has(k) ? mapa.get(k) : null),
    setItem: (k, v) => { mapa.set(k, String(v)); }, removeItem: (k) => { mapa.delete(k); },
  } };

  let r = null;
  await act(async () => { r = TR.create(React.createElement(ElAnalista)); await micro(); });
  const bs = () => { try { return r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) { return []; } };
  const rot = (b) => norm(txtDe(b.props.children));
  const cls = (b) => String(b.props.className || "");
  const pulsa = async (b) => { if (!b) return false; await act(async () => { b.props.onClick({ target: { value: "50" }, preventDefault() {}, stopPropagation() {} }); await micro(); }); return true; };
  const porRot = (re) => bs().find((b) => re.test(rot(b)));
  const json = () => r.toJSON();

  const L = [];
  const log = (x) => L.push(x);
  log("################ VIDA: " + nombre.toUpperCase() + " ################");
  log("criterio: " + criterio.d + "   ·   empieza a los " + edadIni);

  await act(async () => { reloj(400); await micro(); });
  await pulsa(porRot(/acepto y quiero jugar/i));
  await pulsa(porRot(/^Empezar$/));
  await pulsa(porRot(/^Analista/));
  await pulsa(porRot(new RegExp("^Empezar a los " + edadIni)));
  const paises = bs().filter((b) => /^Elegir$/.test(rot(b)));
  await pulsa(paises[1] || paises[0]);
  const carr = bs().filter((b) => /^(Graduarte de esto|Empezar con esto)$/.test(rot(b)));
  await pulsa(carr[1] || carr[0]);

  let ano = 0, escenas = 0, quiz = 0, pasos = 0, fin = "";
  const cabeceras = [];
  const lecciones = [];

  while (pasos++ < 2000) {
    await act(async () => { reloj(2500); await micro(); });
    const j = json();
    const t = norm(txtDe(j));
    if (/Algo se rompió/.test(t)) { fin = "LA FRONTERA DE ERROR SE ACTIVÓ"; break; }
    if (/Vivir otra vida/.test(t)) {
      fin = "terminó";
      log("\n===== BALANCE FINAL =====");
      const cif = porClase(j, "ea-cifras")[0] || "";
      log(porClase(j, "ea-final")[0] || "");
      log(porClase(j, "ea-lede")[0] || "");
      log("cifras: " + cif);
      porClase(j, "ea-panel").forEach((p) => log("\npanel: " + p.slice(0, 400)));
      break;
    }

    /* la placa de arriba: cargo, año, patrimonio */
    const placa = porClase(j, "ea-placa")[0];
    if (placa) cabeceras.push(placa);

    const retiro = porRot(/^Seguir cinco años más$/);
    if (retiro) {
      log("\n===== A LOS " + (edadIni + 30) + ": ¿TE RETIRAS? =====\n" + (porClase(j, "ea-memo")[0] || ""));
      await pulsa(porRot(/^Retirarme ahora$/));
      continue;
    }

    if (/Así terminó/.test(t)) {
      ano++;
      const m = porClase(j, "ea-memo")[0] || "";
      const lec = porClase(j, "ea-lec")[0];
      if (lec) lecciones.push("año " + ano + ": " + lec);
      if (ano === 1 || ano === 5 || ano === 15 || ano === 30) log("\n===== CIERRE DEL AÑO " + ano + " =====\n" + m + "\n");
      if (await pulsa(porRot(/^(Empezar 20|Sentarte a hacer cuentas|Ver el balance final)/))) continue;
    }

    const ops = bs().filter((b) => cls(b).startsWith("ea-op"));
    if (ops.length) {
      const rots = ops.map(rot);
      const enMemo = /Memorando|Decisión clave|Bifurcación/.test(t);
      let idx = 0;
      for (const re of criterio.orden) { const k = rots.findIndex((x) => re.test(x)); if (k >= 0) { idx = k; break; } }
      if (enMemo) {
        escenas++;
        const tit = porClase(j, "ea-memoTit")[0] || "";
        const cuerpo = (porClase(j, "ea-memoTxt")[0] || "").slice(0, 260);
        if (escenas <= 8 || escenas % 12 === 0) log("\n-- escena " + escenas + " (año " + (ano + 1) + ") -- " + tit + "\n   " + cuerpo + "\n   opciones: " + rots.map((x) => "[" + x.slice(0, 46) + "]").join(" ") + "\n   >> " + rots[idx].slice(0, 60));
      } else quiz++;
      await pulsa(ops[idx]);
      continue;
    }

    if (await pulsa(porRot(/^(Lo siguiente|Cerrar el año|Continuar|Entendido, empezar|Ya lo tengo|Terminar|Siguiente|Entregar el informe|Cerrar el trato|Fijar|Poner el número|Cerrar posición|Aguantar|Comprar|Empezar 20|Poner el capital)/))) continue;

    let zona = null;
    try { zona = r.root.findAll((z) => z.props && z.props.role === "button" && typeof z.props.onClick === "function")[0]; } catch (e) {}
    if (zona) { await act(async () => { zona.props.onClick({}); await micro(); }); continue; }
    const otro = bs().find((b) => /^ea-(check|celdaC|ordenI|btn|mini)/.test(cls(b)));
    if (otro) { await pulsa(otro); continue; }
    await act(async () => { reloj(5000); await micro(); });
  }

  /* trayectoria: cargo y patrimonio a lo largo del tiempo */
  const traza = [];
  cabeceras.forEach((c) => {
    const mm = c.match(/^(.+?) .*?(\d{4}) · (\d+) años.*?USD (-?[\d.]+)/);
    if (mm) { const k = mm[2]; if (!traza.length || traza[traza.length - 1].ano !== k) traza.push({ cargo: mm[1], ano: k, edad: mm[3], pat: mm[4] }); }
  });
  log("\n===== TRAYECTORIA =====");
  traza.filter((_, i) => i % 4 === 0 || i === traza.length - 1).forEach((x) => log("  " + x.ano + "  " + x.edad + " años  " + x.cargo.padEnd(18) + " USD " + x.pat));
  log("\nescenas de vida: " + escenas + "   preguntas respondidas: " + quiz + "   años cerrados: " + ano + "   final: " + fin);
  log("\nlecciones que salieron (" + lecciones.length + "):");
  lecciones.slice(0, 6).forEach((x) => log("  " + x.slice(0, 200)));
  return L.join("\n");
}

(async () => {
  const sem = Number(process.argv[2] || 20260817);
  const salida = [];
  salida.push(await vivir("prudente", CRITERIOS.prudente, sem, 20));
  salida.push(await vivir("ambicioso", CRITERIOS.ambicioso, sem + 7, 20));
  salida.push(await vivir("equilibrado", CRITERIOS.equilibrado, sem + 13, 20));
  fs.writeFileSync(path.join(__dirname, "vidas-log.txt"), salida.join("\n\n\n"));
  console.log("escrito vidas-log.txt");
})();
