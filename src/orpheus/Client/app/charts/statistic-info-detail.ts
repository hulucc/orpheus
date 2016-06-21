import { Component, Input, ElementRef } from '@angular/core';
import { Statistic, StatisticDetail, StatisticMode } from '../models/statistic'; 

@Component({
    selector: 'statistic-info-detail',
    template: require('./statistic-info-detail.html'),
    styles: [require('./statistic-info-detail.css')]
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