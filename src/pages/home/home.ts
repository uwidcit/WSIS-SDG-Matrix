import {Component} from '@angular/core';
import {AlertController, App, ViewController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import {InAppBrowser} from "@ionic-native/in-app-browser";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    constructor(public alertCtrl: AlertController,
        public translate: TranslateService,
        public app: App,
        private iab: InAppBrowser) { }
    
    openRegister() {
        this.iab.create('https://www.itu.int/net4/wsis/forum/2019/Home/Registration', '_system');        
    }
}
