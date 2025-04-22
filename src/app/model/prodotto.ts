import {Categoria} from './categoria';

export interface Prodotto {
  id: number;
  codiceEan: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  categoria: Categoria;
}
