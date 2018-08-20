import {Directive, ElementRef, Input, Renderer} from '@angular/core';

@Directive({
    selector: '[libTableGridStyle]'
})
export class TableGridStyleDirective {

    constructor(
        private renderer: Renderer,
        private el: ElementRef
    ) {
    }

    @Input() set libTableGridStyle(styles) {
        styles = JSON.parse(JSON.stringify(styles));
        if (styles) {
            for (const style in styles) {
                if (styles.hasOwnProperty(style)) {
                    this.renderer.setElementStyle(this.el.nativeElement, style, styles[style]);
                }
            }
        }
    }

}
