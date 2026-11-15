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