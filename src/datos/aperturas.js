/* ============================================================
   APERTURA ESCALONADA
   El juego no se muestra entero desde el primer año. Cada sistema
   espera a que tengas rango suficiente o a que pase un año tope, y
   cuando por fin llega lo hace como escena narrada, no como una
   pestaña que apareció sola en la barra.

   El rango premia a quien juega bien; el año tope garantiza que una
   carrera lenta también vea cosas nuevas. Manda el que llegue primero,
   y nunca se abre más de un sistema por año: el año en que algo nuevo
   entra, eso es el acontecimiento del año.
   ============================================================ */
export const APERTURAS = [
  { id: "cartera", rango: 1, ano: 3,
    guia: { t: "Cartera", x: "Aquí decides qué hace tu dinero mientras tú trabajas.",
      puntos: [
        "La primera barra dice cómo está repartido ahora mismo. La segunda, cómo quieres que quede.",
        "Debajo reparte entre tipos de activo: cada uno trae su retorno esperado y su volatilidad.",
        "Nada se mueve hasta que pulsas Aplicar, y cada movimiento cuesta comisión.",
      ] },
    escena: { id: 9701, min: 0, max: 6, apertura: true,
      t: "Lo que sobra a fin de mes",
      x: "Con el sueldo nuevo aparece una pregunta que antes no tenías. Hasta ahora el dinero entraba y salía el mismo mes; de aquí en adelante hay una parte que no tiene tarea asignada, y dejarla quieta también es una decisión.",
      o: [
        { t: "Repartirlo entre varios tipos de activo", abre: "cartera",
          d: { cri: 4, msg: "Abres tu primera cartera. Arriba aparece la sección Cartera: ahí decides qué parte de tu dinero trabaja y en qué. Nada se aplica hasta que confirmas." } },
        { t: "Empezar prudente, casi todo en efectivo", abre: "cartera",
          d: { cri: 2, ene: 3, msg: "Prefieres mojarte los pies antes de nadar. La cartera queda abierta en conservador y puedes mover los pesos cuando quieras." } },
      ] } },
  { id: "vida", rango: 1, ano: 4,
    guia: { t: "Vida", x: "Lo que te cuesta vivir como vives, y cuánto necesitas para no depender del sueldo.",
      puntos: [
        "El índice de tren de vida sube con lo que compras. La meta sube con él.",
        "Necesitas 25 veces tu gasto anual para que el patrimonio te mantenga sin trabajar.",
        "Los caprichos suben el índice; algunos además rentan algo cada año.",
      ] },
    escena: { id: 9702, min: 0, max: 6, apertura: true,
      t: "La vida que estás pagando",
      x: "Un sábado cualquiera haces la cuenta de lo que te cuesta vivir como vives. No es un número dramático, pero es un número: y sube mucho más fácil de lo que baja.",
      o: [
        { t: "Anotarlo y vigilarlo de ahora en adelante", abre: "vida",
          d: { cri: 5, msg: "Se abre la sección Vida: tu tren de vida, lo que lo empuja hacia arriba y cuánto patrimonio necesitas para no depender del sueldo." } },
        { t: "Mirarlo de reojo y seguir", abre: "vida",
          d: { ene: 4, msg: "Cierras la libreta sin sacar conclusiones. La sección Vida queda ahí para cuando quieras volver." } },
      ] } },
  { id: "banco", rango: 2, ano: 6,
    guia: { t: "El banco", x: "Vive dentro de Ficha: cuánto te prestarían, a qué tasa, y cómo pagar lo que debes.",
      puntos: [
        "Pedir prestado no es un error por sí solo: lo es pedirlo para algo que no rinde más que la tasa.",
        "Mientras la deuda cueste más que tu cartera, pagarla es la mejor inversión que tienes, y sin riesgo.",
        "Quebrar borra la deuda y con ella todo lo demás. Y nadie te presta durante años.",
      ] },
    escena: { id: 9703, min: 0, max: 6, apertura: true,
      t: "El banco te empieza a mirar",
      x: "Te llega la carta que le llega a todo el que ya gana lo suficiente: una línea de crédito preaprobada, redactada en tono de felicitación. No te están premiando, te están vendiendo.",
      o: [
        { t: "Entender qué te ofrecen antes de necesitarlo", abre: "banco",
          d: { cri: 6, msg: "Lees la letra pequeña sin firmar nada. En Ficha se abre El banco: cuánto te prestarían, a qué tasa, y cómo pagar lo que debas." } },
        { t: "Guardar la carta y no pensarlo hoy", abre: "banco",
          d: { ene: 2, msg: "La carta va al cajón. La sección del banco queda disponible en Ficha el día que la necesites." } },
      ] } },
  { id: "inmuebles", rango: 3, ano: 9,
    guia: { t: "Inmuebles", x: "Ladrillos que pagan algo cada año, no solo que suben de precio.",
      puntos: [
        "Cada uno tiene renta, mantenimiento y una salida lenta: son tres números, no uno.",
        "La renta y el mantenimiento aparecen los dos en el informe de cierre del año.",
        "Un inmueble no se vende cuando tú quieres. Eso es iliquidez, y se paga.",
      ] },
    escena: { id: 9704, min: 0, max: 6, apertura: true,
      t: "Un ladrillo con tu nombre",
      x: "Un cliente vende y te lo cuenta antes de sacarlo al mercado. No es una oportunidad irrepetible, pero es la primera vez que un inmueble te queda a distancia de la mano.",
      o: [
        { t: "Aprender a mirar inmuebles como se miran los activos", abre: "inmuebles",
          d: { cri: 5, mod: 3, msg: "Se abre la sección Inmuebles. Un ladrillo tiene renta, gastos y una salida lenta: son tres números, no uno." } },
        { t: "Escuchar por educación y no comprometerte", abre: "inmuebles",
          d: { red: 3, msg: "Agradeces sin cerrar la puerta. La sección Inmuebles queda abierta para cuando los números te cuadren." } },
      ] } },
  { id: "mejoras", rango: 3, ano: 11,
    guia: { t: "Mejoras", x: "Cosas que se compran una vez y rinden todos los años que te quedan.",
      puntos: [
        "No dan dinero directo: dan ventaja en los minijuegos y en tus atributos.",
        "Cuanto antes las compras, más años tienen para pagarse solas.",
      ] },
    escena: { id: 9705, min: 0, max: 6, apertura: true,
      t: "Dónde gastar el poco tiempo que queda",
      x: "Ya no puedes trabajar más horas: las horas se acabaron. Lo único que queda por mejorar es con qué las llenas.",
      o: [
        { t: "Invertir en ti de forma deliberada", abre: "mejoras",
          d: { cri: 4, mod: 3, msg: "Se abre la sección Mejoras: cosas que se compran una vez y rinden todos los años que quedan." } },
        { t: "Seguir con lo que ya te funciona", abre: "mejoras",
          d: { ene: 5, msg: "No cambias nada por ahora. La sección Mejoras queda arriba para cuando lo consideres." } },
      ] } },
  { id: "fondo", rango: 4, ano: 14,
    guia: { t: "Fondo", x: "Dinero ajeno, decisiones tuyas. El otro lado de la mesa.",
      puntos: [
        "Tienes capacidad limitada: cada ticket que tomas es uno que ya no podrás tomar después.",
        "Las posiciones tardan años en salir, y salen solas cuando les toca.",
        "Aquí el criterio no lo califica un examen: lo califican los resultados.",
      ] },
    escena: { id: 9706, min: 0, max: 6, apertura: true,
      t: "Del otro lado de la mesa",
      x: "Toda tu carrera has ejecutado lo que otros decidieron invertir. Te invitan a levantar un vehículo propio: decidir tú, con dinero ajeno y responsabilidad tuya.",
      o: [
        { t: "Aceptar y montar el vehículo", abre: "fondo",
          d: { car: 5, rep: 3, cri: 3, msg: "Se abre la sección Fondo. Aquí el criterio no lo califica un examen: lo califican los resultados de otros." } },
        { t: "Escuchar la propuesta sin firmar todavía", abre: "fondo",
          d: { cri: 2, msg: "Pides tiempo para pensarlo. La sección Fondo queda disponible cuando decidas entrar." } },
      ] } },
];

/* Lo que compras a veces trae cola. No es premio ni castigo garantizado:
   es que un bien real puede salirte bueno o salirte rana, y eso no se
   sabe al firmar. pct mueve el valor del bien; cash es fraccion de lo
   que pagaste. */
export const SORPRESAS_BUENAS = [
  { pct: 0.18, msg: "Lo tasan bastante por encima de lo que pagaste: compraste barato sin saberlo." },
  { red: 7, msg: "Por ahí conoces a alguien que te va a servir durante años." },
  { cash: 0.06, msg: "Traía valor dentro que nadie se había parado a mirar." },
  { rep: 6, msg: "Se comenta, y se comenta bien. Tu nombre gana algo con esto." },
];
export const SORPRESAS_MALAS = [
  { pct: -0.16, msg: "Aparecen vicios ocultos que nadie declaró. Vale menos de lo que pagaste." },
  { cash: -0.09, msg: "Lo que parecía un detalle era estructural. Se arregla y se paga." },
  { ene: -9, msg: "Entre papeleo, permisos y llamadas te come medio año." },
  { rep: -5, msg: "Alguien opina en voz alta que te vieron las intenciones. Cuesta un poco de nombre." },
];

export const IDS_APERTURA = APERTURAS.map((a) => a.id);
