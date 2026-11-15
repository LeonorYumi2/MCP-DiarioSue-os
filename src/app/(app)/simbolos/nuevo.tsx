import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSimbolos } from '@/hooks/useSimbolos';
import { mensajeError } from '@/lib/errores';

export default function FormularioSimbolo() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editando = !!id;
  const { obtener, crear, actualizar, borrar } = useSimbolos();

  const [nombre, setNombre] = useState('');
  const [significado, setSignificado] = useState('');
  const [listo, setListo] = useState(!id);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    obtener(id)
      .then((s) => {
        setNombre(s.nombre);
        setSignificado(s.significado ?? '');
      })
      .catch((e) => setError(mensajeError(e, 'No se pudo cargar el símbolo.')))
      .finally(() => setListo(true));
  }, [id, obtener]);

  async function guardar() {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    setGuardando(true);
    setError(null);
    const datos = { nombre: nombre.trim(), significado: significado.trim() || null };
    try {
      if (editando) await actualizar(id!, datos);
      else await crear(datos);
      router.back();
    } catch (e) {
      setError(mensajeError(e, 'No se pudo guardar.'));
    } finally {
      setGuardando(false);
    }
  }

  function confirmarBorrado() {
    Alert.alert('Eliminar símbolo', 'Se quitará también de los sueños que lo usan. ¿Continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await borrar(id!);
            router.back();
          } catch (e) {
            Alert.alert('Error', mensajeError(e, 'No se pudo eliminar.'));
          }
        },
      },
    ]);
  }

  if (!listo) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <ScrollView contentContainerStyle={s.contenedor} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: editando ? 'Editar símbolo' : 'Nuevo símbolo' }} />

      <Text style={s.label}>Nombre</Text>
      <TextInput style={s.input} value={nombre} onChangeText={setNombre} placeholder="Ej. Agua" />

      <Text style={s.label}>Significado</Text>
      <TextInput style={[s.input, s.multilinea]} value={significado} onChangeText={setSignificado}
        placeholder="¿Qué representa para ti?" multiline />

      {error && <Text style={s.error}>{error}</Text>}

      <Pressable style={s.boton} onPress={guardar} disabled={guardando}>
        {guardando
          ? <ActivityIndicator color="#fff" />
          : <Text style={s.botonTexto}>{editando ? 'Guardar cambios' : 'Guardar símbolo'}</Text>}
      </Pressable>

      {editando && (
        <Pressable style={s.eliminar} onPress={confirmarBorrado}>
          <Text style={s.eliminarTexto}>Eliminar símbolo</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  contenedor: { padding: 20, gap: 10 },
  label: { fontWeight: '600', marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 10, padding: 12 },
  multilinea: { minHeight: 100, textAlignVertical: 'top' },
  error: { color: '#DC2626' },
  boton: { backgroundColor: '#8B5CF6', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 12 },
  botonTexto: { color: '#fff', fontWeight: '600' },
  eliminar: { borderWidth: 1, borderColor: '#DC2626', borderRadius: 10, padding: 14, alignItems: 'center' },
  eliminarTexto: { color: '#DC2626', fontWeight: '600' },
});