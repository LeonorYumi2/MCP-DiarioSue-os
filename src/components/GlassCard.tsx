import { Platform, StyleSheet, View, type ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useBlurTarget } from '@/components/GradientBackground';

type Props = ViewProps & {
  className?: string;
  desenfoque?: boolean;
  acento?: string;
  relleno?: string;
};

export function GlassCard({
  className = '',
  desenfoque = true,
  acento,
  relleno = 'p-4',
  children,
  ...resto
}: Props) {
  const objetivo = useBlurTarget();

  return (
    <View className={`overflow-hidden rounded-3xl border border-borde ${className}`} {...resto}>
      {desenfoque && (
        <BlurView
          blurTarget={Platform.OS === 'android' ? objetivo ?? undefined : undefined}
          blurMethod="dimezisBlurView"
          intensity={45}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      )}
      <View pointerEvents="none" className="absolute inset-0 bg-vidrio" />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(255,255,255,0.24)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.75, y: 0.6 }}
        style={StyleSheet.absoluteFill}
      />
      {acento && (
        <View
          pointerEvents="none"
          className="absolute bottom-5 left-0 top-5 w-1 rounded-full"
          style={{ backgroundColor: acento }}
        />
      )}
      <View className={relleno}>{children}</View>
    </View>
  );
}