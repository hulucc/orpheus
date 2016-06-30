import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { DailyInfoService } from 'app/services/dailyinfo'

@Component({
    template: require('./planinfo.html'),
    styles: [require('../page.css'), require('./planinfo.css')],
})
export class PlanInfoTracePageComponent {
    id: string[];
    
    constructor(private router: Router,
                private route: ActivatedRoute) {
        this.route.params.subscribe(ps => this.id = ps['id'].split(','));
    }

    ngOnInit() {
        
    }
}