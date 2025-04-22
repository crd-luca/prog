import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Categoria {
  idCategoria: number;
  nomeCategoria: string;
}
export interface Prodotto {
  id: number;
  codiceEan: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  categoria: Categoria;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private apiUrl = 'http://localhost:8080/catalogo/categorie'; // controller backend

  constructor(private http: HttpClient) {}

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getProdottiByCategoria(idCategoria: number): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`http://localhost:8080/catalogo/prodotti/categoria/${idCategoria}`);
  }

}
