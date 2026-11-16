import { useCallback, type ReactNode } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LogOut, Moon, Plus, Tags } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { DESENFOQUE_EN_LISTAS, colorDeEstado, colores } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { useSuenos } from '@/hooks/useSuenos';

function formatearFecha(fecha?: string | null) {
  if (!fecha) return '';
  return new Date(`${fecha}T00:00:00`).toLocaleDateString('es-EC', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function Intensidad({ valor, color }: { valor: number | null; color: string }) {
  return (
    <View className="flex-row gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <View
          key={n}
          className={`h-2 w-2 rounded-full ${n <= (valor ?? 0) ? '' : 'bg-white/20'}`}
          style={n <= (valor ?? 0) ? { backgroundColor: color } : undefined}
        />
      ))}
    </View>
  );
}

function BotonIcono({ onPress, etiqueta, children }: { onPress: () => void; etiqueta: string; children: ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={etiqueta}
      className="h-11 w-11 items-center justify-center rounded-full border border-borde bg-campo active:opacity-70"
    >
      {children}
    </Pressable>
  );
}

export default function Inicio() {
  const { cerrarSesion } = useAuth();
  const { suenos, cargando, error, recargar } = useSuenos();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  return (
    <GradientBackground areaSegura>
      <View className="flex-row items-center gap-2 px-5 pt-3">
        <View className="flex-1">
          <Text className="font-titulo text-4xl tracking-tight text-tinta">Tus sueños</Text>
          <Text className="mt-0.5 font-cuerpo text-sm text-tinta-suave">
            {suenos.length === 1 ? '1 sueño anotado' : `${suenos.length} sueños anotados`}
          </Text>
        </View>
        <BotonIcono etiqueta="Símbolos" onPress={() => router.push('/simbolos')}>
          <Tags size={20} color={colores.tinta} />
        </BotonIcono>
        <BotonIcono etiqueta="Cerrar sesión" onPress={() =>
            Alert.alert(
              'Cerrar sesión',
              '¿Seguro que quieres salir? Tus sueños seguirán guardados.',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Salir', style: 'destructive', onPress: () => cerrarSesion() },
              ]
            )
          }>
          <LogOut size={20} color={colores.tinta} />
        </BotonIcono>
      </View>

      {error && <Text className="mt-2 px-5 font-medio text-sm text-peligro">{error}</Text>}

      <FlatList
        data={suenos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        contentContainerStyle={{ gap: 14, padding: 20, paddingBottom: insets.bottom + 100 }}
        ListEmptyComponent={
          !cargando ? (
            <View className="mt-20 items-center px-6">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full border border-borde bg-campo">
                <Moon size={28} color={colores.tintaSuave} />
              </View>
              <Text className="text-center font-cuerpo text-base leading-6 text-tinta-suave">
                Aún no hay sueños. Anota el primero antes de que se te olvide.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          const color = colorDeEstado(item.estado_animo);
          return (
            <Pressable
              onPress={() => router.push({ pathname: '/sueno/[id]', params: { id: item.id } })}
              className="active:opacity-80"
            >
              <GlassCard desenfoque={DESENFOQUE_EN_LISTAS} acento={color} relleno="py-4 pl-5 pr-4">
                <View className="flex-row items-baseline gap-2.5">
                  <Text className="flex-1 font-fuerte text-lg text-tinta" numberOfLines={1}>
                    {item.titulo}
                  </Text>
                  <Text className="font-medio text-xs text-tinta-tenue">{formatearFecha(item.fecha)}</Text>
                </View>

                {item.relato ? (
                  <Text className="mt-1.5 font-cuerpo text-sm leading-5 text-tinta-suave" numberOfLines={2}>
                    {item.relato}
                  </Text>
                ) : null}

                <View className="mt-3 flex-row items-center justify-between">
                  <Text className="font-fuerte text-sm" style={{ color }}>
                    {item.estado_animo ?? 'sin estado'}
                  </Text>
                  <Intensidad valor={item.intensidad} color={color} />
                </View>

                {item.simbolos.length > 0 && (
                  <Text className="mt-2.5 font-medio text-sm text-tinta-suave" numberOfLines={1}>
                    {item.simbolos.map((n) => `#${n}`).join('   ')}
                  </Text>
                )}
              </GlassCard>
            </Pressable>
          );
        }}
      />

      <View className="absolute left-5 right-5" style={{ bottom: insets.bottom + 16 }}>
        <Boton
          texto="Nuevo sueño"
          onPress={() => router.push('/sueno/nuevo')}
          icono={<Plus size={20} color={colores.tinta} />}
        />
      </View>
    </GradientBackground>
  );
}