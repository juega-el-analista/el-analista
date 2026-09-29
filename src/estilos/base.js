export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.ea-root{
  --tinta:#06170D; --fieltro:#0B3A1F; --borde:#1F6B3E;
  --papel:#F7F7F5; --papel2:#E9EEF5; --tintaPapel:#3D3D3D;
  --cobre:#B9532A; --verde:#4FA05C; --rojo:#B23B27; --gris:#6B6B6B;
  --hueso:#EDEDE8; --tenue:#9FB8A8;
  background:var(--papel); color:var(--tintaPapel); min-height:100vh;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:15px; line-height:1.55; padding:16px;
}
.ea-root *{box-sizing:border-box}
.ea-root{overflow-x:clip}
.ea-dis{font-family:'Archivo Narrow','Arial Narrow',sans-serif; text-transform:uppercase; letter-spacing:.06em; font-weight:700}
.ea-mono{font-family:'IBM Plex Mono',ui-monospace,Menlo,monospace; font-variant-numeric:tabular-nums}

.ea-wrap{max-width:1100px;margin:0 auto}
.ea-placa{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end;justify-content:space-between;
  border:1px solid var(--borde);background:var(--fieltro);padding:15px 20px;border-radius:3px 3px 0 0}
.ea-nombre{font-size:25px;line-height:1;color:var(--papel)}
.ea-sub{font-size:11.5px;color:var(--tenue);letter-spacing:.14em;margin-top:5px}
.ea-reloj{text-align:right;font-size:11.5px;color:var(--tenue);letter-spacing:.1em}
.ea-plata{font-size:23px;color:var(--papel)}
.ea-plata.neg{color:var(--rojo)}

.ea-cinta{border:1px solid var(--borde);border-top:none;background:#04220F;padding:8px 20px;
  font-size:12px;color:var(--tenue);display:flex;gap:10px;align-items:baseline;border-radius:0 0 3px 3px}
.ea-cintaK{color:var(--cobre);flex-shrink:0;font-size:11px;letter-spacing:.14em}

.ea-grid{display:grid;grid-template-columns:300px 1fr;gap:18px;margin-top:18px;align-items:start}
@media(max-width:880px){.ea-grid{grid-template-columns:1fr}}

.ea-panel{border:1px solid var(--borde);background:var(--papel);padding:16px 18px;border-radius:3px}
.ea-rot{font-size:11px;letter-spacing:.2em;color:var(--gris);margin-bottom:12px}

.ea-tabs{display:flex;flex-wrap:wrap;gap:0;border:1px solid var(--borde);border-bottom:none;background:var(--papel)}
.ea-tab{flex:1;min-width:70px;background:transparent;border:none;border-bottom:2px solid transparent;color:var(--gris);
  padding:9px 4px;font:inherit;font-size:11px;letter-spacing:.12em;cursor:pointer;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-tab.on{color:var(--tintaPapel);border-bottom-color:var(--cobre)}
.ea-tab:hover{color:#262626}

.ea-stat{margin-bottom:10px}
.ea-statTop{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.08em;margin-bottom:4px}
.ea-bar{height:5px;background:#041F0E;position:relative;overflow:hidden}
.ea-fill{height:100%;background:var(--cobre);transition:width .5s ease}
.ea-fill.ene{background:var(--verde)}
.ea-fill.baja{background:var(--rojo)}

.ea-fila{display:flex;justify-content:space-between;gap:8px;font-size:13px;padding:5px 0;border-bottom:1px dotted var(--borde)}
.ea-fila:last-child{border-bottom:none}

.ea-slider{width:100%;-webkit-appearance:none;appearance:none;height:3px;background:#041F0E;outline:none;margin:7px 0 2px}
.ea-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;background:var(--cobre);cursor:pointer;border-radius:0}
.ea-slider::-moz-range-thumb{width:13px;height:13px;background:var(--cobre);cursor:pointer;border:none;border-radius:0}

/* Comprar es la accion que mueve dinero: no puede tener el mismo peso
   visual que un boton cualquiera. */
.ea-comprar{background:var(--cobre);color:#20120A;border:1px solid var(--cobre);padding:9px 18px;
  font:inherit;font-size:12.5px;letter-spacing:.12em;cursor:pointer;margin-top:8px;border-radius:2px;
  transition:background .15s,border-color .15s,transform .12s;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-comprar:hover:not(:disabled){background:#C86A3E;border-color:#C86A3E}
.ea-comprar:active:not(:disabled){transform:translateY(1px)}

.ea-item{border-bottom:1px dotted var(--borde);padding:11px 0}
/* Lo que ya es tuyo se apaga, para que la vista encuentre sola lo que
   todavia no tienes. Sin opacity en el contenedor: asi la etiqueta de
   «ya lo tienes» sigue legible en verde. */
.ea-item.tuyo{background:rgba(61,61,61,.05);padding-left:9px;padding-right:9px;border-radius:2px;
  border-left:2px solid rgba(79,160,92,.45)}
.ea-item.tuyo .ea-itemN{color:rgba(61,61,61,.62)}
.ea-item.tuyo .ea-itemD{color:rgba(61,61,61,.5)}
.ea-item.tuyo .ea-etq{opacity:.45}
.ea-item.tuyo .ea-mono{color:rgba(61,61,61,.55)}
.ea-item:last-child{border-bottom:none}
.ea-itemTop{display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.ea-itemN{font-size:13.5px;color:var(--tintaPapel);font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;letter-spacing:.05em;font-weight:700}
.ea-itemD{font-size:12px;color:var(--gris);margin-top:4px}
.ea-mini{background:transparent;border:1px solid var(--borde);color:var(--tintaPapel);font:inherit;font-size:11px;
  letter-spacing:.1em;padding:5px 10px;cursor:pointer;margin-top:8px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-mini:hover:not(:disabled){border-color:var(--cobre);color:#262626}
.ea-mini:disabled{opacity:.35;cursor:not-allowed}
.ea-tengo{color:var(--verde);font-size:11px;letter-spacing:.12em;margin-top:8px;display:inline-block}

.ea-memo{background:var(--papel);color:var(--tintaPapel);padding:26px 26px 22px;position:relative;
  border-radius:4px;
  box-shadow:0 18px 40px rgba(0,51,24,.28), 0 2px 0 var(--papel2);
  animation:ea-in .4s cubic-bezier(.2,.7,.3,1)}
@keyframes ea-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.ea-memoHead{display:flex;justify-content:space-between;align-items:baseline;gap:12px;
  border-bottom:2px solid var(--tintaPapel);padding-bottom:8px;margin-bottom:15px;font-size:11px;letter-spacing:.18em}
.ea-memoHead.clave{border-bottom:4px double var(--tintaPapel)}
.ea-memoTit{font-size:26px;line-height:1.08;margin:0 0 10px;color:#262626}
.ea-memoTxt{font-size:15.5px;margin:0;color:#3D3D3D}

.ea-ops{margin-top:18px;display:flex;flex-direction:column;gap:8px}
.ea-op{display:block;width:100%;text-align:left;background:transparent;color:var(--tintaPapel);
  border:1px solid rgba(61,61,61,.32);padding:11px 13px;font:inherit;font-size:14.5px;cursor:pointer;
  transition:background .15s,border-color .15s,transform .12s}
.ea-op:hover:not(:disabled){background:rgba(185,83,42,.14);border-color:var(--cobre);transform:translateX(3px)}
.ea-op:focus-visible{outline:2px solid var(--cobre);outline-offset:2px}
.ea-op:disabled{cursor:default;transform:none}
.ea-op.ok{border-color:#3D8A49;background:rgba(62,107,60,.15)}
.ea-op.no{border-color:var(--rojo);background:rgba(178,59,39,.13)}
.ea-opN{font-size:11px;letter-spacing:.16em;color:var(--gris);margin-right:9px}
.ea-opTag{display:block;font-size:11px;letter-spacing:.14em;color:var(--gris);margin-top:5px}
.ea-opSolo{display:inline-block;font-size:9.5px;letter-spacing:.14em;color:var(--cobre);
  border:1px solid var(--cobre);padding:1px 6px;margin-left:8px;vertical-align:middle}

/* Una opcion que no te alcanza se ve, y se ve POR QUE no te alcanza. No
   se esconde: enterarte de lo que te estas perdiendo es justo lo que
   hace que quieras tener mas energia o mas criterio la proxima vez. */
/* Salia una cada tres años de juego y pasaba desapercibida: opacidad al
   52% y un borde punteado gris sobre fondo gris. Ahora se ve que esta
   cerrada, y por que, sin tener que buscarlo. */
.ea-op.sinfuerza{opacity:1;cursor:not-allowed;border-style:dashed;
  border-color:rgba(178,59,39,.42);background:rgba(178,59,39,.05);
  color:rgba(61,61,61,.55)}
.ea-op.sinfuerza:hover{transform:none;background:rgba(178,59,39,.05)}
.ea-op.sinfuerza .ea-opN{color:rgba(155,56,38,.6)}
/* Lo que mueve cada opcion, en simbolos y con color: verde lo que suma,
   rojo lo que cuesta. Antes era una linea de texto gris donde ganar red
   y perder energia pesaban visualmente lo mismo. */
.ea-efs{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.ea-ef{display:inline-flex;align-items:center;gap:3px;font-size:12px;
  padding:3px 9px;border-radius:11px;border:1px solid;line-height:1.5}
/* los signos mandan sobre el icono: son los que dicen cuanto */
.ea-efS{font-size:13.5px;font-weight:700;letter-spacing:-.06em}
.ea-ef.pos{color:#2E7A3D;border-color:rgba(62,138,73,.45);background:rgba(79,160,92,.1)}
.ea-ef.neg{color:#9B3826;border-color:rgba(178,59,39,.4);background:rgba(178,59,39,.08)}
.ea-op:disabled .ea-ef{filter:grayscale(.55)}

.ea-opCandado{display:inline-flex;align-items:center;gap:5px;font-size:11px;
  letter-spacing:.06em;border-radius:11px;background:rgba(178,59,39,.1);
  font-variant-numeric:tabular-nums;color:#9B3826;
  border:1px solid rgba(178,59,39,.45);padding:3px 9px;margin-left:9px;vertical-align:middle;
  white-space:nowrap}

.ea-sello{position:absolute;top:14px;right:18px;transform:rotate(-11deg);
  border:3px solid var(--cobre);color:var(--cobre);padding:4px 11px;font-size:14px;
  letter-spacing:.14em;opacity:.85;animation:ea-stamp .3s ease-out}
.ea-sello.med{border-color:var(--gris);color:var(--gris)}
.ea-sello.mal{border-color:var(--rojo);color:var(--rojo)}
@keyframes ea-stamp{from{transform:rotate(-11deg) scale(1.7);opacity:0}to{transform:rotate(-11deg) scale(1);opacity:.85}}

.ea-res{border-top:1px dashed rgba(61,61,61,.4);margin-top:16px;padding-top:13px}
.ea-cambios{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}
.ea-chip{font-size:12px;padding:3px 9px;border:1px solid rgba(61,61,61,.3)}
.ea-chip.pos{color:#3D8A49;border-color:#3D8A49}
.ea-chip.neg{color:#8A2E1E;border-color:#8A2E1E}

.ea-noti{background:rgba(61,61,61,.07);border-left:3px solid var(--tintaPapel);padding:10px 12px;margin-top:14px}
.ea-notiK{font-size:10.5px;letter-spacing:.2em;color:var(--gris)}
.ea-notiT{font-size:14.5px;color:#3D3D3D;margin-top:3px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;letter-spacing:.02em}

.ea-btn{background:var(--tintaPapel);color:var(--papel);border:none;padding:11px 20px;font:inherit;
  font-size:13px;letter-spacing:.14em;cursor:pointer;margin-top:16px;border-radius:2px;
  transition:background .15s,transform .12s;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-btn:hover:not(:disabled){background:var(--cobre)}
.ea-btn:active:not(:disabled){transform:translateY(1px)}
.ea-btn:disabled{opacity:.4;cursor:not-allowed}
.ea-btnO{background:transparent;color:var(--tintaPapel);border:1px solid var(--borde);padding:11px 20px;
  font:inherit;font-size:13px;letter-spacing:.14em;cursor:pointer;border-radius:2px;
  transition:border-color .15s,color .15s;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-btnO:hover{border-color:var(--cobre);color:var(--cobre)}

.ea-tit{font-size:13px;padding:6px 0;border-bottom:1px dotted var(--borde);display:flex;gap:9px}
.ea-titQ{color:var(--cobre);flex-shrink:0;font-size:11.5px}

/* ---- minijuegos ---- */
.ea-jw{margin-top:16px}
.ea-jinfo{display:flex;justify-content:space-between;gap:10px;font-size:11.5px;letter-spacing:.14em;color:var(--gris);margin-bottom:11px}
.ea-pista{background:rgba(61,61,61,.06);border-left:3px solid var(--cobre);padding:9px 12px;font-size:13.5px;color:#3D3D3D;margin-bottom:15px}

.ea-pbar{position:relative;height:42px;background:rgba(61,61,61,.08);border:1px solid rgba(61,61,61,.25);overflow:hidden}
.ea-pzona{position:absolute;top:0;bottom:0;background:rgba(79,160,92,.35);border-left:1px solid #3D8A49;border-right:1px solid #3D8A49}
.ea-pcursor{position:absolute;top:-3px;bottom:-3px;width:3px;background:var(--tintaPapel)}

.ea-celdas{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:260px}
.ea-celda{aspect-ratio:1/1;background:rgba(61,61,61,.08);border:1px solid rgba(61,61,61,.25);cursor:pointer;
  transition:background .12s;display:flex;align-items:center;justify-content:center;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-size:36px;color:var(--tintaPapel);line-height:1}
.ea-celda.on{background:var(--cobre)}
.ea-celda.mal{background:var(--rojo)}
.ea-celda.gana{background:rgba(79,160,92,.4)}

.ea-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.ea-num{background:rgba(61,61,61,.07);border:1px solid rgba(61,61,61,.22);padding:10px 3px;cursor:pointer;
  font-size:13.5px;text-align:center;color:var(--tintaPapel)}
.ea-num:hover{border-color:var(--cobre)}

.ea-mult{font-size:50px;line-height:1;color:var(--tintaPapel)}
.ea-jwCentro{text-align:center}
.ea-jwCentro .ea-mult{font-size:clamp(56px,16vw,92px);margin-top:10px}
.ea-suerteMeta{font-size:11.5px;color:var(--gris);margin-top:6px}
.ea-suerteHist{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:12px}
.ea-suerteH{font-size:12px;padding:2px 8px;border:1px solid rgba(61,61,61,.25)}
.ea-suerteH.ok{color:#2F7A3D;border-color:#2F7A3D}
.ea-suerteH.mal{color:var(--rojo);border-color:var(--rojo)}
.ea-fila2{display:flex;gap:9px;flex-wrap:wrap;margin-top:13px}
.ea-qtxt{font-size:16.5px;color:#3D3D3D;margin:0 0 13px}
.ea-expl{font-size:13.5px;color:var(--gris);margin-top:11px;border-left:2px solid var(--cobre);padding-left:10px}

.ea-luz{height:120px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(61,61,61,.25);
  background:rgba(61,61,61,.06);font-size:22px;text-align:center;padding:14px;line-height:1.2;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;color:#3D3D3D}
.ea-luz.lista{background:rgba(79,160,92,.35);border-color:#3D8A49}
.ea-luz.roja{background:rgba(178,59,39,.28);border-color:var(--rojo)}

.ea-ordenL{display:flex;flex-direction:column;gap:7px}
.ea-ordenI{border:1px solid rgba(61,61,61,.28);padding:10px 12px;cursor:pointer;font-size:14px;
  display:flex;justify-content:space-between;gap:10px;align-items:center;background:transparent;color:var(--tintaPapel);
  text-align:left;font:inherit;width:100%}
.ea-ordenI:hover:not(:disabled){border-color:var(--cobre)}
.ea-ordenI.hecho{background:rgba(62,107,60,.16);border-color:#3D8A49;cursor:default}
.ea-ordenI.err{background:rgba(178,59,39,.16);border-color:var(--rojo)}
.ea-ordenN{font-size:11px;letter-spacing:.14em;color:var(--gris)}

.ea-portada{max-width:680px;margin:5vh auto;text-align:left}
.ea-h1{font-size:clamp(44px,11vw,84px);line-height:.9;color:var(--tintaPapel);margin:0}
.ea-lede{color:var(--gris);margin:18px 0 26px;font-size:16px;max-width:56ch}
.ea-regla{height:1px;background:var(--borde);margin:24px 0}
.ea-final{font-size:33px;color:var(--tintaPapel);line-height:1.1;margin:0 0 12px}
.ea-cifras{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:15px}
/* en la portada, dos por dos: con cuatro textos largos, auto-fit dejaba
   tres arriba y uno huérfano abajo, o se montaban en pantallas estrechas */
.ea-cifras.ea-cifrasPortada{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 24px}
@media (max-width:460px){.ea-cifras.ea-cifrasPortada{grid-template-columns:1fr}}
.ea-cifraV{overflow-wrap:break-word}
.ea-cifraK{font-size:11px;color:var(--gris);letter-spacing:.18em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-cifraV{font-size:20px;color:var(--tintaPapel)}
.ea-cifraD{font-size:12.5px;line-height:1.45;color:var(--gris);margin-top:5px}
`;
