/**
 * Marcas representadas y distribuidas por Q-MEDICAL S.A.C.
 * `logo` apunta a /img/marcas/<slug>.webp generado por scripts/optimize_images.py
 */

export interface Marca {
  slug: string;
  nombre: string;
  resumen: string;
  linea: string;
  productos: string[]; // slugs de producto
}

export const marcas: Marca[] = [
  {
    slug: 'q-medical',
    nombre: 'Q-MEDICAL',
    resumen:
      'Nuestra marca propia. Reúne los dispositivos que desarrollamos y ' +
      'acondicionamos con fabricantes seleccionados bajo nuestras propias ' +
      'especificaciones técnicas.',
    linea: 'Marca propia · línea general',
    productos: [
      'pano-clinico-qmedical',
      'toalla-secado-corporal',
      'bolsa-vomito',
      'bolsa-conteo-gasas',
      'marcador-piel-esteril',
      'limpiador-puntas-electrocauterio',
      'cepillos-limpieza-instrumental',
      'alfombra-descontaminante',
      'bolsa-nutricion-enteral',
      'set-alimentacion-enteral',
      'tubuladura-succion-esteril',
    ],
  },
  {
    slug: 'medcaptain',
    nombre: 'Medcaptain',
    resumen:
      'Equipamiento médico electrónico para infusión, nutrición enteral y ' +
      'manejo de vía aérea, con plataformas conectables al monitoreo central.',
    linea: 'Equipamiento · vía aérea y nutrición',
    productos: ['videolaringoscopio', 'hojas-videolaringoscopio', 'bomba-nutricion-enteral'],
  },
  {
    slug: 'maxcon',
    nombre: 'MAXCON',
    resumen:
      'Contenedores rígidos de bioseguridad para residuos punzocortantes, ' +
      'citotóxicos, especiales y vidrios, en todo el rango de capacidades.',
    linea: 'Bioseguridad · manejo de residuos',
    productos: ['contenedores-punzocortantes', 'contenedores-citotoxicos'],
  },
  {
    slug: 'nex-medical',
    nombre: 'NEX MEDICAL Antiseptics',
    resumen:
      'Antisépticos de preparación prequirúrgica de la piel a base de ' +
      'gluconato de clorhexidina, en formatos aplicador, esponja y cepillo.',
    linea: 'Antisepsia · preparación de piel',
    productos: [
      'aplicador-clorhexidina-2',
      'cepillo-esponja-clorhexidina-4',
      'esponja-clorhexidina-2',
    ],
  },
  {
    slug: 'alleva-medical',
    nombre: 'Alleva Medical',
    resumen:
      'Sistemas de aspiración de secreciones marca VIDE®: bolsas descartables, ' +
      'cánister rígidos reusables y toda su línea de soportes y accesorios.',
    linea: 'Aspiración y succión',
    productos: ['bolsas-aspiracion', 'canister-reusable', 'accesorios-aspiracion'],
  },
  {
    slug: 'geyi',
    nombre: 'GEYI',
    resumen:
      'Trócares desechables con punta de seguridad y hoja blindada para ' +
      'cirugía laparoscópica, disponibles en kits preconfigurados.',
    linea: 'Cirugía laparoscópica',
    productos: ['trocares-desechables'],
  },
  {
    slug: 'bano-facil',
    nombre: 'Baño Fácil',
    resumen:
      'Paños jabonosos descartables para la higiene del paciente encamado. ' +
      'No requieren enjuague y están disponibles en tres formulaciones.',
    linea: 'Higiene y confort del paciente',
    productos: ['pano-bano-facil'],
  },
  {
    slug: 'comfort-rubber-gloves',
    nombre: 'Comfort Rubber Gloves',
    resumen:
      'Guantes de nitrilo de alto riesgo, libres de látex y polvo, con ' +
      'resistencia comprobada a agentes químicos y citostáticos.',
    linea: 'Protección personal',
    productos: ['guantes-nitrilo'],
  },
  {
    slug: 'silpak',
    nombre: 'SILPAK S.A.',
    resumen:
      'Manufactura de silicona: mangueras y tubuladuras 100 % silicona en ' +
      'rollos de 25 m y diámetros variables, estables de −50 °C a +250 °C.',
    linea: 'Tubuladuras de silicona',
    productos: ['tubuladura-silicona'],
  },
  {
    slug: 'xodus',
    nombre: 'Xodus Medical',
    resumen:
      'Soluciones para el quirófano: marcadores quirúrgicos de piel y mantas ' +
      'absorbentes de fluidos con forro antideslizante.',
    linea: 'Quirófano · absorbentes y marcadores',
    productos: ['marcador-piel-no-esteril', 'manta-absorbente-xodus'],
  },
  {
    slug: 'jiehong',
    nombre: 'JIEHONG Medical',
    resumen:
      'Mantas absorbentes de fluidos para piso, impermeables y reversibles, ' +
      'en presentación continua o precortada.',
    linea: 'Absorbentes de superficie',
    productos: ['manta-absorbente-jiehong'],
  },
  {
    slug: 'longood',
    nombre: 'Longood',
    resumen:
      'Toallitas individuales impregnadas con clorhexidina al 2 % en alcohol ' +
      'isopropílico al 70 % para la limpieza y antisepsia de la piel.',
    linea: 'Antisepsia · toallitas',
    productos: ['toallitas-limpieza-piel'],
  },
  {
    slug: 'telijie',
    nombre: 'TELIJIE',
    resumen:
      'Paños clínicos absorbentes de un solo uso para secado de manos ' +
      'quirúrgico, baño del paciente y limpieza de instrumental.',
    linea: 'Paños clínicos',
    productos: ['pano-clinico-telijie'],
  },
  {
    slug: 'medispo',
    nombre: 'Medispo',
    resumen:
      'Protectores de tela plástica impermeable para colchón, descartables y ' +
      'de barrera continua.',
    linea: 'Protección de superficies',
    productos: ['protector-impermeable'],
  },
  {
    slug: 'kangbao',
    nombre: 'KANGBAO',
    resumen:
      'Contadores de agujas de doble imán para el recuento seguro de material ' +
      'punzocortante en sala de operaciones.',
    linea: 'Seguridad quirúrgica',
    productos: [],
  },
];

export const marcaPorSlug = new Map(marcas.map((m) => [m.slug, m]));
