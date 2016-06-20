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
var common_1 = require('@angular/common');
var dailyinfo_1 = require('../services/dailyinfo');
var plan_1 = require('../charts/plan');
var timeline_1 = require('../charts/timeline');
var timeline2_1 = require('../charts/timeline2');
var moment = require('moment');
var ViewPageComponent = (function () {
    function ViewPageComponent(router, routerData, routeParams, dailyInfoSvc) {
        this.router = router;
        this.routerData = routerData;
        this.routeParams = routeParams;
        this.dailyInfoSvc = dailyInfoSvc;
        //help
        this.dateFormat = 'YYYY年MM月DD日';
        //view search bind
        this.lineGroup1 = ['01', '02', '03', '04', '05', '06', '07', '08',
            '09', '10', '12', '13', '14', '15', '16', '17', '18'];
        this.lineGroup2 = ['D01', 'D02', 'D03'];
        this.selectedLines = [];
        this.showPlan = true;
        this.showTimeLine = true;
        //view result bind
        this.resultLines = [];
        this.resultShowPlan = true;
        this.resultShowTimeLine = true;
        this.dailyInfoes = {};
        this.showResult = false;
        this.routerData.title.next('作业日报查看');
        this.routerData.icon.next('glyphicon-search');
    }
    ViewPageComponent.prototype.ngOnInit = function () {
        var p = {
            line: this.routeParams.get('line'),
            date: moment(this.routeParams.get('date')).format(this.dateFormat),
            plan: this.routeParams.get('plan'),
            tl: this.routeParams.get('tl'),
        };
        if (p.line && p.date) {
            $("button[type='submit']").button('loading');
            this.selectedLines = p.line.split(',');
            this.resultLines = p.line.split(',');
            this.date = p.date;
            this.getDailyInfo();
        }
        if (p.plan) {
            this.showPlan = (p.plan === 'true');
            this.resultShowPlan = (p.plan === 'true');
        }
        if (p.tl) {
            this.showTimeLine = (p.tl === 'true');
            this.resultShowTimeLine = (p.tl === 'true');
        }
    };
    ViewPageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('#select1').multiselect({
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
            onChange: function (element, checked) {
                var brands = $('#select1 option:selected');
                var selected = [];
                $(brands).each(function (index, brand) {
                    selected.push($(this).val());
                });
                _this.selectedLines = selected;
            },
        });
        $('#select1').multiselect('select', this.selectedLines);
        $('#datetimepicker1').datetimepicker({
            format: this.dateFormat,
            locale: 'zh-cn',
        })
            .on('dp.change', function (e) {
            if (e.date.format)
                _this.date = e.date.format(_this.dateFormat);
        });
    };
    //private funcitons
    ViewPageComponent.prototype.getDailyInfo = function () {
        var _this = this;
        this.dailyInfoSvc
            .getDicts()
            .subscribe(function (res) { return _this.states = res.filter(function (s) { return s.state != null; }).map(function (s) { return s.state; }); }, function (err) { return _this.errMsg = err; });
        var _loop_1 = function(line) {
            this_1.dailyInfoSvc
                .query(line, moment(this_1.date, this_1.dateFormat))
                .subscribe(function (res) { return _this.dailyInfoes[line] = res; }, function (err) { return _this.onSubmitError(err); }, function () { return _this.onSubmitComplete(); });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.resultLines; _i < _a.length; _i++) {
            var line = _a[_i];
            _loop_1(line);
        }
    };
    //events
    ViewPageComponent.prototype.onSubmit = function () {
        var isoDate = moment(this.date, this.dateFormat).toISOString();
        var link = ['ViewPage', {
                line: this.selectedLines.join(','),
                date: isoDate,
                plan: String(this.showPlan),
                tl: String(this.showTimeLine) }];
        this.router.navigate(link);
    };
    ViewPageComponent.prototype.onSubmitError = function (err) {
        this.showResult = true;
        this.errMsg = err;
        $("button[type='submit']").button('reset');
    };
    ViewPageComponent.prototype.onSubmitComplete = function () {
        this.showResult = true;
        $("button[type='submit']").button('reset');
    };
    ViewPageComponent = __decorate([
        core_1.Component({
            selector: 'view-page',
            template: "\n      <div class=\"view-search row\">\n          <form class=\"col-xs-12\" (ngSubmit)=\"onSubmit()\" #searchForm=\"ngForm\">\n              <div class=\"form-group\">\n                  <label>\u7EBF\u4F53</label>\n                  <select id=\"select1\" class=\"form-control\" multiple=\"multiple\">\n                      <optgroup label=\"\u5B9E\u88C5\">\n                          <option *ngFor=\"let l of lineGroup1\" [value]=\"l\">{{l}}</option>\n                      </optgroup>\n                      <optgroup label=\"\u8F66\u8F7D\">\n                          <option *ngFor=\"let l of lineGroup2\" [value]=\"l\">{{l}}</option>\n                      </optgroup>\n                  </select>\n              </div>\n              <div class=\"form-group\">\n                  <label class=\"control-label\" for=\"\">\u4F5C\u4E1A\u65E5</label>\n                  <div class='input-group' id='datetimepicker1'>\n                      <input type='text'\n                             class=\"form-control\"\n                             ngControl=\"date\"\n                             required\n                             pattern=\"^\\d{4}\u5E74\\d{2}\u6708\\d{2}\u65E5$\"\n                             [(ngModel)]=\"date\" />\n                      <span class=\"input-group-addon\">\n                          <span class=\"glyphicon glyphicon-calendar\"></span>\n                      </span>\n                  </div>\n              </div>\n              <div class=\"form-group\">\n                  <label class=\"control-label\" for=\"\">\u663E\u793A</label>\n                  <br />\n                  <label class=\"checkbox-inline\">\n                      <input type=\"checkbox\" [(ngModel)]=\"showPlan\" /> \u8BA1\u5212\n                  </label>\n                  <label class=\"checkbox-inline\">\n                      <input type=\"checkbox\" [(ngModel)]=\"showTimeLine\" /> \u65F6\u95F4\u8F74\n                  </label>\n              </div>\n              <button type=\"submit\"\n                      class=\"btn btn-default pull-right\"\n                      data-loading-text=\"\u67E5\u8BE2\u4E2D...\"\n                      [disabled]=\"!searchForm.valid||!selectedLines.length\">\n                  \u63D0\u4EA4\n              </button>\n          </form>\n      </div>\n\n      <div class=\"page-container\" *ngIf=\"showResult\">\n          <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"errMsg\">{{errMsg}}</div>\n          <div class=\"view-result\" *ngFor=\"let l of resultLines\">\n              <div class=\"alert alert-info\" role=\"alert\" *ngIf=\"!(dailyInfoes[l]?.length)&&!errMsg\">\u6240\u67E5\u8BE2\u7684{{l}}\u53F7\u7EBF\u4F5C\u4E1A\u65E5\u62A5\u4E0D\u5B58\u5728</div>\n              <div *ngIf=\"dailyInfoes[l]?.length\">\n                  <div *ngIf=\"resultShowPlan\">\n                      <div class=\"page-header\">\n                          <h3>\u8BA1\u5212 <small>{{l}}\u53F7\u7EBF</small></h3>\n                      </div>\n                      <plan-table [dailyInfoes]=\"dailyInfoes[l]\"></plan-table>\n                  </div>\n                  <div *ngIf=\"resultShowTimeLine\">\n                      <div class=\"page-header\">\n                          <h3>\u65F6\u95F4\u8F74 <small>{{l}}\u53F7\u7EBF</small></h3>\n                      </div>\n                      <timeline2-chart *ngFor=\"let shift of dailyInfoes[l]\" [daily]=\"shift\" [states]=\"states\"></timeline2-chart>\n                  </div>\n              </div>\n          </div>\n      </div>\n    ",
            styles: ["\n      .form-control{\n          -webkit-appearance:none;\n          -moz-appearance: none;\n      }\n\n      select::-ms-expand {\n          display: none;\n      }\n\n      .page-container {\n          margin: 0 auto;\n          padding: 0 30px;\n      }\n\n      @media (min-width: 998px) {\n          .page-container {\n              width: 750px;\n              padding: 0 15px;\n          }\n      }\n\n      @media (min-width: 1222px) {\n          .page-container {\n              width: 970px;\n              padding: 0 15px;\n          }\n      }\n\n      .footer {\n          margin-top: 100px;\n      }.view-search {\n          margin: 0 auto;\n          max-width: 400px;\n      }\n\n      .view-search button{\n          margin: 1.5em 0;\n      }\n    "],
            directives: [common_1.FORM_DIRECTIVES, plan_1.PlanTableComponent, timeline_1.TimeLineChartComponent, timeline2_1.TimeLine2ChartComponent],
            providers: [dailyinfo_1.DailyInfoService, common_1.FORM_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_data_1.RouterDataService, router_deprecated_1.RouteParams, dailyinfo_1.DailyInfoService])
    ], ViewPageComponent);
    return ViewPageComponent;
}());
exports.ViewPageComponent = ViewPageComponent;
