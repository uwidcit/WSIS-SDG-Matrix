import { Component } from '@angular/core';

import { AlertController, App, PopoverController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { Action } from '../action-details/action';
import { ActionPopup } from '../action-popup/action-popup';
import { SDG } from '../sdg-details/sdg';
import { SDGPage } from '../sdg-details/sdg-details';

import { GoalService } from '../../services/goal.service';
import { ActionService } from '../../services/action.service';

@Component({
    selector: 'page-matrix',
    templateUrl: 'matrix.html',
    providers: [GoalService, ActionService, Storage]
})

export class MatrixPage {
    
    goals: SDG[];
    actions: Action[];
    
    ACTION_SHOWED: boolean;
    GOAL_SHOWED: boolean;
    
    allGoals;
    allActions;
    errorMessage;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public goalService: GoalService,
                public actionService: ActionService, public app: App, public popoverCtrl: PopoverController) {
        goalService.getGoals()
                    .subscribe(
                         goals => this.goals = goals,
                         error =>  this.errorMessage = <any>error
                    );
        
        actionService.getActions()
                    .subscribe(
                         actions => this.actions = actions,
                         error =>  this.errorMessage = <any>error
                    );
    }
    
    goalTapped(event, goal){
        this.ACTION_SHOWED = false;
        this.GOAL_SHOWED = true;
        
        if(typeof this.allActions == "undefined"){
            console.log("setting all hidden");
            this.allActions = this.actions.slice();
            this.setAllHidden(this.allActions, true);
        }
        
        var idx = this.goals.indexOf(goal);
        this.setAllHiddenExcept(this.goals, true, idx);
        
        this.setAllHidden(this.allActions, true);
        this.actions = this.getElements(this.allActions, goal.actions);
        
        window.location.href = '#actions';
    }
    
    actionTapped(event, action){
        this.ACTION_SHOWED = true;
        this.GOAL_SHOWED = false;
        
        if(typeof this.allGoals == "undefined"){
            console.log("setting all hidden");
            this.allGoals = this.goals.slice();
            this.setAllHidden(this.allGoals, true);
        }
        
        var idx = this.actions.indexOf(action);
        this.setAllHiddenExcept(this.actions, true, idx);
        
        this.setAllHidden(this.allGoals, true);
        this.goals = this.getGoals(this.allGoals, action.goals);
        
        window.location.href = '#goals';
    }
    
    actionPressed(event, action){
        let popover = this.popoverCtrl.create(ActionPopup, {"goals": action.goals}, {cssClass: 'action-popover'});
        popover.present();
    }
    
    goalPressed(event, goal){
        console.log("pressed");
        this.app.getRootNav().push(SDGPage, {"goal": goal.id});
    }
    
    getElements(arr: any[], ids: any[]){
        for(var i = 0; i < ids.length; i++){
            arr[ids[i]].hidden = false;
        }
        return arr;
    }
    
    getGoals(arr: any[], ids: any[]){
        for(var i = 0; i < ids.length; i++){
            arr[ids[i].goalId].hidden = false;
        }
        return arr;
    }
    
    setAllHidden(arr: any[], state: boolean){
        for(var i = 0; i < arr.length; i++){
            arr[i].hidden = state;
        }
    }
    
    setAllHiddenExcept(arr: any[], state: boolean, idx: number){
        for(var i = 0; i < arr.length; i++){
            if(i == idx)
                arr[i].hidden = !state;
            else
                arr[i].hidden = state;
        }
    }
    
    reset(event){
        console.log("resettings");
        this.ACTION_SHOWED = false;
        this.GOAL_SHOWED = false;
        this.setAllHidden(this.goals, false);
        this.setAllHidden(this.actions, false);
    }

}
