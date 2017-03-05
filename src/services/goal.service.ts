import {Injectable} from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { SDG } from '../pages/sdg-details/sdg';

@Injectable()
export class GoalService {
    
    constructor(public http: Http, public translate: TranslateService) {
    }

    getGoals(): Observable<SDG[]>  {
        var path = './assets/data/' + this.translate.getDefaultLang() + '/goals.json';
        return this.http.request(path)
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