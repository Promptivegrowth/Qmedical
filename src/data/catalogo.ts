import manifest from '../../public/img/manifest.json';
import fichas from './fichas.json';

/* ==========================================================================
   Catálogo Q-MEDICAL S.A.C.
   El contenido técnico proviene de las fichas técnicas oficiales de cada
   producto (carpeta "Ficha técnica productos"), publicadas además como PDF
   descargable en /fichas-tecnicas.
   ========================================================================== */

export interface Ficha {
  titulo: string;
  archivo: string;
  peso: number;
}

export interface Variante {
  codigo: string;
  detalle: string;
  ficha?: string;
}

export interface Producto {
  slug: string;
  nombre: string;
  categoria: string;
  marca: string;
  resumen: string;
  descripcion: string[];
  caracteristicas: string[];
  presentacion?: string;
  usos?: string[];
  variantes?: Variante[];
  fichas: string[];
  destacado?: boolean;
}

export interface Categoria {
  slug: string;
  nombre: string;
  corto: string;
  descripcion: string;
  icono: string;
}

export const categorias: Categoria[] = [
  {
    slug: 'bioseguridad',
    nombre: 'Bioseguridad y manejo de residuos',
    corto: 'Bioseguridad',
    descripcion:
      'Conjunto de principios, normas y tecnologías para evitar el riesgo que ' +
      'proviene de la exposición a agentes biológicos. Contenedores rígidos ' +
      'resistentes a la punción para cada tipo de residuo y volumen de servicio.',
    icono: 'biohazard',
  },
  {
    slug: 'antisepsia',
    nombre: 'Antisepsia y preparación de piel',
    corto: 'Antisepsia',
    descripcion:
      'Empleo de sustancias químicas para inhibir el crecimiento o disminuir ' +
      'el número de microorganismos de la piel y mucosas. Formulaciones de ' +
      'clorhexidina en aplicador, esponja, cepillo y toallita.',
    icono: 'droplet',
  },
  {
    slug: 'laparoscopia',
    nombre: 'Cirugía laparoscópica',
    corto: 'Laparoscopía',
    descripcion:
      'Técnica quirúrgica que permite la visión de la cavidad pélvico-abdominal ' +
      'con ayuda de una lente óptica. Trócares con punta de seguridad y hoja ' +
      'blindada, en unidades y kits.',
    icono: 'scalpel',
  },
  {
    slug: 'aspiracion',
    nombre: 'Aspiración y succión',
    corto: 'Aspiración',
    descripcion:
      'Sistemas cerrados para el almacenamiento temporal de secreciones y ' +
      'fluidos extraídos del cuerpo: bolsas descartables, cánister reusables, ' +
      'tubuladuras y toda la línea de soportes.',
    icono: 'flask',
  },
  {
    slug: 'nutricion-enteral',
    nombre: 'Nutrición enteral',
    corto: 'Nutrición enteral',
    descripcion:
      'Técnica de alimentación artificial que administra la solución nutritiva ' +
      'directamente al estómago o el intestino. Bombas, bolsas y sets ' +
      'compatibles con los accesos enterales de uso hospitalario.',
    icono: 'bag',
  },
  {
    slug: 'via-aerea',
    nombre: 'Vía aérea y anestesia',
    corto: 'Vía aérea',
    descripcion:
      'Videolaringoscopía para intubación endotraqueal precisa, con hojas ' +
      'desechables en todas las tallas, desde recién nacido hasta la vía aérea ' +
      'difícil del adulto.',
    icono: 'monitor',
  },
  {
    slug: 'higiene-paciente',
    nombre: 'Higiene y confort del paciente',
    corto: 'Higiene del paciente',
    descripcion:
      'Baño en cama sin enjuague, secado corporal y paños clínicos de un solo ' +
      'uso, para reducir la contaminación cruzada y el tiempo de atención de ' +
      'enfermería.',
    icono: 'sparkles',
  },
  {
    slug: 'absorbentes',
    nombre: 'Absorbentes y protección de superficies',
    corto: 'Absorbentes',
    descripcion:
      'Mantas absorbentes antideslizantes y protectores impermeables que ' +
      'mantienen el quirófano limpio, seco y libre de riesgo de resbalones.',
    icono: 'layers',
  },
  {
    slug: 'instrumental',
    nombre: 'Instrumental y accesorios quirúrgicos',
    corto: 'Instrumental',
    descripcion:
      'Insumos de sala de operaciones y de central de esterilización: ' +
      'marcadores de piel, control de gasas, limpieza de puntas de ' +
      'electrocauterio y cepillería de instrumental.',
    icono: 'tools',
  },
  {
    slug: 'proteccion-personal',
    nombre: 'Protección personal',
    corto: 'Protección personal',
    descripcion:
      'Barrera para el equipo de salud frente a riesgos químicos, ' +
      'microbiológicos y citostáticos.',
    icono: 'shield',
  },
];

export const productos: Producto[] = [
  /* ---------------------------------------------------------- Bioseguridad */
  {
    slug: 'contenedores-punzocortantes',
    nombre: 'Contenedores de bioseguridad para punzocortantes',
    categoria: 'bioseguridad',
    marca: 'maxcon',
    destacado: true,
    resumen:
      'Nueve capacidades, de 0.95 L a 30.3 L, con tapa de cierre definitivo y ' +
      'desarmador de agujas integrado.',
    descripcion: [
      'Contenedores para desechos punzocortantes diseñados para optimizar los ' +
        'procesos de manejo y descarte de residuos peligrosos con una sola mano, ' +
        'en los diferentes establecimientos de salud.',
      'Cada unidad está constituida por dos partes —cuerpo y tapa— y cubre ' +
        'desde el carro de flebotomía hasta los puntos de acopio de alto ' +
        'volumen, de modo que cada servicio use el formato que le corresponde.',
    ],
    caracteristicas: [
      'Resistente a la punción según norma internacional',
      'Recipiente poliédrico de base rectangular con asas laterales para traslado seguro',
      'Tapa transparente con eje giratorio tipo vaivén que impide el acceso de la mano',
      'Dos anclajes de cierre final irreversible',
      'Sistema desarmador de agujas incorporado',
      'Color rojo translúcido que permite visualizar el nivel de llenado',
      'Libre de rebabas o aristas cortantes',
      'Rotulado de riesgo biológico y línea de nivel máximo',
    ],
    presentacion:
      'Caja de cartón corrugado. El número de unidades por caja varía según la ' +
      'capacidad del contenedor.',
    variantes: [
      { codigo: 'MA1112', detalle: '0.95 L — flebotomía', ficha: 'contenedor-punzocortantes-ma1112-0-95l' },
      { codigo: 'MA1122', detalle: '1.89 L — flebotomía', ficha: 'contenedor-punzocortantes-ma1122-1-89l' },
      { codigo: '1024', detalle: '3.0 L', ficha: 'contenedor-punzocortantes-1024-3l' },
      { codigo: 'MA1212', detalle: '4.7 L', ficha: 'contenedor-punzocortantes-ma1212-4-7l' },
      { codigo: '1033', detalle: '7.0 L', ficha: 'contenedor-punzocortantes-1033-7l' },
      { codigo: 'ME1282', detalle: '7.6 L', ficha: 'contenedor-punzocortantes-me1282-7-6l' },
      { codigo: 'MA1331', detalle: '11.4 L (3 G)', ficha: 'contenedor-punzocortantes-ma1331-11-4l' },
      { codigo: 'MA1341', detalle: '22.7 L', ficha: 'contenedor-punzocortantes-ma1341-22-7l' },
      { codigo: 'MA1352', detalle: '30.3 L', ficha: 'contenedor-punzocortantes-ma1352-30-3l' },
    ],
    fichas: [
      'contenedor-punzocortantes-ma1112-0-95l',
      'contenedor-punzocortantes-ma1122-1-89l',
      'contenedor-punzocortantes-1024-3l',
      'contenedor-punzocortantes-ma1212-4-7l',
      'contenedor-punzocortantes-1033-7l',
      'contenedor-punzocortantes-me1282-7-6l',
      'contenedor-punzocortantes-ma1331-11-4l',
      'contenedor-punzocortantes-ma1341-22-7l',
      'contenedor-punzocortantes-ma1352-30-3l',
    ],
  },
  {
    slug: 'contenedores-citotoxicos',
    nombre: 'Contenedores para residuos citotóxicos, especiales y vidrios',
    categoria: 'bioseguridad',
    marca: 'maxcon',
    destacado: true,
    resumen:
      'Línea amarilla para quimioterapia, residuos especiales y descarte de ' +
      'vidrios, de 3.8 L a 30.3 L.',
    descripcion: [
      'Contenedores rígidos destinados al descarte de material contaminado con ' +
        'citostáticos, de residuos especiales y de vidrios, diferenciados por ' +
        'color y rotulado del resto de la línea de bioseguridad.',
      'Su identificación amarilla y el pictograma correspondiente permiten al ' +
        'personal segregar correctamente en el punto de generación, requisito ' +
        'del plan de manejo de residuos sólidos de todo establecimiento de salud.',
    ],
    caracteristicas: [
      'Rotulado específico para citotóxicos, residuos especiales o vidrios',
      'Color amarillo de identificación normativa',
      'Resistente a la punción y a la perforación',
      'Tapa de cierre definitivo con anclajes',
      'Asas laterales para traslado seguro',
      'Dimensiones homogéneas que facilitan el apilamiento',
    ],
    presentacion: 'Caja de cartón corrugado según capacidad.',
    variantes: [
      { codigo: 'MC1311', detalle: '3.8 L — citotóxicos', ficha: 'contenedor-citotoxicos-mc1311-3-8l' },
      { codigo: 'MC1321', detalle: '7.6 L — citotóxicos', ficha: 'contenedor-citotoxicos-mc1321-7-6l' },
      { codigo: 'MC1321-R', detalle: '7.6 L — residuos especiales', ficha: 'contenedor-residuos-especiales-mc1321-7-6l' },
      { codigo: 'MC1351', detalle: '30.3 L — citotóxicos', ficha: 'contenedor-citotoxicos-mc1351-30-3l' },
      { codigo: 'MV1311', detalle: '3.8 L — vidrios', ficha: 'contenedor-vidrio-mv1311-3-8l' },
    ],
    fichas: [
      'contenedor-citotoxicos-mc1311-3-8l',
      'contenedor-citotoxicos-mc1321-7-6l',
      'contenedor-residuos-especiales-mc1321-7-6l',
      'contenedor-citotoxicos-mc1351-30-3l',
      'contenedor-vidrio-mv1311-3-8l',
    ],
  },
  {
    slug: 'alfombra-descontaminante',
    nombre: 'Tapete adhesivo descontaminante (Clean Mat)',
    categoria: 'bioseguridad',
    marca: 'q-medical',
    resumen:
      'Tapete multicapa de 30 hojas con adhesivo antibacteriano para el ingreso ' +
      'a áreas controladas.',
    descripcion: [
      'Tapete adhesivo para sala limpia compuesto por 30 hojas de polietileno. ' +
        'Cada hoja está recubierta con un adhesivo de alta tecnología que ' +
        'contiene sustancias antibacterianas.',
      'Captura la suciedad, los gérmenes y el polvo del tráfico peatonal y de ' +
        'las ruedas de los equipos antes de que ingresen al entorno controlado. ' +
        'Al saturarse una hoja, se desprende y queda lista la siguiente.',
    ],
    caracteristicas: [
      'Adhesivo de base acuosa con biocida de amplio espectro',
      '30 hojas numeradas por unidad',
      'Termorresistente y resistente a sustancias oleosas, rayos UV y envejecimiento',
      'Formato 36" × 45" (SM3645B4)',
    ],
    presentacion: 'Caja de cartón conteniendo cuatro tapetes de 30 hojas cada uno.',
    usos: [
      'Ingreso a quirófanos y salas limpias',
      'Laboratorios y producción farmacéutica',
      'Producción de alimentos y centros de datos',
    ],
    fichas: ['tapete-adhesivo-descontaminante'],
  },

  /* ------------------------------------------------------------- Antisepsia */
  {
    slug: 'aplicador-clorhexidina-2',
    nombre: 'Aplicador estéril NEX CLOREX 2% PREP',
    categoria: 'antisepsia',
    marca: 'nex-medical',
    destacado: true,
    resumen:
      'Aplicador desechable con gluconato de clorhexidina 2 % en alcohol ' +
      'isopropílico 70 %, en tres volúmenes.',
    descripcion: [
      'NEX CLOREX 2% PREP es un aplicador desechable que contiene una avanzada ' +
        'solución antiséptica compuesta por gluconato de clorhexidina al 2 % en ' +
        'alcohol isopropílico al 70 %, con amplio espectro de acción biocida ' +
        'contra bacterias, microbacterias, hongos y virus.',
      'Su diseño permite desinfectar diversas zonas del paciente sin tocarlo ' +
        'directamente, lo que reduce el riesgo de contaminación durante la ' +
        'preparación del campo quirúrgico y la inserción de accesos vasculares.',
    ],
    caracteristicas: [
      'Gluconato de clorhexidina 2 % en alcohol isopropílico 70 %',
      'Amplio espectro biocida: bacterias, microbacterias, hongos y virus',
      'Aplicación sin contacto directo con la piel del operador',
      'Blíster individual de polietileno grado médico y papel Tyvek',
      'Apertura tipo peel open',
      'Libre de látex',
    ],
    presentacion:
      'Caja dispensadora de cartón grado médico con 10 u 11 blísteres según el ' +
      'código; cada blíster contiene un aplicador.',
    variantes: [
      { codigo: '3 mL', detalle: 'Accesos vasculares y procedimientos menores' },
      { codigo: '10.5 mL', detalle: 'Campos quirúrgicos medianos' },
      { codigo: '26 mL', detalle: 'Campos quirúrgicos amplios' },
    ],
    fichas: ['aplicador-clorhexidina-2-nex-clorex'],
  },
  {
    slug: 'cepillo-esponja-clorhexidina-4',
    nombre: 'Cepillo-esponja quirúrgico NEX CLOREX C2 CHG 4 %',
    categoria: 'antisepsia',
    marca: 'nex-medical',
    resumen:
      'Cepillo-esponja de un solo uso con limpiauñas, impregnado con ~20 mL de ' +
      'digluconato de clorhexidina.',
    descripcion: [
      'Cepillo-esponja de limpieza quirúrgica de un solo uso, con limpiauñas ' +
        'incluido, impregnado con aproximadamente 20 mL de solución antiséptica ' +
        'de digluconato de clorhexidina al 4 %.',
      'Está destinado al lavado de manos quirúrgico del equipo asistencial ' +
        'antes de ingresar a sala de operaciones.',
    ],
    caracteristicas: [
      'Digluconato de clorhexidina al 4 %, ~20 mL por unidad',
      'Forma ergonómica que permite un agarre firme',
      'Cepillo de alta flexibilidad para una limpieza precisa de manos',
      'Limpiauñas incluido en el blíster',
      'Un solo uso',
    ],
    presentacion:
      'Caja dispensadora con 40 blísteres de polietileno de alta densidad; ' +
      'caja exterior corrugada por 6 dispensadores.',
    fichas: ['cepillo-esponja-clorhexidina-4-nex-clorex'],
  },
  {
    slug: 'esponja-clorhexidina-2',
    nombre: 'Esponja antiséptica NEX CLOREX C2 CHG 2 %',
    categoria: 'antisepsia',
    marca: 'nex-medical',
    resumen:
      'Esponja de poliuretano desechable con ~20 mL de gluconato de ' +
      'clorhexidina al 2 % para el lavado antiséptico de piel sana.',
    descripcion: [
      'Esponja de poliuretano desechable para el lavado antiséptico de la piel, ' +
        'impregnada con aproximadamente 20 mL de solución antiséptica de amplio ' +
        'espectro. Biocida para la higiene humana sobre piel sana.',
    ],
    caracteristicas: [
      'Gluconato de clorhexidina al 2 %, ~20 mL por unidad',
      'Esponja de poliuretano de alta retención de solución',
      'Blíster de polietileno de alta densidad con apertura peel open',
      'Código de modelo SPNEXC2SP022',
      'Un solo uso',
    ],
    presentacion:
      'Caja de cartón corrugado tipo dispensador con 80 blísteres individuales.',
    fichas: ['esponja-clorhexidina-2-nex-clorex'],
  },
  {
    slug: 'toallitas-limpieza-piel',
    nombre: 'Toallitas para limpieza de piel Longood',
    categoria: 'antisepsia',
    marca: 'longood',
    resumen:
      'Sobres individuales con 1.5 mL de clorhexidina 2 % en alcohol ' +
      'isopropílico 70 %, caja por 200 unidades.',
    descripcion: [
      'Toallita desechable impregnada con solución antiséptica de gluconato de ' +
        'clorhexidina al 2 % en alcohol isopropílico al 70 %, para la limpieza ' +
        'de piel sana antes de punciones, curaciones o colocación de apósitos.',
    ],
    caracteristicas: [
      '1.5 mL de solución antiséptica por sobre',
      'Sobre aluminizado hermético de fácil apertura',
      'Referencia K-YX/5*5',
      'Uso externo, un solo uso',
    ],
    presentacion: 'Caja por 200 sobres individuales.',
    fichas: ['toallitas-piel-longood'],
  },

  /* ----------------------------------------------------------- Laparoscopía */
  {
    slug: 'trocares-desechables',
    nombre: 'Trócares desechables GEYI',
    categoria: 'laparoscopia',
    marca: 'geyi',
    destacado: true,
    resumen:
      'Trócar Tipo III con punta de seguridad y hoja blindada, para instrumentos ' +
      'de 5 a 15 mm. Disponible en kits A, B y C.',
    descripcion: [
      'Dispositivo médico diseñado para crear un canal de trabajo hacia el medio ' +
        'interno, permitiendo el ingreso de instrumentos quirúrgicos de 5 mm a ' +
        '15 mm de diámetro durante procedimientos laparoscópicos.',
      'El modelo GYTR-III incorpora punta de seguridad con hoja blindada, que ' +
        'se retrae al atravesar la pared abdominal para reducir el riesgo de ' +
        'lesión de estructuras internas.',
    ],
    caracteristicas: [
      'Modelo Tipo III (GYTR-III) con punta de seguridad y hoja blindada',
      'Canal de trabajo para instrumentos de 5 mm a 15 mm',
      'Doble seguro a prueba de aire',
      'Cánula roscada que minimiza el trauma en la piel',
      'Punta retráctil con cuchilla fina que reduce el tamaño de la herida',
      'Estéril, hipoalergénico, atóxico y biocompatible',
      'Blíster preformado de PET y papel Tyvek herméticamente sellado',
      'Trocar desmontado en dos partes dentro del blíster',
      'Apertura peel open',
      'Estéril, un solo uso',
    ],
    presentacion:
      'Caja de cartón grado médico con un blíster. Embalaje de cartón corrugado ' +
      'conteniendo 20 cajas.',
    variantes: [
      { codigo: 'GYTR-III', detalle: 'Trócar individual con punta de seguridad', ficha: 'trocares-geyi' },
      {
        codigo: 'Kit A',
        detalle:
          '2 cánulas de 5 mm y 2 de 10 mm con llave de paso · obturadores con ' +
          'punta dilatadora de 5 y 10 mm · aguja de Veress · bolsa de 250 mL',
        ficha: 'trocares-geyi-kits',
      },
      {
        codigo: 'Kit B',
        detalle:
          '2 cánulas de 5 mm y 1 de 10 mm con llave de paso · obturadores con ' +
          'punta dilatadora de 5 y 10 mm · aguja de Veress · bolsa de 250 mL',
        ficha: 'trocares-geyi-kits',
      },
      {
        codigo: 'Kit C',
        detalle:
          '3 cánulas de 5 mm y 1 de 10 mm con llave de paso · obturadores con ' +
          'punta dilatadora de 5 y 10 mm · aguja de Veress · bolsa de 250 mL',
        ficha: 'trocares-geyi-kits',
      },
    ],
    fichas: ['trocares-geyi', 'trocares-geyi-kits'],
  },

  /* ------------------------------------------------------------- Aspiración */
  {
    slug: 'bolsas-aspiracion',
    nombre: 'Bolsas de aspiración de secreciones VIDE®',
    categoria: 'aspiracion',
    marca: 'alleva-medical',
    destacado: true,
    resumen:
      'Bolsas descartables de 1000 a 3000 mL, identificadas por color de codo, ' +
      'para uso con cánister rígido reusable.',
    descripcion: [
      'Los contenedores y bolsas de succión VIDE® están destinados a ser ' +
        'utilizados como contenedor de almacenamiento temporal para las ' +
        'secreciones o fluidos extraídos del cuerpo humano.',
      'Las bolsas son descartables y funcionan dentro de un cánister rígido ' +
        'reusable, que se instala en los distintos ambientes hospitalarios según ' +
        'la necesidad del servicio. Cada bolsa está diseñada para un solo paciente.',
      'El dispositivo no está destinado a canalizar o almacenar sangre, fluidos ' +
        'corporales, tejidos, líquidos o gases con el propósito de infusiones, ' +
        'administraciones o introducción en el cuerpo.',
    ],
    caracteristicas: [
      'Bolsa de polietileno de baja densidad (LDPE) que garantiza hermeticidad',
      'Codo de color identificador según capacidad',
      'Exenta de rebabas y aristas cortantes',
      'Libre de partículas extrañas',
      'Tapa hermética sellada de fábrica',
      'Un solo paciente',
      'Compatible con la línea completa de soportes y accesorios VIDE®',
      'Recomendada por el Colegio de Enfermeras del Perú',
    ],
    presentacion:
      'Bolsa de succión en empaque individual. Caja de cartón conteniendo 50 ' +
      'bolsas individuales.',
    variantes: [
      { codigo: 'MI285-0008', detalle: '1000 mL — codo amarillo' },
      { codigo: 'MI286-0008', detalle: '1500 mL — codo morado' },
      { codigo: 'MI287-0008', detalle: '2000 mL — codo celeste' },
      { codigo: 'MI288-0008', detalle: '3000 mL — codo verde' },
    ],
    fichas: ['bolsa-aspiracion-vide'],
  },
  {
    slug: 'canister-reusable',
    nombre: 'Cánister rígido reusable VIDE®',
    categoria: 'aspiracion',
    marca: 'alleva-medical',
    resumen:
      'Soporte cilíndrico transparente graduado con llave de paso y manguera ' +
      'conectora de 28 cm.',
    descripcion: [
      'Los cánister VIDE® están destinados a ser utilizados únicamente como ' +
        'soporte y contenedor de las bolsas de aspiración desechables de la ' +
        'misma marca.',
      'Están provistos de una llave de paso y de una manguera conectora que se ' +
        'adapta a la bolsa de aspiración. Son totalmente transparentes y ' +
        'cilíndricos, con graduación en mL y cc.',
    ],
    caracteristicas: [
      'Forma cilíndrica totalmente transparente',
      'Graduación en letras blancas cada 100 mL',
      'Llave de paso incorporada',
      'Manguera conectora flexible de 28 cm',
      'Material resistente al impacto',
      'Reusable',
    ],
    presentacion:
      'Caja de cartón multiempaque con los cánister individualizados en bolsas ' +
      'plásticas con burbujas.',
    variantes: [
      { codigo: 'MI129-0013', detalle: 'Para bolsa de 1000 mL — marcado amarillo' },
      { codigo: 'MI358-0013', detalle: 'Para bolsa de 1500 mL — marcado morado' },
      { codigo: 'MI301-0013', detalle: 'Para bolsa de 2000 mL — marcado celeste' },
      { codigo: 'MI302-0013', detalle: 'Para bolsa de 3000 mL — marcado verde' },
    ],
    fichas: ['canister-reusable-vide'],
  },
  {
    slug: 'accesorios-aspiracion',
    nombre: 'Soportes y accesorios para aspiración VIDE®',
    categoria: 'aspiracion',
    marca: 'alleva-medical',
    resumen:
      'Pedestales rodables, placa para pared y manifold de 2 o 4 vías para ' +
      'completar la instalación en cada ambiente.',
    descripcion: [
      'Línea de accesorios que permite montar el sistema de aspiración en el ' +
        'punto de uso: pedestales rodables de distintas alturas, placa de ' +
        'anclaje a pared y manifold para conectar varios cánister a una misma ' +
        'toma de vacío.',
    ],
    caracteristicas: [
      'Pedestales rodables de 37 cm, 56 cm y 106 cm',
      'Placa de anclaje a pared',
      'Manifold de 2 vías y de 4 vías',
      'Compatibles con toda la línea de cánister y bolsas VIDE®',
    ],
    fichas: ['bolsa-aspiracion-vide', 'canister-reusable-vide'],
  },
  {
    slug: 'tubuladura-succion-esteril',
    nombre: 'Tubo de succión estéril sin cánula Yankauer',
    categoria: 'aspiracion',
    marca: 'q-medical',
    resumen:
      'Tubo de conexión de 3 m con dos conectores y adaptador, estéril y ' +
      'desechable, en 1.8 mm y 3 mm.',
    descripcion: [
      'Dispositivo médico desechable constituido por un tubo de conexión, dos ' +
        'conectores y un adaptador. Especial para la conducción de fluidos ' +
        'corporales aspirados —sangre y secreciones— durante los procesos ' +
        'quirúrgicos.',
      'Puede utilizarse también para conducir otros líquidos y gases medicinales.',
    ],
    caracteristicas: [
      'Longitud de 3 m con adaptador de 9/32" (7 mm)',
      'Doble protección: sobre en manga mixta más bolsa interior',
      'Film de polietileno de alta densidad de 45–47 µ y papel Tyvek de 70 g/m²',
      'Apertura peel open',
      'Estéril, un solo uso',
    ],
    presentacion: 'Caja conteniendo 50 unidades en sobres individuales.',
    variantes: [
      { codigo: 'F30A18', detalle: 'Diámetro interno 1.8 mm', ficha: 'tubo-succion-esteril-1-8mm' },
      { codigo: 'F30A30', detalle: 'Diámetro interno 3 mm', ficha: 'tubo-succion-esteril-3mm' },
    ],
    fichas: ['tubo-succion-esteril-1-8mm', 'tubo-succion-esteril-3mm'],
  },
  {
    slug: 'tubuladura-silicona',
    nombre: 'Mangueras y tubuladuras de silicona SILPAK',
    categoria: 'aspiracion',
    marca: 'silpak',
    resumen:
      'Rollos de 25 m en 100 % silicona, estables de −50 °C a +250 °C, en ' +
      'diámetros variables.',
    descripcion: [
      'Mangueras en rollo de 100 % silicona, insumo que puede ser acondicionado ' +
        'para diversos usos hospitalarios. Cada rollo tiene una longitud de 25 m ' +
        'y se ofrece en diámetros variables.',
    ],
    caracteristicas: [
      'Textura suave y natural al tacto',
      'Color blanco transparente que permite visualizar fluidos y burbujas',
      'No colapsible: evita acodaduras',
      'No permite alojamiento de coágulos ni adherencias',
      'Completamente hidrófugo y atóxico',
      'Evita el desarrollo de colonias bacterianas',
      'Conserva sus propiedades de −50 °C a +250 °C',
      'Esterilizable por cualquier método',
      'Elaborado en ambiente aséptico',
      'Referencia SILNIONE MM 71160U',
    ],
    presentacion:
      'Caja de cartón conteniendo 20 o 16 rollos según diámetro; cada rollo en ' +
      'bolsa individual.',
    usos: [
      'Tubo de aspiración',
      'Drenaje para máquina de anestesia',
      'Circuitos de máquina de hemodiálisis',
    ],
    fichas: ['tubuladura-silicona-silpak'],
  },

  /* -------------------------------------------------------- Nutrición enteral */
  {
    slug: 'bomba-nutricion-enteral',
    nombre: 'Bomba de nutrición enteral MEDCAPTAIN EP-60',
    categoria: 'nutricion-enteral',
    marca: 'medcaptain',
    destacado: true,
    resumen:
      'Pantalla táctil de 4", rango de 1 a 1200 mL/h, calentador opcional y ' +
      'conexión al monitoreo central.',
    descripcion: [
      'La Enteral Feeding Pump EP-60 es una bomba de alimentación enteral fácil ' +
        'de operar, diseñada con varios programas de seguridad y función ' +
        'anti-oclusión automática. Está provista de pantalla táctil de cuatro ' +
        'pulgadas, carcasa robusta y calentador opcional.',
      'Administra soluciones nutritivas en el intestino o el estómago del ' +
        'paciente. Puede usarse en adultos y niños —no en neonatos— en ' +
        'hospitales, clínicas y centros geriátricos.',
    ],
    caracteristicas: [
      'Rango de velocidad de alimentación de 1 a 1200 mL/h',
      'Calentamiento de la solución con ajuste de temperatura',
      'Pantalla táctil de 4" con modo nocturno',
      'Función anti-oclusión automática',
      'Red inalámbrica y cableada para conexión al monitoreo central de infusión',
      'Función de llamada a enfermera',
      'Triple fuente de alimentación: CA, batería interna y respaldo',
    ],
    variantes: [
      { codigo: 'EP-60', detalle: 'Compatible con bolsas enterales de diversas marcas' },
      { codigo: 'EP-60C', detalle: 'Compatible exclusivamente con bolsas de la misma marca' },
    ],
    fichas: ['bomba-nutricion-enteral-ep60'],
  },
  {
    slug: 'bolsa-nutricion-enteral',
    nombre: 'Bolsa de alimentación enteral',
    categoria: 'nutricion-enteral',
    marca: 'q-medical',
    resumen:
      'Bolsas estériles de 500 mL y 1000 mL para uso con fórmulas y accesos ' +
      'enterales. No es para uso intravenoso.',
    descripcion: [
      'Dispositivo médico destinado a usarse con fórmulas enterales y con ' +
        'dispositivos de acceso enteral. No es para uso intravenoso.',
      'El diseño del conector y del rotulado diferencia claramente la vía ' +
        'enteral de la vía intravenosa, una medida de seguridad establecida para ' +
        'prevenir errores de conexión.',
    ],
    caracteristicas: [
      'Sobre individual de film de polietileno (45–47 µ) y papel Tyvek (70 g/m²)',
      'Apertura peel open con borde de 1 a 2 cm',
      'Rotulado totalmente en español conforme a la autoridad nacional',
      'PVC libre de DEHP',
      'Escala de medición exacta y etiqueta autoadhesiva para registrar el volumen',
      'Llave en Y para la incorporación de sustancias complementarias',
      'Compatible con bombas de nutrición enteral',
      'Libre de partículas, rebabas y aristas cortantes',
      'Estéril',
    ],
    presentacion: 'Caja de cartón conteniendo 30 sobres individuales.',
    variantes: [
      { codigo: 'B-500', detalle: '500 mL', ficha: 'bolsa-nutricion-enteral-500ml' },
      { codigo: 'B-1000-SE2', detalle: '1000 mL', ficha: 'bolsa-nutricion-enteral-1000ml' },
    ],
    fichas: ['bolsa-nutricion-enteral-500ml', 'bolsa-nutricion-enteral-1000ml'],
  },
  {
    slug: 'set-alimentacion-enteral',
    nombre: 'Set de alimentación enteral con rosca para frasco',
    categoria: 'nutricion-enteral',
    marca: 'q-medical',
    resumen:
      'Set estéril que conecta el frasco de fórmula al tubo estomacal del ' +
      'paciente. Código B-SG002B.',
    descripcion: [
      'El Enteral Feeding Bottle Set se utiliza junto con una bolsa de ' +
        'alimentación enteral y un tubo estomacal. Durante su uso permanece ' +
        'conectado al tubo que se inserta en el estómago del paciente, ' +
        'proporcionando la solución nutritiva de forma directa.',
      'Se recomienda su uso bajo la supervisión de un médico o personal ' +
        'capacitado en técnica aséptica, gestión de medicamentos, terapia de ' +
        'infusión y control de infecciones.',
    ],
    caracteristicas: [
      'Rosca compatible con frascos de fórmula enteral',
      'Sobre de polietileno y papel grado médico',
      'Apertura peel open',
      'Código de referencia B-SG002B',
      'Estéril, un solo uso',
    ],
    presentacion:
      'Caja de cartón corrugado por 30 sobres individuales; cada sobre con un ' +
      'dispositivo.',
    fichas: ['set-alimentacion-enteral'],
  },

  /* ----------------------------------------------------------------- Vía aérea */
  {
    slug: 'videolaringoscopio',
    nombre: 'Videolaringoscopio MEDCAPTAIN VS-10',
    categoria: 'via-aerea',
    marca: 'medcaptain',
    destacado: true,
    resumen:
      'Pantalla táctil LCD a color de 3.5", grabación de foto y video, batería ' +
      'de al menos 4 horas y salida HDMI.',
    descripcion: [
      'El videolaringoscopio MEDCAPTAIN utiliza tecnología de cámara para ' +
        'visualizar la laringe y facilitar al médico la intubación endotraqueal ' +
        'sin dificultad.',
      'Está diseñado para que el personal médico levante la epiglotis del ' +
        'paciente y exponga la glotis para una intubación traqueal precisa, ' +
        'implementando anestesia o primeros auxilios. También se utiliza para ' +
        'examen y tratamiento intraoral.',
    ],
    caracteristicas: [
      'Compatible con hojas de distintos tamaños: recién nacido, bebé, niño, adulto y adulto mayor',
      'Pantalla táctil LCD a color de 3.5 pulgadas con brillo ajustable',
      'Fuente de luz LED de brillo regulable',
      'Ajuste automático del balance de blancos y alta resolución',
      'Recubrimiento antivaho sin necesidad de precalentar la hoja',
      'Batería de litio recargable con autonomía no inferior a 4 horas',
      'Captura de fotografías y grabación de video',
      'Transmisión de archivos por cable e inalámbrica; puerto HDMI',
      'Mango ergonómico',
    ],
    variantes: [
      { codigo: 'VS-10S', detalle: 'Configuración estándar' },
      { codigo: 'VS-10M', detalle: 'Configuración media' },
      { codigo: 'VS-10H', detalle: 'Configuración alta' },
    ],
    fichas: ['videolaringoscopio-vs10'],
  },
  {
    slug: 'hojas-videolaringoscopio',
    nombre: 'Hojas de videolaringoscopio desechables',
    categoria: 'via-aerea',
    marca: 'medcaptain',
    resumen:
      'Hojas de policarbonato en todas las tallas, incluida vía aérea difícil y ' +
      'paciente obeso.',
    descripcion: [
      'La hoja de laringoscopio desechable está diseñada para usarse con el ' +
        'videolaringoscopio. Está disponible en varias presentaciones conforme a ' +
        'las necesidades del paciente: infante, niño, adulto, pacientes con ' +
        'dificultades respiratorias y pacientes obesos. Fabricada en policarbonato.',
    ],
    caracteristicas: [
      'Policarbonato de grado médico',
      'Tallas para infante, niño, adulto, vía aérea difícil y paciente obeso',
      'Sobre de papel grado médico y polietileno por unidad',
      'Un solo uso: elimina el reprocesamiento y la contaminación cruzada',
    ],
    presentacion:
      'Caja de cartón grado médico conteniendo 12 sobres; cada sobre con una unidad.',
    fichas: ['hojas-videolaringoscopio'],
  },

  /* ------------------------------------------------------ Higiene del paciente */
  {
    slug: 'pano-bano-facil',
    nombre: 'Paños jabonosos Baño Fácil',
    categoria: 'higiene-paciente',
    marca: 'bano-facil',
    destacado: true,
    resumen:
      'Baño en cama sin enjuague, en tres formulaciones: aloe vera, clorhexidina ' +
      'y manzanilla.',
    descripcion: [
      'Paño de tela no tejida embebido con una sustancia jabonosa para la ' +
        'higiene personal del paciente encamado. No necesita enjuague, lo que ' +
        'reduce el tiempo de procedimiento y el consumo de agua en sala.',
      'Cada paño mide 20 × 20 cm y contiene 1.5 g de agente de limpieza, con un ' +
        'pH de 5.8 a 6.5 compatible con la piel.',
    ],
    caracteristicas: [
      'Descartable y no necesita enjuague',
      'Superficie de 400 cm² (20 × 20 cm) con 1.5 g de agente de limpieza',
      'Gramaje de 100 g/m² (± 10 g/m²)',
      'pH de 5.8 a 6.5 y densidad de 1.010 a 1.070 g/mL',
      'Control de espuma de 8 a 12 mL',
      'Libre de látex y metales pesados',
      'No estéril, hipoalergénico y atóxico',
    ],
    presentacion:
      'Caja conteniendo 100 bolsas de polipropileno biorientado (BOPP); cada ' +
      'bolsa con 10 paños.',
    variantes: [
      { codigo: 'Aloe vera', detalle: 'Color celeste', ficha: 'bano-facil-aloe-vera' },
      { codigo: 'Clorhexidina', detalle: 'Color verde', ficha: 'bano-facil-clorhexidina' },
      { codigo: 'Manzanilla', detalle: 'Color rosado', ficha: 'bano-facil-manzanilla' },
    ],
    fichas: ['bano-facil-aloe-vera', 'bano-facil-clorhexidina', 'bano-facil-manzanilla'],
  },
  {
    slug: 'toalla-secado-corporal',
    nombre: 'Toalla para secado corporal Q-MEDICAL',
    categoria: 'higiene-paciente',
    marca: 'q-medical',
    resumen:
      'Toalla de un solo uso de 130 × 65 cm, absorción ≥ 5 mL/g y 80 % ' +
      'biodegradable.',
    descripcion: [
      'Toalla para secado corporal de color blanco, empaquetada individualmente ' +
        'en bolsa plástica con asa superior y delineado para fácil apertura. ' +
        'Suave al tacto, de alta absorción y resistencia.',
    ],
    caracteristicas: [
      'Tamaño de 130 cm × 65 cm (± 5 %)',
      'Capacidad de absorción ≥ 5 mL/g y velocidad ≥ 55 mm/60 s',
      'Peso base de 80 g',
      'Biodegradable en un 80 %',
      'Libre de metales pesados (As, Cd, Cr, Pb, Sb, Hg) y sin olor',
      'pH cercano al neutro',
      'No estéril (aséptico), un solo uso',
    ],
    presentacion: 'Caja de cartón conteniendo 130 bolsas; cada bolsa con una toalla.',
    usos: [
      'Secado corporal en hospitales y centros geriátricos',
      'Cuidado del paciente en casa',
      'Spa, gimnasios, hotelería y zonas húmedas',
    ],
    fichas: ['toalla-secado-corporal'],
  },
  {
    slug: 'pano-clinico-qmedical',
    nombre: 'Paño clínico súper absorbente Q-MEDICAL',
    categoria: 'higiene-paciente',
    marca: 'q-medical',
    resumen:
      'Paño blanco de un solo uso con superficie en altorrelieve, en bolsa ' +
      'dispensadora por 50 unidades.',
    descripcion: [
      'Paño clínico ideal para disminuir los riesgos de contaminación cruzada ' +
        'en instituciones de salud y laboratorios. Su bolsa dispensadora permite ' +
        'retirar los paños de uno en uno manteniendo limpio el resto del contenido.',
    ],
    caracteristicas: [
      'Color blanco, suave al tacto',
      'Superficie con altorrelieves para mayor capacidad de arrastre',
      'Libre de rebabas, aristas cortantes, partículas extrañas y manchas',
      'Composición: 80 % celulosa y 20 % emulsión',
      'Resistente al rasgado y sin desprendimiento de partículas',
      'No irrita la piel',
      'Código PCA-8020SA',
      'Un solo uso',
    ],
    presentacion:
      'Caja de cartón por 12 bolsas dispensadoras de LDPE; cada bolsa con 50 paños.',
    fichas: ['pano-clinico-qmedical'],
  },
  {
    slug: 'pano-clinico-telijie',
    nombre: 'Paño clínico absorbente TELIJIE',
    categoria: 'higiene-paciente',
    marca: 'telijie',
    resumen:
      'Paño de 4 capas reforzado con malla de hilo de algodón, en bolsa ' +
      'dispensadora recerrable.',
    descripcion: [
      'Paños clínicos ideales para disminuir los riesgos de contaminación ' +
        'cruzada en instituciones de salud y laboratorios. Su práctico empaque ' +
        'permite retirar los paños por el extremo y volver a taparlos para ' +
        'conservarlos limpios todo el tiempo.',
    ],
    caracteristicas: [
      'Cuatro capas reforzadas con malla de hilo de algodón en el interior',
      'Bolsa dispensadora de LDPE recerrable',
      'Código PCA-001SP',
      'Un solo uso',
    ],
    presentacion:
      'Caja de cartón conteniendo 30 bolsas; cada bolsa con 50 paños.',
    usos: [
      'Secado de manos quirúrgico',
      'Baño de pacientes',
      'Limpieza de instrumental quirúrgico y equipos médicos',
    ],
    fichas: ['pano-clinico-telijie'],
  },
  {
    slug: 'bolsa-vomito',
    nombre: 'Bolsa para emesis',
    categoria: 'higiene-paciente',
    marca: 'q-medical',
    resumen:
      'Bolsa translúcida azul con aro rígido y graduación, 100 % reciclable. ' +
      'Caja por 500 unidades.',
    descripcion: [
      'Dispositivo destinado a recoger y contener el vómito, tanto en el ámbito ' +
        'hospitalario como en el transporte de pasajeros. Su aro rígido y el ' +
        'cierre facilitan la manipulación y el descarte sin exposición.',
    ],
    caracteristicas: [
      'Bolsa translúcida de color azul que permite visualizar el nivel de contenido',
      'Elimina la exposición a la emesis del paciente y del personal asistencial',
      '100 % reciclable',
      'Libre de látex, metales pesados y ftalatos',
      'Referencia PMID01',
      'No estéril',
    ],
    presentacion:
      'Caja de cartón conteniendo 500 unidades distribuidas en 20 bolsas de 25 piezas.',
    fichas: ['bolsa-emesis'],
  },

  /* ------------------------------------------------------------- Absorbentes */
  {
    slug: 'manta-absorbente-jiehong',
    nombre: 'Manta absorbente de fluidos JIEHONG',
    categoria: 'absorbentes',
    marca: 'jiehong',
    resumen:
      'Manta de piso impermeable y antideslizante, absorción > 3.0 L/m². ' +
      'Disponible precortada.',
    descripcion: [
      'Dispositivo médico diseñado para mantener el piso del quirófano limpio y ' +
        'seco, evitando los deslizamientos en aquellos procedimientos ' +
        'quirúrgicos que provocan fluidos intensos.',
      'La versión reversible precortada permite adaptar el tamaño de la manta a ' +
        'la superficie a proteger sin herramientas.',
    ],
    caracteristicas: [
      'Lámina inferior impermeable y antideslizante',
      'Alta absorción de líquidos: > 3.0 L/m²',
      'Absorción inmediata de soluciones salinas, sangre y fluidos corporales',
      'Se adapta a diferentes superficies sin aglomerarse',
      'Tres capas de laminación',
      'Dimensiones de 36 × 44 pulgadas (91.4 × 111.8 cm), ~455 g',
      'Descartable',
    ],
    presentacion: 'Empaque individual en bolsa de polietileno de baja densidad.',
    variantes: [
      { codigo: 'Q202', detalle: 'Manta continua para piso', ficha: 'manta-absorbente-jiehong-piso' },
      { codigo: 'Reversible', detalle: 'Precortada de doble cara', ficha: 'manta-absorbente-jiehong-precortada' },
    ],
    fichas: ['manta-absorbente-jiehong-piso', 'manta-absorbente-jiehong-precortada'],
  },
  {
    slug: 'manta-absorbente-xodus',
    nombre: 'Manta absorbente antideslizante The Camel — XODUS',
    categoria: 'absorbentes',
    marca: 'xodus',
    resumen:
      'Ultra absorbente con forro antideslizante e impermeable: 4.44 L por ' +
      'manta, 5.53 L/m².',
    descripcion: [
      'Dispositivo médico diseñado para ayudar a mantener el quirófano limpio, ' +
        'seco y seguro frente a resbalones, caídas y contaminantes.',
    ],
    caracteristicas: [
      'Capacidad de absorción de 4.44 L por manta (5.53 L/m²)',
      'Superficie lisa y compacta provista de poros para absorción inmediata',
      'Absorbe sangre, fluidos corporales y agentes cáusticos',
      'Impermeable: retiene los fluidos y evita la formación de lodo',
      'Base antideslizante',
      'Fácil de tender y retirar',
      'Referencia 80522',
    ],
    presentacion: 'Caja por 12 unidades individuales.',
    fichas: ['manta-absorbente-xodus'],
  },
  {
    slug: 'protector-impermeable',
    nombre: 'Protector de tela plástica impermeable MEDISPO',
    categoria: 'absorbentes',
    marca: 'medispo',
    resumen:
      'Manta protectora de colchón con capa superior semipermeable y barrera ' +
      'inferior impermeable.',
    descripcion: [
      'Manta protectora impermeable, ideal para el recubrimiento y protección ' +
        'de superficies difíciles de limpiar y secar por el derrame de fluidos ' +
        'como agua u orina.',
    ],
    caracteristicas: [
      'Capa superior blanca semipermeable',
      'Barrera inferior impermeable',
      'Bolsa individual de PE que garantiza hermeticidad',
      'Código HQ201512',
      'Descartable',
    ],
    presentacion:
      'Caja de cartón conteniendo 60 protectores, cada uno en bolsa individual.',
    fichas: ['protector-impermeable-medispo'],
  },

  /* ------------------------------------------------------------ Instrumental */
  {
    slug: 'marcador-piel-esteril',
    nombre: 'Marcador de piel estéril desechable Q-MEDICAL',
    categoria: 'instrumental',
    marca: 'q-medical',
    resumen:
      'Marcador estéril con regla quirúrgica incluida, en blíster individual. ' +
      'Referencia 663 022.',
    descripcion: [
      'Marcadores estériles diseñados para facilitar la identificación y el ' +
        'trazo del contorno del campo quirúrgico sobre la piel donde se ' +
        'realizará la intervención, permitiendo localizar de forma segura y ' +
        'confiable la zona exacta de la incisión. Incluyen regla.',
    ],
    caracteristicas: [
      'Regla quirúrgica incluida en cada blíster',
      'Empaque primario de papel grado médico y film de polietileno',
      'Apertura peel open',
      'Referencia 663 022',
      'Hipoalergénico y libre de látex',
      'Contribuye a evitar infecciones de sitio quirúrgico',
      'Estéril, un solo uso',
    ],
    presentacion:
      'Caja de cartulina con 25 blísteres; embalaje corrugado por 10 cajas.',
    fichas: ['marcador-piel-esteril'],
  },
  {
    slug: 'marcador-piel-no-esteril',
    nombre: 'Marcador quirúrgico no estéril XODUS',
    categoria: 'instrumental',
    marca: 'xodus',
    resumen:
      'Marcador de trazo directo sobre piel, formato pequeño. Referencia NS10402.',
    descripcion: [
      'Marcador quirúrgico no estéril para trazo directo sobre la piel, en ' +
        'formato pequeño, indicado para marcaje preoperatorio fuera del campo ' +
        'estéril.',
    ],
    caracteristicas: [
      'Trazo directo sobre piel',
      'Formato pequeño (Correct Site Marker)',
      'Referencia NS10402',
      'No estéril',
    ],
    fichas: ['marcador-piel-no-esteril-xodus'],
  },
  {
    slug: 'bolsa-conteo-gasas',
    nombre: 'Bolsa para conteo de gasas y esponjas',
    categoria: 'instrumental',
    marca: 'q-medical',
    resumen:
      'Faja plástica de cinco bolsillos para el recuento verificable de gasas ' +
      'durante la intervención. Referencia RIP-003.',
    descripcion: [
      'Dispositivo utilizado principalmente en quirófanos para facilitar, ' +
        'organizar y verificar el recuento de gasas, torundas o esponjas ' +
        'quirúrgicas empleadas durante una intervención.',
      'Está diseñado para garantizar la seguridad del paciente y prevenir que ' +
        'se dejen accidentalmente gasas dentro del cuerpo intervenido, situación ' +
        'conocida como textiloma o gossypiboma.',
    ],
    caracteristicas: [
      'Faja plástica provista de cinco bolsillos transparentes',
      'Permite la verificación visual del recuento por el equipo quirúrgico',
      'Caja dispensadora de cartulina grado médico',
      'Referencia RIP-003',
    ],
    presentacion:
      'Caja dispensadora con 50 bolsas; caja de cartón con 8 dispensadores ' +
      '(400 unidades).',
    fichas: ['bolsas-conteo-esponjas'],
  },
  {
    slug: 'limpiador-puntas-electrocauterio',
    nombre: 'Limpiador de puntas de electrocauterio',
    categoria: 'instrumental',
    marca: 'q-medical',
    resumen:
      'Almohadilla abrasiva desechable para retirar la escara del lápiz de ' +
      'electrocirugía sin dañar la punta.',
    descripcion: [
      'Dispositivo médico diseñado para limpiar con seguridad y eficacia las ' +
        'puntas de los lápices para electrocirugía, manteniendo la eficiencia ' +
        'del corte y la coagulación durante toda la intervención.',
    ],
    caracteristicas: [
      'Sobre individual en manga mixta de LDPE y papel grado médico',
      'Apertura peel open',
      'Referencia Tipo A',
      'Un solo uso',
    ],
    presentacion:
      'Caja por 200 sobres individuales; embalaje por 4 cajas (800 sobres).',
    fichas: ['limpiador-puntas-electrocauterio'],
  },
  {
    slug: 'cepillos-limpieza-instrumental',
    nombre: 'Cepillos para limpieza de instrumental médico',
    categoria: 'instrumental',
    marca: 'q-medical',
    resumen:
      'Familia de cepillos con cerdas de nailon y de latón para la limpieza ' +
      'manual en central de esterilización.',
    descripcion: [
      'Línea de cepillos para la limpieza manual de instrumental quirúrgico en ' +
        'la central de esterilización. Incluye formatos de cerda fina para ' +
        'lúmenes y articulaciones, y cerda de latón para depósitos resistentes.',
      'Los mangos ergonómicos con orificio de colgado permiten mantener el ' +
        'orden y el secado del cepillo entre usos.',
    ],
    caracteristicas: [
      'Cerdas de nailon y de acero según formato',
      'Mango ergonómico con orificio de colgado',
      'Formatos de doble cabezal para limpieza de ranuras',
      'Libres de látex',
      'No estériles',
    ],
    variantes: [
      { codigo: 'N-2100', detalle: 'Escobilla de nailon blanco · 17.78 cm · cerda de 3.6 cm' },
      { codigo: 'S-2100', detalle: 'Escobilla con cerdas de acero · 17.78 cm' },
      { codigo: 'D-2100', detalle: 'Escobilla de nailon blanco · 17.78 cm · cerda de 3.6 cm' },
      { codigo: 'N-2121', detalle: 'Doble cabezal: nailon blanco y acero · 17.78 cm' },
      { codigo: 'N-3000', detalle: 'Cerdas con sustancia antimicrobiana · mango de bloque · 17.78 cm' },
      { codigo: 'N-4000', detalle: '16 filas de cerdas antimicrobianas · mango anatómico · 18 cm' },
    ],
    fichas: [],
  },

  /* ------------------------------------------------------ Protección personal */
  {
    slug: 'guantes-nitrilo',
    nombre: 'Guantes de nitrilo 6.5 g COMFORT',
    categoria: 'proteccion-personal',
    marca: 'comfort-rubber-gloves',
    destacado: true,
    resumen:
      'Guante de alto riesgo, libre de látex y de polvo, resistente a agentes ' +
      'químicos y citostáticos.',
    descripcion: [
      'Guantes de uso médico elaborados para proteger frente a riesgos ' +
        'químicos, microbiológicos y citostáticos. Protegen contra la ' +
        'contaminación en procedimientos con pacientes de alto riesgo, manejo de ' +
        'drogas oncológicas, tratamientos químicos y tratamiento de metales con ' +
        'disolventes.',
    ],
    caracteristicas: [
      'Nitrilo de alto riesgo, no estéril y ambidiestro',
      'Punta de dedo texturizada para mejor agarre; superficie interna lisa',
      'Libre de polvo (residuos ≤ 2 mg por guante) y libre de látex',
      'Clorinados para asegurar la eliminación de contaminación residual',
      'Resistente a la penetración por aldehídos, álcalis, bencenos y otros agentes',
      'Resistente a la permeabilidad de sustancias citotóxicas',
      'Resistencia a la tracción ≥ 14 MPa antes y después del envejecimiento',
      'Resistencia al estiramiento ≥ 500 % antes del envejecimiento',
      'Hipoalergénico, color azul',
    ],
    presentacion: 'Caja de cartón multiempaque.',
    variantes: [
      { codigo: '6.5 g · S', detalle: 'Largo 300 mm · ancho 85 ± 5 mm · palma 0.10 mm · dedos 0.15 mm' },
      { codigo: '6.5 g · M', detalle: 'Largo 300 mm · ancho 95 ± 5 mm · palma 0.10 mm · dedos 0.15 mm' },
      { codigo: '6.5 g · L', detalle: 'Largo 300 mm · ancho 105 ± 5 mm · palma 0.10 mm · dedos 0.15 mm' },
      { codigo: '6.5 g · XL', detalle: 'Largo 300 mm · ancho 115 ± 5 mm · palma 0.10 mm · dedos 0.15 mm' },
      { codigo: '3.5 g · S/M/L', detalle: 'Largo 240 mm · palma 0.07 mm · dedos 0.10 mm — línea de examen' },
    ],
    fichas: ['guantes-nitrilo-comfort'],
  },
];

/* ------------------------------------------------------------------ helpers */

const imagenes = manifest.productos as Record<string, string[]>;
export const fichasIndex = fichas as Record<string, Ficha>;

export const categoriaPorSlug = new Map(categorias.map((c) => [c.slug, c]));
export const productoPorSlug = new Map(productos.map((p) => [p.slug, p]));

export function imagenesDe(slug: string): string[] {
  return imagenes[slug] ?? [];
}

/** Imagen principal del producto, en la variante de ancho indicada. */
export function imagenPrincipal(slug: string, size: 900 | 480 = 900): string {
  const first = imagenesDe(slug)[0];
  if (!first) return '';
  return '/img/' + (size === 900 ? first : first.replace('.webp', '-480.webp'));
}

export function fichasDe(slug: string): Ficha[] {
  const p = productoPorSlug.get(slug);
  if (!p) return [];
  return p.fichas.map((f) => fichasIndex[f]).filter(Boolean);
}

export function productosDeCategoria(cat: string): Producto[] {
  return productos.filter((p) => p.categoria === cat);
}

export function productosDestacados(): Producto[] {
  return productos.filter((p) => p.destacado);
}
