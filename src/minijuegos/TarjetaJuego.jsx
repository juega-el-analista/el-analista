import React, { useState, useEffect, useRef } from "react";
import { JUEGOS } from "../datos/modos.js";
import { GLOSARIO } from "../datos/glosario.js";
import { NIVEL_N } from "../datos/catedra.js";
import { GLOS_JUEGO } from "../motor/requisitos.js";
import { MiniJuego } from "./MiniJuego.jsx";
import { sinMovimiento } from "../hooks/movimiento.js";

/* ---- explicación antes de jugar ----
   Nadie aprende de un juego que no entendió. Primero las reglas,
   qué cuenta como éxito y para qué sirve en la vida real. */
export function TarjetaJuego({ tipo, ayuda, nivel, statN, onFin, modo, temas, onTema, visto, onVisto }) {
  /* Tres pasos, no uno. Antes el minijuego aparecia dentro del
     memorando, con la ficha y las pestañas alrededor, y no se notaba
     que cambiabas de actividad. Ahora: el anuncio —una pantalla de
     color que dice HORA DE JUGAR—, las instrucciones grandes sobre
     fondo oscuro, y el juego a pantalla entera sin nada mas. */
  const [paso, setPaso] = useState("anuncio");
  const [listo, setListo] = useState(false);
  /* las reglas, para quien ya jugó esto antes y quiere repasarlas */
  const [recordar, setRecordar] = useState(false);
  /* y el «para qué sirve», que no hace falta antes de jugar */
  const [porQue, setPorQue] = useState(false);

  /* el anuncio se pasa solo, y tambien al toque: quien ya lo vio veinte
     veces no tiene por que esperar */
  useEffect(() => {
    if (paso !== "anuncio") return;
    if (typeof setTimeout !== "function") { setPaso("reglas"); return; }
    const espera = sinMovimiento() ? 60 : 1150;
    const t = setTimeout(() => setPaso("reglas"), espera);
    return () => { try { clearTimeout(t); } catch (e) {} };
  }, [paso]);
  /* El torniquete. Todos los minijuegos cierran por aqui y aqui solo se
     pasa una vez: da igual si el jugador machaca el boton, si un
     setTimeout viejo dispara tarde o si el componente ya se desmonto.
     Un resultado por escena, ni uno mas. */
  const gastado = useRef(false);
  useEffect(() => () => { gastado.current = true; }, []);
  const cerrarUnaVez = (nivelBruto) => {
    if (gastado.current) return;
    gastado.current = true;
    const nv = nivelBruto === "exito" || nivelBruto === "parcial" || nivelBruto === "fallo" ? nivelBruto : "fallo";
    try { onFin(nv); } catch (e) { try { console.error("[El Analista] fin de juego", e); } catch (_) {} }
  };
  const j = JUEGOS[tipo];
  if (!j) return <MiniJuego tipo={tipo} ayuda={ayuda} nivel={nivel} onFin={cerrarUnaVez} modo={modo} temas={temas} onTema={onTema} />;
  if (listo) {
    return (
      <div className="ea-juegoPleno">
        <MiniJuego tipo={tipo} ayuda={ayuda} nivel={nivel} onFin={cerrarUnaVez} modo={modo} temas={temas} onTema={onTema} />
      </div>
    );
  }
  const nivelJuego = tipo === "quiz" || tipo === "calculo" || tipo === "semaforo" || tipo === "catedra";
  const empezar = () => { if (onVisto) onVisto(tipo); setListo(true); };

  /* ---- paso uno: el anuncio ----
     Una pantalla de color que no pide leer nada. Solo avisa de que esto
     ya no es una decision, es otra cosa. */
  if (paso === "anuncio") {
    return (
      <div className="ea-anuncioJuego" onClick={() => setPaso("reglas")}>
        <div className="ea-anuncioJK ea-dis">Hora de jugar</div>
        <div className="ea-anuncioJN ea-dis">{j.n}</div>
        <div className="ea-anuncioJT ea-dis">{j.tema} · {j.dur}</div>
      </div>
    );
  }

  /* ---- paso dos: las instrucciones, grandes y encima ----
     Sobre un fondo oscurecido para que no compitan con nada. Quien ya
     jugo esto se salta los pasos: le basta el nombre y el boton. */
  return (
    <div className="ea-reglasPleno">
      <div className="ea-reglasCaja">
        <div className="ea-jnombre ea-dis"><span>{visto ? "Otra vez" : "Vas a jugar"}</span>{j.n}</div>
        <div className="ea-jmeta">
          {!visto && <span className="ea-jtag">{j.tema}</span>}
          <span className="ea-jtag">{j.dur}</span>
          {nivelJuego && <span className="ea-jtag">Nivel {nivel} · {NIVEL_N[nivel]}</span>}
          <span className="ea-jtag">{statN} {Math.round(ayuda)}</span>
        </div>

        {!visto && (
          <div>
            <p className="ea-reglasX">{j.i}</p>
            <ul className="ea-pasos ea-pasosG">
              {j.pasos.map((t, i) => (
                <li className="ea-paso" key={i}><span className="ea-pasoN">{i + 1}</span><span>{t}</span></li>
              ))}
            </ul>
            <div className="ea-reglasGana">{j.gana}</div>
          </div>
        )}

        <button className="ea-btn ea-btnJugar" onClick={empezar}>
          {visto ? "Empezar" : "Entendido, empezar"}
        </button>

        {visto && (
          <div>
            <button className="ea-atras ea-dis" style={{ marginTop: 12, marginBottom: 0 }}
              onClick={() => setRecordar((v) => !v)}>
              {recordar ? "↑ Ya me acuerdo" : "↓ Recordarme las reglas"}
            </button>
            {recordar && (
              <div className="ea-panelAb">
                <p className="ea-reglasX">{j.i}</p>
                <ul className="ea-pasos ea-pasosG">
                  {j.pasos.map((t, i) => (
                    <li className="ea-paso" key={i}><span className="ea-pasoN">{i + 1}</span><span>{t}</span></li>
                  ))}
                </ul>
                <div className="ea-reglasGana">{j.gana}</div>
              </div>
            )}
          </div>
        )}

        {!visto && (
          <div>
            <button className="ea-atras ea-dis" style={{ marginTop: 14, marginBottom: 0 }}
              onClick={() => setPorQue((v) => !v)}>
              {porQue ? "↑ Cerrar" : "↓ Para qué sirve esto"}
            </button>
            {porQue && (
              <div className="ea-panelAb">
                <div className="ea-lec" style={{ marginTop: 8 }}>
                  <div className="ea-lecX">{j.ensena}</div>
                </div>
                {modo === "aprendiz" && (GLOS_JUEGO[tipo] || []).map((k) => GLOSARIO[k]).filter(Boolean).map((g, i) => (
                  <div className="ea-glos" key={i}>
                    {i === 0 && <div className="ea-glosK">Palabras que vas a ver</div>}
                    <div className="ea-glosT">{g.n}</div>
                    <div className="ea-glosX">{g.x}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
