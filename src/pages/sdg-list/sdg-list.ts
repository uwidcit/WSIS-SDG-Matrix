import {Component} from "@angular/core";
import {NavController, NavParams, App} from 'ionic-angular';

import { SDGPage } from '../sdg-details/sdg-details';
import { SDG } from '../sdg-details/sdg';
import { GoalService } from '../../services/goal.service';


@Component({
    selector: 'page-sdg-list',
    templateUrl: 'sdg-list.html',
    providers: [GoalService]
})
export class SDGListPage {
    
    goals: SDG[];
    errorMessage: string;

    constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, 
                 public goalService : GoalService) {        
        goalService.getGoals()
                    .subscribe(
                         goals => this.goals = goals,
                         error =>  this.errorMessage = <any>error
                    );
    }
    
    goalTapped(event, goal){
        this.app.getRootNav().push(SDGPage, {"goal": goal.id});
    }

}
