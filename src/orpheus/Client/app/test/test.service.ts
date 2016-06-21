import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TestModel } from './test.model';
import 'rxjs/Rx';

@Injectable()
export class TestService {
    constructor(private _http: Http) { }

    getTestModels() {
        return this._http.get('/api/test')
            .map(r => { return r.json(); });
    }
}