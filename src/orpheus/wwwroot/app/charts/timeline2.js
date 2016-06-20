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
var timeline_popover_1 = require('./timeline-popover');
var moment = require('moment');
var TimeLine2ChartComponent = (function () {
    function TimeLine2ChartComponent() {
    }
    //private function
    TimeLine2ChartComponent.prototype.getHours = function (daily) {
        if (daily['hours'])
            return daily['hours'];
        var hours = [];
        for (var i = daily.startTime.clone(); i < daily.endTime; i.add(1, 'hour'))
            hours.push(i.format('HH:mm'));
        daily['hours'] = hours;
        return hours;
    };
    TimeLine2ChartComponent.prototype.filterState = function (items, index) {
        return items.filter(function (i) { return i.state - 1 === index; });
    };
    TimeLine2ChartComponent.prototype.MinutesToPercent = function (mins, daily) {
        var totalMins = daily.endTime.diff(daily.startTime, 'minute');
        return mins / totalMins * 100;
    };
    TimeLine2ChartComponent.prototype.getItemRect = function (item, daily) {
        var leftMins = item.startTime.diff(daily.startTime, 'minute');
        var rightMins = item.endTime.diff(daily.startTime, 'minute');
        var left = this.MinutesToPercent(leftMins, daily);
        var right = this.MinutesToPercent(rightMins, daily);
        return {
            left: left,
            width: right - left
        };
    };
    TimeLine2ChartComponent.prototype.getDurationStr = function (start, end) {
        var mins = end.diff(start, 'minute');
        var duration = moment.duration(mins, 'minute');
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
    ], TimeLine2ChartComponent.prototype, "states", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TimeLine2ChartComponent.prototype, "daily", void 0);
    TimeLine2ChartComponent = __decorate([
        core_1.Component({
            selector: 'timeline2-chart',
            moduleId: module.id,
            template: "\n      <div class=\"timeline2\">\n          <div class=\"left\">\n              <div class=\"title-pad cell\">&nbsp;</div>\n              <div class=\"hours-pad cell\">&nbsp;</div>\n              <div class=\"row-header cell\" *ngFor=\"let s of states\">{{s}}</div>\n          </div>\n          <div class=\"right\">\n              <div class=\"right-inner\">\n                  <div class=\"title cell\">\n                      {{daily.date.format(\"MM\u6708DD\u65E5\")}} {{daily.pspShiftDict.shift}}\u73ED<span class=\"small\">\u786E\u8BA4\uFF1A{{daily.confirming}}</span>\n                  </div>\n                  <div class=\"hours\">\n                      <div class=\"hour cell\" *ngFor=\"let hour of getHours(daily)\">{{hour}}</div>\n                  </div>\n                  <div class=\"grid-row cell\" *ngFor=\"let s of states; let index=index\">\n                      &nbsp;\n                      <div class=\"item\"\n                           *ngFor=\"let item of filterState(daily.pspTimeLines, index)\"\n                           [style.left.%]=\"getItemRect(item, daily).left\"\n                           [style.width.%]=\"getItemRect(item, daily).width\"\n                           [ngClass]=\"'item'+index\"\n                           timeline-popover=\"\n                               \u7EBF\u4F53\uFF1A{{item.line}}<br />\n                               \u72B6\u6001\uFF1A{{s}}<br />\n                               \u65F6\u95F4\uFF1A{{item.startTime.format('HH:mm')}} ~ {{item.endTime.format('HH:mm')}}<br />\n                               \u65F6\u957F\uFF1A{{getDurationStr(item.startTime, item.endTime)}}<br />\n                               \u64CD\u4F5C\uFF1A{{daily.operator}}<br />\n                               \u5907\u6CE8\uFF1A{{item.dismension?item.dismension.slice(2):'\u65E0'}}\"\n                           >\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n    ",
            styles: ["\n      .timeline2 {\n          display: flex;\n          flex-flow: row nowrap;\n          white-space: nowrap;\n          margin: 0 0 20px 0;\n      }\n\n      .cell {\n          padding: 8px;\n          text-align: left;\n          border-top: 1px solid #DDD;\n          border-bottom: 1px solid #DDD;\n          margin-bottom: -1px;\n      }\n\n      .left {\n          flex: 0 1 80px;\n          min-width: 80px;\n      }\n\n      .right {\n          flex: 1 1 auto;\n          overflow-x: auto;\n          overflow-y: hidden;\n      }\n\n      .right-inner {\n          width: 100%;\n          min-width: 500px;\n          margin-bottom: 8px;\n      }\n\n      .title-pad {\n          border-top: 1px solid transparent;\n          border-bottom: 1px solid transparent;\n      }\n\n      .hours-pad {\n          border-top: 1px solid transparent;\n          border-bottom: 2px solid #DDD;\n      }\n\n      .row-header {\n          font-weight: bold;\n      }\n\n      .title {\n          border-top: 1px solid transparent;\n          font-weight: bold;\n      }\n\n      .hours {\n          display: flex;\n          flex-flow: row nowrap;\n          border-bottom: 1px solid #DDD;\n      }\n\n      .hour {\n          flex: 1 1 auto;\n          min-width: 0;\n      }\n\n      .grid-row {\n          position: relative;\n      }\n\n      .item {\n          position: absolute;\n          top: 50%;\n          height: 50%;\n          transform: translateY(-50%);\n      }\n\n      /*item*/\n\n      .item0 {\n          background-color: #FF6C5C;\n      }\n\n      .item1 {\n          background-color: #BBB;\n      }\n\n      .item2 {\n          border: 3px solid #FF6C5C;\n      }\n\n      .item3 {\n          border: 3px solid #BBB;\n      }\n\n      span.small {\n          font-weight: normal;\n          color: #777;\n          margin-left: 1em;\n      }\n    "],
            directives: [timeline_popover_1.PopoverDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], TimeLine2ChartComponent);
    return TimeLine2ChartComponent;
}());
exports.TimeLine2ChartComponent = TimeLine2ChartComponent;
