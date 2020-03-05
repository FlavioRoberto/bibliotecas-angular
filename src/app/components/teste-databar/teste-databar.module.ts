import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { DataBarModule } from '@breaking_dev/ic-databar-lib';
import { DataBarModule } from 'projects/ic-databar-lib/src/lib/ic-data-bar.module';
import { TesteDatabarComponent } from './teste-databar.component';
import { TesteDatabarService } from './teste-databar.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TesteDatabarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    DataBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule
  ],
  exports: [TesteDatabarComponent],
  providers: [TesteDatabarService]
})
export class TesteDatabarModule { }
