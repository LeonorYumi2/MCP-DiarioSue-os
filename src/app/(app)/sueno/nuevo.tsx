import { router } from 'expo-router';
import { SuenoForm } from '@/components/SuenoForm';
import { useSuenos } from '@/hooks/useSuenos';

export default function NuevoSueno() {
  const { crear, guardarSimbolos } = useSuenos();

  return (
    <SuenoForm
      textoBoton="Guardar sueño"
      onGuardar={async (datos, simboloIds) => {
        const nuevo = await crear(datos);
        await guardarSimbolos(nuevo.id, simboloIds);
        router.back();
      }}
    />
  );
}