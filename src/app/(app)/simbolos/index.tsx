import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSimbolos } from '@/hooks/useSimbolos';

export default function ListaSimbolos() {
  const { simbolos, cargando, error, recargar } = useSimbolos();

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  return (
    <View style={s.contenedor}>
      <Pressable style={s.boton} onPress={() => router.push('/simbolos/nuevo')}>
        <Text style={s.botonTexto}>+ Nuevo símbolo</Text>
      </Pressable>

      {error && <Text style={s.error}>{error}</Text>}

      <FlatList
        data={simbolos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        ListEmptyComponent={!cargando ? <Text style={s.vacio}>Aún no hay símbolos. Crea el primero.</Text> : null}
        contentContainerStyle={{ gap: 10, paddingVertical: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={s.tarjeta}
            onPress={() => router.push({ pathname: '/simbolos/nuevo', params: { id: item.id } })}
          >
            <Text style={s.titulo}>{item.nombre}</Text>
            {item.significado ? <Text style={s.meta}>{item.significado}</Text> : null}
          </Pressable>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  boton: { backgroundColor: '#8B5CF6', borderRadius: 10, padding: 12, alignItems: 'center' },
  botonTexto: { color: '#fff', fontWeight: '600' },
  error: { color: '#DC2626', marginTop: 8 },
  vacio: { textAlign: 'center', marginTop: 40, color: '#666' },
  tarjeta: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, padding: 14 },
  titulo: { fontSize: 16, fontWeight: '700' },
  meta: { color: '#666', marginTop: 4 },
});