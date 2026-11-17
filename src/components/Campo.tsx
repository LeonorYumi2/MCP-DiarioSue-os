import { colores, fuentes } from "@/constants/theme";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colores, fuentes } from '@/constants/theme';

type Props = TextInputProps & {
  etiqueta?: string;
  multilinea?: boolean;
  esContrasena?: boolean;
  className?: string;
};

export function Campo({
  etiqueta,
  multilinea = false,
  esContrasena = false,
  className = "",
  onFocus,
  onBlur,
  ...resto
}: Props) {
  const [visible, setVisible] = useState(false);
  const [enfocado, setEnfocado] = useState(false);
  const Icono = visible ? EyeOff : Eye;

  function handleFocus(...args: Parameters<NonNullable<TextInputProps['onFocus']>>) {
    setEnfocado(true);
    onFocus?.(...args);
  }

  function handleBlur(...args: Parameters<NonNullable<TextInputProps['onBlur']>>) {
    setEnfocado(false);
    onBlur?.(...args);
  }

  return (
    <View style={s.contenedor}>
      {etiqueta && (
        <Text style={[s.etiqueta, enfocado && s.etiquetaEnfocada]}>
          {etiqueta}
        </Text>
      )}

      <View style={s.inputWrapper}>
        <TextInput
          {...resto}
          placeholderTextColor="rgba(248, 247, 255, 0.36)"
          selectionColor={colores.celeste}
          multiline={multilinea}
          secureTextEntry={esContrasena && !visible}
          autoCapitalize={esContrasena ? "none" : resto.autoCapitalize}
          autoCorrect={esContrasena ? false : resto.autoCorrect}
          textAlignVertical={multilinea ? "top" : "center"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            s.inputBase,
            esContrasena ? s.inputPassword : s.inputNormal,
            multilinea ? s.inputMultilinea : null,
            enfocado ? s.inputEnfocado : s.inputReposo,
          ]}
        />

        {esContrasena && (
          <Pressable
            onPress={() => setVisible((v) => !v)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={
              visible ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            style={s.botonOjo}
          >
            <Icono size={20} color={colores.tintaSuave} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: {
    gap: 7,
  },
  etiqueta: {
    fontFamily: fuentes.medio,
    fontSize: 13.5,
    color: colores.tintaSuave,
    letterSpacing: 0.2,
  },
  etiquetaEnfocada: {
    color: colores.celeste,
  },
  inputWrapper: {
    justifyContent: "center",
  },
  inputBase: {
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    fontFamily: fuentes.cuerpo,
    fontSize: 15.5,
    color: colores.tinta,
    paddingVertical: 13,
  },
  inputNormal: {
    paddingHorizontal: 16,
  },
  inputPassword: {
    paddingLeft: 16,
    paddingRight: 48,
  },
  inputMultilinea: {
    minHeight: 120,
    lineHeight: 22,
  },
  inputReposo: {
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  inputEnfocado: {
    borderColor: "rgba(167, 139, 250, 0.65)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  botonOjo: {
    position: "absolute",
    right: 8,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
