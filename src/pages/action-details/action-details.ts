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
        var actionId = navParams.get("action");
        
        actionService.getActions()
                    .subscribe(
                         actions => this.action = actions[actionId],
                         error =>  this.errorMessage = <any>error
                    );
    
    }
    
    goalTapped(event, goal) {
        this.navCtrl.push(SDGPage, {
            "goal": goal
        });
    }

}
