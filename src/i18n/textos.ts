/**
 * Textos que aparecen en más de una página: cabecera, pie, llamadas a la
 * acción, fichas de producto y formularios.
 *
 * La prosa propia de cada página no vive aquí, sino junto a su maquetación,
 * donde se lee en contexto y no se desincroniza al editarla. Aquí solo lo que
 * se repite.
 *
 * El inglés es el del sector: «drugstore» es la figura que la normativa
 * peruana llama droguería, y los nombres de los organismos y de las normas
 * (DIGEMID, BPA, ISO) se mantienen, con su equivalencia entre paréntesis la
 * primera vez que aparecen.
 */
import type { Idioma } from './rutas';

const es = {
  /* ─────────────────────────────────────────────────────────── Cabecera */
  cintilloPrefijo: 'Droguería certificada en ',
  cintilloMedio: 'Buenas Prácticas de Almacenamiento — DIGEMID',
  cintilloCorto: 'Certificación BPA',
  irInicio: 'Inicio',
  navPrincipal: 'Navegación principal',
  navMovil: 'Navegación móvil',
  abrirMenu: 'Abrir menú',
  cerrarMenu: 'Cerrar menú',
  cambiarIdioma: 'Idioma',
  verEn: (n: string) => `Ver esta página en ${n}`,

  nav: {
    nosotros: 'Nosotros',
    catalogo: 'Catálogo',
    empresa: 'Empresa',
    contacto: 'Contacto',
    marcas: 'Marcas asociadas',
  },

  megaCatalogo: {
    destacado: 'Destacado',
    lineas: 'Líneas de producto',
    todo: (n: number) => `Todo el catálogo · ${n} productos`,
    cotizar: 'Solicitar una cotización',
  },
  megaEmpresa: {
    titulo: 'La empresa',
    desde: (a: number) => `Desde ${a}`,
    almacen: 'Nuestro almacén',
    marcasNota: (n: number) => `${n} fabricantes representados`,
    infraestructura: 'Infraestructura',
    infraestructuraNota: 'Almacén certificado BPA',
    certificaciones: 'Certificaciones',
    certificacionesNota: 'BPA · ISO 37001 · ISO 14001',
    entregas: 'Entregas',
    entregasNota: 'Cobertura en todas las regiones',
    reclamos: 'Libro de Reclamaciones',
  },

  /* ─────────────────────────────────────────────────── Acciones comunes */
  cotizar: 'Solicitar cotización',
  cotizarCorto: 'Cotizar',
  verCatalogo: 'Ver catálogo',
  verProducto: 'Ver producto',
  escribirWa: 'Escribir por WhatsApp',
  fichaTecnica: 'Ficha técnica',
  rutaNavegacion: 'Ruta de navegación',

  /* ──────────────────────────────────────────────────── Cierre y pie */
  cierre: {
    ante: 'Siguiente paso',
    titulo: '¿Necesita una cotización para su institución?',
    texto:
      'Indíquenos productos, cantidades y fecha requerida. Le respondemos con ' +
      'precio, disponibilidad y la documentación técnica que pida su expediente.',
    oEscriba: 'o escriba a',
  },

  pie: {
    ante: 'Hablemos',
    titulo:
      'Cuéntenos qué necesita su institución y le respondemos con precio, ' +
      'disponibilidad y ficha técnica.',
    sobre:
      'Droguería peruana comprometida con la salud del país. Abastecemos a ' +
      'instituciones de salud estatales y privadas con dispositivos médicos, ' +
      'bioseguridad y protección personal de alta calidad.',
    lineas: 'Líneas de producto',
    empresa: 'Empresa',
    contacto: 'Contacto',
    correos: 'Correos por área',
    nosotros: 'Nosotros',
    catalogo: 'Catálogo',
    marcas: 'Marcas asociadas',
    fichas: 'Fichas técnicas',
    reclamos: 'Libro de reclamaciones',
    horario: 'Horario de atención',
    derechos: (a: number, n: string) => `© ${a} ${n}. Todos los derechos reservados.`,
    ruc: 'RUC',
  },

  /* ───────────────────────────────────────────────────────── Formularios */
  form: {
    nombre: 'Nombre y apellidos',
    institucion: 'Institución o empresa',
    correo: 'Correo electrónico',
    telefono: 'Teléfono',
    cargo: 'Cargo',
    asunto: 'Asunto',
    mensaje: 'Mensaje',
    enviar: 'Enviar',
    enviando: 'Enviando…',
    opcional: 'opcional',
    requeridos: 'Los campos marcados con * son obligatorios.',
    errorGeneral:
      'No pudimos enviar el mensaje. Inténtelo otra vez o escríbanos por WhatsApp.',
    privacidad:
      'Sus datos se usan únicamente para responder esta consulta y no se comparten con terceros.',
  },

  /* ──────────────────────────────────────────────────── Ficha de producto */
  producto: {
    descripcion: 'Descripción',
    caracteristicas: 'Características',
    presentacion: 'Presentación',
    usos: 'Usos',
    variantes: 'Códigos y presentaciones',
    codigo: 'Código',
    detalle: 'Detalle',
    documentacion: 'Documentación técnica',
    relacionados: 'Otros productos de la línea',
    marca: 'Marca',
    linea: 'Línea',
    sinImagen: 'Imagen bajo consulta',
  },

  /* ───────────────────────────────────────────────────────────── Genéricos */
  productosCuenta: (n: number) => (n === 1 ? '1 producto' : `${n} productos`),
};

/** El inglés replica la estructura exacta del castellano. */
const en: typeof es = {
  cintilloPrefijo: 'Drugstore certified in ',
  cintilloMedio: 'Good Storage Practices (BPA) — DIGEMID',
  cintilloCorto: 'BPA certified',
  irInicio: 'Home',
  navPrincipal: 'Main navigation',
  navMovil: 'Mobile navigation',
  abrirMenu: 'Open menu',
  cerrarMenu: 'Close menu',
  cambiarIdioma: 'Language',
  verEn: (n: string) => `View this page in ${n}`,

  nav: {
    nosotros: 'About us',
    catalogo: 'Catalogue',
    empresa: 'Company',
    contacto: 'Contact',
    marcas: 'Partner brands',
  },

  megaCatalogo: {
    destacado: 'Featured',
    lineas: 'Product lines',
    todo: (n: number) => `Full catalogue · ${n} products`,
    cotizar: 'Request a quotation',
  },
  megaEmpresa: {
    titulo: 'The company',
    desde: (a: number) => `Since ${a}`,
    almacen: 'Our warehouse',
    marcasNota: (n: number) => `${n} manufacturers represented`,
    infraestructura: 'Facilities',
    infraestructuraNota: 'BPA-certified warehouse',
    certificaciones: 'Certifications',
    certificacionesNota: 'BPA · ISO 37001 · ISO 14001',
    entregas: 'Deliveries',
    entregasNota: 'Coverage across every region',
    reclamos: 'Complaints Book',
  },

  cotizar: 'Request a quotation',
  cotizarCorto: 'Quotation',
  verCatalogo: 'View catalogue',
  verProducto: 'View product',
  escribirWa: 'Message us on WhatsApp',
  fichaTecnica: 'Datasheet',
  rutaNavegacion: 'Breadcrumb',

  cierre: {
    ante: 'Next step',
    titulo: 'Do you need a quotation for your institution?',
    texto:
      'Tell us the products, quantities and date you need. We reply with ' +
      'price, availability and the technical documentation your file requires.',
    oEscriba: 'or write to',
  },

  pie: {
    ante: 'Let us talk',
    titulo:
      'Tell us what your institution needs and we will reply with price, ' +
      'availability and the datasheet.',
    sobre:
      'A Peruvian drugstore committed to the health of the country. We supply ' +
      'public and private healthcare institutions with high-quality medical ' +
      'devices, biosafety and personal protection products.',
    lineas: 'Product lines',
    empresa: 'Company',
    contacto: 'Contact',
    correos: 'Email by department',
    nosotros: 'About us',
    catalogo: 'Catalogue',
    marcas: 'Partner brands',
    fichas: 'Datasheets',
    reclamos: 'Complaints Book',
    horario: 'Opening hours',
    derechos: (a: number, n: string) => `© ${a} ${n}. All rights reserved.`,
    ruc: 'Tax ID (RUC)',
  },

  form: {
    nombre: 'Full name',
    institucion: 'Institution or company',
    correo: 'Email address',
    telefono: 'Phone',
    cargo: 'Role',
    asunto: 'Subject',
    mensaje: 'Message',
    enviar: 'Send',
    enviando: 'Sending…',
    opcional: 'optional',
    requeridos: 'Fields marked with * are required.',
    errorGeneral:
      'We could not send your message. Please try again or reach us on WhatsApp.',
    privacidad:
      'Your details are used only to answer this enquiry and are not shared with third parties.',
  },

  producto: {
    descripcion: 'Description',
    caracteristicas: 'Features',
    presentacion: 'Packaging',
    usos: 'Applications',
    variantes: 'Codes and presentations',
    codigo: 'Code',
    detalle: 'Details',
    documentacion: 'Technical documentation',
    relacionados: 'More from this line',
    marca: 'Brand',
    linea: 'Line',
    sinImagen: 'Image on request',
  },

  productosCuenta: (n: number) => (n === 1 ? '1 product' : `${n} products`),
};

const TEXTOS = { es, en } as const;

/** Textos del idioma pedido. */
export function textos(idioma: Idioma) {
  return TEXTOS[idioma];
}

export type Textos = typeof es;
