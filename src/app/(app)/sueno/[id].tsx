import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { Boton } from '@/components/Boton';
import { GradientBackground } from '@/components/GradientBackground';
import { ModalConfirmacion } from '@/components/ModalConfirmacion';
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
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    Promise.all([obtener(id), listarSimbolosDeSueno(id)])
      .then(([datos, ids]) => {
        setSueno(datos);
        setSeleccion(ids);
      })
      .catch((e) => setError(mensajeError(e, 'No se pudo cargar el sueño.')));
  }, [id, obtener, listarSimbolosDeSueno]);

  async function ejecutarBorrado() {
    setEliminando(true);
    try {
      await borrar(id);
      setModalEliminarVisible(false);
      router.back();
    } catch (e) {
      setEliminando(false);
      Alert.alert('No se pudo eliminar', mensajeError(e));
    }
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
        }}
      >
        <Boton
          texto="Eliminar sueño"
          onPress={() => setModalEliminarVisible(true)}
          variante="peligro"
        />
      </SuenoForm>

      <ModalConfirmacion
        visible={modalEliminarVisible}
        titulo="¿Eliminar este sueño?"
        descripcion="Esta acción no se puede deshacer."
        textoCancelar="Conservar sueño"
        textoConfirmar="Eliminar sueño"
        onCancelar={() => {
          if (!eliminando) setModalEliminarVisible(false);
        }}
        onConfirmar={ejecutarBorrado}
        cargando={eliminando}
        variante="peligro"
        icono={<Trash2 size={24} color={colores.error} />}
      />
    </GradientBackground>
  );
}