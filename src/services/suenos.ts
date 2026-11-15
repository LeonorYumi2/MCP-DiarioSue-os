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