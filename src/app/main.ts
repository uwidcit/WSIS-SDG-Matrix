import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app.module';
import {environment} from "@env";

platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.production) {
  if (environment.is_debug) { console.log("Application is in production mode"); }
  enableProdMode();
} else {
  console.log("Application is in development mode");
}
