import type { Presentacion } from './catalogo';

/**
 * El cuadro de especificaciones de una presentación.
 *
 * La empresa fijó su forma en octubre de 2026, con la lista PRODUCTOS 2026
 * V2: cuatro filas, siempre en este orden, y con estos rótulos —
 *
 *   MARCA · UNIDAD DE VENTA · CARACTERÍSTICAS · DETALLE
 *
 * Las características se publican como las escribió la empresa, línea por
 * línea y con sus viñetas: antes se partían en el primer «:» para inventar
 * un rótulo por línea («Material», «Superior», «Medio»…), y el cuadro decía
 * cosas que la hoja no decía. Ahora el rótulo es uno solo y el texto es el
 * suyo.
 *
 * Una fila sin dato no se imprime, ni siquiera su rótulo. Pasa con la marca
 * de las mantas absorbentes y con el detalle de muchos productos: en los dos
 * casos la empresa pidió no ponerlos.
 */

export interface FilaFicha {
  rotulo: string;
  valor: string;
}

export interface Ficha {
  /** Lo que titula la presentación: una capacidad, una talla, un modelo. */
  medida: string;
  filas: FilaFicha[];
}

/** Mayúscula inicial, sin tocar el resto. */
export function enMayuscula(s: string): string {
  const t = s.trim();
  if (!t) return t;
  const primera = t[0];
  // Si ya empieza por mayúscula, número o viñeta, se deja como está
  return primera === primera.toUpperCase() ? t : primera.toUpperCase() + t.slice(1);
}

export function fichaDe(
  pr: Presentacion,
  rotulos: { marca: string; unidad: string; caracteristicas: string; detalle: string },
): Ficha {
  const filas: FilaFicha[] = [];
  if (pr.marca) filas.push({ rotulo: rotulos.marca, valor: pr.marca });
  if (pr.unidad) filas.push({ rotulo: rotulos.unidad, valor: enMayuscula(pr.unidad) });

  const caracteristicas = pr.caracteristicas.map((c) => c.trim()).filter(Boolean);
  if (caracteristicas.length) {
    filas.push({ rotulo: rotulos.caracteristicas, valor: caracteristicas.join('\n') });
  }
  if (pr.detalle) filas.push({ rotulo: rotulos.detalle, valor: enMayuscula(pr.detalle) });

  return { medida: enMayuscula(pr.medida), filas };
}
