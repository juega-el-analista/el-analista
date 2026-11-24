# El Ídolo, por dentro, y qué se trajo a El Analista

Alessandro, 11-nov-2026. Se jugó una carrera en
[potrerofutbol.ar/el-idolo](https://www.potrerofutbol.ar/el-idolo) (arquero, carrera del día,
clase «Habilidoso»: de los 16 a los 36 años) y se leyó el código del juego. No tiene repo
público: es un bundle de Vite y se leyó como texto, sin ejecutarlo. Los números de abajo salen
de ese código (versión 3.0) y de la partida.

---

## 1. Por qué funciona

1. **Una decisión por pantalla y una temporada por minuto.** Cada temporada es:
   - una carta (1 de 3);
   - quizás el mercado;
   - como mucho **un** evento con dos opciones;
   - las finales;
   - un diario.

   Una carrera entera son 20 a 25 temporadas y se termina de una sentada.
2. **Siempre hay un número que está por subir de nivel.** La idolatría se ve en la cabecera
   así: «QUERIDO 29/100 → REFERENTE 50». Es el motor de «una más».
3. **El azar y la habilidad, a gusto del jugador.** Antes de empezar eliges si las finales se
   juegan con suerte (Cabulero), con minijuegos (Habilidoso) o mezcladas (Mixto). Nadie queda
   afuera.
4. **Los minijuegos pesan porque son pocos.** Solo aparecen en las finales y deciden el título.
   No sirven para pasar el rato entre escena y escena.
5. **Una cifra para compararse.** La Gloria y el ranking diario: la carrera del día es la
   misma semilla para todos.
6. **La plata no suma.** Se gasta en ventajas (staff, consumibles, lujos), pero lo que cuenta
   es lo que dejaste.
7. **Momentos grandes a pantalla completa:** el Golden Boy, el Lev Yashin, el «¡Campeón del
   mundo!». En la partida, Paraguay ganó dos Mundiales seguidos y cada uno se sintió.

## 2. Minijuegos: 39, más 2 pantallas interactivas

- **Cabulero, 10:**
  - tanda de penales;
  - mano a mano;
  - cabezazo;
  - achique;
  - fierrazo;
  - ruleta;
  - Pálpito (mayor o menor);
  - Pelota Loca (Galton);
  - tiro libre;
  - los botines del utilero (Monty Hall).
- **Habilidoso, 8:**
  - pizarra del DT (memotest);
  - corrida (frenar la barra);
  - ta-te-ti 5×5;
  - alcanzapelotas (trile);
  - jugada personal (esquivar en 3 carriles);
  - el código (memorizar dígitos);
  - minuto 90;
  - achique.
- **Arquero, 8 propios:**
  - Paso Adelante;
  - Cábala;
  - Volada;
  - Tapones;
  - Desvío;
  - Vuelo;
  - Marca (memorizar el orden de peligro);
  - Salida Jugando (trazar sin levantar el dedo).
- **Torneos, 12:**
  - Mundial: grilla, Torre, la seña del DT tipo Simón, la definición al límite (barra), la
    atajada al nueve y el Hueco.
  - Intercontinental: 3.
  - Juveniles: 3, entre ellos «la salida bajo presión», 8 pases seguidos y 2 intentos.
- **De práctica:** Tres Palos y El aguante.
- **Interactivas:** el compilado del Puskás (elegir 3 clips de 6) y la rueda de prensa
  (3 preguntas y 4 tonos).

Nunca se repite el de la final anterior. La dificultad sube en las finales de prestigio, y los
atributos dan pistas: con más Reflejos, el amague del 9 «te dice» mejor adónde va.

## 3. Consumibles y tienda: 22 artículos más las cartas

| Tipo | Cuántos | Ejemplos |
|---|---|---|
| Lujos (permanentes) | 8 | auto 500k (+3 fama), yate (+1 oferta), jet (doradas ×1,5), el potrero de tu barrio (+15% de idolatría) |
| Staff (permanente) | 5 | cocinero 8M, kinesiólogo 11M, psicólogo 9M, preparador 14M, representante 12M (+12% de sueldo) |
| Consumibles | 9 | botines (goles ×1,18), cábala, marketing, asesor de prensa, publicidad y entrenamiento por anuncio |

**Cartas de pretemporada:** son unas 1.279. **Solo la carta estrella** tira rareza:

| Rareza | Probabilidad |
|---|---|
| Icónica | 1,5%, desde los 20 años |
| Dorada | 6% |
| Rara | 25% |

Con un anuncio puedes cambiar las tres cartas por mejores cada 2 temporadas.

## 4. Cómo se gana

No se pierde: la carrera se mide en **Gloria**.

### La fórmula

```
gloria ≈ factor de puesto × (idolatría máxima × 2000
         + 50.000 si llegaste a Leyenda
         + títulos × valor × tamaño del club (hasta ×5,5 con un club chico)
         + Balones de Oro × 70.000 + goles, asistencias…)
```

- La plata no suma.
- La idolatría se mide por club y tiene cinco niveles: Uno más 0, Querido 25, Referente 50,
  Ídolo 75 y Leyenda 95.

### Qué mueve la idolatría

| Qué pasa | Efecto |
|---|---|
| Quedarte un año más | +1,35 |
| Ganar un título | +6 a +10 |
| Irte del club | −8 |
| Irte del club antes de tiempo | −12 |
| Irte al rival | −30 |

- Sin un título con ese club, no pasa de **80**.
- Por encima de 85, lo que sumas se multiplica por 0,15.

## 5. Tiempo, decisiones y minijuegos

- **El tiempo** es la temporada. La curva de edad empuja:
  - creces hasta los 29 (31 el arquero);
  - después bajas;
  - el retiro es probable desde los 37 y forzado a los 41/42.
- **Las decisiones** son 467 eventos («Pasan cosas», «Decisión difícil», «Golpe duro»):
  - como mucho uno por temporada;
  - no se repiten;
  - tocan forma, fama, idolatría, titularidad, lesiones y plata.
  - Hay unos 50 *flags* con consecuencias diferidas: la promesa de gol en el clásico, el
    traidor, el doping…
- **El mercado** te pone ofertas con cláusulas y la pregunta «¿gloria o billetera?». Irte a un
  grande paga más, pero te hace jugar menos y perder idolatría.
- **Los minijuegos** solo deciden las finales. Ganarlas da el título, y el título lo mueve todo.

## 6. Cómo se desarrolla

| Etapa | Qué pasó en la partida |
|---|---|
| 16–18 años | Suplente, Mundial Sub-17 (final perdida), una amenaza con consecuencia diferida |
| 20 | Campeón de liga y **Golden Boy** |
| 22–24 | Referente en el club, convocado, **Paraguay campeón del mundo** |
| 28 | **Bicampeón del mundo** y **Trofeo Lev Yashin** |
| 29–32 | Pase a Grêmio (Brasil), Copa do Brasil, rueda de prensa, Puskás |
| 34–36 | Media 99, **Ídolo 89/100 → Leyenda 95**, Guante de Oro, declive de Reflejos |

---

## 7. Qué se trajo a El Analista (rama `ale/como-el-idolo`)

El Analista ya tenía mucho de El Ídolo: la carta de inicio de etapa con rareza, el contrato
como fichaje, las galas y la carrera del día. Faltaban cuatro piezas.

### 7.1 Tu arranque: clase y arquetipo

La partida nueva abre con dos escenas, por fuera del presupuesto de la etapa: la 9791 (clase)
y la 9792 (arquetipo). En la primera etapa el arquetipo reemplaza a la carta de inicio, como la
cuna de El Ídolo.

**La clase**

| Clase | Cómo se resuelven los minijuegos |
|---|---|
| Intuitivo | A olfato. La ayuda del minijuego (atributo, carrera, boosts) y el amuleto inclinan la moneda. |
| Mixto | La mitad de las veces. |
| Técnico | Siempre se juegan, como hasta ahora. |

- La clase, el examen y la negociación nunca van a olfato: son el temario y la mesa.
- Un guardado sin clase juega como Técnico.

**El arquetipo:** el dado trae 3 de 9, con un 1% de que aparezca El Prodigio (+10 a todo).
Depende de la semilla, así que en la del día todos ven los mismos.

### 7.2 El legado (la idolatría)

Va de 0 a 100 y se ve en la placa: «Conocido 31/100 → Referente 50».

**Niveles:** Uno más, Conocido, Referente, Eminencia y Leyenda.

| Qué pasa | Efecto |
|---|---|
| Un año más en la misma firma | +0,9 |
| Reputación por encima de 60 | algo más cada año |
| Ascenso | +6 |
| Reconocimiento nacional | +8 |
| Reconocimiento mundial | +14 |
| Montar tu firma | +8 |
| Cambiar de firma | −8 |
| Irte pronto de la primera firma (antes de 4 años) | −12 |
| Despido | −8 |
| Agotamiento | −5 |

- Sin un reconocimiento, tu firma o llegar a Socio, no pasa de 80.
- Por encima de 85, lo que sumas se multiplica por 0,15.
- El resumen de cada etapa dice cuánto se movió y avisa cuando subes de nivel.

### 7.3 La Gloria

Es una cifra al final de la partida, con su desglose:

| Pieza | Cuánto suma |
|---|---|
| Legado máximo | × 2.000 |
| Llegar a Leyenda | +50.000 |
| Reconocimiento nacional | 25.000 |
| Reconocimiento mundial | 60.000 |
| Cargo | 8.000 por nivel |
| Firma propia | 30.000 |
| Libertad financiera | cobertura × 30.000, tope ×2 |
| Minijuegos ganados | 300 cada uno |

- La plata en sí no suma.
- Hay un multiplicador si empezaste tarde: ×1,15 a los 30, ×1,35 a los 40 y ×1,6 a los 50.
- **El ranking no cambió:** sigue ordenando por patrimonio (`p`). Ordenarlo por gloria hay que
  hablarlo con Ramón, porque el servidor de SurEconomics valida los campos.

### 7.4 Las cartas con las rarezas de El Ídolo

Solo la carta estrella tira rareza; las otras dos pueden salir raras (20%).

| Rareza | Probabilidad | Qué da |
|---|---|---|
| Icónica | 1,5%, desde la 2.ª etapa | +30 y +14 a un segundo atributo |
| Dorada | 6% | +30 |
| Rara | 25% | +16 |

### 7.5 Arreglos de paso

1. **Las decisiones clave (D) no salían nunca.** `turno` avanza de 2 en 2 y `t % 2 === 1` nunca
   daba verdadero. Ahora salen una etapa sí y otra no.
2. **Tres sustos tenían el id de tres oportunidades** (9850-9852). Ver uno marcaba la otra como
   vista para siempre. Los sustos pasaron a 9856-9858.
3. **La decisión de tu empresa y los sustos se caían de la cola al recargar.** Ahora `sanear`
   los acepta.
4. **El patrimonio final y el del ranking no contaban tu parte de la empresa.** El encabezado
   de cada etapa sí la contaba; ahora los tres coinciden.

### 7.6 Lo que no se trajo, a propósito

- **Minijuegos solo en momentos de alto riesgo.** El equipo decidió el 10-nov que salgan más
  juegos para que el jugador no se aburra. Con la clase, el que se aburre elige Intuitivo.
- **Anuncios y monedas.** No hay modelo de anuncios en SurEconomics.
- **Un evento por etapa.** Las tres escenas por etapa fueron una decisión del 9-nov.
