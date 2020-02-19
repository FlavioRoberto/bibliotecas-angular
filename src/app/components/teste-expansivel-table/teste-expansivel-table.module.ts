import { NgModule } from '@angular/core';
import { TesteExpansivelTableComponent } from './teste-expansivel-table.component';
import { IcExpansivelTableModule } from '@breaking_dev/ic-expansivel-table';
import { TesteExpansivelTableService } from './teste-expansivel-table.service';

@NgModule({
  imports: [IcExpansivelTableModule],
  declarations: [TesteExpansivelTableComponent],
  exports: [TesteExpansivelTableComponent],
  providers: [
    TesteExpansivelTableService
  ]
})
export class TesteExpansivelTableModule {
}
