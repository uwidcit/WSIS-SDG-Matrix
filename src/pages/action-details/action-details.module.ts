import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ActionPage} from "./action-details";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [ActionPage],
  imports: [
    IonicPageModule.forChild(ActionPage),
    TranslateModule
  ],
  exports: [ActionPage],
  entryComponents: [ActionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActionModule {
}
