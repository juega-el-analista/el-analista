/* ============================================================
   LA GALA DE LOS PREMIOS
   Un premio sale a pantalla completa, como el Balón de Oro de El Ídolo
   (Alessandro, 8-oct-2026), uno por uno, y después desaparece.

   Se corre con:  npm run gala
   ============================================================ */
const path = require("path");
const fs = require("fs");
const React = require("react");
const TR = require("react-test-renderer");
const act = TR.act;
console.error = () => {}; console.warn = () => {};

const { cargar } = require(path.join(__dirname, "banco.js"));
cargar(path.join(__dirname, "..", "src", "el-analista.jsx"));
const comp = path.join(__dirname, "compilado.js");
const tmp = path.join(__dirname, "probeGala.js");
fs.writeFileSync(tmp, fs.readFileSync(comp, "utf8").replace("module.exports = ElAnalista;",
  "module.exports = { GalaPremio, PREMIOS };"));
const J = require(tmp);

let fallos = 0;
const ok = (c, m) => { console.log("  " + (c ? "ok   " : "FALLO") + "  " + m); if (!c) fallos++; };
const txt = (j) => (j == null ? "" : typeof j === "string" || typeof j === "number" ? String(j)
  : Array.isArray(j) ? j.map(txt).join("") : j.children != null ? txt(j.children)
  : j.props && j.props.children != null ? txt(j.props.children) : "");

(async () => {
  global.window = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };
  const nac = J.PREMIOS.find((p) => !p.mundial), mun = J.PREMIOS.find((p) => p.mundial);
  let vista = 0, r;
  const montar = async () => {
    await act(async () => {
      const el = React.createElement(J.GalaPremio, { ids: [nac.id, mun.id], ano: 2034, vista, onSeguir: () => { vista += 1; } });
      if (r) r.update(el); else r = TR.create(el);
    });
  };
  await montar();
  const t1 = txt(r.toJSON());
  ok(/La gala · 2034/.test(t1) && t1.indexOf(nac.n) >= 0 && /Reconocimiento nacional/.test(t1), "primero la gala del premio nacional, con su nombre");
  ok(/🥇/.test(t1) && /\+7 reputación/.test(t1), "con su medalla y lo que suma");
  const boton = () => r.root.findAll((n) => n.type === "button")[0];
  ok(/Recibirlo y seguir/.test(txt(boton())), "si hay otro premio, el botón lo dice");
  await act(async () => { boton().props.onClick(); });
  await montar();
  const t2 = txt(r.toJSON());
  ok(t2.indexOf(mun.n) >= 0 && /Reconocimiento mundial/.test(t2) && /🏆/.test(t2), "después la del mundial, con trofeo");
  ok(/Subir a recibirlo/.test(txt(boton())), "y el último botón cierra");
  await act(async () => { boton().props.onClick(); });
  await montar();
  ok(r.toJSON() === null, "después de la última, la gala desaparece");
  await act(async () => { r.update(React.createElement(J.GalaPremio, { ids: [], ano: 2034, vista: 0, onSeguir() {} })); });
  ok(r.toJSON() === null, "un año sin premios no tiene gala");

  try { fs.unlinkSync(tmp); } catch (e) {}
  console.log("\n  " + (fallos ? fallos + " FALLO(S)" : "todo en verde"));
  process.exit(fallos ? 1 : 0);
})();
