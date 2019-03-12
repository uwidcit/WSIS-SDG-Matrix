import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicModule, IonicPageModule} from "ionic-angular";

import {HomePage} from "./home";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicModule,
    IonicPageModule.forChild(HomePage),
    TranslateModule
  ],
  exports: [HomePage],
  entryComponents: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
