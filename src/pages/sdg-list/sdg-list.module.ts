import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {SDGListPage} from "./sdg-list";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [SDGListPage],
  imports: [IonicPageModule.forChild(SDGListPage), TranslateModule],
  exports: [SDGListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SDGListModule {
}
