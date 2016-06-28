import { Component, Input } from '@angular/core'
import { TimeLineEx } from '../models/trace'
import { HelperService } from '../services/helper'


@Component({
    selector: 'trace-timeline',
    template: require('./trace-timeline.html'),
    styles: [require('./trace-timeline.css')],
})
export class TracePlanComponent {
    @Input() timelines: TimeLineEx[] = [];

    constructor(private helper: HelperService) {}
}