import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { SDGPage } from '../sdg-details/sdg-details';
import { ActionService } from '../../services/action.service';

@Component({
    selector: 'popup-action',
    templateUrl: 'action-popup.html',
    providers: [ActionService]
})

export class ActionPopup {
    
    goals: any[];
    errorMessage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionService: ActionService) {
        this.goals = navParams.get("goals");
        console.log(this.goals);
    }
    
    goalTapped(event, goal) {
        this.navCtrl.push(SDGPage, {
            "goal": goal
        });
    }

}
