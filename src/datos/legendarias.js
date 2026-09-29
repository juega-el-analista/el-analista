/* ============================================================
   DECISIONES LEGENDARIAS
   Una carrera entera tiene tres o cuatro momentos que la parten en dos.
   Estas escenas son raras a proposito (una tirada al anio, y cada una
   solo puede salir una vez) y mueven cifras que ninguna escena normal
   mueve. Si salieran a menudo dejarian de significar nada.
   ============================================================ */
export const LEGENDARIAS = [
  {
    id: 9801, min: 2, max: 6, legendaria: true, clave: true,
    t: "El mandato de tu vida",
    x: "Llega a la firma el mandato del que se va a hablar durante diez años. Alguien tiene que llevarlo y todos miran hacia la misma silla. Si sale bien, tu nombre queda pegado a la operación para siempre. Si sale mal, también.",
    o: [
      { t: "Pedirlo y llevarlo tú", j: "estructura", stat: "mod",
        res: {
          exito: { cash: 180000, car: 22, rep: 18, red: 12, ene: -22, msg: "Cierra. Tu nombre queda pegado a la operación de la década y el bono lo dice todo." },
          parcial: { cash: 55000, car: 10, rep: 4, ene: -20, msg: "Cierra a duras penas y con concesiones. Cuenta, pero no como contaba en tu cabeza." },
          fallo: { cash: -12000, car: -6, rep: -12, ene: -24, msg: "Se cae en la recta final. El mercado sabe quién lo llevaba." },
        } },
      { t: "Apoyar desde atrás sin firmar nada", d: { car: 5, red: 6, ene: -6, msg: "Ayudas sin exponerte. Sales entero y sin historia que contar." } },
    ],
  },
  {
    id: 9802, min: 3, max: 6, legendaria: true, clave: true,
    t: "Te llama un fondo soberano",
    x: "Un fondo soberano busca a alguien de fuera para sentarlo en su comité de inversiones. No es un trabajo: es un asiento. Pagan poco y abren todas las puertas del continente.",
    o: [
      { t: "Aceptar el asiento", d: { red: 24, rep: 20, cri: 10, ene: -10, cash: 12000, msg: "Te sientas en ese comité. A partir de aquí te devuelven las llamadas el mismo día." } },
      { t: "Declinar, no tienes las horas", d: { ene: 10, car: 3, msg: "Dices que no. Es defendible y te vas a acordar de esta conversación más de una vez." } },
    ],
  },
  {
    id: 9803, min: 3, max: 6, legendaria: true, clave: true,
    t: "Lo que nadie quiere comprar",
    x: "Un vendedor forzado necesita salir de un activo bueno esta semana. El precio es una fracción de lo que vale y el problema es exactamente ese: nadie regala nada y tú tienes tres días para entender por qué.",
    o: [
      { t: "Entrar fuerte", j: "banderas", stat: "cri",
        res: {
          exito: { cash: 140000, cri: 12, rep: 8, msg: "Estaba barato de verdad y tú viste por qué. Esto no pasa dos veces." },
          parcial: { cash: 25000, cri: 6, msg: "Estaba barato y algo tenía. Sales bien, no espectacular." },
          fallo: { cash: -70000, cri: 8, rep: -6, msg: "Estaba barato por una razón que no viste. La lección sale carísima y no se olvida." },
        } },
      { t: "Mirarlo y dejarlo pasar", d: { cri: 6, ene: 4, msg: "Lo estudias, no te cuadra y lo dejas. La mitad de las veces eso es la decisión correcta." } },
    ],
  },
  {
    id: 9804, min: 4, max: 6, legendaria: true, clave: true,
    t: "Te ofrecen la silla",
    x: "El comité te propone dirigir toda la mesa. Es el techo de lo que se puede llegar a ser trabajando para alguien, y viene con todo: el número, las horas y la responsabilidad de los errores de otros.",
    o: [
      { t: "Aceptar y dirigir la mesa", d: { car: 26, rep: 14, red: 8, ene: -18, cash: 40000, msg: "Te sientas en la cabecera. El sueldo cambia de categoría y tu tiempo deja de ser tuyo." } },
      { t: "Proponer a otra persona y quedarte donde estás", d: { rep: 10, red: 10, ene: 8, msg: "Propones a alguien de tu equipo. Ganas un aliado para toda la vida y dejas pasar el techo." } },
    ],
  },
];
