System.register(['angular2/core', 'angular2/router', './test.service'], function(exports_1, context_1) {
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
    var core_1, router_1, test_service_1;
    var TestComponent, Test1Component;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (test_service_1_1) {
                test_service_1 = test_service_1_1;
            }],
        execute: function() {
            TestComponent = (function () {
                function TestComponent(_routeParams, _testService) {
                    this._routeParams = _routeParams;
                    this._testService = _testService;
                }
                TestComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.id = +this._routeParams.get('id');
                    this._testService.getTestModels().subscribe(function (res) { return _this.testModels = res; });
                };
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'my-test',
                        templateUrl: './test.html',
                        providers: [test_service_1.TestService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, test_service_1.TestService])
                ], TestComponent);
                return TestComponent;
            }());
            exports_1("TestComponent", TestComponent);
            Test1Component = (function () {
                function Test1Component() {
                }
                Test1Component = __decorate([
                    core_1.Component({
                        selector: 'my-test1',
                        template: '<h2>Test1 Page</h2>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Test1Component);
                return Test1Component;
            }());
            exports_1("Test1Component", Test1Component);
        }
    }
});
//# sourceMappingURL=test.js.map