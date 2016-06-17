System.register(['angular2/core', 'moment'], function(exports_1, context_1) {
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
    var core_1, moment_1;
    var DatePickerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            DatePickerComponent = (function () {
                function DatePickerComponent(el) {
                    this.el = el;
                    this.dateChange = new core_1.EventEmitter();
                }
                DatePickerComponent.prototype.ngOnInit = function () {
                };
                DatePickerComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement)
                        .children('.input-group')
                        .datetimepicker({
                        format: this.dateFormat,
                        locale: 'zh-cn',
                    })
                        .on('dp.change', function (e) {
                        _this.onDateChange(e.date);
                    });
                };
                //private
                DatePickerComponent.prototype.onDateChange = function (date) {
                    this.date = date;
                    this.dateChange.emit(this.date);
                };
                DatePickerComponent.prototype.getFormatDate = function () {
                    if (this.date)
                        return this.date.format(this.dateFormat);
                    return '';
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DatePickerComponent.prototype, "dateFormat", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DatePickerComponent.prototype, "date", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DatePickerComponent.prototype, "dateChange", void 0);
                DatePickerComponent = __decorate([
                    core_1.Component({
                        selector: 'date-picker',
                        templateUrl: 'date-picker.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], DatePickerComponent);
                return DatePickerComponent;
            }());
            exports_1("DatePickerComponent", DatePickerComponent);
        }
    }
});
//# sourceMappingURL=date-picker.js.map