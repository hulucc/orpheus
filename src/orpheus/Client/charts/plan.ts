import { Component, Input } from 'angular2/core'
import { DailyInfo, PlanInfo } from '../models/dailyinfo'

@Component({
    selector: 'plan-table',
    templateUrl: 'plan.html',
    styleUrls: ['plan.css'],
})
export class PlanTableComponent {
    @Input() dailyInfoes: DailyInfo[];
}