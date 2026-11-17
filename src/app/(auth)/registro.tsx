import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { MailCheck, UserPlus } from 'lucide-react-native';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { mensajeError } from '@/lib/errores';

export default function Registro() {
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
  const Icono = enCodigo ? MailCheck : UserPlus;

  return (
    <GradientBackground areaSegura>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-5 h-14 w-14 items-center justify-center rounded-2xl border border-borde bg-campo">
            <Icono size={26} color={colores.tinta} />
          </View>

          <Text className="font-titulo text-4xl leading-10 tracking-tight text-tinta">
            {enCodigo ? 'Revisa tu correo' : 'Crea tu cuenta'}
          </Text>
          <Text className="mt-3 font-cuerpo text-base leading-6 text-tinta-suave">
            {enCodigo
              ? `Enviamos un código a ${email.trim()}. Escríbelo para activar tu cuenta.`
              : 'Guarda tus sueños en un lugar privado, solo tuyo.'}
          </Text>

          <GlassCard className="mt-8" relleno="p-5">
            {enCodigo ? (
              <View className="gap-4">
                <Campo
                  etiqueta="Código de verificación"
                  value={codigo}
                  onChangeText={setCodigo}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholder="Código"
                />
                <Boton texto="Confirmar cuenta" onPress={confirmar} cargando={enviando} className="mt-1" />
                <Boton texto="Reenviar código" onPress={reenviar} variante="vidrio" />
              </View>
            ) : (
              <View className="gap-4">
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
                <Boton texto="Crear cuenta" onPress={crearCuenta} cargando={enviando} className="mt-1" />
              </View>
            )}
          </GlassCard>

          <Pressable
            onPress={() => (enCodigo ? setPaso('datos') : router.push('/login'))}
            className="mt-6 items-center py-2 active:opacity-70"
          >
            <Text className="font-medio text-base text-tinta">
              {enCodigo ? 'Cambiar correo' : '¿Ya tienes cuenta? Inicia sesión'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}