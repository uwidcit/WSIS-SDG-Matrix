import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { SDG } from './sdg';
import { ActionPage } from '../action-details/action-details';
import { SDGService } from '../../services/sdg.service';

@Component({
    selector: 'page-sdg',
    templateUrl: 'sdg-details.html',
    providers: [SDGService]
})

export class SDGPage {
    
    goal: SDG;
    errorMessage;
    color: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public sdgService: SDGService) {
        var goalId = navParams.get("goal");
        
        sdgService.getGoals()
                    .subscribe(
                         goals => this.goal = goals[goalId],
                         error =>  this.errorMessage = <any>error
                    );
    }
    
    actionTapped(event, action){
        this.navCtrl.push(ActionPage, {"action": action});
    }

}
