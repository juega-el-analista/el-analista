# Carreras cerradas · el libro de registro

Página aparte del juego: una tabla compartida donde queda anotada cada carrera
que se jugó hasta el final. Publicada en
https://claude.ai/code/artifact/0b41d201-50b9-496e-837d-ea6cbd508749

## Por qué está separada del juego

Para guardar versiones de sí misma, una página tiene que llevar su propio código
fuente dentro. En el juego eso significaría duplicar 800 KB a 1,6 MB y meter
manejo de conflictos en un archivo de 9.000 líneas. Aquí son 15 KB duplicados a
30, y el riesgo es cero.

El precio es un paso manual: copias los números de tu pantalla final al
formulario del salón.

## Qué hay aquí

- `plantilla.html` — **lo que se edita.** Lleva dos marcas, `__DATOS__` y
  `__PLANTILLA__`, que el generador rellena.
- `generar.js` — produce `salon.html` a partir de la plantilla.
- `salon.html` — **generado, no editar a mano.** Es lo que se publica.

```
node salon/generar.js
```

## El quine, y las tres trampas que tiene

La página se republica a sí misma, así que necesita su propio fuente dentro. El
documento publicado rellena `__DATOS__` con el registro y `__PLANTILLA__` con la
plantilla entera **sin rellenar**, para que la siguiente versión pueda repetir la
operación. Es estable indefinidamente y el generador lo comprueba.

Tres cosas que costaron sangre:

1. **Ningún `</script` literal en el JavaScript, ni dentro de un comentario.** El
   parser de HTML corta el bloque ahí sin importarle que sea un comentario. Pasó:
   el script vivo quedó en 771 de 7.819 caracteres y la página no arrancaba. Los
   cierres de la isla van neutralizados como `[[FIN-SCRIPT]]`.
2. **Las marcas se arman por trozos en el JS de la página** (`"__" + "DATOS" + "__"`).
   Si aparecieran literales, el generador encontraría dos copias de cada una y no
   sabría cuál es la de verdad.
3. **Las sustituciones van con función de reemplazo**, no con cadena: un `$&` en
   el contenido se interpretaría como referencia y rompería el documento.

## Límites, dichos en voz alta

- **Nada se verifica.** No existe capacidad de identidad para páginas publicadas,
  así que cualquiera puede anotar el nombre y el patrimonio que quiera. Es un
  registro por confianza y la página lo dice.
- Se conservan las 100 mejores carreras, para que el documento no crezca sin fin.
- Si dos personas anotan a la vez, la segunda pierde el cambio: tiene que recargar
  y repetirlo. No hay reintento automático, a propósito.
- Las vistas sin permiso de escritura ven la tabla en solo lectura.
