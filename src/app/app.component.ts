import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Card, CardModule} from 'primeng/card';
import {Button, ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterModule} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports:[
    HttpClientModule,
    CardModule,
    ButtonModule,
  CommonModule,
    RouterModule,
    DataViewModule,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projectAngular';
}
