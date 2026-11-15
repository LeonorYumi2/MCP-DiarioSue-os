import * as Linking from 'expo-linking';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import * as auth from '@/services/auth';

type AuthContextType = {
  session: Session | null;
  cargando: boolean;
  registrar: typeof auth.registrar;
  iniciarSesion: typeof auth.iniciarSesion;
  cerrarSesion: typeof auth.cerrarSesion;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);
    const url = Linking.useLinkingURL();

  useEffect(() => {
    if (url) auth.sesionDesdeUrl(url).catch(() => {});
  }, [url]);

  useEffect(() => {
    auth.obtenerSesion()
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