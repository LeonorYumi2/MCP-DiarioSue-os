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
          "backgroundColor": "#208AEF",
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
    }
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

import { useCallback, type ReactNode } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LogOut, Moon, Plus, Tags } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { DESENFOQUE_EN_LISTAS, colorDeEstado, colores } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { useSuenos } from '@/hooks/useSuenos';

function formatearFecha(fecha?: string | null) {
  if (!fecha) return '';
  return new Date(`${fecha}T00:00:00`).toLocaleDateString('es-EC', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function Intensidad({ valor, color }: { valor: number | null; color: string }) {
  return (
    <View className="flex-row gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <View
          key={n}
          className={`h-2 w-2 rounded-full ${n <= (valor ?? 0) ? '' : 'bg-white/20'}`}
          style={n <= (valor ?? 0) ? { backgroundColor: color } : undefined}
        />
      ))}
    </View>
  );
}

function BotonIcono({ onPress, etiqueta, children }: { onPress: () => void; etiqueta: string; children: ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={etiqueta}
      className="h-11 w-11 items-center justify-center rounded-full border border-borde bg-campo active:opacity-70"
    >
      {children}
    </Pressable>
  );
}

export default function Inicio() {
  const { cerrarSesion } = useAuth();
  const { suenos, cargando, error, recargar } = useSuenos();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  return (
    <GradientBackground areaSegura>
      <View className="flex-row items-center gap-2 px-5 pt-3">
        <View className="flex-1">
          <Text className="font-titulo text-4xl tracking-tight text-tinta">Tus sueños</Text>
          <Text className="mt-0.5 font-cuerpo text-sm text-tinta-suave">
            {suenos.length === 1 ? '1 sueño anotado' : `${suenos.length} sueños anotados`}
          </Text>
        </View>
        <BotonIcono etiqueta="Símbolos" onPress={() => router.push('/simbolos')}>
          <Tags size={20} color={colores.tinta} />
        </BotonIcono>
        <BotonIcono etiqueta="Cerrar sesión" onPress={() =>
            Alert.alert(
              'Cerrar sesión',
              '¿Seguro que quieres salir? Tus sueños seguirán guardados.',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Salir', style: 'destructive', onPress: () => cerrarSesion() },
              ]
            )
          }>
          <LogOut size={20} color={colores.tinta} />
        </BotonIcono>
      </View>

      {error && <Text className="mt-2 px-5 font-medio text-sm text-peligro">{error}</Text>}

      <FlatList
        data={suenos}
        keyExtractor={(item) => item.id}
        refreshing={cargando}
        onRefresh={recargar}
        contentContainerStyle={{ gap: 14, padding: 20, paddingBottom: insets.bottom + 100 }}
        ListEmptyComponent={
          !cargando ? (
            <View className="mt-20 items-center px-6">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full border border-borde bg-campo">
                <Moon size={28} color={colores.tintaSuave} />
              </View>
              <Text className="text-center font-cuerpo text-base leading-6 text-tinta-suave">
                Aún no hay sueños. Anota el primero antes de que se te olvide.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          const color = colorDeEstado(item.estado_animo);
          return (
            <Pressable
              onPress={() => router.push({ pathname: '/sueno/[id]', params: { id: item.id } })}
              className="active:opacity-80"
            >
              <GlassCard desenfoque={DESENFOQUE_EN_LISTAS} acento={color} relleno="py-4 pl-5 pr-4">
                <View className="flex-row items-baseline gap-2.5">
                  <Text className="flex-1 font-fuerte text-lg text-tinta" numberOfLines={1}>
                    {item.titulo}
                  </Text>
                  <Text className="font-medio text-xs text-tinta-tenue">{formatearFecha(item.fecha)}</Text>
                </View>

                {item.relato ? (
                  <Text className="mt-1.5 font-cuerpo text-sm leading-5 text-tinta-suave" numberOfLines={2}>
                    {item.relato}
                  </Text>
                ) : null}

                <View className="mt-3 flex-row items-center justify-between">
                  <Text className="font-fuerte text-sm" style={{ color }}>
                    {item.estado_animo ?? 'sin estado'}
                  </Text>
                  <Intensidad valor={item.intensidad} color={color} />
                </View>

                {item.simbolos.length > 0 && (
                  <Text className="mt-2.5 font-medio text-sm text-tinta-suave" numberOfLines={1}>
                    {item.simbolos.map((n) => `#${n}`).join('   ')}
                  </Text>
                )}
              </GlassCard>
            </Pressable>
          );
        }}
      />

      <View className="absolute left-5 right-5" style={{ bottom: insets.bottom + 16 }}>
        <Boton
          texto="Nuevo sueño"
          onPress={() => router.push('/sueno/nuevo')}
          icono={<Plus size={20} color={colores.tinta} />}
        />
      </View>
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(app)\simbolos\index.tsx
================================================

import { useCallback } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
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
        contentContainerStyle={{ gap: 12, padding: 20, paddingBottom: insets.bottom + 100 }}
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
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores } from '@/constants/theme';
import { useSimbolos } from '@/hooks/useSimbolos';
import { mensajeError } from '@/lib/errores';

export default function FormularioSimbolo() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editando = !!id;
  const { obtener, crear, actualizar, borrar } = useSimbolos();

  const [nombre, setNombre] = useState('');
  const [significado, setSignificado] = useState('');
  const [listo, setListo] = useState(!id);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function confirmarBorrado() {
    Alert.alert('Eliminar símbolo', 'Se quitará también de los sueños que lo usan.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await borrar(id!);
            router.back();
          } catch (e) {
            Alert.alert('No se pudo eliminar', mensajeError(e));
          }
        },
      },
    ]);
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
  contentContainerStyle={{ gap: 16, padding: 20, paddingBottom: 48 }}
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

          {editando && <Boton texto="Eliminar símbolo" onPress={confirmarBorrado} variante="peligro" />}
        </ScrollView>
      )}
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(app)\sueno\nuevo.tsx
================================================

import { router } from 'expo-router';
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
          router.back();
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
import { Boton } from '@/components/Boton';
import { GradientBackground } from '@/components/GradientBackground';
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

  useEffect(() => {
    Promise.all([obtener(id), listarSimbolosDeSueno(id)])
      .then(([datos, ids]) => {
        setSueno(datos);
        setSeleccion(ids);
      })
      .catch((e) => setError(mensajeError(e, 'No se pudo cargar el sueño.')));
  }, [id, obtener, listarSimbolosDeSueno]);

  function confirmarBorrado() {
    Alert.alert('Eliminar sueño', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await borrar(id);
            router.back();
          } catch (e) {
            Alert.alert('No se pudo eliminar', mensajeError(e));
          }
        },
      },
    ]);
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
          router.back();
        }}
      >
        <Boton texto="Eliminar sueño" onPress={confirmarBorrado} variante="peligro" />
      </SuenoForm>
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(app)\_layout.tsx
================================================

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

================================================
ðŸ“„ ARCHIVO: src\app\(auth)\login.tsx
================================================

import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Moon } from 'lucide-react-native';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { mensajeError } from '@/lib/errores';

export default function Login() {
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
      await iniciarSesion(email.trim(), password);
    } catch (e) {
      Alert.alert('No se pudo iniciar sesión', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <GradientBackground areaSegura>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-5 h-14 w-14 items-center justify-center rounded-2xl border border-borde bg-campo">
            <Moon size={26} color={colores.tinta} />
          </View>

          <Text className="font-titulo text-5xl leading-13 tracking-tight text-tinta">
            Diario{'\n'}de sueños
          </Text>
          <Text className="mt-3 font-cuerpo text-base leading-6 text-tinta-suave">
            Anota lo que soñaste antes de que se te olvide.
          </Text>

          <GlassCard className="mt-8" relleno="p-5">
            <View className="gap-4">
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

          <Pressable onPress={() => router.push('/registro')} className="mt-6 items-center py-2 active:opacity-70">
            <Text className="font-medio text-base text-tinta">¿Primera vez? Crea tu cuenta</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

================================================
ðŸ“„ ARCHIVO: src\app\(auth)\registro.tsx
================================================

import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MailCheck, UserPlus } from 'lucide-react-native';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { colores } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { mensajeError } from '@/lib/errores';

export default function Registro() {
  const { registrar, verificarCodigo, reenviarCodigo } = useAuth();
  const [paso, setPaso] = useState<'datos' | 'codigo'>('datos');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codigo, setCodigo] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function crearCuenta() {
    if (!email.trim() || password.length < 6) {
      Alert.alert('Revisa los datos', 'Escribe un correo y una contraseña de al menos 6 caracteres.');
      return;
    }
    setEnviando(true);
    try {
      const { session } = await registrar(email.trim(), password);
      if (!session) setPaso('codigo');
    } catch (e) {
      Alert.alert('No se pudo crear la cuenta', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  async function confirmar() {
    if (codigo.trim().length < 6) {
      Alert.alert('Código incompleto', 'Escribe el código que llegó a tu correo.');
      return;
    }
    setEnviando(true);
    try {
      await verificarCodigo(email.trim(), codigo.trim());
    } catch (e) {
      Alert.alert('Código incorrecto o vencido', mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  async function reenviar() {
    try {
      await reenviarCodigo(email.trim());
      Alert.alert('Código enviado', 'Te enviamos un código nuevo.');
    } catch (e) {
      Alert.alert('No se pudo reenviar', mensajeError(e));
    }
  }

  const enCodigo = paso === 'codigo';
  const Icono = enCodigo ? MailCheck : UserPlus;

  return (
    <GradientBackground areaSegura>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-5 h-14 w-14 items-center justify-center rounded-2xl border border-borde bg-campo">
            <Icono size={26} color={colores.tinta} />
          </View>

          <Text className="font-titulo text-4xl leading-10 tracking-tight text-tinta">
            {enCodigo ? 'Revisa tu correo' : 'Crea tu cuenta'}
          </Text>
          <Text className="mt-3 font-cuerpo text-base leading-6 text-tinta-suave">
            {enCodigo
              ? `Enviamos un código a ${email.trim()}. Escríbelo para activar tu cuenta.`
              : 'Guarda tus sueños en un lugar privado, solo tuyo.'}
          </Text>

          <GlassCard className="mt-8" relleno="p-5">
            {enCodigo ? (
              <View className="gap-4">
                <Campo
                  etiqueta="Código de verificación"
                  value={codigo}
                  onChangeText={setCodigo}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholder="Código"
                />
                <Boton texto="Confirmar cuenta" onPress={confirmar} cargando={enviando} className="mt-1" />
                <Boton texto="Reenviar código" onPress={reenviar} variante="vidrio" />
              </View>
            ) : (
              <View className="gap-4">
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
                <Boton texto="Crear cuenta" onPress={crearCuenta} cargando={enviando} className="mt-1" />
              </View>
            )}
          </GlassCard>

          <Pressable
            onPress={() => (enCodigo ? setPaso('datos') : router.push('/login'))}
            className="mt-6 items-center py-2 active:opacity-70"
          >
            <Text className="font-medio text-base text-tinta">
              {enCodigo ? 'Cambiar correo' : '¿Ya tienes cuenta? Inicia sesión'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

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

================================================
ðŸ“„ ARCHIVO: src\components\GlassCard.tsx
================================================

import { StyleSheet, View, type ViewProps } from 'react-native';
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
    <View className={`overflow-hidden rounded-3xl border border-borde ${className}`} {...resto}>
      {desenfoque && (
        <GlassView
          glassEffectStyle="clear"
          tintColor="rgba(139,92,246,0.16)"
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

export function GradientBackground({ children, areaSegura = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.raiz, areaSegura && { paddingTop: insets.top }]}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={colores.fondo} style={StyleSheet.absoluteFill} />
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="violeta" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colores.halos.violeta} stopOpacity={0.75} />
              <Stop offset="1" stopColor={colores.halos.violeta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="magenta" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colores.halos.magenta} stopOpacity={0.6} />
              <Stop offset="1" stopColor={colores.halos.magenta} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="turquesa" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colores.halos.turquesa} stopOpacity={0.55} />
              <Stop offset="1" stopColor={colores.halos.turquesa} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx="0%" cy="6%" r={320} fill="url(#violeta)" />
          <Circle cx="100%" cy="46%" r={300} fill="url(#magenta)" />
          <Circle cx="4%" cy="100%" r={320} fill="url(#turquesa)" />
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
ðŸ“„ ARCHIVO: src\components\MoodChip.tsx
================================================

import { Pressable, Text } from 'react-native';
import { colores } from '@/constants/theme';

type Props = {
  etiqueta: string;
  seleccionado: boolean;
  onPress: () => void;
  color?: string;
};

export function MoodChip({ etiqueta, seleccionado, onPress, color = colores.acento }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-2.5 active:opacity-80 ${
        seleccionado ? 'border-transparent' : 'border-borde bg-campo'
      }`}
      style={seleccionado ? { backgroundColor: color } : undefined}
    >
      <Text
        className={`text-sm ${seleccionado ? 'font-fuerte text-medianoche' : 'font-medio text-tinta-suave'}`}
      >
        {etiqueta}
      </Text>
    </Pressable>
  );
}

================================================
ðŸ“„ ARCHIVO: src\components\SuenoForm.tsx
================================================

import { useEffect, useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Boton } from '@/components/Boton';
import { Campo } from '@/components/Campo';
import { GlassCard } from '@/components/GlassCard';
import { LottieMood } from '@/components/LottieMood';
import { MoodChip } from '@/components/MoodChip';
import { colorDeEstado, colores } from '@/constants/theme';
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
  const { simbolos, recargar } = useSimbolos();
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '');
  const [relato, setRelato] = useState(inicial?.relato ?? '');
  const [estado, setEstado] = useState<EstadoAnimo>((inicial?.estado_animo as EstadoAnimo) ?? 'tranquilo');
  const [intensidad, setIntensidad] = useState(inicial?.intensidad ?? 3);
  const [elegidos, setElegidos] = useState<string[]>(simbolosIniciales);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const color = colorDeEstado(estado);

  useEffect(() => {
    recargar();
  }, [recargar]);

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
        contentContainerStyle={{ gap: 16, padding: 20, paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        <GlassCard relleno="p-5">
          <View className="gap-4">
            <Campo etiqueta="Título" value={titulo} onChangeText={setTitulo} placeholder="Ej. Volaba sobre el mar" />
            <Campo
              etiqueta="Relato"
              value={relato}
              onChangeText={setRelato}
              multilinea
              placeholder="Cuéntalo con detalle mientras lo recuerdes"
            />
          </View>
        </GlassCard>

        <GlassCard relleno="p-5">
          <Text className="font-fuerte text-lg text-tinta">Cómo se sintió</Text>

          <View className="my-4 items-center">
            <View
              className="h-28 w-28 items-center justify-center overflow-hidden rounded-full"
              style={{ backgroundColor: `${color}30` }}
            >
              <LottieMood estado={estado} tamano={96} />
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2">
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

          <Text className="mb-2 mt-5 font-medio text-sm text-tinta-suave">Intensidad</Text>
          <View className="flex-row gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <MoodChip key={n} etiqueta={String(n)} seleccionado={intensidad === n} color={color} onPress={() => setIntensidad(n)} />
            ))}
          </View>
        </GlassCard>

        <GlassCard relleno="p-5">
          <Text className="font-fuerte text-lg text-tinta">Símbolos del sueño</Text>

          {simbolos.length === 0 ? (
            <Pressable
              onPress={() => router.push('/simbolos/nuevo')}
              className="mt-3 flex-row items-center gap-2 active:opacity-70"
            >
              <Plus size={18} color={colores.acento} />
              <Text className="font-medio text-base text-tinta">Crea tu primer símbolo</Text>
            </Pressable>
          ) : (
            <View className="mt-3 flex-row flex-wrap gap-2">
              {simbolos.map((sim) => (
                <MoodChip
                  key={sim.id}
                  etiqueta={sim.nombre}
                  seleccionado={elegidos.includes(sim.id)}
                  onPress={() => alternar(sim.id)}
                />
              ))}
            </View>
          )}
        </GlassCard>

        {error && <Text className="font-medio text-sm text-peligro">{error}</Text>}

        <Boton texto={textoBoton} onPress={enviar} cargando={guardando} />

        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

================================================
ðŸ“„ ARCHIVO: src\constants\theme.ts
================================================

export const colores = {
  fondo: ['#0A0B2E', '#1E1066', '#3B0F70'] as const,
  halos: { violeta: '#7C3AED', magenta: '#D946EF', turquesa: '#22D3EE' },
  tinta: '#F5F3FF',
  tintaSuave: 'rgba(245,243,255,0.72)',
  tintaTenue: 'rgba(245,243,255,0.45)',
  tintaOscura: '#0A0B2E',
  vidrio: 'rgba(255,255,255,0.09)',
  campo: 'rgba(255,255,255,0.08)',
  borde: 'rgba(255,255,255,0.24)',
  acento: '#8B5CF6',
  acentoFin: '#D946EF',
  error: '#FDA4AF',
  estado: {
    tranquilo: '#22D3EE',
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
  const { data, error } = await supabase.auth.signUp({ email, password });
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
  const { error } = await supabase.auth.resend({ type: 'signup', email });
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
