import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurTargetView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colores } from '@/constants/theme';

const ContextoBlur = createContext<RefObject<View | null> | null>(null);

export function useBlurTarget() {
  return useContext(ContextoBlur);
}

type Props = {
  children: ReactNode;
  /** Añade el margen superior del sistema (para pantallas sin encabezado nativo). */
  areaSegura?: boolean;
};

export function GradientBackground({ children, areaSegura = false }: Props) {
  const objetivo = useRef<View | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.raiz, areaSegura && { paddingTop: insets.top }]}>
      <BlurTargetView ref={objetivo} style={StyleSheet.absoluteFill}>
        <LinearGradient colors={colores.fondo} style={StyleSheet.absoluteFill} />
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="violeta" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colores.halos.violeta} stopOpacity={0.75} />
              <Stop offset="1" stopColor={colores.halos.violeta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="magenta" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colores.halos.magenta} stopOpacity={0.6} />
              <Stop offset="1" stopColor={colores.halos.magenta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="turquesa" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colores.halos.turquesa} stopOpacity={0.55} />
              <Stop offset="1" stopColor={colores.halos.turquesa} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx="0%" cy="6%" r={320} fill="url(#violeta)" />
          <Circle cx="100%" cy="46%" r={300} fill="url(#magenta)" />
          <Circle cx="4%" cy="100%" r={320} fill="url(#turquesa)" />
        </Svg>
      </BlurTargetView>

      <ContextoBlur.Provider value={objetivo}>{children}</ContextoBlur.Provider>
    </View>
  );
}

const s = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: colores.fondo[0] },
});