import { Component, Input } from 'angular2/core'
import { DailyInfo, PlanInfo } from '../models/dailyinfo'

@Component({
    selector: 'plan-table',
    templateUrl: 'plan.html',
    styleUrls: ['plan.css'],
})
export class PlanTableComponent {
    @Input() dailyInfoes: DailyInfo[];

    //private
    private formatSLotUncomp(sLotUncomp, append) {
        if(append == 0) {
            return sLotUncomp;
        } else if (append > 0) {
            return sLotUncomp + ' + ' + append;
        } else if (append < 0) {
            return sLotUncomp + ' - ' + Math.abs(append);
        }
    }
}