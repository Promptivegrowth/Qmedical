/**
 * Catálogo en inglés.
 *
 * Es un solapamiento sobre el dato en castellano: lo que no esté aquí se
 * muestra en castellano, de modo que una traducción a medias nunca deja la
 * página vacía. Se indexa por el slug del producto, que es común a los dos
 * idiomas.
 *
 * Las características, las medidas y las unidades se traducen por su texto,
 * no por su posición: la misma línea («Caja x 12 unidades», «Material:
 * polipropileno rígido compostable») se repite en decenas de presentaciones,
 * y traducirla una vez evita que una reordenación del catálogo desalinee la
 * ficha en inglés.
 */

export interface ProductoEn {
  nombre?: string;
  descripcion?: string;
  /**
   * Descripción propia de una presentación, por su posición en el arreglo
   * castellano. Solo seis productos la tienen.
   */
  descripciones?: Record<number, string>;
}

export const lineasEn: Record<string, { nombre: string; resumen: string }> = {
  bioseguridad: {
    nombre: 'Biosafety',
    resumen:
      'Products for preventing and controlling biological risk in healthcare ' +
      'facilities.',
  },
  'instrumental-para-cirugia-laparoscopica': {
    nombre: 'Laparoscopic surgery instruments',
    resumen:
      'Specialist instruments and solutions for minimally invasive surgical ' +
      'procedures.',
  },
  aspiracion: {
    nombre: 'Suction',
    resumen: 'Devices and accessories for suctioning secretions and fluids.',
  },
  antisepsia: {
    nombre: 'Antisepsis',
    resumen: 'Products for cleaning, disinfecting and preparing the skin.',
  },
  'nutricion-enteral': {
    nombre: 'Enteral nutrition',
    resumen:
      'Devices and accessories for the safe administration of nutrients by the ' +
      'enteral route.',
  },
  'higiene-del-paciente': {
    nombre: 'Patient hygiene',
    resumen: 'Products for patient care, washing and comfort.',
  },
  absorbente: {
    nombre: 'Absorbents',
    resumen: 'Solutions for fluid management and hospital care needs.',
  },
  'proteccion-personal': {
    nombre: 'Personal protection',
    resumen:
      'Equipment and accessories that protect healthcare staff from a range of ' +
      'risks.',
  },
  'material-medico-no-instrumental': {
    nombre: 'Non-instrumental medical supplies',
    resumen: 'Disposable medical supplies and hospital consumables.',
  },
  'via-aerea': {
    nombre: 'Airway',
    resumen:
      'Devices for managing, maintaining and protecting the airway.',
  },
  'nutricion-parenteral': {
    nombre: 'Parenteral nutrition',
    resumen:
      'Products and accessories for the intravenous administration of nutrients.',
  },
};

export const categoriasEnCat: Record<string, string> = {
  'contenedores-de-bioseguridad': 'Biosafety containers',
  'tapetes-adhesivos-alfombras-descontaminantes': 'Adhesive mats (decontamination mats)',
  'trocar-para-cirugia-laparoscopica': 'Laparoscopic trocars',
  'pinzas-para-cirugia-laparoscopica': 'Laparoscopic forceps',
  'bolsas-de-aspiracion': 'Suction bags',
  'accesorios-para-aspiracion': 'Suction accessories',
  'tubos-de-succion-esteril': 'Sterile suction tubing',
  'manguera-o-tubuladura-de-silicona': 'Silicone hose and tubing',
  'aplicadores-clorhexidina-2': 'Chlorhexidine 2% + isopropyl alcohol 70% applicators',
  'bolsas-de-nutricion-enteral': 'Enteral nutrition bags',
  'set-de-nutricion-enteral': 'Enteral nutrition sets',
  'bomba-de-nutricion-enteral': 'Enteral feeding pumps',
  'pano-bano-facil': 'Baño Fácil cloths',
  'toalla-para-secado-corporal': 'Body drying towels',
  'pano-clinico-absorbente': 'Absorbent clinical cloths',
  'bolsa-emesis': 'Emesis bags',
  'manta-absorbente-de-fluidos': 'Fluid absorbent mats',
  'protector-tela-impermeable': 'Waterproof plastic sheet protectors',
  'guantes-de-nitrilo-sin-polvo-6-5-gr': 'Powder-free nitrile gloves 6.5 g',
  'marcador-de-piel': 'Skin markers',
  'contador-de-aguja': 'Needle counters',
  'bolsas-para-contar-gasas': 'Gauze counting bags',
  'limpiador-puntas-electrocauterio': 'Electrocautery tip cleaners',
  'cepillos-para-limpieza-de-instrumental-medico': 'Instrument cleaning brushes',
  videolaringoscopio: 'Video laryngoscopes',
  'hojas-de-videolaringoscopio': 'Video laryngoscope blades',
  'bomba-de-infusion': 'Infusion pumps',
  'bomba-de-jeringa': 'Syringe pumps',
};

/**
 * Medidas. La mayoría no se traduce —«0.95 L» o «M3» se leen igual—, así que
 * aquí solo están las que llevan palabras.
 */
export const medidasEn: Record<string, string> = {
  '2 VÍAS': '2-WAY',
  '4 VÍAS': '4-WAY',
  'TALLA S': 'SIZE S',
  'TALLA M': 'SIZE M',
  'TALLA L': 'SIZE L',
  'TALLA XL': 'SIZE XL',
  MANZANILLA: 'CHAMOMILE',
  'ALOE VERA': 'ALOE VERA',
  CLORHEXIDINA: 'CHLORHEXIDINE',
  'CELULOSA 100%': 'CELLULOSE 100%',
  'CELULOSA 80% - POLIPROPILENO 20%': 'CELLULOSE 80% - POLYPROPYLENE 20%',
  'DOBLE MAGNETO 30 RECUENTOS': 'DOUBLE MAGNET, 30 COUNTS',
  'ANTIDESLIZANTE - Q202': 'NON-SLIP - Q202',
  'PRECORTADA - Q101': 'PRE-CUT - Q101',
};

/** Unidad de venta. */
export const unidadesEn: Record<string, string> = {
  unidad: 'unit',
  unidades: 'units',
  'rollo x 25 m': 'roll of 25 m',
  'caja x 01 und': 'box of 1 unit',
  'caja x 4 und': 'box of 4 units',
  'caja x 06 und': 'box of 6 units',
  'caja x 10 und': 'box of 10 units',
  'caja x 11 und': 'box of 11 units',
  'caja x 15 und': 'box of 15 units',
  'caja x 25 und': 'box of 25 units',
  'caja x 30 und': 'box of 30 units',
  'caja x 40 und': 'box of 40 units',
  'caja x 50 und': 'box of 50 units',
  'caja x 80 und': 'box of 80 units',
  'caja x 100 und': 'box of 100 units',
  'caja x 200 und': 'box of 200 units',
  'caja x 28 blísteres': 'box of 28 blisters',
  'paq x 5 und': 'pack of 5 units',
  'paq x 10 und': 'pack of 10 units',
  'paq x 25 und': 'pack of 25 units',
  'paq x 50 und': 'pack of 50 units',
};

/**
 * Características, línea a línea. La ficha de producto parte cada línea en el
 * primer «:» para armar la tabla de especificaciones, así que la traducción
 * conserva esa estructura.
 */
export const caracteristicasEn: Record<string, string> = {
  /* ── Envase ─────────────────────────────────────────────────────────── */
  'Caja x 4 unidades': 'Box of 4 units',
  'Caja x 6 paquetes': 'Box of 6 packs',
  'Caja x 10 unidades': 'Box of 10 units',
  'Caja x 12 unidades': 'Box of 12 units',
  'Caja x 12 paquetes': 'Box of 12 packs',
  'Caja x 20 unidades': 'Box of 20 units',
  'Caja x 20 paquetes': 'Box of 20 packs',
  'Caja x 24 unidades': 'Box of 24 units',
  'Caja x 30 unidades': 'Box of 30 units',
  'Caja x 30 paquetes': 'Box of 30 packs',
  'Caja x 40 unidades': 'Box of 40 units',
  'Caja x 50 unidades': 'Box of 50 units',
  'Caja x 60 unidades': 'Box of 60 units',
  'Caja x 130 bolsas': 'Box of 130 bags',
  'Presentaciones:': 'Pack sizes:',
  '- 1 L y 1.5 L: caja x 20 unidades': '- 1 L and 1.5 L: box of 20 units',
  '- 3 L: caja x 12 unidades': '- 3 L: box of 12 units',

  /* ── Encabezados ────────────────────────────────────────────────────── */
  'Materiales:': 'Materials:',
  Materiales: 'Materials',
  MATERIALES: 'MATERIALS',
  'Material componentes:': 'Component materials:',
  'Material Componentes Trocar': 'Trocar component materials',
  'COMPONENTES Y MATERIALES': 'COMPONENTS AND MATERIALS',
  COMPOSICIÓN: 'COMPOSITION',
  'COMPOSICIÓN Y COLOR': 'COMPOSITION AND COLOUR',
  'COMPOSICIÓN Y MATERIALES': 'COMPOSITION AND MATERIALS',
  MEDIDAS: 'SIZES',
  ESPECIFICACIONES: 'SPECIFICATIONS',

  /* ── Contenedores de bioseguridad ───────────────────────────────────── */
  'Material: Polipropileno rígido compostable': 'Material: compostable rigid polypropylene',
  'Material: polipropileno rígido compostable': 'Material: compostable rigid polypropylene',
  'Volumen: 0.95 L': 'Volume: 0.95 L',
  'Volumen: 1.89 L': 'Volume: 1.89 L',
  'Volumen : 3.8 L': 'Volume: 3.8 L',
  'Volumen : 3.8 L (1 G)': 'Volume: 3.8 L (1 gal)',
  'Volumen : 4.7 L': 'Volume: 4.7 L',
  'Volumen : 7.6 L': 'Volume: 7.6 L',
  'Volumen : 7.6 L (2 G)': 'Volume: 7.6 L (2 gal)',
  'Volumen : 11.4 L': 'Volume: 11.4 L',
  'Volumen : 22.7 L': 'Volume: 22.7 L',
  'Volumen : 30.3 L': 'Volume: 30.3 L',

  /* ── Tapete descontaminante ─────────────────────────────────────────── */
  'Hojas o Láminas: PE de baja densidad': 'Sheets: low-density PE',
  'Material adhesivo: acrílico en solución acuosa a base de agua para agentes antibacterianos.':
    'Adhesive: water-based acrylic solution that carries the antibacterial agents.',
  'Sustancia antibacteriana: Isotiazolinona': 'Antibacterial substance: isothiazolinone',

  /* ── Trocar ─────────────────────────────────────────────────────────── */
  'Cánula con llave de paso:': 'Cannula with stopcock:',
  '- Cánula: Policarbonato (PC)': '- Cannula: polycarbonate (PC)',
  '- Base de la cánula: Acrilonitrilo Butadieno Estireno (ABS)':
    '- Cannula base: acrylonitrile butadiene styrene (ABS)',
  '- Tapa de ajuste: ABS': '- Adjusting cap: ABS',
  '- Válvula de llenado: PC': '- Insufflation valve: PC',
  'Punzón u Obturador:': 'Spike or obturator:',
  '- Cuchilla: acero inoxidable 304': '- Blade: 304 stainless steel',
  '- Aguja de punción: ABS': '- Puncture needle: ABS',
  '- Barra de conexión tipo III: ABS': '- Type III connecting rod: ABS',
  '- Casquete tipo alfiler: PC': '- Pin-type cap: PC',
  '- 2 piezas de cánula de 5 mm con llave de paso,': '- 2 cannulas, 5 mm, with stopcock,',
  '- 3 piezas de cánula de 5 mm con llave de paso,': '- 3 cannulas, 5 mm, with stopcock,',
  '- 1 piezas de cánula de 10 mm con llave de paso,': '- 1 cannula, 10 mm, with stopcock,',
  '- 2 piezas de cánula de 10 mm con llave de paso,': '- 2 cannulas, 10 mm, with stopcock,',
  '- 1 pieza de obturador con punta dilatadora de 5 mm,':
    '- 1 obturator with a 5 mm dilating tip,',
  '- 1 pieza de obturador con punta dilatadora de 10 mm,':
    '- 1 obturator with a 10 mm dilating tip,',
  '- 1 pieza de aguja de Veress de 2.1 mm x 120 mm,': '- 1 Veress needle, 2.1 mm x 120 mm,',
  '- 1 bolsa estándar de 250 mL.': '- 1 standard 250 mL bag.',

  /* ── Instrumental monopolar ─────────────────────────────────────────── */
  'Electrodo (punta Disector):': 'Electrode (dissector tip):',
  '- Acero inoxidable 304 (Al 304)': '- 304 stainless steel (AISI 304)',
  '- Al 304': '- AISI 304',
  '- AI 304': '- AISI 304',
  'Tubo de aislamiento:': 'Insulating tube:',
  '- Polietileno de Alta Densidad (HDPE) y politetrafluoroetileno o teflón (PTFE).':
    '- High-density polyethylene (HDPE) and polytetrafluoroethylene or Teflon (PTFE).',
  '- Polietileno de Alta densidad (HDPE) y politetrafluoroetileno o teflón (PTFE).':
    '- High-density polyethylene (HDPE) and polytetrafluoroethylene or Teflon (PTFE).',
  'Perilla de rotación': 'Rotation knob',
  '- Acrilonitrilo Butadieno Estireno (ABS) y Polifenilsulfona (PPSU).':
    '- Acrylonitrile butadiene styrene (ABS) and polyphenylsulfone (PPSU).',
  Mango: 'Handle',
  'Conector de electrodo (pin)': 'Electrode connector (pin)',

  /* ── Aspiración ─────────────────────────────────────────────────────── */
  '- Tapa: Polietileno (PE)': '- Lid: polyethylene (PE)',
  '- Forro o bolsa: PE + Poliamida (PA)': '- Liner or bag: PE + polyamide (PA)',
  '- Filtro: Polietileno de Peso Molecular Ultra Alto (UHMWPE).':
    '- Filter: ultra-high-molecular-weight polyethylene (UHMWPE).',
  '- Codo de unión: PE': '- Connecting elbow: PE',
  '- Tapa: polietileno de baja densidad, color amarillo':
    '- Lid: low-density polyethylene, yellow',
  '- Tapa: polietileno de baja densidad, color rosado':
    '- Lid: low-density polyethylene, pink',
  '- Forro o cuerpo de la bolsa: polietileno de baja densidad mas Nailon multicapa (PA)':
    '- Bag liner or body: low-density polyethylene with multilayer nylon (PA)',
  '- Forro o cuerpo de la bolsa: polietileno de baja densidad más Nailon multicapa (PA)':
    '- Bag liner or body: low-density polyethylene with multilayer nylon (PA)',
  '- Válvula mecánica: Tereftalato de Polietileno.':
    '- Mechanical valve: polyethylene terephthalate.',
  '- Canister: Policarbonato (PC)': '- Canister: polycarbonate (PC)',
  '- Llave de paso: PC': '- Stopcock: PC',
  '- Manguera conectora: Policloruro de vinilo (PVC)':
    '- Connecting hose: polyvinyl chloride (PVC)',
  'Material: Canister de policarbonato con tubo de vacío de vinil reforzado.':
    'Material: polycarbonate canister with reinforced vinyl vacuum tubing.',
  'Fijos y rodantes de Policarbonato y PVC.':
    'Fixed and rolling models in polycarbonate and PVC.',
  'Hechos de un copolímero de Policarbonato y Siloxano.':
    'Made from a polycarbonate and siloxane copolymer.',
  'Manguera para el soporte sobre ruedas.': 'Hose for the rolling stand.',
  'Material: Policloruro de vinilo.': 'Material: polyvinyl chloride.',
  'Material: 100% silicona (Silbione MM 71160 U): comprende gomas de polimetil fenil siloxano y sílice.':
    'Material: 100% silicone (Silbione MM 71160 U): polymethyl phenyl siloxane rubbers and silica.',

  /* ── Antisepsia ─────────────────────────────────────────────────────── */
  'Composición: cada 100 g de producto contiene:':
    'Composition: each 100 g of product contains:',
  '• Gluconato de clorhexidina 2.00 g': '• Chlorhexidine gluconate 2.00 g',
  '• Alcohol isopropílico 70% 62.00 g': '• Isopropyl alcohol 70% 62.00 g',
  '• Coformulante* y agua c.s.p 100.00 g': '• Co-formulant* and water to 100.00 g',
  '- Esponja: Poliuretano grado médico.': '- Sponge: medical-grade polyurethane.',
  '- Esponja: material de poliuretano de grado médico.':
    '- Sponge: medical-grade polyurethane.',
  '- Cuerpo del mango: Acrilonitrilo Butadieno Estireno (ABS) blanco.':
    '- Handle body: white acrylonitrile butadiene styrene (ABS).',
  '• Esponja: Poliuretano de grado médico': '• Sponge: medical-grade polyurethane',
  '• Cuerpo: Resina de polipropileno (HDPP)': '• Body: polypropylene resin (HDPP)',
  '• Émbolo: Resina de polipropileno (HDPP)': '• Plunger: polypropylene resin (HDPP)',
  '• Solución Antiséptica: Gluconato de clorhexidina al 2% y alcohol isopropílico al 70%':
    '• Antiseptic solution: 2% chlorhexidine gluconate and 70% isopropyl alcohol',
  '- Mango y cerdas: Polietileno de grado médico.':
    '- Handle and bristles: medical-grade polyethylene.',
  '- Limpia-uñas: material de polipropileno.': '- Nail cleaner: polypropylene.',
  '- Esponja desechable de poliuretano de dimensiones (Largo: 12.00 cm; Ancho: 8.00 cm; Alto: 2.50 cm)':
    '- Disposable polyurethane sponge (length: 12.00 cm; width: 8.00 cm; height: 2.50 cm)',
  '- Toallita: elaborada con tela no tejida en base a fibras de poliéster de color blancas.':
    '- Wipe: white non-woven fabric made from polyester fibres.',
  '- Dimensiones de la toallita:': '- Wipe dimensions:',
  '• Long. lado corto: 6.3 cm ± 0.1 cm': '• Short side: 6.3 cm ± 0.1 cm',
  '• Long. lado largo: 7.7 cm ± 0.1 cm': '• Long side: 7.7 cm ± 0.1 cm',
  '• Area: 48.51 cm2 aproximadamente.': '• Area: approximately 48.51 cm².',

  /* ── Nutrición enteral ──────────────────────────────────────────────── */
  '- Puerto (boca) y tapón protector con asa de sujeción: PVC libre de DEHP, color violeta.':
    '- Port (mouth) and protective cap with holding tab: DEHP-free PVC, violet.',
  '- Bolsa: Policloruro de Vinilo (PVC), libre de Di-etil-hexil-ftalato (DEHP); color transparente.':
    '- Bag: polyvinyl chloride (PVC), free of di(2-ethylhexyl) phthalate (DEHP); clear.',
  '- Tubo conductor: PVC libre de DEHP, transparente': '- Delivery tube: DEHP-free PVC, clear',
  '- Abrazadera de Rodillo: Acrilonitrilo Butadieno Estireno (ABS), color violeta.':
    '- Roller clamp: acrylonitrile butadiene styrene (ABS), violet.',
  '- Cámara de goteo: PVC libre de DEHP, color transparente y flexible.':
    '- Drip chamber: DEHP-free PVC, clear and flexible.',
  '- Segmento de tubo conductor flexible: Silicona, incolora.':
    '- Flexible section of the delivery tube: silicone, colourless.',
  '- Magneto: Magnetita, color negro': '- Magnet: magnetite, black',
  '- Clamp o abrazadera de seguridad: Polipropileno (PP), color violeta':
    '- Safety clamp: polypropylene (PP), violet',
  '- Llave en “Y”: PVC libre de DEHP, cuerpo transparente; con tapa de cierre Luer Lock, color violeta.':
    '- “Y” port: DEHP-free PVC, clear body, with a violet Luer Lock closing cap.',
  '- Etiqueta de precaución: papel': '- Caution label: paper',
  '- Conector ENFit: ABS, color violeta': '- ENFit connector: ABS, violet',
  '- Conector escalonado 5 en 1: PVC libre de DEHP, color violeta':
    '- 5-in-1 stepped connector: DEHP-free PVC, violet',
  '- Tapa protectora del adaptador: Polipropileno (PP), color transparente.':
    '- Adapter protective cap: polypropylene (PP), clear.',
  '1. Tapa del conector: Cloruro de Polivinilo o Policloruro de Vinilo (PVC), color transparente.':
    '1. Connector cap: polyvinyl chloride (PVC), clear.',
  '2. Conector: PVC, color violeta': '2. Connector: PVC, violet',
  '3. Señal de advertencia: Cartulina, color blanco': '3. Warning tag: white card',
  '4. Llave en “Y” para limpieza de tubería: PVC, color del cuerpo transparente y tapa violeta.':
    '4. “Y” port for flushing the line: PVC, clear body with a violet cap.',
  '5. Llave de control tipo carretilla: PVC, color violeta':
    '5. Roller-type control clamp: PVC, violet',
  '6. Imán: Sustancia ferrosa, color negro': '6. Magnet: ferrous material, black',
  '7. Porción elástica de tubo conductor: Silicona o Silicona, color transparente':
    '7. Elastic section of the delivery tube: silicone, clear',
  '8. Cámara de goteo flexible y transparente: PVC, color transparente':
    '8. Flexible clear drip chamber: PVC, clear',
  '9. Clamp de seguridad: PVC, color violeta': '9. Safety clamp: PVC, violet',
  '10. Tubo conductor transparente: PVC, color transparente.':
    '10. Clear delivery tube: PVC, clear.',
  '11. Punta de penetración tipo espiga en “X”, con rosca: PVC, color violeta':
    '11. “X” piercing spike, threaded: PVC, violet',
  '12. Tapa con rosca para frasco o contenedor de alimentación: PVC, color violeta':
    '12. Screw cap for the feeding bottle or container: PVC, violet',
  '• Bolsa de soporte: Polietileno (PE), color transparente':
    '• Support bag: polyethylene (PE), clear',
  'Fabricado con diversos plásticos de alto impacto (Polioximetileno - POM, Acrilonitrilo butadieno estireno - ABS, Nailon y fibra de vidrio, Policarbonato - PC), Silicona, Acero inoxidable SUS303 y Aleación de aluminio.':
    'Built from a range of high-impact plastics (polyoxymethylene – POM, acrylonitrile ' +
    'butadiene styrene – ABS, nylon and fibreglass, polycarbonate – PC), silicone, ' +
    'SUS303 stainless steel and aluminium alloy.',

  /* ── Higiene del paciente ───────────────────────────────────────────── */
  '- Paño: 100% Fibra de Poliéster virgen': '- Cloth: 100% virgin polyester fibre',
  '- Solución jabonosa:': '- Soap solution:',
  '• Agua: 66.6992% (Solvente)': '• Water: 66.6992% (solvent)',
  '• Agua: 66.6742% (Solvente)': '• Water: 66.6742% (solvent)',
  '• Agua: 85.723% (Solvente)': '• Water: 85.723% (solvent)',
  '• Lauril Sulfato de Sodio Etoxilado: 30.0000% (Espumante, Surfactante, Limpiador)':
    '• Sodium laureth sulfate: 30.0000% (foaming agent, surfactant, cleanser)',
  '• Extracto Glicólico de Manzanilla: 0.0250% (Acondicionante de la piel)':
    '• Chamomile glycolic extract: 0.0250% (skin conditioner)',
  '• Extracto Glicólico de Aloe vera: 0.0250% (Acondicionante de la piel)':
    '• Aloe vera glycolic extract: 0.0250% (skin conditioner)',
  '• Cocoamido Dea: 1.3000% (Emulsificante, Surfactante)':
    '• Cocamide DEA: 1.3000% (emulsifier, surfactant)',
  '• Ácido Cítrico: 0.0340% (Tamponante)': '• Citric acid: 0.0340% (buffering agent)',
  '• Ácido Cítrico: 0.025% (Tamponante)': '• Citric acid: 0.025% (buffering agent)',
  '• Benzoato de Sodio: 0.1000% (Preservante)': '• Sodium benzoate: 0.1000% (preservative)',
  '• Propilenglicol: 1.5000% (Acondicionante de la piel, humectante)':
    '• Propylene glycol: 1.5000% (skin conditioner, humectant)',
  '• Fragancia: 0.3400% (Perfumante)': '• Fragrance: 0.3400% (perfume)',
  '• Fragancia: 0.250% (Perfumante)': '• Fragrance: 0.250% (perfume)',
  '• Colorante C.I. 16255: 0.0018% (Aportante de color)':
    '• Colourant C.I. 16255: 0.0018% (colour)',
  '• Colorante C.I. 42090: 0.0018% (Aportante de color)':
    '• Colourant C.I. 42090: 0.0018% (colour)',
  '• Colorante C.I. 19140: 0.002% (Aportante de color)':
    '• Colourant C.I. 19140: 0.002% (colour)',
  '• Óxido de amina: 6.000% (Limpiador, Surfactante)':
    '• Amine oxide: 6.000% (cleanser, surfactant)',
  '• Poliglucosa: 6.000% (Surfactante)': '• Polyglucose: 6.000% (surfactant)',
  '• Clorhexidina Digluconato (Sol. Acuosa al 20%): 2.000% (Preservante, Antimicótico)':
    '• Chlorhexidine digluconate (20% aqueous solution): 2.000% (preservative, antifungal)',
  '- Viscosa (Celulosa): 80%': '- Viscose (cellulose): 80%',
  '- Poliéster: 20%': '- Polyester: 20%',
  '(*Tolerancia: ± 2%)': '(*Tolerance: ± 2%)',

  /* ── Absorbentes ────────────────────────────────────────────────────── */
  '- Celulosa 80%': '- Cellulose 80%',
  '- Polipropileno (PP) 20%': '- Polypropylene (PP) 20%',
  '- Celulosa 100% (pulpa de madera reforzada)': '- Cellulose 100% (reinforced wood pulp)',
  '- Cabeza: anillo ranurado, de Polipropileno (PP), color blanco.':
    '- Head: grooved ring in polypropylene (PP), white.',
  '- Cuerpo: Bolsa de polietileno (PE), colo azul.': '- Body: polyethylene (PE) bag, blue.',
  'Constituido por tres capas de laminación:': 'Three laminated layers:',
  'Tres placas de laminación:': 'Three laminated layers:',
  '- Superior: tela no tejida, Polipropileno (PP). Absorbente de agua. Color blanco. Peso 5 g (1%).':
    '- Top: non-woven polypropylene (PP). Water absorbent. White. Weight 5 g (1%).',
  '- Medio: Polipropileno (PP) fundido y soplado (absorbente de agua). Color Azul (Pantone 283U). Peso 400 g (88%)':
    '- Middle: melt-blown polypropylene (PP) (water absorbent). Blue (Pantone 283U). ' +
    'Weight 400 g (88%)',
  '- Inferior o Reverso: Película Transparente de Polietileno (PE). Impermeable. Peso 50 g (11%).':
    '- Bottom or backing: clear polyethylene (PE) film. Waterproof. Weight 50 g (11%).',
  '• Cara superior: Tela no tejida, Polipropileno (PP): 5 g (1%)':
    '• Top face: non-woven polypropylene (PP): 5 g (1%)',
  '• Medio: Polipropileno (PP) fundido y soplado (absorbente de agua): 400 g (98%)':
    '• Middle: melt-blown polypropylene (PP) (water absorbent): 400 g (98%)',
  '• Cara inferior: Tela no tejida, Polipropileno (PP): 5 g (1%)':
    '• Bottom face: non-woven polypropylene (PP): 5 g (1%)',
  'DIMENSIONES: 36 x 44 pulgadas (91.4 cm x 111.8 cm)':
    'DIMENSIONS: 36 x 44 inches (91.4 cm x 111.8 cm)',
  'DIMENSIONES: 36 x 44 pulgadas (91.4 cm x 111.8 cm).':
    'DIMENSIONS: 36 x 44 inches (91.4 cm x 111.8 cm).',
  'DIMENSIONES: 32” x 40” pulgadas (81.28 cm x 101.6 cm)':
    'DIMENSIONS: 32” x 40” inches (81.28 cm x 101.6 cm)',
  '- Capa superior: Polipropileno (PP) fundido y': '- Top layer: melt-blown polypropylene (PP),',
  'soplado, color amarillo: 319.00 g/m2': 'yellow: 319.00 g/m²',
  '- Capa central: Película transparente de Polietileno (PE): 49.00 g/m2 (8.30%),':
    '- Middle layer: clear polyethylene (PE) film: 49.00 g/m² (8.30%),',
  '- Capa inferior: Lámina de Policloruro de Vinilo (PVC), color rosado a melón: 220.00 g/m2 (37.29%),':
    '- Bottom layer: polyvinyl chloride (PVC) sheet, pink to melon: 220.00 g/m² (37.29%),',
  '- Adhesivo sintético: 2.00 g/m2 (0.34%),': '- Synthetic adhesive: 2.00 g/m² (0.34%),',
  '▪ Capa superior (color blanco)': '▪ Top layer (white)',
  '- Polipropileno (PP) 14%': '- Polypropylene (PP) 14%',
  '- Tejido de Papel Tisú: 6%': '- Tissue paper web: 6%',
  '▪ Capa central': '▪ Middle layer',
  '- Fibras de celulosa: 53%': '- Cellulose fibres: 53%',
  '- Polímero Súper Absorbente (SAP): 6%': '- Super absorbent polymer (SAP): 6%',
  '▪ Capa inferior (celeste)': '▪ Bottom layer (light blue)',
  '- Polietileno (PE), 19%': '- Polyethylene (PE), 19%',
  '▪ Adhesivo de fusión en caliente: 2%': '▪ Hot-melt adhesive: 2%',

  /* ── Guantes ────────────────────────────────────────────────────────── */
  '• Largo (mm): 300': '• Length (mm): 300',
  '• Ancho (mm): 85 ± 5': '• Width (mm): 85 ± 5',
  '• Ancho (mm): 95 ± 5': '• Width (mm): 95 ± 5',
  '• Ancho (mm): 105 ± 5': '• Width (mm): 105 ± 5',
  '• Ancho (mm): 115 ± 5': '• Width (mm): 115 ± 5',
  '• Espesor (mm) – Palma: 0.10 ± 0.02': '• Thickness (mm) – palm: 0.10 ± 0.02',
  '• Espesor (mm) – Puño: 0.07 ± 0.02': '• Thickness (mm) – cuff: 0.07 ± 0.02',
  '• Espesor (mm) – Dedos: 0.15 ± 0.02': '• Thickness (mm) – fingers: 0.15 ± 0.02',
  '• Peso (g): 6.0 ± 0.2': '• Weight (g): 6.0 ± 0.2',
  '• Peso (g): 6.5 ± 0.2': '• Weight (g): 6.5 ± 0.2',
  '• Peso (g): 7.0 ± 0.2': '• Weight (g): 7.0 ± 0.2',
  '• Peso (g): 7.5 ± 0.2': '• Weight (g): 7.5 ± 0.2',

  /* ── Material médico no instrumental ────────────────────────────────── */
  '- Tinta: Violeta de genciana (Cloruro de Metilrosanilina o Cristal violeta)':
    '- Ink: gentian violet (methylrosanilinium chloride or crystal violet)',
  '- Tapa: Polipropileno, color transparente.': '- Cap: polypropylene, clear.',
  '- Cuerpo: Polipropileno, color blanco': '- Body: polypropylene, white',
  '- Cuerpo y tapa: polietileno de alta densidad': '- Body and cap: high-density polyethylene',
  '• Estuche de poliestireno de alto impacto (HIPS) y doble lámina imantada.':
    '• High-impact polystyrene (HIPS) case with a double magnetic strip.',
  '• Dimensiones: 11.3 cm × 5.4 cm × 1.5 cm': '• Dimensions: 11.3 cm × 5.4 cm × 1.5 cm',
  '• Polietileno (PE)': '• Polyethylene (PE)',
  '• Producto no estéril.': '• Non-sterile product.',
  '• Dimensión: 50*50 mm': '• Size: 50*50 mm',
  '• Tolerancia / Longitud: ± 5 mm': '• Tolerance / length: ± 5 mm',
  '• Tolerancia / ancho: ± 5 mm': '• Tolerance / width: ± 5 mm',
  '• Lámina abrasiva o pulidora: Material fino de Monóxido de Silicio (SiO) de grado médico. Color grafito.':
    '• Abrasive pad: fine medical-grade silicon monoxide (SiO). Graphite.',
  '• Capa base: Esponja de Poliuretano. Color celeste oscuro.':
    '• Base layer: polyurethane foam. Dark light-blue.',
  '• Adhesivo: Sensible a la presión. Transparente': '• Adhesive: pressure sensitive. Clear',
  '• Papel desprendible: Papel recubierto de silicona. Color blanco':
    '• Release liner: silicone-coated paper. White',

  /* ── Cepillos ───────────────────────────────────────────────────────── */
  '- Mango anatómico de plástico resistente, color celeste.':
    '- Anatomical handle in tough plastic, light blue.',
  '- Mango anatómico de plástico resistente, color azul.':
    '- Anatomical handle in tough plastic, blue.',
  '- Mango anatómico de plástico resistente, drapeado en la parte central, color dorado oscuro.':
    '- Anatomical handle in tough plastic, contoured at the centre, dark gold.',
  '- Mango anatómico y plano de plástico resistente, color blanco.':
    '- Flat anatomical handle in tough plastic, white.',
  '- Longitud total: 17.5 cm': '- Overall length: 17.5 cm',
  '- Longitud total: 18 cm.': '- Overall length: 18 cm.',
  '- Longitud total: 18.5 cm': '- Overall length: 18.5 cm',
  '- Longitud total de 18.5 cm': '- Overall length 18.5 cm',
  '- Longitud total: 22.2 cm': '- Overall length: 22.2 cm',
  '- Cerdas semirrígidas de 12 mm de longitud, transparentes, dispuestas un área de 32 mm x 7 mm (13 columnas x 3 filas).':
    '- Semi-rigid clear bristles 12 mm long, set over an area of 32 mm x 7 mm ' +
    '(13 columns x 3 rows).',
  '- Cerdas semirrígidas de 12 mm de longitud, transparentes, dispuestas un área de 38 mm x 7 mm (13 columnas x 3 filas).':
    '- Semi-rigid clear bristles 12 mm long, set over an area of 38 mm x 7 mm ' +
    '(13 columns x 3 rows).',
  '- Cerdas semirrígidas de 15 mm de longitud, transparentes, dispuestas un área de 7.5 cm x 3 cm (19 columnas x 8 filas).':
    '- Semi-rigid clear bristles 15 mm long, set over an area of 7.5 cm x 3 cm ' +
    '(19 columns x 8 rows).',
  'Diseñado con dos cabezas de tres (03 filas y 13 columnas) cada una. Una cabeza con cerdas de nailon de color blanco y la otra, con cerdas de acero inoxidable. Ambos tipos de cerdas son rectas, espesor uniforme, distribución simétrica y de fijación firme.':
    'Two heads, each with three rows and 13 columns. One head carries white nylon ' +
    'bristles and the other stainless steel bristles. Both are straight, of uniform ' +
    'thickness, symmetrically arranged and firmly anchored.',
  '- Las cerdas de nailon son semirrígidas y 12 mm de longitud; mientras que las de acero inoxidable, son rígidas y 14 mm de longitud.':
    '- The nylon bristles are semi-rigid and 12 mm long; the stainless steel ones are ' +
    'rigid and 14 mm long.',
  '- Doble cabeza con cerdas semirrígidas de distinta longitud.':
    '- Double head with semi-rigid bristles of different lengths.',
  'La cabeza con el área más grande, está conformado por cerdas de 12 mm de longitud, transparentes, dispuestas en un área de 38 mm x':
    'The larger head carries clear bristles 12 mm long, set over an area of 38 mm x',
  '8 mm (12 columnas x 3 filas).': '8 mm (12 columns x 3 rows).',
  'La cabeza con el área más pequeña, está constituido por cerdas de 6 mm de longitud, transparentes, dispuestas en un área de 23 mm x':
    'The smaller head carries clear bristles 6 mm long, set over an area of 23 mm x',
  '2 mm (7 columnas x 1 fila).': '2 mm (7 columns x 1 row).',

  /* ── Vía aérea ──────────────────────────────────────────────────────── */
  '- Ángulo de rotación de la pantalla de visualización:': '- Display rotation:',
  '- Ángulo de rotación vertical máximo: 140° ± 10°':
    '- Maximum vertical rotation: 140° ± 10°',
  '-Ángulo de rotación horizontal máximo: 270 ° ± 10 °':
    '- Maximum horizontal rotation: 270° ± 10°',
  '- Profundidad de campo: 10-80mm': '- Depth of field: 10–80 mm',
  '- Pantalla: Táctil LCD, color, 3.5”': '- Screen: 3.5” colour LCD touchscreen',
  '- Resolución: 640 x 960 pixeles': '- Resolution: 640 x 960 pixels',
  '- Peso: 0.25 kg (incluida la batería)': '- Weight: 0.25 kg (battery included)',
  '- Potencia de entrada: 25VA.': '- Input power: 25 VA.',
  '- Voltaje de salida DC: 5V 2A.': '- DC output: 5 V 2 A.',
  '- Batería incorporada: 3.6V 3400mAh.': '- Built-in battery: 3.6 V 3400 mAh.',
  '- Tiempo de carga: no más de 4 horas (el dispositivo se apaga durante la carga)':
    '- Charging time: no more than 4 hours (the device is switched off while charging)',
  '- Dimensiones: 191 (H) x 92 (W) x 112 (D) mm':
    '- Dimensions: 191 (H) x 92 (W) x 112 (D) mm',
  '- M1: 106±5mm (largo); 18±3mm (ancho); 30±3mm (alto); 3.5–10 kg (peso).':
    '- M1: 106±5 mm (length); 18±3 mm (width); 30±3 mm (height); 3.5–10 kg (patient weight).',
  '- M2: 115±5mm (largo) ; 22±3mm (ancho); 33±3mm (alto); >10–40 kg (peso).':
    '- M2: 115±5 mm (length); 22±3 mm (width); 33±3 mm (height); >10–40 kg (patient weight).',
  '- M3: 126±5mm (largo); 27±3mm (ancho); 38±3mm (alto); >40–70 kg (peso).':
    '- M3: 126±5 mm (length); 27±3 mm (width); 38±3 mm (height); >40–70 kg (patient weight).',
  '-M4: 140±5mm (largo); 29±3mm (ancho); 41±3mm (alto); >70 kg (peso).':
    '- M4: 140±5 mm (length); 29±3 mm (width); 41±3 mm (height); >70 kg (patient weight).',
  'M3D: 126±5mm (largo); 24±3mm (ancho); 42±3mm (alto); >40–70 kg (peso).':
    'M3D: 126±5 mm (length); 24±3 mm (width); 42±3 mm (height); >40–70 kg (patient weight).',

  /* ── Bombas ─────────────────────────────────────────────────────────── */
  'Pantalla:': 'Display:',
  '- Pantalla táctil resistiva de 3 pulgadas': '- 3-inch resistive touchscreen',
  'Resolución: 480×320': 'Resolution: 480×320',
  '- Resolución: 480×320': '- Resolution: 480×320',
  'Ángulo de visión: 80°': 'Viewing angle: 80°',
  '- Ángulo de visión: 80°': '- Viewing angle: 80°',
  'Dimensiones: 214(A)×75(H)×142(P) mm': 'Dimensions: 214 (W) × 75 (H) × 142 (D) mm',
  'Dimensiones: 258(A)×75(H)×152(P)mm': 'Dimensions: 258 (W) × 75 (H) × 152 (D) mm',
  'Peso: Sobre 1,4kg (incluyendo la batería)': 'Weight: about 1.4 kg (battery included)',
  'Peso: Sobre 1,7 kg (incluyendo la batería)': 'Weight: about 1.7 kg (battery included)',
  'Suministro eléctrico:': 'Power supply:',
  'Suministro eléctrico': 'Power supply',
  '- Suministro eléctrico de CA: 100-240V, 50/60Hz': '- AC supply: 100–240 V, 50/60 Hz',
  '- Potencia consumida: 45 VA': '- Power consumption: 45 VA',
  '- Suministro eléctrico CC externo: 12 V': '- External DC supply: 12 V',
  '- Corriente de entrada (CC):2,5 A': '- Input current (DC): 2.5 A',
  '- Corriente de entrada (CC):2,5': '- Input current (DC): 2.5 A',
  '- Batería de litio incorporada: 11,34 V, 2900 mAh':
    '- Built-in lithium battery: 11.34 V, 2900 mAh',
  '- A Batería de litio incorporada: 11,34 V, 2900 mAh':
    '- Built-in lithium battery: 11.34 V, 2900 mAh',
  '- Tiempo de funcionamiento de la batería: ≥10 h Condiciones: Utilice un set IV a una velocidad de 25 ml/h.':
    '- Battery run time: ≥10 h. Conditions: IV set running at 25 mL/h.',
  '- Tiempo de funcionamiento de la batería: ≥10 h Condiciones: Utilice una jeringa de 50 ml a una velocidad de 5 ml/h.':
    '- Battery run time: ≥10 h. Conditions: 50 mL syringe running at 5 mL/h.',
  '- Tiempo de carga de batería: ≤ 6 h en estado apagado':
    '- Battery charging time: ≤ 6 h with the unit switched off',
  '- Dimensiones: 258 (Ancho) x 75 (alto) x 152 (profundidad); unidades en milímetros (mm)':
    '- Dimensions: 258 (width) x 75 (height) x 152 (depth), in millimetres (mm)',
  '- Peso: Aproximadamente 1.7 kg (incluida la batería)':
    '- Weight: approximately 1.7 kg (battery included)',
  '- Adaptador de corriente:': '- Power adapter:',
  '• Fuente de alimentación CA: 100-240 V CA, 50/60 Hz, 60 VA de potencia de entrada':
    '• AC supply: 100–240 V AC, 50/60 Hz, 60 VA input power',
  '• Potencia consumida :45 VA': '• Power consumption: 45 VA',
  '• Fuente de alimentación de CC externa:': '• External DC supply:',
  '• Corriente de entrada (CC):2.5 A.': '• Input current (DC): 2.5 A.',
  '• Tiempo de carga de la batería: No más de 4 horas (la bomba está apagada para la carga)':
    '• Battery charging time: no more than 4 hours (the pump is switched off while charging)',
  '• La bomba de jeringa se alimentará automáticamente con la batería incorporada una vez que la entrada CA/CC se corte.':
    '• The syringe pump switches to its built-in battery automatically if the AC/DC ' +
    'input is lost.',
  '• Modo de carga de la batería: Entrada de CA o carga de batería de entrada de CC':
    '• Battery charging: from the AC input or from the external DC input',
};

/** Productos. */
export const productosEn: Record<string, ProductoEn> = {
  /* ═══════════════════════════════════════════════════════ bioseguridad */
  'contenedores-punzocortantes': {
    nombre: 'Sharps containers',
    descripcion:
      'Designed to prevent accidents with sharps waste and to streamline the ' +
      'handling and disposal of hazardous waste in healthcare facilities.',
    descripciones: {
      2:
        'Sharps waste container designed for one-handed use, streamlining the ' +
        'handling and disposal of hazardous waste in healthcare facilities. Supplied ' +
        'in two parts (body and lid).',
    },
  },
  'contenedores-residuos-citotoxicos': {
    nombre: 'Cytotoxic waste containers',
    descripcion:
      'Designed to prevent accidents with sharp items and to make the handling ' +
      'and disposal of cytostatic waste easier in specialist hospital units.',
  },
  'contenedores-residuos-vidrio': {
    nombre: 'Glass and special waste containers',
    descripcion:
      'Designed to prevent accidents with sharp items and to make the handling ' +
      'and disposal of special glass waste easier in specialist hospital units.',
    descripciones: {
      0:
        'Designed to prevent accidents with sharp items and to make the handling and ' +
        'disposal of glass waste easier in specialist hospital units.',
    },
  },
  'tapete-adhesivo-descontaminante': {
    nombre: 'Decontamination adhesive mat 36" x 45"',
    descripcion:
      'A multilayer adhesive mat for cleanrooms, made up of 30 polyethylene sheets. ' +
      'Each sheet is coated with a high-performance adhesive containing antibacterial ' +
      'agents. Thanks to those agents, the mat traps dirt, germs and dust from foot ' +
      'traffic and equipment wheels before they reach the controlled environment.',
  },

  /* ══════════════════════════ instrumental para cirugía laparoscópica */
  'trocar-para-cirugia-laparoscopica': {
    nombre: 'Trocar for laparoscopic surgery',
    descripcion:
      'Medical device designed to create a working channel into the body cavity for ' +
      'the introduction of surgical instruments.',
  },
  'disector-monopolar-maryland': {
    nombre: 'Disposable monopolar dissector – Maryland',
    descripcion:
      'The Maryland monopolar dissector is a surgical instrument designed to dissect ' +
      'tissue during laparoscopic procedures.',
  },
  'pinza-agarre-clinch': {
    nombre: 'Disposable monopolar grasping forceps – clinch',
    descripcion:
      'The disposable monopolar grasper is a surgical instrument fitted with a ' +
      'grasper-type electrode, for holding tissue during laparoscopic procedures.',
  },
  'pinza-agarre-fenestrated-grasper': {
    nombre: 'Disposable monopolar grasping forceps – fenestrated grasper',
    descripcion:
      'The disposable monopolar grasper is a surgical instrument fitted with a ' +
      'grasper-type electrode, for holding tissue during laparoscopic procedures.',
  },
  'tijeras-monopolares-curved-scissor': {
    nombre: 'Disposable monopolar scissors – curved scissor',
    descripcion:
      'Disposable monopolar scissors are laparoscopic surgical instruments built with ' +
      'a geared slot mechanism and additional insulation, which reduces the risk of ' +
      'burns at the point of action during diathermy.',
  },

  /* ═════════════════════════════════════════════════════════ aspiración */
  'bolsa-aspiracion-secreciones': {
    nombre: 'Suction bag with valve and antibacterial filter',
    descripcion:
      'The suction bags are single-use and work with a reusable canister, which is ' +
      'installed wherever the hospital needs it. Every suction bag is intended for ' +
      'use on a single patient.',
    descripciones: {
      3:
        'Medical device designed to suction, carry and dispose of contaminated fluids ' +
        'aspirated from body cavities, efficiently and safely for healthcare staff.',
      4:
        'Medical device designed to suction, carry and dispose of contaminated fluids ' +
        'aspirated from body cavities, efficiently and safely for healthcare staff.',
    },
  },
  'canister-rigido-reusable': {
    nombre: 'Reusable rigid canister',
    descripcion:
      'VIDE® canisters are intended to hold and support suction bags of the same ' +
      'brand. They come with a stopcock and a connecting hose that fits the suction ' +
      'bag. Fully transparent and cylindrical, graduated in mL and cc.',
    descripciones: {
      3:
        'Canister with stopcock for use with the 1.5 L QuickFit® secretion and fluid ' +
        'collection bag.',
      4:
        'Canister with stopcock for use with the 3 L QuickFit® secretion and fluid ' +
        'collection bag.',
    },
  },
  'coches-rodables': { nombre: 'Rolling stands' },
  'placas-de-anclaje-para-pared': { nombre: 'Wall mounting plates' },
  manifold: { nombre: 'Manifold' },
  'tubo-succion-sin-yankauer': {
    nombre: 'Suction tubing without Yankauer, with connectors and a 9/32” (7 mm) adapter',
    descripcion:
      'Disposable medical device made up of one connecting tube, two connectors and ' +
      'one adapter. Intended for carrying aspirated body fluids such as blood and ' +
      'secretions during surgery. It can also be used to carry other medical liquids ' +
      'and gases.',
  },
  'manguera-o-tubuladura-de-silicona': {
    nombre: 'Silicone hose and tubing',
    descripcion:
      '100% silicone hose supplied in rolls, a supply item that can be prepared for a ' +
      'wide range of uses. Each roll is 25 m long and is available in several diameters.',
  },

  /* ══════════════════════════════════════════════════════════ antisepsia */
  'aplicadores-clorhexidina-2': {
    nombre: 'Applicators with 2% chlorhexidine gluconate + 70% isopropyl alcohol',
    descripcion:
      'A single-use applicator holding an advanced antiseptic solution of 2% ' +
      'chlorhexidine gluconate in 70% isopropyl alcohol (IPA), with broad-spectrum ' +
      'biocidal action against bacteria, mycobacteria, fungi and viruses. Its design ' +
      'makes it possible to disinfect different areas of the patient without touching ' +
      'them directly.',
  },
  'cepillo-esponja-clorhexidina-4': {
    nombre: 'Brush-sponge with 20 mL of 4% chlorhexidine gluconate',
    descripcion:
      'NEX CLOREX C2 CHG 4% brush-sponge is a single-use surgical scrub brush-sponge ' +
      'with a nail cleaner, impregnated with approximately 20 mL of antiseptic ' +
      'cleansing solution (chlorhexidine digluconate).',
  },
  'esponja-clorhexidina-2': {
    nombre: 'Sponge with 2% chlorhexidine gluconate (20 mL)',
    descripcion:
      'Disposable polyurethane sponge for the antiseptic washing of the skin, ' +
      'impregnated with approximately 20 mL of broad-spectrum antiseptic solution. An ' +
      'antiseptic for intact skin and a biocide for human hygiene.',
  },
  'toallita-limpieza-piel-clorhexidina': {
    nombre: 'Skin cleansing wipe with 2% chlorhexidine + 70% isopropyl alcohol',
    descripcion:
      'Disposable wipe impregnated with antiseptic solution (2% chlorhexidine ' +
      'gluconate in 70% isopropyl alcohol) for cleansing intact skin.',
  },

  /* ═══════════════════════════════════════════════════ nutrición enteral */
  'bolsas-de-nutricion-enteral': {
    nombre: 'Enteral nutrition bags',
    descripcion:
      'Medical device intended for use with enteral formulas and enteral access ' +
      'devices. Not for intravenous use.',
  },
  'set-de-nutricion-enteral': {
    nombre: 'Enteral nutrition set',
    descripcion:
      'The enteral feeding bottle set is used together with an enteral feeding bag ' +
      'and a gastric tube. In use it connects to the gastric tube placed in the ' +
      "patient's stomach through the tube connector, delivering the nutritional " +
      'solution directly to the patient.',
  },
  'bomba-de-nutricion-enteral': {
    nombre: 'Enteral feeding pump',
    descripcion:
      'The enteral feeding pump is straightforward to operate and built around ' +
      'several safety programmes. It includes automatic anti-occlusion, a four-inch ' +
      'touchscreen, a robust housing and an optional warmer.',
  },

  /* ════════════════════════════════════════════════ higiene del paciente */
  'pano-bano-facil': {
    nombre: 'Easy-bath cloth',
    descripcion:
      'Non-woven cloth soaked in a soap solution for personal hygiene at the bedside.',
  },
  'toalla-para-secado-corporal': {
    nombre: 'Body drying towel',
    descripcion:
      'White body drying towel, individually wrapped in a plastic bag with a handle ' +
      'at the top and a perforated line for easy opening. Soft to the touch, highly ' +
      'absorbent and strong. Free from loose particles, burrs and sharp edges.',
  },
  'pano-clinico-absorbente': {
    nombre: 'Absorbent clinical cloth',
    descripcion:
      'Clinical cloth ideal for reducing the risk of cross-contamination in ' +
      'healthcare institutions and laboratories.',
    descripciones: {
      1:
        'Clinical cloths ideal for reducing the risk of cross-contamination in ' +
        'healthcare institutions and laboratories. The practical pack lets staff pull ' +
        'each cloth out by its end and close it again, keeping the rest clean.',
    },
  },
  'bolsa-emesis': {
    nombre: 'Emesis bag (vomit bag)',
    descripcion:
      'Also known as a sickness bag. A small device usually given to patients in ' +
      'hospital, or to passengers on aircraft and ships, to collect and contain vomit ' +
      'in cases of nausea or motion sickness.',
  },

  /* ══════════════════════════════════════════════════════════ absorbente */
  'manta-absorbente-de-fluidos-antideslizante': {
    nombre: 'Fluid absorbent mat – non-slip',
    descripcion:
      'Medical device designed to keep the operating theatre floor clean and dry, ' +
      'preventing slips during procedures that generate heavy fluid loss.',
  },
  'manta-absorbente-de-fluidos-precortada': {
    nombre: 'Fluid absorbent mat – pre-cut',
    descripcion:
      'Medical device designed to keep instrument trays and work surfaces dry, while ' +
      'cushioning the impact and sliding of instruments as they are dried.',
  },
  'mantas-super-absorbentes': {
    nombre: 'Super absorbent waterproof non-slip mats',
    descripcion:
      'Medical device designed to help keep the operating theatre clean, dry and free ' +
      'from slips, falls and contaminants.',
  },
  'protector-tela-impermeable': {
    nombre: 'Waterproof plastic sheet protector',
    descripcion:
      'Waterproof protective sheet, ideal for covering and protecting surfaces that ' +
      'are hard to clean and dry after spills of water, urine and other fluids.',
  },

  /* ═══════════════════════════════════════════════════ protección personal */
  'guantes-nitrilo-sin-polvo': {
    nombre: 'Disposable powder-free nitrile examination gloves – 6.5 g',
    descripcion:
      'Medical examination gloves, made to protect against chemical, microbiological ' +
      'and cytostatic risks. They protect against contamination when working with ' +
      'high-risk patients, handling oncology drugs, chemical treatments and the ' +
      'treatment of metals with solvents.',
  },

  /* ═══════════════════════════════ material médico no instrumental */
  'marcador-piel-esteril': {
    nombre: 'Sterile disposable skin marker',
    descripcion:
      'Sterile markers designed to identify and outline the surgical field on the ' +
      'skin where the procedure will take place, making it safe and reliable to ' +
      'locate the exact site of the incision. A ruler is included.',
  },
  'marcador-piel-no-esteril': {
    nombre: 'Non-sterile surgical skin marker',
    descripcion:
      'Small non-sterile marker designed to provide a safe and effective way of ' +
      'marking the skin before surgery, at the operating site itself.',
  },
  'contador-de-aguja-doble-iman': {
    nombre: 'Double-magnet needle counter',
    descripcion:
      'Medical device designed for counting needles, with two magnetic strips. The ' +
      'red case holds the magnetised strips inside.',
  },
  'bolsas-para-contar-gasas': {
    nombre: 'Gauze counting bags',
    descripcion:
      'Medical device used mainly in operating theatres and clinical settings to ' +
      'organise and verify the count of gauzes, cotton swabs and surgical sponges ' +
      'used during an operation. It is designed to safeguard the patient and prevent ' +
      'gauze from being left inside the body after surgery, a complication known as ' +
      'textiloma or gossypiboma. The device is a plastic panel with five pockets, ' +
      'where the used gauzes or swabs are placed.',
  },
  'limpiador-puntas-electrocauterio': {
    nombre: 'Electrocautery tip cleaner',
    descripcion:
      'Medical device designed to clean the tips of electrosurgical pencils safely ' +
      'and effectively.',
  },
  'cepillo-limpieza-instrumental-dental': {
    nombre: 'Instrument cleaning brush, toothbrush style',
    descripcion:
      'Plastic toothbrush-style brush for cleaning surgical instruments. Anatomical ' +
      'polypropylene handle and polyamide (nylon) bristles.',
    descripciones: {
      1:
        'Plastic double-headed toothbrush-style brush for cleaning surgical ' +
        'instruments. Anatomical polypropylene handle with polyamide (nylon) and ' +
        'stainless steel bristles.',
    },
  },
  'escobilla-nailon-doble-cabeza': {
    nombre: 'Double-ended nylon brush',
    descripcion:
      'Straight double-headed toothbrush-style brush for cleaning surgical ' +
      'instruments. Anatomical polypropylene handle and polyamide (nylon) bristles.',
  },
  'cepillo-nailon-mango-ancho': {
    nombre: 'White nylon brush with wide white handle',
    descripcion:
      'Brush for cleaning instruments in general. Designed with a straight, ' +
      'easy-to-grip handle and polyamide (nylon) bristles.',
  },

  /* ═══════════════════════════════════════════════════════════ vía aérea */
  'videolaringoscopio-vs-10h': {
    nombre: 'VS-10H video laryngoscope',
    descripcion:
      "Medcaptain's video laryngoscope uses camera technology to visualise the larynx " +
      'and help clinicians perform endotracheal intubation smoothly.',
  },
  'hojas-videolaringoscopio': {
    nombre: 'Disposable video laryngoscope blade',
    descripcion:
      'The disposable laryngoscope blade is designed for use with the video ' +
      'laryngoscope. Available in several sizes to suit the patient (infant, child, ' +
      'adult, patients with a difficult airway and obese patients). Made from ' +
      'polycarbonate.',
  },

  /* ═════════════════════════════════════════════════ nutrición parenteral */
  'bomba-de-infusion-hp-60': {
    nombre: 'HP-60 infusion pump',
    descripcion:
      'Based on clinical studies in a range of settings, it is designed to meet the ' +
      'needs of different departments with a single device. One device for every ' +
      'therapy, with a wide range of configuration options to suit each area.',
  },
  'bomba-de-jeringa-hp-30': {
    nombre: 'HP-30 syringe pump',
    descripcion:
      "MEDCAPTAIN's HP-30 syringe pump is a continuous micro-infusion pump. It holds a " +
      'constant infusion rate and an accurate dose over long infusions. It is designed ' +
      'for the continuous clinical micro-infusion of small-volume, high-concentration ' +
      'fluids or medication (such as chemotherapy agents, cardiovascular agents, ' +
      'anticancer agents, oxytocics, anticoagulants and anaesthetics) into the patient ' +
      'under precise control.',
  },
  'bomba-de-jeringa-hp-tci': {
    nombre: 'HP TCI syringe pump',
    descripcion:
      'The HP TCI syringe pump is a continuous micro-infusion pump. It holds a ' +
      'constant infusion rate and an accurate dose over long infusions.',
  },
};
