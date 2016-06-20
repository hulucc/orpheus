import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { StatisticMode } from '../models/statistic';

@Component({
    selector: 'mode-selector',
    templateUrl: 'mode-selector.html',
})

export class ModeSelectorComponent {

    @Input() mode: StatisticMode;
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
        (<any>$(this.el.nativeElement))
            .children('select')
            .multiselect('select', this.mode);
    }
    //private
    private onSelectedChange(mode: StatisticMode) {
        this.mode = mode;
        this.modeChange.emit(this.mode);
    }
}