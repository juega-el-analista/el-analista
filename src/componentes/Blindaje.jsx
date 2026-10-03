import React from "react";
import { CSS } from "../estilos/base.js";
import { CSS5 } from "../estilos/minijuegos.js";
import { CSS2 } from "../estilos/graficos.js";
import { CSS3 } from "../estilos/tableros.js";
import { CSS4 } from "../estilos/cartera.js";
import { olvidarPartida } from "../motor/guardado.js";

/* ============================================================
   BLINDAJE . CAPA TRES: LA RED
   React desmonta el arbol entero si un componente lanza durante el
   render. Sin esto, cualquier fallo deja la pantalla en blanco y la
   partida parece perdida. Con esto, el error queda contenido, se
   escribe en consola para poder arreglarlo, y el jugador tiene tres
   salidas: reintentar, volver al guardado o empezar limpio.
   ============================================================ */
export class Blindaje extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null, intento: 0 };
    this.reintentar = this.reintentar.bind(this);
    this.desdeCero = this.desdeCero.bind(this);
  }

  static getDerivedStateFromError(err) {
    return { err };
  }

  componentDidCatch(err, info) {
    try { console.error("[El Analista] fallo contenido", err, info && info.componentStack); } catch (e) {}
  }

  reintentar() {
    this.setState((st) => ({ err: null, intento: st.intento + 1 }));
  }

  desdeCero() {
    try { const p = olvidarPartida(); if (p && p.then) { p.then(() => this.reintentar()).catch(() => this.reintentar()); return; } }
    catch (e) {}
    this.reintentar();
  }

  render() {
    if (!this.state.err) {
      /* la clave fuerza un montaje limpio en cada reintento */
      return <div key={this.state.intento} style={{ minHeight: "100%", display: "contents" }}>{this.props.children}</div>;
    }
    const detalle = (() => {
      try { return String(this.state.err && this.state.err.message ? this.state.err.message : this.state.err); }
      catch (e) { return "error desconocido"; }
    })();
    return (
      <div className="ea-root">
        <style>{CSS}{CSS2}{CSS3}{CSS4}{CSS5}</style>
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Incidencia</div>
          <h2 className="ea-final ea-dis">Algo se rompió, no tu partida</h2>
          <p className="ea-lede">
            El juego encontró un error y lo detuvo antes de que se llevara la pantalla por delante. Lo último que
            guardaste sigue ahí. Puedes reintentar desde el guardado o empezar una vida nueva.
          </p>
          <div className="ea-regla" />
          <div className="ea-mono" style={{ fontSize: 12, color: "var(--gris)", marginBottom: 20, wordBreak: "break-word" }}>
            {detalle.slice(0, 300)}
          </div>
          <div className="ea-fila2">
            <button className="ea-btnO" style={{ marginTop: 0 }} onClick={this.reintentar}>Reintentar</button>
            <button className="ea-btnO" style={{ marginTop: 0 }} onClick={this.desdeCero}>Borrar la partida y empezar limpio</button>
          </div>
        </div>
      </div>
    );
  }
}
