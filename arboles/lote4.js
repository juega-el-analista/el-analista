/* Lote 4 de árboles de consecuencias de El Analista.
   Raíces 9601-9605: dueño de firma (futuro de dueño, nunca de empleado).
   Raíces 1-15: escenas de oficina. Ids 14000-14999, prefijo l4_. */
module.exports = {
  huellas: {
    l4_vendiste_parte: "Vendiste una parte de tu firma a un grupo más grande",
    l4_no_vendiste: "No vendiste tu firma cuando te la quisieron comprar",
    l4_socio_con_parte: "Le diste a tu mejor socio una parte de la firma",
    l4_socio_se_fue: "Dejaste que tu mejor socio se fuera con clientes",
    l4_bonos_generosos: "Repartiste los bonos de tu firma con generosidad",
    l4_bonos_para_ti: "Te quedaste con la mayor parte de los bonos",
    l4_fusionaste: "Fusionaste tu firma con un competidor",
    l4_por_tu_cuenta: "Rechazaste fusionarte y seguiste por tu cuenta",
    l4_miami: "Abriste una oficina en Miami",
    l4_avisaste_error: "Avisaste de inmediato de un error ya enviado",
    l4_error_disfrazado: "Disfrazaste una corrección como actualización",
    l4_mesa: "Te saltaste la certificación: tu escuela fue la mesa",
    l4_presentador: "Juntaste a un fondo con alguien que quería vender",
    l4_puente: "Mantuviste el puente con tu analista que se fue",
    l4_informacion_usada: "Usaste el número que te contó tu exanalista",
    l4_board: "Aceptaste una silla en una junta directiva",
    l4_rescate: "Lideraste el rescate de una compañía en problemas",
  },

  escenas: [
    /* ===== 9601 Te quieren comprar la firma ===== */
    { id: 14001, por: "Vendiste una parte minoritaria de tu firma", t: "El socio nuevo quiere opinar de todo",
      x: "Pide reportes mensuales, voto en cada contratación y copia de tus correos con clientes. Tiene la minoría y el tono de la mayoría.",
      o: [
        { t: "Darle reportes y poner límites por escrito", d: { cri: 4, rep: 2, ene: -2, msg: "Le mandas un pacto de socios de dos páginas. Lo firma de mala gana. Desde entonces, las reuniones duran la mitad." } },
        { t: "Ignorarlo hasta la próxima junta", d: { ene: 3, red: -2, msg: "Dejas sus correos sin abrir. Funciona tres semanas.",
          luego: [{ en: 1, azar: [{ p: 60, id: 14010, bueno: false }, { p: 40, id: 14011, bueno: true }] }] } },
        { t: "Usar su red para traer clientes", d: { red: 5, cash: 2000, ene: -2, msg: "Le pides presentaciones en vez de pelear por reportes. Te abre tres puertas y te recuerda quién las abrió." } },
      ] },
    { id: 14010, por: "Ignoraste a tu socio minoritario", t: "El socio manda a su abogado",
      x: "Cansado de que no le contestes, tu socio minoritario propone por escrito tener voto obligatorio en todo gasto grande de la firma.",
      o: [
        { t: "Aceptar y comprar la paz", d: { cri: 2, ene: 3, rep: -2, msg: "Firmas. Ahora cada compra grande necesita dos firmas, y una de ellas no es la tuya." } },
        { t: "Recomprarle su parte", d: { cash: -10000, rep: 3, cri: 2, msg: "Te cuesta más de lo que te pagó. La firma vuelve a ser toda tuya, y la lección también." } },
      ] },
    { id: 14011, por: "Ignoraste a tu socio minoritario", t: "El socio dejó de pelear y trajo un cliente",
      x: "Tu socio minoritario se cansó de pedir reportes y se puso a vender. Te trae un cliente que tú no habrías conseguido.",
      o: [
        { t: "Aceptarlo y agradecérselo en público", d: { red: 4, cash: 3000, rep: 2, msg: "Se lo agradeces delante del equipo. Él sonríe como quien por fin encontró su lugar en la mesa." } },
        { t: "Aceptarlo y dejar claro quién lleva la cuenta", d: { cash: 3000, cri: 2, red: -2, msg: "La cuenta la llevas tú. Él lo acepta y apunta, en algún lado, que el cliente lo trajo él." } },
      ] },
    { id: 14002, por: "Seguiste al mando cuando te quisieron comprar", t: "Los clientes quieren al dueño",
      x: "Dos clientes grandes te lo dicen la misma semana: se quedaron porque sigues siendo tú quien firma. Uno quiere más servicio por el mismo precio.",
      o: [
        { t: "Darle más servicio al mismo precio", d: { cash: -1500, rep: 4, red: 2, msg: "Le das el doble de horas. Te lo agradece con una renovación y con la costumbre de pedir más." } },
        { t: "Proponerles un contrato anual a los dos", d: { cash: 4000, cri: 2, red: -1, msg: "Uno firma y el otro lo piensa. Ahora sabes cuál de los dos era leal y cuál era cómodo." } },
      ] },
    { id: 14003, por: "Pediste más por tu firma y los hiciste esperar", t: "Tu precio corre por el mercado",
      x: "Se sabe cuánto pediste por tu firma. Unos lo leen como ambición y otros como señal de que estás de salida.",
      o: [
        { t: "Desmentir la salida con una cena para clientes", d: { cash: -2000, red: 4, rep: 2, msg: "Brindas, sonríes y repites que no te vas a ningún lado. Te creen a medias, que ya es bastante." } },
        { t: "Dejar que hablen", d: { ene: 2, rep: -2, msg: "No dices nada. Un cliente chico se va a una firma que, según él, sí va a existir el año que viene." } },
        { t: "Subir tus honorarios: si vales tanto, que se note", d: { cash: 5000, rep: -1, red: -2, msg: "Si tu firma vale eso, tus horas también. Pierdes un cliente chico y ganas margen con los grandes." } },
      ] },
    { id: 14004, por: "Te sentaste a hablar de vender tu firma", t: "Tu equipo supo de la negociación",
      x: "Alguien vio el borrador en la impresora. En la sala ya no se habla de mandatos sino de quién va a mandar el año que viene.",
      o: [
        { t: "Reunirlos y contarles la verdad", d: { rep: 4, red: 2, ene: -2, msg: "Les cuentas qué se ofreció y qué decidiste. Nadie aplaude, pero nadie actualiza su currículum esa semana." } },
        { t: "Negarlo y cambiar de tema", d: { ene: 1, rep: -4, msg: "Dices que fue un tanteo sin importancia. Tu mejor analista asiente y esa tarde almuerza con un headhunter." } },
        { t: "Prometer un reparto si algún día vendes", d: { red: 3, rep: 2, cri: -2, msg: "Prometes que si hay venta habrá reparto. La sala se calma y tú acabas de comprometer un dinero que no existe." } },
      ] },
    { id: 14005, por: "No vendiste tu firma", t: "Un año flojo y sin colchón",
      x: "Se caen dos mandatos seguidos y la caja aprieta. Aquel cheque que no firmaste ahora pesa más en la memoria que en la cuenta.",
      o: [
        { t: "Recortar empezando por tu sueldo", d: { cash: -3000, rep: 4, ene: -2, msg: "Te bajas el sueldo antes que a nadie. El equipo lo nota y deja de preguntar si la firma va a cerrar." } },
        { t: "Pedir una línea de crédito para aguantar", d: { cash: 5000, cri: -2, ene: 2, msg: "El banco te presta con la firma de garantía. Duermes un poco mejor y piensas un poco peor." } },
        { t: "Salir a vender tú, como al principio", d: { red: 5, ene: -4, cash: 2000, msg: "Vuelves a las llamadas en frío. Cuesta, pero en tres meses entran dos mandatos chicos." } },
      ] },

    /* ===== 9602 Tu mejor socio quiere irse con clientes ===== */
    { id: 14051, por: "Le diste a tu socio una parte de la firma", t: "Tu socio ya no trabaja igual",
      x: "Desde que es dueño de una parte, llega más tarde y factura menos. Dice que ahora le toca pensar en estrategia.",
      o: [
        { t: "Ponerle metas en el pacto de socios", d: { cri: 3, red: -2, cash: 1500, msg: "Le pones números al lado de su nombre. Los cumple, y te saluda con una cortesía nueva y fría." } },
        { t: "Hablarlo de frente en un almuerzo", d: { red: 3, rep: 2, ene: -2, msg: "Le dices lo que ves. Se ríe, se pone serio y el lunes llega primero. Te dura un trimestre." } },
        { t: "Dejarlo: se ganó un respiro", d: { ene: 2, cash: -2000, cri: -1, msg: "Lo dejas pensar en estrategia. La estrategia, por ahora, se parece mucho a jugar golf." } },
      ] },
    { id: 14052, por: "Le diste a tu socio una parte de la firma", t: "Tu socio trae un cliente enorme",
      x: "Ahora que gana con toda la firma, tu socio trae un cliente que jamás habría traído a una firma ajena.",
      o: [
        { t: "Darle a él la cuenta entera", d: { red: 4, cash: 6000, msg: "La cuenta es suya y la factura es de los dos. Por primera vez, su éxito te conviene sin matices." } },
        { t: "Llevarla juntos, por si acaso", d: { cri: 2, ene: -3, cash: 6000, red: -1, msg: "Te sientas en cada reunión. El cliente no sabe a quién mirar y tu socio sabe muy bien qué significa eso." } },
      ] },
    { id: 14053, por: "Le diste a tu socio una parte de la firma", t: "Tu socio quiere cambiar el rumbo",
      x: "Con su parte en la mano, propone dejar los mandatos chicos y perseguir solo operaciones grandes. La firma la construiste con los chicos.",
      o: [
        { t: "Ceder y probar un año a su manera", d: { cash: -2000, red: 2, msg: "Le das el año. Sueltas con dolor a dos clientes chicos y apuestas a tres grandes.",
          luego: [{ en: 1, s: "red", azar: [{ p: 45, id: 14060, bueno: true }, { p: 55, id: 14061, bueno: false }] }] } },
        { t: "Votar en contra: tú tienes la mayoría", d: { cri: 2, red: -3, rep: -1, msg: "Ganas la votación. Tu socio pierde la discusión y, por la cara que pone, algo más." } },
        { t: "Partir la diferencia: un equipo para cada cosa", d: { cri: 3, ene: -3, cash: -1000, msg: "Separas la firma en dos líneas. Más trabajo para ti y menos motivos para pelear." } },
      ] },
    { id: 14060, por: "Dejaste que tu socio apostara por lo grande", t: "Salió la operación grande",
      x: "De las tres apuestas de tu socio, una se cerró. Paga más que todos los mandatos chicos de un año, y él lo sabe.",
      o: [
        { t: "Reconocérselo delante del equipo", d: { rep: 3, red: 3, cash: 8000, msg: "Lo dices en voz alta. Te cuesta, pero tu socio deja de llevar la cuenta de quién tenía razón." } },
        { t: "Repartir según el pacto, ni más ni menos", d: { cash: 10000, cri: 2, red: -2, msg: "El pacto dice lo que dice. Él cobra lo justo y tú, más de lo que te habrías atrevido a apostar." } },
      ] },
    { id: 14061, por: "Dejaste que tu socio apostara por lo grande", t: "Las apuestas grandes se cayeron",
      x: "Las tres operaciones se cayeron en la recta final. Los clientes chicos que soltaste ya trabajan con otra firma.",
      o: [
        { t: "Volver a los chicos y pedir perdón", d: { ene: -3, rep: -2, red: 2, cash: -2000, msg: "Llamas uno por uno. Vuelven dos, con descuento y con memoria." } },
        { t: "Darle a tu socio un segundo año", d: { cash: -4000, cri: -3, red: 3, msg: "Le das otra oportunidad. Te lo agradece con una lealtad que la caja no sabe contar." } },
      ] },
    { id: 14054, por: "Dejaste que tu mejor socio se fuera", t: "Tu exsocio va por otro cliente",
      x: "Tu exsocio llama a uno de los clientes que se quedaron contigo. Le ofrece lo mismo por menos.",
      o: [
        { t: "Igualar el precio", d: { cash: -2500, red: 2, msg: "Igualas. El cliente se queda y aprende que contigo también se negocia." } },
        { t: "Recordarle al cliente por qué está contigo", d: { red: 3, rep: 3, ene: -2, msg: "Le llevas el historial de lo que hiciste por él. Se queda sin pedir descuento." } },
        { t: "Dejarlo ir sin pelear", d: { ene: 2, cash: -2000, cri: 1, msg: "Lo dejas ir. Te duele menos de lo que esperabas y más de lo que admites." } },
      ] },
    { id: 14055, por: "Dejaste que tu mejor socio se fuera", t: "Los clientes que quedan valen más",
      x: "Sin la agenda de tu socio, los clientes que quedaron reciben todo tu tiempo. Uno lo nota y te encarga el doble.",
      o: [
        { t: "Hacer tú todo el encargo", d: { cash: 5000, ene: -5, rep: 2, msg: "Lo haces todo tú. Entra el doble de dinero y salen el doble de canas." } },
        { t: "Contratar a alguien para atenderlo bien", d: { cash: 2000, cri: 2, red: 2, ene: -1, msg: "Contratas a un asociado bueno. Por primera vez desde la salida, alguien más sabe dónde están las cosas." } },
      ] },

    /* ===== 9603 Los bonos de fin de año los pones tú ===== */
    { id: 14101, por: "Repartiste los bonos con generosidad", t: "Nadie contesta a los headhunters",
      x: "Un fondo intentó llevarse a tres de tus analistas. Los tres te reenviaron el correo con un emoji de risa.",
      o: [
        { t: "Ascender al mejor de los tres", d: { cash: -2000, rep: 3, red: 2, msg: "Lo ascienden y los otros dos toman nota de cómo se sube aquí. Nadie habla de irse." } },
        { t: "Agradecer y seguir como si nada", d: { ene: 2, rep: 1, msg: "Les das las gracias. La lealtad no se cobra por correo, pero tampoco se pide dos veces." } },
      ] },
    { id: 14102, por: "Repartiste los bonos con generosidad", t: "La caja quedó corta",
      x: "Repartiste bien y después vino un trimestre seco. La nómina del mes que viene no cuadra.",
      o: [
        { t: "Poner la diferencia de tu bolsillo", d: { cash: -4000, rep: 3, ene: -1, msg: "Pagas de lo tuyo. Nadie se entera, que era la idea, y tu cuenta personal tampoco lo olvida." } },
        { t: "Contarle al equipo y pedir paciencia", d: { rep: 1, cri: 2, red: -1, msg: "Explicas los números. Uno se ofrece a cobrar tarde. Otro empieza a buscar trabajo." } },
        { t: "Adelantar el cobro a un cliente", d: { cash: 2000, red: -3, msg: "El cliente paga antes, a regañadientes. La nómina sale y la relación queda un poco más fría." } },
      ] },
    { id: 14103, por: "Decidiste tú solo el reparto de los bonos", t: "El equipo pide reglas claras",
      x: "El equipo quiere saber cómo se calcula el bono. Si depende de tu humor, por lo menos quieren conocer tu humor.",
      o: [
        { t: "Publicar una fórmula y atarte a ella", d: { cri: 3, rep: 3, cash: -1000, msg: "Escribes la fórmula. Pierdes margen para premiar a dedo y ganas una sala que ya no adivina." } },
        { t: "Seguir decidiendo tú, caso por caso", d: { ene: 1, rep: -2, red: -1, msg: "Les pides confianza. Algunos te la dan. Los que no, empiezan a hacer sus propias cuentas." } },
      ] },
    { id: 14104, por: "Te quedaste con la mayor parte de los bonos", t: "Tu mejor analista acepta otra oferta",
      x: "Se va a un fondo. En la carta dice que busca crecer; en el pasillo dicen que hizo la división de su bono.",
      o: [
        { t: "Contraofertar con lo que no le diste", d: { cash: -4000, rep: -1, msg: "Le ofreces ahora lo que no le diste en diciembre. Lo piensa una semana.",
          luego: [{ en: 1, azar: [{ p: 50, id: 14110, bueno: false }, { p: 50, id: 14111, bueno: true }] }] } },
        { t: "Dejarlo ir con buena cara", d: { red: 3, rep: 1, ene: -1, msg: "Le das la mano y una carta de recomendación. El fondo ahora tiene a alguien que habla bien de ti." } },
        { t: "Pedirle que entrene a su reemplazo", d: { cri: 2, mod: 2, ene: -2, msg: "Acepta. Dos semanas de traspaso te enseñan cuánto sabía y cuánto de eso no estaba escrito." } },
      ] },
    { id: 14110, por: "Retuviste a tu analista con una contraoferta", t: "Tu analista retenido ya no es el mismo",
      x: "Se quedó por el dinero. Cumple el horario exacto y cada tanto mira el celular como quien espera otra oferta.",
      o: [
        { t: "Darle un proyecto que lo entusiasme", d: { mod: 2, rep: 2, ene: -2, msg: "Le das el mandato más raro de la firma. Vuelve a quedarse tarde, esta vez porque quiere." } },
        { t: "Aceptar que es un contrato y nada más", d: { cri: 2, ene: 1, cash: -1000, msg: "Le pagas, te entrega, y ninguno de los dos finge más. Es menos bonito y bastante más honesto." } },
      ] },
    { id: 14111, por: "Retuviste a tu analista con una contraoferta", t: "Tu analista retenido se volvió clave",
      x: "La contraoferta lo hizo sentir valorado. Este año saca casi sin ayuda el mandato más difícil de la firma.",
      o: [
        { t: "Darle una participación pequeña", d: { cash: 2000, rep: 3, red: 3, msg: "Le das un pedazo chico de la firma. Él lo cuida como si fuera la mitad." } },
        { t: "Pagarle bien y no prometer nada más", d: { cash: 5000, cri: 1, red: -1, msg: "Le pagas un bono serio. Lo acepta contento y, por si acaso, no borra los correos del fondo." } },
      ] },
    { id: 14105, por: "Te quedaste con la mayor parte de los bonos", t: "Con lo que te quedaste, puedes elegir",
      x: "Tu parte de los bonos alcanza para algo que la firma pedía a gritos: mejores sistemas, un colchón para años malos o un capricho tuyo.",
      o: [
        { t: "Invertirlo en sistemas para el equipo", d: { cash: -3000, mod: 3, rep: 3, msg: "Compras licencias y servidores que no se caen. El equipo no olvida el bono, pero agradece que Excel ya no se cuelgue." } },
        { t: "Guardarlo como colchón de la firma", d: { cri: 3, ene: 2, msg: "Lo dejas en la cuenta de la firma. Si viene un año malo, lo pagará lo que hoy no repartiste." } },
        { t: "Gastártelo en ti", d: { cash: 3000, ene: 4, rep: -2, msg: "Te compras un reloj y un viaje. El reloj marca la misma hora que antes; el viaje sí lo necesitabas." } },
      ] },

    /* ===== 9604 Un competidor propone fusionarse ===== */
    { id: 14151, por: "Fusionaste tu firma con un competidor", t: "Dos firmas, dos maneras de trabajar",
      x: "Su gente llega a las siete y se va a las cinco; la tuya llega a las diez y se va de madrugada. Ya discuten hasta por la plantilla de Excel.",
      o: [
        { t: "Imponer tu manera de trabajar", d: { mod: 2, red: -3, rep: -1, msg: "Mandas tu plantilla a todos. La usan, la odian y le ponen tu nombre a tus espaldas." } },
        { t: "Adoptar la suya, aunque te cueste", d: { ene: 3, rep: 2, mod: -1, msg: "Empiezas a llegar a las siete. Descubres que a las cinco de la tarde el mundo sigue existiendo." } },
        { t: "Armar un comité para unificarlo todo", d: { ene: -3, cri: 2, red: 2, msg: "El comité tarda tres meses en elegir una tipografía. Pero la eligen juntos." } },
      ] },
    { id: 14152, por: "Fusionaste tu firma con un competidor", t: "El tamaño te abre una puerta grande",
      x: "Juntos tienen el tamaño que pedía un cliente que antes ni los miraba. Quiere una propuesta en dos semanas.",
      o: [
        { t: "Liderar tú la propuesta", d: { cash: 8000, rep: 3, ene: -4, msg: "Te quedas tres noches armándola. La ganan, y en el anuncio tu nombre sale primero." } },
        { t: "Dejar que la lidere tu socio", d: { cash: 8000, red: 3, rep: -1, msg: "Tu socio la lidera y la gana. La firma cobra y tú aprendes a no salir en la foto." } },
      ] },
    { id: 14153, por: "Fusionaste tu firma con un competidor", t: "Tu socio de fusión quiere tu cliente",
      x: "Propone que tu mejor cliente pase a su cartera: dice que conoce mejor el sector. Ese cliente es tuyo desde hace años.",
      o: [
        { t: "Cederlo por la paz de la firma", d: { red: 2, rep: -2, cash: -2000, ene: 2, msg: "Lo cedes. La firma se calma y tu cliente te escribe para preguntar qué hizo mal." } },
        { t: "Plantarte: ese cliente es tuyo", d: { rep: 2, red: -2, ene: -2, msg: "Dices que no en la junta. El silencio que sigue dura más que la junta.",
          luego: [{ en: 1, s: "rep", azar: [{ p: 50, id: 14160, bueno: false }, { p: 50, id: 14161, bueno: true }] }] } },
        { t: "Proponer llevarlo entre los dos", d: { cri: 2, ene: -2, red: 1, msg: "Lo llevan juntos. El cliente tiene ahora dos interlocutores y ninguna idea de cuál decide." } },
      ] },
    { id: 14160, por: "Te plantaste ante tu socio de fusión", t: "La fusión cruje",
      x: "Tu socio empieza a llevar a sus clientes a reuniones donde tú no estás. Su abogado pregunta cómo se deshace una fusión.",
      o: [
        { t: "Negociar una separación ordenada", d: { cash: -5000, cri: 3, ene: 2, msg: "Se separan con abogados y sin gritos. Pierdes la escala y recuperas las tardes." } },
        { t: "Pelear cada cláusula", d: { cash: -3000, rep: -3, ene: -4, red: -2, msg: "Peleas cláusula por cláusula. Ganas casi todas y pierdes un año entero en eso." } },
      ] },
    { id: 14161, por: "Te plantaste ante tu socio de fusión", t: "Tu socio retrocede y te respeta",
      x: "Tu socio deja el tema. Un mes después te pide que lideres la próxima propuesta grande. Ahora se sabe quién manda en lo que es tuyo.",
      o: [
        { t: "Aceptar y llevarlo de copiloto", d: { red: 3, rep: 3, cash: 5000, msg: "Lo sientas a tu lado en cada reunión. Ganan, y por primera vez la fusión parece una idea de los dos." } },
        { t: "Aceptar y hacerlo a tu manera", d: { cash: 5000, cri: 2, red: -1, msg: "Lo haces a tu modo. Sale bien. Tu socio aplaude, y aplaude un poco más despacio que el resto." } },
      ] },
    { id: 14154, por: "Rechazaste fusionarte con un competidor", t: "La competencia creció sin ti",
      x: "La firma que te propuso unirse se fusionó con otra. Ahora compite contigo con el doble de gente y precios más bajos.",
      o: [
        { t: "Bajar tus precios", d: { cash: -3000, red: 1, rep: -1, msg: "Igualas. Conservas a casi todos y trabajas igual por menos. No es una victoria, tampoco una derrota." } },
        { t: "Especializarte en lo que ellos no saben hacer", d: { cri: 4, mod: 2, cash: -1500, ene: -2, msg: "Te quedas con un nicho. Menos clientes, más difíciles y mejor pagados." } },
        { t: "Ofrecerles un acuerdo de referidos", d: { red: 4, cash: 1500, msg: "Les mandas lo que es muy grande para ti y ellos te mandan lo muy chico. Dos rivales que se pasan las sobras." } },
      ] },
    { id: 14155, por: "Rechazaste fusionarte con un competidor", t: "Un cliente huye de una fusión",
      x: "Un cliente deja a una firma recién fusionada porque ya no sabe quién lo atiende. Te busca a ti justamente por ser chica.",
      o: [
        { t: "Atenderlo tú en persona", d: { cash: 4000, rep: 3, ene: -3, msg: "Le das tu celular. Lo usa más de lo que quisieras y paga mejor de lo que esperabas." } },
        { t: "Cobrarle lo que vale la atención del dueño", d: { cash: 6000, cri: 2, red: -1, msg: "Le pones precio de dueño. Lo paga sin chistar: huía justamente de los descuentos." } },
      ] },

    /* ===== 9605 Tu cliente grande te pide abrir en Miami ===== */
    { id: 14201, por: "Abriste una oficina en Miami", t: "Miami cuesta más de lo que factura",
      x: "El alquiler, los permisos y la asistente bilingüe se comen lo que paga tu cliente. Fuera de él, la oficina no tiene a quién atender.",
      o: [
        { t: "Contratar a alguien de allá para vender", d: { cash: -4000, red: 2, msg: "Contratas a alguien con agenda local y sueldo de Miami. Promete clientes en seis meses.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 14210, bueno: true }, { p: 50, id: 14211, bueno: false }] }] } },
        { t: "Viajar más tú y vender en persona", d: { ene: -5, red: 4, cash: 2000, msg: "Pasas una semana al mes allá. Vendes, pero vuelves sin saber bien en qué ciudad vives." } },
        { t: "Achicarla a un escritorio compartido", d: { cash: 2000, cri: 2, rep: -2, msg: "Cambias la oficina por un escritorio en un espacio compartido. El cliente no lo nota; tu orgullo sí." } },
      ] },
    { id: 14210, por: "Contrataste a alguien para vender en Miami", t: "Tu fichaje de Miami empieza a vender",
      x: "Trae dos clientes en un año: una familia con negocios en tres países y un fondo pequeño que busca socio local.",
      o: [
        { t: "Darle una parte de lo que traiga", d: { cash: 6000, red: 3, rep: 2, msg: "Le das comisión sobre lo que traiga. Trae más, y ahora la oficina de Miami se paga sola." } },
        { t: "Pagarle bien y quedarte las cuentas", d: { cash: 9000, cri: 1, red: -1, msg: "Las cuentas quedan a nombre de la firma. Él cobra su sueldo y empieza a hacer cálculos en voz baja." } },
      ] },
    { id: 14211, por: "Contrataste a alguien para vender en Miami", t: "Tu fichaje de Miami se lleva la agenda",
      x: "Al año se independiza y se lleva a los dos clientes que había conseguido. Dice que eran suyos desde antes de conocerte.",
      o: [
        { t: "Reclamarle por la cláusula del contrato", d: { cash: -3000, rep: -1, ene: -3, cri: 1, msg: "Le mandas a tu abogado. Recuperas un cliente y una fama de pleitista que en Miami viaja rápido." } },
        { t: "Dejarlo ir y aprender a contratar", d: { cri: 4, cash: -1000, ene: 1, msg: "Lo dejas ir. El próximo contrato que firmes tendrá tres páginas más, todas sobre esto." } },
      ] },
    { id: 14202, por: "Abriste una oficina en Miami", t: "Miami trae clientes que no buscabas",
      x: "Tu cliente presume tu trabajo en un almuerzo y dos conocidos suyos te llaman. Tienen negocios aquí y casa allá.",
      o: [
        { t: "Atenderlos a los dos", d: { cash: 6000, ene: -4, red: 3, msg: "Los tomas a ambos. La oficina de Miami deja de ser un capricho y empieza a pagarse sola." } },
        { t: "Tomar solo al que encaja contigo", d: { cash: 3000, cri: 3, msg: "Eliges al más ordenado. El otro te habría hecho rico y te habría dejado sin fines de semana." } },
      ] },
    { id: 14203, por: "Abriste una oficina en Miami", t: "Partido entre dos ciudades",
      x: "Pasas la mitad del mes en aviones. En la oficina de aquí, las decisiones esperan a que aterrices.",
      o: [
        { t: "Darle poder de decisión a tu asociado", d: { cri: 3, red: 2, ene: 2, rep: 1, msg: "Le das poder de firma a tu asociado más sólido. Decide distinto que tú, a veces mejor, y eso duele dos veces." } },
        { t: "Seguir volando y decidir desde el aeropuerto", d: { ene: -5, red: 2, cash: 1000, mod: -1, msg: "Contestas correos en tres aeropuertos por semana. Nada se detiene; tú tampoco." } },
      ] },
    { id: 14204, por: "Atendiste a tu cliente de Miami a distancia", t: "Tu cliente encontró a alguien en Miami",
      x: "Para lo urgente, tu cliente ya usa una firma local. A ti te deja lo que puede esperar, que suele ser lo que menos paga.",
      o: [
        { t: "Volar allá una vez al mes", d: { cash: -2000, red: 3, ene: -3, msg: "Apareces cada mes con café y un informe. Recuperas parte de lo urgente y pierdes los domingos." } },
        { t: "Aliarte con la firma local", d: { red: 3, cri: 2, cash: 1000, msg: "Les propones repartir: ellos lo urgente, tú lo estratégico. El cliente agradece no tener que elegir." } },
        { t: "Aceptar el papel de segunda opinión", d: { ene: 2, cash: -2000, rep: -1, msg: "Te quedas con lo que llega. Menos trabajo, menos dinero y una llamada al mes en vez de diez." } },
      ] },
    { id: 14205, por: "Atendiste a tu cliente de Miami a distancia", t: "La distancia te favorece",
      x: "A tu cliente le sirve tener a alguien lejos del ruido de Miami. Te pide tu opinión sobre la compra más grande de su vida.",
      o: [
        { t: "Decirle lo que piensas, aunque no le guste", d: { cri: 4, rep: 4, msg: "Le dices que no compre. No compra, y a los seis meses te llama para darte las gracias." } },
        { t: "Cobrarle la opinión como un mandato", d: { cash: 6000, cri: 1, red: -1, msg: "Le pones precio de mandato. Lo paga, aunque esperaba que una opinión entre amigos fuera gratis." } },
      ] },

    /* ===== 1 Un DCF para mañana a las ocho ===== */
    { id: 14251, empleado: true, por: "Te dejaron un DCF urgente a las once de la noche", t: "Otra carpeta encima del teclado",
      x: "Ya tienes fama de resolver urgencias. El VP vuelve a dejarte una carpeta a última hora, esta vez un viernes.",
      o: [
        { t: "Quedarte otra vez", d: { mod: 3, ene: -5, car: 2, msg: "Lo sacas de nuevo. El VP ya ni pregunta si puedes; pregunta a qué hora." } },
        { t: "Negociar el lunes a primera hora", d: { cri: 3, ene: 2, car: -1, msg: "Pides hasta el lunes a las nueve. Lo concede con cara de favor. El cliente ni se entera." } },
        { t: "Proponer que las urgencias roten", d: { red: 2, rep: 1, ene: 2, car: -1, msg: "Propones un turno de urgencias. Tus compañeros te odian una semana y luego te lo agradecen." } },
      ] },
    { id: 14252, empleado: true, por: "Entregaste el DCF impecable antes de las ocho", t: "El cliente pregunta quién hizo el modelo",
      x: "En la reunión, el cliente quiere saber quién corrió las sensibilidades. El VP duda un segundo y te señala.",
      o: [
        { t: "Explicar el modelo en dos minutos", d: { rep: 4, car: 3, ene: -1, msg: "Lo explicas sin mirar notas. El cliente asiente y el VP te mira como a quien podría ocupar su silla." } },
        { t: "Darle el crédito al equipo", d: { red: 3, rep: 2, msg: "Dices que fue trabajo de todos. El VP te lo agradece en privado, que es donde se agradecen las cosas." } },
      ] },
    { id: 14253, empleado: true, por: "Armaste un DCF rápido, confiando en tu ojo", t: "Tu modelo de aquella noche vuelve",
      x: "El cliente lo va a usar para su oferta final. Tu jefe te pide revisarlo antes de que lo vea nadie más.",
      o: [
        { t: "Revisarlo entero, celda por celda", d: { mod: 4, cri: 2, ene: -4, msg: "Lo rehaces con calma. Ahora sí podrías defender cada número delante de cualquiera." } },
        { t: "Mandarlo tal cual: ya aguantó una vez", d: { ene: 2, cri: -2, msg: "Lo reenvías con un «revisado». Te sientes valiente hasta que llega la respuesta.",
          luego: [{ en: 1, s: "mod", azar: [{ p: 45, id: 14260, bueno: false }, { p: 55, id: 14261, bueno: true }] }] } },
        { t: "Pedirle a un compañero que lo audite", d: { red: 2, mod: 1, ene: -1, car: -1, msg: "Un compañero encuentra dos detalles y te los marca sin escándalo. Le debes un café, o varios." } },
      ] },
    { id: 14260, empleado: true, por: "Mandaste tu modelo rápido sin revisarlo", t: "El cliente encontró algo",
      x: "El equipo del cliente señala una tasa de descuento que no cuadra con nada. Tu jefe pregunta quién lo revisó.",
      o: [
        { t: "Decir la verdad: no lo revisé", d: { rep: -2, cri: 3, car: -2, msg: "Lo admites. Tu jefe resopla, lo corrige contigo y no lo menciona más. Tampoco lo olvida." } },
        { t: "Echarle la culpa a la prisa de aquella noche", d: { rep: -4, car: -3, red: -2, msg: "Culpas al plazo. Tu jefe te recuerda que aquella noche dijiste que podías." } },
      ] },
    { id: 14261, empleado: true, por: "Mandaste tu modelo rápido sin revisarlo", t: "Nadie notó nada",
      x: "El modelo pasa sin preguntas y la oferta sale. Tú sabes que hubo suerte. Tu jefe no.",
      o: [
        { t: "Revisarlo igual, en silencio", d: { mod: 3, cri: 2, ene: -2, msg: "Lo revisas un domingo, sin que nadie lo pida. Estaba bien. La próxima vez no lo dejarás al azar." } },
        { t: "Quedarte con la fama de rápido", d: { car: 3, rep: 2, cri: -2, msg: "Te gana fama de rápido y certero. La fama es buena; la mitad de lo certero la puso la suerte." } },
      ] },
    { id: 14254, empleado: true, por: "Pediste ayuda para sacar un DCF urgente", t: "Tu compañero reclama su parte",
      x: "El analista que te ayudó esa noche le cuenta al VP que la mitad del modelo era suya. Más o menos es cierto.",
      o: [
        { t: "Darle la razón delante del VP", d: { rep: 3, red: 3, car: -1, msg: "Dices que sí, que sin él no salía. El VP te mira distinto: como a alguien que no necesita robar crédito." } },
        { t: "Aclarar que la estructura la armaste tú", d: { car: 2, red: -3, rep: -1, msg: "Aclaras qué hizo cada uno. Tienes razón y pierdes un aliado. Las dos cosas a la vez." } },
      ] },
    { id: 14255, empleado: true, por: "Pediste ayuda para sacar un DCF urgente", t: "Te ponen a coordinar a dos pasantes",
      x: "Tu jefe vio cómo repartiste el trabajo aquella noche. En el próximo proceso te asigna dos pasantes y la tarea de que no se hundan.",
      o: [
        { t: "Enseñarles y revisar todo lo suyo", d: { rep: 3, red: 3, ene: -4, car: 2, msg: "Les enseñas tus atajos. Uno aprende rápido; el otro aprende a pedirte que lo hagas tú." } },
        { t: "Darles lo chico y hacer tú lo importante", d: { mod: 2, ene: -3, car: 1, rep: -1, msg: "Lo importante lo haces tú. Sale bien y nadie aprende nada, ni siquiera tú." } },
      ] },

    /* ===== 2 El error ya salió por correo ===== */
    { id: 14301, por: "Avisaste de inmediato del error en el modelo", t: "El cliente quiere que revises tú",
      x: "Desde la corrección, el cliente pide que tú mires cada número antes de que salga. Confía en quien admite sus errores.",
      o: [
        { t: "Aceptar y revisar todo lo suyo", d: { rep: 4, red: 2, car: 2, ene: -3, msg: "Te vuelves su filtro. Más trabajo, más visibilidad y un cliente que contesta tus correos primero." } },
        { t: "Aceptar, pero enseñarle al equipo a revisar", d: { red: 3, cri: 3, ene: -1, msg: "Armas una revisión que otros pueden hacer. El cliente quería tus ojos y se lleva un sistema." } },
      ] },
    { id: 14302, por: "Avisaste de inmediato del error en el modelo", t: "Te quedó la fama del error",
      x: "En cada reunión alguien recuerda, medio en broma, la deuda neta mal sumada. Ya va para un año.",
      o: [
        { t: "Reírte con ellos", d: { red: 2, ene: 1, rep: 1, msg: "Te ríes primero y más fuerte. Al tercer chiste, a nadie le hace gracia seguir haciéndolo." } },
        { t: "Pedir en serio que lo dejen", d: { rep: -1, red: -2, ene: 1, msg: "Lo pides con calma. Paran, pero ahora cuentan el chiste cuando no estás." } },
        { t: "Convertirlo en una charla para los nuevos", d: { rep: 4, red: 2, ene: -2, msg: "Das una charla sobre cómo se te coló el error. Los nuevos la recuerdan más que cualquier manual." } },
      ] },
    { id: 14303, por: "Te tocó corregir un error ya enviado al cliente", t: "Te toca diseñar la revisión",
      x: "Después del error, alguien tiene que diseñar el control que debió existir: una lista de chequeo para cada modelo que salga.",
      o: [
        { t: "Hacer una lista corta que se use", d: { cri: 4, rep: 2, ene: -1, msg: "Diez puntos, una página. La usa todo el mundo porque se termina en cinco minutos." } },
        { t: "Hacer la revisión perfecta y completa", d: { mod: 3, ene: -3, rep: -1, msg: "Cuarenta puntos y tres pestañas. Es impecable y nadie la abre después de la segunda semana." } },
      ] },
    { id: 14304, por: "Corregiste en silencio los errores del modelo", t: "El cliente pregunta por qué cambió",
      x: "El cliente compara versiones y ve que el equity value se movió. Quiere saber desde cuándo lo sabías.",
      o: [
        { t: "Contar la verdad, aunque llegue tarde", d: { cri: 3, rep: -1, red: -1, msg: "Le cuentas todo. Agradece la honestidad y anota, en algún lado, que tardó en llegar." } },
        { t: "Decir que fue una actualización normal", d: { rep: -2, ene: 1, deja: "l4_error_disfrazado", msg: "Dices que actualizaste supuestos. Suena razonable. Demasiado razonable.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 14310, bueno: true }, { p: 45, id: 14311, bueno: false }] }] } },
      ] },
    { id: 14310, por: "Disfrazaste una corrección como actualización", t: "El cliente lo dejó pasar",
      x: "Nadie preguntó más. El cliente firmó con el número corregido y el tema quedó enterrado debajo de otros temas.",
      o: [
        { t: "Dejarlo enterrado", d: { ene: 2, cri: -1, msg: "No lo tocas más. A veces, en las noches lentas, lo desentierras tú solo." } },
        { t: "Contarlo puertas adentro para que no se repita", d: { rep: 2, cri: 3, red: 1, msg: "Se lo cuentas al equipo, sin el cliente delante. El equipo aprende y tú duermes mejor." } },
      ] },
    { id: 14311, por: "Disfrazaste una corrección como actualización", t: "El cliente pide el historial de versiones",
      x: "El área legal del cliente pide todas las versiones del modelo con fecha y hora. Las tuyas cuentan otra historia.",
      o: [
        { t: "Entregarlas y asumirlo", d: { rep: -5, cri: 3, car: -3, msg: "Las entregas con una nota que lo explica todo. Pierdes el mandato y nada más, que ya es mucho decir." } },
        { t: "Pedir ayuda a alguien con más experiencia", d: { red: 2, rep: -3, car: -2, msg: "Alguien con canas habla con el cliente. Salva la relación y te deja claro cuánto le debes." } },
      ] },
    { id: 14305, por: "Corregiste en silencio los errores del modelo", t: "Ahora revisas todo tres veces",
      x: "Desde aquel susto revisas cada modelo tres veces antes de soltarlo. Eres más confiable y bastante más lento.",
      o: [
        { t: "Seguir así: mejor lento que en el correo", d: { mod: 3, ene: -3, car: -1, msg: "Tus modelos no fallan. Tus entregas, a veces, llegan cuando ya nadie las espera." } },
        { t: "Automatizar los chequeos en el modelo", d: { mod: 5, cri: 2, ene: -2, msg: "Armas fórmulas que se ponen en rojo cuando algo no cuadra. Revisas una vez y Excel revisa las otras dos." } },
      ] },

    /* ===== 3 Café con el socio ===== */
    { id: 14351, empleado: true, por: "Escuchaste al socio director en el café", t: "El socio te lleva a una reunión",
      x: "Se acordó de ti. Te pide que lo acompañes a ver a un cliente, solo a tomar notas y a no abrir la boca.",
      o: [
        { t: "Tomar notas y no decir nada", d: { cri: 3, red: 2, car: 1, msg: "Escribes todo y no hablas. Al salir, te pide tus notas. Las suyas eran peores." } },
        { t: "Hacer una pregunta, solo una", d: { rep: 2, red: 3, msg: "Haces una pregunta. El cliente la responde con gusto y el socio, con una mirada que no sabes leer." } },
      ] },
    { id: 14352, empleado: true, por: "Escuchaste al socio director en el café", t: "El socio te examina en el ascensor",
      x: "Te cruza en el ascensor y te pregunta qué aprendiste de lo que te contó aquella vez. Quedan cuatro pisos.",
      o: [
        { t: "Resumirlo en una frase y devolver una pregunta", d: { cri: 3, car: 2, red: 2, msg: "Le das una frase y le devuelves una pregunta. Llega a su piso sonriendo, que en él es mucho." } },
        { t: "Contarle cómo lo aplicaste en un modelo", d: { mod: 3, rep: 2, msg: "Le cuentas qué cambiaste en tu último modelo. Asiente. No sabes si escuchó, pero lo dijiste." } },
        { t: "Admitir que no te acuerdas bien", d: { rep: -2, cri: 1, ene: 1, msg: "Lo admites. Te dice que la próxima vez lo anotes. Desde entonces, cargas libreta." } },
      ] },
    { id: 14353, empleado: true, por: "Le soltaste al socio una idea de originación", t: "Tu idea aparece en boca de otro",
      x: "Meses después, un vicepresidente presenta en el comité una idea muy parecida a la tuya. El socio está en la sala.",
      o: [
        { t: "Reclamarla en privado ante el socio", d: { rep: 1, car: 1, red: -2, msg: "Le escribes al socio con fecha y detalle. No te contesta en dos días.",
          luego: [{ en: 1, s: "rep", azar: [{ p: 50, id: 14360, bueno: true }, { p: 50, id: 14361, bueno: false }] }] } },
        { t: "Dejarla pasar y pensar la siguiente", d: { cri: 2, ene: 1, rep: -1, msg: "La dejas ir. Las ideas sobran; lo que falta es saber a quién contárselas." } },
        { t: "Ofrecerte para trabajar en ella", d: { red: 3, mod: 2, ene: -3, car: 1, msg: "Te sumas al equipo de la idea. Nadie dice que era tuya, pero todos ven quién sabe más del tema." } },
      ] },
    { id: 14360, empleado: true, por: "Reclamaste tu idea ante el socio director", t: "El socio te da la razón",
      x: "En la reunión siguiente, el socio dice que la idea salió de una conversación contigo en la cafetería. Lo dice al pasar.",
      o: [
        { t: "Agradecerle y no insistir", d: { rep: 3, red: 3, car: 2, msg: "Le das las gracias en un correo de dos líneas. Él valora la brevedad casi tanto como la idea." } },
        { t: "Pedir liderar una parte del proyecto", d: { car: 3, mod: 2, ene: -3, red: -1, msg: "Pides una parte. Te la dan, chica y difícil, como debe ser la primera." } },
      ] },
    { id: 14361, empleado: true, por: "Reclamaste tu idea ante el socio director", t: "El socio prefiere no meterse",
      x: "El socio te contesta que las ideas son de la firma. El que la presentó ahora te saluda con una sonrisa muy amplia.",
      o: [
        { t: "Aprender la lección y dejarlo todo por escrito", d: { cri: 4, rep: -1, msg: "Desde hoy, tus ideas salen primero por correo y con fecha. Eso no lo enseña ningún curso." } },
        { t: "Empezar a mirar otras firmas", d: { red: 2, car: -1, ene: -1, msg: "Actualizas tu perfil. No te vas todavía, pero ya sabes que podrías." } },
      ] },
    { id: 14354, empleado: true, por: "Le soltaste al socio una idea de originación", t: "El socio se acordó de tu idea",
      x: "Un cliente pregunta justo por lo que le contaste en la cafetería. El socio te manda un correo de una línea: «Tu idea. Prepárala.»",
      o: [
        { t: "Prepararla tú de principio a fin", d: { mod: 4, car: 3, ene: -5, msg: "Tres semanas de noches. La presentas y el cliente la compra a medias, que para ser la primera es todo." } },
        { t: "Armar un equipo chico para sacarla", d: { red: 3, cri: 2, car: 2, ene: -2, msg: "Reclutas a dos compañeros. Sale más completa y con tres nombres en la portada. El tuyo, primero." } },
      ] },
    { id: 14355, empleado: true, por: "Tuviste doce minutos con el socio director", t: "El socio no recuerda tu nombre",
      x: "Lo saludas en el ascensor con confianza. Te devuelve el saludo con amabilidad y sin la menor idea de quién eres.",
      o: [
        { t: "Presentarte otra vez, con humor", d: { red: 2, rep: 1, msg: "Le dices tu nombre y le recuerdas el café. Se ríe. Ahora sí lo anota, o eso parece." } },
        { t: "Saludar y ya: algún día lo recordará", d: { ene: 1, red: -1, msg: "No insistes. Doce minutos de atención completa, al parecer, no alcanzan para un nombre." } },
        { t: "Hacer que te recuerde por tu trabajo", d: { mod: 3, car: 1, ene: -3, msg: "Te propones que tu nombre le llegue en un modelo. Tarda medio año, pero llega." } },
      ] },

    /* ===== 4 Certificación de por medio ===== */
    { id: 14401, por: "Estudiaste en serio para la certificación", t: "Lo que estudiaste aparece en la mesa",
      x: "En plena negociación, alguien confunde dos métodos de valoración. Tú lo estudiaste un sábado de lluvia y lo recuerdas entero.",
      o: [
        { t: "Corregirlo con tacto, delante de todos", d: { rep: 3, cri: 3, red: -1, msg: "Lo corriges con una pregunta amable. Todos entienden quién sabía y quién no, incluido él." } },
        { t: "Decírselo en privado después", d: { red: 3, cri: 2, rep: 1, msg: "Se lo explicas en el pasillo. Te lo agradece y te debe una. Esas deudas se cobran solas." } },
      ] },
    { id: 14402, por: "Estudiaste en serio para la certificación", t: "Te piden tus apuntes",
      x: "Un compañero se inscribe este año y te pide tus resúmenes. Son buenos. Te costaron seis meses de sábados.",
      o: [
        { t: "Dárselos sin pedir nada", d: { red: 4, rep: 2, msg: "Se los das. Aprueba, y cuenta en todas partes a quién le debe el aprobado." } },
        { t: "Armar un grupo de estudio y dirigirlo", d: { red: 3, rep: 3, cri: 1, ene: -4, msg: "Montas un grupo los martes. Repasas todo otra vez y, de paso, te vuelves referencia." } },
        { t: "Guardártelos: cada quien su esfuerzo", d: { ene: 1, red: -3, msg: "Le dices que te costaron mucho. Lo entiende, o dice que lo entiende." } },
      ] },
    { id: 14403, por: "Estudiaste en serio para la certificación", t: "Los sábados pasaron factura",
      x: "Seis meses sin descanso y el cuerpo cobra: te enfermas justo en la semana de un cierre importante.",
      o: [
        { t: "Trabajar enfermo y cerrar igual", d: { ene: -6, rep: 2, car: 1, msg: "Cierras con fiebre. Nadie lo agradece y tardas un mes en recuperarte del todo." } },
        { t: "Quedarte en cama y avisar", d: { ene: 4, rep: -1, red: 1, msg: "Te quedas en cama. El cierre sale sin ti, peor de lo que habría salido, y el mundo sigue." } },
      ] },
    { id: 14404, por: "Te saltaste la certificación", t: "La propuesta pide credenciales",
      x: "Un cliente institucional pide que todo el equipo de la propuesta esté certificado. Tu nombre no puede ir en la lista.",
      o: [
        { t: "Inscribirte ahora, tarde y con prisa", d: { cash: -1500, ene: -4, cri: 2, msg: "Te inscribes con años de atraso. Estudias en los aviones y con la vergüenza de llegar tarde." } },
        { t: "Ganarte el lugar con un trabajo previo", d: { mod: 3, ene: -3, msg: "Armas por tu cuenta el análisis del sector y lo mandas. Esperas que el trabajo pese más que el papel.",
          luego: [{ en: 1, s: "mod", azar: [{ p: 45, id: 14410, bueno: true }, { p: 55, id: 14411, bueno: false }] }] } },
        { t: "Dejarlo pasar: habrá otros clientes", d: { ene: 2, car: -2, cash: -1000, msg: "Te quedas fuera. El cliente es grande y el próximo, quién sabe." } },
      ] },
    { id: 14410, por: "Peleaste tu lugar en la propuesta sin certificado", t: "El cliente hizo una excepción",
      x: "El cliente leyó tu análisis y pidió que estuvieras en la reunión. Sin certificado, pero en la primera fila.",
      o: [
        { t: "Brillar en la reunión", d: { rep: 4, car: 3, cash: 2000, ene: -2, msg: "Respondes todo lo del sector. El cliente firma y pregunta, de pasada, si piensas certificarte algún día." } },
        { t: "Ceder la palabra a los certificados", d: { red: 3, cri: 2, rep: 1, msg: "Hablas poco y bien. Los certificados lucen y tú quedas como quien sabía de verdad." } },
      ] },
    { id: 14411, por: "Peleaste tu lugar en la propuesta sin certificado", t: "El cliente no hizo excepciones",
      x: "El cliente agradece el análisis, lo usa entero y deja tu nombre fuera de la propuesta. Las reglas son las reglas.",
      o: [
        { t: "Inscribirte de una vez", d: { cash: -1500, ene: -3, cri: 3, msg: "Esta vez te inscribes. No por convicción, sino por no volver a ver tu trabajo con el nombre de otro." } },
        { t: "Seguir apostando por la mesa", d: { ene: 1, rep: -1, red: 2, msg: "No cambias de tesis. Cada año menos clientes la compran, pero los que la compran pagan bien." } },
      ] },
    { id: 14405, por: "Te saltaste la certificación", t: "Tu escuela fue la mesa",
      x: "Mientras otros estudiaban los sábados, tú cerraste tres mandatos. Un cliente pide justamente a alguien que conozca el sector por dentro.",
      o: [
        { t: "Tomar el mandato y hacerlo tuyo", d: { cash: 3000, rep: 3, car: 2, ene: -3, msg: "Lo llevas de punta a punta. El cliente no pregunta por títulos; pregunta por tu celular." } },
        { t: "Pedir que te acompañe alguien certificado", d: { red: 2, cri: 2, cash: 2000, msg: "Llevas a un compañero con el título. Tú pones el sector, él pone el sello, y el cliente compra los dos." } },
      ] },

    /* ===== 5 Cierre de operación, fiesta en el bar ===== */
    { id: 14451, por: "Fuiste a la fiesta de cierre con el fondo comprador", t: "Alguien del fondo te escribe",
      x: "Uno de los del fondo comprador se acordó de ti. Te pregunta si conoces a alguien que quiera vender una empresa del sector.",
      o: [
        { t: "Presentarle a alguien que conoces", d: { red: 4, rep: 1, deja: "l4_presentador", msg: "Les haces la presentación por correo. Ahora tu nombre está en medio de algo que no controlas.",
          luego: [{ en: 2, s: "cri", azar: [{ p: 45, id: 14460, bueno: true }, { p: 55, id: 14461, bueno: false }] }] } },
        { t: "Contestar con gusto, pero sin dar nombres", d: { cri: 3, red: 1, msg: "Le dices que lo tendrás en mente. Él lo entiende como profesionalismo, y lo es." } },
      ] },
    { id: 14460, por: "Pusiste en contacto a un fondo con un vendedor", t: "Tu presentación se volvió operación",
      x: "El fondo y la empresa que presentaste firmaron. En el anuncio no sale tu nombre, pero los dos saben quién los juntó.",
      o: [
        { t: "Pedir un honorario por la presentación", d: { cash: 4000, red: -2, rep: 1, msg: "Lo pides con elegancia. Pagan con menos elegancia, pero pagan." } },
        { t: "No pedir nada y cobrarlo en confianza", d: { red: 5, rep: 3, msg: "No pides nada. Al año, el fondo te llama primero cuando busca asesor." } },
      ] },
    { id: 14461, por: "Pusiste en contacto a un fondo con un vendedor", t: "Tu presentación terminó mal",
      x: "Las conversaciones se rompieron feo. El vendedor dice que el fondo lo trató como a un número, y te lo cuenta a ti.",
      o: [
        { t: "Disculparte con los dos", d: { rep: 1, red: 1, ene: -2, msg: "Llamas a ambos. Ninguno te culpa del todo. Ninguno te vuelve a pedir una presentación." } },
        { t: "Ponerte del lado del vendedor", d: { red: -2, rep: 2, msg: "Le das la razón al vendedor. Él no lo olvida; el fondo tampoco, y por motivos opuestos." } },
      ] },
    { id: 14452, por: "Te quedaste hasta el final en la fiesta de cierre", t: "Las fotos de la fiesta circulan",
      x: "Alguien subió las fotos. En una apareces cantando con el del fondo comprador, con su corbata en tu cabeza.",
      o: [
        { t: "Reírte: fue una buena noche", d: { red: 3, rep: -2, msg: "Te ríes con todos. El del fondo te escribe que esa foto es su favorita del año." } },
        { t: "Pedir que la borren", d: { rep: 1, red: -1, ene: -1, msg: "La borran. Para entonces ya la vio todo el mundo, pero queda el gesto." } },
        { t: "Bajar el perfil un par de semanas", d: { ene: 1, rep: 1, msg: "Llegas temprano, hablas poco y entregas todo. A la tercera semana, la foto ya es noticia vieja." } },
      ] },
    { id: 14453, por: "No te quedaste en la fiesta de cierre", t: "Te perdiste los chistes internos",
      x: "Los que se quedaron hasta el final volvieron con chistes internos y un grupo de chat. Ahí se reparte medio trabajo.",
      o: [
        { t: "Pedir que te agreguen al grupo", d: { red: 3, rep: -1, msg: "Te agregan. Entiendes la mitad de los chistes y todos los encargos." } },
        { t: "Quedarte hasta el final en la próxima", d: { red: 3, ene: -3, msg: "En la próxima celebración aguantas hasta el cierre. Vuelves con tu propio chiste interno." } },
        { t: "Seguir a tu ritmo", d: { ene: 2, red: -2, cri: 1, msg: "No entras en el juego. Trabajas bien y te enteras de las cosas un día tarde." } },
      ] },
    { id: 14454, por: "Te quedaste a adelantar el pitch en vez de celebrar", t: "Tu pitch adelantado gana",
      x: "El pitch que adelantaste aquella noche llega pulido a la reunión. El cliente elige a tu equipo entre cuatro.",
      o: [
        { t: "Contar que lo hiciste el viernes de la fiesta", d: { cash: 1500, rep: 2, car: 2, red: -2, msg: "Lo cuentas. Unos lo admiran y otros sienten que les estás pasando una factura." } },
        { t: "Callarte y que hable el resultado", d: { cash: 1500, cri: 2, rep: 2, red: 1, msg: "No dices nada. Alguien lo cuenta por ti, que es la mejor manera de que se sepa." } },
      ] },
    { id: 14455, por: "No te quedaste en la fiesta de cierre", t: "En el próximo proceso nadie te conoce",
      x: "Vuelves a trabajar con aquel fondo. Todos se saludan por el nombre y por el apodo. Tú te presentas otra vez.",
      o: [
        { t: "Proponer una cena con su equipo", d: { cash: -1000, red: 4, ene: -2, msg: "Organizas la cena. Pagas la cuenta y recuperas en una noche lo que te perdiste en aquella." } },
        { t: "Compensar con trabajo impecable", d: { mod: 3, rep: 2, ene: -2, msg: "Entregas todo antes y mejor. Te conocen por tu trabajo, que es otra forma de que te conozcan." } },
      ] },

    /* ===== 6 El data room es un desastre ===== */
    { id: 14501, empleado: true, por: "Ordenaste un data room de cuatrocientos archivos", t: "Ahora los desórdenes son tuyos",
      x: "Desde aquel data room, cada proceso desordenado llega a tu escritorio con una nota: «Tú sabes de esto».",
      o: [
        { t: "Armar una plantilla que sirva a todos", d: { mod: 3, rep: 3, red: 2, ene: -2, msg: "Haces una plantilla que cualquiera puede usar. Ya no te mandan desórdenes; te mandan agradecimientos." } },
        { t: "Ordenarlos tú, uno por uno", d: { ene: -5, rep: 2, car: 1, msg: "Los ordenas todos tú. Te vuelves imprescindible para una tarea que nadie quiere." } },
        { t: "Pedir que el trabajo rote", d: { cri: 2, ene: 2, red: -1, car: -1, msg: "Pides que se reparta. Tu jefe accede con cara de quien acaba de perder un recurso gratis." } },
      ] },
    { id: 14502, empleado: true, por: "Ordenaste un data room de cuatrocientos archivos", t: "Encontraste una cláusula que nadie vio",
      x: "Ordenando, viste un contrato con una cláusula de cambio de control: si la empresa se vende, un cliente grande puede irse.",
      o: [
        { t: "Avisarle a tu jefe con el archivo marcado", d: { cri: 3, rep: 2, car: 1, msg: "Le mandas el archivo con la cláusula resaltada. Lo lee dos veces y cierra la puerta de su oficina.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 14510, bueno: true }, { p: 45, id: 14511, bueno: false }] }] } },
        { t: "Anotarlo en el índice y seguir", d: { cri: 1, ene: 1, msg: "Lo dejas anotado. Si alguien lee el índice, lo verá. Si nadie lo lee, eso también dice algo." } },
      ] },
    { id: 14510, empleado: true, por: "Detectaste una cláusula escondida en el data room", t: "La cláusula cambió la negociación",
      x: "El equipo usa tu hallazgo para renegociar el precio antes de firmar. En la reunión alguien dice: «Lo vio el más nuevo».",
      o: [
        { t: "Disfrutarlo en silencio", d: { rep: 3, car: 2, cri: 1, msg: "No dices nada. Tu jefe sí: en tu evaluación del año aparece la palabra «criterio» dos veces." } },
        { t: "Pedir entrar en la negociación", d: { car: 3, red: 1, ene: -2, msg: "Pides estar en la sala. Te dejan, en una silla del fondo. Desde ahí se aprende muchísimo." } },
      ] },
    { id: 14511, empleado: true, por: "Detectaste una cláusula escondida en el data room", t: "Nadie le dio importancia",
      x: "Tu jefe dijo que era un detalle legal. Se firmó igual y, un año después, el cliente grande se fue.",
      o: [
        { t: "Recordárselo a tu jefe", d: { cri: 2, rep: -2, car: -2, red: -2, msg: "Se lo recuerdas. Tenías razón, y eso, con un jefe, casi nunca ayuda." } },
        { t: "Guardarte el correo y la lección", d: { cri: 4, ene: 1, msg: "Archivas el correo en una carpeta que se llama «tenía razón». La lección es tuya." } },
      ] },
    { id: 14503, empleado: true, por: "Ordenaste un data room de cuatrocientos archivos", t: "El índice te comió la semana",
      x: "Ordenar cuatrocientos archivos te costó la semana entera. Lo que te habían pedido de verdad quedó a medias.",
      o: [
        { t: "Quedarte dos noches para ponerte al día", d: { ene: -5, mod: 2, rep: 1, msg: "Lo sacas todo a fuerza de café. Nadie supo que ibas atrasado, salvo tu espalda." } },
        { t: "Explicarle a tu jefe qué pasó", d: { cri: 2, rep: -1, car: -1, msg: "Le explicas. Entiende, pero te recuerda que lo urgente es lo que se pide, no lo que se ve." } },
      ] },
    { id: 14504, empleado: true, por: "Revisaste solo lo que te pidieron del data room", t: "El contrato estaba en un archivo sin nombre",
      x: "El comprador pregunta por un contrato que nadie encuentra. Estaba ahí, entre los cuatrocientos, con un nombre que no decía nada.",
      o: [
        { t: "Buscarlo toda la noche hasta encontrarlo", d: { ene: -4, rep: 2, mod: 1, msg: "Lo encuentras a las tres de la mañana. Sale a primera hora y nadie pregunta cómo." } },
        { t: "Decir que esa parte no te tocaba", d: { rep: -2, red: -2, ene: 1, msg: "Es cierto y no ayuda: la pregunta era para el equipo, y tú eres el equipo." } },
        { t: "Proponer ahora el índice que nadie hizo", d: { mod: 3, car: 1, ene: -3, msg: "Propones ordenarlo todo de una vez. Tarde, pero alguien tenía que hacerlo." } },
      ] },
    { id: 14505, empleado: true, por: "Revisaste solo lo que te pidieron del data room", t: "Tu jefe valora que no te desvíes",
      x: "Tu jefe nota que entregas exactamente lo pedido y a tiempo. Te pone en un proceso donde eso vale más que la creatividad.",
      o: [
        { t: "Seguir así: lo pedido, impecable", d: { rep: 2, car: 2, cri: 1, ene: 1, msg: "Entregas a tiempo, siempre. Eres de fiar. También eres a quien nadie le pide una idea." } },
        { t: "Sumar una idea propia de vez en cuando", d: { mod: 2, car: 1, rep: 1, ene: -2, msg: "Agregas un análisis extra, chico. Tu jefe lo lee, lo usa y empieza a esperarlo." } },
      ] },

    /* ===== 9 Cien mensajes en frío ===== */
    { id: 14551, por: "Escribiste mensajes en frío todos los días", t: "La reunión de hace dos años vuelve",
      x: "Uno de los siete que te contestaron aquella vez escribe: van a vender una división y quieren hablar con quien tuvo paciencia.",
      o: [
        { t: "Prepararle una propuesta en serio", d: { mod: 3, ene: -3, msg: "Le armas una propuesta con números y comparables. Te pide una segunda reunión, con su jefe.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 14560, bueno: true }, { p: 50, id: 14561, bueno: false }] }] } },
        { t: "Pasarle el contacto a alguien con más peso", d: { red: 3, rep: 1, car: -1, msg: "Lo derivas a alguien con más cargo. Se firma con su nombre, y te debe una de las grandes." } },
      ] },
    { id: 14560, por: "Llevaste una propuesta nacida de un mensaje en frío", t: "Te firman el mandato",
      x: "La división se vende con tu nombre en el mandato. Te cuesta ocho meses y te deja la primera historia propia que vale la pena contar.",
      o: [
        { t: "Celebrar con el equipo", d: { cash: 5000, red: 3, rep: 2, ene: 1, msg: "Invitas a todos a cenar. Pagas tú, que por una vez puedes." } },
        { t: "Volver a la lista al día siguiente", d: { cash: 5000, red: 4, ene: -3, msg: "El lunes vuelves a escribir. Ahora contestan más, porque ya tienes algo que mostrar." } },
      ] },
    { id: 14561, por: "Llevaste una propuesta nacida de un mensaje en frío", t: "El mandato se cae en la última reunión",
      x: "Te dicen que la división finalmente no se vende. Ocho meses de trabajo terminan en un correo amable.",
      o: [
        { t: "Agradecer y dejar la puerta abierta", d: { red: 3, rep: 2, ene: -2, msg: "Les agradeces por escrito y sin rencor. Quedas en la lista de los que se vuelven a llamar." } },
        { t: "Preguntar con franqueza qué falló", d: { cri: 4, ene: -1, msg: "Te lo dicen: el precio que propusiste asustó al dueño. Aprendes más de ese correo que de los ocho meses." } },
      ] },
    { id: 14552, por: "Escribiste mensajes en frío todos los días", t: "Te marcaron como spam",
      x: "Un fondo mandó tu correo a su filtro de basura y otro lo leyó en voz alta en un evento, entre risas.",
      o: [
        { t: "Cambiar el mensaje y seguir", d: { cri: 3, red: 1, ene: -2, msg: "Reescribes el mensaje: más corto, más útil, sin adjetivos. Contestan más y se ríen menos." } },
        { t: "Dejar de escribir por un tiempo", d: { ene: 3, red: -2, msg: "Paras un trimestre. La vergüenza se pasa. La lista, sin uso, también se enfría." } },
        { t: "Reírte tú también en el próximo evento", d: { rep: 2, red: 3, msg: "Le preguntas a quien te leyó cómo lo habría escrito él. Te lo dice. Ahora se escriben." } },
      ] },
    { id: 14553, por: "Escribiste solo a diez contactos bien elegidos", t: "Uno de tus diez te pide un favor",
      x: "Un contacto de tu lista corta te pide que le revises un modelo. Gratis, para mañana y sin decir para qué es.",
      o: [
        { t: "Hacérselo esa misma noche", d: { mod: 2, red: 4, ene: -4, msg: "Se lo devuelves al amanecer con tres comentarios buenos. Te contesta con un pulgar arriba y una deuda." } },
        { t: "Decirle que sí, con un plazo razonable", d: { cri: 2, red: 1, ene: -1, msg: "Le das tres días. Acepta. No queda deslumbrado, pero tampoco te usa de asistente gratis." } },
        { t: "Declinar con amabilidad", d: { ene: 2, red: -3, msg: "Le dices que no tienes tiempo. Lo entiende. Pasa a ser uno de tus nueve contactos." } },
      ] },
    { id: 14554, por: "Armaste tu propia lista de fondos", t: "Te piden tu lista de fondos",
      x: "Un colega se enteró de tu base de contactos y te la pide para su propio proceso. Dice que te va a mencionar.",
      o: [
        { t: "Compartirla entera", d: { red: 3, rep: 1, cri: -2, msg: "Se la pasas. Te menciona una vez y la usa cien. Los fondos empiezan a recibir dos correos parecidos." } },
        { t: "Presentarle solo dos fondos, en persona", d: { red: 3, cri: 2, rep: 1, ene: -1, msg: "Le haces dos presentaciones con cuidado. Queda agradecido y tu lista sigue siendo tuya." } },
        { t: "Contarle cómo armarla, no lo que contiene", d: { ene: 1, red: -2, cri: 1, msg: "Le explicas el método. Te mira como a alguien tacaño y también como a alguien serio." } },
      ] },
    { id: 14555, por: "Escribiste solo a diez contactos bien elegidos", t: "Uno de tus diez contesta tarde",
      x: "Un contacto que nunca te respondió escribe un año después: «Ahora sí es el momento. ¿Hablamos el martes?»",
      o: [
        { t: "Ir preparado, como si fuera un mandato", d: { mod: 3, red: 3, cash: 2000, ene: -2, msg: "Llegas con su sector estudiado. La conversación dura el doble de lo previsto y termina en una propuesta." } },
        { t: "Ir a escuchar sin presentar nada", d: { cri: 3, red: 2, msg: "Vas sin diapositivas. Te cuenta lo que necesita de verdad, que no es lo que le ibas a ofrecer." } },
      ] },

    /* ===== 10 El teaser que vuelve marcado ===== */
    { id: 14601, por: "Rehiciste entero un teaser lleno de comentarios", t: "Ahora corriges los teasers ajenos",
      x: "Aprendiste el formato tan bien que te pasan los teasers de otros para revisar. Llegan con la misma cara que traías tú.",
      o: [
        { t: "Corregirlos con paciencia y explicar", d: { rep: 3, red: 3, ene: -3, msg: "Explicas cada comentario. Los demás aprenden y tú repasas lo que sabes, que es otra forma de estudiar." } },
        { t: "Marcar todo rápido, como te marcaron a ti", d: { mod: 2, rep: 1, red: -2, ene: -1, msg: "Los devuelves con ochenta marcas. Es justo, es eficiente y es exactamente lo que odiabas." } },
      ] },
    { id: 14602, por: "Rehiciste entero un teaser lleno de comentarios", t: "Tu teaser suena como todos",
      x: "Un cliente dice que tu teaser está impecable y que no recuerda nada de lo que decía. El formato se comió la idea.",
      o: [
        { t: "Arriesgarte a romper el formato", d: { mod: 2, rep: 2, cri: 2, ene: -2, msg: "En el siguiente pones una idea clara al principio. Vuelve con comentarios, pero los clientes lo recuerdan." } },
        { t: "Seguir el formato: es lo que se pide", d: { ene: 1, rep: 1, cri: -1, msg: "Sigues la regla. Nadie se queja y nadie lo recuerda, que en algunos lados es lo mismo." } },
      ] },
    { id: 14603, por: "Defendiste tus puntos de un teaser marcado", t: "Quien te corrigió te pide opinión",
      x: "La persona con la que discutiste los comentarios te manda su propio documento para que lo revises. Puede ser respeto o una trampa.",
      o: [
        { t: "Revisarlo en serio, con todo", d: { cri: 3, rep: 3, red: 2, ene: -2, msg: "Le haces pocos comentarios y buenos. Te contesta con un «gracias» que dura una semana." } },
        { t: "Revisarlo con suavidad, por la paz", d: { red: 2, ene: 1, cri: -1, msg: "Le marcas tres detalles. Queda contento, y tú sabes que el documento tenía más problemas." } },
      ] },
    { id: 14604, por: "Defendiste tus puntos de un teaser marcado", t: "El cliente preguntó por tu punto",
      x: "En la reunión, el cliente pregunta justo por el punto que defendiste en aquella discusión. Todos se giran hacia ti.",
      o: [
        { t: "Contestar tú, con lo que sabes", d: { rep: 2, car: 2, msg: "Respondes con datos. El cliente toma nota y te pide algo más.",
          luego: [{ en: 1, s: "mod", azar: [{ p: 55, id: 14610, bueno: true }, { p: 45, id: 14611, bueno: false }] }] } },
        { t: "Dejar que conteste quien lleva más años", d: { red: 3, cri: 1, msg: "Le pasas la palabra al más antiguo. Lo explica peor que tú, pero te lo agradece en el ascensor." } },
      ] },
    { id: 14610, por: "Le contestaste tú al cliente en una reunión", t: "El cliente te escribe directo",
      x: "Desde aquella respuesta, el cliente te escribe a ti cuando tiene dudas del sector. A veces, sin copia a nadie más.",
      o: [
        { t: "Contestarle y copiar al equipo", d: { red: 3, rep: 3, cri: 2, msg: "Respondes siempre con copia. El cliente sigue escribiéndote a ti y el equipo sabe que no escondes nada." } },
        { t: "Contestarle directo: es tu contacto", d: { red: 4, car: 2, rep: -2, msg: "Lo llevas por tu cuenta. El cliente te quiere y en la oficina empiezan a preguntarse qué te dice." } },
      ] },
    { id: 14611, por: "Le contestaste tú al cliente en una reunión", t: "Te pasaste de confianza",
      x: "En la siguiente reunión respondiste algo que no sabías del todo. El cliente lo comprobó y ahora duda de todo lo demás.",
      o: [
        { t: "Corregirlo por escrito al día siguiente", d: { cri: 3, rep: -1, ene: -1, msg: "Mandas la corrección con la fuente. El cliente lo agradece y vuelve a confiar, con lupa." } },
        { t: "Esperar a que nadie lo note", d: { rep: -4, ene: 1, msg: "No dices nada. Alguien lo nota, claro: siempre hay alguien que lo nota." } },
      ] },
    { id: 14605, por: "Defendiste tus puntos de un teaser marcado", t: "Tienes fama de discutirlo todo",
      x: "Se corre que discutes cada comentario. Tus documentos vuelven con más marcas, algunas solo para ver qué contestas.",
      o: [
        { t: "Elegir mejor tus batallas", d: { cri: 4, red: 2, ene: 1, msg: "Aceptas nueve de cada diez y peleas la décima. Ahora, cuando discutes, te escuchan." } },
        { t: "Seguir defendiendo cada punto", d: { mod: 2, red: -3, ene: -3, rep: -1, msg: "Defiendes todo. Ganas muchas discusiones y pocas invitaciones a las reuniones importantes." } },
      ] },

    /* ===== 11 Media hora antes del cierre ===== */
    { id: 14651, por: "Operaste tú mismo al cierre del mercado", t: "La pantalla te persigue",
      x: "Desde aquella tarde miras cotizaciones en reuniones, en la fila del banco y en la cena. El celular conoce tu ansiedad mejor que tú.",
      o: [
        { t: "Borrar la aplicación del celular", d: { ene: 4, cri: 2, red: 1, msg: "La borras. Los dos primeros días tiemblas. Al tercero descubres que el mercado abre y cierra sin ti." } },
        { t: "Ponerte horarios fijos para mirar", d: { cri: 3, ene: 2, msg: "Miras dos veces al día, a hora fija. La ansiedad no se va, pero aprende a esperar." } },
        { t: "Seguir así: es parte del oficio", d: { ene: -4, mod: 1, red: -1, msg: "Te dices que es información. Tu cuerpo dice otra cosa, sobre todo a las tres de la mañana." } },
      ] },
    { id: 14652, por: "Dejaste una orden limitada y apagaste todo", t: "Tu orden quedó a medias",
      x: "La orden se ejecutó a medias y al día siguiente el precio subió. Tienes la mitad de lo que querías y el doble de dudas.",
      o: [
        { t: "Completar la posición al precio nuevo", d: { cash: -1500, cri: -1, ene: -1, msg: "Compras el resto más caro. Tienes lo que querías, a un precio que no querías." } },
        { t: "Quedarte con la mitad y no perseguir", d: { cri: 3, ene: 2, msg: "Te quedas con lo que hay. Un precio que se escapa no es una deuda que tengas que pagar." } },
        { t: "Poner otra orden limitada, un poco más arriba", d: { cri: 2, cash: 500, msg: "Subes un poco el límite y apagas otra vez. Se ejecuta en una caída de la semana siguiente." } },
      ] },
    { id: 14653, por: "Operaste tú mismo al cierre del mercado", t: "Te preguntan por tu método",
      x: "Un colega te vio operar al cierre y te pregunta cómo eliges el momento. No sabes si tienes un método o una racha.",
      o: [
        { t: "Escribir tu método y probarlo en serio", d: { mod: 4, cri: 3, ene: -2, msg: "Lo anotas y lo pruebas contra datos de años. La mitad era método; la otra mitad, suerte con buena prensa." } },
        { t: "Explicarle lo que crees que haces", d: { red: 2, rep: 1, cri: -1, msg: "Le das tres reglas que suenan bien. Él las sigue y le va peor. Ya no te pregunta." } },
      ] },
    { id: 14654, por: "Dejaste una orden limitada y apagaste todo", t: "Tu orden limitada te salvó",
      x: "En una tarde de pánico, tu orden limitada no se ejecutó. Te ahorró comprar en el peor momento del año.",
      o: [
        { t: "Volverlo regla para todo", d: { cri: 4, ene: 2, cash: 1000, msg: "Desde entonces, todo con precio límite. Te pierdes algunas subidas y ninguna noche de sueño." } },
        { t: "Aprovechar la caída para comprar con calma", d: { cash: 2000, cri: 1, ene: -2, msg: "Compras en la caída, sin apuro. A los meses la posición está en verde y tú, extrañamente tranquilo." } },
      ] },
    { id: 14655, por: "Operaste tú mismo al cierre del mercado", t: "Una mala tarde al cierre",
      x: "Otra orden a mano, otra media hora mirando. Esta vez el precio se te escapa y compras justo en lo más alto del día.",
      o: [
        { t: "Vender ya y asumir la pérdida", d: { cash: -2000, cri: 3, msg: "Vendes al día siguiente con pérdida. Duele poco y enseña mucho, que es la mejor proporción posible." } },
        { t: "Aguantar hasta que vuelva", d: { ene: -2, cri: -1, msg: "Decides esperar. El precio, por un tiempo, decide otra cosa.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 45, id: 14660, bueno: true }, { p: 55, id: 14661, bueno: false }] }] } },
        { t: "Dejar de operar al cierre para siempre", d: { ene: 3, cri: 2, cash: -1000, msg: "Vendes y te prometes no volver a operar con prisa. Es la promesa más rentable que haces." } },
      ] },
    { id: 14660, por: "Aguantaste una mala compra esperando que volviera", t: "El precio volvió",
      x: "Tras meses en rojo, la posición se recupera. Podrías salir sin pérdida o quedarte a ver si sigue subiendo.",
      o: [
        { t: "Salir en cero y dar las gracias", d: { ene: 3, cri: 2, cash: 500, msg: "Vendes en cero. Nadie te felicita por no perder, pero tú sabes lo que costó." } },
        { t: "Quedarte: ahora sí va a subir", d: { cash: 2500, cri: -2, msg: "Te quedas y sube un poco más. Ganas algo y aprendes la lección equivocada." } },
      ] },
    { id: 14661, por: "Aguantaste una mala compra esperando que volviera", t: "El precio no volvió",
      x: "La posición sigue cayendo. Ya vale la mitad de lo que pagaste y cada mañana te recuerda aquella media hora.",
      o: [
        { t: "Vender y pasar la página", d: { cash: -4000, cri: 4, ene: 2, msg: "Vendes. Es la orden más cara y más sana que diste en años." } },
        { t: "Comprar más para promediar", d: { cash: -3000, cri: -3, ene: -2, msg: "Compras más para bajar el promedio. El promedio baja. El precio, también." } },
      ] },

    /* ===== 12 Ruido en la pantalla ===== */
    { id: 14701, por: "Operaste cada titular en el momento", t: "Las comisiones se comieron el año",
      x: "Haces la cuenta del año: decenas de operaciones por titulares. Entre comisiones y diferencias de precio, ganaste menos que sin tocar nada.",
      o: [
        { t: "Aceptarlo y operar menos", d: { cri: 4, ene: 2, msg: "Te pones un límite de operaciones al mes. Ganas menos emociones y algo más de dinero." } },
        { t: "Cambiar a una plataforma más barata", d: { cash: 800, cri: -1, msg: "Bajas las comisiones a la mitad. El problema no eran las comisiones, pero ayuda." } },
        { t: "Echarle la culpa a la mala racha", d: { ene: 1, cri: -3, cash: -1500, msg: "Te convences de que fue mala suerte. Al año siguiente, la mala suerte vuelve con los mismos hábitos." } },
      ] },
    { id: 14702, por: "Operaste cada titular en el momento", t: "Un titular de verdad te encuentra listo",
      x: "Un día llega una noticia de las que mueven el año. Tienes los dedos entrenados y reaccionas antes que casi todos.",
      o: [
        { t: "Tomar la ganancia y apagar", d: { cash: 3000, cri: 3, msg: "Ganas, vendes y apagas. Por una vez, el reflejo y el criterio van en el mismo coche." } },
        { t: "Doblar la apuesta: es tu momento", d: { cash: 1000, ene: -2, cri: -1, msg: "Te quedas y agregas más. La adrenalina dice que sí; el tiempo dirá.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 40, id: 14710, bueno: true }, { p: 60, id: 14711, bueno: false }] }] } },
      ] },
    { id: 14710, por: "Doblaste la apuesta tras un titular grande", t: "La apuesta doble salió bien",
      x: "La noticia era tan grande como parecía. Tu posición doblada pesa ahora en tu patrimonio y en tu ego, por igual.",
      o: [
        { t: "Vender la mitad y asegurar", d: { cash: 6000, cri: 3, msg: "Vendes la mitad. Aseguras lo ganado y dejas el resto correr sin mirarlo cada hora." } },
        { t: "Contarlo en cada cena", d: { cash: 4000, red: 2, rep: -2, cri: -2, msg: "Lo cuentas en cada cena. La gente te pide consejos y tú empiezas a dárselos, que es peor." } },
      ] },
    { id: 14711, por: "Doblaste la apuesta tras un titular grande", t: "La apuesta doble se dio vuelta",
      x: "El mercado digirió la noticia y luego la escupió. Lo que ganaste se va en dos semanas, y un poco más.",
      o: [
        { t: "Cortar la pérdida a tiempo", d: { cash: -2500, cri: 3, msg: "Vendes a la segunda semana. Pierdes lo ganado y algo más, pero no todo." } },
        { t: "Esperar otro titular que la salve", d: { cash: -5000, cri: -2, ene: -3, msg: "Esperas una noticia buena. Llegan tres malas." } },
      ] },
    { id: 14703, por: "Cerraste la pantalla en un día de titulares", t: "Alguien te llama lento",
      x: "Un conocido presume que ganó mucho con los titulares de aquella semana. Te pregunta, con lástima, si no estabas mirando.",
      o: [
        { t: "Felicitarlo y no cambiar nada", d: { cri: 3, ene: 2, msg: "Lo felicitas. Al año, ya no presume. Tampoco cuenta por qué." } },
        { t: "Probar a operar un poco, por si acaso", d: { ene: -2, cri: -2, cash: -1000, msg: "Pruebas una semana a su manera. Pierdes poco y confirmas mucho." } },
      ] },
    { id: 14704, por: "Cerraste la pantalla en un día de titulares", t: "Tu portafolio aguantó la tormenta",
      x: "Llega una semana de pánico de verdad. No tocas nada y, cuando se calma, estás donde estabas. Muchos no.",
      o: [
        { t: "Comprar algo barato después del pánico", d: { cash: 3000, cri: 2, ene: -1, msg: "Cuando todo está en rebaja, compras con calma. Eres la única persona tranquila del chat de inversiones." } },
        { t: "Seguir sin hacer nada", d: { ene: 3, cri: 2, cash: 1000, msg: "Ni siquiera abres la cuenta. El año termina en verde y sin un solo sobresalto." } },
      ] },
    { id: 14705, por: "Cerraste la pantalla en un día de titulares", t: "El titular que sí importaba",
      x: "Entre tanto ruido, uno era señal: un cambio de regulación en tu posición más grande. Te enteras una semana tarde.",
      o: [
        { t: "Vender ya, aunque llegues tarde", d: { cash: -2500, cri: 2, msg: "Vendes con la mitad del daño hecho. Llegar tarde también es llegar." } },
        { t: "Estudiar la norma antes de mover nada", d: { cri: 3, mod: 2, ene: -2, cash: -1000, msg: "Lees la norma entera. No era tan grave como dice el precio, ni tan leve como querías." } },
        { t: "Ponerte alertas solo para lo que importa", d: { cri: 3, ene: 1, cash: -1500, msg: "Pierdes algo y montas alertas para tus posiciones grandes. Silencio para el ruido, sirena para lo demás." } },
      ] },

    /* ===== 13 Roadshow de tres ciudades ===== */
    { id: 14751, por: "Hiciste un roadshow por tres ciudades", t: "Una carta de interés se vuelve oferta",
      x: "Uno de los fondos que viste en persona manda una oferta firme. En el correo cita algo que dijiste en la reunión.",
      o: [
        { t: "Usarla para apretar a los otros", d: { cash: 4000, cri: 2, red: -2, msg: "Le cuentas al resto que hay oferta firme. Dos mejoran la suya. Uno se retira ofendido." } },
        { t: "Negociar solo con ese fondo", d: { cash: 3000, red: 3, rep: 2, msg: "Le das exclusividad. Cierra rápido y sin sorpresas, que también vale dinero." } },
      ] },
    { id: 14752, por: "Fuiste a las tres ciudades del roadshow", t: "El roadshow te pasó la cuenta",
      x: "Volviste con dos cartas de interés y una gripe de tres semanas. Mientras tanto, en la oficina se acumula todo.",
      o: [
        { t: "Trabajar enfermo para ponerte al día", d: { ene: -6, rep: 1, mod: 1, msg: "Trabajas con fiebre y pañuelos. Te pones al día y te enfermas otra vez en el siguiente viaje." } },
        { t: "Parar una semana entera", d: { ene: 5, rep: -1, msg: "Paras de verdad. Lo acumulado espera, que es lo que las cosas hacen casi siempre." } },
      ] },
    { id: 14753, por: "Mandaste a tu asociado a una plaza del roadshow", t: "Tu asociado quiere su propio fondo",
      x: "Al asociado le fue bien en su ciudad. Ahora pide llevar él solo la relación con ese fondo.",
      o: [
        { t: "Dejarle la relación entera", d: { red: 2, rep: 2, ene: 2, msg: "Le das la relación. Lo celebra como un ascenso y, en cierto modo, lo es.",
          luego: [{ en: 2, s: "rep", azar: [{ p: 55, id: 14760, bueno: true }, { p: 45, id: 14761, bueno: false }] }] } },
        { t: "Llevarla juntos un tiempo más", d: { cri: 2, red: 1, ene: -2, msg: "Le dices que todavía no. Acepta con una sonrisa que no le llega a los ojos." } },
        { t: "Decirle que no: la relación es tuya", d: { car: 1, red: -3, rep: -1, msg: "La relación sigue siendo tuya. Tu asociado sigue siendo tuyo, por ahora." } },
      ] },
    { id: 14760, por: "Le diste a tu asociado la relación con un fondo", t: "Tu asociado cierra con su fondo",
      x: "El fondo que le dejaste entra como comprador en un proceso y cierra. Tu asociado te da las gracias delante de todos.",
      o: [
        { t: "Darle el crédito completo", d: { red: 3, rep: 4, cash: 3000, msg: "Le das todo el crédito. Ganas a alguien que haría cualquier cosa por ti y un fondo que confía en tu gente." } },
        { t: "Recordar quién abrió esa puerta", d: { cash: 3000, car: 2, red: -1, msg: "Recuerdas en voz alta quién abrió esa puerta. Es cierto, y él lo nota." } },
      ] },
    { id: 14761, por: "Le diste a tu asociado la relación con un fondo", t: "Tu asociado se fue a ese fondo",
      x: "Tu asociado se va a trabajar a ese mismo fondo. Ahora es tu contraparte, y conoce todos tus trucos.",
      o: [
        { t: "Felicitarlo y tratarlo como cliente", d: { red: 4, rep: 2, msg: "Le mandas una botella y una propuesta. Es un comprador que te conoce, y eso puede jugar a favor." } },
        { t: "Cuidarte de él en cada negociación", d: { cri: 3, red: -2, ene: -2, msg: "Cambias tus tácticas. Él cambia las suyas. Negociar con alguien que formaste es raro y muy cansado." } },
      ] },
    { id: 14754, por: "Hiciste el roadshow por videollamada", t: "Los fondos te mandan a la cola",
      x: "En el siguiente proceso, los fondos que viste por pantalla te dan reunión con un analista junior, a las seis de la tarde.",
      o: [
        { t: "Viajar esta vez, aunque cueste", d: { cash: -2000, red: 4, ene: -3, msg: "Compras el pasaje. Al verte en persona, te suben en la agenda. Nadie lo dice; todos lo hacen." } },
        { t: "Aceptar la reunión y hacerla brillante", d: { mod: 3, rep: 2, ene: -1, msg: "Preparas la reunión como si fuera con el socio del fondo. El analista junior le reenvía tu material esa noche." } },
      ] },
    { id: 14755, por: "Hiciste el roadshow por videollamada", t: "Un fondo prefiere la pantalla",
      x: "Uno de los fondos te agradece no haber viajado: odia las reuniones de cortesía. Quiere números, no corbatas.",
      o: [
        { t: "Mandarle números cada mes", d: { mod: 2, red: 3, ene: -1, msg: "Le mandas un informe mensual, corto. Te contesta con preguntas buenas, que es su forma de decir que le importa." } },
        { t: "Insistir en ir a conocerlo", d: { red: 1, cri: -2, cash: -1000, msg: "Insistes en visitarlo. Te recibe con cortesía y con la mirada de quien ya te había avisado." } },
      ] },

    /* ===== 14 Tu mejor analista renuncia ===== */
    { id: 14801, por: "Mantuviste el puente con tu analista que se fue", t: "Tu exanalista habla de más",
      x: "Tu exanalista, ahora del lado comprador, te deja caer en una cena cuánto está dispuesto a pagar su fondo en tu proceso.",
      o: [
        { t: "Usarlo en la negociación", d: { cash: 5000, cri: -3, deja: "l4_informacion_usada", msg: "Aprietas justo hasta ese número. El fondo paga el máximo y nadie entiende cómo lo adivinaste.",
          luego: [{ en: 1, azar: [{ p: 55, id: 14810 }, { p: 45, id: 14811, bueno: false }] }] } },
        { t: "Pararlo: eso no se cuenta", d: { rep: 4, cri: 3, red: 1, msg: "Le pides que no siga. Se pone rojo. Al año te manda un proceso: eres de los pocos que no lo usaron." } },
        { t: "Hacer como que no lo oíste", d: { ene: 1, cri: 1, msg: "Cambias de tema. Lo oíste, claro, y te pasas el proceso intentando no negociar con ese número." } },
      ] },
    { id: 14810, por: "Usaste lo que te contó tu exanalista", t: "Nadie se enteró",
      x: "El proceso cerró en el máximo y nadie preguntó nada. Tu exanalista te sigue invitando a cenar, y tú sigues yendo.",
      o: [
        { t: "Dejar de cenar con él", d: { ene: 1, cri: 2, red: -2, msg: "Inventas excusas hasta que deja de invitarte. Nadie te acusa de nada; tú, de vez en cuando." } },
        { t: "Seguir yendo, con cuidado", d: { red: 3, cri: -2, msg: "Sigues yendo. Ahora cambias de tema antes de que él empiece. Casi siempre." } },
      ] },
    { id: 14811, por: "Usaste lo que te contó tu exanalista", t: "Su fondo se enteró",
      x: "El fondo descubre que tu exanalista habló de más. Lo despiden, y en el informe interno aparece tu nombre.",
      o: [
        { t: "Llamar al fondo y dar tu versión", d: { rep: -4, cri: 3, red: -2, msg: "Das tu versión sin adornos. No te creen del todo, pero te creen más que si callabas." } },
        { t: "Ayudar a tu exanalista a recolocarse", d: { red: 2, rep: -3, ene: -2, msg: "Le consigues entrevistas. Es lo mínimo. El mercado, que todo lo sabe, no olvida tu parte." } },
      ] },
    { id: 14802, por: "Mantuviste el puente con tu analista que se fue", t: "El trabajo de dos lo haces tú",
      x: "Tardas meses en encontrar a alguien como tu exanalista. Mientras, su trabajo lo haces tú, de noche.",
      o: [
        { t: "Contratar rápido al mejor disponible", d: { cash: -1500, ene: 2, mod: -1, rep: -1, msg: "Contratas en tres semanas. Es bueno, no excelente, y te toca corregir lo que antes no corregías." } },
        { t: "Esperar a encontrar al indicado", d: { ene: -5, mod: 2, cri: 2, msg: "Esperas al candidato correcto. Llega en seis meses. Tú llegas a esos seis meses con ojeras." } },
        { t: "Ascender a alguien de adentro", d: { red: 3, rep: 2, ene: -2, msg: "Asciendes al segundo del equipo. Le queda grande dos meses y después le queda bien." } },
      ] },
    { id: 14803, por: "Le hiciste una contraoferta a tu mejor analista", t: "El equipo supo de la contraoferta",
      x: "Se corrió lo que le ofreciste para que se quedara. Ahora el resto quiere saber si para ganar más hay que amenazar con irse.",
      o: [
        { t: "Revisar los sueldos de todos", d: { cash: -3000, rep: 3, red: 2, msg: "Revisas la escala entera. Te cuesta caro y te ahorra tres renuncias que ya estaban escritas." } },
        { t: "Decir que fue un caso único", d: { rep: -2, red: -2, msg: "Dices que fue excepcional. El equipo entiende otra cosa: que la próxima amenaza tiene que ser más creíble." } },
        { t: "Publicar reglas de ascenso y sueldo", d: { cri: 3, rep: 2, ene: -2, cash: -1000, msg: "Escribes cómo se sube y cuánto se gana. Ya nadie tiene que amenazar; basta con leer." } },
      ] },
    { id: 14804, por: "Un fondo intentó llevarse a tu mejor analista", t: "El fondo viene por el segundo",
      x: "El fondo que tentó a tu analista ahora va por el segundo mejor del equipo. Ya saben dónde está el talento.",
      o: [
        { t: "Hablar con el segundo antes que ellos", d: { red: 3, rep: 2, ene: -1, cash: -1000, msg: "Lo invitas a almorzar antes de que lo llamen. Cuando lo llaman, ya sabe lo que quiere." } },
        { t: "Llamar al fondo y pedirles que paren", d: { rep: 1, cri: 1, red: -1, msg: "Llamas al socio del fondo. Se ríe, pero baja el ritmo. Nadie quiere pelearse con su próximo asesor." } },
        { t: "Dejar que el mercado decida", d: { ene: 2, red: -2, msg: "No haces nada. El segundo se queda, pero ahora sabe que su sueldo tiene un precio afuera." } },
      ] },

    /* ===== 15 Te ofrecen una silla en el board ===== */
    { id: 14851, por: "Aceptaste una silla en una junta directiva", t: "Tu voto desempata en la junta",
      x: "La junta discute reemplazar al gerente general. Dos a favor, dos en contra, y todos te miran a ti.",
      o: [
        { t: "Votar por cambiarlo", d: { rep: 2, cri: 2, red: -2, msg: "Votas por el cambio. El gerente sale y el nuevo llega sabiendo a quién le debe la silla." } },
        { t: "Votar por darle seis meses más", d: { red: 2, cri: 1, rep: -1, msg: "Le das seis meses. Los aprovecha a medias, que es lo que suele hacer quien recibe seis meses." } },
        { t: "Pedir un informe antes de votar", d: { cri: 4, ene: -3, msg: "Pides datos y se aplaza un mes. Lees todo. Votas con la conciencia tranquila y los ojos cansados." } },
      ] },
    { id: 14852, por: "Aceptaste una silla en una junta directiva", t: "Ves una operación desde adentro",
      x: "Desde la junta ves que la compañía necesita comprar un proveedor. Tú podrías asesorarla, si no fuera porque estás en la mesa.",
      o: [
        { t: "Ofrecerte como asesor, con el conflicto declarado", d: { cash: 6000, red: 2, cri: -1, msg: "Declaras el conflicto por escrito y te contratan. Ahora eres juez y parte, con los papeles en regla.",
          luego: [{ en: 1, s: "rep", azar: [{ p: 60, id: 14860, bueno: true }, { p: 40, id: 14861, bueno: false }] }] } },
        { t: "Recomendar a otra firma", d: { rep: 3, red: 3, cri: 2, msg: "Recomiendas a un competidor serio. La junta toma nota y el competidor te debe una de las grandes." } },
      ] },
    { id: 14860, por: "Asesoraste a la compañía de cuya junta eres parte", t: "El conflicto pasó sin ruido",
      x: "La compra sale bien y nadie cuestiona tu doble papel. Los papeles estaban en regla y los números también.",
      o: [
        { t: "Dejar la junta para asesorar sin dudas", d: { rep: 3, cri: 2, red: -1, msg: "Dejas la silla. Pierdes una vista privilegiada y ganas un cliente sin preguntas incómodas." } },
        { t: "Seguir con los dos sombreros", d: { cash: 4000, cri: -2, rep: -1, msg: "Sigues en los dos lados. Funciona hasta que deje de funcionar, que es como funciona todo." } },
      ] },
    { id: 14861, por: "Asesoraste a la compañía de cuya junta eres parte", t: "Un accionista denuncia el conflicto",
      x: "Un accionista minoritario le escribe a la prensa: el director que asesoró la compra cobró por ella. Ese director eres tú.",
      o: [
        { t: "Devolver los honorarios y dar la cara", d: { cash: -6000, rep: 2, cri: 3, msg: "Devuelves lo cobrado y das una entrevista corta. Pierdes dinero y salvas el nombre." } },
        { t: "Defender que todo estaba declarado", d: { rep: -3, cri: 1, ene: -3, msg: "Muestras los papeles. Estabas en regla, pero el titular ya salió y nadie lee la segunda página." } },
      ] },
    { id: 14853, por: "Aceptaste una silla en una junta directiva", t: "La compañía entra en problemas",
      x: "Las cifras del trimestre salen mal y los accionistas piden explicaciones. Tu nombre está en la lista de directores.",
      o: [
        { t: "Liderar el plan de rescate", d: { rep: 4, mod: 2, ene: -5, deja: "l4_rescate", msg: "Te pones al frente. Medio año de noches, y cuando se estabiliza todos recuerdan quién se quedó." } },
        { t: "Renunciar a la junta a tiempo", d: { rep: -3, ene: 3, cri: 1, msg: "Renuncias antes de que empeore. Sales limpio en lo legal y no tan limpio en lo que se comenta." } },
      ] },
    { id: 14854, por: "Declinaste una silla en la junta por conflicto", t: "El cliente te confía más",
      x: "El cliente que te propuso la junta te encarga revisar todo su portafolio. Dice que eres de los pocos sin intereses cruzados.",
      o: [
        { t: "Hacer la revisión a fondo", d: { cash: 5000, rep: 3, ene: -3, msg: "Revisas todo, empresa por empresa. Encuentras dos problemas que nadie quería ver y te pagan por verlos." } },
        { t: "Proponer una relación anual", d: { cash: 7000, red: 2, cri: 1, ene: -1, msg: "Le propones un acuerdo por año. Acepta. Es menos emocionante que un mandato y bastante más tranquilo." } },
      ] },
    { id: 14855, por: "Declinaste una silla en la junta por conflicto", t: "Otra junta te ofrece una silla",
      x: "Se supo por qué declinaste. Otra empresa, sin ninguna relación con tus clientes, te ofrece un asiento en su junta.",
      o: [
        { t: "Aceptar esta: no hay conflicto", d: { red: 3, cri: 3, ene: -3, cash: 2000, msg: "Aceptas. Cuatro juntas al año y una vista de otra industria que te cambia la forma de mirar la tuya." } },
        { t: "Declinar también: tu agenda manda", d: { ene: 3, red: -1, msg: "Declinas otra vez. Tu agenda respira y tu fama de persona escrupulosa crece sin que la busques." } },
      ] },
  ],

  raices: {
    /* dueño de firma */
    "9601": {
      "0": { deja: "l4_vendiste_parte", luego: [{ en: 1, s: "rep", azar: [{ p: 45, id: 14001 }, { p: 25, id: 14002, bueno: true }, { p: 30, id: 14004 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 60, id: 14003 }, { p: 40, id: 14004 }] }] },
      "2": { deja: "l4_no_vendiste", luego: [{ en: 2, s: "red", azar: [{ p: 40, id: 14005, bueno: false }, { p: 40, id: 14002, bueno: true }, { p: 20, id: 14004 }] }] },
    },
    "9602": {
      "0": { deja: "l4_socio_con_parte", luego: [{ en: 1, s: "red", azar: [{ p: 35, id: 14051, bueno: false }, { p: 30, id: 14052, bueno: true }, { p: 35, id: 14053 }] }] },
      "1": { deja: "l4_socio_se_fue", luego: [{ en: 1, s: "rep", azar: [{ p: 55, id: 14054, bueno: false }, { p: 45, id: 14055, bueno: true }] }] },
    },
    "9603": {
      "0": { deja: "l4_bonos_generosos", luego: [{ en: 1, s: "rep", azar: [{ p: 45, id: 14101, bueno: true }, { p: 30, id: 14102, bueno: false }, { p: 25, id: 14103 }] }] },
      "1": { deja: "l4_bonos_para_ti", luego: [{ en: 1, s: "rep", azar: [{ p: 40, id: 14104, bueno: false }, { p: 35, id: 14103 }, { p: 25, id: 14105, bueno: true }] }] },
    },
    "9604": {
      "0": { deja: "l4_fusionaste", luego: [{ en: 1, s: "red", azar: [{ p: 40, id: 14151 }, { p: 30, id: 14152, bueno: true }, { p: 30, id: 14153, bueno: false }] }] },
      "1": { deja: "l4_por_tu_cuenta", luego: [{ en: 2, s: "rep", azar: [{ p: 50, id: 14154, bueno: false }, { p: 50, id: 14155, bueno: true }] }] },
    },
    "9605": {
      "0": { deja: "l4_miami", luego: [{ en: 1, s: "red", azar: [{ p: 35, id: 14201, bueno: false }, { p: 30, id: 14202, bueno: true }, { p: 35, id: 14203 }] }] },
      "1": { luego: [{ en: 1, s: "rep", azar: [{ p: 55, id: 14204, bueno: false }, { p: 45, id: 14205, bueno: true }] }] },
    },

    /* oficina */
    "1": {
      "0": { luego: [{ en: 1, s: "mod", azar: [{ p: 45, id: 14251 }, { p: 30, id: 14252, bueno: true }, { p: 25, id: 14253 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 55, id: 14253 }, { p: 45, id: 14251 }] }] },
      "2": { luego: [{ en: 1, s: "red", azar: [{ p: 40, id: 14254, bueno: false }, { p: 35, id: 14255, bueno: true }, { p: 25, id: 14251 }] }] },
    },
    "2": {
      "0": { deja: "l4_avisaste_error", luego: [{ en: 1, s: "rep", azar: [{ p: 40, id: 14301, bueno: true }, { p: 35, id: 14302, bueno: false }, { p: 25, id: 14303 }] }] },
      "1": { luego: [{ en: 1, s: "mod", azar: [{ p: 40, id: 14304, bueno: false }, { p: 35, id: 14305 }, { p: 25, id: 14303 }] }] },
    },
    "3": {
      "0": { luego: [{ en: 1, s: "red", azar: [{ p: 35, id: 14351, bueno: true }, { p: 40, id: 14352 }, { p: 25, id: 14355, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "red", azar: [{ p: 35, id: 14353 }, { p: 35, id: 14354, bueno: true }, { p: 30, id: 14355, bueno: false }] }] },
    },
    "4": {
      "0": { luego: [{ en: 1, s: "ene", azar: [{ p: 40, id: 14401, bueno: true }, { p: 30, id: 14402 }, { p: 30, id: 14403, bueno: false }] }] },
      "1": { deja: "l4_mesa", luego: [{ en: 2, s: "red", azar: [{ p: 50, id: 14404, bueno: false }, { p: 50, id: 14405, bueno: true }] }] },
    },
    "5": {
      "0": { luego: [{ en: 1, s: "red", azar: [{ p: 55, id: 14451, bueno: true }, { p: 45, id: 14452, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "red", azar: [{ p: 30, id: 14451, bueno: true }, { p: 40, id: 14453 }, { p: 30, id: 14455, bueno: false }] }] },
      "2": { luego: [{ en: 1, s: "mod", azar: [{ p: 45, id: 14454, bueno: true }, { p: 30, id: 14453 }, { p: 25, id: 14455, bueno: false }] }] },
    },
    "6": {
      "0": { luego: [{ en: 1, s: "mod", azar: [{ p: 35, id: 14501 }, { p: 35, id: 14502, bueno: true }, { p: 30, id: 14503, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 14504, bueno: false }, { p: 45, id: 14505, bueno: true }] }] },
    },
    "9": {
      "0": { luego: [{ en: 2, s: "red", azar: [{ p: 35, id: 14551, bueno: true }, { p: 35, id: 14552, bueno: false }, { p: 30, id: 14554 }] }] },
      "1": { luego: [{ en: 1, s: "red", azar: [{ p: 40, id: 14553 }, { p: 35, id: 14555, bueno: true }, { p: 25, id: 14554 }] }] },
    },
    "10": {
      "0": { luego: [{ en: 1, s: "mod", azar: [{ p: 55, id: 14601, bueno: true }, { p: 45, id: 14602, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 14603 }, { p: 35, id: 14604, bueno: true }, { p: 30, id: 14605, bueno: false }] }] },
    },
    "11": {
      "0": { luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 14651 }, { p: 30, id: 14653, bueno: true }, { p: 35, id: 14655, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 14652 }, { p: 45, id: 14654, bueno: true }] }] },
    },
    "12": {
      "0": { luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 14701, bueno: false }, { p: 45, id: 14702, bueno: true }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 14703 }, { p: 40, id: 14704, bueno: true }, { p: 25, id: 14705, bueno: false }] }] },
    },
    "13": {
      "0": { luego: [{ en: 1, s: "ene", azar: [{ p: 50, id: 14751, bueno: true }, { p: 50, id: 14752, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "red", azar: [{ p: 55, id: 14753 }, { p: 45, id: 14751, bueno: true }] }] },
      "2": { luego: [{ en: 1, s: "rep", azar: [{ p: 55, id: 14754, bueno: false }, { p: 45, id: 14755, bueno: true }] }] },
    },
    "14": {
      "0": { deja: "l4_puente", luego: [{ en: 2, s: "red", azar: [{ p: 40, id: 14801, bueno: true }, { p: 35, id: 14802, bueno: false }, { p: 25, id: 14804 }] }] },
      "1": { luego: [{ en: 1, s: "rep", azar: [{ p: 55, id: 14803 }, { p: 45, id: 14804, bueno: false }] }] },
    },
    "15": {
      "0": { deja: "l4_board", luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 14851 }, { p: 30, id: 14852, bueno: true }, { p: 35, id: 14853, bueno: false }] }] },
      "1": { luego: [{ en: 1, s: "rep", azar: [{ p: 55, id: 14854, bueno: true }, { p: 45, id: 14855 }] }] },
    },
  },

  finales: [
    { id: "l4_dueno_entero", huellas: ["l4_no_vendiste", "l4_por_tu_cuenta"], t: "Lo tuyo no estaba en venta",
      x: "Te quisieron comprar y no vendiste; te propusieron fusionarte y seguiste por tu cuenta. Tu firma es chica, lenta y entera tuya. La última hoja la firmas tú." },
    { id: "l4_cuentas_claras", huellas: ["l4_avisaste_error", "l4_board"], t: "La verdad, temprano",
      x: "Avisaste del error cuando dolía y años después te sentaron en una junta. Llegaste arriba con una fama rara en este oficio: decir la verdad antes de que te la pregunten." },
    { id: "l4_sabias_el_numero", huellas: ["l4_informacion_usada"], t: "Sabías el número",
      x: "Una vez alguien te contó el precio del otro lado y lo usaste. Ganaste esa negociación y muchas más, y en cada una alguien se preguntó qué sabías tú." },
  ],
};
