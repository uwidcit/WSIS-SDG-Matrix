import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app.module';
import {environment} from "../environments/environment";

platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.production) {
  if (environment.is_debug) { console.log("Application is in production mode"); }
  enableProdMode();
}
