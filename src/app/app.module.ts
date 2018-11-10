import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { Http } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';



import { HomePage } from '../pages/home/home';
import { TabPage, Menu } from '../pages/tabs/tabs';
import { SDGPage } from '../pages/sdg-details/sdg-details';
import { SDGListPage } from '../pages/sdg-list/sdg-list';
import { ActionPage } from '../pages/action-details/action-details';
import { ActionListPage } from '../pages/action-list/action-list';
import { MatrixPage } from '../pages/matrix/matrix';
import { ActionPopup } from '../pages/action-popup/action-popup';
import { AboutPage } from '../pages/about/about';

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
      {provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {}

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
