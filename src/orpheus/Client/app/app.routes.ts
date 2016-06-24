import { provideRouter, RouterConfig } from '@angular/router';
import { ViewPageComponent } from './pages/view';
import { StatPageComponent } from './pages/stat';
import { AboutPageComponent } from './pages/about';
import { TestComponent, Test1Component } from './test/test';

export const routes: RouterConfig = [
    { path: 'View', component: ViewPageComponent },
    { path: 'Stat', component: StatPageComponent },
    { path: 'About', component: AboutPageComponent },
    { path: 'test', component: TestComponent},
    { path: 'test/:id', component: TestComponent },
    { path: 'test1', component: Test1Component },
    { path: '', redirectTo: '/View', terminal: true },
    //{ path: '**', redirectTo: '/View', terminal: true }, //fallback
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];