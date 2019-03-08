import {Component} from '@angular/core';
import {AlertController, App, ViewController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import {InAppBrowser} from "@ionic-native/in-app-browser";

import {HomePage} from '../home/home';
import {SDGListPage} from '../sdg-list/sdg-list';
import {ActionListPage} from '../action-list/action-list';
import {MatrixPage} from '../matrix/matrix';
import {AboutPage} from '../about/about';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabPage {

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;

  constructor(public alertCtrl: AlertController,
              public translate: TranslateService,
              public app: App,
              private iab: InAppBrowser) {

    this.tab1 = HomePage;
    this.tab2 = ActionListPage;
    this.tab3 = SDGListPage;
    this.tab4 = MatrixPage;

    translate.setDefaultLang('en');
  }

  openWebpage() {
    // Opening a URL and returning an InAppBrowserObject
    this.iab.create('https://www.itu.int/net4/wsis/forum/2019/Agenda', '_system');
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

  pickLanguage() {
    this.translate.get('LANGUAGES').subscribe(
      value => {
        // value is our translated string
        console.log(value);
        let alert = this.alertCtrl.create();
        alert.setTitle('Language');
        this.addLangs(value, alert);

        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            console.log(data);
            this.translate.use(data);
          }
        });
        alert.present();
      }
    );


  }

  addLangs(langs: any[], alert) {
    var currLang = this.translate.getDefaultLang();
    if (typeof this.translate.currentLang != "undefined")
      currLang = this.translate.currentLang;

    for (let i = 0; i < langs.length; i++) {
      console.log(langs[i]);
      alert.addInput({
        type: 'radio',
        label: langs[i].name,
        value: langs[i].val,
        checked: langs[i] == currLang
      });
    }
  }

  showAbout() {
    this.app.getRootNav().push(AboutPage, {});
  }
}

@Component({
  template: '<h3 style="padding-left: 16px; font-size: 1.1em;">Menu</h3><ion-list><span ion-item id="menu" *ngFor="let option of options" (click)="optionTapped(option)">{{ option }}</span></ion-list>'
})

export class Menu {

  options = ["About"];

  constructor(public viewCtrl: ViewController, public app: App) {  }

  optionTapped() {
    this.viewCtrl.dismiss();
    this.app.getRootNav().push(AboutPage, {});
  }
}
