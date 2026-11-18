import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
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

export default function Login() {
  const insets = useSafeAreaInsets();
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function entrar() {
    if (!email.trim() || !password) {
      Alert.alert('Faltan datos', 'Escribe tu correo y tu contraseña.');
      return;
    }
    setEnviando(true);
    try {
      await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');
      await iniciarSesion(email.trim(), password);
    } catch (e) {
      await AsyncStorage.removeItem('@diario_suenos:mostrar_bienvenida');
      Alert.alert('No se pudo iniciar sesión', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <GradientBackground areaSegura>
      <KeyboardAvoidingView
        behavior="padding"
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
          <EmblemaCelestial />

          {/* 2. Título principal en Fraunces */}
          <Text style={s.tituloApp}>
            Diario{'\n'}de sueños
          </Text>

          {/* 3. Frase cálida en Manrope */}
          <Text style={s.subtituloApp}>
            Anota lo que soñaste antes de que se te olvide.
          </Text>

          {/* 4. Tarjeta Liquid Glass del formulario */}
          <GlassCard className="mt-7" relleno="p-5">
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
                placeholder="Tu contraseña"
              />
              <Boton texto="Entrar" onPress={entrar} cargando={enviando} className="mt-1" />
            </View>
          </GlassCard>

          {/* 5. Enlace refinado para crear diario */}
          <Pressable
            onPress={() => router.push('/registro')}
            accessibilityRole="button"
            accessibilityLabel="¿Aún no tienes un diario? Comienza el tuyo"
            hitSlop={8}
            style={({ pressed }) => [
              s.enlaceRegistro,
              pressed && s.enlacePresionado,
            ]}
          >
            <Text style={s.textoRegistroContenedor}>
              <Text style={s.textoRegistroPregunta}>¿Aún no tienes un diario? </Text>
              <Text style={s.textoRegistroAccion}>Comienza el tuyo</Text>
            </Text>
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
    fontSize: 42,
    lineHeight: 48,
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
  enlaceRegistro: {
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  enlacePresionado: {
    opacity: 0.72,
  },
  textoRegistroContenedor: {
    textAlign: 'center',
  },
  textoRegistroPregunta: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14.5,
    color: colores.tintaSuave,
  },
  textoRegistroAccion: {
    fontFamily: fuentes.fuerte,
    fontSize: 14.5,
    color: colores.lavanda,
    letterSpacing: 0.2,
  },
});
