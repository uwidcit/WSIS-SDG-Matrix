import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { SDG } from '../sdg-details/sdg';
import { SDGPage } from '../sdg-details/sdg-details';
import { Action } from './action';
import { ActionService } from '../../services/action.service';

@Component({
    selector: 'page-action',
    templateUrl: 'action-details.html',
    providers: [ActionService]
})

export class ActionPage {
    action: Action;

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionService: ActionService) {
        if(typeof navParams.get("action") != "undefined"){
            console.log("got action");
            this.action = navParams.get("action") ;
            this.action.goals = [new SDG(1, "Clean Water and Sanitation", "https://static1.squarespace.com/static/55bbf921e4b09c9ffac44664/55ccc120e4b…0e1958616fe/1439482496408/child-without-access-to-clean-drinking-water.jpg", "https://pbs.twimg.com/media/C309LZ1W8AEmuHi.jpg")];
        }
    
    }
    
    goalTapped(event, goal) {
        this.navCtrl.push(SDGPage, {
            "goal": goal
        });
    }

}
