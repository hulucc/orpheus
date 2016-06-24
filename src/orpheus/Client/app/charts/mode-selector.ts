import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { StatisticMode } from '../models/statistic';

@Component({
    selector: 'mode-selector',
    template: require('./mode-selector.html')
})

export class ModeSelectorComponent {

    private _mode: StatisticMode;
    @Input() set mode(mode: StatisticMode) {
        let control = <any>$(this.el.nativeElement).children('select')
        if(mode)
            control.multiselect('select', mode);
        else if(this._mode)
            control.multiselect('deselect', this._mode);
        this._mode = mode;
    }
    get mode(): StatisticMode {
        return this._mode;
    }
    @Output() modeChange = new EventEmitter<StatisticMode>();

    constructor(private el: ElementRef) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        (<any>$(this.el.nativeElement))
            .children('select')
            .multiselect({
                enableHTML: true,
                inheritClass: true,
                buttonWidth: '100%',
                dropRight: true,
                maxHeight: 300,
                numberDisplayed: 10,
                nonSelectedText: ' ',
                onChange: (element, checked) => {
                    let vals = $(this.el.nativeElement)
                        .find('option:selected')
                        .map((i, el) => { return $(el).val() })
                        .toArray();
                    this.onSelectedChange(vals[0]);
                },
            });
        
    }
    //private
    private onSelectedChange(mode: StatisticMode) {
        this._mode = mode;
        this.modeChange.emit(this._mode);
    }
}