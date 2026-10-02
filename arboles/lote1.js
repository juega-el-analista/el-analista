/* El Analista: lote 1 de árboles de consecuencias (decisiones clave 101 a 120).
   Ids 11000-11999. Cada raíz usa su decena: raíz 1NN -> 11NN0 a 11NN9.
   Todas las raíces son minijuegos o directas (no chequeos), así que el futuro
   está escrito para valer tanto si el minijuego salió bien como si salió mal. */
module.exports = {
  huellas: {
    l1_calzaste_precio: "Calzaste una valoración a lo que quería el comprador",
    l1_blindaste_modelo: "Blindaste un modelo de valoración celda por celda",
    l1_perito: "Tu modelo terminó citado en una sentencia",
    l1_legajo_completo: "Peinaste una due diligence completa, en orden",
    l1_atajo_dd: "Fuiste directo a los números que suelen fallar",
    l1_anclaste_alto: "Anclaste alto tus honorarios y cediste despacio",
    l1_cifra_unica: "Pusiste una sola cifra de honorarios y la sostuviste",
    l1_dejaste_correr: "Dejaste correr una ganadora que ya iba muy arriba",
    l1_saliste_tramos: "Saliste por tramos de una posición ganadora",
    l1_contraparte: "Llegaste a un comité de crédito con todo analizado",
    l1_de_memoria: "Respondiste un comité de crédito de memoria",
    l1_precio_firme: "Pusiste precio firme en la primera ronda de una subasta",
    l1_segunda_vuelta: "Guardaste munición para la segunda vuelta de una subasta",
    l1_ensayaste: "Ensayaste un pitch hasta tenerlo memorizado",
    l1_improvisaste: "Improvisaste un pitch sobre los números",
    l1_compraste_distressed: "Compraste un bono en problemas y lo aguantaste",
    l1_vendiste_tesis: "Le vendiste a un fondo tu tesis sobre un bono en problemas",
    l1_trazabilidad_memoria: "Reconstruiste de memoria una auditoría del regulador",
    l1_ordenaste_expedientes: "Ordenaste los expedientes antes de dárselos al regulador",
    l1_leiste_libro: "Fijaste el precio de una emisión leyendo el libro",
    l1_sondeaste_anclas: "Sondeaste a los inversores ancla uno por uno",
    l1_peso_ancla: "Le diste mucho peso al inversor ancla de tu fondo",
    l1_aguantaste_ronda: "Aguantaste la ronda de tu fondo hasta tener el tamaño",
    l1_dos_cierres: "Coordinaste dos cierres al minuto el mismo viernes",
    l1_delegaste: "Delegaste un cierre en tu asociado",
    l1_tesis_propia: "Reasignaste tu patrimonio con tesis propia",
    l1_indexado: "Indexaste tu patrimonio y no pensaste más",
    l1_examen_sin_red: "Entraste sin red al examen del director de un fondo",
    l1_cediste_jefe: "Le cediste a tu jefe la reunión con el fondo",
    l1_trabajo_paralelo: "Trabajaste para un fondo a espaldas de tu firma",
    l1_presentaste_examen: "Te presentaste al examen de idoneidad",
    l1_postergaste_licencia: "Postergaste tu examen de idoneidad",
    l1_licencia_propia: "Conseguiste licencia propia para firmar",
    l1_tesis_sector: "Defendiste una tesis sectorial con todo el rigor",
    l1_piloto: "Propusiste tu tesis como un piloto pequeño",
    l1_domino: "Jugaste en serio el dominó antes de un negocio",
    l1_directo_propuesta: "Fuiste directo a la propuesta con un empresario familiar",
    l1_pulso: "Le aguantaste el pulso a un comprador veterano",
    l1_proceso_competitivo: "Llevaste a un comprador estratégico a competir",
    l1_te_dejaste_leer: "Jugaste con el socio director y dejaste que te leyera",
    l1_track_record: "Recitaste tu historial en vez de jugar con el socio",
    l1_oficina_afuera: "Aceptaste montar la oficina de otro país",
    l1_te_quedaste: "Te quedaste a consolidar en vez de irte afuera",
    l1_galones: "Volviste con galones de la oficina de afuera",
  },

  escenas: [
    /* ===== 101 La cifra que va en la portada ===== */
    { id: 11010, por: "Pusiste la cifra en la portada de una venta", t: "La empresa se revendió por el doble",
      x: "La empresa que valoraste aquella vez acaba de venderse por el doble de tu número. Tu antiguo cliente te llama y pregunta qué se le escapó.",
      o: [
        { t: "Defender tu número con el contexto de entonces", d: { cri: 3, rep: 2, ene: -2, msg: "Le explicas tasas, ciclo y comparables de aquel año. Cuelga convencido a medias, que ya es algo." } },
        { t: "Admitir que te quedaste corto", d: { rep: -2, red: 3, cri: 2, msg: "Te agradece la franqueza. Dos semanas después te recomienda, con advertencia incluida." } },
        { t: "Culpar al mercado y cambiar de tema", d: { rep: -4, ene: 2, msg: "El mercado no se defiende, así que funciona. Tu antiguo cliente no vuelve a llamar." } },
      ] },
    { id: 11011, por: "Blindaste un modelo de valoración celda por celda", t: "Tu modelo anda suelto por la plaza",
      x: "Un analista de otra firma usa tu modelo de aquella venta como plantilla. Te escribe porque encontró una fórmula tuya que nadie logra descifrar.",
      o: [
        { t: "Explicarle la fórmula con paciencia", d: { red: 4, mod: 2, ene: -2, msg: "Una hora por videollamada. Al final te pregunta si buscas trabajo, que es el elogio del oficio." } },
        { t: "Cobrarle la explicación como consultoría", d: { cash: 2000, red: -1, msg: "Paga sin regatear. Tu fórmula ahora tiene precio y, de paso, dueño." } },
        { t: "Dejar el correo sin responder", d: { ene: 2, red: -2, msg: "Que sufra como sufriste tú. La fórmula sigue siendo un misterio, y tu nombre también." } },
      ] },
    { id: 11012, por: "Pusiste la cifra en la portada de una venta", t: "El cliente vuelve con otra empresa",
      x: "Aquel cliente quedó conforme con cómo se manejó la cifra y vuelve con otra empresa del grupo. Esta vez quiere tu nombre en la portada.",
      o: [
        { t: "Aceptar y usar el mismo método", d: { cash: 4000, car: 3, ene: -3, msg: "Mismo método, mismo cliente, menos sorpresas. La segunda portada sale más rápido que la primera." } },
        { t: "Aceptar y subir tus honorarios", d: { cash: 6000, rep: -1, red: -1, msg: "Acepta el precio con una mueca. Te paga más y te va a exigir el doble." } },
        { t: "Recomendarle a un colega", d: { red: 3, ene: 3, msg: "Le pasas el mandato a un colega. El colega te debe una y el cliente no entiende nada." } },
      ] },
    { id: 11013, por: "Pusiste la cifra en la portada de una venta", t: "Un minoritario impugna la valoración",
      x: "Un accionista minoritario de aquella empresa demanda: dice que la cifra se armó para complacer al comprador. Te citan a declarar.",
      o: [
        { t: "Llevar el modelo y explicar cada supuesto", d: { cri: 3, ene: -4, msg: "Preparas una carpeta de supuestos con sus fuentes. El juicio va a ser largo.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 11014, bueno: true }, { p: 50, id: 11015, bueno: false }] }] } },
        { t: "Contratar un abogado y decir lo mínimo", d: { cash: -3000, rep: -2, ene: 1, msg: "Tu abogado contesta todo con «no recuerdo». Cobra por hora, y eso sí lo recuerda perfectamente." } },
      ] },
    { id: 11014, por: "Defendiste tu valoración ante un juez", t: "El juez cita tu modelo en la sentencia",
      x: "La sentencia usa tus supuestos como referencia de valor razonable. Dos abogados de la plaza ya preguntaron cuánto cobras por un peritaje.",
      o: [
        { t: "Abrir una línea de peritajes", d: { cash: 5000, rep: 4, car: 2, ene: -3, deja: "l1_perito", msg: "Ahora te pagan por explicar números ante jueces. Lo mismo de siempre, pero con toga enfrente." } },
        { t: "Volver a lo tuyo sin hacer ruido", d: { rep: 2, ene: 3, msg: "Guardas la sentencia en una carpeta. De vez en cuando la abres, solo para ver tu nombre." } },
      ] },
    { id: 11015, por: "Defendiste tu valoración ante un juez", t: "El perito contrario lee una celda tuya",
      x: "El perito de la otra parte encontró la celda donde tu número se acerca demasiado al del comprador. La lee en voz alta, despacio.",
      o: [
        { t: "Reconocer el supuesto y defender el rango", d: { rep: -2, cri: 4, msg: "Admites que el supuesto era discutible y explicas por qué lo elegiste. El juez anota algo. No sabes qué." } },
        { t: "Sostener que fue criterio profesional", d: { rep: -5, ene: -2, msg: "Lo repites tres veces. A la tercera, hasta tu abogado mira el techo." } },
      ] },

    /* ===== 102 Tres días de due diligence ===== */
    { id: 11020, por: "Hiciste una due diligence de tres días", t: "Aparece lo que nadie revisó",
      x: "Un año después del cierre, el comprador encuentra un contrato que obliga a pagar una penalidad por cambio de dueño. Estaba en la sala de datos.",
      o: [
        { t: "Revisar tus notas y dar la cara", d: { cri: 3, ene: -3, msg: "Tus notas dicen que lo viste pasar y no lo abriste. Lo dices tal cual.",
          luego: [{ en: 1, s: "rep", azar: [{ p: 55, id: 11024, bueno: true }, { p: 45, id: 11025, bueno: false }] }] } },
        { t: "Recordar que el plazo era de tres días", d: { rep: -3, ene: 1, msg: "Es verdad y no sirve de nada. El comprador anota tu nombre en su lista de excusas." } },
      ] },
    { id: 11021, por: "Hiciste una due diligence de tres días", t: "Te quieren en una compra más grande",
      x: "Aquel comprador se quedó con la idea de que no se te escapa nada. Ahora te quiere en una compra mayor, con un mes entero para revisar.",
      o: [
        { t: "Aceptar y pedir un equipo", d: { car: 3, cash: 3000, ene: -3, msg: "Te dan dos analistas jóvenes. Les enseñas a leer contratos en orden, como un castigo útil." } },
        { t: "Aceptar y hacerlo solo", d: { cash: 5000, cri: 3, ene: -7, msg: "Un mes de contratos en soledad. Sabes más de esa empresa que su dueño, y duermes menos que él." } },
        { t: "Rechazarlo: un mes es demasiado", d: { ene: 3, red: -2, msg: "Te quedas con tus fines de semana. El comprador busca a otro y lo encuentra." } },
      ] },
    { id: 11022, por: "Fuiste directo a los números que suelen fallar", t: "Tu lista de atajos circula",
      x: "La lista de números que suelen fallar que armaste aquella semana circula entre analistas. Alguien la presentó como suya en un seminario.",
      o: [
        { t: "Reclamar la autoría en público", d: { rep: 2, red: -3, msg: "Publicas el archivo original con su fecha. Tienes razón, y ahora también un enemigo." } },
        { t: "Dejarlo: la lista ya hizo su trabajo", d: { red: 2, ene: 1, msg: "Que la use quien quiera. Lo que se pierde en crédito se gana en paz." } },
        { t: "Mejorarla y publicarla con tu firma", d: { mod: 3, rep: 3, ene: -3, msg: "La versión nueva trae diez trampas más. La copia del seminario queda vieja en una semana." } },
      ] },
    { id: 11023, por: "Hiciste una due diligence de tres días", t: "El vendedor quiere reabrir el acuerdo",
      x: "El vendedor de aquella empresa dice que la revisión fue una excusa para bajarle el precio. Quiere reabrir el acuerdo y te nombra en su carta.",
      o: [
        { t: "Mandar tus papeles de trabajo ordenados", d: { cri: 3, rep: 3, ene: -2, msg: "Cada hallazgo tiene su documento y su página. La carta del vendedor se queda sin argumentos." } },
        { t: "No responder nada sin abogado", d: { cash: -2000, ene: 1, rep: -1, msg: "El abogado responde por ti. Prudente, caro y con un ligero olor a culpa." } },
      ] },
    { id: 11024, por: "Diste la cara por un contrato que no abriste", t: "La penalidad se negocia a la mitad",
      x: "Tu franqueza cambió el tono. Comprador y vendedor se reparten la penalidad, y alguien sugiere que hagas tú la próxima revisión.",
      o: [
        { t: "Aceptar la próxima, pero con más días", d: { cash: 3000, rep: 3, cri: 2, msg: "Pides una semana en vez de tres días. Te la dan sin discutir." } },
        { t: "Pasar: ya aprendiste la lección", d: { ene: 2, rep: 1, msg: "Te quedas con la lección y sin el mandato. Hay lecciones más caras." } },
      ] },
    { id: 11025, por: "Diste la cara por un contrato que no abriste", t: "Te incluyen en la reclamación",
      x: "El comprador reclama a los asesores de aquella revisión y tu nombre aparece en la lista. Tu franqueza ahora está por escrito.",
      o: [
        { t: "Pagar tu parte y cerrar el tema", d: { cash: -5000, rep: -1, ene: 2, msg: "Pagas y firmas que no hubo culpa. Todos saben que la hubo, pero ya no importa." } },
        { t: "Pelearlo hasta el final", d: { cash: -2000, ene: -5, cri: 2, msg: "Ganas un año después, cansado y con abogado propio. Nadie te felicita." } },
      ] },

    /* ===== 103 Negociación de honorarios ===== */
    { id: 11030, por: "Negociaste tus honorarios con un cliente difícil", t: "El cliente suspende la venta",
      x: "A un mes de cerrar, el cliente decide no vender. Ocho meses de trabajo quedan en una carpeta y la factura depende de lo que firmaste.",
      o: [
        { t: "Cobrar todo lo pendiente del contrato", d: { cash: 3000, red: -3, msg: "Pagas el precio de tener razón: cobras, y el cliente pasa a saludarte solo con la cabeza." } },
        { t: "Perdonar la deuda a cambio del próximo mandato", d: { red: 3, ene: -1, msg: "Te da la mano y su palabra. Ninguna de las dos se deposita.",
          luego: [{ en: 2, s: "red", azar: [{ p: 55, id: 11034, bueno: true }, { p: 45, id: 11035, bueno: false }] }] } },
      ] },
    { id: 11031, por: "Negociaste tus honorarios con un cliente difícil", t: "El cliente cuenta cómo negociaste",
      x: "El cliente les contó a otros empresarios cómo cerraste los honorarios. Dos te llaman queriendo lo mismo, pero más barato.",
      o: [
        { t: "Mantener tus condiciones", d: { rep: 3, cash: 2000, msg: "Uno acepta y el otro se va. El que se quedó paga sin chistar." } },
        { t: "Hacerles precio por volumen", d: { cash: 4000, rep: -2, ene: -4, msg: "Dos mandatos a precio de uno y medio. Trabajas el doble y te sientes generoso, que no es lo mismo." } },
      ] },
    { id: 11032, por: "Negociaste tus honorarios con un cliente difícil", t: "Una firma nueva cobra solo por éxito",
      x: "Una firma recién llegada ofrece hacer lo mismo sin cobrar cuota fija. Tu cliente de entonces te reenvía la propuesta sin comentario.",
      o: [
        { t: "Igualar la oferta", d: { cash: -2000, red: 2, ene: -2, msg: "Lo retienes, pero ya sabe que tu precio era negociable. Lo va a recordar en cada factura." } },
        { t: "Explicar por qué vale lo que cobras", d: { cri: 2, rep: 2, msg: "Le muestras lo que haces en los meses en que no pasa nada. Se queda y deja de reenviar propuestas." } },
        { t: "Dejar que se vaya", d: { ene: 2, red: -3, msg: "Se va con la firma nueva. Seis meses después, la firma nueva ya no existe." } },
      ] },
    { id: 11033, por: "Negociaste tus honorarios con un cliente difícil", t: "Cierras antes de lo previsto",
      x: "La operación cierra en cuatro meses y no en ocho. El cliente pregunta si lo que te paga se ajusta, ya que trabajaste la mitad.",
      o: [
        { t: "Cobrar lo firmado", d: { cash: 4000, red: -2, msg: "Le recuerdas que paga por el resultado, no por las horas. Paga, con cara de estar haciendo cuentas." } },
        { t: "Devolver una parte", d: { cash: -1500, rep: 5, red: 3, msg: "Nadie devuelve nada en este negocio. Por eso lo cuentan en todas partes." } },
      ] },
    { id: 11034, por: "Le perdonaste una deuda a un cliente", t: "El cliente cumple su palabra",
      x: "El cliente al que le perdonaste aquella cuenta vuelve con una venta más grande. Esta vez firma la cuota fija sin que se la pidas.",
      o: [
        { t: "Tomarlo y cobrar lo justo", d: { cash: 8000, red: 3, rep: 2, msg: "Lo justo, a tiempo y sin discusión. Hay deudas que rinden intereses en confianza." } },
        { t: "Tomarlo y recuperar lo perdonado", d: { cash: 11000, red: -2, msg: "Le cargas lo de antes en la factura nueva. Lo nota, paga y deja de contarte chistes." } },
      ] },
    { id: 11035, por: "Le perdonaste una deuda a un cliente", t: "El cliente contrató a otro",
      x: "Te enteras por el periódico: el cliente al que le perdonaste la deuda vende otra empresa con otro asesor. No te llamó ni para avisar.",
      o: [
        { t: "Llamarlo y recordarle el trato", d: { red: -2, rep: 1, msg: "Dice que fue una decisión del directorio. Los directorios sirven para eso." } },
        { t: "Tomarlo como una lección cara", d: { cri: 3, ene: -1, msg: "Desde hoy las promesas van en el contrato. Las de palabra las cobras en abrazos." } },
      ] },

    /* ===== 104 La posición que ya dio mucho ===== */
    { id: 11040, por: "Decidiste qué hacer con una posición ganadora", t: "La acción siguió subiendo",
      x: "Aquella posición siguió subiendo y hoy vale el doble que cuando dudabas. Un amigo te pregunta en una cena si todavía la tienes.",
      o: [
        { t: "Comprar más, ahora más caro", d: { cri: -1, msg: "Compras arriba con la fe del converso. El gráfico, como siempre, no opina.",
          luego: [{ en: 1, azar: [{ p: 45, id: 11044 }, { p: 55, id: 11045 }] }] } },
        { t: "Contar la historia sin amargura", d: { cri: 3, ene: 2, msg: "Cuentas qué decidiste y por qué. Tu amigo quería un chisme y le diste una clase." } },
        { t: "Cambiar de tema y pedir el postre", d: { ene: 1, msg: "Hay preguntas que se contestan mejor con flan." } },
      ] },
    { id: 11041, por: "Decidiste qué hacer con una posición ganadora", t: "La empresa admite cifras infladas",
      x: "La empresa de aquella posición admite que infló sus ingresos. La acción abre a la mitad y los foros de inversores arden desde temprano.",
      o: [
        { t: "Vender lo que quede en la apertura", d: { cash: -2000, cri: 2, ene: -1, msg: "Sales con pérdida y sin mirar atrás. Lo que no vendiste antes, hoy lo vendes peor." } },
        { t: "Comprar más en la caída", d: { msg: "Compras cuando todos venden. Puede ser coraje o terquedad; el mercado avisará cuál.",
          luego: [{ en: 1, azar: [{ p: 35, id: 11044 }, { p: 65, id: 11045 }] }] } },
        { t: "Esperar el informe completo", d: { cri: 2, ene: -2, msg: "Lees el informe de la auditoría entero. Es peor de lo que decían y mejor de lo que temías." } },
      ] },
    { id: 11042, por: "Dejaste correr una ganadora que ya iba muy arriba", t: "Un dividendo que no esperabas",
      x: "La empresa de aquella posición vende una división y reparte la caja entre sus accionistas. Te llega un pago por lo que todavía conservas.",
      o: [
        { t: "Reinvertirlo en la misma acción", d: { cash: 1000, mod: 2, msg: "El dinero vuelve a donde salió. La empresa ahora es más chica y tú, más fiel." } },
        { t: "Sacarlo y darte un gusto", d: { cash: 3000, ene: 4, msg: "Un viaje corto pagado por la contabilidad ajena. El mejor rendimiento del año." } },
      ] },
    { id: 11043, por: "Saliste por tramos de una posición ganadora", t: "Quieren que cuentes tu método",
      x: "Un medio pequeño de finanzas quiere entrevistarte sobre cómo sales de las posiciones ganadoras. Alguien les contó lo de aquella venta por tramos.",
      o: [
        { t: "Dar la entrevista con cifras", d: { rep: 3, red: 3, ene: -1, msg: "La entrevista circula. Te escriben tres desconocidos para pedirte consejo y uno para venderte un curso." } },
        { t: "Darla, pero sin hablar de tu dinero", d: { rep: 2, cri: 2, msg: "Hablas de método, no de montos. Sale más aburrida y más seria." } },
        { t: "Declinar con amabilidad", d: { ene: 1, msg: "Tu dinero sigue siendo asunto tuyo. Raro en estos tiempos." } },
      ] },
    { id: 11044, por: "Le metiste más dinero a la misma acción", t: "La apuesta de vuelta funciona",
      x: "Lo que compraste de nuevo rinde bien. No fue el doble, pero alcanzó para que dejes de pensar en lo que vendiste.",
      o: [
        { t: "Tomar la ganancia esta vez", d: { cash: 5000, cri: 3, msg: "Vendes con calma. Aprendiste que la segunda vez se sale antes." } },
        { t: "Seguir dentro, ya sin miedo", d: { cash: 2000, cri: -2, rep: 1, msg: "Te quedas. Tu confianza crece más rápido que la acción." } },
      ] },
    { id: 11045, por: "Le metiste más dinero a la misma acción", t: "La apuesta de vuelta se tuerce",
      x: "Lo que compraste de nuevo cae por debajo de tu precio. El gráfico tiene la forma exacta de tu exceso de confianza.",
      o: [
        { t: "Cortar la pérdida ya", d: { cash: -3000, cri: 3, msg: "Vendes con pérdida. Duele menos que mirarla bajar otro mes." } },
        { t: "Promediar a la baja una vez más", d: { cash: -5000, cri: -2, ene: -3, msg: "Compras más abajo. Ahora tienes más acciones y la misma duda." } },
      ] },

    /* ===== 105 Comité de crédito ===== */
    { id: 11050, por: "Presentaste una estructura ante el comité", t: "El deudor grande deja de pagar",
      x: "El mayor deudor de aquella cartera de facturas entra en atraso. El comité quiere saber quién aprobó tanta exposición a un solo nombre.",
      o: [
        { t: "Mostrar las condiciones que se pusieron", d: { cri: 3, rep: 2, ene: -2, msg: "Las condiciones estaban en el acta. Alguien no las cumplió, y no fuiste tú." } },
        { t: "Proponer reestructurar con el deudor", d: { red: 2, ene: -3, msg: "Te sientas con el deudor y su contador. Hay plan; falta saber si hay caja.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 11054, bueno: true }, { p: 50, id: 11055, bueno: false }] }] } },
      ] },
    { id: 11051, por: "Presentaste una estructura ante el comité", t: "Tu estructura se vuelve plantilla",
      x: "La estructura que presentaste aquel día ya se usa en otras tres operaciones del sector. Te piden que la dejes documentada para el resto.",
      o: [
        { t: "Documentarla bien", d: { mod: 3, rep: 3, ene: -3, msg: "Treinta páginas claras. Dentro de unos años alguien la va a copiar sin saber de quién es." } },
        { t: "Hacer un resumen de dos páginas", d: { ene: 2, rep: 1, msg: "Dos páginas y un diagrama. Suficiente para que nadie la use mal; insuficiente para que nadie pregunte." } },
      ] },
    { id: 11052, por: "Presentaste una estructura ante el comité", t: "Uno de los duros te invita a almorzar",
      x: "Uno de los dos miembros del comité que venían buscando sangre te invita a almorzar. Dice que tiene un proyecto aparte y busca a alguien así.",
      o: [
        { t: "Ir y escuchar", d: { red: 4, cash: 3000, ene: -2, msg: "El proyecto es serio y paga. Resulta que buscaba sangre para ver si sangrabas." } },
        { t: "Ir, pero con desconfianza", d: { cri: 2, red: 2, msg: "Escuchas más de lo que hablas. El proyecto queda para después y la relación, abierta." } },
        { t: "Excusarte con educación", d: { ene: 1, red: -2, msg: "No vas. Él no insiste, y en el próximo comité tampoco te tiene piedad." } },
      ] },
    { id: 11053, por: "Presentaste una estructura ante el comité", t: "El sector volátil tiene un buen año",
      x: "Las facturas de aquel sector se pagaron antes de tiempo y la estructura rinde más de lo previsto. Ahora todos dicen que era obvio.",
      o: [
        { t: "Proponer ampliar la línea", d: { cash: 4000, car: 2, ene: -2, msg: "Aprueban la ampliación en diez minutos. El mismo comité que hace un año te quería comer." } },
        { t: "No ampliar: el sector sigue siendo volátil", d: { cri: 4, rep: 1, msg: "Un buen año no cambia la naturaleza de un sector. Alguien lo anota en el acta, por si acaso." } },
      ] },
    { id: 11054, por: "Reestructuraste a un deudor en atraso", t: "El deudor cumple el plan",
      x: "Contra los pronósticos del comité, el deudor paga todas las cuotas de la reestructuración. Te llaman de otro fondo para un caso parecido.",
      o: [
        { t: "Tomar el caso", d: { cash: 5000, rep: 3, red: 2, msg: "Ya tienes especialidad: rescatar deudores que todos daban por muertos." } },
        { t: "Volver a prestar desde cero", d: { ene: 2, cri: 2, msg: "Prefieres prestar bien que rescatar mal. Es menos heroico y bastante más tranquilo." } },
      ] },
    { id: 11055, por: "Reestructuraste a un deudor en atraso", t: "El deudor se declara en quiebra",
      x: "El deudor se declara en quiebra ante el tribunal. El plan que firmaste queda en papel y la cartera, en pérdida.",
      o: [
        { t: "Defender el plan ante el comité", d: { rep: -2, cri: 2, ene: -3, msg: "Explicas que el plan era razonable con lo que se sabía. Es cierto. No ayuda." } },
        { t: "Asumir el error y proponer reglas nuevas", d: { rep: 2, cri: 3, ene: -2, msg: "Escribes los límites de concentración que faltaban. En voz baja, empiezan a llamarlos tu regla." } },
      ] },

    /* ===== 106 Subasta competitiva ===== */
    { id: 11060, por: "Asesoraste a un comprador en una subasta", t: "Un postor rival quiere contratarte",
      x: "Uno de los postores de aquella subasta ahora compra en otro proceso y quiere tu asesoría. Dice que aprendió mirando cómo jugaste.",
      o: [
        { t: "Tomar el mandato", d: { cash: 5000, red: 3, ene: -2, msg: "Cobras por enseñarle lo que antes usaste contra él. Así funciona esta industria." } },
        { t: "Avisar antes a tu cliente de entonces", d: { rep: 3, red: 2, cash: 3000, msg: "Tu cliente no se opone y aprecia el gesto. El rival paga un poco menos de lo que pediste." } },
        { t: "Rechazarlo por lealtad", d: { rep: 2, ene: 1, red: -1, msg: "Dices que no. Nadie te lo agradece, pero nadie te lo reprocha." } },
      ] },
    { id: 11061, por: "Asesoraste a un comprador en una subasta", t: "El vendedor cambia las reglas",
      x: "El banco que organizó aquella subasta añadió una ronda sorpresa a sus procesos. En los pasillos dicen que fue por estrategias como la tuya.",
      o: [
        { t: "Estudiar el nuevo formato", d: { cri: 3, mod: 2, ene: -2, msg: "Lees tres procesos completos con la regla nueva. Ya sabes dónde está el hueco." } },
        { t: "Quejarte en público del cambio", d: { rep: -2, red: 2, msg: "Algunos colegas te apoyan en privado. En público, el banco deja de invitarte." } },
      ] },
    { id: 11062, por: "Asesoraste a un comprador en una subasta", t: "Tu cliente quiere repetir la jugada",
      x: "Tu cliente de aquella subasta va por otro activo y quiere la misma estrategia de precio, al pie de la letra. Los postores son casi los mismos.",
      o: [
        { t: "Repetirla igual", d: { ene: -2, msg: "Mismo guion, mismos rivales. Falta saber si ellos también se acuerdan.",
          luego: [{ en: 1, azar: [{ p: 40, id: 11064 }, { p: 60, id: 11065 }] }] } },
        { t: "Cambiarla: los rivales ya te conocen", d: { cri: 4, rep: 2, ene: -3, msg: "Le cuesta aceptarlo, pero cambias el orden. Los rivales esperan lo de siempre y no llega." } },
      ] },
    { id: 11063, por: "Asesoraste a un comprador en una subasta", t: "Te acusan de saber de más",
      x: "Un postor perdedor dice que tu cliente supo cosas de más en aquella subasta. El vendedor abre una revisión del proceso y pide tus correos.",
      o: [
        { t: "Entregar tus correos sin pedir nada", d: { rep: 4, ene: -3, msg: "Tus correos son aburridos y limpios. La revisión se cierra en un mes." } },
        { t: "Negarte sin orden de un juez", d: { rep: -3, cash: -2000, cri: 1, msg: "Tienes derecho y lo ejerces. El rumor, que no necesita orden de nadie, sigue solo." } },
      ] },
    { id: 11064, por: "Repetiste una estrategia de subasta", t: "La jugada funciona dos veces",
      x: "Los rivales no aprendieron nada. Tu cliente gana el segundo activo con la misma táctica y ya habla de ti como de un amuleto.",
      o: [
        { t: "Cobrar como amuleto", d: { cash: 6000, rep: 2, msg: "Subes tus honorarios. Los amuletos son caros." } },
        { t: "Advertirle que no habrá tercera", d: { cri: 3, red: 2, msg: "Le dices que la suerte también contó. Te mira como si hubieras dicho una grosería." } },
      ] },
    { id: 11065, por: "Repetiste una estrategia de subasta", t: "Los rivales te esperaban",
      x: "Esta vez los rivales sabían lo que venía. Ofrecen justo por encima de tu cliente y se quedan con el activo.",
      o: [
        { t: "Asumir el error ante tu cliente", d: { rep: 1, cri: 3, red: -1, msg: "Le dices que fue tu lectura. Lo acepta, pero el próximo proceso lo hace con otro." } },
        { t: "Explicar que el mercado cambió", d: { rep: -3, ene: 1, msg: "Suena a excusa porque lo es. Tu cliente asiente y anota algo en su teléfono." } },
      ] },

    /* ===== 107 El pitch al comité de inversión ===== */
    { id: 11070, por: "Defendiste una tesis ante un comité de inversión", t: "Te invitan a un foro con público",
      x: "Alguien contó cómo defendiste aquella tesis y te invitan a presentarla en un foro de inversores con trescientas personas.",
      o: [
        { t: "Aceptar y ensayarlo de nuevo", d: { rep: 4, red: 3, ene: -4, msg: "Tres noches ensayando frente al espejo. En el foro sale exacto y nadie se duerme." } },
        { t: "Aceptar e improvisar", d: { ene: -1, msg: "Llegas con tres números en la cabeza y ninguna lámina. El público no sabe lo que viene; tú tampoco.",
          luego: [{ en: 1, azar: [{ p: 50, id: 11074 }, { p: 50, id: 11075 }] }] } },
        { t: "Declinar: no es tu escenario", d: { ene: 2, red: -1, msg: "Otro presenta en tu lugar. Usa una lámina tuya sin citarte." } },
      ] },
    { id: 11071, por: "Defendiste una tesis ante un comité de inversión", t: "La tesis empieza a fallar",
      x: "Dos de los supuestos de aquella tesis no se cumplen. El comité pide una actualización en una semana y ya nadie recuerda lo bien que la contaste.",
      o: [
        { t: "Reconocer los fallos y ajustar", d: { cri: 4, rep: 1, ene: -3, msg: "Llevas la tesis corregida con los errores marcados en rojo. Incomoda, pero convence." } },
        { t: "Defender la tesis original", d: { rep: -3, cri: -1, msg: "Sostienes que el mercado todavía no la entiende. El comité, en cambio, te entiende a ti." } },
      ] },
    { id: 11072, por: "Defendiste una tesis ante un comité de inversión", t: "Un miembro del comité te recomienda",
      x: "Uno de los siete de aquel comité se cambió a otro fondo. Te llama: allá quieren escuchar una tesis tuya y pagan por la idea.",
      o: [
        { t: "Llevarles una tesis nueva", d: { cash: 4000, mod: 2, ene: -3, msg: "Un mes de trabajo y una idea fresca. La compran, y de paso compran tu nombre." } },
        { t: "Llevarles la misma, actualizada", d: { cash: 2000, ene: -1, msg: "Le cambias las fechas y dos gráficos. Pagan menos, y se nota que lo notaron." } },
        { t: "Agradecer y declinar", d: { red: 1, ene: 1, msg: "Le agradeces de verdad. Esas llamadas valen aunque no se contesten con un sí." } },
      ] },
    { id: 11073, por: "Defendiste una tesis ante un comité de inversión", t: "Una pregunta que no estaba en la lámina",
      x: "En la siguiente reunión, el comité te hace una pregunta que no estaba en ninguna lámina. Siete personas esperan en silencio.",
      o: [
        { t: "Responder con lo que sabes, sin adornos", d: { cri: 3, rep: 2, msg: "Contestas corto y con un dato. El silencio se rompe con un asentimiento." } },
        { t: "Pedir un día para volver con el dato", d: { rep: 1, ene: -1, cri: 1, msg: "Vuelves al día siguiente con la respuesta exacta. Nadie se acuerda ya de la pregunta." } },
        { t: "Improvisar con seguridad", d: { rep: -2, ene: 1, msg: "Suena perfecto. Dos semanas después alguien verifica la cifra y no era esa." } },
      ] },
    { id: 11074, por: "Improvisaste en un foro con trescientas personas", t: "Un inversor del público te busca",
      x: "Un inversor que estaba en el foro se acordó de tu cierre. Te busca para invertir en la próxima idea que tengas, sin lámina de por medio.",
      o: [
        { t: "Presentarle una idea en serio", d: { cash: 6000, red: 3, ene: -3, msg: "Le presentas una idea con todos sus papeles. Pone el dinero y pide informes cada trimestre." } },
        { t: "Decirle que todavía no tienes nada", d: { cri: 3, red: 1, msg: "Le dices la verdad. Te deja su tarjeta y la frase «cuando la tengas»." } },
      ] },
    { id: 11075, por: "Improvisaste en un foro con trescientas personas", t: "Tu tropiezo circula en video",
      x: "En el foro te quedaste en blanco a la mitad. Alguien lo grabó y ahora circula con una música de fondo que no ayuda.",
      o: [
        { t: "Reírte de ti en público", d: { rep: 2, red: 3, ene: -1, msg: "Lo compartes con un comentario irónico. La gente se ríe contigo, que es mejor que de ti." } },
        { t: "Pedir que lo borren", d: { rep: -2, ene: -2, msg: "Lo borran en un sitio y aparece en dos. Internet tiene memoria y poco humor." } },
      ] },

    /* ===== 108 Papel distressed a treinta centavos ===== */
    { id: 11080, por: "Compraste un bono en problemas y lo aguantaste", t: "La reestructuración se estanca",
      x: "El acuerdo de aquel bono lleva otro año sin cerrarse. El papel cotiza por debajo de treinta y los que lo compraron se miran de reojo.",
      o: [
        { t: "Ofrecerte para la mesa de acreedores", d: { red: 4, rep: 2, ene: -4, msg: "Te sientas con abogados que cobran por minuto. Tú no, y eso se nota en el ánimo." } },
        { t: "Revisar tu tesis y corregirla", d: { cri: 3, mod: 2, ene: -2, msg: "Encuentras lo que falló: el calendario. La empresa vale lo que pensabas, solo que más tarde." } },
        { t: "Vender y aceptar la pérdida", d: { cash: -4000, cri: 2, ene: 2, msg: "Sales con pérdida. Por lo menos ya no lees las noticias del bono cada mañana." } },
      ] },
    { id: 11081, por: "Compraste un bono en problemas y lo aguantaste", t: "El acuerdo llega por fin",
      x: "La empresa firma con sus acreedores. Te ofrecen cobrar ya en efectivo o cambiar tu bono por acciones de la empresa reestructurada.",
      o: [
        { t: "Cobrar en efectivo", d: { cash: 10000, cri: 2, msg: "Cobras y cierras el capítulo. Lo que pase con la empresa ya es novela de otros." } },
        { t: "Quedarte con las acciones nuevas", d: { msg: "Cambias el papel por acciones. Pasas de acreedor a dueño de la misma empresa convaleciente.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 11084, bueno: true }, { p: 50, id: 11085, bueno: false }] }] } },
      ] },
    { id: 11082, por: "Le vendiste a un fondo tu tesis sobre un bono", t: "El fondo ganó mucho con tu tesis",
      x: "El fondo que compró tu tesis multiplicó su dinero cuando llegó el acuerdo. Tú cobraste tu comisión y nada más. Su socio te invita a cenar.",
      o: [
        { t: "Pedir una parte de la ganancia en la próxima", d: { red: 2, cash: 3000, ene: -2, msg: "Acepta darte una parte en la siguiente idea. Ahora el riesgo también es tuyo." } },
        { t: "Felicitarlos y no pedir nada", d: { red: 4, rep: 2, msg: "Pagas tu parte de la cena. El socio te manda tres clientes ese año." } },
      ] },
    { id: 11083, por: "Estudiaste un bono que cotizaba a treinta", t: "Un acreedor grande te busca",
      x: "Un acreedor con mucho papel de aquel bono quiere tu análisis para negociar con la empresa. Paga bien y lo necesita para ayer.",
      o: [
        { t: "Venderle el análisis", d: { cash: 5000, red: 2, ene: -2, msg: "Le entregas el análisis en una semana. Lo usa para pedir el doble de lo razonable." } },
        { t: "Pedir un asiento en la negociación", d: { red: 4, rep: 2, ene: -4, msg: "Te sientas en la mesa de acreedores. Aprendes que una reestructuración es una pelea con calendario." } },
      ] },
    { id: 11084, por: "Cambiaste tu bono por acciones nuevas", t: "Las acciones nuevas suben",
      x: "La empresa reestructurada empieza a ganar dinero y sus acciones suben. Tu apuesta de treinta centavos ya parece de otro siglo.",
      o: [
        { t: "Vender la mitad", d: { cash: 9000, cri: 3, msg: "Aseguras la mitad y dejas correr el resto. Por una vez, las dos cosas a la vez." } },
        { t: "Quedarte con todo", d: { cash: 4000, rep: 2, cri: -1, msg: "Te quedas y cobras dividendos. Ya hablas de la empresa como si fuera tuya. En parte, lo es." } },
      ] },
    { id: 11085, por: "Cambiaste tu bono por acciones nuevas", t: "Las acciones nuevas no levantan",
      x: "La empresa reestructurada sigue perdiendo dinero. Las acciones que recibiste valen menos que el bono que entregaste.",
      o: [
        { t: "Vender y cerrar el capítulo", d: { cash: -4000, cri: 3, ene: 2, msg: "Vendes con pérdida. La lección cuesta cara y no trae factura." } },
        { t: "Pedir un puesto en el directorio", d: { red: 3, ene: -5, rep: 1, msg: "Te sientas en el directorio a arreglarla desde dentro. Ahora el problema tiene tu nombre." } },
      ] },
    { id: 11086, por: "Le vendiste a un fondo tu tesis sobre un bono", t: "El fondo pierde con tu tesis",
      x: "La reestructuración de aquel bono se estancó y el fondo que compró tu tesis lleva un año en pérdida. Su socio te pide una explicación.",
      o: [
        { t: "Revisar la tesis con él, punto por punto", d: { cri: 3, red: 2, ene: -3, msg: "Encuentras el supuesto que falló: el tiempo. El socio no queda feliz, pero queda informado." } },
        { t: "Recordarle que el riesgo era suyo", d: { rep: -2, red: -3, cri: 1, msg: "Es cierto y está en el contrato. También es cierto que no te va a volver a llamar." } },
      ] },

    /* ===== 109 Auditoría regulatoria sorpresa ===== */
    { id: 11090, por: "Reconstruiste de memoria una auditoría", t: "El regulador lo quiere por escrito",
      x: "El regulador vuelve y esta vez pide por escrito cada aprobación que aquella vez explicaste de palabra. Tienes un mes.",
      o: [
        { t: "Escribirlo todo tú", d: { cri: 3, rep: 2, ene: -6, msg: "Un mes de noches pasando tu memoria a papel. Ahora hay un archivo, y el archivo eres tú." } },
        { t: "Pedir prórroga y armar un equipo", d: { rep: -1, ene: -2, red: 2, msg: "Te dan dos semanas más. Lo hacen entre cuatro y queda mejor que si lo hubieras hecho solo." } },
      ] },
    { id: 11091, por: "Acompañaste una auditoría sorpresa del regulador", t: "El regulador te invita a escribir normas",
      x: "Uno de los inspectores de aquella visita recomendó tu nombre. El regulador arma un grupo para redactar las nuevas reglas de archivo.",
      o: [
        { t: "Aceptar, aunque no paga", d: { rep: 4, red: 3, ene: -3, msg: "Las reuniones son lentas y el café es malo. Pero la norma nueva tiene tus ideas." } },
        { t: "Declinar: no tienes tiempo", d: { ene: 2, red: -1, msg: "Otro escribe la norma. Es más larga de lo necesario." } },
      ] },
    { id: 11092, por: "Acompañaste una auditoría sorpresa del regulador", t: "Un expediente que nadie pidió",
      x: "Un expediente de aquel periodo, que los inspectores no pidieron, aparece mal archivado. Tiene una aprobación sin firma.",
      o: [
        { t: "Reportarlo antes de que lo encuentren", d: { rep: 2, cri: 2, ene: -2, msg: "Mandas una carta al regulador con el expediente. La respuesta tarda semanas en llegar.",
          luego: [{ en: 1, s: "rep", azar: [{ p: 60, id: 11094, bueno: true }, { p: 40, id: 11095, bueno: false }] }] } },
        { t: "Conseguir la firma ahora y archivarlo", d: { rep: -2, ene: 1, cri: -2, msg: "La firma llega con fecha de hoy. El papel queda completo; tu conciencia, no tanto." } },
        { t: "Dejarlo como está", d: { ene: 1, rep: -1, msg: "Lo devuelves a su carpeta, bien archivado esta vez. Si alguien pregunta, ya verás." } },
      ] },
    { id: 11093, por: "Ordenaste los expedientes para el regulador", t: "Te encargan ordenar todo lo demás",
      x: "Después de aquella auditoría, quieren que diseñes cómo se archiva todo de aquí en adelante. Nadie más quiso el encargo, por algo será.",
      o: [
        { t: "Hacer un sistema simple", d: { cri: 3, rep: 2, ene: -3, msg: "Tres reglas y una carpeta compartida. La gente lo usa porque no exige pensar." } },
        { t: "Contratar una consultora", d: { cash: -2000, ene: 2, rep: -1, msg: "La consultora entrega un manual de ochenta páginas. Nadie lo lee, pero se ve muy completo." } },
      ] },
    { id: 11094, por: "Reportaste un expediente sin firma", t: "El regulador valora la buena fe",
      x: "El regulador cierra el caso del expediente con una nota: reportado de forma voluntaria. En el sector, esa nota se lee como elogio.",
      o: [
        { t: "Contarlo como ejemplo de cumplimiento", d: { rep: 4, red: 2, msg: "Lo cuentas en una charla. Al final te piden la plantilla de la carta." } },
        { t: "Dejarlo en el archivo y seguir", d: { rep: 2, ene: 2, msg: "La nota queda en tu expediente. Algún día alguien la va a leer." } },
      ] },
    { id: 11095, por: "Reportaste un expediente sin firma", t: "La sanción llega igual",
      x: "El regulador agradece el reporte y multa igual. Aquella aprobación sin firma tenía tu nombre en la lista de responsables.",
      o: [
        { t: "Pagar la multa y callar", d: { cash: -4000, rep: -2, ene: 1, msg: "Pagas. La buena fe, aprendes, se agradece y se cobra a la vez." } },
        { t: "Apelar con el reporte en la mano", d: { cash: -1500, cri: 2, ene: -4, rep: 1, msg: "La apelación baja la multa a la mitad. Ganas medio caso y pierdes muchas tardes." } },
      ] },

    /* ===== 110 Fijar el rango de precio de la colocación ===== */
    { id: 11100, por: "Fijaste el precio de una colocación", t: "La acción cae bajo el precio de salida",
      x: "Un año después, la emisión cotiza por debajo del precio de colocación. Los inversores que entraron quieren una explicación, y la quieren de ti.",
      o: [
        { t: "Organizar una reunión con la empresa", d: { red: 3, rep: 2, ene: -3, msg: "Pones a la empresa frente a sus inversores. Nadie sale feliz, pero todos salen informados." } },
        { t: "Recordar que el precio lo puso la demanda", d: { rep: -2, cri: 1, msg: "Tienes razón técnica. Los inversores tienen memoria, que no es técnica pero pesa más." } },
      ] },
    { id: 11101, por: "Sondeaste a los inversores ancla uno por uno", t: "Los anclas piden trato especial",
      x: "Los inversores ancla de aquella colocación quieren asignación garantizada en la próxima emisión. Lo dicen como si ya estuviera pactado.",
      o: [
        { t: "Concedérselo", d: { red: 4, rep: -2, msg: "Quedan contentos. Los demás inversores lo notan en la próxima asignación." } },
        { t: "Negarlo y abrir las órdenes a todos", d: { rep: 3, red: -3, cri: 2, msg: "Les dices que la emisión es para todos. Uno no vuelve. Los otros dos, sí." } },
      ] },
    { id: 11102, por: "Fijaste el precio de una colocación", t: "La emisora vuelve por más capital",
      x: "La empresa de aquella colocación quiere salir otra vez al mercado y pide repetir equipo y método. El mercado está más nervioso que entonces.",
      o: [
        { t: "Tomar el mandato", d: { cash: 6000, car: 2, ene: -4, msg: "Repites el equipo. El mercado, en cambio, no se repite nunca.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 11104, bueno: true }, { p: 50, id: 11105, bueno: false }] }] } },
        { t: "Recomendarles esperar un año", d: { cri: 4, rep: 2, red: -1, msg: "Les dices que el mercado no está para eso. No les gusta, pero un año después te dan la razón." } },
      ] },
    { id: 11103, por: "Fijaste el precio de una colocación", t: "El regulador revisa la asignación",
      x: "El regulador revisa cómo se repartió aquella emisión entre los inversores. Quiere ver quién pidió qué y quién recibió cuánto.",
      o: [
        { t: "Entregar los registros completos", d: { rep: 3, cri: 2, ene: -2, msg: "Los registros cuadran. El regulador cierra la revisión con una línea seca." } },
        { t: "Pedir tiempo para revisarlos antes", d: { rep: -1, ene: -2, cri: 2, msg: "Encuentras un error menor y lo corriges antes de entregar. Te salva de una carta incómoda." } },
      ] },
    { id: 11104, por: "Repetiste una colocación con la misma empresa", t: "La segunda emisión vuela",
      x: "La segunda colocación se cubre cuatro veces. La empresa te manda una caja de vino y otra emisora te pide una reunión.",
      o: [
        { t: "Tomar la reunión", d: { cash: 7000, red: 3, ene: -3, msg: "Dos mandatos seguidos y fama de saber leer el mercado. Dura hasta el próximo error." } },
        { t: "Descansar un trimestre", d: { ene: 6, red: -1, msg: "Te tomas tres meses tranquilos. El vino se acaba antes." } },
      ] },
    { id: 11105, por: "Repetiste una colocación con la misma empresa", t: "La segunda emisión se queda corta",
      x: "El mercado se puso nervioso a mitad del proceso y la colocación no se cubrió entera. La empresa culpa al precio, y el precio lo pusiste tú.",
      o: [
        { t: "Ajustar el tamaño y cerrar", d: { rep: -1, cri: 3, cash: 2000, msg: "Colocas menos de lo previsto, pero colocas. Una emisión chica es mejor que una fallida." } },
        { t: "Sostener el precio y esperar", d: { rep: -3, ene: -3, msg: "Esperas una semana a que el mercado cambie. No cambia. Cierras más abajo y con la empresa enojada." } },
      ] },

    /* ===== 111 Primer cierre de tu fondo ===== */
    { id: 11110, por: "Negociaste con el inversor ancla de tu fondo", t: "El ancla quiere voz en las decisiones",
      x: "El inversor ancla de tu fondo pide un asiento en el comité de inversión. Dice que el tamaño de su aporte lo justifica, y lo dice sonriendo.",
      o: [
        { t: "Darle el asiento", d: { red: 3, rep: -2, cri: -2, msg: "Se sienta. En la primera reunión veta una operación porque no le gusta el nombre de la empresa." } },
        { t: "Darle un consejo asesor sin voto", d: { cri: 3, red: -1, msg: "Le ofreces opinar sin decidir. Lo acepta a regañadientes y opina mucho." } },
        { t: "Negarlo con el contrato en la mano", d: { rep: 3, red: -4, msg: "El contrato está de tu lado. El ancla, ahora, no tanto." } },
      ] },
    { id: 11111, por: "Levantaste el primer cierre de tu fondo", t: "La primera inversión del fondo",
      x: "Toca poner el primer dinero del fondo. Todos los inversores van a mirar esa primera operación con lupa, y la van a recordar.",
      o: [
        { t: "Ir por una apuesta segura", d: { rep: 2, cri: 2, msg: "Una empresa aburrida y rentable. Nadie aplaude, nadie se preocupa." } },
        { t: "Ir por la operación que te convence", d: { ene: -3, mod: 2, msg: "Pones el primer dinero donde está tu convicción. Ahora toca esperar.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 11114, bueno: true }, { p: 50, id: 11115, bueno: false }] }] } },
      ] },
    { id: 11112, por: "Levantaste el primer cierre de tu fondo", t: "Un inversor quiere salir antes",
      x: "Un inversor de tu fondo tiene problemas de liquidez y quiere vender su parte antes de tiempo. Te llama a ti antes que a su abogado.",
      o: [
        { t: "Buscarle comprador entre los demás", d: { red: 3, ene: -3, msg: "Otro inversor compra su parte con descuento. Todos contentos, menos el que vendió." } },
        { t: "Aplicar el contrato sin excepciones", d: { rep: 2, red: -3, cri: 1, msg: "No puede salir. Se queda, resentido y obligado, que es la peor forma de quedarse." } },
      ] },
    { id: 11113, por: "Levantaste el primer cierre de tu fondo", t: "Hay fila para el segundo cierre",
      x: "Los primeros meses del fondo corrieron la voz. Inversores que antes no te contestaban ahora piden entrar al segundo cierre.",
      o: [
        { t: "Ampliar el fondo", d: { cash: 7000, car: 3, ene: -3, msg: "Más dinero, más comisiones y más presión. Ahora tienes que encontrar el doble de buenas operaciones." } },
        { t: "Mantener el tamaño", d: { cri: 3, rep: 2, cash: 2000, msg: "Le dices que no al dinero. En esta industria eso se cuenta como leyenda." } },
      ] },
    { id: 11114, por: "Pusiste el primer dinero de tu fondo en tu convicción", t: "La primera operación sale bien",
      x: "La empresa en la que invertiste primero supera su plan. En la reunión anual, los inversores aplauden con la discreción de quien cobra.",
      o: [
        { t: "Contarlo con humildad", d: { rep: 3, red: 2, msg: "Explicas qué salió bien y qué fue suerte. Los inversores aprecian sobre todo la parte de la suerte." } },
        { t: "Usarlo para levantar el próximo fondo", d: { cash: 6000, car: 3, ene: -3, msg: "Un caso de éxito vale más que diez láminas. El próximo fondo arranca con fila." } },
      ] },
    { id: 11115, por: "Pusiste el primer dinero de tu fondo en tu convicción", t: "La primera operación se complica",
      x: "La empresa en la que invertiste primero pierde a su mayor cliente. Los inversores piden una llamada, todos a la vez.",
      o: [
        { t: "Llamarlos uno por uno", d: { red: 2, ene: -4, cri: 2, msg: "Diez llamadas en un día. Nadie queda tranquilo, pero todos saben qué estás haciendo." } },
        { t: "Mandar un informe y esperar", d: { rep: -2, ene: 1, msg: "El informe es claro y frío. Las llamadas llegan igual, ahora más molestas." } },
      ] },

    /* ===== 112 Dos cierres el mismo viernes ===== */
    { id: 11120, por: "Cerraste dos mandatos el mismo viernes", t: "Un cliente se enteró del otro cierre",
      x: "El cliente de aquel viernes supo que estabas en otro cierre a la misma hora. Lo menciona sin enojo, pero lo menciona.",
      o: [
        { t: "Decirle la verdad", d: { rep: 2, red: -1, cri: 1, msg: "Le explicas cómo lo organizaste. Prefiere la verdad a la sospecha." } },
        { t: "Invitarlo a comer y cambiar de tema", d: { cash: -1000, red: 3, msg: "Un buen almuerzo lo arregla casi todo. Casi." } },
      ] },
    { id: 11121, por: "Delegaste un cierre en tu asociado", t: "Tu asociado quiere su propio cliente",
      x: "El asociado que ejecutó aquel cierre quiere llevar un cliente propio. Si le dices que no, otra firma le dirá que sí.",
      o: [
        { t: "Dárselo y supervisar de lejos", d: { red: 2, ene: 2, msg: "Le pasas el cliente y le dices que llame si se complica. No llama.",
          luego: [{ en: 1, s: "red", azar: [{ p: 55, id: 11124, bueno: true }, { p: 45, id: 11125, bueno: false }] }] } },
        { t: "Pedirle un año más a tu lado", d: { red: -2, rep: 1, msg: "Acepta, pero con cara de calendario. Cuenta los meses." } },
      ] },
    { id: 11122, por: "Cerraste dos mandatos el mismo viernes", t: "Otra vez dos fechas cruzadas",
      x: "Dos clientes quieren cerrar el mismo día, otra vez. Ya tienes fama de poder con eso, y la fama no pregunta si dormiste.",
      o: [
        { t: "Coordinarlo al minuto, como siempre", d: { cash: 6000, rep: 2, ene: -6, msg: "Lo logras otra vez. Lo celebras dormido en el taxi." } },
        { t: "Pedirle a uno que mueva la fecha", d: { ene: 2, red: -2, rep: -1, msg: "Mueve la fecha con un suspiro largo. Cierra bien, pero ya sabe que no eres infinito." } },
      ] },
    { id: 11123, por: "Cerraste dos mandatos el mismo viernes", t: "El cuerpo te pasa la factura",
      x: "Llevas meses viviendo de cierres encadenados. El médico te dice que bajes el ritmo, y te lo dice sin anestesia.",
      o: [
        { t: "Tomarte dos semanas de verdad", d: { ene: 10, cash: -2000, car: -1, msg: "Dos semanas sin teléfono. Vuelves y el mundo sigue en pie, lo cual ofende un poco." } },
        { t: "Seguir, pero dormir más", d: { ene: -3, car: 2, msg: "Dormir más dura una semana. Después vuelve el viernes." } },
      ] },
    { id: 11124, por: "Le diste un cliente propio a tu asociado", t: "Tu asociado te trae un cliente",
      x: "El asociado al que le soltaste la mano consiguió un cliente nuevo por su cuenta. Te lo trae a ti, porque dice que aprendió contigo.",
      o: [
        { t: "Llevarlo juntos", d: { cash: 5000, red: 3, rep: 2, msg: "Trabajan juntos y la comisión se reparte bien. Ya no es tu asociado; es tu socio de hecho." } },
        { t: "Dejarle el cliente entero", d: { red: 5, rep: 3, msg: "Le dices que es suyo. Lo cuenta en todas partes, y tu nombre va incluido." } },
      ] },
    { id: 11125, por: "Le diste un cliente propio a tu asociado", t: "Tu asociado se lleva al cliente",
      x: "El asociado se fue a otra firma y se llevó al cliente que le diste. Te manda un mensaje muy educado, que es lo que más molesta.",
      o: [
        { t: "Felicitarlo de verdad", d: { red: 3, ene: -1, msg: "Le deseas suerte. Unos años después te devuelve el favor con un cliente." } },
        { t: "Llamar al cliente para recuperarlo", d: { red: -2, cash: 2000, ene: -3, rep: -1, msg: "Recuperas al cliente y pierdes la elegancia. Algunos días el cambio vale la pena." } },
      ] },

    /* ===== 113 Reasignar tu portafolio antes del cierre de año ===== */
    { id: 11130, por: "Decidiste dónde dejar tu patrimonio un año", t: "El mercado cae fuerte",
      x: "El mercado cae fuerte durante tres meses seguidos. En todas las conversaciones alguien dice que es momento de vender todo.",
      o: [
        { t: "Vender y esperar en efectivo", d: { cash: -3000, ene: 2, cri: -2, msg: "Duermes mejor. El mercado rebota justo cuando terminas de vender, como siempre." } },
        { t: "Comprar más en la caída", d: { ene: -2, msg: "Compras mientras todos venden. La valentía y la imprudencia usan el mismo uniforme.",
          luego: [{ en: 1, azar: [{ p: 55, id: 11134 }, { p: 45, id: 11135 }] }] } },
        { t: "No tocar nada", d: { cri: 3, ene: -1, msg: "Apagas las noticias y no tocas nada. Es la decisión más difícil y la menos vistosa." } },
      ] },
    { id: 11131, por: "Reasignaste tu patrimonio con tesis propia", t: "Un amigo quiere que manejes sus ahorros",
      x: "Un amigo vio cómo te fue con tu portafolio y quiere que le manejes sus ahorros. Sin papeles, dice, que entre amigos no hace falta.",
      o: [
        { t: "Aceptar sin papeles", d: { red: 3, cri: -2, msg: "Te transfiere sus ahorros con un emoji. Ahora cada caída del mercado es también una cena incómoda." } },
        { t: "Aceptar con un contrato simple", d: { rep: 2, red: 1, cash: 1000, msg: "Firman una hoja. Él se ríe del trámite; tú duermes tranquilo." } },
        { t: "Decirle que compre el índice", d: { cri: 2, red: -1, msg: "Le das el mejor consejo y el más aburrido. Se ofende un poco." } },
      ] },
    { id: 11132, por: "Decidiste dónde dejar tu patrimonio un año", t: "Un producto con mucha letra chica",
      x: "Tu banco te ofrece un producto con capital protegido y rendimiento atado a un índice. El folleto tiene once páginas de letra chica.",
      o: [
        { t: "Leer las once páginas", d: { cri: 3, ene: -2, msg: "En la página nueve está la comisión que se come la mitad del rendimiento. No firmas." } },
        { t: "Firmar y confiar en el banco", d: { cash: -1500, cri: -1, msg: "El capital está protegido; el rendimiento, no tanto. El banco, en cambio, cobró completo." } },
        { t: "Dejarlo en el cajón", d: { ene: 1, msg: "No lo firmas ni lo lees. A veces la pereza es una forma de prudencia." } },
      ] },
    { id: 11133, por: "Indexaste tu patrimonio y no pensaste más", t: "Un año aburrido y correcto",
      x: "Pasó un año con el índice. Rindió lo que el mercado, ni más ni menos, y en una cena alguien presume de haber triplicado su dinero.",
      o: [
        { t: "Seguir con el índice", d: { cri: 3, ene: 2, cash: 1000, msg: "Felicitas al de la cena. Seis meses después ya no presume de nada." } },
        { t: "Sacar una parte para una apuesta propia", d: { msg: "Sacas un pedazo del índice para una idea tuya. La envidia también gestiona portafolios, y mal.",
          luego: [{ en: 1, azar: [{ p: 40, id: 11134 }, { p: 60, id: 11135 }] }] } },
      ] },
    { id: 11134, por: "Pusiste dinero extra en una apuesta propia", t: "La apuesta sale bien",
      x: "Lo que pusiste aparte rinde bien en un año. No te vuelves rico, pero tienes una historia para la próxima cena.",
      o: [
        { t: "Tomar la ganancia", d: { cash: 4000, cri: 2, msg: "Vendes y devuelves el dinero a su lugar aburrido. Una buena historia no necesita segunda parte." } },
        { t: "Doblar la apuesta", d: { cash: 1000, cri: -3, ene: -2, msg: "Pones más. La confianza es lo único que sube más rápido que las acciones." } },
      ] },
    { id: 11135, por: "Pusiste dinero extra en una apuesta propia", t: "La apuesta sale mal",
      x: "Lo que pusiste aparte cae un tercio en pocos meses. Lo revisas cada mañana, como quien mira una herida.",
      o: [
        { t: "Cortar la pérdida", d: { cash: -2500, cri: 3, msg: "Vendes y aceptas. La pérdida duele un mes; la lección dura años." } },
        { t: "Esperar a que vuelva", d: { cash: -1000, ene: -3, cri: -1, msg: "Esperas. Vuelve hasta la mitad y ahí se queda, mirándote." } },
      ] },

    /* ===== 114 El director de inversiones del fondo te pone a prueba (empleado) ===== */
    { id: 11140, por: "Te sometiste al examen de un director de fondo", t: "El fondo te escribe a ti directamente", empleado: true,
      x: "El director de inversiones de aquel fondo te escribe a ti, no a la firma. Quiere tu opinión sobre una posición nueva, para mañana.",
      o: [
        { t: "Responderle y avisar a tu jefe", d: { rep: 3, red: 2, msg: "Tu jefe agradece el aviso con un gesto. El fondo agradece la respuesta con otra pregunta." } },
        { t: "Responderle sin avisar a nadie", d: { red: 4, rep: -1, msg: "Le respondes de noche desde tu correo personal. Se siente como libertad y como riesgo a la vez.",
          luego: [{ en: 1, azar: [{ p: 50, id: 11144 }, { p: 50, id: 11145 }] }] } },
      ] },
    { id: 11141, por: "Ayudaste a que un fondo entrara en una posición", t: "La posición del fondo se da vuelta", empleado: true,
      x: "La posición que salió de aquella reunión con el fondo cae fuerte. El fondo pregunta quién la recomendó, y la pregunta llega con copia a todos.",
      o: [
        { t: "Dar la cara con el análisis", d: { rep: 2, cri: 3, ene: -3, msg: "Explicas qué se esperaba y qué cambió. El fondo no está contento, pero sabe con quién hablar." } },
        { t: "Dejar que responda tu jefe", d: { rep: -2, ene: 1, msg: "Tu jefe responde y te nombra dos veces en el correo. Esta vez sí te nombra." } },
      ] },
    { id: 11142, por: "Ayudaste a que un fondo entrara en una posición", t: "Tu jefe se lleva el crédito", empleado: true,
      x: "En la reunión anual, tu jefe presenta la relación con aquel fondo como un logro propio. Tú estás sentado en la tercera fila.",
      o: [
        { t: "Callar y tomar nota", d: { cri: 1, ene: -2, msg: "No dices nada. Anotas el día en una libreta que empieza a tener muchas páginas." } },
        { t: "Mencionar tu parte con tacto", d: { rep: 2, car: 2, red: -1, msg: "En las preguntas agradeces haber trabajado en eso. Tu jefe sonríe con todos los dientes." } },
      ] },
    { id: 11143, por: "Le cediste a tu jefe la reunión con el fondo", t: "Tu jefe te devuelve el favor", empleado: true,
      x: "Tu jefe no olvidó que le dejaste el fondo. En la ronda de promociones, tu nombre aparece en su lista.",
      o: [
        { t: "Aceptar el empujón", d: { car: 5, red: 2, rep: -1, msg: "Subes con su firma en la espalda. Ahora le debes una, y él lo sabe." } },
        { t: "Pedir en cambio un cliente propio", d: { red: 3, rep: 2, car: 1, msg: "Te da un cliente chico pero tuyo. Menos título, más futuro." } },
      ] },
    { id: 11144, por: "Le respondiste al fondo a espaldas de tu jefe", t: "El fondo te encarga un análisis aparte", empleado: true,
      x: "El director del fondo quedó contento con tu respuesta. Te ofrece pagarte por un análisis aparte, fuera de tu horario y de tu firma.",
      o: [
        { t: "Hacerlo con permiso de tu firma", d: { cash: 3000, rep: 2, ene: -3, msg: "Pides permiso y te lo dan con una condición: comisión para la casa. Ganas menos, duermes más." } },
        { t: "Hacerlo por tu cuenta", d: { cash: 6000, rep: -2, ene: -4, deja: "l1_trabajo_paralelo", msg: "Lo haces de noche. Cobras bien y tienes un secreto nuevo que cuidar." } },
      ] },
    { id: 11145, por: "Le respondiste al fondo a espaldas de tu jefe", t: "Tu jefe ve el correo", empleado: true,
      x: "Tu jefe estaba en copia de un reenvío que no debía tener. Te llama a su oficina y deja la puerta abierta, para que se oiga.",
      o: [
        { t: "Explicarlo sin excusas", d: { rep: 1, car: -2, cri: 2, msg: "Admites que debiste avisar. Te deja pasar esta vez, con un tono que dice que no habrá otra." } },
        { t: "Defender que el fondo te escribió a ti", d: { car: -4, rep: -2, red: 2, msg: "Tienes razón y él tiene el cargo. Ganas el argumento y pierdes el próximo ascenso." } },
      ] },

    /* ===== 115 Examen de idoneidad del regulador ===== */
    { id: 11150, por: "Postergaste tu examen de idoneidad", t: "Una operación que exige tu firma",
      x: "Un cliente quiere cerrar una operación que exige firma con licencia propia, y la quiere esta semana. La tuya sigue siendo prestada.",
      o: [
        { t: "Pedirle la firma a quien te presta la licencia", d: { red: -2, cash: 2000, msg: "Firma, pero se queda con parte de la comisión. Las licencias prestadas cobran intereses." } },
        { t: "Presentar el examen a la carrera", d: { ene: -5, msg: "Estudias una semana sin dormir. Llegas al examen con ojeras y fórmulas.",
          luego: [{ en: 1, azar: [{ p: 45, id: 11155 }, { p: 55, id: 11156 }] }] } },
      ] },
    { id: 11151, por: "Postergaste tu examen de idoneidad", t: "Quien te presta la licencia se retira",
      x: "La persona bajo cuya licencia firmas anuncia que se retira el año que viene. Tus operaciones se van a quedar sin firma.",
      o: [
        { t: "Presentarte al examen de una vez", d: { ene: -3, cri: 2, msg: "Te inscribes y estudias con calma. Esta vez el plazo lo pones tú.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 60, id: 11155, bueno: true }, { p: 40, id: 11156, bueno: false }] }] } },
        { t: "Buscar otra licencia prestada", d: { red: -2, cash: -2000, msg: "Encuentras a otro que te preste la firma, más caro y más desconfiado. El problema solo cambió de dueño." } },
      ] },
    { id: 11152, por: "Decidiste qué hacer con tu examen de idoneidad", t: "El regulador cambia el examen",
      x: "El regulador rehace el examen y ahora exige renovarlo cada tres años. Los que ya lo tienen protestan; los que no, se preocupan.",
      o: [
        { t: "Prepararte con tiempo", d: { cri: 3, ene: -2, msg: "Te armas un calendario de estudio. Aburrido, como todo lo que funciona." } },
        { t: "Ignorarlo hasta el último mes", d: { ene: 2, cri: -1, msg: "Hay cosas más urgentes. El último mes, cuando llegue, también las habrá." } },
        { t: "Firmar la protesta del gremio", d: { red: 3, rep: -1, msg: "Tu firma queda junto a otras doscientas. El regulador las lee todas y no cambia nada." } },
      ] },
    { id: 11153, por: "Te presentaste al examen de idoneidad", t: "Un colega te pide tus apuntes",
      x: "Un colega más joven va a presentar el examen de idoneidad y te pide los apuntes con los que estudiaste. Los tuyos tienen fama.",
      o: [
        { t: "Dárselos con tus notas al margen", d: { red: 4, rep: 1, msg: "Tus notas al margen son más útiles que el manual. Lo aprueba y se lo cuenta a todos." } },
        { t: "Dárselos y cobrarle un café", d: { red: 2, ene: 1, msg: "Un café y un favor pendiente. El mejor negocio de la semana." } },
        { t: "Decirle que estudie por su cuenta", d: { red: -2, cri: 1, msg: "Se va sin apuntes y con una opinión nueva sobre ti." } },
      ] },
    { id: 11154, por: "Te presentaste al examen de idoneidad", t: "Un cliente revisa tu registro",
      x: "Antes de contratarte, un cliente grande revisa el registro público del regulador. Te llama para preguntarte por lo que vio con tu nombre.",
      o: [
        { t: "Contarle la historia completa", d: { rep: 3, red: 2, msg: "Le cuentas cómo fue el examen, sin adornos. Le gusta más la historia que el registro." } },
        { t: "Responder solo lo que pregunta", d: { cri: 2, rep: 1, msg: "Respuestas cortas y exactas. Firma la semana siguiente." } },
      ] },
    { id: 11155, por: "Presentaste por fin el examen de idoneidad", t: "Aprobado, con lo justo",
      x: "Los resultados tardaron, pero ahí está tu nombre: aprobado, con lo justo. Ya puedes firmar operaciones a tu nombre.",
      o: [
        { t: "Firmar tu primera operación propia", d: { cash: 4000, car: 3, rep: 2, deja: "l1_licencia_propia", msg: "Tu firma, tu responsabilidad, tu comisión entera. Se siente distinto." } },
        { t: "Enmarcar el certificado y seguir igual", d: { rep: 1, ene: 2, deja: "l1_licencia_propia", msg: "El certificado queda en la pared. Las operaciones, por ahora, siguen siendo las mismas." } },
      ] },
    { id: 11156, por: "Presentaste por fin el examen de idoneidad", t: "Reprobaste el primer intento",
      x: "No alcanzó. El registro público ahora dice que reprobaste una vez, y te queda un solo intento.",
      o: [
        { t: "Pagar un tutor y presentar el segundo", d: { cash: -2000, cri: 3, ene: -4, deja: "l1_licencia_propia", msg: "Estudias en serio y apruebas por poco. El registro guarda los dos intentos, como un tatuaje." } },
        { t: "Dejarlo para más adelante", d: { ene: 2, rep: -2, msg: "Lo dejas. El registro, en cambio, no deja nada." } },
      ] },

    /* ===== 116 Tu propia tesis frente al comité ===== */
    { id: 11160, por: "Propusiste sobreponderar un sector completo", t: "El sector se desploma",
      x: "El sector de tu tesis cae en un trimestre lo que subió en dos años. El comité pide una reunión extraordinaria, y ya sabes quién la abre.",
      o: [
        { t: "Llevar un plan de salida ordenada", d: { cri: 3, rep: 1, ene: -3, msg: "Propones salir por tramos. El comité respira y aprueba en veinte minutos." } },
        { t: "Defender que es ruido y aguantar", d: { rep: -1, ene: -3, msg: "Dices que es ruido. Algunos te creen; todos te miran.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 45, id: 11164, bueno: true }, { p: 55, id: 11165, bueno: false }] }] } },
      ] },
    { id: 11161, por: "Propusiste tu tesis como un piloto pequeño", t: "El comité quiere escalar el piloto",
      x: "El piloto rindió bien y ahora el comité quiere multiplicarlo por diez, justo cuando el sector ya está caro.",
      o: [
        { t: "Escalarlo ya", d: { car: 2, ene: -2, msg: "Escalas. El comité está feliz; tú, un poco nervioso.",
          luego: [{ en: 1, azar: [{ p: 40, id: 11164 }, { p: 60, id: 11165 }] }] } },
        { t: "Escalarlo de a poco", d: { cri: 3, rep: 1, msg: "Subes en tres pasos. Nadie se emociona, nadie se quema." } },
        { t: "Decir que la oportunidad ya pasó", d: { cri: 4, rep: -1, msg: "Le dices al comité que llegó tarde a su propia idea. Lo acepta, sin cariño." } },
      ] },
    { id: 11162, por: "Propusiste sobreponderar un sector completo", t: "Te copian la tesis",
      x: "Un competidor publica una tesis casi idéntica a la tuya, con mejores gráficos. La prensa se la atribuye a él.",
      o: [
        { t: "Publicar tu versión con fecha", d: { rep: 3, ene: -2, red: -1, msg: "Publicas tu documento con la fecha en la portada. Los que saben, saben." } },
        { t: "Dejarlo: el dinero es lo que cuenta", d: { ene: 2, cri: 1, msg: "Que él se quede con la prensa. Tú te quedas con el rendimiento, si lo hay." } },
      ] },
    { id: 11163, por: "Defendiste una tesis sectorial con todo el rigor", t: "El comité quiere otra idea grande",
      x: "El comité quiere otra tesis tuya para el próximo año, como si las ideas se encargaran por catálogo.",
      o: [
        { t: "Traer una nueva con el mismo rigor", d: { mod: 3, cri: 3, ene: -5, msg: "Tres meses de trabajo para una idea nueva. Es buena; no tan buena como la primera." } },
        { t: "Decir que todavía no tienes una buena", d: { cri: 4, rep: 1, car: -1, msg: "Dices que no hay tesis por obligación. Un par te respeta más; otro par, menos." } },
      ] },
    { id: 11164, por: "Te jugaste más fuerte por tu sector", t: "El sector rebota",
      x: "El sector vuelve a subir y tu posición termina en ganancia. En el comité, alguien dice que siempre lo supo.",
      o: [
        { t: "Tomar parte de la ganancia", d: { cash: 6000, cri: 3, rep: 2, msg: "Sacas una parte y dejas correr el resto. El comité lo llama disciplina; tú, alivio." } },
        { t: "Pedir más tamaño", d: { car: 3, rep: 2, cri: -2, msg: "Te dan más tamaño. Ahora tu nombre y el del sector son la misma cosa." } },
      ] },
    { id: 11165, por: "Te jugaste más fuerte por tu sector", t: "El sector no vuelve",
      x: "El sector sigue cayendo un año entero. Tu tesis pasa de ser la idea del año a ser el ejemplo que se cita en la capacitación de los nuevos.",
      o: [
        { t: "Asumirlo ante el comité", d: { rep: -2, cri: 4, msg: "Presentas tus errores con la misma claridad que la tesis. Te sobrevive el respeto, no el mandato." } },
        { t: "Culpar al ciclo", d: { rep: -5, car: -2, msg: "El ciclo no asiste al comité. Tú sí." } },
      ] },

    /* ===== 117 El dominó antes del negocio ===== */
    { id: 11170, por: "Jugaste dominó con el dueño de una empresa familiar", t: "Falta uno para la partida",
      x: "El dueño de aquella empresa familiar te llama un sábado. Falta uno para la mesa de dominó y pensó en ti antes que en su cuñado.",
      o: [
        { t: "Ir y jugar", d: { red: 4, ene: -1, msg: "Llevas hielo y paciencia. En la mesa hay tres empresarios y ningún apuro.",
          luego: [{ en: 1, azar: [{ p: 55, id: 11174 }, { p: 45, id: 11175 }] }] } },
        { t: "Excusarte con cariño", d: { red: -1, ene: 2, msg: "Le dices que tienes un compromiso. Llama al cuñado, que juega peor y habla más." } },
      ] },
    { id: 11171, por: "Negociaste con una empresa familiar", t: "El hijo toma el mando",
      x: "El dueño de aquella empresa familiar le pasa el mando a su hijo. El hijo no juega dominó y lee todos los contratos con su abogado.",
      o: [
        { t: "Empezar de cero con el hijo", d: { cri: 2, red: 2, ene: -3, msg: "Le presentas todo otra vez, con anexos. Lo valora, aunque no lo diga." } },
        { t: "Pedirle al padre que te presente bien", d: { red: 3, rep: -1, msg: "El padre te presenta como de la familia. Al hijo eso no le gusta nada." } },
      ] },
    { id: 11172, por: "Negociaste con una empresa familiar", t: "Un amigo del dueño quiere conocerte",
      x: "Un amigo del dueño, con otra empresa familiar, quiere conocerte. Dice que el dueño habla de ti en la mesa, a veces bien.",
      o: [
        { t: "Ir a conocerlo", d: { red: 4, cash: 3000, ene: -2, msg: "Te recibe en su casa. No hay dominó; hay barajas. Sales con un encargo." } },
        { t: "Pedir que te mande la información primero", d: { cri: 2, red: -1, msg: "Te manda tres hojas mal escaneadas. El negocio existe; la química, todavía no." } },
      ] },
    { id: 11173, por: "Negociaste con una empresa familiar", t: "El dueño dice que confió de más",
      x: "El dueño de aquella empresa dice que el negocio no rindió lo prometido. Que confió en ti más de la cuenta, y lo dice delante de su familia.",
      o: [
        { t: "Sentarte a revisar los números con él", d: { cri: 3, red: 2, ene: -3, msg: "Una tarde entera de números. El negocio rindió menos, pero no por lo que él creía." } },
        { t: "Mandarle el informe por correo", d: { red: -3, ene: 1, msg: "El informe es impecable. Él no lo abre: quería que fueras." } },
      ] },
    { id: 11174, por: "Volviste a la mesa de dominó del empresario", t: "De aquella mesa sale un negocio",
      x: "Uno de los que jugaban aquel sábado vende su empresa. Quiere que lo asesores tú, porque en la mesa no hiciste trampa.",
      o: [
        { t: "Tomar el mandato", d: { cash: 6000, red: 3, msg: "Firmas entre ficha y ficha. Hay oficinas que no tienen paredes." } },
        { t: "Tomarlo, pero con contrato formal", d: { cash: 5000, rep: 2, cri: 2, msg: "Le pides contrato. Se ríe, firma y te dice que eso también es saber jugar." } },
      ] },
    { id: 11175, por: "Volviste a la mesa de dominó del empresario", t: "Le ganaste a quien no sabe perder",
      x: "Aquel sábado le ganaste tres partidas al socio del dueño. Te lo cruzas en un negocio y todavía se acuerda del marcador.",
      o: [
        { t: "Ofrecerle la revancha", d: { red: 3, ene: -1, msg: "Juegan otra vez. Pierdes a propósito, él lo sabe y te lo agradece." } },
        { t: "Hablar solo de negocios", d: { red: -2, cri: 2, msg: "Te atiende con frialdad. El negocio sigue; la partida no termina nunca." } },
      ] },

    /* ===== 118 Pulso con el comprador estratégico ===== */
    { id: 11180, por: "Negociaste con un comprador estratégico", t: "El veterano te manda un cliente",
      x: "El director de fusiones de aquel comprador recomienda tu nombre a un amigo que vende su empresa. Prefiere tenerte de su lado que enfrente.",
      o: [
        { t: "Tomar el mandato", d: { cash: 6000, red: 3, ene: -2, msg: "El amigo llega con una carpeta ordenada y mucha prisa. Trabajas para la gente de tu antiguo rival." } },
        { t: "Tomarlo y cobrar más caro", d: { cash: 9000, red: -1, ene: -2, msg: "Acepta el precio. El veterano se entera y sonríe: eso era lo que quería ver." } },
      ] },
    { id: 11181, por: "Negociaste con un comprador estratégico", t: "El comprador no quiere verte más",
      x: "El comprador de aquel proceso dice en una conferencia que no vuelve a sentarse contigo. Lo dice con tu nombre y apellido.",
      o: [
        { t: "Llamarlo y aclarar las cosas", d: { red: 2, ene: -2, msg: "Primero te atiende su asistente. Dos semanas después, él. La conversación es tensa y útil." } },
        { t: "Usarlo como carta de presentación", d: { rep: 3, red: -3, msg: "Si un comprador no te quiere enfrente, defendiste bien a tu cliente. Lo repites en cada reunión." } },
      ] },
    { id: 11182, por: "Llevaste a un comprador estratégico a competir", t: "Un postor perdedor vuelve",
      x: "Uno de los competidores que trajiste a aquel proceso perdió, pero quiere comprar otra empresa. Y te quiere a ti al frente.",
      o: [
        { t: "Aceptar el mandato", d: { cash: 5000, red: 2, ene: -2, msg: "El que perdió contigo ahora gana contigo. Aprendió más que el que ganó." } },
        { t: "Rechazarlo por tu cliente de entonces", d: { rep: 3, ene: 1, msg: "Le dices que no por respeto al proceso. Te respeta más, y no vuelve a llamar." } },
      ] },
    { id: 11183, por: "Negociaste con un comprador estratégico", t: "Una cláusula que nadie miró",
      x: "En aquel contrato hay una cláusula de ajuste de precio que pasó sin discusión. El comprador la quiere activar ahora.",
      o: [
        { t: "Pelear la interpretación", d: { cri: 3, ene: -4, msg: "Te sientas con los abogados a leer comas. La disputa va a un árbitro.",
          luego: [{ en: 1, s: "cri", azar: [{ p: 50, id: 11184, bueno: true }, { p: 50, id: 11185, bueno: false }] }] } },
        { t: "Negociar un punto medio", d: { rep: 1, red: 2, cash: -1000, msg: "Cedes un poco de tu comisión para que se repartan la diferencia. Nadie gana, que aquí es ganar." } },
      ] },
    { id: 11184, por: "Llevaste una cláusula a un arbitraje", t: "El árbitro te da la razón",
      x: "El árbitro lee la cláusula como la leíste tú. El comprador pierde y tu antiguo cliente te manda una carta escrita a mano.",
      o: [
        { t: "Guardar la carta y seguir", d: { rep: 3, ene: 2, msg: "La carta va al cajón de las cosas que no se tiran." } },
        { t: "Escribir sobre el caso", d: { rep: 4, red: 2, ene: -2, msg: "Publicas un análisis de la cláusula. Tres firmas la cambian en sus contratos al mes siguiente." } },
      ] },
    { id: 11185, por: "Llevaste una cláusula a un arbitraje", t: "El árbitro favorece al comprador",
      x: "El árbitro lee la cláusula al revés que tú. Tu antiguo cliente paga el ajuste y te pregunta, muy amable, por qué no la viste antes.",
      o: [
        { t: "Asumir que debiste verla", d: { rep: -1, cri: 3, msg: "Le dices que sí, que debiste. Desde entonces lees las cláusulas de ajuste dos veces." } },
        { t: "Culpar a los abogados", d: { rep: -3, red: -2, msg: "Los abogados te culpan a ti. Todos tienen un poco de razón." } },
      ] },

    /* ===== 119 La silla del socio se decide en la mesa (empleado) ===== */
    { id: 11190, por: "Competiste por una silla de socio", t: "El otro candidato sigue en la firma", empleado: true,
      x: "El que compitió contigo por aquella silla sigue en la firma. Ahora necesitas a su equipo para un mandato, y él lo sabe.",
      o: [
        { t: "Pedírselo de frente", d: { red: 3, rep: 2, msg: "Te lo presta sin rencor aparente. Lo aparente es lo que te preocupa." } },
        { t: "Ir por encima de él", d: { car: 2, red: -4, msg: "El socio director te da el equipo. El otro candidato te da los buenos días con cuidado." } },
        { t: "Armar tu propio equipo", d: { ene: -5, mod: 2, car: 1, msg: "Juntas a dos analistas sueltos. Es más lento, pero nadie te debe nada ni le debes a nadie." } },
      ] },
    { id: 11191, por: "Jugaste con el socio director y te dejaste leer", t: "El socio director saca otra vez el juego", empleado: true,
      x: "Un viernes, el socio director vuelve a sacar el juego. Esta vez el invitado es un cliente importante, y quiere que juegues tú.",
      o: [
        { t: "Jugar como aquella vez", d: { red: 4, ene: -1, msg: "Juegas y conversas. El cliente se ríe; el socio director observa.",
          luego: [{ en: 1, azar: [{ p: 55, id: 11194 }, { p: 45, id: 11195 }] }] } },
        { t: "Hablar de negocios desde el principio", d: { cri: 2, rep: 1, red: -1, msg: "El cliente aprecia la eficiencia. El socio director guarda el juego sin decir nada." } },
      ] },
    { id: 11192, por: "Competiste por una silla de socio", t: "Ahora te toca decidir a ti", empleado: true,
      x: "Te toca decidir una promoción: dos candidatos y la tentación de hacerles la misma prueba que te hicieron a ti.",
      o: [
        { t: "Hacerles la prueba del juego", d: { red: 2, cri: -1, msg: "Sacas el juego. Uno de los dos se pone tan nervioso que pierde contra sí mismo." } },
        { t: "Evaluarlos solo por resultados", d: { cri: 3, rep: 1, msg: "Una planilla, dos columnas, cero juegos. Gana el de mejores números y peores chistes." } },
        { t: "Combinar las dos cosas", d: { rep: 2, ene: -2, cri: 1, msg: "Números y una cena. Tardas más, pero eliges con los dos ojos." } },
      ] },
    { id: 11193, por: "Competiste por una silla de socio", t: "Te cuentan lo que anotó el socio", empleado: true,
      x: "Meses después, un socio te cuenta qué anotó sobre ti el socio director aquella noche. No todo es elogio.",
      o: [
        { t: "Pedir que te lo cuente entero", d: { cri: 3, ene: -2, msg: "Escuchas todo, también lo que duele. Desde entonces juegas un poco menos a la defensiva." } },
        { t: "Preferir no saberlo", d: { ene: 2, msg: "Cambias de tema. Hay notas que es mejor no leer." } },
      ] },
    { id: 11194, por: "Jugaste con un cliente en la mesa del socio", t: "El cliente firma después de la partida", empleado: true,
      x: "El cliente de aquel viernes firma un mandato grande con la firma y pide que lo lleves tú. El socio director lo anuncia sin sorpresa.",
      o: [
        { t: "Llevarlo con todo", d: { cash: 6000, car: 3, ene: -4, msg: "Es tu mandato más grande. Y empezó con una partida." } },
        { t: "Compartirlo con el otro candidato", d: { red: 4, rep: 2, cash: 3000, msg: "Le das al otro una parte. Ahora te debe una, y en esta firma eso es moneda." } },
      ] },
    { id: 11195, por: "Jugaste con un cliente en la mesa del socio", t: "El cliente se aburrió en la mesa", empleado: true,
      x: "El cliente de aquel viernes contrató a otra firma. Le contó a un conocido que vino a hablar de negocios y lo pusieron a jugar.",
      o: [
        { t: "Asumirlo ante el socio director", d: { rep: 1, cri: 2, msg: "Le dices que leíste mal al cliente. Él responde que el juego era idea suya." } },
        { t: "Llamar al cliente y ofrecer otra reunión", d: { red: 2, ene: -2, msg: "Acepta un café, sin juego. No firma, pero vuelve a contestar tus llamadas." } },
      ] },

    /* ===== 120 Te ofrecen dirigir la oficina de otro país (empleado) ===== */
    { id: 11200, por: "Aceptaste dirigir la oficina de otro país", t: "La oficina necesita otro año", empleado: true,
      x: "La oficina que montaste afuera necesita otro año de inversión antes de dar ganancia. En la casa matriz empiezan a dudar.",
      o: [
        { t: "Defender el plan con números", d: { mod: 3, cri: 2, ene: -3, msg: "Presentas un plan mes por mes. Te dan el año, con una condición en letra pequeña.",
          luego: [{ en: 1, s: "mod", azar: [{ p: 55, id: 11205, bueno: true }, { p: 45, id: 11206, bueno: false }] }] } },
        { t: "Recortar equipo para mostrar ganancia", d: { car: 2, red: -4, rep: -2, msg: "La ganancia aparece en el papel. Los que despediste te saludan en el supermercado, más o menos." } },
      ] },
    { id: 11201, por: "Aceptaste dirigir la oficina de otro país", t: "Un banco local quiere a tu equipo", empleado: true,
      x: "Un banco local ofrece contratar a todo tu equipo de un golpe. Te enteras porque uno de ellos te lo contó, que ya es buena señal.",
      o: [
        { t: "Pelear por subirles el sueldo", d: { red: 3, car: -1, ene: -3, msg: "Tres llamadas tensas a la casa matriz y hay aumento para todos. Se quedan, y saben por quién." } },
        { t: "Dejar ir a los que quieran", d: { cri: 2, red: -2, ene: -2, msg: "Se van dos y se quedan cinco. Los cinco valen más que los siete." } },
      ] },
    { id: 11202, por: "Te quedaste a consolidar en vez de irte afuera", t: "Quien fue en tu lugar vuelve", empleado: true,
      x: "La persona que aceptó la oficina de afuera vuelve con galones, y la ponen a cargo de un área al lado de la tuya.",
      o: [
        { t: "Felicitarla y trabajar con ella", d: { red: 3, ene: -1, msg: "La felicitas en serio. A los seis meses ya tienen dos clientes en común." } },
        { t: "Marcar territorio desde el primer día", d: { car: 2, red: -3, rep: -1, msg: "Le dejas claro dónde termina su área. Ella toma nota, y tu jefe también." } },
      ] },
    { id: 11203, por: "Te quedaste a consolidar en vez de irte afuera", t: "La franquicia local crece", empleado: true,
      x: "Tu negocio local tuvo su mejor año. Te ofrecen más responsabilidad sin salir del país, y más horas sin salir de la oficina.",
      o: [
        { t: "Aceptar", d: { car: 4, cash: 4000, ene: -5, msg: "Más equipo, más clientes, más reuniones. El crecimiento se nota en la agenda antes que en el sueldo." } },
        { t: "Pedir equipo antes de aceptar", d: { cri: 2, car: 2, ene: -1, msg: "Pides dos personas antes de firmar. Te dan una y media, que en esta firma es generosidad." } },
      ] },
    { id: 11204, por: "Recibiste la oferta de dirigir la oficina de afuera", t: "Un cliente te sigue a donde vayas", empleado: true,
      x: "Un cliente grande dice que trabaja contigo y no con la firma. Le da igual en qué país estés, siempre que le contestes.",
      o: [
        { t: "Atenderlo en persona", d: { cash: 4000, red: 3, ene: -3, msg: "Contestas a cualquier hora. El cliente lo agradece; tu sueño, no tanto." } },
        { t: "Presentarle a tu equipo", d: { red: 2, rep: 2, ene: 1, msg: "Le presentas a dos personas de confianza. Primero desconfía; luego ya no te llama tanto." } },
      ] },
    { id: 11205, por: "Pediste un año más para la oficina de afuera", t: "La oficina da ganancia", empleado: true,
      x: "El año extra funcionó: la oficina de afuera da ganancia y ya tiene clientes propios. Puedes volver con galones o quedarte un poco más.",
      o: [
        { t: "Volver con los galones", d: { car: 5, rep: 4, deja: "l1_galones", msg: "Vuelves con una oficina rentable en el currículum. Esos galones no se discuten." } },
        { t: "Quedarte a consolidarla", d: { cash: 6000, red: 3, ene: -3, deja: "l1_galones", msg: "Te quedas un año más. Ya es tu oficina, aunque el letrero diga otra cosa." } },
      ] },
    { id: 11206, por: "Pediste un año más para la oficina de afuera", t: "La casa matriz cierra la oficina", empleado: true,
      x: "La casa matriz decide cerrar la oficina de afuera antes de tiempo. Vuelves con buenos contactos, un idioma mejorado y sin galones.",
      o: [
        { t: "Volver y empezar de nuevo", d: { car: -3, red: 3, cri: 2, msg: "Vuelves a tu escritorio de antes. Alguien lo usó mientras no estabas y dejó la silla baja." } },
        { t: "Pedir un cargo regional con esos clientes", d: { car: 1, red: 2, ene: -3, msg: "Te dan un cargo regional con viajes y sin oficina. Los clientes de afuera siguen contigo." } },
      ] },
  ],

  raices: {
    /* 101 La cifra que va en la portada */
    "101": {
      "0": { deja: "l1_calzaste_precio", luego: [{ en: 2, azar: [{ p: 40, id: 11010 }, { p: 30, id: 11012 }, { p: 30, id: 11013 }] }] },
      "1": { deja: "l1_blindaste_modelo", luego: [{ en: 2, azar: [{ p: 40, id: 11011 }, { p: 25, id: 11012 }, { p: 20, id: 11013 }, { p: 15, id: 11010 }] }] },
    },
    /* 102 Tres días de due diligence */
    "102": {
      "0": { deja: "l1_legajo_completo", luego: [{ en: 1, azar: [{ p: 40, id: 11021 }, { p: 35, id: 11023 }, { p: 25, id: 11020 }] }] },
      "1": { deja: "l1_atajo_dd", luego: [{ en: 1, azar: [{ p: 35, id: 11020 }, { p: 30, id: 11022 }, { p: 20, id: 11021 }, { p: 15, id: 11023 }] }] },
    },
    /* 103 Negociación de honorarios */
    "103": {
      "0": { deja: "l1_anclaste_alto", luego: [{ en: 1, azar: [{ p: 30, id: 11030 }, { p: 20, id: 11031 }, { p: 20, id: 11032 }, { p: 30, id: 11033 }] }] },
      "1": { deja: "l1_cifra_unica", luego: [{ en: 1, azar: [{ p: 35, id: 11031 }, { p: 25, id: 11033 }, { p: 25, id: 11032 }, { p: 15, id: 11030 }] }] },
    },
    /* 104 La posición que ya dio mucho */
    "104": {
      "0": { deja: "l1_dejaste_correr", luego: [{ en: 1, azar: [{ p: 30, id: 11040 }, { p: 35, id: 11041 }, { p: 35, id: 11042 }] }] },
      "1": { deja: "l1_saliste_tramos", luego: [{ en: 1, azar: [{ p: 35, id: 11040 }, { p: 20, id: 11041 }, { p: 45, id: 11043 }] }] },
    },
    /* 105 Comité de crédito */
    "105": {
      "0": { deja: "l1_contraparte", luego: [{ en: 1, azar: [{ p: 30, id: 11051 }, { p: 30, id: 11053 }, { p: 20, id: 11050 }, { p: 20, id: 11052 }] }] },
      "1": { deja: "l1_de_memoria", luego: [{ en: 1, azar: [{ p: 35, id: 11050 }, { p: 30, id: 11052 }, { p: 20, id: 11053 }, { p: 15, id: 11051 }] }] },
    },
    /* 106 Subasta competitiva */
    "106": {
      "0": { deja: "l1_precio_firme", luego: [{ en: 1, azar: [{ p: 35, id: 11062 }, { p: 25, id: 11060 }, { p: 25, id: 11061 }, { p: 15, id: 11063 }] }] },
      "1": { deja: "l1_segunda_vuelta", luego: [{ en: 1, azar: [{ p: 30, id: 11062 }, { p: 25, id: 11063 }, { p: 25, id: 11061 }, { p: 20, id: 11060 }] }] },
    },
    /* 107 El pitch al comité de inversión */
    "107": {
      "0": { deja: "l1_ensayaste", luego: [{ en: 1, azar: [{ p: 35, id: 11070 }, { p: 25, id: 11073 }, { p: 20, id: 11072 }, { p: 20, id: 11071 }] }] },
      "1": { deja: "l1_improvisaste", luego: [{ en: 1, azar: [{ p: 35, id: 11073 }, { p: 30, id: 11071 }, { p: 20, id: 11070 }, { p: 15, id: 11072 }] }] },
    },
    /* 108 Papel distressed a treinta centavos */
    "108": {
      "0": { deja: "l1_compraste_distressed", luego: [{ en: 2, s: "cri", azar: [{ p: 40, id: 11081, bueno: true }, { p: 35, id: 11080, bueno: false }, { p: 25, id: 11083 }] }] },
      "1": { deja: "l1_vendiste_tesis", luego: [{ en: 2, azar: [{ p: 40, id: 11082 }, { p: 30, id: 11086 }, { p: 30, id: 11083 }] }] },
    },
    /* 109 Auditoría regulatoria sorpresa */
    "109": {
      "0": { deja: "l1_trazabilidad_memoria", luego: [{ en: 1, azar: [{ p: 40, id: 11090 }, { p: 30, id: 11092 }, { p: 30, id: 11091 }] }] },
      "1": { deja: "l1_ordenaste_expedientes", luego: [{ en: 1, azar: [{ p: 40, id: 11093 }, { p: 30, id: 11091 }, { p: 30, id: 11092 }] }] },
    },
    /* 110 Fijar el rango de precio de la colocación */
    "110": {
      "0": { deja: "l1_leiste_libro", luego: [{ en: 1, azar: [{ p: 40, id: 11102 }, { p: 30, id: 11100 }, { p: 30, id: 11103 }] }] },
      "1": { deja: "l1_sondeaste_anclas", luego: [{ en: 1, azar: [{ p: 35, id: 11101 }, { p: 30, id: 11102 }, { p: 20, id: 11100 }, { p: 15, id: 11103 }] }] },
    },
    /* 111 Primer cierre de tu fondo */
    "111": {
      "0": { deja: "l1_peso_ancla", luego: [{ en: 1, azar: [{ p: 40, id: 11110 }, { p: 25, id: 11111 }, { p: 20, id: 11113 }, { p: 15, id: 11112 }] }] },
      "1": { deja: "l1_aguantaste_ronda", luego: [{ en: 1, azar: [{ p: 30, id: 11111 }, { p: 30, id: 11112 }, { p: 25, id: 11113 }, { p: 15, id: 11110 }] }] },
    },
    /* 112 Dos cierres el mismo viernes */
    "112": {
      "0": { deja: "l1_dos_cierres", luego: [{ en: 1, azar: [{ p: 35, id: 11120 }, { p: 35, id: 11122 }, { p: 30, id: 11123 }] }] },
      "1": { deja: "l1_delegaste", luego: [{ en: 1, azar: [{ p: 45, id: 11121 }, { p: 15, id: 11120 }, { p: 20, id: 11122 }, { p: 20, id: 11123 }] }] },
    },
    /* 113 Reasignar tu portafolio antes del cierre de año */
    "113": {
      "0": { deja: "l1_tesis_propia", luego: [{ en: 1, azar: [{ p: 35, id: 11130 }, { p: 35, id: 11131 }, { p: 30, id: 11132 }] }] },
      "1": { deja: "l1_indexado", luego: [{ en: 1, azar: [{ p: 30, id: 11130 }, { p: 30, id: 11132 }, { p: 40, id: 11133 }] }] },
    },
    /* 114 El director de inversiones del fondo te pone a prueba */
    "114": {
      "0": { deja: "l1_examen_sin_red", luego: [{ en: 1, azar: [{ p: 40, id: 11140 }, { p: 30, id: 11141 }, { p: 30, id: 11142 }] }] },
      "1": { deja: "l1_cediste_jefe", luego: [{ en: 1, azar: [{ p: 35, id: 11143 }, { p: 35, id: 11142 }, { p: 30, id: 11141 }] }] },
    },
    /* 115 Examen de idoneidad del regulador */
    "115": {
      "0": { deja: "l1_presentaste_examen", luego: [{ en: 1, azar: [{ p: 35, id: 11153 }, { p: 35, id: 11154 }, { p: 30, id: 11152 }] }] },
      "1": { deja: "l1_postergaste_licencia", luego: [{ en: 1, azar: [{ p: 40, id: 11150 }, { p: 35, id: 11151 }, { p: 25, id: 11152 }] }] },
    },
    /* 116 Tu propia tesis frente al comité */
    "116": {
      "0": { deja: "l1_tesis_sector", luego: [{ en: 1, azar: [{ p: 35, id: 11160 }, { p: 25, id: 11162 }, { p: 40, id: 11163 }] }] },
      "1": { deja: "l1_piloto", luego: [{ en: 1, azar: [{ p: 45, id: 11161 }, { p: 30, id: 11160 }, { p: 25, id: 11162 }] }] },
    },
    /* 117 El dominó antes del negocio */
    "117": {
      "0": { deja: "l1_domino", luego: [{ en: 1, azar: [{ p: 40, id: 11170 }, { p: 30, id: 11172 }, { p: 15, id: 11171 }, { p: 15, id: 11173 }] }] },
      "1": { deja: "l1_directo_propuesta", luego: [{ en: 1, azar: [{ p: 40, id: 11171 }, { p: 35, id: 11173 }, { p: 25, id: 11172 }] }] },
    },
    /* 118 Pulso con el comprador estratégico */
    "118": {
      "0": { deja: "l1_pulso", luego: [{ en: 1, azar: [{ p: 30, id: 11180 }, { p: 30, id: 11181 }, { p: 40, id: 11183 }] }] },
      "1": { deja: "l1_proceso_competitivo", luego: [{ en: 1, azar: [{ p: 35, id: 11182 }, { p: 25, id: 11181 }, { p: 20, id: 11183 }, { p: 20, id: 11180 }] }] },
    },
    /* 119 La silla del socio se decide en la mesa */
    "119": {
      "0": { deja: "l1_te_dejaste_leer", luego: [{ en: 1, azar: [{ p: 35, id: 11191 }, { p: 25, id: 11190 }, { p: 20, id: 11192 }, { p: 20, id: 11193 }] }] },
      "1": { deja: "l1_track_record", luego: [{ en: 1, azar: [{ p: 35, id: 11190 }, { p: 35, id: 11193 }, { p: 30, id: 11192 }] }] },
    },
    /* 120 Te ofrecen dirigir la oficina de otro país */
    "120": {
      "0": { deja: "l1_oficina_afuera", luego: [{ en: 2, azar: [{ p: 40, id: 11200 }, { p: 30, id: 11201 }, { p: 30, id: 11204 }] }] },
      "1": { deja: "l1_te_quedaste", luego: [{ en: 2, azar: [{ p: 40, id: 11203 }, { p: 35, id: 11202 }, { p: 25, id: 11204 }] }] },
    },
  },

  finales: [
    { id: "l1_mesa", huellas: ["l1_domino", "l1_te_dejaste_leer"], t: "Los negocios se cierran en la mesa",
      x: "Jugaste dominó con dueños de empresas y dejaste que el socio director te leyera en la mesa. Cerraste más negocios entre fichas que en salas de juntas." },
    { id: "l1_aguante", huellas: ["l1_dejaste_correr", "l1_compraste_distressed"], t: "Dejaste correr lo que otros vendían",
      x: "Aguantaste una ganadora cuando todos vendían y un bono en problemas cuando nadie lo quería. Tu dinero aprendió a esperar antes que tú." },
    { id: "l1_celda", huellas: ["l1_blindaste_modelo", "l1_legajo_completo"], t: "Celda por celda",
      x: "Blindaste modelos y peinaste revisiones enteras cuando había atajos. Nadie te recuerda por rápido; todos te recuerdan por no equivocarte." },
  ],
};
