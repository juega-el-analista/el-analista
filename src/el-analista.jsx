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
.ea-root{overflow-x:clip}
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

const CSS5 = `
/* --- memoria por colores --- */
.ea-celdaC{aspect-ratio:1/1;border:2px solid;cursor:pointer;transition:background .12s,transform .1s,border-color .12s;
  display:flex;align-items:flex-end;justify-content:center;padding:6px 3px;font:inherit}
.ea-celdaC:disabled{cursor:default}

/* --- vidas / intentos restantes --- */
.ea-vidas{display:flex;gap:6px;margin-top:11px}
.ea-vida{width:26px;height:5px;background:rgba(26,37,40,.18)}
.ea-vida.viva{background:var(--cobre)}

/* --- la clase de la cátedra --- */
.ea-claseT{font-size:23px;line-height:1.1;margin:4px 0 10px;color:#111B1D;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.02em;font-weight:700}
.ea-ej{background:rgba(192,118,58,.1);border-left:3px solid var(--cobre);padding:10px 13px;margin-top:14px}
.ea-ejX{font-size:14px;color:#2A3639;margin-top:3px;font-family:'IBM Plex Mono',ui-monospace,monospace;line-height:1.5}

/* --- la sesión de trading --- */
.ea-estado{margin-top:12px;padding:11px;text-align:center;font-size:15px;letter-spacing:.16em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;border:2px solid}
.ea-estado.dentro{background:rgba(95,143,92,.28);border-color:#3E6B3C;color:#25451F}
.ea-estado.fuera{background:rgba(26,37,40,.07);border-color:rgba(26,37,40,.3);color:#3A4649}
.ea-leyenda{display:flex;gap:16px;flex-wrap:wrap;margin-top:6px;font-size:11.5px;color:var(--gris)}
.ea-leyenda span{display:flex;align-items:center;gap:6px}
.ea-lineaL{display:inline-block;width:20px;height:0;border-top:2px solid #1A2528}
.ea-lineaD{display:inline-block;width:20px;height:0;border-top:2px dashed var(--cobre)}
.ea-marcador{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:11px;margin-top:13px;
  border-top:1px dashed rgba(26,37,40,.35);padding-top:11px}
.ea-marcaV{font-size:19px;line-height:1.1;margin-top:2px}

/* --- los dos escenarios de la estructura --- */
.ea-escen{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:14px}
.ea-escenC{border:1px solid rgba(26,37,40,.28);padding:11px 13px}
.ea-escenC.bien{border-color:#3E6B3C;background:rgba(95,143,92,.1)}
.ea-escenC.mal{border-color:var(--rojo);background:rgba(190,75,59,.08)}
.ea-escenX{font-size:12.5px;color:#3A4649;margin-top:4px;line-height:1.45}
.ea-escenV{font-size:27px;line-height:1;margin:7px 0 2px;color:#1F2B2E}

/* --- pantallas de configuración --- */
.ea-opcion{border:1px solid var(--borde);background:var(--fieltro);padding:14px 16px;margin-bottom:10px;
  cursor:pointer;width:100%;text-align:left;font:inherit;color:var(--hueso);transition:border-color .15s}
.ea-opcion:hover{border-color:var(--cobre)}
.ea-opcion.on{border-color:var(--cobre);background:#16292E}
.ea-opcionN{font-size:19px;color:var(--papel);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.04em;font-weight:700}
.ea-opcionD{font-size:13.5px;color:var(--tenue);margin-top:6px;line-height:1.5}
.ea-opcionM{font-size:12px;color:var(--cobre);margin-top:6px}

/* --- cómo vives: el medidor del tren de vida --- */
.ea-vidaCab{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.ea-vidaN{font-size:21px;color:var(--papel);line-height:1.05}
.ea-vidaD{font-size:12.5px;color:var(--tenue);margin-top:5px;line-height:1.5}
.ea-vidaCifra{font-size:30px;color:var(--cobre);line-height:1;flex-shrink:0}
.ea-medidor{position:relative;height:8px;background:#0A171B;margin-top:12px;overflow:hidden}
.ea-medidorF{height:100%;background:var(--cobre);transition:width .5s ease}
.ea-medidorT{position:absolute;top:0;bottom:0;width:1px;background:rgba(207,201,186,.35)}
.ea-medidorE{display:flex;justify-content:space-between;gap:4px;margin-top:5px;font-size:9.5px;
  letter-spacing:.06em;color:var(--tenue);text-transform:uppercase;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-medidorE span.on{color:var(--cobre)}

/* --- etiquetas de consecuencia en cada compra --- */
.ea-etqs{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}
.ea-etq{font-size:10.5px;letter-spacing:.06em;padding:2px 7px;border:1px solid var(--borde);
  color:var(--tenue);white-space:nowrap}
.ea-etq.vida{border-color:var(--cobre);color:var(--cobre)}
.ea-etq.act{border-color:#3E6B3C;color:var(--verde)}
.ea-etq.con{border-color:#6B3A32;color:#C4756A}
.ea-etq.cost{border-color:#6C6255;color:#A99C86}

/* --- el camino del año --- */
.ea-curvaWrap{position:relative;margin:12px 0 4px;touch-action:pan-y}
/* sin overflow visible: era lo que dejaba salir las cifras del eje
   fuera del lienzo por la izquierda */
.ea-curva{width:100%;height:auto;display:block}
.ea-cHitoT{stroke:rgba(26,37,40,.30);stroke-width:1;stroke-dasharray:2 2}
.ea-cHitoN{font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-size:9px;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;fill:var(--gris)}
.ea-hitosL{display:flex;flex-direction:column;gap:3px;margin-top:9px;
  border-top:1px dotted rgba(26,37,40,.3);padding-top:8px}
.ea-hitoF{display:flex;align-items:baseline;gap:7px;font-size:12px;color:#3A4649}
.ea-hitoD{width:7px;height:7px;flex-shrink:0;transform:rotate(45deg);align-self:center}
.ea-hitoM{font-size:10.5px;color:var(--gris);text-transform:uppercase;letter-spacing:.08em;
  flex-shrink:0;width:24px}
.ea-hitoT{flex:1;line-height:1.35}
.ea-hitoC{font-size:11.5px;flex-shrink:0;font-variant-numeric:tabular-nums}
.ea-cRejilla{stroke:rgba(26,37,40,.10);stroke-width:1}
.ea-cPartida{stroke:rgba(26,37,40,.45);stroke-width:1;stroke-dasharray:3 3}
.ea-cCaida{fill:rgba(156,58,44,.09)}
.ea-cCruz{stroke:rgba(26,37,40,.35);stroke-width:1}
/* Los ejes viven fuera del SVG, así que su tamaño no depende de cuánto
   se escale el gráfico: se leen igual en un móvil y en un monitor. */
.ea-ejeY{position:absolute;left:0;text-align:right;transform:translateY(-50%);
  font-size:10.5px;color:var(--gris);font-variant-numeric:tabular-nums;
  pointer-events:none;padding-right:6px;line-height:1;white-space:nowrap}
.ea-ejeX{position:absolute;bottom:0;font-size:10px;color:var(--gris);letter-spacing:.06em;
  pointer-events:none;line-height:1;white-space:nowrap;text-transform:uppercase}
.ea-ejeX.ea-der{text-align:right}
.ea-curvaTip{position:absolute;top:-2px;transform:translateX(-50%);pointer-events:none;
  background:#1A2528;color:#E9E3D5;font-size:11.5px;padding:4px 8px;white-space:nowrap;
  font-variant-numeric:tabular-nums;display:flex;gap:7px;align-items:baseline;z-index:2}
.ea-curvaTipM{color:#9AA8A3;font-size:10px;letter-spacing:.1em;text-transform:uppercase}
.ea-curvaTipD{font-size:11px}
.ea-curvaPie{font-size:12.5px;color:#3A4649;line-height:1.5;margin-top:2px}

/* --- las dos constantes vitales, siempre a la vista --- */
.ea-signos{font-size:11.5px;margin-top:3px;display:flex;gap:12px;justify-content:flex-end;color:var(--tenue)}
.ea-signos .ojo{color:var(--cobre)}
.ea-signos .mal{color:var(--rojo)}

/* --- las señales de un negocio --- */
.ea-dealS{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0 6px}
.ea-sen{display:flex;flex-direction:column;gap:1px;border:1px solid var(--borde);padding:3px 8px;min-width:66px}
.ea-sen.bien{border-color:#3E6B3C}
.ea-sen.mal{border-color:#7A3A30}
.ea-senK{font-size:9px;letter-spacing:.1em;color:var(--tenue);text-transform:uppercase;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-senV{font-size:12.5px;color:var(--hueso)}
.ea-sen.bien .ea-senV{color:var(--verde)}
.ea-sen.mal .ea-senV{color:#C4756A}
.ea-deal{border:1px solid rgba(26,37,40,.28);padding:11px 13px;margin-bottom:9px;background:rgba(26,37,40,.03)}
.ea-deal.sel{border-color:var(--cobre);background:rgba(192,118,58,.09)}
.ea-deal.gana{border-color:#3E6B3C;background:rgba(95,143,92,.11)}
.ea-deal .ea-sen{border-color:rgba(26,37,40,.25)}
.ea-deal .ea-senK{color:var(--gris)}
.ea-deal .ea-senV{color:#2A3639}
.ea-deal .ea-sen.bien{border-color:#3E6B3C}
.ea-deal .ea-sen.bien .ea-senV{color:#2F5A2E}
.ea-deal .ea-sen.mal{border-color:var(--rojo)}
.ea-deal .ea-sen.mal .ea-senV{color:#9C3A2C}
.ea-dealR{font-size:12px;color:var(--gris);margin-top:6px;letter-spacing:.04em}

/* --- el inventario del balance final --- */
.ea-invCab,.ea-invF,.ea-invT{display:grid;grid-template-columns:1fr auto auto auto;gap:12px;align-items:baseline}
.ea-invCab{font-size:10px;letter-spacing:.14em;color:var(--tenue);padding-bottom:6px;
  border-bottom:1px solid var(--borde);margin-bottom:4px}
.ea-invF{font-size:13px;padding:6px 0;border-bottom:1px dotted var(--borde);color:var(--hueso)}
.ea-invN{line-height:1.35}
.ea-invP{display:block;font-size:10.5px;color:var(--tenue);text-align:right}
.ea-invT{font-size:13px;padding-top:9px;margin-top:4px;border-top:1px solid var(--borde);color:var(--papel)}
@media(max-width:520px){
  .ea-invCab{display:none}
  .ea-invF,.ea-invT{grid-template-columns:1fr auto;row-gap:2px}
}

/* --- el aviso de entrada --- */
.ea-aviso{display:flex;flex-direction:column;gap:2px;margin-top:22px;
  border-left:2px solid var(--borde);padding-left:16px}
.ea-avisoB{padding:11px 0;border-bottom:1px dotted var(--borde)}
.ea-avisoB:last-child{border-bottom:none}
.ea-avisoK{font-size:11.5px;letter-spacing:.16em;color:var(--cobre);margin-bottom:5px}
.ea-avisoB p{margin:0;font-size:14.5px;color:var(--hueso);line-height:1.6;max-width:62ch}
.ea-avisoB strong{color:var(--papel)}

/* --- botones secundarios sobre papel ---
   .ea-mini nació para el panel oscuro: texto hueso #CFC9BA sobre
   fieltro da 9,6:1. Dentro del memorando el fondo es papel y ese mismo
   color cae a 1,29:1, o sea invisible. Se corrige por contexto y no
   botón por botón, para que ningún minijuego futuro herede el problema. */
.ea-memo .ea-mini{border-color:rgba(26,37,40,.42);color:var(--tintaPapel)}
.ea-memo .ea-mini:hover:not(:disabled){border-color:var(--cobre);color:#111B1D;background:rgba(192,118,58,.13)}
.ea-memo .ea-mini:disabled{opacity:.45}

/* el de "explícame" es una invitación, no un control secundario:
   se lee a tamaño normal y sin versalitas apretadas */
.ea-explicame{font-size:12.5px;letter-spacing:.06em;text-transform:none;padding:8px 14px}

/* --- el titular: lo único que se lee sin abrir nada --- */
.ea-titular{border-top:2px solid var(--tintaPapel);border-bottom:1px dashed rgba(26,37,40,.35);
  padding:12px 0 13px;margin-top:14px}
.ea-panel .ea-titular{border-top-color:var(--borde);border-bottom-color:var(--borde)}
.ea-titularK{font-size:10.5px;letter-spacing:.2em;color:var(--gris)}
.ea-panel .ea-titularK{color:var(--tenue)}
.ea-titularV{font-size:31px;line-height:1.05;color:#111B1D;margin:3px 0 6px}
.ea-panel .ea-titularV{color:var(--papel)}
.ea-titularL{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:13px}
.ea-panel .ea-titularL{color:var(--tenue)}
.ea-titularA{font-size:15px;color:var(--cobre);margin-top:8px}

/* --- secciones plegables: cerradas enseñan su cifra --- */
.ea-plegs{margin-top:14px;border-top:1px dotted rgba(26,37,40,.32)}
.ea-panel .ea-plegs{border-top-color:var(--borde)}
.ea-pleg{border-bottom:1px dotted rgba(26,37,40,.32)}
.ea-panel .ea-pleg{border-bottom-color:var(--borde)}
.ea-plegB{display:grid;grid-template-columns:auto 1fr auto;align-items:baseline;gap:10px;width:100%;
  background:transparent;border:none;padding:11px 2px;cursor:pointer;text-align:left;font:inherit}
.ea-plegB:hover .ea-plegT{color:var(--cobre)}
.ea-plegF{font-size:15px;color:var(--gris);line-height:1;width:12px}
.ea-panel .ea-plegF{color:var(--tenue)}
.ea-plegT{font-size:12.5px;letter-spacing:.08em;color:#2A3639}
.ea-panel .ea-plegT{color:var(--hueso)}
.ea-plegR{font-size:13px;color:var(--gris);white-space:nowrap;font-variant-numeric:tabular-nums}
.ea-panel .ea-plegR{color:var(--tenue)}
.ea-plegC{padding:2px 0 15px;animation:ea-abre .16s ease-out}

/* --- los avisos de la guía --- */
.ea-guia{border:1px solid var(--cobre);background:rgba(192,118,58,.09);padding:12px 15px;margin-top:16px;
  display:grid;grid-template-columns:1fr auto;gap:4px 14px;align-items:center;animation:ea-abre .2s ease-out}
.ea-guiaK{grid-column:1;font-size:10px;letter-spacing:.22em;color:var(--cobre)}
.ea-guiaT{grid-column:1;font-size:16px;color:var(--papel);line-height:1.15}
.ea-guiaX{grid-column:1;font-size:13.5px;color:var(--hueso);line-height:1.5;max-width:70ch}
.ea-guiaB{grid-column:2;grid-row:1 / span 3;align-self:center;background:var(--cobre);border:none;color:#12201F;
  font:inherit;font-size:11px;letter-spacing:.14em;padding:9px 15px;cursor:pointer;text-transform:uppercase;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700;white-space:nowrap}
.ea-guiaB:hover{background:var(--papel)}
@media(max-width:560px){
  .ea-guia{grid-template-columns:1fr}
  .ea-guiaB{grid-column:1;grid-row:auto;justify-self:start;margin-top:8px}
}

/* --- el tablero, que ya no estorba --- */
.ea-grid.solo{grid-template-columns:1fr}
.ea-panelAb{animation:ea-abre .18s ease-out}
@keyframes ea-abre{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.ea-cerrar{display:block;width:100%;background:transparent;border:1px solid var(--borde);
  color:var(--tenue);font:inherit;font-size:10.5px;letter-spacing:.14em;padding:7px;margin-bottom:14px;
  cursor:pointer;text-transform:uppercase;font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-cerrar:hover{border-color:var(--cobre);color:var(--papel)}
.ea-tabs{margin-top:16px}

/* --- quién eres --- */
.ea-campoK{font-size:11px;letter-spacing:.2em;color:var(--tenue);display:block;margin-bottom:7px}
.ea-campo{width:100%;max-width:420px;background:var(--fieltro);border:1px solid var(--borde);
  color:var(--papel);font-size:19px;padding:11px 13px;letter-spacing:.04em}
.ea-campo::placeholder{color:var(--tenue);opacity:.7;letter-spacing:.02em}
.ea-campo:focus{outline:2px solid var(--cobre);outline-offset:2px;border-color:var(--cobre)}
.ea-generos{display:flex;gap:8px;flex-wrap:wrap}
.ea-generos .ea-mini.on{border-color:var(--cobre);color:var(--papel);background:#16292E}

/* --- volver atrás en la configuración --- */
.ea-atras{background:transparent;border:none;color:var(--tenue);font:inherit;font-size:11.5px;
  letter-spacing:.14em;padding:6px 0;margin-bottom:10px;cursor:pointer;text-transform:uppercase;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-atras:hover{color:var(--cobre)}
.ea-rastro{font-size:12px;color:var(--cobre);margin:6px 0 14px;letter-spacing:.04em}

/* --- glosario del modo aprendiz --- */
.ea-glos{background:rgba(62,107,60,.1);border-left:3px solid #3E6B3C;padding:10px 13px;margin-top:12px}
.ea-glosK{font-size:10.5px;letter-spacing:.2em;color:var(--gris);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-glosT{font-size:14.5px;color:#1F2B2E;margin-top:3px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;letter-spacing:.02em}
.ea-glosX{font-size:13.5px;color:#2A3639;margin-top:4px;line-height:1.5}

/* --- banderas rojas con explicación --- */
.ea-docK{font-size:10.5px;letter-spacing:.18em;color:var(--gris);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-checkX{display:block;font-size:12.5px;line-height:1.5;color:#3A4649;margin-top:6px;
  border-top:1px dotted rgba(26,37,40,.3);padding-top:6px}
.ea-checkR{display:block;font-size:10.5px;letter-spacing:.14em;color:var(--gris);margin-bottom:3px}
.ea-checkR.roja{color:#9C3A2C}

/* --- la ficha de familia --- */
.ea-fam{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.ea-famC{border:1px solid var(--borde);padding:4px 9px;font-size:11.5px;color:var(--tenue)}
`;

/* ---------- escala de la carrera ---------- */
const RANGOS = [
  { n: "Pasante", salario: 800, umbral: 8 },
  { n: "Analista", salario: 1700, umbral: 22 },
  { n: "Analista Senior", salario: 3100, umbral: 42 },
  { n: "Asociado", salario: 5800, umbral: 70 },
  { n: "Vicepresidente", salario: 11000, umbral: 108 },
  { n: "Director", salario: 20000, umbral: 155 },
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
    d: "Retorno alto en el promedio y caídas del 70% en el camino." },
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
  (Array.isArray(notis) ? notis : []).forEach((n) => {
    if (!n || !n.i) return;
    if (n.i[k] != null) { x += numero(n.i[k], 0); return; }
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
  catedra: {
    n: "La clase de las siete", tema: "Temario", dur: "60 s",
    i: "Un tema de finanzas explicado desde cero, con un ejemplo en números, y acto seguido dos o tres preguntas sobre lo que acabas de leer.",
    pasos: [
      "Lees la explicación del tema que te tocó. No hay prisa.",
      "Miras el ejemplo con números, que es donde suele caer la ficha.",
      "Pasas al examen y respondes sobre eso mismo, no sobre otra cosa.",
    ],
    gana: "Todas correctas es éxito. La mitad o más, resultado parcial.",
    ensena: "Es el único modo que enseña antes de examinar. Si hay un concepto que se te resiste, aquí es donde lo vas a entender.",
  },
  comite: {
    n: "El comité de inversión", tema: "Criterio de inversión", dur: "60 s",
    i: "Tres empresas sobre la mesa, capital para una. Los cinco datos que de verdad importan están a la vista y hay que elegir.",
    pasos: [
      "Lees los cinco indicadores de cada negocio: crecimiento, margen, mayor cliente, deuda y ventaja competitiva.",
      "Decides dónde va el capital. No hay pista ni segunda oportunidad.",
      "Se te muestra cuál era el mejor y por qué.",
    ],
    gana: "Acertar el mejor es éxito. El segundo, resultado parcial.",
    ensena: "Distinguir un negocio bueno de uno que solo parece bueno. El que más crece casi nunca es el mejor: lo es el que crece con margen y sin depender de un solo cliente.",
  },
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

/* ============================================================
   BLINDAJE · CAPA UNO: ARITMÉTICA QUE NO SE ROMPE
   Todo número que entra al juego pasa por aquí. Un NaN, un Infinity
   o un string donde debía ir un número no llegan nunca a la pantalla
   ni al estado guardado: se convierten en un valor razonable y el
   juego sigue. Es la diferencia entre "USD NaN" y una partida sana.
   ============================================================ */
const TOPE_PLATA = 1e12;

/* convierte cualquier cosa en un número finito, o devuelve el de respaldo */
const numero = (v, def = 0) => {
  const x = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(x) ? x : (Number.isFinite(def) ? def : 0);
};

/* ¿es esto un número utilizable? Ojo: numero(v, NaN) NO sirve para
   preguntarlo, porque cuando el valor por defecto no es finito devuelve
   cero, y cero sí es finito. Este predicado es el que hay que usar. */
const esNumero = (v) => {
  const x = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(x);
};

/* entero acotado: ni fracciones, ni índices fuera de rango */
const entero = (v, def, min, max) => {
  const x = Math.round(numero(v, def));
  if (!Number.isFinite(x)) return def;
  return Math.max(min, Math.min(max, x));
};

/* texto acotado: corta cadenas kilométricas y descarta lo que no sea texto */
const texto = (v, def = "", max = 160) => (typeof v === "string" ? v.slice(0, max) : def);

/* clamp que nunca propaga NaN: si le entra basura, devuelve el punto neutro del rango */
const clamp = (v, a, b) => {
  const x = numero(v, NaN);
  if (!Number.isFinite(x)) return Math.max(a, Math.min(b, 0));
  return Math.max(a, Math.min(b, x));
};

/* normal estándar acotada a cinco desviaciones.
   Los bucles tienen tope: si alguien sustituye Math.random por una
   función que siempre devuelve cero, esto no se cuelga. */
const gauss = () => {
  let u = 0, v = 0, vueltas = 0;
  while (u === 0 && vueltas++ < 12) u = numero(Math.random(), 0.5);
  while (v === 0 && vueltas++ < 24) v = numero(Math.random(), 0.5);
  if (u <= 0) u = 1e-9;
  const g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Number.isFinite(g) ? Math.max(-5, Math.min(5, g)) : 0;
};

/* formateo de plata a prueba de todo: sin NaN, sin infinitos, sin excepciones */
const fmt = (n) => {
  let x = numero(n, 0);
  if (x > TOPE_PLATA) x = TOPE_PLATA;
  if (x < -TOPE_PLATA) x = -TOPE_PLATA;
  try { return new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 }).format(Math.round(x)); }
  catch (e) { return String(Math.round(x)); }
};

/* índice al azar siempre dentro del arreglo, pase lo que pase con Math.random */
const indiceAzar = (largo) => {
  const i = Math.floor(numero(Math.random(), 0) * largo);
  return Number.isFinite(i) ? Math.min(largo - 1, Math.max(0, i)) : 0;
};
const elegirAzar = (arr) => (Array.isArray(arr) && arr.length ? arr[indiceAzar(arr.length)] : null);

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
.ea-spark{width:100%;height:auto;display:block;margin:10px 0 4px}
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
.ea-jnombre{font-size:26px;line-height:1.05;color:var(--tintaPapel);margin-bottom:9px}
.ea-jnombre span{display:block;font-size:10.5px;letter-spacing:.2em;color:var(--gris);margin-bottom:5px}
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
  { id: "fiscal", n: "Asesor fiscal propio", c: 6500, d: "Tus gastos de vida bajan 15% para siempre." },
  { id: "coach", n: "Coach ejecutivo", c: 8000, d: "El desgaste semestral baja de nueve a cinco puntos." },
  { id: "asistente", n: "Asistente ejecutivo", c: 9000, d: "Un punto de carrera y dos de energía cada semestre." },
  { id: "prensa", n: "Columna fija en un medio del sector", c: 9500, d: "Un punto de reputación cada semestre." },
  { id: "terminal", n: "Terminal de mercado en casa", c: 12000, d: "Medio punto extra de retorno cada semestre y más tiempo en los juegos contra reloj." },
  { id: "abogado", n: "Abogado personal", c: 13000, d: "Los golpes a tu reputación se amortiguan 40%." },
  { id: "broker", n: "Bróker institucional con mejor ejecución", c: 15000, d: "La volatilidad de tu portafolio baja un cuarto." },
  { id: "club", n: "Membresía del club de negocios", c: 17000, d: "Un punto de red cada semestre y mejor lectura en las negociaciones." },
  { id: "colchon", n: "Colchón de emergencia bien estructurado", c: 20000, d: "Los golpes negativos de mercado te pegan a la mitad." },
  { id: "mba", n: "MBA ejecutivo de fin de semana", c: 45000, d: "Ocho puntos de criterio de entrada y un punto de carrera cada semestre." },
];

/* ---------- los escalones del tren de vida ----------
   El índice de vida era un número suelto en una esquina y no significaba
   nada para quien lo leía. Estos son sus tramos, con nombre y con la
   consecuencia dicha en voz alta: vivir mejor sube la meta de
   independencia, porque la meta son 25 veces tu gasto. */
const NIVELES_VIDA = [
  { min: 0, n: "Austero", d: "Vives con lo justo y ahorras casi todo lo que puedes. Es el tren de vida que más rápido acumula." },
  { min: 1, n: "Sencillo", d: "Algún gusto, nada que te ate ni que pida mantenimiento serio." },
  { min: 4, n: "Cómodo", d: "Vives bien y el tren de vida ya empieza a notarse en la resta de fin de año." },
  { min: 9, n: "Holgado", d: "Difícil volver atrás sin que se sienta. Cada cosa pide su cuota anual." },
  { min: 15, n: "Alto", d: "Mantener lo que tienes es un gasto fijo considerable, pase lo que pase con tu sueldo." },
  { min: 23, n: "De otra liga", d: "Para que esto no te coma, el patrimonio tiene que ser enorme. Muy poca gente lo sostiene sin sueldo." },
];
const TOPE_VIDA = 28;   /* dónde se llena el medidor; el máximo teórico es 49 */
const nivelDeVida = (v) => {
  const x = clamp(numero(v, 0), 0, 999);
  let out = NIVELES_VIDA[0];
  NIVELES_VIDA.forEach((k) => { if (x >= k.min) out = k; });
  return out;
};

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
  { k: "Comercio", t: "Washington anuncia aranceles del 25% a socios comerciales clave", i: { acciones: -0.08, bonos: 0.01, cripto: -0.05, distressed: -0.03 } },
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
  { k: "Emergentes", t: "Cierra una reestructuración soberana con quita del 30%", i: { distressed: 0.26, bonos: 0.05 } },
  { k: "Emergentes", t: "El Fondo Monetario aprueba un programa para un país de la región", i: { bonos: 0.08, distressed: 0.12 } },
  { k: "Emergentes", t: "Elecciones en la región dan un giro promercado", i: { acciones: 0.09, bonos: 0.07, distressed: 0.08 } },
  { k: "Emergentes", t: "Un país vecino impone controles de capital de un día para otro", i: { bonos: -0.06, distressed: -0.08 } },
  { k: "Emergentes", t: "Un fondo soberano anuncia entrada masiva en mercados emergentes", i: { bonos: 0.07, distressed: 0.11, acciones: 0.03 } },
  { k: "Mercados", t: "Récord de utilidades en tecnología y el índice toca máximos históricos", i: { acciones: 0.11, cripto: 0.06 } },
  { k: "Mercados", t: "Corrección del 20% en tecnología por múltiplos insostenibles", i: { acciones: -0.15, cripto: -0.14 } },
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
  { q: "En un DCF a diez años, el valor terminal normalmente representa", o: ["la mayor parte del valor", "una porción menor", "exactamente la mitad"], c: 0, e: "Suele pesar entre 60 y 80% del total." },
  { q: "Para pasar de equity value a enterprise value", o: ["sumas la deuda neta", "restas la deuda neta", "sumas el capital de trabajo"], c: 0, e: "Enterprise value es lo que vale el negocio para todos los proveedores de capital." },
  { q: "Diversificar un portafolio reduce principalmente", o: ["el riesgo específico de cada emisor", "el riesgo de mercado", "el riesgo de tasas"], c: 0, e: "El riesgo sistemático no se diversifica, solo se cubre o se acepta." },
  { q: "El beta de una acción mide", o: ["su sensibilidad al movimiento del mercado", "su volatilidad absoluta", "su rentabilidad esperada"], c: 0, e: "Es la pendiente frente al índice, no una medida de calidad." },
  { q: "La deuda financiera neta sobre EBITDA sube de dos a cinco veces. Eso significa", o: ["un perfil crediticio más débil", "más capacidad de endeudamiento", "mejor cobertura de intereses"], c: 0, e: "Más años de EBITDA para pagar la deuda es exactamente lo que preocupa a un covenant.", pista: "Ese múltiplo dice cuántos años de ganancia operativa haría falta para pagar toda la deuda. Cuanto más alto, menos margen ante un mal año." },
  { q: "Una exportadora cobra en dólares y paga costos en moneda local. Si la moneda local se devalúa", o: ["su margen mejora", "su margen empeora", "su margen no cambia"], c: 0, e: "Ingresos duros contra costos que se abaratan en dólares." },
  { q: "Crecen inventarios y cuentas por cobrar más rápido que las ventas. Eso", o: ["consume caja", "genera caja", "es neutro en caja"], c: 0, e: "El capital de trabajo se financia, aunque no aparezca en el estado de resultados." },
  { q: "Entre dos proyectos mutuamente excluyentes con señales opuestas, manda", o: ["el valor presente neto", "la tasa interna de retorno", "el período de recuperación"], c: 0, e: "El VAN mide valor creado en unidades monetarias, la TIR engaña por escala y por reinversión." },
  { q: "En factoring sin recurso, el riesgo de impago del deudor", o: ["lo asume el factor", "lo asume el cedente", "se reparte por mitades"], c: 0, e: "Por eso la tasa es mayor y el análisis se hace sobre el deudor." },
  { q: "La prima de riesgo país en un mercado emergente normalmente", o: ["sube el costo de capital", "baja el costo de capital", "solo afecta la deuda"], c: 0, e: "Se suma al costo del equity y por esa vía castiga la valoración." },
  { q: "Comprar deuda distressed a treinta centavos es apostar a que", o: ["la recuperación será mayor a treinta", "la empresa evitará reestructurar", "las tasas van a bajar"], c: 0, e: "Todo el caso está en el valor de recuperación, no en el cupón." },
  { q: "Duración modificada de cinco y las tasas suben cien puntos básicos. El precio", o: ["cae alrededor de 5%", "cae alrededor de 1%", "sube alrededor de 5%"], c: 0, e: "Aproximación de primer orden, la convexidad corrige el resto." },
  { q: "Un múltiplo precio sobre utilidad alto suele reflejar", o: ["expectativa de crecimiento o menor riesgo", "que la acción está barata", "poca liquidez"], c: 0, e: "Alto no significa caro, significa que el mercado paga por algo que hay que verificar." },
  { q: "En un LBO, junto con el crecimiento del EBITDA, el motor principal de retorno es", o: ["el repago de deuda con caja", "la reducción de impuestos", "el aumento de capital de trabajo"], c: 0, e: "Cada dólar de deuda amortizada se convierte en equity para el fondo." },
  { q: "La curva de rendimientos se invierte. Históricamente se ha leído como señal de", o: ["desaceleración o recesión por delante", "expansión acelerada", "inflación controlada"], c: 0, e: "No es infalible, pero es de los indicadores con mejor historial." },
  { q: "Un aumento de capital sin derecho de preferencia afecta al accionista actual porque", o: ["diluye su participación", "reduce el valor de la empresa", "aumenta la deuda"], c: 0, e: "El pastel puede crecer, pero tu tajada se achica." },
  { q: "Un covenant exige EBITDA sobre intereses mayor a tres. Si las tasas suben", o: ["el covenant se aprieta", "el covenant se relaja", "el covenant no se mueve"], c: 0, e: "Sube el denominador y la empresa se acerca al incumplimiento sin haber vendido menos." },
  { q: "En un earn out, parte del precio se paga", o: ["contra resultados futuros del negocio", "por adelantado en efectivo", "siempre en acciones del comprador"], c: 0, e: "Sirve para cerrar la brecha entre lo que el vendedor cree que vale y lo que el comprador paga hoy." },
  { q: "El costo del capital propio comparado con el costo de la deuda de la misma empresa", o: ["es mayor", "es menor", "es igual"], c: 0, e: "El accionista cobra último, así que exige más." },
  { q: "Una empresa con flujo de caja libre negativo y utilidad contable positiva probablemente", o: ["está financiando capital de trabajo o inversión", "está inflando ingresos siempre", "no tiene deuda"], c: 0, e: "No es fraude por definición, pero es la primera pregunta que hay que hacer." },
  { q: "Regla del 4%: para retirar cuarenta mil al año necesitas un patrimonio de", o: ["un millón", "cuatrocientos mil", "cuatro millones"], c: 0, e: "Es una regla gruesa, pero sirve para saber cuánto te falta.", pista: "Al revés de como suena: si puedes retirar el 4% al año, el patrimonio que necesitas es 25 veces lo que quieres retirar." },
  { q: "Si tu portafolio cae 50%, para volver al punto de partida necesitas", o: ["subir 100%", "subir 50%", "subir 75%"], c: 0, e: "La asimetría de las pérdidas es la razón por la que se cuida la caída máxima." },
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
  { q: "Inviertes mil dólares al 10% anual. A los dos años tienes", o: ["1.210", "1.200", "1.100"], c: 0, e: "El segundo año la tasa se aplica también sobre los cien que ganaste. Eso es interés compuesto.", pista: "El interés se aplica sobre el saldo, no sobre lo que pusiste al principio: el segundo año ganas sobre mil cien, no sobre mil." },
  { q: "Un fondo de emergencia razonable equivale a", o: ["3 a 6 meses de tus gastos en algo líquido", "un año de tu sueldo bruto invertido en acciones", "lo que sobre a fin de mes"], c: 0, e: "Su función no es rendir, es evitar que vendas tus inversiones en el peor momento." },
  { q: "Tienes deuda de tarjeta al 40% anual y una inversión que rinde ocho. Lo primero es", o: ["pagar la tarjeta", "invertir y pagar el mínimo", "repartir mitad y mitad"], c: 0, e: "Cancelar deuda al cuarenta es un retorno garantizado del cuarenta. No existe inversión que compita con eso.", pista: "Pagar una deuda equivale a una inversión con rendimiento garantizado igual a su tasa. Compara ese número con lo que rinde la inversión." },
  { q: "La inflación del año fue 30% y tu sueldo subió diez. En términos reales", o: ["perdiste poder de compra", "ganaste 10%", "quedaste igual"], c: 0, e: "El sueldo nominal sube y el real baja. Es la trampa más común en economías con inflación alta." },
  { q: "Guardar el ahorro en efectivo bajo el colchón durante diez años de inflación alta", o: ["destruye casi todo su valor real", "es la opción más segura", "solo pierde si hay devaluación"], c: 0, e: "El efectivo parece no tener riesgo porque el número no cambia. El poder de compra sí." },
  { q: "Para alguien de veinte años, lo que más determina su patrimonio a los cincuenta es", o: ["cuánto ahorra y por cuántos años", "qué acciones elige", "cuándo entra al mercado"], c: 0, e: "El tiempo y la tasa de ahorro le ganan a la selección de activos en casi cualquier simulación." },
  { q: "La forma más efectiva de ahorrar de verdad es", o: ["separar el ahorro el día que cobras", "guardar lo que sobre a fin de mes", "esperar un bono grande"], c: 0, e: "Lo que sobra a fin de mes casi nunca sobra. Págate a ti primero y vive con el resto." },
  { q: "Poner todo tu ahorro en acciones de la empresa donde trabajas es riesgoso porque", o: ["tu sueldo y tu patrimonio dependen de lo mismo", "las acciones propias rinden menos", "no se pueden vender"], c: 0, e: "Si la empresa cae, pierdes el empleo y el ahorro el mismo día. Es la concentración más peligrosa que existe." },
  { q: "Que un fondo haya rendido mucho los últimos tres años", o: ["no dice casi nada sobre los próximos tres", "garantiza que seguirá rindiendo", "significa que su gestor es mejor"], c: 0, e: "La persistencia del buen desempeño es baja. Lo que sí persiste son las comisiones." },
  { q: "Financiar a cuotas un bien que pierde valor con los años", o: ["te deja pagando intereses por algo que vale menos cada mes", "es indiferente si la cuota te alcanza", "conviene si la tasa es fija"], c: 0, e: "Pagas intereses sobre un activo que se deprecia. La cuota alcanza y el patrimonio igual baja." },
  { q: "En términos financieros, un activo es", o: ["algo que produce flujo o puede venderse por más", "todo lo que compraste", "todo lo que tiene valor sentimental"], c: 0, e: "El carro que usas y mantienes no es un activo por más que costara mucho." },
  { q: "Un plazo fijo paga 12% y la inflación es veinte. Tu tasa real es", o: ["negativa, alrededor de menos ocho", "positiva, doce", "cero"], c: 0, e: "Ganar en nominal y perder en real es la forma más silenciosa de empobrecerse." },
  { q: "De estas cuatro cosas, la que puedes convertir en efectivo más rápido es", o: ["un fondo del mercado de dinero", "un apartamento", "una participación en un negocio familiar"], c: 0, e: "La liquidez es qué tan rápido vendes sin castigar el precio. Casi nadie la valora hasta que la necesita." },
  { q: "Si alguien te ofrece retornos altos sin riesgo y de forma garantizada", o: ["algo está mal en la promesa", "hay que entrar rápido", "conviene si es alguien conocido"], c: 0, e: "Retorno alto sin riesgo no existe. El riesgo está ahí, solo que no lo estás viendo." },
  { q: "Un seguro tiene sentido cuando", o: ["el evento es improbable pero te arruinaría", "el evento es frecuente y barato", "quieres invertir con ventaja"], c: 0, e: "Se asegura lo catastrófico, no lo molesto. Mezclar seguro con inversión suele salir caro." },
  { q: "Aportar la misma cantidad todos los meses sin importar el precio", o: ["te evita tener que adivinar el momento de entrar", "garantiza mejor retorno que entrar de golpe", "solo funciona en mercados alcistas"], c: 0, e: "No maximiza el retorno esperado, pero elimina la peor decisión: no entrar nunca por miedo." },
  { q: "Regla del setenta y dos: al 9% anual, tu capital se duplica en cerca de", o: ["ocho años", "doce años", "cinco años"], c: 0, e: "Setenta y dos entre la tasa da los años. Sirve para hacer la cuenta sin calculadora.", pista: "Divide 72 entre la tasa anual y obtienes los años que tarda el capital en duplicarse. Es una aproximación de cabeza, no una fórmula exacta." },
  { q: "El costo de oportunidad de dejar veinte mil parados en la cuenta corriente durante diez años es", o: ["todo lo que habrían rendido invertidos", "cero, porque no perdiste nada", "solo la inflación de un año"], c: 0, e: "Lo que no hiciste con el dinero también cuenta, aunque nunca aparezca en un estado de cuenta." },
  { q: "En un país con devaluación recurrente, ahorrar en moneda local a largo plazo", o: ["te expone a perder valor frente a la moneda dura", "es más seguro porque es tu moneda", "solo importa si viajas"], c: 0, e: "Tus gastos futuros grandes suelen estar indexados al dólar aunque los pagues en local." },
  { q: "Dos fondos con la misma estrategia, uno cobra 0,2% al año y el otro dos. En treinta años", o: ["la diferencia de comisión se come una parte enorme del capital final", "la diferencia es marginal", "gana el más caro por mejor gestión"], c: 0, e: "La comisión se compone igual que el retorno, solo que en tu contra y con total certeza." },
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
  { nv: 2, q: "El margen EBITDA de una empresa cae de 20 a 12% en un año. Lo primero que se revisa es", o: ["si subieron los costos o bajaron los precios", "el nivel de deuda", "la política de dividendos"], c: 0, e: "El margen es operativo. Si se rompe, el problema está en el negocio, no en el balance." },
  { nv: 2, q: "El flujo de caja operativo puede ser negativo con utilidad positiva porque", o: ["la utilidad se registra al vender, no al cobrar", "la contabilidad está mal hecha", "hay demasiada depreciación"], c: 0, e: "Vender no es cobrar. Muchas empresas quiebran creciendo." },
  { nv: 2, q: "Diversificar entre veinte acciones del mismo sector", o: ["reduce poco el riesgo, porque comparten el mismo motor", "elimina el riesgo específico", "es equivalente a un índice global"], c: 0, e: "Veinte bancos siguen siendo una apuesta a la banca." },
  { nv: 2, q: "Si el dólar se aprecia frente a tu moneda local, tus inversiones en dólares medidas en moneda local", o: ["ganan valor", "pierden valor", "no cambian"], c: 0, e: "El tipo de cambio es un componente de retorno, no un detalle contable." },
  { nv: 2, q: "Reinvertir los dividendos en lugar de gastarlos", o: ["acelera el efecto compuesto", "reduce el retorno por comisiones", "es indiferente en el largo plazo"], c: 0, e: "Buena parte del retorno histórico de la bolsa viene de dividendos reinvertidos, no del precio." },
  { nv: 2, q: "Una empresa con deuda a tasa fija en un entorno de inflación alta", o: ["se beneficia, porque paga con dinero que vale menos", "se perjudica siempre", "queda indiferente"], c: 0, e: "La inflación licua la deuda nominal. Por eso los acreedores exigen tasas más altas cuando la esperan." },
  { nv: 2, q: "Vender en pánico durante una caída del 30%", o: ["convierte una pérdida en papel en una pérdida definitiva", "protege el capital", "es lo que recomienda la teoría"], c: 0, e: "El mayor costo de una cartera agresiva no es su volatilidad, es lo que su dueño hace cuando la ve caer." },
  { nv: 2, q: "El valor libro de una empresa es", o: ["activos menos pasivos según contabilidad", "su valor de mercado", "el precio de sus acciones"], c: 0, e: "Es una foto contable, no una valoración. En negocios de servicios suele decir muy poco." },
  { nv: 2, q: "Un país sube su tasa de referencia bruscamente. En el corto plazo su moneda tiende a", o: ["fortalecerse", "debilitarse", "no reaccionar"], c: 0, e: "Tasas más altas atraen capital de corto plazo. El efecto sobre la economía real viene después." },

  /* nivel 3 */
  { nv: 3, q: "En el CAPM, el retorno exigido a una acción depende de", o: ["la tasa libre de riesgo, su beta y la prima de mercado", "su volatilidad total", "su crecimiento histórico"], c: 0, e: "Solo se paga por el riesgo que no puedes diversificar. El resto es tu problema." },
  { nv: 3, q: "El WACC se usa para descontar", o: ["el flujo de caja libre a la firma", "el flujo al accionista", "la utilidad neta"], c: 0, e: "Tasa y flujo tienen que hablar el mismo idioma: si el flujo es para todos, la tasa también." },
  { nv: 3, q: "En un DCF, bajar el crecimiento perpetuo de 3 a 2%", o: ["reduce el valor terminal de forma significativa", "casi no afecta", "sube el valor por prudencia"], c: 0, e: "El valor terminal es la parte más sensible y la más discutible de cualquier valoración." },
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
  { nv: 4, q: "El VaR al 99% a un día te dice", o: ["la pérdida que solo se supera uno de cada cien días", "la pérdida máxima posible", "la volatilidad anual"], c: 0, e: "No dice nada sobre cuánto pierdes ese día que sí se supera, y ahí está el problema." },
  { nv: 4, q: "El tracking error de un fondo mide", o: ["cuánto se desvía del índice que sigue", "su retorno absoluto", "su comisión"], c: 0, e: "Un fondo activo con tracking error mínimo cobra comisión activa por replicar el índice." },
  { nv: 4, q: "En una cascada de fondo, el catch-up del gestor sirve para", o: ["recuperar su 20% después del retorno preferente", "cobrar antes que los LP", "cubrir gastos operativos"], c: 0, e: "Sin catch-up, el preferente le regalaría al LP esa porción de las ganancias." },
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
  { nv: 5, q: "En una reestructuración de deuda corporativa, un intercambio con quita del 40%", o: ["reconoce que el negocio no soporta la deuda original", "mejora la calificación de inmediato", "no afecta a los accionistas"], c: 0, e: "Si el equity sobrevive intacto a una quita, alguien negoció mal, y casi nunca es el acreedor garantizado." },
  { nv: 5, q: "El costo de capital de un proyecto en un país con riesgo soberano alto debería reflejar", o: ["riesgo país, moneda y riesgo específico del proyecto por separado", "solo la tasa local", "el mismo WACC de la matriz"], c: 0, e: "Sumar todo en un número redondo es lo que hace que proyectos malos parezcan aprobables." },
  { nv: 5, q: "Al valorar una empresa con opciones sobre acciones a empleados, el efecto correcto es", o: ["tratarlas como dilución futura y descontarla hoy", "ignorarlas hasta que se ejerzan", "sumarlas al efectivo"], c: 0, e: "Es una transferencia real de valor del accionista al empleado, y muchas veces la única forma de que el flujo se sostenga." },
  { nv: 5, q: "Un fondo que rinde 1% mensual con volatilidad casi nula durante años", o: ["merece revisar cómo valora y quién custodia los activos", "es un gestor excepcional", "está tomando poco riesgo"], c: 0, e: "La ausencia de volatilidad no existe en activos con riesgo. Cuando aparece, suele estar en la contabilidad." },
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
  { t: "Fusión anunciada con prima del 40%", a: "comprar" },
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
  { q: "El carried interest estándar de un fondo es", o: ["20% sobre un retorno preferente", "20% sobre todo el capital", "2% anual"], c: 0, e: "El 2% es la comisión de administración, el veinte es la participación en las ganancias." },
  { q: "El retorno preferente típico que se paga a los LP antes del carry ronda", o: ["8% anual", "20% anual", "2% anual"], c: 0, e: "Debajo de ese umbral el gestor no participa de las ganancias." },
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
  { q: "Una comisión anual de 2% durante treinta años", o: ["se lleva una parte muy grande del capital final", "es irrelevante a largo plazo", "solo importa si el mercado cae"], c: 0, e: "Compuesta sobre tres décadas puede costar cerca de la mitad del patrimonio acumulado.", pista: "La comisión se cobra cada año sobre el saldo completo, así que se compone igual que el rendimiento, solo que en tu contra." },
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
/* ============================================================
   GLOSARIO
   Cada término que el juego usa, explicado como se lo explicarías
   a alguien que nunca ha pisado un banco. En modo aprendiz aparece
   solo, antes de que la palabra se use por primera vez.
   ============================================================ */
const GLOSARIO = {
  accion: { n: "Acción", x: "Un pedacito de la propiedad de una empresa. Si tienes una acción de una panadería, eres dueño de una parte mínima de esa panadería: te toca parte de lo que gane y pierdes si le va mal." },
  bono: { n: "Bono", x: "Un préstamo que tú le haces a un gobierno o a una empresa. Ellos te devuelven el dinero en una fecha pactada y mientras tanto te pagan intereses. Es más aburrido que una acción y por eso mismo suele ser más seguro." },
  cartera: { n: "Cartera o portafolio", x: "El conjunto de todo lo que tienes invertido. No es un producto que se compra: es simplemente la suma de tus cosas y cómo están repartidas." },
  interesCompuesto: { n: "Interés compuesto", x: "Cuando lo que ganas empieza a generar ganancias por su cuenta. Ganas sobre tu dinero, y al año siguiente ganas sobre tu dinero más lo que ganaste. Al principio es imperceptible; a los veinte años es la mayor parte de tu patrimonio." },
  inflacion: { n: "Inflación", x: "Que las cosas cuesten más cada año. Si tu dinero está quieto y la inflación es 5%, dentro de un año compras 5% menos con lo mismo. Guardar efectivo no es neutral: es perder despacio." },
  volatilidad: { n: "Volatilidad", x: "Cuánto se mueve el precio de algo. Alta volatilidad significa años de subir mucho y años de caer mucho. No es lo mismo que riesgo de perderlo todo, pero se siente parecido cuando estás mirando." },
  diversificar: { n: "Diversificar", x: "No poner todo en el mismo sitio. La gracia es que si las cosas que tienes no suben y bajan al mismo tiempo, el conjunto se mueve menos que cada parte por separado." },
  liquidez: { n: "Liquidez", x: "Qué tan rápido puedes convertir algo en dinero sin malbaratar. El efectivo es líquido, un apartamento no. Un activo excelente pero ilíquido no te sirve si mañana necesitas pagar algo." },
  riesgo: { n: "Riesgo", x: "La posibilidad de que el resultado no sea el que esperabas. En finanzas casi nunca se elimina, se cambia de forma: menos riesgo de perder suele venir con menos posibilidad de ganar." },
  rendimiento: { n: "Rendimiento o retorno", x: "Lo que ganaste, en porcentaje de lo que pusiste. Si pusiste 100 y ahora tienes 107, tu rendimiento fue 7%." },
  comision: { n: "Comisión", x: "Lo que cobra el intermediario por moverte el dinero. Parece pequeña porque se expresa en porcentajes chiquitos, pero se cobra todos los años y sobre todo tu dinero." },
  fondoIndexado: { n: "Fondo indexado", x: "Una canasta que compra un poco de todas las empresas de un mercado. No intenta escoger las buenas: se las lleva todas. Cobra muy poco y por eso, a treinta años, le gana a la mayoría de los que sí intentan escoger." },
  fondoEmergencia: { n: "Fondo de emergencia", x: "Dinero aburrido, en efectivo, para cubrir entre 3 y 6 meses de tus gastos. No es una inversión, es un seguro: existe para que un imprevisto no te obligue a vender tus inversiones en el peor momento." },
  patrimonio: { n: "Patrimonio", x: "Todo lo que tienes menos todo lo que debes. Es el número que de verdad importa, y no tiene nada que ver con cuánto ganas al mes." },
  apalancamiento: { n: "Apalancamiento", x: "Invertir con dinero prestado. Multiplica lo que ganas y multiplica igual lo que pierdes. Es la herramienta que más fortunas ha hecho y más ha deshecho." },
  ebitda: { n: "EBITDA", x: "Lo que gana una empresa por operar, antes de intereses, impuestos y depreciación. Sirve para comparar empresas entre sí sin que estorbe cómo están financiadas." },
  beta: { n: "Beta", x: "Cuánto se mueve algo cuando se mueve el mercado entero. Beta uno significa que va al mismo ritmo. Beta cero significa que le da igual lo que haga el mercado." },
  rebalanceo: { n: "Rebalanceo", x: "Volver a poner tu cartera en las proporciones que decidiste. Obliga a vender un poco de lo que subió y comprar de lo que bajó, que es exactamente lo contrario de lo que pide el estómago." },
  fcl: { n: "Flujo de caja libre", x: "El dinero que de verdad le sobra a la empresa después de operar y de invertir en mantenerse en pie. Una empresa puede declarar utilidad contable y quemar caja al mismo tiempo: la utilidad es una opinión, la caja es un hecho." },
  wacc: { n: "Costo de capital", x: "Lo que le cuesta a una empresa el dinero que usa, mezclando deuda y capital propio. La deuda sale más barata porque cobra primero y sus intereses desgravan; el capital propio es el más caro porque cobra último y sin garantía." },
  opcion: { n: "Opción", x: "El derecho, no la obligación, de comprar o vender algo a un precio fijado. Se paga una prima por ese derecho. Gana valor cuando el precio se mueve a favor y también cuando hay más incertidumbre." },
  cobertura: { n: "Cobertura", x: "Montar una posición que gane justo cuando tu negocio pierde, para que el conjunto se mueva menos. No busca ganar dinero: busca que un movimiento de precios o de moneda no te descoloque." },
  activo: { n: "Activo", x: "Cualquier cosa que tengas y que valga algo: dinero, una acción, un local, una máquina. La prueba de fuego es si alguien te lo compraría. Un gasto ya hecho no es un activo por mucho que costara." },
  costoOportunidad: { n: "Costo de oportunidad", x: "Lo que dejas de ganar por elegir una cosa en vez de otra. Tener dinero parado en la cuenta no es gratis: cuesta exactamente lo que habría rendido en otro sitio." },
  seguro: { n: "Seguro", x: "Pagar una cantidad pequeña y segura para no tener que pagar una enorme e improbable. Tiene sentido cuando el golpe que cubre te arruinaría; no lo tiene para cosas que podrías pagar de tu bolsillo." },
  multiplo: { n: "Múltiplo de valoración", x: "Cuántas veces sus ganancias vale una empresa. Un múltiplo alto significa que el mercado espera crecimiento; también significa que estás pagando por un futuro que aún no ocurrió." },
  distressed: { n: "Deuda distressed", x: "Deuda de empresas en problemas, que se compra muy por debajo de su valor nominal. Se apuesta a que la empresa se recupere o a que al liquidarla quede más de lo que pagaste." },
  earnout: { n: "Earn out", x: "Parte del precio de una compra que solo se paga si la empresa cumple ciertos resultados después. Sirve cuando comprador y vendedor no se ponen de acuerdo en cuánto vale el futuro." },
  capitalTrabajo: { n: "Capital de trabajo", x: "El dinero atrapado en el día a día: inventario en el almacén y facturas que aún no te han pagado. Si crece más rápido que las ventas, el negocio consume caja aunque parezca que gana." },
  dilucion: { n: "Dilución", x: "Cuando una empresa emite acciones nuevas, tu porcentaje de la empresa baja aunque tengas las mismas acciones. Te quedas con una tajada menor de un pastel que ojalá sea mayor." },
  tir: { n: "Tasa interna de retorno", x: "El rendimiento anualizado de una inversión contando cuándo entra y sale cada peso. A diferencia del múltiplo, castiga tardar: duplicar en dos años y en diez dan el mismo múltiplo y TIR muy distintas." },
  encaje: { n: "Encaje legal", x: "La parte de los depósitos que un banco no puede prestar y tiene que dejar inmovilizada en el banco central. Sirve de colchón si mucha gente retira a la vez, y de palanca para abrir o cerrar el crédito de todo un país." },
  tasaRectora: { n: "Tasa de referencia", x: "El precio al que se prestan los bancos entre ellos, que fija el banco central. Cuando sube, todo el crédito del país se encarece; cuando baja, se abarata. Es el dial principal de la política monetaria." },
  cartaCredito: { n: "Carta de crédito", x: "Un banco se pone en medio de dos empresas que no se conocen: promete pagarle al vendedor, pero solo contra documentos que prueben que embarcó lo pactado. Resuelve que ninguno quiera ser el primero en cumplir." },
  devaluacion: { n: "Devaluación", x: "Que tu moneda valga menos frente a otra. Todo lo importado sube y tus ahorros locales compran menos, aunque el número de tu cuenta no se haya movido. Para quien cobra en local, es un recorte de sueldo que nadie anuncia." },
  tasaEfectiva: { n: "Tasa efectiva", x: "Lo que de verdad te cuesta un préstamo contando comisiones, seguros y el efecto de componer. Siempre es mayor que la tasa nominal que anuncian, y es la única comparable entre dos ofertas." },
  intermediacion: { n: "Margen de intermediación", x: "La diferencia entre lo que un banco te paga por tus ahorros y lo que cobra por prestar ese mismo dinero. Es su negocio principal y la razón por la que la cuenta de ahorro rinde tan poco." },
  regla4: { n: "La regla del 4%", x: "Una referencia: si retiras cada año el 4% de tu patrimonio, históricamente el dinero aguanta unos treinta años. Por eso se dice que necesitas 25 veces tu gasto anual." },
};

/* ============================================================
   CÁTEDRA · el temario con clase y examen
   Cada tema trae una explicación en lenguaje llano, un ejemplo con
   números y preguntas propias. El minijuego "Cátedra" toma un tema
   al azar del nivel que te toca, te lo explica y te examina de
   inmediato. Es lo que evita que el juego pregunte cosas que nunca
   se molestó en enseñar.
   ============================================================ */
const TEMAS = [
  /* ---------------- nivel 1 · fundamentos ---------------- */
  {
    id: "invertir", nv: 1, n: "Qué significa invertir",
    x: "Invertir es entregarle tu dinero a algo que trabaja mientras tú no estás: una empresa, un gobierno, un inmueble. A cambio de ese uso, esperas recibir más de lo que pusiste. No es apostar, porque apostar es un juego de suma cero donde alguien gana lo que otro pierde; invertir es participar de algo que produce valor nuevo.",
    ej: "Le prestas 1.000 a una panadería que abre un local nuevo. El local vende, la panadería te devuelve 1.080. Los 80 no se los quitaste a nadie: los produjo el pan que se vendió.",
    q: [
      { q: "¿Cuál es la diferencia de fondo entre invertir y apostar?", ops: ["Invertir participa de algo que produce valor; apostar solo reparte el dinero que ya existe", "Invertir siempre gana y apostar siempre pierde", "Invertir es legal y apostar no", "No hay diferencia real, solo el nombre"], correcta: "Invertir participa de algo que produce valor; apostar solo reparte el dinero que ya existe", e: "En la apuesta, lo que tú ganas alguien lo perdió. En la inversión productiva puede crecer el total, y por eso a largo plazo hay un retorno esperado positivo." },
      { q: "Si una inversión te promete rendimiento alto y garantizado, ¿qué es lo más sensato pensar?", ops: ["Que algo no cuadra: rendimiento alto y garantía no van juntos", "Que hay que entrar rápido antes de que se acabe", "Que el que la ofrece encontró una fórmula mejor", "Que es una buena forma de empezar por ser segura"], correcta: "Que algo no cuadra: rendimiento alto y garantía no van juntos", e: "Es la señal más confiable de una estafa. Si de verdad existiera rendimiento alto sin riesgo, el dinero institucional lo habría absorbido antes de que llegara a ti." },
      { q: "Tienes el dinero quieto en la cuenta y no pierdes nada nominalmente. ¿Estás sin riesgo?", ops: ["No: la inflación te quita poder de compra todos los años", "Sí, mientras el número no baje estás protegido", "Sí, porque el banco garantiza el saldo", "Solo hay riesgo si inviertes"], correcta: "No: la inflación te quita poder de compra todos los años", e: "El efectivo tiene el riesgo más silencioso que existe. El número no baja, pero lo que compras con él sí." },
    ],
  },
  {
    id: "compuesto", nv: 1, n: "El interés compuesto",
    x: "Si ganas 8% sobre 100, tienes 108. Al año siguiente ganas 8% sobre 108, no sobre 100. Esa diferencia mínima, repetida treinta veces, es lo que separa a alguien que terminó con dinero de alguien que no. Lo importante no es la tasa: es el número de años que dejas que corra.",
    ej: "1.000 al 8% anual: a los 10 años son 2.159, a los 20 son 4.661, a los 30 son 10.063. Los primeros diez años aportaron 1.159; los últimos diez aportaron 5.400.",
    q: [
      { q: "¿Cuál de estos dos factores pesa más en el resultado final a treinta años?", ops: ["Los años que el dinero lleva invertido", "Acertar el mejor momento para entrar", "La cantidad de operaciones que hagas", "El nombre del fondo que elijas"], correcta: "Los años que el dinero lleva invertido", e: "El tiempo entra al cálculo como exponente y la tasa como base. Por eso empezar diez años antes suele ganarle a rendir dos puntos más." },
      { q: "Alguien invierte 200 al mes desde los 25 y para a los 35. Otro invierte lo mismo desde los 35 hasta los 65. ¿Quién suele terminar con más a los 65?", ops: ["Depende de la tasa, pero el primero muchas veces gana aunque puso mucho menos", "Siempre el segundo, porque puso tres veces más dinero", "Siempre empatan", "El primero, con seguridad, en cualquier escenario"], correcta: "Depende de la tasa, pero el primero muchas veces gana aunque puso mucho menos", e: "Es el ejemplo clásico del coste de esperar. Con tasas altas el que empezó antes gana; con tasas bajas no siempre. Lo que nunca cambia es que sus aportes valieron mucho más por unidad." },
      { q: "Una pérdida del 50%, ¿con qué ganancia se recupera?", ops: ["100%", "50%", "75%", "Depende del activo"], correcta: "100%", e: "De 100 caes a 50; para volver a 100 necesitas duplicar. Esta asimetría es la razón de fondo por la que evitar caídas grandes importa más que capturar subidas grandes." },
    ],
  },
  {
    id: "inflacion", nv: 1, n: "La inflación",
    x: "La inflación es la subida general de los precios. Si es 5%, lo que hoy cuesta 100 el año que viene cuesta 105. Tu sueldo y tus ahorros valen en función de lo que compran, no de la cifra que dicen. Por eso el rendimiento que importa es el real: lo que ganaste menos la inflación.",
    ej: "Ganaste 3% en el año y la inflación fue seis. Tu número subió, tu poder de compra bajó 3%. Ganaste nominalmente y perdiste realmente.",
    q: [
      { q: "Tu inversión rindió 4% y la inflación fue siete. ¿Qué pasó de verdad?", ops: ["Perdiste alrededor de 3% de poder de compra", "Ganaste 4%", "Quedaste igual", "Ganaste 11%"], correcta: "Perdiste alrededor de 3% de poder de compra", e: "El rendimiento real es lo nominal menos la inflación. Es el único que se puede comer." },
      { q: "¿A quién beneficia la inflación alta e inesperada?", ops: ["Al que debe dinero a tasa fija", "Al que tiene todo en efectivo", "Al que prestó dinero a tasa fija", "A nadie, perjudica igual a todos"], correcta: "Al que debe dinero a tasa fija", e: "La deuda se devuelve en dinero que vale menos. Por eso la inflación transfiere riqueza de acreedores a deudores, y por eso los países muy endeudados rara vez la odian tanto como dicen." },
      { q: "En un país con inflación alta y persistente, ¿qué error es más caro?", ops: ["Mantener el grueso del patrimonio en moneda local sin remunerar", "Tener una parte en efectivo para emergencias", "Invertir en activos reales", "Diversificar por monedas"], correcta: "Mantener el grueso del patrimonio en moneda local sin remunerar", e: "En inflación alta el efectivo quieto es el activo que más rápido se destruye. Tener un colchón está bien; tener el patrimonio ahí, no." },
    ],
  },
  {
    id: "emergencia", nv: 1, n: "El fondo de emergencia",
    x: "Antes de invertir un solo peso hay que tener dinero aburrido y disponible: entre 3 y 6 meses de tus gastos, en efectivo o en algo que se convierta en efectivo mañana. No está ahí para rendir. Está ahí para que cuando se dañe el carro, se caiga un cliente o te enfermes, no tengas que vender tus inversiones justo cuando están abajo.",
    ej: "Gastas 1.200 al mes. Tu fondo de emergencia son entre 3.600 y 7.200. Rinde poco y eso está bien: su trabajo es estar, no crecer.",
    q: [
      { q: "¿Cuál es la función real del fondo de emergencia?", ops: ["Evitar que vendas tus inversiones en el peor momento", "Maximizar el rendimiento de tu efectivo", "Sustituir a un seguro", "Aprovechar caídas del mercado"], correcta: "Evitar que vendas tus inversiones en el peor momento", e: "Es un instrumento de comportamiento, no de rentabilidad. Su valor aparece exactamente el año en que todo lo demás está en rojo." },
      { q: "Tienes deudas de tarjeta al 60% anual y estás armando el fondo de emergencia. ¿Qué conviene?", ops: ["Un fondo mínimo y atacar la tarjeta: ninguna inversión rinde 60% seguro", "Ignorar la tarjeta hasta tener seis meses de gastos", "Invertir en acciones para ganarle a la tarjeta", "Pagar solo el mínimo y ahorrar el resto"], correcta: "Un fondo mínimo y atacar la tarjeta: ninguna inversión rinde 60% seguro", e: "Pagar una deuda al sesenta es un rendimiento garantizado del sesenta. No existe inversión legal que compita con eso." },
    ],
  },
  {
    id: "accionbono", nv: 1, n: "Acciones y bonos",
    x: "Una acción te hace socio: te toca lo que sobre después de pagarle a todo el mundo, que puede ser mucho o nada. Un bono te hace acreedor: te deben una cantidad fija y te la pagan antes que a los socios, pero por más que le vaya bien a la empresa a ti te siguen pagando lo mismo. Socio cobra último y sin techo; acreedor cobra primero y con techo.",
    ej: "La empresa gana un año histórico: el accionista ve subir su acción, el bonista cobra su mismo cupón. La empresa quiebra: el bonista recupera algo del remate, el accionista suele quedarse en cero.",
    q: [
      { q: "Si una empresa quiebra, ¿quién cobra primero?", ops: ["Los bonistas, antes que los accionistas", "Los accionistas, por ser dueños", "Los dos a la vez y en partes iguales", "Depende de quién invirtió antes"], correcta: "Los bonistas, antes que los accionistas", e: "Es el orden de prelación. El accionista es residual: se queda con lo que sobre, y en una quiebra normalmente no sobra." },
      { q: "¿Por qué las acciones rinden más que los bonos a largo plazo?", ops: ["Porque cargan con más riesgo y el mercado paga por asumirlo", "Porque las empresas son mejores que los gobiernos", "Porque los bonos son una estafa", "Porque las acciones no pueden bajar a largo plazo"], correcta: "Porque cargan con más riesgo y el mercado paga por asumirlo", e: "La prima de riesgo es una compensación, no un regalo. Y compensación esperada no es compensación garantizada: hay décadas en las que no aparece." },
      { q: "Un bono de un gobierno con problemas paga 18%. ¿Qué te está diciendo esa tasa?", ops: ["Que el mercado ve una probabilidad real de que no pague", "Que es una oportunidad que otros no vieron", "Que ese gobierno es generoso", "Que los bonos siempre pagan más que las acciones"], correcta: "Que el mercado ve una probabilidad real de que no pague", e: "La tasa alta es el precio del miedo, no un descuento. Cuando algo rinde mucho más que lo comparable, el rendimiento extra es la factura del riesgo." },
    ],
  },
  {
    id: "diversificacion", nv: 1, n: "Diversificar de verdad",
    x: "Diversificar no es tener muchas cosas: es tener cosas que no se caigan juntas. Diez acciones de bancos del mismo país son una sola apuesta repartida en diez papeles. Lo que reduce el riesgo es que los activos reaccionen distinto al mismo golpe, y eso es lo único que la teoría financiera considera gratis.",
    ej: "Cinco activos con la misma volatilidad, pero que se mueven independientes, forman una cartera con menos de la mitad de la volatilidad de cada uno. Si se mueven todos igual, la cartera tiene exactamente la misma volatilidad que uno solo.",
    q: [
      { q: "Tienes acciones de seis bancos distintos del mismo país. ¿Estás diversificado?", ops: ["No, es una sola apuesta al sector bancario de ese país repartida en seis papeles", "Sí, seis empresas distintas son diversificación", "Sí, siempre que sean de distinto tamaño", "Depende de cuánto pusiste en cada una"], correcta: "No, es una sola apuesta al sector bancario de ese país repartida en seis papeles", e: "Lo que importa es la correlación, no el número de nombres. Si una crisis bancaria los golpea a todos a la vez, tener seis no te salvó de nada." },
      { q: "¿Qué le pasa a la correlación entre activos durante una crisis fuerte?", ops: ["Tiende a subir: cosas que parecían independientes caen juntas", "Baja, y por eso la diversificación funciona mejor en crisis", "Se mantiene igual", "Desaparece"], correcta: "Tiende a subir: cosas que parecían independientes caen juntas", e: "Es la ironía cruel del asunto: la diversificación se debilita justo cuando más la necesitas. No la vuelve inútil, pero explica por qué las carteras 'bien repartidas' igual sufren." },
    ],
  },
  {
    id: "presupuesto", nv: 1, n: "Ingreso, gasto y la resta",
    x: "El patrimonio no lo construye lo que ganas: lo construye la diferencia entre lo que ganas y lo que gastas. Alguien con un sueldo enorme y un tren de vida a la altura no acumula nada. La tasa de ahorro, el porcentaje de lo que entra que no se gasta, predice tu futuro financiero mucho mejor que tu sueldo.",
    ej: "Ganas 5.000 y gastas 4.800: ahorras 4% y necesitas décadas. Ganas 3.000 y gastas 2.100: ahorras 30% y llegas antes que el primero.",
    q: [
      { q: "¿Qué predice mejor tu patrimonio a veinte años?", ops: ["Tu tasa de ahorro", "Tu sueldo bruto", "El sector en el que trabajas", "El país donde vives"], correcta: "Tu tasa de ahorro", e: "El sueldo abre la posibilidad; la tasa de ahorro la ejecuta. Es la razón por la que hay médicos quebrados y maestros con patrimonio." },
      { q: "Te suben el sueldo 30% y subes tu tren de vida 30%. ¿Qué pasó con tu independencia financiera?", ops: ["Se alejó: ahora necesitas un patrimonio mayor para cubrir tu vida", "Se acercó, porque ganas más", "No cambió", "Se acercó solo si invertiste el aumento"], correcta: "Se alejó: ahora necesitas un patrimonio mayor para cubrir tu vida", e: "Se llama inflación del estilo de vida. Como la meta es 25 veces tu gasto anual, subir el gasto mueve la meta hacia adelante más rápido de lo que ahorras." },
    ],
  },
  {
    id: "deuda", nv: 1, n: "Deuda que suma y deuda que resta",
    x: "La deuda no es buena ni mala por sí sola: depende de qué compra y a qué tasa. Deuda barata que compra algo que produce ingreso o se aprecia puede tener sentido. Deuda cara que compra consumo que pierde valor es la forma más rápida y silenciosa de destruir patrimonio.",
    ej: "Hipoteca al 7% sobre un inmueble que renta seis y se aprecia tres: el conjunto suma. Tarjeta al 60% sobre un viaje: el viaje ya pasó y la deuda sigue creciendo.",
    q: [
      { q: "¿Qué hace que una deuda sea 'buena'?", ops: ["Que su tasa sea menor que el retorno de lo que compra", "Que sea de un banco grande", "Que el plazo sea largo", "Que la cuota quepa en tu sueldo"], correcta: "Que su tasa sea menor que el retorno de lo que compra", e: "Que la cuota quepa es una condición para no quebrar, no una razón para endeudarse. La comparación relevante es tasa contra retorno del activo." },
      { q: "Pagar una tarjeta que cobra 40% anual equivale a...", ops: ["Una inversión con rendimiento garantizado del 40%", "Un gasto sin retorno", "Una inversión de riesgo medio", "Nada, es solo saldar una cuenta"], correcta: "Una inversión con rendimiento garantizado del 40%", e: "Es el mejor rendimiento ajustado por riesgo al que la mayoría de la gente tiene acceso en su vida, y casi nadie lo ve así." },
    ],
  },

  /* ---------------- macroeconomía y banca ---------------- */
  {
    id: "comobanco", nv: 1, n: "De dónde sale el dinero de un banco",
    x: "Un banco no guarda tu dinero en una caja fuerte esperando a que vuelvas. Lo presta. Toma los depósitos de mucha gente, presta la mayor parte y se queda con la diferencia entre lo que paga por tus ahorros y lo que cobra por los préstamos. Por eso puede pagarte poco y cobrar mucho: ese diferencial es su negocio entero.",
    ej: "Te paga 2% por tu depósito y presta ese mismo dinero al 14. Los 12 puntos de diferencia son su margen, antes de gastos y de los préstamos que no le devuelvan.",
    q: [
      { q: "¿Qué hace un banco con el dinero que depositas?", ops: ["Prestarlo a otros y quedarse con la diferencia de tasa", "Guardarlo íntegro hasta que lo pidas", "Invertirlo todo en bolsa", "Enviarlo al banco central"], correcta: "Prestarlo a otros y quedarse con la diferencia de tasa", e: "Se llama intermediación financiera. Si todos los depositantes pidieran su dinero el mismo día, ningún banco del mundo podría pagarlo: por eso existe la regulación." },
      { q: "El diferencial entre lo que el banco te paga y lo que cobra se llama", ops: ["Margen de intermediación", "Comisión de apertura", "Encaje", "Prima de riesgo"], correcta: "Margen de intermediación", e: "Es la principal fuente de ingresos de la banca tradicional, y la razón por la que la cuenta de ahorro rinde tan poco." },
    ],
  },
  {
    id: "encaje", nv: 2, n: "El encaje legal",
    x: "El encaje es la parte de los depósitos que un banco está obligado a NO prestar: se queda inmovilizada en el banco central. Sirve para dos cosas: que quede algo si mucha gente retira a la vez, y para que el banco central pueda abrir o cerrar el grifo del crédito de todo un país cambiando un solo número.",
    ej: "Con encaje del 20%, de cada 100 que depositas el banco solo puede prestar 80. Si el banco central lo sube al 30, ese banco tiene que recortar crédito de golpe, aunque no haya cambiado nada más.",
    q: [
      { q: "Si el banco central sube el encaje legal, ¿qué pasa con el crédito?", ops: ["Se encarece y se reduce: hay menos dinero disponible para prestar", "Se abarata, porque los bancos tienen más reservas", "No cambia nada", "Solo afecta a los depósitos, no a los préstamos"], correcta: "Se encarece y se reduce: hay menos dinero disponible para prestar", e: "Es una de las herramientas más directas que existen para enfriar una economía, y una de las más bruscas." },
      { q: "¿Para qué sirve principalmente el encaje?", ops: ["Para que el banco pueda responder a los retiros y para controlar cuánto crédito hay en la economía", "Para pagar los sueldos del banco", "Para garantizar la rentabilidad del depositante", "Para financiar al gobierno"], correcta: "Para que el banco pueda responder a los retiros y para controlar cuánto crédito hay en la economía", e: "Es a la vez un colchón de liquidez y una palanca de política monetaria." },
      { q: "Trampa: con encaje del 20%, tu dinero está guardado al 20% en el banco. ¿Verdadero o falso?", ops: ["Falso: el encaje aplica al total de depósitos del banco, no a tu cuenta en particular", "Verdadero, una quinta parte de lo tuyo está reservada", "Verdadero solo en cuentas de ahorro", "Falso, el encaje lo paga el cliente"], correcta: "Falso: el encaje aplica al total de depósitos del banco, no a tu cuenta en particular", e: "No hay una porción marcada con tu nombre. El encaje es un porcentaje agregado sobre el balance del banco." },
    ],
  },
  {
    id: "tasarectora", nv: 2, n: "Cómo se maneja el dinero de un país",
    x: "El banco central no imprime billetes cada vez que hace falta: lo que mueve es el precio del dinero, la tasa de referencia a la que se prestan los bancos entre ellos. Si sube esa tasa, todo el crédito del país se encarece, la gente pide menos, se consume menos y los precios se enfrían. Si la baja, pasa lo contrario. Casi toda la política monetaria es ese único dial.",
    ej: "Sube la tasa de referencia del 6 al 11%: tu hipoteca variable sube, tu banco te paga algo más por ahorrar, las empresas posponen inversiones y la bolsa suele caer. Un solo número mueve todo eso.",
    q: [
      { q: "El banco central sube la tasa de referencia. ¿Qué es lo más probable?", ops: ["Que el crédito se encarezca y la economía se enfríe", "Que suban los salarios", "Que la bolsa suba de inmediato", "Que baje el desempleo"], correcta: "Que el crédito se encarezca y la economía se enfríe", e: "Es exactamente lo que se busca cuando hay inflación alta: bajar la demanda a costa de frenar el crecimiento." },
      { q: "¿Por qué las bolsas suelen caer cuando suben las tasas?", ops: ["Porque los beneficios futuros valen menos hoy y la deuda cuesta más", "Porque las empresas dejan de vender", "Porque los inversores se asustan sin motivo", "Porque el gobierno lo prohíbe"], correcta: "Porque los beneficios futuros valen menos hoy y la deuda cuesta más", e: "Es la misma mecánica del valor presente: sube la tasa de descuento, baja lo que vale hoy cualquier flujo futuro." },
    ],
  },
  {
    id: "interescomo", nv: 1, n: "Qué es de verdad una tasa de interés",
    x: "Una tasa de interés es el precio de usar dinero ajeno durante un tiempo. Nada más. Cuando pides prestado la pagas; cuando ahorras o inviertes la cobras. Lo importante es mirar tres cosas: si es anual o mensual, si es fija o variable, y si incluye todos los costes o solo el interés puro.",
    ej: "Un 3% mensual suena poco al lado de un 30 anual, y no lo es: 3% mensual compuesto son más del 42% al año.",
    q: [
      { q: "Una tarjeta cobra 3% mensual. ¿Cuánto es al año, aproximadamente?", ops: ["Más del 42%", "36% exactos", "3%", "18%"], correcta: "Más del 42%", e: "El interés se compone también en tu contra. Multiplicar por doce se queda corto: hay que elevar a doce." },
      { q: "Te ofrecen un préstamo al 12% anual más comisión de apertura del 4 y seguro obligatorio. ¿Qué te cuesta de verdad?", ops: ["Bastante más del 12: hay que mirar el coste total, no la tasa suelta", "Exactamente 12%", "16%, sumando la comisión", "Depende solo del plazo"], correcta: "Bastante más del 12: hay que mirar el coste total, no la tasa suelta", e: "Por eso existe la tasa efectiva o coste total: la tasa nominal a solas casi nunca dice lo que vas a pagar." },
      { q: "Tasa fija o variable, ¿cuál es la diferencia que importa?", ops: ["Con la fija sabes la cuota siempre; con la variable asumes tú el riesgo de que suban las tasas", "La fija siempre es más barata", "La variable es ilegal en préstamos largos", "No hay diferencia real"], correcta: "Con la fija sabes la cuota siempre; con la variable asumes tú el riesgo de que suban las tasas", e: "La fija suele empezar más cara: esa diferencia es lo que cuesta el seguro contra subidas." },
    ],
  },
  {
    id: "ahorrar", nv: 1, n: "Ahorrar no es lo mismo que invertir",
    x: "Ahorrar es apartar dinero y que siga estando ahí mañana: seguro, disponible y con rendimiento bajo o nulo. Invertir es poner ese dinero a producir aceptando que puede bajar. Las dos cosas hacen falta y sirven para cosas distintas: el ahorro es para lo que necesitas pronto o de repente, la inversión para lo que no vas a tocar en años.",
    ej: "La cuota del colegio de enero se ahorra. La jubilación de dentro de treinta años se invierte. Cambiarlas de sitio es el error más caro que se comete con los dos.",
    q: [
      { q: "El dinero que vas a necesitar dentro de seis meses, ¿dónde debería estar?", ops: ["En algo seguro y disponible, aunque rinda poco", "En acciones, para que crezca mientras tanto", "En cripto, por el rendimiento", "En un inmueble"], correcta: "En algo seguro y disponible, aunque rinda poco", e: "En seis meses una cartera de riesgo puede estar en cualquier sitio. Para plazos cortos, lo que importa es que el dinero esté, no que crezca." },
      { q: "¿Cuál es el riesgo real de solo ahorrar y nunca invertir?", ops: ["Que la inflación te vaya quitando poder de compra año tras año", "Ninguno, el ahorro es seguro", "Que el banco quiebre", "Que pagues más impuestos"], correcta: "Que la inflación te vaya quitando poder de compra año tras año", e: "El ahorro protege del susto y no protege del tiempo. A treinta años, no invertir es una decisión con coste, aunque no lo parezca." },
    ],
  },
  {
    id: "cartacredito", nv: 3, n: "La carta de crédito",
    x: "Cuando dos empresas de países distintos hacen negocios, ninguna quiere ir primero: el que envía teme no cobrar y el que paga teme no recibir. La carta de crédito resuelve eso metiendo a un banco en medio. El banco del comprador se compromete a pagar, pero solo contra documentos que prueben que la mercancía se embarcó como se pactó. El banco no juzga la mercancía: juzga los papeles.",
    ej: "Un importador venezolano compra maquinaria en Italia. Su banco emite una carta de crédito; el italiano embarca, presenta conocimiento de embarque y factura, y cobra de su banco. Si un documento no coincide con lo pactado, no le pagan aunque la máquina esté en el puerto.",
    q: [
      { q: "¿Qué problema resuelve una carta de crédito?", ops: ["Que ninguna de las dos partes quiera ser la primera en cumplir", "Que la mercancía sea de buena calidad", "Que el flete sea más barato", "Que no haya que pagar aranceles"], correcta: "Que ninguna de las dos partes quiera ser la primera en cumplir", e: "Sustituye la confianza entre dos desconocidos por la solvencia de un banco. Es de los instrumentos más antiguos del comercio y sigue funcionando igual." },
      { q: "El banco emisor paga contra...", ops: ["Documentos que cumplan exactamente lo pactado", "La mercancía recibida y revisada", "La palabra del vendedor", "La inspección del comprador"], correcta: "Documentos que cumplan exactamente lo pactado", e: "Se llama principio de estricto cumplimiento documental. Una fecha mal puesta puede bloquear el pago de un contenedor entero." },
      { q: "Trampa: una carta de crédito garantiza que la mercancía llegue en buen estado. ¿Verdadero o falso?", ops: ["Falso: garantiza el pago contra documentos, no la calidad de lo enviado", "Verdadero, el banco responde por la mercancía", "Verdadero si es irrevocable", "Falso, no garantiza nada"], correcta: "Falso: garantiza el pago contra documentos, no la calidad de lo enviado", e: "Es la confusión más común. Para la mercancía están la inspección previa y el seguro; el banco solo mira papeles." },
    ],
  },
  {
    id: "devaluacion", nv: 2, n: "Devaluación y tipo de cambio",
    x: "El tipo de cambio es el precio de una moneda en otra. Cuando tu moneda se devalúa, todo lo importado sube y tus ahorros en moneda local valen menos medidos en dólares, aunque el número de tu cuenta no se haya movido. Para quien cobra en local y gasta en importado, una devaluación es un recorte de sueldo que nadie le anunció.",
    ej: "Ganas 2.000.000 al mes y el dólar pasa de 4.000 a 6.000. Tu sueldo sigue diciendo lo mismo y pasó de valer 500 dólares a 333. No te bajaron el sueldo: te lo devaluaron.",
    q: [
      { q: "Tu moneda se devalúa un 30% y tú cobras y ahorras en ella. ¿Qué te pasó?", ops: ["Perdiste poder de compra sobre todo lo importado, sin que cambiara el número de tu cuenta", "Nada, mientras no cambies a dólares", "Ganaste, porque exportar es más barato", "Solo te afecta si viajas"], correcta: "Perdiste poder de compra sobre todo lo importado, sin que cambiara el número de tu cuenta", e: "Es la pérdida más silenciosa que existe: el saldo no baja, baja lo que compra." },
      { q: "¿Quién suele beneficiarse de una devaluación?", ops: ["El que exporta o cobra en moneda fuerte", "El que importa insumos", "El que tiene deuda en dólares", "El asalariado local"], correcta: "El que exporta o cobra en moneda fuerte", e: "Cobra en una moneda que subió y paga costes en la que bajó. El que debe en dólares y gana en local está en el lado exactamente opuesto." },
    ],
  },
  {
    id: "hiperinflacion", nv: 3, n: "Cuando la inflación se desboca",
    x: "La inflación normal erosiona; la hiperinflación destruye. Por encima de cierto punto la gente deja de usar la moneda para guardar valor y empieza a gastarla el mismo día que la recibe, lo que acelera todavía más los precios. En ese régimen, ahorrar en moneda local no es conservador: es la posición más arriesgada que existe.",
    ej: "Con inflación del 50% mensual, el dinero pierde la mitad de su valor cada mes. Lo que costaba 100 en enero cuesta más de 12.000 en diciembre.",
    q: [
      { q: "En una economía con inflación muy alta, tener todo el patrimonio en efectivo local es", ops: ["La posición de más riesgo, aunque parezca la más prudente", "La más segura", "Indiferente", "Recomendable a corto plazo"], correcta: "La posición de más riesgo, aunque parezca la más prudente", e: "El riesgo no es que el número baje: es que deje de comprar. En hiperinflación esa pérdida es rápida y total." },
      { q: "¿Por qué la hiperinflación se acelera sola?", ops: ["Porque la gente gasta el dinero de inmediato para no perderlo, y eso empuja más los precios", "Porque los bancos suben las tasas", "Porque bajan los salarios", "Porque se importa menos"], correcta: "Porque la gente gasta el dinero de inmediato para no perderlo, y eso empuja más los precios", e: "Se llama aumento de la velocidad del dinero. Es un círculo que se retroalimenta y por eso es tan difícil de frenar." },
    ],
  },
  {
    id: "burbuja", nv: 4, n: "Ciclos, burbujas y recesiones",
    x: "Las economías se mueven en ciclos: expansión, euforia, contracción, recuperación. En la euforia el crédito es fácil, todo el mundo tiene una historia de por qué esta vez es distinto, y los precios se despegan de lo que las cosas producen. La recesión no es un accidente del sistema: es la parte del ciclo en la que se corrige lo que se estiró.",
    ej: "Precios de vivienda subiendo el 20% anual mientras los alquileres suben el 3. Esa brecha no la cierra el alquiler subiendo: la cierra el precio bajando.",
    q: [
      { q: "¿Cuál es la señal más común de una burbuja?", ops: ["Que el precio se separe de lo que el activo produce, y que el crédito sea fácil", "Que suba mucho en un mes", "Que salga en las noticias", "Que suba el volumen negociado"], correcta: "Que el precio se separe de lo que el activo produce, y que el crédito sea fácil", e: "La subida sola no dice nada. Lo que la delata es el divorcio entre precio y flujo, financiado con deuda barata." },
      { q: "En la parte alta del ciclo, ¿qué error se comete más?", ops: ["Confundir un mercado alcista con criterio propio y subir el apalancamiento", "Vender demasiado pronto", "Diversificar en exceso", "Guardar demasiado efectivo"], correcta: "Confundir un mercado alcista con criterio propio y subir el apalancamiento", e: "Cuando todo sube, cualquiera acierta. La factura llega cuando el ciclo gira y encuentra a la gente apalancada." },
    ],
  },

  /* ---------------- nivel 2 · intermedio ---------------- */
  {
    id: "indexado", nv: 2, n: "Fondos indexados",
    x: "Un fondo indexado compra todas las empresas de un mercado en proporción a su tamaño, sin intentar escoger. Como no paga analistas ni opera mucho, cobra comisiones mínimas. A treinta años, la mayoría de los fondos que sí intentan escoger terminan por debajo del índice, y la causa principal no es que sean tontos: son las comisiones y el coste de operar.",
    ej: "Un índice rinde 8%. Un fondo activo que cobra 1,8% tiene que acertar lo suficiente para superar al índice por 1,8 puntos solo para empatar. Muy pocos lo logran de forma sostenida.",
    q: [
      { q: "¿Por qué la mayoría de los fondos activos pierde contra su índice a largo plazo?", ops: ["Por las comisiones y los costes de operar acumulados", "Porque sus gestores no saben de finanzas", "Porque los índices hacen trampa", "Porque el mercado siempre sube"], correcta: "Por las comisiones y los costes de operar acumulados", e: "En agregado, los activos son el mercado. Antes de costes empatan con el índice por definición; después de costes quedan por debajo. Es aritmética, no talento." },
      { q: "Un fondo cobra 2% anual en vez de 0,2. Sobre treinta años, esa diferencia se lleva aproximadamente...", ops: ["Alrededor de un tercio o más del capital final", "Un 2% del total", "Un 10% del total", "Nada relevante"], correcta: "Alrededor de un tercio o más del capital final", e: "La comisión se cobra cada año sobre el saldo completo, así que también se compone. Es el gasto que más gente subestima por venir expresado en números pequeños." },
      { q: "Trampa: 'el fondo que más rindió el año pasado' es una buena forma de elegir. ¿Verdadero o falso?", ops: ["Falso: el rendimiento pasado reciente no predice el futuro y suele revertir", "Verdadero, indica un buen gestor", "Verdadero si rindió mucho más que el resto", "Depende del sector"], correcta: "Falso: el rendimiento pasado reciente no predice el futuro y suele revertir", e: "Perseguir al ganador del año pasado es la conducta más común y más cara del inversor particular. Suele comprar caro justo antes de la reversión." },
    ],
  },
  {
    id: "comisiones", nv: 2, n: "Comisiones y costes ocultos",
    x: "Toda operación tiene fricción: comisión de compraventa, diferencia entre precio de compra y de venta, impuestos al realizar ganancias, y la comisión anual del producto. Ninguna se siente en el momento porque se descuenta del saldo, pero son de lo poco en la inversión que es seguro: el rendimiento es incierto, el coste no.",
    ej: "Rotar el 20% de tu cartera cada año con 0,5% de coste te quita 0,1% anual. Suena a nada; sobre treinta años y con interés compuesto, es dinero real.",
    q: [
      { q: "De todo lo que compone tu resultado final, ¿qué es lo único que controlas con certeza?", ops: ["Los costes", "El rendimiento del mercado", "El momento de las crisis", "La inflación"], correcta: "Los costes", e: "Es la razón por la que la gestión de costes es la primera decisión seria de cualquier inversor: es la única variable con resultado garantizado." },
      { q: "¿Qué es el diferencial entre precio de compra y venta?", ops: ["Un coste implícito que pagas cada vez que operas, aunque no aparezca como comisión", "Un impuesto del gobierno", "La ganancia del vendedor anterior", "Una comisión que solo pagan los profesionales"], correcta: "Un coste implícito que pagas cada vez que operas, aunque no aparezca como comisión", e: "No sale en ningún recibo, pero se lo llevas puesto en cada operación. Por eso operar mucho es caro incluso donde la comisión declarada es cero." },
    ],
  },
  {
    id: "aportes", nv: 2, n: "Aportar de forma periódica",
    x: "Aportar la misma cantidad cada mes, pase lo que pase, hace dos cosas. Compra más unidades cuando los precios están bajos y menos cuando están altos, sin que tengas que adivinar nada. Y sobre todo, convierte la inversión en un hábito automático en vez de una decisión que tomas cuando tienes ánimo, que suele ser cuando todo va bien y está caro.",
    ej: "Aportas 100 al mes. Un mes la unidad cuesta 10 y compras 10; al mes siguiente cuesta 5 y compras 20. Tu precio medio queda por debajo del precio medio del periodo.",
    q: [
      { q: "El principal beneficio de aportar periódicamente es...", ops: ["Que elimina la necesidad de acertar el momento y te vuelve constante", "Que garantiza mayor rendimiento que invertir todo de golpe", "Que evita las pérdidas", "Que reduce las comisiones"], correcta: "Que elimina la necesidad de acertar el momento y te vuelve constante", e: "Matemáticamente, invertir todo de golpe suele rendir algo más porque el dinero está más tiempo dentro. El aporte periódico gana en lo que de verdad falla: la conducta." },
      { q: "El mercado cae 30% y tú aportas mensualmente. ¿Qué haces?", ops: ["Sigues aportando: estás comprando lo mismo más barato", "Paras hasta que se recupere", "Vendes para no perder más", "Cambias todo a efectivo y esperas la señal"], correcta: "Sigues aportando: estás comprando lo mismo más barato", e: "Si tu horizonte es largo, una caída es un descuento sobre compras futuras. Parar de aportar en la caída es cancelar la parte buena del plan." },
    ],
  },
  {
    id: "rebalanceo", nv: 2, n: "Rebalancear",
    x: "Con el tiempo, lo que más sube ocupa un porcentaje cada vez mayor de tu cartera, y tu riesgo aumenta sin que tú decidas nada. Rebalancear es volver a los porcentajes que elegiste: vender un poco de lo que subió y comprar de lo que bajó. Es incómodo precisamente porque funciona: te obliga a hacer lo contrario del impulso.",
    ej: "Elegiste 60 acciones y 40 bonos. Tras dos años buenos quedaste en 75 y 25. Sin haber decidido nada, ahora tienes una cartera mucho más agresiva que la que querías.",
    q: [
      { q: "¿Qué problema resuelve el rebalanceo?", ops: ["Que el riesgo de tu cartera crezca solo, sin que lo hayas decidido", "Que ganes más que el mercado", "Que pagues menos impuestos", "Que evites las caídas"], correcta: "Que el riesgo de tu cartera crezca solo, sin que lo hayas decidido", e: "Es control de riesgo, no una estrategia de rentabilidad. A veces rinde algo más, a veces algo menos; lo que siempre hace es mantenerte donde decidiste estar." },
      { q: "¿Con qué frecuencia tiene sentido rebalancear para un inversor particular?", ops: ["Una vez al año, o cuando algo se desvíe bastante de su objetivo", "Cada semana", "Cada vez que el mercado se mueve", "Nunca"], correcta: "Una vez al año, o cuando algo se desvíe bastante de su objetivo", e: "Rebalancear muy seguido añade costes e impuestos sin añadir control. Una vez al año captura casi todo el beneficio." },
    ],
  },
  {
    id: "regla4", nv: 2, n: "Cuánto necesitas para no depender del sueldo",
    x: "La referencia más usada es la regla del 4%: si cada año retiras el 4% de tu patrimonio inicial ajustado por inflación, históricamente el dinero aguantó unos treinta años. Dicho al revés, necesitas alrededor de 25 veces tu gasto anual. Fíjate que la meta la fija tu gasto, no tu sueldo.",
    ej: "Gastas 30.000 al año. Tu número es 750.000. Si reduces tu gasto a 24.000, tu número baja a 600.000: recortar gasto acerca la meta por los dos lados a la vez.",
    q: [
      { q: "Tu meta de independencia financiera la determina...", ops: ["Tu gasto anual", "Tu sueldo", "Tu edad", "El país donde vives"], correcta: "Tu gasto anual", e: "Por eso dos personas con el mismo sueldo pueden tener metas que difieren en cientos de miles: lo que cuenta es el tren de vida que hay que sostener." },
      { q: "Reducir tu gasto anual en 500 baja tu meta en aproximadamente...", ops: ["12.500", "500", "5.000", "50.000"], correcta: "12.500", e: "Veinticinco veces 500. Cada recorte permanente de gasto trabaja dos veces: te deja ahorrar más y baja la meta." },
      { q: "Trampa: la regla del 4% garantiza que el dinero nunca se acabe. ¿Verdadero o falso?", ops: ["Falso: es una regla histórica y aproximada, no una garantía", "Verdadero, está demostrado matemáticamente", "Verdadero si inviertes en bonos", "Falso, en realidad es la del 10%"], correcta: "Falso: es una regla histórica y aproximada, no una garantía", e: "Sale de datos históricos de un mercado concreto y un horizonte de treinta años. Es una brújula útil, no una ley física." },
    ],
  },
  {
    id: "liquidez", nv: 2, n: "Liquidez",
    x: "Un activo es líquido si puedes convertirlo en dinero rápido y sin rebajar el precio. Las acciones grandes son líquidas; un local comercial no lo es. La iliquidez no es mala en sí, incluso suele venir con rendimiento extra por la molestia. El problema es tener necesidades líquidas cubiertas con activos ilíquidos.",
    ej: "Todo tu patrimonio está en un inmueble y necesitas 5.000 mañana. El inmueble vale 200.000 pero venderlo toma meses; acabas pidiendo un préstamo caro teniendo patrimonio de sobra.",
    q: [
      { q: "¿Cuál es el riesgo real de una cartera muy ilíquida?", ops: ["Que necesites dinero en un momento en que solo puedes vender malbaratando", "Que rinda menos que una líquida", "Que sea ilegal", "Que pague más impuestos"], correcta: "Que necesites dinero en un momento en que solo puedes vender malbaratando", e: "La iliquidez no cobra su factura mientras todo va bien. La cobra el día que coinciden tu necesidad de efectivo y un mal momento del mercado." },
      { q: "Los activos ilíquidos suelen ofrecer rendimiento algo mayor. ¿Por qué?", ops: ["Es la prima que paga el mercado por aceptar no poder salir cuando quieras", "Porque son mejores negocios", "Porque tienen menos riesgo", "Porque los regula menos el Estado"], correcta: "Es la prima que paga el mercado por aceptar no poder salir cuando quieras", e: "Se llama prima de iliquidez. Es real, pero solo la cobra quien de verdad puede permitirse no tocar ese dinero." },
    ],
  },

  /* ---------------- nivel 3 · avanzado ---------------- */
  {
    id: "valorpresente", nv: 3, n: "Valor presente",
    x: "Mil dentro de cinco años no valen mil hoy, porque hoy podrías invertirlos. Descontar es traer un flujo futuro al presente dividiéndolo por uno más la tasa, elevado a los años. Toda valoración seria, de una empresa o de un bono, es en el fondo esta operación repetida sobre los flujos que se esperan.",
    ej: "Mil dentro de 5 años, descontados al 10%, valen 1.000 dividido entre 1,1 elevado a 5, es decir 621 hoy.",
    q: [
      { q: "Si sube la tasa de descuento, el valor presente de un flujo futuro...", ops: ["Baja", "Sube", "No cambia", "Depende del flujo"], correcta: "Baja", e: "Es la mecánica detrás de que las bolsas caigan cuando suben los tipos: el mismo beneficio futuro vale menos hoy." },
      { q: "¿Qué activos sufren más cuando suben las tasas?", ops: ["Los que prometen sus flujos más lejos en el futuro", "Los que pagan mucho ahora", "Los de corto plazo", "Todos exactamente igual"], correcta: "Los que prometen sus flujos más lejos en el futuro", e: "Cuanto más lejos está el flujo, más veces se le aplica el descuento. Por eso las empresas de crecimiento sin beneficios presentes son las más sensibles a los tipos." },
    ],
  },
  {
    id: "beta", nv: 3, n: "Beta y riesgo sistemático",
    x: "El riesgo de un activo se parte en dos: el propio, que se diluye al diversificar, y el de mercado, que no se va por más que repartas. La beta mide cuánto del segundo cargas. Beta 1 se mueve como el mercado; beta 1,5 amplifica; beta negativa va al revés. Diversificar elimina el riesgo propio y deja el sistemático intacto.",
    ej: "Cartera de veinte acciones distintas con beta media 1,1: has eliminado casi todo el riesgo específico de cada empresa y te quedas expuesto un 10% más que el mercado.",
    q: [
      { q: "¿Qué tipo de riesgo NO desaparece por diversificar?", ops: ["El sistemático, el del mercado en su conjunto", "El específico de cada empresa", "El de fraude en una compañía", "El de que un sector concreto caiga"], correcta: "El sistemático, el del mercado en su conjunto", e: "Por eso la teoría dice que el mercado solo te paga por asumir riesgo sistemático: el específico podrías haberlo eliminado gratis y nadie te compensa por no hacerlo." },
      { q: "Tienes ocho activos distintos y todos con beta cercana a uno. ¿Qué tienes en realidad?", ops: ["Ocho formas de la misma apuesta al mercado", "Una cartera bien diversificada", "Una cartera de bajo riesgo", "Una cartera neutral al mercado"], correcta: "Ocho formas de la misma apuesta al mercado", e: "Es el error que el juego te señala en el panel de cartera. Muchos nombres con la misma beta no es diversificación, es repetición." },
    ],
  },
  {
    id: "sharpe", nv: 3, n: "Retorno por unidad de riesgo",
    x: "Comparar inversiones solo por rendimiento es engañoso, porque siempre se puede subir el rendimiento esperado asumiendo más riesgo. El ratio de Sharpe divide el rendimiento que excede a la tasa segura entre la volatilidad. Responde a la pregunta correcta: cuánto te pagaron por cada unidad de sobresalto.",
    ej: "Cartera A rinde 12 con volatilidad 20; cartera B rinde 8 con volatilidad 8. Con tasa segura 2: A da 0,50 y B da 0,75. B es mejor negocio aunque rinda menos.",
    q: [
      { q: "¿Qué pregunta responde el ratio de Sharpe?", ops: ["Cuánto rendimiento extra obtuviste por cada unidad de riesgo asumido", "Cuánto vas a ganar el año que viene", "Cuál es la probabilidad de perder dinero", "Qué comisión estás pagando"], correcta: "Cuánto rendimiento extra obtuviste por cada unidad de riesgo asumido", e: "Permite comparar estrategias con perfiles de riesgo distintos, que es justo lo que el rendimiento a secas no deja hacer." },
      { q: "Trampa: un Sharpe muy alto y muy estable durante años es señal inequívoca de excelencia. ¿Verdadero o falso?", ops: ["Falso: también es el perfil típico de un fraude o de una estrategia que esconde riesgo de cola", "Verdadero, es la mejor señal posible", "Verdadero si el fondo está regulado", "Falso, el Sharpe no significa nada"], correcta: "Falso: también es el perfil típico de un fraude o de una estrategia que esconde riesgo de cola", e: "Rendimientos suavemente positivos mes tras mes, sin volatilidad, describen tanto a un genio como a un esquema Ponzi o a alguien vendiendo seguros contra catástrofes que aún no ocurrieron." },
    ],
  },
  {
    id: "apalancamiento", nv: 3, n: "Apalancamiento",
    x: "Apalancarse es operar con dinero prestado. Si el activo rinde más que la tasa de la deuda, el retorno sobre tu capital se multiplica. Si rinde menos, la pérdida también se multiplica, y como la deuda no se reduce cuando el activo cae, las pérdidas llegan a tu capital antes y más fuerte.",
    ej: "Pones 20 y pides 80 para comprar un activo de 100. Si sube 10% ganas 10 sobre 20, un 50%. Si baja 20%, pierdes 20 sobre 20: todo tu capital.",
    q: [
      { q: "¿Qué hace el apalancamiento con el riesgo de ruina?", ops: ["Lo aumenta: una caída moderada del activo puede borrar todo tu capital", "Lo reduce al repartir la inversión", "No lo cambia, solo multiplica ganancias", "Lo elimina si la tasa es baja"], correcta: "Lo aumenta: una caída moderada del activo puede borrar todo tu capital", e: "Es la asimetría clave: el prestamista cobra igual pase lo que pase, así que toda la variabilidad se concentra en tu parte." },
      { q: "Dos negocios idénticos, uno sin deuda y otro apalancado tres a uno. ¿En qué se diferencian?", ops: ["En el rango de resultados posibles para el dueño, no en la calidad del negocio", "En que el apalancado es mejor negocio", "En que el apalancado paga menos impuestos siempre", "En nada relevante"], correcta: "En el rango de resultados posibles para el dueño, no en la calidad del negocio", e: "El apalancamiento no mejora el activo: solo redistribuye sus resultados hacia los extremos para quien pone el capital." },
    ],
  },
  {
    id: "ebitda", nv: 3, n: "EBITDA y múltiplos",
    x: "El EBITDA es lo que gana la operación antes de intereses, impuestos, depreciación y amortización. Sirve para comparar empresas con estructuras financieras distintas. Valorar por múltiplos es decir: negocios como este se pagan a ocho veces EBITDA, luego este vale ocho veces el suyo. Es rápido y por eso mismo peligroso.",
    ej: "EBITDA de 20 millones y múltiplo del sector de 8: valor de empresa 160 millones. Si tiene 60 de deuda, a los accionistas les corresponden 100.",
    q: [
      { q: "¿Cuál es la crítica más seria al EBITDA como medida de beneficio?", ops: ["Ignora que las máquinas se gastan y hay que reponerlas, y que los intereses se pagan de verdad", "Que es muy difícil de calcular", "Que solo sirve para bancos", "Que no lo aceptan los auditores"], correcta: "Ignora que las máquinas se gastan y hay que reponerlas, y que los intereses se pagan de verdad", e: "La depreciación es un gasto real diferido: llega el día que hay que reponer el activo. Por eso se dice que el EBITDA es el beneficio antes de los gastos que no te gustan." },
      { q: "Una empresa se compra a 8 veces EBITDA y se vende cinco años después a 8 veces un EBITDA mayor. ¿De dónde salió la ganancia?", ops: ["Del crecimiento operativo y de haber amortizado deuda, no de la expansión del múltiplo", "De la expansión del múltiplo", "De la inflación", "De las comisiones"], correcta: "Del crecimiento operativo y de haber amortizado deuda, no de la expansión del múltiplo", e: "Son las tres palancas del private equity: crecer, pagar deuda y vender más caro en múltiplo. Solo las dos primeras dependen de ti." },
    ],
  },

  /* ---------------- nivel 4 · profesional ---------------- */
  {
    id: "duration", nv: 4, n: "Duración de un bono",
    x: "La duración mide cuánto cae el precio de un bono cuando suben las tasas. Aproximadamente, un bono con duración 7 pierde 7% si las tasas suben un punto. Cuanto más largo el plazo y menor el cupón, mayor la duración y más te duele un movimiento de tipos.",
    ej: "Bono a 10 años con duración 8: las tasas suben de 3 a 4% y su precio cae alrededor de 8%, aunque el emisor siga siendo igual de solvente.",
    q: [
      { q: "Las tasas suben un punto y tienes un bono de duración 6. Tu precio cae aproximadamente...", ops: ["6%", "1%", "Seis puntos básicos", "Nada si lo mantienes"], correcta: "6%", e: "La caída de precio es real aunque no vendas: si lo mantienes hasta vencimiento cobras lo pactado, pero durante el camino tu patrimonio marcado a mercado bajó." },
      { q: "¿Qué bono es más sensible a las tasas?", ops: ["Uno a 30 años con cupón bajo", "Uno a 2 años con cupón alto", "Los dos igual", "Uno a 30 años con cupón alto"], correcta: "Uno a 30 años con cupón bajo", e: "Plazo largo y cupón bajo empujan los flujos hacia el futuro, y todo lo que está lejos sufre más el descuento." },
    ],
  },
  {
    id: "curva", nv: 4, n: "La curva de rendimientos",
    x: "La curva compara lo que paga la deuda de un mismo emisor a distintos plazos. Normalmente el plazo largo paga más que el corto, porque comprometerse más tiempo merece premio. Cuando se invierte, el corto pagando más que el largo, el mercado está diciendo que espera tasas más bajas en el futuro, y eso suele asociarse a recesión.",
    ej: "El bono a 2 años paga 5% y el de 10 paga 4. La curva está invertida: el mercado apuesta a que habrá que bajar tasas, y eso normalmente pasa cuando la economía se enfría.",
    q: [
      { q: "Una curva invertida se interpreta habitualmente como...", ops: ["Una señal de expectativas de recesión", "Una señal de crecimiento fuerte", "Un error del mercado", "Un buen momento para endeudarse largo"], correcta: "Una señal de expectativas de recesión", e: "Ha precedido a la mayoría de las recesiones recientes, aunque con retrasos muy variables. Es una señal, no un cronómetro." },
    ],
  },
  {
    id: "pe", nv: 4, n: "Cómo gana dinero un fondo de private equity",
    x: "Un fondo cobra dos partes: una comisión anual sobre el capital comprometido, que paga la estructura, y el carry, que suele ser el 20% de las ganancias por encima de un rendimiento mínimo. Ese mínimo, el hurdle, existe para que el gestor no cobre por lo que habría dado un índice. El múltiplo sobre el capital y la tasa interna de retorno miden cosas distintas: uno cuánto, el otro qué tan rápido.",
    ej: "Fondo de 100 millones, 2% anual son 2 millones al año. Si devuelve 200, hay 100 de ganancia; por encima del hurdle el gestor se lleva alrededor de 20.",
    q: [
      { q: "¿Qué mide el múltiplo sobre capital invertido y qué mide la tasa interna de retorno?", ops: ["Cuánto multiplicaste el dinero, y a qué velocidad lo lograste", "Lo mismo, expresado distinto", "Comisiones y gastos", "Riesgo y volatilidad"], correcta: "Cuánto multiplicaste el dinero, y a qué velocidad lo lograste", e: "Duplicar en dos años y duplicar en diez dan el mismo múltiplo y tasas internas radicalmente distintas. Por eso quien quiere lucir bien acelera salidas." },
      { q: "¿Para qué sirve el hurdle o rendimiento mínimo?", ops: ["Para que el gestor no cobre comisión de éxito por rendimientos que el mercado habría dado igual", "Para limitar las pérdidas del inversor", "Para pagar los impuestos del fondo", "Para fijar el tamaño del fondo"], correcta: "Para que el gestor no cobre comisión de éxito por rendimientos que el mercado habría dado igual", e: "Alinea incentivos: el carry debería pagarse por valor añadido, no por haber estado invertido durante un buen ciclo." },
    ],
  },

  /* ---------------- nivel 5 · mesa de socios ---------------- */
  {
    id: "maldicion", nv: 5, n: "La maldición del ganador",
    x: "En una subasta donde todos estiman el mismo valor incierto, el que gana suele ser el que más se pasó estimando. No gana el que mejor valoró: gana el más optimista. Por eso los compradores disciplinados pierden la mayoría de las subastas, y eso es exactamente lo que deberían hacer.",
    ej: "Diez fondos valoran una empresa entre 80 y 120. Gana el que ofreció 120. Si el valor verdadero era 100, ganó la subasta y perdió 20.",
    q: [
      { q: "En una subasta con muchos participantes informados, ganar suele significar...", ops: ["Que fuiste el más optimista, y probablemente pagaste de más", "Que valoraste mejor que el resto", "Que tenías mejor información", "Que el activo era barato"], correcta: "Que fuiste el más optimista, y probablemente pagaste de más", e: "Por eso los compradores serios ajustan su oferta a la baja en función de cuántos competidores hay: cuantos más, más probable es que ganar sea mala señal." },
      { q: "Trampa: si un activo se subastó y nadie más pujó cerca de ti, eso confirma que hiciste un gran negocio. ¿Verdadero o falso?", ops: ["Falso: puede significar que los demás vieron algo que tú no viste", "Verdadero, la falta de competencia es siempre buena", "Verdadero si el vendedor tenía prisa", "Falso, siempre significa fraude"], correcta: "Falso: puede significar que los demás vieron algo que tú no viste", e: "Ganar barato es bueno cuando tienes una ventaja de información o de estructura, y preocupante cuando no sabes cuál era esa ventaja." },
    ],
  },
  {
    id: "supervivencia", nv: 5, n: "Sesgo de supervivencia",
    x: "Las estadísticas de rendimiento suelen calcularse sobre los fondos y empresas que siguen existiendo. Los que quebraron desaparecen de la muestra, así que el promedio que ves está inflado por definición. Lo mismo ocurre con las historias de éxito: nadie escribe el libro del que hizo lo mismo y fracasó.",
    ej: "Un índice de fondos que muestra 9% anual puede estar excluyendo a los que cerraron por malos resultados. El rendimiento real del inversor medio fue bastante menor.",
    q: [
      { q: "¿Por qué el rendimiento medio histórico de una categoría de fondos suele estar sobrestimado?", ops: ["Porque los que quebraron o cerraron salen de la muestra", "Porque los gestores mienten", "Porque no se descuenta la inflación", "Porque se calculan en distintas monedas"], correcta: "Porque los que quebraron o cerraron salen de la muestra", e: "Es un sesgo estructural, no un fraude. Para corregirlo hay que construir el índice incluyendo a los muertos, y muy pocos lo hacen." },
      { q: "Alguien tomó una apuesta muy concentrada y se hizo rico. ¿Qué se puede concluir?", ops: ["Poco: no vemos a los que hicieron lo mismo y perdieron", "Que la estrategia es buena", "Que tenía información privilegiada", "Que hay que copiarlo"], correcta: "Poco: no vemos a los que hicieron lo mismo y perdieron", e: "Con suficientes participantes, alguien acierta diez veces seguidas por pura estadística. El resultado no separa la habilidad de la suerte cuando la muestra visible ya está filtrada." },
    ],
  },
  {
    id: "correlacion", nv: 5, n: "Correlación en crisis y riesgo de cola",
    x: "Las correlaciones que se calculan en tiempos normales dejan de servir en las crisis, cuando casi todo cae a la vez porque todos venden lo que pueden vender. Además, las distribuciones reales tienen colas más gordas que la campana de Gauss: los eventos extremos ocurren mucho más de lo que el modelo predice.",
    ej: "Un modelo dice que una caída así ocurre una vez cada 10.000 años. En treinta años ocurrieron tres. El problema no fue la mala suerte, fue la distribución elegida.",
    q: [
      { q: "¿Qué implica que las distribuciones de rendimientos tengan colas gordas?", ops: ["Que los eventos extremos son bastante más frecuentes de lo que predice la campana de Gauss", "Que la volatilidad es mayor todos los días", "Que el rendimiento medio es más alto", "Que no se puede invertir"], correcta: "Que los eventos extremos son bastante más frecuentes de lo que predice la campana de Gauss", e: "Los modelos que asumen normalidad subestiman sistemáticamente la probabilidad del desastre, y por eso las carteras diseñadas con ellos rompen más de lo previsto." },
      { q: "Una cartera muy diversificada cae fuerte en una crisis. ¿Falló la diversificación?", ops: ["No necesariamente: en crisis las correlaciones suben y la protección se reduce, aunque siga siendo mejor que no diversificar", "Sí, la diversificación no sirve", "Sí, había que estar todo en efectivo", "No, es imposible que caiga"], correcta: "No necesariamente: en crisis las correlaciones suben y la protección se reduce, aunque siga siendo mejor que no diversificar", e: "Diversificar reduce el daño, no lo elimina. Confundir 'menos daño' con 'ningún daño' es lo que hace que la gente abandone la estrategia en el peor momento." },
    ],
  },
];

/* las preguntas de cada tema entran al banco general con su nivel,
   de modo que el examen de fin de ano puede preguntar por cualquier
   cosa que la Catedra haya llegado a explicar */
/* El banco histórico guarda las opciones en "o" y el índice de la
   correcta en "c". La Cátedra las escribe con nombre para que sea
   legible al redactarlas; aquí se traducen al formato nativo y se
   descarta cualquier pregunta mal formada antes de que llegue al juego. */
const DE_TEMAS = TEMAS.reduce((acc, tema) => acc.concat(
  tema.q
    .filter((p) => p && typeof p.q === "string" && Array.isArray(p.ops) && p.ops.length >= 2 && p.ops.indexOf(p.correcta) >= 0)
    .map((p) => ({ q: p.q, o: p.ops.slice(), c: p.ops.indexOf(p.correcta), e: p.e, nv: tema.nv, tema: tema.id }))
), []);

const PREGUNTAS = []
  .concat(BANCO0.map((x) => ({ ...x, nv: 1 })))
  .concat(BANCO.map((x) => ({ ...x, nv: 2 })))
  .concat(BANCO2.map((x) => ({ ...x, nv: 3 })))
  .concat(BANCO3)
  .concat(DE_TEMAS);

const NIVEL_N = ["", "Fundamentos", "Intermedio", "Avanzado", "Profesional", "Mesa de socios"];
/* el nivel sube con los años de carrera: seis años por escalón */
/* El nivel ya no depende solo de los años cumplidos: cada rato que
   dedicas a estudiar dentro del juego adelanta el temario. Alguien que
   estudia llega a las preguntas difíciles antes que alguien que solo
   deja pasar los años, que es exactamente como funciona fuera. */
const nivelDe = (turno, estudia) => clamp(
  1 + Math.floor(entero(turno, 0, 0, 60) / 7) + Math.floor(clamp(numero(estudia, 0), 0, 500) / 55),
  1, 5
);
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

/* ============================================================
   EL DEAL FLOW DEL FONDO
   Antes cada empresa era un nombre, un sector y un múltiplo esperado
   sacado de la nada: no había forma de distinguir un buen negocio de
   uno malo salvo mirando el número que el juego ya te daba resuelto.

   Ahora cada oportunidad trae los cinco datos con los que se juzga de
   verdad una compra, y el múltiplo esperado se CALCULA a partir de
   ellos. Eso significa que aprender a leerlos sirve, porque el que
   crece con margen, sin depender de un solo cliente, sin deuda encima
   y con algo que lo proteja de la competencia es, efectivamente, el
   que devuelve más. Hay trampas a propósito: negocios que crecen mucho
   y esconden una concentración brutal.

   crec  crecimiento anual del EBITDA, en %
   mar   margen EBITDA, en %
   conc  parte de las ventas en el cliente más grande, en %
   deuda deuda sobre EBITDA, en veces
   foso  1 ninguna ventaja · 2 alguna · 3 difícil de atacar
   ============================================================ */
const EMPRESAS = [
  /* --- buenos de verdad --- */
  { n: "Generadora eléctrica con contrato regulado", s: "Energía", riesgo: 1, crec: 6, mar: 34, conc: 20, deuda: 2.0, foso: 3,
    d: "Contrato a veinte años con el Estado. Aburrida y previsible como pocas." },
  { n: "Software de gestión para constructoras", s: "Tecnología", riesgo: 2, crec: 22, mar: 30, conc: 12, deuda: 0.8, foso: 3,
    d: "Suscripción anual, cambiarlo cuesta más que pagarlo. Nadie se va." },
  { n: "Cadena de farmacias", s: "Retail", riesgo: 1, crec: 9, mar: 12, conc: 6, deuda: 1.6, foso: 2,
    d: "Márgenes finos, demanda que no se cae ni en recesión." },
  { n: "Clínica ambulatoria con tres sedes", s: "Salud", riesgo: 1, crec: 13, mar: 24, conc: 15, deuda: 1.9, foso: 2,
    d: "Convenios con aseguradoras y una lista de espera de seis semanas." },
  { n: "Planta de tratamiento de agua municipal", s: "Infraestructura", riesgo: 1, crec: 5, mar: 38, conc: 30, deuda: 2.4, foso: 3,
    d: "Concesión de 25 años. Un solo cliente, pero es el municipio." },
  { n: "Fabricante de envases para farmacéutica", s: "Industrial", riesgo: 2, crec: 11, mar: 22, conc: 24, deuda: 1.7, foso: 3,
    d: "Homologado por sus clientes: cambiar de proveedor les exige revalidar todo." },

  /* --- decentes, sin brillo --- */
  { n: "Distribuidora de alimentos regional", s: "Consumo", riesgo: 1, crec: 8, mar: 9, conc: 18, deuda: 2.2, foso: 1,
    d: "Volumen alto y margen mínimo. Vive de la ejecución diaria." },
  { n: "Operador logístico de última milla", s: "Logística", riesgo: 2, crec: 18, mar: 11, conc: 34, deuda: 2.6, foso: 1,
    d: "Crece con el comercio electrónico y con quince competidores iguales." },
  { n: "Procesadora de arroz", s: "Agroindustria", riesgo: 2, crec: 7, mar: 14, conc: 22, deuda: 2.8, foso: 1,
    d: "Commodity puro: el precio lo pone el mercado, no ella." },
  { n: "Planta de empaques plásticos", s: "Industrial", riesgo: 2, crec: 6, mar: 16, conc: 28, deuda: 3.0, foso: 1,
    d: "Activo pesado, clientes que aprietan cada renovación." },
  { n: "Empresa de factoring especializada", s: "Financiero", riesgo: 2, crec: 16, mar: 26, conc: 20, deuda: 3.4, foso: 2,
    d: "Gana con el diferencial de tasa. Le va bien hasta que alguien no paga." },
  { n: "Colegio privado con dos campus", s: "Educación", riesgo: 1, crec: 7, mar: 21, conc: 4, deuda: 1.4, foso: 2,
    d: "Matrícula anual y una lista de espera. Crecer exige ladrillo." },
  { n: "Talleres de mantenimiento de flotas", s: "Servicios", riesgo: 2, crec: 10, mar: 17, conc: 40, deuda: 2.1, foso: 1,
    d: "Dos contratos grandes sostienen la mitad de la facturación." },

  /* --- trampas: brillan por un lado y fallan por otro --- */
  { n: "Fintech de pagos transfronterizos", s: "Fintech", riesgo: 3, crec: 45, mar: 8, conc: 52, deuda: 1.2, foso: 2,
    d: "Crece como la espuma y la mitad del volumen es de un solo corresponsal." },
  { n: "Franquicia de restaurantes en expansión", s: "Consumo", riesgo: 3, crec: 34, mar: 10, conc: 8, deuda: 4.2, foso: 1,
    d: "Abre un local al mes, todos financiados con deuda." },
  { n: "Minera de oro de mediana escala", s: "Minería", riesgo: 3, crec: 26, mar: 32, conc: 15, deuda: 3.8, foso: 1,
    d: "Números excelentes al precio del oro de hoy. Y el precio del oro no lo decides tú." },
  { n: "Comercializadora de electrónicos importados", s: "Retail", riesgo: 3, crec: 30, mar: 5, conc: 45, deuda: 3.6, foso: 1,
    d: "Margen de tres puntos, un proveedor exclusivo y tipo de cambio en contra." },
  { n: "Constructora con obra pública adjudicada", s: "Construcción", riesgo: 3, crec: 38, mar: 13, conc: 68, deuda: 3.2, foso: 1,
    d: "Cartera llena. Toda del mismo cliente, y ese cliente cambia cada elección." },
  { n: "Plataforma de reparto con crecimiento agresivo", s: "Tecnología", riesgo: 3, crec: 60, mar: -4, conc: 10, deuda: 2.0, foso: 1,
    d: "Duplica usuarios cada año y pierde dinero en cada pedido." },

  /* --- malos, y se ve --- */
  { n: "Textilera con maquinaria de los noventa", s: "Industrial", riesgo: 3, crec: 1, mar: 6, conc: 44, deuda: 4.6, foso: 1,
    d: "Necesita una inversión que nadie ha hecho en veinte años." },
  { n: "Cadena de videoclubes reconvertida", s: "Consumo", riesgo: 3, crec: -6, mar: 4, conc: 12, deuda: 3.9, foso: 1,
    d: "El negocio original murió y el nuevo todavía no existe." },
  { n: "Naviera de cabotaje con flota antigua", s: "Logística", riesgo: 3, crec: 2, mar: 9, conc: 56, deuda: 5.1, foso: 1,
    d: "Barcos viejos, un cliente dominante y covenants al filo." },
];

/* La calidad de un negocio, en un solo número entre cero y uno.
   Es la fórmula que el jugador debería acabar teniendo en la cabeza:
   crecer y tener margen suman, pero depender de un cliente y llevar
   deuda encima restan casi lo mismo, y tener algo que te proteja de la
   competencia pesa tanto como crecer. */
const calidadDeal = (e) => {
  if (!e) return 0;
  const cr = clamp((numero(e.crec, 0) + 5) / 30, 0, 1);       /* de -5% a 25% */
  const mg = clamp((numero(e.mar, 0) + 5) / 40, 0, 1);        /* de -5% a 35% */
  const cc = clamp(1 - numero(e.conc, 0) / 70, 0, 1);         /* 70% en un cliente es ruina */
  const dd = clamp(1 - numero(e.deuda, 0) / 5.5, 0, 1);       /* 5,5x de deuda es el filo */
  const fo = clamp((numero(e.foso, 1) - 1) / 2, 0, 1);
  return clamp(0.2 * cr + 0.18 * mg + 0.21 * cc + 0.19 * dd + 0.22 * fo, 0, 1);
};

/* el múltiplo esperado sale de la calidad, no de un número inventado */
const baseDeal = (e) => +(1.15 + calidadDeal(e) * 2.25).toFixed(2);

/* cómo se lee cada señal, para poder mostrarlo en la ficha del negocio */
const senalesDeal = (e) => [
  { k: "Crecimiento", v: numero(e.crec, 0) + "%", bien: numero(e.crec, 0) >= 12, mal: numero(e.crec, 0) < 4 },
  { k: "Margen", v: numero(e.mar, 0) + "%", bien: numero(e.mar, 0) >= 20, mal: numero(e.mar, 0) < 8 },
  { k: "Mayor cliente", v: numero(e.conc, 0) + "%", bien: numero(e.conc, 0) <= 20, mal: numero(e.conc, 0) >= 40 },
  { k: "Deuda", v: numero(e.deuda, 0).toFixed(1) + "x", bien: numero(e.deuda, 0) <= 2.2, mal: numero(e.deuda, 0) >= 3.5 },
  { k: "Ventaja", v: numero(e.foso, 1) >= 3 ? "difícil de atacar" : numero(e.foso, 1) === 2 ? "alguna" : "ninguna",
    bien: numero(e.foso, 1) >= 3, mal: numero(e.foso, 1) <= 1 },
];


/* ---------- banderas rojas ----------
   Reescrito: cada línea, sea bandera roja o no, lleva su propia razón.
   Antes el juego te decía "estas tres eran" y te dejaba igual de ciego
   que al empezar; lo que enseña no es cuáles marcar, es por qué. Las
   que NO son banderas también se explican, porque la mitad del oficio
   es no asustarse con lo que solo parece raro.
   doc: qué estás leyendo · pista: qué buscar, solo en modo aprendiz */
const BANDERAS = [
  {
    t: "Estados financieros de la compañía objetivo. Marca las tres banderas rojas.",
    doc: "Estados financieros auditados de los últimos tres ejercicios",
    pista: "Busca partidas que crecen a un ritmo distinto del negocio, y a quién se le vende de verdad.",
    mal: [
      { t: "Las cuentas por cobrar crecen el triple que las ventas", x: "Están facturando cosas que nadie está pagando. O el cliente no puede pagar, o la venta se reconoció antes de tiempo para inflar el resultado." },
      { t: "El auditor renunció el año pasado sin explicación", x: "Un auditor que se va y no dice por qué está evitando firmar algo. Es de las señales más serias que existen en una compra." },
      { t: "El 70% de las ventas es a una empresa relacionada", x: "Esas ventas pueden ser a precio inventado y desaparecer el día que cambia el dueño. No es facturación real, es contabilidad de familia." },
    ],
    ok: [
      { t: "El margen bruto se mantiene estable hace tres años", x: "Estabilidad de margen es exactamente lo que quieres ver: el negocio no está comprando ventas a base de rebajas." },
      { t: "La empresa arrienda sus galpones en vez de comprarlos", x: "Es una decisión de estructura, no un problema. Arrendar libera capital; muchas compañías sanas no son dueñas de un solo metro." },
      { t: "Tiene una línea de crédito aprobada y sin usar", x: "Es una buena noticia: hay liquidez de respaldo disponible y no ha hecho falta tocarla." },
      { t: "El inventario rota cuatro veces al año", x: "Es una rotación normal en la mayoría de los sectores. Preocupa cuando cae de golpe, no su nivel por sí solo." },
      { t: "Los socios cobran dividendos una vez al año", x: "Repartir utilidades de forma ordenada y anual es lo correcto. La bandera sería que las sacaran mes a mes sin acuerdo." },
    ],
  },
  {
    t: "Sala de datos de una empresa de servicios. Marca las tres banderas rojas.",
    doc: "Sala de datos entregada por el vendedor antes de la oferta vinculante",
    pista: "Fíjate en lo que falta, en lo que está por vencer y en lo que puede costar dinero mañana.",
    mal: [
      { t: "Faltan las actas de junta de los últimos dos años", x: "Sin actas no sabes qué decisiones se tomaron ni quién tenía autoridad para tomarlas. Lo que no está en la sala de datos es justo lo que hay que mirar." },
      { t: "Hay un juicio laboral colectivo sin provisionar", x: "Es una deuda que existe y no aparece en el balance. Si pierden, la paga el nuevo dueño: tú." },
      { t: "El contrato que genera la mitad del ingreso vence en tres meses sin renovación", x: "Estás comprando un negocio que puede perder la mitad de su facturación un trimestre después de la firma." },
    ],
    ok: [
      { t: "La nómina creció en línea con las ventas", x: "Es lo esperable en servicios: más trabajo exige más gente. La bandera sería que la nómina creciera y las ventas no." },
      { t: "Cambiaron de banco principal el año pasado", x: "Se cambia de banco por comisiones, por servicio o por un gerente que se mudó. Por sí solo no dice nada." },
      { t: "Tienen certificación de calidad vigente", x: "Es una señal buena, no mala: hay procesos documentados y alguien externo los revisó." },
      { t: "El gerente general lleva ocho años en el cargo", x: "Continuidad en la dirección suele ser un activo. Preocuparía la puerta giratoria, no la permanencia." },
      { t: "Renovaron la flota hace dos años", x: "Significa que la inversión fuerte ya se hizo y no te toca a ti en los próximos años." },
    ],
  },
  {
    t: "Un fondo te ofrece entrar como inversionista. Marca las tres banderas rojas.",
    doc: "Presentación comercial y reglamento de un fondo de inversión",
    pista: "Mira quién custodia el dinero, quién lo valora y si puedes salir cuando quieras.",
    mal: [
      { t: "Promete un retorno fijo mensual sin importar el mercado", x: "Ningún activo con riesgo rinde igual todos los meses. Un rendimiento plano es la firma de un esquema que paga a los viejos con el dinero de los nuevos." },
      { t: "El administrador y el auditor pertenecen al mismo grupo", x: "El auditor existe para vigilar al administrador. Si son la misma casa, nadie está vigilando nada." },
      { t: "No permite retiros y no informa el valor de la cuota", x: "Si no puedes salir ni sabes cuánto vale lo tuyo, no tienes una inversión: tienes un acto de fe." },
    ],
    ok: [
      { t: "Cobra 2% anual de administración", x: "Es una comisión alta pero estándar en gestión activa. Es una razón para negociar o comparar, no una bandera roja." },
      { t: "Publica un informe trimestral a inversionistas", x: "Rendir cuentas con periodicidad fija es justo lo contrario de una señal de alarma." },
      { t: "Tiene un comité de inversiones con miembros externos", x: "Gente de fuera mirando las decisiones es un control real de gobierno." },
      { t: "Invierte principalmente en compañías listadas", x: "Activos listados tienen precio público y verificable todos los días. Es lo más transparente que puede tener un fondo." },
      { t: "Está registrado ante el regulador local", x: "El registro no garantiza rentabilidad, pero sí supervisión y obligaciones de reporte." },
    ],
  },
  {
    t: "Te ofrecen entrar en una startup como inversionista ángel. Marca las tres banderas rojas.",
    doc: "Presentación y documentos societarios de una compañía en etapa temprana",
    pista: "En etapa temprana lo que compras es el equipo y las reglas del juego entre socios.",
    mal: [
      { t: "Los fundadores no tienen contrato de permanencia ni cláusula de dedicación exclusiva", x: "Puedes acabar siendo socio de una empresa cuyos fundadores se van a otra cosa el mes que viene. En etapa temprana la empresa son ellos." },
      { t: "No hay pacto de socios y ya son once accionistas", x: "Once dueños sin reglas escritas es un bloqueo garantizado en la primera decisión difícil, y una ronda siguiente casi imposible de cerrar." },
      { t: "El único cliente de referencia es una empresa del suegro de un fundador", x: "No es tracción, es un favor familiar. No demuestra que exista un mercado dispuesto a pagar." },
    ],
    ok: [
      { t: "Facturan poco pero el crecimiento mensual es consistente hace un año", x: "Poca facturación es normal en etapa temprana; lo que importa es la pendiente, y esa es buena." },
      { t: "El equipo técnico es propio y no subcontratado", x: "Tener el conocimiento dentro de casa es una fortaleza, sobre todo si el producto es el negocio." },
      { t: "Tienen la propiedad intelectual registrada a nombre de la sociedad", x: "Es exactamente como debe ser. La bandera sería que estuviera a nombre personal de un fundador." },
      { t: "Levantaron una ronda anterior con inversores conocidos", x: "Alguien con reputación ya hizo su propia revisión y puso dinero. No es garantía, pero suma." },
      { t: "Publican métricas mensuales a sus inversores", x: "Transparencia periódica desde el principio es una señal de cómo van a tratarte cuando algo salga mal." },
    ],
  },
  {
    t: "Un asesor te presenta un plan de inversión personal. Marca las tres banderas rojas.",
    doc: "Propuesta de inversión personal de un asesor financiero",
    pista: "Pregúntate siempre cómo cobra él y qué pasa si te equivocas.",
    mal: [
      { t: "Cobra por producto colocado y no te dice cuánto", x: "Si le pagan por venderte algo concreto, su recomendación no es un consejo, es una venta. Y si además lo oculta, ya sabes qué producto va a tocarte." },
      { t: "Te presiona para firmar hoy porque la ventana se cierra", x: "La urgencia es una técnica de venta, no una característica de las buenas inversiones. Lo que es bueno hoy sigue siéndolo el lunes." },
      { t: "Te propone concentrar el 80% en un solo producto de su propia casa", x: "Junta los dos peores defectos posibles: concentración extrema y conflicto de interés directo." },
    ],
    ok: [
      { t: "Te pide tu horizonte de inversión antes de proponer nada", x: "Es la primera pregunta que debe hacer cualquiera que vaya a recomendarte algo en serio." },
      { t: "Explica el coste total anual en euros, no solo en porcentaje", x: "Traducir la comisión a dinero contante es lo que casi nadie hace, precisamente porque asusta. Que lo haga es buena señal." },
      { t: "Sugiere mantener un fondo de emergencia aparte", x: "Está protegiendo tu liquidez antes que su comisión. Es lo correcto." },
      { t: "Te entrega el folleto informativo antes de la reunión", x: "Darte tiempo para leer con calma es lo contrario de la presión comercial." },
      { t: "Acepta que lo consultes con un tercero", x: "Quien no teme una segunda opinión suele ser porque no tiene nada que esconder." },
    ],
  },
  {
    t: "Contrato de compraventa de una participación minoritaria. Marca las tres banderas rojas.",
    doc: "Borrador de contrato de compraventa de acciones",
    pista: "Siendo minoritario, lo que te protege no es el precio: es lo que puedes hacer si te quieres salir.",
    mal: [
      { t: "No hay cláusula de arrastre ni de acompañamiento", x: "Si el mayoritario vende, te quedas dentro con un dueño nuevo que no elegiste y sin poder salir con él. Es la trampa clásica del minoritario." },
      { t: "El vendedor se reserva el derecho de vetar la distribución de dividendos", x: "Puedes ser dueño de algo rentable durante veinte años y no ver un céntimo, porque alguien más decide si se reparte." },
      { t: "Las cuentas que sirven de base no están auditadas y no hay ajuste por precio", x: "Estás fijando el precio sobre números que nadie verificó y renunciando a corregirlo después. Todo el riesgo de error es tuyo." },
    ],
    ok: [
      { t: "Hay periodo de garantía de dos años sobre las manifestaciones del vendedor", x: "Es protección para ti: si algo de lo que declaró era falso, tienes dos años para reclamarlo." },
      { t: "Se pacta un mecanismo de resolución de disputas", x: "Acordar de antemano cómo se resuelve un conflicto es señal de un contrato bien hecho." },
      { t: "El precio se ajusta por deuda neta y capital de trabajo", x: "Es el estándar de mercado y juega a tu favor: pagas por lo que realmente hay el día del cierre." },
      { t: "Se entrega la sala de datos completa antes de firmar", x: "Es lo mínimo exigible y aquí sí está ocurriendo." },
      { t: "Hay cláusula de no competencia por tres años", x: "Impide que el vendedor te cobre por el negocio y monte el mismo enfrente. Te protege a ti." },
    ],
  },
  {
    t: "Un cliente quiere que gestiones su patrimonio. Marca las tres banderas rojas.",
    doc: "Expediente de alta de un cliente de banca privada",
    pista: "Aquí las banderas no son de rentabilidad: son de origen del dinero y de trazabilidad.",
    mal: [
      { t: "El origen de una parte del dinero no está documentado", x: "Sin origen acreditado no puedes aceptarlo. La responsabilidad de haberlo comprobado es tuya, no suya." },
      { t: "Pide que las operaciones no queden a su nombre", x: "Querer ocultar la titularidad solo tiene un puñado de motivos y ninguno es bueno para quien firma como gestor." },
      { t: "Insiste en retirar en efectivo y en tramos justo por debajo del umbral de reporte", x: "Fraccionar para no activar el reporte tiene nombre propio y es delito. Que el patrón sea tan claro lo empeora." },
    ],
    ok: [
      { t: "Quiere revisar la cartera solo una vez al año", x: "Es una conducta excelente: mirar menos suele producir mejores resultados que mirar todos los días." },
      { t: "Tiene tolerancia al riesgo baja y lo dice claramente", x: "Un cliente que conoce y comunica su límite es el más fácil de servir bien." },
      { t: "Pregunta por los costes antes que por la rentabilidad", x: "Está preguntando por lo único seguro antes que por lo incierto. Sabe lo que hace." },
      { t: "Tiene el patrimonio repartido en tres entidades", x: "Es diversificación de riesgo de contraparte, una precaución sensata." },
      { t: "Quiere dejar una parte a sus nietos", x: "Es una preferencia de horizonte y de sucesión, perfectamente normal." },
    ],
  },
  {
    t: "Empresa familiar en venta. Marca las tres banderas rojas.",
    doc: "Carpeta de venta de una compañía familiar de segunda generación",
    pista: "En una empresa familiar la línea entre la caja de la empresa y el bolsillo de la familia es lo primero que hay que mirar.",
    mal: [
      { t: "Los gastos personales de la familia pasan por la empresa", x: "El beneficio real no es el que ves, y una vez comprada esos gastos desaparecen o se convierten en un conflicto. Tampoco sabes qué más se coló ahí." },
      { t: "El proveedor clave trabaja sin contrato, todo de palabra", x: "Ese acuerdo era con el fundador, no con la empresa. El día que tú entras, puede evaporarse." },
      { t: "Dos hermanos están en litigio por la propiedad de las acciones", x: "Puedes acabar comprándole a alguien que un juez decida que no era el dueño. Se compra la demanda junto con la empresa." },
    ],
    ok: [
      { t: "El fundador quiere quedarse dos años en la transición", x: "Es lo que quieres: continuidad de relaciones y conocimiento durante el traspaso." },
      { t: "La empresa opera en sede propia", x: "Un activo inmobiliario dentro del perímetro; puede cambiar la valoración, no es un riesgo." },
      { t: "Los estados financieros están auditados", x: "Auditados es mejor que no auditados. Es una señal a favor." },
      { t: "Hay un gerente financiero externo a la familia", x: "Justo el contrapeso que suele faltar en una empresa familiar." },
      { t: "Están al día con sus obligaciones tributarias", x: "Sin deudas fiscales escondidas, que en este tipo de compras es una de las sorpresas más caras." },
    ],
  },
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
    ["Carry", "20% de la ganancia"],
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
  { id: 2, min: 0, max: 3, t: "El error ya salió por correo", x: "El modelo que se envió al cliente tiene la deuda neta mal sumada. La diferencia mueve el equity value casi 10%.",
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
  { id: 7, min: 1, max: 4, t: "Te llama un headhunter", x: "Una firma más grande ofrece 40% más de sueldo y el doble de horas.",
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
  { id: 16, min: 0, max: 6, t: "Tu primo y la cripto del momento", x: "Insiste todos los días. Dice que esta vez es distinto y que ya subió 300%.",
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
  { id: 23, min: 0, max: 6, t: "Devaluación de la noche a la mañana", x: "El tipo de cambio se mueve 40%. La mitad de tus supuestos quedaron viejos.",
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
  { id: 30, min: 0, max: 6, t: "Corrección fuerte en la pantalla", x: "El mercado abre 20% abajo. El teléfono no para y tu portafolio personal amanece flaco.",
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
  { id: 104, clave: true, min: 0, max: 6, t: "La posición que ya dio mucho", x: "Una posición de tu portafolio va 70% arriba. Todos los indicadores dicen cosas distintas.",
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
               parcial: { car: 5, rep: 4, cash: 5000, msg: "Se coloca el 80%. Aceptable, no memorable." },
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
  { id: 52, min: 0, max: 6, t: "Cierre contable de la compañía objetivo", x: "Los estados que te mandaron tienen ajustes de último minuto que cambian el EBITDA en un 12%.",
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
      { t: "Esperar a que se aclare la norma", d: { cash: -3500, cri: 4, msg: "La norma se aclara dos semanas después y para entonces ya perdiste 30% del poder de compra." } },
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

/* ---------- la formación, que en este juego sí cuenta ----------
   La cátedra aparece a lo largo de toda la carrera y siempre suma al
   contador de estudio, que es el que hace que los exámenes se pongan
   más difíciles. Estudiar dentro del juego tiene consecuencias. */
const E5 = [
  { id: 940, min: 0, max: 6, t: "Media hora antes de que llegue todo el mundo",
    x: "Llegas temprano y tienes la oficina para ti. Puedes adelantar el modelo que te pidieron para el viernes o abrir el manual que llevas semanas sin tocar.",
    o: [
      { t: "Sentarte a estudiar un tema a fondo", juego: "catedra", stat: "cri", res: {
        exito: { cri: 7, mod: 3, estudia: 14, msg: "Te sientas con un tema y lo entiendes de verdad. Esas medias horas son las que separan a los que ascienden." },
        parcial: { cri: 4, estudia: 8, msg: "Le dedicas la media hora. No queda todo claro y algo se te quedó." },
        fallo: { cri: 2, estudia: 4, ene: -2, msg: "Lees en diagonal pensando en otra cosa. Algo entra igual, poco." } } },
      { t: "Adelantar el trabajo del viernes", d: { car: 6, rep: 2, ene: -3, msg: "Entregas antes de tiempo. Te lo reconocen y el manual sigue sin abrirse." } },
    ] },
  { id: 941, min: 1, max: 6, t: "La certificación",
    x: "El equipo paga la mitad de un programa de formación. Son seis meses de clases los sábados y un examen que reprueba a la mitad.",
    o: [
      { t: "Presentarte al examen", juego: "catedra", stat: "cri", res: {
        exito: { cri: 9, mod: 5, car: 8, estudia: 22, cash: -900, msg: "Apruebas. La certificación abre puertas que no sabías que estaban cerradas." },
        parcial: { cri: 5, estudia: 12, cash: -900, ene: -4, msg: "Apruebas raspando en la segunda convocatoria. Cuenta igual." },
        fallo: { cri: 2, estudia: 6, cash: -900, ene: -6, rep: -2, msg: "No apruebas. Pierdes seis sábados y el dinero, y sabes bastante más que antes." } } },
      { t: "Este año no, ya vas ahogado", d: { ene: 6, car: -3, msg: "Lo dejas para el año que viene. Como el año pasado." } },
    ] },
  { id: 942, min: 2, max: 6, t: "Te toca explicarlo tú",
    x: "El socio te pide que le expliques a los pasantes cómo funciona lo que el equipo hace todos los días. No hay mejor forma de descubrir lo que no entiendes que tener que explicarlo.",
    o: [
      { t: "Preparártelo en serio y darlo tú", juego: "catedra", stat: "cri", res: {
        exito: { cri: 8, rep: 6, red: 5, estudia: 18, msg: "Lo explicas con claridad y sin trampas. Media oficina se entera de que sabes." },
        parcial: { cri: 4, rep: 2, estudia: 10, msg: "Sales del paso. Te trabas en una pregunta y aprendes justamente de esa." },
        fallo: { cri: 2, rep: -4, estudia: 6, msg: "Se nota que no lo dominabas. Es incómodo y es la clase de golpe que hace estudiar." } } },
      { t: "Pasárselo a otro del equipo", d: { ene: 4, rep: -2, red: -2, msg: "Se lo pasas a un compañero. Él queda bien delante del socio." } },
    ] },
  { id: 943, min: 0, max: 4, t: "Alguien te pregunta algo básico",
    x: "Un amigo fuera del sector te pregunta dónde debería meter sus ahorros. Te das cuenta a media frase de que no sabes explicarlo sin usar palabras que él no entiende.",
    o: [
      { t: "Repasarlo hasta poder explicarlo en cristiano", juego: "catedra", stat: "cri", res: {
        exito: { cri: 7, red: 4, estudia: 12, msg: "Se lo explicas sin una sola palabra técnica. Si puedes hacer eso, lo entiendes." },
        parcial: { cri: 4, estudia: 7, msg: "Te acercas. Sigues necesitando dos tecnicismos para llegar al final." },
        fallo: { cri: 1, estudia: 3, msg: "Le sueltas la jerga de la oficina y se queda igual que antes. Vosotros dos aprendéis lo mismo: nada." } } },
      { t: "Mandarle el nombre de un fondo y ya", d: { red: -2, cri: -2, msg: "Le pasas un nombre sin explicación. Es lo que hace casi todo el mundo y es la razón por la que casi nadie entiende dónde tiene su dinero." } },
    ] },
];
E.push.apply(E, E5);

/* ---------- el criterio de inversión, que se entrena ---------- */
const E6 = [
  { id: 950, min: 3, max: 6, t: "Tres carpetas y un solo cheque",
    x: "El comité tiene capital para una operación y tres candidatas sobre la mesa. Cada una brilla por un lado distinto y falla por otro. Te piden la recomendación.",
    o: [
      { t: "Estudiar los tres negocios y recomendar uno", juego: "comite", stat: "cri", res: {
        exito: { cri: 8, rep: 6, car: 8, cash: 900, estudia: 10, msg: "Recomendaste el bueno y lo defendiste con los números. Eso es lo que hace que te sigan preguntando." },
        parcial: { cri: 4, rep: 2, car: 3, estudia: 6, msg: "Tu recomendación era razonable. Había una mejor y alguien en la sala la vio." },
        fallo: { cri: 3, rep: -5, cash: -1200, estudia: 6, msg: "Recomendaste el peor de los tres. Se compró, y dos años después se supo por qué era el peor." } } },
      { t: "Decir que ninguno vale la pena", chk: { s: "cri", dif: 60 },
        ok: { cri: 6, rep: 4, msg: "Te plantas y no recomiendas ninguno. Pasar es una decisión y a veces la correcta: el comité lo respeta." },
        no: { rep: -4, car: -3, msg: "Pasas de las tres. Una de ellas triplicó en cuatro años y alguien se acordó de que tú dijiste que no." } },
    ] },
  { id: 951, min: 4, max: 6, t: "El nuevo analista quiere aprender",
    x: "El más joven del equipo te pregunta cómo se sabe si un negocio es bueno. Lo más rápido es enseñárselo con tres carpetas encima de la mesa.",
    o: [
      { t: "Sentarte con él y decidir juntos", juego: "comite", stat: "cri", res: {
        exito: { cri: 6, red: 5, rep: 4, estudia: 12, msg: "Le explicas por qué el que más crece no era el mejor. Se le queda para siempre, y a ti también." },
        parcial: { cri: 3, red: 3, estudia: 7, msg: "Lo resuelven a medias. Aprende algo, aunque no lo más importante." },
        fallo: { cri: 2, rep: -2, estudia: 6, msg: "Escoges mal delante de él. Al menos aprendéis los dos, por el camino caro." } } },
      { t: "Mandarle un libro y volver a lo tuyo", d: { car: 3, red: -3, msg: "Le pasas un libro. Es mejor que nada y bastante peor que media hora tuya." } },
    ] },
];
E.push.apply(E, E6);

/* ============================================================
   LA VIDA QUE PASA MIENTRAS TRABAJAS
   Un simulador de carrera que solo habla de sueldos y carteras miente
   por omisión. Aquí entran las cosas que de verdad mueven el dinero de
   una persona: con quién vives, cuánta gente depende de ti, quién se
   enferma, quién se muere y quién te estafa.

   Cada escena tiene rango de edad, condiciones de estado y, casi
   siempre, un coste que no aparece en ninguna hoja de cálculo.
   Campos: eMin y eMax son edades, no rangos de carrera. "una" marca
   las que solo pueden ocurrir una vez en la partida.
   ============================================================ */

/* estados de pareja: solo · noviazgo · casado · divorciado · viudo */

const VIDA = [
  /* ---------------- veinte y pico ---------------- */
  {
    id: 9001, eMin: 21, eMax: 34, una: true, cuando: (st) => st.pareja === "solo",
    t: "Alguien que te importa", clave: false,
    x: "Llevas meses viendo a alguien. No es una decisión financiera y aun así lo es: el tiempo que dedicas, la ciudad en la que decides quedarte y la cantidad de fines de semana que no pasas trabajando salen todos del mismo presupuesto.",
    o: [
      { t: "Ir en serio con esta persona", d: { pareja: "noviazgo", ene: 8, rep: 2, cash: -600, msg: "Empiezas una relación seria. Ganas red de apoyo y pierdes fines de semana de oficina." } },
      { t: "Dejarlo estar, este año no es el año", d: { car: 6, ene: -6, msg: "Eliges la carrera. Funciona, y algunas noches te preguntas si valía la pena." } },
    ],
  },
  {
    id: 9002, eMin: 22, eMax: 30, una: true,
    t: "La boda de tu mejor amigo", clave: false,
    x: "Te pide que seas padrino. La boda es en otro país, hay despedida, hay traje, hay regalo. Nadie te está obligando y todo el mundo espera que vayas.",
    o: [
      { t: "Ir a todo, es una vez en la vida", d: { cash: -1800, red: 8, ene: 5, msg: "Vas a todo. Te cuesta un mes de ahorro y te llevas una red que te va a servir veinte años." } },
      { t: "Ir solo a la boda, saltarte la despedida", d: { cash: -700, red: 4, msg: "Vas a lo importante y te ahorras lo demás. Nadie te lo reprocha." } },
      { t: "No puedes permitírtelo y lo dices", d: { cash: -150, red: -4, rep: -2, ene: -3, msg: "Mandas el regalo y una nota. Es la decisión correcta y de todas formas duele." } },
    ],
  },
  {
    id: 9003, eMin: 22, eMax: 33, una: true,
    t: "Irte a vivir solo", clave: false,
    x: "Puedes seguir en casa de tus padres y ahorrar como nunca vas a poder ahorrar otra vez, o mudarte y empezar a pagar por tu propio espacio.",
    o: [
      { t: "Mudarte, necesitas tu espacio", d: { cash: -2500, ene: 10, rep: 3, msg: "Te mudas. Vives mejor y tu tasa de ahorro se desploma; las dos cosas son verdad a la vez." } },
      { t: "Quedarte dos años más y ahorrar", d: { cash: 1500, ene: -8, car: 4, msg: "Te quedas. Es lo más rentable que vas a hacer en la década y no se lo cuentas a nadie." } },
    ],
  },
  {
    id: 9004, eMin: 23, eMax: 40,
    t: "El negocio de un conocido", clave: false,
    x: "Un amigo del gimnasio te habla de una importadora. Números redondos, márgenes que él llama conservadores y una urgencia que no termina de explicar. No hay estados financieros, hay un PDF con fotos.",
    o: [
      { t: "Meter un ticket pequeño, por la amistad", chk: { s: "cri", dif: 42 },
        ok: { cash: 1400, cri: 3, msg: "Contra todo pronóstico el negocio funciona y te devuelve con ganancia. No lo confundas con criterio." },
        no: { cash: -2200, red: -3, cri: 5, msg: "El negocio nunca arrancó y tu amigo dejó de contestar. La lección costó lo que costó." } },
      { t: "Pedirle estados financieros auditados", d: { cri: 6, red: -2, msg: "Pides papeles. Se ofende, deja de insistir, y seis meses después el asunto se desinfla solo." } },
      { t: "No, y sin explicaciones largas", d: { cri: 4, msg: "Dices que no. Es la respuesta correcta la mayoría de las veces y casi nadie la da." } },
    ],
  },

  /* ---------------- treinta ---------------- */
  {
    id: 9010, pri: 3, eMin: 26, eMax: 42, una: true, cuando: (st) => st.pareja === "noviazgo",
    t: "La conversación", clave: true,
    x: "Llevan años. La pregunta ya no es si se quieren, es si van a construir algo en común: cuentas, casa, planes que no se pueden deshacer con una llamada.",
    o: [
      { t: "Casarte", d: { pareja: "casado", ene: 10, rep: 5, red: 6, cash: -4500, msg: "Te casas. La boda cuesta lo que cuesta y el hogar de dos ingresos cambia tus números para bien." } },
      { t: "Seguir juntos sin firmar nada", d: { ene: 4, msg: "Siguen igual. Funciona, y en algún momento uno de los dos va a volver a sacar el tema." } },
      { t: "Se acabó", d: { pareja: "solo", ene: -14, rep: -2, cash: -1200, car: 4, msg: "Lo dejan. Te vuelcas en el trabajo, que es lo que hace todo el mundo y ayuda menos de lo que parece." } },
    ],
  },
  {
    id: 9011, pri: 1, eMin: 24, eMax: 45, cuando: (st) => st.pareja === "noviazgo",
    t: "Se rompió", clave: false,
    x: "No hubo un motivo grande. Hubo dos años de horarios imposibles, viajes que no cancelaste y una conversación pendiente que nunca tuvo un buen momento.",
    o: [
      { t: "Aceptarlo y seguir", d: { pareja: "solo", ene: -12, cash: -900, car: 5, msg: "Se termina. Trabajas más que nunca durante seis meses y tus números del año salen bien." } },
      { t: "Pelear por la relación: terapia, menos horas", d: { ene: -4, car: -8, cash: -1500, rep: -2, msg: "Reduces el ritmo y arreglas lo que se podía arreglar. En la oficina lo notan y no todos lo entienden." } },
    ],
  },
  {
    id: 9012, pri: 3, eMin: 27, eMax: 44, una: true, cuando: (st) => st.pareja === "casado" && st.hijos === 0,
    t: "Un hijo", clave: true,
    x: "La decisión que más cambia un presupuesto y la que menos se analiza con una hoja de cálculo. Guardería, seguro, espacio, y una redefinición completa de qué significa una noche libre.",
    o: [
      { t: "Adelante", d: { hijos: 1, ene: -10, cash: -3500, rep: 3, msg: "Nace tu primer hijo. Tus gastos fijos suben para siempre y tu escala de prioridades se reordena sola." } },
      { t: "Todavía no", d: { ene: 4, car: 6, msg: "Lo posponen. Es una decisión legítima y también es una decisión, aunque no lo parezca." } },
    ],
  },
  {
    id: 9013, pri: 3, eMin: 30, eMax: 46, cuando: (st) => st.pareja === "casado" && st.hijos >= 1 && st.hijos < 3,
    t: "El segundo", clave: false,
    x: "El primero ya camina. La pregunta vuelve, y esta vez sabes exactamente lo que cuesta, en dinero y en horas de sueño.",
    o: [
      { t: "Otro más", d: { hijos: 1, ene: -12, cash: -3000, msg: "Llega el segundo. La guardería ya no es un gasto, es una segunda hipoteca." } },
      { t: "Con uno está bien", d: { ene: 3, cash: 500, msg: "Se quedan con uno. Menos gasto, menos ruido y una conversación que vuelve cada dos años." } },
    ],
  },
  {
    id: 9014, eMin: 28, eMax: 50, cuando: (st) => st.hijos >= 1,
    t: "El colegio", clave: false,
    x: "Toca elegir. El colegio bueno cuesta lo que un carro al año, cada año, durante doce años. El colegio normal es un colegio normal y probablemente esté bien.",
    o: [
      { t: "El colegio caro, es su futuro", d: { cash: -6000, rep: 4, ene: -4, msg: "Los matriculas en el colegio caro. Es la decisión que más gente toma con el corazón y menos gente recalcula después." } },
      { t: "Colegio público bueno y el resto invertido para ellos", d: { cash: -800, cri: 5, msg: "Eliges lo razonable e inviertes la diferencia a su nombre. En dieciocho años esa diferencia es una carrera universitaria pagada." } },
    ],
  },
  {
    id: 9015, eMin: 29, eMax: 52, una: true,
    t: "Una empresa que no existe", clave: true,
    x: "Te llega por un contacto de confianza: una empresa con rendimientos del 4% mensual, auditada por una firma que nadie conoce y con una web impecable. El contacto lleva dos años cobrando puntual y te enseña los recibos.",
    o: [
      { t: "Meter una parte seria, tu contacto lleva dos años cobrando", chk: { s: "cri", dif: 62 },
        ok: { cri: 8, cash: -400, msg: "Algo te huele mal a última hora y solo metes una cantidad simbólica. Nueve meses después la empresa desaparece con el dinero de todos." },
        no: { cash: -9000, cri: 10, rep: -4, ene: -8, msg: "La empresa desaparece. Tu contacto cobraba puntual porque le pagaban con el dinero de los que entraban después, y tú fuiste de los últimos." } },
      { t: "Pedir el registro mercantil y el nombre del auditor", d: { cri: 8, msg: "Pides papeles verificables. Las respuestas llegan tarde, vagas y con reproches. Eso ya es la respuesta." } },
      { t: "4% mensual no existe. No.", d: { cri: 6, red: -2, msg: "Dices que no y explicas por qué. Dos años después te llaman varios de los que sí entraron." } },
    ],
  },

  /* ---------------- cuarenta ---------------- */
  {
    id: 9020, pri: 1, eMin: 33, eMax: 55, cuando: (st) => st.pareja === "casado",
    t: "El desgaste", clave: true,
    x: "Llevan años funcionando como una sociedad logística: turnos, colegio, cuentas. Hace mucho que no hay una conversación que no sea sobre organización.",
    o: [
      { t: "Parar, terapia de pareja, reducir el ritmo laboral", d: { ene: 8, car: -10, cash: -2200, msg: "Frenas. La relación aguanta y tu carrera pierde un año de impulso. Es un intercambio, no un error." } },
      { t: "Seguir así, ya se arreglará", chk: { s: "ene", dif: 55 },
        ok: { ene: -6, msg: "Aguanta. No por lo que hiciste, sino porque la otra persona tuvo más paciencia de la que merecías." },
        no: { pareja: "divorciado", patPct: 0.35, ene: -18, rep: -3, msg: "Divorcio. Además del golpe, se reparte el patrimonio: es el evento que más riqueza destruye en una vida normal." } },
    ],
  },
  {
    id: 9021, eMin: 35, eMax: 58, una: true,
    t: "Tu padre ya no puede solo", clave: true,
    x: "La llamada llega un martes. No es una emergencia médica, es algo peor de gestionar: alguien que siempre se ocupó de todo ahora necesita que alguien se ocupe de él.",
    o: [
      { t: "Traerlo a vivir contigo", d: { cash: -3500, ene: -10, rep: 4, msg: "Se muda contigo. Tus gastos suben, tu energía baja y no te arrepientes ni un día." } },
      { t: "Pagar una residencia buena", d: { cash: -9000, ene: -4, msg: "Pagas la residencia. Es la opción cara y la que te deja seguir trabajando, y la culpa no la cubre ningún seguro." } },
      { t: "Repartirlo entre los hermanos", d: { cash: -3000, ene: -6, red: -3, msg: "Lo reparten. Funciona a medias y saca a la luz cuentas pendientes de hace treinta años." } },
    ],
  },
  {
    id: 9022, eMin: 38, eMax: 60, una: true,
    t: "Se murió", clave: true,
    x: "Alguien cercano, de los que dabas por hecho que iban a estar siempre. No hay decisión financiera aquí, y aun así el año se rompe en dos.",
    o: [
      { t: "Parar todo y estar presente", d: { ene: -14, car: -6, cash: -1800, cri: 4, msg: "Paras. Pierdes un trimestre de carrera y ganas una perspectiva que no se compra." } },
      { t: "Enterrarte en el trabajo", d: { ene: -18, car: 8, rep: 2, msg: "Trabajas más que nunca. Los números del año salen bien y el duelo te va a pasar factura más tarde." } },
    ],
  },
  {
    id: 9023, eMin: 36, eMax: 62, cuando: (st) => st.pareja === "divorciado" || st.pareja === "solo",
    t: "Empezar otra vez", clave: false,
    x: "Conoces a alguien. A estas alturas tienes un historial, una idea bastante clara de lo que no quieres y bastante más patrimonio que la última vez que hiciste esto.",
    o: [
      { t: "Ir en serio, y esta vez con las cuentas claras", d: { pareja: "casado", ene: 10, red: 4, cash: -2500, cri: 4, msg: "Te vuelves a casar, con capitulaciones y conversaciones que la primera vez no tuviste." } },
      { t: "Sin etiquetas, cada uno con lo suyo", d: { pareja: "noviazgo", ene: 7, msg: "Van despacio. A esta edad la gente que ha visto un divorcio va despacio." } },
      { t: "Estás bien solo", d: { ene: 3, cash: 900, msg: "Prefieres estar solo. Gastas menos, decides más rápido y algunos domingos se hacen largos." } },
    ],
  },
  {
    id: 9024, eMin: 40, eMax: 62, una: true, cuando: (st) => st.hijos >= 1,
    t: "La universidad de tus hijos", clave: true,
    x: "Entró donde quería y está fuera del país. Cuatro años, matrícula y manutención. Puedes pagarlo con lo que tienes invertido o puede pedir un préstamo y pagarlo él.",
    o: [
      { t: "Pagarlo todo tú", d: { cash: -28000, ene: -5, rep: 4, msg: "Lo pagas entero. Es un golpe grande a tu patrimonio y para muchos padres ni siquiera es una decisión." } },
      { t: "Pagar la mitad, la otra mitad la trabaja", d: { cash: -14000, cri: 5, msg: "Pagan a medias. Aprende lo que cuesta y tú no comprometes tu propia jubilación." } },
      { t: "Que pida crédito, tú ya pagaste doce años de colegio", d: { cash: -2000, ene: -4, rep: -3, msg: "Pide crédito. Tienes razón en los números y la conversación de Navidad va a ser incómoda un par de años." } },
    ],
  },
  {
    id: 9025, eMin: 34, eMax: 64,
    t: "El chequeo que llevabas años posponiendo", clave: false,
    x: "No es nada grave. Es tensión alta, colesterol y un médico que usa la palabra 'todavía' más veces de las que te gustaría.",
    o: [
      { t: "Cambiar de vida en serio", d: { ene: 16, car: -5, cash: -1600, msg: "Cambias hábitos. Duermes, entrenas, y tu energía deja de ser el cuello de botella de todo lo demás." } },
      { t: "Tomar la pastilla y seguir igual", d: { ene: -8, cash: -400, msg: "Medicas el síntoma. Funciona hasta que deja de funcionar." } },
    ],
  },

  /* ---------------- estafas y trampas, a cualquier edad ---------------- */
  {
    id: 9030, eMin: 24, eMax: 66,
    t: "Rendimiento garantizado", clave: false,
    x: "Un asesor con oficina bonita te ofrece un producto estructurado con capital garantizado y participación en la subida. Te habla veinte minutos sin decir cuánto cobra él.",
    o: [
      { t: "Preguntar directamente cuánto se lleva él y cómo", d: { cri: 7, msg: "Preguntas por la comisión. Se pone incómodo, y en ese silencio está toda la información que necesitabas." } },
      { t: "Entrar, suena bien y el capital está garantizado", chk: { s: "cri", dif: 48 },
        ok: { cri: 5, cash: -300, msg: "Lees la letra pequeña a tiempo: la garantía solo aplica a vencimiento y a diez años. Sales con una comisión de salida y una lección." },
        no: { cash: -5500, cri: 8, msg: "El producto rinde la mitad que un índice y te cobra tres veces más. La garantía era real y valía mucho menos de lo que costó." } },
    ],
  },
  {
    id: 9031, eMin: 26, eMax: 66,
    t: "Un negocio con un familiar", clave: false,
    x: "Tu cuñado tiene la oportunidad de su vida y le falta capital. Es familia, es de fiar, y no hay contrato porque para qué entre familia.",
    o: [
      { t: "Prestar con contrato, plazo y garantía", d: { cash: -3000, cri: 6, red: -2, msg: "Prestas con papeles. Se ofende dos meses y te paga. Los papeles no protegen del riesgo, protegen la relación." } },
      { t: "Prestar sin papeles, es familia", chk: { s: "red", dif: 55 },
        ok: { cash: -1200, msg: "Te devuelve casi todo, tarde. Salió bien y no fue por cómo lo hiciste." },
        no: { cash: -4500, red: -6, ene: -6, msg: "No te paga. No hay contrato, no hay conversación posible y hay una familia partida en dos." } },
      { t: "No prestar, y ofrecer ayuda de otra forma", d: { red: -3, cri: 5, ene: -2, msg: "Dices que no al dinero y sí al tiempo. Es lo que sostiene la relación a diez años." } },
    ],
  },
  {
    id: 9032, eMin: 25, eMax: 66,
    t: "Te clonaron la identidad", clave: false,
    x: "Aparecen dos créditos a tu nombre que nunca pediste. El banco dice que investigará. Investigar, aquí, significa entre tres y nueve meses.",
    o: [
      { t: "Abogado y denuncia formal desde el día uno", d: { cash: -2200, rep: 3, cri: 4, msg: "Actúas rápido y formal. Recuperas casi todo y tu historial queda limpio antes de que te haga falta." } },
      { t: "Gestionarlo tú por teléfono para ahorrarte el abogado", d: { cash: -3800, ene: -8, msg: "Pierdes ocho meses en llamadas. Al final se resuelve y el ahorro en abogado se lo comió el tiempo." } },
    ],
  },
  {
    id: 9033, eMin: 28, eMax: 66,
    t: "La oportunidad que solo dura hoy", clave: false,
    x: "Un grupo cerrado, una preventa, una ventana de cuarenta y ocho horas y gente que ya está dentro publicando capturas de ganancias. Todo el diseño de la cosa está hecho para que no te dé tiempo de pensar.",
    o: [
      { t: "Dejarlo pasar: la prisa es parte del producto", d: { cri: 8, msg: "No entras. Las oportunidades legítimas rara vez caducan en cuarenta y ocho horas, y las que caducan casi nunca son legítimas." } },
      { t: "Entrar con poco, por si acaso", chk: { s: "cri", dif: 52 },
        ok: { cash: 700, cri: 2, msg: "Sales a tiempo con algo de ganancia. Confundir esto con habilidad es exactamente cómo se pierde más la próxima vez." },
        no: { cash: -3200, cri: 7, msg: "Entras cerca del máximo y no hay a quién venderle después. Así funciona la estructura desde el principio." } },
    ],
  },
  {
    id: 9034, eMin: 30, eMax: 66, una: true,
    t: "Un socio que firmaba por los dos", clave: true,
    x: "En un proyecto paralelo diste poder de firma a alguien de confianza. Aparecen obligaciones a nombre de la sociedad que tú nunca aprobaste y que, legalmente, también son tuyas.",
    o: [
      { t: "Asumir, pagar y disolver limpio", d: { cash: -7000, rep: 3, cri: 8, msg: "Pagas y cierras. Te cuesta caro y sales con el nombre intacto, que en esta industria vale más." } },
      { t: "Pelearlo en tribunales", chk: { s: "rep", dif: 58 },
        ok: { cash: -2500, rep: -2, cri: 6, msg: "Ganas parcialmente después de dos años. Recuperas dinero y pierdes dos años de foco." },
        no: { cash: -9000, rep: -8, ene: -8, msg: "Pierdes el caso y el proceso se hace público. En finanzas los procesos públicos se recuerdan más que las sentencias." } },
    ],
  },

  /* ---------------- cosas buenas, que también pasan ---------------- */
  {
    id: 9040, eMin: 24, eMax: 66,
    t: "Una herencia pequeña", clave: false,
    x: "Una tía que veías poco te deja algo. No es una fortuna, es exactamente la cantidad que puede cambiar tu década o desaparecer en dieciocho meses sin dejar rastro.",
    o: [
      { t: "Invertirla entera y no tocarla", d: { cash: 12000, cri: 6, msg: "La inviertes completa. Es la decisión aburrida y es la que se nota veinte años después." } },
      { t: "Mitad invertida, mitad para vivir", d: { cash: 6000, ene: 8, msg: "Repartes. Disfrutas algo y conservas algo, que es la respuesta humana y no está mal." } },
      { t: "Cambiar el carro", d: { cash: 1000, ene: 10, rep: 3, cri: -3, msg: "Te compras el carro. Te dura tres años de alegría y el resto de la década de depreciación." } },
    ],
  },
  {
    id: 9041, eMin: 30, eMax: 66, cuando: (st) => st.hijos >= 1,
    t: "Tu hijo pregunta cómo funciona el dinero", clave: false,
    x: "Tiene ocho años y quiere saber por qué no puedes comprar todo lo que hay en la tienda si tienes una tarjeta que da dinero.",
    o: [
      { t: "Explicárselo de verdad, con una alcancía y porcentajes", d: { cri: 6, ene: 5, rep: 2, msg: "Te sientas a explicárselo. Es probablemente la mejor inversión financiera que vas a hacer este año." } },
      { t: "\"Cuando seas grande lo entiendes\"", d: { ene: 2, msg: "Lo dejas pasar. Es exactamente lo que hicieron contigo y por eso tuviste que aprender todo esto tarde." } },
    ],
  },
];

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
    x: (c) => `De cada dólar que entró este año te quedaste con ${Math.round(c.ahorro * 100)} centavos. A los veinte, esa proporción decide más tu patrimonio final que cualquier acción que elijas: el que ahorra 20% y rinde seis termina mejor que el que ahorra cinco y rinde doce.` },
  { id: "compuesto", pri: 8, cuando: (c) => c.cartera > 3000 && c.turno <= 12,
    t: "Interés compuesto, en tus números",
    x: (c) => `Tus ${fmt(c.cartera)} al ${(c.muC * 100).toFixed(1)}% esperado serían cerca de ${fmt(c.cartera * Math.pow(1 + c.muC, 10))} en diez años sin poner un dólar más, y ${fmt(c.cartera * Math.pow(1 + c.muC, 20))} en veinte. No hace falta acertar nada: hace falta no interrumpirlo.` },
  { id: "colchon", pri: 8, cuando: (c) => c.cash < c.gastos * 0.2 && c.turno >= 1,
    t: "Te quedaste sin colchón",
    x: (c) => `Tienes ${fmt(c.cash)} líquidos contra gastos de ${fmt(c.gastos)} al año, o sea menos de tres meses. Sin colchón, cualquier imprevisto te obliga a vender cartera justo cuando el mercado está mal. Esa venta forzada es la que de verdad hace daño.` },
  { id: "exceso", pri: 7, cuando: (c) => c.objetivo <= 0.35 && c.cash > c.gastos * 1.2 && c.turno >= 2,
    t: "Demasiado quieto en efectivo",
    x: (c) => `Dejaste ${fmt(c.cash)} sin invertir, más de un año de gastos. El efectivo rinde cerca de 2% y la inflación se lo come. Sentirse seguro y estar seguro no son lo mismo: la cuenta corriente tiene riesgo, solo que no se ve en el estado de cuenta.` },
  { id: "conc", pri: 9, cuando: (c) => c.conc.max >= 0.5,
    t: "Estás concentrado",
    x: (c) => `${Math.round(c.conc.max * 100)}% de tu cartera está en ${c.conc.activo.n.toLowerCase()}. Concentrarse es la forma más rápida de hacerse rico y también la más rápida de dejar de serlo. Si esa posición cae la mitad, tu patrimonio se lleva ${Math.round(c.conc.max * 50)}% del golpe.` },
  { id: "cripto", pri: 8, cuando: (c) => (c.pesos.cripto || 0) >= 0.2,
    t: "El tamaño de la apuesta",
    x: (c) => `Llevas ${Math.round((c.pesos.cripto || 0) * 100)}% en cripto. Un activo que puede caer 70% no se mide por su retorno esperado sino por cuánto de tu patrimonio aguanta ese escenario sin que cambies de estrategia a mitad del camino.` },
  { id: "vol", pri: 10, cuando: (c) => c.ret <= -0.09,
    t: "Volatilidad no es pérdida",
    x: (c) => `Perdiste ${Math.abs(c.ret * 100).toFixed(1)}% este año, unos ${fmt(Math.abs(c.deltaC))}. Con una cartera de tu perfil, un año así entra dentro de lo esperado: la desviación es ${(c.sdC * 100).toFixed(1)} puntos. La pérdida se hace definitiva solo si vendes ahora.` },
  { id: "recup", pri: 8, cuando: (c) => c.ret <= -0.15,
    t: "La aritmética de las caídas",
    x: (c) => `Caer ${Math.abs(c.ret * 100).toFixed(0)}% exige subir ${((1 / (1 + c.ret) - 1) * 100).toFixed(0)} para volver al punto de partida. Por eso se cuida la caída máxima antes que el retorno: las pérdidas y las ganancias no son simétricas.` },
  { id: "buen", pri: 5, cuando: (c) => c.ret >= 0.16,
    t: "Cuidado con el año bueno",
    x: (c) => `Ganaste ${(c.ret * 100).toFixed(1)}%. El riesgo ahora es concluir que tu criterio es excelente y subir la apuesta. Un año no distingue habilidad de suerte: para eso hacen falta muchos, y aún así cuesta.` },
  { id: "gasto", pri: 9, cuando: (c) => c.gastoAnt > 0 && c.gastos > c.gastoAnt * 1.16,
    t: "El gasto persigue al sueldo",
    x: (c) => `Tus gastos pasaron de ${fmt(c.gastoAnt)} a ${fmt(c.gastos)}, casi ${Math.round((c.gastos / c.gastoAnt - 1) * 100)}% más. Es lo normal cuando sube el ingreso, y es la razón por la que gente que gana mucho no acumula nada. Cada dólar de gasto fijo nuevo son veinticinco dólares que necesitas para poder dejar de trabajar.` },
  { id: "consumo", pri: 7, cuando: (c) => c.consumo > c.patrimonio * 0.12 && c.consumo > 20000,
    t: "Lo que compraste no es patrimonio",
    x: (c) => `Llevas ${fmt(c.consumo)} en cosas que no se recuperan y encima cuestan mantener. No es un error, es una decisión: solo conviene saber que ese dinero no está trabajando y que su mantenimiento se paga todos los años.` },
  { id: "renta", pri: 6, cuando: (c) => c.rentaProps > 0,
    t: "Ingreso que no depende de ti",
    x: (c) => `Tus propiedades te dejaron ${fmt(c.rentaProps)} sin que fueras a la oficina, es decir ${Math.round(c.rentaProps / c.gastos * 100)}% de tu costo de vida. Ese es el número que de verdad importa: qué parte de tu vida se paga sola.` },
  { id: "cobertura", pri: 9, cuando: (c) => c.cobertura >= 0.25 && c.cobertura < 1,
    t: "Vas por el camino",
    x: (c) => `Tu patrimonio ya cubre ${Math.round(c.cobertura * 100)}% de lo que gastas al año si retiras el 4%. Para llegar a cien te faltan cerca de ${fmt(Math.max(0, c.gastos * 25 - c.patrimonio))}. Bajar el gasto acorta esa distancia más rápido que subir el retorno.` },
  { id: "libre", pri: 10, cuando: (c) => c.cobertura >= 1,
    t: "Ya no trabajas por necesidad",
    x: (c) => `Con ${fmt(c.patrimonio)} y un retiro del 4% cubres tus ${fmt(c.gastos)} de gastos. Desde aquí trabajar es una elección. La trampa que sigue es subir el nivel de vida hasta volver a necesitar el sueldo.` },
  { id: "impuesto", pri: 5, cuando: (c) => c.impuesto > c.ingreso * 0.2,
    t: "El socio silencioso",
    x: (c) => `Pagaste ${fmt(c.impuesto)} de impuesto, ${Math.round(c.impuesto / c.ingreso * 100)}% de todo lo que entró. Antes de buscar un punto extra de retorno vale revisar la estructura fiscal: ahí suele haber más dinero y con mucho menos riesgo.` },
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
    x: (c) => `Cruzaste el millón. Lo interesante es lo que viene: al ${(c.muC * 100).toFixed(1)}% esperado, tu cartera sola genera cerca de ${fmt(c.cartera * c.muC)} al año, comparado con tu sueldo de ${fmt(c.salario)}. A partir de cierto punto el capital trabaja más que tú.` },
  { id: "fondo", pri: 8, cuando: (c) => c.fondo && c.turno >= 12,
    t: "Comisiones del otro lado",
    x: (c) => `Tu fondo te paga 2% sobre ${fmt(c.fondo.tam)} todos los años sin importar cómo rinda, más 20% de las ganancias. Ahora lo ves desde el lado del gestor: por eso el negocio es levantar capital, y por eso al invertir hay que mirar la comisión antes que el track record.` },
  { id: "sueldo", pri: 8, cuando: (c) => c.turno <= 6 && c.cartera < c.salario,
    t: "Tu mayor activo eres tú",
    x: (c) => `Tu cartera son ${fmt(c.cartera)} y tu sueldo ${fmt(c.salario)} al año. A esta edad el retorno más alto disponible no está en el mercado: está en volverte más caro de reemplazar. Ese es el activo que compone más rápido en la primera década.` },
  { id: "burnout", pri: 10, cuando: (c) => c.ene <= 25,
    t: "El activo que no aparece en el balance",
    x: (c) => `Tu energía está en ${Math.round(c.ene)} de cien. Nada de esto sirve si te rompes a los cuarenta: el capital humano se deprecia sin mantenimiento igual que un galpón, solo que nadie te lo factura hasta que ya pasó.` },
  { id: "ladrillo", pri: 8, cuando: (c) => c.bienesV > c.patrimonio * 0.55 && c.patrimonio > 100000,
    t: "Patrimonio en ladrillo",
    x: (c) => `${Math.round(c.bienesV / c.patrimonio * 100)}% de lo que tienes está en inmuebles y bienes. Rinden y aprecian, pero no se venden en una semana ni por partes. La iliquidez no se siente hasta el día que necesitas efectivo.` },
  { id: "mantener", pri: 6, cuando: (c) => c.mantenimiento > c.gastos * 0.2,
    t: "Lo que cuesta mantener lo que tienes",
    x: (c) => `Mantener tus bienes te cuesta ${fmt(c.mantenimiento)} al año, ${Math.round(c.mantenimiento / c.gastos * 100)}% de tu costo de vida. Cada compra grande trae un gasto fijo detrás, y el gasto fijo es lo que decide cuánto capital necesitas para dejar de trabajar.` },
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
    x: (c) => `Tu cartera tiene ${(c.sdC * 100).toFixed(0)} puntos de volatilidad y ya cubres ${Math.round(c.cobertura * 100)}% de tus gastos. Cuando el objetivo está a la vista, el riesgo deja de ser una herramienta y pasa a ser una amenaza: puedes perder lo que ya ganaste sin necesitarlo.` },
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
    x: (c) => `Tu cartera espera ${(c.muC * 100).toFixed(1)}% al año, pero casi ningún año va a dar eso. Este dio ${(c.ret * 100).toFixed(1)}. El promedio aparece al final del camino, no en el camino, y esa es la razón por la que la mayoría abandona antes de cobrarlo.` },
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
  if (!l) return null;
  let cuerpo;
  try { cuerpo = String(l.x(c)); } catch (e) { return null; }
  if (!cuerpo || cuerpo === "undefined") return null;
  return { id: l.id, t: l.t, x: cuerpo };
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
const CLAVE_AVISO = "el-analista-aviso-leido";

/* El aviso se muestra la primera vez que alguien abre el juego en su
   navegador. Se lee de forma sincrónica y sin promesas, para que no
   haya un parpadeo del aviso a quien ya lo aceptó. Si no hay
   almacenamiento disponible, se muestra siempre: es el lado seguro. */
const yaAceptoAviso = () => {
  try {
    return typeof window !== "undefined" && !!window.localStorage
      && window.localStorage.getItem(CLAVE_AVISO) === "1";
  } catch (e) { return false; }
};
const anotarAviso = () => {
  try { if (typeof window !== "undefined" && window.localStorage) window.localStorage.setItem(CLAVE_AVISO, "1"); }
  catch (e) { /* si no se puede guardar, el aviso volverá a salir. No es grave. */ }
};
const VERSION = 5;

const SAL = "el-analista-v5-firma";
const TOPE_GUARDADO = 262144;   /* 256 KB: por encima de eso algo anda mal */
const ESPERA_MAX = 3000;        /* si el almacen del entorno no responde, se sigue sin el */

/* Huella de la partida. No es criptografia y no pretende serlo: el codigo
   viaja con el juego, asi que quien lo lea puede recalcularla. Lo que si
   hace es que un JSON editado a mano o a medio escribir se detecte y se
   descarte, en vez de entrar al estado y romper la pantalla. */
const firma = (txt) => {
  let a = 0x811c9dc5, b = 0x9e3779b9;
  const s = SAL + txt;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    a = ((a ^ c) >>> 0) * 16777619 >>> 0;
    b = (b + c * (i % 61 + 7)) >>> 0;
    b = ((b << 7) | (b >>> 25)) >>> 0;
  }
  return (a >>> 0).toString(36) + (b >>> 0).toString(36);
};

const conAlmacen = () => {
  try { return typeof window !== "undefined" && !!window.storage && typeof window.storage.get === "function"; }
  catch (e) { return false; }
};
const conLocal = () => {
  try { return typeof window !== "undefined" && !!window.localStorage; } catch (e) { return false; }
};

/* ninguna promesa ajena puede dejar el juego esperando para siempre */
const conPlazo = (promesa, ms) => Promise.race([
  Promise.resolve(promesa),
  new Promise((ok) => setTimeout(() => ok(null), ms)),
]);

const guardarPartida = async (estado) => {
  let txt;
  try {
    const cuerpo = JSON.stringify(estado);
    txt = JSON.stringify({ v: VERSION, ts: Date.now(), f: firma(cuerpo), s: estado });
  } catch (e) { return false; }
  if (txt.length > TOPE_GUARDADO) return false;
  if (conAlmacen()) {
    try {
      const r = await conPlazo(window.storage.set(CLAVE, txt), ESPERA_MAX);
      if (r !== null) return true;
    } catch (e) { /* sigue al de abajo */ }
  }
  if (conLocal()) {
    try { window.localStorage.setItem(CLAVE, txt); return true; } catch (e) { return false; }
  }
  return false;
};

/* devuelve el sobre crudo solo si el JSON es valido, la version coincide
   y la firma cuadra. Cualquier otra cosa se trata como "no hay partida". */
const abrirSobre = (txt) => {
  if (typeof txt !== "string" || !txt || txt.length > TOPE_GUARDADO) return null;
  let d;
  try { d = JSON.parse(txt); } catch (e) { return null; }
  if (!d || typeof d !== "object" || d.v !== VERSION || !d.s || typeof d.s !== "object") return null;
  try { if (firma(JSON.stringify(d.s)) !== d.f) return null; } catch (e) { return null; }
  return d;
};

const leerPartida = async () => {
  if (conAlmacen()) {
    try {
      const r = await conPlazo(window.storage.get(CLAVE), ESPERA_MAX);
      const d = r && r.value ? abrirSobre(r.value) : null;
      if (d) return d;
    } catch (e) { /* la clave puede no existir: no es un error */ }
  }
  if (conLocal()) {
    try {
      const d = abrirSobre(window.localStorage.getItem(CLAVE));
      if (d) return d;
    } catch (e) { return null; }
  }
  return null;
};

const olvidarPartida = async () => {
  if (conAlmacen()) { try { await conPlazo(window.storage.delete(CLAVE), ESPERA_MAX); } catch (e) {} }
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
  titulares: [], vistos: [], burnouts: 0, despidos: 0, seguir: 0, rama: null, fondo: null,
  /* la vida fuera de la oficina */
  pareja: "solo", hijos: 0,
  /* el recorrido mensual acumulado de la cartera */
  curva: [],
  /* configuración de la partida */
  modo: "normal", edadIni: 20, estudia: 0,
  nombre: "", genero: null,
  guia: false, guiaVistas: [],
  /* qué sistemas del juego ya se abrieron */
  abiertos: [],
  ritmo: "normal", nivelGasto: "normal",
  /* lo que debes y su historia */
  deuda: 0, quiebras: 0, embargos: 0, vetoCredito: 0,
};

/* cuánto cuesta al año cada persona que depende de ti, antes de país */
const COSTO_HIJO = 4200;
const PAREJAS = ["solo", "noviazgo", "casado", "divorciado", "viudo"];

/* ---------- quién eres ----------
   El nombre es solo tuyo: se guarda en tu navegador y no sale de ahí.
   El género sirve para que el juego concuerde al hablarte, nada más:
   no cambia sueldos, ni oportunidades, ni resultados. */
const GENEROS = [
  { id: "f", n: "Femenino" },
  { id: "m", n: "Masculino" },
  { id: "x", n: "Prefiero no decirlo" },
];
/* Cuánto te dejas en la oficina. Sube la carrera y baja la energía,
   que es el intercambio de verdad y el que nadie hace consciente. */
const RITMOS = [
  { id: "tranquilo", n: "Tranquilo", car: 0, ene: -4, rep: -1,
    d: "Sales a tu hora. La carrera avanza sola y despacio; llegas entero a los cincuenta." },
  { id: "normal", n: "Normal", car: 2, ene: -8, rep: 0,
    d: "Lo que se espera de ti y poco más. El punto medio." },
  { id: "tope", n: "A tope", car: 6, ene: -14, rep: 2,
    d: "Sales de últimos. Asciendes antes y pagas la diferencia en salud y en vida." },
];
const RITMO = (id) => RITMOS.find((x) => x.id === id) || RITMOS[1];

/* Cómo vives. Multiplica el gasto del año: es la palanca que más
   pesa en el patrimonio final y la que menos gente toca a propósito. */
const GASTOS = [
  { id: "apretado", n: "Apretado", f: 0.78, ene: -3, rep: -1,
    d: "Compartes piso, cocinas en casa, dices no a bastantes cosas. Ahorras como en ningún otro momento." },
  { id: "normal", n: "Normal", f: 1, ene: 0, rep: 0,
    d: "Vives como vive la gente de tu cargo. Ni austero ni llamativo." },
  { id: "holgado", n: "Holgado", f: 1.28, ene: 4, rep: 2,
    d: "Buen barrio, buenos restaurantes, viajes sin mirar el precio. Se nota en tu ánimo y en la resta." },
];
const NIVEL_GASTO = (id) => GASTOS.find((x) => x.id === id) || GASTOS[1];

/* ============================================================
   METAS POR EDAD
   Referencia habitual de la planificación financiera: cuántas veces tu
   sueldo anual deberías tener invertido a cada edad. No es una ley,
   es una vara de medir, y no había ninguna en el juego.
   ============================================================ */
const METAS_EDAD = [
  { e: 30, x: 1 }, { e: 35, x: 2 }, { e: 40, x: 3 }, { e: 45, x: 4 },
  { e: 50, x: 6 }, { e: 55, x: 7 }, { e: 60, x: 8 }, { e: 67, x: 10 },
];
const metaDeEdad = (edadHoy) => {
  const e = entero(edadHoy, 20, 15, 99);
  if (e < 30) return { e: 30, x: 1, aun: true };
  let out = METAS_EDAD[0];
  METAS_EDAD.forEach((m) => { if (e >= m.e) out = m; });
  return { ...out, aun: false };
};

const TOPE_NOMBRE = 22;
/* Un nombre no necesita signos de puntuación raros. En vez de intentar
   listar todas las letras del mundo (y equivocarme con los acentos),
   quita lo que sobra: marcas de etiqueta, llaves, barras y cualquier
   cosa que no se escriba en un nombre. */
const saneaNombre = (v) => texto(v, "", TOPE_NOMBRE * 3)
  .replace(/[<>{}[\]()\\/|`"~^*_=+;:!?@#$%&\d]/g, "")
  .replace(/\s+/g, " ")
  .slice(0, TOPE_NOMBRE)
  .trim();
/* concuerda una palabra con el género elegido; sin género, forma neutra */
const gen = (st, masc, fem, neutro) => {
  const g = st && st.genero;
  if (g === "f") return fem;
  if (g === "m") return masc;
  return neutro != null ? neutro : masc;
};
const PAREJA_TXT = (st) => ({
  solo: gen(st, "sin pareja", "sin pareja", "sin pareja"),
  noviazgo: "en pareja",
  casado: gen(st, "casado", "casada", "en matrimonio"),
  divorciado: gen(st, "divorciado", "divorciada", "con un divorcio detrás"),
  viudo: gen(st, "viudo", "viuda", "en duelo"),
}[st && st.pareja] || "sin pareja");
const MODOS = [
  { id: "aprendiz", n: "Aprendiz", d: "Cada término se explica antes de usarse, los exámenes traen una clase previa y los minijuegos perdonan más. Pensado para quien nunca ha invertido nada.", ayuda: 22, indulgencia: 1 },
  { id: "normal", n: "Analista", d: "El juego como está pensado: se explica lo justo y se espera que vayas atando cabos.", ayuda: 0, indulgencia: 0 },
];
const MODO = (id) => MODOS.find((x) => x.id === id) || MODOS[1];
const EDADES = [
  { e: 20, n: "20 años", d: "Recién graduado, sin nada ahorrado y con todo el tiempo del mundo a favor.", cash: 0, car: 0, mods: {} },
  { e: 30, n: "30 años", d: "Ya trabajaste unos años. Empiezas con algo de dinero, algo de red y menos años por delante.", cash: 9000, car: 14, mods: { cri: 6, red: 8, rep: 5 } },
  { e: 40, n: "40 años", d: "Media carrera hecha. Más patrimonio y más responsabilidades; el interés compuesto ya no te regala tanto.", cash: 30000, car: 42, mods: { cri: 12, red: 16, rep: 10, ene: -6 } },
  { e: 50, n: "50 años", d: "Empezar tarde no es no empezar. Menos tiempo, más recursos y una idea mucho más clara de lo que quieres.", cash: 65000, car: 62, mods: { cri: 18, red: 22, rep: 14, ene: -12 } },
];
const EDAD_DE = (e) => EDADES.find((x) => x.e === e) || EDADES[0];

const TOPES = [30, 35, 40]; // 50, 55 y 60 años
const semestre = (t) => String(2026 + t);
const edad = (t, ini) => entero(ini, 20, 20, 50) + entero(t, 0, 0, 60);
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

/* ============================================================
   APERTURA ESCALONADA
   El juego no se muestra entero desde el primer año. Cada sistema
   espera a que tengas rango suficiente o a que pase un año tope, y
   cuando por fin llega lo hace como escena narrada, no como una
   pestaña que apareció sola en la barra.

   El rango premia a quien juega bien; el año tope garantiza que una
   carrera lenta también vea cosas nuevas. Manda el que llegue primero,
   y nunca se abre más de un sistema por año: el año en que algo nuevo
   entra, eso es el acontecimiento del año.
   ============================================================ */
const APERTURAS = [
  { id: "cartera", rango: 1, ano: 3,
    escena: { id: 9001, min: 0, max: 6, apertura: true,
      t: "Lo que sobra a fin de mes",
      x: "Con el sueldo nuevo aparece una pregunta que antes no tenías. Hasta ahora el dinero entraba y salía el mismo mes; de aquí en adelante hay una parte que no tiene tarea asignada, y dejarla quieta también es una decisión.",
      o: [
        { t: "Repartirlo entre varios tipos de activo", abre: "cartera",
          d: { cri: 4, msg: "Abres tu primera cartera. Arriba aparece la sección Cartera: ahí decides qué parte de tu dinero trabaja y en qué. Nada se aplica hasta que confirmas." } },
        { t: "Empezar prudente, casi todo en efectivo", abre: "cartera",
          d: { cri: 2, ene: 3, msg: "Prefieres mojarte los pies antes de nadar. La cartera queda abierta en conservador y puedes mover los pesos cuando quieras." } },
      ] } },
  { id: "vida", rango: 1, ano: 4,
    escena: { id: 9002, min: 0, max: 6, apertura: true,
      t: "La vida que estás pagando",
      x: "Un sábado cualquiera haces la cuenta de lo que te cuesta vivir como vives. No es un número dramático, pero es un número: y sube mucho más fácil de lo que baja.",
      o: [
        { t: "Anotarlo y vigilarlo de ahora en adelante", abre: "vida",
          d: { cri: 5, msg: "Se abre la sección Vida: tu tren de vida, lo que lo empuja hacia arriba y cuánto patrimonio necesitas para no depender del sueldo." } },
        { t: "Mirarlo de reojo y seguir", abre: "vida",
          d: { ene: 4, msg: "Cierras la libreta sin sacar conclusiones. La sección Vida queda ahí para cuando quieras volver." } },
      ] } },
  { id: "banco", rango: 2, ano: 6,
    escena: { id: 9003, min: 0, max: 6, apertura: true,
      t: "El banco te empieza a mirar",
      x: "Te llega la carta que le llega a todo el que ya gana lo suficiente: una línea de crédito preaprobada, redactada en tono de felicitación. No te están premiando, te están vendiendo.",
      o: [
        { t: "Entender qué te ofrecen antes de necesitarlo", abre: "banco",
          d: { cri: 6, msg: "Lees la letra pequeña sin firmar nada. En Ficha se abre El banco: cuánto te prestarían, a qué tasa, y cómo pagar lo que debas." } },
        { t: "Guardar la carta y no pensarlo hoy", abre: "banco",
          d: { ene: 2, msg: "La carta va al cajón. La sección del banco queda disponible en Ficha el día que la necesites." } },
      ] } },
  { id: "inmuebles", rango: 3, ano: 9,
    escena: { id: 9004, min: 0, max: 6, apertura: true,
      t: "Un ladrillo con tu nombre",
      x: "Un cliente vende y te lo cuenta antes de sacarlo al mercado. No es una oportunidad irrepetible, pero es la primera vez que un inmueble te queda a distancia de la mano.",
      o: [
        { t: "Aprender a mirar inmuebles como se miran los activos", abre: "inmuebles",
          d: { cri: 5, mod: 3, msg: "Se abre la sección Inmuebles. Un ladrillo tiene renta, gastos y una salida lenta: son tres números, no uno." } },
        { t: "Escuchar por educación y no comprometerte", abre: "inmuebles",
          d: { red: 3, msg: "Agradeces sin cerrar la puerta. La sección Inmuebles queda abierta para cuando los números te cuadren." } },
      ] } },
  { id: "mejoras", rango: 3, ano: 11,
    escena: { id: 9005, min: 0, max: 6, apertura: true,
      t: "Dónde gastar el poco tiempo que queda",
      x: "Ya no puedes trabajar más horas: las horas se acabaron. Lo único que queda por mejorar es con qué las llenas.",
      o: [
        { t: "Invertir en ti de forma deliberada", abre: "mejoras",
          d: { cri: 4, mod: 3, msg: "Se abre la sección Mejoras: cosas que se compran una vez y rinden todos los años que quedan." } },
        { t: "Seguir con lo que ya te funciona", abre: "mejoras",
          d: { ene: 5, msg: "No cambias nada por ahora. La sección Mejoras queda arriba para cuando lo consideres." } },
      ] } },
  { id: "fondo", rango: 4, ano: 14,
    escena: { id: 9006, min: 0, max: 6, apertura: true,
      t: "Del otro lado de la mesa",
      x: "Toda tu carrera has ejecutado lo que otros decidieron invertir. Te invitan a levantar un vehículo propio: decidir tú, con dinero ajeno y responsabilidad tuya.",
      o: [
        { t: "Aceptar y montar el vehículo", abre: "fondo",
          d: { car: 5, rep: 3, cri: 3, msg: "Se abre la sección Fondo. Aquí el criterio no lo califica un examen: lo califican los resultados de otros." } },
        { t: "Escuchar la propuesta sin firmar todavía", abre: "fondo",
          d: { cri: 2, msg: "Pides tiempo para pensarlo. La sección Fondo queda disponible cuando decidas entrar." } },
      ] } },
];

const IDS_APERTURA = APERTURAS.map((a) => a.id);

/* si a un sistema ya le toca, por rango alcanzado o por año cumplido */
const tocaAbrir = (st, a) =>
  entero(st && st.rango, 0, 0, 99) >= a.rango || entero(st && st.turno, 0, 0, 99) >= a.ano;

/* la única consulta que hace el resto del juego */
const abierto = (st, id) =>
  !!(st && Array.isArray(st.abiertos) && st.abiertos.indexOf(id) >= 0);

/* ============================================================
   BLINDAJE . CAPA DOS: EL SANEADOR
   Toda partida que entra al estado, venga de un guardado, de una
   pestana vieja o de alguien jugando con la consola del navegador,
   pasa por sanear(). Lo que sale de aqui siempre cumple:
     . los numeros son finitos y estan dentro de rango
     . los identificadores existen de verdad en las tablas del juego
     . las listas estan acotadas, asi que el guardado no crece sin fin
     . no hay campos de mas ni de menos
   Si sanear() recibe basura devuelve una partida jugable, no un error.
   ============================================================ */
const IDS_PERK = PERKS.map((x) => x.id);
const IDS_BIEN = CAPRICHOS.concat(PROPIEDADES).map((x) => x.id);
const IDS_RAMA = RAMAS.map((x) => x.id);
const IDS_PAIS = NACIONES.map((x) => x.id);
const IDS_ESTUDIO = CARRERAS.map((x) => x.id);
const CLAVES_ACTIVO = ACTIVOS.map((a) => a.k);

const TOPE_TITULARES = 60;
const TOPE_VISTOS = 400;
const TOPE_HISTO = 60;
const TOPE_CURVA = 384;   /* 32 años de meses: el recorrido de la cartera */
const TOPE_POSICIONES = 40;
const TOPE_OFERTA = 6;

const unicos = (arr) => arr.filter((x, i) => arr.indexOf(x) === i);
const listaDe = (v, filtro, max) => (Array.isArray(v) ? v.filter(filtro) : []).slice(-max);

/* los pesos siempre suman uno, con el efectivo como residuo */
const saneaPesos = (w) => {
  const fuente = w && typeof w === "object" ? w : {};
  const out = {};
  let suma = 0;
  CLAVES_ACTIVO.forEach((k) => { const x = clamp(numero(fuente[k], 0), 0, 1); out[k] = x; suma += x; });
  if (suma > 1) { CLAVES_ACTIVO.forEach((k) => { out[k] = out[k] / suma; }); suma = 1; }
  out.efectivo = Math.max(0, 1 - suma);
  return out;
};

const saneaFondo = (f) => {
  if (!f || typeof f !== "object") return null;
  const tam = clamp(numero(f.tam, 0), 0, TOPE_PLATA);
  if (tam <= 0) return null;
  const pct = clamp(numero(f.pct, 0.02), 0, 0.5);
  const posiciones = (Array.isArray(f.posiciones) ? f.posiciones : [])
    .slice(0, TOPE_POSICIONES)
    .map((p) => (p && typeof p === "object" ? {
      n: texto(p.n, "Posicion", 60),
      s: texto(p.s, "", 60),
      ticket: clamp(numero(p.ticket, 0), 0, TOPE_PLATA),
      riesgo: entero(p.riesgo, 2, 1, 3),
      base: clamp(numero(p.base, 1.5), 0, 20),
      salida: entero(p.salida, 0, 0, 200),
    } : null))
    .filter((p) => p && p.ticket > 0);
  const oferta = (Array.isArray(f.oferta) ? f.oferta : [])
    .slice(0, TOPE_OFERTA)
    .map((o) => (o && typeof o === "object" ? {
      n: texto(o.n, "Oportunidad", 60),
      s: texto(o.s, "", 60),
      riesgo: entero(o.riesgo, 2, 1, 3),
      base: clamp(numero(o.base, 1.5), 0, 20),
      ticket: clamp(numero(o.ticket, 0), 0, TOPE_PLATA),
      tomado: o.tomado === true,
      d: texto(o.d, "", 120),
      crec: clamp(numero(o.crec, 0), -50, 200),
      mar: clamp(numero(o.mar, 0), -50, 100),
      conc: clamp(numero(o.conc, 0), 0, 100),
      deuda: clamp(numero(o.deuda, 0), 0, 20),
      foso: entero(o.foso, 1, 1, 3),
    } : null))
    .filter((o) => o && o.ticket > 0);
  const reciclado = clamp(numero(f.reciclado, 0), 0, TOPE_PLATA);
  return {
    tam, pct, reciclado,
    generacion: entero(f.generacion, 1, 1, 8),
    gp: clamp(numero(f.gp, 0), 0, tam),
    invertido: clamp(numero(f.invertido, 0), 0, tam + reciclado),
    realizado: clamp(numero(f.realizado, 0), -TOPE_PLATA, TOPE_PLATA),
    posiciones, oferta,
  };
};

const sanear = (bruto) => {
  const r = bruto && typeof bruto === "object" ? bruto : {};
  const st = {};
  st.turno = entero(r.turno, 0, 0, 60);
  st.rango = entero(r.rango, 0, 0, RANGOS.length - 1);
  st.carrera = clamp(numero(r.carrera, 0), 0, 100000);
  ["mod", "cri", "red", "rep", "ene"].forEach((k) => { st[k] = clamp(numero(r[k], BASE[k]), 0, 100); });
  st.cash = clamp(numero(r.cash, 0), -TOPE_PLATA, TOPE_PLATA);
  st.cartera = clamp(numero(r.cartera, 0), 0, TOPE_PLATA);
  st.pais = IDS_PAIS.indexOf(r.pais) >= 0 ? r.pais : null;
  st.estudio = IDS_ESTUDIO.indexOf(r.estudio) >= 0 ? r.estudio : null;
  st.rama = IDS_RAMA.indexOf(r.rama) >= 0 ? r.rama : null;
  st.pesos = saneaPesos(r.pesos);
  st.objetivo = clamp(numero(r.objetivo, 0.7), 0, 1);
  st.perfil = texto(r.perfil, "medida", 24);
  st.perks = unicos(listaDe(r.perks, (x) => IDS_PERK.indexOf(x) >= 0, 40));
  st.bienes = unicos(listaDe(r.bienes, (x) => IDS_BIEN.indexOf(x) >= 0, 40));
  st.valores = {};
  st.bienes.forEach((id) => {
    const v = r.valores && typeof r.valores === "object" ? r.valores[id] : 0;
    st.valores[id] = clamp(numero(v, 0), 0, TOPE_PLATA);
  });
  st.histo = listaDe(r.histo, esNumero, TOPE_HISTO).map((x) => numero(x, 0));
  st.curva = listaDe(r.curva, esNumero, TOPE_CURVA)
    .map((x) => clamp(numero(x, 0), 0, TOPE_PLATA));
  st.lecs = unicos(listaDe(r.lecs, (x) => typeof x === "string" && x.length < 40, 20));
  st.titulares = listaDe(r.titulares, (x) => x && typeof x === "object", TOPE_TITULARES)
    .map((x) => ({ q: texto(x.q, "", 12), t: texto(x.t, "", 140) }))
    .filter((x) => x.t);
  st.vistos = unicos(listaDe(r.vistos, (x) => typeof x === "number" || typeof x === "string", TOPE_VISTOS));
  st.rotado = clamp(numero(r.rotado, 0), 0, 1e6);
  st.comisiones = clamp(numero(r.comisiones, 0), 0, TOPE_PLATA);
  st.gastoAnt = clamp(numero(r.gastoAnt, 0), 0, TOPE_PLATA);
  st.techo = clamp(numero(r.techo, 0), 0, TOPE_PLATA);
  st.burnouts = entero(r.burnouts, 0, 0, 20);
  st.despidos = entero(r.despidos, 0, 0, 9);
  st.deuda = clamp(numero(r.deuda, 0), 0, TOPE_PLATA);
  st.quiebras = entero(r.quiebras, 0, 0, 9);
  st.embargos = entero(r.embargos, 0, 0, 99);
  st.vetoCredito = entero(r.vetoCredito, 0, 0, 9);
  st.seguir = entero(r.seguir, 0, 0, TOPES.length - 1);
  st.fondo = saneaFondo(r.fondo);
  st.shock = clamp(numero(r.shock, 0), -2, 2);
  st.pareja = PAREJAS.indexOf(r.pareja) >= 0 ? r.pareja : "solo";
  st.hijos = entero(r.hijos, 0, 0, 8);
  st.modo = MODOS.some((m) => m.id === r.modo) ? r.modo : "normal";
  st.nombre = saneaNombre(r.nombre);
  st.genero = GENEROS.some((g) => g.id === r.genero) ? r.genero : null;
  st.ritmo = RITMOS.some((x) => x.id === r.ritmo) ? r.ritmo : "normal";
  st.nivelGasto = GASTOS.some((x) => x.id === r.nivelGasto) ? r.nivelGasto : "normal";
  st.guia = r.guia === true;
  st.guiaVistas = unicos(listaDe(r.guiaVistas, (x) => GUIA.some((g) => g.id === x), 20));
  /* Una partida guardada antes de la apertura escalonada no trae la
     lista: se reconstruye de su rango y su turno, para no quitarle nada
     de lo que ya tenía en pantalla. */
  st.abiertos = Array.isArray(r.abiertos)
    ? unicos(listaDe(r.abiertos, (x) => IDS_APERTURA.indexOf(x) >= 0, 20))
    : APERTURAS.filter((a) => tocaAbrir(st, a)).map((a) => a.id);
  st.edadIni = EDADES.some((x) => x.e === entero(r.edadIni, 20, 20, 50)) ? entero(r.edadIni, 20, 20, 50) : 20;
  st.estudia = clamp(numero(r.estudia, 0), 0, 500);
  st.hitoLibre = r.hitoLibre === true;
  st.hitoRenta = r.hitoRenta === true;
  st.hitoCartera = r.hitoCartera === true;
  return st;
};

/* una partida solo se ofrece para retomar si de verdad se puede jugar */
const partidaJugable = (st) => !!(st && st.pais && st.estudio);

/* consultas a las tablas que nunca devuelven undefined */
const RANGO = (i) => RANGOS[entero(i, 0, 0, RANGOS.length - 1)] || RANGOS[0];
const JUEGO = (k) => JUEGOS[k] || JUEGOS.suerte;
const TOPE_DE = (i) => TOPES[entero(i, 0, 0, TOPES.length - 1)];

const GUIA = [
  { id: "decidir", cuando: (c) => c.fase === "evento",
    t: "Esto es una decisión",
    x: "Ninguna opción es la obviamente correcta: cada una te cuesta algo. Elige y sigue; el año avanza contigo." },
  { id: "secciones", cuando: (c) => c.fase === "evento" && c.vistas.indexOf("decidir") >= 0,
    t: "Arriba están tus secciones",
    x: "Por ahora tienes dos: tu Ficha y el diccionario de Términos. El juego irá abriendo las demás a medida que avance tu carrera, y te avisará cuando pase. Se abren y se cierran cuando quieras: el juego te espera, no hay reloj." },
  { id: "terminos", cuando: (c) => c.tab === "terminos",
    t: "El diccionario",
    x: "Cualquier palabra que no entiendas está aquí explicada sin jerga. Puedes consultarlo en medio de una decisión." },
  { id: "cartera", cuando: (c) => c.tab === "portafolio",
    t: "Aquí decides qué hace tu dinero",
    x: "La barra de arriba dice cuánto está invertido y cuánto en efectivo. Debajo repartes entre tipos de activo. Nada se aplica hasta que confirmas." },
  { id: "ficha", cuando: (c) => c.tab === "ficha",
    t: "Tus números y el banco",
    x: "Aquí ves sueldo, gastos y patrimonio. Al final de la sección puedes pedir un préstamo o pagar deuda." },
  { id: "juego", cuando: (c) => c.fase === "minijuego",
    t: "Un modo de juego",
    x: "Primero te explican las reglas y qué cuenta como éxito. Cuando entiendas, empiezas: el resultado afecta a tu carrera." },
  { id: "cierre", cuando: (c) => c.fase === "cierre",
    t: "El informe del año",
    x: "Lo que entró, lo que salió y cómo se movió tu cartera. Al final hay una lección sacada de tus propios números: es la parte que enseña." },
  { id: "vida", cuando: (c) => c.tab === "expediente",
    t: "Cómo vives",
    x: "Tu tren de vida sube con lo que compras y sube también la meta: necesitas 25 veces tu gasto anual para no depender del sueldo." },
];

/* Términos del glosario que se pueden reconocer dentro del enunciado
   de una pregunta. Sirven de red: si la pregunta no está atada a un
   tema ni tiene pista escrita, al menos se explica la palabra clave. */
const GLOS_EN_TEXTO = [
  /* primero lo muy concreto, que si no se lo come una palabra general */
  [/flujo de caja libre|caja libre|utilidad contable/i, "fcl"],
  [/costo del capital|coste del capital|wacc|capital propio comparado/i, "wacc"],
  [/opci[óo]n de (compra|venta)|call|put|prima/i, "opcion"],
  [/forward de divisas|cobertura natural|cubrir(se)?|hedge/i, "cobertura"],
  [/convertir en efectivo|m[áa]s r[áa]pido es/i, "liquidez"],
  [/cobra 0,2|misma estrategia, uno cobra/i, "comision"],
  [/primera pregunta deber[íi]a ser|antes de invertir en algo/i, "invertir"],
  [/mutuamente excluyentes|se[ñn]ales opuestas/i, "tir"],
  [/valor terminal|\bdcf\b|descuento de flujos|tasa de descuento|valor presente|flujos futuros/i, "valorpresente"],
  [/duraci[óo]n modificada|puntos b[áa]sicos|\bduraci[óo]n\b/i, "duration"],
  [/curva de rendimientos|curva se invierte/i, "curva"],
  [/earn ?out/i, "earnout"],
  [/equity value|enterprise value|deuda neta sobre ebitda/i, "ebitda"],
  [/m[úu]ltiplo|precio sobre utilidad/i, "multiplo"],
  [/tasa interna|\btir\b|carry|hurdle/i, "tir"],
  [/distressed|treinta centavos/i, "distressed"],
  [/aumento de capital|derecho de preferencia|diluci[óo]n|dilu(ye|ir)/i, "dilucion"],
  [/inventarios|cuentas por cobrar|capital de trabajo/i, "capitalTrabajo"],
  [/costo de oportunidad|coste de oportunidad|parados en la cuenta/i, "costoOportunidad"],
  [/\bseguros?\b/i, "seguro"],
  [/misma cantidad todos los meses|aport(ar|es) peri[óo]dic|cada mes sin importar/i, "aportes"],
  [/rendido mucho|[úu]ltimos tres a[ñn]os|gestor|fondo activo/i, "indexado"],
  [/a cuotas|tarjeta de cr[ée]dito|40% anual|pagar (la|una) deuda/i, "deuda"],
  [/exportadora|moneda local se deval/i, "devaluacion"],
  [/tasa de ahorro|ahorrar de verdad|forma m[áa]s efectiva de ahorrar/i, "presupuesto"],
  [/\bactivo\b/i, "activo"],
  [/\binter[ée]s compuesto\b/i, "interesCompuesto"],
  [/\bregla del (setenta y dos|72)\b/i, "interesCompuesto"],
  [/\bregla del (cuatro|4)\s*%/i, "regla4"],
  [/\binflaci[óo]n\b/i, "inflacion"],
  [/\bdiversific/i, "diversificar"],
  [/\bvolatilidad\b/i, "volatilidad"],
  [/\bliquidez\b|\bl[íi]quido\b/i, "liquidez"],
  [/\bcomisi[óo]n(es)?\b/i, "comision"],
  [/\bfondo indexado\b|\b[íi]ndice\b/i, "fondoIndexado"],
  [/\bfondo de emergencia\b|\bcolch[óo]n\b/i, "fondoEmergencia"],
  [/\bapalanca/i, "apalancamiento"],
  [/\bebitda\b/i, "ebitda"],
  [/\bbeta\b/i, "beta"],
  [/\brebalance/i, "rebalanceo"],
  [/\bpatrimonio\b/i, "patrimonio"],
  [/\bencaje\b/i, "encaje"],
  [/\btasa de referencia\b|\bbanco central\b/i, "tasaRectora"],
  [/\bcarta de cr[ée]dito\b/i, "cartaCredito"],
  [/\bdevalua/i, "devaluacion"],
  [/\btasa efectiva\b|\bcoste total\b/i, "tasaEfectiva"],
  [/\bbonos?\b/i, "bono"],
  [/\bacci(ón|ones)\b/i, "accion"],
  [/\bcartera\b|\bportafolio\b/i, "cartera"],
  [/\briesgo\b/i, "riesgo"],
];

/* El contexto de una pregunta, por orden: el tema del que salió, la
   pista escrita a mano, o el término del glosario que aparezca en el
   enunciado. Si no hay ninguno, no se ofrece explicación. */
const contextoDe = (p) => {
  if (!p) return null;
  const tm = p.tema ? TEMAS.find((x) => x.id === p.tema) : null;
  if (tm) return { t: tm.n, x: tm.x, ej: tm.ej };
  if (p.pista) return { t: "Lo que hace falta saber", x: p.pista };
  const txt = String(p.q || "");
  for (let i = 0; i < GLOS_EN_TEXTO.length; i++) {
    if (!GLOS_EN_TEXTO[i][0].test(txt)) continue;
    const clave = GLOS_EN_TEXTO[i][1];
    const g = GLOSARIO[clave];
    if (g) return { t: g.n, x: g.x };
    /* la clave también puede ser un tema entero */
    const tm2 = TEMAS.find((x) => x.id === clave);
    if (tm2) return { t: tm2.n, x: tm2.x, ej: tm2.ej };
  }
  return null;
};

/* Qué palabras hay que haber entendido antes de jugar cada modo.
   En modo aprendiz se muestran como fichas antes de empezar; en modo
   analista se dan por sabidas. */
const GLOS_JUEGO = {
  catedra: ["interesCompuesto", "riesgo"],
  quiz: ["rendimiento", "riesgo", "tasaEfectiva"],
  trading: ["accion", "volatilidad", "rendimiento"],
  estructura: ["apalancamiento", "ebitda"],
  banderas: ["riesgo", "liquidez"],
  carril: ["accion", "bono", "liquidez"],
  pares: ["cartera", "diversificar"],
  subasta: ["riesgo", "apalancamiento"],
  calculo: ["rendimiento", "interesCompuesto"],
  semaforo: ["riesgo", "volatilidad"],
  orden: ["bono", "liquidez"],
  anclaje: ["riesgo"],
  suerte: ["volatilidad", "riesgo"],
  precision: ["volatilidad"],
  ojo: ["riesgo"],
  memoria: ["cartera"],
  reaccion: ["volatilidad"],
  tresraya: ["riesgo"],
  cuatro: ["riesgo"],
};
const TEMA_DE = (id) => TEMAS.find((x) => x.id === id) || null;

/* Cinco minijuegos usan divs como zona de clic porque su diseño no
   admite un <button> sin romperse el layout. Esto los vuelve operables
   con teclado sin tocar una línea de CSS: foco, Enter y espacio. */
const pulsable = (fn, rotulo, apagado) => ({
  role: "button",
  tabIndex: apagado ? -1 : 0,
  "aria-label": rotulo || undefined,
  "aria-disabled": apagado ? "true" : undefined,
  onClick: apagado ? undefined : fn,
  onKeyDown: apagado ? undefined : (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); fn(); }
  },
});

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

/* ---- Peinar el legajo · memoria de trabajo ----
   Reescrito: cada casilla tiene su propio color y su propio nombre, así
   que la secuencia se recuerda como "cobre, verde, vino" y no como tres
   cuadrados grises indistinguibles. Y ahora hay tres vidas: fallar una
   vez ya no termina la partida, te repiten la secuencia y sigues. */

const COLORES_MEM = [
  { c: "#C0763A", n: "Cobre" },
  { c: "#5F8F5C", n: "Verde" },
  { c: "#BE4B3B", n: "Rojo" },
  { c: "#3E6B8C", n: "Azul" },
  { c: "#8C6BA8", n: "Morado" },
  { c: "#C9A227", n: "Mostaza" },
  { c: "#3F8C86", n: "Turquesa" },
  { c: "#A8556F", n: "Vino" },
  { c: "#7A6A55", n: "Arena" },
];

const VIDAS_MEM = 3;

function JuegoMemoria({ ayuda, onFin }) {
  const largo = clamp(7 - Math.floor(ayuda / 25), 4, 7);
  const [seq] = useState(() => Array.from({ length: largo }, () => indiceAzar(9)));
  const [idx, setIdx] = useState(0);
  const [on, setOn] = useState(null);
  const [modo, setModo] = useState("ver");
  const [paso, setPaso] = useState(0);
  const [err, setErr] = useState(null);
  const [vidas, setVidas] = useState(VIDAS_MEM);
  const [aviso, setAviso] = useState(null);

  /* muestra la secuencia, casilla por casilla */
  useEffect(() => {
    if (modo !== "ver") return;
    if (idx >= seq.length) { const t = setTimeout(() => { setModo("jugar"); setAviso(null); }, 420); return () => clearTimeout(t); }
    setOn(seq[idx]);
    const a = setTimeout(() => setOn(null), 460);
    const b = setTimeout(() => setIdx(idx + 1), 700);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [idx, modo, seq]);

  const tocar = (i) => {
    if (modo !== "jugar") return;
    if (i === seq[paso]) {
      const p = paso + 1;
      setPaso(p); setOn(i);
      setTimeout(() => setOn(null), 160);
      if (p >= seq.length) {
        setModo("fin");
        setAviso("Secuencia completa");
        /* cuantas menos vidas gastaste, mejor cierra */
        setTimeout(() => onFin(vidas === VIDAS_MEM ? "exito" : vidas === VIDAS_MEM - 1 ? "exito" : "parcial"), 600);
      }
      return;
    }
    /* fallaste: gastas una vida y te la vuelven a mostrar */
    const quedan = vidas - 1;
    setErr(i);
    setVidas(quedan);
    if (quedan <= 0) {
      setModo("fin");
      setAviso("Se acabaron los intentos");
      const r = paso / seq.length;
      setTimeout(() => onFin(r >= 0.6 ? "parcial" : "fallo"), 750);
      return;
    }
    setModo("pausa");
    setAviso("Ahí no. Te la muestro otra vez.");
    setTimeout(() => {
      setErr(null); setPaso(0); setIdx(0); setOn(null); setModo("ver");
    }, 950);
  };

  const rotuloModo = modo === "ver" ? "Memoriza la secuencia"
    : modo === "jugar" ? "Repítela en el mismo orden"
    : modo === "pausa" ? "Atento" : "Listo";

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>{rotuloModo}</span>
        <span>{paso} de {seq.length} · intentos {vidas} de {VIDAS_MEM}</span>
      </div>
      <div className="ea-pista">
        Cada casilla tiene su color. Se van a encender {seq.length} en orden;
        tú las tocas después en el mismo orden. Si te equivocas, pierdes un intento y te la muestran de nuevo.
      </div>
      <div className="ea-celdas">
        {COLORES_MEM.map((col, i) => {
          const encendida = on === i;
          const fallada = err === i;
          return (
            <button key={i} type="button" className="ea-celdaC" onClick={() => tocar(i)}
              disabled={modo !== "jugar"} aria-label={col.n}
              style={{
                background: fallada ? "var(--rojo)" : encendida ? col.c : col.c + "2E",
                borderColor: encendida || fallada ? "#12201F" : col.c + "77",
                transform: encendida ? "scale(0.94)" : "none",
              }}>
              {/* Sin el nombre escrito: si se lee la palabra se memoriza la
                  palabra, y el juego deja de ser de colores. El nombre sigue
                  en aria-label para quien use lector de pantalla. */}
            </button>
          );
        })}
      </div>
      <div className="ea-vidas">
        {Array.from({ length: VIDAS_MEM }, (_, k) => (
          <span key={k} className={"ea-vida" + (k < vidas ? " viva" : "")} />
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#3A4649" }}>{aviso}</div>
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
          <div className="ea-num ea-mono" key={i} {...pulsable(() => resolver(i === tab.pos), "Cifra " + n)}>{n}</div>
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
        onChange={(e) => setV(entero(e.target.value, 50, 0, 100))} aria-label="Tu oferta" />
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
      <div className="ea-jinfo ea-dis"><span>Múltiplo acumulado</span><span>Riesgo de vuelta {(riesgo * 100).toFixed(0)}%</span></div>
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
          <div key={i} className={"ea-celda" + (linea.indexOf(i) >= 0 ? " gana" : "")}
            {...pulsable(() => tocar(i), "Casilla " + (i + 1) + (v ? ", ocupada por " + v : ", libre"), !!v)}>{v}</div>
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 12, fontSize: 14, color: "#3A4649" }}>{estado ? txt[estado] : ""}</div>
    </div>
  );
}

/* una pregunta solo es utilizable si tiene enunciado, al menos dos
   opciones y un índice de respuesta correcta que apunte a una de ellas */
const preguntaValida = (p) => !!(p && typeof p.q === "string" && p.q &&
  Array.isArray(p.o) && p.o.length >= 2 &&
  Number.isInteger(p.c) && p.c >= 0 && p.c < p.o.length &&
  typeof p.o[p.c] === "string");

const PREGUNTA_RESERVA = {
  q: "Tu cartera cae 30% en un año malo. ¿Qué es lo más sensato?",
  o: ["Mantener el plan y seguir aportando si tu horizonte es largo", "Vender todo y esperar la señal de entrada", "Cambiar a lo que más subió el año pasado", "Duplicar la apuesta con dinero prestado"],
  c: 0,
  e: "Vender en la caída convierte una pérdida temporal en permanente. La caída solo es definitiva para quien vende.",
  nv: 1,
};

function JuegoQuiz({ ayuda, nivel, onFin, modo }) {
  const nv = clamp(numero(nivel, 1), 1, 5);
  const total = largoExamen(nv);
  const [preg] = useState(() => {
    let crudas = [];
    try { crudas = armarExamen(nv, total) || []; } catch (e) { crudas = []; }
    crudas = crudas.filter(preguntaValida);
    while (crudas.length === 0) crudas = [PREGUNTA_RESERVA];
    return crudas.map((p) => {
      const correcta = p.o[p.c];
      let ops = p.o.slice();
      if (ayuda >= 55 && ops.length > 2) {
        const malas = ops.filter((x) => x !== correcta);
        const fuera = elegirAzar(malas);
        if (fuera != null) ops = ops.filter((x) => x !== fuera);
      }
      ops = ops.sort(() => Math.random() - 0.5);
      return { q: p.q, e: texto(p.e, "", 400), ops, correcta, nv: p.nv, tema: p.tema };
    });
  });
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [ok, setOk] = useState(0);
  const [ayudas, setAyudas] = useState(0);
  const [verContexto, setVerContexto] = useState(false);
  const p = preg[Math.min(i, preg.length - 1)] || PREGUNTA_RESERVA;
  const ctx = contextoDe(p);

  const responder = (t) => {
    if (sel !== null) return;
    setSel(t);
    setOk(ok + (t === p.correcta ? 1 : 0));
  };

  const cuantas = preg.length;
  const seguir = () => {
    if (i >= cuantas - 1) {
      /* Con todas bien y sin pedir ayuda, éxito. Pedir explicación no
         se castiga con un fallo, pero sí impide el pleno: aprendiste,
         no acertaste. */
      const pleno = ok === cuantas && ayudas === 0;
      onFin(pleno ? "exito" : ok / cuantas >= 0.6 ? "parcial" : "fallo");
    } else { setI(i + 1); setSel(null); setVerContexto(false); }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Pregunta {i + 1} de {cuantas} · {(NIVEL_N[nv] || "").toLowerCase()}</span>
        <span>{"Aciertos " + ok + (ayudas > 0 ? " · " + ayudas + (ayudas === 1 ? " explicación" : " explicaciones") : "")}</span>
      </div>
      {/* en aprendiz el recordatorio sale solo; en analista hay que pedirlo */}
      {ctx && (modo === "aprendiz" || verContexto) && (
        <div className="ea-glos">
          <div className="ea-glosK">{modo === "aprendiz" ? "Antes de responder, el recordatorio" : "Lo que necesitas saber"}</div>
          <div className="ea-glosT">{ctx.t}</div>
          <div className="ea-glosX">{ctx.x}</div>
          {ctx.ej && <div className="ea-glosX" style={{ marginTop: 6, fontStyle: "italic" }}>{ctx.ej}</div>}
        </div>
      )}
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
      {sel === null && ctx && modo !== "aprendiz" && !verContexto && (
        <button className="ea-mini ea-explicame" style={{ marginTop: 12 }}
          onClick={() => { setVerContexto(true); setAyudas(ayudas + 1); }}>
          No lo sé · explícame
        </button>
      )}
      {sel === null && !ctx && modo !== "aprendiz" && (
        <div className="ea-td" style={{ marginTop: 10, fontSize: 11.5 }}>
          Si no la sabes, responde igual: la explicación viene después y por eso está el examen.
        </div>
      )}
      {sel !== null && (
        <div>
          <div className="ea-expl">{p.e}</div>
          <button className="ea-btn" onClick={seguir}>{i >= cuantas - 1 ? "Terminar" : "Continuar"}</button>
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
      <div aria-label="Ejecutar la orden"
        className={"ea-luz" + (estado === "lista" ? " lista" : estado === "hecho" ? " roja" : "")}
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
    return { q: `Ventas de ${v} y utilidad de ${u}. El margen es`, ops: [mrg, mrg + 5, Math.round(u / (v + u) * 100)], c: mrg, u: "%" };
  } },
  { min: 1, f: () => {
    const compra = [40, 50, 80, 120][Math.floor(Math.random() * 4)];
    const f = [1.25, 1.5, 1.75, 2][Math.floor(Math.random() * 4)];
    const c = Math.round((f - 1) * 100);
    return { q: `Compraste a ${compra} y vendiste a ${compra * f}. Tu retorno es`, ops: [c, Math.round((1 - 1 / f) * 100), c + 10], c, u: "%" };
  } },
  { min: 1, f: () => {
    const r = [4, 6, 8, 9, 12][Math.floor(Math.random() * 5)];
    const c = Math.round(72 / r);
    return { q: `A una tasa de ${r}% anual, el capital se duplica aproximadamente en`, ops: [c, c + 4, Math.max(2, c - 3)], c, u: " años" };
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
    return { q: `Duración modificada de ${dur} y las tasas suben ${pb}%. El precio del bono cae cerca de`, ops: [c, pb, dur], c, u: "%" };
  } },
  { min: 2, f: () => {
    const renta = [60, 90, 120, 180][Math.floor(Math.random() * 4)];
    const cap = [6, 8, 9, 10][Math.floor(Math.random() * 4)];
    const c = Math.round(renta / (cap / 100));
    return { q: `Un inmueble renta ${renta} mil netos al año y el mercado paga una tasa de capitalización de ${cap}%. Vale cerca de`, ops: [c, Math.round(renta * cap), Math.round(renta / (cap / 50))], c, u: " mil" };
  } },
  { min: 3, f: () => {
    const eb = [20, 30, 40, 60][Math.floor(Math.random() * 4)];
    const d = [80, 120, 150, 200][Math.floor(Math.random() * 4)];
    const tasa = [8, 10, 12][Math.floor(Math.random() * 3)];
    const int = d * tasa / 100;
    const c = +(eb / int).toFixed(1);
    return { q: `EBITDA de ${eb} y deuda de ${d} al ${tasa}%. La cobertura de intereses es`, ops: [c, +(eb / d * 10).toFixed(1), +(int / eb).toFixed(1)], c, u: " veces" };
  } },
  { min: 3, f: () => {
    const acc = [80, 100, 120][Math.floor(Math.random() * 3)];
    const nue = [20, 25, 40][Math.floor(Math.random() * 3)];
    const c = Math.round(nue / (acc + nue) * 100);
    return { q: `Hay ${acc} millones de acciones y se emiten ${nue} millones nuevas. La dilución del accionista actual es`, ops: [c, Math.round(nue / acc * 100), Math.round(acc / nue)], c, u: "%" };
  } },
  { min: 3, f: () => {
    const ebit = [50, 70, 90][Math.floor(Math.random() * 3)];
    const tax = [25, 30, 34][Math.floor(Math.random() * 3)];
    const dep = [10, 15, 20][Math.floor(Math.random() * 3)];
    const capex = [15, 25, 30][Math.floor(Math.random() * 3)];
    const c = Math.round(ebit * (1 - tax / 100) + dep - capex);
    return { q: `EBIT de ${ebit}, impuesto ${tax}%, depreciación ${dep} y capex ${capex}, sin cambio en capital de trabajo. El flujo libre a la firma es`, ops: [c, Math.round(ebit + dep - capex), Math.round(ebit * (1 - tax / 100) - dep + capex)], c, u: "" };
  } },
  { min: 4, f: () => {
    const we = [40, 50, 60][Math.floor(Math.random() * 3)];
    const ke = [14, 16, 18][Math.floor(Math.random() * 3)];
    const kd = [8, 9, 10][Math.floor(Math.random() * 3)];
    const tax = 30;
    const c = +((we / 100) * ke + (1 - we / 100) * kd * (1 - tax / 100)).toFixed(1);
    return { q: `Capital propio ${we}% al ${ke}, deuda al ${kd} con impuesto de 30. El WACC es`, ops: [c, +((we / 100) * ke + (1 - we / 100) * kd).toFixed(1), +(((ke + kd) / 2)).toFixed(1)], c, u: "%" };
  } },
  { min: 4, f: () => {
    const eq = [30, 40, 50][Math.floor(Math.random() * 3)];
    const m = [2, 2.5, 3][Math.floor(Math.random() * 3)];
    const anos = [4, 5][Math.floor(Math.random() * 2)];
    const c = Math.round((Math.pow(m, 1 / anos) - 1) * 100);
    return { q: `Pusiste ${eq} de capital y sales en ${Math.round(eq * m)} a los ${anos} años. Tu TIR anual es cerca de`, ops: [c, Math.round((m - 1) * 100), Math.round((m - 1) * 100 / anos)], c, u: "%" };
  } },
  { min: 4, f: () => {
    const cf = [1000, 1500, 2000][Math.floor(Math.random() * 3)];
    const g = [2, 3][Math.floor(Math.random() * 2)];
    const wacc = [9, 10, 12][Math.floor(Math.random() * 3)];
    const c = Math.round(cf * (1 + g / 100) / ((wacc - g) / 100));
    return { q: `Flujo de ${cf} que crece al ${g}% a perpetuidad y se descuenta al ${wacc}. El valor terminal es`, ops: [c, Math.round(cf / (wacc / 100)), Math.round(cf * (1 + g / 100) / (wacc / 100))], c, u: "" };
  } },
  { min: 5, f: () => {
    const local = [24, 30, 36][Math.floor(Math.random() * 3)];
    const usd = [4, 5, 6][Math.floor(Math.random() * 3)];
    const c = local - usd;
    return { q: `Tasa local ${local}% y tasa en dólares ${usd}. Cubrir el riesgo cambiario a un año te cuesta cerca de`, ops: [c, local + usd, Math.round(local / usd)], c, u: "%" };
  } },
  { min: 5, f: () => {
    const pat = [1, 2, 3][Math.floor(Math.random() * 3)];
    const caida = [30, 40, 50][Math.floor(Math.random() * 3)];
    const c = Math.round((1 / (1 - caida / 100) - 1) * 100);
    return { q: `Tu cartera cae ${caida}%. Para volver al punto de partida necesitas subir`, ops: [c, caida, caida + 10], c, u: "%" };
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

/* ---- Poner en orden ----
   Reescrito: antes un solo error terminaba el juego. Ahora tienes tres
   intentos, el error se marca en rojo un momento y puedes seguir desde
   donde ibas. Además se dice explícitamente qué criterio se está
   ordenando y se numeran los que ya colocaste. */

const VIDAS_ORDEN = 3;

function JuegoOrden({ ayuda, onFin }) {
  const [set] = useState(() => elegirAzar(ORDENES) || ORDENES[0]);
  const [lista] = useState(() => set.l.slice().sort(() => Math.random() - 0.5));
  const [paso, setPaso] = useState(() => (ayuda >= 60 ? 1 : 0));
  const [err, setErr] = useState(null);
  const [vidas, setVidas] = useState(VIDAS_ORDEN);
  const [fin, setFin] = useState(false);
  const [aviso, setAviso] = useState(null);

  const total = set.l.length;

  const tocar = (item) => {
    if (fin || err) return;
    if (item === set.l[paso]) {
      const p = paso + 1;
      setPaso(p);
      setAviso(null);
      if (p >= total) {
        setFin(true);
        setAviso("Secuencia correcta");
        setTimeout(() => onFin(vidas === VIDAS_ORDEN ? "exito" : vidas === VIDAS_ORDEN - 1 ? "parcial" : "parcial"), 700);
      }
      return;
    }
    const quedan = vidas - 1;
    setErr(item);
    setVidas(quedan);
    if (quedan <= 0) {
      setFin(true);
      setAviso("Se acabaron los intentos");
      setTimeout(() => onFin(paso >= Math.ceil(total / 2) ? "parcial" : "fallo"), 800);
      return;
    }
    setAviso("Ese no va aquí. Te quedan " + quedan + (quedan === 1 ? " intento." : " intentos."));
    setTimeout(() => setErr(null), 700);
  };

  const puesto = (item) => set.l.indexOf(item) < paso;

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Colocados {paso} de {total}</span>
        <span>Intentos {vidas} de {VIDAS_ORDEN}</span>
      </div>
      <div className="ea-pista">
        Toca los elementos en el orden que pide el enunciado, del primero al último.
        Equivocarte cuesta un intento, no la partida.
      </div>
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
      <div className="ea-vidas">
        {Array.from({ length: VIDAS_ORDEN }, (_, k) => (
          <span key={k} className={"ea-vida" + (k < vidas ? " viva" : "")} />
        ))}
      </div>
      <div style={{ minHeight: 22, marginTop: 8, fontSize: 13.5, color: "#3A4649" }}>{aviso}</div>
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

function MiniJuego({ tipo, ayuda, nivel, onFin, modo }) {
  if (tipo === "precision") return <JuegoPrecision ayuda={ayuda} onFin={onFin} />;
  if (tipo === "memoria") return <JuegoMemoria ayuda={ayuda} onFin={onFin} />;
  if (tipo === "ojo") return <JuegoOjo ayuda={ayuda} onFin={onFin} />;
  if (tipo === "anclaje") return <JuegoAnclaje ayuda={ayuda} onFin={onFin} />;
  if (tipo === "tresraya") return <JuegoTresRaya ayuda={ayuda} onFin={onFin} />;
  if (tipo === "quiz") return <JuegoQuiz ayuda={ayuda} nivel={nivel} onFin={onFin} modo={modo} />;
  if (tipo === "catedra") return <JuegoCatedra ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  if (tipo === "comite") return <JuegoComite ayuda={ayuda} onFin={onFin} />;
  if (tipo === "reaccion") return <JuegoReaccion ayuda={ayuda} onFin={onFin} />;
  if (tipo === "calculo") return <JuegoCalculo ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  if (tipo === "orden") return <JuegoOrden ayuda={ayuda} onFin={onFin} />;
  if (tipo === "semaforo") return <JuegoSemaforo ayuda={ayuda} nivel={nivel} onFin={onFin} />;
  if (tipo === "trading") return <JuegoTrading ayuda={ayuda} onFin={onFin} />;
  if (tipo === "estructura") return <JuegoEstructura ayuda={ayuda} onFin={onFin} />;
  if (tipo === "banderas") return <JuegoBanderas ayuda={ayuda} onFin={onFin} modo={modo} />;
  if (tipo === "pares") return <JuegoPares ayuda={ayuda} onFin={onFin} />;
  if (tipo === "carril") return <JuegoCarril ayuda={ayuda} onFin={onFin} />;
  if (tipo === "cuatro") return <JuegoCuatro ayuda={ayuda} onFin={onFin} />;
  if (tipo === "subasta") return <JuegoSubasta ayuda={ayuda} onFin={onFin} />;
  return <JuegoSuerte ayuda={ayuda} onFin={onFin} />;
}

/* ---- explicación antes de jugar ----
   Nadie aprende de un juego que no entendió. Primero las reglas,
   qué cuenta como éxito y para qué sirve en la vida real. */
function TarjetaJuego({ tipo, ayuda, nivel, statN, onFin, modo }) {
  const [listo, setListo] = useState(false);
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
  if (!j) return <MiniJuego tipo={tipo} ayuda={ayuda} nivel={nivel} onFin={cerrarUnaVez} modo={modo} />;
  if (listo) return <MiniJuego tipo={tipo} ayuda={ayuda} nivel={nivel} onFin={cerrarUnaVez} modo={modo} />;
  const nivelJuego = tipo === "quiz" || tipo === "calculo" || tipo === "semaforo" || tipo === "catedra";
  return (
    <div className="ea-jw">
      {/* Antes solo se veían tema y duración, así que «Tres en raya» aparecía
          como texto suelto y no se entendía que ibas a jugar algo. */}
      <div className="ea-jnombre ea-dis"><span>VAS A JUGAR</span>{j.n}</div>
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
      {modo === "aprendiz" && (GLOS_JUEGO[tipo] || []).map((k) => GLOSARIO[k]).filter(Boolean).map((g, i) => (
        <div className="ea-glos" key={i}>
          <div className="ea-glosK">{i === 0 ? "Palabras que vas a ver" : ""}</div>
          <div className="ea-glosT">{g.n}</div>
          <div className="ea-glosX">{g.x}</div>
        </div>
      ))}
      <button className="ea-btn" onClick={() => setListo(true)}>Entendido, empezar</button>
    </div>
  );
}

/* ---- juegos interactivos nuevos ---- */

/* ---- La clase de las siete ----
   El minijuego que faltaba: te explica un tema, con ejemplo numérico, y
   acto seguido te pregunta por él. Nada de examinar sobre cosas que el
   juego nunca se molestó en enseñar. El tema sale del nivel que te toca,
   y si ya viste todos los de tu nivel, sube o baja uno. */
function JuegoCatedra({ ayuda, nivel, onFin }) {
  const nv = clamp(numero(nivel, 1), 1, 5);
  const [tema] = useState(() => {
    const enNivel = TEMAS.filter((x) => x.nv === nv);
    const cerca = TEMAS.filter((x) => Math.abs(x.nv - nv) <= 1);
    return elegirAzar(enNivel.length ? enNivel : cerca.length ? cerca : TEMAS) || TEMAS[0];
  });
  const [preg] = useState(() => {
    const buenas = (tema.q || []).filter((p) => p && p.q && Array.isArray(p.ops) && p.ops.indexOf(p.correcta) >= 0);
    const cuantas = ayuda >= 60 ? 2 : Math.min(3, buenas.length);
    return buenas.slice().sort(() => Math.random() - 0.5).slice(0, Math.max(1, cuantas))
      .map((p) => ({ ...p, ops: p.ops.slice().sort(() => Math.random() - 0.5) }));
  });
  const [fase, setFase] = useState("clase");
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [ok, setOk] = useState(0);

  if (fase === "clase") {
    return (
      <div className="ea-jw">
        <div className="ea-jinfo ea-dis">
          <span>Clase · nivel {nv}</span>
          <span>{preg.length} {preg.length === 1 ? "pregunta" : "preguntas"} después</span>
        </div>
        <h3 className="ea-claseT ea-dis">{tema.n}</h3>
        <p className="ea-memoTxt">{tema.x}</p>
        <div className="ea-ej">
          <div className="ea-lecK">Con números</div>
          <div className="ea-ejX">{tema.ej}</div>
        </div>
        <div className="ea-pista" style={{ marginTop: 14, marginBottom: 0 }}>
          Léelo con calma. Cuando pases de aquí ya no vuelves a ver la explicación.
        </div>
        <button className="ea-btn" onClick={() => setFase("quiz")}>Ya lo tengo, pregúntame</button>
      </div>
    );
  }

  const p = preg[Math.min(i, preg.length - 1)];
  const responder = (txt) => {
    if (sel !== null) return;
    setSel(txt);
    if (txt === p.correcta) setOk(ok + 1);
  };
  const seguir = () => {
    if (i >= preg.length - 1) {
      const r = ok / preg.length;
      onFin(r >= 0.999 ? "exito" : r >= 0.5 ? "parcial" : "fallo");
    } else { setI(i + 1); setSel(null); }
  };

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>{tema.n}</span>
        <span>Pregunta {i + 1} de {preg.length} · aciertos {ok}</span>
      </div>
      <p className="ea-qtxt">{p.q}</p>
      <div className="ea-ops" style={{ marginTop: 0 }}>
        {p.ops.map((txt, k) => {
          let cls = "ea-op";
          if (sel !== null && txt === p.correcta) cls += " ok";
          else if (sel === txt) cls += " no";
          return (
            <button className={cls} key={k} disabled={sel !== null} onClick={() => responder(txt)}>
              <span className="ea-opN ea-mono">{String.fromCharCode(65 + (k % 26))}</span>{txt}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div>
          <div className="ea-expl">{p.e}</div>
          <button className="ea-btn" onClick={seguir}>{i >= preg.length - 1 ? "Terminar la clase" : "Siguiente"}</button>
        </div>
      )}
    </div>
  );
}

/* ---- La sesión ----
   Reescrito para que se entienda qué estás mirando. Antes decía "Dentro"
   y "Fuera" sin explicar de qué, y comparaba contra un rival invisible.
   Ahora: un cartel grande dice si tienes la acción o estás en efectivo,
   hay leyenda bajo el gráfico, y el rival contra el que compites está
   nombrado desde el primer segundo. */
function JuegoTrading({ ayuda, onFin }) {
  const TICKS = 24;
  const RITMO = 780;
  const [serie] = useState(() => {
    const vol = clamp(0.055 - ayuda * 0.00012, 0.03, 0.055);
    const tendencia = (numero(Math.random(), 0.5) - 0.42) * 0.012;
    const arr = [100];
    for (let i = 1; i < TICKS; i++) {
      arr.push(Math.max(20, arr[i - 1] * (1 + tendencia + vol * gauss())));
    }
    return arr;
  });
  const [i, setI] = useState(0);
  const [dentro, setDentro] = useState(false);
  const [equity, setEquity] = useState(100);
  const [hist, setHist] = useState([100]);
  const [fin, setFin] = useState(false);
  const [ops, setOps] = useState(0);
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
    }, RITMO);
    return () => clearTimeout(id);
  }, [i, fin, serie, equity]);

  const precio = serie[Math.min(i, TICKS - 1)];
  const bench = (precio / serie[0]) * 100;
  const mio = (equity / 100 - 1) * 100;
  const suyo = (bench / 100 - 1) * 100;
  const dif = mio - suyo;

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
      <div className="ea-pista">
        Una acción va a moverse durante {TICKS} momentos. Con <strong>Comprar</strong> la tienes y su subida o bajada
        te toca entera; con <strong>Vender</strong> te sales a efectivo y dejas de moverte. Compites contra alguien
        que compró al principio y no volvió a tocar nada. Ganas si terminas por encima de él.
      </div>

      <div className={"ea-estado " + (dentro ? "dentro" : "fuera")}>
        {dentro ? "TIENES LA ACCIÓN" : "ESTÁS EN EFECTIVO"}
      </div>

      <div className="ea-jinfo ea-dis" style={{ marginTop: 10 }}>
        <span>Momento {i + 1} de {TICKS}</span>
        <span>Precio {precio.toFixed(1)} · operaciones {ops}</span>
      </div>

      <svg className="ea-graf" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path className="ea-grafL" d={path(vistos, 60, max, min)} vectorEffect="non-scaling-stroke" />
        <path className="ea-grafD" d={path(hist, 60, max, min)} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="ea-leyenda">
        <span><i className="ea-lineaL" /> precio de la acción</span>
        <span><i className="ea-lineaD" /> tu cuenta</span>
      </div>

      <div className="ea-marcador">
        <div>
          <div className="ea-lecK">Tu cuenta</div>
          <div className="ea-mono ea-marcaV" style={{ color: mio >= 0 ? "#3E6B3C" : "var(--rojo)" }}>
            {mio >= 0 ? "+" : ""}{mio.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="ea-lecK">El que compró y no tocó nada</div>
          <div className="ea-mono ea-marcaV" style={{ color: suyo >= 0 ? "#3E6B3C" : "var(--rojo)" }}>
            {suyo >= 0 ? "+" : ""}{suyo.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="ea-lecK">Le llevas</div>
          <div className="ea-mono ea-marcaV" style={{ color: dif >= 0 ? "#3E6B3C" : "var(--rojo)" }}>
            {dif >= 0 ? "+" : ""}{dif.toFixed(1)}
          </div>
        </div>
      </div>

      {!fin ? (
        <div className="ea-fila2">
          <button className="ea-btn" style={{ marginTop: 0, flex: 1 }}
            onClick={() => { setDentro(true); setOps(ops + 1); }} disabled={dentro}>Comprar</button>
          <button className="ea-btn" style={{ marginTop: 0, flex: 1, background: "var(--rojo)" }}
            onClick={() => { setDentro(false); setOps(ops + 1); }} disabled={!dentro}>Vender</button>
        </div>
      ) : (
        <div>
          <div className={"ea-alerta " + (dif >= 4 ? "bien" : dif >= -0.5 ? "" : "mal")}>
            Cerró la sesión. Terminaste {dif >= 0 ? "por encima" : "por debajo"} del que compró al principio
            y se fue a dormir, por {Math.abs(dif).toFixed(1)} puntos, después de {ops} {ops === 1 ? "operación" : "operaciones"}.
            {dif < 0 ? " Es el resultado más común: entrar y salir suele costar más de lo que salva." : " Que salga bien una vez no significa que se pueda repetir treinta años seguidos."}
          </div>
          <button className="ea-btn" onClick={() => onFin(dif >= 4 ? "exito" : dif >= -0.5 ? "parcial" : "fallo")}>Continuar</button>
        </div>
      )}
    </div>
  );
}

/* ---- Armar la estructura ----
   Reescrito de arriba abajo. Antes eran dos deslizadores llamados
   "senior" y "mezzanine" y un múltiplo que aparecía sin explicación.
   Ahora hay una sola decisión —cuánto pides prestado— con la cuenta
   completa a la vista y, sobre todo, los dos escenarios en números:
   qué te llevas si va bien y qué pasa si va mal. Que es exactamente
   lo que enseña el apalancamiento. */
function JuegoEstructura({ ayuda, onFin }) {
  const [caso] = useState(() => {
    const eb = 14 + indiceAzar(12);
    return {
      eb,
      precio: eb * 8,
      crec: 1.14 + numero(Math.random(), 0.5) * 0.22,
      nombre: elegirAzar(["Envases del Sur", "Clínica Aurora", "Transportes Bolívar", "Alimentos Real", "Química Andina"]) || "la compañía",
    };
  });
  const maxDeuda = Math.round(caso.eb * 5);
  const [deuda, setDeuda] = useState(Math.round(caso.eb * 2));
  const [cerrado, setCerrado] = useState(null);

  const propio = Math.max(0, caso.precio - deuda);
  const apal = deuda / caso.eb;
  const tasa = apal <= 3 ? 0.09 : 0.09 + (apal - 3) * 0.025;   /* más deuda, más cara */
  const interes = deuda * tasa;
  const cobertura = interes > 0 ? caso.eb / interes : 99;
  const minPropio = caso.precio * 0.1;

  /* escenario bueno: la empresa crece y amortiza deuda */
  const ebBien = caso.eb * caso.crec;
  const deudaBien = Math.max(0, deuda - caso.eb * 1.2);
  const propioBien = Math.max(0, ebBien * 8 - deudaBien);
  const moicBien = propio > 0 ? propioBien / propio : 0;

  /* escenario malo: el EBITDA cae 20% y el múltiplo se contrae */
  const ebMal = caso.eb * 0.8;
  const propioMal = Math.max(0, ebMal * 6.5 - deuda);
  const moicMal = propio > 0 ? propioMal / propio : 0;

  const rompe = cobertura < 2;

  const confirmar = () => {
    if (propio < minPropio) return;
    let nivel;
    if (rompe) nivel = numero(Math.random(), 0.5) < 0.7 ? "fallo" : "parcial";
    else if (moicBien >= 2.4 && moicMal > 0.6) nivel = "exito";
    else if (moicBien >= 1.7) nivel = "parcial";
    else nivel = "fallo";
    setCerrado(nivel);
  };

  const cierre = {
    exito: "Estructura fina. Suficiente deuda para que tu capital rinda de verdad y suficiente aire para aguantar un mal año sin que el banco se meta.",
    parcial: "Sale, sin brillar. O te faltó deuda y tu capital rindió como un bono, o te sobró y el margen quedó justo.",
    fallo: rompe
      ? "Te pasaste. Con esta deuda, el EBITDA no alcanza ni para pagar dos veces los intereses: al primer trimestre flojo se rompe el covenant y el banco toma el control de la empresa."
      : "El trato no compensa. Pusiste demasiado capital propio para el retorno que da, o el escenario malo se te lleva todo.",
  };

  const pctDeuda = caso.precio > 0 ? (deuda / caso.precio) * 100 : 0;

  return (
    <div className="ea-jw">
      <div className="ea-pista">
        Vas a comprar <strong>{caso.nombre}</strong>. Gana <strong>{caso.eb} millones</strong> al año operando
        y te la venden en <strong>{caso.precio} millones</strong>. Puedes pagarla con tu dinero, con dinero
        prestado, o con una mezcla. Mueve el deslizador y mira cómo cambian los dos escenarios de abajo.
      </div>

      <div className="ea-est">
        <div className="ea-estL">
          <span>Cuánto pides prestado</span>
          <span className="ea-mono">{deuda} millones · {apal.toFixed(1)} veces lo que gana</span>
        </div>
        <input className="ea-slider" type="range" min="0" max={maxDeuda} step="1" value={deuda} disabled={!!cerrado}
          onChange={(e) => setDeuda(entero(e.target.value, 0, 0, maxDeuda))} aria-label="Deuda" />
      </div>

      {/* la foto de quién pone qué */}
      <div className="ea-mix" style={{ marginTop: 6 }}>
        <div className="ea-mixSeg efe" style={{ width: (100 - pctDeuda).toFixed(1) + "%" }}>
          {100 - pctDeuda >= 18 ? "tu dinero " + Math.round(100 - pctDeuda) + "%" : ""}
        </div>
        <div className="ea-mixSeg cart" style={{ width: pctDeuda.toFixed(1) + "%" }}>
          {pctDeuda >= 18 ? "prestado " + Math.round(pctDeuda) + "%" : ""}
        </div>
      </div>

      <div className="ea-tabla" style={{ marginTop: 12 }}>
        <span className="ea-td">Pones de tu bolsillo</span><span className="ea-tdn ea-mono">{propio.toFixed(0)} millones</span>
        <span className="ea-td">Intereses que pagarás al año</span><span className="ea-tdn ea-mono">{interes.toFixed(1)} millones · {(tasa * 100).toFixed(1)}%</span>
        <span className="ea-td">Veces que el EBITDA cubre esos intereses</span><span className="ea-tdn ea-mono">{cobertura >= 99 ? "sin deuda" : cobertura.toFixed(1) + "x"}</span>
      </div>

      <div className="ea-escen">
        <div className="ea-escenC bien">
          <div className="ea-lecK">Si va bien</div>
          <div className="ea-escenX">La empresa crece {Math.round((caso.crec - 1) * 100)}% y pagas parte de la deuda.</div>
          <div className="ea-escenV ea-mono">{moicBien.toFixed(2)}x</div>
          <div className="ea-escenX">Recuperas {propioBien.toFixed(0)} millones sobre los {propio.toFixed(0)} que pusiste.</div>
        </div>
        <div className="ea-escenC mal">
          <div className="ea-lecK">Si va mal</div>
          <div className="ea-escenX">El EBITDA cae un quinto y nadie paga múltiplos altos ese año.</div>
          <div className="ea-escenV ea-mono">{moicMal.toFixed(2)}x</div>
          <div className="ea-escenX">
            {moicMal <= 0.05 ? "Tu capital se va a cero: la deuda se come todo el valor." : "Te quedan " + propioMal.toFixed(0) + " millones de los " + propio.toFixed(0) + " que pusiste."}
          </div>
        </div>
      </div>

      {propio < minPropio && <div className="ea-alerta mal">Ningún banco te presta tanto: tienes que poner al menos el 10% del precio de tu propio bolsillo.</div>}
      {rompe && propio >= minPropio && <div className="ea-alerta mal">Con esta deuda el EBITDA no cubre ni dos veces los intereses. Es el nivel en el que un trimestre flojo te cuesta la empresa.</div>}

      {!cerrado ? (
        <button className="ea-btn" onClick={confirmar} disabled={propio < minPropio}>Cerrar el trato así</button>
      ) : (
        <div>
          <div className={"ea-alerta " + (cerrado === "exito" ? "bien" : cerrado === "fallo" ? "mal" : "")}>{cierre[cerrado]}</div>
          <button className="ea-btn" onClick={() => onFin(cerrado)}>Continuar</button>
        </div>
      )}
    </div>
  );
}

/* ---- Banderas rojas ----
   Reescrito. Los tres cambios que importan:
   · cada línea, la marques o no, explica al final por qué era o no era
     una bandera roja. Antes solo se pintaba de verde y el jugador se
     quedaba igual de ciego que al empezar.
   · el resultado distingue tres cosas distintas: las que cazaste, las
     que se te pasaron y las que marcaste de más. No es lo mismo fallar
     por no ver un problema que por ver problemas donde no los hay.
   · en modo aprendiz se dice antes de empezar qué tipo de cosa buscar,
     porque a quien nunca ha leído unos estados financieros no se le
     puede pedir que adivine el criterio. */
function JuegoBanderas({ ayuda, onFin, modo }) {
  const CUANTAS = 3;
  const [caso] = useState(() => {
    const b = elegirAzar(BANDERAS) || BANDERAS[0];
    /* con criterio alto se descartan señuelos, y se dice cuántos */
    const quitar = ayuda >= 65 ? 2 : ayuda >= 45 ? 1 : 0;
    const malas = (b.mal || []).map((x, i) => ({ ...x, id: "m" + i, roja: true }));
    const buenas = (b.ok || []).map((x, i) => ({ ...x, id: "b" + i, roja: false }))
      .sort(() => Math.random() - 0.5).slice(0, Math.max(2, 5 - quitar));
    return {
      t: b.t, doc: b.doc, pista: b.pista, quitar,
      lista: malas.concat(buenas).sort(() => Math.random() - 0.5),
    };
  });
  const [sel, setSel] = useState([]);
  const [rev, setRev] = useState(false);

  const marcada = (it) => sel.indexOf(it.id) >= 0;
  const marcar = (it) => {
    if (rev) return;
    if (marcada(it)) setSel(sel.filter((y) => y !== it.id));
    else if (sel.length < CUANTAS) setSel(sel.concat(it.id));
  };

  const rojas = caso.lista.filter((x) => x.roja);
  const cazadas = rojas.filter(marcada);
  const perdidas = rojas.filter((x) => !marcada(x));
  const falsas = caso.lista.filter((x) => !x.roja && marcada(x));
  const aciertos = cazadas.length;

  const veredicto = aciertos === CUANTAS
    ? "Las tres. Levantaste exactamente lo que había que levantar y no te inventaste problemas donde no los había."
    : aciertos === CUANTAS - 1
      ? "Dos de tres. Suficiente para que el asunto escale, y la que se te pasó es de las que salen caras."
      : aciertos === 1
        ? "Solo una. Con este informe la operación sigue adelante creyendo que está limpia."
        : "Ninguna. Marcaste ruido operativo y dejaste pasar los tres problemas de verdad.";

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Marcadas {sel.length} de {CUANTAS}</span>
        <span>{caso.quitar > 0 ? "Tu criterio descartó " + caso.quitar + (caso.quitar === 1 ? " señuelo" : " señuelos") : "Sin descartes"}</span>
      </div>

      {caso.doc && (
        <div className="ea-docK ea-dis">Sobre la mesa · {caso.doc}</div>
      )}
      <p className="ea-qtxt" style={{ marginTop: 8 }}>{caso.t}</p>

      {modo === "aprendiz" && caso.pista && !rev && (
        <div className="ea-glos">
          <div className="ea-glosK">Qué estás buscando</div>
          <div className="ea-glosX">{caso.pista}</div>
        </div>
      )}

      <div className="ea-ops" style={{ marginTop: 12 }}>
        {caso.lista.map((it) => {
          let cls = "ea-check";
          if (rev) cls += it.roja ? " bien" : marcada(it) ? " mal" : "";
          else if (marcada(it)) cls += " sel";
          return (
            <button className={cls} key={it.id} disabled={rev} onClick={() => marcar(it)}>
              <span className="ea-checkB ea-mono">{marcada(it) ? "X" : "·"}</span>
              <span>
                {it.t}
                {rev && (
                  <span className="ea-checkX">
                    <span className={"ea-checkR ea-dis" + (it.roja ? " roja" : "")}>
                      {it.roja
                        ? (marcada(it) ? "Bandera roja · la viste" : "Bandera roja · se te pasó")
                        : (marcada(it) ? "No lo era · la marcaste de más" : "No lo era")}
                    </span>
                    {it.x}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {!rev ? (
        <button className="ea-btn" disabled={sel.length < CUANTAS} onClick={() => setRev(true)}>Entregar el informe</button>
      ) : (
        <div>
          <div className={"ea-alerta " + (aciertos === CUANTAS ? "bien" : aciertos === CUANTAS - 1 ? "" : "mal")}>
            {veredicto}
          </div>
          <div className="ea-tabla" style={{ marginTop: 10 }}>
            <span className="ea-td">Banderas que cazaste</span><span className="ea-tdn ea-mono">{cazadas.length} de {CUANTAS}</span>
            <span className="ea-td">Se te pasaron</span><span className="ea-tdn ea-mono">{perdidas.length}</span>
            <span className="ea-td">Marcaste de más</span><span className="ea-tdn ea-mono">{falsas.length}</span>
          </div>
          {falsas.length > 0 && (
            <div className="ea-expl">
              Marcar de más también cuesta: en una operación real, levantar tres alarmas falsas quema tu
              credibilidad para el día que la alarma sea verdadera.
            </div>
          )}
          <button className="ea-btn" onClick={() => onFin(aciertos === CUANTAS ? "exito" : aciertos === CUANTAS - 1 ? "parcial" : "fallo")}>Continuar</button>
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
            <div key={f.id} {...pulsable(() => tocar(f), hecha || abierta ? f.t : "Ficha tapada", hecha)}
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
          <div className="ea-col4" key={c} {...pulsable(() => jugar(c), "Soltar ficha en la columna " + (c + 1))}>
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

/* ---- El comité de inversión ----
   Tres negocios sobre la mesa y capital para uno. No hay pistas: están
   los cinco datos y hay que decidir. Es el modo que entrena lo único
   que de verdad hace falta para gestionar un fondo, que es distinguir
   un buen negocio de uno que solo lo parece. */
function JuegoComite({ ayuda, onFin }) {
  const [mesa] = useState(() => {
    const pool = EMPRESAS.slice().sort(() => Math.random() - 0.5);
    /* con criterio alto la diferencia entre el mejor y el resto es más clara */
    const cuantos = 3;
    const elegidas = pool.slice(0, cuantos).map((e) => ({ ...e, q: calidadDeal(e) }));
    return elegidas.sort(() => Math.random() - 0.5);
  });
  const [sel, setSel] = useState(null);

  const orden = mesa.slice().sort((a, b) => b.q - a.q);
  const mejor = orden[0];
  const elegido = sel == null ? null : mesa[sel];
  const puesto = elegido ? orden.findIndex((x) => x.n === elegido.n) : -1;

  const nivel = puesto === 0 ? "exito" : puesto === 1 ? "parcial" : "fallo";
  const cierre = puesto === 0
    ? "Elegiste el mejor de los tres. Fíjate en qué te lo dijo: no era el que más crecía, era el que crecía con margen, sin depender de un cliente y sin deuda encima."
    : puesto === 1
      ? "Segundo mejor. Defendible en un comité, y aun así había uno claramente superior."
      : "Te quedaste con el peor de los tres. Casi siempre pasa por mirar el crecimiento y no mirar de quién depende la facturación.";

  return (
    <div className="ea-jw">
      <div className="ea-jinfo ea-dis">
        <span>Tres negocios · capital para uno</span>
        <span>{ayuda >= 60 ? "Tu criterio ya descarta lo obvio" : "Sin pistas"}</span>
      </div>
      <div className="ea-pista">
        Estos son los cinco datos con los que se decide de verdad. Crecer y tener margen suman;
        depender de un solo cliente y arrastrar deuda restan casi lo mismo. Elige uno.
      </div>

      {mesa.map((e, i) => {
        const marcado = sel === i;
        const esMejor = sel != null && e.n === mejor.n;
        return (
          <div key={e.n} className={"ea-deal" + (marcado ? " sel" : "") + (sel != null && esMejor ? " gana" : "")}>
            <div className="ea-itemTop">
              <span className="ea-itemN">{e.n}</span>
              <span className="ea-mono" style={{ fontSize: 12, flexShrink: 0 }}>{e.s}</span>
            </div>
            <div className="ea-dealS">
              {senalesDeal(e).map((x) => (
                <span key={x.k} className={"ea-sen" + (x.bien ? " bien" : x.mal ? " mal" : "")}>
                  <span className="ea-senK">{x.k}</span>
                  <span className="ea-senV ea-mono">{x.v}</span>
                </span>
              ))}
            </div>
            <div className="ea-itemD">{e.d}</div>
            {sel == null
              ? <button className="ea-mini" onClick={() => setSel(i)}>Poner el capital aquí</button>
              : <div className="ea-dealR">
                  {esMejor ? "Era el mejor de los tres" : "Múltiplo esperado " + baseDeal(e).toFixed(2) + "x"}
                  {marcado && !esMejor ? " · lo elegiste" : ""}
                </div>}
          </div>
        );
      })}

      {sel != null && (
        <div>
          <div className={"ea-alerta " + (nivel === "exito" ? "bien" : nivel === "fallo" ? "mal" : "")}>{cierre}</div>
          <button className="ea-btn" onClick={() => onFin(nivel)}>Continuar</button>
        </div>
      )}
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

function Plegable({ titulo, resumen, abierto, tono, children }) {
  const [ab, setAb] = useState(!!abierto);
  return (
    <div className={"ea-pleg" + (ab ? " on" : "")}>
      <button className="ea-plegB" onClick={() => setAb(!ab)} aria-expanded={ab ? "true" : "false"}>
        <span className="ea-plegF ea-mono" aria-hidden="true">{ab ? "–" : "+"}</span>
        <span className="ea-plegT ea-dis">{titulo}</span>
        {resumen != null && (
          <span className="ea-plegR ea-mono" style={tono ? { color: tono } : undefined}>{resumen}</span>
        )}
      </button>
      {ab && <div className="ea-plegC">{children}</div>}
    </div>
  );
}

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
const fmtCorto = (n) => {
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

const caminoAnual = (inicio, fin, sd, pasos) => {
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
function Curva({ camino, ret, hitos }) {
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
  const tono = arriba ? "#2F5A2E" : "#9C3A2C";

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
  const colorHito = (nv) => (nv === "exito" ? "#2F5A2E" : nv === "fallo" ? "#9C3A2C" : "#6C6255");

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
              fill={colorHito(m.nivel)} stroke="#E9E3D5" strokeWidth="1.2" />
          </g>
        ))}

        {/* el cierre, con anillo de superficie */}
        <circle cx={px(n)} cy={py(camino[n])} r="5.5" fill={tono} stroke="#E9E3D5" strokeWidth="2" />

        {/* el fondo de la caída */}
        {hayCaida && (
          <circle cx={px(dd.fondo)} cy={py(camino[dd.fondo])} r="3.2" fill="#9C3A2C" stroke="#E9E3D5" strokeWidth="1.5" />
        )}

        {/* cruceta del hover */}
        {idx != null && (
          <g>
            <line className="ea-cCruz" x1={px(idx)} x2={px(idx)} y1={MT} y2={MT + h} />
            <circle cx={px(idx)} cy={py(camino[idx])} r="4" fill={tono} stroke="#E9E3D5" strokeWidth="1.5" />
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
          <span className="ea-curvaTipD" style={{ color: camino[idx] >= partida ? "#2F5A2E" : "#9C3A2C" }}>
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
                <span className="ea-hitoC ea-mono" style={{ color: m.cash > 0 ? "#2F5A2E" : "#9C3A2C" }}>
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
function Chispa({ datos, desde }) {
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
  const tono = sube ? "#2F5A2E" : "#9C3A2C";
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
      <circle cx={px(n)} cy={py(serie[n])} r="5" fill={tono} stroke="#E9E3D5" strokeWidth="2" />
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
  /* si la cartera cambia por otra via (un evento, retomar partida), los
     controles se ponen al dia solos en vez de quedar mostrando lo viejo */
  const huella = JSON.stringify(actual) + "|" + objAct;
  const huellaAnt = useRef(huella);
  useEffect(() => {
    if (huellaAnt.current === huella) return;
    huellaAnt.current = huella;
    setW({ ...actual });
    setObj(objAct);
  }, [huella]);

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
        onChange={(e) => setObj(clamp(numero(e.target.value, 70) / 100, 0, 1))} />
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
              aria-label={a.n} onChange={(e) => setW(ajustarPesos(w, a.k, clamp(numero(e.target.value, 0) / 100, 0, 1)))} />
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
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Retorno esperado</span><span className="ea-mono">{(est.mu * 100).toFixed(1)}%</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Volatilidad</span><span className="ea-mono">{(est.sd * 100).toFixed(1)} puntos</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Año normal, entre</span><span className="ea-mono">{((est.mu - est.sd) * 100).toFixed(0)} y {((est.mu + est.sd) * 100).toFixed(0)}</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Un año malo de verdad</span><span className="ea-mono">{((est.mu - 2 * est.sd) * 100).toFixed(0)}%</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Retorno por unidad de riesgo</span><span className="ea-mono">{sharpe.toFixed(2)}</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Sensibilidad al mercado</span><span className="ea-mono">beta {beta.toFixed(2)}</span></div>
        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ahorro por diversificar</span><span className="ea-mono">{(ahorra * 100).toFixed(0)}%</span></div>
      </div>

      {ahorra > 0.14 && (
        <div className="ea-ok2">
          Sumados por separado tus activos darían {(sdSuma * 100).toFixed(0)} puntos de volatilidad y juntos dan
          {" "}{(est.sd * 100).toFixed(0)}. Esa diferencia es lo único gratis que hay en finanzas.
        </div>
      )}
      {conc.max >= 0.5 && (
        <div className="ea-avis">
          {Math.round(conc.max * 100)}% en {conc.activo.n.toLowerCase()}. Si eso cae la mitad, tu cartera
          se lleva {Math.round(conc.max * 50)}% del golpe.
        </div>
      )}
      {(w.cripto || 0) >= 0.25 && (
        <div className="ea-avis">Con esta dosis de cripto un año malo se te puede llevar un tercio de todo. Que sea porque quieres, no por descuido.</div>
      )}
      {beta >= 0.95 && (
        <div className="ea-avis">Beta cerca de uno: tienes varias líneas, pero todas responden al mismo mercado. Eso no es diversificar.</div>
      )}
      {ef >= 0.4 && (
        <div className="ea-avis">Casi la mitad de la cartera en efectivo, rindiendo {(EFECTIVO_MU * 100).toFixed(1)}%. Si es un colchón, ya lo tienes arriba en la barra.</div>
      )}

      {cambio ? (
        <div>
          <div className="ea-itemD" style={{ marginTop: 12 }}>
            Rotarías {Math.round(rot * 100)}% de la cartera{movObj > 1 ? " y moverías USD " + fmt(movObj) + " entre efectivo e inversión" : ""}.
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
        Cada movimiento cuesta 0,5% de lo que rotas. Rebalancear una vez al año es sano; perseguir al
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
/* Lo que el fondo puede tener desplegado: el capital comprometido más
   las ganancias que se quedaron dentro. Es lo que convierte al fondo en
   algo vivo en vez de una bolsa que se gasta una vez. */
const capacidadFondo = (f) => clamp(numero(f && f.tam, 0) + numero(f && f.reciclado, 0), 0, TOPE_PLATA);

/* Cada generación de fondo es dos veces y media la anterior. No hay
   techo: si devuelves capital, puedes seguir levantando más grande, que
   es exactamente cómo crece una gestora de verdad. */
const SALTO_FONDO = 2.5;
const puedeSiguienteFondo = (st) => {
  const f = st.fondo;
  if (!f) return false;
  if (numero(f.generacion, 1) >= 6) return false;          /* seis generaciones es una carrera entera */
  if (numero(f.realizado, 0) < numero(f.tam, 0) * 0.2) return false;  /* hace falta historial */
  return st.red >= 55 && st.rango >= 4;
};
const ROMANOS = ["", "I", "II", "III", "IV", "V", "VI", "VII"];

/* ============================================================
   DEBER DINERO
   Hasta ahora el efectivo podía quedarse en negativo y no pasaba nada:
   ni intereses, ni banco, ni consecuencias. Que es justo lo contrario
   de lo que enseña una vida real, donde quedarse sin dinero no te
   elimina, te mete en una relación cara y larga con un acreedor.

   Ahora: puedes pedir prestado, la deuda cobra intereses todos los
   años, si te pasas te embargan los bienes, y si aun así no cuadra
   puedes declararte en quiebra. Ninguna de las tres te saca del juego.
   ============================================================ */

/* Lo que te cobran depende de dónde vives, de tu reputación, de tu
   cargo y de si ya has quebrado antes. Que es más o menos como
   funciona de verdad. */
const tasaPrestamo = (st) => {
  const na = NACIONES.find((x) => x.id === st.pais) || NACIONES[0];
  let r = 0.11 + (numero(na.gas, 1) - 1) * 0.06;
  r += clamp((45 - numero(st.rep, 40)) / 100, 0, 0.18);   /* mala fama, dinero caro */
  r -= clamp(entero(st.rango, 0, 0, 6) * 0.008, 0, 0.05); /* cargo alto, algo mejor */
  r += entero(st.quiebras, 0, 0, 9) * 0.06;               /* haber quebrado se paga años */
  return clamp(r, 0.06, 0.45);
};

/* Cuánto más te prestarían: dos años de tu neto más la mitad de lo que
   tienes en bienes, menos lo que ya debes. Tras una quiebra, nada
   durante unos años. */
const topeCredito = (st, neto, bienes) => {
  if (entero(st.vetoCredito, 0, 0, 9) > 0) return 0;
  const tope = numero(neto, 0) * 2 + numero(bienes, 0) * 0.5;
  return Math.max(0, tope - numero(st.deuda, 0));
};

/* la parte de la deuda que hay que amortizar cada año */
const CUOTA_DEUDA = 0.18;
/* por encima de esto el banco deja de esperar y se cobra con lo que haya */
const EMBARGO_VECES = 3;
/* y por encima de esto ya no hay embargo que alcance */
const QUIEBRA_VECES = 5;
/* lo que se saca por un bien embargado: nadie remata a precio de mercado */
const DESCUENTO_EMBARGO = 0.62;

const TAMANOS = [
  { m: 25000000, n: "25 millones", red: 45, rango: 4 },
  { m: 60000000, n: "60 millones", red: 60, rango: 5 },
  { m: 150000000, n: "150 millones", red: 75, rango: 6 },
];

function Motor() {
  /* Nada entra al estado sin pasar por sanear(). Aunque un evento o un
     minijuego devuelva un disparate, lo que queda guardado es jugable. */
  const [s, setSbruto] = useState(BASE);
  const setS = (upd) => setSbruto((prev) => {
    try {
      const bruto = typeof upd === "function" ? upd(prev) : upd;
      return sanear(bruto);
    } catch (e) {
      try { console.error("[El Analista] estado", e); } catch (_) {}
      return prev;
    }
  });

  /* La puerta. React agrupa los setState del mismo tick, asi que mirar
     "fase" para saber si una accion ya se ejecuto no sirve: dos clics
     seguidos ven el mismo valor viejo y la accion corre dos veces. La
     referencia se actualiza de inmediato, y con eso no hay doble cobro
     de resultados, doble cierre de ano ni doble ascenso. */
  const [fase, setFaseBruto] = useState(() => (yaAceptoAviso() ? "portada" : "aviso"));
  const puerta = useRef(yaAceptoAviso() ? "portada" : "aviso");
  const irA = (f) => { puerta.current = f; setFaseBruto(f); };
  const enFase = (f) => puerta.current === f;
  const cerrando = useRef(false);
  /* Las decisiones que se van tomando dentro del año, para poder
     situarlas en el gráfico. Vive en una referencia y no en el estado
     porque solo hace falta entre el arranque y el cierre del mismo año:
     no tiene sentido guardarlo en la partida. */
  const hitosAno = useRef([]);
  const [tab, setTab] = useState(null);
  const [cola, setCola] = useState([]);
  const [ev, setEv] = useState(null);
  const [op, setOp] = useState(null);
  const [res, setRes] = useState(null);
  const [cierre, setCierre] = useState(null);
  const [fin, setFin] = useState(null);
  const [guardado, setGuardado] = useState(null);
  const [aviso, setAviso] = useState("");
  /* Las cuatro decisiones de partida viven aquí y NO tocan el estado del
     juego hasta que la partida arranca de verdad. Por eso se puede volver
     atrás sin deshacer nada, y por eso pulsar dos veces un país ya no
     duplica sus bonos: no hay nada acumulado que duplicar. */
  const SETUP0 = { nombre: "", genero: null, modo: "normal", edad: 20, pais: null, estudio: null, guia: null };
  const [elec, setElec] = useState(SETUP0);
  const aceptarAviso = () => { anotarAviso(); irA("portada"); };

  const elige = (campo, valor, siguiente) => {
    setElec((x) => ({ ...x, [campo]: valor }));
    irA(siguiente);
  };

  /* al abrir, mira si hay una partida a medio camino */
  useEffect(() => {
    let vivo = true;
    leerPartida()
      .then((d) => {
        if (!vivo || !d) return;
        const st = sanear(d.s);
        if (partidaJugable(st)) setGuardado({ v: VERSION, ts: numero(d.ts, 0), s: st });
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  const persistir = (st) => {
    let limpio;
    try { limpio = sanear(st); } catch (e) { return; }
    guardarPartida(limpio)
      .then((ok) => {
        setAviso(ok ? "Partida guardada" : "");
        if (ok) setGuardado({ v: VERSION, ts: Date.now(), s: limpio });
      })
      .catch(() => setAviso(""));
  };
  const tirarPartida = () => {
    try { const p = olvidarPartida(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
    setGuardado(null); setAviso("");
  };

  const tope = TOPE_DE(s.seguir);
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
  const salarioAnual = (st) => RANGO(st.rango).salario * 12 * paisDe(st).sal;
  const impuestoDe = (st) => paisDe(st).tax;
  const netoAnual = (st) => salarioAnual(st) * (1 - impuestoDe(st));
  const gastoAnual = (st) => {
    const na = paisDe(st);
    let g = netoAnual(st) * (0.55 + st.rango * 0.02) + 3500 * na.gas;
    /* cada dependiente cuesta, y una pareja abarata el gasto por cabeza
       sin llegar a costar cero: dos no viven por el precio de uno */
    g += st.hijos * COSTO_HIJO * na.gas;
    if (st.pareja === "casado") g *= 1.28;
    else if (st.pareja === "noviazgo") g *= 1.08;
    else if (st.pareja === "divorciado") g *= 1.12;   /* pensión y dos casas */
    g *= NIVEL_GASTO(st.nivelGasto).f;   /* cómo decidiste vivir */
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

  /* escenas de vida disponibles: filtran por edad y por estado familiar,
     y las marcadas "una" no se repiten nunca en la misma partida */
  const vidaDisponible = (st) => {
    const e = edad(st.turno, st.edadIni);
    return VIDA.filter((v) => {
      if (e < v.eMin || e > v.eMax) return false;
      if (v.una && st.vistos.indexOf(v.id) >= 0) return false;
      if (v.cuando) { try { if (!v.cuando(st)) return false; } catch (err) { return false; } }
      return true;
    });
  };

  const generarAno = (st) => {
    const lista = [];
    const usados = [];
    /* Lo primero del año: si algo se abre, se abre como escena y es el
       acontecimiento del año. Nunca más de una, para que llegar a un
       sistema nuevo no se sienta como que se destapó un menú. */
    const nueva = APERTURAS.filter((a) => !abierto(st, a.id) && tocaAbrir(st, a))[0];
    if (nueva) { lista.push(nueva.escena); usados.push(nueva.escena.id); }
    /* la vida no espera a que te asciendan: casi todos los años pasa algo */
    const vidas = vidaDisponible(st).filter((v) => usados.indexOf(v.id) < 0 && st.vistos.indexOf(v.id) < 0);
    if (vidas.length && Math.random() < 0.62) {
      /* Las escenas con condición de estado (tienes pareja, tienes hijos)
         solo existen mientras dure ese estado, así que si están sobre la
         mesa tienen prioridad. Si no, la cadena noviazgo-matrimonio-hijos
         casi nunca llegaría a completarse antes de que se acabe la vida. */
      const encadenadas = vidas.filter((v) => typeof v.cuando === "function");
      const pozo = encadenadas.length && Math.random() < 0.7 ? encadenadas : vidas;
      /* dentro del pozo mandan las de mayor prioridad: primero te
         preguntan si te casas y solo después aparece la ruptura */
      const maxPri = Math.max.apply(null, pozo.map((v) => numero(v.pri, 2)));
      const top = pozo.filter((v) => numero(v.pri, 2) === maxPri);
      const v = elegirAzar(top);
      if (v) { lista.push(v); usados.push(v.id); }
    }
    if (!st.rama && st.rango >= 3) { lista.push(DECISION_RAMA); usados.push(999); }
    if (esClave(st.turno)) {
      const k = sacar(D, st, usados);
      if (k) { lista.push(k); usados.push(k.id); }
    }
    /* La escena de apertura se SUMA al anio, no ocupa el sitio de un
       evento: si no, el anio en que se abre algo pierde variedad y se
       dejan de ver minijuegos que solo cuelgan de escenas aleatorias. */
    const objetivo = 2 + (Math.random() < 0.45 ? 1 : 0) + (nueva ? 1 : 0);
    while (lista.length < objetivo) {
      const e = sacar(E, st, usados);
      if (!e) break;
      lista.push(e); usados.push(e.id);
    }
    return lista;
  };

  /* una escena solo sirve si tiene opciones jugables */
  const escenaValida = (e) => !!(e && e.t && Array.isArray(e.o) && e.o.length);

  const arrancarAno = (st) => {
    hitosAno.current = [];
    let lista = [];
    try { lista = generarAno(st) || []; } catch (e) { lista = []; }
    lista = lista.filter(escenaValida);
    if (lista.length === 0) {
      const enRango = E.filter((e) => escenaValida(e) && st.rango >= e.min && st.rango <= e.max);
      const uno = elegirAzar(enRango.length ? enRango : E.filter(escenaValida));
      if (uno) lista = [uno];
    }
    if (lista.length === 0) {
      /* caso imposible en la practica, pero si pasara el ano se cierra
         igual en vez de dejar la pantalla en blanco */
      setCola([]); setOp(null); setEv(null);
      setRes({ msg: "Un ano sin sobresaltos en la oficina.", nivel: "parcial", cambios: [] });
      irA("resultado");
      return;
    }
    setCola(lista.slice(1));
    setEv(lista[0]);
    setOp(null);
    irA("evento");
  };

  /* Construye la partida entera de una vez, a partir de las cuatro
     elecciones. Un único lugar donde se suman bonos, así que no hay
     forma de aplicarlos dos veces ni de que se pierdan por el camino. */
  const arrancarPartida = (sel) => {
    const na = NACIONES.find((x) => x.id === sel.pais) || NACIONES[0];
    const ca = CARRERAS.find((x) => x.id === sel.estudio) || CARRERAS[0];
    const ed = EDAD_DE(sel.edad);

    let st = {
      ...BASE, pesos: { ...PERFILES[0].w }, perks: [], bienes: [], valores: {},
      titulares: [], vistos: [], histo: [], lecs: [],
    };
    st.modo = MODO(sel.modo).id;
    st.nombre = saneaNombre(sel.nombre);
    st.genero = GENEROS.some((g) => g.id === sel.genero) ? sel.genero : null;
    st.guia = sel.guia === true;
    st.guiaVistas = [];

    /* la edad: años de trayectoria, ahorro y desgaste */
    st.edadIni = ed.e;
    st.carrera = numero(st.carrera, 0) + numero(ed.car, 0);
    Object.keys(ed.mods || {}).forEach((k) => { st[k] = clamp(numero(st[k], 0) + ed.mods[k], 0, 100); });

    /* el país: efectivo de partida, más lo que la edad traía ahorrado */
    st.pais = na.id;
    st.cash = numero(na.cash, 0) + numero(ed.cash, 0);
    Object.keys(na.mods || {}).forEach((k) => { st[k] = clamp(numero(st[k], 0) + na.mods[k], 0, 100); });

    /* la formación */
    st.estudio = ca.id;
    Object.keys(ca.mods || {}).forEach((k) => { st[k] = clamp(numero(st[k], 0) + ca.mods[k], 0, 100); });

    /* el cargo se pone al día con la trayectoria que traes */
    while (st.rango < RANGOS.length - 1 && st.carrera >= RANGOS[st.rango].umbral) st.rango += 1;

    st.titulares = [{
      q: "2026",
      t: ed.e <= 20
        ? "Te gradúas de " + ca.n + " en " + na.ban
        : "Entras al sector a los " + ed.e + ", con tu título de " + ca.n + " en " + na.ban,
    }];
    st.histo = [st.cash];   /* punto de partida, para que el primer cierre ya tenga curva */

    st = sanear(st);
    setS(st);
    arrancarAno(st);
  };

  const empezar = () => {
    tirarPartida();
    setS({ ...BASE, pesos: { ...PERFILES[0].w }, perks: [], bienes: [], valores: {}, titulares: [], vistos: [], histo: [], lecs: [] });
    setElec(SETUP0);
    setFin(null); setRes(null); setCierre(null); setTab(null); irA("identidad");
  };

  /* el rastro de lo ya elegido, para que se vea qué hay detrás del Atrás */
  const rastro = () => {
    const partes = [MODO(elec.modo).n, "empiezas a los " + EDAD_DE(elec.edad).e];
    const na = NACIONES.find((x) => x.id === elec.pais);
    if (na) partes.push(na.n);
    return partes.join(" · ");
  };

  const Atras = ({ a, texto: rot }) => (
    <button className="ea-atras ea-dis" onClick={() => { if (enFase(fase)) irA(a); }}>
      &larr; {rot}
    </button>
  );

  /* retomar donde quedó: se reanuda al comienzo del año siguiente */
  const retomar = () => {
    if (!guardado) return;
    const st = sanear(guardado.s);
    if (!partidaJugable(st)) { tirarPartida(); return; }
    setS(st);
    setFin(null); setRes(null); setCierre(null); setTab(null);
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

  /* pedir prestado: entra en efectivo y sube la deuda */
  const ponerRitmo = (id) => setS((st) => ({ ...st, ritmo: RITMO(id).id }));
  const ponerGasto = (id) => setS((st) => ({ ...st, nivelGasto: NIVEL_GASTO(id).id }));

  const pedirPrestamo = (monto) => setS((st) => {
    const neto = netoAnual(st);
    const tope = topeCredito(st, neto, valorBienes(st));
    const m = clamp(numero(monto, 0), 0, tope);
    if (m < 100) return st;
    return {
      ...st, cash: st.cash + m, deuda: clamp(numero(st.deuda, 0) + m, 0, TOPE_PLATA),
      titulares: st.titulares.concat({ q: String(2026 + st.turno), t: "Pides prestados USD " + fmt(m) }),
    };
  });

  /* pagar por adelantado: lo mejor que puedes hacer con dinero ocioso
     cuando la tasa de tu deuda supera lo que rinde tu cartera */
  const pagarDeuda = (monto) => setS((st) => {
    const m = clamp(numero(monto, 0), 0, Math.min(numero(st.deuda, 0), Math.max(0, st.cash)));
    if (m < 50) return st;
    return { ...st, cash: st.cash - m, deuda: clamp(numero(st.deuda, 0) - m, 0, TOPE_PLATA) };
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
      fondo: { tam: t.m, gp, pct, invertido: 0, posiciones: [], realizado: 0, oferta: [], reciclado: 0, generacion: 1 },
      titulares: st.titulares.concat({ q: String(2026 + st.turno), t: "Levantas tu propio fondo de " + t.n }),
    };
  });

  /* levantar la siguiente generación: más grande, con el historial que
     ya tienes y sin límite superior */
  const levantarSiguiente = () => setS((st) => {
    if (!puedeSiguienteFondo(st)) return st;
    const f = st.fondo;
    const nuevoTam = clamp(numero(f.tam, 0) * SALTO_FONDO, 0, TOPE_PLATA);
    const gp = nuevoTam * f.pct;
    if (st.cash + st.cartera < gp) return st;
    const r = cobrar(st, gp);
    const gen = entero(numero(f.generacion, 1) + 1, 2, 2, 8);
    return {
      ...st, cash: r.cash, cartera: r.cartera,
      fondo: {
        ...f, tam: nuevoTam, gp, invertido: numero(f.invertido, 0),
        reciclado: numero(f.reciclado, 0), generacion: gen,
      },
      titulares: st.titulares.concat({
        q: String(2026 + st.turno),
        t: "Levantas tu fondo " + (ROMANOS[gen] || gen) + " de " + fmt(nuevoTam),
      }),
    };
  });

  const invertirEn = (idx, mult) => setS((st) => {
    const f = st.fondo;
    if (!f || !Array.isArray(f.oferta) || !f.oferta.length) return st;
    const i = entero(idx, -1, 0, f.oferta.length - 1);
    const m = clamp(numero(mult, 1), 0.1, 1);
    const deal = f.oferta[i];
    if (!deal || deal.tomado) return st;
    const cap = capacidadFondo(f);
    const ticket = Math.round(clamp(numero(deal.ticket, 0) * m, 0, cap));
    if (ticket <= 0 || f.invertido + ticket > cap) return st;
    const oferta = f.oferta.slice();
    oferta[i] = { ...deal, tomado: true };
    const pos = f.posiciones.concat({
      n: deal.n, s: deal.s, ticket, riesgo: deal.riesgo, base: deal.base,
      salida: st.turno + 3 + Math.floor(Math.random() * 3),
    });
    return { ...st, fondo: { ...f, invertido: f.invertido + ticket, posiciones: pos, oferta } };
  });

  /* ---------- resolución de una escena ---------- */
  const resolverEscena = (dBruto, nivelBruto, o) => {
    const d = dBruto && typeof dBruto === "object" ? dBruto : {};
    const nivel = nivelBruto === "exito" || nivelBruto === "parcial" || nivelBruto === "fallo" ? nivelBruto : "parcial";
    let st = { ...s, valores: { ...s.valores } };
    const cambios = [];
    if (o && o.ramaId) st.rama = o.ramaId;
    if (o && o.abre) st.abiertos = unicos((Array.isArray(st.abiertos) ? st.abiertos : []).concat(o.abre));
    if (o && o.mudar) st.pais = o.mudar;

    /* --- la vida --- */
    if (d.pareja && PAREJAS.indexOf(d.pareja) >= 0) st.pareja = d.pareja;
    if (d.hijos) st.hijos = entero(st.hijos + d.hijos, 0, 0, 8);
    if (d.estudia) st.estudia = clamp(st.estudia + numero(d.estudia, 0), 0, 500);
    /* un divorcio no resta una cifra fija: se lleva un porcentaje de todo */
    if (d.patPct) {
      const corte = clamp(numero(d.patPct, 0), 0, 0.6);
      const antes = st.cash + st.cartera;
      const quita = antes * corte;
      const r2 = cobrar(st, quita);
      st.cash = r2.cash; st.cartera = r2.cartera;
      cambios.push({ k: "cash", v: -Math.round(quita) });
    }

    ["mod", "cri", "red", "rep", "ene", "car"].forEach((k) => {
      if (!d[k]) return;
      let v = d[k];
      if (k === "rep" && v < 0 && tiene(st, "abogado")) v = Math.round(v * 0.6);
      if (k === "car") st.carrera += v;
      else st[k] = clamp(st[k] + v, 0, 100);
      cambios.push({ k, v });
    });
    if (d.cash) {
      let monto = Math.round(d.cash * ESCALA[st.rango]);
      /* el criterio no evita el golpe, lo amortigua: hasta un tercio
         menos de pérdida cuando de verdad sabes lo que haces */
      if (monto < 0 && st.cri > 55) {
        const amortigua = clamp((st.cri - 55) / 130, 0, 0.34);
        const ahorrado = Math.round(-monto * amortigua);
        if (ahorrado > 0) {
          monto += ahorrado;
          cambios.push({ k: "cri", v: 0, nota: "tu criterio te ahorró " + fmt(ahorrado) });
        }
      }
      if (monto >= 0) st.cash += monto;
      else { const r = cobrar(st, -monto); st.cash = r.cash; st.cartera = r.cartera; }
      cambios.push({ k: "cash", v: monto });
    }
    if (d.mercado) st.shock = (st.shock || 0) + d.mercado;
    if (d.msg) st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: d.msg.split(".")[0] });
    if (ev && ev.id != null) st.vistos = st.vistos.concat(ev.id);

    if (o && o.sigue && nivel === "exito" && CADENA[o.sigue]) {
      const extra = [].concat(CADENA[o.sigue]).filter(escenaValida);
      if (extra.length) setCola((c) => c.concat(extra).slice(0, 12));
    }

    setS(st);
    /* queda anotado qué decidiste, con qué resultado y qué costó */
    const enCaja = (cambios.find((c) => c.k === "cash") || {}).v || 0;
    hitosAno.current = hitosAno.current.concat({
      t: texto((ev && ev.t) || (o && o.t) || "Una decisión", "Una decisión", 60),
      nivel, cash: numero(enCaja, 0),
    }).slice(-6);

    setRes({ msg: texto(d.msg, "El asunto quedo cerrado.", 600), nivel, cambios });
    irA("resultado");
  };

  /* ---------- cierre del año ---------- */
  /* El cierre es la rutina mas larga del juego y la que mas cuentas hace.
     Si algo revienta ahi dentro, no se pierden treinta anos de partida:
     se pasa de ano con un informe minimo y se sigue jugando. */
  const cerrarAno = () => {
    if (cerrando.current) return;
    cerrando.current = true;
    try {
      cierreDelAno();
    } catch (e) {
      try { console.error("[El Analista] cierre de ano", e); } catch (_) {}
      const st = sanear({ ...s, turno: s.turno + 1, ene: clamp(s.ene - 8, 0, 100) });
      setS(st);
      setCierre({
        ano: 2026 + s.turno, notis: [], ascenso: null, cartera: null,
        notas: ["Este ano no se pudo levantar el informe completo. La partida sigue intacta."],
        ing: [], egr: [], ingreso: 0, egreso: 0, neto: 0, ahorro: 0,
        patAntes: 0, patrimonio: st.cash + st.cartera, bienesV: 0,
        histo: st.histo, leccion: null, hitos: [], deuda: false,
        cobertura: 0, gastos: 0, indep: 0,
      });
      irA("cierre");
    } finally {
      cerrando.current = false;
    }
  };

  const cierreDelAno = () => {
    let st = { ...s, valores: { ...s.valores } };
    const ing = [], egr = [], notas = [];
    const na = NACIONES.find((x) => x.id === st.pais) || NACIONES[0];
    const patAntes = st.cash + st.cartera + valorBienes(st) - numero(st.deuda, 0);
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
    const bono = RANGO(st.rango).salario * multB * na.sal;
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
      let devuelto = 0;
      f.posiciones.forEach((pp) => {
        if (st.turno < pp.salida) { quedan.push(pp); return; }
        const disp = 0.28 + pp.riesgo * 0.22;
        let m = Math.max(0, pp.base + disp * gauss() + (st.rama === "pe" ? 0.15 : 0));
        const proceeds = pp.ticket * m;
        const carry = Math.max(0, proceeds - pp.ticket * 1.4) * 0.2;
        const proRata = (proceeds - pp.ticket) * f.pct;
        realizado += carry + proRata;
        f.realizado += proceeds - pp.ticket;
        /* El capital vuelve al fondo. Sin esto, "invertido" solo subía y
           el fondo quedaba muerto en cuanto se desplegaba todo: nunca
           volvía a haber una sola oportunidad sobre la mesa. */
        devuelto += pp.ticket;
        /* Parte de la ganancia se queda dentro para volver a invertirse:
           es lo que hace que el fondo crezca solo. Está en el 35 por
           ciento y con tope de dos veces el capital comprometido porque
           al 50 y sin tope el fondo multiplicaba por quince en diez
           rotaciones y dejaba sin sentido al resto de la partida. */
        f.reciclado = clamp(
          numero(f.reciclado, 0) + Math.max(0, proceeds - pp.ticket) * 0.35,
          0, numero(f.tam, 0) * 2
        );
        notas.push(`Sale ${pp.n} a ${m.toFixed(2)}x. Tu parte, USD ${fmt(carry + proRata)}. Vuelven al fondo USD ${fmt(pp.ticket)} para reinvertir.`);
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: `Salida de ${pp.n} a ${m.toFixed(2)}x` });
      });
      if (realizado) ing.push({ n: "Carry e inversión propia del fondo", v: realizado });
      f.posiciones = quedan;
      f.invertido = clamp(numero(f.invertido, 0) - devuelto, 0, TOPE_PLATA);
      const libre = capacidadFondo(f) - f.invertido;
      /* cuantas más ganas, más deal flow te llega: tres o cuatro nombres
         en vez de dos, para que haya de dónde elegir */
      const cuantasOfertas = f.realizado > f.tam * 0.25 ? 4 : 3;
      f.oferta = libre > capacidadFondo(f) * 0.04
        ? EMPRESAS.slice().sort(() => Math.random() - 0.5).slice(0, cuantasOfertas).map((e) => ({
            n: e.n, s: e.s, riesgo: e.riesgo, base: baseDeal(e), tomado: false,
            crec: e.crec, mar: e.mar, conc: e.conc, deuda: e.deuda, foso: e.foso, d: e.d,
            ticket: Math.max(100000, Math.round(Math.min(libre * 0.45, capacidadFondo(f) * (0.07 + numero(Math.random(), 0.5) * 0.08)) / 100000) * 100000),
          }))
        : [];
      st.fondo = f;
    }

    /* ---- lo que sale ---- */
    const ingreso = ing.reduce((a, x) => a + x.v, 0);
    const gravable = salario + bono;
    const impuesto = gravable * na.tax;
    const gastos = gastoAnual(st);
    egr.push({ n: `Impuesto sobre la renta, ${Math.round(na.tax * 100)}%`, v: impuesto });
    egr.push({ n: "Costo de vida", v: gastos });
    const egreso = egr.reduce((a, x) => a + x.v, 0);
    const neto = ingreso - egreso;
    st.cash += neto;
    const ahorro = ingreso > 0 ? clamp(neto / ingreso, -2, 1) : 0;

    /* ---- noticias del año, sesgadas por el país ---- */
    let notis = [];
    const conSesgo = NOTICIAS.filter((x) => x.k === na.sesgo);
    notis.push(Math.random() < 0.4 && conSesgo.length ? elegirAzar(conSesgo) : elegirAzar(NOTICIAS));
    if (Math.random() < 0.45) {
      const seg = elegirAzar(NOTICIAS);
      if (seg && notis[0] && seg.t !== notis[0].t) notis.push(seg);
    }
    notis = notis.filter((x) => x && x.i);

    /* ---- lo que debes ---- */
    const netoDeAno = salario + bono;
    /* normalizar antes de operar: sanear() ya lo garantiza en la partida,
       pero este bloque hace aritmética con la deuda y no debe fiarse */
    st.deuda = clamp(numero(st.deuda, 0), 0, TOPE_PLATA);
    st.vetoCredito = Math.max(0, entero(st.vetoCredito, 0, 0, 9) - 1);
    if (numero(st.deuda, 0) > 0) {
      const tasa = tasaPrestamo(st);
      const interes = st.deuda * tasa;
      st.deuda = clamp(st.deuda + interes, 0, TOPE_PLATA);
      const cuota = Math.min(st.deuda, st.deuda * CUOTA_DEUDA + interes * 0);
      egr.push({ n: "Intereses y cuota de la deuda, " + Math.round(tasa * 100) + "%", v: interes + cuota });
      const r2 = cobrar(st, cuota);
      st.cash = r2.cash; st.cartera = r2.cartera;
      st.deuda = clamp(st.deuda - cuota, 0, TOPE_PLATA);
    }

    /* si el año cierra en rojo, eso no desaparece: se convierte en deuda
       cara, que es exactamente lo que pasa cuando te vas al descubierto */
    if (st.cash < 0) {
      const hueco = -st.cash;
      st.cash = 0;
      st.deuda = clamp(st.deuda + hueco * 1.08, 0, TOPE_PLATA);
      notas.push("Cerraste el año en rojo por USD " + fmt(hueco) + ". El banco lo cubre y te lo cobra: pasa a tu deuda con recargo.");
    }

    /* ---- embargo: el banco se cobra con lo que haya ---- */
    if (st.deuda > Math.max(1, netoDeAno) * EMBARGO_VECES && st.bienes.length > 0) {
      const porValor = st.bienes.slice().sort((a, b) => numero(st.valores[b], 0) - numero(st.valores[a], 0));
      let recaudado = 0;
      const perdidos = [];
      for (let i = 0; i < porValor.length; i++) {
        if (st.deuda <= Math.max(1, netoDeAno) * 2) break;
        const id = porValor[i];
        const c = bienDe(id);
        const valor = numero(st.valores[id], 0);
        if (!c || valor <= 0) continue;
        const saca = valor * DESCUENTO_EMBARGO;
        recaudado += saca;
        st.deuda = clamp(st.deuda - saca, 0, TOPE_PLATA);
        perdidos.push(c.n);
        st.bienes = st.bienes.filter((x) => x !== id);
        delete st.valores[id];
      }
      if (perdidos.length) {
        st.embargos = entero(st.embargos + perdidos.length, 1, 0, 99);
        st.rep = clamp(st.rep - 5, 0, 100);
        notas.push("Embargo. Se llevan " + perdidos.join(", ") + " y lo rematan por USD " + fmt(recaudado)
          + ", bastante menos de lo que valía. Así se paga el dinero que no se tiene.");
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Te embargan " + perdidos[0].toLowerCase() });
      }
    }

    /* ---- quiebra: cuando ya no hay de dónde ---- */
    if (st.deuda > Math.max(1, netoDeAno) * QUIEBRA_VECES && st.cartera + st.cash < st.deuda * 0.25) {
      const borrada = st.deuda;
      st.deuda = 0;
      st.cartera = 0;
      st.bienes.forEach((id) => { delete st.valores[id]; });
      st.bienes = [];
      st.quiebras = entero(st.quiebras + 1, 1, 0, 9);
      st.vetoCredito = 5;
      st.rep = clamp(st.rep - 20, 0, 100);
      st.ene = clamp(st.ene - 10, 0, 100);
      notas.push("Te declaras en quiebra. Se borran USD " + fmt(borrada) + " de deuda y con ellos todo lo que tenías: "
        + "cartera, bienes y buena parte de tu nombre. Nadie te presta un dólar en cinco años. No es el final, es volver a empezar.");
      st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Te declaras en quiebra" });
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
    /* el recorrido mes a mes, con la volatilidad de esta cartera concreta */
    const camino = caminoAnual(carteraAntes, st.cartera, est.sd, 12);
    /* las decisiones se reparten a lo largo del año en el orden en que se
       tomaron: con tres escenas caen en marzo, junio y septiembre */
    const cuantos = hitosAno.current.length;
    const hitosDecision = hitosAno.current.map((x, i) => ({
      ...x, mes: Math.max(1, Math.min(12, Math.round(((i + 1) * 12) / (cuantos + 1)))),
    }));
    st.curva = (Array.isArray(st.curva) ? st.curva : []).concat(camino.slice(1)).slice(-TOPE_CURVA);
    const cartera = { antes: carteraAntes, despues: st.cartera, ret, detalle, aporte, obj, mu: est.mu, sd: est.sd, beta, camino, hitos: hitosDecision };

    /* ---- bienes ---- */
    st.bienes.forEach((id) => {
      const c = bienDe(id);
      if (!c) return;
      const v = st.valores[id] || 0;
      st.valores[id] = c.tipo === "consumo" ? v * (1 - (c.dep || 0) * 2) : v * (1 + (c.ap || 0) * 2);
    });

    /* lo que eligieron el ritmo y el tren de vida */
    const rt = RITMO(st.ritmo), gv = NIVEL_GASTO(st.nivelGasto);
    st.carrera += rt.car;
    st.rep = clamp(st.rep + rt.rep + gv.rep, 0, 100);
    if (rt.car || gv.f !== 1) {
      notas.push("Este año fuiste a ritmo " + rt.n.toLowerCase() + " y viviste de forma " + gv.n.toLowerCase()
        + ": " + (rt.car ? "+" + rt.car + " de carrera" : "sin empujar la carrera")
        + " y un gasto " + (gv.f > 1 ? Math.round((gv.f - 1) * 100) + "% por encima"
          : gv.f < 1 ? Math.round((1 - gv.f) * 100) + "% por debajo" : "en su nivel") + " de lo normal.");
    }

    let desgaste = (tiene(st, "coach") ? 5 : 8) + (st.rama === "boutique" ? 3 : 0);
    desgaste += -(rt.ene) - gv.ene;   /* el ritmo cansa, vivir bien descansa */
    if (st.pareja === "casado" || st.pareja === "noviazgo") desgaste -= 3;   /* alguien con quien contar */
    desgaste += Math.min(6, entero(st.hijos, 0, 0, 8) * 2);                  /* y alguien a quien cuidar */
    st.ene = clamp(st.ene - desgaste, 0, 100);
    /* Por debajo de la mitad el cuerpo se impone: duermes, cancelas, bajas
       el ritmo. No te devuelve a ochenta, pero rompe la caída libre que
       hacía imposible pasar del año diez. */
    if (st.ene < 50) {
      st.ene = clamp(st.ene + 6, 0, 100);
      if (st.ene < 35) notas.push("Estás funcionando a media máquina. El cuerpo te está cobrando las horas.");
    }
    let terminar = null;
    if (st.ene <= 0) {
      st.burnouts += 1;
      st.ene = 55; st.rep = clamp(st.rep - 8, 0, 100); st.cash -= 3000;
      notas.push("Te quiebras. Meses fuera y un regreso más lento de lo que admites.");
      if (st.burnouts >= 4) terminar = "burnout";
    }
    if (st.rep <= 6) {
      st.despidos = entero(numero(st.despidos, 0) + 1, 1, 0, 9);
      if (st.rango === 0) {
        /* siendo pasante no hay de dónde bajar: te quedas sin el puesto
           y vuelves a empezar en otra casa, con la carrera tocada.
           Nunca termina la partida: quedarse sin trabajo no es morirse. */
        st.rep = 26; st.carrera = Math.max(0, st.carrera - 6);
        st.cash -= 2000;
        notas.push("Te dejan ir. Encuentras sitio en otra casa, pero llegas de cero y con la reputación por reconstruir.");
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Te dejan ir y empiezas en otra casa" });
      } else {
        st.rango = Math.max(0, st.rango - 1);
        st.rep = 28;
        st.carrera = Math.max(0, RANGO(st.rango).umbral - 4);
        notas.push("Te bajan de cargo. No es el final, y en esta industria esas cosas se recuerdan un par de años.");
        st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Bajas a " + RANGO(st.rango).n });
      }
    }
    /* el aviso que antes no existía */
    if (!terminar && st.rep < 20 && st.rep > 6) {
      notas.push("Tu reputación está en " + Math.round(st.rep) + " de cien. Por debajo de seis te dejan ir: conviene aceptar algún encargo incómodo antes de que sea tarde.");
    }

    let ascenso = null;
    if (st.rango < RANGOS.length - 1 && st.carrera >= RANGO(st.rango).umbral && st.rep >= 25) {
      st.rango += 1;
      ascenso = RANGO(st.rango).n;
      st.titulares = st.titulares.concat({ q: String(2026 + st.turno), t: "Ascenso a " + ascenso });
    }

    /* ---- foto del año ---- */
    const bienesV = valorBienes(st);
    const patrimonio = st.cash + st.cartera + bienesV - numero(st.deuda, 0);
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
      turno: st.turno, edad: edad(st.turno, st.edadIni), ahorro, ret, deltaC: cartera.despues - cartera.antes,
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
    st = sanear(st);
    setS(st);
    setCierre({
      ano, notis, ascenso, cartera, notas, ing, egr, ingreso, egreso, neto, ahorro,
      patAntes, patrimonio, bienesV, histo: st.histo, leccion, hitos, deuda,
      /* "hitos" ya lo usan los hitos de patrimonio; las decisiones del
         año van por su propia clave para que no se pisen */
      hitosDec: cartera.hitos,
      cobertura, gastos, indep: gastos > 0 ? clamp(patrimonio / (gastos * 25), 0, 1.4) : 0,
    });
    if (terminar) setFin(terminar);
    irA("cierre");
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
    a += MODO(s.modo).ayuda;   /* el modo aprendiz perdona más */
    return clamp(a, 0, 100);
  };

  const elegir = (o) => {
    if (!enFase("evento") || !o) return;
    setOp(o);
    if (o.juego || o.j) { irA("minijuego"); return; }
    if (o.chk) {
      const p = clamp((s[o.chk.s] - o.chk.dif) / 55 + 0.5, 0.12, 0.9);
      const ok = Math.random() < p;
      resolverEscena(ok ? o.chk.ok : o.chk.no, ok ? "exito" : "fallo", o);
    } else resolverEscena(o.d, "exito", o);
  };

  const finJuego = (nivel) => {
    if (!enFase("minijuego") || !op) return;
    const base = op.res ? op.res[nivel] : escalar(op.d || {}, nivel);
    resolverEscena(base || {}, nivel, op);
  };

  const siguienteEscena = () => {
    if (!enFase("resultado")) return;
    const resto = (Array.isArray(cola) ? cola : []).filter(escenaValida);
    if (resto.length > 0) {
      setEv(resto[0]); setCola(resto.slice(1)); setOp(null); irA("evento");
    } else cerrarAno();
  };

  const siguienteAno = () => {
    if (!enFase("cierre")) return;
    if (fin) { tirarPartida(); irA("fin"); return; }
    if (s.turno >= tope) {
      if (s.seguir >= 2) { tirarPartida(); setFin("completo"); irA("fin"); return; }
      persistir(s); irA("retiro"); return;
    }
    persistir(s);
    arrancarAno(s);
  };

  const retirarse = () => { tirarPartida(); setFin("retiro"); irA("fin"); };
  const seguirCinco = () => {
    const st = { ...s, seguir: s.seguir + 1 };
    setS(st); persistir(st); arrancarAno(st);
  };

  /* el inventario final, partido en lo que conserva valor y lo que no */
  const conservanValor = s.bienes
    .map((id) => ({ c: bienDe(id), pagado: 0, hoy: numero(s.valores[id], 0) }))
    .filter((x) => x.c && x.c.tipo !== "consumo")
    .map((x) => ({ ...x, pagado: numero(x.c.c, 0) }));
  const totalPagado = conservanValor.reduce((a, x) => a + x.pagado, 0);
  const totalHoy = conservanValor.reduce((a, x) => a + x.hoy, 0);
  const soloConsumo = s.bienes.map(bienDe).filter((c) => c && c.tipo === "consumo");
  const gastadoEnConsumo = soloConsumo.reduce((a, c) => a + numero(c.c, 0), 0);
  const consumoN = soloConsumo.length;

  const bienesVal = valorBienes(s);
  const valorFondo = s.fondo ? s.fondo.posiciones.reduce((a, p) => a + p.ticket * s.fondo.pct, 0) : 0;
  const patrimonio = s.cash + s.cartera + bienesVal + valorFondo - numero(s.deuda, 0);
  const gastosAnuales = gastoAnual(s);
  const retiroAnual = patrimonio * 0.04;
  const rentaProps = s.bienes.reduce((a, id) => a + ((bienDe(id) || {}).renta || 0), 0) * 2;
  const cobertura = gastosAnuales > 0 ? (retiroAnual + rentaProps * 0.5) / gastosAnuales : 0;

  /* lo que hace falta para contar cómo vives, no solo cuánto tienes */
  const indiceVida = vidaTotal(s);
  const nivelVida = nivelDeVida(indiceVida);
  const mantenimientoAnual = s.bienes.reduce((a, id) => a + ((bienDe(id) || {}).up || 0) * 2, 0);
  const costoHijos = s.hijos * COSTO_HIJO * nacion.gas;
  const netoDelAno = netoAnual(s);
  const pesoTren = netoDelAno > 0 ? gastosAnuales / netoDelAno : 1;

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

  /* Si los requisitos dejaran una escena sin ninguna opcion visible, el
     jugador quedaria encerrado. Antes que eso, se le muestran todas. */
  /* el primer aviso pendiente cuyo momento haya llegado */
  const avisoGuia = (() => {
    if (!s.guia) return null;
    const ctx = { fase, tab, vistas: Array.isArray(s.guiaVistas) ? s.guiaVistas : [] };
    for (let i = 0; i < GUIA.length; i++) {
      const g = GUIA[i];
      if (ctx.vistas.indexOf(g.id) >= 0) continue;
      let toca = false;
      try { toca = !!g.cuando(ctx); } catch (e) { toca = false; }
      if (toca) return g;
    }
    return null;
  })();

  const cerrarAviso = (id) => setS((st) => ({
    ...st, guiaVistas: (Array.isArray(st.guiaVistas) ? st.guiaVistas : []).concat(id),
  }));

  const opcionesDe = (e) => {
    const todas = e && Array.isArray(e.o) ? e.o.filter((o) => o && o.t) : [];
    const vis = todas.filter((o) => { try { return visible(o, s); } catch (err) { return false; } });
    return vis.length ? vis : todas;
  };

  const Stat = ({ k, v, ene }) => (
    <div className="ea-stat">
      <div className="ea-statTop"><span className="ea-dis">{ETIQ[k]}</span><span className="ea-mono">{Math.round(v)}</span></div>
      <div className="ea-bar"><div className={"ea-fill" + (ene ? " ene" : "") + (v < 25 ? " baja" : "")} style={{ width: v + "%" }} /></div>
    </div>
  );

  const selloTxt = { exito: "Ejecutado", parcial: "A medias", fallo: "Fallido" };
  const selloCls = { exito: "", parcial: " med", fallo: " mal" };
  /* La barra solo muestra lo que ya está abierto: en el primer año son
     dos secciones, no siete. El tercer elemento de cada par es la llave. */
  const TABS = [
    ["ficha", "Ficha", null],
    ["portafolio", "Cartera", "cartera"],
    ["terminos", "Términos", null],
    ["props", "Inmuebles", "inmuebles"],
    ["mejoras", "Mejoras", "mejoras"],
    ["fondo", "Fondo", "fondo"],
    ["expediente", "Vida", "vida"],
  ].filter((p) => p[2] === null || abierto(s, p[2]));
  const PAREJA_N = { solo: "sin pareja", noviazgo: "en pareja", casado: "casado", divorciado: "divorciado", viudo: "viudo" };
  const parejaTxt = PAREJA_TXT(s);
  const ramaN = s.rama ? (RAMAS.find((r) => r.id === s.rama) || {}).n : null;
  const ano = 2026 + s.turno;

  return (
    <div className="ea-root">
      <style>{CSS}{CSS2}{CSS3}{CSS4}{CSS5}</style>

      {fase === "aviso" && (
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Antes de entrar</div>
          <h1 className="ea-h1 ea-dis" style={{ fontSize: "clamp(34px,8vw,58px)" }}>Esto es un juego</h1>

          <div className="ea-aviso">
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

          <div className="ea-regla" />
          <button className="ea-btnO" onClick={aceptarAviso}>Entendido, acepto y quiero jugar</button>
          <div style={{ fontSize: 11.5, color: "var(--tenue)", marginTop: 10 }}>
            Al entrar aceptas que esto es un ejercicio de ficción con fines educativos y que no
            sustituye el consejo de un profesional.
          </div>
        </div>
      )}

      {fase === "portada" && (
        <div className="ea-wrap ea-portada">
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Simulador de carrera e inversión</div>
          <h1 className="ea-h1 ea-dis">El Analista</h1>
          <p className="ea-lede">
            Treinta años de carrera y de dinero, y tú eliges desde dónde los empiezas: recién graduado a los
            veinte, o a los cincuenta con media vida hecha y bastante más criterio. De dónde vienes y qué
            estudiaste te van a abrir unas puertas y cerrarte otras. Cada año trae decisiones, noticias que
            sacuden el mercado, una cartera que repartes tú y un examen que se pone más difícil a medida que
            estudias. Al final decides si te retiras o sigues cinco años más.
          </p>
          <button className="ea-atras ea-dis" style={{ marginBottom: 0, marginTop: 4 }}
            onClick={() => { if (enFase("portada")) irA("aviso"); }}>Volver a leer el aviso</button>
          <div className="ea-regla" />
          <div className="ea-cifras" style={{ marginBottom: 26 }}>
            <div><div className="ea-cifraK">Recorrido</div><div className="ea-cifraV ea-mono">30 años</div></div>
            <div><div className="ea-cifraK">Edad</div><div className="ea-cifraV ea-dis">Elige tu edad</div></div>
            <div><div className="ea-cifraK">La meta</div><div className="ea-cifraV ea-dis">Ser millonario</div></div>
            <div><div className="ea-cifraK">Por el camino</div><div className="ea-cifraV ea-dis">Bodas, hijos, estafas</div></div>
          </div>
          {guardado ? (
            <div>
              <div className="ea-guarda">
                <div className="ea-lecK" style={{ color: "var(--tenue)" }}>Tienes una vida a medio camino</div>
                <div className="ea-dis" style={{ fontSize: 19, color: "var(--papel)", marginTop: 5 }}>
                  {2026 + guardado.s.turno} · {edad(guardado.s.turno, guardado.s.edadIni)} años · {RANGO(guardado.s.rango).n}
                </div>
                <div className="ea-mono" style={{ fontSize: 13, color: "var(--tenue)", marginTop: 3 }}>
                  patrimonio USD {fmt(guardado.s.cash + guardado.s.cartera)} · año {guardado.s.turno + 1} de {TOPE_DE(guardado.s.seguir)}
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

      {fase === "identidad" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="portada" texto="Volver a la portada" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso uno de cinco</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Quién eres?</h2>
          <p className="ea-lede" style={{ marginBottom: 20 }}>
            Nada de esto sale de tu navegador ni cambia tus números: el nombre es para que el juego
            te hable a ti, y el género solo para concordar las palabras.
          </p>

          <label className="ea-campoK ea-dis" htmlFor="ea-nombre">Tu nombre</label>
          <input id="ea-nombre" className="ea-campo ea-dis" type="text" maxLength={TOPE_NOMBRE}
            value={elec.nombre} placeholder="Como quieras que te llamen"
            onChange={(e) => setElec((x) => ({ ...x, nombre: saneaNombre(e.target.value) }))} />

          <div className="ea-campoK ea-dis" style={{ marginTop: 22 }}>Género</div>
          <div className="ea-generos">
            {GENEROS.map((g) => (
              <button key={g.id} className={"ea-mini" + (elec.genero === g.id ? " on" : "")} style={{ marginTop: 0 }}
                onClick={() => setElec((x) => ({ ...x, genero: g.id }))}>{g.n}</button>
            ))}
          </div>

          <div className="ea-regla" style={{ marginTop: 26 }} />
          <button className="ea-btnO" style={{ marginTop: 0 }}
            onClick={() => { if (enFase("identidad")) irA("modo"); }}>
            {elec.nombre.trim() ? "Seguir como " + elec.nombre.trim() : "Seguir sin nombre"}
          </button>
        </div>
      )}

      {fase === "modo" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="identidad" texto="Cambiar tu nombre" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso dos de cinco</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Cuánto sabes de esto?</h2>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            No hay respuesta mala. El juego trata de enseñar finanzas, así que lo lógico es que se ajuste
            a de dónde partes. Puedes cambiar de opinión empezando otra vida cuando quieras.
          </p>
          {MODOS.map((m) => (
            <button className={"ea-opcion" + (elec.modo === m.id ? " on" : "")} key={m.id}
              onClick={() => { if (enFase("modo")) elige("modo", m.id, "edad"); }}>
              <div className="ea-opcionN">{m.n}</div>
              <div className="ea-opcionD">{m.d}</div>
              {m.ayuda > 0 && <div className="ea-opcionM">Los minijuegos te dan {m.ayuda} puntos de ventaja y las preguntas traen recordatorio</div>}
            </button>
          ))}
        </div>
      )}

      {fase === "edad" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="modo" texto="Cambiar el modo" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso tres de cinco</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿A qué edad empiezas?</h2>
          <div className="ea-rastro ea-mono">Modo {MODO(elec.modo).n.toLowerCase()}</div>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            Nadie está fuera de tiempo. Empezar a los cincuenta no es empezar perdiendo: es empezar con
            menos años por delante y bastante más criterio, red y dinero que a los veinte. En todos los
            casos juegas treinta años.
          </p>
          {EDADES.map((e) => (
            <button className={"ea-opcion" + (elec.edad === e.e ? " on" : "")} key={e.e}
              onClick={() => { if (enFase("edad")) elige("edad", e.e, "pais"); }}>
              <div className="ea-opcionN">Empezar a los {e.e}</div>
              <div className="ea-opcionD">{e.d}</div>
              <div className="ea-opcionM">
                Terminas a los {e.e + 30}
                {e.cash > 0 ? " · empiezas con USD " + fmt(e.cash) + " ahorrados" : " · empiezas sin nada ahorrado"}
                {Object.keys(e.mods || {}).length ? " · " + Object.keys(e.mods).map((k) => ETIQ[k] + " " + (e.mods[k] > 0 ? "+" : "") + e.mods[k]).join(" · ") : ""}
              </div>
            </button>
          ))}
        </div>
      )}

      {fase === "pais" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="edad" texto="Cambiar la edad" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso cuatro de cinco</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿De dónde vienes?</h2>
          <div className="ea-rastro ea-mono">{rastro()}</div>
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
                Sueldos {Math.round(p.sal * 100)} · costo de vida {Math.round(p.gas * 100)} · impuesto {Math.round(p.tax * 100)}% · empiezas con USD {fmt(p.cash)}
              </div>
              <div style={{ fontSize: 12, color: "var(--tenue)", marginTop: 3 }}>{p.nota}</div>
              <button className="ea-mini" onClick={() => { if (enFase("pais")) elige("pais", p.id, "estudio"); }}>
                {elec.pais === p.id ? "Elegido" : "Elegir"}
              </button>
            </div>
          ))}
        </div>
      )}

      {fase === "estudio" && (
        <div className="ea-wrap" style={{ maxWidth: 760, margin: "4vh auto" }}>
          <Atras a="pais" texto="Cambiar el origen" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Paso cinco de cinco</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>
            {EDAD_DE(elec.edad).e <= 20 ? "¿Qué estás por terminar?" : "¿Qué estudiaste?"}
          </h2>
          <div className="ea-rastro ea-mono">{rastro()}</div>
          <p className="ea-lede" style={{ marginBottom: 18 }}>
            Tu carrera te da atributos de entrada y, sobre todo, opciones que solo tú vas a poder tomar cuando aparezcan.
            Al elegir aquí empieza la partida: hasta este momento nada está decidido.
          </p>
          {CARRERAS.map((c) => (
            <div className="ea-panel" key={c.id} style={{ marginBottom: 10 }}>
              <div className="ea-nombre ea-dis" style={{ fontSize: 19 }}>{c.n}</div>
              <div style={{ fontSize: 13.5, color: "var(--tenue)", margin: "7px 0" }}>{c.d}</div>
              <div style={{ fontSize: 12, color: "var(--cobre)" }}>
                {Object.keys(c.mods).map((k) => ETIQ[k] + " +" + c.mods[k]).join(" · ")} · mejor en {c.juegos.map((j) => JUEGO(j).n.toLowerCase()).join(" y ")}
              </div>
              <button className="ea-mini" onClick={() => {
                if (!enFase("estudio")) return;
                setElec((x) => ({ ...x, estudio: c.id }));
                irA("guia");
              }}>{EDAD_DE(elec.edad).e <= 20 ? "Graduarte de esto" : "Empezar con esto"}</button>
            </div>
          ))}
        </div>
      )}

      {fase === "guia" && (
        <div className="ea-wrap" style={{ maxWidth: 700, margin: "6vh auto" }}>
          <Atras a="estudio" texto="Cambiar la carrera" />
          <div className="ea-dis" style={{ fontSize: 12, letterSpacing: ".26em", color: "var(--cobre)" }}>Última cosa</div>
          <h2 className="ea-final ea-dis" style={{ marginTop: 8 }}>¿Te vas guiando o vas solo?</h2>
          <p className="ea-lede" style={{ marginBottom: 22 }}>
            No es un tutorial de diez pantallas. Si dices que sí, te van saliendo avisos de tres líneas
            en el momento en que cada cosa aparece por primera vez, y se cierran con un clic. Nada más.
          </p>
          <button className="ea-opcion" onClick={() => { if (enFase("guia")) arrancarPartida({ ...elec, guia: true }); }}>
            <div className="ea-opcionN">Guíame por el camino</div>
            <div className="ea-opcionD">
              Ocho avisos cortos repartidos por la partida: la primera decisión, las secciones de arriba,
              la cartera, el informe del año. Salen una vez y no vuelven.
            </div>
          </button>
          <button className="ea-opcion" onClick={() => { if (enFase("guia")) arrancarPartida({ ...elec, guia: false }); }}>
            <div className="ea-opcionN">Sé lo que hago</div>
            <div className="ea-opcionD">Directo a jugar, sin avisos. Puedes activarlos después empezando otra vida.</div>
          </button>
        </div>
      )}

      {(fase === "evento" || fase === "minijuego" || fase === "resultado" || fase === "cierre" || fase === "retiro") && (
        <div className="ea-wrap">
          <div className="ea-placa">
            <div>
              <div className="ea-nombre ea-dis">{s.nombre ? s.nombre : RANGO(s.rango).n}</div>
              <div className="ea-sub ea-dis">{s.nombre ? RANGO(s.rango).n + " · " : ""}{estudio.n} · {nacion.ban}{ramaN ? " · " + ramaN : ""}</div>
            </div>
            <div className="ea-reloj">
              {/* Sin «año X de Y»: saber cuándo se acaba la partida le quita
                  peso a cada decisión, porque el jugador empieza a contar
                  turnos en vez de vivir el año que tiene delante. */}
              <div className="ea-dis">{ano} · {edad(s.turno, s.edadIni)} años</div>
              <div className={"ea-plata ea-mono" + (patrimonio < 0 ? " neg" : "")}>USD {fmt(patrimonio)}</div>
              {abierto(s, "cartera") && (
                <div className="ea-mono" style={{ fontSize: 11.5, marginTop: 2 }}>efectivo {fmt(s.cash)} · cartera {fmt(s.cartera)}</div>
              )}
              {/* El sueldo es el número que el jugador usa para decidir; energía y
                  reputación solo salen cuando están en zona de aviso, que es el
                  único momento en que cambian una decisión. */}
              <div className="ea-mono ea-signos">
                <span>sueldo {fmt(salarioAnual(s))} al año</span>
                {s.ene < 50 && <span className={s.ene < 30 ? "mal" : "ojo"}>energía {Math.round(s.ene)}</span>}
                {s.rep < 30 && <span className={s.rep < 20 ? "mal" : "ojo"}>reputación {Math.round(s.rep)}</span>}
                {s.deuda > 0 && <span className="mal">debes {fmt(s.deuda)}</span>}
              </div>
            </div>
          </div>
          {fase !== "cierre" && (fase === "evento" || fase === "minijuego" || fase === "resultado") && (
            <div className="ea-cinta">
              <span className="ea-cintaK ea-dis">{ano}</span>
              <span>Quedan {cola.length + (fase === "evento" ? 1 : fase === "minijuego" ? 1 : 0)} situaciones este año{abierto(s, "cartera") ? " · cartera " + perfilN.toLowerCase() : ""}</span>
              {aviso && <span style={{ marginLeft: "auto", color: "var(--verde)", flexShrink: 0 }}>{aviso}</span>}
            </div>
          )}

          {/* La barra vive fuera del tablero y por defecto está cerrada:
              lo primero que se ve es la decisión, no la contabilidad. */}
          <div className="ea-tabs">
            {TABS.map((par) => (
              <button key={par[0]} className={"ea-tab" + (tab === par[0] ? " on" : "")}
                aria-expanded={tab === par[0] ? "true" : "false"}
                onClick={() => setTab(tab === par[0] ? null : par[0])}>{par[1]}</button>
            ))}
          </div>

          {avisoGuia && (
            <div className="ea-guia">
              <div className="ea-guiaK ea-dis">Guía</div>
              <div className="ea-guiaT ea-dis">{avisoGuia.t}</div>
              <div className="ea-guiaX">{avisoGuia.x}</div>
              <button className="ea-guiaB ea-dis" onClick={() => cerrarAviso(avisoGuia.id)}>Entendido</button>
            </div>
          )}

          <div className={"ea-grid" + (tab ? "" : " solo")}>
            {tab && (
            <div>
              <div className="ea-panel ea-panelAb" style={{ maxHeight: 470, overflowY: "auto" }}>
                <button className="ea-cerrar ea-dis" onClick={() => setTab(null)}>Cerrar y volver a la decisión</button>
                {tab === "ficha" && (
                  <div>
                    <div className="ea-titular" style={{ marginBottom: 4 }}>
                      <div className="ea-titularK ea-dis">Patrimonio</div>
                      <div className="ea-titularV ea-mono" style={{ fontSize: 27 }}>USD {fmt(patrimonio)}</div>
                      <div className="ea-titularL">
                        <span className="ea-mono">cubre {Math.round(cobertura * 100)}% de tus gastos</span>
                        {s.deuda > 0 && <span className="ea-mono" style={{ color: "#C4756A" }}>debes {fmt(s.deuda)}</span>}
                      </div>
                    </div>
                    <div className="ea-plegs">
                    <Plegable titulo="Tus atributos" resumen={"criterio " + Math.round(s.cri)}>
                    <Stat k="mod" v={s.mod} /><Stat k="cri" v={s.cri} /><Stat k="red" v={s.red} /><Stat k="rep" v={s.rep} /><Stat k="ene" v={s.ene} ene />
                    </Plegable>
                    <Plegable titulo="Quién eres" resumen={RANGO(s.rango).n}>
                    <div className="ea-fila" style={{ marginTop: 0 }}>
                      <span className="ea-dis" style={{ fontSize: 12 }}>Carrera</span>
                      <span className="ea-mono">{s.carrera} / {RANGO(s.rango).umbral === Infinity ? "máx" : RANGO(s.rango).umbral}</span>
                    </div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Origen</span><span className="ea-mono">{nacion.n}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Formación</span><span className="ea-mono">{estudio.n}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Rama</span><span className="ea-mono">{ramaN || "sin definir"}</span></div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Vida personal</span>
                      <span className="ea-mono">{parejaTxt}{s.hijos > 0 ? " · " + s.hijos + (s.hijos === 1 ? " hijo" : " hijos") : ""}</span>
                    </div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Tren de vida</span>
                      <span className="ea-mono">{nivelDeVida(vidaTotal(s)).n.toLowerCase()}</span>
                    </div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Formación acumulada</span>
                      <span className="ea-mono">{Math.round(s.estudia)} · temario nivel {nivelDe(s.turno, s.estudia)}</span>
                    </div>
                    </Plegable>
                    <Plegable titulo="Tus números" resumen={"sueldo " + fmtCorto(salarioAnual(s))} abierto>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Sueldo bruto</span><span className="ea-mono">USD {fmt(salarioAnual(s))}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Impuesto</span><span className="ea-mono">{Math.round(impuestoDe(s) * 100)}%</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Gasto anual</span><span className="ea-mono">USD {fmt(gastosAnuales)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Efectivo</span><span className="ea-mono">USD {fmt(s.cash)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cartera invertida</span><span className="ea-mono">USD {fmt(s.cartera)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Bienes</span><span className="ea-mono">USD {fmt(bienesVal)}</span></div>
                    {s.deuda > 0 && (
                      <div className="ea-fila">
                        <span className="ea-dis" style={{ fontSize: 12 }}>Deuda</span>
                        <span className="ea-mono" style={{ color: "var(--rojo)" }}>USD {fmt(s.deuda)} · {Math.round(tasaPrestamo(s) * 100)}%</span>
                      </div>
                    )}
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Patrimonio</span><span className="ea-mono">USD {fmt(patrimonio)}</span></div>
                    <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Cubre tus gastos</span><span className="ea-mono">{Math.round(cobertura * 100)}%</span></div>

                    </Plegable>

                    {/* las dos decisiones que antes no existían */}
                    <Plegable titulo="Cómo vas a vivir este año"
                      resumen={RITMO(s.ritmo).n.toLowerCase() + " · " + NIVEL_GASTO(s.nivelGasto).n.toLowerCase()}>
                    <div className="ea-itemD" style={{ marginBottom: 9 }}>
                      Las dos palancas que más pesan a lo largo de una carrera entera, y las únicas que decides tú
                      todos los años. Cambian al cerrar el año.
                    </div>
                    <div className="ea-campoK ea-dis">Ritmo de trabajo</div>
                    <div className="ea-generos">
                      {RITMOS.map((x) => (
                        <button key={x.id} className={"ea-mini" + (s.ritmo === x.id ? " on" : "")}
                          style={{ marginTop: 0 }} onClick={() => ponerRitmo(x.id)}>{x.n}</button>
                      ))}
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>{RITMO(s.ritmo).d}</div>
                    <div className="ea-etqs">
                      <span className={"ea-etq" + (RITMO(s.ritmo).car > 0 ? " act" : "")}>carrera {RITMO(s.ritmo).car >= 0 ? "+" : ""}{RITMO(s.ritmo).car} al año</span>
                      <span className="ea-etq cost">energía {RITMO(s.ritmo).ene} al año</span>
                    </div>

                    <div className="ea-campoK ea-dis" style={{ marginTop: 16 }}>Tren de vida</div>
                    <div className="ea-generos">
                      {GASTOS.map((x) => (
                        <button key={x.id} className={"ea-mini" + (s.nivelGasto === x.id ? " on" : "")}
                          style={{ marginTop: 0 }} onClick={() => ponerGasto(x.id)}>{x.n}</button>
                      ))}
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>{NIVEL_GASTO(s.nivelGasto).d}</div>
                    <div className="ea-etqs">
                      <span className={"ea-etq" + (NIVEL_GASTO(s.nivelGasto).f < 1 ? " act" : NIVEL_GASTO(s.nivelGasto).f > 1 ? " cost" : "")}>
                        gasto {NIVEL_GASTO(s.nivelGasto).f === 1 ? "normal" : (NIVEL_GASTO(s.nivelGasto).f > 1 ? "+" : "−") + Math.abs(Math.round((NIVEL_GASTO(s.nivelGasto).f - 1) * 100)) + "%"}
                      </span>
                      <span className="ea-etq">o sea USD {fmt(gastosAnuales)} al año</span>
                    </div>

                    {/* la vara de medir que no existía */}
                    </Plegable>
                    {(() => {
                      const eHoy = edad(s.turno, s.edadIni);
                      const meta = metaDeEdad(eHoy);
                      const sueldo = salarioAnual(s);
                      const objetivo = sueldo * meta.x;
                      const tengo = s.cartera + Math.max(0, s.cash);
                      const razon = objetivo > 0 ? tengo / objetivo : 0;
                      return (
                        <Plegable titulo="Cómo vas para tu edad"
                          resumen={objetivo > 0 ? Math.round(razon * 100) + "% de la referencia" : "—"}
                          tono={razon >= 1 ? "#5F8F5C" : razon >= 0.5 ? "#C0763A" : "#BE4B3B"}>
                          <div className="ea-itemD" style={{ marginBottom: 7 }}>
                            La referencia habitual dice que a los {meta.e} conviene tener {meta.x} {meta.x === 1 ? "vez" : "veces"} tu
                            sueldo anual invertido. No es una ley: es una vara para saber si vas o no vas.
                          </div>
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Referencia a los {meta.e}</span><span className="ea-mono">USD {fmt(objetivo)}</span></div>
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Tienes invertido y líquido</span><span className="ea-mono">USD {fmt(tengo)}</span></div>
                          <div className="ea-medidor">
                            <div className="ea-medidorF" style={{ width: (Math.min(1, Math.max(0, razon)) * 100).toFixed(1) + "%" }} />
                          </div>
                          <div className="ea-itemD" style={{ marginTop: 6, color: razon >= 1 ? "var(--verde)" : razon >= 0.5 ? "var(--cobre)" : "var(--rojo)" }}>
                            {meta.aun
                              ? "Todavía no te toca esta vara: la primera referencia es a los treinta. Lo que hagas ahora es lo que la hará fácil."
                              : razon >= 1 ? "Vas por delante de la referencia. Sigue y no subas el tren de vida por costumbre."
                              : razon >= 0.5 ? "Vas por detrás, y a tiempo. Cada punto de tasa de ahorro cierra esa distancia más rápido que cualquier acierto en el mercado."
                              : "Vas bastante por detrás. Lo que mueve esto no es el retorno: es cuánto de lo que entra no se gasta."}
                          </div>
                        </Plegable>
                      );
                    })()}

                    {(abierto(s, "banco") || s.deuda > 0) && (
                    <Plegable titulo="El banco"
                      resumen={s.deuda > 0 ? "debes " + fmtCorto(s.deuda) : "sin deuda"}
                      tono={s.deuda > 0 ? "#BE4B3B" : "#5F8F5C"}>
                    {s.quiebras > 0 && (
                      <div className="ea-itemD" style={{ marginBottom: 8, color: "var(--rojo)" }}>
                        Has quebrado {s.quiebras === 1 ? "una vez" : s.quiebras + " veces"}. Eso encarece cada dólar que pidas
                        {s.vetoCredito > 0 ? " y todavía no te prestan: faltan " + s.vetoCredito + (s.vetoCredito === 1 ? " año" : " años") + "." : "."}
                      </div>
                    )}
                    {s.deuda > 0 ? (
                      <div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Debes</span><span className="ea-mono" style={{ color: "var(--rojo)" }}>USD {fmt(s.deuda)}</span></div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Te cuesta al año</span><span className="ea-mono">USD {fmt(s.deuda * tasaPrestamo(s))} · {Math.round(tasaPrestamo(s) * 100)}%</span></div>
                        <div className="ea-itemD" style={{ marginTop: 6 }}>
                          Tu cartera espera rendir {Math.round(statsPesos(mezclaAct).mu * 100)}%. Mientras la deuda cueste más que eso,
                          pagarla es la mejor inversión disponible, y sin riesgo.
                        </div>
                        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 8 }}>
                          <button className="ea-mini" disabled={s.cash < 50} onClick={() => pagarDeuda(Math.min(s.deuda, s.cash * 0.5))}>Pagar la mitad de tu efectivo</button>
                          <button className="ea-mini" disabled={s.cash < 50} onClick={() => pagarDeuda(Math.min(s.deuda, s.cash))}>Pagar todo lo que puedas</button>
                        </div>
                      </div>
                    ) : (
                      <div className="ea-itemD">No debes nada. Es una posición más valiosa de lo que parece.</div>
                    )}
                    {(() => {
                      const tope = topeCredito(s, netoAnual(s), bienesVal);
                      if (tope < 100) {
                        return <div className="ea-itemD" style={{ marginTop: 10 }}>Ahora mismo no te prestarían más.</div>;
                      }
                      return (
                        <div style={{ marginTop: 12 }}>
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Te prestarían hasta</span><span className="ea-mono">USD {fmt(tope)}</span></div>
                          <div className="ea-itemD" style={{ marginTop: 4 }}>
                            Al {Math.round(tasaPrestamo(s) * 100)}% anual. Pedir prestado no es un error por sí solo: lo es pedirlo
                            para algo que no rinde más que la tasa.
                          </div>
                          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 8 }}>
                            <button className="ea-mini" onClick={() => pedirPrestamo(tope * 0.25)}>Pedir {fmt(tope * 0.25)}</button>
                            <button className="ea-mini" onClick={() => pedirPrestamo(tope * 0.5)}>Pedir {fmt(tope * 0.5)}</button>
                            <button className="ea-mini" onClick={() => pedirPrestamo(tope)}>Pedir el máximo</button>
                          </div>
                        </div>
                      );
                    })()}
                    </Plegable>
                    )}
                    </div>
                  </div>
                )}

                {tab === "portafolio" && (
                  <PanelCartera st={s} onAplicar={aplicarCartera} />
                )}

                {tab === "terminos" && (
                  <div>
                    <div className="ea-rot ea-dis">El diccionario</div>
                    <div className="ea-itemD" style={{ marginBottom: 14 }}>
                      Todas las palabras que el juego usa, explicadas sin jerga. Está aquí siempre, en
                      cualquier modo, y puedes consultarlo en medio de una decisión.
                    </div>
                    {Object.keys(GLOSARIO).map((k) => (
                      <div className="ea-item" key={k}>
                        <div className="ea-itemN">{GLOSARIO[k].n}</div>
                        <div className="ea-itemD">{GLOSARIO[k].x}</div>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "props" && (
                  <div>
                    <div className="ea-rot ea-dis">Inmuebles que rentan</div>
                    <div className="ea-itemD" style={{ marginBottom: 10 }}>
                      A diferencia de los caprichos, estos existen para pagarte algo cada año. La renta aparece
                      en el informe de cierre y el mantenimiento también.
                    </div>
                    {PROPIEDADES.map((c) => {
                      const ya = s.bienes.indexOf(c.id) >= 0;
                      return (
                        <div className="ea-item" key={c.id}>
                          <div className="ea-itemTop">
                            <span className="ea-itemN">{c.n}</span>
                            <span className="ea-mono" style={{ fontSize: 12.5, flexShrink: 0 }}>{fmt(c.c)}</span>
                          </div>
                          <div className="ea-etqs">
                            {c.renta
                              ? <span className="ea-etq act">renta {fmt(c.renta * 2)} al año</span>
                              : <span className="ea-etq">sin renta, solo aprecia</span>}
                            <span className="ea-etq">aprecia {(c.ap * 200).toFixed(1)}%</span>
                            {c.up ? <span className="ea-etq cost">mantener {fmt(c.up * 2)} al año</span> : null}
                            {c.vida ? <span className="ea-etq vida">+{c.vida} de índice</span> : null}
                            {c.renta && c.up ? (
                              <span className="ea-etq act">neto {fmt(c.renta * 2 - c.up * 2)} · {(((c.renta * 2 - c.up * 2) / c.c) * 100).toFixed(1)}% del precio</span>
                            ) : null}
                          </div>
                          <div className="ea-itemD">{c.d}</div>
                          {ya
                            ? <span className="ea-tengo ea-dis">Vale hoy USD {fmt(s.valores[c.id] || 0)}</span>
                            : <button className="ea-mini" disabled={s.cash + s.cartera < c.c} onClick={() => comprarBien(c)}>
                                {s.cash + s.cartera < c.c ? "No te alcanza" : "Comprar"}
                              </button>}
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
                          Comprometes 2% del tamaño como capital propio, 1% si tu rama es private
                          equity. Cobras 2% anual de administración y veinte de las ganancias.
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
                              <div className="ea-itemD">Pide red {t.red} y cargo de {RANGO(t.rango).n} hacia arriba.</div>
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
                        <div className="ea-vidaCab">
                          <div>
                            <div className="ea-vidaN ea-dis">Fondo {ROMANOS[entero(s.fondo.generacion, 1, 1, 8)] || "I"}</div>
                            <div className="ea-vidaD">
                              Cobras 2% anual de administración y veinte de las ganancias
                              por encima del mínimo.
                            </div>
                          </div>
                          <div className="ea-vidaCifra ea-mono" style={{ fontSize: 21 }}>{fmtCorto(capacidadFondo(s.fondo))}</div>
                        </div>

                        <div className="ea-fila" style={{ marginTop: 10 }}><span style={{ fontSize: 12.5 }}>Capital comprometido</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
                        {s.fondo.reciclado > 0 && (
                          <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ganancias reinvertidas</span><span className="ea-mono" style={{ color: "var(--verde)" }}>+ USD {fmt(s.fondo.reciclado)}</span></div>
                        )}
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Desplegado ahora</span><span className="ea-mono">USD {fmt(s.fondo.invertido)}</span></div>
                        <div className="ea-fila"><span className="ea-dis" style={{ fontSize: 12 }}>Para invertir</span><span className="ea-mono" style={{ color: "var(--cobre)" }}>USD {fmt(Math.max(0, capacidadFondo(s.fondo) - s.fondo.invertido))}</span></div>
                        <div className="ea-fila"><span style={{ fontSize: 12.5 }}>Ganancia realizada del fondo</span><span className="ea-mono">USD {fmt(s.fondo.realizado)}</span></div>
                        <div className="ea-itemD" style={{ marginTop: 7 }}>
                          Cuando una empresa se vende, su capital vuelve al fondo y la mitad de la ganancia
                          se queda dentro para volver a invertirse. Por eso el fondo no se agota: circula.
                        </div>

                        {puedeSiguienteFondo(s) && (
                          <div className="ea-caja" style={{ marginTop: 14 }}>
                            <div className="ea-lecK" style={{ color: "var(--cobre)" }}>Puedes levantar el siguiente fondo</div>
                            <div className="ea-itemD" style={{ marginTop: 4 }}>
                              Con el historial que ya tienes, los inversionistas te confían dos veces y media más:
                              USD {fmt(s.fondo.tam * SALTO_FONDO)}. Comprometes USD {fmt(s.fondo.tam * SALTO_FONDO * s.fondo.pct)} de tu propio bolsillo.
                            </div>
                            <button className="ea-mini" disabled={s.cash + s.cartera < s.fondo.tam * SALTO_FONDO * s.fondo.pct}
                              onClick={levantarSiguiente}>
                              {s.cash + s.cartera < s.fondo.tam * SALTO_FONDO * s.fondo.pct
                                ? "Te falta capital propio"
                                : "Levantar el Fondo " + (ROMANOS[entero(s.fondo.generacion, 1, 1, 8) + 1] || "siguiente")}
                            </button>
                          </div>
                        )}

                        <div className="ea-rot ea-dis" style={{ marginTop: 18 }}>En cartera</div>
                        {s.fondo.posiciones.length === 0 && <div className="ea-itemD">Todavía no has invertido en nada.</div>}
                        {s.fondo.posiciones.map((p, k) => (
                          <div className="ea-fondoC" key={k}>
                            <div className="ea-fondoT"><span className="ea-fondoN">{p.n}</span><span className="ea-mono" style={{ fontSize: 12 }}>{fmt(p.ticket)}</span></div>
                            <div className="ea-itemD">{p.s} · salida estimada en {Math.max(0, p.salida - s.turno)} años</div>
                          </div>
                        ))}

                        <div className="ea-rot ea-dis" style={{ marginTop: 18 }}>Sobre la mesa</div>
                        <div className="ea-itemD" style={{ marginBottom: 8 }}>
                          Los cinco indicadores están a la vista. En verde lo que juega a favor, en rojo lo que
                          debería frenarte. El múltiplo esperado sale de ellos, no al revés.
                        </div>
                        {(!s.fondo.oferta || s.fondo.oferta.length === 0) && <div className="ea-itemD">No hay oportunidades este año.</div>}
                        {(s.fondo.oferta || []).map((o, k) => (
                          <div className="ea-fondoC" key={k}>
                            <div className="ea-fondoT">
                              <span className="ea-fondoN">{o.n}</span>
                              <span className="ea-badge">{o.riesgo === 1 ? "Riesgo bajo" : o.riesgo === 2 ? "Riesgo medio" : "Riesgo alto"}</span>
                            </div>
                            {o.crec != null && (
                              <div className="ea-dealS">
                                {senalesDeal(o).map((x) => (
                                  <span key={x.k} className={"ea-sen" + (x.bien ? " bien" : x.mal ? " mal" : "")}>
                                    <span className="ea-senK">{x.k}</span>
                                    <span className="ea-senV ea-mono">{x.v}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                            {o.d ? <div className="ea-itemD">{o.d}</div> : null}
                            <div className="ea-itemD">{o.s} · ticket USD {fmt(o.ticket)} · múltiplo esperado {numero(o.base, 1.5).toFixed(2)}x</div>
                            {o.tomado ? <span className="ea-tengo ea-dis">Invertido</span> : (
                              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                                <button className="ea-mini" onClick={() => invertirEn(k, 1)}>Ticket completo</button>
                                <button className="ea-mini" onClick={() => invertirEn(k, 0.5)}>Medio ticket</button>
                                <button className="ea-mini" onClick={() => invertirEn(k, 0.25)}>Un cuarto</button>
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
                    {/* ---- cómo vives: el índice, pero legible ---- */}
                    <div className="ea-rot ea-dis">Cómo vives</div>
                    <div className="ea-vidaCab">
                      <div>
                        <div className="ea-vidaN ea-dis">{nivelVida.n}</div>
                        <div className="ea-vidaD">{nivelVida.d}</div>
                      </div>
                      {/* el índice a solas no dice nada: va con su tope y su nombre */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div className="ea-vidaCifra ea-mono">
                          {indiceVida}<span style={{ fontSize: 15, color: "var(--tenue)" }}> de {TOPE_VIDA}</span>
                        </div>
                        <div className="ea-dis" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--tenue)", marginTop: 5 }}>
                          ÍNDICE DE TREN DE VIDA
                        </div>
                      </div>
                    </div>

                    {/* el medidor, con las marcas de cada escalón para que se vea
                        cuánto falta para el siguiente y cuánto llevas */}
                    <div className="ea-medidor">
                      <div className="ea-medidorF" style={{ width: (Math.min(1, indiceVida / TOPE_VIDA) * 100).toFixed(1) + "%" }} />
                      {NIVELES_VIDA.slice(1).map((x) => (
                        <div key={x.min} className="ea-medidorT" style={{ left: (Math.min(1, x.min / TOPE_VIDA) * 100).toFixed(1) + "%" }} />
                      ))}
                    </div>
                    <div className="ea-medidorE">
                      {NIVELES_VIDA.map((x) => (
                        <span key={x.min} className={x.n === nivelVida.n ? "on" : ""}>{x.n}</span>
                      ))}
                    </div>

                    {/* ---- lo que cuesta vivir así ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Lo que cuesta</div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Tu tren de vida al año</span>
                      <span className="ea-mono">USD {fmt(gastosAnuales)}</span>
                    </div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Mantenimiento de lo que tienes</span>
                      <span className="ea-mono">USD {fmt(mantenimientoAnual)}</span>
                    </div>
                    {s.hijos > 0 && (
                      <div className="ea-fila">
                        <span style={{ fontSize: 12.5 }}>{s.hijos === 1 ? "Tu hijo" : "Tus " + s.hijos + " hijos"}</span>
                        <span className="ea-mono">USD {fmt(costoHijos)}</span>
                      </div>
                    )}
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Te queda después de impuestos</span>
                      <span className="ea-mono">USD {fmt(netoDelAno)}</span>
                    </div>
                    <div className="ea-fila">
                      <span className="ea-dis" style={{ fontSize: 12 }}>Se lleva</span>
                      <span className="ea-mono" style={{ color: pesoTren > 0.95 ? "var(--rojo)" : pesoTren > 0.75 ? "var(--cobre)" : "var(--verde)" }}>
                        {Math.round(pesoTren * 100)}% de lo que entra
                      </span>
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 8 }}>
                      {pesoTren > 0.95
                        ? "Gastas más de lo que ganas. Cada año que sigas así se financia vendiendo cartera, y esa es la forma más silenciosa de no llegar nunca."
                        : pesoTren > 0.75
                          ? "Te queda algo, pero poco. Subir un escalón más de tren de vida aquí significa dejar de acumular."
                          : "Tienes margen real para ahorrar. Es exactamente el momento en que la mayoría lo gasta."}
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>
                      Cada punto de índice sube tu meta de independencia: necesitas 25 veces tu gasto anual,
                      o sea USD {fmt(gastosAnuales * 25)}. Vivir mejor es legítimo; solo conviene saber lo que mueve la meta.
                    </div>

                    {/* ---- tu gente ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Tu gente</div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Pareja</span>
                      <span className="ea-mono">{parejaTxt}</span>
                    </div>
                    <div className="ea-fila">
                      <span style={{ fontSize: 12.5 }}>Hijos</span>
                      <span className="ea-mono">{s.hijos}</span>
                    </div>
                    <div className="ea-itemD" style={{ marginTop: 6 }}>
                      Esto no se compra en ninguna lista: sale de lo que decides cuando la vida te lo pregunta.
                      Y sí cambia los números, para bien y para mal.
                    </div>

                    {/* ---- caprichos: aquí sí se decide ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Caprichos</div>
                    <div className="ea-itemD" style={{ marginBottom: 10 }}>
                      Ninguno de estos es un error. Solo tienen consecuencias: unos suben tu índice y se van a cero,
                      otros lo suben y conservan valor, y casi todos cobran mantenimiento cada año.
                    </div>
                    {CAPRICHOS.map((c) => {
                      const ya = s.bienes.indexOf(c.id) >= 0;
                      return (
                        <div className="ea-item" key={c.id}>
                          <div className="ea-itemTop">
                            <span className="ea-itemN">{c.n}</span>
                            <span className="ea-mono" style={{ fontSize: 12.5, flexShrink: 0 }}>{fmt(c.c)}</span>
                          </div>
                          <div className="ea-etqs">
                            <span className="ea-etq vida">+{c.vida} de índice</span>
                            <span className={"ea-etq" + (c.tipo === "activo" ? " act" : " con")}>
                              {c.tipo === "activo" ? "conserva valor" : "no se recupera"}
                            </span>
                            {c.up ? <span className="ea-etq cost">mantener {fmt(c.up * 2)} al año</span> : null}
                            {c.renta ? <span className="ea-etq act">renta {fmt(c.renta * 2)}</span> : null}
                            {c.ene ? <span className="ea-etq">energía +{c.ene}</span> : null}
                            {c.red ? <span className="ea-etq">red +{c.red}</span> : null}
                            {c.rep ? <span className="ea-etq">reputación +{c.rep}</span> : null}
                          </div>
                          <div className="ea-itemD">{c.d}</div>
                          {ya
                            ? <span className="ea-tengo ea-dis">{c.tipo === "activo" ? "Vale hoy USD " + fmt(s.valores[c.id] || 0) : "Ya lo tienes"}</span>
                            : <button className="ea-mini" disabled={s.cash + s.cartera < c.c} onClick={() => comprarBien(c)}>
                                {s.cash + s.cartera < c.c ? "No te alcanza" : "Comprar"}
                              </button>}
                        </div>
                      );
                    })}

                    {/* ---- el expediente ---- */}
                    <div className="ea-rot ea-dis" style={{ marginTop: 20 }}>Lo que quedó en tu expediente</div>
                    {s.titulares.length === 0 && <div className="ea-itemD">Todavía no ha pasado nada digno de archivo.</div>}
                    {s.titulares.slice(-18).reverse().map((t, i) => (
                      <div className="ea-tit" key={i}><span className="ea-titQ ea-mono">{t.q}</span><span>{t.t}</span></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            )}

            <div>
              {fase === "evento" && ev && (
                <div className="ea-memo">
                  <div className={"ea-memoHead ea-dis" + (ev.clave ? " clave" : "")}>
                    <span>{ev.rama ? "Bifurcación" : ev.clave ? "Decisión clave" : "Memorando interno"}</span><span>{ano}</span>
                  </div>
                  <h2 className="ea-memoTit ea-dis">{ev.t}</h2>
                  <p className="ea-memoTxt">{ev.x}</p>
                  <div className="ea-ops">
                    {opcionesDe(ev).map((o, i) => (
                      <button className="ea-op" key={i} onClick={() => elegir(o)}>
                        <span className="ea-opN ea-mono">{String.fromCharCode(65 + (i % 26))}</span>{o.t}
                        {o.req && <span className="ea-opTag" style={{ color: "var(--cobre)" }}>Solo tú puedes tomar esta</span>}
                        {(o.juego || o.j) && <span className="ea-opTag">{JUEGO(o.juego || o.j).n} · {JUEGO(o.juego || o.j).tema} · te ayuda {ETIQ[o.stat] || "Criterio"} {Math.round(ayudaDe(o))}</span>}
                        {o.ramaId && <span className="ea-opTag">{(RAMAS.find((r) => r.id === o.ramaId) || {}).d}</span>}
                      </button>
                    ))}
                    {opcionesDe(ev).length === 0 && (
                      <button className="ea-op" onClick={() => resolverEscena({ msg: "El asunto se resolvió sin que te tocara decidir." }, "parcial", null)}>
                        <span className="ea-opN ea-mono">A</span>Dejar que siga su curso
                      </button>
                    )}
                  </div>
                </div>
              )}

              {fase === "minijuego" && op && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis clave"><span>{JUEGO(op.juego || op.j).n} · {JUEGO(op.juego || op.j).dur}</span><span>{ano}</span></div>
                  <h2 className="ea-memoTit ea-dis">{op.t}</h2>
                  <TarjetaJuego tipo={op.juego || op.j} ayuda={ayudaDe(op)} nivel={nivelDe(s.turno, s.estudia)}
                    statN={ETIQ[op.stat] || "Criterio"} onFin={finJuego} modo={s.modo} />
                </div>
              )}

              {fase === "resultado" && res && (
                <div className="ea-memo">
                  <div className="ea-memoHead ea-dis"><span>Resolución</span><span>{ano}</span></div>
                  <div className={"ea-sello ea-dis" + selloCls[res.nivel]}>{selloTxt[res.nivel]}</div>
                  <h2 className="ea-memoTit ea-dis">{(ev && ev.t) || "Resolución"}</h2>
                  <p className="ea-memoTxt">{res.msg}</p>
                  {res.cambios.filter((c) => c.nota || c.v).length > 0 && (
                    <div className="ea-cambios">
                      {res.cambios.filter((c) => c.nota || c.v).map((c, i) => (
                        <span className={"ea-chip ea-mono " + (c.nota ? "pos" : c.v > 0 ? "pos" : "neg")} key={i}>
                          {c.nota ? c.nota : (ETIQ[c.k] + " " + (c.v > 0 ? "+" : "") + (c.k === "cash" ? fmt(c.v) : c.v))}
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

                  {/* lo primero y casi lo único: tres cifras */}
                  <div className="ea-titular">
                    <div className="ea-titularK ea-dis">Tu patrimonio</div>
                    <div className="ea-titularV ea-mono">USD {fmt(cierre.patrimonio)}</div>
                    <div className="ea-titularL">
                      <span className="ea-mono" style={{ color: cierre.patrimonio >= cierre.patAntes ? "#2F5A2E" : "#9C3A2C" }}>
                        {cierre.patrimonio >= cierre.patAntes ? "+" : "−"}{fmt(Math.abs(cierre.patrimonio - cierre.patAntes))} en el año
                      </span>
                      <span className="ea-mono" style={{ color: cierre.ahorro >= 0 ? "#2F5A2E" : "#9C3A2C" }}>
                        ahorraste {Math.round(cierre.ahorro * 100)}% de lo que entró
                      </span>
                    </div>
                    {cierre.ascenso && <div className="ea-titularA ea-dis">Ascenso a {cierre.ascenso}</div>}
                  </div>

                  {cierre.leccion && (
                    <div className="ea-lec" style={{ marginTop: 14 }}>
                      <div className="ea-lecK">Lo que enseña este año</div>
                      <div className="ea-lecT">{cierre.leccion.t}</div>
                      <div className="ea-lecX">{cierre.leccion.x}</div>
                    </div>
                  )}

                  {cierre.hitos.length > 0 && (
                    <div className="ea-hitos">
                      {cierre.hitos.map((h, i) => (<span className="ea-hito" key={i}>{h}</span>))}
                    </div>
                  )}

                  <div className="ea-plegs">

                  <Plegable titulo="Las noticias del año" resumen={cierre.notis.length ? cierre.notis.length + (cierre.notis.length === 1 ? " noticia" : " noticias") : "sin novedades"}>
                    {cierre.notis.map((n, i) => (
                      <div className="ea-noti" key={i} style={{ marginTop: i === 0 ? 0 : 8 }}>
                        <div className="ea-notiK">{n.k}</div>
                        <div className="ea-notiT">{n.t}</div>
                      </div>
                    ))}
                    {cierre.notis.length === 0 && <div className="ea-td">Un año sin sobresaltos en los mercados.</div>}
                  </Plegable>

                  <Plegable titulo="De dónde salió tu patrimonio"
                    resumen={(cierre.patAntes > 0 ? ((cierre.patrimonio / cierre.patAntes - 1) * 100).toFixed(1) + "%" : "primer año")}
                    tono={cierre.patrimonio >= cierre.patAntes ? "#2F5A2E" : "#9C3A2C"}>
                  <div>
                    <div className="ea-lecK">Patrimonio</div>
                    <div className="ea-mono" style={{ fontSize: 26, color: "#1F2B2E", margin: "3px 0" }}>
                      USD {fmt(cierre.patrimonio)}
                    </div>
                    <div className="ea-dis" style={{ fontSize: 14, color: cierre.patrimonio >= cierre.patAntes ? "#3E6B3C" : "var(--rojo)" }}>
                      {cierre.patrimonio >= cierre.patAntes ? "+" : ""}{fmt(cierre.patrimonio - cierre.patAntes)} en el año
                      {cierre.patAntes > 0 ? " · " + ((cierre.patrimonio / cierre.patAntes - 1) * 100).toFixed(1) + "%" : ""}
                    </div>
                    <Chispa datos={cierre.histo} desde={2026} />
                    <div className="ea-tabla" style={{ marginTop: 4 }}>
                      <span className="ea-td">Efectivo</span><span className="ea-tdn ea-mono">{fmt(s.cash)}</span>
                      <span className="ea-td">Cartera invertida</span><span className="ea-tdn ea-mono">{fmt(s.cartera)}</span>
                      <span className="ea-td">Bienes</span><span className="ea-tdn ea-mono">{fmt(cierre.bienesV)}</span>
                    </div>
                  </div>

                  </Plegable>

                  {/* el año en plata */}
                  <Plegable titulo="El año en plata" resumen={(cierre.neto >= 0 ? "+" : "−") + fmt(Math.abs(cierre.neto))}
                    tono={cierre.neto >= 0 ? "#2F5A2E" : "#9C3A2C"}>
                  <div>
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
                      Tasa de ahorro {Math.round(cierre.ahorro * 100)}% de todo lo que entró.
                    </div>
                    {cierre.deuda && (
                      <div className="ea-alerta mal">
                        Cerraste el año en rojo por USD {fmt(-s.cash)}: gastas más de lo que entra y la diferencia se financia.
                        {cierre.patAntes > 1000 ? " Te comiste la cartera y seguiste." : " A este cargo es normal, y también es la razón por la que el primer objetivo es que la resta dé positivo."}
                      </div>
                    )}
                  </div>

                  </Plegable>

                  {/* la cartera */}
                  {cierre.cartera && (
                    <Plegable titulo="Tu cartera, mes a mes"
                      resumen={(cierre.cartera.ret >= 0 ? "+" : "") + (cierre.cartera.ret * 100).toFixed(1) + "%"}
                      tono={cierre.cartera.ret >= 0 ? "#2F5A2E" : "#9C3A2C"}>
                    <div className={"ea-alerta " + (cierre.cartera.ret >= 0.02 ? "bien" : cierre.cartera.ret < -0.02 ? "mal" : "")} style={{ marginTop: 0 }}>
                      <div className="ea-lecK">Tu cartera {perfilN.toLowerCase()} · {Math.round(cierre.cartera.obj * 100)}% invertido</div>
                      <div className="ea-mono" style={{ fontSize: 23, color: "#1F2B2E", margin: "4px 0" }}>
                        {fmt(cierre.cartera.antes)} → {fmt(cierre.cartera.despues)}
                      </div>
                      <div className="ea-dis" style={{ fontSize: 16, color: cierre.cartera.ret >= 0 ? "#3E6B3C" : "var(--rojo)" }}>
                        {cierre.cartera.ret >= 0 ? "+" : ""}{(cierre.cartera.ret * 100).toFixed(1)}% · {cierre.cartera.ret >= 0 ? "ganaste" : "perdiste"} USD {fmt(Math.abs(cierre.cartera.despues - cierre.cartera.antes))}
                      </div>
                      {cierre.cartera.camino && <Curva camino={cierre.cartera.camino} ret={cierre.cartera.ret} hitos={cierre.hitosDec} />}
                      <div className="ea-td" style={{ marginTop: 3 }}>
                        Esperabas {(cierre.cartera.mu * 100).toFixed(1)} con una desviación de {(cierre.cartera.sd * 100).toFixed(1)} puntos, así que
                        {" "}{Math.abs(cierre.cartera.ret - cierre.cartera.mu) < cierre.cartera.sd ? "este año entra dentro de lo normal" : "este año fue de los raros, para bien o para mal"}.
                        {cierre.cartera.aporte > 100 ? " Metiste USD " + fmt(cierre.cartera.aporte) + " de aporte nuevo." : cierre.cartera.aporte < -100 ? " Sacaste USD " + fmt(-cierre.cartera.aporte) + " de la cartera." : ""}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        {cierre.cartera.detalle.map((d, i) => (
                          <div key={i} style={{ marginBottom: 4 }}>
                            <div className="ea-flin">
                              <span>{d.n} · {Math.round(d.w * 100)}%</span>
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

                    </Plegable>
                  )}

                  {/* qué tan cerca estás de no necesitar el sueldo */}
                  <Plegable titulo="Camino a no depender del sueldo" resumen={Math.round(cierre.cobertura * 100) + "% cubierto"}>
                  <div>
                    <div className="ea-lecK">Camino a no depender del sueldo</div>
                    <div className="ea-td" style={{ marginTop: 2 }}>
                      Tu patrimonio cubre {Math.round(cierre.cobertura * 100)}% de tus gastos de USD {fmt(cierre.gastos)} retirando el 4%.
                    </div>
                    <div className="ea-ind">
                      <div className="ea-indF" style={{ width: Math.min(100, cierre.indep * 100) + "%" }} />
                      <div className="ea-indM" style={{ left: "71.4%" }} />
                    </div>
                    <div className="ea-td" style={{ marginTop: 3, fontSize: 11.5 }}>
                      La marca es 25 veces tu gasto anual, USD {fmt(cierre.gastos * 25)}.
                    </div>
                  </div>

                  </Plegable>

                  {cierre.notas.length > 0 && (
                    <Plegable titulo="Lo que pasó por el camino" resumen={cierre.notas.length + (cierre.notas.length === 1 ? " nota" : " notas")} abierto>
                      {cierre.notas.map((n, i) => (<div key={i} className="ea-td" style={{ fontSize: 13.5, marginBottom: 5 }}>{n}</div>))}
                    </Plegable>
                  )}

                  </div>

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
                  <div className="ea-memoHead ea-dis clave"><span>Decisión de vida</span><span>{edad(s.turno, s.edadIni)} años</span></div>
                  <h2 className="ea-memoTit ea-dis">¿Te retiras?</h2>
                  <p className="ea-memoTxt">
                    Llegaste a los {edad(s.turno, s.edadIni)}. Puedes cerrar aquí y vivir de lo que construiste, o seguir cinco años
                    más y ver hasta dónde llega. Los números son estos.
                  </p>
                  <div className="ea-res" style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 13.5, color: "#3A4649" }}>Patrimonio total USD {fmt(patrimonio)}, de los cuales USD {fmt(bienesVal)} están en bienes.</div>
                    <div style={{ fontSize: 13.5, color: "#3A4649" }}>Retirando 4% al año dispondrías de USD {fmt(retiroAnual)}.</div>
                    {rentaProps > 0 && <div style={{ fontSize: 13.5, color: "#3A4649" }}>Tus propiedades rentan USD {fmt(rentaProps)} al año.</div>}
                    <div style={{ fontSize: 13.5, color: "#3A4649" }}>Tu forma de vivir cuesta USD {fmt(gastosAnuales)} al año.</div>
                    <div className="ea-dis" style={{ marginTop: 11, fontSize: 17, color: cobertura >= 1 ? "#3E6B3C" : "var(--rojo)" }}>
                      {cobertura >= 1 ? "Te alcanza y sobra" : cobertura >= 0.7 ? "Te queda corto por poco" : "No te alcanza"} · cubres el {Math.round(cobertura * 100)}%
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
            {s.nombre ? s.nombre + " · " : ""}{edad(s.turno, s.edadIni)} años · {nacion.n} · {estudio.n}
          </div>
          <h2 className="ea-final ea-dis">{veredicto.t}</h2>
          <p className="ea-lede">{veredicto.x}</p>
          <div className="ea-regla" />
          <div className="ea-cifras">
            <div><div className="ea-cifraK">Cargo final</div><div className="ea-cifraV ea-dis">{RANGO(s.rango).n}</div></div>
            <div><div className="ea-cifraK">Rama</div><div className="ea-cifraV ea-dis">{ramaN || "sin definir"}</div></div>
            <div><div className="ea-cifraK">Patrimonio</div><div className="ea-cifraV ea-mono">USD {fmt(patrimonio)}</div></div>
            {s.deuda > 0 && <div><div className="ea-cifraK">Deuda pendiente</div><div className="ea-cifraV ea-mono">USD {fmt(s.deuda)}</div></div>}
            {s.quiebras > 0 && <div><div className="ea-cifraK">Quiebras</div><div className="ea-cifraV ea-mono">{s.quiebras}</div></div>}
            <div><div className="ea-cifraK">Renta anual al 4%</div><div className="ea-cifraV ea-mono">USD {fmt(retiroAnual)}</div></div>
            <div><div className="ea-cifraK">Gasto anual</div><div className="ea-cifraV ea-mono">USD {fmt(gastosAnuales)}</div></div>
            <div><div className="ea-cifraK">Tren de vida</div><div className="ea-cifraV ea-dis">{nivelDeVida(vidaTotal(s)).n}</div></div>
            <div>
              <div className="ea-cifraK">Cuánto cuesta sostenerlo</div>
              <div className="ea-cifraV ea-mono">USD {fmt(gastosAnuales)} al año</div>
            </div>
          </div>
          {s.fondo && (
            <div className="ea-panel" style={{ marginTop: 24 }}>
              <div className="ea-rot ea-dis">Tu gestora</div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Generación alcanzada</span><span className="ea-mono">Fondo {ROMANOS[entero(s.fondo.generacion, 1, 1, 8)] || "I"}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Capital comprometido</span><span className="ea-mono">USD {fmt(s.fondo.tam)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Ganancias reinvertidas</span><span className="ea-mono">USD {fmt(s.fondo.reciclado || 0)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Ganancia realizada</span><span className="ea-mono" style={{ color: (s.fondo.realizado || 0) >= 0 ? "var(--verde)" : "var(--rojo)" }}>USD {fmt(s.fondo.realizado)}</span></div>
              <div className="ea-fila"><span style={{ fontSize: 13 }}>Múltiplo sobre lo comprometido</span><span className="ea-mono">{s.fondo.tam > 0 ? (1 + (s.fondo.realizado || 0) / s.fondo.tam).toFixed(2) + "x" : "—"}</span></div>
            </div>
          )}
          {conservanValor.length > 0 && (
            <div className="ea-panel" style={{ marginTop: 16 }}>
              <div className="ea-rot ea-dis">Lo que conservó valor</div>
              <div className="ea-invCab ea-dis">
                <span>Bien</span><span>Pagaste</span><span>Vale hoy</span><span>Resultado</span>
              </div>
              {conservanValor.map(({ c, pagado, hoy }) => {
                const dif = hoy - pagado;
                const pct = pagado > 0 ? (hoy / pagado - 1) * 100 : 0;
                return (
                  <div className="ea-invF" key={c.id}>
                    <span className="ea-invN">{c.n}</span>
                    <span className="ea-mono">{fmt(pagado)}</span>
                    <span className="ea-mono">{fmt(hoy)}</span>
                    <span className="ea-mono" style={{ color: dif >= 0 ? "#5F8F5C" : "var(--rojo)" }}>
                      {dif >= 0 ? "+" : "−"}{fmt(Math.abs(dif))}
                      <span className="ea-invP">{dif >= 0 ? "+" : ""}{pct.toFixed(0)}%</span>
                    </span>
                  </div>
                );
              })}
              <div className="ea-invT">
                <span className="ea-dis">Total</span>
                <span className="ea-mono">{fmt(totalPagado)}</span>
                <span className="ea-mono">{fmt(totalHoy)}</span>
                <span className="ea-mono" style={{ color: totalHoy >= totalPagado ? "#5F8F5C" : "var(--rojo)" }}>
                  {totalHoy >= totalPagado ? "+" : "−"}{fmt(Math.abs(totalHoy - totalPagado))}
                </span>
              </div>
            </div>
          )}
          {gastadoEnConsumo > 0 && (
            <div className="ea-panel" style={{ marginTop: 16 }}>
              <div className="ea-rot ea-dis">Lo que se disfrutó y no volvió</div>
              <div className="ea-mono" style={{ fontSize: 23, color: "var(--papel)" }}>USD {fmt(gastadoEnConsumo)}</div>
              <div className="ea-itemD" style={{ marginTop: 6 }}>
                {consumoN} {consumoN === 1 ? "compra" : "compras"} sin valor de reventa: viajes, carros, fiestas.
                No es dinero mal gastado por definición; es dinero que se cambió por vida en vez de por patrimonio.
                Puesto a trabajar al 7% durante los años que te quedaban, habría llegado a
                unos USD {fmt(gastadoEnConsumo * 1.9)}.
              </div>
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

/* ============================================================
   BLINDAJE . CAPA TRES: LA RED
   React desmonta el arbol entero si un componente lanza durante el
   render. Sin esto, cualquier fallo deja la pantalla en blanco y la
   partida parece perdida. Con esto, el error queda contenido, se
   escribe en consola para poder arreglarlo, y el jugador tiene tres
   salidas: reintentar, volver al guardado o empezar limpio.
   ============================================================ */
class Blindaje extends React.Component {
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
          <div className="ea-mono" style={{ fontSize: 12, color: "var(--tenue)", marginBottom: 20, wordBreak: "break-word" }}>
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

export default function ElAnalista() {
  return (
    <Blindaje>
      <Motor />
    </Blindaje>
  );
}
