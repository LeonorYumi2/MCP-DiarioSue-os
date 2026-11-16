import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores } from '@/constants/theme';
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
    Alert.alert('Eliminar símbolo', 'Se quitará también de los sueños que lo usan.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await borrar(id!);
            router.back();
          } catch (e) {
            Alert.alert('No se pudo eliminar', mensajeError(e));
          }
        },
      },
    ]);
  }

  return (
    <GradientBackground>
      <Stack.Screen options={{ title: editando ? 'Editar símbolo' : 'Nuevo símbolo' }} />

      {!listo ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colores.tinta} />
        </View>
      ) : (
        <ScrollView
  contentContainerStyle={{ gap: 16, padding: 20, paddingBottom: 48 }}
  keyboardShouldPersistTaps="handled"
>
          <GlassCard relleno="p-5">
            <View className="gap-4">
              <Campo etiqueta="Nombre" value={nombre} onChangeText={setNombre} placeholder="Ej. Agua" />
              <Campo
                etiqueta="Significado"
                value={significado}
                onChangeText={setSignificado}
                multilinea
                placeholder="¿Qué representa para ti?"
              />
            </View>
          </GlassCard>

          {error && <Text className="font-medio text-sm text-peligro">{error}</Text>}

          <Boton texto={editando ? 'Guardar cambios' : 'Guardar símbolo'} onPress={guardar} cargando={guardando} />

          {editando && <Boton texto="Eliminar símbolo" onPress={confirmarBorrado} variante="peligro" />}
        </ScrollView>
      )}
    </GradientBackground>
  );
}