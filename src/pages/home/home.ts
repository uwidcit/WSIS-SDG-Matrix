import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SDGListPage } from '../sdg-list/sdg-list';
import { ActionPage } from '../action-details/action-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

    showSDGs(event){
        this.navCtrl.push(SDGListPage);
    }
    
    showActions(event){
        this.navCtrl.push(ActionPage);
    }

}
