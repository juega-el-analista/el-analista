import React, { useState, useEffect, useRef } from "react";
import { numero, clamp } from "../motor/aritmetica.js";

/* ---- Aguantar la posición: el múltiplo sube solo hasta que se da vuelta ----
   Antes era pulsar «aguantar» y tirar un dado cada vez. Ahora el número
   sube poco a poco y el jugador decide cuándo cerrar, sin saber dónde se
   va a dar vuelta: la regla de salida tiene que traerla él.

   Dónde se da vuelta: P(llegar a m) = k / m, la forma clásica. Con k < 1
   a veces se da vuelta nada más abrir, y cuanto más alto, más raro llegar.
   El atributo mueve k: con mejor criterio aguanta un poco más en promedio.
   Tope en 10x para que un intento no dure para siempre.

   Tres intentos y cuenta el MEJOR: reventar uno no te saca del juego, que
   es justo lo que da ganas de volver a intentarlo. Medido con 40.000
   tiradas (k 0,94): salir siempre en 3x da éxito ~68%; salir en 5x, ~46%;
   salir en 2x casi nunca falla pero nunca pasa de parcial. */
const SUERTE_INTENTOS = 3;
const SUERTE_EXITO = 3;
const SUERTE_PARCIAL = 2;
const SUERTE_TOPE = 10;
const SUERTE_PASO = 1.02;      /* por cada tick de 100 ms: 2x en ~3,5 s, 3x en ~5,5 s */
const vueltaSuerte = (ayuda) => {
  const k = clamp(0.8 + numero(ayuda, 0) / 500, 0.8, 0.97);
  const u = clamp(numero(Math.random(), 0.5), 0, 0.999999);
  return clamp(k / (1 - u), 1, SUERTE_TOPE);
};
const fmtX = (m) => m.toFixed(2).replace(".", ",") + "x";

export function JuegoSuerte({ ayuda, onFin }) {
  const [intento, setIntento] = useState(0);
  const [mult, setMult] = useState(1);
  const [fase, setFase] = useState("listo");   /* listo · subiendo · cerrado · vuelta · fin */
  const [hist, setHist] = useState([]);        /* { m, ok, vuelta } por intento */
  const vuelta = useRef(1);
  const actual = useRef(1);        /* el múltiplo vivo, sin esperar al render */
  const abierto = useRef(false);   /* un intento solo se cierra una vez */

  const mejor = hist.reduce((a, h) => (h.ok && h.m > a ? h.m : a), 0);
  const quedan = SUERTE_INTENTOS - hist.length;

  /* el número sube solo mientras el intento está abierto */
  useEffect(() => {
    if (fase !== "subiendo") return;
    const t = setInterval(() => {
      if (!abierto.current) return;
      const sig = +(actual.current * SUERTE_PASO).toFixed(4);
      if (sig >= vuelta.current) {
        abierto.current = false;
        actual.current = vuelta.current;
        setMult(vuelta.current);
        setFase("vuelta");
        setHist((h) => h.concat({ m: vuelta.current, ok: false, vuelta: vuelta.current }));
        return;
      }
      actual.current = sig;
      setMult(sig);
    }, 100);
    return () => clearInterval(t);
  }, [fase]);

  /* terminados los tres intentos, se cierra con el mejor */
  useEffect(() => {
    if (hist.length < SUERTE_INTENTOS || fase === "fin") return;
    setFase("fin");
    const nv = mejor >= SUERTE_EXITO ? "exito" : mejor >= SUERTE_PARCIAL ? "parcial" : "fallo";
    const t = setTimeout(() => onFin(nv), 1300);
    return () => clearTimeout(t);
  }, [hist.length]);

  const abrir = () => {
    if (fase !== "listo" && fase !== "cerrado" && fase !== "vuelta") return;
    if (hist.length >= SUERTE_INTENTOS) return;
    vuelta.current = vueltaSuerte(ayuda);
    setIntento(hist.length + 1);
    actual.current = 1;
    setMult(1);
    /* a veces se da vuelta nada más abrir: también pasa en los mercados */
    if (vuelta.current <= 1.0001) {
      setFase("vuelta");
      setHist((h) => h.concat({ m: 1, ok: false, vuelta: 1 }));
      return;
    }
    abierto.current = true;
    setFase("subiendo");
  };
  const cerrar = () => {
    if (fase !== "subiendo" || !abierto.current) return;
    abierto.current = false;
    const m = actual.current;
    setMult(m);
    setFase("cerrado");
    setHist((h) => h.concat({ m, ok: true, vuelta: vuelta.current }));
  };

  const ultimo = hist[hist.length - 1];
  const color = fase === "vuelta" ? "var(--rojo)" : fase === "cerrado" ? "#2F7A3D" : undefined;
  const aviso = fase === "listo" ? "Cuando abras, el múltiplo empieza a subir. Cierra antes de que se dé vuelta."
    : fase === "subiendo" ? "Subiendo… ¿cierras o aguantas?"
    : fase === "cerrado" ? "Cerraste en " + fmtX(ultimo.m) + ". Se iba a dar vuelta en " + fmtX(ultimo.vuelta) + "."
    : fase === "vuelta" ? (ultimo && ultimo.vuelta <= 1.0001 ? "Se dio vuelta nada más abrir. Pasa." : "Se dio vuelta en " + fmtX(ultimo.vuelta) + ". Ese intento se pierde.")
    : mejor >= SUERTE_EXITO ? "Te quedas con " + fmtX(mejor) + ". Éxito."
    : mejor >= SUERTE_PARCIAL ? "Te quedas con " + fmtX(mejor) + ". Resultado a medias."
    : mejor > 0 ? "Te quedas con " + fmtX(mejor) + ". Muy poco para lo que arriesgaste." : "Los tres se dieron vuelta.";

  return (
    <div className="ea-jw ea-jwCentro">
      <div className="ea-jinfo ea-dis">
        <span>{intento ? "Intento " + intento + " de " + SUERTE_INTENTOS : "Tres intentos"}</span>
        <span>Tu mejor {mejor ? fmtX(mejor) : "—"}</span>
      </div>
      <div className="ea-mult ea-mono" style={color ? { color } : undefined}>{fmtX(mult)}</div>
      <div className="ea-suerteMeta ea-mono">éxito desde {fmtX(SUERTE_EXITO)} · a medias desde {fmtX(SUERTE_PARCIAL)}</div>
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#6B6B6B" }}>{aviso}</div>
      {fase === "subiendo" ? (
        <button className="ea-btn" style={{ background: "var(--cobre)" }} onClick={cerrar}>Cerrar en {fmtX(mult)}</button>
      ) : fase !== "fin" ? (
        <button className="ea-btn" onClick={abrir}>
          {fase === "listo" ? "Abrir la posición" : "Otro intento · quedan " + quedan}
        </button>
      ) : null}
      {hist.length > 0 && (
        <div className="ea-suerteHist">
          {hist.map((h, i) => (
            <span key={i} className={"ea-suerteH ea-mono" + (h.ok ? " ok" : " mal")}>
              {i + 1} · {h.ok ? "cerraste " + fmtX(h.m) : "vuelta " + fmtX(h.vuelta)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
