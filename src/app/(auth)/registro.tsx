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
  const { registrar, verificarCodigo, reenviarCodigo } = useAuth();
  const [paso, setPaso] = useState<'datos' | 'codigo'>('datos');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codigo, setCodigo] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function crearCuenta() {
    if (!email.trim() || password.length < 6) {
      Alert.alert('Revisa los datos', 'Escribe un correo y una contraseña de al menos 6 caracteres.');
      return;
    }
    setEnviando(true);
    try {
      const { session } = await registrar(email.trim(), password);
      if (session) {
        await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');
      } else {
        setPaso('codigo');
      }
    } catch (e) {
      Alert.alert('No se pudo crear la cuenta', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  async function confirmar() {
    if (codigo.trim().length < 6) {
      Alert.alert('Código incompleto', 'Escribe el código que llegó a tu correo.');
      return;
    }
    setEnviando(true);
    try {
      await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');
      await verificarCodigo(email.trim(), codigo.trim());
    } catch (e) {
      await AsyncStorage.removeItem('@diario_suenos:mostrar_bienvenida');
      Alert.alert('Código incorrecto o vencido', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  async function reenviar() {
    try {
      await reenviarCodigo(email.trim());
      Alert.alert('Código enviado', 'Te enviamos un código nuevo.');
    } catch (e) {
      Alert.alert('No se pudo reenviar', mensajeError(e));
    }
  }

  const enCodigo = paso === 'codigo';

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
            {enCodigo ? 'Revisa tu correo' : 'Crea tu cuenta'}
          </Text>

          {/* 3. Subtítulo cálido en Manrope */}
          <Text style={s.subtituloApp}>
            {enCodigo
              ? `Enviamos un código a ${email.trim()}. Escríbelo para activar tu cuenta.`
              : 'Un espacio para guardar cada sueño que quieras recordar.'}
          </Text>

          {/* 4. Tarjeta Liquid Glass con campos */}
          <GlassCard className="mt-7" relleno="p-5">
            {enCodigo ? (
              <View style={s.formularioGap}>
                <Campo
                  etiqueta="Código de verificación"
                  value={codigo}
                  onChangeText={setCodigo}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholder="123456"
                />
                <Boton
                  texto="Confirmar cuenta"
                  onPress={confirmar}
                  cargando={enviando}
                  className="mt-1"
                />
                <Boton
                  texto="Reenviar código"
                  onPress={reenviar}
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

          {/* 5. Enlace refinado hacia Login o cambio de correo */}
          <Pressable
            onPress={() => (enCodigo ? setPaso('datos') : router.push('/login'))}
            accessibilityRole="button"
            accessibilityLabel={
              enCodigo
                ? '¿Correo incorrecto? Cambiar correo'
                : '¿Ya tienes un diario? Inicia sesión'
            }
            hitSlop={8}
            style={({ pressed }) => [
              s.enlaceAccion,
              pressed && s.enlacePresionado,
            ]}
          >
            {enCodigo ? (
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