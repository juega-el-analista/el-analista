export const CSS2 = `
.ea-graf{width:100%;height:150px;border:1px solid rgba(61,61,61,.25);background:rgba(61,61,61,.05);display:block}
.ea-grafL{fill:none;stroke:var(--tintaPapel);stroke-width:2}
.ea-grafD{fill:none;stroke:var(--cobre);stroke-width:2}
.ea-marca{display:inline-block;padding:3px 10px;border:1px solid rgba(61,61,61,.3);font-size:11.5px;letter-spacing:.12em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-marca.dentro{border-color:#3D8A49;color:#3D8A49}
.ea-marca.fuera{border-color:var(--gris);color:var(--gris)}

.ea-est{margin:12px 0}
.ea-estCaso{font-size:16px;line-height:1.45;color:#3D3D3D;margin:4px 0 2px}
.ea-estMeta{font-size:12.5px;margin-top:8px;font-weight:600;color:#3D3D3D}
.ea-escenC.bien .ea-estMeta{color:#2F7A3D}
.ea-escenC.mal .ea-estMeta{color:var(--rojo)}
.ea-estL{display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px}
.ea-alerta{font-size:13px;padding:8px 11px;border-left:3px solid var(--cobre);background:rgba(185,83,42,.1);margin-top:11px;color:#3D3D3D}
.ea-alerta.mal{border-color:var(--rojo);background:rgba(178,59,39,.12)}
.ea-alerta.bien{border-color:#3D8A49;background:rgba(62,107,60,.12)}

.ea-check{border:1px solid rgba(61,61,61,.28);padding:10px 12px;font-size:14px;cursor:pointer;background:transparent;
  color:var(--tintaPapel);text-align:left;width:100%;font:inherit;display:flex;gap:10px;align-items:flex-start}
.ea-check:hover:not(:disabled){border-color:var(--cobre)}
.ea-check.sel{background:rgba(185,83,42,.16);border-color:var(--cobre)}
.ea-check.bien{background:rgba(62,107,60,.16);border-color:#3D8A49}
.ea-check.mal{background:rgba(178,59,39,.16);border-color:var(--rojo)}
.ea-checkB{font-size:11px;letter-spacing:.14em;color:var(--gris);flex-shrink:0;margin-top:2px}

.ea-fondoC{border:1px solid var(--borde);padding:11px 12px;margin-bottom:10px}
.ea-fondoT{display:flex;justify-content:space-between;gap:8px;font-size:13px;margin-bottom:3px}
.ea-fondoN{font-size:13px;color:var(--tintaPapel);font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;letter-spacing:.05em;font-weight:700}
.ea-badge{font-size:10.5px;letter-spacing:.14em;color:var(--cobre);border:1px solid var(--cobre);padding:2px 7px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
`;
