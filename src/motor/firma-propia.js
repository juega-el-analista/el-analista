import { fmt } from "./aritmetica.js";
import { RAMAS } from "../datos/bienes-y-ramas.js";

/* ============================================================
   TU PROPIA FIRMA
   Independizarse no puede significar lo mismo para todo el mundo: a un
   ingeniero de sistemas no le interesa montar una boutique de banca de
   inversion, le interesa montar algo que escale sin pedirle mas horas.
   Cada titulo tiene su salida, con su coste de montarla y su forma de
   pagar. El multiplicador se acumula sobre el sueldo que ya tenias.
   ============================================================ */
const FIRMAS = {
  eco: {
    n: "Tu propia consultora macro", corto: "Consultora macro",
    costo: 22000, mult: 1.26, mods: { cri: 7, rep: 4, ene: -4 },
    d: "Vendes lectura de ciclo a fondos y a empresas. Ingresos irregulares y un nombre que empieza a circular solo.",
  },
  con: {
    n: "Tu propia firma de auditoría", corto: "Firma de auditoría",
    costo: 16000, mult: 1.17, mods: { mod: 7, rep: 4, ene: -2 },
    d: "Aburrida, recurrente y difícil de matar: los clientes vuelven en cada cierre porque cambiar de auditor cuesta más que pagarte.",
  },
  ing: {
    n: "Tu propia constructora", corto: "Constructora",
    costo: 62000, mult: 1.46, mods: { car: 9, mod: 4, ene: -9 },
    d: "Obras, márgenes finos y un balance lleno de maquinaria. Cuando una obra sale bien, sale muy bien; cuando sale mal, te la llevas puesta.",
  },
  der: {
    n: "Tu propio bufete", corto: "Bufete",
    costo: 26000, mult: 1.31, mods: { rep: 9, red: 5, ene: -5 },
    d: "Horas facturables y un socio que eres tú. Aquí la reputación vale más que el capital, y tú ya la traes.",
  },
  adm: {
    n: "Tu propia firma de asesoría", corto: "Firma de asesoría",
    costo: 30000, mult: 1.32, mods: { red: 9, rep: 4, ene: -5 },
    d: "Vives de la red que llevas veinte años armando. Es tu activo principal y también tu único riesgo real.",
  },
  sis: {
    n: "Tu propia casa de IA aplicada a finanzas", corto: "Casa de IA",
    costo: 36000, mult: 1.52, mods: { mod: 9, cri: 4, ene: 3 },
    d: "Poca gente, mucho código y un producto que escala sin pedirte más horas. Es el único de la lista que puede crecer mientras duermes.",
  },
};

export const FIRMA_DE = (st) => FIRMAS[st && st.estudio] || FIRMAS.eco;

/* La rama «tu propia boutique» decia lo mismo a todo el mundo. Ahora la
   etiqueta se adapta al titulo, que es lo que la hacia chirriar. */
export const nombreRama = (st, id) => {
  if (id === "boutique") return FIRMA_DE(st).n;
  const r = RAMAS.find((x) => x.id === id);
  return r ? r.n : null;
};

/* Renunciar y montar lo tuyo. Se ofrece dos veces en toda la partida,
   una al llegar a Asociado y otra mas arriba, para que decir «no ahora»
   no sea decir «no nunca». */
export const escenaFirma = (st, id) => {
  const f = FIRMA_DE(st);
  return {
    id, min: 0, max: 6, clave: true, firma: true,
    t: "Renunciar y montar lo tuyo",
    x: "Llevas años haciendo rentable el nombre de otro. Tienes la red, tienes el criterio y por primera vez tienes el dinero para montar "
      + f.n.toLowerCase() + ". Montarla cuesta USD " + fmt(f.costo) + " y el sueldo fijo se acaba el día que firmas la renuncia.",
    o: [
      {
        t: "Renunciar y montarla", firmaPropia: true, j: "estructura", stat: "cri",
        d: { car: 6, rep: 5, msg: "Presentas la renuncia y montas " + f.n.toLowerCase() + ". " + f.d },
      },
      {
        t: "Quedarte donde estás, por ahora",
        d: { ene: 6, cri: 3, msg: "Te quedas. Es la decisión que toma casi todo el mundo, y casi siempre por buenas razones: el sueldo fijo del mes que viene." },
      },
    ],
  };
};
