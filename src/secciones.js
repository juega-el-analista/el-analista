/* Las secciones del juego, con la ruta, las fases y el head de cada una.
   Qué significa cada ruta está explicado en src/rutas.jsx. */
export const SECCIONES = {
  inicio: {
    ruta: "", fases: ["aviso", "portada"],
    titulo: "El Analista · simulador de carrera e inversión",
    descripcion: "Treinta años, un año por turno: decisiones, mercados que se mueven, una cartera que repartes tú y un temario de finanzas que sube contigo.",
  },
  personaje: {
    ruta: "nueva-partida", fases: ["identidad", "edad", "familia", "pais", "estudio"],
    titulo: "Tu personaje · El Analista",
    descripcion: "Nombre, edad, familia, país y estudios: con qué empiezas tu carrera.",
  },
  partida: {
    ruta: "partida", fases: ["evento", "minijuego", "resultado", "cierre", "retiro"],
    titulo: "Tu carrera · El Analista",
    descripcion: "El año en curso: la escena que toca, tu cartera y el cierre.",
  },
  fin: {
    ruta: "fin", fases: ["fin"],
    titulo: "Tu balance · El Analista",
    descripcion: "Cómo terminó esta vida: patrimonio, lo que se disfrutó y lo que quedó en el expediente.",
  },
};

export const seccionDeFase = (fase) =>
  Object.keys(SECCIONES).find((k) => SECCIONES[k].fases.indexOf(fase) >= 0) || "inicio";
