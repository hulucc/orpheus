﻿import { Input, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[timeline-popover]'
})
export class PopoverDirective {
    constructor(private el: ElementRef) {}

    @Input('timeline-popover') content: string;

    ngOnInit() {
        $(this.el.nativeElement).popover({
            animation: true,
            html: true,
            trigger: 'hover',
            placement: 'top',
            container: 'body',
            delay: 100,
            title: '<span class="glyphicon glyphicon-search"></span>详细信息',
            content: this.content,
            //toggle: 'popover',
            //viewport: { selector: '.right' }
        });
    }
}