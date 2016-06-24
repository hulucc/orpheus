import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RouterDataService } from './services/router-data';
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
    providers: [RouterDataService]
})
export class AppComponent {

    pageTitle: string;
    pageIcon: string;

    navVisible: boolean = false;

    constructor(
        private routerData: RouterDataService
        ) {
        this.routerData.title.subscribe(d => this.pageTitle = d);
        this.routerData.icon.subscribe(d => this.pageIcon = d);
    }
}