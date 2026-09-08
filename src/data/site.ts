/** Datos institucionales de Q-MEDICAL S.A.C. */

export const site = {
  nombre: 'Q-MEDICAL S.A.C.',
  nombreCorto: 'Q-MEDICAL',
  url: 'https://qmedicalsac.com',
  /** Requerido por el Libro de Reclamaciones (D.S. 011-2011-PCM). Verificar antes de publicar. */
  ruc: '20505719396',
  razonSocial: 'Q-MEDICAL S.A.C.',
  descripcion:
    'Droguería peruana especializada en dispositivos médicos, bioseguridad y ' +
    'protección personal para instituciones de salud públicas y privadas. ' +
    'Certificación BPA otorgada por DIGEMID.',
  fundacion: 2003,
  get anios() {
    return new Date().getFullYear() - this.fundacion;
  },
  direccion: {
    calle: 'Av. Arica N° 1442, Urb. Chacra Colorada',
    distrito: 'Breña',
    ciudad: 'Lima',
    pais: 'Perú',
    get completa() {
      return `${this.calle}, ${this.distrito}, ${this.ciudad} — ${this.pais}`;
    },
  },
  telefonos: [
    { etiqueta: '(01) 424-7290', href: 'tel:+5114247290' },
    { etiqueta: '(01) 433-4197', href: 'tel:+5114334197' },
  ],
  whatsapp: {
    numero: '+51 977 814 006',
    href: 'https://wa.me/51977814006',
  },
  correoPrincipal: 'cotizaciones_licitaciones@qmedicalsac.com',
  horario: 'Lunes a viernes, 8:30 a. m. – 6:00 p. m.',
  /**
   * Endpoint para el envío de formularios sin servidor propio, de modo que el
   * sitio funcione idéntico en Vercel y en el hosting compartido de cPanel.
   * Basta con crear una clave gratuita en https://web3forms.com y pegarla aquí
   * (o definir PUBLIC_FORM_ACCESS_KEY en las variables de entorno).
   * Mientras esté vacío, los formularios abren el gestor de correo del usuario.
   */
  formAccessKey: import.meta.env.PUBLIC_FORM_ACCESS_KEY ?? '',
  formEndpoint: 'https://api.web3forms.com/submit',
} as const;

/* --------------------------------------------------------------- WhatsApp */

/** Construye un enlace de WhatsApp con el mensaje ya redactado. */
export function whatsapp(mensaje?: string): string {
  const base = 'https://wa.me/51977814006';
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/**
 * Mensajes previos según desde dónde escriba el visitante. Llegan ya escritos
 * en el chat: el cliente solo pulsa enviar y el equipo comercial recibe el
 * contexto sin tener que preguntarlo.
 */
export const waMensajes = {
  general:
    'Hola, Q-MEDICAL. Escribo desde su página web y quisiera información ' +
    'sobre sus dispositivos médicos y productos de bioseguridad.',

  cotizacion:
    'Hola, Q-MEDICAL. Quisiera solicitar una cotización para mi institución.\n\n' +
    '• Institución:\n• Productos:\n• Cantidades:\n• Fecha requerida:',

  catalogo:
    'Hola, Q-MEDICAL. Estuve viendo su catálogo web y quisiera consultar ' +
    'disponibilidad y precios.\n\n• Institución:\n• Productos de interés:',

  linea: (linea: string) =>
    `Hola, Q-MEDICAL. Me interesa su línea de ${linea.toLowerCase()} y ` +
    'quisiera recibir información y precios.\n\n• Institución:\n• Cantidades estimadas:',

  producto: (nombre: string, codigo?: string) =>
    `Hola, Q-MEDICAL. Vi «${nombre}»${codigo ? ` (${codigo})` : ''} en su ` +
    'catálogo web y quisiera cotizarlo.\n\n' +
    '• Institución:\n• Cantidad requerida:\n• Fecha requerida:',

  reclamo:
    'Hola, Q-MEDICAL. Necesito orientación sobre el Libro de Reclamaciones ' +
    'y el estado de una atención.',
} as const;

export const contactos = [
  { area: 'Cotizaciones y licitaciones', correo: 'cotizaciones_licitaciones@qmedicalsac.com' },
  { area: 'Gerencia comercial', correo: 'gerenciacomercial@qmedicalsac.com' },
  { area: 'Planeamiento', correo: 'planeamiento@qmedicalsac.com' },
  { area: 'Dirección técnica', correo: 'direccion_tecnica@qmedicalsac.com' },
  { area: 'Marketing', correo: 'marketing@qmedicalsac.com' },
  { area: 'Almacén central', correo: 'almacen@qmedicalsac.com' },
  { area: 'Almacén Napo', correo: 'almacen_napo@qmedicalsac.com' },
  { area: 'Almacén Argentina', correo: 'almacen_argentina@qmedicalsac.com' },
  { area: 'Facturación', correo: 'asist.facturacion1@qmedicalsac.com' },
];

export const redes = [
  { nombre: 'Instagram', href: 'https://www.instagram.com/qmedicalperu/', icono: 'instagram' },
  { nombre: 'Facebook', href: 'https://www.facebook.com/Drogueria.QMedicalsac', icono: 'facebook' },
  { nombre: 'LinkedIn', href: 'https://www.linkedin.com/company/q-medical-s-a-c/', icono: 'linkedin' },
  { nombre: 'YouTube', href: 'https://www.youtube.com/channel/UCFh2U0cEywVbI2dtXEfIbtw', icono: 'youtube' },
] as const;

export const navegacion = [
  { nombre: 'Inicio', href: '/' },
  { nombre: 'Nosotros', href: '/nosotros' },
  { nombre: 'Catálogo', href: '/catalogo' },
  { nombre: 'Marcas', href: '/marcas' },
  { nombre: 'Fichas técnicas', href: '/fichas-tecnicas' },
  { nombre: 'Contacto', href: '/contacto' },
];

export const certificaciones = [
  {
    sigla: 'BPA',
    nombre: 'Buenas Prácticas de Almacenamiento',
    emisor: 'DIGEMID — Ministerio de Salud del Perú',
    detalle:
      'Acredita que nuestros almacenes cumplen las condiciones de ' +
      'infraestructura, control de temperatura, trazabilidad y documentación ' +
      'exigidas para la conservación de dispositivos médicos.',
  },
  {
    sigla: 'ISO 37001',
    nombre: 'Sistema de gestión antisoborno',
    emisor: 'Norma internacional ISO',
    detalle:
      'Respalda la transparencia de nuestros procesos comerciales y de ' +
      'participación en licitaciones públicas y privadas.',
  },
  {
    sigla: 'ISO 14001',
    nombre: 'Sistema de gestión ambiental',
    emisor: 'Norma internacional ISO',
    detalle:
      'Ordena el control de los aspectos ambientales de nuestra operación ' +
      'logística y del manejo responsable de residuos.',
  },
];

export const valores = [
  {
    titulo: 'Misión',
    texto:
      'Contribuir y mejorar el sistema de salud del país a través de productos ' +
      'de calidad y a buenos precios en el mercado.',
  },
  {
    titulo: 'Visión',
    texto:
      'Ser el aliado de referencia de las instituciones de salud del Perú en el ' +
      'abastecimiento de dispositivos médicos y bioseguridad, reconocidos por ' +
      'nuestra confiabilidad y respaldo técnico.',
  },
  {
    titulo: 'Filosofía',
    texto:
      'El compromiso es de nosotros: cada entrega sostiene el trabajo de un ' +
      'equipo de salud y la seguridad de un paciente.',
  },
];

export const cifras = [
  { valor: '2003', etiqueta: 'Año de fundación', nota: 'Más de dos décadas abasteciendo al sector salud' },
  { valor: '15', etiqueta: 'Marcas representadas', nota: 'Fabricantes de Asia, América y Europa' },
  { valor: '25', etiqueta: 'Regiones atendidas', nota: 'Cobertura en todo el territorio nacional' },
  { valor: 'BPA', etiqueta: 'Certificación DIGEMID', nota: 'Buenas Prácticas de Almacenamiento' },
];
