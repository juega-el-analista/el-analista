import { fmt, elegirAzar } from "../motor/aritmetica.js";

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
    x: (c) => `La frase significa que cuando sube lo que ganas sube casi igual lo que gastas, sin que llegues a decidirlo. Tus gastos pasaron de ${fmt(c.gastoAnt)} a ${fmt(c.gastos)}, un ${Math.round((c.gastos / c.gastoAnt - 1) * 100)}% más, y por eso el aumento se nota bastante menos de lo que esperabas. Es la razón por la que hay gente que gana mucho y no acumula nada: el sueldo sube, el nivel de vida lo persigue, y la distancia entre los dos nunca crece. Y cada dólar de gasto fijo nuevo son 25 dólares que necesitas tener guardados para poder dejar de trabajar.` },
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
  { id: "moneda", pri: 5, cuando: (c) => ["ve", "ar", "co", "mx"].indexOf(c.pais) >= 0,
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

export const escogerLeccion = (c, usadas) => {
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
export const HITOS = [
  { v: 10000, t: "Primeros diez mil" },
  { v: 50000, t: "Cincuenta mil" },
  { v: 100000, t: "Seis cifras" },
  { v: 250000, t: "Un cuarto de millón" },
  { v: 500000, t: "Medio millón" },
  { v: 1000000, t: "El primer millón" },
  { v: 3000000, t: "Tres millones" },
  { v: 10000000, t: "Ocho cifras" },
];
