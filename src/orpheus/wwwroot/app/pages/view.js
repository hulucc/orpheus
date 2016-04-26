System.register(['angular2/core', 'angular2/router', '../services/router-data', 'angular2/common', '../services/dailyinfo', '../charts/plan', '../charts/timeline', '../charts/timeline2', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, router_data_1, common_1, dailyinfo_1, plan_1, timeline_1, timeline2_1, moment_1;
    var ViewPageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (router_data_1_1) {
                router_data_1 = router_data_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dailyinfo_1_1) {
                dailyinfo_1 = dailyinfo_1_1;
            },
            function (plan_1_1) {
                plan_1 = plan_1_1;
            },
            function (timeline_1_1) {
                timeline_1 = timeline_1_1;
            },
            function (timeline2_1_1) {
                timeline2_1 = timeline2_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            ViewPageComponent = (function () {
                function ViewPageComponent(router, routerData, routeParams, dailyInfoSvc) {
                    this.router = router;
                    this.routerData = routerData;
                    this.routeParams = routeParams;
                    this.dailyInfoSvc = dailyInfoSvc;
                    this.lines = [
                        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                        '12', '13', '14', '15', '16', '17', '18', 'D01', 'D02', 'D03'];
                    this.dateFormat = 'YYYY年MM月DD日';
                    this.dailyInfoes = [];
                    this.showResult = false;
                    this.routerData.title.next('作业日报查看');
                    this.routerData.icon.next('glyphicon-search');
                }
                ViewPageComponent.prototype.ngOnInit = function () {
                    var p = {
                        line: this.routeParams.get('line'),
                        date: moment_1.default(this.routeParams.get('date')).format(this.dateFormat),
                    };
                    if (p.line && p.date) {
                        $('button').button('loading');
                        this.line = p.line;
                        this.date = p.date;
                        this.getDailyInfo();
                    }
                };
                ViewPageComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
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
                    this.dailyInfoSvc
                        .query(this.line, moment_1.default(this.date, this.dateFormat))
                        .subscribe(function (res) { return _this.dailyInfoes = res; }, function (err) { return _this.onSubmitError(err); }, function () { return _this.onSubmitComplete(); });
                };
                //events
                ViewPageComponent.prototype.onSubmit = function () {
                    var isoDate = moment_1.default(this.date, this.dateFormat).toISOString();
                    var link = ['ViewPage', { line: this.line, date: isoDate }];
                    this.router.navigate(link);
                };
                ViewPageComponent.prototype.onSubmitError = function (err) {
                    this.showResult = true;
                    this.errMsg = err;
                    $('button').button('reset');
                };
                ViewPageComponent.prototype.onSubmitComplete = function () {
                    this.showResult = true;
                    $('button').button('reset');
                };
                ViewPageComponent = __decorate([
                    core_1.Component({
                        selector: 'view-page',
                        template: "\n      <div class=\"view-search row\">\n          <form class=\"col-xs-12\" (ngSubmit)=\"onSubmit()\" #searchForm=\"ngForm\">\n              <div class=\"form-group\">\n                  <label>\u7EBF\u4F53</label>\n                  <select class=\"form-control\"\n                          ngControl=\"line\"\n                          required\n                          [(ngModel)]=\"line\"\n                          (change)=\"line=$event.target.value\">\n                      <option *ngFor=\"#l of lines\" [value]=\"l\">{{l}}</option>\n                  </select>\n\n              </div>\n              <div class=\"form-group\">\n                  <label class=\"control-label\" for=\"\">\u4F5C\u4E1A\u65E5</label>\n                  <div class='input-group date' id='datetimepicker1'>\n                      <input type='text'\n                             class=\"form-control\"\n                             ngControl=\"date\"\n                             required\n                             pattern=\"^\\d{4}\u5E74\\d{2}\u6708\\d{2}\u65E5$\"\n                             [(ngModel)]=\"date\" />\n                      <span class=\"input-group-addon\">\n                          <span class=\"glyphicon glyphicon-calendar\"></span>\n                      </span>\n                  </div>\n              </div>\n              <button type=\"submit\" class=\"btn btn-default pull-right\" data-loading-text=\"\u67E5\u8BE2\u4E2D...\" [disabled]=\"!searchForm.valid\">\u63D0\u4EA4</button>\n          </form>\n      </div>\n\n      <div class=\"page-container\" *ngIf=\"showResult\">\n          <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"errMsg\">{{errMsg}}</div>\n          <div class=\"alert alert-info\" role=\"alert\" *ngIf=\"!dailyInfoes.length&&!errMsg\">\u6240\u67E5\u8BE2\u7684\u4F5C\u4E1A\u65E5\u62A5\u4E0D\u5B58\u5728</div>\n          <div class=\"view-result\" *ngIf=\"dailyInfoes.length\">\n              <div class=\"page-header\">\n                  <h3>\u8BA1\u5212 <small>{{dailyInfoes[0].line}}\u53F7\u7EBF</small></h3>\n              </div>\n              <plan-table [dailyInfoes]=\"dailyInfoes\"></plan-table>\n              <div class=\"page-header\">\n                  <h3>\u65F6\u95F4\u8F74</h3>\n              </div>\n              <timeline2-chart *ngFor=\"#daily of dailyInfoes\" [daily]=\"daily\" [states]=\"states\"></timeline2-chart>\n          </div>\n      </div>\n    ",
                        styles: ["\n      .form-control{\n          -webkit-appearance:none;\n          -moz-appearance: none;\n      }\n\n      select::-ms-expand {\n          display: none;\n      }\n\n      button {\n          outline: none!important;\n      }\n\n      .page-container {\n          margin: 0 auto;\n          padding: 0 30px;\n      }\n\n      @media (min-width: 998px) {\n          .page-container {\n              width: 750px;\n              padding: 0 15px;\n          }\n      }\n\n      @media (min-width: 1222px) {\n          .page-container {\n              width: 970px;\n              padding: 0 15px;\n          }\n      }\n\n      .footer {\n          margin-top: 100px;\n      }.view-search {\n          margin: 0 auto;\n          max-width: 400px;\n      }\n\n      .view-search button{\n          margin: 1.5em 0;\n      }\n    "],
                        directives: [common_1.FORM_DIRECTIVES, plan_1.PlanTableComponent, timeline_1.TimeLineChartComponent, timeline2_1.TimeLine2ChartComponent],
                        providers: [dailyinfo_1.DailyInfoService, common_1.FORM_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_data_1.RouterDataService, router_1.RouteParams, dailyinfo_1.DailyInfoService])
                ], ViewPageComponent);
                return ViewPageComponent;
            }());
            exports_1("ViewPageComponent", ViewPageComponent);
        }
    }
});
