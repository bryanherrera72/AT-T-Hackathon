import {Directive, HostListener, Input, HostBinding, Renderer2, ElementRef, OnInit, ViewChildren} from "@angular/core";

@Directive({
    selector: '[appAnimateObject]'
})

export class AnimateHitObjectDirective implements OnInit {
    @ViewChildren('postBody') postBody: ElementRef;
    @HostBinding('style.top') xPosition: string;
    constructor (private renderer: Renderer2,
                 private elemRef: ElementRef) {}
    ngOnInit() {
    }
    @HostListener('click') animate() {
        console.log('cicked ne!')
        this.xPosition = '300px';
    }
}
