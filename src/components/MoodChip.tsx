import { Pressable, StyleSheet, Text } from 'react-native';

type Props = { etiqueta: string; seleccionado: boolean; onPress: () => void };

export function MoodChip({ etiqueta, seleccionado, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[s.chip, seleccionado && s.activo]}>
      <Text style={[s.texto, seleccionado && s.textoActivo]}>{etiqueta}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#999' },
  activo: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  texto: { color: '#444' },
  textoActivo: { color: '#fff', fontWeight: '600' },
});