/* Lote 5: escenas de oficina. Ids 15000-15999, prefijo l5_.
   Esquema de ids: raíz 16 -> 1501x, 17 -> 1502x, 18 -> 1503x, 19 -> 1504x, 20 -> 1505x,
   21 -> 1506x, 22 -> 1507x, 23 -> 1508x, 24 -> 1509x, 26 -> 1510x, 27 -> 1511x,
   28 -> 1512x, 29 -> 1513x. Las terminadas en 5 y 6 son de tercer nivel. */
module.exports = {
  huellas: {
    l5_cripto_acotada: "Metiste en la cripto solo lo que podías perder",
    l5_hora_diaria: "Bloqueaste una hora diaria para tu salud",
    l5_aguantaste: "Ignoraste el aviso del médico",
    l5_fuiste_boda: "Fuiste a la boda de tu mejor amigo",
    l5_faltaste_boda: "Faltaste a la boda de tu mejor amigo por un pitch",
    l5_columnista: "Aceptaste ser fuente fija de un periodista",
    l5_limite_puesto: "Le pusiste un límite al colega que se colgó de ti",
    l5_lo_anotaste: "Dejaste pasar que un colega usara tu trabajo",
    l5_bono_invertido: "Mandaste casi todo tu bono al portafolio",
    l5_fusion_temprano: "Te posicionaste temprano en la fusión",
    l5_defendiste_equipo: "Defendiste a tu equipo en los recortes",
    l5_mentor: "Le dedicaste horas al pasante nuevo",
    l5_honorarios_firmes: "Sostuviste tus honorarios ante un cliente grande",
    l5_cediste_fee: "Le cediste el fee a un cliente grande",
  },

  escenas: [
    /* ───────── raíz 16: tu primo y la cripto del momento ───────── */
    { id: 15010, por: "Metiste algo en la cripto de tu primo", t: "La cripto se multiplicó",
      x: "Lo que metiste vale cuatro veces más. Tu primo ya habla de cambiar el carro y de dejar el trabajo.",
      o: [
        { t: "Vender lo que pusiste y dejar correr la ganancia", d: { cash: 3000, cri: 4, msg: "Recuperas lo tuyo. Lo que queda adentro ya es dinero de la casa." } },
        { t: "Dejarlo todo adentro, que corra", d: { cri: -2, ene: 1, msg: "No vendes nada. Abres la aplicación más veces de las que admitirías.",
          luego: [{ en: 1, azar: [{ p: 40, id: 15014, bueno: true }, { p: 60, id: 15016, bueno: false }] }] } },
      ] },
    { id: 15011, por: "Escuchaste a tu primo hablar de su cripto", t: "La cripto se desplomó",
      x: "La moneda perdió casi todo en una semana. En la cena familiar todos miran a la misma persona: tu primo.",
      o: [
        { t: "Defender a tu primo frente a la familia", d: { red: 4, rep: -1, msg: "Dices que cualquiera se equivoca. Tu primo te mira como a un abogado de oficio." } },
        { t: "Explicar con números qué pasó", d: { cri: 3, red: -2, msg: "Sacas una servilleta y dibujas la caída. La tía te pide que no arruines el postre." } },
        { t: "Cambiar de tema y pasar el arroz", d: { ene: 2, red: 1, msg: "Hablas del clima. Nadie te lo agradece, pero tampoco te lo reprochan." } },
      ] },
    { id: 15012, por: "Escuchaste a tu primo hablar de su cripto", t: "Tu primo vuelve con otra idea",
      x: "Ahora es una franquicia de bebidas energéticas. Dice que esta vez trae un plan de negocios de verdad.",
      o: [
        { t: "Revisarle el plan en serio", d: { ene: -3, cri: 3, red: 3, msg: "Le marcas en rojo tres supuestos imposibles. Él toma nota, cosa que nunca había hecho." } },
        { t: "Decirle que no tienes tiempo", d: { ene: 2, red: -3, msg: "Te dice que ya sabía que ibas a decir eso. Tenía razón." } },
        { t: "Meter un poco, por cariño", d: { cash: -1500, red: 4, msg: "Le das algo sin mirar el plan. Lo llamas inversión para no llamarlo regalo." } },
      ] },
    { id: 15013, por: "Le explicaste a tu primo por qué no", t: "Tu primo quiere ordenar sus cuentas",
      x: "Algo de lo que le explicaste se le quedó. Quiere salir de sus deudas y no sabe por dónde empezar.",
      o: [
        { t: "Sentarte con él un sábado entero", d: { ene: -3, red: 5, cri: 2, msg: "Terminan con una hoja de cálculo y una lista de cosas que vender. Te abraza al irse." } },
        { t: "Pasarle una plantilla y desearle suerte", d: { ene: 1, red: 1, msg: "Te manda una foto de la plantilla a medio llenar. Es un comienzo." } },
        { t: "Cobrarle como a cualquier cliente", d: { cash: 800, red: -3, rep: 1, msg: "Paga, refunfuña y cumple el plan al pie de la letra. Lo que se paga se respeta." } },
      ] },
    { id: 15014, por: "Dejaste correr tu ganancia en la cripto", t: "La subida no para",
      x: "Lo que metiste ya vale diez veces lo inicial. Tu primo quiere que se la recomiendes a tus colegas.",
      o: [
        { t: "Vender ya y no recomendar nada", d: { cash: 8000, cri: 4, msg: "Vendes en un buen día. Tu primo dice que te faltó fe. A ti te sobró sueño." } },
        { t: "Recomendarla en la oficina", d: { cash: 6000, red: 3, rep: -5, msg: "Ganas tú y entran tus colegas tarde. Cuando baja, se acuerdan de quién la trajo." } },
      ] },
    { id: 15016, por: "Dejaste correr tu ganancia en la cripto", t: "La subida se dio vuelta",
      x: "En un mes la moneda vuelve al punto de partida. Tu primo jura que es una corrección sana.",
      o: [
        { t: "Vender lo que queda y aprender", d: { cash: -500, cri: 4, msg: "Sales casi en cero. Perdiste lo que estabas dispuesto a perder, ni un centavo más." } },
        { t: "Aguantar, por si acaso", d: { cash: -1500, ene: -2, msg: "Sigue bajando. Dejas de abrir la aplicación, que es otra forma de vender." } },
      ] },

    /* ───────── raíz 17: el cuerpo pasa factura ───────── */
    { id: 15020, por: "Bloqueaste una hora diaria para tu salud", t: "Cierre de trimestre contra tu hora",
      x: "Todos se quedan hasta tarde. Tu hora de ejercicio, vista desde fuera, se parece mucho a irte temprano.",
      o: [
        { t: "Mantenerla igual, sin dar explicaciones", d: { ene: 4, rep: -2, msg: "Sales a tu hora. Vuelves con la cabeza clara y dos miradas de reojo." } },
        { t: "Pasarla a las seis de la mañana", d: { ene: -2, cri: 2, rep: 1, msg: "Madrugas. Nadie lo ve, que era justamente la idea." } },
        { t: "Soltarla solo este mes", d: { ene: -3, rep: 2, msg: "Un mes se vuelven dos. La espalda empieza a llevar la cuenta." } },
      ] },
    { id: 15021, por: "Escuchaste al médico hablar de tu espalda", t: "Los análisis salen limpios",
      x: "El médico revisa los resultados y levanta las cejas. Todo en rango, por esta vez.",
      o: [
        { t: "Celebrarlo con un fin de semana libre", d: { ene: 5, cash: -800, msg: "Dos días sin correo. El lunes llegas con una cara que nadie te conocía." } },
        { t: "Tomarlo como permiso para apretar más", d: { car: 3, ene: -4, msg: "Si el cuerpo aguanta, piensas, que aguante un poco más. Ya veremos." } },
        { t: "Apuntarte a algo con horario fijo", d: { ene: 3, cash: -500, red: 1, msg: "Natación martes y jueves. Lo que tiene horario se cumple." } },
      ] },
    { id: 15022, por: "Escuchaste al médico hablar de tu espalda", t: "La espalda dice basta",
      x: "Una mañana no puedes levantarte de la cama. Tienes una presentación importante a las diez.",
      o: [
        { t: "Avisar y no ir", d: { ene: 3, rep: -2, car: -1, msg: "Mandas a otro con tus notas. Lo hace bien, lo cual te alivia y te preocupa." } },
        { t: "Ir igual, con pastillas", d: { ene: -6, rep: 2, msg: "Presentas de pie, sin moverte mucho. Sale bien. La espalda toma nota.",
          luego: [{ en: 1, s: "ene", azar: [{ p: 60, id: 15025, bueno: false }, { p: 40, id: 15026, bueno: true }] }] } },
        { t: "Presentar por videollamada, acostado", d: { rep: -1, ene: 1, red: 2, msg: "Encuadras solo la cara. Nadie nota nada hasta que se te cae el teléfono." } },
      ] },
    { id: 15023, por: "Ignoraste el aviso del médico", t: "Un colega se desmaya en la oficina",
      x: "El de la mesa de al lado cae redondo junto a la impresora. Todos miran su taza de café.",
      o: [
        { t: "Hablar con él cuando vuelva", d: { red: 4, ene: -1, msg: "Te cuenta que también ignoró una lista del médico. Se ríen poco." } },
        { t: "Proponer pausas al equipo", d: { rep: 2, red: 3, car: -1, msg: "Las pausas duran dos semanas. Lo que queda es que te vieron preocuparte." } },
        { t: "Seguir trabajando, no es tu tema", d: { car: 2, red: -3, ene: -2, msg: "Terminas tu entrega a tiempo. Esa noche duermes peor que de costumbre." } },
      ] },
    { id: 15024, por: "Bloqueaste una hora diaria para tu salud", t: "Te guardaron un dorsal",
      x: "Los del grupo de las seis de la mañana se apuntaron a una media maratón. Cuentan contigo.",
      o: [
        { t: "Entrenar y correrla", d: { ene: 5, red: 4, cash: -600, msg: "Llegas en la mitad de abajo y con la mejor foto del año." } },
        { t: "Ir solo a mirar y aplaudir", d: { red: 2, ene: 1, msg: "Repartes agua en el kilómetro diez. También cuenta." } },
        { t: "Decir que no, ya bastante haces", d: { ene: 1, red: -1, msg: "Tu hora diaria es tuya y no un campeonato. Se entiende, más o menos." } },
      ] },
    { id: 15025, por: "Presentaste con la espalda rota", t: "La espalda te cobra la presentación",
      x: "Dos semanas de fisioterapia y un médico que ya no sonríe cuando entras.",
      o: [
        { t: "Hacer la terapia completa", d: { ene: 4, cash: -2000, car: -2, msg: "Pierdes horas de escritorio y recuperas la espalda. El orden correcto, por fin." } },
        { t: "Dejarla a la mitad", d: { ene: -4, cash: -800, msg: "Te sientes mejor y dejas de ir. La espalda no está de acuerdo." } },
      ] },
    { id: 15026, por: "Presentaste con la espalda rota", t: "El susto te ordena la agenda",
      x: "La espalda se recupera sola, pero el susto te dura. Por primera vez miras el calendario con miedo.",
      o: [
        { t: "Tomarte la hora diaria en serio", d: { ene: 5, car: -1, msg: "Desde ahora esa hora no se mueve. El susto convence más que el médico." } },
        { t: "Volver a lo de siempre", d: { ene: -3, car: 2, msg: "El susto se olvida en un mes. La espalda, no tanto." } },
      ] },

    /* ───────── raíz 18: la boda y el pitch ───────── */
    { id: 15030, por: "Fuiste a la boda de tu mejor amigo", t: "El suegro de tu amigo busca asesor",
      x: "En la boda conociste al suegro de tu amigo. Resulta que dirige una empresa mediana y busca quien la mire.",
      o: [
        { t: "Llamarlo esa misma semana", d: { red: 4, car: 3, cash: 2000, msg: "Te recibe con la foto de la boda en el escritorio. Sales con un encargo." } },
        { t: "Esperar a que tu amigo lo sugiera", d: { red: 3, msg: "Tu amigo lo sugiere a los dos meses. El encargo ya lo tenía otro." } },
        { t: "No mezclar amistad y trabajo", d: { red: 1, rep: 1, msg: "Le das una tarjeta y nada más. Tu amigo agradece no tener que estar en el medio." } },
      ] },
    { id: 15031, por: "Preparaste el pitch el domingo de la boda", t: "El comité pide rehacer los anexos",
      x: "El pitch se aprobó, pero el comité pidió rehacer la mitad de los anexos para el jueves.",
      o: [
        { t: "Rehacerlos de madrugada", d: { ene: -4, rep: 2, msg: "Entregas el miércoles. Nadie sabe que dormiste cuatro horas en tres días." } },
        { t: "Pedir una semana más", d: { rep: -2, cri: 2, msg: "Te la dan. Los anexos quedan mejor que el pitch." } },
        { t: "Repartirlos con el equipo", d: { red: 1, car: 1, ene: -1, msg: "Tres personas, tres estilos. Lo unificas a última hora y nadie se queja." } },
      ] },
    { id: 15032, por: "Faltaste a la boda de tu mejor amigo", t: "Tu amigo se enfría",
      x: "Ya no te invitan al asado de los domingos. Te enteras por las fotos.",
      o: [
        { t: "Llamarlo y pedirle perdón de verdad", d: { red: 3, ene: -2, msg: "Le dices que te equivocaste, sin peros. Del otro lado, un silencio largo.",
          luego: [{ en: 1, s: "red", azar: [{ p: 55, id: 15035, bueno: true }, { p: 45, id: 15036, bueno: false }] }] } },
        { t: "Esperar a que se le pase", d: { red: -3, ene: 1, msg: "No se le pasa. Se le olvida, que es peor." } },
        { t: "Proponerle un viaje juntos", d: { cash: -1500, red: 5, ene: 2, msg: "Tres días de pesca. Del pitch no se habla y de la boda tampoco." } },
      ] },
    { id: 15033, por: "Presentaste el pitch al comité", t: "El pitch te abre una puerta",
      x: "El comité se acordó de tu presentación. Te ofrecen liderar el próximo mandato grande.",
      o: [
        { t: "Aceptar con todo", d: { car: 4, rep: 3, ene: -5, msg: "Es tuyo. También lo son las noches del próximo semestre." } },
        { t: "Aceptar con condiciones de horario", d: { car: 2, cri: 2, ene: -1, msg: "Pones límites desde el primer día. Raro, pero te los respetan." } },
        { t: "Pasarlo esta vez", d: { ene: 3, car: -2, msg: "Lo agarra otro. Tú recuperas los fines de semana." } },
      ] },
    { id: 15034, por: "Elegiste entre la boda y el pitch", t: "Tu amigo te pide revisar un crédito",
      x: "Tu amigo quiere comprar un apartamento y te pide que le mires los números del crédito hipotecario.",
      o: [
        { t: "Revisarle todo con calma", d: { red: 5, ene: -2, cri: 1, msg: "Le encuentras una comisión escondida. Te invita a cenar por el resto del año." } },
        { t: "Darle lo básico por mensaje", d: { red: 1, ene: 1, msg: "Tres líneas de consejo. Firma igual el primero que le ofrecieron." } },
        { t: "Mandarlo con un contacto del banco", d: { red: 3, msg: "Tu contacto lo atiende bien. Tu amigo queda contento y tu contacto, en deuda." } },
      ] },
    { id: 15035, por: "Le pediste perdón a tu amigo", t: "Vuelven los domingos de asado",
      x: "Te vuelven a invitar. Nadie menciona la boda, salvo un tío del novio, cada vez.",
      o: [
        { t: "Reírte y servir otra ronda", d: { red: 3, ene: 2, msg: "El tío sigue con el chiste. Ya no duele, ya es tradición." } },
        { t: "Ofrecerte a organizar el próximo", d: { red: 4, ene: -2, cash: -500, msg: "Compras carne de más. Nadie se queja de eso." } },
      ] },
    { id: 15036, por: "Le pediste perdón a tu amigo", t: "Algo quedó roto",
      x: "Tu amigo te contesta, pero en corto. Las conversaciones duran lo que dura un café.",
      o: [
        { t: "Aceptar la nueva distancia", d: { ene: 1, red: -1, msg: "Hay amistades que cambian de tamaño. Esta cabe ahora en un café." } },
        { t: "Insistir un tiempo más", d: { red: 2, ene: -3, msg: "Lo invitas cinco veces. Viene a dos. Es más de lo que esperabas." } },
      ] },

    /* ───────── raíz 19: prensa al teléfono ───────── */
    { id: 15040, por: "Atendiste la llamada de un periodista", t: "El periodista quiere una fuente fija",
      x: "El mismo periodista insiste. Quiere una voz para su columna mensual y te tiene en la lista.",
      o: [
        { t: "Aceptar, siempre con datos públicos", d: { rep: 4, red: 3, ene: -2, deja: "l5_columnista", msg: "Una cita al mes, todo verificable. Empiezas a ser el que explica el sector.",
          luego: [{ en: 2, s: "cri", azar: [{ p: 55, id: 15045, bueno: true }, { p: 45, id: 15046, bueno: false }] }] } },
        { t: "Aceptar, pero sin tu nombre", d: { red: 3, cri: -2, msg: "Eres «una fuente del sector». Todo el sector sabe quién es la fuente." } },
        { t: "Decir que no, gracias", d: { ene: 1, rep: 1, msg: "Te despides con amabilidad. Busca a otro, que acepta en un minuto." } },
      ] },
    { id: 15041, por: "Diste una entrevista técnica en vivo", t: "Un clip tuyo circula",
      x: "Un fragmento de la entrevista se volvió viral, cortado a la mitad. Dicen que predijiste una crisis.",
      o: [
        { t: "Publicar la entrevista completa", d: { rep: 3, cri: 2, msg: "El contexto es menos viral que el clip, pero los que importan lo ven." } },
        { t: "No decir nada y esperar", d: { rep: -2, ene: 1, msg: "En una semana nadie se acuerda. Salvo un cliente, que te pregunta por la crisis." } },
        { t: "Aprovechar y abrir una cuenta de análisis", d: { red: 5, rep: -1, ene: -3, msg: "Mil seguidores nuevos que quieren otra predicción. Tú solo querías explicar." } },
      ] },
    { id: 15042, por: "Hablaste con la prensa del sector", t: "Un fondo pide reunirse",
      x: "Un fondo leyó tu cita y quiere que les expliques el sector una tarde. Podría salir un mandato.",
      o: [
        { t: "Ir y dar la clase gratis", d: { red: 5, rep: 2, ene: -2, msg: "Les explicas todo con paciencia. Se acuerdan de ti cuando abren el próximo fondo." } },
        { t: "Ir con una propuesta de servicio", d: { cash: 3000, car: 2, red: 1, msg: "Sales con un encargo pequeño y una tarjeta de su director." } },
        { t: "Pasarle el contacto a un colega", d: { red: -1, rep: 1, msg: "Tu colega cierra el mandato y te invita a un almuerzo. Uno solo." } },
      ] },
    { id: 15043, por: "Atendiste la llamada de un periodista", t: "La firma redacta una política de prensa", empleado: true,
      x: "Después de lo tuyo, la firma escribe por fin una política de prensa. Te piden opinión antes de cerrarla.",
      o: [
        { t: "Proponer reglas claras y cortas", d: { rep: 3, cri: 2, msg: "Una página. La aprueban casi sin cambios, cosa rara en un comité." } },
        { t: "Pedir que no hable nadie", d: { rep: 1, red: -2, msg: "Queda prohibido hablar. Dos colegas te lo agradecen y diez te lo reprochan." } },
        { t: "Ofrecerte como vocero oficial", d: { car: 3, rep: 2, ene: -3, msg: "Ahora atiendes todas las llamadas. Las buenas y las de los lunes temprano." } },
      ] },
    { id: 15044, por: "Le pasaste la entrevista al socio", t: "El socio sale bien parado", empleado: true,
      x: "El socio dio la entrevista y salió citado con elegancia. En la reunión de equipo te agradece la preparación.",
      o: [
        { t: "Prepararle la próxima también", d: { red: 3, car: 2, ene: -2, msg: "Te vuelves su apuntador. Útil, discreto y un poco invisible." } },
        { t: "Pedir aparecer la próxima vez", d: { rep: 2, red: -1, car: 1, msg: "Te dice que sí, pero no esta temporada. Algo es algo." } },
        { t: "Decir que prefieres no meterte", d: { ene: 2, car: -1, msg: "Vuelves a tus modelos. La prensa sigue sin saber cómo te llamas." } },
      ] },
    { id: 15045, por: "Aceptaste ser fuente fija de un periodista", t: "Tu columna tiene lectores",
      x: "Ya te reconocen en los eventos del sector. Algunos clientes llegan diciendo que te leen.",
      o: [
        { t: "Subir la frecuencia", d: { rep: 3, red: 3, ene: -4, msg: "Una cita por semana. Te leen más y duermes menos." } },
        { t: "Mantener el ritmo", d: { rep: 2, ene: 1, msg: "Una al mes, siempre sólida. Lo escaso también se cotiza." } },
      ] },
    { id: 15046, por: "Aceptaste ser fuente fija de un periodista", t: "Una cita mal transcrita",
      x: "El periódico te atribuye una cifra que nunca dijiste. Un cliente llama, molesto.",
      o: [
        { t: "Exigir una corrección pública", d: { rep: 2, red: -2, ene: -2, msg: "Sale en letra pequeña, tres días después. El periodista te habla menos." } },
        { t: "Llamar al cliente y explicarlo", d: { red: 2, rep: 1, msg: "El cliente entiende. Te pide que la próxima le avises antes." } },
        { t: "Dejar la columna", d: { rep: -1, ene: 3, msg: "Te bajas. El periodista encuentra otra voz en una semana." } },
      ] },

    /* ───────── raíz 20: alguien se cuelga de tu trabajo ───────── */
    { id: 15050, por: "Viste a un colega presentar tu análisis", t: "El colega te pide una mano", empleado: true,
      x: "El mismo colega necesita ayuda con un modelo urgente. Esta vez promete poner tu nombre en la portada.",
      o: [
        { t: "Ayudarlo, con tu nombre por escrito", d: { red: 3, rep: 2, ene: -2, msg: "Le mandas el modelo con tu nombre en cada pestaña. No hay forma de olvidarlo." } },
        { t: "Decirle que no", d: { red: -3, ene: 2, msg: "Lo hace solo y le sale regular. Nadie te puede culpar de eso." } },
        { t: "Ayudarlo sin condiciones", d: { red: 4, rep: -2, ene: -3, msg: "Tu nombre no aparece. Otra vez. Al menos ahora él lo sabe." } },
      ] },
    { id: 15051, por: "Viste a un colega presentar tu análisis", t: "El comité dice tu nombre", empleado: true,
      x: "El comité abre la sesión citando tu análisis por nombre. El colega estudia la mesa con mucho interés.",
      o: [
        { t: "Agradecer y seguir", d: { rep: 3, red: 1, msg: "Dices gracias y pasas al siguiente punto. La elegancia también se nota." } },
        { t: "Aprovechar para pedir el próximo mandato", d: { car: 3, rep: 1, red: -1, msg: "Lo pides ahí mismo. Te lo dan. Al colega le toca el que nadie quería." } },
      ] },
    { id: 15052, por: "Escalaste al socio lo de tu colega", t: "Fama de conflictivo", empleado: true,
      x: "En tu evaluación anual aparece la palabra «colaboración» tres veces, siempre junto a «mejorar».",
      o: [
        { t: "Pedir ejemplos concretos", d: { cri: 3, rep: 1, msg: "Te dan uno solo, y es el del colega. Queda por escrito que fue uno." } },
        { t: "Bajar el perfil un año", d: { rep: 2, car: -2, msg: "Colaboras con todo el mundo. Nadie te da crédito, pero tampoco te lo quita." } },
        { t: "Empezar a buscar otra firma", d: { red: 3, car: 1, ene: -2, msg: "Actualizas el perfil y aceptas cafés. Por ahora, solo cafés." } },
      ] },
    { id: 15053, por: "Dejaste pasar que un colega usara tu trabajo", t: "Vuelve a pasar", empleado: true,
      x: "El mismo colega presenta otro trabajo tuyo. Ahora lo hace con más soltura, como quien practica.",
      o: [
        { t: "Sacar tus notas y hablar con el socio", d: { rep: 2, red: -2, cri: 2, msg: "Llevas fechas, versiones y correos. Lo que anotaste por fin sirve.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 60, id: 15055, bueno: true }, { p: 40, id: 15056, bueno: false }] }] } },
        { t: "Hablarlo con él, esta vez sí", d: { red: 1, rep: 2, msg: "Se hace el sorprendido. Pero en la siguiente sesión te menciona dos veces." } },
        { t: "Dejarlo pasar otra vez", d: { ene: 1, car: -3, rep: -2, msg: "Ya es costumbre. La de él, no la tuya." } },
      ] },
    { id: 15054, por: "Viste a un colega presentar tu análisis", t: "El colega se va a la competencia", empleado: true,
      x: "Lo contrataron afuera, en parte por análisis que eran tuyos. Te invita a su despedida.",
      o: [
        { t: "Ir y despedirte con elegancia", d: { red: 3, msg: "Brindas por él. En el sector todos se cruzan otra vez, y lo sabes." } },
        { t: "No ir", d: { ene: 1, red: -1, msg: "Esa noche terminas un modelo. Tuyo, con tu nombre." } },
        { t: "Ir y decirle algo en privado", d: { red: -2, ene: 2, cri: 1, msg: "Le dices que en la próxima firma tendrá que hacer sus propios análisis. Sonríe, nervioso." } },
      ] },
    { id: 15055, por: "Llevaste tus notas al socio", t: "Tus notas convencen", empleado: true,
      x: "El socio lee tus notas con fecha y hora. Al colega lo sacan del caso esa misma tarde.",
      o: [
        { t: "Ofrecerte para retomar el caso", d: { car: 3, rep: 2, ene: -3, msg: "El caso vuelve a quien lo hizo. Raro que el orden natural tarde tanto." } },
        { t: "Pedir que el equipo firme sus trabajos", d: { rep: 3, red: 2, msg: "Ahora cada análisis lleva autor. Varios colegas te lo agradecen en voz baja." } },
      ] },
    { id: 15056, por: "Llevaste tus notas al socio", t: "El socio prefiere no meterse", empleado: true,
      x: "El socio dice que son cosas de equipo y que confía en que lo resuelvan entre ustedes.",
      o: [
        { t: "Resolverlo entre ustedes, sin rodeos", d: { red: -3, rep: 1, msg: "Se lo dices en la cara. Desde entonces se cruzan en el pasillo sin saludarse." } },
        { t: "Tomar nota de cuánto vale el socio", d: { cri: 3, car: -1, msg: "Una nota más para tu carpeta. Esta es sobre él." } },
      ] },

    /* ───────── raíz 21: llega el bono ───────── */
    { id: 15060, por: "Invertiste parte de tu bono", t: "El portafolio cae fuerte", empleado: true,
      x: "El mercado corrige y tu portafolio queda en rojo. En la oficina todos hablan de vender.",
      o: [
        { t: "No tocar nada", d: { cri: 4, ene: -1, msg: "No vendes. Tampoco miras. Es la mitad del trabajo." } },
        { t: "Comprar más con el sueldo del mes", d: { cash: -2000, cri: 2, msg: "Compras en la caída. Te sientes valiente y un poco imprudente.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 15065, bueno: true }, { p: 45, id: 15066, bueno: false }] }] } },
        { t: "Vender y dormir tranquilo", d: { cash: -1500, ene: 3, cri: -2, msg: "Duermes. El portafolio, sin ti, se recupera en tres meses." } },
      ] },
    { id: 15061, por: "Invertiste parte de tu bono", t: "El portafolio rinde", empleado: true,
      x: "Un buen año. Lo que invertiste del bono ya rinde como otro bono pequeño.",
      o: [
        { t: "Reinvertir lo ganado", d: { cash: 1500, cri: 2, msg: "Lo dejas trabajar. El interés compuesto no hace ruido, pero trabaja." } },
        { t: "Sacar la ganancia", d: { cash: 3000, msg: "La tomas y la guardas. Hay cosas que se disfrutan más en efectivo." } },
        { t: "Darte un gusto con la ganancia", d: { cash: 1500, ene: 3, msg: "Te compras lo que llevabas un año mirando. Sin culpa, porque salió de la ganancia." } },
      ] },
    { id: 15062, por: "Repartiste el bono entre disfrute y ahorro", t: "El viaje te cambió la cabeza", empleado: true,
      x: "Del viaje corto volviste descansado y con ideas. Tu jefe nota que estás más filoso.",
      o: [
        { t: "Proponer una idea nueva al comité", d: { rep: 3, car: 2, ene: -1, msg: "La idea se te ocurrió en una playa. En el comité la presentas como fruto de mucho análisis." } },
        { t: "Guardarte la energía", d: { ene: 3, msg: "No gastas el descanso en el primer mes. Lo vas soltando de a poco." } },
        { t: "Planear el próximo viaje", d: { ene: 2, cash: -1000, car: -1, msg: "Ya tienes fechas. Tu jefe ve el calendario y suspira." } },
      ] },
    { id: 15063, por: "Decidiste qué hacer con tu bono", t: "Tu jefe pregunta por el bono", empleado: true,
      x: "En el almuerzo, tu jefe quiere saber qué hiciste con el bono. La mesa entera se calla para escuchar.",
      o: [
        { t: "Contarlo con detalle", d: { rep: 2, red: 2, msg: "Explicas tu criterio. Dos colegas te piden consejo esa misma tarde." } },
        { t: "Responder con una broma", d: { red: 1, ene: 1, msg: "Dices que lo gastaste en café. Nadie te cree, pero todos se ríen." } },
        { t: "Contar solo lo que salió bien", d: { rep: -1, red: 2, msg: "Suenas a genio. Un colega lo repite y ahora todos esperan que lo seas." } },
      ] },
    { id: 15064, por: "Decidiste qué hacer con tu bono", t: "Un colega busca socios", empleado: true,
      x: "Un colega arma un negocio de apartamentos en alquiler y busca socios con el bono fresco.",
      o: [
        { t: "Entrar con una parte", d: { cash: -3000, red: 3, cri: -1, msg: "Firmas. El primer año el alquiler paga justo los gastos." } },
        { t: "Pedir ver los números primero", d: { cri: 3, red: 1, msg: "Los números tienen un supuesto de ocupación optimista. Se lo dices con cariño." } },
        { t: "No mezclar dinero y oficina", d: { red: -1, cri: 1, msg: "Le dices que no por principio. Lo entiende, aunque lo anota." } },
      ] },
    { id: 15065, por: "Compraste más en la caída", t: "El rebote", empleado: true,
      x: "El mercado se recupera y lo que compraste en la caída sube con fuerza.",
      o: [
        { t: "Vender lo comprado y cerrar el ciclo", d: { cash: 5000, cri: 3, msg: "Entraste con miedo y saliste con ganancia. Lo anotas para la próxima." } },
        { t: "Dejarlo para el largo plazo", d: { cash: 1000, cri: 2, msg: "No vendes nada. El largo plazo, dicen, siempre paga. Ya veremos cuándo." } },
      ] },
    { id: 15066, por: "Compraste más en la caída", t: "La caída siguió", empleado: true,
      x: "El mercado baja un trimestre más. Revisas la cuenta menos de lo que te gustaría admitir.",
      o: [
        { t: "Aguantar sin mirar", d: { cri: 3, ene: -2, msg: "Borras la aplicación del teléfono. Es la mejor decisión financiera del año." } },
        { t: "Vender en el peor momento", d: { cash: -3000, ene: 2, msg: "Vendes justo en el piso. Lo sabrás dentro de un mes, y te va a doler." } },
      ] },

    /* ───────── raíz 22: fusión de tu firma ───────── */
    { id: 15070, por: "Te posicionaste temprano en la fusión", t: "Los que llegan cambian de jefe", empleado: true,
      x: "La casa regional rota a su director. El nuevo no conoce a nadie y desconfía de todos los que llegaron primero.",
      o: [
        { t: "Presentarte de cero, con resultados", d: { rep: 3, car: 1, ene: -3, msg: "Le llevas tres números y ningún adjetivo. Te pide una segunda reunión." } },
        { t: "Buscar a tus aliados de antes", d: { red: 2, car: -1, msg: "Tus aliados también están buscando aliados. Se apoyan entre todos, con poca fuerza." } },
        { t: "Empezar a mirar afuera", d: { red: 3, car: -1, ene: -1, msg: "Aceptas dos cafés con la competencia. Por ahora, solo cafés." } },
      ] },
    { id: 15071, por: "Te posicionaste temprano en la fusión", t: "Te ofrecen la oficina regional", empleado: true,
      x: "Te proponen dirigir la cobertura en otra ciudad. Más cargo, más horas y otro aeropuerto.",
      o: [
        { t: "Aceptar", d: { car: 5, cash: 4000, ene: -5, msg: "Te mudas con dos maletas. El cargo nuevo cabe en una y el cansancio en la otra." } },
        { t: "Negociar quedarte con más equipo", d: { car: 3, red: 2, msg: "No te mudas, pero crece tu equipo. Ganas sin cambiar de código postal." } },
        { t: "Declinar", d: { ene: 2, car: -2, msg: "Lo agradeces y te quedas. La oferta no vuelve, pero tú tampoco la extrañas." } },
      ] },
    { id: 15072, por: "Sobreviviste a la fusión de tu firma", t: "Segunda ronda de recortes", empleado: true,
      x: "Llega otra lista. Esta vez tu equipo entero está en revisión.",
      o: [
        { t: "Defender a tu equipo con números", d: { rep: 3, red: 3, ene: -3, deja: "l5_defendiste_equipo", msg: "Llevas lo que factura cada uno. Ese día tu equipo sabe para quién trabaja.",
          luego: [{ en: 1, s: "rep", azar: [{ p: 50, id: 15075, bueno: true }, { p: 50, id: 15076, bueno: false }] }] } },
        { t: "Asegurar tu puesto primero", d: { car: 2, red: -4, msg: "Te quedas. Dos de tu equipo, no. Los otros recuerdan el silencio." } },
        { t: "Negociar una salida con buen paquete", d: { cash: 8000, car: -3, ene: 2, msg: "Sales con un buen cheque y un año para pensar. No todos tienen esa suerte." } },
      ] },
    { id: 15073, por: "Bajaste la cabeza durante la fusión", t: "Nadie sabe quién eres", empleado: true,
      x: "En el nuevo organigrama tu nombre aparece en una caja sin líneas. Te invitan a pocas reuniones.",
      o: [
        { t: "Pedir reunión con el nuevo jefe", d: { red: 3, rep: 1, ene: -1, msg: "Te da quince minutos. Usas diez. Te recuerda por eso." } },
        { t: "Aprovechar la calma para formarte", d: { mod: 4, cri: 2, car: -1, msg: "Haces el curso que llevabas años postergando. La caja sin líneas tiene sus ventajas." } },
        { t: "Acelerar la búsqueda afuera", d: { red: 3, car: 1, ene: -2, msg: "Si adentro no te ven, afuera sí. Tres entrevistas en un mes." } },
      ] },
    { id: 15074, por: "Atravesaste la fusión de tu firma", t: "Un cazatalentos llama", empleado: true,
      x: "Sabe que hubo fusión y supone que estás inquieto. Trae una oferta de la competencia.",
      o: [
        { t: "Escuchar la oferta en serio", d: { red: 3, cri: 1, msg: "Es buena, pero no tanto. Ahora sabes cuánto vales afuera." } },
        { t: "Usarla para negociar adentro", d: { cash: 3000, car: 1, rep: -1, msg: "Te igualan. También te anotan como alguien que se puede ir." } },
        { t: "Decir que no, gracias", d: { rep: 1, ene: 1, msg: "Le pides que te llame en un año. Lo apunta. Lo hará." } },
      ] },
    { id: 15075, por: "Defendiste a tu equipo en los recortes", t: "Salvaste a casi todos", empleado: true,
      x: "La lista se recorta a la mitad. Tu equipo lo sabe, y el nuevo director también.",
      o: [
        { t: "Pedirles un trimestre impecable", d: { rep: 3, car: 2, ene: -2, msg: "Lo entregan. Nadie vuelve a poner a tu equipo en una lista." } },
        { t: "Celebrarlo con ellos", d: { red: 4, cash: -800, msg: "Una cena larga. Alguien hace un brindis que te deja sin palabras." } },
      ] },
    { id: 15076, por: "Defendiste a tu equipo en los recortes", t: "Te cobraron la defensa", empleado: true,
      x: "Salvaste a dos, pero te quitan una línea de cobertura. Queda claro que hubo un precio.",
      o: [
        { t: "Aceptarlo sin quejarte", d: { rep: 2, car: -2, msg: "Pierdes territorio y ganas equipo. A la larga, cambio justo." } },
        { t: "Pedir explicaciones", d: { rep: -2, cri: 2, msg: "Te las dan, a medias. Al menos ahora sabes cómo se decide aquí." } },
      ] },

    /* ───────── raíz 23: devaluación de la noche a la mañana ───────── */
    { id: 15080, por: "Rehiciste los modelos en dólares de urgencia", t: "Tus supuestos se vuelven referencia",
      x: "Otros analistas citan tus supuestos en dólares. Algunos sin decir de dónde salieron.",
      o: [
        { t: "Publicar la metodología completa", d: { rep: 4, red: 2, msg: "Ahora te citan con nombre. Copiarte sin hacerlo queda feo." } },
        { t: "Guardarla para clientes", d: { cash: 2500, red: -1, msg: "Los clientes pagan por lo que el resto adivina. Al gremio no le encanta." } },
      ] },
    { id: 15081, por: "Rehiciste los modelos en dólares de urgencia", t: "Un error en la conversión",
      x: "Un cliente encontró una celda con el tipo de cambio viejo. Justo en el modelo que más circuló.",
      o: [
        { t: "Corregir y avisar a todos", d: { rep: 2, cri: 3, ene: -2, msg: "Mandas la versión corregida con una nota corta. La honestidad rápida casi no cuesta." } },
        { t: "Corregir en silencio", d: { rep: -3, ene: 1, msg: "Lo arreglas sin avisar. El cliente que lo encontró lo comenta en un almuerzo." } },
        { t: "Culpar a la fuente de datos", d: { rep: -4, red: -2, msg: "La fuente publica que sus datos estaban bien. Con captura de pantalla." } },
      ] },
    { id: 15082, por: "Viviste una devaluación de un día para otro", t: "Segunda devaluación",
      x: "El tipo de cambio vuelve a saltar. Esta vez nadie se sorprende, salvo los modelos.",
      o: [
        { t: "Montar un modelo que se ajuste solo", d: { mod: 5, ene: -3, msg: "Un fin de semana de fórmulas. El tipo de cambio ahora es una celda, no un drama.",
          luego: [{ en: 1, s: "mod", azar: [{ p: 50, id: 15085, bueno: true }, { p: 50, id: 15086, bueno: false }] }] } },
        { t: "Rehacerlo a mano otra vez", d: { mod: 2, ene: -4, msg: "Ya conoces el camino. Eso no lo hace más corto." } },
        { t: "Publicar rangos en vez de cifras", d: { cri: 4, rep: 1, msg: "Dices «entre esto y esto». Menos titular, más verdad." } },
      ] },
    { id: 15083, por: "Esperaste a que el tipo de cambio se calmara", t: "El cliente que se fue",
      x: "Un cliente se pasó a la firma que publicó primero. Te manda un correo cortés y definitivo.",
      o: [
        { t: "Llamarlo con un análisis nuevo", d: { red: 3, ene: -2, cash: 1000, msg: "Te da una segunda oportunidad, pequeña. La aprovechas." } },
        { t: "Dejarlo ir", d: { car: -2, ene: 1, msg: "Le respondes con educación. Otro cliente menos, otra lección más." } },
        { t: "Armar escenarios por adelantado", d: { cri: 4, mod: 2, ene: -2, msg: "La próxima devaluación ya tiene modelo antes de existir." } },
      ] },
    { id: 15084, por: "Esperaste a que el tipo de cambio se calmara", t: "Esperar tenía su lógica",
      x: "El tipo de cambio rebota a la mitad del salto. Los que corrieron tienen que rehacer todo otra vez.",
      o: [
        { t: "Publicar ahora, con calma", d: { rep: 3, cri: 2, msg: "Tu nota llega tarde y llega bien. Esta vez, tarde fue a tiempo." } },
        { t: "Señalar el error de los apurados", d: { rep: -2, red: -3, msg: "Tienes razón y lo dices. El gremio prefiere a los que tienen razón en silencio." } },
      ] },
    { id: 15085, por: "Armaste un modelo que se ajusta solo", t: "Todos quieren tu plantilla",
      x: "Colegas de otras áreas te piden la plantilla. Algunos ofrecen pagar por ella.",
      o: [
        { t: "Venderla por licencias", d: { cash: 4000, red: -1, msg: "Cobras por copia. Alguien la piratea al mes, como corresponde." } },
        { t: "Regalarla dentro del gremio", d: { red: 5, rep: 3, msg: "Tu plantilla circula con tu nombre en la primera pestaña. Publicidad gratis." } },
      ] },
    { id: 15086, por: "Armaste un modelo que se ajusta solo", t: "Nadie entiende tu modelo",
      x: "El modelo funciona, pero tiene tantas pestañas que solo tú sabes usarlo.",
      o: [
        { t: "Simplificarlo un fin de semana", d: { mod: 3, ene: -3, msg: "Quitas la mitad de las pestañas. Funciona igual y ahora lo entiende un pasante." } },
        { t: "Dejarlo así: te vuelve imprescindible", d: { car: 2, red: -2, ene: -2, msg: "Imprescindible también quiere decir que no te puedes ir de vacaciones." } },
      ] },

    /* ───────── raíz 24: enseñarle al pasante nuevo ───────── */
    { id: 15090, por: "Le dedicaste horas al pasante nuevo", t: "El pasante te salva un cierre",
      x: "A las once de la noche encuentra el error que llevabas una hora buscando.",
      o: [
        { t: "Darle el crédito frente a todos", d: { red: 4, rep: 2, msg: "Lo dices en la reunión. El pasante se pone rojo y trabaja el doble esa semana." } },
        { t: "Pedirle que revise todo lo tuyo", d: { ene: 3, cri: 1, msg: "Ahora tienes un segundo par de ojos. Barato y con ganas." } },
      ] },
    { id: 15091, por: "Recibiste a un pasante nuevo", t: "Quieren contratar al pasante",
      x: "Lo quieren dejar fijo y piden tu opinión. Tu opinión pesa más de lo que creías.",
      o: [
        { t: "Recomendarlo con todo", d: { red: 4, rep: 1, msg: "Lo contratan. Te lo agradece con un café que se vuelve costumbre." } },
        { t: "Ser honesto con sus puntos flojos", d: { cri: 3, red: -1, rep: 1, msg: "Lo contratan igual, con un plan de mejora. Él lo sabe y te respeta un poco más." } },
        { t: "Pedir que lo asignen contigo", d: { car: 2, ene: 2, msg: "Ahora tienes equipo, aunque sea de uno. Ya cuenta." } },
      ] },
    { id: 15092, por: "Recibiste a un pasante nuevo", t: "El pasante comete un error grande",
      x: "Mandó al cliente la versión equivocada del modelo. Con tus comentarios internos incluidos.",
      o: [
        { t: "Dar la cara tú con el cliente", d: { rep: -1, red: 3, ene: -2, msg: "Llamas y explicas. El pasante escucha la llamada desde la puerta.",
          luego: [{ en: 1, s: "rep", azar: [{ p: 55, id: 15095, bueno: true }, { p: 45, id: 15096, bueno: false }] }] } },
        { t: "Que lo explique él", d: { cri: 2, red: -2, msg: "Lo explica temblando. Aprende mucho y te quiere un poco menos." } },
        { t: "Revisar en qué falló el proceso", d: { cri: 3, ene: -2, msg: "No falló él, falló que nadie revisaba antes de enviar. Ahora hay una regla." } },
      ] },
    { id: 15093, por: "Le dedicaste horas al pasante nuevo", t: "El antiguo pasante te llama",
      x: "El que no sabía usar buscarv ya trabaja en otra firma. Tiene un mandato y busca con quién hacerlo.",
      o: [
        { t: "Hacer el mandato juntos", d: { cash: 3000, red: 4, ene: -2, msg: "Trabaja rápido y ordenado. Reconoces tus propias manías en sus modelos." } },
        { t: "Pasarle contactos y nada más", d: { red: 2, msg: "Le das tres nombres. Uno le sirve y te lo cuenta." } },
        { t: "Decir que estás lleno", d: { ene: 1, red: -1, msg: "Lo entiende. Te dice que la próxima te llama antes." } },
      ] },
    { id: 15094, por: "Dejaste que el pasante aprendiera solo", t: "El pasante pidió cambio de equipo",
      x: "Pidió pasarse con otra analista. Ella dice que es el mejor pasante que ha tenido.",
      o: [
        { t: "Preguntarle qué hiciste mal", d: { cri: 3, red: 1, msg: "Te lo dice con tacto: nunca le explicaste nada. Duele porque es cierto." } },
        { t: "Encogerte de hombros", d: { ene: 1, red: -1, msg: "Uno menos que cuidar. También uno menos que te cubra en un cierre." } },
        { t: "Pedirle a ella su método", d: { red: 2, cri: 2, msg: "Te lo cuenta en un almuerzo. Es menos misterioso de lo que pensabas: paciencia." } },
      ] },
    { id: 15095, por: "Diste la cara por el error del pasante", t: "El cliente lo tomó bien",
      x: "Al cliente le pareció honesto. Hasta le gustó leer tus comentarios internos, dice.",
      o: [
        { t: "Agradecer y apretar los controles", d: { cri: 2, rep: 1, msg: "Ahora todo pasa por dos manos antes de salir. El pasante es una de ellas." } },
        { t: "Mostrarle más del trabajo interno", d: { rep: 3, red: 2, msg: "Le compartes el razonamiento, no solo el resultado. El cliente se queda tres años más." } },
      ] },
    { id: 15096, por: "Diste la cara por el error del pasante", t: "El cliente pide otro equipo",
      x: "El cliente pide que otro equipo lleve la cuenta. Lo dice con mucha educación.",
      o: [
        { t: "Pelear la cuenta", d: { rep: 1, red: -1, ene: -3, msg: "Te la dejan a prueba un trimestre. Un trimestre muy largo." } },
        { t: "Soltarla y aprender", d: { cri: 3, car: -2, msg: "La pierdes. El pasante no. Lo eliges a él, y no te arrepientes." } },
      ] },

    /* ───────── raíz 26: comité de crédito difícil ───────── */
    { id: 15100, por: "Enfrentaste un comité de crédito difícil", t: "Uno de los duros te busca",
      x: "Uno de los dos miembros que vinieron buscando sangre te invita a un café. Quiere entender cómo piensas.",
      o: [
        { t: "Ir y escuchar más que hablar", d: { red: 4, cri: 2, msg: "Te cuenta en qué se quemó hace años. Ahora entiendes sus preguntas." } },
        { t: "Ir con el modelo abierto", d: { mod: 2, rep: 2, ene: -1, msg: "Le muestras las tripas del modelo. Se va convencido de que no escondes nada." } },
        { t: "Excusarte", d: { red: -2, ene: 1, msg: "Le dices que estás con mucho trabajo. Lo anota en su lista de sangre." } },
      ] },
    { id: 15101, por: "Defendiste un factoring en un sector volátil", t: "El sector se cae",
      x: "El sector que defendiste tiene su peor trimestre. En los pasillos todos repiten la palabra «volátil».",
      o: [
        { t: "Escribir un análisis de lo que pasó", d: { cri: 4, rep: 2, ene: -2, msg: "Explicas qué falló y qué no. Lo leen hasta los que vinieron por sangre." } },
        { t: "No decir nada", d: { rep: -1, ene: 1, msg: "Esperas a que pase. Pasa, pero tu nombre queda pegado al sector." } },
        { t: "Proponer una alerta temprana", d: { mod: 3, rep: 3, ene: -3, msg: "Armas tres indicadores que avisan antes de la caída. Riesgo los adopta." } },
      ] },
    { id: 15102, por: "Defendiste un factoring en un sector volátil", t: "El sector repunta",
      x: "Los deudores del sector pagan antes de tiempo. Alguien en el comité recuerda que lo dijiste.",
      o: [
        { t: "Proponer ampliar la línea", d: { car: 3, rep: 2, msg: "El comité te escucha esta vez sin afilar cuchillos. Te dan más cupo.",
          luego: [{ en: 2, s: "cri", azar: [{ p: 55, id: 15105, bueno: true }, { p: 45, id: 15106, bueno: false }] }] } },
        { t: "No cantar victoria", d: { cri: 3, rep: 1, msg: "Dices que un buen trimestre no hace un sector. Los duros asienten, por primera vez." } },
      ] },
    { id: 15103, por: "Retiraste tu caso del comité", t: "Tu caso reforzado hace escuela",
      x: "El caso que retiraste volvió bien armado y se aprobó. Ahora el comité pide que todos presenten así.",
      o: [
        { t: "Escribir una guía para el equipo", d: { rep: 3, red: 2, ene: -2, msg: "Cinco páginas que todos copian. Tu forma de presentar se vuelve la norma." } },
        { t: "Guardarte el método", d: { car: 2, red: -2, msg: "Sigues siendo el que mejor presenta. Por ahora." } },
      ] },
    { id: 15105, por: "Ampliaste la línea de factoring", t: "La línea ampliada rinde",
      x: "La línea cierra el año sin un solo impago. Tu nombre aparece en la presentación al directorio.",
      o: [
        { t: "Pedir un bono por resultado", d: { cash: 5000, rep: 1, msg: "Lo pides con los números en la mano. Difícil decir que no." } },
        { t: "Pedir más equipo", d: { car: 3, ene: 2, msg: "Te dan dos analistas. El próximo comité ya no lo preparas solo." } },
      ] },
    { id: 15106, por: "Ampliaste la línea de factoring", t: "Un deudor grande no paga",
      x: "Un deudor grande deja de pagar sus facturas. La línea que ampliaste tiene que absorberlo.",
      o: [
        { t: "Liderar la cobranza tú mismo", d: { ene: -5, rep: 3, cri: 2, msg: "Recuperas buena parte en tres meses de llamadas. Los duros del comité lo notan." } },
        { t: "Activar las coberturas y documentar todo", d: { cri: 4, rep: 1, msg: "Las coberturas hacen su trabajo. Por eso estaban ahí." } },
        { t: "Dejar que riesgo lo maneje", d: { rep: -3, ene: 2, msg: "Riesgo lo maneja. En el comité, la línea ya tiene apellido: el tuyo." } },
      ] },

    /* ───────── raíz 27: reunión con la familia dueña ───────── */
    { id: 15110, por: "Te reuniste con una familia dueña", t: "Un hermano te llama a solas",
      x: "El hermano menor quiere verte sin los otros. Dice que tiene información que ellos no te van a dar.",
      o: [
        { t: "Ir, pero contárselo a los tres", d: { rep: 3, red: -1, msg: "Le adviertes antes que lo vas a compartir. Te cuenta menos, pero nada que te hunda." } },
        { t: "Ir y guardar el secreto", d: { red: 3, rep: -2, msg: "Te cuenta todo en voz baja. Sales sabiendo más y durmiendo peor.",
          luego: [{ en: 1, s: "red", azar: [{ p: 45, id: 15115, bueno: true }, { p: 55, id: 15116, bueno: false }] }] } },
        { t: "No ir sin los otros", d: { rep: 2, red: -2, msg: "Le dices que con gusto, pero con sus hermanos. No vuelve a llamar." } },
      ] },
    { id: 15111, por: "Te reuniste con una familia dueña", t: "Los hermanos se ponen de acuerdo",
      x: "Contra todo pronóstico, firman. Lo único que los unió fue no querer pagarte el fee completo.",
      o: [
        { t: "Aceptar el descuento y cerrar", d: { cash: 3000, red: 2, msg: "Cobras menos y te recomiendan a dos primos. Que también se pelean." } },
        { t: "Sostener el fee completo", d: { cash: 6000, rep: 1, red: -2, msg: "Pagan, unidos otra vez, esta vez contra ti. Al menos están de acuerdo en algo." } },
        { t: "Ofrecer pago en dos partes", d: { cash: 4000, cri: 2, msg: "La mitad ahora y la mitad al cierre. Los tres aceptan, cada uno por su motivo." } },
      ] },
    { id: 15112, por: "Te reuniste con una familia dueña", t: "La empresa se parte en tres",
      x: "Los hermanos no se ponen de acuerdo y dividen la empresa. Cada uno quiere su propio asesor.",
      o: [
        { t: "Quedarte con uno de los tres", d: { cash: 2000, red: 2, rep: -1, msg: "Eliges al más ordenado. Los otros dos te ven como del otro bando." } },
        { t: "Retirarte del caso", d: { rep: 2, ene: 2, msg: "Te vas con elegancia. Uno de los tres te llama al año para otra cosa." } },
        { t: "Asesorar a los tres por separado", d: { cash: 4000, rep: -4, ene: -3, msg: "Tres honorarios, tres reuniones, tres versiones de la misma historia. Agotador." } },
      ] },
    { id: 15113, por: "Mandaste una propuesta por escrito", t: "Otra firma se mete en el caso",
      x: "Mientras esperabas respuesta a tu propuesta, otra firma fue a cenar con los tres hermanos.",
      o: [
        { t: "Pedir una reunión en persona", d: { red: 3, ene: -2, msg: "Llegas tarde pero llegas. Te escuchan con el postre de la otra firma en la memoria." } },
        { t: "Mejorar la propuesta por escrito", d: { cri: 2, red: -1, msg: "La nueva propuesta es impecable. La leen después de firmar con los otros." } },
        { t: "Soltar el caso", d: { ene: 2, car: -1, msg: "Te ahorras tres hermanos. A veces perder un caso es ganar meses." } },
      ] },
    { id: 15114, por: "Te reuniste con una familia dueña", t: "Aparece la madre",
      x: "La madre de los tres, dueña de una parte que nadie había mencionado, pide conocerte.",
      o: [
        { t: "Ir a almorzar con ella", d: { red: 5, ene: -2, msg: "Te cuenta cómo fundó la empresa. Al postre, ya sabes quién decide." } },
        { t: "Pedir que vengan todos", d: { rep: 2, cri: 1, msg: "Llegan los cuatro. Por primera vez, los hermanos hablan bajito." } },
      ] },
    { id: 15115, por: "Guardaste el secreto de un hermano", t: "El secreto vale oro",
      x: "Lo que te contó el menor era cierto y cambia la valoración. Llegas a la mesa con ventaja.",
      o: [
        { t: "Usarlo sin revelar la fuente", d: { cash: 4000, rep: -1, msg: "Cierras mejor de lo esperado. El menor te guiña un ojo en la firma." } },
        { t: "Ponerlo sobre la mesa abiertamente", d: { rep: 3, red: -2, cash: 2000, msg: "Los mayores se enojan con el menor y te respetan a ti. Mal negocio para él." } },
      ] },
    { id: 15116, por: "Guardaste el secreto de un hermano", t: "Los otros dos se enteran",
      x: "Los dos mayores supieron de la reunión a solas. Te acusan de jugar para un bando.",
      o: [
        { t: "Contar todo lo que se habló", d: { rep: 1, red: -3, msg: "Los mayores se calman. El menor no te vuelve a dirigir la palabra." } },
        { t: "Retirarte del caso", d: { rep: -2, ene: 3, msg: "Te vas antes de que te saquen. Lo cuentas distinto según quién pregunte." } },
      ] },

    /* ───────── raíz 28: un cliente grande aprieta ───────── */
    { id: 15120, por: "Sostuviste tus honorarios ante un cliente grande", t: "El cliente vuelve",
      x: "El cliente que se fue pide reunirse. El asesor que contrató en tu lugar no le funcionó.",
      o: [
        { t: "Volver con los mismos términos", d: { cash: 6000, rep: 3, msg: "Acepta sin discutir. Lo que vale no se rebaja dos veces." } },
        { t: "Volver con un descuento de bienvenida", d: { cash: 4000, red: 3, msg: "Le das un gesto, no una rendición. Lo entiende y lo agradece." } },
        { t: "No volver", d: { rep: 1, ene: 2, msg: "Ya llenaste ese hueco con otros. Se lo dices con amabilidad." } },
      ] },
    { id: 15121, por: "Sostuviste tus honorarios ante un cliente grande", t: "La caja se resiente",
      x: "Sin la cuenta grande, el trimestre cierra corto. Hay que decidir qué se recorta.",
      o: [
        { t: "Recortar tu propio bono", d: { cash: -4000, rep: 3, red: 3, msg: "Lo dices en la reunión de equipo. Nadie se va ese año." } },
        { t: "Recortar viajes y eventos", d: { cash: -1000, red: -2, msg: "Menos congresos, menos cenas. El equipo lo nota en la cara y en el calendario." } },
        { t: "Salir a buscar clientes nuevos", d: { red: 4, ene: -4, cash: 1000, msg: "Veinte reuniones en un mes. Tres se convierten en algo." } },
      ] },
    { id: 15122, por: "Negociaste el fee con un cliente grande", t: "Alguien del equipo renuncia",
      x: "La analista más sólida del equipo presenta su renuncia. Dice que no es por el fee, y no le crees.",
      o: [
        { t: "Hacerle una contraoferta", d: { cash: -3000, red: 2, msg: "Se queda. Por ahora. El resto del equipo hace sus cuentas." } },
        { t: "Dejarla ir con una buena carta", d: { red: 3, car: -2, msg: "Se va agradecida. Desde la otra firma, te manda clientes." } },
        { t: "Repartir su trabajo entre los demás", d: { ene: -4, red: -3, msg: "Todos trabajan más por lo mismo. La próxima renuncia ya está escribiéndose." } },
      ] },
    { id: 15123, por: "Negociaste el fee con un cliente grande", t: "El cliente pide más",
      x: "Contento con el esquema, el cliente propone extenderlo a dos mandatos más.",
      o: [
        { t: "Decir que no esta vez", d: { rep: 3, cash: -2000, msg: "Te quedas con un mandato y no con tres. El equipo respira." } },
        { t: "Aceptar con un tope", d: { cash: 2000, cri: 2, msg: "Pones un límite al castigo. El cliente lo acepta, a regañadientes." } },
        { t: "Aceptar todo", d: { cash: 4000, red: -4, ene: -4, msg: "Facturas más y tu equipo trabaja el doble por la misma tarifa.",
          luego: [{ en: 1, azar: [{ p: 60, id: 15125, bueno: false }, { p: 40, id: 15126, bueno: true }] }] } },
      ] },
    { id: 15124, por: "Negociaste el fee con un cliente grande", t: "El mandato contingente cierra",
      x: "El éxito llega. La parte fija era baja, pero la variable paga el año entero.",
      o: [
        { t: "Repartir el éxito con el equipo", d: { cash: 3000, red: 5, msg: "Cada uno recibe su parte. Nadie se acuerda de la negociación." } },
        { t: "Guardar la caja para el próximo bache", d: { cash: 6000, cri: 2, red: -1, msg: "Lo prudente. El equipo lo entiende, sin aplaudir." } },
      ] },
    { id: 15125, por: "Aceptaste extender el fee castigado", t: "El equipo se planta",
      x: "El equipo pide una reunión sin ti. Al día siguiente llegan con una lista de condiciones.",
      o: [
        { t: "Aceptar sus condiciones", d: { cash: -3000, red: 5, msg: "Pagas la diferencia de tu bolsillo. El equipo no se va." } },
        { t: "Negociar una por una", d: { cri: 2, red: -1, ene: -3, msg: "Tres tardes de negociación. Ganas en el papel y pierdes en el pasillo." } },
      ] },
    { id: 15126, por: "Aceptaste extender el fee castigado", t: "Los mandatos pagan",
      x: "Los dos mandatos cierran rápido y la parte variable paga más de lo previsto. El equipo, agotado.",
      o: [
        { t: "Dar una semana libre a todos", d: { red: 4, cash: -1500, ene: 2, msg: "Una semana sin correos. Vuelven con ganas de seguir." } },
        { t: "Pasar al siguiente", d: { cash: 2000, red: -4, msg: "No hay tiempo para celebrar. Alguien lo anota." } },
      ] },

    /* ───────── raíz 29: auditoría interna ───────── */
    { id: 15130, por: "Pasaste por una auditoría de tus expedientes", t: "El auditor te pone de ejemplo",
      x: "En el informe final, tus expedientes aparecen como modelo de orden para el resto.",
      o: [
        { t: "Ofrecerte a capacitar", d: { rep: 3, red: 2, ene: -3, msg: "Das una charla de una hora. Los que no vinieron son los que más la necesitaban." } },
        { t: "Agradecer y seguir", d: { rep: 1, ene: 1, msg: "Lo guardas en tu carpeta. Un día te va a servir." } },
      ] },
    { id: 15131, por: "Pasaste por una auditoría de tus expedientes", t: "Falta una firma",
      x: "Un mandato de hace dos años no tiene la aprobación firmada. La persona que aprobó ya no está en la firma.",
      o: [
        { t: "Buscar al que aprobó y pedirle constancia", d: { red: 2, ene: -3, rep: 1, msg: "Lo encuentras en otra firma. Te dice que lo va a pensar.",
          luego: [{ en: 1, s: "red", azar: [{ p: 60, id: 15135, bueno: true }, { p: 40, id: 15136, bueno: false }] }] } },
        { t: "Reportarlo tal cual", d: { rep: 2, car: -1, msg: "Lo dices antes que te lo pregunten. Hallazgo menor, credibilidad mayor." } },
        { t: "Escribir un memo con el contexto", d: { cri: 3, msg: "El auditor lo archiva. Ni suma ni resta, pero queda." } },
      ] },
    { id: 15132, por: "Pediste tiempo antes de entregar a la auditoría", t: "En la lista de seguimiento",
      x: "El auditor anotó que pediste tiempo. Desde entonces revisan tus expedientes cada trimestre.",
      o: [
        { t: "Abrirle tu carpeta cada mes", d: { rep: 3, ene: -2, msg: "Le mandas todo antes de que pida. En un año, te saca de la lista." } },
        { t: "Pedir que te saquen de la lista", d: { rep: -1, cri: 1, msg: "Te dicen que nadie te acusa de nada. Por eso mismo te van a seguir mirando." } },
        { t: "Montar un archivo que se ordene solo", d: { mod: 4, ene: -3, msg: "Ahora cada documento se guarda con fecha y responsable. La auditoría ya no asusta." } },
      ] },
    { id: 15133, por: "Pasaste por una auditoría de tus expedientes", t: "Ahora auditan a un colega",
      x: "Le toca a un colega y está en pánico. Te pide que le cuentes cómo te fue.",
      o: [
        { t: "Ayudarle a ordenar su carpeta", d: { red: 4, ene: -3, msg: "Dos noches de papeles. Sale bien y te debe una grande." } },
        { t: "Contarle lo justo", d: { red: 1, ene: 1, msg: "Le das tres consejos. Usa dos." } },
        { t: "Mantenerte al margen", d: { rep: 1, red: -2, msg: "No es tu auditoría. Él lo entiende, aunque no lo olvida." } },
      ] },
    { id: 15135, por: "Buscaste al que aprobó el mandato", t: "La constancia llega",
      x: "El antiguo aprobador firma una constancia con fecha. El auditor cierra el hallazgo.",
      o: [
        { t: "Invitarlo a almorzar", d: { red: 3, cash: -500, msg: "Hablan del pasado y de su firma nueva. Sales con un contacto más." } },
        { t: "Pedir que cambie el proceso", d: { rep: 3, cri: 2, msg: "Ahora ninguna aprobación queda sin firma. Gracias a tu susto." } },
      ] },
    { id: 15136, por: "Buscaste al que aprobó el mandato", t: "El que aprobó no se acuerda",
      x: "El que aprobó dice que no se acuerda de nada. Lo dice demasiado rápido.",
      o: [
        { t: "Escalarlo con lo que tienes", d: { rep: 1, red: -3, msg: "Llevas correos y fechas. El hallazgo queda compartido entre los dos." } },
        { t: "Asumir el hallazgo", d: { rep: -3, cri: 2, msg: "Lo firmas tú. Una mancha pequeña y una regla nueva: nada sin firma." } },
      ] },
  ],

  raices: {
    /* tu primo y la cripto */
    "16": {
      "0": { deja: "l5_cripto_acotada", luego: [{ en: 1, azar: [{ p: 25, id: 15010, bueno: true }, { p: 45, id: 15011, bueno: false }, { p: 30, id: 15012 }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 15011 }, { p: 30, id: 15012 }, { p: 35, id: 15013, bueno: true }] }] },
    },
    /* el cuerpo pasa factura */
    "17": {
      "0": { deja: "l5_hora_diaria", luego: [{ en: 1, s: "ene", azar: [{ p: 30, id: 15020 }, { p: 30, id: 15021, bueno: true }, { p: 25, id: 15024, bueno: true }, { p: 15, id: 15022, bueno: false }] }] },
      "1": { deja: "l5_aguantaste", luego: [{ en: 1, s: "ene", azar: [{ p: 45, id: 15022, bueno: false }, { p: 30, id: 15023 }, { p: 25, id: 15021, bueno: true }] }] },
    },
    /* la boda y el pitch */
    "18": {
      "0": { deja: "l5_fuiste_boda", luego: [{ en: 1, s: "red", azar: [{ p: 25, id: 15030, bueno: true }, { p: 30, id: 15031 }, { p: 30, id: 15034 }, { p: 15, id: 15033 }] }] },
      "1": { deja: "l5_faltaste_boda", luego: [{ en: 1, s: "red", azar: [{ p: 45, id: 15032, bueno: false }, { p: 35, id: 15033, bueno: true }, { p: 20, id: 15034 }] }] },
    },
    /* prensa al teléfono */
    "19": {
      "0": { luego: [{ en: 1, s: "rep", azar: [{ p: 35, id: 15040 }, { p: 35, id: 15042, bueno: true }, { p: 30, id: 15043 }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 40, id: 15041, bueno: false }, { p: 25, id: 15040 }, { p: 20, id: 15042, bueno: true }, { p: 15, id: 15043 }] }] },
      "2": { luego: [{ en: 1, azar: [{ p: 45, id: 15044 }, { p: 30, id: 15043 }, { p: 25, id: 15040 }] }] },
    },
    /* alguien se cuelga de tu trabajo */
    "20": {
      "0": { deja: "l5_limite_puesto", luego: [{ en: 1, s: "rep", azar: [{ p: 40, id: 15050 }, { p: 30, id: 15054 }, { p: 30, id: 15051, bueno: true }] }] },
      "1": {
        ok: { luego: [{ en: 1, azar: [{ p: 50, id: 15051 }, { p: 30, id: 15054 }, { p: 20, id: 15050 }] }] },
        no: { luego: [{ en: 1, azar: [{ p: 60, id: 15052 }, { p: 25, id: 15054 }, { p: 15, id: 15050 }] }] },
      },
      "2": { deja: "l5_lo_anotaste", luego: [{ en: 1, azar: [{ p: 55, id: 15053 }, { p: 25, id: 15054 }, { p: 20, id: 15050 }] }] },
    },
    /* llega el bono */
    "21": {
      "0": { deja: "l5_bono_invertido", luego: [{ en: 2, s: "cri", azar: [{ p: 35, id: 15060, bueno: false }, { p: 35, id: 15061, bueno: true }, { p: 15, id: 15063 }, { p: 15, id: 15064 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 35, id: 15062 }, { p: 25, id: 15061 }, { p: 20, id: 15060 }, { p: 20, id: 15063 }] }] },
    },
    /* fusión de tu firma */
    "22": {
      "0": { deja: "l5_fusion_temprano", luego: [{ en: 1, s: "red", azar: [{ p: 30, id: 15070 }, { p: 30, id: 15071, bueno: true }, { p: 20, id: 15072, bueno: false }, { p: 20, id: 15074 }] }] },
      "1": { luego: [{ en: 1, s: "rep", azar: [{ p: 40, id: 15073 }, { p: 35, id: 15072, bueno: false }, { p: 25, id: 15074 }] }] },
    },
    /* devaluación */
    "23": {
      "0": { luego: [{ en: 1, s: "mod", azar: [{ p: 35, id: 15080, bueno: true }, { p: 30, id: 15081, bueno: false }, { p: 35, id: 15082 }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 45, id: 15083, bueno: false }, { p: 25, id: 15084, bueno: true }, { p: 30, id: 15082 }] }] },
    },
    /* el pasante nuevo */
    "24": {
      "0": { deja: "l5_mentor", luego: [{ en: 1, azar: [{ p: 35, id: 15090 }, { p: 30, id: 15091 }, { p: 15, id: 15092 }, { p: 20, id: 15093 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 45, id: 15094 }, { p: 35, id: 15092 }, { p: 20, id: 15091 }] }] },
    },
    /* comité de crédito difícil */
    "26": {
      "0": { luego: [{ en: 1, s: "cri", azar: [{ p: 30, id: 15100 }, { p: 35, id: 15101, bueno: false }, { p: 35, id: 15102, bueno: true }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 15103, bueno: true }, { p: 20, id: 15100 }, { p: 25, id: 15101, bueno: false }, { p: 20, id: 15102 }] }] },
    },
    /* la familia dueña */
    "27": {
      "0": { luego: [{ en: 1, s: "red", azar: [{ p: 30, id: 15110 }, { p: 25, id: 15111, bueno: true }, { p: 25, id: 15112, bueno: false }, { p: 20, id: 15114 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 40, id: 15113 }, { p: 25, id: 15112 }, { p: 20, id: 15114 }, { p: 15, id: 15111 }] }] },
    },
    /* un cliente grande aprieta */
    "28": {
      "0": { deja: "l5_honorarios_firmes", luego: [{ en: 2, s: "rep", azar: [{ p: 50, id: 15120, bueno: true }, { p: 50, id: 15121, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 15124, bueno: true }, { p: 30, id: 15122, bueno: false }, { p: 20, id: 15123 }] }] },
      "2": { deja: "l5_cediste_fee", luego: [{ en: 1, azar: [{ p: 50, id: 15122 }, { p: 35, id: 15123 }, { p: 15, id: 15124 }] }] },
    },
    /* auditoría interna */
    "29": {
      "0": { luego: [{ en: 1, s: "cri", azar: [{ p: 40, id: 15130, bueno: true }, { p: 35, id: 15131, bueno: false }, { p: 25, id: 15133 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 50, id: 15132 }, { p: 25, id: 15131 }, { p: 25, id: 15133 }] }] },
    },
  },

  finales: [
    { id: "l5_hora_sagrada", huellas: ["l5_hora_diaria"], t: "La hora que no se negoció",
      x: "Bloqueaste una hora diaria y la cumpliste aunque los cierres te miraran feo. Llegaste al final con la espalda derecha y la cabeza fría." },
    { id: "l5_escuela", huellas: ["l5_mentor"], t: "Dejaste escuela",
      x: "Le enseñaste al pasante que no sabía usar buscarv. Hoy hay gente en el sector que trabaja con tus manías y ni sabe de dónde las sacó." },
    { id: "l5_precio_justo", huellas: ["l5_honorarios_firmes"], t: "Cobraste lo que valías",
      x: "Perdiste una cuenta grande por no rebajarte. La recuperaste, o no, pero nadie volvió a preguntarte si tu precio era negociable." },
  ],
};
