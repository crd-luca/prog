import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../services/catalogo.service';
import { Categoria } from '../model/categoria';
import { ProdottoDto } from '../model/prodottoDto';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {Quantita} from '../model/quantita';
import {RouterLink} from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import {Carousel} from 'primeng/carousel';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CurrencyPipe,
    CommonModule,
    RouterLink,
    DataViewModule,
    Carousel,
    Toast,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',],
  providers: [CatalogoService,MessageService
]
})
export class HomeComponent implements OnInit {
  categorie: Categoria[] = [];  // Array per memorizzare le categorie
  prodotti: ProdottoDto[] = [];  // Array per memorizzare i prodotti della categoria selezionata
  selectedCategoria: Categoria | null = null; // Categoria selezionata
  quantita:  Quantita[] = [];
  constructor(private catalogoService: CatalogoService,
  private messageService: MessageService
) {}

  ngOnInit(): void {
    // Carica le categorie
    this.catalogoService.getCategorie().subscribe(
      (categorie) => {
        this.categorie = categorie;
        console.log("categorie caricate", categorie);
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



  aggiungi(prodotto: ProdottoDto): void {
    const voce = this.quantita.find(q => q.prodotto.id === prodotto.id);
    if (voce) {
      voce.quantita++;
    } else {
      this.quantita.push({ prodotto, quantita: 1 });
    }
  }

  rimuovi(prodotto: ProdottoDto): void {
    const voce = this.quantita.find(q => q.prodotto.id === prodotto.id);
    if (voce) {
      voce.quantita--;
      if (voce.quantita <= 0) {
        this.quantita = this.quantita.filter(q => q.prodotto.id !== prodotto.id);
      }
    }
  }

  procediAcquisto(): void {
    const ordineSaveDto = {
      idProdotti: this.quantita.map((q) => q.prodotto.id)
    };

    this.catalogoService.salvaOrdine(ordineSaveDto).subscribe(
      (response) => {
        console.log('Ordine salvato con successo', response);


        this.messageService.add({
          severity: 'success',
          summary: 'Ordine confermato',
          detail: 'Grazie per il tuo acquisto!',
          life: 3000
        });

        this.quantita = []; // Svuota il carrello
      },
      (error) => {
        console.error('Errore nel salvataggio dell\'ordine', error);


        this.messageService.add({
          severity: 'error',
          summary: 'Errore',
          detail: 'Si è verificato un problema durante l\'acquisto.',
          life: 3000
        });
      }
    );
  }




}
