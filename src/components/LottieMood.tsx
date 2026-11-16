import type { ComponentProps } from 'react';
import LottieView from 'lottie-react-native';
import type { EstadoAnimo } from '@/types';

type Fuente = ComponentProps<typeof LottieView>['source'];

const ANIMACIONES: Record<EstadoAnimo, Fuente> = {
  tranquilo: require('../../assets/animations/tranquilo.json'),
  lucido: require('../../assets/animations/lucido.json'),
  raro: require('../../assets/animations/raro.json'),
  pesadilla: require('../../assets/animations/pesadilla.json'),
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