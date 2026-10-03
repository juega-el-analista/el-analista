import React, { useState, useRef } from "react";
import { TOPE_PLATA, numero, esNumero, entero, clamp, gauss, fmt } from "../motor/aritmetica.js";

/* ============================================================
   EL CAMINO DEL AÑO
   El informe mostraba la cartera como dos números, el de enero y el de
   diciembre, unidos por una recta. Eso oculta justo lo que hay que
   aprender: que un año que cierra en más 8% pudo haber
   estado en menos catorce en junio, y que aguantar eso es la mitad del
   oficio.

   Aquí se reconstruye el recorrido mes a mes con un puente browniano:
   una trayectoria aleatoria obligada a empezar y terminar exactamente
   en los valores reales del juego, con la volatilidad real de TU
   cartera. No es adorno ni ruido inventado: una cartera conservadora
   dibuja una línea casi lisa y una cargada de cripto dibuja dientes de
   sierra, porque la volatilidad que alimenta el puente es la que sale
   de los pesos que tú elegiste.
   ============================================================ */
/* cifras cortas para los ejes: "1,2 M" en vez de "1.234.567", que era
   lo que se salía del lienzo por la izquierda */
export const fmtCorto = (n) => {
  const x = numero(n, 0);
  const a = Math.abs(x);
  const coma = (v, d) => v.toFixed(d).replace(".", ",");
  /* una escala por magnitud, y sin decimales a partir de tres cifras,
     de modo que la etiqueta nunca pasa de siete caracteres y siempre
     cabe en el margen del eje */
  const escala = [[1e12, " B"], [1e9, " MM"], [1e6, " M"], [1e3, " k"]];
  for (let i = 0; i < escala.length; i++) {
    const u = escala[i][0];
    if (a >= u) {
      const v = x / u;
      return coma(v, Math.abs(v) >= 100 ? 0 : 1) + escala[i][1];
    }
  }
  return String(Math.round(x));
};

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export const caminoAnual = (inicio, fin, sd, pasos) => {
  const n = entero(pasos, 12, 2, 24);
  const a = clamp(numero(inicio, 0), 0, TOPE_PLATA);
  const b = clamp(numero(fin, 0), 0, TOPE_PLATA);
  /* sin cartera no hay recorrido que dibujar */
  if (a <= 1 || b <= 1) return Array.from({ length: n + 1 }, (_, i) => a + (b - a) * (i / n));

  const vol = clamp(numero(sd, 0.12), 0.01, 1.2);
  const dt = 1 / n;

  /* ruido acumulado, y después le quitamos su propia deriva para que
     el puente empiece en cero y termine en cero */
  const acum = [0];
  for (let i = 0; i < n; i++) acum.push(acum[i] + gauss() * Math.sqrt(dt));
  const total = acum[n];

  const la = Math.log(a), lb = Math.log(b);
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const puente = acum[i] - t * total;
    out.push(Math.exp(la + t * (lb - la) + vol * puente));
  }
  /* los extremos son los números reales del juego, no una aproximación */
  out[0] = a;
  out[n] = b;
  return out.map((x) => clamp(x, 0, TOPE_PLATA));
};

/* la peor caída de pico a fondo dentro del año */
const caidaMax = (serie) => {
  if (!Array.isArray(serie) || serie.length < 2) return { caida: 0, pico: 0, fondo: 0 };
  let pico = -Infinity, picoIdx = 0, peor = 0, dPico = 0, dFondo = 0;
  serie.forEach((v, i) => {
    if (v > pico) { pico = v; picoIdx = i; }
    const c = pico > 0 ? v / pico - 1 : 0;
    if (c < peor) { peor = c; dPico = picoIdx; dFondo = i; }
  });
  return { caida: peor, pico: dPico, fondo: dFondo };
};

/* ---- el gráfico del año, mes a mes, con las decisiones marcadas ---- */
export function Curva({ camino, ret, hitos }) {
  const [sobre, setSobre] = useState(null);
  const caja = useRef(null);
  if (!Array.isArray(camino) || camino.length < 3) return null;

  const AN = 340, AL = 148;
  /* el margen izquierdo cabe la etiqueta más larga del eje: con cifras
     cortas son 6 caracteres a 9,5px, unos 32px. Antes eran 34px de
     margen contra etiquetas de 9 dígitos y se salían del lienzo. */
  const MI = 52, MD = 12, MT = 12, MB = 36;
  const w = AN - MI - MD, h = AL - MT - MB;

  const n = camino.length - 1;
  const arriba = numero(ret, 0) >= 0;
  const tono = arriba ? "#2E7A3D" : "#8A2E1E";

  const bajo = Math.min.apply(null, camino);
  const alto = Math.max.apply(null, camino);
  const pad = (alto - bajo) * 0.12 || Math.max(1, alto * 0.02);
  const y0 = bajo - pad, y1 = alto + pad;

  const px = (i) => MI + (i / n) * w;
  const py = (v) => MT + h - ((v - y0) / (y1 - y0 || 1)) * h;

  const linea = camino.map((v, i) => (i === 0 ? "M" : "L") + px(i).toFixed(1) + " " + py(v).toFixed(1)).join(" ");
  const area = linea + " L" + px(n).toFixed(1) + " " + (MT + h) + " L" + px(0).toFixed(1) + " " + (MT + h) + " Z";

  const partida = camino[0];
  const dd = caidaMax(camino);
  const hayCaida = dd.caida < -0.015 && dd.fondo > dd.pico;

  /* las decisiones del año, colocadas en su mes */
  const marcas = (Array.isArray(hitos) ? hitos : [])
    .filter((x) => x && typeof x === "object" && esNumero(x.mes))
    .map((x) => ({ ...x, i: clamp(numero(x.mes, 0), 0, n) }));
  const colorHito = (nv) => (nv === "exito" ? "#2E7A3D" : nv === "fallo" ? "#8A2E1E" : "#6B6B6B");

  const idx = sobre == null ? null : Math.max(0, Math.min(n, sobre));
  const mesDe = (i) => MESES[Math.min(MESES.length - 1, Math.round((i / n) * (MESES.length - 1)))];

  const mover = (clientX) => {
    const el = caja.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width) return;
    const rel = (clientX - r.left) / r.width;
    const dentro = (rel * AN - MI) / (w || 1);
    setSobre(Math.round(clamp(dentro, 0, 1) * n));
  };

  const resumen = "Tu cartera fue de " + fmt(partida) + " a " + fmt(camino[n])
    + " dólares, " + (arriba ? "subiendo " : "cayendo ") + Math.abs(numero(ret, 0) * 100).toFixed(1)
    + "% en el año"
    + (hayCaida ? ", con una caída máxima del " + Math.abs(dd.caida * 100).toFixed(0) + "% por el camino" : "")
    + (marcas.length ? ". Tomaste " + marcas.length + (marcas.length === 1 ? " decisión" : " decisiones") + " durante el año" : "");

  return (
    <div className="ea-curvaWrap" ref={caja}
      onMouseMove={(e) => mover(e.clientX)}
      onMouseLeave={() => setSobre(null)}
      onTouchStart={(e) => e.touches[0] && mover(e.touches[0].clientX)}
      onTouchMove={(e) => e.touches[0] && mover(e.touches[0].clientX)}
      onTouchEnd={() => setSobre(null)}>

      <svg className="ea-curva" viewBox={"0 0 " + AN + " " + AL} role="img" aria-label={resumen}>
        {/* rejilla con su valor a la izquierda, en cifra corta */}
        {[0, 0.5, 1].map((f) => {
          const v = y1 - (y1 - y0) * f;
          return (
            <g key={f}>
              <line className="ea-cRejilla" x1={MI} x2={MI + w} y1={MT + h * f} y2={MT + h * f} />
            </g>
          );
        })}

        {/* la banda de la peor caída del año */}
        {hayCaida && (
          <rect className="ea-cCaida" x={px(dd.pico)} y={MT} width={Math.max(1, px(dd.fondo) - px(dd.pico))} height={h} />
        )}

        {/* dónde empezaste: separa el año en "por encima" y "por debajo" */}
        <line className="ea-cPartida" x1={MI} x2={MI + w} y1={py(partida)} y2={py(partida)} />

        <path d={area} fill={tono} fillOpacity="0.13" stroke="none" />
        <path d={linea} fill="none" stroke={tono} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* las decisiones: tallo hasta la línea y rombo en el eje */}
        {marcas.map((m, k) => (
          <g key={k}>
            <line className="ea-cHitoT" x1={px(m.i)} x2={px(m.i)} y1={py(camino[Math.round(m.i)])} y2={MT + h + 5} />
            <rect x={px(m.i) - 3.5} y={MT + h + 2} width="7" height="7"
              transform={"rotate(45 " + px(m.i).toFixed(1) + " " + (MT + h + 5.5) + ")"}
              fill={colorHito(m.nivel)} stroke="#F7F7F5" strokeWidth="1.2" />
          </g>
        ))}

        {/* el cierre, con anillo de superficie */}
        <circle cx={px(n)} cy={py(camino[n])} r="5.5" fill={tono} stroke="#F7F7F5" strokeWidth="2" />

        {/* el fondo de la caída */}
        {hayCaida && (
          <circle cx={px(dd.fondo)} cy={py(camino[dd.fondo])} r="3.2" fill="#8A2E1E" stroke="#F7F7F5" strokeWidth="1.5" />
        )}

        {/* cruceta del hover */}
        {idx != null && (
          <g>
            <line className="ea-cCruz" x1={px(idx)} x2={px(idx)} y1={MT} y2={MT + h} />
            <circle cx={px(idx)} cy={py(camino[idx])} r="4" fill={tono} stroke="#F7F7F5" strokeWidth="1.5" />
          </g>
        )}

      </svg>

      {/* eje vertical en HTML: píxeles reales, legibles a cualquier ancho */}
      {[0, 0.5, 1].map((f) => (
        <span key={f} className="ea-ejeY ea-mono"
          style={{ top: (((MT + h * f) / AL) * 100).toFixed(2) + "%", width: ((MI - 7) / AN * 100).toFixed(2) + "%" }}>
          {fmtCorto(y1 - (y1 - y0) * f)}
        </span>
      ))}

      {/* los meses de cada decisión, bajo su marca */}
      {marcas.map((m, k) => (
        <span key={"m" + k} className="ea-ejeX ea-dis"
          style={{ left: ((px(m.i) / AN) * 100).toFixed(2) + "%", transform: "translateX(-50%)" }}>
          {MESES[Math.min(11, Math.max(0, Math.round(m.mes) - 1))]}
        </span>
      ))}

      <span className="ea-ejeX ea-mono" style={{ left: ((MI / AN) * 100).toFixed(2) + "%" }}>ene</span>
      <span className="ea-ejeX ea-mono ea-der" style={{ right: ((MD / AN) * 100).toFixed(2) + "%" }}>dic</span>

      {idx != null && (
        <div className="ea-curvaTip ea-mono" style={{ left: ((px(idx) / AN) * 100).toFixed(2) + "%" }}>
          <span className="ea-curvaTipM">{mesDe(idx)}</span>
          {fmt(camino[idx])}
          <span className="ea-curvaTipD" style={{ color: camino[idx] >= partida ? "#2E7A3D" : "#8A2E1E" }}>
            {camino[idx] >= partida ? "+" : ""}{partida > 0 ? ((camino[idx] / partida - 1) * 100).toFixed(1) : "0.0"}%
          </span>
        </div>
      )}

      {/* qué decidiste y cuándo: el detalle va en texto, no encima del gráfico */}
      {marcas.length > 0 && (
        <div className="ea-hitosL">
          {marcas.map((m, k) => (
            <div className="ea-hitoF" key={k}>
              <span className="ea-hitoD" style={{ background: colorHito(m.nivel) }} />
              <span className="ea-hitoM ea-mono">{MESES[Math.min(11, Math.max(0, Math.round(m.mes) - 1))]}</span>
              <span className="ea-hitoT">{m.t}</span>
              {m.cash ? (
                <span className="ea-hitoC ea-mono" style={{ color: m.cash > 0 ? "#2E7A3D" : "#8A2E1E" }}>
                  {m.cash > 0 ? "+" : "−"}{fmt(Math.abs(m.cash))}
                </span>
              ) : <span className="ea-hitoC ea-mono">sin efecto en caja</span>}
            </div>
          ))}
        </div>
      )}

      <div className="ea-curvaPie">
        {hayCaida
          ? "Por el camino llegaste a estar " + Math.abs(dd.caida * 100).toFixed(0)
            + "% por debajo de tu mejor momento del año. El resultado de diciembre no cuenta esa parte, y es la que hace vender a destiempo."
          : "Un año sin sobresaltos dentro de la cartera. No siempre va a ser así."}
      </div>
    </div>
  );
}

/* ---- la curva del patrimonio, año por año ----
   Sigue siendo una serie anual porque el patrimonio de verdad se mide una
   vez al año: inventarle oscilaciones mensuales sería mentir. Lo que se
   arregla aquí es el tamaño y la lectura: alto de verdad, eje con valores,
   años en la base, y el color fuera del cobre, que sobre papel se queda en
   2,78:1 de contraste y no aguanta ser una marca de datos. */
export function Chispa({ datos, desde }) {
  const serie = (Array.isArray(datos) ? datos : []).map((x) => numero(x, 0));
  if (serie.length < 2) return null;

  const AN = 340, AL = 132;
  const MI = 52, MD = 12, MT = 12, MB = 24;
  const w = AN - MI - MD, h = AL - MT - MB;
  const n = serie.length - 1;

  const alto = Math.max.apply(null, serie);
  const bajo = Math.min.apply(null, serie.concat([0]));
  const px = (i) => MI + (i / n) * w;
  const py = (v) => MT + h - ((v - bajo) / (alto - bajo || 1)) * h;

  const linea = serie.map((v, i) => (i === 0 ? "M" : "L") + px(i).toFixed(1) + " " + py(v).toFixed(1)).join(" ");
  const area = linea + " L" + px(n).toFixed(1) + " " + (MT + h) + " L" + px(0).toFixed(1) + " " + (MT + h) + " Z";
  const sube = serie[n] >= serie[0];
  const tono = sube ? "#2E7A3D" : "#8A2E1E";
  const ano0 = entero(desde, 2026, 1900, 3000);

  return (
    <div className="ea-curvaWrap" style={{ margin: "10px 0 4px" }}>
    <svg className="ea-spark" viewBox={"0 0 " + AN + " " + AL} role="img"
      aria-label={"Patrimonio a lo largo de " + serie.length + " años, de " + fmt(serie[0]) + " a " + fmt(serie[n]) + " dólares"}>
      {[0, 0.5, 1].map((f) => (
        <line key={f} className="ea-cRejilla" x1={MI} x2={MI + w} y1={MT + h * f} y2={MT + h * f} />
      ))}
      <path d={area} fill={tono} fillOpacity="0.13" stroke="none" />
      <path d={linea} fill="none" stroke={tono} strokeWidth="2" strokeLinejoin="round" />
      {/* un punto por año, discreto, para que se vea que la serie es anual */}
      {serie.map((v, i) => (i === n ? null : <circle key={i} cx={px(i)} cy={py(v)} r="1.8" fill={tono} fillOpacity="0.5" />))}
      <circle cx={px(n)} cy={py(serie[n])} r="5" fill={tono} stroke="#F7F7F5" strokeWidth="2" />
    </svg>

    {[0, 0.5, 1].map((f) => (
      <span key={f} className="ea-ejeY ea-mono"
        style={{ top: (((MT + h * f) / AL) * 100).toFixed(2) + "%", width: ((MI - 7) / AN * 100).toFixed(2) + "%" }}>
        {fmtCorto(alto - (alto - bajo) * f)}
      </span>
    ))}
    <span className="ea-ejeX ea-mono" style={{ left: ((MI / AN) * 100).toFixed(2) + "%" }}>{ano0}</span>
    <span className="ea-ejeX ea-mono ea-der" style={{ right: ((MD / AN) * 100).toFixed(2) + "%" }}>{ano0 + n}</span>
    </div>
  );
}

export function Flujo({ titulo, lista, tope, neg }) {
  return (
    <div style={{ flex: 1, minWidth: 190 }}>
      <div className="ea-lecK">{titulo}</div>
      <div className="ea-flujo">
        {lista.map((x, i) => (
          <div key={i}>
            <div className="ea-flin">
              <span>{x.n}</span>
              <span className="ea-mono" style={{ textAlign: "right" }}>{fmt(x.v)}</span>
            </div>
            <div className="ea-flbar">
              <div className={"ea-flfill" + (neg ? " neg" : "")} style={{ width: Math.min(100, tope > 0 ? (x.v / tope) * 100 : 0) + "%" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
