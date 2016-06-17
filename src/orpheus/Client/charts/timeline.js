System.register(['angular2/core', './timeline-popover', 'moment'], function(exports_1, context_1) {
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
    var core_1, timeline_popover_1, moment_1;
    var TimeLineChartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (timeline_popover_1_1) {
                timeline_popover_1 = timeline_popover_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            TimeLineChartComponent = (function () {
                function TimeLineChartComponent() {
                    this.states = [];
                    this.dailyInfoes = [];
                    this.cellWidth = 79;
                }
                TimeLineChartComponent.prototype.ngOnInit = function () {
                };
                //private function
                TimeLineChartComponent.prototype.getHours = function (daily) {
                    if (daily['hours'])
                        return daily['hours'];
                    var hours = [];
                    for (var i = daily.startTime.clone(); i < daily.endTime; i.add(1, 'hour'))
                        hours.push(i.format('HH:mm'));
                    daily['hours'] = hours;
                    return hours;
                };
                TimeLineChartComponent.prototype.getRightWidth = function () {
                    var count = 0;
                    for (var _i = 0, _a = this.dailyInfoes; _i < _a.length; _i++) {
                        var daily = _a[_i];
                        count += this.getHours(daily).length;
                    }
                    return count * this.cellWidth + 8;
                };
                TimeLineChartComponent.prototype.filterState = function (items, stateIndex) {
                    return items.filter(function (i) { return i.state - 1 === stateIndex; });
                };
                TimeLineChartComponent.prototype.MinutesToPixels = function (mins) {
                    return mins / 60 * this.cellWidth;
                };
                TimeLineChartComponent.prototype.getItemRect = function (item, daily) {
                    var leftMins = item.startTime.diff(daily.startTime, 'minute');
                    var rightMins = item.endTime.diff(daily.startTime, 'minute');
                    var left = this.MinutesToPixels(leftMins);
                    var right = this.MinutesToPixels(rightMins);
                    return {
                        left: left,
                        width: right - left
                    };
                };
                TimeLineChartComponent.prototype.getDurationStr = function (start, end) {
                    var mins = end.diff(start, 'minute');
                    var duration = moment_1.default.duration(mins, 'minute');
                    var hour = duration.hours();
                    var min = duration.minutes();
                    var str = '';
                    if (hour && min)
                        str = hour + '小时' + min + '分';
                    else if (hour)
                        str = hour + '小时';
                    else if (min)
                        str = min + '分钟';
                    return str;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TimeLineChartComponent.prototype, "states", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TimeLineChartComponent.prototype, "dailyInfoes", void 0);
                TimeLineChartComponent = __decorate([
                    core_1.Component({
                        selector: 'timeline-chart',
                        templateUrl: 'timeline.html',
                        styleUrls: ['timeline.css'],
                        directives: [timeline_popover_1.PopoverDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimeLineChartComponent);
                return TimeLineChartComponent;
            }());
            exports_1("TimeLineChartComponent", TimeLineChartComponent);
        }
    }
});
//# sourceMappingURL=timeline.js.map