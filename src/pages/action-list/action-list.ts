import {Component} from "@angular/core";
import {App} from 'ionic-angular';
import {ActionPage} from '../action-details/action-details';
import {Action} from '../action-details/action';
import {ActionService} from '@services/action.service';

@Component({
  selector: 'page-action-list',
  templateUrl: 'action-list.html',
  providers: [ActionService]
})

export class ActionListPage {
  actions: Action[];
  errorMessage: string;

  constructor(public actionService: ActionService, public app: App) {
    actionService.getActions()
      .subscribe(
        actions => this.actions = actions,
        error => this.errorMessage = <any>error
      );
  }

  actionTapped(event, action) {
    this.app.getRootNav().push(ActionPage, {"action": action.id});
  }
}
