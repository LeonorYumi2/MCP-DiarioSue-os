import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colores } from '@/constants/theme';

type Props = {
  children: ReactNode;
  /** Añade el margen superior del sistema (para pantallas sin encabezado nativo). */
  areaSegura?: boolean;
};

// Estrellas fijas en coordenadas porcentuales para atmósfera estelar
const ESTRELLAS = [
  { cx: '12%', cy: '8%', r: 1.2, o: 0.65 },
  { cx: '28%', cy: '5%', r: 0.9, o: 0.4 },
  { cx: '76%', cy: '7%', r: 1.4, o: 0.7 },
  { cx: '88%', cy: '12%', r: 0.8, o: 0.35 },
  { cx: '48%', cy: '11%', r: 1.1, o: 0.5 },
  { cx: '6%', cy: '19%', r: 1.5, o: 0.75 },
  { cx: '92%', cy: '24%', r: 1.0, o: 0.45 },
  { cx: '35%', cy: '22%', r: 0.8, o: 0.3 },
  { cx: '64%', cy: '18%', r: 1.2, o: 0.6 },
  { cx: '18%', cy: '34%', r: 1.0, o: 0.4 },
  { cx: '82%', cy: '36%', r: 1.3, o: 0.65 },
  { cx: '52%', cy: '42%', r: 0.9, o: 0.35 },
  { cx: '8%', cy: '51%', r: 1.2, o: 0.55 },
  { cx: '94%', cy: '56%', r: 1.5, o: 0.7 },
  { cx: '41%', cy: '62%', r: 0.8, o: 0.3 },
  { cx: '72%', cy: '68%', r: 1.1, o: 0.5 },
  { cx: '24%', cy: '74%', r: 1.3, o: 0.6 },
  { cx: '86%', cy: '82%', r: 0.9, o: 0.4 },
  { cx: '14%', cy: '88%', r: 1.2, o: 0.55 },
  { cx: '62%', cy: '91%', r: 1.4, o: 0.65 },
  { cx: '38%', cy: '95%', r: 0.8, o: 0.35 },
];

export function GradientBackground({ children, areaSegura = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.raiz, areaSegura && { paddingTop: insets.top }]}>
      <View style={StyleSheet.absoluteFill}>
        {/* Fondo base degradado cósmico */}
        <LinearGradient
          colors={colores.fondo}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Halos oníricos y cielo estrellado en SVG */}
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="violeta" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.violeta} stopOpacity={0.55} />
              <Stop offset="100%" stopColor={colores.halos.violeta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="magenta" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.magenta} stopOpacity={0.42} />
              <Stop offset="100%" stopColor={colores.halos.magenta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="celeste" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.celeste} stopOpacity={0.45} />
              <Stop offset="100%" stopColor={colores.halos.celeste} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="lavanda" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.lavanda} stopOpacity={0.35} />
              <Stop offset="100%" stopColor={colores.halos.lavanda} stopOpacity={0} />
            </RadialGradient>
          </Defs>

          {/* Halos de luz ambiental */}
          <Circle cx="10%" cy="8%" r={340} fill="url(#celeste)" />
          <Circle cx="95%" cy="38%" r={320} fill="url(#magenta)" />
          <Circle cx="15%" cy="65%" r={340} fill="url(#violeta)" />
          <Circle cx="85%" cy="92%" r={300} fill="url(#lavanda)" />

          {/* Constelación sutil de estrellas */}
          {ESTRELLAS.map((star, i) => (
            <Circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#F8F7FF"
              opacity={star.o}
            />
          ))}
        </Svg>
      </View>

      {children}
    </View>
  );
}

const s = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: colores.fondo[0] },
});