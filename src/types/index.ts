import type { Database } from './database';

export type Sueno = Database['public']['Tables']['suenos']['Row'];
export type NuevoSueno = Database['public']['Tables']['suenos']['Insert'];
export type EditarSueno = Database['public']['Tables']['suenos']['Update'];

export type Simbolo = Database['public']['Tables']['simbolos']['Row'];
export type NuevoSimbolo = Database['public']['Tables']['simbolos']['Insert'];
export type EditarSimbolo = Database['public']['Tables']['simbolos']['Update'];

export type EstadoAnimo = 'tranquilo' | 'lucido' | 'raro' | 'pesadilla';