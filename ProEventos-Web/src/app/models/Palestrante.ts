import { Evento } from './Evento';
import { RedeSocial } from './RedeSocial';

export interface Palestrante {
  id: number;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
