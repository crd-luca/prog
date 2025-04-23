import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../services/catalogo.service';
import { OrdineDto } from '../model/ordineDto';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { CurrencyPipe,  } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  imports: [
    CommonModule,
    Card,
    Button,
    CurrencyPipe,

  ],
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {
  ordini: OrdineDto[] = [];

  constructor(private catalogoService: CatalogoService, ) {}

  ngOnInit(): void {
    this.caricaTuttiGliOrdini(); // Carica gli ordini all'inizio
  }

  caricaTuttiGliOrdini(): void {
    this.catalogoService.getAllOrdini().subscribe({
      next: (dati) => {
        this.ordini = dati;
      },
      error: (err) => {
        console.error('Errore nel caricamento ordini', err);
      }
    });
  }

  eliminaOrdine(idOrdine: number): void {
    this.catalogoService.eliminaOrdine(idOrdine).subscribe({
      next: () => {
        // Rimuovi l'ordine dalla lista nel front-end
        this.ordini = this.ordini.filter(ordine => ordine.idOrdine !== idOrdine);
        console.log('Ordine eliminato con successo');
      },
      error: (err) => {
        console.error('Errore nell\'eliminazione dell\'ordine', err);
      }
    });
  }

}
