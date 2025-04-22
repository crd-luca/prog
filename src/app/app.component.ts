import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Card, CardModule} from 'primeng/card';
import {Button, ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports:[
    HttpClientModule,
    CardModule,
    ButtonModule,
  CommonModule,
    RouterModule,],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projectAngular';
}
