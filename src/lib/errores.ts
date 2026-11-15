export function mensajeError(e: unknown, porDefecto = 'Ocurrió un error.'): string {
  if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
    return e.message;
  }
  return porDefecto;
}