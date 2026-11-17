import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { GlassView } from 'expo-glass-effect';
import { colores, fuentes } from '@/constants/theme';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTintColor: colores.tinta,
        headerTitleStyle: { fontFamily: fuentes.titulo, fontSize: 20 },
        headerShadowVisible: false,
        headerBackTitle: 'Atrás',
        headerBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <GlassView
              glassEffectStyle="clear"
              tintColor="rgba(6, 7, 27, 0.72)"
              style={StyleSheet.absoluteFill}
            />
            <View
              pointerEvents="none"
              style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(6, 7, 27, 0.45)' }]}
            />
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: StyleSheet.hairlineWidth,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
          </View>
        ),
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