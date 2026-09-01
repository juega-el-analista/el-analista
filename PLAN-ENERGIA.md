# La energía tiene que pesar

Registro del rediseño de la energía, 1-sep-2026. Escrito antes de tocar código
para que la decisión quede antes que la implementación, como en
`PLAN-REGISTRO.md`.

---

## El problema, medido

La queja fue «no se entiende cómo afecta la energía». Al levantar todos los
sitios donde el código lee los atributos, resultó ser literal.

| Atributo | Lo que hacía |
|---|---|
| Criterio | 49 minijuegos, 8 tiradas, amortigua hasta 34% de pérdidas de cartera sobre 55 |
| Red | 21 minijuegos, 2 tiradas, abre el Fondo (≥55 con rango 4) |
| Modelaje | 16 minijuegos, 1 tirada |
| Reputación | 0 minijuegos, 2 tiradas, multiplica el bono, encarece el préstamo, te degrada a ≤6 |
| **Energía** | **0 minijuegos, 1 tirada** |

Y peor: **la energía era una constante**. Simulando las nueve combinaciones de
ritmo, tren de vida, gimnasio, coach y pareja, todas convergen a **exactamente
6** entre el año 6 y el 14, y ahí se quedan hasta el final.

La causa era el orden de tres líneas en el cierre de año:

```js
st.ene = clamp(st.ene - desgaste, 0, 100);            // el clamp la deja en 0
if (st.ene < 50) st.ene = clamp(st.ene + 6, 0, 100);  // el suelo la sube a 6
...
if (st.ene <= 0) { /* te quiebras */ }                // ya no puede ser <= 0
```

Dos consecuencias que nadie había visto:

1. **El burnout era código muerto.** Las cuatro quiebras que terminan la
   partida, los −3.000 USD, los −8 de reputación: imposibles de disparar desde
   el desgaste, porque el suelo actúa antes de la comprobación. La única
   condición de derrota por agotamiento del juego no existía.
2. **El aviso «Estás funcionando a media máquina» salía todos los años** desde
   el 5 hasta el 30. Veinticinco veces la misma frase. Eso no avisa: enseña a
   no leer.

El suelo plano se había puesto por una razón buena —sin él la caída era libre y
no se pasaba del año 10— pero el remedio convirtió la variable en constante.

## La decisión

De cuatro sitios posibles donde hacer doler la energía baja (rendir peor,
avanzar más lento, atraer desgracias, encoger el año), **se eligió solo
rendir peor**. Es el más legible, porque el botón del minijuego ya muestra
`te ayuda Criterio 61` antes de que decidas: el efecto se puede ver **antes**
de elegir, no deducirse después.

Y el burnout **vuelve a poder terminar la partida**. Decisión explícita de
Alessandro sobre la alternativa indulgente.

## El diseño

**1 · El suelo plano se sustituye por recuperación proporcional.**

```js
ene = crudo + round((100 - crudo) * 0.26)
```

Recuperas más cuanto peor estás, pero nunca lo suficiente para ignorarlo. El
sistema se autoestabiliza en `100 − desgaste · 2,846`, así que **el equilibrio
lo eliges tú** con el ritmo y el tren de vida, en vez de ser 6 para todos.

**2 · El burnout se comprueba antes de recuperar**, sobre el valor crudo:

```js
const crudo = st.ene - desgaste;
if (crudo <= 0) { quiebra }           // ahora sí alcanzable
else ene = crudo + round((100 - crudo) * 0.26);
```

**3 · El gradiente.** La energía ajusta la ayuda en minijuegos y la
probabilidad de las tiradas:

```js
ajusteEne = clamp(round((ene - 54) / 3), -14, +10)
```

Centrado en 54 porque ése es el equilibrio del juego normal: jugar normal es
neutro, cuidarte es una ventaja, apretar es un precio.

**4 · Se ve antes de decidir.** El botón pasa de `te ayuda Criterio 61` a
`te ayuda Criterio 61 · cansado −5`.

## Lo que sale del modelo

| Perfil | Desgaste | Equilibrio | Ajuste | Quiebras/30 |
|---|---|---|---|---|
| Tranquilo + gimnasio | 6 | 84 | **+10** | 0 |
| Tranquilo | 12 | 67 | +4 | 0 |
| Normal | 16 | 56 | +1 | 0 |
| A tope, viviendo bien | 18 | 50 | −1 | 0 |
| A tope | 22 | 39 | −5 | 0 |
| A tope y apretado | 25 | 30 | −8 | 0 |
| A tope, apretado, 2 hijos | 29 | 35 | −6 | **4 · termina en el año 19** |

El rango pasa de «6 para todos» a **de 30 a 84, y lo eliges tú**.

## Lo que hay que vigilar al implementar

- **No aplicar el ajuste dos veces.** La única tirada con `chk.s === "ene"`
  (escena 2957) ya mide la energía directamente; sumarle el ajuste sería
  contarla dos veces.
- **El aviso de media máquina** tiene que dejar de salir todos los años, o
  vuelve a ser ruido.
- **No hace falta subir `VERSION`.** `ene` ya existe en el estado y `sanear()`
  ya lo acota; una partida guardada se rehidrata sola con las reglas nuevas.
- **Las constantes son del modelo, no de la partida real.** Las escenas también
  mueven la energía. Después de implementar hay que medir con `finales` y
  `cobertura` y reajustar si hace falta.
