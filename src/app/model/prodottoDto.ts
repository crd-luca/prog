import {Categoria} from './categoria';

export interface ProdottoDto {
  id: number;
  codiceEan: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  categoria: Categoria;
}
