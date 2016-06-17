System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var StatisticInfoDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            StatisticInfoDetailComponent = (function () {
                function StatisticInfoDetailComponent() {
                }
                StatisticInfoDetailComponent.prototype.ngOnInit = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], StatisticInfoDetailComponent.prototype, "stats", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], StatisticInfoDetailComponent.prototype, "mode", void 0);
                StatisticInfoDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'statistic-info-detail',
                        template: "\n      <div class=\"table-responsive\">\n          <table class=\"table\">\n              <thead>\n                  <tr>\n                      <th>\u65E5\u671F</th>\n                      <th>\u603B\u65F6\u95F4</th>\n                      <th>\u65E0\u8BA1\u5212</th>\n                      <th>\u5207\u66FF</th>\n                      <th>VR\u5207\u66FF</th>\n                      <th>\u5207\u66FF\u7B49\u5F85</th>\n                      <th>\u5B9A\u6570</th>\n                      <th>\u7089\u6E29\u4E0A\u5347</th>\n                      <th>\u6E05\u626B\u65E9\u793C</th>\n                      <th>\u55B7\u5634\u4FDD\u517B</th>\n                      <th>\u7089\u6E29\u7B49\u5F85</th>\n                      <th>\u68C0\u67E5\u4EEA\u4FEE\u6B63</th>\n                      <th>\u5236\u9020\u4FDD\u517B</th>\n                      <th>\u8BD5\u4F5C</th>\n                      <th>\u4FEE\u7406\u7B49\u5F85</th>\n                      <th>\u54C1\u8D28\u6545\u969C</th>\n                      <th>CF\u5F02\u5E38</th>\n                      <th>\u524D\u5DE5\u7A0B\u7B49\u5F85</th>\n                      <th>\u90E8\u54C1\u7B49\u5F85</th>\n                      <th>\u90E8\u54C1\u5206\u5272\u7B49\u5F85</th>\n                      <th>VR\u7B49\u5F85</th>\n                      <th>\u64CD\u4F5C\u5458\u7B49\u5F85</th>\n                      <th>\u57FA\u677F\u7B49\u5F85</th>\n                      <th>\u5176\u5B83</th>\n                  </tr>\n              </thead>\n              <tbody>\n                  <tr *ngFor=\"let stat of stats;let i=index\">\n                      <th *ngIf=\"mode=='MonthByDay'\">{{i + 1}}\u65E5</th>\n                      <th *ngIf=\"mode=='MonthByWeek'\">\u7B2C{{i + 1}}\u5468</th>\n                      <th *ngIf=\"mode=='YearByMonth'\">{{i <= 8?i + 4:i - 8}}\u6708</th>\n                      <td>{{stat.detail.totalTime}}</td>\n                      <td>{{stat.detail.noPlan}}</td>\n                      <td>{{stat.detail.change}}</td>\n                      <td>{{stat.detail.vrChange}}</td>\n                      <td>{{stat.detail.changeWaiting}}</td>\n                      <td>{{stat.detail.acceptance}}</td>\n                      <td>{{stat.detail.reflowTempRise}}</td>\n                      <td>{{stat.detail.morning}}</td>\n                      <td>{{stat.detail.nozzleMaintainance}}</td>\n                      <td>{{stat.detail.reflowTempWaiting}}</td>\n                      <td>{{stat.detail.instrucmentCorrection}}</td>\n                      <td>{{stat.detail.machineMaintainance}}</td>\n                      <td>{{stat.detail.trial}}</td>\n                      <td>{{stat.detail.repairWaiting}}</td>\n                      <td>{{stat.detail.qualityIssue}}</td>\n                      <td>{{stat.detail.cfFault}}</td>\n                      <td>{{stat.detail.preStepWaiting}}</td>\n                      <td>{{stat.detail.partWaiting}}</td>\n                      <td>{{stat.detail.partSplitWaiting}}</td>\n                      <td>{{stat.detail.vrWaiting}}</td>\n                      <td>{{stat.detail.operatorWaiting}}</td>\n                      <td>{{stat.detail.boardWaiting}}</td>\n                      <td>{{stat.detail.others}}</td>\n                  </tr>\n              </tbody>\n          </table>\n      </div>\n    ",
                        styles: ["\n      :host {\n      }\n\n      .table-responsive {\n          max-height: 600px;\n      }\n\n      table {\n          white-space: nowrap;\n      }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], StatisticInfoDetailComponent);
                return StatisticInfoDetailComponent;
            }());
            exports_1("StatisticInfoDetailComponent", StatisticInfoDetailComponent);
        }
    }
});
