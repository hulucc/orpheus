import { Component, OnInit, ViewChild } from 'angular2/core';
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

    //help
    dateFormat: string = 'YYYY年MM月DD日';
    //view search bind
    lineGroup1: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', 
        '09', '10', '12', '13','14', '15', '16', '17', '18'];
    lineGroup2: string[] = ['D01', 'D02', 'D03']
    selectedLines: string[] = [];
    date: string;
    showPlan: boolean = true;
    showTimeLine: boolean = true;
    //view result bind
    resultLines: string[] = [];
    resultShowPlan: boolean = true;
    resultShowTimeLine: boolean = true;
    dailyInfoes: { [id: string] : DailyInfo[] } = {};
    states: string[];
    showResult: boolean = false;    
    errMsg: string;
    
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
            plan: this.routeParams.get('plan'),
            tl: this.routeParams.get('tl'),
        };
        if(p.line && p.date) {
            (<any>$("button[type='submit']")).button('loading');
            this.selectedLines = p.line.split(',');
            this.resultLines = p.line.split(',')
            this.date = p.date;
            this.getDailyInfo();
        }
        if(p.plan) {
            this.showPlan = (p.plan === 'true');
            this.resultShowPlan = (p.plan === 'true');
        }
        if(p.tl) {
            this.showTimeLine = (p.tl === 'true');
            this.resultShowTimeLine = (p.tl === 'true');
        }
    }

    ngAfterViewInit() {
        (<any>$('#select1')).multiselect({
            includeSelectAllOption: true,
            enableClickableOptGroups: true,
            enableHTML: true,
            inheritClass: true,
            buttonWidth: '100%',
            dropRight: true,
            maxHeight: 300,
            numberDisplayed: 10,
            nonSelectedText: '&nbsp;',
            nSelectedText: '条线体已选择',
            selectAllText: '全选',
            allSelectedText: '全选',
            onChange: (element, checked) => {
                let brands = $('#select1 option:selected');
                let selected = [];
                $(brands).each(function (index, brand) {
                    selected.push($(this).val());
                });
                this.selectedLines = selected;
            },
        });
        (<any>$('#select1')).multiselect('select', this.selectedLines);

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
        for (let line of this.resultLines) {
            this.dailyInfoSvc
                .query(line, moment(this.date, this.dateFormat))
                .subscribe(
                    res => this.dailyInfoes[line] = res,
                    err => this.onSubmitError(err),
                    () => this.onSubmitComplete());
        }
        
    }

    //events
    onSubmit() {
        let isoDate: string = moment(this.date, this.dateFormat).toISOString();
        let link = ['ViewPage', { 
            line: this.selectedLines.join(','), 
            date: isoDate,
            plan: String(this.showPlan),
            tl: String(this.showTimeLine) }];
        this.router.navigate(link);
    }

    onSubmitError(err: any) {
        this.showResult = true;
        this.errMsg = err;
        (<any>$("button[type='submit']")).button('reset');
    }

    onSubmitComplete() {
        this.showResult = true;
        (<any>$("button[type='submit']")).button('reset');
    }
}