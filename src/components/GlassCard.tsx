import { Platform, StyleSheet, View, type ViewProps } from 'react-native';
import { GlassView } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';

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
  return (
    <View
      className={`overflow-hidden rounded-3xl border border-borde ${className}`}
      style={
        Platform.OS === 'ios'
          ? {
              shadowColor: acento ?? '#7C3AED',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: acento ? 0.12 : 0.06,
              shadowRadius: 16,
            }
          : undefined
      }
      {...resto}
    >
      {/* Desenfoque Liquid Glass nativo */}
      {desenfoque && (
        <GlassView
          glassEffectStyle="clear"
          tintColor="rgba(147, 102, 248, 0.14)"
          style={StyleSheet.absoluteFill}
        />
      )}

      {/* Capa base de cristal translúcido */}
      <View pointerEvents="none" className="absolute inset-0 bg-vidrio" />

      {/* Brillo especular superior para dar sensación de volumen */}
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(255,255,255,0.20)', 'rgba(255,255,255,0.03)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Borde superior iluminado (reflejo de arista) */}
      <View
        pointerEvents="none"
        className="absolute left-4 right-4 top-0 h-[1px]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.28)',
        }}
      />

      {/* Acento luminoso sutil si se especifica */}
      {acento && (
        <>
          {/* Halo difuso de acento en la esquina superior izquierda */}
          <View
            pointerEvents="none"
            className="absolute -left-6 -top-6 h-20 w-20 rounded-full"
            style={{
              backgroundColor: acento,
              opacity: 0.18,
            }}
          />
          {/* Píldora de acento lateral refinada con degradado */}
          <View
            pointerEvents="none"
            className="absolute bottom-5 left-1 top-5 w-1 overflow-hidden rounded-full"
          >
            <LinearGradient
              colors={[acento, `${acento}40`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </>
      )}

      <View className={relleno}>{children}</View>
    </View>
  );
}