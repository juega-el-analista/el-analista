import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as Haptics from "expo-haptics";

import juego from "./juego/juego";

// El papel del juego (--papel). Va en los bordes de la pantalla y detrás de la
// página, y se le pone también al documento: el index.html arranca en oscuro
// mientras carga y eso, dentro de la app, se ve como un parpadeo.
const FONDO = "#F7F7F5";

// La dirección base solo le da al juego un origen fijo. Con él, las partidas
// que guarda en localStorage sobreviven entre aperturas de la app. No se pide
// nada a esa dirección: el juego va entero en la cadena.
const BASE = "https://app.el-analista.local/";

// Lo que se inyecta en la página antes de que arranque el juego:
// sin zoom al tocar un campo (en iPhone salta con letra de menos de 16px),
// sin el menú de copiar al mantener pulsado un botón, y un aviso a la app
// cada vez que se toca un botón para que el teléfono responda con un toque.
const AJUSTES = `
(function () {
  // Esto corre antes de que exista el <head>: el viewport y el estilo esperan
  // a que el documento esté armado. El oyente de toques se puede poner ya.
  document.addEventListener("DOMContentLoaded", function () {
    var v = document.querySelector('meta[name="viewport"]');
    if (v) v.setAttribute("content", "width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover");
    var s = document.createElement("style");
    s.textContent = "button,[role=button]{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}"
      + "html{-webkit-tap-highlight-color:transparent}html,body{background:#F7F7F5}";
    document.head.appendChild(s);
  });
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest && e.target.closest("button,[role=button]");
    if (b && !b.disabled && window.ReactNativeWebView) window.ReactNativeWebView.postMessage("toque");
  }, true);
})();
true;
`;

export default function App() {
  const alMensaje = useCallback((e) => {
    if (e.nativeEvent.data === "toque") Haptics.selectionAsync().catch(() => {});
  }, []);

  // Cualquier navegación fuera del juego (no hay ninguna hoy) se corta aquí:
  // la app no debe convertirse en un navegador.
  const soloElJuego = useCallback((pedido) => {
    return pedido.url.startsWith(BASE.slice(0, -1)) || pedido.url.startsWith("about:") || pedido.url.startsWith("data:");
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.pantalla} edges={["top", "bottom"]}>
        <StatusBar style="dark" />
        <WebView
          style={estilos.juego}
          source={{ html: juego, baseUrl: BASE }}
          originWhitelist={["*"]}
          injectedJavaScriptBeforeContentLoaded={AJUSTES}
          onMessage={alMensaje}
          onShouldStartLoadWithRequest={soloElJuego}
          domStorageEnabled
          javaScriptEnabled
          bounces={false}
          overScrollMode="never"
          textZoom={100}
          allowsBackForwardNavigationGestures={false}
          allowsLinkPreview={false}
          setSupportMultipleWindows={false}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: FONDO },
  juego: { flex: 1, backgroundColor: FONDO },
});
