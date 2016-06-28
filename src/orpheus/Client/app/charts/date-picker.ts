import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
    selector: 'date-picker',
    template: require('./date-picker.html')
})

export class DatePickerComponent {

    viewInit: boolean = false; 
    private _dateFormat: string;
    @Input() set dateFormat(format: string){
        let dp: any = $(this.el.nativeElement)
            .find('.input-group')
            .data('DateTimePicker')
        if(this.viewInit)
            dp.format(format);
        this._dateFormat = format;
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
        $(this.el.nativeElement)
            .children('.input-group')
            .datetimepicker({
                format: this.dateFormat,
                locale: 'zh-cn',
            })
            .on('dp.change', (e) => this.onDateChange(e.date));

        this.viewInit = true;
    }

    //private
    private onDateChange(date: moment.Moment) {
        this.date = date;
        this.dateChange.emit(this.date);
    }
}