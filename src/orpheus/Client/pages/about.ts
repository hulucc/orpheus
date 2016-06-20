import { Component, OnInit } from '@angular/core';
import { RouterDataService } from '../services/router-data';

@Component({
    selector: 'about-page',
    moduleId: module.id,
    templateUrl: 'about.html',
    styleUrls: ['page.css', 'about.css']
})
export class AboutPageComponent {
    constructor(
        private routerData: RouterDataService
        ) {
        this.routerData.title.next('关于');
        this.routerData.icon.next('glyphicon-cog');
    }
}