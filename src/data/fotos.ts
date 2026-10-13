import anchos from './fotos-anchos.json' with { type: 'json' };

/**
 * Qué tamaños existe de cada fotografía de escena.
 *
 * No todas tienen los mismos. Las que vienen de un RAW se revelan de la
 * vista previa que el archivo guarda dentro —1920 px—, no del negativo, así
 * que ahí se acaban; las demás salen de originales de 4592 px y llegan a
 * 2400, y las que se sirven a sangre, a 3200.
 *
 * El índice lo escribe scripts/fotos_grandes.py leyendo la carpeta, de modo
 * que una plantilla nunca ofrece en su srcset un archivo que no existe. Es
 * lo que pasó al añadir los tamaños grandes a mano: las tres fotografías
 * reveladas de RAW quedaron ofreciendo un 2400 y un 3200 inexistentes.
 */
const TABLA = anchos as Record<string, number[]>;

/** El nombre de la fotografía a partir de una ruta como /img/fotos/x-1600.webp */
function nombreDe(ruta: string): string {
  return (ruta.match(/\/img\/fotos\/(.+?)-\d{3,4}\.webp$/) ?? [])[1] ?? '';
}

/** Los anchos publicados de una fotografía, de menor a mayor. */
export function anchosDe(ruta: string): number[] {
  return TABLA[nombreDe(ruta)] ?? [];
}

/**
 * El `srcset` de una fotografía, con los tamaños que de verdad existen.
 * Se omiten los más pequeños cuando no aportan: una cabecera no va a
 * servirse nunca a 640 px de ancho.
 */
export function srcsetDe(ruta: string, minimo = 1000): string {
  const nombre = nombreDe(ruta);
  const lista = anchosDe(ruta).filter((w) => w >= minimo);
  if (!nombre || lista.length < 2) return '';
  return lista.map((w) => `/img/fotos/${nombre}-${w}.webp ${w}w`).join(', ');
}

/** La mayor que exista, para usarla como `src` de respaldo. */
export function mayorDe(ruta: string, tope = 1600): string {
  const nombre = nombreDe(ruta);
  const lista = anchosDe(ruta).filter((w) => w <= tope);
  const w = lista[lista.length - 1];
  return nombre && w ? `/img/fotos/${nombre}-${w}.webp` : ruta;
}
