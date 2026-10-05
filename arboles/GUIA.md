# Cómo escribir un lote de árboles para El Analista

El Analista es un juego en español de carrera y finanzas: empiezas de pasante, decides año a año, y al final ves quién fuiste y cuánto dinero tienes. Hasta ahora casi todas las decisiones solo movían números y no tenían consecuencias. Tu trabajo: darle **futuro** a cada decisión de tu lote.

## La idea (la dibujó el diseñador)

Eliges una opción y en ese momento pasa lo que ya pasaba. Uno, dos o tres años después te llega UNA escena sorteada entre varias posibles, cada una con su probabilidad. Esa escena es otra decisión, y algunas de sus opciones vuelven a sortear lo que viene.

```
Tu primo te pide un préstamo
 a) Prestar, familia es familia ──┬─ 35% Tu primo está pagando tarde ──┬ Reclamarle → 50% te paga pero no te habla / 30% se pone al día / 20% no tiene nada
                                   ├─ 20% Tu primo desapareció          ├ Dejarlo pasar → ...
                                   ├─ 30% Te paga a tiempo               └ Ofrecerle más plazo → ...
                                   └─ 15% Le va de maravilla
 b) Prestar con contrato ─────────┬─ 55% Las cuotas llegan / 30% se retrasa / 15% no paga
 c) No prestar ───────────────────┴─ ...
```

Lo importante: **opciones distintas reparten distinto entre escenarios parecidos.** Prestar con contrato hace más probable que te paguen; prestar sin papeles, que te estafen. Eso es lo que hace que decidir importe.

## Qué te toca

`loteN_escenas.json` trae tus raíces: las escenas que ya existen en el juego, con sus opciones. **No las reescribes.** Para cada opción de cada raíz defines qué puede pasar después.

Tamaño por raíz, para que siga siendo un juego simple:
- **3 a 5 escenas de segundo nivel por raíz**, compartidas entre sus opciones (cada opción las reparte con sus porcentajes; una opción puede usar solo 2 o 3 de ellas).
- **Tercer nivel solo donde valga la pena**: como mucho 2 escenas de tercer nivel por raíz. Las de tercer nivel son hojas: no llevan `luego`.
- En total, unas **5 a 7 escenas por raíz**.

## El archivo que escribes: `loteN.js`

```js
module.exports = {
  /* marcas permanentes de lo que hiciste. Prefijo obligatorio: lN_ */
  huellas: {
    l9_prestaste: "Le prestaste a tu primo sin papeles",
  },
  /* las escenas nuevas (segundo y tercer nivel). Ids en tu rango. */
  escenas: [
    { id: 19001, por: "Le prestaste a tu primo sin papeles", t: "Tu primo está pagando tarde",
      x: "Lleva tres meses sin pagarte. Dice que el local todavía no despega.",
      o: [
        { t: "Reclamarle con firmeza", d: { red: -3, msg: "Lo llamas y se lo dices claro. Del otro lado, un silencio largo.",
          luego: [{ en: 1, azar: [{ p: 50, id: 19010 }, { p: 30, id: 19011 }, { p: 20, id: 19012 }] }] } },
        { t: "Dejarlo pasar: familia es familia", d: { ene: 2, red: 2, msg: "No le dices nada. Que pague cuando pueda." } },
      ] },
    /* ... */
  ],
  /* para cada raíz de tu lote, y cada opción (por su índice), qué puede venir */
  raices: {
    "7330": {
      "0": { deja: "l9_prestaste", luego: [{ en: 1, azar: [{ p: 35, id: 19001 }, { p: 20, id: 19002 }, { p: 30, id: 19003 }, { p: 15, id: 19004 }] }] },
      "1": { luego: [{ en: 1, s: "cri", azar: [{ p: 55, id: 19005, bueno: true }, { p: 30, id: 19006 }, { p: 15, id: 19007, bueno: false }] }] },
    },
    /* si la opción es un «chequeo de suerte», puedes separar lo que viene si salió bien y si salió mal: */
    "8": { "1": { ok: { luego: [ ... ] }, no: { deja: "...", luego: [ ... ] } } },
  },
  /* 2 o 3 finales nuevos: el final de la partida que te toca si tienes estas huellas */
  finales: [
    { id: "l9_familia", huellas: ["l9_prestaste"], t: "Familia es familia", x: "Le prestaste a tu primo sin papeles..." },
  ],
};
```

### Reglas del formato (el validador las comprueba todas)
- `luego: [{ en, azar, s? }]`. `en` es 1, 2 o 3 años. `azar` trae **2 a 4** escenarios `{ p, id, bueno? }` y los `p` **suman 100**. `s` (opcional) es un atributo que inclina la balanza: con él alto, los escenarios marcados `bueno: true` pesan más y los `bueno: false` menos.
- Cada escena: `id`, `por` (de qué decisión viene, ≤ 55 caracteres, en pasado y segunda persona: «Le prestaste a tu primo sin papeles»), `t` (título ≤ 48), `x` (situación ≤ 160), `o` (2 o 3 opciones), y `empleado: true` si la escena da por hecho que tienes jefe o trabajas en una firma ajena (el juego no la mostrará a quien tenga firma propia).
- Cada opción: `t` (≤ 60) y `d` con lo que pasa: atributos `mod` (modelaje), `cri` (criterio), `red` (contactos), `rep` (reputación), `ene` (energía), `car` (carrera), entre -15 y 15; `cash` (dinero, entre -12000 y 40000, valores base: el juego los multiplica por el cargo); `msg` (lo que pasó, ≤ 130); opcionales `deja` (una huella tuya) y `luego`.
- Ids de escenas en tu rango: **lote N → de 10000 + N·1000 a 10000 + N·1000 + 999**. Huellas y finales con prefijo `lN_`.
- Toda escena tiene que estar llamada por algún sorteo.

### Reglas de escritura
- Español neutro, de tú. Frases cortas y concretas, con algo de ironía seca, como el resto del juego. Mira el ejemplo de arriba: así suena.
- **Nada de cifras de dinero en el texto** («5.000», «USD», «mil dólares»): el dinero se escala con el cargo y el texto quedaría mintiendo. Habla de «el doble», «la mitad», «un mes de sueldo».
- Sin rayas largas (— –). Sin jerga sin explicar. Sin nombres propios de personas (di «tu primo», «la socia», «tu jefe»).
- **Coherencia, que es lo que más importa**: la escena siguiente tiene que tener sentido pase lo que pase en la raíz. Si la raíz es un chequeo que puede salir bien o mal, o separas `ok`/`no`, o escribes el futuro de forma que valga para los dos. Si la raíz es de vida (pareja, hijos, padres), el futuro es de esa misma vida; no inventes que te casas, te divorcias o tienes hijos (el juego controla esos estados por su cuenta).
- Que los escenarios sean de verdad distintos entre sí (no tres versiones de «salió bien»), con buenos, regulares y malos, y que el mejor no siempre sea el más probable.
- Las cantidades de `d` en proporción: una escena cotidiana mueve poco (cash ±500 a ±3000, atributos ±2 a ±6); una decisión grande puede mover más.

## Antes de entregar

```
node validar_lote.js N
```
tiene que decir `todo en verde`. Corrígelo hasta que lo diga. Luego relee tus textos una vez buscando incoherencias con la raíz.
