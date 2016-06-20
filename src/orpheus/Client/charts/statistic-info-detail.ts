import { Component, Input, ElementRef } from '@angular/core';
import { Statistic, StatisticDetail, StatisticMode } from '../models/statistic'; 

@Component({
    selector: 'statistic-info-detail',
    templateUrl: 'statistic-info-detail.html',
    styleUrls: ['statistic-info-detail.css']
})

export class StatisticInfoDetailComponent {

    @Input() stats: Statistic[];
    @Input() mode: StatisticMode;

    constructor(private el: ElementRef) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        (<any>$(this.el.nativeElement))
            .find('table')
            .tableHeadFixer({
            'left': 1,
            'z-index': 999,
        });
    }
}