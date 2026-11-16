import { useCallback } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Plus, Tags } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { DESENFOQUE_EN_LISTAS, colores } from '@/constants/theme';
import { useSimbolos } from '@/hooks/useSimbolos';

export default function ListaSimbolos() {
  const { simbolos, cargando, error, recargar } = useSimbolos();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  return (
    <GradientBackground>
      {error && <Text className="mt-2 px-5 font-medio text-sm text-peligro">{error}</Text>}

      <FlatList
        data={simbolos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        contentContainerStyle={{ gap: 12, padding: 20, paddingBottom: insets.bottom + 100 }}
        ListEmptyComponent={
          !cargando ? (
            <View className="mt-20 items-center px-6">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full border border-borde bg-campo">
                <Tags size={28} color={colores.tintaSuave} />
              </View>
              <Text className="text-center font-cuerpo text-base leading-6 text-tinta-suave">
                Los símbolos son las cosas que se repiten en tus sueños, como el agua o una casa. Crea el primero.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/simbolos/nuevo', params: { id: item.id } })}
            className="active:opacity-80"
          >
            <GlassCard desenfoque={DESENFOQUE_EN_LISTAS} relleno="p-4">
              <Text className="font-fuerte text-lg text-tinta">{item.nombre}</Text>
              {item.significado ? (
                <Text className="mt-1 font-cuerpo text-sm leading-5 text-tinta-suave" numberOfLines={3}>
                  {item.significado}
                </Text>
              ) : null}
            </GlassCard>
          </Pressable>
        )}
      />

      <View className="absolute left-5 right-5" style={{ bottom: insets.bottom + 16 }}>
        <Boton
          texto="Nuevo símbolo"
          onPress={() => router.push('/simbolos/nuevo')}
          icono={<Plus size={20} color={colores.tinta} />}
        />
      </View>
    </GradientBackground>
  );
}