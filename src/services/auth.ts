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