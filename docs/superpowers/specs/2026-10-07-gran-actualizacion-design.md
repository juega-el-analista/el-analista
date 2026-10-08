# Gran actualización: lo que El Analista aprende de El Ídolo

Octubre de 2026. Rama `ale/gran-actualizacion`, montada sobre `saul/carreras`.
Aprobado por Alessandro el 7-oct-2026.

## Por qué

Alessandro jugó El Analista y lo comparó con El Ídolo (potrerofutbol.ar/el-idolo).
Tres quejas concretas y un diagnóstico:

1. Las mejoras salen a partir de los 30 años: `APERTURAS` abre un sistema por año
   y Mejoras es el quinto (rango 3 / año 11). La más barata cuesta USD 4.500.
2. La barra 0–100 (`JuegoAnclaje`) es un «adivina el número»: sin rival, sin riesgo.
3. La cartera (`PanelCartera`) enseña unas 40 cifras, 9 sliders y jerga, y traba el
   avance del año mientras haya cambios sin aplicar.

Además: un «FALLIDO» sigue sumando (×0,3) con texto de felicitación, no hay razón
para volver mañana y el final no se puede compartir. El Ídolo da algo visible cada
año (cartas de pretemporada), hace que perder duela, tiene carrera del día y
botón de compartir.

## Qué entra

### 1. Pretemporada y mejoras baratas
- Cada año empieza con la escena «Pretemporada»: tres cartas, eliges una. Cada
  carta suma a un atributo (`ene`, `cri`, `mod`, `red`, `rep`): común +2 (70%),
  rara +3 (25%), dorada +4 (5%). Títulos cortos («Café con el director»).
- Va **fuera del presupuesto** del año (se pone delante al final de `generarAno`).
- Las cartas salen de un sorteo determinista por `st.semilla` y `st.turno`, para que
  una recarga a mitad de año reconstruya la misma escena desde su id.
- Mejoras se abre en el primer año (`rango: 1, ano: 0`, primera de `APERTURAS`),
  con una escena reescrita para alguien que empieza.
- Cuatro mejoras nuevas de USD 400 a 800, cada una +1 al año a un atributo.

### 2. Fallar duele
- `escalar(d, "fallo")`: lo positivo se multiplica por 0 (antes 0,3) y se suma un
  costo de −2 de reputación.
- Si el minijuego sale «fallo» y la opción no trae `res` propio, el mensaje deja de
  ser el de la opción y pasa a decir que no salió.

### 3. Cartera simplificada
- Lo de arriba: «¿Cuánto inviertes?» (0, 25, 50, 75, 100%) y tres perfiles
  (🛡️ Prudente, ⚖️ Equilibrado, 🚀 Agresivo) apoyados en `PERFILES`.
- Un toque aplica (con la comisión de siempre); no queda nada pendiente.
- Los siete activos, volatilidad, Sharpe y beta pasan a «Modo experto», plegado.
- Sin clave nueva ni migración: los pesos guardados se respetan.

### 4. La negociación (sustituye a la barra, sigue llamándose `anclaje`)
- La contraparte tiene un tipo oculto: apurado, duro u orgulloso.
- Tres rondas. En cada una dice una frase (pista) y juegas una carta: Pedir más,
  Ceder un poco, Mostrar la oferta de la competencia (una vez) o Plantarte.
- Cada carta mueve el precio (empieza en 50) y la paciencia (empieza en 3) según
  el tipo. Paciencia en 0: se levanta, trato perdido (`fallo`).
- Al final: precio ≥ 68 `exito`, ≥ 52 `parcial`, si no `fallo`. Se revela el tipo.
- La ayuda (atributo + bonos) sube la probabilidad de que la frase sea una pista
  clara del tipo verdadero.
- Misma firma `({ ayuda, onFin })` y mismos niveles: ninguna escena se toca.

### 5. Carrera del día y arranque rápido
- Azar sembrable: una función `azar()` del módulo sustituye a `Math.random` en el
  motor (no en los minijuegos de habilidad). Sin semilla cae en `Math.random`, así
  que las pruebas que lo secuestran siguen valiendo. **Nunca se toca el
  `Math.random` global.**
- «Jugar la del día» en la portada: país, carrera y edad salen de la fecha; el
  azar de cada año se siembra con fecha + año. Cuenta regresiva hasta medianoche
  (temporizador limpiado al desmontar).
- Tres objetivos del día de una lista; al final, ✅/❌ por objetivo.
- Lo jugado hoy se guarda en una clave nueva, `el-analista-dia`.
- Botón «🎲 Al azar» en el paso uno (Alessandro lo pidió de vuelta el 7-oct, tras
  haberlo quitado el 28-sep): sortea edad, país y carrera y arranca.

### 6. Compartir
- «Compartir mi carrera» en la pantalla final: `navigator.share` si existe; si no,
  copia al portapapeles; si tampoco, enseña el texto para copiarlo a mano.
- Texto: cargo, edad, patrimonio, apodo según el atributo más alto y, si fue la
  del día, la fila de ✅/❌. Con el link a sureconomics.com/el-analista.

## Qué no entra
Ranking del día, monedas, tienda, mercado de pases y modos nuevos. El ranking del
día necesita que SurEconomics cambie su servidor (hoy solo guarda `{n,c,e,p,m,v}`).

## Contrato con SurEconomics (INTEGRACION-SURECONOMICS.md)
Un solo archivo y un solo import (`react`); sin efectos al importar; estilos bajo
`.ea-root`; `z-index` < 100; todo temporizador u oyente se limpia al desmontar;
ninguna clave de `localStorage` renombrada; la entrada del ranking sigue mandando
`e`, `p` y `m` enteros.

## Pruebas
- `npm run sintaxis`, `npm run robustez` (27/27), `npm run cobertura`,
  `npm run finales`, `npm run puertas`.
- Nueva `pruebas/negociacion.js`: la estrategia buena contra cada tipo da éxito,
  la mala contra el orgulloso hace que se levante, siempre termina en 3 rondas.
- Nueva `pruebas/dia.js`: misma fecha, mismas decisiones → mismos eventos; fecha
  distinta → otra carrera; el `Math.random` global queda intacto.
- Partida a mano en el navegador local antes del PR.
