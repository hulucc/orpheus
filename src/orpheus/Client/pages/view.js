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
                        date: moment_1.default(this.routeParams.get('date')).format(this.dateFormat),
                        plan: parseInt(this.routeParams.get('plan')),
                        tl: parseInt(this.routeParams.get('tl')),
                    };
                    if (p.line && p.date) {
                        $('button').button('loading');
                        this.selectedLines = p.line.split(',');
                        this.resultLines = p.line.split(',');
                        this.date = p.date;
                        this.getDailyInfo();
                    }
                    if (!isNaN(p.plan)) {
                        this.showPlan = Boolean(p.plan);
                        this.resultShowPlan = Boolean(p.plan);
                    }
                    if (!isNaN(p.tl)) {
                        this.showTimeLine = Boolean(p.tl);
                        this.resultShowTimeLine = Boolean(p.tl);
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
                            .query(line, moment_1.default(this_1.date, this_1.dateFormat))
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
                    var isoDate = moment_1.default(this.date, this.dateFormat).toISOString();
                    var link = ['ViewPage', {
                            line: this.selectedLines.join(','),
                            date: isoDate,
                            plan: this.showPlan ? 1 : 0,
                            tl: this.showTimeLine ? 1 : 0 }];
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
                        templateUrl: 'view.html',
                        styleUrls: ['page.css', 'view.css'],
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
//# sourceMappingURL=view.js.map