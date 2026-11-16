import { Stack } from 'expo-router';
import { colores, fuentes } from '@/constants/theme';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colores.fondo[0] },
        headerTintColor: colores.tinta,
        headerTitleStyle: { fontFamily: fuentes.titulo, fontSize: 20 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colores.fondo[0] },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sueno/nuevo" options={{ title: 'Nuevo sueño' }} />
      <Stack.Screen name="sueno/[id]" options={{ title: 'Editar sueño' }} />
      <Stack.Screen name="simbolos/index" options={{ title: 'Símbolos' }} />
      <Stack.Screen name="simbolos/nuevo" options={{ title: 'Símbolo' }} />
    </Stack>
  );
}