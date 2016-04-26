import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class RouterDataService {
    title = new Subject<string>();
    icon = new Subject<string>();
}