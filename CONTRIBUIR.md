# Cómo trabajar en El Analista

Somos cuatro y el juego está publicado: lo que entra aquí lo juega gente. Este
documento es corto a propósito — son tres reglas.

---

## 1 · Nunca escribas directo en `main`

Trabaja en una rama con tu nombre y lo que haces, y propón el cambio con un
*pull request*. Alessandro lo mira y lo incorpora.

```bash
git pull                              # SIEMPRE lo primero, antes de tocar nada
git checkout -b cesar/arreglar-contraste
```

Trabajas, y cuando esté:

```bash
git add -A
git commit -m "Lo que hiciste y por qué"
git push -u origin cesar/arreglar-contraste
```

GitHub responde con un enlace para abrir el pull request. Ábrelo, describe qué
cambia y por qué, y ya está.

**El `git pull` del principio no es opcional.** Sin él, tu push va a rebotar
porque otro llegó antes. Ya pasó.

## 2 · Corre las pruebas antes de proponer nada

```bash
npm run robustez     # 27 escenarios de guardados corruptos y estados imposibles
npm run quine        # 21 comprobaciones de que el documento sabe reconstruirse
```

Las dos tienen que salir en verde. Si tocaste contenido —escenas, preguntas,
textos— corre además:

```bash
npm run cobertura    # juega 20 partidas y comprueba qué contenido aparece de verdad
```

**Esto no es burocracia.** Esta batería ha cazado bugs que nadie vio leyendo el
código: una colisión de identificadores que mataba en silencio seis escenas de
vida, un envoltorio que se habría anidado al republicar y habría roto el juego
para todos en la primera partida terminada, y un guardarraíl puesto en la lista
equivocada. Ninguno se veía jugando.

**Si añades contenido, añádele su marcador** en `pruebas/cobertura.js`. Sin
marcador, la prueba da por bueno un contenido que quizá no aparece nunca.

## 3 · Publicar es aparte, y lo hace Alessandro

Que un cambio entre en `main` no lo publica. El juego vive en un artifact y se
republica a mano. Así que un pull request incorporado **todavía no lo están
jugando**: hay un paso más, y es deliberado.

---

## Cosas que muerden

Están explicadas donde toca, pero conviene saber que existen:

- **`pruebas/empaquetar.js`** construye un documento que sabe reconstruirse a sí
  mismo, porque el registro de carreras vive dentro. Tiene tres trampas
  documentadas en su cabecera. Si lo tocas, `npm run quine` es obligatorio.
- **Los identificadores de escena.** Las escenas de vida usan 9001-9041. Al
  inventar ids nuevos hay que mirar el rango entero: un id repetido **mata la
  otra escena para siempre**, porque el juego marca lo visto por id. Ya pasó una
  vez y silenció seis escenas.
- **El presupuesto del año.** Toda escena que se empuje a mano en `generarAno`
  tiene que **sumar** al objetivo, no ocupar el sitio de un evento normal. Pero
  el conteo va antes de la vida, la bifurcación y la clave: esas tres siempre
  entraron en el presupuesto normal.
- **`src/el-analista.jsx` es el original.** `index.html` se genera con `npm run build`
  y es lo que sirve GitHub Pages. No se edita a mano nunca.

## Dónde está escrito el porqué

- `MEJORAS.md` — los 31 puntos del repaso de agosto, con la razón de cada
  decisión y lo que se decidió **no** hacer.
- `PLAN-REGISTRO.md` — cómo funciona el registro compartido y los tres bugs que
  costó montarlo.
- `README.md` — qué es el juego y cómo se construye.

Antes de cambiar algo que parezca raro, mira si ya está explicado ahí. Varias
cosas que parecen errores son decisiones con motivo.
