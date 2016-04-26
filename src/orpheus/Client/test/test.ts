import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { TestService } from './test.service';
import { TestModel } from './test.model';

@Component({
    selector: 'my-test',
    templateUrl: './test.html',
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