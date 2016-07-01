import { Component, ApplicationRef } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, NavigationStart } from '@angular/router';
import { RouterDataService } from './services/router-data';
import { HelperService } from './services/helper';
import { DailyInfoService } from './services/dailyinfo'
import { ViewPageComponent } from './pages/view';
import { StatPageComponent } from './pages/stat';
import { AboutPageComponent } from './pages/about';
import { TestComponent, Test1Component } from './test/test';

@Component({
    selector: 'my-app',
    template: require('./app.html'),
    styles: [require('./app.css'), require('./pages/page.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        ViewPageComponent, 
        StatPageComponent, 
        AboutPageComponent,
        TestComponent, 
        Test1Component], 
    providers: [RouterDataService, HelperService, DailyInfoService]
})
export class AppComponent {

    pageTitle: string;
    pageIcon: string;

    navVisible: boolean = false;

    constructor(
        private router: Router,
        private appRef: ApplicationRef,
        private routerData: RouterDataService) {
        this.routerData.title.subscribe(d => this.pageTitle = d);
        this.routerData.icon.subscribe(d => this.pageIcon = d);
        //for ie history back bug
        this.router.events.subscribe(e => {
            if(e instanceof NavigationStart) {
                if(Object.prototype.toString.call((<any>window).HTMLElement).indexOf('Constructor') > 0 
                    || !!(<any>document).documentMode) {
                    this.appRef.zone.run(() => this.appRef.tick());
                }
            }
            
        });
        
    }
}