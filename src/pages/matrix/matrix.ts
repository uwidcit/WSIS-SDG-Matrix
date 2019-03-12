import {Component, ElementRef, ViewChild} from '@angular/core';

import {App, IonicPage, PopoverController} from 'ionic-angular';
import {Action} from '../action-details/action';
import {ActionPopup} from '../action-popup/action-popup';
import {SDG} from '../sdg-details/sdg';
import {SDGPage} from '../sdg-details/sdg-details';

import {SDGService} from '@services/sdg.service';
import {ActionService} from '@services/action.service';

@IonicPage()
@Component({
  selector: 'page-matrix',
  templateUrl: 'matrix.html',
  providers: [SDGService, ActionService]
})

export class MatrixPage {

  @ViewChild('actions_sec') public action_el:ElementRef;
  @ViewChild('goals_sec') public goal_el:ElementRef;

  goals: SDG[];
  actions: Action[];

  ACTION_SHOWED: boolean;
  GOAL_SHOWED: boolean;

  allGoals;
  allActions;
  errorMessage;

  constructor(public sdgService: SDGService,
              public actionService: ActionService,
              public app: App,
              public popoverCtrl: PopoverController) {
    sdgService.getGoals()
      .subscribe(
        goals => this.goals = goals,
        error => this.errorMessage = <any>error
      );

    actionService.getActions()
      .subscribe(
        actions => this.actions = actions,
        error => this.errorMessage = <any>error
      );
  }

  goalTapped(event, goal) {
    this.ACTION_SHOWED = false;
    this.GOAL_SHOWED = true;

    if (typeof this.allActions == "undefined") {
      console.log("setting all hidden");
      this.allActions = this.actions.slice();
      this.setAllHidden(this.allActions, true);
    }

    const idx = this.goals.indexOf(goal);
    this.setAllHiddenExcept(this.goals, true, idx);

    this.setAllHidden(this.allActions, true);
    this.actions = this.getElements(this.allActions, goal.actions);

    // window.location.href = '#actions';
    this.action_el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  actionTapped(event, action) {
    this.ACTION_SHOWED = true;
    this.GOAL_SHOWED = false;

    if (typeof this.allGoals == "undefined") {
      console.log("setting all hidden");
      this.allGoals = this.goals.slice();
      this.setAllHidden(this.allGoals, true);
    }

    const idx = this.actions.indexOf(action);
    this.setAllHiddenExcept(this.actions, true, idx);

    this.setAllHidden(this.allGoals, true);
    this.goals = this.getGoals(this.allGoals, action.goals);

    // window.location.href = '#goals';
    this.goal_el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  actionPressed(event, action) {
    let popover = this.popoverCtrl.create(ActionPopup, {"goals": action.goals}, {cssClass: 'action-popover'});
    popover.present();
  }

  goalPressed(event, goal) {
    console.log("pressed");
    this.app.getRootNav().push(SDGPage, {"goal": goal.id});
  }

  getElements(arr: any[], ids: any[]) {
    for (let i = 0; i < ids.length; i++) {
      arr[ids[i]].hidden = false;
    }
    return arr;
  }

  getGoals(arr: any[], ids: any[]) {
    for (let i = 0; i < ids.length; i++) {
      arr[ids[i].goalId].hidden = false;
    }
    return arr;
  }

  setAllHidden(arr: any[], state: boolean) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].hidden = state;
    }
  }

  setAllHiddenExcept(arr: any[], state: boolean, idx: number) {
    for (let i = 0; i < arr.length; i++) {
      if (i == idx)
        arr[i].hidden = !state;
      else
        arr[i].hidden = state;
    }
  }

  reset() {
    console.log("reset things");
    this.ACTION_SHOWED = false;
    this.GOAL_SHOWED = false;
    this.setAllHidden(this.goals, false);
    this.setAllHidden(this.actions, false);
  }

}
