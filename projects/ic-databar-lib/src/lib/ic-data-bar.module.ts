import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDividerModule
} from '@angular/material';

import { ConfirmaDialogModule } from '../components/dialogs/confirma-dialog/confirma-dialog.module';
import { DataBarComponent } from './ic-data-bar.component';
import { CommonModule } from '@angular/common';
import { ErrorDialogModule } from '../components/dialogs/error-dialog/error-dialog.module';

@NgModule({
  declarations: [DataBarComponent],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,

    ConfirmaDialogModule,
    ErrorDialogModule
  ],
  exports: [DataBarComponent]
})
export class DataBarModule { }
