import { Component, OnInit } from 'angular2/core';
import { RouterDataService } from '../services/router-data';

@Component({
    selector: 'stat-page',
    templateUrl: 'stat.html',
    styleUrls: ['page.css', 'stat.css']
})
export class StatPageComponent {
    constructor(
        private routerData: RouterDataService
        ) {
        this.routerData.title.next('统计信息');
        this.routerData.icon.next('glyphicon-stats');
    }
}