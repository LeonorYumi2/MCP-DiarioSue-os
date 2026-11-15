import { useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';
import { MoodChip } from '@/components/MoodChip';
import { useSimbolos } from '@/hooks/useSimbolos';
import { mensajeError } from '@/lib/errores';
import type { EstadoAnimo, NuevoSueno } from '@/types';

const ESTADOS: EstadoAnimo[] = ['tranquilo', 'lucido', 'raro', 'pesadilla'];

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
        {
          titulo: titulo.trim(),
          relato: relato.trim() || null,
          estado_animo: estado,
          intensidad,
        },
        elegidos
      );
    } catch (e) {
      setError(mensajeError(e, 'No se pudo guardar.'));
    } finally {
      setGuardando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={s.contenedor} keyboardShouldPersistTaps="handled">
      <Text style={s.label}>Título</Text>
      <TextInput style={s.input} value={titulo} onChangeText={setTitulo} placeholder="Ej. Volaba sobre el mar" />

      <Text style={s.label}>Relato</Text>
      <TextInput style={[s.input, s.multilinea]} value={relato} onChangeText={setRelato}
        placeholder="Cuéntalo con detalle..." multiline />

      <Text style={s.label}>Estado de ánimo</Text>
      <View style={s.fila}>
        {ESTADOS.map((e) => (
          <MoodChip key={e} etiqueta={e} seleccionado={estado === e} onPress={() => setEstado(e)} />
        ))}
      </View>

      <Text style={s.label}>Intensidad</Text>
      <View style={s.fila}>
        {[1, 2, 3, 4, 5].map((n) => (
          <MoodChip key={n} etiqueta={String(n)} seleccionado={intensidad === n} onPress={() => setIntensidad(n)} />
        ))}
      </View>

      <Text style={s.label}>Símbolos del sueño</Text>
      {simbolos.length === 0 ? (
        <Text style={s.ayuda}>
          Aún no tienes símbolos. <Link href="/simbolos/nuevo" style={s.enlace}>Crea el primero</Link>
        </Text>
      ) : (
        <View style={s.fila}>
          {simbolos.map((sim) => (
            <MoodChip key={sim.id} etiqueta={sim.nombre} seleccionado={elegidos.includes(sim.id)}
              onPress={() => alternar(sim.id)} />
          ))}
        </View>
      )}

      {error && <Text style={s.error}>{error}</Text>}

      <Pressable style={s.boton} onPress={enviar} disabled={guardando}>
        {guardando ? <ActivityIndicator color="#fff" /> : <Text style={s.botonTexto}>{textoBoton}</Text>}
      </Pressable>

      {children}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  contenedor: { padding: 20, gap: 10 },
  label: { fontWeight: '600', marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 10, padding: 12 },
  multilinea: { minHeight: 110, textAlignVertical: 'top' },
  fila: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ayuda: { color: '#666' },
  enlace: { color: '#8B5CF6', fontWeight: '600' },
  error: { color: '#DC2626' },
  boton: { backgroundColor: '#8B5CF6', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 12 },
  botonTexto: { color: '#fff', fontWeight: '600' },
});