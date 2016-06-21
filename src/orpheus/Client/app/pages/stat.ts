import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { RouterDataService } from '../services/router-data';
import { DatePickerComponent } from '../charts/date-picker';
import { LineSelectorComponent } from '../charts/line-selector';
import { ModeSelectorComponent } from '../charts/mode-selector';
import { StatisticInfoComponent } from '../charts/statistic-info';
import { StatisticInfoDetailComponent } from '../charts/statistic-info-detail';
import { Statistic, StatisticDetail, StatisticTrace, StatisticMode } from '../models/statistic';
import { DailyInfoService } from '../services/dailyinfo'
import * as moment from 'moment';

@Component({
    selector: 'stat-page',
    template: require('./stat.html'),
    styles: [require('./page.css'), require('./stat.css')],
    directives: [
        ModeSelectorComponent, 
        DatePickerComponent, 
        LineSelectorComponent,
        StatisticInfoComponent,
        StatisticInfoDetailComponent],
    providers: [DailyInfoService]
})
export class StatPageComponent {
    
    //stat-search bind
    mode: StatisticMode;
    date: moment.Moment;
    lines: string[];
    lineCombination: boolean;
    detailDisplay: boolean;
    //stat-result bind
    errMsg: string;
    rlines: string[] = [];
    statistics: { [line: string]: Statistic[] } = {};
    rmode: StatisticMode;
    rdate: moment.Moment;
    rlineCombination: boolean;
    rdetailDisplay: boolean;

    constructor(
        private router: Router,
        private routeParams: RouteParams,
        private routerData: RouterDataService,
        private dailyInfoSvc: DailyInfoService
        ) {
        this.routerData.title.next('统计信息');
        this.routerData.icon.next('glyphicon-stats');
    }

    ngOnInit() {
        if(this.loadQueryParams()) {
            (<any>$("button[type='submit']"))
                .button('loading');
            this.loadStatistics();
            //this.showErrorMsg('');
        }
    }

    onSubmit() {
        let params = {
            mode: this.mode,
            date: this.date.toISOString(),
            lines: this.lines.join(','),
            lineCombination: String(this.lineCombination),
            detailDisplay: String(this.detailDisplay),
        };
        let link = ['StatPage', params];
        this.router.navigate(link);
    }

    onSubmitSuccess(line: string, stats: Statistic[]) {
        //this.rlines.push(line);
        console.log(this.statistics);
        this.statistics[line] = stats;
        this.onSubmitFinish();
    }

    onSubmitError(err: any) {
        console.log(err);
        this.errMsg = err;
        this.onSubmitFinish();
    }

    onSubmitFinish() {
        (<any>$("button[type='submit']"))
            .button('reset');
    }

    //private
    private loadQueryParams(): boolean {
        let p = {
            mode: this.routeParams.get('mode'),
            date: this.routeParams.get('date'),
            lines: this.routeParams.get('lines'),
            lineCombination: this.routeParams.get('lineCombination'),
            detailDisplay: this.routeParams.get('detailDisplay'),
        };
        if(p.mode && p.date && p.lines && p.lineCombination && p.detailDisplay) {
            this.mode = <StatisticMode>p.mode;
            this.date = moment(p.date);
            this.lines = p.lines.split(',');
            this.lineCombination = (p.lineCombination === 'true');
            this.detailDisplay = (p.detailDisplay === 'true');
            return true;
        }
        else
            return false;
    }

    private loadStatistics() {
        this.rmode = this.mode;
        this.rdate = this.date;
        this.rlineCombination = this.lineCombination;
        this.rdetailDisplay = this.detailDisplay;
        //this.rlines = this.lines;

        let lines:string[][];
        if(this.lineCombination)
            lines = [this.lines];
        else
            lines = this.lines.map(l => [l]);
        this.rlines = lines.map(ls => ls.join(' '));

        for(let line of lines) {
            this.dailyInfoSvc
                .getStatistics(this.mode, this.date, line)
                .subscribe(
                    res => this.onSubmitSuccess(line.join(' '), res),
                    err => this.onSubmitError(err));
        }
        
    }

    private getDateFormat(mode: StatisticMode) {
        if(mode == 'MonthByDay')
            return 'YYYY年MM月'
        else if(mode == 'MonthByWeek')
            return 'YYYY年MM月'
        else if(mode == 'YearByMonth')
            return 'YYYY年'
        else
            return 'YYYY年MM月DD日'
    }

    private showErrorMsg(err: string) {
        $('.stat-result').insertBefore('<p>hello</p>');
    }
}