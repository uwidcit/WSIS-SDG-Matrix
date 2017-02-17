import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { SDGPage } from '../sdg-details/sdg-details';
import { SDG } from '../sdg-details/sdg';
import { GoalService } from '../../services/goal.service';


@Component({
    selector: 'page-sdg-list',
    templateUrl: 'sdg-list.html',
    providers: [GoalService]
})
export class SDGListPage {
    
    goals;

    constructor(public navCtrl: NavController, public navParams: NavParams, public goalService : GoalService) {        
        this.goals = goalService.getGoals();        
    }
    
    goalTapped(event, goal){
        this.navCtrl.push(SDGPage, {"goal": goal});
    }

}
