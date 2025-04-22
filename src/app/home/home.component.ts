import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../services/catalogo.service';
import { Categoria } from '../model/categoria';
import { Prodotto } from '../model/prodotto';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',]
})
export class HomeComponent implements OnInit {
  categorie: Categoria[] = [];  // Array per memorizzare le categorie
  prodotti: Prodotto[] = [];  // Array per memorizzare i prodotti della categoria selezionata
  selectedCategoria: Categoria | null = null; // Categoria selezionata

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit(): void {
    // Carica le categorie
    this.catalogoService.getCategorie().subscribe(
      (categorie) => {
        this.categorie = categorie;
      },
      (error) => {
        console.error('Errore nel recupero delle categorie', error);
      }
    );
  }

  // Metodo per caricare i prodotti in base alla categoria selezionata
  caricaProdotti(idCategoria: number): void {
    this.catalogoService.getProdottiByCategoria(idCategoria).subscribe(
      (prodotti) => {
        this.prodotti = prodotti;
        this.selectedCategoria = this.categorie.find(c => c.idCategoria === idCategoria) || null; // Trova la categoria selezionata
      },
      (error) => {
        console.error('Errore nel recupero dei prodotti', error);
      }
    );
  }
}
