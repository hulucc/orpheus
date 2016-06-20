"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ModeSelectorComponent = (function () {
    function ModeSelectorComponent(el) {
        this.el = el;
        this.modeChange = new core_1.EventEmitter();
    }
    ModeSelectorComponent.prototype.ngOnInit = function () {
    };
    ModeSelectorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $(this.el.nativeElement)
            .children('select')
            .multiselect({
            enableHTML: true,
            inheritClass: true,
            buttonWidth: '100%',
            dropRight: true,
            maxHeight: 300,
            numberDisplayed: 10,
            nonSelectedText: ' ',
            onChange: function (element, checked) {
                var vals = $(_this.el.nativeElement)
                    .find('option:selected')
                    .map(function (i, el) { return $(el).val(); })
                    .toArray();
                _this.onSelectedChange(vals[0]);
            },
        });
        $(this.el.nativeElement)
            .children('select')
            .multiselect('select', this.mode);
    };
    //private
    ModeSelectorComponent.prototype.onSelectedChange = function (mode) {
        this.mode = mode;
        this.modeChange.emit(this.mode);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModeSelectorComponent.prototype, "mode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ModeSelectorComponent.prototype, "modeChange", void 0);
    ModeSelectorComponent = __decorate([
        core_1.Component({
            selector: 'mode-selector',
            moduleId: module.id,
            template: "\n      <select class=\"form-control\" size=\"2\" >\n          <option value=\"MonthByDay\">\u65E5\u5EA6</option>\n          <option value=\"MonthByWeek\">\u5468\u5EA6</option>\n          <option value=\"YearByMonth\">\u6708\u5EA6</option>\n      </select>\n    ",
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ModeSelectorComponent);
    return ModeSelectorComponent;
}());
exports.ModeSelectorComponent = ModeSelectorComponent;
