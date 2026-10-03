export const CSS4 = `
/* reparto entre cartera y efectivo */
/* El boton que confirma un cambio de cartera no puede parecerse a los
   demas: es el unico que mueve dinero de verdad. */
.ea-aplicar{background:var(--cobre);color:#20120A;border:2px solid var(--cobre);padding:13px 22px;
  font:inherit;font-size:14px;letter-spacing:.14em;cursor:pointer;flex:1;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-aplicar:hover{background:#C86A3E;border-color:#C86A3E}
.ea-descartar{background:transparent;color:var(--gris);border:1px solid var(--borde);padding:13px 16px;
  font:inherit;font-size:12px;letter-spacing:.12em;cursor:pointer;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-descartar:hover{border-color:var(--cobre);color:var(--cobre)}
/* Una legendaria tiene que verse distinta antes de leerla. */
.ea-memoHead.legend{background:linear-gradient(90deg,rgba(185,83,42,.22),transparent);
  border-color:var(--cobre);color:var(--cobre)}

.ea-pend{border:1px solid var(--cobre);border-left-width:4px;background:rgba(185,83,42,.13);
  padding:10px 13px;font-size:12.5px;color:var(--tintaPapel);margin-bottom:12px}
.ea-pendK{font-size:10px;letter-spacing:.18em;color:var(--cobre);margin-bottom:4px}

.ea-mix{display:flex;height:23px;border:1px solid var(--borde);overflow:hidden;margin:4px 0 2px}
.ea-mixSeg{display:flex;align-items:center;justify-content:center;font-size:10.5px;letter-spacing:.1em;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;
  overflow:hidden;white-space:nowrap;transition:width .25s ease}
.ea-mixSeg.cart{background:var(--cobre);color:#20120A}
.ea-mixSeg.efe{background:#041F0E;color:var(--tenue)}

.ea-wrow{margin:11px 0}
.ea-wtop{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;align-items:baseline}
.ea-wname{color:var(--tintaPapel);font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;
  letter-spacing:.05em;font-weight:700;font-size:12.5px}
.ea-wnum{color:var(--cobre)}
.ea-wsub{font-size:11px;color:var(--gris);margin-top:1px;line-height:1.35}
.ea-caja{border:1px solid var(--borde);padding:8px 11px;margin-top:14px}
.ea-preset{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 10px}
.ea-mini.on{border-color:var(--cobre);color:var(--tintaPapel);background:rgba(185,83,42,.15)}
.ea-avis{font-size:11.5px;color:#D08677;border-left:2px solid var(--rojo);padding-left:9px;margin-top:9px;line-height:1.45}
.ea-ok2{font-size:11.5px;color:#8FBA8B;border-left:2px solid var(--verde);padding-left:9px;margin-top:9px;line-height:1.45}

/* informe de cierre, sobre papel */
.ea-flujo{display:flex;flex-direction:column;gap:6px;margin-top:6px}
.ea-flin{display:flex;justify-content:space-between;gap:10px;align-items:baseline;font-size:12.5px;color:#6B6B6B}
.ea-flbar{height:8px;background:rgba(61,61,61,.1);margin-top:3px;overflow:hidden}
.ea-flfill{height:100%;background:#3D8A49;transition:width .4s ease}
.ea-flfill.neg{background:var(--rojo)}
.ea-spark{width:100%;height:auto;display:block;margin:10px 0 4px}
.ea-sparkL{fill:none;stroke:var(--cobre);stroke-width:2}
.ea-sparkA{fill:rgba(185,83,42,.16);stroke:none}
.ea-hitos{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.ea-hito{font-size:10.5px;letter-spacing:.1em;border:1px solid #3D8A49;color:#2E7A3D;padding:3px 9px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}
.ea-lec{border:1px solid rgba(61,61,61,.22);border-left:3px solid var(--cobre);padding:11px 13px;margin-top:14px;
  background:rgba(185,83,42,.07)}
.ea-lecK{font-size:10.5px;letter-spacing:.18em;color:var(--gris);font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;font-weight:700}
.ea-lecT{font-size:16px;color:#3D3D3D;margin:3px 0 5px;font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  text-transform:uppercase;letter-spacing:.04em;font-weight:700}
.ea-lecX{font-size:13.5px;color:#6B6B6B;line-height:1.5}
.ea-ind{height:12px;background:rgba(61,61,61,.12);margin-top:6px;position:relative}
.ea-indF{height:100%;background:var(--cobre);transition:width .5s ease}
.ea-indM{position:absolute;top:-3px;bottom:-3px;width:1px;background:#3D3D3D}
.ea-tabla{display:grid;grid-template-columns:1fr auto;gap:2px 12px}
.ea-td{font-size:12.5px;color:#6B6B6B;line-height:1.45}
.ea-tdn{font-size:12.5px;color:#3D3D3D;text-align:right}

/* instrucciones antes de jugar */
.ea-pasos{margin:6px 0 0;padding:0;list-style:none}
.ea-paso{display:flex;gap:10px;font-size:13.5px;color:#6B6B6B;padding:4px 0;line-height:1.45}
.ea-pasoN{font-size:11px;color:var(--cobre);flex-shrink:0;margin-top:3px;font-family:'IBM Plex Mono',ui-monospace,monospace}
.ea-jnombre{font-size:26px;line-height:1.05;color:var(--tintaPapel);margin-bottom:9px}
.ea-jnombre span{display:block;font-size:10.5px;letter-spacing:.2em;color:var(--gris);margin-bottom:5px}
.ea-jmeta{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0}
.ea-jtag{font-size:10.5px;letter-spacing:.12em;border:1px solid rgba(61,61,61,.3);color:var(--gris);padding:3px 8px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700}

/* partida guardada */
.ea-guarda{border:1px solid var(--borde);border-left:3px solid var(--cobre);background:rgba(185,83,42,.08);
  padding:13px 16px;margin-top:4px}

/* La puerta de entrada. Es el unico boton de la portada que tiene que
   verse desde la otra punta de la habitacion: todo lo demas es opcional. */
.ea-jugarYa{background:var(--cobre);color:#20120A;border:2px solid var(--cobre);
  padding:17px 38px;font:inherit;font-size:19px;letter-spacing:.14em;cursor:pointer;border-radius:2px;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;text-transform:uppercase;font-weight:700;
  transition:background .15s,transform .12s}
.ea-jugarYa:hover{background:#C86A3E;border-color:#C86A3E}
.ea-jugarYa:active{transform:translateY(1px)}

/* los cinco perfiles de cartera, como tarjetas que se pueden comparar de
   un vistazo en vez de cinco botones sin cifras */
.ea-perfiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(215px,1fr));gap:8px;margin-top:4px}
.ea-perfil{text-align:left;background:transparent;border:1px solid var(--borde);color:var(--tintaPapel);
  font:inherit;padding:11px 13px;cursor:pointer;border-radius:2px;
  transition:border-color .15s,background .15s}
.ea-perfil:hover{border-color:var(--cobre)}
.ea-perfil.on{border-color:var(--cobre);background:rgba(185,83,42,.1)}
.ea-perfilT{font-size:14px;letter-spacing:.05em;color:var(--tintaPapel)}
.ea-perfilD{font-size:12px;color:var(--gris);margin-top:4px;line-height:1.45}
.ea-perfilN{font-size:11.5px;color:var(--cobre);margin-top:6px}

/* ============================================================
   QUE SE SIENTA VIVO
   El juego se veia bien y no se movia: todo aparecia de golpe y ya. Lo
   que sigue no cambia ninguna regla, solo hace que las cosas entren, se
   asienten y respondan al dedo.
   ============================================================ */

/* Las opciones entran una detras de otra, no las tres a la vez. El
   escalonado lo pone el JSX con animationDelay. */
/* el escalonado sale de --i, que pone el JSX: asi el marco de las
   decisiones que pesan puede retrasarlas todas sin pelearse con un
   animationDelay en linea, que ganaria siempre */
.ea-op{animation:ea-sube .32s cubic-bezier(.2,.8,.3,1) backwards;
  animation-delay:calc(var(--i,0) * 70ms)}
@keyframes ea-sube{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}
.ea-op:active:not(:disabled){transform:translateX(3px) scale(.995)}

/* Los chips del resultado dan un saltito al entrar: es el momento en que
   el juego te dice que ganaste o perdiste algo. */
.ea-chip{animation:ea-pop .34s cubic-bezier(.2,1.5,.4,1) backwards}
@keyframes ea-pop{0%{opacity:0;transform:scale(.72)}60%{transform:scale(1.06)}100%{opacity:1;transform:scale(1)}}

/* El sello cae con peso en vez de aparecer. */
@keyframes ea-stamp{
  0%{transform:rotate(-11deg) scale(2.1);opacity:0}
  55%{transform:rotate(-11deg) scale(.92);opacity:.95}
  75%{transform:rotate(-11deg) scale(1.04)}
  100%{transform:rotate(-11deg) scale(1);opacity:.85}
}
.ea-sello{animation:ea-stamp .42s cubic-bezier(.2,.9,.3,1)}

/* El año como puntos: llenos los que quedan, apagados los ya jugados. */
.ea-puntos{display:inline-flex;gap:5px;align-items:center}
.ea-punto{width:7px;height:7px;border-radius:50%;background:var(--cobre);
  transition:background .3s ease,transform .3s ease}
.ea-punto.ido{background:rgba(159,184,168,.34);transform:scale(.75)}

/* El aviso de la cinta entra y se queda, sin parpadeo brusco. */
.ea-avisoFlash{color:var(--verde);animation:ea-flash .5s ease-out}
@keyframes ea-flash{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}

/* Botones con algo de peso al pulsarlos. */
.ea-btn,.ea-btnO,.ea-mini,.ea-comprar,.ea-aplicar,.ea-jugarYa{transition:background .15s,border-color .15s,color .15s,transform .1s}
.ea-mini:active:not(:disabled),.ea-btnO:active,.ea-aplicar:active{transform:translateY(1px)}
.ea-opcion{animation:ea-sube .3s cubic-bezier(.2,.8,.3,1) backwards}
.ea-opcion:active{transform:translateY(1px)}
.ea-perfil:active{transform:translateY(1px)}

/* La placa de arriba reacciona cuando el patrimonio se mueve. */
.ea-plata{transition:color .35s ease}

/* ============================================================
   QUE CADA ESCENA SE VEA DISTINTA
   El mismo memorando gris servia para un martes en la oficina, para que
   se case tu hermano y para la decision que parte la carrera en dos.
   Ahora cada clase trae su sello, su color y su borde.
   ============================================================ */
.ea-selloClase{position:absolute;top:44px;right:22px;opacity:.9;
  animation:ea-sellar .5s cubic-bezier(.2,1.5,.4,1) backwards;animation-delay:.14s}
@keyframes ea-sellar{
  0%{opacity:0;transform:rotate(-26deg) scale(.4)}
  55%{opacity:.95;transform:rotate(6deg) scale(1.14)}
  100%{opacity:.9;transform:rotate(0) scale(1)}
}
/* el borde izquierdo dice de que va antes de leer una palabra */
.ea-memo{border-left:4px solid transparent;transition:border-color .3s ease}
.ea-memo-documento{border-left-color:rgba(61,61,61,.16)}
.ea-memo-corazon{border-left-color:rgba(185,83,42,.75)}
.ea-memo-corona{border-left-color:var(--cobre);
  box-shadow:0 18px 40px rgba(0,51,24,.28), 0 2px 0 var(--papel2), inset 0 0 0 1px rgba(185,83,42,.22)}
.ea-memo-bifurca{border-left-color:var(--cobre)}
.ea-memo-sello{border-left-color:var(--tintaPapel)}
/* el titulo deja sitio al sello para no chocar con el */
.ea-memo .ea-memoTit{padding-right:52px}

/* Un fondo que no es un folio en blanco: dos manchas muy suaves que dan
   profundidad sin ensuciar nada de lo que hay encima. */
.ea-root{background-image:
  radial-gradient(60vw 40vw at 88% -8%, rgba(31,107,62,.055), transparent 60%),
  radial-gradient(52vw 36vw at 2% 104%, rgba(185,83,42,.05), transparent 62%)}

/* La cifra del patrimonio da un latido cuando se mueve, para que el
   cambio se note aunque no estuvieras mirando ese rincon. */
@keyframes ea-latido{
  0%{transform:scale(1)} 38%{transform:scale(1.055)} 100%{transform:scale(1)}
}
.ea-plata.late{animation:ea-latido .5s cubic-bezier(.2,.9,.3,1)}
.ea-plata{display:inline-block;transform-origin:right center}

/* la pestaña activa se subraya deslizando, no parpadeando */
.ea-tab{position:relative}
.ea-tab:after{content:"";position:absolute;left:12%;right:12%;bottom:-2px;height:2px;
  background:var(--cobre);transform:scaleX(0);transform-origin:center;
  transition:transform .26s cubic-bezier(.2,.8,.3,1)}
.ea-tab.on:after{transform:scaleX(1)}
.ea-tab.on{border-bottom-color:transparent}

/* ---- las rondas del juego de memoria: 3 · 4 · 6 ---- */
.ea-memRondas{display:flex;gap:7px;margin:0 0 12px}
.ea-memRonda{min-width:32px;height:26px;padding:0 9px;border-radius:13px;
  display:inline-flex;align-items:center;justify-content:center;
  font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12.5px;font-weight:600;
  border:1px solid rgba(61,61,61,.25);color:var(--gris);background:transparent;
  transition:all .3s cubic-bezier(.2,.8,.3,1)}
.ea-memRonda.ahora{border-color:var(--cobre);color:var(--tintaPapel);
  background:rgba(185,83,42,.12);transform:scale(1.08)}
.ea-memRonda.hecha{border-color:#3D8A49;color:#2E7A3D;background:rgba(79,160,92,.14)}
.ea-celdaC{transition:background .12s,transform .1s,border-color .12s,box-shadow .12s}

/* ---- la fila de stats ---- */
.ea-stats{flex-basis:100%;display:flex;flex-direction:column;gap:12px;
  border-top:1px solid rgba(159,184,168,.16);padding-top:12px;margin-top:2px}

/* la barra de experiencia hacia el siguiente cargo */
.ea-xpTop{display:flex;justify-content:space-between;align-items:center;gap:10px;
  font-size:10.5px;letter-spacing:.16em;color:var(--papel);margin-bottom:5px}
.ea-xpTop span{display:inline-flex;align-items:center;gap:6px}
.ea-xpSig{color:var(--tenue)}
.ea-xpBar{height:7px;background:#041F0E;border-radius:4px;overflow:hidden;
  box-shadow:inset 0 1px 2px rgba(0,0,0,.4)}
.ea-xpFill{height:100%;border-radius:4px;
  background:linear-gradient(90deg,#8A6A28,#F2B441);
  box-shadow:0 0 10px rgba(242,180,65,.45);
  transition:width .8s cubic-bezier(.2,.8,.3,1)}

/* los cinco anillos */
.ea-anillos{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
.ea-anillo{display:flex;flex-direction:column;align-items:center;gap:1px;position:relative}
.ea-anilloDisco{position:relative;width:40px;height:40px}
.ea-anilloDisco svg{display:block;overflow:visible}
.ea-anilloFondo{fill:rgba(4,31,14,.7);stroke:rgba(159,184,168,.14);stroke-width:3.4}
.ea-anilloArco{fill:none;stroke-width:3.4;stroke-linecap:round;
  transition:stroke-dashoffset .8s cubic-bezier(.2,.8,.3,1), stroke .3s ease;
  filter:drop-shadow(0 0 3px currentColor)}
.ea-anilloIco{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.ea-anilloN{font-size:13px;font-weight:600;line-height:1.1;margin-top:3px}
.ea-anilloK{font-size:8.5px;letter-spacing:.12em;color:var(--tenue);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.ea-anillo.bajo .ea-anilloDisco{animation:ea-avisoAnillo 1.6s ease-in-out infinite}
@keyframes ea-avisoAnillo{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}

/* el +3 que sube y se desvanece encima del anillo */
.ea-anilloD{position:absolute;left:50%;top:-4px;transform:translateX(-50%);
  font-size:12.5px;font-weight:700;pointer-events:none;white-space:nowrap;
  text-shadow:0 1px 3px rgba(0,0,0,.6);
  animation:ea-delta 1.2s cubic-bezier(.2,.8,.3,1) forwards}
.ea-anilloD.sube{color:#9FE6A9}
.ea-anilloD.baja{color:#F4A596}
@keyframes ea-delta{
  0%{opacity:0;transform:translate(-50%,6px) scale(.7)}
  18%{opacity:1;transform:translate(-50%,-4px) scale(1.18)}
  100%{opacity:0;transform:translate(-50%,-26px) scale(1)}
}

@media(max-width:420px){
  .ea-anilloDisco{width:36px;height:36px}
  .ea-anilloDisco svg{width:36px;height:36px}
  .ea-anilloK{font-size:7.5px;letter-spacing:.06em}
}

/* ============================================================
   LA DECISION QUE PESA, A PANTALLA COMPLETA
   Fondo de fieltro con un halo del color de su clase detras, el sello
   grande que cae, el titulo en grande y las opciones entrando de una en
   una cuando el titulo ya se asento. Todo con la misma escena de dentro.
   ============================================================ */
/* Dos fondos a proposito: si el navegador no entiende color-mix()
   descarta la declaracion ENTERA, y sin la primera linea el marco
   quedaria transparente sobre el juego. */
.ea-escenaPlena{position:fixed;inset:0;z-index:72;overflow-y:auto;
  background:var(--fieltro);
  background:
    radial-gradient(60vmax 50vmax at 50% 18%, color-mix(in srgb, var(--tono,#B9532A) 26%, transparent), transparent 62%),
    var(--fieltro);
  display:flex;justify-content:center;align-items:flex-start;
  padding:calc(24px + env(safe-area-inset-top,0px)) 16px calc(28px + env(safe-area-inset-bottom,0px));
  animation:ea-entra .32s ease-out}
.ea-escenaPlenaCaja{width:100%;max-width:600px;margin:auto 0}

.ea-dramaTop{display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:18px}
.ea-dramaIco{color:var(--tono,var(--cobre));
  filter:drop-shadow(0 8px 20px rgba(0,0,0,.45));
  animation:ea-caerSello .62s cubic-bezier(.2,1.35,.35,1) backwards;animation-delay:.08s}
@keyframes ea-caerSello{
  0%{opacity:0;transform:translateY(-40px) rotate(-24deg) scale(1.7)}
  60%{opacity:1;transform:translateY(4px) rotate(5deg) scale(.94)}
  100%{opacity:1;transform:none}
}
.ea-dramaK{font-size:11.5px;letter-spacing:.34em;color:var(--tono,var(--cobre));
  animation:ea-flash .4s ease-out backwards;animation-delay:.42s}

/* el memorando dentro del marco: mas grande, con mas aire y sin el sello
   de la esquina, que ya esta arriba en grande */
.ea-memoDrama{border-left:none;
  box-shadow:0 28px 70px rgba(0,0,0,.5);
  box-shadow:0 28px 70px rgba(0,0,0,.5), 0 0 0 1px color-mix(in srgb, var(--tono,#B9532A) 40%, transparent);
  animation:ea-sube .5s cubic-bezier(.2,.9,.3,1) backwards;animation-delay:.3s}
.ea-memoDrama .ea-selloClase{display:none}
.ea-memoDrama .ea-memoHead{display:none}
.ea-memoDrama .ea-memoTit{font-size:clamp(28px,7.6vw,40px);line-height:1.05;padding-right:0;
  text-align:center;text-wrap:balance;margin-bottom:14px}
.ea-memoDrama .ea-memoTxt{font-size:clamp(16px,4.3vw,18px);text-align:center;
  max-width:44ch;margin:0 auto}
/* las opciones esperan a que el titulo se haya asentado */
.ea-memoDrama .ea-op{padding:15px 16px;font-size:15.5px;animation-delay:calc(.75s + var(--i,0) * 110ms)}
.ea-memoDrama .ea-op:hover:not(:disabled){transform:translateY(-2px);
  box-shadow:0 6px 18px rgba(0,0,0,.14);border-color:var(--tono,var(--cobre))}

/* ---- el anuncio de una decision que pesa ----
   Una legendaria o una bifurcacion salian como una opcion mas dentro del
   mismo memorando de siempre. Estas se llevan la pantalla. */
.ea-anuncioEsc{position:fixed;inset:0;z-index:72;background:var(--fieltro);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:12px;text-align:center;padding:26px;cursor:pointer;
  animation:ea-entra .26s ease-out}
.ea-anuncioEscIco{color:var(--tono,var(--cobre));
  animation:ea-plantar .5s cubic-bezier(.2,1.4,.35,1) backwards;animation-delay:.08s}
.ea-anuncioEscIco svg{filter:drop-shadow(0 6px 16px rgba(0,0,0,.35))}
.ea-anuncioEscK{font-size:11.5px;letter-spacing:.32em;color:var(--cobre);
  animation:ea-flash .4s ease-out backwards;animation-delay:.3s}
.ea-anuncioEscT{font-size:clamp(28px,8.5vw,50px);line-height:1.04;color:var(--papel);
  max-width:17ch;text-wrap:balance;
  animation:ea-sube .46s cubic-bezier(.2,.9,.3,1) backwards;animation-delay:.38s}
.ea-anuncioEscB{font-size:11px;letter-spacing:.24em;color:var(--tenue);margin-top:16px;
  animation:ea-flash .5s ease-out backwards;animation-delay:.95s}

/* ---- la cabecera del dinero ----
   Era «USD 6.375» a secas y debajo «efectivo 9,6 k · cartera 12,1 k» en
   una linea apretada que no decia ni que era ni por que habia dos
   numeros. Ahora lleva rotulo y el reparto se VE. */
.ea-patK{font-size:9.5px;letter-spacing:.26em;color:var(--tenue);margin-bottom:1px}
.ea-reparto{margin-top:7px;min-width:172px}
.ea-repartoBar{display:flex;height:6px;border-radius:3px;overflow:hidden;background:#041F0E}
.ea-repEf{background:var(--tenue);transition:width .5s cubic-bezier(.2,.8,.3,1)}
.ea-repCa{background:var(--cobre);transition:width .5s cubic-bezier(.2,.8,.3,1)}
.ea-repartoL{display:flex;gap:12px;justify-content:flex-end;font-size:10.5px;
  color:var(--tenue);margin-top:5px}
.ea-repartoL span{display:inline-flex;align-items:center;gap:5px}
.ea-punto2{width:6px;height:6px;border-radius:50%;display:inline-block;flex-shrink:0}
.ea-punto2.ef{background:var(--tenue)}
.ea-punto2.ca{background:var(--cobre)}

/* ---- la curva de la portada ---- */
.ea-portadaArte{width:100%;max-width:420px;height:auto;display:block;margin:18px 0 6px;overflow:visible}
.ea-paBase{stroke:var(--borde);stroke-width:1}
.ea-paTick{stroke:var(--borde);stroke-width:1;opacity:.55}
.ea-paCurva{fill:none;stroke:var(--cobre);stroke-width:2.6;stroke-linecap:round;
  stroke-dasharray:420;stroke-dashoffset:420;animation:ea-trazar 1.5s cubic-bezier(.3,.7,.3,1) .25s forwards}
@keyframes ea-trazar{to{stroke-dashoffset:0}}
.ea-paPunto{fill:var(--cobre);opacity:0;animation:ea-brotar .45s cubic-bezier(.2,1.6,.4,1) 1.6s forwards}
@keyframes ea-brotar{0%{opacity:0;r:0}60%{opacity:1;r:8}100%{opacity:1;r:5.5}}

/* ---- iconos ---- */
.ea-ico{display:inline-block;vertical-align:-.16em;flex-shrink:0}
.ea-quien{display:flex;flex-wrap:wrap;gap:3px 13px;align-items:center}
.ea-quien span{display:inline-flex;align-items:center;gap:5px}
.ea-quienRama{color:var(--cobre)}
/* las constantes: icono y cifra, sin la palabra delante */
.ea-signos span{display:inline-flex;align-items:center;gap:4px}
.ea-statN{display:inline-flex;align-items:center;gap:6px}

/* los tres grupos de Comprar */
.ea-grupos{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.ea-grupo{display:inline-flex;align-items:center;gap:6px;background:transparent;
  border:1px solid var(--borde);color:var(--gris);font:inherit;font-size:12px;
  letter-spacing:.1em;text-transform:uppercase;font-weight:700;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  padding:8px 13px;border-radius:20px;cursor:pointer;transition:all .15s}
.ea-grupo:hover{border-color:var(--cobre);color:var(--tintaPapel)}
.ea-grupo.on{border-color:var(--cobre);background:rgba(185,83,42,.12);color:var(--tintaPapel)}
/* cada cosa que compras lleva su simbolo: dice de que familia es antes
   de que llegues a leer el nombre */
.ea-itemConIco{display:inline-flex;align-items:center;gap:9px;color:var(--tintaPapel)}
.ea-itemConIco svg{color:var(--cobre);flex-shrink:0}
.ea-item.tuyo .ea-itemConIco svg{color:var(--verde);opacity:.8}

/* una linea, no un bloque: el termino a mano y la explicacion a un toque */
.ea-recuerda{background:transparent;border:none;color:var(--cobre);font:inherit;
  font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;
  font-family:'Archivo Narrow','Arial Narrow',sans-serif;
  padding:4px 0;margin:0 0 6px;cursor:pointer;text-align:left}
.ea-recuerda:hover{color:#C86A3E}

/* ---- el golpe de dinero de una decision ----
   Lo que se gana o se pierde al decidir tiene que verse desde la otra
   punta de la mesa. Antes era un chip de doce pixeles igual que los
   demas, y es lo unico que el jugador estaba esperando. */
.ea-golpe{display:flex; align-items:baseline; gap:.1em; margin-top:16px;
  font-family:'IBM Plex Mono',ui-monospace,monospace; line-height:1;
  animation:ea-golpeIn .5s cubic-bezier(.2,1.4,.4,1) backwards; animation-delay:.12s}
.ea-golpe.sube{color:#2E7A3D}
.ea-golpe.baja{color:#8A2E1E}
.ea-golpeS{font-size:30px; opacity:.75}
.ea-golpeV{font-size:clamp(34px,10vw,46px); font-weight:600}
.ea-golpeU{font-size:13px; letter-spacing:.14em; opacity:.6; margin-left:.25em}
@keyframes ea-golpeIn{
  0%{opacity:0; transform:translateY(10px) scale(.86)}
  60%{transform:translateY(0) scale(1.04)}
  100%{opacity:1; transform:none}
}

/* ============================================================
   EL MINIJUEGO, A PANTALLA ENTERA
   Antes vivia dentro del memorando, con la ficha y las pestañas
   alrededor: no se notaba que cambiabas de actividad y competia con la
   contabilidad por la atencion. Ahora se lleva la pantalla.
   ============================================================ */

/* uno · el anuncio. Azul, que no es un color del juego: eso es lo que
   hace que se lea como «esto es otra cosa» sin decirlo. */
.ea-anuncioJuego{position:fixed;inset:0;z-index:70;background:#10324F;color:#EAF2F8;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:10px;text-align:center;padding:24px;cursor:pointer;
  animation:ea-entra .22s ease-out}
.ea-anuncioJK{font-size:12.5px;letter-spacing:.34em;color:#7FA8C9}
.ea-anuncioJN{font-size:clamp(34px,11vw,62px);line-height:1.02;max-width:14ch;
  animation:ea-plantar .42s cubic-bezier(.2,1.3,.35,1) backwards;animation-delay:.1s}
@keyframes ea-plantar{from{opacity:0;transform:scale(.82)}to{opacity:1;transform:none}}
.ea-anuncioJT{font-size:12px;letter-spacing:.2em;color:#7FA8C9;
  animation:ea-flash .4s ease-out backwards;animation-delay:.34s}

/* dos · las instrucciones, grandes y sobre fondo oscurecido */
.ea-reglasPleno{position:fixed;inset:0;z-index:70;background:rgba(6,23,13,.93);
  display:flex;align-items:flex-start;justify-content:center;
  padding:22px 16px;overflow-y:auto;animation:ea-entra .25s ease-out}
.ea-reglasCaja{width:100%;max-width:560px;margin:auto;color:var(--hueso);
  animation:ea-sube .32s cubic-bezier(.2,.8,.3,1) backwards;animation-delay:.06s}
.ea-reglasCaja .ea-jnombre{font-size:clamp(28px,8vw,44px);color:var(--papel);margin-bottom:12px}
.ea-reglasCaja .ea-jnombre span{color:var(--cobre);letter-spacing:.24em}
.ea-reglasCaja .ea-jtag{border-color:var(--borde);color:var(--tenue)}
.ea-reglasX{font-size:clamp(16px,4.4vw,19px);line-height:1.55;color:var(--papel);
  margin:14px 0 4px;max-width:46ch}
.ea-pasosG .ea-paso{font-size:clamp(15px,4vw,17px);color:var(--tenue);padding:7px 0;line-height:1.5}
.ea-pasosG .ea-pasoN{font-size:13px;color:var(--cobre)}
.ea-reglasGana{font-size:13.5px;color:var(--tenue);border-left:2px solid var(--cobre);
  padding-left:11px;margin-top:12px;line-height:1.5}
.ea-reglasCaja .ea-atras{color:var(--tenue)}
.ea-reglasCaja .ea-atras:hover{color:var(--cobre)}
.ea-reglasCaja .ea-lecX,.ea-reglasCaja .ea-glosX,.ea-reglasCaja .ea-glosT{color:var(--papel)}
.ea-reglasCaja .ea-lec{background:rgba(185,83,42,.12);border-color:rgba(185,83,42,.4)}
.ea-reglasCaja .ea-glos{background:rgba(62,107,60,.16)}
.ea-btnJugar{width:100%;margin-top:22px;padding:17px 20px;font-size:15px;
  background:var(--cobre);color:#20120A}
.ea-btnJugar:hover:not(:disabled){background:#C86A3E}

/* tres · el juego, sin nada alrededor */
.ea-juegoPleno{position:fixed;inset:0;z-index:70;background:var(--papel);
  overflow-y:auto;padding:20px 16px calc(20px + env(safe-area-inset-bottom,0px));
  animation:ea-entra .2s ease-out;display:flex;flex-direction:column}
/* En el centro de la pantalla, en los dos ejes. Con margin:auto dentro de
   un flex y no con justify-content:center: si el juego es más alto que la
   pantalla, justify-content cortaría la parte de arriba sin poder llegar a
   ella con el scroll; margin:auto se queda en 0 y el scroll sigue normal. */
.ea-juegoPleno .ea-jw{width:100%;max-width:560px;margin:auto;padding-top:env(safe-area-inset-top,0px)}

/* ---- el rodillo del cierre ---- */
.ea-rodillos{display:inline-flex;align-items:center;gap:1px;line-height:1}
.ea-rodillo{display:inline-block;height:1em;overflow:hidden;vertical-align:bottom;
  width:.62em;position:relative}
.ea-rodCol{display:flex;flex-direction:column;transition-property:transform;will-change:transform}
.ea-rodD{height:1em;line-height:1;display:flex;align-items:center;justify-content:center}
/* El punto de los miles se apoya abajo, donde va un punto. Centrado
   entre las ruedas quedaba flotando a media altura. */
.ea-rodSep{display:inline-block;opacity:.5;width:.3em;text-align:center;
  align-self:flex-end;line-height:1}

/* La pantalla del anuncio: el cierre del anio pasa por aqui antes de
   ensenar el informe. Es el unico momento del juego que no pide leer. */
.ea-anuncio{position:fixed;inset:0;z-index:80;background:var(--fieltro);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:24px;text-align:center;animation:ea-entra .3s ease-out;cursor:pointer}
@keyframes ea-entra{from{opacity:0}to{opacity:1}}
.ea-anuncioK{font-size:12px;letter-spacing:.3em;color:var(--tenue);margin-bottom:10px}
.ea-anuncioN{font-size:clamp(38px,12vw,86px);color:var(--papel);line-height:1;
  display:flex;align-items:center;gap:.12em}
.ea-anuncioU{font-size:.42em;color:var(--tenue);letter-spacing:.1em}
.ea-anuncioD{margin-top:20px;font-size:clamp(17px,4.5vw,25px);letter-spacing:.04em;
  animation:ea-pop .4s cubic-bezier(.2,1.5,.4,1) backwards}
.ea-anuncioD.sube{color:#7FD08C}
.ea-anuncioD.baja{color:#E0897B}
.ea-anuncioL{margin-top:8px;font-size:13px;color:var(--tenue);
  animation:ea-flash .4s ease-out backwards}
.ea-anuncioB{margin-top:30px;animation:ea-flash .4s ease-out backwards}

/* Hay gente que marea. Si su sistema lo pide, nada se mueve: el juego
   sigue funcionando igual porque ninguna animacion cambia una regla. */
/* Hay gente que marea, y hay sistemas que piden menos movimiento sin que
   su dueño se acuerde de haberlo pedido: Windows con los efectos de
   animacion apagados le dice a Chrome «reduced-motion», y con una media
   query pura eso apagaba el juego entero sin forma de encenderlo.

   Por eso el freno no es una media query sino una clase que pone el
   propio juego: por defecto sigue al sistema, y el jugador puede
   encender el movimiento desde su Ficha. El retardo hay que matarlo
   igual que la duracion, no solo la duracion: varias cosas entran
   escalonadas con animation-delay y relleno backwards, o sea invisibles
   hasta que les toca, y sin esto el anuncio del año se quedaba DOS
   SEGUNDOS sin boton para salir. */
.ea-quieto *,.ea-quieto *::before,.ea-quieto *::after{
  animation-duration:.001ms !important;
  animation-iteration-count:1 !important;
  transition-duration:.001ms !important;
  animation-delay:0ms !important;
  transition-delay:0ms !important;
}
`;
