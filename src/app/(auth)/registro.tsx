import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { EmblemaCelestial } from '@/components/EmblemaCelestial';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { mensajeError } from '@/lib/errores';

export default function Registro() {
  const insets = useSafeAreaInsets();
  const { registrar, reenviarCodigo } = useAuth();
  const [paso, setPaso] = useState<'datos' | 'confirmacion'>('datos');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const [mensajeReenvio, setMensajeReenvio] = useState<string | null>(null);

  async function crearCuenta() {
    if (!email.trim() || password.length < 6) {
      Alert.alert(
        'Revisa los datos',
        'Escribe un correo y una contraseña de al menos 6 caracteres.'
      );
      return;
    }
    setEnviando(true);
    setMensajeReenvio(null);
    try {
      const { session } = await registrar(email.trim(), password);
      if (session) {
        await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');
      } else {
        setPaso('confirmacion');
      }
    } catch (e) {
      Alert.alert('No se pudo crear la cuenta', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  async function reenviar() {
    if (reenviando) return;
    setReenviando(true);
    setMensajeReenvio(null);
    try {
      await reenviarCodigo(email.trim());
      setMensajeReenvio('Te enviamos un nuevo enlace a tu correo.');
    } catch (e) {
      Alert.alert('No se pudo reenviar el correo', mensajeError(e));
    } finally {
      setReenviando(false);
    }
  }

  const enConfirmacion = paso === 'confirmacion';

  return (
    <GradientBackground areaSegura>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            s.scrollContenido,
            {
              paddingTop: Math.max(insets.top + 8, 28),
              paddingBottom: Math.max(insets.bottom + 16, 32),
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Emblema celestial proporcionado */}
          <EmblemaCelestial tamano={66} style={s.emblemaContenedor} />

          {/* 2. Título principal en Fraunces */}
          <Text style={s.tituloApp}>
            {enConfirmacion ? 'Revisa tu correo' : 'Crea tu cuenta'}
          </Text>

          {/* 3. Subtítulo en Manrope */}
          <Text style={s.subtituloApp}>
            {enConfirmacion
              ? 'Te enviamos un enlace para confirmar tu cuenta. Ábrelo desde este dispositivo para comenzar a guardar tus sueños.'
              : 'Un espacio para guardar cada sueño que quieras recordar.'}
          </Text>

          {/* 4. Tarjeta Liquid Glass */}
          <GlassCard className="mt-7" relleno="p-5">
            {enConfirmacion ? (
              <View style={s.formularioGap}>
                {/* Indicación clara del correo receptor */}
                <View style={s.correoCaja}>
                  <Text style={s.etiquetaCorreo}>Correo de destino</Text>
                  <Text
                    style={s.textoCorreo}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {email.trim()}
                  </Text>
                </View>

                {/* Notificación visual de reenvío exitoso */}
                {mensajeReenvio ? (
                  <View style={s.mensajeExitoContenedor}>
                    <Text style={s.textoExito}>{mensajeReenvio}</Text>
                  </View>
                ) : null}

                {/* Botón para solicitar nuevo enlace */}
                <Boton
                  texto="Reenviar correo"
                  onPress={reenviar}
                  cargando={reenviando}
                  variante="vidrio"
                />
              </View>
            ) : (
              <View style={s.formularioGap}>
                <Campo
                  etiqueta="Correo"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="tu@correo.com"
                />
                <Campo
                  etiqueta="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  esContrasena
                  placeholder="Mínimo 6 caracteres"
                />
                <Boton
                  texto="Crear cuenta"
                  onPress={crearCuenta}
                  cargando={enviando}
                  className="mt-1"
                />
              </View>
            )}
          </GlassCard>

          {/* 5. Enlace hacia Login o corrección de correo */}
          <Pressable
            onPress={() => {
              if (enConfirmacion) {
                setMensajeReenvio(null);
                setPaso('datos');
              } else {
                router.push('/login');
              }
            }}
            accessibilityRole="button"
            accessibilityLabel={
              enConfirmacion
                ? '¿Correo incorrecto? Cambiar correo'
                : '¿Ya tienes un diario? Inicia sesión'
            }
            hitSlop={8}
            style={({ pressed }) => [
              s.enlaceAccion,
              pressed && s.enlacePresionado,
            ]}
          >
            {enConfirmacion ? (
              <Text style={s.textoEnlaceContenedor}>
                <Text style={s.textoEnlacePregunta}>¿Correo incorrecto? </Text>
                <Text style={s.textoEnlaceAccion}>Cambiar correo</Text>
              </Text>
            ) : (
              <Text style={s.textoEnlaceContenedor}>
                <Text style={s.textoEnlacePregunta}>¿Ya tienes un diario? </Text>
                <Text style={s.textoEnlaceAccion}>Inicia sesión</Text>
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  scrollContenido: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emblemaContenedor: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  tituloApp: {
    fontFamily: fuentes.titulo,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.5,
    color: colores.tinta,
  },
  subtituloApp: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 22,
    color: colores.tintaSuave,
    marginTop: 8,
    maxWidth: 320,
  },
  formularioGap: {
    gap: 16,
  },
  correoCaja: {
    backgroundColor: colores.campo,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.bordeSutil,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  etiquetaCorreo: {
    fontFamily: fuentes.medio,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colores.tintaTenue,
    marginBottom: 4,
  },
  textoCorreo: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    color: colores.celeste,
  },
  mensajeExitoContenedor: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  textoExito: {
    fontFamily: fuentes.medio,
    fontSize: 13.5,
    color: colores.celeste,
    textAlign: 'center',
  },
  enlaceAccion: {
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  enlacePresionado: {
    opacity: 0.72,
  },
  textoEnlaceContenedor: {
    textAlign: 'center',
  },
  textoEnlacePregunta: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14.5,
    color: colores.tintaSuave,
  },
  textoEnlaceAccion: {
    fontFamily: fuentes.fuerte,
    fontSize: 14.5,
    color: colores.lavanda,
    letterSpacing: 0.2,
  },
});
