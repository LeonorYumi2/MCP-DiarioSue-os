import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Mis sueños' }} />
      <Stack.Screen name="sueno/nuevo" options={{ title: 'Nuevo sueño' }} />
      <Stack.Screen name="sueno/[id]" options={{ title: 'Editar sueño' }} />
      <Stack.Screen name="simbolos/index" options={{ title: 'Símbolos' }} />
      <Stack.Screen name="simbolos/nuevo" options={{ title: 'Nuevo símbolo' }} />
    </Stack>
  );
}