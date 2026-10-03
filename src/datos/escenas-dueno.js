/* ============================================================
   CUANDO LA FIRMA ES TUYA
   Con firma propia no hay jefe que te ascienda, headhunter que te
   tiente ni socio que decida por ti: esas escenas dejan de salir.
   En su lugar salen las de dueño, que solo existen si montaste lo
   tuyo. (28-sep-2026: seguían llegando ofertas de trabajo a quien ya
   tenía su propia constructora.)
   ============================================================ */
export const SOLO_EMPLEADO = [
  7,     /* te llama un headhunter */
  20,    /* un colega se cuelga de tu trabajo ante el comité */
  21,    /* llega el bono (te lo da tu firma) */
  22,    /* anuncian la fusión de tu firma */
  55,    /* una firma de Miami quiere contratarte */
  942,   /* el socio te pide que lo expliques tú */
  119,   /* la silla del socio se decide en la mesa */
  120,   /* te mandan a dirigir la oficina de otro país */
  9804,  /* te ofrecen la silla: el techo trabajando para alguien */
];
export const esDeEmpleado = (e) => !!e && SOLO_EMPLEADO.indexOf(e.id) >= 0;

export const DUENO = [
  { id: 9601, dueno: true, clave: true, min: 3, max: 6, t: "Te quieren comprar la firma",
    x: "Un grupo más grande te ofrece comprar tu firma. Buen precio, tres años de permanencia obligatoria y dejar de ser quien firma las decisiones.",
    o: [
      { t: "Vender una parte minoritaria y seguir al mando", d: { cash: 60000, red: 6, rep: -2, msg: "Entra capital y un socio con voz. Sigues al mando, aunque ahora hay alguien más en la mesa." } },
      { t: "Pedir más y hacerlos esperar", j: "anclaje", stat: "red", d: { cash: 90000, red: 4, rep: -3, msg: "Pones tu número sobre la mesa y dejas que el silencio negocie." } },
      { t: "No vender", d: { rep: 5, cri: 3, ene: -4, msg: "Lo que construiste no está a la venta. Todavía." } },
    ] },
  { id: 9602, dueno: true, min: 3, max: 6, t: "Tu mejor socio quiere irse con clientes",
    x: "La persona que trajo la mitad de tus clientes te avisa de que la tienta otra firma. Si se va, se lleva la agenda.",
    o: [
      { t: "Darle una parte de la firma", d: { cash: -25000, red: 5, rep: 3, msg: "Ahora también es dueño de una parte. Se queda, y se queda por otra razón." } },
      { t: "Dejarlo ir y quedarte con lo que queda", d: { red: -8, ene: 4, cri: 2, msg: "Se va con dos clientes. Duele, pero la firma sigue siendo toda tuya." } },
    ] },
  { id: 9603, dueno: true, min: 3, max: 6, t: "Los bonos de fin de año los pones tú",
    x: "Cerró el año y el reparto depende de ti. Lo que te quedas tú es exactamente lo que no le das a tu equipo.",
    o: [
      { t: "Repartir con generosidad", d: { cash: -15000, rep: 6, red: 4, msg: "El equipo lo nota. Este año nadie contesta a los headhunters." } },
      { t: "Quedarte con la mayor parte", d: { cash: 20000, rep: -5, red: -3, msg: "Tu cuenta sube y la sala se enfría un poco." } },
    ] },
  { id: 9604, dueno: true, min: 4, max: 6, t: "Un competidor propone fusionaros",
    x: "Una firma parecida a la tuya quiere unir fuerzas: el doble de clientes y dos personas diciendo que mandan.",
    o: [
      { t: "Fusionaros", d: { cash: 40000, red: 8, rep: -3, ene: -6, msg: "Más escala, más reuniones y un socio con el que discutirlo todo." } },
      { t: "Seguir por tu cuenta", d: { rep: 3, cri: 2, car: -2, msg: "Creces más lento, pero decides tú." } },
    ] },
  { id: 9605, dueno: true, min: 3, max: 6, t: "Tu cliente grande te pide abrir en Miami",
    x: "Tu cliente más importante se muda a Miami y te propone seguirlo. Abrir allá cuesta caro y te parte entre dos ciudades.",
    o: [
      { t: "Abrir una oficina allá", d: { cash: -40000, red: 9, car: 5, ene: -8, msg: "Dos oficinas, dos agendas y un cliente que ahora te debe una." } },
      { t: "Atenderlo desde aquí", d: { red: -3, ene: 3, rep: 2, msg: "Lo atiendes a distancia. Algo se pierde, pero no te partes en dos." } },
    ] },
];
