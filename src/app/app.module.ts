import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, Injectable, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import * as Sentry from '@sentry/browser';
import {environment} from '@env';

import {MyApp} from './app.component';
// Pages
// import {Menu, TabPage} from '@pages/tabs/tabs';
// Firebase Related Imports
import {Firebase} from '@ionic-native/firebase';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
// noinspection TypeScriptPreferShortImport
import {firebase} from "../environments/environment";
// Services
import {ActionService} from '@services/action.service'
import {SDGService} from '@services/sdg.service';
import {AnalyticsService} from './analytics/analytics.service';
import {FcmProvider} from '../providers/fcm/fcm';
import {HomeModule} from "@pages/home/home.module";
import {AboutModule} from "@pages/about/about.module";
import {ActionModule} from "@pages/action-details/action-details.module";
import {ActionListModule} from "@pages/action-list/action-list.module";
import {MatrixModule} from "@pages/matrix/matrix.module";
import {SDGModule} from "@pages/sdg-details/sdg-details.module";
import {SDGListModule} from "@pages/sdg-list/sdg-list.module";
import {TabsModule} from "@pages/tabs/tabs.module";
import {ActionPopupModule} from "@pages/action-popup/action-popup.module";


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
    // HomePage,
    // SDGPage,
    // SDGListPage,
    // ActionPage,
    // ActionListPage,
    // MatrixPage,
    // TabPage,
    // TwitterPage,
    // AboutPage,
    // ActionPopup,
    // Menu
  ],
  imports: [
    IonicModule.forRoot(MyApp, {preloadModules: true}),
    BrowserModule,
    // Import and initialise Firebase
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    // Import and initialise Translation module
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    HomeModule,
    AboutModule,
    ActionModule,
    ActionListModule,
    ActionPopupModule,
    MatrixModule,
    SDGModule,
    SDGListModule,
    TabsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    // AboutPage,
    // ActionPopup,
    // ActionPage,
    // ActionListPage,
    // HomePage,
    // MyApp,
    // SDGPage,
    // SDGListPage,
    // MatrixPage,
    // TabPage,
    // TwitterPage,
    // Menu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    ActionService,
    SDGService,
    AnalyticsService,
    Firebase,
    FcmProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ]
})
export class AppModule {
}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
