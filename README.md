# El Analista

Simulador de carrera e inversión. Treinta años, un año por turno, desde la edad
que elijas. Cada año trae decisiones, noticias que sacuden el mercado, una
cartera que repartes tú y un examen que se pone más difícil a medida que
estudias. Al final decides si te retiras.

El juego entero es **un solo archivo JSX** que se empaqueta en **un HTML
autónomo**: React va dentro, no pide red y no necesita servidor.

## Qué hay dentro

| | |
|---|---|
| Minijuegos | 20 |
| Preguntas | 262, con explicación disponible en el 73% |
| Temas de la Cátedra | 34, de fundamentos a mesa de socios |
| Glosario | 38 términos en lenguaje llano |
| Escenas de carrera | 75 |
| Escenas de vida | 23 — parejas, hijos, divorcios, duelos, estafas |
| Negocios del fondo | 22, con las cinco señales que los definen |

Modos: **Aprendiz** (cada término se explica antes de usarse) y **Analista**.
Puedes empezar a los 20, 30, 40 o 50.

## Si vas a tocar el código

Lee **[CONTRIBUIR.md](CONTRIBUIR.md)** primero. Son tres reglas y las cosas que muerden.

## Cómo se usa

```bash
npm install          # solo la primera vez
npm run build        # src/el-analista.jsx  ->  index.html
npm run servir       # sirve el juego en http://localhost:5173
```

El archivo `index.html` se abre con doble clic, sin más.

El juego está en vivo en **https://aleferrara1807.github.io/el-analista/**, y se
reconstruye y republica solo en cada push a `main` — pero solo si las pruebas
pasan. Si fallan, el sitio se queda con la última versión buena.

## Cómo se verifica

El proyecto lleva su propia batería. No es decorativa: encontró bugs reales
(pantallas en blanco por guardados manipulados, un `NaN` que se colaba como
válido, una clave duplicada que descartaba datos en silencio).

```bash
npm run sintaxis     # parsea el JSX
npm run robustez     # 27 escenarios de ataque, cada uno en su proceso
npm run cobertura    # ¿aparece de verdad el contenido nuevo al jugar?
npm run finales      # ¿cuántas vidas llegan a los 30 años y cómo terminan?
npm run alcance      # ¿qué porcentaje de lo escrito ve un jugador?
npm run deuda        # intereses, embargo y quiebra, aislados
npm run fondo        # circulación del capital de la gestora
```

`npm run robustez` compara la versión actual contra el original de
`historia/` y debe dar **27/27**. Los escenarios incluyen guardados
manipulados a mano, `localStorage` que lanza excepciones, un almacén que
nunca responde y `Math.random` secuestrado.

## Estructura

```
src/       el juego, un único .jsx
index.html el HTML autónomo que se publica, generado — no se edita a mano
historia/  la versión original, para comparar
pruebas/   la batería de verificación
```

## Blindaje

Tres capas, porque el objetivo era que no se pudiera tumbar:

1. **Aritmética que no propaga NaN.** Ningún bucle sin tope: `Math.random`
   sustituido desde la consola ya no cuelga el juego.
2. **`sanear()`.** Todo lo que entra al estado —guardado, evento, minijuego,
   consola— pasa por un validador que acota números, comprueba que los
   identificadores existan y limita el tamaño de las listas. Los guardados
   llevan firma para detectar manipulación; es *detección*, no protección: el
   código viaja con el juego y quien lo lea puede recalcularla.
3. **Frontera de error y torniquete.** Ningún fallo deja pantalla en blanco, y
   cada minijuego solo puede resolverse una vez.

## Notas

- La partida se guarda en el `localStorage` del navegador. No sale de ahí.
- Nada del contenido es asesoría financiera: es ficción con fines educativos.
