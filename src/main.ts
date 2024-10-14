import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync() // Add this here for routing
  ]
}).catch(err => console.error(err));
