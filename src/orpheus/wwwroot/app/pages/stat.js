System.register(['angular2/core', '../services/router-data'], function(exports_1, context_1) {
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
    var core_1, router_data_1;
    var StatPageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_data_1_1) {
                router_data_1 = router_data_1_1;
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
                        template: "\n      <div></div>\n    ",
                        styles: ["\n      .form-control{\n          -webkit-appearance:none;\n          -moz-appearance: none;\n      }\n\n      select::-ms-expand {\n          display: none;\n      }\n\n      button {\n          outline: none!important;\n      }\n\n      .page-container {\n          margin: 0 auto;\n          padding: 0 30px;\n      }\n\n      @media (min-width: 998px) {\n          .page-container {\n              width: 750px;\n              padding: 0 15px;\n          }\n      }\n\n      @media (min-width: 1222px) {\n          .page-container {\n              width: 970px;\n              padding: 0 15px;\n          }\n      }\n\n      .footer {\n          margin-top: 100px;\n      }\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_data_1.RouterDataService])
                ], StatPageComponent);
                return StatPageComponent;
            }());
            exports_1("StatPageComponent", StatPageComponent);
        }
    }
});
