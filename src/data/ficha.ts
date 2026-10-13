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
 *
 *   · Rearma la composición de materiales. En el instrumental laparoscópico
 *     la hoja la escribe por partes: un encabezado sin valor —«Tubo de
 *     aislamiento:»— y debajo, con viñeta, de qué está hecho. Leído renglón
 *     a renglón quedaba un solo bloque sin rótulo con ocho líneas dentro;
 *     aquí cada parte recupera su nombre y su material.
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

/** Quita la viñeta con la que viene escrita la línea en la hoja. */
function sinVineta(s: string): string {
  return s.replace(/^[\s•▪·*-]+/, '').trim();
}

/** Mayúscula inicial, sin tocar el resto. */
export function enMayuscula(s: string): string {
  const t = s.trim();
  if (!t) return t;
  const primera = t[0];
  // Si ya empieza por mayúscula, número o viñeta, se deja como está
  return primera === primera.toUpperCase() ? t : primera.toUpperCase() + t.slice(1);
}

/** Lo que la hoja escribe con viñeta es un valor, no un renglón suelto. */
function conVineta(s: string): boolean {
  return /^[\s]*[•▪·*-]/.test(s);
}

interface Linea {
  /** Venía con viñeta en la hoja. */
  vineta: boolean;
  rotulo: string;
  valor: string;
}

export function fichaDe(
  pr: Presentacion,
  rotulos: { marca: string; unidad: string; detalle: string },
): Ficha {
  let medida = pr.medida;
  const filas: FilaFicha[] = [];

  if (pr.marca) filas.push({ rotulo: rotulos.marca, valor: pr.marca });
  if (pr.unidad) filas.push({ rotulo: rotulos.unidad, valor: enMayuscula(pr.unidad) });

  const unidadComp = pr.unidad ? comparable(pr.unidad) : '';
  const medidaComp = pr.medida ? comparable(pr.medida) : '';

  /* Las líneas sin rótulo se juntan en una sola fila. Son frases sueltas
     —«Producto no estéril», «Caja x 12 unidades»— y cada una en su propio
     renglón repetía la palabra «Detalle» cuatro veces seguidas. */
  let sueltas: string[] = [];
  const volcar = () => {
    if (!sueltas.length) return;
    filas.push({ rotulo: rotulos.detalle, valor: sueltas.join('\n') });
    sueltas = [];
  };

  /* Primero se leen todas las líneas, porque para saber si una es el
     encabezado de una parte hay que ver la siguiente. */
  const lineas: Linea[] = pr.caracteristicas.map((c) => {
    const corte = c.indexOf(':');
    return {
      vineta: conVineta(c),
      rotulo: corte > 0 ? sinVineta(c.slice(0, corte)) : '',
      valor: sinVineta(corte > 0 ? c.slice(corte + 1) : c),
    };
  });

  /* Encabezado de una parte: va sin viñeta y debajo, con viñeta, trae de
     qué está hecha. O lo dice con dos puntos y sin valor —«Tubo de
     aislamiento:»— o sin ellos —«Mango»—. Se reconoce por lo que tiene
     debajo, no por cómo está escrito, y solo se queda con esa línea si
     manda sobre ella sola: cuando debajo cuelga una lista entera es el
     título de un grupo, no el nombre de una pieza.

     El límite de largo y el punto final distinguen un rótulo de una frase:
     en la hoja hay descripciones de tres renglones seguidas de más
     renglones, y sin esto una se habría convertido en rótulo de la otra. */
  const mandaSobreUna = (i: number): boolean => {
    const sig = lineas[i + 1];
    const dos = lineas[i + 2];
    return !!sig && sig.vineta && !sig.rotulo && !!sig.valor && !(dos && dos.vineta && !dos.rotulo);
  };

  /* Título de grupo: en versales y con la lista debajo —«MATERIALES»,
     «COMPONENTES Y MATERIALES»—. No dice nada que el propio cuadro no diga
     ya, así que no se imprime. Se pide que tenga letras y varias, para que
     no se lleve por delante un «12 V» ni un «(54.07%),». */
  const esTituloDeGrupo = (l: Linea, sig: Linea | undefined): boolean => {
    if (l.vineta || l.rotulo || !sig || !sig.vineta) return false;
    const letras = l.valor.replace(/[^\p{L}]/gu, '');
    return letras.length >= 4 && letras === letras.toUpperCase();
  };

  for (let i = 0; i < lineas.length; i++) {
    const l = lineas[i];
    const sig = lineas[i + 1];

    // «Tubo de aislamiento:» sin valor: titula, nunca es dato.
    if (!l.vineta && l.rotulo && !l.valor) {
      if (mandaSobreUna(i)) {
        volcar();
        filas.push({ rotulo: enMayuscula(l.rotulo), valor: enMayuscula(sig!.valor) });
        i++;
      }
      continue;
    }

    // «Mango» y debajo «- ABS»: el nombre de la pieza y su material.
    if (
      !l.vineta &&
      !l.rotulo &&
      l.valor.length <= 48 &&
      !/[.;]$/.test(l.valor) &&
      mandaSobreUna(i)
    ) {
      volcar();
      filas.push({ rotulo: enMayuscula(l.valor), valor: enMayuscula(sig!.valor) });
      i++;
      continue;
    }

    if (esTituloDeGrupo(l, sig)) continue;

    const { rotulo, valor } = l;
    if (!valor) continue;

    const valorComp = comparable(valor);

    // Repite la unidad de venta
    if (!rotulo && unidadComp && valorComp === unidadComp) continue;

    // Repite la medida; si la amplía, se queda con la versión larga
    if (medidaComp && /^volumen$/i.test(rotulo) && valorComp.startsWith(medidaComp)) {
      if (valorComp !== medidaComp) medida = valor;
      continue;
    }

    if (!rotulo) {
      sueltas.push(enMayuscula(valor));
      continue;
    }
    volcar();
    filas.push({ rotulo: enMayuscula(rotulo), valor: enMayuscula(valor) });
  }
  volcar();

  /* La descripción propia de la presentación no se publica. Repetía, con
     otras palabras, lo que ya dice la descripción del producto unos
     centímetros más arriba, y solo siete de las noventa y seis la traían:
     esas siete láminas se leían distintas que las demás sin aportar nada. */

  return { medida: enMayuscula(medida), filas };
}
