import {ProdottoDto} from './prodottoDto';


export interface OrdineDto {
  idOrdine: number;
  dataOrdine: string;
  prodotti: ProdottoDto[];
  totale: number;
}
