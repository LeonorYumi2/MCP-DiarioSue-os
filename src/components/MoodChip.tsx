import { Pressable, Text } from 'react-native';
import { colores } from '@/constants/theme';

type Props = {
  etiqueta: string;
  seleccionado: boolean;
  onPress: () => void;
  color?: string;
};

export function MoodChip({ etiqueta, seleccionado, onPress, color = colores.acento }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-2.5 active:opacity-80 ${
        seleccionado ? 'border-transparent' : 'border-borde bg-campo'
      }`}
      style={seleccionado ? { backgroundColor: color } : undefined}
    >
      <Text
        className={`text-sm ${seleccionado ? 'font-fuerte text-medianoche' : 'font-medio text-tinta-suave'}`}
      >
        {etiqueta}
      </Text>
    </Pressable>
  );
}