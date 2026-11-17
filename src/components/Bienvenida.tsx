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
import { Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';

type Props = {
  nombreUsuario?: string | null;
  onEntrar: () => void;
};

export function Bienvenida({ nombreUsuario, onEntrar }: Props) {
  const insets = useSafeAreaInsets();
  const auraScale = useSharedValue(1);

  useEffect(() => {
    auraScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 3200 }),
        withTiming(1, { duration: 3200 })
      ),
      -1,
      true
    );
  }, [auraScale]);

  const auraAnimada = useAnimatedStyle(() => ({
    transform: [{ scale: auraScale.value }],
  }));

  // Limpiar y capitalizar nombre para saludo personalizado
  const nombreLimpio = nombreUsuario
    ? nombreUsuario.trim().split(' ')[0]
    : null;
  const saludo = nombreLimpio
    ? `Hola, ${nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1)}`
    : 'Buenas noches';

  return (
    <GradientBackground areaSegura>
      <View
        style={[
          s.contenedor,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 32,
          },
        ]}
      >
        {/* Sección superior: Luna animada y resplandor místico */}
        <Animated.View
          entering={FadeInDown.duration(900).springify()}
          style={s.seccionLuna}
        >
          {/* Aura luminosa palpitante detrás de la luna */}
          <Animated.View style={[s.auraContenedor, auraAnimada]}>
            <LinearGradient
              colors={['rgba(56, 189, 248, 0.35)', 'rgba(167, 139, 250, 0.25)', 'transparent']}
              style={s.auraGradiente}
            />
          </Animated.View>

          {/* Luna animada con Lottie */}
          <View style={s.lunaMarco}>
            <LottieView
              source={require('../../assets/animations/tranquilo.json')}
              autoPlay
              loop
              style={s.lottie}
            />
          </View>
        </Animated.View>

        {/* Sección central: Saludo y mensaje poético */}
        <Animated.View
          entering={FadeIn.delay(350).duration(800)}
          style={s.seccionTexto}
        >
          <Text style={s.saludoTexto}>{saludo}</Text>

          <Text style={s.frasePrincipal}>
            «Este es tu pequeño espacio para guardar lo que sueñas»
          </Text>

          <Text style={s.fraseSecundaria}>
            Donde cada visión, emoción y símbolo nocturno encuentra su lugar en calma.
          </Text>
        </Animated.View>

        {/* Sección inferior: Tarjeta y botón de entrada */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(800).springify()}
          style={s.seccionBoton}
        >
          <GlassCard relleno="p-2" className="mb-2">
            <Boton
              texto="Entrar al diario"
              onPress={onEntrar}
              icono={<Sparkles size={20} color={colores.tinta} />}
            />
          </GlassCard>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  seccionLuna: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  auraContenedor: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraGradiente: {
    width: '100%',
    height: '100%',
  },
  lunaMarco: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  lottie: {
    width: 140,
    height: 140,
  },
  seccionTexto: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  saludoTexto: {
    fontFamily: fuentes.medio,
    fontSize: 16,
    color: colores.celeste,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  frasePrincipal: {
    fontFamily: fuentes.titulo,
    fontSize: 28,
    lineHeight: 38,
    color: colores.tinta,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  fraseSecundaria: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 23,
    color: colores.tintaSuave,
    textAlign: 'center',
    marginTop: 14,
    maxWidth: 320,
  },
  seccionBoton: {
    width: '100%',
  },
});
