import {Component} from "@angular/core";
import {NavController, NavParams, PopoverController} from 'ionic-angular';

import { SDGPage } from '../sdg-details/sdg-details';
import { Action } from './action';
import { ActionService } from '../../services/action.service';
import { ActionPopup } from '../action-popup/action-popup';

@Component({
    selector: 'page-action',
    templateUrl: 'action-details.html',
    providers: [ActionService]
})

export class ActionPage {
    
    action: Action;
    errorMessage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionService: ActionService, 
                public popoverCtrl: PopoverController) {
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
    
    goalPressed(event, idx){
        var arr = [];
        arr.push(this.action.goals[idx]);
        let popover = this.popoverCtrl.create(ActionPopup, {"goals": arr}, {cssClass: 'action-popover'});
        popover.present();
    }

}
