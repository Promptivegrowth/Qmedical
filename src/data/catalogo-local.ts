/**
 * Catálogo de Q-MEDICAL, en cuatro niveles.
 *
 *   línea → categoría → producto → presentación
 *
 * La presentación es la unidad que la empresa vende —una capacidad, una
 * medida, un modelo— y la que tiene fotografía propia. Por eso una ficha de
 * producto reúne todas sus presentaciones en vez de abrir una página por
 * cada una: quien compra elige la medida dentro del producto, no entre
 * páginas casi idénticas.
 *
 * Esta es la copia local, y es el respaldo: desde que la empresa administra
 * el catálogo en el portal, lo que se publica sale de la base, y este archivo
 * solo entra en juego si la base no responde al compilar (véase
 * `catalogo.ts`). Los datos provienen del RESUMEN DE PRODUCTOS 2026 que
 * entregó la empresa.
 */

/** Lo mismo, en inglés. Lo que falte se muestra en castellano. */
export interface EnPresentacion {
  medida?: string;
  unidad?: string;
  caracteristicas?: string[];
  descripcion?: string;
}

export interface Presentacion {
  /** Lo que distingue a esta presentación: una capacidad, una medida, un modelo. */
  medida: string;
  /** Marca, tal como la nombra la empresa. */
  marca: string;
  /** Slug de la marca cuando tiene ficha propia en el sitio. */
  marcaSlug?: string;
  /** Cómo se vende: por unidades, por cajas… */
  unidad: string;
  /** Material, volumen y empaque: lo que cambia de una presentación a otra. */
  caracteristicas: string[];
  /** Solo cuando difiere de la descripción del producto. */
  descripcion?: string;
  /**
   * Traducción, cuando el dato la trae consigo. La copia local no la lleva:
   * la suya vive en `i18n/productos-en.ts`, que es el respaldo.
   */
  en?: EnPresentacion;
}

export interface Producto {
  slug: string;
  nombre: string;
  /** Slug de la línea a la que pertenece. */
  linea: string;
  /** Slug de la categoría dentro de esa línea. */
  categoria: string;
  descripcion: string;
  presentaciones: Presentacion[];
  destacado?: boolean;
  en?: { nombre?: string; descripcion?: string };
}

export interface Categoria {
  slug: string;
  nombre: string;
  /** Línea que la contiene. */
  linea: string;
  en?: { nombre?: string };
}

export interface Linea {
  slug: string;
  nombre: string;
  resumen: string;
  icono: string;
  en?: { nombre?: string; resumen?: string };
}

export const lineas: Linea[] = [
  {
    slug: 'bioseguridad',
    nombre: 'Bioseguridad',
    resumen:
      'Productos para la prevención y el control de riesgos biológicos en ' +
      'establecimientos de salud.',
    icono: 'bioseguridad',
  },
  {
    slug: 'instrumental-para-cirugia-laparoscopica',
    nombre: 'Instrumental para cirugía laparoscópica',
    resumen:
      'Soluciones e instrumental especializado para procedimientos quirúrgicos ' +
      'mínimamente invasivos.',
    icono: 'laparoscopia',
  },
  {
    slug: 'aspiracion',
    nombre: 'Aspiración',
    resumen:
      'Dispositivos y accesorios para la aspiración de secreciones y fluidos.',
    icono: 'aspiracion',
  },
  {
    slug: 'antisepsia',
    nombre: 'Antisepsia',
    resumen:
      'Productos destinados a la limpieza, desinfección y preparación de la piel.',
    icono: 'antisepsia',
  },
  {
    slug: 'nutricion-enteral',
    nombre: 'Nutrición enteral',
    resumen:
      'Dispositivos y accesorios para la administración segura de nutrientes por ' +
      'vía enteral.',
    icono: 'nutricion',
  },
  {
    slug: 'higiene-del-paciente',
    nombre: 'Higiene del paciente',
    resumen:
      'Productos para el cuidado, aseo y bienestar de pacientes.',
    icono: 'higiene',
  },
  {
    slug: 'absorbente',
    nombre: 'Absorbente',
    resumen:
      'Soluciones para el manejo de fluidos y necesidades de cuidado ' +
      'hospitalario.',
    icono: 'absorbentes',
  },
  {
    slug: 'proteccion-personal',
    nombre: 'Protección personal',
    resumen:
      'Equipos y accesorios para proteger al personal de salud frente a diversos ' +
      'riesgos.',
    icono: 'proteccion',
  },
  {
    slug: 'material-medico-no-instrumental',
    nombre: 'Material médico no instrumental',
    resumen:
      'Insumos médicos descartables y productos de uso hospitalario.',
    icono: 'instrumental',
  },
  {
    slug: 'via-aerea',
    nombre: 'Vía aérea',
    resumen:
      'Dispositivos para el manejo, mantenimiento y protección de la vía aérea.',
    icono: 'viaAerea',
  },
  {
    slug: 'nutricion-parenteral',
    nombre: 'Nutrición parenteral',
    resumen:
      'Productos y accesorios para la administración intravenosa de nutrientes.',
    icono: 'nutricion',
  },
];

export const categorias: Categoria[] = [
  { slug: 'contenedores-de-bioseguridad', nombre: 'Contenedores de bioseguridad', linea: 'bioseguridad' },
  { slug: 'tapetes-adhesivos-alfombras-descontaminantes', nombre: 'Tapetes adhesivos (alfombras descontaminantes)', linea: 'bioseguridad' },
  { slug: 'trocar-para-cirugia-laparoscopica', nombre: 'Trocar para cirugía laparoscópica', linea: 'instrumental-para-cirugia-laparoscopica' },
  { slug: 'pinzas-para-cirugia-laparoscopica', nombre: 'Pinzas para cirugía laparoscópica', linea: 'instrumental-para-cirugia-laparoscopica' },
  { slug: 'bolsas-de-aspiracion', nombre: 'Bolsas de aspiración', linea: 'aspiracion' },
  { slug: 'accesorios-para-aspiracion', nombre: 'Accesorios para aspiración', linea: 'aspiracion' },
  { slug: 'tubos-de-succion-esteril', nombre: 'Tubos de succión estéril', linea: 'aspiracion' },
  { slug: 'manguera-o-tubuladura-de-silicona', nombre: 'Manguera o tubuladura de silicona', linea: 'aspiracion' },
  { slug: 'aplicadores-clorhexidina-2', nombre: 'Aplicadores con gluconato de clorhexidina al 2% + alcohol isopropílico al 70%', linea: 'antisepsia' },
  { slug: 'bolsas-de-nutricion-enteral', nombre: 'Bolsas de nutrición enteral', linea: 'nutricion-enteral' },
  { slug: 'set-de-nutricion-enteral', nombre: 'Set de nutrición enteral', linea: 'nutricion-enteral' },
  { slug: 'bomba-de-nutricion-enteral', nombre: 'Bomba de nutrición enteral', linea: 'nutricion-enteral' },
  { slug: 'pano-bano-facil', nombre: 'Paño baño fácil', linea: 'higiene-del-paciente' },
  { slug: 'toalla-para-secado-corporal', nombre: 'Toalla para secado corporal', linea: 'higiene-del-paciente' },
  { slug: 'pano-clinico-absorbente', nombre: 'Paño clínico absorbente', linea: 'higiene-del-paciente' },
  { slug: 'bolsa-emesis', nombre: 'Bolsa para emesis o bolsa para vómito', linea: 'higiene-del-paciente' },
  { slug: 'manta-absorbente-de-fluidos', nombre: 'Manta absorbente de fluidos', linea: 'absorbente' },
  { slug: 'protector-tela-impermeable', nombre: 'Protector de tela plástica impermeable', linea: 'absorbente' },
  { slug: 'guantes-de-nitrilo-sin-polvo-6-5-gr', nombre: 'Guantes de nitrilo sin polvo 6.5 GR', linea: 'proteccion-personal' },
  { slug: 'marcador-de-piel', nombre: 'Marcador de piel', linea: 'material-medico-no-instrumental' },
  { slug: 'contador-de-aguja', nombre: 'Contador de aguja', linea: 'material-medico-no-instrumental' },
  { slug: 'bolsas-para-contar-gasas', nombre: 'Bolsas para contar gasas', linea: 'material-medico-no-instrumental' },
  { slug: 'limpiador-puntas-electrocauterio', nombre: 'Limpiador de puntas de electrocauterio', linea: 'material-medico-no-instrumental' },
  { slug: 'cepillos-para-limpieza-de-instrumental-medico', nombre: 'Cepillos para limpieza de instrumental médico', linea: 'material-medico-no-instrumental' },
  { slug: 'videolaringoscopio', nombre: 'Videolaringoscopio', linea: 'via-aerea' },
  { slug: 'hojas-de-videolaringoscopio', nombre: 'Hojas de videolaringoscopio', linea: 'via-aerea' },
  { slug: 'bomba-de-infusion', nombre: 'Bomba de infusión', linea: 'nutricion-parenteral' },
  { slug: 'bomba-de-jeringa', nombre: 'Bomba de jeringa', linea: 'nutricion-parenteral' },
];

export const productos: Producto[] = [
  {
    slug: 'contenedores-punzocortantes',
    nombre: 'Contenedores de bioseguridad para punzocortantes',
    linea: 'bioseguridad',
    categoria: 'contenedores-de-bioseguridad',
    descripcion:
      'Diseñado para evitar accidentes con desechos punzocortantes y optimizar ' +
      'los procesos de manejo y descarte de residuos peligrosos en los diferentes ' +
      'establecimientos de salud.',
    destacado: true,
    presentaciones: [
      {
        medida: '0.95 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: Polipropileno rígido compostable',
          'Volumen: 0.95 L',
          'Caja x 60 unidades',
        ],
      },
      {
        medida: '1.89 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: Polipropileno rígido compostable',
          'Volumen: 1.89 L',
          'Caja x 40 unidades',
        ],
      },
      {
        medida: '4.7 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 4.7 L',
          'Caja x 20 unidades',
        ],
        descripcion:
          'Contenedor para desechos punzocortantes, diseñado para optimizar los ' +
          'procesos de manejo y descarte de residuos peligrosos, con una sola mano, ' +
          'en los diferentes establecimientos de salud. Constituido de dos partes ' +
          '(cuerpo y tapa).',
      },
      {
        medida: '7.6 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 7.6 L',
          'Caja x 24 unidades',
        ],
      },
      {
        medida: '11.4 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 11.4 L',
          'Caja x 12 unidades',
        ],
      },
      {
        medida: '22.7 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 22.7 L',
          'Caja x 12 unidades',
        ],
      },
      {
        medida: '30.3 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 30.3 L',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'contenedores-residuos-citotoxicos',
    nombre: 'Contenedores para residuos citotóxicos',
    linea: 'bioseguridad',
    categoria: 'contenedores-de-bioseguridad',
    descripcion:
      'Diseñado para evitar accidentes con artículos punzocortantes y facilitar ' +
      'la manipulación y desecho de residuos citostáticos de las unidades ' +
      'especializadas de los centros sanitarios.',
    presentaciones: [
      {
        medida: '3.8 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 3.8 L (1 G)',
          'Caja x 24 unidades',
        ],
      },
      {
        medida: '7.6 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 7.6 L (2 G)',
          'Caja x 24 unidades',
        ],
      },
      {
        medida: '30.3 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 30.3 L',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'contenedores-residuos-vidrio',
    nombre: 'Contenedores para residuos de vidrios o especiales',
    linea: 'bioseguridad',
    categoria: 'contenedores-de-bioseguridad',
    descripcion:
      'Diseñado para evitar accidentes con artículos punzocortantes y facilitar ' +
      'la manipulación y desecho de residuos especiales de vidrio de las unidades ' +
      'especializadas de los centros sanitarios.',
    presentaciones: [
      {
        medida: '3.8 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 3.8 L',
          'Caja x 24 unidades',
        ],
        descripcion:
          'Diseñado para evitar accidentes con artículos punzocortantes y facilitar ' +
          'la manipulación y desecho de residuos de vidrio de las unidades ' +
          'especializadas de los centros sanitarios.',
      },
      {
        medida: '7.6 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 7.6 L',
          'Caja x 24 unidades',
        ],
      },
      {
        medida: '30.3 L',
        marca: 'MAXCON',
        marcaSlug: 'maxcon',
        unidad: 'unidades',
        caracteristicas: [
          'Material: polipropileno rígido compostable',
          'Volumen : 30.3 L',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'tapete-adhesivo-descontaminante',
    nombre: 'Tapete adhesivo descontaminante 36" x 45"',
    linea: 'bioseguridad',
    categoria: 'tapetes-adhesivos-alfombras-descontaminantes',
    descripcion:
      'El tapete adhesivo para salas limpia, es un tapete multicapa, compuesto ' +
      'por 30 hojas de polietileno. Cada hoja está recubierta con un adhesivo de ' +
      'alta tecnología que contiene sustancias antibacterianas. Gracias a las ' +
      'sustancias antibacterianas impregnadas en la superficie adhesiva, los ' +
      'tapetes antibacterianos pueden capturar eficazmente la suciedad, los ' +
      'gérmenes y el polvo del tráfico peatonal y de las ruedas de los equipos ' +
      'antes de que entren en el entorno controlado.',
    presentaciones: [
      {
        medida: '36" X 45"',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 4 und',
        caracteristicas: [
          'Hojas o Láminas: PE de baja densidad',
          'Material adhesivo: acrílico en solución acuosa a base de agua para agentes antibacterianos.',
          'Sustancia antibacteriana: Isotiazolinona',
          'Caja x 4 unidades',
        ],
      },
    ],
  },
  {
    slug: 'trocar-para-cirugia-laparoscopica',
    nombre: 'Trocar para cirugía laparoscópica',
    linea: 'instrumental-para-cirugia-laparoscopica',
    categoria: 'trocar-para-cirugia-laparoscopica',
    descripcion:
      'Dispositivo médico diseñado para crear un canal de trabajo del medio ' +
      'interno, para ingreso de instrumentos quirúrgicos.',
    destacado: true,
    presentaciones: [
      {
        medida: '5 MM',
        marca: 'GEYI',
        marcaSlug: 'geyi',
        unidad: 'unidades',
        caracteristicas: [
          'Material Componentes Trocar',
          'Cánula con llave de paso:',
          '- Cánula: Policarbonato (PC)',
          '- Base de la cánula: Acrilonitrilo Butadieno Estireno (ABS)',
          '- Tapa de ajuste: ABS',
          '- Válvula de llenado: PC',
          'Punzón u Obturador:',
          '- Cuchilla: acero inoxidable 304',
          '- Aguja de punción: ABS',
          '- Barra de conexión tipo III: ABS',
          '- Casquete tipo alfiler: PC',
        ],
      },
      {
        medida: '10 MM',
        marca: 'GEYI',
        marcaSlug: 'geyi',
        unidad: 'unidades',
        caracteristicas: [
          'Material Componentes Trocar',
          'Cánula con llave de paso:',
          '- Cánula: Policarbonato (PC)',
          '- Base de la cánula: Acrilonitrilo Butadieno Estireno (ABS)',
          '- Tapa de ajuste: ABS',
          '- Válvula de llenado: PC',
          'Punzón u Obturador:',
          '- Cuchilla: acero inoxidable 304',
          '- Aguja de punción: ABS',
          '- Barra de conexión tipo III: ABS',
          '- Casquete tipo alfiler: PC',
        ],
      },
      {
        medida: '12 MM',
        marca: 'GEYI',
        marcaSlug: 'geyi',
        unidad: 'unidades',
        caracteristicas: [
          'Material Componentes Trocar',
          'Cánula con llave de paso:',
          '- Cánula: Policarbonato (PC)',
          '- Base de la cánula: Acrilonitrilo Butadieno Estireno (ABS)',
          '- Tapa de ajuste: ABS',
          '- Válvula de llenado: PC',
          'Punzón u Obturador:',
          '- Cuchilla: acero inoxidable 304',
          '- Aguja de punción: ABS',
          '- Barra de conexión tipo III: ABS',
          '- Casquete tipo alfiler: PC',
        ],
      },
      {
        medida: 'KIT A',
        marca: 'GEYI',
        marcaSlug: 'geyi',
        unidad: 'unidades',
        caracteristicas: [
          '- 2 piezas de cánula de 5 mm con llave de paso,',
          '- 2 piezas de cánula de 10 mm con llave de paso,',
          '- 1 pieza de obturador con punta dilatadora de 5 mm,',
          '- 1 pieza de obturador con punta dilatadora de 10 mm,',
          '- 1 pieza de aguja de Veress de 2.1 mm x 120 mm,',
          '- 1 bolsa estándar de 250 mL.',
        ],
      },
      {
        medida: 'KIT B',
        marca: 'GEYI',
        marcaSlug: 'geyi',
        unidad: 'unidades',
        caracteristicas: [
          '- 2 piezas de cánula de 5 mm con llave de paso,',
          '- 1 piezas de cánula de 10 mm con llave de paso,',
          '- 1 pieza de obturador con punta dilatadora de 5 mm,',
          '- 1 pieza de obturador con punta dilatadora de 10 mm,',
          '- 1 pieza de aguja de Veress de 2.1 mm x 120 mm,',
          '- 1 bolsa estándar de 250 mL.',
        ],
      },
      {
        medida: 'KIT C',
        marca: 'GEYI',
        marcaSlug: 'geyi',
        unidad: 'unidades',
        caracteristicas: [
          '- 3 piezas de cánula de 5 mm con llave de paso,',
          '- 1 piezas de cánula de 10 mm con llave de paso,',
          '- 1 pieza de obturador con punta dilatadora de 5 mm,',
          '- 1 pieza de obturador con punta dilatadora de 10 mm,',
          '- 1 pieza de aguja de Veress de 2.1 mm x 120 mm,',
          '- 1 bolsa estándar de 250 mL.',
        ],
      },
    ],
  },
  {
    slug: 'disector-monopolar-maryland',
    nombre: 'Disector monopolar desechable - maryland',
    linea: 'instrumental-para-cirugia-laparoscopica',
    categoria: 'pinzas-para-cirugia-laparoscopica',
    descripcion:
      'El Dissector Maryland Monopolar es un instrumento quirúrgico diseñado para ' +
      'efectuar disecciones en el tejido durante un procedimiento quirúrgico ' +
      'laparoscópico.',
    presentaciones: [
      {
        medida: '107Y.201',
        marca: 'KANGJI',
        unidad: 'unidades',
        caracteristicas: [
          'Material componentes:',
          'Electrodo (punta Disector):',
          '- Acero inoxidable 304 (Al 304)',
          'Tubo de aislamiento:',
          '- Polietileno de Alta Densidad (HDPE) y politetrafluoroetileno o teflón (PTFE).',
          'Perilla de rotación',
          '- Acrilonitrilo Butadieno Estireno (ABS) y Polifenilsulfona (PPSU).',
          'Mango',
          '- ABS',
          'Conector de electrodo (pin)',
          '- Al 304',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'pinza-agarre-clinch',
    nombre: 'Pinza de agarre o tenaza monopolar desechable - clinch',
    linea: 'instrumental-para-cirugia-laparoscopica',
    categoria: 'pinzas-para-cirugia-laparoscopica',
    descripcion:
      'El Disposable Monopolar Grasper, es un instrumento quirúrgico que posee un ' +
      'electrodo tipo Grasper (tenaza) necesaria para cuando se requiere sujetar ' +
      'el tejido durante el procedimiento quirúrgico laparoscópico.',
    presentaciones: [
      {
        medida: '108Y.201',
        marca: 'KANGJI',
        unidad: 'unidades',
        caracteristicas: [
          'Material componentes:',
          'Electrodo (punta Disector):',
          '- Acero inoxidable 304 (Al 304)',
          'Tubo de aislamiento:',
          '- Polietileno de Alta densidad (HDPE) y politetrafluoroetileno o teflón (PTFE).',
          'Perilla de rotación',
          '- Acrilonitrilo Butadieno Estireno (ABS) y Polifenilsulfona (PPSU).',
          'Mango',
          '- ABS',
          'Conector de electrodo (pin)',
          '- Al 304',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'pinza-agarre-fenestrated-grasper',
    nombre: 'Pinza de agarre o tenaza monopolar desechable - fenestrated grasper',
    linea: 'instrumental-para-cirugia-laparoscopica',
    categoria: 'pinzas-para-cirugia-laparoscopica',
    descripcion:
      'El Disposable Monopolar Grasper, es un instrumento quirúrgico que posee un ' +
      'electrodo tipo Grasper (tenaza) necesaria para cuando se requiere sujetar ' +
      'el tejido durante el procedimiento quirúrgico laparoscópico.',
    presentaciones: [
      {
        medida: '108Y.202',
        marca: 'KANGJI',
        unidad: 'unidades',
        caracteristicas: [
          'Material componentes:',
          'Electrodo (punta Disector):',
          '- Acero inoxidable 304 (Al 304)',
          'Tubo de aislamiento:',
          '- Polietileno de Alta densidad (HDPE) y politetrafluoroetileno o teflón (PTFE).',
          'Perilla de rotación',
          '- Acrilonitrilo Butadieno Estireno (ABS) y Polifenilsulfona (PPSU).',
          'Mango',
          '- ABS',
          'Conector de electrodo (pin)',
          '- AI 304',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'tijeras-monopolares-curved-scissor',
    nombre: 'Tijeras monopolares desechables - curved scissor',
    linea: 'instrumental-para-cirugia-laparoscopica',
    categoria: 'pinzas-para-cirugia-laparoscopica',
    descripcion:
      'Las tijeras monopolares desechables son un tipo de instrumento quirúrgico ' +
      'laparoscópico diseñado con un mecanismo de ranura de engranajes y un ' +
      'aislamiento adicional para mayor seguridad, con el fin de reducir el ' +
      'riesgo de quemaduras en el lugar de la acción durante la diatermia.',
    presentaciones: [
      {
        medida: '106Y.201',
        marca: 'KANGJI',
        unidad: 'unidades',
        caracteristicas: [
          'Material componentes:',
          'Electrodo (punta Disector):',
          '- Acero inoxidable 304 (Al 304)',
          'Tubo de aislamiento:',
          '- Polietileno de Alta densidad (HDPE) y politetrafluoroetileno o teflón (PTFE).',
          'Perilla de rotación',
          '- Acrilonitrilo Butadieno Estireno (ABS) y Polifenilsulfona (PPSU).',
          'Mango',
          '- ABS',
          'Conector de electrodo (pin)',
          '- AI 304',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'bolsa-aspiracion-secreciones',
    nombre: 'Bolsa de aspiración de secreciones con válvula y filtro antibacteriano',
    linea: 'aspiracion',
    categoria: 'bolsas-de-aspiracion',
    descripcion:
      'En lo que respecta a las bolsas de succión, en particular, son ' +
      'descartables y funcionan con un contenedor o canister reusable, el que es ' +
      'colocado, a petición del usuario, en los diferentes ambientes ' +
      'hospitalarios según sus necesidades. Todas las bolsas de succión, están ' +
      'diseñadas para ser utilizados por un solo paciente.',
    destacado: true,
    presentaciones: [
      {
        medida: '1 L',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales:',
          '- Tapa: Polietileno (PE)',
          '- Forro o bolsa: PE + Poliamida (PA)',
          '- Filtro: Polietileno de Peso Molecular Ultra Alto (UHMWPE).',
          '- Codo de unión: PE',
          'Caja x 50 unidades',
        ],
      },
      {
        medida: '1.5 L',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales:',
          '- Tapa: Polietileno (PE)',
          '- Forro o bolsa: PE + Poliamida (PA)',
          '- Filtro: Polietileno de Peso Molecular Ultra Alto (UHMWPE).',
          '- Codo de unión: PE',
          'Caja x 50 unidades',
        ],
      },
      {
        medida: '3 L',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales:',
          '- Tapa: Polietileno (PE)',
          '- Forro o bolsa: PE + Poliamida (PA)',
          '- Filtro: Polietileno de Peso Molecular Ultra Alto (UHMWPE).',
          '- Codo de unión: PE',
          'Caja x 50 unidades',
        ],
      },
      {
        medida: '1.5 L',
        marca: 'QUICK FIT - BEMIS',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales:',
          '- Tapa: polietileno de baja densidad, color amarillo',
          '- Forro o cuerpo de la bolsa: polietileno de baja densidad mas Nailon multicapa (PA)',
          '- Válvula mecánica: Tereftalato de Polietileno.',
          'Caja x 50 unidades',
        ],
        descripcion:
          'Dispositivo Médico diseñado para succionar, transportar y eliminar ' +
          'líquidos contaminantes, aspirados de las cavidades corporales de forma ' +
          'eficiente y segura para el personal sanitario.',
      },
      {
        medida: '3 L',
        marca: 'QUICK FIT - BEMIS',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales:',
          '- Tapa: polietileno de baja densidad, color rosado',
          '- Forro o cuerpo de la bolsa: polietileno de baja densidad más Nailon multicapa (PA)',
          '- Válvula mecánica: Tereftalato de Polietileno.',
          'Caja x 50 unidades',
        ],
        descripcion:
          'Dispositivo Médico diseñado para succionar, transportar y eliminar ' +
          'líquidos contaminantes, aspirados de las cavidades corporales de forma ' +
          'eficiente y segura para el personal sanitario.',
      },
    ],
  },
  {
    slug: 'canister-rigido-reusable',
    nombre: 'Cánister rígido reusable',
    linea: 'aspiracion',
    categoria: 'accesorios-para-aspiracion',
    descripcion:
      'Los canister, marca VIDE®, están destinados a ser utilizados como soporte ' +
      'y contenedor de las bolsas de aspiración de la misma marca. Provistos de ' +
      'una llave de paso y una manguera conectora que se adapta en la bolsa de ' +
      'aspiración. Son totalmente transparentes y cilíndricas y presentan ' +
      'graduación en mL y cc.',
    presentaciones: [
      {
        medida: '1 L',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales',
          '- Canister: Policarbonato (PC)',
          '- Llave de paso: PC',
          '- Manguera conectora: Policloruro de vinilo (PVC)',
          'Presentaciones:',
          '- 1 L y 1.5 L: caja x 20 unidades',
          '- 3 L: caja x 12 unidades',
        ],
      },
      {
        medida: '1.5 L',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales',
          '- Canister: Policarbonato (PC)',
          '- Llave de paso: PC',
          '- Manguera conectora: Policloruro de vinilo (PVC)',
          'Presentaciones:',
          '- 1 L y 1.5 L: caja x 20 unidades',
          '- 3 L: caja x 12 unidades',
        ],
      },
      {
        medida: '3 L',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Materiales',
          '- Canister: Policarbonato (PC)',
          '- Llave de paso: PC',
          '- Manguera conectora: Policloruro de vinilo (PVC)',
          'Presentaciones:',
          '- 1 L y 1.5 L: caja x 20 unidades',
          '- 3 L: caja x 12 unidades',
        ],
      },
      {
        medida: '1.5 L',
        marca: 'QUICK FIT - BEMIS',
        unidad: 'unidades',
        caracteristicas: [
          'Material: Canister de policarbonato con tubo de vacío de vinil reforzado.',
          'Caja x 10 unidades',
        ],
        descripcion:
          'Canister con llave de paso para su uso con la bolsa de recolección de ' +
          'secreciones y liquídos de 1.5L marca QuickFit®.',
      },
      {
        medida: '3 L',
        marca: 'QUICK FIT - BEMIS',
        unidad: 'unidades',
        caracteristicas: [
          'Material: Canister de policarbonato con tubo de vacío de vinil reforzado.',
          'Caja x 10 unidades',
        ],
        descripcion:
          'Canister con llave de paso para su uso con la bolsa de recolección de ' +
          'secreciones y liquídos de 3L marca QuickFit®.',
      },
    ],
  },
  {
    slug: 'coches-rodables',
    nombre: 'Coches rodables',
    linea: 'aspiracion',
    categoria: 'accesorios-para-aspiracion',
    descripcion: '',
    presentaciones: [
      {
        medida: '37 CM',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Fijos y rodantes de Policarbonato y PVC.',
        ],
      },
      {
        medida: '56 CM',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Fijos y rodantes de Policarbonato y PVC.',
        ],
      },
      {
        medida: '106 CM',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Fijos y rodantes de Policarbonato y PVC.',
        ],
      },
    ],
  },
  {
    slug: 'placas-de-anclaje-para-pared',
    nombre: 'Placas de anclaje para pared',
    linea: 'aspiracion',
    categoria: 'accesorios-para-aspiracion',
    descripcion: '',
    presentaciones: [
      {
        medida: '',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Hechos de un copolímero de Policarbonato y Siloxano.',
        ],
      },
    ],
  },
  {
    slug: 'manifold',
    nombre: 'Manifold',
    linea: 'aspiracion',
    categoria: 'accesorios-para-aspiracion',
    descripcion: '',
    presentaciones: [
      {
        medida: '2 VÍAS',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Manguera para el soporte sobre ruedas.',
        ],
      },
      {
        medida: '4 VÍAS',
        marca: 'VIDE® - ALLEVA MEDICAL',
        marcaSlug: 'alleva-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Manguera para el soporte sobre ruedas.',
        ],
      },
    ],
  },
  {
    slug: 'tubo-succion-sin-yankauer',
    nombre: 'Tubo de succión sin yankauer, con conectores y adaptador de 9/32” (7 MM)',
    linea: 'aspiracion',
    categoria: 'tubos-de-succion-esteril',
    descripcion:
      'Dispositivo Médico desechable. Constituido por 01 tubo de conexión, 02 ' +
      'conectores y 01 adaptador. Especial para la conducción de fluidos ' +
      'corporales aspirados como sangre y secreciones durante los procesos ' +
      'quirúrgicos. Se puede utilizar también, para conducir otros líquidos y ' +
      'gases medicinales.',
    presentaciones: [
      {
        medida: '1.8 M',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Material: Policloruro de vinilo.',
        ],
      },
      {
        medida: '3 M',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidades',
        caracteristicas: [
          'Material: Policloruro de vinilo.',
        ],
      },
    ],
  },
  {
    slug: 'manguera-o-tubuladura-de-silicona',
    nombre: 'Manguera o tubuladura de silicona',
    linea: 'aspiracion',
    categoria: 'manguera-o-tubuladura-de-silicona',
    descripcion:
      'Mangueras en rollo 100% silicona, insumo que puede ser acondicionado para ' +
      'diversos usos . Cada rollo tiene una longitud de 25 m y diámetros ' +
      'variables.',
    presentaciones: [
      {
        medida: '6 MM X 9 MM',
        marca: 'SILPAK',
        marcaSlug: 'silpak',
        unidad: 'rollo x 25 m',
        caracteristicas: [
          'Material: 100% silicona (Silbione MM 71160 U): comprende gomas de polimetil fenil siloxano y sílice.',
        ],
      },
      {
        medida: '7 MM X 10 MM',
        marca: 'SILPAK',
        marcaSlug: 'silpak',
        unidad: 'rollo x 25 m',
        caracteristicas: [
          'Material: 100% silicona (Silbione MM 71160 U): comprende gomas de polimetil fenil siloxano y sílice.',
        ],
      },
      {
        medida: '7MM X 12 MM',
        marca: 'SILPAK',
        marcaSlug: 'silpak',
        unidad: 'rollo x 25 m',
        caracteristicas: [
          'Material: 100% silicona (Silbione MM 71160 U): comprende gomas de polimetil fenil siloxano y sílice.',
        ],
      },
      {
        medida: '8MM X 12 MM',
        marca: 'SILPAK',
        marcaSlug: 'silpak',
        unidad: 'rollo x 25 m',
        caracteristicas: [
          'Material: 100% silicona (Silbione MM 71160 U): comprende gomas de polimetil fenil siloxano y sílice.',
        ],
      },
    ],
  },
  {
    slug: 'aplicadores-clorhexidina-2',
    nombre: 'Aplicadores con gluconato de clorhexidina al 2% + alcohol isopropílico al 70%',
    linea: 'antisepsia',
    categoria: 'aplicadores-clorhexidina-2',
    descripcion:
      'Es un aplicador desechable, que contiene una avanzada solución antiséptica ' +
      'compuesta de gluconato de clorhexidina al 2% en alcohol Isopropílico (IPA) ' +
      'al 70%; con un amplio espectro de acción biocida contra bacterias, ' +
      'microbacterias, hongos y virus. El diseño de ésta producto, se ha ' +
      'desarrollado para satisfacer la necesidad de desinfectar diversas zonas ' +
      'del paciente sin tocarlo directamente.',
    destacado: true,
    presentaciones: [
      {
        medida: '3 ML',
        marca: 'NEX CLOREX',
        marcaSlug: 'nex-medical',
        unidad: 'caja x 10 und',
        caracteristicas: [
          'Composición: cada 100 g de producto contiene:',
          '• Gluconato de clorhexidina 2.00 g',
          '• Alcohol isopropílico 70% 62.00 g',
          '• Coformulante* y agua c.s.p 100.00 g',
        ],
      },
      {
        medida: '10.5 ML',
        marca: 'NEX CLOREX',
        marcaSlug: 'nex-medical',
        unidad: 'caja x 11 und',
        caracteristicas: [
          'Composición: cada 100 g de producto contiene:',
          '• Gluconato de clorhexidina 2.00 g',
          '• Alcohol isopropílico 70% 62.00 g',
          '• Coformulante* y agua c.s.p 100.00 g',
        ],
      },
      {
        medida: '26 ML',
        marca: 'NEX CLOREX',
        marcaSlug: 'nex-medical',
        unidad: 'caja x 11 und',
        caracteristicas: [
          'Composición: cada 100 g de producto contiene:',
          '• Gluconato de clorhexidina 2.00 g',
          '• Alcohol isopropílico 70% 62.00 g',
          '• Coformulante* y agua c.s.p 100.00 g',
        ],
      },
      {
        medida: '3 ML',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 30 und',
        caracteristicas: [
          'COMPONENTES Y MATERIALES',
          '- Esponja: Poliuretano grado médico.',
          '- Cuerpo del mango: Acrilonitrilo Butadieno Estireno (ABS) blanco.',
        ],
      },
      {
        medida: '10.5 ML',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 25 und',
        caracteristicas: [
          'COMPONENTES Y MATERIALES',
          '- Esponja: Poliuretano grado médico.',
          '- Cuerpo del mango: Acrilonitrilo Butadieno Estireno (ABS) blanco.',
        ],
      },
      {
        medida: '26 ML',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 15 und',
        caracteristicas: [
          'COMPONENTES Y MATERIALES',
          '- Esponja: Poliuretano grado médico.',
          '- Cuerpo del mango: Acrilonitrilo Butadieno Estireno (ABS) blanco.',
        ],
      },
      {
        medida: '3 ML',
        marca: 'PREP BIO CHX',
        unidad: 'caja x 10 und',
        caracteristicas: [
          '• Esponja: Poliuretano de grado médico',
          '• Cuerpo: Resina de polipropileno (HDPP)',
          '• Émbolo: Resina de polipropileno (HDPP)',
          '• Solución Antiséptica: Gluconato de clorhexidina al 2% y alcohol isopropílico al 70%',
        ],
      },
      {
        medida: '6 ML',
        marca: 'PREP BIO CHX',
        unidad: 'caja x 06 und',
        caracteristicas: [
          '• Esponja: Poliuretano de grado médico',
          '• Cuerpo: Resina de polipropileno (HDPP)',
          '• Émbolo: Resina de polipropileno (HDPP)',
          '• Solución Antiséptica: Gluconato de clorhexidina al 2% y alcohol isopropílico al 70%',
        ],
      },
      {
        medida: '26 ML',
        marca: 'PREP BIO CHX',
        unidad: 'caja x 01 und',
        caracteristicas: [
          '• Esponja: Poliuretano de grado médico',
          '• Cuerpo: Resina de polipropileno (HDPP)',
          '• Émbolo: Resina de polipropileno (HDPP)',
          '• Solución Antiséptica: Gluconato de clorhexidina al 2% y alcohol isopropílico al 70%',
        ],
      },
    ],
  },
  {
    slug: 'cepillo-esponja-clorhexidina-4',
    nombre: 'Cepillo esponja con 20 ML de gluconato de clorhexidina al 4%',
    linea: 'antisepsia',
    categoria: 'aplicadores-clorhexidina-2',
    descripcion:
      'NEX CLOREX C2 Cepillo/Esponja CHG 4%, es un cepillo-esponja de limpieza ' +
      'quirúrgico, de un solo uso, con limpia uñas; impregnado con ' +
      'aproximadamente 20 mL de solución antiséptica de limpieza (Digluconato de ' +
      'Clorhexidina).',
    presentaciones: [
      {
        medida: '',
        marca: 'NEX CLOREX C2',
        marcaSlug: 'nex-medical',
        unidad: 'caja x 40 und',
        caracteristicas: [
          '- Esponja: material de poliuretano de grado médico.',
          '- Mango y cerdas: Polietileno de grado médico.',
          '- Limpia-uñas: material de polipropileno.',
        ],
      },
    ],
  },
  {
    slug: 'esponja-clorhexidina-2',
    nombre: 'Esponja con gluconato de clorhexidina al 2% (20 ML)',
    linea: 'antisepsia',
    categoria: 'aplicadores-clorhexidina-2',
    descripcion:
      'Esponja de Poliuretano desechable para lavado antiséptico de la piel, ' +
      'impregnada con aproximadamente 20 mL de solución antiséptica de amplio ' +
      'espectro. Es un antiséptico para piel sana. Biocida para la higiene ' +
      'humana.',
    presentaciones: [
      {
        medida: '',
        marca: 'NEX CLOREX C2',
        marcaSlug: 'nex-medical',
        unidad: 'caja x 80 und',
        caracteristicas: [
          '- Esponja desechable de poliuretano de dimensiones (Largo: 12.00 cm; Ancho: 8.00 cm; Alto: 2.50 cm)',
        ],
      },
    ],
  },
  {
    slug: 'toallita-limpieza-piel-clorhexidina',
    nombre: 'Toallita para limpieza de piel con clorhexidina al 2% + alcohol isopropílico al 70%',
    linea: 'antisepsia',
    categoria: 'aplicadores-clorhexidina-2',
    descripcion:
      'Toallita desechable impregnada con solución antiséptica (Gluconato de ' +
      'Clorhexidina al 2% en Alcohol Isopropílico al 70%) para limpieza de piel ' +
      'sana.',
    presentaciones: [
      {
        medida: '',
        marca: 'LONGOOD',
        marcaSlug: 'longood',
        unidad: 'caja x 200 und',
        caracteristicas: [
          '- Toallita: elaborada con tela no tejida en base a fibras de poliéster de color blancas.',
          '- Dimensiones de la toallita:',
          '• Long. lado corto: 6.3 cm ± 0.1 cm',
          '• Long. lado largo: 7.7 cm ± 0.1 cm',
          '• Area: 48.51 cm2 aproximadamente.',
        ],
      },
    ],
  },
  {
    slug: 'bolsas-de-nutricion-enteral',
    nombre: 'Bolsas de nutrición enteral',
    linea: 'nutricion-enteral',
    categoria: 'bolsas-de-nutricion-enteral',
    descripcion:
      'Dispositivo Médico destinado a usarse con fórmulas enterales y con ' +
      'dispositivos de acceso enteral. No es para uso intravenoso.',
    presentaciones: [
      {
        medida: '500 ML',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 30 und',
        caracteristicas: [
          'COMPOSICIÓN Y COLOR',
          '- Puerto (boca) y tapón protector con asa de sujeción: PVC libre de DEHP, color violeta.',
          '- Bolsa: Policloruro de Vinilo (PVC), libre de Di-etil-hexil-ftalato (DEHP); color transparente.',
          '- Tubo conductor: PVC libre de DEHP, transparente',
          '- Abrazadera de Rodillo: Acrilonitrilo Butadieno Estireno (ABS), color violeta.',
          '- Cámara de goteo: PVC libre de DEHP, color transparente y flexible.',
          '- Segmento de tubo conductor flexible: Silicona, incolora.',
          '- Magneto: Magnetita, color negro',
          '- Clamp o abrazadera de seguridad: Polipropileno (PP), color violeta',
          '- Llave en “Y”: PVC libre de DEHP, cuerpo transparente; con tapa de cierre Luer Lock, color violeta.',
          '- Etiqueta de precaución: papel',
          '- Conector ENFit: ABS, color violeta',
          '- Conector escalonado 5 en 1: PVC libre de DEHP, color violeta',
          '- Tapa protectora del adaptador: Polipropileno (PP), color transparente.',
        ],
      },
      {
        medida: '1000 ML',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 30 und',
        caracteristicas: [
          'COMPOSICIÓN Y COLOR',
          '- Puerto (boca) y tapón protector con asa de sujeción: PVC libre de DEHP, color violeta.',
          '- Bolsa: Policloruro de Vinilo (PVC), libre de Di-etil-hexil-ftalato (DEHP); color transparente.',
          '- Tubo conductor: PVC libre de DEHP, transparente',
          '- Abrazadera de Rodillo: Acrilonitrilo Butadieno Estireno (ABS), color violeta.',
          '- Cámara de goteo: PVC libre de DEHP, color transparente y flexible.',
          '- Segmento de tubo conductor flexible: Silicona, incolora.',
          '- Magneto: Magnetita, color negro',
          '- Clamp o abrazadera de seguridad: Polipropileno (PP), color violeta',
          '- Llave en “Y”: PVC libre de DEHP, cuerpo transparente; con tapa de cierre Luer Lock, color violeta.',
          '- Etiqueta de precaución: papel',
          '- Conector ENFit: ABS, color violeta',
          '- Conector escalonado 5 en 1: PVC libre de DEHP, color violeta',
          '- Tapa protectora del adaptador: Polipropileno (PP), color transparente.',
        ],
      },
    ],
  },
  {
    slug: 'set-de-nutricion-enteral',
    nombre: 'Set de nutrición enteral',
    linea: 'nutricion-enteral',
    categoria: 'set-de-nutricion-enteral',
    descripcion:
      'El Enteral Feeding Bottle Set (Set de alimentación enteral con rosca para ' +
      'frasco), es un tipo de dispositivo que se utiliza con una bolsa de ' +
      'alimentación enteral y un tubo estomacal. Durante su uso está conectado al ' +
      'tubo estomacal que se inserta en el estómago del paciente a través del ' +
      'conector del tubo, de tal manera que logra proporcionar solución nutritiva ' +
      'a los pacientes de forma directa.',
    presentaciones: [
      {
        medida: '',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 30 und',
        caracteristicas: [
          'COMPOSICIÓN Y COLOR',
          '1. Tapa del conector: Cloruro de Polivinilo o Policloruro de Vinilo (PVC), color transparente.',
          '2. Conector: PVC, color violeta',
          '3. Señal de advertencia: Cartulina, color blanco',
          '4. Llave en “Y” para limpieza de tubería: PVC, color del cuerpo transparente y tapa violeta.',
          '5. Llave de control tipo carretilla: PVC, color violeta',
          '6. Imán: Sustancia ferrosa, color negro',
          '7. Porción elástica de tubo conductor: Silicona o Silicona, color transparente',
          '8. Cámara de goteo flexible y transparente: PVC, color transparente',
          '9. Clamp de seguridad: PVC, color violeta',
          '10. Tubo conductor transparente: PVC, color transparente.',
          '11. Punta de penetración tipo espiga en “X”, con rosca: PVC, color violeta',
          '12. Tapa con rosca para frasco o contenedor de alimentación: PVC, color violeta',
          '• Bolsa de soporte: Polietileno (PE), color transparente',
        ],
      },
    ],
  },
  {
    slug: 'bomba-de-nutricion-enteral',
    nombre: 'Bomba de nutrición enteral',
    linea: 'nutricion-enteral',
    categoria: 'bomba-de-nutricion-enteral',
    descripcion:
      'La Enteral Feeding Pump, es una bomba de alimentación enteral fácil de ' +
      'operar. Diseñada con varios programas de seguridad. Viene con una función ' +
      'anti-oclusión automática. Asimismo, está provista de una pantalla táctil ' +
      'de cuatro pulgadas, carcasa robusta y calentador opcional.',
    presentaciones: [
      {
        medida: 'EP-60',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'Fabricado con diversos plásticos de alto impacto (Polioximetileno - POM, Acrilonitrilo butadieno estireno - ABS, Nailon y fibra de vidrio, Policarbonato - PC), Silicona, Acero inoxidable SUS303 y Aleación de aluminio.',
        ],
      },
    ],
  },
  {
    slug: 'pano-bano-facil',
    nombre: 'Paño baño fácil',
    linea: 'higiene-del-paciente',
    categoria: 'pano-bano-facil',
    descripcion:
      'Paño de tela no tejida embebida con una sustancia jabonosa para higiene ' +
      'personal.',
    presentaciones: [
      {
        medida: 'MANZANILLA',
        marca: 'BAÑO FÁCIL',
        marcaSlug: 'bano-facil',
        unidad: 'paq x 10 und',
        caracteristicas: [
          'COMPONENTES Y MATERIALES',
          '- Paño: 100% Fibra de Poliéster virgen',
          '- Solución jabonosa:',
          '• Agua: 66.6992% (Solvente)',
          '• Lauril Sulfato de Sodio Etoxilado: 30.0000% (Espumante, Surfactante, Limpiador)',
          '• Extracto Glicólico de Manzanilla: 0.0250% (Acondicionante de la piel)',
          '• Cocoamido Dea: 1.3000% (Emulsificante, Surfactante)',
          '• Ácido Cítrico: 0.0340% (Tamponante)',
          '• Benzoato de Sodio: 0.1000% (Preservante)',
          '• Propilenglicol: 1.5000% (Acondicionante de la piel, humectante)',
          '• Colorante C.I. 16255: 0.0018% (Aportante de color)',
          '• Fragancia: 0.3400% (Perfumante)',
        ],
      },
      {
        medida: 'ALOE VERA',
        marca: 'BAÑO FÁCIL',
        marcaSlug: 'bano-facil',
        unidad: 'paq x 10 und',
        caracteristicas: [
          'COMPONENTES Y MATERIALES',
          '- Paño: 100% Fibra de Poliéster virgen',
          '- Solución jabonosa:',
          '• Agua: 66.6742% (Solvente)',
          '• Lauril Sulfato de Sodio Etoxilado: 30.0000% (Espumante, Surfactante, Limpiador)',
          '• Extracto Glicólico de Manzanilla: 0.0250% (Acondicionante de la piel)',
          '• Extracto Glicólico de Aloe vera: 0.0250% (Acondicionante de la piel)',
          '• Propilenglicol: 1.5000% (Acondicionante de la piel, humectante)',
          '• Cocoamido Dea: 1.3000% (Emulsificante, Surfactante)',
          '• Ácido Cítrico: 0.0340% (Tamponante)',
          '• Benzoato de Sodio: 0.1000% (Preservante)',
          '• Colorante C.I. 42090: 0.0018% (Aportante de color)',
          '• Fragancia: 0.3400% (Perfumante)',
        ],
      },
      {
        medida: 'CLORHEXIDINA',
        marca: 'BAÑO FÁCIL',
        marcaSlug: 'bano-facil',
        unidad: 'paq x 5 und',
        caracteristicas: [
          'COMPOSICIÓN Y MATERIALES',
          '- Paño: 100% Fibra de Poliéster virgen',
          '- Solución jabonosa:',
          '• Agua: 85.723% (Solvente)',
          '• Óxido de amina: 6.000% (Limpiador, Surfactante)',
          '• Poliglucosa: 6.000% (Surfactante)',
          '• Clorhexidina Digluconato (Sol. Acuosa al 20%): 2.000% (Preservante, Antimicótico)',
          '• Ácido Cítrico: 0.025% (Tamponante)',
          '• Fragancia: 0.250% (Perfumante)',
          '• Colorante C.I. 19140: 0.002% (Aportante de color)',
        ],
      },
    ],
  },
  {
    slug: 'toalla-para-secado-corporal',
    nombre: 'Toalla para secado corporal',
    linea: 'higiene-del-paciente',
    categoria: 'toalla-para-secado-corporal',
    descripcion:
      'Toalla para secado corporal color blanco, empaquetado individualmente en ' +
      'bolsa plástica con asa en la parte superior y delineado para fácil ' +
      'apertura. Suave al tacto, alta absorción y resistencia. Libre de ' +
      'partículas, rebabas y aristas cortantes',
    presentaciones: [
      {
        medida: '',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidad',
        caracteristicas: [
          'COMPOSICIÓN',
          '- Viscosa (Celulosa): 80%',
          '- Poliéster: 20%',
          '(*Tolerancia: ± 2%)',
          'Caja x 130 bolsas',
        ],
      },
    ],
  },
  {
    slug: 'pano-clinico-absorbente',
    nombre: 'Paño clínico absorbente',
    linea: 'higiene-del-paciente',
    categoria: 'pano-clinico-absorbente',
    descripcion:
      'Paño clínico ideal para disminuir los riesgos de contaminación cruzada de ' +
      'las instituciones de salud y laboratorios.',
    presentaciones: [
      {
        medida: 'CELULOSA 80% - POLIPROPILENO 20%',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'paq x 50 und',
        caracteristicas: [
          'COMPOSICIÓN',
          '- Celulosa 80%',
          '- Polipropileno (PP) 20%',
          'Caja x 12 paquetes',
        ],
      },
      {
        medida: 'CELULOSA 100%',
        marca: 'HEFEI',
        unidad: 'paq x 50 und',
        caracteristicas: [
          'COMPOSICIÓN',
          '- Celulosa 100% (pulpa de madera reforzada)',
          'Caja x 30 paquetes',
        ],
        descripcion:
          'Paños clínicos ideales para disminuir los riesgos de contaminación cruzada ' +
          'de las instituciones de salud y laboratorios. Su práctico empaque permite ' +
          'retirar fácilmente los paños por el extremo y volver a taparlos para ' +
          'conservarlos limpios todo el tiempo.',
      },
    ],
  },
  {
    slug: 'bolsa-emesis',
    nombre: 'Bolsa para emesis o bolsa para vómito',
    linea: 'higiene-del-paciente',
    categoria: 'bolsa-emesis',
    descripcion:
      'Denominada también como bolsa para mareo. Es un dispositivo pequeño, que ' +
      'suele proporcionarse a los pacientes en hospitales o a los pasajeros a ' +
      'bordo de aviones y barcos para recoger y contener el vómito en caso de ' +
      'mareo o movimiento.',
    presentaciones: [
      {
        medida: '',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'paq x 25 und',
        caracteristicas: [
          'COMPOSICIÓN Y MATERIALES',
          '- Cabeza: anillo ranurado, de Polipropileno (PP), color blanco.',
          '- Cuerpo: Bolsa de polietileno (PE), colo azul.',
          'Caja x 20 paquetes',
        ],
      },
    ],
  },
  {
    slug: 'manta-absorbente-de-fluidos-antideslizante',
    nombre: 'Manta absorbente de fluidos - antideslizante',
    linea: 'absorbente',
    categoria: 'manta-absorbente-de-fluidos',
    descripcion:
      'Dispositivo Médico diseñado para mantener el piso del quirófano limpio y ' +
      'seco, evitando los deslizamientos debido a aquellos procedimientos ' +
      'quirúrgicos que provocan intensos fluidos.',
    destacado: true,
    presentaciones: [
      {
        medida: 'ANTIDESLIZANTE - Q202',
        marca: 'HUAXINHONG',
        unidad: 'paq x 5 und',
        caracteristicas: [
          'MATERIALES',
          'Constituido por tres capas de laminación:',
          '- Superior: tela no tejida, Polipropileno (PP). Absorbente de agua. Color blanco. Peso 5 g (1%).',
          '- Medio: Polipropileno (PP) fundido y soplado (absorbente de agua). Color Azul (Pantone 283U). Peso 400 g (88%)',
          '- Inferior o Reverso: Película Transparente de Polietileno (PE). Impermeable. Peso 50 g (11%).',
          'DIMENSIONES: 36 x 44 pulgadas (91.4 cm x 111.8 cm)',
          'Caja x 6 paquetes',
        ],
      },
    ],
  },
  {
    slug: 'manta-absorbente-de-fluidos-precortada',
    nombre: 'Manta absorbente de fluidos - precortada',
    linea: 'absorbente',
    categoria: 'manta-absorbente-de-fluidos',
    descripcion:
      'Dispositivo Médico diseñado para mantener secas las bandejas o superficies ' +
      'donde se colocan los instrumentos quirúrgicos; asimismo, tienen el ' +
      'propósito de amortigua los golpes y deslizamientos de los mismos, en el ' +
      'momento de secarlos.',
    presentaciones: [
      {
        medida: 'PRECORTADA - Q101',
        marca: 'HUAXINHONG',
        unidad: 'paq x 5 und',
        caracteristicas: [
          'MATERIALES',
          'Tres placas de laminación:',
          '• Cara superior: Tela no tejida, Polipropileno (PP): 5 g (1%)',
          '• Medio: Polipropileno (PP) fundido y soplado (absorbente de agua): 400 g (98%)',
          '• Cara inferior: Tela no tejida, Polipropileno (PP): 5 g (1%)',
          'DIMENSIONES: 36 x 44 pulgadas (91.4 cm x 111.8 cm).',
          'Caja x 6 paquetes',
        ],
      },
    ],
  },
  {
    slug: 'mantas-super-absorbentes',
    nombre: 'Mantas súper absorbentes impermeables y antideslizantes',
    linea: 'absorbente',
    categoria: 'manta-absorbente-de-fluidos',
    descripcion:
      'Dispositivo Médico diseñado para Ayudar a mantener el quirófano limpio, ' +
      'seco y seguro de resbalones, caídas y los contaminantes.',
    presentaciones: [
      {
        medida: 'Q303',
        marca: 'COMFYCLOUD',
        unidad: 'unidad',
        caracteristicas: [
          'MATERIALES',
          '- Capa superior: Polipropileno (PP) fundido y',
          'soplado, color amarillo: 319.00 g/m2',
          '(54.07%),',
          '- Capa central: Película transparente de Polietileno (PE): 49.00 g/m2 (8.30%),',
          '- Capa inferior: Lámina de Policloruro de Vinilo (PVC), color rosado a melón: 220.00 g/m2 (37.29%),',
          '- Adhesivo sintético: 2.00 g/m2 (0.34%),',
          'DIMENSIONES: 32” x 40” pulgadas (81.28 cm x 101.6 cm)',
          'Caja x 30 unidades',
        ],
      },
    ],
  },
  {
    slug: 'protector-tela-impermeable',
    nombre: 'Protector de tela plástica impermeable',
    linea: 'absorbente',
    categoria: 'protector-tela-impermeable',
    descripcion:
      'Manta protectora impermeable, ideal para el recubrimiento y protección de ' +
      'superficies difíciles de limpiar y secar; debido al derrame de fluidos ' +
      'como agua, orina, etc.',
    presentaciones: [
      {
        medida: '',
        marca: 'MEDISPO',
        marcaSlug: 'medispo',
        unidad: 'unidad',
        caracteristicas: [
          'COMPOSICIÓN',
          '▪ Capa superior (color blanco)',
          '- Polipropileno (PP) 14%',
          '- Tejido de Papel Tisú: 6%',
          '▪ Capa central',
          '- Fibras de celulosa: 53%',
          '- Polímero Súper Absorbente (SAP): 6%',
          '▪ Capa inferior (celeste)',
          '- Polietileno (PE), 19%',
          '▪ Adhesivo de fusión en caliente: 2%',
          'Caja x 60 unidades',
        ],
      },
    ],
  },
  {
    slug: 'guantes-nitrilo-sin-polvo',
    nombre: 'Guantes para examen descartables de nitrilo sin polvo - 6.5 GR',
    linea: 'proteccion-personal',
    categoria: 'guantes-de-nitrilo-sin-polvo-6-5-gr',
    descripcion:
      'Guantes de uso médico. Elaborados para protegernos de riesgos químicos, ' +
      'microbiológicos y citostáticos. Protege contra la contaminación en ' +
      'procedimientos con pacientes de alto riesgo, manejo de drogas oncológicas, ' +
      'tratamientos químicos, tratamiento de metales con disolventes.',
    destacado: true,
    presentaciones: [
      {
        medida: 'TALLA S',
        marca: 'COMFORT',
        marcaSlug: 'comfort-rubber-gloves',
        unidad: 'caja x 100 und',
        caracteristicas: [
          '• Largo (mm): 300',
          '• Ancho (mm): 85 ± 5',
          '• Espesor (mm) – Palma: 0.10 ± 0.02',
          '• Espesor (mm) – Puño: 0.07 ± 0.02',
          '• Espesor (mm) – Dedos: 0.15 ± 0.02',
          '• Peso (g): 6.0 ± 0.2',
        ],
      },
      {
        medida: 'TALLA M',
        marca: 'COMFORT',
        marcaSlug: 'comfort-rubber-gloves',
        unidad: 'caja x 100 und',
        caracteristicas: [
          '• Largo (mm): 300',
          '• Ancho (mm): 95 ± 5',
          '• Espesor (mm) – Palma: 0.10 ± 0.02',
          '• Espesor (mm) – Puño: 0.07 ± 0.02',
          '• Espesor (mm) – Dedos: 0.15 ± 0.02',
          '• Peso (g): 6.5 ± 0.2',
        ],
      },
      {
        medida: 'TALLA L',
        marca: 'COMFORT',
        marcaSlug: 'comfort-rubber-gloves',
        unidad: 'caja x 100 und',
        caracteristicas: [
          '• Largo (mm): 300',
          '• Ancho (mm): 105 ± 5',
          '• Espesor (mm) – Palma: 0.10 ± 0.02',
          '• Espesor (mm) – Puño: 0.07 ± 0.02',
          '• Espesor (mm) – Dedos: 0.15 ± 0.02',
          '• Peso (g): 7.0 ± 0.2',
        ],
      },
      {
        medida: 'TALLA XL',
        marca: 'COMFORT',
        marcaSlug: 'comfort-rubber-gloves',
        unidad: 'caja x 100 und',
        caracteristicas: [
          '• Largo (mm): 300',
          '• Ancho (mm): 115 ± 5',
          '• Espesor (mm) – Palma: 0.10 ± 0.02',
          '• Espesor (mm) – Puño: 0.07 ± 0.02',
          '• Espesor (mm) – Dedos: 0.15 ± 0.02',
          '• Peso (g): 7.5 ± 0.2',
        ],
      },
    ],
  },
  {
    slug: 'marcador-piel-esteril',
    nombre: 'Marcador de piel estéril desechable',
    linea: 'material-medico-no-instrumental',
    categoria: 'marcador-de-piel',
    descripcion:
      'Marcadores estériles diseñados para facilitar la identificación y trazo ' +
      'del contorno del campo quirúrgico en la zona de la piel donde se va ' +
      'producir la intervención quirúrgica; permitiendo en forma segura y ' +
      'confiable localizar la zona exacta para la incisión. Incluyen regla',
    presentaciones: [
      {
        medida: '',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 25 und',
        caracteristicas: [
          '- Tinta: Violeta de genciana (Cloruro de Metilrosanilina o Cristal violeta)',
          '- Tapa: Polipropileno, color transparente.',
          '- Cuerpo: Polipropileno, color blanco',
        ],
      },
    ],
  },
  {
    slug: 'marcador-piel-no-esteril',
    nombre: 'Marcador quirúrgico no estéril para piel',
    linea: 'material-medico-no-instrumental',
    categoria: 'marcador-de-piel',
    descripcion:
      'Marcador pequeño no estéril, diseñado para proporcionar un medio seguro y ' +
      'eficaz de marcado en la piel antes de una intervención quirúrgica, en el ' +
      'mismo lugar de la operación.',
    presentaciones: [
      {
        medida: '',
        marca: 'XODUS',
        marcaSlug: 'xodus',
        unidad: 'caja x 50 und',
        caracteristicas: [
          '- Cuerpo y tapa: polietileno de alta densidad',
          '- Tinta: Violeta de genciana (Cloruro de Metilrosanilina o Cristal violeta)',
        ],
      },
    ],
  },
  {
    slug: 'contador-de-aguja-doble-iman',
    nombre: 'Contador de aguja doble imán',
    linea: 'material-medico-no-instrumental',
    categoria: 'contador-de-aguja',
    descripcion:
      'Dispositivo Médico diseñado para reconteo de agujas, con dos láminas de ' +
      'imán. Son estuches de color rojo que en su interior se encuentran las ' +
      'láminas imantadas.',
    presentaciones: [
      {
        medida: 'DOBLE MAGNETO 30 RECUENTOS',
        marca: 'KANGBAO',
        marcaSlug: 'kangbao',
        unidad: 'caja x 28 blísteres',
        caracteristicas: [
          '• Estuche de poliestireno de alto impacto (HIPS) y doble lámina imantada.',
          '• Dimensiones: 11.3 cm × 5.4 cm × 1.5 cm',
        ],
      },
    ],
  },
  {
    slug: 'bolsas-para-contar-gasas',
    nombre: 'Bolsas para contar gasas',
    linea: 'material-medico-no-instrumental',
    categoria: 'bolsas-para-contar-gasas',
    descripcion:
      'Dispositivo médico que se utilizan principalmente en quirófanos y entornos ' +
      'médicos para facilitar, organizar y verificar el recuento de gasas, bolsa ' +
      'de algodón o esponjas quirúrgicas utilizadas durante una intervención ' +
      'quirúrgica. Diseñado para garantizar la seguridad del paciente y prevenir ' +
      'que se dejen accidentalmente gasas, etc. dentro del cuerpo del ' +
      'intervenido; después de una cirugía, el cual se conoce como textiloma o ' +
      'gossypiboma. El dispositivo está constituido por una faja plástica ' +
      'provista de cinco bolsillos, en donde se colocan las gazas o torundas ' +
      'usadas.',
    presentaciones: [
      {
        medida: '',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'caja x 50 und',
        caracteristicas: [
          '• Polietileno (PE)',
          '• Producto no estéril.',
        ],
      },
    ],
  },
  {
    slug: 'limpiador-puntas-electrocauterio',
    nombre: 'Limpiador de puntas de electrocauterio',
    linea: 'material-medico-no-instrumental',
    categoria: 'limpiador-puntas-electrocauterio',
    descripcion:
      'Dispositivo Médico diseñado para limpiar con seguridad y eficacia las ' +
      'puntas de los lápices para electrocirugía.',
    presentaciones: [
      {
        medida: '',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidad',
        caracteristicas: [
          '• Dimensión: 50*50 mm',
          '• Tolerancia / Longitud: ± 5 mm',
          '• Tolerancia / ancho: ± 5 mm',
          '• Lámina abrasiva o pulidora: Material fino de Monóxido de Silicio (SiO) de grado médico. Color grafito.',
          '• Capa base: Esponja de Poliuretano. Color celeste oscuro.',
          '• Adhesivo: Sensible a la presión. Transparente',
          '• Papel desprendible: Papel recubierto de silicona. Color blanco',
        ],
      },
    ],
  },
  {
    slug: 'cepillo-limpieza-instrumental-dental',
    nombre: 'Cepillo de limpieza de instrumental médico tipo cepillo dental',
    linea: 'material-medico-no-instrumental',
    categoria: 'cepillos-para-limpieza-de-instrumental-medico',
    descripcion:
      'Cepillo dental de plástico, tipo cepillo dental para limpieza del ' +
      'instrumental quirúrgico. Mango anatómico de polipropileno y cerdas de ' +
      'Poliamida (Nylon).',
    presentaciones: [
      {
        medida: 'PRCB-01',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidad',
        caracteristicas: [
          '- Mango anatómico de plástico resistente, color celeste.',
          '- Longitud total: 18.5 cm',
          '- Cerdas semirrígidas de 12 mm de longitud, transparentes, dispuestas un área de 32 mm x 7 mm (13 columnas x 3 filas).',
        ],
      },
      {
        medida: 'PRCB-04',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidad',
        caracteristicas: [
          'Diseñado con dos cabezas de tres (03 filas y 13 columnas) cada una. Una cabeza con cerdas de nailon de color blanco y la otra, con cerdas de acero inoxidable. Ambos tipos de cerdas son rectas, espesor uniforme, distribución simétrica y de fijación firme.',
          '- Las cerdas de nailon son semirrígidas y 12 mm de longitud; mientras que las de acero inoxidable, son rígidas y 14 mm de longitud.',
          '- Mango anatómico de plástico resistente, color celeste.',
          '- Longitud total de 18.5 cm',
        ],
        descripcion:
          'Cepillo dental de plástico, tipo cepillo dental de doble cabezal, para ' +
          'limpieza del instrumental quirúrgico. Mango anatómico de polipropileno y ' +
          'cerdas de Poliamida (Nylon) y Acero inoxidable.',
      },
      {
        medida: 'ICB-3',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidad',
        caracteristicas: [
          '- Mango anatómico de plástico resistente, color azul.',
          '- Longitud total: 17.5 cm',
          '- Cerdas semirrígidas de 12 mm de longitud, transparentes, dispuestas un área de 38 mm x 7 mm (13 columnas x 3 filas).',
        ],
      },
    ],
  },
  {
    slug: 'escobilla-nailon-doble-cabeza',
    nombre: 'Escobilla de nailon doble cabeza extremos',
    linea: 'material-medico-no-instrumental',
    categoria: 'cepillos-para-limpieza-de-instrumental-medico',
    descripcion:
      'Cepillo tipo dental con doble cabeza, recto, para limpieza del ' +
      'instrumental quirúrgico. Mango anatómico de polipropileno y cerdas de ' +
      'Poliamida (Nylon).',
    presentaciones: [
      {
        medida: 'PRCB-02',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidad',
        caracteristicas: [
          '- Mango anatómico de plástico resistente, drapeado en la parte central, color dorado oscuro.',
          '- Longitud total: 18 cm.',
          '- Doble cabeza con cerdas semirrígidas de distinta longitud.',
          'La cabeza con el área más grande, está conformado por cerdas de 12 mm de longitud, transparentes, dispuestas en un área de 38 mm x',
          '8 mm (12 columnas x 3 filas).',
          'La cabeza con el área más pequeña, está constituido por cerdas de 6 mm de longitud, transparentes, dispuestas en un área de 23 mm x',
          '2 mm (7 columnas x 1 fila).',
        ],
      },
    ],
  },
  {
    slug: 'cepillo-nailon-mango-ancho',
    nombre: 'Cepillo de nailon blanco mango ancho blanco',
    linea: 'material-medico-no-instrumental',
    categoria: 'cepillos-para-limpieza-de-instrumental-medico',
    descripcion:
      'Cepillo de limpieza de instrumentos en general. Diseñado con un mango ' +
      'recto de fácil agarre y cerdas de Poliamida (Nylon).',
    presentaciones: [
      {
        medida: 'PRCB-03',
        marca: 'Q-MEDICAL',
        marcaSlug: 'q-medical',
        unidad: 'unidad',
        caracteristicas: [
          '- Mango anatómico y plano de plástico resistente, color blanco.',
          '- Longitud total: 22.2 cm',
          '- Cerdas semirrígidas de 15 mm de longitud, transparentes, dispuestas un área de 7.5 cm x 3 cm (19 columnas x 8 filas).',
        ],
      },
    ],
  },
  {
    slug: 'videolaringoscopio-vs-10h',
    nombre: 'Videolaringoscopio VS-10H',
    linea: 'via-aerea',
    categoria: 'videolaringoscopio',
    descripcion:
      'El videolaringoscopio de Medcaptain utiliza una tecnología de cámara para ' +
      'visualizar la laringe y facilitar a los médicos realizar la intubación ' +
      'endotraqueal sin problemas.',
    presentaciones: [
      {
        medida: '',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          '- Ángulo de rotación de la pantalla de visualización:',
          '- Ángulo de rotación vertical máximo: 140° ± 10°',
          '-Ángulo de rotación horizontal máximo: 270 ° ± 10 °',
          '- Profundidad de campo: 10-80mm',
          '- Pantalla: Táctil LCD, color, 3.5”',
          '- Resolución: 640 x 960 pixeles',
          '- Peso: 0.25 kg (incluida la batería)',
          '- Potencia de entrada: 25VA.',
          '- Voltaje de salida DC: 5V 2A.',
          '- Batería incorporada: 3.6V 3400mAh.',
          '- Tiempo de carga: no más de 4 horas (el dispositivo se apaga durante la carga)',
          '- Dimensiones: 191 (H) x 92 (W) x 112 (D) mm',
        ],
      },
    ],
  },
  {
    slug: 'hojas-videolaringoscopio',
    nombre: 'Hoja descartable para videolaringoscopio',
    linea: 'via-aerea',
    categoria: 'hojas-de-videolaringoscopio',
    descripcion:
      'El Disposable laryngoscope blade (Hoja de Laringoscopio desechable) está ' +
      'diseñado para usarse con el videolaringoscopio. Disponible en varias ' +
      'presentaciones conforme a las necesidades del paciente (infante, niño, ' +
      'adulto, pacientes con dificultades respiratorias y obesas). Fabricado con ' +
      'Policarbonato.',
    presentaciones: [
      {
        medida: 'M1',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'MEDIDAS',
          '- M1: 106±5mm (largo); 18±3mm (ancho); 30±3mm (alto); 3.5–10 kg (peso).',
          '- M2: 115±5mm (largo) ; 22±3mm (ancho); 33±3mm (alto); >10–40 kg (peso).',
          '- M3: 126±5mm (largo); 27±3mm (ancho); 38±3mm (alto); >40–70 kg (peso).',
          '-M4: 140±5mm (largo); 29±3mm (ancho); 41±3mm (alto); >70 kg (peso).',
          'M3D: 126±5mm (largo); 24±3mm (ancho); 42±3mm (alto); >40–70 kg (peso).',
          'Caja x 12 unidades',
        ],
      },
      {
        medida: 'M2',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'MEDIDAS',
          '- M1: 106±5mm (largo); 18±3mm (ancho); 30±3mm (alto); 3.5–10 kg (peso).',
          '- M2: 115±5mm (largo) ; 22±3mm (ancho); 33±3mm (alto); >10–40 kg (peso).',
          '- M3: 126±5mm (largo); 27±3mm (ancho); 38±3mm (alto); >40–70 kg (peso).',
          '-M4: 140±5mm (largo); 29±3mm (ancho); 41±3mm (alto); >70 kg (peso).',
          'M3D: 126±5mm (largo); 24±3mm (ancho); 42±3mm (alto); >40–70 kg (peso).',
          'Caja x 12 unidades',
        ],
      },
      {
        medida: 'M3',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'MEDIDAS',
          '- M1: 106±5mm (largo); 18±3mm (ancho); 30±3mm (alto); 3.5–10 kg (peso).',
          '- M2: 115±5mm (largo) ; 22±3mm (ancho); 33±3mm (alto); >10–40 kg (peso).',
          '- M3: 126±5mm (largo); 27±3mm (ancho); 38±3mm (alto); >40–70 kg (peso).',
          '-M4: 140±5mm (largo); 29±3mm (ancho); 41±3mm (alto); >70 kg (peso).',
          'M3D: 126±5mm (largo); 24±3mm (ancho); 42±3mm (alto); >40–70 kg (peso).',
          'Caja x 12 unidades',
        ],
      },
      {
        medida: 'M4',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'MEDIDAS',
          '- M1: 106±5mm (largo); 18±3mm (ancho); 30±3mm (alto); 3.5–10 kg (peso).',
          '- M2: 115±5mm (largo) ; 22±3mm (ancho); 33±3mm (alto); >10–40 kg (peso).',
          '- M3: 126±5mm (largo); 27±3mm (ancho); 38±3mm (alto); >40–70 kg (peso).',
          '-M4: 140±5mm (largo); 29±3mm (ancho); 41±3mm (alto); >70 kg (peso).',
          'M3D: 126±5mm (largo); 24±3mm (ancho); 42±3mm (alto); >40–70 kg (peso).',
          'Caja x 12 unidades',
        ],
      },
      {
        medida: 'M3D',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'MEDIDAS',
          '- M1: 106±5mm (largo); 18±3mm (ancho); 30±3mm (alto); 3.5–10 kg (peso).',
          '- M2: 115±5mm (largo) ; 22±3mm (ancho); 33±3mm (alto); >10–40 kg (peso).',
          '- M3: 126±5mm (largo); 27±3mm (ancho); 38±3mm (alto); >40–70 kg (peso).',
          '-M4: 140±5mm (largo); 29±3mm (ancho); 41±3mm (alto); >70 kg (peso).',
          'M3D: 126±5mm (largo); 24±3mm (ancho); 42±3mm (alto); >40–70 kg (peso).',
          'Caja x 12 unidades',
        ],
      },
    ],
  },
  {
    slug: 'bomba-de-infusion-hp-60',
    nombre: 'Bomba de infusión HP-60',
    linea: 'nutricion-parenteral',
    categoria: 'bomba-de-infusion',
    descripcion:
      'Basado en estudios clínicos en diferentes contextos, está diseñado para ' +
      'satisfacer las necesidades de diferentes departamentos con un único ' +
      'dispositivo. Un único dispositivo para todas las terapias con una amplia ' +
      'gama de posibilidades de personalización, inluyendo varios opciones según ' +
      'la necesidad del área.',
    presentaciones: [
      {
        medida: 'HP-60',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'Pantalla:',
          '- Pantalla táctil resistiva de 3 pulgadas',
          'Resolución: 480×320',
          'Ángulo de visión: 80°',
          'Dimensiones: 214(A)×75(H)×142(P) mm',
          'Peso: Sobre 1,4kg (incluyendo la batería)',
          'Suministro eléctrico:',
          '- Suministro eléctrico de CA: 100-240V, 50/60Hz',
          '- Potencia consumida: 45 VA',
          '- Suministro eléctrico CC externo: 12 V',
          '- Corriente de entrada (CC):2,5 A',
          '- Batería de litio incorporada: 11,34 V, 2900 mAh',
          '- Tiempo de funcionamiento de la batería: ≥10 h Condiciones: Utilice un set IV a una velocidad de 25 ml/h.',
          '- Tiempo de carga de batería: ≤ 6 h en estado apagado',
        ],
      },
    ],
  },
  {
    slug: 'bomba-de-jeringa-hp-30',
    nombre: 'Bomba de jeringa HP-30',
    linea: 'nutricion-parenteral',
    categoria: 'bomba-de-jeringa',
    descripcion:
      'La bomba de jeringa HP-30 de MEDCAPTAIN es una bomba de micro-infusión ' +
      'continua. Puede contener un ritmo de infusión constante y una dosis ' +
      'precisa en la infusión a largo plazo. Esta bomba de jeringa está diseñada ' +
      'para una micro-infusión continua clínica de líquido de poco volumen y de ' +
      'alta concentración o medicamento líquido (como agente quimioterapéutico, ' +
      'agente cardiovascular, agente anticancerígeno, ocitócico, anticoagulante, ' +
      'anestésico, etc.) en el cuerpo del paciente bajo un control preciso.',
    presentaciones: [
      {
        medida: 'HP-30',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'Dimensiones: 258(A)×75(H)×152(P)mm',
          'Peso: Sobre 1,7 kg (incluyendo la batería)',
          'Suministro eléctrico',
          '- Corriente de entrada (CC):2,5',
          '- A Batería de litio incorporada: 11,34 V, 2900 mAh',
          '- Tiempo de funcionamiento de la batería: ≥10 h Condiciones: Utilice una jeringa de 50 ml a una velocidad de 5 ml/h.',
          '- Tiempo de carga de batería: ≤ 6 h en estado apagado',
          'Pantalla:',
          '- Pantalla táctil resistiva de 3 pulgadas',
          '- Resolución: 480×320',
          '- Ángulo de visión: 80°',
        ],
      },
    ],
  },
  {
    slug: 'bomba-de-jeringa-hp-tci',
    nombre: 'Bomba de jeringa HP TCI',
    linea: 'nutricion-parenteral',
    categoria: 'bomba-de-jeringa',
    descripcion:
      'La bomba de jeringa HP TCI es una bomba de micro-infusion continua. Puede ' +
      'contener un ritmo de infusión constante y una dosis precisa en la Infusion ' +
      'largo plazo.',
    presentaciones: [
      {
        medida: 'TCI',
        marca: 'MEDCAPTAIN',
        marcaSlug: 'medcaptain',
        unidad: 'unidad',
        caracteristicas: [
          'ESPECIFICACIONES',
          '- Dimensiones: 258 (Ancho) x 75 (alto) x 152 (profundidad); unidades en milímetros (mm)',
          '- Peso: Aproximadamente 1.7 kg (incluida la batería)',
          '- Adaptador de corriente:',
          '• Fuente de alimentación CA: 100-240 V CA, 50/60 Hz, 60 VA de potencia de entrada',
          '• Potencia consumida :45 VA',
          '• Fuente de alimentación de CC externa:',
          '12 V',
          '• Corriente de entrada (CC):2.5 A.',
          '• Tiempo de carga de la batería: No más de 4 horas (la bomba está apagada para la carga)',
          '• La bomba de jeringa se alimentará automáticamente con la batería incorporada una vez que la entrada CA/CC se corte.',
          '• Modo de carga de la batería: Entrada de CA o carga de batería de entrada de CC',
        ],
      },
    ],
  },
];
