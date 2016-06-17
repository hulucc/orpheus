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
    var StatisticInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            StatisticInfoComponent = (function () {
                function StatisticInfoComponent() {
                }
                StatisticInfoComponent.prototype.ngOnInit = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], StatisticInfoComponent.prototype, "statistics", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], StatisticInfoComponent.prototype, "mode", void 0);
                StatisticInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'statistic-info',
                        templateUrl: 'statistic-info.html',
                        styleUrls: ['statistic-info.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], StatisticInfoComponent);
                return StatisticInfoComponent;
            }());
            exports_1("StatisticInfoComponent", StatisticInfoComponent);
        }
    }
});
//# sourceMappingURL=statistic-info.js.map