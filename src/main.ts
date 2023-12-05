import 'hammerjs';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

initializeApp(environment.firebaseConfig);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

