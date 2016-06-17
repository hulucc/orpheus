System.register(['angular2/core', 'angular2/router', './services/router-data', './pages/view', './pages/stat', './pages/about', './test/test'], function(exports_1, context_1) {
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
    var core_1, router_1, router_data_1, view_1, stat_1, about_1, test_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (router_data_1_1) {
                router_data_1 = router_data_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (stat_1_1) {
                stat_1 = stat_1_1;
            },
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (test_1_1) {
                test_1 = test_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, routerData) {
                    var _this = this;
                    this.router = router;
                    this.routerData = routerData;
                    this.navVisible = false;
                    this.routerData.title.subscribe(function (d) { return _this.pageTitle = d; });
                    this.routerData.icon.subscribe(function (d) { return _this.pageIcon = d; });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app.html',
                        styleUrls: ['app.css', 'pages/page.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            view_1.ViewPageComponent,
                            stat_1.StatPageComponent,
                            about_1.AboutPageComponent,
                            test_1.TestComponent,
                            test_1.Test1Component],
                        providers: [router_data_1.RouterDataService]
                    }),
                    router_1.RouteConfig([
                        { path: '/Home/View', name: 'ViewPage', component: view_1.ViewPageComponent, useAsDefault: true },
                        { path: '/Home/Stat', name: 'StatPage', component: stat_1.StatPageComponent },
                        { path: '/Home/About', name: 'AboutPage', component: about_1.AboutPageComponent },
                        { path: '/Home/test', name: 'Test', component: test_1.TestComponent },
                        { path: '/Home/test/:id', name: 'TestDetail', component: test_1.TestComponent },
                        { path: '/Home/test1', name: 'Test1', component: test_1.Test1Component },
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, router_data_1.RouterDataService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map