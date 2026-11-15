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