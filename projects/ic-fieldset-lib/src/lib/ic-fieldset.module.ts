import { NgModule } from '@angular/core';
import { IcFieldsetComponent } from './ic-fieldset.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [IcFieldsetComponent],
  imports: [
    CommonModule
  ],
  exports: [IcFieldsetComponent]
})
export class IcFieldsetModule { }
