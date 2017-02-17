import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { ActionPage } from '../action-details/action-details';
import { Action } from '../action-details/action';

@Component({
  selector: 'page-action-list',
  templateUrl: 'action-list.html'
})
export class ActionListPage {
    actions: Action[];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.actions = [new Action(1, "hello", "https://www.itu.int/net4/wsis/prizes/2017/Content/images/processIcons/wsisalnt/400/2-min.png"),
                           new Action(2, "another", "https://www.itu.int/net4/wsis/prizes/2017/Content/images/processIcons/wsisalnt/400/c7/e-agr-min.png")];
        
    }
    
    actionTapped(event, action){
        console.log(action);
        this.navCtrl.push(ActionPage, {"action": action});
    }
}
