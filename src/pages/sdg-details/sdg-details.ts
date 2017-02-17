import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import { SDG } from './sdg';
import { Action } from '../action-details/action';
import { ActionPage } from '../action-details/action-details';

@Component({
    selector: 'page-sdg',
    templateUrl: 'sdg-details.html'
})

export class SDGPage {
    sdg: SDG;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if(typeof navParams.get("goal") != "undefined"){
            console.log("got goal");
            this.sdg = navParams.get("goal");
            this.sdg.desc = "hello this is the description";
            this.sdg.actions = [new Action(1, "hello", "https://www.itu.int/net4/wsis/prizes/2017/Content/images/processIcons/wsisalnt/400/2-min.png"),
                               new Action(2, "another", "https://www.itu.int/net4/wsis/prizes/2017/Content/images/processIcons/wsisalnt/400/c7/e-agr-min.png")];
        }
    }
    
    actionTapped(event, action){
        this.navCtrl.push(ActionPage, {"action": action});
    }

}
