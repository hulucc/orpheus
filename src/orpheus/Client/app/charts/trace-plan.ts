import { Component, Input } from '@angular/core'
import { PlanInfoTrace } from '../models/trace'
import { HelperService } from '../services/helper'

@Component({
    selector: 'trace-plan',
    template: require('./trace-plan.html'),
    styles: [require('./trace-plan.css')],
})
export class TracePlanComponent {
    @Input() plans: PlanInfoTrace[] = [];

    constructor(private helper: HelperService) {
    }
}