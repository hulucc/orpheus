import { Input, Directive, ElementRef } from 'angular2/core';

@Directive({
    selector: '[timeline-popover]'
})
export class PopoverDirective {
    constructor(private el: ElementRef) {}

    @Input('timeline-popover') content: string;

    ngOnInit() {
        (<any>jQuery(this.el.nativeElement)).popover({
            animation: true,
            html: true,
            trigger: 'hover',
            toggle: 'popover',
            placement: 'top',
            container: 'body',
            delay: 100,
            title: '<span class="glyphicon glyphicon-search"></span>详细信息',
            content: this.content,
            //viewport: { selector: '.right' }
        });
    }
}