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
    actions: Action[];
    errorMessage: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionService: ActionService) {
        actionService.getActions()
                    .subscribe(
                         actions => this.actions = actions,
                         error =>  this.errorMessage = <any>error
                    );
        
    }
    
    actionTapped(event, action){
        this.navCtrl.push(ActionPage, {"action": action});
    }
}
