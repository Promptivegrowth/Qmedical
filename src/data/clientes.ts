/**
 * Instituciones a las que Q-MEDICAL abastece.
 *
 * Son los logotipos que entregó la empresa. El orden es alfabético y no
 * jerárquico a propósito: ninguna institución encabeza la lista por tamaño.
 *
 * Los archivos los genera scripts/optimize_images.py en /img/clientes/.
 */

export interface Cliente {
  slug: string;
  nombre: string;
  /**
   * El logotipo está dibujado en blanco, para fondo oscuro. Sobre una celda
   * blanca no se vería, así que se publica sobre fondo oscuro. Lo detecta
   * scripts/ midiendo la luminancia del archivo, no se marca a mano.
   */
  claro?: boolean;
}

export const clientes: Cliente[] = [
  { slug: 'clinica-angloamericana', nombre: 'Clinica Angloamericana' },
  { slug: 'clinica-izaguirre', nombre: 'Clinica Izaguirre' },
  { slug: 'clinica-stella-maris', nombre: 'Clinica Stella Maris' },
  { slug: 'clinica-aviva', nombre: 'Clínica Aviva' },
  { slug: 'clinica-buenaventura', nombre: 'Clínica Buenaventura' },
  { slug: 'clinica-centenario-peruano-japonesa', nombre: 'Clínica Centenario Peruano Japonesa' },
  { slug: 'clinica-detecta', nombre: 'Clínica Detecta' },
  { slug: 'clinica-good-hope', nombre: 'Clínica Good Hope' },
  { slug: 'clinica-internacional', nombre: 'Clínica Internacional' },
  { slug: 'clinica-javier-prado', nombre: 'Clínica Javier Prado' },
  { slug: 'clinica-montefiori', nombre: 'Clínica Montefiori' },
  { slug: 'clinica-monterrico', nombre: 'Clínica Monterrico', claro: true },
  { slug: 'clinica-montesur', nombre: 'Clínica Montesur' },
  { slug: 'clinica-ricardo-palma', nombre: 'Clínica Ricardo Palma' },
  { slug: 'clinica-san-marcos', nombre: 'Clínica San Marcos' },
  { slug: 'clinica-santa-beatriz', nombre: 'Clínica Santa Beatriz' },
  { slug: 'clinica-santa-isabel', nombre: 'Clínica Santa Isabel' },
  { slug: 'clinica-tezza', nombre: 'Clínica Tezza' },
  { slug: 'clinica-uniderma', nombre: 'Clínica Uniderma' },
  { slug: 'clinica-vesalio', nombre: 'Clínica Vesalio' },
  { slug: 'essalud', nombre: 'ESSALUD' },
  { slug: 'euroclinica', nombre: 'Euroclínica', claro: true },
  { slug: 'grupo-auna', nombre: 'Grupo AUNA' },
  { slug: 'grupo-san-pablo', nombre: 'Grupo San Pablo' },
  { slug: 'minsa', nombre: 'MINSA' },
  { slug: 'operacion-sonrisa-peru', nombre: 'Operación Sonrisa Perú' },
];
