System.register(['angular2/core', '../services/router-data', '../charts/date-picker', '../charts/line-selector'], function(exports_1, context_1) {
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
    var core_1, router_data_1, date_picker_1, line_selector_1;
    var StatPageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_data_1_1) {
                router_data_1 = router_data_1_1;
            },
            function (date_picker_1_1) {
                date_picker_1 = date_picker_1_1;
            },
            function (line_selector_1_1) {
                line_selector_1 = line_selector_1_1;
            }],
        execute: function() {
            StatPageComponent = (function () {
                function StatPageComponent(routerData) {
                    this.routerData = routerData;
                    this.routerData.title.next('统计信息');
                    this.routerData.icon.next('glyphicon-stats');
                }
                StatPageComponent = __decorate([
                    core_1.Component({
                        selector: 'stat-page',
                        templateUrl: 'stat.html',
                        styleUrls: ['page.css', 'stat.css'],
                        directives: [date_picker_1.DatePickerComponent, line_selector_1.LineSelectorComponent]
                    }), 
                    __metadata('design:paramtypes', [router_data_1.RouterDataService])
                ], StatPageComponent);
                return StatPageComponent;
            }());
            exports_1("StatPageComponent", StatPageComponent);
        }
    }
});
//# sourceMappingURL=stat.js.map