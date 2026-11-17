import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle, Defs, Ellipse, LinearGradient as SvgGradient, Path, Stop } from 'react-native-svg';
import { colores } from '@/constants/theme';

type Props = {
  tamano?: number;
  style?: StyleProp<ViewStyle>;
};

export function EmblemaCelestial({ tamano = 72, style }: Props) {
  return (
    <Animated.View entering={FadeIn.duration(650)} style={[s.contenedor, style]}>
      <Svg width={tamano} height={tamano} viewBox="0 0 72 72">
        <Defs>
          <SvgGradient id="emblemaLunaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colores.celeste} />
            <Stop offset="100%" stopColor={colores.lavanda} />
          </SvgGradient>
        </Defs>

        {/* Resplandor ambiental suave de fondo */}
        <Circle cx="36" cy="36" r="22" fill="rgba(56, 189, 248, 0.08)" />

        {/* Órbita celestial sutil inclinada con trazo delicado */}
        <Ellipse
          cx="36"
          cy="36"
          rx="31"
          ry="12"
          transform="rotate(-26 36 36)"
          stroke="rgba(167, 139, 250, 0.42)"
          strokeWidth="1.2"
          strokeDasharray="3.5 3.5"
          fill="none"
        />

        {/* Luna creciente estilizada en degradado celeste-lavanda */}
        <Path
          d="M 36 17 C 26.5 17 19 25 19 35 C 19 45 26.5 53 36 53 C 30 48.5 26.5 42 26.5 35 C 26.5 28 30 21.5 36 17 Z"
          fill="url(#emblemaLunaGrad)"
        />

        {/* Destello de 4 puntas en la trayectoria orbital */}
        <Path
          d="M 55 18 Q 55 21.5 51.5 21.5 Q 55 21.5 55 25 Q 55 21.5 58.5 21.5 Q 55 21.5 55 18 Z"
          fill={colores.celeste}
          opacity={0.92}
        />

        {/* Detalle estelar menor */}
        <Circle cx="16" cy="46" r="1.3" fill={colores.lavanda} opacity={0.8} />
      </Svg>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
  },
});
