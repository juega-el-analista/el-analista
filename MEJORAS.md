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

- [ ] **7.** **Discrepancia**: el encabezado dice «efectivo 0 · cartera 32.000» pero el
  menú de Cartera dice 80% invertido / 20% efectivo. Los dos números tienen que
  coincidir o quedar clarísimo que uno es objetivo y otro es real.
- [ ] **8.** Botón **Aplicar** mucho más visible, y que no deje avanzar sin confirmar
  el cambio dentro de la cartera.
- [ ] **9.** Botones de **comprar** más visuales, con color distinto al fondo, que
  provoquen pulsarlos.
- [ ] **10.** Lo ya comprado se ve **más oscuro**, para identificar rápido lo que aún
  no tienes.
- [ ] **11.** En «El carril», **barra deslizable** en vez de botones (bono, cripto,
  acciones).

## Lote 3 — Menús emergentes

- [ ] **12.** Los menús deben ser **emergentes**, para que la decisión siga siendo lo
  principal en pantalla.
- [ ] **13.** Al desbloquear una sección, **ventana emergente** que explique para qué
  sirve esa área nueva.

## Lote 4 — Que se entienda

- [ ] **14.** El **juego de anclaje** no se entiende: pones un número en una negociación
  pero no explica qué es ese número ni para qué.
- [ ] **15.** Explicar mejor la frase «**el gasto persigue al sueldo**».
- [ ] **16.** Los exámenes tipo CIO deben preguntar **solo temas ya tocados** en esa
  partida.
- [ ] **17.** Cada decisión debe decir **qué atributo sube**.

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
