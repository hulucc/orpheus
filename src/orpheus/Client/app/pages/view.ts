import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterDataService } from '../services/router-data';
import { DailyInfo, Dict } from '../models/dailyinfo';
import { DailyInfoService } from '../services/dailyinfo';
import { DatePickerComponent } from '../charts/date-picker';
import { LineSelectorComponent } from '../charts/line-selector';
import { PlanTableComponent } from '../charts/plan'
import { TimeLineChartComponent } from '../charts/timeline';
import { TimeLine2ChartComponent } from '../charts/timeline2';

@Component({
    template: require('./view.html'),
    styles: [require('./page.css'), require('./view.css')],
    directives: [
        DatePickerComponent,
        LineSelectorComponent,
        PlanTableComponent, 
        TimeLineChartComponent, 
        TimeLine2ChartComponent],
    providers: [DailyInfoService]
})
export class ViewPageComponent {

    //help
    private sub: any;
    //view search bind
    lines: string[] = [];
    date: moment.Moment;
    showPlan: boolean = true;
    showTimeLine: boolean = true;
    //view result bind
    rlines: string[];
    rshowPlan: boolean;
    rshowTimeLine: boolean;
    dailyInfoes: { [id: string] : DailyInfo[] } = {};
    states: string[];
    showResult: boolean;    
    errMsg: string;
    
    constructor(
        private router: Router,
        private routerData: RouterDataService,
        private dailyInfoSvc: DailyInfoService) {
        this.routerData.title.next('作业日报查看');
        this.routerData.icon.next('glyphicon-search');
    }
    
    ngOnInit() {
        this.sub = this.router.routerState.queryParams
            .subscribe(ps => this.loadQueryParams(ps));
    }
    ngOnDestory() {
        this.sub.unsubscribe();
    }

    //private funcitons
    private loadQueryParams(params: { [key:string]: any }) {
        let p = <any>params;
        this.lines = p.line ? p.line.split(',') : [];
        this.date = p.date ? moment(p.date) : null;
        this.showPlan = p.plan ? p.plan === 'true' : true;
        this.showTimeLine = p.tl ? p.tl === 'true' : true;
        if(p.line && p.date) {
            this.rlines = this.lines;
            this.rshowPlan = this.showPlan;
            this.rshowTimeLine = this.showTimeLine;
            
            $("button[type='submit']").button('loading');
            this.loadDailyInfo();
        }
    }

    private loadDailyInfo() {
        this.dailyInfoSvc
            .getDicts()
            .subscribe(
                res => this.states = res.filter(s => s.state != null).map(s => s.state),
                err => this.errMsg = err);
        for (let line of this.rlines) {
            this.dailyInfoSvc
                .query(line, this.date)
                .subscribe(
                    res => this.onSubmitSuccess(line, res),
                    err => this.onSubmitError(err));
        }
        
    }

    //events
    onSubmit() {
        let isoDate: string = this.date.toISOString();
        let params = { 
            line: this.lines.join(','), 
            date: isoDate,
            plan: String(this.showPlan),
            tl: String(this.showTimeLine) };
        this.router.navigate(['/view'], {queryParams: params});
    }

    onSubmitSuccess(line: string, dailys: DailyInfo[]) {
        this.dailyInfoes[line] = dailys;
        this.onSubmitComplete();
    }

    onSubmitError(err: any) {
        this.errMsg = err;
        this.onSubmitComplete();
    }

    onSubmitComplete() {
        this.showResult = true;
        $("button[type='submit']").button('reset');
    }
}