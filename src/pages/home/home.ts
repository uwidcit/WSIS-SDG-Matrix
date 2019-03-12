import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {App, IonicPage, NavController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(
    public translate: TranslateService,
    public nav: NavController,
    public app: App,
    private iab: InAppBrowser) {
  }

  openRegister() {
    this.iab.create('https://www.itu.int/net4/wsis/forum/2019/Home/Registration', '_system');
  }

  showFacebook() {
    // Opening a URL and returning an InAppBrowserObject
    this.iab.create('https://www.facebook.com/WSISprocess/', '_system');
  }

  showInstagram() {
    // Opening a URL and returning an InAppBrowserObject
    this.iab.create('https://www.instagram.com/wsis_process/?hl=en', '_system');
  }

  showTwitter() {
    // Opening a URL and returning an InAppBrowserObject
    this.iab.create('https://twitter.com/WSISprocess', '_system');
  }

  openSDG() {
    this.nav.parent.select(2);
  }

  openActionLine() {
    this.nav.parent.select(1);

  }
}
