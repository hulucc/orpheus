import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { TracePlanComponent } from '../../charts/trace-plan'
import { RouterDataService } from '../../services/router-data'
import { DailyInfoService } from '../../services/dailyinfo'
import { PlanInfoTrace } from '../../models/trace'

@Component({
    template: require('./planinfo.html'),
    styles: [require('../page.css'), require('./planinfo.css')],
    directives: [TracePlanComponent],
})
export class PlanInfoTracePageComponent {
    id: string[];
    traces: PlanInfoTrace[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private routerData: RouterDataService,
                private location: Location,
                private dailySvc: DailyInfoService) {
        this.route.params.subscribe(ps => this.id = ps['id'].split(','));
        this.routerData.title.next('计划追踪');
        this.routerData.icon.next('glyphicon-screenshot');
    }

    ngOnInit() {
        this.dailySvc
            .getPlanInfoTrace(this.id)
            .subscribe(res => this.onSuccess(res),
                       err => this.onError(err))
    }

    onSuccess(traces: PlanInfoTrace[]) {
        this.traces = traces;
        this.onFinish();
    }

    onError(err: any) {
        console.log(err);
        this.onFinish();
    }

    onFinish() {
    
    }

    goBack() {
        this.location.back();
    }
}