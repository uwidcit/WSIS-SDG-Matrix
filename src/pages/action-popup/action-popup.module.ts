import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {TranslateModule} from "ng2-translate";
import {ActionPopup} from "./action-popup";
import {IonicModule} from "ionic-angular";


@NgModule({
  declarations: [ActionPopup],
  imports: [
    TranslateModule,
    IonicModule
  ],
  exports: [ActionPopup],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActionPopupModule {
}
