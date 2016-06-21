import { Component, OnInit, Input, Directive, ElementRef } from '@angular/core';
import { DailyInfo, TimeLine, Dict } from '../models/dailyinfo'
import { PopoverDirective } from './timeline-popover'
import * as moment from 'moment';

@Component({
    selector: 'timeline-chart',
    template: require('./timeline.html'),
    styles: [require('./timeline.css')],
    directives: [PopoverDirective]
})
export class TimeLineChartComponent {
    @Input() states: string[] = [];
    @Input() dailyInfoes: DailyInfo[] = [];

    cellWidth: number = 79;

    ngOnInit() {
    }

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

    private getRightWidth() {
        let count: number = 0;
        for(let daily of this.dailyInfoes)
            count += this.getHours(daily).length;
        return count * this.cellWidth + 8;
    }

    private filterState(items: TimeLine[], stateIndex: number): TimeLine[] {
        return items.filter(i => i.state - 1 === stateIndex);
    }

    private MinutesToPixels(mins: number): number {
        return mins / 60 * this.cellWidth;
    }

    private getItemRect(item: TimeLine, daily: DailyInfo) {
        let leftMins = item.startTime.diff(daily.startTime, 'minute');
        let rightMins = item.endTime.diff(daily.startTime, 'minute');
        let left = this.MinutesToPixels(leftMins);
        let right = this.MinutesToPixels(rightMins);
        return {
            left: left,
            width: right - left
        };
    }

    private getDurationStr(start: moment.Moment, end: moment.Moment) {
        let mins = end.diff(start, 'minute');
        let duration = moment.duration(mins, 'minute');
        let hour = duration.hours();
        let min = duration.minutes();
        let str = '';
        if(hour && min)
            str = hour + '小时' + min + '分';
        else if(hour)
            str = hour + '小时';
        else if(min)
            str = min + '分钟'
        return str;
    }
}
