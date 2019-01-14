import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler, Injectable} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import * as Sentry from '@sentry/browser';
import {environment} from '@env';

import {MyApp} from './app.component';
// Pages
import {AboutPage} from '@pages/about/about';
import {ActionPage} from '@pages/action-details/action-details';
import {ActionListPage} from '@pages/action-list/action-list';
import {ActionPopup} from '@pages/action-popup/action-popup';
import {HomePage} from '@pages/home/home';
import {MatrixPage} from '@pages/matrix/matrix';
import {SDGPage} from '@pages/sdg-details/sdg-details';
import {SDGListPage} from '@pages/sdg-list/sdg-list';
import {TabPage, Menu} from '@pages/tabs/tabs';
// Services
import {ActionService} from '@services/action.service'
import {SDGService} from '@services/sdg.service';

Sentry.init({dsn: 'https://4852a8e4c6004ed29198042d6473dbe3@sentry.io/1370709'});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error) {
    if (environment.production) {
      Sentry.captureException(error.originalError || error);
    }
    throw error;
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SDGPage,
    SDGListPage,
    ActionPage,
    ActionListPage,
    MatrixPage,
    TabPage,
    AboutPage,
    ActionPopup,
    Menu
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SDGPage,
    SDGListPage,
    ActionPage,
    ActionListPage,
    MatrixPage,
    TabPage,
    AboutPage,
    ActionPopup,
    Menu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    ActionService,
    SDGService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ]
})
export class AppModule {
}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
