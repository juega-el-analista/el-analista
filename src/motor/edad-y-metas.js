import { entero, texto } from "./aritmetica.js";

/* ============================================================
   METAS POR EDAD
   Referencia habitual de la planificación financiera: cuántas veces tu
   sueldo anual deberías tener invertido a cada edad. No es una ley,
   es una vara de medir, y no había ninguna en el juego.
   ============================================================ */
const METAS_EDAD = [
  { e: 30, x: 1 }, { e: 35, x: 2 }, { e: 40, x: 3 }, { e: 45, x: 4 },
  { e: 50, x: 6 }, { e: 55, x: 7 }, { e: 60, x: 8 }, { e: 67, x: 10 },
];
export const metaDeEdad = (edadHoy) => {
  const e = entero(edadHoy, 20, 15, 99);
  if (e < 30) return { e: 30, x: 1, aun: true };
  let out = METAS_EDAD[0];
  METAS_EDAD.forEach((m) => { if (e >= m.e) out = m; });
  return { ...out, aun: false };
};

export const TOPE_NOMBRE = 22;
/* Un nombre no necesita signos de puntuación raros. En vez de intentar
   listar todas las letras del mundo (y equivocarme con los acentos),
   quita lo que sobra: marcas de etiqueta, llaves, barras y cualquier
   cosa que no se escriba en un nombre. */
export const saneaNombre = (v) => texto(v, "", TOPE_NOMBRE * 3)
  .replace(/[<>{}[\]()\\/|`"~^*_=+;:!?@#$%&\d]/g, "")
  .replace(/\s+/g, " ")
  .slice(0, TOPE_NOMBRE)
  .trim();
/* concuerda una palabra con el género elegido; sin género, forma neutra */
const gen = (st, masc, fem, neutro) => {
  const g = st && st.genero;
  if (g === "f") return fem;
  if (g === "m") return masc;
  return neutro != null ? neutro : masc;
};
export const PAREJA_TXT = (st) => ({
  solo: gen(st, "sin pareja", "sin pareja", "sin pareja"),
  noviazgo: "en pareja",
  casado: gen(st, "casado", "casada", "en matrimonio"),
  divorciado: gen(st, "divorciado", "divorciada", "con un divorcio detrás"),
  viudo: gen(st, "viudo", "viuda", "en duelo"),
}[st && st.pareja] || "sin pareja");
/* Un solo modo. Hubo dos (Aprendiz y Analista) y se quitó la elección:
   el juego es para quien nunca ha invertido, así que todo el mundo juega
   con las explicaciones y la ventaja de aprendiz. Se conserva la tabla
   para no tocar a quien la lee; MODO() devuelve siempre este. */
const MODOS = [
  { id: "aprendiz", n: "Aprendiz", d: "Cada término se explica antes de usarse, los exámenes traen una clase previa y los minijuegos perdonan más. Pensado para quien nunca ha invertido nada.", ayuda: 22, indulgencia: 1 },
];
export const MODO = () => MODOS[0];
export const EDADES = [
  { e: 20, n: "20 años", d: "Recién graduado, sin nada ahorrado y con todo el tiempo del mundo a favor.", cash: 0, car: 0, mods: {} },
  { e: 30, n: "30 años", d: "Ya trabajaste unos años. Empiezas con algo de dinero, algo de red y menos años por delante.", cash: 9000, car: 14, mods: { cri: 6, red: 8, rep: 5 } },
  { e: 40, n: "40 años", d: "Media carrera hecha. Más patrimonio y más responsabilidades; el interés compuesto ya no te regala tanto.", cash: 30000, car: 42, mods: { cri: 12, red: 16, rep: 10, ene: -6 } },
  { e: 50, n: "50 años", d: "Empezar tarde no es no empezar. Menos tiempo, más recursos y una idea mucho más clara de lo que quieres.", cash: 65000, car: 62, mods: { cri: 18, red: 22, rep: 14, ene: -12 } },
];
export const EDAD_DE = (e) => EDADES.find((x) => x.e === e) || EDADES[0];

/* Cuanto dura la partida lo decide el jugador, no la tabla. La partida
   se para a preguntar «¿te retiras?» al llegar a tu meta, y cada vez que
   dices que no se estira cinco anios mas, hasta el tope absoluto. El
   retiro voluntario esta disponible mucho antes: en cuanto tu patrimonio
   cubra lo que cuesta tu vida.

   La meta la eliges al empezar. Antes eran treinta anios fijos para todo
   el mundo, y eso son mas de cien decisiones: la propia prueba finales.js
   solo cerraba 6 de 20 partidas, y la pantalla final —donde vive el
   registro— casi nadie la veia. Una decada se termina de una sentada, y
   quien se enganche sigue con el mismo boton de siempre. */
export const META_MIN = 8;
export const META_MAX = 30;
export const TOPE_ABSOLUTO = 55;   /* empezando a los 20, eso son los 75 */
const DURACIONES = [
  { id: "decada", meta: 10, n: "Una década",
    d: "Diez años, de una sentada. Llegas al balance final y ves en qué quedó todo. Si te enganchas, al llegar puedes seguir." },
  { id: "carrera", meta: 30, n: "La carrera entera",
    d: "Treinta años. El recorrido completo: el fondo propio, los reconocimientos y el temario hasta arriba. Es largo de verdad." },
];
export const DURACION = (id) => DURACIONES.find((x) => x.id === id) || DURACIONES[0];

/* la meta de esta partida y el anio en que toca preguntar, con los
   guardados viejos cayendo en 30 por defecto: para ellos no cambia nada */
const metaDe = (st) => entero(st && st.meta, 30, META_MIN, META_MAX);
export const topeDe = (st) => Math.min(TOPE_ABSOLUTO, metaDe(st) + entero(st && st.seguir, 0, 0, 20) * 5);
const semestre = (t) => String(2026 + t);
export const edad = (t, ini) => entero(ini, 20, 20, 50) + entero(t, 0, 0, 60);
export const esClave = (t) => t % 2 === 1;
export const tiene = (st, id) => st.perks.includes(id);

export const escalar = (d, nivel) => {
  const f = nivel === "exito" ? 1.6 : nivel === "parcial" ? 1 : 0.3;
  const g = nivel === "fallo" ? 1.6 : 1;
  const out = { ...d };
  ["mod", "cri", "red", "rep", "ene", "car", "cash"].forEach((k) => {
    if (!out[k]) return;
    out[k] = Math.round(out[k] > 0 ? out[k] * f : out[k] * g);
  });
  return out;
};
