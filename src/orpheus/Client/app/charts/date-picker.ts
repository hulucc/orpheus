import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'date-picker',
    template: require('./date-picker.html')
})

export class DatePickerComponent {

    private _dateFormat: string;
    @Input() set dateFormat(format: string){
        this._dateFormat = format;
        let dp = $(this.el.nativeElement)
            .find('.input-group')
            .data('DateTimePicker')
        if(dp)
            dp.format(this._dateFormat);
    }
    get dateFormat(): string {
        return this._dateFormat;
    }
    @Input() date: moment.Moment;
    @Output() dateChange = new EventEmitter<moment.Moment>();

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        (<any>$(this.el.nativeElement))
            .children('.input-group')
            .datetimepicker({
                format: this.dateFormat,
                locale: 'zh-cn',
            })
            .on('dp.change', (e) => this.onDateChange(e.date));
    }

    //private
    private onDateChange(date: moment.Moment) {
        this.date = date;
        this.dateChange.emit(this.date);
    }
}