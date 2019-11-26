import { NgModule } from '@angular/core';
import { TcFieldsetComponent } from './tc-fieldset.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TcFieldsetComponent],
  imports: [
    CommonModule
  ],
  exports: [TcFieldsetComponent]
})
export class TcFieldsetModule { }
