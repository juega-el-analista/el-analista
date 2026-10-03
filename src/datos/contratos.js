import { elegirAzar } from "../motor/aritmetica.js";

/* ============================================================
   DONDE TRABAJAS Y CON QUE CONTRATO
   El juego siempre es finanzas, pero cada formacion entra por una
   puerta distinta, y hasta ahora no se veia por cual. El patron sale
   del titulo que estudiaste; el contrato es lo que se renegocia.
   Todas las firmas son inventadas.
   ============================================================ */
export const PATRONES = {
  eco: ["Andes Macro Partners", "Consultora Cardinal", "Meridiano Estudios Económicos"],
  con: ["Vargas & Prieto Auditores", "Contable Atlántico", "Revisoría Solano"],
  ing: ["Cordillera Project Finance", "Proyecta Capital", "Infraestructura del Sur"],
  der: ["Larrea Structuring", "Salazar Mendoza Abogados", "Estudio Fondevila"],
  adm: ["Grupo Corporativo Ávila", "Nexo Asesores", "Mercantil Praga"],
  sis: ["Quantum Datos Financieros", "Nodo Capital Tech", "Delta Sistemas Bursátiles"],
};

export const PATRONES_TODOS = Object.keys(PATRONES).reduce((a, k) => a.concat(PATRONES[k]), []);

/* Una firma distinta a la tuya, para cuando te vas a la competencia. */
export const otroPatron = (st) => {
  const lista = PATRONES[st && st.estudio] || PATRONES_TODOS;
  const fuera = lista.filter((n) => n !== (st && st.patron));
  return elegirAzar(fuera.length ? fuera : lista) || lista[0];
};

/* Duraciones que se pueden firmar. Mas años, mas sueldo y menos margen
   para moverte: es el intercambio y esta a la vista. */
const CONTRATOS = [
  { anos: 2, n: "Dos años", mult: 1.00, d: "Corto. Te vuelves a sentar pronto, y eso corta en los dos sentidos." },
  { anos: 4, n: "Cuatro años", mult: 1.09, d: "El punto medio: algo más de sueldo por algo menos de libertad." },
  { anos: 6, n: "Seis años", mult: 1.20, d: "Largo. Pagan mejor porque no te vayas, y no te vas." },
];
export const TOPE_MULT = 2.2;

/* La escena que se dispara cuando el contrato llega a su fin. Se empuja
   a mano desde generarAno, asi que puede repetirse toda la partida. */
export const ESCENA_CONTRATO = {
  id: 9710, min: 0, max: 6, contrato: true, clave: true,
  t: "Se te vence el contrato",
  x: "Termina el plazo que firmaste. Te ponen un papel nuevo sobre la mesa y, por una vez, el número no está decidido: depende de lo que digas en la próxima media hora.",
  o: CONTRATOS.map((c) => ({
    t: "Renovar por " + c.n.toLowerCase(),
    contrato: { anos: c.anos, mult: c.mult },
    d: { rep: 2, cri: 1, msg: "Firmas por " + c.anos + " años en la misma firma. " + c.d },
  })).concat([
    {
      t: "Escuchar a la competencia y negociar",
      contrato: { anos: 3, mult: 1.16 }, cambiaPatron: true,
      j: "anclaje", stat: "red",
      d: { car: 4, red: 3, rep: -2, msg: "Te sientas con otra firma y pones tu número sobre la mesa." },
    },
  ]),
};
