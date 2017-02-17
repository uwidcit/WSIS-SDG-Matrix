import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GoalService {
    
    constructor(public http: Http) {
    }

    getGoals() {
        return this.http.request('/assets/data/goals.json')
                    .map(res => res.json());
    }
    
}