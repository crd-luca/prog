import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProdottoDto} from '../model/prodottoDto';
import {Categoria} from '../model/categoria';
import {OrdineDto} from '../model/ordineDto';




@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private apiUrl = 'http://localhost:8080/catalogo/categorie'; // controller backend

  constructor(private http: HttpClient) {}

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getProdottiByCategoria(idCategoria: number): Observable<ProdottoDto[]> {
    return this.http.get<ProdottoDto[]>(`http://localhost:8080/catalogo/prodotti/categoria/${idCategoria}`);
  }

  salvaOrdine(ordineSaveDto: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/catalogo/salva', ordineSaveDto);
  }

  getOrdineById(idOrdine: number): Observable<OrdineDto> {
    return this.http.get<OrdineDto>(`${this.apiUrl}/ordine/${idOrdine}`);
  }

  getAllOrdini(): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>('http://localhost:8080/catalogo/ordini');
  }

  eliminaOrdine(idOrdine: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/catalogo/ordiniDelete/${idOrdine}`);
  }

}
