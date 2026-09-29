/* ---------- banderas rojas ----------
   Reescrito: cada línea, sea bandera roja o no, lleva su propia razón.
   Antes el juego te decía "estas tres eran" y te dejaba igual de ciego
   que al empezar; lo que enseña no es cuáles marcar, es por qué. Las
   que NO son banderas también se explican, porque la mitad del oficio
   es no asustarse con lo que solo parece raro.
   doc: qué estás leyendo · pista: qué buscar, solo en modo aprendiz */
export const BANDERAS = [
  {
    t: "Estados financieros de la compañía objetivo. Marca las tres banderas rojas.",
    doc: "Estados financieros auditados de los últimos tres ejercicios",
    pista: "Busca partidas que crecen a un ritmo distinto del negocio, y a quién se le vende de verdad.",
    mal: [
      { t: "Las cuentas por cobrar crecen el triple que las ventas", x: "Están facturando cosas que nadie está pagando. O el cliente no puede pagar, o la venta se reconoció antes de tiempo para inflar el resultado." },
      { t: "El auditor renunció el año pasado sin explicación", x: "Un auditor que se va y no dice por qué está evitando firmar algo. Es de las señales más serias que existen en una compra." },
      { t: "El 70% de las ventas es a una empresa relacionada", x: "Esas ventas pueden ser a precio inventado y desaparecer el día que cambia el dueño. No es facturación real, es contabilidad de familia." },
    ],
    ok: [
      { t: "El margen bruto se mantiene estable hace tres años", x: "Estabilidad de margen es exactamente lo que quieres ver: el negocio no está comprando ventas a base de rebajas." },
      { t: "La empresa arrienda sus galpones en vez de comprarlos", x: "Es una decisión de estructura, no un problema. Arrendar libera capital; muchas compañías sanas no son dueñas de un solo metro." },
      { t: "Tiene una línea de crédito aprobada y sin usar", x: "Es una buena noticia: hay liquidez de respaldo disponible y no ha hecho falta tocarla." },
      { t: "El inventario rota cuatro veces al año", x: "Es una rotación normal en la mayoría de los sectores. Preocupa cuando cae de golpe, no su nivel por sí solo." },
      { t: "Los socios cobran dividendos una vez al año", x: "Repartir utilidades de forma ordenada y anual es lo correcto. La bandera sería que las sacaran mes a mes sin acuerdo." },
    ],
  },
  {
    t: "Sala de datos de una empresa de servicios. Marca las tres banderas rojas.",
    doc: "Sala de datos entregada por el vendedor antes de la oferta vinculante",
    pista: "Fíjate en lo que falta, en lo que está por vencer y en lo que puede costar dinero mañana.",
    mal: [
      { t: "Faltan las actas de junta de los últimos dos años", x: "Sin actas no sabes qué decisiones se tomaron ni quién tenía autoridad para tomarlas. Lo que no está en la sala de datos es justo lo que hay que mirar." },
      { t: "Hay un juicio laboral colectivo sin provisionar", x: "Es una deuda que existe y no aparece en el balance. Si pierden, la paga el nuevo dueño: tú." },
      { t: "El contrato que genera la mitad del ingreso vence en tres meses sin renovación", x: "Estás comprando un negocio que puede perder la mitad de su facturación un trimestre después de la firma." },
    ],
    ok: [
      { t: "La nómina creció en línea con las ventas", x: "Es lo esperable en servicios: más trabajo exige más gente. La bandera sería que la nómina creciera y las ventas no." },
      { t: "Cambiaron de banco principal el año pasado", x: "Se cambia de banco por comisiones, por servicio o por un gerente que se mudó. Por sí solo no dice nada." },
      { t: "Tienen certificación de calidad vigente", x: "Es una señal buena, no mala: hay procesos documentados y alguien externo los revisó." },
      { t: "El gerente general lleva ocho años en el cargo", x: "Continuidad en la dirección suele ser un activo. Preocuparía la puerta giratoria, no la permanencia." },
      { t: "Renovaron la flota hace dos años", x: "Significa que la inversión fuerte ya se hizo y no te toca a ti en los próximos años." },
    ],
  },
  {
    t: "Un fondo te ofrece entrar como inversionista. Marca las tres banderas rojas.",
    doc: "Presentación comercial y reglamento de un fondo de inversión",
    pista: "Mira quién custodia el dinero, quién lo valora y si puedes salir cuando quieras.",
    mal: [
      { t: "Promete un retorno fijo mensual sin importar el mercado", x: "Ningún activo con riesgo rinde igual todos los meses. Un rendimiento plano es la firma de un esquema que paga a los viejos con el dinero de los nuevos." },
      { t: "El administrador y el auditor pertenecen al mismo grupo", x: "El auditor existe para vigilar al administrador. Si son la misma casa, nadie está vigilando nada." },
      { t: "No permite retiros y no informa el valor de la cuota", x: "Si no puedes salir ni sabes cuánto vale lo tuyo, no tienes una inversión: tienes un acto de fe." },
    ],
    ok: [
      { t: "Cobra 2% anual de administración", x: "Es una comisión alta pero estándar en gestión activa. Es una razón para negociar o comparar, no una bandera roja." },
      { t: "Publica un informe trimestral a inversionistas", x: "Rendir cuentas con periodicidad fija es justo lo contrario de una señal de alarma." },
      { t: "Tiene un comité de inversiones con miembros externos", x: "Gente de fuera mirando las decisiones es un control real de gobierno." },
      { t: "Invierte principalmente en compañías listadas", x: "Activos listados tienen precio público y verificable todos los días. Es lo más transparente que puede tener un fondo." },
      { t: "Está registrado ante el regulador local", x: "El registro no garantiza rentabilidad, pero sí supervisión y obligaciones de reporte." },
    ],
  },
  {
    t: "Te ofrecen entrar en una startup como inversionista ángel. Marca las tres banderas rojas.",
    doc: "Presentación y documentos societarios de una compañía en etapa temprana",
    pista: "En etapa temprana lo que compras es el equipo y las reglas del juego entre socios.",
    mal: [
      { t: "Los fundadores no tienen contrato de permanencia ni cláusula de dedicación exclusiva", x: "Puedes acabar siendo socio de una empresa cuyos fundadores se van a otra cosa el mes que viene. En etapa temprana la empresa son ellos." },
      { t: "No hay pacto de socios y ya son once accionistas", x: "Once dueños sin reglas escritas es un bloqueo garantizado en la primera decisión difícil, y una ronda siguiente casi imposible de cerrar." },
      { t: "El único cliente de referencia es una empresa del suegro de un fundador", x: "No es tracción, es un favor familiar. No demuestra que exista un mercado dispuesto a pagar." },
    ],
    ok: [
      { t: "Facturan poco pero el crecimiento mensual es consistente hace un año", x: "Poca facturación es normal en etapa temprana; lo que importa es la pendiente, y esa es buena." },
      { t: "El equipo técnico es propio y no subcontratado", x: "Tener el conocimiento dentro de casa es una fortaleza, sobre todo si el producto es el negocio." },
      { t: "Tienen la propiedad intelectual registrada a nombre de la sociedad", x: "Es exactamente como debe ser. La bandera sería que estuviera a nombre personal de un fundador." },
      { t: "Levantaron una ronda anterior con inversores conocidos", x: "Alguien con reputación ya hizo su propia revisión y puso dinero. No es garantía, pero suma." },
      { t: "Publican métricas mensuales a sus inversores", x: "Transparencia periódica desde el principio es una señal de cómo van a tratarte cuando algo salga mal." },
    ],
  },
  {
    t: "Un asesor te presenta un plan de inversión personal. Marca las tres banderas rojas.",
    doc: "Propuesta de inversión personal de un asesor financiero",
    pista: "Pregúntate siempre cómo cobra él y qué pasa si te equivocas.",
    mal: [
      { t: "Cobra por producto colocado y no te dice cuánto", x: "Si le pagan por venderte algo concreto, su recomendación no es un consejo, es una venta. Y si además lo oculta, ya sabes qué producto va a tocarte." },
      { t: "Te presiona para firmar hoy porque la ventana se cierra", x: "La urgencia es una técnica de venta, no una característica de las buenas inversiones. Lo que es bueno hoy sigue siéndolo el lunes." },
      { t: "Te propone concentrar el 80% en un solo producto de su propia casa", x: "Junta los dos peores defectos posibles: concentración extrema y conflicto de interés directo." },
    ],
    ok: [
      { t: "Te pide tu horizonte de inversión antes de proponer nada", x: "Es la primera pregunta que debe hacer cualquiera que vaya a recomendarte algo en serio." },
      { t: "Explica el coste total anual en euros, no solo en porcentaje", x: "Traducir la comisión a dinero contante es lo que casi nadie hace, precisamente porque asusta. Que lo haga es buena señal." },
      { t: "Sugiere mantener un fondo de emergencia aparte", x: "Está protegiendo tu liquidez antes que su comisión. Es lo correcto." },
      { t: "Te entrega el folleto informativo antes de la reunión", x: "Darte tiempo para leer con calma es lo contrario de la presión comercial." },
      { t: "Acepta que lo consultes con un tercero", x: "Quien no teme una segunda opinión suele ser porque no tiene nada que esconder." },
    ],
  },
  {
    t: "Contrato de compraventa de una participación minoritaria. Marca las tres banderas rojas.",
    doc: "Borrador de contrato de compraventa de acciones",
    pista: "Siendo minoritario, lo que te protege no es el precio: es lo que puedes hacer si te quieres salir.",
    mal: [
      { t: "No hay cláusula de arrastre ni de acompañamiento", x: "Si el mayoritario vende, te quedas dentro con un dueño nuevo que no elegiste y sin poder salir con él. Es la trampa clásica del minoritario." },
      { t: "El vendedor se reserva el derecho de vetar la distribución de dividendos", x: "Puedes ser dueño de algo rentable durante veinte años y no ver un céntimo, porque alguien más decide si se reparte." },
      { t: "Las cuentas que sirven de base no están auditadas y no hay ajuste por precio", x: "Estás fijando el precio sobre números que nadie verificó y renunciando a corregirlo después. Todo el riesgo de error es tuyo." },
    ],
    ok: [
      { t: "Hay periodo de garantía de dos años sobre las manifestaciones del vendedor", x: "Es protección para ti: si algo de lo que declaró era falso, tienes dos años para reclamarlo." },
      { t: "Se pacta un mecanismo de resolución de disputas", x: "Acordar de antemano cómo se resuelve un conflicto es señal de un contrato bien hecho." },
      { t: "El precio se ajusta por deuda neta y capital de trabajo", x: "Es el estándar de mercado y juega a tu favor: pagas por lo que realmente hay el día del cierre." },
      { t: "Se entrega la sala de datos completa antes de firmar", x: "Es lo mínimo exigible y aquí sí está ocurriendo." },
      { t: "Hay cláusula de no competencia por tres años", x: "Impide que el vendedor te cobre por el negocio y monte el mismo enfrente. Te protege a ti." },
    ],
  },
  {
    t: "Un cliente quiere que gestiones su patrimonio. Marca las tres banderas rojas.",
    doc: "Expediente de alta de un cliente de banca privada",
    pista: "Aquí las banderas no son de rentabilidad: son de origen del dinero y de trazabilidad.",
    mal: [
      { t: "El origen de una parte del dinero no está documentado", x: "Sin origen acreditado no puedes aceptarlo. La responsabilidad de haberlo comprobado es tuya, no suya." },
      { t: "Pide que las operaciones no queden a su nombre", x: "Querer ocultar la titularidad solo tiene un puñado de motivos y ninguno es bueno para quien firma como gestor." },
      { t: "Insiste en retirar en efectivo y en tramos justo por debajo del umbral de reporte", x: "Fraccionar para no activar el reporte tiene nombre propio y es delito. Que el patrón sea tan claro lo empeora." },
    ],
    ok: [
      { t: "Quiere revisar la cartera solo una vez al año", x: "Es una conducta excelente: mirar menos suele producir mejores resultados que mirar todos los días." },
      { t: "Tiene tolerancia al riesgo baja y lo dice claramente", x: "Un cliente que conoce y comunica su límite es el más fácil de servir bien." },
      { t: "Pregunta por los costes antes que por la rentabilidad", x: "Está preguntando por lo único seguro antes que por lo incierto. Sabe lo que hace." },
      { t: "Tiene el patrimonio repartido en tres entidades", x: "Es diversificación de riesgo de contraparte, una precaución sensata." },
      { t: "Quiere dejar una parte a sus nietos", x: "Es una preferencia de horizonte y de sucesión, perfectamente normal." },
    ],
  },
  {
    t: "Empresa familiar en venta. Marca las tres banderas rojas.",
    doc: "Carpeta de venta de una compañía familiar de segunda generación",
    pista: "En una empresa familiar la línea entre la caja de la empresa y el bolsillo de la familia es lo primero que hay que mirar.",
    mal: [
      { t: "Los gastos personales de la familia pasan por la empresa", x: "El beneficio real no es el que ves, y una vez comprada esos gastos desaparecen o se convierten en un conflicto. Tampoco sabes qué más se coló ahí." },
      { t: "El proveedor clave trabaja sin contrato, todo de palabra", x: "Ese acuerdo era con el fundador, no con la empresa. El día que tú entras, puede evaporarse." },
      { t: "Dos hermanos están en litigio por la propiedad de las acciones", x: "Puedes acabar comprándole a alguien que un juez decida que no era el dueño. Se compra la demanda junto con la empresa." },
    ],
    ok: [
      { t: "El fundador quiere quedarse dos años en la transición", x: "Es lo que quieres: continuidad de relaciones y conocimiento durante el traspaso." },
      { t: "La empresa opera en sede propia", x: "Un activo inmobiliario dentro del perímetro; puede cambiar la valoración, no es un riesgo." },
      { t: "Los estados financieros están auditados", x: "Auditados es mejor que no auditados. Es una señal a favor." },
      { t: "Hay un gerente financiero externo a la familia", x: "Justo el contrapeso que suele faltar en una empresa familiar." },
      { t: "Están al día con sus obligaciones tributarias", x: "Sin deudas fiscales escondidas, que en este tipo de compras es una de las sorpresas más caras." },
    ],
  },
];

/* ---------- de dónde vienes ---------- */
/* Sueldo, costo de vida e impuesto, relativos a Madrid = 1. Recalibrados
   el 28-sep-2026 con datos reales, suavizados a mitad de camino para no
   romper el juego (npm run paises lo mide):
     · sueldo: analista financiero junior. Real: Caracas 0,18 · Bogotá 0,34
       · Buenos Aires 0,30 · CDMX 0,35 · Miami 1,73 (Glassdoor, Computrabajo,
       Fedecámaras, ZipRecruiter). Aquí, a mitad entre eso y lo que había.
     · costo de vida: una persona con alquiler (livingcost.org, jun-2026:
       Caracas 0,59 · Bogotá 0,52 · Buenos Aires 0,59 · CDMX 0,70 · Miami
       1,52). Bogotá, CDMX y Caracas van algo más caros que el dato: como el
       sueldo se suavizó a mitad de camino y el costo no, con el costo real
       México y Colombia vivían como en Madrid pagando menos impuestos, y
       México acababa más rico que España. npm run paises lo mide.
     · impuesto: renta + aportes del empleado, a mitad entre lo que paga un
       junior y lo que paga una carrera avanzada, porque es una sola tasa
       para toda la partida. Florida no cobra impuesto estatal. */
export const NACIONES = [
  { id: "ve", n: "Venezuela", ban: "Caracas",
    d: "Creciste viendo inflación de tres dígitos, así que entiendes el dinero antes que nadie. El mercado local es pequeño y todo se resuelve por quién conoces a quién.",
    mods: { red: 7, cri: 7 }, cash: 1200, sal: 0.46, gas: 0.62, tax: 0.12, sesgo: "Emergentes",
    nota: "Sueldos bajos, costo de vida bajo, impuestos bajos, todo el mundo se conoce." },
  { id: "co", n: "Colombia", ban: "Bogotá",
    d: "Mercado mediano y ordenado, con banca de inversión de verdad y competencia por los puestos.",
    mods: { red: 4, rep: 3 }, cash: 3000, sal: 0.6, gas: 0.66, tax: 0.17, sesgo: "Emergentes",
    nota: "Punto de equilibrio entre oportunidad y estabilidad." },
  { id: "ar", n: "Argentina", ban: "Buenos Aires",
    d: "El país que te enseña macro a la fuerza. Cada década trae una crisis y cada crisis deja una generación que sabe leer una curva.",
    mods: { cri: 9, mod: 2 }, cash: 1800, sal: 0.54, gas: 0.59, tax: 0.24, sesgo: "Tasas",
    nota: "Criterio macro altísimo, ingresos volátiles." },
  { id: "mx", n: "México", ban: "Ciudad de México",
    d: "El mercado más grande de habla hispana y la puerta de entrada al capital estadounidense.",
    mods: { red: 4, mod: 3 }, cash: 4500, sal: 0.72, gas: 0.85, tax: 0.21, sesgo: "Comercio",
    nota: "Volumen de operaciones alto y cercanía con el norte." },
  { id: "es", n: "España", ban: "Madrid",
    d: "Acceso a Europa, instituciones sólidas y una carrera más lenta pero más predecible.",
    mods: { rep: 5, mod: 3 }, cash: 7000, sal: 1, gas: 1, tax: 0.31, sesgo: "Mercados",
    nota: "Estabilidad y la carga fiscal más alta de la lista." },
  { id: "us", n: "Estados Unidos", ban: "Miami",
    d: "La capital financiera de América Latina en Estados Unidos. Los sueldos son otra escala y también lo son la deuda estudiantil y el alquiler.",
    mods: { mod: 7 }, cash: -16000, sal: 1.7, gas: 1.52, tax: 0.22, sesgo: "Mercados",
    nota: "Empiezas debiendo dieciséis mil dólares de la universidad." },
];
