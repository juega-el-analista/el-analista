# Gran actualización — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pretemporada y mejoras desde el año 1, fallos que cuestan, cartera de dos decisiones, negociación con cartas en lugar de la barra, carrera del día con «Al azar», y compartir el resultado.

**Architecture:** Todo vive en `src/el-analista.jsx` (contrato con SurEconomics: un archivo, un import). Las piezas nuevas son funciones puras de módulo (exportables a las pruebas por el truco de `subasta.js`: reescribir `module.exports` de `pruebas/compilado.js`) más cambios acotados dentro de `Motor()`. `index.html` se regenera con `npm run build`, nunca a mano.

**Tech Stack:** React 18 (un solo import), Babel para las pruebas, `react-test-renderer`, Node.

**Spec:** `docs/superpowers/specs/2026-10-07-gran-actualizacion-design.md`

## Global Constraints

- Único import: `import React, { ... } from "react";`. Mantener `export default function ElAnalista()`.
- Nada de efectos a nivel de módulo; nunca reasignar el `Math.random` global.
- Estilos nuevos bajo `.ea-root`; `z-index` < 100.
- Todo `setInterval`/`setTimeout`/oyente nuevo se limpia en el `return` de su `useEffect`.
- No renombrar claves de `localStorage`; la nueva es `el-analista-dia`.
- Ningún campo nuevo de la partida sin su línea en `sanear()`.
- Ids de escena nuevos: pretemporada `9790`.
- Antes de cada commit: `npm run sintaxis`; antes del PR además `robustez` (27/27), `cobertura`, `finales`, `puertas`, y las dos pruebas nuevas.
- Textos en español neutro-rioplatense del juego (tú), frases cortas.

---

### Task 1: Azar sembrable

**Files:**
- Modify: `src/el-analista.jsx` (junto a `indiceAzar`, ~l.1007; `tirarAzar` ~l.47769; `generarAno`, `elegir`, `comprarBien`, cierre del año dentro de `Motor`)
- Test: `pruebas/dia.js` (se crea aquí con la parte de azar; Task 6 la amplía)

**Interfaces:**
- Produces: `azar(): number` en [0,1); `sembrarAzar(semilla: string|number): void`; `soltarAzar(): void`; `hashTexto(s: string): number` (uint32).

- [ ] Escribir `pruebas/dia.js` que cargue el compilado exportando `{ azar, sembrarAzar, soltarAzar, hashTexto }` y compruebe: misma semilla → misma secuencia de 20 tiradas; semilla distinta → secuencia distinta; tras `soltarAzar()` `azar()` vuelve a `Math.random` (secuestrar `Math.random = () => 0.123` y ver 0.123); `Math.random` no queda reasignado por sembrar.
- [ ] Correr `node pruebas/dia.js` → falla (no existe `azar`).
- [ ] Implementar, antes de `indiceAzar`:

```js
/* El azar del motor. Sin semilla es Math.random de siempre (las pruebas
   que lo secuestran siguen valiendo); con semilla, la carrera del día
   sale igual para todos. Nunca se toca el Math.random global: el juego
   vive dentro de SurEconomics. */
let azarSembrado = null;
const hashTexto = (s) => {
  let h = 2166136261 >>> 0;
  const t = String(s);
  for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
};
const sembrarAzar = (semilla) => {
  let a = hashTexto(semilla) || 1;
  azarSembrado = () => {   /* mulberry32 */
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const soltarAzar = () => { azarSembrado = null; };
const azar = () => (azarSembrado ? azarSembrado() : Math.random());
```

- [ ] Sustituir `Math.random()` por `azar()` en `indiceAzar`, `tirarAzar` y en las tiradas del motor (`generarAno`, `elegir` → `o.chk`, `comprarBien`, el cierre del año: retornos y noticias). Los componentes `Juego*` se quedan con `Math.random`.
- [ ] En `ElAnalista`/`Motor`: `useEffect(() => () => soltarAzar(), [])`.
- [ ] `node pruebas/dia.js` y `npm run sintaxis` en verde; `npm run robustez` 27/27.
- [ ] Commit: «El azar del motor se puede sembrar, sin tocar el Math.random de la página».

### Task 2: Pretemporada y mejoras desde el primer año

**Files:**
- Modify: `src/el-analista.jsx`: `PERKS` (~l.1619), `APERTURAS` entrada `mejoras` (~l.47633, se mueve a la primera posición), `escenaDeId`/`IDS_ESCENA_VALIDOS` (~l.47886), `sanear` (`semilla`), `generarAno` (al final), `arrancarPartida` (`st.semilla`), efectos de mejoras en el cierre (~l.52764).
- Test: `pruebas/pretemporada.js`

**Interfaces:**
- Consumes: `hashTexto` (Task 1).
- Produces: `escenaPretemporada(st): escena` con `id: 9790`, `pretemporada: true`, tres opciones `{ t, d: { <atrib>: n, msg } }`; `CARTAS_PRE` (tabla); `st.semilla` entero.

- [ ] Prueba: con `st = { turno: 3, semilla: 77 }` la escena trae 3 opciones, cada una con exactamente un atributo de `["ene","cri","mod","red","rep"]` y valor en {2,3,4}; mismo `st` → mismas cartas; otro turno → otras; en 2000 años sorteados las doradas (+4) rondan el 5% (entre 3% y 7%). `escenaDeId(9790, st)` devuelve la escena; `IDS_ESCENA_VALIDOS` incluye 9790. `APERTURAS[0].id === "mejoras"` con `rango: 1, ano: 0`. `PERKS` tiene `excel`, `diario`, `after`, `zapas` con coste ≤ 800.
- [ ] Correr → falla.
- [ ] Implementar `CARTAS_PRE` (al menos 4 títulos por atributo, uno o dos de ellos «dorados»), `escenaPretemporada` con un generador propio sembrado por `hashTexto("pre:" + st.semilla + ":" + st.turno)` (no usa `azar()`, para que una recarga la rehaga igual). Rareza: <0,05 dorada (+4), <0,30 rara (+3), resto común (+2). El texto de la opción lleva la rareza delante en mayúsculas cuando no es común: `"DORADA · Café con el director"`. `msg` corto: `"Pretemporada: +4 de red."`.
- [ ] `generarAno`: justo antes de `return lista;` → `lista.unshift(escenaPretemporada(st));` (fuera del presupuesto).
- [ ] `escenaDeId`: `if (id === 9790) { try { return escenaPretemporada(st); } catch (e) { return null; } }`; `IDS_ESCENA_VALIDOS` concatena `9790`.
- [ ] `arrancarPartida`: `st.semilla = Math.floor(azar() * 1e9);`. `sanear`: `st.semilla = entero(r.semilla, 0, 0, 2e9);`.
- [ ] `APERTURAS`: la entrada `mejoras` pasa a ser la primera, `rango: 1, ano: 0`, escena 9705 reescrita para un primer sueldo («Tu primera inversión en ti»).
- [ ] `PERKS` nuevos al principio: `excel` (400, +1 mod/año), `diario` (500, +1 cri/año), `zapas` (600, +2 ene/año), `after` (800, +1 red/año). Efectos en el cierre junto a `research`.
- [ ] `node pruebas/pretemporada.js`, `sintaxis`, `robustez` en verde.
- [ ] Commit: «Cada año empieza con una pretemporada y las mejoras se abren el primer año».

### Task 3: Fallar duele

**Files:**
- Modify: `src/el-analista.jsx`: `escalar` (~l.47293), `finJuego` (~l.53213).
- Test: `pruebas/fallo.js`

**Interfaces:**
- Produces: `escalar(d, "fallo")` → positivos ×0, negativos ×1,6, y `rep` −2 adicional; `msgFallo(op): string`.

- [ ] Prueba: `escalar({ cri: 4, cash: 1000, ene: -3, msg: "Bien" }, "fallo")` → `cri` 0 (o ausente), `cash` 0, `ene` −5, `rep` −2; `"exito"` y `"parcial"` sin cambios respecto a hoy. `msgFallo({ t: "Revisar los ajustes uno por uno" })` empieza por «No salió».
- [ ] Correr → falla.
- [ ] `escalar`: `const f = nivel === "exito" ? 1.6 : nivel === "parcial" ? 1 : 0;` y tras el bucle `if (nivel === "fallo") out.rep = (out.rep || 0) - 2;`. Las claves a 0 se borran (`delete out[k]`) para que no salgan «+0» en el resultado.
- [ ] `finJuego`: si `nivel === "fallo"` y no hay `op.res`, `base.msg = msgFallo(op)`, con `msgFallo = (op) => "No salió como querías. «" + texto(op && op.t, "La jugada", 80) + "» se te fue de las manos y se notó."`.
- [ ] Pruebas nuevas, `sintaxis`, `robustez`, `finales` en verde.
- [ ] Commit: «Un minijuego fallido ya no suma ni te felicita».

### Task 4: Cartera de dos decisiones

**Files:**
- Modify: `src/el-analista.jsx`: `PanelCartera` (~l.51552), la guía `cartera` (APERTURAS y GUIA), el estado `carteraPend` del motor.
- Test: `pruebas/cartera.js`

**Interfaces:**
- Consumes: `PERFILES`, `onAplicar(w, obj)` existente.
- Produces: `PERFILES_SIMPLES = [{ id:"conservador", e:"🛡️", n:"Prudente", d }, { id:"balanceado", e:"⚖️", n:"Equilibrado", d }, { id:"indexado", e:"🚀", n:"Agresivo", d }]`.

- [ ] Prueba (render con `react-test-renderer`): sin abrir nada se ven 5 botones de porcentaje y 3 perfiles; no aparece «beta» ni «Retorno por unidad de riesgo»; pulsar «50%» llama a `onAplicar` una vez con `obj = 0.5` y los pesos actuales; pulsar «⚖️ Equilibrado» llama a `onAplicar` con los pesos de `balanceado`; pulsar «Modo experto» muestra los 7 sliders. `onPendiente` nunca recibe `true` desde la vista simple.
- [ ] Correr → falla.
- [ ] Reescribir la parte superior de `PanelCartera`: cabecera con la barra actual y «En la cartera / En efectivo»; fila «¿Cuánto inviertes?» con botones 0/25/50/75/100 que aplican al toque (`onAplicar(actual, p/100)`); tres tarjetas de `PERFILES_SIMPLES` con una línea cada una que aplican al toque (`onAplicar(perfil.w, objAct)`); una línea de resultado («Esperas ganar X% al año · un año malo Y%»). Todo lo demás (slider de objetivo, cinco perfiles, siete activos, detalle del riesgo, avisos y el bloque SIN APLICAR) va dentro de `{experto && (...)}` con el botón «Modo experto». Solo el modo experto puede dejar cambios pendientes.
- [ ] Actualizar los textos de guía de la cartera para que describan la vista simple.
- [ ] `node pruebas/cartera.js`, `sintaxis`, `robustez`, `cobertura` (actualizar marcadores de cartera si alguno cambia de texto).
- [ ] Commit: «La cartera se decide con dos toques; lo técnico pasa a modo experto».

### Task 5: La negociación

**Files:**
- Modify: `src/el-analista.jsx`: `JuegoAnclaje` (~l.48682) se reescribe; `JUEGOS.anclaje` (~l.779); el bono `club` en `ayudaDe` sigue valiendo.
- Modify: `pruebas/cobertura.js:104` (marcador «0 · lo regalas» → «Era un comprador»).
- Create: `pruebas/negociacion.js`; script `"negociacion"` en `package.json`.

**Interfaces:**
- Produces (funciones puras de módulo):
  - `TIPOS_NEG = ["apurado", "duro", "orgulloso"]`
  - `casoNegociacion(ayuda) → { tipo, precio: 50, paciencia: 3, ronda: 1, usada: false, claridad }`
  - `jugadaNegociacion(caso, carta, ruido = 0) → caso'` con `carta ∈ "pedir" | "ceder" | "competencia" | "plantarse"`
  - `nivelNegociacion(caso) → "exito" | "parcial" | "fallo"`
  - `fraseRival(caso, rnd) → string`
- `JuegoAnclaje({ ayuda, onFin })` con la misma firma.

Tabla de efectos (Δprecio, Δpaciencia):

| carta | apurado | duro | orgulloso |
|---|---|---|---|
| pedir | +12, −1 | +6, −1 | +10, −2 |
| ceder | −6, 0 | −4, +1 | −4, +2 |
| competencia (1 vez) | +15, 0 | +4, −2 | +12, −1 |
| plantarse | +8, −1 | +10, 0 | 0, −2 |

Paciencia tope 5. Si llega a 0 → se levanta (fallo). Tras la tercera jugada, acuerdo al precio. `exito` ≥ 68, `parcial` ≥ 52.

- [ ] Prueba: estrategia buena → éxito en los tres tipos (apurado: competencia, pedir, plantarse; duro: plantarse, plantarse, pedir; orgulloso: ceder, pedir, competencia); estrategia de duro contra orgulloso → se levanta; `competencia` dos veces no suma la segunda; 300 partidas al azar terminan en ≤ 3 jugadas con un nivel válido; con `ayuda` 100 la frase del rival es del tipo verdadero en > 85% de 500 tiradas y con `ayuda` 0 en < 60%. Montando `JuegoAnclaje` y pulsando la estrategia buena, `onFin` recibe `"exito"` y la pantalla dice «Era un comprador».
- [ ] Correr → falla.
- [ ] Implementar las funciones puras, las frases (al menos 3 claras por tipo y 3 neutras) y el componente: cabecera «Ronda N de 3 · Paciencia ●●●», precio grande, la frase del rival en cursiva, cuatro botones de carta (competencia deshabilitada tras usarla), historial corto, y al terminar el bloque de revelado («Era un comprador APURADO: quería cerrar ya») con «Continuar» que llama a `onFin(nivel)`. Ruido ±2 al precio con `Math.random`.
- [ ] `JUEGOS.anclaje`: `n: "La negociación"`, `i`, `pasos`, `gana`, `ensena` nuevos.
- [ ] Pruebas, `sintaxis`, `robustez`, `cobertura` en verde.
- [ ] Commit: «La barra se convierte en una negociación contra alguien que tienes que leer».

### Task 6: Carrera del día y «Al azar»

**Files:**
- Modify: `src/el-analista.jsx`: constantes nuevas cerca de `CLAVE`; `sanear` (`dia`, `objDia`, `ganados`); `arrancarPartida` acepta `sel.dia`; `arrancarAno` siembra; `finJuego` cuenta `ganados`; portada (botón y cuenta regresiva); paso «identidad» (botón «🎲 Al azar»); pantalla `fin` (objetivos ✅/❌ y guardado en `el-analista-dia`).
- Modify: `pruebas/dia.js` (se amplía).

**Interfaces:**
- Consumes: `sembrarAzar`, `hashTexto` (Task 1).
- Produces: `CLAVE_DIA = "el-analista-dia"`; `fechaHoy(): "AAAA-MM-DD"` (hora local); `eleccionDelDia(fecha) → { edad, pais, estudio }`; `OBJETIVOS_DIA = [{ id, t, ok(st, pat) }]`; `objetivosDelDia(fecha) → ids[3]`; `msHastaManana(): number`; `st.dia` (string|null), `st.objDia` (ids), `st.ganados` (entero).

- [ ] Ampliar `pruebas/dia.js`: `eleccionDelDia("2026-10-07")` igual en dos llamadas y distinta de `"2026-10-08"` en al menos un campo para la mayoría de 30 fechas; los valores existen en `EDADES`, `NACIONES`, `CARRERAS`; `objetivosDelDia` da 3 ids distintos y válidos; montar el juego, aceptar aviso, pulsar «Jugar la del día» dos veces (dos montajes) con las mismas decisiones (siempre la primera opción) → mismos títulos de escena durante 3 años; `sanear` conserva `dia`, `objDia`, `ganados`.
- [ ] Correr → falla.
- [ ] Implementar helpers; `OBJETIVOS_DIA` con al menos 8 entradas (llegar a Vicepresidente, a Asociado, patrimonio ≥ 100k / 300k, terminar sin deuda, ganar 5 minijuegos, un reconocimiento, independencia ≥ 50%).
- [ ] `arrancarPartida(sel)`: si `sel.dia`, `st.dia = sel.dia; st.objDia = objetivosDelDia(sel.dia)`. `arrancarAno(st)`: `if (st.dia) sembrarAzar(st.dia + ":" + st.turno); else soltarAzar();` antes de `generarAno`. Y `st.semilla` de la del día sale de `hashTexto(sel.dia)` para que la pretemporada también coincida.
- [ ] `finJuego`: si `nivel === "exito"`, `ganados + 1` en el estado resultante.
- [ ] Portada: tarjeta «Carrera del día» con país, carrera y edad de hoy, botón **«Jugar la del día»** (`arrancarPartida({ ...SETUP0, ...eleccionDelDia(fechaHoy()), dia: fechaHoy() })`), los tres objetivos y «Cambia en HH:MM:SS» con un `setInterval` de 1 s limpiado al desmontar. Si `el-analista-dia` dice que hoy ya se jugó: muestra el resultado (✅/❌) y permite volver a jugar.
- [ ] Identidad: botón «🎲 Al azar» → `arrancarPartida({ ...elec, edad, pais, estudio sorteados })`.
- [ ] Fin: si `s.dia`, bloque con los tres objetivos ✅/❌ y guardado `{ fecha, hechos: [bool,bool,bool], p }` en `el-analista-dia` (try/catch).
- [ ] Pruebas, `sintaxis`, `robustez`, `puertas` en verde.
- [ ] Commit: «Carrera del día para todos y vuelve el botón Al azar».

### Task 7: Compartir

**Files:**
- Modify: `src/el-analista.jsx`: pantalla `fin` (junto a `BotonAnotar`); función `apodoDe(st)` y `textoCompartir(st, pat, hechos)`; componente `BotonCompartir`.
- Test: `pruebas/compartir.js`

**Interfaces:**
- Consumes: `cargoDe`, `edad`, `fmt`, `OBJETIVOS_DIA`.
- Produces: `apodoDe(st) → string`; `textoCompartir(st, patrimonio, hechos|null) → string`; `<BotonCompartir texto={...} />`.

- [ ] Prueba: `textoCompartir` incluye cargo, edad, «USD», el apodo y `sureconomics.com/el-analista`; con `hechos = [true,false,true]` incluye «✅❌✅»; sin `hechos` no hay emojis de objetivo. `BotonCompartir` con `navigator.share` falso lo llama con `{ text }`; sin `share` pero con `clipboard.writeText` lo usa y muestra «Copiado»; sin ninguno muestra un `textarea` con el texto.
- [ ] Correr → falla.
- [ ] Implementar. Apodos por atributo más alto: mod «La planilla perfecta», cri «Ojo para la crisis», red «Agenda infinita», rep «Palabra de oro», ene «Motor inagotable»; con firma propia se antepone «Dueño de su firma ·» solo si `genero` es masculino, «Dueña de su firma ·» si femenino, «Con firma propia ·» si no hay género.
- [ ] Pruebas, `sintaxis`, `robustez` en verde.
- [ ] Commit: «Al terminar puedes compartir tu carrera».

### Task 8: Cierre

- [ ] Traer lo último de `origin/saul/carreras` (`git merge`), resolver si hace falta.
- [ ] `npm run build` (regenera `index.html`), `npm run sintaxis`, `robustez`, `cobertura`, `finales`, `puertas`, `alcance`, y las pruebas nuevas.
- [ ] Revisar la lista del contrato (INTEGRACION-SURECONOMICS.md §4).
- [ ] Jugar en `npm run servir`: carrera del día de punta a punta, una negociación, la cartera simple, compartir.
- [ ] Commit del build, push de `ale/gran-actualizacion`, PR a `main` con el resumen y la lista del contrato.
