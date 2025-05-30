import {bootstrapApplication, platformBrowser} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/appConfig';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
