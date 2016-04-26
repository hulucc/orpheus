import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { RouterDataService } from './services/router-data';
import { ViewPageComponent } from './pages/view';
import { StatPageComponent } from './pages/stat';
import { AboutPageComponent } from './pages/about';
import { TestComponent, Test1Component } from './test/test';

@Component({
    selector: 'my-app',
    templateUrl: 'app.html',
    styleUrls: ['app.css', 'pages/page.css'],
    directives: [
        ROUTER_DIRECTIVES, 
        ViewPageComponent, 
        StatPageComponent, 
        AboutPageComponent,
        TestComponent, 
        Test1Component], 
    providers: [RouterDataService]
})
@RouteConfig([
    { path: '/Home/View', name: 'ViewPage', component: ViewPageComponent, useAsDefault: true },
    { path: '/Home/Stat', name: 'StatPage', component: StatPageComponent },
    { path: '/Home/About', name: 'AboutPage', component: AboutPageComponent },
    { path: '/Home/test', name: 'Test', component: TestComponent},
    { path: '/Home/test/:id', name: 'TestDetail', component: TestComponent },
    { path: '/Home/test1', name: 'Test1', component: Test1Component },
])
export class AppComponent {

    pageTitle: string;
    pageIcon: string;

    navVisible: boolean = false;

    constructor(
        private router: Router, 
        private routerData: RouterDataService
        ) {
        this.routerData.title.subscribe(d => this.pageTitle = d);
        this.routerData.icon.subscribe(d => this.pageIcon = d);
    }
}