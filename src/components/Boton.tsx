import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colores } from '@/constants/theme';

type Props = {
  texto: string;
  onPress: () => void;
  cargando?: boolean;
  variante?: 'primario' | 'vidrio' | 'peligro';
  icono?: ReactNode;
  className?: string;
};

const CONTORNO: Record<'vidrio' | 'peligro', string> = {
  vidrio: 'border border-borde bg-campo',
  peligro: 'border border-peligro bg-campo',
};

export function Boton({ texto, onPress, cargando = false, variante = 'primario', icono, className = '' }: Props) {
  const colorTexto = variante === 'peligro' ? 'text-peligro' : 'text-tinta';

  return (
    <Pressable
      onPress={onPress}
      disabled={cargando}
      accessibilityRole="button"
      className={`h-14 overflow-hidden rounded-2xl active:opacity-80 ${
        variante === 'primario' ? '' : CONTORNO[variante]
      } ${className}`}
    >
      {variante === 'primario' && (
        <LinearGradient
          colors={[colores.acento, colores.acentoFin]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View className="h-full flex-row items-center justify-center gap-2">
        {cargando ? (
          <ActivityIndicator color={colores.tinta} />
        ) : (
          <>
            {icono}
            <Text className={`font-fuerte text-base ${colorTexto}`}>{texto}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}