import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

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
    errorMessage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionService: ActionService) {
        var action = navParams.get("action");
        console.log("got action " + action.id);
        
        if(typeof action.goals === "undefined"){
            console.log("Fetching action from service");
            actionService.getActions()
                        .subscribe(
                             actions => this.action = actions[action.id],
                             error =>  this.errorMessage = <any>error
                        );
        }
        else {
            this.action = action;
        }
    
    }
    
    goalTapped(event, goal) {
        this.navCtrl.push(SDGPage, {
            "goal": goal
        });
    }

}
