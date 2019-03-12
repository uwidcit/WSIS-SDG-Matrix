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
// Firebase Related Imports
import {Firebase} from '@ionic-native/firebase';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
// noinspection TypeScriptPreferShortImport
import {firebase} from "../environments/environment";
// Services
import {ActionService} from '@services/action.service'
import {SDGService} from '@services/sdg.service';
import {AnalyticsService} from './analytics/analytics.service';
import {FcmProvider} from '../providers/fcm/fcm';

import {Device} from "@ionic-native/device";

Sentry.init({dsn: 'https://4852a8e4c6004ed29198042d6473dbe3@sentry.io/1370709'});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error) {
    if (environment.production) {
      console.log("Sending information to Sentry");
      Sentry.captureException(error.originalError || error);
    }
    throw error;
  }
}

@NgModule({
<<<<<<< HEAD
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
        IonicModule.forRoot(MyApp,{ mode:'md'}),
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
    providers: [InAppBrowser,{provide: ErrorHandler, useClass: IonicErrorHandler}]
=======
  declarations: [
    MyApp,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {preloadModules: true}),
    BrowserModule,
    // Import and initialise Firebase
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // Import and initialise Translation module
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    ActionService,
    SDGService,
    AnalyticsService,
    Firebase,
    FcmProvider,
    AngularFireAuth,
    Device,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ]
>>>>>>> master
})
export class AppModule {
}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
