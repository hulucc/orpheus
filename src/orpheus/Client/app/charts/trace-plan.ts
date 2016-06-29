import { Component, Input } from '@angular/core'
import { PlanInfoTrace } from '../models/trace'

@Component({
    selector: 'trace-plan',
    template: require('./trace-plan.html'),
    styles: [require('./trace-plan.css')],
})
export class TracePlanComponent {
    @Input() plans: PlanInfoTrace[] = [];

    //private
    private plus(sLotUncomp, append) {
        if(append == 0) {
            return sLotUncomp;
        } else if (append > 0) {
            return sLotUncomp + ' + ' + append;
        } else if (append < 0) {
            return sLotUncomp + ' - ' + Math.abs(append);
        }
    }
}