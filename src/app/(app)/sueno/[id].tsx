import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { GradientBackground } from '@/components/GradientBackground';
import { SuenoForm } from '@/components/SuenoForm';
import { colores } from '@/constants/theme';
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
    Alert.alert('Eliminar sueño', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await borrar(id);
            router.back();
          } catch (e) {
            Alert.alert('No se pudo eliminar', mensajeError(e));
          }
        },
      },
    ]);
  }

  if (error || !sueno || !seleccion) {
    return (
      <GradientBackground>
        <View className="flex-1 items-center justify-center px-6">
          {error ? (
            <Text className="text-center font-medio text-base text-peligro">{error}</Text>
          ) : (
            <ActivityIndicator color={colores.tinta} />
          )}
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
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
        <Boton texto="Eliminar sueño" onPress={confirmarBorrado} variante="peligro" />
      </SuenoForm>
    </GradientBackground>
  );
}