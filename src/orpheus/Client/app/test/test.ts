import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { TestService } from './test.service';
import { TestModel } from './test.model';

@Component({
    selector: 'my-test',
    template: require('./test.html'),
    providers: [TestService]
})
export class TestComponent {
    public testModels: TestModel[];
    public id: number;

    constructor(
        private _routeParams: RouteParams,
        private _testService: TestService) {
        
    }

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this._testService.getTestModels().subscribe(res => this.testModels = res);
    }
}

@Component({
    selector: 'my-test1',
    template: '<h2>Test1 Page</h2>'
})
export class Test1Component {
    
}