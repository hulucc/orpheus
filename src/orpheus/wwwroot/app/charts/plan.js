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
var PlanTableComponent = (function () {
    function PlanTableComponent() {
    }
    //private
    PlanTableComponent.prototype.formatSLotUncomp = function (sLotUncomp, append) {
        if (append == 0) {
            return sLotUncomp;
        }
        else if (append > 0) {
            return sLotUncomp + ' + ' + append;
        }
        else if (append < 0) {
            return sLotUncomp + ' - ' + Math.abs(append);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PlanTableComponent.prototype, "dailyInfoes", void 0);
    PlanTableComponent = __decorate([
        core_1.Component({
            selector: 'plan-table',
            moduleId: module.id,
            template: "\n      <div class=\"table-responsive\">\n          <table class=\"table\">\n              <thead>\n                  <tr>\n                      <th>\u73ED\u522B</th>\n                      <th>\u73ED\u7EC4</th>\n                      <th>\u673A\u79CD</th>\n                      <th>\u57FA\u677F</th>\n                      <th>Lot</th>\n                      <th>\u5C0F\u5206Lot</th>\n                      <th>\u9762</th>\n                      <th>\u8BA1\u5212\u6570</th>\n                      <th>\u524D\u65E5\u7D2F\u8BA1</th>\n                      <th>\u5B9E\u7EE9\u6570</th>\n                      <th>\u5F53\u65E5\u7D2F\u8BA1</th>\n                      <th>\u507F\u5374</th>\n                      <th>\u64E6\u9664\u679A\u6570</th>\n                      <th>\u5907\u6CE8</th>\n                  </tr>\n              </thead>\n              <tbody *ngFor=\"let daily of dailyInfoes\">\n                  <tr *ngFor=\"let plan of daily.pspPlanInfoes; let first=first\">\n                      <td [attr.rowspan]=\"daily.pspPlanInfoes.length\" *ngIf=\"first\">{{daily.pspShiftDict.shift}}</td>\n                      <td [attr.rowspan]=\"daily.pspPlanInfoes.length\" *ngIf=\"first\">{{daily.pspShiftGroupDict.shiftGroup}}</td>\n                      <td>{{plan.kishname}}</td>\n                      <td>{{plan.kibaname}}</td>\n                      <td>{{plan.lot}}</td>\n                      <td>{{plan.sLot}}</td>\n                      <td>{{plan.koutei}}</td>\n                      <td>{{formatSLotUncomp(plan.sLotUncomp, plan.append)}}</td>\n                      <td>{{plan.lotComp}}</td>\n                      <td>{{plan.shiftComp}}</td>\n                      <td>{{plan.lotCompAfter}}</td>\n                      <td>{{plan.joc}}</td>\n                      <td>{{plan.cleanCount}}</td>\n                      <td>{{plan.remark}}</td>\n                  </tr>\n              </tbody>\n          </table>\n      </div>\n    ",
            styles: ["\n      .table-responsive {\n          border: none;\n      }\n\n      .table {\n          margin-bottom: 8px;\n      }\n    "],
        }), 
        __metadata('design:paramtypes', [])
    ], PlanTableComponent);
    return PlanTableComponent;
}());
exports.PlanTableComponent = PlanTableComponent;
