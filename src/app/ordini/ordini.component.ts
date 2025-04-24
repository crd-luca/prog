import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../services/catalogo.service';
import { OrdineDto } from '../model/ordineDto';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { CurrencyPipe,  } from '@angular/common';
import { CommonModule } from '@angular/common';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {RouterLink} from '@angular/router';
import {OrdineUpdate} from '../model/ordineUpdate';

@Component({
  selector: 'app-ordini',
  standalone: true,
  templateUrl: './ordini.component.html',
  imports: [
    CommonModule,
    Card,
    Button,
    CurrencyPipe,
    Toast,
    PrimeTemplate,
    RouterLink,

  ],
  providers: [CatalogoService,MessageService],

  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {
  ordini: OrdineDto[] = [];

  constructor(private catalogoService: CatalogoService,
              private messageService: MessageService) {}

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

        this.messageService.add({
          severity: 'success',
          detail: 'ordine eliminato con successo',
          life: 3000
        });

      },
      error: (err) => {
        console.error('Errore nell\'eliminazione dell\'ordine', err);


        this.messageService.add({
          severity: 'error',
          summary: 'Errore',
          detail: "si è verificato un errore durante l' eliminazione",
          life: 3000
        });

      }




    });
  }


  modificaOrdine(idOrdine: number) {
    const ordineUpdate: OrdineUpdate = {
      idOrdine,
      idProdotti: this.nuoviProdottiSelezionati
    };

    this.catalogoService.aggiornaOrdine(ordineUpdate).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Modificato', detail: 'Ordine aggiornato' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'Aggiornamento fallito' });
      }
    });
  }


}
