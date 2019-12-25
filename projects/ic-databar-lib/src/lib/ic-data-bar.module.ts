import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDividerModule,
  MatSnackBarModule,
  MatButtonModule
} from '@angular/material';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfirmaDialogModule } from './components/dialogs/confirma-dialog/confirma-dialog.module';
import { DataBarComponent } from './ic-data-bar.component';
import { ErrorDialogModule } from './components/dialogs/error-dialog/error-dialog.module';
import { ConfirmaDialogComponent } from './components/dialogs/confirma-dialog/confirma-dialog.component';
import { DialogService } from './components/dialogs/confirma-dialog/service/dialog.service';

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
    MatSnackBarModule,
    MatButtonModule,
    FlexLayoutModule,
    ConfirmaDialogModule,
    ErrorDialogModule
  ],
  exports: [DataBarComponent],
  entryComponents: [ConfirmaDialogComponent],
  providers: [DialogService]
})
export class DataBarModule { }
