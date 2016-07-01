import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Statistic, StatisticMode } from '../models/statistic'; 

@Component({
    selector: 'statistic-info',
    template: require('./statistic-info.html'),
    styles: [require('./statistic-info.css')],
    directives: [ROUTER_DIRECTIVES],
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

    trace(stat: Statistic, property: string) {
        let id = stat.trace.traceInfoes[property]
        if(id)
            return id.join(',');
        else
            return '';
    }
}