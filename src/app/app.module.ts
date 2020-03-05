import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TesteExpansivelTableModule } from './components/teste-expansivel-table/teste-expansivel-table.module';
import { TesteDatabarModule } from './components/teste-databar/teste-databar.module';
import { TesteFieldsetModule} from './components/teste-fieldset/teste-fieldset.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    TesteExpansivelTableModule,
    TesteDatabarModule,
    TesteFieldsetModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
