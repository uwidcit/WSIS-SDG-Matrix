import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {NotificationPage} from './notification';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(NotificationPage),
    TranslateModule
  ],
  exports: [NotificationPage],
  entryComponents: [NotificationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationPageModule {
}
