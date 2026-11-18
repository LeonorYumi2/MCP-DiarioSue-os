# Contexto Completo del Proyecto CV-CREATOR-APP


================================================
ðŸ“„ ARCHIVO: .env
================================================

EXPO_PUBLIC_SUPABASE_URL=https://gxeytzwhkitpzphalhnu.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_aZ8iQGvKWA15Dtl4xZd6sw_9ou9Tv39

================================================
ðŸ“„ ARCHIVO: .env.example
================================================

EXPO_PUBLIC_SUPABASE_URL=https://tu_id.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_...

================================================
ðŸ“„ ARCHIVO: .gitignore
================================================

# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local
.env

# typescript
*.tsbuildinfo

example

# generated native folders
/ios
/android


================================================
ðŸ“„ ARCHIVO: AGENTS.md
================================================

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md


================================================
ðŸ“„ ARCHIVO: app.json
================================================

{
  "expo": {
    "name": "diario-suenos",
    "slug": "diario-suenos",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "diariosuenos",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "android": {
      "package": "com.diariosuenos.app",
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#06071B",
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 76
        }
      ],
      "expo-font",
      "expo-status-bar"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "75777973-8c84-4d57-9c04-2bcc3c6746e0"
      }
    },
    "owner": "leonoryumi"
  }
}


================================================
ðŸ“„ ARCHIVO: eas.json
================================================

{
  "cli": {
    "version": ">= 14.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "environment": "preview",
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}


================================================
ðŸ“„ ARCHIVO: eslint.config.js
================================================

// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  }
]);


================================================
ðŸ“„ ARCHIVO: expo-env.d.ts
================================================

/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore

================================================
ðŸ“„ ARCHIVO: metro.config.js
================================================

const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './uniwind-types.d.ts',
});

================================================
ðŸ“„ ARCHIVO: package.json
================================================

{
  "name": "diario-suenos",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@expo-google-fonts/fraunces": "^0.4.1",
    "@expo-google-fonts/manrope": "^0.4.3",
    "@expo/ui": "~57.0.26",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@supabase/supabase-js": "^2.119.0",
    "expo": "~57.0.33",
    "expo-blur": "~57.0.3",
    "expo-constants": "~57.0.24",
    "expo-device": "~57.0.2",
    "expo-font": "~57.0.4",
    "expo-glass-effect": "~57.0.5",
    "expo-image": "~57.0.5",
    "expo-linear-gradient": "~57.0.2",
    "expo-linking": "~57.0.14",
    "expo-router": "~57.0.31",
    "expo-splash-screen": "~57.0.11",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.3",
    "expo-system-ui": "~57.0.4",
    "expo-web-browser": "~57.0.3",
    "lottie-react-native": "~7.3.8",
    "lucide-react-native": "^1.73.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-svg": "15.15.4",
    "react-native-url-polyfill": "^4.0.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1",
    "tailwindcss": "^4.3.5",
    "uniwind": "^1.13.2"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "typescript": "~6.0.3"
  },
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "private": true
}


================================================
ðŸ“„ ARCHIVO: README.md
================================================

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


================================================
ðŸ“„ ARCHIVO: src\app\(app)\index.tsx
================================================

/* eslint-disable react-hooks/immutability */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { BookOpen, Moon, Plus, Power, Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bienvenida } from '@/components/Bienvenida';
import { Despedida } from '@/components/Despedida';
import { GradientBackground } from '@/components/GradientBackground';
import { ModalConfirmacion } from '@/components/ModalConfirmacion';
import { SuenoCard } from '@/components/SuenoCard';
import { colores, fuentes } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { useSuenos } from '@/hooks/useSuenos';
import { mensajeError } from '@/lib/errores';
import type { SuenoConSimbolos } from '@/types';

function BotonAccion({
  onPress,
  etiqueta,
  children,
}: {
  onPress: () => void;
  etiqueta: string;
  children: ReactNode;
}) {
  const scale = useSharedValue(1);

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={estiloAnimado}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withTiming(0.92, { duration: 80 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 14, stiffness: 220 }))}
        accessibilityRole="button"
        accessibilityLabel={etiqueta}
        style={s.botonAccion}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

function BotonFlotante({ onPress }: { onPress: () => void }) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        s.flotanteContenedor,
        { bottom: Math.max(insets.bottom, 16) + 12 },
        estiloAnimado,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withTiming(0.94, { duration: 90 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 15, stiffness: 220 }))}
        accessibilityRole="button"
        accessibilityLabel="Registrar un nuevo sueño"
        style={s.flotantePressable}
      >
        <LinearGradient
          colors={[colores.acento, colores.acentoFin]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.flotanteGradiente}
        >
          <Plus size={20} color={colores.tinta} strokeWidth={2.4} />
          <Text style={s.flotanteTexto}>Nuevo sueño</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export default function Inicio() {
  const { session, cerrarSesion } = useAuth();
  const { suenos, cargando, error, recargar } = useSuenos();
  const insets = useSafeAreaInsets();
  const [mostrarBienvenida, setMostrarBienvenida] = useState(false);
  const [modalSalirVisible, setModalSalirVisible] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const [mostrarDespedida, setMostrarDespedida] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@diario_suenos:mostrar_bienvenida')
      .then((val) => {
        if (val === 'true') {
          setMostrarBienvenida(true);
        }
      })
      .catch(() => {});
  }, []);

  async function despedirBienvenida() {
    try {
      await AsyncStorage.removeItem('@diario_suenos:mostrar_bienvenida');
    } catch {
      // ignore
    }
    setMostrarBienvenida(false);
  }

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  async function ejecutarCierreSesion() {
    setModalSalirVisible(false);
    setMostrarDespedida(true);
    setSaliendo(true);
    try {
      // Permitir que la animación de despedida se disfrute por ~1.8 segundos
      await new Promise((resolve) => setTimeout(resolve, 1800));
      await cerrarSesion();
    } catch (e) {
      setMostrarDespedida(false);
      setSaliendo(false);
      Alert.alert('No se pudo cerrar sesión', mensajeError(e));
    }
  }

  // Extracción de nombre de usuario para el saludo discreto
  const nombreUsuario =
    session?.user?.user_metadata?.nombre ??
    session?.user?.user_metadata?.name ??
    session?.user?.email?.split('@')[0];
  const nombreLimpio = nombreUsuario
    ? nombreUsuario.trim().split(' ')[0]
    : null;
  const saludo = nombreLimpio
    ? `Hola, ${nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1)}`
    : 'Buenas noches';

  return (
    <GradientBackground areaSegura>
      {/* Encabezado elegante del diario */}
      <View style={[s.cabecera, { paddingTop: insets.top > 0 ? 8 : 16 }]}>
        <View style={s.cabeceraInfo}>
          <Text style={s.cabeceraSaludo}>{saludo}</Text>
          <Text style={s.cabeceraTitulo}>Diario de sueños</Text>
          <Text style={s.cabeceraFrase}>
            Cada sueño es una ventana a tu mundo interior.
          </Text>
        </View>

        {/* Botones de acción superior */}
        <View style={s.cabeceraBotones}>
          <BotonAccion etiqueta="Glosario de símbolos" onPress={() => router.push('/simbolos')}>
            <BookOpen size={21} color={colores.tinta} strokeWidth={2.2} />
          </BotonAccion>

          <BotonAccion etiqueta="Cerrar sesión" onPress={() => setModalSalirVisible(true)}>
            <Power size={21} color={colores.tinta} strokeWidth={2.2} />
          </BotonAccion>
        </View>
      </View>

      {/* Contador de sueños sutil */}
      {!cargando && suenos.length > 0 && (
        <View style={s.contadorFila}>
          <View style={s.contadorBadge}>
            <Sparkles size={13} color={colores.celeste} />
            <Text style={s.contadorTexto}>
              {suenos.length === 1 ? '1 sueño registrado' : `${suenos.length} sueños registrados`}
            </Text>
          </View>
        </View>
      )}

      {/* Mensaje de error si la carga falla */}
      {error && <Text style={s.errorTexto}>{error}</Text>}

      {/* Listado de tarjetas de sueños */}
      <FlatList<SuenoConSimbolos>
        data={suenos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        contentContainerStyle={[
          s.listaContenido,
          { paddingBottom: insets.bottom + 110 },
        ]}
        ListEmptyComponent={
          !cargando && !error ? (
            <View style={s.vacioContenedor}>
              <View style={s.vacioAura}>
                <LottieView
                  source={require('../../../assets/animations/tranquilo.json')}
                  autoPlay
                  loop
                  style={s.vacioLottie}
                />
              </View>

              <Text style={s.vacioTitulo}>
                «Aquí comenzará tu universo de sueños»
              </Text>

              <Text style={s.vacioDescripcion}>
                Anota lo que viviste antes de que se desvanezca en la vigilia. Cada detalle guarda un mensaje para ti.
              </Text>

              <Pressable
                onPress={() => router.push('/sueno/nuevo')}
                accessibilityRole="button"
                accessibilityLabel="Registrar mi primer sueño"
                style={s.vacioBoton}
              >
                <LinearGradient
                  colors={[colores.acento, colores.acentoFin]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={s.vacioBotonGradiente}
                >
                  <Plus size={18} color={colores.tinta} strokeWidth={2.4} />
                  <Text style={s.vacioBotonTexto}>Registrar mi primer sueño</Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => (
          <SuenoCard
            sueno={item}
            index={index}
            onPress={() =>
              router.push({
                pathname: '/sueno/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
      />

      {/* Botón flotante para registrar nuevo sueño */}
      {suenos.length > 0 && (
        <BotonFlotante onPress={() => router.push('/sueno/nuevo')} />
      )}

      {/* Experiencia de bienvenida (overlay inicial de consumo único) */}
      {mostrarBienvenida && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(500)}
          style={StyleSheet.absoluteFill}
        >
          <Bienvenida
            nombreUsuario={nombreUsuario}
            onEntrar={despedirBienvenida}
          />
        </Animated.View>
      )}

      {/* Modal de confirmación para cerrar sesión */}
      <ModalConfirmacion
        visible={modalSalirVisible}
        titulo="¿Es hora de descansar?"
        descripcion="Tus sueños están guardados. Puedes regresar cuando quieras."
        textoCancelar="Seguir soñando"
        textoConfirmar="Cerrar sesión"
        onCancelar={() => setModalSalirVisible(false)}
        onConfirmar={ejecutarCierreSesion}
        cargando={saliendo}
        variante="primario"
        icono={<Moon size={24} color={colores.celeste} />}
      />

      {/* Experiencia de despedida animada */}
      {mostrarDespedida && <Despedida />}
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  cabecera: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 6,
    gap: 12,
  },
  cabeceraInfo: {
    flex: 1,
  },
  cabeceraSaludo: {
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.celeste,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  cabeceraTitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 32,
    lineHeight: 38,
    color: colores.tinta,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  cabeceraFrase: {
    fontFamily: fuentes.cuerpo,
    fontSize: 13,
    lineHeight: 18,
    color: colores.tintaSuave,
    marginTop: 3,
  },
  cabeceraBotones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  botonAccion: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.28)',
    backgroundColor: 'rgba(22, 16, 48, 0.72)',
  },
  contadorFila: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  contadorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(56, 189, 248, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
  },
  contadorTexto: {
    fontFamily: fuentes.medio,
    fontSize: 12,
    color: colores.celeste,
  },
  errorTexto: {
    marginHorizontal: 20,
    marginTop: 8,
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.error,
  },
  listaContenido: {
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  vacioContenedor: {
    marginTop: 48,
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  vacioAura: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 20,
  },
  vacioLottie: {
    width: 110,
    height: 110,
  },
  vacioTitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 24,
    lineHeight: 32,
    color: colores.tinta,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  vacioDescripcion: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14,
    lineHeight: 21,
    color: colores.tintaSuave,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 300,
  },
  vacioBoton: {
    marginTop: 26,
    borderRadius: 18,
    overflow: 'hidden',
  },
  vacioBotonGradiente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  vacioBotonTexto: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    color: colores.tinta,
  },
  flotanteContenedor: {
    position: 'absolute',
    alignSelf: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  flotantePressable: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.32)',
  },
  flotanteGradiente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  flotanteTexto: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    color: colores.tinta,
    letterSpacing: 0.2,
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\(app)\simbolos\index.tsx
================================================

import { useCallback } from 'react';
import { FlatList, Platform, Pressable, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Plus, Tags } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { DESENFOQUE_EN_LISTAS, colores } from '@/constants/theme';
import { useSimbolos } from '@/hooks/useSimbolos';

export default function ListaSimbolos() {
  const { simbolos, cargando, error, recargar } = useSimbolos();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  return (
    <GradientBackground>
      {error && <Text className="mt-2 px-5 font-medio text-sm text-peligro">{error}</Text>}

      <FlatList
        data={simbolos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 20,
          paddingTop: insets.top + (Platform.OS === 'ios' ? 52 : 56),
          paddingBottom: insets.bottom + 100,
        }}
        ListEmptyComponent={
          !cargando ? (
            <View className="mt-20 items-center px-6">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full border border-borde bg-campo">
                <Tags size={28} color={colores.tintaSuave} />
              </View>
              <Text className="text-center font-cuerpo text-base leading-6 text-tinta-suave">
                Los símbolos son las cosas que se repiten en tus sueños, como el agua o una casa. Crea el primero.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/simbolos/nuevo', params: { id: item.id } })}
            className="active:opacity-80"
          >
            <GlassCard desenfoque={DESENFOQUE_EN_LISTAS} relleno="p-4">
              <Text className="font-fuerte text-lg text-tinta">{item.nombre}</Text>
              {item.significado ? (
                <Text className="mt-1 font-cuerpo text-sm leading-5 text-tinta-suave" numberOfLines={3}>
                  {item.significado}
                </Text>
              ) : null}
            </GlassCard>
          </Pressable>
        )}
      />

      <View className="absolute left-5 right-5" style={{ bottom: insets.bottom + 16 }}>
        <Boton
          texto="Nuevo símbolo"
          onPress={() => router.push('/simbolos/nuevo')}
          icono={<Plus size={20} color={colores.tinta} />}
        />
      </View>
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(app)\simbolos\nuevo.tsx
================================================

import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { ModalConfirmacion } from '@/components/ModalConfirmacion';
import { colores } from '@/constants/theme';
import { useSimbolos } from '@/hooks/useSimbolos';
import { mensajeError } from '@/lib/errores';

export default function FormularioSimbolo() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editando = !!id;
  const { obtener, crear, actualizar, borrar } = useSimbolos();

  const [nombre, setNombre] = useState('');
  const [significado, setSignificado] = useState('');
  const [listo, setListo] = useState(!id);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    if (!id) return;
    obtener(id)
      .then((s) => {
        setNombre(s.nombre);
        setSignificado(s.significado ?? '');
      })
      .catch((e) => setError(mensajeError(e, 'No se pudo cargar el símbolo.')))
      .finally(() => setListo(true));
  }, [id, obtener]);

  async function guardar() {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    setGuardando(true);
    setError(null);
    const datos = { nombre: nombre.trim(), significado: significado.trim() || null };
    try {
      if (editando) await actualizar(id!, datos);
      else await crear(datos);
      router.back();
    } catch (e) {
      setError(mensajeError(e, 'No se pudo guardar.'));
    } finally {
      setGuardando(false);
    }
  }

  async function ejecutarBorrado() {
    setEliminando(true);
    try {
      await borrar(id!);
      setModalEliminarVisible(false);
      router.back();
    } catch (e) {
      setEliminando(false);
      Alert.alert('No se pudo eliminar', mensajeError(e));
    }
  }

  return (
    <GradientBackground>
      <Stack.Screen options={{ title: editando ? 'Editar símbolo' : 'Nuevo símbolo' }} />

      {!listo ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colores.tinta} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 20,
            paddingTop: insets.top + (Platform.OS === 'ios' ? 52 : 56),
            paddingBottom: insets.bottom + 48,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <GlassCard relleno="p-5">
            <View className="gap-4">
              <Campo etiqueta="Nombre" value={nombre} onChangeText={setNombre} placeholder="Ej. Agua" />
              <Campo
                etiqueta="Significado"
                value={significado}
                onChangeText={setSignificado}
                multilinea
                placeholder="¿Qué representa para ti?"
              />
            </View>
          </GlassCard>

          {error && <Text className="font-medio text-sm text-peligro">{error}</Text>}

          <Boton texto={editando ? 'Guardar cambios' : 'Guardar símbolo'} onPress={guardar} cargando={guardando} />

          {editando && (
            <Boton
              texto="Eliminar símbolo"
              onPress={() => setModalEliminarVisible(true)}
              variante="peligro"
            />
          )}
        </ScrollView>
      )}

      {editando && (
        <ModalConfirmacion
          visible={modalEliminarVisible}
          titulo="¿Eliminar este símbolo?"
          descripcion="Se quitará también de los sueños que lo utilizan."
          textoCancelar="Conservar símbolo"
          textoConfirmar="Eliminar símbolo"
          onCancelar={() => {
            if (!eliminando) setModalEliminarVisible(false);
          }}
          onConfirmar={ejecutarBorrado}
          cargando={eliminando}
          variante="peligro"
          icono={<Trash2 size={24} color={colores.error} />}
        />
      )}
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(app)\sueno\nuevo.tsx
================================================

import { GradientBackground } from '@/components/GradientBackground';
import { SuenoForm } from '@/components/SuenoForm';
import { useSuenos } from '@/hooks/useSuenos';

export default function NuevoSueno() {
  const { crear, guardarSimbolos } = useSuenos();

  return (
    <GradientBackground>
      <SuenoForm
        textoBoton="Guardar sueño"
        onGuardar={async (datos, simboloIds) => {
          const nuevo = await crear(datos);
          await guardarSimbolos(nuevo.id, simboloIds);
        }}
      />
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(app)\sueno\[id].tsx
================================================

import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { Boton } from '@/components/Boton';
import { GradientBackground } from '@/components/GradientBackground';
import { ModalConfirmacion } from '@/components/ModalConfirmacion';
import { SuenoForm } from '@/components/SuenoForm';
import { colores } from '@/constants/theme';
import { useSuenos } from '@/hooks/useSuenos';
import { mensajeError } from '@/lib/errores';
import type { Sueno } from '@/types';

export default function EditarSueno() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obtener, actualizar, borrar, listarSimbolosDeSueno, guardarSimbolos } = useSuenos();
  const [sueno, setSueno] = useState<Sueno | null>(null);
  const [seleccion, setSeleccion] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    Promise.all([obtener(id), listarSimbolosDeSueno(id)])
      .then(([datos, ids]) => {
        setSueno(datos);
        setSeleccion(ids);
      })
      .catch((e) => setError(mensajeError(e, 'No se pudo cargar el sueño.')));
  }, [id, obtener, listarSimbolosDeSueno]);

  async function ejecutarBorrado() {
    setEliminando(true);
    try {
      await borrar(id);
      setModalEliminarVisible(false);
      router.back();
    } catch (e) {
      setEliminando(false);
      Alert.alert('No se pudo eliminar', mensajeError(e));
    }
  }

  if (error || !sueno || !seleccion) {
    return (
      <GradientBackground>
        <View className="flex-1 items-center justify-center px-6">
          {error ? (
            <Text className="text-center font-medio text-base text-peligro">{error}</Text>
          ) : (
            <ActivityIndicator color={colores.tinta} />
          )}
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <SuenoForm
        inicial={sueno}
        simbolosIniciales={seleccion}
        textoBoton="Guardar cambios"
        onGuardar={async (datos, simboloIds) => {
          await actualizar(id, datos);
          await guardarSimbolos(id, simboloIds);
        }}
      >
        <Boton
          texto="Eliminar sueño"
          onPress={() => setModalEliminarVisible(true)}
          variante="peligro"
        />
      </SuenoForm>

      <ModalConfirmacion
        visible={modalEliminarVisible}
        titulo="¿Eliminar este sueño?"
        descripcion="Esta acción no se puede deshacer."
        textoCancelar="Conservar sueño"
        textoConfirmar="Eliminar sueño"
        onCancelar={() => {
          if (!eliminando) setModalEliminarVisible(false);
        }}
        onConfirmar={ejecutarBorrado}
        cargando={eliminando}
        variante="peligro"
        icono={<Trash2 size={24} color={colores.error} />}
      />
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(app)\_layout.tsx
================================================

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
              tintColor="rgba(6, 7, 27, 0.85)"
              style={StyleSheet.absoluteFill}
            />
            <View
              pointerEvents="none"
              style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(6, 7, 27, 0.94)' }]}
            />
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: StyleSheet.hairlineWidth,
                backgroundColor: 'rgba(255, 255, 255, 0.14)',
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

================================================
ðŸ“„ ARCHIVO: src\app\(auth)\confirm.tsx
================================================

import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { EmblemaCelestial } from '@/components/EmblemaCelestial';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';
import { mensajeError } from '@/lib/errores';
import { intercambiarCodigoPorSesion } from '@/services/auth';

export default function ConfirmacionCorreo() {
  const { code, error, error_description } = useLocalSearchParams<{
    code?: string;
    error?: string;
    error_description?: string;
  }>();

  // Detección directa de errores presentes en los parámetros de la URL sin provocar renders en cascada
  const errorParametros = error || error_description
    ? (error_description || error || 'El enlace de confirmación no es válido o ha caducado.')
    : !code
    ? 'No se encontró un código de confirmación válido en el enlace.'
    : null;

  const [errorAsincrono, setErrorAsincrono] = useState<string | null>(null);
  const codigoEnCursoRef = useRef<string | null>(null);
  const montadoRef = useRef(true);

  useEffect(() => {
    montadoRef.current = true;
    return () => {
      montadoRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Si ya existe un error en los parámetros o no hay código, no se procesa
    if (errorParametros || !code) {
      codigoEnCursoRef.current = null;
      return;
    }

    // Evitar procesar simultáneamente o duplicar el canje del mismo código
    if (codigoEnCursoRef.current === code) {
      return;
    }

    codigoEnCursoRef.current = code;

    // Limpiar errores previos para mostrar inmediatamente el estado de carga
    setErrorAsincrono(null);

    const codigoActual = code;

    async function procesar() {
      try {
        // Guardar el indicador de bienvenida antes de que la sesión se establezca
        await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');

        // Canjear el código de autorización PKCE por la sesión autenticada
        await intercambiarCodigoPorSesion(codigoActual);

        // Al resolverse el intercambio, Supabase emite SIGNED_IN y el AuthProvider
        // actualiza session. Stack.Protected en _layout.tsx conmuta automáticamente a (app).
      } catch (err) {
        await AsyncStorage.removeItem('@diario_suenos:mostrar_bienvenida');

        // Solo actualizar estado si el componente sigue montado y no se ha cambiado de código
        if (montadoRef.current && codigoEnCursoRef.current === codigoActual) {
          setErrorAsincrono(
            mensajeError(
              err,
              'No se pudo confirmar tu cuenta. Es posible que el enlace haya expirado o ya haya sido utilizado.'
            )
          );
          codigoEnCursoRef.current = null;
        }
      }
    }

    void procesar();
  }, [code, errorParametros]);

  const mensajeErrorVisible = errorParametros || errorAsincrono;
  const enProceso = !mensajeErrorVisible;

  return (
    <GradientBackground areaSegura>
      <View style={s.contenedor}>
        {/* Emblema celestial identitario */}
        <EmblemaCelestial tamano={70} style={s.emblema} />

        {enProceso ? (
          <>
            <Text style={s.titulo}>Confirmando tu cuenta</Text>
            <Text style={s.subtitulo}>
              Estamos preparando tu espacio para guardar lo que sueñas…
            </Text>

            <GlassCard relleno="p-6" className="mt-8 w-full">
              <View style={s.tarjetaCentro}>
                <ActivityIndicator size="large" color={colores.celeste} />
                <Text style={s.textoEspera}>Solo tomará un instante</Text>
              </View>
            </GlassCard>
          </>
        ) : (
          <>
            <Text style={s.titulo}>Enlace no disponible</Text>
            <Text style={s.subtitulo}>
              No pudimos activar tu cuenta con este enlace de confirmación.
            </Text>

            <GlassCard relleno="p-6" className="mt-8 w-full">
              <View style={s.tarjetaCentro}>
                <Text style={s.textoError}>{mensajeErrorVisible}</Text>

                <Boton
                  texto="Ir al inicio de sesión"
                  onPress={() => router.replace('/login')}
                  className="mt-6 w-full"
                />
              </View>
            </GlassCard>
          </>
        )}
      </View>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emblema: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.4,
    color: colores.tinta,
  },
  subtitulo: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 22,
    color: colores.tintaSuave,
    marginTop: 8,
    maxWidth: 320,
  },
  tarjetaCentro: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  textoEspera: {
    fontFamily: fuentes.medio,
    fontSize: 14,
    color: colores.tintaSuave,
    marginTop: 18,
    letterSpacing: 0.2,
  },
  textoError: {
    fontFamily: fuentes.medio,
    fontSize: 14,
    lineHeight: 21,
    color: colores.error,
    textAlign: 'center',
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\(auth)\login.tsx
================================================

import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { EmblemaCelestial } from '@/components/EmblemaCelestial';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { mensajeError } from '@/lib/errores';

export default function Login() {
  const insets = useSafeAreaInsets();
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function entrar() {
    if (!email.trim() || !password) {
      Alert.alert('Faltan datos', 'Escribe tu correo y tu contraseña.');
      return;
    }
    setEnviando(true);
    try {
      await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');
      await iniciarSesion(email.trim(), password);
    } catch (e) {
      await AsyncStorage.removeItem('@diario_suenos:mostrar_bienvenida');
      Alert.alert('No se pudo iniciar sesión', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <GradientBackground areaSegura>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            s.scrollContenido,
            {
              paddingTop: Math.max(insets.top + 8, 28),
              paddingBottom: Math.max(insets.bottom + 16, 32),
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Emblema celestial proporcionado */}
          <EmblemaCelestial />

          {/* 2. Título principal en Fraunces */}
          <Text style={s.tituloApp}>
            Diario{'\n'}de sueños
          </Text>

          {/* 3. Frase cálida en Manrope */}
          <Text style={s.subtituloApp}>
            Anota lo que soñaste antes de que se te olvide.
          </Text>

          {/* 4. Tarjeta Liquid Glass del formulario */}
          <GlassCard className="mt-7" relleno="p-5">
            <View style={s.formularioGap}>
              <Campo
                etiqueta="Correo"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="tu@correo.com"
              />
              <Campo
                etiqueta="Contraseña"
                value={password}
                onChangeText={setPassword}
                esContrasena
                placeholder="Tu contraseña"
              />
              <Boton texto="Entrar" onPress={entrar} cargando={enviando} className="mt-1" />
            </View>
          </GlassCard>

          {/* 5. Enlace refinado para crear diario */}
          <Pressable
            onPress={() => router.push('/registro')}
            accessibilityRole="button"
            accessibilityLabel="¿Aún no tienes un diario? Comienza el tuyo"
            hitSlop={8}
            style={({ pressed }) => [
              s.enlaceRegistro,
              pressed && s.enlacePresionado,
            ]}
          >
            <Text style={s.textoRegistroContenedor}>
              <Text style={s.textoRegistroPregunta}>¿Aún no tienes un diario? </Text>
              <Text style={s.textoRegistroAccion}>Comienza el tuyo</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  scrollContenido: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emblemaContenedor: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  tituloApp: {
    fontFamily: fuentes.titulo,
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -0.5,
    color: colores.tinta,
  },
  subtituloApp: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 22,
    color: colores.tintaSuave,
    marginTop: 8,
    maxWidth: 320,
  },
  formularioGap: {
    gap: 16,
  },
  enlaceRegistro: {
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  enlacePresionado: {
    opacity: 0.72,
  },
  textoRegistroContenedor: {
    textAlign: 'center',
  },
  textoRegistroPregunta: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14.5,
    color: colores.tintaSuave,
  },
  textoRegistroAccion: {
    fontFamily: fuentes.fuerte,
    fontSize: 14.5,
    color: colores.lavanda,
    letterSpacing: 0.2,
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\(auth)\registro.tsx
================================================

import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { EmblemaCelestial } from '@/components/EmblemaCelestial';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { mensajeError } from '@/lib/errores';

export default function Registro() {
  const insets = useSafeAreaInsets();
  const { registrar, reenviarCodigo } = useAuth();
  const [paso, setPaso] = useState<'datos' | 'confirmacion'>('datos');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const [mensajeReenvio, setMensajeReenvio] = useState<string | null>(null);

  async function crearCuenta() {
    if (!email.trim() || password.length < 6) {
      Alert.alert(
        'Revisa los datos',
        'Escribe un correo y una contraseña de al menos 6 caracteres.'
      );
      return;
    }
    setEnviando(true);
    setMensajeReenvio(null);
    try {
      const { session } = await registrar(email.trim(), password);
      if (session) {
        await AsyncStorage.setItem('@diario_suenos:mostrar_bienvenida', 'true');
      } else {
        setPaso('confirmacion');
      }
    } catch (e) {
      Alert.alert('No se pudo crear la cuenta', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  async function reenviar() {
    if (reenviando) return;
    setReenviando(true);
    setMensajeReenvio(null);
    try {
      await reenviarCodigo(email.trim());
      setMensajeReenvio('Te enviamos un nuevo enlace a tu correo.');
    } catch (e) {
      Alert.alert('No se pudo reenviar el correo', mensajeError(e));
    } finally {
      setReenviando(false);
    }
  }

  const enConfirmacion = paso === 'confirmacion';

  return (
    <GradientBackground areaSegura>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            s.scrollContenido,
            {
              paddingTop: Math.max(insets.top + 8, 28),
              paddingBottom: Math.max(insets.bottom + 16, 32),
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Emblema celestial proporcionado */}
          <EmblemaCelestial tamano={66} style={s.emblemaContenedor} />

          {/* 2. Título principal en Fraunces */}
          <Text style={s.tituloApp}>
            {enConfirmacion ? 'Revisa tu correo' : 'Crea tu cuenta'}
          </Text>

          {/* 3. Subtítulo en Manrope */}
          <Text style={s.subtituloApp}>
            {enConfirmacion
              ? 'Te enviamos un enlace para confirmar tu cuenta. Ábrelo desde este dispositivo para comenzar a guardar tus sueños.'
              : 'Un espacio para guardar cada sueño que quieras recordar.'}
          </Text>

          {/* 4. Tarjeta Liquid Glass */}
          <GlassCard className="mt-7" relleno="p-5">
            {enConfirmacion ? (
              <View style={s.formularioGap}>
                {/* Indicación clara del correo receptor */}
                <View style={s.correoCaja}>
                  <Text style={s.etiquetaCorreo}>Correo de destino</Text>
                  <Text
                    style={s.textoCorreo}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {email.trim()}
                  </Text>
                </View>

                {/* Notificación visual de reenvío exitoso */}
                {mensajeReenvio ? (
                  <View style={s.mensajeExitoContenedor}>
                    <Text style={s.textoExito}>{mensajeReenvio}</Text>
                  </View>
                ) : null}

                {/* Botón para solicitar nuevo enlace */}
                <Boton
                  texto="Reenviar correo"
                  onPress={reenviar}
                  cargando={reenviando}
                  variante="vidrio"
                />
              </View>
            ) : (
              <View style={s.formularioGap}>
                <Campo
                  etiqueta="Correo"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="tu@correo.com"
                />
                <Campo
                  etiqueta="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  esContrasena
                  placeholder="Mínimo 6 caracteres"
                />
                <Boton
                  texto="Crear cuenta"
                  onPress={crearCuenta}
                  cargando={enviando}
                  className="mt-1"
                />
              </View>
            )}
          </GlassCard>

          {/* 5. Enlace hacia Login o corrección de correo */}
          <Pressable
            onPress={() => {
              if (enConfirmacion) {
                setMensajeReenvio(null);
                setPaso('datos');
              } else {
                router.push('/login');
              }
            }}
            accessibilityRole="button"
            accessibilityLabel={
              enConfirmacion
                ? '¿Correo incorrecto? Cambiar correo'
                : '¿Ya tienes un diario? Inicia sesión'
            }
            hitSlop={8}
            style={({ pressed }) => [
              s.enlaceAccion,
              pressed && s.enlacePresionado,
            ]}
          >
            {enConfirmacion ? (
              <Text style={s.textoEnlaceContenedor}>
                <Text style={s.textoEnlacePregunta}>¿Correo incorrecto? </Text>
                <Text style={s.textoEnlaceAccion}>Cambiar correo</Text>
              </Text>
            ) : (
              <Text style={s.textoEnlaceContenedor}>
                <Text style={s.textoEnlacePregunta}>¿Ya tienes un diario? </Text>
                <Text style={s.textoEnlaceAccion}>Inicia sesión</Text>
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  scrollContenido: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emblemaContenedor: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  tituloApp: {
    fontFamily: fuentes.titulo,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.5,
    color: colores.tinta,
  },
  subtituloApp: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 22,
    color: colores.tintaSuave,
    marginTop: 8,
    maxWidth: 320,
  },
  formularioGap: {
    gap: 16,
  },
  correoCaja: {
    backgroundColor: colores.campo,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.bordeSutil,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  etiquetaCorreo: {
    fontFamily: fuentes.medio,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colores.tintaTenue,
    marginBottom: 4,
  },
  textoCorreo: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    color: colores.celeste,
  },
  mensajeExitoContenedor: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  textoExito: {
    fontFamily: fuentes.medio,
    fontSize: 13.5,
    color: colores.celeste,
    textAlign: 'center',
  },
  enlaceAccion: {
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  enlacePresionado: {
    opacity: 0.72,
  },
  textoEnlaceContenedor: {
    textAlign: 'center',
  },
  textoEnlacePregunta: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14.5,
    color: colores.tintaSuave,
  },
  textoEnlaceAccion: {
    fontFamily: fuentes.fuerte,
    fontSize: 14.5,
    color: colores.lavanda,
    letterSpacing: 0.2,
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\(auth)\_layout.tsx
================================================

import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

================================================
ðŸ“„ ARCHIVO: src\app\_layout.tsx
================================================

import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { colores } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

function Navegacion() {
  const { session, cargando } = useAuth();
  const [fuentesListas, errorFuentes] = useFonts({
    Fraunces_600SemiBold,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  if (cargando || (!fuentesListas && !errorFuentes)) return null;

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colores.fondo[0] },
        }}
      >
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navegacion />
    </AuthProvider>
  );
}

================================================
ðŸ“„ ARCHIVO: src\components\Bienvenida.tsx
================================================

import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';

type Props = {
  nombreUsuario?: string | null;
  onEntrar: () => void;
};

export function Bienvenida({ nombreUsuario, onEntrar }: Props) {
  const insets = useSafeAreaInsets();
  const auraScale = useSharedValue(1);

  useEffect(() => {
    auraScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 3200 }),
        withTiming(1, { duration: 3200 })
      ),
      -1,
      true
    );
  }, [auraScale]);

  const auraAnimada = useAnimatedStyle(() => ({
    transform: [{ scale: auraScale.value }],
  }));

  // Limpiar y capitalizar nombre para saludo personalizado
  const nombreLimpio = nombreUsuario
    ? nombreUsuario.trim().split(' ')[0]
    : null;
  const saludo = nombreLimpio
    ? `Hola, ${nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1)}`
    : 'Buenas noches';

  return (
    <GradientBackground areaSegura>
      <View
        style={[
          s.contenedor,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 32,
          },
        ]}
      >
        {/* Sección superior: Luna animada y resplandor místico */}
        <Animated.View
          entering={FadeInDown.duration(900).springify()}
          style={s.seccionLuna}
        >
          {/* Aura luminosa palpitante detrás de la luna */}
          <Animated.View style={[s.auraContenedor, auraAnimada]}>
            <LinearGradient
              colors={['rgba(56, 189, 248, 0.35)', 'rgba(167, 139, 250, 0.25)', 'transparent']}
              style={s.auraGradiente}
            />
          </Animated.View>

          {/* Luna animada con Lottie */}
          <View style={s.lunaMarco}>
            <LottieView
              source={require('../../assets/animations/tranquilo.json')}
              autoPlay
              loop
              style={s.lottie}
            />
          </View>
        </Animated.View>

        {/* Sección central: Saludo y mensaje poético */}
        <Animated.View
          entering={FadeIn.delay(350).duration(800)}
          style={s.seccionTexto}
        >
          <Text style={s.saludoTexto}>{saludo}</Text>

          <Text style={s.frasePrincipal}>
            «Este es tu pequeño espacio para guardar lo que sueñas»
          </Text>

          <Text style={s.fraseSecundaria}>
            Donde cada visión, emoción y símbolo nocturno encuentra su lugar en calma.
          </Text>
        </Animated.View>

        {/* Sección inferior: Tarjeta y botón de entrada */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(800).springify()}
          style={s.seccionBoton}
        >
          <GlassCard relleno="p-2" className="mb-2">
            <Boton
              texto="Entrar al diario"
              onPress={onEntrar}
              icono={<Sparkles size={20} color={colores.tinta} />}
            />
          </GlassCard>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  seccionLuna: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  auraContenedor: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraGradiente: {
    width: '100%',
    height: '100%',
  },
  lunaMarco: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  lottie: {
    width: 140,
    height: 140,
  },
  seccionTexto: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  saludoTexto: {
    fontFamily: fuentes.medio,
    fontSize: 16,
    color: colores.celeste,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  frasePrincipal: {
    fontFamily: fuentes.titulo,
    fontSize: 28,
    lineHeight: 38,
    color: colores.tinta,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  fraseSecundaria: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 23,
    color: colores.tintaSuave,
    textAlign: 'center',
    marginTop: 14,
    maxWidth: 320,
  },
  seccionBoton: {
    width: '100%',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\Boton.tsx
================================================

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

================================================
ðŸ“„ ARCHIVO: src\components\Campo.tsx
================================================

import { useState } from 'react';
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

  function handleFocus(
    ...args: Parameters<NonNullable<TextInputProps["onFocus"]>>
  ) {
    setEnfocado(true);
    onFocus?.(...args);
  }

  function handleBlur(
    ...args: Parameters<NonNullable<TextInputProps["onBlur"]>>
  ) {
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


================================================
ðŸ“„ ARCHIVO: src\components\Despedida.tsx
================================================

import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientBackground } from '@/components/GradientBackground';
import { colores, fuentes } from '@/constants/theme';

export function Despedida() {
  const auraScale = useSharedValue(1);

  useEffect(() => {
    auraScale.value = withRepeat(
      withSequence(
        withTiming(1.09, { duration: 2400 }),
        withTiming(1, { duration: 2400 })
      ),
      -1,
      true
    );
  }, [auraScale]);

  const auraAnimada = useAnimatedStyle(() => ({
    transform: [{ scale: auraScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(450)}
      style={StyleSheet.absoluteFill}
    >
      <GradientBackground areaSegura>
        <View style={s.contenedor}>
          {/* Luna animada con aura nocturna */}
          <Animated.View
            entering={FadeInDown.duration(800).springify()}
            style={s.seccionLuna}
          >
            <Animated.View style={[s.auraContenedor, auraAnimada]}>
              <LinearGradient
                colors={['rgba(56, 189, 248, 0.32)', 'rgba(167, 139, 250, 0.22)', 'transparent']}
                style={s.auraGradiente}
              />
            </Animated.View>

            <View style={s.lunaMarco}>
              <LottieView
                source={require('../../assets/animations/tranquilo.json')}
                autoPlay
                loop
                style={s.lottie}
              />
            </View>
          </Animated.View>

          {/* Mensaje de despedida */}
          <Animated.View
            entering={FadeInUp.delay(250).duration(700)}
            style={s.seccionTexto}
          >
            <Text style={s.titulo}>Que tengas dulces sueños</Text>
            <Text style={s.subtitulo}>
              Aquí estarán tus recuerdos cuando regreses.
            </Text>
          </Animated.View>
        </View>
      </GradientBackground>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 36,
  },
  seccionLuna: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraContenedor: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraGradiente: {
    width: '100%',
    height: '100%',
  },
  lunaMarco: {
    width: 176,
    height: 176,
    borderRadius: 88,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  lottie: {
    width: 145,
    height: 145,
  },
  seccionTexto: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 27,
    lineHeight: 35,
    color: colores.tinta,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitulo: {
    fontFamily: fuentes.cuerpo,
    fontSize: 15,
    lineHeight: 22,
    color: colores.tintaSuave,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 290,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\EmblemaCelestial.tsx
================================================

import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle, Defs, Ellipse, LinearGradient as SvgGradient, Path, Stop } from 'react-native-svg';
import { colores } from '@/constants/theme';

type Props = {
  tamano?: number;
  style?: StyleProp<ViewStyle>;
};

export function EmblemaCelestial({ tamano = 72, style }: Props) {
  return (
    <Animated.View entering={FadeIn.duration(650)} style={[s.contenedor, style]}>
      <Svg width={tamano} height={tamano} viewBox="0 0 72 72">
        <Defs>
          <SvgGradient id="emblemaLunaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colores.celeste} />
            <Stop offset="100%" stopColor={colores.lavanda} />
          </SvgGradient>
        </Defs>

        {/* Resplandor ambiental suave de fondo */}
        <Circle cx="36" cy="36" r="22" fill="rgba(56, 189, 248, 0.08)" />

        {/* Órbita celestial sutil inclinada con trazo delicado */}
        <Ellipse
          cx="36"
          cy="36"
          rx="31"
          ry="12"
          transform="rotate(-26 36 36)"
          stroke="rgba(167, 139, 250, 0.42)"
          strokeWidth="1.2"
          strokeDasharray="3.5 3.5"
          fill="none"
        />

        {/* Luna creciente estilizada en degradado celeste-lavanda */}
        <Path
          d="M 36 17 C 26.5 17 19 25 19 35 C 19 45 26.5 53 36 53 C 30 48.5 26.5 42 26.5 35 C 26.5 28 30 21.5 36 17 Z"
          fill="url(#emblemaLunaGrad)"
        />

        {/* Destello de 4 puntas en la trayectoria orbital */}
        <Path
          d="M 55 18 Q 55 21.5 51.5 21.5 Q 55 21.5 55 25 Q 55 21.5 58.5 21.5 Q 55 21.5 55 18 Z"
          fill={colores.celeste}
          opacity={0.92}
        />

        {/* Detalle estelar menor */}
        <Circle cx="16" cy="46" r="1.3" fill={colores.lavanda} opacity={0.8} />
      </Svg>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\GlassCard.tsx
================================================

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

================================================
ðŸ“„ ARCHIVO: src\components\GradientBackground.tsx
================================================

import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colores } from '@/constants/theme';

type Props = {
  children: ReactNode;
  /** Añade el margen superior del sistema (para pantallas sin encabezado nativo). */
  areaSegura?: boolean;
};

// Estrellas fijas en coordenadas porcentuales para atmósfera estelar
const ESTRELLAS = [
  { cx: '12%', cy: '8%', r: 1.2, o: 0.65 },
  { cx: '28%', cy: '5%', r: 0.9, o: 0.4 },
  { cx: '76%', cy: '7%', r: 1.4, o: 0.7 },
  { cx: '88%', cy: '12%', r: 0.8, o: 0.35 },
  { cx: '48%', cy: '11%', r: 1.1, o: 0.5 },
  { cx: '6%', cy: '19%', r: 1.5, o: 0.75 },
  { cx: '92%', cy: '24%', r: 1.0, o: 0.45 },
  { cx: '35%', cy: '22%', r: 0.8, o: 0.3 },
  { cx: '64%', cy: '18%', r: 1.2, o: 0.6 },
  { cx: '18%', cy: '34%', r: 1.0, o: 0.4 },
  { cx: '82%', cy: '36%', r: 1.3, o: 0.65 },
  { cx: '52%', cy: '42%', r: 0.9, o: 0.35 },
  { cx: '8%', cy: '51%', r: 1.2, o: 0.55 },
  { cx: '94%', cy: '56%', r: 1.5, o: 0.7 },
  { cx: '41%', cy: '62%', r: 0.8, o: 0.3 },
  { cx: '72%', cy: '68%', r: 1.1, o: 0.5 },
  { cx: '24%', cy: '74%', r: 1.3, o: 0.6 },
  { cx: '86%', cy: '82%', r: 0.9, o: 0.4 },
  { cx: '14%', cy: '88%', r: 1.2, o: 0.55 },
  { cx: '62%', cy: '91%', r: 1.4, o: 0.65 },
  { cx: '38%', cy: '95%', r: 0.8, o: 0.35 },
];

export function GradientBackground({ children, areaSegura = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.raiz, areaSegura && { paddingTop: insets.top }]}>
      <View style={StyleSheet.absoluteFill}>
        {/* Fondo base degradado cósmico */}
        <LinearGradient
          colors={colores.fondo}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Halos oníricos y cielo estrellado en SVG */}
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="violeta" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.violeta} stopOpacity={0.55} />
              <Stop offset="100%" stopColor={colores.halos.violeta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="magenta" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.magenta} stopOpacity={0.42} />
              <Stop offset="100%" stopColor={colores.halos.magenta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="celeste" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.celeste} stopOpacity={0.45} />
              <Stop offset="100%" stopColor={colores.halos.celeste} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="lavanda" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colores.halos.lavanda} stopOpacity={0.35} />
              <Stop offset="100%" stopColor={colores.halos.lavanda} stopOpacity={0} />
            </RadialGradient>
          </Defs>

          {/* Halos de luz ambiental */}
          <Circle cx="10%" cy="8%" r={340} fill="url(#celeste)" />
          <Circle cx="95%" cy="38%" r={320} fill="url(#magenta)" />
          <Circle cx="15%" cy="65%" r={340} fill="url(#violeta)" />
          <Circle cx="85%" cy="92%" r={300} fill="url(#lavanda)" />

          {/* Constelación sutil de estrellas */}
          {ESTRELLAS.map((star, i) => (
            <Circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#F8F7FF"
              opacity={star.o}
            />
          ))}
        </Svg>
      </View>

      {children}
    </View>
  );
}

const s = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: colores.fondo[0] },
});

================================================
ðŸ“„ ARCHIVO: src\components\IntensidadEstrellas.tsx
================================================

import { StyleSheet, View } from 'react-native';
import { Sparkle } from 'lucide-react-native';
import { colores } from '@/constants/theme';

type Props = {
  valor: number | null;
  color?: string;
  tamano?: number;
};

export function IntensidadEstrellas({
  valor = 0,
  color = colores.celeste,
  tamano = 13,
}: Props) {
  const nivel = valor ?? 0;

  return (
    <View
      style={s.fila}
      accessibilityRole="text"
      accessibilityLabel={`Intensidad: ${nivel} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((estrella) => {
        const activa = estrella <= nivel;

        return (
          <View key={estrella} style={s.estrellaContenedor}>
            <Sparkle
              size={tamano}
              color={activa ? color : 'rgba(248, 247, 255, 0.22)'}
              fill={activa ? color : 'transparent'}
            />
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  estrellaContenedor: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\LottieMood.tsx
================================================

import type { ComponentProps } from 'react';
import LottieView from 'lottie-react-native';
import type { EstadoAnimo } from '@/types';

type Fuente = ComponentProps<typeof LottieView>['source'];

const ANIMACIONES: Record<EstadoAnimo, Fuente> = {
  tranquilo: require('../../assets/animations/tranquilo-luna-linea.json'),
  lucido: require('../../assets/animations/lucido-destello-linea.json'),
  raro: require('../../assets/animations/raro-espiral-linea.json'),
  pesadilla: require('../../assets/animations/pesadilla-fantasma-linea.json'),
};

type Props = {
  estado?: string | null;
  tamano?: number;
};

export function LottieMood({ estado, tamano = 64 }: Props) {
  if (!estado || !(estado in ANIMACIONES)) return null;

  return (
    <LottieView
      source={ANIMACIONES[estado as EstadoAnimo]}
      autoPlay
      loop
      style={{ width: tamano, height: tamano }}
    />
  );
}

================================================
ðŸ“„ ARCHIVO: src\components\ModalConfirmacion.tsx
================================================

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


================================================
ðŸ“„ ARCHIVO: src\components\MoodChip.tsx
================================================

import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colores, fuentes } from '@/constants/theme';

type Props = {
  etiqueta: string;
  seleccionado: boolean;
  onPress: () => void;
  color?: string;
  icono?: ReactNode;
};

export function MoodChip({
  etiqueta,
  seleccionado,
  onPress,
  color = colores.acento,
  icono,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: seleccionado }}
      accessibilityLabel={etiqueta}
      style={({ pressed }) => [
        s.chipBase,
        seleccionado ? s.chipSeleccionado : s.chipInactivo,
        seleccionado && { backgroundColor: color, borderColor: color },
        pressed && s.chipPresionado,
      ]}
    >
      <View style={s.contenido}>
        {icono}
        <Text
          style={[
            s.texto,
            seleccionado ? s.textoSeleccionado : s.textoInactivo,
          ]}
        >
          {etiqueta}
        </Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  chipBase: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipInactivo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  },
  chipSeleccionado: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  chipPresionado: {
    opacity: 0.82,
    transform: [{ scale: 0.96 }],
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  texto: {
    fontSize: 14,
  },
  textoInactivo: {
    fontFamily: fuentes.medio,
    color: colores.tintaSuave,
  },
  textoSeleccionado: {
    fontFamily: fuentes.fuerte,
    color: '#06071B',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\SelectorIntensidad.tsx
================================================

import { colores, fuentes } from "@/constants/theme";
import { Sparkles } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  valor: number;
  onChange: (n: number) => void;
  color?: string;
};

const DESCRIPCIONES: Record<number, string> = {
  1: "Muy tenue",
  2: "Leve",
  3: "Moderado",
  4: "Intenso",
  5: "Muy intenso",
};

export function SelectorIntensidad({
  valor,
  onChange,
  color = colores.acento,
}: Props) {
  return (
    <View style={s.contenedor}>
      <View style={s.fila}>
        {[1, 2, 3, 4, 5].map((n) => {
          const activa = n <= valor;
          return (
            <Pressable
              key={n}
              onPress={() => onChange(n)}
              accessibilityRole="button"
              accessibilityLabel={`Intensidad ${n}: ${DESCRIPCIONES[n]}`}
              accessibilityState={{ selected: n === valor }}
              style={({ pressed }) => [s.boton, pressed && s.botonPresionado]}
            >
              <View
                style={[
                  s.circulo,
                  activa
                    ? {
                        backgroundColor: `${color}28`,
                        borderColor: `${color}99`,
                      }
                    : s.circuloInactivo,
                ]}
              >
                <Sparkles
                  size={20}
                  color={activa ? color : colores.tintaTenue}
                  strokeWidth={activa ? 2 : 1.5}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
      <Text style={s.descripcion}>{DESCRIPCIONES[valor] ?? ""}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: {
    alignItems: "center",
    gap: 10,
  },
  fila: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  boton: {
    minWidth: 50,
    alignItems: "center",
  },
  botonPresionado: {
    opacity: 0.75,
    transform: [{ scale: 0.9 }],
  },
  circulo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circuloInactivo: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  descripcion: {
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.tintaTenue,
    letterSpacing: 0.3,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\SuenoCard.tsx
================================================

/* eslint-disable react-hooks/immutability */
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { GlassCard } from '@/components/GlassCard';
import { IntensidadEstrellas } from '@/components/IntensidadEstrellas';
import { DESENFOQUE_EN_LISTAS, colorDeEstado, fuentes } from '@/constants/theme';
import type { SuenoConSimbolos } from '@/types';

type Props = {
  sueno: SuenoConSimbolos;
  index: number;
  onPress: () => void;
};

function formatearFecha(fecha?: string | null) {
  if (!fecha) return '';
  const d = new Date(`${fecha}T00:00:00`);
  return d.toLocaleDateString('es-EC', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function SuenoCardComponent({ sueno, index, onPress }: Props) {
  const scale = useSharedValue(1);
  const color = colorDeEstado(sueno.estado_animo);

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withTiming(0.978, { duration: 100 });
  }

  function handlePressOut() {
    scale.value = withSpring(1, { damping: 15, stiffness: 220 });
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(380)
        .delay(Math.min(index * 50, 300))
        .springify()
        .damping(18)}
      style={estiloAnimado}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`Abrir sueño: ${sueno.titulo}`}
        style={s.pressable}
      >
        <GlassCard
          desenfoque={DESENFOQUE_EN_LISTAS}
          acento={color}
          relleno="p-4"
        >
          {/* Cabecera de la tarjeta: Fecha y Estado de ánimo */}
          <View style={s.filaCabecera}>
            <View style={s.fechaBadge}>
              <Text style={s.fechaTexto}>{formatearFecha(sueno.fecha)}</Text>
            </View>

            <View
              style={[
                s.estadoBadge,
                {
                  backgroundColor: `${color}18`,
                  borderColor: `${color}40`,
                },
              ]}
            >
              <View style={[s.estadoPunto, { backgroundColor: color }]} />
              <Text style={[s.estadoTexto, { color }]}>
                {sueno.estado_animo ?? 'sin estado'}
              </Text>
            </View>
          </View>

          {/* Título editorial en Fraunces */}
          <Text style={s.titulo} numberOfLines={2}>
            {sueno.titulo}
          </Text>

          {/* Fragmento del relato */}
          {sueno.relato ? (
            <Text style={s.relato} numberOfLines={2}>
              {sueno.relato}
            </Text>
          ) : null}

          {/* Pie de tarjeta: Símbolos e Intensidad */}
          <View style={s.filaPie}>
            {/* Lista de símbolos asociados */}
            <View style={s.contenedorSimbolos}>
              {sueno.simbolos.length > 0 ? (
                sueno.simbolos.slice(0, 3).map((simbolo) => (
                  <View key={simbolo} style={s.simboloChip}>
                    <Text style={s.simboloTexto}>#{simbolo}</Text>
                  </View>
                ))
              ) : (
                <View style={{ flex: 1 }} />
              )}
              {sueno.simbolos.length > 3 && (
                <Text style={s.masSimbolosTexto}>+{sueno.simbolos.length - 3}</Text>
              )}
            </View>

            {/* Intensidad con estrellas celestes */}
            <View style={s.intensidadWrapper}>
              <IntensidadEstrellas valor={sueno.intensidad} color={color} />
            </View>
          </View>
        </GlassCard>
      </Pressable>
    </Animated.View>
  );
}

export const SuenoCard = memo(SuenoCardComponent);

const s = StyleSheet.create({
  pressable: {
    borderRadius: 24,
  },
  filaCabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fechaBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  fechaTexto: {
    fontFamily: fuentes.medio,
    fontSize: 12,
    color: 'rgba(248, 247, 255, 0.55)',
    textTransform: 'capitalize',
  },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 999,
    borderWidth: 1,
  },
  estadoPunto: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  estadoTexto: {
    fontFamily: fuentes.fuerte,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 19,
    lineHeight: 25,
    color: '#F8F7FF',
    letterSpacing: -0.2,
  },
  relato: {
    fontFamily: fuentes.cuerpo,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(248, 247, 255, 0.70)',
    marginTop: 6,
  },
  filaPie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
  },
  contenedorSimbolos: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  simboloChip: {
    backgroundColor: 'rgba(167, 139, 250, 0.10)',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.20)',
  },
  simboloTexto: {
    fontFamily: fuentes.medio,
    fontSize: 11,
    color: '#C4B5FD',
  },
  masSimbolosTexto: {
    fontFamily: fuentes.medio,
    fontSize: 11,
    color: 'rgba(248, 247, 255, 0.45)',
  },
  intensidadWrapper: {
    paddingLeft: 6,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\SuenoForm.tsx
================================================

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Plus, Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { LottieMood } from '@/components/LottieMood';
import { MoodChip } from '@/components/MoodChip';
import { SelectorIntensidad } from '@/components/SelectorIntensidad';
import { colorDeEstado, colores, fuentes } from '@/constants/theme';
import { useSimbolos } from '@/hooks/useSimbolos';
import { mensajeError } from '@/lib/errores';
import type { EstadoAnimo, NuevoSueno } from '@/types';

const ESTADOS: EstadoAnimo[] = ['tranquilo', 'lucido', 'raro', 'pesadilla'];
const ETIQUETAS: Record<EstadoAnimo, string> = {
  tranquilo: 'Tranquilo',
  lucido: 'Lúcido',
  raro: 'Raro',
  pesadilla: 'Pesadilla',
};

type Props = {
  inicial?: Partial<NuevoSueno>;
  simbolosIniciales?: string[];
  textoBoton: string;
  onGuardar: (datos: NuevoSueno, simboloIds: string[]) => Promise<void>;
  children?: ReactNode;
};

export function SuenoForm({ inicial, simbolosIniciales = [], textoBoton, onGuardar, children }: Props) {
  const insets = useSafeAreaInsets();
  const espacioSuperior = insets.top + (Platform.OS === 'ios' ? 52 : 56);
  const { simbolos, recargar } = useSimbolos();
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '');
  const [relato, setRelato] = useState(inicial?.relato ?? '');
  const [estado, setEstado] = useState<EstadoAnimo>((inicial?.estado_animo as EstadoAnimo) ?? 'tranquilo');
  const [intensidad, setIntensidad] = useState(inicial?.intensidad ?? 3);
  const [elegidos, setElegidos] = useState<string[]>(simbolosIniciales);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  // Animated.Value para la animación de éxito — useMemo evita recrearla en cada render
  // y el React Compiler no la trata como un ref que se lee durante el render.
  const exitoOpacidad = useMemo(() => new Animated.Value(0), []);

  const color = colorDeEstado(estado);

  useEffect(() => {
    recargar();
  }, [recargar]);

  function mostrarExito() {
    setGuardadoExitoso(true);
    Animated.sequence([
      Animated.timing(exitoOpacidad, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(600),
      Animated.timing(exitoOpacidad, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }

  function alternar(id: string) {
    setElegidos((actual) => (actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id]));
  }

  async function enviar() {
    if (!titulo.trim()) {
      setError('El título es obligatorio.');
      return;
    }
    setGuardando(true);
    setError(null);
    try {
      await onGuardar(
        { titulo: titulo.trim(), relato: relato.trim() || null, estado_animo: estado, intensidad },
        elegidos
      );
      mostrarExito();
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.back();
    } catch (e) {
      setError(mensajeError(e, 'No se pudo guardar.'));
    } finally {
      setGuardando(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 20,
          paddingTop: espacioSuperior,
          paddingBottom: insets.bottom + 48,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Tarjeta: Título y relato ── */}
        <GlassCard relleno="p-5">
          <View style={s.seccionEncabezado}>
            <View style={[s.accentBar, { backgroundColor: colores.celeste }]} />
            <Text style={s.seccionTitulo}>El sueño</Text>
          </View>
          <View style={s.camposGap}>
            <Campo
              etiqueta="Título"
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ej. Volaba sobre el mar"
            />
            <Campo
              etiqueta="Relato"
              value={relato}
              onChangeText={setRelato}
              multilinea
              placeholder="Cuéntalo con detalle mientras lo recuerdes…"
            />
          </View>
        </GlassCard>

        {/* ── Tarjeta: Estado de ánimo e intensidad ── */}
        <GlassCard relleno="p-5">
          <View style={s.seccionEncabezado}>
            <View style={[s.accentBar, { backgroundColor: color }]} />
            <Text style={s.seccionTitulo}>Cómo se sintió</Text>
          </View>

          {/* Lottie central */}
          <View style={s.lottieFila}>
            <View style={[s.lottieCirculo, { backgroundColor: `${color}28` }]}>
              <LottieMood estado={estado} tamano={96} />
            </View>
          </View>

          {/* Chips de estado */}
          <View style={s.chipsEstado}>
            {ESTADOS.map((e) => (
              <MoodChip
                key={e}
                etiqueta={ETIQUETAS[e]}
                seleccionado={estado === e}
                color={colorDeEstado(e)}
                onPress={() => setEstado(e)}
              />
            ))}
          </View>

          {/* Separador sutil */}
          <View style={s.separador} />

          {/* Intensidad */}
          <Text style={s.subseccionTitulo}>Intensidad del sueño</Text>
          <SelectorIntensidad valor={intensidad} onChange={setIntensidad} color={color} />
        </GlassCard>

        {/* ── Tarjeta: Símbolos ── */}
        <GlassCard relleno="p-5">
          <View style={s.seccionEncabezado}>
            <View style={[s.accentBar, { backgroundColor: colores.lavanda }]} />
            <Text style={s.seccionTitulo}>Símbolos del sueño</Text>
          </View>

          {simbolos.length === 0 ? (
            <Pressable
              onPress={() => router.push('/simbolos/nuevo')}
              style={({ pressed }) => [s.crearSimboloBoton, pressed && s.crearSimboloPresionado]}
            >
              <Plus size={18} color={colores.acento} />
              <Text style={s.crearSimboloTexto}>Crea tu primer símbolo</Text>
            </Pressable>
          ) : (
            <View style={s.chipsSimbolos}>
              {simbolos.map((sim) => (
                <MoodChip
                  key={sim.id}
                  etiqueta={sim.nombre}
                  seleccionado={elegidos.includes(sim.id)}
                  color={colores.lavanda}
                  onPress={() => alternar(sim.id)}
                />
              ))}
            </View>
          )}
        </GlassCard>

        {/* ── Error ── */}
        {error && <Text style={s.textoError}>{error}</Text>}

        {/* ── Confirmación de guardado ── */}
        {guardadoExitoso && (
          <Animated.View style={[s.exitoFila, { opacity: exitoOpacidad }]}>
            <Sparkles size={15} color={colores.celeste} />
            <Text style={s.exitoTexto}>Sueño guardado</Text>
          </Animated.View>
        )}

        {/* ── Botón principal ── */}
        <Boton texto={textoBoton} onPress={enviar} cargando={guardando} />

        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  seccionEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  accentBar: {
    width: 3,
    height: 18,
    borderRadius: 2,
  },
  seccionTitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 18,
    color: colores.tinta,
    letterSpacing: 0.1,
  },
  camposGap: {
    gap: 16,
  },
  lottieFila: {
    alignItems: 'center',
    marginBottom: 16,
  },
  lottieCirculo: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  chipsEstado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  separador: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 16,
  },
  subseccionTitulo: {
    fontFamily: fuentes.medio,
    fontSize: 13.5,
    color: colores.tintaSuave,
    letterSpacing: 0.2,
    marginBottom: 14,
    textAlign: 'center',
  },
  chipsSimbolos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  crearSimboloBoton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  crearSimboloPresionado: {
    opacity: 0.6,
  },
  crearSimboloTexto: {
    fontFamily: fuentes.medio,
    fontSize: 15,
    color: colores.tinta,
  },
  textoError: {
    fontFamily: fuentes.medio,
    fontSize: 13.5,
    color: colores.error,
    textAlign: 'center',
  },
  exitoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  exitoTexto: {
    fontFamily: fuentes.medio,
    fontSize: 13.5,
    color: colores.celeste,
    letterSpacing: 0.3,
  },
});


================================================
ðŸ“„ ARCHIVO: src\constants\theme.ts
================================================

export const colores = {
  fondo: ['#06071B', '#110A38', '#25084A'] as const,
  halos: {
    violeta: '#7C3AED',
    magenta: '#D946EF',
    turquesa: '#22D3EE',
    celeste: '#38BDF8',
    lavanda: '#C4B5FD',
    luna: '#E0F2FE',
  },
  tinta: '#F8F7FF',
  tintaSuave: 'rgba(248,247,255,0.74)',
  tintaTenue: 'rgba(248,247,255,0.45)',
  tintaOscura: '#06071B',
  vidrio: 'rgba(255,255,255,0.08)',
  vidrioBrillo: 'rgba(255,255,255,0.18)',
  campo: 'rgba(255,255,255,0.06)',
  borde: 'rgba(255,255,255,0.18)',
  bordeSutil: 'rgba(255,255,255,0.09)',
  bordeLuz: 'rgba(255,255,255,0.32)',
  acento: '#8B5CF6',
  acentoFin: '#D946EF',
  celeste: '#38BDF8',
  lavanda: '#A78BFA',
  error: '#FDA4AF',
  estado: {
    tranquilo: '#38BDF8',
    lucido: '#A78BFA',
    raro: '#F0ABFC',
    pesadilla: '#FB7185',
  },
} as const;

export const fuentes = {
  titulo: 'Fraunces_600SemiBold',
  cuerpo: 'Manrope_400Regular',
  medio: 'Manrope_600SemiBold',
  fuerte: 'Manrope_700Bold',
} as const;

export const radios = { tarjeta: 24, campo: 16, boton: 18, chip: 999 } as const;

// Si la lista va lenta en un Android antiguo, ponlo en false.
export const DESENFOQUE_EN_LISTAS = true;

export function colorDeEstado(estado?: string | null): string {
  if (estado && estado in colores.estado) {
    return colores.estado[estado as keyof typeof colores.estado];
  }
  return colores.acento;
}

================================================
ðŸ“„ ARCHIVO: src\hooks\useAuth.tsx
================================================

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import * as auth from '@/services/auth';

type AuthContextType = {
  session: Session | null;
  cargando: boolean;
  registrar: typeof auth.registrar;
  iniciarSesion: typeof auth.iniciarSesion;
  cerrarSesion: typeof auth.cerrarSesion;
  verificarCodigo: typeof auth.verificarCodigo;
  reenviarCodigo: typeof auth.reenviarCodigo;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    auth
      .obtenerSesion()
      .then(setSession)
      .catch(() => setSession(null))
      .finally(() => setCargando(false));

    return auth.escucharSesion(setSession);
  }, []);

  const valor = useMemo(
    () => ({
      session,
      cargando,
      registrar: auth.registrar,
      iniciarSesion: auth.iniciarSesion,
      cerrarSesion: auth.cerrarSesion,
      verificarCodigo: auth.verificarCodigo,
      reenviarCodigo: auth.reenviarCodigo,
    }),
    [session, cargando]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}

================================================
ðŸ“„ ARCHIVO: src\hooks\useSimbolos.ts
================================================

import { useCallback, useState } from 'react';
import * as servicio from '@/services/simbolos';
import { mensajeError } from '@/lib/errores';
import type { Simbolo } from '@/types';

export function useSimbolos() {
  const [simbolos, setSimbolos] = useState<Simbolo[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setSimbolos(await servicio.listarSimbolos());
    } catch (e) {
      setError(mensajeError(e, 'No se pudieron cargar los símbolos.'));
    } finally {
      setCargando(false);
    }
  }, []);

  return {
    simbolos,
    cargando,
    error,
    recargar,
    obtener: servicio.obtenerSimbolo,
    crear: servicio.crearSimbolo,
    actualizar: servicio.actualizarSimbolo,
    borrar: servicio.borrarSimbolo,
  };
}

================================================
ðŸ“„ ARCHIVO: src\hooks\useSuenos.ts
================================================

import { useCallback, useState } from 'react';
import * as servicio from '@/services/suenos';
import { mensajeError } from '@/lib/errores';
import type { SuenoConSimbolos } from '@/types';

export function useSuenos() {
  const [suenos, setSuenos] = useState<SuenoConSimbolos[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setSuenos(await servicio.listarSuenos());
    } catch (e) {
      setError(mensajeError(e, 'No se pudieron cargar los sueños.'));
    } finally {
      setCargando(false);
    }
  }, []);

  return {
    suenos,
    cargando,
    error,
    recargar,
    obtener: servicio.obtenerSueno,
    crear: servicio.crearSueno,
    actualizar: servicio.actualizarSueno,
    borrar: servicio.borrarSueno,
    listarSimbolosDeSueno: servicio.listarSimbolosDeSueno,
    guardarSimbolos: servicio.guardarSimbolosDeSueno,
  };
}

================================================
ðŸ“„ ARCHIVO: src\lib\errores.ts
================================================

export function mensajeError(e: unknown, porDefecto = 'Ocurrió un error.'): string {
  if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
    return e.message;
  }
  return porDefecto;
}

================================================
ðŸ“„ ARCHIVO: src\lib\supabase.ts
================================================

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import type { Database } from '@/types/database';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!url || !key) {
  throw new Error('Faltan EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_KEY en el .env');
}

export const supabase = createClient<Database>(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});

// Solo renueva la sesión mientras la app está en primer plano
AppState.addEventListener('change', (estado) => {
  if (estado === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

================================================
ðŸ“„ ARCHIVO: src\services\auth.ts
================================================

import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export async function registrar(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'diariosuenos://confirm',
    },
  });
  if (error) throw error;
  return data;
}

export async function intercambiarCodigoPorSesion(code: string) {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) throw error;
  return data;
}

export async function iniciarSesion(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function obtenerSesion() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function escucharSesion(callback: (session: Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_evento, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function verificarCodigo(email: string, codigo: string) {
  const { data, error } = await supabase.auth.verifyOtp({ email, token: codigo, type: 'email' });
  if (error) throw error;
  return data;
}

export async function reenviarCodigo(email: string) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: 'diariosuenos://confirm',
    },
  });
  if (error) throw error;
}

================================================
ðŸ“„ ARCHIVO: src\services\simbolos.ts
================================================

import { supabase } from '@/lib/supabase';
import type { EditarSimbolo, NuevoSimbolo, Simbolo } from '@/types';

function traducir(error: { code?: string; message: string }): Error {
  if (error.code === '23505') return new Error('Ya tienes un símbolo con ese nombre.');
  return new Error(error.message);
}

export async function listarSimbolos(): Promise<Simbolo[]> {
  const { data, error } = await supabase.from('simbolos').select('*').order('nombre');
  if (error) throw traducir(error);
  return data;
}

export async function obtenerSimbolo(id: string): Promise<Simbolo> {
  const { data, error } = await supabase.from('simbolos').select('*').eq('id', id).single();
  if (error) throw traducir(error);
  return data;
}

export async function crearSimbolo(simbolo: NuevoSimbolo): Promise<Simbolo> {
  const { data, error } = await supabase.from('simbolos').insert(simbolo).select().single();
  if (error) throw traducir(error);
  return data;
}

export async function actualizarSimbolo(id: string, cambios: EditarSimbolo): Promise<Simbolo> {
  const { data, error } = await supabase.from('simbolos').update(cambios).eq('id', id).select().single();
  if (error) throw traducir(error);
  return data;
}

export async function borrarSimbolo(id: string): Promise<void> {
  const { error } = await supabase.from('simbolos').delete().eq('id', id);
  if (error) throw traducir(error);
}

================================================
ðŸ“„ ARCHIVO: src\services\suenos.ts
================================================

import { supabase } from '@/lib/supabase';
import type { EditarSueno, NuevoSueno, Sueno, SuenoConSimbolos } from '@/types';

type FilaConSimbolos = Sueno & {
  suenos_simbolos: { simbolos: { nombre: string } | null }[] | null;
};

export async function listarSuenos(): Promise<SuenoConSimbolos[]> {
  const { data, error } = await supabase
    .from('suenos')
    .select('*, suenos_simbolos(simbolos(nombre))')
    .order('fecha', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;

  const filas = data as unknown as FilaConSimbolos[];
  return filas.map(({ suenos_simbolos, ...sueno }) => ({
    ...sueno,
    simbolos: (suenos_simbolos ?? []).flatMap((r) => (r.simbolos ? [r.simbolos.nombre] : [])),
  }));
}

export async function obtenerSueno(id: string): Promise<Sueno> {
  const { data, error } = await supabase.from('suenos').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function crearSueno(sueno: NuevoSueno): Promise<Sueno> {
  const { data, error } = await supabase.from('suenos').insert(sueno).select().single();
  if (error) throw error;
  return data;
}

export async function actualizarSueno(id: string, cambios: EditarSueno): Promise<Sueno> {
  const { data, error } = await supabase.from('suenos').update(cambios).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function borrarSueno(id: string): Promise<void> {
  const { error } = await supabase.from('suenos').delete().eq('id', id);
  if (error) throw error;
}

export async function listarSimbolosDeSueno(suenoId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('suenos_simbolos')
    .select('simbolo_id')
    .eq('sueno_id', suenoId);
  if (error) throw error;
  return data.map((fila) => fila.simbolo_id);
}

export async function guardarSimbolosDeSueno(suenoId: string, simboloIds: string[]): Promise<void> {
  const { error: errorBorrar } = await supabase
    .from('suenos_simbolos')
    .delete()
    .eq('sueno_id', suenoId);
  if (errorBorrar) throw errorBorrar;

  if (simboloIds.length === 0) return;

  const { error } = await supabase
    .from('suenos_simbolos')
    .insert(simboloIds.map((simbolo_id) => ({ sueno_id: suenoId, simbolo_id })));
  if (error) throw error;
}

================================================
ðŸ“„ ARCHIVO: src\types\database.ts
================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      simbolos: {
        Row: {
          created_at: string | null
          id: string
          nombre: string
          significado: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nombre: string
          significado?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nombre?: string
          significado?: string | null
          user_id?: string
        }
        Relationships: []
      }
      suenos: {
        Row: {
          created_at: string | null
          estado_animo: string | null
          fecha: string | null
          id: string
          intensidad: number | null
          relato: string | null
          titulo: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          estado_animo?: string | null
          fecha?: string | null
          id?: string
          intensidad?: number | null
          relato?: string | null
          titulo: string
          user_id?: string
        }
        Update: {
          created_at?: string | null
          estado_animo?: string | null
          fecha?: string | null
          id?: string
          intensidad?: number | null
          relato?: string | null
          titulo?: string
          user_id?: string
        }
        Relationships: []
      }
      suenos_simbolos: {
        Row: {
          simbolo_id: string
          sueno_id: string
        }
        Insert: {
          simbolo_id: string
          sueno_id: string
        }
        Update: {
          simbolo_id?: string
          sueno_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suenos_simbolos_simbolo_id_fkey"
            columns: ["simbolo_id"]
            isOneToOne: false
            referencedRelation: "simbolos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suenos_simbolos_sueno_id_fkey"
            columns: ["sueno_id"]
            isOneToOne: false
            referencedRelation: "suenos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const


================================================
ðŸ“„ ARCHIVO: src\types\index.ts
================================================

import type { Database } from './database';

export type Sueno = Database['public']['Tables']['suenos']['Row'];
export type NuevoSueno = Database['public']['Tables']['suenos']['Insert'];
export type EditarSueno = Database['public']['Tables']['suenos']['Update'];

export type Simbolo = Database['public']['Tables']['simbolos']['Row'];
export type NuevoSimbolo = Database['public']['Tables']['simbolos']['Insert'];
export type EditarSimbolo = Database['public']['Tables']['simbolos']['Update'];

export type EstadoAnimo = 'tranquilo' | 'lucido' | 'raro' | 'pesadilla';
export type SuenoConSimbolos = Sueno & { simbolos: string[] };

================================================
ðŸ“„ ARCHIVO: tsconfig.json
================================================

{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@/assets/*": [
        "./assets/*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}


================================================
ðŸ“„ ARCHIVO: uniwind-types.d.ts
================================================

// NOTE: This file is generated by uniwind and it should not be edited manually.
/// <reference types="uniwind/types" />

declare module 'uniwind' {
    export interface UniwindConfig {
        themes: readonly ['light', 'dark']
    }
}

export {}
