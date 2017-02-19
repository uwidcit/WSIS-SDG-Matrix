import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { SDGListPage } from '../sdg-list/sdg-list';
import { ActionListPage } from '../action-list/action-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

    }

    showSDGs(event){
        this.navCtrl.push(SDGListPage);
    }
    
    showActions(event){
        this.navCtrl.push(ActionListPage);
    }
    
    showRadio() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Language');

        alert.addInput({
            type: 'radio',
            label: 'Blue',
            value: 'blue',
            checked: true
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(data);
            }
        });
        alert.present();
    }

}
