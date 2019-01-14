import {Component} from "@angular/core";
import {App} from 'ionic-angular';

import { SDGPage } from '../sdg-details/sdg-details';
import { SDG } from '../sdg-details/sdg';
import { SDGService } from '@services/sdg.service';


@Component({
    selector: 'page-sdg-list',
    templateUrl: 'sdg-list.html',
    providers: [SDGService]
})
export class SDGListPage {
    
    goals: SDG[];
    errorMessage: string;

    constructor(public app: App, public sdgService : SDGService) {
        sdgService.getGoals()
                    .subscribe(
                         goals => this.goals = goals,
                         error =>  this.errorMessage = <any>error
                    );
    }
    
    goalTapped(event, goal){
        this.app.getRootNav().push(SDGPage, {"goal": goal.id});
    }

}
