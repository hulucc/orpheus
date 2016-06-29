import { Component, Input } from '@angular/core'
import { TimeLineTrace } from '../models/trace'
import { HelperService } from '../services/helper'


@Component({
    selector: 'trace-timeline',
    template: require('./trace-timeline.html'),
    styles: [require('./trace-timeline.css')],
})
export class TracePlanComponent {
    @Input() timelines: TimeLineTrace[] = [];

    constructor(private helper: HelperService) {}
}