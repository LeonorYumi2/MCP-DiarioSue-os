import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { colores, fuentes } from '@/constants/theme';

type Props = {
  valor: number;
  onChange: (n: number) => void;
  color?: string;
};

const DESCRIPCIONES: Record<number, string> = {
  1: 'Muy tenue',
  2: 'Leve',
  3: 'Moderado',
  4: 'Intenso',
  5: 'Muy intenso',
};

export function SelectorIntensidad({ valor, onChange, color = colores.acento }: Props) {
  return (
    <View style={s.contenedor}>
      <View style={s.fila}>
        {[1, 2, 3, 4, 5].map((n) => {
          const activa = n <= valor;
          return (
            <Pressable
              key={n}
              onPress={() => onChange(n)}
              accessibilityRole="button"
              accessibilityLabel={`Intensidad ${n}: ${DESCRIPCIONES[n]}`}
              accessibilityState={{ selected: n === valor }}
              style={({ pressed }) => [s.boton, pressed && s.botonPresionado]}
            >
              <View
                style={[
                  s.circulo,
                  activa
                    ? { backgroundColor: `${color}28`, borderColor: `${color}99` }
                    : s.circuloInactivo,
                ]}
              >
                <Sparkles
                  size={20}
                  color={activa ? color : colores.tintaTenue}
                  strokeWidth={activa ? 2 : 1.5}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
      <Text style={s.descripcion}>{DESCRIPCIONES[valor] ?? ''}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    gap: 10,
  },
  fila: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  boton: {
    minWidth: 50,
    alignItems: 'center',
  },
  botonPresionado: {
    opacity: 0.75,
    transform: [{ scale: 0.9 }],
  },
  circulo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuloInactivo: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  descripcion: {
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.tintaTenue,
    letterSpacing: 0.3,
  },
});

