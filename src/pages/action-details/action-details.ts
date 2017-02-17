import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { Action } from './action';

@Component({
    selector: 'page-action',
    templateUrl: 'action-details.html'
})

export class ActionPage {
    action: Action;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if(typeof navParams.get("action") != "undefined"){
            this.action = navParams.get("action") ;
            console.log(this.action);
        }
    
    }
    
    itemTapped(event, item) {
        /*this.navCtrl.push(ItemDetailsPage, {
            item: item
        });*/
    }

}
