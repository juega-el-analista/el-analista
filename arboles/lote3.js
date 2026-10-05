/* Lote 3 de árboles de El Analista: escenas de vida y legendarias.
   Ids 13000-13999. Bloques de 50 por raíz, en el orden del json. */
module.exports = {
  huellas: {
    l3_llevaste_mandato: "Pediste y llevaste el mandato de la década",
    l3_asiento_soberano: "Aceptaste un asiento en un fondo soberano",
    l3_voto_contra: "Votaste solo en contra en el fondo soberano",
    l3_compraste_forzado: "Entraste fuerte en un activo de venta forzada",
    l3_silla: "Aceptaste dirigir la mesa",
    l3_aliado: "Propusiste a otra persona para la silla",
    l3_olfato: "Aprendiste a preguntar quién cobra y por qué hay prisa",
    l3_sin_papeles: "Le prestaste a tu cuñado sin papeles",
    l3_trajiste_gente: "Trajiste amigos a una preventa a cambio de comisión",
    l3_cambiaste_vida: "Cambiaste de vida después del chequeo",
  },

  escenas: [
    /* ======================= 9007 No es la primera vez ======================= */
    { id: 13001, por: "Volviste a salir con alguien", t: "Un fin de semana que no era tuyo",
      x: "Tenían un viaje reservado hace meses. El viernes a las seis te escribe un cliente: necesita la versión final para el lunes.",
      o: [
        { t: "Ir y apagar el teléfono", d: { ene: 6, car: -3, rep: -1, msg: "Te vas. El lunes el cliente tiene su versión, tarde y con un tono que vas a tener que remontar." } },
        { t: "Ir y trabajar desde el hotel", d: { ene: -3, car: 1, cash: -600, msg: "Vas. Ves el mar por la ventana del cuarto, que es donde está la laptop." } },
        { t: "Cancelar el viaje", d: { car: 4, ene: -6, msg: "Cancelas. Del otro lado nadie te reclama nada, que es peor que si te reclamaran.",
          luego: [{ en: 1, azar: [{ p: 55, id: 13006, bueno: false }, { p: 45, id: 13007, bueno: true }] }] } },
      ] },
    { id: 13002, por: "Volviste a salir con alguien", t: "Te presentan a su gente",
      x: "En una cena conoces a sus amigos. Una maneja el dinero de una familia rica y quiere saber a qué te dedicas.",
      o: [
        { t: "Hablar de trabajo toda la noche", d: { red: 5, ene: -2, msg: "Terminas la cena con una tarjeta en el bolsillo y una mirada de reojo desde el otro lado de la mesa." } },
        { t: "Contarlo en dos frases y cambiar de tema", d: { ene: 4, red: 2, msg: "Lo resumes y preguntas por ella. Te escribe la semana siguiente, sin que hayas vendido nada." } },
      ] },
    { id: 13003, por: "Dijiste que no a alguien por trabajo", t: "La persona de las excusas",
      x: "Tus amigos ya no te invitan a nada. Te enteras de los cumpleaños por las fotos del día siguiente.",
      o: [
        { t: "Organizar tú la próxima salida", d: { ene: 5, red: 3, car: -2, cash: -800, msg: "Invitas tú. Llegan casi todos, y uno te dice que pensaba que te habías mudado." } },
        { t: "Asumirlo: este es el año del trabajo", d: { car: 3, ene: -5, msg: "Lo aceptas. El año del trabajo va bien y se parece mucho al anterior." } },
      ] },
    { id: 13004, por: "Te viste con alguien sin prometer nada", t: "Lo que no tenía nombre se terminó",
      x: "Un día deja de escribir. No hay pelea ni explicación, porque nunca hubo nada que explicar.",
      o: [
        { t: "Preguntar qué pasó", d: { ene: -2, cri: 3, msg: "Preguntas. La respuesta es amable, corta y te enseña más de ti que de la otra persona." } },
        { t: "Dejarlo ir sin más", d: { ene: 2, msg: "Lo dejas ir. Un tiempo también era algo, como te dijiste al empezar." } },
      ] },
    { id: 13005, por: "Dijiste que no a alguien por trabajo", t: "Un año sin distracciones se nota", empleado: true,
      x: "Entregaste todo antes de tiempo. Tu jefe te ofrece liderar el proyecto que nadie quiere y que todos van a mirar.",
      o: [
        { t: "Aceptarlo", d: { car: 5, mod: 3, ene: -5, msg: "Lo tomas. Es feo, es tuyo y, si sale, es lo primero que va a aparecer en tu evaluación." } },
        { t: "Aceptarlo a cambio de un aumento", d: { car: 3, cash: 2000, rep: -1, msg: "Pides el aumento antes de decir que sí. Te lo dan, con la cara de quien anota algo." } },
        { t: "Decir que no, ya diste bastante", d: { ene: 4, car: -2, msg: "Dices que no. Te sorprende lo poco que cuesta, después de un año diciendo que sí a todo." } },
      ] },
    { id: 13006, por: "Cancelaste un viaje por un cliente", t: "La cuenta de los planes cancelados",
      x: "Te enseña el calendario del año: de los planes que hicieron, cumpliste la mitad. No levanta la voz. Pregunta qué va a cambiar.",
      o: [
        { t: "Bloquear los fines de semana, de verdad", d: { ene: 6, car: -3, msg: "Pones los sábados en rojo en tu agenda. Los clientes se adaptan más rápido de lo que temías." } },
        { t: "Prometer que el próximo trimestre mejora", d: { ene: -3, rep: -1, msg: "Lo prometes. Lo has dicho antes y los dos lo saben, pero esta noche alcanza." } },
      ] },
    { id: 13007, por: "Cancelaste un viaje por un cliente", t: "El cliente se acordó del favor",
      x: "El cliente de aquel lunes te recomienda a otro. Dice que eres de los que contestan un viernes a las seis.",
      o: [
        { t: "Aceptar el cliente nuevo", d: { car: 4, cash: 1500, ene: -4, msg: "Lo aceptas. Ahora tienes dos clientes que saben que contestas los viernes." } },
        { t: "Aceptarlo, con horario claro desde el principio", d: { car: 2, cash: 1000, cri: 3, msg: "Lo aceptas con reglas. Le cuesta un correo entenderlas y luego las respeta." } },
      ] },

    /* ======================= 9008 La conversación de los planes ======================= */
    { id: 13051, por: "Bajaste tú el ritmo por la relación", t: "Te pasaron por la derecha", empleado: true,
      x: "Alguien que entró contigo ahora es tu jefe directo. Lo saludan todos en el ascensor, y tú también.",
      o: [
        { t: "Pedir una reunión para volver a acelerar", d: { car: 4, ene: -5, msg: "Pides la reunión. Te dicen que se nota tu compromiso, en el tono de quien acaba de notarlo." } },
        { t: "Mirar el tablero y quedarte en paz", d: { ene: 4, car: -2, cri: 2, msg: "Haces las cuentas de lo que ganaste y lo que no. Te sale positivo, aunque no en esa moneda." } },
      ] },
    { id: 13052, por: "Hiciste espacio en tu vida para la relación", t: "La casa por fin funciona",
      x: "Cenas a una hora decente. Lees. Descubres que tus mejores ideas de trabajo llegan cuando no estás trabajando.",
      o: [
        { t: "Usar el tiempo para estudiar algo nuevo", d: { mod: 5, cri: 3, cash: -1000, ene: -1, msg: "Te inscribes en un curso de noche. Lo terminas, que ya es más de lo que hace la mitad de la clase." } },
        { t: "No tocar nada que funcione", d: { ene: 5, rep: 1, msg: "No lo optimizas. Es la primera cosa en años que dejas en paz porque va bien." } },
      ] },
    { id: 13053, por: "Dejaste que tu pareja bajara el ritmo", t: "La factura del ajuste",
      x: "Tu pareja dejó pasar un ascenso por ti. Hoy lo menciona por primera vez, de pasada, en una cena con amigos.",
      o: [
        { t: "Hablarlo esa misma noche", d: { ene: -2, cri: 3, msg: "Lo hablan en el carro de vuelta. No resuelven nada y por primera vez está dicho en voz alta." } },
        { t: "Hacerte el que no oyó", d: { ene: -6, rep: -2, msg: "Lo dejas pasar. Sale otra vez dos semanas después, sin amigos delante y con menos paciencia." } },
        { t: "Proponer que ahora le toque acelerar", d: { car: -4, ene: 4, rep: 2, msg: "Propones cambiar los papeles. Te mira como si no te conociera, y luego dice que sí.",
          luego: [{ en: 2, azar: [{ p: 55, id: 13056, bueno: true }, { p: 45, id: 13057, bueno: false }] }] } },
      ] },
    { id: 13054, por: "Dejaste que tu pareja bajara el ritmo", t: "Tu mejor año, con una silla vacía",
      x: "Cierras el mejor año de tu carrera. En la foto de la celebración del equipo hay una silla vacía a tu lado.",
      o: [
        { t: "Gastar parte de lo ganado en un viaje para los dos", d: { cash: -2000, ene: 7, msg: "Se van una semana. Es lo más parecido a pedir perdón que sabes hacer sin decirlo." } },
        { t: "Invertirlo y seguir a tope", d: { cash: 2500, car: 2, ene: -4, msg: "Lo inviertes. La cartera crece y en casa se habla un poco menos cada mes." } },
      ] },
    { id: 13055, por: "Reorganizaste la vida para que cupiera todo", t: "El calendario de los domingos",
      x: "Cada domingo se sientan veinte minutos a repartir la semana. El sistema aguanta, y hay semanas en que no alcanza.",
      o: [
        { t: "Pagar ayuda en casa", d: { cash: -2500, ene: 6, msg: "Contratan ayuda. El sistema respira y la reunión del domingo dura diez minutos." } },
        { t: "Recortar la vida social", d: { red: -4, ene: 4, msg: "Dicen que no a casi todo lo que no sea trabajo o casa. Funciona, y los amigos lo notan." } },
        { t: "Apretar los dientes y seguir", d: { car: 3, ene: -5, msg: "Siguen igual. El sistema aguanta otro trimestre, que es lo que hacen los sistemas hasta que no." } },
      ] },
    { id: 13056, por: "Le cediste a tu pareja el turno de acelerar", t: "Ahora es tu pareja quien llega tarde",
      x: "Le va bien, mejor de lo que esperaban. Eres tú quien recoge, cocina y pregunta qué tal el día a las diez de la noche.",
      o: [
        { t: "Disfrutar de verle crecer", d: { ene: 5, rep: 2, car: -2, msg: "Lo disfrutas de verdad. Entiendes, tarde, lo que costaba lo que pedías antes." } },
        { t: "Negociar un punto medio para los dos", d: { cri: 3, ene: 2, car: 1, msg: "Lo negocian con el calendario en la mano. Ahora los dos llegan un poco tarde, que es un tipo de justicia." } },
      ] },
    { id: 13057, por: "Le cediste a tu pareja el turno de acelerar", t: "La ventana ya se había cerrado",
      x: "Lo intentó, pero el ascenso que dejó pasar no volvió. Ahora sus colegas son más jóvenes y más baratos.",
      o: [
        { t: "Ayudarle a buscar otra cosa con tus contactos", d: { red: -2, ene: -2, rep: 3, msg: "Haces llamadas. Una funciona. No es lo que tenía, pero es suyo." } },
        { t: "Volver tú al ritmo de antes", d: { car: 4, ene: -5, msg: "Vuelves a acelerar. Nadie lo propone en voz alta: simplemente pasa, como pasó la primera vez." } },
      ] },

    /* ======================= 9023 Empezar otra vez ======================= */
    { id: 13101, por: "Te volviste a casar con las cuentas claras", t: "Las capitulaciones, a prueba",
      x: "Quieres poner parte de tu cartera en un negocio. Tu pareja pregunta, con todo derecho, si eso sale de lo tuyo o de lo de los dos.",
      o: [
        { t: "Hacerlo solo con lo tuyo, como dice el papel", d: { cash: -2000, cri: 3, msg: "Lo haces con lo tuyo. El papel sirve justo para eso: para que esta conversación dure cinco minutos." } },
        { t: "Proponerle entrar en el negocio contigo", d: { cash: -1000, ene: 3, red: 2, msg: "Se lo propones. Lo piensa una semana y dice que sí, con sus propias condiciones por escrito.",
          luego: [{ en: 2, azar: [{ p: 50, id: 13106, bueno: true }, { p: 50, id: 13107, bueno: false }], s: "cri" }] } },
        { t: "No hacerlo: no vale la discusión", d: { ene: 2, car: -1, msg: "Lo dejas pasar. El negocio sale bien sin ti y te enteras por otro." } },
      ] },
    { id: 13102, por: "Volviste a empezar con alguien", t: "La familia que viene con la pareja",
      x: "Trae hijos ya grandes que te miran como se mira a un auditor. Uno te pide, de mala gana, un consejo de dinero.",
      o: [
        { t: "Dárselo en serio, sin sermón", d: { cri: 2, ene: 4, rep: 2, msg: "Le explicas lo que sabes sin hablar de ti. Vuelve a preguntar un mes después, que es la mejor señal posible." } },
        { t: "Recomendarle a un profesional", d: { ene: 1, msg: "Le pasas un contacto. Es correcto, es neutral y no te acerca ni un metro." } },
      ] },
    { id: 13103, por: "Fuiste despacio con alguien, sin etiquetas", t: "Despacio también llega",
      x: "Cada uno en su casa, cada uno con su cuenta. Funciona tan bien que nadie quiere tocarlo, y a veces eso preocupa.",
      o: [
        { t: "Proponer algo más", d: { ene: 3, cri: 1, msg: "Lo propones. Te dice que lo va a pensar, con una sonrisa que te deja tranquilo." } },
        { t: "Dejarlo así, que funciona", d: { ene: 4, cash: 500, msg: "No tocas nada. Dos casas, dos cuentas y la mejor relación que has tenido en años." } },
      ] },
    { id: 13104, por: "Elegiste estar solo", t: "Los domingos largos",
      x: "Tienes tiempo, dinero y la casa en silencio. Un amigo te propone entrenar los sábados a un equipo juvenil de su barrio.",
      o: [
        { t: "Aceptar el equipo", d: { ene: 6, red: 3, rep: 2, msg: "Aceptas. Pierdes casi todos los partidos y ganas los sábados." } },
        { t: "Usar el tiempo en un curso serio", d: { mod: 4, cri: 2, cash: -1000, msg: "Te inscribes en algo difícil. Eres el mayor de la clase y el único que hace las lecturas." } },
        { t: "Llenarlo de trabajo", d: { car: 3, ene: -4, msg: "Lo llenas de trabajo. Los domingos dejan de ser largos y empiezan a ser lunes." } },
      ] },
    { id: 13105, por: "Elegiste estar solo", t: "Nadie te frena",
      x: "Nadie te pregunta antes de mover la cartera. Esta vez vendiste todo el día del pánico y no hubo quien te dijera espera.",
      o: [
        { t: "Asumir la pérdida y escribirte reglas", d: { cri: 5, cash: -1000, msg: "Escribes tres reglas en una hoja y la pegas junto a la pantalla. Te salió caro el papel." } },
        { t: "Volver a comprar ya, más caro", d: { cash: -2000, cri: -2, msg: "Recompras cuando ya subió. Vendiste barato y compraste caro, el clásico, y sin testigos." } },
      ] },
    { id: 13106, por: "Entraste en un negocio con tu pareja", t: "El negocio en común arranca",
      x: "El negocio da sus primeras ganancias. Las reuniones de socios son en la cocina y terminan antes de lo que temías.",
      o: [
        { t: "Reinvertir todo", d: { cri: 3, ene: 2, msg: "Reinvierten. En un par de años esto puede ser algo más que un buen tema de sobremesa." } },
        { t: "Repartir y celebrarlo", d: { cash: 2000, ene: 4, msg: "Reparten. Celebrarlo juntos también es una forma de retorno, y no paga impuestos." } },
      ] },
    { id: 13107, por: "Entraste en un negocio con tu pareja", t: "Números en la cocina",
      x: "El negocio va regular y cada cena termina en una hoja de cálculo. Las capitulaciones no previeron esto.",
      o: [
        { t: "Separar el negocio de la casa, por escrito", d: { cri: 4, ene: 2, cash: -800, msg: "Contratan a alguien que lleve las cuentas y prohíben el tema después de las ocho. Funciona casi siempre." } },
        { t: "Salirte tú del negocio", d: { cash: -1500, ene: 4, msg: "Te sales. Pierdes algo de dinero y recuperas las cenas." } },
      ] },

    /* ======================= 9024 La universidad de tus hijos ======================= */
    { id: 13151, por: "Pagaste la universidad de tu hijo, entera o a medias", t: "Quiere cambiarse de carrera",
      x: "Le falta poco para terminar y descubre que lo suyo es otra cosa. Cambiar cuesta dos años más de matrícula.",
      o: [
        { t: "Pagar los años extra", d: { cash: -6000, ene: 3, rep: 1, msg: "Los pagas. Mejor dos años más ahora que cuarenta en lo que no era." } },
        { t: "Que los años extra los pague él", d: { cri: 3, ene: -2, msg: "El cambio corre por su cuenta. Lo piensa, lo hace y se toma la carrera nueva mucho más en serio." } },
        { t: "Convencerlo de terminar lo que empezó", d: { ene: -3, car: 1, msg: "Lo convences. Termina con notas correctas y una cara que vas a recordar en cada cena." } },
      ] },
    { id: 13152, por: "Resolviste la universidad de tu hijo", t: "Se gradúa",
      x: "Lo ves cruzar el escenario. Ya tiene oferta de trabajo y te pregunta qué hacer con su primer sueldo.",
      o: [
        { t: "Enseñarle a invertir desde el primer mes", d: { cri: 3, ene: 5, msg: "Le explicas el interés compuesto en una servilleta. Te la pide para guardarla." } },
        { t: "Decirle que primero arme un colchón", d: { cri: 2, ene: 3, msg: "Le dices que guarde tres meses de gastos antes de nada. Te hace caso, que es lo raro." } },
        { t: "Decirle que lo disfrute un poco", d: { ene: 5, rep: 1, msg: "Le dices que se dé un gusto. Te invita a cenar con su primer sueldo y pide lo más barato del menú." } },
      ] },
    { id: 13153, por: "Dejaste que tu hijo pagara la carrera con crédito", t: "La cuota le pesa",
      x: "Se gradúa en meses y ya hizo las cuentas: el sueldo que le ofrecen es menor que el del folleto y la cuota se llevará un tercio.",
      o: [
        { t: "Pagarle una parte de la deuda", d: { cash: -5000, ene: 4, rep: 2, msg: "Pagas una parte. La conversación de Navidad mejora bastante este año.",
          luego: [{ en: 2, azar: [{ p: 55, id: 13156, bueno: true }, { p: 45, id: 13157, bueno: false }] }] } },
        { t: "Ayudarle a refinanciar", d: { cri: 3, cash: -500, msg: "Le ayudas a refinanciar a una tasa menor. No es dinero, es saber, y te lo agradece más tarde que pronto." } },
        { t: "No intervenir, es su deuda", d: { cri: 2, ene: -4, rep: -1, msg: "No intervienes. La paga despacio y aprende justo lo que querías que aprendiera, sin agradecértelo." } },
      ] },
    { id: 13154, por: "Le pagaste la mitad de la universidad a tu hijo", t: "Trabaja y estudia, y se nota",
      x: "El trabajo de medio tiempo le está costando notas. También le enseñó a negociar con su jefe un horario mejor.",
      o: [
        { t: "Subir tu parte para que estudie tranquilo", d: { cash: -4000, ene: 2, msg: "Pones más. Sus notas suben y su capacidad de negociar se queda donde estaba." } },
        { t: "Dejarlo como está", d: { cri: 3, ene: 1, msg: "No cambias nada. Se gradúa con notas medias y una referencia laboral que vale más que ellas." } },
      ] },
    { id: 13155, por: "Pagaste toda la universidad de tu hijo", t: "La cuenta del retiro no cuadra",
      x: "Haces los números de tu jubilación y faltan justo los años que pusiste en la matrícula. Tu asesor lo dice con mucho tacto.",
      o: [
        { t: "Trabajar unos años más", d: { car: 3, ene: -5, cash: 2000, msg: "Decides trabajar más años. Lo dices como quien firma algo, y en el fondo lo es." } },
        { t: "Recortar gastos desde ya", d: { cash: 2500, ene: -3, cri: 2, msg: "Recortas. La casa se vuelve más austera y la hoja de cálculo, más amable." } },
        { t: "Buscar más rendimiento en la cartera", d: { cash: 1500, cri: -3, msg: "Subes el riesgo para alcanzar. Es la decisión de la que más se arrepiente quien la toma tarde." } },
      ] },
    { id: 13156, por: "Le pagaste a tu hijo parte de su deuda", t: "Te devuelve el favor",
      x: "Ahora le va bien. Cada mes te transfiere un poco de lo que le diste, aunque le dices que no hace falta.",
      o: [
        { t: "Aceptarlo", d: { cash: 3000, ene: 3, msg: "Lo aceptas. No es por el dinero: es por lo que dice de él que lo haga." } },
        { t: "Pedirle que lo invierta a su nombre", d: { cri: 3, ene: 4, msg: "Le pides que lo invierta para él. Te manda el estado de cuenta cada trimestre, sin que se lo pidas." } },
      ] },
    { id: 13157, por: "Le pagaste a tu hijo parte de su deuda", t: "Se acostumbró",
      x: "Vuelve a pedirte ayuda, esta vez para un carro. Lo dice con la naturalidad de quien ya sabe la respuesta.",
      o: [
        { t: "Decirle que no, con cariño", d: { ene: -3, cri: 4, msg: "Le dices que no. Se enoja una semana y se compra un carro más barato." } },
        { t: "Darle la inicial y nada más", d: { cash: -2000, ene: 2, msg: "Le das la inicial. La próxima vez va a pedir la inicial de otra cosa." } },
      ] },

    /* ======================= 9025 El chequeo ======================= */
    { id: 13201, por: "Cambiaste de vida después del chequeo", t: "El médico casi sonríe",
      x: "Los números del control salen normales. El médico no dice 'todavía' ni una sola vez, y tú lo notas.",
      o: [
        { t: "Mantener la rutina tal cual", d: { ene: 5, cri: 1, msg: "No cambias nada. Lo aburrido, otra vez, es lo que funciona." } },
        { t: "Apuntarte a una carrera larga", d: { ene: 3, red: 3, cash: -800, msg: "Te inscribes en una carrera. La terminas en un tiempo mediocre y con una medalla que cuelgas en la oficina." } },
        { t: "Relajarte un poco, ya estás bien", d: { ene: -2, cash: 300, msg: "Aflojas. El cuerpo tarda en notarlo, que es exactamente como empezó la primera vez." } },
      ] },
    { id: 13202, por: "Cambiaste de vida después del chequeo", t: "La rutina contra el cierre",
      x: "Tres semanas de cierre seguidas. El gimnasio te manda un correo preguntando si todo está bien.",
      o: [
        { t: "Sostener la rutina aunque cueste horas", d: { ene: 4, car: -3, msg: "Sales a las siete para entrenar. Alguien lo comenta. Tu tensión, por su parte, no comenta nada." } },
        { t: "Dejarla solo por este mes", d: { ene: -5, car: 3, msg: "La dejas por el cierre. 'Solo este mes' es la frase más cara de la medicina." } },
        { t: "Entrenar a las cinco de la mañana", d: { ene: -1, car: 1, cri: 2, msg: "Entrenas de madrugada. Estás cansado y en forma, que no se contradicen tanto como pensabas." } },
      ] },
    { id: 13203, por: "Tomaste la pastilla y seguiste igual", t: "Un mareo en la fila de migración",
      x: "Te mareas haciendo fila en el aeropuerto. Nada grave, dicen en la clínica. Y otra vez la palabra: todavía.",
      o: [
        { t: "Ahora sí, cambiar de vida", d: { ene: 8, car: -4, cash: -1500, deja: "l3_cambiaste_vida", msg: "Ahora sí. Llegas por el camino largo al mismo sitio al que te mandaron hace años." } },
        { t: "Subir la dosis y seguir", d: { ene: -6, cash: -500, msg: "Te suben la dosis. Sigues igual, ahora con dos pastillas.",
          luego: [{ en: 2, azar: [{ p: 45, id: 13206, bueno: false }, { p: 55, id: 13207 }], s: "ene" }] } },
        { t: "Tomarte un mes completo", d: { ene: 10, car: -5, cash: -2000, msg: "Te tomas un mes. El mundo financiero sigue girando sin ti, lo cual es un alivio y una ofensa." } },
      ] },
    { id: 13204, por: "Tomaste la pastilla y seguiste igual", t: "La pastilla funciona, de momento",
      x: "La tensión baja. Tú no cambias nada y el cuerpo, por ahora, te lo permite.",
      o: [
        { t: "Aprovechar y apretar más", d: { car: 4, ene: -4, msg: "Aprietas. Rindes más que nunca con un cuerpo que lleva la cuenta." } },
        { t: "Hacer al menos lo mínimo: dormir", d: { ene: 4, car: -1, msg: "Empiezas por dormir siete horas. No es cambiar de vida, pero es el primer ladrillo." } },
      ] },
    { id: 13205, por: "Cambiaste de vida después del chequeo", t: "Te volviste el de la salud",
      x: "Medio equipo te pregunta qué haces. Un cliente te invita a su grupo de ciclismo de los sábados.",
      o: [
        { t: "Unirte al grupo del cliente", d: { red: 6, ene: 2, cash: -1000, msg: "Te compras una bicicleta que cuesta como un carro usado. En la tercera salida te presenta a su socio." } },
        { t: "Seguir a tu ritmo, solo", d: { ene: 4, cri: 1, msg: "Sigues por tu cuenta. Tu salud no necesita público." } },
      ] },
    { id: 13206, por: "Seguiste igual, ahora con más pastillas", t: "Esta vez fue en la oficina",
      x: "Te desplomas en una reunión, delante de todos. Es un aviso serio, y ahora lo sabe medio mercado.",
      o: [
        { t: "Parar de verdad", d: { ene: 12, car: -6, cash: -3000, deja: "l3_cambiaste_vida", msg: "Paras tres meses. Vuelves más lento y más vivo, en ese orden." } },
        { t: "Volver a la semana siguiente", d: { ene: -8, rep: -3, car: 1, msg: "Vuelves en una semana. Todos te miran como a un balance con una advertencia del auditor." } },
      ] },
    { id: 13207, por: "Seguiste igual, ahora con más pastillas", t: "El cuerpo aguanta un año más",
      x: "El control sale regular. El médico ya no dice 'todavía': dice 'por ahora', que es peor.",
      o: [
        { t: "Hacerle caso esta vez", d: { ene: 6, car: -2, cash: -800, msg: "Le haces caso, por fin. No es heroico: es tarde, pero es." } },
        { t: "Seguir igual, que viene la temporada fuerte", d: { ene: -5, car: 3, msg: "Sigues. La temporada fuerte siempre viene, y el cuerpo también tiene la suya." } },
      ] },

    /* ======================= 9030 Rendimiento garantizado ======================= */
    { id: 13251, por: "Le preguntaste al asesor cuánto cobraba", t: "El asesor vuelve, más honesto",
      x: "Te llama con un fondo nuevo. Esta vez abre la reunión diciendo su comisión, como quien muestra las manos.",
      o: [
        { t: "Escucharlo, ahora que habla claro", d: { cri: 2, red: 2, msg: "Lo escuchas. El producto sigue siendo caro, pero al menos ya sabes cuánto." } },
        { t: "Proponerle cobrar una tarifa fija", d: { cri: 4, red: 1, msg: "Le propones una tarifa fija en vez de comisión. Acepta, con la cara de quien pierde un cliente cómodo." } },
        { t: "Agradecer y colgar", d: { ene: 2, cri: 1, msg: "Le agradeces la franqueza y cuelgas. La franqueza no era el problema." } },
      ] },
    { id: 13252, por: "Te cruzaste con un producto «garantizado»", t: "Un amigo te pregunta si entra",
      x: "Un amigo te reenvía la misma propuesta, de la misma oficina bonita. Quiere saber qué opinas antes de firmar.",
      o: [
        { t: "Explicarle la comisión y la garantía", d: { red: 3, rep: 2, cri: 1, deja: "l3_olfato", msg: "Le explicas dónde está el costo. No firma, y te invita a almorzar para que le expliques el resto." } },
        { t: "Decirle que haga lo que le parezca", d: { red: -1, ene: 1, msg: "No te metes. Firma, y dentro de un año va a preguntarte por qué no le dijiste nada." } },
      ] },
    { id: 13253, por: "Entraste al producto «garantizado» y salió caro", t: "Lo que cuesta salir",
      x: "Quieres salir antes del vencimiento. La comisión de salida es más alta que todo lo que te ha rendido.",
      o: [
        { t: "Aguantar hasta el vencimiento", d: { ene: -2, cri: 2, msg: "Te quedas. La garantía se cumplirá en una década: lo que prometieron, nunca lo que entendiste." } },
        { t: "Salir y pagar la comisión", d: { cash: -2500, cri: 4, msg: "Sales y pagas. Duele una vez, en vez de doler un poco cada trimestre durante diez años." } },
        { t: "Reclamar ante el regulador", d: { cash: -500, ene: -3, rep: 1, msg: "Presentas el reclamo con todos los papeles. El regulador abre un expediente.",
          luego: [{ en: 1, azar: [{ p: 40, id: 13256, bueno: true }, { p: 60, id: 13257, bueno: false }], s: "cri" }] } },
      ] },
    { id: 13254, por: "Leíste a tiempo la letra pequeña del producto", t: "Ahora lees todo hasta el final",
      x: "Desde aquel producto lees los contratos enteros. En uno de un cliente encuentras una cláusula que nadie había visto.",
      o: [
        { t: "Señalarla en la reunión", d: { rep: 5, cri: 2, red: -1, msg: "La señalas. El abogado del cliente se pone rojo y el cliente te anota en una lista mejor." } },
        { t: "Decírselo al cliente en privado", d: { red: 4, cri: 2, msg: "Se lo dices aparte. Nadie queda mal en la reunión y el cliente sabe a quién llamar." } },
      ] },
    { id: 13256, por: "Reclamaste ante el regulador", t: "El regulador te da la razón",
      x: "No eras el único. El regulador obliga a devolver parte de las comisiones a todos los que reclamaron.",
      o: [
        { t: "Cobrar y cerrar el capítulo", d: { cash: 2500, cri: 2, msg: "Cobras. No es todo, pero es más de lo que suele devolver una oficina bonita." } },
        { t: "Contar el caso para que otros reclamen", d: { cash: 2000, rep: 4, red: 2, deja: "l3_olfato", msg: "Cobras y lo cuentas. Te escriben desconocidos para agradecerte, y uno pregunta si das asesorías." } },
      ] },
    { id: 13257, por: "Reclamaste ante el regulador", t: "El reclamo duerme en una ventanilla",
      x: "Pasan los meses y el expediente sigue abierto. Te piden un papel que ya mandaste dos veces.",
      o: [
        { t: "Mandarlo una tercera vez", d: { ene: -3, cri: 1, msg: "Lo mandas otra vez. La burocracia también es un producto con comisión de salida." } },
        { t: "Dejarlo y quedarte con la lección", d: { ene: 2, cri: 3, msg: "Lo dejas. Te queda lo que queda de estos casos: no volver a firmar sin preguntar." } },
      ] },

    /* ======================= 9031 Un negocio con un familiar ======================= */
    { id: 13301, por: "Le prestaste dinero a tu cuñado", t: "Tu cuñado vuelve con otro negocio",
      x: "El primer negocio ya es historia, para bien o para mal. Tiene otro, más grande, y te lo cuenta como si fuera la primera vez.",
      o: [
        { t: "Prestar otra vez, con contrato", d: { cash: -3000, cri: 2, msg: "Prestas con papeles, como debió ser siempre. Firma sin leer, que también dice algo." } },
        { t: "Entrar como socio en vez de prestar", d: { cash: -4000, red: 2, msg: "Pones dinero a cambio de una parte del negocio. Ahora no te debe: te reporta.",
          luego: [{ en: 2, azar: [{ p: 45, id: 13306, bueno: true }, { p: 55, id: 13307, bueno: false }], s: "cri" }] } },
        { t: "Esta vez decir que no", d: { red: -3, cri: 3, msg: "Dices que no. Lo entiende mejor de lo que esperabas, y peor de lo que dice." } },
      ] },
    { id: 13302, por: "Le prestaste a tu cuñado sin papeles", t: "El préstamo sale en la cena",
      x: "En una cena familiar alguien menciona el préstamo. Nadie recuerda los mismos términos y cada versión favorece a quien la cuenta.",
      o: [
        { t: "Aclararlo con calma, delante de todos", d: { ene: -2, red: 2, cri: 2, msg: "Lo aclaras sin subir la voz. Es la conversación que no tuvieron cuando no había papeles." } },
        { t: "Cambiar de tema", d: { ene: -3, msg: "Cambias de tema. El tema vuelve en el postre, que es donde vuelven los temas." } },
        { t: "Mandar al día siguiente lo acordado, por escrito", d: { red: -4, cri: 4, msg: "Mandas un mensaje con lo que se acordó. Tu cuñado lo lee y no contesta, lo cual es una respuesta." } },
      ] },
    { id: 13303, por: "No le prestaste a tu cuñado, pero le ayudaste", t: "Tu ayuda sí sirvió",
      x: "Las horas que pasaste con su plan de negocio le consiguieron un crédito en el banco. Te invita a la inauguración.",
      o: [
        { t: "Ir y quedarte hasta el final", d: { red: 4, ene: 3, msg: "Vas. Te presenta como 'el que me ayudó con los números', que suena mejor que 'el que me prestó'." } },
        { t: "Ofrecerle revisar sus cuentas cada trimestre", d: { red: 3, cri: 2, ene: -2, msg: "Le ofreces revisar los números. Acepta, y descubres que esto te gusta más que prestar." } },
      ] },
    { id: 13304, por: "No le prestaste a tu cuñado", t: "Lo consiguió en otra parte",
      x: "Consiguió el dinero con un prestamista de los que no mandan cartas. Ahora te llama de noche.",
      o: [
        { t: "Pagarle la deuda tú", d: { cash: -4000, red: 3, ene: -3, msg: "Pagas. Le dices que es un préstamo con papeles, y por primera vez es él quien insiste en firmar." } },
        { t: "Pagarle un abogado para reestructurarla", d: { cash: -1200, cri: 3, red: 1, msg: "Pagas el abogado y no la deuda. Lento, legal y más barato que lo otro, en todos los sentidos." } },
        { t: "No meterte", d: { red: -5, ene: -2, msg: "No te metes. La familia toma nota, y la familia tiene buena memoria." } },
      ] },
    { id: 13305, por: "Le prestaste dinero a tu cuñado", t: "Ya todos saben que prestas",
      x: "Un primo lejano te escribe con una idea y una cifra. La noticia de que prestas viajó más rápido que la de cómo.",
      o: [
        { t: "Mismo trato: contrato, plazo y garantía", d: { cri: 3, red: -1, msg: "Le mandas las condiciones. No vuelve a escribir, y te ahorras una conversación difícil." } },
        { t: "Decir que ya no prestas", d: { red: -2, ene: 2, msg: "Dices que se acabó. Corre la voz otra vez, ahora en sentido contrario." } },
      ] },
    { id: 13306, por: "Entraste de socio en el negocio de tu cuñado", t: "Socio de tu cuñado",
      x: "El negocio da ganancias. Tu cuñado te manda tu parte cada trimestre con una foto del local lleno.",
      o: [
        { t: "Reinvertir tu parte en el negocio", d: { cri: 2, red: 3, msg: "Reinviertes. El local abre una segunda caja y tu cuñado te llama socio delante de la familia." } },
        { t: "Cobrar y diversificar", d: { cash: 3500, cri: 3, msg: "Cobras y lo mueves a otra parte. Querer a la familia no obliga a concentrar la cartera en ella." } },
      ] },
    { id: 13307, por: "Entraste de socio en el negocio de tu cuñado", t: "Las cuentas no las lleva nadie",
      x: "Pides los números del trimestre y te mandan la foto de un cuaderno. Las ventas están; las ganancias, quién sabe.",
      o: [
        { t: "Exigir un contador", d: { cash: -800, cri: 3, red: -2, msg: "Pagas un contador. Aparecen las ganancias, y también un par de gastos personales que nadie explica." } },
        { t: "Vender tu parte y salir", d: { cash: -1500, ene: 3, msg: "Vendes tu parte con pérdida. Recuperas la paz y una regla nueva para la familia." } },
      ] },

    /* ======================= 9032 Te clonaron la identidad ======================= */
    { id: 13351, por: "Denunciaste el robo de identidad desde el día uno", t: "Tu historial está limpio cuando hace falta",
      x: "Necesitas una línea de crédito para una oportunidad que no espera. Te la aprueban en días, sin preguntas raras.",
      o: [
        { t: "Usarla para la oportunidad", d: { cash: 2500, cri: 1, car: 1, msg: "La usas y sale bien. Lo que pagaste al abogado lo recuperas aquí, sin que nadie lo sepa." } },
        { t: "Tenerla aprobada y no usarla", d: { cri: 3, ene: 1, msg: "No la usas. Saber que está ahí ya cambia cómo negocias." } },
      ] },
    { id: 13352, por: "Te clonaron la identidad", t: "Aparece un tercer crédito",
      x: "Los mismos que usaron tu nombre lo vuelven a hacer, esta vez con una tarjeta en otro banco.",
      o: [
        { t: "Congelar tu historial en la central de riesgo", d: { cri: 4, cash: -300, ene: -1, msg: "Bloqueas tu historial para que nadie abra nada a tu nombre. Debiste hacerlo la primera vez." } },
        { t: "Volver a llamar al banco", d: { ene: -6, cash: -800, msg: "Llamas otra vez. Te atiende otra persona que te pide otra vez el mismo número de caso." } },
        { t: "Abogado, esta vez sí", d: { cash: -1500, rep: 1, cri: 2, msg: "Llamas al abogado. Lo resuelve en semanas y te deja una lista de cosas que debiste hacer antes." } },
      ] },
    { id: 13353, por: "Gestionaste por teléfono el robo de identidad", t: "La mancha sigue ahí",
      x: "Te niegan una tarjeta de crédito porque la central de riesgo todavía muestra uno de los préstamos falsos.",
      o: [
        { t: "Contratar ahora el abogado", d: { cash: -1800, cri: 2, rep: 1, msg: "Contratas al abogado que te ibas a ahorrar. Lo resuelve en un mes y no dice nada, que es elegante." } },
        { t: "Escribir tú a la central de riesgo", d: { ene: -3, cri: 2, msg: "Mandas la carta con todos los papeles. Te responden que la recibieron.",
          luego: [{ en: 1, azar: [{ p: 50, id: 13355, bueno: true }, { p: 50, id: 13356, bueno: false }], s: "cri" }] } },
      ] },
    { id: 13354, por: "Te clonaron la identidad", t: "Un colega pasa por lo mismo",
      x: "Un colega descubre créditos a su nombre y te pide que le cuentes qué hiciste tú. Está pálido.",
      o: [
        { t: "Guiarlo paso a paso", d: { red: 4, ene: -2, rep: 1, msg: "Le haces la lista y lo acompañas a la primera cita. Te debe una, y lo sabe." } },
        { t: "Pasarle tu abogado", d: { red: 2, msg: "Le pasas el contacto. Es la mitad de la ayuda con la cuarta parte del tiempo." } },
      ] },
    { id: 13355, por: "Le escribiste a la central de riesgo", t: "La central corrige",
      x: "Llega una carta: el registro falso fue eliminado. Tardó, pero tu historial queda limpio.",
      o: [
        { t: "Guardar la carta en un lugar seguro", d: { cri: 2, ene: 2, msg: "La guardas con los demás papeles. Algún día alguien te la va a pedir." } },
        { t: "Pedir la tarjeta otra vez", d: { cash: 500, cri: 1, msg: "La pides otra vez y te la dan. Nadie menciona lo anterior, y tú tampoco." } },
      ] },
    { id: 13356, por: "Le escribiste a la central de riesgo", t: "Te responden con un formulario",
      x: "La respuesta es un formulario nuevo que pide los mismos papeles. La mancha sigue ahí, y la tarjeta también sigue sin aprobarse.",
      o: [
        { t: "Rendirte y pagar el abogado", d: { cash: -2000, cri: 2, msg: "Pagas al abogado. El ahorro de entonces ya cuesta el doble de lo que ahorraste." } },
        { t: "Llenar el formulario otra vez", d: { ene: -4, msg: "Lo llenas. Ya te sabes de memoria tu número de caso." } },
      ] },

    /* ======================= 9033 La oportunidad que solo dura hoy ======================= */
    { id: 13401, por: "No entraste a la oportunidad que caducaba", t: "El grupo cerrado se cae",
      x: "Sale en las noticias: era una pirámide que pagaba a los primeros con el dinero de los últimos. Los de las capturas ya no publican.",
      o: [
        { t: "Contárselo a quien te lo había pasado", d: { rep: 2, red: 1, cri: 1, msg: "Se lo cuentas sin decir 'te lo dije'. Se nota igual." } },
        { t: "No decir nada", d: { cri: 1, ene: 1, msg: "No dices nada. Tener razón en silencio paga poco y no cuesta amigos." } },
      ] },
    { id: 13402, por: "Te cruzaste con una oportunidad que caducaba", t: "Otra ventana, otro contador en rojo",
      x: "Otro grupo, otra preventa, otras cuarenta y ocho horas. Esta vez te la recomienda alguien a quien respetas.",
      o: [
        { t: "No entrar", d: { cri: 3, msg: "No entras. Respetar a alguien no es lo mismo que respetar su producto." } },
        { t: "Entrar con poco", d: { cash: -1500, msg: "Entras con poco, por respeto y por curiosidad, que son las dos peores razones.",
          luego: [{ en: 1, azar: [{ p: 35, id: 13405, bueno: true }, { p: 65, id: 13406, bueno: false }], s: "cri" }] } },
        { t: "Preguntarle cuánto puso de su bolsillo", d: { cri: 4, red: -1, deja: "l3_olfato", msg: "Le preguntas cuánto puso. La respuesta es nada: le pagan por recomendarlo." } },
      ] },
    { id: 13403, por: "Entraste a la preventa y saliste ganando", t: "Te ofrecen comisión por traer gente",
      x: "Como saliste ganando, el grupo te ofrece una comisión por cada persona que traigas. Solo necesitan tu enlace.",
      o: [
        { t: "Rechazarlo", d: { cri: 4, rep: 1, msg: "Dices que no. Entiendes, tarde, de dónde salía tu ganancia." } },
        { t: "Traer a dos amigos", d: { cash: 1500, rep: -6, red: -4, deja: "l3_trajiste_gente", msg: "Traes a dos amigos y cobras la comisión. Ellos van a cobrar otra cosa cuando se caiga." } },
      ] },
    { id: 13404, por: "Entraste a la preventa y perdiste", t: "Te ofrecen recuperar lo perdido",
      x: "Un servicio te escribe: recupera lo perdido en la preventa a cambio de una tarifa por adelantado. Tiene testimonios.",
      o: [
        { t: "Pagar la tarifa", d: { cash: -1500, cri: -2, msg: "Pagas. Era la segunda parte de la misma estafa, y tenía mejores testimonios que la primera." } },
        { t: "Denunciarlo", d: { cri: 3, rep: 1, ene: -2, msg: "Lo denuncias. Nadie te devuelve nada, pero alguien no pagará esa tarifa gracias a ti." } },
        { t: "Olvidarlo y seguir", d: { ene: 2, cri: 2, msg: "Lo das por perdido. Es la única recuperación que no cobra por adelantado." } },
      ] },
    { id: 13405, por: "Volviste a entrar con poco en una preventa", t: "Saliste justo antes",
      x: "Vendiste un martes cualquiera. El miércoles se cayó todo. No fue análisis, y lo sabes.",
      o: [
        { t: "Retirarte de estas cosas para siempre", d: { cash: 2000, cri: 4, msg: "Cobras y te retiras. Ganar una vez en esto es la forma más barata de aprender a no volver." } },
        { t: "Contarlo como un acierto", d: { cash: 2000, cri: -3, rep: -1, msg: "Lo cuentas como si lo hubieras visto venir. Alguien te cree, y eso es lo peligroso." } },
      ] },
    { id: 13406, por: "Volviste a entrar con poco en una preventa", t: "Le compraste a quien quería salir",
      x: "Entraste cuando los primeros ya estaban vendiendo. Tu dinero sirvió para que ellos salieran, y ya no queda a quién venderle.",
      o: [
        { t: "Asumirlo y cortar", d: { cri: 5, ene: -1, msg: "Lo das por perdido. Era poco y lo aprendiste dos veces, que debería alcanzar." } },
        { t: "Poner más para promediar", d: { cash: -1500, cri: -2, msg: "Pones más para bajar tu precio promedio. Promedias hacia cero." } },
      ] },

    /* ======================= 9034 Un socio que firmaba por los dos ======================= */
    { id: 13451, por: "Te firmaron obligaciones que nunca aprobaste", t: "El exsocio reaparece",
      x: "Tu antiguo socio abre otra sociedad. Un conocido te pregunta si recomiendas hacer negocios con él.",
      o: [
        { t: "Contar los hechos, sin adjetivos", d: { rep: 2, cri: 2, red: -1, msg: "Cuentas lo que pasó, sin opinar. El conocido no firma, y sabe a quién llamar la próxima vez." } },
        { t: "Ser evasivo para no meterte en líos", d: { rep: -1, ene: 1, msg: "Dices que cada quien saque sus conclusiones. El conocido firma, y saca las suyas un año después." } },
      ] },
    { id: 13452, por: "Cerraste limpio la sociedad del socio que firmaba", t: "Otro proyecto, con firma conjunta",
      x: "Alguien que supo cómo saliste de aquello te propone un proyecto. Ofrece firma conjunta desde el primer día, sin que lo pidas.",
      o: [
        { t: "Aceptar, con los papeles bien hechos", d: { cash: 2500, red: 3, cri: 2, msg: "Aceptas. Esta vez todo lo que se firma lleva dos firmas, y una es la tuya." } },
        { t: "No más proyectos paralelos", d: { ene: 3, cri: 1, msg: "Dices que no. Tienes una regla nueva, y las reglas que costaron caro se respetan." } },
      ] },
    { id: 13453, por: "Perdiste en tribunales contra tu exsocio", t: "Lo primero que sale al buscarte",
      x: "Un cliente potencial busca tu nombre en internet. Lo primero que aparece es la sentencia.",
      o: [
        { t: "Contárselo tú antes de que pregunte", d: { rep: 2, cri: 2, msg: "Lo llamas y se lo cuentas entero. Del otro lado, un silencio largo.",
          luego: [{ en: 1, azar: [{ p: 55, id: 13456, bueno: true }, { p: 45, id: 13457, bueno: false }], s: "rep" }] } },
        { t: "Pagar para limpiar los buscadores", d: { cash: -2000, rep: 1, msg: "Pagas para que la sentencia baje a la segunda página. Nadie mira la segunda página, salvo los que importan." } },
        { t: "No decir nada y esperar", d: { rep: -4, msg: "No dices nada. El cliente tampoco, y no vuelve a llamar." } },
      ] },
    { id: 13454, por: "Ganaste en parte el juicio contra tu exsocio", t: "Aparece algo más para cobrar",
      x: "Aparece un bien a nombre del exsocio. El juez lo asigna para pagarte lo que falta, cuando se venda.",
      o: [
        { t: "Aceptar un acuerdo rápido, con descuento", d: { cash: 2500, ene: 2, msg: "Aceptas menos y ya. Cerrar también tiene valor, y ese no se descuenta." } },
        { t: "Esperar a la subasta", d: { cash: 4500, ene: -4, msg: "Esperas. Cobras más, un año después, y el expediente vive en tu escritorio todo ese año." } },
      ] },
    { id: 13456, por: "Le contaste tú a un cliente lo de la sentencia", t: "El cliente valora la franqueza",
      x: "El cliente firma. Dice que todos tienen un juicio en el pasado y que tú fuiste el único que lo mencionó primero.",
      o: [
        { t: "Agradecer y cumplir", d: { rep: 4, car: 2, cash: 2000, msg: "Cumples con todo y a tiempo. En un año es el cliente que más te recomienda." } },
        { t: "Pedirle que te refiera a otros", d: { red: 4, rep: 2, msg: "Le pides referencias. Te da tres nombres y una frase para presentarte." } },
      ] },
    { id: 13457, por: "Le contaste tú a un cliente lo de la sentencia", t: "El cliente elige a otro",
      x: "Te agradece la franqueza y contrata a otro. Dice que no es personal: su comité no quiere tener que explicar ningún juicio.",
      o: [
        { t: "Preguntarle qué haría falta la próxima vez", d: { cri: 3, red: 1, msg: "Le preguntas qué necesitarías. Te lo dice, y es más concreto de lo que esperabas." } },
        { t: "Dejarlo pasar", d: { ene: -2, msg: "Lo dejas pasar. Los procesos se recuerdan más que las sentencias, y las sentencias más que tú." } },
      ] },

    /* ======================= 9040 Una herencia pequeña ======================= */
    { id: 13501, por: "Invertiste la herencia de tu tía, toda o una parte", t: "La herencia cae con el mercado",
      x: "El mercado cae fuerte y lo que heredaste vale bastante menos. No lo ganaste tú y aun así duele igual.",
      o: [
        { t: "No tocar nada", d: { cri: 4, ene: -1, msg: "No tocas nada. Es la más difícil de las decisiones que no requieren hacer nada." } },
        { t: "Vender antes de que caiga más", d: { cash: -2500, cri: -3, msg: "Vendes. Cae un poco más y luego sube sin ti, como suele pasar." } },
        { t: "Comprar más, ahora que está barato", d: { cri: 2, ene: -2, msg: "Pones más. Te tiembla la mano y lo haces igual.",
          luego: [{ en: 2, azar: [{ p: 55, id: 13505, bueno: true }, { p: 45, id: 13506, bueno: false }], s: "cri" }] } },
      ] },
    { id: 13502, por: "Invertiste la herencia de tu tía, toda o una parte", t: "Ya se nota",
      x: "Revisas la cuenta por primera vez en años. Lo que heredaste creció mucho más de lo que esperabas, sin que hicieras nada.",
      o: [
        { t: "Seguir sin tocarla", d: { cash: 3000, cri: 2, msg: "La dejas. El interés compuesto no necesita que lo mires, solo que no lo interrumpas." } },
        { t: "Sacar una parte para algo que importe", d: { cash: 1000, ene: 5, msg: "Sacas una parte para algo que de verdad importa. Tu tía lo habría aprobado, probablemente." } },
      ] },
    { id: 13503, por: "Cambiaste el carro con la herencia", t: "La transmisión",
      x: "Se acabó la garantía y llegó la transmisión. El taller te da el presupuesto con cara de pésame.",
      o: [
        { t: "Pagar el arreglo", d: { cash: -2000, ene: -2, msg: "Pagas. El carro queda como nuevo, que es lo mismo que te dijeron cuando lo compraste." } },
        { t: "Venderlo y comprar uno más sencillo", d: { cash: 1500, cri: 3, rep: -1, msg: "Lo vendes con pérdida y compras uno modesto. Llegas a los mismos sitios, a la misma hora." } },
      ] },
    { id: 13504, por: "Cambiaste el carro con la herencia", t: "Un carro que da conversación",
      x: "Llevas a un cliente a almorzar en el carro nuevo. Pregunta qué tal anda, y la conversación termina en negocios.",
      o: [
        { t: "Llevar la charla a los negocios", d: { red: 4, car: 2, msg: "Terminas el almuerzo con una reunión agendada. El carro no cerró nada, pero abrió la puerta." } },
        { t: "Hablar solo de carros", d: { ene: 3, red: 2, msg: "Hablan de motores dos horas. Te llama la semana siguiente para ir a ver uno juntos." } },
      ] },
    { id: 13505, por: "Compraste más cuando la herencia caía", t: "La recuperación",
      x: "Lo que compraste en la caída ahora vale bastante más. Lo hiciste con la mano temblando y funcionó.",
      o: [
        { t: "Vender una parte y guardar la ganancia", d: { cash: 4000, cri: 3, msg: "Vendes lo que sobra y vuelves a tu reparto de siempre. Ganar no te vuelve genio: te da una regla que funcionó." } },
        { t: "Contárselo a todo el mundo", d: { cash: 3500, cri: -1, rep: 1, msg: "Lo cuentas en cada cena. Tienes razón, y empiezas a creer que siempre la tendrás." } },
      ] },
    { id: 13506, por: "Compraste más cuando la herencia caía", t: "Tarda más de lo que pensabas",
      x: "Lo que compraste en la caída sigue abajo. No pierdes si no vendes, te repites, y te lo repites a menudo.",
      o: [
        { t: "Esperar sin mirar", d: { cri: 3, ene: -1, msg: "Dejas de mirar la cuenta. Es lo que más ayuda y lo que menos se recomienda en voz alta." } },
        { t: "Vender y cortar la pérdida", d: { cash: -2000, cri: -1, msg: "Vendes. Seis meses después vuelve a subir, en la cuenta de otro." } },
      ] },

    /* ======================= 9041 Tu hijo pregunta cómo funciona el dinero ======================= */
    { id: 13551, por: "Le explicaste el dinero a tu hijo con una alcancía", t: "Tu hijo abre su primer negocio",
      x: "Ahora tiene once años y vende pulseras en el colegio. Te muestra sus números en una hoja de cuaderno.",
      o: [
        { t: "Invertir en su negocio, con condiciones", d: { cash: -500, ene: 5, cri: 2, msg: "Le pones el material a cambio de una parte. Firma el contrato con su mejor letra.",
          luego: [{ en: 2, azar: [{ p: 50, id: 13555, bueno: false }, { p: 50, id: 13556, bueno: true }] }] } },
        { t: "Dejar que lo haga solo", d: { ene: 3, cri: 1, msg: "No te metes. Aprende más de su primera pérdida que de todas tus explicaciones." } },
      ] },
    { id: 13552, por: "Le explicaste el dinero a tu hijo con una alcancía", t: "La alcancía se rompió antes de tiempo",
      x: "Se gastó todo lo ahorrado en un videojuego el primer mes. Te mira esperando el sermón.",
      o: [
        { t: "Nada de sermón: que lo sienta", d: { cri: 3, ene: 2, msg: "No dices nada. Tres semanas después sale otro juego y lo ves hacer cuentas en voz baja." } },
        { t: "Devolverle la mitad", d: { cash: -500, ene: 2, cri: -1, msg: "Le devuelves la mitad. Aprende que perder cuesta la mitad, que es una lección, pero no la que querías." } },
      ] },
    { id: 13553, por: "Le dijiste a tu hijo que lo entendería de grande", t: "Tu tarjeta estaba en la consola",
      x: "Ahora tiene once años y descubrió las compras dentro de los juegos. Tu tarjeta estaba guardada en la consola.",
      o: [
        { t: "Reclamar los cargos y quitar la tarjeta", d: { cash: -800, ene: -3, msg: "Reclamas lo que puedes. Él no entiende el problema: la tarjeta daba dinero, ¿no?" } },
        { t: "Sentarte por fin a explicárselo", d: { cash: -600, cri: 4, ene: 3, msg: "Te sientas, con tres años de retraso, y se lo explicas. Esta vez el ejemplo lo pagaste tú." } },
      ] },
    { id: 13554, por: "Le dijiste a tu hijo que lo entendería de grande", t: "Lo aprendió en otra parte",
      x: "Te cuenta, muy serio, que un señor en un video le explicó cómo hacerse rico en una semana.",
      o: [
        { t: "Explicarle cómo gana dinero ese señor", d: { cri: 3, ene: 2, msg: "Le explicas que ese señor gana con las visitas, no con lo que recomienda. Se queda pensando." } },
        { t: "Reírte y cambiar de tema", d: { ene: -1, msg: "Te ríes. Él no, y sigue mirando esos videos." } },
      ] },
    { id: 13555, por: "Invertiste en el negocio de pulseras de tu hijo", t: "El negocio de pulseras quiebra",
      x: "El colegio prohíbe vender en el recreo. Tu hijo te pregunta, muy serio, cuándo tiene que devolverle el dinero a su socio.",
      o: [
        { t: "Perdonarle la deuda", d: { ene: 3, cri: -1, msg: "Le perdonas la deuda. Te abraza y anota en la hoja que el socio era muy blando." } },
        { t: "Pactar un plan de pago con su mesada", d: { cri: 3, ene: 1, msg: "Pactan cuotas con la mesada. Paga hasta la última, y desde entonces te cobra intereses a ti." } },
      ] },
    { id: 13556, por: "Invertiste en el negocio de pulseras de tu hijo", t: "Te paga dividendos",
      x: "El negocio funciona. A fin de mes te entrega en monedas tu parte de las ganancias, con un informe dibujado.",
      o: [
        { t: "Pedirle que lo reinvierta", d: { cri: 3, ene: 3, msg: "Le pides que lo reinvierta. Compra más hilo y abre una sucursal en el otro recreo." } },
        { t: "Guardar las monedas en un frasco", d: { ene: 5, msg: "Las guardas en un frasco en tu escritorio. Es la única inversión de tu cartera que no piensas vender." } },
      ] },

    /* ======================= 9801 El mandato de tu vida (legendaria) ======================= */
    { id: 13601, por: "Llevaste el mandato de la década", t: "Un cazatalentos sabe tu nombre",
      x: "Te llama un cazatalentos de una firma más grande. Leyó todo sobre aquel mandato y quiere hablar 'de lo que aprendiste'.",
      o: [
        { t: "Usar la llamada para negociar lo tuyo", d: { cash: 6000, car: 3, rep: -2, msg: "Mencionas la llamada donde corresponde. Mejoran tus condiciones y alguien anota que sabes jugar." } },
        { t: "Escuchar y no moverte", d: { red: 5, cri: 2, msg: "Escuchas y no decides nada. Ahora tienes un número que te contesta, que no es poco." } },
        { t: "Decirle que lo que aprendiste no se cuenta", d: { rep: 3, ene: 2, msg: "Le dices que eso no se cuenta. Le gusta tanto la respuesta que vuelve a llamar al año." } },
      ] },
    { id: 13602, por: "Llevaste el mandato de la década", t: "Quieren tu versión de la historia",
      x: "Un periodista prepara un reportaje sobre aquella operación. Tiene la versión de todos menos la tuya.",
      o: [
        { t: "Dar la entrevista con nombre y apellido", d: { rep: 2, ene: -2, msg: "Das la entrevista. Hablas una hora y te asusta cada frase que te salió bien.",
          luego: [{ en: 1, azar: [{ p: 50, id: 13606, bueno: true }, { p: 50, id: 13607, bueno: false }], s: "rep" }] } },
        { t: "Hablar sin que te citen", d: { red: 3, cri: 2, msg: "Le das contexto sin tu nombre. El reportaje sale más justo y nadie sabe por qué." } },
        { t: "No decir nada", d: { rep: -2, ene: 2, msg: "No contestas. Sale con un 'no quiso hacer comentarios' que cada lector interpreta a su manera." } },
      ] },
    { id: 13603, por: "Llevaste el mandato de la década", t: "El cliente de aquel mandato vuelve",
      x: "El cliente de la operación tiene otra. Quiere verte antes que a nadie y no dice si es para contratarte o para entender qué pasó.",
      o: [
        { t: "Pedir llevarla tú otra vez", d: { cash: 12000, car: 8, rep: 5, ene: -10, msg: "Era para contratarte. Llevas la segunda con menos miedo y más canas, y cierra." } },
        { t: "Proponer a tu segundo al frente, con tu apoyo", d: { red: 6, rep: 3, car: 2, msg: "Pones a tu segundo delante. El cliente duda, acepta, y tu segundo te debe la carrera." } },
        { t: "Ir solo a escuchar", d: { cri: 4, red: 3, msg: "Escuchas. Quería entender qué pasó de verdad, y por primera vez se lo cuentas sin defenderte." } },
      ] },
    { id: 13604, por: "Apoyaste el mandato desde atrás, sin firmar", t: "La foto es de otro",
      x: "La operación cerró y quien la firmó da charlas sobre ella. Las láminas que proyecta las hiciste tú.",
      o: [
        { t: "Decirlo en voz alta", d: { rep: -3, red: -4, car: 1, msg: "Lo dices en un almuerzo. Es verdad, y suena exactamente a lo que suena." } },
        { t: "Pedirle que te ponga delante en la próxima", d: { car: 5, red: 2, ene: -3, msg: "Se lo pides en privado. Te debe una, lo sabe, y la próxima operación lleva tu nombre junto al suyo." } },
        { t: "Dejarlo así", d: { ene: 3, cri: 2, msg: "Lo dejas. El anonimato también rinde, solo que paga en otra moneda." } },
      ] },
    { id: 13605, por: "Apoyaste el mandato desde atrás, sin firmar", t: "Se cayó, y nadie te miró a ti",
      x: "La operación se cayó en la recta final. Quien la firmó carga con todo; a ti nadie te pregunta nada, y eso tampoco es gratis.",
      o: [
        { t: "Defender en público a quien firmó", d: { rep: 5, red: 4, car: -3, msg: "Dices que el error fue de todos. Nadie lo agradece en voz alta; años después, alguien te lo devuelve." } },
        { t: "Quedarte callado", d: { car: 3, rep: -2, msg: "Te callas. Sales entero, como planeaste, y con algo menos que no sale en ningún balance." } },
        { t: "Ayudarle a recolocarse con tus contactos", d: { red: 5, ene: -3, msg: "Haces llamadas por quien firmó. Consigue algo en seis meses y no olvida quién llamó." } },
      ] },
    { id: 13606, por: "Diste la entrevista sobre el mandato de la década", t: "El reportaje te deja de pie",
      x: "Sale el reportaje y tu versión es la que queda. Te escriben clientes que no conocías y un par de rivales que sí.",
      o: [
        { t: "Aprovechar la ola y salir a vender", d: { car: 5, red: 6, ene: -6, cash: 8000, msg: "Aprovechas. Cierras tres reuniones en una semana. Lo malo de las olas es que también se van." } },
        { t: "Volver a callarte y trabajar", d: { rep: 4, cri: 2, msg: "No das más entrevistas. Una buena es una historia; diez son un personaje." } },
      ] },
    { id: 13607, por: "Diste la entrevista sobre el mandato de la década", t: "El titular no es el que diste",
      x: "El reportaje sale con una frase tuya, sacada de contexto, como titular. Suena arrogante y la comparte todo el mundo.",
      o: [
        { t: "Pedir una rectificación", d: { rep: 1, ene: -4, msg: "Pides la corrección. Sale en letra pequeña tres días después. El titular sigue arriba." } },
        { t: "Reírte de ti en público", d: { rep: 3, red: 3, msg: "Lo compartes tú, con una broma. La gente se ríe contigo y el titular pierde fuerza." } },
        { t: "No decir nada", d: { rep: -4, msg: "No dices nada. La frase te sigue a cada reunión durante un año." } },
      ] },

    /* ======================= 9802 Te llama un fondo soberano (legendaria) ======================= */
    { id: 13651, por: "Aceptaste un asiento en un fondo soberano", t: "Serías el único voto en contra",
      x: "Una inversión grande del fondo te huele mal. Si votas en contra, serás el único, y el acta lo dirá con tu nombre.",
      o: [
        { t: "Votar en contra", d: { cri: 5, red: -3, deja: "l3_voto_contra", msg: "Votas en contra. La inversión se aprueba igual y tu nombre queda solo en el acta.",
          luego: [{ en: 2, azar: [{ p: 50, id: 13656, bueno: true }, { p: 50, id: 13657, bueno: false }], s: "cri" }] } },
        { t: "Abstenerte", d: { rep: -3, red: 2, msg: "Te abstienes. Nadie se ofende y nadie te recuerda, que en un comité es lo mismo." } },
        { t: "Votar a favor con el resto", d: { red: 4, cri: -4, msg: "Votas con el resto. Es cómodo, y la incomodidad la guardas para otra reunión que no llega." } },
      ] },
    { id: 13652, por: "Aceptaste un asiento en un fondo soberano", t: "Una puerta que se abre sola",
      x: "Un ministro de otro país pide verte porque se sienta en el mismo comité que tú. Quiere hablar de inversiones en su país.",
      o: [
        { t: "Escuchar sin vender nada", d: { red: 8, rep: 4, msg: "Escuchas y no vendes nada. Por eso te vuelve a llamar, y a la tercera te pide propuestas." } },
        { t: "Aprovechar para ofrecer tus servicios", d: { cash: 12000, car: 5, rep: -4, msg: "Le ofreces lo tuyo. Firma, y en el comité alguien empieza a mirarte de otra manera." } },
        { t: "Mandar a alguien de tu equipo", d: { red: 3, car: 2, rep: 1, msg: "Mandas a alguien de confianza. Vuelve con una oportunidad y una anécdota que contará diez años." } },
      ] },
    { id: 13653, por: "Aceptaste un asiento en un fondo soberano", t: "El conflicto de interés",
      x: "El fondo estudia invertir en una empresa a la que tú asesoras por fuera. Nadie te ha preguntado nada. Todavía.",
      o: [
        { t: "Declararlo y salirte de esa votación", d: { rep: 6, cri: 3, cash: -2000, msg: "Lo declaras y no votas. Pierdes un cliente que quería tu voto, no tu consejo." } },
        { t: "Renunciar al asiento", d: { rep: 3, red: -8, ene: 6, msg: "Renuncias. Te devuelven las llamadas un poco más tarde, pero te las siguen devolviendo." } },
        { t: "Callar y votar", d: { cash: 8000, rep: -10, cri: -3, msg: "Callas y votas. La inversión sale bien, y en algún cajón queda un papel con tu nombre y una fecha." } },
      ] },
    { id: 13654, por: "Declinaste el asiento en el fondo soberano", t: "Llama otro fondo, el último",
      x: "Llama otro fondo, más pequeño, con un asiento parecido. Esta vez avisan que no habrá una tercera llamada.",
      o: [
        { t: "Aceptar ahora", d: { red: 10, rep: 8, ene: -6, cash: 5000, deja: "l3_asiento_soberano", msg: "Aceptas. Es más pequeño y llega más tarde, y aun así te cambia la agenda." } },
        { t: "Declinar otra vez", d: { ene: 5, cri: 2, msg: "Dices que no otra vez. Ya no te vas a acordar tanto, que es otra forma de cerrar la puerta." } },
      ] },
    { id: 13655, por: "Declinaste el asiento en el fondo soberano", t: "El asiento lo tomó un colega",
      x: "El asiento lo tomó un colega tuyo. Hoy te devuelve las llamadas con un día de retraso; antes era al revés.",
      o: [
        { t: "Pedirle una presentación", d: { red: 5, rep: -1, msg: "Le pides que te presente a alguien. Lo hace, y te lo recuerda con mucha naturalidad." } },
        { t: "Competir por otro lado", d: { car: 4, ene: -4, mod: 2, msg: "Te pones a trabajar en lo que ese asiento no da. Hay cosas que no dan los asientos." } },
        { t: "Alegrarte por tus horas", d: { ene: 5, cri: 1, msg: "Miras tu agenda y te alegras. Las horas eran lo que defendías, y ahí siguen." } },
      ] },
    { id: 13656, por: "Votaste solo en contra en el fondo soberano", t: "El acta lo prueba",
      x: "La inversión se hundió. En la revisión alguien saca el acta y lee tu voto en voz alta, despacio.",
      o: [
        { t: "Callar y dejar que el acta hable", d: { rep: 12, cri: 4, red: 5, msg: "No dices nada. El acta habla por ti, y desde entonces te piden la opinión antes de votar." } },
        { t: "Proponer reglas para que no se repita", d: { rep: 8, cri: 6, ene: -4, msg: "Propones cambiar cómo decide el comité. Lo aprueban, y ahora todos votan con argumentos por escrito." } },
      ] },
    { id: 13657, por: "Votaste solo en contra en el fondo soberano", t: "Salió bien sin ti",
      x: "La inversión que votaste en contra es la mejor del fondo en años. En la celebración, alguien brinda por los valientes.",
      o: [
        { t: "Brindar y reconocer el error", d: { rep: 3, cri: 3, red: 2, msg: "Brindas y dices que te equivocaste. En un comité eso se ve tan poco que lo recuerdan más que el brindis." } },
        { t: "Explicar por qué tu voto seguía siendo correcto", d: { cri: 2, red: -5, rep: -2, msg: "Explicas que el riesgo era real aunque saliera bien. Tienes razón y nadie quiere oírla en una fiesta." } },
      ] },

    /* ======================= 9803 Lo que nadie quiere comprar (legendaria) ======================= */
    { id: 13701, por: "Entraste fuerte en el activo que nadie quería", t: "El vendedor vuelve a llamar",
      x: "Quien te vendió aquel activo tiene otro problema y otro activo. Te llama primero a ti, que es un cumplido o una advertencia.",
      o: [
        { t: "Estudiarlo con el doble de tiempo", d: { cri: 4, ene: -3, msg: "Pides seis días en vez de tres. Te los da, y eso ya te dice algo.",
          luego: [{ en: 1, azar: [{ p: 50, id: 13706, bueno: true }, { p: 50, id: 13707, bueno: false }], s: "cri" }] } },
        { t: "Pasar esta vez", d: { ene: 2, cri: 1, msg: "Pasas. Una vez fue oficio; dos veces seguidas empezaría a ser suerte." } },
      ] },
    { id: 13702, por: "Entraste fuerte en el activo que nadie quería", t: "Te llueven los activos baratos",
      x: "Corrió la voz de que compras lo que nadie quiere. Te llegan tres ofertas por semana, y casi todas son baratas por buenas razones.",
      o: [
        { t: "Montar un fondo con socios para esto", d: { red: 6, car: 5, ene: -6, cash: 6000, msg: "Armas con socios un fondo para comprarle a quien tiene que vender. Ya no es tu anécdota: es tu oficio." } },
        { t: "Filtrar con una regla estricta", d: { cri: 5, ene: -2, msg: "Te pones una regla: si en tres días no entiendes el problema, no entras. Dices que no a casi todo." } },
        { t: "Cerrar la puerta", d: { ene: 4, red: -2, msg: "Dejas de contestar. Una buena compra no te obliga a buscar la segunda." } },
      ] },
    { id: 13703, por: "Entraste fuerte en el activo que nadie quería", t: "El activo pide más capital",
      x: "El activo necesita una inversión que nadie había presupuestado. Sin ella vale menos; con ella, quizá bastante más.",
      o: [
        { t: "Poner tú el capital", d: { cash: -8000, cri: 3, rep: 2, msg: "Pones el capital. Es apostar dos veces en el mismo sitio, sabiendo ahora lo que antes no sabías." } },
        { t: "Buscar un socio que lo ponga", d: { cash: -2000, red: 4, cri: 2, msg: "Traes un socio con capital. Te quedas con menos del activo, y dormir también tiene precio." } },
        { t: "Vender ahora, tal como está", d: { cash: 9000, cri: 2, ene: 3, msg: "Vendes. Alguien con más paciencia y más capital se queda con lo que viene, que es lo justo." } },
      ] },
    { id: 13704, por: "Dejaste pasar el activo que nadie quería", t: "Otro lo compró y le fue bien",
      x: "Un competidor entró donde tú no. Hoy lo cuenta en las cenas como la mejor compra de su carrera.",
      o: [
        { t: "Preguntarle qué vio que tú no", d: { cri: 5, red: 2, msg: "Le preguntas. Te lo explica con gusto, y lo que vio estaba en la página que tú leíste rápido." } },
        { t: "Anotarlo y seguir", d: { cri: 2, ene: 2, msg: "Lo anotas. La mitad de las veces dejarlo pasar es lo correcto, y esta era la otra mitad." } },
      ] },
    { id: 13705, por: "Dejaste pasar el activo que nadie quería", t: "Estaba barato por algo",
      x: "Quien lo compró descubrió por qué: el terreno estaba contaminado y no salía en ningún papel. Te llama para ofrecerte su parte.",
      o: [
        { t: "No, gracias", d: { cri: 4, ene: 2, msg: "Dices que no, con educación. Pocas cosas descansan tanto como una mala inversión que hizo otro." } },
        { t: "Contar en la industria por qué no entraste", d: { rep: 5, red: -2, msg: "Cuentas tu análisis. Te ganas fama de buen ojo y un enemigo: el que compró." } },
        { t: "Comprar su parte a precio de chatarra", d: { cash: -4000, cri: -2, msg: "Compras su parte por casi nada. Limpiar el terreno cuesta mucho más que casi nada." } },
      ] },
    { id: 13706, por: "Estudiaste con calma el segundo activo forzado", t: "Esta vez el descuento también era real",
      x: "Seis días de análisis y el problema era solo de quien vendía. El activo es bueno y el precio sigue siendo una fracción.",
      o: [
        { t: "Entrar fuerte otra vez", d: { cash: 25000, cri: 4, rep: 6, deja: "l3_compraste_forzado", msg: "Entras fuerte. Dos veces ya no es suerte: es oficio, y el mercado empieza a llamarlo por tu nombre." } },
        { t: "Entrar con la mitad, por si acaso", d: { cash: 12000, cri: 3, msg: "Entras con la mitad. Ganas la mitad, y duermes el doble." } },
      ] },
    { id: 13707, por: "Estudiaste con calma el segundo activo forzado", t: "Esta vez el problema se veía",
      x: "El quinto día lo encuentras: una deuda escondida en una filial. El descuento no era descuento, era el precio justo de una trampa.",
      o: [
        { t: "Retirarte y explicarle por qué", d: { cri: 5, rep: 3, msg: "Te retiras y se lo dices. Te agradece la franqueza y te odia un poco, que suele ir junto." } },
        { t: "Ofrecer un precio que cubra la trampa", d: { cash: 6000, cri: 3, red: -2, msg: "Ofreces lo que vale con la deuda incluida. Acepta porque no tiene otra, y tú compras bien." } },
      ] },

    /* ======================= 9804 Te ofrecen la silla (legendaria, empleado) ======================= */
    { id: 13751, por: "Aceptaste dirigir la mesa", t: "El error de otro lleva tu firma", empleado: true,
      x: "Alguien de tu mesa tomó una posición enorme sin protegerse y perdió mucho. El comité no pregunta quién fue: pregunta qué vas a hacer tú.",
      o: [
        { t: "Asumirlo tú ante el comité", d: { rep: 6, car: -4, cash: -6000, msg: "Das la cara y te descuentan el bono. Toda la mesa ve quién se puso delante." } },
        { t: "Despedir a quien lo hizo", d: { car: 2, rep: -3, red: -4, msg: "Despides al responsable. El comité queda contento y la mesa aprende a esconder sus errores." } },
        { t: "Arreglarlo en silencio, antes del cierre", d: { cri: 2, ene: -6, msg: "Cierras la posición poco a poco y sin anunciarlo. Nadie más lo sabe, de momento.",
          luego: [{ en: 1, azar: [{ p: 45, id: 13756, bueno: true }, { p: 55, id: 13757, bueno: false }], s: "cri" }] } },
      ] },
    { id: 13752, por: "Aceptaste dirigir la mesa", t: "El mejor año de la mesa", empleado: true,
      x: "La mesa cierra el mejor año de su historia. Te toca repartir el bono entre quince personas que creen que lo hicieron solas.",
      o: [
        { t: "Repartir por mérito, con números", d: { cri: 4, red: -3, cash: 4000, msg: "Repartes por resultados. Los buenos se quedan; los demás empiezan a mandar currículos." } },
        { t: "Repartir casi parejo", d: { red: 6, cri: -2, cash: 4000, msg: "Repartes casi parejo. La mesa te quiere, y los dos mejores se van a la competencia en primavera." } },
        { t: "Quedarte con una parte más grande", d: { cash: 15000, red: -8, rep: -4, msg: "Te quedas con más. Lo vales, probablemente, y la mesa también sabe sumar." } },
      ] },
    { id: 13753, por: "Aceptaste dirigir la mesa", t: "Tu tiempo ya no es tuyo", empleado: true,
      x: "Llevas un año sin vacaciones completas. Tu segundo se ofrece a cubrirte dos semanas, y te cuesta decir que sí.",
      o: [
        { t: "Tomarlas, y sin teléfono", d: { ene: 10, car: -2, red: 2, msg: "Te vas. Tu segundo lo hace bien, que es la mejor y la peor noticia a la vez." } },
        { t: "Una semana, con el teléfono encendido", d: { ene: 3, msg: "Te vas a medias. Vuelves descansado a medias, con todo el trabajo entero." } },
        { t: "Decir que no, ahora no es el momento", d: { ene: -8, car: 3, msg: "Dices que no. Nunca es el momento, y eso lo sabe cualquiera que dirija una mesa." } },
      ] },
    { id: 13754, por: "Propusiste a otra persona para dirigir la mesa", t: "Tu aliado dirige la mesa", empleado: true,
      x: "La persona que propusiste lo hace bien y te defiende en cada comité. Te ofrece el proyecto más interesante del año.",
      o: [
        { t: "Aceptar el proyecto", d: { car: 6, mod: 4, ene: -4, msg: "Lo aceptas. Trabajas en lo que te gusta con alguien que te cubre la espalda. Hay techos peores." } },
        { t: "Pedirle a cambio más tiempo libre", d: { ene: 7, car: 1, msg: "Le pides horario. Te lo da sin pestañear, que es para lo que sirven los aliados." } },
        { t: "Pedirle un aumento", d: { cash: 6000, red: -2, msg: "Le pides más sueldo. Te lo consigue, y nota lo rápido que se lo cobraste." } },
      ] },
    { id: 13755, por: "Propusiste a otra persona para dirigir la mesa", t: "Tu recomendación lleva tu nombre", empleado: true,
      x: "La persona que propusiste no está a la altura. El comité recuerda perfectamente quién la recomendó.",
      o: [
        { t: "Ayudarle en silencio a enderezarlo", d: { ene: -6, rep: 2, red: 3, msg: "Le ayudas por las noches. La mesa mejora, y los dos saben quién hizo qué." } },
        { t: "Tomar distancia", d: { rep: -2, red: -5, msg: "Te alejas. El comité lo nota, y la persona que propusiste también." } },
        { t: "Ofrecerte tú, ahora sí, para la silla", d: { car: 8, red: -6, ene: -8, msg: "Te ofreces para reemplazarle. El comité te escucha, y tu aliado de toda la vida deja de serlo." } },
      ] },
    { id: 13756, por: "Arreglaste en silencio el error de tu mesa", t: "Nadie lo supo", empleado: true,
      x: "Cerraste la posición sin que el mercado lo notara. La pérdida quedó en algo manejable y el responsable sabe que lo salvaste.",
      o: [
        { t: "Hablarlo a solas con quien lo hizo", d: { red: 4, cri: 2, msg: "Cierras la puerta y se lo dices una vez. No vuelve a pasar, y lo que te debe no sale en ningún informe." } },
        { t: "Poner límites nuevos para toda la mesa", d: { cri: 4, red: -2, msg: "Pones límites por posición para todos. La mesa protesta y nadie entiende por qué ahora." } },
      ] },
    { id: 13757, por: "Arreglaste en silencio el error de tu mesa", t: "La auditoría lo encuentra", empleado: true,
      x: "La auditoría encuentra la posición y cómo la cerraste. La pregunta ya no es por la pérdida: es por qué no lo dijiste.",
      o: [
        { t: "Contarlo todo, sin excusas", d: { rep: -4, cri: 3, car: -3, msg: "Lo cuentas todo. Te cuesta un año de confianza y no te cuesta la silla." } },
        { t: "Decir que pensabas reportarlo al cierre", d: { rep: -8, car: -5, msg: "Dices que ibas a reportarlo. Nadie te cree, y el acta lo dice con otras palabras." } },
      ] },
  ],

  raices: {
    /* No es la primera vez que empiezas esto */
    "9007": {
      "0": { luego: [{ en: 1, s: "red", azar: [{ p: 55, id: 13001 }, { p: 45, id: 13002, bueno: true }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 40, id: 13004, bueno: false }, { p: 30, id: 13002, bueno: true }, { p: 30, id: 13001 }] }] },
      "2": { luego: [{ en: 1, s: "car", azar: [{ p: 55, id: 13003, bueno: false }, { p: 45, id: 13005, bueno: true }] }] },
    },
    /* La conversación de los planes */
    "9008": {
      "0": { luego: [{ en: 1, s: "ene", azar: [{ p: 45, id: 13051, bueno: false }, { p: 55, id: 13052, bueno: true }] }] },
      "1": { luego: [{ en: 2, azar: [{ p: 55, id: 13053, bueno: false }, { p: 45, id: 13054 }] }] },
      "2": { luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 13055 }, { p: 45, id: 13052, bueno: true }] }] },
    },
    /* Empezar otra vez */
    "9023": {
      "0": { luego: [{ en: 1, azar: [{ p: 55, id: 13101 }, { p: 45, id: 13102 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 60, id: 13103, bueno: true }, { p: 40, id: 13102 }] }] },
      "2": { luego: [{ en: 1, s: "cri", azar: [{ p: 60, id: 13104, bueno: true }, { p: 40, id: 13105, bueno: false }] }] },
    },
    /* La universidad de tus hijos */
    "9024": {
      "0": { luego: [{ en: 3, s: "cri", azar: [{ p: 40, id: 13152, bueno: true }, { p: 30, id: 13151 }, { p: 30, id: 13155, bueno: false }] }] },
      "1": { luego: [{ en: 3, azar: [{ p: 45, id: 13152, bueno: true }, { p: 35, id: 13154 }, { p: 20, id: 13151 }] }] },
      "2": { luego: [{ en: 3, azar: [{ p: 55, id: 13153, bueno: false }, { p: 45, id: 13152, bueno: true }] }] },
    },
    /* El chequeo que llevabas años posponiendo */
    "9025": {
      "0": { deja: "l3_cambiaste_vida", luego: [{ en: 1, s: "ene", azar: [{ p: 40, id: 13201, bueno: true }, { p: 35, id: 13202 }, { p: 25, id: 13205, bueno: true }] }] },
      "1": { luego: [{ en: 2, s: "ene", azar: [{ p: 45, id: 13203, bueno: false }, { p: 55, id: 13204 }] }] },
    },
    /* Rendimiento garantizado */
    "9030": {
      "0": { deja: "l3_olfato", luego: [{ en: 1, azar: [{ p: 55, id: 13251 }, { p: 45, id: 13252, bueno: true }] }] },
      "1": {
        ok: { deja: "l3_olfato", luego: [{ en: 1, azar: [{ p: 60, id: 13254, bueno: true }, { p: 40, id: 13252 }] }] },
        no: { luego: [{ en: 1, azar: [{ p: 65, id: 13253, bueno: false }, { p: 35, id: 13252 }] }] },
      },
    },
    /* Un negocio con un familiar */
    "9031": {
      "0": { luego: [{ en: 2, azar: [{ p: 50, id: 13301 }, { p: 50, id: 13305 }] }] },
      "1": { deja: "l3_sin_papeles", luego: [{ en: 1, azar: [{ p: 40, id: 13302, bueno: false }, { p: 35, id: 13301 }, { p: 25, id: 13305 }] }] },
      "2": { luego: [{ en: 1, s: "red", azar: [{ p: 55, id: 13303, bueno: true }, { p: 45, id: 13304, bueno: false }] }] },
    },
    /* Te clonaron la identidad */
    "9032": {
      "0": { luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 13351, bueno: true }, { p: 25, id: 13352, bueno: false }, { p: 25, id: 13354 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 50, id: 13353, bueno: false }, { p: 30, id: 13352, bueno: false }, { p: 20, id: 13354 }] }] },
    },
    /* La oportunidad que solo dura hoy */
    "9033": {
      "0": { deja: "l3_olfato", luego: [{ en: 1, azar: [{ p: 55, id: 13401, bueno: true }, { p: 45, id: 13402 }] }] },
      "1": {
        ok: { luego: [{ en: 1, azar: [{ p: 55, id: 13403, bueno: false }, { p: 45, id: 13402 }] }] },
        no: { luego: [{ en: 1, azar: [{ p: 60, id: 13404, bueno: false }, { p: 40, id: 13402 }] }] },
      },
    },
    /* Un socio que firmaba por los dos */
    "9034": {
      "0": { luego: [{ en: 2, azar: [{ p: 50, id: 13452, bueno: true }, { p: 50, id: 13451 }] }] },
      "1": {
        ok: { luego: [{ en: 1, azar: [{ p: 55, id: 13454, bueno: true }, { p: 45, id: 13451 }] }] },
        no: { luego: [{ en: 1, azar: [{ p: 65, id: 13453, bueno: false }, { p: 35, id: 13451 }] }] },
      },
    },
    /* Una herencia pequeña */
    "9040": {
      "0": { luego: [{ en: 3, s: "cri", azar: [{ p: 45, id: 13502, bueno: true }, { p: 55, id: 13501 }] }] },
      "1": { luego: [{ en: 3, s: "cri", azar: [{ p: 35, id: 13502, bueno: true }, { p: 65, id: 13501 }] }] },
      "2": { luego: [{ en: 2, azar: [{ p: 55, id: 13503, bueno: false }, { p: 45, id: 13504, bueno: true }] }] },
    },
    /* Tu hijo pregunta cómo funciona el dinero */
    "9041": {
      "0": { luego: [{ en: 3, azar: [{ p: 40, id: 13551, bueno: true }, { p: 60, id: 13552 }] }] },
      "1": { luego: [{ en: 3, azar: [{ p: 55, id: 13553, bueno: false }, { p: 45, id: 13554 }] }] },
    },
    /* El mandato de tu vida (legendaria). La opción 0 es minijuego: el futuro vale para éxito, parcial y fallo,
       y la reputación (que el resultado sube o hunde) inclina el sorteo. */
    "9801": {
      "0": { deja: "l3_llevaste_mandato", luego: [{ en: 2, s: "rep", azar: [{ p: 35, id: 13603, bueno: true }, { p: 35, id: 13602 }, { p: 30, id: 13601 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 55, id: 13604 }, { p: 45, id: 13605 }] }] },
    },
    /* Te llama un fondo soberano (legendaria) */
    "9802": {
      "0": { deja: "l3_asiento_soberano", luego: [{ en: 1, s: "cri", azar: [{ p: 40, id: 13652, bueno: true }, { p: 35, id: 13651 }, { p: 25, id: 13653, bueno: false }] }] },
      "1": { luego: [{ en: 3, azar: [{ p: 40, id: 13654, bueno: true }, { p: 60, id: 13655 }] }] },
    },
    /* Lo que nadie quiere comprar (legendaria). Opción 0 minijuego: futuro válido para los tres resultados. */
    "9803": {
      "0": { deja: "l3_compraste_forzado", luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 13702, bueno: true }, { p: 35, id: 13703 }, { p: 30, id: 13701 }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 13704 }, { p: 50, id: 13705, bueno: true }] }] },
    },
    /* Te ofrecen la silla (legendaria) */
    "9804": {
      "0": { deja: "l3_silla", luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 13752, bueno: true }, { p: 35, id: 13751, bueno: false }, { p: 30, id: 13753 }] }] },
      "1": { deja: "l3_aliado", luego: [{ en: 1, s: "red", azar: [{ p: 60, id: 13754, bueno: true }, { p: 40, id: 13755, bueno: false }] }] },
    },
  },

  finales: [
    { id: "l3_operacion_decada", huellas: ["l3_llevaste_mandato"], t: "La operación de la década",
      x: "Pediste el mandato que todos miraban y lo llevaste tú. Saliera como saliera, durante años bastó decir «la operación» para que supieran de quién se hablaba." },
    { id: "l3_asiento_grande", huellas: ["l3_asiento_soberano"], t: "Un asiento en la mesa grande",
      x: "Aceptaste un asiento que pagaba poco y lo abría todo. Pasaste años viendo de cerca cómo decide la gente que mueve el dinero de países enteros." },
    { id: "l3_sin_humo", huellas: ["l3_olfato"], t: "A ti no te vendieron humo",
      x: "Aprendiste a preguntar quién cobra y por qué hay tanta prisa. No te hiciste rico por eso: solo dejaste de regalarle tu dinero a gente con oficina bonita." },
  ],
};
