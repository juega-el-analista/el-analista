export const CSS5 = `
/* --- memoria por colores --- */
.ea-celdaC{aspect-ratio:1/1;border:2px solid;cursor:pointer;transition:background .12s,transform .1s,border-color .12s;
  display:flex;align-items:flex-end;justify-content:center;padding:6px 3px;font:inherit}
.ea-celdaC:disabled{cursor:default}

/* --- vidas / intentos restantes --- */
.ea-vidas{display:flex;gap:6px;margin-top:11px}
.ea-vida{width:26px;height:5px;background:rgba(61,61,61,.18)}
.ea-vida.viva{background:var(--cobre)}

/* --- la clase de la cátedra --- */
.ea-claseT{font-size:23px;line-height:1.1;margin:4px 0 10px;color:#262626;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.02em;font-weight:700}
.ea-ej{background:rgba(185,83,42,.1);border-left:3px solid var(--cobre);padding:10px 13px;margin-top:14px}
.ea-ejX{font-size:14px;color:#3D3D3D;margin-top:3px;font-family:'IBM Plex Mono',ui-monospace,monospace;line-height:1.5}

/* --- la sesión de trading --- */
.ea-estado{margin-top:12px;padding:11px;text-align:center;font-size:15px;letter-spacing:.16em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;border:2px solid}
.ea-estado.dentro{background:rgba(79,160,92,.28);border-color:#3D8A49;color:#1F5A2E}
.ea-estado.fuera{background:rgba(61,61,61,.07);border-color:rgba(61,61,61,.3);color:#6B6B6B}
.ea-leyenda{display:flex;gap:16px;flex-wrap:wrap;margin-top:6px;font-size:11.5px;color:var(--gris)}
.ea-leyenda span{display:flex;align-items:center;gap:6px}
.ea-lineaL{display:inline-block;width:20px;height:0;border-top:2px solid #3D3D3D}
.ea-lineaD{display:inline-block;width:20px;height:0;border-top:2px dashed var(--cobre)}
.ea-marcador{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:11px;margin-top:13px;
  border-top:1px dashed rgba(61,61,61,.35);padding-top:11px}
.ea-marcaV{font-size:19px;line-height:1.1;margin-top:2px}

/* --- los dos escenarios de la estructura --- */
.ea-escen{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:14px}
.ea-escenC{border:1px solid rgba(61,61,61,.28);padding:11px 13px}
.ea-escenC.bien{border-color:#3D8A49;background:rgba(79,160,92,.1)}
.ea-escenC.mal{border-color:var(--rojo);background:rgba(178,59,39,.08)}
.ea-escenX{font-size:12.5px;color:#6B6B6B;margin-top:4px;line-height:1.45}
.ea-escenV{font-size:27px;line-height:1;margin:7px 0 2px;color:#3D3D3D}

/* --- pantallas de configuración --- */
.ea-opcion{border:1px solid var(--borde);background:var(--papel);padding:14px 16px;margin-bottom:10px;
  cursor:pointer;width:100%;text-align:left;font:inherit;color:var(--tintaPapel);transition:border-color .15s,background .15s}
.ea-opcion:hover{border-color:var(--cobre)}
.ea-opcion.on{border-color:var(--cobre);background:rgba(185,83,42,.09)}
.ea-opcionN{font-size:19px;color:var(--tintaPapel);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.04em;font-weight:700}
.ea-opcionD{font-size:13.5px;color:var(--gris);margin-top:6px;line-height:1.5}
.ea-opcionM{font-size:12px;color:var(--cobre);margin-top:6px}

/* --- cómo vives: el medidor del tren de vida --- */
.ea-vidaCab{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.ea-vidaN{font-size:21px;color:var(--tintaPapel);line-height:1.05}
.ea-vidaD{font-size:12.5px;color:var(--gris);margin-top:5px;line-height:1.5}
.ea-vidaCifra{font-size:30px;color:var(--cobre);line-height:1;flex-shrink:0}
.ea-medidor{position:relative;height:8px;background:#041F0E;margin-top:12px;overflow:hidden}
.ea-medidorF{height:100%;background:var(--cobre);transition:width .5s ease}
.ea-medidorT{position:absolute;top:0;bottom:0;width:1px;background:rgba(237,237,232,.35)}
.ea-medidorE{display:flex;justify-content:space-between;gap:4px;margin-top:5px;font-size:9.5px;
  letter-spacing:.06em;color:var(--gris);text-transform:uppercase;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-medidorE span.on{color:var(--cobre)}

/* --- etiquetas de consecuencia en cada compra --- */
.ea-etqs{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}
.ea-etq{font-size:10.5px;letter-spacing:.06em;padding:2px 7px;border:1px solid var(--borde);
  color:var(--gris);white-space:nowrap}
.ea-etq.vida{border-color:var(--cobre);color:var(--cobre)}
.ea-etq.act{border-color:#3D8A49;color:var(--verde)}
.ea-etq.con{border-color:#7A392E;color:#C4756A}
.ea-etq.cost{border-color:#6B6B6B;color:#A99C86}

/* --- el camino del año --- */
.ea-curvaWrap{position:relative;margin:12px 0 4px;touch-action:pan-y}
/* sin overflow visible: era lo que dejaba salir las cifras del eje
   fuera del lienzo por la izquierda */
.ea-curva{width:100%;height:auto;display:block}
.ea-cHitoT{stroke:rgba(61,61,61,.30);stroke-width:1;stroke-dasharray:2 2}
.ea-cHitoN{font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-size:9px;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;fill:var(--gris)}
.ea-hitosL{display:flex;flex-direction:column;gap:3px;margin-top:9px;
  border-top:1px dotted rgba(61,61,61,.3);padding-top:8px}
.ea-hitoF{display:flex;align-items:baseline;gap:7px;font-size:12px;color:#6B6B6B}
.ea-hitoD{width:7px;height:7px;flex-shrink:0;transform:rotate(45deg);align-self:center}
.ea-hitoM{font-size:10.5px;color:var(--gris);text-transform:uppercase;letter-spacing:.08em;
  flex-shrink:0;width:24px}
.ea-hitoT{flex:1;line-height:1.35}
.ea-hitoC{font-size:11.5px;flex-shrink:0;font-variant-numeric:tabular-nums}
.ea-cRejilla{stroke:rgba(61,61,61,.10);stroke-width:1}
.ea-cPartida{stroke:rgba(61,61,61,.45);stroke-width:1;stroke-dasharray:3 3}
.ea-cCaida{fill:rgba(160,53,36,.09)}
.ea-cCruz{stroke:rgba(61,61,61,.35);stroke-width:1}
/* Los ejes viven fuera del SVG, así que su tamaño no depende de cuánto
   se escale el gráfico: se leen igual en un móvil y en un monitor. */
.ea-ejeY{position:absolute;left:0;text-align:right;transform:translateY(-50%);
  font-size:10.5px;color:var(--gris);font-variant-numeric:tabular-nums;
  pointer-events:none;padding-right:6px;line-height:1;white-space:nowrap}
.ea-ejeX{position:absolute;bottom:0;font-size:10px;color:var(--gris);letter-spacing:.06em;
  pointer-events:none;line-height:1;white-space:nowrap;text-transform:uppercase}
.ea-ejeX.ea-der{text-align:right}
.ea-curvaTip{position:absolute;top:-2px;transform:translateX(-50%);pointer-events:none;
  background:#3D3D3D;color:#F7F7F5;font-size:11.5px;padding:4px 8px;white-space:nowrap;
  font-variant-numeric:tabular-nums;display:flex;gap:7px;align-items:baseline;z-index:2}
.ea-curvaTipM{color:#A9C2B0;font-size:10px;letter-spacing:.1em;text-transform:uppercase}
.ea-curvaTipD{font-size:11px}
.ea-curvaPie{font-size:12.5px;color:#6B6B6B;line-height:1.5;margin-top:2px}

/* --- las dos constantes vitales, siempre a la vista --- */
.ea-signos{font-size:11.5px;margin-top:3px;display:flex;gap:12px;justify-content:flex-end;color:var(--tenue)}
.ea-signos .ojo{color:var(--cobre)}
.ea-signos .mal{color:var(--rojo)}

/* --- las señales de un negocio --- */
.ea-dealS{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0 6px}
.ea-sen{display:flex;flex-direction:column;gap:1px;border:1px solid var(--borde);padding:3px 8px;min-width:66px}
.ea-sen.bien{border-color:#3D8A49}
.ea-sen.mal{border-color:#7A392E}
.ea-senK{font-size:9px;letter-spacing:.1em;color:var(--tenue);text-transform:uppercase;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-senV{font-size:12.5px;color:var(--tintaPapel)}
.ea-sen.bien .ea-senV{color:var(--verde)}
.ea-sen.mal .ea-senV{color:#C4756A}
.ea-deal{border:1px solid rgba(61,61,61,.28);padding:11px 13px;margin-bottom:9px;background:rgba(61,61,61,.03)}
.ea-deal.sel{border-color:var(--cobre);background:rgba(185,83,42,.09)}
.ea-deal.gana{border-color:#3D8A49;background:rgba(79,160,92,.11)}
.ea-deal .ea-sen{border-color:rgba(61,61,61,.25)}
.ea-deal .ea-senK{color:var(--gris)}
.ea-deal .ea-senV{color:#3D3D3D}
.ea-deal .ea-sen.bien{border-color:#3D8A49}
.ea-deal .ea-sen.bien .ea-senV{color:#2E7A3D}
.ea-deal .ea-sen.mal{border-color:var(--rojo)}
.ea-deal .ea-sen.mal .ea-senV{color:#8A2E1E}
.ea-dealR{font-size:12px;color:var(--gris);margin-top:6px;letter-spacing:.04em}

/* --- el inventario del balance final --- */
.ea-invCab,.ea-invF,.ea-invT{display:grid;grid-template-columns:1fr auto auto auto;gap:12px;align-items:baseline}
.ea-invCab{font-size:10px;letter-spacing:.14em;color:var(--gris);padding-bottom:6px;
  border-bottom:1px solid var(--borde);margin-bottom:4px}
.ea-invF{font-size:13px;padding:6px 0;border-bottom:1px dotted var(--borde);color:var(--tintaPapel)}
.ea-invN{line-height:1.35}
.ea-invP{display:block;font-size:10.5px;color:var(--gris);text-align:right}
.ea-invT{font-size:13px;padding-top:9px;margin-top:4px;border-top:1px solid var(--borde);color:var(--tintaPapel)}
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
.ea-avisoB p{margin:0;font-size:14.5px;color:var(--tintaPapel);line-height:1.6;max-width:62ch}
.ea-avisoB strong{color:#262626}

/* --- botones secundarios sobre papel ---
   .ea-mini nació para el panel oscuro: texto hueso #EDEDE8 sobre
   fieltro da 9,6:1. Dentro del memorando el fondo es papel y ese mismo
   color cae a 1,29:1, o sea invisible. Se corrige por contexto y no
   botón por botón, para que ningún minijuego futuro herede el problema. */
.ea-memo .ea-mini{border-color:rgba(61,61,61,.42);color:var(--tintaPapel)}
.ea-memo .ea-mini:hover:not(:disabled){border-color:var(--cobre);color:#262626;background:rgba(185,83,42,.13)}
.ea-memo .ea-mini:disabled{opacity:.45}

/* el de "explícame" es una invitación, no un control secundario:
   se lee a tamaño normal y sin versalitas apretadas */
.ea-explicame{font-size:12.5px;letter-spacing:.06em;text-transform:none;padding:8px 14px}

/* --- el titular: lo único que se lee sin abrir nada --- */
.ea-titular{border-top:2px solid var(--tintaPapel);border-bottom:1px dashed rgba(61,61,61,.35);
  padding:12px 0 13px;margin-top:14px}
.ea-panel .ea-titular,.ea-modal .ea-titular{border-top-color:var(--borde);border-bottom-color:var(--borde)}
.ea-titularK{font-size:10.5px;letter-spacing:.2em;color:var(--gris)}
.ea-titularV{font-size:31px;line-height:1.05;color:#262626;margin:3px 0 6px}
.ea-titularL{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:13px;color:var(--gris)}
.ea-titularA{font-size:15px;color:var(--cobre);margin-top:8px}

/* --- secciones plegables: cerradas enseñan su cifra --- */
.ea-plegs{margin-top:14px;border-top:1px dotted rgba(61,61,61,.32)}
.ea-panel .ea-plegs,.ea-modal .ea-plegs{border-top-color:var(--borde)}
.ea-pleg{border-bottom:1px dotted rgba(61,61,61,.32)}
.ea-panel .ea-pleg,.ea-modal .ea-pleg{border-bottom-color:var(--borde)}
.ea-plegB{display:grid;grid-template-columns:auto 1fr auto;align-items:baseline;gap:10px;width:100%;
  background:transparent;border:none;padding:11px 2px;cursor:pointer;text-align:left;font:inherit}
.ea-plegB:hover .ea-plegT{color:var(--cobre)}
.ea-plegF{font-size:15px;color:var(--gris);line-height:1;width:12px}
.ea-plegT{font-size:12.5px;letter-spacing:.08em;color:#3D3D3D}
.ea-plegR{font-size:13px;color:var(--gris);white-space:nowrap;font-variant-numeric:tabular-nums}
.ea-plegC{padding:2px 0 15px;animation:ea-abre .16s ease-out}

/* --- los avisos de la guía --- */
.ea-guia{border:1px solid var(--cobre);background:rgba(185,83,42,.09);padding:12px 15px;margin-top:16px;
  display:grid;grid-template-columns:1fr auto;gap:4px 14px;align-items:center;animation:ea-abre .2s ease-out}
.ea-guiaK{grid-column:1;font-size:10px;letter-spacing:.22em;color:var(--cobre)}
.ea-guiaT{grid-column:1;font-size:16px;color:#262626;line-height:1.15}
.ea-guiaX{grid-column:1;font-size:13.5px;color:var(--tintaPapel);line-height:1.5;max-width:70ch}
.ea-guiaB{grid-column:2;grid-row:1 / span 3;align-self:center;background:var(--cobre);border:none;color:#20120A;
  font:inherit;font-size:11px;letter-spacing:.14em;padding:9px 15px;cursor:pointer;text-transform:uppercase;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700;white-space:nowrap}
.ea-guiaB:hover{background:var(--papel)}
@media(max-width:560px){
  .ea-guia{grid-template-columns:1fr}
  .ea-guiaB{grid-column:1;grid-row:auto;justify-self:start;margin-top:8px}
}

/* --- el tablero, que ya no estorba --- */
.ea-grid.solo{grid-template-columns:1fr}

/* Las secciones dejan de robarle la mitad de la pantalla a la decision:
   se abren encima, y al cerrarlas el jugador vuelve exactamente a donde
   estaba. La decision es lo principal y ahora se ve asi. */
.ea-modalFondo{position:fixed;inset:0;background:rgba(5,13,16,.84);z-index:60;
  display:flex;align-items:flex-start;justify-content:center;padding:22px 14px;overflow-y:auto}
.ea-modal{background:var(--papel);border:1px solid var(--borde);width:100%;max-width:580px;
  border-radius:4px;overflow:hidden;
  box-shadow:0 20px 64px rgba(0,51,24,.45)}
.ea-modalCab{display:flex;justify-content:space-between;align-items:center;gap:12px;
  padding:12px 15px;border-bottom:1px solid var(--borde);position:sticky;top:0;
  background:var(--papel);z-index:2}
.ea-modalT{font-size:12px;letter-spacing:.2em;color:var(--cobre)}
.ea-modalX{background:transparent;border:1px solid var(--borde);color:var(--gris);
  width:31px;height:31px;cursor:pointer;font:inherit;font-size:14px;line-height:1;flex-shrink:0}
.ea-modalX:hover:not(:disabled){border-color:var(--cobre);color:var(--cobre)}
.ea-modalX:disabled{opacity:.35;cursor:default}
.ea-modalCuerpo{padding:14px 15px 18px}

/* la ficha que explica un sistema recien abierto */
.ea-nuevoK{font-size:10.5px;letter-spacing:.22em;color:var(--cobre);margin-bottom:7px}
.ea-nuevoT{font-size:27px;line-height:1.08;color:#262626;margin-bottom:9px}
.ea-nuevoX{font-size:14px;line-height:1.6;color:var(--tintaPapel);margin-bottom:14px}
.ea-nuevoP{list-style:none;padding:0;margin:0 0 4px}
.ea-nuevoP li{position:relative;padding-left:19px;margin-bottom:10px;font-size:13px;
  line-height:1.55;color:var(--gris)}
.ea-nuevoP li:before{content:"";position:absolute;left:0;top:7px;width:8px;height:8px;
  background:var(--cobre)}

/* --- el registro compartido de carreras cerradas --- */
.ea-regCab{display:grid;grid-template-columns:24px 1fr auto auto;gap:10px;
  padding:0 0 7px;border-bottom:1px solid var(--borde);
  font-size:10px;letter-spacing:.14em;color:var(--gris)}
.ea-regFila{display:grid;grid-template-columns:24px 1fr auto auto;gap:10px;align-items:baseline;
  padding:9px 0;border-bottom:1px dotted var(--borde);font-size:13.5px}
.ea-regFila:last-child{border-bottom:none}
.ea-regP{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--gris);
  font-variant-numeric:tabular-nums}
.ea-regFila.podio .ea-regP{color:var(--cobre)}
.ea-regN{color:var(--tintaPapel);line-height:1.3}
.ea-regC{display:block;font-size:11.5px;color:var(--gris)}
.ea-regV{font-family:'IBM Plex Mono',monospace;color:var(--tintaPapel);text-align:right;
  white-space:nowrap;font-variant-numeric:tabular-nums}
.ea-regM{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--cobre);
  text-align:right;white-space:nowrap;min-width:3ch}
.ea-regFila.tuya{background:rgba(185,83,42,.11);border-left:2px solid var(--cobre);
  padding-left:8px;margin-left:-10px}
.ea-regVacio{padding:22px 0;color:var(--gris);font-size:13.5px}
.ea-regNombre{width:100%;background:var(--papel2);border:1px solid var(--borde);color:var(--tintaPapel);
  font-family:'IBM Plex Mono',monospace;font-size:14px;padding:9px 11px;border-radius:0;margin-top:6px}

.ea-panelAb{animation:ea-abre .18s ease-out}
@keyframes ea-abre{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.ea-cerrar{display:block;width:100%;background:transparent;border:1px solid var(--borde);
  color:var(--gris);font:inherit;font-size:10.5px;letter-spacing:.14em;padding:7px;margin-bottom:14px;
  cursor:pointer;text-transform:uppercase;font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-cerrar:hover{border-color:var(--cobre);color:var(--cobre)}
.ea-tabs{margin-top:16px}

/* --- quién eres --- */
.ea-campoK{font-size:11px;letter-spacing:.2em;color:var(--gris);display:block;margin-bottom:7px}
.ea-campo{width:100%;max-width:420px;background:var(--papel2);border:1px solid var(--borde);
  color:var(--tintaPapel);font-size:19px;padding:11px 13px;letter-spacing:.04em}
.ea-campo::placeholder{color:var(--gris);opacity:.7;letter-spacing:.02em}
.ea-campo:focus{outline:2px solid var(--cobre);outline-offset:2px;border-color:var(--cobre)}
.ea-generos{display:flex;gap:8px;flex-wrap:wrap}
.ea-generos .ea-mini.on{border-color:var(--cobre);color:var(--tintaPapel);background:rgba(185,83,42,.15)}

/* --- volver atrás en la configuración --- */
/* display:block porque es un <button>, o sea inline: sin esto el boton
   que venga detras se le pega al lado en la misma linea. */
.ea-atras{display:block;background:transparent;border:none;color:var(--gris);font:inherit;font-size:11.5px;
  letter-spacing:.14em;padding:6px 0;margin-bottom:10px;cursor:pointer;text-transform:uppercase;
  text-align:left;font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:700}
.ea-atras:hover{color:var(--cobre)}
.ea-rastro{font-size:12px;color:var(--cobre);margin:6px 0 14px;letter-spacing:.04em}

/* --- glosario del modo aprendiz --- */
.ea-glos{background:rgba(62,107,60,.1);border-left:3px solid #3D8A49;padding:10px 13px;margin-top:12px}
.ea-glosK{font-size:10.5px;letter-spacing:.2em;color:var(--gris);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-glosT{font-size:14.5px;color:#3D3D3D;margin-top:3px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;letter-spacing:.02em}
.ea-glosX{font-size:13.5px;color:#3D3D3D;margin-top:4px;line-height:1.5}

/* --- banderas rojas con explicación --- */
.ea-docK{font-size:10.5px;letter-spacing:.18em;color:var(--gris);
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-checkX{display:block;font-size:12.5px;line-height:1.5;color:#6B6B6B;margin-top:6px;
  border-top:1px dotted rgba(61,61,61,.3);padding-top:6px}
.ea-checkR{display:block;font-size:10.5px;letter-spacing:.14em;color:var(--gris);margin-bottom:3px}
.ea-checkR.roja{color:#8A2E1E}

/* --- la ficha de familia --- */
.ea-fam{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.ea-famC{border:1px solid var(--borde);padding:4px 9px;font-size:11.5px;color:var(--gris)}
`;
