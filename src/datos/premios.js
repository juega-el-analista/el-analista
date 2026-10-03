/* ============================================================
   RECONOCIMIENTOS
   Un patrimonio no es un legado. Estos premios son la otra forma de
   ganar: un nombre que la gente reconoce. Hay uno nacional por carrera,
   alcanzable a media carrera con el atributo que esa formacion trabaja,
   y uno mundial que solo llega a quien llega muy arriba y muy lejos.
   Se conceden solos al cerrar el anio, una vez cada uno.
   ============================================================ */
export const PREMIOS = [
  { id: "eco-n", est: "eco", mundial: false, n: "Premio Nacional de Economía",
    cuando: (st) => st.cri >= 68 && st.rango >= 3,
    x: "Tu lectura del ciclo dejó de ser una opinión y pasó a ser una referencia." },
  { id: "eco-m", est: "eco", mundial: true, n: "Nobel de Economía",
    cuando: (st) => st.cri >= 92 && st.rango >= 5 && st.turno >= 18,
    x: "Un trabajo tuyo cambió cómo se enseña una parte de la disciplina. Eso ya no se mide en dinero." },

  { id: "con-n", est: "con", mundial: false, n: "Reconocimiento del Colegio de Contadores",
    cuando: (st) => st.mod >= 68 && st.rango >= 3,
    x: "Tu criterio contable se cita en las guías que estudian los que vienen detrás." },
  { id: "con-m", est: "con", mundial: true, n: "Premio Mundial de Normas Contables",
    cuando: (st) => st.mod >= 92 && st.rango >= 5 && st.turno >= 18,
    x: "Ayudaste a redactar una norma que ahora aplican en cuarenta países." },

  { id: "ing-n", est: "ing", mundial: false, n: "Premio Nacional de Ingeniería",
    cuando: (st) => st.mod >= 62 && st.car >= 90,
    x: "Una obra que estructuraste tú se estudia como caso de eficiencia." },
  { id: "ing-m", est: "ing", mundial: true, n: "Medalla Mundial de Infraestructura",
    cuando: (st) => st.mod >= 88 && st.rango >= 5 && st.turno >= 18,
    x: "Financiaste algo que cambió cómo se mueve un país entero." },

  { id: "der-n", est: "der", mundial: false, n: "Abogado del Año",
    cuando: (st) => st.rep >= 72 && st.rango >= 3,
    x: "Tu nombre se volvió la primera llamada cuando algo se pone serio." },
  { id: "der-m", est: "der", mundial: true, n: "Premio Internacional de Arbitraje",
    cuando: (st) => st.rep >= 92 && st.rango >= 5 && st.turno >= 18,
    x: "Presidiste un arbitraje que sentó precedente en tres continentes." },

  { id: "adm-n", est: "adm", mundial: false, n: "Empresario del Año",
    cuando: (st) => st.red >= 72 && st.rango >= 3,
    x: "Todo el mundo conoce a alguien que te conoce. Eso ya es un activo." },
  { id: "adm-m", est: "adm", mundial: true, n: "Reconocimiento Global de Liderazgo",
    cuando: (st) => st.red >= 92 && st.rango >= 5 && st.turno >= 18,
    x: "Te ponen de ejemplo en escuelas de negocios que nunca pisaste." },

  { id: "sis-n", est: "sis", mundial: false, n: "Premio Nacional de Innovación",
    cuando: (st) => st.mod >= 70 && st.cri >= 55,
    x: "Automatizaste algo que media industria copió al año siguiente." },
  { id: "sis-m", est: "sis", mundial: true, n: "Premio Mundial de IA Aplicada",
    cuando: (st) => st.mod >= 92 && st.cri >= 80 && st.turno >= 18,
    x: "Un modelo tuyo se volvió infraestructura: se usa sin saber que es tuyo." },
];

export const PREMIO_DE = (id) => PREMIOS.find((p) => p.id === id) || null;

/* Los que ya te toca y todavia no tienes. Con try/catch por la misma
   razon que puedeComprar: un predicado mal escrito no puede tumbar el
   cierre del anio. */
export const premiosNuevos = (st) => {
  const ya = Array.isArray(st.premios) ? st.premios : [];
  return PREMIOS.filter((p) => {
    if (p.est !== st.estudio || ya.indexOf(p.id) >= 0) return false;
    try { return !!p.cuando(st); } catch (e) { return false; }
  });
};
