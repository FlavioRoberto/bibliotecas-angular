import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ic-fieldset',
  templateUrl: './view/ic-fieldset.component.html',
  styleUrls: ['./view/ic-fieldset.component.scss']
})
export class IcFieldsetComponent implements AfterViewInit {
  @Input() label: string;
  comFoco: boolean;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const elements = this.elementRef.nativeElement
      .querySelector('fieldset')
      .querySelectorAll('input, select, mat-select, textarea');

    elements.forEach(element => {
      element.addEventListener('focus', this.setFocoFieldSet.bind(this));
      element.addEventListener(
        'focusout',
        this.removeFocusFieldSet.bind(this)
      );
    });
  }

  setFocoFieldSet(event: Event): void {
    this.comFoco = true;
  }

  removeFocusFieldSet(event: Event): void {
    this.comFoco = false;
  }
}
