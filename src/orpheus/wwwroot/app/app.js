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
                        template: "\n      <div id=\"wrapper\">\n          <nav [class.nav-show]=\"navVisible\" (click)=\"navVisible=false\">\n              <div id=\"nav-wrapper\">\n                  <div id=\"logo\">\n                      <img src=\"img/logo.svg\" alt=\"logo\" />\n                      <br />\n                      \u4F5C\u4E1A\u65E5\u62A5\u7BA1\u7406\n                  </div>\n                  <ul>\n                      <li>\n                          <a [routerLink]=\"['ViewPage']\">\n                              <span class=\"glyphicon glyphicon-search\"></span>\u67E5\u770B\n                          </a>\n                      </li>\n                      <li>\n                          <a [routerLink]=\"['StatPage']\">\n                              <span class=\"glyphicon glyphicon-stats\"></span>\u7EDF\u8BA1\u4FE1\u606F\n                          </a>\n                      </li>\n                      <li>\n                          <a [routerLink]=\"['AboutPage']\">\n                              <span class=\"glyphicon glyphicon-cog\"></span>\u5173\u4E8E\n                          </a>\n                      </li>\n                  </ul>\n              </div>\n          </nav>\n          <div id=\"mask\" [class.mask-hide]=\"!navVisible\" (click)=\"navVisible=false\"></div>\n          <div id=\"page-content\">\n              <div class=\"header\">\n                  <div class=\"page-container\">\n                      <h2>\n                          <span class=\"title-icon glyphicon\" [ngClass]=\"pageIcon\"></span>{{pageTitle}}\n                          <button class=\"menu pull-right\" (click)=\"navVisible=!navVisible\">\n                              <span class=\"glyphicon glyphicon-menu-hamburger\"></span>\n                          </button>\n                      </h2>\n                  </div>\n              </div>\n              <router-outlet></router-outlet>\n              <div class=\"footer\"></div>\n          </div>\n      </div>\n    ",
                        styles: ["\n      #wrapper {\n          padding-left: 0;\n          font-family: Arial, Microsoft YaHei;\n          transition: all .3s cubic-bezier(.35,0,.25,1);\n      }\n\n      nav {\n          z-index: 1002;\n          position: fixed;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          /*margin-left: -250px;*/\n          overflow: hidden;\n          color: #FFFFFF;\n          background-color: #333333;\n          transition: all .3s cubic-bezier(.35,0,.25,1);\n          box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);\n      }\n\n      #nav-wrapper {\n          width: 230px;\n      }\n\n      #logo {\n          padding: 0 15px;\n          margin-bottom: 50px;\n          text-align: center;\n          font-size: 28px;\n      }\n\n      #logo img {\n          width: 100%;\n      }\n\n      nav ul {\n          padding: 0 0;\n          list-style-type: none;\n          text-align: left;\n          font-size: 18px;\n      }\n\n      nav ul a {\n          display: block;\n          text-decoration: none;\n          padding: 0.7em 0 0.7em 40px;\n          margin: 0.3em 0;\n          /*outline: 0;*/\n          /*transition: all 0.3s ease;*/\n          transition: all .3s cubic-bezier(.35,0,.25,1);\n          color: #CCCCCC;\n      }\n\n      nav ul a .glyphicon {\n          padding-right: 2em;\n      }\n\n      nav ul a:hover {\n          color: white;\n          /*text-shadow: white 0 0 20px,white 1px 2px 25px;*/\n          /*background-color: #D94130;*/\n          /*background: linear-gradient(#D94130, #BF382A);*/\n      }\n\n      nav ul .router-link-active {\n          color: white;\n          background: linear-gradient(#E05B4C, #ED6B5C);\n          /*background-color: #E85646;*/\n      }\n\n      #mask {\n          position: fixed;\n          z-index: 1001;\n          top: 0;\n          left: 0;\n          bottom: 0;\n          right: 0;\n          background-color: #333;\n          opacity: .48;\n      }\n\n      .nav-show {\n          width: 230px;\n          overflow-x:hidden;\n          overflow-y: auto;\n          background: rgba(33, 33, 33, 0.7);\n      }\n\n      .mask-hide {\n          display: none;\n      }\n\n      /*page*/\n\n      #page-content {\n          margin: 0;\n          color: #4C4C4C;\n      }\n\n      .header {\n          margin-bottom: 40px;\n          padding: 18px 0;\n          color: #FFFFFF;\n          background: linear-gradient(#E05B4C, #ED6B5C);\n          border-bottom: 12px solid #C75A4E;\n      }\n\n      .header .title-icon {\n          padding-right: 0.8em;\n          /*vertical-align: bottom;*/\n      }\n\n      button.menu {\n          background-color: transparent;\n          border: none;\n          text-align: center;\n          padding: 0;\n      }\n\n      @media(min-width: 998px) {\n          #wrapper {\n              padding-left: 230px;\n          }\n          nav {\n              width: 230px;\n              overflow-x:hidden;\n              overflow-y: auto;\n          }\n          button.menu {\n              display: none;\n          }\n      }\n      .form-control{\n          -webkit-appearance:none;\n          -moz-appearance: none;\n      }\n\n      select::-ms-expand {\n          display: none;\n      }\n\n      .page-container {\n          margin: 0 auto;\n          padding: 0 30px;\n      }\n\n      @media (min-width: 998px) {\n          .page-container {\n              width: 750px;\n              padding: 0 15px;\n          }\n      }\n\n      @media (min-width: 1222px) {\n          .page-container {\n              width: 970px;\n              padding: 0 15px;\n          }\n      }\n\n      .footer {\n          margin-top: 100px;\n      }\n    "],
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
