System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var LineSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LineSelectorComponent = (function () {
                function LineSelectorComponent(el) {
                    this.el = el;
                    this.selectedChange = new core_1.EventEmitter();
                    this.lineGroup1 = ['01', '02', '03', '04', '05', '06', '07', '08',
                        '09', '10', '12', '13', '14', '15', '16', '17', '18'];
                    this.lineGroup2 = ['D01', 'D02', 'D03'];
                }
                LineSelectorComponent.prototype.ngOnInit = function () {
                };
                LineSelectorComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    $(this.el.nativeElement)
                        .children('select')
                        .multiselect({
                        includeSelectAllOption: true,
                        enableClickableOptGroups: true,
                        enableHTML: true,
                        inheritClass: true,
                        buttonWidth: '100%',
                        dropRight: true,
                        maxHeight: 300,
                        numberDisplayed: 10,
                        nonSelectedText: ' ',
                        nSelectedText: '条线体已选择',
                        selectAllText: '全选',
                        allSelectedText: '全选',
                        onChange: function (element, checked) {
                            var vals = $(_this.el.nativeElement)
                                .find('option:selected')
                                .map(function (i, el) { return $(el).val(); })
                                .toArray();
                            //let brands = $('#select1 option:selected');
                            //let selected = [];
                            //$(brands).each(function (index, brand) {
                            //    selected.push($(this).val());
                            //});
                            _this.onSelectedChange(vals);
                        },
                    });
                    $(this.el.nativeElement)
                        .children('select')
                        .multiselect('select', this.selected);
                };
                LineSelectorComponent.prototype.onSelectedChange = function (lines) {
                    this.selected = lines;
                    this.selectedChange.emit(this.selected);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], LineSelectorComponent.prototype, "selected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LineSelectorComponent.prototype, "selectedChange", void 0);
                LineSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'line-selector',
                        template: "\n      <select class=\"form-control\" multiple=\"multiple\">\n          <optgroup label=\"\u5B9E\u88C5\">\n              <option *ngFor=\"let l of lineGroup1\" [value]=\"l\">{{l}}</option>\n          </optgroup>\n          <optgroup label=\"\u8F66\u8F7D\">\n              <option *ngFor=\"let l of lineGroup2\" [value]=\"l\">{{l}}</option>\n          </optgroup>\n      </select>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], LineSelectorComponent);
                return LineSelectorComponent;
            }());
            exports_1("LineSelectorComponent", LineSelectorComponent);
        }
    }
});
