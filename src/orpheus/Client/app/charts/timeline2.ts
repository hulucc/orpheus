﻿import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DailyInfo, TimeLine, Dict } from '../models/dailyinfo'
import { PopoverDirective } from './timeline-popover'
import { HelperService } from '../services/helper'

@Component({
    selector: 'timeline2-chart',
    template: require('./timeline2.html'),
    styles: [require('./timeline2.css')],
    directives: [PopoverDirective]
})
export class TimeLine2ChartComponent {
    @Input() states: string[];
    @Input() daily: DailyInfo;

    constructor(private helper: HelperService) {}

    //private function
    private getHours(daily: DailyInfo) {
        if(daily['hours'])
            return daily['hours'];
        let hours: string[] = [];
        for(let i = daily.startTime.clone(); i < daily.endTime; i.add(1, 'hour'))
            hours.push(i.format('HH:mm'));
        daily['hours'] = hours;
        return hours;
    }

    private filterState(items: TimeLine[], index: number): TimeLine[] {
        return items.filter(i => i.state - 1 === index);
    }

    private MinutesToPercent(mins: number, daily: DailyInfo): number {
        let totalMins = daily.endTime.diff(daily.startTime, 'minute');
        return mins / totalMins * 100;
    }

    private getItemRect(item: TimeLine, daily: DailyInfo) {
        let leftMins = item.startTime.diff(daily.startTime, 'minute');
        let rightMins = item.endTime.diff(daily.startTime, 'minute');
        let left = this.MinutesToPercent(leftMins, daily);
        let right = this.MinutesToPercent(rightMins, daily);
        return {
            left: left,
            width: right - left
        };
    }
}