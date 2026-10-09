/**
 * El catálogo que publica el sitio.
 *
 * La empresa administra su portafolio en el portal del Grupo Pacheco, así que
 * al compilar se lee de la base: la lectura es anónima y solo devuelve lo
 * marcado como visible, que es exactamente lo que debe salir publicado. El
 * sitio sigue siendo estático —se consulta una vez por compilación, no por
 * visita—, y guardar en el portal dispara una nueva publicación.
 *
 * Si la base no responde, se compila con la copia local
 * (`catalogo-local.ts`). Es deliberado: preferimos publicar el catálogo de la
 * última generación antes que un sitio sin catálogo, y una compilación no
 * debería depender de que una red conteste. La consola avisa cuál de las dos
 * se usó.
 *
 * Las fotografías llegan de dos formas y se distinguen solas: una dirección
 * completa es una foto subida desde el portal; cualquier otra cosa es una ruta
 * relativa a /img/, que es como vienen las del repositorio.
 */
import {
  lineas as lineasLocal,
  categorias as categoriasLocal,
  productos as productosLocal,
  type Categoria,
  type EnPresentacion,
  type Linea,
  type Presentacion,
  type Producto,
} from './catalogo-local';
import manifest from '../../public/img/manifest.json' with { type: 'json' };
import { productosEn, lineasEn, categoriasEnCat, medidasEn, unidadesEn, caracteristicasEn } from '../i18n/productos-en';

export type { Categoria, EnPresentacion, Linea, Presentacion, Producto };

const EMPRESA = 'qmedical';
const BASE = 'https://youlxcpbffsvokhygubh.supabase.co/rest/v1';
/* Clave publicable: pública por diseño. La base solo deja leer lo visible. */
const CLAVE = 'sb_publishable_ldYnYlLuvA4fVu8Hnlh-nw_M2C2Hkui';

type FilaLinea = {
  id: string;
  slug: string;
  nombre: string;
  nombre_en: string | null;
  resumen: string;
  resumen_en: string | null;
  icono: string;
};
type FilaCategoria = {
  id: string;
  slug: string;
  nombre: string;
  nombre_en: string | null;
  linea_id: string;
};
type FilaPresentacion = {
  medida: string;
  medida_en: string | null;
  marca: string;
  marca_slug: string | null;
  unidad: string;
  unidad_en: string | null;
  caracteristicas: string[];
  caracteristicas_en: string[];
  descripcion: string | null;
  descripcion_en: string | null;
  imagen: string | null;
  orden: number;
  visible: boolean;
};
type FilaProducto = {
  slug: string;
  nombre: string;
  nombre_en: string | null;
  descripcion: string;
  descripcion_en: string | null;
  destacado: boolean;
  categoria_id: string;
  catalogo_presentaciones: FilaPresentacion[];
};

async function pedir<T>(ruta: string): Promise<T[]> {
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), 15000);
  try {
    const r = await fetch(`${BASE}/${ruta}`, {
      headers: { apikey: CLAVE },
      signal: control.signal,
    });
    if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
    return (await r.json()) as T[];
  } finally {
    clearTimeout(reloj);
  }
}

/** Vacío a undefined: una cadena vacía no es una traducción. */
const o = (v: string | null | undefined) => (v ? v : undefined);

type Catalogo = {
  lineas: Linea[];
  categorias: Categoria[];
  productos: Producto[];
  imagenes: Record<string, string[]>;
};

/**
 * El catálogo de la base. Las presentaciones vienen anidadas en una sola
 * consulta: son 96 filas y traerlas aparte obligaría a emparejarlas aquí.
 */
async function deLaBase(): Promise<Catalogo> {
  const comun = `empresa_id=eq.${EMPRESA}&visible=is.true&order=orden.asc`;
  const [filasL, filasC, filasP] = await Promise.all([
    pedir<FilaLinea>(`catalogo_lineas?select=id,slug,nombre,nombre_en,resumen,resumen_en,icono&${comun}`),
    pedir<FilaCategoria>(`catalogo_categorias?select=id,slug,nombre,nombre_en,linea_id&${comun}`),
    pedir<FilaProducto>(
      'catalogo_productos?select=slug,nombre,nombre_en,descripcion,descripcion_en,destacado,categoria_id,' +
        'catalogo_presentaciones(medida,medida_en,marca,marca_slug,unidad,unidad_en,caracteristicas,' +
        `caracteristicas_en,descripcion,descripcion_en,imagen,orden,visible)&${comun}`,
    ),
  ]);
  if (!filasL.length || !filasC.length || !filasP.length) {
    throw new Error('la base respondió con el catálogo vacío');
  }

  const slugLinea = new Map(filasL.map((l) => [l.id, l.slug]));
  const categoriaDe = new Map(filasC.map((c) => [c.id, c]));

  const lineas: Linea[] = filasL.map((l) => ({
    slug: l.slug,
    nombre: l.nombre,
    resumen: l.resumen,
    icono: l.icono,
    en: { nombre: o(l.nombre_en), resumen: o(l.resumen_en) },
  }));

  const categorias: Categoria[] = filasC.map((c) => ({
    slug: c.slug,
    nombre: c.nombre,
    linea: slugLinea.get(c.linea_id) ?? '',
    en: { nombre: o(c.nombre_en) },
  }));

  const imagenes: Record<string, string[]> = {};
  const productos: Producto[] = filasP.map((p) => {
    const cat = categoriaDe.get(p.categoria_id);
    /* El anidado no respeta el `order` de la consulta madre: se ordena aquí.
       La posición importa, porque empareja cada foto con su presentación. */
    const pres = [...p.catalogo_presentaciones]
      .filter((pr) => pr.visible)
      .sort((a, b) => a.orden - b.orden);
    imagenes[p.slug] = pres.map((pr) => pr.imagen ?? '');

    return {
      slug: p.slug,
      nombre: p.nombre,
      linea: cat ? (slugLinea.get(cat.linea_id) ?? '') : '',
      categoria: cat?.slug ?? '',
      descripcion: p.descripcion,
      destacado: p.destacado,
      en: { nombre: o(p.nombre_en), descripcion: o(p.descripcion_en) },
      presentaciones: pres.map((pr) => ({
        medida: pr.medida,
        marca: pr.marca,
        marcaSlug: o(pr.marca_slug),
        unidad: pr.unidad,
        caracteristicas: pr.caracteristicas,
        descripcion: o(pr.descripcion),
        en: {
          medida: o(pr.medida_en),
          unidad: o(pr.unidad_en),
          caracteristicas: pr.caracteristicas_en.length ? pr.caracteristicas_en : undefined,
          descripcion: o(pr.descripcion_en),
        },
      })),
    };
  });

  return { lineas, categorias, productos, imagenes };
}

/**
 * La copia del repositorio, con la traducción que vive en `i18n/`. Se compone
 * aquí para que el resto del sitio vea una sola forma del dato, venga de donde
 * venga.
 */
function deLaCopia(): Catalogo {
  return {
    lineas: lineasLocal.map((l) => ({ ...l, en: lineasEn[l.slug] })),
    categorias: categoriasLocal.map((c) => ({ ...c, en: { nombre: categoriasEnCat[c.slug] } })),
    productos: productosLocal.map((p) => {
      const t = productosEn[p.slug];
      return {
        ...p,
        en: { nombre: t?.nombre, descripcion: t?.descripcion },
        presentaciones: p.presentaciones.map((pr, i) => ({
          ...pr,
          en: {
            medida: medidasEn[pr.medida],
            unidad: unidadesEn[pr.unidad],
            caracteristicas: pr.caracteristicas.map((c) => caracteristicasEn[c] ?? c),
            descripcion: t?.descripciones?.[i],
          },
        })),
      };
    }),
    imagenes: manifest.productos as Record<string, string[]>,
  };
}

async function cargar(): Promise<Catalogo> {
  /* Para compilar sin red, o para comparar una publicación con la copia del
     repositorio: QM_CATALOGO=local npm run build */
  if (process.env.QM_CATALOGO === 'local') {
    console.info('[catálogo] QM_CATALOGO=local: se compila con la copia del repositorio.');
    return deLaCopia();
  }
  try {
    const c = await deLaBase();
    console.info(
      '[catálogo] del portal: %d líneas, %d categorías, %d productos',
      c.lineas.length,
      c.categorias.length,
      c.productos.length,
    );
    return c;
  } catch (err) {
    console.warn(
      '[catálogo] no se pudo leer del portal (%s). Se compila con la copia del repositorio.',
      err instanceof Error ? err.message : err,
    );
    return deLaCopia();
  }
}

/* ───────────────────────────────────── El catálogo vivo ─────────────────
 *
 * El sitio se arma en el servidor, así que el módulo no se carga una vez por
 * publicación sino una vez por arranque de la función, y esa función puede
 * seguir viva horas. Sin refrescar, una edición hecha en el portal no se
 * vería hasta que Vercel levantara una función nueva.
 *
 * De ahí que lo que se exporta sean enlaces vivos (`let`): el módulo los
 * reemplaza al refrescar y quien importó ve el valor nuevo, sin que nadie
 * tenga que pedir el catálogo por parámetro.
 *
 * El relevo se hace de una vez y sin `await` en medio. JavaScript no
 * interrumpe una secuencia así, de modo que ninguna página puede quedarse a
 * medias entre el catálogo viejo y el nuevo.
 */
const VIGENCIA = 60_000;

const inicial = await cargar();
let cargadoEn = Date.now();
let enVuelo: Promise<Catalogo | null> | null = null;

export let lineas = inicial.lineas;
export let categorias = inicial.categorias;
export let productos = inicial.productos;

/**
 * Fotografías por producto, en el mismo orden que sus presentaciones: la
 * posición i corresponde a la presentación i. Las presentaciones sin foto
 * entregada guardan una cadena vacía para no descolocar ese emparejamiento.
 */
let imagenes = inicial.imagenes;

export let lineaPorSlug = new Map(lineas.map((l) => [l.slug, l]));
export let categoriaPorSlug = new Map(categorias.map((c) => [c.slug, c]));
export let productoPorSlug = new Map(productos.map((p) => [p.slug, p]));

/**
 * Vuelve a pedir el catálogo si el que hay en memoria ya cumplió su minuto.
 * Lo llama el middleware antes de armar cada página.
 *
 * Si la consulta falla, se conserva el catálogo anterior: una página con el
 * portafolio de hace un minuto es mejor que una página sin portafolio. Y se
 * marca la hora igualmente, para no reintentar en cada visita mientras la
 * base esté caída.
 */
export async function refrescar(): Promise<void> {
  if (process.env.QM_CATALOGO === 'local') return;
  if (Date.now() - cargadoEn < VIGENCIA) return;
  if (!enVuelo) {
    enVuelo = deLaBase().catch((err) => {
      console.warn('[catálogo] no se pudo refrescar: %s', err instanceof Error ? err.message : err);
      return null;
    });
  }
  const nuevo = await enVuelo;
  enVuelo = null;
  cargadoEn = Date.now();
  if (!nuevo) return;

  // El relevo, de una vez. Sin `await` entre estas líneas.
  lineas = nuevo.lineas;
  categorias = nuevo.categorias;
  productos = nuevo.productos;
  imagenes = nuevo.imagenes;
  lineaPorSlug = new Map(lineas.map((l) => [l.slug, l]));
  categoriaPorSlug = new Map(categorias.map((c) => [c.slug, c]));
  productoPorSlug = new Map(productos.map((p) => [p.slug, p]));
}

export function categoriasDeLinea(linea: string): Categoria[] {
  return categorias.filter((c) => c.linea === linea);
}

export function productosDeCategoria(categoria: string): Producto[] {
  return productos.filter((p) => p.categoria === categoria);
}

export function productosDeLinea(linea: string): Producto[] {
  return productos.filter((p) => p.linea === linea);
}

export function productosDestacados(): Producto[] {
  return productos.filter((p) => p.destacado);
}

/** Todas las fotos de un producto, alineadas con sus presentaciones. */
export function imagenesDe(slug: string): string[] {
  return imagenes[slug] ?? [];
}

/**
 * Ruta de una imagen en el ancho pedido. Las del repositorio tienen una
 * versión de 480 px generada por el guion de imágenes; una foto subida desde
 * el portal no, y se sirve tal cual.
 */
function enAncho(rel: string, size: 900 | 480): string {
  if (!rel) return '';
  if (/^https?:\/\//.test(rel)) return rel;
  return '/img/' + (size === 900 ? rel : rel.replace('.webp', '-480.webp'));
}

/** Foto de una presentación concreta. Vacía si no se entregó. */
export function imagenDePresentacion(slug: string, i: number, size: 900 | 480 = 900): string {
  return enAncho(imagenesDe(slug)[i] ?? '', size);
}

/**
 * Foto que representa al producto: la primera que exista. No siempre es la
 * de la primera presentación, porque puede faltar justo esa.
 */
export function imagenPrincipal(slug: string, size: 900 | 480 = 900): string {
  const primera = imagenesDe(slug).find(Boolean);
  return enAncho(primera ?? '', size);
}

/** «1 producto» / «5 productos», como una sola cadena sin espacios sueltos. */
export function conteoProductos(categoria: string): string {
  const n = productosDeCategoria(categoria).length;
  return `${n} producto${n === 1 ? '' : 's'}`;
}

/** Lo mismo para una línea entera. */
export function conteoLinea(linea: string): string {
  const n = productosDeLinea(linea).length;
  return `${n} producto${n === 1 ? '' : 's'}`;
}

/**
 * Marcas que aparecen en un conjunto de productos, sin repetir y en el orden
 * en que se encuentran. Sirve para el crédito de una categoría o una línea.
 */
export function marcasDe(lista: Producto[]): string[] {
  const vistas = new Set<string>();
  for (const p of lista) {
    for (const pr of p.presentaciones) {
      if (pr.marca) vistas.add(pr.marca);
    }
  }
  return [...vistas];
}

/**
 * Resumen corto para tarjetas: la primera oración de la descripción, que es
 * donde la empresa dice para qué sirve el producto.
 */
export function resumenDe(p: Producto, max = 150): string {
  const texto = p.descripcion.trim();
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  const punto = corte.lastIndexOf('. ');
  return punto > 60 ? corte.slice(0, punto + 1) : corte.replace(/\s+\S*$/, '') + '…';
}
