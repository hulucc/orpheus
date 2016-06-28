import './polyfills.ts';
import 'zone.js/dist/zone';
import './css/site.css';
import './global.ts';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app/app';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

if(process.env.ENV === 'production')
    enableProdMode();
bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS])
    .catch(err => console.log(err));

declare var module: any;
if (module.hot) {
    module.hot.accept();
    console.log(new Date());
}