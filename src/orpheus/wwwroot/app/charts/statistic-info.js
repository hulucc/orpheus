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
var StatisticInfoComponent = (function () {
    function StatisticInfoComponent() {
    }
    StatisticInfoComponent.prototype.ngOnInit = function () {
    };
    //help
    StatisticInfoComponent.prototype.round = function (val) {
        return Math.round(val);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], StatisticInfoComponent.prototype, "stats", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StatisticInfoComponent.prototype, "mode", void 0);
    StatisticInfoComponent = __decorate([
        core_1.Component({
            selector: 'statistic-info',
            moduleId: module.id,
            template: "\n      <div class=\"table-responsive\">\n          <table class=\"table\">\n              <thead>\n                  <tr>\n                      <th>\u65E5\u671F</th>\n                      <th>\u603B\u65F6\u95F4</th>\n                      <th>\u65E0\u8BA1\u5212</th>\n                      <th>\u5207\u66FF</th>\n                      <th>\u70B9\u68C0</th>\n                      <th>\u8BD5\u4F5C</th>\n                      <th>\u6545\u969C</th>\n                      <th>\u5F85\u673A</th>\n                      <th>\u6709\u6548\u7A3C\u52A8</th>\n                      <th>\u5B9E\u7EE9\u7A3C\u52A8</th>\n                      <th>\u7406\u8BBA\u7A3C\u52A8</th>\n                      <th>\u751F\u4EA7\u6027</th>\n                      <th>\u8BBE\u5907\u7A3C\u52A8\u7387</th>\n                  </tr>\n              </thead>\n              <tbody>\n                  <tr *ngFor=\"let stat of stats;let i = index\">\n                      <th *ngIf=\"mode=='MonthByDay'\">{{i + 1}}\u65E5</th>\n                      <th *ngIf=\"mode=='MonthByWeek'\">\u7B2C{{i + 1}}\u5468</th>\n                      <th *ngIf=\"mode=='YearByMonth'\">{{i <= 8?i + 4:i - 8}}\u6708</th>\n                      <td>{{stat.totalTime}}</td>\n                      <td>{{stat.noPlan}}</td>\n                      <td>{{stat.modelChange}}</td>\n                      <td>{{stat.inspection}}</td>\n                      <td>{{stat.trial}}</td>\n                      <td>{{stat.fault}}</td>\n                      <td>{{stat.waiting}}</td>\n                      <td>{{stat.effectiveTime}}</td>\n                      <td>{{stat.actualTime}}</td>\n                      <td>{{round(stat.theoreticalTime)}}</td>\n                      <td>{{stat.productivity | percent:'1.0-2'}}</td>\n                      <td>{{stat.machineActivation | percent:'1.0-2'}}</td>\n                  </tr>\n              </tbody>\n          </table>\n      </div>\n    ",
            styles: ["\n      :host {\n      }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], StatisticInfoComponent);
    return StatisticInfoComponent;
}());
exports.StatisticInfoComponent = StatisticInfoComponent;
