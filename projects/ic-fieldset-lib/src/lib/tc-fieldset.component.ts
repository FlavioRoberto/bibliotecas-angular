import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tc-fieldset',
  templateUrl: './view/tc-fieldset.component.html',
  styleUrls: ['./view/tc-fieldset.component.scss']
})
export class TcFieldsetComponent implements AfterViewInit {
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
