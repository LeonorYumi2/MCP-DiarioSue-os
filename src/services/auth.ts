import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';

export async function registrar(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: Linking.createURL('login') },
  });
  if (error) throw error;
  return data;
}

export async function sesionDesdeUrl(url: string) {
  const fragmento = url.split('#')[1];
  if (!fragmento) return;
  const params = new URLSearchParams(fragmento);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  if (!access_token || !refresh_token) return;
  const { error } = await supabase.auth.setSession({ access_token, refresh_token });
  if (error) throw error;
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

export function escucharSesion(callback: (session: import('@supabase/supabase-js').Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_evento, session) => callback(session));
  return () => data.subscription.unsubscribe();
}