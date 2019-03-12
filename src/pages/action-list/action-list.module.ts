import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ActionListPage} from "./action-list";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [ActionListPage],
  imports: [IonicPageModule.forChild(ActionListPage), TranslateModule],
  exports: [ActionListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActionListModule {
}
