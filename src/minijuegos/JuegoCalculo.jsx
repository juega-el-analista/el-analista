import React, { useState, useEffect, useMemo } from "react";
import { clamp, elegirAzar } from "../motor/aritmetica.js";

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

export function JuegoCalculo({ ayuda, nivel, onFin }) {
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
