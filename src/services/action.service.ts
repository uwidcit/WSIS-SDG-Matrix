import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ActionService {
    
    constructor(public http: Http) {
    }

    getActions() {
        return this.http.request('/assets/data/actions.json')
                    .map(res => res.json());
    }
    
}