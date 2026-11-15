import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Registro() {
  const { registrar } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function crearCuenta() {
    if (!email.trim() || password.length < 6) {
      Alert.alert('Revisa los datos', 'Escribe un correo y una contraseña de al menos 6 caracteres.');
      return;
    }
    setEnviando(true);
    try {
      const { session } = await registrar(email.trim(), password);
      if (!session) {
        Alert.alert('Cuenta creada', 'Revisa tu correo para confirmar la cuenta y luego inicia sesión.');
      }
    } catch (e) {
      Alert.alert('No se pudo crear la cuenta', e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={s.contenedor}>
      <Text style={s.titulo}>Crear cuenta</Text>
      <TextInput style={s.input} placeholder="Correo" autoCapitalize="none"
        keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={s.input} placeholder="Contraseña (mín. 6)" secureTextEntry
        value={password} onChangeText={setPassword} />
      <Pressable style={s.boton} onPress={crearCuenta} disabled={enviando}>
        {enviando ? <ActivityIndicator /> : <Text style={s.botonTexto}>Registrarme</Text>}
      </Pressable>
      <Link href="/login" style={s.enlace}>¿Ya tienes cuenta? Inicia sesión</Link>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  titulo: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 10, padding: 12 },
  boton: { backgroundColor: '#8B5CF6', borderRadius: 10, padding: 14, alignItems: 'center' },
  botonTexto: { color: '#fff', fontWeight: '600' },
  enlace: { textAlign: 'center', marginTop: 8 },
});