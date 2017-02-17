import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SDGPage } from '../pages/sdg-details/sdg-details';
import { SDGListPage } from '../pages/sdg-list/sdg-list';
import { ActionPage } from '../pages/action-details/action-details';
import { ActionListPage } from '../pages/action-list/action-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SDGPage,
    SDGListPage,
    ActionPage,
    ActionListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SDGPage,
    SDGListPage,
    ActionPage,
    ActionListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
