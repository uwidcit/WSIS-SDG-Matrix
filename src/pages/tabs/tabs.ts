import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { HomePage } from '../home/home';
import { SDGListPage } from '../sdg-list/sdg-list';
import { ActionListPage } from '../action-list/action-list';
import { MatrixPage } from '../matrix/matrix';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})

export class TabPage {
    
    tab1: any;
    tab2: any;
    tab3: any;
    tab4: any;

    constructor(public alertCtrl: AlertController, public translate: TranslateService, public popoverCtrl: PopoverController) {
        this.tab1 = HomePage;
        this.tab2 = ActionListPage;
        this.tab3 = SDGListPage;
        this.tab4 = MatrixPage;
        
        translate.setDefaultLang('en');
    }
    
    showMenu() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Language');

        alert.addInput({
            type: 'radio',
            label: 'English',
            value: 'en',
            checked: true
        });
        
        alert.addInput({
            type: 'radio',
            label: 'Espanol',
            value: 'es',
            checked: false
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                this.translate.use(data);
            }
        });
        alert.present();
    }
    
    showOverflow() {
        let popover = this.popoverCtrl.create(Menu);
        popover.present();
    }
}

@Component({
    template: '<h3 style="padding-left: 16px; font-size: 1.1em;">Menu</h3><ion-list><span ion-item id="menu" *ngFor="let option of options" (click)="optionTapped(option)">{{ option }}</span></ion-list>'
})
export class Menu {
    
    options = ["About"];
    
    constructor(public navCtrl: NavController) {
        
    }
    
    optionTapped() {
        
    }
}
