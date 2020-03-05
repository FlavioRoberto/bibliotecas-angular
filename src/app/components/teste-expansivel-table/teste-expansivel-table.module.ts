import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcExpansivelTableModule } from '@breaking_dev/ic-expansivel-table';
import { TesteExpansivelTableComponent } from './teste-expansivel-table.component';
import { TesteExpansivelTableService } from './teste-expansivel-table.service';

@NgModule({
  declarations: [TesteExpansivelTableComponent],
  imports: [CommonModule, IcExpansivelTableModule],
  exports: [TesteExpansivelTableComponent],
  providers: [TesteExpansivelTableService]
})
export class TesteExpansivelTableModule { }
