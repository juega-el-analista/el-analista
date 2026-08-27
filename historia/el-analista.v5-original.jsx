import React, { useState, useEffect, useRef, useMemo } from "react";

/* ============================================================
   EL ANALISTA  ·  v5
   De los 20 a los 50, un año por turno.
   Dieciocho minijuegos, un temario de finanzas en cinco niveles que
   sube contigo, una cartera que reparte activo por activo y un
   informe de cierre que te explica qué acabas de aprender.
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.ea-root{
  --tinta:#0C191D; --fieltro:#13252A; --borde:#20393E;
  --papel:#E9E3D5; --papel2:#DCD4C2; --tintaPapel:#1A2528;
  --cobre:#C0763A; --verde:#5F8F5C; --rojo:#BE4B3B; --gris:#6C6255;
  --hueso:#CFC9BA; --tenue:#7B8D8F;
  background:var(--tinta); color:var(--hueso); min-height:100%;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:15px; line-height:1.55; padding:16px;
}
.ea-root *{box-sizing:border-box}
.ea-dis{font-family:'Archivo Narrow','Arial Narrow',sans-serif; text-transform:uppercase; letter-spacing:.06em; font-weight:700}
.ea-mono{font-family:'IBM Plex Mono',ui-monospace,Menlo,monospace; font-variant-numeric:tabular-nums}

.ea-wrap{max-width:1100px;margin:0 auto}
.ea-placa{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end;justify-content:space-between;
  border:1px solid var(--borde);background:var(--fieltro);padding:13px 16px}
.ea-nombre{font-size:25px;line-height:1;color:var(--papel)}
.ea-sub{font-size:11.5px;color:var(--tenue);letter-spacing:.14em;margin-top:5px}
.ea-reloj{text-align:right;font-size:11.5px;color:var(--tenue);letter-spacing:.1em}
.ea-plata{font-size:23px;color:var(--papel)}
.ea-plata.neg{color:var(--rojo)}

.ea-cinta{border:1px solid var(--borde);border-top:none;background:#0F1F23;padding:7px 16px;
  font-size:12px;color:var(--tenue);display:flex;gap:10px;align-items:baseline}
.ea-cintaK{color:var(--cobre);flex-shrink:0;font-size:11px;letter-spacing:.14em}

.ea-grid{display:grid;grid-template-columns:300px 1fr;gap:16px;margin-top:16px;align-items:start}
@media(max-width:880px){.ea-grid{grid-template-columns:1fr}}

.ea-panel{border:1px solid var(--borde);background:var(--fieltro);padding:14px 16px}
.ea-rot{font-size:11px;letter-spacing:.2em;color:var(--tenue);margin-bottom:12px}

.ea-tabs{display:flex;flex-wrap:wrap;gap:0;border:1px solid var(--borde);border-bottom:none;background:var(--fieltro)}
.ea-tab{flex:1;min-width:70px;background:transparent;border:none;border-bottom:2px solid transparent;color:var(--tenue);
  padding:9px 4px;font:inherit;font-size:11px;letter-spacing:.12em;cursor:pointer;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-tab.on{color:var(--papel);border-bottom-color:var(--cobre)}
.ea-tab:hover{color:var(--hueso)}

.ea-stat{margin-bottom:10px}
.ea-statTop{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.08em;margin-bottom:4px}
.ea-bar{height:5px;background:#0A171B;position:relative;overflow:hidden}
.ea-fill{height:100%;background:var(--cobre);transition:width .5s ease}
.ea-fill.ene{background:var(--verde)}
.ea-fill.baja{background:var(--rojo)}

.ea-fila{display:flex;justify-content:space-between;gap:8px;font-size:13px;padding:5px 0;border-bottom:1px dotted var(--borde)}
.ea-fila:last-child{border-bottom:none}

.ea-slider{width:100%;-webkit-appearance:none;appearance:none;height:3px;background:#0A171B;outline:none;margin:7px 0 2px}
.ea-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;background:var(--cobre);cursor:pointer;border-radius:0}
.ea-slider::-moz-range-thumb{width:13px;height:13px;background:var(--cobre);cursor:pointer;border:none;border-radius:0}

.ea-item{border-bottom:1px dotted var(--borde);padding:11px 0}
.ea-item:last-child{border-bottom:none}
.ea-itemTop{display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.ea-itemN{font-size:13.5px;color:var(--papel);font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;letter-spacing:.05em;font-weight:700}
.ea-itemD{font-size:12px;color:var(--tenue);margin-top:4px}
.ea-mini{background:transparent;border:1px solid var(--borde);color:var(--hueso);font:inherit;font-size:11px;
  letter-spacing:.1em;padding:5px 10px;cursor:pointer;margin-top:8px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-mini:hover:not(:disabled){border-color:var(--cobre);color:var(--papel)}
.ea-mini:disabled{opacity:.35;cursor:not-allowed}
.ea-tengo{color:var(--verde);font-size:11px;letter-spacing:.12em;margin-top:8px;display:inline-block}

.ea-memo{background:var(--papel);color:var(--tintaPapel);padding:24px 24px 20px;position:relative;
  box-shadow:0 18px 40px rgba(0,0,0,.45), 0 2px 0 var(--papel2);
  animation:ea-in .4s cubic-bezier(.2,.7,.3,1)}
@keyframes ea-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.ea-memoHead{display:flex;justify-content:space-between;align-items:baseline;gap:12px;
  border-bottom:2px solid var(--tintaPapel);padding-bottom:8px;margin-bottom:15px;font-size:11px;letter-spacing:.18em}
.ea-memoHead.clave{border-bottom:4px double var(--tintaPapel)}
.ea-memoTit{font-size:26px;line-height:1.08;margin:0 0 10px;color:#111B1D}
.ea-memoTxt{font-size:15.5px;margin:0;color:#2A3639}

.ea-ops{margin-top:18px;display:flex;flex-direction:column;gap:8px}
.ea-op{display:block;width:100%;text-align:left;background:transparent;color:var(--tintaPapel);
  border:1px solid rgba(26,37,40,.32);padding:11px 13px;font:inherit;font-size:14.5px;cursor:pointer;
  transition:background .15s,border-color .15s,transform .12s}
.ea-op:hover:not(:disabled){background:rgba(192,118,58,.14);border-color:var(--cobre);transform:translateX(3px)}
.ea-op:focus-visible{outline:2px solid var(--cobre);outline-offset:2px}
.ea-op:disabled{cursor:default;transform:none}
.ea-op.ok{border-color:#3E6B3C;background:rgba(62,107,60,.15)}
.ea-op.no{border-color:var(--rojo);background:rgba(190,75,59,.13)}
.ea-opN{font-size:11px;letter-spacing:.16em;color:var(--gris);margin-right:9px}
.ea-opTag{display:block;font-size:11px;letter-spacing:.14em;color:var(--gris);margin-top:5px}

.ea-sello{position:absolute;top:14px;right:18px;transform:rotate(-11deg);
  border:3px solid var(--cobre);color:var(--cobre);padding:4px 11px;font-size:14px;
  letter-spacing:.14em;opacity:.85;animation:ea-stamp .3s ease-out}
.ea-sello.med{border-color:var(--gris);color:var(--gris)}
.ea-sello.mal{border-color:var(--rojo);color:var(--rojo)}
@keyframes ea-stamp{from{transform:rotate(-11deg) scale(1.7);opacity:0}to{transform:rotate(-11deg) scale(1);opacity:.85}}

.ea-res{border-top:1px dashed rgba(26,37,40,.4);margin-top:16px;padding-top:13px}
.ea-cambios{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}
.ea-chip{font-size:12px;padding:3px 9px;border:1px solid rgba(26,37,40,.3)}
.ea-chip.pos{color:#3E6B3C;border-color:#3E6B3C}
.ea-chip.neg{color:#9C3A2C;border-color:#9C3A2C}

.ea-noti{background:rgba(26,37,40,.07);border-left:3px solid var(--tintaPapel);padding:10px 12px;margin-top:14px}
.ea-notiK{font-size:10.5px;letter-spacing:.2em;color:var(--gris)}
.ea-notiT{font-size:14.5px;color:#1F2B2E;margin-top:3px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;letter-spacing:.02em}

.ea-btn{background:var(--tintaPapel);color:var(--papel);border:none;padding:11px 20px;font:inherit;
  font-size:13px;letter-spacing:.14em;cursor:pointer;margin-top:16px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-btn:hover:not(:disabled){background:var(--cobre)}
.ea-btn:disabled{opacity:.4;cursor:not-allowed}
.ea-btnO{background:transparent;color:var(--hueso);border:1px solid var(--borde);padding:11px 20px;
  font:inherit;font-size:13px;letter-spacing:.14em;cursor:pointer;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-btnO:hover{border-color:var(--cobre);color:var(--papel)}

.ea-tit{font-size:13px;padding:6px 0;border-bottom:1px dotted var(--borde);display:flex;gap:9px}
.ea-titQ{color:var(--cobre);flex-shrink:0;font-size:11.5px}

/* ---- minijuegos ---- */
.ea-jw{margin-top:16px}
.ea-jinfo{display:flex;justify-content:space-between;gap:10px;font-size:11.5px;letter-spacing:.14em;color:var(--gris);margin-bottom:11px}
.ea-pista{background:rgba(26,37,40,.06);border-left:3px solid var(--cobre);padding:9px 12px;font-size:13.5px;color:#2A3639;margin-bottom:15px}

.ea-pbar{position:relative;height:42px;background:rgba(26,37,40,.08);border:1px solid rgba(26,37,40,.25);overflow:hidden}
.ea-pzona{position:absolute;top:0;bottom:0;background:rgba(95,143,92,.35);border-left:1px solid #3E6B3C;border-right:1px solid #3E6B3C}
.ea-pcursor{position:absolute;top:-3px;bottom:-3px;width:3px;background:var(--tintaPapel)}

.ea-celdas{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:260px}
.ea-celda{aspect-ratio:1/1;background:rgba(26,37,40,.08);border:1px solid rgba(26,37,40,.25);cursor:pointer;
  transition:background .12s;display:flex;align-items:center;justify-content:center;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-size:36px;color:var(--tintaPapel);line-height:1}
.ea-celda.on{background:var(--cobre)}
.ea-celda.mal{background:var(--rojo)}
.ea-celda.gana{background:rgba(95,143,92,.4)}

.ea-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.ea-num{background:rgba(26,37,40,.07);border:1px solid rgba(26,37,40,.22);padding:10px 3px;cursor:pointer;
  font-size:13.5px;text-align:center;color:var(--tintaPapel)}
.ea-num:hover{border-color:var(--cobre)}

.ea-mult{font-size:50px;line-height:1;color:var(--tintaPapel)}
.ea-fila2{display:flex;gap:9px;flex-wrap:wrap;margin-top:13px}
.ea-qtxt{font-size:16.5px;color:#2A3639;margin:0 0 13px}
.ea-expl{font-size:13.5px;color:var(--gris);margin-top:11px;border-left:2px solid var(--cobre);padding-left:10px}

.ea-luz{height:120px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(26,37,40,.25);
  background:rgba(26,37,40,.06);font-size:22px;text-align:center;padding:14px;line-height:1.2;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;color:#1F2B2E}
.ea-luz.lista{background:rgba(95,143,92,.35);border-color:#3E6B3C}
.ea-luz.roja{background:rgba(190,75,59,.28);border-color:var(--rojo)}

.ea-ordenL{display:flex;flex-direction:column;gap:7px}
.ea-ordenI{border:1px solid rgba(26,37,40,.28);padding:10px 12px;cursor:pointer;font-size:14px;
  display:flex;justify-content:space-between;gap:10px;align-items:center;background:transparent;color:var(--tintaPapel);
  text-align:left;font:inherit;width:100%}
.ea-ordenI:hover:not(:disabled){border-color:var(--cobre)}
.ea-ordenI.hecho{background:rgba(62,107,60,.16);border-color:#3E6B3C;cursor:default}
.ea-ordenI.err{background:rgba(190,75,59,.16);border-color:var(--rojo)}
.ea-ordenN{font-size:11px;letter-spacing:.14em;color:var(--gris)}

.ea-portada{max-width:680px;margin:5vh auto;text-align:left}
.ea-h1{font-size:clamp(44px,11vw,84px);line-height:.9;color:var(--papel);margin:0}
.ea-lede{color:var(--tenue);margin:18px 0 26px;font-size:16px;max-width:56ch}
.ea-regla{height:1px;background:var(--borde);margin:24px 0}
.ea-final{font-size:33px;color:var(--papel);line-height:1.1;margin:0 0 12px}
.ea-cifras{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:15px}
.ea-cifraK{font-size:11px;color:var(--tenue);letter-spacing:.18em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-cifraV{font-size:20px;color:var(--papel)}
`;

/* ---------- escala de la carrera ---------- */
const RANGOS = [
  { n: "Pasante", salario: 350, umbral: 10 },
  { n: "Analista", salario: 1400, umbral: 26 },
  { n: "Analista Senior", salario: 2800, umbral: 48 },
  { n: "Asociado", salario: 5500, umbral: 78 },
  { n: "Vicepresidente", salario: 11000, umbral: 118 },
  { n: "Director", salario: 20000, umbral: 168 },
  { n: "Socio", salario: 42000, umbral: Infinity },
];

/* Retorno esperado, volatilidad y beta al factor de mercado.
   La beta es lo que hace que la diversificación funcione como en la vida real:
   dos activos con beta alta caen juntos aunque en el papel parezcan distintos. */
const ACTIVOS = [
  { k: "bonos", n: "Bonos soberanos LatAm", mu: 0.045, sd: 0.085, b: 0.25,
    d: "Cupón fijo de gobiernos de la región. Le pega la tasa y el riesgo país." },
  { k: "corp", n: "Deuda corporativa grado inversión", mu: 0.053, sd: 0.10, b: 0.45,
    d: "Paga más que el soberano a cambio de riesgo de crédito de empresas sólidas." },
  { k: "acciones", n: "Renta variable global", mu: 0.052, sd: 0.13, b: 1,
    d: "El motor de largo plazo. También el que te hace pasar años en rojo." },
  { k: "reits", n: "Inmobiliario listado", mu: 0.055, sd: 0.16, b: 0.85,
    d: "Renta de inmuebles con liquidez de bolsa. Sensible a las tasas." },
  { k: "oro", n: "Oro y materias primas", mu: 0.032, sd: 0.15, b: -0.2,
    d: "No produce nada. Su gracia es subir cuando el resto se cae." },
  { k: "distressed", n: "Deuda distressed", mu: 0.082, sd: 0.24, b: 0.7,
    d: "Comprar barato lo que nadie quiere. O el papel recupera, o no vale nada." },
  { k: "cripto", n: "Cripto", mu: 0.11, sd: 0.46, b: 1.15,
    d: "Retorno alto en el promedio y caídas del setenta por ciento en el camino." },
];

/* el efectivo rinde poco y encima la inflación se lo come */
const EFECTIVO_MU = 0.021;

/* las noticias solo traen impacto para cuatro clases; para las demás se deriva
   de su sensibilidad económica, que es como se hace cuando no hay serie propia */
const DERIVA = {
  corp: { bonos: 0.6, acciones: 0.3 },
  reits: { acciones: 0.6, bonos: 0.4 },
  oro: { acciones: -0.45 },
};
const impactoActivo = (k, notis) => {
  let x = 0;
  notis.forEach((n) => {
    if (n.i[k] != null) { x += n.i[k]; return; }
    const m = DERIVA[k];
    if (m) Object.keys(m).forEach((src) => { x += (n.i[src] || 0) * m[src]; });
  });
  return x;
};

const ETIQ = { mod: "Modelaje", cri: "Criterio", red: "Red", rep: "Reputación", ene: "Energía", car: "Carrera", cash: "Efectivo" };

/* ============================================================
   LOS DIECIOCHO MODOS
   n nombre · i de qué se trata · tema qué entrena · dur cuánto dura
   pasos cómo se juega, paso por paso · gana cuándo cuenta como éxito
   ensena para qué sirve esto en la vida real
   ============================================================ */
const JUEGOS = {
  precision: {
    n: "Calzar el número", tema: "Ejecución", dur: "20 s",
    i: "Un cursor recorre una barra sin parar y tienes que detenerlo dentro de la banda buena.",
    pasos: [
      "El cursor va y viene de un extremo al otro de la barra.",
      "Toca fijar cuando esté dentro de la banda clara del centro.",
      "Son tres intentos y la banda se angosta en cada uno.",
    ],
    gana: "Dos o tres aciertos es éxito. Uno solo es resultado parcial.",
    ensena: "Ejecutar dentro de un rango de precio. Entrar a 100 o a 103 en la misma idea es la diferencia entre ganar y empatar.",
  },
  memoria: {
    n: "Peinar el legajo", tema: "Memoria de trabajo", dur: "30 s",
    i: "Las casillas se encienden en un orden y tienes que repetirlo.",
    pasos: [
      "Mira la secuencia en que se encienden las casillas.",
      "Cuando se apaguen, tócalas en ese mismo orden.",
      "Cada ronda agrega un paso más a la secuencia.",
    ],
    gana: "Repetir las tres secuencias sin equivocarte.",
    ensena: "Retener detalle sin apuntar nada: quién dijo qué, en qué cláusula y en qué página.",
  },
  ojo: {
    n: "Ojo clínico", tema: "Detalle contable", dur: "20 s",
    i: "Una cifra no cuadra con las demás. Encuéntrala antes de que se acabe el tiempo.",
    pasos: [
      "Aparece una grilla de cifras casi idénticas.",
      "Una sola rompe el patrón del resto.",
      "Tócala antes de que corra el reloj.",
    ],
    gana: "Encontrarla rápido es éxito. Encontrarla al filo es parcial.",
    ensena: "En una revisión nadie te señala el error. El número raro está ahí y hay que verlo.",
  },
  anclaje: {
    n: "Anclaje", tema: "Negociación", dur: "30 s",
    i: "Hay un rango de acuerdo que no ves. Mueves tu oferta y lees la respuesta.",
    pasos: [
      "La contraparte tiene un rango de aceptación oculto.",
      "Mueves la oferta y te dice si está cerca, lejos o fuera.",
      "Cierras cuando creas que estás dentro sin haber regalado dinero.",
    ],
    gana: "Cerrar dentro del rango y en el borde que te conviene.",
    ensena: "El primer número que se pone sobre la mesa ancla toda la conversación que viene después.",
  },
  suerte: {
    n: "Aguantar la posición", tema: "Riesgo y disciplina", dur: "20 s",
    i: "Cada vez que aguantas sube el múltiplo y sube el riesgo de quedarte pegado.",
    pasos: [
      "Empiezas con una posición ganadora y un múltiplo bajo.",
      "Cada vez que aguantas, el múltiplo sube y también la probabilidad de perderlo todo.",
      "Cierras cuando quieras. Si te pasas, te quedas sin nada.",
    ],
    gana: "Cerrar con un múltiplo decente. Reventar la posición es fallo.",
    ensena: "Toda posición ganadora te invita a esperar un poco más. La ruina casi siempre viene de no tener regla de salida escrita antes de entrar.",
  },
  tresraya: {
    n: "El pulso", tema: "Negociación", dur: "40 s",
    i: "Tres en raya contra la contraparte, con lo que eso significa en una mesa.",
    pasos: [
      "Juegas tres en raya contra el otro lado de la mesa.",
      "Ganar es cerrar en tus términos.",
      "Empatar es partir la diferencia, que muchas veces es el resultado realista.",
    ],
    gana: "Ganar es éxito, empatar es parcial, perder es fallo.",
    ensena: "Casi ninguna negociación se gana por fuerza. Se gana por no dejar abierta la jugada que el otro estaba esperando.",
  },
  quiz: {
    n: "Examen de inversiones", tema: "Conocimiento", dur: "60 s",
    i: "Preguntas de finanzas de verdad, y el nivel sube con los años que llevas de carrera.",
    pasos: [
      "Te toca un bloque de preguntas del nivel que corresponde a tu edad profesional.",
      "Cada respuesta trae una explicación, la aciertes o no.",
      "Con criterio alto se descarta una opción mala antes de responder.",
    ],
    gana: "Todas correctas es éxito. Dos tercios o más es parcial.",
    ensena: "Es el examen que en la vida real nadie te aplica y que igual te van a cobrar. El temario crece contigo: empieza en interés compuesto y termina en estructuración.",
  },
  reaccion: {
    n: "Cerrar la orden", tema: "Ejecución", dur: "15 s",
    i: "Cuando el panel se ponga verde, dale. Si te adelantas, la orden se va al precio equivocado.",
    pasos: [
      "El panel está en espera durante un tiempo que no conoces.",
      "Cuando se pone verde, toca lo más rápido posible.",
      "Adelantarte cuenta como orden mal ejecutada.",
    ],
    gana: "Cinco de seis puntos en tres órdenes.",
    ensena: "En mercados líquidos el precio se mueve mientras dudas. En ilíquidos, el que duda ni siquiera llega a operar.",
  },
  calculo: {
    n: "Cuentas rápidas", tema: "Cálculo mental", dur: "40 s",
    i: "Tres cuentas de cabeza contra reloj, sin calculadora, del tipo que se hace en una reunión.",
    pasos: [
      "Aparece una cuenta con tres respuestas posibles y un reloj corriendo.",
      "Elige antes de que llegue a cero.",
      "Las cuentas se vuelven más difíciles a medida que avanza tu carrera.",
    ],
    gana: "Las tres correctas es éxito, dos es parcial.",
    ensena: "Nadie abre Excel en medio de una reunión. El que aproxima bien de cabeza dirige la conversación.",
  },
  orden: {
    n: "Poner en orden", tema: "Estructura", dur: "25 s",
    i: "Toca los elementos en el orden correcto. Un error y se acaba.",
    pasos: [
      "Te dan una lista desordenada y un criterio de orden.",
      "Toca los elementos uno por uno en la secuencia correcta.",
      "Un error termina el ejercicio.",
    ],
    gana: "Completar toda la secuencia.",
    ensena: "Prelación de cobro, pasos de una valoración, cascada de un fondo. El orden no es un detalle: define quién cobra y quién no.",
  },
  semaforo: {
    n: "Compra o vende", tema: "Lectura de mercado", dur: "25 s",
    i: "Seis señales de mercado, pocos segundos cada una. Decide rápido.",
    pasos: [
      "Aparece una noticia o señal de mercado.",
      "Decides comprar o vender antes de que se agote el tiempo.",
      "Con los años el reloj se acorta y las señales se vuelven ambiguas.",
    ],
    gana: "Cinco o seis aciertos de seis.",
    ensena: "Reaccionar a una noticia sin releerla tres veces. La mayoría de señales son obvias cuando ya sabes qué mira el mercado.",
  },
  trading: {
    n: "La sesión completa", tema: "Operación", dur: "30 s",
    i: "Operas una sesión entera contra el que compró al principio y no tocó nada.",
    pasos: [
      "El precio avanza tick por tick en el gráfico.",
      "Compras y vendes cuando quieras: solo ganas o pierdes mientras estás dentro.",
      "Al final se compara tu cuenta contra comprar y esperar.",
    ],
    gana: "Sacarle cuatro puntos o más a la estrategia pasiva es éxito. Empatar es parcial.",
    ensena: "Ganarle al que no hizo nada es mucho más difícil de lo que parece, y ese es exactamente el punto del ejercicio.",
  },
  estructura: {
    n: "Armar la estructura", tema: "Apalancamiento", dur: "40 s",
    i: "Decides cuánta deuda y cuánto capital propio pone la compra.",
    pasos: [
      "Tienes un EBITDA, un precio de compra y dos tipos de deuda con costos distintos.",
      "Mueves las barras de deuda senior y mezzanine; el resto lo pone tu capital.",
      "Ves el múltiplo estimado a cinco años antes de cerrar.",
    ],
    gana: "Múltiplo de dos y media veces o más sin pasarte de apalancamiento.",
    ensena: "La deuda multiplica el retorno del capital y también el riesgo de perderlo todo. Pasado cierto punto el banco manda, no tú.",
  },
  banderas: {
    n: "Banderas rojas", tema: "Due diligence", dur: "45 s",
    i: "Un expediente con señales mezcladas. Marca solo las que de verdad preocupan.",
    pasos: [
      "Lees una lista de hechos sobre una empresa o un fondo.",
      "Marcas los que son verdaderas señales de alarma.",
      "Marcar cosas normales como sospechosas también cuenta en contra.",
    ],
    gana: "Encontrar todas las banderas rojas sin falsos positivos.",
    ensena: "El fraude casi nunca se esconde. Está en el expediente, mezclado con veinte datos irrelevantes que distraen.",
  },
  pares: {
    n: "La pizarra del comité", tema: "Conceptos", dur: "40 s",
    i: "Fichas boca abajo: une cada concepto con lo que significa.",
    pasos: [
      "Todas las fichas empiezan tapadas.",
      "Destapas dos por turno buscando el concepto y su definición.",
      "Tienes un número limitado de fallos.",
    ],
    gana: "Completar la pizarra con pocos fallos.",
    ensena: "Manejar el vocabulario sin dudar. En una mesa, dudar de qué es el WACC cuesta más que equivocarse en la cuenta.",
  },
  carril: {
    n: "El carril del capital", tema: "Asignación y reflejos", dur: "25 s",
    i: "Tu capital corre por tres carriles y tú decides por cuál va.",
    pasos: [
      "Tu capital avanza por uno de tres carriles.",
      "Te cambias de carril para atrapar retornos y esquivar los golpes.",
      "Cada golpe recibido resta y cada retorno atrapado suma.",
    ],
    gana: "Puntos altos con pocos golpes.",
    ensena: "Rotar entre activos parece fácil visto en retrospectiva. En tiempo real casi siempre te cambias tarde.",
  },
  cuatro: {
    n: "Cuatro en línea", tema: "Negociación", dur: "60 s",
    i: "Cuatro fichas seguidas contra la contraparte.",
    pasos: [
      "Sueltas fichas por columna, igual que en el juego de mesa.",
      "Ganas con cuatro en línea en cualquier dirección.",
      "El que controla el centro del tablero controla la negociación.",
    ],
    gana: "Ganar la partida. El empate es parcial.",
    ensena: "Pensar dos jugadas por delante y bloquear al otro sin dejar de construir lo tuyo.",
  },
  subasta: {
    n: "La subasta", tema: "Valoración y disciplina", dur: "40 s",
    i: "Cuatro postores por el mismo activo y nadie sabe cuánto vale de verdad.",
    pasos: [
      "Tienes tu propia estimación de valor, que puede estar equivocada.",
      "Subes la oferta o te retiras en cada ronda.",
      "Si todos se retiran, el activo es tuyo al precio que quedó.",
    ],
    gana: "Ganar pagando por debajo del valor real. Retirarse a tiempo también cuenta.",
    ensena: "La maldición del ganador: en una subasta, el que más paga suele ser el que más se equivocó estimando.",
  },
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const gauss = () => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const fmt = (n) => new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 }).format(Math.round(n));
const elegirAzar = (arr) => arr[Math.floor(Math.random() * arr.length)];

const CSS2 = `
.ea-graf{width:100%;height:150px;border:1px solid rgba(26,37,40,.25);background:rgba(26,37,40,.05);display:block}
.ea-grafL{fill:none;stroke:var(--tintaPapel);stroke-width:2}
.ea-grafD{fill:none;stroke:var(--cobre);stroke-width:2}
.ea-marca{display:inline-block;padding:3px 10px;border:1px solid rgba(26,37,40,.3);font-size:11.5px;letter-spacing:.12em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-marca.dentro{border-color:#3E6B3C;color:#3E6B3C}
.ea-marca.fuera{border-color:var(--gris);color:var(--gris)}

.ea-est{margin:12px 0}
.ea-estL{display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px}
.ea-alerta{font-size:13px;padding:8px 11px;border-left:3px solid var(--cobre);background:rgba(192,118,58,.1);margin-top:11px;color:#2A3639}
.ea-alerta.mal{border-color:var(--rojo);background:rgba(190,75,59,.12)}
.ea-alerta.bien{border-color:#3E6B3C;background:rgba(62,107,60,.12)}

.ea-check{border:1px solid rgba(26,37,40,.28);padding:10px 12px;font-size:14px;cursor:pointer;background:transparent;
  color:var(--tintaPapel);text-align:left;width:100%;font:inherit;display:flex;gap:10px;align-items:flex-start}
.ea-check:hover:not(:disabled){border-color:var(--cobre)}
.ea-check.sel{background:rgba(192,118,58,.16);border-color:var(--cobre)}
.ea-check.bien{background:rgba(62,107,60,.16);border-color:#3E6B3C}
.ea-check.mal{background:rgba(190,75,59,.16);border-color:var(--rojo)}
.ea-checkB{font-size:11px;letter-spacing:.14em;color:var(--gris);flex-shrink:0;margin-top:2px}

.ea-fondoC{border:1px solid var(--borde);padding:11px 12px;margin-bottom:10px}
.ea-fondoT{display:flex;justify-content:space-between;gap:8px;font-size:13px;margin-bottom:3px}
.ea-fondoN{font-size:13px;color:var(--papel);font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;letter-spacing:.05em;font-weight:700}
.ea-badge{font-size:10.5px;letter-spacing:.14em;color:var(--cobre);border:1px solid var(--cobre);padding:2px 7px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
`;

const CSS3 = `
.ea-tab4{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
.ea-fichaP{aspect-ratio:1/1.25;border:1px solid rgba(26,37,40,.3);background:rgba(26,37,40,.09);cursor:pointer;
  display:flex;align-items:center;justify-content:center;text-align:center;padding:6px;font-size:11.5px;
  line-height:1.2;color:var(--tintaPapel);transition:background .15s,border-color .15s}
.ea-fichaP.tapada{background:var(--tintaPapel);color:transparent}
.ea-fichaP.tapada::after{content:"?";color:var(--papel);font-size:20px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-fichaP.abierta{background:rgba(192,118,58,.2);border-color:var(--cobre)}
.ea-fichaP.hecha{background:rgba(62,107,60,.18);border-color:#3E6B3C;cursor:default}

.ea-pista4{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;background:rgba(26,37,40,.12);padding:5px;
  border:1px solid rgba(26,37,40,.25)}
.ea-col4{display:flex;flex-direction:column-reverse;gap:4px;cursor:pointer}
.ea-hueco{aspect-ratio:1/1;border-radius:50%;background:var(--papel);border:1px solid rgba(26,37,40,.18)}
.ea-hueco.mia{background:var(--cobre)}
.ea-hueco.suya{background:var(--tintaPapel)}
.ea-hueco.gana{box-shadow:0 0 0 3px #3E6B3C inset}
.ea-col4:hover .ea-hueco{border-color:var(--cobre)}

.ea-pistaC{position:relative;height:220px;border:1px solid rgba(26,37,40,.25);background:rgba(26,37,40,.05);overflow:hidden}
.ea-lineaC{position:absolute;top:0;bottom:0;width:1px;background:rgba(26,37,40,.18)}
.ea-cap{position:absolute;bottom:8px;width:26%;height:26px;background:var(--cobre);
  transition:left .12s ease;display:flex;align-items:center;justify-content:center;color:var(--papel);
  font-size:10px;letter-spacing:.1em;font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-obj{position:absolute;width:26%;height:24px;display:flex;align-items:center;justify-content:center;
  font-size:9.5px;letter-spacing:.06em;text-align:center;line-height:1;padding:2px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700;text-transform:uppercase}
.ea-obj.bueno{background:rgba(95,143,92,.55);color:#1B2426}
.ea-obj.malo{background:rgba(190,75,59,.6);color:var(--papel)}
.ea-carrilN{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}
.ea-carrilB{border:1px solid rgba(26,37,40,.28);background:transparent;color:var(--tintaPapel);padding:9px 4px;
  font:inherit;font-size:12px;cursor:pointer;font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;font-weight:700;letter-spacing:.08em}
.ea-carrilB.on{background:var(--cobre);color:var(--papel);border-color:var(--cobre)}

.ea-postor{display:flex;justify-content:space-between;align-items:center;gap:9px;padding:6px 0;
  border-bottom:1px dotted rgba(26,37,40,.3);font-size:13px}
.ea-postor.fuera{opacity:.4;text-decoration:line-through}
.ea-precio{font-size:44px;line-height:1;color:var(--tintaPapel)}
`;


const CSS4 = `
/* reparto entre cartera y efectivo */
.ea-mix{display:flex;height:23px;border:1px solid var(--borde);overflow:hidden;margin:4px 0 2px}
.ea-mixSeg{display:flex;align-items:center;justify-content:center;font-size:10.5px;letter-spacing:.1em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;
  overflow:hidden;white-space:nowrap;transition:width .25s ease}
.ea-mixSeg.cart{background:var(--cobre);color:#101C1F}
.ea-mixSeg.efe{background:#0A171B;color:var(--tenue)}

.ea-wrow{margin:11px 0}
.ea-wtop{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;align-items:baseline}
.ea-wname{color:var(--papel);font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;
  letter-spacing:.05em;font-weight:700;font-size:12.5px}
.ea-wnum{color:var(--cobre)}
.ea-wsub{font-size:11px;color:var(--tenue);margin-top:1px;line-height:1.35}
.ea-caja{border:1px solid var(--borde);padding:8px 11px;margin-top:14px}
.ea-preset{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 10px}
.ea-mini.on{border-color:var(--cobre);color:var(--papel);background:rgba(192,118,58,.15)}
.ea-avis{font-size:11.5px;color:#D08677;border-left:2px solid var(--rojo);padding-left:9px;margin-top:9px;line-height:1.45}
.ea-ok2{font-size:11.5px;color:#8FBA8B;border-left:2px solid var(--verde);padding-left:9px;margin-top:9px;line-height:1.45}

/* informe de cierre, sobre papel */
.ea-flujo{display:flex;flex-direction:column;gap:6px;margin-top:6px}
.ea-flin{display:flex;justify-content:space-between;gap:10px;align-items:baseline;font-size:12.5px;color:#3A4649}
.ea-flbar{height:8px;background:rgba(26,37,40,.1);margin-top:3px;overflow:hidden}
.ea-flfill{height:100%;background:#3E6B3C;transition:width .4s ease}
.ea-flfill.neg{background:var(--rojo)}
.ea-spark{width:100%;height:52px;display:block;margin:6px 0 2px}
.ea-sparkL{fill:none;stroke:var(--cobre);stroke-width:2}
.ea-sparkA{fill:rgba(192,118,58,.16);stroke:none}
.ea-hitos{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.ea-hito{font-size:10.5px;letter-spacing:.1em;border:1px solid #3E6B3C;color:#2F5A2E;padding:3px 9px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-lec{border:1px solid rgba(26,37,40,.22);border-left:3px solid var(--cobre);padding:11px 13px;margin-top:14px;
  background:rgba(192,118,58,.07)}
.ea-lecK{font-size:10.5px;letter-spacing:.18em;color:var(--gris);font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;font-weight:700}
.ea-lecT{font-size:16px;color:#1F2B2E;margin:3px 0 5px;font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;letter-spacing:.04em;font-weight:700}
.ea-lecX{font-size:13.5px;color:#3A4649;line-height:1.5}
.ea-ind{height:12px;background:rgba(26,37,40,.12);margin-top:6px;position:relative}
.ea-indF{height:100%;background:var(--cobre);transition:width .5s ease}
.ea-indM{position:absolute;top:-3px;bottom:-3px;width:1px;background:#1F2B2E}
.ea-tabla{display:grid;grid-template-columns:1fr auto;gap:2px 12px}
.ea-td{font-size:12.5px;color:#3A4649;line-height:1.45}
.ea-tdn{font-size:12.5px;color:#1F2B2E;text-align:right}

/* instrucciones antes de jugar */
.ea-pasos{margin:6px 0 0;padding:0;list-style:none}
.ea-paso{display:flex;gap:10px;font-size:13.5px;color:#3A4649;padding:4px 0;line-height:1.45}
.ea-pasoN{font-size:11px;color:var(--cobre);flex-shrink:0;margin-top:3px;font-family:'IBM Plex Mono',ui-monospace,monospace}
.ea-jmeta{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0}
.ea-jtag{font-size:10.5px;letter-spacing:.12em;border:1px solid rgba(26,37,40,.3);color:var(--gris);padding:3px 8px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}

/* partida guardada */
.ea-guarda{border:1px solid var(--borde);border-left:3px solid var(--cobre);background:var(--fieltro);
  padding:13px 16px;margin-top:4px}
`;

/* ---------- mejoras que se compran una sola vez ---------- */
const PERKS = [
  { id: "research", n: "Suscripción a research institucional", c: 5000, d: "Sumas un punto de modelaje cada semestre." },
  { id: "gym", n: "Entrenador y nutricionista", c: 4500, d: "Recuperas tres puntos de energía cada semestre." },
  { id: "fiscal", n: "Asesor fiscal propio", c: 6500, d: "Tus gastos de vida bajan quince por ciento para siempre." },
  { id: "coach", n: "Coach ejecutivo", c: 8000, d: "El desgaste semestral baja de nueve a cinco puntos." },
  { id: "asistente", n: "Asistente ejecutivo", c: 9000, d: "Un punto de carrera y dos de energía cada semestre." },
  { id: "prensa", n: "Columna fija en un medio del sector", c: 9500, d: "Un punto de reputación cada semestre." },
  { id: "terminal", n: "Terminal de mercado en casa", c: 12000, d: "Medio punto extra de retorno cada semestre y más tiempo en los juegos contra reloj." },
  { id: "abogado", n: "Abogado personal", c: 13000, d: "Los golpes a tu reputación se amortiguan cuarenta por ciento." },
  { id: "broker", n: "Bróker institucional con mejor ejecución", c: 15000, d: "La volatilidad de tu portafolio baja un cuarto." },
  { id: "club", n: "Membresía del club de negocios", c: 17000, d: "Un punto de red cada semestre y mejor lectura en las negociaciones." },
  { id: "colchon", n: "Colchón de emergencia bien estructurado", c: 20000, d: "Los golpes negativos de mercado te pegan a la mitad." },
  { id: "mba", n: "MBA ejecutivo de fin de semana", c: 45000, d: "Ocho puntos de criterio de entrada y un punto de carrera cada semestre." },
];

/* ---------- caprichos y compras de vida ---------- */
const CAPRICHOS = [
  { id: "viaje", n: "Tres semanas por Europa", c: 7000, tipo: "consumo", up: 0, vida: 1, ene: 14, d: "No queda nada material. Vuelves como nuevo." },
  { id: "moto", n: "Moto de fin de semana", c: 9000, tipo: "consumo", dep: 0.03, up: 120, vida: 1, ene: 7, d: "Se deprecia y cuesta mantenerla. Igual la disfrutas." },
  { id: "reloj", n: "Reloj suizo de segunda mano", c: 11000, tipo: "activo", ap: 0.012, up: 0, vida: 1, red: 3, d: "El único capricho que suele valer más con los años." },
  { id: "palco", n: "Palco en el estadio", c: 22000, tipo: "consumo", up: 600, vida: 2, red: 6, d: "Se cierran más negocios ahí que en muchas salas de junta." },
  { id: "carro", n: "Carro deportivo", c: 38000, tipo: "consumo", dep: 0.04, up: 500, vida: 2, ene: 9, red: 3, d: "Pierde valor todos los semestres. Lo sabes y lo compras igual." },
  { id: "arte", n: "Obra de un artista latinoamericano", c: 35000, tipo: "activo", ap: 0.016, up: 100, vida: 2, rep: 4, d: "Cuelga en la sala y aprecia despacio." },
  { id: "boda", n: "La boda que querían", c: 42000, tipo: "consumo", up: 0, vida: 3, ene: 18, d: "Un día entero sin pensar en el trabajo. No tiene precio de reventa." },
  { id: "apto", n: "Apartamento propio", c: 110000, tipo: "activo", ap: 0.018, up: 900, vida: 3, ene: 8, d: "Dejas de pagar alquiler y empiezas a acumular un activo real." },
  { id: "finca", n: "Finca de café en producción", c: 85000, tipo: "activo", ap: 0.013, up: 0, renta: 2400, vida: 3, d: "Aprecia y además te deja una renta cada semestre." },
  { id: "playa", n: "Casa en la playa", c: 180000, tipo: "activo", ap: 0.011, up: 1600, vida: 4, ene: 12, d: "Cara de mantener y difícil de vender rápido. Los fines de semana valen la pena." },
  { id: "barco", n: "Barco", c: 150000, tipo: "consumo", dep: 0.035, up: 3200, vida: 3, ene: 10, red: 4, d: "El segundo mejor día de tu vida es el que lo compras." },
  { id: "hijos", n: "Fondo de educación para tus hijos", c: 60000, tipo: "activo", ap: 0.02, up: 0, vida: 5, rep: 3, d: "El único de esta lista que probablemente no vas a lamentar." },
];

/* ---------- noticias de mercado, una por semestre ---------- */
const NOTICIAS = [
  { k: "Tasas", t: "La Reserva Federal sube setenta y cinco puntos básicos en una sola reunión", i: { bonos: -0.07, acciones: -0.06, distressed: -0.05, cripto: -0.11 } },
  { k: "Tasas", t: "La Reserva Federal recorta y da por terminado el ciclo restrictivo", i: { bonos: 0.06, acciones: 0.08, distressed: 0.07, cripto: 0.16 } },
  { k: "Tasas", t: "La inflación sorprende a la baja por tercer mes seguido", i: { bonos: 0.05, acciones: 0.05, cripto: 0.06 } },
  { k: "Tasas", t: "La inflación repunta y el mercado descuenta tasas altas por más tiempo", i: { bonos: -0.06, acciones: -0.05, cripto: -0.08 } },
  { k: "Comercio", t: "Washington anuncia aranceles del veinticinco por ciento a socios comerciales clave", i: { acciones: -0.08, bonos: 0.01, cripto: -0.05, distressed: -0.03 } },
  { k: "Comercio", t: "Se levantan los aranceles tras una negociación de último minuto", i: { acciones: 0.07, distressed: 0.03 } },
  { k: "Comercio", t: "Entra en vigor un acuerdo comercial regional en América Latina", i: { acciones: 0.05, bonos: 0.04, distressed: 0.05 } },
  { k: "Geopolítica", t: "Escalada militar en una ruta marítima clave del petróleo", i: { acciones: -0.07, bonos: -0.03, distressed: -0.05, cripto: 0.04 } },
  { k: "Geopolítica", t: "Alto el fuego y desescalada tras meses de tensión", i: { acciones: 0.06, bonos: 0.04, distressed: 0.06 } },
  { k: "Geopolítica", t: "Un conflicto fronterizo interrumpe corredores de exportación de granos", i: { acciones: -0.04, bonos: -0.02 } },
  { k: "Petróleo", t: "La OPEP recorta producción y el barril salta por encima de noventa dólares", i: { acciones: 0.03, distressed: 0.07, bonos: -0.02 } },
  { k: "Petróleo", t: "El barril se desploma bajo los cincuenta dólares por exceso de oferta", i: { acciones: -0.03, distressed: -0.1, bonos: -0.05 } },
  { k: "Petróleo", t: "Una refinería grande sale de operación y los márgenes se disparan", i: { acciones: 0.04, distressed: 0.04 } },
  { k: "Cripto", t: "Aprueban un vehículo al contado y entra dinero institucional a bitcoin", i: { cripto: 0.42, acciones: 0.02 } },
  { k: "Cripto", t: "Una casa de cambio grande colapsa y arrastra a todo el mercado cripto", i: { cripto: -0.45, acciones: -0.02 } },
  { k: "Cripto", t: "El halving reduce a la mitad la emisión de bitcoin", i: { cripto: 0.22 } },
  { k: "Cripto", t: "Una economía grande prohíbe la minería de criptomonedas", i: { cripto: -0.26 } },
  { k: "Cripto", t: "Sale un marco regulatorio claro y favorable para activos digitales", i: { cripto: 0.24, acciones: 0.02 } },
  { k: "Emergentes", t: "Un soberano de la región entra en default selectivo", i: { bonos: -0.11, distressed: -0.14 } },
  { k: "Emergentes", t: "Cierra una reestructuración soberana con quita del treinta por ciento", i: { distressed: 0.26, bonos: 0.05 } },
  { k: "Emergentes", t: "El Fondo Monetario aprueba un programa para un país de la región", i: { bonos: 0.08, distressed: 0.12 } },
  { k: "Emergentes", t: "Elecciones en la región dan un giro promercado", i: { acciones: 0.09, bonos: 0.07, distressed: 0.08 } },
  { k: "Emergentes", t: "Un país vecino impone controles de capital de un día para otro", i: { bonos: -0.06, distressed: -0.08 } },
  { k: "Emergentes", t: "Un fondo soberano anuncia entrada masiva en mercados emergentes", i: { bonos: 0.07, distressed: 0.11, acciones: 0.03 } },
  { k: "Mercados", t: "Récord de utilidades en tecnología y el índice toca máximos históricos", i: { acciones: 0.11, cripto: 0.06 } },
  { k: "Mercados", t: "Corrección del veinte por ciento en tecnología por múltiplos insostenibles", i: { acciones: -0.15, cripto: -0.14 } },
  { k: "Mercados", t: "Quiebra un banco regional y el sistema tiembla durante una semana", i: { acciones: -0.09, bonos: 0.03, cripto: -0.09, distressed: -0.06 } },
  { k: "Mercados", t: "Cierre de gobierno en Estados Unidos por falta de acuerdo presupuestario", i: { acciones: -0.04, bonos: -0.02 } },
  { k: "Mercados", t: "El oro toca máximos por compras sostenidas de bancos centrales", i: { bonos: 0.02, cripto: 0.05 } },
  { k: "Mercados", t: "Semestre tranquilo, sin sobresaltos en ningún frente", i: {} },
  { k: "Mercados", t: "Huelga portuaria prolongada tranca las cadenas de suministro", i: { acciones: -0.05 } },
  { k: "Mercados", t: "Una ola de fusiones reactiva la actividad en toda la región", i: { acciones: 0.06, distressed: 0.05 } },
];

/* ---------- banco de preguntas ---------- */
const BANCO = [
  { q: "Sube la tasa de descuento y todo lo demás queda igual. El valor presente de los flujos futuros", o: ["baja", "sube", "no se mueve"], c: 0, e: "Descontar más fuerte castiga sobre todo a los flujos lejanos." },
  { q: "Ante una subida de tasas, entre dos bonos con el mismo cupón cae más de precio", o: ["el de mayor duración", "el de menor duración", "caen igual"], c: 0, e: "La duración mide justamente la sensibilidad del precio a la tasa." },
  { q: "Un bono cotiza por debajo de la par. Su rendimiento al vencimiento", o: ["es mayor que el cupón", "es menor que el cupón", "es igual al cupón"], c: 0, e: "Compras barato un flujo fijo, así que el rendimiento sube por encima del cupón." },
  { q: "El EBITDA deja fuera", o: ["intereses, impuestos, depreciación y amortización", "el costo de ventas", "los ingresos operativos"], c: 0, e: "Por eso ignora la estructura de capital y la política de inversión." },
  { q: "En un DCF a diez años, el valor terminal normalmente representa", o: ["la mayor parte del valor", "una porción menor", "exactamente la mitad"], c: 0, e: "Suele pesar entre sesenta y ochenta por ciento del total." },
  { q: "Para pasar de equity value a enterprise value", o: ["sumas la deuda neta", "restas la deuda neta", "sumas el capital de trabajo"], c: 0, e: "Enterprise value es lo que vale el negocio para todos los proveedores de capital." },
  { q: "Diversificar un portafolio reduce principalmente", o: ["el riesgo específico de cada emisor", "el riesgo de mercado", "el riesgo de tasas"], c: 0, e: "El riesgo sistemático no se diversifica, solo se cubre o se acepta." },
  { q: "El beta de una acción mide", o: ["su sensibilidad al movimiento del mercado", "su volatilidad absoluta", "su rentabilidad esperada"], c: 0, e: "Es la pendiente frente al índice, no una medida de calidad." },
  { q: "La deuda financiera neta sobre EBITDA sube de dos a cinco veces. Eso significa", o: ["un perfil crediticio más débil", "más capacidad de endeudamiento", "mejor cobertura de intereses"], c: 0, e: "Más años de EBITDA para pagar la deuda es exactamente lo que preocupa a un covenant." },
  { q: "Una exportadora cobra en dólares y paga costos en moneda local. Si la moneda local se devalúa", o: ["su margen mejora", "su margen empeora", "su margen no cambia"], c: 0, e: "Ingresos duros contra costos que se abaratan en dólares." },
  { q: "Crecen inventarios y cuentas por cobrar más rápido que las ventas. Eso", o: ["consume caja", "genera caja", "es neutro en caja"], c: 0, e: "El capital de trabajo se financia, aunque no aparezca en el estado de resultados." },
  { q: "Entre dos proyectos mutuamente excluyentes con señales opuestas, manda", o: ["el valor presente neto", "la tasa interna de retorno", "el período de recuperación"], c: 0, e: "El VAN mide valor creado en unidades monetarias, la TIR engaña por escala y por reinversión." },
  { q: "En factoring sin recurso, el riesgo de impago del deudor", o: ["lo asume el factor", "lo asume el cedente", "se reparte por mitades"], c: 0, e: "Por eso la tasa es mayor y el análisis se hace sobre el deudor." },
  { q: "La prima de riesgo país en un mercado emergente normalmente", o: ["sube el costo de capital", "baja el costo de capital", "solo afecta la deuda"], c: 0, e: "Se suma al costo del equity y por esa vía castiga la valoración." },
  { q: "Comprar deuda distressed a treinta centavos es apostar a que", o: ["la recuperación será mayor a treinta", "la empresa evitará reestructurar", "las tasas van a bajar"], c: 0, e: "Todo el caso está en el valor de recuperación, no en el cupón." },
  { q: "Duración modificada de cinco y las tasas suben cien puntos básicos. El precio", o: ["cae alrededor de cinco por ciento", "cae alrededor de uno por ciento", "sube alrededor de cinco por ciento"], c: 0, e: "Aproximación de primer orden, la convexidad corrige el resto." },
  { q: "Un múltiplo precio sobre utilidad alto suele reflejar", o: ["expectativa de crecimiento o menor riesgo", "que la acción está barata", "poca liquidez"], c: 0, e: "Alto no significa caro, significa que el mercado paga por algo que hay que verificar." },
  { q: "En un LBO, junto con el crecimiento del EBITDA, el motor principal de retorno es", o: ["el repago de deuda con caja", "la reducción de impuestos", "el aumento de capital de trabajo"], c: 0, e: "Cada dólar de deuda amortizada se convierte en equity para el fondo." },
  { q: "La curva de rendimientos se invierte. Históricamente se ha leído como señal de", o: ["desaceleración o recesión por delante", "expansión acelerada", "inflación controlada"], c: 0, e: "No es infalible, pero es de los indicadores con mejor historial." },
  { q: "Un aumento de capital sin derecho de preferencia afecta al accionista actual porque", o: ["diluye su participación", "reduce el valor de la empresa", "aumenta la deuda"], c: 0, e: "El pastel puede crecer, pero tu tajada se achica." },
  { q: "Un covenant exige EBITDA sobre intereses mayor a tres. Si las tasas suben", o: ["el covenant se aprieta", "el covenant se relaja", "el covenant no se mueve"], c: 0, e: "Sube el denominador y la empresa se acerca al incumplimiento sin haber vendido menos." },
  { q: "En un earn out, parte del precio se paga", o: ["contra resultados futuros del negocio", "por adelantado en efectivo", "siempre en acciones del comprador"], c: 0, e: "Sirve para cerrar la brecha entre lo que el vendedor cree que vale y lo que el comprador paga hoy." },
  { q: "El costo del capital propio comparado con el costo de la deuda de la misma empresa", o: ["es mayor", "es menor", "es igual"], c: 0, e: "El accionista cobra último, así que exige más." },
  { q: "Una empresa con flujo de caja libre negativo y utilidad contable positiva probablemente", o: ["está financiando capital de trabajo o inversión", "está inflando ingresos siempre", "no tiene deuda"], c: 0, e: "No es fraude por definición, pero es la primera pregunta que hay que hacer." },
  { q: "Regla del cuatro por ciento: para retirar cuarenta mil al año necesitas un patrimonio de", o: ["un millón", "cuatrocientos mil", "cuatro millones"], c: 0, e: "Es una regla gruesa, pero sirve para saber cuánto te falta." },
  { q: "Si tu portafolio cae cincuenta por ciento, para volver al punto de partida necesitas", o: ["subir cien por ciento", "subir cincuenta por ciento", "subir setenta y cinco por ciento"], c: 0, e: "La asimetría de las pérdidas es la razón por la que se cuida la caída máxima." },
];


/* ============================================================
   LA ESCALERA: EL TEMARIO CRECE CONTIGO
   nv 1 arranca en la plata de todos los días y nv 5 termina donde
   se discuten estructuras. El examen de cada año pesca del nivel que
   te toca, con algo del anterior para repasar y algo del siguiente
   para que siempre haya una pregunta que todavía no sabías.
   ============================================================ */

/* ---------- nivel 1: la base que nadie te enseña ---------- */
const BANCO0 = [
  { q: "Inviertes mil dólares al diez por ciento anual. A los dos años tienes", o: ["1.210", "1.200", "1.100"], c: 0, e: "El segundo año la tasa se aplica también sobre los cien que ganaste. Eso es interés compuesto." },
  { q: "Un fondo de emergencia razonable equivale a", o: ["tres a seis meses de tus gastos en algo líquido", "un año de tu sueldo bruto invertido en acciones", "lo que sobre a fin de mes"], c: 0, e: "Su función no es rendir, es evitar que vendas tus inversiones en el peor momento." },
  { q: "Tienes deuda de tarjeta al cuarenta por ciento anual y una inversión que rinde ocho. Lo primero es", o: ["pagar la tarjeta", "invertir y pagar el mínimo", "repartir mitad y mitad"], c: 0, e: "Cancelar deuda al cuarenta es un retorno garantizado del cuarenta. No existe inversión que compita con eso." },
  { q: "La inflación del año fue treinta por ciento y tu sueldo subió diez. En términos reales", o: ["perdiste poder de compra", "ganaste diez por ciento", "quedaste igual"], c: 0, e: "El sueldo nominal sube y el real baja. Es la trampa más común en economías con inflación alta." },
  { q: "Guardar el ahorro en efectivo bajo el colchón durante diez años de inflación alta", o: ["destruye casi todo su valor real", "es la opción más segura", "solo pierde si hay devaluación"], c: 0, e: "El efectivo parece no tener riesgo porque el número no cambia. El poder de compra sí." },
  { q: "Para alguien de veinte años, lo que más determina su patrimonio a los cincuenta es", o: ["cuánto ahorra y por cuántos años", "qué acciones elige", "cuándo entra al mercado"], c: 0, e: "El tiempo y la tasa de ahorro le ganan a la selección de activos en casi cualquier simulación." },
  { q: "La forma más efectiva de ahorrar de verdad es", o: ["separar el ahorro el día que cobras", "guardar lo que sobre a fin de mes", "esperar un bono grande"], c: 0, e: "Lo que sobra a fin de mes casi nunca sobra. Págate a ti primero y vive con el resto." },
  { q: "Poner todo tu ahorro en acciones de la empresa donde trabajas es riesgoso porque", o: ["tu sueldo y tu patrimonio dependen de lo mismo", "las acciones propias rinden menos", "no se pueden vender"], c: 0, e: "Si la empresa cae, pierdes el empleo y el ahorro el mismo día. Es la concentración más peligrosa que existe." },
  { q: "Que un fondo haya rendido mucho los últimos tres años", o: ["no dice casi nada sobre los próximos tres", "garantiza que seguirá rindiendo", "significa que su gestor es mejor"], c: 0, e: "La persistencia del buen desempeño es baja. Lo que sí persiste son las comisiones." },
  { q: "Financiar a cuotas un bien que pierde valor con los años", o: ["te deja pagando intereses por algo que vale menos cada mes", "es indiferente si la cuota te alcanza", "conviene si la tasa es fija"], c: 0, e: "Pagas intereses sobre un activo que se deprecia. La cuota alcanza y el patrimonio igual baja." },
  { q: "En términos financieros, un activo es", o: ["algo que produce flujo o puede venderse por más", "todo lo que compraste", "todo lo que tiene valor sentimental"], c: 0, e: "El carro que usas y mantienes no es un activo por más que costara mucho." },
  { q: "Un plazo fijo paga doce por ciento y la inflación es veinte. Tu tasa real es", o: ["negativa, alrededor de menos ocho", "positiva, doce", "cero"], c: 0, e: "Ganar en nominal y perder en real es la forma más silenciosa de empobrecerse." },
  { q: "De estas cuatro cosas, la que puedes convertir en efectivo más rápido es", o: ["un fondo del mercado de dinero", "un apartamento", "una participación en un negocio familiar"], c: 0, e: "La liquidez es qué tan rápido vendes sin castigar el precio. Casi nadie la valora hasta que la necesita." },
  { q: "Si alguien te ofrece retornos altos sin riesgo y de forma garantizada", o: ["algo está mal en la promesa", "hay que entrar rápido", "conviene si es alguien conocido"], c: 0, e: "Retorno alto sin riesgo no existe. El riesgo está ahí, solo que no lo estás viendo." },
  { q: "Un seguro tiene sentido cuando", o: ["el evento es improbable pero te arruinaría", "el evento es frecuente y barato", "quieres invertir con ventaja"], c: 0, e: "Se asegura lo catastrófico, no lo molesto. Mezclar seguro con inversión suele salir caro." },
  { q: "Aportar la misma cantidad todos los meses sin importar el precio", o: ["te evita tener que adivinar el momento de entrar", "garantiza mejor retorno que entrar de golpe", "solo funciona en mercados alcistas"], c: 0, e: "No maximiza el retorno esperado, pero elimina la peor decisión: no entrar nunca por miedo." },
  { q: "Regla del setenta y dos: al nueve por ciento anual, tu capital se duplica en cerca de", o: ["ocho años", "doce años", "cinco años"], c: 0, e: "Setenta y dos entre la tasa da los años. Sirve para hacer la cuenta sin calculadora." },
  { q: "El costo de oportunidad de dejar veinte mil parados en la cuenta corriente durante diez años es", o: ["todo lo que habrían rendido invertidos", "cero, porque no perdiste nada", "solo la inflación de un año"], c: 0, e: "Lo que no hiciste con el dinero también cuenta, aunque nunca aparezca en un estado de cuenta." },
  { q: "En un país con devaluación recurrente, ahorrar en moneda local a largo plazo", o: ["te expone a perder valor frente a la moneda dura", "es más seguro porque es tu moneda", "solo importa si viajas"], c: 0, e: "Tus gastos futuros grandes suelen estar indexados al dólar aunque los pagues en local." },
  { q: "Dos fondos con la misma estrategia, uno cobra cero coma dos por ciento al año y el otro dos. En treinta años", o: ["la diferencia de comisión se come una parte enorme del capital final", "la diferencia es marginal", "gana el más caro por mejor gestión"], c: 0, e: "La comisión se compone igual que el retorno, solo que en tu contra y con total certeza." },
  { q: "Antes de invertir en algo, la primera pregunta debería ser", o: ["cómo pierdo dinero en esto", "cuánto puedo ganar", "quién más está entrando"], c: 0, e: "Si no puedes explicar el escenario en que pierdes, todavía no entiendes la inversión." },
];

/* ---------- niveles 2 a 5 ---------- */
const BANCO3 = [
  /* nivel 2 */
  { nv: 2, q: "Una acción que reparte dividendo el precio, en teoría, el día que se descuenta", o: ["baja aproximadamente el monto del dividendo", "sube por la buena noticia", "no se mueve"], c: 0, e: "El dividendo no es dinero gratis: sale de la empresa que acabas de comprar." },
  { nv: 2, q: "Un fondo indexado se diferencia de uno activo principalmente en que", o: ["replica un índice y cobra mucho menos", "solo invierte en bonos", "garantiza el retorno del mercado"], c: 0, e: "Replicar es barato. Intentar superar el índice cuesta, y en promedio no compensa." },
  { nv: 2, q: "Un split de acciones dos por uno", o: ["no cambia el valor de tu posición", "duplica tu patrimonio", "reduce el capital de la empresa"], c: 0, e: "Tienes el doble de acciones a la mitad de precio. Puro cambio cosmético." },
  { nv: 2, q: "Un bono cupón cero paga", o: ["nada hasta el vencimiento, y se compra con descuento", "un cupón fijo cada semestre", "un cupón variable"], c: 0, e: "Todo el retorno está en la diferencia entre lo que pagas y el valor nominal al final." },
  { nv: 2, q: "En una hipoteca a tasa variable, si las tasas suben", o: ["sube tu cuota", "baja tu cuota", "cambia el plazo pero no la cuota"], c: 0, e: "Trasladas el riesgo de tasa a tu presupuesto mensual. La tasa fija cuesta más precisamente por eso." },
  { nv: 2, q: "El precio de un bono en el mercado secundario se mueve", o: ["en dirección contraria a las tasas de interés", "igual que las tasas", "solo con la calificación"], c: 0, e: "Si aparecen bonos nuevos que pagan más, el tuyo solo se vende más barato." },
  { nv: 2, q: "Un ETF y un fondo mutuo se diferencian sobre todo en que el ETF", o: ["se compra y vende en bolsa durante la sesión", "no cobra comisiones", "solo invierte en acciones"], c: 0, e: "La liquidez intradía es la ventaja operativa, y también la tentación de operar de más." },
  { nv: 2, q: "La correlación entre dos activos mide", o: ["si tienden a moverse en la misma dirección", "cuál rinde más", "su volatilidad conjunta"], c: 0, e: "Diversificar bien es juntar cosas que no se caen el mismo día." },
  { nv: 2, q: "La tasa de capitalización de un inmueble es", o: ["la renta neta anual dividida entre el precio", "el retorno total incluyendo la venta", "la tasa de la hipoteca"], c: 0, e: "Es el rendimiento del flujo sin considerar apreciación ni apalancamiento." },
  { nv: 2, q: "Comprar acciones con dinero prestado del bróker", o: ["amplifica ganancias y pérdidas y puede forzarte a vender abajo", "reduce el riesgo por diversificación", "solo cuesta la comisión"], c: 0, e: "La llamada de margen llega justo cuando menos quieres vender. Ese es el problema real del apalancamiento." },
  { nv: 2, q: "La utilidad bruta se obtiene de", o: ["ingresos menos costo de ventas", "ingresos menos todos los gastos", "EBITDA menos depreciación"], c: 0, e: "Es el primer filtro: cuánto queda de cada venta antes de la estructura de la empresa." },
  { nv: 2, q: "El margen EBITDA de una empresa cae de veinte a doce por ciento en un año. Lo primero que se revisa es", o: ["si subieron los costos o bajaron los precios", "el nivel de deuda", "la política de dividendos"], c: 0, e: "El margen es operativo. Si se rompe, el problema está en el negocio, no en el balance." },
  { nv: 2, q: "El flujo de caja operativo puede ser negativo con utilidad positiva porque", o: ["la utilidad se registra al vender, no al cobrar", "la contabilidad está mal hecha", "hay demasiada depreciación"], c: 0, e: "Vender no es cobrar. Muchas empresas quiebran creciendo." },
  { nv: 2, q: "Diversificar entre veinte acciones del mismo sector", o: ["reduce poco el riesgo, porque comparten el mismo motor", "elimina el riesgo específico", "es equivalente a un índice global"], c: 0, e: "Veinte bancos siguen siendo una apuesta a la banca." },
  { nv: 2, q: "Si el dólar se aprecia frente a tu moneda local, tus inversiones en dólares medidas en moneda local", o: ["ganan valor", "pierden valor", "no cambian"], c: 0, e: "El tipo de cambio es un componente de retorno, no un detalle contable." },
  { nv: 2, q: "Reinvertir los dividendos en lugar de gastarlos", o: ["acelera el efecto compuesto", "reduce el retorno por comisiones", "es indiferente en el largo plazo"], c: 0, e: "Buena parte del retorno histórico de la bolsa viene de dividendos reinvertidos, no del precio." },
  { nv: 2, q: "Una empresa con deuda a tasa fija en un entorno de inflación alta", o: ["se beneficia, porque paga con dinero que vale menos", "se perjudica siempre", "queda indiferente"], c: 0, e: "La inflación licua la deuda nominal. Por eso los acreedores exigen tasas más altas cuando la esperan." },
  { nv: 2, q: "Vender en pánico durante una caída del treinta por ciento", o: ["convierte una pérdida en papel en una pérdida definitiva", "protege el capital", "es lo que recomienda la teoría"], c: 0, e: "El mayor costo de una cartera agresiva no es su volatilidad, es lo que su dueño hace cuando la ve caer." },
  { nv: 2, q: "El valor libro de una empresa es", o: ["activos menos pasivos según contabilidad", "su valor de mercado", "el precio de sus acciones"], c: 0, e: "Es una foto contable, no una valoración. En negocios de servicios suele decir muy poco." },
  { nv: 2, q: "Un país sube su tasa de referencia bruscamente. En el corto plazo su moneda tiende a", o: ["fortalecerse", "debilitarse", "no reaccionar"], c: 0, e: "Tasas más altas atraen capital de corto plazo. El efecto sobre la economía real viene después." },

  /* nivel 3 */
  { nv: 3, q: "En el CAPM, el retorno exigido a una acción depende de", o: ["la tasa libre de riesgo, su beta y la prima de mercado", "su volatilidad total", "su crecimiento histórico"], c: 0, e: "Solo se paga por el riesgo que no puedes diversificar. El resto es tu problema." },
  { nv: 3, q: "El WACC se usa para descontar", o: ["el flujo de caja libre a la firma", "el flujo al accionista", "la utilidad neta"], c: 0, e: "Tasa y flujo tienen que hablar el mismo idioma: si el flujo es para todos, la tasa también." },
  { nv: 3, q: "En un DCF, bajar el crecimiento perpetuo de tres a dos por ciento", o: ["reduce el valor terminal de forma significativa", "casi no afecta", "sube el valor por prudencia"], c: 0, e: "El valor terminal es la parte más sensible y la más discutible de cualquier valoración." },
  { nv: 3, q: "Dos empresas idénticas, una cotiza a ocho veces EBITDA y otra a catorce. Lo primero que hay que buscar es", o: ["por qué el mercado paga más por una", "cuál está barata para comprar", "el error en el múltiplo"], c: 0, e: "El múltiplo es una respuesta, no un dato. La pregunta es qué cree el mercado que va a pasar." },
  { nv: 3, q: "La convexidad de un bono explica que", o: ["la duración subestima la subida de precio cuando las tasas caen", "el precio es lineal en la tasa", "el cupón cambia con la tasa"], c: 0, e: "Ganas más cuando bajan las tasas de lo que pierdes cuando suben lo mismo. La convexidad se paga." },
  { nv: 3, q: "El spread de crédito de un bono corporativo compensa principalmente", o: ["riesgo de impago y de liquidez", "riesgo de tasa", "el impuesto a la renta"], c: 0, e: "Si el spread se cierra mucho, te están pagando poco por asumir el mismo riesgo." },
  { nv: 3, q: "Una recompra de acciones, con todo lo demás igual", o: ["sube la utilidad por acción sin mejorar el negocio", "aumenta el patrimonio contable", "reduce el riesgo operativo"], c: 0, e: "Puede crear valor si la acción está barata y destruirlo si está cara. No es buena noticia por sí sola." },
  { nv: 3, q: "En un LBO, el retorno del capital viene de tres motores: crecimiento del EBITDA, repago de deuda y", o: ["expansión del múltiplo de salida", "el ahorro fiscal del carry", "la comisión de administración"], c: 0, e: "De los tres, el múltiplo es el único que no controlas. Apostar a él es apostar al mercado." },
  { nv: 3, q: "La TIR de un proyecto puede engañar cuando", o: ["hay flujos de signo alternado o escalas distintas", "el proyecto es de largo plazo", "la tasa de descuento es alta"], c: 0, e: "Puede haber varias TIR o ninguna. El VAN no tiene ese problema." },
  { nv: 3, q: "Un aumento del capital de trabajo en el flujo de caja", o: ["resta caja", "suma caja", "es neutro"], c: 0, e: "Crecer consume caja antes de generarla. Por eso las empresas que crecen rápido se financian." },
  { nv: 3, q: "Una empresa cíclica se valora mejor con", o: ["múltiplos sobre utilidades normalizadas del ciclo", "el EBITDA del último año", "el crecimiento de los últimos tres años"], c: 0, e: "Valorar el pico del ciclo como si fuera permanente es el error clásico en commodities." },
  { nv: 3, q: "El arbitraje de fusión consiste en", o: ["comprar el objetivo y capturar el descuento hasta el cierre", "vender el comprador en corto siempre", "operar el rumor antes del anuncio"], c: 0, e: "Ese descuento es el precio del riesgo de que el deal se caiga, no dinero gratis." },
  { nv: 3, q: "El carry trade consiste en endeudarse en una moneda de tasa baja para invertir en una de tasa alta. Su riesgo principal es", o: ["que la moneda de tasa alta se devalúe de golpe", "que suban las tasas bajas", "el costo de transacción"], c: 0, e: "Gana poco durante años y devuelve todo en una semana. La distribución no es simétrica." },
  { nv: 3, q: "Un covenant de mantenimiento de deuda neta sobre EBITDA se prueba", o: ["cada período, sin importar lo que haga la empresa", "solo si se emite nueva deuda", "solo al vencimiento"], c: 0, e: "Es el que aprieta en la recesión, porque el EBITDA baja aunque no hayas hecho nada." },
  { nv: 3, q: "En una emisión de acciones con descuento fuerte sobre el precio de mercado, el accionista que no participa", o: ["se diluye y pierde valor", "queda igual", "gana por el aumento de capital"], c: 0, e: "El derecho de preferencia existe exactamente para evitar eso." },
  { nv: 3, q: "Las sinergias de costos en una fusión suelen valorarse con", o: ["descuento y ajustadas por costos de implementación", "el monto completo desde el año uno", "un múltiplo del EBITDA combinado"], c: 0, e: "Cerrar una planta cuesta dinero antes de ahorrarlo, y casi siempre tarda más de lo prometido." },
  { nv: 3, q: "El goodwill aparece en el balance cuando", o: ["se paga por una empresa más que su valor razonable de activos netos", "una empresa es muy rentable", "se revalúa un inmueble"], c: 0, e: "Un deterioro de goodwill años después es la confesión contable de haber pagado de más." },
  { nv: 3, q: "La curva de rendimientos empinada suele indicar", o: ["expectativa de crecimiento e inflación por delante", "recesión inminente", "política monetaria restrictiva"], c: 0, e: "Empinada compensa por esperar; invertida dice que el mercado espera recortes por debilidad." },

  /* nivel 4 */
  { nv: 4, q: "El delta de una opción de compra mide", o: ["cuánto cambia su precio si el subyacente se mueve una unidad", "su valor temporal", "la volatilidad implícita"], c: 0, e: "Es la primera derivada y también la cobertura: delta 0,6 significa cubrir con seis décimos del subyacente." },
  { nv: 4, q: "El theta de una opción comprada", o: ["juega en contra: pierde valor con el paso del tiempo", "juega a favor", "solo actúa al vencimiento"], c: 0, e: "El comprador de opciones paga alquiler por el tiempo. El vendedor lo cobra." },
  { nv: 4, q: "Comprar una put sobre tu cartera equivale a", o: ["pagar una prima por un piso de pérdida", "eliminar el riesgo sin costo", "apalancar la posición"], c: 0, e: "Es un seguro con prima. Si lo compras todos los años, el costo acumulado se nota." },
  { nv: 4, q: "Un collar sobre una posición consiste en", o: ["comprar una put y financiarla vendiendo una call", "vender put y call a la vez", "comprar dos calls"], c: 0, e: "Renuncias al upside por encima de un nivel para pagar el seguro. Es lo que hace un ejecutivo con acciones restringidas." },
  { nv: 4, q: "En un swap de tasa, quien recibe fija y paga variable se beneficia si", o: ["las tasas suben menos de lo que descontaba la curva", "las tasas suben mucho", "la curva se empina"], c: 0, e: "El swap se valora contra la curva forward, no contra la tasa de hoy. Ahí se equivoca casi todo el mundo." },
  { nv: 4, q: "Un credit default swap paga cuando", o: ["ocurre un evento de crédito del emisor de referencia", "el precio del bono cae", "sube el spread"], c: 0, e: "Es un seguro sobre el impago, y su prima cotiza como termómetro del riesgo de crédito." },
  { nv: 4, q: "En una titulización, el tramo equity", o: ["absorbe las primeras pérdidas y paga más", "cobra antes que el senior", "tiene calificación más alta"], c: 0, e: "La estructura reparte el mismo riesgo en pedazos con distinta prelación. Nada desaparece, solo cambia de manos." },
  { nv: 4, q: "Una operación de repo es económicamente", o: ["un préstamo con colateral de títulos", "una venta definitiva", "un derivado de crédito"], c: 0, e: "Vendes hoy y recompras mañana a precio pactado. Es la plomería del financiamiento de corto plazo." },
  { nv: 4, q: "El VaR al noventa y nueve por ciento a un día te dice", o: ["la pérdida que solo se supera uno de cada cien días", "la pérdida máxima posible", "la volatilidad anual"], c: 0, e: "No dice nada sobre cuánto pierdes ese día que sí se supera, y ahí está el problema." },
  { nv: 4, q: "El tracking error de un fondo mide", o: ["cuánto se desvía del índice que sigue", "su retorno absoluto", "su comisión"], c: 0, e: "Un fondo activo con tracking error mínimo cobra comisión activa por replicar el índice." },
  { nv: 4, q: "En una cascada de fondo, el catch-up del gestor sirve para", o: ["recuperar su veinte por ciento después del retorno preferente", "cobrar antes que los LP", "cubrir gastos operativos"], c: 0, e: "Sin catch-up, el preferente le regalaría al LP esa porción de las ganancias." },
  { nv: 4, q: "Un fondo con TIR alta y MOIC bajo probablemente", o: ["salió rápido de posiciones pequeñas", "generó mucho valor absoluto", "tuvo pérdidas realizadas"], c: 0, e: "La TIR premia la velocidad. El MOIC mide cuánto dinero de verdad devolviste." },
  { nv: 4, q: "La prima de iliquidez existe porque", o: ["el inversionista exige más por no poder salir cuando quiera", "los activos ilíquidos rinden más por definición", "no hay valoraciones diarias"], c: 0, e: "Parte de esa prima es real y parte es solo la ausencia de precio que te haga sentir la volatilidad." },
  { nv: 4, q: "Cubrir una inversión en dólares a moneda local cuesta aproximadamente", o: ["el diferencial de tasas entre las dos monedas", "la comisión del banco", "la volatilidad del par"], c: 0, e: "Si la tasa local es mucho más alta, cubrirse te come casi todo el retorno esperado." },
  { nv: 4, q: "Un forward no entregable se usa cuando", o: ["la moneda tiene controles de cambio y se liquida la diferencia en dólares", "no hay contraparte", "el plazo es muy corto"], c: 0, e: "Es la forma estándar de tomar riesgo cambiario en mercados cerrados." },
  { nv: 4, q: "Retener impuesto en la fuente sobre dividendos de una inversión extranjera", o: ["reduce tu retorno neto y a veces se acredita en tu país", "no afecta al inversionista final", "solo aplica a fondos"], c: 0, e: "Dos carteras idénticas pueden rendir distinto solo por el tratado tributario que aplica." },
  { nv: 4, q: "El Sharpe de una estrategia sube al reducir su volatilidad. Eso es engañoso cuando", o: ["la estrategia tiene pérdidas raras y enormes", "el activo es líquido", "el período es largo"], c: 0, e: "Vender seguros contra terremotos tiene un Sharpe espectacular hasta el terremoto." },
  { nv: 4, q: "Un factor de inversión como value o momentum es", o: ["una característica que históricamente explicó retornos por encima del mercado", "un indicador técnico", "un sector"], c: 0, e: "Los factores pasan por décadas malas. Abandonarlos justo entonces es cómo se pierde con ellos." },

  /* nivel 5 */
  { nv: 5, q: "Un título hipotecario con opción de prepago tiene convexidad negativa porque", o: ["si las tasas caen, los deudores prepagan y te quedas sin el bono bueno", "su duración es fija", "el cupón es variable"], c: 0, e: "Ganas menos cuando bajan las tasas y pierdes lo mismo cuando suben. Por eso paga más." },
  { nv: 5, q: "Un bono contingente convertible de un banco puede", o: ["convertirse en acciones o amortizarse si el capital cae bajo un umbral", "prepagarse a voluntad del tenedor", "convertirse solo al vencimiento"], c: 0, e: "El inversionista absorbe pérdidas antes del contribuyente. Ese es todo el diseño." },
  { nv: 5, q: "El riesgo de secuencia de retornos afecta sobre todo a", o: ["quien empieza a retirar justo cuando el mercado cae", "quien está acumulando capital", "quien invierte solo en bonos"], c: 0, e: "El mismo retorno promedio en distinto orden puede dejarte sin capital. El orden importa cuando ya estás retirando." },
  { nv: 5, q: "Una regla de retiro dinámica, que baja el gasto en años malos", o: ["permite sostener un retiro inicial mayor que la regla fija", "es más riesgosa que la regla fija", "solo aplica a carteras de bonos"], c: 0, e: "Flexibilizar el gasto es la palanca más potente y la menos usada en planificación de retiro." },
  { nv: 5, q: "Una aseguradora de vida calza activos y pasivos principalmente para", o: ["que el flujo de sus inversiones llegue cuando toca pagar", "maximizar retorno", "reducir impuestos"], c: 0, e: "El descalce de duración es lo que quiebra aseguradoras, no la mala selección de activos." },
  { nv: 5, q: "Un mercado de futuros en contango implica que", o: ["el precio futuro está por encima del spot y rolar cuesta", "el spot está por encima del futuro", "no hay costo de almacenamiento"], c: 0, e: "Un fondo que sigue un commodity en contango pierde en cada rolo aunque el spot no se mueva." },
  { nv: 5, q: "La diferencia entre liquidez de mercado y liquidez de fondeo es que la segunda", o: ["es tu capacidad de financiar la posición mientras la mantienes", "depende del volumen del activo", "solo aplica a bancos"], c: 0, e: "Puedes tener razón en la tesis y quebrar igual porque no aguantaste el margen." },
  { nv: 5, q: "Las cláusulas de acción colectiva en un bono soberano permiten que", o: ["una mayoría de acreedores imponga la reestructuración a los demás", "el país reduzca el cupón a voluntad", "el acreedor exija pago anticipado"], c: 0, e: "Existen para evitar que un solo acreedor litigante bloquee un acuerdo con el resto." },
  { nv: 5, q: "Un dividend recap consiste en", o: ["endeudar la empresa para pagarle un dividendo al fondo dueño", "reinvertir dividendos en la empresa", "convertir deuda en capital"], c: 0, e: "Devuelve capital al fondo antes de la venta y deja a la empresa más frágil. La TIR mejora, el negocio no." },
  { nv: 5, q: "Una nota PIK toggle permite al emisor", o: ["pagar intereses con más deuda en vez de efectivo", "diferir el capital al final", "convertir a acciones"], c: 0, e: "Alivia la caja hoy y capitaliza el problema. Suele aparecer cuando la estructura ya viene apretada." },
  { nv: 5, q: "Un fondo de continuación se usa cuando", o: ["el gestor mueve activos a un vehículo nuevo para dar liquidez a los LP viejos", "se liquida el fondo", "se levanta capital para el primer fondo"], c: 0, e: "El gestor está a los dos lados del precio. Ahí el comité independiente no es un formalismo." },
  { nv: 5, q: "Un préstamo contra el valor neto de un fondo, en lugar de contra sus empresas", o: ["apalanca la cartera completa y adelanta distribuciones", "reduce el riesgo del fondo", "sustituye al capital comprometido"], c: 0, e: "Adelanta liquidez y añade un nivel de deuda que el LP muchas veces no estaba modelando." },
  { nv: 5, q: "Cubrir la cola de una cartera comprando puts muy fuera del dinero de forma permanente", o: ["tiene un costo esperado alto y solo compensa si el shock llega", "es gratis en promedio", "sustituye a la diversificación"], c: 0, e: "La cobertura de cola es un gasto, no una inversión. Se justifica por lo que te permite hacer el resto del tiempo." },
  { nv: 5, q: "En dimensionamiento de posiciones, apostar demasiado incluso teniendo ventaja estadística", o: ["puede llevarte a la ruina antes de que la ventaja se manifieste", "maximiza el retorno de largo plazo", "es indiferente si la ventaja es real"], c: 0, e: "Tener razón no sirve si el tamaño te saca del juego en el camino." },
  { nv: 5, q: "El efecto disposición describe la tendencia a", o: ["vender lo que ganó y aguantar lo que perdió", "comprar lo que sube", "operar demasiado"], c: 0, e: "Convierte una cartera en una colección de errores no reconocidos." },
  { nv: 4, q: "El gamma de una posición corta en opciones implica que", o: ["tu cobertura se deteriora justo cuando el mercado se mueve fuerte", "el delta se mantiene estable", "el theta juega en contra"], c: 0, e: "Vender opciones es cobrar poco muchas veces y pagar mucho una vez. El gamma corto es esa factura." },
  { nv: 4, q: "La paridad put call dice que una call comprada más un bono equivale a", o: ["la acción más una put comprada", "una put vendida", "dos acciones"], c: 0, e: "Si la relación se rompe hay arbitraje, y por eso casi nunca se rompe." },
  { nv: 4, q: "La sonrisa de volatilidad muestra que el mercado", o: ["cobra más por las opciones muy fuera del dinero", "asume distribución normal", "ignora los eventos extremos"], c: 0, e: "El propio precio de las opciones admite que las colas son más gordas de lo que dice el modelo." },
  { nv: 4, q: "Un swap de divisas cruzado sirve para", o: ["convertir deuda de una moneda a otra durante toda su vida", "especular con la tasa local", "cubrir solo el cupón"], c: 0, e: "Es cómo una empresa emite en dólares y termina pagando en su moneda sin quedarse expuesta." },
  { nv: 4, q: "Cuando el spread de crédito de un bono se amplía y las tasas bajan a la vez, el precio", o: ["puede caer si el crédito domina el movimiento", "sube siempre", "no se mueve"], c: 0, e: "El rendimiento tiene dos partes y pueden ir en direcciones opuestas. Solo importa la suma." },
  { nv: 4, q: "Un fondo que reporta valoraciones trimestrales de activos ilíquidos muestra", o: ["volatilidad artificialmente baja", "el riesgo real de la estrategia", "más riesgo que el mercado listado"], c: 0, e: "No ver el precio no es no tener riesgo. Se llama suavizado de retornos y engaña a los ratios." },
  { nv: 4, q: "El apalancamiento de una posición con derivados se mide mejor por", o: ["la exposición nocional frente al capital", "el margen inicial exigido", "la prima pagada"], c: 0, e: "Con poco margen puedes mover una exposición enorme, y eso es lo que decide si sobrevives al movimiento." },
  { nv: 4, q: "En un préstamo sindicado, el banco agente", o: ["organiza y administra el crédito entre varios prestamistas", "asume todo el riesgo", "garantiza el repago"], c: 0, e: "Reparte el riesgo entre varios y cobra por coordinar. El riesgo no desaparece, se distribuye." },
  { nv: 4, q: "Una emisión con calificación en el límite del grado de inversión es sensible porque", o: ["si baja un escalón, muchos fondos están obligados a venderla", "paga menos cupón", "no tiene mercado secundario"], c: 0, e: "La venta forzada por mandato es la razón por la que ese escalón mueve tanto el precio." },
  { nv: 4, q: "Un inversionista que exige retornos en dólares en un país con inflación alta debe medir el desempeño", o: ["en moneda dura y después de inflación", "en moneda local nominal", "contra el índice local"], c: 0, e: "Ganarle a la inflación local en pesos puede ser perder la mitad medido en dólares." },
  { nv: 5, q: "El descalce entre activos ilíquidos y pasivos rescatables a la vista es peligroso porque", o: ["una ola de rescates fuerza a vender lo bueno primero", "reduce el retorno esperado", "aumenta las comisiones"], c: 0, e: "El que sale primero cobra a valor de libro y el que se queda hereda lo ilíquido. De ahí las ventanas de rescate." },
  { nv: 5, q: "En una reestructuración de deuda corporativa, un intercambio con quita del cuarenta por ciento", o: ["reconoce que el negocio no soporta la deuda original", "mejora la calificación de inmediato", "no afecta a los accionistas"], c: 0, e: "Si el equity sobrevive intacto a una quita, alguien negoció mal, y casi nunca es el acreedor garantizado." },
  { nv: 5, q: "El costo de capital de un proyecto en un país con riesgo soberano alto debería reflejar", o: ["riesgo país, moneda y riesgo específico del proyecto por separado", "solo la tasa local", "el mismo WACC de la matriz"], c: 0, e: "Sumar todo en un número redondo es lo que hace que proyectos malos parezcan aprobables." },
  { nv: 5, q: "Al valorar una empresa con opciones sobre acciones a empleados, el efecto correcto es", o: ["tratarlas como dilución futura y descontarla hoy", "ignorarlas hasta que se ejerzan", "sumarlas al efectivo"], c: 0, e: "Es una transferencia real de valor del accionista al empleado, y muchas veces la única forma de que el flujo se sostenga." },
  { nv: 5, q: "Un fondo que rinde uno por ciento mensual con volatilidad casi nula durante años", o: ["merece revisar cómo valora y quién custodia los activos", "es un gestor excepcional", "está tomando poco riesgo"], c: 0, e: "La ausencia de volatilidad no existe en activos con riesgo. Cuando aparece, suele estar en la contabilidad." },
  { nv: 5, q: "En un mandato con comisión de éxito sin marca de agua, el gestor", o: ["puede cobrar por recuperar pérdidas que él mismo generó", "solo cobra sobre nuevos máximos", "no cobra si hay pérdidas"], c: 0, e: "La marca de agua existe justo para evitar cobrar dos veces la misma ganancia." },
  { nv: 5, q: "El principal argumento contra apalancar una cartera diversificada para subir el retorno es", o: ["que el margen te fuerza a vender en el peor momento", "que baja el retorno esperado", "que la diversificación desaparece"], c: 0, e: "La aritmética funciona; la secuencia de precios es la que te saca del juego antes del final." },
  { nv: 5, q: "Un contrato con cláusula de cambio material adverso permite", o: ["al comprador retirarse si el negocio se deteriora antes del cierre", "renegociar el precio siempre", "extender el plazo indefinidamente"], c: 0, e: "Se litiga mucho y se gana poco: los tribunales exigen un deterioro duradero, no un mal trimestre." },
  { nv: 5, q: "Al medir el desempeño de una cartera contra un índice, el error más común es", o: ["comparar contra un índice que no refleja el riesgo asumido", "usar retornos netos", "medir en períodos largos"], c: 0, e: "Ganarle al índice equivocado es la forma más elegante de no rendir cuentas." },
  { nv: 5, q: "La razón de fondo por la que casi ninguna estrategia mantiene su ventaja durante décadas es", o: ["que el capital que la persigue elimina el retorno que la justificaba", "que los mercados dejan de moverse", "que los modelos envejecen"], c: 0, e: "Toda ineficiencia se cierra cuando suficiente dinero la explota. Por eso el oficio nunca deja de exigir criterio nuevo." },
  { nv: 5, q: "En una reestructuración, el acreedor con garantía sobre el activo clave del negocio", o: ["tiene el poder real de negociación aunque sea minoritario", "cobra igual que los demás", "pierde su garantía en el proceso"], c: 0, e: "En una quiebra no manda quien tiene más deuda, manda quien controla el activo sin el cual no hay negocio." },
  { nv: 5, q: "Aplicar una tasa de descuento única a un negocio con divisiones de riesgo muy distinto", o: ["sobrevalora la división riesgosa y subvalora la estable", "es la práctica correcta", "solo afecta al valor terminal"], c: 0, e: "Por eso se valora por suma de partes cuando los negocios no se parecen." },
];

/* ---------- señales para el semáforo ---------- */
const SENALES = [
  { t: "El banco central recorta tasas", a: "comprar" },
  { t: "La inflación se dispara", a: "vender" },
  { t: "Default soberano confirmado", a: "vender" },
  { t: "Utilidades muy por encima de lo esperado", a: "comprar" },
  { t: "Rebaja de calificación crediticia", a: "vender" },
  { t: "Mejora de calificación crediticia", a: "comprar" },
  { t: "Anuncian recompra de acciones", a: "comprar" },
  { t: "Aumento de capital fuertemente dilutivo", a: "vender" },
  { t: "Fusión anunciada con prima del cuarenta por ciento", a: "comprar" },
  { t: "Renuncia sorpresiva del director financiero", a: "vender" },
  { t: "El desempleo sube tres meses seguidos", a: "vender" },
  { t: "Acuerdo comercial firmado", a: "comprar" },
  { t: "Investigación del regulador por contabilidad", a: "vender" },
  { t: "Contrato de suministro a diez años firmado", a: "comprar" },
  { t: "Se levanta un bloqueo a las exportaciones", a: "comprar" },
  { t: "Controles de capital de un día para otro", a: "vender" },
  { t: "Descubren un yacimiento en un campo propio", a: "comprar" },
  { t: "Incumplen un covenant financiero", a: "vender" },
];

/* ---------- secuencias para poner en orden ---------- */
const ORDENES = [
  { t: "Prelación de cobro en una liquidación, del que cobra primero al último", l: ["Acreedores garantizados", "Acreedores quirografarios", "Deuda subordinada", "Accionistas"] },
  { t: "De menor a mayor riesgo", l: ["Letras del tesoro", "Bono corporativo con grado de inversión", "Bono de alto rendimiento", "Capital de riesgo"] },
  { t: "Orden de un proceso de venta", l: ["Teaser y lista larga", "Acuerdo de confidencialidad", "Oferta no vinculante", "Due diligence y firma"] },
  { t: "Del estado de resultados, de arriba hacia abajo", l: ["Ingresos", "Utilidad bruta", "EBITDA", "Utilidad neta"] },
  { t: "Cascada de distribución de un fondo, en orden", l: ["Devolución de capital a los LP", "Retorno preferente", "Recuperación del gestor", "Reparto del ochenta veinte"] },
  { t: "De mayor a menor liquidez", l: ["Efectivo", "Acción listada", "Participación en un fondo cerrado", "Inmueble comercial"] },
  { t: "Pasos de una valoración por descuento de flujos", l: ["Proyectar los flujos", "Calcular el WACC", "Descontar y sumar el valor terminal", "Restar la deuda neta"] },
];

/* ---------- preguntas adicionales del banco ---------- */
const BANCO2 = [
  { q: "Una empresa sustituye equity por deuda barata sin cambiar su riesgo operativo. En un primer momento el WACC", o: ["baja", "sube", "no se mueve"], c: 0, e: "La deuda cuesta menos y además deduce impuestos, hasta que el riesgo financiero empieza a encarecer todo." },
  { q: "El flujo de caja libre a la firma parte de", o: ["el EBIT después de impuestos", "la utilidad neta", "el EBITDA sin ajustes"], c: 0, e: "Se toma antes del efecto del financiamiento porque el flujo es para todos los proveedores de capital." },
  { q: "Una opción de compra gana valor cuando", o: ["sube el precio del subyacente", "baja la volatilidad", "se acerca el vencimiento estando fuera del dinero"], c: 0, e: "Y también cuando sube la volatilidad, porque aumenta el rango de resultados posibles." },
  { q: "Volatilidad implícita más alta hace que las opciones", o: ["cuesten más", "cuesten menos", "no cambien de precio"], c: 0, e: "Más incertidumbre significa más valor para quien tiene el derecho y no la obligación." },
  { q: "Un forward de divisas sirve para", o: ["fijar hoy un tipo de cambio futuro", "especular sin riesgo", "eliminar el riesgo de crédito"], c: 0, e: "Elimina la incertidumbre del tipo de cambio, no el riesgo de que la contraparte falle." },
  { q: "Una cobertura natural para una empresa que exporta y cobra en dólares es", o: ["endeudarse en dólares", "endeudarse en moneda local", "no endeudarse"], c: 0, e: "Calzas la moneda de los ingresos con la de las obligaciones." },
  { q: "En una fusión, las sinergias más creíbles suelen ser", o: ["las de costos", "las de ingresos", "las de imagen"], c: 0, e: "Cerrar una planta duplicada es verificable. Vender más porque ahora son grandes, casi nunca." },
  { q: "En un LBO, salir a un múltiplo menor al de entrada", o: ["destruye buena parte del retorno", "no afecta el retorno", "mejora el retorno si hubo deuda"], c: 0, e: "La compresión de múltiplo se come el trabajo operativo de cinco años." },
  { q: "El carried interest estándar de un fondo es", o: ["veinte por ciento sobre un retorno preferente", "veinte por ciento sobre todo el capital", "dos por ciento anual"], c: 0, e: "El dos por ciento es la comisión de administración, el veinte es la participación en las ganancias." },
  { q: "El retorno preferente típico que se paga a los LP antes del carry ronda", o: ["ocho por ciento anual", "veinte por ciento anual", "dos por ciento anual"], c: 0, e: "Debajo de ese umbral el gestor no participa de las ganancias." },
  { q: "Un fondo con TVPI de dos y DPI de cero coma cinco significa que", o: ["la mayor parte del valor todavía no se ha realizado", "ya se devolvió todo el capital", "el fondo perdió dinero"], c: 0, e: "El valor está en el papel hasta que haya salidas de verdad." },
  { q: "La curva J de un fondo describe", o: ["retornos negativos al principio por comisiones y costos", "el crecimiento exponencial del capital", "la caída del mercado al final del ciclo"], c: 0, e: "Se cobran comisiones desde el día uno y las salidas llegan años después." },
  { q: "El dry powder de un fondo es", o: ["capital comprometido y todavía no invertido", "las utilidades no distribuidas", "la reserva legal"], c: 0, e: "Es la munición disponible para nuevas operaciones." },
  { q: "Una empresa con alto apalancamiento operativo tiene", o: ["utilidades que se mueven más que sus ventas", "utilidades muy estables", "poca deuda por definición"], c: 0, e: "Los costos fijos amplifican tanto las subidas como las caídas." },
  { q: "Si suben los costos fijos, el punto de equilibrio", o: ["sube", "baja", "no cambia"], c: 0, e: "Hay que vender más unidades para cubrir la misma estructura." },
  { q: "La depreciación acelerada en los primeros años", o: ["reduce el impuesto que pagas hoy", "aumenta la utilidad contable", "no tiene efecto en caja"], c: 0, e: "Es diferimiento, no ahorro definitivo, pero el dinero de hoy vale más." },
  { q: "Un supermercado que cobra de contado y paga a noventa días tiene", o: ["capital de trabajo negativo que financia la operación", "un problema de liquidez", "exceso de inventario"], c: 0, e: "Los proveedores financian el negocio. Es una ventaja estructural." },
  { q: "Días de inventario muy altos significan", o: ["más capital inmovilizado", "mejor servicio siempre", "menor costo financiero"], c: 0, e: "Cada día de inventario es caja parada en un galpón." },
  { q: "Un ratio corriente por debajo de uno sugiere", o: ["posible tensión de liquidez", "una empresa muy rentable", "exceso de efectivo"], c: 0, e: "Los pasivos de corto plazo superan a los activos de corto plazo." },
  { q: "El greenshoe en una emisión permite", o: ["colocar títulos adicionales si la demanda lo justifica", "cancelar la emisión", "garantizar el precio a los inversionistas"], c: 0, e: "Es la opción de sobreasignación que estabiliza el papel en los primeros días." },
  { q: "El bookbuilding sirve para", o: ["descubrir precio y demanda antes de fijar el rango", "garantizar la colocación", "reducir las comisiones"], c: 0, e: "Se arma el libro con las intenciones de compra y con eso se fija el precio." },
  { q: "Un bono convertible paga menos cupón porque", o: ["incluye una opción de convertirse en acciones", "tiene menos riesgo de crédito", "vence antes"], c: 0, e: "El inversionista acepta menos interés a cambio de la posibilidad de participar del upside." },
  { q: "La deuda subordinada frente a la senior", o: ["tiene más riesgo y paga más tasa", "tiene menos riesgo y paga menos", "cobra al mismo tiempo"], c: 0, e: "Cobra después, así que exige más." },
  { q: "Un covenant de incurrencia se prueba", o: ["solo cuando la empresa hace algo, como emitir más deuda", "cada trimestre sin excepción", "solo al vencimiento"], c: 0, e: "A diferencia del covenant de mantenimiento, que se mide periódicamente." },
  { q: "Una cláusula de cross default implica que", o: ["incumplir un contrato dispara el incumplimiento de los demás", "solo aplica al contrato firmado", "la deuda se convierte en capital"], c: 0, e: "Un problema pequeño en un crédito puede volverse sistémico dentro de la empresa." },
  { q: "Si sube el riesgo país, el valor presente de un activo local", o: ["baja", "sube", "no cambia"], c: 0, e: "Sube la tasa de descuento y todo lo demás se ajusta hacia abajo." },
  { q: "Una empresa con ingresos en moneda local y deuda en dólares, frente a una devaluación", o: ["empeora su capacidad de pago", "mejora su capacidad de pago", "queda igual"], c: 0, e: "El descalce de monedas es la causa más común de crisis corporativas en la región." },
  { q: "Con inflación alta y contabilidad a costo histórico, las utilidades reportadas", o: ["se sobreestiman", "se subestiman", "no se distorsionan"], c: 0, e: "El costo de lo vendido queda viejo mientras el precio de venta ya subió." },
  { q: "La tasa de interés real es aproximadamente", o: ["la nominal menos la inflación", "la nominal más la inflación", "la nominal dividida entre la inflación"], c: 0, e: "Aproximación suficiente en la mayoría de los casos." },
  { q: "Cuando el dólar se fortalece a nivel global, los commodities tienden a", o: ["bajar de precio", "subir de precio", "no reaccionar"], c: 0, e: "Se cotizan en dólares, así que se encarecen para el resto del mundo." },
  { q: "Dos activos con correlación de uno", o: ["no aportan beneficio de diversificación entre sí", "eliminan el riesgo al combinarse", "siempre rinden lo mismo"], c: 0, e: "Se mueven juntos, así que juntarlos no reduce nada." },
  { q: "El índice de Sharpe mide", o: ["retorno por unidad de riesgo asumido", "el retorno absoluto", "la caída máxima del portafolio"], c: 0, e: "Ganar mucho tomando muchísimo riesgo no es lo mismo que ganar bien." },
  { q: "La caída máxima o drawdown mide", o: ["la peor pérdida desde un pico hasta un valle", "la volatilidad anual", "el retorno negativo promedio"], c: 0, e: "Es la métrica que de verdad determina si un inversionista aguanta la estrategia." },
  { q: "Rebalancear un portafolio implica", o: ["vender lo que subió y comprar lo que bajó", "comprar más de lo que sube", "no hacer nada durante años"], c: 0, e: "Es incómodo de hacer y por eso casi nadie lo hace." },
  { q: "Entre dos personas que ahorran lo mismo, gana claramente", o: ["la que empezó diez años antes", "la que eligió mejores acciones", "la que ahorró más al final"], c: 0, e: "El interés compuesto premia el tiempo por encima de casi todo lo demás." },
  { q: "La razón principal por la que un fondo indexado le gana a la mayoría de gestores activos es", o: ["el menor costo", "la mejor selección de acciones", "el mayor apalancamiento"], c: 0, e: "Antes de comisiones el gestor promedio empata con el mercado. Después de comisiones, pierde." },
  { q: "Una comisión anual de dos por ciento durante treinta años", o: ["se lleva una parte muy grande del capital final", "es irrelevante a largo plazo", "solo importa si el mercado cae"], c: 0, e: "Compuesta sobre tres décadas puede costar cerca de la mitad del patrimonio acumulado." },
  { q: "Contratar un seguro de vida se justifica sobre todo cuando", o: ["hay personas que dependen económicamente de ti", "quieres invertir con ventaja fiscal", "el mercado está caro"], c: 0, e: "Es protección, no inversión. Mezclar las dos cosas suele salir caro." },
  { q: "Un activo inmobiliario en renta se valora principalmente por", o: ["la renta neta dividida entre la tasa de capitalización", "el costo de construcción", "el precio del terreno vecino"], c: 0, e: "Se compra un flujo, y la tasa de capitalización refleja el riesgo de ese flujo." },
  { q: "Si la tasa de capitalización de un inmueble sube y la renta se mantiene, el valor", o: ["baja", "sube", "no cambia"], c: 0, e: "Mismo flujo descontado más fuerte, mismo efecto que en cualquier otro activo." },
  { q: "La vacancia en un edificio de oficinas afecta directamente", o: ["la renta neta operativa", "el valor del terreno", "los impuestos municipales"], c: 0, e: "Menos metros arrendados es menos flujo, y el valor sigue al flujo." },
  { q: "Comprar un inmueble con hipoteca cuando la renta cubre la cuota es", o: ["apalancamiento que amplifica el resultado en ambos sentidos", "una operación sin riesgo", "siempre mejor que pagarlo de contado"], c: 0, e: "Si la vacancia sube o la tasa se ajusta, el apalancamiento juega en tu contra." },
  { q: "Un contrato de arrendamiento con ajuste por inflación protege", o: ["al arrendador de la pérdida de valor real", "al arrendatario del alza de precios", "a ninguno de los dos"], c: 0, e: "Por eso los inmuebles se consideran cobertura parcial contra inflación." },
  { q: "El principal riesgo de una isla privada o un activo muy exclusivo es", o: ["la falta de liquidez y de comparables", "el impuesto predial", "la depreciación contable"], c: 0, e: "Mercado de un solo comprador significa que el precio lo pone quien llega, no tú." },
  { q: "En una due diligence, que el auditor haya renunciado el año anterior es", o: ["una bandera roja seria", "un detalle administrativo", "una buena señal de rotación"], c: 0, e: "Los auditores rara vez renuncian por comodidad." },
  { q: "Cuentas por cobrar que crecen mucho más rápido que las ventas suelen indicar", o: ["problemas de cobranza o ventas infladas", "una campaña comercial exitosa", "mejor capital de trabajo"], c: 0, e: "Es de las señales más confiables de deterioro en la calidad de los ingresos." },
];

/* el temario completo, con su nivel */
const PREGUNTAS = []
  .concat(BANCO0.map((x) => ({ ...x, nv: 1 })))
  .concat(BANCO.map((x) => ({ ...x, nv: 2 })))
  .concat(BANCO2.map((x) => ({ ...x, nv: 3 })))
  .concat(BANCO3);

const NIVEL_N = ["", "Fundamentos", "Intermedio", "Avanzado", "Profesional", "Mesa de socios"];
/* el nivel sube con los años de carrera: seis años por escalón */
const nivelDe = (turno) => clamp(1 + Math.floor(turno / 6), 1, 5);
/* cuántas preguntas trae el examen según el nivel */
const largoExamen = (nv) => (nv <= 1 ? 3 : nv <= 3 ? 4 : 5);

/* mayoría del nivel que te toca, una de repaso y una del nivel siguiente */
const armarExamen = (nv, cuantas) => {
  const del = (k) => PREGUNTAS.filter((x) => x.nv === k).sort(() => Math.random() - 0.5);
  const cur = del(nv), ant = del(Math.max(1, nv - 1)), sig = del(Math.min(5, nv + 1));
  const out = [];
  const meter = (arr, n) => { for (let i = 0; i < n && arr.length; i++) { const q = arr.pop(); if (!out.some((y) => y.q === q.q)) out.push(q); } };
  if (nv > 1) meter(ant, 1);
  if (nv < 5 && cuantas >= 4) meter(sig, 1);
  meter(cur, cuantas - out.length);
  meter(del(nv), cuantas - out.length);
  return out.sort(() => Math.random() - 0.5).slice(0, cuantas);
};

/* ---------- propiedades ---------- */
const PROPIEDADES = [
  { id: "local", n: "Local comercial en zona media", c: 65000, ap: 0.012, renta: 2700, up: 500, vida: 1, d: "Renta estable mientras el inquilino aguante. La zona define todo." },
  { id: "ofi", n: "Oficina en torre corporativa", c: 120000, ap: 0.013, renta: 4800, up: 1100, vida: 1, d: "Inquilino corporativo, contrato largo, vacancia dolorosa cuando llega." },
  { id: "galpon", n: "Galpón industrial con contrato a diez años", c: 200000, ap: 0.014, renta: 9000, up: 1400, vida: 1, d: "Poco glamour y el mejor flujo por dólar invertido de toda la lista." },
  { id: "edificio", n: "Edificio de ocho apartamentos", c: 420000, ap: 0.016, renta: 19000, up: 4200, vida: 2, d: "Ocho inquilinos es diversificación y también ocho llamadas al mes." },
  { id: "terreno", n: "Terreno en zona de expansión urbana", c: 90000, ap: 0.026, renta: 0, up: 300, vida: 1, d: "No paga nada mientras esperas. Aprecia fuerte si la ciudad crece hacia allá." },
  { id: "hotel", n: "Hotel boutique de doce habitaciones", c: 550000, ap: 0.014, renta: 26000, up: 9000, vida: 3, d: "Es un negocio operativo disfrazado de inmueble. Da más y cuesta más." },
  { id: "centro", n: "Participación en un centro comercial", c: 800000, ap: 0.012, renta: 33000, up: 5000, vida: 2, d: "Flujo institucional y decisiones que no controlas tú solo." },
  { id: "isla", n: "Isla privada", c: 2200000, ap: 0.008, renta: 0, up: 26000, vida: 8, d: "Aprecia poco, cuesta muchísimo mantener y no tiene comparables. Se compra por otra razón." },
];

/* ---------- ramas de carrera ---------- */
const RAMAS = [
  { id: "mya", n: "Fusiones y adquisiciones", d: "El camino clásico. Un punto extra de carrera cada semestre y honorarios más altos en los cierres." },
  { id: "mercados", n: "Mercados de capitales", d: "Emisiones y colocaciones. Un punto de modelaje cada semestre y un ingreso variable ligado al volumen." },
  { id: "pe", n: "Private equity", d: "Te preparas para el lado comprador. Tu futuro fondo pide la mitad de capital propio y sus salidas rinden más." },
  { id: "patrimonio", n: "Gestión de patrimonios", d: "Menos adrenalina, más composición. Un punto extra de retorno en tu portafolio cada semestre y un punto de red." },
  { id: "boutique", n: "Tu propia boutique", d: "Te independizas. Ingresos irregulares y más altos en promedio, un punto de reputación por semestre y más desgaste." },
];

/* ---------- empresas del deal flow del fondo ---------- */
const EMPRESAS = [
  { n: "Distribuidora de alimentos regional", s: "Consumo", riesgo: 1, base: 1.9 },
  { n: "Cadena de farmacias", s: "Retail", riesgo: 1, base: 1.8 },
  { n: "Operador logístico de última milla", s: "Logística", riesgo: 2, base: 2.2 },
  { n: "Procesadora de arroz", s: "Agroindustria", riesgo: 2, base: 2.0 },
  { n: "Fintech de pagos transfronterizos", s: "Fintech", riesgo: 3, base: 2.9 },
  { n: "Clínica ambulatoria con tres sedes", s: "Salud", riesgo: 1, base: 1.9 },
  { n: "Minera de oro de mediana escala", s: "Minería", riesgo: 3, base: 3.1 },
  { n: "Generadora eléctrica con contrato regulado", s: "Energía", riesgo: 1, base: 1.7 },
  { n: "Software de gestión para constructoras", s: "Tecnología", riesgo: 2, base: 2.5 },
  { n: "Planta de empaques plásticos", s: "Industrial", riesgo: 2, base: 2.0 },
  { n: "Empresa de factoring especializada", s: "Financiero", riesgo: 2, base: 2.1 },
  { n: "Franquicia de restaurantes en expansión", s: "Consumo", riesgo: 3, base: 2.6 },
];

/* ---------- banderas rojas ---------- */
const BANDERAS = [
  { t: "Estados financieros de la compañía objetivo. Marca las tres banderas rojas.",
    mal: ["Las cuentas por cobrar crecen el triple que las ventas", "El auditor renunció el año pasado sin explicación", "El setenta por ciento de las ventas es a una empresa relacionada"],
    ok: ["El margen bruto se mantiene estable hace tres años", "La empresa arrienda sus galpones en vez de comprarlos", "Tiene una línea de crédito aprobada y sin usar", "El inventario rota cuatro veces al año", "Los socios cobran dividendos una vez al año"] },
  { t: "Sala de datos de una empresa de servicios. Marca las tres banderas rojas.",
    mal: ["Faltan las actas de junta de los últimos dos años", "Hay un juicio laboral colectivo sin provisionar", "El contrato que genera la mitad del ingreso vence en tres meses sin renovación"],
    ok: ["La nómina creció en línea con las ventas", "Cambiaron de banco principal el año pasado", "Tienen certificación de calidad vigente", "El gerente general lleva ocho años en el cargo", "Renovaron la flota hace dos años"] },
  { t: "Un fondo te ofrece entrar como inversionista. Marca las tres banderas rojas.",
    mal: ["Promete un retorno fijo mensual sin importar el mercado", "El administrador y el auditor pertenecen al mismo grupo", "No permite retiros y no informa el valor de la cuota"],
    ok: ["Cobra dos por ciento anual de administración", "Publica un informe trimestral a inversionistas", "Tiene un comité de inversiones con miembros externos", "Invierte principalmente en compañías listadas", "Está registrado ante el regulador local"] },
  { t: "Empresa familiar en venta. Marca las tres banderas rojas.",
    mal: ["Los gastos personales de la familia pasan por la empresa", "El proveedor clave trabaja sin contrato, todo de palabra", "Dos hermanos están en litigio por la propiedad de las acciones"],
    ok: ["El fundador quiere quedarse dos años en la transición", "La empresa opera en sede propia", "Los estados financieros están auditados", "Hay un gerente financiero externo a la familia", "Están al día con sus obligaciones tributarias"] },
];


/* ---------- de dónde vienes ---------- */
const NACIONES = [
  { id: "ve", n: "Venezuela", ban: "Caracas",
    d: "Creciste viendo inflación de tres dígitos, así que entiendes el dinero antes que nadie. El mercado local es pequeño y todo se resuelve por quién conoces a quién.",
    mods: { red: 7, cri: 7 }, cash: 1200, sal: 0.7, gas: 0.64, tax: 0.2, sesgo: "Emergentes",
    nota: "Sueldos bajos, costo de vida bajo, impuestos bajos, todo el mundo se conoce." },
  { id: "co", n: "Colombia", ban: "Bogotá",
    d: "Mercado mediano y ordenado, con banca de inversión de verdad y competencia por los puestos.",
    mods: { red: 4, rep: 3 }, cash: 3000, sal: 0.92, gas: 0.86, tax: 0.27, sesgo: "Emergentes",
    nota: "Punto de equilibrio entre oportunidad y estabilidad." },
  { id: "ar", n: "Argentina", ban: "Buenos Aires",
    d: "El país que te enseña macro a la fuerza. Cada década trae una crisis y cada crisis deja una generación que sabe leer una curva.",
    mods: { cri: 9, mod: 2 }, cash: 1800, sal: 0.78, gas: 0.72, tax: 0.3, sesgo: "Tasas",
    nota: "Criterio macro altísimo, ingresos volátiles." },
  { id: "mx", n: "México", ban: "Ciudad de México",
    d: "El mercado más grande de habla hispana y la puerta de entrada al capital estadounidense.",
    mods: { red: 4, mod: 3 }, cash: 4500, sal: 1.08, gas: 1.0, tax: 0.3, sesgo: "Comercio",
    nota: "Volumen de operaciones alto y cercanía con el norte." },
  { id: "es", n: "España", ban: "Madrid",
    d: "Acceso a Europa, instituciones sólidas y una carrera más lenta pero más predecible.",
    mods: { rep: 5, mod: 3 }, cash: 7000, sal: 1.0, gas: 0.95, tax: 0.37, sesgo: "Mercados",
    nota: "Estabilidad y la carga fiscal más alta de la lista." },
  { id: "us", n: "Estados Unidos", ban: "Nueva York",
    d: "El centro del mundo financiero. Los sueldos son otra escala y también lo son la deuda estudiantil y el alquiler.",
    mods: { mod: 7 }, cash: -16000, sal: 1.6, gas: 1.5, tax: 0.33, sesgo: "Mercados",
    nota: "Empiezas debiendo dieciséis mil dólares de la universidad." },
];

/* ---------- qué estudiaste ---------- */
const CARRERAS = [
  { id: "eco", n: "Economía", d: "Lees el ciclo antes que el resto de la mesa.", mods: { cri: 9, mod: 3 }, juegos: ["quiz", "semaforo", "pares"] },
  { id: "con", n: "Contaduría", d: "Encuentras el número que no cuadra sin buscarlo.", mods: { mod: 9, cri: 3 }, juegos: ["ojo", "banderas", "pares"] },
  { id: "ing", n: "Ingeniería", d: "Las cuentas de cabeza y las estructuras son tu terreno.", mods: { mod: 7, ene: 6 }, juegos: ["calculo", "estructura", "carril"] },
  { id: "der", n: "Derecho", d: "Negocias y lees contratos sin depender de nadie.", mods: { rep: 8, red: 4 }, juegos: ["anclaje", "tresraya", "cuatro"] },
  { id: "adm", n: "Administración", d: "Conoces a media promoción y a la promoción anterior también.", mods: { red: 9, rep: 3 }, juegos: ["reaccion", "memoria", "cuatro"] },
  { id: "sis", n: "Computación", d: "Automatizas en una tarde lo que otros hacen a mano toda la semana.", mods: { mod: 6, cri: 5 }, juegos: ["trading", "reaccion", "carril"] },
];

/* ---------- perfiles de portafolio: puntos de partida, no jaulas ----------
   Cada uno es una combinación conocida que puedes aplicar de un toque y después
   mover activo por activo. Los pesos suman uno contando el efectivo. */
const PERFILES = [
  { id: "conservador", n: "Conservador",
    w: { bonos: 0.35, corp: 0.20, acciones: 0.18, reits: 0.05, oro: 0.07, distressed: 0, cripto: 0, efectivo: 0.15 },
    d: "Duermes tranquilo. Los años buenos te saben a poco y los malos casi no se sienten." },
  { id: "indexado", n: "Indexado simple",
    w: { bonos: 0.20, corp: 0.10, acciones: 0.55, reits: 0.08, oro: 0.05, distressed: 0, cripto: 0, efectivo: 0.02 },
    d: "Sesenta y cuarenta de toda la vida. Aburrido, barato y difícil de superar en treinta años." },
  { id: "balanceado", n: "Balanceado",
    w: { bonos: 0.18, corp: 0.12, acciones: 0.35, reits: 0.10, oro: 0.05, distressed: 0.12, cripto: 0.04, efectivo: 0.04 },
    d: "El punto medio razonable. Aguanta un mal año sin desarmarte y captura la mayor parte de los buenos." },
  { id: "todoterreno", n: "Todo terreno",
    w: { bonos: 0.25, corp: 0.10, acciones: 0.25, reits: 0.10, oro: 0.25, distressed: 0, cripto: 0, efectivo: 0.05 },
    d: "Reparte entre activos que reaccionan distinto al mismo shock. Nunca ganas el año, casi nunca lo pierdes." },
  { id: "arriesgado", n: "Arriesgado",
    w: { bonos: 0, corp: 0.04, acciones: 0.34, reits: 0.12, oro: 0.04, distressed: 0.26, cripto: 0.20, efectivo: 0 },
    d: "Vas por el rendimiento alto y asumes que habrá años en los que pierdas un tercio de todo." },
];

/* Media y desviación de una combinación cualquiera de pesos.
   La varianza se parte en dos: la parte de mercado, que se suma entre activos
   porque caen juntos, y la propia de cada uno, que sí se diluye al repartir. */
const statsPesos = (w) => {
  let mu = (w.efectivo || 0) * EFECTIVO_MU, sis = 0, prop = 0;
  ACTIVOS.forEach((a) => {
    const x = w[a.k] || 0;
    if (!x) return;
    mu += x * a.mu;
    sis += x * a.sd * a.b;
    prop += x * x * a.sd * a.sd * Math.max(0.12, 1 - a.b * a.b);
  });
  return { mu, sd: Math.sqrt(sis * sis + prop) };
};

/* el efectivo es el residuo: lo que no asignaste a ningún activo */
const invertidoDe = (w) => ACTIVOS.reduce((a, x) => a + (w[x.k] || 0), 0);

/* mover un activo comprime proporcionalmente a los demás si te pasas de cien */
const ajustarPesos = (w, k, val) => {
  const out = {};
  ACTIVOS.forEach((a) => { out[a.k] = w[a.k] || 0; });
  out[k] = clamp(val, 0, 1);
  let resto = 0;
  ACTIVOS.forEach((a) => { if (a.k !== k) resto += out[a.k]; });
  const libre = 1 - out[k];
  if (resto > libre + 1e-9 && resto > 0) {
    const f = libre / resto;
    ACTIVOS.forEach((a) => { if (a.k !== k) out[a.k] = out[a.k] * f; });
    resto = libre;
  }
  out.efectivo = Math.max(0, 1 - out[k] - resto);
  return out;
};

/* cuánto de la cartera tendrías que vender y volver a comprar */
const rotacion = (a, b) => {
  let r = 0;
  ACTIVOS.forEach((x) => { r += Math.abs((b[x.k] || 0) - (a[x.k] || 0)); });
  r += Math.abs((b.efectivo || 0) - (a.efectivo || 0));
  return r / 2;
};

/* el que más pesa, para avisar de concentración */
const concentracion = (w) => {
  let max = 0, kk = null;
  ACTIVOS.forEach((a) => { if ((w[a.k] || 0) > max) { max = w[a.k] || 0; kk = a; } });
  return { max, activo: kk };
};

const COSTO_CAMBIO = 0.005;

/* ============================================================
   BASE DE DATOS DE MINIJUEGOS
   Cada modo declara su nombre, su instrucción, el tema financiero
   que ejercita y cuánto dura. El motor lee de aquí.
   ============================================================ */

const MINIJUEGOS = Object.keys(JUEGOS).map((k) => ({ id: k, ...JUEGOS[k] }));

/* ---------- fichas de la pizarra ---------- */
const PIZARRAS = [
  { t: "Conceptos de valoración", p: [
    ["WACC", "Costo promedio del capital"],
    ["TIR", "Tasa que deja el VAN en cero"],
    ["Beta", "Sensibilidad al índice"],
    ["Valor terminal", "La mayor parte del DCF"],
    ["Deuda neta", "Puente de equity a firm value"],
    ["Prima de riesgo país", "Se suma al costo del equity"],
  ] },
  { t: "Vocabulario de fondos", p: [
    ["Carry", "Veinte por ciento de la ganancia"],
    ["Hurdle", "Retorno preferente del ocho"],
    ["Dry powder", "Capital sin desplegar"],
    ["TVPI", "Valor total sobre lo aportado"],
    ["DPI", "Lo que ya se devolvió"],
    ["Curva J", "Pérdidas al inicio del fondo"],
  ] },
  { t: "Renta fija y crédito", p: [
    ["Duración", "Sensibilidad a la tasa"],
    ["Cupón", "Interés periódico del bono"],
    ["Covenant", "Condición que hay que cumplir"],
    ["Subordinada", "Cobra después de la senior"],
    ["Convertible", "Deuda con opción a acciones"],
    ["Cross default", "Un impago dispara los demás"],
  ] },
  { t: "Contabilidad que importa", p: [
    ["EBITDA", "Antes de intereses y depreciación"],
    ["Capital de trabajo", "Inventario más cobrar menos pagar"],
    ["Flujo libre", "Lo que sobra después de invertir"],
    ["Devengo", "Se reconoce sin haber cobrado"],
    ["Impuesto diferido", "Diferencia contable y fiscal"],
    ["Provisión", "Gasto reconocido sin pagar aún"],
  ] },
];

/* ---------- carriles del capital ---------- */
const CARRILES = [
  { n: "Bonos", bueno: "Cupón", malo: "Alza de tasas" },
  { n: "Acciones", bueno: "Dividendo", malo: "Profit warning" },
  { n: "Cripto", bueno: "Rally", malo: "Liquidación" },
];

/* ---------- eventos de semestre, muchos con juego rápido ---------- */
const E = [
  { id: 1, min: 0, max: 2, t: "Un DCF para mañana a las ocho", x: "Once de la noche. El VP deja una carpeta encima de tu teclado y dice que el cliente quiere el modelo antes del desayuno.",
    o: [
      { t: "Amanecerte y entregarlo impecable", d: { mod: 6, car: 3, ene: -18, rep: 3, msg: "Entregas a las 7:40 con las tres sensibilidades corridas. El VP no dice nada, que aquí significa que quedó bien." } },
      { t: "Armarlo rápido y confiar en tu ojo", j: "calculo", stat: "mod", d: { mod: 4, car: 2, ene: -6, msg: "Corres los números de cabeza para no perder tiempo abriendo el modelo entero." } },
      { t: "Pedir ayuda y repartir el trabajo", d: { red: 4, rep: -2, ene: -4, cri: 2, msg: "Te consiguen apoyo. Tu jefe toma nota, aunque no queda claro de qué lado." } },
    ] },
  { id: 2, min: 0, max: 3, t: "El error ya salió por correo", x: "El modelo que se envió al cliente tiene la deuda neta mal sumada. La diferencia mueve el equity value casi diez por ciento.",
    o: [
      { t: "Avisar de inmediato, aunque duela", d: { rep: 7, cri: 6, ene: -5, car: 2, msg: "Incómodo durante una hora, respetado durante años. La corrección sale el mismo día." } },
      { t: "Encontrar todos los errores antes de que los encuentren ellos", j: "ojo", stat: "mod", d: { mod: 5, rep: 4, cri: 3, msg: "Te encierras a revisar celda por celda antes de que alguien más lo note." } },
    ] },
  { id: 3, min: 0, max: 2, t: "Café con el socio", x: "El socio director te encuentra en la cafetería y se sienta contigo. Tienes doce minutos de su atención completa.",
    o: [
      { t: "Preguntarle por el negocio y escuchar", d: { red: 7, cri: 4, msg: "Te cuenta cómo levantó su primer mandato. Aprendes más que en dos meses de Excel." } },
      { t: "Soltarle una idea de originación tuya", j: "reaccion", stat: "red", d: { red: 5, rep: 5, car: 4, msg: "Tienes una ventana de segundos para meter la idea sin que suene forzado." } },
    ] },
  { id: 4, min: 0, max: 4, t: "Certificación de por medio", x: "Se abre la inscripción. Cuesta plata, quita fines de semana y no garantiza nada.",
    o: [
      { t: "Inscribirte y estudiar en serio", j: "quiz", stat: "cri", d: { cash: -1600, mod: 7, cri: 5, ene: -10, car: 3, msg: "Seis meses de sábados perdidos y el examen encima." } },
      { t: "Saltarlo, tu escuela es la mesa", d: { ene: 4, msg: "Decides que el aprendizaje viene de los mandatos. Tampoco es mala tesis." } },
    ] },
  { id: 5, min: 0, max: 3, t: "Cierre de operación, fiesta en el bar", x: "Firmaron. Todo el equipo se va a celebrar y estarán los del fondo comprador.",
    o: [
      { t: "Ir y quedarte hasta el final", d: { red: 8, ene: -9, rep: 2, msg: "Terminas hablando de mineras con un principal de un fondo. Se guarda tu número." } },
      { t: "Aparecerte una hora y dormir", d: { red: 3, ene: 6, msg: "Saludas, brindas, te vas. El equilibrio también es una habilidad." } },
      { t: "Quedarte a adelantar el próximo pitch", d: { mod: 4, car: 2, ene: -7, red: -3, msg: "El lunes tienes ventaja. El viernes tuviste soledad." } },
    ] },
  { id: 6, min: 0, max: 2, t: "El data room es un desastre", x: "Cuatrocientos archivos sin nombrar. Alguien tiene que ordenarlos y ese alguien tiene tu cargo.",
    o: [
      { t: "Armar un índice maestro que sirva a todos", j: "orden", stat: "cri", d: { mod: 5, rep: 5, ene: -10, car: 3, msg: "Ordenas el desastre siguiendo la lógica del proceso." } },
      { t: "Revisar solo lo que te pidieron", d: { ene: -3, car: 1, msg: "Cumples. Nada más y nada menos." } },
    ] },
  { id: 7, min: 1, max: 4, t: "Te llama un headhunter", x: "Una firma más grande ofrece cuarenta por ciento más de sueldo y el doble de horas.",
    o: [
      { t: "Aceptar y mudarte de firma", d: { cash: 4000, ene: -10, rep: -4, car: 6, red: 5, msg: "Nueva placa en la puerta, mismo Excel. Tu antigua red se enfría un poco." } },
      { t: "Usarla para negociar donde estás", j: "anclaje", stat: "red", d: { cash: 3000, rep: 3, car: 3, msg: "Entras a la oficina del socio con una oferta en la mano y un número en la cabeza." } },
      { t: "Decir que no y contarlo abiertamente", d: { rep: 7, red: 3, msg: "La lealtad se cotiza distinto en las firmas pequeñas. Aquí sube." } },
    ] },
  { id: 8, min: 0, max: 4, t: "Un rumor que vale plata", x: "Escuchas en un pasillo que una empresa listada recibirá una oferta el mes que viene. Tu cuenta personal está a un clic.",
    o: [
      { t: "No tocar nada y anotarlo en el registro", d: { rep: 8, cri: 7, msg: "Compliance te lo agradece por escrito. Duermes tranquilo, que en esto es patrimonio." } },
      { t: "Comprar una posición pequeña", chk: { s: "cri", dif: 80, ok: { cash: 11000, rep: -6, msg: "Ganas plata y una ansiedad crónica que no aparece en el estado de cuenta." }, no: { cash: -8000, rep: -30, msg: "El regulador cruza operaciones. Tu nombre queda en una lista que no se borra." } } },
    ] },
  { id: 9, min: 1, max: 4, t: "Cien mensajes en frío", x: "Nadie te asignó esto. Puedes construir tu propia lista de fondos y empezar a escribir.",
    o: [
      { t: "Armar la base y escribir todos los días", d: { red: 11, car: 5, ene: -11, msg: "De cien mensajes contestan siete. De esos siete sale una reunión que en dos años será un mandato." } },
      { t: "Enfocarte en diez contactos bien elegidos", j: "reaccion", stat: "red", d: { red: 7, cri: 4, ene: -4, msg: "Menos volumen y mejor timing. Escribes justo cuando conviene escribir." } },
    ] },
  { id: 10, min: 0, max: 3, t: "El teaser que vuelve marcado", x: "Tu teaser sectorial regresa con ochenta comentarios. La mitad son de forma.",
    o: [
      { t: "Rehacerlo entero y aprender el formato", d: { mod: 6, rep: 4, ene: -8, car: 2, msg: "La siguiente versión vuelve con cuatro comentarios. Progreso medible." } },
      { t: "Defender los puntos que no compartes", j: "quiz", stat: "cri", d: { rep: 5, cri: 5, car: 2, msg: "Discutir un comentario técnico te obliga a tener razón de verdad." } },
    ] },
  { id: 11, min: 0, max: 6, t: "Media hora antes del cierre", x: "El mercado cierra en treinta minutos y tienes una orden a medio ejecutar en tu cuenta personal.",
    o: [
      { t: "Ejecutar tú mismo en el momento justo", j: "reaccion", stat: "cri", d: { cash: 2200, cri: 4, msg: "Te quedas mirando la pantalla esperando el momento." } },
      { t: "Dejar una orden limitada y apagar todo", d: { cri: 3, ene: 4, cash: 600, msg: "Pones el precio al que estarías cómodo y te olvidas. Se ejecuta a medias." } },
    ] },
  { id: 12, min: 0, max: 6, t: "Ruido en la pantalla", x: "Seis titulares en una hora y tu portafolio reaccionando a cada uno. Alguien tiene que decidir qué es señal y qué es ruido.",
    o: [
      { t: "Operar cada señal en el momento", j: "semaforo", stat: "cri", d: { cash: 2600, cri: 3, ene: -5, msg: "Te sientas a operar los titulares uno por uno." } },
      { t: "Cerrar la pantalla y no hacer nada", d: { cri: 5, ene: 6, msg: "El mejor movimiento del semestre fue no hacer ninguno." } },
    ] },
  { id: 13, min: 2, max: 6, t: "Roadshow de tres ciudades", x: "Bogotá el lunes, Asunción el miércoles, Buenos Aires el viernes. Ocho reuniones con fondos.",
    o: [
      { t: "Ir a todo y preparar cada reunión", d: { red: 12, car: 6, ene: -17, rep: 5, msg: "Vuelves destruido y con dos cartas de interés." } },
      { t: "Mandar a tu asociado a una de las plazas", d: { red: 6, car: 3, ene: -8, rep: 2, msg: "Delegar también es señal de nivel. Tu asociado responde bien." } },
      { t: "Hacerlo por videollamada", d: { red: 2, ene: -2, rep: -3, msg: "Ahorras el pasaje. Los fondos toman menos en serio a quien no aterriza." } },
    ] },
  { id: 14, min: 3, max: 6, t: "Tu mejor analista renuncia", x: "Se va a un fondo. Te lo dice con dos semanas de aviso y cara de culpa.",
    o: [
      { t: "Desearle bien y mantener el puente", d: { red: 8, rep: 5, ene: -5, msg: "A los dos años ese fondo entra como comprador en un proceso tuyo." } },
      { t: "Contraofertar y retenerlo", j: "anclaje", stat: "red", d: { car: 4, ene: -5, cash: -2000, msg: "Tienes que encontrar el número que lo convence sin romper la escala del equipo." } },
    ] },
  { id: 15, min: 4, max: 6, t: "Te ofrecen una silla en el board", x: "Una compañía del portafolio de un cliente quiere que entres a su junta directiva.",
    o: [
      { t: "Aceptar y tomarlo en serio", d: { red: 10, rep: 8, cri: 6, ene: -9, cash: 8000, car: 4, msg: "Cuatro juntas al año, mucha lectura y una visión del negocio que desde afuera no tenías." } },
      { t: "Declinar por conflicto de interés", d: { rep: 6, cri: 6, msg: "El cliente entiende y confía más. Tu agenda respira." } },
    ] },
  { id: 16, min: 0, max: 6, t: "Tu primo y la cripto del momento", x: "Insiste todos los días. Dice que esta vez es distinto y que ya subió trescientos por ciento.",
    o: [
      { t: "Meter una parte que puedas perder", d: { cash: -1500, cripto: 20, msg: "Defines de antemano cuánto estás dispuesto a perder. Eso ya es gestión de riesgo." } },
      { t: "Explicarle por qué no", j: "quiz", stat: "cri", d: { cri: 5, red: -2, msg: "Le explicas con números, que es la única forma de que entienda." } },
    ] },
  { id: 17, min: 0, max: 6, t: "El cuerpo pasa factura", x: "Dolor de espalda, sueño malo, tres cafés antes del mediodía. El médico te da una lista de cosas que no vas a hacer.",
    o: [
      { t: "Bloquear una hora diaria y cumplirla", d: { ene: 22, rep: -2, cri: 3, msg: "Una hora menos de escritorio y bastante más cabeza." } },
      { t: "Ignorarlo, ya habrá tiempo", d: { ene: -10, mod: 2, car: 2, msg: "Aguantas. Todo el mundo aguanta hasta que no." } },
    ] },
  { id: 18, min: 0, max: 5, t: "La boda es el mismo fin de semana del pitch", x: "Tu mejor amigo se casa el sábado. El pitch al comité es el lunes a primera hora.",
    o: [
      { t: "Ir a la boda y preparar el domingo", d: { ene: 8, red: 3, rep: -3, msg: "Llegas al lunes con menos horas y más humanidad. El pitch sale bien igual." } },
      { t: "Mandar un regalo y quedarte trabajando", d: { car: 3, mod: 3, ene: -6, red: -4, msg: "El pitch queda redondo. La amistad queda con una marca pequeña." } },
    ] },
  { id: 19, min: 1, max: 5, t: "Prensa al teléfono", x: "Un periodista quiere una cita tuya sobre el sector. Tu firma no tiene política clara al respecto.",
    o: [
      { t: "Hablar solo de datos públicos", d: { rep: 6, red: 4, cri: 3, msg: "Sales citado con prudencia. Dos fondos te escriben esa semana." } },
      { t: "Aceptar la entrevista técnica en vivo", j: "quiz", stat: "cri", d: { rep: 7, red: 6, msg: "En vivo no hay forma de consultar nada." } },
      { t: "Declinar y pasarlo al socio", d: { rep: 2, red: 2, msg: "Correcto y aburrido. A veces es exactamente lo que toca." } },
    ] },
  { id: 20, min: 1, max: 4, t: "Alguien se cuelga de tu trabajo", x: "Un colega presenta al comité el análisis que armaste tú, sin mencionarte.",
    o: [
      { t: "Hablarlo con él, en privado y directo", d: { rep: 5, cri: 5, red: 2, msg: "Se incomoda y corrige en la siguiente sesión. El límite queda puesto." } },
      { t: "Escalarlo al socio", chk: { s: "rep", dif: 60, ok: { rep: 6, car: 3, msg: "El socio ya lo sospechaba. Ajustan la asignación de créditos del equipo." }, no: { rep: -8, red: -5, msg: "Queda como conflicto de egos y tú como el que se queja." } } },
      { t: "Dejarlo pasar y anotarlo", d: { ene: -4, cri: 2, msg: "Sigues trabajando. La factura de estas cosas llega igual, solo que después." } },
    ] },
  { id: 21, min: 0, max: 6, t: "Llega el bono", x: "Sobre encima del escritorio. Menos de lo que esperabas y más de lo que temías.",
    o: [
      { t: "Mandarlo casi todo al portafolio", d: { cash: 3200, cri: 4, msg: "Lo inviertes antes de acostumbrarte a verlo en la cuenta." } },
      { t: "Repartir entre disfrute y ahorro", d: { cash: 1400, ene: 8, msg: "Un viaje corto y el resto invertido. Difícil discutirlo." } },
    ] },
  { id: 22, min: 2, max: 6, t: "Fusión de tu firma", x: "Anuncian la integración con una casa regional. Reorganizan equipos en sesenta días.",
    o: [
      { t: "Posicionarte temprano con los que llegan", d: { red: 9, car: 5, rep: 3, ene: -7, msg: "Terminas liderando la integración de la cobertura sectorial." } },
      { t: "Bajar la cabeza y ejecutar", d: { mod: 4, car: 2, rep: -2, msg: "Sobrevives al recorte. Nadie te tiene muy presente." } },
    ] },
  { id: 23, min: 0, max: 6, t: "Devaluación de la noche a la mañana", x: "El tipo de cambio se mueve cuarenta por ciento. La mitad de tus supuestos quedaron viejos.",
    o: [
      { t: "Rehacer los modelos en dólares esa misma semana", j: "calculo", stat: "mod", d: { mod: 7, cri: 5, ene: -12, rep: 6, car: 3, msg: "Conviertes todo a mano para tener números creíbles antes que nadie." } },
      { t: "Esperar a que se estabilice", d: { ene: 2, rep: -5, msg: "Cuando reaccionas, otro ya mandó su nota al mercado." } },
    ] },
  { id: 24, min: 0, max: 2, t: "Enseñarle al pasante nuevo", x: "Llega alguien que no sabe usar buscarv y tiene todas las ganas del mundo.",
    o: [
      { t: "Dedicarle dos horas por semana", d: { red: 6, rep: 5, ene: -5, cri: 3, msg: "En seis meses te libera un tercio de tu carga. La mejor inversión del año." } },
      { t: "Que aprenda como aprendiste tú", d: { ene: 2, rep: -3, msg: "Sobrevive, pero no te busca cuando importa." } },
    ] },
  { id: 25, min: 0, max: 6, t: "Un amigo levanta capital", x: "Su startup necesita cierre y te ofrece entrar en la ronda como ángel.",
    o: [
      { t: "Invertir un ticket que puedas perder", d: { cash: -3000, red: 4, msg: "Entras por un monto que no te cambia la vida si se pierde. Papeles en orden." } },
      { t: "Revisarle el modelo antes de decidir", j: "ojo", stat: "mod", d: { red: 6, cri: 4, cash: -1500, msg: "Le pides el modelo y te sientas a buscar el número que no cuadra." } },
    ] },
  { id: 26, min: 2, max: 6, t: "Comité de crédito difícil", x: "Defiendes una estructura de factoring sobre un sector volátil. Dos miembros vienen buscando sangre.",
    o: [
      { t: "Responder con los números en la cabeza", j: "calculo", stat: "mod", d: { car: 6, rep: 7, cri: 4, msg: "Te preguntan tasas y coberturas y no hay tiempo de abrir el archivo." } },
      { t: "Retirar el caso y volver el mes que viene", d: { cri: 6, rep: 2, ene: -3, msg: "Preferible retirarse que perder. Vuelves mejor armado." } },
    ] },
  { id: 27, min: 1, max: 6, t: "Reunión con la familia dueña", x: "Tres hermanos, una empresa y ninguna intención de estar de acuerdo entre ellos.",
    o: [
      { t: "Aguantar el pulso y buscar el punto medio", j: "tresraya", stat: "red", d: { red: 7, car: 5, rep: 4, msg: "La reunión se vuelve un juego de posiciones antes de hablar de precio." } },
      { t: "Mandar una propuesta por escrito y esperar", d: { car: 2, ene: 3, msg: "Ordenado y sin desgaste. También sin conexión personal." } },
    ] },
  { id: 28, min: 3, max: 6, t: "Un cliente grande aprieta", x: "Amenaza con llevarse la cuenta si no aceptas un fee contingente que castiga a tu equipo.",
    o: [
      { t: "Sostener el esquema de honorarios", sigue: 602, d: { rep: 9, cash: -9000, cri: 6, msg: "Pierdes la cuenta este año y la recuperas en dos, con mejores términos." } },
      { t: "Negociar un esquema mixto", j: "anclaje", stat: "red", d: { cash: 7000, rep: 4, car: 4, msg: "Retainer bajo y éxito alto. Hay que encontrar el punto exacto." } },
      { t: "Ceder para proteger la facturación", d: { cash: 9000, rep: -7, ene: -7, msg: "El equipo trabaja igual por menos. Alguien renuncia en tres meses." } },
    ] },
  { id: 29, min: 2, max: 6, t: "Auditoría interna sobre tus expedientes", x: "Revisan al azar cinco mandatos tuyos, papel por papel.",
    o: [
      { t: "Reconstruir la cronología completa", j: "memoria", stat: "cri", d: { rep: 8, cri: 5, msg: "Te sientan a explicar cada aprobación en orden." } },
      { t: "Pedir tiempo para ordenar antes de entregar", d: { ene: -7, rep: -2, cri: 4, msg: "Ganas la semana y entregas impecable. El auditor se da cuenta igual." } },
    ] },
  { id: 30, min: 0, max: 6, t: "Corrección fuerte en la pantalla", x: "El mercado abre veinte por ciento abajo. El teléfono no para y tu portafolio personal amanece flaco.",
    o: [
      { t: "Comprar la caída en tramos", j: "precision", stat: "cri", d: { cri: 5, cash: 3000, msg: "Entrar bien en una caída es todo cuestión de momento." } },
      { t: "No mirar la pantalla en un mes", d: { cri: 4, ene: 6, msg: "El pánico ajeno no es una estrategia y tampoco lo es el tuyo." } },
      { t: "Vender y refugiarte en efectivo", d: { cri: -3, mercado: -0.05, ene: 3, msg: "Cortas el dolor y también la recuperación." } },
    ] },
  { id: 31, min: 4, max: 6, t: "Un fondo pide condiciones aparte", x: "Quiere una side letter con derechos que los demás inversionistas no tendrán.",
    o: [
      { t: "Negarte y ofrecer los mismos términos a todos", d: { rep: 9, cri: 6, cash: -3000, msg: "El fondo entra igual, con menos ruido y más respeto." } },
      { t: "Concederlo y documentarlo con transparencia", d: { cri: 5, red: 5, car: 3, rep: -3, msg: "Se hace, se documenta y se informa. Correcto, aunque incómodo." } },
    ] },
  { id: 32, min: 1, max: 6, t: "Te piden explicar la cascada", x: "Un LP nuevo no entiende cómo se reparte la plata y quiere que se lo expliques en voz alta.",
    o: [
      { t: "Explicárselo paso por paso", j: "orden", stat: "cri", d: { red: 6, rep: 6, cri: 4, msg: "Le pides una hoja y le dibujas el orden completo." } },
      { t: "Mandarle el documento y que lo lea", d: { rep: -2, ene: 3, msg: "Técnicamente correcto. El LP se queda con la duda y con la sensación." } },
    ] },
  { id: 33, min: 2, max: 6, t: "Dos ofertas sobre la mesa", x: "Un comprador financiero y uno estratégico. Precios parecidos y riesgos de ejecución muy distintos.",
    o: [
      { t: "Ordenar los criterios y decidir con método", j: "orden", stat: "cri", d: { cri: 7, car: 5, rep: 5, msg: "Pones los criterios en orden de importancia antes de mirar los precios." } },
      { t: "Ir por el precio más alto y punto", chk: { s: "cri", dif: 55, ok: { cash: 6000, car: 4, msg: "El precio alto además cerró sin problemas. Suerte y criterio en la misma jugada." }, no: { rep: -8, ene: -6, msg: "El comprador no consigue el financiamiento y el proceso se cae en la recta final." } } },
    ] },
  { id: 34, min: 0, max: 6, t: "Alguien de la mesa te pregunta qué harías", x: "Sin contexto, sin archivo, sin tiempo. Solo la pregunta y seis pares de ojos esperando.",
    o: [
      { t: "Contestar en el momento", j: "semaforo", stat: "cri", d: { rep: 6, cri: 4, car: 3, msg: "Sin datos en pantalla, solo criterio y velocidad." } },
      { t: "Pedir el archivo y contestar después", d: { rep: -2, mod: 3, msg: "Contestas bien y tarde. En algunas salas eso vale menos que contestar rápido." } },
    ] },
];

/* ---------- decisiones clave, cada dos años ---------- */
const D = [
  { id: 101, clave: true, min: 0, max: 6, t: "La cifra que va en la portada", x: "Mañana entregas la valoración. El rango del comprador ya está insinuado en tres correos y tu número tiene que caer cerca sin regalar valor.",
    o: [
      { t: "Calzar el precio con la señal del comprador", juego: "anclaje", stat: "red",
        res: { exito: { car: 7, rep: 8, cash: 5000, msg: "Tu número cae justo dentro del rango del comprador. Firman sin renegociar." },
               parcial: { car: 3, rep: 3, cash: 1500, msg: "Tardas en encontrar el punto pero llegas. Firman después de una ronda extra." },
               fallo: { rep: -8, cash: -2500, ene: -6, msg: "Pides demasiado y el comprador se enfría. El proceso se alarga tres meses." } } },
      { t: "Blindar el modelo celda por celda", juego: "ojo", stat: "mod",
        res: { exito: { mod: 9, rep: 7, car: 5, msg: "Encuentras dos inconsistencias antes que nadie. El modelo aguanta cualquier pregunta." },
               parcial: { mod: 4, car: 2, ene: -6, msg: "Encuentras una y se te escapa otra. Nadie pregunta por esa, esta vez." },
               fallo: { rep: -9, ene: -8, msg: "El comprador encuentra el error en la primera llamada técnica." } } },
    ] },
  { id: 102, clave: true, min: 0, max: 5, t: "Tres días de due diligence", x: "El data room abre el lunes y cierra el miércoles. Todo lo que no viste se vuelve tu problema después.",
    o: [
      { t: "Peinar el legajo completo en orden", juego: "memoria", stat: "cri", sigue: 601,
        res: { exito: { cri: 9, rep: 8, car: 6, ene: -9, msg: "Reconstruyes la cadena de contratos y aparece un pasivo laboral no declarado. Ajustan el precio." },
               parcial: { cri: 4, car: 3, ene: -9, msg: "Cubres lo esencial. Queda una carpeta sin abrir que probablemente no importaba." },
               fallo: { rep: -10, ene: -11, msg: "Te pierdes en el volumen. La contingencia aparece cuando ya firmaron." } } },
      { t: "Ir directo a los números que suelen fallar", juego: "ojo", stat: "mod",
        res: { exito: { mod: 8, cri: 5, car: 5, msg: "Vas a la conciliación bancaria y encuentras la diferencia en veinte minutos." },
               parcial: { mod: 3, car: 2, msg: "Encuentras algo menor. Suficiente para justificar el viaje." },
               fallo: { rep: -7, msg: "Apostaste por el atajo y el atajo no estaba ahí." } } },
    ] },
  { id: 103, clave: true, min: 1, max: 6, t: "Negociación de honorarios", x: "El cliente quiere pagar por éxito y nada por retainer. Tu equipo trabaja ocho meses en cualquier escenario.",
    o: [
      { t: "Anclar alto y ceder despacio", juego: "anclaje", stat: "red",
        res: { exito: { cash: 11000, rep: 7, car: 6, msg: "Cierras retainer y éxito. El cliente cree que ganó la negociación, que es la mejor señal." },
               parcial: { cash: 3500, car: 3, msg: "Consigues la mitad de lo que valía. Aceptable." },
               fallo: { cash: -2000, rep: -6, ene: -5, msg: "Te pasas de rosca y el cliente se va con la competencia." } } },
      { t: "Poner una sola cifra y sostenerla", juego: "precision", stat: "cri",
        res: { exito: { cash: 8000, rep: 9, car: 5, msg: "Un número, una explicación, cero regateo. Firman en la misma reunión." },
               parcial: { cash: 2500, rep: 3, msg: "Aceptan con condiciones. Sales empatado." },
               fallo: { cash: -1200, rep: -5, msg: "El número quedó fuera de mercado y te dejó sin margen para moverte." } } },
    ] },
  { id: 104, clave: true, min: 0, max: 6, t: "La posición que ya dio mucho", x: "Una posición de tu portafolio va setenta por ciento arriba. Todos los indicadores dicen cosas distintas.",
    o: [
      { t: "Aguantar y dejar correr", juego: "suerte", stat: "cri",
        res: { exito: { cash: 20000, cri: 6, msg: "Sales cerca del pico. No se puede pedir más." },
               parcial: { cash: 6000, cri: 3, msg: "Sales tarde y devuelves parte del camino. Igual ganaste." },
               fallo: { cash: -10000, cri: 5, ene: -6, msg: "Te quedas pegado en la vuelta. La ganancia se evapora en dos semanas." } } },
      { t: "Salir por tramos con disciplina", juego: "precision", stat: "cri",
        res: { exito: { cash: 11000, cri: 7, msg: "Tres salidas escalonadas, precio promedio muy decente." },
               parcial: { cash: 4000, cri: 4, msg: "Dos tramos buenos, uno malo. Neto positivo." },
               fallo: { cash: -3000, cri: 3, msg: "Vendes justo en el peor momento de cada tramo." } } },
    ] },
  { id: 105, clave: true, min: 2, max: 6, t: "Comité de crédito", x: "Presentas una estructura sobre facturas de un sector volátil. Dos miembros del comité vienen buscando sangre.",
    o: [
      { t: "Ir con el análisis de contraparte hecho", juego: "ojo", stat: "mod",
        res: { exito: { car: 8, rep: 9, cri: 5, msg: "Detectas la concentración de deudores antes de que la pregunten. Aprueban con condiciones." },
               parcial: { car: 4, rep: 3, msg: "Aprueban con más condiciones de las que querías." },
               fallo: { rep: -9, ene: -6, msg: "Una pregunta sobre concentración te descoloca. Devuelven el caso." } } },
      { t: "Responder de memoria, sin papeles", juego: "memoria", stat: "cri",
        res: { exito: { car: 8, rep: 10, msg: "Cinco preguntas seguidas respondidas de memoria. El comité toma nota de tu nombre." },
               parcial: { car: 3, rep: 2, msg: "Aciertas la mayoría y buscas dos datos en la carpeta." },
               fallo: { rep: -10, msg: "Te trabas en el segundo dato y la confianza del comité se cae con la cifra." } } },
    ] },
  { id: 106, clave: true, min: 2, max: 6, t: "Subasta competitiva", x: "Cinco postores, dos rondas. Tu cliente compra y tú decides la estrategia de precio.",
    o: [
      { t: "Poner precio firme en la primera ronda", juego: "subasta", stat: "cri",
        res: { exito: { car: 9, rep: 8, cash: 9000, msg: "Sacas a tres competidores de una vez y cierras sin segunda vuelta." },
               parcial: { car: 4, cash: 2500, msg: "Pasas a la segunda ronda con margen apretado." },
               fallo: { rep: -7, cash: -3500, msg: "Precio fuera de rango. Los que quedaron afuera fueron ustedes." } } },
      { t: "Guardar munición para la segunda vuelta", juego: "suerte", stat: "red",
        res: { exito: { car: 8, rep: 6, cash: 12000, msg: "Entras en la última vuelta con la mejor información y el mejor precio." },
               parcial: { car: 3, cash: 2000, msg: "Llegas a la final y pierdes por poco." },
               fallo: { rep: -8, cash: -4500, ene: -6, msg: "Los eliminan antes de la segunda ronda por no mostrar seriedad temprano." } } },
    ] },
  { id: 107, clave: true, min: 1, max: 6, t: "El pitch al comité de inversión", x: "Veinte minutos, siete personas y una tesis que tienes que defender sin leer la lámina.",
    o: [
      { t: "Ensayar hasta tenerlo memorizado", juego: "memoria", stat: "red",
        res: { exito: { car: 8, rep: 9, red: 6, msg: "Hablas sin mirar la pantalla veinte minutos. Aprueban el mandato ese mismo día." },
               parcial: { car: 4, rep: 3, msg: "Sólido con dos tropiezos. Aprueban con dudas." },
               fallo: { rep: -9, ene: -5, msg: "Pierdes el hilo en la lámina de riesgos y ya no lo recuperas." } } },
      { t: "Improvisar sobre los números y cerrar en el punto justo", juego: "precision", stat: "mod",
        res: { exito: { car: 7, rep: 8, mod: 5, msg: "Cierras exactamente en el minuto veinte con la conclusión más fuerte." },
               parcial: { car: 3, rep: 2, msg: "Te pasas del tiempo y cortan la parte de valoración." },
               fallo: { rep: -8, msg: "Te extiendes, pierdes la sala y el comité decide sin escuchar tu cierre." } } },
    ] },
  { id: 108, clave: true, min: 3, max: 6, t: "Papel distressed a treinta centavos", x: "Un bono corporativo cotiza a treinta. La reestructuración puede tardar dos años o no llegar nunca.",
    o: [
      { t: "Comprar y aguantar hasta el acuerdo", juego: "suerte", stat: "cri",
        res: { exito: { cash: 38000, cri: 8, rep: 6, msg: "El acuerdo llega y el papel recupera a sesenta y cinco. Doblaste el capital." },
               parcial: { cash: 10000, cri: 4, msg: "Sales en el rebote sin esperar el acuerdo final." },
               fallo: { cash: -17000, cri: 6, ene: -7, msg: "El proceso se empantana en tribunales y el papel cae a doce." } } },
      { t: "Armar el caso y venderlo a un fondo", juego: "anclaje", stat: "red",
        res: { exito: { cash: 18000, red: 9, car: 7, rep: 7, msg: "Un fondo compra la tesis y te paga por estructurarla. Riesgo ajeno, fee tuyo." },
               parcial: { cash: 5000, red: 4, msg: "Un fondo entra con un ticket menor al que buscabas." },
               fallo: { rep: -6, ene: -5, msg: "Nadie compra la tesis y quedas con seis semanas de trabajo sin factura." } } },
    ] },
  { id: 109, clave: true, min: 2, max: 6, t: "Auditoría regulatoria sorpresa", x: "Llegan sin aviso a revisar expedientes de los últimos dos años. Te toca a ti acompañarlos.",
    o: [
      { t: "Reconstruir la trazabilidad de memoria", juego: "memoria", stat: "cri",
        res: { exito: { rep: 10, cri: 6, msg: "Explicas cada aprobación en orden y sin dudar. El informe sale limpio." },
               parcial: { rep: 3, ene: -5, msg: "Faltan dos actas que aparecen al día siguiente. Observación menor." },
               fallo: { rep: -12, cash: -4000, msg: "Se pierden en la cronología y el informe deja tres observaciones formales." } } },
      { t: "Ordenar los expedientes antes de entregarlos", juego: "orden", stat: "mod",
        res: { exito: { rep: 9, mod: 5, msg: "Todo entregado en el orden correcto media hora antes de que lo pidan." },
               parcial: { rep: 2, ene: -4, msg: "Ordenas casi todo. Una carpeta llega tarde." },
               fallo: { rep: -10, msg: "Entregas con un hueco que el auditor detecta en la primera revisión." } } },
    ] },
  { id: 110, clave: true, min: 4, max: 6, t: "Fijar el rango de precio de la colocación", x: "Sale la emisión. Muy arriba no se coloca, muy abajo dejas plata del cliente en la mesa.",
    o: [
      { t: "Leer el libro y fijar el punto exacto", juego: "precision", stat: "mod",
        res: { exito: { car: 12, rep: 12, cash: 20000, msg: "La emisión se coloca completa y cotiza arriba el primer día." },
               parcial: { car: 5, rep: 4, cash: 5000, msg: "Se coloca el ochenta por ciento. Aceptable, no memorable." },
               fallo: { rep: -12, cash: -8000, ene: -7, msg: "La emisión queda a medias y el papel abre bajo el precio de colocación." } } },
      { t: "Sondear a los anclas uno por uno", juego: "anclaje", stat: "red",
        res: { exito: { car: 10, rep: 9, red: 8, cash: 15000, msg: "Los tres anclas confirman antes de abrir el libro. La colocación es un trámite." },
               parcial: { car: 5, red: 4, cash: 4000, msg: "Dos anclas entran, uno se cae. Sale igual." },
               fallo: { rep: -9, red: -4, msg: "Los anclas se enfrían y la emisión se pospone al semestre siguiente." } } },
    ] },
  { id: 111, clave: true, min: 4, max: 6, t: "Primer cierre de tu fondo", x: "Tienes la tesis, el track record y una lista de LPs. Falta convencerlos del tamaño del ticket.",
    o: [
      { t: "Negociar el ticket con el LP ancla", juego: "anclaje", stat: "red",
        res: { exito: { cash: 60000, car: 15, rep: 12, red: 10, msg: "El ancla entra por el doble de lo que esperabas y el resto lo sigue. Primer cierre por encima del objetivo." },
               parcial: { cash: 16000, car: 7, red: 5, msg: "Primer cierre justo en el mínimo. Funciona, pero apretado." },
               fallo: { cash: -15000, ene: -13, rep: -6, msg: "El ancla no entra y sin ancla no entra nadie. Dieciocho meses perdidos." } } },
      { t: "Aguantar la ronda hasta conseguir el tamaño", juego: "suerte", stat: "cri",
        res: { exito: { cash: 72000, car: 16, rep: 10, msg: "Aguantas seis meses más y cierras al tamaño que querías." },
               parcial: { cash: 18000, car: 6, msg: "Cierras algo menor de lo planeado después de mucho desgaste." },
               fallo: { cash: -22000, ene: -15, rep: -8, msg: "Se te pasó el momento del mercado. La ventana se cerró con el fondo abierto." } } },
    ] },
  { id: 112, clave: true, min: 1, max: 6, t: "Dos cierres el mismo viernes", x: "Dos mandatos firman el mismo día en ciudades distintas. Los dos clientes creen que estás con ellos.",
    o: [
      { t: "Coordinar los tiempos al minuto", juego: "precision", stat: "cri",
        res: { exito: { car: 10, rep: 9, cash: 10000, ene: -11, msg: "Los dos cierran sin fricción y ninguno se entera del otro." },
               parcial: { car: 4, rep: 2, cash: 3500, ene: -12, msg: "Uno cierra a tiempo y el otro con dos horas de retraso y una llamada incómoda." },
               fallo: { rep: -11, cash: -3500, ene: -14, msg: "Un cliente firma sin ti presente y lo interpreta exactamente como lo que fue." } } },
      { t: "Delegar uno y jugarte la ejecución del equipo", juego: "memoria", stat: "red",
        res: { exito: { car: 8, rep: 8, red: 7, ene: -5, msg: "Tu asociado ejecuta sin un error. Acabas de fabricar un sucesor." },
               parcial: { car: 3, ene: -5, msg: "Sale, con dos llamadas tuyas de emergencia en el medio." },
               fallo: { rep: -8, red: -4, ene: -7, msg: "El equipo se traba en un detalle registral y el cierre se cae al lunes." } } },
    ] },
  { id: 113, clave: true, min: 0, max: 6, t: "Reasignar tu portafolio antes del cierre de año", x: "Tienes que decidir dónde queda parado tu patrimonio los próximos doce meses. Nadie va a revisar esto por ti.",
    o: [
      { t: "Decidir tú, con tesis propia y convicción", juego: "quiz", stat: "cri",
        res: { exito: { cri: 9, mercado: 0.24, msg: "Lees bien el ciclo y la reasignación funciona. El portafolio se dispara." },
               parcial: { cri: 4, mercado: 0.03, msg: "Aciertas la dirección general y fallas en un tramo. Terminas apenas arriba." },
               fallo: { cri: 3, mercado: -0.19, ene: -5, msg: "Te equivocas en la lectura de tasas y el portafolio se lleva el golpe completo." } } },
      { t: "Indexarte y no pensar más en eso", d: { mercado: 0.03, ene: 5, cri: 2, msg: "Compras el índice y te olvidas. Aburrido y bastante difícil de criticar." } },
    ] },
  { id: 114, clave: true, min: 1, max: 6, t: "El CIO del fondo te pone a prueba", x: "Los primeros quince minutos son preguntas técnicas. Si pasas, el fondo entra en tu proceso y te deja copiar la posición.",
    o: [
      { t: "Entrar al examen sin red", juego: "quiz", stat: "cri",
        res: { exito: { red: 10, rep: 9, car: 6, mercado: 0.17, msg: "Respondes las tres sin dudar. El CIO te comparte su lectura del ciclo y replicas la posición." },
               parcial: { red: 4, car: 2, mercado: 0.02, msg: "Dos de tres. Te toma en serio a medias y el dato que te suelta sirve poco." },
               fallo: { red: -4, rep: -8, mercado: -0.13, msg: "Fallas la pregunta de duración delante del CIO y encima replicas mal la idea." } } },
      { t: "Llevar a tu jefe y quedarte de apoyo", d: { red: 4, rep: 2, ene: -3, msg: "El fondo entra igual, por la puerta de tu jefe. Tú quedas como el que tomó notas." } },
    ] },
  { id: 115, clave: true, min: 2, max: 6, t: "Examen de idoneidad del regulador", x: "Para firmar operaciones a tu nombre tienes que aprobarlo. Dos intentos y queda en registro público.",
    o: [
      { t: "Presentarte y responder tú", juego: "quiz", stat: "mod",
        res: { exito: { rep: 11, car: 7, mod: 6, msg: "Aprobado a la primera. Ya puedes firmar operaciones a tu nombre." },
               parcial: { rep: 3, car: 2, ene: -5, msg: "Aprobado raspando en el segundo intento. Cuenta igual." },
               fallo: { rep: -10, cash: -3000, ene: -7, msg: "Reprobado y en registro público. Un año más para volver a intentarlo." } } },
      { t: "Postergarlo un año más", d: { car: -2, ene: 4, rep: -3, msg: "Sigues firmando bajo la licencia de otro. Cómodo hoy, caro cuando quieras independizarte." } },
    ] },
  { id: 116, clave: true, min: 3, max: 6, t: "Tu propia tesis frente al comité", x: "Propones sobreponderar un sector completo. Si te creen y aciertas, todos lo notan. Si te creen y fallas, también.",
    o: [
      { t: "Defender la tesis con todo el rigor", juego: "quiz", stat: "cri",
        res: { exito: { car: 11, rep: 11, cri: 7, mercado: 0.22, msg: "Aprueban la tesis y el sector rinde. Tu nombre queda pegado a la mejor decisión del año." },
               parcial: { car: 4, rep: 2, mercado: 0.02, msg: "Aprueban una versión diluida que rinde poco." },
               fallo: { car: -3, rep: -12, mercado: -0.17, ene: -7, msg: "La tesis se cae en la primera pregunta y la posición personal que ya tenías se hunde." } } },
      { t: "Proponerla como piloto pequeño", d: { car: 3, cri: 4, mercado: 0.04, msg: "Empiezas con un tamaño chico. Menos gloria y también menos posibilidad de desastre." } },
    ] },
  { id: 117, clave: true, min: 0, max: 6, t: "El dominó antes del negocio", x: "El dueño de la empresa familiar te recibe en su casa y saca la mesa antes de hablar de números. Dice que así conoce a la gente.",
    o: [
      { t: "Aceptar la partida y jugarla en serio", juego: "tresraya", stat: "red",
        res: { exito: { red: 11, rep: 8, car: 6, cash: 4000, msg: "Le ganas limpio y se ríe. A partir de ahí te habla como si te conociera de siempre y firma." },
               parcial: { red: 6, car: 3, msg: "Empate. Firma, aunque con dos cláusulas más de las que querías." },
               fallo: { red: 2, rep: -4, msg: "Pierdes y él lo disfruta demasiado. La conversación arranca contigo un paso atrás." } } },
      { t: "Ir directo a la propuesta", juego: "anclaje", stat: "cri",
        res: { exito: { car: 6, rep: 6, cash: 3000, msg: "Directo al punto y el número cae bien. No hubo química pero hubo firma." },
               parcial: { car: 2, msg: "Firma después de pensarlo dos semanas." },
               fallo: { rep: -6, msg: "Le pareces apurado y frío. No vuelve a contestar el teléfono." } } },
    ] },
  { id: 118, clave: true, min: 2, max: 6, t: "Pulso con el comprador estratégico", x: "Del otro lado hay un director de M&A con veinte años más que tú. Cada movimiento suyo busca una concesión tuya.",
    o: [
      { t: "Aguantar el pulso movimiento por movimiento", juego: "tresraya", stat: "cri", sigue: 603,
        res: { exito: { car: 10, rep: 10, cash: 12000, msg: "Cierras en tus términos y con el precio intacto. El otro lado pide tu tarjeta al final." },
               parcial: { car: 5, rep: 4, cash: 4000, msg: "Parten la diferencia. Nadie sale humillado y el deal cierra." },
               fallo: { car: 1, rep: -8, cash: -4000, ene: -7, msg: "Te sacan tres concesiones seguidas. Tu cliente firma peor de lo que podía." } } },
      { t: "Llevarlo a un proceso competitivo", juego: "suerte", stat: "red",
        res: { exito: { car: 9, rep: 8, cash: 14000, msg: "Traes dos competidores más y el estratégico sube el precio solo." },
               parcial: { car: 3, cash: 2500, msg: "El proceso no atrae a nadie más pero la amenaza sirvió." },
               fallo: { rep: -9, cash: -6000, ene: -7, msg: "El estratégico se ofende, se retira y te quedas sin comprador." } } },
    ] },
  { id: 119, clave: true, min: 3, max: 6, t: "La silla del socio se decide en la mesa", x: "Dos candidatos, una sola promoción, y el socio director los invita a jugar mientras conversan. Nadie dice que sea una prueba.",
    o: [
      { t: "Jugar y dejar que te lea", juego: "cuatro", stat: "cri",
        res: { exito: { car: 12, rep: 9, red: 6, msg: "Ganas sin humillar a nadie y con conversación. El socio ve lo que quería ver." },
               parcial: { car: 5, rep: 3, msg: "Empate cordial. Quedas en carrera junto al otro candidato." },
               fallo: { car: 1, rep: -5, msg: "Pierdes y se nota que te molesta. El socio anota eso, no el resultado." } } },
      { t: "Hablar de tu track record en vez de jugar", juego: "memoria", stat: "red",
        res: { exito: { car: 9, rep: 8, msg: "Recitas cinco mandatos con cifras exactas. Difícil discutir contra eso." },
               parcial: { car: 4, msg: "Sólido, con un dato que no recuerdas bien." },
               fallo: { rep: -6, car: -2, msg: "Te equivocas en el monto de tu propio deal y el socio corrige en voz alta." } } },
    ] },
  { id: 120, clave: true, min: 4, max: 6, t: "Te ofrecen dirigir la oficina de otro país", x: "Tres años afuera, equipo nuevo y un mercado que no conoces. Vuelves con galones o no vuelves.",
    o: [
      { t: "Aceptar y armar el equipo desde cero", juego: "orden", stat: "cri",
        res: { exito: { car: 14, rep: 10, red: 9, cash: 15000, ene: -10, msg: "Montas la operación en el orden correcto y en dos años la oficina es rentable." },
               parcial: { car: 6, red: 4, ene: -12, msg: "La oficina arranca lenta y con costos por encima del plan." },
               fallo: { car: 2, rep: -8, ene: -14, cash: -8000, msg: "Te apuras en contratar antes de tener clientes y la oficina cierra en dieciocho meses." } } },
      { t: "Quedarte y consolidar lo que ya tienes", d: { car: 5, rep: 4, ene: 3, msg: "Menos riesgo, menos historia. La franquicia local sigue creciendo contigo dentro." } },
    ] },
];

/* ---------- eventos que usan los juegos interactivos nuevos ---------- */
const E2 = [
  { id: 40, min: 0, max: 6, t: "Una sesión larga frente a la pantalla", x: "Tienes el día libre y una cuenta propia. El mercado abre en cinco minutos y la tentación es operarlo todo.",
    o: [
      { t: "Operar la sesión completa", j: "trading", stat: "cri", d: { cash: 3000, cri: 4, ene: -6, msg: "Te sientas a operar de apertura a cierre." } },
      { t: "Comprar y apagar la pantalla", d: { cri: 4, ene: 5, cash: 900, msg: "Compras, cierras la laptop y te vas a hacer otra cosa. Suele funcionar mejor de lo que uno acepta." } },
    ] },
  { id: 41, min: 2, max: 6, t: "Un cliente quiere comprar apalancado", x: "El comprador tiene el activo identificado y quiere saber cuánta deuda le puede meter sin ahorcarse.",
    o: [
      { t: "Armarle la estructura tú mismo", j: "estructura", stat: "mod", d: { car: 6, rep: 6, cash: 5000, mod: 5, msg: "Te sientas a repartir el precio entre deuda y capital." } },
      { t: "Mandarlo con el banco y quedarte fuera", d: { rep: -2, ene: 3, msg: "El banco arma la estructura y se queda con la relación. Tú te quedas con el fee de asesoría y nada más." } },
    ] },
  { id: 42, min: 1, max: 6, t: "Ocho hallazgos sobre la mesa", x: "El equipo junior te deja una lista de hallazgos de la revisión. Tienes que decidir cuáles suben al comité y cuáles son ruido.",
    o: [
      { t: "Filtrar tú los hallazgos", j: "banderas", stat: "cri", d: { cri: 7, rep: 6, car: 4, msg: "Te sientas a separar lo que importa de lo que solo hace ruido." } },
      { t: "Subirlos todos al comité", d: { rep: -4, ene: -3, cri: 2, msg: "El comité se pierde en detalles operativos y el caso pierde fuerza. Filtrar también es tu trabajo." } },
    ] },
  { id: 43, min: 3, max: 6, t: "Te ofrecen invertir junto a un fondo", x: "Un fondo amigo te deja entrar en coinversión con un ticket pequeño. Hay que revisar la compañía rápido.",
    o: [
      { t: "Revisar y decidir tú", j: "banderas", stat: "cri", d: { cash: 6000, cri: 5, red: 4, msg: "Te dan tres días y un archivo comprimido." } },
      { t: "Entrar confiando en el fondo", chk: { s: "red", dif: 60, ok: { cash: 9000, red: 5, msg: "El fondo hizo bien su trabajo y tú te montaste gratis en su análisis." }, no: { cash: -7000, cri: 5, msg: "El fondo también se equivocó. Confiar en el análisis ajeno sale caro cuando sale mal." } } },
    ] },
];
E.push.apply(E, E2);

/* ---------- decisión de rama, aparece una sola vez ---------- */
const DECISION_RAMA = {
  id: 999, clave: true, rama: true, min: 0, max: 6,
  t: "Hacia dónde va tu carrera",
  x: "Ya no eres el que ejecuta lo que le mandan. Los socios te preguntan qué quieres construir de aquí en adelante, y la respuesta define en qué te vuelves bueno.",
  o: RAMAS.map((r) => ({ t: r.n, ramaId: r.id, d: { car: 3, cri: 2, msg: r.d } })),
};

/* ---------- eventos con opciones condicionadas ---------- */
const E3 = [
  { id: 50, min: 0, max: 6, t: "Una cláusula que nadie leyó", x: "El contrato de compraventa trae una cláusula de ajuste de precio redactada de una forma que no cuadra con lo que se negoció.",
    o: [
      { t: "Leerla tú y reescribirla", req: { est: "der" }, j: "banderas", stat: "cri", d: { rep: 8, car: 5, cri: 5, msg: "Abres el contrato en la página correcta antes de que lo haga el abogado del otro lado." } },
      { t: "Mandarla a los abogados y esperar", d: { cash: -2500, ene: -3, car: 1, msg: "Tres días y una factura después, confirman lo que ya sospechabas." } },
      { t: "Firmarla como está", chk: { s: "cri", dif: 70, ok: { car: 3, msg: "No pasó nada. Esta vez." }, no: { cash: -9000, rep: -8, msg: "El ajuste de precio se aplica en contra de tu cliente y la conversación es muy incómoda." } } },
    ] },
  { id: 51, min: 0, max: 6, t: "El modelo se rompió", x: "Referencia circular, cuatro archivos vinculados y una hoja que nadie entiende. La entrega es en seis horas.",
    o: [
      { t: "Escribir un script que lo reconstruya", req: { est: "sis" }, j: "calculo", stat: "mod", d: { mod: 9, car: 5, rep: 6, ene: -5, msg: "En vez de arreglar celdas, automatizas la reconstrucción completa." } },
      { t: "Rehacerlo a mano desde cero", d: { mod: 6, ene: -14, car: 3, msg: "Catorce horas seguidas y un modelo limpio. El método más caro que existe." } },
      { t: "Entregar la versión vieja", d: { rep: -7, ene: 3, msg: "Nadie compara las versiones hasta que alguien las compara." } },
    ] },
  { id: 52, min: 0, max: 6, t: "Cierre contable de la compañía objetivo", x: "Los estados que te mandaron tienen ajustes de último minuto que cambian el EBITDA en un doce por ciento.",
    o: [
      { t: "Revisar los ajustes uno por uno", req: { est: "con" }, j: "ojo", stat: "mod", d: { mod: 8, cri: 6, car: 5, rep: 5, msg: "Sabes exactamente dónde se esconden los ajustes que maquillan un cierre." } },
      { t: "Pedir los estados auditados y esperar", d: { ene: -4, car: 2, rep: 3, msg: "Correcto y lento. El proceso se atrasa un mes." } },
      { t: "Trabajar con el EBITDA ajustado que te dieron", chk: { s: "mod", dif: 65, ok: { car: 3, msg: "Los ajustes eran legítimos. Suerte más que método." }, no: { rep: -9, msg: "El EBITDA ajustado era humo y la valoración entera se cae en due diligence." } } },
    ] },
  { id: 53, min: 0, max: 4, t: "La pregunta de macro en la entrevista", x: "Te preguntan qué pasa con el tipo de cambio si el banco central sube tasas y el fiscal sigue deficitario.",
    o: [
      { t: "Desarrollarla con el marco completo", req: { est: "eco" }, j: "quiz", stat: "cri", d: { car: 6, rep: 7, red: 5, msg: "Es exactamente la pregunta para la que pasaste cuatro años." } },
      { t: "Contestar con intuición de mercado", j: "semaforo", stat: "cri", d: { car: 3, rep: 4, msg: "No tienes el marco pero tienes calle." } },
      { t: "Admitir que no lo tienes claro", d: { rep: 2, cri: 3, msg: "Honesto y poco memorable. Al menos no inventaste." } },
    ] },
  { id: 54, min: 0, max: 6, t: "Controles de cambio de un día para otro", x: "Amaneces con un control cambiario nuevo. Tus ahorros están en moneda local y el dólar oficial no existe en la práctica.",
    o: [
      { t: "Moverlo todo antes del mediodía", req: { pais: ["ve", "ar"] }, j: "reaccion", stat: "cri", d: { cash: 4000, cri: 6, ene: -5, msg: "Creciste con esto. Sabes exactamente a quién llamar y en qué orden." } },
      { t: "Esperar a que se aclare la norma", d: { cash: -3500, cri: 4, msg: "La norma se aclara dos semanas después y para entonces ya perdiste treinta por ciento del poder de compra." } },
      { t: "Consultarlo con un abogado", d: { cash: -1200, cri: 3, rep: 2, msg: "Legalmente impecable y financieramente tarde." } },
    ] },
  { id: 55, min: 1, max: 6, t: "Te ofrecen una visa de trabajo", x: "Una firma de Nueva York quiere contratarte. Sueldo en otra escala, costo de vida en otra escala y tu red se queda del otro lado del mar.",
    o: [
      { t: "Aceptar y mudarte", req: { noPais: "us" }, d: { cash: 9000, mod: 7, red: -8, ene: -9, car: 7, msg: "Otra liga, otro idioma en la mesa y una red que hay que construir desde cero." }, mudar: "us" },
      { t: "Quedarte donde tu red vale algo", d: { red: 7, rep: 4, car: 2, msg: "Tu ventaja competitiva es local y decides no regalarla." } },
    ] },
  { id: 56, min: 2, max: 6, t: "Un socio del club te presenta a alguien", x: "Cena de doce personas, todos con capital. La conversación es informal hasta que deja de serlo.",
    o: [
      { t: "Aprovechar que conoces a media sala", req: { est: "adm" }, j: "memoria", stat: "red", d: { red: 10, car: 5, cash: 4000, msg: "Recuerdas nombres, empresas y quién estuvo en qué operación." } },
      { t: "Quedarte con una conversación larga y buena", d: { red: 6, cri: 3, msg: "Una relación profunda vale más que doce superficiales." } },
      { t: "Irte temprano", d: { ene: 6, red: -2, msg: "Duermes bien y pierdes una noche que quizá importaba." } },
    ] },
];
E.push.apply(E, E3);

/* ---------- eventos encadenados, aparecen solo si los llamas ---------- */
const CADENA = {
  601: { id: 601, min: 0, max: 6, t: "El pasivo que encontraste tiene dueño", x: "La contingencia que levantaste no era un descuido. Alguien la escondió y ese alguien sigue en la compañía.",
    o: [
      { t: "Llevarlo al comité con nombre y apellido", d: { rep: 9, cri: 6, car: 5, red: -4, msg: "Se cae el gerente financiero de la objetivo y el vendedor ajusta el precio. Nadie te lo agradece en persona." } },
      { t: "Reportarlo sin señalar a nadie", d: { rep: 5, cri: 5, car: 3, msg: "El problema se resuelve y la política se evita. Ambas cosas tienen valor." } },
    ] },
  602: { id: 602, min: 0, max: 6, t: "El cliente que perdiste volvió", x: "Aquel cliente al que le sostuviste el número y se fue con la competencia está de vuelta. La otra firma le entregó una valoración que no aguantó el escrutinio.",
    o: [
      { t: "Recibirlo sin cobrar de más", d: { cash: 12000, rep: 9, car: 6, msg: "Vuelve con un mandato más grande y la lección aprendida por su cuenta." } },
      { t: "Cobrarle la prima que ahora vale tu criterio", j: "anclaje", stat: "red", d: { cash: 18000, car: 5, rep: -2, msg: "Tienes todo el poder de negociación y decides usarlo." } },
    ] },
  603: { id: 603, min: 0, max: 6, t: "La contraparte quiere revancha", x: "El director de M&A al que le ganaste el pulso volvió con otra operación y con ganas de cobrársela.",
    o: [
      { t: "Volver a sentarte con él", j: "tresraya", stat: "cri", d: { car: 8, rep: 7, cash: 9000, msg: "Segunda vuelta, misma mesa, más respeto de ambos lados." } },
      { t: "Poner a tu equipo al frente esta vez", d: { car: 4, red: 5, ene: 4, msg: "Delegas la revancha. Tu asociado la maneja bien y tú duermes." } },
    ] },
};

/* ---------- eventos de los modos nuevos ---------- */
const E4 = [
  { id: 60, min: 0, max: 3, t: "La pizarra del comité", x: "El socio borra el pizarrón y escribe seis conceptos con sus definiciones cruzadas. Dice que si no los tienes automatizados, no puedes hablar en una reunión.",
    o: [
      { t: "Resolverla en el momento", j: "pares", stat: "cri", d: { cri: 6, mod: 5, car: 4, rep: 4, msg: "Te paras frente al pizarrón con seis pares desordenados." } },
      { t: "Pedir estudiarlo y volver mañana", d: { mod: 3, rep: -3, ene: -3, msg: "Vuelves al día siguiente sabiéndotelo. La oportunidad de impresionar ya pasó." } },
    ] },
  { id: 61, min: 0, max: 6, t: "Rotar entre activos", x: "Tienes un año movido por delante y la sensación de que quedarte quieto en una sola clase de activo es dejar plata en la mesa.",
    o: [
      { t: "Rotar activamente durante el año", j: "carril", stat: "cri", d: { cash: 4000, cri: 4, ene: -5, msg: "Te pasas el año cambiándote de carril según lo que va pasando." } },
      { t: "Quedarte quieto donde estás", d: { cri: 3, ene: 5, msg: "No tocas nada. Algunos años eso es lo mejor que puedes hacer y otros te cuesta caro." } },
    ] },
  { id: 62, min: 1, max: 6, t: "El tablero de la negociación", x: "Cuatro sesiones de negociación, cada una con concesiones que se acumulan. Quien controle el centro del tablero al final se lleva los términos.",
    o: [
      { t: "Sentarte tú a llevar el tablero", j: "cuatro", stat: "red", d: { car: 7, rep: 6, cash: 6000, msg: "Cada concesión que sueltas cambia la posición de todo lo demás." } },
      { t: "Mandar la propuesta cerrada y no negociar", d: { car: 2, rep: 3, ene: 4, msg: "Tómalo o déjalo. Lo toman, con menos entusiasmo del que hubieras querido." } },
    ] },
  { id: 63, min: 2, max: 6, t: "Cuatro postores por el mismo activo", x: "Sala llena, sobre cerrado y nadie sabe con certeza cuánto vale la compañía. Tu estimación es solo eso, una estimación.",
    o: [
      { t: "Entrar a la puja", j: "subasta", stat: "cri", d: { cash: 9000, car: 6, rep: 5, msg: "Levantas la mano en la primera ronda." } },
      { t: "Quedarte fuera y esperar el próximo proceso", d: { cri: 4, ene: 4, car: -1, msg: "No pujas. Meses después te enteras de a cuánto cerró y haces las cuentas de lo que te habría pasado." } },
    ] },
];
E.push.apply(E, E4);

/* ---------- estado inicial y utilidades de resolución ---------- */

/* ============================================================
   LO QUE SE APRENDE CADA AÑO
   Cada cierre elige una lección que encaje con lo que de verdad
   pasó en tus números. Con treinta cierres, el juego termina
   habiéndote explicado un curso entero sin haberte cobrado uno.
   ============================================================ */
const LECCIONES = [
  { id: "ahorro", pri: 9, cuando: (c) => c.turno <= 3,
    t: "La tasa de ahorro manda",
    x: (c) => `De cada dólar que entró este año te quedaste con ${Math.round(c.ahorro * 100)} centavos. A los veinte, esa proporción decide más tu patrimonio final que cualquier acción que elijas: el que ahorra veinte por ciento y rinde seis termina mejor que el que ahorra cinco y rinde doce.` },
  { id: "compuesto", pri: 8, cuando: (c) => c.cartera > 3000 && c.turno <= 12,
    t: "Interés compuesto, en tus números",
    x: (c) => `Tus ${fmt(c.cartera)} al ${(c.muC * 100).toFixed(1)} por ciento esperado serían cerca de ${fmt(c.cartera * Math.pow(1 + c.muC, 10))} en diez años sin poner un dólar más, y ${fmt(c.cartera * Math.pow(1 + c.muC, 20))} en veinte. No hace falta acertar nada: hace falta no interrumpirlo.` },
  { id: "colchon", pri: 8, cuando: (c) => c.cash < c.gastos * 0.2 && c.turno >= 1,
    t: "Te quedaste sin colchón",
    x: (c) => `Tienes ${fmt(c.cash)} líquidos contra gastos de ${fmt(c.gastos)} al año, o sea menos de tres meses. Sin colchón, cualquier imprevisto te obliga a vender cartera justo cuando el mercado está mal. Esa venta forzada es la que de verdad hace daño.` },
  { id: "exceso", pri: 7, cuando: (c) => c.objetivo <= 0.35 && c.cash > c.gastos * 1.2 && c.turno >= 2,
    t: "Demasiado quieto en efectivo",
    x: (c) => `Dejaste ${fmt(c.cash)} sin invertir, más de un año de gastos. El efectivo rinde cerca de dos por ciento y la inflación se lo come. Sentirse seguro y estar seguro no son lo mismo: la cuenta corriente tiene riesgo, solo que no se ve en el estado de cuenta.` },
  { id: "conc", pri: 9, cuando: (c) => c.conc.max >= 0.5,
    t: "Estás concentrado",
    x: (c) => `${Math.round(c.conc.max * 100)} por ciento de tu cartera está en ${c.conc.activo.n.toLowerCase()}. Concentrarse es la forma más rápida de hacerse rico y también la más rápida de dejar de serlo. Si esa posición cae la mitad, tu patrimonio se lleva ${Math.round(c.conc.max * 50)} por ciento del golpe.` },
  { id: "cripto", pri: 8, cuando: (c) => (c.pesos.cripto || 0) >= 0.2,
    t: "El tamaño de la apuesta",
    x: (c) => `Llevas ${Math.round((c.pesos.cripto || 0) * 100)} por ciento en cripto. Un activo que puede caer setenta por ciento no se mide por su retorno esperado sino por cuánto de tu patrimonio aguanta ese escenario sin que cambies de estrategia a mitad del camino.` },
  { id: "vol", pri: 10, cuando: (c) => c.ret <= -0.09,
    t: "Volatilidad no es pérdida",
    x: (c) => `Perdiste ${Math.abs(c.ret * 100).toFixed(1)} por ciento este año, unos ${fmt(Math.abs(c.deltaC))}. Con una cartera de tu perfil, un año así entra dentro de lo esperado: la desviación es ${(c.sdC * 100).toFixed(1)} puntos. La pérdida se hace definitiva solo si vendes ahora.` },
  { id: "recup", pri: 8, cuando: (c) => c.ret <= -0.15,
    t: "La aritmética de las caídas",
    x: (c) => `Caer ${Math.abs(c.ret * 100).toFixed(0)} por ciento exige subir ${((1 / (1 + c.ret) - 1) * 100).toFixed(0)} para volver al punto de partida. Por eso se cuida la caída máxima antes que el retorno: las pérdidas y las ganancias no son simétricas.` },
  { id: "buen", pri: 5, cuando: (c) => c.ret >= 0.16,
    t: "Cuidado con el año bueno",
    x: (c) => `Ganaste ${(c.ret * 100).toFixed(1)} por ciento. El riesgo ahora es concluir que tu criterio es excelente y subir la apuesta. Un año no distingue habilidad de suerte: para eso hacen falta muchos, y aún así cuesta.` },
  { id: "gasto", pri: 9, cuando: (c) => c.gastoAnt > 0 && c.gastos > c.gastoAnt * 1.16,
    t: "El gasto persigue al sueldo",
    x: (c) => `Tus gastos pasaron de ${fmt(c.gastoAnt)} a ${fmt(c.gastos)}, casi ${Math.round((c.gastos / c.gastoAnt - 1) * 100)} por ciento más. Es lo normal cuando sube el ingreso, y es la razón por la que gente que gana mucho no acumula nada. Cada dólar de gasto fijo nuevo son veinticinco dólares que necesitas para poder dejar de trabajar.` },
  { id: "consumo", pri: 7, cuando: (c) => c.consumo > c.patrimonio * 0.12 && c.consumo > 20000,
    t: "Lo que compraste no es patrimonio",
    x: (c) => `Llevas ${fmt(c.consumo)} en cosas que no se recuperan y encima cuestan mantener. No es un error, es una decisión: solo conviene saber que ese dinero no está trabajando y que su mantenimiento se paga todos los años.` },
  { id: "renta", pri: 6, cuando: (c) => c.rentaProps > 0,
    t: "Ingreso que no depende de ti",
    x: (c) => `Tus propiedades te dejaron ${fmt(c.rentaProps)} sin que fueras a la oficina, es decir ${Math.round(c.rentaProps / c.gastos * 100)} por ciento de tu costo de vida. Ese es el número que de verdad importa: qué parte de tu vida se paga sola.` },
  { id: "cobertura", pri: 9, cuando: (c) => c.cobertura >= 0.25 && c.cobertura < 1,
    t: "Vas por el camino",
    x: (c) => `Tu patrimonio ya cubre ${Math.round(c.cobertura * 100)} por ciento de lo que gastas al año si retiras el cuatro por ciento. Para llegar a cien te faltan cerca de ${fmt(Math.max(0, c.gastos * 25 - c.patrimonio))}. Bajar el gasto acorta esa distancia más rápido que subir el retorno.` },
  { id: "libre", pri: 10, cuando: (c) => c.cobertura >= 1,
    t: "Ya no trabajas por necesidad",
    x: (c) => `Con ${fmt(c.patrimonio)} y un retiro del cuatro por ciento cubres tus ${fmt(c.gastos)} de gastos. Desde aquí trabajar es una elección. La trampa que sigue es subir el nivel de vida hasta volver a necesitar el sueldo.` },
  { id: "impuesto", pri: 5, cuando: (c) => c.impuesto > c.ingreso * 0.2,
    t: "El socio silencioso",
    x: (c) => `Pagaste ${fmt(c.impuesto)} de impuesto, ${Math.round(c.impuesto / c.ingreso * 100)} por ciento de todo lo que entró. Antes de buscar un punto extra de retorno vale revisar la estructura fiscal: ahí suele haber más dinero y con mucho menos riesgo.` },
  { id: "comision", pri: 6, cuando: (c) => c.comisiones > 500,
    t: "Lo que cuesta cambiar de opinión",
    x: (c) => `Llevas ${fmt(c.comisiones)} pagados en comisiones por rebalancear. Cada movimiento tiene un costo cierto contra un beneficio incierto. Rebalancear una vez al año es sano; rebalancear cada vez que hay una noticia es pagar por sentirte activo.` },
  { id: "divers", pri: 7, cuando: (c) => c.sdC > 0 && c.sdCsuma > 0 && c.sdC < c.sdCsuma * 0.86,
    t: "Diversificación medida",
    x: (c) => `Tus activos por separado suman ${(c.sdCsuma * 100).toFixed(1)} puntos de volatilidad, pero tu cartera tiene ${(c.sdC * 100).toFixed(1)}. Esa diferencia es el único almuerzo gratis que existe en finanzas, y aparece porque no todo se cae el mismo día.` },
  { id: "beta", pri: 6, cuando: (c) => c.betaC >= 0.8,
    t: "Todo tu riesgo es el mismo riesgo",
    x: (c) => `La beta de tu cartera es ${c.betaC.toFixed(2)}: casi todo lo que tienes se mueve con el mercado global. Tener siete líneas distintas no es diversificar si las siete responden al mismo factor.` },
  { id: "secuencia", pri: 9, cuando: (c) => c.edad >= 45 && c.cobertura >= 0.6,
    t: "El orden de los retornos",
    x: (c) => `Ya estás cerca de vivir de tu capital. A partir de aquí importa el orden: dos años malos al principio del retiro hacen más daño que los mismos dos años al final, porque vendes cuando está barato. Por eso se baja el riesgo antes de retirarse, no después.` },
  { id: "moneda", pri: 5, cuando: (c) => c.tax >= 0.22 || c.pais === "ar" || c.pais === "ve",
    t: "El riesgo que viene con el pasaporte",
    x: (c) => `Vives y cobras en un país donde la moneda y las reglas cambian. Buena parte de tu patrimonio debería estar en activos que no dependan de esa decisión, no por pesimismo sino por la misma razón por la que no se pone todo en una sola empresa.` },
  { id: "millon", pri: 10, cuando: (c) => c.patrimonio >= 1000000 && c.patAntes < 1000000,
    t: "El primer millón",
    x: (c) => `Cruzaste el millón. Lo interesante es lo que viene: al ${(c.muC * 100).toFixed(1)} por ciento esperado, tu cartera sola genera cerca de ${fmt(c.cartera * c.muC)} al año, comparado con tu sueldo de ${fmt(c.salario)}. A partir de cierto punto el capital trabaja más que tú.` },
  { id: "fondo", pri: 8, cuando: (c) => c.fondo && c.turno >= 12,
    t: "Comisiones del otro lado",
    x: (c) => `Tu fondo te paga dos por ciento sobre ${fmt(c.fondo.tam)} todos los años sin importar cómo rinda, más veinte por ciento de las ganancias. Ahora lo ves desde el lado del gestor: por eso el negocio es levantar capital, y por eso al invertir hay que mirar la comisión antes que el track record.` },
  { id: "sueldo", pri: 8, cuando: (c) => c.turno <= 6 && c.cartera < c.salario,
    t: "Tu mayor activo eres tú",
    x: (c) => `Tu cartera son ${fmt(c.cartera)} y tu sueldo ${fmt(c.salario)} al año. A esta edad el retorno más alto disponible no está en el mercado: está en volverte más caro de reemplazar. Ese es el activo que compone más rápido en la primera década.` },
  { id: "burnout", pri: 10, cuando: (c) => c.ene <= 25,
    t: "El activo que no aparece en el balance",
    x: (c) => `Tu energía está en ${Math.round(c.ene)} de cien. Nada de esto sirve si te rompes a los cuarenta: el capital humano se deprecia sin mantenimiento igual que un galpón, solo que nadie te lo factura hasta que ya pasó.` },
  { id: "ladrillo", pri: 8, cuando: (c) => c.bienesV > c.patrimonio * 0.55 && c.patrimonio > 100000,
    t: "Patrimonio en ladrillo",
    x: (c) => `${Math.round(c.bienesV / c.patrimonio * 100)} por ciento de lo que tienes está en inmuebles y bienes. Rinden y aprecian, pero no se venden en una semana ni por partes. La iliquidez no se siente hasta el día que necesitas efectivo.` },
  { id: "mantener", pri: 6, cuando: (c) => c.mantenimiento > c.gastos * 0.2,
    t: "Lo que cuesta mantener lo que tienes",
    x: (c) => `Mantener tus bienes te cuesta ${fmt(c.mantenimiento)} al año, ${Math.round(c.mantenimiento / c.gastos * 100)} por ciento de tu costo de vida. Cada compra grande trae un gasto fijo detrás, y el gasto fijo es lo que decide cuánto capital necesitas para dejar de trabajar.` },
  { id: "rotar", pri: 7, cuando: (c) => c.rotado >= 1.6,
    t: "Moverse no es lo mismo que avanzar",
    x: (c) => `Llevas el equivalente a ${c.rotado.toFixed(1)} veces tu cartera rotada entre activos. Cada rotación tiene un costo cierto y un beneficio incierto. La cartera que menos se toca casi siempre le gana a la que se ajusta con cada titular.` },
  { id: "seguro", pri: 6, cuando: (c) => c.patrimonio > 250000 && c.turno >= 10,
    t: "Lo que puede borrar treinta años",
    x: (c) => `Tienes ${fmt(c.patrimonio)} construidos con trabajo de años. Un juicio, una enfermedad larga o un accidente pueden borrar una parte enorme de eso en un mes. A partir de cierto patrimonio, protegerlo rinde más que hacerlo crecer un punto extra.` },
  { id: "impuestoretiro", pri: 8, cuando: (c) => c.edad >= 42 && c.cartera > 400000,
    t: "El orden en que se saca la plata",
    x: (c) => `Cuando empieces a vivir de tus ${fmt(c.cartera)} de cartera, importa de dónde retiras primero y qué impuesto paga cada retiro. Dos personas con el mismo patrimonio pueden terminar con años de diferencia de duración solo por ese orden.` },
  { id: "menosriesgo", pri: 9, cuando: (c) => c.edad >= 44 && c.sdC >= 0.16,
    t: "Ya no necesitas tanto riesgo",
    x: (c) => `Tu cartera tiene ${(c.sdC * 100).toFixed(0)} puntos de volatilidad y ya cubres ${Math.round(c.cobertura * 100)} por ciento de tus gastos. Cuando el objetivo está a la vista, el riesgo deja de ser una herramienta y pasa a ser una amenaza: puedes perder lo que ya ganaste sin necesitarlo.` },
  { id: "gastoreal", pri: 7, cuando: (c) => c.turno >= 8 && c.gastos > 0,
    t: "El número que de verdad manda",
    x: (c) => `Todo tu plan se reduce a una resta: entran ${fmt(c.ingreso)} y se van ${fmt(c.gastos + c.impuesto)} entre gastos e impuestos. Puedes trabajar años en subir el primer número, pero bajar el segundo tiene efecto inmediato y además reduce el capital que necesitas para siempre.` },
  { id: "herencia", pri: 6, cuando: (c) => c.edad >= 46 && c.patrimonio > 1500000,
    t: "Lo que pasa después",
    x: (c) => `Con ${fmt(c.patrimonio)} el problema deja de ser acumular y empieza a ser transferir. Sin estructura, una parte importante se va en impuestos, trámites y peleas familiares. Es la parte menos glamorosa de las finanzas y la que más patrimonio ha destruido.` },
  { id: "paciencia", pri: 4, cuando: () => true,
    t: "Nada de esto pasa rápido",
    x: (c) => `Llevas ${c.turno + 1} años y ${fmt(c.patrimonio)}. Casi todo el patrimonio de una vida se forma en los últimos diez años, no porque ahorres más, sino porque el interés compuesto trabaja sobre una base que ya es grande. La parte difícil es la de ahora, cuando todavía no se ve.` },
  { id: "media", pri: 4, cuando: () => true,
    t: "El promedio no existe en un solo año",
    x: (c) => `Tu cartera espera ${(c.muC * 100).toFixed(1)} por ciento al año, pero casi ningún año va a dar eso. Este dio ${(c.ret * 100).toFixed(1)}. El promedio aparece al final del camino, no en el camino, y esa es la razón por la que la mayoría abandona antes de cobrarlo.` },
  { id: "decision", pri: 4, cuando: (c) => c.turno >= 4,
    t: "Casi todo se decide con poca información",
    x: (c) => `Cada año de esto son tres o cuatro decisiones tomadas con datos incompletos y sin saber cómo terminan. El oficio no es acertar siempre: es que ninguna decisión suelta pueda sacarte del juego. Ese criterio se nota en tu patrimonio de ${fmt(c.patrimonio)} más que cualquier acierto puntual.` },
];

const escogerLeccion = (c, usadas) => {
  const aptas = LECCIONES.filter((l) => { try { return l.cuando(c); } catch (e) { return false; } });
  if (!aptas.length) return null;
  const nuevas = aptas.filter((l) => usadas.indexOf(l.id) < 0);
  const pool = nuevas.length ? nuevas : aptas;
  pool.sort((a, b) => b.pri - a.pri);
  const top = pool.filter((l) => l.pri === pool[0].pri);
  const l = elegirAzar(top);
  return { id: l.id, t: l.t, x: l.x(c) };
};

/* hitos: solo se celebran la primera vez que se cruzan */
const HITOS = [
  { v: 10000, t: "Primeros diez mil" },
  { v: 50000, t: "Cincuenta mil" },
  { v: 100000, t: "Seis cifras" },
  { v: 250000, t: "Un cuarto de millón" },
  { v: 500000, t: "Medio millón" },
  { v: 1000000, t: "El primer millón" },
  { v: 3000000, t: "Tres millones" },
  { v: 10000000, t: "Ocho cifras" },
];

/* ============================================================
   GUARDAR LA PARTIDA
   Treinta años son demasiado recorrido para perderlo al recargar.
   Se intenta el almacén del entorno; si no existe, el del navegador;
   si tampoco, la partida simplemente no se guarda y el juego sigue
   funcionando igual. Se graba al cerrar cada año y se borra al final.
   ============================================================ */
const CLAVE = "el-analista-partida";
const VERSION = 5;

const conAlmacen = () => typeof window !== "undefined" && window.storage && typeof window.storage.get === "function";
const conLocal = () => {
  try { return typeof window !== "undefined" && !!window.localStorage; } catch (e) { return false; }
};

const guardarPartida = async (dato) => {
  const txt = JSON.stringify(dato);
  if (conAlmacen()) {
    try { await window.storage.set(CLAVE, txt); return true; } catch (e) { /* sigue al de abajo */ }
  }
  if (conLocal()) {
    try { window.localStorage.setItem(CLAVE, txt); return true; } catch (e) { return false; }
  }
  return false;
};

const leerPartida = async () => {
  if (conAlmacen()) {
    try {
      const r = await window.storage.get(CLAVE);
      if (r && r.value) return JSON.parse(r.value);
    } catch (e) { /* la clave puede no existir: no es un error */ }
  }
  if (conLocal()) {
    try {
      const t = window.localStorage.getItem(CLAVE);
      if (t) return JSON.parse(t);
    } catch (e) { return null; }
  }
  return null;
};

const olvidarPartida = async () => {
  if (conAlmacen()) { try { await window.storage.delete(CLAVE); } catch (e) {} }
  if (conLocal()) { try { window.localStorage.removeItem(CLAVE); } catch (e) {} }
};

const BASE = {
  turno: 0, rango: 0, carrera: 0,
  mod: 26, cri: 24, red: 14, rep: 38, ene: 84,
  cash: 2000, cartera: 0,
  perfil: "conservador",
  pesos: { ...PERFILES[0].w },   /* cómo está repartida la cartera */
  objetivo: 0.7,                 /* qué parte de tu dinero líquido quieres invertida */
  histo: [], lecs: [], rotado: 0, comisiones: 0, gastoAnt: 0, techo: 0,
  pais: null, estudio: null,
  perks: [], bienes: [], valores: {},
  titulares: [], vistos: [], burnouts: 0, seguir: 0, rama: null, fondo: null,
};

const TOPES = [30, 35, 40]; // 50, 55 y 60 años
const semestre = (t) => String(2026 + t);
const edad = (t) => 20 + t;
const esClave = (t) => t % 2 === 1;
const tiene = (st, id) => st.perks.includes(id);

const escalar = (d, nivel) => {
  const f = nivel === "exito" ? 1.6 : nivel === "parcial" ? 1 : 0.3;
  const g = nivel === "fallo" ? 1.6 : 1;
  const out = { ...d };
  ["mod", "cri", "red", "rep", "ene", "car", "cash"].forEach((k) => {
    if (!out[k]) return;
    out[k] = Math.round(out[k] > 0 ? out[k] * f : out[k] * g);
  });
  return out;
};

/* ============================ MINIJUEGOS ============================ */

function JuegoPrecision({ ayuda, onFin }) {
  const ancho = clamp(11 + ayuda * 0.15, 11, 28);
  const [ronda, setRonda] = useState(0);
  const [pos, setPos] = useState(0);
  const [zona, setZona] = useState(() => 22 + Math.random() * 56);
  const [hits, setHits] = useState(0);
  const [pausa, setPausa] = useState(false);
  const [aviso, setAviso] = useState(null);
  const dir = useRef(1);
  const anchoR = ancho * Math.pow(0.78, ronda);
  const vel = 1 + ronda * 0.5;

  useEffect(() => {
    if (pausa) return;
    const id = setInterval(() => {
      setPos((p) => {
        let n = p + dir.current * vel;
        if (n >= 100) { n = 100; dir.current = -1; }
        if (n <= 0) { n = 0; dir.current = 1; }
        return n;
      });
    }, 16);
    return () => clearInterval(id);
  }, [pausa, vel]);

  const fijar = () => {
    setPausa(true);
    const dentro = Math.abs(pos - zona) <= anchoR / 2;
    const h = hits + (dentro ? 1 : 0);
    setHits(h);
    setAviso(dentro ? "Dentro del rango" : "Fuera por " + Math.abs(pos - zona).toFixed(1) + " puntos");
    setTimeout(() => {
      if (ronda >= 2) onFin(h >= 3 ? "exito" : h === 2 ? "parcial" : "fallo");
      else {
        setRonda(ronda + 1); setZona(22 + Math.random() * 56);
        setPos(0); dir.current = 1; setAviso(null); setPausa(false);
      }
    }, 900);
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Intento {ronda + 1} de 3</span><span>Aciertos {hits}</span></div>
      <div className="ea-pbar">
        <div className="ea-pzona" style={{ left: (zona - anchoR / 2) + "%", width: anchoR + "%" }} />
        <div className="ea-pcursor" style={{ left: pos + "%" }} />
      </div>
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#3A4649" }}>{aviso}</div>
      <button className="ea-btn" onClick={fijar} disabled={pausa}>Fijar</button>
    </div>
  );
}

function JuegoMemoria({ ayuda, onFin }) {
  const largo = clamp(7 - Math.floor(ayuda / 25), 4, 7);
  const [seq] = useState(() => Array.from({ length: largo }, () => Math.floor(Math.random() * 9)));
  const [idx, setIdx] = useState(0);
  const [on, setOn] = useState(null);
  const [modo, setModo] = useState("ver");
  const [paso, setPaso] = useState(0);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (modo !== "ver") return;
    if (idx >= seq.length) { const t = setTimeout(() => setModo("jugar"), 380); return () => clearTimeout(t); }
    setOn(seq[idx]);
    const a = setTimeout(() => setOn(null), 450);
    const b = setTimeout(() => setIdx(idx + 1), 680);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [idx, modo, seq]);

  const tocar = (i) => {
    if (modo !== "jugar") return;
    if (i === seq[paso]) {
      const p = paso + 1;
      setPaso(p); setOn(i); setTimeout(() => setOn(null), 150);
      if (p >= seq.length) { setModo("fin"); setTimeout(() => onFin("exito"), 450); }
    } else {
      setErr(i); setModo("fin");
      const r = paso / seq.length;
      setTimeout(() => onFin(r >= 0.65 ? "parcial" : "fallo"), 650);
    }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>{modo === "ver" ? "Memoriza la secuencia" : "Repítela"}</span>
        <span>{paso} de {seq.length}</span>
      </div>
      <div className="ea-celdas">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className={"ea-celda" + (on === i ? " on" : "") + (err === i ? " mal" : "")} onClick={() => tocar(i)} />
        ))}
      </div>
    </div>
  );
}

function JuegoOjo({ ayuda, onFin }) {
  const segs = clamp(3.5 + ayuda / 28, 3.5, 7.5);
  const armar = () => {
    const a = Math.floor(1000 + Math.random() * 8000);
    const s = a.toString();
    const arr = s.split("");
    const i = Math.floor(Math.random() * 3);
    const tmp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = tmp;
    let b = arr.join("");
    if (b === s) b = (a + 9).toString();
    const fila = Array.from({ length: 12 }, () => s);
    const pos = Math.floor(Math.random() * 12);
    fila[pos] = b;
    return { fila, pos };
  };
  const [ronda, setRonda] = useState(0);
  const [tab, setTab] = useState(armar);
  const [hits, setHits] = useState(0);
  const [t, setT] = useState(segs);
  const [aviso, setAviso] = useState(null);

  const resolver = (ok) => {
    if (aviso) return;
    const h = hits + (ok ? 1 : 0);
    setHits(h);
    setAviso(ok ? "Correcto" : "Se te pasó");
    setTimeout(() => {
      if (ronda >= 2) onFin(h >= 3 ? "exito" : h === 2 ? "parcial" : "fallo");
      else { setRonda(ronda + 1); setTab(armar()); setT(segs); setAviso(null); }
    }, 750);
  };

  useEffect(() => {
    if (aviso) return;
    const id = setInterval(() => setT((x) => Math.max(0, +(x - 0.1).toFixed(1))), 100);
    return () => clearInterval(id);
  }, [aviso, ronda]);

  useEffect(() => { if (t === 0) resolver(false); }, [t]);

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Cifra {ronda + 1} de 3</span><span>{t.toFixed(1)} s · aciertos {hits}</span></div>
      <div className="ea-nums">
        {tab.fila.map((n, i) => (
          <div className="ea-num ea-mono" key={i} onClick={() => resolver(i === tab.pos)}>{n}</div>
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 10, fontSize: 13.5, color: "#3A4649" }}>{aviso}</div>
    </div>
  );
}

function JuegoAnclaje({ ayuda, onFin }) {
  const ancho = clamp(8 + ayuda * 0.1, 8, 20);
  const [centro] = useState(() => 18 + Math.random() * 64);
  const [v, setV] = useState(50);
  const [n, setN] = useState(0);
  const [hist, setHist] = useState([]);
  const [cerrado, setCerrado] = useState(false);

  const ofrecer = () => {
    const dif = v - centro;
    const dentro = Math.abs(dif) <= ancho / 2;
    const intento = n + 1;
    let msg;
    if (dentro) msg = "Acuerdo cerrado";
    else if (Math.abs(dif) > 24) msg = dif > 0 ? "Muy por encima de lo que pagan" : "Muy por debajo, dejas valor en la mesa";
    else msg = dif > 0 ? "Un poco alto, están cerca" : "Un poco bajo, están cerca";
    setHist([...hist, { v, msg, dentro }]);
    setN(intento);
    if (dentro) { setCerrado(true); setTimeout(() => onFin(intento <= 2 ? "exito" : "parcial"), 750); }
    else if (intento >= 4) { setCerrado(true); setTimeout(() => onFin("fallo"), 750); }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Oferta {Math.min(n + 1, 4)} de 4</span><span>Tu número {v}</span></div>
      <input className="ea-slider" type="range" min="0" max="100" value={v} disabled={cerrado}
        onChange={(e) => setV(parseInt(e.target.value, 10))} aria-label="Tu oferta" />
      <div style={{ marginTop: 10 }}>
        {hist.map((h, i) => (
          <div key={i} style={{ fontSize: 13.5, color: h.dentro ? "#3E6B3C" : "#3A4649" }}>
            <span className="ea-mono">{h.v}</span> · {h.msg}
          </div>
        ))}
      </div>
      <button className="ea-btn" onClick={ofrecer} disabled={cerrado}>Poner el número sobre la mesa</button>
    </div>
  );
}

function JuegoSuerte({ ayuda, onFin }) {
  const [mult, setMult] = useState(1);
  const [paso, setPaso] = useState(0);
  const [estado, setEstado] = useState(null);
  const riesgo = clamp(0.1 + paso * 0.075 - ayuda / 900, 0.05, 0.72);

  const aguantar = () => {
    if (Math.random() < riesgo) { setEstado("Se te dio vuelta la posición"); setTimeout(() => onFin("fallo"), 850); }
    else { setMult(+(mult + 0.32 + paso * 0.11).toFixed(2)); setPaso(paso + 1); }
  };
  const cerrar = () => {
    setEstado("Cerraste en " + mult.toFixed(2) + "x");
    setTimeout(() => onFin(mult >= 2.4 ? "exito" : mult >= 1.6 ? "parcial" : "fallo"), 850);
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Múltiplo acumulado</span><span>Riesgo de vuelta {(riesgo * 100).toFixed(0)} por ciento</span></div>
      <div className="ea-mult ea-mono">{mult.toFixed(2)}x</div>
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#3A4649" }}>{estado}</div>
      <div className="ea-fila2">
        <button className="ea-btn" style={{ marginTop: 0 }} onClick={aguantar} disabled={!!estado}>Aguantar</button>
        <button className="ea-btn" style={{ marginTop: 0, background: "var(--cobre)" }} onClick={cerrar} disabled={!!estado}>Cerrar posición</button>
      </div>
    </div>
  );
}

const LINEAS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function JuegoTresRaya({ ayuda, onFin }) {
  const [b, setB] = useState(Array(9).fill(null));
  const [bloqueo, setBloqueo] = useState(false);
  const [estado, setEstado] = useState(null);
  const [linea, setLinea] = useState([]);
  const torpeza = clamp(ayuda / 150, 0.08, 0.6);

  const ganador = (bd, p) => LINEAS.find((l) => l.every((i) => bd[i] === p));
  const libres = (bd) => bd.reduce((a, v, i) => (v === null ? a.concat(i) : a), []);

  const jugadaIA = (bd) => {
    const l = libres(bd);
    if (Math.random() < torpeza) return elegirAzar(l);
    for (const i of l) { const t = bd.slice(); t[i] = "O"; if (ganador(t, "O")) return i; }
    for (const i of l) { const t = bd.slice(); t[i] = "X"; if (ganador(t, "X")) return i; }
    if (bd[4] === null) return 4;
    const esq = [0, 2, 6, 8].filter((i) => bd[i] === null);
    if (esq.length) return elegirAzar(esq);
    return l[0];
  };

  const terminar = (n, l) => { setEstado(n); setLinea(l || []); setBloqueo(true); setTimeout(() => onFin(n), 1050); };

  const tocar = (i) => {
    if (bloqueo || b[i] || estado) return;
    const nb = b.slice(); nb[i] = "X"; setB(nb);
    const g = ganador(nb, "X");
    if (g) { terminar("exito", g); return; }
    if (libres(nb).length === 0) { terminar("parcial"); return; }
    setBloqueo(true);
    setTimeout(() => {
      const j = jugadaIA(nb);
      const nb2 = nb.slice(); nb2[j] = "O"; setB(nb2);
      const g2 = ganador(nb2, "O");
      if (g2) { terminar("fallo", g2); return; }
      if (libres(nb2).length === 0) { terminar("parcial"); return; }
      setBloqueo(false);
    }, 400);
  };

  const txt = { exito: "Cerraste en tus términos", parcial: "Empate, partieron la diferencia", fallo: "Te sacaron las concesiones" };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Tú juegas con X</span><span>Lectura de la contraparte {Math.round(100 - torpeza * 100)}</span></div>
      <div className="ea-celdas">
        {b.map((v, i) => (
          <div key={i} className={"ea-celda" + (linea.indexOf(i) >= 0 ? " gana" : "")} onClick={() => tocar(i)}>{v}</div>
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 12, fontSize: 14, color: "#3A4649" }}>{estado ? txt[estado] : ""}</div>
    </div>
  );
}

function JuegoQuiz({ ayuda, nivel, onFin }) {
  const nv = nivel || 1;
  const total = largoExamen(nv);
  const [preg] = useState(() => armarExamen(nv, total).map((p) => {
    const correcta = p.o[p.c];
    let ops = p.o.slice();
    if (ayuda >= 55 && ops.length > 2) {
      const malas = ops.filter((x) => x !== correcta);
      const fuera = elegirAzar(malas);
      ops = ops.filter((x) => x !== fuera);
    }
    ops = ops.sort(() => Math.random() - 0.5);
    return { q: p.q, e: p.e, ops, correcta, nv: p.nv };
  }));
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [ok, setOk] = useState(0);
  const p = preg[i];

  const responder = (t) => {
    if (sel !== null) return;
    setSel(t);
    setOk(ok + (t === p.correcta ? 1 : 0));
  };

  const seguir = () => {
    if (i >= total - 1) onFin(ok === total ? "exito" : ok / total >= 0.6 ? "parcial" : "fallo");
    else { setI(i + 1); setSel(null); }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Pregunta {i + 1} de {total} · {NIVEL_N[nv].toLowerCase()}</span>
        <span>{ayuda >= 55 ? "Tu criterio descartó una opción" : "Aciertos " + ok}</span>
      </div>
      <p className="ea-qtxt">{p.q}</p>
      <div className="ea-ops" style={{ marginTop: 0 }}>
        {p.ops.map((t, k) => {
          let cls = "ea-op";
          if (sel !== null && t === p.correcta) cls += " ok";
          else if (sel === t) cls += " no";
          return (
            <button className={cls} key={k} disabled={sel !== null} onClick={() => responder(t)}>
              <span className="ea-opN ea-mono">{String.fromCharCode(65 + k)}</span>{t}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div>
          <div className="ea-expl">{p.e}</div>
          <button className="ea-btn" onClick={seguir}>{i >= total - 1 ? "Terminar" : "Continuar"}</button>
        </div>
      )}
    </div>
  );
}

/* ---- rápidos ---- */

function JuegoReaccion({ ayuda, onFin }) {
  const [estado, setEstado] = useState("espera");
  const [ronda, setRonda] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [msg, setMsg] = useState("Prepárate");
  const t0 = useRef(0);
  const timer = useRef(null);
  const bueno = 380 + ayuda * 2.4;
  const regular = 720 + ayuda * 2.4;

  useEffect(() => {
    setEstado("espera"); setMsg("Prepárate");
    timer.current = setTimeout(() => {
      setEstado("lista"); setMsg("Ahora"); t0.current = Date.now();
    }, 800 + Math.random() * 1900);
    return () => clearTimeout(timer.current);
  }, [ronda]);

  const avanzar = (p, texto) => {
    const total = puntos + p;
    setPuntos(total); setEstado("hecho"); setMsg(texto);
    clearTimeout(timer.current);
    setTimeout(() => {
      if (ronda >= 2) onFin(total >= 5 ? "exito" : total >= 3 ? "parcial" : "fallo");
      else setRonda(ronda + 1);
    }, 850);
  };

  const click = () => {
    if (estado === "espera") { avanzar(0, "Te adelantaste, orden al precio equivocado"); return; }
    if (estado !== "lista") return;
    const ms = Date.now() - t0.current;
    if (ms <= bueno) avanzar(2, ms + " ms, ejecución perfecta");
    else if (ms <= regular) avanzar(1, ms + " ms, pasable");
    else avanzar(0, ms + " ms, se movió el precio");
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Orden {ronda + 1} de 3</span><span>Puntos {puntos} de 6</span></div>
      <div className={"ea-luz" + (estado === "lista" ? " lista" : estado === "hecho" ? " roja" : "")}
        onClick={click} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") click(); }}>
        {msg}
      </div>
      <div style={{ fontSize: 12.5, color: "var(--gris)", marginTop: 9 }}>Toca el panel apenas se ponga verde.</div>
    </div>
  );
}

/* cada generador declara desde qué nivel aparece, así las cuentas
   se van complicando en vez de repetirse durante treinta años */
const CUENTAS = [
  { min: 1, f: () => {
    const v = [80, 100, 120, 150, 200][Math.floor(Math.random() * 5)];
    const mrg = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
    const u = v * mrg / 100;
    return { q: `Ventas de ${v} y utilidad de ${u}. El margen es`, ops: [mrg, mrg + 5, Math.round(u / (v + u) * 100)], c: mrg, u: " por ciento" };
  } },
  { min: 1, f: () => {
    const compra = [40, 50, 80, 120][Math.floor(Math.random() * 4)];
    const f = [1.25, 1.5, 1.75, 2][Math.floor(Math.random() * 4)];
    const c = Math.round((f - 1) * 100);
    return { q: `Compraste a ${compra} y vendiste a ${compra * f}. Tu retorno es`, ops: [c, Math.round((1 - 1 / f) * 100), c + 10], c, u: " por ciento" };
  } },
  { min: 1, f: () => {
    const r = [4, 6, 8, 9, 12][Math.floor(Math.random() * 5)];
    const c = Math.round(72 / r);
    return { q: `A una tasa de ${r} por ciento anual, el capital se duplica aproximadamente en`, ops: [c, c + 4, Math.max(2, c - 3)], c, u: " años" };
  } },
  { min: 2, f: () => {
    const eb = 8 + Math.floor(Math.random() * 12), m = 4 + Math.floor(Math.random() * 5), dn = 10 + Math.floor(Math.random() * 25);
    const c = eb * m - dn;
    return { q: `EBITDA de ${eb} millones, múltiplo de ${m} veces y deuda neta de ${dn} millones. El equity value es`, ops: [c, eb * m + dn, eb * (m - 1) - dn], c, u: " millones" };
  } },
  { min: 2, f: () => {
    const dur = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
    const pb = [1, 2][Math.floor(Math.random() * 2)];
    const c = dur * pb;
    return { q: `Duración modificada de ${dur} y las tasas suben ${pb} por ciento. El precio del bono cae cerca de`, ops: [c, pb, dur], c, u: " por ciento" };
  } },
  { min: 2, f: () => {
    const renta = [60, 90, 120, 180][Math.floor(Math.random() * 4)];
    const cap = [6, 8, 9, 10][Math.floor(Math.random() * 4)];
    const c = Math.round(renta / (cap / 100));
    return { q: `Un inmueble renta ${renta} mil netos al año y el mercado paga una tasa de capitalización de ${cap} por ciento. Vale cerca de`, ops: [c, Math.round(renta * cap), Math.round(renta / (cap / 50))], c, u: " mil" };
  } },
  { min: 3, f: () => {
    const eb = [20, 30, 40, 60][Math.floor(Math.random() * 4)];
    const d = [80, 120, 150, 200][Math.floor(Math.random() * 4)];
    const tasa = [8, 10, 12][Math.floor(Math.random() * 3)];
    const int = d * tasa / 100;
    const c = +(eb / int).toFixed(1);
    return { q: `EBITDA de ${eb} y deuda de ${d} al ${tasa} por ciento. La cobertura de intereses es`, ops: [c, +(eb / d * 10).toFixed(1), +(int / eb).toFixed(1)], c, u: " veces" };
  } },
  { min: 3, f: () => {
    const acc = [80, 100, 120][Math.floor(Math.random() * 3)];
    const nue = [20, 25, 40][Math.floor(Math.random() * 3)];
    const c = Math.round(nue / (acc + nue) * 100);
    return { q: `Hay ${acc} millones de acciones y se emiten ${nue} millones nuevas. La dilución del accionista actual es`, ops: [c, Math.round(nue / acc * 100), Math.round(acc / nue)], c, u: " por ciento" };
  } },
  { min: 3, f: () => {
    const ebit = [50, 70, 90][Math.floor(Math.random() * 3)];
    const tax = [25, 30, 34][Math.floor(Math.random() * 3)];
    const dep = [10, 15, 20][Math.floor(Math.random() * 3)];
    const capex = [15, 25, 30][Math.floor(Math.random() * 3)];
    const c = Math.round(ebit * (1 - tax / 100) + dep - capex);
    return { q: `EBIT de ${ebit}, impuesto ${tax} por ciento, depreciación ${dep} y capex ${capex}, sin cambio en capital de trabajo. El flujo libre a la firma es`, ops: [c, Math.round(ebit + dep - capex), Math.round(ebit * (1 - tax / 100) - dep + capex)], c, u: "" };
  } },
  { min: 4, f: () => {
    const we = [40, 50, 60][Math.floor(Math.random() * 3)];
    const ke = [14, 16, 18][Math.floor(Math.random() * 3)];
    const kd = [8, 9, 10][Math.floor(Math.random() * 3)];
    const tax = 30;
    const c = +((we / 100) * ke + (1 - we / 100) * kd * (1 - tax / 100)).toFixed(1);
    return { q: `Capital propio ${we} por ciento al ${ke}, deuda al ${kd} con impuesto de 30. El WACC es`, ops: [c, +((we / 100) * ke + (1 - we / 100) * kd).toFixed(1), +(((ke + kd) / 2)).toFixed(1)], c, u: " por ciento" };
  } },
  { min: 4, f: () => {
    const eq = [30, 40, 50][Math.floor(Math.random() * 3)];
    const m = [2, 2.5, 3][Math.floor(Math.random() * 3)];
    const anos = [4, 5][Math.floor(Math.random() * 2)];
    const c = Math.round((Math.pow(m, 1 / anos) - 1) * 100);
    return { q: `Pusiste ${eq} de capital y sales en ${Math.round(eq * m)} a los ${anos} años. Tu TIR anual es cerca de`, ops: [c, Math.round((m - 1) * 100), Math.round((m - 1) * 100 / anos)], c, u: " por ciento" };
  } },
  { min: 4, f: () => {
    const cf = [1000, 1500, 2000][Math.floor(Math.random() * 3)];
    const g = [2, 3][Math.floor(Math.random() * 2)];
    const wacc = [9, 10, 12][Math.floor(Math.random() * 3)];
    const c = Math.round(cf * (1 + g / 100) / ((wacc - g) / 100));
    return { q: `Flujo de ${cf} que crece al ${g} por ciento a perpetuidad y se descuenta al ${wacc}. El valor terminal es`, ops: [c, Math.round(cf / (wacc / 100)), Math.round(cf * (1 + g / 100) / (wacc / 100))], c, u: "" };
  } },
  { min: 5, f: () => {
    const local = [24, 30, 36][Math.floor(Math.random() * 3)];
    const usd = [4, 5, 6][Math.floor(Math.random() * 3)];
    const c = local - usd;
    return { q: `Tasa local ${local} por ciento y tasa en dólares ${usd}. Cubrir el riesgo cambiario a un año te cuesta cerca de`, ops: [c, local + usd, Math.round(local / usd)], c, u: " por ciento" };
  } },
  { min: 5, f: () => {
    const pat = [1, 2, 3][Math.floor(Math.random() * 3)];
    const caida = [30, 40, 50][Math.floor(Math.random() * 3)];
    const c = Math.round((1 / (1 - caida / 100) - 1) * 100);
    return { q: `Tu cartera cae ${caida} por ciento. Para volver al punto de partida necesitas subir`, ops: [c, caida, caida + 10], c, u: " por ciento" };
  } },
];

const genCalculo = (nv) => {
  const n = nv || 1;
  let pool = CUENTAS.filter((x) => x.min <= n);
  const duras = pool.filter((x) => x.min >= n - 1);
  if (duras.length && Math.random() < 0.7) pool = duras;
  return elegirAzar(pool).f();
};

function JuegoCalculo({ ayuda, nivel, onFin }) {
  const nv = nivel || 1;
  const segs = clamp(9 + ayuda / 12 - (nv - 1) * 0.7, 6.5, 17);
  const [ronda, setRonda] = useState(0);
  const [p, setP] = useState(() => genCalculo(nv));
  const [sel, setSel] = useState(null);
  const [ok, setOk] = useState(0);
  const [t, setT] = useState(segs);
  const mezcla = useMemo(() => p.ops.slice().sort(() => Math.random() - 0.5), [p]);

  const resolver = (v) => {
    if (sel !== null) return;
    setSel(v === null ? -1 : v);
    const n = ok + (v === p.c ? 1 : 0);
    setOk(n);
  };

  const seguir = () => {
    if (ronda >= 2) onFin(ok >= 3 ? "exito" : ok === 2 ? "parcial" : "fallo");
    else { setRonda(ronda + 1); setP(genCalculo(nv)); setSel(null); setT(segs); }
  };

  useEffect(() => {
    if (sel !== null) return;
    const id = setInterval(() => setT((x) => Math.max(0, +(x - 0.1).toFixed(1))), 100);
    return () => clearInterval(id);
  }, [sel, ronda]);

  useEffect(() => { if (t === 0 && sel === null) resolver(null); }, [t]);

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Cuenta {ronda + 1} de 3</span><span>{t.toFixed(1)} s · aciertos {ok}</span></div>
      <p className="ea-qtxt">{p.q}</p>
      <div className="ea-ops" style={{ marginTop: 0 }}>
        {mezcla.map((v, k) => {
          let cls = "ea-op";
          if (sel !== null && v === p.c) cls += " ok";
          else if (sel === v) cls += " no";
          return (
            <button className={cls} key={k} disabled={sel !== null} onClick={() => resolver(v)}>
              <span className="ea-opN ea-mono">{String.fromCharCode(65 + k)}</span>
              <span className="ea-mono">{v}{p.u}</span>
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div>
          <div className="ea-expl">{sel === p.c ? "Correcto. " : "La respuesta era " + p.c + p.u + ". "}Sin calculadora y contra reloj, este tipo de cuenta se hace todos los días en una mesa.</div>
          <button className="ea-btn" onClick={seguir}>{ronda >= 2 ? "Terminar" : "Continuar"}</button>
        </div>
      )}
    </div>
  );
}

function JuegoOrden({ ayuda, onFin }) {
  const [set] = useState(() => elegirAzar(ORDENES));
  const [lista] = useState(() => set.l.slice().sort(() => Math.random() - 0.5));
  const [paso, setPaso] = useState(() => (ayuda >= 60 ? 1 : 0));
  const [err, setErr] = useState(null);
  const [fin, setFin] = useState(false);

  const tocar = (item) => {
    if (fin) return;
    if (item === set.l[paso]) {
      const p = paso + 1;
      setPaso(p);
      if (p >= set.l.length - 1) {
        setFin(true);
        setTimeout(() => onFin("exito"), 700);
      }
    } else {
      setErr(item); setFin(true);
      setTimeout(() => onFin(paso >= 2 ? "parcial" : "fallo"), 800);
    }
  };

  const puesto = (item) => set.l.indexOf(item) < paso;

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>{paso} de {set.l.length}</span><span>{ayuda >= 60 ? "Tu criterio te dio el primero" : "Sin pistas"}</span></div>
      <p className="ea-qtxt">{set.t}</p>
      <div className="ea-ordenL">
        {lista.map((item, k) => (
          <button key={k} disabled={puesto(item) || fin}
            className={"ea-ordenI" + (puesto(item) ? " hecho" : "") + (err === item ? " err" : "")}
            onClick={() => tocar(item)}>
            <span>{item}</span>
            <span className="ea-ordenN ea-mono">{puesto(item) ? set.l.indexOf(item) + 1 : ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function JuegoSemaforo({ ayuda, nivel, onFin }) {
  const segs = clamp(2.4 + ayuda / 90 - ((nivel || 1) - 1) * 0.18, 1.5, 3.5);
  const [serie] = useState(() => SENALES.slice().sort(() => Math.random() - 0.5).slice(0, 6));
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(0);
  const [marca, setMarca] = useState(null);
  const [t, setT] = useState(segs);

  const responder = (a) => {
    if (marca !== null) return;
    const acierto = a === serie[i].a;
    setMarca(acierto ? "bien" : "mal");
    const n = ok + (acierto ? 1 : 0);
    setOk(n);
  };

  const seguir = () => {
    if (i >= 5) onFin(ok >= 5 ? "exito" : ok >= 4 ? "parcial" : "fallo");
    else { setI(i + 1); setMarca(null); setT(segs); }
  };

  useEffect(() => {
    if (marca !== null) return;
    const id = setInterval(() => setT((x) => Math.max(0, +(x - 0.1).toFixed(1))), 100);
    return () => clearInterval(id);
  }, [marca, i]);

  useEffect(() => { if (t === 0 && marca === null) responder("nada"); }, [t]);

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Señal {i + 1} de 6</span><span>{t.toFixed(1)} s · aciertos {ok}</span></div>
      <div className={"ea-luz" + (marca === "bien" ? " lista" : marca === "mal" ? " roja" : "")}>{serie[i].t}</div>
      <div className="ea-fila2">
        <button className="ea-btn" style={{ marginTop: 0, flex: 1 }} onClick={() => responder("comprar")} disabled={marca !== null}>Comprar</button>
        <button className="ea-btn" style={{ marginTop: 0, flex: 1, background: "var(--rojo)" }} onClick={() => responder("vender")} disabled={marca !== null}>Vender</button>
      </div>
      {marca !== null && (
        <div>
          <div className="ea-expl">{marca === "bien" ? "Bien leído. " : "Era para " + serie[i].a + ". "}En la mesa se decide con esta información y en este tiempo.</div>
          <button className="ea-btn" onClick={seguir}>{i >= 5 ? "Terminar" : "Continuar"}</button>
        </div>
      )}
    </div>
  );
}

function MiniJuego({ tipo, ayuda, nivel, onFin }) {
  if (tipo === "precision") return <JuegoPrecision ayuda={ayuda} onFin={onFin} />;
  if (tipo === "memoria") return <JuegoMemoria ayuda={ayuda} onFin={onFin} />;
  if (tipo === "ojo") return <JuegoOjo ayuda={ayuda} onFin={onFin} />;
  if (tipo === "anclaje") return <JuegoAnclaje ayuda={ayuda} onFin={onFin} />;
  if (tipo === "tresraya") return <JuegoTresRaya ayuda={ayuda} onFin={onFin} />;
  if (tipo === "quiz") return <JuegoQuiz ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  if (tipo === "reaccion") return <JuegoReaccion ayuda={ayuda} onFin={onFin} />;
  if (tipo === "calculo") return <JuegoCalculo ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  if (tipo === "orden") return <JuegoOrden ayuda={ayuda} onFin={onFin} />;
  if (tipo === "semaforo") return <JuegoSemaforo ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  if (tipo === "trading") return <JuegoTrading ayuda={ayuda} onFin={onFin} />;
  if (tipo === "estructura") return <JuegoEstructura ayuda={ayuda} onFin={onFin} />;
  if (tipo === "banderas") return <JuegoBanderas ayuda={ayuda} onFin={onFin} />;
  if (tipo === "pares") return <JuegoPares ayuda={ayuda} onFin={onFin} />;
  if (tipo === "carril") return <JuegoCarril ayuda={ayuda} onFin={onFin} />;
  if (tipo === "cuatro") return <JuegoCuatro ayuda={ayuda} onFin={onFin} />;
  if (tipo === "subasta") return <JuegoSubasta ayuda={ayuda} onFin={onFin} />;
  return <JuegoSuerte ayuda={ayuda} onFin={onFin} />;
}

/* ---- explicación antes de jugar ----
   Nadie aprende de un juego que no entendió. Primero las reglas,
   qué cuenta como éxito y para qué sirve en la vida real. */
function TarjetaJuego({ tipo, ayuda, nivel, statN, onFin }) {
  const [listo, setListo] = useState(false);
  const j = JUEGOS[tipo];
  if (!j) return <MiniJuego tipo={tipo} ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  if (listo) return <MiniJuego tipo={tipo} ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  const nivelJuego = tipo === "quiz" || tipo === "calculo" || tipo === "semaforo";
  return (
    <div className="ea-jw">
      <div className="ea-jmeta">
        <span className="ea-jtag">{j.tema}</span>
        <span className="ea-jtag">{j.dur}</span>
        {nivelJuego && <span className="ea-jtag">Nivel {nivel} · {NIVEL_N[nivel]}</span>}
      </div>
      <p className="ea-memoTxt" style={{ marginTop: 8 }}>{j.i}</p>
      <div className="ea-lecK">Cómo se juega</div>
      <ul className="ea-pasos">
        {j.pasos.map((t, i) => (
          <li className="ea-paso" key={i}><span className="ea-pasoN">{i + 1}</span><span>{t}</span></li>
        ))}
      </ul>
      <div className="ea-tabla" style={{ marginTop: 12 }}>
        <span className="ea-td">Cuenta como éxito</span><span className="ea-tdn">{j.gana}</span>
        <span className="ea-td">Te ayuda</span><span className="ea-tdn">{statN} {Math.round(ayuda)} de 100</span>
      </div>
      <div className="ea-lec">
        <div className="ea-lecK">Para qué sirve esto</div>
        <div className="ea-lecX">{j.ensena}</div>
      </div>
      <button className="ea-btn" onClick={() => setListo(true)}>Entendido, empezar</button>
    </div>
  );
}

/* ---- juegos interactivos nuevos ---- */

function JuegoTrading({ ayuda, onFin }) {
  const TICKS = 26;
  const [serie] = useState(() => {
    const arr = [100];
    let tendencia = (Math.random() - 0.45) * 0.006;
    for (let i = 1; i < TICKS; i++) {
      if (i % 7 === 0) tendencia = (Math.random() - 0.5) * 0.014;
      const vol = 0.022 - clamp(ayuda / 100, 0, 1) * 0.006;
      arr.push(Math.max(20, arr[i - 1] * (1 + tendencia + vol * gauss())));
    }
    return arr;
  });
  const [i, setI] = useState(0);
  const [dentro, setDentro] = useState(false);
  const [equity, setEquity] = useState(100);
  const [hist, setHist] = useState([100]);
  const [fin, setFin] = useState(false);
  const dentroRef = useRef(false);

  useEffect(() => { dentroRef.current = dentro; }, [dentro]);

  useEffect(() => {
    if (fin) return;
    const id = setTimeout(() => {
      if (i >= TICKS - 1) { setFin(true); return; }
      const r = serie[i + 1] / serie[i] - 1;
      const nuevo = dentroRef.current ? equity * (1 + r) : equity;
      setEquity(nuevo);
      setHist((h) => h.concat(nuevo));
      setI(i + 1);
    }, 620);
    return () => clearTimeout(id);
  }, [i, fin, serie, equity]);

  const bench = serie[Math.min(i, TICKS - 1)] / serie[0] * 100;
  const mio = (equity / 100 - 1) * 100;
  const suyo = (bench / 100 - 1) * 100;

  const cerrar = () => {
    const dif = mio - suyo;
    onFin(dif >= 4 ? "exito" : dif >= -0.5 ? "parcial" : "fallo");
  };

  const path = (datos, alto, max, min) => datos.map((v, k) => {
    const x = (k / (TICKS - 1)) * 100;
    const y = alto - ((v - min) / (max - min || 1)) * alto;
    return (k === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2);
  }).join(" ");

  const vistos = serie.slice(0, i + 1);
  const todos = vistos.concat(hist);
  const max = Math.max.apply(null, todos), min = Math.min.apply(null, todos);

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Tick {i + 1} de {TICKS}</span>
        <span className={"ea-marca " + (dentro ? "dentro" : "fuera")}>{dentro ? "Dentro" : "Fuera"}</span>
      </div>
      <svg className="ea-graf" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path className="ea-grafL" d={path(vistos, 60, max, min)} vectorEffect="non-scaling-stroke" />
        <path className="ea-grafD" d={path(hist, 60, max, min)} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="ea-jinfo ea-dis" style={{ marginTop: 9 }}>
        <span>Tu cuenta {mio >= 0 ? "+" : ""}{mio.toFixed(1)} por ciento</span>
        <span>Comprar y esperar {suyo >= 0 ? "+" : ""}{suyo.toFixed(1)} por ciento</span>
      </div>
      {!fin ? (
        <div className="ea-fila2">
          <button className="ea-btn" style={{ marginTop: 0, flex: 1 }} onClick={() => setDentro(true)} disabled={dentro}>Comprar</button>
          <button className="ea-btn" style={{ marginTop: 0, flex: 1, background: "var(--rojo)" }} onClick={() => setDentro(false)} disabled={!dentro}>Vender</button>
        </div>
      ) : (
        <div>
          <div className={"ea-alerta " + (mio - suyo >= 4 ? "bien" : mio - suyo >= -0.5 ? "" : "mal")}>
            Cerró la sesión. Le sacaste {(mio - suyo).toFixed(1)} puntos a quien compró al principio y no tocó nada.
            Ganarle a esa estrategia es más difícil de lo que parece.
          </div>
          <button className="ea-btn" onClick={cerrar}>Continuar</button>
        </div>
      )}
    </div>
  );
}

function JuegoEstructura({ ayuda, onFin }) {
  const [caso] = useState(() => {
    const eb = 14 + Math.floor(Math.random() * 12);
    return { eb, precio: eb * 8, crec: 1.18 + Math.random() * 0.18 };
  });
  const maxSen = +(caso.eb * 3.5).toFixed(0);
  const maxMez = +(caso.eb * 1.5).toFixed(0);
  const [sen, setSen] = useState(Math.round(caso.eb * 2));
  const [mez, setMez] = useState(0);
  const [cerrado, setCerrado] = useState(null);

  const equity = Math.max(0, caso.precio - sen - mez);
  const apal = (sen + mez) / caso.eb;
  const ebSalida = caso.eb * caso.crec;
  const deudaSalida = Math.max(0, (sen + mez) - sen * 0.4);
  const valorSalida = ebSalida * 8;
  const equitySalida = Math.max(0, valorSalida - deudaSalida);
  const moic = equity > 0 ? equitySalida / equity : 0;
  const minEquity = caso.precio * 0.1;

  const confirmar = () => {
    if (equity < minEquity) return;
    let nivel;
    if (apal > 4.5) nivel = Math.random() < 0.65 ? "fallo" : "parcial";
    else if (moic >= 2.5) nivel = "exito";
    else if (moic >= 1.8) nivel = "parcial";
    else nivel = "fallo";
    setCerrado(nivel);
  };

  const texto = {
    exito: "Estructura fina. Suficiente deuda para que el capital rinda y suficiente colchón para aguantar un mal año.",
    parcial: "Sale, sin brillar. O te faltó apalancamiento o te sobró prudencia.",
    fallo: apal > 4.5 ? "Te pasaste de apalancamiento. El primer trimestre flojo rompe el covenant y el banco toma el control."
      : "Muy poco apalancamiento y un múltiplo de salida que no compensa. El capital rinde menos que un bono.",
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>EBITDA {caso.eb} millones · precio {caso.precio}</span>
        <span>Apalancamiento {apal.toFixed(1)}x</span>
      </div>
      <div className="ea-est">
        <div className="ea-estL"><span>Deuda senior, cuesta 9 por ciento</span><span className="ea-mono">{sen}</span></div>
        <input className="ea-slider" type="range" min="0" max={maxSen} step="1" value={sen} disabled={!!cerrado}
          onChange={(e) => setSen(parseInt(e.target.value, 10))} aria-label="Deuda senior" />
      </div>
      <div className="ea-est">
        <div className="ea-estL"><span>Mezzanine, cuesta 15 por ciento</span><span className="ea-mono">{mez}</span></div>
        <input className="ea-slider" type="range" min="0" max={maxMez} step="1" value={mez} disabled={!!cerrado}
          onChange={(e) => setMez(parseInt(e.target.value, 10))} aria-label="Mezzanine" />
      </div>
      <div className="ea-fila" style={{ borderColor: "rgba(26,37,40,.25)" }}>
        <span style={{ fontSize: 13 }}>Capital propio necesario</span>
        <span className="ea-mono">{equity.toFixed(0)} millones</span>
      </div>
      <div className="ea-fila" style={{ borderColor: "rgba(26,37,40,.25)" }}>
        <span style={{ fontSize: 13 }}>Múltiplo estimado a cinco años</span>
        <span className="ea-mono">{moic.toFixed(2)}x</span>
      </div>
      {equity < minEquity && <div className="ea-alerta mal">Ningún banco financia esto sin al menos diez por ciento de capital propio.</div>}
      {apal > 4.5 && equity >= minEquity && <div className="ea-alerta mal">Por encima de cuatro y media veces EBITDA el covenant queda al filo.</div>}
      {!cerrado ? (
        <button className="ea-btn" onClick={confirmar} disabled={equity < minEquity}>Cerrar la estructura</button>
      ) : (
        <div>
          <div className={"ea-alerta " + (cerrado === "exito" ? "bien" : cerrado === "fallo" ? "mal" : "")}>{texto[cerrado]}</div>
          <button className="ea-btn" onClick={() => onFin(cerrado)}>Continuar</button>
        </div>
      )}
    </div>
  );
}

function JuegoBanderas({ ayuda, onFin }) {
  const [caso] = useState(() => {
    const b = elegirAzar(BANDERAS);
    const quitar = ayuda >= 65 ? 2 : ayuda >= 45 ? 1 : 0;
    const buenos = b.ok.slice().sort(() => Math.random() - 0.5).slice(0, 5 - quitar);
    return { t: b.t, mal: b.mal, lista: b.mal.concat(buenos).sort(() => Math.random() - 0.5) };
  });
  const [sel, setSel] = useState([]);
  const [rev, setRev] = useState(false);

  const marcar = (x) => {
    if (rev) return;
    setSel(sel.indexOf(x) >= 0 ? sel.filter((y) => y !== x) : sel.length < 3 ? sel.concat(x) : sel);
  };
  const aciertos = sel.filter((x) => caso.mal.indexOf(x) >= 0).length;

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Marcadas {sel.length} de 3</span><span>{ayuda >= 45 ? "Tu criterio descartó opciones obvias" : "Sin pistas"}</span></div>
      <p className="ea-qtxt">{caso.t}</p>
      <div className="ea-ops" style={{ marginTop: 0 }}>
        {caso.lista.map((x, k) => {
          let cls = "ea-check";
          if (rev) cls += caso.mal.indexOf(x) >= 0 ? " bien" : sel.indexOf(x) >= 0 ? " mal" : "";
          else if (sel.indexOf(x) >= 0) cls += " sel";
          return (
            <button className={cls} key={k} disabled={rev} onClick={() => marcar(x)}>
              <span className="ea-checkB ea-mono">{sel.indexOf(x) >= 0 ? "X" : "·"}</span>
              <span>{x}</span>
            </button>
          );
        })}
      </div>
      {!rev ? (
        <button className="ea-btn" disabled={sel.length < 3} onClick={() => setRev(true)}>Entregar el informe</button>
      ) : (
        <div>
          <div className={"ea-alerta " + (aciertos === 3 ? "bien" : aciertos === 2 ? "" : "mal")}>
            {aciertos} de 3. Lo marcado en verde era lo que había que levantar. Lo demás es ruido operativo que aparece en cualquier compañía.
          </div>
          <button className="ea-btn" onClick={() => onFin(aciertos === 3 ? "exito" : aciertos === 2 ? "parcial" : "fallo")}>Continuar</button>
        </div>
      )}
    </div>
  );
}

/* ---- La pizarra del comité: pares de concepto y significado ---- */
function JuegoPares({ ayuda, onFin }) {
  const [pz] = useState(() => elegirAzar(PIZARRAS));
  const [fichas] = useState(() => {
    const arr = [];
    pz.p.forEach((par, i) => {
      arr.push({ id: i + "a", par: i, t: par[0] });
      arr.push({ id: i + "b", par: i, t: par[1] });
    });
    return arr.sort(() => Math.random() - 0.5);
  });
  const maxErr = clamp(4 + Math.floor(ayuda / 22), 4, 8);
  const [abiertas, setAbiertas] = useState([]);
  const [hechas, setHechas] = useState([]);
  const [err, setErr] = useState(0);
  const [fin, setFin] = useState(false);
  const bloqueo = useRef(false);

  const cerrar = (nivel) => { setFin(true); setTimeout(() => onFin(nivel), 900); };

  const tocar = (f) => {
    if (fin || bloqueo.current) return;
    if (hechas.indexOf(f.par) >= 0) return;
    if (abiertas.some((x) => x.id === f.id)) return;
    const nuevas = abiertas.concat(f);
    setAbiertas(nuevas);
    if (nuevas.length < 2) return;
    bloqueo.current = true;
    if (nuevas[0].par === nuevas[1].par) {
      setTimeout(() => {
        const h = hechas.concat(nuevas[0].par);
        setHechas(h); setAbiertas([]); bloqueo.current = false;
        if (h.length === pz.p.length) cerrar(err === 0 ? "exito" : err <= 2 ? "exito" : "parcial");
      }, 420);
    } else {
      setTimeout(() => {
        const e = err + 1;
        setErr(e); setAbiertas([]); bloqueo.current = false;
        if (e >= maxErr) cerrar(hechas.length >= pz.p.length - 2 ? "parcial" : "fallo");
      }, 750);
    }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>{pz.t}</span><span>Fallos {err} de {maxErr}</span></div>
      <div className="ea-tab4">
        {fichas.map((f) => {
          const hecha = hechas.indexOf(f.par) >= 0;
          const abierta = abiertas.some((x) => x.id === f.id);
          return (
            <div key={f.id} onClick={() => tocar(f)}
              className={"ea-fichaP" + (hecha ? " hecha" : abierta ? " abierta" : " tapada")}>
              {hecha || abierta ? f.t : ""}
            </div>
          );
        })}
      </div>
      <div style={{ minHeight: 20, marginTop: 9, fontSize: 13, color: "#3A4649" }}>
        {fin ? (hechas.length === pz.p.length ? "Pizarra completa" : "Se acabaron los intentos") : ""}
      </div>
    </div>
  );
}

/* ---- El carril del capital ---- */
function JuegoCarril({ ayuda, onFin }) {
  const TOTAL = 26;
  const [carril, setCarril] = useState(1);
  const [objs, setObjs] = useState([]);
  const [t, setT] = useState(0);
  const [pts, setPts] = useState(0);
  const [golpes, setGolpes] = useState(0);
  const [fin, setFin] = useState(false);
  const carrilRef = useRef(1);
  useEffect(() => { carrilRef.current = carril; }, [carril]);

  const vel = 22;
  const probMalo = clamp(0.5 - ayuda / 320, 0.28, 0.5);

  useEffect(() => {
    if (fin) return;
    const id = setTimeout(() => {
      setObjs((prev) => {
        let lista = prev.map((o) => ({ ...o, y: o.y + vel }));
        if (t < TOTAL && t % 2 === 0) {
          const c = Math.floor(Math.random() * 3);
          lista = lista.concat({ k: t, c, y: -30, malo: Math.random() < probMalo, tocado: false });
        }
        lista.forEach((o) => {
          if (!o.tocado && o.y >= 170 && o.y <= 205 && o.c === carrilRef.current) {
            o.tocado = true;
            if (o.malo) setGolpes((g) => g + 1);
            else setPts((p) => p + 1);
          }
        });
        return lista.filter((o) => o.y < 240);
      });
      if (t >= TOTAL + 8) { setFin(true); return; }
      setT(t + 1);
    }, 190);
    return () => clearTimeout(id);
  }, [t, fin, probMalo]);

  const cerrar = () => {
    const neto = pts - golpes * 2;
    onFin(neto >= 6 ? "exito" : neto >= 2 ? "parcial" : "fallo");
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Retornos {pts}</span><span>Golpes {golpes}</span></div>
      <div className="ea-pistaC">
        <div className="ea-lineaC" style={{ left: "33.3%" }} />
        <div className="ea-lineaC" style={{ left: "66.6%" }} />
        {objs.map((o) => (
          <div key={o.k} className={"ea-obj " + (o.malo ? "malo" : "bueno")}
            style={{ left: o.c * 33.3 + 3.6 + "%", top: o.y + "px", opacity: o.tocado ? 0.25 : 1 }}>
            {o.malo ? CARRILES[o.c].malo : CARRILES[o.c].bueno}
          </div>
        ))}
        <div className="ea-cap" style={{ left: carril * 33.3 + 3.6 + "%" }}>Tu capital</div>
      </div>
      <div className="ea-carrilN">
        {CARRILES.map((c, i) => (
          <button key={i} className={"ea-carrilB" + (carril === i ? " on" : "")} disabled={fin} onClick={() => setCarril(i)}>{c.n}</button>
        ))}
      </div>
      {fin && (
        <div>
          <div className={"ea-alerta " + (pts - golpes * 2 >= 6 ? "bien" : pts - golpes * 2 >= 2 ? "" : "mal")}>
            Cerraste con {pts} retornos y {golpes} golpes. Rotar entre activos captura oportunidades y también te expone
            justo cuando el carril equivocado se pone feo.
          </div>
          <button className="ea-btn" onClick={cerrar}>Continuar</button>
        </div>
      )}
    </div>
  );
}

/* ---- Cuatro en línea contra la contraparte ---- */
const COLS = 7, FILAS = 6;
function JuegoCuatro({ ayuda, onFin }) {
  const [tab, setTab] = useState(() => Array(COLS * FILAS).fill(null));
  const [bloqueo, setBloqueo] = useState(false);
  const [estado, setEstado] = useState(null);
  const [linea, setLinea] = useState([]);
  const torpeza = clamp(ayuda / 170, 0.05, 0.5);

  const idx = (c, f) => f * COLS + c;
  const alturaCol = (bd, c) => { let f = 0; while (f < FILAS && bd[idx(c, f)]) f++; return f; };
  const libres = (bd) => { const l = []; for (let c = 0; c < COLS; c++) if (alturaCol(bd, c) < FILAS) l.push(c); return l; };

  const ganadorEn = (bd, p) => {
    const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (let c = 0; c < COLS; c++) for (let f = 0; f < FILAS; f++) {
      for (const d of dirs) {
        const cel = [];
        for (let k = 0; k < 4; k++) {
          const cc = c + d[0] * k, ff = f + d[1] * k;
          if (cc < 0 || cc >= COLS || ff < 0 || ff >= FILAS) { cel.length = 0; break; }
          if (bd[idx(cc, ff)] !== p) { cel.length = 0; break; }
          cel.push(idx(cc, ff));
        }
        if (cel.length === 4) return cel;
      }
    }
    return null;
  };

  const soltar = (bd, c, p) => {
    const f = alturaCol(bd, c);
    if (f >= FILAS) return null;
    const n = bd.slice(); n[idx(c, f)] = p; return n;
  };

  const jugadaIA = (bd) => {
    const l = libres(bd);
    for (const c of l) { const n = soltar(bd, c, "O"); if (n && ganadorEn(n, "O")) return c; }
    for (const c of l) { const n = soltar(bd, c, "X"); if (n && ganadorEn(n, "X")) return c; }
    if (Math.random() < torpeza) return elegirAzar(l);
    const seguras = l.filter((c) => {
      const n = soltar(bd, c, "O");
      const m = soltar(n, c, "X");
      return !(m && ganadorEn(m, "X"));
    });
    const cand = seguras.length ? seguras : l;
    return cand.reduce((mej, c) => (Math.abs(c - 3) < Math.abs(mej - 3) ? c : mej), cand[0]);
  };

  const terminar = (n, l) => { setEstado(n); setLinea(l || []); setBloqueo(true); setTimeout(() => onFin(n), 1150); };

  const jugar = (c) => {
    if (bloqueo || estado) return;
    const n = soltar(tab, c, "X");
    if (!n) return;
    setTab(n);
    const g = ganadorEn(n, "X");
    if (g) { terminar("exito", g); return; }
    if (libres(n).length === 0) { terminar("parcial"); return; }
    setBloqueo(true);
    setTimeout(() => {
      const c2 = jugadaIA(n);
      const n2 = soltar(n, c2, "O");
      setTab(n2);
      const g2 = ganadorEn(n2, "O");
      if (g2) { terminar("fallo", g2); return; }
      if (libres(n2).length === 0) { terminar("parcial"); return; }
      setBloqueo(false);
    }, 430);
  };

  const txt = { exito: "Cierras en tus términos", parcial: "Tablero lleno, partieron la diferencia", fallo: "Te ganaron la posición" };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Tus fichas en cobre</span><span>Lectura de la contraparte {Math.round(100 - torpeza * 100)}</span></div>
      <div className="ea-pista4">
        {Array.from({ length: COLS }, (_, c) => (
          <div className="ea-col4" key={c} onClick={() => jugar(c)}>
            {Array.from({ length: FILAS }, (_, f) => {
              const v = tab[idx(c, f)];
              return <div key={f} className={"ea-hueco" + (v === "X" ? " mia" : v === "O" ? " suya" : "") + (linea.indexOf(idx(c, f)) >= 0 ? " gana" : "")} />;
            })}
          </div>
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 11, fontSize: 14, color: "#3A4649" }}>{estado ? txt[estado] : "Toca una columna para soltar tu ficha."}</div>
    </div>
  );
}

/* ---- La subasta y la maldición del ganador ---- */
function JuegoSubasta({ ayuda, onFin }) {
  const [valor] = useState(() => 60 + Math.random() * 80);
  const [señal] = useState(() => Math.round(valor + (28 - ayuda / 5) * gauss()));
  const [precio, setPrecio] = useState(40);
  const [vivos, setVivos] = useState([true, true, true]);
  const [ronda, setRonda] = useState(0);
  const [fin, setFin] = useState(null);

  const rivales = ["Fondo regional", "Comprador estratégico", "Family office"];

  const subir = () => {
    const nuevo = precio + 8 + Math.floor(Math.random() * 6);
    const siguen = vivos.map((v) => v && Math.random() > clamp((nuevo - valor * 0.8) / 55, 0.08, 0.75));
    setPrecio(nuevo); setVivos(siguen); setRonda(ronda + 1);
    if (siguen.every((v) => !v)) {
      const ratio = nuevo / valor;
      setFin({ gano: true, precio: nuevo, ratio });
    } else if (ronda >= 7) {
      setFin({ gano: false, precio: nuevo, ratio: nuevo / valor, forzado: true });
    }
  };

  const retirarse = () => setFin({ gano: false, precio, ratio: precio / valor });

  const cerrar = () => {
    if (fin.gano) onFin(fin.ratio <= 0.82 ? "exito" : fin.ratio <= 1 ? "parcial" : "fallo");
    else onFin(fin.ratio >= 1 ? "parcial" : fin.ratio >= 0.85 ? "parcial" : "fallo");
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis"><span>Tu estimación de valor {señal}</span><span>Ronda {ronda + 1}</span></div>
      <div className="ea-precio ea-mono">{precio}</div>
      <div style={{ fontSize: 12.5, color: "var(--gris)", marginBottom: 10 }}>Oferta actual sobre la mesa, en millones.</div>
      {rivales.map((r, i) => (
        <div className={"ea-postor" + (vivos[i] ? "" : " fuera")} key={i}>
          <span>{r}</span><span className="ea-mono">{vivos[i] ? "sigue" : "se retiró"}</span>
        </div>
      ))}
      {!fin ? (
        <div className="ea-fila2">
          <button className="ea-btn" style={{ marginTop: 0, flex: 1 }} onClick={subir}>Subir la oferta</button>
          <button className="ea-btn" style={{ marginTop: 0, flex: 1, background: "var(--rojo)" }} onClick={retirarse}>Retirarme</button>
        </div>
      ) : (
        <div>
          <div className={"ea-alerta " + (fin.gano ? (fin.ratio <= 1 ? "bien" : "mal") : (fin.ratio >= 0.85 ? "" : "mal"))}>
            El activo valía {Math.round(valor)}.
            {fin.gano
              ? fin.ratio <= 0.82 ? " Te lo llevaste con descuento real, que es exactamente el trabajo."
                : fin.ratio <= 1 ? " Ganaste pagando casi lo que vale. Sin margen, pero sin daño."
                : " Ganaste la subasta y perdiste plata. Eso se llama maldición del ganador y es la forma más elegante de arruinarse."
              : fin.ratio >= 1 ? " Te retiraste justo antes de pagar de más. Retirarse a tiempo también es ganar."
                : " Dejaste ir un activo que estaba barato. La disciplina también cuesta cuando se aplica de más."}
          </div>
          <button className="ea-btn" onClick={cerrar}>Continuar</button>
        </div>
      )}
    </div>
  );
}

/* ---- piezas del informe de cierre ---- */
function Chispa({ datos }) {
  if (!datos || datos.length < 2) return null;
  const max = Math.max.apply(null, datos), min = Math.min.apply(null, datos.concat([0]));
  const pt = (v, k) => {
    const x = (k / (datos.length - 1)) * 100;
    const y = 46 - ((v - min) / (max - min || 1)) * 42;
    return x.toFixed(2) + " " + y.toFixed(2);
  };
  const linea = datos.map((v, k) => (k === 0 ? "M" : "L") + pt(v, k)).join(" ");
  const area = linea + " L100 46 L0 46 Z";
  return (
    <svg className="ea-spark" viewBox="0 0 100 48" preserveAspectRatio="none">
      <path className="ea-sparkA" d={area} />
      <path className="ea-sparkL" d={linea} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Flujo({ titulo, lista, tope, neg }) {
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

/* ============================================================
   PANEL DE CARTERA
   Una barra decide cuánto de tu dinero está invertido y cuánto en
   efectivo. Abajo, cada clase de activo se mueve por separado; los
   perfiles quedan como punto de partida de un toque. Nada se aplica
   hasta que confirmas, y se te dice lo que cuesta el cambio.
   ============================================================ */
function PanelCartera({ st, onAplicar }) {
  const actual = st.pesos || PERFILES[0].w;
  const objAct = st.objetivo == null ? 0.7 : st.objetivo;
  const [w, setW] = useState(() => ({ ...actual }));
  const [obj, setObj] = useState(objAct);

  const liq = st.cash + st.cartera;
  const ef = Math.max(0, 1 - invertidoDe(w));
  const mezcla = { ...w, efectivo: ef };
  const est = statsPesos(mezcla);
  const conAct = { ...actual, efectivo: Math.max(0, 1 - invertidoDe(actual)) };
  const rot = rotacion(conAct, mezcla);
  const movObj = Math.abs(liq * obj - st.cartera);
  const costo = st.cartera * rot * COSTO_CAMBIO + movObj * COSTO_CAMBIO * 0.5;
  const cambio = rot > 0.005 || Math.abs(obj - objAct) > 0.005;
  const conc = concentracion(w);
  const beta = ACTIVOS.reduce((a, x) => a + (w[x.k] || 0) * x.b, 0);
  let sdSuma = 0;
  ACTIVOS.forEach((a) => { sdSuma += (w[a.k] || 0) * a.sd; });
  const ahorra = sdSuma > 0 ? 1 - est.sd / sdSuma : 0;
  const sharpe = est.sd > 0 ? (est.mu - EFECTIVO_MU) / est.sd : 0;
  const preset = PERFILES.find((x) => rotacion(x.w, mezcla) < 0.02);

  return (
    <div>
      <div className="ea-rot ea-dis">Cuánto de tu dinero trabaja</div>
      <div className="ea-mix">
        <div className="ea-mixSeg cart" style={{ width: (obj * 100).toFixed(1) + "%" }}>
          {obj >= 0.16 ? "cartera " + Math.round(obj * 100) + "%" : ""}
        </div>
        <div className="ea-mixSeg efe" style={{ width: ((1 - obj) * 100).toFixed(1) + "%" }}>
          {1 - obj >= 0.16 ? "efectivo " + Math.round((1 - obj) * 100) + "%" : ""}
        </div>
      </div>
      <input className="ea-slider" type="range" min="0" max="100" step="5"
        value={Math.round(obj * 100)} aria-label="Reparto entre cartera y efectivo"
        onChange={(e) => setObj(parseInt(e.target.value, 10) / 100)} />
      <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Iría a la cartera</span><span className="ea-mono">USD {fmt(liq * obj)}</span></div>
      <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Quedaría en efectivo</span><span className="ea-mono">USD {fmt(liq * (1 - obj))}</span></div>
      <div className="ea-itemD">
        Este reparto también manda al cerrar el año: lo que te quede después de gastos se acomoda solo a este
        porcentaje. Tener algo en efectivo no es cobardía, es lo que evita vender la cartera en el peor momento.
      </div>

      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Puntos de partida</div>
      <div className="ea-preset">
        {PERFILES.map((pf) => (
          <button key={pf.id} className={"ea-mini" + (preset && preset.id === pf.id ? " on" : "")}
            style={{ marginTop: 0 }} onClick={() => setW({ ...pf.w })}>{pf.n}</button>
        ))}
      </div>
      <div className="ea-itemD" style={{ marginTop: -4 }}>
        {preset ? preset.d : "Combinación tuya. Ningún perfil de la lista se parece a esto."}
      </div>

      <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Y cómo se reparte por dentro</div>
      {ACTIVOS.map((a) => {
        const x = Math.round((w[a.k] || 0) * 100);
        return (
          <div className="ea-wrow" key={a.k}>
            <div className="ea-wtop">
              <span className="ea-wname">{a.n}</span>
              <span className="ea-wnum ea-mono">{x}%</span>
            </div>
            <input className="ea-slider" type="range" min="0" max="100" step="5" value={x}
              aria-label={a.n} onChange={(e) => setW(ajustarPesos(w, a.k, parseInt(e.target.value, 10) / 100))} />
            <div className="ea-wsub">
              esperado {(a.mu * 100).toFixed(1)} · volatilidad {(a.sd * 100).toFixed(0)} · {a.d}
            </div>
          </div>
        );
      })}
      <div className="ea-fila" style={{ marginTop: 6 }}>
        <span className="ea-dis" style={{ fontSize: 12 }}>Efectivo dentro de la cartera</span>
        <span className="ea-mono">{Math.round(ef * 100)}%</span>
      </div>

      <div className="ea-caja">
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Retorno esperado</span><span className="ea-mono">{(est.mu * 100).toFixed(1)} por ciento</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Volatilidad</span><span className="ea-mono">{(est.sd * 100).toFixed(1)} puntos</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Año normal, entre</span><span className="ea-mono">{((est.mu - est.sd) * 100).toFixed(0)} y {((est.mu + est.sd) * 100).toFixed(0)}</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Un año malo de verdad</span><span className="ea-mono">{((est.mu - 2 * est.sd) * 100).toFixed(0)} por ciento</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Retorno por unidad de riesgo</span><span className="ea-mono">{sharpe.toFixed(2)}</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Sensibilidad al mercado</span><span className="ea-mono">beta {beta.toFixed(2)}</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ahorro por diversificar</span><span className="ea-mono">{(ahorra * 100).toFixed(0)} por ciento</span></div>
      </div>

      {ahorra > 0.14 && (
        <div className="ea-ok2">
          Sumados por separado tus activos darían {(sdSuma * 100).toFixed(0)} puntos de volatilidad y juntos dan
          {" "}{(est.sd * 100).toFixed(0)}. Esa diferencia es lo único gratis que hay en finanzas.
        </div>
      )}
      {conc.max >= 0.5 && (
        <div className="ea-avis">
          {Math.round(conc.max * 100)} por ciento en {conc.activo.n.toLowerCase()}. Si eso cae la mitad, tu cartera
          se lleva {Math.round(conc.max * 50)} por ciento del golpe.
        </div>
      )}
      {(w.cripto || 0) >= 0.25 && (
        <div className="ea-avis">Con esta dosis de cripto un año malo se te puede llevar un tercio de todo. Que sea porque quieres, no por descuido.</div>
      )}
      {beta >= 0.95 && (
        <div className="ea-avis">Beta cerca de uno: tienes varias líneas, pero todas responden al mismo mercado. Eso no es diversificar.</div>
      )}
      {ef >= 0.4 && (
        <div className="ea-avis">Casi la mitad de la cartera en efectivo, rindiendo {(EFECTIVO_MU * 100).toFixed(1)} por ciento. Si es un colchón, ya lo tienes arriba en la barra.</div>
      )}

      {cambio ? (
        <div>
          <div className="ea-itemD" style={{ marginTop: 12 }}>
            Rotarías {Math.round(rot * 100)} por ciento de la cartera{movObj > 1 ? " y moverías USD " + fmt(movObj) + " entre efectivo e inversión" : ""}.
            Comisión estimada USD {fmt(costo)}.
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 8 }}>
            <button className="ea-mini" onClick={() => onAplicar(w, obj)}>Aplicar</button>
            <button className="ea-mini" onClick={() => { setW({ ...actual }); setObj(objAct); }}>Dejarlo como está</button>
          </div>
        </div>
      ) : (
        <div className="ea-tengo ea-dis" style={{ marginTop: 12 }}>Así está invertido tu dinero ahora</div>
      )}
      <div style={{ fontSize: 11.5, color: "var(--tenue)", marginTop: 12 }}>
        Cada movimiento cuesta medio por ciento de lo que rotas. Rebalancear una vez al año es sano; perseguir al
        activo que rindió el año pasado es la forma más común y más cara de perder dinero.
      </div>
    </div>
  );
}

/* ============================ JUEGO ============================ */

const UMBRAL_FONDO = 5000000;
/* una decisión de un VP mueve mucho más dinero que la de un analista */
const ESCALA = [1, 1.5, 2.2, 3.2, 4.5, 6.5, 9];
/* saca dinero primero del efectivo y después de la cartera */
const cobrar = (st, monto) => {
  let cash = st.cash - monto, cartera = st.cartera;
  if (cash < 0) { cartera += cash; cash = 0; }
  return { cash, cartera };
};
const TAMANOS = [
  { m: 25000000, n: "25 millones", red: 45, rango: 4 },
  { m: 60000000, n: "60 millones", red: 60, rango: 5 },
  { m: 150000000, n: "150 millones", red: 75, rango: 6 },
];

export default function ElAnalista() {
  const [s, setS] = useState(BASE);
  const [fase, setFase] = useState("portada");
  const [tab, setTab] = useState("ficha");
  const [cola, setCola] = useState([]);
  const [ev, setEv] = useState(null);
  const [op, setOp] = useState(null);
  const [res, setRes] = useState(null);
  const [cierre, setCierre] = useState(null);
  const [fin, setFin] = useState(null);
  const [guardado, setGuardado] = useState(null);
  const [aviso, setAviso] = useState("");

  /* al abrir, mira si hay una partida a medio camino */
  useEffect(() => {
    let vivo = true;
    leerPartida().then((d) => {
      if (vivo && d && d.v === VERSION && d.s && d.s.pais && d.s.estudio) setGuardado(d);
    });
    return () => { vivo = false; };
  }, []);

  const persistir = (st) => {
    guardarPartida({ v: VERSION, ts: Date.now(), s: st }).then((ok) => {
      setAviso(ok ? "Partida guardada" : "");
      if (ok) setGuardado({ v: VERSION, ts: Date.now(), s: st });
    });
  };
  const tirarPartida = () => { olvidarPartida(); setGuardado(null); setAviso(""); };

  const tope = TOPES[s.seguir];
  const nacion = NACIONES.find((x) => x.id === s.pais) || NACIONES[0];
  const estudio = CARRERAS.find((x) => x.id === s.estudio) || CARRERAS[0];
  const pesosAct = s.pesos || PERFILES[0].w;
  const mezclaAct = { ...pesosAct, efectivo: Math.max(0, 1 - invertidoDe(pesosAct)) };
  const presetAct = PERFILES.find((x) => rotacion(x.w, mezclaAct) < 0.02);
  const perfilN = presetAct ? presetAct.n : "a tu medida";

  const bienDe = (id) => CAPRICHOS.concat(PROPIEDADES).find((x) => x.id === id);
  const valorBienes = (st) => st.bienes.reduce((a, id) => {
    const c = bienDe(id);
    return a + (c && c.tipo !== "consumo" ? (st.valores[id] || 0) : 0);
  }, 0);
  const vidaTotal = (st) => st.bienes.reduce((a, id) => a + ((bienDe(id) || {}).vida || 0), 0);
  const paisDe = (st) => NACIONES.find((x) => x.id === st.pais) || NACIONES[0];
  const salarioAnual = (st) => RANGOS[st.rango].salario * 12 * paisDe(st).sal;
  const impuestoDe = (st) => paisDe(st).tax;
  const netoAnual = (st) => salarioAnual(st) * (1 - impuestoDe(st));
  const gastoAnual = (st) => {
    const na = paisDe(st);
    let g = netoAnual(st) * (0.55 + st.rango * 0.02) + 3500 * na.gas;
    if (tiene(st, "fiscal")) g *= 0.85;
    st.bienes.forEach((id) => { g += ((bienDe(id) || {}).up || 0) * 2; });
    return g;
  };

  const visible = (o, st) => {
    if (!o.req) return true;
    if (o.req.est && o.req.est !== st.estudio) return false;
    if (o.req.pais && o.req.pais.indexOf(st.pais) < 0) return false;
    if (o.req.noPais && o.req.noPais === st.pais) return false;
    return true;
  };

  const sacar = (fuente, st, usados) => {
    let pool = fuente.filter((e) => st.rango >= e.min && st.rango <= e.max && usados.indexOf(e.id) < 0 && st.vistos.indexOf(e.id) < 0);
    if (pool.length === 0) pool = fuente.filter((e) => st.rango >= e.min && st.rango <= e.max && usados.indexOf(e.id) < 0);
    return pool.length ? elegirAzar(pool) : null;
  };

  const generarAno = (st) => {
    const lista = [];
    const usados = [];
    if (!st.rama && st.rango >= 3) { lista.push(DECISION_RAMA); usados.push(999); }
    if (esClave(st.turno)) {
      const k = sacar(D, st, usados);
      if (k) { lista.push(k); usados.push(k.id); }
    }
    const objetivo = 2 + (Math.random() < 0.45 ? 1 : 0);
    while (lista.length < objetivo) {
      const e = sacar(E, st, usados);
      if (!e) break;
      lista.push(e); usados.push(e.id);
    }
    return lista;
  };

  const arrancarAno = (st) => {
    let lista = generarAno(st);
    if (lista.length === 0) lista = [elegirAzar(E.filter((e) => st.rango >= e.min && st.rango <= e.max))];
    setCola(lista.slice(1));
    setEv(lista[0]);
    setOp(null);
    setFase("evento");
  };

  const elegirPais = (p) => setS((st) => {
    const n = { ...st, pais: p.id, cash: p.cash };
    Object.keys(p.mods).forEach((k) => { n[k] = clamp(n[k] + p.mods[k], 0, 100); });
    return n;
  });

  const elegirEstudio = (c) => {
    const n = { ...s, estudio: c.id };
    Object.keys(c.mods).forEach((k) => { n[k] = clamp(n[k] + c.mods[k], 0, 100); });
    n.titulares = [{ q: "2026", t: "Te gradúas de " + c.n + " en " + nacion.ban }];
    n.histo = [n.cash];   /* punto de partida, para que el primer cierre ya tenga curva */
    setS(n);
    arrancarAno(n);
  };

  const empezar = () => {
    tirarPartida();
    setS({ ...BASE, pesos: { ...PERFILES[0].w }, perks: [], bienes: [], valores: {}, titulares: [], vistos: [], histo: [], lecs: [] });
    setFin(null); setRes(null); setCierre(null); setTab("ficha"); setFase("pais");
  };

  /* retomar donde quedó: se reanuda al comienzo del año siguiente */
  const retomar = () => {
    const st = { ...BASE, ...guardado.s };
    setS(st);
    setFin(null); setRes(null); setCierre(null); setTab("ficha");
    setAviso("Partida retomada");
    arrancarAno(st);
  };

  /* aplica pesos nuevos y reparto nuevo, cobrando lo que cuesta moverse */
  const aplicarCartera = (nuevos, obj) => setS((st) => {
    const act = { ...(st.pesos || PERFILES[0].w) };
    act.efectivo = Math.max(0, 1 - invertidoDe(act));
    const dst = { ...nuevos, efectivo: Math.max(0, 1 - invertidoDe(nuevos)) };
    const rot = rotacion(act, dst);
    const o = clamp(obj, 0, 1);
    const liq = st.cash + st.cartera;
    let cartera = st.cartera, cash = st.cash, mov = 0;
    if (liq > 0) { cartera = liq * o; cash = liq - cartera; mov = Math.abs(cartera - st.cartera); }
    const costo = cartera * rot * COSTO_CAMBIO + mov * COSTO_CAMBIO * 0.5;
    const igual = PERFILES.find((x) => rotacion(x.w, dst) < 0.02);
    return {
      ...st, pesos: dst, objetivo: o, perfil: igual ? igual.id : "medida",
      cartera: Math.max(0, cartera - costo), cash,
      comisiones: (st.comisiones || 0) + costo, rotado: (st.rotado || 0) + rot,
    };
  });

  const comprarPerk = (p) => setS((st) => {
    if (st.cash + st.cartera < p.c || tiene(st, p.id)) return st;
    const r = cobrar(st, p.c);
    const n = { ...st, cash: r.cash, cartera: r.cartera, perks: st.perks.concat(p.id) };
    if (p.id === "mba") n.cri = clamp(n.cri + 8, 0, 100);
    n.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Compras " + p.n.toLowerCase() });
    return n;
  });

  const comprarBien = (c) => setS((st) => {
    if (st.cash + st.cartera < c.c || st.bienes.indexOf(c.id) >= 0) return st;
    const r = cobrar(st, c.c);
    const n = { ...st, cash: r.cash, cartera: r.cartera, bienes: st.bienes.concat(c.id), valores: { ...st.valores, [c.id]: c.c } };
    if (c.ene) n.ene = clamp(n.ene + c.ene, 0, 100);
    if (c.red) n.red = clamp(n.red + c.red, 0, 100);
    if (c.rep) n.rep = clamp(n.rep + c.rep, 0, 100);
    n.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Compras " + c.n.toLowerCase() });
    return n;
  });

  const levantarFondo = (t) => setS((st) => {
    const pct = st.rama === "pe" ? 0.01 : 0.02;
    const gp = t.m * pct;
    if (st.cash + st.cartera < gp || st.fondo) return st;
    const r = cobrar(st, gp);
    return {
      ...st, cash: r.cash, cartera: r.cartera,
      fondo: { tam: t.m, gp, pct, invertido: 0, posiciones: [], realizado: 0, oferta: [] },
      titulares: st.titulares.concat({ q: String(2026 + st.turno), t: "Levantas tu propio fondo de " + t.n }),
    };
  });

  const invertirEn = (idx, mult) => setS((st) => {
    const f = st.fondo;
    if (!f) return st;
    const deal = f.oferta[idx];
    if (!deal || deal.tomado) return st;
    const ticket = Math.round(deal.ticket * mult);
    if (f.invertido + ticket > f.tam) return st;
    const oferta = f.oferta.slice();
    oferta[idx] = { ...deal, tomado: true };
    const pos = f.posiciones.concat({
      n: deal.n, s: deal.s, ticket, riesgo: deal.riesgo, base: deal.base,
      salida: st.turno + 3 + Math.floor(Math.random() * 3),
    });
    return { ...st, fondo: { ...f, invertido: f.invertido + ticket, posiciones: pos, oferta } };
  });

  /* ---------- resolución de una escena ---------- */
  const resolverEscena = (d, nivel, o) => {
    let st = { ...s, valores: { ...s.valores } };
    const cambios = [];
    if (o && o.ramaId) st.rama = o.ramaId;
    if (o && o.mudar) st.pais = o.mudar;

    ["mod", "cri", "red", "rep", "ene", "car"].forEach((k) => {
      if (!d[k]) return;
      let v = d[k];
      if (k === "rep" && v < 0 && tiene(st, "abogado")) v = Math.round(v * 0.6);
      if (k === "car") st.carrera += v;
      else st[k] = clamp(st[k] + v, 0, 100);
      cambios.push({ k, v });
    });
    if (d.cash) {
      const monto = Math.round(d.cash * ESCALA[st.rango]);
      if (monto >= 0) st.cash += monto;
      else { const r = cobrar(st, -monto); st.cash = r.cash; st.cartera = r.cartera; }
      cambios.push({ k: "cash", v: monto });
    }
    if (d.mercado) st.shock = (st.shock || 0) + d.mercado;
    if (d.msg) st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: d.msg.split(".")[0] });
    st.vistos = st.vistos.concat(ev.id);

    if (o && o.sigue && nivel === "exito" && CADENA[o.sigue]) {
      setCola((c) => c.concat(CADENA[o.sigue]));
    }

    setS(st);
    setRes({ msg: d.msg, nivel, cambios });
    setFase("resultado");
  };

  /* ---------- cierre del año ---------- */
  const cerrarAno = () => {
    let st = { ...s, valores: { ...s.valores } };
    const ing = [], egr = [], notas = [];
    const na = NACIONES.find((x) => x.id === st.pais) || NACIONES[0];
    const patAntes = st.cash + st.cartera + valorBienes(st);
    const gastoAnt = st.gastoAnt || 0;

    if (tiene(st, "research")) st.mod = clamp(st.mod + 2, 0, 100);
    if (tiene(st, "club")) st.red = clamp(st.red + 2, 0, 100);
    if (tiene(st, "prensa")) st.rep = clamp(st.rep + 2, 0, 100);
    if (tiene(st, "gym")) st.ene = clamp(st.ene + 6, 0, 100);
    if (tiene(st, "asistente")) { st.carrera += 2; st.ene = clamp(st.ene + 4, 0, 100); }
    if (tiene(st, "mba")) st.carrera += 2;
    if (st.rama === "mya") st.carrera += 2;
    if (st.rama === "mercados") st.mod = clamp(st.mod + 2, 0, 100);
    if (st.rama === "patrimonio") st.red = clamp(st.red + 2, 0, 100);
    if (st.rama === "boutique") st.rep = clamp(st.rep + 2, 0, 100);

    /* ---- lo que entra ---- */
    const salario = salarioAnual(st);
    const multB = clamp(0.5 + st.rep / 90 + st.carrera / 400, 0.3, 3);
    const bono = RANGOS[st.rango].salario * multB * na.sal;
    ing.push({ n: "Sueldo", v: salario });
    ing.push({ n: "Bono por desempeño", v: bono });

    if (st.rama === "boutique") {
      const v = salario * (Math.random() * 0.8 - 0.2);
      if (v >= 0) ing.push({ n: "Variable de la boutique", v });
      else egr.push({ n: "Año flojo de la boutique", v: -v });
    }
    if (st.rama === "mercados") ing.push({ n: "Participación en colocaciones", v: salario * 0.14 });

    let renta = 0;
    st.bienes.forEach((id) => { renta += ((bienDe(id) || {}).renta || 0) * 2; });
    if (renta) ing.push({ n: "Renta de propiedades", v: renta });

    if (st.fondo) {
      const f = { ...st.fondo, posiciones: st.fondo.posiciones.slice() };
      ing.push({ n: "Comisión de administración del fondo", v: f.tam * 0.02 });
      const quedan = [];
      let realizado = 0;
      f.posiciones.forEach((pp) => {
        if (st.turno < pp.salida) { quedan.push(pp); return; }
        const disp = 0.28 + pp.riesgo * 0.22;
        let m = Math.max(0, pp.base + disp * gauss() + (st.rama === "pe" ? 0.15 : 0));
        const proceeds = pp.ticket * m;
        const carry = Math.max(0, proceeds - pp.ticket * 1.4) * 0.2;
        const proRata = (proceeds - pp.ticket) * f.pct;
        realizado += carry + proRata;
        f.realizado += proceeds - pp.ticket;
        notas.push(`Sale ${pp.n} a ${m.toFixed(2)}x. Tu parte, USD ${fmt(carry + proRata)}.`);
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: `Salida de ${pp.n} a ${m.toFixed(2)}x` });
      });
      if (realizado) ing.push({ n: "Carry e inversión propia del fondo", v: realizado });
      f.posiciones = quedan;
      const libre = f.tam - f.invertido;
      f.oferta = libre > f.tam * 0.05
        ? EMPRESAS.slice().sort(() => Math.random() - 0.5).slice(0, 2).map((e) => ({
            n: e.n, s: e.s, riesgo: e.riesgo, base: e.base, tomado: false,
            ticket: Math.max(100000, Math.round(Math.min(libre * 0.4, f.tam * (0.08 + Math.random() * 0.07)) / 100000) * 100000),
          }))
        : [];
      st.fondo = f;
    }

    /* ---- lo que sale ---- */
    const ingreso = ing.reduce((a, x) => a + x.v, 0);
    const gravable = salario + bono;
    const impuesto = gravable * na.tax;
    const gastos = gastoAnual(st);
    egr.push({ n: `Impuesto sobre la renta, ${Math.round(na.tax * 100)} por ciento`, v: impuesto });
    egr.push({ n: "Costo de vida", v: gastos });
    const egreso = egr.reduce((a, x) => a + x.v, 0);
    const neto = ingreso - egreso;
    st.cash += neto;
    const ahorro = ingreso > 0 ? clamp(neto / ingreso, -2, 1) : 0;

    /* ---- noticias del año, sesgadas por el país ---- */
    const notis = [];
    const conSesgo = NOTICIAS.filter((x) => x.k === na.sesgo);
    notis.push(Math.random() < 0.4 && conSesgo.length ? elegirAzar(conSesgo) : elegirAzar(NOTICIAS));
    if (Math.random() < 0.45) {
      const seg = elegirAzar(NOTICIAS);
      if (seg.t !== notis[0].t) notis.push(seg);
    }

    /* ---- reparto entre cartera y efectivo, según TU objetivo ---- */
    const obj = clamp(st.objetivo == null ? 0.7 : st.objetivo, 0, 1);
    const liquido = st.cash + st.cartera;
    let aporte = 0, deuda = false;
    if (liquido > 0) {
      const meta = liquido * obj;
      aporte = meta - st.cartera;
      st.cartera = meta;
      st.cash = liquido - meta;
    } else {
      aporte = -st.cartera;
      st.cartera = 0;
      st.cash = liquido;
      deuda = true;
    }

    /* ---- el año en los mercados ---- */
    const w = st.pesos || PERFILES[0].w;
    const vol = tiene(st, "broker") ? 0.75 : 1;
    const zm = gauss();                      /* el factor común: lo que le pasa a todo el mercado */
    const wEf = Math.max(0, 1 - invertidoDe(w));
    let ret = wEf * EFECTIVO_MU;
    let beta = 0;
    const detalle = [];
    ACTIVOS.forEach((a) => {
      const x = w[a.k] || 0;
      if (!x) return;
      let imp = impactoActivo(a.k, notis);
      if (imp < 0 && tiene(st, "colchon")) imp *= 0.5;
      const idio = Math.sqrt(Math.max(0.12, 1 - a.b * a.b));
      const rA = a.mu + a.sd * vol * (a.b * zm + idio * gauss()) + imp;
      ret += x * rA;
      beta += x * a.b;
      detalle.push({ n: a.n, w: x, r: rA });
    });
    if (wEf > 0.005) detalle.push({ n: "Efectivo dentro de la cartera", w: wEf, r: EFECTIVO_MU });
    detalle.sort((a, b) => b.w - a.w);
    if (tiene(st, "terminal")) ret += 0.01;
    if (st.rama === "patrimonio") ret += 0.02;
    if (st.shock) { ret += st.shock; st.shock = 0; }

    const carteraAntes = st.cartera;
    st.cartera = Math.max(0, st.cartera * (1 + ret));
    const est = statsPesos({ ...w, efectivo: wEf });
    let sdSuma = 0;
    ACTIVOS.forEach((a) => { sdSuma += (w[a.k] || 0) * a.sd; });
    const cartera = { antes: carteraAntes, despues: st.cartera, ret, detalle, aporte, obj, mu: est.mu, sd: est.sd, beta };

    /* ---- bienes ---- */
    st.bienes.forEach((id) => {
      const c = bienDe(id);
      if (!c) return;
      const v = st.valores[id] || 0;
      st.valores[id] = c.tipo === "consumo" ? v * (1 - (c.dep || 0) * 2) : v * (1 + (c.ap || 0) * 2);
    });

    st.ene = clamp(st.ene - (tiene(st, "coach") ? 5 : 8) - (st.rama === "boutique" ? 3 : 0), 0, 100);
    let terminar = null;
    if (st.ene <= 0) {
      st.burnouts += 1;
      st.ene = 45; st.rep = clamp(st.rep - 8, 0, 100); st.cash -= 3000;
      notas.push("Te quiebras. Meses fuera y un regreso más lento de lo que admites.");
      if (st.burnouts >= 4) terminar = "burnout";
    }
    if (st.rep <= 4) terminar = "despido";

    let ascenso = null;
    if (st.rango < RANGOS.length - 1 && st.carrera >= RANGOS[st.rango].umbral && st.rep >= 35) {
      st.rango += 1;
      ascenso = RANGOS[st.rango].n;
      st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Ascenso a " + ascenso });
    }

    /* ---- foto del año ---- */
    const bienesV = valorBienes(st);
    const patrimonio = st.cash + st.cartera + bienesV;
    const consumo = st.bienes.reduce((a, id) => {
      const c = bienDe(id);
      return a + (c && c.tipo === "consumo" ? c.c : 0);
    }, 0);
    const mantiene = st.bienes.reduce((a, id) => a + ((bienDe(id) || {}).up || 0) * 2, 0);
    const cobertura = gastos > 0 ? (patrimonio * 0.04 + renta) / gastos : 0;

    const hitos = [];
    HITOS.forEach((h) => { if (patrimonio >= h.v && (st.techo || 0) < h.v) hitos.push(h.t); });
    if (patrimonio > (st.techo || 0)) st.techo = patrimonio;
    if (cobertura >= 1 && (st.hitoLibre !== true)) { hitos.push("Cubres tu costo de vida"); st.hitoLibre = true; }
    if (renta > 0 && !st.hitoRenta) { hitos.push("Primera renta pasiva"); st.hitoRenta = true; }
    if (st.cartera > salario && !st.hitoCartera) { hitos.push("Tu cartera supera tu sueldo anual"); st.hitoCartera = true; }
    if (ascenso) hitos.push("Ascenso a " + ascenso);

    const ctx = {
      turno: st.turno, edad: edad(st.turno), ahorro, ret, deltaC: cartera.despues - cartera.antes,
      muC: est.mu, sdC: est.sd, sdCsuma: sdSuma, betaC: beta, patrimonio, patAntes,
      gastos, gastoAnt, ingreso, impuesto, salario, cash: st.cash, cartera: st.cartera,
      objetivo: obj, pesos: w, conc: concentracion(w), rentaProps: renta, consumo,
      cobertura, comisiones: st.comisiones || 0, fondo: st.fondo, pais: st.pais, tax: na.tax,
      ene: st.ene, bienesV, rotado: st.rotado || 0, mantenimiento: mantiene,
    };
    const leccion = escogerLeccion(ctx, st.lecs || []);
    if (leccion) st.lecs = (st.lecs || []).concat(leccion.id).slice(-20);

    st.histo = (st.histo || []).concat(patrimonio);
    st.gastoAnt = gastos;

    const ano = 2026 + st.turno;
    st.turno += 1;
    setS(st);
    setCierre({
      ano, notis, ascenso, cartera, notas, ing, egr, ingreso, egreso, neto, ahorro,
      patAntes, patrimonio, bienesV, histo: st.histo, leccion, hitos, deuda,
      cobertura, gastos, indep: gastos > 0 ? clamp(patrimonio / (gastos * 25), 0, 1.4) : 0,
    });
    if (terminar) setFin(terminar);
    setFase("cierre");
  };

  const ayudaDe = (o) => {
    const tipo = o.juego || o.j;
    let a = s[o.stat] || 30;
    const ca = CARRERAS.find((x) => x.id === s.estudio);
    if (ca && ca.juegos.indexOf(tipo) >= 0) a += 18;
    if (tiene(s, "terminal") && ["ojo", "reaccion", "calculo", "semaforo", "trading"].indexOf(tipo) >= 0) a += 15;
    if (tiene(s, "club") && tipo === "anclaje") a += 15;
    if (s.rama === "pe" && ["estructura", "banderas"].indexOf(tipo) >= 0) a += 15;
    if (s.rama === "mercados" && ["trading", "calculo"].indexOf(tipo) >= 0) a += 15;
    return clamp(a, 0, 100);
  };

  const elegir = (o) => {
    setOp(o);
    if (o.juego || o.j) { setFase("minijuego"); return; }
    if (o.chk) {
      const p = clamp((s[o.chk.s] - o.chk.dif) / 55 + 0.5, 0.12, 0.9);
      const ok = Math.random() < p;
      resolverEscena(ok ? o.chk.ok : o.chk.no, ok ? "exito" : "fallo", o);
    } else resolverEscena(o.d, "exito", o);
  };

  const finJuego = (nivel) => resolverEscena(op.res ? op.res[nivel] : escalar(op.d, nivel), nivel, op);

  const siguienteEscena = () => {
    if (cola.length > 0) {
      setEv(cola[0]); setCola(cola.slice(1)); setOp(null); setFase("evento");
    } else cerrarAno();
  };

  const siguienteAno = () => {
    if (fin) { tirarPartida(); setFase("fin"); return; }
    if (s.turno >= tope) {
      if (s.seguir >= 2) { tirarPartida(); setFin("completo"); setFase("fin"); return; }
      persistir(s); setFase("retiro"); return;
    }
    persistir(s);
    arrancarAno(s);
  };

  const retirarse = () => { tirarPartida(); setFin("retiro"); setFase("fin"); };
  const seguirCinco = () => {
    const st = { ...s, seguir: s.seguir + 1 };
    setS(st); persistir(st); arrancarAno(st);
  };

  const bienesVal = valorBienes(s);
  const valorFondo = s.fondo ? s.fondo.posiciones.reduce((a, p) => a + p.ticket * s.fondo.pct, 0) : 0;
  const patrimonio = s.cash + s.cartera + bienesVal + valorFondo;
  const gastosAnuales = gastoAnual(s);
  const retiroAnual = patrimonio * 0.04;
  const rentaProps = s.bienes.reduce((a, id) => a + ((bienDe(id) || {}).renta || 0), 0) * 2;
  const cobertura = gastosAnuales > 0 ? (retiroAnual + rentaProps * 0.5) / gastosAnuales : 0;

  const veredicto = useMemo(() => {
    if (fin === "despido") return { t: "Salida por la puerta de atrás", x: "Tu reputación se agotó antes que tu talento. En esta industria el capital más escaso no es el financiero." };
    if (fin === "burnout") return { t: "El cuerpo cobró la cuenta", x: "Llegaste lejos y a un costo que no aparece en ningún estado financiero." };
    if (s.fondo && cobertura >= 1.5) return { t: "Del otro lado de la mesa", x: "Terminaste administrando capital propio y ajeno, con un patrimonio que cubre tu vida sin depender de nadie. Muy pocos cruzan esa línea." };
    if (cobertura >= 1.5 && s.rango >= 5) return { t: "Te retiraste arriba y con el número resuelto", x: "Cargo alto, patrimonio que cubre tus gastos con holgura y una red que te sobrevive." };
    if (cobertura >= 1) return { t: "Libertad financiera", x: "Tu patrimonio cubre tu forma de vivir sin que tengas que volver a la oficina. Ya no trabajas porque necesites." };
    if (cobertura >= 0.6) return { t: "Casi, pero todavía no", x: "Tienes un patrimonio serio y aun así te falta para cubrir tu tren de vida. O trabajas unos años más, o el tren de vida se ajusta." };
    if (s.rango >= 5) return { t: "Llegaste alto y gastaste igual de alto", x: "El cargo lo conseguiste. El patrimonio para sostenerlo sin sueldo, no. Es un final más común de lo que parece." };
    return { t: "El sueldo era el plan", x: "Trabajaste tres décadas y sigues dependiendo del próximo pago. La carrera no fue mala, la acumulación sí." };
  }, [fin, cobertura, s.rango, s.fondo]);

  const Stat = ({ k, v, ene }) => (
    <div className="ea-stat">
      <div className="ea-statTop"><span className="ea-dis">{ETIQ[k]}</span><span className="ea-mono">{Math.round(v)}</span></div>
      <div className="ea-bar"><div className={"ea-fill" + (ene ? " ene" : "") + (v < 25 ? " baja" : "")} style={{ width: v + "%" }} /></div>
    </div>
  );

  const selloTxt = { exito: "Ejecutado", parcial: "A medias", fallo: "Fallido" };
  const selloCls = { exito: "", parcial: " med", fallo: " mal" };
  const TABS = [["ficha", "Ficha"], ["portafolio", "Cartera"], ["props", "Bienes"], ["mejoras", "Mejoras"], ["fondo", "Fondo"], ["expediente", "Vida"]];
  const ramaN = s.rama ? (RAMAS.find((r) => r.id === s.rama) || {}).n : null;
  const ano = 2026 + s.turno;

  return (
    <div className="ea-root">
      <style>{CSS}{CSS2}{CSS3}{CSS4}</style>

      {fase === "portada" && (
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Simulador de carrera e inversión</div>
          <h1 className="ea-h1 ea-dis">El Analista</h1>
          <p className="ea-lede">
            Tienes veinte años y estás por graduarte. De dónde vienes y qué estudiaste van a abrirte unas puertas
            y cerrarte otras durante los próximos treinta años. Cada año trae decisiones, noticias que sacuden el
            mercado, una cartera que repartes tú y un examen que se vuelve más difícil a medida que avanzas. A los
            cincuenta eliges si te retiras.
          </p>
          <div className="ea-regla" />
          <div className="ea-cifras" style={{ marginBottom: 26 }}>
            <div><div className="ea-cifraK">Recorrido</div><div className="ea-cifraV ea-mono">20 a 50 años</div></div>
            <div><div className="ea-cifraK">Orígenes</div><div className="ea-cifraV ea-mono">6</div></div>
            <div><div className="ea-cifraK">Carreras</div><div className="ea-cifraV ea-mono">6</div></div>
            <div><div className="ea-cifraK">Minijuegos</div><div className="ea-cifraV ea-mono">{MINIJUEGOS.length}</div></div>
            <div><div className="ea-cifraK">Preguntas</div><div className="ea-cifraV ea-mono">{PREGUNTAS.length}</div></div>
            <div><div className="ea-cifraK">Niveles</div><div className="ea-cifraV ea-mono">5</div></div>
          </div>
          {guardado ? (
            <div>
              <div className="ea-guarda">
                <div className="ea-lecK" style={{ color: "var(--tenue)" }}>Tienes una vida a medio camino</div>
                <div className="ea-dis" style={{ fontSize: 19, color: "var(--papel)", marginTop: 5 }}>
                  {2026 + guardado.s.turno} · {edad(guardado.s.turno)} años · {RANGOS[guardado.s.rango].n}
                </div>
                <div className="ea-mono" style={{ fontSize: 13, color: "var(--tenue)", marginTop: 3 }}>
                  patrimonio USD {fmt(guardado.s.cash + guardado.s.cartera)} · año {guardado.s.turno + 1} de {TOPES[guardado.s.seguir]}
                </div>
              </div>
              <div className="ea-fila2" style={{ marginTop: 14 }}>
                <button className="ea-btnO" style={{ marginTop: 0 }} onClick={retomar}>Retomar</button>
                <button className="ea-btn" style={{ marginTop: 0, background: "transparent", border: "1px solid var(--borde)", color: "var(--hueso)" }}
                  onClick={empezar}>Empezar otra vida</button>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--tenue)", marginTop: 8 }}>
                Empezar otra vida borra la partida guardada.
              </div>
            </div>
          ) : (
            <button className="ea-btnO" onClick={empezar}>Empezar</button>
          )}
        </div>
      )}

      {fase === "pais" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso uno de dos</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿De dónde vienes?</h2>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            El país define tu sueldo, tu costo de vida, qué noticias te tocan más de cerca y con qué instintos empiezas.
          </p>
          {NACIONES.map((p) => (
            <div className="ea-panel" key={p.id} style={{ marginBottom: 10 }}>
              <div className="ea-itemTop">
                <span className="ea-nombre ea-dis" style={{ fontSize: 19 }}>{p.n}</span>
                <span className="ea-mono" style={{ fontSize: 12.5, color: "var(--tenue)" }}>{p.ban}</span>
              </div>
              <div style={{ fontSize: 13.5, color: "var(--tenue)", margin: "8px 0" }}>{p.d}</div>
              <div style={{ fontSize: 12, color: "var(--cobre)" }}>
                Sueldos {Math.round(p.sal * 100)} · costo de vida {Math.round(p.gas * 100)} · impuesto {Math.round(p.tax * 100)} por ciento · empiezas con USD {fmt(p.cash)}
              </div>
              <div style={{ fontSize: 12, color: "var(--tenue)", marginTop: 3 }}>{p.nota}</div>
              <button className="ea-mini" onClick={() => { elegirPais(p); setFase("estudio"); }}>Elegir</button>
            </div>
          ))}
        </div>
      )}

      {fase === "estudio" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso dos de dos</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Qué estás por terminar?</h2>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            Tu carrera te da atributos de entrada y, sobre todo, opciones que solo tú vas a poder tomar cuando aparezcan.
          </p>
          {CARRERAS.map((c) => (
            <div className="ea-panel" key={c.id} style={{ marginBottom: 10 }}>
              <div className="ea-nombre ea-dis" style={{ fontSize: 19 }}>{c.n}</div>
              <div style={{ fontSize: 13.5, color: "var(--tenue)", margin: "7px 0" }}>{c.d}</div>
              <div style={{ fontSize: 12, color: "var(--cobre)" }}>
                {Object.keys(c.mods).map((k) => ETIQ[k] + " +" + c.mods[k]).join(" · ")} · mejor en {c.juegos.map((j) => JUEGOS[j].n.toLowerCase()).join(" y ")}
              </div>
              <button className="ea-mini" onClick={() => elegirEstudio(c)}>Graduarte de esto</button>
            </div>
          ))}
        </div>
      )}

      {(fase === "evento" || fase === "minijuego" || fase === "resultado" || fase === "cierre" || fase === "retiro") && (
        <div className="ea-wrap">
          <div className="ea-placa">
            <div>
              <div className="ea-nombre ea-dis">{RANGOS[s.rango].n}</div>
              <div className="ea-sub ea-dis">{estudio.n} · {nacion.ban}{ramaN ? " · " + ramaN : ""}</div>
            </div>
            <div className="ea-reloj">
              <div className="ea-dis">{ano} · {edad(s.turno)} años · año {Math.min(s.turno + 1, tope)} de {tope}</div>
              <div className={"ea-plata ea-mono" + (patrimonio < 0 ? " neg" : "")}>USD {fmt(patrimonio)}</div>
              <div className="ea-mono" style={{ fontSize: 11.5, marginTop: 2 }}>efectivo {fmt(s.cash)} · cartera {fmt(s.cartera)}</div>
            </div>
          </div>
          {fase !== "cierre" && (fase === "evento" || fase === "minijuego" || fase === "resultado") && (
            <div className="ea-cinta">
              <span className="ea-cintaK ea-dis">{ano}</span>
              <span>Quedan {cola.length + (fase === "evento" ? 1 : fase === "minijuego" ? 1 : 0)} situaciones este año · cartera {perfilN.toLowerCase()}</span>
              {aviso && <span style={{ marginLeft: "auto", color: "var(--verde)", flexShrink: 0 }}>{aviso}</span>}
            </div>
          )}

          <div className="ea-grid">
            <div>
              <div className="ea-tabs">
                {TABS.map((par) => (
                  <button key={par[0]} className={"ea-tab" + (tab === par[0] ? " on" : "")} onClick={() => setTab(par[0])}>{par[1]}</button>
                ))}
              </div>
              <div className="ea-panel" style={{ maxHeight: 470, overflowY: "auto" }}>
                {tab === "ficha" && (
                  <div>
                    <Stat k="mod" v={s.mod} /><Stat k="cri" v={s.cri} /><Stat k="red" v={s.red} /><Stat k="rep" v={s.rep} /><Stat k="ene" v={s.ene} ene />
                    <div className="ea-fila" style={{ marginTop: 10 }}>
                      <span className="ea-dis" style={{ fontSize: 12 }}>Carrera</span>
                      <span className="ea-mono">{s.carrera} / {RANGOS[s.rango].umbral === Infinity ? "máx" : RANGOS[s.rango].umbral}</span>
                    </div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Origen</span><span className="ea-mono">{nacion.n}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Formación</span><span className="ea-mono">{estudio.n}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Rama</span><span className="ea-mono">{ramaN || "sin definir"}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Sueldo bruto</span><span className="ea-mono">USD {fmt(salarioAnual(s))}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Impuesto</span><span className="ea-mono">{Math.round(impuestoDe(s) * 100)} por ciento</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Gasto anual</span><span className="ea-mono">USD {fmt(gastosAnuales)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Efectivo</span><span className="ea-mono">USD {fmt(s.cash)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cartera invertida</span><span className="ea-mono">USD {fmt(s.cartera)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Bienes</span><span className="ea-mono">USD {fmt(bienesVal)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Patrimonio</span><span className="ea-mono">USD {fmt(patrimonio)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cubre tus gastos</span><span className="ea-mono">{Math.round(cobertura * 100)} por ciento</span></div>
                  </div>
                )}

                {tab === "portafolio" && (
                  <PanelCartera st={s} onAplicar={aplicarCartera} />
                )}

                {tab === "props" && (
                  <div>
                    <div className="ea-rot ea-dis">Propiedades que rentan</div>
                    {PROPIEDADES.map((c) => {
                      const ya = s.bienes.indexOf(c.id) >= 0;
                      return (
                        <div className="ea-item" key={c.id}>
                          <div className="ea-itemTop">
                            <span className="ea-itemN">{c.n}</span>
                            <span className="ea-mono" style={{ fontSize: 12.5, flexShrink: 0 }}>{fmt(c.c)}</span>
                          </div>
                          <div className="ea-itemD">
                            {c.renta ? "Renta " + fmt(c.renta * 2) + " al año" : "Sin renta, solo apreciación"}
                            {c.up ? " · mantenimiento " + fmt(c.up * 2) : ""} · aprecia {(c.ap * 200).toFixed(1)} por ciento
                          </div>
                          <div className="ea-itemD">{c.d}</div>
                          {ya ? <span className="ea-tengo ea-dis">Vale hoy USD {fmt(s.valores[c.id] || 0)}</span>
                            : <button className="ea-mini" disabled={s.cash + s.cartera < c.c} onClick={() => comprarBien(c)}>Comprar</button>}
                        </div>
                      );
                    })}
                    <div className="ea-rot ea-dis" style={{ marginTop: 18 }}>Caprichos</div>
                    {CAPRICHOS.map((c) => {
                      const ya = s.bienes.indexOf(c.id) >= 0;
                      return (
                        <div className="ea-item" key={c.id}>
                          <div className="ea-itemTop">
                            <span className="ea-itemN">{c.n}</span>
                            <span className="ea-mono" style={{ fontSize: 12.5, flexShrink: 0 }}>{fmt(c.c)}</span>
                          </div>
                          <div className="ea-itemD">
                            {c.tipo === "activo" ? "Activo, aprecia con los años" : "Consumo, no se recupera"}
                            {c.up ? " · mantenimiento " + fmt(c.up * 2) + " al año" : ""}
                            {c.renta ? " · renta " + fmt(c.renta * 2) : ""}
                          </div>
                          <div className="ea-itemD">{c.d}</div>
                          {ya ? <span className="ea-tengo ea-dis">{c.tipo === "activo" ? "Vale hoy USD " + fmt(s.valores[c.id] || 0) : "Ya lo tienes"}</span>
                            : <button className="ea-mini" disabled={s.cash + s.cartera < c.c} onClick={() => comprarBien(c)}>Comprar</button>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {tab === "mejoras" && (
                  <div>
                    {PERKS.map((p) => (
                      <div className="ea-item" key={p.id}>
                        <div className="ea-itemTop">
                          <span className="ea-itemN">{p.n}</span>
                          <span className="ea-mono" style={{ fontSize: 12.5, flexShrink: 0 }}>{fmt(p.c)}</span>
                        </div>
                        <div className="ea-itemD">{p.d}</div>
                        {tiene(s, p.id) ? <span className="ea-tengo ea-dis">Ya la tienes</span>
                          : <button className="ea-mini" disabled={s.cash + s.cartera < p.c} onClick={() => comprarPerk(p)}>Comprar</button>}
                      </div>
                    ))}
                  </div>
                )}

                {tab === "fondo" && (
                  <div>
                    {!s.fondo && (
                      <div>
                        <div className="ea-itemD" style={{ marginBottom: 12 }}>
                          Para levantar tu propio fondo necesitas un patrimonio de USD {fmt(UMBRAL_FONDO)}, red y cargo.
                          Comprometes dos por ciento del tamaño como capital propio, uno por ciento si tu rama es private
                          equity. Cobras dos por ciento anual de administración y veinte de las ganancias.
                        </div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Tu patrimonio</span><span className="ea-mono">USD {fmt(patrimonio)}</span></div>
                        {patrimonio >= UMBRAL_FONDO ? TAMANOS.map((t) => {
                          const pct = s.rama === "pe" ? 0.01 : 0.02;
                          const listo = s.red >= t.red && s.rango >= t.rango && s.cash + s.cartera >= t.m * pct;
                          return (
                            <div className="ea-item" key={t.n}>
                              <div className="ea-itemTop">
                                <span className="ea-itemN">Fondo de {t.n}</span>
                                <span className="ea-mono" style={{ fontSize: 12.5 }}>{fmt(t.m * pct)}</span>
                              </div>
                              <div className="ea-itemD">Pide red {t.red} y cargo de {RANGOS[t.rango].n} hacia arriba.</div>
                              <button className="ea-mini" disabled={!listo} onClick={() => levantarFondo(t)}>
                                {listo ? "Levantar el fondo" : "Todavía no calificas"}
                              </button>
                            </div>
                          );
                        }) : (
                          <div className="ea-itemD" style={{ marginTop: 10 }}>Te faltan USD {fmt(Math.max(0, UMBRAL_FONDO - patrimonio))} de patrimonio.</div>
                        )}
                      </div>
                    )}
                    {s.fondo && (
                      <div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Tamaño</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Invertido</span><span className="ea-mono">USD {fmt(s.fondo.invertido)}</span></div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Disponible</span><span className="ea-mono">USD {fmt(s.fondo.tam - s.fondo.invertido)}</span></div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ganancia realizada</span><span className="ea-mono">USD {fmt(s.fondo.realizado)}</span></div>
                        <div className="ea-rot ea-dis" style={{ marginTop: 16 }}>En cartera</div>
                        {s.fondo.posiciones.length === 0 && <div className="ea-itemD">Todavía no has invertido en nada.</div>}
                        {s.fondo.posiciones.map((p, k) => (
                          <div className="ea-fondoC" key={k}>
                            <div className="ea-fondoT"><span className="ea-fondoN">{p.n}</span><span className="ea-mono" style={{ fontSize: 12 }}>{fmt(p.ticket)}</span></div>
                            <div className="ea-itemD">{p.s} · salida estimada en {Math.max(0, p.salida - s.turno)} años</div>
                          </div>
                        ))}
                        <div className="ea-rot ea-dis" style={{ marginTop: 16 }}>Sobre la mesa</div>
                        {(!s.fondo.oferta || s.fondo.oferta.length === 0) && <div className="ea-itemD">No hay oportunidades este año.</div>}
                        {(s.fondo.oferta || []).map((o, k) => (
                          <div className="ea-fondoC" key={k}>
                            <div className="ea-fondoT">
                              <span className="ea-fondoN">{o.n}</span>
                              <span className="ea-badge">{o.riesgo === 1 ? "Riesgo bajo" : o.riesgo === 2 ? "Riesgo medio" : "Riesgo alto"}</span>
                            </div>
                            <div className="ea-itemD">{o.s} · ticket USD {fmt(o.ticket)} · múltiplo esperado {o.base.toFixed(1)}x</div>
                            {o.tomado ? <span className="ea-tengo ea-dis">Invertido</span> : (
                              <div style={{ display: "flex", gap: 7 }}>
                                <button className="ea-mini" onClick={() => invertirEn(k, 1)}>Ticket completo</button>
                                <button className="ea-mini" onClick={() => invertirEn(k, 0.5)}>Medio ticket</button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {tab === "expediente" && (
                  <div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Índice de vida</span><span className="ea-mono">{vidaTotal(s)}</span></div>
                    {s.titulares.slice(-18).reverse().map((t, i) => (
                      <div className="ea-tit" key={i}><span className="ea-titQ ea-mono">{t.q}</span><span>{t.t}</span></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              {fase === "evento" && ev && (
                <div className="ea-memo">
                  <div className={"ea-memoHead ea-dis" + (ev.clave ? " clave" : "")}>
                    <span>{ev.rama ? "Bifurcación" : ev.clave ? "Decisión clave" : "Memorando interno"}</span><span>{ano}</span>
                  </div>
                  <h2 className="ea-memoTit ea-dis">{ev.t}</h2>
                  <p className="ea-memoTxt">{ev.x}</p>
                  <div className="ea-ops">
                    {ev.o.filter((o) => visible(o, s)).map((o, i) => (
                      <button className="ea-op" key={i} onClick={() => elegir(o)}>
                        <span className="ea-opN ea-mono">{String.fromCharCode(65 + i)}</span>{o.t}
                        {o.req && <span className="ea-opTag" style={{ color: "var(--cobre)" }}>Solo tú puedes tomar esta</span>}
                        {(o.juego || o.j) && <span className="ea-opTag">{JUEGOS[o.juego || o.j].n} · {JUEGOS[o.juego || o.j].tema} · te ayuda {ETIQ[o.stat]} {Math.round(ayudaDe(o))}</span>}
                        {o.ramaId && <span className="ea-opTag">{(RAMAS.find((r) => r.id === o.ramaId) || {}).d}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {fase === "minijuego" && op && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis clave"><span>{JUEGOS[op.juego || op.j].n} · {JUEGOS[op.juego || op.j].dur}</span><span>{ano}</span></div>
                  <h2 className="ea-memoTit ea-dis">{op.t}</h2>
                  <TarjetaJuego tipo={op.juego || op.j} ayuda={ayudaDe(op)} nivel={nivelDe(s.turno)}
                    statN={ETIQ[op.stat] || "Criterio"} onFin={finJuego} />
                </div>
              )}

              {fase === "resultado" && res && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis"><span>Resolución</span><span>{ano}</span></div>
                  <div className={"ea-sello ea-dis" + selloCls[res.nivel]}>{selloTxt[res.nivel]}</div>
                  <h2 className="ea-memoTit ea-dis">{ev.t}</h2>
                  <p className="ea-memoTxt">{res.msg}</p>
                  {res.cambios.length > 0 && (
                    <div className="ea-cambios">
                      {res.cambios.map((c, i) => (
                        <span className={"ea-chip ea-mono " + (c.v > 0 ? "pos" : "neg")} key={i}>
                          {ETIQ[c.k]} {c.v > 0 ? "+" : ""}{c.k === "cash" ? fmt(c.v) : c.v}
                        </span>
                      ))}
                    </div>
                  )}
                  <button className="ea-btn" onClick={siguienteEscena}>
                    {cola.length > 0 ? "Lo siguiente que pasó" : "Cerrar el año"}
                  </button>
                </div>
              )}

              {fase === "cierre" && cierre && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis clave"><span>Cierre del año</span><span>{cierre.ano}</span></div>
                  <h2 className="ea-memoTit ea-dis">Así terminó {cierre.ano}</h2>

                  {cierre.notis.map((n, i) => (
                    <div className="ea-noti" key={i} style={{ marginTop: i === 0 ? 6 : 8 }}>
                      <div className="ea-notiK">{n.k}</div>
                      <div className="ea-notiT">{n.t}</div>
                    </div>
                  ))}

                  {/* patrimonio: de dónde salió y hacia dónde va */}
                  <div className="ea-res" style={{ marginTop: 14 }}>
                    <div className="ea-lecK">Patrimonio</div>
                    <div className="ea-mono" style={{ fontSize: 26, color: "#1F2B2E", margin: "3px 0" }}>
                      USD {fmt(cierre.patrimonio)}
                    </div>
                    <div className="ea-dis" style={{ fontSize: 14, color: cierre.patrimonio >= cierre.patAntes ? "#3E6B3C" : "var(--rojo)" }}>
                      {cierre.patrimonio >= cierre.patAntes ? "+" : ""}{fmt(cierre.patrimonio - cierre.patAntes)} en el año
                      {cierre.patAntes > 0 ? " · " + ((cierre.patrimonio / cierre.patAntes - 1) * 100).toFixed(1) + " por ciento" : ""}
                    </div>
                    <Chispa datos={cierre.histo} />
                    <div className="ea-tabla" style={{ marginTop: 4 }}>
                      <span className="ea-td">Efectivo</span><span className="ea-tdn ea-mono">{fmt(s.cash)}</span>
                      <span className="ea-td">Cartera invertida</span><span className="ea-tdn ea-mono">{fmt(s.cartera)}</span>
                      <span className="ea-td">Bienes</span><span className="ea-tdn ea-mono">{fmt(cierre.bienesV)}</span>
                    </div>
                  </div>

                  {/* el año en plata */}
                  <div className="ea-res" style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                      <Flujo titulo={"Entró USD " + fmt(cierre.ingreso)} lista={cierre.ing} tope={cierre.ingreso} />
                      <Flujo titulo={"Salió USD " + fmt(cierre.egreso)} lista={cierre.egr} tope={cierre.ingreso} neg />
                    </div>
                    <div className="ea-flin" style={{ marginTop: 12, fontSize: 13.5, color: "#1F2B2E" }}>
                      <span className="ea-dis">Te quedaste con</span>
                      <span className="ea-mono" style={{ textAlign: "right", color: cierre.neto >= 0 ? "#3E6B3C" : "var(--rojo)" }}>{fmt(cierre.neto)}</span>
                    </div>
                    <div className="ea-flbar" style={{ height: 12 }}>
                      <div className={"ea-flfill" + (cierre.ahorro < 0 ? " neg" : "")}
                        style={{ width: Math.min(100, Math.abs(cierre.ahorro) * 100) + "%" }} />
                    </div>
                    <div className="ea-td" style={{ marginTop: 4 }}>
                      Tasa de ahorro {Math.round(cierre.ahorro * 100)} por ciento de todo lo que entró.
                    </div>
                    {cierre.deuda && (
                      <div className="ea-alerta mal">
                        Cerraste el año en rojo por USD {fmt(-s.cash)}: gastas más de lo que entra y la diferencia se financia.
                        {cierre.patAntes > 1000 ? " Te comiste la cartera y seguiste." : " A este cargo es normal, y también es la razón por la que el primer objetivo es que la resta dé positivo."}
                      </div>
                    )}
                  </div>

                  {/* la cartera */}
                  {cierre.cartera && (
                    <div className={"ea-alerta " + (cierre.cartera.ret >= 0.02 ? "bien" : cierre.cartera.ret < -0.02 ? "mal" : "")} style={{ marginTop: 14 }}>
                      <div className="ea-lecK">Tu cartera {perfilN.toLowerCase()} · {Math.round(cierre.cartera.obj * 100)} por ciento invertido</div>
                      <div className="ea-mono" style={{ fontSize: 23, color: "#1F2B2E", margin: "4px 0" }}>
                        {fmt(cierre.cartera.antes)} → {fmt(cierre.cartera.despues)}
                      </div>
                      <div className="ea-dis" style={{ fontSize: 16, color: cierre.cartera.ret >= 0 ? "#3E6B3C" : "var(--rojo)" }}>
                        {cierre.cartera.ret >= 0 ? "+" : ""}{(cierre.cartera.ret * 100).toFixed(1)} por ciento · {cierre.cartera.ret >= 0 ? "ganaste" : "perdiste"} USD {fmt(Math.abs(cierre.cartera.despues - cierre.cartera.antes))}
                      </div>
                      <div className="ea-td" style={{ marginTop: 3 }}>
                        Esperabas {(cierre.cartera.mu * 100).toFixed(1)} con una desviación de {(cierre.cartera.sd * 100).toFixed(1)} puntos, así que
                        {" "}{Math.abs(cierre.cartera.ret - cierre.cartera.mu) < cierre.cartera.sd ? "este año entra dentro de lo normal" : "este año fue de los raros, para bien o para mal"}.
                        {cierre.cartera.aporte > 100 ? " Metiste USD " + fmt(cierre.cartera.aporte) + " de aporte nuevo." : cierre.cartera.aporte < -100 ? " Sacaste USD " + fmt(-cierre.cartera.aporte) + " de la cartera." : ""}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        {cierre.cartera.detalle.map((d, i) => (
                          <div key={i} style={{ marginBottom: 4 }}>
                            <div className="ea-flin">
                              <span>{d.n} · {Math.round(d.w * 100)} por ciento</span>
                              <span className="ea-mono" style={{ textAlign: "right", color: d.r >= 0 ? "#3E6B3C" : "var(--rojo)" }}>
                                {d.r >= 0 ? "+" : ""}{(d.r * 100).toFixed(1)}
                              </span>
                            </div>
                            <div className="ea-flbar" style={{ height: 6 }}>
                              <div className={"ea-flfill" + (d.r < 0 ? " neg" : "")} style={{ width: Math.min(100, Math.abs(d.r) * 260) + "%" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* qué tan cerca estás de no necesitar el sueldo */}
                  <div className="ea-res" style={{ marginTop: 12 }}>
                    <div className="ea-lecK">Camino a no depender del sueldo</div>
                    <div className="ea-td" style={{ marginTop: 2 }}>
                      Tu patrimonio cubre {Math.round(cierre.cobertura * 100)} por ciento de tus gastos de USD {fmt(cierre.gastos)} retirando el cuatro por ciento.
                    </div>
                    <div className="ea-ind">
                      <div className="ea-indF" style={{ width: Math.min(100, cierre.indep * 100) + "%" }} />
                      <div className="ea-indM" style={{ left: "71.4%" }} />
                    </div>
                    <div className="ea-td" style={{ marginTop: 3, fontSize: 11.5 }}>
                      La marca es veinticinco veces tu gasto anual, USD {fmt(cierre.gastos * 25)}.
                    </div>
                  </div>

                  {cierre.hitos.length > 0 && (
                    <div className="ea-hitos">
                      {cierre.hitos.map((h, i) => (<span className="ea-hito" key={i}>{h}</span>))}
                    </div>
                  )}

                  {cierre.leccion && (
                    <div className="ea-lec">
                      <div className="ea-lecK">Lo que enseña este año</div>
                      <div className="ea-lecT">{cierre.leccion.t}</div>
                      <div className="ea-lecX">{cierre.leccion.x}</div>
                    </div>
                  )}

                  {cierre.notas.length > 0 && (
                    <div className="ea-res" style={{ marginTop: 12 }}>
                      {cierre.notas.map((n, i) => (<div key={i} className="ea-td" style={{ fontSize: 13.5 }}>{n}</div>))}
                    </div>
                  )}
                  {cierre.ascenso && (<div className="ea-dis" style={{ marginTop: 11, fontSize: 17, color: "var(--cobre)" }}>Ascenso a {cierre.ascenso}</div>)}

                  <button className="ea-btn" onClick={siguienteAno}>
                    {fin ? "Ver el balance final" : s.turno >= tope ? "Sentarte a hacer cuentas" : "Empezar " + (cierre.ano + 1)}
                  </button>
                  {!fin && <div className="ea-td" style={{ fontSize: 11.5, marginTop: 7, textAlign: "center" }}>
                    Al pasar de año la partida se guarda sola. Puedes cerrar y volver después.
                  </div>}
                </div>
              )}

              {fase === "retiro" && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis clave"><span>Decisión de vida</span><span>{edad(s.turno)} años</span></div>
                  <h2 className="ea-memoTit ea-dis">¿Te retiras?</h2>
                  <p className="ea-memoTxt">
                    Llegaste a los {edad(s.turno)}. Puedes cerrar aquí y vivir de lo que construiste, o seguir cinco años
                    más y ver hasta dónde llega. Los números son estos.
                  </p>
                  <div className="ea-res" style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 13.5, color: "#3A4649" }}>Patrimonio total USD {fmt(patrimonio)}, de los cuales USD {fmt(bienesVal)} están en bienes.</div>
                    <div style={{ fontSize: 13.5, color: "#3A4649" }}>Retirando cuatro por ciento al año dispondrías de USD {fmt(retiroAnual)}.</div>
                    {rentaProps > 0 && <div style={{ fontSize: 13.5, color: "#3A4649" }}>Tus propiedades rentan USD {fmt(rentaProps)} al año.</div>}
                    <div style={{ fontSize: 13.5, color: "#3A4649" }}>Tu forma de vivir cuesta USD {fmt(gastosAnuales)} al año.</div>
                    <div className="ea-dis" style={{ marginTop: 11, fontSize: 17, color: cobertura >= 1 ? "#3E6B3C" : "var(--rojo)" }}>
                      {cobertura >= 1 ? "Te alcanza y sobra" : cobertura >= 0.7 ? "Te queda corto por poco" : "No te alcanza"} · cubres el {Math.round(cobertura * 100)} por ciento
                    </div>
                  </div>
                  <div className="ea-fila2">
                    <button className="ea-btn" style={{ marginTop: 14 }} onClick={retirarse}>Retirarme ahora</button>
                    <button className="ea-btn" style={{ marginTop: 14, background: "var(--cobre)" }} onClick={seguirCinco}>Seguir cinco años más</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {fase === "fin" && (
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>
            {edad(s.turno)} años · {nacion.n} · {estudio.n}
          </div>
          <h2 className="ea-final ea-dis">{veredicto.t}</h2>
          <p className="ea-lede">{veredicto.x}</p>
          <div className="ea-regla" />
          <div className="ea-cifras">
            <div><div className="ea-cifraK">Cargo final</div><div className="ea-cifraV ea-dis">{RANGOS[s.rango].n}</div></div>
            <div><div className="ea-cifraK">Rama</div><div className="ea-cifraV ea-dis">{ramaN || "sin definir"}</div></div>
            <div><div className="ea-cifraK">Patrimonio</div><div className="ea-cifraV ea-mono">USD {fmt(patrimonio)}</div></div>
            <div><div className="ea-cifraK">Renta anual al 4%</div><div className="ea-cifraV ea-mono">USD {fmt(retiroAnual)}</div></div>
            <div><div className="ea-cifraK">Gasto anual</div><div className="ea-cifraV ea-mono">USD {fmt(gastosAnuales)}</div></div>
            <div><div className="ea-cifraK">Índice de vida</div><div className="ea-cifraV ea-mono">{vidaTotal(s)}</div></div>
          </div>
          {s.fondo && (
            <div className="ea-panel" style={{ marginTop: 24 }}>
              <div className="ea-rot ea-dis">Tu fondo</div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Tamaño levantado</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Capital desplegado</span><span className="ea-mono">USD {fmt(s.fondo.invertido)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Ganancia realizada</span><span className="ea-mono">USD {fmt(s.fondo.realizado)}</span></div>
            </div>
          )}
          {s.bienes.length > 0 && (
            <div className="ea-panel" style={{ marginTop: 16 }}>
              <div className="ea-rot ea-dis">Lo que compraste</div>
              {s.bienes.map((id) => {
                const c = bienDe(id);
                return (
                  <div className="ea-fila" key={id}>
                    <span style={{ fontSize: 13 }}>{c.n}</span>
                    <span className="ea-mono">{c.tipo === "consumo" ? "sin valor de reventa" : "USD " + fmt(s.valores[id] || 0)}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="ea-panel" style={{ marginTop: 16 }}>
            <div className="ea-rot ea-dis">Lo que quedó en tu expediente</div>
            {s.titulares.slice(-14).reverse().map((t, i) => (
              <div className="ea-tit" key={i}><span className="ea-titQ ea-mono">{t.q}</span><span>{t.t}</span></div>
            ))}
          </div>
          <button className="ea-btnO" style={{ marginTop: 24 }} onClick={empezar}>Vivir otra vida</button>
        </div>
      )}
    </div>
  );
}
