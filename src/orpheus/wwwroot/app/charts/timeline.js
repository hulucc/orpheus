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
                        template: "\n      <div class=\"timeline\">\n          <div class=\"left\">\n              <div class=\"title-pad cell\">&nbsp;</div>\n              <div class=\"hours-pad cell\">&nbsp;</div>\n              <div class=\"row-header cell\" *ngFor=\"#s of states\">{{s}}</div>\n          </div>\n          <div class=\"right-wrapper\">\n              <div class=\"right tl-row\" [style.width.px]=\"getRightWidth()\">\n                  <div class=\"col-group\" *ngFor=\"#daily of dailyInfoes;#even=even\" [class.col-group-even]=\"!even\">\n                      <div class=\"title cell\">\n                          {{daily.date.format(\"MM\u6708DD\u65E5\")}} {{daily.pspShiftDict.shift}}\u73ED<span class=\"small\">\u786E\u8BA4\uFF1A{{daily.confirming}}</span>\n                      </div>\n                      <div class=\"hours tl-row\">\n                          <div class=\"cell\" *ngFor=\"#hour of getHours(daily)\">\n                              {{hour}}\n                          </div>\n                      </div>\n                      <div class=\"grid-row cell\" *ngFor=\"#s of states; #sIndex=index\">\n                          &nbsp;\n                          <div class=\"item\"\n                               *ngFor=\"#item of filterState(daily.pspTimeLines, sIndex)\"\n                               [style.left.px]=\"getItemRect(item, daily).left\"\n                               [style.width.px]=\"getItemRect(item, daily).width\"\n                               [ngClass]=\"'item'+sIndex\"\n                               timeline-popover=\"\n                               \u7EBF\u4F53\uFF1A{{item.line}}<br />\n                               \u72B6\u6001\uFF1A{{s}}<br />\n                               \u65F6\u95F4\uFF1A{{item.startTime.format('HH:mm')}} ~ {{item.endTime.format('HH:mm')}}<br />\n                               \u65F6\u957F\uFF1A{{getDurationStr(item.startTime, item.endTime)}}<br />\n                               \u64CD\u4F5C\uFF1A{{daily.operator}}<br />\n                               \u5907\u6CE8\uFF1A{{item.dismension?item.dismension.slice(2):'\u65E0'}}\">\n                          </div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n    ",
                        styles: ["\n      /*tool*/\n      .tl-row {\n          clear: both;\n          overflow: hidden;\n      }\n\n      .tl-row > div {\n          float: left;\n      }\n      /*main*/\n      .timeline .left {\n          float: left;\n      }\n      .timeline .right-wrapper {\n          width: auto;\n          overflow-x: auto;\n      }\n\n      .timeline .right {\n          /*width: 2000px;*/\n          margin-bottom: 8px;\n      }\n\n      .timeline .cell {\n          width: 80px;\n          text-align: left;\n          padding: 8px;\n          border-top: 1px solid #DDD;\n          border-bottom: 1px solid #DDD;\n          margin-right: -1px;\n          margin-bottom: -1px;\n      }\n\n      .timeline .col-group {\n          /*margin-right: -3px;*/\n          border-bottom: 1px solid #DDD;\n          /*margin-right: 3px;*/\n      }\n\n      .timeline .col-group-even {\n          background-color: #F7F7F7;\n      }\n\n      .timeline .row-header {\n          font-weight: bold;\n      }\n\n      .timeline .title {\n          width: auto;\n          border-top: 0;\n          /*text-align: center;*/\n          font-weight: bold;\n      }\n\n      .timeline .title-pad {\n          border-top: 0;\n      }\n\n      .timeline .hours {\n          border-bottom: 1px solid #DDD;\n      }\n\n      .timeline .hours-pad {\n          border-top: solid 1px #FFF;\n          border-bottom: 2px solid #DDD;\n      }\n\n      .timeline .grid-row {\n          position: relative;\n          width: 100%;\n      }\n\n      .timeline .item {\n          position: absolute;\n          top: 50%;\n          height: 50%;\n          transform: translateY(-50%);\n          /*background-color: #DDD;*/\n          /*background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);*/\n          /*background-size: 40px 40px;*/\n          /*border-radius: 2px;*/\n      }\n\n      /*item*/\n\n      .timeline .item0 {\n          background-color: #FF6C5C;\n      }\n\n      .timeline .item1 {\n          background-color: #BBB;\n          /*background-color: #FFF;*/\n      }\n\n      .timeline .item2 {\n          border: 3px solid #FF6C5C;\n      }\n\n      .timeline .item3 {\n          border: 3px solid #BBB;\n          /*background-color: #FFF;*/\n      }\n\n      span.small {\n          font-weight: normal;\n          color: #777;\n          margin-left: 1em;\n      }\n    "],
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
