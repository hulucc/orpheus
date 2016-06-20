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
var router_deprecated_1 = require('@angular/router-deprecated');
var router_data_1 = require('../services/router-data');
var date_picker_1 = require('../charts/date-picker');
var line_selector_1 = require('../charts/line-selector');
var mode_selector_1 = require('../charts/mode-selector');
var statistic_info_1 = require('../charts/statistic-info');
var statistic_info_detail_1 = require('../charts/statistic-info-detail');
var dailyinfo_1 = require('../services/dailyinfo');
var moment = require('moment');
var StatPageComponent = (function () {
    function StatPageComponent(router, routeParams, routerData, dailyInfoSvc) {
        this.router = router;
        this.routeParams = routeParams;
        this.routerData = routerData;
        this.dailyInfoSvc = dailyInfoSvc;
        this.rlines = [];
        this.statistics = {};
        this.routerData.title.next('统计信息');
        this.routerData.icon.next('glyphicon-stats');
    }
    StatPageComponent.prototype.ngOnInit = function () {
        if (this.loadQueryParams()) {
            $("button[type='submit']")
                .button('loading');
            this.loadStatistics();
        }
    };
    StatPageComponent.prototype.onSubmit = function () {
        var params = {
            mode: this.mode,
            date: this.date.toISOString(),
            lines: this.lines.join(','),
            lineCombination: String(this.lineCombination),
            detailDisplay: String(this.detailDisplay),
        };
        var link = ['StatPage', params];
        this.router.navigate(link);
    };
    StatPageComponent.prototype.onSubmitSuccess = function (line, stats) {
        //this.rlines.push(line);
        console.log(this.statistics);
        this.statistics[line] = stats;
        this.onSubmitFinish();
    };
    StatPageComponent.prototype.onSubmitError = function (err) {
        console.log(err);
        this.errMsg = err;
        this.onSubmitFinish();
    };
    StatPageComponent.prototype.onSubmitFinish = function () {
        $("button[type='submit']")
            .button('reset');
    };
    //private
    StatPageComponent.prototype.loadQueryParams = function () {
        var p = {
            mode: this.routeParams.get('mode'),
            date: this.routeParams.get('date'),
            lines: this.routeParams.get('lines'),
            lineCombination: this.routeParams.get('lineCombination'),
            detailDisplay: this.routeParams.get('detailDisplay'),
        };
        if (p.mode && p.date && p.lines && p.lineCombination && p.detailDisplay) {
            this.mode = p.mode;
            this.date = moment(p.date);
            this.lines = p.lines.split(',');
            this.lineCombination = (p.lineCombination === 'true');
            this.detailDisplay = (p.detailDisplay === 'true');
            return true;
        }
        else
            return false;
    };
    StatPageComponent.prototype.loadStatistics = function () {
        var _this = this;
        this.rmode = this.mode;
        this.rdate = this.date;
        this.rlineCombination = this.lineCombination;
        this.rdetailDisplay = this.detailDisplay;
        //this.rlines = this.lines;
        var lines;
        if (this.lineCombination)
            lines = [this.lines];
        else
            lines = this.lines.map(function (l) { return [l]; });
        this.rlines = lines.map(function (ls) { return ls.join(' '); });
        var _loop_1 = function(line) {
            this_1.dailyInfoSvc
                .getStatistics(this_1.mode, this_1.date, line)
                .subscribe(function (res) { return _this.onSubmitSuccess(line.join(' '), res); }, function (err) { return _this.onSubmitError(err); });
        };
        var this_1 = this;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            _loop_1(line);
        }
    };
    StatPageComponent.prototype.getDateFormat = function (mode) {
        if (mode == 'MonthByDay')
            return 'YYYY年MM月';
        else if (mode == 'MonthByWeek')
            return 'YYYY年MM月';
        else if (mode == 'YearByMonth')
            return 'YYYY年';
        else
            return 'YYYY年MM月DD日';
    };
    StatPageComponent.prototype.showErrorMsg = function (err) {
        $('.stat-result').insertBefore('<p>hello</p>');
    };
    StatPageComponent = __decorate([
        core_1.Component({
            selector: 'stat-page',
            moduleId: module.id,
            template: "\n      <div class=\"page-container\">\n          <div class=\"stat-search row\">\n              <form class=\"col-xs-12\" (ngSubmit)=\"onSubmit()\">\n                  <div class=\"form-group\">\n                      <label class=\"control-label\">\u6C47\u603B\u65B9\u5F0F</label>\n                      <mode-selector [(mode)]=\"mode\"></mode-selector>\n                  </div>\n                  <div class=\"form-group\">\n                      <label class=\"control-label\" for=\"\">\u65F6\u95F4\u8303\u56F4</label>\n                      <date-picker [dateFormat]=\"getDateFormat(mode)\" [(date)]=\"date\"></date-picker>\n                  </div>\n                  <div class=\"form-group\">\n                      <label class=\"control-label\" for=\"\">\u7EBF\u4F53</label>\n                      <line-selector [(selected)]=\"lines\"></line-selector>\n                  </div>\n                  <div class=\"form-group\">\n                      <label class=\"control-label\">\u9009\u9879</label>\n                      <br />\n                      <label class=\"checkbox-inline\">\n                          <input type=\"checkbox\" [(ngModel)]=\"lineCombination\" /> \u6C47\u603B\u7EBF\u4F53\n                      </label>\n                      <label class=\"checkbox-inline\">\n                          <input type=\"checkbox\" [(ngModel)]=\"detailDisplay\" /> \u8BE6\u7EC6\u4FE1\u606F\n                      </label>\n                  </div>\n                  <button \n                          type=\"submit\" \n                          class=\"btn btn-default pull-right\" \n                          [disabled]=\"!(mode && lines && date)\"\n                          data-loading-text=\"\u67E5\u8BE2\u4E2D...\">\n                      \u63D0\u4EA4\n                  </button>\n              </form>\n              <div *ngIf=\"false\">\n                  <div>{{mode}}</div>\n                  <div>{{date?.format('YYYY\u5E74MM\u6708DD\u65E5')}}</div>\n                  <div>{{lines}}</div>\n                  <div>{{lineCombination}}</div>\n                  <div>{{detailDisplay}}</div>\n              </div>\n          </div>\n\n          <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"errMsg\">{{errMsg}}</div>\n          <div class=\"stat-result\">\n              <div *ngFor=\"let rline of rlines\">\n                  <div *ngIf=\"statistics[rline]\">\n                      <div class=\"page-header\">\n                          <h3>{{rdate?.format(getDateFormat(rmode))}} <small>\u7EBF\u4F53\uFF1A {{rline}}</small></h3>\n                      </div>\n                      <statistic-info [mode]=\"rmode\" [stats]=\"statistics[rline]\"></statistic-info>\n                      <div *ngIf=\"rdetailDisplay\">\n                          <div class=\"page-header\">\n                              <h3>\u8BE6\u7EC6\u4FE1\u606F</h3>\n                          </div>\n                          <statistic-info-detail [mode]=\"rmode\" [stats]=\"statistics[rline]\"></statistic-info-detail>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n    ",
            styles: ["\n      .form-control{\n          -webkit-appearance:none;\n          -moz-appearance: none;\n      }\n\n      select::-ms-expand {\n          display: none;\n      }\n\n      .page-container {\n          margin: 0 auto;\n          padding: 0 30px;\n      }\n\n      @media (min-width: 998px) {\n          .page-container {\n              width: 750px;\n              padding: 0 15px;\n          }\n      }\n\n      @media (min-width: 1222px) {\n          .page-container {\n              width: 970px;\n              padding: 0 15px;\n          }\n      }\n\n      .footer {\n          margin-top: 100px;\n      }:host{\n\n      }\n\n      .stat-search {\n          margin: 0 auto;\n          max-width: 400px;\n          margin-bottom: 30px;\n      }\n    "],
            directives: [
                mode_selector_1.ModeSelectorComponent,
                date_picker_1.DatePickerComponent,
                line_selector_1.LineSelectorComponent,
                statistic_info_1.StatisticInfoComponent,
                statistic_info_detail_1.StatisticInfoDetailComponent],
            providers: [dailyinfo_1.DailyInfoService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, router_data_1.RouterDataService, dailyinfo_1.DailyInfoService])
    ], StatPageComponent);
    return StatPageComponent;
}());
exports.StatPageComponent = StatPageComponent;
