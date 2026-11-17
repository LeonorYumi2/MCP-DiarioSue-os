import { StyleSheet, View } from 'react-native';
import { Sparkle } from 'lucide-react-native';
import { colores } from '@/constants/theme';

type Props = {
  valor: number | null;
  color?: string;
  tamano?: number;
};

export function IntensidadEstrellas({
  valor = 0,
  color = colores.celeste,
  tamano = 13,
}: Props) {
  const nivel = valor ?? 0;

  return (
    <View
      style={s.fila}
      accessibilityRole="text"
      accessibilityLabel={`Intensidad: ${nivel} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((estrella) => {
        const activa = estrella <= nivel;

        return (
          <View key={estrella} style={s.estrellaContenedor}>
            <Sparkle
              size={tamano}
              color={activa ? color : 'rgba(248, 247, 255, 0.22)'}
              fill={activa ? color : 'transparent'}
            />
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  estrellaContenedor: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
