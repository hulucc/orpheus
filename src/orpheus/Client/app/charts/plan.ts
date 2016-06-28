import { Component, Input } from '@angular/core'
import { DailyInfo, PlanInfo } from '../models/dailyinfo'
import { HelperService } from '../services/helper'

@Component({
    selector: 'plan-table',
    template: require('./plan.html'),
    styles: [require('./plan.css')],
})
export class PlanTableComponent {
    @Input() dailyInfoes: DailyInfo[];
    
    constructor(private helper: HelperService) {}
}