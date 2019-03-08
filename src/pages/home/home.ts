import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(
    public translate: TranslateService,
    private iab: InAppBrowser) {
  }

  openRegister() {
    this.iab.create('https://www.itu.int/net4/wsis/forum/2019/Home/Registration', '_system');
  }
}
