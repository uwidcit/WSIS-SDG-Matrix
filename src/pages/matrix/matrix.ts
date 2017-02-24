import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Action } from '../action-details/action';
import { SDG } from '../sdg-details/sdg';

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
                public actionService: ActionService, public storage: Storage) {
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
        console.log("tapped");
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
        console.log(this.actions);
    }
    
    actionTapped(event, action){
                console.log("tapped");
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
        this.goals = this.getElements(this.allGoals, action.goals);
    }
    
    getElements(arr: any[], ids: any[]){
        for(var i = 0; i < ids.length; i++){
            arr[ids[i]].hidden = false;
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

}
