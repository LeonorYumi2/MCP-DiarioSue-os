/* eslint-disable react-hooks/immutability */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { BookOpen, Moon, Plus, Power, Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bienvenida } from '@/components/Bienvenida';
import { Despedida } from '@/components/Despedida';
import { GradientBackground } from '@/components/GradientBackground';
import { ModalConfirmacion } from '@/components/ModalConfirmacion';
import { SuenoCard } from '@/components/SuenoCard';
import { colores, fuentes } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { useSuenos } from '@/hooks/useSuenos';
import { mensajeError } from '@/lib/errores';
import type { SuenoConSimbolos } from '@/types';

function BotonAccion({
  onPress,
  etiqueta,
  children,
}: {
  onPress: () => void;
  etiqueta: string;
  children: ReactNode;
}) {
  const scale = useSharedValue(1);

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={estiloAnimado}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withTiming(0.92, { duration: 80 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 14, stiffness: 220 }))}
        accessibilityRole="button"
        accessibilityLabel={etiqueta}
        style={s.botonAccion}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

function BotonFlotante({ onPress }: { onPress: () => void }) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        s.flotanteContenedor,
        { bottom: Math.max(insets.bottom, 16) + 12 },
        estiloAnimado,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withTiming(0.94, { duration: 90 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 15, stiffness: 220 }))}
        accessibilityRole="button"
        accessibilityLabel="Registrar un nuevo sueño"
        style={s.flotantePressable}
      >
        <LinearGradient
          colors={[colores.acento, colores.acentoFin]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.flotanteGradiente}
        >
          <Plus size={20} color={colores.tinta} strokeWidth={2.4} />
          <Text style={s.flotanteTexto}>Nuevo sueño</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export default function Inicio() {
  const { session, cerrarSesion } = useAuth();
  const { suenos, cargando, error, recargar } = useSuenos();
  const insets = useSafeAreaInsets();
  const [mostrarBienvenida, setMostrarBienvenida] = useState(false);
  const [modalSalirVisible, setModalSalirVisible] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const [mostrarDespedida, setMostrarDespedida] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@diario_suenos:mostrar_bienvenida')
      .then((val) => {
        if (val === 'true') {
          setMostrarBienvenida(true);
        }
      })
      .catch(() => {});
  }, []);

  async function despedirBienvenida() {
    try {
      await AsyncStorage.removeItem('@diario_suenos:mostrar_bienvenida');
    } catch {
      // ignore
    }
    setMostrarBienvenida(false);
  }

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  async function ejecutarCierreSesion() {
    setModalSalirVisible(false);
    setMostrarDespedida(true);
    setSaliendo(true);
    try {
      // Permitir que la animación de despedida se disfrute por ~1.8 segundos
      await new Promise((resolve) => setTimeout(resolve, 1800));
      await cerrarSesion();
    } catch (e) {
      setMostrarDespedida(false);
      setSaliendo(false);
      Alert.alert('No se pudo cerrar sesión', mensajeError(e));
    }
  }

  // Extracción de nombre de usuario para el saludo discreto
  const nombreUsuario =
    session?.user?.user_metadata?.nombre ??
    session?.user?.user_metadata?.name ??
    session?.user?.email?.split('@')[0];
  const nombreLimpio = nombreUsuario
    ? nombreUsuario.trim().split(' ')[0]
    : null;
  const saludo = nombreLimpio
    ? `Hola, ${nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1)}`
    : 'Buenas noches';

  return (
    <GradientBackground areaSegura>
      {/* Encabezado elegante del diario */}
      <View style={[s.cabecera, { paddingTop: insets.top > 0 ? 8 : 16 }]}>
        <View style={s.cabeceraInfo}>
          <Text style={s.cabeceraSaludo}>{saludo}</Text>
          <Text style={s.cabeceraTitulo}>Diario de sueños</Text>
          <Text style={s.cabeceraFrase}>
            Cada sueño es una ventana a tu mundo interior.
          </Text>
        </View>

        {/* Botones de acción superior */}
        <View style={s.cabeceraBotones}>
          <BotonAccion etiqueta="Glosario de símbolos" onPress={() => router.push('/simbolos')}>
            <BookOpen size={21} color={colores.tinta} strokeWidth={2.2} />
          </BotonAccion>

          <BotonAccion etiqueta="Cerrar sesión" onPress={() => setModalSalirVisible(true)}>
            <Power size={21} color={colores.tinta} strokeWidth={2.2} />
          </BotonAccion>
        </View>
      </View>

      {/* Contador de sueños sutil */}
      {!cargando && suenos.length > 0 && (
        <View style={s.contadorFila}>
          <View style={s.contadorBadge}>
            <Sparkles size={13} color={colores.celeste} />
            <Text style={s.contadorTexto}>
              {suenos.length === 1 ? '1 sueño registrado' : `${suenos.length} sueños registrados`}
            </Text>
          </View>
        </View>
      )}

      {/* Mensaje de error si la carga falla */}
      {error && <Text style={s.errorTexto}>{error}</Text>}

      {/* Listado de tarjetas de sueños */}
      <FlatList<SuenoConSimbolos>
        data={suenos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        contentContainerStyle={[
          s.listaContenido,
          { paddingBottom: insets.bottom + 110 },
        ]}
        ListEmptyComponent={
          !cargando && !error ? (
            <View style={s.vacioContenedor}>
              <View style={s.vacioAura}>
                <LottieView
                  source={require('../../../assets/animations/tranquilo.json')}
                  autoPlay
                  loop
                  style={s.vacioLottie}
                />
              </View>

              <Text style={s.vacioTitulo}>
                «Aquí comenzará tu universo de sueños»
              </Text>

              <Text style={s.vacioDescripcion}>
                Anota lo que viviste antes de que se desvanezca en la vigilia. Cada detalle guarda un mensaje para ti.
              </Text>

              <Pressable
                onPress={() => router.push('/sueno/nuevo')}
                accessibilityRole="button"
                accessibilityLabel="Registrar mi primer sueño"
                style={s.vacioBoton}
              >
                <LinearGradient
                  colors={[colores.acento, colores.acentoFin]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={s.vacioBotonGradiente}
                >
                  <Plus size={18} color={colores.tinta} strokeWidth={2.4} />
                  <Text style={s.vacioBotonTexto}>Registrar mi primer sueño</Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => (
          <SuenoCard
            sueno={item}
            index={index}
            onPress={() =>
              router.push({
                pathname: '/sueno/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
      />

      {/* Botón flotante para registrar nuevo sueño */}
      {suenos.length > 0 && (
        <BotonFlotante onPress={() => router.push('/sueno/nuevo')} />
      )}

      {/* Experiencia de bienvenida (overlay inicial de consumo único) */}
      {mostrarBienvenida && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(500)}
          style={StyleSheet.absoluteFill}
        >
          <Bienvenida
            nombreUsuario={nombreUsuario}
            onEntrar={despedirBienvenida}
          />
        </Animated.View>
      )}

      {/* Modal de confirmación para cerrar sesión */}
      <ModalConfirmacion
        visible={modalSalirVisible}
        titulo="¿Es hora de descansar?"
        descripcion="Tus sueños están guardados. Puedes regresar cuando quieras."
        textoCancelar="Seguir soñando"
        textoConfirmar="Cerrar sesión"
        onCancelar={() => setModalSalirVisible(false)}
        onConfirmar={ejecutarCierreSesion}
        cargando={saliendo}
        variante="primario"
        icono={<Moon size={24} color={colores.celeste} />}
      />

      {/* Experiencia de despedida animada */}
      {mostrarDespedida && <Despedida />}
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  cabecera: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 6,
    gap: 12,
  },
  cabeceraInfo: {
    flex: 1,
  },
  cabeceraSaludo: {
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.celeste,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  cabeceraTitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 32,
    lineHeight: 38,
    color: colores.tinta,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  cabeceraFrase: {
    fontFamily: fuentes.cuerpo,
    fontSize: 13,
    lineHeight: 18,
    color: colores.tintaSuave,
    marginTop: 3,
  },
  cabeceraBotones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  botonAccion: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.28)',
    backgroundColor: 'rgba(22, 16, 48, 0.72)',
  },
  contadorFila: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  contadorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(56, 189, 248, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
  },
  contadorTexto: {
    fontFamily: fuentes.medio,
    fontSize: 12,
    color: colores.celeste,
  },
  errorTexto: {
    marginHorizontal: 20,
    marginTop: 8,
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.error,
  },
  listaContenido: {
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  vacioContenedor: {
    marginTop: 48,
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  vacioAura: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 20,
  },
  vacioLottie: {
    width: 110,
    height: 110,
  },
  vacioTitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 24,
    lineHeight: 32,
    color: colores.tinta,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  vacioDescripcion: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14,
    lineHeight: 21,
    color: colores.tintaSuave,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 300,
  },
  vacioBoton: {
    marginTop: 26,
    borderRadius: 18,
    overflow: 'hidden',
  },
  vacioBotonGradiente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  vacioBotonTexto: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    color: colores.tinta,
  },
  flotanteContenedor: {
    position: 'absolute',
    alignSelf: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  flotantePressable: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.32)',
  },
  flotanteGradiente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  flotanteTexto: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    color: colores.tinta,
    letterSpacing: 0.2,
  },
});
