import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function entrar() {
    if (!email.trim() || !password) {
      Alert.alert('Faltan datos', 'Escribe tu correo y contraseña.');
      return;
    }
    setEnviando(true);
    try {
      await iniciarSesion(email.trim(), password);
    } catch (e) {
      Alert.alert('No se pudo iniciar sesión', e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={s.contenedor}>
      <Text style={s.titulo}>Diario de sueños</Text>
      <TextInput style={s.input} placeholder="Correo" autoCapitalize="none"
        keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={s.input} placeholder="Contraseña" secureTextEntry
        value={password} onChangeText={setPassword} />
      <Pressable style={s.boton} onPress={entrar} disabled={enviando}>
        {enviando ? <ActivityIndicator /> : <Text style={s.botonTexto}>Entrar</Text>}
      </Pressable>
      <Link href="/registro" style={s.enlace}>¿No tienes cuenta? Regístrate</Link>
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