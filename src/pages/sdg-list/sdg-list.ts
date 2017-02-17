import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { SDGPage } from '../sdg-details/sdg-details';
import { SDG } from '../sdg-details/sdg';

@Component({
  selector: 'page-sdg-list',
  templateUrl: 'sdg-list.html'
})
export class SDGListPage {
    goals: SDG[];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.goals = [new SDG(1, "Clean Water and Sanitation", "https://static1.squarespace.com/static/55bbf921e4b09c9ffac44664/55ccc120e4b070e1958606a9/55ccc1dfe4b070e1958616fe/1439482496408/child-without-access-to-clean-drinking-water.jpg",
                          "https://pbs.twimg.com/media/C309LZ1W8AEmuHi.jpg"),
                      new SDG(1, "Zero Hunger", "http://aiesec.org/wp-content/uploads/2017/01/sb-game-hacker.jpg",
                          "https://www.itu.int/net4/wsis/stocktakingp/Content/inc/icons/sdgs/150/2.jpg")
                      
                     ];
        
    }
    
    goalTapped(event, goal){
        this.navCtrl.push(SDGPage, {"goal": goal});
    }

}
