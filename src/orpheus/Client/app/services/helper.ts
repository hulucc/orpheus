import { Injectable } from '@angular/core'

@Injectable()
export class HelperService {
    plus(sLotUncomp: number, append: number): string|number {
        if(append == 0) {
            return sLotUncomp;
        } else if (append > 0) {
            return sLotUncomp + ' + ' + append;
        } else if (append < 0) {
            return sLotUncomp + ' - ' + Math.abs(append);
        }
    }

    duration(start: moment.Moment, end: moment.Moment): string {
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