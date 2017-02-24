import { NgModule, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Http    } from '@angular/http';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabPage } from '../pages/tabs/tabs';
import { SDGPage } from '../pages/sdg-details/sdg-details';
import { SDGListPage } from '../pages/sdg-list/sdg-list';
import { ActionPage } from '../pages/action-details/action-details';
import { ActionListPage } from '../pages/action-list/action-list';
import { MatrixPage } from '../pages/matrix/matrix';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SDGPage,
        SDGListPage,
        ActionPage,
        ActionListPage,
        MatrixPage,
        TabPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
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
        TabPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {}

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}