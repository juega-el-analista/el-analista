# El Analista dentro de SurEconomics: cómo funciona de ahora en adelante

Para quien trabaja en el repo `juega-el-analista/el-analista`, persona o agente. Conviene
dejarlo en la raíz del repo y enlazarlo desde `CLAUDE.md`, para que se lea antes de tocar
`src/el-analista.jsx`.

Octubre de 2026.

---

## 1. Qué cambió

El juego ya **no se sirve desde su propio Vercel** para SurEconomics. Ahora es una página más
del sitio, en **`https://www.sureconomics.com/el-analista`**.

- **SurEconomics copia vuestro `src/el-analista.jsx` de la rama `main`, tal cual.** Lo hace
  con un comando propio (`npm run traer-analista`) y anota el commit de origen.
- **SurEconomics no edita nunca ese archivo.** Lo envuelve con lo suyo: una barra para volver
  al sitio, la cuenta del lector, el ranking y el aviso de cookies.
- **Lo que unáis a `main` es lo que sale publicado** la próxima vez que SurEconomics
  sincronice. No hay otra rama de publicación.
- **Solo se copia `src/el-analista.jsx`.** `index.html`, el quine, el artifact, la PWA,
  `pruebas/` y `sitio/` no se usan en SurEconomics. Siguen valiendo para vuestra web propia si
  la mantenéis.
- **`VITE_API_URL` y `window.__pedir` no hacen falta para SurEconomics.** Además, la URL que
  tenéis termina en `/api` y ahí la API da 404.

### El ciclo

1. Trabajáis en vuestra rama y unís a `main` por pull request, como hasta ahora, con vuestras
   pruebas en verde.
2. Avisáis a Ramón (SurEconomics) de que hay algo nuevo en `main`.
3. SurEconomics trae el archivo, compila, lo prueba en local y lo publica.
4. Si algo de vuestro código rompe la integración, SurEconomics no lo publica y os lo devuelve
   como issue o pull request a vuestro repo. **Nunca se arregla del lado de SurEconomics.**

---

## 2. El contrato: lo que no se puede romper

El comando de sincronización **se niega a traer** el archivo si falta cualquiera de los cuatro
primeros puntos.

### 2.1 Un solo archivo y un solo import

- `src/el-analista.jsx` tiene que tener `export default function ElAnalista()`.
- **El único import permitido es `react`** (React 18). Un import de otro archivo o de una
  librería rompe el build de SurEconomics, porque solo se copia este archivo. Si hace falta
  algo así, se habla antes.
- El juego se carga solo al entrar en `/el-analista`. Puede ser grande, pero no puede hacer
  nada al importarse aparte de definir cosas: nada de efectos a nivel de módulo.

### 2.2 Los tres enganches del ranking

SurEconomics los define en `window` **antes de montar el juego**. Vuestro código ya los lee así:

| Enganche | Qué es |
|---|---|
| `window.__REGISTRO` | Array con la mejor carrera de cada cuenta, de mayor a menor patrimonio, con hasta 20 filas. Cada fila es `{ id, n, c, e, p, m, v, fecha }`. Se lee al pintar. **No lo mutéis.** |
| `window.__puedeAnotar()` | `Promise<boolean>`. Es `true` siempre que la API responda, **también sin sesión**: así se enseña el botón y SurEconomics explica lo de la cuenta al pulsarlo. |
| `window.__anotarCarrera(entrada)` | `Promise<null \| "sin-sesion" \| "fallo">`. **Nunca rechaza.** |

Cómo se comporta `__anotarCarrera` según el lector:

- **Con cuenta y correo confirmado:** anota en el servidor, actualiza `window.__REGISTRO` y
  resuelve `null`.
- **Sin cuenta, o sin el correo confirmado:** SurEconomics abre su propio aviso, encima del
  juego, con *Entrar / Crear cuenta / Ahora no*. La carrera queda guardada en el navegador.
  - Si el lector va a entrar, **la página navega fuera del juego y la promesa no resuelve
    nunca**: el botón se queda en «Anotando…» hasta que la página cambia, y está bien así. Al
    volver con sesión, SurEconomics anota esa carrera solo.
  - Si elige «Ahora no», resuelve `"sin-sesion"`.
- **Error de red o del servidor:** resuelve `"fallo"`.

### 2.3 La entrada que se anota

El servidor valida esto. **Lo que no cumple se rechaza y la carrera no se anota.**

| Campo | Qué es | Regla |
|---|---|---|
| `n` | Nombre con el que figura | Texto de 1 a 24 caracteres. |
| `c` | Cargo de retiro | Texto de 24 como mucho; puede ir vacío. |
| `e` | Edad de retiro | **Entero** de 15 a 120. |
| `p` | Patrimonio en USD | **Entero** (ya hacéis `Math.round`); puede ser negativo; ±10¹³ como mucho. |
| `m` | Medallas | **Entero** de 0 a 99. |
| `v` | Veredicto | Texto de 60 como mucho. |

Un decimal en `e`, `p` o `m` hace fallar la anotación.

### 2.4 Lo que el juego guarda en el navegador

`el-analista-partida`, `el-analista-arbol`, `el-analista-aviso-leido`, `el-analista-finales`,
`el-analista-movimiento`, etc. viven ahora en el dominio de sureconomics.com. **Renombrar una
clave hace que los jugadores pierdan su partida.** Si hay que cambiarla, hay que leer la vieja y
migrarla.

### 2.5 Convivir con el sitio

El sitio es una SPA: el juego **se monta y se desmonta** cada vez que el lector entra o sale de
`/el-analista`, sin recargar la página.

- **Todo lo que se registra se limpia al desmontar:** `addEventListener`, `setInterval`,
  `requestAnimationFrame` y temporizadores, en el `return` de su `useEffect`. Un oyente que
  queda vivo sigue funcionando en el resto del sitio.
- **Los estilos se quedan bajo `.ea-root`.** Nada de reglas sobre `html`, `body`, `*`, `:root`
  ni etiquetas sueltas: se quedarían aplicadas al volver al sitio. El `@import` de Rubik y
  Nunito está bien.
- **Capas (`z-index`): el juego, por debajo de 100.** El aviso de cuenta de SurEconomics va en
  100 y la barra de cookies en 950. Hoy llegáis hasta 80, y está bien.
- **Arriba del juego hay una barra fija de 48 px** («← SurEconomics»). Las pantallas
  `position: fixed; inset: 0` la tapan mientras están abiertas, y eso es aceptable.
- **El juego tiene que funcionar sin los enganches** (vuestra web propia, el artifact). Ya lo
  hace: no lo perdáis.

### 2.6 Cuentas, sesión y cookies: no son del juego

- **No leáis tokens ni `sessionStorage` del sitio, ni llaméis a la API de SurEconomics por
  vuestra cuenta.** La sesión es del sitio y pasa siempre por los enganches.
- **No pongáis cookies ni medición propias.** SurEconomics ya mide la página del juego con el
  consentimiento del lector: visitas y tiempo jugando.

---

## 3. Lo pendiente de vuestro lado, en orden

**1. El motivo `"sin-sesion"`.** Hoy `BotonAnotar` lo trata como un error genérico y enseña
«No se pudo anotar. Recarga la página e inténtalo otra vez.».
- Hecho cuando: con `"sin-sesion"` sale algo como «Para sumar al ranking necesitas una
  cuenta» y el botón vuelve a estar disponible, sin texto en rojo.

**2. El texto tras anotar.** «Anotada. La página se recarga para todo el mundo con tu carrera
dentro.» era del artifact.
- Hecho cuando: dice algo como «Anotada en el ranking de SurEconomics.».

**3. Comprobad que el ranking se refresca al anotar.** `__anotarCarrera` deja la lista nueva
en `window.__REGISTRO`. Pero `PanelRegistro`, al lado de `BotonAnotar` en la pantalla final,
solo la lee cuando se vuelve a pintar, y el cambio de estado de `BotonAnotar` no lo repinta.
Por lo que se ve en el código, puede quedarse con la lista vieja; no se ha visto todavía en
una partida real.
- Hecho cuando: tras una anotación correcta, el panel de la pantalla final enseña la lista
  nueva sin recargar. Si hace falta, que `BotonAnotar` avise al padre y este suba un contador
  que fuerce el pintado.

**4. Claves duplicadas.** En varias escenas el objeto lleva `clave:true` dos veces (ids 9010,
9012 y siguientes, en las líneas 32 370 y siguientes). El compilador avisa en cada build.
- Hecho cuando: el build no da avisos de «Duplicate key».

**5. Partida en la nube: es una propuesta. Confirmadla con Ramón antes de implementarla.**
El backend ya está hecho: `GET`, `PUT` y `DELETE /analista/partida`; un `sobre` de 256 KB como
mucho, con `version` y `version_base`; y un `409 partida_mas_nueva` cuando otro dispositivo
guardó en medio. Para que el juego lo use sin tocar la sesión, SurEconomics pondría un cuarto
enganche:

```js
window.__nube = {
  disponible(): Promise<boolean>,          // hay sesión y la API responde
  leer(): Promise<{ sobre, version, updated_at } | null>,
  guardar(sobre, versionBase): Promise<{ version }>,
  //   rechaza con { code: "partida_mas_nueva", servidor: { sobre, version, updated_at } }
  borrar(): Promise<void>,
};
```

Del lado del juego:
- al arrancar, si `__nube` existe y hay una partida más nueva que la local, ofrecer retomarla;
- al guardar, mandar también a la nube, sin bloquear el juego si falla;
- ante `partida_mas_nueva`, preguntar al jugador con cuál quedarse.

El `sobre` es el mismo texto que ya guardáis en `el-analista-partida`, con vuestro mismo
blindaje al leerlo.

---

## 4. Antes de unir algo a `main`

- [ ] `npm run sintaxis` y `npm run robustez` en verde, como siempre.
- [ ] Sigue habiendo `export default function ElAnalista` y ningún import aparte de `react`.
- [ ] Los tres enganches se siguen leyendo igual (`__REGISTRO`, `__puedeAnotar`,
      `__anotarCarrera`).
- [ ] La entrada de la pantalla final manda `e`, `p` y `m` como enteros.
- [ ] No se renombró ninguna clave de `localStorage`, o se migra la vieja.
- [ ] Ningún estilo nuevo fuera de `.ea-root`, y ningún `z-index` de 100 o más.
- [ ] Todo oyente o temporizador nuevo se limpia al desmontar.
- [ ] Avisar a Ramón de que hay algo nuevo en `main`.
