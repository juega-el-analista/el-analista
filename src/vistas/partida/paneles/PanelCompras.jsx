import React from "react";
import { ICONO_BIEN, Icono } from "../../../componentes/Iconos.jsx";
import { fmt } from "../../../motor/aritmetica.js";
import { tiene } from "../../../motor/edad-y-metas.js";
import { puedeComprar } from "../../../motor/reglas.js";

/* Pestaña Compras: caprichos, inmuebles y mejoras. */
export function PanelCompras({ ctx }) {
  const { GRUPOS_COMPRA, GRUPO_ACT, comprarBien, comprarPerk, grupo, s, setGrupo } = ctx;
  return (
    <div>
      <div className="ea-grupos">
        {GRUPOS_COMPRA.filter((g) => g.abierto).map((g) => (
          <button key={g.id} className={"ea-grupo" + (grupo === g.id ? " on" : "")}
            onClick={() => setGrupo(g.id)}>
            <Icono k={g.ico} tam={15} />{g.n}
          </button>
        ))}
      </div>
      <div className="ea-itemD" style={{ margin: "4px 0 12px" }}>{GRUPO_ACT.d}</div>

      {GRUPO_ACT.lista.map((c) => {
        const esPerk = GRUPO_ACT.id === "mejoras";
        const ya = esPerk ? tiene(s, c.id) : s.bienes.indexOf(c.id) >= 0;
        const caro = s.cash + s.cartera < c.c;
        const puede = esPerk ? true : puedeComprar(c, s);
        return (
          <div className={"ea-item" + (ya ? " tuyo" : "")} key={c.id}>
            <div className="ea-itemTop">
              <span className="ea-itemN ea-itemConIco">
                <Icono k={ICONO_BIEN[c.id] || "moneda"} tam={19} />{c.n}
              </span>
              <span className="ea-mono" style={{ fontSize: 12.5, flexShrink: 0 }}>{fmt(c.c)}</span>
            </div>
            {!esPerk && (
              <div className="ea-etqs">
                {c.renta ? <span className="ea-etq act">renta {fmt(c.renta * 2)} al año</span> : null}
                {c.ap ? <span className="ea-etq act">aprecia {(c.ap * 200).toFixed(1)}%</span> : null}
                {c.dep ? <span className="ea-etq con">pierde {(c.dep * 200).toFixed(1)}% al año</span> : null}
                {c.up ? <span className="ea-etq cost">mantener {fmt(c.up * 2)} al año</span> : null}
                {c.vida ? <span className="ea-etq vida">+{c.vida} de tren de vida</span> : null}
              </div>
            )}
            <div className="ea-itemD">{c.d}</div>
            {ya
              ? <span className="ea-tengo ea-dis">
                  {esPerk ? "Ya la tienes" : c.tipo === "consumo" ? "Ya lo tienes" : "Vale hoy USD " + fmt(s.valores[c.id] || 0)}
                </span>
              : !puede
              ? <span className="ea-dis" style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--gris)" }}>{c.porQue || "Todavía no te toca"}</span>
              : <button className={caro ? "ea-mini" : "ea-comprar ea-dis"} disabled={caro}
                  onClick={() => (esPerk ? comprarPerk(c) : comprarBien(c))}>
                  {caro ? "No te alcanza" : "Comprar"}
                </button>}
          </div>
        );
      })}
    </div>
  );
}
