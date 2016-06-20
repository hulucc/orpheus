import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
    selector: 'line-selector',
    moduleId: module.id,
    templateUrl: 'line-selector.html'
})

export class LineSelectorComponent {

    @Input() selected: string[];
    @Output() selectedChange = new EventEmitter<string[]>();

    lineGroup1: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', 
        '09', '10', '12', '13','14', '15', '16', '17', '18'];
    lineGroup2: string[] = ['D01', 'D02', 'D03']
    
    constructor(private el: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        (<any>$(this.el.nativeElement))
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
                onChange: (element, checked) => {
                    let vals = $(this.el.nativeElement)
                        .find('option:selected')
                        .map((i, el) => { return $(el).val() })
                        .toArray();
                    //let brands = $('#select1 option:selected');
                    //let selected = [];
                    //$(brands).each(function (index, brand) {
                    //    selected.push($(this).val());
                    //});
                    this.onSelectedChange(vals);
                },
            });
        (<any>$(this.el.nativeElement))
            .children('select')
            .multiselect('select', this.selected);
    }

    private onSelectedChange(lines: string[]) {
        this.selected = lines;
        this.selectedChange.emit(this.selected);
    }
}