/**
 * Versión en inglés del contenido institucional y del catálogo, y los
 * accesores que devuelven una entidad ya en el idioma que toca.
 *
 * El castellano de src/data/ no se toca: es el original y el que rige. Este
 * archivo es una capa que se superpone por slug. Si mañana falta una
 * traducción, el accesor devuelve el castellano en lugar de dejar un hueco,
 * de modo que la página nunca se rompe por una omisión.
 */
import type { Idioma } from './rutas';
import { productosEn } from './productos-en';
import type { Categoria, Producto, Variante } from '../data/catalogo';
import type { Marca } from '../data/marcas';
import type { Especialidad } from '../data/especialidades';

/* ═══════════════════════════════════════════════════ Líneas de producto */

interface CategoriaEn {
  nombre: string;
  corto: string;
  descripcion: string;
}

const categoriasEn: Record<string, CategoriaEn> = {
  bioseguridad: {
    nombre: 'Biosafety and waste management',
    corto: 'Biosafety',
    descripcion:
      'The set of principles, standards and technologies for avoiding the risk ' +
      'that comes from exposure to biological agents. Puncture-resistant rigid ' +
      'containers for every type of waste and every volume of service.',
  },
  antisepsia: {
    nombre: 'Antisepsis and skin preparation',
    corto: 'Antisepsis',
    descripcion:
      'The use of chemical substances to inhibit the growth of, or reduce the ' +
      'number of, micro-organisms on the skin and mucous membranes. ' +
      'Chlorhexidine formulations as applicator, sponge, brush and wipe.',
  },
  laparoscopia: {
    nombre: 'Laparoscopic surgery',
    corto: 'Laparoscopy',
    descripcion:
      'A surgical technique that allows the pelvic and abdominal cavity to be ' +
      'seen with the help of an optical lens. Trocars with a safety tip and a ' +
      'shielded blade, sold as units and as kits.',
  },
  aspiracion: {
    nombre: 'Suction and aspiration',
    corto: 'Suction',
    descripcion:
      'Closed systems for the temporary storage of secretions and fluids ' +
      'removed from the body: disposable bags, reusable canisters, tubing and ' +
      'the full range of stands.',
  },
  'nutricion-enteral': {
    nombre: 'Enteral feeding',
    corto: 'Enteral feeding',
    descripcion:
      'A technique of artificial feeding that delivers the nutritional solution ' +
      'directly into the stomach or the intestine. Pumps, bags and sets ' +
      'compatible with hospital enteral access devices.',
  },
  'via-aerea': {
    nombre: 'Airway and anaesthesia',
    corto: 'Airway',
    descripcion:
      'Video laryngoscopy for precise endotracheal intubation, with disposable ' +
      'blades in every size, from the neonate to the difficult adult airway.',
  },
  'higiene-paciente': {
    nombre: 'Patient hygiene and comfort',
    corto: 'Patient hygiene',
    descripcion:
      'Rinse-free bed bathing, body drying and single-use clinical wipes, to ' +
      'reduce cross-contamination and the time nursing care takes.',
  },
  absorbentes: {
    nombre: 'Absorbents and surface protection',
    corto: 'Absorbents',
    descripcion:
      'Non-slip absorbent mats and waterproof protectors that keep the ' +
      'operating theatre clean, dry and free of slip hazards.',
  },
  instrumental: {
    nombre: 'Surgical instruments and accessories',
    corto: 'Instruments',
    descripcion:
      'Supplies for the operating theatre and the sterile processing ' +
      'department: skin markers, gauze counting, electrosurgical tip cleaning ' +
      'and instrument brushes.',
  },
  'proteccion-personal': {
    nombre: 'Personal protection',
    corto: 'Personal protection',
    descripcion:
      'A barrier for the healthcare team against chemical, microbiological and ' +
      'cytostatic hazards.',
  },
};

/* ═══════════════════════════════════════════════════════════════ Marcas */

interface MarcaEn {
  resumen: string;
  linea: string;
}

const marcasEn: Record<string, MarcaEn> = {
  'q-medical': {
    resumen:
      'Our own brand. It brings together the devices we develop and prepare ' +
      'with selected manufacturers to our own technical specifications.',
    linea: 'Own brand · general line',
  },
  medcaptain: {
    resumen:
      'Electronic medical equipment for infusion, enteral feeding and airway ' +
      'management, on platforms that connect to central monitoring.',
    linea: 'Equipment · airway and nutrition',
  },
  maxcon: {
    resumen:
      'Rigid biosafety containers for sharps, cytotoxic waste, special waste ' +
      'and glass, across the full range of capacities.',
    linea: 'Biosafety · waste management',
  },
  'nex-medical': {
    resumen:
      'Chlorhexidine gluconate antiseptics for pre-surgical skin preparation, ' +
      'in applicator, sponge and brush formats.',
    linea: 'Antisepsis · skin preparation',
  },
  'alleva-medical': {
    resumen:
      'VIDE® suction systems: disposable bags, reusable rigid canisters and ' +
      'their full range of stands and accessories.',
    linea: 'Suction and aspiration',
  },
  geyi: {
    resumen:
      'Disposable trocars with a safety tip and shielded blade for ' +
      'laparoscopic surgery, available in preconfigured kits.',
    linea: 'Laparoscopic surgery',
  },
  'bano-facil': {
    resumen:
      'Disposable soap-impregnated washcloths for the hygiene of the bedridden ' +
      'patient. They need no rinsing and come in three formulations.',
    linea: 'Patient hygiene and comfort',
  },
  'comfort-rubber-gloves': {
    resumen:
      'High-risk nitrile gloves, free of latex and powder, with proven ' +
      'resistance to chemical and cytostatic agents.',
    linea: 'Personal protection',
  },
  silpak: {
    resumen:
      'Silicone manufacturing: 100 % silicone hoses and tubing in 25 m rolls ' +
      'and a range of diameters, stable from −50 °C to +250 °C.',
    linea: 'Silicone tubing',
  },
  xodus: {
    resumen:
      'Solutions for the operating theatre: surgical skin markers and ' +
      'fluid-absorbent mats with a non-slip backing.',
    linea: 'Operating theatre · absorbents and markers',
  },
  jiehong: {
    resumen:
      'Waterproof, reversible fluid-absorbent floor mats, supplied continuous ' +
      'or pre-cut.',
    linea: 'Surface absorbents',
  },
  longood: {
    resumen:
      'Individual wipes impregnated with 2 % chlorhexidine in 70 % isopropyl ' +
      'alcohol for cleaning and skin antisepsis.',
    linea: 'Antisepsis · wipes',
  },
  telijie: {
    resumen:
      'Single-use absorbent clinical wipes for surgical hand drying, patient ' +
      'bathing and instrument cleaning.',
    linea: 'Clinical wipes',
  },
  medispo: {
    resumen:
      'Waterproof plastic-backed mattress protectors, disposable and with a ' +
      'continuous barrier.',
    linea: 'Surface protection',
  },
  kangbao: {
    resumen:
      'Double-magnet needle counters for the safe counting of sharps in the ' +
      'operating theatre.',
    linea: 'Surgical safety',
  },
};

/* ═════════════════════════════════════════════════════ Especialidades */

interface EspecialidadEn {
  nombre: string;
  corto: string;
  definicion: string;
  aporte: string;
}

const especialidadesEn: Record<string, EspecialidadEn> = {
  'cirugia-laparoscopica': {
    nombre: 'Laparoscopic surgery',
    corto: 'Laparoscopic surgery',
    definicion:
      'Laparoscopy is a widely used surgical technique that allows the pelvic ' +
      'and abdominal cavity to be seen with the help of an optical lens.',
    aporte:
      'We supply access to the cavity and the material used in theatre: ' +
      'trocars with a safety tip and a shielded blade, as units and in ' +
      'preconfigured kits, together with the instruments that support the ' +
      'procedure.',
  },
  bioseguridad: {
    nombre: 'Biosafety',
    corto: 'Biosafety',
    definicion:
      'Biosafety is the set of principles, standards, protocols, technologies ' +
      'and practices put in place to avoid the risk to health and to the ' +
      'environment that comes from exposure to biological agents causing ' +
      'infectious, toxic or allergic disease.',
    aporte:
      'We cover the full circuit of hazardous waste, from the phlebotomy cart ' +
      'to the collection point, and the protective barrier for the staff who ' +
      'handle it.',
  },
  antisepsia: {
    nombre: 'Antisepsis',
    corto: 'Antisepsis',
    definicion:
      'Antisepsis is defined as the use of medicines or chemical substances ' +
      '(antiseptics) to inhibit the growth of, destroy or reduce the number of ' +
      'micro-organisms on the skin, the mucous membranes and all living tissue.',
    aporte:
      'Chlorhexidine gluconate in the four formats that practice calls for: ' +
      'no-touch applicator, sponge, brush with nail cleaner and individual wipe.',
  },
  'nutricion-enteral': {
    nombre: 'Enteral feeding',
    corto: 'Enteral feeding',
    definicion:
      'Enteral feeding is a special feeding technique which, together with ' +
      'parenteral nutrition, is also known as artificial nutrition.',
    aporte:
      'The complete nutritional support line: a pump that connects to central ' +
      'monitoring, sterile 500 and 1000 mL bags, and administration sets with ' +
      'a bottle thread.',
  },
  anestesiologia: {
    nombre: 'Anaesthesiology and airway',
    corto: 'Anaesthesiology',
    definicion:
      'Airway management underpins anaesthesia and resuscitation: exposing the ' +
      'glottis and intubating precisely, even in the difficult airway, and ' +
      'conducting aspirated fluids safely.',
    aporte:
      'Video laryngoscopy with disposable blades in every size —from neonate ' +
      'to obese patient— and the closed systems for suctioning secretions in ' +
      'theatre.',
  },
  enfermeria: {
    nombre: 'Nursing and patient care',
    corto: 'Nursing',
    definicion:
      'Caring for the bedridden patient takes up most of the clinical day. ' +
      'Every supply that removes a step from bathing, drying or protecting ' +
      'surfaces gives time back to the nursing team.',
    aporte:
      'Rinse-free bed bathing in three formulations, body drying, single-use ' +
      'clinical wipes and the absorbent protection of beds and surfaces.',
  },
};

/* ═══════════════════════════════════════════════════════ Institucional */

/** Datos de la empresa que cambian de idioma. */
export const empresaEn = {
  descripcion:
    'A Peruvian drugstore specialising in medical devices, biosafety and ' +
    'personal protection for public and private healthcare institutions. ' +
    'BPA (Good Storage Practices) certification granted by DIGEMID.',
  horario: 'Monday to Friday, 8:30 a.m. – 6:00 p.m.',
  direccionCalle: 'Av. Arica 1442, Urb. Chacra Colorada',
  pais: 'Peru',
};

/** Certificaciones, en el orden de src/data/site.ts. */
export const certificacionesEn = [
  {
    nombre: 'Good Storage Practices',
    emisor: 'DIGEMID — Ministry of Health of Peru',
    detalle:
      'It certifies that our warehouses meet the requirements for ' +
      'infrastructure, temperature control, traceability and documentation ' +
      'demanded for the storage of medical devices.',
  },
  {
    nombre: 'Anti-bribery management system',
    emisor: 'ISO international standard',
    detalle:
      'It backs the transparency of our commercial processes and of our ' +
      'participation in public and private tenders.',
  },
  {
    nombre: 'Environmental management system',
    emisor: 'ISO international standard',
    detalle:
      'It governs the control of the environmental aspects of our logistics ' +
      'operation and the responsible handling of waste.',
  },
];

/** Misión, visión y filosofía, en el orden de src/data/site.ts. */
export const valoresEn = [
  {
    titulo: 'Mission',
    texto:
      'To contribute to and improve the country’s health system through ' +
      'quality products at fair market prices.',
  },
  {
    titulo: 'Vision',
    texto:
      'To be the reference partner of Peru’s healthcare institutions in the ' +
      'supply of medical devices and biosafety, recognised for our reliability ' +
      'and technical support.',
  },
  {
    titulo: 'Philosophy',
    texto:
      'The commitment is ours: every delivery sustains the work of a ' +
      'healthcare team and the safety of a patient.',
  },
];

/** Cifras de la portada, en el orden de src/data/site.ts. */
export const cifrasEn = [
  { etiqueta: 'Year founded', nota: 'More than two decades supplying the health sector' },
  { etiqueta: 'Brands represented', nota: 'Manufacturers from Asia, the Americas and Europe' },
  { etiqueta: 'Regions served', nota: 'Coverage across the whole country' },
  { etiqueta: 'DIGEMID certification', nota: 'Good Storage Practices' },
];

/** Áreas de contacto, en el orden de src/data/site.ts. */
export const areasEn = [
  'Quotations and tenders',
  'Commercial management',
  'Planning',
  'Technical direction',
  'Marketing',
  'Central warehouse',
  'Napo warehouse',
  'Argentina warehouse',
  'Invoicing',
];

/** Mensajes de WhatsApp ya redactados, en inglés. */
export const waMensajesEn = {
  general:
    'Hello, Q-MEDICAL. I am writing from your website and would like ' +
    'information about your medical devices and biosafety products.',

  cotizacion:
    'Hello, Q-MEDICAL. I would like to request a quotation for my institution.' +
    '\n\n• Institution:\n• Products:\n• Quantities:\n• Date required:',

  catalogo:
    'Hello, Q-MEDICAL. I was looking at your online catalogue and would like ' +
    'to ask about availability and prices.\n\n• Institution:\n• Products of interest:',

  linea: (linea: string) =>
    `Hello, Q-MEDICAL. I am interested in your ${linea.toLowerCase()} line and ` +
    'would like to receive information and prices.\n\n• Institution:\n• Estimated quantities:',

  producto: (nombre: string, codigo?: string) =>
    `Hello, Q-MEDICAL. I saw «${nombre}»${codigo ? ` (${codigo})` : ''} in your ` +
    'online catalogue and would like a quotation.\n\n' +
    '• Institution:\n• Quantity required:\n• Date required:',

  reclamo:
    'Hello, Q-MEDICAL. I need guidance about the Complaints Book and the ' +
    'status of a case.',
};

/* ═══════════════════════════════════════════════════════════ Accesores */

/** Línea de producto en el idioma pedido. */
export function categoriaEn(c: Categoria, idioma: Idioma): Categoria {
  if (idioma === 'es') return c;
  const t = categoriasEn[c.slug];
  return t ? { ...c, ...t } : c;
}

/** Producto en el idioma pedido, variantes incluidas. */
export function productoEn(p: Producto, idioma: Idioma): Producto {
  if (idioma === 'es') return p;
  const t = productosEn[p.slug];
  if (!t) return p;

  const variantes: Variante[] | undefined = p.variantes?.map((v) => ({
    ...v,
    codigo: t.codigos?.[v.codigo] ?? v.codigo,
    detalle: t.variantes?.[v.codigo] ?? v.detalle,
  }));

  return {
    ...p,
    nombre: t.nombre,
    resumen: t.resumen,
    descripcion: t.descripcion,
    caracteristicas: t.caracteristicas,
    presentacion: t.presentacion ?? p.presentacion,
    usos: t.usos ?? p.usos,
    variantes,
  };
}

/** Marca en el idioma pedido. El nombre comercial nunca se traduce. */
export function marcaEn(m: Marca, idioma: Idioma): Marca {
  if (idioma === 'es') return m;
  const t = marcasEn[m.slug];
  return t ? { ...m, ...t } : m;
}

/** Especialidad clínica en el idioma pedido. */
export function especialidadEn(e: Especialidad, idioma: Idioma): Especialidad {
  if (idioma === 'es') return e;
  const t = especialidadesEn[e.slug];
  return t ? { ...e, ...t } : e;
}
