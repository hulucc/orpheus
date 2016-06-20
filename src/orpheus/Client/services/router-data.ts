import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class RouterDataService {
    title = new Subject<string>();
    icon = new Subject<string>();
}