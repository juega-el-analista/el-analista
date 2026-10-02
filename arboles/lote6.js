/* Lote 6 de árboles de consecuencias de El Analista. Escenas de oficina.
   Raíces: 30, 31, 32, 33, 34, 40, 41, 42, 43, 50, 51, 52, 53. Ids 16000-16999. */
module.exports = {
  huellas: {
    l6_aguantaste_caida: "Aguantaste una caída fuerte del mercado sin vender",
    l6_vendiste_caida: "Vendiste todo en plena caída del mercado",
    l6_apalancado: "Te endeudaste para invertir porque el mercado solo subía",
    l6_trato_parejo: "Diste a todos tus inversionistas los mismos términos",
    l6_trato_secreto: "Le diste a un inversionista algo que los demás no sabían",
    l6_maestro: "Te tomaste el tiempo de explicar lo difícil",
    l6_metodo: "Decidiste con método cuando era fácil no hacerlo",
    l6_atajo: "Firmaste sin leer y te acostumbraste",
    l6_humo: "Valoraste sobre números que resultaron humo",
    l6_version_vieja: "Entregaste una versión vieja de un modelo",
    l6_automatizaste: "Automatizaste lo que otros hacían a mano",
    l6_honesto: "Dijiste no sé cuando inventar era más fácil",
  },

  escenas: [
    /* ===== Raíz 30: Corrección fuerte en la pantalla ===== */
    { id: 16000, por: "Viviste una caída fuerte con tu portafolio", t: "La caída siguió un año entero",
      x: "No fue una corrección: el mercado siguió bajando doce meses. En la oficina ya nadie hace chistes sobre comprar barato.",
      o: [
        { t: "Comprar un poco cada mes", d: { cri: 3, ene: -2, cash: -1500, msg: "Cada mes compras un poco más barato. Duele igual, pero ahora con método." } },
        { t: "No tocar nada y seguir trabajando", d: { ene: 2, cri: 1, msg: "Cierras la aplicación y te concentras en lo que sí controlas: tu trabajo." } },
        { t: "Vender todo lo que te quede invertido", d: { cri: -3, cash: 500, deja: "l6_vendiste_caida", msg: "Vendes cerca del piso. Lo sabrás después, como todos." } },
      ] },
    { id: 16001, por: "Te quedaste invertido durante la caída", t: "El rebote te encontró adentro",
      x: "En pocos meses el mercado recupera casi todo. Tu portafolio vuelve a verse sano y tú te ves más sabio de lo que fuiste.",
      o: [
        { t: "Rebalancear y tomar algo de ganancia", d: { cri: 3, cash: 2000, msg: "Vendes lo que subió de más y vuelves a tu reparto original. Aburrido y correcto." } },
        { t: "Contarlo en la mesa como si fuera estrategia", d: { rep: 2, red: 2, cri: -1, msg: "Lo cuentas con la palabra convicción. Nadie pregunta cuántas noches dormiste mal." } },
        { t: "Endeudarte para invertir más: ahora solo sube", d: { cri: -4, cash: 1500, deja: "l6_apalancado",
          msg: "Pides prestado contra tu cuenta y compras más. Te sientes invencible, que es la sensación más cara del mercado.",
          luego: [{ en: 2, s: "cri", azar: [{ p: 55, id: 16005, bueno: false }, { p: 45, id: 16006, bueno: true }] }] } },
      ] },
    { id: 16002, por: "Vendiste y te refugiaste en efectivo", t: "El rebote te encontró en efectivo",
      x: "El mercado recuperó casi todo en pocos meses. Tu efectivo sigue intacto y bastante más chico en comparación.",
      o: [
        { t: "Volver a entrar ahora, aunque más caro", d: { cri: 2, cash: -1000, msg: "Recompras lo que vendiste a un precio peor. Es la matrícula de una lección cara." } },
        { t: "Esperar otra caída para entrar", d: { cri: -2, ene: -2, msg: "Esperas. El mercado no se entera de que lo estás esperando." } },
        { t: "Pasarte a fondos indexados y no mirar más", d: { cri: 3, ene: 2, msg: "Compras el índice entero y borras la aplicación. Tarde, pero borrada." } },
      ] },
    { id: 16003, por: "Viviste una caída fuerte con tu portafolio", t: "Un colega te pide consejo",
      x: "Vendió todo en el peor día y ahora quiere saber qué hiciste tú. Te mira como si tuvieras la respuesta.",
      o: [
        { t: "Contarle la verdad, errores incluidos", d: { rep: 3, red: 2, msg: "Le cuentas lo que hiciste y lo que te salió mal. Se va más tranquilo y un poco decepcionado." } },
        { t: "Venderle tu versión heroica", d: { red: 1, rep: -2, msg: "Le cuentas una historia de sangre fría. Él la repite en otro piso y alguien sabe la verdad." } },
        { t: "Recomendarle un fondo indexado y paciencia", d: { red: 2, cri: 1, msg: "Le das el consejo menos emocionante del mundo. Es el único que funciona." } },
      ] },
    { id: 16004, empleado: true, por: "Compraste la caída en tramos desde la oficina", t: "Cumplimiento pregunta por tus operaciones",
      x: "El área de cumplimiento revisa las operaciones personales del equipo durante la caída. Las tuyas están en la lista.",
      o: [
        { t: "Mostrar todo, con fechas y permisos", d: { rep: 2, ene: -2, msg: "Llevas todo impreso. Revisan, asienten y te piden que la próxima vez avises antes." } },
        { t: "Decir que lo hizo tu asesor", d: { rep: -4, cri: -2, msg: "No tienes asesor. Cumplimiento tarda una tarde en descubrirlo." } },
      ] },
    { id: 16005, por: "Te endeudaste para invertir después del rebote", t: "Llegó la llamada de margen",
      x: "El mercado corrigió otra vez. El corredor te pide poner más dinero hoy o venderá tus posiciones a precio de remate.",
      o: [
        { t: "Poner más efectivo y aguantar", d: { cash: -3000, ene: -3, msg: "Vacías el ahorro para sostener la deuda. El mercado sube tres semanas después, sin pedirte perdón." } },
        { t: "Cerrar todo y aceptar la pérdida", d: { cash: -2000, cri: 4, msg: "Vendes, pagas y te quedas mirando la cuenta. No vuelves a pedir prestado para invertir." } },
      ] },
    { id: 16006, por: "Te endeudaste para invertir después del rebote", t: "La deuda te salió bien",
      x: "El mercado siguió subiendo y tu cuenta con deuda también. Lo peligroso es que ahora crees que sabes.",
      o: [
        { t: "Pagar la deuda y quedarte con la ganancia", d: { cash: 3000, cri: 3, msg: "Cierras, pagas y guardas. La suerte se cobra mejor cuando uno se va a tiempo." } },
        { t: "Duplicar la apuesta", d: { cash: 2000, cri: -5, ene: -2, msg: "Pides más prestado. Esta vez también sale. Todavía." } },
      ] },

    /* ===== Raíz 31: Un fondo pide condiciones aparte ===== */
    { id: 16010, por: "Negociaste con un fondo que pedía condiciones aparte", t: "El fondo grande vuelve por más",
      x: "Quiere entrar en tu próximo fondo con un ticket mayor. A cambio pide una comisión más baja que la de los demás.",
      o: [
        { t: "Mantener la regla: mismos términos para todos", d: { rep: 4, cash: -1000, deja: "l6_trato_parejo", msg: "Entra con un ticket menor. Los demás inversionistas, cuando se enteran, firman más rápido." } },
        { t: "Ofrecer descuento por tamaño a cualquiera", d: { cri: 3, cash: 2000, msg: "Escribes una tabla pública: quien pone más, paga menos. El fondo entra y nadie se siente engañado." } },
        { t: "Dárselo solo a él, por esta vez", d: { rep: -2, cash: 3000, deja: "l6_trato_secreto",
          msg: "Lo firmas en un anexo que nadie más ve. Por esta vez, que es como empiezan todas las veces.",
          luego: [{ en: 2, azar: [{ p: 60, id: 16015 }, { p: 40, id: 16014 }] }] } },
      ] },
    { id: 16011, por: "Le concediste un acuerdo aparte a un fondo", t: "Otro inversionista quiere lo mismo",
      x: "Un inversionista chico leyó el informe. Su contrato dice que recibe cualquier beneficio que le des a otro, y lo quiere.",
      o: [
        { t: "Extenderle los mismos derechos", d: { cash: -1500, rep: 2, msg: "Se los das sin discutir. Te cuesta algo y te ahorra un pleito." } },
        { t: "Defender que su caso es distinto", d: { cri: 1, rep: -2, ene: -3, msg: "Tienes argumentos. Él tiene el contrato. Tres reuniones después, nadie está contento." } },
        { t: "Pasárselo a los abogados", d: { cash: -2000, ene: -1, msg: "Los abogados le dan la razón a él y te mandan la factura a ti." } },
      ] },
    { id: 16012, por: "Negociaste con un fondo que pedía condiciones aparte", t: "Los demás agradecen la claridad",
      x: "En la reunión anual, varios inversionistas dicen que les gusta saber exactamente qué firmó cada uno.",
      o: [
        { t: "Convertirlo en política escrita", d: { rep: 3, cri: 2, msg: "Una página, sin letra chica. La mandas a todos y la cuelgas en la sala de reuniones." } },
        { t: "Aprovechar el buen ánimo para levantar más capital", d: { red: 4, cash: 2500, ene: -2, msg: "Sales con dos compromisos nuevos y una agenda llena de almuerzos." } },
      ] },
    { id: 16013, por: "Le negaste condiciones aparte a un fondo", t: "El fondo se fue con la competencia",
      x: "En tu siguiente fondo no repitió: firmó con un competidor que sí le dio todo. Te lo cuentan en un almuerzo, con cara de pésame.",
      o: [
        { t: "Felicitar al competidor, sin ironía", d: { red: 2, rep: 1, msg: "Le escribes dos líneas amables. Él no sabe si es sincero y eso también sirve." } },
        { t: "Llamar al fondo para la próxima", d: { red: 3, ene: -1, msg: "Le dices que la puerta sigue abierta, con las mismas reglas. Te lo agradece, y anota." } },
        { t: "Arrepentirte en silencio", d: { ene: -3, cri: 1, msg: "Haces la cuenta de lo que no ganaste. Luego haces la de lo que no arriesgaste. Empatan." } },
      ] },
    { id: 16014, por: "Negociaste con un fondo que pedía condiciones aparte", t: "El regulador pide tus acuerdos",
      x: "Una revisión de rutina pide todos los acuerdos firmados con inversionistas. Todos significa todos.",
      o: [
        { t: "Entregar todo ordenado y a tiempo", d: { rep: 3, ene: -2, msg: "Lo mandas en una carpeta impecable. El revisor parece casi decepcionado." } },
        { t: "Pedir una prórroga", d: { rep: -1, ene: 1, msg: "Te dan dos semanas y una anotación en tu expediente que dice prórroga." } },
      ] },
    { id: 16015, por: "Le diste una comisión más baja solo a un fondo", t: "El descuento secreto se supo",
      x: "Un inversionista comparó números con el fondo grande en una conferencia. Ahora todos quieren saber qué más no les contaste.",
      o: [
        { t: "Extender el descuento a todos", d: { cash: -3000, rep: -1, msg: "Pagas el descuento multiplicado por todos. Te sale más caro que haber dicho que no." } },
        { t: "Disculparte por escrito y explicar", d: { rep: -3, cri: 2, msg: "La carta es honesta. Dos inversionistas no renuevan y el resto te mira con lupa." } },
      ] },

    /* ===== Raíz 32: Te piden explicar la cascada ===== */
    { id: 16020, por: "Atendiste a un inversionista que no entendía la cascada", t: "El inversionista vuelve con su contador",
      x: "Volvió con su contador y dos preguntas buenas. Si le contestas bien, quiere poner más en el siguiente fondo.",
      o: [
        { t: "Contestar las dos preguntas a fondo", d: { rep: 3, red: 2, cash: 1500, msg: "Te toma una tarde. El contador cierra la libreta y asiente. Eso es un sí." } },
        { t: "Pasarle el caso al equipo comercial", d: { ene: 2, red: -1, msg: "El equipo comercial contesta con un folleto. El inversionista pone lo mismo de antes, ni más ni menos." } },
      ] },
    { id: 16021, por: "Atendiste a un inversionista que no entendía la cascada", t: "Reclama su primera distribución",
      x: "Llegó la primera distribución y es menos de lo que esperaba. Te escribe un correo largo, todo en mayúsculas.",
      o: [
        { t: "Llamarlo y recorrer los números con él", d: { rep: 2, ene: -2, msg: "Una hora al teléfono. Al final no está feliz, pero entiende por qué. Es lo máximo que se puede." } },
        { t: "Responder con el párrafo del contrato", d: { cri: 1, rep: -2, msg: "Le copias la cláusula exacta. Correcto, frío y con número de página.",
          luego: [{ en: 1, azar: [{ p: 60, id: 16025, bueno: false }, { p: 40, id: 16026, bueno: true }] }] } },
        { t: "Invitarlo a la oficina con café", d: { red: 2, ene: -1, cash: -300, msg: "Viene, toma tres cafés y se va con un dibujo en una servilleta. Lo guarda." } },
      ] },
    { id: 16022, por: "Le explicaste la cascada a un inversionista nuevo", t: "Les habló de ti a sus amigos",
      x: "Les contó a tres amigos que fuiste el único que se sentó a explicarle. Los tres quieren una reunión.",
      o: [
        { t: "Recibir a los tres, uno por uno", d: { red: 5, ene: -3, msg: "Tres reuniones, tres hojas dibujadas, tres tarjetas nuevas en tu cajón." } },
        { t: "Hacer una sola sesión para los tres", d: { red: 3, cri: 2, deja: "l6_maestro", msg: "Preparas una lámina con el orden del reparto. Se hacen preguntas entre ellos y aprenden más." } },
      ] },
    { id: 16023, por: "Le mandaste el documento a un inversionista con dudas", t: "El inversionista trajo a su abogado",
      x: "Nunca leyó el documento entero. Ahora su abogado pregunta si tu comisión de éxito se calculó bien.",
      o: [
        { t: "Mostrar el cálculo paso por paso", d: { cri: 2, rep: 1, ene: -3, msg: "Al final haces lo que no quisiste hacer al principio, solo que con un abogado mirando." } },
        { t: "Que lo resuelvan los abogados", d: { cash: -2000, rep: -1, msg: "Dos abogados cobran por confirmar que el cálculo estaba bien. Todos ganan, menos tú." } },
      ] },
    { id: 16024, por: "Le explicaste la cascada a un inversionista nuevo", t: "Te piden la charla para los nuevos",
      x: "Alguien vio cómo lo manejaste y te pide explicar la cascada a todo el equipo junior, con pizarra.",
      o: [
        { t: "Preparar un diagrama simple", d: { rep: 3, red: 2, ene: -2, deja: "l6_maestro", msg: "Una flecha por cada paso del reparto. Dos juniors lo fotografían. Uno lo usa en su tesis." } },
        { t: "Pasar la plantilla del año pasado", d: { ene: 1, rep: -1, msg: "La plantilla tiene un error que nadie corrige desde hace años. Ahora también es tuyo." } },
      ] },
    { id: 16025, por: "Le respondiste a un inversionista con el contrato", t: "El inversionista no renovó",
      x: "Llegó el siguiente fondo y no puso nada. En su carta dice que prefiere socios que hablen como personas.",
      o: [
        { t: "Llamarlo para entender qué pasó", d: { red: 2, rep: 1, ene: -1, msg: "Te lo dice sin rodeos. No cambia de opinión, pero cuenta que lo llamaste." } },
        { t: "Archivar la carta y seguir", d: { ene: 1, red: -2, msg: "Archivas la carta. Él no archiva la anécdota." } },
      ] },
    { id: 16026, por: "Le respondiste a un inversionista con el contrato", t: "Leyó el contrato y te dio la razón",
      x: "Se sentó a leer el párrafo que le mandaste y entendió. Ahora te manda preguntas precisas y con número de página.",
      o: [
        { t: "Contestarle con la misma precisión", d: { rep: 2, cri: 2, msg: "Se vuelve el inversionista más fácil de tu lista. Quién lo diría." } },
        { t: "Sugerirle que lea también los anexos", d: { red: 1, ene: 1, msg: "Los lee. Encuentra una coma mal puesta y está orgulloso de sí mismo." } },
      ] },

    /* ===== Raíz 33: Dos ofertas sobre la mesa ===== */
    { id: 16030, por: "Elegiste comprador en una venta con dos ofertas", t: "El comprador quiere renegociar",
      x: "Ya firmado el acuerdo, el comprador aparece con hallazgos y pide bajar el precio. El otro postor ya se fue.",
      o: [
        { t: "Aceptar un ajuste chico para cerrar", d: { cash: -1000, red: 2, msg: "Cedes un poco y cierras. El vendedor refunfuña, pero firma." } },
        { t: "Plantarte en el precio firmado", d: { rep: 2, cri: 2, ene: -2, msg: "Le dices que el precio está firmado. Hay un silencio de una semana.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 16035, bueno: true }, { p: 45, id: 16036, bueno: false }] }] } },
        { t: "Llamar al otro postor por si acaso", d: { red: 2, ene: -2, msg: "El otro postor contesta, educado y frío. Sirve para negociar y poco más." } },
      ] },
    { id: 16031, por: "Cerraste una venta con dos ofertas sobre la mesa", t: "El vendedor te recomienda",
      x: "El dueño que vendió le cuenta a su club de empresarios cómo lo llevaste. Te llama otro dueño que quiere vender.",
      o: [
        { t: "Tomar el mandato nuevo", d: { cash: 4000, ene: -3, car: 2, msg: "Otro proceso, otras dos ofertas, otro año sin vacaciones." } },
        { t: "Referirlo a un colega de confianza", d: { red: 3, ene: 1, msg: "Tu colega te debe una. En esta industria, eso se cobra." } },
      ] },
    { id: 16032, por: "Cerraste una venta con dos ofertas sobre la mesa", t: "La integración salió mal",
      x: "El comprador despide a medio equipo de la empresa vendida y la prensa local te nombra como asesor del trato.",
      o: [
        { t: "Dar tu versión a la prensa", d: { rep: -1, red: 1, msg: "Explicas que asesoraste la venta, no lo que vino después. Nadie lee el segundo párrafo." } },
        { t: "No decir nada", d: { rep: -2, ene: 1, msg: "El silencio pasa por culpa. Al mes, nadie se acuerda." } },
        { t: "Ayudar a recolocar a los despedidos", d: { red: 4, rep: 2, ene: -3, msg: "Haces llamadas por semanas. Varios consiguen trabajo y uno te manda una botella." } },
      ] },
    { id: 16033, por: "Se te cayó una venta en la recta final", t: "Toca rearmar la venta",
      x: "El vendedor sigue queriendo vender, pero ahora te mira raro. El otro comprador vuelve con un precio de remate.",
      o: [
        { t: "Volver al otro comprador con humildad", d: { cash: 1500, rep: -1, msg: "Cierras a menor precio. El vendedor firma y no te invita a la celebración." } },
        { t: "Reabrir el proceso desde cero", d: { ene: -4, cri: 2, cash: 2000, msg: "Seis meses más de trabajo y una oferta decente al final. Esta vez revisas el financiamiento primero." } },
        { t: "Recomendar esperar un año", d: { rep: 1, cash: -1000, msg: "Le dices que el mercado no está para vender. Es cierto y no cobras nada por decirlo." } },
      ] },
    { id: 16034, por: "Se te cayó una venta en la recta final", t: "El vendedor busca otro asesor",
      x: "Te enteras por un tercero: el vendedor está entrevistando a otros bancos para relanzar la venta.",
      o: [
        { t: "Llamarlo y pedir otra oportunidad", d: { red: 1, rep: -1, ene: -2, msg: "Te escucha, te agradece y elige a otro. Al menos se lo pediste de frente." } },
        { t: "Dejarlo ir con elegancia", d: { rep: 2, cash: -1500, msg: "Le mandas todo tu archivo al nuevo asesor. El vendedor lo nota y lo cuenta." } },
      ] },
    { id: 16035, por: "Te plantaste en el precio firmado de una venta", t: "El precio se sostuvo",
      x: "Después de una semana de silencio, el comprador firma al precio original. Solo quería ver si cedías.",
      o: [
        { t: "Cobrar y contarlo como lección", d: { cash: 2500, rep: 2, msg: "El vendedor te paga completo y te presenta como el que no se dejó mover." } },
        { t: "Cobrar y no contar nada", d: { cash: 2500, cri: 2, msg: "Cobras en silencio. Sabes que esta vez pudo salir al revés." } },
      ] },
    { id: 16036, por: "Te plantaste en el precio firmado de una venta", t: "El comprador se retiró",
      x: "El comprador usó una cláusula de salida y se fue. El vendedor te pregunta si plantarse valía tanto.",
      o: [
        { t: "Defender que era lo correcto", d: { cri: 2, red: -2, msg: "Tienes razón en el papel. El vendedor no vende con papeles." } },
        { t: "Reconocer que pudiste ceder", d: { rep: 1, cri: 2, ene: -2, deja: "l6_honesto", msg: "Se lo dices sin adornos. No te perdona, pero te sigue llamando." } },
      ] },

    /* ===== Raíz 34: Alguien de la mesa te pregunta qué harías ===== */
    { id: 16040, por: "Contestaste en el momento frente a la mesa", t: "Tu respuesta quedó en un memo",
      x: "Lo que dijiste en la mesa terminó citado en un memo para un cliente. Con tu nombre, y sin el contexto.",
      o: [
        { t: "Revisarla y corregir lo que haga falta", d: { cri: 3, rep: 2, ene: -2, msg: "Afinas dos frases y agregas una advertencia. El memo queda mejor que tu respuesta." } },
        { t: "Dejarla como está", d: { ene: 1, msg: "La dejas. Lo dicho, dicho está.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 45, id: 16045, bueno: true }, { p: 55, id: 16046, bueno: false }] }] } },
        { t: "Pedir que quiten tu nombre", d: { rep: -1, ene: 1, msg: "Lo quitan. Todos saben que era tuyo igual." } },
      ] },
    { id: 16041, por: "Te preguntaron en la mesa qué harías", t: "La mesa vuelve a mirarte",
      x: "Otra reunión, otra pregunta sin contexto. Esta vez todos se voltean hacia ti antes de que la terminen.",
      o: [
        { t: "Contestar rápido otra vez", d: { rep: 2, cri: -1, ene: -1, msg: "Contestas antes de pensar. Suena bien. Lo sabrás en un mes." } },
        { t: "Decir qué datos necesitas y para cuándo", d: { cri: 3, rep: 1, msg: "Respondes con un plan en vez de una respuesta. A la mesa le cuesta, pero lo anota." } },
        { t: "Devolverle la pregunta al que la hizo", d: { red: -1, ene: 1, msg: "Le preguntas qué haría él. Resulta que no tenía idea. La sala lo disfruta más que él." } },
      ] },
    { id: 16042, por: "Pediste el archivo y contestaste después", t: "Tu respuesta tardía era la correcta",
      x: "La mesa ya había decidido otra cosa cuando contestaste. Dos semanas después, los números te dan la razón.",
      o: [
        { t: "Mandar un correo que empiece con como dije", d: { rep: -2, ene: 1, msg: "Te sientes muy bien durante cuatro minutos. La mesa se acuerda bastante más." } },
        { t: "Proponer revisar la decisión", d: { cri: 3, red: -1, ene: -2, msg: "Lo planteas sin culpables. Se corrige a medias y alguien queda incómodo." } },
        { t: "Guardarlo para la próxima", d: { cri: 1, ene: 1, msg: "No dices nada. La próxima vez, cuando pidas el archivo, te esperan." } },
      ] },
    { id: 16043, por: "Pediste el archivo y contestaste después", t: "Ahora el archivo lo armas tú",
      x: "Como siempre pides el archivo, ahora te toca prepararlo antes de cada reunión. Nadie más se ofreció.",
      o: [
        { t: "Aceptar y volverlo tu ventaja", d: { mod: 4, rep: 2, ene: -3, msg: "Llegas a cada reunión sabiendo más que los demás, porque armaste lo que todos miran." } },
        { t: "Proponer que el turno rote", d: { red: 1, ene: 1, msg: "Rota. Los archivos de los demás son peores. Al menos descansas." } },
      ] },
    { id: 16044, por: "Te preguntaron en la mesa qué harías", t: "Un junior copia tu forma de responder",
      x: "Un analista nuevo responde en la mesa igual que te vio hacerlo a ti. Te pide que le digas qué hace mal.",
      o: [
        { t: "Darle una opinión honesta", d: { red: 2, rep: 2, msg: "Le dices dos cosas que haces mal tú también. Las corrige antes que tú." } },
        { t: "Decirle que siga así", d: { red: 1, ene: 1, msg: "Lo dejas tranquilo. Sigue igual, con tus mismos defectos y más seguridad." } },
      ] },
    { id: 16045, por: "Dejaste tu respuesta rápida en un memo", t: "El cliente actuó por tu frase y ganó",
      x: "Un cliente movió una posición grande por lo que dijiste en la mesa. Salió bien y ahora pregunta por ti.",
      o: [
        { t: "Reunirte con él y explicar tu lógica", d: { red: 4, rep: 3, ene: -2, msg: "Le explicas el razonamiento completo. Le gusta más que la frase." } },
        { t: "Aclararle que fue una respuesta rápida", d: { cri: 3, rep: 1, msg: "Le dices que tuvo suerte de que acertaras. Lo aprecia y desconfía, en partes iguales." } },
      ] },
    { id: 16046, por: "Dejaste tu respuesta rápida en un memo", t: "El cliente actuó por tu frase y perdió",
      x: "El cliente movió dinero por lo que dijiste en la mesa. Salió mal y quiere hablar con quien lo dijo.",
      o: [
        { t: "Dar la cara y explicar el contexto", d: { rep: -1, cri: 3, ene: -3, deja: "l6_honesto", msg: "Vas, escuchas y explicas. Sales con la camisa mojada y el cliente todavía en la cartera." } },
        { t: "Decir que el memo lo escribió otro", d: { rep: -4, red: -2, msg: "Es cierto y no importa. Tu nombre estaba en la frase." } },
      ] },

    /* ===== Raíz 40: Una sesión larga frente a la pantalla ===== */
    { id: 16050, por: "Operaste una sesión completa en tu cuenta", t: "Le agarraste el gusto a operar",
      x: "Desde aquella sesión revisas el mercado en el almuerzo, en el baño y en las reuniones. Tu energía lo nota.",
      o: [
        { t: "Ponerte un horario y cumplirlo", d: { cri: 3, ene: 2, msg: "Una hora al cierre y nada más. Los primeros días son peores que dejar el café." } },
        { t: "Abrir una cuenta más grande", d: { cash: -2000, ene: -3, cri: -2, msg: "Pasas más dinero a la cuenta de operar. Más dinero, más pantalla, menos sueño.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 16055, bueno: true }, { p: 65, id: 16056, bueno: false }] }] } },
        { t: "Borrar la aplicación del teléfono", d: { ene: 4, cri: 1, msg: "La borras. Tu pulgar la busca durante dos semanas." } },
      ] },
    { id: 16051, por: "Operaste con tu propia cuenta", t: "El extracto anual de tu cuenta",
      x: "Llega el resumen del año con todas las comisiones juntas. Es la primera vez que las ves sumadas.",
      o: [
        { t: "Pasarte a fondos indexados", d: { cri: 3, cash: 800, msg: "Cambias a algo aburrido que cobra casi nada. El año siguiente pagas menos y ganas más." } },
        { t: "Seguir igual: el año que viene sí", d: { cri: -2, cash: -800, msg: "El año que viene también tiene comisiones." } },
        { t: "Anotar cada operación en una hoja", d: { mod: 3, cri: 2, ene: -2, msg: "Descubres que tus mejores operaciones son las que no hiciste. Lo anotas también." } },
      ] },
    { id: 16052, por: "Compraste y apagaste la pantalla", t: "Tu compra olvidada creció",
      x: "Te acuerdas de la cuenta por casualidad. Lo que compraste aquel día vale bastante más.",
      o: [
        { t: "Vender una parte y darte un gusto", d: { cash: 2500, ene: 3, msg: "Vendes un tercio y te tomas unas vacaciones cortas. Lo demás sigue ahí, olvidado y creciendo." } },
        { t: "Dejarlo crecer otro poco", d: { cri: 2, cash: 1000, msg: "No lo tocas. Lo que funciona por no mirarlo, se sigue sin mirar." } },
        { t: "Usarlo para pagar deudas", d: { cash: 2000, cri: 2, ene: 1, msg: "Pagas lo que debías. Es la rentabilidad más segura del año." } },
      ] },
    { id: 16053, por: "Compraste y apagaste la pantalla", t: "La compra olvidada se desinfló",
      x: "Lo que compraste aquel día cayó a la mitad y no te enteraste hasta hoy.",
      o: [
        { t: "Mantener: no lo compraste para mirarlo", d: { cri: 2, ene: 1, msg: "Vuelves a cerrar la aplicación. Si la tesis no cambió, el precio tampoco importa tanto." } },
        { t: "Vender y aceptar la lección", d: { cash: -1000, cri: 1, msg: "Vendes con pérdida. La lección es cara pero se aprende rápido." } },
        { t: "Comprar más, ahora que está barato", d: { cash: -1500, cri: 1, ene: -1, msg: "Compras más a mitad de precio. Ahora sí lo miras todos los días." } },
      ] },
    { id: 16054, por: "Operaste con tu propia cuenta", t: "Un colega quiere que le enseñes",
      x: "Vio tu pantalla un día y quiere aprender a operar. Tiene ahorros y muchas ganas de perderlos.",
      o: [
        { t: "Enseñarle a no operar", d: { red: 2, cri: 2, msg: "Le explicas las comisiones, los impuestos y tu extracto. Abre un fondo indexado y te invita a almorzar." } },
        { t: "Pasarle tus estrategias", d: { red: 3, rep: -1, msg: "Las copia todas, incluidos tus errores. Al mes te pregunta por qué a ti sí te funciona." } },
      ] },
    { id: 16055, por: "Abriste una cuenta más grande para operar", t: "La cuenta grande te premió",
      x: "Un buen trimestre: tu cuenta grande sube bastante más que el mercado. Empiezas a pensar en dejar tu trabajo.",
      o: [
        { t: "Sacar la ganancia y volver al tamaño de antes", d: { cash: 3000, cri: 4, msg: "Retiras y reduces. Un trimestre bueno no es una carrera, y lo sabes a tiempo." } },
        { t: "Seguir con todo", d: { cash: 1500, cri: -3, ene: -4, msg: "Sigues. Duermes poco, ganas un poco más y miras el mercado como quien mira a un ex." } },
      ] },
    { id: 16056, por: "Abriste una cuenta más grande para operar", t: "La cuenta grande te comió",
      x: "Un mal trimestre se llevó buena parte de la cuenta. Lo peor no es la pérdida: es que quieres recuperarla mañana.",
      o: [
        { t: "Cerrar la cuenta y respirar", d: { cash: -1000, cri: 4, ene: 2, msg: "Cierras y te vas a caminar. La pérdida queda. Las ganas de recuperarla, por suerte, no." } },
        { t: "Doblar para recuperar", d: { cash: -3500, cri: -4, ene: -4, msg: "Doblas. Pierdes la mitad de lo que doblaste. Los números no te tenían cariño." } },
      ] },

    /* ===== Raíz 41: Un cliente quiere comprar apalancado ===== */
    { id: 16060, por: "Le armaste la deuda a un cliente que compraba", t: "La compañía comprada aprieta",
      x: "Las ventas bajaron un trimestre y la deuda pesa. El cliente te llama antes que al banco.",
      o: [
        { t: "Ayudarle a renegociar los plazos", d: { rep: 3, ene: -4, cash: 1500, msg: "Dos semanas con el banco y un plazo nuevo. El cliente respira y te pone de primero en su lista." } },
        { t: "Recomendarle meter más capital", d: { cri: 2, red: -1, msg: "Es lo correcto y no es lo que quería oír. Pone el dinero, refunfuñando." } },
        { t: "Decirle que eso ya no es tu tema", d: { rep: -3, ene: 2, msg: "Técnicamente no lo es. Él no vuelve a llamarte para nada técnico ni para nada." } },
      ] },
    { id: 16061, por: "Le armaste la deuda a un cliente que compraba", t: "El cliente quiere repetir",
      x: "La primera compra va bien y el cliente quiere otra empresa del mismo sector. Te llama a ti primero.",
      o: [
        { t: "Armarle la segunda con la misma receta", d: { cash: 4000, ene: -3, car: 2, msg: "Misma estructura, otro activo. Funciona, y ahora el cliente cree que siempre funcionará." } },
        { t: "Proponer una estructura más conservadora", d: { cri: 3, cash: 2500, msg: "Menos deuda, menos retorno, más sueño. El cliente acepta a regañadientes." } },
      ] },
    { id: 16062, por: "Mandaste a tu cliente con el banco", t: "El banco se quedó con el cliente",
      x: "El cliente ahora hace todo con el banco: la deuda, las cuentas y la próxima compra.",
      o: [
        { t: "Pedirle al banco que te refiera negocios", d: { red: 3, msg: "Te refieren los casos chicos. Mejor que nada, peor que lo que tenías." } },
        { t: "Buscar clientes que el banco no atiende", d: { car: 2, red: 2, ene: -2, msg: "Encuentras empresas medianas que el banco ignora. Son más trabajo y te quieren más." } },
        { t: "Aceptarlo: cobraste y dormiste", d: { ene: 3, msg: "Cobraste tu comisión y dormiste ocho horas. Hay carreras peores." } },
      ] },
    { id: 16063, por: "Mandaste a tu cliente con el banco", t: "El banco le cargó demasiada deuda",
      x: "La estructura del banco era agresiva. El cliente está en problemas y te pregunta qué haría alguien que no le cobra intereses.",
      o: [
        { t: "Asesorarlo en la reestructuración", d: { cash: 3000, rep: 3, ene: -4, msg: "Meses de reuniones con el banco. La empresa sobrevive y el cliente no se olvida de quién llegó." } },
        { t: "Recomendarle un abogado bueno", d: { red: 1, ene: 1, msg: "Le das un nombre y un abrazo. El abogado te lo agradece más que el cliente." } },
      ] },
    { id: 16064, por: "Asesoraste a un cliente en una compra con deuda", t: "Te ofrecen una parte en vez de comisión",
      x: "Al cliente le está yendo bien y te ofrece una participación chica en la empresa en lugar de tu próxima comisión.",
      o: [
        { t: "Aceptar la participación", d: { cash: -1500, ene: -1, msg: "Renuncias al cobro y te quedas con un papel que dice que eres dueño de un pedacito.",
          luego: [{ en: 3, s: "cri", azar: [{ p: 40, id: 16065, bueno: true }, { p: 60, id: 16066, bueno: false }] }] } },
        { t: "Preferir la comisión en efectivo", d: { cash: 2500, cri: 1, msg: "Cobras. Un pájaro en mano y todo eso." } },
      ] },
    { id: 16065, por: "Aceptaste una parte de la empresa en vez de comisión", t: "Tu pedacito vale",
      x: "El cliente vendió la empresa. Tu pedacito, que olvidaste en un cajón, vale varias veces la comisión que no cobraste.",
      o: [
        { t: "Cobrar y guardar casi todo", d: { cash: 8000, cri: 3, msg: "Cobras y lo guardas. La paciencia, esta vez, pagó con intereses." } },
        { t: "Reinvertir en el próximo trato del cliente", d: { cash: 4000, red: 3, msg: "Cobras la mitad y apuestas el resto con él. Te volviste socio sin proponértelo." } },
      ] },
    { id: 16066, por: "Aceptaste una parte de la empresa en vez de comisión", t: "Tu pedacito no vale nada",
      x: "La empresa se refinanció dos veces y tu participación quedó al final de la fila. Vale lo que el papel en que está.",
      o: [
        { t: "Archivarlo como lección", d: { cri: 3, ene: -1, msg: "Lo guardas en el cajón de las lecciones. Ya es un cajón grande." } },
        { t: "Reclamarle al cliente", d: { red: -3, rep: -1, msg: "Él también perdió. La conversación no te devuelve nada y te cuesta un cliente." } },
      ] },

    /* ===== Raíz 42: Ocho hallazgos sobre la mesa ===== */
    { id: 16070, por: "Filtraste los hallazgos de una revisión", t: "Volvió un hallazgo que descartaste",
      x: "Meses después del cierre aparece un problema que estaba en la lista original. Lo habías marcado como ruido.",
      o: [
        { t: "Reconocerlo ante el comité", d: { rep: 1, cri: 3, ene: -2, deja: "l6_honesto", msg: "Lo dices antes de que te lo pregunten. El comité valora eso más de lo que te esperabas." } },
        { t: "Explicar por qué era razonable descartarlo", d: { rep: -1, cri: 1, msg: "Tus razones eran buenas. El problema también era real. Ambas cosas quedan en el acta." } },
        { t: "Volver a mirar la lista entera", d: { cri: 3, ene: -3, msg: "La revisas otra vez. No hay más sorpresas, pero ya no duermes igual." } },
      ] },
    { id: 16071, por: "Filtraste los hallazgos de una revisión", t: "El comité quiere tu filtro siempre",
      x: "El comité aprobó rápido y ahora quiere que todas las revisiones pasen por tus manos antes de llegarle.",
      o: [
        { t: "Aceptar y enseñar el criterio a los juniors", d: { rep: 3, red: 2, ene: -3, deja: "l6_maestro", msg: "Escribes cinco preguntas para separar lo importante del ruido. Los juniors las pegan en la pantalla." } },
        { t: "Aceptar y hacerlo tú solo", d: { rep: 2, ene: -5, msg: "Todas las revisiones pasan por ti. Eres indispensable, y también el cuello de botella." } },
      ] },
    { id: 16072, por: "Subiste todos los hallazgos al comité", t: "El comité se perdió en detalles",
      x: "El comité pasó dos horas discutiendo una factura de mantenimiento y no llegó a votar el caso.",
      o: [
        { t: "Pedir otra sesión con tres puntos", d: { cri: 3, ene: -2, msg: "Vuelves con una hoja y tres puntos. El comité te escucha con cara de alivio.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 60, id: 16075, bueno: true }, { p: 40, id: 16076, bueno: false }] }] } },
        { t: "Culpar al equipo junior", d: { red: -4, rep: -2, msg: "Lo dices en voz alta. Los juniors se enteran en diez minutos y no te lo olvidan." } },
        { t: "Dejar que el caso muera", d: { ene: 2, car: -2, msg: "No insistes. El caso se archiva y tu nombre con él." } },
      ] },
    { id: 16073, por: "Subiste todos los hallazgos al comité", t: "Un detalle menor era el importante",
      x: "Uno de los hallazgos que nadie leyó resultó ser el que importaba. Estaba en la página doce del paquete.",
      o: [
        { t: "Recordar que estaba en el paquete", d: { rep: 1, red: -2, msg: "Tienes razón y lo dices. El comité no te lo agradece: no le gusta que le recuerden lo que no leyó." } },
        { t: "Proponer un formato con prioridades", d: { cri: 3, rep: 2, msg: "Propones subir todo, pero ordenado por gravedad. Lo adoptan y nadie recuerda quién lo propuso." } },
      ] },
    { id: 16074, por: "Revisaste los hallazgos del equipo junior", t: "Los juniors preguntan qué pasó",
      x: "El equipo junior quiere saber qué se hizo con su lista. Trabajaron dos semanas en ella.",
      o: [
        { t: "Explicarles el criterio punto por punto", d: { red: 3, ene: -2, deja: "l6_maestro", msg: "Les explicas qué pesó en el comité y qué no. La próxima lista llega con la mitad de ruido." } },
        { t: "Decirles buen trabajo y ya", d: { red: 1, ene: 1, msg: "Sonríen. La próxima lista llega igual de larga." } },
      ] },
    { id: 16075, por: "Pediste al comité otra sesión con tres puntos", t: "El comité aprobó a la segunda",
      x: "Con tres puntos en una hoja, el comité votó en veinte minutos. Alguien pregunta por qué no se hizo así desde el principio.",
      o: [
        { t: "Contestar con honestidad: fue tu error", d: { rep: 2, cri: 2, deja: "l6_honesto", msg: "Dices que la primera vez no filtraste. El comité lo anota como virtud, por raro que parezca." } },
        { t: "Sonreír y pasar al siguiente punto", d: { ene: 1, rep: 1, msg: "Nadie insiste. El caso está aprobado y el café se enfría." } },
      ] },
    { id: 16076, por: "Pediste al comité otra sesión con tres puntos", t: "El comité ya no quiere oír del caso",
      x: "Te dan la sesión, pero el comité ya decidió en los pasillos. Tres puntos claros no alcanzan contra dos horas de factura.",
      o: [
        { t: "Aceptarlo y guardar la hoja", d: { cri: 2, ene: -1, msg: "Guardas la hoja de tres puntos. Te sirve para el próximo caso, que sí pasa." } },
        { t: "Insistir en otra sesión más", d: { rep: -2, ene: -3, msg: "Insistes. El comité te ve llegar por el pasillo y cambia de dirección." } },
      ] },

    /* ===== Raíz 43: Te ofrecen invertir junto a un fondo ===== */
    { id: 16080, por: "Te ofrecieron coinvertir junto a un fondo amigo", t: "El fondo te invita a otra coinversión",
      x: "Ticket un poco más grande, plazo más corto y el mismo archivo comprimido de siempre.",
      o: [
        { t: "Revisarla tú, sin apuro", d: { cri: 3, ene: -2, deja: "l6_metodo", msg: "Te tomas tu tiempo. El fondo espera, que es lo que hacen los fondos cuando les importas." } },
        { t: "Entrar sin revisar esta vez", d: { cash: -2000, cri: -2, deja: "l6_atajo", msg: "Firmas sin abrir el archivo. Es más cómodo, como casi todo lo que sale caro.",
          luego: [{ en: 2, azar: [{ p: 45, id: 16085, bueno: true }, { p: 55, id: 16086, bueno: false }] }] } },
        { t: "Pasar esta vez", d: { ene: 2, red: -1, msg: "Dices que no. El fondo lo entiende y te invita un poco menos." } },
      ] },
    { id: 16081, por: "Revisaste por tu cuenta una coinversión", t: "El fondo quiere tu opinión",
      x: "Tu memo de tres días llegó al comité del fondo. Quieren que mires su próxima compra antes de cerrarla.",
      o: [
        { t: "Hacerlo como favor", d: { red: 4, ene: -3, msg: "Lo haces gratis. El fondo te debe una, y los fondos pagan sus deudas con tratos." } },
        { t: "Cobrarlo como asesoría", d: { cash: 3000, red: 1, msg: "Cobras. Te respetan un poco más y te quieren un poco menos." } },
      ] },
    { id: 16082, por: "Entraste en una coinversión confiando en el fondo", t: "La coinversión reparte ganancias",
      x: "Primera distribución, sin haber movido un dedo. La tentación es creer que esto siempre funciona así.",
      o: [
        { t: "Cobrar y guardar", d: { cash: 2500, cri: 2, msg: "Lo guardas. Te prometes leer el archivo la próxima vez. Casi te lo crees." } },
        { t: "Reinvertir todo en la próxima del fondo", d: { cash: 500, cri: -2, deja: "l6_atajo", msg: "Lo pones todo de nuevo, sin mirar. Confiar se vuelve costumbre muy rápido." } },
      ] },
    { id: 16083, por: "Entraste en una coinversión que salió mal", t: "La compañía pide más capital",
      x: "Necesita una ronda de rescate. Si no pones tu parte, tu participación queda reducida a casi nada.",
      o: [
        { t: "Poner tu parte", d: { cash: -3000, ene: -2, msg: "Pones más dinero en algo que ya perdió. Puede que sea valentía. Puede que no." } },
        { t: "No poner y aceptar la pérdida", d: { cri: 3, ene: -2, msg: "Dejas que se diluya. Duele una vez, en vez de muchas." } },
        { t: "Pedir el análisis antes de decidir", d: { cri: 3, red: -1, ene: -2, deja: "l6_metodo", msg: "Esta vez lees el archivo. Llega tarde, pero llega, y decides con datos." } },
      ] },
    { id: 16087, por: "Revisaste por tu cuenta una coinversión", t: "La compañía que revisaste sale en la prensa",
      x: "La compañía aparece en la prensa por una demanda laboral. Tu memo la mencionaba en una sola línea.",
      o: [
        { t: "Releer tu memo con calma", d: { cri: 2, msg: "La línea estaba ahí. La próxima vez, ese tipo de línea va en el primer párrafo." } },
        { t: "Avisarle al fondo de inmediato", d: { red: 2, rep: 2, ene: -1, msg: "Llamas antes de que lo lean. El fondo agradece enterarse por ti y no por el periódico." } },
      ] },
    { id: 16085, por: "Entraste a una coinversión sin revisarla", t: "La segunda también salió bien",
      x: "Otra distribución sin haber abierto el archivo. Ya ni recuerdas qué hace la compañía.",
      o: [
        { t: "Cobrar y prometerte leer la próxima", d: { cash: 3000, cri: 1, msg: "Cobras. La promesa la haces en voz baja, por si acaso." } },
        { t: "Contarlo en una cena como método", d: { cash: 3000, rep: -1, cri: -3, msg: "Lo cuentas como estrategia. Alguien en la mesa sí leyó el archivo y se ríe por dentro." } },
      ] },
    { id: 16086, por: "Entraste a una coinversión sin revisarla", t: "La segunda salió mal",
      x: "La compañía perdió a su principal cliente. Estaba en la página tres del archivo que no abriste.",
      o: [
        { t: "Abrir el archivo, por fin", d: { cri: 4, ene: -2, msg: "Lo lees entero. La página tres dice exactamente lo que pasó." } },
        { t: "Culpar al fondo", d: { red: -3, rep: -1, msg: "El fondo perdió más que tú y además sí lo leyó. La conversación no sale bien." } },
      ] },

    /* ===== Raíz 50: Una cláusula que nadie leyó ===== */
    { id: 16090, por: "Revisaste la cláusula de ajuste de precio", t: "El ajuste de precio llega al cierre",
      x: "Llega el cálculo del ajuste. La cláusula dice lo que tiene que decir y el otro lado intenta leerla a su manera.",
      o: [
        { t: "Defender la redacción, palabra por palabra", d: { rep: 3, cri: 2, ene: -2, msg: "Les lees su propia firma. Ceden. El cliente te mira como si hubieras hecho magia." } },
        { t: "Ceder un poco para cerrar en paz", d: { cash: -1000, red: 2, msg: "Cedes en un detalle. El otro lado se va contento y el cliente, casi." } },
      ] },
    { id: 16091, por: "Lidiaste con una cláusula de ajuste de precio", t: "Un junior quiere aprender a leer contratos",
      x: "Un analista nuevo te pregunta qué mirar primero en un contrato de compraventa. Alguien le contó lo de la cláusula.",
      o: [
        { t: "Enseñarle a leer la cláusula de precio", d: { red: 2, cri: 1, deja: "l6_maestro", msg: "Le muestras dónde se esconden los problemas. Encuentra uno en su primer contrato." } },
        { t: "Decirle que eso es cosa de abogados", d: { ene: 1, red: -1, msg: "Se queda con la duda. Ya sabes cómo termina eso." } },
      ] },
    { id: 16092, por: "Reescribiste una cláusula que nadie había leído", t: "El cliente te manda todos sus contratos",
      x: "Al cliente le gustó que leyeras la letra chica. Ahora te manda su carpeta entera, con contratos de hace años.",
      o: [
        { t: "Cobrarlo como trabajo aparte", d: { cash: 3000, ene: -2, msg: "Revisas la carpeta y encuentras dos problemas más. El cliente paga contento." } },
        { t: "Hacerlo como cortesía", d: { red: 3, ene: -4, msg: "Lo haces sin cobrar. El cliente lo cuenta en todos lados, que es otra forma de cobrar." } },
        { t: "Recomendarle un buen abogado", d: { red: 1, ene: 1, msg: "Le das un nombre. Tú no eres abogado y eso también es leer bien." } },
      ] },
    { id: 16093, por: "Firmaste una cláusula sin revisarla", t: "La cláusula vuelve a aparecer",
      x: "El mismo modelo de contrato llega en otro trato. Mismo texto, misma tentación de firmar sin leer.",
      o: [
        { t: "Esta vez leerla entera", d: { cri: 3, ene: -1, msg: "La lees. Encuentras una coma que cambia todo. Esta vez sí la ves." } },
        { t: "Firmar: ya funcionó una vez", d: { cri: -3, ene: 1, deja: "l6_atajo", msg: "Firmas. La costumbre se construye así, una vez que funcionó a la vez.",
          luego: [{ en: 1, azar: [{ p: 40, id: 16095, bueno: true }, { p: 60, id: 16096, bueno: false }] }] } },
      ] },
    { id: 16094, por: "Firmaste una cláusula que salió en contra del cliente", t: "El cliente pide explicaciones",
      x: "El cliente perdió dinero por el ajuste y quiere saber quién revisó ese texto. La respuesta eres tú.",
      o: [
        { t: "Asumirlo y descontar tus honorarios", d: { cash: -3000, rep: 2, deja: "l6_honesto", msg: "Lo asumes por escrito y pagas parte del daño. El cliente se queda, más vigilante." } },
        { t: "Culpar a los abogados del otro lado", d: { rep: -4, red: -2, msg: "El cliente no compra la excusa. El otro lado, cuando se entera, tampoco." } },
        { t: "Ofrecer trabajo gratis en el próximo trato", d: { cash: -1500, red: 2, ene: -3, msg: "Te da otra oportunidad. Esta vez lees todo, hasta los anexos." } },
      ] },
    { id: 16095, por: "Firmaste otra cláusula sin leerla", t: "Tampoco pasó nada esta vez",
      x: "El segundo trato cerró sin problemas. Ahora tienes dos casos que prueban que leer es opcional.",
      o: [
        { t: "Leer la siguiente igual", d: { cri: 3, msg: "Dos casos no son una regla. Lo sabes y por eso lees." } },
        { t: "Contarlo como eficiencia", d: { cri: -3, rep: -1, msg: "Lo cuentas en la oficina. Un abogado te escucha y guarda tu nombre." } },
      ] },
    { id: 16096, por: "Firmaste otra cláusula sin leerla", t: "La segunda firma te costó",
      x: "La coma que no viste cambió el reparto del ajuste. El cliente lo descubre antes que tú.",
      o: [
        { t: "Pagar el daño y cambiar tu método", d: { cash: -3500, cri: 4, msg: "Pagas y cambias. Desde hoy, ningún contrato se firma sin que lo leas en voz alta." } },
        { t: "Negociar con el otro lado una salida", d: { cash: -1500, red: -1, ene: -3, msg: "Consigues un arreglo a medias. Te cuesta menos dinero y más noches." } },
      ] },

    /* ===== Raíz 51: El modelo se rompió ===== */
    { id: 16100, por: "Escribiste un script para rehacer un modelo", t: "Tres equipos quieren tu script",
      x: "Aunque te costó, el script quedó en una carpeta compartida. Tres equipos lo encontraron y quieren usarlo.",
      o: [
        { t: "Documentarlo y compartirlo bien", d: { rep: 4, red: 3, ene: -3, deja: "l6_automatizaste", msg: "Escribes instrucciones claras. Los tres equipos lo usan y uno lo mejora." } },
        { t: "Correrlo tú para cada equipo", d: { red: 2, ene: -5, msg: "Te vuelves el único que sabe usarlo. Indispensable y agotado." } },
        { t: "Guardártelo", d: { mod: 2, red: -3, msg: "Lo mueves a tu carpeta privada. Los tres equipos lo notan y no lo olvidan." } },
      ] },
    { id: 16101, por: "Reconstruiste un modelo roto antes de la entrega", t: "El cliente quiere el modelo para él",
      x: "El cliente quiere quedarse con el modelo y actualizarlo por su cuenta. Necesita que alguien le explique cómo funciona.",
      o: [
        { t: "Darle una sesión de entrega", d: { red: 3, rep: 2, ene: -2, msg: "Dos horas con su equipo. Ahora llaman a tu modelo por tu nombre." } },
        { t: "Mandarlo con una nota corta", d: { ene: 1, rep: -1, msg: "La nota es clara para ti. Al mes te llaman porque lo rompieron." } },
      ] },
    { id: 16102, empleado: true, por: "Rehiciste un modelo a mano en catorce horas", t: "Te ganaste fama de aguantar",
      x: "Desde aquella noche, cada modelo roto termina en tu escritorio. Nadie pregunta si tienes tiempo.",
      o: [
        { t: "Aprender a automatizar la reconstrucción", d: { mod: 4, ene: -2, deja: "l6_automatizaste", msg: "Dedicas tres fines de semana a aprender. El siguiente modelo roto te toma una hora." } },
        { t: "Decir que no la próxima vez", d: { ene: 3, red: -1, msg: "Dices que no. El modelo roto encuentra otro escritorio y tú recuperas tus noches." } },
        { t: "Aceptarlo: es tu ventaja", d: { rep: 2, car: 1, ene: -5, msg: "Te vuelves el que arregla todo. Te ascienden en confianza y no en sueldo." } },
      ] },
    { id: 16103, por: "Entregaste la versión vieja de un modelo", t: "Alguien comparó las versiones",
      x: "Un analista del cliente cruzó el modelo con el de hace un mes. Son idénticos, incluyendo el error.",
      o: [
        { t: "Reconocerlo y mandar la correcta", d: { rep: -2, cri: 2, ene: -3, deja: "l6_honesto", msg: "Lo admites y mandas la buena esa misma noche. El cliente te perdona y lo anota." } },
        { t: "Decir que fue un error de archivo", d: { rep: -1, ene: 1, msg: "Dices que adjuntaste el archivo equivocado. Técnicamente cierto. El cliente lo duda.",
          luego: [{ en: 1, azar: [{ p: 45, id: 16105 }, { p: 55, id: 16106 }] }] } },
      ] },
    { id: 16104, por: "Entregaste la versión vieja de un modelo", t: "Nadie comparó nada",
      x: "Pasaron meses y nadie notó nada. El trato cerró con los números viejos y el error adentro.",
      o: [
        { t: "Corregirlo en silencio por si acaso", d: { mod: 2, cri: 2, ene: -2, msg: "Lo arreglas y lo guardas. Si alguien pregunta, ya está la versión buena." } },
        { t: "Olvidarlo: salió bien", d: { cri: -2, ene: 1, msg: "Lo olvidas. El error no." } },
      ] },
    { id: 16105, por: "Dijiste que el modelo viejo fue un error de archivo", t: "El cliente te creyó",
      x: "El cliente acepta la explicación y sigue trabajando contigo. Tú sabes lo que pasó y él no.",
      o: [
        { t: "Revisar dos veces todo lo que entregas", d: { cri: 3, ene: -2, msg: "Desde entonces revisas cada archivo antes de mandarlo. Es tu penitencia privada." } },
        { t: "Seguir como si nada", d: { cri: -2, ene: 1, msg: "Sigues igual. La excusa funcionó una vez, que es lo que tienen las excusas." } },
      ] },
    { id: 16106, por: "Dijiste que el modelo viejo fue un error de archivo", t: "El cliente pidió el historial",
      x: "El cliente pide el historial de cambios del archivo. Muestra que nadie lo tocó en un mes.",
      o: [
        { t: "Contar la verdad completa", d: { rep: -3, cri: 2, deja: "l6_honesto", msg: "Lo cuentas todo. Llega tarde, pero llega. El cliente se queda, con condiciones." } },
        { t: "Ofrecer rehacer el modelo sin cobrar", d: { cash: -2500, rep: -2, ene: -3, msg: "Lo rehaces gratis. El cliente acepta el modelo y no la explicación." } },
      ] },

    /* ===== Raíz 52: Cierre contable de la compañía objetivo ===== */
    { id: 16110, por: "Valoraste una compañía con un cierre dudoso", t: "El vendedor vuelve con otra empresa",
      x: "El mismo vendedor tiene otra empresa a la venta. Sus estados vienen con ajustes de último minuto, otra vez.",
      o: [
        { t: "Revisar cada ajuste desde el primer día", d: { cri: 3, rep: 1, ene: -3, deja: "l6_metodo", msg: "Empiezas por los ajustes, no por el resumen. El vendedor lo nota y ya no intenta tanto." } },
        { t: "Pedir auditados antes de hablar", d: { cri: 2, red: -1, msg: "El vendedor se queja, pero los manda. Esta vez solo tardan dos semanas." } },
        { t: "Aceptar los números: ya conoces al vendedor", d: { cri: -3, cash: 1500, deja: "l6_atajo",
          msg: "Trabajas con lo que te dieron. Conocer a alguien no es lo mismo que conocer sus números.",
          luego: [{ en: 1, azar: [{ p: 40, id: 16115, bueno: true }, { p: 60, id: 16116, bueno: false }] }] } },
      ] },
    { id: 16111, por: "Pediste estados auditados antes de valorar", t: "Los auditados confirman tus dudas",
      x: "Llegaron un mes tarde y con la mitad de los ajustes eliminados. El EBITDA real es bastante menor.",
      o: [
        { t: "Renegociar el precio con los auditados en la mano", d: { rep: 3, cash: 2000, msg: "Bajas la oferta con papeles. El vendedor no tiene cómo discutir y firma." } },
        { t: "Mantener la oferta para no perder el trato", d: { red: 2, cri: -3, msg: "Pagas por números que ya sabes que no son. El vendedor no lo puede creer." } },
      ] },
    { id: 16112, por: "Cuestionaste los ajustes de un cierre contable", t: "Otro comprador cerró antes",
      x: "Mientras revisabas, otro comprador ofreció sin preguntar tanto. El vendedor firmó con él.",
      o: [
        { t: "Esperar a ver cómo le va", d: { cri: 2, ene: 1, msg: "Esperas. Un año después, el otro comprador está en los periódicos y no por buenas razones." } },
        { t: "Llamar al vendedor por si se cae", d: { red: 2, ene: -1, msg: "Le dejas tu número. Si se cae, eres el primero en saberlo." } },
      ] },
    { id: 16113, por: "Valoraste con el EBITDA ajustado que te dieron", t: "Los ajustes aguantaron",
      x: "La revisión a fondo confirmó los ajustes. Nadie sabe que no los miraste, salvo tú.",
      o: [
        { t: "Revisarlos ahora, para aprender", d: { cri: 3, ene: -2, deja: "l6_metodo", msg: "Los revisas uno por uno, ya sin presión. Dos eran legítimos por poco." } },
        { t: "Contar que los revisaste a fondo", d: { rep: 2, cri: -2, msg: "Lo dices en la reunión. Nadie te contradice. Tú sí, por dentro." } },
      ] },
    { id: 16114, por: "Valoraste sobre un EBITDA que resultó ser humo", t: "La valoración se cayó en la revisión",
      x: "El comprador descubrió que los ajustes eran humo. Pregunta quién validó el número que le presentaste.",
      o: [
        { t: "Decir que fuiste tú y rehacerla", d: { rep: -1, cri: 3, ene: -4, deja: "l6_honesto", msg: "Lo asumes y rehaces todo en una semana. El comprador sigue, desconfiado." } },
        { t: "Señalar al vendedor que dio los números", d: { rep: -3, red: -2, msg: "El vendedor los dio. Tú los firmaste. El comprador recuerda la segunda parte." } },
        { t: "Ofrecer rehacerla sin cobrar", d: { cash: -2500, rep: 2, ene: -2, msg: "Pagas la lección con tu tiempo. El comprador lo aprecia y lo cuenta." } },
      ] },
    { id: 16115, por: "Aceptaste los números de un vendedor conocido", t: "El vendedor cumplió",
      x: "Los ajustes eran legítimos y el trato cerró rápido. Ahora tu equipo cree que siempre se puede trabajar así.",
      o: [
        { t: "Explicarles que fue suerte", d: { cri: 3, red: 1, msg: "Les muestras los dos ajustes que pudieron salir mal. Te escuchan a medias." } },
        { t: "Celebrar la velocidad", d: { cash: 1500, cri: -2, msg: "Brindan por el trato más rápido del año. La velocidad, a veces, es solo falta de frenos." } },
      ] },
    { id: 16116, por: "Aceptaste los números de un vendedor conocido", t: "Los ajustes eran humo otra vez",
      x: "La revisión a fondo encontró los mismos trucos de la primera vez. Esta vez no hay excusa de que no lo conocías.",
      o: [
        { t: "Retirarte del trato a tiempo", d: { cash: -1500, cri: 4, msg: "Te retiras antes de firmar. Pierdes lo gastado y conservas lo demás." } },
        { t: "Seguir y ajustar el precio a última hora", d: { cash: -3000, rep: -3, deja: "l6_humo", msg: "Bajas el precio a última hora. El vendedor se ofende, el comprador desconfía y el trato cierra cojo." } },
      ] },

    /* ===== Raíz 53: La pregunta de macro en la entrevista ===== */
    { id: 16120, por: "Respondiste la pregunta de macro en una entrevista", t: "El entrevistador te escribe",
      x: "Meses después de aquella entrevista, el entrevistador te escribe. Quiere tu opinión sobre el tipo de cambio para un informe.",
      o: [
        { t: "Mandarle un análisis cuidado", d: { red: 4, mod: 2, ene: -2, msg: "Le mandas tres páginas con gráficos. Te contesta en una línea: gracias, lo uso.",
          luego: [{ en: 1, azar: [{ p: 55, id: 16125, bueno: true }, { p: 45, id: 16126, bueno: false }] }] } },
        { t: "Contestar en dos líneas", d: { red: 1, ene: 1, msg: "Dos líneas precisas. Le sirven y no te cuestan nada." } },
        { t: "Pedirle que te cite si lo usa", d: { rep: 2, red: -1, msg: "Acepta, un poco sorprendido de que lo pidieras. Te cita en una nota al pie." } },
      ] },
    { id: 16121, por: "Diste tu lectura del tipo de cambio en una entrevista", t: "La moneda hizo lo que dijiste",
      x: "El banco central subió tasas, el déficit siguió y la moneda se movió como dijiste en la entrevista. O casi.",
      o: [
        { t: "Escribir una nota explicándolo", d: { rep: 3, red: 2, ene: -1, msg: "La publicas con tu nombre. Te leen más de los que esperabas, y algunos de los que importan." } },
        { t: "Guardarte la satisfacción", d: { cri: 2, ene: 1, msg: "No dices nada. Acertar en silencio también entrena." } },
      ] },
    { id: 16122, por: "Diste tu lectura del tipo de cambio en una entrevista", t: "La moneda te contradijo",
      x: "Pasó justo lo contrario de lo que dijiste. Había un factor que nadie mencionó en aquella sala.",
      o: [
        { t: "Estudiar qué se te escapó", d: { cri: 4, mod: 2, ene: -2, msg: "Lo encuentras: el petróleo. Lo anotas en la primera página de tu cuaderno." } },
        { t: "Decir que el marco era correcto y el mercado no", d: { cri: -2, ene: 1, msg: "El mercado no se entera de que estaba equivocado. Tú tampoco." } },
      ] },
    { id: 16123, por: "Admitiste en una entrevista que no lo tenías claro", t: "Te ganaste fama de honesto",
      x: "Uno de los entrevistadores cuenta la anécdota en otra firma. Dice que fuiste el único que no inventó.",
      o: [
        { t: "Estudiar el tema para la próxima", d: { cri: 3, mod: 2, ene: -2, msg: "Te armas el marco que te faltó. La próxima vez no tendrás que admitir nada." } },
        { t: "Usar la anécdota a tu favor", d: { rep: 2, red: 2, msg: "La cuentas tú también, con humor. Funciona mejor que cualquier respuesta brillante." } },
      ] },
    { id: 16124, por: "Te hicieron la pregunta de macro en una entrevista", t: "Otra vez la misma pregunta",
      x: "Otra entrevista, otra sala, la misma pregunta de tasas y déficit. Parece la pregunta favorita de todos.",
      o: [
        { t: "Contestar con el marco y con calle", d: { cri: 2, rep: 2, msg: "Juntas teoría e intuición. El entrevistador deja de tomar notas y te escucha." } },
        { t: "Decir lo que no sabes y cómo lo averiguarías", d: { rep: 2, cri: 1, deja: "l6_honesto", msg: "Explicas qué datos buscarías y dónde. Al entrevistador le interesa más eso que una respuesta." } },
        { t: "Recitar lo que dijiste la vez pasada", d: { cri: -1, ene: 1, msg: "Lo recitas de memoria. Suena a memoria." } },
      ] },
    { id: 16125, por: "Le mandaste tu análisis al entrevistador", t: "Tu análisis salió con tu nombre",
      x: "El informe sale publicado y tu nombre aparece en los agradecimientos. Te escriben dos personas que no conocías.",
      o: [
        { t: "Contestar a las dos", d: { red: 4, ene: -1, msg: "Una de ellas te invita a un panel. La otra solo quería tu correo para venderte algo." } },
        { t: "Agradecer al entrevistador", d: { red: 2, rep: 1, msg: "Le escribes para darle las gracias. Ahora te cuenta entre sus contactos de confianza." } },
      ] },
    { id: 16126, por: "Le mandaste tu análisis al entrevistador", t: "Tu análisis salió sin tu nombre",
      x: "El informe sale publicado con tus gráficos y sin tu nombre. Ni en los agradecimientos.",
      o: [
        { t: "Escribirle con educación", d: { rep: 1, red: -1, msg: "Le recuerdas, amable, de dónde salieron los gráficos. Se disculpa y te cita en la versión corregida." } },
        { t: "Dejarlo pasar y no volver a mandarle nada", d: { cri: 2, red: -2, msg: "Aprendes a quién mandarle tu trabajo. La lección salió gratis, aunque no lo parezca." } },
      ] },
  ],

  raices: {
    /* Corrección fuerte en la pantalla */
    "30": {
      "0": { deja: "l6_aguantaste_caida", luego: [{ en: 1, s: "cri", azar: [{ p: 40, id: 16001, bueno: true }, { p: 30, id: 16000, bueno: false }, { p: 15, id: 16003 }, { p: 15, id: 16004 }] }] },
      "1": { deja: "l6_aguantaste_caida", luego: [{ en: 1, azar: [{ p: 45, id: 16001 }, { p: 35, id: 16000 }, { p: 20, id: 16003 }] }] },
      "2": { deja: "l6_vendiste_caida", luego: [{ en: 1, azar: [{ p: 50, id: 16002 }, { p: 30, id: 16000 }, { p: 20, id: 16003 }] }] },
    },
    /* Un fondo pide condiciones aparte */
    "31": {
      "0": { deja: "l6_trato_parejo", luego: [{ en: 2, azar: [{ p: 35, id: 16010 }, { p: 25, id: 16013 }, { p: 25, id: 16012 }, { p: 15, id: 16014 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 40, id: 16011 }, { p: 20, id: 16010 }, { p: 20, id: 16012 }, { p: 20, id: 16014 }] }] },
    },
    /* Te piden explicar la cascada */
    "32": {
      "0": { deja: "l6_maestro", luego: [{ en: 1, s: "rep", azar: [{ p: 30, id: 16020, bueno: true }, { p: 25, id: 16022, bueno: true }, { p: 25, id: 16021, bueno: false }, { p: 20, id: 16024 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 45, id: 16023 }, { p: 40, id: 16021 }, { p: 15, id: 16020 }] }] },
    },
    /* Dos ofertas sobre la mesa */
    "33": {
      "0": { deja: "l6_metodo", luego: [{ en: 2, s: "cri", azar: [{ p: 40, id: 16031, bueno: true }, { p: 30, id: 16030 }, { p: 30, id: 16032, bueno: false }] }] },
      "1": {
        ok: { luego: [{ en: 2, azar: [{ p: 45, id: 16030 }, { p: 25, id: 16031 }, { p: 30, id: 16032 }] }] },
        no: { luego: [{ en: 1, azar: [{ p: 55, id: 16033 }, { p: 45, id: 16034 }] }] },
      },
    },
    /* Alguien de la mesa te pregunta qué harías */
    "34": {
      "0": { luego: [{ en: 1, azar: [{ p: 40, id: 16040 }, { p: 35, id: 16041 }, { p: 25, id: 16044 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 40, id: 16042 }, { p: 35, id: 16043 }, { p: 25, id: 16041 }] }] },
    },
    /* Una sesión larga frente a la pantalla */
    "40": {
      "0": { luego: [{ en: 1, azar: [{ p: 45, id: 16050 }, { p: 35, id: 16051 }, { p: 20, id: 16054 }] }] },
      "1": { luego: [{ en: 2, azar: [{ p: 40, id: 16052 }, { p: 30, id: 16053 }, { p: 30, id: 16051 }] }] },
    },
    /* Un cliente quiere comprar apalancado */
    "41": {
      "0": { luego: [{ en: 2, s: "mod", azar: [{ p: 35, id: 16061, bueno: true }, { p: 35, id: 16060, bueno: false }, { p: 30, id: 16064 }] }] },
      "1": { luego: [{ en: 2, azar: [{ p: 50, id: 16062 }, { p: 30, id: 16063 }, { p: 20, id: 16064 }] }] },
    },
    /* Ocho hallazgos sobre la mesa */
    "42": {
      "0": { luego: [{ en: 1, s: "cri", azar: [{ p: 45, id: 16071, bueno: true }, { p: 30, id: 16070, bueno: false }, { p: 25, id: 16074 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 45, id: 16072 }, { p: 30, id: 16073 }, { p: 25, id: 16074 }] }] },
    },
    /* Te ofrecen invertir junto a un fondo */
    "43": {
      "0": { deja: "l6_metodo", luego: [{ en: 2, azar: [{ p: 40, id: 16080 }, { p: 35, id: 16081 }, { p: 25, id: 16087 }] }] },
      "1": {
        ok: { luego: [{ en: 1, azar: [{ p: 60, id: 16082 }, { p: 40, id: 16080 }] }] },
        no: { luego: [{ en: 1, azar: [{ p: 65, id: 16083 }, { p: 35, id: 16080 }] }] },
      },
    },
    /* Una cláusula que nadie leyó */
    "50": {
      "0": { luego: [{ en: 1, azar: [{ p: 50, id: 16090 }, { p: 30, id: 16092 }, { p: 20, id: 16091 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 60, id: 16090 }, { p: 40, id: 16091 }] }] },
      "2": {
        ok: { luego: [{ en: 1, azar: [{ p: 65, id: 16093 }, { p: 35, id: 16091 }] }] },
        no: { deja: "l6_atajo", luego: [{ en: 1, azar: [{ p: 75, id: 16094 }, { p: 25, id: 16091 }] }] },
      },
    },
    /* El modelo se rompió */
    "51": {
      "0": { luego: [{ en: 1, azar: [{ p: 55, id: 16100 }, { p: 45, id: 16101 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 55, id: 16102 }, { p: 45, id: 16101 }] }] },
      "2": { deja: "l6_version_vieja", luego: [{ en: 1, azar: [{ p: 55, id: 16103 }, { p: 45, id: 16104 }] }] },
    },
    /* Cierre contable de la compañía objetivo */
    "52": {
      "0": { deja: "l6_metodo", luego: [{ en: 2, azar: [{ p: 55, id: 16110 }, { p: 45, id: 16112 }] }] },
      "1": { luego: [{ en: 1, azar: [{ p: 50, id: 16111 }, { p: 30, id: 16112 }, { p: 20, id: 16110 }] }] },
      "2": {
        ok: { luego: [{ en: 1, azar: [{ p: 60, id: 16113 }, { p: 40, id: 16110 }] }] },
        no: { deja: "l6_humo", luego: [{ en: 1, azar: [{ p: 70, id: 16114 }, { p: 30, id: 16110 }] }] },
      },
    },
    /* La pregunta de macro en la entrevista */
    "53": {
      "0": { luego: [{ en: 1, s: "cri", azar: [{ p: 35, id: 16121, bueno: true }, { p: 25, id: 16122, bueno: false }, { p: 20, id: 16120 }, { p: 20, id: 16124 }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 30, id: 16121, bueno: true }, { p: 35, id: 16122, bueno: false }, { p: 20, id: 16124 }, { p: 15, id: 16120 }] }] },
      "2": { deja: "l6_honesto", luego: [{ en: 1, azar: [{ p: 45, id: 16123 }, { p: 30, id: 16124 }, { p: 25, id: 16120 }] }] },
    },
  },

  finales: [
    { id: "l6_mano_firme", huellas: ["l6_aguantaste_caida", "l6_metodo"], t: "Mano firme",
      x: "Cuando el mercado se cayó, no vendiste. Cuando decidir era difícil, ordenaste los criterios antes de mirar precios. Nadie te aplaudió, y no te hizo falta." },
    { id: "l6_letra_chica", huellas: ["l6_atajo"], t: "La letra chica",
      x: "Firmaste sin leer más de una vez. A veces salió bien, y eso fue lo peor: te enseñó que se podía. La letra chica nunca se olvidó de ti." },
    { id: "l6_cuentas_claras", huellas: ["l6_honesto", "l6_maestro"], t: "Cuentas claras",
      x: "Explicaste lo que otros escondían en anexos y dijiste no sé cuando inventar era más fácil. La gente aprendió que contigo no hacía falta leer la letra chica." },
  ],
};
