/* ============================================================
   LOS DIECIOCHO MODOS
   n nombre · i de qué se trata · tema qué entrena · dur cuánto dura
   pasos cómo se juega, paso por paso · gana cuándo cuenta como éxito
   ensena para qué sirve esto en la vida real
   ============================================================ */
export const JUEGOS = {
  catedra: {
    n: "La clase de las siete", tema: "Temario", dur: "60 s",
    i: "Un tema de finanzas explicado desde cero, con un ejemplo en números, y acto seguido dos o tres preguntas sobre lo que acabas de leer.",
    pasos: [
      "Lees la explicación del tema que te tocó. No hay prisa.",
      "Miras el ejemplo con números, que es donde suele caer la ficha.",
      "Pasas al examen y respondes sobre eso mismo, no sobre otra cosa.",
    ],
    gana: "Todas correctas es éxito. La mitad o más, resultado parcial.",
    ensena: "Es el único modo que enseña antes de examinar. Si hay un concepto que se te resiste, aquí es donde lo vas a entender.",
  },
  comite: {
    n: "El comité de inversión", tema: "Criterio de inversión", dur: "60 s",
    i: "Tres empresas sobre la mesa, capital para una. Los cinco datos que de verdad importan están a la vista y hay que elegir.",
    pasos: [
      "Lees los cinco indicadores de cada negocio: crecimiento, margen, mayor cliente, deuda y ventaja competitiva.",
      "Decides dónde va el capital. No hay pista ni segunda oportunidad.",
      "Se te muestra cuál era el mejor y por qué.",
    ],
    gana: "Acertar el mejor es éxito. El segundo, resultado parcial.",
    ensena: "Distinguir un negocio bueno de uno que solo parece bueno. El que más crece casi nunca es el mejor: lo es el que crece con margen y sin depender de un solo cliente.",
  },
  precision: {
    n: "Calzar el número", tema: "Ejecución", dur: "20 s",
    i: "Un cursor recorre una barra sin parar y tienes que detenerlo dentro de la banda buena.",
    pasos: [
      "El cursor va y viene de un extremo al otro de la barra.",
      "Toca fijar cuando esté dentro de la banda clara del centro.",
      "Son tres intentos y la banda se angosta en cada uno.",
    ],
    gana: "Dos o tres aciertos es éxito. Uno solo es resultado parcial.",
    ensena: "Ejecutar dentro de un rango de precio. Entrar a 100 o a 103 en la misma idea es la diferencia entre ganar y empatar.",
  },
  memoria: {
    n: "Peinar el legajo", tema: "Memoria de trabajo", dur: "30 s",
    i: "Tres rondas. Las casillas se encienden en un orden y tienes que repetirlo, y cada ronda alarga la anterior.",
    pasos: [
      "Ronda uno: se encienden 3 casillas. Tócalas en el mismo orden.",
      "Ronda dos: las mismas 3 y una más al final.",
      "Ronda tres: esas 4 y dos más al final.",
    ],
    gana: "Las tres rondas es éxito. Dos rondas, resultado parcial.",
    ensena: "Retener detalle sin apuntar nada: quién dijo qué, en qué cláusula y en qué página.",
  },
  ojo: {
    n: "Ojo clínico", tema: "Detalle contable", dur: "20 s",
    i: "Una cifra no cuadra con las demás. Encuéntrala antes de que se acabe el tiempo.",
    pasos: [
      "Aparece una grilla de cifras casi idénticas.",
      "Una sola rompe el patrón del resto.",
      "Tócala antes de que corra el reloj.",
    ],
    gana: "Encontrarla rápido es éxito. Encontrarla al filo es parcial.",
    ensena: "En una revisión nadie te señala el error. El número raro está ahí y hay que verlo.",
  },
  anclaje: {
    n: "Anclaje", tema: "Negociación", dur: "30 s",
    i: "Hay un rango de acuerdo que no ves. Mueves tu oferta y lees la respuesta.",
    pasos: [
      "La contraparte tiene un rango de aceptación oculto.",
      "Mueves la oferta y te dice si está cerca, lejos o fuera.",
      "Cierras cuando creas que estás dentro sin haber regalado dinero.",
    ],
    gana: "Cerrar dentro del rango y en el borde que te conviene.",
    ensena: "El primer número que se pone sobre la mesa ancla toda la conversación que viene después.",
  },
  suerte: {
    n: "Aguantar la posición", tema: "Riesgo y disciplina", dur: "30 s",
    i: "El múltiplo sube solo y en algún momento se da vuelta. Tú decides cuándo cerrar.",
    pasos: [
      "Al empezar, el múltiplo arranca en 1,00x y va subiendo poco a poco.",
      "Cierras cuando quieras y te quedas con ese número. Si se da vuelta antes, ese intento se pierde.",
      "Tienes tres intentos y cuenta el mejor. Nadie sabe dónde se da vuelta: cada vez es distinto.",
    ],
    gana: "Cerrar en 3,00x o más es éxito. En 2,00x o más, resultado a medias.",
    ensena: "Toda posición ganadora te invita a esperar un poco más. La ruina casi siempre viene de no tener regla de salida escrita antes de entrar.",
  },
  tresraya: {
    n: "El pulso", tema: "Negociación", dur: "40 s",
    i: "Tres en raya contra la contraparte, con lo que eso significa en una mesa.",
    pasos: [
      "Juegas tres en raya contra el otro lado de la mesa.",
      "Ganar es cerrar en tus términos.",
      "Empatar es partir la diferencia, que muchas veces es el resultado realista.",
    ],
    gana: "Ganar es éxito, empatar es parcial, perder es fallo.",
    ensena: "Casi ninguna negociación se gana por fuerza. Se gana por no dejar abierta la jugada que el otro estaba esperando.",
  },
  quiz: {
    n: "Examen de inversiones", tema: "Conocimiento", dur: "60 s",
    i: "Preguntas de finanzas de verdad, y el nivel sube con los años que llevas de carrera.",
    pasos: [
      "Te toca un bloque de preguntas del nivel que corresponde a tu edad profesional.",
      "Cada respuesta trae una explicación, la aciertes o no.",
      "Con criterio alto se descarta una opción mala antes de responder.",
    ],
    gana: "Todas correctas es éxito. Dos tercios o más es parcial.",
    ensena: "Es el examen que en la vida real nadie te aplica y que igual te van a cobrar. El temario crece contigo: empieza en interés compuesto y termina en estructuración.",
  },
  reaccion: {
    n: "Cerrar la orden", tema: "Ejecución", dur: "15 s",
    i: "Cuando el panel se ponga verde, dale. Si te adelantas, la orden se va al precio equivocado.",
    pasos: [
      "El panel está en espera durante un tiempo que no conoces.",
      "Cuando se pone verde, toca lo más rápido posible.",
      "Adelantarte cuenta como orden mal ejecutada.",
    ],
    gana: "Cinco de seis puntos en tres órdenes.",
    ensena: "En mercados líquidos el precio se mueve mientras dudas. En ilíquidos, el que duda ni siquiera llega a operar.",
  },
  calculo: {
    n: "Cuentas rápidas", tema: "Cálculo mental", dur: "40 s",
    i: "Tres cuentas de cabeza contra reloj, sin calculadora, del tipo que se hace en una reunión.",
    pasos: [
      "Aparece una cuenta con tres respuestas posibles y un reloj corriendo.",
      "Elige antes de que llegue a cero.",
      "Las cuentas se vuelven más difíciles a medida que avanza tu carrera.",
    ],
    gana: "Las tres correctas es éxito, dos es parcial.",
    ensena: "Nadie abre Excel en medio de una reunión. El que aproxima bien de cabeza dirige la conversación.",
  },
  orden: {
    n: "Poner en orden", tema: "Estructura", dur: "25 s",
    i: "Toca los elementos en el orden correcto. Un error y se acaba.",
    pasos: [
      "Te dan una lista desordenada y un criterio de orden.",
      "Toca los elementos uno por uno en la secuencia correcta.",
      "Un error termina el ejercicio.",
    ],
    gana: "Completar toda la secuencia.",
    ensena: "Prelación de cobro, pasos de una valoración, cascada de un fondo. El orden no es un detalle: define quién cobra y quién no.",
  },
  semaforo: {
    n: "Compra o vende", tema: "Lectura de mercado", dur: "25 s",
    i: "Seis señales de mercado, pocos segundos cada una. Decide rápido.",
    pasos: [
      "Aparece una noticia o señal de mercado.",
      "Decides comprar o vender antes de que se agote el tiempo.",
      "Con los años el reloj se acorta y las señales se vuelven ambiguas.",
    ],
    gana: "Cinco o seis aciertos de seis.",
    ensena: "Reaccionar a una noticia sin releerla tres veces. La mayoría de señales son obvias cuando ya sabes qué mira el mercado.",
  },
  trading: {
    n: "La sesión completa", tema: "Operación", dur: "30 s",
    i: "Operas una sesión entera contra el que compró al principio y no tocó nada.",
    pasos: [
      "El precio avanza tick por tick en el gráfico.",
      "Compras y vendes cuando quieras: solo ganas o pierdes mientras estás dentro.",
      "Al final se compara tu cuenta contra comprar y esperar.",
    ],
    gana: "Sacarle cuatro puntos o más a la estrategia pasiva es éxito. Empatar es parcial.",
    ensena: "Ganarle al que no hizo nada es mucho más difícil de lo que parece, y ese es exactamente el punto del ejercicio.",
  },
  estructura: {
    n: "Armar la estructura", tema: "Apalancamiento", dur: "40 s",
    i: "Compras una empresa de 100 millones. Tú pones una parte y el banco te presta el resto.",
    pasos: [
      "Con la barra decides cuánto te presta el banco. Lo que falta lo pones tú.",
      "Debajo ves qué pasa con tu dinero si a la empresa le va bien y si le va mal.",
      "Más préstamo: ganas más si va bien, pero pierdes más si va mal. Busca el punto medio.",
    ],
    gana: "Cumplir las dos metas es éxito. Una sola, resultado a medias.",
    ensena: "La deuda multiplica el retorno del capital y también el riesgo de perderlo todo. Pasado cierto punto el banco manda, no tú.",
  },
  banderas: {
    n: "Banderas rojas", tema: "Due diligence", dur: "45 s",
    i: "Un expediente con señales mezcladas. Marca solo las que de verdad preocupan.",
    pasos: [
      "Lees una lista de hechos sobre una empresa o un fondo.",
      "Marcas los que son verdaderas señales de alarma.",
      "Marcar cosas normales como sospechosas también cuenta en contra.",
    ],
    gana: "Encontrar todas las banderas rojas sin falsos positivos.",
    ensena: "El fraude casi nunca se esconde. Está en el expediente, mezclado con veinte datos irrelevantes que distraen.",
  },
  pares: {
    n: "La pizarra del comité", tema: "Conceptos", dur: "40 s",
    i: "Fichas boca abajo: une cada concepto con lo que significa.",
    pasos: [
      "Antes de empezar ves la pizarra destapada unos segundos: mira dónde queda cada cosa.",
      "Después se tapa y destapas dos por turno. Cada par tiene su color: el concepto y su definición se pintan igual.",
      "Tienes un número limitado de fallos.",
    ],
    gana: "Completar la pizarra con pocos fallos.",
    ensena: "Manejar el vocabulario sin dudar. En una mesa, dudar de qué es el WACC cuesta más que equivocarse en la cuenta.",
  },
  carril: {
    n: "El carril del capital", tema: "Asignación y reflejos", dur: "25 s",
    i: "Tu capital corre por tres carriles y tú decides por cuál va.",
    pasos: [
      "Tu capital avanza por uno de tres carriles.",
      "Te cambias de carril para atrapar retornos y esquivar los golpes.",
      "Cada golpe recibido resta y cada retorno atrapado suma.",
    ],
    gana: "Puntos altos con pocos golpes.",
    ensena: "Rotar entre activos parece fácil visto en retrospectiva. En tiempo real casi siempre te cambias tarde.",
  },
  cuatro: {
    n: "Cuatro en línea", tema: "Negociación", dur: "60 s",
    i: "Cuatro fichas seguidas contra la contraparte.",
    pasos: [
      "Sueltas fichas por columna, igual que en el juego de mesa.",
      "Ganas con cuatro en línea en cualquier dirección.",
      "El que controla el centro del tablero controla la negociación.",
    ],
    gana: "Ganar la partida. El empate es parcial.",
    ensena: "Pensar dos jugadas por delante y bloquear al otro sin dejar de construir lo tuyo.",
  },
  subasta: {
    n: "La subasta", tema: "Valoración y disciplina", dur: "40 s",
    i: "Tú y tres rivales pujan por la misma empresa, y nadie sabe cuánto vale de verdad.",
    pasos: [
      "Tienes tu propia estimación de lo que vale. Puede estar equivocada, por arriba o por abajo.",
      "En cada ronda subes la oferta o te retiras. Cada rival tiene su límite y se retira al pasarlo.",
      "Si se retiran todos, es tuya al precio que quedó. Si te retiras tú, la subasta sigue sin ti.",
    ],
    gana: "Ganar pagando lo que vale o menos es éxito. Retirarte cuando el que gana acaba pagando de más, también.",
    ensena: "La maldición del ganador: en una subasta, el que más paga suele ser el que más se equivocó estimando.",
  },
};
