import { Component, Input } from '@angular/core';
import { Statistic, StatisticMode } from '../models/statistic'; 

@Component({
    selector: 'statistic-info',
    template: require('./statistic-info.html'),
    styles: [require('./statistic-info.css')]
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