import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { RouterDataService } from '../services/router-data';
import { NgForm, FORM_DIRECTIVES, FORM_PROVIDERS, Validators } from 'angular2/common';
import { DailyInfo, Dict } from '../models/dailyinfo';
import { DailyInfoService } from '../services/dailyinfo';
import { PlanTableComponent } from '../charts/plan'
import { TimeLineChartComponent } from '../charts/timeline';
import { TimeLine2ChartComponent } from '../charts/timeline2';
import moment from 'moment';

@Component({
    selector: 'view-page',
    templateUrl: 'view.html',
    styleUrls: ['page.css', 'view.css'],
    directives: [FORM_DIRECTIVES, PlanTableComponent, TimeLineChartComponent, TimeLine2ChartComponent],
    providers: [DailyInfoService, FORM_PROVIDERS]
})
export class ViewPageComponent {

    lines: string[] = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 
        '12', '13','14', '15', '16', '17', '18', 'D01', 'D02', 'D03'];
    line: string;
    date: string;
    dateFormat: string = 'YYYY年MM月DD日';
    dailyInfoes: DailyInfo[] = [];
    states: string[];
    errMsg: string;
    showResult: boolean = false;


    constructor(
        private router: Router,
        private routerData: RouterDataService,
        private routeParams: RouteParams,
        private dailyInfoSvc: DailyInfoService
        ) {
        this.routerData.title.next('作业日报查看');
        this.routerData.icon.next('glyphicon-search');
    }
    
    ngOnInit() {
        let p = {
            line: this.routeParams.get('line'),
            date: moment(this.routeParams.get('date')).format(this.dateFormat),
        };
        if(p.line && p.date) {
            (<any>$('button')).button('loading');
            this.line = p.line;
            this.date = p.date;
            this.getDailyInfo();
        }
    }

    ngAfterViewInit() {
        (<any>$('#datetimepicker1')).datetimepicker({
            format: this.dateFormat,
            locale: 'zh-cn',
        })
        .on('dp.change', (e) => {
            if(e.date.format)
                this.date = e.date.format(this.dateFormat);
        });
    }
    //private funcitons
    private getDailyInfo() {
        this.dailyInfoSvc
            .getDicts()
            .subscribe(
                res => this.states = res.filter(s => s.state != null).map(s => s.state),
                err => this.errMsg = err);
        this.dailyInfoSvc
            .query(this.line, moment(this.date, this.dateFormat))
            .subscribe(
                res => this.dailyInfoes = res,
                err => this.onSubmitError(err),
                () => this.onSubmitComplete());
    }

    //events
    onSubmit() {
        let isoDate: string = moment(this.date, this.dateFormat).toISOString();
        let link = ['ViewPage', { line: this.line, date: isoDate }];
        this.router.navigate(link);
    }

    onSubmitError(err: any) {
        this.showResult = true;
        this.errMsg = err;
        (<any>$('button')).button('reset');
    }

    onSubmitComplete() {
        this.showResult = true;
        (<any>$('button')).button('reset');
    }
}