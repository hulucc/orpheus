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
var moment = require('moment');
var DatePickerComponent = (function () {
    function DatePickerComponent(el) {
        this.el = el;
        this.dateChange = new core_1.EventEmitter();
    }
    Object.defineProperty(DatePickerComponent.prototype, "dateFormat", {
        get: function () {
            return this._dateFormat;
        },
        set: function (format) {
            this._dateFormat = format;
            var dp = $(this.el.nativeElement)
                .find('.input-group')
                .data('DateTimePicker');
            if (dp)
                dp.format(this._dateFormat);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.ngOnInit = function () {
    };
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $(this.el.nativeElement)
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
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], DatePickerComponent.prototype, "dateFormat", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatePickerComponent.prototype, "date", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatePickerComponent.prototype, "dateChange", void 0);
    DatePickerComponent = __decorate([
        core_1.Component({
            selector: 'date-picker',
            template: "\n      <div class='input-group date'>\n          <input type='text'\n                 class=\"form-control\"\n                 [ngModel] =\"date?.format(dateFormat)\"/>\n          <span class=\"input-group-addon\">\n              <span class=\"glyphicon glyphicon-calendar\"></span>\n          </span>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DatePickerComponent);
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
