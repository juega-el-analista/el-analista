import { numero, entero, clamp } from "../motor/aritmetica.js";
import { BANCO, BANCO0, BANCO3, BANCO2 } from "./preguntas.js";

/* ============================================================
   CÁTEDRA · el temario con clase y examen
   Cada tema trae una explicación en lenguaje llano, un ejemplo con
   números y preguntas propias. El minijuego "Cátedra" toma un tema
   al azar del nivel que te toca, te lo explica y te examina de
   inmediato. Es lo que evita que el juego pregunte cosas que nunca
   se molestó en enseñar.
   ============================================================ */
/* el temario completo, con su nivel */
export const TEMAS = [
  /* ---------------- nivel 1 · fundamentos ---------------- */
  {
    id: "invertir", nv: 1, n: "Qué significa invertir",
    x: "Invertir es entregarle tu dinero a algo que trabaja mientras tú no estás: una empresa, un gobierno, un inmueble. A cambio de ese uso, esperas recibir más de lo que pusiste. No es apostar, porque apostar es un juego de suma cero donde alguien gana lo que otro pierde; invertir es participar de algo que produce valor nuevo.",
    ej: "Le prestas 1.000 a una panadería que abre un local nuevo. El local vende, la panadería te devuelve 1.080. Los 80 no se los quitaste a nadie: los produjo el pan que se vendió.",
    q: [
      { q: "¿Cuál es la diferencia de fondo entre invertir y apostar?", ops: ["Invertir participa de algo que produce valor; apostar solo reparte el dinero que ya existe", "Invertir siempre gana y apostar siempre pierde", "Invertir es legal y apostar no", "No hay diferencia real, solo el nombre"], correcta: "Invertir participa de algo que produce valor; apostar solo reparte el dinero que ya existe", e: "En la apuesta, lo que tú ganas alguien lo perdió. En la inversión productiva puede crecer el total, y por eso a largo plazo hay un retorno esperado positivo." },
      { q: "Si una inversión te promete rendimiento alto y garantizado, ¿qué es lo más sensato pensar?", ops: ["Que algo no cuadra: rendimiento alto y garantía no van juntos", "Que hay que entrar rápido antes de que se acabe", "Que el que la ofrece encontró una fórmula mejor", "Que es una buena forma de empezar por ser segura"], correcta: "Que algo no cuadra: rendimiento alto y garantía no van juntos", e: "Es la señal más confiable de una estafa. Si de verdad existiera rendimiento alto sin riesgo, el dinero institucional lo habría absorbido antes de que llegara a ti." },
      { q: "Tienes el dinero quieto en la cuenta y no pierdes nada nominalmente. ¿Estás sin riesgo?", ops: ["No: la inflación te quita poder de compra todos los años", "Sí, mientras el número no baje estás protegido", "Sí, porque el banco garantiza el saldo", "Solo hay riesgo si inviertes"], correcta: "No: la inflación te quita poder de compra todos los años", e: "El efectivo tiene el riesgo más silencioso que existe. El número no baja, pero lo que compras con él sí." },
    ],
  },
  {
    id: "compuesto", nv: 1, n: "El interés compuesto",
    x: "Si ganas 8% sobre 100, tienes 108. Al año siguiente ganas 8% sobre 108, no sobre 100. Esa diferencia mínima, repetida treinta veces, es lo que separa a alguien que terminó con dinero de alguien que no. Lo importante no es la tasa: es el número de años que dejas que corra.",
    ej: "1.000 al 8% anual: a los 10 años son 2.159, a los 20 son 4.661, a los 30 son 10.063. Los primeros diez años aportaron 1.159; los últimos diez aportaron 5.400.",
    q: [
      { q: "¿Cuál de estos dos factores pesa más en el resultado final a treinta años?", ops: ["Los años que el dinero lleva invertido", "Acertar el mejor momento para entrar", "La cantidad de operaciones que hagas", "El nombre del fondo que elijas"], correcta: "Los años que el dinero lleva invertido", e: "El tiempo entra al cálculo como exponente y la tasa como base. Por eso empezar diez años antes suele ganarle a rendir dos puntos más." },
      { q: "Alguien invierte 200 al mes desde los 25 y para a los 35. Otro invierte lo mismo desde los 35 hasta los 65. ¿Quién suele terminar con más a los 65?", ops: ["Depende de la tasa, pero el primero muchas veces gana aunque puso mucho menos", "Siempre el segundo, porque puso tres veces más dinero", "Siempre empatan", "El primero, con seguridad, en cualquier escenario"], correcta: "Depende de la tasa, pero el primero muchas veces gana aunque puso mucho menos", e: "Es el ejemplo clásico del coste de esperar. Con tasas altas el que empezó antes gana; con tasas bajas no siempre. Lo que nunca cambia es que sus aportes valieron mucho más por unidad." },
      { q: "Una pérdida del 50%, ¿con qué ganancia se recupera?", ops: ["100%", "50%", "75%", "Depende del activo"], correcta: "100%", e: "De 100 caes a 50; para volver a 100 necesitas duplicar. Esta asimetría es la razón de fondo por la que evitar caídas grandes importa más que capturar subidas grandes." },
    ],
  },
  {
    id: "inflacion", nv: 1, n: "La inflación",
    x: "La inflación es la subida general de los precios. Si es 5%, lo que hoy cuesta 100 el año que viene cuesta 105. Tu sueldo y tus ahorros valen en función de lo que compran, no de la cifra que dicen. Por eso el rendimiento que importa es el real: lo que ganaste menos la inflación.",
    ej: "Ganaste 3% en el año y la inflación fue seis. Tu número subió, tu poder de compra bajó 3%. Ganaste nominalmente y perdiste realmente.",
    q: [
      { q: "Tu inversión rindió 4% y la inflación fue siete. ¿Qué pasó de verdad?", ops: ["Perdiste alrededor de 3% de poder de compra", "Ganaste 4%", "Quedaste igual", "Ganaste 11%"], correcta: "Perdiste alrededor de 3% de poder de compra", e: "El rendimiento real es lo nominal menos la inflación. Es el único que se puede comer." },
      { q: "¿A quién beneficia la inflación alta e inesperada?", ops: ["Al que debe dinero a tasa fija", "Al que tiene todo en efectivo", "Al que prestó dinero a tasa fija", "A nadie, perjudica igual a todos"], correcta: "Al que debe dinero a tasa fija", e: "La deuda se devuelve en dinero que vale menos. Por eso la inflación transfiere riqueza de acreedores a deudores, y por eso los países muy endeudados rara vez la odian tanto como dicen." },
      { q: "En un país con inflación alta y persistente, ¿qué error es más caro?", ops: ["Mantener el grueso del patrimonio en moneda local sin remunerar", "Tener una parte en efectivo para emergencias", "Invertir en activos reales", "Diversificar por monedas"], correcta: "Mantener el grueso del patrimonio en moneda local sin remunerar", e: "En inflación alta el efectivo quieto es el activo que más rápido se destruye. Tener un colchón está bien; tener el patrimonio ahí, no." },
    ],
  },
  {
    id: "emergencia", nv: 1, n: "El fondo de emergencia",
    x: "Antes de invertir un solo peso hay que tener dinero aburrido y disponible: entre 3 y 6 meses de tus gastos, en efectivo o en algo que se convierta en efectivo mañana. No está ahí para rendir. Está ahí para que cuando se dañe el carro, se caiga un cliente o te enfermes, no tengas que vender tus inversiones justo cuando están abajo.",
    ej: "Gastas 1.200 al mes. Tu fondo de emergencia son entre 3.600 y 7.200. Rinde poco y eso está bien: su trabajo es estar, no crecer.",
    q: [
      { q: "¿Cuál es la función real del fondo de emergencia?", ops: ["Evitar que vendas tus inversiones en el peor momento", "Maximizar el rendimiento de tu efectivo", "Sustituir a un seguro", "Aprovechar caídas del mercado"], correcta: "Evitar que vendas tus inversiones en el peor momento", e: "Es un instrumento de comportamiento, no de rentabilidad. Su valor aparece exactamente el año en que todo lo demás está en rojo." },
      { q: "Tienes deudas de tarjeta al 60% anual y estás armando el fondo de emergencia. ¿Qué conviene?", ops: ["Un fondo mínimo y atacar la tarjeta: ninguna inversión rinde 60% seguro", "Ignorar la tarjeta hasta tener seis meses de gastos", "Invertir en acciones para ganarle a la tarjeta", "Pagar solo el mínimo y ahorrar el resto"], correcta: "Un fondo mínimo y atacar la tarjeta: ninguna inversión rinde 60% seguro", e: "Pagar una deuda al sesenta es un rendimiento garantizado del sesenta. No existe inversión legal que compita con eso." },
    ],
  },
  {
    id: "accionbono", nv: 1, n: "Acciones y bonos",
    x: "Una acción te hace socio: te toca lo que sobre después de pagarle a todo el mundo, que puede ser mucho o nada. Un bono te hace acreedor: te deben una cantidad fija y te la pagan antes que a los socios, pero por más que le vaya bien a la empresa a ti te siguen pagando lo mismo. Socio cobra último y sin techo; acreedor cobra primero y con techo.",
    ej: "La empresa gana un año histórico: el accionista ve subir su acción, el bonista cobra su mismo cupón. La empresa quiebra: el bonista recupera algo del remate, el accionista suele quedarse en cero.",
    q: [
      { q: "Si una empresa quiebra, ¿quién cobra primero?", ops: ["Los bonistas, antes que los accionistas", "Los accionistas, por ser dueños", "Los dos a la vez y en partes iguales", "Depende de quién invirtió antes"], correcta: "Los bonistas, antes que los accionistas", e: "Es el orden de prelación. El accionista es residual: se queda con lo que sobre, y en una quiebra normalmente no sobra." },
      { q: "¿Por qué las acciones rinden más que los bonos a largo plazo?", ops: ["Porque cargan con más riesgo y el mercado paga por asumirlo", "Porque las empresas son mejores que los gobiernos", "Porque los bonos son una estafa", "Porque las acciones no pueden bajar a largo plazo"], correcta: "Porque cargan con más riesgo y el mercado paga por asumirlo", e: "La prima de riesgo es una compensación, no un regalo. Y compensación esperada no es compensación garantizada: hay décadas en las que no aparece." },
      { q: "Un bono de un gobierno con problemas paga 18%. ¿Qué te está diciendo esa tasa?", ops: ["Que el mercado ve una probabilidad real de que no pague", "Que es una oportunidad que otros no vieron", "Que ese gobierno es generoso", "Que los bonos siempre pagan más que las acciones"], correcta: "Que el mercado ve una probabilidad real de que no pague", e: "La tasa alta es el precio del miedo, no un descuento. Cuando algo rinde mucho más que lo comparable, el rendimiento extra es la factura del riesgo." },
    ],
  },
  {
    id: "diversificacion", nv: 1, n: "Diversificar de verdad",
    x: "Diversificar no es tener muchas cosas: es tener cosas que no se caigan juntas. Diez acciones de bancos del mismo país son una sola apuesta repartida en diez papeles. Lo que reduce el riesgo es que los activos reaccionen distinto al mismo golpe, y eso es lo único que la teoría financiera considera gratis.",
    ej: "Cinco activos con la misma volatilidad, pero que se mueven independientes, forman una cartera con menos de la mitad de la volatilidad de cada uno. Si se mueven todos igual, la cartera tiene exactamente la misma volatilidad que uno solo.",
    q: [
      { q: "Tienes acciones de seis bancos distintos del mismo país. ¿Estás diversificado?", ops: ["No, es una sola apuesta al sector bancario de ese país repartida en seis papeles", "Sí, seis empresas distintas son diversificación", "Sí, siempre que sean de distinto tamaño", "Depende de cuánto pusiste en cada una"], correcta: "No, es una sola apuesta al sector bancario de ese país repartida en seis papeles", e: "Lo que importa es la correlación, no el número de nombres. Si una crisis bancaria los golpea a todos a la vez, tener seis no te salvó de nada." },
      { q: "¿Qué le pasa a la correlación entre activos durante una crisis fuerte?", ops: ["Tiende a subir: cosas que parecían independientes caen juntas", "Baja, y por eso la diversificación funciona mejor en crisis", "Se mantiene igual", "Desaparece"], correcta: "Tiende a subir: cosas que parecían independientes caen juntas", e: "Es la ironía cruel del asunto: la diversificación se debilita justo cuando más la necesitas. No la vuelve inútil, pero explica por qué las carteras 'bien repartidas' igual sufren." },
    ],
  },
  {
    id: "presupuesto", nv: 1, n: "Ingreso, gasto y la resta",
    x: "El patrimonio no lo construye lo que ganas: lo construye la diferencia entre lo que ganas y lo que gastas. Alguien con un sueldo enorme y un tren de vida a la altura no acumula nada. La tasa de ahorro, el porcentaje de lo que entra que no se gasta, predice tu futuro financiero mucho mejor que tu sueldo.",
    ej: "Ganas 5.000 y gastas 4.800: ahorras 4% y necesitas décadas. Ganas 3.000 y gastas 2.100: ahorras 30% y llegas antes que el primero.",
    q: [
      { q: "¿Qué predice mejor tu patrimonio a veinte años?", ops: ["Tu tasa de ahorro", "Tu sueldo bruto", "El sector en el que trabajas", "El país donde vives"], correcta: "Tu tasa de ahorro", e: "El sueldo abre la posibilidad; la tasa de ahorro la ejecuta. Es la razón por la que hay médicos quebrados y maestros con patrimonio." },
      { q: "Te suben el sueldo 30% y subes tu tren de vida 30%. ¿Qué pasó con tu independencia financiera?", ops: ["Se alejó: ahora necesitas un patrimonio mayor para cubrir tu vida", "Se acercó, porque ganas más", "No cambió", "Se acercó solo si invertiste el aumento"], correcta: "Se alejó: ahora necesitas un patrimonio mayor para cubrir tu vida", e: "Se llama inflación del estilo de vida. Como la meta es 25 veces tu gasto anual, subir el gasto mueve la meta hacia adelante más rápido de lo que ahorras." },
    ],
  },
  {
    id: "deuda", nv: 1, n: "Deuda que suma y deuda que resta",
    x: "La deuda no es buena ni mala por sí sola: depende de qué compra y a qué tasa. Deuda barata que compra algo que produce ingreso o se aprecia puede tener sentido. Deuda cara que compra consumo que pierde valor es la forma más rápida y silenciosa de destruir patrimonio.",
    ej: "Hipoteca al 7% sobre un inmueble que renta seis y se aprecia tres: el conjunto suma. Tarjeta al 60% sobre un viaje: el viaje ya pasó y la deuda sigue creciendo.",
    q: [
      { q: "¿Qué hace que una deuda sea 'buena'?", ops: ["Que su tasa sea menor que el retorno de lo que compra", "Que sea de un banco grande", "Que el plazo sea largo", "Que la cuota quepa en tu sueldo"], correcta: "Que su tasa sea menor que el retorno de lo que compra", e: "Que la cuota quepa es una condición para no quebrar, no una razón para endeudarse. La comparación relevante es tasa contra retorno del activo." },
      { q: "Pagar una tarjeta que cobra 40% anual equivale a...", ops: ["Una inversión con rendimiento garantizado del 40%", "Un gasto sin retorno", "Una inversión de riesgo medio", "Nada, es solo saldar una cuenta"], correcta: "Una inversión con rendimiento garantizado del 40%", e: "Es el mejor rendimiento ajustado por riesgo al que la mayoría de la gente tiene acceso en su vida, y casi nadie lo ve así." },
    ],
  },

  /* ---------------- macroeconomía y banca ---------------- */
  {
    id: "comobanco", nv: 1, n: "De dónde sale el dinero de un banco",
    x: "Un banco no guarda tu dinero en una caja fuerte esperando a que vuelvas. Lo presta. Toma los depósitos de mucha gente, presta la mayor parte y se queda con la diferencia entre lo que paga por tus ahorros y lo que cobra por los préstamos. Por eso puede pagarte poco y cobrar mucho: ese diferencial es su negocio entero.",
    ej: "Te paga 2% por tu depósito y presta ese mismo dinero al 14. Los 12 puntos de diferencia son su margen, antes de gastos y de los préstamos que no le devuelvan.",
    q: [
      { q: "¿Qué hace un banco con el dinero que depositas?", ops: ["Prestarlo a otros y quedarse con la diferencia de tasa", "Guardarlo íntegro hasta que lo pidas", "Invertirlo todo en bolsa", "Enviarlo al banco central"], correcta: "Prestarlo a otros y quedarse con la diferencia de tasa", e: "Se llama intermediación financiera. Si todos los depositantes pidieran su dinero el mismo día, ningún banco del mundo podría pagarlo: por eso existe la regulación." },
      { q: "El diferencial entre lo que el banco te paga y lo que cobra se llama", ops: ["Margen de intermediación", "Comisión de apertura", "Encaje", "Prima de riesgo"], correcta: "Margen de intermediación", e: "Es la principal fuente de ingresos de la banca tradicional, y la razón por la que la cuenta de ahorro rinde tan poco." },
    ],
  },
  {
    id: "encaje", nv: 2, n: "El encaje legal",
    x: "El encaje es la parte de los depósitos que un banco está obligado a NO prestar: se queda inmovilizada en el banco central. Sirve para dos cosas: que quede algo si mucha gente retira a la vez, y para que el banco central pueda abrir o cerrar el grifo del crédito de todo un país cambiando un solo número.",
    ej: "Con encaje del 20%, de cada 100 que depositas el banco solo puede prestar 80. Si el banco central lo sube al 30, ese banco tiene que recortar crédito de golpe, aunque no haya cambiado nada más.",
    q: [
      { q: "Si el banco central sube el encaje legal, ¿qué pasa con el crédito?", ops: ["Se encarece y se reduce: hay menos dinero disponible para prestar", "Se abarata, porque los bancos tienen más reservas", "No cambia nada", "Solo afecta a los depósitos, no a los préstamos"], correcta: "Se encarece y se reduce: hay menos dinero disponible para prestar", e: "Es una de las herramientas más directas que existen para enfriar una economía, y una de las más bruscas." },
      { q: "¿Para qué sirve principalmente el encaje?", ops: ["Para que el banco pueda responder a los retiros y para controlar cuánto crédito hay en la economía", "Para pagar los sueldos del banco", "Para garantizar la rentabilidad del depositante", "Para financiar al gobierno"], correcta: "Para que el banco pueda responder a los retiros y para controlar cuánto crédito hay en la economía", e: "Es a la vez un colchón de liquidez y una palanca de política monetaria." },
      { q: "Trampa: con encaje del 20%, tu dinero está guardado al 20% en el banco. ¿Verdadero o falso?", ops: ["Falso: el encaje aplica al total de depósitos del banco, no a tu cuenta en particular", "Verdadero, una quinta parte de lo tuyo está reservada", "Verdadero solo en cuentas de ahorro", "Falso, el encaje lo paga el cliente"], correcta: "Falso: el encaje aplica al total de depósitos del banco, no a tu cuenta en particular", e: "No hay una porción marcada con tu nombre. El encaje es un porcentaje agregado sobre el balance del banco." },
    ],
  },
  {
    id: "tasarectora", nv: 2, n: "Cómo se maneja el dinero de un país",
    x: "El banco central no imprime billetes cada vez que hace falta: lo que mueve es el precio del dinero, la tasa de referencia a la que se prestan los bancos entre ellos. Si sube esa tasa, todo el crédito del país se encarece, la gente pide menos, se consume menos y los precios se enfrían. Si la baja, pasa lo contrario. Casi toda la política monetaria es ese único dial.",
    ej: "Sube la tasa de referencia del 6 al 11%: tu hipoteca variable sube, tu banco te paga algo más por ahorrar, las empresas posponen inversiones y la bolsa suele caer. Un solo número mueve todo eso.",
    q: [
      { q: "El banco central sube la tasa de referencia. ¿Qué es lo más probable?", ops: ["Que el crédito se encarezca y la economía se enfríe", "Que suban los salarios", "Que la bolsa suba de inmediato", "Que baje el desempleo"], correcta: "Que el crédito se encarezca y la economía se enfríe", e: "Es exactamente lo que se busca cuando hay inflación alta: bajar la demanda a costa de frenar el crecimiento." },
      { q: "¿Por qué las bolsas suelen caer cuando suben las tasas?", ops: ["Porque los beneficios futuros valen menos hoy y la deuda cuesta más", "Porque las empresas dejan de vender", "Porque los inversores se asustan sin motivo", "Porque el gobierno lo prohíbe"], correcta: "Porque los beneficios futuros valen menos hoy y la deuda cuesta más", e: "Es la misma mecánica del valor presente: sube la tasa de descuento, baja lo que vale hoy cualquier flujo futuro." },
    ],
  },
  {
    id: "interescomo", nv: 1, n: "Qué es de verdad una tasa de interés",
    x: "Una tasa de interés es el precio de usar dinero ajeno durante un tiempo. Nada más. Cuando pides prestado la pagas; cuando ahorras o inviertes la cobras. Lo importante es mirar tres cosas: si es anual o mensual, si es fija o variable, y si incluye todos los costes o solo el interés puro.",
    ej: "Un 3% mensual suena poco al lado de un 30 anual, y no lo es: 3% mensual compuesto son más del 42% al año.",
    q: [
      { q: "Una tarjeta cobra 3% mensual. ¿Cuánto es al año, aproximadamente?", ops: ["Más del 42%", "36% exactos", "3%", "18%"], correcta: "Más del 42%", e: "El interés se compone también en tu contra. Multiplicar por doce se queda corto: hay que elevar a doce." },
      { q: "Te ofrecen un préstamo al 12% anual más comisión de apertura del 4 y seguro obligatorio. ¿Qué te cuesta de verdad?", ops: ["Bastante más del 12: hay que mirar el coste total, no la tasa suelta", "Exactamente 12%", "16%, sumando la comisión", "Depende solo del plazo"], correcta: "Bastante más del 12: hay que mirar el coste total, no la tasa suelta", e: "Por eso existe la tasa efectiva o coste total: la tasa nominal a solas casi nunca dice lo que vas a pagar." },
      { q: "Tasa fija o variable, ¿cuál es la diferencia que importa?", ops: ["Con la fija sabes la cuota siempre; con la variable asumes tú el riesgo de que suban las tasas", "La fija siempre es más barata", "La variable es ilegal en préstamos largos", "No hay diferencia real"], correcta: "Con la fija sabes la cuota siempre; con la variable asumes tú el riesgo de que suban las tasas", e: "La fija suele empezar más cara: esa diferencia es lo que cuesta el seguro contra subidas." },
    ],
  },
  {
    id: "ahorrar", nv: 1, n: "Ahorrar no es lo mismo que invertir",
    x: "Ahorrar es apartar dinero y que siga estando ahí mañana: seguro, disponible y con rendimiento bajo o nulo. Invertir es poner ese dinero a producir aceptando que puede bajar. Las dos cosas hacen falta y sirven para cosas distintas: el ahorro es para lo que necesitas pronto o de repente, la inversión para lo que no vas a tocar en años.",
    ej: "La cuota del colegio de enero se ahorra. La jubilación de dentro de treinta años se invierte. Cambiarlas de sitio es el error más caro que se comete con los dos.",
    q: [
      { q: "El dinero que vas a necesitar dentro de seis meses, ¿dónde debería estar?", ops: ["En algo seguro y disponible, aunque rinda poco", "En acciones, para que crezca mientras tanto", "En cripto, por el rendimiento", "En un inmueble"], correcta: "En algo seguro y disponible, aunque rinda poco", e: "En seis meses una cartera de riesgo puede estar en cualquier sitio. Para plazos cortos, lo que importa es que el dinero esté, no que crezca." },
      { q: "¿Cuál es el riesgo real de solo ahorrar y nunca invertir?", ops: ["Que la inflación te vaya quitando poder de compra año tras año", "Ninguno, el ahorro es seguro", "Que el banco quiebre", "Que pagues más impuestos"], correcta: "Que la inflación te vaya quitando poder de compra año tras año", e: "El ahorro protege del susto y no protege del tiempo. A treinta años, no invertir es una decisión con coste, aunque no lo parezca." },
    ],
  },
  {
    id: "cartacredito", nv: 3, n: "La carta de crédito",
    x: "Cuando dos empresas de países distintos hacen negocios, ninguna quiere ir primero: el que envía teme no cobrar y el que paga teme no recibir. La carta de crédito resuelve eso metiendo a un banco en medio. El banco del comprador se compromete a pagar, pero solo contra documentos que prueben que la mercancía se embarcó como se pactó. El banco no juzga la mercancía: juzga los papeles.",
    ej: "Un importador venezolano compra maquinaria en Italia. Su banco emite una carta de crédito; el italiano embarca, presenta conocimiento de embarque y factura, y cobra de su banco. Si un documento no coincide con lo pactado, no le pagan aunque la máquina esté en el puerto.",
    q: [
      { q: "¿Qué problema resuelve una carta de crédito?", ops: ["Que ninguna de las dos partes quiera ser la primera en cumplir", "Que la mercancía sea de buena calidad", "Que el flete sea más barato", "Que no haya que pagar aranceles"], correcta: "Que ninguna de las dos partes quiera ser la primera en cumplir", e: "Sustituye la confianza entre dos desconocidos por la solvencia de un banco. Es de los instrumentos más antiguos del comercio y sigue funcionando igual." },
      { q: "El banco emisor paga contra...", ops: ["Documentos que cumplan exactamente lo pactado", "La mercancía recibida y revisada", "La palabra del vendedor", "La inspección del comprador"], correcta: "Documentos que cumplan exactamente lo pactado", e: "Se llama principio de estricto cumplimiento documental. Una fecha mal puesta puede bloquear el pago de un contenedor entero." },
      { q: "Trampa: una carta de crédito garantiza que la mercancía llegue en buen estado. ¿Verdadero o falso?", ops: ["Falso: garantiza el pago contra documentos, no la calidad de lo enviado", "Verdadero, el banco responde por la mercancía", "Verdadero si es irrevocable", "Falso, no garantiza nada"], correcta: "Falso: garantiza el pago contra documentos, no la calidad de lo enviado", e: "Es la confusión más común. Para la mercancía están la inspección previa y el seguro; el banco solo mira papeles." },
    ],
  },
  {
    id: "devaluacion", nv: 2, n: "Devaluación y tipo de cambio",
    x: "El tipo de cambio es el precio de una moneda en otra. Cuando tu moneda se devalúa, todo lo importado sube y tus ahorros en moneda local valen menos medidos en dólares, aunque el número de tu cuenta no se haya movido. Para quien cobra en local y gasta en importado, una devaluación es un recorte de sueldo que nadie le anunció.",
    ej: "Ganas 2.000.000 al mes y el dólar pasa de 4.000 a 6.000. Tu sueldo sigue diciendo lo mismo y pasó de valer 500 dólares a 333. No te bajaron el sueldo: te lo devaluaron.",
    q: [
      { q: "Tu moneda se devalúa un 30% y tú cobras y ahorras en ella. ¿Qué te pasó?", ops: ["Perdiste poder de compra sobre todo lo importado, sin que cambiara el número de tu cuenta", "Nada, mientras no cambies a dólares", "Ganaste, porque exportar es más barato", "Solo te afecta si viajas"], correcta: "Perdiste poder de compra sobre todo lo importado, sin que cambiara el número de tu cuenta", e: "Es la pérdida más silenciosa que existe: el saldo no baja, baja lo que compra." },
      { q: "¿Quién suele beneficiarse de una devaluación?", ops: ["El que exporta o cobra en moneda fuerte", "El que importa insumos", "El que tiene deuda en dólares", "El asalariado local"], correcta: "El que exporta o cobra en moneda fuerte", e: "Cobra en una moneda que subió y paga costes en la que bajó. El que debe en dólares y gana en local está en el lado exactamente opuesto." },
    ],
  },
  {
    id: "hiperinflacion", nv: 3, n: "Cuando la inflación se desboca",
    x: "La inflación normal erosiona; la hiperinflación destruye. Por encima de cierto punto la gente deja de usar la moneda para guardar valor y empieza a gastarla el mismo día que la recibe, lo que acelera todavía más los precios. En ese régimen, ahorrar en moneda local no es conservador: es la posición más arriesgada que existe.",
    ej: "Con inflación del 50% mensual, el dinero pierde la mitad de su valor cada mes. Lo que costaba 100 en enero cuesta más de 12.000 en diciembre.",
    q: [
      { q: "En una economía con inflación muy alta, tener todo el patrimonio en efectivo local es", ops: ["La posición de más riesgo, aunque parezca la más prudente", "La más segura", "Indiferente", "Recomendable a corto plazo"], correcta: "La posición de más riesgo, aunque parezca la más prudente", e: "El riesgo no es que el número baje: es que deje de comprar. En hiperinflación esa pérdida es rápida y total." },
      { q: "¿Por qué la hiperinflación se acelera sola?", ops: ["Porque la gente gasta el dinero de inmediato para no perderlo, y eso empuja más los precios", "Porque los bancos suben las tasas", "Porque bajan los salarios", "Porque se importa menos"], correcta: "Porque la gente gasta el dinero de inmediato para no perderlo, y eso empuja más los precios", e: "Se llama aumento de la velocidad del dinero. Es un círculo que se retroalimenta y por eso es tan difícil de frenar." },
    ],
  },
  {
    id: "burbuja", nv: 4, n: "Ciclos, burbujas y recesiones",
    x: "Las economías se mueven en ciclos: expansión, euforia, contracción, recuperación. En la euforia el crédito es fácil, todo el mundo tiene una historia de por qué esta vez es distinto, y los precios se despegan de lo que las cosas producen. La recesión no es un accidente del sistema: es la parte del ciclo en la que se corrige lo que se estiró.",
    ej: "Precios de vivienda subiendo el 20% anual mientras los alquileres suben el 3. Esa brecha no la cierra el alquiler subiendo: la cierra el precio bajando.",
    q: [
      { q: "¿Cuál es la señal más común de una burbuja?", ops: ["Que el precio se separe de lo que el activo produce, y que el crédito sea fácil", "Que suba mucho en un mes", "Que salga en las noticias", "Que suba el volumen negociado"], correcta: "Que el precio se separe de lo que el activo produce, y que el crédito sea fácil", e: "La subida sola no dice nada. Lo que la delata es el divorcio entre precio y flujo, financiado con deuda barata." },
      { q: "En la parte alta del ciclo, ¿qué error se comete más?", ops: ["Confundir un mercado alcista con criterio propio y subir el apalancamiento", "Vender demasiado pronto", "Diversificar en exceso", "Guardar demasiado efectivo"], correcta: "Confundir un mercado alcista con criterio propio y subir el apalancamiento", e: "Cuando todo sube, cualquiera acierta. La factura llega cuando el ciclo gira y encuentra a la gente apalancada." },
    ],
  },

  /* ---------------- nivel 2 · intermedio ---------------- */
  {
    id: "indexado", nv: 2, n: "Fondos indexados",
    x: "Un fondo indexado compra todas las empresas de un mercado en proporción a su tamaño, sin intentar escoger. Como no paga analistas ni opera mucho, cobra comisiones mínimas. A treinta años, la mayoría de los fondos que sí intentan escoger terminan por debajo del índice, y la causa principal no es que sean tontos: son las comisiones y el coste de operar.",
    ej: "Un índice rinde 8%. Un fondo activo que cobra 1,8% tiene que acertar lo suficiente para superar al índice por 1,8 puntos solo para empatar. Muy pocos lo logran de forma sostenida.",
    q: [
      { q: "¿Por qué la mayoría de los fondos activos pierde contra su índice a largo plazo?", ops: ["Por las comisiones y los costes de operar acumulados", "Porque sus gestores no saben de finanzas", "Porque los índices hacen trampa", "Porque el mercado siempre sube"], correcta: "Por las comisiones y los costes de operar acumulados", e: "En agregado, los activos son el mercado. Antes de costes empatan con el índice por definición; después de costes quedan por debajo. Es aritmética, no talento." },
      { q: "Un fondo cobra 2% anual en vez de 0,2. Sobre treinta años, esa diferencia se lleva aproximadamente...", ops: ["Alrededor de un tercio o más del capital final", "Un 2% del total", "Un 10% del total", "Nada relevante"], correcta: "Alrededor de un tercio o más del capital final", e: "La comisión se cobra cada año sobre el saldo completo, así que también se compone. Es el gasto que más gente subestima por venir expresado en números pequeños." },
      { q: "Trampa: 'el fondo que más rindió el año pasado' es una buena forma de elegir. ¿Verdadero o falso?", ops: ["Falso: el rendimiento pasado reciente no predice el futuro y suele revertir", "Verdadero, indica un buen gestor", "Verdadero si rindió mucho más que el resto", "Depende del sector"], correcta: "Falso: el rendimiento pasado reciente no predice el futuro y suele revertir", e: "Perseguir al ganador del año pasado es la conducta más común y más cara del inversor particular. Suele comprar caro justo antes de la reversión." },
    ],
  },
  {
    id: "comisiones", nv: 2, n: "Comisiones y costes ocultos",
    x: "Toda operación tiene fricción: comisión de compraventa, diferencia entre precio de compra y de venta, impuestos al realizar ganancias, y la comisión anual del producto. Ninguna se siente en el momento porque se descuenta del saldo, pero son de lo poco en la inversión que es seguro: el rendimiento es incierto, el coste no.",
    ej: "Rotar el 20% de tu cartera cada año con 0,5% de coste te quita 0,1% anual. Suena a nada; sobre treinta años y con interés compuesto, es dinero real.",
    q: [
      { q: "De todo lo que compone tu resultado final, ¿qué es lo único que controlas con certeza?", ops: ["Los costes", "El rendimiento del mercado", "El momento de las crisis", "La inflación"], correcta: "Los costes", e: "Es la razón por la que la gestión de costes es la primera decisión seria de cualquier inversor: es la única variable con resultado garantizado." },
      { q: "¿Qué es el diferencial entre precio de compra y venta?", ops: ["Un coste implícito que pagas cada vez que operas, aunque no aparezca como comisión", "Un impuesto del gobierno", "La ganancia del vendedor anterior", "Una comisión que solo pagan los profesionales"], correcta: "Un coste implícito que pagas cada vez que operas, aunque no aparezca como comisión", e: "No sale en ningún recibo, pero se lo llevas puesto en cada operación. Por eso operar mucho es caro incluso donde la comisión declarada es cero." },
    ],
  },
  {
    id: "aportes", nv: 2, n: "Aportar de forma periódica",
    x: "Aportar la misma cantidad cada mes, pase lo que pase, hace dos cosas. Compra más unidades cuando los precios están bajos y menos cuando están altos, sin que tengas que adivinar nada. Y sobre todo, convierte la inversión en un hábito automático en vez de una decisión que tomas cuando tienes ánimo, que suele ser cuando todo va bien y está caro.",
    ej: "Aportas 100 al mes. Un mes la unidad cuesta 10 y compras 10; al mes siguiente cuesta 5 y compras 20. Tu precio medio queda por debajo del precio medio del periodo.",
    q: [
      { q: "El principal beneficio de aportar periódicamente es...", ops: ["Que elimina la necesidad de acertar el momento y te vuelve constante", "Que garantiza mayor rendimiento que invertir todo de golpe", "Que evita las pérdidas", "Que reduce las comisiones"], correcta: "Que elimina la necesidad de acertar el momento y te vuelve constante", e: "Matemáticamente, invertir todo de golpe suele rendir algo más porque el dinero está más tiempo dentro. El aporte periódico gana en lo que de verdad falla: la conducta." },
      { q: "El mercado cae 30% y tú aportas mensualmente. ¿Qué haces?", ops: ["Sigues aportando: estás comprando lo mismo más barato", "Paras hasta que se recupere", "Vendes para no perder más", "Cambias todo a efectivo y esperas la señal"], correcta: "Sigues aportando: estás comprando lo mismo más barato", e: "Si tu horizonte es largo, una caída es un descuento sobre compras futuras. Parar de aportar en la caída es cancelar la parte buena del plan." },
    ],
  },
  {
    id: "rebalanceo", nv: 2, n: "Rebalancear",
    x: "Con el tiempo, lo que más sube ocupa un porcentaje cada vez mayor de tu cartera, y tu riesgo aumenta sin que tú decidas nada. Rebalancear es volver a los porcentajes que elegiste: vender un poco de lo que subió y comprar de lo que bajó. Es incómodo precisamente porque funciona: te obliga a hacer lo contrario del impulso.",
    ej: "Elegiste 60 acciones y 40 bonos. Tras dos años buenos quedaste en 75 y 25. Sin haber decidido nada, ahora tienes una cartera mucho más agresiva que la que querías.",
    q: [
      { q: "¿Qué problema resuelve el rebalanceo?", ops: ["Que el riesgo de tu cartera crezca solo, sin que lo hayas decidido", "Que ganes más que el mercado", "Que pagues menos impuestos", "Que evites las caídas"], correcta: "Que el riesgo de tu cartera crezca solo, sin que lo hayas decidido", e: "Es control de riesgo, no una estrategia de rentabilidad. A veces rinde algo más, a veces algo menos; lo que siempre hace es mantenerte donde decidiste estar." },
      { q: "¿Con qué frecuencia tiene sentido rebalancear para un inversor particular?", ops: ["Una vez al año, o cuando algo se desvíe bastante de su objetivo", "Cada semana", "Cada vez que el mercado se mueve", "Nunca"], correcta: "Una vez al año, o cuando algo se desvíe bastante de su objetivo", e: "Rebalancear muy seguido añade costes e impuestos sin añadir control. Una vez al año captura casi todo el beneficio." },
    ],
  },
  {
    id: "regla4", nv: 2, n: "Cuánto necesitas para no depender del sueldo",
    x: "La referencia más usada es la regla del 4%: si cada año retiras el 4% de tu patrimonio inicial ajustado por inflación, históricamente el dinero aguantó unos treinta años. Dicho al revés, necesitas alrededor de 25 veces tu gasto anual. Fíjate que la meta la fija tu gasto, no tu sueldo.",
    ej: "Gastas 30.000 al año. Tu número es 750.000. Si reduces tu gasto a 24.000, tu número baja a 600.000: recortar gasto acerca la meta por los dos lados a la vez.",
    q: [
      { q: "Tu meta de independencia financiera la determina...", ops: ["Tu gasto anual", "Tu sueldo", "Tu edad", "El país donde vives"], correcta: "Tu gasto anual", e: "Por eso dos personas con el mismo sueldo pueden tener metas que difieren en cientos de miles: lo que cuenta es el tren de vida que hay que sostener." },
      { q: "Reducir tu gasto anual en 500 baja tu meta en aproximadamente...", ops: ["12.500", "500", "5.000", "50.000"], correcta: "12.500", e: "Veinticinco veces 500. Cada recorte permanente de gasto trabaja dos veces: te deja ahorrar más y baja la meta." },
      { q: "Trampa: la regla del 4% garantiza que el dinero nunca se acabe. ¿Verdadero o falso?", ops: ["Falso: es una regla histórica y aproximada, no una garantía", "Verdadero, está demostrado matemáticamente", "Verdadero si inviertes en bonos", "Falso, en realidad es la del 10%"], correcta: "Falso: es una regla histórica y aproximada, no una garantía", e: "Sale de datos históricos de un mercado concreto y un horizonte de treinta años. Es una brújula útil, no una ley física." },
    ],
  },
  {
    id: "liquidez", nv: 2, n: "Liquidez",
    x: "Un activo es líquido si puedes convertirlo en dinero rápido y sin rebajar el precio. Las acciones grandes son líquidas; un local comercial no lo es. La iliquidez no es mala en sí, incluso suele venir con rendimiento extra por la molestia. El problema es tener necesidades líquidas cubiertas con activos ilíquidos.",
    ej: "Todo tu patrimonio está en un inmueble y necesitas 5.000 mañana. El inmueble vale 200.000 pero venderlo toma meses; acabas pidiendo un préstamo caro teniendo patrimonio de sobra.",
    q: [
      { q: "¿Cuál es el riesgo real de una cartera muy ilíquida?", ops: ["Que necesites dinero en un momento en que solo puedes vender malbaratando", "Que rinda menos que una líquida", "Que sea ilegal", "Que pague más impuestos"], correcta: "Que necesites dinero en un momento en que solo puedes vender malbaratando", e: "La iliquidez no cobra su factura mientras todo va bien. La cobra el día que coinciden tu necesidad de efectivo y un mal momento del mercado." },
      { q: "Los activos ilíquidos suelen ofrecer rendimiento algo mayor. ¿Por qué?", ops: ["Es la prima que paga el mercado por aceptar no poder salir cuando quieras", "Porque son mejores negocios", "Porque tienen menos riesgo", "Porque los regula menos el Estado"], correcta: "Es la prima que paga el mercado por aceptar no poder salir cuando quieras", e: "Se llama prima de iliquidez. Es real, pero solo la cobra quien de verdad puede permitirse no tocar ese dinero." },
    ],
  },

  /* ---------------- nivel 3 · avanzado ---------------- */
  {
    id: "valorpresente", nv: 3, n: "Valor presente",
    x: "Mil dentro de cinco años no valen mil hoy, porque hoy podrías invertirlos. Descontar es traer un flujo futuro al presente dividiéndolo por uno más la tasa, elevado a los años. Toda valoración seria, de una empresa o de un bono, es en el fondo esta operación repetida sobre los flujos que se esperan.",
    ej: "Mil dentro de 5 años, descontados al 10%, valen 1.000 dividido entre 1,1 elevado a 5, es decir 621 hoy.",
    q: [
      { q: "Si sube la tasa de descuento, el valor presente de un flujo futuro...", ops: ["Baja", "Sube", "No cambia", "Depende del flujo"], correcta: "Baja", e: "Es la mecánica detrás de que las bolsas caigan cuando suben los tipos: el mismo beneficio futuro vale menos hoy." },
      { q: "¿Qué activos sufren más cuando suben las tasas?", ops: ["Los que prometen sus flujos más lejos en el futuro", "Los que pagan mucho ahora", "Los de corto plazo", "Todos exactamente igual"], correcta: "Los que prometen sus flujos más lejos en el futuro", e: "Cuanto más lejos está el flujo, más veces se le aplica el descuento. Por eso las empresas de crecimiento sin beneficios presentes son las más sensibles a los tipos." },
    ],
  },
  {
    id: "beta", nv: 3, n: "Beta y riesgo sistemático",
    x: "El riesgo de un activo se parte en dos: el propio, que se diluye al diversificar, y el de mercado, que no se va por más que repartas. La beta mide cuánto del segundo cargas. Beta 1 se mueve como el mercado; beta 1,5 amplifica; beta negativa va al revés. Diversificar elimina el riesgo propio y deja el sistemático intacto.",
    ej: "Cartera de veinte acciones distintas con beta media 1,1: has eliminado casi todo el riesgo específico de cada empresa y te quedas expuesto un 10% más que el mercado.",
    q: [
      { q: "¿Qué tipo de riesgo NO desaparece por diversificar?", ops: ["El sistemático, el del mercado en su conjunto", "El específico de cada empresa", "El de fraude en una compañía", "El de que un sector concreto caiga"], correcta: "El sistemático, el del mercado en su conjunto", e: "Por eso la teoría dice que el mercado solo te paga por asumir riesgo sistemático: el específico podrías haberlo eliminado gratis y nadie te compensa por no hacerlo." },
      { q: "Tienes ocho activos distintos y todos con beta cercana a uno. ¿Qué tienes en realidad?", ops: ["Ocho formas de la misma apuesta al mercado", "Una cartera bien diversificada", "Una cartera de bajo riesgo", "Una cartera neutral al mercado"], correcta: "Ocho formas de la misma apuesta al mercado", e: "Es el error que el juego te señala en el panel de cartera. Muchos nombres con la misma beta no es diversificación, es repetición." },
    ],
  },
  {
    id: "sharpe", nv: 3, n: "Retorno por unidad de riesgo",
    x: "Comparar inversiones solo por rendimiento es engañoso, porque siempre se puede subir el rendimiento esperado asumiendo más riesgo. El ratio de Sharpe divide el rendimiento que excede a la tasa segura entre la volatilidad. Responde a la pregunta correcta: cuánto te pagaron por cada unidad de sobresalto.",
    ej: "Cartera A rinde 12 con volatilidad 20; cartera B rinde 8 con volatilidad 8. Con tasa segura 2: A da 0,50 y B da 0,75. B es mejor negocio aunque rinda menos.",
    q: [
      { q: "¿Qué pregunta responde el ratio de Sharpe?", ops: ["Cuánto rendimiento extra obtuviste por cada unidad de riesgo asumido", "Cuánto vas a ganar el año que viene", "Cuál es la probabilidad de perder dinero", "Qué comisión estás pagando"], correcta: "Cuánto rendimiento extra obtuviste por cada unidad de riesgo asumido", e: "Permite comparar estrategias con perfiles de riesgo distintos, que es justo lo que el rendimiento a secas no deja hacer." },
      { q: "Trampa: un Sharpe muy alto y muy estable durante años es señal inequívoca de excelencia. ¿Verdadero o falso?", ops: ["Falso: también es el perfil típico de un fraude o de una estrategia que esconde riesgo de cola", "Verdadero, es la mejor señal posible", "Verdadero si el fondo está regulado", "Falso, el Sharpe no significa nada"], correcta: "Falso: también es el perfil típico de un fraude o de una estrategia que esconde riesgo de cola", e: "Rendimientos suavemente positivos mes tras mes, sin volatilidad, describen tanto a un genio como a un esquema Ponzi o a alguien vendiendo seguros contra catástrofes que aún no ocurrieron." },
    ],
  },
  {
    id: "apalancamiento", nv: 3, n: "Apalancamiento",
    x: "Apalancarse es operar con dinero prestado. Si el activo rinde más que la tasa de la deuda, el retorno sobre tu capital se multiplica. Si rinde menos, la pérdida también se multiplica, y como la deuda no se reduce cuando el activo cae, las pérdidas llegan a tu capital antes y más fuerte.",
    ej: "Pones 20 y pides 80 para comprar un activo de 100. Si sube 10% ganas 10 sobre 20, un 50%. Si baja 20%, pierdes 20 sobre 20: todo tu capital.",
    q: [
      { q: "¿Qué hace el apalancamiento con el riesgo de ruina?", ops: ["Lo aumenta: una caída moderada del activo puede borrar todo tu capital", "Lo reduce al repartir la inversión", "No lo cambia, solo multiplica ganancias", "Lo elimina si la tasa es baja"], correcta: "Lo aumenta: una caída moderada del activo puede borrar todo tu capital", e: "Es la asimetría clave: el prestamista cobra igual pase lo que pase, así que toda la variabilidad se concentra en tu parte." },
      { q: "Dos negocios idénticos, uno sin deuda y otro apalancado tres a uno. ¿En qué se diferencian?", ops: ["En el rango de resultados posibles para el dueño, no en la calidad del negocio", "En que el apalancado es mejor negocio", "En que el apalancado paga menos impuestos siempre", "En nada relevante"], correcta: "En el rango de resultados posibles para el dueño, no en la calidad del negocio", e: "El apalancamiento no mejora el activo: solo redistribuye sus resultados hacia los extremos para quien pone el capital." },
    ],
  },
  {
    id: "ebitda", nv: 3, n: "EBITDA y múltiplos",
    x: "El EBITDA es lo que gana la operación antes de intereses, impuestos, depreciación y amortización. Sirve para comparar empresas con estructuras financieras distintas. Valorar por múltiplos es decir: negocios como este se pagan a ocho veces EBITDA, luego este vale ocho veces el suyo. Es rápido y por eso mismo peligroso.",
    ej: "EBITDA de 20 millones y múltiplo del sector de 8: valor de empresa 160 millones. Si tiene 60 de deuda, a los accionistas les corresponden 100.",
    q: [
      { q: "¿Cuál es la crítica más seria al EBITDA como medida de beneficio?", ops: ["Ignora que las máquinas se gastan y hay que reponerlas, y que los intereses se pagan de verdad", "Que es muy difícil de calcular", "Que solo sirve para bancos", "Que no lo aceptan los auditores"], correcta: "Ignora que las máquinas se gastan y hay que reponerlas, y que los intereses se pagan de verdad", e: "La depreciación es un gasto real diferido: llega el día que hay que reponer el activo. Por eso se dice que el EBITDA es el beneficio antes de los gastos que no te gustan." },
      { q: "Una empresa se compra a 8 veces EBITDA y se vende cinco años después a 8 veces un EBITDA mayor. ¿De dónde salió la ganancia?", ops: ["Del crecimiento operativo y de haber amortizado deuda, no de la expansión del múltiplo", "De la expansión del múltiplo", "De la inflación", "De las comisiones"], correcta: "Del crecimiento operativo y de haber amortizado deuda, no de la expansión del múltiplo", e: "Son las tres palancas del private equity: crecer, pagar deuda y vender más caro en múltiplo. Solo las dos primeras dependen de ti." },
    ],
  },

  /* ---------------- nivel 4 · profesional ---------------- */
  {
    id: "duration", nv: 4, n: "Duración de un bono",
    x: "La duración mide cuánto cae el precio de un bono cuando suben las tasas. Aproximadamente, un bono con duración 7 pierde 7% si las tasas suben un punto. Cuanto más largo el plazo y menor el cupón, mayor la duración y más te duele un movimiento de tipos.",
    ej: "Bono a 10 años con duración 8: las tasas suben de 3 a 4% y su precio cae alrededor de 8%, aunque el emisor siga siendo igual de solvente.",
    q: [
      { q: "Las tasas suben un punto y tienes un bono de duración 6. Tu precio cae aproximadamente...", ops: ["6%", "1%", "Seis puntos básicos", "Nada si lo mantienes"], correcta: "6%", e: "La caída de precio es real aunque no vendas: si lo mantienes hasta vencimiento cobras lo pactado, pero durante el camino tu patrimonio marcado a mercado bajó." },
      { q: "¿Qué bono es más sensible a las tasas?", ops: ["Uno a 30 años con cupón bajo", "Uno a 2 años con cupón alto", "Los dos igual", "Uno a 30 años con cupón alto"], correcta: "Uno a 30 años con cupón bajo", e: "Plazo largo y cupón bajo empujan los flujos hacia el futuro, y todo lo que está lejos sufre más el descuento." },
    ],
  },
  {
    id: "curva", nv: 4, n: "La curva de rendimientos",
    x: "La curva compara lo que paga la deuda de un mismo emisor a distintos plazos. Normalmente el plazo largo paga más que el corto, porque comprometerse más tiempo merece premio. Cuando se invierte, el corto pagando más que el largo, el mercado está diciendo que espera tasas más bajas en el futuro, y eso suele asociarse a recesión.",
    ej: "El bono a 2 años paga 5% y el de 10 paga 4. La curva está invertida: el mercado apuesta a que habrá que bajar tasas, y eso normalmente pasa cuando la economía se enfría.",
    q: [
      { q: "Una curva invertida se interpreta habitualmente como...", ops: ["Una señal de expectativas de recesión", "Una señal de crecimiento fuerte", "Un error del mercado", "Un buen momento para endeudarse largo"], correcta: "Una señal de expectativas de recesión", e: "Ha precedido a la mayoría de las recesiones recientes, aunque con retrasos muy variables. Es una señal, no un cronómetro." },
    ],
  },
  {
    id: "pe", nv: 4, n: "Cómo gana dinero un fondo de private equity",
    x: "Un fondo cobra dos partes: una comisión anual sobre el capital comprometido, que paga la estructura, y el carry, que suele ser el 20% de las ganancias por encima de un rendimiento mínimo. Ese mínimo, el hurdle, existe para que el gestor no cobre por lo que habría dado un índice. El múltiplo sobre el capital y la tasa interna de retorno miden cosas distintas: uno cuánto, el otro qué tan rápido.",
    ej: "Fondo de 100 millones, 2% anual son 2 millones al año. Si devuelve 200, hay 100 de ganancia; por encima del hurdle el gestor se lleva alrededor de 20.",
    q: [
      { q: "¿Qué mide el múltiplo sobre capital invertido y qué mide la tasa interna de retorno?", ops: ["Cuánto multiplicaste el dinero, y a qué velocidad lo lograste", "Lo mismo, expresado distinto", "Comisiones y gastos", "Riesgo y volatilidad"], correcta: "Cuánto multiplicaste el dinero, y a qué velocidad lo lograste", e: "Duplicar en dos años y duplicar en diez dan el mismo múltiplo y tasas internas radicalmente distintas. Por eso quien quiere lucir bien acelera salidas." },
      { q: "¿Para qué sirve el hurdle o rendimiento mínimo?", ops: ["Para que el gestor no cobre comisión de éxito por rendimientos que el mercado habría dado igual", "Para limitar las pérdidas del inversor", "Para pagar los impuestos del fondo", "Para fijar el tamaño del fondo"], correcta: "Para que el gestor no cobre comisión de éxito por rendimientos que el mercado habría dado igual", e: "Alinea incentivos: el carry debería pagarse por valor añadido, no por haber estado invertido durante un buen ciclo." },
    ],
  },

  /* ---------------- nivel 5 · mesa de socios ---------------- */
  {
    id: "maldicion", nv: 5, n: "La maldición del ganador",
    x: "En una subasta donde todos estiman el mismo valor incierto, el que gana suele ser el que más se pasó estimando. No gana el que mejor valoró: gana el más optimista. Por eso los compradores disciplinados pierden la mayoría de las subastas, y eso es exactamente lo que deberían hacer.",
    ej: "Diez fondos valoran una empresa entre 80 y 120. Gana el que ofreció 120. Si el valor verdadero era 100, ganó la subasta y perdió 20.",
    q: [
      { q: "En una subasta con muchos participantes informados, ganar suele significar...", ops: ["Que fuiste el más optimista, y probablemente pagaste de más", "Que valoraste mejor que el resto", "Que tenías mejor información", "Que el activo era barato"], correcta: "Que fuiste el más optimista, y probablemente pagaste de más", e: "Por eso los compradores serios ajustan su oferta a la baja en función de cuántos competidores hay: cuantos más, más probable es que ganar sea mala señal." },
      { q: "Trampa: si un activo se subastó y nadie más pujó cerca de ti, eso confirma que hiciste un gran negocio. ¿Verdadero o falso?", ops: ["Falso: puede significar que los demás vieron algo que tú no viste", "Verdadero, la falta de competencia es siempre buena", "Verdadero si el vendedor tenía prisa", "Falso, siempre significa fraude"], correcta: "Falso: puede significar que los demás vieron algo que tú no viste", e: "Ganar barato es bueno cuando tienes una ventaja de información o de estructura, y preocupante cuando no sabes cuál era esa ventaja." },
    ],
  },
  {
    id: "supervivencia", nv: 5, n: "Sesgo de supervivencia",
    x: "Las estadísticas de rendimiento suelen calcularse sobre los fondos y empresas que siguen existiendo. Los que quebraron desaparecen de la muestra, así que el promedio que ves está inflado por definición. Lo mismo ocurre con las historias de éxito: nadie escribe el libro del que hizo lo mismo y fracasó.",
    ej: "Un índice de fondos que muestra 9% anual puede estar excluyendo a los que cerraron por malos resultados. El rendimiento real del inversor medio fue bastante menor.",
    q: [
      { q: "¿Por qué el rendimiento medio histórico de una categoría de fondos suele estar sobrestimado?", ops: ["Porque los que quebraron o cerraron salen de la muestra", "Porque los gestores mienten", "Porque no se descuenta la inflación", "Porque se calculan en distintas monedas"], correcta: "Porque los que quebraron o cerraron salen de la muestra", e: "Es un sesgo estructural, no un fraude. Para corregirlo hay que construir el índice incluyendo a los muertos, y muy pocos lo hacen." },
      { q: "Alguien tomó una apuesta muy concentrada y se hizo rico. ¿Qué se puede concluir?", ops: ["Poco: no vemos a los que hicieron lo mismo y perdieron", "Que la estrategia es buena", "Que tenía información privilegiada", "Que hay que copiarlo"], correcta: "Poco: no vemos a los que hicieron lo mismo y perdieron", e: "Con suficientes participantes, alguien acierta diez veces seguidas por pura estadística. El resultado no separa la habilidad de la suerte cuando la muestra visible ya está filtrada." },
    ],
  },
  {
    id: "correlacion", nv: 5, n: "Correlación en crisis y riesgo de cola",
    x: "Las correlaciones que se calculan en tiempos normales dejan de servir en las crisis, cuando casi todo cae a la vez porque todos venden lo que pueden vender. Además, las distribuciones reales tienen colas más gordas que la campana de Gauss: los eventos extremos ocurren mucho más de lo que el modelo predice.",
    ej: "Un modelo dice que una caída así ocurre una vez cada 10.000 años. En treinta años ocurrieron tres. El problema no fue la mala suerte, fue la distribución elegida.",
    q: [
      { q: "¿Qué implica que las distribuciones de rendimientos tengan colas gordas?", ops: ["Que los eventos extremos son bastante más frecuentes de lo que predice la campana de Gauss", "Que la volatilidad es mayor todos los días", "Que el rendimiento medio es más alto", "Que no se puede invertir"], correcta: "Que los eventos extremos son bastante más frecuentes de lo que predice la campana de Gauss", e: "Los modelos que asumen normalidad subestiman sistemáticamente la probabilidad del desastre, y por eso las carteras diseñadas con ellos rompen más de lo previsto." },
      { q: "Una cartera muy diversificada cae fuerte en una crisis. ¿Falló la diversificación?", ops: ["No necesariamente: en crisis las correlaciones suben y la protección se reduce, aunque siga siendo mejor que no diversificar", "Sí, la diversificación no sirve", "Sí, había que estar todo en efectivo", "No, es imposible que caiga"], correcta: "No necesariamente: en crisis las correlaciones suben y la protección se reduce, aunque siga siendo mejor que no diversificar", e: "Diversificar reduce el daño, no lo elimina. Confundir 'menos daño' con 'ningún daño' es lo que hace que la gente abandone la estrategia en el peor momento." },
    ],
  },
];

/* las preguntas de cada tema entran al banco general con su nivel,
   de modo que el examen de fin de ano puede preguntar por cualquier
   cosa que la Catedra haya llegado a explicar */
/* El banco histórico guarda las opciones en "o" y el índice de la
   correcta en "c". La Cátedra las escribe con nombre para que sea
   legible al redactarlas; aquí se traducen al formato nativo y se
   descarta cualquier pregunta mal formada antes de que llegue al juego. */
const DE_TEMAS = TEMAS.reduce((acc, tema) => acc.concat(
  tema.q
    .filter((p) => p && typeof p.q === "string" && Array.isArray(p.ops) && p.ops.length >= 2 && p.ops.indexOf(p.correcta) >= 0)
    .map((p) => ({ q: p.q, o: p.ops.slice(), c: p.ops.indexOf(p.correcta), e: p.e, nv: tema.nv, tema: tema.id }))
), []);

const PREGUNTAS = []
  .concat(BANCO0.map((x) => ({ ...x, nv: 1 })))
  .concat(BANCO.map((x) => ({ ...x, nv: 2 })))
  .concat(BANCO2.map((x) => ({ ...x, nv: 3 })))
  .concat(BANCO3)
  .concat(DE_TEMAS);

export const NIVEL_N = ["", "Fundamentos", "Intermedio", "Avanzado", "Profesional", "Mesa de socios"];
/* el nivel sube con los años de carrera: seis años por escalón */
/* El nivel ya no depende solo de los años cumplidos: cada rato que
   dedicas a estudiar dentro del juego adelanta el temario. Alguien que
   estudia llega a las preguntas difíciles antes que alguien que solo
   deja pasar los años, que es exactamente como funciona fuera. */
export const nivelDe = (turno, estudia) => clamp(
  1 + Math.floor(entero(turno, 0, 0, 60) / 7) + Math.floor(clamp(numero(estudia, 0), 0, 500) / 55),
  1, 5
);
/* cuántas preguntas trae el examen según el nivel */
export const largoExamen = (nv) => (nv <= 1 ? 3 : nv <= 3 ? 4 : 5);

/* mayoría del nivel que te toca, una de repaso y una del nivel siguiente */
export const armarExamen = (nv, cuantas, temasVistos) => {
  /* Una pregunta atada a un tema solo es justa si ese tema ya se dio en
     clase. Las de banco general no cuelgan de ningun tema: esas se rigen
     solo por el nivel, que ya sube con la carrera. */
  const vistos = Array.isArray(temasVistos) ? temasVistos : [];
  const justa = (x) => !x.tema || vistos.indexOf(x.tema) >= 0;
  const del = (k) => PREGUNTAS.filter((x) => x.nv === k && justa(x)).sort(() => Math.random() - 0.5);
  const cur = del(nv), ant = del(Math.max(1, nv - 1)), sig = del(Math.min(5, nv + 1));
  const out = [];
  const meter = (arr, n) => { for (let i = 0; i < n && arr.length; i++) { const q = arr.pop(); if (!out.some((y) => y.q === q.q)) out.push(q); } };
  if (nv > 1) meter(ant, 1);
  if (nv < 5 && cuantas >= 4) meter(sig, 1);
  meter(cur, cuantas - out.length);
  meter(del(nv), cuantas - out.length);
  /* Al principio de la partida casi ningun tema se ha dado todavia, asi
     que el examen se completa con fundamentos generales de tu nivel o por
     debajo, nunca con un tema que nadie te explico. */
  if (out.length < cuantas) {
    const generales = PREGUNTAS.filter((x) => !x.tema && x.nv <= nv).sort(() => Math.random() - 0.5);
    meter(generales, cuantas - out.length);
  }
  return out.sort(() => Math.random() - 0.5).slice(0, cuantas);
};
