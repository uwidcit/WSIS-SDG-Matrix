import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {MatrixPage} from "./matrix";
import {ActionModule} from "@pages/action-details/action-details.module";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [MatrixPage],
  imports: [
    IonicPageModule.forChild(MatrixPage),
    TranslateModule,
    ActionModule
  ],
  exports: [MatrixPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MatrixModule {
}
