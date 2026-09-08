/**
 * Especialidades clínicas a las que abastece Q-MEDICAL.
 *
 * Ojo con la distinción: una especialidad es un campo de la práctica médica
 * —el servicio que compra—, mientras que una línea de producto es la forma en
 * que se ordena el catálogo. Una especialidad puede alimentarse de varias
 * líneas, y una línea puede servir a varias especialidades.
 *
 * Las definiciones se conservan tal como las publica la empresa.
 */

export interface Especialidad {
  slug: string;
  nombre: string;
  /** Rótulo corto para la lista lateral. */
  corto: string;
  icono: string;
  /** Definición de la especialidad, en el lenguaje de la empresa. */
  definicion: string;
  /** Qué aporta Q-MEDICAL a ese servicio. */
  aporte: string;
  /** Slugs de las líneas del catálogo que la abastecen. */
  lineas: string[];
}

export const especialidades: Especialidad[] = [
  {
    slug: 'cirugia-laparoscopica',
    nombre: 'Cirugía laparoscópica',
    corto: 'Cirugía laparoscópica',
    icono: 'esp-laparoscopia',
    definicion:
      'La laparoscopia es una técnica quirúrgica de uso frecuente, que permite ' +
      'la visión de la cavidad pélvico-abdominal con la ayuda de una lente óptica.',
    aporte:
      'Abastecemos el acceso a la cavidad y el material de sala: trócares con ' +
      'punta de seguridad y hoja blindada, en unidades y en kits preconfigurados, ' +
      'además del instrumental de apoyo del acto quirúrgico.',
    lineas: ['laparoscopia', 'instrumental'],
  },
  {
    slug: 'bioseguridad',
    nombre: 'Bioseguridad',
    corto: 'Bioseguridad',
    icono: 'esp-bioseguridad',
    definicion:
      'La bioseguridad es el conjunto de principios, normas, protocolos, ' +
      'tecnologías y prácticas que se implementan para evitar el riesgo para la ' +
      'salud y el medio ambiente que proviene de la exposición a agentes ' +
      'biológicos causantes de enfermedades infecciosas, tóxicas o alérgicas.',
    aporte:
      'Cubrimos el circuito completo del residuo peligroso, desde el carro de ' +
      'flebotomía hasta el punto de acopio, y la barrera del personal que lo ' +
      'manipula.',
    lineas: ['bioseguridad', 'proteccion-personal'],
  },
  {
    slug: 'antisepsia',
    nombre: 'Antisepsia',
    corto: 'Antisepsia',
    icono: 'esp-antisepsia',
    definicion:
      'Antisepsia se define como el empleo de medicamentos o de sustancias ' +
      'químicas (antisépticos) para inhibir el crecimiento, destruir o disminuir ' +
      'el número de microorganismos de la piel, mucosas y todos los tejidos vivos.',
    aporte:
      'Gluconato de clorhexidina en los cuatro formatos que pide la práctica: ' +
      'aplicador sin contacto, esponja, cepillo con limpiauñas y toallita ' +
      'individual.',
    lineas: ['antisepsia'],
  },
  {
    slug: 'nutricion-enteral',
    nombre: 'Nutrición enteral',
    corto: 'Nutrición enteral',
    icono: 'esp-nutricion',
    definicion:
      'La nutrición enteral es una técnica especial de alimentación que, junto ' +
      'con la nutrición parenteral, también se denomina nutrición artificial.',
    aporte:
      'La línea completa del soporte nutricional: bomba con conexión al ' +
      'monitoreo central, bolsas estériles de 500 y 1000 mL, y sets de ' +
      'administración con rosca para frasco.',
    lineas: ['nutricion-enteral'],
  },
  {
    slug: 'anestesiologia',
    nombre: 'Anestesiología y vía aérea',
    corto: 'Anestesiología',
    icono: 'esp-via-aerea',
    definicion:
      'El manejo de la vía aérea sostiene la anestesia y la reanimación: ' +
      'exponer la glotis e intubar con precisión, incluso en la vía aérea ' +
      'difícil, y conducir de forma segura los fluidos aspirados.',
    aporte:
      'Videolaringoscopía con hojas desechables en todas las tallas —de recién ' +
      'nacido a paciente obeso— y los sistemas cerrados de aspiración de ' +
      'secreciones del quirófano.',
    lineas: ['via-aerea', 'aspiracion'],
  },
  {
    slug: 'enfermeria',
    nombre: 'Enfermería y cuidado del paciente',
    corto: 'Enfermería',
    icono: 'esp-cuidado',
    definicion:
      'El cuidado del paciente encamado ocupa la mayor parte del tiempo ' +
      'asistencial. Cada insumo que reduce pasos en el baño, el secado o la ' +
      'protección de superficies devuelve tiempo al equipo de enfermería.',
    aporte:
      'Baño en cama sin enjuague en tres formulaciones, secado corporal, paños ' +
      'clínicos de un solo uso y la protección absorbente de camas y ' +
      'superficies.',
    lineas: ['higiene-paciente', 'absorbentes'],
  },
];
