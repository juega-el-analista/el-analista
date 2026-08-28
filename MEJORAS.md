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

- [ ] **18.** Decisiones importantes de la vida con **influencia grande**.
- [ ] **19.** **Decisiones legendarias**: suben más de lo normal, poco frecuentes pero
  que aparezcan de vez en cuando.
- [ ] **20.** **Negociaciones de contrato**, con años de contrato incluidos.
- [ ] **21.** Mostrar el **país y la empresa** donde trabajas (ligado al contrato).
- [ ] **22.** **Nombres de empresas** acordes a la carrera elegida.
- [ ] **23.** Opción de **renunciar e independizarse**, creando firma propia **según la
  carrera**: constructora para ingeniería civil, bufete para derecho, algo de IA para
  ingeniería de sistemas. Hoy solo ofrece boutique / gestión de patrimonios / private
  equity, que no le encaja a todas las carreras.
- [ ] **24.** Lo que compras puede traer **eventos inesperados**, buenos o malos, según
  la suerte.
- [ ] **25.** Decisiones de vida (pareja, boda, hijos) **más frecuentes**: en la partida
  salió novia a los 21, ruptura a los 24, y nada más en el resto de la vida.
- [ ] **26.** **Coherencia temporal**: no puede aparecer «conseguir novia» a los 36 si a
  los 32 ya compraste la boda soñada.

## Lote 6 — el cierre de la partida

- [ ] **27.** Al retirarte, **proyectar hasta los 65** (edad de retiro normal): qué habrías
  generado en esos años que no se juegan. Y **mostrar el rendimiento del fondo** a lo largo
  de la partida: terminó a los 50 y nunca pudo ver cómo le fue a su fondo.
- [ ] **28.** El **expediente** debe recoger la vida entera: de qué temas aprendiste, todas
  las decisiones importantes, los ascensos, las caídas y el mejor año.
- [ ] **29.** **Reconocimientos** nacionales y mundiales según la carrera (del estilo de un
  Nobel para Economía). Sirven para construir legado y para tener un nombre que la gente
  conozca, no solo un patrimonio.

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

### Hallazgo de la prueba de cobertura (28-ago-2026)

El marcador **«evento de vida: pareja»** pasó de aparecer 2 veces en 20 partidas a no
aparecer ninguna. **No es una regresión:** con 2 de 20 ya estaba en el ruido. La prueba
confirma por su cuenta la queja del punto 25, y da una forma de medir si se arregla:
cuando las decisiones de vida sean más frecuentes, ese marcador debe subir claramente.
Los otros 7 sin ver son los mismos de antes del primer lote.
