import type { ComponentProps } from 'react';
import LottieView from 'lottie-react-native';
import type { EstadoAnimo } from '@/types';

type Fuente = ComponentProps<typeof LottieView>['source'];

const ANIMACIONES: Record<EstadoAnimo, Fuente> = {
  tranquilo: require('../../assets/animations/tranquilo-luna-linea.json'),
  lucido: require('../../assets/animations/lucido-destello-linea.json'),
  raro: require('../../assets/animations/raro-espiral-linea.json'),
  pesadilla: require('../../assets/animations/pesadilla-fantasma-linea.json'),
};

type Props = {
  estado?: string | null;
  tamano?: number;
};

export function LottieMood({ estado, tamano = 64 }: Props) {
  if (!estado || !(estado in ANIMACIONES)) return null;

  return (
    <LottieView
      source={ANIMACIONES[estado as EstadoAnimo]}
      autoPlay
      loop
      style={{ width: tamano, height: tamano }}
    />
  );
}