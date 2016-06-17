import { Component, Input } from 'angular2/core';
import { Statistic, StatisticDetail, StatisticMode } from '../models/statistic'; 

@Component({
    selector: 'statistic-info-detail',
    templateUrl: 'statistic-info-detail.html',
    styleUrls: ['statistic-info-detail.css']
})

export class StatisticInfoDetailComponent {

    @Input() stats: Statistic[];
    @Input() mode: StatisticMode;

    constructor() {

    }

    ngOnInit() {

    }
}