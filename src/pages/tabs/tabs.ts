import {Component} from '@angular/core';
import {AlertController, App, IonicPage} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import {InAppBrowser} from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabPage {

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;

  constructor(public alertCtrl: AlertController,
              public translate: TranslateService,
              public app: App,
              private iab: InAppBrowser) {

    this.tab1 = "HomePage";
    this.tab2 = "ActionListPage";
    this.tab3 = "SDGListPage";
    this.tab4 = "MatrixPage";
    this.tab5 = "NotificationPage";

    translate.setDefaultLang('en');
  }

  openAgendaWebPage() {
    // Opening a URL and returning an InAppBrowserObject
    this.iab.create('https://www.itu.int/net4/wsis/forum/2019/Agenda', '_system');
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
    this.app.getRootNav().push('AboutPage', {});
  }

  showTwitterPage(){
    this.app.getRootNav().push('TwitterPage', {});
  }
}
