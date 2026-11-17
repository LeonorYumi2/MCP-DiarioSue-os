export const colores = {
  fondo: ['#06071B', '#110A38', '#25084A'] as const,
  halos: {
    violeta: '#7C3AED',
    magenta: '#D946EF',
    turquesa: '#22D3EE',
    celeste: '#38BDF8',
    lavanda: '#C4B5FD',
    luna: '#E0F2FE',
  },
  tinta: '#F8F7FF',
  tintaSuave: 'rgba(248,247,255,0.74)',
  tintaTenue: 'rgba(248,247,255,0.45)',
  tintaOscura: '#06071B',
  vidrio: 'rgba(255,255,255,0.08)',
  vidrioBrillo: 'rgba(255,255,255,0.18)',
  campo: 'rgba(255,255,255,0.06)',
  borde: 'rgba(255,255,255,0.18)',
  bordeSutil: 'rgba(255,255,255,0.09)',
  bordeLuz: 'rgba(255,255,255,0.32)',
  acento: '#8B5CF6',
  acentoFin: '#D946EF',
  celeste: '#38BDF8',
  lavanda: '#A78BFA',
  error: '#FDA4AF',
  estado: {
    tranquilo: '#38BDF8',
    lucido: '#A78BFA',
    raro: '#F0ABFC',
    pesadilla: '#FB7185',
  },
} as const;

export const fuentes = {
  titulo: 'Fraunces_600SemiBold',
  cuerpo: 'Manrope_400Regular',
  medio: 'Manrope_600SemiBold',
  fuerte: 'Manrope_700Bold',
} as const;

export const radios = { tarjeta: 24, campo: 16, boton: 18, chip: 999 } as const;

// Si la lista va lenta en un Android antiguo, ponlo en false.
export const DESENFOQUE_EN_LISTAS = true;

export function colorDeEstado(estado?: string | null): string {
  if (estado && estado in colores.estado) {
    return colores.estado[estado as keyof typeof colores.estado];
  }
  return colores.acento;
}