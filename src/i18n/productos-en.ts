/**
 * Catálogo en inglés.
 *
 * Es un solapamiento sobre el dato en castellano: lo que no esté aquí se
 * muestra en castellano, de modo que una traducción a medias nunca deja la
 * página vacía. Se indexa por el slug del producto, que es común a los dos
 * idiomas.
 *
 * Las medidas no se traducen —«0.95 L» se lee igual en los dos idiomas—, pero
 * las características sí: van alineadas por posición con las presentaciones
 * del producto.
 */

export interface ProductoEn {
  nombre?: string;
  descripcion?: string;
  /** Una lista por presentación, en el mismo orden que en castellano. */
  caracteristicas?: string[][];
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
  'bolsa-para-emesis-o-bolsa-para-vomito': 'Emesis bags',
  'manta-absorbente-de-fluidos': 'Fluid absorbent mats',
  'protector-de-tela-plastica-impermeable': 'Waterproof plastic sheet protectors',
  'guantes-de-nitrilo-sin-polvo-6-5-gr': 'Powder-free nitrile gloves 6.5 g',
  'marcador-de-piel': 'Skin markers',
  'contador-de-aguja': 'Needle counters',
  'bolsas-para-contar-gasas': 'Gauze counting bags',
  'limpiador-de-puntas-de-electrocauterio': 'Electrocautery tip cleaners',
  'cepillos-para-limpieza-de-instrumental-medico': 'Instrument cleaning brushes',
  videolaringoscopio: 'Video laryngoscopes',
  'hojas-de-videolaringoscopio': 'Video laryngoscope blades',
  'bomba-de-infusion': 'Infusion pumps',
  'bomba-de-jeringa': 'Syringe pumps',
};

/**
 * Productos. Pendiente de traducir el grueso del catálogo 2026: lo que falta
 * se muestra en castellano, que es preferible a un inglés inventado en un
 * catálogo de dispositivos médicos.
 */
export const productosEn: Record<string, ProductoEn> = {
  'contenedores-punzocortantes': {
    nombre: 'Sharps containers',
    descripcion:
      'Designed to prevent accidents with sharps waste and to streamline the ' +
      'handling and disposal of hazardous waste in healthcare facilities.',
  },
  'contenedores-residuos-citotoxicos': {
    nombre: 'Cytotoxic waste containers',
    descripcion:
      'Designed to prevent accidents with sharp items and to make the handling ' +
      'and disposal of cytotoxic waste easier in specialist hospital units.',
  },
  'contenedores-residuos-vidrio': {
    nombre: 'Glass and special waste containers',
    descripcion:
      'Designed to prevent accidents with sharp items and to make the handling ' +
      'and disposal of glass waste easier in specialist hospital units.',
  },
};
