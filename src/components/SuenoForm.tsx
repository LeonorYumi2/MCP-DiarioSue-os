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