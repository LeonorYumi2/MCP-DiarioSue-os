import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SuenoForm } from '@/components/SuenoForm';
import { useSuenos } from '@/hooks/useSuenos';
import { mensajeError } from '@/lib/errores';
import type { Sueno } from '@/types';

export default function EditarSueno() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obtener, actualizar, borrar, listarSimbolosDeSueno, guardarSimbolos } = useSuenos();
  const [sueno, setSueno] = useState<Sueno | null>(null);
  const [seleccion, setSeleccion] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([obtener(id), listarSimbolosDeSueno(id)])
      .then(([datos, ids]) => {
        setSueno(datos);
        setSeleccion(ids);
      })
      .catch((e) => setError(mensajeError(e, 'No se pudo cargar el sueño.')));
  }, [id, obtener, listarSimbolosDeSueno]);

  function confirmarBorrado() {
    Alert.alert('Eliminar sueño', '¿Seguro? Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await borrar(id);
            router.back();
          } catch (e) {
            Alert.alert('Error', mensajeError(e, 'No se pudo eliminar.'));
          }
        },
      },
    ]);
  }

  if (error) return <Text style={s.error}>{error}</Text>;
  if (!sueno || !seleccion) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <SuenoForm
      inicial={sueno}
      simbolosIniciales={seleccion}
      textoBoton="Guardar cambios"
      onGuardar={async (datos, simboloIds) => {
        await actualizar(id, datos);
        await guardarSimbolos(id, simboloIds);
        router.back();
      }}
    >
      <Pressable style={s.eliminar} onPress={confirmarBorrado}>
        <Text style={s.eliminarTexto}>Eliminar sueño</Text>
      </Pressable>
    </SuenoForm>
  );
}

const s = StyleSheet.create({
  error: { color: '#DC2626', padding: 20 },
  eliminar: { borderWidth: 1, borderColor: '#DC2626', borderRadius: 10, padding: 14, alignItems: 'center' },
  eliminarTexto: { color: '#DC2626', fontWeight: '600' },
});