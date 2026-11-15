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