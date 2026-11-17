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
