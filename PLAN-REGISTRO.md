# Plan: registro competitivo dentro del juego

Decidido con Alessandro el 28-ago-2026. **Opción A: fusión completa.** El juego y el
libro de registro pasan a ser **una sola página publicada**, con anotación
automática al terminar una carrera. Nada manual.

Motivo: quiere tráfico y un marcador competitivo. Un registro que exige copiar seis
números a mano no lo va a llenar nadie.

---

## El problema que hay que resolver primero

Cuando una página publicada guarda una versión nueva de sí misma, **todas las vistas
abiertas se recargan**. Eso no se puede evitar. Así que si el registro vive dentro del
juego, cada carrera que alguien termina recarga la partida de todos los demás.

Hoy eso duele: el juego guarda **al cerrar el año** y al retomar **reinicia el año**.
Una recarga en el año 18 te devuelve al principio del año 18.

### Por qué no basta con guardar más a menudo

Guardar tras cada decisión sin más sería **peor que el problema**: al retomar tendrías
los efectos de las decisiones ya aplicados **y** un año nuevo entero por jugar. Se
podría farmear el mismo año dos veces.

### La solución: guardar al principio de cada escena

Se guarda un snapshot **justo cuando se presenta una escena**, antes de aplicar nada:

- `s` — el estado tal como está antes de decidir
- la cola de escenas del año, **por id**

Al retomar se rehidratan las escenas desde sus ids y se vuelve a la misma decisión.
Si la recarga cae en mitad de un minijuego o de una pantalla de resultado, se retoma
**al principio de esa escena**: se re-decide una vez y no hay nada duplicado, porque
los efectos de esa escena aún no se habían aplicado cuando se guardó.

El detalle que lo complica: las escenas llevan funciones dentro (`cuando: (st) => …`)
y eso no se serializa. De ahí que se guarden ids y se rehidraten desde las tablas.

---

## Pasos, en orden de riesgo

### 1 · Cola persistida y retomar automático  ← empezar aquí

- Añadir `st.cola` (lista de ids) al estado, saneada como los demás campos.
- Registro de escenas por id para rehidratar: `E`, `D`, `E2`…`E6`, `VIDA`,
  `LEGENDARIAS`, `DECISION_RAMA`, `ESCENA_CONTRATO`, las de `APERTURAS`, y las de
  firma propia (9720/9721), que se generan con `escenaFirma(st, id)` y hay que
  reconstruir a partir del id.
- Guardar el snapshot en `arrancarAno` y en `siguienteEscena`.
- `retomar()` deja de llamar a `arrancarAno` y restaura la cola guardada.
- Al cargar, si hay partida en curso jugable, **entrar directo al juego** en vez de
  dejar al jugador en la portada pulsando «Retomar». Con un botón para volver a la
  portada si quiere.

**Esta pieza vale la pena aunque el resto no se haga**, y es verificable con las
pruebas que ya existen. Cerrarla en verde antes de seguir.

### 2 · Empaquetado con islas

`pruebas/empaquetar.js` pasa a emitir un documento con:

- `<script type="application/json" id="registro">` — el registro actual
- `<script type="text/plain" id="plantilla">` — la cáscara, con las marcas
- `<script id="juego">` — el motor de React **en una sola copia**

**El truco que evita duplicar 800 KB:** un `<script>` que se está ejecutando permite
leer su propio código con `.textContent`. Así la isla de plantilla solo guarda la
cáscara (~20 KB) y al publicar se vuelve a inyectar el motor leyéndolo de la propia
página. El documento publicado se queda en ~820 KB, no en 1,6 MB.

**Forma del documento:** el visor **siempre** envuelve lo que se guarda en su propio
`<!doctype html><html><head>…<body>`. Comprobado leyendo el artifact publicado. La
semilla y cada republicación tienen que tener **la misma forma** o el quine se
desalinea. Ver `salon/README.md` para las tres trampas del quine, que aplican igual.

### 3 · Registro dentro del juego

- Una pantalla o sección que pinta la tabla desde la isla de datos.
- En la pantalla final, botón «Anotar mi carrera»: arma el documento nuevo y publica.
  Los seis datos salen del estado, **sin escribir nada a mano**.
- Manejo de `conflict` (alguien publicó antes: recargar y repetir) y de vistas sin
  permiso de escritura (solo lectura).
- Publicar **solo** cuando el jugador pulsa, nunca al cargar.

---

## Lo que ya está hecho y sirve de base

- `salon/` — la versión separada, funcionando, con el quine resuelto y verificado.
  Su `plantilla.html` es el punto de partida del diseño de la tabla.
- Artifact del salón: https://claude.ai/code/artifact/0b41d201-50b9-496e-837d-ea6cbd508749
  (queda obsoleto cuando el registro viva dentro del juego).

## Límite que no cambia

No existe capacidad de identidad para páginas publicadas, así que **el registro es
autodeclarado**: los datos los pone el juego, pero nada impide que alguien edite y
publique otra cosa. Decirlo en la página, como ya lo dice el salón.
