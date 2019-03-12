import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from 'ionic-angular';

import {SDGPage} from '../sdg-details/sdg-details';

@Component({
  selector: 'popup-action',
  templateUrl: 'action-popup.html'
})
export class ActionPopup {
  goals: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.goals = navParams.get("goals");
  }

  goalTapped(event, goal) {
    this.navCtrl.push(SDGPage, {
      "goal": goal
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
