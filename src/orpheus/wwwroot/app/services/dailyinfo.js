"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx'); //Add all operators to Observable
var Observable_1 = require('rxjs/Observable');
var moment = require('moment');
var DailyInfoService = (function () {
    function DailyInfoService(http) {
        this.http = http;
    }
    DailyInfoService.prototype.dateParse = function (key, value) {
        var datetimeFormat = /^(\d{4})\/(\d{2})\/(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/;
        if (typeof value === 'string' && datetimeFormat.exec(value))
            return moment(value, 'YYYY/MM/DD hh:mm:ss');
        else
            return value;
    };
    DailyInfoService.prototype.query = function (line, date) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('line', line);
        params.set('date', date.format('YYYY/MM/DD'));
        return this.http.get('/api/dailyinfo/query', {
            search: params,
        })
            .map(function (r) { return JSON.parse(r.text(), _this.dateParse); })
            .catch(this.onError);
    };
    DailyInfoService.prototype.get = function (id) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('id', String(id));
        return this.http.get('/api/dailyinfo/get', {
            search: params,
        })
            .map(function (r) { return JSON.parse(r.text(), _this.dateParse); })
            .catch(this.onError);
    };
    DailyInfoService.prototype.getDicts = function () {
        return this.http.get('/api/dailyinfo/dict')
            .map(function (r) { return r.json(); })
            .catch(this.onError);
    };
    DailyInfoService.prototype.getStatistics = function (mode, date, lines) {
        var params = new http_1.URLSearchParams();
        params.set('type', mode);
        params.set('date', date.format('YYYY/MM/DD'));
        params.set('lines', lines.join(','));
        var option = { search: params };
        return this.http.get('/api/dailyinfo/statistic', option)
            .map(function (r) { return r.json(); })
            .catch(this.onError);
    };
    DailyInfoService.prototype.onError = function (err) {
        console.error(err);
        return Observable_1.Observable.throw('服务器错误');
    };
    DailyInfoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DailyInfoService);
    return DailyInfoService;
}());
exports.DailyInfoService = DailyInfoService;
