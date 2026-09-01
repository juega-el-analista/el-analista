# Noticias reales de SurEconomics dentro del juego

**Estado: hallazgo, no decisión.** Se investigó la viabilidad el 1-sep-2026 y se
aparcó para terminar antes el rediseño de la energía. Esto es lo que se
averiguó, para no tener que volver a averiguarlo.

---

## Se puede, y hay por dónde

`sureconomics.com` es una SPA de Vite: el HTML que sirve son 1,2 KB y un `div`
vacío, así que no hay nada que raspar de la página. Los artículos salen de un
backend propio, **`https://sureconomics-backend.onrender.com`** (gunicorn sobre
Render), con endpoints públicos que responden JSON sin autenticación:

| Endpoint | Qué devuelve |
|---|---|
| `/posts?limit=N&page=N` | **202 artículos**. Campos útiles: `title`, `excerpt`, `slug`, `published_at`, `topics[]`, `format`, `author`, `byline` |
| `/topics` | **16 temas** con su `post_count` |
| `/market-ticker` | Existe pero está **vacío** (`indicators: []`). Hoy no sirve |

Los temas que calzan con lo que el juego ya simula:

| Tema | Artículos |
|---|---|
| Macroeconomía | 53 |
| Política | 41 |
| Energía y Minería | 38 |
| Sociedad y Bienestar | 34 |
| Política Fiscal y Deuda | 32 |
| Comercio Exterior | 29 |
| Banca y Política Monetaria | 24 |
| Geoeconomía | 24 |
| Mercados e Inversión | 23 |
| Empresas y Negocios | 20 |

## El obstáculo: no se puede leer desde el navegador

Se probó el backend mandando `Origin: https://juega-el-analista.github.io` y
**no devuelve `Access-Control-Allow-Origin`**. Un `fetch()` desde la página del
juego queda bloqueado por CORS. En el artifact da igual: el CSP bloquea la red
entera de todas formas.

Habilitar CORS en el backend es posible —es nuestro— pero **no resolvería el
artifact**, así que no es el camino.

## El camino que sí funciona: hornear en el build

El workflow de Pages ya existe y ya corre en cada push. Se le añade un
`schedule:` diario y un paso que baje `/posts`, lo destile a un JSON pequeño y
lo inyecte en `index.html`.

Resuelve las tres cosas de golpe:

- **Sin CORS**, porque la petición la hace el runner, no el navegador.
- **Funciona igual en Pages y en el artifact**, porque el dato viaja dentro del
  documento en vez de pedirse por red.
- **Las pruebas siguen siendo deterministas**, porque juegan contra datos fijos.
- Si el backend está caído, el build reutiliza el último JSON bueno en vez de
  romperse. El sitio nunca queda sin publicar por una noticia.

Coste: la frescura es la del último build. Con cron diario, sobra.

## El aviso editorial, con el caso concreto

El artículo más reciente al investigar esto era **«MUERE APUÑALADA EN TIMES
SQUARE UNA VICEPRESIDENTA DE BANK OF AMERICA»**, etiquetado en *Empresas y
Negocios* y *Sociedad y Bienestar*.

Un enganche automático por tema mete eso en un simulador de carrera financiera.
Hace falta una capa de curaduría —lista blanca de temas, filtro por `format`, o
selección a mano— **no un feed crudo**. Esto no es un detalle de pulido: es la
diferencia entre que el juego se sienta vivo y que se sienta roto.

## Lo que queda por decidir

Nada de esto está decidido todavía:

- Si las noticias **afectan mecánicamente** al juego (mover el mercado, abrir
  escenas) o solo **ambientan** (prensa del año, cintillo de fondo).
- Cómo se filtran, y quién decide qué entra.
- Qué pasa con una partida guardada cuando las noticias horneadas cambian bajo
  sus pies.
