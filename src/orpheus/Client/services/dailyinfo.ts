﻿import { Injectable } from 'angular2/core';
import { Http, URLSearchParams, Response } from 'angular2/http';
import 'rxjs/Rx'; //Add all operators to Observable
import { Observable } from 'rxjs/Observable';
import { DailyInfo, Dict } from '../models/dailyinfo';
import { Statistic, StatisticMode } from '../models/statistic'
import moment from 'moment';

@Injectable()
export class DailyInfoService {
    constructor(private http: Http) {}

    private dateParse(key, value) {
        let datetimeFormat = /^(\d{4})\/(\d{2})\/(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/;
        if(typeof value === 'string' && datetimeFormat.exec(value))
            return moment(value, 'YYYY/MM/DD hh:mm:ss');
        else
            return value;
    }

    query(line: string, date: moment.Moment): Observable<DailyInfo[]> {
        let params = new URLSearchParams();
        params.set('line', line);
        params.set('date', date.format('YYYY/MM/DD'));
        return this.http.get('/api/dailyinfo/query', {
            search: params,
        })
        .map(r => <DailyInfo[]>JSON.parse(r.text(), this.dateParse))
        //.do(d => console.log(d))
        .catch(this.onError);
    }

    get(id: number): Observable<DailyInfo> {
        let params = new URLSearchParams();
        params.set('id', String(id));
        return this.http.get('/api/dailyinfo/get', {
            search: params,
        })
        .map(r => <DailyInfo>JSON.parse(r.text(), this.dateParse))
        //.do(d => console.log(d))
        .catch(this.onError);
    }

    getDicts(): Observable<Dict[]> {
        return this.http.get('/api/dailyinfo/dict')
        .map(r => <Dict[]>r.json())
        //.do(d => console.log(d))
        .catch(this.onError);
    }

    getStatistics(mode: StatisticMode, date: moment.Moment, lines: string[]): Observable<Statistic[]> {
        let params = new URLSearchParams();
        params.set('type', mode);
        params.set('date', date.format('YYYY/MM/DD'));
        params.set('lines', lines.join(','));
        let option = { search: params };
        return this.http.get('/api/dailyinfo/statistic', option)
        .map(r => <Statistic[]>r.json())
        //.do(d => console.log(d))
        .catch(this.onError);
    }

    private onError(err: Response) {
        console.error(err);
        return Observable.throw('服务器错误');
    }
}