import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useSuenos } from '@/hooks/useSuenos';

export default function Inicio() {
  const { session, cerrarSesion } = useAuth();
  const { suenos, cargando, error, recargar } = useSuenos();

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  return (
    <View style={s.contenedor}>
      <Text style={s.correo}>{session?.user.email}</Text>

      <View style={s.fila}>
        <Pressable style={s.boton} onPress={() => router.push('/sueno/nuevo')}>
          <Text style={s.botonTexto}>+ Nuevo sueño</Text>
        </Pressable>
        <Pressable style={s.botonSecundario} onPress={() => router.push('/simbolos')}>
          <Text>Símbolos</Text>
        </Pressable>
        <Pressable style={s.botonSecundario} onPress={() => cerrarSesion()}>
          <Text>Salir</Text>
        </Pressable>
      </View>

      {error && <Text style={s.error}>{error}</Text>}

      <FlatList
        data={suenos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        ListEmptyComponent={!cargando ? <Text style={s.vacio}>Aún no hay sueños. Crea el primero.</Text> : null}
        contentContainerStyle={{ gap: 10, paddingVertical: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={s.tarjeta}
            onPress={() => router.push({ pathname: '/sueno/[id]', params: { id: item.id } })}
          >
            <Text style={s.titulo}>{item.titulo}</Text>
            <Text style={s.meta}>
              {item.fecha} · {item.estado_animo ?? 'sin estado'} · intensidad {item.intensidad ?? '-'}
            </Text>
            {item.simbolos.length > 0 && (
              <Text style={s.simbolos}>{item.simbolos.map((n) => `#${n}`).join('  ')}</Text>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  correo: { color: '#666', marginBottom: 8 },
  fila: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  boton: { backgroundColor: '#8B5CF6', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  botonTexto: { color: '#fff', fontWeight: '600' },
  botonSecundario: { borderWidth: 1, borderColor: '#999', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  error: { color: '#DC2626', marginTop: 8 },
  vacio: { textAlign: 'center', marginTop: 40, color: '#666' },
  tarjeta: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, padding: 14 },
  titulo: { fontSize: 16, fontWeight: '700' },
  meta: { color: '#666', marginTop: 4 },
  simbolos: { color: '#8B5CF6', marginTop: 4, fontWeight: '600' },
});