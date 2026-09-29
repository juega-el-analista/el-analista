import React from "react";

/* El aviso legal, la primera vez que se abre el juego: qué es esto y qué no es. */
export function Aviso({ ctx }) {
  const { aceptarAviso, avisoLargo, setAvisoLargo } = ctx;
  return (
    <div className="ea-wrap ea-portada">
      <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Antes de entrar</div>
      <h1 className="ea-h1 ea-dis" style={{ fontSize: "clamp(34px,8vw,58px)" }}>Esto es un juego</h1>

      {/* Tres frases, no cinco bloques. El aviso segui­a siendo un muro
          de mil palabras delante de la puerta, y un muro no se lee: se
          salta. Lo que la ley y el jugador necesitan saber cabe en tres
          lineas —es ficcion, no es asesoria, y hay vida adulta dentro—
          y el texto completo sigue entero, a un clic. */}
      <div className="ea-aviso">
        <div className="ea-avisoB"><p>Todo está <strong>inventado</strong>. No hay dinero de verdad en juego.</p></div>
        <div className="ea-avisoB"><p><strong>Esto no es asesoría financiera.</strong></p></div>
        <div className="ea-avisoB"><p><strong>Hay vida adulta dentro</strong>: parejas, hijos, divorcios, enfermedad, muerte y estafas.</p></div>
      </div>

      <button className="ea-atras ea-dis" style={{ marginTop: 14, marginBottom: 0 }}
        onClick={() => setAvisoLargo((v) => !v)}>
        {avisoLargo ? "↑ Cerrar el aviso completo" : "↓ Leer el aviso completo"}
      </button>

      {avisoLargo && (
        <div className="ea-aviso ea-panelAb" style={{ marginTop: 6 }}>
          <div className="ea-avisoB">
            <div className="ea-avisoK ea-dis">Nada de aquí es real</div>
            <p>
              Las empresas, los fondos, las noticias y los números están inventados. No existe ninguna
              de las oportunidades que vas a ver, no hay dinero de verdad en juego y nada de lo que
              decidas aquí tiene la menor consecuencia fuera de esta pantalla. Puedes arruinarte
              tranquilo: es el mejor sitio para hacerlo.
            </p>
          </div>

          <div className="ea-avisoB">
            <div className="ea-avisoK ea-dis">Es para aprender, no para hacerte caso</div>
            <p>
              El juego enseña cómo funcionan el interés compuesto, la diversificación, el riesgo, la deuda
              y el coste de vivir por encima de tus posibilidades. Eso son conceptos, y los conceptos sí
              se trasladan a la vida. Las cifras concretas, no: <strong>esto no es asesoría financiera</strong>.
              Ninguna decisión de tu dinero real debería basarse en lo que pase en una partida.
            </p>
          </div>

          <div className="ea-avisoB">
            <div className="ea-avisoK ea-dis">Los números están simplificados a propósito</div>
            <p>
              Los rendimientos se simulan con modelos deliberadamente sencillos para que se entiendan.
              El mercado real es más desordenado, los impuestos cambian según el país y el año, y el
              rendimiento pasado no predice el futuro ni aquí ni allá. Si un resultado del juego te
              parece demasiado bueno, probablemente lo sea.
            </p>
          </div>

          <div className="ea-avisoB">
            <div className="ea-avisoK ea-dis">Hay vida adulta dentro</div>
            <p>
              Además de la carrera, la partida incluye escenas de la vida que afectan al dinero:
              parejas y rupturas, hijos, divorcios, enfermedad, la muerte de alguien cercano y
              estafas. Nada está contado de forma explícita ni gráfica, pero conviene que lo sepas
              antes de empezar.
            </p>
          </div>

          <div className="ea-avisoB">
            <div className="ea-avisoK ea-dis">Tu partida no sale de tu navegador</div>
            <p>
              Lo que juegas se guarda en tu propio dispositivo para que puedas retomarlo. No se envía
              a ningún sitio, no se pide ningún dato tuyo y no hay cuenta que crear.
            </p>
          </div>
        </div>
      )}

      <div className="ea-regla" />
      <button className="ea-btnO" onClick={aceptarAviso}>Entendido, acepto y quiero jugar</button>
      <div style={{ fontSize: 11.5, color: "var(--gris)", marginTop: 10 }}>
        Al entrar aceptas que esto es un ejercicio de ficción con fines educativos y que no
        sustituye el consejo de un profesional.
      </div>
    </div>
  );
}
