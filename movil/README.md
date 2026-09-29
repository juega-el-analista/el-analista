# El Analista para iPhone y Android

Esta carpeta es la app de las tiendas. No tiene un juego propio: lleva dentro el
mismo `index.html` que se publica en Pages y lo muestra a pantalla completa, sin
red. Cada cambio que entra al juego entra también a la app en el siguiente build.

Está hecha con Expo (SDK 57) y se compila en la nube con EAS, así que no hace
falta una Mac.

## Qué agrega la app encima del juego

1. El juego va empaquetado y funciona sin conexión.
2. Las partidas se guardan en el teléfono y siguen ahí al cerrar y abrir.
3. El teléfono responde con un toque suave al pulsar un botón.
4. No hay zoom al tocar un campo de texto, ni menú de copiar al mantener pulsado.
5. La app no navega fuera del juego.

El registro competitivo no funciona dentro de la app: depende de `window.storage`,
que solo existe cuando el juego corre publicado en Claude. El juego ya lo detecta
y guarda en el teléfono, así que no se rompe nada; simplemente no hay marcador
compartido.

## Probarla en tu celular

Necesitas Node.js y la app Expo Go en el celular, con sesión iniciada en la
misma cuenta de Expo que en la computadora.

```bash
cd movil
npm install          # solo la primera vez
npx expo login       # lo haces tú, con tu usuario de Expo
npm start            # copia el juego y muestra el QR
```

En iPhone escaneas el QR con la cámara; en Android, desde Expo Go. Si no
conecta, prueba `npx expo start --tunnel`.

Si cambias el juego, corre `npm run build` en la raíz para regenerar
`index.html` y vuelve a hacer `npm start`.

## Publicarla en la App Store

Antes, en el navegador: cuenta de Apple Developer (99 USD al año), acuerdos
aceptados en App Store Connect. Si sale a nombre de una empresa, inscríbete
como organización; te piden el número D-U-N-S y tarda unos días.

El identificador de la app está puesto como `com.juegaelanalista.elanalista`
en `app.json`. Cámbialo antes del primer build si prefieres otro: después ya
no se puede.

```bash
npm install --global eas-cli
eas build:configure --platform ios     # la primera vez; acepta crear el proyecto
eas build --platform ios --profile production
eas submit --platform ios --latest
```

Los tres te piden tu Apple ID y el código de verificación; córrelos tú.
En el build deja que EAS genere el certificado y el perfil. La pregunta del
cifrado ya está respondida en `app.json` (la app no usa cifrado propio).

Para las siguientes versiones basta con:

```bash
eas build --platform ios --auto-submit
```

EAS sube el número de build solo. Si cambias la versión que ve la gente,
súbela en `app.json` (`"version"`).

## La ficha en App Store Connect

Subir no es mandar a revisión. Eso lo haces a mano en la versión 1.0:

1. Capturas de iPhone (la app no pide iPad).
2. Descripción, palabras clave, URL de soporte y copyright.
3. El build que subiste.
4. Categoría: Juegos, subcategoría Simulación o Educación.
5. Clasificación por edad: el juego tiene escenas de divorcios, duelos y estafas.
6. Privacidad: la app no recolecta datos; todo se guarda en el teléfono.
   Igual necesitas una URL con la política de privacidad.
7. Precio y países.
8. En la descripción conviene decir que es un simulador educativo y que no da
   asesoría financiera.

Después, Add for Review y Submit for Review.

## Archivos

| | |
|---|---|
| `App.js` | La pantalla: el juego dentro de un WebView y los ajustes que se le inyectan. |
| `scripts/copiar-juego.js` | Copia `../index.html` a `juego/juego.js`. Corre solo antes de `npm start` y en EAS. |
| `juego/` | Generada, no se versiona. |
| `app.json` | Nombre, ícono, identificador y colores. |
| `eas.json` | Los perfiles de build de EAS. |
| `assets/` | Íconos a 1024 px, sacados de `pwa/`. |
