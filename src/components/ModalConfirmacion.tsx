import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colores, fuentes } from '@/constants/theme';

type Props = {
  visible: boolean;
  titulo: string;
  descripcion: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onConfirmar: () => void | Promise<void>;
  onCancelar: () => void;
  cargando?: boolean;
  variante?: 'primario' | 'peligro';
  icono?: ReactNode;
};

export function ModalConfirmacion({
  visible,
  titulo,
  descripcion,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirmar,
  onCancelar,
  cargando = false,
  variante = 'primario',
  icono,
}: Props) {
  const esPeligro = variante === 'peligro';
  const colorAcento = esPeligro ? colores.error : colores.lavanda;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        if (!cargando) onCancelar();
      }}
    >
      <View style={s.overlay}>
        {/* Backdrop más oscuro para atenuar fuertemente la pantalla posterior */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => {
            if (!cargando) onCancelar();
          }}
          accessibilityRole="button"
          accessibilityLabel="Cerrar ventana emergente"
        />

        <View style={s.tarjetaWrapper}>
          {/* Panel central con tonalidad azul medianoche con matiz violeta profundo y alta opacidad */}
          <View
            style={[
              s.panelSuperficie,
              Platform.OS === 'ios'
                ? {
                    shadowColor: colorAcento,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.16,
                    shadowRadius: 20,
                  }
                : undefined,
            ]}
          >
            {/* Brillo especular superior tenue para efecto de volumen Liquid Glass */}
            <LinearGradient
              pointerEvents="none"
              colors={['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.8, y: 0.6 }}
              style={StyleSheet.absoluteFill}
            />

            {/* Borde superior iluminado (arista de cristal) */}
            <View pointerEvents="none" style={s.aristaIluminada} />

            {/* Halo sutil de acento en la esquina */}
            <View
              pointerEvents="none"
              style={[
                s.haloAcento,
                { backgroundColor: colorAcento },
              ]}
            />

            <View style={s.contenidoInterno}>
              {/* Icono temático */}
              {icono && (
                <View
                  style={[
                    s.iconoContenedor,
                    esPeligro && { borderColor: 'rgba(251, 113, 133, 0.28)', backgroundColor: 'rgba(251, 113, 133, 0.10)' },
                  ]}
                >
                  {icono}
                </View>
              )}

              {/* Título de alto contraste */}
              <Text style={s.titulo}>{titulo}</Text>

              {/* Descripción legible */}
              <Text style={s.descripcion}>{descripcion}</Text>

              {/* Acciones */}
              <View style={s.accionesFila}>
                {/* Botón secundario: Cancelar */}
                <Pressable
                  onPress={onCancelar}
                  disabled={cargando}
                  accessibilityRole="button"
                  accessibilityLabel={textoCancelar}
                  style={({ pressed }) => [
                    s.botonBase,
                    s.botonCancelar,
                    pressed && s.botonPresionado,
                    cargando && s.botonDeshabilitado,
                  ]}
                >
                  <Text style={s.textoCancelar}>{textoCancelar}</Text>
                </Pressable>

                {/* Botón principal: Confirmar / Eliminar */}
                <Pressable
                  onPress={onConfirmar}
                  disabled={cargando}
                  accessibilityRole="button"
                  accessibilityLabel={textoConfirmar}
                  style={({ pressed }) => [
                    s.botonBase,
                    esPeligro ? s.botonPeligro : s.botonPrimario,
                    pressed && s.botonPresionado,
                    cargando && s.botonDeshabilitado,
                  ]}
                >
                  {cargando ? (
                    <ActivityIndicator color={colores.tinta} size="small" />
                  ) : (
                    <Text style={esPeligro ? s.textoPeligro : s.textoPrimario}>
                      {textoConfirmar}
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(3, 4, 16, 0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  tarjetaWrapper: {
    width: '100%',
    maxWidth: 340,
    zIndex: 10,
  },
  panelSuperficie: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    backgroundColor: 'rgba(18, 14, 38, 0.96)',
    overflow: 'hidden',
  },
  aristaIluminada: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  haloAcento: {
    position: 'absolute',
    right: -16,
    top: -16,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.12,
  },
  contenidoInterno: {
    padding: 24,
  },
  iconoContenedor: {
    alignSelf: 'center',
    marginBottom: 14,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 21,
    lineHeight: 27,
    color: colores.tinta,
    textAlign: 'center',
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  descripcion: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(248, 247, 255, 0.78)',
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 6,
  },
  accionesFila: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  botonBase: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  botonPresionado: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  botonCancelar: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
  },
  textoCancelar: {
    fontFamily: fuentes.medio,
    fontSize: 14,
    color: colores.tintaSuave,
  },
  botonPrimario: {
    backgroundColor: colores.acento,
  },
  textoPrimario: {
    fontFamily: fuentes.fuerte,
    fontSize: 14,
    color: colores.tinta,
  },
  botonPeligro: {
    backgroundColor: 'rgba(251, 113, 133, 0.22)',
    borderWidth: 1,
    borderColor: colores.error,
  },
  textoPeligro: {
    fontFamily: fuentes.fuerte,
    fontSize: 14,
    color: colores.error,
  },
});
