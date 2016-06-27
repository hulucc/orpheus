import { Component, OnInit } from '@angular/core';
import { RouterDataService } from '../services/router-data';

@Component({
    template: require('./about.html'),
    styles: [require('./page.css'), require('./about.css')]
})
export class AboutPageComponent {
    constructor(
        private routerData: RouterDataService
        ) {
        this.routerData.title.next('关于');
        this.routerData.icon.next('glyphicon-cog');
    }
}