import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicModule, IonicPageModule} from "ionic-angular";
import {TabPage} from "./tabs";
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [TabPage],
  imports: [
    IonicModule,
    IonicPageModule.forChild(TabPage),
    TranslateModule
  ],
  exports: [TabPage],
  entryComponents: [TabPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsModule {
}
