import { provideRouter, RouterConfig } from '@angular/router';
import { ViewPageComponent } from './pages/view';
import { StatPageComponent } from './pages/stat';
import { AboutPageComponent } from './pages/about';
import { PlanInfoTracePageComponent } from './pages/trace/planinfo';
import { TimeLineTracePageComponent } from './pages/trace/timeline';
import { TestComponent, Test1Component } from './test/test';

export const routes: RouterConfig = [
    { path: 'view', component: ViewPageComponent },
    { path: 'stat', component: StatPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'trace/plan', component: PlanInfoTracePageComponent },
    { path: 'trace/tl', component: TimeLineTracePageComponent },
    { path: 'test', component: TestComponent},
    { path: 'test/:id', component: TestComponent },
    { path: 'test1', component: Test1Component },
    { path: '', redirectTo: '/view', terminal: true },
    //{ path: '**', redirectTo: '/View', terminal: true }, //fallback
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];