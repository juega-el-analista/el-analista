# El Analista — mejoras pedidas tras jugar (28-ago-2026)

Observaciones de Alessandro después de una partida completa con la apertura
escalonada ya puesta. El arranque quedó bien; esto es lo que sigue.

Estado: `[ ]` pendiente · `[x]` hecho · `[~]` hecho con matices (explicados abajo)

---

## Lote 1 — Encabezado y legibilidad

- [x] **1.** Quitar «año 1 de 30». No se debe saber cuándo se acaba el juego.
- [x] **2.** Mostrar **sueldo anual** en el encabezado en vez de energía y reputación.
- [x] **3.** El número naranja grande de la sección Vida no se entiende qué es.
- [x] **4.** Nombres de los minijuegos **en grande**: «tres en raya» parece texto normal,
  debe verse que estás por jugar algo.
- [x] **5.** En el juego de repetir colores, **no escribir el nombre del color**.
- [~] **6.** Cambiar los nombres de los números por los números directamente, para
  acortar textos.

## Lote 2 — Cartera y compras

- [x] **7.** **Discrepancia**: el encabezado dice «efectivo 0 · cartera 32.000» pero el
  menú de Cartera dice 80% invertido / 20% efectivo. Los dos números tienen que
  coincidir o quedar clarísimo que uno es objetivo y otro es real.
- [x] **8.** Botón **Aplicar** mucho más visible, y que no deje avanzar sin confirmar
  el cambio dentro de la cartera.
- [x] **9.** Botones de **comprar** más visuales, con color distinto al fondo, que
  provoquen pulsarlos.
- [x] **10.** Lo ya comprado se ve **más oscuro**, para identificar rápido lo que aún
  no tienes.
- [x] **11.** En «El carril», **barra deslizable** en vez de botones (bono, cripto,
  acciones).

## Lote 3 — Menús emergentes

- [x] **12.** Los menús deben ser **emergentes**, para que la decisión siga siendo lo
  principal en pantalla.
- [x] **13.** Al desbloquear una sección, **ventana emergente** que explique para qué
  sirve esa área nueva.

## Lote 4 — Que se entienda

- [x] **14.** El **juego de anclaje** no se entiende: pones un número en una negociación
  pero no explica qué es ese número ni para qué.
- [x] **15.** Explicar mejor la frase «**el gasto persigue al sueldo**».
- [x] **16.** Los exámenes tipo CIO deben preguntar **solo temas ya tocados** en esa
  partida.
- [x] **17.** Cada decisión debe decir **qué atributo sube**.

## Lote 5 — Contenido y sistemas nuevos

- [x] **18.** Decisiones importantes de la vida con **influencia grande**.
- [x] **19.** **Decisiones legendarias**: suben más de lo normal, poco frecuentes pero
  que aparezcan de vez en cuando.
- [x] **20.** **Negociaciones de contrato**, con años de contrato incluidos.
- [x] **21.** Mostrar el **país y la empresa** donde trabajas (ligado al contrato).
- [x] **22.** **Nombres de empresas** acordes a la carrera elegida.
- [x] **23.** Opción de **renunciar e independizarse**, creando firma propia **según la
  carrera**: constructora para ingeniería civil, bufete para derecho, algo de IA para
  ingeniería de sistemas. Hoy solo ofrece boutique / gestión de patrimonios / private
  equity, que no le encaja a todas las carreras.
- [x] **24.** Lo que compras puede traer **eventos inesperados**, buenos o malos, según
  la suerte.
- [x] **25.** Decisiones de vida (pareja, boda, hijos) **más frecuentes**: en la partida
  salió novia a los 21, ruptura a los 24, y nada más en el resto de la vida.
- [x] **26.** **Coherencia temporal**: no puede aparecer «conseguir novia» a los 36 si a
  los 32 ya compraste la boda soñada.

## Lote 6 — el cierre de la partida

- [x] **27.** Al retirarte, **proyectar hasta los 65** (edad de retiro normal): qué habrías
  generado en esos años que no se juegan. Y **mostrar el rendimiento del fondo** a lo largo
  de la partida: terminó a los 50 y nunca pudo ver cómo le fue a su fondo.
- [x] **28.** El **expediente** debe recoger la vida entera: de qué temas aprendiste, todas
  las decisiones importantes, los ascensos, las caídas y el mejor año.
- [x] **29.** **Reconocimientos** nacionales y mundiales según la carrera (del estilo de un
  Nobel para Economía). Sirven para construir legado y para tener un nombre que la gente
  conozca, no solo un patrimonio.
- [x] **30.** A partir de los 30 poder **declarar si tienes pareja e hijos**. Interpretado
  como paso del setup cuando se elige empezar a los 30, 40 o 50: hoy empezabas a los 50
  soltero y sin hijos siempre.
- [x] **31.** El recorrido **no debe ser 30 años fijos**: que lo decida el jugador. Botón de
  retirarse en cuanto el patrimonio cubra lo suficiente para su familia.

---

## Notas de implementación

### Lote 1 (commit pendiente, 28-ago-2026)

- **2 (sueldo):** el sueldo anual sale siempre; energía y reputación ya no ocupan sitio
  fijo, aparecen solo bajo su umbral de aviso (energía <50, reputación <30), porque es el
  único momento en que cambian una decisión. Si se quieren fuera del todo, quitar los dos
  `<span>` condicionales del bloque `ea-signos`.
- **1 (no revelar el final):** quitado del encabezado, y quitada también la mención de
  «treinta años» del panel «Cómo vas a vivir este año», que lo revelaba en pleno juego.
  **Sigue visible en las pantallas de setup** a propósito: ahí «en todos los casos juegas
  treinta años» y «terminas a los 50» son lo que permite elegir la edad de inicio con
  criterio. Pendiente de confirmar con Alessandro si también debe irse.
- **5 (colores):** el nombre del color sale del render pero se conserva en `aria-label`,
  así que un lector de pantalla sigue pudiendo jugar. Regla CSS `.ea-celdaN` eliminada.
- **6 (números):** hecho en texto **explicativo** (25 veces, 3 a 6 meses, 25 años,
  cada 10.000 años). **No** en la prosa narrativa de las escenas: «Once de la noche, el VP
  deja una carpeta encima de tu teclado» pierde si dice «11 de la noche». Los ~20 «treinta
  años» restantes son contenido financiero real (interés compuesto, regla del 4%) y no se
  tocan.

### Lote 2 — cartera y compras (28-ago-2026)

- **7 (la discrepancia): no era un bug.** El reparto sí se aplica al cerrar el año
  (`st.cartera = líquido × objetivo`), pero **después** se pagan los gastos del año y esos
  salen del efectivo. De ahí «efectivo 0 · cartera 32.000» con un objetivo de 80/20: el
  objetivo se cumplió y luego la vida se comió la parte líquida. El panel ahora abre con
  **dos barras**: «Cómo está repartido ahora mismo» (lo real, con sus cifras) y «Tu
  objetivo». Cuando se separan más de 3 puntos aparece una nota explicando por qué.
- **8 (Aplicar):** clase `.ea-aplicar` en cobre, del doble de peso visual. Y el bloqueo es
  real: `PanelCartera` avisa hacia arriba con `onPendiente`, y mientras haya cambios sin
  aplicar quedan deshabilitados las opciones de la escena, el avance de escena, el cierre
  de año, el cambio de sección y el propio botón de cerrar el panel.
  **Verificado que no puede quedar bloqueado para siempre:** `invertidoDe()` ignora la
  clave `efectivo` y `rotacion()` compara las mismas claves en los dos lados, así que al
  aplicar la rotación vuelve a 0 y la bandera se apaga. Los `setTab(null)` de reinicio
  desmontan el panel, y el cleanup del efecto apaga la bandera.
- **10 (lo comprado, apagado):** sin `opacity` en el contenedor, porque eso apagaría
  también la etiqueta verde de «ya lo tienes». Se oscurece con fondo, borde verde a la
  izquierda y colores atenuados por elemento.
- **11 (El carril):** barra de 3 posiciones; los nombres de carril quedan debajo como
  etiquetas alineadas, y el activo se resalta en cobre. Reglas `.ea-carrilB` eliminadas.

### Lote 3 — menús emergentes (28-ago-2026)

- **12 (emergentes):** el panel lateral de 300px desaparece; las secciones se abren en un
  `position:fixed` sobre la pantalla y el tablero de la decisión ocupa siempre el ancho
  completo. No hizo falta mover el JSX de sitio: basta con forzar `.ea-grid.solo` y
  convertir los dos `div` envolventes en fondo + ventana, porque `fixed` sale del flujo y
  se pinta encima aunque siga primero en el DOM. Se cierra con la X, con clic en el fondo
  y con Escape.
- El listener de Escape lleva un guardarraíl `typeof window.addEventListener === "function"`
  porque el arnés de pruebas monta un `window` falso que solo tiene `localStorage`. Sin
  eso, las 27 pruebas de robustez petardean al montar.
- **13 (ficha del sistema nuevo):** cada entrada de `APERTURAS` lleva ahora un campo `guia`
  con título, una frase y 2-3 puntos. Al resolverse la escena de apertura se dispara un
  emergente que lo explica, con botón «Ver la sección» que abre la sección directamente.
  Para el banco, que no tiene pestaña propia, el botón lleva a Ficha.
- **Consecuencia limpiada:** el aviso «DECISIÓN EN ESPERA» del Lote 2 quedó inalcanzable,
  porque `carteraPend` solo puede estar encendida mientras el emergente tapa la pantalla.
  Se elimina el aviso; los `disabled` se quedan, porque sí evitan llegar por teclado a un
  botón que está detrás del emergente.

### Lote 4 — que se entienda (28-ago-2026)

- **14 (anclaje):** el juego SÍ explicaba las reglas en la tarjeta previa, pero la pantalla
  de juego solo tenía un slider de 0 a 100 rotulado «Tu número», sin unidad ni referencia.
  Ahora la cifra manda en pantalla a 38px, se explica que el número es **lo agresiva que es
  tu oferta**, y los extremos van rotulados: «0 · lo regalas» / «100 · te levantan de la
  mesa». También se dice cuántas ofertas quedan en vez de repetir el número.
- **15 (la frase):** la lección ahora abre explicando la metáfora («cuando sube lo que ganas
  sube casi igual lo que gastas, sin que llegues a decidirlo») antes de dar las cifras, y
  cierra con el por qué importa: la distancia entre sueldo y gasto nunca crece.
- **16 (exámenes justos):** las preguntas derivadas del temario llevan `tema: tema.id`; las
  de banco general no cuelgan de ningún tema. `armarExamen()` recibe ahora los temas ya
  dados y descarta toda pregunta atada a un tema que nunca se explicó. Como al principio
  casi no hay temas dados, el examen se completa con **fundamentos generales de tu nivel o
  por debajo**, nunca con un tema sin clase previa.
  El registro entra por `st.temas`: la Cátedra avisa del tema que acaba de dar y desde ese
  momento puede salir en examen. Hubo que cablear `temas`/`onTema` por
  Motor -> TarjetaJuego -> MiniJuego -> JuegoQuiz/JuegoCatedra.
- **17 (qué sube cada decisión):** helper `efectoDe(o)` que lee `o.d`, o el mejor caso de
  `o.res`, o `o.chk.ok`. Muestra una etiqueta «sube X, Y · cuesta Z» en cada opción.
  **A propósito sin cifras:** saber que algo cuesta energía es información útil; saber que
  cuesta exactamente 18 convierte la decisión en aritmética y le quita la apuesta.

### BUG PROPIO encontrado por la prueba (28-ago-2026)

**Colisión de ids de escena.** Las escenas de apertura del primer lote se numeraron
9001-9006, que son **los mismos ids que seis escenas de VIDA**. Como `resolverEscena()`
hace `st.vistos = st.vistos.concat(ev.id)`, cada apertura bloqueaba para siempre una
escena de vida. Renumeradas a **9701-9706** (rango libre y comprobado).

Efecto medido: «evento de vida: pareja» pasó de 0 a **8** apariciones en 20 partidas, y
«evento de vida: estafa» de 0 a **4**. En la versión original pareja salía solo 2 veces,
así que arreglarlo dejó la vida más viva que antes del primer lote. Cobertura 45/51, con
exactamente los 6 marcadores sin ver de la base.

**Lección:** al inventar ids de escena, comprobar el rango completo. Añadido al script de
verificación: contar ids duplicados >= 900 antes de dar un lote por bueno.

### Nota anterior (corregida)

~~El marcador «evento de vida: pareja» pasó de 2 apariciones a ninguna. No es una regresión:
con 2 de 20 ya estaba en el ruido.~~ **Falso: sí era una regresión**, la colisión de ids de
arriba. La prueba
confirma por su cuenta la queja del punto 25, y da una forma de medir si se arregla:
cuando las decisiones de vida sean más frecuentes, ese marcador debe subir claramente.
Los otros 7 sin ver son los mismos de antes del primer lote.

### Punto 30 — declarar la familia al empezar pasados los 30

Nueva fase de setup `familia`, solo cuando la edad elegida es 30, 40 o 50. Se declara la
pareja (sin pareja / en pareja / casado / divorciado) y los hijos (0 a 4).

- Se etiqueta también como «Paso tres de cinco», como sub-paso de la edad, para no
  renumerar los otros cuatro pasos según una rama condicional.
- **No hace falta bloquear escenas a mano:** las de vida ya se filtran por `st.pareja` y
  `st.hijos`, así que declararse casado apaga sola la escena que pregunta si quieres
  pareja. Eso resuelve de paso parte del punto 26 (coherencia temporal).
- Se permiten hijos sin pareja: madre o padre solo es una situación real, y las escenas
  que dependen de `hijos >= 1` siguen funcionando igual.

### Segundo fallo del escalonamiento, encontrado probando el punto 30

Al arrancar a los 40 el jugador entra como **Asociado (rango 3)**, pero `arrancarPartida()`
dejaba `abiertos: []`, así que empezaba solo con Ficha y Términos y tenía que «descubrir»
durante cinco años que existen las carteras — cuando el umbral de la cartera es rango 1.

Arreglado en `arrancarPartida()`, justo después de poner el cargo al día:
`st.abiertos = APERTURAS.filter((a) => st.rango >= a.rango).map((a) => a.id)`.

Verificado en el juego: un Asociado de 40 arranca ahora con Ficha, Cartera, Términos,
Inmuebles, Mejoras y Vida, y solo le queda Fondo (rango 4), que sí llega como escena. Un
recién graduado de 20 (rango 0) sigue arrancando con dos secciones, como debe.

### Lote 5, primera mitad (28-ago-2026)

**25 · la vida no se apaga a los 24.** La causa exacta: la escena de noviazgo (9001) es
`una: true` y su ventana acaba a los 34; la siguiente para alguien solo empezaba a los 36.
Entre los 24 y los 36 no existía ninguna. Se añaden dos escenas **repetibles**: «No es la
primera vez que empiezas esto» (solo, 25-39) y «La conversación de los planes» (en pareja,
27-44). Y la probabilidad anual de escena de vida sube de 0,62 a 0,78.

Medido en 20 partidas: pareja pasó de 2 (original) a **10**, y las dos nuevas salen 6 veces
cada una.

**26 · coherencia.** El capricho `boda` y el `fondo de educación para tus hijos` se podían
comprar sin pareja y sin hijos. Ahora llevan `requiere` + `porQue`, se consultan por
`puedeComprar()` (con try/catch, para que un predicado mal escrito no tumbe la pantalla), y
en vez del botón sale el motivo. Pagar la boda estando de novios **te casa**, que era la
otra mitad de la incoherencia.

**Error propio en el camino:** puse el guardarraíl en la lista de `PROPIEDADES` en vez de
`CAPRICHOS`, que es donde viven boda y fondo. La compra sí estaba bloqueada en
`comprarBien()`, pero el botón se mostraba y no hacía nada — peor que un mensaje claro. Lo
detectó la prueba: los dos marcadores de coherencia salían NUNCA. Corregido en las dos
listas.

**20, 21 y 22 · dónde trabajas y con qué contrato.** Tabla `PATRONES` con tres firmas
inventadas por carrera; al empezar te toca una según lo que estudiaste, y sale en el
encabezado junto al país. El contrato (`st.contrato`) tiene años y, al vencer, dispara una
escena de renegociación que se empuja a mano desde `generarAno` para que pueda repetirse
toda la partida.

- Se firma por 2, 4 o 6 años: más años, más sueldo y menos margen para moverte.
- La cuarta opción es **negociar con la competencia**, y pasa por el minijuego de anclaje.
  Eso le da por fin una consecuencia real a ese minijuego.
- El sueldo deja de depender solo del rango: `st.sueldoMult` se acumula por renovación,
  acotado a 2,2x. Si negocias mal **no hay subida y tampoco te mudas de firma**: firmar
  bien y firmar mal no pueden pagar igual.

### Lote 5, segunda mitad (28-ago-2026)

**23 · independizarse según tu título.** Tabla `FIRMAS`, una por carrera: consultora macro
(eco), firma de auditoría (con), constructora (ing), bufete (der), firma de asesoría (adm)
y casa de IA aplicada a finanzas (sis). Cada una con su coste de montarla, su multiplicador
de sueldo y sus atributos: la constructora es la más cara y la más rentable, la auditoría
la más aburrida y la más segura.

La escena «Renunciar y montar lo tuyo» se ofrece **dos veces** (al llegar a Asociado y otra
más arriba), porque decir «no ahora» no puede ser decir «no nunca». Pasa por el minijuego
de estructura: si sale mal montas la firma igual pero arrancas tocado — renunciar ya es
irreversible cuando entregas la carta.

Y la rama «Tu propia boutique», que decía lo mismo a todo el mundo, ahora se llama según tu
título vía `nombreRama()`. Era justo la incoherencia que se señaló.

**19 · legendarias.** Cuatro escenas (`LEGENDARIAS`) con cifras que ninguna escena normal
mueve: el mandato de la década, un asiento en un fondo soberano, el activo que nadie quiere
y la silla de la mesa. Una sola tirada al año, 11%, solo pasado el año 4 y cada una una vez
en la partida. Cabecera propia en cobre: se ve que es distinta antes de leerla.

**18 · las de vida que parten la vida en dos.** Casarse, el primer hijo y la crisis del
matrimonio pasan a `clave: true`. **No toqué sus números a ciegas:** el peso económico de
esas decisiones ya es grande y es continuo, porque la pareja y los hijos entran en
`gastoAnual()` todos los años. Lo que faltaba era que se vieran importantes, y eso es lo
que se arregló. Las cifras grandes de golpe viven en las legendarias.

**24 · lo que compras trae cola.** 22% de que salga bien, 22% de que salga mal, 56% de
nada. Mueve el valor del bien, el efectivo o un atributo, y queda anotado en el expediente.
Hubo que partir `comprarBien()` en dos: los guardarraíles y la tirada fuera del reductor
(para poder avisar), y `aplicarCompra()` dentro, que los vuelve a comprobar.

**Repetí un error mío y lo generalicé al arreglarlo.** La escena de contrato ocupaba un
hueco del año sin sumar al objetivo, igual que hacían las aperturas antes. Ahora
`const forzadas = lista.length` y `objetivo = min(forzadas + 2 + azar, 6)`: **todo** lo que
se empuja a mano suma en vez de desplazar. Así no vuelve a pasar con lo próximo que se
empuje.

**31 · la duración la decides tú.** `TOPES` pasa de [30,35,40] a [30,35,40,45,50,55], y el
juego deja de jubilarte por decreto a la segunda prórroga: solo termina solo cuando ya no
queda tabla. Y en el cierre de cada año, **en cuanto `cobertura >= 1`**, aparece un botón
de «Retirarme ya» que dice qué porcentaje de tu vida cubre tu patrimonio y de cuánto
dispondrías retirando el 4%. Retirarse deja de ser algo que el juego te impone.

### Lote 6 — el cierre de la partida (28-ago-2026)

**27 · lo que venía después.** Dos paneles nuevos en la pantalla final.

- «Lo que venía después», solo si te retiras antes de los 65: cuántos años faltaban, tu
  patrimonio a los 65 sin tocarlo al retorno esperado de tu cartera, cuánto ganó solo por
  estar quieto, y el sueldo neto que dejaste sobre la mesa. Dice explícitamente que no
  descuenta lo que habrías gastado: es orden de magnitud, no promesa.
- «Lo que tu fondo tenía todavía en el suelo»: **esta era la queja real**. Las posiciones sin
  salir nunca se valoraban, así que el rendimiento del fondo quedaba invisible al cerrar
  antes. Ahora se valoran a su múltiplo base (sin azar, porque es una estimación y no una
  tirada), posición por posición, con el capital metido, el valor esperado, lo que te habría
  tocado y el múltiplo total sobre el capital comprometido.

**28 · el expediente cuenta la vida entera.** Tres bloques nuevos en la sección Vida:
«Tu nombre» (los reconocimientos), «De qué aprendiste» (los temas dados, que son los
mismos de los que te puede examinar el juego) y «Los años que se recuerdan» (cargo
alcanzado, mejor año y peor año calculados de `st.histo`, y las caídas: agotamientos,
despidos, quiebras y embargos).

**29 · reconocimientos.** Doce premios, dos por carrera: uno nacional alcanzable a media
carrera con el atributo que esa formación trabaja, y uno mundial que pide atributo 92,
rango 5 y 18 años de recorrido — el Nobel de Economía es uno de ellos. Se conceden solos al
cerrar el año, suben reputación y red, y quedan en el expediente y en la pantalla final.

### La prueba `finales.js`, arreglada

Estaba rota desde antes de todo esto: las 20 partidas daban duración 0 porque la prueba era
anterior a la pantalla de identidad y se quedaba clavada ahí. Arreglado el recorrido del
setup, y además se le enseñó a **cerrar los emergentes** (guía, ficha de sección nueva,
panel de sección), que si no la atrapaban dentro.

Resultado: de **0 de 20** partidas útiles a **6 llegando a los 30 años** y 5 alcanzando un
veredicto final. Eso es lo que permitió verificar los paneles nuevos: ninguna de esas cinco
reportó «error», que es lo que devuelve la prueba si el render revienta. La cobertura no
sirve para esto porque nunca llega al final — todos los marcadores `final:` salen NUNCA
también en la versión base.

Quedan 15 partidas colgadas en minijuegos que piden clics en el tablero y no botones. Es
una limitación previa de la prueba, no del juego.

### El nombre

Se propuso cambiarlo (el título nombra el segundo peldaño de la escalera que el juego trata
de subir, y deja de hablar de ti cuando eres Socio). **Decisión de Alessandro: se queda
«El Analista».** No volver a proponerlo.
