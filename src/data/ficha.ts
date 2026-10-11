import type { Presentacion } from './catalogo';

/**
 * El cuadro de especificaciones de una presentación.
 *
 * Las características llegan como las escribió la empresa en su resumen de
 * productos: una lista de pares sueltos, con la unidad de venta repetida al
 * final y sin un criterio fijo de mayúsculas. Aquí se ordenan para que el
 * cuadro se lea igual en las 96 presentaciones.
 *
 * Lo que hace, y por qué:
 *
 *   · Quita la línea que repite la unidad de venta. «Caja x 4 und» arriba y
 *     «Caja x 4 unidades» abajo son el mismo dato dicho dos veces, y en el
 *     cuadro quedaban a cuatro renglones de distancia.
 *
 *   · Funde el volumen en la medida. Una presentación titulada «3.8 L» no
 *     necesita una fila que diga «Volumen: 3.8 L»; cuando esa fila añade algo
 *     —«3.8 L (1 G)»— lo que se muestra como título es la versión larga.
 *
 *   · Empieza cada valor en mayúscula. Solo la primera letra: «PE de baja
 *     densidad» o «polipropileno rígido» vienen de la misma hoja y lo que se
 *     busca es que ninguno arranque en minúscula, no uniformar el resto.
 */

export interface FilaFicha {
  rotulo: string;
  valor: string;
}

export interface Ficha {
  /** Lo que titula la presentación. Puede venir enriquecido desde el volumen. */
  medida: string;
  filas: FilaFicha[];
}

/** «CAJA X 4 UND» y «Caja x 4 unidades» son lo mismo. */
function comparable(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\bunds?\b/g, 'unidades')
    .replace(/\bund\.\b/g, 'unidades')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
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
  rotulos: { marca: string; unidad: string; detalle: string; descripcion: string },
): Ficha {
  let medida = pr.medida;
  const filas: FilaFicha[] = [];

  if (pr.marca) filas.push({ rotulo: rotulos.marca, valor: pr.marca });
  if (pr.unidad) filas.push({ rotulo: rotulos.unidad, valor: enMayuscula(pr.unidad) });

  const unidadComp = pr.unidad ? comparable(pr.unidad) : '';
  const medidaComp = pr.medida ? comparable(pr.medida) : '';

  for (const c of pr.caracteristicas) {
    const corte = c.indexOf(':');
    const rotulo = corte > 0 ? c.slice(0, corte).trim() : '';
    const valor = (corte > 0 ? c.slice(corte + 1) : c).trim();
    if (!valor) continue;

    const valorComp = comparable(valor);

    // Repite la unidad de venta
    if (!rotulo && unidadComp && valorComp === unidadComp) continue;

    // Repite la medida; si la amplía, se queda con la versión larga
    if (medidaComp && /^volumen$/i.test(rotulo) && valorComp.startsWith(medidaComp)) {
      if (valorComp !== medidaComp) medida = valor;
      continue;
    }

    filas.push({
      rotulo: rotulo ? enMayuscula(rotulo) : rotulos.detalle,
      valor: enMayuscula(valor),
    });
  }

  /* La descripción propia entra como una fila más y no como un párrafo
     suelto: solo ocho de las noventa y seis la tienen, y colgando bajo el
     cuadro hacía que esas ocho láminas se vieran de otra manera. */
  if (pr.descripcion) {
    filas.push({ rotulo: rotulos.descripcion, valor: enMayuscula(pr.descripcion) });
  }

  return { medida: enMayuscula(medida), filas };
}
