import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { SDGListPage } from '../sdg-list/sdg-list';
import { ActionListPage } from '../action-list/action-list';
import { MatrixPage } from '../matrix/matrix';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
    providers: [Storage]
})

export class TabPage {
    
    tab1: any;
    tab2: any;
    tab3: any;
    tab4: any;

    constructor(public alertCtrl: AlertController, public storage: Storage) {
        this.tab1 = HomePage;
        this.tab2 = SDGListPage;
        this.tab3 = ActionListPage;
        this.tab4 = MatrixPage;
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
                this.storage.set("lang", data);
            }
        });
        alert.present();
    }
}
