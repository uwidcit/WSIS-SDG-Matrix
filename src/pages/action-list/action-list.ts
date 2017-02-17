import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { ActionPage } from '../action-details/action-details';
import { Action } from '../action-details/action';
import { ActionService } from '../../services/action.service';

@Component({
    selector: 'page-action-list',
    templateUrl: 'action-list.html',
    providers: [ActionService]
})
export class ActionListPage {
    actions;

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionService: ActionService) {
        this.actions = actionService.getActions();
        
    }
    
    actionTapped(event, action){
        console.log(action);
        this.navCtrl.push(ActionPage, {"action": action});
    }
}
