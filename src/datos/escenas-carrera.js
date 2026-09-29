import { RAMAS } from "./bienes-y-ramas.js";

/* ---------- eventos de semestre, muchos con juego rápido ---------- */
export const E = [
  { id: 1, min: 0, max: 2, t: "Un DCF para mañana a las ocho", x: "Once de la noche. El VP deja una carpeta encima de tu teclado y dice que el cliente quiere el modelo antes del desayuno.",
    o: [
      { t: "Amanecerte y entregarlo impecable", d: { mod: 6, car: 3, ene: -18, rep: 3, msg: "Entregas a las 7:40 con las tres sensibilidades corridas. El VP no dice nada, que aquí significa que quedó bien." } },
      { t: "Armarlo rápido y confiar en tu ojo", j: "calculo", stat: "mod", d: { mod: 4, car: 2, ene: -6, msg: "Corres los números de cabeza para no perder tiempo abriendo el modelo entero." } },
      { t: "Pedir ayuda y repartir el trabajo", d: { red: 4, rep: -2, ene: -4, cri: 2, msg: "Te consiguen apoyo. Tu jefe toma nota, aunque no queda claro de qué lado." } },
    ] },
  { id: 2, min: 0, max: 3, t: "El error ya salió por correo", x: "El modelo que se envió al cliente tiene la deuda neta mal sumada. La diferencia mueve el equity value casi 10%.",
    o: [
      { t: "Avisar de inmediato, aunque duela", d: { rep: 7, cri: 6, ene: -5, car: 2, msg: "Incómodo durante una hora, respetado durante años. La corrección sale el mismo día." } },
      { t: "Encontrar todos los errores antes de que los encuentren ellos", j: "ojo", stat: "mod", d: { mod: 5, rep: 4, cri: 3, msg: "Te encierras a revisar celda por celda antes de que alguien más lo note." } },
    ] },
  { id: 3, min: 0, max: 2, t: "Café con el socio", x: "El socio director te encuentra en la cafetería y se sienta contigo. Tienes doce minutos de su atención completa.",
    o: [
      { t: "Preguntarle por el negocio y escuchar", d: { red: 7, cri: 4, msg: "Te cuenta cómo levantó su primer mandato. Aprendes más que en dos meses de Excel." } },
      { t: "Soltarle una idea de originación tuya", min: { red: 24 }, j: "reaccion", stat: "red", d: { red: 5, rep: 5, car: 4, msg: "Tienes una ventana de segundos para meter la idea sin que suene forzado." } },
    ] },
  { id: 4, min: 0, max: 4, t: "Certificación de por medio", x: "Se abre la inscripción. Cuesta plata, quita fines de semana y no garantiza nada.",
    o: [
      { t: "Inscribirte y estudiar en serio", min: { cri: 18 }, j: "quiz", stat: "cri", d: { cash: -1600, mod: 7, cri: 5, ene: -10, car: 3, msg: "Seis meses de sábados perdidos y el examen encima." } },
      { t: "Saltarlo, tu escuela es la mesa", d: { ene: 4, msg: "Decides que el aprendizaje viene de los mandatos. Tampoco es mala tesis." } },
    ] },
  { id: 5, min: 0, max: 3, t: "Cierre de operación, fiesta en el bar", x: "Firmaron. Todo el equipo se va a celebrar y estarán los del fondo comprador.",
    o: [
      { t: "Ir y quedarte hasta el final", d: { red: 8, ene: -9, rep: 2, msg: "Terminas hablando de mineras con un principal de un fondo. Se guarda tu número." } },
      { t: "Aparecerte una hora y dormir", d: { red: 3, ene: 6, msg: "Saludas, brindas, te vas. El equilibrio también es una habilidad." } },
      { t: "Quedarte a adelantar el próximo pitch", d: { mod: 4, car: 2, ene: -7, red: -3, msg: "El lunes tienes ventaja. El viernes tuviste soledad." } },
    ] },
  { id: 6, min: 0, max: 2, t: "El data room es un desastre", x: "Cuatrocientos archivos sin nombrar. Alguien tiene que ordenarlos y ese alguien tiene tu cargo.",
    o: [
      { t: "Armar un índice maestro que sirva a todos", min: { mod: 28 }, j: "orden", stat: "cri", d: { mod: 5, rep: 5, ene: -10, car: 3, msg: "Ordenas el desastre siguiendo la lógica del proceso." } },
      { t: "Revisar solo lo que te pidieron", d: { ene: -3, car: 1, msg: "Cumples. Nada más y nada menos." } },
    ] },
  { id: 7, clave: true, min: 1, max: 4, t: "Te llama un headhunter", x: "Una firma más grande ofrece 40% más de sueldo y el doble de horas.",
    o: [
      { t: "Aceptar y mudarte de firma", d: { cash: 4000, ene: -10, rep: -4, car: 6, red: 5, msg: "Nueva placa en la puerta, mismo Excel. Tu antigua red se enfría un poco." } },
      { t: "Usarla para negociar donde estás", min: { red: 20 }, j: "anclaje", stat: "red", d: { cash: 3000, rep: 3, car: 3, msg: "Entras a la oficina del socio con una oferta en la mano y un número en la cabeza." } },
      { t: "Decir que no y contarlo abiertamente", d: { rep: 7, red: 3, msg: "La lealtad se cotiza distinto en las firmas pequeñas. Aquí sube." } },
    ] },
  { id: 8, min: 0, max: 4, t: "Un rumor que vale plata", x: "Escuchas en un pasillo que una empresa listada recibirá una oferta el mes que viene. Tu cuenta personal está a un clic.",
    o: [
      { t: "No tocar nada y anotarlo en el registro", d: { rep: 8, cri: 7, msg: "Compliance te lo agradece por escrito. Duermes tranquilo, que en esto es patrimonio." } },
      { t: "Comprar una posición pequeña", chk: { s: "cri", dif: 80, ok: { cash: 11000, rep: -6, msg: "Ganas plata y una ansiedad crónica que no aparece en el estado de cuenta." }, no: { cash: -8000, rep: -30, msg: "El regulador cruza operaciones. Tu nombre queda en una lista que no se borra." } } },
    ] },
  { id: 9, min: 1, max: 4, t: "Cien mensajes en frío", x: "Nadie te asignó esto. Puedes construir tu propia lista de fondos y empezar a escribir.",
    o: [
      { t: "Armar la base y escribir todos los días", d: { red: 11, car: 5, ene: -11, msg: "De cien mensajes contestan siete. De esos siete sale una reunión que en dos años será un mandato." } },
      { t: "Enfocarte en diez contactos bien elegidos", min: { red: 20 }, j: "reaccion", stat: "red", d: { red: 7, cri: 4, ene: -4, msg: "Menos volumen y mejor timing. Escribes justo cuando conviene escribir." } },
    ] },
  { id: 10, min: 0, max: 3, t: "El teaser que vuelve marcado", x: "Tu teaser sectorial regresa con ochenta comentarios. La mitad son de forma.",
    o: [
      { t: "Rehacerlo entero y aprender el formato", d: { mod: 6, rep: 4, ene: -8, car: 2, msg: "La siguiente versión vuelve con cuatro comentarios. Progreso medible." } },
      { t: "Defender los puntos que no compartes", min: { cri: 30 }, j: "quiz", stat: "cri", d: { rep: 5, cri: 5, car: 2, msg: "Discutir un comentario técnico te obliga a tener razón de verdad." } },
    ] },
  { id: 11, min: 0, max: 6, t: "Media hora antes del cierre", x: "El mercado cierra en treinta minutos y tienes una orden a medio ejecutar en tu cuenta personal.",
    o: [
      { t: "Ejecutar tú mismo en el momento justo", j: "reaccion", stat: "cri", d: { cash: 2200, cri: 4, msg: "Te quedas mirando la pantalla esperando el momento." } },
      { t: "Dejar una orden limitada y apagar todo", d: { cri: 3, ene: 4, cash: 600, msg: "Pones el precio al que estarías cómodo y te olvidas. Se ejecuta a medias." } },
    ] },
  { id: 12, min: 0, max: 6, t: "Ruido en la pantalla", x: "Seis titulares en una hora y tu portafolio reaccionando a cada uno. Alguien tiene que decidir qué es señal y qué es ruido.",
    o: [
      { t: "Operar cada señal en el momento", j: "semaforo", stat: "cri", d: { cash: 2600, cri: 3, ene: -5, msg: "Te sientas a operar los titulares uno por uno." } },
      { t: "Cerrar la pantalla y no hacer nada", d: { cri: 5, ene: 6, msg: "El mejor movimiento del semestre fue no hacer ninguno." } },
    ] },
  { id: 13, min: 2, max: 6, t: "Roadshow de tres ciudades", x: "Bogotá el lunes, Asunción el miércoles, Buenos Aires el viernes. Ocho reuniones con fondos.",
    o: [
      { t: "Ir a todo y preparar cada reunión", d: { red: 12, car: 6, ene: -17, rep: 5, msg: "Vuelves destruido y con dos cartas de interés." } },
      { t: "Mandar a tu asociado a una de las plazas", d: { red: 6, car: 3, ene: -8, rep: 2, msg: "Delegar también es señal de nivel. Tu asociado responde bien." } },
      { t: "Hacerlo por videollamada", d: { red: 2, ene: -2, rep: -3, msg: "Ahorras el pasaje. Los fondos toman menos en serio a quien no aterriza." } },
    ] },
  { id: 14, min: 3, max: 6, t: "Tu mejor analista renuncia", x: "Se va a un fondo. Te lo dice con dos semanas de aviso y cara de culpa.",
    o: [
      { t: "Desearle bien y mantener el puente", d: { red: 8, rep: 5, ene: -5, msg: "A los dos años ese fondo entra como comprador en un proceso tuyo." } },
      { t: "Contraofertar y retenerlo", min: { red: 34 }, j: "anclaje", stat: "red", d: { car: 4, ene: -5, cash: -2000, msg: "Tienes que encontrar el número que lo convence sin romper la escala del equipo." } },
    ] },
  { id: 15, clave: true, min: 4, max: 6, t: "Te ofrecen una silla en el board", x: "Una compañía del portafolio de un cliente quiere que entres a su junta directiva.",
    o: [
      { t: "Aceptar y tomarlo en serio", d: { red: 10, rep: 8, cri: 6, ene: -9, cash: 8000, car: 4, msg: "Cuatro juntas al año, mucha lectura y una visión del negocio que desde afuera no tenías." } },
      { t: "Declinar por conflicto de interés", d: { rep: 6, cri: 6, msg: "El cliente entiende y confía más. Tu agenda respira." } },
    ] },
  { id: 16, min: 0, max: 6, t: "Tu primo y la cripto del momento", x: "Insiste todos los días. Dice que esta vez es distinto y que ya subió 300%.",
    o: [
      { t: "Meter una parte que puedas perder", d: { cash: -1500, cripto: 20, msg: "Defines de antemano cuánto estás dispuesto a perder. Eso ya es gestión de riesgo." } },
      { t: "Explicarle por qué no", j: "quiz", stat: "cri", d: { cri: 5, red: -2, msg: "Le explicas con números, que es la única forma de que entienda." } },
    ] },
  { id: 17, min: 0, max: 6, t: "El cuerpo pasa factura", x: "Dolor de espalda, sueño malo, tres cafés antes del mediodía. El médico te da una lista de cosas que no vas a hacer.",
    o: [
      { t: "Bloquear una hora diaria y cumplirla", d: { ene: 22, rep: -2, cri: 3, msg: "Una hora menos de escritorio y bastante más cabeza." } },
      { t: "Ignorarlo, ya habrá tiempo", d: { ene: -10, mod: 2, car: 2, msg: "Aguantas. Todo el mundo aguanta hasta que no." } },
    ] },
  { id: 18, min: 0, max: 5, t: "La boda es el mismo fin de semana del pitch", x: "Tu mejor amigo se casa el sábado. El pitch al comité es el lunes a primera hora.",
    o: [
      { t: "Ir a la boda y preparar el domingo", d: { ene: 8, red: 3, rep: -3, msg: "Llegas al lunes con menos horas y más humanidad. El pitch sale bien igual." } },
      { t: "Mandar un regalo y quedarte trabajando", d: { car: 3, mod: 3, ene: -6, red: -4, msg: "El pitch queda redondo. La amistad queda con una marca pequeña." } },
    ] },
  { id: 19, min: 1, max: 5, t: "Prensa al teléfono", x: "Un periodista quiere una cita tuya sobre el sector. Tu firma no tiene política clara al respecto.",
    o: [
      { t: "Hablar solo de datos públicos", d: { rep: 6, red: 4, cri: 3, msg: "Sales citado con prudencia. Dos fondos te escriben esa semana." } },
      { t: "Aceptar la entrevista técnica en vivo", min: { cri: 34 }, j: "quiz", stat: "cri", d: { rep: 7, red: 6, msg: "En vivo no hay forma de consultar nada." } },
      { t: "Declinar y pasarlo al socio", d: { rep: 2, red: 2, msg: "Correcto y aburrido. A veces es exactamente lo que toca." } },
    ] },
  { id: 20, min: 1, max: 4, t: "Alguien se cuelga de tu trabajo", x: "Un colega presenta al comité el análisis que armaste tú, sin mencionarte.",
    o: [
      { t: "Hablarlo con él, en privado y directo", d: { rep: 5, cri: 5, red: 2, msg: "Se incomoda y corrige en la siguiente sesión. El límite queda puesto." } },
      { t: "Escalarlo al socio", chk: { s: "rep", dif: 60, ok: { rep: 6, car: 3, msg: "El socio ya lo sospechaba. Ajustan la asignación de créditos del equipo." }, no: { rep: -8, red: -5, msg: "Queda como conflicto de egos y tú como el que se queja." } } },
      { t: "Dejarlo pasar y anotarlo", d: { ene: -4, cri: 2, msg: "Sigues trabajando. La factura de estas cosas llega igual, solo que después." } },
    ] },
  { id: 21, min: 0, max: 6, t: "Llega el bono", x: "Sobre encima del escritorio. Menos de lo que esperabas y más de lo que temías.",
    o: [
      { t: "Mandarlo casi todo al portafolio", d: { cash: 3200, cri: 4, msg: "Lo inviertes antes de acostumbrarte a verlo en la cuenta." } },
      { t: "Repartir entre disfrute y ahorro", d: { cash: 1400, ene: 8, msg: "Un viaje corto y el resto invertido. Difícil discutirlo." } },
    ] },
  { id: 22, min: 2, max: 6, t: "Fusión de tu firma", x: "Anuncian la integración con una casa regional. Reorganizan equipos en sesenta días.",
    o: [
      { t: "Posicionarte temprano con los que llegan", d: { red: 9, car: 5, rep: 3, ene: -7, msg: "Terminas liderando la integración de la cobertura sectorial." } },
      { t: "Bajar la cabeza y ejecutar", d: { mod: 4, car: 2, rep: -2, msg: "Sobrevives al recorte. Nadie te tiene muy presente." } },
    ] },
  { id: 23, min: 0, max: 6, t: "Devaluación de la noche a la mañana", x: "El tipo de cambio se mueve 40%. La mitad de tus supuestos quedaron viejos.",
    o: [
      { t: "Rehacer los modelos en dólares esa misma semana", j: "calculo", stat: "mod", d: { mod: 7, cri: 5, ene: -12, rep: 6, car: 3, msg: "Conviertes todo a mano para tener números creíbles antes que nadie." } },
      { t: "Esperar a que se estabilice", d: { ene: 2, rep: -5, msg: "Cuando reaccionas, otro ya mandó su nota al mercado." } },
    ] },
  { id: 24, min: 0, max: 2, t: "Enseñarle al pasante nuevo", x: "Llega alguien que no sabe usar buscarv y tiene todas las ganas del mundo.",
    o: [
      { t: "Dedicarle dos horas por semana", d: { red: 6, rep: 5, ene: -5, cri: 3, msg: "En seis meses te libera un tercio de tu carga. La mejor inversión del año." } },
      { t: "Que aprenda como aprendiste tú", d: { ene: 2, rep: -3, msg: "Sobrevive, pero no te busca cuando importa." } },
    ] },
  { id: 25, min: 0, max: 6, t: "Un amigo levanta capital", x: "Su startup necesita cierre y te ofrece entrar en la ronda como ángel.",
    o: [
      { t: "Invertir un ticket que puedas perder", d: { cash: -3000, red: 4, msg: "Entras por un monto que no te cambia la vida si se pierde. Papeles en orden." } },
      { t: "Revisarle el modelo antes de decidir", min: { mod: 34 }, j: "ojo", stat: "mod", d: { red: 6, cri: 4, cash: -1500, msg: "Le pides el modelo y te sientas a buscar el número que no cuadra." } },
    ] },
  { id: 26, min: 2, max: 6, t: "Comité de crédito difícil", x: "Defiendes una estructura de factoring sobre un sector volátil. Dos miembros vienen buscando sangre.",
    o: [
      { t: "Responder con los números en la cabeza", min: { mod: 30 }, j: "calculo", stat: "mod", d: { car: 6, rep: 7, cri: 4, msg: "Te preguntan tasas y coberturas y no hay tiempo de abrir el archivo." } },
      { t: "Retirar el caso y volver el mes que viene", d: { cri: 6, rep: 2, ene: -3, msg: "Preferible retirarse que perder. Vuelves mejor armado." } },
    ] },
  { id: 27, min: 1, max: 6, t: "Reunión con la familia dueña", x: "Tres hermanos, una empresa y ninguna intención de estar de acuerdo entre ellos.",
    o: [
      { t: "Aguantar el pulso y buscar el punto medio", min: { red: 30 }, j: "tresraya", stat: "red", d: { red: 7, car: 5, rep: 4, msg: "La reunión se vuelve un juego de posiciones antes de hablar de precio." } },
      { t: "Mandar una propuesta por escrito y esperar", d: { car: 2, ene: 3, msg: "Ordenado y sin desgaste. También sin conexión personal." } },
    ] },
  { id: 28, min: 3, max: 6, t: "Un cliente grande aprieta", x: "Amenaza con llevarse la cuenta si no aceptas un fee contingente que castiga a tu equipo.",
    o: [
      { t: "Sostener el esquema de honorarios", sigue: 602, d: { rep: 9, cash: -9000, cri: 6, msg: "Pierdes la cuenta este año y la recuperas en dos, con mejores términos." } },
      { t: "Negociar un esquema mixto", min: { red: 38 }, j: "anclaje", stat: "red", d: { cash: 7000, rep: 4, car: 4, msg: "Retainer bajo y éxito alto. Hay que encontrar el punto exacto." } },
      { t: "Ceder para proteger la facturación", d: { cash: 9000, rep: -7, ene: -7, msg: "El equipo trabaja igual por menos. Alguien renuncia en tres meses." } },
    ] },
  { id: 29, min: 2, max: 6, t: "Auditoría interna sobre tus expedientes", x: "Revisan al azar cinco mandatos tuyos, papel por papel.",
    o: [
      { t: "Reconstruir la cronología completa", j: "memoria", stat: "cri", d: { rep: 8, cri: 5, msg: "Te sientan a explicar cada aprobación en orden." } },
      { t: "Pedir tiempo para ordenar antes de entregar", d: { ene: -7, rep: -2, cri: 4, msg: "Ganas la semana y entregas impecable. El auditor se da cuenta igual." } },
    ] },
  { id: 30, min: 0, max: 6, t: "Corrección fuerte en la pantalla", x: "El mercado abre 20% abajo. El teléfono no para y tu portafolio personal amanece flaco.",
    o: [
      { t: "Comprar la caída en tramos", j: "precision", stat: "cri", d: { cri: 5, cash: 3000, msg: "Entrar bien en una caída es todo cuestión de momento." } },
      { t: "No mirar la pantalla en un mes", d: { cri: 4, ene: 6, msg: "El pánico ajeno no es una estrategia y tampoco lo es el tuyo." } },
      { t: "Vender y refugiarte en efectivo", d: { cri: -3, mercado: -0.05, ene: 3, msg: "Cortas el dolor y también la recuperación." } },
    ] },
  { id: 31, min: 4, max: 6, t: "Un fondo pide condiciones aparte", x: "Quiere una side letter con derechos que los demás inversionistas no tendrán.",
    o: [
      { t: "Negarte y ofrecer los mismos términos a todos", d: { rep: 9, cri: 6, cash: -3000, msg: "El fondo entra igual, con menos ruido y más respeto." } },
      { t: "Concederlo y documentarlo con transparencia", d: { cri: 5, red: 5, car: 3, rep: -3, msg: "Se hace, se documenta y se informa. Correcto, aunque incómodo." } },
    ] },
  { id: 32, min: 1, max: 6, t: "Te piden explicar la cascada", x: "Un LP nuevo no entiende cómo se reparte la plata y quiere que se lo expliques en voz alta.",
    o: [
      { t: "Explicárselo paso por paso", j: "orden", stat: "cri", d: { red: 6, rep: 6, cri: 4, msg: "Le pides una hoja y le dibujas el orden completo." } },
      { t: "Mandarle el documento y que lo lea", d: { rep: -2, ene: 3, msg: "Técnicamente correcto. El LP se queda con la duda y con la sensación." } },
    ] },
  { id: 33, clave: true, min: 2, max: 6, t: "Dos ofertas sobre la mesa", x: "Un comprador financiero y uno estratégico. Precios parecidos y riesgos de ejecución muy distintos.",
    o: [
      { t: "Ordenar los criterios y decidir con método", min: { cri: 38 }, j: "orden", stat: "cri", d: { cri: 7, car: 5, rep: 5, msg: "Pones los criterios en orden de importancia antes de mirar los precios." } },
      { t: "Ir por el precio más alto y punto", chk: { s: "cri", dif: 55, ok: { cash: 6000, car: 4, msg: "El precio alto además cerró sin problemas. Suerte y criterio en la misma jugada." }, no: { rep: -8, ene: -6, msg: "El comprador no consigue el financiamiento y el proceso se cae en la recta final." } } },
    ] },
  { id: 34, min: 0, max: 6, t: "Alguien de la mesa te pregunta qué harías", x: "Sin contexto, sin archivo, sin tiempo. Solo la pregunta y seis pares de ojos esperando.",
    o: [
      { t: "Contestar en el momento", j: "semaforo", stat: "cri", d: { rep: 6, cri: 4, car: 3, msg: "Sin datos en pantalla, solo criterio y velocidad." } },
      { t: "Pedir el archivo y contestar después", d: { rep: -2, mod: 3, msg: "Contestas bien y tarde. En algunas salas eso vale menos que contestar rápido." } },
    ] },
];

/* ---------- decisiones clave, cada dos años ---------- */
export const D = [
  { id: 101, clave: true, min: 0, max: 6, t: "La cifra que va en la portada", x: "Mañana entregas la valoración. El rango del comprador ya está insinuado en tres correos y tu número tiene que caer cerca sin regalar valor.",
    o: [
      { t: "Calzar el precio con la señal del comprador", juego: "anclaje", stat: "red",
        res: { exito: { car: 7, rep: 8, cash: 5000, msg: "Tu número cae justo dentro del rango del comprador. Firman sin renegociar." },
               parcial: { car: 3, rep: 3, cash: 1500, msg: "Tardas en encontrar el punto pero llegas. Firman después de una ronda extra." },
               fallo: { rep: -8, cash: -2500, ene: -6, msg: "Pides demasiado y el comprador se enfría. El proceso se alarga tres meses." } } },
      { t: "Blindar el modelo celda por celda", juego: "ojo", stat: "mod",
        res: { exito: { mod: 9, rep: 7, car: 5, msg: "Encuentras dos inconsistencias antes que nadie. El modelo aguanta cualquier pregunta." },
               parcial: { mod: 4, car: 2, ene: -6, msg: "Encuentras una y se te escapa otra. Nadie pregunta por esa, esta vez." },
               fallo: { rep: -9, ene: -8, msg: "El comprador encuentra el error en la primera llamada técnica." } } },
    ] },
  { id: 102, clave: true, min: 0, max: 5, t: "Tres días de due diligence", x: "El data room abre el lunes y cierra el miércoles. Todo lo que no viste se vuelve tu problema después.",
    o: [
      { t: "Peinar el legajo completo en orden", juego: "memoria", stat: "cri", sigue: 601,
        res: { exito: { cri: 9, rep: 8, car: 6, ene: -9, msg: "Reconstruyes la cadena de contratos y aparece un pasivo laboral no declarado. Ajustan el precio." },
               parcial: { cri: 4, car: 3, ene: -9, msg: "Cubres lo esencial. Queda una carpeta sin abrir que probablemente no importaba." },
               fallo: { rep: -10, ene: -11, msg: "Te pierdes en el volumen. La contingencia aparece cuando ya firmaron." } } },
      { t: "Ir directo a los números que suelen fallar", juego: "ojo", stat: "mod",
        res: { exito: { mod: 8, cri: 5, car: 5, msg: "Vas a la conciliación bancaria y encuentras la diferencia en veinte minutos." },
               parcial: { mod: 3, car: 2, msg: "Encuentras algo menor. Suficiente para justificar el viaje." },
               fallo: { rep: -7, msg: "Apostaste por el atajo y el atajo no estaba ahí." } } },
    ] },
  { id: 103, clave: true, min: 1, max: 6, t: "Negociación de honorarios", x: "El cliente quiere pagar por éxito y nada por retainer. Tu equipo trabaja ocho meses en cualquier escenario.",
    o: [
      { t: "Anclar alto y ceder despacio", juego: "anclaje", stat: "red",
        res: { exito: { cash: 11000, rep: 7, car: 6, msg: "Cierras retainer y éxito. El cliente cree que ganó la negociación, que es la mejor señal." },
               parcial: { cash: 3500, car: 3, msg: "Consigues la mitad de lo que valía. Aceptable." },
               fallo: { cash: -2000, rep: -6, ene: -5, msg: "Te pasas de rosca y el cliente se va con la competencia." } } },
      { t: "Poner una sola cifra y sostenerla", juego: "precision", stat: "cri",
        res: { exito: { cash: 8000, rep: 9, car: 5, msg: "Un número, una explicación, cero regateo. Firman en la misma reunión." },
               parcial: { cash: 2500, rep: 3, msg: "Aceptan con condiciones. Sales empatado." },
               fallo: { cash: -1200, rep: -5, msg: "El número quedó fuera de mercado y te dejó sin margen para moverte." } } },
    ] },
  { id: 104, clave: true, min: 0, max: 6, t: "La posición que ya dio mucho", x: "Una posición de tu portafolio va 70% arriba. Todos los indicadores dicen cosas distintas.",
    o: [
      { t: "Aguantar y dejar correr", juego: "suerte", stat: "cri",
        res: { exito: { cash: 20000, cri: 6, msg: "Sales cerca del pico. No se puede pedir más." },
               parcial: { cash: 6000, cri: 3, msg: "Sales tarde y devuelves parte del camino. Igual ganaste." },
               fallo: { cash: -10000, cri: 5, ene: -6, msg: "Te quedas pegado en la vuelta. La ganancia se evapora en dos semanas." } } },
      { t: "Salir por tramos con disciplina", juego: "precision", stat: "cri",
        res: { exito: { cash: 11000, cri: 7, msg: "Tres salidas escalonadas, precio promedio muy decente." },
               parcial: { cash: 4000, cri: 4, msg: "Dos tramos buenos, uno malo. Neto positivo." },
               fallo: { cash: -3000, cri: 3, msg: "Vendes justo en el peor momento de cada tramo." } } },
    ] },
  { id: 105, clave: true, min: 2, max: 6, t: "Comité de crédito", x: "Presentas una estructura sobre facturas de un sector volátil. Dos miembros del comité vienen buscando sangre.",
    o: [
      { t: "Ir con el análisis de contraparte hecho", juego: "ojo", stat: "mod",
        res: { exito: { car: 8, rep: 9, cri: 5, msg: "Detectas la concentración de deudores antes de que la pregunten. Aprueban con condiciones." },
               parcial: { car: 4, rep: 3, msg: "Aprueban con más condiciones de las que querías." },
               fallo: { rep: -9, ene: -6, msg: "Una pregunta sobre concentración te descoloca. Devuelven el caso." } } },
      { t: "Responder de memoria, sin papeles", juego: "memoria", stat: "cri",
        res: { exito: { car: 8, rep: 10, msg: "Cinco preguntas seguidas respondidas de memoria. El comité toma nota de tu nombre." },
               parcial: { car: 3, rep: 2, msg: "Aciertas la mayoría y buscas dos datos en la carpeta." },
               fallo: { rep: -10, msg: "Te trabas en el segundo dato y la confianza del comité se cae con la cifra." } } },
    ] },
  { id: 106, clave: true, min: 2, max: 6, t: "Subasta competitiva", x: "Cinco postores, dos rondas. Tu cliente compra y tú decides la estrategia de precio.",
    o: [
      { t: "Poner precio firme en la primera ronda", juego: "subasta", stat: "cri",
        res: { exito: { car: 9, rep: 8, cash: 9000, msg: "Sacas a tres competidores de una vez y cierras sin segunda vuelta." },
               parcial: { car: 4, cash: 2500, msg: "Pasas a la segunda ronda con margen apretado." },
               fallo: { rep: -7, cash: -3500, msg: "Precio fuera de rango. Los que quedaron afuera fueron ustedes." } } },
      { t: "Guardar munición para la segunda vuelta", juego: "suerte", stat: "red",
        res: { exito: { car: 8, rep: 6, cash: 12000, msg: "Entras en la última vuelta con la mejor información y el mejor precio." },
               parcial: { car: 3, cash: 2000, msg: "Llegas a la final y pierdes por poco." },
               fallo: { rep: -8, cash: -4500, ene: -6, msg: "Los eliminan antes de la segunda ronda por no mostrar seriedad temprano." } } },
    ] },
  { id: 107, clave: true, min: 1, max: 6, t: "El pitch al comité de inversión", x: "Veinte minutos, siete personas y una tesis que tienes que defender sin leer la lámina.",
    o: [
      { t: "Ensayar hasta tenerlo memorizado", juego: "memoria", stat: "red",
        res: { exito: { car: 8, rep: 9, red: 6, msg: "Hablas sin mirar la pantalla veinte minutos. Aprueban el mandato ese mismo día." },
               parcial: { car: 4, rep: 3, msg: "Sólido con dos tropiezos. Aprueban con dudas." },
               fallo: { rep: -9, ene: -5, msg: "Pierdes el hilo en la lámina de riesgos y ya no lo recuperas." } } },
      { t: "Improvisar sobre los números y cerrar en el punto justo", juego: "precision", stat: "mod",
        res: { exito: { car: 7, rep: 8, mod: 5, msg: "Cierras exactamente en el minuto veinte con la conclusión más fuerte." },
               parcial: { car: 3, rep: 2, msg: "Te pasas del tiempo y cortan la parte de valoración." },
               fallo: { rep: -8, msg: "Te extiendes, pierdes la sala y el comité decide sin escuchar tu cierre." } } },
    ] },
  { id: 108, clave: true, min: 3, max: 6, t: "Papel distressed a treinta centavos", x: "Un bono corporativo cotiza a treinta. La reestructuración puede tardar dos años o no llegar nunca.",
    o: [
      { t: "Comprar y aguantar hasta el acuerdo", juego: "suerte", stat: "cri",
        res: { exito: { cash: 38000, cri: 8, rep: 6, msg: "El acuerdo llega y el papel recupera a sesenta y cinco. Doblaste el capital." },
               parcial: { cash: 10000, cri: 4, msg: "Sales en el rebote sin esperar el acuerdo final." },
               fallo: { cash: -17000, cri: 6, ene: -7, msg: "El proceso se empantana en tribunales y el papel cae a doce." } } },
      { t: "Armar el caso y venderlo a un fondo", juego: "anclaje", stat: "red",
        res: { exito: { cash: 18000, red: 9, car: 7, rep: 7, msg: "Un fondo compra la tesis y te paga por estructurarla. Riesgo ajeno, fee tuyo." },
               parcial: { cash: 5000, red: 4, msg: "Un fondo entra con un ticket menor al que buscabas." },
               fallo: { rep: -6, ene: -5, msg: "Nadie compra la tesis y quedas con seis semanas de trabajo sin factura." } } },
    ] },
  { id: 109, clave: true, min: 2, max: 6, t: "Auditoría regulatoria sorpresa", x: "Llegan sin aviso a revisar expedientes de los últimos dos años. Te toca a ti acompañarlos.",
    o: [
      { t: "Reconstruir la trazabilidad de memoria", juego: "memoria", stat: "cri",
        res: { exito: { rep: 10, cri: 6, msg: "Explicas cada aprobación en orden y sin dudar. El informe sale limpio." },
               parcial: { rep: 3, ene: -5, msg: "Faltan dos actas que aparecen al día siguiente. Observación menor." },
               fallo: { rep: -12, cash: -4000, msg: "Se pierden en la cronología y el informe deja tres observaciones formales." } } },
      { t: "Ordenar los expedientes antes de entregarlos", juego: "orden", stat: "mod",
        res: { exito: { rep: 9, mod: 5, msg: "Todo entregado en el orden correcto media hora antes de que lo pidan." },
               parcial: { rep: 2, ene: -4, msg: "Ordenas casi todo. Una carpeta llega tarde." },
               fallo: { rep: -10, msg: "Entregas con un hueco que el auditor detecta en la primera revisión." } } },
    ] },
  { id: 110, clave: true, min: 4, max: 6, t: "Fijar el rango de precio de la colocación", x: "Sale la emisión. Muy arriba no se coloca, muy abajo dejas plata del cliente en la mesa.",
    o: [
      { t: "Leer el libro y fijar el punto exacto", juego: "precision", stat: "mod",
        res: { exito: { car: 12, rep: 12, cash: 20000, msg: "La emisión se coloca completa y cotiza arriba el primer día." },
               parcial: { car: 5, rep: 4, cash: 5000, msg: "Se coloca el 80%. Aceptable, no memorable." },
               fallo: { rep: -12, cash: -8000, ene: -7, msg: "La emisión queda a medias y el papel abre bajo el precio de colocación." } } },
      { t: "Sondear a los anclas uno por uno", juego: "anclaje", stat: "red",
        res: { exito: { car: 10, rep: 9, red: 8, cash: 15000, msg: "Los tres anclas confirman antes de abrir el libro. La colocación es un trámite." },
               parcial: { car: 5, red: 4, cash: 4000, msg: "Dos anclas entran, uno se cae. Sale igual." },
               fallo: { rep: -9, red: -4, msg: "Los anclas se enfrían y la emisión se pospone al semestre siguiente." } } },
    ] },
  { id: 111, clave: true, min: 4, max: 6, t: "Primer cierre de tu fondo", x: "Tienes la tesis, el track record y una lista de LPs. Falta convencerlos del tamaño del ticket.",
    o: [
      { t: "Negociar el ticket con el LP ancla", juego: "anclaje", stat: "red",
        res: { exito: { cash: 60000, car: 15, rep: 12, red: 10, msg: "El ancla entra por el doble de lo que esperabas y el resto lo sigue. Primer cierre por encima del objetivo." },
               parcial: { cash: 16000, car: 7, red: 5, msg: "Primer cierre justo en el mínimo. Funciona, pero apretado." },
               fallo: { cash: -15000, ene: -13, rep: -6, msg: "El ancla no entra y sin ancla no entra nadie. Dieciocho meses perdidos." } } },
      { t: "Aguantar la ronda hasta conseguir el tamaño", juego: "suerte", stat: "cri",
        res: { exito: { cash: 72000, car: 16, rep: 10, msg: "Aguantas seis meses más y cierras al tamaño que querías." },
               parcial: { cash: 18000, car: 6, msg: "Cierras algo menor de lo planeado después de mucho desgaste." },
               fallo: { cash: -22000, ene: -15, rep: -8, msg: "Se te pasó el momento del mercado. La ventana se cerró con el fondo abierto." } } },
    ] },
  { id: 112, clave: true, min: 1, max: 6, t: "Dos cierres el mismo viernes", x: "Dos mandatos firman el mismo día en ciudades distintas. Los dos clientes creen que estás con ellos.",
    o: [
      { t: "Coordinar los tiempos al minuto", juego: "precision", stat: "cri",
        res: { exito: { car: 10, rep: 9, cash: 10000, ene: -11, msg: "Los dos cierran sin fricción y ninguno se entera del otro." },
               parcial: { car: 4, rep: 2, cash: 3500, ene: -12, msg: "Uno cierra a tiempo y el otro con dos horas de retraso y una llamada incómoda." },
               fallo: { rep: -11, cash: -3500, ene: -14, msg: "Un cliente firma sin ti presente y lo interpreta exactamente como lo que fue." } } },
      { t: "Delegar uno y jugarte la ejecución del equipo", juego: "memoria", stat: "red",
        res: { exito: { car: 8, rep: 8, red: 7, ene: -5, msg: "Tu asociado ejecuta sin un error. Acabas de fabricar un sucesor." },
               parcial: { car: 3, ene: -5, msg: "Sale, con dos llamadas tuyas de emergencia en el medio." },
               fallo: { rep: -8, red: -4, ene: -7, msg: "El equipo se traba en un detalle registral y el cierre se cae al lunes." } } },
    ] },
  { id: 113, clave: true, min: 0, max: 6, t: "Reasignar tu portafolio antes del cierre de año", x: "Tienes que decidir dónde queda parado tu patrimonio los próximos doce meses. Nadie va a revisar esto por ti.",
    o: [
      { t: "Decidir tú, con tesis propia y convicción", juego: "quiz", stat: "cri",
        res: { exito: { cri: 9, mercado: 0.24, msg: "Lees bien el ciclo y la reasignación funciona. El portafolio se dispara." },
               parcial: { cri: 4, mercado: 0.03, msg: "Aciertas la dirección general y fallas en un tramo. Terminas apenas arriba." },
               fallo: { cri: 3, mercado: -0.19, ene: -5, msg: "Te equivocas en la lectura de tasas y el portafolio se lleva el golpe completo." } } },
      { t: "Indexarte y no pensar más en eso", d: { mercado: 0.03, ene: 5, cri: 2, msg: "Compras el índice y te olvidas. Aburrido y bastante difícil de criticar." } },
    ] },
  { id: 114, clave: true, min: 1, max: 6, t: "El CIO del fondo te pone a prueba", x: "Los primeros quince minutos son preguntas técnicas. Si pasas, el fondo entra en tu proceso y te deja copiar la posición.",
    o: [
      { t: "Entrar al examen sin red", juego: "quiz", stat: "cri",
        res: { exito: { red: 10, rep: 9, car: 6, mercado: 0.17, msg: "Respondes las tres sin dudar. El CIO te comparte su lectura del ciclo y replicas la posición." },
               parcial: { red: 4, car: 2, mercado: 0.02, msg: "Dos de tres. Te toma en serio a medias y el dato que te suelta sirve poco." },
               fallo: { red: -4, rep: -8, mercado: -0.13, msg: "Fallas la pregunta de duración delante del CIO y encima replicas mal la idea." } } },
      { t: "Llevar a tu jefe y quedarte de apoyo", d: { red: 4, rep: 2, ene: -3, msg: "El fondo entra igual, por la puerta de tu jefe. Tú quedas como el que tomó notas." } },
    ] },
  { id: 115, clave: true, min: 2, max: 6, t: "Examen de idoneidad del regulador", x: "Para firmar operaciones a tu nombre tienes que aprobarlo. Dos intentos y queda en registro público.",
    o: [
      { t: "Presentarte y responder tú", juego: "quiz", stat: "mod",
        res: { exito: { rep: 11, car: 7, mod: 6, msg: "Aprobado a la primera. Ya puedes firmar operaciones a tu nombre." },
               parcial: { rep: 3, car: 2, ene: -5, msg: "Aprobado raspando en el segundo intento. Cuenta igual." },
               fallo: { rep: -10, cash: -3000, ene: -7, msg: "Reprobado y en registro público. Un año más para volver a intentarlo." } } },
      { t: "Postergarlo un año más", d: { car: -2, ene: 4, rep: -3, msg: "Sigues firmando bajo la licencia de otro. Cómodo hoy, caro cuando quieras independizarte." } },
    ] },
  { id: 116, clave: true, min: 3, max: 6, t: "Tu propia tesis frente al comité", x: "Propones sobreponderar un sector completo. Si te creen y aciertas, todos lo notan. Si te creen y fallas, también.",
    o: [
      { t: "Defender la tesis con todo el rigor", juego: "quiz", stat: "cri",
        res: { exito: { car: 11, rep: 11, cri: 7, mercado: 0.22, msg: "Aprueban la tesis y el sector rinde. Tu nombre queda pegado a la mejor decisión del año." },
               parcial: { car: 4, rep: 2, mercado: 0.02, msg: "Aprueban una versión diluida que rinde poco." },
               fallo: { car: -3, rep: -12, mercado: -0.17, ene: -7, msg: "La tesis se cae en la primera pregunta y la posición personal que ya tenías se hunde." } } },
      { t: "Proponerla como piloto pequeño", d: { car: 3, cri: 4, mercado: 0.04, msg: "Empiezas con un tamaño chico. Menos gloria y también menos posibilidad de desastre." } },
    ] },
  { id: 117, clave: true, min: 0, max: 6, t: "El dominó antes del negocio", x: "El dueño de la empresa familiar te recibe en su casa y saca la mesa antes de hablar de números. Dice que así conoce a la gente.",
    o: [
      { t: "Aceptar la partida y jugarla en serio", juego: "tresraya", stat: "red",
        res: { exito: { red: 11, rep: 8, car: 6, cash: 4000, msg: "Le ganas limpio y se ríe. A partir de ahí te habla como si te conociera de siempre y firma." },
               parcial: { red: 6, car: 3, msg: "Empate. Firma, aunque con dos cláusulas más de las que querías." },
               fallo: { red: 2, rep: -4, msg: "Pierdes y él lo disfruta demasiado. La conversación arranca contigo un paso atrás." } } },
      { t: "Ir directo a la propuesta", juego: "anclaje", stat: "cri",
        res: { exito: { car: 6, rep: 6, cash: 3000, msg: "Directo al punto y el número cae bien. No hubo química pero hubo firma." },
               parcial: { car: 2, msg: "Firma después de pensarlo dos semanas." },
               fallo: { rep: -6, msg: "Le pareces apurado y frío. No vuelve a contestar el teléfono." } } },
    ] },
  { id: 118, clave: true, min: 2, max: 6, t: "Pulso con el comprador estratégico", x: "Del otro lado hay un director de M&A con veinte años más que tú. Cada movimiento suyo busca una concesión tuya.",
    o: [
      { t: "Aguantar el pulso movimiento por movimiento", juego: "tresraya", stat: "cri", sigue: 603,
        res: { exito: { car: 10, rep: 10, cash: 12000, msg: "Cierras en tus términos y con el precio intacto. El otro lado pide tu tarjeta al final." },
               parcial: { car: 5, rep: 4, cash: 4000, msg: "Parten la diferencia. Nadie sale humillado y el deal cierra." },
               fallo: { car: 1, rep: -8, cash: -4000, ene: -7, msg: "Te sacan tres concesiones seguidas. Tu cliente firma peor de lo que podía." } } },
      { t: "Llevarlo a un proceso competitivo", juego: "suerte", stat: "red",
        res: { exito: { car: 9, rep: 8, cash: 14000, msg: "Traes dos competidores más y el estratégico sube el precio solo." },
               parcial: { car: 3, cash: 2500, msg: "El proceso no atrae a nadie más pero la amenaza sirvió." },
               fallo: { rep: -9, cash: -6000, ene: -7, msg: "El estratégico se ofende, se retira y te quedas sin comprador." } } },
    ] },
  { id: 119, clave: true, min: 3, max: 6, t: "La silla del socio se decide en la mesa", x: "Dos candidatos, una sola promoción, y el socio director los invita a jugar mientras conversan. Nadie dice que sea una prueba.",
    o: [
      { t: "Jugar y dejar que te lea", juego: "cuatro", stat: "cri",
        res: { exito: { car: 12, rep: 9, red: 6, msg: "Ganas sin humillar a nadie y con conversación. El socio ve lo que quería ver." },
               parcial: { car: 5, rep: 3, msg: "Empate cordial. Quedas en carrera junto al otro candidato." },
               fallo: { car: 1, rep: -5, msg: "Pierdes y se nota que te molesta. El socio anota eso, no el resultado." } } },
      { t: "Hablar de tu track record en vez de jugar", juego: "memoria", stat: "red",
        res: { exito: { car: 9, rep: 8, msg: "Recitas cinco mandatos con cifras exactas. Difícil discutir contra eso." },
               parcial: { car: 4, msg: "Sólido, con un dato que no recuerdas bien." },
               fallo: { rep: -6, car: -2, msg: "Te equivocas en el monto de tu propio deal y el socio corrige en voz alta." } } },
    ] },
  { id: 120, clave: true, min: 4, max: 6, t: "Te ofrecen dirigir la oficina de otro país", x: "Tres años afuera, equipo nuevo y un mercado que no conoces. Vuelves con galones o no vuelves.",
    o: [
      { t: "Aceptar y armar el equipo desde cero", juego: "orden", stat: "cri",
        res: { exito: { car: 14, rep: 10, red: 9, cash: 15000, ene: -10, msg: "Montas la operación en el orden correcto y en dos años la oficina es rentable." },
               parcial: { car: 6, red: 4, ene: -12, msg: "La oficina arranca lenta y con costos por encima del plan." },
               fallo: { car: 2, rep: -8, ene: -14, cash: -8000, msg: "Te apuras en contratar antes de tener clientes y la oficina cierra en dieciocho meses." } } },
      { t: "Quedarte y consolidar lo que ya tienes", d: { car: 5, rep: 4, ene: 3, msg: "Menos riesgo, menos historia. La franquicia local sigue creciendo contigo dentro." } },
    ] },
];

/* ---------- eventos que usan los juegos interactivos nuevos ---------- */
const E2 = [
  { id: 40, min: 0, max: 6, t: "Una sesión larga frente a la pantalla", x: "Tienes el día libre y una cuenta propia. El mercado abre en cinco minutos y la tentación es operarlo todo.",
    o: [
      { t: "Operar la sesión completa", min: { cri: 48 }, j: "trading", stat: "cri", d: { cash: 3000, cri: 4, ene: -6, msg: "Te sientas a operar de apertura a cierre." } },
      { t: "Comprar y apagar la pantalla", d: { cri: 4, ene: 5, cash: 900, msg: "Compras, cierras la laptop y te vas a hacer otra cosa. Suele funcionar mejor de lo que uno acepta." } },
    ] },
  { id: 41, min: 2, max: 6, t: "Un cliente quiere comprar apalancado", x: "El comprador tiene el activo identificado y quiere saber cuánta deuda le puede meter sin ahorcarse.",
    o: [
      { t: "Armarle la estructura tú mismo", min: { mod: 46 }, j: "estructura", stat: "mod", d: { car: 6, rep: 6, cash: 5000, mod: 5, msg: "Te sientas a repartir el precio entre deuda y capital." } },
      { t: "Mandarlo con el banco y quedarte fuera", d: { rep: -2, ene: 3, msg: "El banco arma la estructura y se queda con la relación. Tú te quedas con el fee de asesoría y nada más." } },
    ] },
  { id: 42, min: 1, max: 6, t: "Ocho hallazgos sobre la mesa", x: "El equipo junior te deja una lista de hallazgos de la revisión. Tienes que decidir cuáles suben al comité y cuáles son ruido.",
    o: [
      { t: "Filtrar tú los hallazgos", min: { cri: 44 }, j: "banderas", stat: "cri", d: { cri: 7, rep: 6, car: 4, msg: "Te sientas a separar lo que importa de lo que solo hace ruido." } },
      { t: "Subirlos todos al comité", d: { rep: -4, ene: -3, cri: 2, msg: "El comité se pierde en detalles operativos y el caso pierde fuerza. Filtrar también es tu trabajo." } },
    ] },
  { id: 43, clave: true, min: 3, max: 6, t: "Te ofrecen invertir junto a un fondo", x: "Un fondo amigo te deja entrar en coinversión con un ticket pequeño. Hay que revisar la compañía rápido.",
    o: [
      { t: "Revisar y decidir tú", j: "banderas", stat: "cri", d: { cash: 6000, cri: 5, red: 4, msg: "Te dan tres días y un archivo comprimido." } },
      { t: "Entrar confiando en el fondo", chk: { s: "red", dif: 60, ok: { cash: 9000, red: 5, msg: "El fondo hizo bien su trabajo y tú te montaste gratis en su análisis." }, no: { cash: -7000, cri: 5, msg: "El fondo también se equivocó. Confiar en el análisis ajeno sale caro cuando sale mal." } } },
    ] },
];
E.push.apply(E, E2);

/* ---------- decisión de rama, aparece una sola vez ---------- */
export const DECISION_RAMA = {
  id: 999, clave: true, rama: true, min: 0, max: 6,
  t: "Hacia dónde va tu carrera",
  x: "Ya no eres el que ejecuta lo que le mandan. Los socios te preguntan qué quieres construir de aquí en adelante, y la respuesta define en qué te vuelves bueno.",
  o: RAMAS.map((r) => ({ t: r.n, ramaId: r.id, d: { car: 3, cri: 2, msg: r.d } })),
  /* la etiqueta de «boutique» se reescribe al pintarla, según el título:
     ver nombreRama() y FIRMA_DE() */
};

/* ---------- eventos con opciones condicionadas ---------- */
const E3 = [
  { id: 50, min: 0, max: 6, t: "Una cláusula que nadie leyó", x: "El contrato de compraventa trae una cláusula de ajuste de precio redactada de una forma que no cuadra con lo que se negoció.",
    o: [
      { t: "Leerla tú y reescribirla", req: { est: "der" }, j: "banderas", stat: "cri", d: { rep: 8, car: 5, cri: 5, msg: "Abres el contrato en la página correcta antes de que lo haga el abogado del otro lado." } },
      { t: "Mandarla a los abogados y esperar", d: { cash: -2500, ene: -3, car: 1, msg: "Tres días y una factura después, confirman lo que ya sospechabas." } },
      { t: "Firmarla como está", chk: { s: "cri", dif: 70, ok: { car: 3, msg: "No pasó nada. Esta vez." }, no: { cash: -9000, rep: -8, msg: "El ajuste de precio se aplica en contra de tu cliente y la conversación es muy incómoda." } } },
    ] },
  { id: 51, min: 0, max: 6, t: "El modelo se rompió", x: "Referencia circular, cuatro archivos vinculados y una hoja que nadie entiende. La entrega es en seis horas.",
    o: [
      { t: "Escribir un script que lo reconstruya", req: { est: "sis" }, j: "calculo", stat: "mod", d: { mod: 9, car: 5, rep: 6, ene: -5, msg: "En vez de arreglar celdas, automatizas la reconstrucción completa." } },
      { t: "Rehacerlo a mano desde cero", d: { mod: 6, ene: -14, car: 3, msg: "Catorce horas seguidas y un modelo limpio. El método más caro que existe." } },
      { t: "Entregar la versión vieja", d: { rep: -7, ene: 3, msg: "Nadie compara las versiones hasta que alguien las compara." } },
    ] },
  { id: 52, min: 0, max: 6, t: "Cierre contable de la compañía objetivo", x: "Los estados que te mandaron tienen ajustes de último minuto que cambian el EBITDA en un 12%.",
    o: [
      { t: "Revisar los ajustes uno por uno", req: { est: "con" }, j: "ojo", stat: "mod", d: { mod: 8, cri: 6, car: 5, rep: 5, msg: "Sabes exactamente dónde se esconden los ajustes que maquillan un cierre." } },
      { t: "Pedir los estados auditados y esperar", d: { ene: -4, car: 2, rep: 3, msg: "Correcto y lento. El proceso se atrasa un mes." } },
      { t: "Trabajar con el EBITDA ajustado que te dieron", chk: { s: "mod", dif: 65, ok: { car: 3, msg: "Los ajustes eran legítimos. Suerte más que método." }, no: { rep: -9, msg: "El EBITDA ajustado era humo y la valoración entera se cae en due diligence." } } },
    ] },
  { id: 53, min: 0, max: 4, t: "La pregunta de macro en la entrevista", x: "Te preguntan qué pasa con el tipo de cambio si el banco central sube tasas y el fiscal sigue deficitario.",
    o: [
      { t: "Desarrollarla con el marco completo", req: { est: "eco" }, j: "quiz", stat: "cri", d: { car: 6, rep: 7, red: 5, msg: "Es exactamente la pregunta para la que pasaste cuatro años." } },
      { t: "Contestar con intuición de mercado", j: "semaforo", stat: "cri", d: { car: 3, rep: 4, msg: "No tienes el marco pero tienes calle." } },
      { t: "Admitir que no lo tienes claro", d: { rep: 2, cri: 3, msg: "Honesto y poco memorable. Al menos no inventaste." } },
    ] },
  { id: 54, min: 0, max: 6, t: "Controles de cambio de un día para otro", x: "Amaneces con un control cambiario nuevo. Tus ahorros están en moneda local y el dólar oficial no existe en la práctica.",
    o: [
      { t: "Moverlo todo antes del mediodía", req: { pais: ["ve", "ar"] }, j: "reaccion", stat: "cri", d: { cash: 4000, cri: 6, ene: -5, msg: "Creciste con esto. Sabes exactamente a quién llamar y en qué orden." } },
      { t: "Esperar a que se aclare la norma", d: { cash: -3500, cri: 4, msg: "La norma se aclara dos semanas después y para entonces ya perdiste 30% del poder de compra." } },
      { t: "Consultarlo con un abogado", d: { cash: -1200, cri: 3, rep: 2, msg: "Legalmente impecable y financieramente tarde." } },
    ] },
  { id: 55, clave: true, min: 1, max: 6, t: "Te ofrecen una visa de trabajo", x: "Una firma de Miami quiere contratarte. Sueldo en otra escala, costo de vida en otra escala y tu red se queda del otro lado del mar.",
    o: [
      { t: "Aceptar y mudarte", req: { noPais: "us" }, d: { cash: 9000, mod: 7, red: -8, ene: -9, car: 7, msg: "Otra liga, otro idioma en la mesa y una red que hay que construir desde cero." }, mudar: "us" },
      { t: "Quedarte donde tu red vale algo", d: { red: 7, rep: 4, car: 2, msg: "Tu ventaja competitiva es local y decides no regalarla." } },
    ] },
  { id: 56, min: 2, max: 6, t: "Un socio del club te presenta a alguien", x: "Cena de doce personas, todos con capital. La conversación es informal hasta que deja de serlo.",
    o: [
      { t: "Aprovechar que conoces a media sala", req: { est: "adm" }, j: "memoria", stat: "red", d: { red: 10, car: 5, cash: 4000, msg: "Recuerdas nombres, empresas y quién estuvo en qué operación." } },
      { t: "Quedarte con una conversación larga y buena", d: { red: 6, cri: 3, msg: "Una relación profunda vale más que doce superficiales." } },
      { t: "Irte temprano", d: { ene: 6, red: -2, msg: "Duermes bien y pierdes una noche que quizá importaba." } },
    ] },
];
E.push.apply(E, E3);

/* ---------- eventos encadenados, aparecen solo si los llamas ---------- */
export const CADENA = {
  601: { id: 601, min: 0, max: 6, t: "El pasivo que encontraste tiene dueño", x: "La contingencia que levantaste no era un descuido. Alguien la escondió y ese alguien sigue en la compañía.",
    o: [
      { t: "Llevarlo al comité con nombre y apellido", d: { rep: 9, cri: 6, car: 5, red: -4, msg: "Se cae el gerente financiero de la objetivo y el vendedor ajusta el precio. Nadie te lo agradece en persona." } },
      { t: "Reportarlo sin señalar a nadie", d: { rep: 5, cri: 5, car: 3, msg: "El problema se resuelve y la política se evita. Ambas cosas tienen valor." } },
    ] },
  602: { id: 602, min: 0, max: 6, t: "El cliente que perdiste volvió", x: "Aquel cliente al que le sostuviste el número y se fue con la competencia está de vuelta. La otra firma le entregó una valoración que no aguantó el escrutinio.",
    o: [
      { t: "Recibirlo sin cobrar de más", d: { cash: 12000, rep: 9, car: 6, msg: "Vuelve con un mandato más grande y la lección aprendida por su cuenta." } },
      { t: "Cobrarle la prima que ahora vale tu criterio", j: "anclaje", stat: "red", d: { cash: 18000, car: 5, rep: -2, msg: "Tienes todo el poder de negociación y decides usarlo." } },
    ] },
  603: { id: 603, min: 0, max: 6, t: "La contraparte quiere revancha", x: "El director de M&A al que le ganaste el pulso volvió con otra operación y con ganas de cobrársela.",
    o: [
      { t: "Volver a sentarte con él", j: "tresraya", stat: "cri", d: { car: 8, rep: 7, cash: 9000, msg: "Segunda vuelta, misma mesa, más respeto de ambos lados." } },
      { t: "Poner a tu equipo al frente esta vez", d: { car: 4, red: 5, ene: 4, msg: "Delegas la revancha. Tu asociado la maneja bien y tú duermes." } },
    ] },
};

/* ---------- eventos de los modos nuevos ---------- */
const E4 = [
  { id: 60, min: 0, max: 3, t: "La pizarra del comité", x: "El socio borra el pizarrón y escribe seis conceptos con sus definiciones cruzadas. Dice que si no los tienes automatizados, no puedes hablar en una reunión.",
    o: [
      { t: "Resolverla en el momento", j: "pares", stat: "cri", d: { cri: 6, mod: 5, car: 4, rep: 4, msg: "Te paras frente al pizarrón con seis pares desordenados." } },
      { t: "Pedir estudiarlo y volver mañana", d: { mod: 3, rep: -3, ene: -3, msg: "Vuelves al día siguiente sabiéndotelo. La oportunidad de impresionar ya pasó." } },
    ] },
  { id: 61, min: 0, max: 6, t: "Rotar entre activos", x: "Tienes un año movido por delante y la sensación de que quedarte quieto en una sola clase de activo es dejar plata en la mesa.",
    o: [
      { t: "Rotar activamente durante el año", j: "carril", stat: "cri", d: { cash: 4000, cri: 4, ene: -5, msg: "Te pasas el año cambiándote de carril según lo que va pasando." } },
      { t: "Quedarte quieto donde estás", d: { cri: 3, ene: 5, msg: "No tocas nada. Algunos años eso es lo mejor que puedes hacer y otros te cuesta caro." } },
    ] },
  { id: 62, min: 1, max: 6, t: "El tablero de la negociación", x: "Cuatro sesiones de negociación, cada una con concesiones que se acumulan. Quien controle el centro del tablero al final se lleva los términos.",
    o: [
      { t: "Sentarte tú a llevar el tablero", j: "cuatro", stat: "red", d: { car: 7, rep: 6, cash: 6000, msg: "Cada concesión que sueltas cambia la posición de todo lo demás." } },
      { t: "Mandar la propuesta cerrada y no negociar", d: { car: 2, rep: 3, ene: 4, msg: "Tómalo o déjalo. Lo toman, con menos entusiasmo del que hubieras querido." } },
    ] },
  { id: 63, min: 2, max: 6, t: "Cuatro postores por el mismo activo", x: "Sala llena, sobre cerrado y nadie sabe con certeza cuánto vale la compañía. Tu estimación es solo eso, una estimación.",
    o: [
      { t: "Entrar a la puja", j: "subasta", stat: "cri", d: { cash: 9000, car: 6, rep: 5, msg: "Levantas la mano en la primera ronda." } },
      { t: "Quedarte fuera y esperar el próximo proceso", d: { cri: 4, ene: 4, car: -1, msg: "No pujas. Meses después te enteras de a cuánto cerró y haces las cuentas de lo que te habría pasado." } },
    ] },
];
E.push.apply(E, E4);

/* ---------- la formación, que en este juego sí cuenta ----------
   La cátedra aparece a lo largo de toda la carrera y siempre suma al
   contador de estudio, que es el que hace que los exámenes se pongan
   más difíciles. Estudiar dentro del juego tiene consecuencias. */
const E5 = [
  { id: 940, min: 0, max: 6, t: "Media hora antes de que llegue todo el mundo",
    x: "Llegas temprano y tienes la oficina para ti. Puedes adelantar el modelo que te pidieron para el viernes o abrir el manual que llevas semanas sin tocar.",
    o: [
      { t: "Sentarte a estudiar un tema a fondo", juego: "catedra", stat: "cri", res: {
        exito: { cri: 7, mod: 3, estudia: 14, msg: "Te sientas con un tema y lo entiendes de verdad. Esas medias horas son las que separan a los que ascienden." },
        parcial: { cri: 4, estudia: 8, msg: "Le dedicas la media hora. No queda todo claro y algo se te quedó." },
        fallo: { cri: 2, estudia: 4, ene: -2, msg: "Lees en diagonal pensando en otra cosa. Algo entra igual, poco." } } },
      { t: "Adelantar el trabajo del viernes", d: { car: 6, rep: 2, ene: -3, msg: "Entregas antes de tiempo. Te lo reconocen y el manual sigue sin abrirse." } },
    ] },
  { id: 941, min: 1, max: 6, t: "La certificación",
    x: "El equipo paga la mitad de un programa de formación. Son seis meses de clases los sábados y un examen que reprueba a la mitad.",
    o: [
      { t: "Presentarte al examen", juego: "catedra", stat: "cri", res: {
        exito: { cri: 9, mod: 5, car: 8, estudia: 22, cash: -900, msg: "Apruebas. La certificación abre puertas que no sabías que estaban cerradas." },
        parcial: { cri: 5, estudia: 12, cash: -900, ene: -4, msg: "Apruebas raspando en la segunda convocatoria. Cuenta igual." },
        fallo: { cri: 2, estudia: 6, cash: -900, ene: -6, rep: -2, msg: "No apruebas. Pierdes seis sábados y el dinero, y sabes bastante más que antes." } } },
      { t: "Este año no, ya vas ahogado", d: { ene: 6, car: -3, msg: "Lo dejas para el año que viene. Como el año pasado." } },
    ] },
  { id: 942, min: 2, max: 6, t: "Te toca explicarlo tú",
    x: "El socio te pide que le expliques a los pasantes cómo funciona lo que el equipo hace todos los días. No hay mejor forma de descubrir lo que no entiendes que tener que explicarlo.",
    o: [
      { t: "Preparártelo en serio y darlo tú", juego: "catedra", stat: "cri", res: {
        exito: { cri: 8, rep: 6, red: 5, estudia: 18, msg: "Lo explicas con claridad y sin trampas. Media oficina se entera de que sabes." },
        parcial: { cri: 4, rep: 2, estudia: 10, msg: "Sales del paso. Te trabas en una pregunta y aprendes justamente de esa." },
        fallo: { cri: 2, rep: -4, estudia: 6, msg: "Se nota que no lo dominabas. Es incómodo y es la clase de golpe que hace estudiar." } } },
      { t: "Pasárselo a otro del equipo", d: { ene: 4, rep: -2, red: -2, msg: "Se lo pasas a un compañero. Él queda bien delante del socio." } },
    ] },
  { id: 943, min: 0, max: 4, t: "Alguien te pregunta algo básico",
    x: "Un amigo fuera del sector te pregunta dónde debería meter sus ahorros. Te das cuenta a media frase de que no sabes explicarlo sin usar palabras que él no entiende.",
    o: [
      { t: "Repasarlo hasta poder explicarlo en cristiano", juego: "catedra", stat: "cri", res: {
        exito: { cri: 7, red: 4, estudia: 12, msg: "Se lo explicas sin una sola palabra técnica. Si puedes hacer eso, lo entiendes." },
        parcial: { cri: 4, estudia: 7, msg: "Te acercas. Sigues necesitando dos tecnicismos para llegar al final." },
        fallo: { cri: 1, estudia: 3, msg: "Le sueltas la jerga de la oficina y se queda igual que antes. Vosotros dos aprendéis lo mismo: nada." } } },
      { t: "Mandarle el nombre de un fondo y ya", d: { red: -2, cri: -2, msg: "Le pasas un nombre sin explicación. Es lo que hace casi todo el mundo y es la razón por la que casi nadie entiende dónde tiene su dinero." } },
    ] },
];
E.push.apply(E, E5);

/* ---------- el criterio de inversión, que se entrena ---------- */
const E6 = [
  { id: 950, min: 3, max: 6, t: "Tres carpetas y un solo cheque",
    x: "El comité tiene capital para una operación y tres candidatas sobre la mesa. Cada una brilla por un lado distinto y falla por otro. Te piden la recomendación.",
    o: [
      { t: "Estudiar los tres negocios y recomendar uno", juego: "comite", stat: "cri", res: {
        exito: { cri: 8, rep: 6, car: 8, cash: 900, estudia: 10, msg: "Recomendaste el bueno y lo defendiste con los números. Eso es lo que hace que te sigan preguntando." },
        parcial: { cri: 4, rep: 2, car: 3, estudia: 6, msg: "Tu recomendación era razonable. Había una mejor y alguien en la sala la vio." },
        fallo: { cri: 3, rep: -5, cash: -1200, estudia: 6, msg: "Recomendaste el peor de los tres. Se compró, y dos años después se supo por qué era el peor." } } },
      { t: "Decir que ninguno vale la pena", chk: { s: "cri", dif: 60 },
        ok: { cri: 6, rep: 4, msg: "Te plantas y no recomiendas ninguno. Pasar es una decisión y a veces la correcta: el comité lo respeta." },
        no: { rep: -4, car: -3, msg: "Pasas de las tres. Una de ellas triplicó en cuatro años y alguien se acordó de que tú dijiste que no." } },
    ] },
  { id: 951, min: 4, max: 6, t: "El nuevo analista quiere aprender",
    x: "El más joven del equipo te pregunta cómo se sabe si un negocio es bueno. Lo más rápido es enseñárselo con tres carpetas encima de la mesa.",
    o: [
      { t: "Sentarte con él y decidir juntos", juego: "comite", stat: "cri", res: {
        exito: { cri: 6, red: 5, rep: 4, estudia: 12, msg: "Le explicas por qué el que más crece no era el mejor. Se le queda para siempre, y a ti también." },
        parcial: { cri: 3, red: 3, estudia: 7, msg: "Lo resuelven a medias. Aprende algo, aunque no lo más importante." },
        fallo: { cri: 2, rep: -2, estudia: 6, msg: "Escoges mal delante de él. Al menos aprendéis los dos, por el camino caro." } } },
      { t: "Mandarle un libro y volver a lo tuyo", d: { car: 3, red: -3, msg: "Le pasas un libro. Es mejor que nada y bastante peor que media hora tuya." } },
    ] },
];
E.push.apply(E, E6);
