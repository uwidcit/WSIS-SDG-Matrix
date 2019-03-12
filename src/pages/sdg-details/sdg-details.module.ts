import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {SDGPage} from "./sdg-details";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [SDGPage],
  imports: [IonicPageModule.forChild(SDGPage), TranslateModule],
  exports: [SDGPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SDGModule {
}
