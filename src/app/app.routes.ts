// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {OrdiniComponent} from './ordini/ordini.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ordini', component: OrdiniComponent }

];
