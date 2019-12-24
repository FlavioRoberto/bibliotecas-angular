import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBarModule } from '@breaking_dev/ic-databar-lib';
import { TesteDatabarService } from './services/teste-databar.service';
import { TesteDatabarComponent } from './teste-databar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TesteDatabarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataBarModule
  ],
  exports: [TesteDatabarComponent],
  providers: [TesteDatabarService]
})
export class TesteDatabarModule { }
