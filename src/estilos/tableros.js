export const CSS3 = `
.ea-tab4{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
.ea-fichaP{aspect-ratio:1/1.25;border:1px solid rgba(61,61,61,.3);background:rgba(61,61,61,.09);cursor:pointer;
  display:flex;align-items:center;justify-content:center;text-align:center;padding:6px;font-size:11.5px;
  line-height:1.2;color:var(--tintaPapel);transition:background .15s,border-color .15s}
.ea-fichaP.tapada{background:var(--tintaPapel);color:transparent}
.ea-fichaP.tapada::after{content:"?";color:var(--papel);font-size:20px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-fichaP.abierta{background:rgba(185,83,42,.2);border-color:var(--cobre)}
.ea-fichaP.hecha{background:rgba(62,107,60,.18);border-color:#3D8A49;cursor:default}
.ea-fichaP.vista{cursor:default}
.ea-fichaP.pintada{border-width:1px 1px 1px 5px}
.ea-fichaP.hecha.pintada{opacity:.62}

.ea-pista4{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;background:rgba(61,61,61,.12);padding:5px;
  border:1px solid rgba(61,61,61,.25)}
.ea-col4{display:flex;flex-direction:column-reverse;gap:4px;cursor:pointer}
.ea-hueco{aspect-ratio:1/1;border-radius:50%;background:var(--papel);border:1px solid rgba(61,61,61,.18)}
.ea-hueco.mia{background:var(--cobre)}
.ea-hueco.suya{background:var(--tintaPapel)}
.ea-hueco.gana{box-shadow:0 0 0 3px #3D8A49 inset}
.ea-col4:hover .ea-hueco{border-color:var(--cobre)}

.ea-pistaC{position:relative;height:220px;border:1px solid rgba(61,61,61,.25);background:rgba(61,61,61,.05);overflow:hidden}
.ea-lineaC{position:absolute;top:0;bottom:0;width:1px;background:rgba(61,61,61,.18)}
.ea-cap{position:absolute;bottom:8px;width:26%;height:26px;background:var(--cobre);
  transition:left .12s ease;display:flex;align-items:center;justify-content:center;color:var(--papel);
  font-size:10px;letter-spacing:.1em;font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-obj{position:absolute;width:26%;height:24px;display:flex;align-items:center;justify-content:center;
  font-size:9.5px;letter-spacing:.06em;text-align:center;line-height:1;padding:2px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700;text-transform:uppercase}
.ea-obj.bueno{background:rgba(79,160,92,.55);color:#0B3A1F}
.ea-obj.malo{background:rgba(178,59,39,.6);color:var(--papel)}
/* El numero del anclaje no tenia unidad ni referencia: se veia un
   slider de 0 a 100 y nada mas. Ahora la cifra manda en pantalla y la
   escala esta rotulada en los dos extremos. */
.ea-anclaN{font-size:38px;line-height:1;color:var(--tintaPapel);margin:6px 0 0;
  font-family:'IBM Plex Mono',monospace}
.ea-anclaE{display:flex;justify-content:space-between;gap:10px;margin-top:2px;
  font-size:10.5px;letter-spacing:.1em;color:var(--gris);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}

.ea-carrilS{height:7px;margin:12px 0 3px}
.ea-carrilS::-webkit-slider-thumb{width:26px;height:20px}
.ea-carrilS::-moz-range-thumb{width:26px;height:20px}
.ea-carrilN{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}
.ea-carrilE{text-align:center;font-size:11.5px;letter-spacing:.08em;color:var(--gris);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-carrilE.on{color:var(--cobre)}

.ea-postor{display:flex;justify-content:space-between;align-items:center;gap:9px;padding:6px 0;
  border-bottom:1px dotted rgba(61,61,61,.3);font-size:13px}
.ea-postor.fuera{opacity:.4;text-decoration:line-through}
.ea-precio{font-size:44px;line-height:1;color:var(--tintaPapel)}
`;
