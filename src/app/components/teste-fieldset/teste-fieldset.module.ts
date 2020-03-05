import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesteFieldsetComponent } from './teste-fieldset.component';
import { IcFieldsetModule } from '../../../../projects/ic-fieldset-lib/src/lib/ic-fieldset.module';

@NgModule({
  declarations: [TesteFieldsetComponent],
  imports: [
    CommonModule,
    IcFieldsetModule
  ],
  exports: [TesteFieldsetComponent]
})
export class TesteFieldsetModule { }
