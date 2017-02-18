import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { SDG } from './sdg';
import { ActionPage } from '../action-details/action-details';
import { GoalService } from '../../services/goal.service';

@Component({
    selector: 'page-sdg',
    templateUrl: 'sdg-details.html',
    providers: [GoalService]
})

export class SDGPage {
    
    goal: SDG;
    errorMessage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public goalService: GoalService) {
        var goal = navParams.get("goal");
        console.log("Got goal id = " + goal.id);

        if(typeof goal.actions === "undefined"){
            console.log("Fetching goal from service");
            goalService.getGoals()
                        .subscribe(
                             goals => this.goal = goals[goal.id],
                             error =>  this.errorMessage = <any>error
                        );
        }
        else{
            this.goal = goal;
        }
    }
    
    actionTapped(event, action){
        this.navCtrl.push(ActionPage, {"action": action});
    }

}
