import { useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colores } from '@/constants/theme';

type Props = TextInputProps & {
  etiqueta?: string;
  multilinea?: boolean;
  esContrasena?: boolean;
  className?: string;
};

export function Campo({ etiqueta, multilinea = false, esContrasena = false, className = '', ...resto }: Props) {
  const [visible, setVisible] = useState(false);
  const Icono = visible ? EyeOff : Eye;

  return (
    <View className="gap-1.5">
      {etiqueta && <Text className="font-medio text-sm text-tinta-suave">{etiqueta}</Text>}

      <View className="justify-center">
        <TextInput
          {...resto}
          placeholderTextColor={colores.tintaTenue}
          selectionColor={colores.acentoFin}
          multiline={multilinea}
          secureTextEntry={esContrasena && !visible}
          autoCapitalize={esContrasena ? 'none' : resto.autoCapitalize}
          autoCorrect={esContrasena ? false : resto.autoCorrect}
          textAlignVertical={multilinea ? 'top' : 'center'}
          className={`rounded-2xl border border-borde bg-campo py-3.5 font-cuerpo text-base text-tinta ${
            esContrasena ? 'pl-4 pr-12' : 'px-4'
          } ${multilinea ? 'min-h-32' : ''} ${className}`}
        />

        {esContrasena && (
          <Pressable
            onPress={() => setVisible((v) => !v)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-1.5 h-11 w-11 items-center justify-center"
          >
            <Icono size={20} color={colores.tintaSuave} />
          </Pressable>
        )}
      </View>
    </View>
  );
}