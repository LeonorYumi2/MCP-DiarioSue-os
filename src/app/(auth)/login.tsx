import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Moon } from 'lucide-react-native';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { mensajeError } from '@/lib/errores';

export default function Login() {
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
      await iniciarSesion(email.trim(), password);
    } catch (e) {
      Alert.alert('No se pudo iniciar sesión', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <GradientBackground areaSegura>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">
        <View className="mb-5 h-14 w-14 items-center justify-center rounded-2xl border border-borde bg-campo">
          <Moon size={26} color={colores.tinta} />
        </View>

        <Text className="font-titulo text-5xl leading-13 tracking-tight text-tinta">
          Diario{'\n'}de sueños
        </Text>
        <Text className="mt-3 font-cuerpo text-base leading-6 text-tinta-suave">
          Anota lo que soñaste antes de que se te olvide.
        </Text>

        <GlassCard className="mt-8" relleno="p-5">
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
              placeholder="Tu contraseña"
            />
            <Boton texto="Entrar" onPress={entrar} cargando={enviando} className="mt-1" />
          </View>
        </GlassCard>

        <Pressable onPress={() => router.push('/registro')} className="mt-6 items-center py-2 active:opacity-70">
          <Text className="font-medio text-base text-tinta">¿Primera vez? Crea tu cuenta</Text>
        </Pressable>
      </ScrollView>
    </GradientBackground>
  );
}