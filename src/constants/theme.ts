export const colores = {
  fondo: ['#0A0B2E', '#1E1066', '#3B0F70'] as const,
  halos: { violeta: '#7C3AED', magenta: '#D946EF', turquesa: '#22D3EE' },
  tinta: '#F5F3FF',
  tintaSuave: 'rgba(245,243,255,0.72)',
  tintaTenue: 'rgba(245,243,255,0.45)',
  tintaOscura: '#0A0B2E',
  vidrio: 'rgba(255,255,255,0.09)',
  campo: 'rgba(255,255,255,0.08)',
  borde: 'rgba(255,255,255,0.24)',
  acento: '#8B5CF6',
  acentoFin: '#D946EF',
  error: '#FDA4AF',
  estado: {
    tranquilo: '#22D3EE',
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