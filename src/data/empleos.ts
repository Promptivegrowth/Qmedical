/**
 * Vacantes publicadas en el portal del Grupo Pacheco.
 *
 * Se leen al armar la página, no en el navegador: una oferta de empleo es
 * contenido que conviene que esté en el HTML —para que se indexe y para que
 * se vea aunque el visitante tenga el JavaScript bloqueado—, y el sitio ya
 * se arma en el servidor.
 *
 * La lectura es anónima. La base solo devuelve lo publicado y vigente: la
 * política de `empleos` filtra por `publicado` y por la fecha de cierre, de
 * modo que una vacante vencida desaparece sola sin que nadie la despublique.
 *
 * Si la consulta falla, la página se arma sin vacantes y muestra su estado
 * vacío. Es preferible a reventar la página entera por una lista que puede
 * estar vacía de todos modos.
 */

const BASE = 'https://youlxcpbffsvokhygubh.supabase.co/rest/v1';
/* Clave publicable: pública por diseño, la misma que usa el catálogo. */
const CLAVE = 'sb_publishable_ldYnYlLuvA4fVu8Hnlh-nw_M2C2Hkui';
const EMPRESA = 'qmedical';

export interface Vacante {
  id: string;
  titulo: string;
  area: string | null;
  ubicacion: string | null;
  modalidad: string;
  jornada: string;
  resumen: string;
  reporta_a: string | null;
  requisitos: string[];
  funciones: string[];
  beneficios: string[];
  fecha_publicacion: string;
  fecha_cierre: string | null;
}

const CAMPOS =
  'id,titulo,area,ubicacion,modalidad,jornada,resumen,reporta_a,requisitos,' +
  'funciones,beneficios,fecha_publicacion,fecha_cierre';

export async function vacantes(): Promise<Vacante[]> {
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), 8000);
  try {
    const r = await fetch(
      `${BASE}/empleos?empresa_id=eq.${EMPRESA}&select=${CAMPOS}` +
        '&order=orden.asc,fecha_publicacion.desc',
      { headers: { apikey: CLAVE }, signal: control.signal },
    );
    if (!r.ok) throw new Error(`${r.status}`);
    const datos = (await r.json()) as Vacante[];
    return Array.isArray(datos) ? datos : [];
  } catch (err) {
    console.warn(
      '[empleos] no se pudieron leer las vacantes: %s',
      err instanceof Error ? err.message : err,
    );
    return [];
  } finally {
    clearTimeout(reloj);
  }
}

/** «25 set. 2026», en el idioma de la página. */
export function fecha(iso: string, lang: 'es' | 'en'): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'es-PE', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/**
 * «Empleo presencial — Breña, Lima». La modalidad y el lugar se dicen juntos
 * porque por separado no responden a la pregunta que se hace quien postula.
 */
export function lugarDe(v: Vacante, lang: 'es' | 'en'): string {
  const modalidades: Record<string, string> = {
    Presencial: 'On-site',
    Híbrido: 'Hybrid',
    Remoto: 'Remote',
  };
  const modalidad = lang === 'en' ? (modalidades[v.modalidad] ?? v.modalidad) : v.modalidad;
  const prefijo = lang === 'en' ? `${modalidad} role` : `Empleo ${modalidad.toLowerCase()}`;
  return [prefijo, v.ubicacion].filter(Boolean).join(' — ');
}

/** Modalidad y jornada traducidas, para la línea de datos de la tarjeta. */
export function metaDe(v: Vacante, lang: 'es' | 'en'): string[] {
  if (lang === 'es') return [v.ubicacion, v.modalidad, v.jornada].filter(Boolean) as string[];
  const modalidades: Record<string, string> = {
    Presencial: 'On-site',
    Híbrido: 'Hybrid',
    Remoto: 'Remote',
  };
  const jornadas: Record<string, string> = {
    'Tiempo completo': 'Full time',
    'Medio tiempo': 'Part time',
    'Por turnos': 'Shift work',
    Prácticas: 'Internship',
  };
  return [
    v.ubicacion,
    modalidades[v.modalidad] ?? v.modalidad,
    jornadas[v.jornada] ?? v.jornada,
  ].filter(Boolean) as string[];
}
