/**
 * Marcas representadas y distribuidas por Q-MEDICAL S.A.C.
 *
 * En octubre de 2026 la empresa retiró, por estrategia comercial, a Kangji,
 * Bemis (Quick Fit), Prep Bio y Huaxinhong: no deben aparecer en ninguna
 * parte del sitio. Sus productos se ocultaron en el portal, no se borraron.
 */

export interface Marca {
  slug: string;
  nombre: string;
  /**
   * Qué fabrica y para qué sirve. Vacío mientras la empresa no lo entregue:
   * una marca sin descripción se publica igual, con su logotipo y los
   * productos que la llevan, antes que con una descripción inventada.
   */
  resumen: string;
  linea: string;
  /**
   * Si sale en el anillo de marcas asociadas. Por omisión, sí. El anillo
   * muestra los logotipos que entregó la empresa, uno por marca.
   */
  enAnillo?: boolean;
}

/*
 * Qué productos lleva cada marca ya no se guarda aquí: se deduce del
 * catálogo, que es donde cada presentación declara la suya. La lista a mano
 * se quedó atrás en la reestructuración de 2026 —veinticinco de sus treinta
 * y tres referencias apuntaban a productos que habían cambiado de nombre— y
 * las fichas de marca aparecían casi vacías sin que nada fallara.
 */

export const marcas: Marca[] = [
  {
    slug: 'q-medical',
    nombre: 'Q-MEDICAL',
    resumen:
      'Nuestra marca propia. Reúne los dispositivos que desarrollamos y ' +
      'acondicionamos con fabricantes seleccionados bajo nuestras propias ' +
      'especificaciones técnicas.',
    linea: 'Marca propia · línea general',
  },
  {
    slug: 'medcaptain',
    nombre: 'Medcaptain',
    resumen:
      'Equipamiento médico electrónico para infusión, nutrición enteral y ' +
      'manejo de vía aérea, con plataformas conectables al monitoreo central.',
    linea: 'Equipamiento · vía aérea y nutrición',
  },
  {
    slug: 'maxcon',
    nombre: 'MAXCON',
    resumen:
      'Contenedores rígidos de bioseguridad para residuos punzocortantes, ' +
      'citotóxicos, especiales y vidrios, en todo el rango de capacidades.',
    linea: 'Bioseguridad · manejo de residuos',
  },
  {
    /* La empresa la llama por su producto, NEX CLOREX; el logotipo que
       entregó es el del fabricante, NEX MEDICAL Antiseptics. */
    slug: 'nex-medical',
    nombre: 'NEX CLOREX',
    resumen:
      'Antisépticos de NEX MEDICAL Antiseptics para la preparación ' +
      'prequirúrgica de la piel, a base de gluconato de clorhexidina, en ' +
      'formatos aplicador, esponja y cepillo.',
    linea: 'Antisepsia · preparación de piel',
  },
  {
    slug: 'alleva-medical',
    nombre: 'Alleva Medical',
    resumen:
      'Sistemas de aspiración de secreciones marca VIDE®: bolsas descartables, ' +
      'cánister rígidos reusables y toda su línea de soportes y accesorios.',
    linea: 'Aspiración y succión',
  },
  {
    slug: 'geyi',
    nombre: 'GEYI',
    resumen:
      'Trócares desechables con punta de seguridad y hoja blindada para ' +
      'cirugía laparoscópica, disponibles en kits preconfigurados.',
    linea: 'Cirugía laparoscópica',
  },
  {
    slug: 'bano-facil',
    nombre: 'Baño Fácil',
    resumen:
      'Paños jabonosos descartables para la higiene del paciente encamado. ' +
      'No requieren enjuague y están disponibles en tres formulaciones.',
    linea: 'Higiene y confort del paciente',
  },
  {
    slug: 'comfort-rubber-gloves',
    nombre: 'Comfort Rubber Gloves',
    resumen:
      'Guantes de nitrilo de alto riesgo, libres de látex y polvo, con ' +
      'resistencia comprobada a agentes químicos y citostáticos.',
    linea: 'Protección personal',
  },
  {
    slug: 'silpak',
    nombre: 'SILPAK S.A.',
    resumen:
      'Manufactura de silicona: mangueras y tubuladuras 100 % silicona en ' +
      'rollos de 25 m y diámetros variables, estables de −50 °C a +250 °C.',
    linea: 'Tubuladuras de silicona',
  },
  {
    slug: 'xodus',
    nombre: 'Xodus Medical',
    resumen:
      'Soluciones para el quirófano: marcadores quirúrgicos de piel y mantas ' +
      'absorbentes de fluidos con forro antideslizante.',
    linea: 'Quirófano · absorbentes y marcadores',
  },
  {
    slug: 'jiehong',
    nombre: 'JIEHONG Medical',
    resumen:
      'Mantas absorbentes de fluidos para piso, impermeables y reversibles, ' +
      'en presentación continua o precortada.',
    linea: 'Absorbentes de superficie',
  },
  {
    slug: 'longood',
    nombre: 'Longood',
    resumen:
      'Toallitas individuales impregnadas con clorhexidina al 2 % en alcohol ' +
      'isopropílico al 70 % para la limpieza y antisepsia de la piel.',
    linea: 'Antisepsia · toallitas',
  },
  {
    slug: 'telijie',
    nombre: 'TELIJIE',
    resumen:
      'Paños clínicos absorbentes de un solo uso para secado de manos ' +
      'quirúrgico, baño del paciente y limpieza de instrumental.',
    linea: 'Paños clínicos',
  },
  {
    slug: 'medispo',
    nombre: 'Medispo',
    resumen:
      'Protectores de tela plástica impermeable para colchón, descartables y ' +
      'de barrera continua.',
    linea: 'Protección de superficies',
  },
  {
    slug: 'kangbao',
    nombre: 'KANGBAO',
    resumen:
      'Contadores de agujas de doble imán para el recuento seguro de material ' +
      'punzocortante en sala de operaciones.',
    linea: 'Seguridad quirúrgica',
  },
  /*
   * Llegaron con su logotipo en octubre de 2026, sin la descripción que las
   * acompaña. Se publican igual: su logotipo y los productos que la llevan
   * son información cierta. El resumen se completa cuando la empresa lo
   * entregue.
   */
  {
    /* Hefei es el fabricante de TELIJIE, y su logotipo es el mismo: en el
       anillo salían dos discos iguales. La empresa no lo incluyó entre los
       logotipos de octubre de 2026, así que queda solo como la marca que el
       catálogo nombra en el paño de celulosa. */
    slug: 'hefei',
    nombre: 'Hefei',
    resumen: '',
    linea: 'Higiene del paciente',
    enAnillo: false,
  },
  {
    slug: 'comfycloud',
    nombre: 'ComfyCloud',
    resumen: '',
    linea: 'Mantas absorbentes',
  },
];

/*
 * Logotipos. Los de la entrega de octubre de 2026 viven en su propia carpeta
 * —/img/ se sirve con caché inmutable, y un archivo nuevo con el nombre del
 * viejo no le llegaría a quien ya visitó el sitio— y los escribe
 * scripts/entrega_octubre.py. Hefei no venía en esa entrega y conserva el
 * suyo.
 */
const CON_LOGO_NUEVO = new Set([
  'alleva-medical', 'bano-facil', 'comfycloud', 'comfort-rubber-gloves', 'geyi',
  'jiehong', 'kangbao', 'longood', 'maxcon', 'medcaptain', 'medispo',
  'nex-medical', 'q-medical', 'silpak', 'telijie', 'xodus',
]);

/** El logotipo de una marca: a doble densidad, o `-1x` para la sencilla. */
export function logoDe(slug: string, densidad: '1x' | '2x' = '2x'): string {
  const carpeta = CON_LOGO_NUEVO.has(slug) ? '/img/marcas/2026-10' : '/img/marcas';
  return `${carpeta}/${slug}${densidad === '1x' ? '-1x' : ''}.webp`;
}

export const marcaPorSlug = new Map(marcas.map((m) => [m.slug, m]));
