/* ---------- qué estudiaste ---------- */
export const CARRERAS = [
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
export const PERFILES = [
  /* De menos a más riesgo, cada uno en su escalón (esperado · año malo):
     3,8% · −3% | 4,9% · −8% | 5,8% · −12% | 6,4% · −16% | 8,9% · −48% */
  { id: "conservador", n: "Conservador",
    w: { bonos: 0.20, corp: 0.35, acciones: 0.05, reits: 0, oro: 0.05, distressed: 0, cripto: 0, efectivo: 0.35 },
    d: "Duermes tranquilo. Los años buenos te saben a poco y los malos casi no se sienten." },
  { id: "todoterreno", n: "Todo terreno",
    w: { bonos: 0.20, corp: 0.15, acciones: 0.25, reits: 0.05, oro: 0.25, distressed: 0, cripto: 0, efectivo: 0.10 },
    d: "Reparte entre activos que reaccionan distinto al mismo shock. Nunca ganas el año, casi nunca lo pierdes." },
  { id: "balanceado", n: "Balanceado",
    w: { bonos: 0.25, corp: 0.15, acciones: 0.40, reits: 0.08, oro: 0.07, distressed: 0, cripto: 0, efectivo: 0.05 },
    d: "El punto medio razonable. Aguanta un mal año sin desarmarte y captura buena parte de los buenos." },
  { id: "indexado", n: "Indexado simple",
    w: { bonos: 0.25, corp: 0.15, acciones: 0.60, reits: 0, oro: 0, distressed: 0, cripto: 0, efectivo: 0 },
    d: "Sesenta y cuarenta de toda la vida. Aburrido, barato y difícil de superar en treinta años." },
  { id: "arriesgado", n: "Arriesgado",
    w: { bonos: 0, corp: 0, acciones: 0.35, reits: 0.05, oro: 0, distressed: 0.30, cripto: 0.30, efectivo: 0 },
    d: "Vas por el rendimiento alto y asumes que habrá años en los que pierdas casi la mitad." },
];
