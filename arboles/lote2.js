/* Lote 2: escenas de vida (pareja, amigos, casa, hijos, padres, duelo, estafas).
   Rango de ids 12000-12999. Cada raíz tiene su bloque de 50 ids:
   9001→12000  9002→12050  9003→12100  9004→12150  9010→12200  9011→12250
   9012→12300  9013→12350  9014→12400  9015→12450  9020→12500  9021→12550  9022→12600
   Segundo nivel: base+0..4. Tercer nivel (hojas): base+10, base+11. */
module.exports = {
  huellas: {
    l2_en_serio: "Fuiste en serio con alguien cuando la carrera apretaba",
    l2_carrera_primero: "Elegiste la carrera antes que a alguien que te importaba",
    l2_padrino_completo: "Fuiste a todo en la boda de tu mejor amigo",
    l2_faltaste_boda: "No fuiste a la boda de tu mejor amigo",
    l2_fiador: "Firmaste como fiador de tu mejor amigo",
    l2_ahorraste_en_casa: "Te quedaste en casa de tus padres para ahorrar",
    l2_suerte_importadora: "Ganaste con la importadora de un conocido, por suerte",
    l2_perdiste_importadora: "Perdiste dinero con la importadora de un conocido",
    l2_peleaste_relacion: "Peleaste por tu relación cuando era más fácil soltarla",
    l2_colegio_caro: "Pagaste el colegio caro",
    l2_fondo_hijos: "Invertiste para tus hijos la diferencia del colegio",
    l2_estafado: "Perdiste una parte seria en una estafa piramidal",
    l2_viste_estafa: "Viste venir la estafa del 4% mensual y lo dijiste",
    l2_frenaste_por_pareja: "Frenaste tu carrera para salvar tu pareja",
    l2_padre_en_casa: "Llevaste a tu padre a vivir contigo",
    l2_residencia: "Pagaste una buena residencia para tu padre",
    l2_estuviste: "Paraste todo para despedir a alguien cercano",
    l2_duelo_pendiente: "Enterraste el duelo en el trabajo",
  },

  escenas: [
    /* ───────── 9001 Alguien que te importa ───────── */
    { id: 12000, por: "Fuiste en serio con alguien", t: "Su familia quiere conocerte",
      x: "Almuerzo de domingo con su familia. Te preguntan a qué te dedicas y nadie entiende la respuesta, pero todos asienten.",
      o: [
        { t: "Explicarlo con paciencia y quedarte a la sobremesa", d: { red: 3, ene: -1, msg: "Terminas dibujando un balance en una servilleta. Te despiden con comida para toda la semana." } },
        { t: "Comer rápido y salir corriendo a la oficina", d: { car: 2, red: -3, msg: "Llegas a tiempo a la oficina. En la otra mesa, alguien comenta que trabajas demasiado." } },
      ] },
    { id: 12001, por: "Fuiste en serio con alguien", t: "Una oportunidad en otra ciudad",
      x: "Te sale un trabajo mejor en otra ciudad. Tu pareja no puede mudarse este año y te lo dice sin dramatismo, que es peor.",
      o: [
        { t: "Irte y probar a distancia", d: { car: 5, ene: -3, cash: 2500, msg: "Te vas. Videollamadas de noche, vuelos de viernes y un calendario compartido muy lleno.",
          luego: [{ en: 1, s: "ene", azar: [{ p: 55, id: 12010, bueno: false }, { p: 45, id: 12011, bueno: true }] }] } },
        { t: "Quedarte, no es el momento de irte", d: { car: -3, red: 3, ene: 3, msg: "Te quedas. La oferta se la dan a otro y tú duermes bien casi todas las noches." } },
      ] },
    { id: 12002, por: "Fuiste en serio con alguien", t: "Te dice que te nota ausente",
      x: "Estás en la cena pero contestando correos debajo de la mesa. Tu pareja lo dice en voz baja, una sola vez.",
      o: [
        { t: "Dejar el teléfono en otra habitación desde hoy", d: { ene: 3, car: -1, msg: "Pierdes dos correos urgentes que no eran urgentes. La cena dura el doble y nadie se queja." } },
        { t: "Explicar que es una temporada y que ya pasa", d: { ene: -2, car: 2, msg: "La temporada dura todo el año. Tu pareja deja de sacar el tema, que no es lo mismo que olvidarlo." } },
      ] },
    { id: 12003, por: "Elegiste la carrera antes que a alguien", t: "Te cruzas con esa persona",
      x: "Un café un sábado. Esa persona está en la mesa de al lado, con alguien más, y se ríe como se reía contigo.",
      o: [
        { t: "Saludar con naturalidad y seguir tu día", d: { cri: 2, ene: -1, msg: "Dos minutos de conversación amable. Sales con la sensación de haber hecho algo de adulto." } },
        { t: "Fingir que no viste nada y pagar rápido", d: { ene: -3, msg: "Dejas el café a medias. Pasas la tarde trabajando con una concentración sospechosa." } },
      ] },
    { id: 12004, por: "Elegiste la carrera antes que a alguien", t: "El año más productivo de tu vida",
      x: "Sin nadie esperándote en casa, este año sacaste el doble de trabajo. Lo notan todos, incluido tu espejo.",
      o: [
        { t: "Aprovecharlo y pedir más responsabilidad", d: { car: 4, rep: 2, ene: -4, msg: "Te dan más. Ahora tienes más trabajo y la misma cantidad de gente con quien celebrarlo." } },
        { t: "Usar el impulso para retomar a tus amigos", d: { red: 4, ene: 3, msg: "Vuelves a las cenas de los jueves. Resulta que tus amigos seguían ahí, un poco ofendidos." } },
      ] },
    { id: 12010, por: "Te fuiste a otra ciudad y probaste a distancia", t: "La distancia pesa",
      x: "Ya no hay videollamada todas las noches. Hay mensajes cortos, un vuelo cancelado y una pregunta que nadie hace.",
      o: [
        { t: "Pagar vuelos cada dos semanas, cueste lo que cueste", d: { cash: -3000, ene: -2, red: 2, msg: "Te gastas medio sueldo en aeropuertos. La relación respira, tu cuenta no tanto." } },
        { t: "Hablarlo de frente y poner una fecha de regreso", d: { cri: 3, ene: 1, msg: "La conversación es difícil y corta. Al final hay un plan, que es más de lo que había." } },
      ] },
    { id: 12011, por: "Te fuiste a otra ciudad y probaste a distancia", t: "La distancia funciona",
      x: "Contra todas las estadísticas, aguanta. Cada visita parece un fin de semana robado y hablan más que cuando vivían cerca.",
      o: [
        { t: "Disfrutarlo sin preguntar cuánto dura", d: { ene: 4, msg: "No lo analizas. Por una vez en tu vida, algo funciona y no le haces un modelo." } },
        { t: "Ahorrar para que el próximo paso sea fácil", d: { cri: 2, cash: 1500, msg: "Abres una cuenta con un nombre cursi. Crece despacio y tú la miras con cariño." } },
      ] },

    /* ───────── 9002 La boda de tu mejor amigo ───────── */
    { id: 12050, por: "Fuiste a la boda de tu mejor amigo", t: "Un invitado te escribe",
      x: "Uno de los invitados de la boda te busca. Tiene una empresa familiar y quiere tu opinión antes de vender una parte.",
      o: [
        { t: "Ayudarle gratis, por el buen recuerdo", d: { red: 5, ene: -2, msg: "Le dedicas dos tardes. Te lo agradece con una botella y con tu nombre en tres conversaciones." } },
        { t: "Cobrarle como a un cliente cualquiera", d: { cash: 2500, red: -1, rep: 1, msg: "Acepta sin pestañear. Te paga a tiempo y no te vuelve a invitar a nada." } },
        { t: "Pasarlo con amabilidad, no tienes tiempo", d: { ene: 1, msg: "Le das el nombre de otro. Nadie se ofende y nadie se acuerda de ti." } },
      ] },
    { id: 12051, por: "Fuiste a todo en la boda de tu mejor amigo", t: "El grupo de la despedida",
      x: "El chat de la despedida no murió. Ahora organizan un viaje cada año y dan por hecho que vas.",
      o: [
        { t: "Ir, es lo único fijo en tu calendario", d: { cash: -2000, red: 3, ene: 4, msg: "Cuatro días sin correo. Vuelves con la piel quemada y dos contactos que no buscabas." } },
        { t: "Ir solo un día y volver a trabajar", d: { cash: -800, red: 1, car: 1, msg: "Llegas, cenas, te vas. Te ponen un apodo nuevo y no es halagador." } },
        { t: "Salirte del chat con una excusa", d: { ene: 1, red: -4, msg: "Ganas silencio en el teléfono. El grupo sigue sin ti y se nota menos de lo que esperabas." } },
      ] },
    { id: 12052, por: "Fuiste a la boda de tu mejor amigo", t: "Tu amigo necesita un fiador",
      x: "Tu mejor amigo va a comprar su primera casa. El banco le pide un fiador y tú eres el primero al que llama.",
      o: [
        { t: "Firmar como fiador", d: { red: 4, deja: "l2_fiador", msg: "Firmas. Te abraza en la puerta del banco y tú lees la letra pequeña en el carro.",
          luego: [{ en: 2, azar: [{ p: 65, id: 12060, bueno: true }, { p: 35, id: 12061, bueno: false }] }] } },
        { t: "Ofrecerle un préstamo pequeño en vez de firmar", d: { cash: -2000, cri: 2, red: 1, msg: "No es lo que pedía pero le alcanza para la cuota inicial. Lo acepta con media sonrisa." } },
        { t: "Decirle que no, con todo el cariño", d: { cri: 2, red: -3, msg: "Lo entiende, dice. Consigue otro fiador y tarda unos meses en volver a llamarte." } },
      ] },
    { id: 12053, por: "No fuiste a la boda de tu mejor amigo", t: "Ya no te escriben para todo",
      x: "Te enteras por las fotos de un viaje del grupo al que nadie te invitó. No hubo pelea, solo distancia.",
      o: [
        { t: "Llamar a tu amigo y hablarlo", d: { red: 3, ene: -1, msg: "Es incómodo diez minutos y bueno el resto. Quedan en verse, y esta vez lo cumplen." } },
        { t: "Dejar que se enfríe, así es la vida", d: { red: -3, car: 1, msg: "Te concentras en el trabajo. Algunos domingos miras el chat del grupo y no escribes." } },
      ] },
    { id: 12054, por: "Decidiste cómo estar en la boda de tu amigo", t: "Tu amigo te llama a medianoche",
      x: "Su matrimonio va mal y eres la primera persona a la que llama. No quiere consejos financieros, quiere hablar.",
      o: [
        { t: "Escucharlo toda la noche", d: { ene: -3, red: 4, msg: "Amanece y siguen hablando. No arreglas nada y aun así te da las gracias tres veces." } },
        { t: "Pasarle el contacto de un buen terapeuta", d: { cri: 2, red: 1, msg: "Le das el número y un abrazo por teléfono. Lo usa, y luego te lo agradece." } },
      ] },
    { id: 12060, por: "Firmaste como fiador de tu mejor amigo", t: "Tu amigo paga a tiempo",
      x: "Dos años de cuotas puntuales. El banco te manda una carta para decir que tu firma ya no hace falta.",
      o: [
        { t: "Celebrarlo con tu amigo", d: { red: 3, ene: 2, cash: -500, msg: "Te invita a cenar en la casa que ayudaste a comprar. Te sientas en el mejor sitio." } },
        { t: "Prometerte no volver a firmar por nadie", d: { cri: 3, msg: "Salió bien, y aun así no lo repetirías. Esa es la lección que de verdad aprendiste." } },
      ] },
    { id: 12061, por: "Firmaste como fiador de tu mejor amigo", t: "El banco te llama a ti",
      x: "Tu amigo perdió el trabajo y lleva tres cuotas sin pagar. El banco, que no es tu amigo, te llama a ti.",
      o: [
        { t: "Pagar tú las cuotas mientras se recupera", d: { cash: -6000, red: 3, msg: "Pagas sin decir nada. Tu amigo lo sabe y no puede mirarte a los ojos durante meses." } },
        { t: "Sentarte con él a renegociar con el banco", d: { cash: -2000, cri: 3, ene: -2, msg: "Consiguen alargar el plazo. Pagas una parte y él el resto, despacio." } },
        { t: "Exigirle que venda la casa", d: { cri: 1, red: -6, msg: "Tienes razón y la tienes sola. La amistad no sobrevive a esa conversación." } },
      ] },

    /* ───────── 9003 Irte a vivir solo ───────── */
    { id: 12100, por: "Te mudaste a tu propio espacio", t: "El dueño quiere vender",
      x: "El dueño del apartamento lo pone en venta y te ofrece comprarlo antes que a nadie, a un precio que llama amistoso.",
      o: [
        { t: "Comprarlo con un crédito", d: { cash: -8000, cri: 1, ene: -2, msg: "Firmas la hipoteca. Ahora el apartamento es tuyo y las goteras también." } },
        { t: "Buscar otro alquiler", d: { cash: -1500, ene: -3, msg: "Tres fines de semana de visitas y una mudanza. El nuevo es más pequeño y más caro." } },
        { t: "Negociar quedarte con el nuevo dueño", d: { cri: 2, cash: -500, msg: "El comprador es un inversor que solo quiere el alquiler. Te suben un poco y te quedas." } },
      ] },
    { id: 12101, por: "Te mudaste a tu propio espacio", t: "Gotea en tu cocina",
      x: "Al vecino de arriba se le rompió una tubería. El agua baja por tu pared y el vecino no contesta el timbre.",
      o: [
        { t: "Pagar tú la reparación y cobrarle después", d: { cash: -1500, ene: -2, msg: "Lo arreglas en un día. Cobrarle te lleva cuatro meses y un poco de dignidad." } },
        { t: "Llamar a la administración del edificio", d: { ene: -3, cri: 1, msg: "Tres semanas de correos y una mancha en forma de continente. Al final lo paga el seguro." } },
      ] },
    { id: 12102, por: "Te quedaste en casa de tus padres para ahorrar", t: "Tu ahorro tiene nombre",
      x: "Juntaste lo que no vas a volver a juntar tan rápido. Ahora hay que decidir qué hacer con eso.",
      o: [
        { t: "Invertirlo todo en un fondo indexado", d: { cri: 3, msg: "Lo metes en un fondo amplio y barato. Te prometes no mirarlo cada día y lo miras cada día.",
          luego: [{ en: 2, s: "cri", azar: [{ p: 40, id: 12110, bueno: false }, { p: 60, id: 12111, bueno: true }] }] } },
        { t: "Gastar una parte en el viaje que pospusiste", d: { cash: -3000, ene: 6, msg: "Un mes fuera. Vuelves con menos ahorro y con la cabeza mucho más ordenada." } },
        { t: "Dejarlo en el banco por si acaso", d: { cri: -1, msg: "Ahí queda, seguro y quieto. La inflación se lo va comiendo con buenos modales." } },
      ] },
    { id: 12103, por: "Decidiste dónde vivir mientras arrancabas", t: "Tu madre se operó de la rodilla",
      x: "Nada grave, pero alguien tiene que llevarla a los controles cada semana y en la familia nadie más puede.",
      o: [
        { t: "Llevarla tú, una mañana por semana", d: { ene: -3, red: 2, car: -1, msg: "Las mañanas de hospital se vuelven las mejores conversaciones que han tenido en años." } },
        { t: "Pagar un taxi de confianza", d: { cash: -800, ene: 1, msg: "El taxista se vuelve amigo de la familia. Tu madre te cuenta más de él que de ti." } },
      ] },
    { id: 12104, por: "Te quedaste en casa de tus padres para ahorrar", t: "El cuarto se quedó pequeño",
      x: "Trajiste a alguien a cenar y tu padre salió en pijama a contar una anécdota tuya de la infancia.",
      o: [
        { t: "Reírte y seguir con el plan", d: { ene: 1, cri: 1, msg: "Te queda un año de ahorro. La anécdota se vuelve leyenda entre tus amigos." } },
        { t: "Adelantar la mudanza", d: { cash: -2500, ene: 4, msg: "Te vas antes de lo previsto. El ahorro queda a medias y la dignidad entera." } },
      ] },
    { id: 12110, por: "Invertiste tu ahorro en un fondo indexado", t: "El mercado se cae justo después",
      x: "Tres meses después de entrar, el mercado baja un cuarto. Tu ahorro de dos años vale mucho menos en la pantalla.",
      o: [
        { t: "No tocar nada y apagar la aplicación", d: { cri: 5, ene: -2, msg: "Sufres en silencio. Un año y medio después está donde estaba, y tú has aprendido algo." } },
        { t: "Vender antes de que baje más", d: { cash: -3000, cri: -3, msg: "Vendes cerca del fondo. Dos meses después sube, sin ti dentro." } },
      ] },
    { id: 12111, por: "Invertiste tu ahorro en un fondo indexado", t: "Sube como en los folletos",
      x: "Dos años buenos seguidos. Lo que juntaste en casa de tus padres ya hace su propio trabajo.",
      o: [
        { t: "Seguir aportando cada mes", d: { cri: 3, cash: 2000, msg: "Lo vuelves rutina. El interés compuesto es aburrido y por eso funciona." } },
        { t: "Sacar la ganancia y darte un gusto", d: { cash: 3000, ene: 3, msg: "Te compras algo que llevabas años mirando. Lo disfrutas y el fondo sigue ahí." } },
      ] },

    /* ───────── 9004 El negocio de un conocido ───────── */
    { id: 12150, por: "Ganaste con la importadora de un conocido", t: "Te invita a la segunda ronda",
      x: "Tu amigo del gimnasio vuelve: la importadora crece y quiere que metas el triple. Sigue sin haber balances.",
      o: [
        { t: "Meter el triple, ya funcionó una vez", d: { cash: -6000, cri: -2, msg: "Transfieres. Él te manda un audio de agradecimiento de cuatro minutos.",
          luego: [{ en: 1, azar: [{ p: 60, id: 12160, bueno: false }, { p: 40, id: 12161, bueno: true }] }] } },
        { t: "Ahora sí, pedir estados financieros", d: { cri: 4, red: -1, msg: "Pide una semana para mandarlos. Pasan seis y no llegan, y eso ya es un estado financiero." } },
        { t: "Retirarte con la ganancia", d: { cri: 3, msg: "Le das las gracias y te bajas del tren. Dormir bien también es un rendimiento." } },
      ] },
    { id: 12151, por: "Te ofrecieron entrar en la importadora", t: "Te ofrecen otro negocio parecido",
      x: "Otro conocido te trae algo muy similar: urgencia, fotos de un depósito y ningún balance. Dice que te lo ofrece por ser tú.",
      o: [
        { t: "Entrar con algo pequeño", d: { cash: -2500, cri: -3, msg: "Metes poco. Seis meses después no sabes si existe el depósito de las fotos." } },
        { t: "Pedir papeles antes de hablar de dinero", d: { cri: 3, red: -1, msg: "Te manda otro PDF con más fotos. Lo tomas como un no." } },
        { t: "Decir que no y cambiar de tema", d: { cri: 2, ene: 1, msg: "No das explicaciones. Te ahorras dinero y una conversación de una hora." } },
      ] },
    { id: 12152, por: "Perdiste dinero con la importadora de un conocido", t: "Lo ves en el gimnasio",
      x: "Tu amigo volvió al gimnasio como si nada. Te saluda de lejos, entre dos series de pecho.",
      o: [
        { t: "Reclamarle delante de todos", d: { rep: -2, ene: -2, msg: "Se pone rojo y promete pagarte. Todo el gimnasio se entera, el dinero no aparece." } },
        { t: "Pedirle un plan de pago por escrito", d: { cash: 1000, cri: 2, msg: "Firma un papel. Paga dos cuotas y luego desaparece, pero algo recuperaste." } },
        { t: "Cambiarte de gimnasio", d: { ene: -1, cash: -300, msg: "Pagas una inscripción nueva para no verlo. Es la tarifa más cara que has pagado por evitar a alguien." } },
      ] },
    { id: 12153, por: "Perdiste dinero con la importadora de un conocido", t: "Los demás afectados",
      x: "Hay un grupo de gente que también perdió. Quieren demandar y piden que cada uno ponga su parte para el abogado.",
      o: [
        { t: "Sumarte y poner tu parte", d: { cash: -1000, red: 2, msg: "El juicio avanza a paso de tortuga. Ganas compañeros de desgracia, de momento nada más." } },
        { t: "No poner más dinero en lo perdido", d: { cri: 3, msg: "Lo das por perdido. Es la decisión más racional del año y la que más te cuesta." } },
      ] },
    { id: 12154, por: "No metiste dinero en la importadora", t: "El que sí entró",
      x: "La importadora del gimnasio se hundió. Un conocido que sí metió dinero te pregunta cómo lo viste venir.",
      o: [
        { t: "Explicarle qué mirar la próxima vez", d: { rep: 3, red: 2, msg: "Le das tres preguntas que nadie hizo. Las repite a todo el mundo, con tu nombre." } },
        { t: "Ofrecerte a revisar su próximo negocio", d: { red: 3, ene: -2, msg: "Te manda cinco en un mes. Descubres que mucha gente vive a un PDF de perder sus ahorros." } },
      ] },
    { id: 12160, por: "Metiste el triple en la importadora", t: "La segunda ronda se hunde",
      x: "Un contenedor retenido en aduana y una explicación cada vez más larga. Tu amigo ya no manda audios.",
      o: [
        { t: "Contratar un abogado", d: { cash: -1500, cri: 1, ene: -3, msg: "El abogado te explica que sin contrato poco hay que hacer. Te cobra por explicártelo." } },
        { t: "Aceptarlo y anotar la lección", d: { cri: 4, ene: -1, msg: "Perdiste lo que ganaste y más. Ahora sabes distinguir la suerte del criterio, y salió caro." } },
      ] },
    { id: 12161, por: "Metiste el triple en la importadora", t: "Sale otra vez, de milagro",
      x: "Contra toda lógica, la importadora vuelve a pagar. Tu amigo te llama inversor estrella y ya prepara la tercera ronda.",
      o: [
        { t: "Cobrar todo y no volver jamás", d: { cash: 9000, cri: 4, msg: "Sacas todo. Es la mejor decisión que tomaste en este negocio y la única con criterio." } },
        { t: "Dejarlo dentro para la tercera", d: { cash: 2000, cri: -4, msg: "Cobras una parte y dejas el resto. Tu amigo te abraza con demasiada fuerza." } },
      ] },

    /* ───────── 9010 La conversación ───────── */
    { id: 12200, por: "Decidiste casarte", t: "La cuenta común",
      x: "Ya casados, toca decidir: todo junto, todo separado o un poco de cada cosa. Ninguno de los dos quiere parecer tacaño.",
      o: [
        { t: "Todo junto, sin llevar cuentas", d: { ene: 2, red: 1, msg: "Una sola cuenta, una sola tarjeta. Funciona de maravilla hasta el primer gasto que no se consultó.",
          luego: [{ en: 1, azar: [{ p: 45, id: 12210, bueno: false }, { p: 55, id: 12211, bueno: true }] }] } },
        { t: "Cuenta común para la casa, el resto separado", d: { cri: 3, msg: "Un porcentaje de cada sueldo a la cuenta común. Es aburrido y elimina tres discusiones al mes." } },
        { t: "Separado del todo, cada uno lo suyo", d: { cri: 1, ene: -2, msg: "Cada uno paga lo suyo. Dividen la cuenta del supermercado con calculadora y se ríen, casi siempre." } },
      ] },
    { id: 12201, por: "Tuviste la conversación con tu pareja", t: "Comprar casa juntos",
      x: "Aparece un apartamento que les encanta. El banco pregunta a nombre de quién va y quién pone qué.",
      o: [
        { t: "A nombre de los dos, mitad y mitad", d: { cash: -6000, cri: 1, ene: 2, msg: "Firman los dos. La cuota se reparte y el miedo también." } },
        { t: "Un documento que diga quién puso qué", d: { cash: -6500, cri: 4, ene: -1, msg: "El notario cobra aparte y la conversación es incómoda. Dentro de diez años alguien lo va a agradecer." } },
        { t: "Seguir alquilando un tiempo más", d: { cri: 1, ene: -2, msg: "No compran. El apartamento se vende en dos semanas y sale en conversaciones durante años." } },
      ] },
    { id: 12202, por: "Seguiste con tu pareja sin firmar nada", t: "El tema vuelve",
      x: "Volviendo de la boda de unos amigos, silencio en el carro. Tu pareja vuelve a sacar el tema, esta vez sin sonreír.",
      o: [
        { t: "Decir lo que piensas de verdad", d: { cri: 2, ene: -2, red: 1, msg: "Hablan hasta tarde. No llegan a nada concreto, pero ya no hay nada sin decir." } },
        { t: "Prometer hablarlo en serio este año", d: { ene: -1, msg: "Lo apuntas mentalmente. Tu pareja lo apunta en el calendario." } },
        { t: "Cambiar de tema con un chiste", d: { ene: -4, red: -1, msg: "El chiste no da risa. El resto del viaje es largo." } },
      ] },
    { id: 12203, por: "Dejaste una relación de años", t: "Tu ex en la misma fiesta",
      x: "Un cumpleaños de amigos en común. Tu ex llega, saluda a todos y se sienta en la otra punta de la mesa.",
      o: [
        { t: "Saludar y quedarte toda la noche", d: { red: 2, ene: -1, cri: 1, msg: "Es raro una hora y luego no tanto. Los amigos en común respiran aliviados." } },
        { t: "Irte temprano con una excusa", d: { ene: -1, red: -2, msg: "Te vas antes del pastel. Los amigos dejan de invitarte a las dos cosas a la vez." } },
      ] },
    { id: 12204, por: "Dejaste una relación de años", t: "El año del trabajo",
      x: "Te volcaste en el trabajo. Los números salen y tú no tanto: duermes poco y comes delante de la pantalla.",
      o: [
        { t: "Tomarte unas vacaciones de verdad", d: { cash: -2000, ene: 6, msg: "Dos semanas sin correo. Vuelves y nadie se murió, que era lo que temías." } },
        { t: "Seguir apretando, funciona", d: { car: 4, ene: -5, msg: "El trabajo te lo agradece. Tu espalda, tu sueño y tus amigos tienen otra opinión." } },
        { t: "Volver a salir con tus amigos", d: { red: 3, ene: 3, msg: "Te reciben sin preguntas. Descubres que también sabes hablar de cosas que no son trabajo." } },
      ] },
    { id: 12210, por: "Pusiste todo en una cuenta común", t: "Un gasto que nadie consultó",
      x: "Llega el estado de cuenta: una bicicleta que cuesta lo que un mes de alquiler. Tu pareja dice que era una inversión en salud.",
      o: [
        { t: "Fijar un monto libre para cada uno", d: { cri: 3, ene: 1, msg: "Cada uno tiene su parte para caprichos sin preguntas. La bicicleta queda como precedente." } },
        { t: "Comprarte tú algo del mismo precio", d: { cash: -2500, ene: -2, msg: "Empate técnico. Ahora tienen una bicicleta, un reloj y una discusión pendiente." } },
      ] },
    { id: 12211, por: "Pusiste todo en una cuenta común", t: "El ahorro conjunto crece",
      x: "Con dos sueldos en la misma cuenta y nadie llevando la cuenta, el ahorro sube más rápido que cualquier plan que hiciste solo.",
      o: [
        { t: "Ponerle un objetivo y un plazo", d: { cri: 3, cash: 2000, msg: "Lo llaman fondo de libertad. Crece y les da una tranquilidad difícil de explicar." } },
        { t: "Usarlo para un viaje largo juntos", d: { cash: -2000, ene: 6, red: 1, msg: "Tres semanas lejos. Vuelven con menos ahorro y con historias para años." } },
      ] },

    /* ───────── 9011 Se rompió ───────── */
    { id: 12250, por: "Aceptaste que tu relación se terminó", t: "Quedó una caja con sus cosas",
      x: "Unos libros, una chaqueta, un cargador. Tu ex escribe para pasar a buscarla y pregunta si estarás en casa.",
      o: [
        { t: "Entregarla en persona", d: { ene: -2, cri: 2, msg: "Cinco minutos en la puerta. Duele menos de lo que pensabas y más de lo que admites." } },
        { t: "Dejarla en la portería", d: { ene: 1, msg: "Te ahorras el momento. El portero te mira como si supiera todo, porque lo sabe." } },
      ] },
    { id: 12251, por: "Aceptaste que tu relación se terminó", t: "Seis meses de oficina",
      x: "Trabajaste como nunca. Tu rendimiento se nota y tu cuerpo también: duermes cuatro horas y el café ya no hace efecto.",
      o: [
        { t: "Bajar el ritmo antes de que se rompa algo", d: { ene: 5, car: -1, msg: "Vuelves a salir a una hora normal. Los números bajan un poco y tú subes bastante." } },
        { t: "Aprovechar el impulso", d: { car: 4, ene: -5, msg: "Sigues a fondo. Te va bien, y lo celebras trabajando un domingo más.",
          luego: [{ en: 1, s: "ene", azar: [{ p: 55, id: 12260, bueno: false }, { p: 45, id: 12261, bueno: true }] }] } },
      ] },
    { id: 12252, por: "Aceptaste que tu relación se terminó", t: "Un mensaje a la una de la mañana",
      x: "Tu ex escribe: ¿cómo estás? Nada más. Lo lees tres veces y ves que sigue en línea.",
      o: [
        { t: "Contestar con cariño y nada más", d: { cri: 2, ene: -1, msg: "Dos mensajes amables y buenas noches. No abres nada que no se pueda cerrar." } },
        { t: "No contestar", d: { ene: -2, msg: "Dejas el mensaje en visto. Duermes mal, pero duermes." } },
      ] },
    { id: 12253, por: "Peleaste por tu relación", t: "La tarea de la terapia",
      x: "La terapeuta les pide algo raro: una cena por semana sin hablar de logística. Ni cuentas, ni horarios, ni compras.",
      o: [
        { t: "Cumplirla aunque haya una entrega", d: { ene: 4, car: -2, msg: "La primera cena es incómoda. La cuarta es la mejor conversación que han tenido en años." } },
        { t: "Cancelar la primera por trabajo", d: { ene: -3, car: 1, msg: "Tu pareja no dice nada. La terapeuta, en la siguiente sesión, sí." } },
      ] },
    { id: 12254, por: "Peleaste por tu relación", t: "En la oficina lo notan",
      x: "Sales temprano dos veces por semana. Alguien comenta en voz alta que ya no te comprometes como antes.",
      o: [
        { t: "Explicarlo sin dar detalles", d: { rep: 1, ene: 1, msg: "Dices que es personal y que entregas igual. Lo demuestras, y el comentario se apaga." } },
        { t: "Compensar trabajando los fines de semana", d: { car: 2, ene: -5, msg: "Recuperas las horas y pierdes los sábados. Era justo lo que la terapia intentaba arreglar." } },
        { t: "No dar explicaciones", d: { rep: -2, ene: 2, msg: "Sigues saliendo temprano. Hay rumores, pero tu casa está mejor que nunca." } },
      ] },
    { id: 12260, por: "Seguiste a fondo después de la ruptura", t: "El cuerpo pasa factura",
      x: "Un mareo en una reunión. El médico te dice que tu tensión es la de alguien que te dobla la edad.",
      o: [
        { t: "Hacerle caso al médico de verdad", d: { ene: 6, car: -3, cash: -1000, msg: "Dieta, ejercicio, horarios. Es aburrido y funciona." } },
        { t: "Tomarte las pastillas y seguir igual", d: { ene: -6, car: 2, msg: "Las pastillas ayudan. El problema sigue ahí, con mejores números." } },
      ] },
    { id: 12261, por: "Seguiste a fondo después de la ruptura", t: "El impulso se convierte en reputación",
      x: "Un año a fondo dejó huella: ahora eres la persona a la que le pasan los casos difíciles. Y tienes fuerzas para ello, por ahora.",
      o: [
        { t: "Aceptar el papel y pedir que se pague", d: { rep: 3, cash: 3000, msg: "Te pagan como a quien resuelve. El cuerpo aguanta, y tú le pones fecha de revisión." } },
        { t: "Usar la reputación para trabajar menos", d: { ene: 5, rep: 1, msg: "Eliges los casos. Trabajas menos horas y te valoran más, que es el truco que nadie enseña." } },
      ] },

    /* ───────── 9012 Un hijo ───────── */
    { id: 12300, por: "Tuviste tu primer hijo", t: "Las noches",
      x: "Lleva tres meses durmiendo a ratos. Tú también. En la reunión de la mañana lees el mismo párrafo cuatro veces.",
      o: [
        { t: "Turnos estrictos con tu pareja", d: { ene: 2, cri: 1, msg: "Uno duerme, el otro vela. Se ven poco, pero los dos funcionan." } },
        { t: "Pagar ayuda de noche dos veces por semana", d: { cash: -2500, ene: 5, msg: "Dos noches enteras de sueño por semana. Es el gasto con mejor rendimiento del año." } },
        { t: "Aguantar a pulso", d: { ene: -6, car: 1, msg: "Aguantas. Un día te duermes en el carro, en el estacionamiento de la oficina." } },
      ] },
    { id: 12301, por: "Tuviste tu primer hijo", t: "La guardería tiene lista de espera",
      x: "La buena tiene un año de espera. La que tiene cupo está a cuarenta minutos y huele a cloro.",
      o: [
        { t: "Pagar la reserva en la buena", d: { cash: -2000, ene: -2, msg: "Pagas por un cupo que aún no existe. Mientras tanto, hacen malabares con los horarios." } },
        { t: "La que tiene cupo", d: { ene: -3, cash: -500, msg: "Ochenta minutos de carro al día. Te aprendes de memoria todos los programas de radio." } },
        { t: "Pedir ayuda a los abuelos", d: { red: 2, ene: 2, msg: "Los abuelos dicen que sí encantados. Ahora también opinan de todo, encantados." } },
      ] },
    { id: 12302, por: "Tuviste tu primer hijo", t: "El seguro de vida",
      x: "Alguien depende de ti por primera vez. El corredor te enseña tres planes y uno tiene un folleto mucho más bonito.",
      o: [
        { t: "Seguro a término, simple y barato", d: { cash: -500, cri: 4, msg: "Cubre lo que tiene que cubrir y nada más. El corredor pierde interés en ti al instante." } },
        { t: "El plan con ahorro incluido, el del folleto", d: { cash: -2500, cri: -1, msg: "Firmas el bonito. Promete proteger y ahorrar a la vez, que suele significar ninguna de las dos.",
          luego: [{ en: 3, s: "cri", azar: [{ p: 65, id: 12310, bueno: false }, { p: 35, id: 12311, bueno: true }] }] } },
        { t: "Dejarlo para más adelante", d: { cri: -3, msg: "Lo dejas para cuando haya tiempo. Nunca hay tiempo, y eso también lo sabes." } },
      ] },
    { id: 12303, por: "Decidiste esperar para tener un hijo", t: "La pregunta en cada cena",
      x: "En las cenas familiares ya nadie pregunta directamente. Solo hay suspiros cada vez que pasa un bebé.",
      o: [
        { t: "Explicar que es una decisión de los dos", d: { cri: 2, ene: -1, msg: "Lo dices claro una vez. Los suspiros bajan de volumen, que no es lo mismo que parar." } },
        { t: "Cambiar de tema con humor", d: { ene: 1, msg: "Haces un chiste sobre la guardería. Se ríen y en la siguiente cena vuelven a suspirar." } },
      ] },
    { id: 12304, por: "Decidiste esperar para tener un hijo", t: "Un año que es solo de ustedes",
      x: "Sin pañales que comprar, les sobra tiempo y algo de dinero. Tu pareja propone usarlo antes de que se escape.",
      o: [
        { t: "Hacer el viaje largo que siempre dijeron", d: { cash: -3000, ene: 6, msg: "Un mes fuera. Vuelven con fotos, ideas y la sensación de haberse elegido otra vez." } },
        { t: "Invertir la diferencia", d: { cri: 3, cash: 2000, msg: "Lo metes en un fondo. Te sientes muy sensato y un poco aburrido." } },
        { t: "Usar las noches para un máster", d: { mod: 4, cri: 2, ene: -3, cash: -2000, msg: "Clases tres noches por semana. Aprendes mucho y ves a tu pareja en los recreos." } },
      ] },
    { id: 12310, por: "Firmaste el seguro con ahorro incluido", t: "Lees la letra pequeña",
      x: "Tres años después pides el valor de rescate. Las comisiones se comieron casi todo lo que aportaste.",
      o: [
        { t: "Cancelarlo y pasarte a uno simple", d: { cash: -1500, cri: 4, msg: "Pierdes lo que ya perdiste y dejas de perder más. Es la única salida que tiene sentido." } },
        { t: "Mantenerlo, ya pagaste lo peor", d: { cri: -2, msg: "Te dices que ahora sí va a rendir. El corredor te manda un chocolate en Navidad." } },
      ] },
    { id: 12311, por: "Firmaste el seguro con ahorro incluido", t: "El plan resultó decente",
      x: "Revisas el estado y, sorpresa, rinde algo. No es una maravilla, pero el seguro está y el ahorro también.",
      o: [
        { t: "Dejarlo como está", d: { cri: 1, ene: 1, msg: "No era la mejor opción, pero no fue la peor. Con eso alcanza este año." } },
        { t: "Comparar con otras opciones antes de seguir", d: { cri: 3, ene: -1, msg: "Haces la tabla. Sigues con el plan, pero ahora sabes por qué." } },
      ] },

    /* ───────── 9013 El segundo ───────── */
    { id: 12350, por: "Tuviste un segundo hijo", t: "Los celos del mayor",
      x: "El mayor decidió que él también es un bebé. Vuelve a despertarse de noche y a pedir el biberón.",
      o: [
        { t: "Una tarde por semana solo para el mayor", d: { ene: -2, red: 1, cri: 2, msg: "Cada miércoles, helado y parque con el mayor. A la tercera semana ya duerme mejor." } },
        { t: "Esperar a que se le pase", d: { ene: -4, msg: "Se le pasa, en algún momento. Mientras tanto, nadie en casa duerme." } },
      ] },
    { id: 12351, por: "Tuviste un segundo hijo", t: "El carro ya no alcanza",
      x: "Dos sillas de bebé atrás y no cabe nada más. Para ir a la playa hay que dejar algo, o a alguien.",
      o: [
        { t: "Uno nuevo a crédito", d: { cash: -6000, ene: 2, msg: "Huele a nuevo durante una semana. Luego huele a galleta, como todos." } },
        { t: "Uno usado y bien revisado", d: { cash: -2500, cri: 3, msg: "Un mecánico de confianza le da el visto bueno. Es feo y perfecto." } },
        { t: "Aguantar con el que hay", d: { ene: -3, msg: "Aprendes a cargar el maletero como un rompecabezas. Ya no van a la playa." } },
      ] },
    { id: 12352, por: "Tuviste un segundo hijo", t: "Uno de los dos baja el ritmo",
      x: "Con dos en guardería, las cuentas dicen que a uno de los dos le sale casi gratis trabajar menos horas.",
      o: [
        { t: "Reducir tú la jornada", d: { car: -5, ene: 5, cash: -3000, msg: "Trabajas menos y ves más. Tu carrera se frena y tus hijos te reconocen de lejos." } },
        { t: "Que la reduzca tu pareja", d: { car: 2, ene: 1, red: -1, msg: "Tu pareja baja el ritmo. Tú sigues a fondo y alguien en casa lleva la cuenta." } },
        { t: "Seguir los dos a tope y pagar", d: { cash: -4000, ene: -4, msg: "Pagan guardería, niñera y comida a domicilio. Se ven en los pasillos." } },
      ] },
    { id: 12353, por: "Decidiste quedarte con un hijo", t: "Hijo único, todo para él",
      x: "Con uno, alcanza para natación, inglés, música y robótica. Él no pidió ninguna y ya no tiene tardes libres.",
      o: [
        { t: "Recortar a una actividad que elija él", d: { cash: 1000, cri: 2, ene: 2, msg: "Elige fútbol, que no estaba en la lista. Es el más feliz del equipo." } },
        { t: "Mantenerlas todas, es su futuro", d: { cash: -2000, ene: -2, msg: "Lo llevas de una clase a otra. Él aprende cuatro cosas y a dormirse en el carro." } },
      ] },
    { id: 12354, por: "Decidiste quedarte con un hijo", t: "El tiempo que quedó libre",
      x: "Con uno, los fines de semana vuelven a tener huecos. Una universidad te ofrece dar clases los sábados.",
      o: [
        { t: "Aceptar las clases", d: { rep: 4, red: 3, ene: -3, cash: 1500, msg: "Das clases a gente con más energía que tú. Algunos terminan trabajando contigo." } },
        { t: "Guardar los sábados para la familia", d: { ene: 4, red: 1, msg: "Los sábados son de parque y desayuno largo. No lo cambias por nada." } },
      ] },

    /* ───────── 9014 El colegio ───────── */
    { id: 12400, por: "Pagaste el colegio caro", t: "La cuota voluntaria",
      x: "El colegio anuncia un edificio nuevo. Lo pagan los padres con una cuota especial que llaman voluntaria y nadie se atreve a no pagar.",
      o: [
        { t: "Pagarla", d: { cash: -3000, red: 2, msg: "Pagas. En la placa del edificio no sale tu nombre, pero en la lista de morosos tampoco." } },
        { t: "No pagarla y aguantar las miradas", d: { cri: 2, red: -2, msg: "No pagas. En la siguiente reunión te saludan con una cordialidad muy precisa." } },
      ] },
    { id: 12401, por: "Pagaste el colegio caro", t: "Los padres del colegio",
      x: "En la reunión de representantes hay dos gerentes de banco y la socia de un fondo. Te invitan a la parrilla del sábado.",
      o: [
        { t: "Ir y hacer red sin disimulo", d: { red: 5, ene: -2, rep: -1, msg: "Repartes tarjetas entre el chorizo y la ensalada. Funciona, y alguno lo comenta." } },
        { t: "Ir y no hablar de trabajo", d: { red: 3, ene: 1, msg: "Hablas de fútbol y de tareas. Dos meses después, la socia te llama por un asunto de trabajo." } },
        { t: "Excusarte, el sábado es tuyo", d: { ene: 2, msg: "Te quedas en casa. Te enteras después de quién estuvo, y no te arrepientes del todo." } },
      ] },
    { id: 12402, por: "Elegiste colegio para tus hijos", t: "Matemáticas no va bien",
      x: "La libreta llega con una nota que no esperabas. La maestra sugiere clases particulares con una sonrisa profesional.",
      o: [
        { t: "Pagar un profesor particular", d: { cash: -1500, msg: "El profesor es bueno y caro. La nota sube y tu presupuesto baja, en la misma proporción." } },
        { t: "Sentarte tú con ellos dos noches por semana", d: { ene: -4, mod: 2, red: 1, msg: "Descubres que no recuerdas cómo se divide entre fracciones. Lo aprenden juntos." } },
        { t: "Esperar al siguiente trimestre", d: { cri: -1, ene: 1, msg: "La nota mejora un poco sola. O empeora, según a quién le preguntes en casa." } },
      ] },
    { id: 12403, por: "Invertiste para tus hijos la diferencia", t: "El fondo a su nombre cae",
      x: "El fondo que abriste para ellos iba bien. Llega un año malo y todo el estado de cuenta está en rojo.",
      o: [
        { t: "No tocar nada", d: { cri: 4, ene: -1, msg: "Lo dejas quieto. Tienen quince años de horizonte y tú, por suerte, también la paciencia." } },
        { t: "Pasarlo a algo más seguro", d: { cri: -3, cash: -1500, msg: "Vendes en rojo y compras tranquilidad. La tranquilidad cuesta lo que bajó." } },
        { t: "Aportar más ahora que está barato", d: { cash: -2000, cri: 3, msg: "Compras en plena caída. Te tiemblan un poco las manos, y aun así lo haces.",
          luego: [{ en: 2, azar: [{ p: 60, id: 12410, bueno: true }, { p: 40, id: 12411, bueno: false }] }] } },
      ] },
    { id: 12404, por: "Elegiste el colegio razonable", t: "La comparación",
      x: "Un conocido comenta que su hijo ya habla tres idiomas en el colegio privado. Lo dice dos veces en la misma cena.",
      o: [
        { t: "Cambiarlos al colegio caro", d: { cash: -5000, cri: -2, msg: "Los cambias a mitad de año. Hacen amigos nuevos y tú te quedas sin el fondo." } },
        { t: "Pagar clases de idiomas por la tarde", d: { cash: -1200, ene: -1, msg: "Inglés los martes y jueves. Cuesta una fracción del colegio caro y nadie sabe la diferencia." } },
        { t: "Reírte y seguir con el plan", d: { cri: 3, msg: "Felicitas al conocido. Por dentro, haces la cuenta de lo que el fondo va a valer en diez años." } },
      ] },
    { id: 12410, por: "Aportaste al fondo de tus hijos en plena caída", t: "El mercado se recupera",
      x: "Dos años después el fondo está por encima de donde estaba. Lo que compraste barato es lo que más subió.",
      o: [
        { t: "Mantener el plan sin tocar nada", d: { cri: 4, cash: 2000, msg: "No haces nada. Es lo más difícil y lo que mejor sale." } },
        { t: "Contárselo a tus hijos con una gráfica", d: { cri: 2, red: 1, ene: 2, msg: "No entienden la gráfica. Entienden que es suyo, y eso ya es una lección." } },
      ] },
    { id: 12411, por: "Aportaste al fondo de tus hijos en plena caída", t: "Tarda más de lo que creías",
      x: "Dos años después sigue en rojo. Lo que parecía barato se abarató todavía más.",
      o: [
        { t: "Seguir aportando, el plazo es largo", d: { cash: -1500, cri: 3, ene: -2, msg: "Sigues. Te quedan muchos años por delante y la prisa no es tuya." } },
        { t: "Dejar de aportar hasta que suba", d: { cri: -2, ene: 1, msg: "Paras. Cuando sube, no estás dentro con lo que habrías puesto." } },
      ] },

    /* ───────── 9015 Una empresa que no existe ───────── */
    { id: 12450, por: "Perdiste una parte seria en una estafa", t: "Tu contacto cobraba comisión",
      x: "Tu contacto de confianza dice que él también perdió. Después te enteras de que cobraba por cada persona que traía.",
      o: [
        { t: "Denunciarlo con todo lo que tienes", d: { rep: 2, ene: -3, cash: -800, msg: "Juntas recibos, mensajes y transferencias. El abogado dice que hay caso, sin prometer nada.",
          luego: [{ en: 2, s: "red", azar: [{ p: 65, id: 12460, bueno: false }, { p: 35, id: 12461, bueno: true }] }] } },
        { t: "Hablar con él antes de nada", d: { cri: 1, red: -1, msg: "Llora, jura que no sabía y te devuelve una parte de sus comisiones. No sabes qué creer." } },
        { t: "Cortar todo contacto", d: { red: -3, ene: 1, msg: "Lo bloqueas en todo. Ganas paz y pierdes la única pista de dónde fue tu dinero." } },
      ] },
    { id: 12451, por: "Metiste dinero en la empresa del 4% mensual", t: "Te escriben los que recuperan fondos",
      x: "Un despacho dice que recupera dinero de estafas como la tuya. Solo hay que pagar un adelanto por los gastos.",
      o: [
        { t: "Pagar el adelanto, es la última esperanza", d: { cash: -1500, cri: -4, msg: "Pagas. El despacho desaparece con la misma elegancia que la empresa." } },
        { t: "Pedir su registro y su dirección física", d: { cri: 4, msg: "Te mandan un logo y un número de teléfono. Reconoces la web: es la misma plantilla." } },
        { t: "No contestar", d: { cri: 2, ene: 1, msg: "Borras el correo. Al día siguiente llega otro, de otro despacho, con el mismo texto." } },
      ] },
    { id: 12452, por: "Te tocó de cerca la estafa del 4% mensual", t: "Un conocido lo perdió todo",
      x: "Un conocido metió sus ahorros en la empresa del 4% mensual. Te pide ayuda para entender qué pasó y qué puede hacer.",
      o: [
        { t: "Sentarte con él a ordenar los papeles", d: { ene: -3, red: 3, rep: 2, msg: "Dos tardes de recibos y capturas. No recupera nada, pero entiende por fin qué le pasó." } },
        { t: "Pasarle el contacto de un abogado serio", d: { red: 1, cri: 1, msg: "Le das un nombre de verdad. Es lo más útil que nadie le ha dado en meses." } },
        { t: "Decirle que no sabes de esto", d: { red: -2, ene: 1, msg: "Sí sabes. Él también lo sabe." } },
      ] },
    { id: 12453, por: "Viste venir la estafa del 4% mensual", t: "Un periodista te busca",
      x: "Un medio prepara un reportaje sobre la estafa. Alguien les dio tu nombre como la persona que la vio venir.",
      o: [
        { t: "Dar la entrevista con tu nombre", d: { rep: 5, red: 2, ene: -2, msg: "Sales en el reportaje explicando por qué el 4% mensual no existe. Te escriben desconocidos." } },
        { t: "Hablar sin que te citen", d: { rep: 1, red: 1, msg: "Explicas todo y apareces como fuente cercana. Lo sabes tú y casi nadie más." } },
        { t: "Declinar", d: { ene: 1, msg: "Prefieres no salir. El reportaje cita a otro, que lo explica peor." } },
      ] },
    { id: 12454, por: "Dudaste de la empresa del 4% mensual", t: "La misma web, otro nombre",
      x: "Meses después te llega otra empresa por otro contacto. Mismo diseño, otro logo, y ahora promete el 3% mensual.",
      o: [
        { t: "Avisar a quien te la mandó", d: { rep: 2, red: 1, ene: -1, msg: "Le mandas capturas de las dos webs lado a lado. No te contesta, pero deja de reenviarla." } },
        { t: "Reportarla al regulador", d: { cri: 2, rep: 1, ene: -1, msg: "Llenas un formulario largo. Meses después la web cae, y no sabes si fue por ti." } },
        { t: "Borrar el mensaje", d: { ene: 1, msg: "Lo borras. Alguien en ese grupo va a entrar, y no vas a ser tú." } },
      ] },
    { id: 12460, por: "Denunciaste al contacto que te metió en la estafa", t: "El caso se archiva",
      x: "Dos años de audiencias aplazadas. El fiscal archiva el caso por falta de pruebas sobre lo que tu contacto sabía.",
      o: [
        { t: "Apelar", d: { cash: -1500, ene: -3, msg: "El abogado está dispuesto. Tú ya no sabes cuánto más quieres pagar por tener razón." } },
        { t: "Cerrar el capítulo", d: { cri: 3, ene: 3, msg: "Lo dejas ir. No recuperas el dinero, recuperas los domingos." } },
      ] },
    { id: 12461, por: "Denunciaste al contacto que te metió en la estafa", t: "Recuperas una parte",
      x: "Encuentran cuentas a nombre de los organizadores. Hay un reparto entre los afectados y a ti te toca algo.",
      o: [
        { t: "Cobrar y cerrar el capítulo", d: { cash: 5000, cri: 2, ene: 3, msg: "Recuperas una fracción. No es justicia completa, pero es más de lo que recupera casi nadie." } },
        { t: "Ayudar a otros afectados con su papeleo", d: { cash: 5000, red: 4, ene: -2, msg: "Cobras y te quedas ayudando. Terminas de referente de un grupo que no pidió tenerte." } },
      ] },

    /* ───────── 9020 El desgaste ───────── */
    { id: 12500, por: "Tu relación sobrevivió al desgaste", t: "Una semana sin portátil",
      x: "Por fin una semana de playa con tu pareja. El tercer día, un cliente escribe con algo que él llama urgente.",
      o: [
        { t: "Contestar desde el baño, a escondidas", d: { ene: -3, car: 1, red: -1, msg: "Resuelves el asunto en veinte minutos y te pillan en dos. La semana se tuerce." } },
        { t: "Delegarlo y apagar el teléfono", d: { ene: 5, car: -1, msg: "Alguien lo resuelve sin ti. Descubres que el mundo funciona, más o menos, cuando no miras." } },
        { t: "Decirlo en voz alta y contestar una hora", d: { cri: 2, ene: 1, msg: "Avisas, contestas, apagas. Tu pareja te lo agradece más que si no lo hubieras hecho." } },
      ] },
    { id: 12501, por: "Frenaste tu carrera para salvar tu pareja", t: "El año que perdiste",
      x: "Un colega de tu generación cerró el año con el doble de clientes. Tu pareja lo nota antes que tú y te pregunta si te arrepientes.",
      o: [
        { t: "Decir la verdad: un poco", d: { cri: 2, ene: 1, red: 1, msg: "Lo dices y no pasa nada malo. Resulta que se podía decir." } },
        { t: "Acelerar ahora que la casa está en paz", d: { car: 4, ene: -3, msg: "Vuelves a apretar, esta vez con aviso y con horario. Se nota en los dos lados." } },
        { t: "Decir que no, y creértelo", d: { ene: 3, msg: "No te arrepientes. Has visto el precio del otro camino en tus amigos." } },
      ] },
    { id: 12502, por: "Tu pareja tuvo más paciencia de la que merecías", t: "La paciencia tiene fondo",
      x: "Tu pareja te dice, con mucha calma, que no va a aguantar otro año igual. La calma es lo que más miedo da.",
      o: [
        { t: "Esta vez frenar de verdad", d: { car: -3, ene: 4, red: 1, msg: "Cambias horarios y lo cumples. Tarda meses en creérselo, y luego se lo cree." } },
        { t: "Pagar ayuda en casa para quitar carga", d: { cash: -2500, ene: 2, msg: "La casa funciona mejor. La conversación pendiente sigue ahí, con la casa más limpia." } },
        { t: "Prometer y seguir igual", d: { car: 2, ene: -5, msg: "Prometes. Los dos saben cuánto vale esa promesa, y uno de los dos ya no discute." } },
      ] },
    { id: 12503, por: "Te divorciaste", t: "El primer domingo sin plan",
      x: "Un apartamento más pequeño y una nevera vacía. El primer domingo después del divorcio dura una semana entera.",
      o: [
        { t: "Llenar la agenda de trabajo", d: { car: 3, ene: -4, msg: "El trabajo no pregunta. Es lo que lo hace tan cómodo, y tan poco útil." } },
        { t: "Llamar a los amigos que dejaste de ver", d: { red: 4, ene: 3, msg: "Te contestan casi todos. Uno te dice que ya era hora, y tiene razón." } },
        { t: "Empezar terapia por tu cuenta", d: { cash: -1500, ene: 4, cri: 2, msg: "Una hora por semana para entender lo que pasó. Hubiera servido antes, sirve igual." } },
      ] },
    { id: 12504, por: "Te divorciaste", t: "Rehacer las cuentas desde la mitad",
      x: "Después del reparto, tu patrimonio es la mitad de lo que era. El asesor del banco ya tiene una propuesta para ti.",
      o: [
        { t: "Rehacer el plan con calma, sin productos", d: { cri: 4, ene: 1, msg: "Una hoja de cálculo, un fondo barato y paciencia. Es lento y es tuyo." } },
        { t: "Aceptar la propuesta del banco", d: { cri: -2, cash: -1000, msg: "Firmas un producto con nombre largo. Las comisiones empiezan a cobrar antes de que termines de leerlo." } },
        { t: "Recuperar rápido con algo de riesgo", d: { cri: -1, ene: -2, msg: "Metes una parte en una apuesta concentrada. Quieres volver a donde estabas, y rápido.",
          luego: [{ en: 1, azar: [{ p: 40, id: 12510, bueno: true }, { p: 60, id: 12511, bueno: false }] }] } },
      ] },
    { id: 12510, por: "Apostaste fuerte para recuperarte del divorcio", t: "La apuesta sale",
      x: "La apuesta sube como pocas. En un año recuperas una parte grande de lo que se fue en el reparto.",
      o: [
        { t: "Vender y volver al plan aburrido", d: { cash: 8000, cri: 4, msg: "Cobras y vuelves al fondo barato. Fue suerte y lo sabes, que es lo importante." } },
        { t: "Doblar la apuesta", d: { cash: 3000, cri: -4, msg: "Vendes una parte y doblas el resto. Te sientes invencible, que es la señal de alarma." } },
      ] },
    { id: 12511, por: "Apostaste fuerte para recuperarte del divorcio", t: "La apuesta no sale",
      x: "La empresa en la que apostaste anuncia malos resultados y cae a la mitad. Ahora tienes la mitad de la mitad.",
      o: [
        { t: "Vender y aceptar la pérdida", d: { cash: -4000, cri: 3, ene: -2, msg: "Vendes. Duele, y es la última vez que intentas arreglar con el mercado algo que no era del mercado." } },
        { t: "Aguantar a ver si vuelve", d: { cash: -2000, cri: -2, ene: -3, msg: "Aguantas. Miras la cotización cada mañana, antes que el teléfono, antes que el café." } },
      ] },

    /* ───────── 9021 Tu padre ya no puede solo ───────── */
    { id: 12550, por: "Llevaste a tu padre a vivir contigo", t: "Tu padre opina de todo",
      x: "Tu padre reorganizó la cocina y explica a toda la casa cómo se ahorraba en sus tiempos. Con ejemplos.",
      o: [
        { t: "Darle una tarea que sea solo suya", d: { ene: 2, red: 1, msg: "Ahora lleva las compras. Ahorra de verdad y te lo recuerda cada semana." } },
        { t: "Poner reglas claras de convivencia", d: { cri: 2, ene: -1, msg: "Una conversación incómoda y una hoja pegada en la nevera. Funciona a ratos." } },
        { t: "Dejarlo hacer, ya se acomodará", d: { ene: -3, msg: "No se acomoda. Ahora también reorganizó el armario de la entrada." } },
      ] },
    { id: 12551, por: "Te hiciste cargo de tu padre sin residencia", t: "Una caída en el baño",
      x: "Nada roto, pero un susto. El médico dice que tu padre necesita a alguien con él durante el día.",
      o: [
        { t: "Contratar una cuidadora de día", d: { cash: -3000, ene: 3, msg: "Llega una cuidadora con paciencia infinita. Tu padre se queja de ella y la adora." } },
        { t: "Trabajar desde casa unos meses", d: { car: -3, ene: -3, red: 1, msg: "Haces llamadas con tu padre de fondo. Tus clientes ya conocen su opinión del gobierno." } },
        { t: "Repartir los días entre la familia", d: { ene: -1, red: -1, msg: "Se arma un calendario. Funciona hasta el primer martes que nadie puede." } },
      ] },
    { id: 12552, por: "Pagaste una buena residencia para tu padre", t: "La residencia sube la mensualidad",
      x: "Llega una carta: tarifa nueva desde el mes que viene. Y las otras buenas de la zona tienen lista de espera.",
      o: [
        { t: "Pagar la subida sin discutir", d: { cash: -3000, ene: 1, msg: "Pagas. Tu padre no se entera, que era justo lo que querías." } },
        { t: "Pedir a tus hermanos que pongan su parte", d: { cash: -1000, red: -1, ene: -2, msg: "Uno pone, otro dice que ya veremos. Ya veremos significa que no." } },
        { t: "Moverlo a una más barata", d: { cash: 1500, ene: -4, msg: "Lo mudas. La nueva está bien y tu padre te pregunta cada domingo cuándo vuelve a la otra." } },
      ] },
    { id: 12553, por: "Pagaste una buena residencia para tu padre", t: "Nadie le pregunta nada",
      x: "En la visita del domingo, tu padre te dice que el sitio está bien, pero que allí nadie le pregunta nada.",
      o: [
        { t: "Ir también un día entre semana", d: { ene: -3, red: 2, msg: "Los miércoles le llevas el periódico y le preguntas qué opina. Opina mucho." } },
        { t: "Llevarlo a almorzar fuera cada domingo", d: { cash: -800, ene: 1, msg: "Siempre el mismo restaurante, siempre el mismo plato. Es la mejor hora de su semana." } },
        { t: "Hablar con la residencia", d: { cri: 1, ene: 1, msg: "Lo apuntan a un taller de memoria. Lo deja a la segunda sesión y se hace amigo del profesor." } },
      ] },
    { id: 12554, por: "Repartiste a tu padre entre los hermanos", t: "La hoja de cálculo de los hermanos",
      x: "Uno de tus hermanos lleva la cuenta de quién pagó qué y a quién le tocó qué domingo. Tú sales en rojo.",
      o: [
        { t: "Pagar tu parte atrasada", d: { cash: -2000, red: 2, msg: "Pagas y te pones al día. La hoja sigue existiendo, pero ya no te mira." } },
        { t: "Proponer una cuidadora entre todos", d: { cash: -1500, ene: 2, cri: 2, msg: "Se ahorran discusiones pagando a alguien. Es lo primero en que están de acuerdo en años." } },
        { t: "Discutir la hoja entera", d: { ene: -4, red: -2, msg: "Revisas fila por fila. A la tercera fila ya no se habla del padre.",
          luego: [{ en: 1, azar: [{ p: 55, id: 12560, bueno: false }, { p: 45, id: 12561, bueno: true }] }] } },
      ] },
    { id: 12560, por: "Discutiste las cuentas con tus hermanos", t: "Sale lo de hace treinta años",
      x: "La discusión de la hoja se convierte en otra: quién estudió fuera, quién se quedó, a quién quisieron más.",
      o: [
        { t: "Pedir un mediador familiar", d: { cash: -1000, cri: 2, ene: -1, msg: "Un desconocido con paciencia ordena lo que la familia no pudo. Salen con un acuerdo, no con abrazos." } },
        { t: "Dejar de hablarles una temporada", d: { red: -4, ene: -2, msg: "Silencio entre hermanos. Tu padre se da cuenta y pregunta por todos a la vez." } },
      ] },
    { id: 12561, por: "Discutiste las cuentas con tus hermanos", t: "Al final, una tregua",
      x: "Después de la pelea, alguien trae comida y nadie se va. A las once de la noche hay un plan nuevo, escrito a mano.",
      o: [
        { t: "Firmar el plan y cumplirlo", d: { red: 3, ene: 2, msg: "Cumples tus domingos. Tu padre nota que sus hijos vuelven a hablarse." } },
        { t: "Ofrecerte para llevar las cuentas tú", d: { cri: 2, ene: -2, red: 2, msg: "Ahora la hoja es tuya. Descubres por qué tu hermano estaba de tan mal humor." } },
      ] },

    /* ───────── 9022 Se murió ───────── */
    { id: 12600, por: "Perdiste a alguien cercano", t: "Las cosas que dejó",
      x: "Hay que vaciar su casa. Cajas de papeles, fotos sin fecha y una colección de discos que nadie quiere y nadie tira.",
      o: [
        { t: "Hacerlo con calma, un fin de semana tras otro", d: { ene: -2, cri: 2, red: 1, msg: "Tardas meses. Cada caja trae una historia y algunas te hacen reír." } },
        { t: "Pagar una empresa que lo vacíe todo", d: { cash: -1500, ene: 2, msg: "En un día no queda nada. Te quedas con una caja de fotos que no te atreves a abrir." } },
        { t: "Dejarlo para el año que viene", d: { ene: -1, cash: -800, msg: "La casa sigue ahí, pagando servicios y guardando polvo. Igual que el asunto." } },
      ] },
    { id: 12601, por: "Paraste todo para despedir a alguien cercano", t: "Volver después de un trimestre",
      x: "Vuelves al trabajo. Hay gente nueva, otra forma de hacer las cosas y un proyecto que ya no es tuyo.",
      o: [
        { t: "Pedir algo nuevo y empezar de cero", d: { car: 2, ene: 1, msg: "Te dan algo pequeño. Lo haces bien y en dos meses vuelves a estar en todo." } },
        { t: "Recuperar lo tuyo a codazos", d: { car: 3, red: -3, ene: -2, msg: "Lo recuperas. Quien lo llevaba en tu ausencia no te lo perdona." } },
        { t: "Tomarte las cosas con otra medida", d: { ene: 4, car: -1, msg: "Haces bien tu trabajo y te vas a tu hora. Antes no sabías que se podía." } },
      ] },
    { id: 12602, por: "Enterraste el duelo en el trabajo", t: "El duelo llega tarde",
      x: "En una reunión cualquiera te quedas sin aire. No es el corazón, dice el médico. Es lo que no lloraste.",
      o: [
        { t: "Ir a terapia", d: { cash: -1500, ene: 6, msg: "Una hora a la semana hablando de lo que no hablaste. Duele, y después respiras mejor." } },
        { t: "Tomarte las vacaciones que debes", d: { ene: 5, car: -1, msg: "Tres semanas fuera. Lloras en un aeropuerto y vuelves con menos peso del que te llevaste." } },
        { t: "Seguir, ya se pasará", d: { ene: -6, car: 2, msg: "Sigues. El médico te da unas pastillas y una mirada que no te gusta.",
          luego: [{ en: 1, azar: [{ p: 60, id: 12610, bueno: false }, { p: 40, id: 12611, bueno: true }] }] } },
      ] },
    { id: 12603, por: "Enterraste el duelo en el trabajo", t: "Un año de números récord",
      x: "Cerraste el mejor año de tu carrera. En la cena de fin de año brindan por ti y no recuerdas casi nada de ese año.",
      o: [
        { t: "Disfrutarlo, te lo ganaste", d: { rep: 3, ene: 1, msg: "Aceptas el brindis. Por dentro sabes de dónde salió cada hora extra." } },
        { t: "Contar en voz alta por qué trabajaste así", d: { red: 3, ene: 3, rep: 1, msg: "Lo dices en la cena. Dos personas se acercan después a contarte lo suyo." } },
        { t: "Pensar ya en el año siguiente", d: { car: 3, ene: -4, msg: "Al día siguiente ya tienes objetivos nuevos. El duelo espera turno, con paciencia." } },
      ] },
    { id: 12604, por: "Paraste todo para despedir a alguien cercano", t: "La libreta de sus cuentas",
      x: "En sus papeles aparece una libreta con las cuentas de toda su vida. Ahorró para muchas cosas que nunca hizo.",
      o: [
        { t: "Hacer algo que llevas años posponiendo", d: { cash: -3000, ene: 6, msg: "Lo haces por fin. Piensas en la libreta todo el tiempo, y sonríes." } },
        { t: "Reordenar tus propias cuentas", d: { cri: 4, ene: 1, msg: "Haces tu propia libreta, con una columna nueva: cosas para hacer este año." } },
        { t: "Guardar la libreta y seguir", d: { ene: 1, msg: "La pones en tu escritorio. A veces la abres antes de una decisión grande." } },
      ] },
    { id: 12610, por: "Seguiste sin parar después del duelo", t: "Otra vez, en público",
      x: "Te vuelve a pasar, esta vez en medio de una presentación importante. Sales de la sala sin terminar la frase.",
      o: [
        { t: "Pedir una baja y tratarlo en serio", d: { car: -4, ene: 7, cash: -1500, msg: "Paras dos meses. Lo que no hiciste antes lo haces ahora, con más intereses." } },
        { t: "Volver a la sala y terminar", d: { rep: 1, ene: -6, msg: "Terminas la presentación con la voz rara. Te aplauden. No te sirve de nada." } },
      ] },
    { id: 12611, por: "Seguiste sin parar después del duelo", t: "Se fue apagando",
      x: "Las crisis se espacian y un día dejan de venir. No sabes si se fue o solo cambió de sitio.",
      o: [
        { t: "Visitar su tumba por primera vez", d: { ene: 4, msg: "Vas un sábado sin avisar a nadie. Te quedas más de lo que pensabas." } },
        { t: "No volver a pensarlo", d: { ene: -1, car: 1, msg: "Lo archivas. Funciona, como funcionan las cosas que se archivan." } },
      ] },
  ],

  raices: {
    "9001": {
      "0": { deja: "l2_en_serio", luego: [{ en: 1, s: "red", azar: [{ p: 40, id: 12000, bueno: true }, { p: 25, id: 12001 }, { p: 35, id: 12002, bueno: false }] }] },
      "1": { deja: "l2_carrera_primero", luego: [{ en: 2, azar: [{ p: 45, id: 12003 }, { p: 55, id: 12004 }] }] },
    },
    "9002": {
      "0": { deja: "l2_padrino_completo", luego: [{ en: 1, s: "red", azar: [{ p: 35, id: 12050, bueno: true }, { p: 30, id: 12051 }, { p: 20, id: 12052 }, { p: 15, id: 12054 }] }] },
      "1": { luego: [{ en: 2, azar: [{ p: 20, id: 12050 }, { p: 35, id: 12052 }, { p: 25, id: 12054 }, { p: 20, id: 12053 }] }] },
      "2": { deja: "l2_faltaste_boda", luego: [{ en: 1, azar: [{ p: 60, id: 12053 }, { p: 40, id: 12054 }] }] },
    },
    "9003": {
      "0": { luego: [{ en: 1, azar: [{ p: 30, id: 12100 }, { p: 40, id: 12101 }, { p: 30, id: 12103 }] }] },
      "1": { deja: "l2_ahorraste_en_casa", luego: [{ en: 2, azar: [{ p: 45, id: 12102 }, { p: 25, id: 12103 }, { p: 30, id: 12104 }] }] },
    },
    "9004": {
      "0": {
        ok: { deja: "l2_suerte_importadora", luego: [{ en: 1, azar: [{ p: 55, id: 12150 }, { p: 45, id: 12151 }] }] },
        no: { deja: "l2_perdiste_importadora", luego: [{ en: 1, azar: [{ p: 55, id: 12152 }, { p: 45, id: 12153 }] }] },
      },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 12154, bueno: true }, { p: 50, id: 12151 }] }] },
      "2": { luego: [{ en: 2, azar: [{ p: 35, id: 12154 }, { p: 65, id: 12151 }] }] },
    },
    "9010": {
      "0": { luego: [{ en: 1, azar: [{ p: 55, id: 12200 }, { p: 45, id: 12201 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 60, id: 12202 }, { p: 40, id: 12201 }] }] },
      "2": { luego: [{ en: 1, azar: [{ p: 45, id: 12203 }, { p: 55, id: 12204 }] }] },
    },
    "9011": {
      "0": { luego: [{ en: 1, azar: [{ p: 30, id: 12250 }, { p: 45, id: 12251 }, { p: 25, id: 12252 }] }] },
      "1": { deja: "l2_peleaste_relacion", luego: [{ en: 1, s: "ene", azar: [{ p: 55, id: 12253, bueno: true }, { p: 45, id: 12254, bueno: false }] }] },
    },
    "9012": {
      "0": { luego: [{ en: 1, s: "ene", azar: [{ p: 40, id: 12300, bueno: false }, { p: 35, id: 12301 }, { p: 25, id: 12302 }] }] },
      "1": { luego: [{ en: 2, azar: [{ p: 45, id: 12303 }, { p: 55, id: 12304 }] }] },
    },
    "9013": {
      "0": { luego: [{ en: 1, azar: [{ p: 35, id: 12350 }, { p: 30, id: 12351 }, { p: 35, id: 12352 }] }] },
      "1": { luego: [{ en: 2, azar: [{ p: 50, id: 12353 }, { p: 50, id: 12354 }] }] },
    },
    "9014": {
      "0": { deja: "l2_colegio_caro", luego: [{ en: 2, s: "red", azar: [{ p: 35, id: 12400, bueno: false }, { p: 35, id: 12401, bueno: true }, { p: 30, id: 12402 }] }] },
      "1": { deja: "l2_fondo_hijos", luego: [{ en: 2, azar: [{ p: 40, id: 12403 }, { p: 30, id: 12404 }, { p: 30, id: 12402 }] }] },
    },
    "9015": {
      "0": {
        ok: { luego: [{ en: 1, azar: [{ p: 40, id: 12452 }, { p: 30, id: 12451 }, { p: 30, id: 12454 }] }] },
        no: { deja: "l2_estafado", luego: [{ en: 1, azar: [{ p: 45, id: 12450 }, { p: 55, id: 12451 }] }] },
      },
      "1": { luego: [{ en: 1, azar: [{ p: 50, id: 12454 }, { p: 30, id: 12452 }, { p: 20, id: 12453 }] }] },
      "2": { deja: "l2_viste_estafa", luego: [{ en: 2, s: "rep", azar: [{ p: 45, id: 12452 }, { p: 35, id: 12453, bueno: true }, { p: 20, id: 12454 }] }] },
    },
    "9020": {
      "0": { deja: "l2_frenaste_por_pareja", luego: [{ en: 1, azar: [{ p: 55, id: 12500 }, { p: 45, id: 12501 }] }] },
      "1": {
        ok: { luego: [{ en: 1, azar: [{ p: 60, id: 12502 }, { p: 40, id: 12500 }] }] },
        no: { luego: [{ en: 1, azar: [{ p: 50, id: 12503 }, { p: 50, id: 12504 }] }] },
      },
    },
    "9021": {
      "0": { deja: "l2_padre_en_casa", luego: [{ en: 1, azar: [{ p: 50, id: 12550 }, { p: 50, id: 12551 }] }] },
      "1": { deja: "l2_residencia", luego: [{ en: 1, azar: [{ p: 50, id: 12552 }, { p: 50, id: 12553 }] }] },
      "2": { luego: [{ en: 1, azar: [{ p: 60, id: 12554 }, { p: 40, id: 12551 }] }] },
    },
    "9022": {
      "0": { deja: "l2_estuviste", luego: [{ en: 1, azar: [{ p: 35, id: 12600 }, { p: 35, id: 12601 }, { p: 30, id: 12604 }] }] },
      "1": { deja: "l2_duelo_pendiente", luego: [{ en: 1, s: "ene", azar: [{ p: 25, id: 12600 }, { p: 40, id: 12602, bueno: false }, { p: 35, id: 12603, bueno: true }] }] },
    },
  },

  finales: [
    { id: "l2_nadie_te_vendio_humo", huellas: ["l2_viste_estafa"], t: "Nadie te vendió humo",
      x: "Cuando todos cobraban el 4% mensual, dijiste que no existía. Tuviste razón en voz alta, que es la forma más incómoda de tenerla." },
    { id: "l2_frenaste_a_tiempo", huellas: ["l2_frenaste_por_pareja"], t: "Frenaste a tiempo",
      x: "Perdiste un año de impulso para no perder lo demás. En tu hoja de vida no se nota; en tu casa, sí." },
    { id: "l2_la_factura_tarde", huellas: ["l2_duelo_pendiente"], t: "La factura que llegó tarde",
      x: "Cuando más dolía, trabajaste más que nunca. Los números de ese año fueron buenos. El resto lo fuiste pagando después, a plazos." },
  ],
};
