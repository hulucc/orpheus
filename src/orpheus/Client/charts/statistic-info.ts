import { Component, Input } from '@angular/core';
import { Statistic, StatisticMode } from '../models/statistic'; 

@Component({
    selector: 'statistic-info',
    templateUrl: 'statistic-info.html',
    styleUrls: ['statistic-info.css']
})

export class StatisticInfoComponent {

    @Input() stats: Statistic[];
    @Input() mode: StatisticMode;

    constructor() {

    }

    ngOnInit() {

    }
    //help
    round(val: number) {
        return Math.round(val);
    }
}