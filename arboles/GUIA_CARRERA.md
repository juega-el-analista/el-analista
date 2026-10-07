# Escenas propias de cada carrera

Antes, lee `arboles/GUIA.md`: el formato de las consecuencias (`luego`, `azar`, `deja`, el estilo, las reglas de texto) es el mismo. Esta guía solo explica lo que cambia.

## El problema

En El Analista eliges qué estudiaste (Economía, Contaduría, Ingeniería, Derecho, Administración o Computación), pero las 885 escenas del juego son las mismas para todos. Un programador y un abogado viven exactamente las mismas decisiones. El mundo es siempre el de las finanzas, y eso está bien: un programador que trabaja en un banco tiene sentido. Lo que falta es que **lo que estudiaste cambie lo que te pasa y cómo lo resuelves**.

Tu carrera está en `arboles/carreras_perfil.json`: su descripción, dónde trabaja, sus cuatro caminos de carrera y la firma propia que puede montar. Escribe desde ahí.

## Qué escribes: `arboles/carrera_<id>.js`

```js
module.exports = {
  carrera: "sis",
  huellas: { lN_xxx: "Frase corta, en pasado y de tú" },
  /* 6 a 8 escenas que SOLO vive quien estudió tu carrera. Son raíces: cada opción
     lleva su luego con sorteo, como las raíces de los otros lotes. */
  propias: [
    { id: 18000, min: 0, max: 3, t: "Te piden automatizar el área", x: "...", empleado: true,
      o: [
        { t: "Automatizarla entera", d: { mod: 6, red: -4, msg: "...", deja: "lN_...",
          luego: [{ en: 1, azar: [{ p: 50, id: 18010 }, { p: 50, id: 18011 }] }] } },
        { t: "Automatizar a medias y proteger al equipo", d: { ... luego: [...] } },
      ] },
  ],
  /* las consecuencias de esas raíces: mismo formato que en GUIA.md */
  escenas: [ /* ... */ ],
  /* 4 opciones nuevas, «solo tú», en escenas que ya existen y viven todos
     (arboles/escenas_compartidas.json). La misma situación, pero tu carrera
     abre una salida que los demás no tienen. Sin luego. */
  opciones: [
    { escena: 51, t: "Escribir un script que lo reconstruya", d: { mod: 8, car: 4, msg: "..." } },
  ],
  /* 1 o 2 finales con huellas tuyas */
  finales: [ { id: "lN_xxx", huellas: ["lN_..."], t: "...", x: "..." } ],
};
```

### Reglas
- `N` es el número de tu lote y fija ids y prefijos: **ids de 10000 + N·1000 a 10000 + N·1000 + 999**, huellas y finales con `lN_`.
- **Raíces propias:** 6 a 8, con `min` y `max` de cargo entre 0 (Pasante) y 6 (Socio), repartidas para que haya escenas propias en toda la carrera (alguna de 0 a 2, alguna de 2 a 4, alguna de 4 a 6). Una escena de trabajo junior no debe llegar a Socio. 2 o 3 opciones cada una, y **todas las opciones con su `luego`**.
- **Consecuencias:** como en GUIA.md, 3 a 5 de segundo nivel por raíz, compartidas entre sus opciones y repartidas distinto según la opción, y hasta 2 de tercer nivel por raíz. Unas 5 a 7 escenas por raíz.
- **Opciones «solo tú»:** exactamente 4, en 4 escenas compartidas distintas, que no tengan ya una opción `[solo ...]`. Que sea algo que de verdad solo haría alguien con tu formación, y que no sea siempre la mejor opción: tiene su coste.
- `empleado: true` en las escenas que dan por hecho que tienes jefe o trabajas para otros.
- Todo lo demás (textos sin cifras de dinero, sin rayas largas, sin nombres propios, sin género para el jugador, coherencia) como en GUIA.md.

## Antes de entregar

```
node arboles/validar_carrera.js N
```
tiene que decir `todo en verde`.
