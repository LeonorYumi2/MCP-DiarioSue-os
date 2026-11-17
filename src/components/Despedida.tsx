import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';

export function Despedida() {
  const auraScale = useSharedValue(1);

  useEffect(() => {
    auraScale.value = withRepeat(
      withSequence(
        withTiming(1.09, { duration: 2400 }),
        withTiming(1, { duration: 2400 })
      ),
      -1,
      true
    );
  }, [auraScale]);

  const auraAnimada = useAnimatedStyle(() => ({
    transform: [{ scale: auraScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(450)}
      style={StyleSheet.absoluteFill}
    >
      <GradientBackground areaSegura>
        <View style={s.contenedor}>
          {/* Luna animada con aura nocturna */}
          <Animated.View
            entering={FadeInDown.duration(800).springify()}
            style={s.seccionLuna}
          >
            <Animated.View style={[s.auraContenedor, auraAnimada]}>
              <LinearGradient
                colors={['rgba(56, 189, 248, 0.32)', 'rgba(167, 139, 250, 0.22)', 'transparent']}
                style={s.auraGradiente}
              />
            </Animated.View>

            <View style={s.lunaMarco}>
              <LottieView
                source={require('../../assets/animations/tranquilo.json')}
                autoPlay
                loop
                style={s.lottie}
              />
            </View>
          </Animated.View>

          {/* Mensaje de despedida */}
          <Animated.View
            entering={FadeInUp.delay(250).duration(700)}
            style={s.seccionTexto}
          >
            <Text style={s.titulo}>Que tengas dulces sueños</Text>
            <Text style={s.subtitulo}>
              Aquí estarán tus recuerdos cuando regreses.
            </Text>
          </Animated.View>
        </View>
      </GradientBackground>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 36,
  },
  seccionLuna: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraContenedor: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraGradiente: {
    width: '100%',
    height: '100%',
  },
  lunaMarco: {
    width: 176,
    height: 176,
    borderRadius: 88,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  lottie: {
    width: 145,
    height: 145,
  },
  seccionTexto: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 27,
    lineHeight: 35,
    color: colores.tinta,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitulo: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 22,
    color: colores.tintaSuave,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 290,
  },
});
