import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action } from '../pages/action-details/action';

@Injectable()
export class ActionService {
    
    constructor(public http: Http) {
    }

    getActions(): Observable<Action[]>  {
        return this.http.request('./assets/data/actions.json')
                    .map(res => res.json())
                    .catch(this.handleError);
    }
    
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
}