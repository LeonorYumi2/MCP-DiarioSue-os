import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { EmblemaCelestial } from '@/components/EmblemaCelestial';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';
import { mensajeError } from '@/lib/errores';
import { intercambiarCodigoPorSesion } from '@/services/auth';

export default function ConfirmacionCorreo() {
  const { code, error, error_description } = useLocalSearchParams<{
    code?: string;
    error?: string;
    error_description?: string;
  }>();

  // Detección directa de errores presentes en los parámetros de la URL sin provocar renders en cascada
  const errorParametros = error || error_description
    ? (error_description || error || 'El enlace de confirmación no es válido o ha caducado.')
    : !code
    ? 'No se encontró un código de confirmación válido en el enlace.'
    : null;

  const [errorAsincrono, setErrorAsincrono] = useState<string | null>(null);
  const codigoEnCursoRef = useRef<string | null>(null);
  const montadoRef = useRef(true);

  useEffect(() => {
    montadoRef.current = true;
    return () => {
      montadoRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Si ya existe un error en los parámetros o no hay código, no se procesa
    if (errorParametros || !code) {
      codigoEnCursoRef.current = null;
      return;
    }

    // Evitar procesar simultáneamente o duplicar el canje del mismo código
    if (codigoEnCursoRef.current === code) {
      return;
    }

    codigoEnCursoRef.current = code;

    // Limpiar errores previos para mostrar inmediatamente el estado de carga
    setErrorAsincrono(null);

    const codigoActual = code;

    async function procesar() {
      try {
        // Guardar el indicador de bienvenida antes de que la sesión se establezca
        await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');

        // Canjear el código de autorización PKCE por la sesión autenticada
        await intercambiarCodigoPorSesion(codigoActual);

        // Al resolverse el intercambio, Supabase emite SIGNED_IN y el AuthProvider
        // actualiza session. Stack.Protected en _layout.tsx conmuta automáticamente a (app).
      } catch (err) {
        await AsyncStorage.removeItem('@diario_suenos:mostrar_bienvenida');

        // Solo actualizar estado si el componente sigue montado y no se ha cambiado de código
        if (montadoRef.current && codigoEnCursoRef.current === codigoActual) {
          setErrorAsincrono(
            mensajeError(
              err,
              'No se pudo confirmar tu cuenta. Es posible que el enlace haya expirado o ya haya sido utilizado.'
            )
          );
          codigoEnCursoRef.current = null;
        }
      }
    }

    void procesar();
  }, [code, errorParametros]);

  const mensajeErrorVisible = errorParametros || errorAsincrono;
  const enProceso = !mensajeErrorVisible;

  return (
    <GradientBackground areaSegura>
      <View style={s.contenedor}>
        {/* Emblema celestial identitario */}
        <EmblemaCelestial tamano={70} style={s.emblema} />

        {enProceso ? (
          <>
            <Text style={s.titulo}>Confirmando tu cuenta</Text>
            <Text style={s.subtitulo}>
              Estamos preparando tu espacio para guardar lo que sueñas…
            </Text>

            <GlassCard relleno="p-6" className="mt-8 w-full">
              <View style={s.tarjetaCentro}>
                <ActivityIndicator size="large" color={colores.celeste} />
                <Text style={s.textoEspera}>Solo tomará un instante</Text>
              </View>
            </GlassCard>
          </>
        ) : (
          <>
            <Text style={s.titulo}>Enlace no disponible</Text>
            <Text style={s.subtitulo}>
              No pudimos activar tu cuenta con este enlace de confirmación.
            </Text>

            <GlassCard relleno="p-6" className="mt-8 w-full">
              <View style={s.tarjetaCentro}>
                <Text style={s.textoError}>{mensajeErrorVisible}</Text>

                <Boton
                  texto="Ir al inicio de sesión"
                  onPress={() => router.replace('/login')}
                  className="mt-6 w-full"
                />
              </View>
            </GlassCard>
          </>
        )}
      </View>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emblema: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.4,
    color: colores.tinta,
  },
  subtitulo: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 22,
    color: colores.tintaSuave,
    marginTop: 8,
    maxWidth: 320,
  },
  tarjetaCentro: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  textoEspera: {
    fontFamily: fuentes.medio,
    fontSize: 14,
    color: colores.tintaSuave,
    marginTop: 18,
    letterSpacing: 0.2,
  },
  textoError: {
    fontFamily: fuentes.medio,
    fontSize: 14,
    lineHeight: 21,
    color: colores.error,
    textAlign: 'center',
  },
});
