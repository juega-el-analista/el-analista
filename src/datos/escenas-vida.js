/* ============================================================
   LA VIDA QUE PASA MIENTRAS TRABAJAS
   Un simulador de carrera que solo habla de sueldos y carteras miente
   por omisión. Aquí entran las cosas que de verdad mueven el dinero de
   una persona: con quién vives, cuánta gente depende de ti, quién se
   enferma, quién se muere y quién te estafa.

   Cada escena tiene rango de edad, condiciones de estado y, casi
   siempre, un coste que no aparece en ninguna hoja de cálculo.
   Campos: eMin y eMax son edades, no rangos de carrera. "una" marca
   las que solo pueden ocurrir una vez en la partida.
   ============================================================ */

/* estados de pareja: solo · noviazgo · casado · divorciado · viudo */

export const VIDA = [
  /* ---------------- veinte y pico ---------------- */
  {
    id: 9001, eMin: 21, eMax: 34, una: true, cuando: (st) => st.pareja === "solo",
    t: "Alguien que te importa", clave: true,
    x: "Llevas meses viendo a alguien. No es una decisión financiera y aun así lo es: el tiempo que dedicas, la ciudad en la que decides quedarte y la cantidad de fines de semana que no pasas trabajando salen todos del mismo presupuesto.",
    o: [
      { t: "Ir en serio con esta persona", d: { pareja: "noviazgo", ene: 8, rep: 2, cash: -600, msg: "Empiezas una relación seria. Ganas red de apoyo y pierdes fines de semana de oficina." } },
      { t: "Dejarlo estar, este año no es el año", d: { car: 6, ene: -6, msg: "Eliges la carrera. Funciona, y algunas noches te preguntas si valía la pena." } },
    ],
  },
  {
    id: 9002, eMin: 22, eMax: 30, una: true,
    t: "La boda de tu mejor amigo", clave: false,
    x: "Te pide que seas padrino. La boda es en otro país, hay despedida, hay traje, hay regalo. Nadie te está obligando y todo el mundo espera que vayas.",
    o: [
      { t: "Ir a todo, es una vez en la vida", d: { cash: -1800, red: 8, ene: 5, msg: "Vas a todo. Te cuesta un mes de ahorro y te llevas una red que te va a servir veinte años." } },
      { t: "Ir solo a la boda, saltarte la despedida", d: { cash: -700, red: 4, msg: "Vas a lo importante y te ahorras lo demás. Nadie te lo reprocha." } },
      { t: "No puedes permitírtelo y lo dices", d: { cash: -150, red: -4, rep: -2, ene: -3, msg: "Mandas el regalo y una nota. Es la decisión correcta y de todas formas duele." } },
    ],
  },
  {
    id: 9003, eMin: 22, eMax: 33, una: true,
    t: "Irte a vivir solo", clave: false,
    x: "Puedes seguir en casa de tus padres y ahorrar como nunca vas a poder ahorrar otra vez, o mudarte y empezar a pagar por tu propio espacio.",
    o: [
      { t: "Mudarte, necesitas tu espacio", d: { cash: -2500, ene: 10, rep: 3, msg: "Te mudas. Vives mejor y tu tasa de ahorro se desploma; las dos cosas son verdad a la vez." } },
      { t: "Quedarte dos años más y ahorrar", d: { cash: 1500, ene: -8, car: 4, msg: "Te quedas. Es lo más rentable que vas a hacer en la década y no se lo cuentas a nadie." } },
    ],
  },
  {
    id: 9004, eMin: 23, eMax: 40,
    t: "El negocio de un conocido", clave: false,
    x: "Un amigo del gimnasio te habla de una importadora. Números redondos, márgenes que él llama conservadores y una urgencia que no termina de explicar. No hay estados financieros, hay un PDF con fotos.",
    o: [
      { t: "Meter un ticket pequeño, por la amistad", chk: { s: "cri", dif: 42 },
        ok: { cash: 1400, cri: 3, msg: "Contra todo pronóstico el negocio funciona y te devuelve con ganancia. No lo confundas con criterio." },
        no: { cash: -2200, red: -3, cri: 5, msg: "El negocio nunca arrancó y tu amigo dejó de contestar. La lección costó lo que costó." } },
      { t: "Pedirle estados financieros auditados", d: { cri: 6, red: -2, msg: "Pides papeles. Se ofende, deja de insistir, y seis meses después el asunto se desinfla solo." } },
      { t: "No, y sin explicaciones largas", d: { cri: 4, msg: "Dices que no. Es la respuesta correcta la mayoría de las veces y casi nadie la da." } },
    ],
  },

  /* ---------------- treinta ---------------- */
  {
    id: 9010, pri: 3, eMin: 26, eMax: 42, una: true, clave: true, cuando: (st) => st.pareja === "noviazgo",
    t: "La conversación", clave: true,
    x: "Llevan años. La pregunta ya no es si se quieren, es si van a construir algo en común: cuentas, casa, planes que no se pueden deshacer con una llamada.",
    o: [
      { t: "Casarte", d: { pareja: "casado", ene: 10, rep: 5, red: 6, cash: -4500, msg: "Te casas. La boda cuesta lo que cuesta y el hogar de dos ingresos cambia tus números para bien." } },
      { t: "Seguir juntos sin firmar nada", d: { ene: 4, msg: "Siguen igual. Funciona, y en algún momento uno de los dos va a volver a sacar el tema." } },
      { t: "Se acabó", d: { pareja: "solo", ene: -14, rep: -2, cash: -1200, car: 4, msg: "Lo dejan. Te vuelcas en el trabajo, que es lo que hace todo el mundo y ayuda menos de lo que parece." } },
    ],
  },
  {
    id: 9011, pri: 1, eMin: 24, eMax: 45, cuando: (st) => st.pareja === "noviazgo",
    t: "Se rompió", clave: true,
    x: "No hubo un motivo grande. Hubo dos años de horarios imposibles, viajes que no cancelaste y una conversación pendiente que nunca tuvo un buen momento.",
    o: [
      { t: "Aceptarlo y seguir", d: { pareja: "solo", ene: -12, cash: -900, car: 5, msg: "Se termina. Trabajas más que nunca durante seis meses y tus números del año salen bien." } },
      { t: "Pelear por la relación: terapia, menos horas", d: { ene: -4, car: -8, cash: -1500, rep: -2, msg: "Reduces el ritmo y arreglas lo que se podía arreglar. En la oficina lo notan y no todos lo entienden." } },
    ],
  },
  {
    id: 9012, pri: 3, eMin: 27, eMax: 44, una: true, clave: true, cuando: (st) => st.pareja === "casado" && st.hijos === 0,
    t: "Un hijo", clave: true,
    x: "La decisión que más cambia un presupuesto y la que menos se analiza con una hoja de cálculo. Guardería, seguro, espacio, y una redefinición completa de qué significa una noche libre.",
    o: [
      { t: "Adelante", d: { hijos: 1, ene: -10, cash: -3500, rep: 3, msg: "Nace tu primer hijo. Tus gastos fijos suben para siempre y tu escala de prioridades se reordena sola." } },
      { t: "Todavía no", d: { ene: 4, car: 6, msg: "Lo posponen. Es una decisión legítima y también es una decisión, aunque no lo parezca." } },
    ],
  },
  {
    id: 9013, pri: 3, eMin: 30, eMax: 46, cuando: (st) => st.pareja === "casado" && st.hijos >= 1 && st.hijos < 3,
    t: "El segundo", clave: false,
    x: "El primero ya camina. La pregunta vuelve, y esta vez sabes exactamente lo que cuesta, en dinero y en horas de sueño.",
    o: [
      { t: "Otro más", d: { hijos: 1, ene: -12, cash: -3000, msg: "Llega el segundo. La guardería ya no es un gasto, es una segunda hipoteca." } },
      { t: "Con uno está bien", d: { ene: 3, cash: 500, msg: "Se quedan con uno. Menos gasto, menos ruido y una conversación que vuelve cada dos años." } },
    ],
  },
  {
    id: 9014, eMin: 28, eMax: 50, cuando: (st) => st.hijos >= 1,
    t: "El colegio", clave: false,
    x: "Toca elegir. El colegio bueno cuesta lo que un carro al año, cada año, durante doce años. El colegio normal es un colegio normal y probablemente esté bien.",
    o: [
      { t: "El colegio caro, es su futuro", d: { cash: -6000, rep: 4, ene: -4, msg: "Los matriculas en el colegio caro. Es la decisión que más gente toma con el corazón y menos gente recalcula después." } },
      { t: "Colegio público bueno y el resto invertido para ellos", d: { cash: -800, cri: 5, msg: "Eliges lo razonable e inviertes la diferencia a su nombre. En dieciocho años esa diferencia es una carrera universitaria pagada." } },
    ],
  },
  {
    id: 9015, eMin: 29, eMax: 52, una: true,
    t: "Una empresa que no existe", clave: true,
    x: "Te llega por un contacto de confianza: una empresa con rendimientos del 4% mensual, auditada por una firma que nadie conoce y con una web impecable. El contacto lleva dos años cobrando puntual y te enseña los recibos.",
    o: [
      { t: "Meter una parte seria, tu contacto lleva dos años cobrando", chk: { s: "cri", dif: 62 },
        ok: { cri: 8, cash: -400, msg: "Algo te huele mal a última hora y solo metes una cantidad simbólica. Nueve meses después la empresa desaparece con el dinero de todos." },
        no: { cash: -9000, cri: 10, rep: -4, ene: -8, msg: "La empresa desaparece. Tu contacto cobraba puntual porque le pagaban con el dinero de los que entraban después, y tú fuiste de los últimos." } },
      { t: "Pedir el registro mercantil y el nombre del auditor", d: { cri: 8, msg: "Pides papeles verificables. Las respuestas llegan tarde, vagas y con reproches. Eso ya es la respuesta." } },
      { t: "4% mensual no existe. No.", d: { cri: 6, red: -2, msg: "Dices que no y explicas por qué. Dos años después te llaman varios de los que sí entraron." } },
    ],
  },

  /* ---------------- cuarenta ---------------- */
  {
    id: 9020, pri: 1, eMin: 33, eMax: 55, clave: true, cuando: (st) => st.pareja === "casado",
    t: "El desgaste", clave: true,
    x: "Llevan años funcionando como una sociedad logística: turnos, colegio, cuentas. Hace mucho que no hay una conversación que no sea sobre organización.",
    o: [
      { t: "Parar, terapia de pareja, reducir el ritmo laboral", d: { ene: 8, car: -10, cash: -2200, msg: "Frenas. La relación aguanta y tu carrera pierde un año de impulso. Es un intercambio, no un error." } },
      { t: "Seguir así, ya se arreglará", chk: { s: "ene", dif: 55 },
        ok: { ene: -6, msg: "Aguanta. No por lo que hiciste, sino porque la otra persona tuvo más paciencia de la que merecías." },
        no: { pareja: "divorciado", patPct: 0.35, ene: -18, rep: -3, msg: "Divorcio. Además del golpe, se reparte el patrimonio: es el evento que más riqueza destruye en una vida normal." } },
    ],
  },
  {
    id: 9021, eMin: 35, eMax: 58, una: true,
    t: "Tu padre ya no puede solo", clave: true,
    x: "La llamada llega un martes. No es una emergencia médica, es algo peor de gestionar: alguien que siempre se ocupó de todo ahora necesita que alguien se ocupe de él.",
    o: [
      { t: "Traerlo a vivir contigo", d: { cash: -3500, ene: -10, rep: 4, msg: "Se muda contigo. Tus gastos suben, tu energía baja y no te arrepientes ni un día." } },
      { t: "Pagar una residencia buena", d: { cash: -9000, ene: -4, msg: "Pagas la residencia. Es la opción cara y la que te deja seguir trabajando, y la culpa no la cubre ningún seguro." } },
      { t: "Repartirlo entre los hermanos", d: { cash: -3000, ene: -6, red: -3, msg: "Lo reparten. Funciona a medias y saca a la luz cuentas pendientes de hace treinta años." } },
    ],
  },
  {
    id: 9022, eMin: 38, eMax: 60, una: true,
    t: "Se murió", clave: true,
    x: "Alguien cercano, de los que dabas por hecho que iban a estar siempre. No hay decisión financiera aquí, y aun así el año se rompe en dos.",
    o: [
      { t: "Parar todo y estar presente", d: { ene: -14, car: -6, cash: -1800, cri: 4, msg: "Paras. Pierdes un trimestre de carrera y ganas una perspectiva que no se compra." } },
      { t: "Enterrarte en el trabajo", d: { ene: -18, car: 8, rep: 2, msg: "Trabajas más que nunca. Los números del año salen bien y el duelo te va a pasar factura más tarde." } },
    ],
  },
  /* El hueco que reportó el jugador: la escena de noviazgo (9001) es
     «una: true» y su ventana acaba a los 34, y la siguiente para alguien
     solo empezaba a los 36. Entre los 24 y los 36 la vida se apagaba.
     Estas dos son repetibles a propósito: estar solo no es un estado
     terminal, y volver a intentarlo es lo normal. */
  {
    id: 9007, eMin: 25, eMax: 39, pri: 2, cuando: (st) => st.pareja === "solo",
    t: "No es la primera vez que empiezas esto", clave: false,
    x: "Aparece alguien otra vez. Ya sabes cómo va: los primeros meses no cuestan nada y los siguientes se te van en fines de semana, en vuelos y en dejar de decir que sí a todo en la oficina.",
    o: [
      { t: "Intentarlo en serio", d: { pareja: "noviazgo", ene: 9, rep: 2, cash: -800, msg: "Lo intentas otra vez. Duermes mejor y trabajas menos horas, que en este juego es a la vez bueno y caro." } },
      { t: "Verse sin prometer nada", d: { ene: 5, red: 3, cash: -400, msg: "Se ven sin poner nombre a nada. Funciona un tiempo, y un tiempo también es algo." } },
      { t: "No ahora, tienes el año partido en dos", d: { car: 5, ene: -5, cri: 2, msg: "Lo dejas pasar por trabajo. Vuelve a pasar, y la próxima vez no da tanta pereza decir que no." } },
    ],
  },
  {
    id: 9008, eMin: 27, eMax: 44, pri: 2, cuando: (st) => st.pareja === "noviazgo",
    t: "La conversación de los planes", clave: false,
    x: "Llevan tiempo. Aparece la conversación de siempre: dónde van a vivir, si hay hijos en el plan, y quién de los dos va a bajar el pie del acelerador para que eso pase.",
    o: [
      { t: "Poner tú el pie en el freno", d: { car: -3, ene: 12, rep: 2, msg: "Reduces el ritmo tú. La relación va mejor y tu carrera avanza más lento: es el intercambio y lo estás eligiendo." } },
      { t: "Que sea el otro quien lo baje", d: { car: 4, ene: -6, rep: -2, msg: "Sigues a tope y el ajuste lo hace la otra persona. Funciona ahora y se cobra después." } },
      { t: "Buscar la manera de que quepan las dos cosas", j: "orden", stat: "cri",
        d: { ene: 7, cri: 5, red: 3, cash: -1500, msg: "Reorganizan la vida entera para que quepan las dos cosas. Cuesta plata y coordinación." } },
    ],
  },
  {
    id: 9023, eMin: 36, eMax: 62, cuando: (st) => st.pareja === "divorciado" || st.pareja === "solo",
    t: "Empezar otra vez", clave: false,
    x: "Conoces a alguien. A estas alturas tienes un historial, una idea bastante clara de lo que no quieres y bastante más patrimonio que la última vez que hiciste esto.",
    o: [
      { t: "Ir en serio, y esta vez con las cuentas claras", d: { pareja: "casado", ene: 10, red: 4, cash: -2500, cri: 4, msg: "Te vuelves a casar, con capitulaciones y conversaciones que la primera vez no tuviste." } },
      { t: "Sin etiquetas, cada uno con lo suyo", d: { pareja: "noviazgo", ene: 7, msg: "Van despacio. A esta edad la gente que ha visto un divorcio va despacio." } },
      { t: "Estás bien solo", d: { ene: 3, cash: 900, msg: "Prefieres estar solo. Gastas menos, decides más rápido y algunos domingos se hacen largos." } },
    ],
  },
  {
    id: 9024, eMin: 40, eMax: 62, una: true, cuando: (st) => st.hijos >= 1,
    t: "La universidad de tus hijos", clave: true,
    x: "Entró donde quería y está fuera del país. Cuatro años, matrícula y manutención. Puedes pagarlo con lo que tienes invertido o puede pedir un préstamo y pagarlo él.",
    o: [
      { t: "Pagarlo todo tú", d: { cash: -28000, ene: -5, rep: 4, msg: "Lo pagas entero. Es un golpe grande a tu patrimonio y para muchos padres ni siquiera es una decisión." } },
      { t: "Pagar la mitad, la otra mitad la trabaja", d: { cash: -14000, cri: 5, msg: "Pagan a medias. Aprende lo que cuesta y tú no comprometes tu propia jubilación." } },
      { t: "Que pida crédito, tú ya pagaste doce años de colegio", d: { cash: -2000, ene: -4, rep: -3, msg: "Pide crédito. Tienes razón en los números y la conversación de Navidad va a ser incómoda un par de años." } },
    ],
  },
  {
    id: 9025, eMin: 34, eMax: 64,
    t: "El chequeo que llevabas años posponiendo", clave: false,
    x: "No es nada grave. Es tensión alta, colesterol y un médico que usa la palabra 'todavía' más veces de las que te gustaría.",
    o: [
      { t: "Cambiar de vida en serio", d: { ene: 16, car: -5, cash: -1600, msg: "Cambias hábitos. Duermes, entrenas, y tu energía deja de ser el cuello de botella de todo lo demás." } },
      { t: "Tomar la pastilla y seguir igual", d: { ene: -8, cash: -400, msg: "Medicas el síntoma. Funciona hasta que deja de funcionar." } },
    ],
  },

  /* ---------------- estafas y trampas, a cualquier edad ---------------- */
  {
    id: 9030, eMin: 24, eMax: 66,
    t: "Rendimiento garantizado", clave: false,
    x: "Un asesor con oficina bonita te ofrece un producto estructurado con capital garantizado y participación en la subida. Te habla veinte minutos sin decir cuánto cobra él.",
    o: [
      { t: "Preguntar directamente cuánto se lleva él y cómo", d: { cri: 7, msg: "Preguntas por la comisión. Se pone incómodo, y en ese silencio está toda la información que necesitabas." } },
      { t: "Entrar, suena bien y el capital está garantizado", chk: { s: "cri", dif: 48 },
        ok: { cri: 5, cash: -300, msg: "Lees la letra pequeña a tiempo: la garantía solo aplica a vencimiento y a diez años. Sales con una comisión de salida y una lección." },
        no: { cash: -5500, cri: 8, msg: "El producto rinde la mitad que un índice y te cobra tres veces más. La garantía era real y valía mucho menos de lo que costó." } },
    ],
  },
  {
    id: 9031, eMin: 26, eMax: 66,
    t: "Un negocio con un familiar", clave: false,
    x: "Tu cuñado tiene la oportunidad de su vida y le falta capital. Es familia, es de fiar, y no hay contrato porque para qué entre familia.",
    o: [
      { t: "Prestar con contrato, plazo y garantía", d: { cash: -3000, cri: 6, red: -2, msg: "Prestas con papeles. Se ofende dos meses y te paga. Los papeles no protegen del riesgo, protegen la relación." } },
      { t: "Prestar sin papeles, es familia", chk: { s: "red", dif: 55 },
        ok: { cash: -1200, msg: "Te devuelve casi todo, tarde. Salió bien y no fue por cómo lo hiciste." },
        no: { cash: -4500, red: -6, ene: -6, msg: "No te paga. No hay contrato, no hay conversación posible y hay una familia partida en dos." } },
      { t: "No prestar, y ofrecer ayuda de otra forma", d: { red: -3, cri: 5, ene: -2, msg: "Dices que no al dinero y sí al tiempo. Es lo que sostiene la relación a diez años." } },
    ],
  },
  {
    id: 9032, eMin: 25, eMax: 66,
    t: "Te clonaron la identidad", clave: false,
    x: "Aparecen dos créditos a tu nombre que nunca pediste. El banco dice que investigará. Investigar, aquí, significa entre tres y nueve meses.",
    o: [
      { t: "Abogado y denuncia formal desde el día uno", d: { cash: -2200, rep: 3, cri: 4, msg: "Actúas rápido y formal. Recuperas casi todo y tu historial queda limpio antes de que te haga falta." } },
      { t: "Gestionarlo tú por teléfono para ahorrarte el abogado", d: { cash: -3800, ene: -8, msg: "Pierdes ocho meses en llamadas. Al final se resuelve y el ahorro en abogado se lo comió el tiempo." } },
    ],
  },
  {
    id: 9033, eMin: 28, eMax: 66,
    t: "La oportunidad que solo dura hoy", clave: false,
    x: "Un grupo cerrado, una preventa, una ventana de cuarenta y ocho horas y gente que ya está dentro publicando capturas de ganancias. Todo el diseño de la cosa está hecho para que no te dé tiempo de pensar.",
    o: [
      { t: "Dejarlo pasar: la prisa es parte del producto", d: { cri: 8, msg: "No entras. Las oportunidades legítimas rara vez caducan en cuarenta y ocho horas, y las que caducan casi nunca son legítimas." } },
      { t: "Entrar con poco, por si acaso", chk: { s: "cri", dif: 52 },
        ok: { cash: 700, cri: 2, msg: "Sales a tiempo con algo de ganancia. Confundir esto con habilidad es exactamente cómo se pierde más la próxima vez." },
        no: { cash: -3200, cri: 7, msg: "Entras cerca del máximo y no hay a quién venderle después. Así funciona la estructura desde el principio." } },
    ],
  },
  {
    id: 9034, eMin: 30, eMax: 66, una: true,
    t: "Un socio que firmaba por los dos", clave: true,
    x: "En un proyecto paralelo diste poder de firma a alguien de confianza. Aparecen obligaciones a nombre de la sociedad que tú nunca aprobaste y que, legalmente, también son tuyas.",
    o: [
      { t: "Asumir, pagar y disolver limpio", d: { cash: -7000, rep: 3, cri: 8, msg: "Pagas y cierras. Te cuesta caro y sales con el nombre intacto, que en esta industria vale más." } },
      { t: "Pelearlo en tribunales", chk: { s: "rep", dif: 58 },
        ok: { cash: -2500, rep: -2, cri: 6, msg: "Ganas parcialmente después de dos años. Recuperas dinero y pierdes dos años de foco." },
        no: { cash: -9000, rep: -8, ene: -8, msg: "Pierdes el caso y el proceso se hace público. En finanzas los procesos públicos se recuerdan más que las sentencias." } },
    ],
  },

  /* ---------------- cosas buenas, que también pasan ---------------- */
  {
    id: 9040, eMin: 24, eMax: 66,
    t: "Una herencia pequeña", clave: false,
    x: "Una tía que veías poco te deja algo. No es una fortuna, es exactamente la cantidad que puede cambiar tu década o desaparecer en dieciocho meses sin dejar rastro.",
    o: [
      { t: "Invertirla entera y no tocarla", d: { cash: 12000, cri: 6, msg: "La inviertes completa. Es la decisión aburrida y es la que se nota veinte años después." } },
      { t: "Mitad invertida, mitad para vivir", d: { cash: 6000, ene: 8, msg: "Repartes. Disfrutas algo y conservas algo, que es la respuesta humana y no está mal." } },
      { t: "Cambiar el carro", d: { cash: 1000, ene: 10, rep: 3, cri: -3, msg: "Te compras el carro. Te dura tres años de alegría y el resto de la década de depreciación." } },
    ],
  },
  {
    id: 9041, eMin: 30, eMax: 66, cuando: (st) => st.hijos >= 1,
    t: "Tu hijo pregunta cómo funciona el dinero", clave: false,
    x: "Tiene ocho años y quiere saber por qué no puedes comprar todo lo que hay en la tienda si tienes una tarjeta que da dinero.",
    o: [
      { t: "Explicárselo de verdad, con una alcancía y porcentajes", d: { cri: 6, ene: 5, rep: 2, msg: "Te sientas a explicárselo. Es probablemente la mejor inversión financiera que vas a hacer este año." } },
      { t: "\"Cuando seas grande lo entiendes\"", d: { ene: 2, msg: "Lo dejas pasar. Es exactamente lo que hicieron contigo y por eso tuviste que aprender todo esto tarde." } },
    ],
  },
];
