import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colores, fuentes } from '@/constants/theme';

type Props = {
  etiqueta: string;
  seleccionado: boolean;
  onPress: () => void;
  color?: string;
  icono?: ReactNode;
};

export function MoodChip({
  etiqueta,
  seleccionado,
  onPress,
  color = colores.acento,
  icono,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: seleccionado }}
      accessibilityLabel={etiqueta}
      style={({ pressed }) => [
        s.chipBase,
        seleccionado ? s.chipSeleccionado : s.chipInactivo,
        seleccionado && { backgroundColor: color, borderColor: color },
        pressed && s.chipPresionado,
      ]}
    >
      <View style={s.contenido}>
        {icono}
        <Text
          style={[
            s.texto,
            seleccionado ? s.textoSeleccionado : s.textoInactivo,
          ]}
        >
          {etiqueta}
        </Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  chipBase: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipInactivo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  },
  chipSeleccionado: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  chipPresionado: {
    opacity: 0.82,
    transform: [{ scale: 0.96 }],
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  texto: {
    fontSize: 14,
  },
  textoInactivo: {
    fontFamily: fuentes.medio,
    color: colores.tintaSuave,
  },
  textoSeleccionado: {
    fontFamily: fuentes.fuerte,
    color: '#06071B',
  },
});
