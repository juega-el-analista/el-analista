/* rutas del repo, para que los scripts funcionen desde cualquier sitio */
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const RUTA_FUENTE = path.join(RAIZ, "src", "el-analista.jsx");
const RUTA_BUILD = path.join(RAIZ, "dist", "el-analista.html");
const RUTA_ORIGINAL = path.join(RAIZ, "historia", "el-analista.v5-original.jsx");

/* Juega muchas partidas y registra qué contenido nuevo aparece de verdad. */
const { cargar } = require(path.join(__dirname, "banco.js"));
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

const ARCHIVO = RUTA_FUENTE;
let pendientes = [], sig = 1;
global.setTimeout = (fn, ms) => { const id = sig++; pendientes.push({ id, fn, en: ms || 0, rep: 0 }); return id; };
global.setInterval = (fn, ms) => { const id = sig++; pendientes.push({ id, fn, en: ms || 1, rep: ms || 1 }); return id; };
global.clearTimeout = (id) => { pendientes = pendientes.filter((p) => p.id !== id); };
global.clearInterval = global.clearTimeout;
function avanzar(ms) {
  let r = ms, g = 0;
  while (r > 0 && g++ < 5000) {
    if (!pendientes.length) break;
    const min = Math.min.apply(null, pendientes.map((p) => p.en));
    const paso = Math.max(0, Math.min(min, r));
    pendientes.forEach((p) => { p.en -= paso; });
    r -= paso || r;
    pendientes.filter((p) => p.en <= 0).forEach((p) => {
      if (p.rep) p.en = p.rep; else pendientes = pendientes.filter((q) => q.id !== p.id);
      p.fn();
    });
  }
}
const micro = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
global.window = { localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} } };

function texto(j) {
  if (j == null) return "";
  if (typeof j === "string") return j;
  if (typeof j === "number") return String(j);
  if (Array.isArray(j)) return j.map(texto).join(" ");
  return texto(j.children);
}

/* marcadores: qué buscamos que aparezca alguna vez */
const MARCAS = {
  "pantalla de modo": "¿Cuánto sabes de esto?",
  "pantalla de edad": "¿A qué edad empiezas?",
  "modo aprendiz elegido": "Palabras que vas a ver",
  "recordatorio en el quiz": "Antes de responder, el recordatorio",
  "minijuego Cátedra (clase)": "Ya lo tengo, pregúntame",
  "Cátedra: ejemplo numérico": "Con números",
  "trading reescrito": "ESTÁS EN EFECTIVO",
  "trading: leyenda": "precio de la acción",
  "estructura reescrita": "Cuánto pides prestado",
  "estructura: escenarios": "Si va mal",
  "memoria con colores": "Cada casilla tiene su color",
  "orden con intentos": "Equivocarte cuesta un intento",
  "pestaña de términos": "El diccionario",
  "vida: medidor del tren": "Cómo vives",
  "vida: caprichos dentro": "Ninguno de estos es un error",
  "vida: peso del tren": "por ciento de lo que entra",
  "inmuebles: solo rentas": "Inmuebles que rentan",
  "evento de vida: pareja": "Alguien que te importa",
  "evento de vida: hijos": "Un hijo",
  "evento de vida: estafa": "Una empresa que no existe",
  "evento de vida: duelo": "Se murió",
  "evento de vida: familia": "Tu padre ya no puede solo",
  "escena de estudio": "Media hora antes",
  "ficha: vida personal": "Vida personal",
  "ficha: formación": "Formación acumulada",
  "cierre de año": "Así terminó",
  "final: lo que conservo valor": "Lo que conservó valor",
  "final: lo que no volvio": "Lo que se disfrutó y no volvió",
  "final: cuesta sostenerlo": "Cuánto cuesta sostenerlo",
  "final: tren de vida": "Tren de vida",

  "curva del año: pie": "Por el camino llegaste a estar",
  "curva del año: sin sobresaltos": "Un año sin sobresaltos dentro de la cartera",
  "banderas: documento": "Sobre la mesa ·",
  "banderas: por qué era roja": "Bandera roja · la viste",
  "banderas: por qué NO era": "No lo era",
  "banderas: se te pasó": "Bandera roja · se te pasó",
  "banderas: recuento": "Marcaste de más",
  "banderas: pista aprendiz": "Qué estás buscando",

  /* apertura escalonada: cada sistema entra como escena propia */
  "apertura: cartera": "Lo que sobra a fin de mes",
  "apertura: vida": "La vida que estás pagando",
  "apertura: banco": "El banco te empieza a mirar",
  "apertura: inmuebles": "Un ladrillo con tu nombre",
  "apertura: mejoras": "Dónde gastar el poco tiempo que queda",
  "apertura: fondo": "Del otro lado de la mesa",

  /* cartera: lo real y el objetivo, que antes se confundian */
  "cartera: reparto real": "Cómo está repartido ahora mismo",
  "cartera: objetivo": "Tu objetivo: cuánto de tu dinero trabaja",
  /* compras y carril */
  "inmuebles: ya es tuyo": "Vale hoy USD",
  "mejoras: ya la tienes": "Ya la tienes",
  /* la ficha emergente que explica un sistema recien abierto */
  "ficha de sección nueva": "ACABAS DE ABRIR",
  /* que se entienda: escala del anclaje y la frase del gasto */
  "anclaje: escala rotulada": "0 · lo regalas",
  "gasto: frase explicada": "el nivel de vida lo persigue",
  /* la vida no se apaga a los 24, y no se compra lo que no cuadra */
  "vida: volver a intentarlo": "No es la primera vez que empiezas esto",
  "vida: la conversación de los planes": "La conversación de los planes",
  "coherencia: boda sin pareja": "Necesitas alguien con quien casarte",
  "coherencia: fondo sin hijos": "Necesitas tener al menos un hijo",
  /* dónde trabajas y con qué contrato */
  "contrato: se vence": "Se te vence el contrato",
  "contrato: en la ficha": "Trabajas en",
  "contrato: te vas de firma": "Te vas de",
  /* legendarias, firma propia, sorpresas y retiro voluntario */
  "legendaria: cabecera": "Decisión legendaria",
  "legendaria: el mandato": "El mandato de tu vida",
  "firma propia: la oferta": "Renunciar y montar lo tuyo",
  "compra: vicios ocultos": "Aparecen vicios ocultos",
  "compra: tasan por encima": "Lo tasan bastante por encima",
  "retiro voluntario": "Retirarme ya",
};
const visto = {};
Object.keys(MARCAS).forEach((k) => { visto[k] = 0; });

const GUIA = ["Entendido, acepto", "Retomar", "Aprendiz", "Empezar a los", "Elegir", "Graduarte de esto", "Empezar con esto", "Entendido, empezar",
  "Ya lo tengo", "Siguiente", "Terminar", "Empezar", "Lo siguiente", "Cerrar el año", "Continuar",
  "Sentarte a hacer cuentas", "Seguir cinco años", "Retirarme ahora", "Ver el balance final",
  "Fijar", "Poner el número", "Cerrar posición", "Cerrar el trato"];

async function partida(Juego, semilla, aprendiz, vueltas) {
  let x = (semilla >>> 0) || 1;
  const rnd = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return (x % 100000) / 100000; };
  const real = Math.random; Math.random = rnd;
  let r = null;
  try {
    await act(async () => { r = TR.create(React.createElement(Juego)); await micro(); });
    for (let i = 0; i < vueltas; i++) {
      await act(async () => { avanzar(2200); await micro(); });
      const s = texto(r.toJSON());
      Object.keys(MARCAS).forEach((k) => { if (s.indexOf(MARCAS[k]) >= 0) visto[k]++; });
      let bs = [];
      try { bs = r.root.findAllByType("button").filter((b) => b.props.onClick && !b.props.disabled); } catch (e) {}
      if (!bs.length) { await act(async () => { avanzar(4000); await micro(); }); continue; }
      /* en las corridas "aprendiz" forzamos ese modo cuando aparece la pantalla */
      let b = null;
      if (aprendiz) {
        const ap = bs.filter((q) => texto(q.props.children).trim().indexOf("Aprendiz") === 0);
        if (ap.length) b = ap[0];
      }
      /* si hay un boton de cerrar/entregar activo, ese va primero:
         si no, el jugador se queda alternando casillas para siempre */
      if (!b) { const cierra = bs.filter((q) => ['Entregar el informe','Ya lo tengo','Cerrar el trato','Continuar','Terminar'].some((g) => texto(q.props.children).trim().indexOf(g) === 0));
        if (cierra.length) b = cierra[0]; }
      /* las opciones del memorando son las que hacen avanzar la partida;
         las pestañas laterales solo pasean, así que van al final */
      if (!b) { const ops = bs.filter((q) => String(q.props.className || '').indexOf('ea-op') === 0 || String(q.props.className || '').indexOf('ea-check') === 0);
        if (ops.length) b = ops[Math.floor(rnd() * ops.length) % ops.length]; }
      if (!b) for (const g of GUIA) { const c = bs.filter((q) => texto(q.props.children).trim().indexOf(g) === 0); if (c.length) { b = c[Math.floor(rnd() * c.length) % c.length]; break; } }
      if (!b) b = bs[Math.floor(rnd() * bs.length) % bs.length];
      const ev = { target: { value: "50" }, preventDefault() {}, stopPropagation() {} };
      await act(async () => { b.props.onClick(ev); await micro(); });
    }
  } finally { Math.random = real; try { await act(async () => { r && r.unmount(); }); } catch (e) {} }
}

(async () => {
  const Juego = cargar(ARCHIVO);
  const N = parseInt(process.argv[2] || "18", 10);
  for (let s = 1; s <= N; s++) {
    await partida(Juego, s * 2654435761, s % 2 === 0, 260);
    process.stdout.write(".");
  }
  console.log("\n");
  const faltan = [];
  Object.keys(MARCAS).forEach((k) => {
    const v = visto[k];
    console.log((v > 0 ? "  visto  " : "  NUNCA  ") + k.padEnd(30) + (v > 0 ? "x" + v : ""));
    if (!v) faltan.push(k);
  });
  console.log("\n" + (Object.keys(MARCAS).length - faltan.length) + "/" + Object.keys(MARCAS).length + " marcadores alcanzados en " + N + " partidas");
})();
