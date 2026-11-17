/* eslint-disable react-hooks/immutability */
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { GlassCard } from '@/components/GlassCard';
import { IntensidadEstrellas } from '@/components/IntensidadEstrellas';
import { DESENFOQUE_EN_LISTAS, colorDeEstado, fuentes } from '@/constants/theme';
import type { SuenoConSimbolos } from '@/types';

type Props = {
  sueno: SuenoConSimbolos;
  index: number;
  onPress: () => void;
};

function formatearFecha(fecha?: string | null) {
  if (!fecha) return '';
  const d = new Date(`${fecha}T00:00:00`);
  return d.toLocaleDateString('es-EC', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function SuenoCardComponent({ sueno, index, onPress }: Props) {
  const scale = useSharedValue(1);
  const color = colorDeEstado(sueno.estado_animo);

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withTiming(0.978, { duration: 100 });
  }

  function handlePressOut() {
    scale.value = withSpring(1, { damping: 15, stiffness: 220 });
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(380)
        .delay(Math.min(index * 50, 300))
        .springify()
        .damping(18)}
      style={estiloAnimado}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`Abrir sueño: ${sueno.titulo}`}
        style={s.pressable}
      >
        <GlassCard
          desenfoque={DESENFOQUE_EN_LISTAS}
          acento={color}
          relleno="p-4"
        >
          {/* Cabecera de la tarjeta: Fecha y Estado de ánimo */}
          <View style={s.filaCabecera}>
            <View style={s.fechaBadge}>
              <Text style={s.fechaTexto}>{formatearFecha(sueno.fecha)}</Text>
            </View>

            <View
              style={[
                s.estadoBadge,
                {
                  backgroundColor: `${color}18`,
                  borderColor: `${color}40`,
                },
              ]}
            >
              <View style={[s.estadoPunto, { backgroundColor: color }]} />
              <Text style={[s.estadoTexto, { color }]}>
                {sueno.estado_animo ?? 'sin estado'}
              </Text>
            </View>
          </View>

          {/* Título editorial en Fraunces */}
          <Text style={s.titulo} numberOfLines={2}>
            {sueno.titulo}
          </Text>

          {/* Fragmento del relato */}
          {sueno.relato ? (
            <Text style={s.relato} numberOfLines={2}>
              {sueno.relato}
            </Text>
          ) : null}

          {/* Pie de tarjeta: Símbolos e Intensidad */}
          <View style={s.filaPie}>
            {/* Lista de símbolos asociados */}
            <View style={s.contenedorSimbolos}>
              {sueno.simbolos.length > 0 ? (
                sueno.simbolos.slice(0, 3).map((simbolo) => (
                  <View key={simbolo} style={s.simboloChip}>
                    <Text style={s.simboloTexto}>#{simbolo}</Text>
                  </View>
                ))
              ) : (
                <View style={{ flex: 1 }} />
              )}
              {sueno.simbolos.length > 3 && (
                <Text style={s.masSimbolosTexto}>+{sueno.simbolos.length - 3}</Text>
              )}
            </View>

            {/* Intensidad con estrellas celestes */}
            <View style={s.intensidadWrapper}>
              <IntensidadEstrellas valor={sueno.intensidad} color={color} />
            </View>
          </View>
        </GlassCard>
      </Pressable>
    </Animated.View>
  );
}

export const SuenoCard = memo(SuenoCardComponent);

const s = StyleSheet.create({
  pressable: {
    borderRadius: 24,
  },
  filaCabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fechaBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  fechaTexto: {
    fontFamily: fuentes.medio,
    fontSize: 12,
    color: 'rgba(248, 247, 255, 0.55)',
    textTransform: 'capitalize',
  },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 999,
    borderWidth: 1,
  },
  estadoPunto: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  estadoTexto: {
    fontFamily: fuentes.fuerte,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 19,
    lineHeight: 25,
    color: '#F8F7FF',
    letterSpacing: -0.2,
  },
  relato: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(248, 247, 255, 0.70)',
    marginTop: 6,
  },
  filaPie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
  },
  contenedorSimbolos: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  simboloChip: {
    backgroundColor: 'rgba(167, 139, 250, 0.10)',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.20)',
  },
  simboloTexto: {
    fontFamily: fuentes.medio,
    fontSize: 11,
    color: '#C4B5FD',
  },
  masSimbolosTexto: {
    fontFamily: fuentes.medio,
    fontSize: 11,
    color: 'rgba(248, 247, 255, 0.45)',
  },
  intensidadWrapper: {
    paddingLeft: 6,
  },
});
